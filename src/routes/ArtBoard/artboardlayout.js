import React, { Component } from "react";
import ArtBoardHeader from "./ArtBoardHeader";
import Aux from "./../../Component/child";

export default class artboardlayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Aux>
        <ArtBoardHeader />
        <div className="main-content" style={{backgroundColor:"#f3f3f3"}}>{children}</div>
      </Aux>
    );
  }
}