import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, LogOut } from "lucide-react"
import useAuthStore from "../store/useAuthStore"
import useAddressStore from "../store/useAddressStore"
import AddressModal from "../components/AddressModal"

const Profile = () => {
    const navigate = useNavigate()
    const { user, logout, loading } = useAuthStore()
    const {
        addresses,
        fetchAddresses,
        deleteAddress,
        setDefaultAddress
    } = useAddressStore()

    const [modalOpen, setModalOpen] = useState(false)
    const [editData, setEditData] = useState(null)

    // 🔐 Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate("/sign-up")
        }
    }, [user, loading, navigate])

    // 📦 Fetch addresses
    useEffect(() => {
        if (user) fetchAddresses()
    }, [user])

    if (!user) return null

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-10">My Profile</h1>

            <div className="grid md:grid-cols-[250px_1fr] gap-10">

                {/* LEFT SIDEBAR */}
                <div className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <User size={20} />
                        <span className="font-medium">{user.name}</span>
                    </div>

                    <button
                        onClick={() => navigate("/my-orders")}
                        className="w-full text-left hover:text-[#DB4444]"
                    >
                        My Orders
                    </button>

                    <button
                        onClick={() => navigate("/wishlist")}
                        className="w-full text-left hover:text-[#DB4444]"
                    >
                        Wishlist
                    </button>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-red-600 hover:opacity-80"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {/* RIGHT CONTENT */}
                <div className="border rounded-lg p-8 space-y-10">

                    {/* ACCOUNT INFO */}
                    <div>
                        <h2 className="text-xl font-semibold mb-6">
                            Account Information
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <User size={18} className="text-gray-500" />
                                <span>{user.name}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail size={18} className="text-gray-500" />
                                <span>{user.email}</span>
                            </div>

                            {user.phone && (
                                <div className="flex items-center gap-4">
                                    <Phone size={18} className="text-gray-500" />
                                    <span>{user.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MULTIPLE ADDRESSES */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                My Addresses
                            </h2>

                            <button
                                onClick={() => {
                                    setEditData(null)
                                    setModalOpen(true)
                                }}
                                className="bg-[#DB4444] text-white px-5 py-2 rounded"
                            >
                                Add Address
                            </button>
                        </div>

                        {addresses.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No addresses added yet.
                            </p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr._id}
                                        className="border p-5 rounded-lg relative hover:shadow-md transition"
                                    >
                                        {addr.isDefault && (
                                            <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                Default
                                            </span>
                                        )}

                                        <p className="font-medium">
                                            {[addr.firstName, addr.middleName, addr.lastName]
                                                .filter(Boolean)
                                                .join(" ")}
                                        </p>

                                        <p className="text-sm text-gray-600 mt-2">
                                            {addr.flatNo}, {addr.buildingName}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            {addr.street}, {addr.landmark}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            {addr.city}, {addr.state}, {addr.pincode}
                                        </p>

                                        <p className="text-sm mt-1">
                                            {addr.phone}
                                        </p>

                                        <div className="flex gap-4 mt-4 text-sm">
                                            <button
                                                onClick={() => {
                                                    setEditData(addr)
                                                    setModalOpen(true)
                                                }}
                                                className="text-blue-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteAddress(addr._id)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>

                                            {!addr.isDefault && (
                                                <button
                                                    onClick={() => setDefaultAddress(addr._id)}
                                                    className="text-green-600"
                                                >
                                                    Set Default
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EDIT PROFILE BUTTON */}
                    <button
                        onClick={() => navigate("/edit-profile")}
                        className="bg-gray-900 text-white px-6 py-3 rounded hover:opacity-90 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* ADDRESS MODAL */}
            <AddressModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                editData={editData}
            />
        </section>
    )
}

export default Profile