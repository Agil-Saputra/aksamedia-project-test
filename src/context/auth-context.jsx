import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "password123",
}

const DEFAULT_USER = {
  id: "1",
  username: "admin",
  fullName: "Administrator",
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("auth_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const savedProfile = localStorage.getItem("user_profile")
      let userData = DEFAULT_USER

      if (savedProfile) {
        try {
          userData = { ...DEFAULT_USER, ...JSON.parse(savedProfile) }
        } catch (error) {
          userData = DEFAULT_USER
        }
      }

      setUser(userData)
      localStorage.setItem("auth_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  const updateUser = (newData) => {
    if (user) {
      const updatedUser = { ...user, ...newData }
      setUser(updatedUser)
      localStorage.setItem("auth_user", JSON.stringify(updatedUser))
      localStorage.setItem("user_profile", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
