import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, PlusCircle, BarChart3, ArrowRight } from 'lucide-react'
import { getCourses, getUsers } from './utils'
import courses from '../data/courses.js'

function AdminDashboard() {
  const [coursesCount, setCoursesCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      const localCourses = getCourses()
      const totalCourses = courses.length + localCourses.length
      const users = getUsers()
      setCoursesCount(totalCourses)
      setUsersCount(users.length)
    }

    updateCounts()

    const handleStorageChange = (e) => {
      if (e.key === 'courses' || e.key === 'users') {
        updateCounts()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const statsCards = [
    {
      title: 'Total Courses',
      count: coursesCount,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/admin/courses',
    },
    {
      title: 'Total Users',
      count: usersCount,
      icon: Users,
      color: 'bg-green-500',
      link: '/admin/users',
    },
  ]

  const quickActions = [
    {
      title: 'Add New Course',
      description: 'Create a new course for students',
      icon: PlusCircle,
      link: '/admin/add-course',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Manage Courses',
      description: 'View and edit existing courses',
      icon: BookOpen,
      link: '/admin/courses',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
    {
      title: 'Manage Users',
      description: 'View and manage registered users',
      icon: Users,
      link: '/admin/users',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's an overview of your platform.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <Link
              to={stat.link}
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`p-5 rounded-xl text-white transition-all duration-200 shadow-sm hover:shadow-md ${action.color}`}
            >
              <div className="flex items-center gap-4">
                <action.icon className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Manage Your Platform</h2>
            <p className="text-blue-100 mt-2">
              Use the sidebar to navigate between different sections. You can add courses, manage users, and view platform statistics.
            </p>
          </div>
          <BarChart3 className="h-16 w-16 text-blue-400 hidden md:block" />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
