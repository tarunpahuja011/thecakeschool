const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  images: {
    type: Array,
  },
  price: {
    type: String,
    required: [true, "Course roduct price is required"],
  },
  desc: {
    type: String,
    default: null,
  },
  duration: {
    type: String,
    default: null,
  },
  details: {
    type: Array,
    default: [],
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

const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
