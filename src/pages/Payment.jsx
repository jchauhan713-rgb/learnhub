import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle } from 'lucide-react'
import courses from '../data/courses.js'

function Payment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find((c) => c.id === Number(id))
  const [method, setMethod] = useState('card')
  const [submitted, setSubmitted] = useState(false)

  const [cardForm, setCardForm] = useState({ name: '', number: '', expiry: '', cvv: '' })

  // Save enrolled course to localStorage
  const saveEnrolledCourse = (courseId) => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]')
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId)
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses))
    }
  }

  if (!course) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
        <Link to="/courses" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
          Back to Courses
        </Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-gray-500">You have been enrolled in {course.title}.</p>
        <Link
          to="/dashboard"
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    )
  }

  const methods = [
    { id: 'card', label: 'Credit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'paypal', label: 'PayPal', icon: Wallet },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Complete Your Enrollment</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Payment Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>

            {/* Method Tabs */}
            <div className="mt-4 flex gap-3">
              {methods.map((m) => {
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                      method === m.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{m.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Card Form */}
            {method === 'card' && (
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <label htmlFor="cardName" className="mb-1.5 block text-sm font-medium text-gray-700">Cardholder Name</label>
                  <input
                    id="cardName"
                    type="text"
                    value={cardForm.name}
                    onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="mb-1.5 block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardForm.number}
                    onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="mb-1.5 block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      id="expiry"
                      type="text"
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="mb-1.5 block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      id="cvv"
                      type="text"
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      placeholder="123"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === 'upi' && (
              <div className="mt-6">
                <label htmlFor="upiId" className="mb-1.5 block text-sm font-medium text-gray-700">UPI ID</label>
                <input
                  id="upiId"
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            {method === 'paypal' && (
              <div className="mt-6">
                <label htmlFor="paypalEmail" className="mb-1.5 block text-sm font-medium text-gray-700">PayPal Email</label>
                <input
                  id="paypalEmail"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            <button
              onClick={() => {
                saveEnrolledCourse(course.id)
                setSubmitted(true)
              }}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {'Confirm Payment - ₹'}{course.price}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            <div className="mt-4">
              <img
                src={course.image}
                alt={course.title}
                className="w-full rounded-lg object-cover"
                crossOrigin="anonymous"
              />
              <h3 className="mt-4 font-semibold text-gray-900">{course.title}</h3>
              <p className="mt-1 text-sm text-gray-500">by {course.instructor}</p>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Course Price</span>
                <span className="text-gray-900">{'₹'}{course.price}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Platform Fee</span>
                <span className="text-gray-900">{'₹0.00'}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">{'₹'}{course.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
