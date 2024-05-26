import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* FOOTER */}
      <footer id="footer">
        {/* top footer */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">About Us</h3>
                  <p>
                    We are students from HCMUTE (Hoang, Hao, Hiep K21). This project is built for OOSE course.
                    Contact us if you interest.
                  </p>
                  <ul className="footer-links">
                    <li>
                      <Link to="#">
                        <i className="fa fa-map-marker" />
                        1 Vo Van Ngan
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-phone" />
                        +09-2986-3793
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-envelope-o" />
                        xuanhoang281003@email.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Categories</h3>
                  <ul className="footer-links">
                    <li>
                      <Link to="/">Hot deals</Link>
                    </li>
                    <li>
                      <Link to="/store">Laptops</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix visible-xs" />
              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Information</h3>
                  <ul className="footer-links">
                    <li>
                      <Link to="#">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms &amp; Conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Service</h3>
                  <ul className="footer-links">
                    <li>
                      <Link to="/user/profile">My Account</Link>
                    </li>
                    <li>
                      <Link to="/user/cart">View Cart</Link>
                    </li>
                    <li>
                      <Link to="/user/orders">Track My Order</Link>
                    </li>
                    <li>
                      <Link to="#">Help</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /top footer */}
        {/* bottom footer */}
        <div id="bottom-footer" className="section">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-12 text-center">
                <ul className="footer-payments">
                  <li>
                    <Link to="#">
                      <i className="fa fa-cc-visa" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-credit-card" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-cc-paypal" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-cc-mastercard" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-cc-discover" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-cc-amex" />
                    </Link>
                  </li>
                </ul>
                <span className="copyright">
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                  <Link to="https://colorlib.com" target="_blank">
                    Colorlib
                  </Link>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </span>
              </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /bottom footer */}
      </footer>
      {/* /FOOTER */}
    </>
  );
};

export default Footer;
