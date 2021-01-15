import React, { Component } from "react";
import logo from "../../assets/Images/logo.jpg";
import ShopSter from "./../../assets/Images/Shopster.png";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../../helpers/encryption";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import { Spin } from "antd";

class StoreProgramCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programCode: "",
      encProgramCode: {
        programCode: "",
      },
      isToken: false,
      isMobileView: false,
      profilPicURL: "",
      firstName: "",
      lastName: "",
      designationName: "",
      isLoading: false,
    };
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    // localStorage.clear();
    var _token = window.localStorage.getItem("token");
    if (_token !== null) {
      var UserData = JSON.parse(window.localStorage.getItem("UserData"));
      var UserProfile = JSON.parse(window.localStorage.getItem("UserProfile"));
      if (UserData) {
        var profilPicURL = UserData.profilePicture;
        var lastName = UserData.lastName;
        var firstName = UserData.firstName;
        var designationName = UserData.designationName;
        var programCode = UserProfile.programCode;
        this.setState({
          designationName,
          firstName,
          lastName,
          profilPicURL,
          programCode,
          isToken: true,
          isLoading: true,
        });
      }

      
        this.handleCRMRole();
      
    } else {
      return false;
    }
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: window.innerWidth <= 760 });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  /// handle change
  hanleChange(e) {
    e.preventDefault();

    let self = this;
    if (this.validator.allValid()) {
      const { programCode } = this.state;
      var encProgramCode = encryption(programCode, "enc");
      // let X_Authorized_Domainname = encryption(
      //   "https://multitenancyshopsterv2.dcdev.brainvire.net",
      //   "enc"
      // );
      // let X_Authorized_Domainname = encryption(
      //   "https://qa-ui.shopster.live",
      //   "enc"
      // );
      // let X_Authorized_Domainname = encryption(
      //   "https://qa-ui-belltktqa.shopster.live",
      //   "enc"
      // );
      // let X_Authorized_Domainname = encryption(
      //   "http://www.shopster.live",
      //   "enc"
      // );
      let X_Authorized_Domainname = encryption(window.location.origin, "enc");
      let X_Authorized_Programcode = encProgramCode;

      // validate program code
      axios({
        method: "get",
        url: config.apiUrl + "/StoreAccount/validateprogramcode",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Authorized-Programcode": X_Authorized_Programcode,
          "X-Authorized-Domainname": X_Authorized_Domainname,
        },
      })
        .then(function(res) {
          let Msg = res.data.statusCode;
          if (Msg === 200) {
            setTimeout(function() {
              self.props.history.push({
                pathname: "storeSignIn",
                encProgramCode: encProgramCode,
              });
            }, 500);

            self.setState({
              encProgramCode: {
                programCode: encProgramCode,
              },
            });
          } else {
            NotificationManager.error(
              "Please enter valid program code.",
              "",
              1500
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
      // this.props.history.push("SignIn");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
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
          self.setState({ isLoading: false });
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
              //  else
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
  handleProgramCode = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="auth-wrapper box-center Mainpro">
        <NotificationContainer></NotificationContainer>
        <div className="Shopster">
          <img src={ShopSter} alt="ShopSter" className="" />
        </div>
        <h3 className="logintxt">
          {this.state.isMobileView
            ? this.state.isToken
              ? "welcome back, " + this.state.firstName + " !"
              : "Log in"
            : "Log in"}
        </h3>
        <div className="auth-content">
          <div className="card programcode-card-new">
            <div className="card-body text-center">
              {this.state.isMobileView && this.state.isToken ? (
                <div>
                  <div>
                    {this.state.profilPicURL ? (
                      <img
                        src={this.state.profilPicURL}
                        className="programcodepgnimg"
                      />
                    ) : null}
                    <h4>{this.state.firstName + " " + this.state.lastName}</h4>
                    <h5>{this.state.designationName}</h5>
                    <h6>{this.state.programCode}</h6>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 logohi">
                    <img src={logo} className="initial-logo" alt="logo" />
                  </div>
                  <h3 className="sign-in">SIGN IN</h3>
                  <form name="form" onSubmit={this.hanleChange.bind(this)}>
                    <div className="mb-3">
                      <label className="stprocode">Store Program Code</label>
                      <input
                        type="text"
                        className="program-code-textbox"
                        placeholder="Store Program Code*"
                        style={{ border: 0 }}
                        name="programCode"
                        maxLength={100}
                        value={this.state.programCode}
                        onChange={this.handleProgramCode}
                        autoComplete="off"
                      />
                      {this.validator.message(
                        "Program Code",
                        this.state.programCode,
                        "required"
                      )}
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="program-code-button"
                      // onClick={this.hanleChange}
                    >
                      SUBMIT
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        {this.state.isMobileView &&
        this.state.isToken &&
        this.state.isLoading ? (
          <div className="programcodepgnldr">
            <br />
            <br />
            <Spin wrapperClassName="programcodepgnldr" tip="Loading..."></Spin>
          </div>
        ) : null}
      </div>
    );
  }
}
export default StoreProgramCode;
