import React, { Component, Fragment } from "react";
import { Select } from "antd";
import OrderSearch from "./../../assets/Images/order-search.png";
// import axios from "axios";
// import config from "../../helpers/config";
// import { authHeader } from "../../helpers/authHeader";
import "./../../assets/css/orders.css";
import * as translationHI from "./../../translations/hindi";
import * as translationMA from "./../../translations/marathi";
import OrderTab from "./OrderTabs/OrderTab";
import DeliveredTab from "./OrderTabs/DeliveredTab";
import ShoppingBagTab from "./OrderTabs/ShoppingBagTab";
import ShipmentTab from "./OrderTabs/ShipmentTab";
import ShipmentAssignedTab from "./OrderTabs/ShipmentAssignedTab";
import ReturnsTab from "./OrderTabs/ReturnsTab";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderPopoverOverlay: false,
      translateLanguage: {},
      selectedTabs: 1,
    };
  }
  componentWillMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  changeOrderDropdown() {
    debugger;
    const orderDropdownValues = document.querySelectorAll(
      ".order-mobile-dropdown-menu .nav-link"
    );
    for (const value of orderDropdownValues) {
      value.classList.remove("active");
    }
  }

  handleChanageNavTabs = (tab) => {
    this.setState({ selectedTabs: tab });
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { Option } = Select;

    return (
      <Fragment>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="store-task-tabs orders-tabs-outer">
          <Select
            defaultValue="shopping-bag"
            className="order-mobile-dropdown"
            // open={true}
            dropdownClassName="order-mobile-dropdown-menu"
            onSelect={this.changeOrderDropdown.bind(this)}
            onDropdownVisibleChange={(open) =>
              this.setState({ orderPopoverOverlay: open })
            }
          >
            <Option value="shopping-bag">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#shopping-bag-tab"
                role="tab"
                aria-controls="shopping-bag-tab"
                aria-selected="true"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.shoppingbag
                  : "Shopping Bag"}
              </a>
            </Option>
            <Option value="order">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#order-tab"
                role="tab"
                aria-controls="order-tab"
                aria-selected="false"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.order
                  : "Order"}
              </a>
            </Option>
            <Option value="shipment">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-tab"
                role="tab"
                aria-controls="shipment-tab"
                aria-selected="false"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.shipment
                  : "Shipment"}
              </a>
            </Option>
            <Option value="delivered">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#delivered-tab"
                role="tab"
                aria-controls="delivered-tab"
                aria-selected="false"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.delivered
                  : "Delivered"}
              </a>
            </Option>
            <Option value="shipment-assigned">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-assigned-tab"
                role="tab"
                aria-controls="shipment-assigned-tab"
                aria-selected="false"
              >
                Shipment Assigned
              </a>
            </Option>
            <Option value="returns">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#returns-tab"
                role="tab"
                aria-controls="returns-tab"
                aria-selected="false"
              >
                Returns
              </a>
            </Option>
          </Select>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className={
                  this.state.selectedTabs === 1 ? "nav-link active" : "nav-link"
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
            <li className="nav-item">
              <a
                className={
                  this.state.selectedTabs === 3 ? "nav-link active" : "nav-link"
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
            <li
              className="nav-item"
            >
              <a
                className={
                  this.state.selectedTabs === 4 ? "nav-link active" : "nav-link"
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
                  this.state.selectedTabs === 5 ? "nav-link active" : "nav-link"
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
                  this.state.selectedTabs === 6 ? "nav-link active" : "nav-link"
                }
                data-toggle="tab"
                href="#returns-tab"
                role="tab"
                aria-controls="returns-tab"
                aria-selected="false"
                onClick={this.handleChanageNavTabs.bind(this, 6)}
              >
                Returns
              </a>
            </li>

          </ul>
          <div className="order-search">
            <input
              type="text"
              placeholder={
                TranslationContext !== undefined
                  ? TranslationContext.placeholder.searchdot
                  : "Search..."
              }
            />
            <img src={OrderSearch} alt="search icon" />
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
            {this.state.selectedTabs === 1 ? <ShoppingBagTab /> : null}
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
            {this.state.selectedTabs === 2 ? <OrderTab /> : null}
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
            {this.state.selectedTabs === 3 ? <ShipmentTab /> : null}
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
            {this.state.selectedTabs === 4 ? <DeliveredTab /> : null}
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
            {this.state.selectedTabs === 5 ? <ShipmentAssignedTab /> : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Orders;
