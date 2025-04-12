const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  serialNo: {
    type: String,
    required: [true, "serialNo is required"],
  },
  photo: {
    type: String,
    required: [true, "email is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  name: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  spouseName: {
    type: String,
  },
  aadharNo: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  emailOtp: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
