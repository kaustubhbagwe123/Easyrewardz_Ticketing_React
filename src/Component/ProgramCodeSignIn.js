import React, { Component } from "react";
// import '../assets/css/style.css'
import logo from "../assets/Images/logo.jpg";
import SimpleReactValidator from "simple-react-validator";
import { encryption } from "../helpers/encryption";

class ProgramCodeSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programCode: "",
      encProgramCode: {
        programCode: ""
      }
    };
    this.validator = new SimpleReactValidator();
  }

  hanleChange(e){
    e.preventDefault();
    debugger
    let self=this;
    if (this.validator.allValid()) {
      const{programCode}=this.state;
      var encProgramCode=encryption(programCode, "enc");
      // this.props.history.push("SignIn");
      setTimeout(function() {
        self.props.history.push({
          pathname: "SignIn",
          encProgramCode: encProgramCode
        });
      }, 500);
      self.setState({
        encProgramCode: {programCode: encProgramCode}
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  handleProgramCode = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
              <form name="form" onSubmit={this.hanleChange.bind(this)}>
                <div>
               
                  <input
                    type="text"
                    className="program-code-textbox"
                    placeholder="Program Code*"
                    style={{ border: 0 }}
                    name="programCode"
                    maxLength={10}
                    value={this.state.programCode}
                    onChange={this.handleProgramCode}
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
export default ProgramCodeSignIn;
