import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout.jsx'
import AdminLayout from '../layout/AdminLayout.jsx'
import Home from '../pages/Home.jsx'
import Courses from '../pages/Courses.jsx'
import CourseDetails from '../pages/CourseDetails.jsx'
import Quiz from '../pages/Quiz.jsx'
import Payment from '../pages/Payment.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import AdminLogin from '../pages/AdminLogin.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import EditProfile from '../pages/EditProfile.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import AdminDashboard from '../admin/AdminDashboard.jsx'
import ManageCourses from '../admin/ManageCourses.jsx'
import AddCourse from '../admin/AddCourse.jsx'
import EditCourse from '../admin/EditCourse.jsx'
import ManageUsers from '../admin/ManageUsers.jsx'

function AppRouter() {
  // Use state to track admin status - this will re-render when auth changes
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true')

  useEffect(() => {
    // Listen for auth changes
    const handleAuthChange = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true')
    }

    window.addEventListener('auth-change', handleAuthChange)
    
    // Also check periodically in case of direct localStorage changes
    const interval = setInterval(() => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true')
    }, 500)

    return () => {
      window.removeEventListener('auth-change', handleAuthChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/quiz/:subject" element={<Quiz />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      {isAdmin ? (
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        </Route>
      ) : (
        <Route path="/admin/*" element={<AdminLogin />} />
      )}
    </Routes>
  )
}

export default AppRouter
