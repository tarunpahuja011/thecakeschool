import React from "react";
import Marquee from "react-fast-marquee";

const SliderText = ({ text, direction, bg }) => {
  return (
    <div
      className="slider-text-container"
      style={{
        backgroundColor: `${bg}`,
        padding: "10px",
      }}
    >
      <Marquee speed={50} direction={direction}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((item, index) => {
          return (
            <div
              key={index}
              style={{ margin: "0 15px", fontWeight: "500", color: "#fff" }}
            >
              {text}
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default SliderText;
