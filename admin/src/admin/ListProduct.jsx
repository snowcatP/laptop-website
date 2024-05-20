  import React from "react";
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Sidebar from "./components/Sidebar";
  import { useEffect, useState } from "react";
  import { getListProducts } from "./service/ProductService";
  import DataTable from 'datatables.net-dt';
  import { deleteProductById } from "./service/DeleteProduct";
  const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    let table = new DataTable('#myTable');
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
          setMessage("Delete Successful");
          setProducts(products.filter(product => product.productId !== id));
        }
      } catch (error) {
        console.log("Error deleting product:", error);
      }
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
                <div className="col-lg-1"></div>
                <div className="col-lg-18">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">List of products</h5>
                      {message && (
                        <h5>
                          <span style={{ color: "green" }}>{message}</span>
                        </h5>
                      )}

                      {/* Table with stripped rows */}
                      <table id="myTable" className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product, index) => (
                            <tr key={index}>
                              <th scope="row">{index}</th>
                              <td>{product?.productName}</td>
                              <td>
                                <img
                                  src={product?.image1}
                                  alt=""
                                  style={{ width: "8%" }}
                                />
                              </td>
                              <td>{product?.price}</td>
                              <td>
                                <a
                                  href={`/edit-product/${product?.productId}`}
                                  className="btn btn-outline-dark btn-sm"
                                >
                                  Edit
                                </a>
                              </td>
                              <td>
                                <button
                                  // href={`/product/delete/${product?.productId}`}
                                  onClick={() => handleDelete(product?.productId)}
                                  className="btn btn-outline-dark btn-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
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

  export default ListProduct;
