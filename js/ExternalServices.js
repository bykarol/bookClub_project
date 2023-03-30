export default class ExternalServices {
  constructor(txt) {
    this.searchValue = txt;
    this.data = null;
  }

  async getData() {
    try {
      //Google Books api
      const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
      let response = await fetch(baseURL + this.searchValue);
      let bookData = await response.json();
      // bookData.items[0].volumeInfo;
      this.data = await bookData.items;
      return this.data;
    } catch (error) {
      console.error("ERROR:::: ", error.message);
    } finally {
      console.log("Fetch completed");
    }
  }
}

const inputUserEl = document.querySelector("#searchIn");
const searchBtn = document.querySelector("#submitBtn");


searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputUserValue = inputUserEl.value;
  const searchParameter = inputUserValue.split(" ").join("+");

  const book = new ExternalServices(searchParameter);
  await book.getData();

  for (const volumeBook of book.data) {

    console.log(volumeBook.volumeInfo);
  }


  // // console.log(bookVolume);
  // for (const book of bookVolume.items) {
  //   console.log(book.volumeInfo)

  // }
})



