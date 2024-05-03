import React from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Letter from '../components/Letter';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const UserOrders = () => {

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
                  <h3>Orders</h3>
                  <hr />
                  <Link to={"/checkout"}> <button className='primary-btn'>Change shipping address</button></Link>
                 
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

export default UserOrders