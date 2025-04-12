const express = require("express");
const multer = require("multer");
const demoModel = require("../models/demoModel");
const fs = require("fs");
const nodemailer = require("nodemailer");

// router object
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "demoImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});
const upload = multer({ storage: storage });

// routes
router.post("/book-demo", upload.single("image"), async (req, res) => {
  try {
    // const existingDemo = await demoModel.findOne({ email: req.body.email });
    const existingDemo = await demoModel.findOne({
      $or: [
        { email: req.body.email, status: "pending" },
        { txnId: req.body.txnId, status: "pending" },
      ],
    });
    if (existingDemo) {
      let message;
      if (existingDemo.email === req.body.email) {
        message = "A demo has already been booked using this email address.";
      } else {
        message = "A demo has already been booked using this transaction ID.";
      }
      return res.status(201).send({ success: false, message: message });
    }
    const image = req.file.path;
    const newDemo = new demoModel({ ...req.body, photo: image });
    await newDemo.save();

    //!send mail
    try {
      const dynamicData = {
        fullName: `${req.body.fullName}`,
        fatherName: `${req.body.fatherName}`,
        motherName: `${req.body.motherName}`,
        email: `${req.body.email}`,
        phone: `${req.body.phone}`,
        dob: `${req.body.dob}`,
        address: `${req.body.address}`,
        txnId: `${req.body.txnId}`,
      };
      let htmlContent = fs.readFileSync("demo.html", "utf8");
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
        to: `${demo.email}`,
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
    //!send mail to admin
    try {
      const dynamicData = {
        text: "Demo Booking",
      };
      let htmlContent = fs.readFileSync("demo.html", "utf8");
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
      .send({ success: true, message: "Demo Booked Success" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

router.get("/get-all-demo", async (req, res) => {
  try {
    const demos = await demoModel.find({});
    if (demos.length === 0) {
      return res
        .status(201)
        .send({ success: false, message: "No Bookings Found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Demo Bookings fetched", data: demos });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

router.post("/reject-demo", async (req, res) => {
  try {
    const demo = await demoModel.findOne({ _id: req.body.id });
    if (!demo) {
      return res
        .status(201)
        .send({ success: false, message: "No Booking Found" });
    }
    const updateDemo = await demoModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { status: req.body.status } },
      { new: true }
    );
    if (!updateDemo) {
      return res
        .status(202)
        .send({ success: false, message: "Failed to update" });
    }
    //! SEND MAIL TO USER
    try {
      const message =
        "We are sorry to inform you that your demo has been rejected due to some reasons. Kindly contact us";
      const dynamicData = {
        msg: `${message}`,
        fullName: `${demo.fullName}`,
        fatherName: `${demo.fatherName}`,
        motherName: `${demo.motherName}`,
        email: `${demo.email}`,
        phone: `${demo.phone}`,
        dob: `${demo.dob}`,
        address: `${demo.address}`,
        txnId: `${demo.txnId}`,
        status: `${req.body.status}`,
      };
      let htmlContent = fs.readFileSync("demoReplyReject.html", "utf8");
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
        to: `${demo.email}`,
        subject: "Demo Booking Rejected",
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
      .send({ success: true, message: "Demo Bookings fetched" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

router.post("/approve-demo", async (req, res) => {
  try {
    const demo = await demoModel.findOne({ _id: req.body.id });
    if (!demo) {
      return res
        .status(201)
        .send({ success: false, message: "No Booking Found" });
    }
    const updateDemo = await demoModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          status: req.body.status,
          demoDate: req.body.demoDate,
          demoTime: req.body.demoTime,
        },
      },
      { new: true }
    );
    if (!updateDemo) {
      return res
        .status(202)
        .send({ success: false, message: "Failed to update" });
    }
    //! SEND MAIL TO USER
    try {
      const dynamicData = {
        fullName: `${demo.fullName}`,
        date: `${req.body.demoDate}`,
        time: `${req.body.demoTime}`,
      };
      let htmlContent = fs.readFileSync("demoReplySuccess.html", "utf8");
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
        to: `${demo.email}`,
        subject: "Demo Booking Approved!",
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
      .send({ success: true, message: "Demo Bookings fetched" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

router.post("/get-demo-by-id", async (req, res) => {
  try {
    const demo = await demoModel.findOne({ _id: req.body.id });
    if (!demo) {
      return res
        .status(201)
        .send({ success: false, message: "No Booking Found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Demo Booking fetched", data: demo });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
