import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Edit, Trash2, Search, BookOpen, X, CheckCircle, AlertCircle } from 'lucide-react'
import { getCourses, deleteCourse } from './utils'
import staticCourses from '../data/courses.js'

function ManageCourses() {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isLocalCourse, setIsLocalCourse] = useState(false)

  useEffect(() => {
    loadCourses()

    // Listen for course data changes (e.g., when courses are added)
    const handleCourseDataChange = () => {
      loadCourses()
    }

    window.addEventListener('course-data-change', handleCourseDataChange)
    return () => window.removeEventListener('course-data-change', handleCourseDataChange)
  }, [])

  const loadCourses = () => {
    // Combine static courses with admin-added courses
    const localCourses = getCourses()
    const allCourses = [
      ...staticCourses.map(c => ({ ...c, isStatic: true })),
      ...localCourses.map(c => ({ ...c, isStatic: false }))
    ]
    setCourses(allCourses)
  }

  const handleDeleteClick = (course) => {
    setCourseToDelete(course)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete.id)
      loadCourses()
      setShowDeleteModal(false)
      setCourseToDelete(null)
      showSuccessMessage('Course deleted successfully!')
    }
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
          <p className="text-sm text-gray-500 mt-1">View, edit, and delete courses</p>
        </div>
        <Link
          to="/admin/add-course"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Course
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No courses found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first course'}
            </p>
            {!searchTerm && (
              <Link
                to="/admin/add-course"
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <PlusCircle className="h-5 w-5" />
                Add Course
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                        {course.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ${course.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/edit-course/${course.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit course"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete course"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Course</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{courseToDelete?.title}</span>? This will permanently remove the course from your platform.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCourses
