import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Clock, BarChart3 } from 'lucide-react'
import courses from '../data/courses.js'

function Dashboard() {
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail')
    if (!userEmail) {
      navigate('/login')
    }

    // Get enrolled courses from localStorage
    const loadEnrolledCourses = () => {
      const enrolledIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]')
      // Get course details from static courses + localStorage courses
      const allCourses = courses
      const enrolled = allCourses.filter(c => enrolledIds.includes(c.id))
      setEnrolledCourses(enrolled)
    }

    loadEnrolledCourses()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'enrolledCourses') {
        loadEnrolledCourses()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [navigate])
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Track your learning progress</p>
        </div>
        <Link
          to="/courses"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:mt-0"
        >
          Browse More Courses
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
            <p className="text-sm text-gray-500">Enrolled Courses</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
            <BarChart3 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(enrolledCourses.reduce((a, c) => a + c.progress, 0) / enrolledCourses.length)}%
            </p>
            <p className="text-sm text-gray-500">Average Progress</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">32h</p>
            <p className="text-sm text-gray-500">Hours Learned</p>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <h2 className="mt-10 text-lg font-semibold text-gray-900">My Courses</h2>
      <div className="mt-4 flex flex-col gap-4">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-24 w-full rounded-lg object-cover sm:w-36"
              crossOrigin="anonymous"
            />
            <div className="flex flex-1 flex-col gap-2">
              <Link to={`/course/${course.id}`} className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {course.title}
              </Link>
              <p className="text-sm text-gray-500">{course.instructor}</p>
              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
              </div>
            </div>
            <Link
              to={`/course/${course.id}`}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Continue
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
