const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product's name must be provided"],
    },
    price: {
      type: String,
      required: [true, "Product's price must be provided"],
    },
    description: {
      type: String,
      required: [true, "Product's description must be provided"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
