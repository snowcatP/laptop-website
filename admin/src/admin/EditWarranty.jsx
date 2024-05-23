import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { editWarrantyById
    , getOrderByIdCustomer, getWarrantyById} from "./service/WarrantyService";
import { getListCustomers } from "./service/CustomerService";
const EditWarranty = () => {
  const { id } = useParams();
  const [warranty, setWarranty] = useState(null);

  const navigate = useNavigate()
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getWarrantyById(id);

        setWarranty(response.data);

        console.log(warranty)
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    productCode: "",
    dateStart: "",
    dateExpired: "",
    customer_id: "",
    product_id: "",
  });

  useEffect(() => {
    if (warranty) {
      setForm({
        productCode: warranty.productCode || "",
        dateStart: warranty.dateStart ? warranty.dateStart.split('T')[0] : "",
        dateExpired: warranty.dateExpired ? warranty.dateExpired.split('T')[0] : "",
        customer_id: warranty.customer_id || "",
        product_id: warranty.product_id || "",
      });
      setSelectedCustomer(`${warranty.customer.firstName} ${warranty.customer.lastName}`);
      setSelectedProduct(warranty.product.productName);
    }
  }, [warranty]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    const request = {
      productCode: form.productCode,
      dateStart: form.dateStart,
      dateExpired: form.dateExpired,
      customer_id: form.customer_id,
      product_id: form.product_id,
    };

    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
      const response = await editWarrantyById(id, request, headers);
      if (response.status === 200) {
        toast.success("Update success!")

        setTimeout(() => {
          navigate("/list-warranty")
        }, 2000)
      }
    } catch (error) {
      toast.error("Fail to update!")

      setTimeout(() => {
        navigate("/list-warranty")
      }, 2000)
    }
  };

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedOrder, setSelectedOrders] = useState([]);
  const [orders, setProductOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");



  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const response = await getListCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCustomers();
  }, []);

  const handleCustomerSelect = (customer) => {
    setForm({ ...form, customer_id: customer.customerId });
    setSelectedCustomer(customer.firstName + " " + customer.lastName);
  };

  const handleProductSelect = (product) => {
    setForm({ ...form, product_id: product.productId });
    setSelectedProduct(product.productName);
  };

  const token = localStorage.getItem("token");
  const header = {
    Authorization: "Bearer " + token,
  };

  const [showModal, setShowModal] = useState(false);


  const fetchOrdersByCustomer = async (customerId) => {
    try {
      const response = await getOrderByIdCustomer(customerId,header);
      setProductOrders(response.data);
      setShowModal(true)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const modalClose = () => {
    setShowModal(false)
  }

  const modalOpen = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npages = Math.ceil(customers.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(numbers[numbers.length - 1]);
  const changePage = (n) => setCurrentPage(n);
  

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Edit Warranty</h1>
          <Link className='btn btn-outline-primary mt-2' to={"/list-warranty"}>Back</Link>
        </div>
        <section className="section">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Edit warranty</h5>
                      {message && (
                        <h5>
                          <span style={{ color: 'green' }}>{message}</span>
                        </h5>
                      )}
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Product Code</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" name="productCode" value={form.productCode} onChange={onChangeInput} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Start Date</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" name="dateStart" value={form.dateStart} onChange={onChangeInput} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">End Date</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" name="dateExpired" value={form.dateExpired} onChange={onChangeInput} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Customer</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" value={selectedCustomer} readOnly />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Product ID</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" name="product_id" value={selectedProduct} readOnly/>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Edit</label>
                        <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">OK</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Customer List</h5>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer, index) => (
                            <tr key={index}>
                              <th scope="row">{customer.customerId}</th>
                              <td>{customer.firstName} {customer.lastName}</td>
                              <td>
                                <input
                                  type="radio"
                                  name="customerSelect"
                                  checked={form.customer_id === customer.customerId}
                                  onChange={() => handleCustomerSelect(customer)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <nav className="pagination justify-content-end">
                      <li className="page-item">
                        <Link
                          href="/#"
                          className="page-link"
                          onClick={firstPage}
                        >
                          &laquo;
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          href="/#"
                          className="page-link"
                          onClick={prevPage}
                        >
                          &lsaquo;
                        </Link>
                      </li>
                      {numbers.map((n, i) => (
                        <li
                          className={`page-item ${
                            n === currentPage ? "active" : ""
                          }`}
                          key={i}
                        >
                          <Link
                            href="/#"
                            className="page-link"
                            onClick={() => changePage(n)}
                          >
                            {n}
                          </Link>
                        </li>
                      ))}
                      <li className="page-item">
                        <Link
                          href="/#"
                          className="page-link"
                          onClick={nextPage}
                        >
                          &rsaquo;
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          href="/#"
                          className="page-link"
                          onClick={lastPage}
                        >
                          &raquo;
                        </Link>
                      </li>
                    </nav>
                    </div>
                  </div>
                  <div className="col-lg-2"></div>
                  {/* Additional card */}
                  {/* Add other fields as needed */}
                  <div className="row mb-3">
                          <label className="col-sm-5 col-form-label"></label>
                          <div className="col-sm-10">
                            <button
                              type="button"
                              className="btn btn-lg btn-primary"
                              onClick={() => fetchOrdersByCustomer(form.customer_id)}
                            >
                              Get List Order
                            </button>
                          </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </section>
      </main>

      <Modal show={showModal} onHide={modalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add product to warranty</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <table
              id="example"
              className="table table-striped"
              style={{ maxHeight: "500px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
              {orders.map((order) => (
                order.orderDetails.map((orderDetail) => (
                  <tr key={orderDetail.orderDetailsId}>
                    <td className="align-middle">{orderDetail.orderDetailsId}</td>
                    <td className="align-middle">{orderDetail.product.productName}</td>
                    <td>
                      <img
                        src={orderDetail.product.image1}
                        alt=""
                        style={{ height: "100px" }}
                      />
                    </td>
                    <td className="align-middle">
                      <input
                        type="radio"
                        name="productSelected"
                        checked={form.product_id === orderDetail.product.productId}
                        onChange={() => handleProductSelect(orderDetail.product)}
                        style={{ height: "20px", width: "20px" }}
                      />
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={modalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      
      <Footer />
    </>
  );
};

export default EditWarranty;
