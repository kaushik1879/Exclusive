import { Search } from 'lucide-react'
import React, { useRef } from 'react'
import useProductStore from '../../../store/useProductStore'

const SearchBar = ({ show }) => {

    const { search, setSearch } = useProductStore()

    const debounceRef = useRef(null)

    const handleSearch = (e) => {
        const value = e.target.value

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            setSearch(value)
        }, 400)
    }

    if (!show) return null

    return (
        <div className="flex items-center bg-white border px-4 py-2 rounded-md w-full md:w-80">
            <input
                type="text"
                placeholder="Search products..."
                defaultValue={search}
                onChange={handleSearch}
                className="flex-1 outline-none text-sm"
            />
            <Search className="w-5 h-5 opacity-70" />
        </div>
    )
}

export default SearchBar