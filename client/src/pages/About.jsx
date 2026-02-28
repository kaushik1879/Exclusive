import React from 'react'
import { assets } from '../assets/images/assets'
import { Store, DollarSign, ShoppingBag, Wallet, Twitter, Instagram, Linkedin } from "lucide-react"
import Services from '../components/Services'

const About = () => {
    const stats = [
        {
            id: 1,
            icon: Store,
            value: "10.5k",
            label: "Sellers active our site",
            active: false,
        },
        {
            id: 2,
            icon: DollarSign,
            value: "33k",
            label: "Monthly Product Sale",
            active: false, // highlighted card
        },
        {
            id: 3,
            icon: ShoppingBag,
            value: "45.5k",
            label: "Customer active in our site",
            active: false,
        },
        {
            id: 4,
            icon: Wallet,
            value: "25k",
            label: "Annual gross sale in our site",
            active: false,
        },
    ]
    const team = [
        {
            id: 1,
            name: "Tom Cruise",
            role: "Founder & Chairman",
            image: assets.Team1,
        },
        {
            id: 2,
            name: "Emma Watson",
            role: "Managing Director",
            image: assets.Team2,
        },
        {
            id: 3,
            name: "Will Smith",
            role: "Product Designer",
            image: assets.Team3,
        },
    ]
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                        Our Story
                    </h1>

                    <p className="text-black/70 leading-7 mb-6">
                        Launched in 2015, Exclusive is South Asia’s premier online
                        shopping marketplace with an active presence in Bangladesh.
                        Supported by a wide range of tailored marketing, data and
                        service solutions, Exclusive has 10,500 sellers and 300
                        brands and serves 3 million customers across the region.
                    </p>

                    <p className="text-black/70 leading-7">
                        Exclusive has more than 1 Million products to offer,
                        growing at a very fast. Exclusive offers a diverse
                        assortment in categories ranging from consumer.
                    </p>
                </div>

                {/* RIGHT IMAGE — hidden on mobile */}
                <div className="hidden lg:block">
                    <img
                        src={assets.AboutImg}
                        alt="Our Story"
                        className="w-full h-auto object-cover"
                    />
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-18">
                {stats.map((item) => {
                    const Icon = item.icon
                    return (
                        <div key={item.id} className={`border rounded-md p-8 flex flex-col items-center text-center
                         transition ${item.active ? "bg-[#DB4444] border-[#DB4444] text-white shadow-lg" : "bg-white border-black/20"}`}>
                            {/* ICON WITH DOUBLE BACKGROUND */}
                            <div className="mb-6">
                                {/* OUTER CIRCLE */}
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.active ? "bg-white/30" : "bg-black/10"}`}>
                                    {/* INNER CIRCLE */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.active ? "bg-white" : "bg-black"}`}>
                                        <Icon
                                            size={18}
                                            className={item.active ? "text-[#DB4444]" : "text-white"}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* VALUE */}
                            <h3 className={`text-2xl font-semibold mb-2 ${item.active ? "text-white" : "text-black"}`}>
                                {item.value}
                            </h3>

                            {/* LABEL */}
                            <p className={`text-sm ${item.active ? "text-white/90" : "text-black/70"}`} >
                                {item.label}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {team.map((member) => (
                    <div key={member.id} className="text-left">
                        {/* IMAGE */}
                        <div className="bg-[#F5F5F5] rounded-md mb-6 overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-[320px] object-contain"
                            />
                        </div>

                        {/* NAME */}
                        <h3 className="text-xl font-semibold mb-1">
                            {member.name}
                        </h3>

                        {/* ROLE */}
                        <p className="text-black/60 text-sm mb-4">
                            {member.role}
                        </p>

                        {/* SOCIALS */}
                        <div className="flex gap-4 text-black">
                            <Twitter size={18} className="cursor-pointer hover:text-[#DB4444]" />
                            <Instagram size={18} className="cursor-pointer hover:text-[#DB4444]" />
                            <Linkedin size={18} className="cursor-pointer hover:text-[#DB4444]" />
                        </div>
                    </div>
                ))}
            </div>
            <Services />
        </section>
    )
}

export default About