import React from "react";
import { Link} from "react-router-dom";

const Sidebar = () => {

  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* End Dashboard Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide" />
              <span>Product Management</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/list-product">
                  <i className="bi bi-circle" />
                  <span>List Products</span>
                </Link>
              </li>
              <li>
                <Link to="/add-product">
                  <i className="bi bi-circle" />
                  <span>Add Product</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Components Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-journal-text" />
              <span>Warranty Management</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/list-warranty">
                  <i className="bi bi-circle" />
                  <span>List Warranty</span>
                </Link>
              </li>
              <li>
                <Link to="/add-warranty">
                  <i className="bi bi-circle" />
                  <span>Add Warranty</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Forms Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Discount Management</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/list-discount">
                  <i className="bi bi-circle" />
                  <span>List Discounts</span>
                </Link>
              </li>
              <li>
                <Link to="/add-discount">
                  <i className="bi bi-circle" />
                  <span>Add Discount</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Tables Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-bar-chart" />
              <span>Customer Management</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="charts-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/list-customer">
                  <i className="bi bi-circle" />
                  <span>List Customer</span>
                </Link>
              </li>
              
            </ul>
          </li>
          {/* End Charts Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-gem" />
              <span>Order Management</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/list-order">
                  <i className="bi bi-circle" />
                  <span>List Order</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Icons Nav */}
          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/profile">
              <i className="bi bi-person" />
              <span>Profile</span>
            </Link>
          </li>
          {/* End Profile Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-error-404.html">
              <i className="bi bi-dash-circle" />
              <span>Error 404</span>
            </Link>
          </li>
          {/* End Error 404 Page Nav */}
        </ul>
      </aside>
      {/* End Sidebar*/}
    </>
  );
};

export default Sidebar;
