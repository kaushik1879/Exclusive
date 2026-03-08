import mongoose from "mongoose"
import orderModel from "../models/orderModel.js"
import productModel from "../models/product.model.js"

export const placeOrder = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { billingDetails, cartItems, paymentMethod, paymentId } = req.body
        const userId = req.user._id

        if (!cartItems?.length) throw new Error("Cart is empty")

        if (!["COD", "RAZORPAY"].includes(paymentMethod)) {
            throw new Error("Invalid payment method")
        }

        if (!billingDetails?.firstName || !billingDetails?.addressLine1) {
            throw new Error("Billing details missing")
        }

        // ✅ ONLINE PAYMENT MUST HAVE VERIFIED PAYMENT ID
        if (paymentMethod === "RAZORPAY" && !paymentId) {
            throw new Error("Payment not verified")
        }

        let totalAmount = 0
        const orderItems = []
        const productUpdates = []

        for (const item of cartItems) {
            console.log(item);

            const product = await productModel.findById(item.product).session(session)
            console.log(product);
            if (!product) throw new Error("Product not found")
            if (product.stock < item.quantity) {
                throw new Error(`Only ${product.stock} left for ${product.title}`)
            }

            totalAmount += product.price * item.quantity

            orderItems.push({
                product: product._id,
                title: product.title,
                price: product.price,
                image: product.images?.[0] || "",
                selectedSize: item.selectedSize || null,
                quantity: item.quantity,
            })

            productUpdates.push({ product, quantity: item.quantity })
        }

        // ✅ REDUCE STOCK
        for (const update of productUpdates) {
            update.product.stock -= update.quantity
            await update.product.save({ session })
        }

        const order = await orderModel.create(
            [{
                user: userId,
                orderItems,
                billingDetails,
                paymentMethod,
                paymentStatus: paymentMethod === "RAZORPAY" ? "Paid" : "Pending",
                paymentId: paymentId || null,
                totalAmount,
                orderStatus: "Placed",
            }],
            { session }
        )

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: order[0],
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()

        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id

        const orders = await orderModel.find({ user: userId }).sort({ createdAt: -1 })

        return res.json({
            success: true,
            orders,
        })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getOrderById = async (req, res) => {
    try {
        const userId = req.user._id
        const { orderId } = req.params

        const order = await orderModel.findOne({
            _id: orderId,
            user: userId,
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            })
        }

        return res.json({
            success: true,
            order,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const buyNow = async (req, res) => {
    try {
        const { productId, quantity } = req.body

        const product = await productModel.findById(productId)

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.stock < quantity) {
            return res.json({
                success: false,
                message: "Not enough stock"
            })
        }

        return res.json({
            success: true,
            item: {
                product: product._id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity
            }
        })

    } catch (error) {
        console.log(error.message);
        
        return res.json({ success: false, message: error.message })
    }
}