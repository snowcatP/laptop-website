import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { getAllEmployees } from "./service/EmployeeService";
import { Link } from "react-router-dom";
const ListEmployee = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const getEmployees = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        const response = await getAllEmployees(headers);
        if (response.status === 200) {
          setEmployees(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmployees()
  }, [employees]);
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Manage Employee</h1>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-18">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">List of employees</h5>

                  <div className="d-flex justify-content-between">
                    <Link className="btn btn-outline-primary" to="/add-employee">Add new</Link>
                    <input
                      type="text"
                      className="form-control w-25"
                      id="datatable-search-input"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  {/* Table with stripped rows */}
                  <table id="myTable" className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                        {employees
                        .filter((em) =>
                            search.toLocaleLowerCase() === ""
                              ? em
                              : (em.firstName + em.lastName)
                                  .toLocaleLowerCase()
                                  .includes(search)
                          )
                        .map((employee, n) => (
                            <>
                                <tr key={employee.staffId}>
                                    <td>{n}</td>
                                    <td>{`${employee.firstName} ${employee.lastName}`}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.salary} VND</td>
                                    <td>
                                        <button className="btn btn-outline-danger">Delete</button>
                                    </td>

                                </tr>
                            </>
                        ))}

                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </section>
      </main>
      {/* End #main */}

      <Footer />
    </>
  );
};

export default ListEmployee;
