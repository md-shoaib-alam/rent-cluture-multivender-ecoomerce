"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CheckCircle, Clock, AlertCircle, Upload } from "lucide-react";

interface VendorDocument {
  id: string;
  type: string;
  fileUrl: string;
  status: string;
  verifiedAt: string | null;
}

interface VendorInfo {
  businessName: string;
  phone: string;
  isVerified: boolean;
  verifiedAt: string | null;
  commissionRate: number;
  rating: number;
  totalSales: number;
}

export default function VendorKYCPage() {
  const { data: session, status } = useSession();
  const [vendorInfo, setVendorInfo] = useState<VendorInfo | null>(null);
  const [documents, setDocuments] = useState<VendorDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") redirect("/login");
    if (session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }
    fetchVendorData();
  }, [status, session]);

  const fetchVendorData = async () => {
    try {
      const res = await fetch("/api/vendor/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.vendor) {
          setVendorInfo(data.vendor);
        }
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (verified: boolean) => {
    if (verified) {
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    }
    return <Clock className="h-5 w-5 text-yellow-400" />;
  };

  const getStatusText = (verified: boolean) => {
    if (verified) return "Verified";
    return "Pending Verification";
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
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">apparel</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-white">Rent Culture</h1>
            <p className="text-xs text-slate-500 mt-1">Seller Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <Link href="/dashboard/vendor" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/dashboard/vendor/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">My Listings</span>
          </Link>
          <Link href="/dashboard/vendor/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link href="/dashboard/vendor/earnings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm">Earnings</span>
          </Link>
          <Link href="/dashboard/vendor/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm">Analytics</span>
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase">Account</p>
          </div>
          
          <Link href="/dashboard/vendor/kyc" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-sm">KYC & Agreement</span>
          </Link>
          <Link href="/dashboard/vendor/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
        <header className="h-14 lg:h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 lg:px-8 flex-shrink-0">
          <h1 className="text-lg lg:text-xl font-bold text-white">KYC & Agreement</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Verification Status Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className={`size-14 rounded-full flex items-center justify-center ${vendorInfo?.isVerified ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                {getStatusIcon(vendorInfo?.isVerified || false)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Verification Status</h2>
                <p className="text-slate-400">{getStatusText(vendorInfo?.isVerified || false)}</p>
              </div>
            </div>
            
            {vendorInfo?.isVerified && vendorInfo?.verifiedAt && (
              <p className="text-sm text-slate-500 mt-4">
                Verified on {new Date(vendorInfo.verifiedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Business Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-6 text-white">Business Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-500">Business Name</label>
                <p className="font-semibold text-lg text-white">{vendorInfo?.businessName || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Phone Number</label>
                <p className="font-semibold text-white">{vendorInfo?.phone || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Commission Rate</label>
                <p className="font-semibold text-white">{vendorInfo?.commissionRate || 10}%</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Total Sales</label>
                <p className="font-semibold text-white">{vendorInfo?.totalSales || 0} orders</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Rating</label>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-white">{vendorInfo?.rating?.toFixed(1) || "0.0"}</span>
                  <span className="material-symbols-outlined text-yellow-500">star</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 text-white">Documents</h2>
            
            <div className="space-y-4">
              {/* ID Proof */}
              <div className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">badge</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">ID Proof</p>
                      <p className="text-sm text-slate-500">Aadhar Card, PAN Card, or Passport</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">Pending</span>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Address Proof */}
              <div className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">home</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Business Address Proof</p>
                      <p className="text-sm text-slate-500">Utility bill, rent agreement, or GST certificate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">Pending</span>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bank Account Proof */}
              <div className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-500">account_balance</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Bank Account Proof</p>
                      <p className="text-sm text-slate-500">Cancelled cheque or bank statement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">Pending</span>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6">
            <h2 className="text-lg font-bold mb-4 text-white">Terms & Agreement</h2>
            <div className="flex items-start gap-3 p-4 bg-slate-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-400">
                  By verifying your account, you agree to our Terms of Service and Seller Agreement. 
                  You confirm that all information provided is accurate and authentic.
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90">
                Accept Terms
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
