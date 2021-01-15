import React, { Component } from "react";
import logo from "../../assets/Images/logo.jpg";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../../helpers/encryption";

class StoreUserForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confimPassword: "",
      emailId: "",
    };
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    var email = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split(":")[1];
    this.setState({
      emailId: email,
    });
  }
  /// handle onchange
  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckPassword(e) {
    e.preventDefault();

    if (this.validator.allValid()) {
      const { newPassword, confimPassword } = this.state;
      if (newPassword === confimPassword) {
        this.handleChangePassword(newPassword);
      } else {
        NotificationManager.error(
          "The new password and confirm password do not match.",
          "",
          1500
        );
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  handleChangePassword(newPassword) {
    debugger
    let self = this;
    // let emaiId = window.location.href
    //   .slice(window.location.href.indexOf("?") + 1)
    //   .split(":")[1];
    let encPassword = encryption(newPassword, "enc");

    axios({
      method: "post",
      url: config.apiUrl + "/StoreAccount/UpdatePassword",
      params: {
        cipherEmailId: this.state.emailId,
        Password: encPassword,
      },
      headers: authHeader("no"),
    })
      .then(function(response) {
        let Msg = response.data.responseData;
        if (Msg === "Update password successfully") {
          NotificationManager.success(
            "Password Changed successfully.",
            "",
            1500
          );
          setTimeout(function() {
            self.props.history.push("/");
          }, 1500);
        } else {
          NotificationManager.error("Password Not Changed.", "", 1500);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <div className="auth-wrapper box-center">
        <NotificationContainer></NotificationContainer>
        <div className="auth-content">
          <div className="card forgotpass-card changepass-card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} className="initial-logo" alt="logo" />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 className="m-0" style={{ textAlign: "left" }}>
                  <label
                    className="col-mb-3 col-form-label col-form-label p-0 forgot-pass-text"
                    style={{ fontWeight: "300" }}
                  >
                    FORGOT PASSWORD
                  </label>
                </h3>
              </div>
              <form name="form" onSubmit={this.handleCheckPassword}>
                <div className="input-group sb-2">
                  <label className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                    Enter New Password
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    className="program-code-textbox"
                    maxLength={25}
                    autoComplete="off"
                    onChange={this.handlechange}
                  />
                  {this.validator.message(
                    "New Password",
                    this.state.newPassword,
                    "required"
                  )}
                </div>
                <div className="input-group sb-2">
                  <label className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                    Enter Confirm Password
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="confimPassword"
                    placeholder="Enter Confirm Password"
                    className="program-code-textbox"
                    onChange={this.handlechange}
                    maxLength={25}
                    autoComplete="off"
                  />
                  {this.validator.message(
                    "Confirm Password",
                    this.state.confimPassword,
                    "required"
                  )}
                </div>
                <div className="input-group">
                  <button
                    type="submit"
                    className="recovery-pass-button program-code-button"
                  >
                    SET PASSWORD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreUserForgotPassword;
