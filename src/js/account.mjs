import { getAccountById } from "./externalServices.mjs";

export async function getAccountInfo(id) {
    const account = getAccountById(id);
    document.querySelector("#name").innerText = account.name;
    document.querySelector("#email").innerText = account.username;
}