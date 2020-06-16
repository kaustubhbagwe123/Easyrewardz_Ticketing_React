import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm } from "antd";
import Modal from "react-responsive-modal";
import NoPayment from "./../../../assets/Images/no-payment.png";
import CreditCard from "./../../../assets/Images/credit-card.png";
import OrderInfo from "./../../../assets/Images/order-info.png";
import OrderShopingBlack from "./../../../assets/Images/order-shoping-black.png";
import OrderBag from "./../../../assets/Images/order-bag.png";
import OrderShopingGreen from "./../../../assets/Images/green-icon.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { NotificationManager } from "react-notifications";

class OrderTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderGridData: [],
      itemPopupDate: [],
      filterOrderStatus: false,
      orderPopoverOverlay: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      strStatus: "",
      OrderTabLoading: false,
      translateLanguage: {},
      shippingAddress: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
      storePinCode: "",
      PincodeMdl: false,
      orderId: 0,
      AddressConf: false,
    };
  }

  componentDidMount() {
    this.handleGetOrderTabGridData();
    this.handleGetOrderStatusFilterData();
    this.handleGetCheckServiceData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  ////   -------------------API Function start-------------------------------
  /// handle Get Order Tab Grid Data
  handleGetOrderTabGridData(filter) {
    debugger;
    let self = this;
    this.setState({
      OrderTabLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrdersDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              orderGridData: data.ordersList,
              totalCount: data.totalCount,
              filterOrderStatus: false,
              OrderTabLoading: false,
            });
          } else {
            self.setState({
              orderGridData: [],
              totalCount: 0,
              filterOrderStatus: false,
              OrderTabLoading: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              orderGridData: data.ordersList,
              totalCount: data.totalCount,
              OrderTabLoading: false,
            });
          } else {
            self.setState({
              orderGridData: [],
              totalCount: 0,
              OrderTabLoading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Order status filter data
  handleGetOrderStatusFilterData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 2,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            statusFilterData: data,
          });
        } else {
          self.setState({
            statusFilterData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Sent Payment Link
  handleSentPaymentLink(item) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GeneratePaymentLink",
      headers: authHeader(),
      data: {
        InvoiceNumber: item.invoiceNo,
        StoreCode: item.storeCode,
        SentPaymentLinkCount: item.countSendPaymentLink,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetOrderTabGridData();
          NotificationManager.success("Link Send Successfully.");
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Check service data
  handleGetCheckServiceData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetStorePinCodeByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            storePinCode: data,
          });
        } else {
          self.setState({
            storePinCode: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Submit Check service data
  handleUpdateCheckServiceData(ordId) {
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/CheckCourierAvailibilty",
      headers: authHeader(),
      data: {
        Pickup_postcode: parseInt(this.state.storePinCode),
        Delivery_postcode: parseInt(this.state.pincode),
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.responseData.available;
        if (status === "false") {
          self.setState({
            PincodeMdl: true,
            orderId: ordId,
          });
        } else {
          self.setState({
            PincodeMdl: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSetOrderHasBeenReturn() {
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/SetOrderHasBeenReturn",
      headers: authHeader(),
      params: {
        orderID: this.state.orderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            PincodeMdl: false,
          });
          self.handleGetOrderTabGridData();
        } else {
          self.setState({
            PincodeMdl: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///-------------------API function end--------------------------------

  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetOrderTabGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
    });

    this.handleGetOrderTabGridData();
  };
  /// handle check individual status
  handleCheckDeliIndividualStatus() {
    debugger;
    var checkboxes = document.getElementsByName("orderStatus");
    var strStatus = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strStatus += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      strStatus,
    });
  }

  handleUpdateAddressPending(orderId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateAddressPending",
      headers: authHeader(),
      data: {
        OrderID: orderId,
        ShipmentAddress: this.state.shippingAddress,
        Landmark: this.state.landmark,
        PinCode: this.state.pincode,
        City: this.state.city,
        State: this.state.state,
        Country: this.state.country,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetOrderTabGridData();
          self.setState({
            orderId: 0,
            AddressConf: false,
          });
          NotificationManager.success("Record Updated Successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAddressPending(orderId) {
    debugger;
    if (this.state.shippingAddress === "") {
      NotificationManager.error("Please enter address.");
      return false;
    }

    if (this.state.pincode === "") {
      NotificationManager.error("Please enter pincode.");
      return false;
    } else {
      if (this.state.pincode.length < 6) {
        NotificationManager.error("Please enter 6 digits pincode");
        return false;
      }
    }

    if (this.state.city === "") {
      NotificationManager.error("Please enter city.");
      return false;
    }

    if (this.state.state === "") {
      NotificationManager.error("Please enter state.");
      return false;
    }

    if (this.state.country === "") {
      NotificationManager.error("Please enter country.");
      return false;
    }

    this.setState({
      orderId: orderId,
      AddressConf: true,
    });
  }
  handleTextOnchage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /// handle Pin code change
  handlePinCodeCheck(ordId, e) {
    debugger;
    var reg = /^[0-9\b]+$/;

    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ pincode: e.target.value });
    } else {
      e.target.value = "";
    }
    if (this.state.pincode.length === 5) {
      setTimeout(() => {
        this.handleUpdateCheckServiceData(ordId);
      }, 100);
    }
  }

  ///handle Pin code modla close
  handlePincodeMdlModalClose() {
    this.setState({
      PincodeMdl: false,
      pincode: "",
    });
  }

  handleAddressMdlModalClose() {
    this.setState({
      AddressConf: false,
    });
  }
  /// handle Close Status filter
  handleCloseStatusFilter() {
    this.setState({
      filterOrderStatus: false,
    });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store dv-table-paging">
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
            columns={[
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.invoiceno
                    : "Invoice no.",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <div className="invoice-icon-cntr">
                        <img
                          src={
                            item.sourceOfOrder === "FTP"
                              ? OrderShopingGreen
                              : item.sourceOfOrder === "POS"
                              ? OrderBag
                              : item.sourceOfOrder === "Wbot"
                              ? OrderShopingBlack
                              : null
                          }
                          className={
                            item.sourceOfOrder === "FTP"
                              ? "order-shoping"
                              : item.sourceOfOrder === "POS"
                              ? "order-bag"
                              : item.sourceOfOrder === "Wbot"
                              ? "order-shoping"
                              : null
                          }
                        />
                      </div>
                      <p>{item.invoiceNo}</p>
                      {item.isShoppingBagConverted === true && (
                        <Popover
                          content={
                            <>
                              <p className="shopping-num-invoice">
                                Shopping bag No:{" "}
                                <span>{item.shoppingBagNo}</span>
                              </p>
                              <Table
                                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.itemid
                                        : "Item ID",
                                    dataIndex: "itemID",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.itemname
                                        : "Item Name",
                                    dataIndex: "itemName",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.itemprice
                                        : "Item Price",
                                    dataIndex: "itemPrice",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.quantity
                                        : "Quantity",
                                    dataIndex: "quantity",
                                  },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={
                                  item.shoppingBagItemList.length > 0
                                    ? item.shoppingBagItemList
                                    : []
                                }
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
                      )}
                    </div>
                  );
                },
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.date
                    : "Date",
                render: (row, item) => {
                  return (
                    <div>
                      <p>{item.date}</p>
                      <p className="order-small-font">{item.time}</p>
                    </div>
                  );
                },
                className: "order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.customer
                    : "Customer",
                render: (row, item) => {
                  return (
                    <div>
                      <p>{item.customerName},</p>
                      <p className="order-small-font">{item.mobileNumber}</p>
                    </div>
                  );
                },
                className: "order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.items
                    : "Items",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>
                        {item.ordersItemList.length > 0
                          ? item.ordersItemList.length
                          : "-NIL-"}
                      </p>
                      {item.ordersItemList.length > 0 ? (
                        <>
                          <Popover
                            content={
                              <Table
                                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.itemid
                                        : "Item ID",
                                    dataIndex: "itemID",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.itemname
                                        : "Item Name",
                                    dataIndex: "itemName",
                                    // width: 150,
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.itemprice
                                        : "Item Price",
                                    dataIndex: "itemPrice",
                                    className: "order-desktop",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.quantity
                                        : "Quantity",
                                    dataIndex: "quantity",
                                    className: "order-desktop",
                                  },
                                  {
                                    title: "Item Price/ Quantity",
                                    className: "order-mobile pick-up-date",
                                    render: (row, item) => {
                                      return (
                                        <p>
                                          {item.itemPrice}/ {item.quantity}
                                        </p>
                                      );
                                    },
                                  },
                                  // {
                                  //   title: "AWB. No",
                                  //   dataIndex: "itemID",
                                  // },
                                ]}
                                scroll={{ y: 240 }}
                                pagination={false}
                                dataSource={item.ordersItemList}
                              />
                            }
                            trigger="click"
                            placement="bottom"
                            overlayClassName="order-popover-table order-popover order-popover-table-big"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderHamb} className="order-hamb" />
                          </Popover>
                        </>
                      ) : null}
                    </div>
                  );
                },
                width: 100,
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.amount
                    : "Amount",
                dataIndex: "amount",
                width: 150,
                className: "order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.status
                    : "Status",
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header order-desktop",
                render: (row, item) => {
                  return (
                    <>
                      <p>{item.statusName}</p>
                      {/* {item.selfPickUp && (
                        <p className="order-clr-orange">(Self Pickup)</p>
                      )} */}
                    </>
                  );
                },
                filterDropdown: (data, row) => {
                  return (
                    <div className="campaign-status-drpdwn">
                      <ul>
                        {this.state.statusFilterData !== null &&
                          this.state.statusFilterData.map((item, b) => (
                            <li key={b}>
                              <input
                                type="checkbox"
                                id={"New" + item.statusID}
                                className="ch1"
                                onChange={this.handleCheckDeliIndividualStatus.bind(
                                  this
                                )}
                                // checked={this.state.CheckBoxAllStatus}
                                name="orderStatus"
                                attrIds={item.statusID}
                              />
                              <label htmlFor={"New" + item.statusID}>
                                <span className="ch1-text">
                                  {item.statusName}
                                </span>
                              </label>
                            </li>
                          ))}
                      </ul>
                      <div className="dv-status">
                        <button
                          className="btn-apply-status"
                          onClick={this.handleGetOrderTabGridData.bind(
                            this,
                            "filter"
                          )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.apply
                            : "Apply"}
                        </button>
                        <button
                          className="btn-cancel-status"
                          onClick={this.handleCloseStatusFilter.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.cancel
                            : "Cancel"}
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
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.shippingaddress
                    : "Shipping address",
                render: (row, item) => {
                  return (
                    <>
                      <p
                        className={
                          item.shippingAddress === "-NIL-"
                            ? "order-small-font d-inline-block"
                            : "order-small-font"
                        }
                      >
                        {item.shippingAddress}
                      </p>
                      {item.shippingAddress === "-NIL-" && (
                        <Popconfirm
                          title={
                            <>
                              <div className="popover-input-cntr">
                                <div>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.address
                                      : "Address"}
                                  </p>
                                  <textarea
                                    placeholder="Enter Address"
                                    name="shippingAddress"
                                    onChange={this.handleTextOnchage}
                                  ></textarea>
                                </div>
                                <div>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.landmark
                                      : "Landmark"}
                                  </p>
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.placeholder
                                            .enterlandmark
                                        : "Enter Landmark"
                                    }
                                    name="landmark"
                                    onChange={this.handleTextOnchage}
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.landmark
                                        : "Pin Code"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .enterpincode
                                          : "Enter Pin Code"
                                      }
                                      name="pincode"
                                      autoComplete="off"
                                      maxLength={6}
                                      value={this.state.pincode}
                                      onChange={this.handlePinCodeCheck.bind(
                                        this,
                                        item.id
                                      )}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.city
                                        : "City"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .entercity
                                          : "Enter City"
                                      }
                                      name="city"
                                      onChange={this.handleTextOnchage}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.state
                                        : "State"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder="Enter State"
                                      name="state"
                                      onChange={this.handleTextOnchage}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.country
                                        : "Country"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .entercountry
                                          : "Enter Country"
                                      }
                                      name="country"
                                      onChange={this.handleTextOnchage}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="popover-radio-cntr">
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
                              </div> */}
                            </>
                          }
                          overlayClassName="order-popover order-popover-butns order-popover-address"
                          placement="bottomRight"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                          icon={false}
                          okText="Save Address"
                          onConfirm={this.handleAddressPending.bind(
                            this,
                            item.id
                          )}
                          cancelText="Cancel"
                        >
                          <p
                            style={{ cursor: "pointer" }}
                            className="order-small-font d-inline-block order-clr-blue ml-1"
                          >
                            (
                            {TranslationContext !== undefined
                              ? TranslationContext.p.addresspending
                              : "ADDRESS PENDING"}
                            )
                          </p>
                        </Popconfirm>
                      )}
                    </>
                  );
                },
                className: "white-space-init order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.actions
                    : "Action",
                render: (row, item) => {
                  return (
                    <div>
                      {item.actionTypeName === "Payment Details" && (
                        <Popover
                          content={
                            <div className="order-tab-popover">
                              <div className="pay-done">
                                <p>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.p.modeofpayment
                                    : "Mode of Payment"}
                                  :
                                </p>
                                <span>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.online
                                    : "Online"}
                                </span>
                              </div>
                              <div className="pay-done">
                                <p>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.p.totalamount
                                    : "Total Amount"}
                                  :
                                </p>
                                <span>{item.amount}</span>
                              </div>
                              <div className="pay-done">
                                <p>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.p.paymentvia
                                    : "Payment via "}
                                  :
                                </p>
                                <span>
                                  <img
                                    src={CreditCard}
                                    alt="credit card icon"
                                    className="credit-card-icon"
                                  />
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.creditcard
                                    : "Credit Card"}
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
                            {item.actionTypeName}
                          </button>
                        </Popover>
                      )}
                      {item.actionTypeName === "Collect Payment" && (
                        <Popconfirm
                          title={
                            <div className="order-tab-popover">
                              <div className="no-pay">
                                <img src={NoPayment} alt="no payment" />
                              </div>
                              <p>
                                {TranslationContext !== undefined
                                  ? TranslationContext.p.paymentnotcompletedyet
                                  : "Payment not completed yet"}
                              </p>
                            </div>
                          }
                          overlayClassName="order-popover order-popover-butns order-popover-no-pay"
                          placement="bottomRight"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                          icon={false}
                          okText={
                            item.countSendPaymentLink === 0
                              ? "Send Link"
                              : "Send Link Again"
                          }
                          onConfirm={this.handleSentPaymentLink.bind(
                            this,
                            item
                          )}
                          disabled={item.disablePaymentlinkbutton}
                        >
                          <button
                            className={
                              item.showPaymentLinkPopup
                                ? "butn order-grid-butn"
                                : "butn order-grid-butn disabled-link"
                            }
                          >
                            {item.actionTypeName}
                          </button>
                        </Popconfirm>
                      )}
                      {item.actionTypeName === "Sync Order" && (
                        <button className="butn order-grid-butn order-grid-butn-yellow">
                          {item.actionTypeName}
                        </button>
                      )}
                      {item.actionTypeName === "Get Address" && (
                        <button className="butn order-grid-butn pickedbutn">
                          {item.actionTypeName}
                        </button>
                      )}
                      {item.actionTypeName === "Ready to Ship" && (
                        <button className="butn order-grid-butn delibutn">
                          {item.actionTypeName}
                        </button>
                      )}
                    </div>
                  );
                },
              },
            ]}
            ///Mobile view
            expandedRowRender={(row) => {
              return (
                <div className="order-expanded-cntr">
                  <div className="row">
                    <div className="col-6">
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.customer
                          : "Customer"}
                      </p>
                      <p>{row.customerName},</p>
                      <p className="order-small-font">{row.mobileNumber}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.status
                          : "Status"}
                      </p>
                      <p className="order-clr-blue">{row.statusName}</p>
                      {/* {row.selfPickUp && (
                        <p className="order-clr-orange">(Self Pickup)</p>
                      )} */}
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.amount
                          : "Amount"}
                      </p>
                      <p>{row.amount}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.date
                          : "Date"}
                      </p>
                      <p>{row.date}</p>
                      <p className="order-small-font">{row.time}</p>
                    </div>
                    <div className="col-12">
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.shippingaddress
                          : "Shipping Address"}
                      </p>
                      <p
                        className={
                          row.shippingAddress === "-NIL-"
                            ? "d-inline-block"
                            : ""
                        }
                      >
                        {row.shippingAddress}
                      </p>
                      {row.shippingAddress === "-NIL-" && (
                        <Popconfirm
                          title={
                            <>
                              <div className="popover-input-cntr">
                                <div>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.address
                                      : "Address"}
                                  </p>
                                  <textarea
                                    placeholder="Enter Address"
                                    name="shippingAddress"
                                    onChange={this.handleTextOnchage}
                                  ></textarea>
                                </div>
                                <div>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.landmark
                                      : "Landmark"}
                                  </p>
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.placeholder
                                            .enterlandmark
                                        : "Enter Landmark"
                                    }
                                    name="landmark"
                                    onChange={this.handleTextOnchage}
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.pincode
                                        : "Pin Code"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .enterpincode
                                          : "Enter Pin Code"
                                      }
                                      name="pincode"
                                      autoComplete="off"
                                      maxLength={6}
                                      value={this.state.pincode}
                                      onChange={this.handlePinCodeCheck.bind(
                                        this,
                                        row.id
                                      )}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.city
                                        : "City"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .entercity
                                          : "Enter City"
                                      }
                                      name="city"
                                      onChange={this.handleTextOnchage}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.state
                                        : "State"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .enterstate
                                          : "Enter State"
                                      }
                                      name="state"
                                      onChange={this.handleTextOnchage}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.country
                                        : "Country"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                              .entercountry
                                          : "Enter Country"
                                      }
                                      name="country"
                                      onChange={this.handleTextOnchage}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="popover-radio-cntr">
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
                              </div> */}
                            </>
                          }
                          overlayClassName="order-popover order-popover-butns order-popover-address"
                          placement="topLeft"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                          icon={false}
                          okText="Save Address"
                          onConfirm={this.handleAddressPending.bind(
                            this,
                            row.id
                          )}
                        >
                          <p
                            style={{ cursor: "pointer" }}
                            className="order-small-font d-inline-block order-clr-blue ml-1"
                          >
                            (
                            {TranslationContext !== undefined
                              ? TranslationContext.p.addresspending
                              : "ADDRESS PENDING"}
                            )
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
            loading={this.state.OrderTabLoading}
          />
          <Pagination
            currentPage={this.state.currentPage}
            totalSize={this.state.totalCount}
            // totalSize={row.customerCount}
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
          <Modal
            open={this.state.PincodeMdl}
            onClose={this.handlePincodeMdlModalClose.bind(this)}
            center
            modalId="addressPincode-popup"
            overlayId="Pincode-ovrly"
          >
            <div className="padding-div">
              <h5>Entered Pincode is Not Shippable</h5>
              <div className="main-pincodeDiv">
                <button
                  type="button"
                  className="btn-cancel-status"
                  onClick={this.handlePincodeMdlModalClose.bind(this)}
                >
                  Change Pincode
                </button>
                <button
                  type="button"
                  className="btn-apply-status m-l-40"
                  onClick={this.handleSetOrderHasBeenReturn.bind(this)}
                >
                  Move to Returns
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            open={this.state.AddressConf}
            onClose={this.handleAddressMdlModalClose.bind(this)}
            center
            modalId="addressPincode-popup"
            overlayId="Pincode-ovrly"
          >
            <div className="padding-div">
              <h5>Are you sure you want to save?</h5>
              <div className="main-pincodeDiv">
                <button
                  type="button"
                  className="btn-cancel-status"
                  onClick={this.handleAddressMdlModalClose.bind(this)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-apply-status m-l-40"
                  onClick={this.handleUpdateAddressPending.bind(
                    this,
                    this.state.orderId
                  )}
                >
                  Ok
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

export default OrderTab;
