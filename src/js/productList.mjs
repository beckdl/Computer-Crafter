import { getProductsByCategory } from './externalServices.mjs';
import { renderListWithTemplate } from "./utils.mjs";
import { getParam } from "./utils.mjs";

function productCardTemplate(product) {
  let category = getParam("category");
  if (category === "prebuilt") {
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${category}/${product._id}">
      <img
        src="${product.image}"
        alt="Image of ${product.image_name}"
      />
      <h3 class="card__brand">${product.brand}</h3>
      <h2 class="card__name">${product.name}</h2>
      <p class="product-card__price">$${product.price}</p></a>
      </li>`;
  }
  if (category === "comp-repair") {
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${category}/${product._id}">
      <img
        src="${product.image}"
        alt="Image of ${product.image_name}"
      />
      <h2 class="card__name">${product.name}</h2>
      <p class="product-card__price">$${product.price}</p></a>
      </li>`;
  }
  if (category === "soft-dev") {
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${category}/${product._id}">
      <h2 class="card__name">${product.name}</h2>
      <p class="product-card__price">$${product.price}</p></a>
      </li>`;
  }
  
}

export default async function productList(selector, category){
    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    // get the list of products 
    const products = await getProductsByCategory(category);
    //render out the product list to the element 
    renderListWithTemplate(productCardTemplate, el, products);
    document.querySelector(".title").innerHTML = category
      .replaceAll("-", " ")
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
}

function productDiscount (product) {
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const retailPrice = product.SuggestedRetailPrice;
    const finalPrice = product.FinalPrice;
    const discount = Math.round(((retailPrice - finalPrice) / retailPrice) * 100);
    return discount;
  }
}


  