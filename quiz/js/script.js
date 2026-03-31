// script.js

// Function to take quiz - called from index.html
function takeQuiz(subject) {
  window.location.href = `quiz.html?subject=${subject}`;
}

// Quiz variables
let currentQuestionIndex = 0;
let userAnswers = [];
let quizQuestions = [];

// Initialize quiz if on quiz page
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject');

  if (subject && questions[subject]) {
    quizQuestions = questions[subject];
    loadQuestion();
  } else {
    document.getElementById('quiz-content').innerHTML = '<p>Invalid subject. <a href="index.html">Go back</a></p>';
  }
});

// Load current question
function loadQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const quizContent = document.getElementById('quiz-content');

  let html = `
    <div class="question">
      <h2>Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</h2>
      <p>${question.question}</p>
      <ul class="options">
  `;

  question.options.forEach((option, index) => {
    html += `
      <li>
        <label>
          <input type="radio" name="answer" value="${index}">
          ${option}
        </label>
      </li>
    `;
  });

  html += `
      </ul>
    </div>
    <div class="quiz-buttons">
  `;

  if (currentQuestionIndex < quizQuestions.length - 1) {
    html += `<button class="btn" onclick="nextQuestion()">Next</button>`;
  } else {
    html += `<button class="btn" onclick="submitQuiz()">Submit</button>`;
  }

  html += `</div>`;

  quizContent.innerHTML = html;
}

// Handle next question
function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert('Please select an answer.');
    return;
  }

  userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);
  currentQuestionIndex++;
  loadQuestion();
}

// Submit quiz and show results
function submitQuiz() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert('Please select an answer.');
    return;
  }

  userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);

  // Calculate score
  let correctCount = 0;
  quizQuestions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quizQuestions.length) * 100);

  // Display results
  let html = `
    <div class="results">
      <h2>Quiz Completed!</h2>
      <div class="score">You scored ${correctCount} out of ${quizQuestions.length}</div>
      <div class="percentage">Percentage: ${percentage}%</div>
      <button class="btn" onclick="restartQuiz()">Restart Quiz</button>
      <button class="btn" onclick="goHome()">Go Home</button>
    </div>
    <div class="question-review">
      <h3>Review Your Answers</h3>
  `;

  quizQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.answer;
    const className = isCorrect ? 'correct' : 'incorrect';

    html += `
      <div class="question-item ${className}">
        <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
        <p><strong>Your Answer:</strong> ${question.options[userAnswer]}</p>
        <p class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
          ${isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${question.options[question.answer]}`}
        </p>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById('quiz-content').innerHTML = html;
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  loadQuestion();
}

// Go back to home
function goHome() {
  window.location.href = 'index.html';
}