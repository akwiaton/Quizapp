let questions = [
  {
    question: "What is the capital of France?",
    answer_1: "Paris",
    answer_2: "Prague",
    answer_3: "London",
    answer_4: "Kualalumpur",
    correct_answer: 1,
  },
  {
    question: "What is the only country that borders the United Kingdom?",
    answer_1: "England",
    answer_2: "Wales",
    answer_3: "Scotland",
    answer_4: "Ireland",
    correct_answer: 4,
  },
  {
    question: "How many time zones does Australia have?",
    answer_1: "one",
    answer_2: "three",
    answer_3: "none",
    answer_4: "seven",
    correct_answer: 2,
  },
  {
    question: "Which ocean surrounds Antarctica?",
    answer_1: "The Arctic Ocean",
    answer_2: "The Southern Ocean",
    answer_3: "The Pacific Ocean",
    answer_4: "The Atlantic Ocean",
    correct_answer: 2,
  },
  {
    question: "What is the highest mountain in South America?",
    answer_1: "Kilimanjaro",
    answer_2: "Ortler",
    answer_3: "Aconcagua",
    answer_4: "Ojos del Salado",
    correct_answer: 3,
  },
];

let currentQuestion = 0;
let rightquestion = 0;
let AUDIO_CORRECT = new Audio('audio/correct.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
  document.getElementById("all_question").innerHTML = questions.length; // show how many  questions there are

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
      showEndScreen();
  } else { // show question
      updateToNextQuestion();
      updateProgressBar();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function answer(selection) {
  let question = questions[currentQuestion];
  console.log("Selected answer is " + selection);
  let selectedQuestionNumber = selection.slice(-1); // Get last character of string (number of answer chosen).
  console.log("SelectedQuestionNumer is ", selectedQuestionNumber);
  console.log("Current question is ", question["correct_answer"]);

  let idOfCorrectAnswer = `answer_${question["correct_answer"]}`; // Id of right answer

  if (selectedQuestionNumber == question["correct_answer"]) {
    console.log("Right answer!"); // The user got it right
    document.getElementById(selection).parentNode.classList.add("bg-success");
    AUDIO_CORRECT.play();
    rightquestion++;
  } else {
    console.log("False answer!");
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfCorrectAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  document.getElementById("next-button").disabled = false;
}

// function rightAnswerSelected(selectedQuestionNumber, question) {
//   selectedQuestionNumber == question["correct_answer"];
// }

function nextQuestion() {
  currentQuestion++; //  Go to the next question
  document.getElementById("next-button").disabled = true;

  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById('header_img').src = 'img/brainbg.jpg';
  document.getElementById("score-card").style =  'display: none'; //  Hide score card
  document.getElementById('question-body').style = ''; //  Show the questions again
  currentQuestion = 0;
  rightquestion = 0;
  init();
}

function showEndScreen( ) {
  document.getElementById("score-card").style =  ""; // show score card when all questions answered, classe display none wird entfernt
  document.getElementById('question-body').style = 'display: none';
  document.getElementById('amount_of_right_questions').innerHTML = rightquestion;
  document.getElementById('header_img').src = 'img/tropy.png';
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("current_question").innerHTML = currentQuestion + 1; // number of question changes

    // Show the question and answers
    document.getElementById("question_text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length; // +1 damit ich auf 100% komme, wir fangen zu zahlen bei 0 an
  percent = percent *  100;
  percent = Math.round(percent);

  document.getElementById('progress_bar').innerHTML = `${percent}%`;
  document.getElementById('progress_bar').style = `width: ${percent}%`;
}