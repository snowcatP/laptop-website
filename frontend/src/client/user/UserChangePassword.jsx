import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from "../components/Letter";
import Footer from "../components/Footer";

const UserChangePassword = () => {
  return (
    <>
      <Header />
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              <Sidebar />

              <div
                className="col-md-9"
                style={{ minHeight: "65vh", backgroundColor: "white" }}
              >
                <div className="" style={{ margin: "2em" }}>
                  <h3>Reset password</h3>
                  <p>Manage your information to protect the account</p>
                  <hr />
                </div>
                <form action="change_user_profile" method="post">
                  <input
                    type="hidden"
                    name="action"
                    defaultValue="change_password"
                  />
                  <input type="hidden" name="email" />
                  <div className="col-sm-1"> </div>
                  <div className="col-sm-11">
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-4 col-form-label">
                        Password
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="password"
                          className="form-control"
                          name="currentPassword"
                          id="currentPassword"
                        />
                      </div>
                      <div className="col-sm-1" />
                    </div>
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-4 col-form-label">
                        New password
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          id="newPassword"
                        />
                      </div>
                      <div className="col-sm-1" />
                    </div>
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-4 col-form-label">
                        Retype new password
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="password"
                          className="form-control"
                          name="renewPassword"
                          id="renewPassword"
                        />
                      </div>
                      <div className="col-sm-1" />
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label" />
                      <div className="col-sm-7">
                        <button
                          type="submit"
                          className="btn btn btn-danger btn-lg"
                          id="changePassButton"
                          disabled=""
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Letter/>
      <Footer/>
    </>
  );
};

export default UserChangePassword;
