const cart = [];
let totalPrice = 0;

const totalPriceElement = document.getElementById("total-price");
const cartItemsList = document.getElementById("cart-items");
const cartPrompt = document.querySelector(".cart-section");
const productSection = document.getElementById("product-section");
const cartButton = document.getElementById("cart-icon");
const closeCart = document.getElementById("close-cart");



//------Update cart function start ---------//
const updateCart = () => {
  cartItemsList.innerHTML = "";
  totalPrice = 0;
  
  if (cart.length===0) {
    cartItemsList.innerHTML=  ` Cart is Empty !`
  }
  else{
    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <div class="flex items-center justify-between py-2 border-b border-gray-300">
      <div class="flex items-center">
        <div>
          <img src="${item.image}" class="w-12 h-12 rounded" alt="${item.name} image">
        </div>
        <div class="ml-4">
          <p class="text-lg font-medium">${item.name}</p>
          <p class="text-gray-600">$${item.price}</p>
        </div>
      </div>
      <div>
        <i class="fa-solid fa-trash-can delete-item text-red-400 hover:text-red-700 cursor-pointer" data-index="${index}"></i>
      </div>
    </div>
      
        `;
      cartItemsList.appendChild(listItem);
      totalPrice += item.price;
    });
  

    
    totalPriceElement.innerHTML = `Total Price: $${totalPrice}`;
  }
    cartButton.innerHTML = `<sup> ${cart.length}</sup>`;
  
    ////------- Delete Button ------------//////
    const deleteButtons = document.querySelectorAll(".delete-item");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
      });
    });
  
 
};
//------Update cart function end ---------//

//------- data fetching ---------------//
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log("Data=>", data);
    productSection.innerHTML = "";

    const productsToDisplay = data.products.slice(2, 8);

    productsToDisplay.forEach((product, index) => {
      const card = document.createElement("div");
      card.className =
        "card  bg-gray-50 border border-gray-100 rounded-md  shadow-lg overflow-hidden";
      card.innerHTML = `
      <div class="h-[300px]">
      <img id="Product-img" src="${product.thumbnail}" alt="Product img" class="w-full h-full object-cover rounded-t-lg transition-transform transform hover:-translate-y-1 hover:scale-110 duration-300 group-hover:scale-110 ">
      </div>
      
     

    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">${product.title}</h2>

    <div class="mb-2 flex items-center">
      <p class="text-yellow-400 my-2">
          <i class="fa-solid fa-star "></i> 
          <i class="fa-solid fa-star "></i> 
          <i class="fa-solid fa-star "></i> 
          <i class="fa-solid fa-star "></i> 
          <i class="fa-solid fa-star-half-stroke"></i>
      </p>
    </div>

        <p class="my-2 ">$${product.price}</p>
        
        <i  class="add-to-cart fa-solid fa-bag-shopping text-xl border rounded-full  text-orange-500 px-2 py-1 cursor-pointer        hover:bg-orange-500 hover:text-white hover:transition ease-in-out duration-700 "></i>

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

//-----close cart ---////
closeCart.addEventListener("click", () => {
  cartPrompt.classList.add("hidden");
  cartButton.classList.remove("hidden");
});

// --------- toggle cart icon  -------//
cartButton.addEventListener("click", () => {
  cartButton.classList.add("hidden");
  cartPrompt.classList.remove("hidden");
  updateCart()
 
  
});
