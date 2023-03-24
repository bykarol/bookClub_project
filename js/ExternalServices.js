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
      this.data = await bookData;
      return this.data;
    } catch (error) {
      console.error("ERROR:::: ", error.message);
    } finally {
      console.log("Fetch completed");
    }
  }
}

// let book = new ExternalServices("harry potter y la camara secreta");
// const bookVolume = await book.getData();

// // console.log(bookVolume);
// for (const book of bookVolume.items) {
//   console.log(book.volumeInfo)

// }
