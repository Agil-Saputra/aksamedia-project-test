import { useState } from "react"
import { useAuth } from "../context/auth-context"
import AdminLayout from "../layout/admin-layout"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [fullName, setFullName] = useState(user?.fullName || "")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      updateUser({ fullName })
      setMessage("Profil berhasil diperbarui!")
    } catch (error) {
      setMessage("Gagal memperbarui profil")
    } finally {
      setIsLoading(false)
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000)
  }

  const isFormValid = fullName.trim().length > 0

  return (
    <AdminLayout>
      <div className="font-mono max-w-2xl">
        <div className="mb-10">
          <div className="relative mb-6">
            <h1 className="text-4xl font-black text-black dark:text-gray-100 uppercase tracking-tight mb-2">
              PROFIL
            </h1>
            <div className="h-1 w-20 bg-black dark:bg-gray-300"></div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-black dark:border-gray-300 p-4">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Perbarui informasi pribadi Anda
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 relative">
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-black dark:border-t-gray-300"></div>
          
          {/* Header Section */}
          <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-6 py-4 border-b-2 border-black dark:border-gray-300">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-gray-50 dark:bg-gray-100 transform rotate-45"></div>
              <h2 className="text-xl font-black uppercase tracking-wide">EDIT PROFIL</h2>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Username Field - Read Only */}
            <div>
              <label className="block text-sm font-black text-black dark:text-white uppercase tracking-wide mb-3">
                NAMA PENGGUNA
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user?.username || ""}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium cursor-not-allowed"
                />
              </div>
              <div className="mt-2 bg-yellow-100 dark:bg-yellow-900 border-l-2 border-yellow-500 pl-3 py-1">
                <p className="text-xs font-bold text-yellow-800 dark:text-yellow-200 uppercase">
                  TIDAK DAPAT DIUBAH
                </p>
              </div>
            </div>

            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">
                NAMA LENGKAP *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-gray-500"
                  placeholder="MASUKKAN NAMA LENGKAP ANDA"
                />
              </div>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`border-2 p-4 ${
                message.includes("berhasil")
                  ? "bg-green-50 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200"
                  : "bg-red-50 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 transform rotate-45 ${
                    message.includes("berhasil") ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className="font-bold text-sm uppercase">{message}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="px-8 py-3 bg-blue-600 border-2 border-blue-800 text-gray-50 font-black uppercase tracking-wide hover:bg-blue-700 disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed transition-colors shadow-[4px_4px_0px_0px_#1e40af] disabled:shadow-none"
              >
                {isLoading ? "MEMPERBARUI..." : "PERBARUI PROFIL"}
              </button>
            </div>
          </form>

          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black dark:bg-gray-300"></div>
        </div>
      </div>
    </AdminLayout>
  )
}
