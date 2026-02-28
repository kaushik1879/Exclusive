import React from "react"
import bannerRight from "../assets/images/banner-right.png"

const Banner = () => {
    return (
        <div className="bg-black w-full max-w-[1170px] mx-auto overflow-hidden rounded">

            <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-14 py-10 lg:py-0 min-h-[400px] lg:min-h-[500px]">

                {/* LEFT CONTENT */}
                <div className="z-10 max-w-xl text-center lg:text-left">

                    <p className="text-[#00FF66] mb-4">
                        Categories
                    </p>

                    <h4 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                        Enhance Your Music Experience
                    </h4>

                    {/* TIMER */}
                    <div className="flex justify-center lg:justify-start gap-4 mt-8">
                        {["23", "05", "59", "35"].map((time, i) => (
                            <div
                                key={i}
                                className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px]
                                bg-white rounded-full flex flex-col items-center justify-center"
                            >
                                <h1 className="font-semibold">{time}</h1>
                                <p className="text-xs">Hours</p>
                            </div>
                        ))}
                    </div>

                    {/* BUTTON */}
                    <button className="mt-10 bg-[#00FF66] px-10 py-4 rounded text-white hover:opacity-90 transition">
                        Buy Now
                    </button>
                </div>

                {/* RIGHT IMAGE (DESKTOP ONLY) */}
                <div className="relative hidden lg:flex items-center justify-center w-[520px]">

                    {/* Glow */}
                    <div className="absolute w-[75%] h-[75%] bg-white/30 blur-[90px] rounded-full" />

                    <img
                        src={bannerRight}
                        alt=""
                        className="relative w-full object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner
