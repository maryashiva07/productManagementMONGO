const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// GET /api/cart?userId=...
router.get("/", getCart);

// POST /api/cart
router.post("/", addToCart);

// DELETE /api/cart/item
router.delete("/item", removeFromCart);

// DELETE /api/cart
router.delete("/", clearCart);

module.exports = router;