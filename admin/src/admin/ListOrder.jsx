import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { changeOrderState, getAllOrders } from "./service/OrderSerive";
import { toast } from "react-toastify";
import moment from "moment";
const ListOrder = ({ allCustomerList, message }) => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await getAllOrders({Authorization: "Bearer " + token});
        setOrders(response.data);
        console.log(orders)
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getOrder();

  }, [orders, token]);

  const handleChangeOrderState = (e, orderId) => {
    e.preventDefault();
    const modifyOrderState = async () => {
      const header = {
        Authorization: "Bearer " + token,
      };
      try {
        await changeOrderState(orderId, header);
        toast.success("Update order state successfully");
      }
      catch (error) {
        toast.error("Cannot update order state");
      }
    };
    modifyOrderState();
  };
  const getColor = (stateType) => {
    switch (stateType) {
      case 'CANCELLED':
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
      <Sidebar />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Customer Management</h1>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">List Order</h5>

                  {/* {orders.length === 0 && (
                    <button
                      className="btn btn-primary col-2"
                      style={{ marginBottom: '2em' }}
                    //   onClick={fetchUsers}
                    >
                      Lấy dữ liệu
                    </button>
                  )} */}

                  {message && <p style={{ color: 'red' }}>{message}</p>}

                  <form action="get_users_data" method="get">
                    <table id="myTable" className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text-center font-weight-semibold align-middle p-4"><b>Order ID</b></th>
                          <th className="text-center font-weight-semibold align-middle p-4">Customer</th>
                          <th className="text-center font-weight-semibold align-middle p-4">Product</th>
                          <th className="text-center font-weight-semibold align-middle p-4">Total Price</th>
                          <th className="text-center font-weight-semibold align-middle p-4">Status</th>
                          <th className="text-center font-weight-semibold align-middle p-4">Delivered Date</th>
                          <th className="text-center font-weight-semibold align-middle p-4">Address</th>
                          <th className="text-center font-weight-semibold align-middle p-4"></th>
                          {/* <th></th>
                          <th></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.sort((a, b) => b.orderId - a.orderId).map((order, index) => (

                          <tr key={index}>
                            <td className="text-center font-weight-semibold align-middle p-4">{order.orderId}</td>
                            <td className="text-center font-weight-semibold align-middle p-4">{order.customer.firstName} {order.customer.lastName}</td>
                            <td className="">
                              {order.orderDetails.map((orderDetail, detailIndex) => {
                                const product = orderDetail.product;
                                // const price = orderDetail.price;
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
                                      <td className="text-center font-weight-semibold align-middle p-4">
                                        <div style={{ margin: "20px" }}>{orderDetail.quantity}x</div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}

                            </td>
                            <td className="text-center font-weight-semibold align-middle p-4">
                              {Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                            </td>

                            <td className="text-center font-weight-semibold align-middle p-4">
                              <span style={getColor(order.stateType)}>
                                {order.stateType}
                              </span>
                            </td>
                            <td className="text-center font-weight-semibold align-middle p-4">
                              {moment(order.deliveredDate).format('YYYY-MM-DD HH:mm:ss')}
                            </td>
                            <td className="text-center font-weight-semibold align-middle p-4">
                              {order.address}
                            </td>
                            <td className="text-center font-weight-semibold align-middle p-4">
                              <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={(e) => { handleChangeOrderState(e, order.orderId) }}
                              >
                                Update Order State
                              </button>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ListOrder;
