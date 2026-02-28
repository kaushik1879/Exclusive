import mongoose from "mongoose"
import bcrypt from "bcryptjs"

/* ================= ADDRESS SCHEMA ================= */
const addressSchema = new mongoose.Schema(
    {
        firstName: { type: String, default: "" },
        middleName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        phone: { type: String, default: "" },

        flatNo: { type: String, default: "" },
        buildingName: { type: String, default: "" },
        street: { type: String, default: "" },
        landmark: { type: String, default: "" },

        city: { type: String, default: "" },
        state: { type: String, default: "" },
        pincode: { type: String, default: "" },
        country: { type: String, default: "India" },

        isDefault: { type: Boolean, default: false }, // ⭐ important
    },
    { timestamps: true }
)

/* ================= USER SCHEMA ================= */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // 🔐 hidden by default
        },

        phone: {
            type: String,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        addresses: {
            type: [addressSchema],
            default: [],
        },

        cart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product", // 👈 match your product model name
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                selectedSize: {
                    type: String,
                    default: "",
                },
                selectedColor: {
                    type: String,
                    default: "",
                },
            },
        ],
    },
    { timestamps: true }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

/* ================= PASSWORD COMPARE METHOD ================= */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

/* ================= MODEL EXPORT ================= */
const User = mongoose.model("User", userSchema)

export default User