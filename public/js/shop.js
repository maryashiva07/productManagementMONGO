const API_URL = "/api";


// ========================================
// FETCH ALL PRODUCTS
// ========================================

const fetchProducts = async () => {

    try {

        const response = await fetch(
            `${API_URL}/products`
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        displayProducts(data.products);

    } catch (error) {

        console.log(error);

        document.getElementById(
            "productsContainer"
        ).innerHTML = `
            <p class="error">
                Unable to load products
            </p>
        `;
    }
};


// ========================================
// DISPLAY PRODUCTS
// ========================================

const displayProducts = (products) => {

    const container =
        document.getElementById(
            "productsContainer"
        );


    container.innerHTML = "";


    if (products.length === 0) {

        container.innerHTML = `
            <p>No products available.</p>
        `;

        return;
    }


    products.forEach((product) => {

        const card =
            document.createElement("div");


        card.className = "card";


        card.innerHTML = `

            <img
                src="${product.imageUrl}"
                alt="${product.title}"
            >

            <h2>
                ${product.title}
            </h2>

            <p>
                ${product.description}
            </p>

            <h3>
                ₹${product.price}
            </h3>

            <button
                class="button"
                onclick="viewProduct('${product._id}')"
            >
                View Product
            </button>

        `;


        container.appendChild(card);

    });
};


// ========================================
// VIEW SINGLE PRODUCT
// ========================================

const viewProduct = (prodid) => {

    window.location.href =
        `/product.html?id=${prodid}`;

};


fetchProducts();