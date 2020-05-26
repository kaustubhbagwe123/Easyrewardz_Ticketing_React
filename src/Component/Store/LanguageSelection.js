import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import Logo from "./../../assets/Images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class LanguageSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
              <label className="sign-in" style={{fontSize: "16px",fontWeight: "bold"}}>Choose Language</label>
              <div className="languagebox">
                <button class="langbtn active">English</button>
                <button class="langbtn">हिन्दी</button>
                <button class="langbtn">मराठी</button>
                <button class="langbtn">ਪੰਜਾਬੀ</button>
                <button class="langbtn">ગુજરાતી</button>
                <button class="langbtn">తెలుగు</button>
              </div>
              <button type="submit" className="program-code-button">
                Continue
              </button>
              <p className="skip">Skip</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LanguageSelection;
