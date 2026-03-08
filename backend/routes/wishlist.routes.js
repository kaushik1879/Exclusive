import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { getWishlist, toggleWishlist } from "../controller/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/toggle/:productId", authMiddleware, toggleWishlist)
wishlistRouter.get("/", authMiddleware, getWishlist)

export default wishlistRouter;