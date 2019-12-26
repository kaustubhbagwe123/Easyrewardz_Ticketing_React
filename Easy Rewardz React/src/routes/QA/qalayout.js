import React, { Component } from "react";
import Header from "./qa-header"
import Aux from "./../../Component/child";

export default class qalayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Aux>
        <Header />
        <div className="main-content" style={{backgroundColor:"#f5f8f9"}}>{children}</div>
      </Aux>
    );
  }
}
