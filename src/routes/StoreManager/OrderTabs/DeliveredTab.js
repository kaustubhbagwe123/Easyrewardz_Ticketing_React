import React, { Component, Fragment } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm, Select } from "antd";
import Modal from "react-responsive-modal";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";

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
    };
  }
  componentDidMount() {
    this.handleGetOrderDeliveredData();
    this.handleGetOrderStatusFilterData(4);
  }
  handleGetOrderDeliveredData() {
    debugger;
    let self = this;
    var pageNumber = this.state.currentPage;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderDeliveredDetails",
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
            deliveredGridData: data.orderDelivereds,
            totalCount: data.totalCount,
          });
        } else {
          self.setState({
            deliveredGridData: [],
            totalCount: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetOrderStatusFilterData(pageID) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: pageID,
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
  PaginationOnChange = async (numPage) => {
    debugger;
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetOrderDeliveredData();
  };

  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
    });

    this.handleGetOrderDeliveredData();
  };
  handleCheckDeliIndividualStatus() {
    debugger;
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
                title: "Invoice no.",
                dataIndex: "invoiceNo",
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
              },
              {
                title: "Items",
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
                title: "Date",
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
                title: "Status",
                className: "camp-status-header camp-status-header-statusFilter",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p className="deliv-status">{item.statusName}</p>
                    </div>
                  );
                },
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
                                onChange={this.handleCheckDeliIndividualStatus.bind(
                                  this
                                )}
                                // checked={this.state.CheckBoxAllStatus}
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
                          Apply
                        </button>
                        <button className="btn-cancel-status">Cancel</button>
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
              {
                title: "Action",
                render: (row, item) => {
                  return (
                    <div className="d-flex">
                      <button
                        className={
                          item.actionTypeName === "Delivered"
                            ? "delibutn deliv-grid-butn"
                            : item.actionTypeName === "Mark As Delivered"
                            ? "markasbutn deliv-grid-butn"
                            : "pickedbutn deliv-grid-butn"
                        }
                      >
                        {item.actionTypeName}
                        {/* {item.statusName === "Delivered"
                              ? "Delivered"
                              : item.statusName === "RTO"
                                ? "Mark As Delivered"
                                : "Picked"} */}
                      </button>
                    </div>
                  );
                },
              },
            ]}
            pagination={false}
            showSizeChanger={true}
            onShowSizeChange={true}
            dataSource={this.state.deliveredGridData}
          />
          <Pagination
            currentPage={this.state.currentPage}
            totalSize={this.state.totalCount}
            // totalSize={row.customerCount}
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
              <p>Items per page</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeliveredTab;
