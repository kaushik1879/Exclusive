import jwt from "jsonwebtoken"

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                { email, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            })

            return res.json({
                success: true,
                message: "Admin logged in",
            })
        }

        return res.json({
            success: false,
            message: "Invalid Credentials",
        })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export const adminLogout = async (req, res) => {
    res.clearCookie("adminToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })

    res.json({
        success: true,
        message: "Logged Out Successfully"
    })
}