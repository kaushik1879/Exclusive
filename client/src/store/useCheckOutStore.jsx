import { create } from "zustand"

const useCheckoutStore = create((set) => ({
  checkoutItem: null,

  setCheckoutItem: (item) =>
    set({ checkoutItem: item }),

  clearCheckout: () =>
    set({ checkoutItem: null }),
}))

export default useCheckoutStore