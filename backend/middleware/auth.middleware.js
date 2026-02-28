import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.json({ success: false, message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select("-password");
        next()
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

export default authMiddleware