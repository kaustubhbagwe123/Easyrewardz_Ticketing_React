import React, { Component } from "react";
import axios from "axios";
import { Table, Popconfirm } from "antd";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class ShipmentAssignedTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shipmentAssignedGridData: [],
      totalCount: 0,
      assignCurrentPage: 1,
      assignPostsPerPage: 10,
      orderPopoverOverlay: false,
      ShipAssignLoading: false,
      translateLanguage: {},
      orderIDs: [41814156],
      orderSearchText: "",
      PartnerFilterData: [],
      strPartner: "",
      filterShipmentPartner: false,
    };
  }
  componentDidMount() {
    this.handleGetShipmentAssignedData();
    this.handleGetShipmentAssignPartnerFilterData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  handleShipmentAssignSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
    });
    setTimeout(() => {
      this.handleGetShipmentAssignedData();
    }, 5);
  };
  /// ----------------API function start----------------------
  /// Handle Get grid data
  handleGetShipmentAssignedData() {
    let self = this;
    this.setState({
      ShipAssignLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShipmentAssignedDetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText,
        PageNo: this.state.assignCurrentPage,
        PageSize: this.state.assignPostsPerPage,
        FilterReferenceNo: "",
        CourierPartner: this.state.strPartner,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            shipmentAssignedGridData: data.shipmentAssigned,
            totalCount: data.totalCount,
            ShipAssignLoading: false,
            filterShipmentPartner: false,
          });
        } else {
          self.setState({
            shipmentAssignedGridData: [],
            totalCount: 0,
            ShipAssignLoading: false,
            filterShipmentPartner: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// get shipment assign partner filter data
  handleGetShipmentAssignPartnerFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetCourierPartnerFilter",
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
  handleUpdateShipmentAssignedData(row, IsProceed) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (row.awbNo !== "" && row.courierPartner.toLowerCase() !== "store") {
      if (row.referenceNo === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterpod
            : "Please enter POD."
        );
        return false;
      }
    } else {
      if (row.storeName === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterstorename
            : "Please enter store name."
        );
        return false;
      }

      if (row.staffName === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterstaffname
            : "Please enter staff name."
        );
        return false;
      }

      if (row.mobileNumber === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentermobilenumber
            : "Please enter mobile number."
        );
        return false;
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateShipmentAssignedData",
      headers: authHeader(),
      data: {
        ShipmentAWBID: row.shipmentAWBID,
        OrderID: row.orderID,
        ReferenceNo: row.referenceNo,
        StoreName: row.storeName,
        StaffName: row.staffName,
        MobileNumber: row.mobileNumber,
        IsProceed: IsProceed,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetShipmentAssignedData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully."
          );
          self.setState({
            orderPopoverOverlay: false,
          });
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateDeliveredByShipAssigned(orderID) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateShipmentAssignedDelivered",
      headers: authHeader(),
      params: {
        orderID: orderID,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetShipmentAssignedData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully."
          );
          self.setState({
            orderPopoverOverlay: false,
          });
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateShipmentAssignedRTO(orderID) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateShipmentAssignedRTO",
      headers: authHeader(),
      params: {
        orderID: orderID,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetShipmentAssignedData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully."
          );
          self.setState({
            orderPopoverOverlay: false,
          });
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handlePrintManifest(orderIds) {
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/ShipmentAssignedPrintManifest",
      headers: authHeader(),
      params: {
        OrderIds: orderIds,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          window.location.href = res.data.responseData.manifestUrl;
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handlePrintLabel(shipmentId) {
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/ShipmentAssignedPrintLabel",
      headers: authHeader(),
      params: {
        ShipmentId: shipmentId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          window.location.href = res.data.responseData.label_url;
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Pr5int Invoice data
  handlePrintInvoice(orderIds) {
    debugger
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/ShipmentAssignedPrintInvoice",
      headers: authHeader(),
      params: {
        OrderIds: orderIds,
      },
    })
      .then(function(res) {
        debugger
        let status = res.data.message;
        if (status === "Success") {
          window.location.href = res.data.responseData.invoice_url;
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// ----------------API function end----------------------
  AssignedPaginationOnChange = async (numPage) => {
    await this.setState({
      assignCurrentPage: numPage,
    });

    this.handleGetShipmentAssignedData();
  };

  handleAssignedPageItemchange = async (e) => {
    await this.setState({
      assignPostsPerPage: e.target.value,
      assignCurrentPage: 1,
    });

    this.handleGetShipmentAssignedData();
  };
  /// handle Close Partner filter
  handleClosePartnerFilter() {
    this.setState({
      filterShipmentPartner: false,
    });
  }

  handlechange(i, e) {
    var name = e.target.name;
    let shipmentAssignedGridData = [...this.state.shipmentAssignedGridData];
    if (name === "mobileNumber") {
      var reg = /^[0-9\b]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        shipmentAssignedGridData[i] = {
          ...shipmentAssignedGridData[i],
          [e.target.name]: e.target.value,
        };
        this.setState({
          shipmentAssignedGridData,
        });
      } else {
        e.target.value = "";
      }
    } else {
      shipmentAssignedGridData[i] = {
        ...shipmentAssignedGridData[i],
        [e.target.name]: e.target.value,
      };
      this.setState({
        shipmentAssignedGridData,
      });
    }
  }

  /// handle check partner status
  handleCheckPartnerOnchange() {
    var checkboxes = document.getElementsByName("ShipmentPartner");
    var strPartner = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strPartner += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      strPartner,
      currentPage: 1,
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
            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
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
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.courierpartner
                    : "Courier Partner",
                dataIndex: "courierPartner",
                className:
                  "shopping-delivery-header camp-status-header courier-shipment-header camp-status-header-statusFilter table-coloum-hide order-status-header",
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
                          onClick={this.handleGetShipmentAssignedData.bind(
                            this
                          )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.apply
                            : "Apply"}
                        </button>
                        <button
                          className="btn-cancel-status"
                          onClick={this.handleClosePartnerFilter.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.cancel
                            : "Cancel"}
                        </button>
                      </div>
                    </div>
                  );
                },
                filterDropdownVisible: this.state.filterShipmentPartner,
                onFilterDropdownVisibleChange: (visible) =>
                  this.setState({ filterShipmentPartner: visible }),
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
                className: "cus-strecth",
                render: (row, item, index) => {
                  return item.awbNo !== "" &&
                    item.courierPartner.toLowerCase() !== "store" ? (
                    <div className="d-flex">
                      <button
                        className="butn order-grid-butn assign-grid-btn"
                        onClick={this.handlePrintManifest.bind(
                          this,
                          item.courierPartnerOrderID
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.printmanifest
                          : "Print Manifest"}
                      </button>
                      <button
                        className="butn order-grid-butn order-grid-butn-yellow assign-grid-btn"
                        onClick={this.handlePrintLabel.bind(
                          this,
                          item.courierPartnerShipmentID
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.printlabel
                          : "Print Label"}
                      </button>
                      <button
                        className="butn order-grid-butn order-grid-butn-green assign-grid-btn"
                        onClick={this.handlePrintInvoice.bind(
                          this,
                          item.courierPartnerOrderID
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.printinvoice
                          : "Print Invoice"}
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <Popconfirm
                        title={
                          <>
                            <div className="">
                              <label>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.storename
                                  : "Store Name"}
                              </label>
                              <input
                                type="text"
                                name="storeName"
                                className="form-control"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .enterstorename
                                    : "Enter Store Name"
                                }
                                value={item.storeName}
                                onChange={this.handlechange.bind(this, index)}
                              />
                              <label>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.staffname
                                  : "Staff Name"}
                              </label>
                              <input
                                type="text"
                                name="staffName"
                                className="form-control"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .enterstaffname
                                    : "Enter Staff Name"
                                }
                                value={item.staffName}
                                onChange={this.handlechange.bind(this, index)}
                              />
                              <label>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.mobileno
                                  : "Mobile No."}
                              </label>
                              <input
                                type="text"
                                name="mobileNumber"
                                className="form-control"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .entermobileno
                                    : "Enter Mobile No."
                                }
                                value={item.mobileNumber}
                                // maxLength={10}
                                onChange={this.handlechange.bind(this, index)}
                              />
                            </div>
                          </>
                        }
                        overlayClassName="order-popover order-popover-butns order-popover-address"
                        placement="topLeft"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                        icon={false}
                        okText="Done"
                        onConfirm={this.handleUpdateShipmentAssignedData.bind(
                          this,
                          item,
                          false
                        )}
                      >
                        <button className="butn order-grid-butn assign-grid-btn">
                          {TranslationContext !== undefined
                            ? TranslationContext.button.staffdetails
                            : "Staff Details"}
                        </button>
                      </Popconfirm>
                      <button
                        className={
                          item.storeName !== "" &&
                          item.staffName !== "" &&
                          item.mobileNumber !== ""
                            ? "butn order-grid-butn order-grid-butn-yellow assign-grid-btn"
                            : "butn order-grid-butn order-grid-butn-yellow assign-grid-btn order-grid-btn-disable"
                        }
                        onClick={this.handleUpdateShipmentAssignedRTO.bind(
                          this,
                          item.orderID
                        )}
                        disabled={
                          item.storeName !== "" &&
                          item.staffName !== "" &&
                          item.mobileNumber !== ""
                            ? false
                            : true
                        }
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.rto
                          : "RTO"}
                      </button>
                      <button
                        className={
                          item.storeName !== "" &&
                          item.staffName !== "" &&
                          item.mobileNumber !== ""
                            ? "butn order-grid-butn order-grid-butn-green assign-grid-btn"
                            : "butn order-grid-butn order-grid-butn-green assign-grid-btn order-grid-btn-disable"
                        }
                        onClick={this.handleUpdateDeliveredByShipAssigned.bind(
                          this,
                          item.orderID
                        )}
                        disabled={
                          item.storeName !== "" &&
                          item.staffName !== "" &&
                          item.mobileNumber !== ""
                            ? false
                            : true
                        }
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.delivered
                          : "Delivered"}
                      </button>
                    </div>
                  );
                },
                width: 120,
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
                                ? TranslationContext.title.courierpartner
                                : "Courier Partner"}
                            </b>
                          </label>
                          <label>{row.courierPartner}</label>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            }}
            expandIconColumnIndex={3}
            expandIconAsCell={false}
            pagination={false}
            showSizeChanger={true}
            onShowSizeChange={true}
            dataSource={this.state.shipmentAssignedGridData}
            loading={this.state.ShipAssignLoading}
          />
          <Pagination
            currentPage={this.state.assignCurrentPage}
            totalSize={this.state.totalCount}
            sizePerPage={this.state.assignPostsPerPage}
            changeCurrentPage={this.AssignedPaginationOnChange}
            theme="bootstrap"
          />
          <div className="position-relative">
            <div className="item-selection Camp-pagination">
              <select
                value={this.state.assignPostsPerPage}
                onChange={this.handleAssignedPageItemchange}
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

export default ShipmentAssignedTab;
