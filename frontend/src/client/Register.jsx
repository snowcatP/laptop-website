import React from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
const Register = () => {
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
                <div className="form-group" style={{ display: "flex" }}>
                    <div style={{ flex: 1, marginRight: "10px" }}>
                      <label htmlFor="firstname">
                        <i className="fa fa-user" /> First name <span style={{color:"red"}}>*</span>
                      </label>
                      <input
                        className="input"
                        type="text"
                        name="firstname"
                        placeholder="Enter first name"
                        id="firstname"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="lastname">
                        <i className="fa fa-user" /> Last name <span style={{color:"red"}}>*</span>
                      </label>
                      <input
                        className="input"
                        type="text"
                        name="lastname"
                        placeholder="Enter last name"
                        id="lastname"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fa fa-lock" /> Phone
                    </label>
                    <input
                      className="input"
                      type="text"
                      name="password"
                      placeholder="Input password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fa fa-lock" /> Address
                    </label>
                    <input
                      className="input"
                      type="text"
                      name="password"
                      placeholder="Input password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fa fa-lock" /> Email or username <span style={{color:"red"}}>*</span>
                    </label>
                    <input
                      className="input"
                      type="text"
                      name="password"
                      placeholder="Input password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fa fa-lock" /> Password <span style={{color:"red"}}>*</span>
                    </label>
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
                    <Link to="" style={{ alignSelf: "flex-start" }}>
                      
                    </Link>
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
