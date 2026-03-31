import { useState } from 'react'
import { Camera, Save } from 'lucide-react'

function EditProfile() {
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate learner and aspiring developer. Currently taking courses in web development and data science.',
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
      <p className="mt-1 text-sm text-gray-500">Update your personal information</p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
              {form.name.charAt(0).toUpperCase()}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700"
              aria-label="Change profile picture"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">Click the camera icon to upload a photo </p>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {/* Name */}
          <div>
            <label htmlFor="profileName" className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="profileName"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="profileEmail" className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="profileEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="profileBio" className="mb-1.5 block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="profileBio"
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>

          {saved && (
            <p className="text-center text-sm font-medium text-green-600">
              Profile updated successfully! 
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditProfile
