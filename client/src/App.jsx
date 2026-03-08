import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import useProductStore from './store/useProductStore'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import useAuthStore from './store/useAuthStore'
import { ToastContainer } from 'react-toastify';
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/OrderDetails'
import Collections from './pages/Collections'
import useCartStore from './store/useCartStore'
import ScrollToTop from './components/ScrollToTop'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import useWishlistStore from './store/useWishlistStore'

const App = () => {
  const checkAuth = useAuthStore((s) => s.checkAuth)
  const fetchCart = useCartStore(state => state.fetchCart)
  const user = useAuthStore(state => state.user)
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist)

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user, fetchCart])

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <div className="relative w-full">
      <ToastContainer />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App