const Order = require("../models/order");
const Cart = require("../models/cart");

// CREATE ORDER FROM CART
const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    if (!cart.products || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate total
    const totalAmount = cart.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Create order using cart products
    const order = new Order({
      userId,
      products: cart.products,
      totalAmount,
    });

    await order.save();

    // Empty cart after order
    await Cart.deleteOne({ userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};


// GET ALL ORDERS OF USER
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    // Assignment requirement:
    // retrieve all orders and console log them
    console.log("User Orders:", orders);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};


module.exports = {
  createOrder,
  getUserOrders,
};