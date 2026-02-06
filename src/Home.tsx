import { useEffect, useState } from "react"
import Logo from "./components/Logo"
import SignUp from "./SignUp"
import Button from "./components/Button"
import LoginSuccess from "./LoginSuccess"

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
  const [success, setSuccess] = useState<string | null>(null)

  const [quotaExceeded, setQuotaExceeded] = useState(false)
  const [quotaMessage, setQuotaMessage] = useState("")
  const [quotaDeviceID, setQuotaDeviceID] = useState<string | null>(null)
  
  const handleGenerate = () => {
    console.log("Before")
    if (!prompt.trim()) return
    console.log("After")
    setLoading(true)

    parent.postMessage(
      { pluginMessage: { type: "generate-design", payload: {prompt, style, platform }} },
      "*"
    )
  }

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const msg = event.data.pluginMessage
      if(!msg) return

      if(msg.finished){
        setLoading(false)
      }
    }

    window.addEventListener("message", handleMessage)
    
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(()=>{
    const handleSignUp = (event: MessageEvent) => {
      const msg = event.data.pluginMessage
      if(!msg) return

      if(msg.type === "quota_exceeded"){
        setQuotaExceeded(true)
        setQuotaMessage(msg.message)
        setQuotaDeviceID(msg.deviceId)
        console.log("HOME PAGE: ", quotaDeviceID)
      }
    }

    window.addEventListener("message", handleSignUp)
    return () => window.removeEventListener("message", handleSignUp)
  },[])

  useEffect(() => {
    const handleLoginSuccess = (event: MessageEvent) => {
      const msg = event.data?.pluginMessage
      if (msg?.type === "login_success") {
        setQuotaExceeded(false)
        setQuotaMessage("")
      }
    }

    window.addEventListener("message", handleLoginSuccess)
    return () => window.removeEventListener("message", handleLoginSuccess)
  }, [])
useEffect(() => {
    const handleSuccessLogin = async (event: MessageEvent) => {
        const msg = event.data.pluginMessage
        if(msg.type === 'login_success'){
            setSuccess("Login Detected successfully!")
            setTimeout(()=>{
                setSuccess(null)
            }, 5000)
        }
    }
    window.addEventListener("message", handleSuccessLogin)

    return () => window.removeEventListener("message", handleSuccessLogin)
  }, [])

    return success ? <LoginSuccess />
    :
    <div className=" p-4 flex flex-col text-gray-900">
      
      {/* Header */}
      <div className="mb-4">

        {/* logo */}
        <Logo className="w-13 h-5"/>

        <p className="text-xs text-gray-500">Generate production-ready UI designs using AI</p>
      </div>

       {/* Options */}
       {
        !quotaExceeded ? (
          <div>
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
              <label className="block text-xs font-medium bg-clip-text text-transparent bg-linear-to-r from-green-400 via-green-900 to-green-400 mb-1">Describe your design</label>
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
            <Button
              onClick={handleGenerate}
              text="Generate Design"
              loading={loading}
              loadingText="Generating Design..."
            />

            {/* Footer */}
            <p className="mt-2 text-[10px] text-gray-400 text-center">
              Generated designs are editable Figma layers
            </p>



          </div>
        ) : (
          <div>
            <SignUp message={quotaMessage} deviceId={quotaDeviceID}/>
          </div>
        )
       }
    </div>
}
