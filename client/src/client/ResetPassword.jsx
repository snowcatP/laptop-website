import React, { useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import FormInput from "./components/FormInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "./service/ForgotPasswordService";
import { jwtDecode } from "jwt-decode";

const ResetPassword = () => {
  const [values, setValues] = useState({
    username: "",
  });


  const input = {
    id: 1,
    name: "password",
    type: "password",
    label: "New password",
    placeholder: "Password",
    errorMessage: "Password should be at least 8 characters",
    pattern: "^[a-zA-Z0-9]{8,}",
    required: true,
    focused: false,
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const {token} = useParams()

  const handleResetPassword = (e) => {
    e.preventDefault()

    const decoded_token = jwtDecode(token)

    const current = new Date()
    if (decoded_token.exp * 1000 > current.getTime()){
        const password = e.target.password.value

        const resetPW = async () => {
            const resetPasswordRequest = {
                "token": token,
                "newPassword": password
            }

            const response = await resetPassword(resetPasswordRequest)

            if (response.status === 200) {
                toast.success(response.data)
            }
        }
        resetPW()

    } else {
        toast.warn("Token expired!")
    }    
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
              <Form onSubmit={handleResetPassword}>
                <div className="section-title text-center">
                  <h2 className="title">Password reset</h2>
                </div>
                <div className="caption">
                  <p style={{ textAlign: "center" }}>
                    Input new password you want to change.
                  </p>
                  <div className="form-group">
                    <FormInput
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="/auth/login" style={{ alignSelf: "flex-start" }}>
                      Login
                    </Link>
                    <Link to="/auth/register" style={{ alignSelf: "flex-end" }}>
                      Signup
                    </Link>
                  </div>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="primary-btn order-submit"
                  style={{ display: "block", margin: "auto", marginTop: "3em" }}
                >
                  Send to email
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

export default ResetPassword;
