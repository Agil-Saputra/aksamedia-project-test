import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/auth-context"
import { ThemeProvider } from "./context/theme-context"
import ProtectedRoute from "./components/protected-route"
import LoginPage from "./pages/login"
import DashboardPage from "./pages/dashboard"
import UsersPage from "./pages/users"
import ProfilePage from "./pages/profile"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
