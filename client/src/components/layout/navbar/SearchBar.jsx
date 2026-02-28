import { Search } from 'lucide-react'
import React from 'react'
// import Search from "../assets/icons/Search.svg"

const SearchBar = ({ show }) => {
    if (!show) return null
    return (
        <div className="hidden sm:flex items-center bg-gray-100 px-5 h-10 gap-3 w-64 md:w-80">
            <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent outline-none text-sm flex-1"
            />
            <Search className='w-5 h-5 opacity-70'/>
        </div>
    )
}

export default SearchBar