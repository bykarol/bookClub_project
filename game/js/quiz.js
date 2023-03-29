async function getData() {
  try {
    const baseURL = "./data/book-data.json";
    let response = await fetch(baseURL);
    if (!response.ok) {
      console.log("Cannot get the data");
      return [];
    }
    let bookData = await response.json();
    data(bookData);
    return bookData;
  } catch (error) {
    console.error("Error:: ", error.message);
  }
  finally {
    console.log("Fetch completed");
  }
}

const data = (questions) => {
  for (const question of questions) {
    view.arrayQuestions.push(question);
  }
}

const rndGenerator = (questionsLength) => {
  return Math.floor(Math.random() * (questionsLength));
}

const questionShuffle = () => {
  let shuffleQuestions = [];
  while (shuffleQuestions.length < view.arrayQuestions.length) {
    const rdnNum = rndGenerator(view.arrayQuestions.length);
    if (!shuffleQuestions.includes(view.arrayQuestions[rdnNum])) {
      shuffleQuestions.push(view.arrayQuestions[rdnNum]);
    }
  }
  view.arrayQuestions = shuffleQuestions;
}

const view = {
  score: 0,
  // scoreEl: document.querySelector("#q-score"),
  startBtnEl: document.querySelector("#q-btnStart"),
  mainEl: document.querySelector("#q-main"),
  // qWrapperEl: document.querySelector("#q-wrapper"),
  // userQuestionEl: document.querySelector("#q-question"),
  // ulAnswersEl: document.querySelector("#q-ul"),
  arrayQuestions: [],
  qIndex: 0,
  setup() {
    this.mainEl.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const scoreEl = document.createElement("p");
    scoreEl.textContent = `Score ${this.score}`;
    const pQuestion = document.createElement("p");
    pQuestion.textContent = this.arrayQuestions[this.qIndex].question;
    const ulAnswers = document.createElement("ul");
    // this.scoreEl.textContent = this.score;
    for (const answer of this.arrayQuestions[this.qIndex].answers) {
      const liElement = document.createElement("li");
      liElement.textContent = answer;
      ulAnswers.append(liElement);
    }
    fragment.append(scoreEl);
    fragment.append(pQuestion);
    fragment.append(ulAnswers);
    this.mainEl.append(fragment);
    ulAnswers.addEventListener("click", checkAnswer);
  },
}

// const render = (questionToDisplay) => {
//   view.mainEl.innerHTML = "";
//   view.mainEl.append(questionToDisplay);
// }

const checkAnswer = (ev) => {
  const userAnswer = ev.target.textContent;
  let pResult = document.createElement("p");
  if (view.qIndex < view.arrayQuestions[0].correct.length) {
    if (userAnswer === view.arrayQuestions[view.qIndex].correct) {
      console.log("Good!!");
      pResult.classList.add("correct");
      pResult.textContent = `The answer is correct!!!: (${userAnswer})`;
      view.mainEl.append(pResult);
      view.score += 1;
    }
    else {
      pResult.classList.add("wrong");
      pResult.textContent = `Wrong!!!. The correct answer is: ${view.arrayQuestions[view.qIndex].correct}`;
      view.mainEl.append(pResult);
    }
    view.qIndex += 1;
    view.setup();
  }

}


const start = () => {
  // view.scoreEl = 0;
  questionShuffle();
  // view.qWrapperEl.classList.toggle("hide");
  // view.startBtnEl.classList.toggle("hide");
  view.setup();
  // render()

}



// view.ulAnswersEl.addEventListener("click", checkAnswer);
window.addEventListener("load", getData);
view.startBtnEl.addEventListener('click', start);