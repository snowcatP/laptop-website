import React from "react";
import { useState } from "react";
import FormInput from "./components/FormInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "./service/AdminService";
import {useNavigate} from "react-router-dom"
import { useAuth } from "./context/AuthContext";
import {adminProfile} from "./service/AdminService";

const AdminLogin = () => {
  const navigate = useNavigate()

  const { setAdmin, setIsLogged} = useAuth()

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("")

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "email",
      label: "Username",
      placeholder: "Username or email",
      errorMessage: "Username shoule be in email type",
      required: true,
      focused: false,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      // errorMessage: "Password shoule be at least 8 characters",
      // pattern: "^[a-zA-Z0-9]{8,}",
      required: true,
      focused: false,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const adminLog = async () => {
      const response = await adminLogin(values)

      if (response.status === 200) {
        const token = response.data["token"]
        localStorage.setItem("token", token)

        const admin = async () => {
          const headers = { Authorization: `Bearer ${token}` };

            const response = await adminProfile(headers);
            
            setAdmin(response.data)
            setIsLogged(true);
        }

        admin()

        toast.success("Login successs!")

        setTimeout(() => {
          navigate("/")
        }, 2000)
      } else {
        toast.warn("Fail to login!")

        setError("Wrong username or password!")
      }
    }
    adminLog()
  };


  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="./assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div>
                {/* End Logo */}
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your username &amp; password to login
                      </p>
                    </div>

                    {error !== "" && 
                      <p className="text-center medium" style={{color: "red"}}>{error}</p>
                    }
                    
                    <form onSubmit={handleSubmit} className="row g-3">
                      {inputs.map((input) => (
                        <FormInput
                          key={input.id}
                          {...input}
                          value={values[input.name]}
                          onChange={onChange}
                        />
                      ))}
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 mt-3 p-2"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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

export default AdminLogin;
