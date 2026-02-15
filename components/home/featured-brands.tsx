"use client";

import React from 'react';

const brands = [
    "Sabyasachi",
    "Manish Malhotra",
    "Anita Dongre",
    "Tarun Tahiliani",
    "Ritu Kumar",
    "Manyavar"
];

export function FeaturedBrands() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by Top Designers</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand, index) => (
                        <div key={index} className="text-xl md:text-2xl font-serif font-bold text-gray-800 hover:text-primary transition-colors cursor-default">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
