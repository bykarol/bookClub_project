import ExternalServices from "./ExternalServices";
import BookList from "./BookList";

export async function searchBook(htmlSection, searchInput) {
  htmlSection.innerHTML = "";
  let search = new ExternalServices(searchInput);
  await search.getData();
  return search.data;

}

export function renderList(booksData, htmlSection) {
  const list = new BookList(booksData);
  list.prepareList(htmlSection);
}