import React, { Component } from "react";
import logo from "../../assets/Images/logo.jpg";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../../helpers/encryption";

class StoreChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confimPassword: "",
      oldPassword: "",
      ProfileData: [],
      oldPasswordCompulsion: "",
    };
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleGetUserProfileData = this.handleGetUserProfileData.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    debugger;
    this.handleGetUserProfileData();
  }

  handleGetUserProfileData() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserProfileDetail",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var userdata = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ProfileData: userdata,
          });
        } else {
          self.setState({
            ProfileData: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handlechange(e) {
    debugger;
    this.setState({
      [e.target.name]: e.target.value,
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
          "The new password and confirm password do not match.",
          "",
          1500
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
    // let emaiId = window.location.href
    //   .slice(window.location.href.indexOf("?") + 1)
    //   .split(":")[1];
    let emaiId = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split(":")[1];

    let encPassword = encryption(newPassword, "enc");

    var field = "Id";
    var changePasswordType = "system";
    var emailIDsystem = "";
    let email = this.state.ProfileData[0].emailId;
    var url = window.location.href;
    if (url.indexOf("?" + field + ":") !== -1) {
      changePasswordType = "mail";
      emailIDsystem = emaiId;
    } else {
      changePasswordType = "system";
      emailIDsystem = email;
    }
    let X_Authorized_Domainname = encryption(window.location.origin, "enc");
    // change password
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/StoreChangePassword",
      data: {
        EmailID: emailIDsystem,
        Password: this.state.oldPassword,
        NewPassword: encPassword,
        ChangePasswordType: changePasswordType,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Authorized-Domainname": X_Authorized_Domainname,
      },
    })
      .then(function(response) {
        // let data = response;
        debugger;
        let Msg = response.data.responseData;
        if (Msg === true) {
          NotificationManager.success(
            "Password Changed successfully.",
            "",
            1500
          );
          setTimeout(function() {
            self.props.history.push("/SignIn");
          }, 1500);
        } else {
          NotificationManager.error("Old password is wrong.", "", 1500);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <div className="auth-wrapper box-center change-password-auth-wrapper">
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
                  {this.validator.message(
                    "Old Password",
                    this.state.oldPassword,
                    "required"
                  )}
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

export default StoreChangePassword;
