export const addAddress = async (req, res) => {
    try {
        const user = req.user
        const newAddress = req.body

        // If this is first address → make default automatically
        if (user.addresses.length === 0) {
            newAddress.isDefault = true
        }

        // If user marks this as default → remove default from others
        if (newAddress.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false)
        }

        user.addresses.push(newAddress)
        await user.save()

        res.json({
            success: true,
            message: "Address added successfully",
            addresses: user.addresses
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateAddress = async (req, res) => {
    try {
        const user = req.user
        const { addressId } = req.params
        const updatedData = req.body

        const address = user.addresses.id(addressId)

        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" })
        }

        // If setting as default → remove default from others
        if (updatedData.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false)
        }

        Object.assign(address, updatedData)

        await user.save()

        res.json({
            success: true,
            message: "Address updated successfully",
            addresses: user.addresses
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const user = req.user
        const { addressId } = req.params

        const address = user.addresses.id(addressId)
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" })
        }

        const wasDefault = address.isDefault

        address.remove()

        // If deleted address was default → make first address default
        if (wasDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true
        }

        await user.save()

        res.json({
            success: true,
            message: "Address deleted successfully",
            addresses: user.addresses
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const setDefaultAddress = async (req, res) => {
    try {
        const user = req.user
        const { addressId } = req.params

        user.addresses.forEach(addr => {
            addr.isDefault = addr._id.toString() === addressId
        })

        await user.save()

        res.json({
            success: true,
            message: "Default address updated",
            addresses: user.addresses
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
import User from "../models/user.model.js"

export const getAllAddresses = async (req, res) => {
    try {
        const userId = req.user._id   // from protect middleware

        const user = await User.findById(userId).select("addresses")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            count: user.addresses.length,
            addresses: user.addresses,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}