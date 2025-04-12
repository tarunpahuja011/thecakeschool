import React from "react";
import { Link } from "react-router-dom";
import "./Cta.css";

const Cta = () => {
  return (
    <div class="cta-register-container container-fluid">
      <div class="cta-bg" data-aos="fade-up">
        <div class="">
          <span class="text-bold fw-bold">
            India's Favourite Muslim Matrimony Website
          </span>
          <p class="text-light">
            Growing Community across India, largest network of its kind!
          </p>
        </div>
        <button class="register-btn">
          <Link to="/register">Register Free Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Cta;
