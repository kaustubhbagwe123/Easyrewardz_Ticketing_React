import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Tooltip, Card, Spin, Empty } from "antd";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import Info from "./../../../assets/Images/Info-black.png";
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
      isMobileView: false,
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
  /// search data
  handleDeliveredSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage:1
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
        <div className="table-cntr store dv-table-paging delivtab">
          <p className="shopi">
            {TranslationContext !== undefined
              ? TranslationContext.a.delivered
              : "Delivered"}
          </p>
          {!this.state.isMobileView ? (
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
              columns={[
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.label.orderid
                      : "Order ID",
                  dataIndex: "invoiceNo",
                  key: "invoiceNo",
                  render: (row, item) => {
                    return (
                      <div className="d-flex align-items-center namenumbermain">
                        <Tooltip title={item.invoiceNo} placement="bottom">
                          <p className="order-bill-no">
                            {item.invoiceNo.length > 13
                              ? item.invoiceNo.substr(0, 13).concat("...")
                              : item.invoiceNo}
                          </p>
                        </Tooltip>
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
                          <img
                            src={OrderHamb}
                            className="order-hamb iteminfo"
                          />
                          <img
                            src={Info}
                            className="item-img"
                            className="item-img"
                          />
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
                            onClick={this.handleGetOrderDeliveredData.bind(
                              this
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.apply
                              : "Apply"}
                          </button>
                          <button
                            className="btn-cancel-status"
                            onClick={() =>
                              this.setState({
                                filterOrderDeliveredStatus: false,
                              })
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
              pagination={false}
              showSizeChanger={true}
              onShowSizeChange={true}
              dataSource={this.state.deliveredGridData}
              loading={this.state.DeliveredLoading}
            />
          ) : (
            <>
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
              <Spin spinning={this.state.DeliveredLoading}>
                <div className="mobdelivt">
                  {this.state.deliveredGridData.length > 0
                    ? this.state.deliveredGridData.map((item, key) => {
                        return (
                          <Card>
                            <p className="innumb">{item.invoiceNo}</p>
                            {item.orderDeliveredItems.length > 0 ? (
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
                                              ? TranslationContext.title
                                                  .itemname
                                              : "Item Name",
                                          dataIndex: "itemName",
                                        },
                                        {
                                          title:
                                            TranslationContext !== undefined
                                              ? TranslationContext.title
                                                  .itemprice
                                              : "Item Price",
                                          dataIndex: "itemPrice",
                                        },
                                        {
                                          title:
                                            TranslationContext !== undefined
                                              ? TranslationContext.title
                                                  .quantity
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
                                  placement="bottom"
                                  overlayClassName="order-popover-table order-popover order-popover-table-big"
                                >
                                  <div className="mobeye">
                                    <img src={Info} className="item-img" />
                                    <span>
                                      {item.orderDeliveredItems.length}
                                    </span>
                                  </div>
                                </Popover>
                              </>
                            ) : null}
                            <div className="namenumber">
                              <p>{item.customerName},</p>
                              <p className="order-small-font">
                                {item.mobileNumber}
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-7">
                                <p className="date">
                                  {item.date} {item.time}
                                </p>
                              </div>
                              <div className="col-5">
                                <p className="status">{item.statusName}</p>
                              </div>
                            </div>
                          </Card>
                        );
                      })
                    : null}
                </div>
                {this.state.deliveredGridData.length === 0 ? (
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
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default DeliveredTab;
