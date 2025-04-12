import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    aadharNo: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file === null) {
      return setError(true);
    }
    if (
      form.name === "" ||
      form.fatherName === "" ||
      form.motherName === "" ||
      form.aadharNo === "" ||
      form.email === "" ||
      form.mobile === "" ||
      form.dob === "" ||
      form.address === "" ||
      form.password === ""
    ) {
      return setError(true);
    }
    try {
      console.log(form);
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      formData.append("image", file);

     
      const res = await axios.post("/api/user/register", formData);
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function generateSerialNumber() {
    const currentYear = new Date().getFullYear().toString(); // Get the current year
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate 4 random digits
    const serialNumber = `TCS${currentYear}${randomDigits}`; // Combine the parts
    setForm({ ...form, serialNo: serialNumber });
  }

  useEffect(() => {
    generateSerialNumber();
  }, []);

  return (
    <Layout>
      <div className="container-fluid register-container bg-white">
        <div className="row">
          <div className="d-block m-auto col-12 col-sm-12 col-md-6 col-lg-6">
            <form className="register-form" onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Photo
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  name="image"
                  type="file"
                  className="form-control"
                />
                {error && file === null && (
                  <span className="text-danger">
                    Please select a profile image
                  </span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  value={form?.name}
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your Full Name"
                />
                {error && form?.name === "" && (
                  <span className="text-danger">Enter full name</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Father Name
                </label>
                <input
                  onChange={handleChange}
                  value={form?.fatherName}
                  name="fatherName"
                  type="text"
                  className="form-control"
                  placeholder="Father Name"
                />
                {error && form?.fatherName === "" && (
                  <span className="text-danger">Enter father name</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Mother Name
                </label>
                <input
                  onChange={handleChange}
                  value={form?.motherName}
                  name="motherName"
                  type="text"
                  className="form-control"
                  placeholder="Mother Name"
                />
                {error && form?.motherName === "" && (
                  <span className="text-danger">Enter mother name</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Spouse Name
                </label>
                <input
                  onChange={handleChange}
                  value={form?.spouseName}
                  name="spouseName"
                  type="text"
                  className="form-control"
                  placeholder="Spouse Name"
                />
               
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Aadhar Number
                </label>
                <input
                  onChange={handleChange}
                  value={form?.aadharNo}
                  name="aadharNo"
                  type="text"
                  className="form-control"
                  placeholder="Aadhar Number"
                />
                {error && form?.aadharNo === "" && (
                  <span className="text-danger">Enter aadhar number</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={form?.email}
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                {error && form?.email === "" && (
                  <span className="text-danger">Enter email</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Mobile
                </label>
                <input
                  onChange={handleChange}
                  value={form?.mobile}
                  name="mobile"
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                />
                {error && form?.mobile === "" && (
                  <span className="text-danger">Enter mobile</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Date of Birth
                </label>
                <input
                  onChange={handleChange}
                  value={form?.dob}
                  name="dob"
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                />
                {error && form?.dob === "" && (
                  <span className="text-danger">Select your date of birth</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Full Address
                </label>
                <input
                  onChange={handleChange}
                  value={form?.address}
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="Your Address"
                />
                {error && form?.address === "" && (
                  <span className="text-danger">Enter address</span>
                )}
              </div>
              <div className="form-fields mb-3">
                <label className="text-start" htmlFor="">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={form?.password}
                  name="password"
                  type="text"
                  className="form-control"
                  placeholder="Password"
                />
                {error && form?.password === "" && (
                  <span className="text-danger">Enter password</span>
                )}
              </div>
              <button className="register-btn">Create Now</button>
              <div className="forgot-pass d-flex justify-content-between">
                <h6 className="text-center my-2">
                  Already a Customer? <Link to="/login">Click here</Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
