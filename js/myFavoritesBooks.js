import { showFavorites } from "./main";
const localstorage = window.localStorage.getItem("favoritesBooks");

showFavorites(localstorage);