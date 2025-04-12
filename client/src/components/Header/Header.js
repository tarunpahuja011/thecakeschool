import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Header.css";
import SideMenu from "./SideMenu";
import Backdrop from "./Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Tippy from "@tippyjs/react";
import LogoutTippy from "./LogoutTippy";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import SearchContainer from "../SearchContainer";
import CartSideMenu from "../CartSideMenu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import IMAGES from "../../img/image";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sideMenu, setSideMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getUserData = async () => {
    axios
      .post(
        "/api/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <header className="header">
        <div className="top-header">
          <div className="social">The Cakes School</div>
          <div className="contact">+91 9664419819</div>
        </div>
        <div className="header-main">
          <div
            className="burger-icon d-block d-lg-none"
            onClick={() => setSideMenu(!sideMenu)}
          >
            <MenuIcon className="icon" />
          </div>
          <SideMenu sideMenu={sideMenu} setSideMenu={setSideMenu} />
          <Backdrop sideMenu={sideMenu} setSideMenu={setSideMenu} />
          <div className="logo" onClick={() => navigate("/")}>
            <img onClick={() => navigate("/")} src={IMAGES.logo} alt="logo" />
          </div>
          <div className="menus d-none d-md-none d-lg-block">
            <ul className="p-0">
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/student-verification">Student Verification</Link>
              </li>
              <li>
                <Link to="/certificate">Certificate</Link>
              </li>
              <li>
                <Link to="/book-a-demo">Book Demo</Link>
              </li>
              {!user && (
                <li>
                  <Link to="/login">My Account</Link>
                </li>
              )}
              {user && (
                <li>
                  <Link to="/user-dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="action-btns">
            {/* {user && (
              <div onClick={() => navigate("/wallet")} className="wallet-cont">
                <span>{user?.balance}</span>
                <span className="ms-2">
                  <AccountBalanceWalletIcon className="icon" />
                </span>
              </div>
            )} */}
            {/* <SearchIcon
              onClick={() => setSearch(!search)}
              className="icon d-none d-lg-block"
            /> */}
            {location.pathname !== "/cart" && (
              <LocalMallIcon
                onClick={() => navigate("/cart")}
                className="icon d-none d-lg-block"
              />
            )}
            {location.pathname !== "/cart" && (
              <LocalMallIcon
                onClick={() => setCartMenu(!cartMenu)}
                className="icon d-block d-lg-none"
              />
            )}
            <Tippy
              interactive
              theme="light"
              content={<LogoutTippy user={user && user} />}
            >
              <span className="menu-img-container d-flex">
                <PersonIcon
                  className="icon"
                  onClick={() => navigate("/login")}
                />
                {user && <KeyboardArrowDownIcon className="text-white" />}
              </span>
            </Tippy>
          </div>
        </div>
      </header>
      <CartSideMenu cartMenu={cartMenu} setCartMenu={setCartMenu} />
      <SearchContainer search={search} setSearch={setSearch} />
    </>
  );
};

export default Header;
