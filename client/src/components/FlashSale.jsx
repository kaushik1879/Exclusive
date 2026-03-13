import React, { useEffect, useState } from "react"
import CountdownTimer from "./CountdownTimer"
import ArrowLeft from "../assets/icons/ArrowLeft.svg"
import ArrowRight from "../assets/icons/ArrowR.svg"
import ProductCard from "./ProductCard"
import useProductStore from "../store/useProductStore"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import ProductCardSkeleton from "./ProductSkeleton"

const FlashSale = () => {
    const products = useProductStore((s) => s.products)
    const loading = useProductStore((s) => s.loading)
    const [flashSale, setFlashSale] = useState([])

    useEffect(() => {
        const flashProducts = products.filter((p) => p.flashSale)
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

                {/* NAVIGATION */}
                <div className="flex gap-3">
                    <button className="flash-prev w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                        <img src={ArrowLeft} alt="Left" />
                    </button>

                    <button className="flash-next w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                        <img src={ArrowRight} alt="Right" />
                    </button>
                </div>
            </div>

            {/* SLIDER */}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                navigation={{
                    nextEl: ".flash-next",
                    prevEl: ".flash-prev",
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                className="mt-8"
            >
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <ProductCardSkeleton />
                        </SwiperSlide>
                    ))
                    : flashSale.map((item) => (
                        <SwiperSlide key={item._id}>
                            <ProductCard item={item} />
                        </SwiperSlide>
                    ))}
            </Swiper>

            {/* VIEW ALL */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => {
                        document
                            .getElementById("our-products")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="bg-[#DB4444] text-white py-4 px-12 rounded hover:opacity-90 transition cursor-pointer"
                >
                    View All Products
                </button>
            </div>

        </section>
    )
}

export default FlashSale