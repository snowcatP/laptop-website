import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "./context/AuthContext";
import { changeProfile, changePassword } from "./service/StaffService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer'
const AdminProfile = () => {
  const {admin} = useAuth();
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: admin.firstName || '',
    lastName: admin.lastName || '',
    address: admin.address || '',
    phone: admin.phone || ''
  })

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const onChangeProfile = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const onChangePassword = (e) => {
    setPasswordForm({...passwordForm, [e.target.name]: e.target.value})
  }

  const handleChangeProfileSubmit = (e) => {
    e.preventDefault()
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    const profileRequest = form

    const changeStaffProfile = async () => {
      try {
        const response = await changeProfile(profileRequest, headers)

        if(response.status === 200) {
          toast.success("Update profile success!")
          setTimeout(() => {
            navigate("/admin/profile")
          }, 1900)
        } 
      } catch (error) {
        toast.error("Fail to update profile!")
      }
    }
    changeStaffProfile()
  }

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault()
    if(passwordForm["oldPassword"] === "" || passwordForm["newPassword"] === "" || passwordForm["confirmPassword"] === "") {
      setErrorMessage("Fields must not be null or empty")
      return;
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    const passwordRequest = passwordForm

    const changeStaffPassword = async () => {
      try {
        const response = await changePassword(passwordRequest, headers)

        if (response.status === 200) {
          toast.success("Change password success!")

          setTimeout(() => {
            window.location.reload();
          }, 1900)
        }
      } catch (error) {
        toast.error("Fail to change password!")
      }
    }
    changeStaffPassword()
  }

  const profile = {...admin}
  return (
    <>
      <Header />
      <Sidebar />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <i className="bi-lg bi-person"/>
                  <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                  <h3>{profile.role.roleName}</h3>
                  <div className="social-links mt-2">
                    <Link to="#" className="twitter">
                      <i className="bi bi-twitter" />
                    </Link>
                    <Link to="#" className="facebook">
                      <i className="bi bi-facebook" />
                    </Link>
                    <Link to="#" className="instagram">
                      <i className="bi bi-instagram" />
                    </Link>
                    <Link to="#" className="linkedin">
                      <i className="bi bi-linkedin" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Bordered Tabs */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      <p className="small fst-italic">
                        Student UTE K21 - GROUP
                      </p>
                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">{`${profile.firstName} ${profile.lastName}`}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Company</div>
                        <div className="col-lg-9 col-md-8">
                          1 Võ Văn Ngân, Thủ Đức, TP. Hồ Chí Minh
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Role</div>
                        <div className="col-lg-9 col-md-8">{profile.role.roleName}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">
                          {profile.address}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">
                          {profile.phone}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {profile.email}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Salary</div>
                        <div className="col-lg-9 col-md-8">
                          {profile.salary} VND
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}
                      <form
                        onSubmit={handleChangeProfileSubmit}
                      >
                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            First Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="firstName"
                              type="text"
                              className="form-control"
                              id="firstName"
                              defaultValue= {`${profile.firstName}`}
                              onChange={onChangeProfile}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Last Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="lastName"
                              type="text"
                              className="form-control"
                              id="lastName"
                              defaultValue= {`${profile.lastName}`}
                              onChange={onChangeProfile}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="email"
                              value={profile.email}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Job"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Role
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="job"
                              type="text"
                              className="form-control"
                              id="Job"
                              value={profile.role.roleName}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Address"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Address
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="address"
                              type="text"
                              className="form-control"
                              id="address"
                              defaultValue={profile.address}
                              onChange={onChangeProfile}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              id="phone"
                              defaultValue={profile.phone}
                              onChange={onChangeProfile}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                      {/* End Profile Edit Form */}
                    </div>
                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                      <div>
                        <h4 style={{color: "red"}}>{errorMessage}</h4>
                      </div>
                      {/* Change Password Form */}
                      <form
                        onSubmit={handleChangePasswordSubmit}
                      >
                        <div className="row mb-3">
                          <label
                            htmlFor="oldPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Old Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="oldPassword"
                              type="password"
                              className="form-control"
                              id="oldPassword"
                              onChange={onChangePassword}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="newPassword"
                              type="password"
                              className="form-control"
                              id="newPassword"
                              onChange={onChangePassword}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Confirm New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="confirmPassword"
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              onChange={onChangePassword}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form>
                      {/* End Change Password Form */}
                    </div>
                  </div>
                  {/* End Bordered Tabs */}
                </div>
              </div>
            </div>
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
        <Footer />
    </>
  );
};

export default AdminProfile;
