import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import "./BookDemo.css";
import axios from "axios";
import { message } from "antd";
import IMAGES from "../img/image";
import Reviews from "../components/Home/Reviews";
import GalleryVideos from "../components/Gallery/GalleryVideos";

const BookDemo = () => {
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    txnId: "",
  });
  const [file, setFile] = useState(null);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleBook(e) {
    if (
      form?.fullName === "" ||
      form?.fatherName === "" ||
      form?.motherName === "" ||
      form?.dob === "" ||
      form?.email === "" ||
      form?.phone === "" ||
      form?.address === ""
    ) {
      return setError(true);
    }
    if (file === null) {
      return setError(true);
    }
    setPaymentPopup(!paymentPopup);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form?.txnId === "") {
      return message.error("Enter Transaction ID");
    }
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("fullName", form?.fullName);
      formData.append("fatherName", form?.fatherName);
      formData.append("motherName", form?.motherName);
      formData.append("dob", form?.dob);
      formData.append("email", form?.email);
      formData.append("phone", form?.phone);
      formData.append("address", form?.address);
      formData.append("txnId", form?.txnId);

      const res = await axios.post("/api/demo/book-demo", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setForm({
          fullName: "",
          fatherName: "",
          motherName: "",
          dob: "",
          email: "",
          phone: "",
          address: "",
          txnId: "",
        });
        setPaymentPopup(false);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      {paymentPopup && (
        <div className="payment-popup">
          <div className="barcode-container">
            <img src={IMAGES.barcode} alt="" />
            <div className="form-fields w-100 mt-3">
              <h2 className="text-danger text-center my-3">
                Pay <b>100/-</b>
              </h2>
            </div>
            <div className="form-fields w-100 mt-3">
              <input
                onChange={handleChange}
                value={form?.txnId}
                name="txnId"
                placeholder="Enter Transaction Id"
                type="text"
                className="form-control"
              />
              {error && form?.txnId === "" && (
                <span className="text-danger">
                  <small>Enter Transaction ID</small>
                </span>
              )}
            </div>
            <p className="text-danger">
              <small>
                Note: After Successfull Payment click on Verify Button
              </small>
            </p>
            <div className="d-flex gap-2">
              <button onClick={handleSubmit} className="c-btn pay-btn m-0 w-50">
                Verify Payment
              </button>
              <button
                onClick={() => setPaymentPopup(!paymentPopup)}
                className="c-btn pay-btn m-0 bg-danger w-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container book-demo-container">
        <div className="demo-bg">
          <h2 className="m-0 mb-2">Demo Class Booking</h2>
          <span>The Cakes School (SGNR)</span>
        </div>
        <div className="col-12">
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Photo
            </label>
            <input
              onChange={handleFileChange}
              className="form-control"
              name="image"
              type="file"
            />
            {error && file === null && (
              <span className="text-danger">
                <small>Select a photo</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Full Name
            </label>
            <input
              onChange={handleChange}
              name="fullName"
              value={form?.fullName}
              className="form-control"
              type="text"
            />
            {error && form?.fullName === "" && (
              <span className="text-danger">
                <small>Enter full name</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Father Name
            </label>
            <input
              onChange={handleChange}
              name="fatherName"
              value={form?.fatherName}
              className="form-control"
              type="text"
            />
            {error && form?.fatherName === "" && (
              <span className="text-danger">
                <small>Enter father name</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Mother Name
            </label>
            <input
              onChange={handleChange}
              name="motherName"
              value={form?.motherName}
              className="form-control"
              type="text"
            />
            {error && form?.motherName === "" && (
              <span className="text-danger">
                <small>Enter mother name</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Date of Birth
            </label>
            <input
              onChange={handleChange}
              name="dob"
              value={form?.dob}
              className="form-control"
              type="date"
            />
            {error && form?.dob === "" && (
              <span className="text-danger">
                <small>Select date of birth</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              value={form?.email}
              className="form-control"
              type="text"
            />
            {error && form?.email === "" && (
              <span className="text-danger">
                <small>Enter email</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              name="phone"
              value={form?.phone}
              className="form-control"
              type="text"
            />
            {error && form?.phone === "" && (
              <span className="text-danger">
                <small>Enter phone number</small>
              </span>
            )}
          </div>
          <div className="form-fields mb-3">
            <label className="form-label" htmlFor="">
              Address
            </label>
            <input
              onChange={handleChange}
              name="address"
              value={form?.address}
              className="form-control"
              type="text"
            />
            {error && form?.address === "" && (
              <span className="text-danger">
                <small>Enter address</small>
              </span>
            )}
          </div>
          <button onClick={handleBook} className="s-btn">
            Pay & Book a Demo
          </button>
        </div>
      </div>
      <GalleryVideos />
      <Reviews />
    </Layout>
  );
};

export default BookDemo;
