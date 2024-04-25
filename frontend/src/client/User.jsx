import React, { Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link, useParams } from "react-router-dom";
import UserProfile from "./user/UserProfile";
import UserChangePassword from "./user/UserChangePassword";
import UserCart from "./user/UserCart";
import UserOrders from "./user/UserOrders";
import UserBills from "./user/UserBills";
import UserWarranties from "./user/UserWarranties";

const User = () => {
  const [page, setPage] = useState("profile");

  // const {action} = useParams();

  // useEffect(() => {
  //   setPage(action)
  // }, [action])

  return (
    <>
      <Header />
      <Navigation />

      

      <Letter />
      <Footer />
    </>
  );
};

export default User;
