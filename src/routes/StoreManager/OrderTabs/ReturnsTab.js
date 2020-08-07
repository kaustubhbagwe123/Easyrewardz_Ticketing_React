import React, { Component } from "react";
import axios from "axios";
import { Table, Popover } from "antd";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { NotificationManager } from "react-notifications";

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
  }

  handleReturnSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
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
          NotificationManager.success("Record Cancelled Successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOnRetry(orderId, awbNo, statusId, returnId) {
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
          NotificationManager.success("Record Updated Successfully.");
          self.handleGetOrderReturnsData();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateOnRefund(orderId) {
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
          NotificationManager.success("Record Cancelled Successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        <div className="table-cntr store dv-table-paging">
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
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.invoiceno
                    : "Invoice No.",
                dataIndex: "invoiceNo",
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
                  debugger;
                  return (
                    <div className="d-flex">
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
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.cancel
                          : "Cancel"}
                      </button>
                      <button
                        className={
                          item.isRetry === false
                            ? "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2 order-grid-btn-disable"
                            : "butn order-grid-butn order-grid-butn-yellow retry-butn ml-2"
                        }
                        onClick={this.handleUpdateOnRetry.bind(
                          this,
                          item.orderID,
                          item.awbNo,
                          item.statusId,
                          item.returnID
                        )}
                        disabled={!item.isRetry}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.retry
                          : "Retry"}
                      </button>
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
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.invoiceno
                          : "Invoice No."}
                      </p>
                      <p>{row.invoiceNo}</p>
                    </div>
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
                          ? TranslationContext.p.date
                          : "Date"}
                      </p>
                      <p>{row.date}</p>
                      <p className="order-small-font">{row.time}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.p.status
                          : "Status"}
                      </p>
                      <p>{row.statusName}</p>
                    </div>
                  </div>
                </div>
              );
            }}
            expandIconColumnIndex={6}
            expandIconAsCell={false}
            pagination={false}
            showSizeChanger={true}
            onShowSizeChange={true}
            dataSource={this.state.returnGridData}
            loading={this.state.returnsLoading}
          />
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
        </div>
      </>
    );
  }
}

export default ReturnTab;
