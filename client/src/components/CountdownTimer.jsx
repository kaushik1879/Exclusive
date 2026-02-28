import React, { useEffect, useState } from "react"

const CountdownTimer = ({ daysFromNow = 3 }) => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + daysFromNow)

    const calculateTimeLeft = () => {
        const difference = targetDate - new Date()

        if (difference <= 0) {
            return { days: "00", hours: "00", minutes: "00", seconds: "00" }
        }

        return {
            days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
            hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
            minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
            seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">

            {/* Days */}
            <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-black">Days</p>
                <p className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {timeLeft.days}
                </p>
            </div>

            <span className="text-[#DB4444] text-xl sm:text-2xl md:text-3xl font-bold">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-black">Hours</p>
                <p className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {timeLeft.hours}
                </p>
            </div>

            <span className="text-[#DB4444] text-xl sm:text-2xl md:text-3xl font-bold">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-black">Minutes</p>
                <p className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {timeLeft.minutes}
                </p>
            </div>

            <span className="text-[#DB4444] text-xl sm:text-2xl md:text-3xl font-bold">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-black">Seconds</p>
                <p className="font-bold text-xl sm:text-2xl md:text-3xl">
                    {timeLeft.seconds}
                </p>
            </div>

        </div>
    )
}

export default CountdownTimer
