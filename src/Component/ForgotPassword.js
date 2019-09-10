import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from '../assets/Images/logo.jpg'
 
class ForgotPassword extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "200px" }} alt="logo" />
              </div>
              <div className="mb-4">
               
               <h3 style={{ textAlign:"left" }}> <label className="col-mb-3 col-form-label col-form-label" style={{ fontWeight: "300" }}>
                FORGOT PASSWORD
                </label>
                </h3>
              </div>
              <div className="input-group sb-2">
                <label className="col-mb-3 col-form-label col-form-label" style={{ fontWeight: "lighter" }}>
                  Enter Email ID
                </label>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="btn btn-primary form-control"
                  style={{ backgroundColor: "#2561A8", borderColor: "#2561A8" }}
                  title=""
                  data-toggle="tooltip"
                  data-original-title="btn btn-primary"
                >
                  RECOVER PASSWORD
                </button>
              </div>

              <div style={{ paddingTop: "15px" }}>
                <p className="mb-0 text-muted">
                  <a
                    href="SingIn"
                    style={{ color: "#246ec3" }}>
                    TRY LOGIN AGIN
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
