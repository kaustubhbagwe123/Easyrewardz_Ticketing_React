import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from '../assets/Images/logo.jpg'

class ProgramCodeSignIn extends Component {
  hanleChange=()=>{
    this.props.history.push("SingIn");
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "200px" }} alt="logo" />
              </div>
              <h3 className="mb-4" style={{ textAlign: "left" }}>SIGN IN</h3>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="ProgramCode*" />
              </div>
              <button type="button" 
              className="btn btn-primary form-control" 
              style={{ backgroundColor: "#2561A8", borderColor: "#2561A8" }}
              onClick={this.hanleChange}>SUBIMT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgramCodeSignIn;
