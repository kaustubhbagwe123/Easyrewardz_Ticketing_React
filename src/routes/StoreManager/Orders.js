import React, { Component, Fragment } from "react";
import { Select } from "antd";
import OrderSearch from "./../../assets/Images/order-search.png";
// import axios from "axios";
// import config from "../../helpers/config";
// import { authHeader } from "../../helpers/authHeader";
import "./../../assets/css/orders.css";
import OrderTab from "./OrderTabs/OrderTab";
import DeliveredTab from "./OrderTabs/DeliveredTab";
import ShoppingBagTab from "./OrderTabs/ShoppingBagTab";
import ShipmentTab from "./OrderTabs/ShipmentTab";
import ShipmentAssignedTab from "./OrderTabs/ShipmentAssignedTab";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderPopoverOverlay: false,
      orderTab1: true,
      shipmentTab2: false,
      deliverredTab3: false,
      shipmentAssignTab4: false,
    };
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
  handleOrderTabOnChange = (tabName) => {
    debugger
    if (tabName === "orderTab") {
      this.setState({
        orderTab1: true,
      });
    } else if (tabName === "shipmentTab") {
      this.setState({
        shipmentTab2: true,
      });
    } else if (tabName === "deliveredTab") {
      this.setState({
        deliverredTab3: true,
      });
    } else if (tabName === "shipmentAssignTab") {
      this.setState({
        shipmentAssignTab4: true,
      });
    }
  };

  render() {
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
                Shopping Bag
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
                Order
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
                Shipment
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
                Delivered
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
          </Select>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#shopping-bag-tab"
                role="tab"
                aria-controls="shopping-bag-tab"
                aria-selected="true"
              >
                Shopping Bag
              </a>
            </li>
            <li className="nav-item" >
              <a
                className="nav-link"
                data-toggle="tab"
                href="#order-tab"
                role="tab"
                aria-controls="order-tab"
                aria-selected="false"
                // onClick={this.handleOrderTabOnChange("orderTab")}
              >
                Order
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-tab"
                role="tab"
                aria-controls="shipment-tab"
                aria-selected="false"
                // onClick={this.handleOrderTabOnChange("shipmentTab")}
              >
                Shipment
              </a>
            </li>
            <li
              className="nav-item"
              // onClick={this.handleGetOrderStatusFilterData.bind(this, 4)}
            >
              <a
                className="nav-link"
                data-toggle="tab"
                href="#delivered-tab"
                role="tab"
                aria-controls="delivered-tab"
                aria-selected="false"
                // onClick={this.handleOrderTabOnChange("deliveredTab")}
              >
                Delivered
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-assigned-tab"
                role="tab"
                aria-controls="shipment-assigned-tab"
                aria-selected="false"
                // onClick={this.handleOrderTabOnChange("shipmentAssignTab")}
              >
                Shipment Assigned
              </a>
            </li>
          </ul>
          <div className="order-search">
            <input type="text" placeholder="Search..." />
            <img src={OrderSearch} alt="search icon" />
          </div>
        </div>
        <div className="tab-content store-task-tab-cont orders-tab-cont">
          <div
            className="tab-pane fade show active"
            id="shopping-bag-tab"
            role="tabpanel"
            aria-labelledby="shopping-bag-tab"
          >
            <ShoppingBagTab />
          </div>
          <div
            className="tab-pane fade"
            id="order-tab"
            role="tabpanel"
            aria-labelledby="order-tab"
          >
            <OrderTab />
          </div>
          <div
            className="tab-pane fade"
            id="shipment-tab"
            role="tabpanel"
            aria-labelledby="shipment-tab"
          >
            <ShipmentTab />
          </div>
          <div
            className="tab-pane fade"
            id="delivered-tab"
            role="tabpanel"
            aria-labelledby="delivered-tab"
          >
            <DeliveredTab />
          </div>
          <div
            className="tab-pane fade"
            id="shipment-assigned-tab"
            role="tabpanel"
            aria-labelledby="shipment-assigned-tab"
          >
            <ShipmentAssignedTab />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Orders;
