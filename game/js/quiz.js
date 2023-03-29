async function getData() {
  try {
    const baseURL = "./data/book-data.json";
    let response = await fetch(baseURL);
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
  startBtnEl: document.querySelector("#q-btnStart"),
  userAnswerEl: document.querySelector("#q-answers"),
  scoreElement: document.querySelector("#q-score"),
  arrayQuestions: [],
  // setup() {
  //   const fragmentElement = document.createDocumentFragment;

  // },
  // render() {

  // },
}


const start = () => {
  console.log("array original", view.arrayQuestions);
  questionShuffle();
  console.log("array mezclado", view.arrayQuestions)
  // score = 0;
  // questionShuffle();
  // view.setup();
}





window.addEventListener("load", getData);
view.startBtnEl.addEventListener('click', start);
// console.log(view.shuffleArrayQuestions);
// view.startBtn.addEventListener('click', start);
// view.userAnswer.addEventListener("click", CheckAnswer);