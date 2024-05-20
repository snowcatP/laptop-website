import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  editDiscount,
  getDiscountById,
  getProductsByDiscountId,
} from "./service/DiscountService";
const EditDiscount = () => {
  const { id } = useParams();
  const [discount, setDiscount] = useState(null);
  const [productsCorDiscount, setProductsCorDiscount] = useState([]);
  const [form, setForm] = useState({
    discountValue: 1,
    endDate: "",
    startDate: "",
    products: []
  });
  const navigate = useNavigate()
  const [selectedProducts, setSelectedProducts] = useState([]);

  const onChangeInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const editDis = async () => {
      try {
        const stringProducts = selectedProducts.map(product => product.productId)

        const request = {
          "products": stringProducts,
          "discountValue": form["discountValue"],
          "endDate": form["dateEnd"],
          "startDate": form["dateStart"]
        }
        
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

        const response = await editDiscount(id, request, headers)

        if (response.status === 200) {
          toast.success("Edit discount success!")

          setTimeout(() => {
            navigate("/list-discount")
          }, 2000)
        }
      } catch (error) {
        toast.error("Fail to update discount!")
      }
    }
    editDis()
  };

  const handleClickToCheckBox = (product) => {
    const isSelected = selectedProducts.find(p => p.productId === product.productId);
  
    const updatedProducts = isSelected
      ? selectedProducts.filter(p => p.productId !== product.productId)
      : [...selectedProducts, product];
  
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const getDiscount = async () => {
      try {
        const response = await getDiscountById(id, headers);

        if (response.status === 200) {
          setDiscount(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDiscount();

    if (discount) {
      setForm({
        discountValue: discount.discountValue || 1,
        endDate: discount.endDate || "",
        startDate: discount.startDate || "",
        products: [],
      });
    }

    const getProductsCorDiscountId = async () => {
      try {
        const response = await getProductsByDiscountId(id, headers);
        if (response.status === 200) {
          setProductsCorDiscount(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductsCorDiscountId();
  }, [id, discount]);

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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* General Form Elements */}
                  <div className="col-lg-2">
                    <Link
                      className="btn btn-outline-primary"
                      to={"/list-discount"}
                    >
                      Back
                    </Link>
                  </div>
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Edit discount</h5>
                        <input type="hidden" name="action" value="add" />
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Discount value
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="number"
                              className="form-control"
                              name="discountValue"
                              value={form.discountValue}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Date start
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="date"
                              className="form-control"
                              name="startDate"
                              value={form.startDate}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Date end
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="date"
                              className="form-control"
                              name="endDate"
                              value={form.endDate}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>

                        <hr />

                        <div className="row mb-3 mx-2">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Product</th>
                                <th scope="col">Image</th>
                                <th scope="col">Removed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productsCorDiscount &&
                                productsCorDiscount.map((product) => (
                                  <>
                                    <tr key={product.productId}>
                                      <td className="align-middle">
                                        {product.productId}
                                      </td>
                                      <td className="align-middle">
                                        {product.productName}
                                      </td>
                                      <td>
                                        <img
                                          src={product.image1}
                                          alt=""
                                          style={{ height: "150px" }}
                                        />
                                      </td>
                                      <td className="align-middle">
                                        <input
                                          type="checkbox"
                                          name="checkbox"
                                          style={{
                                            height: "20px",
                                            width: "20px",
                                          }}
                                          onChange={() => handleClickToCheckBox(product)}
                                          checked={selectedProducts.find(p => p.productId === product.productId)}
                                        />
                                      </td>
                                    </tr>
                                  </>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        {/* Other fields */}
                        {/* Add other fields as needed */}
                        <div className="row mb-3">
                          <div className="col-sm d-flex justify-content-end">
                            <Link
                              className="btn btn-outline-dark me-5"
                              to="/list-discount"
                            >
                              Cancel
                            </Link>
                            <button type="submit" className="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2"></div>

                  {/* Additional card */}
                </div>
              </form>
            </div>
          </section>
        </main>
        {/* End #main */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>

      <Footer />
    </>
  );
};

export default EditDiscount;
