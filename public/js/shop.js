const API_URL = "/api";

// -----------------------------
// DEMO USER ID
// -----------------------------

let userId = localStorage.getItem("userId");

if (!userId) {
  userId = crypto.randomUUID();

  localStorage.setItem("userId", userId);
}

// -----------------------------
// FETCH PRODUCTS
// -----------------------------

const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    displayProducts(data.products);
  } catch (error) {
    console.error("Fetch products error:", error);

    document.getElementById("productsContainer").innerHTML =
      `<p>Failed to load products.</p>`;
  }
};

// -----------------------------
// DISPLAY PRODUCTS
// -----------------------------

const displayProducts = (products) => {
  const container = document.getElementById("productsContainer");

  if (!products || products.length === 0) {
    container.innerHTML = "<p>No products available.</p>";
    return;
  }

  container.innerHTML = products
    .map((product) => {
      return `
            <div class="product-card">

                <img 
                    src="${product.imageUrl || "https://via.placeholder.com/300"}"
                    alt="${product.title}"
                >

                <div class="product-info">

                    <h3>${product.title}</h3>

                    <p class="price">₹${product.price}</p>

                    <p>${product.description || ""}</p>

                    <div class="product-actions">

                        <button 
                            onclick="viewProduct('${product._id}')"
                            class="btn secondary-btn"
                        >
                            View
                        </button>

                        <button 
                            onclick="addToCart('${product._id}')"
                            class="btn primary-btn"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    })
    .join("");
};

// -----------------------------
// VIEW PRODUCT
// -----------------------------

const viewProduct = (productId) => {
  window.location.href = `/product.html?id=${productId}`;
};

// -----------------------------
// ADD TO CART
// -----------------------------

const addToCart = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        productId,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    alert("Product added to cart");

    updateCartCount();
  } catch (error) {
    console.error("Add to cart error:", error);

    alert(error.message);
  }
};

// -----------------------------
// CART COUNT
// -----------------------------

const updateCartCount = async () => {
  try {
    const response = await fetch(`${API_URL}/cart?userId=${userId}`);

    const data = await response.json();

    if (!data.success) return;

    const products = data.cart.products || [];

    const count = products.reduce((total, item) => total + item.quantity, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
      cartCount.textContent = count;
    }
  } catch (error) {
    console.error("Cart count error:", error);
  }
};

// Load products
fetchProducts();

// Load cart count
updateCartCount();
