import express from "express"
import { buyNow, getMyOrders, getOrderById, placeOrder } from "../controller/order.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.get("/my-orders", authMiddleware, getMyOrders)
orderRouter.get("/my/:orderId", authMiddleware, getOrderById)
orderRouter.post("/buy-now", authMiddleware, buyNow)

export default orderRouter
