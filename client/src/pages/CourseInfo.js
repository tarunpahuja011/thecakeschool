import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import "./CourseInfo.css";

const CourseInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  async function getCourse() {
    try {
      const res = await axios.post("/api/course/get-course-by-name", {
        name: params?.name,
      });
      if (res.data.success) {
        setCourse(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function sendWhatsapp() {
    var text = encodeURIComponent(`Hello! I want brochure of ${course?.name}`);
    window.open(`https://wa.me/919664419819?text=${text}`, "_blank");
  }

  async function handleBooking() {
    try {
      // const res = await axios.post("/api/")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <Layout>
      <div className="course-info-container">
        <div className="course-bread">
          <img src={course && course?.images[0]} alt="course-img" />
          <h2>{course?.name}</h2>
        </div>
        <div className="course-content">
          <p className="text-center">Course Details For</p>
          <h4 className="text-center m-0">
            {course?.duration} {course?.name} of {course?.price}/-
          </h4>
        </div>
        <div className="course-details">
          {course?.details?.map((item, index) => {
            return (
              <div key={index} className="c-details">
                <h5>{item?.heading}</h5>
                <hr />
                {item?.data?.map((elm, index) => {
                  return (
                    <p key={index}>
                      <DoneIcon className="icon me-2" />
                      {elm}
                    </p>
                  );
                })}
              </div>
            );
          })}
          <div className="w-100 text-center">
            <button
              onClick={() =>
                navigate(`/checkout/${course?.name}/${course?.price}`)
              }
              className="c-btn me-2"
            >
              Book Now
            </button>
            <button onClick={sendWhatsapp} className="c-btn">
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseInfo;
