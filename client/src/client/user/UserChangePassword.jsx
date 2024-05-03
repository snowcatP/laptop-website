import React, { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from "../components/Letter";
import Footer from "../components/Footer";
import PasswordInput from "../components/PasswordInput";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserChangePassword = () => {


  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  //const [changeSuccess, setChangeSuccess] = useState("")

  const inputs = [
    {
      id: 1,
      name: "oldPassword",
      type: "password",
      label: "Old password",
      errorMessage: "Password should be at least 8 characters",
      pattern: "^[a-zA-Z0-9]{8,}",
      required: true,
      focused: false
    },
    {
      id: 2,
      name: "newPassword",
      type: "password",
      label: "New password",
      errorMessage: "New password should be at least 8 characters",
      pattern: "^[a-zA-Z0-9]{8,}",
      required: true,
      focused: false
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      label: "Confirm password",
      errorMessage: "Password does not match!",
      pattern: values.newPassword,
      required: true,
      focused: false
    },
  ]

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(values)
    toast.success("Change password success!")
  }

  return (
    <>
      <Header />
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              <Sidebar/>

              <div
                className="col-md-9"
                style={{ minHeight: "65vh", backgroundColor: "white" }}
              >
                <div className="" style={{ margin: "2em" }}>
                  <h3>Reset password</h3>
                  <p>Manage your information to protect the account</p>
                  <hr />
                </div>


                <Form 
                  onSubmit={handleSubmit}
                >
                  <h4 className="change-password-success">Change success!</h4>
                  <input
                    type="hidden"
                    name="action"
                    defaultValue="change_password"
                  />
                  <input type="hidden" name="email" />
                  <div className="col-sm-1"> </div>
                  <div className="col-sm-11">
                    
                    {inputs.map((input) => (
                      <PasswordInput
                        key = {input.id}
                        {...input}
                        value = {values[input.name]}
                        onChange = {onChange}
                      />
                    ))}

                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label" />
                      <div className="col-sm-7">
                        <button
                          type="submit"
                          className="btn btn btn-danger btn-lg"
                          id="changePassButton"
                          disabled=""
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Letter/>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      
      />
    </>
  );
};

export default UserChangePassword;
