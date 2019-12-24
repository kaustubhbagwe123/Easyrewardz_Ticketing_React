import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../assets/css/custome.css";
import Logo from "./../assets/Images/logo.jpg";
import { Link } from "react-router-dom";
import { encryption } from "../helpers/encryption";
import axios from "axios";
import config from "../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
// import { authHeader } from "../helpers/authHeader";
// import {config} from './../helpers';

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      password: ""
    };
    this.hanleChange = this.hanleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  hanleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // hanleChangePage = () => {
  //   this.props.history.push("/admin/dashboard");
  // };

  handleSubmit(event) {
    event.preventDefault()
    debugger;
    
    const { emailID, password } = this.state;
    var X_Authorized_userId = encryption(emailID, "enc");
    
    // let DescryptUserID=encryption(X_Authorized_userId, "desc");
    let X_Authorized_password = encryption(password, "enc");
    //  let X_Authorized_userId = emailID;
    // let X_Authorized_password = password;
    let X_Authorized_Domainname = "rZbZUcWTDjEk+qIvay9BFe/7Izx/T+YkIhbRa/mL0W0=";
    let X_Authorized_Programcode = "XDdjhgH1ixe3Rm70smc/jA==";
    let X_Authorized_applicationid = "lVWgnuY01lDMJBCSewbQ8g==";

    if (X_Authorized_userId !== null && X_Authorized_password !== null) {
      let self = this;
       
        const requestOptions = {
          // method: 'POST',
          mode:'cors',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "*"
          },
          // body:JSON.stringify({ EmailID, Password ,AppId})
          body: ""
        };
      axios.post(config.apiUrl + "/Account/authenticate", requestOptions,{ params:{
        X_Authorized_userId, 
        X_Authorized_password,
        X_Authorized_applicationid,
        X_Authorized_Programcode,
        X_Authorized_Domainname,}
      })
      // return fetch(config.apiUrl + '/Testing/Authenticate', requestOptions)
        .then(function(res) {
          debugger;
          let resValid = res.data.responseData.message;
          if(resValid === "Valid login")
          {
            NotificationManager.success("Login Successfull.");
            setTimeout(function() {
              // window.location.href = "Admin/dashboard";
              self.props.history.push("Admin/dashboard")
            }, 2000);
          }
          else{

          }
          
        });
    }
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
        <NotificationContainer />
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={Logo} alt="logo" style={{ width: "210px" }} />
              </div>
              <form name="form" onSubmit={this.handleSubmit}>
                <label className="sign-in">SIGN IN</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="program-code-textbox"
                    placeholder="Email ID*"
                    name="emailID"
                    onChange={this.hanleChange}
                    value={this.state.emailId}
                    autoComplete="off"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="program-code-textbox"
                    placeholder="Password*"
                    name="password"
                    onChange={this.hanleChange}
                    value={this.state.password}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="program-code-button"
                  // onClick={this.handleSubmit}
                >
                  LOGIN
                </button>
              </form>
              <div>
                <br />
                <p className="mb-0 text-muted">
                  <Link
                    to="Forgotpassword"
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

export default SingIn;
