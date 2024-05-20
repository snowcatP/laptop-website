import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { getListWarrantys } from "./service/WarrantyService";
import { useState, useEffect } from "react";

const ListWarranty = ({ allwarrantyList, message }) => {

  const [warrantys, setWarrantys] = useState([])

  useEffect(() => {
  
    const getAllProducts = async () => {
      try {
        const response = await getListWarrantys()

        setWarrantys(response.data)
        console.log(warrantys)
      } catch(error) {console.log(error)}
        
    }

    getAllProducts()
  }, [warrantys])

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
        <div className="col-lg-1"></div>
        <div className="col-lg-18">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Warranty list</h5>
              {message && (
                <h5>
                  <span style={{ color: 'green' }}>{message}</span>
                </h5>
              )}

              {/* Table with stripped rows */}
              <table id="example" className="table table-striped">
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
                      <th scope="row">{index}</th>
                      <td>{warranty.customer.firstName}</td>
                      <td>
                        {warranty.product.productName}
                      </td>
                      <td>{warranty.productCode}</td>
                      <td>{formatDate(warranty.dateStart)}</td>
                      <td>{formatDate(warranty.dateExpired)}</td>
                      <td>
                        <a href={`/edit-warranty/${warranty.warrantyId}`} className="btn btn-outline-dark btn-sm">Edit</a>
                      </td>
                      <td>
                        <a href={`/warranty/delete/${warranty.productId}`} className="btn btn-outline-dark btn-sm">Delete</a>
                      </td>
                    </tr>
                ))}

                </tbody>
              </table>
              {/* End Table with stripped rows */}
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
