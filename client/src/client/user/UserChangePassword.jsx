import React, { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from "../components/Letter";
import Footer from "../components/Footer";
import PasswordInput from "../components/PasswordInput";

const UserChangePassword = (props) => {

  //const profile = props.profile

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

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
      name: "confirmNewPassword",
      type: "password",
      label: "Confirm new password",
      errorMessage: "Password does not match!",
      pattern: values.newPassword,
      required: true,
      focused: false
    },
  ]

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
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
                <form action="change_user_profile" method="post">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Letter/>
      <Footer/>
    </>
  );
};

export default UserChangePassword;
