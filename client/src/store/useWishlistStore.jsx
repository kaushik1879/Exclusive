import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useWishlistStore = create((set, get) => ({
    wishlist: [],
    loading: false,

    fetchWishlist: async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/wishlist/`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            console.log(data);
            if (data.success) {
                set({ wishlist: data.wishlist })
            }
        } catch (error) {
            console.log(error);
        }
    },

    toggleWishlist: async (productId) => {
        try {
            const res = await fetch(`${BASE_URL}/api/wishlist/toggle/${productId}`, {
                method: "POST",
                credentials: "include"
            })

            const data = await res.json()
            console.log(data);
            
            if (data.success) {
                const current = get().wishlist

                if (data.action === "added") {
                    set({
                        wishlist: [...current, { product: { _id: productId } }]
                    })
                }

                if (data.action === "removed") {
                    set({
                        wishlist: current.filter(
                            (item) => item.product._id !== productId
                        )
                    })
                }
            }

        } catch (error) {
            console.log(error);
        }
    },

    isWishlisted: (productId) => {
        const wishlist = get().wishlist
        return wishlist.some((item) => item.product._id === productId)
    },
}))

export default useWishlistStore