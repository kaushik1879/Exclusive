import cartModel from "../models/cartModel.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID required" });
        }

        let cart = await cartModel.findOne({ user: userId });
        // create cart if not exists
        if (!cart) {
            cart = new cartModel({
                user: userId,
                items: [{ product: productId, quantity: quantity || 1 }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            // if product exists → increase quantity
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1
                });
            }
        }

        await cart.save();

        return res.json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await cartModel.findOne({ user: userId })
            .populate("items.product"); // optional but useful

        if (!cart) {
            return res.status(200).json({
                items: [],
                message: "Cart is empty"
            });
        }

        return res.json({ success: true, cart });

    } catch (error) {
        console.log(error.message);

        return res.json({ message: error.message });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        return res.json({
            message: "Cart updated",
            cart
        });

    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        return res.json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        return res.json({ message: error.message });
    }
};
