import wishlistModel from "../models/wishlistModel.js"

export const toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId } = req.params

        const existing = await wishlistModel.findOne({
            user: userId,
            product: productId,
        })

        if (existing) {
            await existing.deleteOne()

            return res.json({
                success: true,
                action: "removed",
            })
        }

        await wishlistModel.create({
            user: userId,
            product: productId,
        })

        res.json({
            success: true,
            action: "added",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id

    const wishlist = await wishlistModel.find({ user: userId })
      .populate("product")

    res.json({
      success: true,
      wishlist,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}