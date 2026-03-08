import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/product.model.js'

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, oldPrice, discount, rating, reviews,
            category, subCategory, sizes, colors, stock, flashSale, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )

        const productData = {
            title,
            description,
            price: Number(price),
            oldPrice: Number(oldPrice),
            discount: Number(discount),
            rating: Number(rating),
            reviews: Number(reviews),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            colors: JSON.parse(colors),
            stock,
            flashSale: flashSale === "true" ? true : false,
            bestSeller: bestSeller === "true" ? true : false,
            images: imagesUrl,
            date: Date.now(),
        }

        const product = new productModel(productData)
        await product.save()

        return res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

// function for removing product
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export const listProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sort,
            search,
            page = 1,
            limit = 10
        } = req.query

        const filter = {}

        // CATEGORY FILTER
        if (category) filter.category = category

        // PRICE FILTER
        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = Number(minPrice)
            if (maxPrice) filter.price.$lte = Number(maxPrice)
        }

        // SEARCH FILTER
        if (search) {
            filter.$text = { $search: search }
        }

        // SORTING
        let sortOption = {}
        if (sort === "priceLow") sortOption.price = 1
        if (sort === "priceHigh") sortOption.price = -1
        if (sort === "latest") sortOption.date = -1

        // PAGINATION
        const skip = (page - 1) * limit

        const products = await productModel
            .find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))

        const total = await productModel.countDocuments(filter)

        return res.json({
            success: true,
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export const singleProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findById(id)
        if (!product) {
            return res.json({ success: false, message: "Product Not Found" })
        }
        return res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}
