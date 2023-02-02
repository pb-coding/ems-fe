import React from 'react'
import { Routes, Route } from 'react-router-dom'
import '../index.css'
import Dashboard from './Dashboard'
import Login from './Login'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import customTheme from '../theme'

const theme = extendTheme({ cssVarPrefix: 'demo' });

function App() {
  

  return (
    <CssVarsProvider theme={customTheme.emsTheme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute access="isAuthenticated"><Dashboard page="home" /></ProtectedRoute>} />
          <Route path="/solar" element={<ProtectedRoute access="isAuthenticated"><Dashboard page="solar" /></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </CssVarsProvider>
  )
}

export default App;
