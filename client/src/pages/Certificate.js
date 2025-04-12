import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { message } from "antd";
import "./StudentVerification.css";

const Certificate = () => {
  const [form, setForm] = useState({
    year: "",
    serialNo: "",
  });
  const [orders, setOrders] = useState(null);
  const [years, setYears] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/order/track-order", form);
      if (res.data.success) {
        message.success(res.data.message);
        setOrders(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // async function downloadPdfWithFetch(filePath) {
  //   try {
  //     const baseUrl = "https://thecakesschool.com/";
  //     const url = new URL(filePath, baseUrl);
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch the file: ${response.statusText}`);
  //     }
  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);
  //     const urlSegments = url.pathname.split("/");
  //     const defaultFilename = "certificate.pdf";
  //     const filename = urlSegments[urlSegments.length - 1] || defaultFilename;
  //     const a = document.createElement("a");
  //     a.href = blobUrl;
  //     a.download = filename;
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(blobUrl);
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.error(
  //       "There has been a problem with your fetch operation:",
  //       error
  //     );
  //   }
  // }

  function downloadPdfDirectly(filePath) {
    const baseUrl = "https://thecakesschool.com/";
    const url = new URL(filePath, baseUrl);
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop(); // Use the file name from the path
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const allYears = [];
    for (let i = currentYear; i >= currentYear - 2; i--) {
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
        <h2 className="m-0">Certificate</h2>
      </div>
      <div className="container student-verification-container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
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
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
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

          <div className="d-flex justify-content-start align-items-end col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
            <button className="c-btn m-0" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container course-list-container">
        <div className="row">
          {orders &&
            orders?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-12 col-md-4 col-lg-4 courses"
                >
                  <h5>Name - {item?.name}</h5>
                  <h5>Serial No - {item?.serialNo}</h5>
                  <h5>Course Name - {item?.courseName}</h5>
                  <button
                    onClick={() => downloadPdfDirectly(item?.pdfPath)}
                    className="c-btn pay-btn"
                    disabled={item?.certificate === "pending"}
                    style={{
                      opacity: item?.certificate === "pending" ? "0.7" : "1",
                    }}
                  >
                    Download Certificate
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Certificate;
