import React, { Component } from "react";
import axios from "axios";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
class CheckService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storePinCode: "",
      pin_code: "",
      pinCodeValidation: "",
      translateLanguage: {},
      btnSubmitData: false,
    };
  }

  componentDidMount() {
    this.handleGetCheckServiceData();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
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
  handleUpdateCheckServiceData() {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    if (this.state.pin_code !== "") {
      this.setState({
        btnSubmitData: true,
      });
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
          let status = res.data.responseData.available;
          if (status === "true") {
            NotificationManager.success(TranslationContext!==undefined?TranslationContext.alertmessage.deliveryavailable:"Delivery Available.");
            self.setState({
              btnSubmitData: false,
            });
          } else {
            NotificationManager.error(TranslationContext!==undefined?TranslationContext.alertmessage.servicenotavailableonenteredpincode:"Service not available on entered Pincode.");
            self.setState({
              btnSubmitData: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      self.setState({
        pinCodeValidation: "Please Enter Pin Code",
      });
    }
  }
  /// handle Text onchage
  handleTextOnchange = (e) => {
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        <div className="check-svr">
          <div className="row m-b-10 mx-0">
            <div className="col-5">
              <label className="naman">
                {TranslationContext !== undefined
                  ? TranslationContext.label.storepincode
                  : "Store Pin Code"}
              </label>
            </div>
            <div className="col-md-6 col-7">
              <input
                type="text"
                className="txt-1"
                placeholder="Store PIN Code"
                value={this.state.storePinCode}
                disabled
              />
            </div>
          </div>
          <div className="row mx-0">
            <div className="col-5">
              <label className="naman">
                {TranslationContext !== undefined
                  ? TranslationContext.label.enterpincode
                  : "Enter Pin Code"}
              </label>
            </div>
            <div className="col-md-6 col-7">
              <input
                type="text"
                className="txt-1"
                placeholder={
                  TranslationContext !== undefined
                    ? TranslationContext.label.pincode
                    : "PIN Code"
                }
                name="pin_code"
                value={this.state.pin_code}
                maxLength={6}
                autoComplete="off"
                onChange={this.handleTextOnchange}
              />
              {this.state.pin_code === "" && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "0px",
                  }}
                >
                  {this.state.pinCodeValidation}
                </p>
              )}
            </div>
          </div>

          <button
            className={
              this.state.btnSubmitData
                ? "check-svcBtn order-grid-btn-disable"
                : "check-svcBtn"
            }
            onClick={this.handleUpdateCheckServiceData.bind(this)}
          >
            {TranslationContext !== undefined
              ? TranslationContext.button.submit
              : "Submit"}
          </button>
        </div>
      </>
    );
  }
}

export default CheckService;
