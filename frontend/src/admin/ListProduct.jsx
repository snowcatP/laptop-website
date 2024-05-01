import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
const ListProduct = ({ allproductList, message }) => {

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try{
        // Gửi yêu cầu để nhận token
        const tokenResponse = await axios.post("http://localhost:8080/auth/login", {
          username: "admin@gmail.com",
          password: "admin"
        });

        const token = tokenResponse.data.token;
        console.log(token);

        localStorage.setItem("token",token);
        setToken(token);

        //Gửi yêu cầu để lấy dữ liệu sản phẩm với token đã nhận được
        const productsResponse = await axios.get("http://localhost:8080/product", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProducts(productsResponse.data);
        console.log(productsResponse.data);
      }catch (error){
        console.error("Error fetching data: ", error);
      };
    };

    fetchData();
  },[]);
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
              <h5 className="card-title">Danh sách sản phẩm</h5>
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
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
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
                        <a href={`/admin/edit-product/${product?.productId}`} className="btn btn-outline-dark btn-sm">Sửa</a>
                      </td>
                      <td>
                        <a href={`/product/delete/${product?.productId}`} className="btn btn-outline-dark btn-sm">Xóa</a>
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
