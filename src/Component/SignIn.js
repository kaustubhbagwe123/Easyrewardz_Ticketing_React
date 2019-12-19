import React, { Component } from "react";
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import "./../assets/css/custome.css";
import Logo from "./../assets/Images/logo.jpg";
import {Link} from 'react-router-dom'
// import {config} from './../helpers';

class SingIn extends Component {
    hanleChange = () => {
        this.props.history.push("/admin/dashboard");
      };

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
                  className="program-code-textbox"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  placeholder="Password*"
                  className="program-code-textbox"
                />
              </div>
              <button
                type="button"
                className="program-code-button"
                onClick={this.hanleChange}
              >LOGIN
                
              </button>

              <div>
                <br />
                <p className="mb-0 text-muted">
                  <Link
                    to="Forgotpassword"
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    FORGOT PASSWORD
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

export default SingIn;
