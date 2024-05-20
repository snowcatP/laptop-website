import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from '../components/Letter';
import Footer from '../components/Footer';
import {getListWarrantiesByIdUser} from '../service/WarrantyService';

const UserWarranties = () => {
  const [warranties, setWarranties] = useState([]);

  useEffect(() => {
    const getAllWarranties = async () => {
      try {
        // Lấy thông tin người dùng từ localStorage
        const savedUser = localStorage.getItem("user");
        const user = savedUser ? JSON.parse(savedUser) : null;
        console.log(user)

        if (user && user.customerId) {
          // Gọi API với customerId
          const response = await getListWarrantiesByIdUser(user.customerId);
          setWarranties(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllWarranties();
  }, []); // Chỉ chạy useEffect một lần khi component được mount

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
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              <Sidebar/>
              <div
                className="col-md-9"
                style={{ minHeight: "65vh", backgroundColor: "white" }}
              >
                <div className="" style={{ margin: "2em" }}>
                  <h3>Warranties</h3>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Laptop</th>
                        <th>Code</th>
                        <th>Start date</th>
                        <th>End date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warranties?.map((warranty, index) => (
                        <tr key={index}>
                          <td>{warranty.product.productName}</td>
                          <td>{warranty.productCode}</td>
                          <td>{formatDate(warranty.dateStart)}</td>
                          <td>{formatDate(warranty.dateExpired)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Letter/>
      <Footer/>
    </>
  );
}

export default UserWarranties;
