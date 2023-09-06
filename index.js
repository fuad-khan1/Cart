const cart = [];
let totalPrice = 0;

const addToCart = document.querySelectorAll(".add-to-cart");
const totalPriceElement = document.getElementById("total-price");
const cartItemsList = document.getElementById("cart-items");
const cartPrompt = document.querySelector(".cart-section");
const cartButton = document.getElementById("cart-button");

const updateCart = () => {
  cartItemsList.innerHTML = "";
  totalPrice = 0;

  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name} => Price: ${item.price} <button class="rounded-lg p-1 hover:bg-red-500 bg-red-300 text-white mb-2 delete-item" data-index="${index}">Remove</button>`;
    cartItemsList.appendChild(listItem);
    totalPrice += item.price;
  });
  totalPriceElement.innerHTML = `Total: $${totalPrice}`;
  cartButton.innerHTML = `Cart <sup>${cart.length}</sup>`;

  const deleteButtons = document.querySelectorAll(".delete-item");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cart.splice(index, 1);
      updateCart();
    });
  });
};

addToCart.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productName =
      document.querySelectorAll(".card h2")[index].textContent;
    const productPrice = parseFloat(
      document.querySelectorAll(".card p")[index].textContent
    );
    const productIndex = cart.findIndex((item) => item.name === productName);
    if (productIndex === -1) {
      const product = { name: productName, price: productPrice };
      cart.push(product);
      updateCart();
    } else {
      alert("This item is already added");
    }
  });
});

cartButton.addEventListener("click", () => {
  cartPrompt.classList.toggle("hidden");
});
