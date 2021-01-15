import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm, Tooltip } from "antd";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import OrderInfo from "./../../../assets/Images/order-info.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { NotificationManager } from "react-notifications";
import { Collapse, CardBody, Card } from "reactstrap";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import PodDateRangePicker from "./PodDateRangePicker";
import moment from "moment";

class POD extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PODGridData: [],
      statusFilterData: [],
      PartnerFilterData: [],
      orderSearchText: "",
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      PodLoading: false,
      translateLanguage: {},
      PodFilterCollapse: false,
      creationStart: "",
      creationEnd: "",
      SelectPodPayment: "All",
      filterPodStatus: false,
      filterPodPartner: false,
      Pod_AddComment: "",
      StartEndDateValidation: "",
    };
  }

  componentDidMount() {
    this.handleGetPodGridData();
    this.handleGetPodStatusFilterData();
    this.handleGetPodPartnerFilterData();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  /// search data
  handleShipmentSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage:1
    });
    setTimeout(() => {
      this.handleGetPodGridData();
    }, 5);
  };

  ///-----------------------API function Start--------------------------
  /// handle Get shipment grid data
  handleGetPodGridData(filter) {
    let self = this;
    this.setState({
      PodLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetPODdetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText,
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
        CourierPartner: "",
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              PODGridData: data.ordersList,
              totalCount: data.totalCount,
              filterPodStatus: false,
              filterPodPartner: false,
              PodLoading: false,
            });
          } else {
            self.setState({
              PODGridData: [],
              totalCount: 0,
              filterPodStatus: false,
              filterPodPartner: false,
              PodLoading: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              PODGridData: data.ordersList,
              totalCount: data.totalCount,
              PodLoading: false,
            });
          } else {
            self.setState({
              PODGridData: [],
              totalCount: 0,
              PodLoading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Shipment Status filter
  handleGetPodStatusFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 7,
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
  /// handle Get Partner filter data
  handleGetPodPartnerFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetCourierPartnerFilter",
      headers: authHeader(),
      params: {
        pageID: 7,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            PartnerFilterData: data,
          });
        } else {
          self.setState({
            PartnerFilterData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //// handle Order POD Comment data
  handleAddPODComment(OrdID) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/PaymentComment",
      headers: authHeader(),
      data: {
        OrderID: OrdID,
        PODPaymentComent: this.state.Pod_AddComment,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            Pod_AddComment: "",
          });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.commentaddedsuccessfully
              : "Comment Added Successfully."
          );
        } else {
          self.setState({
            Pod_AddComment: "",
          });
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.commentnotadded
              : "Comment Not Added.."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle search pod data
  handlePodDataSearch() {
    if (this.state.creationStart !== "" || this.state.creationEnd !== "") {
      let self = this;
      var from_date = moment(new Date(this.state.creationStart)).format(
        "YYYY-MM-DD"
      );
      var to_date = moment(new Date(this.state.creationEnd)).format(
        "YYYY-MM-DD"
      );
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/DownLoadReport",
        headers: authHeader(),
        data: {
          FromDate: from_date,
          ToDate: to_date,
          Option:
            this.state.SelectPodPayment === "All"
              ? this.state.SelectPodPayment
              : parseInt(this.state.SelectPodPayment),
        },
      })
        .then(function(res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            window.open(data);
            self.setState({
              creationStart: "",
              creationEnd: "",
              SelectPodPayment: "All",
              StartEndDateValidation: "",
            });
          } else {
            self.setState({
              creationStart: "",
              creationEnd: "",
              SelectPodPayment: "All",
              StartEndDateValidation: "",
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        StartEndDateValidation: "Please Select Start and End Date.",
      });
    }
  }
  ///-----------------------API function End----------------------------

  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetPodGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetPodGridData();
  };
  handleFilterCollapse() {
    this.setState((state) => ({ PodFilterCollapse: !state.PodFilterCollapse }));
  }

  /// handle Search To and from date
  handleSearchToFromDate = async (startDate, endDate) => {
    var startArr = endDate[0].split("-");
    var dummyStart = startArr[0];
    startArr[0] = startArr[1];
    startArr[1] = dummyStart;
    var creationStart = startArr.join("-");
    var endArr = endDate[1].split("-");
    var dummyEnd = endArr[0];
    endArr[0] = endArr[1];
    endArr[1] = dummyEnd;
    var creationEnd = endArr.join("-");
    await this.setState({
      creationStart,
      creationEnd,
    });
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        <div className="table-cntr store dv-table-paging podmobile">
          <Collapse isOpen={this.state.PodFilterCollapse}>
            <Card>
              <CardBody>
                <div className="table-expandable-sctn1">
                  <div className="Podfilter">
                    {/* <div className="filter-btn-slot Podfilter"> */}
                    {/* <button
                      className="btn-inv podFilBtn"
                      type="button"
                    >
                      FILTER
                    </button> */}
                  </div>
                  <div className="container-fluid">
                    <div className="row manualbox py-3">
                      <div className="col-md-3 campaign-end-date creation-date-range podmargin">
                        <PodDateRangePicker
                          applyCallbackPOD={this.handleSearchToFromDate}
                        />
                        {(this.state.creationStart === "" ||
                          this.state.creationEnd === "") && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.StartEndDateValidation}
                          </p>
                        )}
                      </div>
                      <div className="col-md-3 podmargin">
                        <select
                          value={this.state.SelectPodPayment}
                          onChange={(e) =>
                            this.setState({ SelectPodPayment: e.target.value })
                          }
                        >
                          {/* <option value={0}>
                            {TranslationContext !== undefined
                              ? TranslationContext.dropdown.selectpaymentstatus
                              : "Select Payment Status"}
                          </option> */}
                          <option value="All">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.all
                              : "All"}
                          </option>
                          <option value={1}>
                            {TranslationContext !== undefined
                              ? TranslationContext.dropdown.paymentcollected
                              : "Payment Collected"}
                          </option>
                          <option value={2}>
                            {TranslationContext !== undefined
                              ? TranslationContext.dropdown.paymentpending
                              : "Payment Pending"}
                          </option>
                        </select>
                      </div>
                      <div className="col-md-6 podmargin">
                        <div className="Poddown-excel">
                          <a
                            onClick={this.handlePodDataSearch.bind(this)}
                            className="m-r-15"
                          >
                            <p>
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .downloadfile
                                : "Download File"}
                            </p>
                            <img src={DownExcel} alt="download icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Collapse>
          <div
            className="float-search"
            style={{ border: "1px solid #ddd" }}
            onClick={this.handleFilterCollapse.bind(this)}
          >
            <small>Report</small>
          </div>
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table antd-table-order-mobile"
            columns={[
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.label.orderid
                    : "Order ID",
                key: "invoiceNo",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center overflow-hidden">
                      <Tooltip title={item.invoiceNo} placement="bottom">
                        <p className="order-bill-no">
                          {item.invoiceNo.length > 13
                            ? item.invoiceNo.substr(0, 13).concat("...")
                            : item.invoiceNo}
                        </p>
                      </Tooltip>
                    </div>
                  );
                },
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.customer
                    : "Customer",
                className: "table-coloum-hide",
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
                                width: 150,
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
                    ? TranslationContext.title.partner
                    : "Partner",
                dataIndex: "courierPartner",
                className:
                  "camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header partner-shipment-header",
                width: 150,
                filterDropdown: (data, row) => {
                  return (
                    <div className="campaign-status-drpdwn">
                      <ul>
                        {this.state.PartnerFilterData !== null &&
                          this.state.PartnerFilterData.map((item, p) => {
                            return (
                              <li key={p}>
                                <input
                                  type="checkbox"
                                  id={"New" + item}
                                  className="ch1"
                                  onChange={this.handleCheckPartnerOnchange.bind(
                                    this
                                  )}
                                  name="ShipmentPartner"
                                  attrIds={item}
                                />
                                <label htmlFor={"New" + item}>
                                  <span className="ch1-text">{item}</span>
                                </label>
                              </li>
                            );
                          })}
                      </ul>
                      <div className="dv-status">
                        <button
                          className="btn-apply-status"
                          //   onClick={this.handleGetShipmentTabGridData.bind(
                          //     this,
                          //     "filter"
                          //   )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.apply
                            : "Apply"}
                        </button>
                        <button
                          className="btn-cancel-status"
                          //   onClick={this.handleClosePartnerFilter.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.cancel
                            : "Cancel"}
                        </button>
                      </div>
                    </div>
                  );
                },
                filterDropdownVisible: this.state.filterPodPartner,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterPodPartner: visible }),
                filterIcon: (filtered) => (
                  <span
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  ></span>
                ),
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
                      <Popover
                        content={
                          <div className="order-tab-popover">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="username-mar">
                                    {item.podPaymentReceivedOn}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="username-mar">
                                    {item.podCommentBy}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row m-t-10">
                              <div className="col-md-8">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="username-mar">
                                    {item.podPaymentComent}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        trigger="click"
                        overlayClassName="order-popover shopping-popover-cancel pod-pophover"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                      >
                        {item.isPODPaymentReceived === true ? (
                          <img src={OrderInfo} className="order-info" />
                        ) : null}
                      </Popover>
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
                                // onChange={this.handleCheckDeliIndividualStatus.bind(
                                //   this
                                // )}
                                name="ShipmentStatus"
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
                          //   onClick={this.handleGetShipmentTabGridData.bind(
                          //     this,
                          //     "filter"
                          //   )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.apply
                            : "Apply"}
                        </button>
                        <button
                          className="btn-cancel-status"
                          //   onClick={this.handleCloseStatusFilter.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.cancel
                            : "Cancel"}
                        </button>
                      </div>
                    </div>
                  );
                },
                filterDropdownVisible: this.state.filterPodStatus,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterPodStatus: visible }),
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
                className: "action-w",
                render: (row, item) => {
                  return (
                    <div className="pickuppendingcustom">
                      <>
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
                                    value={this.state.Pod_AddComment}
                                    name="Pod_AddComment"
                                    onChange={(e) =>
                                      this.setState({
                                        Pod_AddComment: e.target.value,
                                      })
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </>
                          }
                          overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                          placement="bottomRight"
                          onVisibleChange={(visible) =>
                            this.setState({
                              orderPopoverOverlay: visible,
                              Pod_AddComment: "",
                            })
                          }
                          icon={false}
                          okText="Proceed"
                          onConfirm={this.handleAddPODComment.bind(
                            this,
                            item.id
                          )}
                          disabled={item.isPODPaymentReceived}
                        >
                          <button
                            className={
                              item.isPODPaymentReceived === true
                                ? "butn order-grid-butn order-grid-butn-green order-grid-btn-disable"
                                : "butn order-grid-butn order-grid-butn-green"
                            }
                            type="button"
                          >
                            {item.actionTypeName}
                          </button>
                        </Popconfirm>
                      </>
                    </div>
                  );
                },
              },
            ]}
            expandedRowRender={(row, item) => {
              return (
                <div className="innertabcollapse">
                  <table>
                    <tr>
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
                              ? TranslationContext.p.shippingaddress
                              : "Shipping Address"}
                          </b>
                        </label>
                        <label style={{ whiteSpace: "initial" }}>
                          {row.shippingAddress}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          <b>
                            {TranslationContext !== undefined
                              ? TranslationContext.title.deliverytype
                              : "Delivery Type"}
                          </b>
                        </label>
                        <label>{row.deliveryTypeName}</label>
                      </td>
                      <td>
                        <label>
                          <b>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.status
                              : "Status"}
                          </b>
                        </label>
                        <div className="d-flex align-items-center">
                          <label>{row.statusName}</label>
                          <Popover
                            content={
                              <div className="order-tab-popover shipment-status-popover">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                          .expectedpickupdate
                                      : "Expected Pickup Date"}
                                    :
                                  </p>
                                  <p className="username-mar">
                                    {row.estimatedDeliveryDate}
                                  </p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                          .expecteddeliverydate
                                      : "Expected Delivery Date"}
                                    :
                                  </p>
                                  <p className="username-mar">
                                    {row.pickupScheduledDate}
                                  </p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                          .charges
                                      : "Charges"}
                                    :
                                  </p>
                                  <p className="username-mar">
                                    {row.shippingCharges}
                                  </p>
                                </div>
                              </div>
                            }
                            trigger="click"
                            overlayClassName="order-popover shopping-popover-cancel shipment-popover-cancel"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderInfo} className="order-info" />
                          </Popover>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>
                          <b>
                            {TranslationContext !== undefined
                              ? TranslationContext.title.partner
                              : "Partner"}
                          </b>
                        </label>
                        <label>{row.courierPartner}</label>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            }}
            expandIconColumnIndex={7}
            expandIconAsCell={false}
            pagination={false}
            showSizeChanger={false}
            onShowSizeChange={false}
            dataSource={this.state.PODGridData}
            loading={this.state.PodLoading}
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

export default POD;
