import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import { useTheme } from "../context/theme-context"
import ThemeDropdown from "./theme-dropdown"
import UserDropdown from "./user-dropdown"

export default function Navbar({ isMobile, onToggleSidebar, isSidebarOpen }) {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const themeDropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setIsThemeDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/users", label: "Users" }
  ]

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b-4 border-black dark:border-gray-300 sticky top-0 z-40 font-mono">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between lg:justify-end h-14 sm:h-16">
          
          {isMobile && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onToggleSidebar}
                className="p-2 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5 text-black dark:text-gray-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-gray-100 dark:bg-gray-800 dark:border-gray-300">
              <ThemeDropdown
                theme={theme}
                setTheme={setTheme}
                isOpen={isThemeDropdownOpen}
                setIsOpen={setIsThemeDropdownOpen}
                dropdownRef={themeDropdownRef}
              />
            </div>
            
            <div className="relative">
              <UserDropdown
                user={user}
                onLogout={handleLogout}
                isOpen={isUserDropdownOpen}
                setIsOpen={setIsUserDropdownOpen}
                dropdownRef={userDropdownRef}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
