"use-strict"
// import { storeData } from "./bookData";
// const data = getData();
async function getData() {
  try {
    const baseURL = "./data/book-data.json";
    let response = await fetch(baseURL);
    let bookData = await response.json();
    return bookData;
  } catch (error) {
    console.error("Error:: ", error.message);
  }
  finally {
    console.log("Fetch completed");
  }
}

const view = {
  startBtn: document.querySelector("#q-btnStart"),
  userAnswer: document.querySelector("#q-answers"),
  score: 0,
  arrayQuestions: [],
  shuffleArrayQuestions: [],
  // questionsLenght: 10, //update this date if I added another question to the json
}

const questionExtractor = () => {
  getData().then((questions) => {
    questions.forEach(element => {
      view.arrayQuestions.push(element);
    });
  });
}

const rndGenerator = () => {
  return Math.floor(Math.random() * (view.arrayQuestions.length + 1));
}

const questionShuffle = () => {
  let newArray = [];
  while (newArray.length < view.arrayQuestions.length) {
    const rdnNum = rndGenerator();
    let i = 0;
    if (!newArray.includes(view.arrayQuestions[rdnNum]) && view.arrayQuestions[rdnNum] !== undefined) {
      newArray.push(view.arrayQuestions[rdnNum]);
      i++;
    }
  }
  view.shuffleArrayQuestions = newArray;
}

const start = () => {
  questionShuffle();
  console.log("Original: ", view.arrayQuestions);
  console.log("shuffle", view.shuffleArrayQuestions);
  questionShuffle();
  console.log("shuffle2", view.shuffleArrayQuestions);
}



window.addEventListener("load", questionExtractor);
// console.log(view.shuffleArrayQuestions);
view.startBtn.addEventListener('click', start);
// view.startBtn.addEventListener('click', start);
// view.userAnswer.addEventListener("click", CheckAnswer);