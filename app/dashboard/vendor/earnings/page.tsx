"use client";

import { useState, useEffect } from "react";
import { IndianRupee, Wallet, TrendingUp, DollarSign, Clock } from "lucide-react";

interface Payout {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
  processedAt: string | null;
}

interface EarningsData {
  totalEarnings: number;
  pendingPayouts: number;
  totalSales: number;
  rating: number;
  payouts: Payout[];
  rentals: number;
}

export default function VendorEarningsPage() {
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/vendor/earnings");
      const data = await res.json();
      if (res.ok) {
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;

    try {
      const res = await fetch("/api/vendor/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(withdrawAmount) }),
      });
      if (res.ok) {
        setShowWithdrawModal(false);
        setWithdrawAmount("");
        fetchEarnings();
      }
    } catch (error) {
      console.error("Error requesting payout:", error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PROCESSING: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      FAILED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your earnings and manage payouts</p>
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="px-6 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-medium shadow-md flex items-center gap-2"
        >
          <IndianRupee className="w-4 h-4" />
          Request Payout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{data?.totalEarnings?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Payouts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{data?.pendingPayouts?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {data?.totalSales || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {data?.rating?.toFixed(1) || "0.0"}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <span className="material-symbols-outlined text-2xl">star</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payouts History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Payout History</h2>
        </div>
        {data?.payouts && data.payouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payout ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {data.payouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{payout.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹{Number(payout.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payout.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          payout.status
                        )}`}
                      >
                        {payout.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payout.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No payouts yet
            </h3>
            <p className="mt-1 text-gray-500">
              Your payout history will appear here once you request a withdrawal.
            </p>
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all scale-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Request Payout</h3>
              <p className="text-sm text-gray-500 mt-1">Enter the amount you wish to withdraw to your linked bank account.</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-400 text-lg font-semibold bg-gray-50"
                    placeholder="0.00"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <span className="text-gray-600">Available Balance:</span>
                  <span className="font-bold text-green-600">₹{data?.pendingPayouts?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition font-semibold shadow-lg shadow-rose-200"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
