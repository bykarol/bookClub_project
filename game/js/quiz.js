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
  while (shuffleQuestions.length < view.qtyQuestions) {
    const rdnNum = rndGenerator(view.arrayQuestions.length);
    if (!shuffleQuestions.includes(view.arrayQuestions[rdnNum])) {
      shuffleQuestions.push(view.arrayQuestions[rdnNum]);
    }
  }
  view.arrayQuestions = shuffleQuestions;
}

// const localstorage = window.localStorage.getItem("rankingScores");
const view = {
  // arrayScores: localstorage ? JSON.parse(localstorage).rankingScores : [],
  // arrayRanking: [],
  score: 0,
  arrayScores: [],
  startBtnEl: document.querySelector("#q-btnStart"),
  mainEl: document.querySelector("#q-main"),
  answerChecked: undefined,
  arrayQuestions: [],
  qIndex: 0,
  userName: undefined,
  qtyQuestions: 6,
  setup() {
    this.mainEl.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const scoreEl = document.createElement("p");
    scoreEl.textContent = `Score: ${this.score}`;
    const pQuestion = document.createElement("p");
    pQuestion.textContent = this.arrayQuestions[this.qIndex].question;
    const ulAnswers = document.createElement("ul");
    for (const answer of this.arrayQuestions[this.qIndex].answers) {
      const liElement = document.createElement("li");
      liElement.textContent = answer;
      ulAnswers.append(liElement);
    }
    fragment.append(scoreEl);
    fragment.append(pQuestion);
    fragment.append(ulAnswers);
    if (this.answerChecked !== undefined) {
      fragment.append(this.answerChecked);
    }
    this.mainEl.append(fragment);
    ulAnswers.addEventListener("click", (e) => {
      if (e.target.matches("li")) {
        checkAnswer(e);
      }
    });
  },
  reset() {
    this.qIndex = 0;
    this.score = 0;
    this.answerChecked = undefined;
  },
  inputName() {
    const userNameElement = document.querySelector("#username");
    if (userNameElement.value) {
      this.userName = userNameElement.value;
    }
    else {
      this.userName = "Unknown";
    }
  },
  orderRanking() {
    this.arrayScores.sort((a, b) => {
      return b - a;
    })
  },
}

// const saveScoreInLocalStorage = () => {
//   const rankingStringify = JSON.stringify(view.arrayRanking);
//   window.localStorage.setItem("rankingScores", rankingStringify);
// }

const checkAnswer = (ev) => {
  const userAnswer = ev.target.textContent;
  let pResult = document.createElement("p");
  if (view.qIndex < view.arrayQuestions.length) {
    if (userAnswer === view.arrayQuestions[view.qIndex].correct) {
      // console.log("Good!!");
      pResult.classList.add("correct");
      pResult.textContent = `The answer is correct!!!: (${userAnswer})`;
      view.answerChecked = pResult;
      view.score += 1;
    }
    else {
      pResult.classList.add("wrong");
      pResult.textContent = `Wrong!!!. The correct answer is: ${view.arrayQuestions[view.qIndex].correct}`;
      view.answerChecked = pResult;
    }
    view.qIndex += 1;
    view.setup();
    if (view.qIndex === view.arrayQuestions.length - 1) {
      if (view.arrayScores.length < 5) {
        view.arrayScores.push(view.score);
      }
      else {
        view.arrayScores.pop();
        view.arrayScores.push(view.score);
      }
      // saveScoreInLocalStorage();
      view.orderRanking();
      gameOver();
    }
  }
}

const gameOver = () => {
  view.mainEl.innerHTML = "";
  const lastFragment = document.createDocumentFragment();
  const buttonElement = document.createElement("button");
  const scoreElement = document.createElement("p");
  const olScores = document.createElement("ol");
  const h3Element = document.createElement("h3");
  if (view.arrayScores.length > 0) {
    h3Element.textContent = "Ranking Top 5";
    for (let i = 0; i < view.arrayScores.length; i++) {
      const liScoreElement = document.createElement("li");
      liScoreElement.textContent = `#${i + 1} - ${view.userName} - score: ${view.arrayScores[i]}`;
      liScoreElement.classList.add("finalScoreList");
      olScores.append(liScoreElement);
      //push into the array ranking to save it in localstorage
      // view.arrayRanking.push(liScoreElement.textContent);
    }
  }
  buttonElement.textContent = "Play Again";
  buttonElement.classList.add("button");
  scoreElement.textContent = `Your Score: ${view.score}/${view.qtyQuestions - 1}`;
  lastFragment.append(scoreElement);
  lastFragment.append(h3Element);
  lastFragment.append(olScores);
  lastFragment.append(buttonElement);
  view.mainEl.append(lastFragment);
  buttonElement.addEventListener("click", playAgain);
}

const playAgain = (e) => {
  e.preventDefault();
  view.reset();
  questionShuffle();
  view.setup();
}

const start = () => {
  view.inputName();
  questionShuffle();
  view.setup();
}


window.addEventListener("load", getData);
view.startBtnEl.addEventListener('click', start);