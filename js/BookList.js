import Book from "./Book.js"

export default class BookbookData {
  constructor(volumeData) {
    this.list = volumeData.items;
  }

  prepareList(htmlSection) {
    this.list.forEach(item => {
      const book = new Book(item);
      book.renderWithTemplate(htmlSection);
    });
  }
}