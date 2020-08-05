import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Tooltip } from "antd";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class DeliveredTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOrderDeliveredStatus: false,
      deliveredGridData: [],
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      strStatus: "",
      statusFilterData: [],
      orderPopoverOverlay: false,
      DeliveredLoading: false,
      translateLanguage: {},
      orderSearchText: "",
    };
  }
  componentDidMount() {
    this.handleGetOrderDeliveredData();
    this.handleGetOrderStatusFilterData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  /// search data
  handleDeliveredSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
    });

    setTimeout(() => {
      this.handleGetOrderDeliveredData();
    }, 5);
  };

  /// handle Get grid data
  handleGetOrderDeliveredData() {
    let self = this;
    var pageNumber = this.state.currentPage;
    this.setState({
      DeliveredLoading: true,
      filterOrderDeliveredStatus: false,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderDeliveredDetails",
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
            deliveredGridData: data.orderDelivereds,
            totalCount: data.totalCount,
            DeliveredLoading: false,
          });
        } else {
          self.setState({
            deliveredGridData: [],
            totalCount: 0,
            DeliveredLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  /// handle Get order status filter data
  handleGetOrderStatusFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 4,
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
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetOrderDeliveredData();
  };
  /// pagination per page item
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetOrderDeliveredData();
  };

  /// individual status check
  handleCheckDeliIndividualStatus() {
    var checkboxes = document.getElementsByName("DeliveredStatus");
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
                dataIndex: "invoiceNo",
                key: "invoiceNo",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center overflow-hidden">
                      <Tooltip title={item.invoiceNo} placement="bottom">
                        <p className="order-bill-no">{item.invoiceNo}</p>
                      </Tooltip>
                    </div>
                  );
                },
              },
              {
                className: "table-coloum-hide",
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
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.items
                    : "Items",
                className: "cus-strecth",
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
                className: "table-coloum-hide",
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
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.status
                    : "Status",
                className:
                  "camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>{item.statusName}</p>
                      {/* <p className="deliv-status">{item.statusName}</p> */}
                    </div>
                  );
                },
                filterDropdown: () => {
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
                                name="DeliveredStatus"
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
                          onClick={this.handleGetOrderDeliveredData.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.apply
                            : "Apply"}
                        </button>
                        <button
                          className="btn-cancel-status"
                          onClick={() =>
                            this.setState({ filterOrderDeliveredStatus: false })
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
                filterDropdownVisible: this.state.filterOrderDeliveredStatus,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterOrderDeliveredStatus: visible }),
                filterIcon: (filtered) => (
                  <span
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  ></span>
                ),
              },
            ]}
            expandedRowRender={(row) => {
              return (
                <div className="innertabcollapse">
                  <div className="">
                    <table className="table">
                      <tr>
                        <td>
                          <label>
                            <b>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.date
                                : "Date"}
                            </b>
                          </label>
                          <label>{row.date}</label>
                          <label className="order-small-font">{row.time}</label>
                        </td>
                        <td>
                          <label>
                            <b>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.customername
                                : "Customer Name"}
                            </b>
                          </label>
                          <label>
                            <p>{row.customerName}</p>
                            <p>{row.mobileNumber}</p>
                          </label>
                        </td>
                        <td>
                          <label>
                            <b>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.status
                                : "Status"}
                            </b>
                          </label>
                          <label>{row.statusName}</label>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            }}
            expandIconColumnIndex={2}
            expandIconAsCell={false}
            pagination={false}
            showSizeChanger={true}
            onShowSizeChange={true}
            dataSource={this.state.deliveredGridData}
            loading={this.state.DeliveredLoading}
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

export default DeliveredTab;
