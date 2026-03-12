import useProductStore from '../store/useProductStore';
import ProductCard from './ProductCard';

const OurProducts = () => {
    const { products, loading, } = useProductStore()

    return (
        <section id="our-products" className="w-full mx-auto px-4 py-12" >

            {/* HEADER */}
            < div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6" >

                {/* LEFT */}
                < div className="flex flex-col gap-4 w-full" >
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-10 bg-[#DB4444] rounded" />
                        <span className="text-[#DB4444] font-semibold">
                            Our Products
                        </span>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Explore Our Products
                        </h2>
                    </div>
                </div >

            </div>
            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))
                    : products.map((item) => (
                        <ProductCard key={item._id} item={item} />
                    ))}
            </div>

        </section >
    )
}

export default OurProducts