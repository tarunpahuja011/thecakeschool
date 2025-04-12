import React, { useState } from "react";
import "./DashboardLayout.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../Menu/data";
import { useSelector } from "react-redux";
import { message } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CloseIcon from "@mui/icons-material/Close";

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);

  const sideBarMenu = user?.isAdmin ? adminMenu : userMenu;

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successful");
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="mobile-menu mb-4 d-block d-md-block d-lg-none">
        <WidgetsIcon
          className="menu-icon"
          onClick={() => setActiveMenu(!activeMenu)}
        />
        <div className={`mobile-menu-container ${activeMenu && "activeMenu"}`}>
          <CloseIcon
            className="close-icon"
            onClick={() => setActiveMenu(!activeMenu)}
          />
          {sideBarMenu.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <div key={index}>
                <div className={`menu-item ${isActive && "active"}`}>
                  <IconComponent />
                  <Link to={item.path}>{item.name}</Link>
                </div>
                <hr className="text-muted" />
              </div>
            );
          })}
          <div onClick={handleLogout} className="menu-item">
            <LogoutIcon />
            <Link>Logout</Link>
          </div>
          <hr className="text-muted" />
        </div>
      </div>
      <div className="dashboard-layout">
        <div className="dash-left d-none d-lg-block">
          <div className="dash-logo">
            <b>
              <h4>Genius Gate</h4>
            </b>
          </div>
          <hr />
          <div className="dash-menu">
            {sideBarMenu.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <div key={index}>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <IconComponent />
                    <Link to={item.path}>{item.name}</Link>
                  </div>
                </div>
              );
            })}
            <div onClick={handleLogout} className="menu-item">
              <LogoutIcon />
              <Link>Logout</Link>
            </div>
          </div>
        </div>
        <div className="dash-right">
          <div className="dash-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
