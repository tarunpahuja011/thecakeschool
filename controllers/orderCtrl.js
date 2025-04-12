const orderModel = require("../models/orderModel");
const sendMail = require("./sendMail");
const fs = require("fs");
const nodemailer = require("nodemailer");

const placeOrderController = async (req, res) => {
  try {
    const existingOrder = await orderModel.findOne({
      $or: [
        { orderId: req.body.orderId },
        {
          email: req.body.email,
          courseName: req.body.courseName,
        },
      ],
    });
    if (existingOrder) {
      return res.status(201).send({
        success: false,
        message: "You have already ordered this course",
      });
    }
    // add order
    const newOrder = new orderModel(req.body);
    await newOrder.save();

    //! SEND MAIL TO USER
    try {
      const dynamicData = {
        fullName: `${req.body.name}`,
        fatherName: `${req.body.fatherName}`,
        motherName: `${req.body.motherName}`,
        email: `${req.body.email}`,
        phone: `${req.body.mobile}`,
        dob: `${req.body.dob}`,
        address: `${req.body.address}`,
        courseName: `${req.body.courseName}`,
        coursePrice: `${req.body.coursePrice}`,
        advancePayment: `${req.body.advancePayment}`,
        balancePayment: `${
          parseInt(req.body.coursePrice) - parseInt(req.body.advancePayment)
        }`,
        txnId: `${req.body.txnId || "CASH ON DELIVERY"}`,
      };
      let htmlContent = fs.readFileSync("course.html", "utf8");
      Object.keys(dynamicData).forEach((key) => {
        const placeholder = new RegExp(`{${key}}`, "g");
        htmlContent = htmlContent.replace(placeholder, dynamicData[key]);
      });
      // Send mail
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });
      let mailDetails = {
        from: process.env.EMAIL,
        to: `${req.body.email}`,
        subject: "Order Successful!",
        html: htmlContent,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err);
        }
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    //! SEND MAIL TO ADMIN
    try {
      const dynamicData = {
        text: "course order",
      };
      let htmlContent = fs.readFileSync("admin.html", "utf8");
      Object.keys(dynamicData).forEach((key) => {
        const placeholder = new RegExp(`{${key}}`, "g");
        htmlContent = htmlContent.replace(placeholder, dynamicData[key]);
      });
      // Send mail
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });
      let mailDetails = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Order Successful!",
        html: htmlContent,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err);
        }
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return res
      .status(200)
      .send({ success: true, message: "Order place successfull" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Place Order Ctrl ${error.message}` });
  }
};

const trackOrderController = async (req, res) => {
  try {
    const { serialNo, year } = req.body;
    const startYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endYear = new Date(`${year}-12-31T23:59:59.999Z`);
    const orders = await orderModel.find({
      serialNo: serialNo,
      createdAt: { $gte: startYear, $lte: endYear },
      status: "success",
    });
    if (orders.length === 0) {
      return res.status(201).send({
        success: false,
        message: "No Data Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Data Fetched",
      data: orders,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Track Order Ctrl ${error.message}` });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ customer_email: req.body.email });
    if (orders.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Order Found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "All Orders Fetched Success",
      data: orders,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Get All Orders Ctrl ${error.message}`,
    });
  }
};

const getOrderByIdController = async (req, res) => {
  try {
    const order = await orderModel.findOne({
      _id: req.body.id,
    });
    if (!order) {
      return res.status(200).send({
        success: false,
        message: "No Order Found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Order Fetched Success",
      data: order,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Get Order By Id Ctrl ${error.message}`,
    });
  }
};

const userUpdateLinkController = async (req, res) => {
  try {
    const order = await orderModel.findOne({ orderId: req.body.orderId });
    if (!order) {
      return res
        .status(201)
        .send({ success: false, message: "No Course Found" });
    }
    const updateOrder = await orderModel.findOneAndUpdate(
      {
        orderId: req.body.orderId,
      },
      { $set: req.body },
      { new: true }
    );
    if (!updateOrder) {
      return res.status(202).send({
        success: false,
        message: "Failed to Update",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Links updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  placeOrderController,
  trackOrderController,
  getAllOrdersController,
  getOrderByIdController,
  userUpdateLinkController,
};
