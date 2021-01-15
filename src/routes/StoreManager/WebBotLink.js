import React, { Component } from "react";
import { Select } from "antd";
import config from "../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationManager } from "react-notifications";

const { Option } = Select;
class WebBotLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WebBotData: [],
      orderIdData: [],
      selectedWebBot: undefined,
      OptionMode: 0,
      showSendBtn: false,
      ShopingNoSelected: 0,
      OrdIdsSelected: 0,
      countryCode: [],
      mobileNo: "",
      custNameValidation: "",
      mobileNoValidation: "",
      countryCodeValidation: "",
      ordIdValidation: "",
      selectedCountryCode: 0,
      customerName: "",
      addSaveLoading: false,
      wabaNoData: [],
      WABANoSelected: null,
      wabaNoValidation: "",
    };
  }
  componentDidMount() {
    this.handleGetWebBotOption();
  }
  /// handle id selct
  handleIdSelection = (value) => {
    this.setState({
      selectedWebBot: value,
      OptionMode: 0,
      custNameValidation: "",
      mobileNoValidation: "",
      countryCodeValidation: "",
      ordIdValidation: "",
      wabaNoData: [],
      WABANoSelected: null,
      wabaNoValidation: "",
      selectedCountryCode: 0,
    });
    this.handleGetWebBotFilterByOptionID(value);
  };

  handleNextData() {
    this.setState({
      OptionMode: this.state.selectedWebBot,
      showSendBtn: true,
    });
  }
  //handle get web bot select option data
  handleGetWebBotOption = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/WebBot/GetWebBotOption",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.setState({ WebBotData: responseData });
        } else {
          self.setState({ WebBotData: [] });
        }
      })
      .catch((error) => {
        console.log(error, "----handleGetWebBotOption");
      });
  };
  //handle get webbot filter by option id
  handleGetWebBotFilterByOptionID = (optionId) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/WebBot/GetWebBotFilterByOptionID",
      headers: authHeader(),
      params: { OptionID: optionId },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          if (optionId === 1 || optionId === 2) {
            self.setState({
              countryCode: responseData.webBotFilter,
              wabaNoData: responseData.webBotFilterDataList,
            });
            if (responseData.webBotFilterDataList.length === 1) {
              self.setState({
                WABANoSelected: responseData.webBotFilterDataList[0].wabaNo,
              });
            }
          } else {
            self.setState({
              orderIdData: responseData.webBotFilter,
              wabaNoData: responseData.webBotFilterDataList,
            });
            if (responseData.webBotFilterDataList.length === 1) {
              self.setState({
                WABANoSelected: responseData.webBotFilterDataList[0].wabaNo,
              });
            }
          }
        } else {
          if (optionId === 1 || optionId === 2) {
            self.setState({ countryCode: [], wabaNoData: [] });
          } else {
            self.setState({
              orderIdData: [],
              wabaNoData: [],
            });
          }
        }
      })
      .catch((error) => {
        console.log(error, "----GetWebBotFilterByOptionID");
      });
  };
  handleCheckFinalData() {
    if (this.state.OptionMode === 1 || this.state.OptionMode === 2) {
      if (
        this.state.customerName !== "" &&
        this.state.selectedCountryCode > 0 &&
        this.state.mobileNo !== "" &&
        this.state.WABANoSelected
      ) {
        this.handleFinalSendData();
      } else {
        this.setState({
          custNameValidation: "Please Enter Customer Name.",
          mobileNoValidation: "Please Enter Mobile No.",
          countryCodeValidation: "Please Select Country Code.",
          wabaNoValidation: "Please Select WABA No.",
        });
      }
    } else {
      if (this.state.ShopingNoSelected > 0 || this.state.OrdIdsSelected > 0) {
        this.handleFinalSendData();
      } else {
        this.setState({
          ordIdValidation: "Please Enter Id.",
        });
      }
    }
  }
  // handle final send data
  handleFinalSendData() {
    let self = this;
    this.setState({
      addSaveLoading: true,
    });
    var wabaNo = "";

    if (this.state.OptionMode === 3 || this.state.OptionMode === 4) {
      wabaNo = this.state.orderIdData.filter(
        (x) => x.shoppingID == this.state.ShopingNoSelected
      )[0].wabaNumber;
    } else if (this.state.OptionMode === 5) {
      wabaNo = this.state.orderIdData.filter(
        (x) => x.orderID == this.state.OrdIdsSelected
      )[0].wabaNumber;
    } else {
      wabaNo = this.state.WABANoSelected;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/WebBot/SendWebBotHSM",
      headers: authHeader(),
      data: {
        OptionID: this.state.OptionMode,
        CustomerName: this.state.customerName,
        MobileNo: this.state.selectedCountryCode + this.state.mobileNo,
        ShopingBagNo: this.state.ShopingNoSelected,
        OrderID: this.state.OrdIdsSelected,
        WABANo: wabaNo,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        self.setState({
          addSaveLoading: false,
          customerName: "",
          selectedCountryCode: 0,
          mobileNo: "",
          ShopingNoSelected: 0,
          OrdIdsSelected: 0,
          OptionMode: 0,
          selectedWebBot: undefined,
          showSendBtn: false,
          WABANoSelected: null,
        });
        if (message === "Success") {
          NotificationManager.success("HSM send successfully.");
        } else {
          self.setState({
            addSaveLoading: false,
          });
          if (data.errorMessage) {
            NotificationManager.error(data.errorMessage);
          }
        }
      })
      .catch((error) => {
        self.setState({
          addSaveLoading: false,
        });
        console.log(error);
      });
  }
  handleOrdIdsSelection = (value) => {
    if (this.state.OptionMode === 3 || this.state.OptionMode === 4) {
      this.setState({
        ShopingNoSelected: value,
      });
    } else {
      this.setState({
        OrdIdsSelected: value,
      });
    }
  };
  /// select country code change
  handleCountryCodeSelect = (value) => {
    this.setState({
      selectedCountryCode: value,
    });
  };
  /// mobile no validation
  handleMobileNoValidation = (e) => {
    var reg = /^[0-9\b]+$/;

    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ mobileNo: e.target.value });
    } else {
      e.target.value = "";
    }
  };
  //handle onchage waba no select
  handleWABANoSelect = (value) => {
    this.setState({
      WABANoSelected: value,
    });
  };
  render() {
    return (
      <>
        <div>
          <div className="row m-0">
            <div className="col-md-6 m-auto">
              <div className="right-sect-div minHeightlink m-t-20 heightMOb">
                <div className="createSpace">
                  <label className="create-department">
                    Please select options to send communication to customer
                  </label>

                  <div className="div-padding-1 webbotMob">
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Please Select Option"
                      optionFilterProp="children"
                      className="webBotDd"
                      onChange={this.handleIdSelection}
                      notFoundContent="No Data Found"
                      value={this.state.selectedWebBot}
                    >
                      {this.state.WebBotData !== null
                        ? this.state.WebBotData.map((item, i) =>
                            item.isActive ? (
                              <Option
                                key={i}
                                value={item.id}
                                className="webBotOpt"
                              >
                                {item.option}
                              </Option>
                            ) : null
                          )
                        : null}
                    </Select>
                  </div>
                  <div className="m-t-10 m-b-10">
                    <button
                      className="addBtn-ticket-hierarchy"
                      onClick={this.handleNextData.bind(this)}
                    >
                      <label className="pop-over-btnsave-text">Next</label>
                    </button>
                  </div>
                  {this.state.OptionMode === 1 ||
                  this.state.OptionMode === 2 ? (
                    <>
                      <div className="dropDrownSpace m-b-10">
                        <label className="webBotLbl wbLbl">Customer Name</label>
                        <input
                          className="form-control"
                          name="customername"
                          placeholder="Enter Customer Name"
                          maxLength={100}
                          autoComplete="off"
                          onChange={(e) =>
                            this.setState({ customerName: e.target.value })
                          }
                        />
                        {this.state.customerName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.custNameValidation}
                          </p>
                        )}
                      </div>
                      <div className="divSpace">
                        <div className="dropDrownSpace">
                          <label className="webBotLbl wbLbl">
                            Country Code
                          </label>
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Country Code"
                            optionFilterProp="children"
                            className="webBotDd"
                            onChange={this.handleCountryCodeSelect}
                            notFoundContent="No Data Found"
                          >
                            {this.state.countryCode.length > 0
                              ? this.state.countryCode.map((item, i) => {
                                  return (
                                    <Option
                                      id={i}
                                      value={item.phoneCode}
                                      className="webBotOpt"
                                    >
                                      {item.phoneCode}
                                      {" (" + item.iso + ")"}
                                    </Option>
                                  );
                                })
                              : null}
                          </Select>
                          {this.state.selectedCountryCode === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.countryCodeValidation}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="dropDrownSpace">
                        <label className="webBotLbl wbLbl">Mobile No</label>
                        <input
                          className="form-control"
                          name="mobileNo"
                          placeholder="Enter Mobile no"
                          value={this.state.mobileNo}
                          onChange={this.handleMobileNoValidation}
                          autoComplete="off"
                        />
                        {this.state.mobileNo.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mobileNoValidation}
                          </p>
                        )}
                      </div>
                      <div className="divSpace">
                        <div className="dropDrownSpace">
                          <label className="webBotLbl wbLbl">WABA No</label>
                          {this.state.wabaNoData.length === 1 ? (
                            <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="Select WABA No"
                              optionFilterProp="children"
                              className="webBotDd"
                              onChange={this.handleWABANoSelect}
                              notFoundContent="No Data Found"
                              value={this.state.WABANoSelected}
                              disabled={
                                this.state.wabaNoData.length === 1
                                  ? true
                                  : false
                              }
                            >
                              {this.state.wabaNoData.length > 0
                                ? this.state.wabaNoData.map((item, i) => {
                                    return (
                                      <Option
                                        id={i}
                                        value={item.wabaNo}
                                        className="webBotOpt"
                                      >
                                        {item.wabaNo}
                                      </Option>
                                    );
                                  })
                                : null}
                            </Select>
                          ) : null}
                          {this.state.wabaNoData.length === 0 ||
                          this.state.wabaNoData.length > 1 ? (
                            <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="Select WABA No"
                              optionFilterProp="children"
                              className="webBotDd"
                              onChange={this.handleWABANoSelect}
                              notFoundContent="No Data Found"
                            >
                              {this.state.wabaNoData.length > 0
                                ? this.state.wabaNoData.map((item, i) => {
                                    return (
                                      <Option
                                        id={i}
                                        value={item.wabaNo}
                                        className="webBotOpt"
                                      >
                                        {item.wabaNo}
                                      </Option>
                                    );
                                  })
                                : null}
                            </Select>
                          ) : null}
                          {this.state.WABANoSelected === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.wabaNoValidation}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}

                  {this.state.OptionMode === 3 ||
                  this.state.OptionMode === 4 ||
                  this.state.OptionMode === 5 ? (
                    <div className="dropDrownSpace">
                      <label className="webBotLbl wbLbl">
                        {this.state.OptionMode === 5
                          ? "Order Id"
                          : "Shopping Bag Id"}
                      </label>
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder={
                          this.state.OptionMode === 5
                            ? "Select Order Id"
                            : "Select Shopping Bag Id"
                        }
                        optionFilterProp="children"
                        className="webBotDd"
                        onChange={this.handleOrdIdsSelection}
                        notFoundContent="No Data Found"
                      >
                        {this.state.orderIdData !== null
                          ? this.state.orderIdData.map((item, o) => (
                              <Option
                                key={o}
                                value={
                                  this.state.OptionMode === 3 ||
                                  this.state.OptionMode === 4
                                    ? item.shoppingID
                                    : this.state.OptionMode === 5
                                    ? item.orderID
                                    : null
                                }
                                className="webBotOpt"
                              >
                                {this.state.OptionMode === 3 ||
                                this.state.OptionMode === 4
                                  ? item.shoppingBagNo +
                                    " " +
                                    "(" +
                                    item.mobileNumber +
                                    ")"
                                  : this.state.OptionMode === 5
                                  ? item.orderID +
                                    " " +
                                    "(" +
                                    item.mobileNumber +
                                    ")"
                                  : null}
                              </Option>
                            ))
                          : null}
                      </Select>
                      {this.state.ShopingNoSelected === 0 &&
                        (this.state.OrdIdsSelected === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.ordIdValidation}
                          </p>
                        ))}
                    </div>
                  ) : null}

                  {this.state.OptionMode > 0 ? (
                    <div className="m-t-25">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.handleCheckFinalData.bind(this)}
                      >
                        <label className="pop-over-btnsave-text">
                          {this.state.addSaveLoading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                            ""
                          )}
                          Send
                        </label>
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebBotLink;
