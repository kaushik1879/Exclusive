import { create } from "zustand"
import { persist } from "zustand/middleware"

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      buyNowItem: null,

      addToCart: (product) => {
        const cart = get().cart
        console.log(product);

        const cartItem = {
          _id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          selectedSize: product.selectedSize,
          selectedColor: product.selectedColor,
          quantity: product.quantity,
          stock: product.stock
        }

        const existingItem = cart.find(
          (item) =>
            item._id === cartItem._id &&
            item.selectedSize === cartItem.selectedSize &&
            item.selectedColor === cartItem.selectedColor
        )

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item._id === cartItem._id &&
                item.selectedSize === cartItem.selectedSize &&
                item.selectedColor === cartItem.selectedColor
                ? { ...item, quantity: item.quantity + cartItem.quantity }
                : item
            ),
          })
        } else {
          set({
            cart: [...cart, cartItem],
          })
        }
      },

      removeFromCart: (_id, size, color) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(
                item._id === _id &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        })
      },

      increaseQty: (_id, selectedSize, selectedColor) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (
              item._id === _id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
            ) {
              if (item.quantity >= item.stock) return item  // ✅ LIMIT

              return { ...item, quantity: item.quantity + 1 }
            }
            return item
          }),
        })),


      decreaseQty: (_id, size, color) => {
        set({
          cart: get().cart
            .map((item) =>
              item._id === _id &&
                item.selectedSize === size &&
                item.selectedColor === color
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })
      },

      clearCart: () => set({ cart: [] }),

      setBuyNowItem: (item) =>
        set(() => ({
          buyNowItem: item,
        })),

      clearBuyNowItem: () =>
        set(() => ({
          buyNowItem: null,
        })),
    }),
    {
      name: "cart-storage",
    }
  )
)

export default useCartStore
