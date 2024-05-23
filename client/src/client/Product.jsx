import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import Slider from "react-slick";
import { getProductById } from "./service/DetailProduct";
import { addNewComment, getListComment } from "./service/CommentService";
import { useAuth } from "./context/AuthContext";
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "./service/ProductService";

const Product = () => {
  const {user, isLogged} = useAuth()
  const navigate = useNavigate()
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const[discount,setDiscount] = useState(null);

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
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
        setDiscount(product.discount.discountValue/100)
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();

    const getComment = async () => {
      try {
        const response = await getListComment(id);
        setComments(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };

    getComment();
  }, [id, comments]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSubmitComment = (e) => {

    if (!user || !isLogged) {
      navigate("/auth/login")
      return;
    }

    e.preventDefault()
  
    const current = new Date()
    const currentDate = (current.getDate() + 1 < 10 ? "0" + (current.getDate() + 1): current.getDate() + 1)
    const currentMonth = (current.getMonth() < 10 ? "0" + current.getMonth() : current.getMonth())

    const commentDate = `${current.getFullYear()}-${currentMonth}-${currentDate}`

    const commentRequest = {
      "content": e.target.content.value,
      "commentDate": commentDate,
      "customer_id": user.customerId,
      "product_id": product.productId
    }

    const token = localStorage.getItem("token")

    const headers = { Authorization: `Bearer ${token}` };

    const addComment = async () => {

      try {
        const response = await addNewComment(commentRequest, headers)

        if(response.status === 200) {
          toast.success("Add new comment success!")
  
          const newComment = response.data
          comments.push(newComment)
  
          e.target.content.value = ""
        }
      } catch(error) {
        console.log(error)
      }
    }
    addComment()
  }


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
                      {product?.price * (1-discount)}{" VND"}
                      <del className="product-old-price">{product?.price}</del>
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
                        <input type="number" value={quantity} readOnly />
                        <span className="qty-up" onClick={handleIncrease}>
                          +
                        </span>
                        <span className="qty-down" onClick={handleDecrease}>
                          -
                        </span>
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
                    <li className="">
                      <a href="#tab1">Description</a>
                    </li>
                  </ul>
                  {/* /product tab nav */}
                  {/* product tab content */}
                  <div className="tab-content">
                    {/* tab1  */}
                    {/* <div id="tab1" className={`tab-pane fade ${activeTab === "tab1" ? "in active" : ""}`}> */}
                    <div id="tab1" className="">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <p>
                            Graphic card: {product?.configuration.graphicCard}
                          </p>
                          <p>Memory: {product?.configuration.memory}</p>
                          <p>Processor: {product?.configuration.processor}</p>
                          <p>Ram: {product?.configuration.ram} GB</p>
                          <p>Screen: {product?.configuration.screen} inches</p>
                        </div>
                        <div className="col-md-2"></div>
                      </div>
                    </div>
                    {/* /tab1  */}
                    {/* tab2  */}
                    {/* /tab2  */}
                    {/* tab3  */}
                    <ul className="tab-nav">
                      <li>
                        <a href="#tab2">Review</a>
                      </li>
                    </ul>

                    <div id="tab2" className="">
                      <div className="row">
                        <div className="col-md-2"></div>
                        {/* Review Form */}
                        <div className="col-md-8">
                          <div id="reviews">

                            <form
                              onSubmit={handleSubmitComment}
                            >
                              <ul className="reviews">
                                <li>
                                  <div class="review-heading">
                                    <i
                                      class="fa fa-user"
                                      style={{ fontSize: "30px" }}
                                    ></i>
                                    {user &&
                                      <h5 class="name">{`${user.firstName} ${user.lastName}`}</h5>
                                    }
                                  </div>
                                  <div class="review-body">
                                  <textarea class="input" name="content" placeholder="Your Review"></textarea>
                                  </div>
                                </li>
                                <li>
                                  <div class="d-flex flex-row-reverse">
                                    <button className="primary-btn" style={{fontSize: "11px"}} type="submit">Add comment</button>
                                  </div>
                                </li>
                              </ul>
                            </form>
                          </div>
                        </div>
                        <div className="col-md-2"></div>
                        </div>
                    </div>
                    {/* /Review Form */}

                    <div id="tab2" className="">
                      <div className="row">
                        <div className="col-md-2"></div>
                        {/* Reviews */}
                        <div className="col-md-8">
                          <div id="reviews">
                            <ul className="reviews">
                              {comments?.map((comment) => (
                                <li>
                                  <div
                                    className="review-heading"
                                    key={comment.commentId}
                                  >
                                    <h5 className="name">
                                      {comment.customer.firstName}{" "}
                                      {comment.customer.lastName}{" "}
                                    </h5>
                                    <p className="date">
                                      {comment.commentDate}
                                    </p>
                                    <div className="review-rating">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o empty" />
                                    </div>
                                  </div>
                                  <div className="review-body">
                                    <p>{comment.content}</p>
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
                        <div className="col-md-2"></div>
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
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      
      />
      <Footer />
    </>
  );
};
export default Product;
