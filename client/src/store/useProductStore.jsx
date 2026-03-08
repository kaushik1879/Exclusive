import { create } from 'zustand'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useProductStore = create((set, get) => ({
    products: [],
    singleProduct: null,
    page: 1,
    pages: 1,
    total: 0,
    limit: 8,
    sort: "latest",
    category: "",
    search: "",
    loading: false,

    fetchProducts: async () => {
        try {
            set({ loading: true })

            const { page, limit, sort, category, search } = get()

            const query = new URLSearchParams({
                page,
                limit,
                sort,
                ...(category && { category }),
                ...(search && { search })
            }).toString()

            const res = await fetch(`${BASE_URL}/api/product/list?${query}`)
            const data = await res.json()

            if (data.success) {
                set({
                    products: data.products,
                    page: data.page,
                    pages: data.pages,
                    total: data.total,
                })
            }

            set({ loading: false })

        } catch (err) {
            console.log(err.message)
            set({ loading: false })
        }
    },

    setPage: (page) => set({ page }),
    setSort: (sort) => set({ sort, page: 1 }),
    setCategory: (category) => set({ category, page: 1 }),
    setSearch: (search) => set({ search, page: 1 }),

    fetchSingleProduct: async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/api/product/single/${id}`)
            const data = await res.json()

            set({ singleProduct: data.product })
        } catch (error) {
            console.log(error.message)
        }
    }
}))

export default useProductStore