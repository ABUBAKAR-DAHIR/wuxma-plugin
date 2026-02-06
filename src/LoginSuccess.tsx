import React, { useEffect, useState } from 'react'
import Home from './Home'
import Logo from './components/Logo'

export default function LoginSuccess() {
    return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-linear-to-b from-blue-50 to-white rounded-lg shadow-lg text-center space-y-6">
            <div className="mb-4">
            {/* logo */}
            <Logo className="w-13 h-5"/>

            <p className="text-xs text-gray-500">Generate production-ready UI designs using AI</p>
            </div>
            {/* Message */}
            <p className="text-gray-800 text-sm sm:text-base font-medium">
                Login Detected Successfully ✅
            </p>

            {/* Illustration / Icon */}
            <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full">
            <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>

            </div>


            {/* small note */}
            <p className="text-gray-400 text-[10px] sm:text-xs">
            Full access to our software activated !
            </p>
        </div>
    )
}
