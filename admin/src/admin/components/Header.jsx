import React from "react";
import { Link } from "react-router-dom";
const Header = () => {

  

  return (
    <div>
      {/* ======= Header ======= */}
      <div
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link href="index.html" className="logo d-flex align-items-center">
            <img src="./assets/img/logo-admin.png" alt="aaaaaa" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" />
        </div>
        {/* End Logo */}
        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>
        {/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </Link>
            </li>

            {/* End Messages Nav */}
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src="./components/assets/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  K. Anderson
                </span>
              </Link>
              {/* End Profile Iamge Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Kevin Anderson</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
              {/* End Profile Dropdown Items */}
            </li>
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Icons Navigation */}
      </div>
      {/* End Header */}
    </div>
  );
};

export default Header;
