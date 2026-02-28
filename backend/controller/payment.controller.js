import Razorpay from "razorpay"
import crypto from "crypto"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body

        const order = await razorpay.orders.create({
            amount: amount * 100, // paisa
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        })

        res.json(order)
    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: error.message })
    }
}

export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const sign = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex")

        if (razorpay_signature === expectedSign) {
            return res.json({
                success: true,
                paymentId: razorpay_payment_id,
            })
        }

        return res.status(400).json({ success: false })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}