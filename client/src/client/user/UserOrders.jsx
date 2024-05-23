import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from '../components/Letter';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { getOrders } from '../service/Order';
import { checkValidToken, customerProfile } from '../service/ClientService';
import { jwtDecode } from 'jwt-decode';


const UserOrders = () => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);

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
            setOrderId(response.data.customerId);
            setUser(response.data);
            setIsLogged(true);
          };
          userProfile();
        }
      };
      checkIsValid();
    }
  }, [user, isLogged]);

  const token = localStorage.getItem("token");
  const header = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await getOrders(orderId, header);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, [orderId, orders]);

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
                  <h3>Order</h3>
                  <hr />
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
                  <div id="cart" className="" style={{ minHeight: "75vh", backgroundColor: "white" }}>
                    <div className="" style={{ marginTop: "2em", marginBottom: "2em" }}>
                      <div className="col-md-10">
                        <div className="card">
                          <div className="card-header">
                            {orders == null && <h3 style={{ color: "green" }}>You have no Order!</h3>}
                          </div>
                          {orders != null && (
                            <div className="scrollable-table" style={{ color: "black" }}>
                              <div className="scrollable-table" style={{ maxWidth: "1300px", overflowY: "auto" }}>
                                <table className={"table table-bordered m-0 text-center"} style={{ margin: "0 auto", minWidth: "1000px" }}>
                                  <thead>
                                    <tr>
                                      <th className="text-center py-3 px-4" style={{ width: "50px" }}>
                                        Order ID
                                      </th>
                                      <th className="text-center py-3 px-4" style={{ width: "200px" }}>
                                        Product
                                      </th>
                                      <th className="text-center py-3 px-4" style={{ width: "120px" }}>
                                        Total Price
                                      </th>
                                      <th className="text-center py-3 px-4" style={{ width: "80px" }}>
                                        Status
                                      </th>
                                      <th className="text-center py-3 px-4" style={{ width: "20px" }}>
                                        Cancel
                                      </th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orders.sort((a, b) => b.orderId - a.orderId).map((order, index) => {
                                      return (
                                        <tr key={index}>
                                          <td className="text-center font-weight-semibold align-middle p-4" >
                                            {order.orderId}
                                          </td>

                                          {order.orderDetails.map((orderDetail, detailIndex) => {
                                            const product = orderDetail.product;
                                            const price = orderDetail.price;
                                            return (
                                              <>
                                                <tr key={detailIndex}>
                                                  <td className="p-4">
                                                    <input type="hidden" name="productId" value={product.productId} />
                                                    <div className="media align-items-center">
                                                      <div className="row">
                                                        <div className="col-md-4">
                                                          <img src={`${product.image1}`} className="d-block ui-w-40 ui-bordered mr-4" alt="" style={{ height: "100px" }} />
                                                        </div>
                                                        <div className="media-body">
                                                          <a href={`view_detail?pid=${product.productId}`} className="d-block text-dark">
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

                                                  <td>
                                                    <div style={{ margin: "20px" }}>{orderDetail.quantity}x</div>
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          })}
                                          <td className="text-center font-weight-semibold align-middle p-4">
                                            {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                                          </td>
                                          <td className="text-center font-weight-semibold align-middle p-4">
                                            {order.stateType}
                                          </td>

                                          <td className="text-center align-middle px-0 align-middle">
                                            {/* Delete */}
                                            <button className="shop-tooltip float-none text-center" type="button">
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}



                                  </tbody>
                                </table>
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
  )
}

export default UserOrders