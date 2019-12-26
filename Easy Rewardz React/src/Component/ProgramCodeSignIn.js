import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from "../assets/Images/logo.jpg";
import SimpleReactValidator from "simple-react-validator";

class ProgramCodeSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programCode: ""
    };
    this.validator = new SimpleReactValidator();
  }

  hanleChange = () => {
    if (this.validator.allValid()) {
      this.props.history.push("SignIn");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };
  handleProgramCode = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  // componentDidMount() {
  //   document.querySelectorAll(".card-Nav")[0].style.display = "none";
  // }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="card programcode-card-new">
            <div className="card-body text-center">
              <div className="mb-4">
                <img src={logo} style={{ width: "210px" }} alt="logo" />
              </div>
              <h3 className="sign-in">SIGN IN</h3>
              <div>
                <input
                  type="email"
                  className="program-code-textbox"
                  placeholder="Program Code*"
                  style={{ border: 0 }}
                  onChange={this.handleProgramCode}
                  name="programCode"
                />
                {this.validator.message(
                  "Program Code",
                  this.state.programCode,
                  "required"
                )}
              </div>
              <br />
              <button
                type="button"
                className="program-code-button"
                onClick={this.hanleChange}
              >
                SUBMIT
                {/* <label className="program-code-button-text"></label> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgramCodeSignIn;
