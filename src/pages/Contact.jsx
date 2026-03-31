import { useState } from 'react'
import { Send, MapPin, Phone, Mail } from 'lucide-react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gray-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Get in Touch</h1>
          <p className="mt-3 text-gray-400">
            Have a question or feedback? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Reach out to us through any of the following channels or fill out the form.
            </p>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Address</h3>
                  <p className="mt-0.5 text-sm text-gray-500">123 Learning Street, San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Phone</h3>
                  <p className="mt-0.5 text-sm text-gray-500">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email</h3>
                  <p className="mt-0.5 text-sm text-gray-500">support@learnova.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="mt-2 text-sm text-gray-500">Thank you for reaching out. We will get back to you soon.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
                <div className="mt-6 flex flex-col gap-5">
                  <div>
                    <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
                    <input
                      id="contactName"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="contactEmail"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactMessage" className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
