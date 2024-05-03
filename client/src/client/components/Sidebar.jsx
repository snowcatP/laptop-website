import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const {user} = useAuth()
  const profile = {...user}

  return (
    <>
      {/* ASIDE */}
      <div id="aside" className="col-md-3">
        <h2 className="d-inline-flex pb-3">Dashboard</h2>
        <h4 className="d-inline-flex pb-3">Hello {profile.firstName + " " + profile.lastName}</h4>
        {/* aside Widget */}
        <div className="aside">
          <h3 className="aside-title" style={{ paddingTop: "0.5em" }}>
            <Link to="/user/profile">My account</Link>
          </h3>
          <div className="checkbox-filter">
            <div className="input-checkbox">
              <label htmlFor="category-1">
                <Link to="/user/profile">Profile</Link>
              </label>
            </div>
            <div className="input-checkbox">
              <label htmlFor="category-2">
                <Link to="/user/change-password">Change password</Link>
              </label>
            </div>
          </div>
        </div>
        {/* /Linkside Widget */}
        {/* aside Widget */}
        <div className="aside">
          <h3 className="aside-title">
            <Link to="/user/cart">Cart</Link>
          </h3>
        </div>
        {/* /Linkside Widget */}
        {/* aside Widget */}
        <div className="aside">
          <h3 className="aside-title">
            <Link to="/user/orders">Orders</Link>
          </h3>
        </div>
        {/* /Linkside Widget */}
        <div className="aside">
          <h3 className="aside-title">
            <Link to="/user/bills">Bills</Link>
          </h3>
        </div>
        {/* /Linkside Widget */}
        <div className="aside">
          <h3 className="aside-title">
            <Link to="/user/warranties">Warranties</Link>
          </h3>
        </div>
        {/* /Linkside Widget */}
      </div>
      {/* /LinkSIDE */}
    </>
  );
};

export default Sidebar;