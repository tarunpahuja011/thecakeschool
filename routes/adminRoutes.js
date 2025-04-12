const multer = require("multer");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const {
  getAllUserController,
  getUserController,
  editUserController,
  deleteUserController,
  sendMailToIncompleteUsersController,
  addBrandController,
  getAllBrandContoller,
  addModelController,
  deleteModelController,
  adminGetAllOrdersController,
  adminUpdateOrderController,
  shippingChargeController,
  getShippingChargeController,
  addCouponController,
  deleteCouponController,
  getAllQueries,
  seenQueryController,
  getAllCoupons,
  addUserController,
} = require("../controllers/AdminCtrl");

// router object
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "certificates");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});
const upload = multer({ storage: storage });

// ============== USERS
router.get("/get-all-users", adminAuthMiddleware, getAllUserController);
router.post("/get-user", adminAuthMiddleware, getUserController);
router.post("/delete-user", adminAuthMiddleware, deleteUserController);
router.post("/admin-add-user", adminAuthMiddleware, addUserController);
router.post("/admin-edit-user", adminAuthMiddleware, editUserController);
// ============== ORDERS
router.get(
  "/admin-get-all-orders",
  adminAuthMiddleware,
  adminGetAllOrdersController
);
router.post(
  "/update-order",
  upload.single("pdfFile"),
  adminAuthMiddleware,
  adminUpdateOrderController
);
// ============== BRANDS
router.post("/add-brand", adminAuthMiddleware, addBrandController);
router.get("/get-all-brands", getAllBrandContoller);
router.post("/add-model", adminAuthMiddleware, addModelController);
router.post("/delete-model", adminAuthMiddleware, deleteModelController);

// ============== COUPON
router.get("/get-coupons", getAllCoupons);
router.post("/add-coupon", adminAuthMiddleware, addCouponController);
router.post("/delete-coupon", adminAuthMiddleware, deleteCouponController);

// ============== QUERIES
router.get("/get-all-queries", adminAuthMiddleware, getAllQueries);
router.post("/query-seen", adminAuthMiddleware, seenQueryController);

// ============== BULK EMAIL
router.post(
  "/send-mail-to-incomplete-profiles",
  sendMailToIncompleteUsersController
);

module.exports = router;
