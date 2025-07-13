import AdminLayout from "../layout/admin-layout"
import { useAuth } from "../context/auth-context"
import { useTheme } from "../context/theme-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const { theme } = useTheme()

  // Get total users count from localStorage
  const getTotalUsers = () => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      return users.length
    } catch {
      return 0
    }
  }

  const stats = [
    {
      title: "Total Pengguna",
      value: getTotalUsers(),
      icon: "👥",
      color: "blue"
    },
    {
      title: "Status",
      value: "Aktif",
      icon: "✓",
      color: "green"
    },
    {
      title: "Tema",
      value: theme === "system" ? "Sistem" : theme === "light" ? "Terang" : "Gelap",
      icon: "⚙️",
      color: "purple"
    }
  ]

  return (
    <AdminLayout>
      <div className="font-mono">
        <div className="mb-12">
          <div className="relative mb-6">
            <h1 className="text-4xl font-black text-black dark:text-gray-100 uppercase tracking-tight mb-2">
              DASHBOARD
            </h1>
            <div className="h-1 w-24 bg-black dark:bg-gray-300"></div>
          </div>
          
          {/* Welcome Message */}
          <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-black dark:border-gray-300 p-6">
            <h2 className="text-xl font-bold text-black dark:text-gray-100 mb-2">
              Selamat datang, {user?.fullName}!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Ini adalah Dashboard Anda. Buka bagian Pengguna untuk mengelola data pengguna.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-black dark:bg-gray-100 transform rotate-45"></div>
            <h3 className="text-lg font-black text-black dark:text-gray-100 uppercase tracking-wide">
              STATISTIK
            </h3>
            <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 relative group hover:shadow-[4px_4px_0px_0px_#000000] dark:hover:shadow-[4px_4px_0px_0px_#9ca3af] transition-shadow duration-200"
              >
                {/* Card Corner Accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-black dark:border-t-gray-300"></div>
                
                <div className="p-6">
                  {/* Icon Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-500 border-2 border-black dark:border-gray-300 flex items-center justify-center font-bold text-gray-50`}>
                      {stat.icon}
                    </div>
                    <div className="w-2 h-2 bg-black dark:bg-gray-100 transform rotate-45"></div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <dt className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      {stat.title}
                    </dt>
                    <dd className="text-2xl font-black text-black dark:text-gray-100">
                      {stat.value}
                    </dd>
                  </div>
                </div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
