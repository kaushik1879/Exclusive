import React from 'react'
import ThinArrow from "../../../assets/icons/thin-arrow.svg"
import Apple from "../../../assets/icons/Apple.svg"

const HeroSlide = ({ slide }) => {
    return (
        <div
            key={slide.id}
            className="w-full flex-shrink-0 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 h-full"
        >
            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-4 max-w-sm">
                <div className="flex items-center gap-3">
                    <img src={Apple} alt="" className="w-8" />
                    <p className="text-white text-lg">
                        {slide.brand}
                    </p>
                </div>

                <h4 className="text-white text-2xl md:text-4xl lg:text-5xl leading-tight">
                    {slide.title}
                </h4>

                <div className="flex items-center gap-2 cursor-pointer group w-fit">
                    <p className="text-white text-sm border-b border-white pb-0.5">
                        Shop Now
                    </p>
                    <img
                        src={ThinArrow}
                        alt=""
                        className="w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-[300px] md:w-[400px] flex justify-center">
                <img
                    src={slide.image}
                    alt=""
                    className="w-full object-contain"
                />
            </div>
        </div>
    )
}

export default HeroSlide