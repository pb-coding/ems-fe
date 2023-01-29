import React from 'react'
import { Routes, Route } from 'react-router-dom'
import '../index.css'
import Dashboard from './Dashboard'
import Login from './Login'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'

function App() {
  

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute access="isAuthenticated"><Dashboard/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
