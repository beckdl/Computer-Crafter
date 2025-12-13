import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { getAccountInfo } from "./account.mjs";

loadHeaderFooter();
const id = getLocalStorage("id");

getAccountInfo(id);

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logoutButton") {
    setLocalStorage("loggedIn", "false");
    localStorage.removeItem("so-token");
    window.location.href = "/index.html";
  }
});