import React, { Component } from "react";
import logo from "../assets/Images/logo.jpg";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../helpers/encryption";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";

class ProgramCodeSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programCode: "",
      encProgramCode: {
        programCode: "",
      },
      btnDisabled: false,
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    // localStorage.clear();
    var _token = window.localStorage.getItem("token");
    if (_token !== null) {
      this.handleCRMRole();
    } else {
      return false;
    }
  }

  hanleChange(e) {
    e.preventDefault();
    let self = this;
    if (this.validator.allValid()) {
      this.setState({
        btnDisabled: true,
      });
      const { programCode } = this.state;
      var encProgramCode = encryption(programCode, "enc");
      // let X_Authorized_Domainname = encryption(
      //   "https://qa-ui-belltktqa.shopster.live",
      //   "enc"
      // );
      // let X_Authorized_Domainname = encryption('https://bell.ercx.co', "enc");
      let X_Authorized_Domainname = encryption(window.location.origin, "enc");
      let X_Authorized_Programcode = encProgramCode;

      axios({
        method: "get",
        url: config.apiUrl + "/Account/validateprogramcode",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Authorized-Programcode": X_Authorized_Programcode,
          "X-Authorized-Domainname": X_Authorized_Domainname,
        },
      }).then(function(res) {
        let Msg = res.data.statusCode;
        if (Msg === 200) {
          setTimeout(function() {
            self.props.history.push({
              pathname: "SignIn",
              encProgramCode: encProgramCode,
            });
          }, 500);
          self.setState({
            encProgramCode: { programCode: encProgramCode },
            btnDisabled: false,
          });
        } else {
          NotificationManager.error(
            "Please enter valid program code.",
            "",
            1500
          );
          self.setState({
            btnDisabled: false,
          });
        }
      });
      // this.props.history.push("SignIn");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

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

  handleProgramCode = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleActiveStatus = (e) => {
    let value = e.target.value;
    this.setState({ selectedActiveStatus: value });
  };

  render() {
    return (
      <div className="auth-wrapper box-center">
        <NotificationContainer></NotificationContainer>
        <div className="auth-content">
          <div className="card programcode-card-new">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} className="initial-logo" alt="logo" />
              </div>
              <h3 className="sign-in">SIGN IN</h3>
              <form name="form" onSubmit={this.hanleChange.bind(this)}>
                <div>
                  <input
                    type="text"
                    className="program-code-textbox"
                    placeholder="Program Code*"
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
                  disabled={this.state.btnDisabled}
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgramCodeSignIn;
