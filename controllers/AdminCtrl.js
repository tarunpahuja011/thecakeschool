const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const contactModel = require("../models/contactModel");
const sendMail = require("./sendMail");
const fs = require("fs");
const nodemailer = require("nodemailer");

const getAllUserController = async (req, res) => {
  try {
    const allUser = await userModel.find({
      email: { $ne: "tarun.pahuja011@gmail.com" },
    });
    if (!allUser) {
      return res.status(200).send({ success: false, message: "No User Found" });
    }
    return res.status(200).send({
      success: true,
      message: "All Users Fetched Sucesss",
      data: allUser,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Get All User Ctrl ${error.message}` });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.id });
    if (!user) {
      return res.status(200).send({ success: false, message: "No User Found" });
    }
    return res.status(200).send({
      success: true,
      message: "All Users Fetched Sucesss",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Get User Ctrl ${error.message}` });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { msId: req.body.id },
      { $set: { isDeleted: "Yes" } },
      { new: true }
    );
    if (!user) {
      return res.status(200).send({ success: false, message: "No User Found" });
    }
    return res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Delete User Ctrl ${error.message}` });
  }
};

const editUserController = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).send({
        success: false,
        message: "Id is required in the request body",
      });
    }
    const updateUser = await userModel.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { new: true }
    );
    if (!updateUser) {
      return res.status(200).send({
        success: false,
        message: "Failed to Update User",
      });
    }
    return res
      .status(201)
      .send({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Admin Edit User Ctrl ${error.message}`,
    });
  }
};

const addUserController = async (req, res) => {
  try {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(201).send({
        success: false,
        message: "Email already exists",
      });
    }
    const newUser = new userModel(req.body);
    await newUser.save(0);
    return res
      .status(200)
      .send({ success: true, message: "User Added Successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Admin Edit User Ctrl ${error.message}`,
    });
  }
};

// ================= BULK EMAIL
const sendMailToIncompleteUsersController = async (req, res) => {
  try {
    const { incompleteUsers, msg } = req.body;

    if (!incompleteUsers || !msg) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid request data" });
    }
    // Loop through incompleteUsers and send email to each user
    for (const user of incompleteUsers) {
      const { email } = user;
      await sendMail(email, "Incomplete Profile", "", msg);
    }

    res
      .status(200)
      .send({ success: true, message: "Emails sent to all users" });
  } catch (error) {
    console.error(`Send Mail to Incomplete Profiles Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const addBrandController = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ name: req.body.name });
    if (brand) {
      return res
        .status(200)
        .send({ success: false, message: "Brand name already exists" });
    }
    const newBrand = new brandModel(req.body);
    await newBrand.save();
    return res
      .status(200)
      .send({ success: true, message: "Brand Successfully Added" });
  } catch (error) {
    console.error(`Add Brand Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const getAllBrandContoller = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    if (brands.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No brands found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Brand Fetched Success", data: brands });
  } catch (error) {
    console.error(`Get All Brands Ctrl: ${error.message}`);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const addModelController = async (req, res) => {
  try {
    const { name, model } = req.body;
    const brand = await brandModel.findOne({ name: name });
    if (!brand) {
      return res
        .status(200)
        .send({ success: false, message: "Brand not found" });
    }
    // brand.models = brand.models || [];
    // const isDuplicate = brand.models.some(
    //   (existingModel) => existingModel.modelName === model.modelName
    // );
    // if (isDuplicate) {
    //   return res
    //     .status(201)
    //     .send({ success: false, message: "Model already exists" });
    // }
    brand.models.push(model);
    const updatedBrand = await brand.save();
    return res.status(202).send({
      success: true,
      message: "Model added successfully",
      data: updatedBrand,
    });
  } catch (error) {
    console.error(`Add Model Controller Error: ${error.message}`);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const deleteModelController = async (req, res) => {
  try {
    const { name, modelName } = req.body;
    const brand = await brandModel.findOne({ name: name });
    if (!brand) {
      return res
        .status(200)
        .send({ success: false, message: "Brand not found" });
    }
    const modelIndex = brand.models.findIndex(
      (existingModel) => existingModel === modelName
    );
    if (modelIndex === -1) {
      return res
        .status(201)
        .send({ success: false, message: "Model not found" });
    }
    brand.models.splice(modelIndex, 1);
    const updatedBrand = await brand.save();
    return res.status(202).send({
      success: true,
      message: "Model deleted successfully",
      data: updatedBrand,
    });
  } catch (error) {
    console.error(`Delete Model Controller Error: ${error.message}`);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// ================= ORDERS
const adminGetAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    if (!orders || orders.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No Orders Found" });
    }

    const totalAmount = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $toDouble: "$price" } }, // Convert "price" to double
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    return res.status(201).send({
      success: true,
      message: "All Orders Fetched Success",
      data: orders,
      total: totalAmount.length > 0 ? totalAmount[0].total : 0,
    });
  } catch (error) {
    console.error("Error in adminGetAllOrdersController:", error);
    res.status(500).send({
      success: false,
      message: `Admin Get All Order Ctrl ${error.message}`,
    });
  }
};

const adminUpdateOrderController = async (req, res) => {
  try {
    const order = await orderModel.findOne({
      orderId: req.body.orderId,
    });
    if (!order) {
      return res
        .status(200)
        .send({ success: false, message: "No Order Found" });
    }

    //! SEND MAIL TO USER
    try {
      const dynamicData = {
        orderId: `${order.orderId}`,
        serialNo: `${order.serialNo}`,
        fullName: `${order.name}`,
        fatherName: `${order.fatherName}`,
        motherName: `${order.motherName}`,
        spouseName: `${order.spouseName}`,
        email: `${order.email}`,
        phone: `${order.mobile}`,
        dob: `${order.dob}`,
        address: `${order.address}`,
        courseName: `${order.courseName}`,
        coursePrice: `${order.coursePrice}`,
        advancePayment: `${order.advancePayment}`,
        balancePayment: `${
          parseInt(order.coursePrice) - parseInt(order.advancePayment)
        }`,
        txnId: `${order.txnId}`,
        status: `${req.body.status}`,
      };
      let htmlContent = fs.readFileSync("courseReply.html", "utf8");
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
        to: `${order.email}`,
        subject: "Course Notification!",
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

    let pdfPath = null;
    if (req.file) {
      pdfPath = req.file.path;
    }
    const updateFields = {
      ...req.body,
      ...(pdfPath && { pdfPath: pdfPath }), // Only add pdfPath if it exists
    };
    const updateOrder = await orderModel.findOneAndUpdate(
      {
        orderId: req.body.orderId,
      },
      { $set: updateFields },
      { new: true }
    );

    if (!updateOrder) {
      return res.status(201).send({
        success: false,
        message: "Failed to update the order",
      });
    }
    return res.status(202).send({
      success: true,
      message: "Order updated successfully",
      data: updateOrder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Admin Get All Order Ctrl ${error.message}`,
    });
  }
};

const getShippingChargeController = async (req, res) => {
  try {
    const shipping = await offerModel.find({});
    if (!shipping) {
      return res.status(200).send({
        success: false,
        message: "No Shipping Found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Shipping Fetched Succss",
      data: shipping,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Shipping Charge Ctrl ${error.message}`,
    });
  }
};

const shippingChargeController = async (req, res) => {
  try {
    const newShippingCharge = req.body.shipping; // Adjust this based on your actual data structure
    const existingShipping = await offerModel.findOne();
    if (existingShipping) {
      await offerModel.updateOne({}, { shippingCharge: newShippingCharge });
    } else {
      await offerModel.create({ shippingCharge: newShippingCharge });
    }
    res.status(200).send({
      success: true,
      message: "Shipping charge updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Shipping Charge Ctrl ${error.message}`,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await offerModel.find({});
    if (coupons.length === 0) {
      return res.status(201).send({
        success: false,
        message: "No Coupons Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Coupons Fetched Success",
      data: coupons,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const addCouponController = async (req, res) => {
  try {
    const { name, discount } = req.body;
    const existingCoupon = await offerModel.findOne({ name: req.body.name });
    if (existingCoupon) {
      return res.status(201).send({
        success: false,
        message: "Coupon with this name already exists",
      });
    }
    const coupon = new offerModel(req.body);
    await coupon.save();
    return res.status(200).send({
      success: true,
      message: "Coupon Added Successfully",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

const deleteCouponController = async (req, res) => {
  try {
    const { id } = req.body;

    const existingCoupon = await offerModel.findOne({ _id: id });
    if (!existingCoupon) {
      return res.status(201).send({
        success: false,
        message: "Coupon not found",
      });
    }

    const result = await offerModel.findOneAndDelete({ _id: id });
    if (!result) {
      return res
        .status(201)
        .send({ success: false, message: "Failed to delete" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Coupon deleted Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Delete Coupon Ctrl ${error.message}`,
    });
  }
};

const getAllQueries = async (req, res) => {
  try {
    const queries = await contactModel.find({});
    if (queries.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Queries Found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Queries fetched success",
      data: queries,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Get All Queries Ctrl ${error.message}`,
    });
  }
};

const seenQueryController = async (req, res) => {
  try {
    const queries = await contactModel.findOne({ _id: req.body.id });
    if (!queries) {
      return res.status(200).send({
        success: false,
        message: "No Queries Found",
      });
    }
    const updateQuery = await contactModel.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      { $set: { status: "seen" } },
      { new: true }
    );
    return res.status(201).send({
      success: true,
      message: "Query updated success",
      data: updateQuery,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Get All Queries Ctrl ${error.message}`,
    });
  }
};

module.exports = {
  getAllUserController,
  getUserController,
  deleteUserController,
  editUserController,
  addUserController,
  //!
  sendMailToIncompleteUsersController,
  addBrandController,
  getAllBrandContoller,
  addModelController,
  deleteModelController,
  adminGetAllOrdersController,
  adminUpdateOrderController,
  getShippingChargeController,
  shippingChargeController,
  getAllQueries,
  seenQueryController,
  //COUPONS
  addCouponController,
  deleteCouponController,
  getAllCoupons,
};
