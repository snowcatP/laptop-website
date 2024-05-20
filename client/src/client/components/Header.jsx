import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { checkValidToken, customerLogout, customerProfile } from "../service/ClientService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartById } from "../service/Cart";
import { jwtDecode } from "jwt-decode";
const Header = () => {
  const {user, setUser,isLogged,setIsLogged } = useAuth();
  // const [user,setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  // const [isLogged, setIsLogged] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const decoded_token = jwtDecode(token);
  //   const current = new Date();

  //   if (decoded_token.exp * 1000 > current.getTime()) {
  //     const checkIsValid = async () => {
  //       const response = await checkValidToken({
  //         token: token,
  //       });

  //       if (response.data["valid"] === true) {
  //         const userProfile = async () => {
  //           const headers = { Authorization: `Bearer ${token}` };
  //           const response = await customerProfile(headers);
  //           setCartId(response.data.customerId);
  //           setUser(response.data);
  //           setIsLogged(true);
  //         };
  //         userProfile();
  //       }
  //     };
  //     checkIsValid();
  //   }
  // }, [user, isLogged]);

  const token = localStorage.getItem("token");
  const header = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        setCartId(user.customerId);
        const response = await getCartById(cartId, header);
        setCarts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, [cartId, carts]);

  useEffect(() => {
    console.log(carts)
  }, []);

  const handleLogout = () => {
    const getToken = localStorage.getItem("token")

    const token = { "token": getToken }

    const logout = async () => {
      const response = await customerLogout(token)

      if (response.status === 200) {
        setUser(null)
        setIsLogged(false)

        Navigate("/")
        toast.success("Logout success!")
      }
    }

    logout()
  }

  const handleTotalPrice = () => {
    let totalPrice = 0;
    carts.forEach((cart) => {
      totalPrice += parseFloat(cart.price);
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    handleTotalPrice();
  }, [carts]);

  return (
    <div>
      {/* HEADER */}

      <header>

        {/* TOP HEADER */}

        {isLogged ?
          <div id="top-header">
            <div className="container">
              <ul className="header-links pull-left">
                <li>
                  <Link to="#">
                    <i className="fa fa-phone" /> {user.phone}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-envelope-o" /> {user.email}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-map-marker" /> {user.address}
                  </Link>
                </li>
              </ul>
              <ul className="header-links pull-right">
                <li>
                  <Link to="/user/profile">
                    <i className="fa fa-user-o" /> My Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          : <></>
        }
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

                  {isLogged ?
                    <>
                      <div className="dropdown">
                        <Link
                          to='#'
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i className="fa fa-shopping-cart" />
                          <span>Your Cart</span>
                          <div className="qty">{carts.length}</div>
                        </Link>
                        {carts.map((cart, index) => {
                          return (
                            <div className="cart-dropdown">
                              <div className="cart-list">
                                <div className="product-widget">
                                  <tr key={index}>
                                  <div className="product-img">
                                    <img src={cart.product.image1} alt="" />
                                  </div>
                                  <div className="product-body">
                                    <h3 className="product-name">
                                      <Link to="#">{cart.product.name}</Link>
                                    </h3>
                                    <h4 className="product-price">
                                      <span className="qty">{cart.quantity}x</span>
                                      {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(cart.product.price)}
                                    </h4>
                                  </div>
                                  <button className="delete">
                                    <i className="fa fa-close" />
                                  </button>
                                  <div className="cart-summary">
                                    <small>{carts.length} Item(s) selected</small>
                                    <h5>SUBTOTAL: {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(totalPrice)}</h5>
                                  </div>
                                  <div className="cart-btns">
                                  <Link to="/user/cart">View Cart</Link>
                                  
                                  <Link to="/checkout" state={{ carts: carts, totalPrice: totalPrice ,user: user }}>
                                    Checkout <i className="fa fa-arrow-circle-right" />
                                  </Link>
                                </div>
                                </tr>
                                </div>
                              </div>
                            </div>
                            
                          )
                        })}
                        {/* <div className="cart-dropdown">
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
                          </div> */}

                        
                      </div>


                      <div className="dropdown" >
                        <Link
                          to='#'
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                          id="dropdownMenuButton1"
                        >
                          <i className="fa fa-user" />
                          <span>Account</span>

                        </Link>
                        <div className="dropdown">
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link className="dropdown-item" to="/user/profile">My profile</Link></li>
                            <li><Link className="dropdown-item" to="/user/cart">Cart</Link></li>
                            <li><Link className="dropdown-item" onClick={handleLogout} >Logout</Link></li>

                          </ul>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div>
                        <Link to="/auth/register">
                          <i className="fa fa-user" />
                          <span>Register</span>
                        </Link>
                      </div>
                      <div>
                        <Link to="/auth/login">
                          <i className="fa fa-user" />
                          <span>Login</span>
                        </Link>
                      </div>
                    </>
                  }
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
    </div>
  );
};

export default Header;