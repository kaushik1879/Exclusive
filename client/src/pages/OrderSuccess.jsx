import { useParams, Link } from "react-router-dom"

const OrderSuccess = () => {
    const { orderId } = useParams()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-semibold text-green-600">
                Order Placed Successfully 🎉
            </h1>

            <p className="mt-4 text-black/70">
                Your order ID:
            </p>

            <p className="font-mono mt-1">
                {orderId}
            </p>

            <Link
                to="/my-orders"
                className="mt-6 inline-block bg-black text-white px-6 py-3 rounded"
            >
                View My Orders
            </Link>
        </div>
    )
}

export default OrderSuccess
