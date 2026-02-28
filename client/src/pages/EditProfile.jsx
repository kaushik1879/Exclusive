import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { toast } from "react-toastify"

const EditProfile = () => {
    const navigate = useNavigate()
    const { user, updateProfile } = useAuthStore()

    const [form, setForm] = useState({
        name: "",
        phone: "",
        password: "",
    })

    /* ================= LOAD USER DATA ================= */
    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                phone: user.phone || "",
                password: "",
            })
        }
    }, [user])

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name: form.name,
            phone: form.phone,
        }

        if (form.password.trim()) {
            payload.password = form.password
        }

        const res = await updateProfile(payload)

        if (res.success) {
            toast.success("Profile Updated")
            navigate("/profile")
        } else {
            toast.error(res.message)
        }
    }

    return (
        <section className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-8">
                Edit Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="New Password (optional)"
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    className="bg-[#DB4444] text-white px-6 py-3 rounded hover:bg-red-600"
                >
                    Save Changes
                </button>
            </form>
        </section>
    )
}

export default EditProfile