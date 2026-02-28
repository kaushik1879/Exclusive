import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useMyOrdersStore from "../store/useMyOrders"
import useAuthStore from "../store/useAuthStore"

const MyOrders = () => {
    const { orders, fetchMyOrders, loading, error } = useMyOrdersStore()
    const { user, loading: authLoading } = useAuthStore()
    const navigate = useNavigate()

    /* ---------------- AUTH GUARD ---------------- */
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/sign-up")
        }
    }, [user, authLoading, navigate])

    /* ---------------- FETCH ORDERS ---------------- */
    useEffect(() => {
        if (!authLoading && user) {
            fetchMyOrders()
        }
    }, [user, authLoading, fetchMyOrders])

    /* ---------------- UI STATES ---------------- */
    if (loading) {
        return <p className="text-center py-20">Loading orders...</p>
    }

    if (error) {
        return (
            <p className="text-center py-20 text-red-500">
                {error}
            </p>
        )
    }

    if (!orders || orders.length === 0) {
        return (
            <p className="text-center py-20 text-black/60">
                You have no orders yet
            </p>
        )
    }
    console.log(orders);

    /* ---------------- UI ---------------- */
    return (
        <section className="max-w-[900px] mx-auto px-4 py-16">
            <h1 className="text-2xl font-medium mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="
              border border-black/10 rounded p-4
              cursor-pointer hover:border-black/30 transition
            "
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-black/60">
                                Order #{order._id.slice(-6).toUpperCase()}
                            </span>

                            <span
                                className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                                    order.orderStatus
                                )}`}
                            >
                                {order.orderStatus}
                            </span>
                        </div>

                        {/* Items count */}
                        <div className="text-sm text-black/70">
                            {order.orderItems.length} item
                            {order.orderItems.length > 1 ? "s" : ""}
                        </div>

                        {/* Total */}
                        <div className="flex justify-between mt-2 font-medium">
                            <span>Total</span>
                            <span>₹{order.totalAmount}</span>
                        </div>

                        {/* Payment */}
                        <div className="flex justify-between mt-1 text-sm">
                            <span className="text-black/60">Payment</span>
                            <span>
                                {order.paymentMethod === "RAZORPAY" ? "Online (Razorpay)" : "Cash on Delivery"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

/* ---------------- STATUS COLORS ---------------- */
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

export default MyOrders
