// export default async function getData() {
//   try {
//     const baseURL = "./data/book-data.json";
//     const response = await fetch(baseURL);
//     const bookData = await response.json();
//     return bookData;
//   } catch (error) {
//     console.error("Error:: ", error.message);
//   }
//   finally {
//     console.log("Fetch completed");
//   }
// }
// export const data = async function () {
//   return getData();
// }