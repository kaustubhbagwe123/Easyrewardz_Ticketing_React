import React, { Component } from "react";
import axios from "axios";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
class CheckService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storePinCode: "",
      pin_code: "",
    };
  }

  componentDidMount() {
    this.handleGetCheckServiceData();
  }

  /// handle Get Check service data
  handleGetCheckServiceData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetStorePinCodeByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            storePinCode: data,
          });
        } else {
          self.setState({
            storePinCode: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Submit Check service data
  handleGetCheckServiceData() {
    debugger;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/CheckCourierAvailibilty",
      headers: authHeader(),
      data: {
        Pickup_postcode: parseInt(this.state.storePinCode),
        Delivery_postcode: parseInt(this.state.pin_code),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Delivery Available.");
        } else {
          NotificationManager.success("Delivery Not Available.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Text onchage
  handleTextOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <div className="check-svr">
          <div className="row m-b-10">
            <div className="col-md-5">
              <label className="naman">Store Pin Code</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="txt-1"
                placeholder="Store PIN Code"
                value={this.state.storePinCode}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <label className="naman">Enter Pin Code</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="txt-1"
                placeholder="PIN Code"
                name="pin_code"
                value={this.state.pin_code}
                onChange={this.handleTextOnchange}
              />
            </div>
          </div>

          <button
            className="check-svcBtn"
            onClick={this.handleGetCheckServiceData.bind(this)}
          >
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default CheckService;
