"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Brand {
    id: string;
    name: string;
    logo: string;
}

// Mock data - this would come from your database/admin dashboard
const BRANDS: Brand[] = [
    { id: '1', name: 'New Balance', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg' },
    { id: '2', name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { id: '3', name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { id: '4', name: 'Drew House', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Drew_House_logo.png' }, // Placeholder or similar
    { id: '5', name: 'Jordan', logo: 'https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg' },
    { id: '6', name: 'OVO', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/October%27s_Very_Own_Logo.png/220px-October%27s_Very_Own_Logo.png' }, // Placeholder
    { id: '7', name: 'Supreme', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Supreme_Logo.svg' },
    { id: '8', name: 'Anti Social Social Club', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Anti_Social_Social_Club_logo.svg/1200px-Anti_Social_Social_Club_logo.svg.png' },
    { id: '9', name: 'Vans', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Vans-logo.svg' },
    { id: '10', name: 'Louis Vuitton', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Louis_Vuitton_poster.svg' },
    { id: '11', name: 'Off-White', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Off-White_Logo.svg' },
    { id: '12', name: 'Gucci', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/1960s_Gucci_Logo.svg' },
];

export function FeaturedBrands() {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 uppercase tracking-widest text-left">
                        Shop From Global Brands
                    </h3>
                    <Link href="/brands" className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black transition-colors uppercase tracking-wider">
                        View all <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 md:-ml-8">
                        {BRANDS.map((brand) => (
                            <div key={brand.id} className="flex-[0_0_auto] pl-4 md:pl-8">
                                <Link href={`/brand/${brand.name.toLowerCase()}`} className="group flex flex-col items-center gap-3">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-100 bg-white flex items-center justify-center p-6 shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-300">
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                                            onError={(e) => {
                                                // Fallback if image fails
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement?.classList.add('bg-gray-100');
                                                e.currentTarget.parentElement!.innerText = brand.name[0];
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                        {brand.name}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/brands" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                        View all brands <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
