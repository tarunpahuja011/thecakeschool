const courseModel = require("../models/courseModel");
const orderModel = require("../models/orderModel");
const fs = require("fs");

const addCourseController = async (req, res) => {
  try {
    const { name, price, desc, details, duration } = req.body;
    const parsedDetails = JSON.parse(details);
    let course = await courseModel.findOne({ name });
    if (course) {
      return res.status(200).send({
        success: false,
        message: "Course with this name already exists",
      });
    }
    course = new courseModel({
      name,
      price,
      desc,
      duration,
      details: parsedDetails,
      images: [],
    });
    const uploadedImages = req.files.map((file) => file.path);
    const totalImages = course.images.length + uploadedImages.length;
    if (totalImages > 3) {
      const excessImages = totalImages - 3;
      course.images.splice(0, excessImages);
    }
    course.images = course.images.concat(uploadedImages);
    await course.save();
    res.status(200).send({
      message: "Course added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const getAllCourseController = async (req, res) => {
  try {
    const allCourses = await courseModel.find({});
    if (allCourses.length === 0) {
      return res
        .status(201)
        .send({ success: false, message: "No Products Found" });
    }
    return res.status(200).send({
      success: true,
      message: "Courses Fetched Success",
      data: allCourses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Get All Products Controller ${error.message}`,
    });
  }
};

const getCourseController = async (req, res) => {
  try {
    const course = await courseModel.find({ _id: req.body.id });
    if (course.length === 0) {
      return res
        .status(201)
        .send({ success: false, message: "No Course Found" });
    }
    return res.status(200).send({
      success: true,
      message: "Course Fetched Success",
      data: course[0],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Get Course Controller ${error.message}`,
    });
  }
};

const getCourseByNameController = async (req, res) => {
  try {
    const course = await courseModel.findOne({ name: req.body.name });
    if (!course) {
      return res
        .status(201)
        .send({ success: false, message: "No Course Found" });
    }
    return res.status(200).send({
      success: true,
      message: "Course Fetched Success",
      data: course,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Get Course Controller ${error.message}`,
    });
  }
};

const updateCourseController = async (req, res) => {
  try {
    const { id, name, desc, price, details, duration } = req.body;
    const parsedDetails = JSON.parse(details);
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      { name, desc, price, duration, details: parsedDetails },
      { new: true }
    );
    const uploadedImages = req.files.map((file) => file.path);
    const totalImages = updatedCourse.images.length + uploadedImages.length;
    if (totalImages > 3) {
      const excessImages = totalImages - 3;
      updatedCourse.images.splice(0, excessImages);
    }
    updatedCourse.images = updatedCourse.images.concat(uploadedImages);
    await updatedCourse.save();
    res.status(200).send({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).send({
      success: false,
      message: "Error updating course. Please try again later.",
    });
  }
};

const getUserCoursesController = async (req, res) => {
  try {
    const courses = await orderModel.find({ serialNo: req.body.serialNo });
    if (courses.length === 0) {
      return res.status(201).send({
        success: false,
        message: "No Course Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Course fetched",
      data: courses,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error updating course. Please try again later.",
    });
  }
};

const deleteCourseController = async (req, res) => {
  try {
    const { id, images } = req.body;
    const course = await courseModel.findById({ _id: id });
    for (const imagePath of images) {
      const index = course.images.indexOf(imagePath);
      if (index !== -1) {
        course.images.splice(index, 1);
        await course.save();
        fs.unlinkSync(imagePath);
      } else {
        console.error(`Image not found in course's images array: ${imagePath}`);
      }
    }
    const deleteCourse = await courseModel.findByIdAndDelete({ _id: id });
    if (!deleteCourse) {
      return res.status(500).send({
        success: false,
        message: "Error deleting course. Please try again later.",
      });
    }
    return res
      .status(200)
      .send({ success: true, message: "Course Deleted Successful" });
  } catch (error) {
    res.status(500).send({
      message: `Delete Course Ctrl ${error.message}`,
      success: false,
    });
  }
};

module.exports = {
  addCourseController,
  getAllCourseController,
  getCourseController,
  updateCourseController,
  getCourseByNameController,
  getUserCoursesController,
  deleteCourseController,
};
