import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { addWarranty } from "./service/WarrantyService";
import { getListCustomers } from "./service/CustomerService";

const AddWarranty = () => {
  const [message, setMessage] = useState(""); // State để lưu thông báo
  const [form, setForm] = useState({
    productCode: "",
    dateStart: "",
    dateExpired: "",
    customer_id: "",
    product_id: "",
  });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    const credential = {
      productCode: form.productCode,
      dateStart: form.dateStart,
      dateExpired: form.dateExpired,
      customer_id: form.customer_id,
      product_id: form.product_id,
    };

    try {
      // Gọi hàm addWarranty từ WarrantyService để thêm bảo hành
      const response = await addWarranty(credential);

      // Xử lý kết quả từ API
      if (response.status === 200) {
        // Nếu thành công, hiển thị thông báo hoặc thực hiện các hành động khác
        setMessage("Added successfully!");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error adding warranty:", error);
    }
  };

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const response = await getListCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCustomers();
  }, []);

  const handleCustomerSelect = (customer) => {
    setForm({ ...form, customer_id: customer.customerId });
    setSelectedCustomer(customer.firstName + " " + customer.lastName);
  };

  return (
    <>
      <Header />
      <Sidebar />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Manage Warranty</h1>
        </div>
        <section className="section">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Add warranty</h5>
                      {message && (
                        <h5>
                          <span style={{ color: 'green' }}>{message}</span>
                        </h5>
                      )}
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Product Code</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" name="productCode" value={form.productCode} onChange={onChangeInput} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Start Date</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" name="dateStart" value={form.dateStart} onChange={onChangeInput} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">End Date</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" name="dateExpired" value={form.dateExpired} onChange={onChangeInput} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Customer</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" value={selectedCustomer} readOnly />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Product ID</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" name="product_id" value={form.product_id} onChange={onChangeInput} readOnly/>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Add</label>
                        <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">OK</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Customer List</h5>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer, index) => (
                            <tr key={index}>
                              <th scope="row">{customer.customerId}</th>
                              <td>{customer.firstName} {customer.lastName}</td>
                              <td>
                                <input
                                  type="radio"
                                  name="customerSelect"
                                  checked={form.customer_id === customer.customerId}
                                  onChange={() => handleCustomerSelect(customer)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AddWarranty;
