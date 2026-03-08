import express from "express"
import adminAuth from "../middleware/adminAuth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.post("/add", adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 2 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct)
productRouter.post("/remove", adminAuth, removeProduct)
productRouter.get("/list", listProducts)
productRouter.get("/single/:id", singleProduct)
// productRouter.get("/search", searchProducts)

export default productRouter