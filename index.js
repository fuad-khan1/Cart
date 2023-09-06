const cart = [];
let totalPrice = 0;

const totalPriceElement = document.getElementById("total-price");
const cartItemsList = document.getElementById("cart-items");
const cartPrompt = document.querySelector(".cart-section");
const productSection = document.getElementById("product-section");
const cartButton = document.getElementById("cart-icon");

//------Update cart function ---------//
const updateCart = () => {
  cartItemsList.innerHTML = "";
  totalPrice = 0;
  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
   <div class="flex items-center ">
   <div><img src="${item.image}" class="w-14 mr-4 rounded"  alt="image"></div>
   <div>
   <p>${item.name} <i class="fa-solid fa-trash-can ml-3 delete-item  text-red-400 hover:text-red-700 cursor-pointer" data-index=${index} ></i></p>
   <p> $${item.price}</p> 
   </div>
   </div>   
      `;
    cartItemsList.appendChild(listItem);
    totalPrice += item.price;
  });
  totalPriceElement.innerHTML = `Total Price: $${totalPrice}`;
  cartButton.innerHTML = `<sup> ${cart.length}</sup>`;

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
      card.className = "card w-80 rounded shadow-lg overflow-hidden";
      card.innerHTML = `
     
      <img id="Product-img" src="${product.thumbnail}" alt="Product img" class="w-full h-48 object-cover rounded-t-lg transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 group-hover:scale-110 ">
     
      <div class="p-4">
        <h2 class="text-2xl font-semibold">${product.title}</h2>

        <p><i class="fa-solid fa-star text-yellow-400"></i> <i class="fa-solid fa-star text-yellow-400"></i> <i class="fa-solid fa-star text-yellow-400"></i> <i class="fa-solid fa-star text-yellow-400"></i> <i class="fa-solid fa-star-half-stroke text-yellow-400"></i></p>

        <p class="my-2">$${product.price}</p>
        
        <i  class="add-to-cart fa-solid fa-bag-shopping text-xl border rounded-full  text-orange-500 px-2 py-1 cursor-pointer hover:bg-orange-500 hover:text-white hover:transition ease-in-out duration-700 "></i>
        <i  class="fa-regular fa-eye text-xl border rounded-full  text-orange-500 px-2 py-1 cursor-pointer hover:bg-orange-500 hover:text-white hover:transition ease-in-out duration-700 "></i>
        <i  class="fa-regular fa-heart text-xl border rounded-full  text-orange-500 px-2 py-1 cursor-pointer hover:bg-orange-500 hover:text-white hover:transition ease-in-out duration-700 "></i>
      </div>
      
    
      `;

      productSection.appendChild(card);
      const addToCartButton = card.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
        const productImg = product.thumbnail;

        const productName = product.title;
        const productPrice = product.price;
        const productIndex = cart.findIndex(
          (item) => item.name === productName
        );
        if (productIndex === -1) {
          const product = {
            name: productName,
            price: productPrice,
            image: productImg,
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
  // cartButton.classList.toggle("block");
});
