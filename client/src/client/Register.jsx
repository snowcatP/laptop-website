import React, { useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormInput from "./components/FormInput";
const Register = () => {

    const [values, setValues] = useState({
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      username: "",
      password: ""
    })

    const inputs = [
      {
        id: 1,
        name: "firstname",
        type: "text",
        label: "First name",
        placeholder: "First name",
        errorMessage: "First name shoule be characters",
        required: true,
        focused: false
      },
      {
        id: 2,
        name: "lastname",
        type: "text",
        label: "Last name",
        placeholder: "Last name",
        errorMessage: "Last name shoule be characters",
        pattern: "^[a-zA-Z0-9]",
        required: true,
        focused: false
      },
      {
        id: 4,
        name: "phone",
        type: "text",
        label: "Phone",
        placeholder: "Phone",
        errorMessage: "Phone shoule be in number type",
        pattern: "^[0-9]",
        focused: false
      },
      {
        id: 4,
        name: "address",
        type: "text",
        label: "Address",
        placeholder: "Address",
        focused: false
      },
      {
        id: 5,
        name: "username",
        type: "email",
        label: "Username",
        placeholder: "Username or email",
        errorMessage: "Username shoule be in email type",
        pattern: "^[a-zA-Z0-9]",
        required: true,
        focused: false
      },
      {
        id: 6,
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Password",
        errorMessage: "Password shoule be at least 8 characters",
        pattern: "^[a-zA-Z0-9]{8, 20}+$",
        required: true,
        focused: false
      },
    ]

    const onChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    };

  return (
    <>
      <Header />
      <Navigation />

      {/* SECTION */}
      <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row" style={{ paddingTop: "20px" }}>
            {/* Order Details */}
            <div className="col-md-3"></div>
            <div className="col-md-6 order-details">
              <Form
                method="post"
                action="/events"
                style={{ minHeight: "40vh" }}
              >
                <div className="section-title text-center">
                  <h2 className="title">Register</h2>
                </div>
                <div className="caption">

                  {inputs.map((input) => (
                    <FormInput 
                      key = {input.id}
                      {...input}
                      value = {values[input.name]}
                      onChange = {onChange}
                    
                    />
                  ))}

                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="" style={{ alignSelf: "flex-start" }}/>
                    <Link
                      to="/login"
                      style={{ alignSelf: "flex-end" }}
                    >
                      Have an account?
                    </Link>
                  </div>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="primary-btn order-submit"
                  style={{ display: "block", margin: "auto", marginTop: "2em" }}
                >
                  Sign up
                </button>
              </Form>
            </div>
            {/* /Order Details */}
            <div className="col-md-3"></div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /SECTION */}

      <Letter />
      <Footer />
    </>
  );
};

export default Register;
