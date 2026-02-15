"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  activeRentals: number;
  totalRevenue: number;
  openDisputes: number;
  pendingReviews: number;
}

interface Dispute {
  id: string;
  type: string;
  status: string;
  title: string;
  description: string;
  rental: {
    orderNumber: string;
    customer: {
      user: {
        name: string;
      }
    }
  };
  createdAt: Date;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalVendors: 0,
    activeRentals: 0,
    totalRevenue: 0,
    openDisputes: 0,
    pendingReviews: 0,
  });
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }

    fetchAdminData();
  }, [status, session]);

  const fetchAdminData = async () => {
    try {
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }

      const disputesRes = await fetch("/api/admin/disputes");
      if (disputesRes.ok) {
        const data = await disputesRes.json();
        setDisputes(data.disputes || []);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <aside className={`
        fixed lg:relative z-50 lg:z-0
        w-64 h-full bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-xl">hotel</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold tracking-tight uppercase">RentSquare</h1>
            <p className="text-[10px] text-gray-500 font-medium">ADMIN PANEL</p>
          </div>
        </div>

        {/* Close button for mobile */}
        <button 
          className="absolute top-4 right-4 lg:hidden p-2 text-gray-400"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
          <Link 
            href="/dashboard/admin" 
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link 
            href="/dashboard/admin/users" 
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">User Management</span>
          </Link>
          <Link 
            href="/dashboard/admin/vendors" 
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm font-medium">KYC Approvals</span>
          </Link>
          <Link 
            href="/dashboard/admin/disputes" 
            className="flex items-center gap-3 px-3 py-2.5 bg-rose-600/10 text-rose-600 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">gavel</span>
            <span className="text-sm font-semibold">Disputes (Active)</span>
          </Link>
          <Link 
            href="/dashboard/admin/finance" 
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-sm font-medium">Escrow Management</span>
          </Link>
          <Link 
            href="/dashboard/admin/orders" 
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Revenue Analytics</span>
          </Link>
          <Link 
            href="/dashboard/admin/brands" 
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="text-sm font-medium">Brands</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-1">
          <button className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors w-full">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button 
            className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 bg-gray-50">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Dispute Resolution Center</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and arbitrate luxury item rental conflicts.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-rose-500 focus:border-rose-500 w-64" placeholder="Search disputes..." type="text"/>
            </div>
            <button className="p-2 text-gray-500 hover:bg-slate-100 rounded-lg relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              {session?.user?.image ? (
                <img alt="Admin Profile" className="w-full h-full object-cover" src={session.user.image} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-rose-100 text-rose-600 font-bold">
                  {session?.user?.name?.[0] || "A"}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* KPI Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white border border-slate-200 p-4 lg:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Open Disputes</span>
              <span className="material-symbols-outlined text-rose-600 text-xl">inbox</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stats.openDisputes}</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 lg:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Pending Review</span>
              <span className="material-symbols-outlined text-orange-500 text-xl">pending_actions</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 lg:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Users</span>
              <span className="material-symbols-outlined text-blue-500 text-xl">group</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 lg:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
              <span className="material-symbols-outlined text-green-500 text-xl">verified</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Active Disputes Table Section */}
          <div className="xl:col-span-2 flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 lg:px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Active Disputes</h3>
                <button className="text-xs font-semibold text-rose-600 hover:underline">View All History</button>
              </div>
              <div className="overflow-x-auto">
                {disputes.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No active disputes found.
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 lg:py-4">Dispute ID</th>
                        <th className="px-4 lg:px-6 py-3 lg:py-4 hidden md:table-cell">Order ID</th>
                        <th className="px-4 lg:px-6 py-3 lg:py-4">Type</th>
                        <th className="px-4 lg:px-6 py-3 lg:py-4 hidden lg:table-cell">Status</th>
                        <th className="px-4 lg:px-6 py-3 lg:py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {disputes.map((dispute) => (
                        <tr key={dispute.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900">#{dispute.id.slice(-4)}</td>
                          <td className="px-4 lg:px-6 py-4 text-sm text-rose-600 font-semibold hover:underline cursor-pointer hidden md:table-cell">
                            {dispute.rental?.orderNumber || "N/A"}
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <span className={`text-[11px] font-bold px-2 py-1 rounded uppercase ${
                              dispute.type === "DAMAGE" ? "bg-red-100 text-red-600" :
                              dispute.type === "LATE_RETURN" ? "bg-orange-100 text-orange-600" :
                              dispute.type === "AUTHENTICITY" ? "bg-slate-100 text-gray-600" :
                              "bg-blue-100 text-blue-600"
                            }`}>
                              {dispute.type.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                            <span className="text-xs font-semibold text-gray-600">{dispute.status}</span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-right">
                            <button className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Review Case</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {disputes.length > 0 && (
                <div className="px-4 lg:px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Showing {disputes.length} active disputes</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-gray-600" disabled>Previous</button>
                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-gray-600">Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Manual Escrow Control Section */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-rose-600">security</span>
                <h3 className="font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span>5 new vendor applications</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600">shopping_bag</span>
                  <span>12 new orders today</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-600">warning</span>
                  <span>3 pending disputes</span>
                </div>
              </div>
            </div>

            {/* Quick Policy Reference */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h4>
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="material-symbols-outlined text-rose-600 text-base">add</span>
                  <span>Review vendor applications</span>
                </li>
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="material-symbols-outlined text-rose-600 text-base">gavel</span>
                  <span>View pending disputes</span>
                </li>
                <li className="flex gap-2 text-xs text-gray-600">
                  <span className="material-symbols-outlined text-rose-600 text-base">analytics</span>
                  <span>View revenue reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
