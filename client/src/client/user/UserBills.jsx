import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from '../components/Letter';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getBillsOfCustomer } from '../service/Order';

const UserBills = () => {
  const { user, setUser, isLogged, setIsLogged } = useAuth();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const header = {
    Authorization: "Bearer " + token,
  };
  useEffect(() => {
    const getBills = async () => {
      try {
        const response = await getBillsOfCustomer(user.customerId, header);
        setOrders(response.data);
        console.log(orders)
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getBills();
  }, [orders]);
  const getColor = (stateType) => {
    switch (stateType) {
      case 'PENDING':
        return { color: 'red', fontSize: '1.2em' };
      case 'CONFIRMED':
        return { color: 'blue', fontSize: '1.2em' };
      case 'SHIPPED':
        return { color: 'orange', fontSize: '1.2em' };
      case 'DELIVERED':
        return { color: 'green', fontSize: '1.2em' };
      default:
        return { color: 'black', fontSize: '1.2em' };
    }
  };
  return (
    <>
      <Header />
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              <Sidebar />

              <div
                className="col-md-9"
                style={{ minHeight: "65vh", backgroundColor: "white" }}
              >
                <div className="" style={{ margin: "2em" }}>
                  <h3>Bills</h3>
                  <hr />
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
                  <div id="cart" className="" style={{ minHeight: "75vh", backgroundColor: "white" }}>
                    <div className="" style={{ marginTop: "2em", marginBottom: "2em" }}>
                      <div className="col-md-10">
                        <div className="card">
                          <div className="card-header">
                            {orders == null && <h3 style={{ color: "green" }}>There are no products in your cart!</h3>}
                          </div>
                          {orders != null && (
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
                                      <th className="text-center py-3 px-4" style={{ width: "200px" }}>
                                        Status
                                      </th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orders ? orders.sort((a, b) => b.orderId - a.orderId)?.map((order, index) => {
                                      return (
                                        <tr key={index}>
                                          <td className="text-center font-weight-semibold align-middle p-4" >
                                            {order.orderId}
                                          </td>

                                          {orders.orderDetails.map((orderDetail, detailIndex) => {
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
                                          }) }
                                          <td className="text-center font-weight-semibold align-middle p-4">
                                            {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                                          </td>
                                          <td className="text-center font-weight-semibold align-middle p-4">
                                            <span style={getColor(order.stateType)}>
                                              {order.stateType}
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    }):null}

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

export default UserBills