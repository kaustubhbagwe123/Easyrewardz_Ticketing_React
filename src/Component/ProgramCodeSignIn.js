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
          <div className="card programcode-card-new">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <h3
                className="sign-in"
              >
                SIGN IN
              </h3>
              <div style={{marginRight:"10px"}}>
                <input
                  type="email"
                  className="program-code-textbox"
                  placeholder="Program Code*"
                  style={{ border: 0 }}
                />
              </div>
              <br />
              <button
                type="button"
                className="program-code-button"                 
                onClick={this.hanleChange}
              >
                <label className="program-code-button-text">SUBMIT</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgramCodeSignIn;
