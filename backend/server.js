import express from "express"
import cors from 'cors'
import "dotenv/config"
import connectDb from "./config/mongodb.js"
import router from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import connectCloudinary from "./config/cloudinary.js"
import productRouter from "./routes/product.routes.js"
import adminRouter from "./routes/admin.routes.js"
import orderRouter from "./routes/order.routes.js"
import addressRouter from "./routes/address.routes.js"
import paymentRouter from "./routes/payment.routes.js"

const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.use("/api/auth", router)
app.use("/api/product", productRouter)
app.use("/api/admin", adminRouter)
app.use("/api/order", orderRouter)
app.use("/api/addresses", addressRouter)
app.use("/api/payment", paymentRouter)

app.listen(port, () => console.log('Server started on port' + port))