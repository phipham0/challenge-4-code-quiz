var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startEl = document.getElementById('start');
var clearEl = document.getElementById('clear');
var backEl = document.getElementById('back');
var buttonEl = document.querySelector(".btn");
var correct = document.querySelector(".correct");
var pageEl = document.querySelector(".page-question");
var viewScoreEl = document.querySelector(".score");
var highscoresEl = document.querySelector(".highscore");
var submitListEl = document.querySelector(".submit");
var submitEl = document.querySelector(".submit-score");
var highscoreListEl = document.querySelector(".highscores");
var scoreListEl = $('.submit');
var scoreEl = $('.submit-score');
var listEl = document.querySelector(".responses");
var questionElement = document.querySelector(".questions");
var responseElement = document.querySelector(".responses");
var finalScoreEl = document.querySelector(".final-score");
var timeLeft = 90;
var count = 0;
var index = 0;

var questions = [
    { question: "What is a function?", responses: [ "Resuable code", "Primitive value", "None of the above" ], answer: 0 },
    { question: "What is an array?", responses: [ "List of values", "Key value pairs", "None of the above" ], answer: 2 },
    { question: "What is a primitive value? ", responses: [ "123", "1234", "None of the above" ], answer: 2 },
    { question: "What is the abbreviation JSON?", responses: [ "JASON", "Javascript notation object", "None of the above" ], answer: 1 },
  ];

var highscores = [];

timerEl.textContent = timeLeft;

function countdown() {
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if(index > questions.length - 1) {
        // Stops execution of action at set interval
        clearInterval(timeInterval);
        pageEl.style.display = "none";
        submitEl.style.display = "block";
        finalScoreEl.textContent = timerEl.textContent;
        correct.textContent = "";
      }
      if (timeLeft < 0) {
        clearInterval(timeInterval);
        timerEl.textContent = 0;
        pageEl.style.display = "none";
        submitEl.style.display = "block";
        finalScoreEl.textContent = timerEl.textContent;

      }

       
      
    }, 1000);

    backEl.addEventListener("click", function(event) {
        clearInterval(timeInterval);
        startEl.style.display = "block";
        highscoresEl.style.display = "none";
        timeLeft = 90;
        timerEl.textContent = 90;
        correct.textContent = "";
    })



}

  // Navigate through list of questions
  function navigate(direction) {
    index = index + direction;
    // If you try to navigate 'back' from the start
    // Go to last question
    if (index < 0) { 
      index = questions.length - 1; 

      // If you are at the very end. 
      // Go to the first image/question
    } else if (index > questions.length - 1) { 
      pageEl.style.display = "none";
      submitEl.style.display = "block";

    }
    else {
      renderQuestion();
      // render the anser
      renderAnswers();
    }
   
    
  }
  
  function renderQuestion() {
    questionElement.textContent = questions[index].question;
  }
  
  function renderAnswers() {
    console.log("questions object",questions[index]);
    console.log("list of responses", questions[index].responses);
    responseElement.innerHTML = "";
    for (var i = 0; i < questions[index].responses.length; i++ ) {
      console.log(questions[index].responses[i]);
      var li = document.createElement("button");
      li.className = "response";
      li.dataset.correct = i;
      li.textContent = i + 1 + ". " + questions[index].responses[i];
      responseElement.appendChild(li);
    }
    console.log(buttonEl.className);
  }

  navigate(0);

  buttonEl.addEventListener("click", function(event) {
    index = 0;
    countdown();
    timeLeft = 90;
    timerEl.textContent = 90;
    startEl.style.display = "none";
    pageEl.style.display = "block";

})

//   Add event listener to the response list
//   once I clicked, check what i clicked on and make sure its a button
//   once I make sure its a button, check what answer I clicked
//   compare it to the right answer
//   Update HTML if correct or incorrect and cycle to next question( navigate())

listEl.addEventListener("click", function(event) {
    console.log(event);
    if (event.target.matches(".response")) {
        // this is where you check the answer selected

        if (event.target.dataset.correct == questions[index].answer){
            
            correct.textContent = "CORRECT";
        }
        else {
            correct.textContent = "WRONG";
            timeLeft -= 10;
        }
        navigate(1);

    }
})

function handleFormSubmit(event) {
    event.preventDefault();
    var scoreItem = $('input[name="initials"]').val();
  
    if (!scoreItem) {
      console.log('No shopping item filled out in form!');
      return;
    }
    
    $('input[name="initials"]').val('');

    submitEl.style.display = "none";
    highscoresEl.style.display = "block";

    highscores.push(scoreItem + " - " + timerEl.textContent);
    storeScores();
    renderScores();
  }
  
scoreEl.on('submit', handleFormSubmit);

function storeScores() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }

function renderScores() {
    // Clear todoList element and update todoCountSpan
    highscoreListEl.innerHTML = "";
  
    // Render a new li for each todo
    for (var i = 0; i < highscores.length; i++) {
      var score = highscores[i];
  
      var li = document.createElement("li");
      li.textContent = score;
      li.setAttribute("data-index", i);
      highscoreListEl.appendChild(li);
    }
  }

  function init() {
    // Get stored todos from localStorage
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedScores !== null) {
      highscores = storedScores;
    }
  
    // This is a helper function that will render todos to the DOM
    renderScores();
  }

  clearEl.addEventListener("click", function(event) {
    localStorage.clear();
    highscores = [];
    renderScores();
    
})



viewScoreEl.addEventListener("click", function(event) {
    startEl.style.display = "none";
    highscoresEl.style.display = "block";
    pageEl.style.display = "none";
    submitEl.style.display = "none";
    correct.textContent = "";
    renderScores();
})


init();