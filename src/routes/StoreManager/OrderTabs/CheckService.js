import React, { Component } from "react";

class CheckService extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="check-svr">
          <div className="row m-b-10">
            <div className="col-md-5">
              <label className="">Store Pin Code</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="txt-1"
                placeholder="Store PIN Code"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <label className="">Enter Pin Code</label>
            </div>
            <div className="col-md-6">
              <input type="text" className="txt-1" placeholder="PIN Code" />
            </div>
          </div>

          <button class="check-svcBtn">Submit</button>
        </div>
      </>
    );
  }
}

export default CheckService;
