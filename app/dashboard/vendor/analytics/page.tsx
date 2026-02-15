"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AnalyticsData {
  overview: {
    totalProducts: number;
    activeListings: number;
    totalRentals: number;
    averageRating: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  topProducts: {
    id: string;
    name: string;
    image: string | null;
    rentals: number;
    rating: number;
  }[];
  monthlyData: {
    month: string;
    revenue: number;
    orders: number;
  }[];
}

export default function VendorAnalyticsPage() {
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") redirect("/login");
    if (session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }
    fetchAnalytics();
  }, [status, session]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/vendor/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  const thisMonthChange = getPercentageChange(
    analytics?.revenue.thisMonth || 0,
    analytics?.revenue.lastMonth || 0
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">apparel</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-white">Rent Culture</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Seller Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <Link href="/dashboard/vendor" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/dashboard/vendor/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">My Listings</span>
          </Link>
          <Link href="/dashboard/vendor/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link href="/dashboard/vendor/earnings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm">Earnings</span>
          </Link>
          <Link href="/dashboard/vendor/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm">Analytics</span>
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account</p>
          </div>
          
          <Link href="/dashboard/vendor/kyc" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm">KYC & Agreement</span>
          </Link>
          <Link href="/dashboard/vendor/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700">
                {session?.user?.image ? (
                  <img className="w-full h-full object-cover" src={session.user.image} alt="User" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
                    {session?.user?.name?.[0] || "V"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{session?.user?.name || "Vendor"}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Premium Seller</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-xl font-bold text-white">Analytics</h1>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-slate-700 overflow-hidden">
              {session?.user?.image ? (
                <img alt="Profile" className="w-full h-full object-cover" src={session.user.image} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
                  {session?.user?.name?.[0] || "V"}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-dark">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <p className="text-slate-400 text-sm font-medium">Total Products</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{analytics?.overview.totalProducts || 0}</h3>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <p className="text-slate-400 text-sm font-medium">Active Listings</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{analytics?.overview.activeListings || 0}</h3>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <p className="text-slate-400 text-sm font-medium">Total Rentals</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{analytics?.overview.totalRentals || 0}</h3>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <p className="text-slate-400 text-sm font-medium">Average Rating</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-2xl font-bold text-white">{analytics?.overview.averageRating?.toFixed(1) || "0.0"}</span>
                <span className="material-symbols-outlined text-yellow-500">star</span>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 text-white">Revenue Overview</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics?.monthlyData?.map((data, index) => {
                const maxRevenue = Math.max(...(analytics?.monthlyData?.map((d) => d.revenue) || [1]));
                const height = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${height}%`, minHeight: "4px" }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg" style={{ height: "100%" }}></div>
                    </div>
                    <span className="text-xs text-slate-500 mt-2">{data.month}</span>
                    <span className="text-xs font-bold text-white">₹{data.revenue.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">Top Performing Products</h2>
            </div>
            {analytics?.topProducts?.length === 0 ? (
              <div className="p-12 text-center">
                <h3 className="text-lg font-bold mb-2 text-white">No products yet</h3>
                <p className="text-slate-500">Add products to see analytics.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {analytics?.topProducts?.map((product, index) => (
                  <div key={product.id} className="px-6 py-4 flex items-center gap-4">
                    <span className="text-lg font-bold text-slate-500">#{index + 1}</span>
                    <div className="size-12 rounded-lg bg-slate-800 overflow-hidden">
                      {product.image ? (
                        <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-500">image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{product.name}</p>
                      <p className="text-sm text-slate-500">{product.rentals} rentals</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                      <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
