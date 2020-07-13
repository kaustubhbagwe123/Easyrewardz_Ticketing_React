import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import Logo from "./../../assets/Images/logo.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { encryption } from "../../helpers/encryption";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import config from "../../helpers/config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import SimpleReactValidator from "simple-react-validator";

class StoreSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      password: "",
      loading: false,
      programCode: "",
    };
    this.hanleChange = this.hanleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator();
    this.handleCRMRole = this.handleCRMRole.bind(this);
  }
  hanleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  componentDidMount() {
    debugger;

    if (this.props.location.encProgramCode) {
      var finalEncProgramCode = this.props.location.encProgramCode;

      if (finalEncProgramCode) {
        this.setState({
          programCode: finalEncProgramCode,
        });
      } else {
        this.props.history.push("/");
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    let self = this;
    if (this.validator.allValid()) {
      const { emailID, password } = this.state;
      var X_Authorized_userId = encryption(emailID, "enc");

      let X_Authorized_password = encryption(password, "enc");

      // let X_Authorized_Domainname = encryption(window.location.origin, "enc");
      let X_Authorized_Domainname = encryption(
        "https://multitenancyshopsterv2.dcdev.brainvire.net",
        "enc"
      );
      // let X_Authorized_Domainname = encryption(
      //   "https://multitenancyshopster.dcdev.brainvire.net",
      //   "enc"
      // );
      // let X_Authorized_Domainname = encryption(
      //   "https://ui-shopsterqa.ercx.co",
      //   "enc"
      // );
      // let X_Authorized_Domainname = encryption(
      //    "https://ui-bell-tktqa.ercx.co",
      //   "enc"
      // );

      let X_Authorized_Programcode = this.state.programCode;
      if (X_Authorized_userId !== null && X_Authorized_password !== null) {
        // authenticate user
        axios({
          method: "post",
          url: config.apiUrl + "/StoreAccount/authenticateUser",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Authorized-Programcode": X_Authorized_Programcode,
            "X-Authorized-userId": X_Authorized_userId,
            "X-Authorized-password": X_Authorized_password,
            "X-Authorized-Domainname": X_Authorized_Domainname,
          },
        })
          .then(function(res) {
            debugger;
            let resValid = res.data.message;
            self.setState({
              loading: true,
            });
            if (resValid === "Valid Login") {
              debugger;
              window.localStorage.setItem("token", res.data.responseData.token);
              window.localStorage.setItem("ERS", true);
              // self.handleCRMRole();
              self.props.history.push("languageSelection");
            } else {
              NotificationManager.error(
                "Username or password is invalid.",
                "",
                1500
              );
              self.setState({
                loading: false,
              });
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  handleCRMRole() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreRolesByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let msg = res.data.message;
        let data = res.data.responseData.modules;
        if (msg === "Success") {
          if (data !== null) {
            for (var i = 0; i <= data.length; i++) {
              if (i === data.length) {
                NotificationManager.error(
                  "You don't have any sufficient page access. Please contact administrator for access.",
                  "",
                  2000
                );
                self.setState({
                  loading: false,
                });
              } else if (
                data[i].moduleName === "Dashboard" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/store/storedashboard");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Tasks" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/store/StoreTask");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Claim" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/store/claim");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Campaign" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/store/campaign");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Appointment" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/store/appointment");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Settings" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/store/campaign");
                }, 400);
                return;
              }
            }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <div className="auth-wrapper box-center">
        <div className="auth-content">
          <NotificationContainer />
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img
                  src={Logo}
                  alt="logo"
                  className="main-logo"
                  style={{ width: "210px" }}
                />
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
                    onChange={this.handlePasswordChange}
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
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <FontAwesomeIcon
                      className="circular-loader"
                      icon={faCircleNotch}
                      spin
                    />
                  ) : (
                    ""
                  )}
                  {this.state.loading ? "Please Wait ..." : "LOGIN"}
                </button>
              </form>
              <div>
                <br />
                <p className="mb-0 text-muted">
                  <Link
                    // to="storeForgotpassword"
                    to={{
                      pathname: "storeForgotpassword",
                      state: {
                        programCode: this.state.programCode,
                      },
                    }}
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

export default StoreSignIn;
