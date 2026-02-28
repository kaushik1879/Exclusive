import React from 'react'
import {  assets } from '../assets/images/assets'

const Services = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base'>
            <div>
                <img src={assets.Service1} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>FREE AND FAST DELIVERY</p>
                <p className='text-gray-400'>Free delivery for all orders over $140</p>
            </div>
            <div>
                <img src={assets.Service2} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>24/7 CUSTOMER SERVICE</p>
                <p className='text-gray-400'>Friendly 24/7 customer support</p>
            </div>
            <div>
                <img src={assets.Service3} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>MONEY BACK GUARANTEE</p>
                <p className='text-gray-400'>We reurn money within 30 days</p>
            </div>
        </div>
    )
}

export default Services