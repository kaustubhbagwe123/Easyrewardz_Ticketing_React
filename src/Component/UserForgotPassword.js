import React, { Component } from "react";
import logo from "../assets/Images/logo.jpg";
import axios from "axios";
import config from "./../helpers/config";
import { authHeader } from "./../helpers/authHeader";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../helpers/encryption";

class UserForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confimPassword: "",
    };
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.validator = new SimpleReactValidator();
  }
  handlechange = e => {
    debugger;
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheckPassword(e) {
    debugger;
    e.preventDefault();

    if (this.validator.allValid()) {
      const { newPassword, confimPassword } = this.state;
      if (newPassword === confimPassword) {
        this.handleChangePassword(newPassword);
      } else {
        NotificationManager.error(
          "The new password and confirm password do not match.", '', 1250
        );
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleChangePassword(newPassword) {
    debugger;
    let self = this;
    // let emaiId=encryption(EmailID, "enc");
    let emaiId = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split(":")[1];
    let encPassword = encryption(newPassword, "enc");

    axios({
      method: "post",
      url: config.apiUrl + "/Account/UpdatePassword",
      params: {
        cipherEmailId: emaiId,
        Password: encPassword
      },
      headers: authHeader()
    }).then(function(response) {
      // let data = response;
      debugger;
      let Msg = response.data.responseData;
      if (Msg === "Update password successfully") {
        NotificationManager.success("Password Changed successfully.", '', 1250);
        setTimeout(function() {
          self.props.history.push("/SignIn");
        }, 1250);
      } else {
        NotificationManager.error("Password Not Changed.", '', 1250);
      }
    });
  }
  render() {
    return (
      <div className="auth-wrapper box-center">
        <div className="auth-content">
          <div
            className="card forgotpass-card changepass-card"
            // style={{ height: "500px" }}
          >
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
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
                    onChange={this.handlechange}
                    maxLength={25}
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
              <NotificationContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForgotPassword;
