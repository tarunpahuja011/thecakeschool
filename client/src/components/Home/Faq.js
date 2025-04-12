import React from "react";
import "./Faq.css";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <React.Fragment>
      <div className="faq-container">
        <h2 className="faq">Frequently Asked Question</h2>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Can we purchase anything related to games?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Absolutely! we do recharge of many games. we provide very fast
                service.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Are the mobile back skins compatible with wireless charging?
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Yes, our skins are designed to be compatible with wireless
                charging. You can enjoy personalization without sacrificing
                functionality.
              </div>
            </div>
          </div>
          <span>
            Feel free to <Link to="/contact">contact us</Link> if you have more
            questions or need assistance! Your satisfaction is our priority.
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
