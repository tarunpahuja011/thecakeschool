import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SideMenu.css";
import { message } from "antd";
import IMAGES from "../../img/image";

const SideMenu = ({ sideMenu, setSideMenu }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [submenu, setSubmenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successful");
    navigate("/login");
  };
  return (
    <div
      className={`sidemenu-container d-block d-md-block d-lg-none ${
        sideMenu ? "active" : ""
      }`}
    >
      <div className="sidemenu">
        <HighlightOffIcon
          onClick={() => setSideMenu(!sideMenu)}
          className="close-icon"
        />
        <ul className="p-0">
          {user && (
            <li>
              <Link to="/user-dashboard">Dashboard</Link>
            </li>
          )}
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setSideMenu(!sideMenu)}
              to="/student-verification"
            >
              Student Verification
            </Link>
          </li>
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/certificate">
              Certificate
            </Link>
          </li>
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/book-a-demo">
              Book a Demo
            </Link>
          </li>
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/gallery">
              Gallery
            </Link>
          </li>
          <li>
            <Link onClick={() => setSideMenu(!sideMenu)} to="/contact">
              Contact
            </Link>
          </li>
          {!user && (
            <div className="sidemenu-action-btn">
              <Link to="/login">Login</Link>
            </div>
          )}
          {user && (
            <div className="logout" onClick={handleLogout}>
              Logout
              <LogoutIcon className="icon" />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
