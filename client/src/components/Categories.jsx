import React from 'react'
import ArrowLeft from "../assets/icons/ArrowLeft.svg"
import ArrowRight from "../assets/icons/ArrowR.svg"
import { categories } from '../assets/images/assets'
import CategoryCard from './CategoryCard'

const Categories = () => {
    return (
        <section className="w-full mx-auto px-4 py-12">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

                {/* LEFT */}
                <div className="flex flex-col gap-4 w-full lg:w-[52%]">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-10 bg-[#DB4444] rounded" />
                        <span className="text-[#DB4444] font-semibold">
                            Categories
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Browse By Categories
                        </h2>
                        {/* <CountdownTimer /> */}
                    </div>
                </div>

                {/* SLIDER CONTROLS */}
                <div className="flex justify-start lg:justify-end gap-3">
                    <button
                        // onClick={scrollLeft}
                        className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center"
                    >
                        <img src={ArrowLeft} alt="Left" />
                    </button>
                    <button
                        // onClick={scrollRight}
                        className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center"
                    >
                        <img src={ArrowRight} alt="Right" />
                    </button>
                </div>

            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {categories.map((item) => (
                    <CategoryCard
                        key={item.id}
                        icon={item.icon}
                        name={item.name}
                    />
                ))}
            </div>
        </section>
    )
}

export default Categories