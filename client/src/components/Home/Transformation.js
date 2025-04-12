import React, { useState } from "react";
import { ReactCompareSlider } from "react-compare-slider";

import IMAGES from "../../img/image";
import "./Transformation.css";

const Transformation = () => {
  return (
    <div className="transformation-container">
      <h2>The Transformation your phone needs</h2>
      <ReactCompareSlider
        itemOne={<img width="100%" src={IMAGES.before} />}
        itemTwo={<img width="100%" src={IMAGES.after} />}
      />
    </div>
  );
};

export default Transformation;
