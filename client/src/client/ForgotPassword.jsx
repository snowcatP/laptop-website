import React, {useState} from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Letter from './components/Letter'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import FormInput from './components/FormInput'

const ForgotPassword = () => {

  const [values, setValues] = useState({
    username: ""
  });


  const input = {
    id: 1,
    name: "Username",
    type: "email",
    label: "Username",
    placeholder: "Username",
    errorMessage: "Username shoule be in email type",
    required: true,
    focused: false
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
                    <FormInput 
                      {...input}
                      value = {values[input.name]}
                      onChange={onChange}
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