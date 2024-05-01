import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
const AddWarranty = ({ allwarrantyList, message }) => {
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
        <form action="productManage" method="post" encType="multipart/form-data">
          <div className="row">
            {/* General Form Elements */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Nhập bảo hành</h5>
                  {message && (
                    <h5>
                      <span style={{ color: 'green' }}>{message}</span>
                    </h5>
                  )}
                  <input type="hidden" name="action" value="add" />
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Tên sản phẩm</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="productName" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Giá</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" name="productPrice" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Số lượng</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" name="productQuantity" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Loại</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" name="category">
                            <option value="Gaming" selected>Gaming</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Ảnh 1</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" name="pic1" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Ảnh 2</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" name="pic2" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Ảnh 3</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" name="pic3" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Ảnh 4</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" name="pic4" />
                    </div>
                  </div>
                  {/* Other fields */}
                  {/* Add other fields as needed */}
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Nhập</label>
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">Nhập hàng</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional card */}
            {/* Add additional card as needed */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Thông số kỹ thuật</h5>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Vi sử lý</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="processor" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Màn hình</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="screen" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Dung lượng RAM</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" name="ram" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Bộ nhớ</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" name="memory" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Card đồ hoạ</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="graphicCard" />
                    </div>
                  </div>
                  {/* Other technical fields */}
                  {/* Add other technical fields as needed */}
                </div>
              </div>
            </div>
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

export default AddWarranty;
