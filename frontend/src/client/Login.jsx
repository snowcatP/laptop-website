import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const Login = () => {

  //const [user, setUser] = useState()

  return (
    <>
      <Header />
      <Navigation />

      {/* SECTION */}
      <div className="section" >
        {/* container */}
        <div className="container" >
          {/* row */}
          <div className="row" style={{ paddingTop: "20px"}} >
            {/* Order Details */}
            <div className="col-md-3"></div>
            <div className="col-md-6 order-details">
              <Form method="post" action="/login" style={{ minHeight:"40vh" }}>
                <div className="section-title text-center">
                  <h2 className="title">Login</h2>
                </div>
                <div className="caption">
                  <div className="form-group">
                    <label htmlFor="username"><i className="fa fa-user"/> Username <span style={{color:"red"}}>*</span></label>
                    <input
                      className="input"
                      type="text"
                      name="username"
                      placeholder="Input username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"><i className="fa fa-lock"/> Password <span style={{color:"red"}}>*</span></label>
                    <input
                      className="input"
                      type="text"
                      name="password"
                      placeholder="Input password"
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="/register" style={{ alignSelf: "flex-start" }}>
                      Register
                    </Link>
                    <Link to="/forgot-password" style={{ alignSelf: "flex-end" }}>
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="primary-btn order-submit"
                  style={{ display: "block", margin: "auto", marginTop:'3em'}}
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
    </>
  );
};

export default Login;
