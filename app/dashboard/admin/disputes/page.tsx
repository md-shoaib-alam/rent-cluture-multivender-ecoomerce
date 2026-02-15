"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Dispute {
  id: string;
  type: string;
  status: string;
  title: string;
  description: string;
  rental: {
    orderNumber: string;
    totalAmount: number;
    customer: {
      user: {
        name: string;
        email: string;
      }
    }
    vendor: {
      businessName: string;
    }
  };
  createdAt: Date;
}

export default function AdminDisputesPage() {
  const { data: session, status } = useSession();
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

    fetchDisputes();
  }, [status, session]);

  const fetchDisputes = async () => {
    try {
      const res = await fetch("/api/admin/disputes");
      if (res.ok) {
        const data = await res.json();
        setDisputes(data.disputes || []);
      }
    } catch (error) {
      console.error("Error fetching disputes:", error);
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

        <button 
          className="absolute top-4 right-4 lg:hidden p-2 text-gray-400"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
          <Link href="/dashboard/admin" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/dashboard/admin/users" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">User Management</span>
          </Link>
          <Link href="/dashboard/admin/vendors" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm font-medium">KYC Approvals</span>
          </Link>
          <Link href="/dashboard/admin/disputes" className="flex items-center gap-3 px-3 py-2.5 bg-rose-600/10 text-rose-600 rounded-lg transition-colors">
            <span className="material-symbols-outlined">gavel</span>
            <span className="text-sm font-semibold">Disputes</span>
          </Link>
          <Link href="/dashboard/admin/finance" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-sm font-medium">Escrow</span>
          </Link>
          <Link href="/dashboard/admin/orders" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Revenue</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
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
        <header className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">All Disputes</h2>
            <p className="text-gray-500 text-sm mt-1">View and manage all rental disputes.</p>
          </div>
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {disputes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No disputes found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Dispute</th>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Vendor</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {disputes.map((dispute) => (
                    <tr key={dispute.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">#{dispute.id.slice(-4)}</div>
                        <div className="text-xs text-gray-500 mt-1">{dispute.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-rose-600">{dispute.rental?.orderNumber || "N/A"}</div>
                        <div className="text-xs text-gray-500">₹{dispute.rental?.totalAmount || 0}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {dispute.rental?.customer?.user?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {dispute.rental?.vendor?.businessName || "Unknown"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded uppercase ${
                          dispute.type === "DAMAGE" ? "bg-red-100 text-red-600" :
                          dispute.type === "LATE_RETURN" ? "bg-orange-100 text-orange-600" :
                          "bg-slate-100 text-gray-600"
                        }`}>
                          {dispute.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-gray-600">{dispute.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
