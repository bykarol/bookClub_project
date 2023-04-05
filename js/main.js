//ExternalServices module
async function getData() {
  try {
    //Google Books api
    const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    let response = await fetch(baseURL + view.searchParam);
    let bookData = await response.json();
    // bookData.items[0].volumeInfo;
    let hardData = await bookData.items;
    volumeInfoExtractor(hardData);
    return hardData;
  } catch (error) {
    console.error("ERROR:::: ", error.message);
  } finally {
    console.log("Fetch completed");
  }
}

const localstorage = window.localStorage.getItem("favoritesBooks");
//main module (my Library project home page)
const view = {
  menuBtn: document.querySelector("#menuIcon"),
  htmlNav: document.querySelector("nav"),
  htmlMain: document.querySelector("main"),
  searchBtn: document.querySelector("#submitBtn"),
  inputUserEl: document.querySelector("#searchIn"),
  htmlSection: document.createElement("section"),
  searchParam: "",
  volumeInfo: [],
  myFavorites: localstorage ? JSON.parse(localstorage) : [],
}

const search = (e) => {
  e.preventDefault();
  view.volumeInfo = [];
  const inputSearch = view.inputUserEl.value;
  const inputSearch2 = inputSearch.trim().split(" ").join("+");
  if (inputSearch2 !== "" && inputSearch2 !== " ") {
    view.searchParam = inputSearch2;
    getData();
  } else {
    console.log("Include a book title");
  }
}

// //utils module
function volumeInfoExtractor(itemsData) {
  for (const volume of itemsData) {
    view.volumeInfo.push(volume.volumeInfo);
  }
  prepareList(view.volumeInfo);
}

//Book List class
function prepareList(data) {
  const fragment = document.createDocumentFragment();
  data.forEach(finalData => {
    try {
      const bookObj = {
        title: finalData.title ? finalData.title : "N/A",
        publisher: finalData.publisher ? finalData.publisher : "N/A",
        description: finalData.description ? finalData.description : "N/A",
        publishedDate: finalData.publishedDate ? finalData.publishedDate : "N/A",
        //preview: "N/A",
        coverImg: "../images/cover-placeholder.png",
        authors: finalData.authors,
        like: false,
      }
      if (finalData.imageLinks) {
        if (finalData.imageLinks.thumbnail) {
          bookObj.coverImg = finalData.imageLinks.thumbnail;
        }
        else {
          bookObj.coverImg = finalData.imageLinks.smallThumbnail;
        }
      }
      //it could be several authors
      const authorFragment = document.createDocumentFragment();
      if (bookObj.authors.length > 1) {
        for (let i = 0; i < bookObj.authors.length; i++) {
          const authorEl = document.createElement("h3");
          authorEl.textContent = `Author: ${bookObj.authors[i]}`;
          authorFragment.append(authorEl);
        }
      } else {
        const authorEl = document.createElement("h3");
        authorEl.textContent = `By ${bookObj.authors[0]}`;
        authorFragment.append(authorEl);
      }
      //create html elements and setting attributes and values
      const imgEl = document.createElement("img");
      imgEl.classList.add("coverBook");
      imgEl.setAttribute("src", `${bookObj.coverImg}`);
      imgEl.setAttribute("alt", `${bookObj.title}`);
      const titleEl = document.createElement("h2");
      titleEl.textContent = bookObj.title;
      const publishedEl = document.createElement("h4");
      publishedEl.textContent = `Published by ${bookObj.publisher}. (${bookObj.publishedDate})`;
      const descriptionBtn = document.createElement("button");
      const descriptionBtnX = document.createElement("button");
      descriptionBtnX.classList.add("hide");
      descriptionBtnX.classList.add("btnX");
      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("hide");
      descriptionElement.textContent = bookObj.description;
      descriptionBtn.textContent = "Book Description";
      descriptionBtnX.textContent = "X";
      const likeElement = document.createElement("img");
      likeElement.setAttribute("src", "./images/heart.png")
      likeElement.setAttribute("alt", "dislike button");
      likeElement.setAttribute("title", "Add to favorites");
      likeElement.classList.add("likeBtn");
      const dislikeElement = document.createElement("img");
      dislikeElement.setAttribute("src", "./images/heartFilled.png");
      dislikeElement.setAttribute("alt", "like button");
      dislikeElement.setAttribute("title", "Dislike");
      dislikeElement.classList.add("hide");
      dislikeElement.classList.add("likeBtn");
      //append in this order into the fragment
      fragment.append(titleEl);
      fragment.append(authorFragment);
      fragment.append(imgEl);
      fragment.append(likeElement);
      fragment.append(dislikeElement);
      fragment.append(descriptionBtn);
      fragment.append(descriptionBtnX);
      fragment.append(descriptionElement);
      fragment.append(publishedEl);

      //event handlers like btn and see description
      descriptionBtn.addEventListener("click", () => {
        descriptionBtn.classList.toggle("hide");
        descriptionBtnX.classList.toggle("hide");
        descriptionElement.classList.toggle("hide");
      });
      descriptionBtnX.addEventListener("click", () => {
        descriptionBtn.classList.toggle("hide");
        descriptionBtnX.classList.toggle("hide");
        descriptionElement.classList.toggle("hide");
      });
      likeElement.addEventListener("click", () => {
        likeElement.classList.toggle("hide");
        dislikeElement.classList.toggle("hide");
        bookObj.like = true;
        addBook(bookObj);
      });
      dislikeElement.addEventListener("click", () => {
        dislikeElement.classList.toggle("hide");
        likeElement.classList.toggle("hide");
        bookObj.like = false;
        saveBook();
        clearBook(bookObj);
      });
    } catch (error) {
      console.log(error.message)
    }
  });
  render(fragment);
}

function render(displayInfo) {
  try {
    view.htmlMain.innerHTML = "";
    view.htmlSection.innerHTML = "";
    view.htmlSection.classList.add("bookSection");
    view.htmlSection.append(displayInfo);
    view.htmlMain.append(view.htmlSection);
  } catch (error) {
    console.error(error.message);
  }
}

view.searchBtn.addEventListener("click", search);
view.menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  view.htmlNav.classList.toggle("open");
});

//Localstorage implementation (my Favorites)
const clearBook = (obj) => {
  view.myFavorites.forEach((book, index) => {
    if (book.title === obj.title && book.publisher === obj.publisher && book.publishedDate === obj.publishedDate) {
      view.myFavorites.splice(index, 1);
    }
  });
  saveBook();
}

const addBook = (obj) => {
  view.myFavorites.push(obj);
  saveBook();
}

const saveBook = () => {
  const favoritesJson = JSON.stringify(view.myFavorites);
  window.localStorage.setItem("favoritesBooks", favoritesJson);
}

const deleteBook = (obj) => {
  view.myFavorites.forEach((book, index) => {
    if (book.title === obj.title && book.publisher === obj.publisher && book.publishedDate === obj.publishedDate) {
      view.myFavorites.splice(index, 1);
    }
  });
  saveBook();
  if (view.myFavorites.length === 0) {
    location.reload();
  }
  showFavorites();
}

function prepareFavorites(data) {
  const fragment = document.createDocumentFragment();
  data.forEach(element => {
    try {
      const favbookObj = {
        title: element.title,
        publisher: element.publisher,
        description: element.description,
        publishedDate: element.publishedDate,
        coverImg: element.coverImg,
        authors: element.authors,
        like: element.like,
      }

      //it could be several authors
      const authorFragment = document.createDocumentFragment();
      if (favbookObj.authors.length > 1) {
        for (let i = 0; i < favbookObj.authors.length; i++) {
          const authorEl = document.createElement("h3");
          authorEl.textContent = `Author: ${favbookObj.authors[i]}`;
          authorFragment.append(authorEl);
        }
      } else {
        const authorEl = document.createElement("h3");
        authorEl.textContent = `By ${favbookObj.authors[0]}`;
        authorFragment.append(authorEl);
      }
      //create html elements and setting attributes and values
      const imgEl = document.createElement("img");
      imgEl.classList.add("coverBook");
      imgEl.setAttribute("src", `${favbookObj.coverImg}`);
      imgEl.setAttribute("alt", `${favbookObj.title}`);
      const titleEl = document.createElement("h2");
      titleEl.textContent = favbookObj.title;
      const publishedEl = document.createElement("h4");
      publishedEl.textContent = `Published by ${favbookObj.publisher}. (${favbookObj.publishedDate})`;
      const descriptionBtn = document.createElement("button");
      const descriptionBtnX = document.createElement("button");
      descriptionBtnX.classList.add("hide");
      descriptionBtnX.classList.add("btnX");
      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("hide");
      descriptionElement.textContent = favbookObj.description;
      descriptionBtn.textContent = "Book Description";
      descriptionBtnX.textContent = "X";
      const dislikeElement = document.createElement("img");
      dislikeElement.setAttribute("src", "./images/heartFilled.png");
      dislikeElement.setAttribute("alt", "like button");
      dislikeElement.setAttribute("title", "Dislike");
      dislikeElement.classList.add("likeBtn");
      //append in this order into the fragment
      fragment.append(titleEl);
      fragment.append(authorFragment);
      fragment.append(imgEl);
      fragment.append(dislikeElement);
      fragment.append(descriptionBtn);
      fragment.append(descriptionBtnX);
      fragment.append(descriptionElement);
      fragment.append(publishedEl);

      //event handlers like btn and see description
      descriptionBtn.addEventListener("click", () => {
        descriptionBtn.classList.toggle("hide");
        descriptionBtnX.classList.toggle("hide");
        descriptionElement.classList.toggle("hide");
      });
      descriptionBtnX.addEventListener("click", () => {
        descriptionBtn.classList.toggle("hide");
        descriptionBtnX.classList.toggle("hide");
        descriptionElement.classList.toggle("hide");
      });
      dislikeElement.addEventListener("click", () => {
        dislikeElement.classList.toggle("hide");
        favbookObj.like = false;
        deleteBook(favbookObj);
      });
    } catch (error) {
      console.log(error.message)
    }
  });
  render(fragment);
}

function renderFavorites(data) {
  const mainMyfav = document.querySelector("#myFav");
  mainMyfav.append(data);
}

const showFavorites = () => {
  if (view.myFavorites.length !== 0) {
    prepareFavorites(view.myFavorites);
  }
}



