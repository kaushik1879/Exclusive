import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Star,
  Truck,
} from "lucide-react"
import useCartStore from "../store/useCartStore"
import useProductStore from "../store/useProductStore"
import useAuthStore from "../store/useAuthStore"
import useOrderStore from "../store/useOrderStore"

const ProductDetails = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const addToCart = useCartStore((state) => state.addToCart)
  const buyNow = useOrderStore((state) => state.buyNow)
  const { singleProduct, fetchSingleProduct } = useProductStore()

  const [activeImage, setActiveImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (productId) fetchSingleProduct(productId)
  }, [productId, fetchSingleProduct])

  /* ================= SET DEFAULT IMAGE & QUANTITY ================= */
  useEffect(() => {
    if (singleProduct?.images?.length) {
      setActiveImage(singleProduct.images[0])
    }

    if (singleProduct) {
      setQuantity(singleProduct.stock > 0 ? 1 : 0)
    }
  }, [singleProduct])

  if (!singleProduct) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-center text-black/60">Loading product...</p>
      </section>
    )
  }
  console.log(singleProduct);

  const isOutOfStock = singleProduct.stock <= 0
  const disableCTA =
    isOutOfStock || !selectedSize || !selectedColor

  /* ================= HANDLERS ================= */
  const handleAddToCart = () => {
    if (!user) {
      navigate("/sign-up", { state: { from: location.pathname } })
      return
    }

    if (disableCTA) return
    if (quantity > singleProduct.stock) return

    addToCart(singleProduct._id, quantity)
  }

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/sign-up", { state: { from: location.pathname } })
      return
    }

    if (disableCTA) return
    if (quantity > singleProduct.stock) return

    await buyNow(singleProduct._id, quantity)

    navigate("/place-order")
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-10">

        {/* ================= THUMBNAILS ================= */}
        <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
          {singleProduct.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`w-20 h-20 rounded border bg-[#F5F5F5]
                ${activeImage === img
                  ? "border-[#DB4444] border-2"
                  : "border-black/20"}`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>

        {/* ================= MAIN IMAGE ================= */}
        <div className="bg-[#F5F5F5] rounded-lg flex items-center justify-center order-1 lg:order-2">
          <img
            src={activeImage}
            alt={singleProduct.title}
            className="w-full object-contain"
          />
        </div>

        {/* ================= DETAILS ================= */}
        <div className="order-3 space-y-5">

          <h1 className="text-2xl font-semibold">
            {singleProduct.title}
          </h1>

          {isOutOfStock && (
            <span className="inline-block text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded">
              Out of Stock
            </span>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < singleProduct.rating
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "stroke-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({singleProduct.reviews} Reviews)
            </span>
          </div>

          {/* Price */}

          <p className="text-2xl font-semibold">
            ₹{singleProduct.price}
          </p>

          <p className="text-sm text-black/70">
            {singleProduct.description}
          </p>

          <hr />

          {/* COLORS */}
          <div>
            <p className="text-sm font-medium mb-2">Colours</p>
            <div className="flex gap-3">
              {singleProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={isOutOfStock}
                  className={`w-8 h-8 rounded-full border-2
                    ${selectedColor === color
                      ? "border-[#DB4444]"
                      : "border-black/30"}`}
                >
                  <span
                    className="w-4 h-4 rounded-full block mx-auto"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex gap-3">
              {singleProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`px-4 py-2 border rounded text-sm
                    ${selectedSize === size
                      ? "border-[#DB4444] text-[#DB4444]"
                      : "border-black/30"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4">
            <div className="flex border rounded overflow-hidden">
              <button
                disabled={isOutOfStock || quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border-r"
              >
                <Minus size={16} />
              </button>

              <span className="px-6 py-2">{quantity}</span>

              <button
                disabled={isOutOfStock || quantity >= singleProduct.stock}
                onClick={() =>
                  setQuantity((prev) =>
                    prev < singleProduct.stock ? prev + 1 : prev
                  )
                }
                className={`px-4 py-2
                  ${isOutOfStock || quantity >= singleProduct.stock
                    ? "bg-gray-300"
                    : "bg-[#DB4444] text-white"}`}
              >
                <Plus size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Available: {singleProduct.stock}
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={disableCTA}
              className={`px-8 py-3 border rounded
                ${disableCTA
                  ? "border-gray-300 text-gray-400"
                  : "border-[#DB4444] text-[#DB4444] hover:bg-[#DB4444] hover:text-white"}`}
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={disableCTA}
              className={`px-8 py-3 rounded
                ${disableCTA
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[#DB4444] text-white hover:bg-red-600"}`}
            >
              Buy Now
            </button>

            <button className="w-12 h-12 border rounded flex items-center justify-center">
              <Heart size={18} />
            </button>
          </div>

          {/* DELIVERY */}
          <div className="border rounded p-4 flex gap-4">
            <Truck />
            <p className="text-sm">Free Delivery</p>
          </div>

          <div className="border rounded p-4 flex gap-4">
            <RotateCcw />
            <p className="text-sm">30 Days Return</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProductDetails
