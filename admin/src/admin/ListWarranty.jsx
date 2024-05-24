import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { deleteWarrantyById, getListWarrantys } from "./service/WarrantyService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListWarranty = () => {
  const [warrantys, setWarrantys] = useState([]);
  const [message, setMessage] = useState(""); 

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npages = Math.ceil(warrantys.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getListWarrantys({Authorization: "Bearer " + localStorage.getItem("token")});

        setWarrantys(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [warrantys]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Thêm số 0 vào trước tháng và ngày nếu cần thiết
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

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


  

  const handleDelete = async (id) => {
    try {
      const response = await deleteWarrantyById(id,{Authorization: "Bearer " + localStorage.getItem("token")});
      if (response.status === 200) {
        setWarrantys(warrantys.filter((warranty) => warranty.warrantyId !== id));
        setMessage("Deleted Successfully !")
      }
    } catch (error) {
      console.log("Error deleting warranty:", error);
      setMessage("Delete Failed !")
    }
  };


  return (
    <>
      <Header />
      <Sidebar />

      <>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Manage Warranty</h1>
          </div>
          {/* End Page Title */}
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Warranty list</h5>
                    {message && (
                      <h5>
                        <span style={{ color: "green" }}>{message}</span>
                      </h5>
                    )}

                    {/* Table with stripped rows */}
                    <table id="dataTable" className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Laptop</th>
                          <th scope="col">Code</th>
                          <th scope="col">Start date</th>
                          <th scope="col">End date</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {warrantys?.map((warranty, index) => (
                          <tr key={index}>
                            <th>{index}</th>
                            <td>{warranty.customer.firstName}</td>
                            <td>{warranty.product.productName}</td>
                            <td>{warranty.productCode}</td>
                            <td>{formatDate(warranty.dateStart)}</td>
                            <td>{formatDate(warranty.dateExpired)}</td>
                            <td>
                              <Link
                                  to={`/edit-warranty/${warranty.warrantyId}`}
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Edit
                                </Link>
                            </td>
                            <td>
                              {/* <Link
                                  to={`/warranty/delete/${warranty.productId}`}
                                  className="btn btn-outline-danger btn-sm"
                              >
                                  Delete
                              </Link> */}

                              <button
                                onClick={() => handleDelete(warranty.warrantyId)}
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
                <div className="col-lg-1"></div>
              </div>
            </div>
          </section>
        </main>
        {/* End #main */}
      </>

      <Footer />
    </>
  );
};

export default ListWarranty;
