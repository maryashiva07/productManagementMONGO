const API_URL = "/api";


// ========================================
// GET PRODUCT ID
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

const fetchProduct = async () => {

    try {

        if (!productId) {

            throw new Error(
                "Product ID missing"
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


        const product =
            data.product;


        document.getElementById(
            "title"
        ).value = product.title;


        document.getElementById(
            "price"
        ).value = product.price;


        document.getElementById(
            "description"
        ).value =
            product.description;


        document.getElementById(
            "imageUrl"
        ).value =
            product.imageUrl;

    } catch (error) {

        console.log(error);

        alert(
            "Unable to load product"
        );
    }
};


// ========================================
// UPDATE PRODUCT
// ========================================

const updateProduct = async (event) => {

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
            `${API_URL}/admin/products/${productId}`,
            {
                method: "PUT",

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
            "Product updated successfully"
        );


        window.location.href =
            "/admin.html";

    } catch (error) {

        console.log(error);

        alert(
            "Unable to update product"
        );
    }
};


// ========================================
// EVENT
// ========================================

document
    .getElementById("editProductForm")
    .addEventListener(
        "submit",
        updateProduct
    );


// ========================================
// INITIAL FETCH
// ========================================

fetchProduct();