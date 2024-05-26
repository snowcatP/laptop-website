import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import { adminLogout } from "../service/AdminService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const {setAdmin, admin, setIsLogged} = useAuth()
  const profile = {...admin}

  const navigate = useNavigate()

  const handleLogout = () => {
    const getToken = localStorage.getItem("token")

    const token = {"token": getToken}

    const logout = async () => {

      const response = await adminLogout(token)

      if (response.status === 200) {
        setAdmin(null)
        setIsLogged(false)
        return <Navigate to="/auth/admin-login"/>

        
        // navigate("/auth/admin-login")
        
        

      } else {
        toast.error("Fail to logout!")
      }
    }
    logout()
  }

  return (
    <>
    <div>
      {/* ======= Header ======= */}
      <div
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="./assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" />
        </div>
        {/* End Logo */}
        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>
        {/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </Link>
            </li>

            {/* End Messages Nav */}
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >

                <span className="d-none d-md-block dropdown-toggle ps-2">
                {`${profile.firstName} ${profile.lastName}`}
                </span>
              </Link>
              {/* End Profile Iamge Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{`${profile.firstName} ${profile.lastName}`}</h6>
                  <span>{profile.role.roleName}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/profile"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right" />
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
              {/* End Profile Dropdown Items */}
            </li>
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Icons Navigation */}
      </div>
      {/* End Header */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
       
      />
    </div>
    </>
  );
};

export default Header;
