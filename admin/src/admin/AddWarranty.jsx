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
                  <h5 className="card-title">Add warranty</h5>
                  {message && (
                    <h5>
                      <span style={{ color: 'green' }}>{message}</span>
                    </h5>
                  )}
                  <input type="hidden" name="action" value="add" />
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Product Code</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="productName" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Start Date</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" name="productPrice" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">End Date</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" name="productQuantity" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Customer</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" name="category">
                            <option value="Gaming" selected>Gaming</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                  </div>
                  
                  {/* Other fields */}
                  {/* Add other fields as needed */}
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Add</label>
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">OK</button>
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

export default AddWarranty;
