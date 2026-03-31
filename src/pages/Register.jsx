import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, BookOpen } from 'lucide-react'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address'
    if (!form.password.trim()) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Must be at least 6 characters'
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Get existing users from LocalStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === form.email)
    if (emailExists) {
      setErrors({ email: 'Email already registered' })
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      createdAt: new Date().toISOString()
    }

    // Save to LocalStorage
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))

    // Also save user info for login session
    localStorage.setItem('userEmail', form.email)
    localStorage.setItem('userName', form.name)
    localStorage.setItem('isAdmin', 'false') // Ensure regular user

    // Dispatch auth change event
    window.dispatchEvent(new Event('auth-change'))

    // Dispatch user data change event
    window.dispatchEvent(new Event('user-data-change'))

    alert('Registration successful!')
  }

  const inputClass = (field) =>
    `w-full rounded-xl border ${errors[field] ? 'border-red-400' : 'border-gray-300'} bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20`

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="mt-1 text-sm text-gray-500">Start your learning journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass('name')} />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass('email')} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="At least 6 characters" className={`${inputClass('password')} !pr-11`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className={inputClass('confirmPassword')} />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
