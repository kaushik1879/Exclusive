import React from "react"
import { assets } from "../assets/images/assets"
import { Facebook, Instagram, Linkedin, Twitter, Send } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            {/* TOP */}
            <div className="max-w-[1170px] mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Exclusive */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Exclusive</h3>
                    <p className="mb-3">Subscribe</p>
                    <p className="text-sm text-white/70 mb-4">
                        Get 10% off your first order
                    </p>

                    {/* Input Wrapper */}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent border border-white/30 rounded py-2 pl-3 pr-10 text-sm outline-none placeholder:text-white/50"
                        />

                        {/* Icon Inside Input */}
                        <button className="absolute right-3 top-2.5 -translate-y-1/2 text-white/70 hover:text-white transition"
                        >
                            <Send size={18} strokeWidth={1.5} className="rotate-45" />
                        </button>
                    </div>
                </div>
                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
                        <li>exclusive@gmail.com</li>
                        <li>+88015-88888-9999</li>
                    </ul>
                </div>

                {/* Account */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Account</h3>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li>My Account</li>
                        <li>Login / Register</li>
                        <li>Cart</li>
                        <li>Wishlist</li>
                        <li>Shop</li>
                    </ul>
                </div>

                {/* Quick Link */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li>Privacy Policy</li>
                        <li>Terms Of Use</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Download App */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Download App</h3>
                    <p className="text-xs text-white/60 mb-4">
                        Save $3 with App New User Only
                    </p>

                    <div className="flex gap-3 mb-4">
                        <img src={assets.qr} alt="QR" className="w-20 h-20" />
                        <div className="flex flex-col gap-2">
                            <img src={assets.googlePlay} alt="Google Play" className="w-28" />
                            <img src={assets.appStore} alt="App Store" className="w-28" />
                        </div>
                    </div>

                    <div className="flex gap-4 text-lg">
                        <span><Facebook /></span>
                        <span><Twitter /></span>
                        <span><Instagram /></span>
                        <span><Linkedin /></span>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-white/10 text-center py-4 text-sm text-white/60">
                © Copyright Rimel 2022. All rights reserved
            </div>
        </footer>
    )
}

export default Footer
