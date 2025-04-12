import React from "react";
import "./Reviews.css";
import Slider from "react-slick";
import IMAGES from "../../img/image";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 100,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="reviews-container">
      <div className="rev-title">
        <h2>Our Happy Students</h2>
        <button
          onClick={() => navigate("/gallery")}
          className="c-btn pay-btn m-0"
        >
          View All
        </button>
      </div>
      <Slider {...settings}>
        <div className="rev-img">
          <img src={IMAGES.r1} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r2} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r3} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r4} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r5} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r6} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r7} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r8} alt="" />
        </div>
        <div className="rev-img">
          <img src={IMAGES.r9} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Reviews;
