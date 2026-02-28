import React from 'react'

const Hamburger = ({ setMenuOpen, menuOpen }) => {
    return (
        <button
            className="md:hidden w-8 h-8 relative"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            <span className={`block h-0.5 w-6 bg-black mb-1 ${menuOpen && "rotate-45 translate-y-1.5"}`} />
            <span className={`block h-0.5 w-6 bg-black mb-1 ${menuOpen && "opacity-0"}`} />
            <span className={`block h-0.5 w-6 bg-black ${menuOpen && "-rotate-45 -translate-y-1.5"}`} />
        </button>
    )
}

export default Hamburger