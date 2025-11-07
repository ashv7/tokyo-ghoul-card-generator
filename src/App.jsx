import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Collection from './pages/Collection'
import Profile from './pages/Profile'
import Missions from './pages/Missions'
import Shop from './pages/Shop'
import Battle from './pages/Battle'
import Ranking from './pages/Ranking'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider, useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-ghoul-red">Chargement...</div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-tokyo-gradient flex flex-col">
        <Navbar />
        <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/generator" 
            element={
              <ProtectedRoute>
                <Generator />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/collection" 
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/missions" 
            element={
              <ProtectedRoute>
                <Missions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/battle" 
            element={
              <ProtectedRoute>
                <Battle />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ranking" 
            element={
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            } 
          />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
