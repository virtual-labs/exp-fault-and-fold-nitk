
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "A fault is a",
      answers: {
        a: "Fracture or zone of fractures inside a block of rock",
        b: "Fracture or zone of fractures between two blocks of rock",
        c: "Fracture or zone of fractures at edges of block of rock",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "Faults may range from",
      answers: {
        a: "Few micrometers to millimeter",
        b: "Few millimeters to centimeter",
        c: "Few millimeters to thousands of kilometers",
        d: "All of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Earthquake is caused due to",
      answers: {
        a: "Rock on one side of the fault suddenly slips with respect to the other",
        b: "Internal vibration in the fault rock",
        c: "Both A and B",
        d: "None of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "Asperities is",
      answers: {
        a: "Regions of higher friction along a fault plane",
        b: "Region where rocks are locked",
        c: "Both A and B",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Fault forms, when",
      answers: {
        a: "The stress developed due to the movement of tectonic plate become greater than the strength of the rock",
        b: "The stress initiate to developed due to the movement of tectonic plate",
        c: "The stress developed due to the movement of tectonic plate is equal to the strength of the rock",
        d: "None of the above"
      },
      correctAnswer: "a"
    }
  ];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
