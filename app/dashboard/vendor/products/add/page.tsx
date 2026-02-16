"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brandId: "",
    dailyPrice: "",
    weeklyPrice: "",
    depositAmount: "50",
    condition: "new",
    careInstructions: "",
    images: [] as string[],
  });
  const [imageUrls, setImageUrls] = useState<string>("");

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();
      if (res.ok) {
        setBrands(data.brands || []);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse image URLs
      const images = imageUrls
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const res = await fetch("/api/vendor/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images,
          dailyPrice: parseFloat(formData.dailyPrice),
          weeklyPrice: formData.weeklyPrice ? parseFloat(formData.weeklyPrice) : null,
          depositAmount: parseFloat(formData.depositAmount),
        }),
      });

      if (res.ok) {
        router.push("/dashboard/vendor/products");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/vendor/products"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add New Product</h1>
        <p className="text-gray-600">Create a new rental listing</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white transition-all font-medium"
                  placeholder="e.g., Elegant Evening Gown"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white transition-all font-medium"
                  placeholder="Describe your product..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-gray-50/50 transition-all font-medium"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-gray-50/50 transition-all font-medium"
                  >
                    <option value="">Select brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Daily Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.dailyPrice}
                    onChange={(e) => setFormData({ ...formData, dailyPrice: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white transition-all font-medium"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weekly Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.weeklyPrice}
                    onChange={(e) => setFormData({ ...formData, weeklyPrice: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white transition-all font-medium"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deposit Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.depositAmount}
                    onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white transition-all font-medium"
                    placeholder="50.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Condition */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Details & Condition</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-gray-50/50 transition-all font-medium"
                >
                  <option value="new">New</option>
                  <option value="like_new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Care Instructions
                </label>
                <textarea
                  rows={3}
                  value={formData.careInstructions}
                  onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-400 bg-gray-50/50 transition-all font-medium"
                  placeholder="e.g., Dry clean only, Handle with care..."
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Images</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URLs (one per line)
              </label>
              <textarea
                rows={4}
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 placeholder:text-gray-500 bg-white transition-all font-medium font-mono text-sm"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
              <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">info</span>
                Enter image URLs, one per line. First image will be the main product image.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition disabled:opacity-50 font-semibold shadow-lg shadow-rose-200"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
