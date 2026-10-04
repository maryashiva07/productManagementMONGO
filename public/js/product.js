const API_URL = "/api";


// Get user ID
let userId = localStorage.getItem("userId");

if (!userId) {

    userId = crypto.randomUUID();

    localStorage.setItem("userId", userId);

}


// Get product ID from URL
const params = new URLSearchParams(
    window.location.search
);

const productId = params.get("id");


// Fetch product
const fetchProduct = async () => {

    try {

        if (!productId) {
            throw new Error("Product ID missing");
        }


        const response = await fetch(
            `${API_URL}/products/${productId}`
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        displayProduct(data.product);

    } catch (error) {

        console.error(error);

        document.getElementById("productContainer").innerHTML =
            `<p>Product not found.</p>`;

    }

};


// Display product
const displayProduct = (product) => {

    const container =
        document.getElementById("productContainer");


    container.innerHTML = `

        <div class="single-product">

            <img
                src="${product.imageUrl || "https://via.placeholder.com/400"}"
                alt="${product.title}"
            >

            <div class="single-product-info">

                <h1>${product.title}</h1>

                <h2 class="price">
                    ₹${product.price}
                </h2>

                <p>
                    ${product.description || ""}
                </p>


                <button
                    class="btn primary-btn"
                    onclick="addToCart('${product._id}')"
                >
                    Add to Cart
                </button>

            </div>

        </div>

    `;

};


// Add product to cart
const addToCart = async (productId) => {

    try {

        const response = await fetch(
            `${API_URL}/cart`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    userId,
                    productId,
                    quantity: 1,
                }),
            }
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        alert("Product added to cart");


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};


fetchProduct();