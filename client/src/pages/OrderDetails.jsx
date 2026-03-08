import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useOrderStore from "../store/useOrderStore"
import useAuthStore from "../store/useAuthStore"
import OrderTracking from "../components/OrderTracking"

const OrderDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { order, fetchOrderById, loading, error } = useOrderStore()
    const { user, loading: authLoading } = useAuthStore()

    /* AUTH GUARD */
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/sign-up")
        }
    }, [user, authLoading, navigate])

    /* FETCH ORDER */
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
    console.log(order.orderStatus);
    
    return (
        <section className="max-w-[1000px] mx-auto px-4 py-16 space-y-10">

            {/* ORDER HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Order #{order._id.slice(-6).toUpperCase()}
                    </h1>

                    <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}
                >
                    {order.orderStatus}
                </span>
                <OrderTracking status={order.orderStatus} />
            </div>

            {/* PAYMENT */}
            <div className="border rounded-lg p-5 flex flex-col gap-2">
                <p className="text-sm text-gray-500">Payment Method</p>

                <div className="flex items-center gap-4">
                    <span className="font-medium">
                        {order.paymentMethod === "RAZORPAY"
                            ? "Online (Razorpay)"
                            : "Cash on Delivery"}
                    </span>

                    <span
                        className={`text-xs px-2 py-1 rounded ${order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {order.paymentStatus}
                    </span>
                </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="border rounded-lg p-5 space-y-5">
                <h2 className="text-lg font-medium">Items</h2>

                {order.orderItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border-b last:border-none pb-4"
                    >
                        <div className="flex items-center gap-4">

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-contain bg-gray-50 rounded"
                            />

                            <div>
                                <p className="font-medium">{item.title}</p>

                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>

                                <p className="text-sm text-gray-500">
                                    ₹{item.price} each
                                </p>
                            </div>
                        </div>

                        <span className="font-medium">
                            ₹{item.price * item.quantity}
                        </span>
                    </div>
                ))}
            </div>

            {/* BILLING + TOTAL */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* BILLING */}
                <div className="border rounded-lg p-5 space-y-2">
                    <h2 className="font-medium text-lg">
                        Billing Details
                    </h2>

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
                <div className="border rounded-lg p-5 space-y-3">
                    <h2 className="font-medium text-lg">Order Summary</h2>

                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{order.totalAmount}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{order.totalAmount}</span>
                    </div>
                </div>

            </div>

        </section>
    )
}

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