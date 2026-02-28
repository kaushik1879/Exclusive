import { useState, useEffect } from "react"
import useAddressStore from "../store/useAddressStore"

const emptyAddress = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    flatNo: "",
    buildingName: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
}

const AddressModal = ({ isOpen, onClose, editData }) => {
    const { addAddress, updateAddress } = useAddressStore()
    const [form, setForm] = useState(emptyAddress)

    useEffect(() => {
        if (editData) setForm(editData)
        else setForm(emptyAddress)
    }, [editData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (editData?._id) {
            await updateAddress(editData._id, form)
        } else {
            await addAddress(form)
        }

        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg overflow-y-auto max-h-[90vh]">

                <h2 className="text-xl font-semibold mb-4">
                    {editData ? "Edit Address" : "Add Address"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-3 gap-3">
                        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
                        <input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle Name" className="border p-2 rounded" />
                        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />
                    </div>

                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" />

                    <input name="flatNo" value={form.flatNo} onChange={handleChange} placeholder="Flat / House No." className="w-full border p-2 rounded" />
                    <input name="buildingName" value={form.buildingName} onChange={handleChange} placeholder="Building Name" className="w-full border p-2 rounded" />
                    <input name="street" value={form.street} onChange={handleChange} placeholder="Street" className="w-full border p-2 rounded" />
                    <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" className="w-full border p-2 rounded" />

                    <div className="grid grid-cols-3 gap-3">
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
                        <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" />
                        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-2 rounded" />
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={form.isDefault}
                            onChange={handleChange}
                        />
                        Set as Default Address
                    </label>

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-[#DB4444] text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressModal