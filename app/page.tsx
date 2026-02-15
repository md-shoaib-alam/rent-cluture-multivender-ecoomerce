"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { FeaturedBrands } from "@/components/home/featured-brands";

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
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Featured Brands */}
      <FeaturedBrands />

      {/* How It Works - Early Value Prop */}
      <HowItWorks />

      {/* Best Deals / Featured Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">Best Deals for Happy Occasions</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Promo Card 1 */}
            <div className="relative overflow-hidden rounded-2xl aspect-[1.8/1] group shadow-lg">
              <div className="absolute inset-0 bg-yellow-100 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/80 to-transparent flex flex-col justify-center p-8">
                <div className="bg-white/30 backdrop-blur-sm self-start px-3 py-1 rounded text-xs font-bold uppercase text-white mb-2">Discount</div>
                <h4 className="text-4xl font-black text-white mb-1">35% <span className="text-xl">OFF</span></h4>
                <p className="text-white font-bold mb-4">Premium Lehengas</p>
              </div>
            </div>
            {/* Promo Card 2 */}
            <div className="relative overflow-hidden rounded-2xl aspect-[1.8/1] group shadow-lg">
              <div className="absolute inset-0 bg-primary/20 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex flex-col justify-center p-8">
                <h4 className="text-4xl font-black text-white mb-1">50% <span className="text-xl">OFF</span></h4>
                <p className="text-white font-bold mb-4">Sherwanis & Suits</p>
                <button className="bg-secondary text-white font-bold px-5 py-2 rounded-full w-fit hover:bg-secondary/90 transition-colors">
                  Check Now
                </button>
              </div>
            </div>
            {/* Promo Card 3 */}
            <div className="relative overflow-hidden rounded-2xl aspect-[1.8/1] group shadow-lg">
              <div className="absolute inset-0 bg-orange-100 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-transparent flex flex-col justify-center p-8">
                <h4 className="text-white text-2xl font-bold mb-2">Weekend Specials</h4>
                <p className="text-white/90 text-sm mb-4">Rent for 2 days, get 1 day free</p>
                <button className="bg-white text-orange-600 font-bold px-5 py-2 rounded-full w-fit hover:bg-gray-50 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filter Pills */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="bg-primary text-white font-semibold px-6 py-2 rounded-full shadow-md">All</button>
            {displayCategories.map(cat => (
              <button key={cat.id} className="bg-white text-gray-700 border border-gray-200 font-semibold px-6 py-2 rounded-full hover:border-primary hover:text-primary transition-colors">
                {cat.name}
              </button>
            ))}
          </div>

          <h3 className="text-3xl font-black text-center text-primary mb-2">Our Bestsellers</h3>
          <p className="text-center text-gray-500 mb-12">Explore our most popular rental choices this season.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10">
                    20% OFF
                  </span>
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url('${product.images[0]}')` }}></div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category.name}</p>
                  <div className="flex items-center text-yellow-400 gap-1 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-gray-700">(4.5)</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2 truncate">{product.name}</h4>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-black text-primary">₹{product.dailyPrice}</span>
                  <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Become a Vendor Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Start Your Rental Business</h3>
              <p className="text-white/80 text-lg mb-8">Join thousands of vendors earning passive income by listing their premium ethnic wear on Rent Square.</p>
              <Link href="/vendor/signup" className="inline-block bg-secondary text-white font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-secondary/30">
                Become a Vendor
              </Link>
            </div>
            <div className="hidden md:block relative z-10">
              <div className="w-64 h-64 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20">
                <span className="material-symbols-outlined text-[8rem] text-white">storefront</span>
              </div>
            </div>
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">diamond</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">RentSquare</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                India's premium fashion rental marketplace. Authentic designer wear, verified quality, and secure transactions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Categories</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="#" className="hover:text-primary">Wedding Collection</Link></li>
                <li><Link href="#" className="hover:text-primary">Party Wear</Link></li>
                <li><Link href="#" className="hover:text-primary">Jewellery</Link></li>
                <li><Link href="#" className="hover:text-primary">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Subscribe</h4>
              <p className="text-gray-500 text-sm mb-4">Get the latest trends and updates.</p>
              <div className="flex gap-2">
                <input className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Email address" />
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium uppercase tracking-wider">
            <p>© 2024 RentSquare. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">Instagram</a>
              <a href="#" className="hover:text-primary">Twitter</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
