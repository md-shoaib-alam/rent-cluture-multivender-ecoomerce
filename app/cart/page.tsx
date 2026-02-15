"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, removeItem, getTotalDeposit, getTotalRentals, clearCart } = useCartStore();

  const totalDeposit = getTotalDeposit();
  const rentalCount = getTotalRentals();

  const handleCheckout = () => {
    if (status === "unauthenticated") {
      // Save current URL to redirect back after login
      router.push("/login?callbackUrl=/cart");
      return;
    }
    // Proceed to checkout
    alert("Checkout functionality coming soon!");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/categories">
              <Button className="mt-6">Browse Collection</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                        {item.variantSize && (
                          <p className="text-sm text-gray-500">Size: {item.variantSize}</p>
                        )}
                        {item.variantColor && (
                          <p className="text-sm text-gray-500">Color: {item.variantColor}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {item.rentalStart && item.rentalEnd
                            ? `${new Date(item.rentalStart).toLocaleDateString()} - ${new Date(
                                item.rentalEnd
                              ).toLocaleDateString()}`
                            : "Select dates"}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-500">${item.dailyPrice}/day</p>
                        <p className="text-xs text-gray-500">Deposit: ${item.depositAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.dailyPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">+ ${item.depositAmount} deposit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({rentalCount} items)</span>
                  <span>${(items.reduce((sum, item) => sum + item.dailyPrice * item.quantity, 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Deposit</span>
                  <span>${totalDeposit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(items.reduce((sum, item) => sum + item.dailyPrice * item.quantity, 0) + totalDeposit).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                * The deposit will be refunded when you return the items in good condition.
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                {status === "loading" ? "Loading..." : status === "unauthenticated" ? "Sign In to Checkout" : "Checkout"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <button
                onClick={clearCart}
                className="w-full mt-3 text-sm text-gray-500 hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
