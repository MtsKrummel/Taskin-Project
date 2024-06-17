import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import { WorkspaceProvider } from "./context/WorkSpace.jsx"
import HomePage from "./pages/HomePage.jsx"

import ProtectedRoute from './ProtectedRoute.jsx'

function App(){
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </AuthProvider>
  )
}

export default App