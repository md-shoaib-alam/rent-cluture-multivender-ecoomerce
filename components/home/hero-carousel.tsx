"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        // Using a placeholder image that mimics the "Culture Cupid" red theme
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop",
        title: "CULTURE CUPID SALE IS BACK",
        subtitle: "Get Upto 75% Off On Your Favourite Sneakers",
        theme: "red" // Custom theme property for specific styling
    },
    {
        id: 2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAECJGPLNxbR5hpiPk6g0d6230rHZfKK9Tqz9cj2bBJ9ZlNu860Ax9TL7RCL1A67ARiTN3jfF8xcXC9HByblSdtFD99noy-RAZC33mn1b7vZtAkonJ-BX2JcP3npfq5jAMSOTFtwfA9sxkfxNTacmuLN7P29HPup50GRSYZAT54cHDaZc5M18A4ZT12mezn6iPUbOQxjIqr4OjVa8T83AAIiig4pOewCl6Y0Nxu6IYlcAwdqwMIIMeGW2b_4eklQZlfES3Pm-2c8ViC",
        title: "Eco-Friendly Fashion",
        subtitle: "Rent, Wear, Return"
    },
    {
        id: 3,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2d1pBBTI5Ca4FrpOQ4FVuJvYXerTVWroRubJ6Bocm66QtVD3IrS1VMglKiJHnZUHbfL2vR7RTQxYi_Mdt6okIDc4Dq4KHiR7qeLWNV-ctXeNSAe2vwDsf6MxiMUhuuXqKHcaU2rAD5xhTlp_KGL5dCBT3ASbyBU2Gh2xQXVhu6XpYj5mlrxoJc-nzLs9oWXClELvb6yR_ZDzqv7zSyjNPeCGaIGKPtg5NLVxDd5bxkN_KvLgSiBjavrPFhKXgR13SLBWLrZDRAp0x",
        title: "Premium Ethnic Wear",
        subtitle: "For Every Occasion"
    },
    {
        id: 4,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMQ8f7buYJb5bLWAcq7YlgGPECBACSssw-_Hcosf8fA_rOPSs27XhRJE9Ub4XUDQrvx7KyndlG2pJC_Cb0aXrlQKYQf1unFMrE7CFg9cnoX9Ej9BtCQwQJ7t3JUUb61xMcjVVSfvEcQmidDQS0ThLGGtmbSC8L3ANcSiJMhJqeZKF2Hb4CUpvmHXGR3rXcZfWGDIZzpjjrnuyHvhcrFFFLHSVEb1OmlLjPd0MAxWCBf8DWsQGmhB9VghnDqs0o75_H0PyC-RxxjRW",
        title: "Designer Lehengas",
        subtitle: "Starting at ₹2,999"
    }
];

export function HeroCarousel() {
    // Standard autoplay configuration
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
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

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative w-full overflow-hidden bg-gray-900 group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-[60vh] md:h-[calc(100vh-80px)]">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Overlay - adjusting opacity based on theme */}
                            <div className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-24 ${slide.theme === 'red'
                                ? 'bg-red-900/40 mix-blend-multiply'
                                : 'bg-black/40'
                                }`}>
                            </div>
                            {/* Content Layer (separate from background blend mode) */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
                                <span className="text-secondary font-bold tracking-[0.2em] uppercase mb-2 md:mb-4 text-xs md:text-base animate-fade-in-up drop-shadow-md">
                                    {slide.subtitle}
                                </span>
                                <h2 className="text-white text-3xl md:text-6xl lg:text-8xl font-black max-w-5xl leading-tight mb-4 md:mb-8 animate-fade-in-up delay-100 drop-shadow-lg uppercase px-2">
                                    {slide.title}
                                </h2>
                                <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-lg transition-transform hover:scale-105 shadow-xl animate-fade-in-up delay-200">
                                    Shop Collection
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hidden md:flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hidden md:flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`transition-all duration-300 rounded-full ${index === selectedIndex
                            ? 'bg-white w-8 h-2 md:w-12 md:h-3'
                            : 'bg-white/40 w-2 h-2 md:w-3 md:h-3 hover:bg-white/60'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

