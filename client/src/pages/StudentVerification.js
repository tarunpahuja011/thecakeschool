import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { message } from "antd";
import "./StudentVerification.css";

const StudentVerification = () => {
  const [form, setForm] = useState({
    year: "",
    serialNo: "",
  });
  const [user, setUser] = useState("");
  const [courses, setCourses] = useState("");
  const [years, setYears] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/user-info", form);
      if (res.data.success) {
        setUser(res.data.data);
        // getting user courses
        try {
          const res2 = await axios.post("/api/course/get-user-courses", form);
          if (res2.data.success) {
            setCourses(res2.data.data);
          } else {
            message.error(res2.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser("");
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const allYears = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      allYears.push(i.toString());
    }
    return setYears(allYears.reverse());
  }

  useEffect(() => {
    generateYears();
  }, []);

  return (
    <Layout>
      <div className="about-container">
        <h2 className="m-0">Student Verification</h2>
      </div>
      <div className="container student-verification-container">
        <div className="row p-0 d-flex align-items-center"> 
          <div className="p-0 col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
            <div className="form-fields">
              <label htmlFor="" className="form-label">
                Student Batch Year
              </label>
              <select
                onChange={handleChange}
                name="year"
                className="form-select"
              >
                <option value="">Select Year</option>
                {years?.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-0 px-lg-2 col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
            <div className="form-fields">
              <label className="form-label" htmlFor="">
                Student Sr.No
              </label>
              <input
                className="form-control"
                type="text"
                name="serialNo"
                placeholder="Enter serial number"
                onChange={handleChange}
                value={form?.serialNo}
              />
            </div>
          </div>
          <div className="p-0 d-flex justify-content-start align-items-end col-12 col-sm-12 col-md-4 col-lg-4 ">
            <button className="c-btn m-0" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {user === "" ? (
        ""
      ) : (
        <div className="container user-container">
          <table className="table table-bordered user-table">
            <thead>
              <tr>
                <td>Serial No</td>
                <td>{user?.serialNo}</td>
              </tr>
              <tr>
                <td>Student Name</td>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <td>Father Name</td>
                <td>{user?.fatherName}</td>
              </tr>
              <tr>
                <td>Mother Name</td>
                <td>{user?.motherName}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{user?.address}</td>
              </tr>
              <tr>
                <td>Spouse Name</td>
                <td>{user?.spouseName}</td>
              </tr>
            </thead>
          </table>
        </div>
      )}

      {user !== "" && courses !== "" && (
        <div className="container mb-5">
          <h2>Courses</h2>
          <div className="row">
            {courses.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-12 col-md-4 col-lg-4 courses"
                >
                  <h5>Name - {item?.name}</h5>
                  <h5>Serial No - {item?.serialNo}</h5>
                  <h5>Course Name - {item?.courseName}</h5>
                  <h5>Start Date- {new Date(item?.startDate).toLocaleString(
                              "default",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}</h5>
                  <h5>End Date-  {new Date(item?.endDate).toLocaleString(
                              "default",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}</h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentVerification;
