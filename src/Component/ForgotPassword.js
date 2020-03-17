import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from "../assets/Images/logo.jpg";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import axios from "axios";
import config from "../helpers/config";
import SimpleReactValidator from "simple-react-validator";
import { authHeader } from "../helpers/authHeader";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }
  handleSubmit(event) {
    event.preventDefault();
    debugger;
  
    if (this.validator.allValid()) {
     
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Account/ForgetPassword",
        headers: authHeader("no"),
        params: {
          EmailId: this.state.emailId
        }
      }).then(function(res) {
        debugger;
        let SearchData = res.data.responseData;
        if(res.data.statusCode===1001)
        {  
          NotificationManager.error(
          SearchData, '', 1250
         );
        }
        else if(res.data.statusCode===200)
        {
          NotificationManager.success(
            SearchData, '', 1250
           );
        }
        self.setState({ SearchData: SearchData });
      });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }
  hanleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="auth-wrapper box-center">
      <NotificationContainer></NotificationContainer>
        <div className="auth-content">
          <div className="card forgotpass-card">
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
                    FORGOT PASSWORD
                  </label>
                </h3>
              </div>
              <form name="form" onSubmit={this.handleSubmit}>
                <div className="input-group sb-2">
                  <label className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                    Enter Email ID
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="program-code-textbox"
                    name="emailId"
                    autoComplete="off"
                    value={this.state.emailId}
                    onChange={this.hanleChange.bind(this)}
                    maxLength={100}
                  />
                  {this.validator.message(
                    "Email Id",
                    this.state.emailId,
                    "required|email"
                  )}
                </div>
                <div className="input-group mb-3">
                  <button type="submit" className="program-code-button">
                    RECOVER PASSWORD
                  </button>
                </div>
              </form>

              <div style={{ paddingTop: "10px" }}>
                <p className="mb-0 text-muted">
                  <Link
                    to="SignIn"
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    TRY LOGIN AGAIN
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
export default ForgotPassword;
