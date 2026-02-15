"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface Vendor {
  id: string;
  businessName: string;
  businessSlug: string;
  description: string | null;
  phone: string | null;
  status: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
}

export default function AdminVendorsPage() {
  const { data: session, status } = useSession();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }

    fetchVendors();
  }, [status, session, filter]);

  const fetchVendors = async () => {
    try {
      const res = await fetch(`/api/admin/vendors?status=${filter}`);
      const data = await res.json();
      setVendors(data.vendors || []);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (vendorId: string) => {
    try {
      const res = await fetch(`/api/admin/vendors/${vendorId}/approve`, {
        method: "POST",
      });
      
      if (res.ok) {
        setVendors(vendors.filter((v) => v.id !== vendorId));
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  const handleReject = async (vendorId: string) => {
    try {
      const res = await fetch(`/api/admin/vendors/${vendorId}/reject`, {
        method: "POST",
      });
      
      if (res.ok) {
        setVendors(vendors.filter((v) => v.id !== vendorId));
      }
    } catch (error) {
      console.error("Error rejecting vendor:", error);
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
          <Link href="/dashboard/admin/vendors" className="flex items-center gap-3 px-3 py-2.5 bg-rose-600/10 text-rose-600 rounded-lg">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm font-semibold">KYC Approvals</span>
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
            <h2 className="text-xl font-bold text-gray-900">KYC Approvals</h2>
            <p className="text-gray-500 text-sm">Review and approve vendor applications</p>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {["PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === status 
                  ? "bg-rose-600 text-white" 
                  : "bg-white text-gray-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {vendors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No {filter.toLowerCase()} vendors found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Owner</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Applied</th>
                    <th className="px-6 py-4">Status</th>
                    {filter === "PENDING" && <th className="px-6 py-4 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{vendor.businessName}</div>
                        <div className="text-xs text-gray-500">@{vendor.businessSlug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{vendor.user.name || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{vendor.user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(vendor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                          vendor.status === "APPROVED" ? "bg-green-100 text-green-600" :
                          vendor.status === "REJECTED" ? "bg-red-100 text-red-600" :
                          "bg-yellow-100 text-yellow-600"
                        }`}>
                          {vendor.status}
                        </span>
                      </td>
                      {filter === "PENDING" && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleReject(vendor.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(vendor.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        </td>
                      )}
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
