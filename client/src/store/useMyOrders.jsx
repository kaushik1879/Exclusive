import { create } from "zustand"

const BASE_URL = "http://localhost:4000/api/order"

const useMyOrdersStore = create((set) => ({
    loading: false,
    error: null,
    orders: [],

    fetchMyOrders: async () => {
        try {
            set({ loading: true, error: null })

            const res = await fetch(
                `${BASE_URL}/my-orders`,
                {
                    method: "GET",
                    credentials: "include", // cookie auth
                }
            )

            const data = await res.json()

            if (!res.ok || !data.success) {
                throw new Error(data.message)
            }

            set({ orders: data.orders, loading: false })
        } catch (err) {
            set({ error: err.message, loading: false })
        }
    },
}))

export default useMyOrdersStore
