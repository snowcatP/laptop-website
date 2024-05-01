import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Letter from "./components/Letter";
import { getProducts } from "./service/ProductService";

const HomePage = () => {
  const settingsSlider = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    speed: 300,
    dots: true,
    arrows: true,
    centerPadding: '50px',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '40px',
        },
      },
    ],
  };

  const settingsWidget = {
    infinite: true,
    autoplay: true,
    speed: 300,
    dots: false,
    arrows: true,
  };

  const [products, setProducts] = useState([])

  useEffect(() => {
  
    const getAllProducts = async () => {
      try {
        const response = await getProducts()

        setProducts(response.data)
      } catch(error) {console.log(error)}
        
    }

    getAllProducts()
  }, [])

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
              {/* shop */}
              <div className="col-md-4 col-xs-6">
                <div className="shop">
                  <div className="shop-img">
                    <img src="./assets/img/shop01.png" alt="" />
                  </div>
                  <div className="shop-body">
                    <h3>
                      Laptop
                      <br />
                      Collection
                    </h3>
                    <Link to="#" className="cta-btn">
                      Shop now <i className="fa fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /shop */}
              {/* shop */}
              <div className="col-md-4 col-xs-6">
                <div className="shop">
                  <div className="shop-img">
                    <img src="./assets/img/shop03.png" alt="" />
                  </div>
                  <div className="shop-body">
                    <h3>
                      Accessories
                      <br />
                      Collection
                    </h3>
                    <Link to="#" className="cta-btn">
                      Shop now <i className="fa fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /shop */}
              {/* shop */}
              <div className="col-md-4 col-xs-6">
                <div className="shop">
                  <div className="shop-img">
                    <img src="./assets/img/shop02.png" alt="" />
                  </div>
                  <div className="shop-body">
                    <h3>
                      Cameras
                      <br />
                      Collection
                    </h3>
                    <Link to="#" className="cta-btn">
                      Shop now <i className="fa fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /shop */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /SECTION */}
        {/* SECTION */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* section title */}
              <div className="col-md-12">
                <div className="section-title">
                  <h3 className="title">New Products</h3>
                  <div className="section-nav">
                    <ul className="section-tab-nav tab-nav">
                      <li className="active">
                        <Link data-toggle="tab" href="#tab1">
                          Laptops
                        </Link>
                      </li>
                      <li>
                        <Link data-toggle="tab" href="#tab1">
                          Smartphones
                        </Link>
                      </li>
                      <li>
                        <Link data-toggle="tab" href="#tab1">
                          Cameras
                        </Link>
                      </li>
                      <li>
                        <Link data-toggle="tab" href="#tab1">
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /section title */}
              {/* Products tab & slick */}
              <div className="col-md-12">
                <div className="row">
                  <div className="products-tabs">
                    {/* tab */}
                    <div
                      id="tab1"
                      className="tab-pane active"
                      style={{ padding: "0 20px 50px 20px" }}
                    >
                      <Slider className="products-slick" {...settingsSlider}>
                        {products?.map((product) => (
                          <div className="product"
                            key={product.productId}>
                            <div className="product-img">
                              <img src={product.image1} alt="" />
                              <div className="product-label">
                                <span className="sale">-30%</span>
                                <span className="new">NEW</span>
                              </div>
                            </div>
                            <div className="product-body">
                              <p className="product-category">
                                {product.category}
                              </p>
                              <h3 className="product-name">
                                <Link to="#">{product.productName}</Link>
                              </h3>
                              <h4 className="product-price">
                                $980.00{" "}
                                <del className="product-old-price">
                                  {product.price} VND
                                </del>
                              </h4>
                              <div className="product-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                              <div className="product-btns">
                                <button className="add-to-wishlist">
                                  <i className="fa fa-heart-o" />
                                  <span className="tooltipp">
                                    add to wishlist
                                  </span>
                                </button>
                                <button className="add-to-compare">
                                  <i className="fa fa-exchange" />
                                  <span className="tooltipp">
                                    add to compare
                                  </span>
                                </button>
                                <button className="quick-view">
                                  <i className="fa fa-eye" />
                                  <span className="tooltipp">quick view</span>
                                </button>
                              </div>
                            </div>
                            <div className="add-to-cart">
                              <button className="add-to-cart-btn">
                                <i className="fa fa-shopping-cart" /> add to
                                cart
                              </button>
                            </div>
                          </div>
                        ))}
                        {/* product */}

                        {/* /product */}

                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product02.png" alt="" />
                            <div className="product-label">
                              <span className="new">NEW</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star-o" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product03.png" alt="" />
                            <div className="product-label">
                              <span className="sale">-30%</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating"></div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product04.png" alt="" />
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product05.png" alt="" />
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                      </Slider>
                      {/* <div id="slick-nav-1" className="products-slick-nav" /> */}
                    </div>
                    {/* /tab */}
                  </div>
                </div>
              </div>
              {/* Products tab & slick */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /SECTION */}
      </>

      <>
        {/* HOT DEAL SECTION */}
        <div id="hot-deal" className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-12">
                <div className="hot-deal">
                  <ul className="hot-deal-countdown">
                    <li>
                      <div>
                        <h3>02</h3>
                        <span>Days</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h3>10</h3>
                        <span>Hours</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h3>34</h3>
                        <span>Mins</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h3>60</h3>
                        <span>Secs</span>
                      </div>
                    </li>
                  </ul>
                  <h2 className="text-uppercase">hot deal this week</h2>
                  <p>New Collection Up to 50% OFF</p>
                  <Link className="primary-btn cta-btn" to="#">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /HOT DEAL SECTION */}
        {/* SECTION */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* section title */}
              <div className="col-md-12">
                <div className="section-title">
                  <h3 className="title">Top selling</h3>
                  <div className="section-nav">
                    <ul className="section-tab-nav tab-nav">
                      <li className="active">
                        <Link data-toggle="tab" to="#tab2">
                          Laptops
                        </Link>
                      </li>
                      <li>
                        <Link data-toggle="tab" to="#tab2">
                          Smartphones
                        </Link>
                      </li>
                      <li>
                        <Link data-toggle="tab" to="#tab2">
                          Cameras
                        </Link>
                      </li>
                      <li>
                        <Link data-toggle="tab" to="#tab2">
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /section title */}
              {/* Products tab & slick */}
              <div className="col-md-12">
                <div className="row">
                  <div className="products-tabs">
                    {/* tab */}
                    <div
                      id="tab2"
                      className="tab-pane fade in active"
                      style={{ padding: "0 20px 50px 20px" }}
                    >
                      <Slider
                        className="products-slick"
                        data-nav="#slick-nav-2"
                        {...settingsSlider}
                      >
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product06.png" alt="" />
                            <div className="product-label">
                              <span className="sale">-30%</span>
                              <span className="new">NEW</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product" style={{ padding: "0 20px" }}>
                          <div className="product-img">
                            <img src="./assets/img/product07.png" alt="" />
                            <div className="product-label">
                              <span className="new">NEW</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star-o" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product08.png" alt="" />
                            <div className="product-label">
                              <span className="sale">-30%</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating"></div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product09.png" alt="" />
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                        {/* product */}
                        <div className="product">
                          <div className="product-img">
                            <img src="./assets/img/product01.png" alt="" />
                          </div>
                          <div className="product-body">
                            <p className="product-category">Category</p>
                            <h3 className="product-name">
                              <Link to="#">product name goes here</Link>
                            </h3>
                            <h4 className="product-price">
                              $980.00{" "}
                              <del className="product-old-price">$990.00</del>
                            </h4>
                            <div className="product-rating">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="product-btns">
                              <button className="add-to-wishlist">
                                <i className="fa fa-heart-o" />
                                <span className="tooltipp">
                                  add to wishlist
                                </span>
                              </button>
                              <button className="add-to-compare">
                                <i className="fa fa-exchange" />
                                <span className="tooltipp">add to compare</span>
                              </button>
                              <button className="quick-view">
                                <i className="fa fa-eye" />
                                <span className="tooltipp">quick view</span>
                              </button>
                            </div>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        {/* /product */}
                      </Slider>
                      <div id="slick-nav-2" className="products-slick-nav" />
                    </div>
                    {/* /tab */}
                  </div>
                </div>
              </div>
              {/* /Products tab & slick */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /SECTION */}
        {/* SECTION */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-4 col-xs-6" style={{ padding: "0 20px" }}>
                <div className="section-title">
                  <h4 className="title">Top selling</h4>
                  <div className="section-nav">
                    <div id="slick-nav-3" className="products-slick-nav" />
                  </div>
                </div>
                <Slider
                  className="products-widget-slick"
                  data-nav="#slick-nav-3"
                  {...settingsWidget}
                >
                  <div>
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product07.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product08.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product09.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* product widget */}
                  </div>
                  <div>
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product01.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product02.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product03.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* product widget */}
                  </div>
                </Slider>
              </div>
              <div className="col-md-4 col-xs-6" style={{ padding: "0 20px" }}>
                <div className="section-title">
                  <h4 className="title">Top selling</h4>
                  <div className="section-nav">
                    <div id="slick-nav-4" className="products-slick-nav" />
                  </div>
                </div>
                <Slider
                  className="products-widget-slick"
                  data-nav="#slick-nav-4"
                  {...settingsWidget}
                >
                  <div>
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product04.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product05.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product06.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* product widget */}
                  </div>
                  <div>
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product07.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product08.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product09.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* product widget */}
                  </div>
                </Slider>
              </div>
              <div className="clearfix visible-sm visible-xs" />
              <div className="col-md-4 col-xs-6 " style={{ padding: "0 20px" }}>
                <div className="section-title">
                  <h4 className="title">Top selling</h4>
                  <div className="section-nav">
                    <div id="slick-nav-5" className="products-slick-nav" />
                  </div>
                </div>
                <Slider
                  className="products-widget-slick"
                  data-nav="#slick-nav-5"
                  {...settingsWidget}
                >
                  <div>
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product01.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product02.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product03.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* product widget */}
                  </div>
                  <div>
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product04.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product05.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* /product widget */}
                    {/* product widget */}
                    <div className="product-widget">
                      <div className="product-img">
                        <img src="./assets/img/product06.png" alt="" />
                      </div>
                      <div className="product-body">
                        <p className="product-category">Category</p>
                        <h3 className="product-name">
                          <Link to="#">product name goes here</Link>
                        </h3>
                        <h4 className="product-price">
                          $980.00{" "}
                          <del className="product-old-price">$990.00</del>
                        </h4>
                      </div>
                    </div>
                    {/* product widget */}
                  </div>
                </Slider>
              </div>
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

export default HomePage;
