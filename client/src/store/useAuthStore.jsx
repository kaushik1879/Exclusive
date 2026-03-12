import { toast } from "react-toastify"
import { create } from "zustand"
import useCartStore from "./useCartStore"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    error: null,

    checkAuth: async () => {
        set({ loading: true })
        try {
            const res = await fetch(`${BASE_URL}/api/auth/profile`, {
                credentials: "include",
            })

            if (!res.ok) {
                set({ user: null, loading: false })
                return
            }

            const data = await res.json()
            set({ user: data.user, loading: false })
        } catch {
            set({ user: null, loading: false })
        }
    },

    login: async (formData) => {
        set({ loading: true, error: null })

        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                set({ loading: false, error: data.message })
                return data
            }

            await useAuthStore.getState().checkAuth()
            return data
        } catch (err) {
            set({ error: err.message, loading: false })
        }
    },

    signup: async (formData) => {
        const res = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        return res.json()
    },

    logout: async () => {
        try {

            const res = await fetch(`${BASE_URL}/api/auth/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            })
            const data = await res.json()

            if (!res.ok) {
                set({ loading: false, error: data.message })
                return data
            }
            toast.success("Logged Out")
            useCartStore.getState().clearCart()
            set({ user: null })
        } catch (error) {
            set({ error: err.message, loading: false })
        }
    },
    updateProfile: async (formData) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                set({ user: data.user })
            }

            return data

        } catch (error) {
            return { success: false, message: error.message }
        }
    },
}))

export default useAuthStore
