import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { getAccountInfo } from "./account.mjs";

loadHeaderFooter();
const id = sessionStorage.getItem("id");

getAccountInfo(id);



document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logoutButton") {
    sessionStorage.removeItem("loggedIn", "false");
    sessionStorage.removeItem("so-token");
    sessionStorage.removeItem("id");
    window.location.href = "/index.html";
  }
});