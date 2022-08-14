var startQuiz= document.querySelector(".start");
var startBtn = document.querySelector("#start-button");

var allQuestions = document.querySelector(".questions");
var optionBtns = document.querySelectorAll(".options");
var questionH2 = document.querySelector(".question")

var scoreDisplay = document.querySelector(".score");
var countdownDisplay = document.querySelector("#countdown");
var initialsSavedScore = document.querySelector(".user");

var input = document.querySelector(".user-input");
var submitBtn = document.querySelector(".submit");
var homebtn= document.querySelector(".home");
var highscoreSection = document.querySelector(".high-scores");


var currentIndex = 0;
var score = 0;
var countdown = 60;
var allowedHighScores = 10;
var high_scores = 0;


var questions = [

  {
    question: "Which function is used to serialize an object into JSON string in JavaScript?",
    options: ["parse()", "stringify()", "array()", "parseInt()"],
    answer: "stringify()"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Spark", "Python", "HTML","Node"],
    answer: "Node"
  },
  {
    question: "What is HTML used for?",
    options: ["Styling", "Making a Page Function", "Initial Display", "All of the above"],
    answer: "Initial Display"
  },
  {
    question: "Which of the following is not a method?",
    options: ["toLowerCase()", ".length", "push()", "sort()"],
    answer: ".length"
  },
  {
    question: "What kind of language is CCS?",
    options: ["Hypertext Markup Language", "Object-based", "Object-Oriented", "Cascading Style Sheet"],
    answer: "Cascading Style Sheet"
  },
  {
    question: "Which of the following methods can be used to display data in some form using JavaScript?",
    options: ["document.write()", "console.log", "window.alert", "All of the above"],
    answer: "All of the above"
  },
  
]


startBtn.addEventListener("click", function() {

  startQuiz.classList.remove("active");
  allQuestions.classList.add("active");

  scoreDisplay.textContent = score;

  startTimer();
  showQuestions();
})


function showQuestions() {
  questionH2.textContent = questions[currentIndex].question;

  optionBtns.forEach((btn, index) => {
    btn.textContent = questions[currentIndex].options[index];

    btn.addEventListener("click", function() {

        if (btn.textContent === questions[currentIndex].answer) {
            score++;
            scoreDisplay.textContent = score;
            nextQuestion();
           
        } else {
            countdown -= 10;
           
        }
        
    })

  })


}


function nextQuestion() {

  if (currentIndex === (questions.length - 1)) {
      
    saveUserInitials();


  } else {
      currentIndex++;

      questionH2.textContent = questions[currentIndex].question;

      optionBtns.forEach((btn, index) => {
      btn.textContent = questions[currentIndex].options[index];
      })

  }
}


function startTimer() {
  countdownDisplay.textContent = countdown;

  var countdownTimer = setInterval(function() {
      countdown--;
      countdownDisplay.textContent = countdown;

      if (countdown <= 0) {
          clearInterval(countdownTimer)
          saveUserInitials();
      }
  }, 1000)

}


function saveUserInitials() {
  allQuestions.classList.remove("active");
  initialsSavedScore .classList.add("active");

  getScore();

}


submitBtn.addEventListener("click", function() {
  var userInitials = input.value;
  
  initialsSavedScore.classList.remove("active");
  highscoreSection.classList.add("active");
  
  setScore(score, userInitials);
})

homeBtn.addEventListener("click", function() {
   
        startQuiz.classList.add("active");
        allQuestions.classList.remove("active");
        highscoreSection.classList.remove("active");
    
  })




function setScore() {
  var score = countdown;
  localStorage.setItem("highscore", score);
  localStorage.setItem("userInitials", document.getElementById('user-input').value);

  getScore();
}

function getScore() {
  var quizScore = `
  <h2>` + localStorage.getItem("userInitials") + `'s highscore: <h2>
  <h1>` + localStorage.getItem("highscore") + `</h1>
  
  <button onclick="clearScore()">Reset Score</button><button onclick="resetGame()">Replay</button>`;

  document.getElementById(".high-scores").innerHTML = quizScore;
}

function resetScore(){
  localStorage.setItem("highscore", "");
  localStorage.setItem("user-input", "");

}
