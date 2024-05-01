import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
const ListWarranty = ({ allwarrantyList, message }) => {
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
              <h5 className="card-title">Danh sách bảo hành</h5>
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
                    <th scope="col">Khách hàng</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Mã Code</th>
                    <th scope="col">Ngày bắt đầu</th>
                    <th scope="col">Ngày kết thúc</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
                  </tr>
                </thead>
                <tbody>

                    <tr key="">
                      <th scope="row">1</th>
                      <td>Nguyễn Văn A</td>
                      <td>ASUS TUF F15</td>
                      <td>115113</td>
                      <td>25-04-2024</td>
                      <td>25-10-2024</td>
                      <td>
                        <a href="" className="btn btn-outline-dark btn-sm">Sửa</a>
                      </td>
                      <td>
                        <a href="" className="btn btn-outline-dark btn-sm">Xóa</a>
                      </td>
                    </tr>

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
