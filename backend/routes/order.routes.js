import express from "express"
import { getMyOrders, getOrderById, placeOrder } from "../controller/order.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.get("/my-orders", authMiddleware, getMyOrders)
orderRouter.get("/my/:orderId", authMiddleware, getOrderById)

export default orderRouter
