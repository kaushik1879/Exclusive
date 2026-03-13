import React, { useEffect, useState } from 'react'
import useProductStore from '../store/useProductStore';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductSkeleton';

const BestSellers = () => {
    const products = useProductStore((s) => s.products);
    const loading = useProductStore((s) => s.loading);
    const [bestSellers, setBestSellers] = useState([])
    console.log(products);

    useEffect(() => {
        const bestProduct = products.filter((product) => product.bestSeller)
        console.log(bestProduct);

        setBestSellers(bestProduct);
    }, [products])

    return (
        <section className="w-full mx-auto px-4 py-12" >

            {/* HEADER */}
            < div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6" >

                {/* LEFT */}
                < div className="flex flex-col gap-4 w-full lg:w-[52%]" >
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-10 bg-[#DB4444] rounded" />
                        <span className="text-[#DB4444] font-semibold">
                            This Month
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Best Selling Products
                        </h2>
                    </div>
                </div >

                <div className="flex justify-start lg:justify-end gap-3" >
                    <button
                        onClick={() => {
                            document.getElementById("our-products")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="flex items-center justify-center bg-[#DB4444] py-4 px-12 gap-2.5
                        text-[#FAFAFA] rounded hover:opacity-90 transition cursor-pointer"
                    >
                        View All
                    </button>
                </div >
            </div >
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <ProductCardSkeleton />
                    ))
                ) :
                    (
                        bestSellers.map((product, index) => (
                            <ProductCard item={product} key={index} />
                        ))
                    )}
            </div>
        </section >
    )
}

export default BestSellers