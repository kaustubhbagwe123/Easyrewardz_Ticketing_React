import React, { Component } from "react";

export class layout extends Component {
  render() {
    const { props } = this.props;
    return (
      <>
        <div>Header</div>
        {props}
        <div>Footer</div>
      </>
    );
  }
}

export default layout;
