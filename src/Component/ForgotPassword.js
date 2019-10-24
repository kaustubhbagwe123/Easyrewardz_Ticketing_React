import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from "../assets/Images/logo.jpg";
import {Link} from 'react-router-dom'

class ForgotPassword extends Component {
  // componentDidMount() {
  //   document.querySelectorAll(".card-Nav")[0].style.display = "none";
  // }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card forgotpass-card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <h3 className="m-0" style={{ textAlign: "left" }}>
                  {" "}
                  <label
                    className="col-mb-3 col-form-label col-form-label p-0 forgot-pass-text"
                    style={{ fontWeight: "300" }}
                  >
                    FORGOT PASSWORD
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
                  Enter Email ID
                </label>
              </div>
              <div className="input-group mb-3">
                <input type="email" className="program-code-textbox" />
              </div>
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="recovery-pass-button"
                  title=""
                  data-toggle="tooltip"
                  data-original-title="btn btn-primary"
                >
                <label className="program-code-button-text">RECOVER PASSWORD</label>  
                </button>
              </div>

              <div style={{ paddingTop: "10px" }}>
                <p className="mb-0 text-muted">
                  <Link
                    to="SignIn"
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    TRY LOGIN AGAIN
                  </Link>
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
