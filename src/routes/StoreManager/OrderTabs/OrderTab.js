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
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

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
      OrderTabLoading:false
    };
  }

  componentDidMount() {
    this.handleGetOrderTabGridData();
    this.handleGetOrderStatusFilterData();
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
              OrderTabLoading:false
            });
          } else {
            self.setState({
              orderGridData: [],
              totalCount: 0,
              filterOrderStatus: false,
              OrderTabLoading:false
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              orderGridData: data.ordersList,
              totalCount: data.totalCount,
              OrderTabLoading:false
            });
          } else {
            self.setState({
              orderGridData: [],
              totalCount: 0,
              OrderTabLoading:false
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

  ///-------------------API function end--------------------------------

  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    debugger;
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
  render() {
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
                title: "Invoice no.",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <div className="invoice-icon-cntr">
                        <img
                          src={
                            item.isShoppingBagConverted
                              ? OrderShopingBlack
                              : OrderBag
                          }
                          className={
                            item.isShoppingBagConverted
                              ? "order-shoping"
                              : "order-bag"
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
                                    title: "Item ID",
                                    dataIndex: "itemID",
                                  },
                                  {
                                    title: "Item Name",
                                    dataIndex: "itemName",
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
                title: "Date",
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
                title: "Customer",
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
                title: "Items",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>{item.ordersItemList.length}</p>

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
                              //   {
                              //     title: "AWB. No",
                              //     dataIndex: "AWBNo",
                              //   },
                            ]}
                            scroll={{ y: 240 }}
                            pagination={false}
                            dataSource={item.ordersItemList}
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
                dataIndex: "amount",
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
                      <p className="order-clr-blue">{item.statusName}</p>
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
                          Apply
                        </button>
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
                                  <p>Address</p>
                                  <textarea placeholder="Enter Address"></textarea>
                                </div>
                                <div>
                                  <p>Landmark</p>
                                  <input
                                    type="text"
                                    placeholder="Enter Landmark"
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>Pin Code</p>
                                    <input
                                      type="text"
                                      placeholder="Enter Pin Code"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>City</p>
                                    <input
                                      type="text"
                                      placeholder="Enter City"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>State</p>
                                    <input
                                      type="text"
                                      placeholder="Enter State"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>Country</p>
                                    <input
                                      type="text"
                                      placeholder="Enter Country"
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
                      {item.actionTypeName === "Payment Details" && (
                        <Popover
                          content={
                            <div className="order-tab-popover">
                              <div className="pay-done">
                                <p>Mode of Payment:</p>
                                <span>Online</span>
                              </div>
                              <div className="pay-done">
                                <p>Total Amount:</p>
                                <span>{item.amount}</span>
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
                            {item.actionTypeName}
                          </button>
                        </Popconfirm>
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
                      <p className="order-expanded-title">Customer</p>
                      <p>{row.customerName},</p>
                      <p className="order-small-font">{row.customerName}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Status</p>
                      <p className="order-clr-blue">{row.statusName}</p>
                      {/* {row.selfPickUp && (
                        <p className="order-clr-orange">(Self Pickup)</p>
                      )} */}
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Amount</p>
                      <p>{row.amount}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Date</p>
                      <p>{row.date}</p>
                      <p className="order-small-font">{row.time}</p>
                    </div>
                    <div className="col-12">
                      <p className="order-expanded-title">Shipping Address</p>
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
                                  <p>Address</p>
                                  <textarea placeholder="Enter Address"></textarea>
                                </div>
                                <div>
                                  <p>Landmark</p>
                                  <input
                                    type="text"
                                    placeholder="Enter Landmark"
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>Pin Code</p>
                                    <input
                                      type="text"
                                      placeholder="Enter Pin Code"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>City</p>
                                    <input
                                      type="text"
                                      placeholder="Enter City"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p>State</p>
                                    <input
                                      type="text"
                                      placeholder="Enter State"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <p>Country</p>
                                    <input
                                      type="text"
                                      placeholder="Enter Country"
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
              <p>Items per page</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OrderTab;
