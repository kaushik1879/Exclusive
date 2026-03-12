import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const user = await userModel.create({
            name,
            email,
            password
        });

        generateToken(res, user._id);

        return res.json({ success: true, message: "Registered successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.json({ success: false, message: "Please Create An Account" });
        }

        const match = await user.comparePassword(password);

        if (!match) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        generateToken(res, user._id);

        return res.json({ success: true, message: "Login successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


export const profile = (req, res) => {
    try {
        return res.json({ success: true, user: req.user });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = req.user; // from authMiddleware

        const {
            name,
            phone,
            address,
            password,
        } = req.body;

        /* ================= BASIC INFO ================= */
        if (typeof name === "string") {
            user.name = name.trim();
        }

        if (typeof phone === "string") {
            user.phone = phone.trim();
        }

        /* ================= ADDRESS UPDATE ================= */
        if (address && typeof address === "object") {
            user.address = {
                firstName: address.firstName || "",
                middleName: address.middleName || "",
                lastName: address.lastName || "",

                phone: address.phone || "",

                flatNo: address.flatNo || "",
                buildingName: address.buildingName || "",
                street: address.street || "",
                landmark: address.landmark || "",

                city: address.city || "",
                state: address.state || "",
                pincode: address.pincode || "",
                country: address.country || "India",
            };
        }

        /* ================= PASSWORD UPDATE ================= */
        if (password) {
            if (password.length < 6) {
                return res.json({
                    success: false,
                    message: "Password must be at least 6 characters",
                });
            }

            user.password = password;
            // 🔐 auto hashed by pre-save middleware
        }

        await user.save();

        // remove password before sending response
        const updatedUser = user.toObject();
        delete updatedUser.password;

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};