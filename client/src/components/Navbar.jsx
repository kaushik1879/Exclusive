import React, { useEffect, useState } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { HeartIcon, ShoppingCart, User } from "lucide-react"

import DropDown from "../assets/icons/DropDown.svg"

import Heart from "../assets/icons/Heart.svg"
import Cart1 from "../assets/icons/Cart1.svg"

import useAuthStore from "../store/useAuthStore"
import useCartStore from "../store/useCartStore"
import LogoSection from "./layout/navbar/LogoSection"
import SearchBar from "./layout/navbar/SearchBar"
import ProfileMenu from "./layout/navbar/ProfileMenu"
import Cart from "./layout/navbar/Cart"
import MobileMenu from "./layout/navbar/MobileMenu"
import Hamburger from "./layout/navbar/Hamburger"
import useWishlistStore from "../store/useWishlistStore"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const wishlist = useWishlistStore((state) => state.wishlist)

    const wishlistCount = wishlist?.length || 0
    return (
        <div className="sticky top-0 z-50 bg-white">
            <div className="w-full bg-white px-4 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <LogoSection />
                    <div className="flex items-center gap-6">
                        <SearchBar show={location.pathname === "/collections"} />
                        <div className="flex items-center gap-4">
                            <Link to="/wishlist" className="relative">
                                <HeartIcon className="w-6 h-6 cursor-pointer" />

                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 left-3 bg-red-500 px-2 rounded-full text-white text-xs">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Cart />
                            <ProfileMenu />
                        </div>
                        <Hamburger setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
                    </div>
                </div>
            </div>

            <MobileMenu menuOpen={menuOpen} />
        </div>
    )
}

export default Navbar
