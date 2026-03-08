import mongoose from "mongoose"

const cartItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemsSchema]
}, { timestamps: true });

const cartModel = mongoose.model("Cart", cartSchema)

export default cartModel
