import React from 'react'

export default function Button(
    {onClick, loading, text, loadingText, className} 
    : 
    {onClick: () => void, loading: boolean, text: string, loadingText?: string, className?: string}) {
  return (
    <button
              onClick={onClick}
              disabled={loading}
              className={`w-full p-3 rounded-md text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500/50
              ${
                loading
                  ? "bg-[linear-gradient(90deg,#020617,#000)] opacity-40 cursor-not-allowed"
                  : `
                    cursor-pointer
                    bg-[linear-gradient(90deg,#020617,#1e3a8a,#020617)]
                    bg-[length:200%_100%]
                    bg-[position:100%_50%]
                    hover:bg-[position:0%_50%]
                    transition-[background-position]
                    duration-500
                    ease-in-out
                  `
                }
                ${className}
                `
            }
            >
              {loading ? loadingText ?? "Processing..." : text}
    </button>
  )
}
