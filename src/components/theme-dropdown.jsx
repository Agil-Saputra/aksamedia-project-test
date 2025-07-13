export default function ThemeDropdown({ theme, setTheme, isOpen, setIsOpen, dropdownRef }) {
  const themeOptions = [
    { value: "light", label: "TERANG", icon: "☀️", desc: "TEMA TERANG" },
    { value: "dark", label: "GELAP", icon: "🌙", desc: "TEMA GELAP" },
    { value: "system", label: "SISTEM", icon: "💻", desc: "IKUTI SISTEM" },
  ]

  const getCurrentIcon = () => {
    const option = themeOptions.find(opt => opt.value === theme)
    return option ? option.icon : "💻"
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px] bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-base sm:text-lg font-bold"
        title="UBAH TEMA"
      >
        {getCurrentIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 shadow-[2px_2px_0px_0px_#000000] sm:shadow-[4px_4px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#9ca3af] dark:sm:shadow-[4px_4px_0px_0px_#9ca3af] z-50">
          {/* Header */}
          <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-3 py-2 border-b-2 border-black dark:border-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-50 dark:bg-gray-100 transform rotate-45"></div>
              <span className="text-xs font-black uppercase tracking-wide">TEMA</span>
            </div>
          </div>

          {/* Options */}
          <div className="p-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`w-full text-left px-3 py-3 border-2 mb-1 last:mb-0 transition-all duration-200 flex items-center space-x-3 ${
                  theme === option.value 
                    ? "bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 border-black dark:border-gray-300" 
                    : "bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black dark:hover:border-gray-300"
                }`}
              >
                <span className="text-base font-bold">
                  {option.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-black text-xs uppercase tracking-wide">{option.label}</span>
                  <span className="text-xs font-medium opacity-70 uppercase">{option.desc}</span>
                </div>
                <div className="ml-auto">
                  <div className={`w-2 h-2 transform rotate-45 ${
                    theme === option.value 
                      ? "bg-gray-50 dark:bg-gray-100" 
                      : "bg-black dark:bg-gray-100"
                  }`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
