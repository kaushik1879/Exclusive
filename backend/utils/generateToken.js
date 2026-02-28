import jwt from "jsonwebtoken"
import cookiesOptions from "./cookiesOptions.js"

const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, cookiesOptions)
}

export default generateToken;