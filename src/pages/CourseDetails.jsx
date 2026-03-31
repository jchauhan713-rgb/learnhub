import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Star,
  Clock,
  Users,
  BarChart3,
  PlayCircle,
  CheckCircle,
  ArrowLeft,
  Download,
  Award,
} from 'lucide-react'
import jsPDF from 'jspdf'
import courses from '../data/courses.js'

function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find((c) => c.id === Number(id))
  const [isCompleted, setIsCompleted] = useState(false)
  const [userName, setUserName] = useState('Learner')
  const [showReadingContent, setShowReadingContent] = useState(false)

  const userEmail = localStorage.getItem('userEmail')
  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    } else if (userEmail) {
      const fallbackName = userEmail.split('@')[0].replace(/\./g, ' ').replace(/([A-Z])/g, ' $1').trim()
      const nameWords = fallbackName.split(' ')
      setUserName(nameWords.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '))
    }

    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]')
    const quizCompleted = JSON.parse(localStorage.getItem(`quizCompleted_${course?.category?.toLowerCase().replace(' ', '-')}`) || 'false')
    setIsCompleted(completedCourses.includes(Number(id)) || quizCompleted)
  }, [id, course, userEmail])

  if (!course) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
        <p className="mt-2 text-gray-500">The course you are looking for does not exist.</p>
        <Link to="/courses" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
      </div>
    )
  }

  const courseMaterials = {
    "Introduction to Python Programming": {
      title: "Python Reading Material",
      description: `Unit 1: Python Basics
• Installing Python and setting up the environment
• Variables, data types, and naming conventions
• Expressions, operators, and comments
• Basic input/output with print() and input()
• Using the Python REPL and script files

Unit 2: Control Flow
• If, elif, else decision statements
• For loops and iterating over ranges
• While loops and loop control
• Nested conditions and branching logic
• Practical examples with conditionals

Unit 3: Data Structures
• Lists and common list operations
• Tuples, sets, and dictionary usage
• Indexing, slicing, and iteration techniques
• Mutable vs immutable collections
• Choosing the best container type

Unit 4: Functions and Modules
• Defining functions with def
• Parameters, return values, and scope
• Default arguments, *args and **kwargs
• Importing modules and organizing code
• Reusing functions across scripts

Unit 5: Files and Error Handling
• Reading and writing files with open()
• Using with as a context manager
• Working with JSON serialization
• Handling exceptions with try/except
• Debugging common Python errors`,
      topics: []
    },
    "Complete Web Development Bootcamp": {
      title: "Web Development Reading Material",
      description: `Unit 1: HTML Fundamentals
• Semantic tags and page structure
• Headings, paragraphs, and lists
• Links, images, and forms
• Tables and multimedia elements
• Accessibility basics for HTML

Unit 2: CSS Layouts
• Flexbox for responsive layouts
• CSS Grid for advanced design
• Styling text, colors, and spacing
• Responsive design with media queries
• Transitions and simple animations

Unit 3: JavaScript Essentials
• Variables, types, and operators
• Functions and event handling
• DOM selection and manipulation
• Working with arrays and objects
• Async operations with fetch()

Unit 4: React Fundamentals
• Components and JSX syntax
• State management with hooks
• Handling events and props
• Conditional rendering patterns
• Building reusable UI components

Unit 5: Backend Basics
• Node.js runtime essentials
• Express application routing
• Working with JSON and APIs
• Connecting to a MongoDB database
• Deploying a full-stack app`,
      topics: []
    },
    "Data Science with R": {
      title: "Data Science Reading Material",
      description: `Unit 1: R Programming Basics
• R syntax and variables
• Data types and vectors
• Using factors and data frames
• Basic arithmetic and functions
• Loading packages with library()

Unit 2: Data Wrangling
• Importing data from files
• Cleaning and transforming data
• Using dplyr verbs like filter and mutate
• Reshaping data with tidyr
• Handling missing values

Unit 3: Visualization
• Creating graphics with ggplot2
• Mapping data to aesthetics
• Adding layers and themes
• Plot types: bar, line, scatter
• Customizing labels and colors

Unit 4: Statistics
• Summarizing data with descriptive stats
• Probability distributions and sampling
• Hypothesis testing basics
• Linear regression modeling
• Interpreting model output

Unit 5: Machine Learning
• Splitting data into training and test sets
• Building classification models
• Evaluating performance metrics
• Feature engineering techniques
• Presenting results clearly`,
      topics: []
    },
    "UI/UX Design Masterclass": {
      title: "UI/UX Design Reading Material",
      description: `Unit 1: Design Thinking
• Research and empathy mapping
• Defining user problems clearly
• Ideation and sketching ideas
• Rapid prototyping techniques
• Testing assumptions early

Unit 2: User Research
• Conducting interviews and surveys
• Creating personas and journey maps
• Analyzing user feedback
• Prioritizing user needs
• Translating research into design

Unit 3: Wireframing
• Low-fidelity wireframe creation
• Layout and information hierarchy
• User flow planning
• Iterating wireframe designs
• Validating structure before visuals

Unit 4: Visual Design
• Color theory and contrast
• Typography and visual hierarchy
• Spacing, grids, and alignment
• Icons and interface elements
• Designing consistent UI systems

Unit 5: Prototyping and Handoff
• Building interactive prototypes
• Using Figma components effectively
• Sharing feedback with stakeholders
• Preparing handoff documentation
• Communicating design specs to developers`,
      topics: []
    },
    "Machine Learning A-Z": {
      title: "Machine Learning Reading Material",
      description: `Unit 1: ML Foundations
• Supervised vs unsupervised learning
• Regression and classification concepts
• Training, validation, and testing
• Feature selection basics
• Common machine learning terms

Unit 2: Data Preparation
• Cleaning and transforming data
• Handling missing values
• Encoding categorical variables
• Scaling and normalization
• Splitting data for modeling

Unit 3: Core Algorithms
• Linear regression fundamentals
• Decision trees and ensembles
• K-nearest neighbors overview
• Support vector machines basics
• Model tuning with hyperparameters

Unit 4: Neural Networks
• Hidden layers and neurons
• Activation functions and loss
• Training with backpropagation
• Avoiding overfitting
• Evaluating deep learning models

Unit 5: Model Deployment
• Saving models with pickle
• Building prediction APIs
• Monitoring model performance
• Handling real-world data inputs
• Iterating on deployed models`,
      topics: []
    },
    "Digital Marketing Strategy": {
      title: "Digital Marketing Reading Material",
      description: `Unit 1: Marketing Fundamentals
• Defining your target audience
• Setting measurable marketing goals
• Building a strong brand message
• Understanding the customer journey
• Positioning your product effectively

Unit 2: SEO and Content
• Keyword research basics
• Writing content for search intent
• On-page optimization techniques
• Content planning and calendars
• Measuring organic traffic success

Unit 3: Social Media
• Choosing the right channels
• Creating engaging social content
• Growing an online community
• Planning sponsored campaigns
• Tracking engagement metrics

Unit 4: Paid Advertising
• Google Ads campaign setup
• Facebook and Instagram ad targeting
• Budgeting and bidding strategies
• Writing high-converting ad copy
• Measuring ad performance

Unit 5: Email and Analytics
• Building email lists legally
• Crafting automation workflows
• A/B testing subject lines
• Tracking conversions and ROI
• Using analytics to improve strategy`,
      topics: []
    },
    "iOS App Development with Swift": {
      title: "Mobile Development Reading Material",
      description: `Unit 1: Swift Language Basics
• Writing Swift syntax clearly
• Working with optionals safely
• Using collections and control flow
• Defining functions and closures
• Structs, classes, and enums

Unit 2: Xcode and Interface
• Navigating Xcode tools
• Creating storyboard layouts
• Auto Layout and constraints
• Connecting outlets and actions
• Running apps on simulators

Unit 3: App Navigation
• Building navigation controllers
• Using tab bars effectively
• Passing data between screens
• Managing view controller lifecycle
• Designing intuitive flows

Unit 4: Data Persistence
• Storing data with Core Data
• Fetch requests and entities
• Saving and updating records
• Handling app storage safely
• Syncing local data models

Unit 5: Networking and APIs
• Fetching JSON from web services
• Parsing API responses in Swift
• Handling network errors gracefully
• Updating UI from async calls
• Using URLSession effectively`,
      topics: []
    },
    "Cybersecurity Fundamentals": {
      title: "Cybersecurity Reading Material",
      description: `Unit 1: Security Basics
• Understanding the CIA triad
• Identifying common attack types
• Recognizing threat actor motivations
• Reviewing basic security terminology
• Applying simple protective controls

Unit 2: Network Security
• Firewall and VPN fundamentals
• Securing wireless networks
• Monitoring network traffic
• Preventing common network attacks
• Segmenting networks for safety

Unit 3: Cryptography
• Symmetric vs asymmetric encryption
• Hashing and digital signatures
• Secure key management basics
• Using SSL/TLS for web security
• Protecting sensitive data at rest

Unit 4: Secure Coding
• Validating user input carefully
• Preventing SQL injection and XSS
• Managing authentication securely
• Keeping dependencies updated
• Logging and handling security errors

Unit 5: Incident Response
• Detecting potential breaches early
• Containing security incidents quickly
• Recovering systems safely
• Documenting response steps
• Learning from security events`,
      topics: []
    }
  };

  const toggleReadingContent = () => {
    setShowReadingContent(!showReadingContent)
  }

const downloadReadingMaterial = () => {
    const rawUnits = course.units ?? course.lessons ?? []
    const units = Array.isArray(rawUnits)
      ? rawUnits.map((unit) => typeof unit === 'string' ? unit : unit?.title ?? String(unit))
      : []
    if (!units.length) return

    const safeCourseName = course.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    const filename = `${safeCourseName}-reading-material.pdf`

    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text('Reading Material', 20, 30)
    doc.setFontSize(12)
    doc.setLineHeightFactor(1.5)

    let y = 50

    units.forEach((unitTitle, unitIndex) => {
      const titleLines = doc.splitTextToSize(`Unit ${unitIndex + 1}: ${unitTitle}`, 170)
      doc.text(titleLines, 20, y)
      y += titleLines.length * 7

      const bulletTemplates = [
        `Explore core concepts of ${unitTitle}`,
        `Understand practical uses of ${unitTitle}`,
        `Review examples for ${unitTitle}`,
        `Identify best practices for ${unitTitle}`,
        `Practice the main skills in ${unitTitle}`,
        `Note common pitfalls for ${unitTitle}`,
        `Connect ${unitTitle} with the course flow`,
        `Summarize key takeaways from ${unitTitle}`
      ]
      const bulletCount = 5 + (unitIndex % 4)

      for (let i = 0; i < bulletCount; i += 1) {
        const bulletText = `• ${bulletTemplates[i]}`
        const wrapped = doc.splitTextToSize(bulletText, 162)
        doc.text(wrapped, 28, y)
        y += wrapped.length * 7
      }

      y += 8
      if (y > doc.internal.pageSize.height - 20) {
        doc.addPage()
        y = 20
      }
    })

    doc.save(filename)
  }

const generateCertificate = () => {
  if (!userName || userName === 'Learner') {
    alert('Please log in to download certificate')
    return
  }
  if (!isCompleted) {
    alert('Please complete the course first')
    return
  }

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const safeUserName = userName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
  const safeCourseName = course?.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
  const pdfFilename = `certificate-${safeUserName}-${safeCourseName}.pdf`

  const doc = new jsPDF('pt', 'pt', 'a4')
  const { width, height } = doc.internal.pageSize
  const margin = 40
  const center = width / 2
  const brandBlue = '#2563eb'
  const brandLight = '#DBEAFE'
  const gold = '#2563eb'

  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, width, height, 'F')

  doc.setDrawColor(gold)
  doc.setLineWidth(12)
  doc.rect(margin / 2, margin / 2, width - margin, height - margin, 'S')
  doc.setLineWidth(4)
  doc.rect(margin, margin, width - margin * 2, height - margin * 2, 'S')

  const logoHeight = 24
  const logoWidth = 40
  const learnHubFontSize = 16
  const titleFontSize = 24
  const subtitleFontSize = 14
  const nameFontSize = 20
  const messageFontSize = 10
  const boxPadding = 14
  const boxLineHeight = 16 * 1.2

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(nameFontSize)
  const nameLines = doc.splitTextToSize(userName, width - margin * 2 - 100)
  const nameHeight = nameLines.length * nameFontSize * 1.2

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  const learnHubHeight = learnHubFontSize

  doc.setFontSize(titleFontSize)
  const titleHeight = titleFontSize

  doc.setFontSize(subtitleFontSize)
  const subtitleHeight = subtitleFontSize

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  const courseTitle = course?.title || ''
  const courseLines = doc.splitTextToSize(courseTitle, width - margin * 2 - 120)
  const courseWidths = courseLines.map(line => doc.getTextWidth(line))
  const maxCourseWidth = courseWidths.length ? Math.max(...courseWidths) : 0
  const boxWidth = Math.min(Math.max(maxCourseWidth + 40, 220), width - margin * 2 - 100)
  const boxHeight = courseLines.length * boxLineHeight + boxPadding * 2

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(messageFontSize)
  const description = course?.description || 'This certificate recognizes outstanding commitment and mastery demonstrated by completing the course curriculum with excellence.'
  const descriptionLines = doc.splitTextToSize(description, width - margin * 2 - 80)
  const descriptionHeight = descriptionLines.length * messageFontSize * 1.3
  const messageHeight = messageFontSize * 1.2
  const dateHeight = messageFontSize

  const contentHeight =
    logoHeight +
    learnHubHeight +
    titleHeight +
    subtitleHeight +
    nameHeight +
    messageHeight +
    boxHeight +
    descriptionHeight +
    dateHeight +
    10 +
    5

  const totalContentHeight = height * 0.55
  const gapCount = 6
  const sectionGap = (totalContentHeight - contentHeight) / gapCount
  const startY = margin + (height - margin * 2 - totalContentHeight) / 2

  let currentY = startY
  const logoX = center - logoWidth / 2

  doc.setFillColor(brandBlue)
  doc.roundedRect(logoX, currentY, logoWidth, logoHeight, 6, 6, 'F')
  doc.setFillColor(255, 255, 255)
  doc.rect(logoX + 10, currentY + 8, 8, 3, 'F')
  doc.rect(logoX + 10, currentY + 17, 8, 3, 'F')
  doc.rect(logoX + 28, currentY + 8, 8, 3, 'F')
  doc.rect(logoX + 28, currentY + 17, 8, 3, 'F')
  doc.setDrawColor(brandBlue)
  doc.setLineWidth(1.2)
  doc.line(logoX + 22, currentY + 5, logoX + 22, currentY + logoHeight - 5)
  doc.line(logoX + 10, currentY + 4, logoX + 16, currentY + 2)
  doc.line(logoX + 10, currentY + logoHeight - 4, logoX + 16, currentY + logoHeight - 2)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(learnHubFontSize)
  doc.setTextColor(brandBlue)
  doc.text('LEARNHUB', center, currentY + logoHeight + learnHubFontSize * 0.8, {
    align: 'center',
    charSpace: 1.2
  })

  currentY += logoHeight + learnHubHeight + sectionGap
  doc.setFontSize(titleFontSize)
  doc.setTextColor(0, 0, 0)
  doc.text('CERTIFICATE', center, currentY, { align: 'center' })

  currentY += titleHeight + 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(subtitleFontSize)
  const subtitleText = 'OF COMPLETION'
  doc.text(subtitleText, center, currentY, { align: 'center' })
  const subtitleWidth = doc.getTextWidth(subtitleText)
  doc.setLineWidth(0.8)
  doc.setDrawColor(0, 0, 0)
  doc.line(center - subtitleWidth / 2, currentY + 5, center + subtitleWidth / 2, currentY + 5)

  currentY += subtitleHeight + 5 + sectionGap
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(nameFontSize)
  doc.setTextColor(0, 0, 0)
  doc.text(nameLines, center, currentY, { align: 'center' })

  currentY += nameHeight + sectionGap
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(messageFontSize)
  doc.text('has successfully completed', center, currentY, { align: 'center' })

  currentY += messageHeight + sectionGap
  const boxY = currentY
  const boxXLeft = center - boxWidth / 2
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setFillColor(brandLight)
  doc.setDrawColor('#FFC107')
  doc.setLineWidth(3)
  doc.roundedRect(boxXLeft, boxY, boxWidth, boxHeight, 14, 14, 'FD')

  doc.setFillColor(0, 0, 0)
  let textY = boxY + boxPadding + 18
  courseLines.forEach(line => {
    doc.text(line, center, textY, { align: 'center' })
    textY += boxLineHeight
  })

  currentY = boxY + boxHeight + sectionGap
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(messageFontSize)
  doc.setTextColor(0, 0, 0)
  doc.setLineHeightFactor(1.3)
  doc.text(descriptionLines, center, currentY, { align: 'center' })

  const issueY = currentY + descriptionHeight + sectionGap
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(messageFontSize)
  doc.text(`Issued on: ${completionDate}`, center, issueY, { align: 'center' })

  doc.save(pdfFilename)
}

  const markAsCompleted = () => {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]')
    if (!completedCourses.includes(course.id)) {
      completedCourses.push(course.id)
      localStorage.setItem('completedCourses', JSON.stringify(completedCourses))
      setIsCompleted(true)
    }
  }

  return (
    <div>
      {/* Course Header */}
      <section className="bg-gray-900 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* Info */}
            <div className="lg:col-span-2">
              <span className="inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-300">
                {course.category}
              </span>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 leading-relaxed text-gray-400">
                {course.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-white">{course.rating}</span>
                  <span>({course.students?.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="h-4 w-4" />
                  <span>{course.lessons.length} lessons</span>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full rounded-lg object-cover"
              />
              <div className="mt-5">
                <span className="text-3xl font-bold text-white">{'₹'}{course.price}</span>
              </div>
                <Link to={"/payment/" + course.id}
                className="mt-5 block w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Enroll Now
              </Link>

              {/* Quiz Link */}
              <Link to={"/quiz/" + course.category.toLowerCase().replace(' ', '-')}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 py-3.5 text-sm font-semibold text-green-300 transition-colors hover:bg-green-500/20"
              >
                <PlayCircle className="h-4 w-4" />
                Take Quiz
              </Link>

              {/* Reading Material Button */}
              <button
                onClick={toggleReadingContent}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-600 bg-gray-700 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
              >
                <Download className="h-4 w-4" />
                {showReadingContent ? 'Hide' : 'View'} Reading Material
              </button>

              {/* Certificate Button */}
                <button
                onClick={generateCertificate}
                disabled={!userEmail || !isCompleted}
                className={'mt-3 flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-semibold transition-colors ' + 
                  (userEmail && isCompleted
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    : 'border-gray-600 bg-gray-700 text-gray-500 cursor-not-allowed')
                }
              >
                <Award className="h-4 w-4" />
                Download Certificate
              </button>

              {/* Mark as Completed (for demo) */}
              {!isCompleted && (
                <button
                  onClick={markAsCompleted}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 py-3.5 text-sm font-semibold text-purple-300 transition-colors hover:bg-purple-500/20"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Completed
                </button>
              )}

              <ul className="mt-5 flex flex-col gap-2.5 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Full lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Certificate of completion
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Downloadable resources
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Syllabus */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Course Syllabus</h2>
              <p className="mt-2 text-gray-500">{course.lessons.length} lessons to master this subject.</p>
              <div className="mt-6 flex flex-col gap-3">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-600">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900">Instructor</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100 text-xl font-bold text-blue-600">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{course.instructor}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating} rating</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {course.instructorBio}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{course.students?.toLocaleString()} students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Material Content Section */}
      {showReadingContent && courseMaterials[course.title] && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reading Material</h2>
              <p className="mt-3 text-gray-600 whitespace-pre-wrap">{courseMaterials[course.title].description}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={downloadReadingMaterial}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Download Reading Material
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

export default CourseDetails
