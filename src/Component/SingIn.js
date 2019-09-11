import React, { Component } from "react";
// import '../assets/css/style.css';
import "./../assets/css/custome.css";
import Logo from "./../assets/Images/logo.jpg";

class SingIn extends Component {
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
                <img src={Logo} alt="logo" style={{ width: "210px" }} />
              </div>
              <label className="sign-in">SIGN IN</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Email ID*"
                  className="form-control"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  placeholder="Password*"
                  className="form-control"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary form-control mb-4"
                style={{
                  backgroundColor: "#2561A8",
                  borderColor: "#2561A8",
                  letterSpacing: "0.5px"
                }}
              >
                LOGIN
              </button>
              <div>
                <p className="mb-0 text-muted">
                  <a
                    href="Forgotpassword"
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    FORGOT PASSWORD
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

export default SingIn;
