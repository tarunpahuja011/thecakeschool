import React from "react";
import "./HomeGallery.css";
import IMAGES from "../../img/image";

const HomeGallery = () => {
  return (
    <div className="home-gallery-container">
      <img
        className="d-none d-md-none d-lg-block"
        src={IMAGES.desktop}
        alt=""
      />
      <img className="d-block d-lg-none" src={IMAGES.phone} alt="" />
    </div>
  );
};

export default HomeGallery;
