import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import CourseCard from '../components/CourseCard.jsx'
import { getCourses } from '../admin/utils.js'
import staticCourses from '../data/courses.js'

function Courses() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [allCourses, setAllCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateCourses = () => {
      try {
        // Combine static courses with LocalStorage courses
        const localCourses = getCourses()
        const combined = [...staticCourses, ...localCourses]
        setAllCourses(combined)
      } catch (error) {
        console.error('Error loading courses:', error)
        // Fallback to static courses only
        setAllCourses(staticCourses)
      } finally {
        setLoading(false)
      }
    }

    updateCourses()

    // Listen for storage changes to update courses in real-time
    const handleStorageChange = (e) => {
      if (e.key === 'courses') {
        updateCourses()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const safeCourses = Array.isArray(allCourses) ? allCourses : []

  const allCategories = ['All', ...new Set(safeCourses.map((c) => c.category))]

  const filtered = safeCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Header */}
      <section className="bg-gray-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Explore Our Courses</h1>
          <p className="mt-3 text-gray-400">
            Find the perfect course to advance your skills and career.
          </p>
          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="mt-6 text-sm text-gray-500">
          Showing {filtered.length} {filtered.length === 1 ? 'course' : 'courses'}
        </p>

        {/* Course Grid */}
        {loading ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Loading courses...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center text-center">
            <Search className="h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Courses
