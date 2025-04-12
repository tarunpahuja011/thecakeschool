import React from "react";
import "./WhyOurProduct.css";
import IMAGES from "../../img/image";

const WhyOurProduct = () => {
  return (
    <>
      <h1 className="text-center mt-5 mb-5 yline position-relative">
        <b>Why Mobiheaven?</b>
      </h1>
      <div className="why-our-product-container">
        <div className="our-product our-product-content text-center">
          <h2>
            <b>Sculpted Elegance, Unmatched Quality</b>
          </h2>
          <p>
            Elevate your device's allure with our meticulously designed mobile
            back skins. Immerse yourself in the epitome of sophistication and
            unmatched quality
          </p>
        </div>
        <div className="our-product">
          <img src={IMAGES.o1} alt="" />
        </div>
      </div>
      <div className="why-our-product-container">
        <div className="our-product">
          <img src={IMAGES.o3} alt="" />
        </div>
        <div className="our-product our-product-content text-center">
          <h2>
            <b>Innovation in Every Design</b>
          </h2>
          <p>
            Unleash creativity with our diverse range of designs. Mobi Haven
            brings you innovation at your fingertips, ensuring your device
            stands out in every crowd.
          </p>
        </div>
      </div>
      <div className="why-our-product-container">
        <div className="our-product our-product-content text-center">
          <h2>
            <b>Your Style, Your Price</b>
          </h2>
          <p>
            At Mobi Haven, style is non-negotiable, and so is affordability.
            Explore a world where your unique expression meets budget-friendly
            choices, making your device truly yours.
          </p>
        </div>
        <div className="our-product">
          <img src={IMAGES.o2} alt="" />
        </div>
      </div>
    </>
  );
};

export default WhyOurProduct;
