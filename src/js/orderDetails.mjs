import { getOrderById } from "./externalServices.mjs";

export async function loadOrderDetails() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order");
  const response = await getOrderById(orderId);
  document.querySelector("#orderHeader").innerText = `Order ${response._id}`;
  document.querySelector("#order-date").innerText = new Date(
    response.orderDate
  ).toLocaleDateString("en-US");
  document.querySelector("#order-name").innerText = response.fname + " " + response.lname;
  document.querySelector("#order-address").innerText = response.street + ", " + response.city + ", " + response.state + " " + response.zip;
    const itemsParent = document.querySelector("#order-items tbody");
    itemsParent.innerHTML = response.items.map((item) => {
      if (item.customerInput) {
        document.querySelector("#notes").classList.remove("hide");
        return `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.customerInput}</td>
        </tr>`;
      } else {
        return `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        </tr>`;
      }
    }).join("");
  document.querySelector("#order-total").innerText = `$${response.orderTotal}`;
}