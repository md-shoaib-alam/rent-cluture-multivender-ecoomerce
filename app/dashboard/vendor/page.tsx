"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

interface VendorStats {
  totalProducts: number;
  activeListings: number;
  totalOrders: number;
  totalEarnings: number;
  pendingOrders: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  rentalPrice: number;
  status: string;
  totalInventory: number;
  availableInventory: number;
  imageUrl?: string;
}

export default function VendorDashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<VendorStats>({
    totalProducts: 0,
    activeListings: 0,
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") redirect("/login");
    if (session?.user?.role !== "VENDOR") redirect("/dashboard/customer");
    fetchDashboardData();
  }, [status, session]);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await fetch("/api/vendor/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats({
          totalProducts: statsData.totalListings || 0,
          activeListings: statsData.activeRentals || 0,
          totalOrders: statsData.activeRentals || 0,
          totalEarnings: statsData.totalEarnings || 0,
          pendingOrders: statsData.pendingReturns || 0,
        });
      }
      const productsRes = await fetch("/api/vendor/products?limit=5");
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-500/10 text-emerald-400";
      case "Rented": return "bg-blue-500/10 text-blue-400";
      case "Maintenance": return "bg-orange-500/10 text-orange-400";
      default: return "bg-slate-700 text-slate-400";
    }
  };

  const getInventoryColor = (status: string) => {
    switch (status) {
      case "Active": return "#10b981";
      case "Rented": return "#3b82f6";
      case "Maintenance": return "#f97316";
      default: return "#64748b";
    }
  };

  const getInventoryPercentage = (available: number, total: number) => {
    if (total === 0) return 0;
    return (available / total) * 100;
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-50 lg:z-0 w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 lg:p-6 flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">apparel</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-white">Rent Culture</h1>
            <p className="text-xs text-slate-500 mt-1">Seller Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-2 lg:mt-4 overflow-y-auto">
          <Link href="/dashboard/vendor" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/dashboard/vendor/products" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">My Listings</span>
          </Link>
          <Link href="/dashboard/vendor/orders" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link href="/dashboard/vendor/earnings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm">Earnings</span>
          </Link>
          <Link href="/dashboard/vendor/analytics" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm">Analytics</span>
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account</p>
          </div>
          
          <Link href="/dashboard/vendor/kyc" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm">KYC & Agreement</span>
          </Link>
          <Link href="/dashboard/vendor/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg w-full">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
        {/* Mobile Header */}
        <header className="h-14 lg:h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <button onClick={toggleSidebar} className="lg:hidden p-2 text-white">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="lg:hidden font-bold text-lg text-white">Seller Hub</h1>
          <div className="flex items-center gap-3">
            <div className="size-8 lg:size-10 rounded-full bg-slate-700 overflow-hidden">
              {session?.user?.image ? (
                <img alt="Profile" className="w-full h-full object-cover" src={session.user.image} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-sm">
                  {session?.user?.name?.[0] || "V"}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <span className="size-8 lg:size-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg lg:text-xl">inventory</span>
                </span>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+12%</span>
              </div>
              <p className="text-slate-400 text-xs lg:text-sm font-medium">Total Listings</p>
              <h3 className="text-xl lg:text-2xl font-bold mt-1 text-white">{stats.totalProducts}</h3>
            </div>
            <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <span className="size-8 lg:size-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg lg:text-xl">calendar_today</span>
                </span>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+5.2%</span>
              </div>
              <p className="text-slate-400 text-xs lg:text-sm font-medium">Active Rentals</p>
              <h3 className="text-xl lg:text-2xl font-bold mt-1 text-white">{stats.activeListings}</h3>
            </div>
            <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <span className="size-8 lg:size-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg lg:text-xl">currency_rupee</span>
                </span>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+18%</span>
              </div>
              <p className="text-slate-400 text-xs lg:text-sm font-medium">Total Earnings</p>
              <h3 className="text-xl lg:text-2xl font-bold mt-1 text-white">₹{stats.totalEarnings.toLocaleString()}</h3>
            </div>
            <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <span className="size-8 lg:size-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg lg:text-xl">assignment_return</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs lg:text-sm font-medium">Pending Returns</p>
              <h3 className="text-xl lg:text-2xl font-bold mt-1 text-white">{stats.pendingOrders}</h3>
            </div>
          </div>

          {/* Manage Listings */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-white">Manage Listings</h2>
              <p className="text-sm text-slate-500 mt-1">Track your products</p>
            </div>
            <Link href="/dashboard/vendor/products/add" className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 bg-primary text-white font-bold rounded-lg text-sm">
              <span className="material-symbols-outlined">add</span>
              Add New
            </Link>
          </div>

          {/* Table - Responsive */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {products.length === 0 ? (
              <div className="p-8 lg:p-12 text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-2xl lg:text-3xl text-slate-500">inventory_2</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">No listings yet</h3>
                <p className="text-slate-500 text-sm">Start adding products</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-[10px] lg:text-xs font-bold uppercase">
                    <tr>
                      <th className="px-3 lg:px-6 py-3 lg:py-4">Product</th>
                      <th className="px-3 lg:px-6 py-3 lg:py-4 hidden sm:table-cell">Category</th>
                      <th className="px-3 lg:px-6 py-3 lg:py-4">Price</th>
                      <th className="px-3 lg:px-6 py-3 lg:py-4 hidden md:table-cell">Status</th>
                      <th className="px-3 lg:px-6 py-3 lg:py-4 hidden lg:table-cell">Inventory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-800/30">
                        <td className="px-3 lg:px-6 py-3 lg:py-4">
                          <div className="flex items-center gap-2 lg:gap-4">
                            <div className="size-10 lg:size-14 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                              {product.imageUrl ? (
                                <img alt={product.name} className="w-full h-full object-cover" src={product.imageUrl} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="material-symbols-outlined text-slate-500">image</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-xs lg:text-sm font-bold text-white line-clamp-1">{product.name}</p>
                              <p className="text-[10px] lg:text-xs text-slate-500">SKU: {product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-3 lg:py-4 hidden sm:table-cell text-sm text-slate-400">{product.category}</td>
                        <td className="px-3 lg:px-6 py-3 lg:py-4 font-bold text-sm text-white">₹{product.rentalPrice}<span className="text-slate-500 font-normal">/day</span></td>
                        <td className="px-3 lg:px-6 py-3 lg:py-4 hidden md:table-cell">
                          <span className={`px-2 py-1 rounded-full text-[10px] lg:text-xs font-bold ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-3 lg:px-6 py-3 lg:py-4 hidden lg:table-cell">
                          <div className="flex flex-col gap-1 w-20">
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${getInventoryPercentage(product.availableInventory, product.totalInventory)}%`, backgroundColor: getInventoryColor(product.status) }}></div>
                            </div>
                            <span className="text-[10px] text-slate-500">{product.availableInventory}/{product.totalInventory}</span>
                          </div>
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
