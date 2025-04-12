const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  images: {
    type: Array,
  },
  desc: {
    type: String,
  },
  price: {
    type: String,
  },
  stock: {
    type: String,
    default: "Yes",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
