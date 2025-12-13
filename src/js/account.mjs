import { getAccountById } from "./externalServices.mjs";

export async function getAccountInfo(id) {
    const account = await getAccountById(id);
    console.log(account);
    document.querySelector("#name").innerHTML = `${account.name}`;
    document.querySelector("#email").innerHTML = `${account.username}`;
    document.querySelector("#address").innerHTML = `${account.address}`;
    if (account.token === "admin") {
        document.querySelector("#orders").classList.remove("hide");
    }
}