import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    colors: { type: Array, required: true },
    stock: { type: Number, required: true },
    flashSale: { type: Boolean, required: true },
    bestSeller: { type: Boolean, required: true },
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel