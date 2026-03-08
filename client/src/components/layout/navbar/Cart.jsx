import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import useCartStore from "../../../store/useCartStore"

const Cart = () => {
    const cartCount = useCartStore(state =>
        state.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
    )

    return (
        <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
            {cartCount > 0 && (
                <span className="absolute -top-2 left-2 bg-red-500 px-2 rounded-full text-white text-xs">
                    {cartCount}
                </span>
            )}
        </Link>
    )
}

export default Cart