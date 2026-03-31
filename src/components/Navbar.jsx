import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, BookOpen, ChevronDown, User, LogOut, Edit } from 'lucide-react'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  // Reusable function to update navbar based on localStorage
  const updateNavbar = () => {
    const email = localStorage.getItem('userEmail')
    const name = localStorage.getItem('userName')
    const admin = localStorage.getItem('isAdmin')
    if (email && name) {
      setIsLoggedIn(true)
      setUserName(name)
    } else {
      setIsLoggedIn(false)
      setUserName('')
    }
    setIsAdmin(admin === 'true')
  }

  useEffect(() => {
    // Check login state on component mount
    updateNavbar()

    // Add DOMContentLoaded event listener to check login state on every page load
    const handleDOMContentLoaded = () => {
      updateNavbar()
    }

    // Add storage event listener to handle changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'userEmail' || e.key === 'userName' || e.key === 'isAdmin') {
        updateNavbar()
      }
    }

    // Custom event listener for auth changes (login/logout in same tab)
    const handleAuthChange = () => {
      updateNavbar()
    }

    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    } else {
      // DOM is already loaded, just check login state
      handleDOMContentLoaded()
    }

    // Add storage listener for cross-tab synchronization
    window.addEventListener('storage', handleStorageChange)

    // Add custom event listener for auth changes
    window.addEventListener('auth-change', handleAuthChange)

    // Cleanup event listeners
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('completedCourses')
    // Clear quiz completion data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('quizCompleted_')) {
        localStorage.removeItem(key)
      }
    })
    setIsLoggedIn(false)
    setUserName('')
    setIsAdmin(false)
    setProfileOpen(false)
    // Dispatch auth-change event to update navbar immediately
    window.dispatchEvent(new Event('auth-change'))
    navigate('/')
  }

  // Navigation links based on user role
  const navLinks = isAdmin ? [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/dashboard', label: 'Dashboard' },

    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ] : [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">LearnHub</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
                  aria-label="Profile menu"
                  title="Profile"
                >
                  <User className="h-5 w-5" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                    </div>
                    <Link
                      to="/edit-profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/edit-profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>

              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-3 border-t border-gray-100 pt-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{userName}</span>
                </div>
                <Link
                  to="/edit-profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/edit-profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
