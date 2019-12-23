import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../assets/css/custome.css";
import Logo from "./../assets/Images/logo.jpg";
import { Link } from "react-router-dom";
// import { encryption } from "../helpers/encryption";
import axios from "axios";
import config from "../helpers/config";
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
    let self = this;
    const { emailID, password } = this.state;
    // let X_Authorized_userId = encryption(emailID, "enc");
    // let X_Authorized_password = encryption(password, "enc");
     let X_Authorized_userId = emailID;
    let X_Authorized_password = password;
    let X_Authorized_Domainname = "voliqaC/GVZrMPMiNdEMcDbNfN8hVKjSX6awi0r1SzY=";
    let X_Authorized_Programcode = "Aj3zce2TzWs=";
    let X_Authorized_applicationid = "jT5O3HHf34vv7C71OZxNXQ==";

    if (X_Authorized_userId !== "" && X_Authorized_password !== "") {
       
      // axios.post(config.apiUrl + "/Account/authenticate", requestOptions)
        // axios.post({
        //   method: "POST",
        //   url: `${config.apiUrl}/Account/authenticate`,
        //   data: {
        //     X_Authorized_Programcode: programCode,
        //           X_Authorized_Domainname: domainName,
        //           X_Authorized_applicationid: AppId,
        //           X_Authorized_userId: EncryptEmail,
        //           X_Authorized_password: EncryptPass
        //   },
        //   headers: authHeader("no")
        // })
        // const requestOptions = {
        //     header: authHeader("no"),
        //     body: ''
        // };
        // axios.post(
        //   config.apiUrl + "/Testing/Authenticate",
        //   requestOptions,
        //   {
        //     params: {
        //       X_Authorized_Programcode: programCode,
        //       X_Authorized_Domainname: domainName,
        //       X_Authorized_applicationid: AppId,
        //       X_Authorized_userId: EncryptEmail,
        //       X_Authorized_password: EncryptPass
        //     }
        //   }
        // )
       
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
        .then(function(response) {
          debugger;
          let BrandData = response;
          self.setState({ BrandData: BrandData }); 
        });
    }
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
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
