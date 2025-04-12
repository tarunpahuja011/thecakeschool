import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "./Register.css";
import IMAGES from "../img/image";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form?.email === "tarun.pahuja011@gmail.com") {
      try {
        const res = await axios.post("/api/user/admin", form);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          navigate("/admin-dashboard");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post("/api/user/login", form);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          navigate("/user-dashboard");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="container-fluid hero-container bg-white register-container">
        <div className="row text-center">
          <div className="d-block m-auto col-12 col-sm-12 col-md-6 col-lg-6">
            <form className="register-form" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="form-fields mb-3">
                <input
                  onChange={handleChange}
                  value={form?.email}
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-fields mb-3">
                <input
                  onChange={handleChange}
                  value={form?.password}
                  name="password"
                  type="text"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button className="register-btn text-white">Login</button>
              <div className="forgot-pass d-flex justify-content-between">
                <h6 className="text-center my-2">
                  New Customer? <Link to="/register">Sign Up</Link>
                </h6>
                <h6 className="text-center my-2">
                  Forgot Password? <Link to="/forgot-password">Click Here</Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
