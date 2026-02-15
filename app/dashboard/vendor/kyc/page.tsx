"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle, Clock, AlertCircle, Upload, Menu } from "lucide-react";
import { VendorSidebar } from "@/components/dashboard/vendor-sidebar";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <VendorSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950">
        <header className="h-14 lg:h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <div className="flex items-center gap-3">
             <button onClick={toggleSidebar} className="lg:hidden p-2 text-white">
                <Menu className="h-6 w-6" />
             </button>
             <h1 className="text-lg lg:text-xl font-bold text-white">KYC & Agreement</h1>
          </div>
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
                <p className="text-slate-300">{getStatusText(vendorInfo?.isVerified || false)}</p>
              </div>
            </div>
            
            {vendorInfo?.isVerified && vendorInfo?.verifiedAt && (
              <p className="text-sm text-slate-400 mt-4">
                Verified on {new Date(vendorInfo.verifiedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Business Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-6 text-white">Business Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-400">Business Name</label>
                <p className="font-semibold text-lg text-white">{vendorInfo?.businessName || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Phone Number</label>
                <p className="font-semibold text-white">{vendorInfo?.phone || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Commission Rate</label>
                <p className="font-semibold text-white">{vendorInfo?.commissionRate || 10}%</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Total Sales</label>
                <p className="font-semibold text-white">{vendorInfo?.totalSales || 0} orders</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Rating</label>
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
              <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">badge</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">ID Proof</p>
                      <p className="text-sm text-slate-400">Aadhar Card, PAN Card, or Passport</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">Pending</span>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Address Proof */}
              <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">home</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Business Address Proof</p>
                      <p className="text-sm text-slate-400">Utility bill, rent agreement, or GST certificate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">Pending</span>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bank Account Proof */}
              <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">account_balance</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Bank Account Proof</p>
                      <p className="text-sm text-slate-400">Cancelled cheque or bank statement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-medium">Pending</span>
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
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
            <div className="flex items-start gap-3 p-4 bg-slate-800/80 rounded-lg">
              <AlertCircle className="h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300">
                  By verifying your account, you agree to our Terms of Service and Seller Agreement. 
                  You confirm that all information provided is accurate and authentic.
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Accept Terms
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
