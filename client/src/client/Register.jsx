import React, { useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./components/FormInput";
import { customerRegister } from "./service/ClientService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      label: "First name",
      placeholder: "First name",
      errorMessage: "First name shoule be characters",
      pattern: "^[a-zA-Z]{2,}",
      required: true,
      focused: false,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      label: "Last name",
      placeholder: "Last name",
      errorMessage: "Last name shoule be characters",
      pattern: "^[a-zA-Z0-9]{0,}",
      required: true,
      focused: false,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      label: "Phone",
      placeholder: "Phone",
      errorMessage: "Phone shoule be in number type",
      pattern: "^[0-9]{9,15}",
      focused: false,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      label: "Address",
      placeholder: "Address",
      focused: false,
    },
    {
      id: 5,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Username or email",
      errorMessage: "Username shoule be in email type",
      required: true,
      focused: false,
    },
    {
      id: 6,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage: "Password shoule be at least 8 characters",
      pattern: "^[a-zA-Z0-9]{8,}",
      required: true,
      focused: false,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cusData = { ...values };

    const cusRegister = async () => {
      const response = await customerRegister(cusData);

      if (response.status === 200) {
        toast.success("Register success! You can login with your account now.");

        setTimeout(() => {
          navigate("/auth/login")
        }, 2000)
      }
    };

    cusRegister()
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
              <Form onSubmit={handleSubmit} style={{ minHeight: "40vh" }}>
                <div className="section-title text-center">
                  <h2 className="title">Register</h2>
                </div>
                <div className="caption">
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}

                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="" style={{ alignSelf: "flex-start" }} />
                    <Link to="/auth/login" style={{ alignSelf: "flex-end" }}>
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

export default Register;