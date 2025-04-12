import React from "react";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LanguageIcon from "@mui/icons-material/Language";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div
      className="container-fluid how-it-works"
      style={{ borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }}
    >
      <div className="container before-footer">
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3 col-12 text-center mb-4 mb-md-0 mb-lg-0">
            <LocalShippingIcon className="icon" />
            <h6 className="my-3 poppins">24/7 Instant Delivery</h6>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 col-12 text-center mb-4 mb-md-0 mb-lg-0">
            <SyncLockIcon className="icon" />
            <h6 className="my-3 poppins">100% Safe and Legitimate</h6>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 col-12 text-center mb-4 mb-md-0 mb-lg-0">
            <LanguageIcon className="icon" />
            <h6 className="my-3 poppins">Easy and secure payment methods</h6>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 col-12 text-center mb-4 mb-md-0 mb-lg-0">
            <SupportAgentIcon className="icon" />
            <h6 className="my-3 poppins">24/7 Support</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
