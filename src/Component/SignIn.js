import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../assets/css/custome.css";
import Logo from "./../assets/Images/logo.jpg";
import { Link } from "react-router-dom";
import { encryption } from "../helpers/encryption";
import axios from "axios";
import config from "../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import SimpleReactValidator from "simple-react-validator";
// import { authHeader } from "../helpers/authHeader";
// import {config} from './../helpers';

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      password: "",
      programCode:""
    };
    this.hanleChange = this.hanleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }
  hanleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

 componentDidMount(){
   debugger
   var finalEncProgramCode=this.props.location.state;
   this.setState({
     programCode: finalEncProgramCode
   });
 }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    if (this.validator.allValid()) {
      const { emailID, password } = this.state;
      var X_Authorized_userId = encryption(emailID, "enc");

      // let DescryptUserID=encryption(X_Authorized_userId, "desc");
      let X_Authorized_password = encryption(password, "enc");
      //  let X_Authorized_userId = emailID;
      // let X_Authorized_password = password;
      let X_Authorized_Domainname =
        "rZbZUcWTDjEk+qIvay9BFe/7Izx/T+YkIhbRa/mL0W0=";
        let ProCode=this.state.programCode
      let X_Authorized_Programcode =  ProCode.programCode;
      let X_Authorized_applicationid = "lVWgnuY01lDMJBCSewbQ8g==";

      if (X_Authorized_userId !== null && X_Authorized_password !== null) {
        let self = this;

        const requestOptions = {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "*"
          },
          body: ""
        };
        axios
          .post(config.apiUrl + "/Account/authenticate", requestOptions, {
            params: {
              X_Authorized_userId,
              X_Authorized_password,
              X_Authorized_applicationid,
              X_Authorized_Programcode,
              X_Authorized_Domainname
            }
          })
          .then(function(res) {
            debugger;
            let resValid = res.data.responseData.message;
            if (resValid === "Valid login") {
              NotificationManager.success("Login Successfull.");
              setTimeout(function() {
                self.props.history.push("Admin/dashboard");
              }, 2000);
            } else {
            }
          });
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <NotificationContainer />
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={Logo} alt="logo" style={{ width: "210px" }} />
              </div>
              <form name="form" onSubmit={this.handleSubmit}>
                <label className="sign-in">SIGN IN</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="program-code-textbox"
                    placeholder="Email ID*"
                    name="emailID"
                    onChange={this.hanleChange}
                    value={this.state.emailId}
                    autoComplete="off"
                  />
                  {this.validator.message(
                    "Email Id",
                    this.state.emailID,
                    "required|email"
                  )}
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="program-code-textbox"
                    placeholder="Password*"
                    name="password"
                    onChange={this.hanleChange}
                    value={this.state.password}
                    autoComplete="off"
                  />
                  {this.validator.message(
                    "Password",
                    this.state.password,
                    "required"
                  )}
                </div>
                <button
                  type="submit"
                  className="program-code-button"
                  // onClick={this.handleSubmit}
                >
                  LOGIN
                </button>
              </form>
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
