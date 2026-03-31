import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react'

// Generate username from email
function generateUsernameFromEmail(email) {
  if (!email) return ''
  const username = email.split('@')[0]
  return username.charAt(0).toUpperCase() + username.slice(1)
}

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation - check if fields are not empty
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter email and password')
      return
    }

    // Store user email in localStorage (temporary authentication)
    const email = form.email.trim()
    localStorage.setItem('userEmail', email)

    // Generate and store username from email
    const username = generateUsernameFromEmail(email)
    localStorage.setItem('userName', username)

    // Admin login check
    if (email === 'admin@learnhub.com' && form.password === 'admin123') {
      localStorage.setItem('role', 'admin')
      localStorage.setItem('isAdmin', 'true')
      window.dispatchEvent(new Event('auth-change'))
      navigate('/admin')
      return
    }

    // Normal user login flow
    localStorage.setItem('role', 'user')
    localStorage.removeItem('isAdmin')
    window.dispatchEvent(new Event('auth-change'))
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Log in to your Learnhub account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border ${error ? 'border-red-400' : 'border-gray-300'} bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-xl border ${error ? 'border-red-400' : 'border-gray-300'} bg-gray-50 py-3 pl-10 pr-11 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            {"Don't have an account? "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
