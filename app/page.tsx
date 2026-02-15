"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  images: string[];
  dailyPrice: number;
  category: {
    name: string;
  };
  vendor: {
    businessName: string;
  };
}

export default function HomePage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const catRes = await fetch("/api/categories");
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories?.slice(0, 4) || []);
      }

      // Fetch featured products
      const prodRes = await fetch("/api/products?featured=true&limit=8");
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Demo data for categories
  const demoCategories = [
    { id: "1", name: "Wedding", slug: "wedding", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrSrb6r1o", productCount: 45 },
    { id: "2", name: "Party", slug: "party", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr", productCount: 32 },
    { id: "3", name: "Formal", slug: "formal", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM", productCount: 28 },
    { id: "4", name: "Casual", slug: "casual", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73", productCount: 56 },
  ];

  // Demo products
  const demoProducts = [
    { id: "1", name: "Velvet Zardosi Lehenga", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW"], dailyPrice: 12499, category: { name: "Sabyasachi Heritage" }, vendor: { businessName: "Royal Attire" } },
    { id: "2", name: "Midnight Blue Sherwani", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x"], dailyPrice: 8999, category: { name: "Manish Malhotra" }, vendor: { businessName: "Modern Couture" } },
    { id: "3", name: "Floral Organza Gown", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951"], dailyPrice: 6500, category: { name: "Anushree Reddy" }, vendor: { businessName: "Elite Threads" } },
    { id: "4", name: "Hand-Embroidery Silk Saree", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtqU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD"], dailyPrice: 4999, category: { name: "Anita Dongre" }, vendor: { businessName: "Royal Attire" } },
  ];

  const displayCategories = categories.length > 0 ? categories : demoCategories;
  const displayProducts = products.length > 0 ? products : demoProducts;

  return (
    <div className="min-h-screen bg-white text-black font-display overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <span className="material-symbols-outlined text-xl md:text-2xl">diamond</span>
              </div>
              <h1 className="text-lg md:text-xl font-black tracking-tighter uppercase italic">Rent Culture</h1>
            </Link>
          </div>
          
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link href="/categories" className="text-sm font-semibold hover:text-primary transition-colors">Browse</Link>
            <Link href="/categories" className="text-sm font-semibold hover:text-primary transition-colors">Categories</Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-40 lg:w-48 placeholder:text-gray-400" placeholder="Search designers, styles..." type="text"/>
            </div>
          </nav>
          
          {/* Auth/Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden lg:flex items-center gap-1 mr-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Verified Platform</span>
            </div>
            {session ? (
              <Link href="/dashboard/customer" className="text-sm font-bold px-3 md:px-4 py-2 hover:bg-gray-50 rounded-lg">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-bold px-3 md:px-4 py-2 hover:bg-gray-50 rounded-lg hidden sm:block">
                Login
              </Link>
            )}
            <Link href="/signup" className="bg-primary text-white text-sm font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[85vh] w-full bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-80">
          <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAECJGPLNxbR5hpiPk6g0d6230rHZfKK9Tqz9cj2bBJ9ZlNu860Ax9TL7RCL1A67ARiTN3jfF8xcXC9HByblSdtFD99noy-RAZC33mn1b7vZtAkonJ-BX2JcP3npfq5jAMSOTFtwfA9sxkfxNTacmuLN7P29HPup50GRSYZAT54cHDaZc5M18A4ZT12mezn6iPUbOQxjIqr4OjVa8T83AAIiig4pOewCl6Y0Nxu6IYlcAwdqwMIIMeGW2b_4eklQZlfES3Pm-2c8ViC')"}}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-start">
          <span className="text-primary font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 block text-sm md:text-base">Jaipur's Elite Rental Hub</span>
          <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-black leading-tight mb-4 md:mb-6 max-w-3xl">
            Rent the Culture, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Wear the Luxury</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mb-6 md:mb-10 leading-relaxed font-light">
            Access India's most exclusive designer wardrobes for a fraction of the price. From heritage lehengas to modern couture.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link href="/categories" className="bg-primary text-white font-bold px-6 md:px-10 py-3 md:py-5 rounded-lg hover:scale-105 transition-transform flex items-center gap-2">
              Shop Now <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link href="/how-it-works" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-6 md:px-10 py-3 md:py-5 rounded-lg hover:bg-white hover:text-black transition-all">
              How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Occasion Categories */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tighter">Shop by Occasion</h3>
            <p className="text-gray-500">Handpicked collections for every milestone.</p>
          </div>
          <Link href="/categories" className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all text-sm">View All Occasions</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-xl mb-3 md:mb-4 bg-gray-100">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{backgroundImage: `url('${category.image}')`}}></div>
              </div>
              <h4 className="text-base md:text-lg font-bold flex items-center justify-between">
                {category.name} <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">church</span>
              </h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Rentals Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Trending Rentals</h3>
            <div className="h-px flex-grow bg-gray-200"></div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 hidden sm:block">Jaipur Hotspots</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10 bg-white/90 backdrop-blur px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 border border-gray-100">
                    <span className="material-symbols-outlined text-primary text-xs md:text-sm font-bold">verified_user</span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-black">Verified</span>
                  </div>
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: `url('${product.images[0]}')`}}></div>
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-[10px] md:text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">{product.category.name}</p>
                  <h5 className="text-sm md:text-lg font-bold mb-2 md:mb-4 line-clamp-1">{product.name}</h5>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg md:text-2xl font-black">₹{product.dailyPrice.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 ml-1">/ 3 Days</span>
                    </div>
                    <button className="bg-black text-white p-2 md:p-2.5 rounded-lg group-hover:bg-primary transition-colors">
                      <span className="material-symbols-outlined text-sm md:text-base">shopping_bag</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our USP Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 md:mb-4">Why Rent with Culture?</h3>
          <p className="text-gray-500">The most secure and transparent way to experience high-fashion.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-3xl md:text-4xl">currency_exchange</span>
            </div>
            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Price Comparison</h4>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">We aggregate prices from top boutiques in Jaipur to ensure you get the most competitive rental rates.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-3xl md:text-4xl">admin_panel_settings</span>
            </div>
            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Escrow Protected</h4>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">Your payment is held securely in escrow and only released to the owner once you've received the garment as described.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-3xl md:text-4xl">eco</span>
            </div>
            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Eco-Friendly</h4>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">Join the circular fashion movement. Renting reduces textile waste by 95% compared to purchasing new.</p>
          </div>
        </div>
      </section>

      {/* Become a Seller CTA */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative bg-primary rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-20 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[200px] md:text-[300px] lg:text-[400px]">storefront</span>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">Your Closet is an Asset. <br/>Start Earning Today.</h3>
            <p className="text-white/80 text-base md:text-lg mb-6 md:mb-10">List your designer pieces on Rent Culture and earn passive income while our escrow system handles the security.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/vendors/apply" className="bg-white text-primary font-black px-6 md:px-10 py-3 md:py-5 rounded-xl hover:scale-105 transition-transform text-center">
                Become a Seller
              </Link>
              <div className="flex items-center gap-3 text-white/90 px-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-gray-200 bg-cover" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtMo3Kh-gbwDCR__XC6c6K7BebZc8JxhKeZmcYz0TBp8MIZ2Sxkc7pzRYPLhC2I-sbdnBFU8nzUdebbtbGFlhadVDN66qnyNuq7-ppmCLC5-Cy8Zsq_Rr0LopHoKmY0lwOaMc7FBLMM_7Y9dHgYacn_r8k-VwYyd8CrwZQFURN_x1CYtkTV0zpY9cF_xBEJhtlPVThdKMaI8Me0b56FNHheTDnEhuL-Hn4tZo9mA852jZPft-OFjRaVs5Rv3dDHnmDdvCcDgP-njbN')"}}></div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-gray-200 bg-cover" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0aCcW8EhKg-Mw0A9YL-2hQQWmhQ-V8ZPRmG6GmTKEDo4OQbtgMfQzlAtaSEsgQ8GIov2jKpTavlHaEgY07Rk6AYdSSlgAklbcdvMUj5pR8VfGug4S3k24sn2TEML8pBsquLSrXAl-XeEqxj6Ya5nNvdg5vnK2lHImSRTmC8PNJKwqI3svyMH-LQJfXYPeabZPK_pH8zJdct56j3C1hD2sB_4vsZ9js9scNVgzJuLa3Vpo2Ejg_USbQusNY2AcyTue8NVWN_7jMCwo')"}}></div>
                </div>
                <span className="text-xs md:text-sm font-bold whitespace-nowrap">Joined by 500+ Local Sellers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 md:pt-24 pb-8 md:pb-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Trust Badges Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
            <div className="flex items-center gap-3 md:gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="material-symbols-outlined text-3xl md:text-4xl">verified</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">100% Authentic</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="material-symbols-outlined text-3xl md:text-4xl">sanitizer</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Dry Cleaned</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="material-symbols-outlined text-3xl md:text-4xl">lock</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Escrow Safe</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="material-symbols-outlined text-3xl md:text-4xl">local_shipping</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Doorstep Pickup</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                  <span className="material-symbols-outlined text-lg md:text-xl">diamond</span>
                </div>
                <h2 className="text-lg md:text-xl font-black tracking-tighter uppercase italic">Rent Culture</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 md:mb-6">Redefining luxury through circularity. Experience the finest designer wear in Jaipur without the ownership tag.</p>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-widest text-xs mb-4 md:mb-8">Navigation</h5>
              <ul className="space-y-3 md:space-y-4 text-sm font-bold text-gray-500">
                <li><Link href="/categories?type=men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                <li><Link href="/categories?type=women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                <li><Link href="/categories" className="hover:text-primary transition-colors">Designer Directory</Link></li>
                <li><Link href="/how-it-works" className="hover:text-primary transition-colors">Occasion Guide</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-widest text-xs mb-4 md:mb-8">Support</h5>
              <ul className="space-y-3 md:space-y-4 text-sm font-bold text-gray-500">
                <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                <li><Link href="/vendors/apply" className="hover:text-primary transition-colors">Seller Policies</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black uppercase tracking-widest text-xs mb-4 md:mb-8">Connect</h5>
              <p className="text-gray-500 text-sm mb-4 md:mb-6">Stay updated with Jaipur's trending luxury drops.</p>
              <div className="flex gap-2 md:gap-4">
                <input className="bg-gray-50 border-gray-100 focus:ring-primary rounded-lg text-sm w-full" placeholder="Email" type="email"/>
                <button className="bg-black text-white px-3 md:px-4 rounded-lg">
                  <span className="material-symbols-outlined text-sm md:text-base">send</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 md:pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">© 2024 Rent Culture. Jaipur, India.</p>
            <div className="flex gap-6 md:gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
