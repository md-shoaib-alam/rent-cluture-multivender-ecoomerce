"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VendorAddProductPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState("new");
  const [availability, setAvailability] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") redirect("/login");
    if (session?.user?.role !== "VENDOR" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard/customer");
    }
  }, [status, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed lg:relative z-50 h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">apparel</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-white">Rent Culture</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Seller Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <Link href="/dashboard/vendor" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/dashboard/vendor/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">My Listings</span>
          </Link>
          <Link href="/dashboard/vendor/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            <Link href="/dashboard/vendor" className="hover:text-white transition-colors">Dashboard</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href="/dashboard/vendor/products" className="hover:text-white transition-colors">Listings</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary">New Listing</span>
          </div>
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
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white">Add New Product</h1>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 border border-slate-700 font-medium text-sm rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
                Save Draft
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-shadow shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Listing"}
              </button>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 pb-12">
            {/* Left Column: Details & Pricing */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              {/* Product Details Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-primary">info</span>
                  Product Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Title</label>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder:text-slate-500" 
                      placeholder="e.g. Vintage Silk Evening Gown" 
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none text-white">
                        <option>Select Category</option>
                        <option>Dresses</option>
                        <option>Suits & Blazers</option>
                        <option>Accessories</option>
                        <option>Designer Bags</option>
                        <option>Lehengas</option>
                        <option>Sarees</option>
                        <option>Sherwanis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Size</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none text-white">
                        <option>Select Size</option>
                        <option>Extra Small (XS)</option>
                        <option>Small (S)</option>
                        <option>Medium (M)</option>
                        <option>Large (L)</option>
                        <option>Extra Large (XL)</option>
                        <option>Free Size</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder:text-slate-500 min-h-[120px]" 
                      placeholder="Describe your product, including brand, material, occasion suitable for..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Condition</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        type="button"
                        onClick={() => setCondition("new")}
                        className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${condition === "new" ? "border-primary bg-primary/10 text-primary" : "border-slate-700 text-slate-400 hover:border-primary"}`}
                      >
                        New w/ Tags
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCondition("excellent")}
                        className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${condition === "excellent" ? "border-primary bg-primary/10 text-primary" : "border-slate-700 text-slate-400 hover:border-primary"}`}
                      >
                        Excellent
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCondition("gently")}
                        className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${condition === "gently" ? "border-primary bg-primary/10 text-primary" : "border-slate-700 text-slate-400 hover:border-primary"}`}
                      >
                        Gently Used
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Logistics Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  Pricing & Logistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Original Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-slate-400 text-sm">₹</span>
                      <input 
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary outline-none text-white placeholder:text-slate-500" 
                        placeholder="0.00" 
                        type="number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rental (Per Day)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-slate-400 text-sm">₹</span>
                      <input 
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary outline-none text-white placeholder:text-slate-500" 
                        placeholder="0.00" 
                        type="number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      Security Deposit
                      <span className="material-symbols-outlined text-[14px] text-slate-500">info_outline</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-slate-400 text-sm">₹</span>
                      <input 
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary outline-none text-white placeholder:text-slate-500" 
                        placeholder="0.00" 
                        type="number"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <div>
                      <p className="font-bold text-sm text-white">Availability Calendar</p>
                      <p className="text-xs text-slate-400">Enable booking requests for specific dates</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      checked={availability} 
                      onChange={(e) => setAvailability(e.target.checked)}
                      className="sr-only peer" 
                      type="checkbox" 
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Compliance Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  Compliance
                </h2>
                <div className="p-6 border-2 border-dashed border-slate-700 rounded-xl text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-white">Upload Dry Clean Proof</h3>
                  <p className="text-xs text-slate-400 mb-4 max-w-xs mx-auto">Upload a recent receipt or certificate from a certified professional cleaner to verify sanitation.</p>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded uppercase tracking-wide transition-colors">
                    Choose File
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Media Upload */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-8">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-primary">photo_library</span>
                  Media Assets
                </h2>

                {/* Video Section (Mandatory) */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                    Video Walkthrough
                    <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">REQUIRED</span>
                  </label>
                  <div className="aspect-video bg-slate-800 border-2 border-dashed border-red-900/30 rounded-xl flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-red-400 text-4xl mb-2 group-hover:scale-110 transition-transform">videocam</span>
                    <p className="text-sm font-bold text-white">Add Item Video</p>
                    <p className="text-xs text-slate-400 mt-1">Show the item in movement to build trust.</p>
                  </div>
                </div>

                {/* Images Grid */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Product Photos (Min 3)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="aspect-square bg-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden relative group">
                      <div className="w-full h-full flex items-center justify-center bg-slate-700">
                        <span className="material-symbols-outlined text-slate-500">image</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-[10px] font-bold text-center py-1">MAIN</div>
                    </div>
                    <div className="aspect-square bg-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden relative group">
                      <div className="w-full h-full flex items-center justify-center bg-slate-700">
                        <span className="material-symbols-outlined text-slate-500">image</span>
                      </div>
                    </div>
                    <div className="aspect-square bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-slate-500">add_a_photo</span>
                    </div>
                    <div className="aspect-square bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-slate-500">add_a_photo</span>
                    </div>
                    <div className="aspect-square bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-slate-500">add_a_photo</span>
                    </div>
                    <div className="aspect-square bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-slate-500">add_a_photo</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-4 leading-relaxed italic">
                    * Higher quality photos increase booking rates by up to 45%. We recommend using natural daylight and neutral backgrounds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
