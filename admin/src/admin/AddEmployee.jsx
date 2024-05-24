import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { addNewEmployee } from "./service/EmployeeService";
import { toast } from "react-toastify";
const AddEmployee = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    salary: ""
  })

  const onChangeInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    console.log(form)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const addNewEm = async () => {
      try {
        const request = {
          ...form, password: "admin"
        }
        console.log(request)
        const response = await addNewEmployee(request, headers)

        if (response.status === 200){
          toast.success("Add new employee success!")

          setTimeout(()=> {
            navigate("/list-employee")
          }, 2000)
        }
      } catch (error) {
        toast.error("Fail to add new employee")
        console.log(error)
      }
    }
    addNewEm()
  }

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Manage Employee</h1>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* General Form Elements */}
                <div className="col-lg-2">
                  <Link className="btn btn-outline-info" to={"/list-employee"}>Back</Link>
                </div>
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Enter employee information</h5>
                      <input type="hidden" name="action" value="add" />
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={form.firstName}
                            onChange={onChangeInput}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={form.lastName}
                            onChange={onChangeInput}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={onChangeInput}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={form.phone}
                            onChange={onChangeInput}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                          <input
                          type="text"
                            className="form-control"
                            name="address"
                            value={form.address}
                            onChange={onChangeInput}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Salary</label>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className="form-control"
                            name="salary"
                            value={form.salary}
                            onChange={onChangeInput}
                            required
                          />
                        </div>
                      </div>
                      {/* Other fields */}
                      {/* Add other fields as needed */}
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Add</label>
                        <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2"></div>

              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AddEmployee;
