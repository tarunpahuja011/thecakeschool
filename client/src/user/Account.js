import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import axios from "axios";
import { message } from "antd";
import { useSelector } from "react-redux";
import "./Account.css";

const Account = () => {
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      formData.append("image", file);
      const res = await axios.post("/api/user/user-profile-update", formData);
      if (res.data.success) {
        setForm({ ...form, password: "" });
        message.success(res.data.message);
        getUserData();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const getUserData = async () => {
    axios
      .post(
        "/api/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setForm(res.data.data);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <DashboardLayout>
        <div className="user-accout-details" style={{ minHeight: "300px" }}>
          <div className="row">
            <div className="col-12 mb-3">
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="col-12">
              <img className="user-img" src={form?.photo} alt="" />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <h6>{form?.email}</h6>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <label htmlFor="">Serial No</label>
              <h6>{form?.serialNo}</h6>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  value={form?.name}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Father Name
                </label>
                <input
                  name="fatherName"
                  onChange={handleChange}
                  value={form?.fatherName}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Mother Name
                </label>
                <input
                  name="motherName"
                  onChange={handleChange}
                  value={form?.motherName}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Spouse Name
                </label>
                <input
                  name="spouseName"
                  onChange={handleChange}
                  value={form?.spouseName}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Aadhar No
                </label>
                <input
                  name="aadharNo"
                  onChange={handleChange}
                  value={form?.aadharNo}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Mobile
                </label>
                <input
                  name="mobile"
                  onChange={handleChange}
                  value={form?.mobile}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Address
                </label>
                <input
                  name="address"
                  onChange={handleChange}
                  value={form?.address}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Date of Birth
                </label>
                <input
                  name="dob"
                  onChange={handleChange}
                  value={form?.dob}
                  className="form-control"
                  type="date"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="form-fields mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
          </div>
          <button onClick={handleUpdate} className="c-btn pay-btn">
            Update
          </button>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Account;
