document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const deliveryForm = document.getElementById('delivery-form');

    // Add event listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            addToCart(productId, productName, productPrice);
        });
    });

    // Function to add items to the cart
    function addToCart(id, name, price) {
        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if the product is already in the cart
        } else {
            cart.push({ id, name, price, quantity: 1 }); // Add new product to cart
        }

        renderCart(); // Update the cart display
    }

    // Function to render the cart and calculate the total price
    function renderCart() {
        cartItems.innerHTML = ''; // Clear the cart display
        let total = 0;

        // Loop through each item in the cart
        cart.forEach(item => {
            total += item.price * item.quantity; // Calculate total price
            const li = document.createElement('li');
            li.textContent = `${item.name} x ${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
        });

        totalPrice.textContent = total.toFixed(2); // Update total price display
    }

    // Show delivery form when 'Check Out' is clicked
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        checkoutForm.style.display = 'block'; // Show the delivery form
    });

    // Handle form submission
    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;

        // You can extend this to send data to a server or email
        alert(`Thank you, ${name}! Your order will be delivered to ${address}. We will contact you at ${contact}.`);
        
        // Clear the cart and form
        cart = [];
        renderCart();
        checkoutForm.style.display = 'none';
        deliveryForm.reset();
    });
});
