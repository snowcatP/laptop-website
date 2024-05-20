import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import {getListProducts} from "./service/ProductService"
import { addNewDiscount } from "./service/DiscountService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const AddDiscount = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [form, setForm] = useState({
    discountValue: 0,
    dateStart: "",
    dateEnd: "",
    products: []
  })

  const navigate = useNavigate()

  const modalOpen = (e) => {
    e.preventDefault()
    setShowModal(true)
  }
  const modalClose = () => {
    setShowModal(false)
  }

  const handleSelectAll = () => {
    setSelectedProducts([...products]);
  };

  const handleClickToCheckBox = (product) => {
    const isSelected = selectedProducts.find(p => p.productId === product.productId);
  
    const updatedProducts = isSelected
      ? selectedProducts.filter(p => p.productId !== product.productId)
      : [...selectedProducts, product];
  
    setSelectedProducts(updatedProducts);
  };

  const handleDeleteProductToSelectedProducts = (product) => {
    setSelectedProducts(selectedProducts.filter(p => p.productId !== product.productId))
  }

  const onChangeInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmitNewDiscount = (e) => {
    e.preventDefault()

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }

      const stringProducts = selectedProducts.map(product => product.productId)

      const request = {
        "products": stringProducts,
        "discountValue": form["discountValue"],
        "endDate": form["dateEnd"],
        "startDate": form["dateStart"]
      }
     
      const addDiscount = async () => {
        const response = await addNewDiscount(request, headers)
        

        if (response.status === 200) {
          toast.success("Add new discount success!")

          setTimeout(() => {
            navigate("/list-discount")
          }, 2000)
        }
      }

      addDiscount()

    } catch(error) {
      console.log(error)
      toast.error("Fail to add new discount!")
    }

  }

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getListProducts();

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [products]);


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
              <form
                onSubmit={handleSubmitNewDiscount}
              >
                <div className="row">
                  {/* General Form Elements */}
                  <div className="col-lg-1">
                    <Link
                      className="btn btn-outline-primary"
                      to={"/list-discount"}
                    >
                      Back
                    </Link>
                  </div>
                  <div className="col-lg-10">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Add new discount</h5>

                        <input type="hidden" name="action" value="add" />
                        <div className="row mb-4">
                          <label className="col-sm-4 col-form-label">
                            Discount value
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              max="50"
                              min="1"
                              className="form-control"
                              name="discountValue"
                              defaultValue="0"
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <label className="col-sm-4 col-form-label">
                            Date start
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="date"
                              className="form-control"
                              name="dateStart"
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <label className="col-sm-4 col-form-label">
                            Date end
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="date"
                              className="form-control"
                              name="dateEnd"
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <label className="col-sm-4 col-form-label">
                            Products applied
                          </label>

                          <div className="col-sm-4">
                            <button
                              className="btn btn-primary"
                              onClick={modalOpen}
                            >
                              Add products
                            </button>
                          </div>
                        </div>

                        <hr style={{ marginTop: "20px" }} />

                        <div
                          className="row-mb-4 my-2"
                          style={{ minHeight: "100px" }}
                        >
                          <table id="example" className="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Product</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedProducts &&
                                selectedProducts.map((selected) => (
                                  <>
                                    <tr key={selected.productId}>
                                      <td className="align-middle">{selected.productId}</td>
                                      <td className="align-middle">{selected.productName}</td>
                                      <td>
                                        <img
                                          src={selected.image1}
                                          alt=""
                                          style={{ height: "100px" }}
                                        />
                                      </td>
                                      <td className="align-middle">
                                        <button className="btn btn-danger"
                                          onClick={() => handleDeleteProductToSelectedProducts(selected)}
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <hr style={{ marginTop: "20px" }} />

                        {/* Other fields */}
                        {/* Add other fields as needed */}
                        <div className="row mb-3">
                          <label className="col-sm-9 col-form-label"></label>
                          <div className="col-sm-3">
                            <button
                              type="submit"
                              className="btn btn-lg btn-primary"
                            >
                              Add discount
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col lg-1"></div>
                  {/* Additional card */}
                  {/* Add additional card as needed */}
                </div>
              </form>
            </div>
          </section>
        </main>
        {/* End #main */}

        <Modal show={showModal} onHide={modalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add products to discount</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex flex-row-reverse">
              <button onClick={handleSelectAll} className="mx-2 btn btn-primary">Select all</button>
            </div>
            <table
              id="example"
              className="table table-striped"
              style={{ maxHeight: "500px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <>
                      <tr key={product.productId}>
                        <td className="align-middle">{product.productId}</td>
                        <td className="align-middle">{product.productName}</td>
                        <td>
                          <img
                            src={product.image1}
                            alt=""
                            style={{ height: "100px" }}
                          />
                        </td>
                        <td className="align-middle">
                          <input
                            type="checkbox"
                            name="checkbox"
                            style={{ height: "20px", width: "20px" }}
                            onChange={() => handleClickToCheckBox(product)}
                            checked={selectedProducts.find(p => p.productId === product.productId)}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={modalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Footer />

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
  );
};

export default AddDiscount;
