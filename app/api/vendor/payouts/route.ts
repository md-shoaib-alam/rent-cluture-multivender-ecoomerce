import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Fetch vendor's payouts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const payouts = await prisma.payout.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ payouts });
  } catch (error) {
    console.error("Error fetching payouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch payouts" },
      { status: 500 }
    );
  }
}

// POST - Request a new payout
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const body = await request.json();
    const { amount } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Calculate commission (10% platform fee)
    const commission = amount * 0.1;
    const netAmount = amount - commission;

    const payout = await prisma.payout.create({
      data: {
        vendorId: vendor.id,
        amount: amount,
        grossAmount: amount,
        commission: commission,
        netAmount: netAmount,
        status: "PENDING",
        method: vendor.paypalEmail ? "PAYPAL" : "BANK_TRANSFER",
      },
    });

    return NextResponse.json({ payout });
  } catch (error) {
    console.error("Error creating payout:", error);
    return NextResponse.json(
      { error: "Failed to create payout" },
      { status: 500 }
    );
  }
}
