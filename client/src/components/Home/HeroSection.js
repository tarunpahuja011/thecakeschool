import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../img/image";
import Slider from "react-slick";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="container-fluid hero-container hero-bg">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 center">
          <span>The Cakes School</span>
          <h2>Let's Bake Happiness Together</h2>
        </div>
        <div className="hero-video-container col-12 col-sm-12 col-md-6 col-lg-6">
          {/* <video autoPlay={true} controls src={IMAGES.video}></video> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
