import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from "../components/Letter";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const UserProfile = () => {

  //const [profile, setProfile] = useState(null)

  //const navigate = useNavigate()

  // useEffect(() => {
  //   const token = localStorage.getItem("token")

  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

  //   const decode_token = jwtDecode(token)

  //   const current = new Date()

  //   if (decode_token.exp * 1000 < current.getTime) {
  //     navigate("/login")
  //     return;
  //   } else {

  //     const headers = { 'Authorization': `Bearer ${token}`}
  //     const getProfile = async () => {
  //       const response = await customerProfile(headers)

  //       //console.log(response)
  //       setProfile(response.data)
  //       //console.log(response.data)
  //     }

  //     //getProfile()

  //     console.log(profile)
  //   }

  // }, [])

  
  return (
    <>
      <Header />
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              <Sidebar/>
              <div
                className="col-md-9"
                style={{ minHeight: "65vh", backgroundColor: "white" }}
              >
                <div className="" style={{ margin: "2em" }}>
                  <h3>My profile</h3>
                  <p>Manage your information to protect the account</p>
                  <hr />
                </div>

                <form action="change_user_profile" method="post">
                  <input
                    type="hidden"
                    name="action"
                    defaultValue="update_profile"
                  />
                  <div className="col-sm-1"> </div>
                  <div className="col-sm-11">
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-2 col-form-label">Email</label>

                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          readOnly="true"
                          //value={profile.email}
                        />
                      </div>
                    </div>
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-2 col-form-label">
                        First name
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          //value={profile.firstName}
                        />
                      </div>
                    </div>
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-2 col-form-label">
                        Last name
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          //value={profile.lastName}
                        />
                      </div>
                    </div>
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-2 col-form-label">Address</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          //value={profile.address}
                        />
                      </div>
                    </div>
                    <div className="row mb-3" style={{ paddingBottom: "1em" }}>
                      <label className="col-sm-2 col-form-label">Phone</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          //value={profile.phone}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label" />
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-danger btn-lg">
                          Save
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

export default UserProfile;
