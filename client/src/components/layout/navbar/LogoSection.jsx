import React from 'react'
import NavItems from './NavItems'

const LogoSection = () => {
    return (
        <div className="flex items-center gap-10">
            <h1 className="font-bold text-2xl">Exclusive</h1>

            <ul className="hidden md:flex items-center gap-8">
                <NavItems to="/" label="Home"/>
                <NavItems to="/collections" label="Collections"/>
                <NavItems to="/about" label="About"/>
                <NavItems to="/contact" label="Contact"/>
            </ul>
        </div>
    )
}

export default LogoSection