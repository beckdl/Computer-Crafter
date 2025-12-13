import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector) {
  try {
    const orders = await getOrders();
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

function orderTemplate(order) {
  return `<tr>
  <td>${order.fname}</td>
  <td>${order._id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${order.items.length}</td>
  <td>${order.orderTotal}</td></tr>`;
}