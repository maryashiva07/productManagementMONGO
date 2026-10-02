const express = require("express");

const router = express.Router();

const {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/adminController");


// ========================================
// GET ALL PRODUCTS
// ========================================

router.get(
    "/products",
    fetchProducts
);


// ========================================
// ADD PRODUCT
// ========================================

router.post(
    "/products",
    addProduct
);


// ========================================
// UPDATE PRODUCT
// ========================================

router.put(
    "/products/:prodid",
    updateProduct
);


// ========================================
// DELETE PRODUCT
// ========================================

router.delete(
    "/products/:prodid",
    deleteProduct
);


module.exports = router;