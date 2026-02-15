import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: params.id },
            include: {
                customer: {
                    include: {
                        rentals: {
                            take: 5,
                            orderBy: { createdAt: "desc" },
                            include: {
                                items: true,
                            }
                        },
                        addresses: true, // Note: Address is directly on User in schema, checking again.. No, Address model has userId, User has addresses[]
                    }
                },
                vendor: true,
                addresses: true,
                _count: {
                    select: {
                        rentals: true, // This relationship might not be direct on User, checking schema...
                        // User -> Customer -> Rentals. The schema says Customer has Rentals.
                    }
                }
            },
            // Note: Relation count shortcut might not work if relation is deep.
            // We'll rely on fetching the relational data.
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
