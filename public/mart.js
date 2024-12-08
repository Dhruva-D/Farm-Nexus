// Array to hold the items added to the cart
let cart = [];

// Function to get the logged-in user's name (replace this logic with your actual login API logic)
async function getUserName() {
    let userName = 'Guest'; // Default name

    // Simulate fetching the username, e.g., from a backend or session
    await fetch('https://farm-nexus-api.vercel.app/user-info')
        .then(response => response.json())
        .then(data => {
            userName = data.name;
        })
        .catch(error => console.error('Error fetching user info:', error));

    // Return the fetched or default name
    return userName;
}

// Function to add an item to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    alert(item + ' has been added to your cart!');
}

// Function to view the cart and list the items
async function viewCart() {
    const cartSummary = document.getElementById('cartSummary');
    cartSummary.style.display = 'block'; // Show the cart summary
    cartSummary.innerHTML = ''; // Clear previous cart summary
    
    // Get the logged-in user's name asynchronously
    const userName = await getUserName(); // Ensure the username is fetched before proceeding
    
    if (cart.length === 0) {
        cartSummary.innerHTML = `<h3>${userName}, your cart is empty.</h3>`;
    } else {
        let cartHTML = `<h3>${userName}'s Cart Summary</h3>`;
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
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const equipmentItems = document.querySelectorAll('.equipment-item');
    const noResultsMessage = document.getElementById('noResultsMessage');
    let hasResults = false;

    // Loop through equipment items and check for matches
    equipmentItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            item.style.display = 'block'; // Show matching items
            hasResults = true;
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });

    // Show or hide the "No results" message based on matches
    noResultsMessage.style.display = hasResults ? 'none' : 'block';
}
