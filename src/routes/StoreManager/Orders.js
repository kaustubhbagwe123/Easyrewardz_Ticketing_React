import React, { Component, Fragment } from "react";
import { Select } from "antd";
import OrderSearch from "./../../assets/Images/order-search.png";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import "./../../assets/css/orders.css";
import * as translationHI from "./../../translations/hindi";
import * as translationMA from "./../../translations/marathi";
import OrderTab from "./OrderTabs/OrderTab";
import DeliveredTab from "./OrderTabs/DeliveredTab";
import ShoppingBagTab from "./OrderTabs/ShoppingBagTab";
import ShipmentTab from "./OrderTabs/ShipmentTab";
import ShipmentAssignedTab from "./OrderTabs/ShipmentAssignedTab";
import CheckService from "./OrderTabs/CheckService";
import ReturnsTab from "./OrderTabs/ReturnsTab";
import POD from "./OrderTabs/POD";
import LeftWhi from "./../../assets/Images/down.png";
import CancelImg from "./../../assets/Images/Circle-cancel.png";
import SelfPickupTab from "./OrderTabs/SelfPickupTab";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderPopoverOverlay: false,
      translateLanguage: {},
      selectedTabs: 0,
      shipmentVisible: false,
      shoppingBagVisible: false,
      mobileTabShopping: false,
      podVisible: false,
      orderAllSearch: "",
      isSearch: false,
      enableCheckService: false,
      showSelfPickupTab: false,
      searchClearImg: false,
    };
  }
  componentWillMount() {
    this.handleGetOrderTabSettingData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  changeOrderDropdown() {
    const orderDropdownValues = document.querySelectorAll(
      ".order-mobile-dropdown-menu .nav-link"
    );
    for (const value of orderDropdownValues) {
      value.classList.remove("active");
    }
  }

  handleChanageNavTabs = (tab) => {
    this.setState({ selectedTabs: tab });
    if (tab === 1) {
      this.setState({ shoppingBagVisible: "shopping-bag" });
    } else if (tab === 2) {
      this.setState({ shoppingBagVisible: "order" });
    } else if (tab === 3) {
      this.setState({ shoppingBagVisible: "shipment" });
    } else if (tab === 4) {
      this.setState({ shoppingBagVisible: "delivered" });
    } else if (tab === 5) {
      this.setState({ shoppingBagVisible: "shipment-assigned" });
    } else if (tab === 6) {
      this.setState({ shoppingBagVisible: "returns" });
    } else if (tab === 7) {
      this.setState({ shoppingBagVisible: "check-service" });
    } else if (tab === 8) {
      this.setState({ shoppingBagVisible: "Pod" });
    } else if (tab === 9) {
      this.setState({ shoppingBagVisible: "Self-Pickup" });
    }
  };

  /// handle Get Order tab setting
  handleGetOrderTabSettingData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderTabSettingDetails",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.shoppingBagVisible && data.shipmentVisible) {
            self.setState({
              selectedTabs: 1,
            });
          } else {
            if (data.shoppingBagVisible) {
              self.setState({
                selectedTabs: 1,
              });
            } else {
              self.setState({
                selectedTabs: 2,
              });
            }
          }

          self.setState({
            shipmentVisible: data.shipmentVisible,
            shoppingBagVisible: data.shoppingBagVisible
              ? "shopping-bag"
              : "order",
            mobileTabShopping: data.shoppingBagVisible,
            podVisible: data.podVisible,
            enableCheckService: data.enableCheckService,
            showSelfPickupTab: data.showSelfPickupTab,
          });
        } else {
          self.setState({
            shipmentVisible: false,
            shoppingBagVisible: false,
            podVisible: false,
            selectedTabs: 1,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSeachAllData(e) {
    debugger;
    e.preventDefault();
    if (this.state.orderAllSearch !== "") {
      this.setState({
        searchClearImg: true,
      });
    }

    if (this.state.selectedTabs === 1) {
      this.refs.ShoppingBagTab.handleShoppingBagSearch(
        this.state.orderAllSearch
      );
    } else if (this.state.selectedTabs === 2) {
      this.refs.OrderTab.handleOrderSearch(this.state.orderAllSearch);
    } else if (this.state.selectedTabs === 3) {
      this.refs.ShipmentTab.handleShipmentSearch(this.state.orderAllSearch);
    } else if (this.state.selectedTabs === 4) {
      this.refs.DeliveredTab.handleDeliveredSearch(this.state.orderAllSearch);
    } else if (this.state.selectedTabs === 5) {
      this.refs.ShipmentAssignedTab.handleShipmentAssignSearch(
        this.state.orderAllSearch
      );
    } else if (this.state.selectedTabs === 6) {
      this.refs.ReturnsTab.handleReturnSearch(this.state.orderAllSearch);
    } else if (this.state.selectedTabs === 9) {
      this.refs.SelfPickupTab.handleSelfPickupSearch(this.state.orderAllSearch);
    }
  }

  ////handle scroll right
  handleScrollRight(num) {
    document.getElementById("OrderDiv").scrollLeft += 60;
  }
  ////handle scroll left
  handleScrollLeft(num) {
    document.getElementById("OrderDiv").scrollLeft -= 60;
  }
  handleSeachClearData(e) {
    this.setState({
      searchClearImg: false,
      orderAllSearch: "",
    });
    setTimeout(() => {
      this.handleSeachAllData(e);
    }, 50);
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { Option } = Select;

    return (
      <Fragment>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="store-task-tabs orders-tabs-outer newnonemob">
          <Select
            value={this.state.shoppingBagVisible}
            className="order-mobile-dropdown"
            dropdownClassName="order-mobile-dropdown-menu"
            onSelect={this.changeOrderDropdown.bind(this)}
            onDropdownVisibleChange={(open) =>
              this.setState({ orderPopoverOverlay: open })
            }
          >
            <Option value="shopping-bag">
              {this.state.mobileTabShopping ? (
                <a
                  className={
                    this.state.selectedTabs === 1
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#shopping-bag-tab"
                  role="tab"
                  aria-controls="shopping-bag-tab"
                  aria-selected="true"
                  onClick={this.handleChanageNavTabs.bind(this, 1)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.shoppingbag
                    : "Shopping Bag"}
                </a>
              ) : null}
            </Option>

            <Option value="order">
              <a
                className={
                  this.state.selectedTabs === 2 ? "nav-link active" : "nav-link"
                }
                data-toggle="tab"
                href="#order-tab"
                role="tab"
                aria-controls="order-tab"
                aria-selected="false"
                onClick={this.handleChanageNavTabs.bind(this, 2)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.order
                  : "Order"}
              </a>
            </Option>
            <Option value="shipment">
              {this.state.shipmentVisible ? (
                <a
                  className={
                    this.state.selectedTabs === 3
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#shipment-tab"
                  role="tab"
                  aria-controls="shipment-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 3)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.shipment
                    : "Shipment"}
                </a>
              ) : null}
            </Option>
            <Option value="delivered">
              {this.state.shipmentVisible ? (
                <a
                  className={
                    this.state.selectedTabs === 4
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#delivered-tab"
                  role="tab"
                  aria-controls="delivered-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 4)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.delivered
                    : "Delivered"}
                </a>
              ) : null}
            </Option>
            <Option value="shipment-assigned">
              {this.state.shipmentVisible ? (
                <a
                  className={
                    this.state.selectedTabs === 5
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#shipment-assigned-tab"
                  role="tab"
                  aria-controls="shipment-assigned-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 5)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.shipmentassigned
                    : "Shipment Assigned"}
                </a>
              ) : null}
            </Option>
            <Option value="returns">
              {this.state.shipmentVisible ? (
                <a
                  className={
                    this.state.selectedTabs === 6
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#returns-tab"
                  role="tab"
                  aria-controls="returns-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 6)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.returns
                    : "Returns"}
                </a>
              ) : null}
            </Option>
            <Option value="check-service">
              {this.state.shipmentVisible ? (
                <a
                  className={
                    this.state.selectedTabs === 7
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#check-service-tab"
                  role="tab"
                  aria-controls="check-service-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 7)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.checkservice
                    : "Check Service"}
                </a>
              ) : null}
            </Option>
            <Option value="Pod">
              {this.state.podVisible ? (
                <a
                  className={
                    this.state.selectedTabs === 8
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#Pod-tab"
                  role="tab"
                  aria-controls="Pod-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 8)}
                >
                  POD
                </a>
              ) : null}
            </Option>
            <Option value="Self-Pickup">
              {this.state.showSelfPickupTab ? (
                <a
                  className={
                    this.state.selectedTabs === 9
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#Self-pickupTab"
                  role="tab"
                  aria-controls="Self-pickupTab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 9)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.selfpickup
                    : "Self Pickup"}
                </a>
              ) : null}
            </Option>
          </Select>
          <ul className="nav nav-tabs" role="tablist">
            {this.state.mobileTabShopping ? (
              <li className="nav-item">
                <a
                  className={
                    this.state.selectedTabs === 1
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#shopping-bag-tab"
                  role="tab"
                  aria-controls="shopping-bag-tab"
                  aria-selected="true"
                  onClick={this.handleChanageNavTabs.bind(this, 1)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.shoppingbag
                    : "Shopping Bag"}
                </a>
              </li>
            ) : null}

            <li className="nav-item">
              <a
                className={
                  this.state.selectedTabs === 2 ? "nav-link active" : "nav-link"
                }
                data-toggle="tab"
                href="#order-tab"
                role="tab"
                aria-controls="order-tab"
                aria-selected="false"
                onClick={this.handleChanageNavTabs.bind(this, 2)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.order
                  : "Order"}
              </a>
            </li>
            {this.state.shipmentVisible ? (
              <>
                <li className="nav-item">
                  <a
                    className={
                      this.state.selectedTabs === 3
                        ? "nav-link active"
                        : "nav-link"
                    }
                    data-toggle="tab"
                    href="#shipment-tab"
                    role="tab"
                    aria-controls="shipment-tab"
                    aria-selected="false"
                    onClick={this.handleChanageNavTabs.bind(this, 3)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.shipment
                      : "Shipment"}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.selectedTabs === 4
                        ? "nav-link active"
                        : "nav-link"
                    }
                    data-toggle="tab"
                    href="#delivered-tab"
                    role="tab"
                    aria-controls="delivered-tab"
                    aria-selected="false"
                    onClick={this.handleChanageNavTabs.bind(this, 4)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.delivered
                      : "Delivered"}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.selectedTabs === 5
                        ? "nav-link active"
                        : "nav-link"
                    }
                    data-toggle="tab"
                    href="#shipment-assigned-tab"
                    role="tab"
                    aria-controls="shipment-assigned-tab"
                    aria-selected="false"
                    onClick={this.handleChanageNavTabs.bind(this, 5)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.shipmentassigned
                      : "Shipment Assigned"}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      this.state.selectedTabs === 6
                        ? "nav-link active"
                        : "nav-link"
                    }
                    data-toggle="tab"
                    href="#returns-tab"
                    role="tab"
                    aria-controls="returns-tab"
                    aria-selected="false"
                    onClick={this.handleChanageNavTabs.bind(this, 6)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.returns
                      : "Returns"}
                  </a>
                </li>
                {this.state.enableCheckService ? (
                  <li className="nav-item">
                    <a
                      className={
                        this.state.selectedTabs === 7
                          ? "nav-link active"
                          : "nav-link"
                      }
                      data-toggle="tab"
                      href="#check-service-tab"
                      role="tab"
                      aria-controls="check-service-tab"
                      aria-selected="false"
                      onClick={this.handleChanageNavTabs.bind(this, 7)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.checkservice
                        : "Check Service"}
                    </a>
                  </li>
                ) : null}
              </>
            ) : null}
            {this.state.podVisible ? (
              <li className="nav-item">
                <a
                  className={
                    this.state.selectedTabs === 8
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#Pod-tab"
                  role="tab"
                  aria-controls="Pod-tab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 8)}
                >
                  POD
                </a>
              </li>
            ) : null}
            {this.state.showSelfPickupTab ? (
              <li className="nav-item">
                <a
                  className={
                    this.state.selectedTabs === 8
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#Self-pickupTab"
                  role="tab"
                  aria-controls="Self-pickupTab"
                  aria-selected="false"
                  onClick={this.handleChanageNavTabs.bind(this, 9)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.selfpickup
                    : "Self Pickup"}
                </a>
              </li>
            ) : null}
          </ul>
          <form name="form" onSubmit={this.handleSeachAllData.bind(this)}>
            <div className="order-search">
              <input
                type="text"
                placeholder={
                  TranslationContext !== undefined
                    ? TranslationContext.placeholder.searchdot
                    : "Search..."
                }
                name="orderAllSearch"
                value={this.state.orderAllSearch}
                onChange={(e) =>
                  this.setState({
                    [e.target.name]: e.target.value,
                    searchClearImg: false,
                  })
                }
                autoComplete="off"
              />
              {this.state.searchClearImg ? (
                <img
                  src={CancelImg}
                  alt="Cancel icon"
                  onClick={this.handleSeachClearData.bind(this)}
                />
              ) : (
                <img
                  src={OrderSearch}
                  alt="search icon"
                  onClick={this.handleSeachAllData.bind(this)}
                />
              )}
            </div>
          </form>
        </div>
        <div className="ordertabmob">
          <div className="custom-tabs appoinmentMob">
            <div
              className="selectdot-blue selectdot-blue-left"
              onClick={this.handleScrollLeft.bind(this)}
              style={{ marginTop: "0" }}
            >
              <img src={LeftWhi} alt="right arrow" className="d-none right" />
            </div>
            <div id="" className="appointmentDiv">
              <ul id="OrderDiv" className="nav nav-tabs" role="tablist">
                {this.state.mobileTabShopping ? (
                  <li className="nav-item">
                    <a
                      className={
                        this.state.selectedTabs === 1
                          ? "nav-link active"
                          : "nav-link"
                      }
                      data-toggle="tab"
                      href="#shopping-bag-tab"
                      role="tab"
                      aria-controls="shopping-bag-tab"
                      aria-selected="true"
                      onClick={this.handleChanageNavTabs.bind(this, 1)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.shoppingbag
                        : "Shopping Bag"}
                    </a>
                  </li>
                ) : null}

                <li className="nav-item">
                  <a
                    className={
                      this.state.selectedTabs === 2
                        ? "nav-link active"
                        : "nav-link"
                    }
                    data-toggle="tab"
                    href="#order-tab"
                    role="tab"
                    aria-controls="order-tab"
                    aria-selected="false"
                    onClick={this.handleChanageNavTabs.bind(this, 2)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.order
                      : "Order"}
                  </a>
                </li>
                {this.state.shipmentVisible ? (
                  <>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.selectedTabs === 3
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#shipment-tab"
                        role="tab"
                        aria-controls="shipment-tab"
                        aria-selected="false"
                        onClick={this.handleChanageNavTabs.bind(this, 3)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.shipment
                          : "Shipment"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.selectedTabs === 4
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#delivered-tab"
                        role="tab"
                        aria-controls="delivered-tab"
                        aria-selected="false"
                        onClick={this.handleChanageNavTabs.bind(this, 4)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.delivered
                          : "Delivered"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.selectedTabs === 5
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#shipment-assigned-tab"
                        role="tab"
                        aria-controls="shipment-assigned-tab"
                        aria-selected="false"
                        onClick={this.handleChanageNavTabs.bind(this, 5)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.shipmentassigned
                          : "Shipment Assigned"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.selectedTabs === 6
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#returns-tab"
                        role="tab"
                        aria-controls="returns-tab"
                        aria-selected="false"
                        onClick={this.handleChanageNavTabs.bind(this, 6)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.returns
                          : "Returns"}
                      </a>
                    </li>
                    {this.state.enableCheckService ? (
                      <li className="nav-item">
                        <a
                          className={
                            this.state.selectedTabs === 7
                              ? "nav-link active"
                              : "nav-link"
                          }
                          data-toggle="tab"
                          href="#check-service-tab"
                          role="tab"
                          aria-controls="check-service-tab"
                          aria-selected="false"
                          onClick={this.handleChanageNavTabs.bind(this, 7)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.a.checkservice
                            : "Check Service"}
                        </a>
                      </li>
                    ) : null}
                    <li className="nav-item">
                      <a
                        className={
                          this.state.selectedTabs === 8
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#Pod-tab"
                        role="tab"
                        aria-controls="Pod-tab"
                        aria-selected="false"
                        onClick={this.handleChanageNavTabs.bind(this, 8)}
                      >
                        POD
                      </a>
                    </li>
                  </>
                ) : null}
                {this.state.showSelfPickupTab ? (
                  <li className="nav-item">
                    <a
                      className={
                        this.state.selectedTabs === 9
                          ? "nav-link active"
                          : "nav-link"
                      }
                      data-toggle="tab"
                      href="#Self-pickupTab"
                      role="tab"
                      aria-controls="Self-pickupTab"
                      aria-selected="false"
                      onClick={this.handleChanageNavTabs.bind(this, 9)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.selfpickup
                        : "Self Pickup"}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
            <div
              className="selectdot-blue"
              onClick={this.handleScrollRight.bind(this)}
              style={{ marginTop: "0" }}
            >
              <img src={LeftWhi} alt="right arrow" className="d-none right1" />
            </div>
          </div>
        </div>
        <div className="tab-content store-task-tab-cont orders-tab-cont">
          <div
            className={
              this.state.selectedTabs === 1
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="shopping-bag-tab"
            role="tabpanel"
            aria-labelledby="shopping-bag-tab"
          >
            {this.state.selectedTabs === 1 ? (
              <ShoppingBagTab ref="ShoppingBagTab" />
            ) : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 2
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="order-tab"
            role="tabpanel"
            aria-labelledby="order-tab"
          >
            {this.state.selectedTabs === 2 ? <OrderTab ref="OrderTab" /> : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 3
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="shipment-tab"
            role="tabpanel"
            aria-labelledby="shipment-tab"
          >
            {this.state.selectedTabs === 3 ? (
              <ShipmentTab ref="ShipmentTab" />
            ) : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 4
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="delivered-tab"
            role="tabpanel"
            aria-labelledby="delivered-tab"
          >
            {this.state.selectedTabs === 4 ? (
              <DeliveredTab ref="DeliveredTab" />
            ) : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 5
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="shipment-assigned-tab"
            role="tabpanel"
            aria-labelledby="shipment-assigned-tab"
          >
            {this.state.selectedTabs === 5 ? (
              <ShipmentAssignedTab ref="ShipmentAssignedTab" />
            ) : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 6
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="returns-tab"
            role="tabpanel"
            aria-labelledby="returns-tab"
          >
            {this.state.selectedTabs === 6 ? (
              <ReturnsTab ref="ReturnsTab" />
            ) : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 7
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="check-service-tab"
            role="tabpanel"
            aria-labelledby="check-service-tab"
          >
            {this.state.selectedTabs === 7 ? <CheckService /> : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 8
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="Pod-tab"
            role="tabpanel"
            aria-labelledby="Pod-tab"
          >
            {this.state.selectedTabs === 8 ? <POD /> : null}
          </div>
          <div
            className={
              this.state.selectedTabs === 9
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id="Self-pickupTab"
            role="tabpanel"
            aria-labelledby="Self-pickupTab"
          >
            {this.state.selectedTabs === 9 ? (
              <SelfPickupTab ref="SelfPickupTab" />
            ) : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Orders;
