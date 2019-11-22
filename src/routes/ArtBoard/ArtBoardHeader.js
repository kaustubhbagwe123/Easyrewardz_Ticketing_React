import React, { Component, Fragment } from "react";
import Headerlogo from './../../assets/Images/logo.jpg'
import { Link } from "react-router-dom";

class ArtBoardheader extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <div className="header-sec">
            <nav className="navbar navbar-expand-md navbar-dark">
              {/* <Link className="logo" to="#!"> */}
                <img src={Headerlogo} style={{ width: "150px" }} alt="logo" />
              {/* </Link> */}

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Features
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Pricing
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/artBoard/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link request-demo-btn" to="#">
                      Request a Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      </Fragment>
    );
  }
}

export default ArtBoardheader;
