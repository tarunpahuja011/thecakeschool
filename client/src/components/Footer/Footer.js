import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import CallIcon from "@mui/icons-material/Call";
import "../Footer/Footer.css";
import IMAGES from "../../img/image";

const Footer = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  function sendWhatsapp() {
    var text = encodeURIComponent(`Hello! I want to Order a Birthday Cake`);
    window.open(`https://wa.me/919664419819?text=${text}`, "_blank");
  }

  return (
    <>
      <div className="wa-container">
        <Link
          target="_blank"
          to="https://wa.me/919664419819?text=Hello! I have some query"
        >
          <WhatsAppIcon className="icon" />
        </Link>
      </div>
      <div className="before-footer">
        <span>Book Your Birthday Cake Now</span>
        <button onClick={sendWhatsapp} className="">
          WhatsApp Us Now
        </button>
      </div>
      <div className="footer-container">
        <div className="row">
          <div className="p-4 col-12 col-sm-12 col-md-3 col-lg-3">
            <img width="200px" src={IMAGES.logo} alt="" />
            <p>
              The Cakes School embarked on its brand journey by establishing its
              inaugural retail outlet in Sangrur, leveraging its extensive
              background in the wholesale bakery industry.
            </p>
            <div className="social">
              <Link to="https://www.instagram.com/cakesbytarun">
                <InstagramIcon className="icon" />
              </Link>
              <Link to="https://wa.me/919664419819">
                <WhatsAppIcon className="icon" />
              </Link>
            </div>
          </div>
          <div className="p-4 col-6 col-sm-6 col-md-3 col-lg-3">
            <h4>Links</h4>
            <ul className="footer-ul">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Use</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="p-4 col-6 col-sm-6 col-md-3 col-lg-3">
            <h4>Student Corner</h4>
            <ul className="footer-ul">
              <li>
                <Link to="/student-verification">Student Verification</Link>
              </li>
              <li>
                <Link to="/download-certificate">Download Certificates</Link>
              </li>
            </ul>
          </div>
          <div className="p-4 col-12 col-sm-12 col-md-3 col-lg-3">
            <h4>Explore</h4>

            <ul className="footer-ul">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Bakery</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>
          <div className="address p-4 col-12 col-sm-12 col-md-6 col-lg-6">
            <h5>BAKERY ADDRESS</h5>
            <span>
              Shree Bakers & Cakes Studio, Near Akalgarh Gurudwara, Sri
              Ganganagar, Rajasthan
            </span>
            <ul>
              <li>
                <EmailIcon className="icon me-2" />
                thecakeschool@gmail.com
              </li>
              <li>
                <CallIcon className="icon me-2" />
                +91 9664419819
              </li>
            </ul>
          </div>
          <div className="address p-4 col-12 col-sm-12 col-md-6 col-lg-6">
            <h5>INSTITUTE ADDRESS</h5>
            <span>
              Shree Bakers & Cakes Studio, Near Akalgarh Gurudwara, Sri
              Ganganagar, Rajasthan
            </span>
            <ul>
              <li>
                <EmailIcon className="icon me-2" />
                thecakeschool@gmail.com
              </li>
              <li>
                <CallIcon className="icon me-2" />
                +91 9664419819
              </li>
            </ul>
          </div>
          <hr />
          <div className="copyright col-12 col-sm-12 col-md-6 col-lg-6">
            THE CAKES SCHOOL | Copyright 2024. All rights reserved
          </div>
          <div className="copyright col-12 col-sm-12 col-md-6 col-lg-6">
            Designed & Developed by{" "}
            <Link target="_blank" to="https://aashirdigital.com">
              ~@aashirdigital
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
