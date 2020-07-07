import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import Pagination from "react-pagination-js";
import { Table } from "antd";
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
      OrdTemplatename: "",
      OrdTempHeight: "",
      OrdTempLength: "",
      OrdTempBreadth: "",
      OrdTempWeight: "",
      selectedOrdHeight: "cm",
      selectedOrdLength: "cm",
      selectedOrdBreadth: "cm",
      selectedOrdWeight: "Kg",
      ShippingTempData: [],
      ShipTemploading: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
    };
  }

  componentDidMount() {
    this.handleGetModuleConfigData();
    this.handleGetOrderConfigData();
    this.handleGetShippingTempData();
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
  /// handle get shipping tempt grid data
  handleGetShippingTempData() {
    let self = this;
    this.setState({
      ShipTemploading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderShippingTemplate",
      headers: authHeader(),
      data: {
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ShippingTempData: data.shippingTemplateList,
            totalCount: data.totalCount,
            ShipTemploading: false,
          });
        } else {
          self.setState({
            ShippingTempData: {},
            totalCount: 0,
            ShipTemploading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateModConfigData() {
    const TranslationContext = this.state.translateLanguage.default;
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
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.moduleupdatedsuccessfully
              : "Module Updated Successfully."
          );
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
    const TranslationContext = this.state.translateLanguage.default;
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
        AlertCommunicationSMSText: this.state.orderConfigData
          .alertCommunicationSMSText,
        ShoppingBagConvertToOrder: this.state.orderConfigData
          .shoppingBagConvertToOrder,
        ShoppingBagConvertToOrderText: this.state.orderConfigData
          .shoppingBagConvertToOrderText,
        AWBAssigned: this.state.orderConfigData.awbAssigned,
        AWBAssignedText: this.state.orderConfigData.awbAssignedText,
        PickupScheduled: this.state.orderConfigData.pickupScheduled,
        PickupScheduledText: this.state.orderConfigData.pickupScheduledText,
        Shipped: this.state.orderConfigData.shipped,
        ShippedText: this.state.orderConfigData.shippedText,
        Delivered: this.state.orderConfigData.delivered,
        DeliveredText: this.state.orderConfigData.deliveredText,
        Cancel: this.state.orderConfigData.cancel,
        CancelText: this.state.orderConfigData.cancelText,
        UnDeliverable: this.state.orderConfigData.unDeliverable,
        UnDeliverableText: this.state.orderConfigData.unDeliverableText,
        StoreDeliveryText: this.state.orderConfigData.storeDeliveryText,
        PaymentTenantCodeText: this.state.orderConfigData.paymentTenantCodeText,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.orderupdatedsuccessfully
              : "Order Updated Successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ordernotupdated
              : "Order Not Updated."
          );
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
    } else if (OrderConfig === "OrdshoppingBagConvertToOrder") {
      this.state.orderConfigData.shoppingBagConvertToOrder = !this.state
        .orderConfigData.shoppingBagConvertToOrder;
    } else if (OrderConfig === "OrdAwbAssigned") {
      this.state.orderConfigData.awbAssigned = !this.state.orderConfigData
        .awbAssigned;
    } else if (OrderConfig === "OrdPickupScheduled") {
      this.state.orderConfigData.pickupScheduled = !this.state.orderConfigData
        .pickupScheduled;
    } else if (OrderConfig === "OrdShipped") {
      this.state.orderConfigData.shipped = !this.state.orderConfigData.shipped;
    } else if (OrderConfig === "OrdDelivered") {
      this.state.orderConfigData.delivered = !this.state.orderConfigData
        .delivered;
    } else if (OrderConfig === "OrdCancelled") {
      this.state.orderConfigData.cancel = !this.state.orderConfigData.cancel;
    } else if (OrderConfig === "OrdUndelivered") {
      this.state.orderConfigData.unDeliverable = !this.state.orderConfigData
        .unDeliverable;
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
  /// handle inputchange
  handleInputOnchange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  /// handle input valiadtion change
  handleInputValidationChange(e) {
    var values = e.target.value;
    var names = e.target.name;

    if (isNaN(values)) {
      return false;
    }
    var splitText = values.split(".");
    var index = values.indexOf(".");

    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            if (names === "OrdTempHeight") {
              this.setState({
                OrdTempHeight: values,
              });
            } else if (names === "OrdTempLength") {
              this.setState({
                OrdTempLength: values,
              });
            } else if (names === "OrdTempBreadth") {
              this.setState({
                OrdTempBreadth: values,
              });
            } else if (names === "OrdTempWeight") {
              this.setState({
                OrdTempWeight: values,
              });
            }
          }
        } else {
          return false;
        }
      } else {
        if (names === "OrdTempHeight") {
          this.setState({
            OrdTempHeight: values,
          });
        } else if (names === "OrdTempLength") {
          this.setState({
            OrdTempLength: values,
          });
        } else if (names === "OrdTempBreadth") {
          this.setState({
            OrdTempBreadth: values,
          });
        } else if (names === "OrdTempWeight") {
          this.setState({
            OrdTempWeight: values,
          });
        }
      }
    } else {
      if (names === "OrdTempHeight") {
        this.setState({
          OrdTempHeight: values,
        });
      } else if (names === "OrdTempLength") {
        this.setState({
          OrdTempLength: values,
        });
      } else if (names === "OrdTempBreadth") {
        this.setState({
          OrdTempBreadth: values,
        });
      } else if (names === "OrdTempWeight") {
        this.setState({
          OrdTempWeight: values,
        });
      }
    }
  }

  /// handle drop down change
  handleDropDownChange(e) {
    var names = e.target.name;
    var values = e.target.value;

    if (names === "selectedOrdHeight") {
      this.setState({
        selectedOrdHeight: values,
      });
    } else if (names === "selectedOrdLength") {
      this.setState({
        selectedOrdLength: values,
      });
    } else if (names === "selectedOrdBreadth") {
      this.setState({
        selectedOrdBreadth: values,
      });
    } else if (names === "selectedOrdWeight") {
      this.setState({
        selectedOrdWeight: values,
      });
    }
  }
  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetShippingTempData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetShippingTempData();
  };
  /// handle submit shipping template
  handleSubmitShppingTemp() {
    // if(){
    // }else{
    // }
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
                {/* Don't Remove commented code */}
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
                                  <div className="module-switch ord-m-t20">
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
                                  <div className="module-switch ord-m-t20">
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
                                  <div className="module-switch ord-m-t20">
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
                                    {this.state.orderConfigData.payment ? (
                                      <div className="ordPayment1">
                                        <input
                                          type="text"
                                          name="paymentTenantCodeText"
                                          autoComplete="off"
                                          placeholder="Enter Tenant Code"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .paymentTenantCodeText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
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
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .storeasdeliverypartner
                                          : "Store as Delivery Partner"}
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
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .alertcommunicationviawhatsapp
                                          : "Alert Communication via Whatsapp"}
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
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .alertcommunicationviasms
                                          : "Alert Communication via SMS"}
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
                                    {this.state.orderConfigData
                                      .alertCommunicationviaSMS ? (
                                      <div className="ordcusinput">
                                        <input
                                          type="text"
                                          name="alertCommunicationSMSText"
                                          autoComplete="off"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                  .providername
                                              : "Provider name"
                                          }
                                          maxLength={15}
                                          value={
                                            this.state.orderConfigData
                                              .alertCommunicationSMSText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>

                                  <table className="cmpaign-channel-table">
                                    <tr>
                                      <td>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.td
                                              .clickwillbeenabledafter
                                          : "Click will be enabled after"}
                                        <span>
                                          (
                                          {TranslationContext !== undefined
                                            ? TranslationContext.span
                                                .paymentsendlinkbutton
                                            : "Payment send link button"}
                                          )
                                        </span>
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
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.smsandwhatsapp
                      : "SMS & WhatsApp"
                  }
                >
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.smsandwhatsapp
                                    : "SMS & WhatsApp"}
                                </h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .shoppingbagconvertedtoorder
                                          : "Shopping bag Converted to Order"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdshoppingBagConvertToOrder"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .shoppingBagConvertToOrder
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdshoppingBagConvertToOrder"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData
                                      .shoppingBagConvertToOrder ? (
                                      <div className="ordcusinput1">
                                        <input
                                          type="text"
                                          name="shoppingBagConvertToOrderText"
                                          autoComplete="off"
                                          placeholder="Enter Template"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .shoppingBagConvertToOrderText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.awbassigned
                                          : "Awb Assigned"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdAwbAssigned"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.awbAssigned
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdAwbAssigned"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData.awbAssigned ? (
                                      <>
                                        <div className="ordcusinput2">
                                          <input
                                            type="text"
                                            name="awbAssignedText"
                                            autoComplete="off"
                                            placeholder="Enter Template"
                                            maxLength={500}
                                            value={
                                              this.state.orderConfigData
                                                .awbAssignedText
                                            }
                                            onChange={this.OrderSettingOnChange.bind(
                                              this
                                            )}
                                          />
                                        </div>
                                        <div className="ordcusinputStore2">
                                          <input
                                            type="text"
                                            name="storeDeliveryText"
                                            autoComplete="off"
                                            placeholder="Enter Template"
                                            maxLength={500}
                                            value={
                                              this.state.orderConfigData
                                                .storeDeliveryText
                                            }
                                            onChange={this.OrderSettingOnChange.bind(
                                              this
                                            )}
                                          />
                                        </div>
                                      </>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .pickupscheduledgenerated
                                          : "Pickup Scheduled/Generated"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdPickupScheduled"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .pickupScheduled
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdPickupScheduled"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData
                                      .pickupScheduled ? (
                                      <div className="ordcusinput3">
                                        <input
                                          type="text"
                                          name="pickupScheduledText"
                                          autoComplete="off"
                                          placeholder="Enter Template"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .pickupScheduledText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.shipped
                                          : "Shipped"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdShipped"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.shipped
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdShipped"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData.shipped ? (
                                      <div className="ordcusinput4">
                                        <input
                                          type="text"
                                          name="shippedText"
                                          autoComplete="off"
                                          placeholder="Enter Template"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .shippedText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.delivered
                                          : "Delivered"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdDelivered"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.delivered
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdDelivered"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData.delivered ? (
                                      <div className="ordcusinput5">
                                        <input
                                          type="text"
                                          name="deliveredText"
                                          autoComplete="off"
                                          placeholder="Enter Template"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .deliveredText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.cancelled
                                          : "Cancelled"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdCancelled"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData.cancel
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdCancelled"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData.cancel ? (
                                      <div className="ordcusinput6">
                                        <input
                                          type="text"
                                          name="cancelledText"
                                          autoComplete="off"
                                          placeholder="Enter Template"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .cancelText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch ord-m-t20">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0 ordSttd-store">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.undelivered
                                          : "Undelivered"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="OrdUndelivered"
                                        name="allModules"
                                        checked={
                                          this.state.orderConfigData
                                            .unDeliverable
                                        }
                                        onChange={this.OrderConfigFlagChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="OrdUndelivered"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.orderConfigData
                                      .unDeliverable ? (
                                      <div className="ordcusinput7">
                                        <input
                                          type="text"
                                          name="unDeliverableText"
                                          autoComplete="off"
                                          placeholder="Enter Template"
                                          maxLength={500}
                                          value={
                                            this.state.orderConfigData
                                              .unDeliverableText
                                          }
                                          onChange={this.OrderSettingOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
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
                <Tab label="Shipping Template">
                  <div className="store-mdl backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-8 m-auto">
                              <div
                                className="right-sect-div"
                                style={{ padding: "20px" }}
                              >
                                <div
                                  className="row cmpaign-channel-table lbl-fnt-w-400 full-wid-inp"
                                  style={{ margin: "0px" }}
                                >
                                  <div className="col-md-12">
                                    <h3>Shipping Template</h3>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>Template Name</label>
                                      <input
                                        className="mx-slt-txt"
                                        type="text"
                                        placeholder="Enter Template Name"
                                        autoComplete="off"
                                        maxLength={250}
                                        name="OrdTemplatename"
                                        value={this.state.OrdTemplatename}
                                        onChange={this.handleInputOnchange.bind(
                                          this
                                        )}
                                      />
                                      {/* {this.state.maxCapacity === "" && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.maxCapacityValidation}
                                      </p>
                                    )} */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>Height</label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempHeight"
                                          value={this.state.OrdTempHeight}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdHeight}
                                          name="selectedOrdHeight"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="cm">cm</option>
                                          <option value="feet">feet</option>
                                          <option value="inch">inch</option>
                                        </select>
                                      </div>
                                      {/* {this.state.maxCapacity === "" && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.maxCapacityValidation}
                                      </p>
                                    )} */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>Length</label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempLength"
                                          value={this.state.OrdTempLength}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdLength}
                                          name="selectedOrdLength"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="cm">cm</option>
                                          <option value="feet">feet</option>
                                          <option value="inch">inch</option>
                                        </select>
                                      </div>
                                      {/* {this.state.maxCapacity === "" && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.maxCapacityValidation}
                                      </p>
                                    )} */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>Breadth</label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempBreadth"
                                          value={this.state.OrdTempBreadth}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdBreadth}
                                          name="selectedOrdBreadth"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="cm">cm</option>
                                          <option value="feet">feet</option>
                                          <option value="inch">inch</option>
                                        </select>
                                      </div>
                                      {/* {this.state.maxCapacity === "" && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.maxCapacityValidation}
                                      </p>
                                    )} */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="mx-slt-div m-0 px-0">
                                      <label>Weight</label>
                                      <div className="d-flex">
                                        <input
                                          className="mx-slt-txt slot-hour"
                                          type="text"
                                          autoComplete="off"
                                          name="OrdTempWeight"
                                          value={this.state.OrdTempWeight}
                                          maxLength={8}
                                          onChange={this.handleInputValidationChange.bind(
                                            this
                                          )}
                                        />
                                        <select
                                          className="slot-shift"
                                          value={this.state.selectedOrdWeight}
                                          name="selectedOrdWeight"
                                          onChange={this.handleDropDownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value="Kg">Kg</option>
                                          <option value="g">g</option>
                                          <option value="lbs">lbs</option>
                                        </select>
                                      </div>
                                      {/* {this.state.maxCapacity === "" && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.maxCapacityValidation}
                                      </p>
                                    )} */}
                                    </div>
                                  </div>
                                  <div className="col-md-12 my-3 text-center">
                                    <button
                                      className="Schedulenext1 mb-0"
                                      type="button"
                                      onClick={this.handleSubmitShppingTemp.bind(
                                        this
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.submit
                                        : "SUBMIT"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 table-cntr store dv-table-paging">
                              <Table
                                loading={this.state.ShipTemploading}
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                columns={[
                                  {
                                    title: "Template Name",
                                    dataIndex: "templateName",
                                  },
                                  {
                                    title: "Height",
                                    dataIndex: "height",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.height}&nbsp;{item.height_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title: "Length",
                                    dataIndex: "length",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.length}&nbsp;{item.length_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title: "Breadth",
                                    dataIndex: "breath",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.breath}&nbsp;{item.breath_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title: "Weight",
                                    dataIndex: "weight",
                                    render: (row, item) => {
                                      return (
                                        <>
                                          {item.weight}&nbsp;{item.weight_Unit}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",

                                    render: (row, rowData) => {
                                      var ids = row;
                                      return (
                                        <>
                                          <span>
                                            <button
                                              className="react-tabel-button editre"
                                              // onClick={this.openSlotEditModal.bind(
                                              //   this,
                                              //   rowData.storeId
                                              // )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button.edit
                                                : "EDIT"}
                                            </button>
                                          </span>
                                        </>
                                      );
                                    },
                                  },
                                ]}
                                rowKey="id"
                                pagination={false}
                                dataSource={this.state.ShippingTempData}
                              ></Table>
                              <Pagination
                                currentPage={this.state.currentPage}
                                totalSize={this.state.totalCount}
                                sizePerPage={this.state.postsPerPage}
                                changeCurrentPage={this.PaginationOnChange}
                                theme="bootstrap"
                              />
                              <div className="position-relative">
                                <div className="item-selection Camp-pagination">
                                  <select
                                    value={this.state.postsPerPage}
                                    onChange={this.handlePageItemchange}
                                  >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                  </select>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.itemsperpage
                                      : "Items per page"}
                                  </p>
                                </div>
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
