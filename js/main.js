import { searchBook, renderList } from "./utils"

const form = document.querySelector("#searchForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchValue = document.querySelector("#searchIn").value;
  const htmlSection = document.querySelector(".bookList");
  const data = await searchBook(htmlSection, searchValue);
  renderList(data, htmlSection);
});