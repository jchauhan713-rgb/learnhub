import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setSubmitted(true)
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
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              {submitted ? 'Check your email' : 'Forgot Password?'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {submitted
                ? `We've sent a password reset link to`
                : "No worries, we'll send you reset instructions."}
            </p>
            {submitted && (
              <p className="mt-1 text-sm font-medium text-gray-900">{email}</p>
            )}
          </div>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-6">
              {/* Success icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <p className="text-center text-sm text-gray-500">
                {"Didn't receive the email? Check your spam folder or"}
              </p>

              <button
                onClick={() => {
                  setSubmitted(false)
                  setEmail('')
                }}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Try another email address
              </button>

              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Log In
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="reset-email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      id="reset-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full rounded-xl border ${
                        error ? 'border-red-400' : 'border-gray-300'
                      } bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                  {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Log In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
