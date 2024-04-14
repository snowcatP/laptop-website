import React from "react";

const UserProfile = () => {
  return (
    <>
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
          <input type="hidden" name="action" defaultValue="update_profile" />
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
                />
              </div>
            </div>
            <div className="row mb-3" style={{ paddingBottom: "1em" }}>
              <label className="col-sm-2 col-form-label">First name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="firstName" />
              </div>
            </div>
            <div className="row mb-3" style={{ paddingBottom: "1em" }}>
              <label className="col-sm-2 col-form-label">Last name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="lastName" />
              </div>
            </div>
            <div className="row mb-3" style={{ paddingBottom: "1em" }}>
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="address" />
              </div>
            </div>
            <div className="row mb-3" style={{ paddingBottom: "1em" }}>
              <label className="col-sm-2 col-form-label">Phone</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="phone" />
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
    </>
  );
};

export default UserProfile;
