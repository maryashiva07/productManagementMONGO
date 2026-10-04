const API_URL = "/api";


// -----------------------------
// GET USER ID
// -----------------------------

let userId = localStorage.getItem("userId");

if (!userId) {

    userId = crypto.randomUUID();

    localStorage.setItem("userId", userId);

}


// -----------------------------
// FETCH CART
// -----------------------------

const fetchCart = async () => {

    try {

        const response = await fetch(
            `${API_URL}/cart?userId=${userId}`
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        displayCart(data.cart.products || []);

    } catch (error) {

        console.error("Fetch cart error:", error);

        document.getElementById("cartContainer").innerHTML =
            `<p>Failed to load cart.</p>`;

    }

};


// -----------------------------
// DISPLAY CART
// -----------------------------

const displayCart = (products) => {

    const container =
        document.getElementById("cartContainer");


    if (!products || products.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <a href="/" class="btn primary-btn">
                    Continue Shopping
                </a>

            </div>
        `;

        return;
    }


    let total = 0;


    const productsHTML = products.map((product) => {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;


        return `
            <div class="cart-item">

                <img
                    src="${product.imageUrl || "https://via.placeholder.com/120"}"
                    alt="${product.title}"
                >

                <div class="cart-item-info">

                    <h3>${product.title}</h3>

                    <p>Price: ₹${product.price}</p>

                    <p>
                        Quantity:
                        <strong>${product.quantity}</strong>
                    </p>

                    <p>
                        Item Total:
                        <strong>₹${itemTotal}</strong>
                    </p>

                    <button
                        class="btn danger-btn"
                        onclick="removeFromCart('${product.productId}')"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");


    container.innerHTML = `

        <div class="cart-products">

            ${productsHTML}

        </div>


        <div class="cart-summary">

            <h2>
                Total:
                ₹${total}
            </h2>

            <button
                class="btn primary-btn order-btn"
                onclick="placeOrder()"
            >
                Order Now
            </button>

        </div>

    `;

};


// -----------------------------
// REMOVE FROM CART
// -----------------------------

const removeFromCart = async (productId) => {

    try {

        const response = await fetch(
            `${API_URL}/cart/item`,
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    userId,
                    productId,
                }),
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        fetchCart();

    } catch (error) {

        console.error("Remove cart error:", error);

        alert(error.message);

    }

};


// -----------------------------
// PLACE ORDER
// -----------------------------

const placeOrder = async () => {

    try {

        const confirmOrder =
            confirm("Do you want to place this order?");

        if (!confirmOrder) {
            return;
        }


        const response = await fetch(
            `${API_URL}/orders`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    userId,
                }),
            }
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        alert("Order placed successfully!");


        // Assignment:
        // Cart is already deleted by backend


        window.location.href = "/orders.html";


    } catch (error) {

        console.error("Place order error:", error);

        alert(error.message);

    }

};


// Initial load
fetchCart();