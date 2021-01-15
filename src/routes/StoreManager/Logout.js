import React, { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileView: false,
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    setTimeout(() => {
      this.handleMobileLogOut();
    }, 3000);
  }
  /// check mobile size
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: true });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  /// handle mobile logout
  handleMobileLogOut() {
    localStorage.clear();
    this.props.history.push("/")
  }
  render() {
    return (
      <div className="storeLogOut">
        {this.state.isMobileView ? (
          <div>
            <label>You have successfully logged out.</label>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Logout;
