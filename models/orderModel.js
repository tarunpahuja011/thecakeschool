const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  serialNo: {
    type: String,
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
  dob: {
    type: String,
  },
  aadharNo: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  courseName: {
    type: String,
  },
  coursePrice: {
    type: String,
  },
  advancePayment: {
    type: String,
  },
  balancePayment: {
    type: String,
  },
  certificate: {
    type: String,
    default: "pending",
  },
  pdfPath: {
    type: String,
    default: "pending",
  },
  jpgPath: {
    type: String,
    default: "pending",
  },
  status: {
    type: String,
    default: "pending",
  },
  linkOne: {
    type: String,
  },
  linkTwo: {
    type: String,
  },
  linkThree: {
    type: String,
  },
  linkFour: {
    type: String,
  },
  txnId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
