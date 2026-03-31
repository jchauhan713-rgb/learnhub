import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react'

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address'
    if (!form.password.trim()) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    // Admin credentials (you can change these)
    const ADMIN_EMAIL = 'admin@learnhub.com'
    const ADMIN_PASSWORD = 'admin123'

    setTimeout(() => {
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        // Set admin session
        localStorage.setItem('adminEmail', form.email)
        localStorage.setItem('adminName', 'Admin')
        localStorage.setItem('isAdmin', 'true')

        // Dispatch auth change event
        window.dispatchEvent(new Event('auth-change'))

        navigate('/admin-dashboard')
      } else {
        setErrors({ general: 'Invalid admin credentials' })
      }
      setIsLoading(false)
    }, 1000)
  }

  const inputClass = (field) =>
    `w-full rounded-xl border ${errors[field] ? 'border-red-400' : 'border-gray-300'} bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20`

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="mt-1 text-sm text-gray-500">Access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {errors.general && (
              <div className="rounded-lg bg-red-50 p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@learnhub.com"
                  className={inputClass('email')}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
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
                  placeholder="Enter admin password"
                  className={`${inputClass('password')} !pr-11`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                'Sign In as Admin'
              )}
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-xs text-blue-700">
              <strong>Demo Credentials:</strong><br />
              Email: admin@learnhub.com<br />
              Password: admin123
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            <a href="/" className="font-medium text-blue-600 hover:text-blue-700">← Back to LearnHub</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
