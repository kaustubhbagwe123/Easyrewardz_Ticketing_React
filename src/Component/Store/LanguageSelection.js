import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import Logo from "./../../assets/Images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import config from "../../helpers/config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
class LanguageSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleCRMRole() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreRolesByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
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
  handleContinue() {
    this.handleCRMRole();
  }
  handleSkip() {
    this.handleCRMRole();
  }

  render() {
    return (
      <div className="auth-wrapper box-center">
        <div className="auth-content">
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
              <label
                className="sign-in"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Choose Language
              </label>
              <div className="languagebox">
                <button class="langbtn active">English</button>
                <button class="langbtn">हिन्दी</button>
                <button class="langbtn">मराठी</button>
                <button class="langbtn">ਪੰਜਾਬੀ</button>
                <button class="langbtn">ગુજરાતી</button>
                <button class="langbtn">తెలుగు</button>
              </div>
              <button
                type="submit"
                className="program-code-button"
                onClick={this.handleContinue.bind(this)}
              >
                Continue
              </button>
              <p className="skip" onClick={this.handleSkip.bind(this)}>
                Skip
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LanguageSelection;
