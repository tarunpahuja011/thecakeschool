const express = require("express");
const multer = require("multer");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const {
  addCourseController,
  getAllCourseController,
  getCourseController,
  updateCourseController,
  getCourseByNameController,
  getUserCoursesController,
  deleteCourseController,
} = require("../controllers/courseCtrl");

// router object
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "courseImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});
const upload = multer({ storage: storage });
// routes
router.post(
  "/add-course",
  upload.array("images", 3),
  adminAuthMiddleware,
  addCourseController
);
router.post(
  "/update-course",
  upload.array("images", 3),
  adminAuthMiddleware,
  updateCourseController
);
router.get("/get-all-courses", getAllCourseController);
router.post("/get-course", getCourseController);
router.post("/get-course-by-name", getCourseByNameController);
router.post("/get-user-courses", getUserCoursesController);
router.post("/delete-course", deleteCourseController);

module.exports = router;
