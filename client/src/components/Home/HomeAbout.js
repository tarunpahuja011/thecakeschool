import React from "react";
import IMAGES from "../../img/image";
import "./HomeAbout.css";

const HomeAbout = () => {
  return (
    <div className="home-about-container container">
      <div className="row">
        <div className="home-about-content col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
          <span>OUR HISTORY</span>
          <h2 className="my-4">
            Excellence & Dedication <br /> in our services!
          </h2>
          <p>
            The Cakes School, a premier institute for baking education,
            commenced its journey thereafter and received accreditation from the
            IAS board. We prioritize catering to individuals of varying skill
            levels, spanning from novices to seasoned professionals. Moreover,
            we provide comprehensive commercial consultancy services for those
            looking to launch their own baking enterprises, both domestically
            and internationally. As part of our expansion efforts, we now offer
            practical training opportunities and ensure job placement within our
            own establishment.
          </p>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center mb-3">
          <img src={IMAGES.one} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
