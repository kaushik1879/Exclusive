import React from "react"
import { Trash2 } from "lucide-react"
import useCartStore from "../store/useCartStore"
import { useNavigate } from "react-router-dom"
// import useAuthStore from "../store/useAuthStore"

const Cart = () => {
    const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore()
    // const user = useAuthStore((s) => s.user)
    const navigate = useNavigate()
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-12">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-10 bg-[#DB4444] rounded" />
                <span className="text-[#DB4444] font-semibold text-lg">
                    Your Cart
                </span>
            </div>

            {/* TABLE HEADER */}
            <div className="shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded">
                <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr] px-6 py-4 text-sm font-medium">
                    <p>Product</p>
                    <p className="text-center">Price</p>
                    <p className="text-center">Quantity</p>
                    <p className="text-right">Subtotal</p>
                </div>
            </div>

            {/* CART ITEMS */}
            <div className="mt-6 space-y-4">
                {cart.length === 0 && (
                    <p className="text-center text-black/60 py-12">
                        Your cart is empty
                    </p>
                )}

                {cart.map((item) => (
                    <div
                        key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
                        className="shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded"
                    >
                        <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr] items-center px-6 py-4">

                            {/* PRODUCT */}
                            <div className="flex items-center gap-4 min-w-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-14 h-14 object-contain shrink-0"
                                />
                                <div className="truncate">
                                    <p className="text-sm font-medium truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-black/60">
                                        Size: {item.selectedSize} | Color: {item.selectedColor}
                                    </p>
                                </div>
                            </div>

                            {/* PRICE */}
                            <p className="text-center whitespace-nowrap">
                                ₹{item.price}
                            </p>

                            {/* QUANTITY */}
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() =>
                                        decreaseQty(item._id, item.selectedSize, item.selectedColor)
                                    }
                                    disabled={item.quantity === 1}
                                    className="w-8 h-8 border rounded disabled:opacity-40"
                                >
                                    −
                                </button>

                                <span className="w-8 text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQty(item._id, item.selectedSize, item.selectedColor)
                                    }
                                    disabled={item.quantity >= item.stock}
                                    className={`w-8 h-8 border rounded
                                    ${item.quantity >= item.stock
                                            ? "opacity-40 cursor-not-allowed"
                                            : "hover:bg-black hover:text-white"}`}
                                >
                                    +
                                </button>
                            </div>

                            {/* SUBTOTAL */}
                            <div className="flex justify-end items-center gap-3 whitespace-nowrap">
                                <span>₹{item.price * item.quantity}</span>
                                <Trash2
                                    size={18}
                                    onClick={() =>
                                        removeFromCart(
                                            item._id,
                                            item.selectedSize,
                                            item.selectedColor
                                        )
                                    }
                                    className="cursor-pointer text-black/60 hover:text-red-500"
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-6">
                <button className="px-10 py-3 border rounded hover:bg-black hover:text-white transition">
                    Return To Shop
                </button>
            </div>

            {/* TOTAL */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div />

                <div className="border rounded p-6 max-w-[420px] ml-auto w-full">
                    <h3 className="text-lg font-medium mb-6">
                        Cart Total
                    </h3>

                    <div className="flex justify-between mb-4">
                        <span>Subtotal:</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>

                    <hr className="mb-4" />

                    <div className="flex justify-between font-medium mb-6">
                        <span>Total:</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <button
                        disabled={!cart.length}
                        onClick={() => navigate("/place-order")}
                        className="w-full h-[52px] bg-[#DB4444] text-white rounded disabled:opacity-40 cursor-pointer"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

        </section>
    )
}

export default Cart
