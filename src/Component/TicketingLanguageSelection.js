import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../assets/css/custome.css";
import Logo from "./../assets/Images/logo.jpg";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";

class TicketingLanguageSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "",
      languageData: [],
    };
  }
  componentDidMount() {
    this.handleGetSelectedLanguageDetails();
  }

  ////handle get seleted language details
  handleGetSelectedLanguageDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetSelectedLanguageDetails",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        var languageData = [];
        if (message === "Success") {
          for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].isActive) {
              languageData.push(responseData[i]);
            }
          }
          self.setState({ languageData });
        } else {
          self.setState({ languageData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle CRM Role
  handleCRMRole() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetRolesByUserID",
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
                  self.props.history.push("/admin/dashboard");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Tickets" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/myTicketlist");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Knowledge Base" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/knowledgebase");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Settings" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/settings");
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

  ////handle continue button click
  handleContinue() {
    let language = this.state.language;
    if (language === "hindi") {
      window.localStorage.setItem("translateLanguage", language);
    } else if (language === "marathi") {
      window.localStorage.setItem("translateLanguage", language);
    } else if (language === "punjabi") {
      window.localStorage.setItem("translateLanguage", language);
    } else if (language === "gujrati") {
      window.localStorage.setItem("translateLanguage", language);
    } else if (language === "telugu") {
      window.localStorage.setItem("translateLanguage", language);
    } else {
      this.state.translateLanguage = {};
    }
    this.handleCRMRole();
  }
  ////handle skip button click
  handleSkip() {
    this.handleCRMRole();
  }
  ////handle on change
  handleOnChange(e) {
    this.setState({ language: e.target.value });
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
              <div
                className="languagebox"
                onClick={this.handleOnChange.bind(this)}
              >
                {this.state.languageData !== null
                  ? this.state.languageData.map((item, i) => {
                      return (
                        <button
                          class={
                            item.language.split(" ")[0].toLowerCase() ===
                            this.state.language
                              ? "langbtn active"
                              : "langbtn"
                          }
                          value={item.language.split(" ")[0].toLowerCase()}
                        >
                          {item.language}
                        </button>
                      );
                    })
                  : null}
              </div>
              <button
                type="submit"
                className="program-code-button"
                value={this.state.language}
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

export default TicketingLanguageSelection;
