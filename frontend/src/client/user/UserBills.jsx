import React from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from '../components/Letter';
import Footer from '../components/Footer';

const UserBills = () => {
  

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
                  <h3>Bills</h3>
                  <hr />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Letter/>
      <Footer/>
    </>
  )
}

export default UserBills