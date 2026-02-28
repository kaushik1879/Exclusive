import React, { useEffect, useRef, useState } from "react"
import CountdownTimer from "./CountdownTimer"
import ArrowLeft from "../assets/icons/ArrowLeft.svg"
import ArrowRight from "../assets/icons/ArrowR.svg"
import ProductCard from "./ProductCard"
import useProductStore from "../store/useProductStore"

const FlashSale = () => {
    const products = useProductStore((s) => s.products)
    const [flashSale, setFlashSale] = useState([])

    const sliderRef = useRef(null)

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }

    const isDown = useRef(false)
    const startX = useRef(0)
    const scrollLeftPos = useRef(0)

    const handleMouseDown = (e) => {
        isDown.current = true
        sliderRef.current.classList.add("cursor-grabbing")
        startX.current = e.pageX - sliderRef.current.offsetLeft
        scrollLeftPos.current = sliderRef.current.scrollLeft
    }

    const handleMouseLeave = () => {
        isDown.current = false
        sliderRef.current.classList.remove("cursor-grabbing")
    }

    const handleMouseUp = () => {
        isDown.current = false
        sliderRef.current.classList.remove("cursor-grabbing")
    }

    const handleMouseMove = (e) => {
        if (!isDown.current) return
        e.preventDefault()
        const x = e.pageX - sliderRef.current.offsetLeft
        const walk = (x - startX.current) * 1.5
        sliderRef.current.scrollLeft = scrollLeftPos.current - walk
    }

    useEffect(() => {
        const flashProducts = products.filter(p => p.flashSale)
        setFlashSale(flashProducts)
    }, [products])

    return (
        <section className="w-full mx-auto px-4 py-12">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-10 bg-[#DB4444] rounded" />
                        <span className="text-[#DB4444] font-semibold">
                            Today’s
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <h2 className="text-3xl font-semibold">
                            Flash Sale
                        </h2>
                        <CountdownTimer />
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="flex gap-3">
                    <button
                        onClick={scrollLeft}
                        className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center"
                    >
                        <img src={ArrowLeft} alt="Left" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center"
                    >
                        <img src={ArrowRight} alt="Right" />
                    </button>
                </div>
            </div>

            {/* SLIDER */}
            <div
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="mt-8 flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-hide cursor-grab select-none"
            >
                {flashSale.map((item) => (
                    <ProductCard key={item._id} item={item} />
                ))}
            </div>

            {/* VIEW ALL */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => {
                        document.getElementById("our-products")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="bg-[#DB4444] text-white py-4 px-12 rounded hover:opacity-90 transition cursor-pointer">
                    View All Products
                </button>
            </div>
        </section >
    )
}

export default FlashSale
