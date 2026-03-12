import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import useCartStore from "../store/useCartStore"
import useAuthStore from "../store/useAuthStore"
import useOrderStore from "../store/useOrderStore"
import useAddressStore from "../store/useAddressStore"
import Row from "../components/Row"
import Input from "../components/Input"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PlaceOrder = () => {
    const navigate = useNavigate()
    const { addresses, fetchAddresses } = useAddressStore()
    const [selectedAddressId, setSelectedAddressId] = useState("")
    const { cart, clearCart } = useCartStore()
    const { user, loading: authLoading } = useAuthStore()
    const [paymentMethod, setPaymentMethod] = useState("COD")
    const { buyNowItem, clearBuyNowItem } = useOrderStore()
    const {
        placeOrder,
        loading: orderLoading,
        error,
        success,
        order,
    } = useOrderStore()
    console.log(buyNowItem);

    const fetchCart = useCartStore(state => state.fetchCart)
    const checkoutItems = buyNowItem
        ? [{
            product: {
                _id: buyNowItem.product,
                title: buyNowItem.title,
                price: buyNowItem.price,
                images: [buyNowItem.image]
            },
            quantity: buyNowItem.quantity
        }]
        : cart?.items || []

    const [billingDetails, setBillingDetails] = useState({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        phone: "",
        email: "",
    })
    const [formErrors, setFormErrors] = useState({})
    useEffect(() => {
        fetchCart()
    }, [])
    /* ---------------- AUTH GUARD ---------------- */
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/sign-up", { state: { from: "/place-order" } })
        }
    }, [user, authLoading, navigate])

    /* ---------------- CLEAR CART + REDIRECT ---------------- */
    useEffect(() => {
        if (success && order?._id) {
            if (!buyNowItem) clearCart()
            clearBuyNowItem()
            navigate(`/order-success/${order._id}`)
        }
    }, [success, order, buyNowItem, clearCart, clearBuyNowItem, navigate])
    useEffect(() => {
        fetchAddresses()
    }, [])
    /* ---------------- HANDLE CHANGE ---------------- */
    const handleChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value,
        })

        setFormErrors({
            ...formErrors,
            [e.target.name]: "",
        })
    }

    /* ---------------- VALIDATION ---------------- */
    const validateForm = () => {
        const errors = {}

        if (!billingDetails.firstName.trim())
            errors.firstName = "First name is required"

        if (!billingDetails.lastName.trim())
            errors.lastName = "Last name is required"

        if (!billingDetails.addressLine1.trim())
            errors.addressLine1 = "Address is required"

        if (!billingDetails.city.trim())
            errors.city = "City is required"

        if (!billingDetails.state.trim())
            errors.state = "State is required"

        if (!billingDetails.postalCode.trim())
            errors.postalCode = "Postal code is required"
        else if (!/^\d{6}$/.test(billingDetails.postalCode))
            errors.postalCode = "Invalid pincode"

        if (!billingDetails.phone.trim())
            errors.phone = "Phone number is required"
        else if (!/^[6-9]\d{9}$/.test(billingDetails.phone))
            errors.phone = "Invalid Indian phone number"

        if (!billingDetails.email.trim())
            errors.email = "Email is required"
        else if (!/^\S+@\S+\.\S+$/.test(billingDetails.email))
            errors.email = "Invalid email"

        if (checkoutItems.length === 0)
            errors.cart = "Your cart is empty"

        setFormErrors(errors)

        return Object.keys(errors).length === 0
    }

    const subtotal = checkoutItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )

    const handlePlaceOrder = () => {
        if (paymentMethod === "ONLINE") {
            handleOnlinePayment()
            return
        }

        // existing COD logic
        if (!validateForm()) return
        console.log(checkoutItems);

        const cartItems = checkoutItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }))
        console.log(cartItems);

        placeOrder({
            billingDetails,
            cartItems,
            paymentMethod: "COD",
        })
    }
    useEffect(() => {
        if (!user || !user.addresses?.length) return
        console.log(user);

        const defaultAddress =
            user.addresses.find(addr => addr.isDefault) ||
            user.addresses[0]

        if (!defaultAddress) return

        setBillingDetails(prev => ({
            ...prev,
            firstName: defaultAddress.firstName || "",
            lastName: defaultAddress.lastName || "",
            addressLine1: `${defaultAddress.flatNo || ""} ${defaultAddress.buildingName || ""} ${defaultAddress.street || ""}`.trim(),
            addressLine2: defaultAddress.landmark || "",
            city: defaultAddress.city || "",
            state: defaultAddress.state || "",
            postalCode: defaultAddress.pincode || "",
            country: defaultAddress.country || "India",
            phone: defaultAddress.phone || user.phone || "",
            email: user.email || "",
        }))

        setSelectedAddressId(defaultAddress._id)

    }, [user])
    const handleSelectAddress = (id) => {
        setSelectedAddressId(id)

        const selected = addresses.find((addr) => addr._id === id)
        if (!selected) return

        setBillingDetails({
            firstName: selected.firstName || "",
            lastName: selected.lastName || "",
            addressLine1: `${selected.flatNo || ""} ${selected.buildingName || ""} ${selected.street || ""}`.trim(),
            addressLine2: selected.landmark || "",
            city: selected.city || "",
            state: selected.state || "",
            postalCode: selected.pincode || "",
            country: selected.country || "India",
            phone: selected.phone || "",
            email: user?.email || "",
        })
    }
    const handleOnlinePayment = async () => {
        if (!validateForm()) return

        const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ amount: subtotal }),
        })

        const orderData = await res.json()

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            order_id: orderData.id,

            handler: async function (response) {
                const verifyRes = await fetch(`${BASE_URL}/api/payment/verify-payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(response),
                })

                const data = await verifyRes.json()

                if (data.success) {
                    const cartItems = checkoutItems.map(item => ({
                        //  const product = item.product
                        product: item.product._id,
                        quantity: item.quantity,
                        price: item.product.price,
                    }))

                    placeOrder({
                        billingDetails,
                        cartItems,
                        paymentMethod: "RAZORPAY",
                        paymentId: data.paymentId, // use backend verified id
                    })
                }
            },
        }

        const razor = new window.Razorpay(options)

        razor.on("payment.failed", function (response) {
            console.log(response.error)
        })

        razor.open()
    }
    useEffect(() => {
        if (addresses.length > 0) {
            const defaultAddress = addresses.find(addr => addr.isDefault)
            if (defaultAddress) {
                handleSelectAddress(defaultAddress._id)
            }
        }
    }, [addresses])

    return (
        <section className="max-w-[1170px] mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* ================= LEFT — BILLING ================= */}
                <div>
                    <h2 className="text-xl font-medium mb-8">Billing Details</h2>
                    {addresses.length > 0 && (
                        <div className="mb-6">
                            <label className="block text-sm mb-2">Select Saved Address</label>
                            <select
                                value={selectedAddressId}
                                onChange={(e) => handleSelectAddress(e.target.value)}
                                className="w-full h-[52px] bg-[#F5F5F5] px-4 rounded outline-none"
                            >
                                <option value="">-- Select Address --</option>
                                {addresses.map((addr) => (
                                    <option key={addr._id} value={addr._id}>
                                        {addr.firstName} {addr.lastName} - {addr.city}
                                        {addr.isDefault ? " (Default)" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <form className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input label="First Name*" name="firstName" value={billingDetails.firstName} onChange={handleChange} error={formErrors.firstName} />
                            <Input label="Last Name*" name="lastName" value={billingDetails.lastName} onChange={handleChange} error={formErrors.lastName} />
                        </div>

                        <Input label="Street Address*" name="addressLine1" value={billingDetails.addressLine1} onChange={handleChange} error={formErrors.addressLine1} />

                        <Input label="Apartment / Landmark (optional)" name="addressLine2" value={billingDetails.addressLine2} onChange={handleChange} />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Input label="City*" name="city" value={billingDetails.city} onChange={handleChange} error={formErrors.city} />
                            <Input label="State*" name="state" value={billingDetails.state} onChange={handleChange} error={formErrors.state} />
                            <Input label="Postal Code*" name="postalCode" value={billingDetails.postalCode} onChange={handleChange} error={formErrors.postalCode} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input label="Phone*" name="phone" value={billingDetails.phone} onChange={handleChange} error={formErrors.phone} />
                            <Input label="Email*" name="email" value={billingDetails.email} onChange={handleChange} error={formErrors.email} />
                        </div>

                        {formErrors.cart && (
                            <p className="text-red-500 text-sm">{formErrors.cart}</p>
                        )}
                    </form>
                </div>

                <div className="space-y-6">

                    <div className="space-y-4">
                        {checkoutItems.map((item) => {
                            const product = item.product

                            return <div key={product._id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.title}
                                        className="w-12 h-12 object-contain"
                                    />
                                    <p>
                                        {product.title} × {item.quantity}
                                    </p>
                                </div>
                                <span>₹{product.price * item.quantity}</span>
                            </div>
                        })}
                    </div>

                    <hr />

                    <div className="space-y-3">
                        <Row label="Subtotal" value={`₹${subtotal}`} />
                        <Row label="Shipping" value="Free" />
                        <Row label="Total" value={`₹${subtotal}`} bold />
                    </div>

                    <label className="flex items-center gap-3">
                        <input
                            type="radio"
                            checked={paymentMethod === "ONLINE"}
                            onChange={() => setPaymentMethod("ONLINE")}
                        />
                        Pay Online
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="radio"
                            checked={paymentMethod === "COD"}
                            onChange={() => setPaymentMethod("COD")}
                        />
                        Cash on Delivery
                    </label>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        onClick={handlePlaceOrder}
                        disabled={orderLoading}
                        className="w-[200px] h-[56px] bg-[#DB4444] text-white rounded hover:opacity-90"
                    >
                        {orderLoading ? "Placing Order..." : "Place Order"}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PlaceOrder
