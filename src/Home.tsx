import { useState } from "react"

const EXAMPLES = [
  "Modern login screen with gradient button",
  "Dashboard with sidebar, charts and stats cards",
  "Mobile onboarding screens with illustrations",
  "Pricing page with three plans and toggle",
]

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("Modern")
  const [platform, setPlatform] = useState("Web")
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setLoading(true)

    setTimeout(()=>{
        parent.postMessage(
          { pluginMessage: { type: "generate-design", payload: {prompt, style, platform }} },
          "*"
        )

        setLoading(false)
    }, 8000)
  }

  return (
    <div className=" p-4 flex flex-col text-gray-900">
      
      {/* Header */}
      <div className="mb-4">
        {/* logo */}
        <h1 className="text-sm font-semibold flex items-center gap-1">
        <span className="bg-linear-to-r from-red-500 via-yellow-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
            wuxma
        </span>
        <span className="text-blue-500 font-semibold">
            AI
        </span>
        </h1>

        <p className="text-xs text-gray-500">Generate production-ready UI designs using AI</p>
      </div>

       {/* Options */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full h-8 rounded-md border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option>Modern</option>
            <option>Minimal</option>
            <option>Bold</option>
            <option>Professional</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1 cursor-pointer">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full h-8 rounded-md border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option className="cursor-pointer">Web</option>
            <option className="cursor-pointer">Mobile</option>
            <option className="cursor-pointer">Dashboard</option>
            <option className="cursor-pointer">Landing Page</option>
          </select>
        </div>
      </div>

      {/* Prompt */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-blue-600 mb-1">Describe your design</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A modern SaaS dashboard with analytics, dark sidebar, and gradient CTA"
          rows={5}
          className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Examples */}
      <div className="mb-4">
        <p className="mb-1 text-xs font-medium text-gray-600">Try an example</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="cursor-pointer px-2 py-1 rounded-md border border-gray-200 text-xs hover:bg-gray-100 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>


      {/* Action */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full p-3  rounded-md text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${loading ? "bg-gradient-to-r from-red-800 via-yellow-800 via-blue-800 to-pink-800 opacity-40 cursor-not-allowed" : "cursor-pointer bg-gradient-to-r from-red-500 via-yellow-400 via-blue-500 to-pink-500 hover:brightness-110"}`}
      >
        {loading ? "Generating Design…" : "Generate Design"}
      </button>

      {/* Footer */}
      <p className="mt-2 text-[10px] text-gray-400 text-center">
        Generated designs are editable Figma layers
      </p>
    </div>
  )
}
