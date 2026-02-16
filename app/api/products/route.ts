import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "20");
    const categoryId = searchParams.get("categoryId");
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: "ACTIVE",
    };

    if (featured) {
      where.isFeatured = true;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (brand) {
      where.brandId = brand;
    }

    if (category) {
      where.category = {
        slug: category,
      };
    }

    const products = await prisma.product.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        vendor: {
          select: {
            businessName: true,
          },
        },
        brand: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    // Transform products to match frontend interface
    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      images: product.images as string[],
      dailyPrice: Number(product.dailyPrice),
      deposit: Number(product.depositAmount),
      rating: Number(product.rating),
      reviewCount: product.reviewCount,
      category: product.category,
      vendor: product.vendor,
      brand: product.brand,
    }));

    return NextResponse.json({
      products: transformedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
