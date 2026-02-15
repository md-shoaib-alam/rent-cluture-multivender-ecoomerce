"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, Shield, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [rentalDays, setRentalDays] = useState(3);
  const addItem = useCartStore((state) => state.addItem);

  const product = {
    id: params.id,
    name: "Elegant Evening Gown",
    vendor: "Fashion Boutique",
    vendorSlug: "fashion-boutique",
    description: "Stunning evening gown perfect for formal events, galas, and special occasions. Features a flowing silhouette with intricate beadwork and a dramatic train.",
    dailyPrice: 89,
    weeklyPrice: 450,
    deposit: 150,
    rating: 4.8,
    reviewCount: 24,
    condition: "Like New",
    brand: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    selectedColor: "Black",
  };

  const total = product.dailyPrice * rentalDays;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + rentalDays);

    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      variantSize: selectedSize,
      dailyPrice: product.dailyPrice,
      weeklyPrice: product.weeklyPrice || undefined,
      depositAmount: product.deposit,
      vendorId: "1",
      vendorName: product.vendor,
      rentalStart: startDate,
      rentalEnd: endDate,
    });

    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/categories" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to Categories
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="aspect-[4/5] bg-white rounded-lg overflow-hidden mb-4">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-20 h-24 rounded-md overflow-hidden border-2 ${selectedImage === idx ? "border-rose-500" : "border-transparent"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-2">
              <Link href={`/vendor/${product.vendorSlug}`} className="text-sm text-rose-600 hover:underline">
                {product.vendor}
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.dailyPrice}</span>
                <span className="text-gray-500">/day</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Refundable deposit: ₹{product.deposit}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md font-medium ${selectedSize === size ? "border-rose-500 bg-rose-50 text-rose-700" : "border-gray-300 hover:border-gray-400"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color: {product.selectedColor}</h3>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Rental Duration</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} className="px-3 py-2 hover:bg-gray-100">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{rentalDays} days</span>
                  <button onClick={() => setRentalDays(rentalDays + 1)} className="px-3 py-2 hover:bg-gray-100">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button onClick={handleAddToCart} size="xl" className="w-full">
                Add to Cart - ₹{total}
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">Secure Deposit</p>
              </div>
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">Easy Returns</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <dl className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Condition</dt>
                  <dd className="text-sm font-medium text-gray-900">{product.condition}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Brand</dt>
                  <dd className="text-sm font-medium text-gray-900">{product.brand}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
