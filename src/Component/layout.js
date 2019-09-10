import React, { Component } from "react";
import Header from "./Header";
import Aux from "./Aux";

export default class layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Aux>
        <Header />
        <div className="main-content">{children}</div>
      </Aux>
    );
  }
}
