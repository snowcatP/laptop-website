import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import Slider from "react-slick";

const Product = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: 0,
    vertical: true,
    asNavFor: nav1,
    ref: (slider) => (sliderRef2 = slider),
    responsive: [
      {
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const settingsMain = {
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: nav2,
    ref: (slider) => (sliderRef1 = slider),
  };

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <>
        {/* SECTION */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* Product main img */}
              <div className="col-md-5 col-md-push-2">
                <Slider id="product-main-img" {...settingsMain}>
                  <div className="product-preview">
                    <img src="./assets/img/product01.png" alt="" />
                  </div>
                  <div className="product-preview">
                    <img src="./assets/img/product03.png" alt="" />
                  </div>
                  <div className="product-preview">
                    <img src="./assets/img/product06.png" alt="" />
                  </div>
                  <div className="product-preview">
                    <img src="./assets/img/product08.png" alt="" />
                  </div>
                </Slider>
              </div>
              {/* /Product main img */}
              {/* Product thumb imgs */}
              <div className="col-md-2  col-md-pull-5">
                <Slider id="product-imgs" {...settings}>
                  <div className="product-preview">
                    <img src="./assets/img/product01.png" alt="" />
                  </div>
                  <div className="product-preview">
                    <img src="./assets/img/product03.png" alt="" />
                  </div>
                  <div className="product-preview">
                    <img src="./assets/img/product06.png" alt="" />
                  </div>
                  <div className="product-preview">
                    <img src="./assets/img/product08.png" alt="" />
                  </div>
                </Slider>
              </div>
              {/* /Product thumb imgs */}
              {/* Product details */}
              <div className="col-md-5">
                <div className="product-details">
                  <h2 className="product-name">product name goes here</h2>
                  <div>
                    <div className="product-rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-o" />
                    </div>
                    <Link className="review-link" to="#">
                      10 Review(s) | Add your review
                    </Link>
                  </div>
                  <div>
                    <h3 className="product-price">
                      $980.00 <del className="product-old-price">$990.00</del>
                    </h3>
                    <span className="product-available">In Stock</span>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div className="product-options">
                    <label>
                      Size
                      <select className="input-select">
                        <option value={0}>X</option>
                      </select>
                    </label>
                    <label>
                      Color
                      <select className="input-select">
                        <option value={0}>Red</option>
                      </select>
                    </label>
                  </div>
                  <div className="add-to-cart">
                    <div className="qty-label">
                      Qty
                      <div className="input-number">
                        <input type="number" />
                        <span className="qty-up">+</span>
                        <span className="qty-down">-</span>
                      </div>
                    </div>
                    <button className="add-to-cart-btn">
                      <i className="fa fa-shopping-cart" /> add to cart
                    </button>
                  </div>
                  <ul className="product-btns">
                    <li>
                      <Link to="#">
                        <i className="fa fa-heart-o" /> add to wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-exchange" /> add to compare
                      </Link>
                    </li>
                  </ul>
                  <ul className="product-links">
                    <li>Category:</li>
                    <li>
                      <Link to="#">Headphones</Link>
                    </li>
                    <li>
                      <Link to="#">Accessories</Link>
                    </li>
                  </ul>
                  <ul className="product-links">
                    <li>Share:</li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-google-plus" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-envelope" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Product details */}
              {/* Product tab */}
              <div className="col-md-12">
                <div id="product-tab">
                  {/* product tab nav */}
                  <ul className="tab-nav">
                    <li className="active">
                      <Link data-toggle="tab" to="#tab1">
                        Description
                      </Link>
                    </li>
                    <li>
                      <Link data-toggle="tab" to="#tab2">
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link data-toggle="tab" to="#tab3">
                        Reviews (3)
                      </Link>
                    </li>
                  </ul>
                  {/* /product tab nav */}
                  {/* product tab content */}
                  <div className="tab-content">
                    {/* tab1  */}
                    <div id="tab1" className="tab-pane fade in active">
                      <div className="row">
                        <div className="col-md-12">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* /tab1  */}
                    {/* tab2  */}
                    <div id="tab2" className="tab-pane fade in">
                      <div className="row">
                        <div className="col-md-12">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* /tab2  */}
                    {/* tab3  */}
                    <div id="tab3" className="tab-pane fade in">
                      <div className="row">
                        {/* Rating */}
                        <div className="col-md-3">
                          <div id="rating">
                            <div className="rating-avg">
                              <span>4.5</span>
                              <div className="rating-stars">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                              </div>
                            </div>
                            <ul className="rating">
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                </div>
                                <div className="rating-progress">
                                  <div style={{ width: "80%" }} />
                                </div>
                                <span className="sum">3</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                </div>
                                <div className="rating-progress">
                                  <div style={{ width: "60%" }} />
                                </div>
                                <span className="sum">2</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <i className="fa fa-star-o" />
                                </div>
                                <div className="rating-progress">
                                  <div />
                                </div>
                                <span className="sum">0</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <i className="fa fa-star-o" />
                                  <i className="fa fa-star-o" />
                                </div>
                                <div className="rating-progress">
                                  <div />
                                </div>
                                <span className="sum">0</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star" />
                                  <i className="fa fa-star-o" />
                                  <i className="fa fa-star-o" />
                                  <i className="fa fa-star-o" />
                                  <i className="fa fa-star-o" />
                                </div>
                                <div className="rating-progress">
                                  <div />
                                </div>
                                <span className="sum">0</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* /Rating */}
                        {/* Reviews */}
                        <div className="col-md-6">
                          <div id="reviews">
                            <ul className="reviews">
                              <li>
                                <div className="review-heading">
                                  <h5 className="name">John</h5>
                                  <p className="date">27 DEC 2018, 8:0 PM</p>
                                  <div className="review-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o empty" />
                                  </div>
                                </div>
                                <div className="review-body">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="review-heading">
                                  <h5 className="name">John</h5>
                                  <p className="date">27 DEC 2018, 8:0 PM</p>
                                  <div className="review-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o empty" />
                                  </div>
                                </div>
                                <div className="review-body">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="review-heading">
                                  <h5 className="name">John</h5>
                                  <p className="date">27 DEC 2018, 8:0 PM</p>
                                  <div className="review-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o empty" />
                                  </div>
                                </div>
                                <div className="review-body">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                  </p>
                                </div>
                              </li>
                            </ul>
                            <ul className="reviews-pagination">
                              <li className="active">1</li>
                              <li>
                                <Link to="#">2</Link>
                              </li>
                              <li>
                                <Link to="#">3</Link>
                              </li>
                              <li>
                                <Link to="#">4</Link>
                              </li>
                              <li>
                                <Link to="#">
                                  <i className="fa fa-angle-right" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* /Reviews */}
                        {/* Review Form */}
                        <div className="col-md-3">
                          <div id="review-form">
                            <form className="review-form">
                              <input
                                className="input"
                                type="text"
                                placeholder="Your Name"
                              />
                              <input
                                className="input"
                                type="email"
                                placeholder="Your Email"
                              />
                              <textarea
                                className="input"
                                placeholder="Your Review"
                                defaultValue={""}
                              />
                              <div className="input-rating">
                                <span>Your Rating: </span>
                                <div className="stars">
                                  <input
                                    id="star5"
                                    name="rating"
                                    defaultValue={5}
                                    type="radio"
                                  />
                                  <label htmlFor="star5" />
                                  <input
                                    id="star4"
                                    name="rating"
                                    defaultValue={4}
                                    type="radio"
                                  />
                                  <label htmlFor="star4" />
                                  <input
                                    id="star3"
                                    name="rating"
                                    defaultValue={3}
                                    type="radio"
                                  />
                                  <label htmlFor="star3" />
                                  <input
                                    id="star2"
                                    name="rating"
                                    defaultValue={2}
                                    type="radio"
                                  />
                                  <label htmlFor="star2" />
                                  <input
                                    id="star1"
                                    name="rating"
                                    defaultValue={1}
                                    type="radio"
                                  />
                                  <label htmlFor="star1" />
                                </div>
                              </div>
                              <button className="primary-btn">Submit</button>
                            </form>
                          </div>
                        </div>
                        {/* /Review Form */}
                      </div>
                    </div>
                    {/* /tab3  */}
                  </div>
                  {/* /product tab content  */}
                </div>
              </div>
              {/* /product tab */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /SECTION */}
      </>

      <Letter />
      <Footer />
    </>
  );
};
export default Product;
