import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <li className="nav-item">How it works</li>
          <li className="nav-item">Requesters</li>
          <li className="nav-item">Workers</li>
          <li className="nav-item">Pricing</li>
          <li className="nav-item">About</li>
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
            <li className="nav-item">
              How it works
              <div className="line"></div>
            </li>
            <li className="nav-item">
              Requesters
              <div className="line"></div>
            </li>
            <li className="nav-item">
              Workers
              <div className="line"></div>
            </li>
            <li className="nav-item">
              Pricing
              <div className="line"></div>
            </li>
            <li className="nav-item">
              About
              <div className="line"></div>
            </li>
          </ul>
        </nav>
        <div className="login">
          <Link to="/login" className="btn login-btn">
            Log in
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
