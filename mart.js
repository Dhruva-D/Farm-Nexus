// Array to hold the items added to the cart
let cart = [];

// Function to add an item to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    alert(item + ' has been added to your cart!');
}

// Function to view the cart and list the items
function viewCart() {
    const cartSummary = document.getElementById('cartSummary');
    cartSummary.style.display = 'block'; // Show the cart summary
    cartSummary.innerHTML = ''; // Clear previous cart summary
    
    if (cart.length === 0) {
        cartSummary.innerHTML = '<h3>Your cart is empty.</h3>';
    } else {
        let cartHTML = '<h3>Cart Summary</h3>';
        let total = 0;
        cart.forEach(cartItem => {
            cartHTML += `
                <div class="cart-item">
                    <span>${cartItem.item}</span>
                    <span>₹${cartItem.price}</span>
                </div>
            `;
            total += cartItem.price;
        });

        // Calculate GST (18%) and Platform Fee (3%)
        let gst = total * 0.18;
        let platformFee = total * 0.03;
        let totalWithFees = total + gst + platformFee;

        cartHTML += `<hr>`;
        cartHTML += `<p><strong>Subtotal: ₹${total}</strong></p>`;
        cartHTML += `<p><strong>GST (18%): ₹${gst.toFixed(2)}</strong></p>`;
        cartHTML += `<p><strong>Platform Fee (3%): ₹${platformFee.toFixed(2)}</strong></p>`;
        cartHTML += `<p><strong>Total: ₹${totalWithFees.toFixed(2)}</strong></p>`;
        cartHTML += `<button class="button" onclick="checkout()">Checkout</button>`;
        cartSummary.innerHTML = cartHTML;
    }
}

// Checkout function
function checkout() {
    const cartSummary = document.getElementById('cartSummary');
    cartSummary.innerHTML = '<h3>Thank you for your order! Your checkout is complete.</h3>';
    cart = []; // Clear the cart after checkout
    setTimeout(() => cartSummary.style.display = 'none', 3000); // Hide the cart summary after 3 seconds
}
