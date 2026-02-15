"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, Grid, List, ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Mock products for category
  const products = [
    {
      id: "1",
      name: "Elegant Evening Gown",
      vendor: "Fashion Boutique",
      price: 89,
      deposit: 150,
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: "2",
      name: "Designer Cocktail Dress",
      vendor: "Style Hub",
      price: 65,
      deposit: 100,
      rating: 4.5,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
      sizes: ["S", "M", "L"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/categories" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> All Categories
          </Link>
          <h1 className="text-3xl font-bold text-white capitalize">{slug}</h1>
          <p className="mt-2 text-rose-100">Find the perfect outfit for your event</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            {/* Size Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="px-3 py-1 border rounded-md text-sm hover:border-rose-500 hover:text-rose-500"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Under ₹50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">₹50 - ₹100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">₹100 - ₹200</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Over ₹200</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort & View */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Showing {products.length} products</p>
              <div className="flex items-center space-x-4">
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Sort by: Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Top Rated</option>
                </select>
                <div className="flex border rounded-md">
                  <button className="p-2 hover:bg-gray-100">
                    <Grid className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100">
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/5] bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500">{product.vendor}</p>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <p className="text-xs text-gray-500">Deposit: ₹{product.deposit}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
