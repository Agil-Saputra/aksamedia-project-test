import { Link } from "react-router-dom"

export default function UserDropdown({ user, onLogout, isOpen, setIsOpen, dropdownRef }) {
  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 sm:space-x-3 text-sm bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors p-1.5 sm:p-2 focus:outline-none"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 border-2 border-black dark:border-gray-300 flex items-center justify-center">
          <span className="text-gray-50 font-black text-xs">
            {user?.fullName?.charAt(0) || 'A'}
          </span>
        </div>
        
        <span className="hidden sm:block text-black dark:text-gray-100 font-bold text-xs uppercase tracking-wide">
          {user?.fullName?.split(' ')[0] || 'ADMIN'}
        </span>
        
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 text-black dark:text-gray-100 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 shadow-[2px_2px_0px_0px_#000000] sm:shadow-[4px_4px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#9ca3af] dark:sm:shadow-[4px_4px_0px_0px_#9ca3af] z-50">
          {/* Header */}
          <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-2 sm:px-3 py-2 border-b-2 border-black dark:border-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-50 dark:bg-gray-100 transform rotate-45"></div>
              <span className="text-xs font-black uppercase tracking-wide">AKUN</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-1.5 sm:p-2">
            <Link
              to="/profile"
              className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-3 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black dark:hover:border-gray-300 transition-all duration-200 mb-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 border-2 border-black dark:border-gray-300 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-black text-xs uppercase tracking-wide">EDIT PROFIL</span>
                <span className="text-xs font-medium opacity-70 uppercase">PERBARUI INFO</span>
              </div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-gray-100 transform rotate-45"></div>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-3 border-2 border-red-400 bg-gray-50 dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-600 transition-all duration-200 w-full"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 border-2 border-red-800 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="flex flex-col text-left flex-1">
                <span className="font-black text-xs uppercase tracking-wide">KELUAR</span>
                <span className="text-xs font-medium opacity-70 uppercase">AKHIRI SESI</span>
              </div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 transform rotate-45"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
