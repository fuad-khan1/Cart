const cart = [];
let totalPrice = 0;

const addToCart = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.getElementById("cart-items");

const updateCart = () => {
  cartItemsList.innerHTML = "";

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name}`;
    cartItemsList.appendChild(listItem);
  });
};

addToCart.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productName =
      document.querySelectorAll(".card h2")[index].textContent;
    const product = { name: productName };
    cart.push(product);
    updateCart();
  });
});
