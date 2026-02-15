"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Star, 
  Plus,
  Eye,
  Calendar
} from "lucide-react";

export default function VendorDashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
    if (status === "authenticated" && session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mock data for vendor dashboard
  const stats = [
    { name: "Total Products", value: "24", icon: Package, change: "+3 this month" },
    { name: "Active Rentals", value: "12", icon: ShoppingBag, change: "5 ending soon" },
    { name: "Total Earnings", value: "₹4,250", icon: DollarSign, change: "+₹350 this week" },
    { name: "Average Rating", value: "4.8", icon: Star, change: "From 48 reviews" },
  ];

  const recentRentals = [
    { id: 1, product: "Elegant Evening Gown", customer: "Sarah Johnson", dates: "Feb 15-18", status: "Active", amount: "₹267" },
    { id: 2, product: "Designer Handbag", customer: "Emily Davis", dates: "Feb 16-20", status: "Pending", amount: "₹180" },
    { id: 3, product: "Wedding Dress", customer: "Michael Brown", dates: "Feb 18-22", status: "Upcoming", amount: "₹450" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session?.user?.name || "Vendor"}!</p>
          </div>
          <Link href="/dashboard/vendor/products/new">
            <Button className="mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Rentals */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Rentals</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentRentals.map((rental) => (
                  <tr key={rental.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rental.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.dates}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rental.status === "Active" ? "bg-green-100 text-green-800" :
                        rental.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rental.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-rose-600 hover:text-rose-900 mr-3">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/vendor/products" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <Package className="h-8 w-8 text-rose-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Products</h3>
            <p className="text-sm text-gray-500">Add, edit, or remove your rental products</p>
          </Link>
          <Link href="/dashboard/vendor/orders" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <ShoppingBag className="h-8 w-8 text-rose-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">View Orders</h3>
            <p className="text-sm text-gray-500">Track and manage all your rental orders</p>
          </Link>
          <Link href="/dashboard/vendor/calendar" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <Calendar className="h-8 w-8 text-rose-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Rental Calendar</h3>
            <p className="text-sm text-gray-500">View your upcoming rentals schedule</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
