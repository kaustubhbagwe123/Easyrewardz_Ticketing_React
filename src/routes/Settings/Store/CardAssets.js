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
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import CancelImg from "./../../../assets/Images/cancel.png";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
var uid = 0;
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
      translateLanguage: {},
      approvalTypeData: [],
      isApproval: true,
      rejectionComment: "",
      rejectionModal: false,
      imageUploadLogID: "",
      itemID: "",
      isSubmitRejection: false,
    };
  }
  componentDidMount() {
    // this.handleGetCardImageUploadlog(1);
    this.handleGetCardImageApproval();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
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
  ////handle approve and reject card image
  handleApproveRejectCardImage(imageUploadLogID, itemID, status) {
    const TranslationContext = this.state.translateLanguage.default;
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
        RejectionReason: !status ? this.state.rejectionComment : "",
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          if (status) {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.imageaddedsuccessfully
                : "Image Added Successfully"
            );
          } else {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.imagerejectedsuccessfully
                : "Image Rejected Successfully"
            );
            self.setState({
              isRejectionComment: "",
              rejectionComment: "",
              rejectionModal: false,
            });
          }
        }
        self.handleGetCardImageUploadlog(1);
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }
  ////handle image modal pop up close
  handleImageCloseModal = () => {
    this.setState({ imageModal: false, imagePath: "" });
  };
  ////handle image modal pop up open
  handleImageOpenModal(imagePath) {
    this.setState({ imageModal: true, imagePath });
  }

  ////handle get card image approvel
  handleGetCardImageApproval() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetCardImageApproval",
      headers: authHeader(),
    })
      .then((response) => {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          var isApproval = responseData.filter(
            (x) => x.approvalType === "Automatic"
          )[0].isEnabled;
          self.setState({ isApproval });
          if (isApproval) {
            self.handleGetCardImageUploadlog(2);
          } else {
            self.handleGetCardImageUploadlog(1);
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageApproval");
      });
  }
  ////handle open rejection modal
  handleOpenRejectionModal = (imageUploadLogID, itemID) => {
    this.setState({
      rejectionModal: true,
      imageUploadLogID,
      itemID,
    });
  };

  ////handle close rejection modal
  handleCloseRejectionModal = () => {
    this.setState({ rejectionModal: false });
  };
  ////handle rejection comment change
  handleRectionCommentChange(e) {
    if (e.target.value !== "") {
      this.setState({
        rejectionComment: e.target.value,
        isRejectionComment: "",
      });
    } else {
      this.setState({
        rejectionComment: e.target.value,
        // isAssignComment: "Please enter comment.",
      });
    }
  }
  ////handle submit rejection reason
  handleSubmitRejectionReason() {
    if (this.state.rejectionComment) {
      this.setState({ isSubmitRejection: true });
      this.handleApproveRejectCardImage(
        this.state.imageUploadLogID,
        this.state.itemID,
        false
      );
    } else {
      this.setState({ isRejectionComment: "Enter Card Rejection Reason" });
    }
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.cardassets
              : "Card Assets"}
          </Link>
        </div>
        <div className="custom-tableak cardasscus">
          <div
            className="store-task-tabs"
            style={{ backgroundColor: "transparent" }}
          >
            <ul className="nav nav-tabs" role="tablist">
              {this.state.isApproval === false ? (
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
                    {TranslationContext !== undefined
                      ? TranslationContext.a.assetapproval
                      : "Asset Approval"}
                  </a>
                </li>
              ) : null}
              <li className="nav-item">
                <a
                  className={
                    this.state.isApproval === true
                      ? "nav-link active"
                      : "nav-link"
                  }
                  data-toggle="tab"
                  href="#upload-log"
                  role="tab"
                  aria-controls="upload-log"
                  aria-selected="true"
                  onClick={this.handleGetCardImageUploadlog.bind(this, 2)}
                  style={{ outline: "none" }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.uploadlogs
                    : "Upload Logs"}
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            {this.state.isApproval === false ? (
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
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.image
                            : "Image",
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
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.imteidskuid
                            : "ItemID/SKU ID",
                        dataIndex: "itemID",
                        render: (row, rowdata) => {
                          return (
                            <>
                              {
                                <label title="ItemID/SKU ID">
                                  {rowdata.itemID}
                                </label>
                              }
                            </>
                          );
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.uploadedby
                            : "Uploaded By",
                        dataIndex: "createdByName",
                        render: (row, rowdata) => {
                          return (
                            <span className="one-liner store-one-liner">
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .uploadeddate
                                            : "Uploaded Date"}
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.storecode
                                            : "Store Code"}
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.storename
                                            : "Store Name"}
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .storeaddress
                                            : "Store Address"}
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
                                  className="info-icon-cp"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          );
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.actions
                            : "Action",
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
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.addtolibrary
                                    : "Add to Library"}
                                </button>
                                <button
                                  className="btnred"
                                  onClick={this.handleOpenRejectionModal.bind(
                                    this,
                                    rowdata.imageUploadLogID,
                                    rowdata.itemID,
                                    false
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.reject
                                    : "Reject"}
                                </button>
                              </div>
                            </>
                          );
                        },
                      },
                    ]}
                    rowKey={(record) => {
                      if (record.itemID) {
                        uid = uid + 1;
                        return record.itemID + "i" + uid;
                      } else {
                        uid = uid + 1;
                        return "i" + uid;
                      }
                    }}
                    pagination={{ defaultPageSize: 10 }}
                    dataSource={this.state.assetApprovalData}
                  ></Table>
                </div>
              </div>
            ) : null}
            <div
              className={
                this.state.isApproval === false
                  ? "tab-pane fade"
                  : "tab-pane fade show active"
              }
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
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.image
                          : "Image",
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
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.imteidskuid
                          : "ItemID/SKU ID",
                      dataIndex: "itemID",
                      render: (row, rowdata) => {
                        return (
                          <>
                            {
                              <label title="ItemID/SKU ID">
                                {rowdata.itemID}
                              </label>
                            }
                          </>
                        );
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.uploadedby
                          : "Uploaded By",
                      dataIndex: "createdByName",
                      render: (row, rowdata) => {
                        return (
                          <span className="one-liner store-one-liner">
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .uploadeddate
                                          : "Uploaded Date"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.storecode
                                          : "Store Code"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.storename
                                          : "Store Name"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .storeaddress
                                          : "Store Address"}
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
                                className="info-icon-cp"
                                src={InfoIcon}
                                alt="info-icon"
                              />
                            </Popover>
                          </span>
                        );
                      },
                    },

                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.approvedby
                          : "Approved By",
                      dataIndex: "modifyByName",
                      render: (row, rowdata) => {
                        return (
                          <span className="one-liner store-one-liner">
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .approverejecteddata
                                          : "Approved/Rejected Date"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.storecode
                                          : "Store Code"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.storename
                                          : "Store Name"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .storeaddress
                                          : "Store Address"}
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
                                className="info-icon-cp"
                                src={InfoIcon}
                                alt="info-icon"
                              />
                            </Popover>
                          </span>
                        );
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.title.status
                          : "Status",
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
                              {!rowdata.isAddedToLibrary ? (
                                <Popover
                                  overlayClassName="cardassetspop"
                                  content={
                                    <div
                                      className="dash-creation-popup-cntr"
                                      style={{ display: "block" }}
                                    >
                                      {/* <label
                                            style={{
                                              width: "50%",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Rejection Reason
                                          </label> */}
                                      <p>{rowdata.rejectionReason}</p>
                                    </div>
                                  }
                                  placement="rightBottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              ) : null}
                            </div>
                          </>
                        );
                      },
                    },
                  ]}
                  rowKey={(record) => {
                    if (record.itemID) {
                      uid = uid + 1;
                      return record.itemID + "d" + uid;
                    } else {
                      uid = uid + 1;
                      return "d" + uid;
                    }
                  }}
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
          </div>
          <div style={{ padding: "20px", width: "100%" }}>
            <img
              src={this.state.imagePath}
              alt={"product-img"}
              style={{ width: "100%" }}
            />
          </div>
        </Modal>

        <Modal
          show={this.state.rejectionModal}
          onHide={this.handleCloseRejectionModal.bind(this)}
          closeIconId="sdsg"
          modalId="Historical-popup"
          overlayId="logout-ovrly"
          classNames={{
            modal: "rejectmodal-popup",
          }}
        >
          <div className="commenttextborder" style={{ padding: "15px" }}>
            <div className="comment-disp">
              <div className="Commentlabel">
                <label className="Commentlabel1">Card Rejection Reason</label>
              </div>
              <div>
                <img
                  src={CancelImg}
                  alt="Minus"
                  className="pro-cross-icn m-0"
                  onClick={this.handleCloseRejectionModal.bind(this)}
                />
              </div>
            </div>
            <div className="commenttextmessage">
              <textarea
                cols="31"
                rows="3"
                className="ticketMSGCmt-textarea"
                maxLength={300}
                value={this.state.rejectionComment}
                onChange={this.handleRectionCommentChange.bind(this)}
              ></textarea>
            </div>
            {this.state.isRejectionComment !== "" && (
              <p style={{ color: "red", marginTop: "0px" }}>
                {this.state.isRejectionComment}
              </p>
            )}

            <div className="SendCommentBtn" style={{ margin: "0" }}>
              <button
                className="SendCommentBtn1"
                disabled={this.state.isSubmitRejection}
                onClick={this.handleSubmitRejectionReason.bind(this)}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
export default CardAssets;
