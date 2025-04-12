const express = require("express");
const {
  placeOrderController,
  trackOrderController,
  getAllOrdersController,
  getOrderByIdController,
  userUpdateLinkController,
} = require("../controllers/orderCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

// routes
router.post("/place-order", placeOrderController);
router.post("/track-order", trackOrderController);
router.post("/get-user-orders", authMiddleware, getAllOrdersController);
router.post("/get-order-by-id", authMiddleware, getOrderByIdController);
router.post("/user-update-link", authMiddleware, userUpdateLinkController);

module.exports = router;
