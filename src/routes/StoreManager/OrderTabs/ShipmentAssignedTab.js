import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm, Select } from "antd";
import Modal from "react-responsive-modal";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderHamb from "./../../../assets/Images/order-hamb.png";

class ShipmentAssignedTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shipmentAssignedGridData: [],
      totalCount: 0,
      assignCurrentPage: 1,
      assignPostsPerPage: 10,
      orderPopoverOverlay: false,
    };
  }
  componentDidMount() {
    this.handleGetShipmentAssignedData();
  }
  handleGetShipmentAssignedData() {
    debugger;
    let self = this;
    var pageNumber = this.state.assignCurrentPage;
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
          });
        } else {
          self.setState({
            shipmentAssignedGridData: [],
            totalCount: 0,
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
                title: "AWS No.",
                dataIndex: "awbNo",
              },
              {
                title: "Invoice No.",
                dataIndex: "invoiceNo",
              },
              {
                title: "Courier Partner",
                dataIndex: "courierPartner",
              },
              {
                title: "Reference No.",
                dataIndex: "referenceNo",
                render: (row, item) => {
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
                              className="enterpod"
                              placeholder="Enter POD"
                            />
                          </button>
                        )
                      ) : (
                        <Popover
                          content={
                            <div className="staffdetailspopup">
                              <label>Store Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Store Name"
                                value={item.storeName}
                              />
                              <label>Staff Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Staff Name"
                                value={item.staffName}
                              />
                              <label>Mobile No.</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Mobile No."
                                value={item.mobileNumber}
                              />
                              <button type="button" className="popbtnno">
                                Cancel
                              </button>
                              <button type="button" className="popbtn">
                                Done
                              </button>
                            </div>
                          }
                          trigger="click"
                          overlayClassName="order-popover-table order-popover"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                        >
                          <button className="btn-ref deliv-grid-butn">
                            Staff Details
                          </button>
                        </Popover>
                      )}
                    </div>
                  );
                },
              },
              {
                title: "Action",
                render: (row, item) => {
                  return item.referenceNo === "" ? (
                    <div className="d-flex">
                      <button className="btn-proc deliv-grid-butn">
                        Proceed
                      </button>
                    </div>
                  ) : null;
                },
              },
            ]}
            pagination={false}
            showSizeChanger={true}
            onShowSizeChange={true}
            dataSource={this.state.shipmentAssignedGridData}
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
              <p>Items per page</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShipmentAssignedTab;
