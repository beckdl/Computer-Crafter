import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  if (!product) {
    document.querySelector(".product-detail").classList.add("product-not-found");
    document.querySelector(".product-detail").innerHTML = "<h2>We're Sorry</h2>We could not find that product. Please go back to the <a href='../index.html'>home page</a> and try again.";
    
    return;
  }
  console.log(product);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addProductToCart.bind(null, product));
}

export async function addProductToCart(product) {
    const currentCart = getLocalStorage("so-cart");
    if (!currentCart || currentCart.length === 0) {
      setLocalStorage("so-cart", [product]);
      return;
    }
    currentCart.push(product);
    setLocalStorage("so-cart", currentCart);
}

function renderProductDetails() {
  let area = getParam("product");

  if (area == "prebuilt/" + product._id) {
    document.querySelector("#productName").innerText = product.brand;
    document.querySelector("#productNameWithoutBrand").innerText = product.name;
    document.querySelector("#productImage").src = product.image;
    document.querySelector("#productImage").alt = product.image_name;
    document.querySelector("#productFinalPrice").innerText = product.price;
    document.querySelector("#productColorName").innerText = product.color;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.description;
    document.querySelector("#addToCart").dataset.id = product._id;
  }
  if (area == "comp-repair/" + product._id) {
    document.querySelector("#productNameWithoutBrand").innerText = product.name;
    document.querySelector("#productImage").src = product.image;
    document.querySelector("#productImage").alt = product.image_name;
    document.querySelector("#productFinalPrice").innerText = product.price;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.description;
    document.querySelector("#addToCart").dataset.id = product._id;
  }
  if (area == "soft-dev/" + product._id) {
    document.querySelector("#productNameWithoutBrand").innerText = product.name;
    document.querySelector("#productFinalPrice").innerText = product.price;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.description;
    document.querySelector("#addToCart").dataset.id = product._id;
  }
}