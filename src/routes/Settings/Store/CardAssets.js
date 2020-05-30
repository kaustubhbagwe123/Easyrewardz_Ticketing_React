import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Select, Popover } from "antd";
import InfoIcon from "./../../../assets/Images/Info-black.png";
import axios from "axios";
import config from "../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { Table } from "antd";
import Bata from "./../../../assets/Images/Bata2.jpg";
// import InfoIcon from "../../assets/Images/info-icon.png";
class CardAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetApprovalData: [
        {
          image: "",
          itemID: "ABC1234",
          updateBy: "XYZ1234",
          uploadData: "12/05/2020",
          storeCode: "Store1",
          storeName: "Store ABC",
          StoreAddress: "Store Address",
        },
      ],
      uploadLogData: [
        {
          image: "",
          itemID: "ABC1234",
          updateBy: "XYZ1234",
          uploadData: "12/05/2020",
          rejectedData: "12/05/2020",
          approvedBy: "MNB123",
          storeCode: "Store1",
          storeName: "Store ABC",
          StoreAddress: "Store Address",
          status: "Added",
        },
        {
          image: "",
          itemID: "ABC1234",
          updateBy: "XYZ1234",
          uploadData: "12/05/2020",
          rejectedData: "12/05/2020",
          approvedBy: "MNB123",
          storeCode: "Store1",
          storeName: "Store ABC",
          StoreAddress: "Store Address",
          status: "Rejected",
        },
      ],
    };
  }
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="store-task-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#asset-approval"
                role="tab"
                aria-controls="asset-approval"
                aria-selected="true"
              >
                Asset Approval
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#upload-log"
                role="tab"
                aria-controls="upload-log"
                aria-selected="true"
              >
                Upload Logs
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="asset-approval"
            role="tabpanel"
            aria-labelledby="asset-approval"
          >
            <div className="table-cntr store chat-history chatabcus">
              <Table
                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                    render: (row, rowdata) => {
                      return (
                        <>
                          <img src={Bata} alt="card-img" />
                        </>
                      );
                    },
                  },
                  {
                    title: "ImteID/SKU ID",
                    dataIndex: "itemID",
                  },
                  {
                    title: "Uploaded By",
                    dataIndex: "updateBy",
                    render: (row, rowdata) => {
                      return (
                        <>
                          {rowdata.updateBy}
                          <Popover
                            content={
                              <div className="dash-creation-popup-cntr">
                                <ul className="dash-category-popup dashnewpopup">
                                  <li>
                                    <p>Uploaded Data</p>
                                    <p>{rowdata.uploadData}</p>
                                  </li>
                                  <li>
                                    <p>Store Code</p>
                                    <p>{rowdata.storeCode}</p>
                                  </li>
                                  <li>
                                    <p>Store Name</p>
                                    <p>{rowdata.storeName}</p>
                                  </li>
                                  <li>
                                    <p>Store Address</p>
                                    <p>{rowdata.StoreAddress}</p>
                                  </li>
                                </ul>
                              </div>
                            }
                            placement="bottom"
                          >
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </Popover>
                        </>
                      );
                    },
                  },
                  {
                    title: "Action",
                    render: (row, rowdata) => {
                      return (
                        <>
                          <button>Add to Libarary</button>
                          <button>reject</button>
                        </>
                      );
                    },
                  },
                ]}
                pagination={{ defaultPageSize: 10 }}
                dataSource={this.state.assetApprovalData}
              ></Table>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="upload-log"
            role="tabpanel"
            aria-labelledby="upload-log"
          >
            <div className="table-cntr store chat-history chatabcus">
              <Table
                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                    render: (row, rowdata) => {
                      return (
                        <>
                          <img src={Bata} alt="card-img" />
                        </>
                      );
                    },
                  },
                  {
                    title: "ImteID/SKU ID",
                    dataIndex: "itemID",
                  },
                  {
                    title: "Uploaded By",
                    dataIndex: "updateBy",
                    render: (row, rowdata) => {
                      return (
                        <>
                          {rowdata.updateBy}
                          <Popover
                            content={
                              <div className="dash-creation-popup-cntr">
                                <ul className="dash-category-popup dashnewpopup">
                                  <li>
                                    <p>Uploaded Data</p>
                                    <p>{rowdata.uploadData}</p>
                                  </li>
                                  <li>
                                    <p>Store Code</p>
                                    <p>{rowdata.storeCode}</p>
                                  </li>
                                  <li>
                                    <p>Store Name</p>
                                    <p>{rowdata.storeName}</p>
                                  </li>
                                  <li>
                                    <p>Store Address</p>
                                    <p>{rowdata.StoreAddress}</p>
                                  </li>
                                </ul>
                              </div>
                            }
                            placement="bottom"
                          >
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </Popover>
                        </>
                      );
                    },
                  },

                  {
                    title: "Approved By",
                    dataIndex: "updateBy",
                    render: (row, rowdata) => {
                      return (
                        <>
                          {rowdata.approvedBy}
                          <Popover
                            content={
                              <div className="dash-creation-popup-cntr">
                                <ul className="dash-category-popup dashnewpopup">
                                  <li>
                                    <p>Rejected Data</p>
                                    <p>{rowdata.rejectedData}</p>
                                  </li>
                                  <li>
                                    <p>Store Code</p>
                                    <p>{rowdata.storeCode}</p>
                                  </li>
                                  <li>
                                    <p>Store Name</p>
                                    <p>{rowdata.storeName}</p>
                                  </li>
                                  <li>
                                    <p>Store Address</p>
                                    <p>{rowdata.StoreAddress}</p>
                                  </li>
                                </ul>
                              </div>
                            }
                            placement="bottom"
                          >
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </Popover>
                        </>
                      );
                    },
                  },
                  {
                    title: "Status",
                    render: (row, rowdata) => {
                      return (
                        <>
                          <label>{rowdata.status}</label>
                        </>
                      );
                    },
                  },
                ]}
                pagination={{ defaultPageSize: 10 }}
                dataSource={this.state.uploadLogData}
              ></Table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default CardAssets;
