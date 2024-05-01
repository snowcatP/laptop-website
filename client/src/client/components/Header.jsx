import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


const Header = () => {
  
  return (
     <div>
    {/* HEADER */}
      
      <header>
        {/* TOP HEADER */}
        <div id="top-header">
          <div className="container">
            <ul className="header-links pull-left">
              <li>
                <Link to="#">
                  <i className="fa fa-phone" /> +84-2365-521
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-envelope-o" /> email@email.com
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-map-marker" /> 1 Vo Van Ngan
                </Link>
              </li>
            </ul>
            <ul className="header-links pull-right">
              <li>
                <Link to="#">
                  <i className="fa fa-dollar" /> VND
                </Link>
              </li>
              <li>
                <Link to="/user/profile">
                  <i className="fa fa-user-o" /> My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* /TOP HEADER */}
        {/* MAIN HEADER */}
        <div id="header">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* LOGO */}
              <div className="col-md-3">
                <div className="header-logo">
                  <Link to="/" className="logo">
                    <img src="../assets/img/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              {/* /LOGO */}
              {/* SEARCH BAR */}
              <div className="col-md-6">
                <div className="header-search">
                  <form>
                    <select className="input-select">
                      <option value={0}>All Categories</option>
                      <option value={1}>Category 01</option>
                      <option value={1}>Category 02</option>
                    </select>
                    <input className="input" placeholder="Search here" />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
              {/* /SEARCH BAR */}
              {/* ACCOUNT */}
              <div className="col-md-3 clearfix">
                <div className="header-ctn">
                  {/* Cart */}
                  <div className="dropdown">
                    <Link
                      to='#'
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <i className="fa fa-shopping-cart" />
                      <span>Your Cart</span>
                      <div className="qty">3</div>
                    </Link>
                    <div className="cart-dropdown">
                      <div className="cart-list">
                        <div className="product-widget">
                          <div className="product-img">
                            <img src="../assets/img/product01.png" alt="" />
                          </div>
                          <div className="product-body">
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              <span className="qty">1x</span>$980.00
                            </h4>
                          </div>
                          <button className="delete">
                            <i className="fa fa-close" />
                          </button>
                        </div>
                        <div className="product-widget">
                          <div className="product-img">
                            <img src="../assets/img/product02.png" alt="" />
                          </div>
                          <div className="product-body">
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              <span className="qty">3x</span>$980.00
                            </h4>
                          </div>
                          <button className="delete">
                            <i className="fa fa-close" />
                          </button>
                        </div>
                      </div>
                      <div className="cart-summary">
                        <small>3 Item(s) selected</small>
                        <h5>SUBTOTAL: $2940.00</h5>
                      </div>
                      <div className="cart-btns">
                        <Link to="/user/cart">View Cart</Link>
                        <Link to="/checkout">
                          Checkout <i className="fa fa-arrow-circle-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Cart */}
                  {/* Account */}
                  <div>
                    <Link to="/login">
                      <i className="fa fa-user" />
                      <span>Account</span>
                    </Link>
                  </div>
                  {/* /Account */}
                  
                </div>
              </div>
              {/* /ACCOUNT */}
            </div>
            {/* row */}
          </div>
          {/* container */}
        </div>
        {/* /MAIN HEADER */}
      </header>
      {/* /HEADER */}
    </div>
  );
};

export default Header;
