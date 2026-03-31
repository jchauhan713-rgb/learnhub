import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true'
    if (!adminStatus) {
      navigate('/admin-login')
    } else {
      setIsAdmin(true)
    }
  }, [navigate])

  if (!isAdmin) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Welcome to the admin panel.</p>
    </div>
  )
}

export default AdminDashboard
