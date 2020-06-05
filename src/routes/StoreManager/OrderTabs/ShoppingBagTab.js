import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm, Select } from "antd";
import Modal from "react-responsive-modal";
import NoPayment from "./../../../assets/Images/no-payment.png";
import CreditCard from "./../../../assets/Images/credit-card.png";
import OrderInfo from "./../../../assets/Images/order-info.png";
import OrderShopingBlack from "./../../../assets/Images/order-shoping-black.png";
import OrderBag from "./../../../assets/Images/order-bag.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import OrderDel from "./../../../assets/Images/order-del.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";

class ShoppingBagTab extends Component {
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
      filterShoppingStatus: false,
      orderPopoverOverlay: false,
      filterShoppingDeliveryType: false,
    };
  }

  render() {
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
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
                      <p className="order-small-font">{item.CustomerNumber}</p>
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
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p
                        className={
                          item.Status === "Cancelled" ? "order-clr-pink" : ""
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
                            <span className="ch1-text">New</span>
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
                            <span className="ch1-text">Cancelled</span>
                          </label>
                        </li>
                      </ul>
                      <div className="dv-status">
                        <button className="btn-apply-status">Apply</button>
                        <button className="btn-cancel-status">Cancel</button>
                      </div>
                    </div>
                  );
                },
                filterDropdownVisible: this.state.filterShoppingStatus,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterShoppingStatus: visible }),
                filterIcon: (filtered) => (
                  <span
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  ></span>
                ),
              },
              {
                title: "Delivery type",
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header shopping-delivery-header",
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
                            <span className="ch1-text">Store Delivery</span>
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
                            <span className="ch1-text">Self Picked Up</span>
                          </label>
                        </li>
                      </ul>
                      <div className="dv-status">
                        <button className="btn-apply-status">Apply</button>
                        <button className="btn-cancel-status">Cancel</button>
                      </div>
                    </div>
                  );
                },
                filterDropdownVisible: this.state.filterShoppingDeliveryType,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterShoppingDeliveryType: visible }),
                filterIcon: (filtered) => (
                  <span
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  ></span>
                ),
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
                          <p className="order-clr-blue">{item.PickupDate},</p>
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
                      <Popconfirm
                        title={
                          <>
                            <div className="popover-input-cntr">
                              <div>
                                <p>Order Id</p>
                                <input
                                  type="text"
                                  placeholder="Enter Order Id"
                                />
                              </div>
                              <div>
                                <p>Amount</p>
                                <input type="text" placeholder="Enter Amount" />
                              </div>
                            </div>
                          </>
                        }
                        overlayClassName="order-popover order-popover-butns"
                        placement="bottomRight"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                        icon={false}
                        okText="Done"
                      >
                        <button className="butn order-grid-butn">
                          Convert to Order
                        </button>
                      </Popconfirm>
                      <Popconfirm
                        title={
                          <>
                            <div className="popover-input-cntr">
                              <div>
                                <p>Comment</p>
                                <textarea placeholder="Enter Comment"></textarea>
                              </div>
                            </div>
                          </>
                        }
                        overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                        placement="bottomRight"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                        icon={false}
                        okText="Remove"
                      >
                        <button className="butn order-grid-butn order-del-butn">
                          <img src={OrderDel} alt="delete icon" />
                        </button>
                      </Popconfirm>
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
      </>
    );
  }
}

export default ShoppingBagTab;
