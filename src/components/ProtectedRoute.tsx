import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

interface ProtectedRouteProps {
  element: ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session)
      setIsLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    )
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />
}

export default ProtectedRoute
