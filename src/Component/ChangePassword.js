import React, { Component } from 'react';
import logo from "../assets/Images/logo.jpg";
// import {Link} from 'react-router-dom'

export class ChangePassword extends Component {
    render() {
        return (
            <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card forgotpass-card changepass-card" style={{height:"500px"}}>
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <h3 className="m-0" style={{ textAlign: "left" }}>
                  <label
                    className="col-mb-3 col-form-label col-form-label p-0 forgot-pass-text"
                    style={{ fontWeight: "300" }}
                  >
                    CHANGE PASSWORD
                  </label>
                </h3>
              </div>
              <div className="input-group sb-2">
                <label
                  className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                  Enter New Password
                </label>
              </div>
              <div className="input-group mb-3">
                <input type="password" placeholder="Enter New Password" className="program-code-textbox" />
              </div>
              <div className="input-group sb-2">
                <label
                  className="col-mb-3 col-form-label col-form-label pt-0 chpass">
                  Enter Confirm Password
                </label>
              </div>
              <div className="input-group mb-3">
                <input type="password" placeholder="Enter Confirm Password" className="program-code-textbox" />
              </div>
              <div className="input-group mb-3">
                <button
                  type="button"
                  className="program-code-button"
                  title=""
                  data-toggle="tooltip"
                  data-original-title="btn btn-primary"
                >SET PASSWORD
                {/* <label className="program-code-button-text">SET PASSWORD</label>   */}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default ChangePassword
