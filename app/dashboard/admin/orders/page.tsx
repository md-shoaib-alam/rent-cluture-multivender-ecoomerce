"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Order {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  product: {
    name: string;
  };
  vendor: {
    businessName: string;
  };
}

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }

    fetchOrders();
  }, [status, session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/admin/orders`);
      const data = await res.json();
      setOrders(data.orders || []);
      setStats(data.stats || { totalRevenue: 0, totalOrders: 0, completedOrders: 0, pendingOrders: 0 });
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:relative z-50 lg:z-0 w-64 h-full bg-white border-r border-slate-200 flex flex-col
        transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">hotel</span>
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase">RentSquare</h1>
            <p className="text-[10px] text-gray-500">ADMIN PANEL</p>
          </div>
        </div>
        <button className="absolute top-4 right-4 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          <Link href="/dashboard/admin" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/dashboard/admin/users" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm">User Management</span>
          </Link>
          <Link href="/dashboard/admin/vendors" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm">KYC Approvals</span>
          </Link>
          <Link href="/dashboard/admin/disputes" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">gavel</span>
            <span className="text-sm">Disputes</span>
          </Link>
          <Link href="/dashboard/admin/finance" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-sm">Escrow</span>
          </Link>
          <Link href="/dashboard/admin/orders" className="flex items-center gap-3 px-3 py-2.5 bg-rose-600/10 text-rose-600 rounded-lg">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-semibold">Revenue</span>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button 
            className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-8 bg-gray-50">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Revenue Analytics</h2>
            <p className="text-gray-500 text-sm">Track orders and revenue across the platform</p>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 lg:p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">payments</span>
              </div>
              <span className="text-xs text-gray-500">Total Revenue</span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">receipt_long</span>
              </div>
              <span className="text-xs text-gray-500">Total Orders</span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-600">check_circle</span>
              </div>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-yellow-600">pending</span>
              </div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 88].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-rose-500 rounded-t-lg hover:bg-rose-600 transition-colors" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] text-gray-500">{(i + 1).toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Vendor</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div>{order.user.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">{order.user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.vendor.businessName}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                          order.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                          order.status === "PENDING" ? "bg-yellow-100 text-yellow-600" :
                          order.status === "CANCELLED" ? "bg-red-100 text-red-600" :
                          "bg-blue-100 text-blue-600"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
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
