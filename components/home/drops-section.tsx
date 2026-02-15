"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DropProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    brand?: string;
}

const DEMO_DROPS: DropProduct[] = [
    {
        id: "d1",
        name: "Swatch X Omega Bioceramic Moonswatch Mission To Venus",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y8D5w7q0J8b5xM9Xj7ZlG3p2Fk1H4n8o7W9R8t0v0c4s5j6y7u8i9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e",
        price: 26998,
        brand: "Omega"
    },
    {
        id: "d2",
        name: "Air Jordan 1 Retro High OG 'Chicago'",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x",
        price: 45000,
        brand: "Nike"
    },
    {
        id: "d3",
        name: "Rolex GMT-Master II",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951",
        price: 1250000,
        brand: "Rolex"
    },
    {
        id: "d4",
        name: "Adidas Samba OG White",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW",
        price: 12999,
        brand: "Adidas"
    },
    {
        id: "d5",
        name: "Yeezy Boost 350 V2 'Zebra'",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMQ8f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW",
        price: 28000,
        brand: "Yeezy"
    },
    {
        id: "d6",
        name: "Louis Vuitton Trainer",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctTBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr",
        price: 98000,
        brand: "Louis Vuitton"
    },
    // Duplicated items for smoother infinite loop
    {
        id: "d7",
        name: "Swatch X Omega Bioceramic Moonswatch Mission To Venus",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y8D5w7q0J8b5xM9Xj7ZlG3p2Fk1H4n8o7W9R8t0v0c4s5j6y7u8i9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e",
        price: 26998,
        brand: "Omega"
    },
    {
        id: "d8",
        name: "Air Jordan 1 Retro High OG 'Chicago'",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x",
        price: 45000,
        brand: "Nike"
    },
    {
        id: "d9",
        name: "Rolex GMT-Master II",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSEzZ9rHpzU8ngSriArgwqy4ClXoKkIU4x6zeUw5xdzTzxBa-bGMle4av0EKPsUUZv8Wb4hb8W_NMYFLu8A7Z3Ajq-CDcsJlMNB7beZecy1M0gDP7xrzF1DlE56hMxlJ8GiQ7sXdDzdLFJMnGI4iCH2Sxp0Mub6veGJXTEZtaCQhZbjw4mFTgecY3jNAtKEw8VN-SO3E53CeP5VaUgspv6R-OLnjZZbonWj2uHg22dM157YuWkjt9pBSR05Xo74gx-7En8-xRT1951",
        price: 1250000,
        brand: "Rolex"
    },
    {
        id: "d10",
        name: "Adidas Samba OG White",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACLA4f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW",
        price: 12999,
        brand: "Adidas"
    },
    {
        id: "d11",
        name: "Yeezy Boost 350 V2 'Zebra'",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMQ8f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW",
        price: 28000,
        brand: "Yeezy"
    },
    {
        id: "d12",
        name: "Louis Vuitton Trainer",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8DdxsG1ihKYMvMNAds0_JQuQxs3bM1T2YS7kQ9c77JIlkHpuqT7raP19bQD3lrE5wHqtAX345X_WA9xnoeza9ODcAUhC_ijGDjOCOyNLrW6bu7w7M0lzdlYFZwQ2pctTBF0UzFgFGzMght3fvCCOqozcrMXrJUQv5h6G9dUIZ_4nXbuMR31hz4jWI3sR_hJqIjndd_rnSVe2TvP1HeyutRRkjwtOvP_-eKofY53QACBe0AE3ORkOgp_A1eiRFqJI3zJ0WZCSkLHr",
        price: 98000,
        brand: "Louis Vuitton"
    }
];

export function DropsSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        containScroll: false,
    }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const activeProduct = DEMO_DROPS[selectedIndex];

    // Helper to calculate distance from active slide handling loop
    const getSlideStyles = (index: number) => {
        const total = DEMO_DROPS.length;
        // Calculate shortest distance in a loop
        let diff = Math.abs(index - selectedIndex);
        if (diff > total / 2) {
            diff = total - diff;
        }

        // Scale and Opacity logic
        if (diff === 0) {
            return "scale-125 opacity-100 z-20 blur-none"; // Center
        } else if (diff === 1) {
            return "scale-90 opacity-80 z-10 blur-[0.5px]"; // Immediate Neighbors
        } else {
            return "scale-75 opacity-50 z-0 blur-[2px]"; // Far Neighbors
        }
    };

    return (
        <section className="py-20 relative overflow-hidden bg-white">
            {/* Perspective Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                    transformOrigin: 'top center'
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="relative inline-block">
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter"
                            style={{
                                WebkitTextStroke: '2px #000',
                                textShadow: '4px 4px 0px rgba(0,0,0,0.1)'
                            }}>
                            DROPS
                        </h2>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-script text-black rotate-[-10deg]"
                            style={{ fontFamily: 'cursive' }}>
                            culture
                        </span>
                    </div>
                    <p className="text-gray-600 font-medium mt-4 tracking-wide text-sm md:text-base">
                        Hottest Drip From Around The World. Refreshed Daily.
                    </p>
                </div>

                {/* 3D Carousel */}
                <div className="relative max-w-[1400px] mx-auto mb-12">
                    <div className="overflow-hidden py-16" ref={emblaRef}>
                        <div className="flex -ml-4 touch-pan-y items-center">
                            {DEMO_DROPS.map((product, index) => {
                                const slideStyle = getSlideStyles(index);
                                const isActive = index === selectedIndex;

                                return (
                                    <div key={product.id} className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] pl-4 min-w-0 relative group cursor-pointer transition-all duration-500 ease-out"
                                        onClick={() => emblaApi?.scrollTo(index)}>
                                        <div className={`transition-all duration-500 ease-out transform origin-bottom ${slideStyle}`}>
                                            <div className="relative aspect-square">
                                                {/* Floating Animation for active item */}
                                                <div className={isActive ? 'animate-float' : ''}>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain drop-shadow-xl"
                                                    />
                                                </div>

                                                {/* 3D Shadow Effect */}
                                                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 rounded-[100%] blur-md transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                                    }`}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Arrows (Floating) */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors z-30 shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors z-30 shadow-lg"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Product Details Card */}
                <div className="max-w-xl mx-auto">
                    <div className="bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-xl p-6 md:p-8 text-center relative overflow-hidden">
                        <div className="relative z-10 transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 truncate">
                                {activeProduct.name}
                            </h3>
                            <p className="text-3xl font-black text-gray-900 mb-6">
                                ₹{activeProduct.price.toLocaleString('en-IN')}
                            </p>
                            <button className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm">
                                Explore
                            </button>
                        </div>


                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {DEMO_DROPS.map((_, idx) => (
                            <div key={idx}
                                onClick={() => emblaApi?.scrollTo(idx)}
                                className={`rounded-full transition-all duration-300 cursor-pointer ${idx === selectedIndex ? 'w-8 bg-black h-1' : 'w-2 h-2 bg-gray-300'}`}>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>
        </section>
    );
}
