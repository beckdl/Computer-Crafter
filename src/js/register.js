import { register } from "./externalServices.mjs";
import { getParam, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();
const redirect = getParam("redirect") ?? "../login/index.html";

document.querySelector("#registerButton").addEventListener("click", (e) => {
  const name = document.querySelector("#regName").value;
  const address = document.querySelector("#regAddress").value;
  const username = document.querySelector("#regEmail").value;
  const password = document.querySelector("#regPassword").value;
  const token = "customer";
  const options = { username, password, token, name, address};
  register(options).then(() => {
    location.assign(redirect);
  });
});

