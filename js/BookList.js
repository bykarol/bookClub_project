import Book from "./Book.js"

export default class BookList {
  constructor(volumeData) {
    this.list = volumeData;
  }

  prepareList(htmlSection) {
    this.list.forEach(item => {
      const book = new Book(item.items);
      book.renderWithTemplate(htmlSection);
    });
  }
}