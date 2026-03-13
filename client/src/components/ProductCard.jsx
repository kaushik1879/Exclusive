import { Link } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import useWishlistStore from "../store/useWishlistStore"

const ProductCard = ({ item }) => {
    
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
    const isWishlisted = useWishlistStore((state) =>
        state.isWishlisted(item._id)
    )

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(item._id)
    }

    return (
        <Link
            to={`/product-details/${item._id}`}
            className="group min-w-[220px] shrink-0"
        >
            <div className="border border-black/10 rounded-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-lg">

                {/* IMAGE */}
                <div className="relative bg-[#F5F5F5] h-[280px] overflow-hidden">
                    <img
                        src={item?.images?.[0]}
                        alt={item?.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* DISCOUNT */}
                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
                        -{item.discount}%
                    </span>

                    {/* WISHLIST */}
                    <button
                        onClick={handleWishlist}
                        className="absolute top-3 right-3 w-9 h-9 bg-white border border-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        aria-label="Add to wishlist"
                    >
                        <Heart
                            size={16}
                            className={
                                isWishlisted
                                    ? "fill-red-500 stroke-red-500"
                                    : "stroke-black"
                            }
                        />
                    </button>
                </div>

                {/* INFO */}
                <div className="p-4 space-y-2">
                    <h3 className="text-sm font-medium line-clamp-1">
                        {item?.title}
                    </h3>

                    <div className="flex items-center gap-3">
                        <span className="text-[#DB4444] font-semibold">
                            ₹{item?.price}
                        </span>
                        {item?.oldPrice && (
                            <span className="line-through text-gray-400 text-sm">
                                ₹{item.oldPrice}
                            </span>
                        )}
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={
                                        i < item?.rating
                                            ? "fill-yellow-400 stroke-yellow-400"
                                            : "stroke-gray-300"
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">
                            ({item?.reviews})
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard