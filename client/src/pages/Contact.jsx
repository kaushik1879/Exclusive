import React from "react"
import { Phone, Mail } from "lucide-react"

const Contact = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT INFO CARD */}
                <div className="shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded-[4px] p-8 flex flex-col gap-10">

                    {/* CALL TO US */}
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#DB4444] flex items-center justify-center">
                                <Phone size={18} className="text-white" />
                            </div>
                            <h3 className="font-medium text-lg">Call To Us</h3>
                        </div>

                        <p className="text-sm text-black/70 mb-2">
                            We are available 24/7, 7 days a week.
                        </p>
                        <p className="text-sm text-black">
                            Phone: +8801611112222
                        </p>
                    </div>

                    <hr className="border-black/10" />

                    {/* WRITE TO US */}
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#DB4444] flex items-center justify-center">
                                <Mail size={18} className="text-white" />
                            </div>
                            <h3 className="font-medium text-lg">Write To Us</h3>
                        </div>

                        <p className="text-sm text-black/70 mb-3">
                            Fill out our form and we will contact you within 24 hours.
                        </p>

                        <p className="text-sm">Emails: customer@exclusive.com</p>
                        <p className="text-sm">Emails: support@exclusive.com</p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="lg:col-span-2 shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded-[4px] p-8">

                    {/* INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <input
                            type="text"
                            placeholder="Your Name *"
                            className="bg-[#F5F5F5] px-4 py-3 rounded outline-none text-sm"
                        />
                        <input
                            type="email"
                            placeholder="Your Email *"
                            className="bg-[#F5F5F5] px-4 py-3 rounded outline-none text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Your Phone *"
                            className="bg-[#F5F5F5] px-4 py-3 rounded outline-none text-sm"
                        />
                    </div>

                    {/* MESSAGE */}
                    <textarea
                        placeholder="Your Message"
                        rows="6"
                        className="w-full bg-[#F5F5F5] px-4 py-3 rounded outline-none text-sm mb-6 resize-none"
                    />

                    {/* BUTTON */}
                    <div className="flex justify-end">
                        <button
                            className="bg-[#DB4444] text-white px-10 py-3 rounded text-sm font-medium hover:opacity-90 transition"
                        >
                            Send Message
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Contact
