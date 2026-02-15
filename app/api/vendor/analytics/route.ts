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
        overview: {
          totalProducts: 0,
          activeListings: 0,
          totalRentals: 0,
          averageRating: 0,
        },
        revenue: {
          total: 0,
          thisMonth: 0,
          lastMonth: 0,
        },
        topProducts: [],
        monthlyData: [],
      });
    }

    // Get overview stats
    const [totalProducts, activeProducts, totalRentals, vendorRating] = await Promise.all([
      prisma.product.count({ where: { vendorId: vendor.id } }),
      prisma.product.count({ where: { vendorId: vendor.id, status: "ACTIVE" } }),
      prisma.rental.count({ where: { vendorId: vendor.id } }),
      prisma.rental.aggregate({
        where: { vendorId: vendor.id, status: { in: ["RETURNED", "DELIVERED"] } },
        _avg: { totalAmount: true },
      }),
    ]);

    // Get this month and last month revenue
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const [thisMonthRevenue, lastMonthRevenue] = await Promise.all([
      prisma.rental.aggregate({
        where: {
          vendorId: vendor.id,
          status: { in: ["RETURNED", "DELIVERED"] },
          createdAt: { gte: thisMonthStart },
        },
        _sum: { totalAmount: true },
      }),
      prisma.rental.aggregate({
        where: {
          vendorId: vendor.id,
          status: { in: ["RETURNED", "DELIVERED"] },
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
        },
        _sum: { totalAmount: true },
      }),
    ]);

    // Get top products
    const topProducts = await prisma.product.findMany({
      where: { vendorId: vendor.id },
      orderBy: { rentalCount: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        images: true,
        rentalCount: true,
        rating: true,
      },
    });

    // Get monthly data for the last 6 months
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthData = await prisma.rental.aggregate({
        where: {
          vendorId: vendor.id,
          status: { in: ["RETURNED", "DELIVERED"] },
          createdAt: { gte: monthStart, lte: monthEnd },
        },
        _sum: { totalAmount: true },
        _count: true,
      });

      monthlyData.push({
        month: monthStart.toLocaleString("default", { month: "short" }),
        revenue: monthData._sum.totalAmount?.toNumber() || 0,
        orders: monthData._count || 0,
      });
    }

    return NextResponse.json({
      overview: {
        totalProducts,
        activeListings: activeProducts,
        totalRentals,
        averageRating: Number(vendor.rating) || 0,
      },
      revenue: {
        total: vendorRating._avg.totalAmount?.toNumber() || 0,
        thisMonth: thisMonthRevenue._sum.totalAmount?.toNumber() || 0,
        lastMonth: lastMonthRevenue._sum.totalAmount?.toNumber() || 0,
      },
      topProducts: topProducts.map((p) => ({
        id: p.id,
        name: p.name,
        image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
        rentals: p.rentalCount,
        rating: Number(p.rating),
      })),
      monthlyData,
    });
  } catch (error) {
    console.error("Vendor analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
