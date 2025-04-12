import React from "react";
import Layout from "../components/Layout/Layout";
import Reviews from "../components/Home/Reviews";
import IMAGES from "../img/image";
import GalleryVideos from "../components/Gallery/GalleryVideos";
import "./Gallery.css";

const Gallery = () => {
  return (
    <Layout>
      <div className="about-container">
        <h2 className="m-0">Gallery</h2>
      </div>
      <GalleryVideos />
      <Reviews />
    </Layout>
  );
};

export default Gallery;
