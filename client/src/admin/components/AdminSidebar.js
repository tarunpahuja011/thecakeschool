import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import HelpIcon from "@mui/icons-material/Help";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import InventoryIcon from "@mui/icons-material/Inventory";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar-container">
      <span>
        <small>MAIN</small>
      </span>
      <ul>
        <li>
          <Link to="/admin-dashboard">
            <HomeIcon className="me-2" />
            Dashboard
          </Link>
        </li>
      </ul>
      <span>
        <small>LISTS</small>
      </span>
      <ul>
        <li>
          <Link to="/admin-users">
            <GroupIcon className="me-2" />
            Users
          </Link>
        </li>

        <li>
          <Link to="/admin-register-users">
            <HowToRegIcon className="me-2" />
            Registration
          </Link>
        </li>
        <li>
          <Link to="/admin-courses">
            <AutoStoriesIcon className="me-2" />
            Courses
          </Link>
        </li>
        <li>
          <Link to="/admin-products">
            <InventoryIcon className="me-2" />
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin-demo-booking">
            <InventoryIcon className="me-2" />
            Demo Bookings
          </Link>
        </li>
        <li>
          <Link to="/admin-queries">
            <HelpIcon className="me-2" />
            Queries
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
