const express = require("express");
const path = require("path");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
var cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// dotenv
dotenv.config();

//mongodb connection
connectDB();
// rest object
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(moragan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Static file for images
// PRODUCT
app.use(
  "/productImages",
  express.static(path.join(__dirname, "productImages"))
);
app.use("/courseImages", express.static(path.join(__dirname, "courseImages")));
app.use("/demoImages", express.static(path.join(__dirname, "demoImages")));
app.use("/userImages", express.static(path.join(__dirname, "userImages")));
app.use("/certificates", express.static(path.join(__dirname, "certificates")));
app.use("/admin-products", express.static("productImages"));
app.use("/admin-edit-product/:id", express.static("productImages"));
app.use("/admin-view-order/:id", express.static("productImages"));
app.use("/product/", express.static("productImages"));
app.use("/product/:name", express.static("productImages"));
app.use("/admin-courses", express.static("courseImages"));
app.use("/course/:name", express.static("courseImages"));
app.use("/my-courses", express.static("courseImages"));
app.use("/admin-demo-booking", express.static("demoImages"));
app.use("/my-account", express.static("userImages"));
app.use("/certificates", express.static("certificates"));
app.use("/certificates/certificate", express.static("certificates"));

// routes
app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/image/", require("./routes/imageUploadRoutes"));
app.use("/api/contact/", require("./routes/contactRoutes"));
app.use("/api/admin/", require("./routes/adminRoutes"));
app.use("/api/order/", require("./routes/orderRoutes"));
app.use("/api/product/", require("./routes/productRoutes"));
app.use("/api/course/", require("./routes/courseRoutes"));
app.use("/api/demo/", require("./routes/demoRoutes"));

// PORT
const port = process.env.PORT || 8080;

// STATIC FILES RUNNING ON BUILD FOLDER
if (process.env.NODE_MODE === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running..");
  });
}

// Listen
app.listen(port, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_MODE} Mode on Port ${process.env.PORT}`
      .bgCyan
  );
});
