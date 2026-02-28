import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItems = ({ to, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-black font-semibold border-b-2 border-black "
                    : "text-gray-600 hover:text-black"
            }
        >
            {label}
        </NavLink>
    )
}

export default NavItems