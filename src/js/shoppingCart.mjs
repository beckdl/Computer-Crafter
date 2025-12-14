import {setLocalStorage, getLocalStorage, renderListWithTemplate } from "./utils.mjs";


export function cartItemTemplate(item) {
  if (item.name === "Basic Computer" || item.name === "Moderate Computer" || item.name === "High End Computer") {
    const newItem = `<li class="cart-card divider">
      <button class="cart-remove" data-id="${item._id}">X</button>
      <a href="#" class="cart-card__image">
        <img
          src="${item.image}"
          alt="${item.image_name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.name}</h2>
      </a>
      <p class="cart-card__color">${item.color}</p>
      <button class="quantity-btn decrease" data-id="${item._id}">–</button>
      <p class="cart-card__quantity">${item.quantity || 1}</p>
      <button class="quantity-btn increase" data-id="${item._id}">+</button>
      <p class="cart-card__price">$${item.price}</p>
    </li>`;

    return newItem;
  }

  if (item.name === "Virus Removal" || item.name === "Computer Setup and Installation" || item.name === "System Speedup") {
    const newItem = `<li class="cart-card divider">
      <button class="cart-remove" data-id="${item._id}">X</button>
      <a href="#" class="cart-card__image">
        <img
          src="${item.image}"
          alt="${item.image_name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.name}</h2>
      </a>
      <button class="quantity-btn decrease" data-id="${item._id}">–</button>
      <p class="cart-card__quantity">${item.quantity || 1}</p>
      <button class="quantity-btn increase" data-id="${item._id}">+</button>
      <p class="cart-card__price">$${item.price}</p>
    </li>`;

    return newItem;
  }

  if (item.name === "Building an Application" || item.name === "Website Building and Management" || item.name === "Hold a Coding Class") {
    const newItem = `<li class="cart-card divider">
      <button class="cart-remove" data-id="${item._id}">X</button>
      <a href="#">
        <h2 class="card__name">${item.name}</h2>
      </a>
      <button class="quantity-btn decrease" data-id="${item._id}">–</button>
      <p class="cart-card__quantity">${item.quantity || 1}</p>
      <button class="quantity-btn increase" data-id="${item._id}">+</button>
      <p class="cart-card__price">$${item.price}</p>
    </li>`;

    return newItem;
  }
}

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty</p>";
    const total = calculateListTotal(cartItems);
    displayCartTotal(total);
    return;
  }
  const el = document.querySelector(".product-list")
  renderListWithTemplate(cartItemTemplate, el, cartItems);

  // Attach remove listeners
  const removeButtons = el.querySelectorAll(".cart-remove");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      removeCartItem(id);
      location.reload();
    });
  });

  // Increase quantity
  el.querySelectorAll(".quantity-btn.increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      updateCartItemQuantity(id, 1); // add 1
      location.reload();
    });
  });

  // Decrease quantity
  el.querySelectorAll(".quantity-btn.decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      updateCartItemQuantity(id, -1); // subtract 1
      location.reload();
    });
  });
  
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
}

function displayCartTotal(total) {
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText += ` $${total}`;
  } else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}

function removeCartItem(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter(item => item._id != id); // remove the clicked item
  localStorage.setItem("so-cart", JSON.stringify(cartItems)); // update storage
  renderCartContents(); // re-render cart
}

function updateCartItemQuantity(id, change) {
  let cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems.find(item => item._id === id);

  if (!item) return;

  item.quantity = (item.quantity || 1) + change;

  // Remove if quantity drops below 1
  if (item.quantity < 1) {
    cartItems = cartItems.filter(i => i._id !== id);
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // refresh UI
}

function calculateListTotal(list) {
  if (!list || list.length === 0) {
    return 0;
  } else {
    const amounts = list.map(item => (item.price || 0) * (item.quantity || 1));
    const total = Number(
      amounts.reduce(
      (sum, amt) => sum + (parseFloat(String(amt).replace(/[^0-9.-]+/g, "")) || 0),
      0
      ).toFixed(2)
    );
    return total;
  }
}

//amounts.reduce((sum, item) => sum + item, 0);