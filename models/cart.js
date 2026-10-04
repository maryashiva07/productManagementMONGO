const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        imageUrl: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", cartSchema);
