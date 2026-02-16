import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      orderNumber,
      productId,
      variantId,
      vendorId,
      rentalStart,
      rentalEnd,
      rentalDays,
      dailyPrice,
      depositAmount,
      shippingAddressId,
      paymentMethod,
    } = body;

    // Get user's customer profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { customer: true },
    });

    if (!user?.customer) {
      return NextResponse.json(
        { error: "Customer profile not found" },
        { status: 400 }
      );
    }

    // Get shipping address
    const address = await prisma.address.findUnique({
      where: { id: shippingAddressId },
    });

    if (!address) {
      return NextResponse.json(
        { error: "Shipping address not found" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = dailyPrice * rentalDays;
    const platformFee = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + depositAmount + platformFee;

    // Create rental order
    const rental = await prisma.rental.create({
      data: {
        orderNumber,
        customerId: user.customer.id,
        vendorId,
        status: "PENDING",
        rentalStartDate: new Date(rentalStart),
        rentalEndDate: new Date(rentalEnd),
        subtotal,
        depositAmount,
        deliveryFee: 0,
        platformFee,
        taxAmount: 0,
        totalAmount,
        shippingAddress: {
          firstName: address.firstName,
          lastName: address.lastName,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          phone: address.phone,
        },
      },
    });

    // Create rental item
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { brand: true },
    });

    if (product) {
      await prisma.rentalItem.create({
        data: {
          rentalId: rental.id,
          productId,
          variantId,
          productName: product.name,
          productImage: (product.images as string[])[0] || "",
          variantSize: null,
          variantColor: null,
          dailyPrice,
          weeklyPrice: product.weeklyPrice ? Number(product.weeklyPrice) : null,
          rentalDays,
          subtotal,
          status: "PENDING",
        },
      });
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        rentalId: rental.id,
        customerId: user.customer.id,
        amount: totalAmount,
        currency: "USD",
        method: paymentMethod === "cod" ? "CASH_ON_DELIVERY" : "CARD",
        status: paymentMethod === "cod" ? "PENDING" : "PENDING",
        rentalCost: subtotal,
        deposit: depositAmount,
        deliveryFee: 0,
        tax: 0,
        platformFee,
      },
    });

    return NextResponse.json({ success: true, rental });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
