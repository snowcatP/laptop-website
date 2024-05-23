import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { getListCustomers } from "./service/CustomerService";
import { Link } from "react-router-dom";
const ListCustomer = ({ allCustomerList, message }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllCustomers = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {

        const response = await getListCustomers(headers);

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCustomers();
  }, [users]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npages = Math.ceil(users.length / recordsPerPage);
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
          <h1>Customer Management</h1>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-18">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">List Customer</h5>
                  <div className="d-flex flex-row-reverse mb-2">
                    <button className="btn btn-primary">
                      <i class="bi bi-search"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control w-25"
                      id="datatable-search-input"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                    <table id="myTable" className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col"><b>Name</b></th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Address</th>
                          {/* <th></th>
                          <th></th> */}
                        </tr>
                      </thead>
                      <tbody>

=======
                        {users
                        .filter((user) =>
                          search.toLocaleLowerCase() === ""
                            ? user
                            : (user.firstName + " " + user.lastName)
                                .toLocaleLowerCase()
                                .includes(search)
                        ).map((user,index) => (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{user?.firstName} {user?.lastName}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phone}</td>
                            <td>{user?.address}</td>
                            {/* <td>
                              <a
                                className="btn btn-outline-dark btn-sm"
                                href={`modify_user?action=modify&email=${user.email}`}
                              >
                                Sửa
                              </a>
                            </td>
                            <td>
                              <a
                                className="btn btn-outline-dark btn-sm"
                                href={`modify_user?action=delete&email=${user.email}`}
                              >
                                Xoá
                              </a>
                            </td> */}

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
            </div>
            <div className="col-lg-1"></div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ListCustomer;
