import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Cookies from "js-cookie";
import { useGoogleLogout } from "react-google-login";
import { clientId } from "../utils/constants";

const navItems = ["How it works", "Requesters", "Workers", "Pricing", "About"];
const Navbar = () => {
  const auth = useContext(AuthContext);
  const openSideBar = () => {
    let navMobile = document.querySelector(".nav-mobile");
    let hamburgerBtn = document.querySelector("header .hamburger-btn");
    if (!navMobile.classList.contains("open")) {
      navMobile.classList.add("open");
      hamburgerBtn.classList.add("open");
    }
  };
  const closeSideBar = () => {
    let navMobile = document.querySelector(".nav-mobile");
    let hamburgerBtn = document.querySelector("header .hamburger-btn");
    if (navMobile.classList.contains("open")) {
      navMobile.classList.remove("open");
      hamburgerBtn.classList.remove("open");
    }
  };
  const handleLogInOut = () => {
    Cookies.remove("alias");
    signOut();
    auth.setAuth(false);
  };
  const onLogoutSuccess = (res) => {};

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  return (
    <>
      <nav className="nav-mobile">
        <div className="blur-background"></div>
        <ul className="nav-lists">
          <li className="close" onClick={closeSideBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </li>
          <li className="nav-item">
            <Link to="/" className="logo">
              ICrowdTask
            </Link>
          </li>
          {navItems.map((item, id) => (
            <li className="nav-item" key={id}>
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <header>
        <div className="hamburger-btn" onClick={openSideBar}>
          <div className="hamburger"></div>
        </div>

        <h1 className="logo-name">
          <Link to="/" className="logo">
            ICrowdTask
          </Link>
        </h1>
        <nav>
          <ul className="nav-lists">
            {navItems.map((item, id) => (
              <li className="nav-item" key={id}>
                {item}
                <div className="line"></div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="login-container">
          {auth ? (
            <div
              className="btn login-btn"
              style={{ cursor: "pointer" }}
              onClick={handleLogInOut}
            >
              Log out
            </div>
          ) : (
            <Link to="/login" className="btn login-btn">
              Log in
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
