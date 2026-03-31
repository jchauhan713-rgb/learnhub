import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, CheckCircle, AlertCircle } from 'lucide-react'
import { getCourses, updateCourse } from './utils'

function EditCourse() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  })
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const courses = getCourses()
    const course = courses.find(c => c.id === id)
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price.toString(),
        image: course.image || ''
      })
    } else {
      navigate('/admin/courses')
    }
    setLoading(false)
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required'
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price'
    }

    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const updatedCourse = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      image: formData.image.trim() || ''
    }

    updateCourse(id, updatedCourse)
    setShowSuccess(true)

    // Redirect after success
    setTimeout(() => {
      navigate('/admin/courses')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">Course updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/courses')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-sm text-gray-500 mt-1">Update course information</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Enter course title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Course Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.description ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Enter course description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.price ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.price}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.image ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.image}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">Leave empty to use default course icon</p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="h-5 w-5" />
            Update Course
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCourse
