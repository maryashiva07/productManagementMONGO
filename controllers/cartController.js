const Cart = require("../models/cart");
const Product = require("../models/product");

// GET USER CART
const getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          userId,
          products: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get cart",
    });
  }
};


// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    // If cart does not exist, create one
    if (!cart) {
      cart = new Cart({
        userId,
        products: [
          {
            productId: product._id,
            title: product.title,
            price: product.price,
            quantity: Number(quantity),
            imageUrl: product.imageUrl,
          },
        ],
      });

      await cart.save();

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        cart,
      });
    }

    // Check if product already exists in cart
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      cart.products.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: Number(quantity),
        imageUrl: product.imageUrl,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};


// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove cart item error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove product",
    });
  }
};


// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    await Cart.deleteOne({ userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};


module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};