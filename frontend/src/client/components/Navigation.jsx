import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <>
      {/* NAVIGATION */}
      <nav id="navigation">
        {/* container */}
        <div className="container">
          {/* responsive-nav */}
          <div id="responsive-nav">
            {/* NAV */}
            <ul className="main-nav nav navbar-nav">
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="#">Hot Deals</Link>
              </li>
              <li>
                <Link to="#">Categories</Link>
              </li>
              <li>
                <Link to="#">Laptops</Link>
              </li>
              <li>
                <Link to="#">Smartphones</Link>
              </li>
              <li>
                <Link to="#">Cameras</Link>
              </li>
              <li>
                <Link to="#">Accessories</Link>
              </li>
            </ul>
            {/* /NAV */}
          </div>
          {/* /responsive-nav */}
        </div>
        {/* /container */}
      </nav>
      {/* /NAVIGATION */}
    </>
  );
};

export default Navigation;
