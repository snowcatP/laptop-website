import React from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getListProducts } from "./service/StoreService";
import { searchProducts } from "./service/SearchProduct";
import { addToCart, getProducts } from "./service/ProductService";
import axios from "axios";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import Button from 'react-bootstrap/Button';
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";

const Store = () => {

  const {user} = useAuth()
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useState({});
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(3000);
  const [sortType, setSortType] = useState(null); // Thêm state để lưu trữ loại sắp xếp
  const [priceProducts, setPriceProducts] = useState([]);
  // Thêm state để lưu trữ số lượng sản phẩm mỗi trang
const [itemsPerPage, setItemsPerPage] = useState(9);


    
    useEffect(() => {
      fetchProductsByPage(0);
    }, []);

    
    const fetchProductsByPage = async (page) => {
        try {
            const response = await getListProducts(page)
            setProducts(response.data);
            setCurrentPage(page);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
      const getAllProducts = async () => {
        try {
          const response = await getProducts();
  
          setFilterProducts(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      getAllProducts();
    }, [filterProducts]);

    const fetchSearchResults = async (params = searchParams) => {
      try {
          const response = await searchProducts(params)
          setProducts(response);
          setFilterProducts(response);
          setCurrentPage(0);
      } catch (error) {
          console.error('Error fetching search results:', error);
      }
  };


  const filterProductsList = () => {
    let filtered = filterProducts;

    if (searchParams.category) {
      filtered = filtered.filter(product => product.category === searchParams.category);
    }

    if (searchParams.brand) {
      filtered = filtered.filter(product => product.brand === searchParams.brand);
    }


    setProducts(filtered);
    setCurrentPage(0);
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ ...searchParams, category });
    filterProductsList();
  };

  const handleBrandClick = (brand) => {
    setSearchParams({ ...searchParams, brand });
    filterProductsList();
  };


// Function to reset all filters and fetch original list of products
const resetFilters = () => {
  // Reset search parameters
  setSearchParams({});
  // Reset price range
  setPriceMin(0);
  setPriceMax(3000);

  // Uncheck all category checkboxes
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Uncheck all brand checkboxes
  const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
  brandCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  // Fetch original list of products
  fetchProductsByPage(0);
  setProducts(filterProducts);
  setCurrentPage(0);
};

const handleSearch = (keyword) => {
  if(keyword){
    console.log(keyword)
  } else {
    console.log("null")
  }
  setSearchParams({ ...searchParams, keyword });
  fetchSearchResults({ ...searchParams, keyword });
};

// Hàm sắp xếp danh sách sản phẩm dựa trên loại sắp xếp
const sortProducts = (type) => {
  const sortedProducts = [...products];
  if (type === 'increase') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (type === 'decrease') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  setProducts(sortedProducts);
};

// Hàm xử lý khi người dùng chọn loại sắp xếp
const handleSortChange = (event) => {
  const type = event.target.value;
  setSortType(type); // Lưu loại sắp xếp mới vào state
  sortProducts(type); // Sắp xếp danh sách sản phẩm
};

const handlePriceChange = (values) => {
  const [min, max] = values;
  setPriceMin(min);
  setPriceMax(max);
  const changePriceProduct = filterProducts;
  const newPriceProducts = changePriceProduct.filter(product => product.price >= min && product.price <= max);
  setProducts(newPriceProducts);
};

const handlePriceInputChange = (min, max) => {
  setPriceMin(min);
  setPriceMax(max);
  const changePriceProduct = filterProducts;
  const newPriceProducts = changePriceProduct.filter(product => product.price >= min && product.price <= max);
  setProducts(newPriceProducts);
};

const handleAddToCart = (id) =>{

  const cartId = user.customerId;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const addProductToCart = async () => {
    try {
      const response = await addToCart(cartId, id, quantity, headers)

      if (response.status === 200) {
        toast.success("Add to cart successfully")

        setTimeout(() => {  
          navigate("/user/cart")
        }, 2000)
      }
    } catch(error) {
      toast.error("Add to cart failed")
    }
  }
  addProductToCart();
}


  return (
    <>
      <Header onSearch={handleSearch}/>
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
                {/* Button to clear all filters */}
              <Button variant="danger" onClick={resetFilters}>Clear All Filters</Button>{' '}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">Categories</h3>
                  <div className="checkbox-filter">
                    <div className="input-checkbox" onClick={() => handleCategoryClick('Office')} >
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
                    <Slider
                      range
                      min={0}
                      max={3000}
                      defaultValue={[priceMin, priceMax]}
                      onChange={handlePriceChange}
                      step={100}
                    />
                    <div className="input-number price-min">
                      <input 
                      id="price-min" 
                      type="number" 
                      value={priceMin}
                      onChange={(e) => handlePriceInputChange(parseInt(e.target.value), priceMax)}/>
                      <span className="qty-up" onClick={() => handlePriceInputChange(priceMin+1)}>+</span>
                      <span className="qty-down" onClick={() => handlePriceInputChange(priceMin-1)}>-</span>
                    </div>
                    <span>-</span>
                    <div className="input-number price-max">
                      <input 
                      id="price-max" 
                      type="number"
                      value={priceMax}
                      onChange={(e) => handlePriceInputChange(priceMin,parseInt(e.target.value))} />
                      <span className="qty-up" onClick={() => handlePriceInputChange(priceMax+1)}>+</span>
                      <span className="qty-down" onClick={() => handlePriceInputChange(priceMax-1)}>-</span>
                    </div>
                  </div>
                </div>
                {/* /aside Widget */}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">Brand</h3>
                  <div className="checkbox-filter">
                    <div className="input-checkbox" onClick={() => handleBrandClick('ASUS')}>
                      <input type="checkbox" id="brand-1" name="brand" value="ASUS" />
                      <label htmlFor="brand-1">
                        <span />
                        ASUS
                      </label>
                    </div>
                    <div className="input-checkbox" onClick={() => handleBrandClick('DELL')}>
                      <input type="checkbox" id="brand-2" name="brand" value="DELL" />
                      <label htmlFor="brand-2">
                        <span />
                        DELL
                      </label>
                    </div>
                    <div className="input-checkbox" onClick={() => handleBrandClick('MSI')}>
                      <input type="checkbox" id="brand-3" name="brand" value="MSI"/>
                      <label htmlFor="brand-3">
                        <span />
                        MSI
                      </label>
                    </div>
                    <div className="input-checkbox" onClick={() => handleBrandClick('ACER')}>
                      <input type="checkbox" id="brand-4" name="brand" value="ACER"/>
                      <label htmlFor="brand-4">
                        <span />
                        ACER
                      </label>
                    </div>
                    <div className="input-checkbox" onClick={() => handleBrandClick('HP')}>
                      <input type="checkbox" id="brand-5" name="brand" value="HP" />
                      <label htmlFor="brand-5">
                        <span />
                        HP
                      </label>
                    </div>
                    <div className="input-checkbox" onClick={() => handleBrandClick('LENOVO')}>
                      <input type="checkbox" id="brand-6" name="brand" value="LENOVO"/>
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
                      <select className="input-select" onChange={handleSortChange}>
                        <option value="">Select</option>
                        <option value="increase">Prices gradually increase</option>
                        <option value="decrease">Prices gradually decrease</option>
                      </select>
                    </label>
                  </div>
                  <ul className="store-grid">
                    <li className="active">
                      <i className="fa fa-th" />
                    </li>
                  </ul>
                </div>
                {/* /store top filter */}
                {/* store products */}
                <div className="row">
                  {/* product */}
                  
                  {products?.map((product, index) => (
                    <Link to={`/product/${product?.productId}`} key={index}>
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
                            <button className="add-to-cart-btn" onClick={()=> handleAddToCart(product.productId)}>
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
