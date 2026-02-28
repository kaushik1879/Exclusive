import jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
    const token = req.cookies.adminToken

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized",
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "admin") {
            return res.json({
                success: false,
                message: "Access denied",
            })
        }
        req.admin = decoded
        next()

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export default adminAuth