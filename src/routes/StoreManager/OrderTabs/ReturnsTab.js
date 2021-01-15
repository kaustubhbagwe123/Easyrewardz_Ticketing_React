import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Collapse, Spin, Empty } from "antd";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import Info from "./../../../assets/Images/Info-black.png";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { NotificationManager } from "react-notifications";
const { Panel } = Collapse;
class ReturnTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      returnGridData: [],
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      returnsLoading: false,
      orderPopoverOverlay: false,
      filterOrderReturnsStatus: false,
      statusFilterData: [],
      strStatus: "",
      translateLanguage: {},
      orderSearchText: "",
      isMobileView: false,
      activePanel: [],
    };
  }

  componentDidMount() {
    this.handleGetOrderReturnsData();
    this.handleGetOrderStatusFilterData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: true });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  handleReturnSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage: 1,
    });
    setTimeout(() => {
      this.handleGetOrderReturnsData();
    }, 5);
  };

  /// handle Get grid data
  handleGetOrderReturnsData() {
    let self = this;
    var pageNumber = this.state.currentPage;
    this.setState({
      returnsLoading: true,
      filterOrderReturnsStatus: false,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderReturnDetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText,
        PageNo: pageNumber,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            returnGridData: data.orderReturns,
            totalCount: data.totalCount,
            returnsLoading: false,
          });
        } else {
          self.setState({
            returnGridData: [],
            totalCount: 0,
            returnsLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ReturnPaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetOrderReturnsData();
  };

  handleReturnPageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
    });

    this.handleGetOrderReturnsData();
  };

  handleGetOrderStatusFilterData() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 5,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            statusFilterData: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCheckReturnsIndividualStatus() {
    var checkboxes = document.getElementsByName("ReturnStatus");
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

  handleSendSMSWhatupOnCancel(orderId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/SendSMSWhatsupOnReturnCancel",
      headers: authHeader(),
      params: {
        OrderId: orderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordcancelledsuccessfully
              : "Record Cancelled Successfully."
          );
          self.handleGetOrderReturnsData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotcancelled
              : "Record Not Cancelled."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOnRetry(orderId, awbNo, statusId, returnId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateOnReturnRetry",
      headers: authHeader(),
      params: {
        OrderId: orderId,
        StatusId: statusId,
        AWBNo: awbNo,
        ReturnId: returnId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully."
          );
          self.handleGetOrderReturnsData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotuUpdated
              : "Record Not Updated."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOnRefund(orderId) {
    const TranslationContext = this.state.translateLanguage.default;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/SendSMSWhatsupOnReturnCancel",
      headers: authHeader(),
      params: {
        OrderId: orderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordcancelledsuccessfully
              : "Record Cancelled Successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotcancelled
              : "Record Not Cancelled."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handlecollapseChange = (e) => {
    this.state.activePanel = e[e.length - 1];
    this.setState({ activePanel: this.state.activePanel });
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        <div className="table-cntr store dv-table-paging returntabmob">
          <p className="shopi">
            {TranslationContext !== undefined
              ? TranslationContext.label.returns
              : "Returns"}
          </p>
          {!this.state.isMobileView ? (
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
              columns={[
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.awbno
                      : "AWB No.",
                  dataIndex: "awbNo",
                  key: "awbNo",
                  className: "awb",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.label.orderid
                      : "Order ID",
                  dataIndex: "invoiceNo",
                  className: "",
                  render: (row, item) => {
                    return (
                      <div className="namenumbermain">
                        <label>{item.invoiceNo}</label>
                        <div className="namenumber">
                          <p>{item.customerName},</p>
                          <p className="order-small-font">
                            {item.mobileNumber}
                          </p>
                        </div>
                      </div>
                    );
                  },
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
                        <p>{item.orderReturnsItems.length}</p>
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
                              dataSource={item.orderReturnsItems}
                            />
                          }
                          trigger="click"
                          placement="bottom"
                          overlayClassName="order-popover-table order-popover return-popover-item"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                        >
                          <img src={OrderHamb} className="order-hamb" />
                        </Popover>
                      </div>
                    );
                  },
                  className: "order-desktop",
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
                      ? TranslationContext.title.status
                      : "Status",
                  dataIndex: "statusName",
                  className:
                    "camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header",
                  filterDropdown: () => {
                    return (
                      <div className="campaign-status-drpdwn">
                        <ul>
                          {this.state.statusFilterData !== null &&
                            this.state.statusFilterData.map((item) => (
                              <li>
                                <input
                                  type="checkbox"
                                  id={"New" + item.statusID}
                                  className="ch1"
                                  onChange={this.handleCheckReturnsIndividualStatus.bind(
                                    this
                                  )}
                                  name="ReturnStatus"
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
                            onClick={this.handleGetOrderReturnsData.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.apply
                              : "Apply"}
                          </button>
                          <button
                            className="btn-cancel-status"
                            onClick={() =>
                              this.setState({ filterOrderReturnsStatus: false })
                            }
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "Cancel"}
                          </button>
                        </div>
                      </div>
                    );
                  },
                  filterDropdownVisible: this.state.filterOrderReturnsStatus,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterOrderReturnsStatus: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.actions
                      : "Action",
                  render: (item) => {
                    return (
                      <div className="">
                        <div className="d-flex acbtn">
                          <button
                            className={
                              item.isCancelled === false
                                ? "butn order-grid-butn order-grid-butn-orange"
                                : "butn order-grid-butn order-grid-butn-orange order-grid-btn-disable"
                            }
                            onClick={this.handleSendSMSWhatupOnCancel.bind(
                              this,
                              item.orderID
                            )}
                            disabled={item.isCancelled}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "Cancel"}
                          </button>
                          <button
                            className={
                              item.isCancelled === false
                                ? item.isRetry === false
                                  ? "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2 order-grid-btn-disable"
                                  : "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2"
                                : "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2 order-grid-btn-disable"
                            }
                            onClick={this.handleUpdateOnRetry.bind(
                              this,
                              item.orderID,
                              item.awbNo,
                              item.statusId,
                              item.returnID
                            )}
                            disabled={
                              item.isCancelled === false
                                ? item.isRetry === false
                                  ? true
                                  : false
                                : true
                            }
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.retry
                              : "Retry"}
                          </button>
                        </div>
                        <div className="itemviewmobile">
                          <div className="d-flex align-items-center">
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
                                  dataSource={item.orderReturnsItems}
                                />
                              }
                              trigger="click"
                              placement="bottom"
                              overlayClassName="order-popover-table order-popover return-popover-item"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                            >
                              <img
                                src={OrderHamb}
                                className="order-hamb iteminfo"
                              />
                              <img src={Info} className="item-img" />
                            </Popover>
                            <p>{item.orderReturnsItems.length}</p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                },
              ]}
              pagination={false}
              showSizeChanger={true}
              onShowSizeChange={true}
              dataSource={this.state.returnGridData}
              loading={this.state.returnsLoading}
            />
          ) : (
            <>
              <Pagination
                currentPage={this.state.currentPage}
                totalSize={this.state.totalCount}
                sizePerPage={this.state.postsPerPage}
                changeCurrentPage={this.ReturnPaginationOnChange}
                theme="bootstrap"
              />
              <div className="position-relative">
                <div className="item-selection Camp-pagination">
                  <select
                    value={this.state.postsPerPage}
                    onChange={this.handleReturnPageItemchange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.itemperpage
                      : "Items per page"}
                  </p>
                </div>
              </div>
              <Spin spinning={this.state.returnsLoading}>
                <Collapse
                  bordered={false}
                  className="site-collapse-custom-collapse"
                  expandIconPosition={"right"}
                  destroyInactivePanel={true}
                  onChange={this.handlecollapseChange.bind(this)}
                  activeKey={this.state.activePanel}
                >
                  {this.state.returnGridData.length > 0
                    ? this.state.returnGridData.map((item, key) => {
                        return (
                          <Panel
                            header={
                              <div className="mobreturn">
                                <div>
                                  <div className="d-flex align-items-center overflow-hidden namenumbermain">
                                    <p className="order-bill-no">
                                      {item.invoiceNo}
                                    </p>
                                    {item.orderReturnsItems.length > 0 ? (
                                      <>
                                        <Popover
                                          content={
                                            <Table
                                              className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                              columns={[
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemid
                                                      : "Item ID",
                                                  dataIndex: "itemID",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemname
                                                      : "Item Name",
                                                  dataIndex: "itemName",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemprice
                                                      : "Item Price",
                                                  dataIndex: "itemPrice",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .quantity
                                                      : "Quantity",
                                                  dataIndex: "quantity",
                                                },
                                              ]}
                                              scroll={{ y: 240 }}
                                              pagination={false}
                                              dataSource={
                                                item.orderReturnsItems
                                              }
                                            />
                                          }
                                          trigger="click"
                                          placement="bottom"
                                          overlayClassName="order-popover-table order-popover order-popover-table-big"
                                        >
                                          <div className="mobeye">
                                            <img
                                              src={Info}
                                              className="item-img"
                                            />
                                            <span>
                                              {item.orderReturnsItems.length}
                                            </span>
                                          </div>
                                        </Popover>
                                      </>
                                    ) : null}
                                  </div>
                                  <div className="namenumber">
                                    <p>{item.customerName},</p>
                                    <p className="order-small-font">
                                      {item.mobileNumber}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            <div className="row">
                              <div className="col-6 p-0">
                                <label className="date">
                                  {item.date} {item.time}
                                </label>
                              </div>
                              <div className="col-6 p-0 text-right">
                                <label className="stname">
                                  {item.statusName}
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 p-0">
                                <label className="ordn">
                                  Order ID:<span>{item.invoiceNo}</span>
                                </label>
                              </div>
                            </div>
                            <div className="row btnss">
                              <div className="col-6 p-0">
                                <button
                                  className={
                                    item.isCancelled === false
                                      ? "butn order-grid-butn order-grid-butn-orange"
                                      : "butn order-grid-butn order-grid-butn-orange order-grid-btn-disable"
                                  }
                                  onClick={this.handleSendSMSWhatupOnCancel.bind(
                                    this,
                                    item.orderID
                                  )}
                                  disabled={item.isCancelled}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.cancel
                                    : "Cancel"}
                                </button>
                              </div>
                              <div className="col-6 p-0 text-right">
                                <button
                                  className={
                                    item.isCancelled === false
                                      ? item.isRetry === false
                                        ? "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2 order-grid-btn-disable"
                                        : "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2"
                                      : "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2 order-grid-btn-disable"
                                  }
                                  onClick={this.handleUpdateOnRetry.bind(
                                    this,
                                    item.orderID,
                                    item.awbNo,
                                    item.statusId,
                                    item.returnID
                                  )}
                                  disabled={
                                    item.isCancelled === false
                                      ? item.isRetry === false
                                        ? true
                                        : false
                                      : true
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.retry
                                    : "Retry"}
                                </button>
                              </div>
                            </div>
                          </Panel>
                        );
                      })
                    : null}
                </Collapse>

                {this.state.returnGridData.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : null}
              </Spin>
            </>
          )}
          {!this.state.isMobileView ? (
            <>
              <Pagination
                currentPage={this.state.currentPage}
                totalSize={this.state.totalCount}
                sizePerPage={this.state.postsPerPage}
                changeCurrentPage={this.ReturnPaginationOnChange}
                theme="bootstrap"
              />
              <div className="position-relative">
                <div className="item-selection Camp-pagination">
                  <select
                    value={this.state.postsPerPage}
                    onChange={this.handleReturnPageItemchange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.itemperpage
                      : "Items per page"}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default ReturnTab;
