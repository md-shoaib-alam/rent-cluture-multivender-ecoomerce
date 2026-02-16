import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Fetch vendor's earnings and analytics
export async function GET(request: Request) {
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

    // Get all completed rentals for this vendor
    const rentals = await prisma.rental.findMany({
      where: {
        vendorId: vendor.id,
        status: { in: ["COMPLETED", "DELIVERED", "ACTIVE"] },
      },
      include: {
        items: true,
        payment: true,
      },
    });

    // Calculate earnings
    const totalEarnings = rentals.reduce((sum, rental) => {
      const rentalTotal = Number(rental.totalAmount);
      const platformFee = Number(rental.platformFee);
      return sum + (rentalTotal - platformFee);
    }, 0);

    const pendingPayouts = rentals
      .filter((r) => r.status === "ACTIVE" || r.status === "DELIVERED")
      .reduce((sum, rental) => {
        const rentalTotal = Number(rental.totalAmount);
        const platformFee = Number(rental.platformFee);
        return sum + (rentalTotal - platformFee);
      }, 0);

    // Get payouts
    const payouts = await prisma.payout.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Monthly earnings breakdown
    const monthlyEarnings = await prisma.rental.groupBy({
      by: ["createdAt"],
      where: {
        vendorId: vendor.id,
        status: { in: ["COMPLETED", "DELIVERED", "ACTIVE"] },
      },
      _sum: {
        totalAmount: true,
        platformFee: true,
      },
    });

    return NextResponse.json({
      totalEarnings,
      pendingPayouts,
      totalSales: vendor.totalSales,
      rating: Number(vendor.rating),
      payouts,
      rentals: rentals.length,
    });
  } catch (error) {
    console.error("Error fetching vendor earnings:", error);
    return NextResponse.json(
      { error: "Failed to fetch earnings" },
      { status: 500 }
    );
  }
}
