async function getData() {
  try {
    const baseURL = "./data/book-data.json";
    let response = await fetch(baseURL);
    if (!response.ok) {
      console.log("Cannot get the data");
      return [];
    }
    let bookData = await response.json();
    return bookData;
  } catch (error) {
    console.error("Error:: ", error.message);
  }
  finally {
    console.log("Fetch completed");
  }
}

const rndGenerator = (max) => {
  return Math.floor(Math.random() * (max));
}

/*Using Fisher–Yates algorithm Explained in spanish
 https://www.youtube.com/watch?v=0eKNvuPNLos*/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = rndGenerator(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
  qtyQuestions: 10,
  spotsInRanking: 5,
  inputName() {
    const userNameElement = document.querySelector("#username");
    if (userNameElement.value) {
      this.userName = userNameElement.value;
    }
    else {
      this.userName = "Unknown";
    }
  },
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
  if (userAnswer === view.arrayQuestions[view.qIndex].correct) {
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
  //displaying just till n quantity of questions
  if (view.qIndex < view.qtyQuestions) { //check
    view.setup();
  }
  //filling the ranking
  if (view.qIndex === view.qtyQuestions) {
    if (view.arrayScores.length < view.spotsInRanking) {
      view.arrayScores.push(view.score);
    }
    else {
      for (let i = 0; i < view.arrayScores.length; i++) {
        if (view.score > view.arrayScores[i]) {
          view.arrayScores.pop();
          view.arrayScores.push(view.score);
        }
      }
    }
    // saveScoreInLocalStorage();
    view.orderRanking();
    gameOver();
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
    h3Element.textContent = `Ranking Top ${view.spotsInRanking}`;
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
  scoreElement.textContent = `Your Score: ${view.score}/${view.qtyQuestions}`;
  lastFragment.append(scoreElement);
  lastFragment.append(h3Element);
  lastFragment.append(olScores);
  lastFragment.append(buttonElement);
  view.mainEl.append(lastFragment);
  buttonElement.addEventListener("click", playAgain);
}

const playAgain = async (e) => {
  e.preventDefault();
  //reset values
  view.reset();
  //shuffle again
  view.arrayQuestions = shuffleArray(await getData());
  view.arrayQuestions.forEach(question => {
    shuffleArray(question.answers);
  });
  //display again
  view.setup();
}

const start = async () => {
  //Filling the array of questions with shuffled data
  view.arrayQuestions = shuffleArray(await getData());
  //shuffling the answers as well
  view.arrayQuestions.forEach(question => {
    shuffleArray(question.answers);
  });
  //Setting the player name
  view.inputName();
  //displaying the info
  view.setup();
}

view.startBtnEl.addEventListener('click', start);