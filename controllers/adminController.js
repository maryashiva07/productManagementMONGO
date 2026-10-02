const Product = require("../models/product");


// ========================================
// FETCH ALL PRODUCTS
// ========================================

const fetchProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            products: products
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch products"
        });
    }
};


// ========================================
// ADD PRODUCT
// ========================================

const addProduct = async (req, res) => {
    try {

        const {
            title,
            price,
            description,
            imageUrl
        } = req.body;


        if (
            !title ||
            !price ||
            !description ||
            !imageUrl
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const product = new Product({
            title,
            price,
            description,
            imageUrl
        });


        await product.save();


        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: product
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to add product"
        });
    }
};


// ========================================
// UPDATE PRODUCT
// ========================================

const updateProduct = async (req, res) => {
    try {

        const { prodid } = req.params;

        const {
            title,
            price,
            description,
            imageUrl
        } = req.body;


        const product = await Product.findById(prodid);


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        product.title = title;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;


        await product.save();


        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: product
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to update product"
        });
    }
};


// ========================================
// DELETE PRODUCT
// ========================================

const deleteProduct = async (req, res) => {
    try {

        const { prodid } = req.params;


        const product = await Product.findById(prodid);


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        // Assignment requirement
        await Product.deleteOne({
            _id: prodid
        });


        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to delete product"
        });
    }
};


module.exports = {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
};