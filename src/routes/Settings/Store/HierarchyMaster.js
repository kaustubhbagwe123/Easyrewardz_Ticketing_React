import Demo from "./../../../store/Hashtag.js";
import React, { Component } from "react";

class HierarchyMaster extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href={Demo.BLANK_LINK}>Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Store</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            Hierarchy Master
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default HierarchyMaster;
