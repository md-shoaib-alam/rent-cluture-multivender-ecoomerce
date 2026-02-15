"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
  _count: {
    orders: number;
  };
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }

    fetchUsers();
  }, [status, session]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin/users`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name?.toLowerCase().includes(search.toLowerCase()) ||
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || user.role === filter;
    return matchesSearch && matchesFilter;
  });

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
          <Link href="/dashboard/admin/users" className="flex items-center gap-3 px-3 py-2.5 bg-rose-600/10 text-rose-600 rounded-lg">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-semibold">User Management</span>
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
          <Link href="/dashboard/admin/orders" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm">Revenue</span>
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
            <h2 className="text-xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-500 text-sm">Manage all registered users</p>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">group</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Users</p>
                <p className="text-xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">person</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Customers</p>
                <p className="text-xl font-bold text-gray-900">{users.filter(u => u.role === "USER").length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">store</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vendors</p>
                <p className="text-xl font-bold text-gray-900">{users.filter(u => u.role === "VENDOR").length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-600">admin_panel_settings</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Admins</p>
                <p className="text-xl font-bold text-gray-900">{users.filter(u => u.role === "ADMIN").length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-600/20"
            />
          </div>
          <div className="flex gap-2">
            {["ALL", "USER", "VENDOR", "ADMIN"].map((role) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === role 
                    ? "bg-rose-600 text-white" 
                    : "bg-white text-gray-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {role === "ALL" ? "All" : role === "USER" ? "Customers" : role === "VENDOR" ? "Vendors" : "Admins"}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Orders</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-600">person</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name || "No Name"}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                          user.role === "ADMIN" ? "bg-rose-100 text-rose-600" :
                          user.role === "VENDOR" ? "bg-purple-100 text-purple-600" :
                          "bg-blue-100 text-blue-600"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {user._count.orders}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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
