import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { message } from "antd";

const ForgotPass = () => {
  const [email, setEmail] = useState(null);
  // email otp
  const [otp, setOtp] = useState(null);
  // user enter otp
  const [userEnteredOtp, setUserEnteredOtp] = useState(null);
  const [tab, setTab] = useState(0);
  const [pass, setPass] = useState(null);
  const [cpass, setCpass] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateOTP = () => {
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(emailOtp);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/user/send-otp", {
        email,
        msg: "We got your back! For password reset OTP is",
      });
      if (res.data.success) {
        message.success(res.data.message);
        setLoading(false);
        setTab(1);
      } else {
        message.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/verify-otp", {
        email,
        userEnteredOtp,
      });
      if (res.data.success) {
        message.success(res.data.message);
        setTab(2);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (pass === cpass) {
      try {
        const res = await axios.post("/api/user/update-pass", { email, pass });
        if (res.data.success) {
          message.success(res.data.message);
          navigate("/login");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    generateOTP();
  }, []);

  return (
    <Layout>
      <div className="container register-container">
        <div className="row">
          {tab === 0 && (
            <div className="form col-12 col-sm-12 col-md-6 col-lg-6 d-block m-auto">
              <h6>Dont worry! Get Otp on Your Email</h6>
              <hr />
              <div className="mb-3 form-fields">
                <label className="form-label" htmlFor="name">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Registered with us"
                  className="form-control"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <button className="register-btn" onClick={handleSendOtp}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
              <hr />
              <p>
                Not a User? <Link to="/register">click here</Link>
              </p>
            </div>
          )}
          {tab === 1 && (
            <div className="form col-12 col-sm-12 col-md-6 col-lg-6 d-block m-auto">
              <h6>Reset Your Password</h6>
              <hr />
              <div className="mb-3 form-fields">
                <label className="form-label" htmlFor="name">
                  Verify Your Otp
                </label>
                <input
                  onChange={(e) => setUserEnteredOtp(e.target.value)}
                  placeholder="Enter Otp"
                  className="form-control"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <button className="register-btn" onClick={handleVerifyOtp}>
                  Verify
                </button>
              </div>
              <hr />
              <p>
                Not a User? <Link to="/register">click here</Link>
              </p>
            </div>
          )}
          {tab === 2 && (
            <div className="form col-12 col-sm-12 col-md-6 col-lg-6 d-block m-auto">
              <h6>Set Your Password</h6>
              <hr />
              <div className="mb-3 form-fields">
                <label className="form-label" htmlFor="name">
                  Enter Password
                </label>
                <input
                  onChange={(e) => setPass(e.target.value)}
                  className="form-control"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3 form-fields">
                <label className="form-label" htmlFor="name">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setCpass(e.target.value)}
                  className="form-control"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <button className="register-btn" onClick={handleUpdatePassword}>
                  Update My Password
                </button>
              </div>
              <hr />
              <p>
                Not a User? <Link to="/register">click here</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPass;
