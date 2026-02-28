import { User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../../store/useAuthStore'

const ProfileMenu = () => {
    const [open, setOpen] = useState(false)
    const { user, logout } = useAuthStore()
    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
            >
                {user ? (
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white font-semibold text-lg hover:opacity-80 transition">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                ) : (
                    <User
                        size={24}
                        className="hover:text-gray-600"
                    />
                )}
            </div>

            <div
                className={`absolute right-0 top-10 w-40 bg-white border rounded shadow-md transition-all ${open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <ul className="text-sm">
                    {user ? (
                        <>
                            <li className="px-4 py-2 hover:bg-gray-100">
                                <Link to="/profile">My Profile</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100">
                                <Link to="/my-orders">My Orders</Link>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                                onClick={logout}
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            {/* <li className="px-4 py-2 hover:bg-gray-100">
                                                    <Link to="/login">Login</Link>
                                                </li> */}
                            <li className="px-4 py-2 hover:bg-gray-100">
                                <Link to="/sign-up">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ProfileMenu