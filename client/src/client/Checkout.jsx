import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { toast } from "react-toastify";
import { checkout } from "./service/Order";
import { useAuth } from "./context/AuthContext";
import { getCartById } from "./service/Cart";

function Checkout(props) {
  const { user, setUser, isLogged, setIsLogged } = useAuth()
  const [carts, setCarts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const token = localStorage.getItem("token");
  const header = {
    ContentType: 'application/json',
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
  const [form, setForm] = useState({
    customerId: user.customerId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    paymentId: "",
    lstCartDetailsId: ""
  });
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    if (termsAccepted) {
      
      const credential = {
        customerId: user.customerId,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        paymentId: form.paymentId,
        lstCartDetailsId: form.lstCartDetailsId
      }
      try {
        const response = await checkout(credential, header);
        if (response.status  === 200) {
          toast.success("Order successfully!");
        }
      }
      catch (error) {
        toast.error("Order Failed, Check your Order again!");
      }
      
    }
  };

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form.address);
  };

  useEffect(() => {
    const cartDetailsIds = carts.map(cart => cart.cartDetailsId);
    setForm((prevForm) => ({
      ...prevForm,
      lstCartDetailsId: cartDetailsIds
    }));
  }, [carts]);
  const handleCheckBoxChange = () => {
    setTermsAccepted(!termsAccepted)
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
              <div className="col-md-7">
                {/* Billing Details */}
                <div className="billing-details">
                  <div className="section-title">
                    <h3 className="title">Billing address </h3>
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="firstName"
                      placeholder={user ? user.firstName : ""}
                      value={form.firstName}
                      onChange={onChangeInput}
                    />

                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="lastName"
                      placeholder={user ? user.lastName : ""}
                      value={form.lastName}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder={user ? user.email : ""}
                      value={form.email}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="text"
                      name="address"
                      placeholder={user ? user.address : ""}
                      value={form.address}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="input"
                      type="tel"
                      name="phone"
                      placeholder={user ? user.phone : ""}
                      value={form.phone}
                      onChange={onChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <div className="input-checkbox">
                      <input type="checkbox" id="create-account" />
                      <label htmlFor="create-account">
                        <span />
                        Create Account?

                      </label>
                      <div className="caption">
                        <input
                          className="input"
                          type="password"
                          name="password"
                          placeholder="Enter Your Password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Billing Details */}
                {/* Shiping Details */}
                <div className="shiping-details">
                  <div className="section-title">
                    <h3 className="title">Shiping address</h3>
                  </div>
                  <div className="input-checkbox">
                    <input type="checkbox" id="shiping-address" />
                    <label htmlFor="shiping-address">
                      <span />
                      Ship to a diffrent address?
                    </label>


                  </div>
                </div>
                {/* /Shiping Details */}
                {/* Order notes */}
                <div className="order-notes">
                  <textarea
                    className="input"
                    placeholder="Order Notes"
                    defaultValue={""}
                  />
                </div>
                {/* /Order notes */}
              </div>
              {/* Order Details */}
              <div className="col-md-5 order-details">
                <div className="section-title text-center">
                  <h3 className="title">Your Order</h3>
                </div>

                <div className="order-summary">
                  <div className="order-col">
                    <div>
                      <strong>PRODUCT</strong>
                    </div>
                    <div>
                      <strong>TOTAL</strong>
                    </div>
                  </div>
                  {carts ? carts.map((cart, index) => {
                    return (
                      <div className="order-products">
                        <div className="order-col">
                          <div>{cart.quantity}x</div>
                          <div>{cart.product.productName}</div>
                          <div>{Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(cart.product.price)}</div>
                        </div>
                      </div>);

                  }) : null}

                  <div className="order-col">
                    <div>Shiping</div>
                    <div>
                      <strong>FREE</strong>
                    </div>
                  </div>
                  <div className="order-col">
                    <div>
                      <strong>TOTAL</strong>
                    </div>
                    <div>
                      <strong className="order-total">{Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(totalPrice)}</strong>
                    </div>
                  </div>
                </div>



                <div className="payment-method">
                  <div className="input-radio">
                    <input type="radio" name="paymentId" id="payment-1" value={1} onChange={onChangeInput} />
                    <label htmlFor="payment-1">
                      <span />
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <div className="input-radio">
                    <input type="radio" name="paymentId" id="payment-2" value={2} onChange={onChangeInput} />
                    <label htmlFor="payment-2">
                      <span />
                      PayPal
                    </label>
                  </div>
                </div>
                <div className="input-checkbox">
                  <input type="checkbox" id="terms" checked={termsAccepted} onChange={ handleCheckBoxChange} />
                  <label htmlFor="terms">
                    <span />
                    I've read and accept the{" "}
                    <Link to="#">terms &amp; conditions</Link>
                    {!termsAccepted && <p id="warning" style={{ color: 'red' }}>Bạn phải tích vào nút xác nhận các điều khoản</p>}
                  </label>
                </div>
                <Link to="/user/bills" className="primary-btn order-submit" state={{ totalPrice: totalPrice }} onClick={(e)=>{handleSubmit(e)}}>
                  {/* <Link to="/user/bills" className="primary-btn order-submit" > */}
                  Place order
                </Link>
              </div>
              {/* /Order Details */}
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

export default Checkout;
