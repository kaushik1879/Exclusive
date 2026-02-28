import { useEffect } from "react";
import useProductStore from "../store/useProductStore";
import ProductCard from "../components/ProductCard";

const Collections = () => {
    const {
        products,
        fetchProducts,
        page,
        pages,
        setPage,
        sort,
        setSort,
        loading,
        category,
        setCategory
    } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [page, sort, category]);

    return (
        <section className="w-full px-4 md:px-10 py-12 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between md:items-center items-start mb-8 md:mb-10 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Our <span className="text-red-500">Collections</span>
                </h1>

                {/* SORT */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border px-4 py-2 rounded-md bg-white shadow-sm"
                >
                    <option value="latest">Latest</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                </select>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* SIDEBAR FILTER */}
                <div className="w-full lg:w-1/5 bg-white p-4 sm:p-6 rounded-xl shadow-sm h-fit">
                    <h3 className="font-semibold text-lg mb-4">Filter by Category</h3>

                    <div className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-3">
                        {["All", "Men", "Women", "Electronics", "Accessories"].map(
                            (cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat === "All" ? "" : cat)}
                                    className={`text-left px-3 py-2 rounded-md transition ${category === cat
                                        ? "bg-red-500 text-white"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {cat}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <div className="w-full lg:w-3/4">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-4 rounded-xl animate-pulse h-60"
                                />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-semibold">No Products Found</h3>
                            <p className="text-gray-500 mt-2">
                                Try changing filters or sorting options.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                            {products.map((item) => (
                                <ProductCard key={item._id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-2 mt-12 flex-wrap">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-white border rounded-md disabled:opacity-40 hover:bg-gray-100"
                >
                    Prev
                </button>

                {[...Array(pages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-md border transition ${page === i + 1
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-white border rounded-md disabled:opacity-40 hover:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default Collections;