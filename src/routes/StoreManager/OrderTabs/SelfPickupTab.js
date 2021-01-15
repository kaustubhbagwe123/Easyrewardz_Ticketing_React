import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Collapse, Spin, Empty, DatePicker } from "antd";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import Info from "./../../../assets/Images/Info-black.png";
import Filter from "./../../../assets/Images/dropdown3.png";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import moment from "moment";
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

class SelfPickupTab extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    // let startDate = moment(
    //   new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    // ).subtract(30, "days");
    // let endDate = moment(startDate).add(30, "days");
    this.state = {
      selfPickupGridData: [],
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      SelfPickupLoading: false,
      orderPopoverOverlay: false,
      translateLanguage: {},
      orderSearchText: "",
      isMobileView: false,
      activePanel: [],
      filterDateTime: false,
      startDate: "",
      endDate: "",
    };
  }

  componentDidMount() {
    this.handleGetSelfPickupGridData();
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
  handleSelfPickupSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage:1
    });
    setTimeout(() => {
      this.handleGetSelfPickupGridData();
    }, 5);
  };

  /// handle Get grid data
  handleGetSelfPickupGridData() {
    let self = this;
    var pageNumber = this.state.currentPage;
    this.setState({
      SelfPickupLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetSelfPickUpOrdersDetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText,
        PageNo: pageNumber,
        PageSize: this.state.postsPerPage,
        Filterdate:
          this.state.startDate !== ""
            ? this.state.startDate + "," + this.state.endDate
            : "",
        FilterTimeSlot: "",
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            selfPickupGridData: data.ordersList,
            totalCount: data.totalCount,
            SelfPickupLoading: false,
            filterDateTime: false,
          });
        } else {
          self.setState({
            selfPickupGridData: [],
            totalCount: 0,
            SelfPickupLoading: false,
            filterDateTime: false,
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

    this.handleGetSelfPickupGridData();
  };

  handleSelfPickPageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
    });

    this.handleGetSelfPickupGridData();
  };

  handlecollapseChange = (e) => {
    this.state.activePanel = e[e.length - 1];
    this.setState({ activePanel: this.state.activePanel });
  };

  /// handle Date change filter
  handleDateFilterChange = async (startDate, endDate) => {
    await this.setState({
      startDate: endDate[0],
      endDate: endDate[1],
    });
    this.handleGetSelfPickupGridData();
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        <div className="table-cntr store dv-table-paging returntabmob">
          <p className="shopi">
            {TranslationContext !== undefined
              ? TranslationContext.a.selfpickup
              : "Self Pickup"}
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
                  className: "awb",
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
                        <p>{item.ordersItemList.length}</p>
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
                              dataSource={item.ordersItemList}
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
                      ? TranslationContext.title.shippingaddress
                      : "Shipping address",
                  render: (row, item) => {
                    return (
                      <p className="order-small-font">{item.shippingAddress}</p>
                    );
                  },
                  width: 250,
                  className: "white-space-init table-coloum-hide",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.deliverytype
                      : "Delivery Type",
                  className: "order-desktop",
                  dataIndex: "deliveryTypeName",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.datetime
                      : "Date & Time",
                  render: (row, item) => {
                    return (
                      <div>
                        <p>{item.date}</p>
                        <p className="order-small-font">{item.time}</p>
                      </div>
                    );
                  },
                  className:
                    "shopping-delivery-header camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header",
                  filterDropdown: (data, row) => {
                    return (
                      <div className="DashTimeRange">
                        <div className="show-grid">
                          <div id="DateTimeRangeContainerNoMobileMode">
                            <div style={{ padding: "10px" }}>
                              <RangePicker
                                onChange={this.handleDateFilterChange}
                                bordered={false}
                                format="DD-MM-YYYY"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  },
                  filterDropdownVisible: this.state.filterDateTime,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterDateTime: visible }),
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
              dataSource={this.state.selfPickupGridData}
              loading={this.state.SelfPickupLoading}
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
                    onChange={this.handleSelfPickPageItemchange}
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
              <Spin spinning={this.state.SelfPickupLoading}>
                <Collapse
                  bordered={false}
                  className="site-collapse-custom-collapse"
                  expandIconPosition={"right"}
                  destroyInactivePanel={true}
                  onChange={this.handlecollapseChange.bind(this)}
                  activeKey={this.state.activePanel}
                >
                  {this.state.selfPickupGridData.length > 0
                    ? this.state.selfPickupGridData.map((item, key) => {
                        return (
                          <Panel
                            header={
                              <div className="mobreturn">
                                <div>
                                  <div className="d-flex align-items-center overflow-hidden namenumbermain">
                                    <p className="order-bill-no">
                                      {item.invoiceNo}
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
                                              dataSource={item.ordersItemList}
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
                                              {item.ordersItemList.length}
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
                                  {item.deliveryTypeName}
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 p-0">
                                <label className="ordn">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.orderid
                                    : "Order ID"}
                                  :<span>{item.invoiceNo}</span>
                                </label>
                              </div>
                            </div>
                          </Panel>
                        );
                      })
                    : null}
                </Collapse>

                {this.state.selfPickupGridData.length === 0 ? (
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
                    onChange={this.handleSelfPickPageItemchange}
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

export default SelfPickupTab;
