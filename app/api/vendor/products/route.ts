import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
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
      return NextResponse.json({ products: [] });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = { vendorId: vendor.id };

    if (status && status !== "all") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { sku: { contains: search } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Transform products to include inventory info
    const transformedProducts = products.map((product) => {
      const totalInventory = product.variants.reduce((sum, v) => sum + v.inventory, 0);
      const availableInventory = product.variants.reduce(
        (sum, v) => sum + (v.isAvailable ? v.inventory : 0),
        0
      );

      let productStatus = "Active";
      if (product.status === "DRAFT") productStatus = "Draft";
      else if (product.status === "INACTIVE") productStatus = "Inactive";
      else if (availableInventory === 0) productStatus = "Rented";
      else if (totalInventory === 0) productStatus = "Maintenance";

      return {
        id: product.id,
        name: product.name,
        sku: product.slug,
        category: product.category.name,
        rentalPrice: Number(product.dailyPrice),
        status: productStatus,
        totalInventory,
        availableInventory,
        imageUrl: Array.isArray(product.images) && product.images.length > 0 
          ? product.images[0] 
          : null,
      };
    });

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Vendor products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
