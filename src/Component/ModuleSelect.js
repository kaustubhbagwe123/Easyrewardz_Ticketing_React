import React, { Component } from "react";
import logo from "../assets/Images/logo.jpg";
import { Link } from "react-router-dom";

class ModuleSelect extends Component {
  render() {
    return (
      <div className="auth-wrapper box-center">
        <div className="auth-content">
          <div className="card programcode-card-new">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>

              <br />
              <Link to={"/ProgramCodeSignIn"}>
                <button type="button" className="program-code-button" style={{marginBottom:"20px"}}>
                  TICKET
                </button>
              </Link>
              <br />
              <Link to={"/StoreProgramCode"}>
                <button type="button" className="program-code-button" style={{marginBottom:"20px"}}>
                  STORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModuleSelect;
