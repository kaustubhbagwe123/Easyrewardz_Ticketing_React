import React, { Component } from "react";
import Logo from "./../../assets/Images/logo.jpg";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import config from "../../helpers/config";
import { NotificationManager } from "react-notifications";
import ShopSter from "./../../assets/Images/Shopster.png";
import RightBlue from "./../../assets/Images/blueRight.svg";

class LanguageSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "",
      languageData: [],
      isMobileView: false,
    };
  }
  componentDidMount() {
    this.handleGetSelectedLanguageDetails();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: window.innerWidth <= 760 });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  ////handle crm role
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
            var isCallStorePayAPI = false;
            for (var i = 0; i <= data.length; i++) {
              if (i === data.length) {
                if (isCallStorePayAPI) {
                  self.handleGenerateStorePayLink();
                } else {
                  NotificationManager.error(
                    "You don't have any sufficient page access. Please contact administrator for access.",
                    "",
                    2000
                  );
                }
                self.props.history.push("/store/nomodulefound");
                self.setState({
                  loading: false,
                });
              }
              // else
              if (
                data[i].moduleName === "Dashboard" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/storedashboard");
                return;
              }
              // else
              if (
                data[i].moduleName === "Tasks" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/StoreTask");
                return;
              }
              // else
              if (
                data[i].moduleName === "Claim" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/claim");
                return;
              }
              // else
              if (
                data[i].moduleName === "Campaign" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/campaign");
                return;
              }
              //  else
              if (
                data[i].moduleName === "Appointment" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/appointment");
                return;
              }
              // else
              if (
                data[i].moduleName === "MyTicket" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/myTicketList");
                return;
              }
              //  else
              if (
                data[i].moduleName === "Orders" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/orders");
                return;
              }
              //else
              if (
                data[i].moduleName === "Chat" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push({
                  pathname: "/store/Chatbot",
                  state: {
                    programCode: res.data.responseData.programCode,
                    storeCode: res.data.responseData.storeCode,
                    agentId: res.data.responseData.userID,
                    tenantID: res.data.responseData.tenantID,
                    UserName: res.data.responseData.agentName,
                  },
                });
                return;
              }
              // else
              if (
                data[i].moduleName === "Settings" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("/store/settings");
                return;
              }
              // else
              if (
                data[i].moduleName === "StorePay" &&
                data[i].modulestatus === true
              ) {
                isCallStorePayAPI = true;
              }
            }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////handle genrate store pay link
  handleGenerateStorePayLink = () => {
    axios({
      method: "post",
      url: config.apiUrl + "/StorePay/GenerateStorePayLink",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var storePayURL = response.data.responseData;
        if (message === "Success" && storePayURL) {
          // self.setState({ storePayURL });
          window.location.href = storePayURL;
        } else {
          // window.location = "http://www.google.com/";
        }
      })
      .catch((response) => {
        console.log(response, "---handleGenerateStorePayLink");
      });
  };
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
      <div className="auth-wrapper box-center Mainpro">
        <div className="Shopster">
          <img src={ShopSter} alt="ShopSter" className="" />
        </div>
        <h3 className="logintxt">Select Language</h3>
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              {!this.state.isMobileView ? (
                <div className="mb-4">
                  <img
                    src={Logo}
                    alt="logo"
                    className="main-logo initial-logo logohi"
                  />
                </div>
              ) : null}
              {!this.state.isMobileView ? (
                <label
                  className="sign-in"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Choose Language
                </label>
              ) : (
                <label
                  className="sign-in"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Choose One Language
                </label>
              )}
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
                          {item.language.split(" ")[0].toLowerCase() ===
                            this.state.language && this.state.isMobileView ? (
                            <img src={RightBlue} style={{ float: "right" }} />
                          ) : null}
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

export default LanguageSelection;
