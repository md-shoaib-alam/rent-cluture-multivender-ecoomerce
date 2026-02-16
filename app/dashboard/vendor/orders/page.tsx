"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Filter, ShoppingBag, Package, Truck, CheckCircle, XCircle, Clock, IndianRupee } from "lucide-react";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  rentalDays: number;
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  customer: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  payment: {
    status: string;
    method: string;
  } | null;
}

export default function VendorOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = statusFilter
        ? `/api/vendor/orders?status=${statusFilter}`
        : "/api/vendor/orders";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/vendor/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
      ACTIVE: "bg-green-100 text-green-800 border-green-200",
      DELIVERED: "bg-purple-100 text-purple-800 border-purple-200",
      COMPLETED: "bg-gray-100 text-gray-800 border-gray-200",
      CANCELLED: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  const filteredOrders = orders.filter((order) =>
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage your rental orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white shadow-sm transition-all"
          />
        </div>
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-500" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white shadow-sm appearance-none cursor-pointer transition-all font-medium"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="ACTIVE">Active</option>
            <option value="DELIVERED">Delivered</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="mt-2 text-lg font-bold text-gray-900">No orders found</h3>
          <p className="mt-1 text-gray-500 max-w-sm mx-auto">
            {searchQuery || statusFilter ? "Try adjusting your search or filters to find what you're looking for." : "You haven't received any orders yet. Once you do, they'll appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">#{order.id.slice(-8).toUpperCase()}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-bold text-gray-900">{order.customer.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">{order.customer.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <div className="flex items-center gap-1 text-xl font-bold text-gray-900">
                      <IndianRupee className="w-5 h-5" />
                      <span>{Number(order.totalAmount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                            {item.productImage ? (
                              <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Package className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                              <div>
                                <p className="font-bold text-gray-900 line-clamp-1">{item.productName}</p>
                                <div className="flex gap-3 text-sm text-gray-600 mt-1">
                                  <span className="bg-white px-2 py-0.5 rounded border border-gray-200">Qty: {item.quantity}</span>
                                  <span className="bg-white px-2 py-0.5 rounded border border-gray-200">{item.rentalDays} Days</span>
                                </div>
                              </div>
                              <p className="text-sm font-bold text-gray-900 flex items-center gap-0.5 bg-white px-2 py-1 rounded border border-gray-200 self-start">
                                <IndianRupee className="w-3 h-3" />
                                {Number(item.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                    <div className="flex items-center gap-2 text-sm text-blue-900 font-medium">
                      <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <span className="text-blue-700">Rental Period:</span>
                        <span className="font-bold">{new Date(order.startDate).toLocaleDateString()} — {new Date(order.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons with Responsive Grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {order.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-sm flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Confirm
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                          className="px-4 py-2.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition font-bold flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                      </>
                    )}
                    {order.status === "CONFIRMED" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, "ACTIVE")}
                          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold shadow-sm flex items-center justify-center gap-2 sm:col-span-2"
                        >
                          <Package className="w-4 h-4" />
                          Mark as Shipped / Active
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition font-bold flex items-center justify-center gap-2"
                        >
                          Cancel Order
                        </button>
                      </>
                    )}
                    {order.status === "ACTIVE" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                        className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold shadow-sm flex items-center justify-center gap-2 sm:col-span-2"
                      >
                        <Truck className="w-4 h-4" />
                        Mark as Delivered
                      </button>
                    )}
                    {order.status === "DELIVERED" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                        className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-bold shadow-sm flex items-center justify-center gap-2 sm:col-span-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
