import React, { Component } from "react";
import Header from "./store-header";
import StoreFooter from "./store-footer";
import Aux from "./../../Component/child";

export default class storelayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Aux>
        <Header />
        <div className="main-content" style={{backgroundColor:"#f5f8f9"}}>{children}</div>
        <StoreFooter />
      </Aux>
    );
  }
}