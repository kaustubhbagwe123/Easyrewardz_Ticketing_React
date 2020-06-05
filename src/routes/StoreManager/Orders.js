import React, { Component, Fragment } from "react";
import { Table, Popover, Popconfirm, Select } from "antd";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StepZilla from "react-stepzilla";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import OrderHamb from "./../../assets/Images/order-hamb.png";
import OrderSearch from "./../../assets/Images/order-search.png";
import OrderInfo from "./../../assets/Images/order-info.png";
import OrderShopingBlack from "./../../assets/Images/order-shoping-black.png";
import OrderBag from "./../../assets/Images/order-bag.png";
import CreditCard from "./../../assets/Images/credit-card.png";
import NoPayment from "./../../assets/Images/no-payment.png";
import CancelImg from "./../../assets/Images/cancel.png";
import CardTick from "./../../assets/Images/card-tick.png";
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
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Modal from "react-responsive-modal";

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
          AWBNo: "44566778",
        },
        {
          ItemID: "123556",
          ItemName: "Black belt",
          ItemPrice: "1500",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123557",
          ItemName: "Sneakers",
          ItemPrice: "899",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123558",
          ItemName: "Brown Bag",
          ItemPrice: "699",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123456",
          ItemName: "Blue Casual shoes",
          ItemPrice: "1299",
          Quantity: "02",
          AWBNo: "44566778",
        },
        {
          ItemID: "123556",
          ItemName: "Black belt",
          ItemPrice: "1500",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123557",
          ItemName: "Sneakers",
          ItemPrice: "899",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123558",
          ItemName: "Brown Bag",
          ItemPrice: "699",
          Quantity: "01",
          AWBNo: "44566778",
        },
      ],
      orderPopoverOverlay: false,
      orderGridData: [
        {
          InvoiceNo: "12017768",
          InvoiceNoIcon: true,
          Date: "25 April 2020",
          Time: "11:45 AM",
          CustomerName: "Sandeep",
          CustomerNumber: "+91 9717419325",
          Items: "6",
          Amount: "Rs 9,294",
          Status: "Ready to Ship",
          Partner: "Blue Dart",
          selfPickUp: true,
          Address: "131  Vindya Commercial Complex, Plot No- Sec , Cbd Belapur",
          Action: "Payment Done",
        },
        {
          InvoiceNo: "12017890",
          InvoiceNoIcon: false,
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          Amount: "Rs 9,294",
          Status: "Order Sync Pending",
          selfPickUp: false,
          Partner: "Blue Dart",
          Address: "",
          Action: "Payment Pending",
        },
      ],
      ShipmentGridData: [
        {
          InvoiceNo: "12017768",
          InvoiceNoIcon: true,
          Date: "25 April 2020",
          Time: "11:45 AM",
          CustomerName: "Sandeep",
          CustomerNumber: "+91 9717419325",
          Items: "6",
          DeliveryTyper: "Store Delivery",
          Status: "Shipment Assigned",
          Partner: "Blue Dart",
          selfPickUp: true,
          Address: "131  Vindya Commercial Complex, Plot No- Sec , Cbd Belapur",
          Action: "Shipment Created",
        },
        {
          InvoiceNo: "12017890",
          InvoiceNoIcon: false,
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          DeliveryTyper: "Store Delivery",
          Status: "Assigned Shipment ",
          selfPickUp: false,
          Partner: "Blue Dart",
          Address: "",
          Action: "Create Shipment",
        },
        {
          InvoiceNo: "12017890",
          InvoiceNoIcon: false,
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          DeliveryTyper: "Store Delivery",
          Status: "",
          selfPickUp: false,
          Partner: "Blue Dart",
          Address: "",
          Action: "Pickup Pending",
        },
      ],

      // deliveredGridData: [
      //   {
      //     InvoiceNo: "12017768",
      //     CustomerName: "Sandeep",
      //     CustomerNumber: "+91 9717419325",
      //     Items: "6",
      //     Date: "25 April 2020",
      //     Time: "11:45 AM",
      //     Status: "Delivered",
      //   },
      //   {
      //     InvoiceNo: "12017768",
      //     CustomerName: "Naman",
      //     CustomerNumber: "+91 9717419325",
      //     Items: "6",
      //     Date: "25 April 2020",
      //     Time: "11:45 AM",
      //     Status: "RTO",
      //   },
      //   {
      //     InvoiceNo: "12017768",
      //     CustomerName: "Sandeep",
      //     CustomerNumber: "+91 9717419325",
      //     Items: "6",
      //     Date: "25 April 2020",
      //     Time: "11:45 AM",
      //     Status: "Self Picked",
      //   },
      // ],
      deliveredGridData: [],
      shipmentAssignedGridData: [
        {
          AWSNo: "889667123",
          InvoiceNo: "981812345",
          CourierPartner: "Blue Dart",
          ReferenceNo: "BD12345",
        },
        {
          AWSNo: "889667123",
          InvoiceNo: "981812345",
          CourierPartner: "Blue Dart",
          ReferenceNo: "BD12345",
        },
        {
          AWSNo: "889667123",
          InvoiceNo: "981812345",
          CourierPartner: "Blue Dart",
          ReferenceNo: "",
        },
        {
          AWSNo: "NIL",
          InvoiceNo: "981812345",
          CourierPartner: "Store",
          ReferenceNo: "",
        },
      ],
      filterOrderDeliveredStatus: false,
      filterOrderStatus: false,
      filterShipmentStatus: false,
      totalCount: 0,
      ShipmentMdlbtn: false,
    };
  }

  componentDidMount() {
    this.handleGetOrderDeliveredData();
  }

  handleGetOrderDeliveredData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderDeliveredDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: 1,
        PageSize: 10,
        FilterStatus: "",
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            deliveredGridData: data.orderDelivereds,
            totalCount: data.totalCount,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleShipmentModalOpen() {
    this.setState({
      ShipmentMdlbtn: true,
    });
  }
  handleShipmentModalClose() {
    this.setState({
      ShipmentMdlbtn: false,
    });
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
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
                columns={[
                  {
                    title: "Invoice no.",
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <div className="invoice-icon-cntr">
                            <img
                              src={
                                item.InvoiceNoIcon
                                  ? OrderShopingBlack
                                  : OrderBag
                              }
                              className={
                                item.InvoiceNoIcon
                                  ? "order-shoping"
                                  : "order-bag"
                              }
                            />
                          </div>
                          <p>{item.InvoiceNo}</p>
                          <Popover
                            content={
                              <>
                                <p className="shopping-num-invoice">
                                  Shopping bag No: <span>{item.InvoiceNo}</span>
                                </p>
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
                              </>
                            }
                            trigger="click"
                            overlayClassName="order-popover-table order-popover order-popover-invoice"
                            placement="bottomLeft"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderInfo} className="order-info" />
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
                    className: "order-desktop",
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
                    className: "order-desktop",
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
                                  {
                                    title: "AWB. No",
                                    dataIndex: "AWBNo",
                                  },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={this.state.itemPopupDate}
                              />
                            }
                            trigger="click"
                            overlayClassName="order-popover-table order-popover order-popover-table-big"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderHamb} className="order-hamb" />
                          </Popover>
                        </div>
                      );
                    },
                    width: 100,
                  },
                  {
                    title: "Amount",
                    dataIndex: "Amount",
                    width: 150,
                    className: "order-desktop",
                  },
                  {
                    title: "Status",
                    className:
                      "camp-status-header camp-status-header-statusFilter order-status-header order-desktop",
                    render: (row, item) => {
                      return (
                        <>
                          <p className="order-clr-blue">{item.Status}</p>
                          {item.selfPickUp && (
                            <p className="order-clr-orange">(Self Pickup)</p>
                          )}
                        </>
                      );
                    },
                    filterDropdown: (data, row) => {
                      return (
                        <div className="campaign-status-drpdwn">
                          <ul>
                            <li>
                              <input
                                type="checkbox"
                                id="Campall-status"
                                className="ch1"
                                // onChange={this.handleCheckCampAllStatus.bind(this)}
                                // checked={this.state.CheckBoxAllStatus}
                                name="CampallStatus"
                              />
                              <label htmlFor="Campall-status">
                                <span className="ch1-text">Ready to Ship</span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="New100"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={100}
                              />
                              <label htmlFor="New100">
                                <span className="ch1-text">Fresh</span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="Inproress101"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={101}
                              />
                              <label htmlFor="Inproress101">
                                <span className="ch1-text">
                                  Order Sync Pending
                                </span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="Inproress102"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={101}
                              />
                              <label htmlFor="Inproress102">
                                <span className="ch1-text">Complete</span>
                              </label>
                            </li>
                          </ul>
                          <div className="dv-status">
                            <button className="btn-apply-status">Apply</button>
                            <button className="btn-cancel-status">
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    },
                    filterDropdownVisible: this.state.filterOrderStatus,
                    onFilterDropdownVisibleChange: (visible) =>
                      this.setState({ filterOrderStatus: visible }),
                    filterIcon: (filtered) => (
                      <span
                        style={{ color: filtered ? "#1890ff" : undefined }}
                      ></span>
                    ),
                  },
                  {
                    title: "Shipping address",
                    render: (row, item) => {
                      return (
                        <>
                          <p
                            className={
                              item.Address === ""
                                ? "order-small-font d-inline-block"
                                : "order-small-font"
                            }
                          >
                            {item.Address === "" ? "—NIL—" : item.Address}
                          </p>
                          {item.Address === "" && (
                            <Popconfirm
                              title={
                                <>
                                  <div className="popover-input-cntr">
                                    <div>
                                      <p>Address</p>
                                      <textarea placeholder="Enter Address"></textarea>
                                    </div>
                                  </div>
                                  <div className="popover-radio-cntr">
                                    <div>
                                      <input
                                        type="radio"
                                        id="store-deli"
                                        name="address-options"
                                      />
                                      <label htmlFor="store-deli">
                                        Store Delivery
                                      </label>
                                    </div>
                                    <div>
                                      <input
                                        type="radio"
                                        id="self-picked"
                                        name="address-options"
                                      />
                                      <label htmlFor="self-picked">
                                        Self Picked up
                                      </label>
                                    </div>
                                  </div>
                                </>
                              }
                              overlayClassName="order-popover order-popover-butns order-popover-address"
                              placement="bottomRight"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                              icon={false}
                              okText="Save Address"
                            >
                              <p
                                style={{ cursor: "pointer" }}
                                className="order-small-font d-inline-block order-clr-blue ml-1"
                              >
                                (ADDRESS PENDING)
                              </p>
                            </Popconfirm>
                          )}
                        </>
                      );
                    },
                    className: "white-space-init order-desktop",
                  },
                  {
                    title: "Action",
                    render: (row, item) => {
                      return (
                        <div>
                          {item.Action === "Payment Done" && (
                            <Popover
                              content={
                                <div className="order-tab-popover">
                                  <div className="pay-done">
                                    <p>Mode of Payment:</p>
                                    <span>Online</span>
                                  </div>
                                  <div className="pay-done">
                                    <p>Total Amount:</p>
                                    <span>Rs. 9,294</span>
                                  </div>
                                  <div className="pay-done">
                                    <p>Payment via :</p>
                                    <span>
                                      <img
                                        src={CreditCard}
                                        alt="credit card icon"
                                        className="credit-card-icon"
                                      />
                                      Credit Card
                                    </span>
                                  </div>
                                </div>
                              }
                              trigger="click"
                              overlayClassName="order-popover order-popover-butns"
                              placement="bottomRight"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                            >
                              <button className="butn order-grid-butn order-grid-butn-green">
                                {item.Action}
                              </button>
                            </Popover>
                          )}
                          {item.Action === "Payment Pending" && (
                            <Popconfirm
                              title={
                                <div className="order-tab-popover">
                                  <div className="no-pay">
                                    <img src={NoPayment} alt="no payment" />
                                  </div>
                                  <p>Payment not completed yet</p>
                                </div>
                              }
                              overlayClassName="order-popover order-popover-butns order-popover-no-pay"
                              placement="bottomRight"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                              icon={false}
                              okText="Sent Link Again"
                            >
                              <button className="butn order-grid-butn">
                                {item.Action}
                              </button>
                            </Popconfirm>
                          )}
                        </div>
                      );
                    },
                  },
                ]}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                }}
                expandedRowRender={(row) => {
                  return (
                    <div className="order-expanded-cntr">
                      <div className="row">
                        <div className="col-6">
                          <p className="order-expanded-title">Customer</p>
                          <p>{row.CustomerName},</p>
                          <p className="order-small-font">
                            {row.CustomerNumber}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="order-expanded-title">Status</p>
                          <p className="order-clr-blue">{row.Status}</p>
                          {row.selfPickUp && (
                            <p className="order-clr-orange">(Self Pickup)</p>
                          )}
                        </div>
                        <div className="col-6">
                          <p className="order-expanded-title">Amount</p>
                          <p>{row.Amount}</p>
                        </div>
                        <div className="col-6">
                          <p className="order-expanded-title">Date</p>
                          <p>{row.Date}</p>
                          <p className="order-small-font">{row.Time}</p>
                        </div>
                        <div className="col-12">
                          <p className="order-expanded-title">
                            Shipping Address
                          </p>
                          <p
                            className={
                              row.Address === "" ? "d-inline-block" : ""
                            }
                          >
                            {row.Address === "" ? "—NIL—" : row.Address}
                          </p>
                          {row.Address === "" && (
                            <Popconfirm
                              title={
                                <>
                                  <div className="popover-input-cntr">
                                    <div>
                                      <p>Address</p>
                                      <textarea placeholder="Enter Address"></textarea>
                                    </div>
                                  </div>
                                  <div className="popover-radio-cntr">
                                    <div>
                                      <input
                                        type="radio"
                                        id="store-deli"
                                        name="address-options"
                                      />
                                      <label htmlFor="store-deli">
                                        Store Delivery
                                      </label>
                                    </div>
                                    <div>
                                      <input
                                        type="radio"
                                        id="self-picked"
                                        name="address-options"
                                      />
                                      <label htmlFor="self-picked">
                                        Self Picked up
                                      </label>
                                    </div>
                                  </div>
                                </>
                              }
                              overlayClassName="order-popover order-popover-butns order-popover-address"
                              placement="bottomRight"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                              icon={false}
                              okText="Save Address"
                            >
                              <p
                                style={{ cursor: "pointer" }}
                                className="order-small-font d-inline-block order-clr-blue ml-1"
                              >
                                (ADDRESS PENDING)
                              </p>
                            </Popconfirm>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }}
                showSizeChanger={true}
                onShowSizeChange={true}
                dataSource={this.state.orderGridData}
                expandIconColumnIndex={7}
                expandIconAsCell={false}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="shipment-tab"
            role="tabpanel"
            aria-labelledby="shipment-tab"
          >
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                columns={[
                  {
                    title: "Invoice no.",
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <p>{item.InvoiceNo}</p>
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
                                  {
                                    title: "AWB. No",
                                    dataIndex: "AWBNo",
                                  },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={this.state.itemPopupDate}
                              />
                            }
                            trigger="click"
                            overlayClassName="order-popover-table order-popover order-popover-table-big"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderHamb} className="order-hamb" />
                          </Popover>
                        </div>
                      );
                    },
                    width: 100,
                  },
                  {
                    title: "Shipping address",
                    render: (row, item) => {
                      return (
                        <p className="order-small-font">
                          {item.Address === "" ? "—NIL—" : item.Address}
                        </p>
                      );
                    },
                    width: 250,
                    className: "white-space-init",
                  },
                  {
                    title: "Delivery Type",
                    dataIndex: "DeliveryTyper",
                    width: 150,
                  },
                  {
                    title: "Status",
                    className:
                      "camp-status-header camp-status-header-statusFilter",
                    render: (row, item) => {
                      return (
                        <>
                          <p className="order-clr-blue">{item.Status}</p>
                          {item.selfPickUp && (
                            <p className="order-clr-orange">(Self Pickup)</p>
                          )}
                        </>
                      );
                    },
                    filterDropdown: (data, row) => {
                      return (
                        <div className="campaign-status-drpdwn">
                          <ul>
                            <li>
                              <input
                                type="checkbox"
                                id="Campall-status"
                                className="ch1"
                                // onChange={this.handleCheckCampAllStatus.bind(this)}
                                // checked={this.state.CheckBoxAllStatus}
                                name="CampallStatus"
                              />
                              <label htmlFor="Campall-status">
                                <span className="ch1-text">
                                  Shipment Assigned
                                </span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="New100"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={100}
                              />
                              <label htmlFor="New100">
                                <span className="ch1-text">
                                  Assign Shipment
                                </span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="Inproress101"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={101}
                              />
                              <label htmlFor="Inproress101">
                                <span className="ch1-text">
                                  Shipment Delivered
                                </span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="Inproress102"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={101}
                              />
                              <label htmlFor="Inproress102">
                                <span className="ch1-text">
                                  Shipment Pickedup
                                </span>
                              </label>
                            </li>
                          </ul>
                          <div className="dv-status">
                            <button className="btn-apply-status">Apply</button>
                            <button className="btn-cancel-status">
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    },
                    filterDropdownVisible: this.state.filterShipmentStatus,
                    onFilterDropdownVisibleChange: (visible) =>
                      this.setState({ filterShipmentStatus: visible }),
                    filterIcon: (filtered) => (
                      <span
                        style={{ color: filtered ? "#1890ff" : undefined }}
                      ></span>
                    ),
                  },
                  {
                    title: "Partner",
                    dataIndex: "Partner",
                    width: 150,
                  },
                  {
                    title: "Action",
                    render: (row, item) => {
                      return (
                        <div>
                          {item.Action === "Pickup Pending" ? (
                            <>
                              <Popover
                                overlayClassName="pickuppendingcustom"
                                content={
                                  <div className="pickuppending-table">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <label>Pickup Date:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                            />
                                          </td>
                                          <td>
                                            <label>Pickup Time:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <label>Pickup Done</label>
                                            <button
                                              type="button"
                                              className="popbtn"
                                            >
                                              Yes
                                            </button>
                                          </td>
                                          <td>
                                            <label
                                              style={{ visibility: "hidden" }}
                                            >
                                              Pickup Done
                                            </label>
                                            <button
                                              type="button"
                                              className="popbtnno"
                                            >
                                              No
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                }
                                trigger="click"
                                overlayClassName="order-popover order-popover-butns"
                                placement="bottomRight"
                                // onVisibleChange={(visible) =>
                                //   this.setState({ orderPopoverOverlay: visible })
                                // }
                              >
                                <button
                                  className={
                                    item.Action === "Payment Done"
                                      ? "butn order-grid-butn order-grid-butn-green"
                                      : "butn order-grid-butn"
                                  }
                                >
                                  {item.Action}
                                  <Popover content={<p>hi</p>}></Popover>
                                </button>
                              </Popover>
                            </>
                          ) : (
                            <button
                              className={
                                item.Action === "Payment Done"
                                  ? "butn order-grid-butn order-grid-butn-green"
                                  : "butn order-grid-butn"
                              }
                              type="button"
                              onClick={this.handleShipmentModalOpen.bind(this)}
                            >
                              {item.Action}
                            </button>
                          )}
                        </div>
                      );
                    },
                  },
                ]}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                showSizeChanger={true}
                onShowSizeChange={true}
                dataSource={this.state.ShipmentGridData}
              />
              <Modal
                open={this.state.ShipmentMdlbtn}
                onClose={this.handleShipmentModalClose.bind(this)}
                center
                modalId="article-popup"
                overlayId="logout-ovrly"
              >
                <div className="">
                  <img
                    src={CancelImg}
                    alt="cancelImg"
                    className="cancalImg"
                    onClick={this.handleShipmentModalClose.bind(this)}
                  />
                  <input type="checkbox" style={{position:"absolute",top:"48px",left: "40px"}}/>
                  <input type="checkbox" style={{position:"absolute",top:"48px",left: "211px"}}/>
                  <div className="step-progress">
                    <StepZilla
                      steps={steps}
                      //startAtStep={3}
                      stepsNavigation={false}
                      backButtonText="Cancel"
                      nextButtonText="Save / Next"
                      onStepChange={this.handleChange}
                    />
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="delivered-tab"
            role="tabpanel"
            aria-labelledby="delivered-tab"
          >
            <div className="table-cntr store dv-delivered">
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                columns={[
                  {
                    title: "Invoice no.",
                    dataIndex: "invoiceNo",
                  },
                  {
                    title: "Customer",
                    render: (row, item) => {
                      return (
                        <div>
                          <p>{item.customerName},</p>
                          <p className="order-small-font">
                            {item.mobileNumber}
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
                          <p>{item.orderDeliveredItems.length}</p>
                          <Popover
                            content={
                              <Table
                                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                columns={[
                                  {
                                    title: "Item ID",
                                    dataIndex: "itemID",
                                  },
                                  {
                                    title: "Item Name",
                                    dataIndex: "itemName",
                                    width: 150,
                                  },
                                  {
                                    title: "Item Price",
                                    dataIndex: "itemPrice",
                                  },
                                  {
                                    title: "Quantity",
                                    dataIndex: "quantity",
                                  },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={item.orderDeliveredItems}
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
                          <p>{item.date}</p>
                          <p className="order-small-font">{item.time}</p>
                        </div>
                      );
                    },
                  },
                  {
                    title: "Status",
                    className:
                      "camp-status-header camp-status-header-statusFilter",
                    render: (row, item) => {
                      return (
                        <div className="d-flex align-items-center">
                          <p className="deliv-status">{item.statusName}</p>
                        </div>
                      );
                    },
                    filterDropdown: (data, row) => {
                      return (
                        <div className="campaign-status-drpdwn">
                          <ul>
                            <li>
                              <input
                                type="checkbox"
                                id="Campall-status"
                                className="ch1"
                                // onChange={this.handleCheckCampAllStatus.bind(this)}
                                // checked={this.state.CheckBoxAllStatus}
                                name="CampallStatus"
                              />
                              <label htmlFor="Campall-status">
                                <span className="ch1-text">Delivered</span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="New100"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={100}
                              />
                              <label htmlFor="New100">
                                <span className="ch1-text">RTO</span>
                              </label>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                id="Inproress101"
                                className="ch1"
                                // onChange={this.handleCheckCampIndividualStatus.bind(
                                //   this
                                // )}
                                name="CampallStatus"
                                attrIds={101}
                              />
                              <label htmlFor="Inproress101">
                                <span className="ch1-text">Self Picked</span>
                              </label>
                            </li>
                          </ul>
                          <div className="dv-status">
                            <button className="btn-apply-status">Apply</button>
                            <button className="btn-cancel-status">
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    },
                    filterDropdownVisible: this.state
                      .filterOrderDeliveredStatus,
                    onFilterDropdownVisibleChange: (visible) =>
                      this.setState({ filterOrderDeliveredStatus: visible }),
                    filterIcon: (filtered) => (
                      <span
                        style={{ color: filtered ? "#1890ff" : undefined }}
                      ></span>
                    ),
                  },
                  {
                    title: "Action",
                    render: (row, item) => {
                      return (
                        <div className="d-flex">
                          <button
                            className={
                              item.actionTypeName === "Delivered"
                                ? "delibutn deliv-grid-butn"
                                : item.actionTypeName === "Mark As Delivered"
                                ? "markasbutn deliv-grid-butn"
                                : "pickedbutn deliv-grid-butn"
                            }
                          >
                            {item.actionTypeName}
                            {/* {item.statusName === "Delivered"
                              ? "Delivered"
                              : item.statusName === "RTO"
                                ? "Mark As Delivered"
                                : "Picked"} */}
                          </button>
                        </div>
                      );
                    },
                  },
                ]}
                pagination={false}
                showSizeChanger={true}
                onShowSizeChange={true}
                dataSource={this.state.deliveredGridData}
              />
              <Pagination
                currentPage={this.state.childCurrentPage}
                totalSize={this.state.totalCount}
                // totalSize={row.customerCount}
                sizePerPage={this.state.ChildPostsPerPage}
                changeCurrentPage={this.PaginationOnChange}
                theme="bootstrap"
              />
              <div className="position-relative">
                <div className="item-selection Camp-pagination">
                  <select
                    value={this.state.ChildPostsPerPage}
                    onChange={this.handlePageItemchange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                  <p>Items per page</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="shipment-assigned-tab"
            role="tabpanel"
            aria-labelledby="shipment-assigned-tab"
          >
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                columns={[
                  {
                    title: "AWS No.",
                    dataIndex: "AWSNo",
                  },
                  {
                    title: "Invoice No.",
                    dataIndex: "InvoiceNo",
                  },
                  {
                    title: "Courier Partner",
                    dataIndex: "CourierPartner",
                  },
                  {
                    title: "Reference No.",
                    dataIndex: "ReferenceNo",
                    render: (row, item) => {
                      return (
                        <div className="d-flex">
                          {item.AWSNo !== "NIL" ? (
                            item.ReferenceNo !== "" ? (
                              <button className="btn-ref deliv-grid-butn">
                                {item.ReferenceNo}
                              </button>
                            ) : (
                              <button className="btn-ref deliv-grid-butn">
                                <input
                                  type="text"
                                  className="enterpod"
                                  placeholder="Enter POD"
                                />
                              </button>
                            )
                          ) : (
                            <Popover
                              content={
                                <div className="staffdetailspopup">
                                  <label>Store Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Store Name"
                                  />
                                  <label>Staff Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Staff Name"
                                  />
                                  <label>Mobile No.</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Mobile No."
                                  />
                                  <button type="button" className="popbtnno">
                                    Cancel
                                  </button>
                                  <button type="button" className="popbtn">
                                    Done
                                  </button>
                                </div>
                              }
                              trigger="click"
                              overlayClassName="order-popover-table order-popover"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                            >
                              <button className="btn-ref deliv-grid-butn">
                                Staff Details
                              </button>
                            </Popover>
                          )}
                        </div>
                      );
                    },
                  },
                  {
                    title: "Action",
                    render: (row, item) => {
                      return item.ReferenceNo === "" ? (
                        <div className="d-flex">
                          <button className="btn-proc deliv-grid-butn">
                            Proceed
                          </button>
                        </div>
                      ) : null;
                    },
                  },
                ]}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                showSizeChanger={true}
                onShowSizeChange={true}
                dataSource={this.state.shipmentAssignedGridData}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const steps = [
  { name: "Article Mapping", component: <Step1 /> },
  { name: "Airway Bill No", component: <Step2 /> },
];

function Step1(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="article-body">
            <span>
              Item id shown below mapped to this Order <b>334335</b> only.
              <br />
              Select any item id, you want to send for shipment.
            </span>
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table order-popover-table"
              columns={[
                {
                  title: "Item ID",
                  dataIndex: "itemID",
                },
                {
                  title: "Item Name",
                  dataIndex: "itemName",
                  width: 150,
                },
                {
                  title: "Item Price",
                  dataIndex: "itemPrice",
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                },
              ]}
              scroll={{ y: 240 }}
              pagination={false}
              // dataSource={item.orderDeliveredItems}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
function Step2(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="text-center airwaybox">
            <div className="airwaycontent">
              <img src={CardTick} alt="CardTick" className="cardtick" />
              <h2>AWB No - 889676467</h2>
              <p>Successfully mapped to</p>
              <ul>
                <li>Invoice No - 909676467</li>
                <li>Item ID - 9096 7646 7990</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Orders;
