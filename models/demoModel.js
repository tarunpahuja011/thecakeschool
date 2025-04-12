const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  fullName: {
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
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  txnId: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  demoDate: {
    type: String,
  },
  demoTime: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const demoModel = mongoose.model("demo", demoSchema);
module.exports = demoModel;
