import React, { Component } from "react";
import Header from "./Header";
import Aux from "./child";

export default class layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Aux>
        <Header />
        <div className="main-content" style={{ backgroundColor: "#f5f8f9" }}>
          {children}
        </div>
      </Aux>
    );
  }
}
 