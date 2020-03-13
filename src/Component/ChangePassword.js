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

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confimPassword: "",
      oldPassword:""
    };
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.validator = new SimpleReactValidator();
  }
  handlechange(e) {
    debugger;
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCheckPassword(e) {
    debugger;
    e.preventDefault();

    if (this.validator.allValid()) {
      const { newPassword, confimPassword } = this.state;
      if (newPassword === confimPassword) {
        this.handleChangePassword(newPassword);
      } else {
        NotificationManager.error(
          "The new password and confirm password do not match."
        );
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
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

    axios({
      method: "post",
      url: config.apiUrl+"/User/ChangePassword",
      data: {
        EmailID: emaiId,
        Password:this.state.oldPassword,
        NewPassword: newPassword
      },
      headers: authHeader()
    }).then(function(response) {
      // let data = response;
      debugger;
      let Msg = response.data.responseData;
      if (Msg === true) {
        NotificationManager.success("Password Changed successfully.");
        setTimeout(function() {
          self.props.history.push("/SignIn");
        }, 400);
      }
      else {
        NotificationManager.error("Password Not Changed.");
      }
    });
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div
            className="card forgotpass-card changepass-card"
            style={{ height: "auto" }}
          >
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <h3 className="m-0" style={{ textAlign: "left" }}>
                  <label
                    className="col-mb-3 col-form-label col-form-label p-0 forgot-pass-text"
                    style={{ fontWeight: "300" }}
                  >
                    CHANGE PASSWORD
                  </label>
                </h3>
              </div>
              <form name="form" onSubmit={this.handleCheckPassword}>
              <div className="input-group sb-2">
                  <label className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                    Enter Old Password
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    className="program-code-textbox"
                    value={this.state.oldPassword}
                    onChange={this.handlechange}
                    maxLength={25}
                  />
                  
                </div>
                <div className="input-group sb-2">
                  <label className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                    Enter New Password
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
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
                    placeholder="Confirm Password"
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
                <div className="input-group mb-3">
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

export default ChangePassword;
