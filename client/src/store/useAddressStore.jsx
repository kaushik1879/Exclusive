import { create } from "zustand"

const BASE_URL = "http://localhost:4000"

const useAddressStore = create((set) => ({
    addresses: [],
    loading: false,
    error: null,

    fetchAddresses: async () => {
        try {
            set({ loading: true, error: null })

            const res = await fetch(`${BASE_URL}/api/addresses`, {
                method: "GET",
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            set({ addresses: data.addresses, loading: false })

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    addAddress: async (payload) => {
        try {
            set({ loading: true, error: null })

            const res = await fetch(`${BASE_URL}/api/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            set({ addresses: data.addresses, loading: false })
            return data

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    updateAddress: async (id, payload) => {
        try {
            set({ loading: true, error: null })

            const res = await fetch(`${BASE_URL}/api/addresses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            set({ addresses: data.addresses, loading: false })
            return data

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    deleteAddress: async (id) => {
        try {
            set({ loading: true, error: null })

            const res = await fetch(`${BASE_URL}/api/addresses/${id}`, {
                method: "DELETE",
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            set({ addresses: data.addresses, loading: false })

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    setDefaultAddress: async (id) => {
        try {
            set({ loading: true, error: null })

            const res = await fetch(`${BASE_URL}/api/addresses/${id}/default`, {
                method: "PATCH",
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            set({ addresses: data.addresses, loading: false })

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    }
}))

export default useAddressStore