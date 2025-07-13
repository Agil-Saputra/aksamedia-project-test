import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system"
    }
    return "system"
  })
  
  const [resolvedTheme, setResolvedTheme] = useState("light")

  // Handle theme resolution (system theme detection)
  useEffect(() => {
    const resolveTheme = () => {
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        return prefersDark ? "dark" : "light"
      }
      return theme
    }

    const updateResolvedTheme = () => {
      setResolvedTheme(resolveTheme())
    }

    // Set initial resolved theme
    updateResolvedTheme()

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", updateResolvedTheme)
      
      return () => {
        mediaQuery.removeEventListener("change", updateResolvedTheme)
      }
    }
  }, [theme])

  useEffect(() => {
    const applyThemeToDOM = () => {
      const root = document.documentElement
      const body = document.body
      
      root.classList.remove("dark", "light")
      body.classList.remove("dark", "light")      
      root.classList.add(resolvedTheme)
      body.classList.add(resolvedTheme)
      root.setAttribute("data-theme", resolvedTheme)
      root.style.colorScheme = resolvedTheme
    }

    applyThemeToDOM()
  }, [resolvedTheme])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  const contextValue = {
    theme,
    setTheme: changeTheme,
    resolvedTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}
