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
// import {config} from './../helpers';

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      password: "",
      programCode: "",
      fullUserName: "",
      UserEmail: ""
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

  componentDidMount() {
    debugger;
    var finalEncProgramCode = this.props.location.state;
    if (finalEncProgramCode) {
      this.setState({
        programCode: finalEncProgramCode
      });
    } else {
      this.props.history.push("/");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    if (this.validator.allValid()) {
      const { emailID, password } = this.state;
      var X_Authorized_userId = encryption(emailID, "enc");

      let X_Authorized_password = encryption(password, "enc");

       let X_Authorized_Domainname = encryption(window.location.origin, "enc");
      // let X_Authorized_Domainname = encryption(
      //   "http://easyrewardz.demo.brainvire.net",
      //   "enc"
      // );
      let ProCode = this.state.programCode;
      let X_Authorized_Programcode = ProCode.programCode;

      if (X_Authorized_userId !== null && X_Authorized_password !== null) {
        let self = this;

        axios({
          method: "post",
          url: config.apiUrl + "/Account/authenticateUser",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Authorized-Programcode": X_Authorized_Programcode,
            "X-Authorized-userId": X_Authorized_userId,
            "X-Authorized-password": X_Authorized_password,
            "X-Authorized-Domainname": X_Authorized_Domainname
          }
        }).then(function(res) {
          debugger;
          let data = res.data.responseData;
          let resValid = res.data.message;
          if (resValid === "Valid Login") {
            debugger;
            NotificationManager.success("Login Successfull.");
            self.setState({
              fullUserName: data.firstName + " " + data.lastName,
              UserEmail: data.userEmailID
            });
            window.localStorage.setItem("token", res.data.responseData.token);
            setTimeout(function() {
              self.props.history.push("/admin/dashboard");
            }, 400);
          } else {
            NotificationManager.error("In-Valid Login.");
          }
        });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { fullUserName, UserEmail } = this.props;
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
                    maxLength={100}
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
                    maxLength={25}
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
