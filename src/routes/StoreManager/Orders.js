import React, { Component, Fragment } from "react";
import { Table, Popover } from "antd";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import OrderHamb from "./../../assets/Images/order-hamb.png";
import OrderSearch from "./../../assets/Images/order-search.png";
import OrderInfo from "./../../assets/Images/order-info.png";
import Demo from "./../../store/Hashtag";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import OrderDel from "../../assets/Images/order-del.png";
import { Collapse, CardBody, Card } from "reactstrap";
import ClaimStatus from "../../routes/ClaimStatus";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./../../assets/css/orders.css";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingBagGridData: [
        {
          ShoppingBagNo: "12017768",
          Date: "25 April 2020",
          Time: "11:45 AM",
          CustomerName: "Sandeep",
          CustomerNumber: "+91 9717419325",
          Items: "6",
          Status: "New",
          Deliverytype: "Store Delivery",
          PickupDate: "",
          PickupTime: "",
          Address: "131  Vindya Commercial Complex, Plot No- Sec , Cbd Belapur",
        },
        {
          ShoppingBagNo: "12017890",
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          Status: "Cancelled",
          Deliverytype: "Self Picked Up",
          PickupDate: "12 May",
          PickupTime: "11:30 am",
          Address: "",
        },
      ],
      itemPopupDate: [
        {
          ItemID: "123456",
          ItemName: "Blue Casual shoes",
          ItemPrice: "1299",
          Quantity: "02",
        },
        {
          ItemID: "123556",
          ItemName: "Black belt",
          ItemPrice: "1500",
          Quantity: "01",
        },
        {
          ItemID: "123557",
          ItemName: "Sneakers",
          ItemPrice: "899",
          Quantity: "01",
        },
        {
          ItemID: "123558",
          ItemName: "Brown Bag",
          ItemPrice: "699",
          Quantity: "01",
        },
        {
          ItemID: "123456",
          ItemName: "Blue Casual shoes",
          ItemPrice: "1299",
          Quantity: "02",
        },
        {
          ItemID: "123556",
          ItemName: "Black belt",
          ItemPrice: "1500",
          Quantity: "01",
        },
        {
          ItemID: "123557",
          ItemName: "Sneakers",
          ItemPrice: "899",
          Quantity: "01",
        },
        {
          ItemID: "123558",
          ItemName: "Brown Bag",
          ItemPrice: "699",
          Quantity: "01",
        },
      ],
      orderPopoverOverlay: false,
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="store-task-tabs orders-tabs-outer">
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
            <li className="nav-item">
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
            </li>
            <li className="nav-item">
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
            </li>
            <li className="nav-item">
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
            </li>
            <li className="nav-item">
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
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                columns={[
                  {
                    title: "Shopping Bag No.",
                    dataIndex: "ShoppingBagNo",
                  },
                  {
                    title: "Date",
                    render: (row, item) => {
                      return (
                        <div>
                          <p>{item.Date}</p>
                          <p className="order-small-font">{item.Time}</p>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Customer",
                    render: (row, item) => {
                      return (
                        <div>
                          <p>{item.CustomerName},</p>
                          <p className="order-small-font">
                            {item.CustomerNumber}
                          </p>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Items",
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <p>{item.Items}</p>
                          <Popover
                            content={
                              <Table
                                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                columns={[
                                  {
                                    title: "Item ID",
                                    dataIndex: "ItemID",
                                  },
                                  {
                                    title: "Item Name",
                                    dataIndex: "ItemName",
                                    width: 150,
                                  },
                                  {
                                    title: "Item Price",
                                    dataIndex: "ItemPrice",
                                  },
                                  {
                                    title: "Quantity",
                                    dataIndex: "Quantity",
                                  },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={this.state.itemPopupDate}
                              />
                            }
                            trigger="click"
                            overlayClassName="order-popover-table order-popover"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderHamb} className="order-hamb" />
                          </Popover>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Status",
                    // title: () => {
                    //   return (
                    //     <div>
                    //       Status
                    //       <Popover content={<p>Hello</p>} trigger="click">
                    //         <img src={OrderInfo} className="order-info" />
                    //       </Popover>
                    //     </div>
                    //   );
                    // },
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <p
                            className={
                              item.Status === "Cancelled"
                                ? "order-clr-pink"
                                : ""
                            }
                          >
                            {item.Status}
                          </p>
                          {item.Status === "Cancelled" ? (
                            <Popover content={<p>Hello</p>} trigger="click">
                              <img src={OrderInfo} className="order-info" />
                            </Popover>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    },
                  },
                  {
                    title: "Delivery type",
                    render: (row, item) => {
                      return (
                        <p
                          className={
                            item.Deliverytype === "Store Delivery"
                              ? "order-clr-green"
                              : "order-clr-blue"
                          }
                        >
                          {item.Deliverytype}
                        </p>
                      );
                    },
                  },
                  {
                    title: "Pickup Date & Time",
                    render: (row, item) => {
                      return (
                        <div>
                          {item.PickupDate === "" && item.PickupTime === "" ? (
                            <p className="order-clr-blue">—NIL—</p>
                          ) : (
                            <>
                              <p className="order-clr-blue">
                                {item.PickupDate},
                              </p>
                              <p className="order-clr-blue order-more-small-font">
                                {item.PickupTime}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    },
                    className: "pick-up-date",
                  },
                  {
                    title: "Address",
                    render: (row, item) => {
                      return (
                        <p className="order-small-font">
                          {item.Address === "" ? "—NIL—" : item.Address}
                        </p>
                      );
                    },
                    className: "white-space-init",
                  },
                  {
                    title: "Action",
                    render: (row, item) => {
                      return (
                        <div className="d-flex">
                          <button className="butn order-grid-butn">
                            Convert to Order
                          </button>
                          <button className="butn order-grid-butn order-del-butn">
                            <img src={OrderDel} alt="delete icon" />
                          </button>
                        </div>
                      );
                    },
                  },
                ]}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                showSizeChanger={true}
                onShowSizeChange={true}
                dataSource={this.state.shoppingBagGridData}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="order-tab"
            role="tabpanel"
            aria-labelledby="order-tab"
          >
            2
          </div>
          <div
            className="tab-pane fade"
            id="shipment-tab"
            role="tabpanel"
            aria-labelledby="shipment-tab"
          >
            3
          </div>
          <div
            className="tab-pane fade"
            id="delivered-tab"
            role="tabpanel"
            aria-labelledby="delivered-tab"
          >
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                columns={[
                  {
                    title: "Invoice no.",
                    dataIndex: "ShoppingBagNo",
                  },
                  {
                    title: "Customer",
                    render: (row, item) => {
                      return (
                        <div>
                          <p>{item.CustomerName},</p>
                          <p className="order-small-font">
                            {item.CustomerNumber}
                          </p>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Items",
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <p>{item.Items}</p>
                          <Popover
                            content={
                              <Table
                                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                columns={[
                                  {
                                    title: "Item ID",
                                    dataIndex: "ItemID",
                                  },
                                  {
                                    title: "Item Name",
                                    dataIndex: "ItemName",
                                    width: 150,
                                  },
                                  {
                                    title: "Item Price",
                                    dataIndex: "ItemPrice",
                                  },
                                  {
                                    title: "Quantity",
                                    dataIndex: "Quantity",
                                  },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={this.state.itemPopupDate}
                              />
                            }
                            trigger="click"
                            overlayClassName="order-popover-table order-popover"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderHamb} className="order-hamb" />
                          </Popover>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Date",
                    render: (row, item) => {
                      return (
                        <div>
                          <p>{item.Date}</p>
                          <p className="order-small-font">{item.Time}</p>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Status",
                    // title: () => {
                    //   return (
                    //     <div>
                    //       Status
                    //       <Popover content={<p>Hello</p>} trigger="click">
                    //         <img src={OrderInfo} className="order-info" />
                    //       </Popover>
                    //     </div>
                    //   );
                    // },
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <p
                            className={
                              item.Status === "Cancelled"
                                ? "order-clr-pink"
                                : ""
                            }
                          >
                            {item.Status}
                          </p>
                          {item.Status === "Cancelled" ? (
                            <Popover content={<p>Hello</p>} trigger="click">
                              <img src={OrderInfo} className="order-info" />
                            </Popover>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    },
                  },
                  {
                    title: "Action",
                    render: (row, item) => {
                      return (
                        <div className="d-flex">
                          <button className="delibutn deliv-grid-butn">
                            Delivered
                          </button>
                        </div>
                      );
                    },
                  },
                ]}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                showSizeChanger={true}
                onShowSizeChange={true}
                dataSource={this.state.shoppingBagGridData}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="shipment-assigned-tab"
            role="tabpanel"
            aria-labelledby="shipment-assigned-tab"
          >
            5
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Orders;
