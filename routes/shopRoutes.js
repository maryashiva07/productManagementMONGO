const express = require("express");

const router = express.Router();

const {
    fetchProducts,
    fetchSingleProduct
} = require("../controllers/shopController");


// GET all products
router.get(
    "/products",
    fetchProducts
);


// GET single product
router.get(
    "/products/:prodid",
    fetchSingleProduct
);


module.exports = router;