import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Play } from 'lucide-react'

function CourseCard({ course }) {
  const [studentCount, setStudentCount] = useState(0)
  const userEmail = localStorage.getItem('userEmail')
  const countKey = `studentCount_${userEmail}_${course.id}`

  useEffect(() => {
    if (!userEmail) {
      setStudentCount(0)
      return
    }
    const stored = localStorage.getItem(countKey)
    setStudentCount(stored ? Number(stored) : 0)
  }, [countKey, userEmail])

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            {course.category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{course.instructor}</p>
        <div className="mt-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-900">{course.rating}</span>
          <span className="text-sm text-gray-400">({studentCount.toLocaleString()} students)</span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{'₹'}{course.price}</span>
          <Link
            to={`/course/${course.id}`}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Course
          </Link>
        </div>
        <div className="mt-3">
          <Link
            to={`/quiz/${course.category.toLowerCase().replace(' ', '-')}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <Play className="h-4 w-4" />
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
