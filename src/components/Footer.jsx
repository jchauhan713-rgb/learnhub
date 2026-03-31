import { Link } from 'react-router-dom'
import { BookOpen, Github, Twitter, Linkedin, Youtube } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Learnhub</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Empowering learners worldwide with high-quality online courses taught by industry experts.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link to="/" className="text-sm text-gray-400 transition-colors hover:text-white">Home</Link></li>
              <li><Link to="/courses" className="text-sm text-gray-400 transition-colors hover:text-white">Courses</Link></li>
              <li><Link to="/about" className="text-sm text-gray-400 transition-colors hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 transition-colors hover:text-white">Contact</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-400 transition-colors hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link to="/courses" className="text-sm text-gray-400 transition-colors hover:text-white">Programming</Link></li>
              <li><Link to="/courses" className="text-sm text-gray-400 transition-colors hover:text-white">Web Development</Link></li>
              <li><Link to="/courses" className="text-sm text-gray-400 transition-colors hover:text-white">Data Science</Link></li>
              <li><Link to="/courses" className="text-sm text-gray-400 transition-colors hover:text-white">Design</Link></li>
              <li><Link to="/courses" className="text-sm text-gray-400 transition-colors hover:text-white">Marketing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            {'© 2026 Learnhub. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
