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
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";

class OrderTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      filterOrderStatus: false,
      orderPopoverOverlay: false,
    };
  }

  componentDidMount() {
    // this.handleGetOrderTabGridData();
  }

  handleGetOrderTabGridData() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrdersDetails",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            orderGridData: data,
          });
        } else {
          self.setState({
            orderGridData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
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
                            item.InvoiceNoIcon ? OrderShopingBlack : OrderBag
                          }
                          className={
                            item.InvoiceNoIcon ? "order-shoping" : "order-bag"
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
                      <p className="order-small-font">{item.CustomerNumber}</p>
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
                            <span className="ch1-text">Order Sync Pending</span>
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
                        <button className="btn-cancel-status">Cancel</button>
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
            expandedRowRender={(row) => {
              return (
                <div className="order-expanded-cntr">
                  <div className="row">
                    <div className="col-6">
                      <p className="order-expanded-title">Customer</p>
                      <p>{row.CustomerName},</p>
                      <p className="order-small-font">{row.CustomerNumber}</p>
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
                      <p className="order-expanded-title">Shipping Address</p>
                      <p className={row.Address === "" ? "d-inline-block" : ""}>
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
            pagination={false}
            dataSource={this.state.orderGridData}
            expandIconColumnIndex={7}
            expandIconAsCell={false}
          />
        </div>
      </>
    );
  }
}

export default OrderTab;
