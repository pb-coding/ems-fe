import React from 'react'
import { Routes, Route } from 'react-router-dom'
import '../index.css'
import Dashboard from './Dashboard'
import Login from './Login'
import { CssVarsProvider } from '@mui/joy/styles';
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import emsTheme from '../theme'

function App() {
  

  return (
    <CssVarsProvider defaultMode='dark'>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute access="isAuthenticated"><Dashboard/></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </CssVarsProvider>
  )
}

export default App;
