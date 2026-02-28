import express from "express"
import { adminLogin, adminLogout } from "../controller/admin.controller.js"

const adminRouter = express.Router()

adminRouter.post("/adminLogin", adminLogin)
adminRouter.post("/adminLogout", adminLogout)

export default adminRouter