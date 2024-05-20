import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { getListProducts } from "./service/ProductService";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteProductById } from "./service/DeleteProduct";

const ListProduct = ({ allproductList, message }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npages = Math.ceil(products.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(numbers[numbers.length - 1]);
  };

  const changePage = (n) => {
    setCurrentPage(n);
  };

  const showProductModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getListProducts();
        setProducts(response.data);
        // console.log(products);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [products]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProductById(id);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.productId !== id));
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <>
      <Header/>
      <Sidebar/>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Manage Product</h1>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-18">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">List of products</h5>
                  <div className="d-flex flex-row-reverse mb-2">
                    <button className="btn btn-primary">
                      <i class="bi bi-search"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control w-25"
                      id="datatable-search-input"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  {/* Table with stripped rows */}
                  <table id="myTable" className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Details</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records
                        .filter((product) =>
                          search.toLocaleLowerCase() === ""
                            ? product
                            : product.productName
                                .toLocaleLowerCase()
                                .includes(search)
                        )
                        .map((product, index) => (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{product?.productName}</td>
                            <td>
                              <img
                                src={product?.image1}
                                alt=""
                                style={{ width: "150px" }}
                              />
                            </td>
                            <td>{product?.price}</td>
                            <td>{product?.category}</td>
                            <td>
                              <Link
                                to="#"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => showProductModal(product)}
                              >
                                Details
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/edit-product/${product?.productId}`}
                                className="btn btn-outline-info btn-sm"
                              >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(product.productId)}
                                className="btn btn-outline-danger btn-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>

                    {selectedProduct && (
                      <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Product details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="productName"
                                value={selectedProduct.productName}
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
                                value={selectedProduct.price}
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
                                value={selectedProduct.quantity}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">
                              Category
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="category"
                                value={selectedProduct.category}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">
                              Images
                            </label>
                            <hr />
                            <div className="d-flex justify-content-center">
                              <div className="col-sm-10 d-flex justify-content-center">
                                <img
                                  src={selectedProduct.image1}
                                  alt=""
                                  style={{ height: "200px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                  </table>
                  {/* End Table with stripped rows */}
                  <nav className="pagination justify-content-end">
                    <li className="page-item">
                      <Link href="/#" className="page-link" onClick={firstPage}>
                        &laquo;
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link href="/#" className="page-link" onClick={prevPage}>
                        &lsaquo;
                      </Link>
                    </li>
                    {numbers.map((n, i) => (
                      <li
                        className={`page-item ${
                          n === currentPage ? "active" : ""
                        }`}
                        key={i}
                      >
                        <Link
                          href="/#"
                          className="page-link"
                          onClick={() => changePage(n)}
                        >
                          {n}
                        </Link>
                      </li>
                    ))}
                    <li className="page-item">
                      <Link href="/#" className="page-link" onClick={nextPage}>
                        &rsaquo;
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link href="/#" className="page-link" onClick={lastPage}>
                        &raquo;
                      </Link>
                    </li>
                  </nav>
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </section>
      </main>
      {/* End #main */}
      <Footer />
    </>
  );
};

export default ListProduct;
