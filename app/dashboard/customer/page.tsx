"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Clock, CreditCard, User, Star } from "lucide-react";

export default function CustomerDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect vendors to vendor dashboard
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "VENDOR") {
      router.push("/dashboard/vendor");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const menuItems = [
    {
      title: "My Rentals",
      description: "View and manage your active and past rentals",
      icon: Package,
      href: "/dashboard/customer/rentals",
    },
    {
      title: "Upcoming Rentals",
      description: "See your scheduled rentals",
      icon: Clock,
      href: "/dashboard/customer/upcoming",
    },
    {
      title: "Payment Methods",
      description: "Manage your saved payment methods",
      icon: CreditCard,
      href: "/dashboard/customer/payments",
    },
    {
      title: "Profile",
      description: "Update your personal information",
      icon: User,
      href: "/dashboard/customer/profile",
    },
    {
      title: "Reviews",
      description: "Rate and review your rentals",
      icon: Star,
      href: "/dashboard/customer/reviews",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.name || "Customer"}!
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your rentals and account settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Rentals</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Reviews</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-rose-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-rose-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Wallet</p>
                <p className="text-2xl font-bold text-gray-900">$0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <item.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Become a Vendor CTA */}
        <div className="mt-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg shadow p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Start Selling?</h2>
              <p className="mt-2 text-rose-100">
                Have fashion items to rent out? Become a vendor and start earning today!
              </p>
            </div>
            <Link href="/vendor/signup">
              <Button variant="secondary" size="lg">
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
