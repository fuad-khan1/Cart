const cart = [];
let totalPrice = 0;

const totalPriceElement = document.getElementById("total-price");
const cartItemsList = document.getElementById("cart-items");
const cartPrompt = document.querySelector(".cart-section");
const productSection = document.getElementById("product-section");
const cartButton = document.getElementById("cart-button");


 //------Update cart function ---------//
const updateCart = () => {
  cartItemsList.innerHTML = "";
  totalPrice = 0;

  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <img src="${item.thumbnail}" alt="image">
    <p>${item.name} $${item.price} <button class="rounded-lg p-1 hover:bg-red-500 bg-red-300 text-white mb-2 delete-item" data-index="${index}">Remove</button></p>

     
      `;
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

//------- data fetching ---------------//
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log("Data=>", data);
    productSection.innerHTML = "";

    const productsToDisplay = data.products.slice(0, 6);

    productsToDisplay.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "card w-80 rounded shadow-lg";
      card.innerHTML = `
      <img id="Product-img" src="${product.thumbnail}" alt="Product img" class="w-full h-48 object-cover rounded-t-lg">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">${product.title}</h2>
        <p>Rating: ${product.rating}</p>
        <p class="mt-2">$${product.price}</p>
        <button class="add-to-cart mt-4 bg-blue-400 text-white hover:bg-blue-600 px-4 py-2 rounded-full" data-index="${index}">Add to Cart</button>
      </div>
      
    
      `;

      productSection.appendChild(card);
      const addToCartButton = card.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
        // const productImg = document.getElementById("Product-img");

        const productName = product.title;
        const productPrice = product.price;
        const productIndex = cart.findIndex(
          (item) => item.name === productName
        );
        if (productIndex === -1) {
          const product = {
            name: productName,
            price: productPrice,
            // image: productImg,
          };
          cart.push(product);
          updateCart();
        } else {
          alert("This item is already added");
        }
      });
    });
  });

  // ---------  -------//
cartButton.addEventListener("click", () => {
  cartPrompt.classList.toggle("hidden");
});
