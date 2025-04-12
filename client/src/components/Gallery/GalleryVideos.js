import React from "react";
import IMAGES from "../../img/image";

const GalleryVideos = () => {
  return (
    <div className="gallery-container">
      <div className="row">
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v1} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v2} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v3} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v4} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v5} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v6} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v7} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v8} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v9} type="video/mp4" />
          </video>
        </div>
        <div className="mb-3 col-12 col-sm-12 col-md-3 col-lg-3">
          <video width="100%" height="100%" controls>
            <source src={IMAGES.v10} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default GalleryVideos;
