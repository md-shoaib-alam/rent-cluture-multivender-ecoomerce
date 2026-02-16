import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get("position") || "home";
    // Note: active parameter available for future filtering if needed
    // const active = searchParams.get("active") !== "false";

    const banners = await prisma.banner.findMany({
      where: {
        position,
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    // Transform banners to match frontend interface
    const transformedBanners = banners.map((banner) => ({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle || "",
      image: banner.image,
      link: banner.link,
      theme: "default", // For custom styling if needed
    }));

    return NextResponse.json({
      banners: transformedBanners,
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, image, link, position, isActive, sortOrder, startDate, endDate } = body;

    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        image,
        link,
        position: position || "home",
        isActive: isActive ?? true,
        sortOrder: sortOrder || 0,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json({ banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
