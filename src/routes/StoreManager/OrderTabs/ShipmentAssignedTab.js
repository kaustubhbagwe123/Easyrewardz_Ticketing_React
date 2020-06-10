import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm, Select } from "antd";
import Modal from "react-responsive-modal";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
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
    };
  }
  componentDidMount() {
    this.handleGetShipmentAssignedData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  handleGetShipmentAssignedData() {
    debugger;
    let self = this;
    var pageNumber = this.state.assignCurrentPage;
    this.setState({
      ShipAssignLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShipmentAssignedDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: pageNumber,
        PageSize: this.state.assignPostsPerPage,
        FilterReferenceNo: "",
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            shipmentAssignedGridData: data.shipmentAssigned,
            totalCount: data.totalCount,
            ShipAssignLoading: false,
          });
        } else {
          self.setState({
            shipmentAssignedGridData: [],
            totalCount: 0,
            ShipAssignLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  AssignedPaginationOnChange = async (numPage) => {
    debugger;
    await this.setState({
      assignCurrentPage: numPage,
    });

    this.handleGetShipmentAssignedData();
  };

  handleAssignedPageItemchange = async (e) => {
    await this.setState({
      assignPostsPerPage: e.target.value,
    });

    this.handleGetShipmentAssignedData();
  };

  handlechange(i, e) {
    debugger;
    let shipmentAssignedGridData = [...this.state.shipmentAssignedGridData];
    shipmentAssignedGridData[i] = {
      ...shipmentAssignedGridData[i],
      [e.target.name]: e.target.value,
    };
    this.setState({
      shipmentAssignedGridData,
    });
  }

  handleUpdateShipmentAssignedData(row, IsProceed) {
    debugger;
    let self = this;
    if (row.awbNo !== "" && row.courierPartner.toLowerCase() !== "store") {
      if (row.referenceNo === "") {
        NotificationManager.error("Please enter POD.");
        return false;
      }
    } else {
      if (row.storeName === "") {
        NotificationManager.error("Please enter store name.");
        return false;
      }

      if (row.staffName === "") {
        NotificationManager.error("Please enter staff name.");
        return false;
      }

      if (row.mobileNumber === "") {
        NotificationManager.error("Please enter mobile number.");
        return false;
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateShipmentAssignedData",
      headers: authHeader(),
      data: {
        ShipmentAWBID: row.shipmentAWBID,
        ReferenceNo: row.referenceNo,
        StoreName: row.storeName,
        StaffName: row.staffName,
        MobileNumber: row.mobileNumber,
        IsProceed: IsProceed,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetShipmentAssignedData();
          NotificationManager.success("Record Updated Successfully.");
          self.setState({
            orderPopoverOverlay: false,
          });
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
                className: "table-coloum-hide",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.referenceno
                    : "Reference No.",
                dataIndex: "referenceNo",
                className: "table-coloum-hide",
                render: (row, item, index) => {
                  return (
                    <div className="d-flex">
                      {item.awbNo !== "" ? (
                        item.referenceNo !== "" && item.isProceed === true ? (
                          <button className="btn-ref deliv-grid-butn">
                            {item.referenceNo}
                          </button>
                        ) : (
                          <button className="btn-ref deliv-grid-butn">
                            <input
                              type="text"
                              name="referenceNo"
                              className="enterpod"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.placeholder.enterpod
                                  : "Reference No"
                              }
                              onChange={this.handlechange.bind(this, index)}
                            />
                          </button>
                        )
                      ) : (
                        <Popover
                          visible={this.state.orderPopoverOverlay}
                          content={
                            <div className="staffdetailspopup">
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
                                type="number"
                                name="mobileNumber"
                                className="form-control"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .entermobileno
                                    : "Enter Mobile No."
                                }
                                value={item.mobileNumber}
                                onChange={this.handlechange.bind(this, index)}
                              />
                              <button
                                type="button"
                                className="popbtnno"
                                onClick={() =>
                                  this.setState({ orderPopoverOverlay: false })
                                }
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.cancel
                                  : "Cancel"}
                              </button>
                              {item.isProceed !== true ? (
                                <button
                                  type="button"
                                  className="popbtn"
                                  onClick={this.handleUpdateShipmentAssignedData.bind(
                                    this,
                                    item,
                                    false
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.done
                                    : "Done"}
                                </button>
                              ) : null}
                            </div>
                          }
                          trigger="click"
                          overlayClassName="order-popover-table order-popover"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                        >
                          <button className="btn-ref deliv-grid-butn">
                            {TranslationContext !== undefined
                              ? TranslationContext.button.staffdetails
                              : "Staff Details"}
                          </button>
                        </Popover>
                      )}
                    </div>
                  );
                },
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.actions
                    : "Action",
                render: (row, item) => {
                  debugger;
                  return item.isProceed !== true ? (
                    <div className="d-flex">
                      <button
                        className="btn-proc deliv-grid-butn"
                        onClick={this.handleUpdateShipmentAssignedData.bind(
                          this,
                          item,
                          true
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.proceed
                          : "Proceed"}
                      </button>
                    </div>
                  ) : (
                    ""
                  );
                },
              },
            ]}
            expandedRowRender={(row, item) => {
              debugger;
              return (
                <div className="innertabcollapse">
                  <div className="">
                    <table className="table">
                      <tr>
                        <td>
                          <label>
                            <b>Courier Partner</b>
                          </label>
                          <label>{row.courierPartner}</label>
                        </td>
                        <td>
                          <label>
                            <b>POD</b>
                          </label>
                          <button>{row.referenceNo}</button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            }}
            expandIconColumnIndex={4}
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
            // totalSize={row.customerCount}
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
