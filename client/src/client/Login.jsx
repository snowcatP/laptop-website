import React, { useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { loginResult } from "./service/ClientService";
import { useAuth } from "./context/AuthContext";
import { customerProfile } from "./service/ClientService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { setUser, setIsLogged } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "email",
      label: "Username",
      placeholder: "Username",
      errorMessage: "Username shoule be in email format",
      required: true,
      focused: false,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage: "Password should be at least 8 characters",
      pattern: "^[a-zA-Z0-9]{8,}",
      required: true,
      focused: false,
    },
  ];

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFocusInput = (inputName) => {
    setFocusedInput(inputName);
  };

  const onBlurInput = () => {
    setFocusedInput(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credential = {
      username: form.username,
      password: form.password,
    };

    const userLogin = async () => {
      try {
        const response = await loginResult(credential);

        if (response.status === 200) {
          const token = response.data.token;

          localStorage.setItem("token", token);

          setErrorMessage("");

          const user = async () => {
            const headers = { Authorization: `Bearer ${token}` };

            const response = await customerProfile(headers);
            
            setUser(response.data);
            setIsLogged(true);
          };

          user();
          
          navigate("/");
          
        }
      } catch (error) {
        setErrorMessage("Wrong username or password");
      }
    };

    userLogin();
    toast.success("Login success!")
    
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
                  <h2 className="title">Login</h2>
                </div>

                <div className="caption">
                  {inputs.map((input) => (
                    <div className="form-group" key={input.id}>
                      <label htmlFor={input.name}>
                        <i className="fa fa-lock" /> {input.label}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        className="input"
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        value={form[input.name]}
                        onChange={onChangeInput}
                        pattern={input.pattern}
                        required={input.required}
                        focused={input.focused.toString()}
                        onFocus={() => onFocusInput(input.name)}
                        onBlur={onBlurInput}
                      />

                      {focusedInput === input.name && (
                        <span className="error-message">
                          {input.errorMessage}
                        </span>
                      )}
                    </div>
                  ))}
                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="/register" style={{ alignSelf: "flex-start" }}>
                      Register
                    </Link>
                    <Link
                      to="/forgot-password"
                      style={{ alignSelf: "flex-end" }}
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div>
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  </div>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="primary-btn order-submit"
                  style={{ display: "block", margin: "auto", marginTop: "3em" }}
                >
                  Sign in
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
    </>
  );
};

export default Login;