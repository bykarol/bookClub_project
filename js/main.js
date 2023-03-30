//ExternalServices module
async function getData() {
  try {
    //Google Books api
    const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    let response = await fetch(baseURL + view.searchParam);
    let bookData = await response.json();
    // bookData.items[0].volumeInfo;
    let hardData = await bookData.items;
    renderList(hardData);
    return bookData;
  } catch (error) {
    console.error("ERROR:::: ", error.message);
    const alertMessage = document.createElement("p");
    alertMessage.textContent = "Not Found!! Try another title or author";
    alertMessage.classList.add("alert");
    view.htmlMain.innerHTML = "";
    view.htmlMain.prepend(alertMessage);

  } finally {
    console.log("Fetch completed");
  }
}

//main module
const view = {
  htmlMain: document.querySelector("main.flex"),
  searchBtn: document.querySelector("#submitBtn"),
  inputUserEl: document.querySelector("#searchIn"),
  searchParam: "",
  data: [],
  volumeList: [],
}

const search = (e) => {
  e.preventDefault();
  view.volumeList = [];
  const inputSearch = view.inputUserEl.value;
  const inputSearch2 = inputSearch.trim();
  if (inputSearch2 !== "" && inputSearch2 !== " ") {
    view.searchParam = inputSearch2;
    getData();
  } else {
    console.log("Include a book title");
  }
}

// //utils module
function renderList(itemsData) {
  view.data = itemsData;
  for (const volume of view.data) {
    view.volumeList.push(volume);
  }
  prepareList();
}

//Book List class
function prepareList() {
  const fragment = document.createDocumentFragment();
  view.volumeList.forEach(finalData => {
    //store data
    const title = finalData.volumeInfo.title;
    const publisher = finalData.volumeInfo.publisher;
    // const description = finalData.volumeInfo.description;
    const publishedDate = finalData.volumeInfo.publishedDate;
    // const preview = finalData.volumeInfo.previewLink;
    let coverImg;
    if (!finalData.volumeInfo.imageLinks) {
      coverImg = "../images/cover-placeholder.png";
    } else {
      coverImg = finalData.volumeInfo.imageLinks.thumbnail;
    }
    let authors = finalData.volumeInfo.authors;
    const authorFragment = document.createDocumentFragment();
    if (authors.length > 1) {
      for (let i = 0; i < authors.length; i++) {
        const authorEl = document.createElement("h3");
        authorEl.textContent = `Author: ${authors[i]}`;
        authorFragment.append(authorEl);
      }
    } else {
      const authorEl = document.createElement("h3");
      authorEl.textContent = `By ${authors[0]}`;
      authorFragment.append(authorEl);
    }
    //create html elements and setting attributes and values
    const imgEl = document.createElement("img");
    imgEl.classList.add("coverBook");
    imgEl.setAttribute("src", `${coverImg}`);
    imgEl.setAttribute("alt", `${title}`);
    const titleEl = document.createElement("h2");
    titleEl.textContent = title;
    const publishedEl = document.createElement("h4");
    publishedEl.textContent = `Published by ${publisher}. (${publishedDate})`;
    fragment.append(imgEl);
    fragment.append(titleEl);
    fragment.append(authorFragment);
    fragment.append(publishedEl);
  })
  render(fragment);
}

function render(htmlElements) {
  view.htmlMain.innerHTML = "";
  const htmlSection = document.createElement("section");
  htmlSection.append(htmlElements);
  view.htmlMain.append(htmlSection)
}

view.searchBtn.addEventListener("click", search);


