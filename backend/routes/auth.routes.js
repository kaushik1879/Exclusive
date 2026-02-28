import express from "express"
import { login, logout, profile, register, updateProfile } from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", authMiddleware, profile)
router.put("/update-profile", authMiddleware, updateProfile)

export default router