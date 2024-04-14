import React, { Suspense, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Letter from "./components/Letter";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import UserProfile from "./user/UserProfile";
import UserChangePassword from "./user/UserChangePassword";
import UserCart from "./user/UserCart";
import UserOrders from "./user/UserOrders";
import UserBills from "./user/UserBills";
import UserWarranties from "./user/UserWarranties";

const User = () => {
  // const UserProfile = lazy(() => import("./components/UserProfile"));
  // const UserChangePassword = lazy(() => import("./components/UserChangePassword"));

  const [page, setPage] = useState("profile");

  return (
    <>
      <Header />
      <Navigation />

      <div id="main" className="main" style={{ backgroundColor: "#F9F9F9" }}>
        <div className="section">
          <div className="container">
            <div className="row">
              {/* ASIDE */}
              <div id="aside" className="col-md-3">
                <h2 className="d-inline-flex pb-3">Dashboard</h2>
                <p className="d-inline-flex pb-3">Hello Hoang</p>
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title" style={{ paddingTop: "0.5em" }}>
                    <Link onClick={() => setPage("profile")}>My account</Link>
                  </h3>
                  <div className="checkbox-filter">
                    <div className="input-checkbox">
                      <label htmlFor="category-1">
                        <Link onClick={() => setPage("profile")}>Profile</Link>
                      </label>
                    </div>
                    <div className="input-checkbox">
                      <label htmlFor="category-2">
                        <Link onClick={() => setPage("change-password")}>
                          Change password
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                {/* /Linkside Widget */}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">
                    <Link onClick={() => setPage("cart")}>Cart</Link>
                  </h3>
                </div>
                {/* /Linkside Widget */}
                {/* aside Widget */}
                <div className="aside">
                  <h3 className="aside-title">
                    <Link onClick={() => setPage("orders")}>Orders</Link>
                  </h3>
                </div>
                {/* /Linkside Widget */}
                <div className="aside">
                  <h3 className="aside-title">
                    <Link onClick={() => setPage("bills")}>Bills</Link>
                  </h3>
                </div>
                {/* /Linkside Widget */}
                <div className="aside">
                  <h3 className="aside-title">
                    <Link onClick={() => setPage("warranties")}>
                      Warranties
                    </Link>
                  </h3>
                </div>
                {/* /Linkside Widget */}
              </div>
              {/* /LinkSIDE */}

              <Suspense>
                {page === "profile" && <UserProfile />}
                {page === "change-password" && <UserChangePassword />}
                {page === "cart" && <UserCart />}
                {page === "orders" && <UserOrders />}
                {page === "bills" && <UserBills />}
                {page === "warranties" && <UserWarranties />}

              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <Letter />
      <Footer />
    </>
  );
};

export default User;
