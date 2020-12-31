
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
      question: "Normal fault is a",
      answers: {
        a: "slip fault in which the block below the fault has moved downward relative to the block below",
        b: "slip fault in which the block below the fault has moved upward relative to the block below",
        c: "slip fault in which the block above the fault has moved downward relative to the block below",
        d: "slip fault in which the block above the fault has moved upwards relative to the block below"
      },
      correctAnswer: "c"
    },
    {
      question: "Thrust fault is",
      answers: {
        a: "slip fault in which the upper block, above the fault plane, moves up and over the lower block",
        b: "slip fault in which the upper block, below the fault plane, moves up and over the lower block",
        c: "slip fault in which the below block, above the fault plane, moves up and over the lower block",
        d: "None of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "Ring faults, also known as",
      answers: {
        a: "Cauldic Fault",
        b: "Dextral Fault",
        c: "Listric Fault",
        d: "Caldera Fault"
      },
      correctAnswer: "d"
    },
    {
      question: "Thrust faults form __ in the large thrust belts",
      answers: {
        a: "Nappes",
        b: "Klippen",
        c: "Both A and B",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "The tectonic folding may arise mainly due to tangential compression. (Say True or False)",
      answers: {
        a: "True",
        b: "False"
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
