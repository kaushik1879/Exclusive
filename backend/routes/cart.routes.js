import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { addToCart, getUserCart, removeFromCart, updateCartItemQuantity } from "../controller/cartController.js"

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.put("/update", authMiddleware, updateCartItemQuantity);
cartRouter.get("/", authMiddleware, getUserCart);
cartRouter.delete("/remove/:productId", authMiddleware, removeFromCart);

export default cartRouter