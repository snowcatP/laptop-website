import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
const AddDiscount = ({ alldiscountList, message }) => {
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
        <form action="productManage" method="post" encType="multipart/form-data">
          <div className="row">
            {/* General Form Elements */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Nhập giảm giá</h5>
                  {message && (
                    <h5>
                      <span style={{ color: 'green' }}>{message}</span>
                    </h5>
                  )}
                  <input type="hidden" name="action" value="add" />
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Giảm giá %</label>
                    <div className="col-sm-8">
                      <input type="number" className="form-control" name="productName" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Ngày bắt đầu</label>
                    <div className="col-sm-8">
                      <input type="date" className="form-control" name="productPrice" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Ngày kết thúc</label>
                    <div className="col-sm-8">
                      <input type="date" className="form-control" name="productQuantity" />
                    </div>
                  </div>
                
                  
                  {/* Other fields */}
                  {/* Add other fields as needed */}
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Nhập</label>
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">Đồng ý</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional card */}
            {/* Add additional card as needed */}
            
          </div>
        </form>
      </div>
    </section>
        </main>
        {/* End #main */}
      </>

      <Footer />
    </>
  );
};

export default AddDiscount;
