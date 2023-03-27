// import { questionExtractor } from "./quiz.js"
// export default async function getData() {
//   try {
//     const baseURL = "./data/book-data.json";
//     let response = await fetch(baseURL);
//     let bookData = await response.json();
//     questionExtractor(bookData);
//     return bookData;
//   } catch (error) {
//     console.error("Error:: ", error.message);
//   }
//   finally {
//     console.log("Fetch completed");
//   }
// }