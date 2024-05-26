import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "./service/ProductService";
import { editProductById } from "./service/ProductService";
import { Link } from "react-router-dom";
const EditProduct = ({ allproductList, message }) => {
  const { id } = useParams(); // Lấy id từ địa chỉ URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getProductById(id);

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  const [form, setForm] = useState({
    productName: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    processor: "",
    screen: "",
    ram: "",
    memory: "",
    graphicCard: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || "",
        price: product.price || "",
        quantity: product.quantity || "",
        category: product.category || "",
        brand: product.brand || "",
        image1: product.image1 || "",
        image2: product.image2 || "",
        image3: product.image3 || "",
        image4: product.image4 || "",
        processor: product.configuration?.processor || "",
        screen: product.configuration?.screen || "",
        ram: product.configuration?.ram || "",
        memory: product.configuration?.memory || "",
        graphicCard: product.configuration?.graphicCard || "",
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    const credential = {
      productName: form.productName,
      price: form.price,
      quantity: form.quantity,
      category: form.category,
      brand: form.brand,
      image1: form.image1,
      image2: form.image2,
      image3: form.image3,
      image4: form.image4,
      processor: form.processor,
      screen: form.screen,
      ram: form.ram,
      memory: form.memory,
      graphicCard: form.graphicCard,
    };

    try {
      const response = await editProductById(id, credential,headers);
      if (response.status === 200) {
        toast.success("Update success!")

        setTimeout(() => {
          navigate("/list-product")
        }, 2000)
      }
    } catch (error) {
      toast.error("Fail to update!")
      console.log(error)

      setTimeout(() => {
        navigate("/list-product")
      }, 2000)
    }
  };

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  };

  return (
    <>
      <Header />
      <Sidebar />

      <>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Manage Product</h1>
            <Link className='btn btn-outline-primary mt-2' to={"/list-product"}>Back</Link>
          </div>
          {/* End Page Title */}
          <section className="section">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* General Form Elements */}
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Edit products</h5>
                        {message && (
                          <h5>
                            <span style={{ color: "green" }}>{message}</span>
                          </h5>
                        )}
                        <input type="hidden" name="action" value="add" />
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              name="productName"
                              value={form.productName}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Price
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="number"
                              className="form-control"
                              name="price"
                              value={form.price}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Quantity
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="number"
                              className="form-control"
                              name="quantity"
                              value={form.quantity}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Category
                          </label>
                          <div className="col-sm-10">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="category"
                              value={form.category}
                              onChange={onChangeInput}
                            >
                              <option value="Gaming" selected>
                                Gaming
                              </option>
                              <option value="Office">Office</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Brand
                          </label>
                          <div className="col-sm-10">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="brand"
                              value={form.brand}
                              onChange={onChangeInput}
                            >
                              <option value="ASUS" selected>
                                ASUS
                              </option>
                              <option value="DELL">DELL</option>
                              <option value="MSI">MSI</option>
                              <option value="ACER">ACER</option>
                              <option value="HP">HP</option>
                              <option value="LENOVO">LENOVO</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Image 1
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              name="image1"
                              value={form.image1}
                              onChange={onChangeInput}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Image 2
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              name="image2"
                              value={form.image2}
                              onChange={onChangeInput}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Image 3
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              name="image3"
                              value={form.image3}
                              onChange={onChangeInput}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Image 4
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="text"
                              name="image4"
                              value={form.image4}
                              onChange={onChangeInput}
                              readOnly
                            />
                          </div>
                        </div>
                        {/* Other fields */}
                        {/* Add other fields as needed */}
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Edit
                          </label>
                          <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">
                              OK
                            </button>
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
                        <h5 className="card-title">Configurations</h5>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Processor
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              name="processor"
                              value={form.processor}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Screen
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              name="screen"
                              value={form.screen}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">RAM</label>
                          <div className="col-sm-10">
                            <input
                              type="number"
                              className="form-control"
                              name="ram"
                              value={form.ram}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Memory
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="number"
                              className="form-control"
                              name="memory"
                              value={form.memory}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Graphic card
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              name="graphicCard"
                              value={form.graphicCard}
                              onChange={onChangeInput}
                            />
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

export default EditProduct;
