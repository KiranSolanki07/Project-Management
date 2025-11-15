import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useProfile } from '../hooks/useProfile'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { profile, loading } = useProfile()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p className="text-gray-700 mb-6">
          Welcome, {profile?.full_name || 'User'}
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
