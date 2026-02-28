import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import {
    addAddress,
    deleteAddress,
    getAllAddresses,
    setDefaultAddress,
    updateAddress
} from "../controller/address.controller.js"

const addressRouter = express.Router()

addressRouter.post("/", authMiddleware, addAddress)
addressRouter.get("/", authMiddleware, getAllAddresses)
addressRouter.put("/:addressId", authMiddleware, updateAddress)
addressRouter.delete("/:addressId", authMiddleware, deleteAddress)
addressRouter.patch("/:addressId/default", authMiddleware, setDefaultAddress)

export default addressRouter