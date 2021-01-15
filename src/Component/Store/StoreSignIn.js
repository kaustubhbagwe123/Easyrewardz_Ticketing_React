import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import Logo from "./../../assets/Images/logo.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import ShopSter from "./../../assets/Images/Shopster.png";
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
      isMobileView: false,
      emailIdValidation: "",
      passwordValidation: "",
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
    if (!e.target.value) {
      this.setState({ emailIdValidation: "Enter User ID." });
    }else{
      this.setState({emailIdValidation:""})
    }
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
    if (!e.target.value) {
      this.setState({ passwordValidation: "Enter Password." });
    }
  };

  componentDidMount() {
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
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: true });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.emailID) {
      this.setState({ emailIdValidation: "" });
    } else {
      this.setState({ emailIdValidation: "Enter User ID." });
    }
    if (this.state.password) {
      this.setState({ emailIdValidation: "" });
    } else {
      this.setState({ passwordValidation: "Enter Password." });
    }
    let self = this;
    if (this.state.emailID && this.state.password) {
      const { emailID, password } = this.state;
      var X_Authorized_userId = encryption(emailID, "enc");

      let X_Authorized_password = encryption(password, "enc");

      let X_Authorized_Devicesource = encryption(
        this.state.isMobileView ? "M" : "W",
        "enc"
      );
      let X_Authorized_Domainname = encryption(window.location.origin, "enc");
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
            "X-Authorized-FBID": "",
            "X-Authorized-DeviceID": "",
            "X-Authorized-Devicesource": X_Authorized_Devicesource,
          },
        })
          .then(function(res) {
            let resValid = res.data.message;
            self.setState({
              loading: true,
            });
            if (resValid === "Valid Login") {
              window.localStorage.setItem("token", res.data.responseData.token);
              window.localStorage.setItem("ERS", true);
              self.handleCRMRole();
              // self.props.history.push("languageSelection");
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
            var isCallStorePayAPI = false;
            for (var i = 0; i <= data.length; i++) {
              if (i === data.length) {
                if (isCallStorePayAPI) {
                  self.handleGenerateStorePayLink();
                } else {
                  // NotificationManager.error(
                  //   "You don't have any sufficient page access. Please contact administrator for access.",
                  //   "",
                  //   2000
                  // );
                  self.props.history.push("languageSelection");
                }

                self.setState({
                  loading: false,
                });
              } else if (
                data[i].moduleName === "Dashboard" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");
                return;
              } else if (
                data[i].moduleName === "Tasks" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");

                return;
              } else if (
                data[i].moduleName === "Claim" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");

                return;
              } else if (
                data[i].moduleName === "Campaign" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");

                return;
              } else if (
                data[i].moduleName === "Appointment" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");

                return;
              } else if (
                data[i].moduleName === "MyTicket" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");

                return;
              } else if (
                data[i].moduleName === "Orders" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push("languageSelection");

                return;
              } else if (
                data[i].moduleName === "StorePay" &&
                data[i].modulestatus === true
              ) {
                isCallStorePayAPI = true;
              }
            }

            // if (!isCallStorePayAPI) {
            //   self.handleGenerateStorePayLink();
            // }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////handle genrate store pay link
  handleGenerateStorePayLink = () => {
    let self = this;
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
  render() {
    return (
      <div className="auth-wrapper box-center Mainpro">
        <div className="Shopster">
          <img src={ShopSter} alt="ShopSter"/>
        </div>
        <h3 className="logintxt">Log in</h3>
        <div className="auth-content">
          <NotificationContainer />
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4 logohi">
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
                  <label className="stprocode">Enter User ID</label>
                  <input
                    type="text"
                    className="program-code-textbox"
                    placeholder="Enter User ID*"
                    name="emailID"
                    onChange={this.hanleChange}
                    value={this.state.emailId}
                    autoComplete="off"
                    maxLength={100}
                  />

                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.emailIdValidation}
                  </p>
                </div>
                <div className="input-group mb-3">
                  <label className="stprocode">Password</label>
                  <input
                    type="password"
                    className="program-code-textbox"
                    placeholder="Password*"
                    onChange={this.handlePasswordChange}
                    autoComplete="off"
                    maxLength={25}
                    value={this.state.password}
                  />
                  {this.state.password === "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.passwordValidation}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="program-code-button"
                  onClick={this.handleSubmit.bind(this)}
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
                  {this.state.loading ? "Please Wait..." : "LOGIN"}
                </button>
              </form>
              <div>
                <br />
                <p className="mb-0 text-muted forg">
                  <Link
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
