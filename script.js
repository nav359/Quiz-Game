const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    answer: "Harper Lee"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Silver", "Iron"],
    answer: "Oxygen"
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    answer: "2"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    answer: "Japan"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Graphite"],
    answer: "Diamond"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsListElement = document.getElementById("options-list");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");

// Load the current question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsListElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectAnswer(option));
    optionsListElement.appendChild(li);
  });

  // Update progress bar
  progressElement.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
}

// Handle answer selection
function selectAnswer(selectedOption) {
  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.answer;

  // Disable further selections for this question
  optionsListElement.querySelectorAll("li").forEach(li => {
    li.removeEventListener("click", selectAnswer);
  });

  // Highlight the correct and incorrect answers
  optionsListElement.querySelectorAll("li").forEach(li => {
    if (li.textContent === currentQuestion.answer) {
      li.classList.add("correct");
    } else if (li.textContent === selectedOption) {
      li.classList.add("incorrect");
    }
  });

  // Update score and feedback
  if (isCorrect) {
    score++;
    feedbackElement.textContent = "Correct! 🎉";
    feedbackElement.style.color = "#28a745";
  } else {
    feedbackElement.textContent = "Incorrect! 😢";
    feedbackElement.style.color = "#dc3545";
  }

  nextButton.disabled = false;
}

// Move to the next question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    nextButton.disabled = true;
    feedbackElement.textContent = "";
  } else {
    showScore();
  }
});

// Display the final score
function showScore() {
  questionElement.textContent = "Quiz Completed!";
  optionsListElement.innerHTML = "";
  nextButton.style.display = "none";
  feedbackElement.textContent = "";
  scoreElement.textContent = `Your Score: ${score} out of ${quizData.length}`;
}

// Initialize the quiz
loadQuestion();
nextButton.disabled = true;