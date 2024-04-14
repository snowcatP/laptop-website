import React from 'react'

const UserWarranties = () => {
  return (
    <div
      className="col-md-9"
      style={{ minHeight: "65vh", backgroundColor: "white" }}
    >
      <div className="" style={{ margin: "2em" }}>
          <h3>Your warranties</h3>
          <p>Manage your information to protect the account</p>
          <hr />
        </div>
      <form action="change_user_profile" method="post">
        <input type="hidden" name="action" defaultValue="change_password" />
        <input
          type="hidden"
          name="email"
        />
        <div className="col-sm-1"> </div>
        <div className="col-sm-11">
            <div className="row mb-3" style={{ paddingBottom: "1em" }}>
              <label className="col-sm-4 col-form-label">Password</label>
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
              <label className="col-sm-4 col-form-label">New password</label>
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
  )
}

export default UserWarranties