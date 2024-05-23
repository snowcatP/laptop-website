import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { getListCustomers } from "./service/CustomerService";
const ListCustomer = ({ allCustomerList, message }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const response = await getListCustomers();

        setUsers(response.data);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCustomers();
  }, [users]);


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
                  <h5 className="card-title">List Customer</h5>
                  <form action="get_users_data" method="get">
                    <table id="myTable" className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          {/* <th></th>
                          <th></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.email}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
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

export default ListCustomer;
