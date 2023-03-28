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

const view = {
  startBtn: document.querySelector("#q-btnStart"),
  userAnswer: document.querySelector("#q-answers"),
  score: 0,
  arrayQuestions: [],
  render() {

  },

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

const start = () => {
  view.score = 0;
  questionShuffle();
  //construir el state
}





window.addEventListener("load", getData);
view.startBtn.addEventListener('click', start);
// console.log(view.shuffleArrayQuestions);
// view.startBtn.addEventListener('click', start);
// view.userAnswer.addEventListener("click", CheckAnswer);