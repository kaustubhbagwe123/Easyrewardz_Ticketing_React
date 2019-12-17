import React, { Component } from 'react';
import logo from "../assets/Images/logo.jpg";
// import {Link} from 'react-router-dom'

export class ChangePassword extends Component {
    render() {
        return (
            <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card forgotpass-card changepass-card" style={{height:"500px"}}>
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <h3 className="m-0" style={{ textAlign: "left" }}>
                  <label
                    className="col-mb-3 col-form-label col-form-label p-0 forgot-pass-text"
                    style={{ fontWeight: "300" }}
                  >
                    CHANGE PASSWORD
                  </label>
                </h3>
              </div>
              <div className="input-group sb-2">
                <label
                  className="col-mb-3 col-form-label col-form-label pt-0 "
                  style={{
                    fontWeight: "bold",
                    color: "#a5a5a5",
                    marginBottom: "5px"
                  }}
                >
                  Enter New Password
                </label>
              </div>
              <div className="input-group mb-3">
                <input type="email" placeholder="Enter New Password" className="program-code-textbox" />
              </div>
              <div className="input-group sb-2">
                <label
                  className="col-mb-3 col-form-label col-form-label pt-0 "
                  style={{
                    fontWeight: "bold",
                    color: "#a5a5a5",
                    marginBottom: "5px"
                  }}
                >
                  Enter Confirm Password
                </label>
              </div>
              <div className="input-group mb-3">
                <input type="email" placeholder="Enter Confirm Password" className="program-code-textbox" />
              </div>
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="recovery-pass-button"
                  title=""
                  data-toggle="tooltip"
                  data-original-title="btn btn-primary"
                >
                <label className="program-code-button-text">SET PASSWORD</label>  
                </button>
              </div>

              {/* <div style={{ paddingTop: "10px" }}>
                <p className="mb-0 text-muted">
                  <Link
                    to="SignIn"
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    TRY LOGIN AGAIN
                  </Link>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default ChangePassword
