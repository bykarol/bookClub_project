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

//main module
const view = {
  menuBtn: document.querySelector("#menuIcon"),
  htmlNav: document.querySelector("nav"),
  htmlMain: document.querySelector("main"),
  searchBtn: document.querySelector("#submitBtn"),
  inputUserEl: document.querySelector("#searchIn"),
  htmlSection: document.createElement("section"),
  searchParam: "",
  volumeInfo: [],
  myFavorites: [],
  // saveBook(book) {

  // },
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

function testing(text, something) { //clear
  console.log(text, something);
}

// //utils module
function volumeInfoExtractor(itemsData) {
  for (const volume of itemsData) {
    view.volumeInfo.push(volume.volumeInfo);
  }
  prepareList();
}

//Book List class
function prepareList() {
  const fragment = document.createDocumentFragment();
  view.volumeInfo.forEach(finalData => {
    try {
      let title = "N/A";
      let publisher = "N/A";
      let description = "N/A";
      let publishedDate = "N/A";
      // let preview = "N/A";

      if (finalData.title) {
        title = finalData.title;
      }
      if (finalData.publisher) {
        publisher = finalData.publisher;
      }
      if (finalData.description) {
        description = finalData.description;
      }
      if (finalData.publishedDate) {
        publishedDate = finalData.publishedDate;
      }
      // if (finalData.previewLink) {
      //   preview = finalData.previewLink;
      // }
      let coverImg;
      if (finalData.imageLinks) {
        if (finalData.imageLinks.thumbnail) {
          coverImg = finalData.imageLinks.thumbnail;
        }
        else {
          coverImg = finalData.imageLinks.smallThumbnail;
        }
      } else {
        coverImg = "../images/cover-placeholder.png";
      }
      let authors = finalData.authors;
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
      const descriptionBtn = document.createElement("button");
      const descriptionBtnX = document.createElement("button");
      descriptionBtnX.classList.add("hide");
      descriptionBtnX.classList.add("btnX");
      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("hide");
      descriptionElement.textContent = description;
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

      //event handlers
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
        // saveBook();
        likeElement.classList.toggle("hide");
        dislikeElement.classList.toggle("hide");
      });
      dislikeElement.addEventListener("click", () => {
        dislikeElement.classList.toggle("hide");
        likeElement.classList.toggle("hide");
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


