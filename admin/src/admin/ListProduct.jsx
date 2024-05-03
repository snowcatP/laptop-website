import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { getListProducts } from "./services/ListProductService";
const ListProduct = ({ allproductList, message }) => {

  const [products, setProducts] = useState([])

  useEffect(() => {
  
    const getAllProducts = async () => {
      try {
        const response = await getListProducts()

        setProducts(response.data)
        console.log(products)
      } catch(error) {console.log(error)}
        
    }

    getAllProducts()
  }, [])

  
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
                  <span style={{ color: 'green' }}>{message}</span>
                </h5>
              )}

              {/* Table with stripped rows */}
              <table id="example" className="table table-striped">
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
                          style={{ width: '8%' }}
                        />
                      </td>
                      <td>{product?.price}</td>
                      <td>
                        <a href={`/edit-product/${product?.productId}`} className="btn btn-outline-dark btn-sm">Edit</a>
                      </td>
                      <td>
                        <a href={`/product/delete/${product?.productId}`} className="btn btn-outline-dark btn-sm">Delete</a>
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
