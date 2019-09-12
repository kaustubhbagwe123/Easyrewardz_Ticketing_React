import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from "../assets/Images/logo.jpg";

class ProgramCodeSignIn extends Component {
  hanleChange = () => {
    this.props.history.push("SignIn");
  };
  // componentDidMount() {
  //   document.querySelectorAll(".card-Nav")[0].style.display = "none";
  // }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <h3
                className="mb-3"
                style={{ textAlign: "left", fontWeight: "300" }}
              >
                SIGN IN
              </h3>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Program Code*"
                  style={{ border: 0 }}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary form-control"
                style={{
                  backgroundColor: "#2561A8",
                  borderColor: "#2561A8",
                  letterSpacing: "0.5px"
                }}
                onClick={this.hanleChange}
              >
                SUBIMT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgramCodeSignIn;
