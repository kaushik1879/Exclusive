import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        /* ================= ORDER ITEMS ================= */
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                },
                selectedSize: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],

        /* ================= BILLING ================= */
        billingDetails: {
            firstName: { type: String, required: true },
            lastName: { type: String },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String },
            postalCode: { type: String },
            country: { type: String, default: "India" },
            phone: { type: String, required: true },
            email: { type: String, required: true },
        },

        /* ================= PAYMENT ================= */
        paymentMethod: {
            type: String,
            enum: ["COD", "RAZORPAY"],
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        /* ================= ORDER META ================= */
        totalAmount: {
            type: Number,
            required: true,
        },

        orderStatus: {
            type: String,
            enum: [
                "Placed",
                "Confirmed",
                "Packed",
                "Shipped",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
            ],
            default: "Placed",
        },

        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

const orderModel = mongoose.model("Order", orderSchema)
export default orderModel
