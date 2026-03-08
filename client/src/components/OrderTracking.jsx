const ORDER_STEPS = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
]

const OrderTracking = ({ status }) => {
    const currentStep = ORDER_STEPS.indexOf(status)

    return (
        <div className="w-full mt-6">
            <div className="flex justify-between items-center">

                {ORDER_STEPS.map((step, index) => {
                    const completed = index <= currentStep

                    return (
                        <div key={step} className="flex flex-col items-center flex-1">

                            {/* CIRCLE */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                            >
                                {index + 1}
                            </div>

                            {/* LABEL */}
                            <p
                                className={`text-xs mt-2 text-center
                ${completed ? "text-black" : "text-gray-400"}`}
                            >
                                {step}
                            </p>

                            {/* LINE */}
                            {index !== ORDER_STEPS.length - 1 && (
                                <div
                                    className={`h-1 w-full mt-3
                  ${index < currentStep ? "bg-green-500" : "bg-gray-200"}`}
                                />
                            )}

                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default OrderTracking