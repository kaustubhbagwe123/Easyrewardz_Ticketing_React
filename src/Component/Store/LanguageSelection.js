import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import Logo from "./../../assets/Images/logo.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import config from "../../helpers/config";
import {
  NotificationManager,
} from "react-notifications";

class LanguageSelection extends Component {
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
////handle crm role 
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
    debugger;
    this.setState({ language: e.target.value });
  }
////handle get seleted language details
  handleGetSelectedLanguageDetails() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetSelectedLanguageDetails",
      headers: authHeader(),
    })
      .then((response) => {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        var languageData = [];
        if (message === "Success" && responseData) {
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
        console.log(response, "---handleGetSelectedLanguageDetails");
      });
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
                          className={
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

                {/* <button class="langbtn" value="hindi">
                  हिन्दी
                </button>
                <button class="langbtn" value="marathi">
                  मराठी
                </button>
                <button class="langbtn" value="punjabi">
                  ਪੰਜਾਬੀ
                </button>
                <button class="langbtn" value="gujrati">
                  ગુજરાતી
                </button>
                <button class="langbtn" value="telugu">
                  తెలుగు
                </button> */}
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

export default LanguageSelection;
