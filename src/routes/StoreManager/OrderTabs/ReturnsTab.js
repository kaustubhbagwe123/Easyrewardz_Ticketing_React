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
      strStatus: ""
    };
  }

  componentDidMount() {
    this.handleGetOrderReturnsData();
    this.handleGetOrderStatusFilterData();
  }

  handleGetOrderReturnsData() {
    debugger;
    let self = this;
    var pageNumber = this.state.currentPage;
    this.setState({
      returnsLoading: true,
      filterOrderReturnsStatus: false
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderReturnDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: pageNumber,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
      },
    })
      .then(function(res) {
        debugger;
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
    debugger;
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
    debugger;
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
        debugger;
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
    debugger;
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

  render() {
    return (
      <>
        <div className="table-cntr store dv-table-paging">
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
            columns={[
              {
                title: "AWB No.",
                dataIndex: "awbNo",
              },
              {
                title: "Invoice No.",
                dataIndex: "invoiceNo",
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
                      <p>{item.orderReturnsItems.length}</p>
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
                                // width: 150,
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
                title: "Status",
                dataIndex: "statusName",
                className: "camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header",
                filterDropdown: (data, row) => {
                  return (
                    <div className="campaign-status-drpdwn">
                      <ul>
                        {this.state.statusFilterData !== null &&
                          this.state.statusFilterData.map((item, b) => (
                            <li>
                              <input
                                type="checkbox"
                                id={"New" + item.statusID}
                                className="ch1"
                                onChange={this.handleCheckReturnsIndividualStatus.bind(
                                  this
                                )}
                                // checked={this.state.CheckBoxAllStatus}
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
                          Apply
                        </button>
                        <button
                          className="btn-cancel-status"
                          onClick={() =>
                            this.setState({ filterOrderReturnsStatus: false })
                          }
                        >
                          Cancel
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
                title: "Action",
                render: (row, item) => {
                  debugger;
                  return (
                    <div className="d-flex">
                      <button className="butn order-grid-butn order-grid-butn-orange">
                        Cancel
                      </button>
                      <button className="butn order-grid-butn order-grid-butn-yellow retry-butn ml-2">
                        Retry
                      </button>
                    </div>
                  );
                },
              },
            ]}
            expandedRowRender={(row, item) => {
              debugger;
              return (
                <div className="order-expanded-cntr">
                  <div className="row">
                    <div className="col-6">
                      <p className="order-expanded-title">Invoice No.</p>
                      <p>{row.invoiceNo}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Customer</p>
                      <p>{row.customerName},</p>
                      <p className="order-small-font">{row.mobileNumber}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Date</p>
                      <p>{row.date}</p>
                      <p className="order-small-font">{row.time}</p>
                    </div>
                    <div className="col-6">
                      <p className="order-expanded-title">Status</p>
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
            // totalSize={row.customerCount}
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
              <p>Items per page</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ReturnTab;
