import React, { Component, Fragment } from "react";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import BataShoesIcon from "./../../assets/Images/bata.png";
import { Drawer, Popover } from "antd";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { authHeader } from "./../../helpers/authHeader";
import config from "./../../helpers/config";
import ReactTable from "react-table";
import StoreImg from "./../../assets/Images/store.png";
import moment from "moment";
import { NotificationManager } from "react-notifications";

class MyTicketClaim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ClaimDetailsModal: false,
      claimAddComment: "",
      ClaimTab: 0,
      claimDetailsData: [],
      claimDetails: {},
      claimOrderData: [],
      claimOrderItemData: [],
      claimAttachament: "",
      cliamId: 0,
      claimCommentlist: [],
    };

    this.handleGetClaimTabDetails = this.handleGetClaimTabDetails.bind(this);
  }

  componentDidMount() {
    debugger;
    if (this.props.claimData.claimDeatils.ticketId !== 0) {
      var ticketId = this.props.claimData.claimDeatils.ticketId;
      var tabId = this.props.claimData.claimDeatils.claimTabId;
      this.handleGetClaimTabDetails(ticketId);
      this.setState({
        ClaimTab: tabId,
      });
    } else if (this.props.claimData.claimDeatils.ticketId === 0) {
    } else {
      this.props.history.push("myTicketlist");
    }
  }

  handleGetClaimTabDetails(Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/GetClaimListByTicketID",
      headers: authHeader(),
      params: {
        ticketId: Id,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimDetailsData: data });
        } else {
          self.setState({ claimDetailsData: [] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  handleGetClaimRecordByClaimID(claimId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimByID",
      headers: authHeader(),
      params: {
        ClaimID: claimId,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        var claimOrderData = [];

        if (status === "Success") {
          claimOrderData.push(data.customOrderMaster);
          self.setState({
            claimDetails: data,
            ClaimDetailsModal: true,
            claimOrderData,
          });
          self.handleGetClaimCommentsList();
          if (data.attachments.length > 0) {
            let attachament = data.attachments[0].attachmentName;
            self.setState({ claimAttachament: attachament });
          } else {
            self.setState({ claimAttachament: "" });
          }
        } else {
          self.setState({ claimDetails: {}, claimOrderData: [] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  handleClaimDetailsModalOpen() {
    this.setState({ ClaimDetailsModal: true });
  }
  handleClaimDetailsModalClose() {
    this.setState({ ClaimDetailsModal: false });
  }
  HandleRowClickDraw = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var cliamId = column.original["ticketClaimID"];
        this.handleGetClaimRecordByClaimID(cliamId);
        this.setState({
          cliamId,
        });
      },
    };
  };
  handleClaimOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  ///handle claim comment in claim details
  handleClaimAddComments() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/AddStoreClaimComment",
      headers: authHeader(),
      params: {
        claimID: this.state.cliamId,
        comment: this.state.claimAddComment.trim(),
        iSTicketingComment: true,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Comment added successfully.");
          self.handleGetClaimCommentsList();
          self.setState({
            claimAddComment:""
          })
        } else {
          NotificationManager.error("Comment not added.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ///handle Get claim comment in claim details
  handleGetClaimCommentsList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimCommentByClaimID",
      headers: authHeader(),
      params: {
        claimID: this.state.cliamId,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            claimCommentlist: data,
          });
        } else {
          self.setState({
            claimCommentlist: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <Fragment>
        <div className="table-cntr mt-3 MyTicketClaimReact">
          <ReactTable
            data={this.state.claimDetailsData}
            columns={[
              {
                Header: <span>ID</span>,
                accessor: "ticketClaimID",
                Cell: (row) => {
                  return (
                    <span>
                      <img
                        src={HeadPhone3}
                        alt="HeadPhone"
                        className="headPhone3"
                      />
                      {row.original.ticketClaimID}
                    </span>
                  );
                },
              },
              {
                Header: <span>Status</span>,
                accessor: "taskStatus",
                Cell: (row) => {
                  if (row.original.taskStatus === "Open") {
                    return (
                      <span className="table-btn table-yellow-btn">
                        {row.original.taskStatus}
                      </span>
                    );
                  } else if (row.original.taskStatus === "New") {
                    return (
                      <span className="table-btn table-yellow-btn">
                        {row.original.taskStatus}
                      </span>
                    );
                  } else if (row.original.taskStatus === "Resolved") {
                    return (
                      <span className="table-btn table-green-btn">
                        {row.original.taskStatus}
                      </span>
                    );
                  } else if (row.original.taskStatus === "Open/Pending") {
                    return (
                      <span className="table-btn table-green-btn">
                        {row.original.taskStatus}
                      </span>
                    );
                  }
                },
              },
              {
                Header: <span>Claim Issue Type</span>,
                accessor: "claimIssueType",
              },
              {
                Header: (
                  <span>
                    Category
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "category",
                Cell: (row) => (
                  <span>
                    <label>{row.original.category} </label>

                    <Popover
                      content={
                        <div className="dash-creation-popup-cntr">
                          <ul className="dash-category-popup dashnewpopup">
                            <li>
                              <p>Brand</p>
                              <p>{row.original.brandName}</p>
                            </li>
                            <li>
                              <p>Category</p>
                              <p>{row.original.category}</p>
                            </li>
                            <li>
                              <p>Sub Category</p>
                              <p>{row.original.subCategoryName}</p>
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
                  </span>
                ),
              },
              {
                Header: (
                  <span>
                    Raised By
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "raisedBy",
              },
              {
                Header: (
                  <span>
                    Creation on
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "creationOn",
                Cell: (row) => (
                  <div>
                    <span>
                      {row.original.creationOn}
                      <Popover
                        content={
                          <div>
                            <div>
                              <b>
                                <p className="title">
                                  Created By:&nbsp;
                                  {row.original.raisedBy}
                                </p>
                              </b>
                              <p className="sub-title">
                                Created Date:&nbsp;
                                {row.original.creationOn}
                              </p>
                            </div>
                            <div>
                              <b>
                                <p className="title">
                                  Updated By:&nbsp;
                                  {row.original.modifiedBy}
                                </p>
                              </b>
                              <p className="sub-title">
                                Updated Date:&nbsp;
                                {row.original.modifiedDate}
                              </p>
                            </div>
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
                    </span>
                  </div>
                ),
              },
              {
                Header: (
                  <span>
                    Assign to
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "assignName",
              },
            ]}
            // resizable={false}
            minRows={2}
            defaultPageSize={5}
            showPagination={true}
            getTrProps={this.HandleRowClickDraw}
          />
        </div>
        <div className="DrawerModal">
          <Drawer
            className="claimTab-drawerModal"
            placement={"right"}
            closable={false}
            // onClose={this.handleClaimDetailsModalClose}
            visible={this.state.ClaimDetailsModal}
          >
            <div style={{ marginLeft: "20px" }}>
              <img
                src={BlackLeftArrow}
                alt="black-left-arrow-icon"
                className="black-left-arrow"
                onClick={this.handleClaimDetailsModalClose.bind(this)}
              />
              <label className="claim-details">Claim Details</label>
            </div>
            <hr className="claimline" />
            <div className="claimrowmargin">
              <label className="id-a-22134">
                ID - {this.state.claimDetails.claimID}
              </label>
            </div>

            <div className="row">
              <div className=" col-md-8" style={{ marginLeft: "25px" }}>
                <div className="row">
                  <div className="col-md-3">
                    <label className="claim-category">CLAIM CATEGORY</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">SUB CATEGORY</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">CLAIM TYPE</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">CLAIM ASKED FOR %</label>
                  </div>
                </div>
                <div className="row recent">
                  <div className="col-md-3">
                    <label className="recent-orders">
                      {this.state.claimDetails.categoryName}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">
                      {this.state.claimDetails.subCategoryName}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">
                      {this.state.claimDetails.issueTypeName}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">
                      {this.state.claimDetails.claimAskFor}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label className="claim-category">CUSTOMER NAME</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">PHONE NUMBER</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">EMAIL</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">GENDER</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label className="refund">
                      {this.state.claimDetails.customerName}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">
                      {this.state.claimDetails.customerPhoneNumber}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="refund">
                      {this.state.claimDetails.emailID}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="refund">
                      {this.state.claimDetails.gender}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <label className="attached-image">ATTACHED IMAGES</label>
                </div>
                <div className="batashoes-icon">
                  {this.state.claimAttachament !== "" ? (
                    <img src={this.state.claimAttachament} alt="image" />
                  ) : null}
                </div>
              </div>
            </div>
            <br />
            <div
              className="claim-status-table"
              style={{ marginLeft: "20px", marginRight: "10px" }}
            >
              <div className="claim-status-table-header">
                <label className="claim-status-open">
                  Claim Status : {this.state.claimDetails.status}
                </label>
              </div>

              <div className="row">
                <label className="order-details">Order details</label>
              </div>

              <hr />
              <div className="borderless" style={{ marginLeft: "10px" }}>
                <div className="reacttableclaimdrawer">
                  <ReactTable
                    data={this.state.claimOrderData}
                    columns={[
                      {
                        Header: <span>Invoice Number</span>,
                        accessor: "invoiceNumber",
                      },
                      {
                        Header: <span>Invoice Date</span>,
                        accessor: "dateFormat",
                      },
                      {
                        Header: <span>Item Count</span>,
                        accessor: "itemCount",
                      },
                      {
                        Header: <span>Item Price</span>,
                        accessor: "itemPrice",
                      },
                      {
                        Header: <span>Price Paid</span>,
                        accessor: "pricePaid",
                      },
                      {
                        Header: <span>Store Code</span>,
                        accessor: "storeCode",
                      },
                      {
                        Header: <span>Store Addres</span>,
                        accessor: "storeAddress",
                      },
                    ]}
                    //resizable={false}
                    minRows={2}
                    defaultPageSize={10}
                    showPagination={false}
                    SubComponent={(row) => {
                      return (
                        <div
                          className="reacttableclaimdrawe"
                          style={{ padding: "20px" }}
                        >
                          <ReactTable
                            data={row.original.orderItems}
                            columns={[
                              {
                                Header: <span>SKU</span>,
                                accessor: "articleNumber",
                              },
                              {
                                Header: <span>Product Name</span>,
                                accessor: "articleName",
                              },
                              {
                                Header: <span>Price</span>,
                                accessor: "itemPrice",
                              },
                              {
                                Header: <span>Price Paid</span>,
                                accessor: "pricePaid",
                              },
                              {
                                Header: <span>Discount</span>,
                                accessor: "discount",
                              },
                              {
                                Header: <span>MOP</span>,
                                accessor: "paymentModename",
                              },
                            ]}
                            defaultPageSize={5}
                            showPagination={false}
                            minRows={2}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="row removemarg" style={{ marginLeft: "5px" }}>
              <div className="col-md-5">
                <textarea
                  className="Add-Comments-textarea"
                  placeholder="Add Comments"
                  name="claimAddComment"
                  value={this.state.claimAddComment}
                  onChange={this.handleClaimOnChange}
                ></textarea>
                <div className="row">
                  <div className="col-md-5">
                    <button
                      className="add-comment-button add-comment-text"
                      type="button"
                      onClick={this.handleClaimAddComments.bind(this)}
                    >
                      ADD COMMENT
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="varunoverflow">
                  {this.state.claimCommentlist !== null &&
                    this.state.claimCommentlist.map((item, i) => {
                      return (
                        <div className="row m-t-20 mx-0" key={i}>
                          <div
                            className="col-xs-6"
                            style={{ display: "contents" }}
                          >
                            <div className="storeImg-drawer">
                              <img
                                src={StoreImg}
                                alt="headphone"
                                className="storeImg"
                              />
                            </div>
                            <label className="varun-taskDrawer">
                             {item.name}
                              <span className="addTask-time-ago">{item.datetime}</span>
                            </label>

                            <label className="task-drawer-lnl">
                            {item.comment}
                            </label>
                          </div>
                        </div>
                      );
                    })}

                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketClaim;
