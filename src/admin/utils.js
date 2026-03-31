// Utility functions for LocalStorage CRUD operations

// Courses
export const getCourses = () => {
  try {
    const courses = localStorage.getItem('courses')
    return courses ? JSON.parse(courses) : []
  } catch (error) {
    console.error('Error parsing courses from localStorage:', error)
    return []
  }
}

export const saveCourses = (courses) => {
  try {
    localStorage.setItem('courses', JSON.stringify(courses))
  } catch (error) {
    console.error('Error saving courses to localStorage:', error)
  }
}

export const addCourse = (course) => {
  const courses = getCourses()
  courses.push(course)
  saveCourses(courses)
  // Dispatch event for real-time updates
  window.dispatchEvent(new Event('course-data-change'))
}

export const updateCourse = (id, updatedCourse) => {
  const courses = getCourses()
  const index = courses.findIndex(course => course.id === id)
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updatedCourse }
    saveCourses(courses)
    window.dispatchEvent(new Event('course-data-change'))
  }
}

export const deleteCourse = (id) => {
  const courses = getCourses()
  const filteredCourses = courses.filter(course => course.id !== id)
  saveCourses(filteredCourses)
  window.dispatchEvent(new Event('course-data-change'))
}

// Users
export const getUsers = () => {
  try {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Error parsing users from localStorage:', error)
    return []
  }
}

export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users))
}

export const deleteUser = (id) => {
  const users = getUsers()
  const filteredUsers = users.filter(user => user.id !== id)
  saveUsers(filteredUsers)
}

// Generate unique ID
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
