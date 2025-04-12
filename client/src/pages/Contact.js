import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { message } from "antd";
import axios from "axios";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import WhatsApp from "@mui/icons-material/WhatsApp";

const Contact = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    msg: "",
  });
  const [error, setError] = useState(false);
  const [mapLoader, setMapLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMapLoader(false);
    }, 1500);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (
      form?.name === "" ||
      form?.email === "" ||
      form?.mobile === "" ||
      form?.msg === ""
    ) {
      setError(true);
      return;
    }
    try {
      const res = await axios.post("/api/contact/add-contact-form", form);
      if (res.data.success) {
        message.success(res.data.message);
        setForm({ name: "", email: "", mobile: "", msg: "" });
        setError(false);
      } else {
        message.error(res.data.message);
        setError(false);
      }
    } catch (error) {
      setError(false);
      console.log(error);
    }
  };

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
        dispatch(setUser(res.data.data));
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
      <div className="contact-page-container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 contact-image">
            <div className={`google-map loading ${mapLoader && "active"}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110670.2523966149!2d73.7966506934514!3d29.90907743948713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917b513d6964015%3A0xb54a4cb83b8f319b!2sSri%20Ganganagar%2C%20Rajasthan%20335001!5e0!3m2!1sen!2sin!4v1713164582809!5m2!1sen!2sin"
                width="600"
                style={{ border: "0px" }}
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 contact-form">
            <h5>Feel free to message us!</h5>
            <div className="hr-line mb-4"></div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 form-fields">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  className="form-control"
                  type="text"
                  value={form.name}
                  placeholder="Enter your name"
                />
                <span className="text-danger">
                  <small>
                    {error && form?.name === "" && "Please enter your name"}
                  </small>
                </span>
              </div>
              <div className="mb-2 form-fields">
                <label className="form-label" htmlFor="name">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                  type="email"
                  value={form.email}
                  placeholder="Enter your email"
                />
                <span className="text-danger">
                  <small>
                    {error && form?.email === "" && "Please enter your email"}
                  </small>
                </span>
              </div>
              <div className="mb-2 form-fields">
                <label className="form-label" htmlFor="name">
                  Mobile
                </label>
                <input
                  onChange={handleChange}
                  name="mobile"
                  className="form-control"
                  type="text"
                  value={form.mobile}
                  placeholder="Enter your phone number"
                />
                <span className="text-danger">
                  <small>
                    {error && form?.mobile === "" && "Please enter your mobile"}
                  </small>
                </span>
              </div>
              <div className="mb-2 form-fields">
                <label className="form-label" htmlFor="name">
                  Message
                </label>
                <textarea
                  onChange={handleChange}
                  className="form-control"
                  value={form.msg}
                  name="msg"
                  rows="3"
                  placeholder="How can we help you?"
                ></textarea>
                <span className="text-danger">
                  <small>
                    {error && form?.msg === "" && "Please enter your message"}
                  </small>
                </span>
              </div>
              <button type="submit" className="register-btn m-0">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
