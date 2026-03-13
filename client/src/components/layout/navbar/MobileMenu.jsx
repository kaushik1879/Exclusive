import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../../store/useAuthStore'

const MobileMenu = ({ menuOpen }) => {
    const { user, logout } = useAuthStore()
    return (
        <div
            className={`md:hidden transition-all ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
        >
            <ul className="flex flex-col gap-4 px-6 py-4 bg-white shadow">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/collections">Collections</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>

                {user ? (
                    <>
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="/my-orders">My Orders</Link></li>
                        <li className="text-red-600 cursor-pointer" onClick={logout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/sign-up">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default MobileMenu