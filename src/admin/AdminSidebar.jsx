import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Users, PlusCircle, LogOut } from 'lucide-react'

function AdminSidebar() {
  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/courses', label: 'Manage Courses', icon: BookOpen },
    { to: '/admin/users', label: 'Manage Users', icon: Users },
    { to: '/admin/add-course', label: 'Add Course', icon: PlusCircle },
  ]

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  const handleLogout = () => {
    // Clear admin session if needed
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminName')
    window.dispatchEvent(new Event('auth-change'))
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">LearnHub</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Back to Home
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
