import React from "react";
import "./CashReward.css";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Person3Icon from "@mui/icons-material/Person3";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import QuizIcon from "@mui/icons-material/Quiz";

const CashReward = () => {
  return (
    <div className="container cash-reward-container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 cash-reward-image mb-5">
          <div className="row p-3 gap-3">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 cash-reward-card cash-icon">
              <EmojiEventsIcon className="icons" />
              <p>Cash Prizes</p>
              <span className="price">₹ 2.5 Lakh</span>
              <span>Online</span>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 cash-reward-card cash-icon">
              <Person3Icon className="icons" />
              <p>Students Enrolled</p>
              <span className="price">10k+</span>
              <span>Online</span>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 cash-reward-card cash-icon">
              <CardMembershipIcon className="icons" />
              <p>Certificate</p>
              <span className="price">10k+</span>
              <span>Offline</span>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 cash-reward-card cash-icon">
              <QuizIcon className="icons" />
              <p>Quiz Conducted</p>
              <span className="price">100+</span>
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 cash-reward-content">
          <h1 className="m-0 p-0">
            <b>Genius Gate 2024</b>
          </h1>
          <p className="m-0 p-0 mb-3">Now Conducting Online Quiz</p>
          <span className="text-muted mb-4">
            Nurture Your Future with GENIUS GATE: Unlock High Admission
            Scholarships for Competitive Test Preparation at ALLEN Career
            Institute. Join Nearly a Million Students in Building a Strong
            Foundation for Tomorrow's Success
          </span>
          <div className="row py-5">
            <div className="col-2 col-sm-2 col-md-1 co-lg-1 cash-icon">
              <DescriptionIcon className="icon" />
            </div>
            <div className="col-8">
              <h5>
                <b>Exam Conduction Process</b>
              </h5>
              <p>
                Online (from home) and Offline (at select centers). Students can
                opt to appear for both online and offline mode and be eligible
                for scholarships and cash rewards in both
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-2 col-sm-2 col-md-1 co-lg-1 cash-icon">
              <CalendarMonthIcon className="icon" />
            </div>
            <div className="col-8">
              <h5>
                <b>Exam Conduction Process</b>
              </h5>
              <p>
                Online (from home) and Offline (at select centers). Students can
                opt to appear for both online and offline mode and be eligible
                for scholarships and cash rewards in both
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashReward;
