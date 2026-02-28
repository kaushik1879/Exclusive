import React from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../assets/images/assets'

const Wishlist = () => {
    const wishlist = products.slice(0, 4)
   
    return (
        <section className="w-full max-w-[1170px] mx-auto px-4 py-16">

            <div className="flex flex-col gap-[60px]">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                    <h2 className="text-xl font-normal text-black">
                        Wishlist (4)
                    </h2>

                    <button className="flex items-center justify-center px-12 py-4 gap-[10px] border border-black/50 rounded">
                        <span className="font-poppins font-medium text-[16px] leading-[24px] text-black">
                            Move All To Bag
                        </span>
                    </button>
                </div>

                {/* Wishlist items will go here */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {wishlist.map((product, index) => (
                        <ProductCard item={product} header="wishlist" key={index} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-[60px] mt-16">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-10 bg-[#DB4444] rounded" />
                        <span className="text-[#DB4444] font-semibold">
                            Just For you
                        </span>
                    </div>
                    <button className="flex items-center justify-center px-12 py-4 gap-[10px] border border-black/50 rounded">
                        <span className="font-poppins font-medium text-[16px] leading-[24px] text-black">
                            See All
                        </span>
                    </button>
                </div>

                {/* Wishlist items will go here */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {wishlist.map((product, index) => (
                        <ProductCard item={product} header="Just For you" key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Wishlist
