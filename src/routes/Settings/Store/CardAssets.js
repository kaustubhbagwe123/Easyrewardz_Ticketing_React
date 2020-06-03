import React, { Component } from "react";
import { Popover } from "antd";
import InfoIcon from "./../../../assets/Images/ico.png";
import axios from "axios";
import config from "../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { Table } from "antd";
import "antd/dist/antd.css";
import { NotificationManager } from "react-notifications";
import Modal from "react-bootstrap/Modal";
import CancelImg from "./../../../assets/Images/cancel.png";
import * as translationHI from './../../../translations/hindi'
import * as translationMA from './../../../translations/marathi'

// import InfoIcon from "../../assets/Images/info-icon.png";
class CardAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetApprovalData: [],
      uploadLogData: [],
      loading: false,
      imageModal: false,
      imagePath: "",
      translateLanguage: {}
    };
  }
  componentDidMount() {
    this.handleGetCardImageUploadlog(1);
    if(window.localStorage.getItem("translateLanguage") === "hindi"){
      this.state.translateLanguage = translationHI
     }
     else if(window.localStorage.getItem("translateLanguage") === 'marathi'){
       this.state.translateLanguage = translationMA
     }
     else{
       this.state.translateLanguage = {}
     }
  }
  ////handle get card image upload log
  handleGetCardImageUploadlog(listFor) {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetCardImageUploadlog",
      headers: authHeader(),
      params: { ListingFor: listFor }, //// asset approve for 1 and upload log  for 2
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (listFor == 1) {
          if (message === "Success" && responseData) {
            self.setState({ assetApprovalData: responseData, loading: false });
          } else {
            self.setState({
              assetApprovalData: [],
              loading: false,
            });
          }
        } else {
          if (message === "Success" && responseData) {
            self.setState({ uploadLogData: responseData, loading: false });
          } else {
            self.setState({
              uploadLogData: [],
              loading: false,
            });
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }

  handleApproveRejectCardImage(imageUploadLogID, itemID, status) {
    let self = this;
    debugger;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/ApproveRejectCardImage",
      headers: authHeader(),
      params: {
        ID: imageUploadLogID,
        ItemID: itemID,
        AddToLibrary: status,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          if (status) {
            NotificationManager.success("Image added successfully.");
          } else {
            NotificationManager.success("Image rejected successfully.");
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }
////handle image modal pop up close
  handleImageCloseModal = () => {
    this.setState({ imageModal: false ,imagePath:""});
  };
////handle image modal pop up open
  handleImageOpenModal(imagePath) {
    this.setState({ imageModal: true, imagePath });
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="custom-tableak cardasscus">
          <div
            className="store-task-tabs"
            style={{ backgroundColor: "transparent" }}
          >
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#asset-approval"
                  role="tab"
                  aria-controls="asset-approval"
                  aria-selected="true"
                  onClick={this.handleGetCardImageUploadlog.bind(this, 1)}
                  style={{ outline: "none" }}
                >
                  
                  {TranslationContext!==undefined?TranslationContext.a.assetapproval:"Asset Approval"}
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
                  onClick={this.handleGetCardImageUploadlog.bind(this, 2)}
                  style={{ outline: "none" }}
                >
                  {TranslationContext!==undefined?TranslationContext.a.uploadlogs:"Upload Logs"}
                  
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
                  loading={this.state.loading}
                  noDataContent="No Record Found"
                  className="components-table-demo-nested antd-table-campaign custom-antd-table"
                  columns={[
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.image:"Image",
                      dataIndex: "imageURL",
                      render: (row, rowdata) => {
                        return (
                          <>
                            <div
                              className="card-img"
                              onClick={this.handleImageOpenModal.bind(
                                this,
                                rowdata.imageURL
                              )}
                            >
                              <img src={rowdata.imageURL} alt="card-img" />
                            </div>
                          </>
                        );
                      },
                    },
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.imteidskuid:"ImteID/SKU ID",
                      dataIndex: "itemID",
                    },
                    {
                      title:TranslationContext!==undefined?TranslationContext.title.uploadedby:"Uploaded By",
                      dataIndex: "createdByName",
                      render: (row, rowdata) => {
                        return (
                          <>
                            {rowdata.createdByName}
                            <Popover
                              overlayClassName="cardassetspop"
                              content={
                                <div
                                  className="dash-creation-popup-cntr"
                                  style={{ display: "block" }}
                                >
                                  <ul className="dash-category-popup dashnewpopup">
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.uploadeddata:"Uploaded Data"}
                                       
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.createdDate}
                                      </p>
                                    </li>
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.storecode:"Store Code"}
                                       
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeCode}
                                      </p>
                                    </li>
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {TranslationContext!==undefined?TranslationContext.label.storename:"Store Name"}
                                       
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeName}
                                      </p>
                                    </li>
                                    <li>
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.storeaddress:"Store Address"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeAddress}
                                      </p>
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
                      title: TranslationContext!==undefined?TranslationContext.title.actions:"Action",
                      render: (row, rowdata) => {
                        return (
                          <>
                            <div className="cardsresbtn">
                              <button
                                className="btngreen"
                                onClick={this.handleApproveRejectCardImage.bind(
                                  this,
                                  rowdata.imageUploadLogID,
                                  rowdata.itemID,
                                  true
                                )}
                              >
                                 {TranslationContext!==undefined?TranslationContext.button.addtolibrary:"Add to Library"}
                               
                              </button>
                              <button
                                className="btnred"
                                onClick={this.handleApproveRejectCardImage.bind(
                                  this,
                                  rowdata.imageUploadLogID,
                                  rowdata.itemID,
                                  false
                                )}
                              >
                                  {TranslationContext!==undefined?TranslationContext.button.reject:"Reject"}
                                
                              </button>
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
                  loading={this.state.loading}
                  noDataContent="No Record Found"
                  className="components-table-demo-nested antd-table-campaign custom-antd-table"
                  columns={[
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.image:"Image",
                      dataIndex: "imageURL",
                      render: (row, rowdata) => {
                        return (
                          <>
                            <div
                              className="card-img"
                              onClick={this.handleImageOpenModal.bind(
                                this,
                                rowdata.imageURL
                              )}
                            >
                              <img src={rowdata.imageURL} alt="card-img" />
                            </div>
                          </>
                        );
                      },
                    },
                    {
                      title: TranslationContext!==undefined?TranslationContext.title.imteidskuid:"ImteID/SKU ID",
                      dataIndex: "itemID",
                    },
                    {
                      title:TranslationContext!==undefined?TranslationContext.title.uploadedby:"Uploaded By",
                      dataIndex: "createdByName",
                      render: (row, rowdata) => {
                        return (
                          <>
                            {rowdata.createdByName}
                            <Popover
                              overlayClassName="cardassetspop"
                              content={
                                <div
                                  className="dash-creation-popup-cntr"
                                  style={{ display: "block" }}
                                >
                                  <ul className="dash-category-popup dashnewpopup">
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                         {TranslationContext!==undefined?TranslationContext.label.uploadeddata:"Uploaded Data"}
                                       
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.createdDate}
                                      </p>
                                    </li>
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.storecode:"Store Code"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeCode}
                                      </p>
                                    </li>
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.storename:"Store Name"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeName}
                                      </p>
                                    </li>
                                    <li>
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.storeaddress:"Store Address"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeAddress}
                                      </p>
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
                      title: TranslationContext!==undefined?TranslationContext.title.approvedby:"Approved By",
                      dataIndex: "modifyByName",
                      render: (row, rowdata) => {
                        return (
                          <>
                            {rowdata.modifyByName}
                            <Popover
                              overlayClassName="cardassetspop"
                              content={
                                <div
                                  className="dash-creation-popup-cntr"
                                  style={{ display: "block" }}
                                >
                                  <ul className="dash-category-popup dashnewpopup">
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                           {TranslationContext!==undefined?TranslationContext.label.rejecteddata:"Rejected Data"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.modifyDate}
                                      </p>
                                    </li>
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {TranslationContext!==undefined?TranslationContext.label.storecode:"Store Code"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeCode}
                                      </p>
                                    </li>
                                    <li
                                      style={{
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                          {TranslationContext!==undefined?TranslationContext.label.storename:"Store Name"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeName}
                                      </p>
                                    </li>
                                    <li>
                                      <label
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {TranslationContext!==undefined?TranslationContext.label.storeaddress:"Store Address"}
                                        
                                      </label>
                                      <p style={{ display: "inline" }}>
                                        {rowdata.storeAddress}
                                      </p>
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
                      title: TranslationContext!==undefined?TranslationContext.title.status:"Status",
                      render: (row, rowdata) => {
                        return (
                          <>
                            <div className="text-right">
                              <label
                                className={
                                  rowdata.isAddedToLibrary
                                    ? "statusbtnadd"
                                    : "statusbtnrej"
                                }
                              >
                                {rowdata.isAddedToLibrary
                                  ? "Added"
                                  : "Rejected"}
                              </label>
                            </div>
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
        <Modal
          show={this.state.imageModal}
          onHide={this.handleImageCloseModal.bind(this)}
          modalId="Status-popup"
          overlayId="logout-ovrly"
        >
          <div>
            <img
              src={CancelImg}
              alt="cancelImg"
              className="cancalImg"
              style={{ margin: "10px" }}
              onClick={this.handleImageCloseModal.bind(this)}
            />
            <img src={this.state.imagePath} alt={"product-img"} />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
export default CardAssets;
