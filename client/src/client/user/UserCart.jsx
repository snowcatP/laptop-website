import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from "../components/Letter";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";
import { checkValidToken, customerProfile } from "../service/ClientService";
import { deleteItemToCart, editItemInCart, getCartById } from "../service/Cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserCart = () => {
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded_token = jwtDecode(token);
    const current = new Date();

    if (decoded_token.exp * 1000 > current.getTime()) {
      const checkIsValid = async () => {
        const response = await checkValidToken({
          token: token,
        });

        if (response.data["valid"] === true) {
          const userProfile = async () => {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await customerProfile(headers);
            setCartId(response.data.customerId);
            setUser(response.data);
            setIsLogged(true);
          };
          userProfile();
        }
      };
      checkIsValid();
    }
  }, [user, isLogged]);

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const header = {
      Authorization: "Bearer " + token,
    };
    const getCart = async () => {
      try {
        const response = await getCartById(cartId, header);
        setCarts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, [cartId,carts]);

  function handleDeleteSubmit(e,cartDetailsId) {
    e.preventDefault();
    const deleteToCart = async () => {
      const token = localStorage.getItem("token");
      const header = {
        Authorization: "Bearer " + token,
      };
      try {
        const deleteResponse = await deleteItemToCart(cartDetailsId, header);
        toast.success(deleteResponse.data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    deleteToCart();
  }
  
  const handleQuantityChange = (e,cartDetailsId, change) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const header = {
      Authorization: "Bearer " + token,
    };
    const cartIndex = carts.findIndex((cart) => cart.cartDetailsId === cartDetailsId);
    if (cartIndex !== -1) {
      const updatedCarts = [...carts];
      const newQuantity = updatedCarts[cartIndex].quantity + change;
      if (newQuantity > 0 && newQuantity <= 10) {
        updatedCarts[cartIndex].quantity = newQuantity;
        setCarts(updatedCarts);
        handleEditSubmit(e,cartDetailsId, newQuantity, header);
      }else if(newQuantity <= 0){
        handleDeleteSubmit(e,cartDetailsId, header);
      }else{
        toast.error("You can only buy maximum 10 products at a time!");
      }
    }
  };
  const handleEditSubmit = (e,cartDetailsId, new_quantity, header) =>{
    e.preventDefault();
    const editItem = async () => {
      try {
        await editItemInCart(cartDetailsId, new_quantity, header);

      } catch (error) {
        console.log(error);
      }
    };
    editItem();
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
    <>
      <Header />
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              <Sidebar />

              <div className="col-md-9" style={{ minHeight: "65vh", backgroundColor: "white" }}>
                <div className="" style={{ margin: "2em" }}>
                  <h3>Cart</h3>
                  <hr />
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
                  <div id="cart" className="" style={{ minHeight: "75vh", backgroundColor: "white" }}>
                    <div className="" style={{ marginTop: "2em", marginBottom: "2em" }}>
                        <div className="col-md-10">
                          <div className="card">
                            <div className="card-header">
                              {carts == null && <h3 style={{ color: "green" }}>There are no products in your cart!</h3>}
                            </div>
                            {carts != null && (
                              <div className="card-body" style={{ color: "black" }}>
                                <div className="scrollable-table" style={{ maxWidth: "1300px", overflowY: "auto" }}>
                                  <table className="table table-bordered m-0 text-center" style={{ margin: "0 auto" }}>
                                    <thead>
                                      <tr>
                                        <th className="text-center py-3 px-4" style={{ minWidth: "300px" }}>
                                          Product
                                        </th>
                                        <th className="text-center py-3 px-4" style={{ minWidth: "120px" }}>
                                          Price
                                        </th>
                                        <th className="text-center py-3 px-4" style={{ width: "1000px" }}>
                                          Quantity
                                        </th>
                                        <th className="text-center py-3 px-4" style={{ width: "200px" }}>
                                          Total Price
                                        </th> 
                                        <th className="text-center align-middle py-3 px-0" style={{ minWidth: "40px" }}>
                                          <a href="/#" className="shop-tooltip float-none " title="" data-original-title="Clear cart">
                                            <i className="ino ion-md-trash"></i>
                                          </a>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {carts.map((cart, index) => {
                                        const product = cart.product;
                                        const Price = cart.price;
                                        return (
                                          <tr key={index}>
                                            <td className="p-4">
                                              <input type="hidden" name="productId" value={product.productId} />
                                              <div className="media align-items-center">
                                                <div className="row">
                                                  <div className="col-md-4">
                                                    <img src={`${product.image1}`} className="d-block ui-w-40 ui-bordered mr-4" alt="" style={{ height: "100px" }} />
                                                  </div>
                                                  <div className="media-body">
                                                    <a href={`/product/${product?.productId}`} className="d-block text-dark">
                                                      {product.productName}
                                                    </a>
                                                    <br />
                                                    <small>
                                                      <span className="">Category: {product.category}</span>
                                                      <br />
                                                      <span className="">Brand: {product.brand}</span>
                                                      <br />
                                                    </small>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="text-center font-weight-semibold align-middle p-4">
                                              {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(product.price * (1-((product.discount?.discountValue ?? 0) / 100)))} 
                                            </td>
                                            <td className="align-midle p-4 align-middle">
                                              {/* Update */}
                                              <div className="quantity-input">
                                                <span style={{ cursor: "pointer" }} onClick={(e) => handleQuantityChange(e,cart.cartDetailsId, -1)}>
                                                  -
                                                </span>
                                                {/* <span style={{ cursor: "pointer" }} onClick={()=>decreaseQuantity(cart.quantity)}>-</span> */}
                                                <input type="text" style={{ width: "50px", margin: "0 5px", textAlign: "center" }} value={cart.quantity} />
                                                <span style={{ cursor: "pointer" }} onClick={(e) => handleQuantityChange(e,cart.cartDetailsId, 1)}>
                                                  +
                                                </span>
                                                <br />
                                                {/* <button
                                                  style={{ marginTop: "5px" }}
                                                  onClick={() => {
                                                    handleEditSubmit(cart.cartDetailsId, cart.quantity, header);
                                                  }}
                                                >
                                                  Update
                                                </button> */}
                                              </div>
                                            </td>
                                            <td className="text-center font-weight-semibold align-middle p-4">
                                              {" "}
                                              {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(Price)} {" "}
                                            </td>
                                            <td className="text-center align-middle px-0 align-middle">
                                              {/* Delete */}
                                              <button className="shop-tooltip float-none text-center" type="button" onClick={() => handleDeleteSubmit(cart.cartDetailsId)}>
                                                Delete
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
                                  <div className="d-flex">
                                    <div className="text-right mt-4">
                                      <label className="text-muted font-weight-bold m-0">Total Price</label>
                                      <div className="text-large">
                                        <strong>{Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(totalPrice)} </strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="float-right" style={{ paddingTop: "1em" }}>
                                  <div className="col-md-4"></div>
                                  <div className="col-md-8 d-flex justify-content-end">
                                    <a href="/" className="btn btn-lg btn-danger md-btn-flat" style={{ marginRight: "2em" }}>
                                      Back
                                    </a>
                                    <Link to="/checkout" state={{ carts: carts, totalPrice: totalPrice,user: user }} className="btn btn-lg btn-danger">
                                        Check out
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Letter />
      <Footer />
    </>
  );
};

export default UserCart;