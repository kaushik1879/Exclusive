import React, { useEffect } from "react"
import Hero from "../components/Hero"
import FlashSale from "../components/FlashSale"
import Categories from "../components/Categories"
import BestSellers from "../components/BestSellers"
import Banner from "../components/Banner"
import OurProducts from "../components/OurProducts"
import Services from "../components/Services"
import useProductStore from "../store/useProductStore"

const Home = () => {
    const fetchProducts = useProductStore((s) => s.fetchProducts)
    const setCategory = useProductStore((s) => s.setCategory)
    const setSort = useProductStore((s) => s.setSort)

    useEffect(() => {
        setCategory("")
        setSort("")
        fetchProducts()
    }, [])

    return (
        <div className="max-w-6xl mx-auto ">
            <Hero />
            <FlashSale />
            <Categories />
            <BestSellers />
            <Banner />
            <OurProducts />
            <Services />
        </div>
    )
}

export default Home
