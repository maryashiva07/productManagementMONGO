const Product = require("../models/product");


// ========================================
// GET ALL PRODUCTS
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
// GET SINGLE PRODUCT
// ========================================

const fetchSingleProduct = async (req, res) => {
    try {

        const { prodid } = req.params;

        const product = await Product.findById(prodid);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product: product
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch product"
        });
    }
};


module.exports = {
    fetchProducts,
    fetchSingleProduct
};