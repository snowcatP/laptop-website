import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { getProductById } from "./service/DetailProduct";
import { getListComment } from "./service/CommentService";
import { useAuth } from "./context/AuthContext";
import { addToCart } from "./service/ProductService";
import { toast } from "react-toastify";

const Product = () => {
  const {user} = useAuth()
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const navigate = useNavigate()

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

  const { id } = useParams(); // Lấy id từ địa chỉ URL
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
  
    const getProduct = async () => {
      try {
        const response = await getProductById(id)

        setProduct(response.data)
      } catch(error) {console.log(error)}
        
    }

    getProduct()

    const getComment = async () => {
      try {
        const response = await getListComment(id)

        setComments(response.data)
      } catch(error) {console.log(error)}
        
    }

    getComment()
  }, [id, comments, product])


    const [activeTab, setActiveTab] = useState("tab1");
  
    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
      if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      }
    };

    const handleAddToCart = (e) => {
      e.preventDefault();

      const cartId = user.customerId;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }

      const addProductToCart = async () => {
        try {
          const response = await addToCart(cartId, id, quantity, headers)

          if (response.status === 200) {
            toast.success("Add to cart successfully")

            setTimeout(() => {  
              navigate("/user/cart")
            }, 2000)
          }
        } catch(error) {
          toast.error("Add to cart failed")
        }
      }
      addProductToCart()
    }

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
                    <img src={product?.image1} alt="" />
                  </div>
                  <div className="product-preview">
                  <img src={product?.image2} alt="" />
                  </div>
                  <div className="product-preview">
                  <img src={product?.image3} alt="" />
                  </div>
                  <div className="product-preview">
                  <img src={product?.image4} alt="" />
                  </div>
                </Slider>
              </div>
              {/* /Product main img */}
              {/* Product thumb imgs */}
              <div className="col-md-2  col-md-pull-5">
                <Slider id="product-imgs" {...settings}>
                <div className="product-preview">
                    <img src={product?.image1} alt="" />
                  </div>
                  <div className="product-preview">
                  <img src={product?.image2} alt="" />
                  </div>
                  <div className="product-preview">
                  <img src={product?.image3} alt="" />
                  </div>
                  <div className="product-preview">
                  <img src={product?.image4} alt="" />
                  </div>
                </Slider>
              </div>
              {/* /Product thumb imgs */}
              {/* Product details */}
              <div className="col-md-5">
                <div className="product-details">
                  <h2 className="product-name">{product?.productName}</h2>
                  
                  <div>
                    <h3 className="product-price">
                    {product?.price} <del className="product-old-price">132</del>
                    </h3>
                    <span className="product-available">In Stock</span>
                  </div>
                  {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p> */}
                  
                  <div className="add-to-cart">
                    <div className="qty-label">
                      Quantiy
                      <div className="input-number">
                        <input type="number" value={quantity} readOnly/>
                        <span className="qty-up" onClick={handleIncrease}>+</span>
                        <span className="qty-down" onClick={handleDecrease}>-</span>
                      </div>
                    </div>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                      <i className="fa fa-shopping-cart" /> add to cart
                    </button>
                  </div>
                  
                  <ul className="product-links">
                    <li>Category:</li>
                    <li>
                      <Link to="#">{product?.category}</Link>
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
                  <li className={activeTab === "tab1" ? "active" : ""}>
                    <a href="#tab1" onClick={() => handleTabClick("tab1")}>
                        Description
                    </a>
                    </li>
                    <li>
                    <a href="#tab2" onClick={() => handleTabClick("tab2")}>
                        Review
                    </a>
                    </li>
                  </ul>
                  {/* /product tab nav */}
                  {/* product tab content */}
                  <div className="tab-content">
                    {/* tab1  */}
                    <div id="tab1" className={`tab-pane fade ${activeTab === "tab1" ? "in active" : ""}`}>
                      <div className="row">
                      <div className="col-md-12">
                          <p>Graphic card: {product?.configuration.graphicCard}</p>
                          <p>Memory: {product?.configuration.memory}</p>
                          <p>Processor: {product?.configuration.processor}</p>
                          <p>Ram: {product?.configuration.ram} GB</p>
                          <p>Screen: {product?.configuration.screen} inches</p>
                        </div>
                      </div>
                    </div>
                    {/* /tab1  */}
                    {/* tab2  */}
                    {/* /tab2  */}
                    {/* tab3  */}
                    <div id="tab2" className={`tab-pane fade ${activeTab === "tab2" ? "in active" : ""}`}>
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
                            {comments?.map((comment) => (
                              <li>
                              <div className="review-heading" key={comment.commentId}>
                                <h5 className="name">{comment.customer.firstName} {comment.customer.lastName} </h5>
                                <p className="date">{comment.commentDate}</p>
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
                                  {comment.content}
                                </p>
                              </div>
                            </li>
                            ))}

                              
                              
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
