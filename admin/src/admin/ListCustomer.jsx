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

                  {users.length === 0 && (
                    <button
                      className="btn btn-primary col-2"
                      style={{ marginBottom: '2em' }}
                    //   onClick={fetchUsers}
                    >
                      Lấy dữ liệu
                    </button>
                  )}

                  {message && <p style={{ color: 'red' }}>{message}</p>}

                  <form action="get_users_data" method="get">
                    <table id="myTable" className="table table-striped">
                      <thead>
                        <tr>
                          <th><b>Họ và tên</b></th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
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
