import express from 'express'
import { createRazorpayOrder, verifyRazorpayPayment } from '../controller/payment.controller.js'

const paymentRouter = express.Router()

paymentRouter.post("/create-order", createRazorpayOrder)
paymentRouter.post("/verify-payment", verifyRazorpayPayment)

export default paymentRouter