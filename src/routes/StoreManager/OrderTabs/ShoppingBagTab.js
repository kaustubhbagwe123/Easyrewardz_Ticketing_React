import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm } from "antd";
import OrderInfo from "./../../../assets/Images/order-info.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import OrderDel from "./../../../assets/Images/order-del.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { NotificationManager } from "react-notifications";

class ShoppingBagTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingBagGridData: [],
      filterShoppingStatus: false,
      orderPopoverOverlay: false,
      filterShoppingDeliveryType: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      strStatus: "",
      ShopBagLoading: false,
      DeliveryStatusFilter: [],
      deliveryStrStatus: "",
      translateLanguage: {},
      ShopCancelComment: "",
      invoiceNo: "",
      amountNo: "",
    };
  }

  componentDidMount() {
    this.handleGetShoppingBagGridData();
    this.handleGetShoppingBagStatusFilterData();
    this.handleGetShoppingBagDeliveryStatus();
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
  handleGetShoppingBagGridData(filter) {
    let self = this;
    this.setState({
      ShopBagLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShoppingBagDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
        FilterDelivery: this.state.deliveryStrStatus,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              shoppingBagGridData: data.shoppingBagList,
              totalCount: data.totalShoppingBag,
              filterOrderStatus: false,
              filterShoppingDeliveryType: false,
              ShopBagLoading: false,
            });
          } else {
            self.setState({
              shoppingBagGridData: [],
              totalCount: 0,
              filterOrderStatus: false,
              filterShoppingDeliveryType: false,
              ShopBagLoading: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              shoppingBagGridData: data.shoppingBagList,
              totalCount: data.totalCount,
              ShopBagLoading: false,
            });
          } else {
            self.setState({
              shoppingBagGridData: [],
              totalCount: 0,
              ShopBagLoading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Shopping bag status filter
  handleGetShoppingBagStatusFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 1,
      },
    })
      .then(function (res) {
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
  /// handle Get Shopping bag delivery status filter
  handleGetShoppingBagDeliveryStatus() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShoppingBagDeliveryType",
      headers: authHeader(),
      params: {
        pageID: 1,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            DeliveryStatusFilter: data,
          });
        } else {
          self.setState({
            DeliveryStatusFilter: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  /// handle cancel and comment for Shopping bag
  handleCancleAndCommnetShopBag(ShopId) {
    let self = this;
    if (this.state.ShopCancelComment !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/UpdateShipmentBagCancelData",
        headers: authHeader(),
        params: {
          ShoppingID: ShopId,
          CancelComment: this.state.ShopCancelComment,
        },
      })
        .then(function (res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              ShopCancelComment: "",
            });
            NotificationManager.success("Success.");
            self.handleGetShoppingBagGridData();
          } else {
            NotificationManager.error("Failed.");
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please Enter Comment.");
    }
  }
  handleConvertToOrder(ShopId, e) {
    e.stopPropagation();
    let self = this;
    if (this.state.invoiceNo !== "" && this.state.amountNo !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/InsertOrderDetails",
        headers: authHeader(),
        data: {
          ShoppingID: ShopId,
          InvoiceNo: this.state.invoiceNo,
          Amount: this.state.amountNo,
        },
      })
        .then(function (res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              invoiceNo: "",
              amountNo: "",
            });
            NotificationManager.success("Success.");
            self.handleGetShoppingBagGridData();
          } else {
            NotificationManager.error("Failed.");
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      if (this.state.invoiceNo === "") {
        NotificationManager.error("Please Enter Order Id.");
      } else {
        NotificationManager.error("Please Enter Amount.");
      }
    }
  }
  ///-------------------API function end--------------------------------

  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetShoppingBagGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetShoppingBagGridData();
  };
  /// handle check individual status
  handleCheckShopBagIndividualStatus() {
    var checkboxes = document.getElementsByName("ShopBagStatus");
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
  /// handle check individual Deliverystatus
  handleCheckShopBagDeliveryStatus() {
    var checkboxes = document.getElementsByName("shopBagDeliveryStatus");
    var deliveryStrStatus = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            deliveryStrStatus += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      deliveryStrStatus,
    });
  }
  /// close status filter
  handleCloseStatusFilter() {
    this.setState({
      filterShoppingStatus: false,
    });
  }
  /// close delivery filter
  handleCloseDeliveryFilter() {
    this.setState({
      filterShoppingDeliveryType: false,
    });
  }
  ///handle text onchange
  handleTextOnchage = (e) => {
    var name = e.target.name;
    if (name === "amountNo") {
      var reg = /^[0-9\b]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      } else {
        e.target.value = "";
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
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
                    ? TranslationContext.title.shoppingbagno
                    : "Shopping Bag No.",
                dataIndex: "shoppingBagNo",
                key: "shoppingBagNo",
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
                      <p>{item.shoppingBagItemList.length}</p>
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
                        }
                        trigger="click"
                        placement="bottom"
                        overlayClassName="order-popover-table order-popover shopping-bag-popover-item"
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
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.status
                    : "Status",
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header order-desktop",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p
                        className={
                          item.statusName === "Cancelled"
                            ? "order-clr-pink"
                            : ""
                        }
                      >
                        {item.statusName}
                      </p>
                      {item.statusName === "Cancelled" ? (
                        <Popover
                          content={
                            <div className="order-tab-popover">
                              <div className="d-flex align-items-center justify-content-between">
                                <p>{item.canceledOn}</p>
                                <p className="username-mar">{item.userName}</p>
                              </div>
                              <p className="shopping-popover-cancel-info">
                                {item.canceledComment}
                              </p>
                            </div>
                          }
                          trigger="click"
                          overlayClassName="order-popover shopping-popover-cancel"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                        >
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
                        {this.state.statusFilterData !== null &&
                          this.state.statusFilterData.map((item, b) => (
                            <li key={b}>
                              <input
                                type="checkbox"
                                id={"New" + item.statusID}
                                className="ch1"
                                onChange={this.handleCheckShopBagIndividualStatus.bind(
                                  this
                                )}
                                name="ShopBagStatus"
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
                          onClick={this.handleGetShoppingBagGridData.bind(
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
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.deliverytype
                    : "Delivery type",
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header shopping-delivery-header order-desktop",
                render: (row, item) => {
                  return (
                    <p>
                      {item.deliveryTypeName}
                    </p>
                  );
                },
                filterDropdown: (data, row) => {
                  return (
                    <div className="campaign-status-drpdwn">
                      <ul>
                        {this.state.DeliveryStatusFilter !== null &&
                          this.state.DeliveryStatusFilter.map((item, d) => (
                            <li key={d}>
                              <input
                                type="checkbox"
                                id={"New" + item.deliveryTypeID}
                                className="ch1"
                                onChange={this.handleCheckShopBagDeliveryStatus.bind(
                                  this
                                )}
                                name="shopBagDeliveryStatus"
                                attrIds={item.deliveryTypeID}
                              />
                              <label htmlFor={"New" + item.deliveryTypeID}>
                                <span className="ch1-text">
                                  {item.deliveryTypeName}
                                </span>
                              </label>
                            </li>
                          ))}
                      </ul>
                      <div className="dv-status">
                        <button
                          className="btn-apply-status"
                          onClick={this.handleGetShoppingBagGridData.bind(
                            this,
                            "filter"
                          )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.viewsearch
                            : "Apply"}
                        </button>
                        <button
                          className="btn-cancel-status"
                          onClick={this.handleCloseDeliveryFilter.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.cancel
                            : "Cancel"}
                        </button>
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
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.pickupdateandtime
                    : "Pickup Date & Time",
                render: (row, item) => {
                  return (
                    <div>
                      {item.pickupDate === "" && item.pickupTime === "" ? (
                        <p className="order-clr-blue">-NIL-</p>
                      ) : (
                          <>
                            <p className="order-clr-blue">{item.pickupDate},</p>
                            <p className="order-clr-blue order-more-small-font">
                              {item.pickupTime}
                            </p>
                          </>
                        )}
                    </div>
                  );
                },
                className: "pick-up-date order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.pickupdateandtime
                    : "Address",
                render: (row, item) => {
                  return (
                    <p className="order-small-font">
                      {item.address === "" ? "-NIL-" : item.address}
                    </p>
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
                    <div className="d-flex">
                      {item.actionTypeName !== "" ? (
                        <>
                          <Popconfirm
                            title={
                              <>
                                <div className="popover-input-cntr">
                                  <div>
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.orderid
                                        : "Order Id"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder="Enter Order Id"
                                      name="invoiceNo"
                                      value={this.state.invoiceNo}
                                      onChange={this.handleTextOnchage}
                                      autoComplete="off"
                                    />
                                  </div>
                                  <div>
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.amount
                                        : "Amount"}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                            .amount
                                          : "Enter Amount"
                                      }
                                      name="amountNo"
                                      value={this.state.amountNo}
                                      onChange={this.handleTextOnchage}
                                      autoComplete="off"
                                    />
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
                            onConfirm={this.handleConvertToOrder.bind(
                              this,
                              item.shoppingID
                            )}
                          >
                            <button className="butn order-grid-butn">
                              {TranslationContext !== undefined
                                ? TranslationContext.button.convertoorder
                                : "Convert to Order"}
                            </button>
                          </Popconfirm>
                          <Popconfirm
                            title={
                              <>
                                <div className="popover-input-cntr">
                                  <div>
                                    <p>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.comment
                                        : "Comment"}
                                    </p>
                                    <textarea
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.placeholder
                                            .entercomment
                                          : "Enter Comment"
                                      }
                                      value={this.state.ShopCancelComment}
                                      name="ShopCancelComment"
                                      onChange={this.handleTextOnchage}
                                    ></textarea>
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
                            onConfirm={this.handleCancleAndCommnetShopBag.bind(
                              this,
                              item.shoppingID
                            )}
                          >
                            <button className="butn order-grid-butn order-del-butn">
                              <img src={OrderDel} alt="delete icon" />
                            </button>
                          </Popconfirm>
                        </>
                      ) : null}
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
                      <p className="order-small-font">{row.mobileNumber}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Status</p>
                      <div className="d-flex align-items-center">
                        <p
                          className={
                            row.statusName === "Cancelled"
                              ? "order-clr-pink"
                              : ""
                          }
                        >
                          {row.statusName}
                        </p>
                        {row.statusName === "Cancelled" ? (
                          <Popover
                            content={
                              <div className="order-tab-popover">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>{row.canceledOn}</p>
                                  <p className="username-mar">{row.userName}</p>
                                </div>
                                <p className="shopping-popover-cancel-info">
                                  {row.canceledComment}
                                </p>
                              </div>
                            }
                            trigger="click"
                            placement="bottomLeft"
                            arrowPointAtCenter
                            overlayClassName="order-popover shopping-popover-cancel"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderInfo} className="order-info" />
                          </Popover>
                        ) : (
                            ""
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">
                        Pickup Date &amp; Time
                      </p>
                      {row.pickupDate === "" && row.pickupTime === "" ? (
                        <p className="order-clr-blue">-NIL-</p>
                      ) : (
                          <>
                            <p className="order-clr-blue">{row.pickupDate},</p>
                            <p className="order-clr-blue order-small-font">
                              {row.pickupTime}
                            </p>
                          </>
                        )}
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Delivery Type</p>
                      <p>
                        {row.deliveryTypeName}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Address</p>
                      <p>{row.address === "" ? "-NIL-" : row.address}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Date</p>
                      <p>{row.date}</p>
                      <p className="order-small-font">{row.time}</p>
                    </div>
                  </div>
                </div>
              );
            }}
            expandIconColumnIndex={8}
            expandIconAsCell={false}
            pagination={false}
            showSizeChanger={false}
            onShowSizeChange={false}
            dataSource={this.state.shoppingBagGridData}
            loading={this.state.ShopBagLoading}
          />
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
      </>
    );
  }
}

export default ShoppingBagTab;
