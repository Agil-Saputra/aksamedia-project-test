import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isMobile = false, isOpen = false, onClose }) {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      title: "Pengguna",
      path: "/users",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      title: "Profil",
      path: "/profile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
      <div
        className={`fixed top-0 left-0 h-full bg-gray-50 dark:bg-gray-900 border-r-2 border-black dark:border-gray-300 transition-all duration-300 font-mono z-[99] ${
          isMobile 
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64` 
            : `w-64 translate-x-0`
        }`}
      >
        <div className="border-b-4 border-black dark:border-gray-300 p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black dark:bg-gray-100 border-2 border-black dark:border-gray-300 flex items-center justify-center">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-50 dark:bg-black transform rotate-45"></div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-black dark:text-gray-100 uppercase tracking-wide">
                SIMPEN
              </h1>
			  <p className="text-[8px] h-px">Sistem Manajemen Pengguna</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4">
          <div className="space-y-2 sm:space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border-2 transition-all duration-200 group ${
                  isActive(item.path)
                    ? "bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 border-black dark:border-gray-300 shadow-[2px_2px_0px_0px_#000000] sm:shadow-[4px_4px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#9ca3af] dark:sm:shadow-[4px_4px_0px_0px_#9ca3af]"
                    : "bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 border-black dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-[1px_1px_0px_0px_#000000] sm:hover:shadow-[2px_2px_0px_0px_#000000] dark:hover:shadow-[1px_1px_0px_0px_#9ca3af] dark:sm:hover:shadow-[2px_2px_0px_0px_#9ca3af]"
                }`}
                onClick={isMobile ? onClose : undefined}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">{item.title}</span>
                <div className="ml-auto">
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 transform rotate-45 ${
                    isActive(item.path) 
                      ? "bg-gray-50 dark:bg-black" 
                      : "bg-black dark:bg-gray-100"
                  }`}></div>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
  );
}
