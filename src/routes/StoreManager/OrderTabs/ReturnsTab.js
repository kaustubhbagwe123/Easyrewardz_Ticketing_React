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
    };
  }

  componentDidMount() {
    this.handleGetOrderReturnsData();
  }

  handleGetOrderReturnsData() {
    debugger;
    let self = this;
    var pageNumber = this.state.currentPage;
    this.setState({
      returnsLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderReturnDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: pageNumber,
        PageSize: this.state.postsPerPage,
        FilterStatus: "",
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

  render() {
    return (
      <>
        <div className="table-cntr store dv-table-paging">
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
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
                                width: 150,
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
                className: "order-desktop",
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
                      <button className="butn order-grid-butn order-grid-butn-yellow ml-2">
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
                <div className="innertabcollapse">
                  <div className="">
                    <table className="table">
                      <tr>
                        <td>
                          <label>
                            <b>Date</b>
                          </label>
                          <label>{row.date}</label>
                        </td>
                        <td>
                          <label>
                            <b>Customer Name</b>
                          </label>
                          <label>
                            <p>{row.customerName}</p>
                            <p>{row.mobileNumber}</p>
                          </label>
                        </td>
                        <td>
                          <label>
                            <b>Status</b>
                          </label>
                          <label>{row.statusName}</label>
                        </td>
                      </tr>
                    </table>
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
