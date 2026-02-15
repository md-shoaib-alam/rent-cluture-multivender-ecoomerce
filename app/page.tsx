"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { DropsSection } from "@/components/home/drops-section";

import { Testimonials } from "@/components/home/testimonials";
import { FeaturedBrands } from "@/components/home/featured-brands";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    { id: "1", name: "Velvet Zardosi Lehenga", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW", "https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrTrb6r1o"], dailyPrice: 12499, category: { name: "Sabyasachi Heritage" }, vendor: { businessName: "Royal Attire" } },
    { id: "2", name: "Midnight Blue Sherwani", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x", "https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73"], dailyPrice: 8999, category: { name: "Manish Malhotra" }, vendor: { businessName: "Modern Couture" } },
    { id: "3", name: "Floral Organza Gown", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951", "https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr"], dailyPrice: 6500, category: { name: "Anushree Reddy" }, vendor: { businessName: "Elite Threads" } },
    { id: "4", name: "Hand-Embroidery Silk Saree", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtqU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD", "https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM"], dailyPrice: 4999, category: { name: "Anita Dongre" }, vendor: { businessName: "Royal Attire" } },
    { id: "5", name: "Emerald Green Anarkali", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr", "https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x"], dailyPrice: 7500, category: { name: "Ritu Kumar" }, vendor: { businessName: "Ethnic Charm" } },
    { id: "6", name: "Royal Blue Bandhgala", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73", "https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW"], dailyPrice: 11000, category: { name: "Raghavendra Rathore" }, vendor: { businessName: "Modern Couture" } },
    { id: "7", name: "Blush Pink Lehenga", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM", "https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951"], dailyPrice: 15500, category: { name: "Tarun Tahiliani" }, vendor: { businessName: "Bridal Dreams" } },
    { id: "8", name: "Ivory Silk Kurta Set", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrTrb6r1o", "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD"], dailyPrice: 5500, category: { name: "Manyavar" }, vendor: { businessName: "Gentleman's Choice" } },
    { id: "9", name: "Designer Indo-Western Gown", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4D4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x", "https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951"], dailyPrice: 9800, category: { name: "Fusion Wear" }, vendor: { businessName: "Global Threads" } },
    { id: "10", name: "Classic Black Tuxedo", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDlGSoeAxElB4gBZAReOa5shNbfPbQskdMZyyEZsF6TS6w5CPH5eTxjMO8M82D4cxjZT1hm8aHvyKvDb4zmiyxg6fOvQu4kTAXG3I6jgYD6YSoRhl-WD0Bh-ubdbXpzhdMvIC95zqzS7Hz3CKurDjKAzKUJFXYnOSazV_AggDClIThEANZLDD8FJsU-yDKOtko4V4C_viNkNC6AYrGd0zUxfWo2FjJwJRnuBfF5Y2amkjwn01VuKTqDVoHZF5M2QayQsmjl6yh5w_73", "https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW"], dailyPrice: 7200, category: { name: "Western Formal" }, vendor: { businessName: "Gentleman's Choice" } },
    { id: "11", name: "Pastel Pink Saree", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCyOLK-48dT1qE3G1is_ymRuOKYXgBBgEbvP2mq2WFa015fy5bg3E2bQqn8vvy0Lgo0TRY9zmVx3PykkOR3QG2fkUtH8oqt-RwbU_YnntlOd7R_LFRPDDzaeRJF1pHFCUbksPf7PO0JACBD3_TLRaViY0lYpTaZG_qBwuPvuQp8-L4jZWWy-SFF1j1cLurtF8ychBvngWtW22Kr2AYjq9FuA-LNzxNOTfUnWafh8MjtSk8ugP7RYh97k7FGJS8etLQlabGEJiL5VcYM", "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjfJj_iXLpPRIwZzWf6eO0ggFjYd1D98m-qyVUE50CRAHpWajBDJlfUZIPQCDWsjgTwXfODyYkaJ82_TMP6ytUXgVTSQ9dSKtOz9PzLzrSeSVCBMFtU1HBNCsD_NwkeIvbJ-eKXYtyhMQ6m7dPe9OqntvTUtcX7iwI45weT4JsYjfpro9p3P5Gw2TasfgME1DzCJBFxJfDYRpjXfr4yYhC7RsYCaKSPrYSYhMbaLRyBoGav6L--IJ7Idg4gI1OVsfLsxSSyN8eXD"], dailyPrice: 6100, category: { name: "Traditional" }, vendor: { businessName: "Ethnic Charm" } },
    { id: "12", name: "Embroidered Kurti Set", images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBhSZ9XUQvYK0mUCkO9esdQmZfEXVMVuFYpYTAiRzYNnAEOZKrarND3t5vBWxsZAGjJD1WdH1g7qCMlJbVj3_3TfuZofxWqsyR8dTk5bWF3XnjMR_vYMVxf5qn-5fu8Q8Pi5Q6H2yYeKmQHPkvK4c2dXCU1xjKrbM2oP4XU06_p6tEJ92z_4TzWWaIlZ1gjL6gCkonAyNUuUz4z7RNNIOE9GZhax9jUg76ZrquNDvMVNXI-PZPkPPLh5xrOd6PfvTBrzu0SrTrb6r1o", "https://lh3.googleusercontent.com/aida-public/AB6AXuDj8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctXBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr"], dailyPrice: 3800, category: { name: "Casual Ethnic" }, vendor: { businessName: "Daily Wear" } },
  ];

  const displayCategories = categories.length > 0 ? categories : demoCategories;
  const displayProducts = products.length > 0 ? products : demoProducts;

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? displayProducts.filter((p) => p.category?.name?.toLowerCase() === selectedCategory.toLowerCase())
    : displayProducts;

  const [bestsellerRef, bestsellerApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = useCallback(() => bestsellerApi && bestsellerApi.scrollPrev(), [bestsellerApi]);
  const scrollNext = useCallback(() => bestsellerApi && bestsellerApi.scrollNext(), [bestsellerApi]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Drops Section  */}
      <DropsSection />

      {/* Featured Brands */}
      <FeaturedBrands />


      {/* Best Deals / Featured Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">Best Deals for Happy Occasions</h3>
            <div className="hidden md:flex gap-2">
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
              <div className="absolute inset-0 bg-yellow-100 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4D4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative group/section">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`font-semibold px-6 py-2 rounded-full shadow-md transition-colors ${selectedCategory === null
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                }`}
            >
              All
            </button>
            {displayCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`font-semibold px-6 py-2 rounded-full transition-colors ${selectedCategory === cat.name
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-end mb-8 px-4">
            <div>
              <h3 className="text-3xl font-black text-primary mb-2">Our Bestsellers</h3>
              <p className="text-black">Explore our most popular rental choices this season.</p>
            </div>
            {/* Navigation Buttons */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden p-4 -m-4" ref={bestsellerRef}>
            <div className="flex -ml-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 min-w-0">
                  <Link href={`/product/${product.id}`} className="group bg-white rounded-[2rem] p-3 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 block h-full">
                    <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-3 bg-gray-100">
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-md">
                        20% OFF
                      </span>

                      {/* Primary Image */}
                      <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                        style={{ backgroundImage: `url('${product.images[0]}')` }}></div>

                      {/* Secondary Image (on Hover) */}
                      <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        style={{ backgroundImage: `url('${product.images[1] || product.images[0]}')` }}></div>
                    </div>

                    <div className="space-y-1 px-2 pb-2">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-bold text-black uppercase tracking-widest line-clamp-1">{product.category.name}</p>
                        <div className="flex items-center text-amber-400 gap-1 text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-sm">star</span>
                          <span className="text-amber-700 text-[10px]">4.5</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h4>

                      <div className="flex items-center justify-between pt-2 mt-1">
                        <div className="flex flex-col">
                          <span className="text-xs text-black font-medium line-through">₹{Math.round(product.dailyPrice * 1.2)}</span>
                          <span className="text-2xl font-black text-gray-900">₹{product.dailyPrice}</span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:bg-gray-800 transition-all group-hover:scale-110">
                          <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
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

    </div>
  );
}
