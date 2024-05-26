import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { getCountCustomers } from "./service/CustomerService";
import {
  getAllOrders,
  getCountOrders,
  getRevenueOrders,
  getTopSelling,
} from "./service/OrderSerive";
const Admin = () => {
  const [countCustomers, setCountCustomers] = useState([]);
  const [countOrders, setCountOrders] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [orders, setOrders] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const CountCustomers = async () => {
      try {
        const response = await getCountCustomers(headers);

        setCountCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const CountOrders = async () => {
      try {
        const response = await getCountOrders(headers);

        setCountOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getRevenue = async () => {
      try {
        const response = await getRevenueOrders(headers);

        setRevenue(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getOrder = async () => {
      try {
        const response = await getAllOrders(headers);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getTopProductSelling = async () => {
      try {
        const response = await getTopSelling(headers);
        setTopSelling(response.data);
        console.log(topSelling)
      } catch (error) {
        console.log(error);
      }
    };


    getOrder();

    CountCustomers();
    CountOrders();
    getRevenue();
    getOrder();
    getTopProductSelling();
  }, []);

  const getColor = (stateType) => {
    switch (stateType) {
      case "CANCELLED":
        return "badge bg-danger";
      case "CONFIRMED":
        return "badge bg-warning";
      case "PENDING":
        return "badge bg-secondary";
      case "DELIVERED":
        return "badge bg-success";
      default:
        return { color: "black", fontSize: "1.2em" };
    }
  };

  return (
    <>
      <Header />
      <Sidebar />

      <>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="index.html">Home</Link>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>
          {/* End Page Title */}
          <section className="section dashboard">
            <div className="row">
              {/* Left side columns */}
              <div className="col-lg-16">
                <div className="row">
                  {/* Sales Card */}
                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">
                      <div className="filter">
                        <Link
                          className="icon"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Sales <span>| Today</span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart" />
                          </div>
                          <div className="ps-3">
                            <h6>{countOrders} orders</h6>
                            {/* <span className="text-success small pt-1 fw-bold">
                              12%
                            </span>{" "}
                            <span className="text-muted small pt-2 ps-1">
                              increase
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Sales Card */}
                  {/* Revenue Card */}
                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card revenue-card">
                      <div className="filter">
                        <Link
                          className="icon"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Revenue <span>| This Month</span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar" />
                          </div>
                          <div className="ps-3">
                            <h6>
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(revenue)}
                            </h6>
                            {/* <span className="text-success small pt-1 fw-bold">
                              8%
                            </span>{" "} */}
                            {/* <span className="text-muted small pt-2 ps-1">
                              increase
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Revenue Card */}
                  {/* Customers Card */}
                  <div className="col-xxl-4 col-xl-12">
                    <div className="card info-card customers-card">
                      <div className="filter">
                        <Link
                          className="icon"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Customers <span>| This Year</span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people" />
                          </div>
                          <div className="ps-3">
                            <h6>{countCustomers}</h6>
                            {/* <span className="text-danger small pt-1 fw-bold">
                              12%
                            </span>{" "}
                            <span className="text-muted small pt-2 ps-1">
                              decrease
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Customers Card */}
                  {/* Reports */}
                  <div className="col-12">
                    <div className="card">
                      <div className="filter">
                        <Link
                          className="icon"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Reports <span>/Today</span>
                        </h5>
                        {/* Line Chart */}
                        <div id="reportsChart" />
                        {/* End Line Chart */}
                      </div>
                    </div>
                  </div>
                  {/* End Reports */}
                  {/* Recent Sales */}
                  <div className="col-12">
                    <div className="card recent-sales overflow-auto">
                      <div className="filter">
                        <Link
                          className="icon"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Recent Sales <span>| Today</span>
                        </h5>
                        <table className="table table-borderless datatable">
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Customer</th>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders
                              .sort((a, b) => b.orderId - a.orderId)
                              .map((order, index) => (
                                <tr key={index}>
                                  <th scope="row">{order.orderId}</th>
                                  <td>
                                    {order.customer.firstName}{" "}
                                    {order.customer.lastName}
                                  </td>
                                  <td className="">
                                    {order.orderDetails.map(
                                      (orderDetail, detailIndex) => {
                                        const product = orderDetail.product;
                                        return (
                                          <>
                                            <tr key={detailIndex}>
                                              <td>
                                                <input
                                                  type="hidden"
                                                  name="productId"
                                                  value={product.productId}
                                                />
                                                {product.productName}{"           "}
                                                {orderDetail.quantity}x
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    )}
                                  </td>
                                  <td>
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(order.totalPrice)}
                                  </td>

                                  <td>
                                    <span className={getColor(order.stateType)}>
                                      {order.stateType}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* End Recent Sales */}
                  {/* Top Selling */}
                  <div className="col-12">
                    <div className="card top-selling overflow-auto">
                      <div className="filter">
                        <Link
                          className="icon"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Month
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="#">
                              This Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body pb-0">
                        <h5 className="card-title">
                          Top Selling <span>| Today</span>
                        </h5>
                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Preview</th>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">Sold</th>
                              <th scope="col">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                          {topSelling
                              ?.map((productTop, index) => (
                                <tr key={index}>
                                  <th scope="row">
                                  <img src={productTop.product.image1} alt="" />
                                  </th>
                                  <td className="text-primary fw-bold">
                                  {productTop.product.productName}
                                  </td>
                                  <td>
                                  {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(productTop.product.price)}
                                  </td>
                                  <td className="fw-bold">
                                  {productTop.totalQuantitySold}
                                  </td>
                                  <td>
                                  {Intl.NumberFormat("vi-VN", { 
                                    style: 'currency', 
                                    currency: 'VND' 
                                    }).format(productTop?.totalQuantitySold * productTop?.product.price * (1-((productTop?.product?.discount?.discountValue ?? 0) / 100)))}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* End Top Selling */}
                </div>
              </div>
              {/* End Left side columns */}
              {/* Right side columns */}
              {/* <div className="col-lg-4">
                <div className="card">
                  <div className="filter">
                    <Link className="icon" href="#" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Month
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Recent Activity <span>| Today</span>
                    </h5>
                    <div className="activity">
                      <div className="activity-item d-flex">
                        <div className="activite-label">32 min</div>
                        <i className="bi bi-circle-fill activity-badge text-success align-self-start" />
                        <div className="activity-content">
                          Quia quae rerum{" "}
                          <Link to="#" className="fw-bold text-dark">
                            explicabo officiis
                          </Link>{" "}
                          beatae
                        </div>
                      </div>
                      <div className="activity-item d-flex">
                        <div className="activite-label">56 min</div>
                        <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />
                        <div className="activity-content">
                          Voluptatem blanditiis blanditiis eveniet
                        </div>
                      </div>
                      <div className="activity-item d-flex">
                        <div className="activite-label">2 hrs</div>
                        <i className="bi bi-circle-fill activity-badge text-primary align-self-start" />
                        <div className="activity-content">
                          Voluptates corrupti molestias voluptatem
                        </div>
                      </div>
                      <div className="activity-item d-flex">
                        <div className="activite-label">1 day</div>
                        <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
                        <div className="activity-content">
                          Tempore autem saepe{" "}
                          <Link to="#" className="fw-bold text-dark">
                            occaecati voluptatem
                          </Link>{" "}
                          tempore
                        </div>
                      </div>
                      <div className="activity-item d-flex">
                        <div className="activite-label">2 days</div>
                        <i className="bi bi-circle-fill activity-badge text-warning align-self-start" />
                        <div className="activity-content">
                          Est sit eum reiciendis exercitationem
                        </div>
                      </div>
                      <div className="activity-item d-flex">
                        <div className="activite-label">4 weeks</div>
                        <i className="bi bi-circle-fill activity-badge text-muted align-self-start" />
                        <div className="activity-content">
                          Dicta dolorem harum nulla eius. Ut quidem quidem sit
                          quas
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="filter">
                    <Link className="icon" href="#" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Month
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body pb-0">
                    <h5 className="card-title">
                      Budget Report <span>| This Month</span>
                    </h5>
                    <div
                      id="budgetChart"
                      style={{ minHeight: 400 }}
                      className="echart"
                    />
                  </div>
                </div>
                <div className="card">
                  <div className="filter">
                    <Link className="icon" href="#" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Month
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body pb-0">
                    <h5 className="card-title">
                      Website Traffic <span>| Today</span>
                    </h5>
                    <div
                      id="trafficChart"
                      style={{ minHeight: 400 }}
                      className="echart"
                    />
                  </div>
                </div>
                <div className="card">
                  <div className="filter">
                    <Link className="icon" href="#" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Month
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          This Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body pb-0">
                    <h5 className="card-title">
                      News &amp; Updates <span>| Today</span>
                    </h5>
                    <div className="news">
                      <div className="post-item clearfix">
                        <img src="assets/img/news-1.jpg" alt="" />
                        <h4>
                          <Link to="#">Nihil blanditiis at in nihil autem</Link>
                        </h4>
                        <p>
                          Sit recusandae non aspernatur laboriosam. Quia enim
                          eligendi sed ut harum...
                        </p>
                      </div>
                      <div className="post-item clearfix">
                        <img src="assets/img/news-2.jpg" alt="" />
                        <h4>
                          <Link to="#">Quidem autem et impedit</Link>
                        </h4>
                        <p>
                          Illo nemo neque maiores vitae officiis cum eum turos
                          elan dries werona nande...
                        </p>
                      </div>
                      <div className="post-item clearfix">
                        <img src="assets/img/news-3.jpg" alt="" />
                        <h4>
                          <Link to="#">
                            Id quia et et ut maxime similique occaecati ut
                          </Link>
                        </h4>
                        <p>
                          Fugiat voluptas vero eaque accusantium eos.
                          Consequuntur sed ipsam et totam...
                        </p>
                      </div>
                      <div className="post-item clearfix">
                        <img src="assets/img/news-4.jpg" alt="" />
                        <h4>
                          <Link to="#">Laborum corporis quo dara net para</Link>
                        </h4>
                        <p>
                          Qui enim quia optio. Eligendi aut asperiores enim
                          repellendusvel rerum cuder...
                        </p>
                      </div>
                      <div className="post-item clearfix">
                        <img src="assets/img/news-5.jpg" alt="" />
                        <h4>
                          <Link to="#">
                            Et dolores corrupti quae illo quod dolor
                          </Link>
                        </h4>
                        <p>
                          Odit ut eveniet modi reiciendis. Atque cupiditate
                          libero beatae dignissimos eius...
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div> */}
              {/* End Right side columns */}
            </div>
          </section>
        </main>
        {/* End #main */}
      </>

      <Footer />
    </>
  );
};

export default Admin;
