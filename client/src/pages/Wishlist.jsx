import React, { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import useWishlistStore from "../store/useWishlistStore"
import useCartStore from "../store/useCartStore"

const Wishlist = () => {

    const wishlist = useWishlistStore((state) => state.wishlist)
    const fetchWishlist = useWishlistStore((state) => state.fetchWishlist)
    const loading = useWishlistStore((state) => state.loading)
    const addToCart = useCartStore((state) => state.addToCart)
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)

    useEffect(() => {
        fetchWishlist()
    }, [])
    const handleMoveAllToCart = async () => {
        for (const item of wishlist) {
            const productId = item.product._id

            await addToCart(productId, 1)
            await toggleWishlist(productId)
        }
    }
    return (
        <section className="w-full max-w-[1200px] mx-auto px-4 py-16">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

                <h2 className="text-2xl font-semibold text-black">
                    My Wishlist
                    <span className="text-gray-500 ml-2 text-lg">
                        ({wishlist.length})
                    </span>
                </h2>

                {wishlist.length > 0 && (
                    <button
                        onClick={handleMoveAllToCart}
                        className="px-6 py-3 border border-black/40 rounded-md hover:bg-black hover:text-white transition"
                    >
                        Move All To Bag
                    </button>
                )}
            </div>

            {/* LOADING */}
            {loading && (
                <div className="flex justify-center py-20">
                    <p className="text-gray-500">Loading wishlist...</p>
                </div>
            )}

            {/* EMPTY STATE */}
            {!loading && wishlist.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">

                    <div className="text-5xl mb-4">💔</div>

                    <h3 className="text-xl font-semibold mb-2">
                        Your wishlist is empty
                    </h3>

                    <p className="text-gray-500 mb-6">
                        Save items you like so you can find them easily later.
                    </p>

                    <a
                        href="/collections"
                        className="px-6 py-3 bg-black text-white rounded-md hover:opacity-90 transition"
                    >
                        Explore Products
                    </a>

                </div>
            )}

            {/* PRODUCTS GRID */}
            {!loading && wishlist.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {wishlist.map((item) => (
                        <ProductCard
                            item={item.product}
                            key={item._id}
                            header="wishlist"
                        />
                    ))}

                </div>
            )}

        </section>
    )
}

export default Wishlist