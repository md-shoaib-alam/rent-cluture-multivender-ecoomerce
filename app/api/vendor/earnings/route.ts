import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get vendor info
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return NextResponse.json({
        totalEarnings: 0,
        pendingPayout: 0,
        completedPayouts: 0,
        recentEarnings: [],
      });
    }

    // Get completed rentals earnings
    const completedRentals = await prisma.rental.aggregate({
      where: {
        vendorId: vendor.id,
        status: { in: ["RETURNED", "DELIVERED"] },
      },
      _sum: {
        totalAmount: true,
      },
      _count: true,
    });

    // Get pending payouts
    const pendingPayouts = await prisma.payout.aggregate({
      where: {
        vendorId: vendor.id,
        status: "PENDING",
      },
      _sum: {
        amount: true,
      },
    });

    // Get completed payouts
    const completedPayouts = await prisma.payout.aggregate({
      where: {
        vendorId: vendor.id,
        status: "COMPLETED",
      },
      _sum: {
        amount: true,
      },
      _count: true,
    });

    // Get recent earnings
    const recentRentals = await prisma.rental.findMany({
      where: {
        vendorId: vendor.id,
        status: { in: ["RETURNED", "DELIVERED"] },
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    const recentEarnings = recentRentals.map((rental) => ({
      id: rental.id,
      orderNumber: rental.orderNumber,
      customerName: rental.customer.user.name || "Unknown",
      amount: Number(rental.totalAmount),
      status: rental.status,
      date: rental.updatedAt,
    }));

    return NextResponse.json({
      totalEarnings: completedRentals._sum.totalAmount?.toNumber() || 0,
      totalOrders: completedRentals._count || 0,
      pendingPayout: pendingPayouts._sum.amount?.toNumber() || 0,
      completedPayouts: completedPayouts._sum.amount?.toNumber() || 0,
      payoutCount: completedPayouts._count || 0,
      recentEarnings,
    });
  } catch (error) {
    console.error("Vendor earnings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
