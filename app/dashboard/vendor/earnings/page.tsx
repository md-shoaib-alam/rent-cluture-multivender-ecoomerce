"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface EarningsData {
  totalEarnings: number;
  totalOrders: number;
  pendingPayout: number;
  completedPayouts: number;
  payoutCount: number;
  recentEarnings: {
    id: string;
    orderNumber: string;
    customerName: string;
    amount: number;
    status: string;
    date: string;
  }[];
}

export default function VendorEarningsPage() {
  const { data: session, status } = useSession();
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") redirect("/login");
    if (session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }
    fetchEarnings();
  }, [status, session]);

  const fetchEarnings = async () => {
    try {
      const res = await fetch("/api/vendor/earnings");
      if (res.ok) {
        const data = await res.json();
        setEarnings(data);
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
          <Link href="/dashboard/vendor/earnings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm">Earnings</span>
          </Link>
          <Link href="/dashboard/vendor/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
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
          <h1 className="text-xl font-bold text-white">Earnings</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="size-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Total Earnings</p>
              <h3 className="text-2xl font-bold mt-1 text-white">₹{earnings?.totalEarnings?.toLocaleString() || 0}</h3>
              <p className="text-xs text-slate-500 mt-1">{earnings?.totalOrders || 0} completed orders</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="size-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">schedule</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Pending Payout</p>
              <h3 className="text-2xl font-bold mt-1 text-white">₹{earnings?.pendingPayout?.toLocaleString() || 0}</h3>
              <p className="text-xs text-slate-500 mt-1">Awaiting transfer</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="size-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">payments</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Completed Payouts</p>
              <h3 className="text-2xl font-bold mt-1 text-white">₹{earnings?.completedPayouts?.toLocaleString() || 0}</h3>
              <p className="text-xs text-slate-500 mt-1">{earnings?.payoutCount || 0} payouts</p>
            </div>
          </div>

          {/* Recent Earnings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">Recent Earnings</h2>
            </div>
            {earnings?.recentEarnings?.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-slate-500 text-3xl">payments</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">No earnings yet</h3>
                <p className="text-slate-500">Earnings will appear here after completed rentals.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase">
                    <tr>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {earnings?.recentEarnings?.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30">
                        <td className="px-6 py-4">
                          <span className="font-bold text-sm text-white">#{item.orderNumber}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{item.customerName}</td>
                        <td className="px-6 py-4 font-bold text-white">₹{item.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === "RETURNED" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatDate(item.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
