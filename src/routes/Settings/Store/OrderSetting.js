import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

class OrderSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moduleConfigData: {},
      orderConfigData: {},
      selTab: "Module Configuration",
      translateLanguage: {},
    };
  }

  componentDidMount() {
    this.handleGetModuleConfigData();
    this.handleGetOrderConfigData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  handleGetModuleConfigData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetModuleConfiguration",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            moduleConfigData: data,
          });
        } else {
          self.setState({
            moduleConfigData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateModConfigData() {
    debugger;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateModuleConfiguration",
      headers: authHeader(),
      data: {
        ID: this.state.moduleConfigData.id,
        ShoppingBag: this.state.moduleConfigData.shoppingBag,
        Payment: this.state.moduleConfigData.payment,
        Shipment: this.state.moduleConfigData.shipment,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Module Updated Successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ModuleConfigFlagChange = (id) => {
    var ModuleConfig = id.target.id;
    if (ModuleConfig === "ckModconfigShoppBag") {
      this.state.moduleConfigData.shoppingBag = !this.state.moduleConfigData
        .shoppingBag;
    } else if (ModuleConfig === "ckModconfigPayment") {
      this.state.moduleConfigData.payment = !this.state.moduleConfigData
        .payment;
    } else if (ModuleConfig === "ckModconfigShipment") {
      this.state.moduleConfigData.shipment = !this.state.moduleConfigData
        .shipment;
    }

    this.setState({ moduleConfigData: this.state.moduleConfigData });
  };

  handleGetOrderConfigData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderConfiguration",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            orderConfigData: data,
          });
        } else {
          self.setState({
            orderConfigData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOrderConfigData() {
    debugger;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateOrderConfiguration",
      headers: authHeader(),
      data: {
        ID: this.state.orderConfigData.id,
        IntegratedSystem: this.state.orderConfigData.integratedSystem,
        Payment: this.state.orderConfigData.payment,
        Shipment: this.state.orderConfigData.shipment,
        ShoppingBag: this.state.orderConfigData.shoppingBag,
        EnableClickAfterValue: this.state.orderConfigData.enableClickAfterValue,
        EnableClickAfterDuration: this.state.orderConfigData
          .enableClickAfterDuration,
        StoreDelivery: this.state.orderConfigData.storeDelivery,
        AlertCommunicationviaWhtsup: this.state.orderConfigData
          .alertCommunicationviaWhtsup,
        AlertCommunicationviaSMS: this.state.orderConfigData
          .alertCommunicationviaSMS,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Order Updated Successfully.");
        } else {
          NotificationManager.error("Order Not Updated.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  OrderConfigFlagChange = (id) => {
    var OrderConfig = id.target.id;
    if (OrderConfig === "ckOrdconfigIntegSys") {
      this.state.orderConfigData.integratedSystem = !this.state.orderConfigData
        .integratedSystem;
    } else if (OrderConfig === "ckOrdconfigPayment") {
      this.state.orderConfigData.payment = !this.state.orderConfigData.payment;
    } else if (OrderConfig === "ckOrdconfigShipment") {
      this.state.orderConfigData.shipment = !this.state.orderConfigData
        .shipment;
    } else if (OrderConfig === "ckOrdconfigShopBag") {
      this.state.orderConfigData.shoppingBag = !this.state.orderConfigData
        .shoppingBag;
    } else if (OrderConfig === "ckOrdconfigStoredelivery") {
      this.state.orderConfigData.storeDelivery = !this.state.orderConfigData
        .storeDelivery;
    }
    this.setState({ orderConfigData: this.state.orderConfigData });
  };
  /// Handle Communication change
  handleCommunicationChange(id) {
    debugger;
    var OrderConfig = id.target.id;
    if (OrderConfig === "ckOrdconfigAltConmWhts") {
      if (this.state.orderConfigData.alertCommunicationviaWhtsup) {
        this.state.orderConfigData.alertCommunicationviaWhtsup = false;
        this.state.orderConfigData.alertCommunicationviaSMS = true;
      } else {
        this.state.orderConfigData.alertCommunicationviaWhtsup = false;
      }
    } else {
      if (this.state.orderConfigData.alertCommunicationviaSMS) {
        this.state.orderConfigData.alertCommunicationviaSMS = false;
        this.state.orderConfigData.alertCommunicationviaWhtsup = true;
      } else {
        this.state.orderConfigData.alertCommunicationviaSMS = false;
      }
    }

    this.setState({ orderConfigData: this.state.orderConfigData });
  }

  OrderSettingOnChange(e) {
    const { name, value } = e.target;
    var orderConfigData = this.state.orderConfigData;
    if (name === "enableClickAfterValue") {
      if (orderConfigData["enableClickAfterDuration"] == "M") {
        if (parseInt(value) <= 60) {
          orderConfigData[name] = value;
          this.setState({ orderConfigData });
        } else {
          orderConfigData[name] = "";
          this.setState({ orderConfigData });
        }
      } else {
        if (parseInt(value) <= 99) {
          orderConfigData[name] = value;
          this.setState({ orderConfigData });
        } else {
          orderConfigData[name] = "";
          this.setState({ orderConfigData });
        }
      }
    } else {
      if (name === "enableClickAfterDuration") {
        if (value === "M") {
          if (orderConfigData["enableClickAfterValue"] > 60)
            orderConfigData["enableClickAfterValue"] = "";
        }

        if (value === "H") {
          if (orderConfigData["enableClickAfterValue"] > 99)
            orderConfigData["enableClickAfterValue"] = "";
        }
      }
      orderConfigData[name] = value;
      this.setState({ orderConfigData });
    }
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.order
              : "Order"}
          </Link>
        </div>
        <div className="Store-paddmodule storeModule">
          <div className="module-tabs">
            <section>
              <Tabs
                onSelect={(index, label) => this.setState({ selTab: label })}
                selected={this.state.selTab}
              >
                {/* <Tab label="Module">
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>MODULE CONFIGURATION</h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        Shopping Bag
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckModconfigShoppBag"
                                        name="allModules"
                                        checked={
                                          this.state.moduleConfigData
                                            .shoppingBag
                                        }
                                        onChange={this.ModuleConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckModconfigShoppBag"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        Payment
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckModconfigPayment"
                                        name="allModules"
                                        checked={
                                          this.state.moduleConfigData.payment
                                        }
                                        onChange={this.ModuleConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckModconfigPayment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        Shipment
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckModconfigShipment"
                                        name="allModules"
                                        checked={
                                          this.state.moduleConfigData.shipment
                                        }
                                        onChange={this.ModuleConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckModconfigShipment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateModConfigData.bind(
                                    this
                                  )}
                                >
                                  UPDATE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab> */}
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.order
                      : "Order"
                  }
                >
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.orderconfiguration
                                    : "ORDER CONFIGURATION"}
                                </h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.shoppingbag
                                          : "Shopping Bag"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigShopBag"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.shoppingBag
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigShopBag"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .integratedsystem
                                          : "Integrated System(Sync Order)"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigIntegSys"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .integratedSystem
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigIntegSys"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.payment
                                          : "Payment"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigPayment"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.payment
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigPayment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.shipment
                                          : "Shipment"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigShipment"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.shipment
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigShipment"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        Store as Delivery Partner
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigStoredelivery"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .storeDelivery
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigStoredelivery"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        Alert Communication via Whatsapp
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigAltConmWhts"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .alertCommunicationviaWhtsup
                                        }
                                        onChange={this.handleCommunicationChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigAltConmWhts"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        Alert Communication via SMS
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckOrdconfigAltComSMS"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .alertCommunicationviaSMS
                                        }
                                        onChange={this.handleCommunicationChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckOrdconfigAltComSMS"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <table className="cmpaign-channel-table">
                                    <tr>
                                      <td>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.td
                                              .clickwillbeenabledafter
                                          : "Click will be enabled after"}
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="enableClickAfterValue"
                                          autoComplete="off"
                                          maxLength={2}
                                          value={
                                            this.state.orderConfigData
                                              .enableClickAfterValue
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                        {/* {this.state.campaignChannelData
                                        .enableClickAfterValue === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.enabledAfterValidation}
                                        </p>
                                      )} */}
                                      </td>
                                      <td>
                                        <select
                                          value={
                                            this.state.orderConfigData
                                              .enableClickAfterDuration
                                          }
                                          name="enableClickAfterDuration"
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="M">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option.min
                                              : "Min"}
                                          </option>
                                          <option value="H">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option.hr
                                              : "Hr"}
                                          </option>
                                        </select>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateOrderConfigData.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OrderSetting;
