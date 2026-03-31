import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Play,
  Users,
  Award,
  BookOpen,
  Code,
  Globe,
  BarChart3,
  Palette,
  Cpu,
  TrendingUp,
  Smartphone,
  Shield,
} from 'lucide-react'
import courses, { categories } from '../data/courses.js'
import CourseCard from '../components/CourseCard.jsx'

const iconMap = {
  code: Code,
  globe: Globe,
  'bar-chart': BarChart3,
  palette: Palette,
  cpu: Cpu,
  'trending-up': TrendingUp,
  smartphone: Smartphone,
  shield: Shield,
}

function Home() {
  const featuredCourses = courses.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              <Play className="h-3.5 w-3.5" />
              <span>Over 500+ courses available</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Unlock Your Potential with World-Class Online Learning
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Learn from industry experts, build real-world skills, and advance your career with our curated collection of premium courses.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-gray-600 bg-gray-800/50 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-gray-500 hover:bg-gray-700/50"
              >
                Join for Free
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">120K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">500+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Featured Courses</span>
          <h2 className="mt-2 text-balance text-3xl font-bold text-gray-900 sm:text-4xl">
            Start Learning Today
          </h2>
          <p className="mt-3 max-w-xl text-gray-500">
            Discover our most popular courses, handpicked by our team of experts.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Categories</span>
            <h2 className="mt-2 text-balance text-3xl font-bold text-gray-900 sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mt-3 max-w-xl text-gray-500">
              Find courses in the area that interests you most.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || BookOpen
              return (
                <Link
                  key={cat.name}
                  to="/courses"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.count} courses</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-blue-100">
              Join thousands of students who are already building their future with LearnHub.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 transition-all hover:bg-gray-50"
              >
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-xl border border-blue-400 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
