import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { deleteDiscountById, getAllDiscounts } from "./service/DiscountService";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ListDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = discounts.slice(firstIndex, lastIndex);
  const npages = Math.ceil(discounts.length / recordsPerPage);
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

  const handleDeleteDiscount = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const deleteDis = async () => {
      try {
        const response = await deleteDiscountById(id, headers);
        if (response.status === 200) {
          toast.success("Delete discount success!");
        }
      } catch (error) {
        toast.error("Fail to delete!");
      }
    };
    deleteDis();
  };

  const showDiscountModal = (discount) => {
    setShowModal(true)
    setSelectedDiscount(discount)
  }

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const getDiscounts = async () => {
      try {
        const response = await getAllDiscounts({ headers });

        setDiscounts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDiscounts();
  }, [discounts]);

  return (
    <>
      <Header />
      <Sidebar />

      <>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Manage Discount</h1>
          </div>
          {/* End Page Title */}
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Discount list</h5>
                    <Link
                      className="btn btn-outline-primary"
                      to="/add-discount"
                    >
                      Add new discount
                    </Link>
                    <hr />
                    {/* Table with stripped rows */}
                    <table id="dataTable" className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Discount value</th>
                          <th scope="col">Date start</th>
                          <th scope="col">Date end</th>
                          <th scope="col">Status</th>
                          <th scope="col">Details</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records &&
                          records.map((discount, n) => (
                            <tr key={discount.discountId}>
                              <td>{n}</td>
                              <td>{discount.discountValue}%</td>
                              <td>{discount.startDate}</td>
                              <td>{discount.endDate}</td>
                              <td>Available</td>
                              <td>
                                <Link
                                  to="#"
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => showDiscountModal(discount)}
                                >
                                  Details
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/edit-discount/${discount.discountId}`}
                                  className="btn btn-outline-info btn-sm"
                                >
                                  Edit
                                </Link>
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleDeleteDiscount(discount.discountId)
                                  }
                                  className="btn btn-outline-danger btn-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {/* End Table with stripped rows */}
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
              </div>
            </div>
          </section>
        </main>
        {/* End #main */}
      </>
      <Footer />
      {selectedDiscount && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Discount details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Discount value</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="productName"
                  value={selectedDiscount.discountValue}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Date start</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="price"
                  value={selectedDiscount.startDate}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Date end</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="quantity"
                  value={selectedDiscount.endDate}
                />
              </div>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ListDiscount;
