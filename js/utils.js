import ExternalServices from "./ExternalServices";
import BookList from "./BookList";

export async function searchBook(searchInput, htmlSection) {
  htmlSection.innerHTML = "";
  const search = new ExternalServices(searchInput);
  const volumeBook = await search.getData();
  return volumeBook;
}

export function renderList(booksData, htmlSection) {
  for (const book of booksData) {
    const list = new BookList(book);
    list.prepareList(htmlSection);
  }
}