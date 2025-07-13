import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = login(username, password)

    if (success) {
      navigate("/dashboard")
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  // Don't render if user is already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-mono flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <svg 
              className="w-16 h-16" 
              viewBox="0 0 64 64" 
              fill="none"
            >
              <rect 
                x="2" 
                y="2" 
                width="60" 
                height="60" 
                fill="currentColor" 
                stroke="#000" 
                strokeWidth="4"
                className="text-black dark:text-gray-100"
              />
              <rect 
                x="2" 
                y="2" 
                width="60" 
                height="60" 
                stroke="currentColor" 
                strokeWidth="4"
                className="text-black dark:text-gray-300"
                fill="none"
              />
              <rect 
                x="24" 
                y="24" 
                width="16" 
                height="16" 
                fill="currentColor"
                className="text-gray-50 dark:text-black"
                transform="rotate(45 32 32)"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-black text-black dark:text-gray-100 uppercase tracking-wider text-center mb-2">
            SIMPEN
          </h1>
          <p className="text-xs text-black dark:text-gray-300 uppercase tracking-wide text-center font-bold">
            SISTEM MANAJEMEN PENGGUNA
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className="h-1 w-16 bg-black dark:bg-gray-300"></div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 border-4 border-black dark:border-gray-300 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#9ca3af]">
          
          <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-6 py-4 border-b-4 border-black dark:border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-50 dark:bg-gray-100 transform rotate-45"></div>
              <h2 className="text-sm font-black uppercase tracking-wide">MASUK AKUN</h2>
              <div className="h-px bg-gray-50 dark:bg-gray-300 flex-1"></div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-xs font-black text-black dark:text-gray-100 uppercase tracking-wide mb-2">
                  USERNAME
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-gray-300 text-black dark:text-gray-100 font-bold text-sm uppercase tracking-wide focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 focus:shadow-[2px_2px_0px_0px_#000000] dark:focus:shadow-[2px_2px_0px_0px_#9ca3af] transition-shadow"
                  placeholder="MASUKKAN USERNAME"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-black dark:text-gray-100 uppercase tracking-wide mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-gray-300 text-black dark:text-gray-100 font-bold text-sm uppercase tracking-wide focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 focus:shadow-[2px_2px_0px_0px_#000000] dark:focus:shadow-[2px_2px_0px_0px_#9ca3af] transition-shadow"
                  placeholder="MASUKKAN PASSWORD"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 text-red-700 dark:text-red-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 transform rotate-45"></div>
                    <span className="text-xs font-bold uppercase tracking-wide">{error}</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-400 dark:border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 transform rotate-45"></div>
                  <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wide">DEMO AKUN</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300 font-bold">
                  USERNAME: <span className="text-black dark:text-gray-100">admin</span><br/>
                  PASSWORD: <span className="text-black dark:text-gray-100">password123</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 border-2 border-black dark:border-gray-300 font-black text-sm uppercase tracking-wide hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_#9ca3af] dark:shadow-[4px_4px_0px_0px_#374151] hover:shadow-[2px_2px_0px_0px_#9ca3af] dark:hover:shadow-[2px_2px_0px_0px_#374151] active:shadow-none transform active:translate-x-1 active:translate-y-1 transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    MASUK...
                  </div>
                ) : (
                  "MASUK SISTEM"
                )}
              </button>
              
            </form>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
          <div className="w-2 h-2 bg-black dark:bg-gray-300 transform rotate-45"></div>
          <div className="w-2 h-2 bg-black dark:bg-gray-300 transform rotate-45"></div>
          <div className="w-2 h-2 bg-black dark:bg-gray-300 transform rotate-45"></div>
          <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
        </div>
      </div>
    </div>
  )
}
