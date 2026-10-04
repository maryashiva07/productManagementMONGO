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
// FETCH USER ORDERS
// -----------------------------

const fetchOrders = async () => {

    try {

        const response = await fetch(
            `${API_URL}/orders?userId=${userId}`
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }


        // Assignment requirement
        console.log("All my orders:", data.orders);


        displayOrders(data.orders);

    } catch (error) {

        console.error("Fetch orders error:", error);

        document.getElementById("ordersContainer").innerHTML =
            `<p>Failed to load orders.</p>`;

    }

};


// -----------------------------
// DISPLAY ORDERS
// -----------------------------

const displayOrders = (orders) => {

    const container =
        document.getElementById("ordersContainer");


    if (!orders || orders.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>No orders yet</h2>

                <a
                    href="/"
                    class="btn primary-btn"
                >
                    Start Shopping
                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = orders.map((order, index) => {

        const productsHTML =
            order.products.map((product) => {

                return `

                    <div class="order-product">

                        <img
                            src="${product.imageUrl || "https://via.placeholder.com/100"}"
                            alt="${product.title}"
                        >

                        <div>

                            <h4>${product.title}</h4>

                            <p>
                                Price:
                                ₹${product.price}
                            </p>

                            <p>
                                Quantity:
                                ${product.quantity}
                            </p>

                            <p>
                                Subtotal:
                                ₹${product.price * product.quantity}
                            </p>

                        </div>

                    </div>

                `;

            }).join("");


        return `

            <div class="order-card">

                <div class="order-header">

                    <h2>
                        Order #${index + 1}
                    </h2>

                    <p>
                        ${new Date(order.createdAt)
                            .toLocaleString()}
                    </p>

                </div>


                <div class="order-products">

                    ${productsHTML}

                </div>


                <div class="order-total">

                    <strong>
                        Total: ₹${order.totalAmount}
                    </strong>

                </div>

            </div>

        `;

    }).join("");

};


// Load orders
fetchOrders();