import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <h4>Menu</h4>
        <ul>
          <li
            className={`${location.pathname === "/user-dashboard" && "active"}`}
          >
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li className={`${location.pathname === "/my-courses" && "active"}`}>
            <Link to="/my-courses">My Courses</Link>
          </li>
          <li className={`${location.pathname === "/my-account" && "active"}`}>
            <Link to="/my-account">Account Details</Link>
          </li>
          <li style={{ cursor: "pointer" }} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
