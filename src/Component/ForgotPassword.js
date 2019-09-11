import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from "../assets/Images/logo.jpg";

class ForgotPassword extends Component {
  componentDidMount() {
    document.querySelectorAll(".card-Nav")[0].style.display = "none";
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <h3 className="m-0" style={{ textAlign: "left" }}>
                  {" "}
                  <label
                    className="col-mb-3 col-form-label col-form-label p-0"
                    style={{ fontWeight: "300" }}
                  >
                    FORGOT PASSWORD
                  </label>
                </h3>
              </div>
              <div className="input-group sb-2">
                <label
                  className="col-mb-3 col-form-label col-form-label pt-0"
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
                <input type="email" className="form-control" />
              </div>
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="btn btn-primary form-control"
                  style={{
                    backgroundColor: "#2561A8",
                    borderColor: "#2561A8",
                    letterSpacing: "0.5px"
                  }}
                  title=""
                  data-toggle="tooltip"
                  data-original-title="btn btn-primary"
                >
                  RECOVER PASSWORD
                </button>
              </div>

              <div style={{ paddingTop: "10px" }}>
                <p className="mb-0 text-muted">
                  <a
                    href="SingIn"
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    TRY LOGIN AGAIN
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
