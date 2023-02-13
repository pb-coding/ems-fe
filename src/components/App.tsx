import React from 'react'
import { Routes, Route } from 'react-router-dom'
import '../index.css'
import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import customTheme from '../theme'

const theme = extendTheme({ cssVarPrefix: 'demo' });

function App() {
  const queryClient = new QueryClient();

  return (
    <CssVarsProvider theme={customTheme.emsTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute access="isAuthenticated"><Dashboard page="home" /></ProtectedRoute>} />
            <Route path="/enphase-auth" element={<ProtectedRoute access="isAuthenticated"><Dashboard page="enphase-auth" /></ProtectedRoute>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CssVarsProvider>
  )
}

export default App;
