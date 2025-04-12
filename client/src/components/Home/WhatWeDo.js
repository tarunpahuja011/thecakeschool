import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import "./WhatWeDo.css";

const WhatWeDo = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="what-we-do-container container">
      <div className="row">
        <div className="col-sm-12 col-12 col-md-4 col-lg-4 text-center mb-3">
          <div
            className="w-card w-card-one"
            onClick={() => navigate("/courses")}
          >
            <div className="num">
              <h1 className="m-0">1</h1>
            </div>
            <div className="text">
              <h2 className="m-0">Institue</h2>
              <span>Institute of Baking</span>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-12 col-md-4 col-lg-4 text-center mb-3">
          <div
            className="w-card w-card-two"
            onClick={() => navigate("/products")}
          >
            <div className="num">
              <h1 className="m-0">2</h1>
            </div>
            <div className="text">
              <h2 className="m-0">Bakery</h2>
              <span>Gluten Free Biscuits & Cakes</span>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-12 col-md-4 col-lg-4 text-center mb-3">
          <div className="w-card w-card-three" onClick={showModal}>
            <div className="num">
              <h1 className="m-0">3</h1>
            </div>
            <div className="text">
              <h2 className="m-0">Lounge</h2>
              <span>The Sweet Place in Town</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Our Location"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110670.2523966149!2d73.7966506934514!3d29.90907743948713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917b513d6964015%3A0xb54a4cb83b8f319b!2sSri%20Ganganagar%2C%20Rajasthan%20335001!5e0!3m2!1sen!2sin!4v1713164582809!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Modal>
    </div>
  );
};

export default WhatWeDo;
