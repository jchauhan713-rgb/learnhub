import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import quizData from '../data/quizData.js'

function Quiz() {
  const { subject } = useParams()
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // Map the URL subject to quiz data keys
    const subjectMappings = {
      'programming': 'programming',
      'web-development': 'web-development',
      'data-science': 'data-science',
      'design': 'design',
      'artificial-intelligence': 'artificial-intelligence',
      'marketing': 'marketing',
      'mobile-development': 'mobile-development',
      'cybersecurity': 'cybersecurity'
    }
    
    // Try direct match first
    let subjectKey = subject.toLowerCase()
    if (quizData[subjectKey]) {
      setQuestions(quizData[subjectKey])
      return
    }
    
    // Try with mappings
    subjectKey = subjectMappings[subjectKey]
    if (subjectKey && quizData[subjectKey]) {
      setQuestions(quizData[subjectKey])
    } else {
      navigate('/courses')
    }
  }, [subject, navigate])

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setUserAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
      alert('Please select an answer.')
      return
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const submitQuiz = () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
      alert('Please select an answer.')
      return
    }

    // Calculate score
    let correctCount = 0
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++
      }
    })
    setScore(correctCount)

    // Mark quiz as completed in localStorage
    localStorage.setItem(`quizCompleted_${subject}`, 'true')

    setShowResults(true)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowResults(false)
    setScore(0)
  }

  const goHome = () => {
    navigate('/courses')
  }

  const generateCertificate = () => {
    const storedName = localStorage.getItem('userName') || 'Learner'
    const userName = storedName.trim() || 'Learner'
    const courseName = subject
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    const safeUserName = userName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    const safeCourseName = courseName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    const completionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const pdfFilename = `certificate-${safeUserName}-${safeCourseName}.pdf`
    const percentage = Math.round((score / questions.length) * 100)

    const doc = new jsPDF('pt', 'pt', 'a4')
    const { width, height } = doc.internal.pageSize
    const margin = 40
    const center = width / 2
    const brandBlue = '#2563eb'
    const brandLight = '#DBEAFE'
    const textBlack = '#111827'
    const borderGray = '#cbd5e1'

    const titleFontSize = 26
    const nameFontSize = 22
    const courseFontSize = 18
    const bodyFontSize = 12
    const logoFontSize = 16
    const boxPadding = 16
    const lineGap = 18
    const sectionGap = 28

    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, width, height, 'F')

    doc.setDrawColor(brandBlue)
    doc.setLineWidth(10)
    doc.rect(margin / 2, margin / 2, width - margin, height - margin, 'S')

    doc.setDrawColor(brandBlue)
    doc.setLineWidth(8)
    doc.line(margin + 18, margin + 20, margin + 18, height - margin - 20)
    doc.line(width - margin - 18, margin + 20, width - margin - 18, height - margin - 20)

    const logoHeight = 24
    const logoWidth = 40

    const nameLines = doc.splitTextToSize(userName, width - margin * 2 - 80)
    const nameHeight = nameLines.length * nameFontSize * 1.2

    const courseLines = doc.splitTextToSize(courseName, width - margin * 2 - 120)
    const courseWidths = courseLines.map(line => doc.getTextWidth(line))
    const maxCourseWidth = courseWidths.length ? Math.max(...courseWidths) : 0
    const boxWidth = Math.min(Math.max(maxCourseWidth + boxPadding * 2, 240), width - margin * 2 - 100)
    const boxHeight = courseLines.length * courseFontSize * 1.3 + boxPadding * 2

    let currentY = margin + 30
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
    doc.setFontSize(logoFontSize)
    doc.setTextColor(brandBlue)
    doc.text('LEARNHUB', center, currentY + logoHeight + 22, {
      align: 'center',
      charSpace: 1.2
    })

    currentY += logoHeight + 42
    doc.setFontSize(titleFontSize)
    doc.setTextColor(textBlack)
    doc.text('CERTIFICATE OF COMPLETION', center, currentY, { align: 'center' })

    currentY += titleFontSize + 14

    currentY += sectionGap
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(bodyFontSize)
    doc.text('This certifies that', center, currentY, { align: 'center' })

    currentY += lineGap
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(nameFontSize)
    doc.text(nameLines, center, currentY, { align: 'center' })

    currentY += nameHeight + sectionGap
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(bodyFontSize)
    doc.text('has successfully completed the course', center, currentY, { align: 'center' })

    currentY += sectionGap
    const boxY = currentY
    const boxXLeft = center - boxWidth / 2
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(courseFontSize)
    doc.setFillColor(brandLight)
    doc.setDrawColor(brandBlue)
    doc.setLineWidth(1.5)
    doc.roundedRect(boxXLeft, boxY, boxWidth, boxHeight, 14, 14, 'FD')

    doc.setFillColor(textBlack)
    let textY = boxY + boxPadding + courseFontSize * 0.3
    courseLines.forEach(line => {
      doc.text(line, center, textY, { align: 'center' })
      textY += courseFontSize * 1.3
    })

    currentY = boxY + boxHeight + sectionGap
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(bodyFontSize)
    doc.text(`Score: ${score}/${questions.length}`, center, currentY, { align: 'center' })

    currentY += lineGap
    doc.text(`Percentage: ${percentage}%`, center, currentY, { align: 'center' })

    currentY += sectionGap
    doc.text(`Issued on: ${completionDate}`, center, currentY, { align: 'center' })

    const footerY = height - margin - 70
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(bodyFontSize)
    doc.text('Issued by LearnHub', center, footerY, { align: 'center' })

    const signatureY = footerY + 30
    doc.setDrawColor(textBlack)
    doc.setLineWidth(0.8)
    const signatureWidth = 140
    doc.line(center - signatureWidth / 2, signatureY, center + signatureWidth / 2, signatureY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(bodyFontSize)
    doc.text('Authorized Signature', center, signatureY + 18, { align: 'center' })

    doc.save(pdfFilename)
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-2xl px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Quiz Completed!</h1>

            <div className="text-center mb-8">
              <div className="text-2xl font-semibold text-gray-900 mb-2">
                You scored {score} out of {questions.length}
              </div>
              <div className="text-lg text-gray-600">
                Percentage: {percentage}%
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Review Your Answers</h2>
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index]
                const isCorrect = userAnswer === question.answer
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <p className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      Your Answer: {question.options[userAnswer]}
                    </p>
                    <p className={`text-sm font-medium ${
                      isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${question.options[question.answer]}`}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-4 items-center justify-center sm:flex-row">
              <button
                onClick={restartQuiz}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Restart Quiz
              </button>
              <button
                onClick={generateCertificate}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Download Certificate
              </button>
              <button
                onClick={goHome}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
              {subject.replace(/-/g, ' ')} Quiz
            </h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    userAnswers[currentQuestionIndex] === index
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={userAnswers[currentQuestionIndex] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="mr-3"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz