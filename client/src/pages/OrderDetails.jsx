import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useOrderStore from "../store/useOrderStore"
import useAuthStore from "../store/useAuthStore"

const OrderDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { order, fetchOrderById, loading, error } =
        useOrderStore()

    const { user, loading: authLoading } = useAuthStore()
    console.log(order);

    /* -------- AUTH GUARD -------- */
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/sign-up")
        }
    }, [user, authLoading, navigate])

    /* -------- FETCH ORDER -------- */
    useEffect(() => {
        if (user && id) {
            fetchOrderById(id)
        }
    }, [user, id, fetchOrderById])

    if (loading) {
        return <p className="text-center py-20">Loading order...</p>
    }

    if (error) {
        return (
            <p className="text-center py-20 text-red-500">
                {error}
            </p>
        )
    }

    if (!order) return null

    return (
        <section className="max-w-[900px] mx-auto px-4 py-16 space-y-8">
            <h1 className="text-2xl font-medium">
                Order #{order._id.slice(-6).toUpperCase()}
            </h1>

            {/* STATUS */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-black/60">Status:</span>
                <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.orderStatus
                    )}`}
                >
                    {order.orderStatus}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-black/60">Payment:</span>

                <span className="text-sm font-medium">
                    {order.paymentMethod === "RAZORPAY"
                        ? "Online (Razorpay)"
                        : "Cash on Delivery"}
                </span>

                <span
                    className={`px-2 py-1 rounded text-xs ${order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {order.paymentStatus}
                </span>
            </div>
            {/* ITEMS */}
            <div className="border rounded p-4 space-y-4">
                {order.orderItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt=""
                                className="w-14 h-14 object-contain"
                            />
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-black/60">
                                    Qty: {item.quantity}
                                </p>
                            </div>
                        </div>
                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            {/* BILLING */}
            <div className="border rounded p-4 space-y-2">
                <h2 className="font-medium">Billing Details</h2>
                <p>
                    {order.billingDetails.firstName}{" "}
                    {order.billingDetails.lastName}
                </p>
                <p>{order.billingDetails.addressLine1}</p>
                <p>{order.billingDetails.city}</p>
                <p>{order.billingDetails.phone}</p>
                <p>{order.billingDetails.email}</p>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
            </div>
        </section>
    )
}

/* -------- STATUS COLORS -------- */
const getStatusColor = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700"
        case "Shipped":
            return "bg-blue-100 text-blue-700"
        case "Cancelled":
            return "bg-red-100 text-red-700"
        default:
            return "bg-yellow-100 text-yellow-700"
    }
}

export default OrderDetails
