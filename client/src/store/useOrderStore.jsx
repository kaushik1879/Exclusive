import { create } from "zustand"

const BASE_URL = "http://localhost:4000"

const useOrderStore = create((set) => ({
  // common states
  loading: false,
  error: null,
  success: false,

  // data
  orders: [],
  order: null,

  /* =====================
     PLACE ORDER
  ====================== */
  placeOrder: async ({ billingDetails, cartItems, paymentMethod, paymentId }) => {
    try {
      set({ loading: true, error: null, success: false })

      const res = await fetch(`${BASE_URL}/api/order/place`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billingDetails,
          cartItems,
          paymentMethod,
          paymentId,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Order failed")
      }

      set({
        success: true,
        order: data.order,
        loading: false,
      })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  /* =====================
     FETCH ORDER BY ID (Order Details)
  ====================== */
  fetchOrderById: async (orderId) => {
    try {
      set({ loading: true, error: null })

      const res = await fetch(
        `${BASE_URL}/api/order/my/${orderId}`,
        {
          credentials: "include",
        }
      )

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch order")
      }

      set({ order: data.order, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /* =====================
     RESET
  ====================== */
  resetOrderState: () =>
    set({
      loading: false,
      error: null,
      success: false,
      order: null,
    }),
}))

export default useOrderStore
