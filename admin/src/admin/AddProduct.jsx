import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { addProduct } from "./service/ProductService";
import { toast } from "react-toastify";
import { imageDb } from "./util/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: "",
    price: 1,
    quantity: 1,
    category: "Gaming",
    brand: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    ram: 1,
    processor: "",
    screen: 1,
    memory: 1,
    graphicCard: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadPromises = [];

      for (let i = 1; i <= 4; i++) {
        const fieldName = `image${i}`;
        const imgRef = ref(imageDb, `images/${v4()}`);
        const uploadPromise = uploadBytes(imgRef, form[fieldName])
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((url) => {
            // Set URL in the form state
            setForm((prevForm) => ({
              ...prevForm,
              [fieldName]: url,
            }));
          })
          .catch((error) => {
            toast(error.message);
          });

        uploadPromises.push(uploadPromise);
      }

      // Wait for all image uploads to complete
      await Promise.all(uploadPromises);

      
      setTimeout(async () => {
        const response = await addProduct(form);
  
        if (response.status === 200) {
          console.log(response.data);
          toast.success("Product added successfully!");
          
          setTimeout(() => {
            navigate("/list-product");
          },2000)
        }
      }, 2000);

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Fail to add new product");
    }
  };

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Manage Product</h1>
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
                        <h5 className="card-title">
                          Enter product information
                        </h5>
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
                            <input
                              type="text"
                              className="form-control"
                              name="brand"
                              value={form.brand}
                              onChange={onChangeInput}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">
                            Image 1
                          </label>
                          <div className="col-sm-10">
                            <input
                              className="form-control"
                              type="file"
                              name="image1"
                              accept="image/**"
                              onChange={onChangeImage}
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
                              type="file"
                              name="image2"
                              accept="image/**"
                              onChange={onChangeImage}
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
                              type="file"
                              name="image3"
                              accept="image/**"
                              onChange={onChangeImage}
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
                              type="file"
                              name="image4"
                              accept="image/**"
                              onChange={onChangeImage}
                            />
                          </div>
                        </div>
                        {/* Other fields */}
                        {/* Add other fields as needed */}
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Add</label>
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
      </>

      <Footer />
    </>
  );
};

export default AddProduct;
