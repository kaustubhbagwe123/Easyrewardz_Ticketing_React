import React, { Component } from "react";
import logo from "../../assets/Images/logo.jpg";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../../helpers/encryption";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import config from "../../helpers/config";

class StoreProgramCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programCode: "",
      encProgramCode: {
        programCode: "",
      },
    };
    this.validator = new SimpleReactValidator();
  }

  hanleChange(e) {
    e.preventDefault();
    debugger
    let self = this;
    if (this.validator.allValid()) {
      const { programCode } = this.state;
      var encProgramCode = encryption(programCode, "enc");
      let X_Authorized_Domainname = encryption(
        "https://multitenancyshopster.dcdev.brainvire.net",
        "enc"
      );
      // let X_Authorized_Domainname = encryption(
      //   "https://erbelltkthomeshop.dcdev.brainvire.net",
      //   "enc"
      // );
    //  let X_Authorized_Domainname = encryption(window.location.origin, "enc");
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
          debugger;
          let Msg = res.data.statusCode;
          if (Msg === 200) {
            setTimeout(function() {
              self.props.history.push({
                pathname: "storeSignIn",
                encProgramCode: encProgramCode,
              });
            }, 500);
            
            self.setState({
              encProgramCode: { programCode: encProgramCode },
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
  handleProgramCode = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="auth-wrapper box-center">
        <NotificationContainer></NotificationContainer>
        <div className="auth-content">
          <div className="card programcode-card-new">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <h3 className="sign-in">SIGN IN</h3>
              <form name="form" onSubmit={this.hanleChange.bind(this)}>
                <div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StoreProgramCode;
