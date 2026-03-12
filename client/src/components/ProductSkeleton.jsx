const ProductCardSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col gap-3">

            {/* Image */}
            <div className="bg-gray-200 h-48 w-full rounded-md"></div>

            {/* Title */}
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>

            {/* Price */}
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>

            {/* Rating */}
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        </div>
    );
};

export default ProductCardSkeleton;