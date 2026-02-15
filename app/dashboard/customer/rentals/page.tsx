"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";

export default function CustomerRentalsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard/customer" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
          <p className="mt-2 text-gray-600">View and manage your active and past rentals</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">My Rentals</h2>
          <p className="mt-2 text-gray-600">You have no rentals yet. Start browsing our collection!</p>
          <Link href="/categories" className="mt-4 inline-block text-rose-600 hover:text-rose-700 font-medium">
            Browse Categories →
          </Link>
        </div>
      </div>
    </div>
  );
}
