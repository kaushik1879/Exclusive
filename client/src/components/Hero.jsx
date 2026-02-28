import React, { useEffect, useState } from "react"

import Hero1 from "../assets/images/hero-1.jpg"
import HeroSlide from "./layout/Hero/HeroSlide"

const slides = [
    {
        id: 1,
        brand: "iPhone 14 Series",
        title: "Up to 10% off Voucher",
        image: Hero1,
    },
    {
        id: 2,
        brand: "iPhone 13 Series",
        title: "Up to 20% off Voucher",
        image: Hero1,
    },
    {
        id: 3,
        brand: "iPhone Accessories",
        title: "Up to 30% off Voucher",
        image: Hero1,
    },
]

const Hero = () => {
    const [current, setCurrent] = useState(0)

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="w-full px-4 md:px-0 py-8">
            <div className="relative w-full max-w-6xl mx-auto h-[320px] md:h-[400px] bg-black overflow-hidden rounded-lg">

                {/* SLIDES */}
                <div
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <HeroSlide slide={slide} />
                    ))}
                </div>

                {/* DOTS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 w-2 rounded-full transition ${current === index
                                ? "bg-white"
                                : "bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero