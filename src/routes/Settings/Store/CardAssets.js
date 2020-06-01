import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Select, Popover } from "antd";
import InfoIcon from "./../../../assets/Images/ico.png";
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
  ////handle get card image upload log
  handleGetCardImageUploadlog() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetCardImageUploadlog",
      headers: authHeader(),
    })
      .then(function(response) {})
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }

  handleApproveRejectCardImage(){

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/ApproveRejectCardImage",
      headers: authHeader(),
      params:{
        ID:1,
        ItemID:"",
        AddToLibrary:""
      }
    })
      .then(function(response) {})
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="custom-tableak cardasscus">
        <div className="store-task-tabs" style={{backgroundColor: "transparent"}}>
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
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                    render: (row, rowdata) => {
                      return (
                        <>
                          <div className="card-img"><img src={Bata} alt="card-img" /></div>
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
                            overlayClassName="cardassetspop"
                            content={
                              <div className="dash-creation-popup-cntr" style={{display: "block"}}>
                                <ul className="dash-category-popup dashnewpopup">
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Uploaded Data</label>
                                    <p style={{display: "inline"}}>{rowdata.uploadData}</p>
                                  </li>
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Code</label>
                                    <p style={{display: "inline"}}>{rowdata.storeCode}</p>
                                  </li>
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Name</label>
                                    <p style={{display: "inline"}}>{rowdata.storeName}</p>
                                  </li>
                                  <li>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Address</label>
                                    <p style={{display: "inline"}}>{rowdata.StoreAddress}</p>
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
                          <div className="cardsresbtn">
                            <button className="btngreen">Add to Library</button>
                            <button className="btnred">Reject</button>
                          </div>
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
            <div className="table-cntr store">
              <Table
                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                    render: (row, rowdata) => {
                      return (
                        <>
                          <div className="card-img"><img src={Bata} alt="card-img" /></div>
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
                            overlayClassName="cardassetspop"
                            content={
                              <div className="dash-creation-popup-cntr" style={{display: "block"}}>
                                <ul className="dash-category-popup dashnewpopup">
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Uploaded Data</label>
                                    <p style={{display: "inline"}}>{rowdata.uploadData}</p>
                                  </li>
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Code</label>
                                    <p style={{display: "inline"}}>{rowdata.storeCode}</p>
                                  </li>
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Name</label>
                                    <p style={{display: "inline"}}>{rowdata.storeName}</p>
                                  </li>
                                  <li>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Address</label>
                                    <p style={{display: "inline"}}>{rowdata.StoreAddress}</p>
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
                            overlayClassName="cardassetspop"
                            content={
                              <div className="dash-creation-popup-cntr" style={{display: "block"}}>
                                <ul className="dash-category-popup dashnewpopup">
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Rejected Data</label>
                                    <p style={{display: "inline"}}>{rowdata.rejectedData}</p>
                                  </li>
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Code</label>
                                    <p style={{display: "inline"}}>{rowdata.storeCode}</p>
                                  </li>
                                  <li style={{paddingBottom: "10px",borderBottom: "1px solid #ddd",marginBottom: "8px"}}>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Name</label>
                                    <p style={{display: "inline"}}>{rowdata.storeName}</p>
                                  </li>
                                  <li>
                                    <label style={{width: "50%",fontWeight:"bold"}}>Store Address</label>
                                    <p style={{display: "inline"}}>{rowdata.StoreAddress}</p>
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
                          <div className="text-right"><label className="statusbtnadd">{rowdata.status}</label></div>
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
        </div>
      </React.Fragment>
    );
  }
}
export default CardAssets;
