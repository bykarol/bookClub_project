export default class Book {
  constructor(data) {
    this.title = data.volumeInfo.title;
    this.authors = data.volumeInfo.authors;
    this.publishedDate = data.volumeInfo.publishedDate;
    this.coverImg = data.imageLinks.thumbnail;
    this.preview = data.previewLink;
  }

  renderWithTemplate(htmlSection) {
    htmlSection.innerHTML = `
    <img
      class="coverBook"
      src="${this.coverImg}
      alt="${this.title}">
    <h2>${this.title}</h2>
    <h3>${this.authors}</h3>
    <h4>Published in ${this.publishedDate}<h4>
    <button
      type="button"
      value="More Info"
      >
    `
  }
}