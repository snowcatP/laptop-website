import React from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Letter from './components/Letter'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const ForgotPassword = () => {
  return (
    <>
      <Header/>
      <Navigation/>

      {/* SECTION */}
      <div className="section" >
        {/* container */}
        <div className="container" >
          {/* row */}
          <div className="row" style={{ paddingTop: "20px"}} >
            {/* Order Details */}
            <div className="col-md-3"></div>
            <div className="col-md-6 order-details">
              <Form method="post" action="/events">
                <div className="section-title text-center">
                  <h2 className="title">Password reset</h2>
                </div>
                <div className="caption">
                  <p style={{textAlign:'center'}}>Provide the email address associated with your account to recover your password.</p>
                  <div className="form-group">
                    <label htmlFor="username"><i className="fa fa-user"/> Email <span style={{color:"red"}}>*</span></label>
                    <input
                      className="input"
                      type="text"
                      name="username"
                      placeholder="Input email"
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="/login" style={{ alignSelf: "flex-start" }}>
                      Login
                    </Link>
                    <Link to="/register" style={{ alignSelf: "flex-end" }}>
                      Signup
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

      <Letter/>
      <Footer/>
    </>
  )
}

export default ForgotPassword