import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const Courses = ({ title, homeLabel }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/course/get-all-courses");
      if (res.data.success) {
        setProducts(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="container-fluid course-container">
      <h1 className="text-center mb-lg-4 mb-4">{title}</h1>
      <div className="container">
        <div className="row">
          {products &&
            products
              ?.map((item, index) => {
                return (
                  <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <div
                      onClick={() => navigate(`/course/${item?.name}`)}
                      key={index}
                      className="course"
                    >
                      <div className={`course-img-cont`}>
                        <img src={`${item?.images[0]}`} alt="" />
                        <p>{item?.name}</p>
                      </div>
                      <div className="course-desc">
                        <p>{item?.desc}</p>
                        <hr />
                        <span>Rs. {item?.price}</span>
                      </div>
                    </div>
                  </div>
                );
              })
              .slice(0, 6)}
        </div>
      </div>
    </div>
  );
};

export default Courses;
