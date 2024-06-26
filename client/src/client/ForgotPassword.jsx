import React, {useState} from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Letter from './components/Letter'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import FormInput from './components/FormInput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword } from './service/ForgotPasswordService'

const ForgotPassword = () => {

  const [values, setValues] = useState({
    username: ""
  });


  const input = {
    id: 1,
    name: "username",
    type: "email",
    label: "Username",
    placeholder: "Username",
    errorMessage: "Username shoule be in email format",
    required: true,
    focused: false
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmitForgotPassword = (e) => {
    e.preventDefault()

    const email = e.target.username.value


    const forgotPassw = async () => {
      
      try {
        const response = await forgotPassword(email)

        if (response.status === 200) {
          toast.success("Send to your email success, please check email to change password!")
        }
      } catch (error) {
          toast.error("Can't send mail to your email!")
      }
    }
    forgotPassw()
  }

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

              <Form 
                onSubmit={handleSubmitForgotPassword}
              >
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
                  style={{ display: "block", margin: "auto", marginTop:'3em'}}
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
  )
}

export default ForgotPassword