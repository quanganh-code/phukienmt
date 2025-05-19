
// This JavaScript code is wrapped in an event listener that waits for the DOM to be fully loaded.

document.addEventListener("DOMContentLoaded", function () {
	
	    // Select and store various elements from the HTML document.
    const products = document.querySelectorAll(".product");
    const cart = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");
	
	
    // Initialize arrays to store cart items and the total price.
    let cartItems = [];
    let total = 0;
	
    // Loop through each product in the products list.
    products.forEach((product, index) => {
		
		// Select the "Add to Cart" button for the current product.
        const addToCartButton = product.querySelector(".add-to-cart");
		
		// Attach a click event listener to the "Add to Cart" button.
        addToCartButton.addEventListener("click", () => {
			
			// Extract product details from the product element.
            const productName = product.querySelector("h2").textContent;
            const productModel = product.querySelector("p:nth-child(3)").textContent;
            const productPriceText = product.querySelector("p:nth-child(4)").textContent;
            
			// Parse the product price from the text.
            const priceParts = productPriceText.split(" ");
            const productPrice = parseFloat(priceParts[priceParts.length - 1].replace(/\$/g, ""));
    
			// Add the selected product to the cart.
            cartItems.push({ name: productName, model: productModel, price: productPrice });
            total += productPrice;
    
	
			// Create a new cart item and add it to the cart container.
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `${productName} (${productModel}) - $${productPrice.toFixed(2)} 
                <button class="remove-item">Remove</button>`; // Include a "Remove" button
            cart.appendChild(cartItem);
    
            totalPrice.textContent = total.toFixed(2); // Update the total price

            // Attach a click event listener to the "Remove" button within the cart item.
            const removeButton = cartItem.querySelector(".remove-item");
            removeButton.addEventListener("click", () => {
                // Remove the item from the cart and update the total price.
                const itemIndex = cartItems.findIndex(item => item.name === productName);
                if (itemIndex !== -1) {
                    total -= cartItems[itemIndex].price;
                    cartItems.splice(itemIndex, 1);
                    cartItem.remove();
                    totalPrice.textContent = total.toFixed(2);
                }
            });
        });
    });
	
	// Attach a click event listener to the checkout button.
    checkoutButton.addEventListener("click", () => {
		// Display an alert and reset the cart and total.
        alert("Thank you for your order!");
        cartItems = [];
        cart.innerHTML = "";
        totalPrice.textContent = "0.00";
    });
});
