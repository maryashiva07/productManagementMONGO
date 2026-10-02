const API_URL = "/api";


// ========================================
// GET PRODUCT ID FROM URL
// ========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const productId =
    params.get("id");


// ========================================
// FETCH SINGLE PRODUCT
// ========================================

const fetchSingleProduct = async () => {

    try {

        if (!productId) {

            throw new Error(
                "Product ID is missing"
            );

        }


        const response = await fetch(
            `${API_URL}/products/${productId}`
        );


        const data =
            await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        displayProduct(data.product);

    } catch (error) {

        console.log(error);

        document.getElementById(
            "productContainer"
        ).innerHTML = `
            <p class="error">
                Product not found
            </p>
        `;
    }
};


// ========================================
// DISPLAY PRODUCT
// ========================================

const displayProduct = (product) => {

    const container =
        document.getElementById(
            "productContainer"
        );


    container.innerHTML = `

        <div class="single-product">

            <img
                src="${product.imageUrl}"
                alt="${product.title}"
            >

            <div>

                <h1>
                    ${product.title}
                </h1>

                <h2>
                    ₹${product.price}
                </h2>

                <p>
                    ${product.description}
                </p>

                <a
                    href="/"
                    class="button"
                >
                    Back to Shop
                </a>

            </div>

        </div>

    `;
};


fetchSingleProduct();