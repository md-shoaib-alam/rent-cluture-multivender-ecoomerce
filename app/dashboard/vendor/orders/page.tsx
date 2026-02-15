"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerImage?: string;
  status: string;
  rentalStartDate: string;
  rentalEndDate: string;
  totalAmount: number;
  items: {
    id: string;
    productName: string;
    productImage: string;
    variantSize?: string;
    dailyPrice: number;
    rentalDays: number;
    subtotal: number;
  }[];
  createdAt: string;
}

export default function VendorOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") redirect("/login");
    if (session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }
    fetchOrders();
  }, [status, session, filter]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/vendor/orders?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-400";
      case "CONFIRMED":
        return "bg-blue-500/10 text-blue-400";
      case "SHIPPED":
        return "bg-purple-500/10 text-purple-400";
      case "DELIVERED":
        return "bg-indigo-500/10 text-indigo-400";
      case "ACTIVE":
        return "bg-green-500/10 text-green-400";
      case "RETURN_REQUESTED":
        return "bg-orange-500/10 text-orange-400";
      case "RETURNED":
        return "bg-emerald-500/10 text-emerald-400";
      case "CANCELLED":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-slate-700 text-slate-400";
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
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-50 lg:z-0
        w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
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
          <Link href="/dashboard/vendor/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link href="/dashboard/vendor/earnings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-xl font-bold text-white">Orders</h1>
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

        <div className="flex-1 overflow-y-auto p-8">
          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {["all", "PENDING", "CONFIRMED", "SHIPPED", "ACTIVE", "RETURNED", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-primary text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                {status === "all" ? "All Orders" : status.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-slate-500 text-3xl">shopping_bag</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">No orders found</h3>
                <p className="text-slate-500">Orders will appear here when customers rent your items.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase">
                    <tr>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Rental Period</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/30">
                        <td className="px-6 py-4">
                          <span className="font-bold text-sm text-white">#{order.orderNumber}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-slate-700 overflow-hidden">
                              {order.customerImage ? (
                                <img alt={order.customerName} className="w-full h-full object-cover" src={order.customerImage} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                                  {order.customerName[0]}
                                </div>
                              )}
                            </div>
                            <span className="text-sm text-slate-300">{order.customerName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item) => (
                              <div key={item.id} className="size-8 rounded-lg border-2 border-slate-900 overflow-hidden">
                                <img alt={item.productName} className="w-full h-full object-cover" src={item.productImage} />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border-2 border-slate-900 text-white">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {formatDate(order.rentalStartDate)} - {formatDate(order.rentalEndDate)}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">₹{order.totalAmount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            {order.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatDate(order.createdAt)}
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
