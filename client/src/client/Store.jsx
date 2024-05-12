import React from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { getListProducts } from "./service/StoreService";

const Store = () => {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  // useEffect(() => {
  
  //   const getListProduct = async () => {
  //     try {
  //       const response = await getListProducts()

  //       setProducts(response.data)
  //     } catch(error) {console.log(error)}
        
  //   }

  //   getListProduct()
  // },[])

    
    useEffect(() => {
      fetchProductsByPage(0);
    }, []);

    const fetchProductsByPage = async (page) => {
        try {
            const response = await getListProducts(page)
            setProducts(response.data);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchSearchResults = async () => {
      try {
          const response = await axios.get("http://localhost:8080/product/search", {
              params: searchParams
          });
          setProducts(response.data);
          setCurrentPage(0);
      } catch (error) {
          console.error('Error fetching search results:', error);
      }
  };

//   const handleCategoryClick = (category) => {
//     setSearchParams({ ...searchParams, category });
//     fetchSearchResults();
// };

// Hàm xử lý khi chọn hoặc bỏ tích chọn Category
const handleCategoryClick = (category) => {
  // Kiểm tra xem category đã được chọn hay chưa
  const isCategorySelected = searchParams.category === category;

  // Nếu category đã được chọn, bỏ tích chọn
  if (isCategorySelected) {
      setSearchParams({ ...searchParams, category: null });
  } 
  // Nếu chưa được chọn, chọn category
  else {
      setSearchParams({ ...searchParams, category });
  }

  // Gọi hàm fetchSearchResults để cập nhật kết quả tìm kiếm
  fetchSearchResults();
};



const handleBrandClick = (brand) => {
    setSearchParams({ ...searchParams, brand });
    fetchSearchResults();
};

// Hàm xử lý khi bỏ tích chọn Category
const handleCategoryUnchecked = () => {
  setSearchParams({ ...searchParams, category: null });
  fetchProductsByPage(currentPage);
};

// Hàm xử lý khi bỏ tích chọn Brand
const handleBrandUnchecked = () => {
  setSearchParams({ ...searchParams, brand: null });
  fetchProductsByPage(currentPage);
};

    

  return (
    <>
      <Header />
      <Navigation />
      <>
        {/* SECTION */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* ASIDE */}
              <div id="aside" className="col-md-3">
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">Categories</h3>
                  <div className="checkbox-filter">
                    <div className="input-checkbox" onClick={() => handleCategoryClick('Office')}>
                      <input type="checkbox" id="category-1"  name="category" value="Office" />
                      <label htmlFor="category-1">
                        <span />
                        Office
                      </label>
                    </div>
                      <div className="input-checkbox" onClick={() => handleCategoryClick('Gaming')}>
                        <input type="checkbox" id="category-2" name="category" value="Gaming" />
                        <label htmlFor="category-2">
                          <span />
                          Gaming
                        </label>
                      </div>         
                      
                    </div>
                </div>
                {/* /aside Widget */}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">Price</h3>
                  <div className="price-filter">
                    <div id="price-slider" />
                    <div className="input-number price-min">
                      <input id="price-min" type="number" />
                      <span className="qty-up">+</span>
                      <span className="qty-down">-</span>
                    </div>
                    <span>-</span>
                    <div className="input-number price-max">
                      <input id="price-max" type="number" />
                      <span className="qty-up">+</span>
                      <span className="qty-down">-</span>
                    </div>
                  </div>
                </div>
                {/* /aside Widget */}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">Brand</h3>
                  <div className="checkbox-filter">
                    <div className="input-checkbox" onClick={() => handleBrandClick('ASUS')}>
                      <input type="checkbox" id="brand-1" />
                      <label htmlFor="brand-1">
                        <span />
                        ASUS
                      </label>
                    </div>
                    <div className="input-checkbox">
                      <input type="checkbox" id="brand-2" />
                      <label htmlFor="brand-2">
                        <span />
                        DELL
                      </label>
                    </div>
                    <div className="input-checkbox">
                      <input type="checkbox" id="brand-3" />
                      <label htmlFor="brand-3">
                        <span />
                        MSI
                      </label>
                    </div>
                    <div className="input-checkbox">
                      <input type="checkbox" id="brand-4" />
                      <label htmlFor="brand-4">
                        <span />
                        ACER
                      </label>
                    </div>
                    <div className="input-checkbox">
                      <input type="checkbox" id="brand-5" />
                      <label htmlFor="brand-5">
                        <span />
                        HP
                      </label>
                    </div>
                    <div className="input-checkbox">
                      <input type="checkbox" id="brand-6" />
                      <label htmlFor="brand-6">
                        <span />
                        LENOVO
                      </label>
                    </div>
                  </div>
                </div>
                {/* /aside Widget */}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">Top selling</h3>
                  <div className="product-widget">
                    <div className="product-img">
                      <img src="./assets/img/product01.png" alt="" />
                    </div>
                    <div className="product-body">
                      <p className="product-category">Category</p>
                      <h3 className="product-name">
                        <Link to="#">product name goes here</Link>
                      </h3>
                      <h4 className="product-price">
                        $980.00 <del className="product-old-price">$990.00</del>
                      </h4>
                    </div>
                  </div>
                  <div className="product-widget">
                    <div className="product-img">
                      <img src="./assets/img/product02.png" alt="" />
                    </div>
                    <div className="product-body">
                      <p className="product-category">Category</p>
                      <h3 className="product-name">
                        <Link to="#">product name goes here</Link>
                      </h3>
                      <h4 className="product-price">
                        $980.00 <del className="product-old-price">$990.00</del>
                      </h4>
                    </div>
                  </div>
                  <div className="product-widget">
                    <div className="product-img">
                      <img src="./assets/img/product03.png" alt="" />
                    </div>
                    <div className="product-body">
                      <p className="product-category">Category</p>
                      <h3 className="product-name">
                        <Link to="#">product name goes here</Link>
                      </h3>
                      <h4 className="product-price">
                        $980.00 <del className="product-old-price">$990.00</del>
                      </h4>
                    </div>
                  </div>
                </div>
                {/* /aside Widget */}
              </div>
              {/* /ASIDE */}
              {/* STORE */}
              <div id="store" className="col-md-9">
                {/* store top filter */}
                <div className="store-filter clearfix">
                  <div className="store-sort">
                    <label>
                      Sort By:
                      <select className="input-select">
                        <option value={0}>Prices gradually increase</option>
                        <option value={1}>prices gradually decrease</option>
                      </select>
                    </label>
                    {/* <label>
                      Show:
                      <select className="input-select">
                        <option value={0}>20</option>
                        <option value={1}>50</option>
                      </select>
                    </label> */}
                  </div>
                  <ul className="store-grid">
                    <li className="active">
                      <i className="fa fa-th" />
                    </li>
                    {/* <li>
                      <Link to="#">
                        <i className="fa fa-th-list" />
                      </Link>
                    </li> */}
                  </ul>
                </div>
                {/* /store top filter */}
                {/* store products */}
                <div className="row">
                  {/* product */}
                  
                  {products?.map((product, index) => (
                    <Link to={`/product/${product?.productId}`}>
                    <div className="col-md-4 col-xs-6">
                          <div className="product" key={index}>
                          <div className="product-img">
                            <img src={product?.image1} alt="" />
                            <div className="product-label">
                              <span className="sale">-30%</span>
                              <span className="new">NEW</span>
                            </div>
                          </div>
                          <div className="product-body">
                            <p className="product-category">{product?.category}</p>
                            <h3 className="product-name">
                             {product?.productName}
                            </h3>
                            <h4 className="product-price">
                              {product?.price}{" "}
                              <del className="product-old-price">{product?.price * 1.3}</del>
                            </h4>
                          </div>
                          <div className="add-to-cart">
                            <button className="add-to-cart-btn">
                              <i className="fa fa-shopping-cart" /> add to cart
                            </button>
                          </div>
                        </div>
                        </div>
                        </Link>
                        ))}
                  
                  {/* /product */}
                  
                </div>
                {/* /store products */}
                {/* store bottom filter */}
                    <div className="store-filter clearfix">
                        {/* Show current page */}
                        <span className="store-qty">Page {currentPage + 1}</span>
                        {/* Pagination links */}
                        <ul className="store-pagination">
                            {[...Array(4).keys()].map((index) => (
                                <li key={index} className={index === currentPage ? 'active' : ''}>
                                    {/* Handle pagination button click */}
                                    <Link to="#" onClick={() => fetchProductsByPage(index)}>
                                        {index + 1}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
            {/* /store bottom filter */}
              </div>
              {/* /STORE */}
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /SECTION */}
      </>

      <Letter />
      <Footer />
    </>
  );
};

export default Store;
