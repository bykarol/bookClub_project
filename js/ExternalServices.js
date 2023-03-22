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
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error("ERROR: ", error.message);
    } finally {
      console.log(this.data)
    }
  }
}
