import { create } from "zustand"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  error: null,
  
  clearCart: () => {
    set({
      cart: null,
      loading: false,
      error: null
    })
  },
  // 🟢 GET CART
  fetchCart: async () => {
    try {
      set({ loading: true, error: null })

      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "GET",
        credentials: "include" // ⭐ important for cookies
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      console.log(data.cart);

      set({ cart: data.cart, loading: false })

    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // 🟢 ADD TO CART
  addToCart: async (productId, quantity = 1) => {
    try {
      set({ loading: true, error: null })

      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, quantity })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      await get().fetchCart()

    } catch (error) {
      console.log(error.message);
      set({ error: error.message, loading: false })
    }
  },

  // 🟢 UPDATE QUANTITY
  updateQuantity: async (productId, quantity) => {
    try {
      set({ loading: true, error: null })

      const res = await fetch(`${BASE_URL}/api/cart/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, quantity })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      await get().fetchCart()

    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // 🟢 REMOVE ITEM
  removeFromCart: async (productId) => {
    try {
      set({ loading: true, error: null })

      const res = await fetch(`${BASE_URL}/api/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include"
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      await get().fetchCart()

    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))

export default useCartStore