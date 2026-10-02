const API_URL = "/api";


// ========================================
// FETCH ALL PRODUCTS
// ========================================

const fetchProducts = async () => {

    try {

        const response = await fetch(
            `${API_URL}/admin/products`
        );


        const data =
            await response.json();


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


            <div class="actions">

                <button
                    class="button"
                    onclick="editProduct('${product._id}')"
                >
                    Edit
                </button>


                <button
                    class="delete-button"
                    onclick="deleteProduct('${product._id}')"
                >
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });
};


// ========================================
// ADD PRODUCT
// ========================================

const addProduct = async (event) => {

    event.preventDefault();


    try {

        const title =
            document.getElementById(
                "title"
            ).value;


        const price =
            document.getElementById(
                "price"
            ).value;


        const description =
            document.getElementById(
                "description"
            ).value;


        const imageUrl =
            document.getElementById(
                "imageUrl"
            ).value;


        const response = await fetch(
            `${API_URL}/admin/products`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    title,
                    price,
                    description,
                    imageUrl
                })
            }
        );


        const data =
            await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        alert(
            "Product added successfully"
        );


        document.getElementById(
            "addProductForm"
        ).reset();


        hideAddForm();


        fetchProducts();

    } catch (error) {

        console.log(error);

        alert(
            "Unable to add product"
        );
    }
};


// ========================================
// DELETE PRODUCT
// ========================================

const deleteProduct = async (prodid) => {

    try {

        const confirmDelete =
            confirm(
                "Are you sure you want to delete this product?"
            );


        if (!confirmDelete) {
            return;
        }


        const response = await fetch(
            `${API_URL}/admin/products/${prodid}`,
            {
                method: "DELETE"
            }
        );


        const data =
            await response.json();


        if (!data.success) {
            throw new Error(data.message);
        }


        alert(
            "Product deleted successfully"
        );


        // Refresh product list
        fetchProducts();

    } catch (error) {

        console.log(error);

        alert(
            "Unable to delete product"
        );
    }
};


// ========================================
// EDIT PRODUCT
// ========================================

const editProduct = (prodid) => {

    window.location.href =
        `/edit-product.html?id=${prodid}`;

};


// ========================================
// SHOW ADD FORM
// ========================================

const showAddForm = () => {

    document
        .getElementById("addForm")
        .classList
        .remove("hidden");

};


// ========================================
// HIDE ADD FORM
// ========================================

const hideAddForm = () => {

    document
        .getElementById("addForm")
        .classList
        .add("hidden");

};


// ========================================
// FORM EVENT
// ========================================

document
    .getElementById("addProductForm")
    .addEventListener(
        "submit",
        addProduct
    );


// ========================================
// INITIAL FETCH
// ========================================

fetchProducts();