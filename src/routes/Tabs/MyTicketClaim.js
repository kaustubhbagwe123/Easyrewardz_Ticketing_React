import React, { Component, Fragment } from "react";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import { Drawer, Popover } from "antd";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { authHeader } from "./../../helpers/authHeader";
import config from "./../../helpers/config";
import ReactTable from "react-table";
import StoreImg from "./../../assets/Images/store.png";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";

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
      translateLanguage: {},
    };

    this.handleGetClaimTabDetails = this.handleGetClaimTabDetails.bind(this);
  }

  componentDidMount() {
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
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  handleGetClaimTabDetails(Id) {
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
    const TranslationContext = this.state.translateLanguage.default;
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
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.commentaddedsuccessfully
              : "Comment added successfully."
          );
          self.handleGetClaimCommentsList();
          self.setState({
            claimAddComment: "",
          });
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.commentnotadded
              : "Comment not added."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ///handle Get claim comment in claim details
  handleGetClaimCommentsList() {
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
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="table-cntr mt-3 MyTicketClaimReact">
          <ReactTable
            data={this.state.claimDetailsData}
            columns={[
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.id
                      : "ID"}
                  </span>
                ),
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
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.status
                      : "Status"}
                  </span>
                ),
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
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard.claimissueType
                      : "Claim Issue Type"}
                  </span>
                ),
                accessor: "claimIssueType",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.category
                      : "Category"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "category",
                Cell: (row) => (
                  <span>
                    <label>{row.original.category}</label>
                    <Popover
                      content={
                        <div className="dash-creation-popup-cntr">
                          <ul className="dash-category-popup dashnewpopup">
                            <li>
                              <p>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.brand
                                  : "Brand"}
                              </p>
                              <p>{row.original.brandName}</p>
                            </li>
                            <li>
                              <p>
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.category
                                  : "Category"}
                              </p>
                              <p>{row.original.category}</p>
                            </li>
                            <li>
                              <p>
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.subcategory
                                  : "Sub Category"}
                              </p>
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
                    {TranslationContext !== undefined
                      ? TranslationContext.span.raisedby
                      : "Raised By"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "raisedBy",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.creationon
                      : "Creation On"}
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
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.createdby
                                    : "Created by"}
                                  :&nbsp;
                                  {row.original.raisedBy}
                                </p>
                              </b>
                              <p className="sub-title">
                                {TranslationContext !== undefined
                                  ? TranslationContext.p.createddate
                                  : "Created Date"}
                                :&nbsp;
                                {row.original.creationOn}
                              </p>
                            </div>
                            <div>
                              <b>
                                <p className="title">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.p.updatedby
                                    : "Updated by"}
                                  :&nbsp;
                                  {row.original.modifiedBy}
                                </p>
                              </b>
                              <p className="sub-title">
                                {TranslationContext !== undefined
                                  ? TranslationContext.p.updateddate
                                  : "Updated Date"}
                                :&nbsp;
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
                    {TranslationContext !== undefined
                      ? TranslationContext.label.assignto
                      : "Assign to"}
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
              <label className="claim-details">
                {TranslationContext !== undefined
                  ? TranslationContext.ticketingDashboard.claimdetails
                  : "Claim Details"}
              </label>
            </div>
            <hr className="claimline" />
            <div className="claimrowmargin">
              <label className="id-a-22134">
                {TranslationContext !== undefined
                  ? TranslationContext.label.id
                  : "ID"}
                - {this.state.claimDetails.claimID}
              </label>
            </div>

            <div className="row">
              <div className=" col-md-8" style={{ marginLeft: "25px" }}>
                <div className="row">
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.claimcategory
                        : "Claim Category"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.subcategory
                        : "Sub Category"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.claimtype
                        : "CLAIM TYPE"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.claimaskedfor
                        : "CLAIM ASKED FOR %"}{" "}
                    </label>
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
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.customername
                        : "CUSTOMER NAME"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.phonenumber
                        : "PHONE NUMBER"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.a.email
                        : "EMAIL"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.gender
                        : "GENDER"}
                    </label>
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
                  <label className="attached-image">
                    {TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard.attachedimages
                      : "ATTACHED IMAGES"}
                  </label>
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
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.claimstatus
                    : "Claim Status"}{" "}
                  : {this.state.claimDetails.status}
                </label>
              </div>

              <div className="row">
                <label className="order-details">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.orderdetails
                    : "Order Details"}
                </label>
              </div>

              <hr />
              <div className="borderless" style={{ marginLeft: "10px" }}>
                <div className="reacttableclaimdrawer">
                  <ReactTable
                    data={this.state.claimOrderData}
                    columns={[
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.invoicenumber
                              : "Invoice Number"}
                          </span>
                        ),
                        accessor: "invoiceNumber",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.invoicedate
                              : "Invoice Date"}
                          </span>
                        ),
                        accessor: "dateFormat",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemcount
                              : "Item Count"}
                          </span>
                        ),
                        accessor: "itemCount",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemprice
                              : "Item Price"}
                          </span>
                        ),
                        accessor: "itemPrice",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.pricepaid
                              : "Price Paid"}
                          </span>
                        ),
                        accessor: "pricePaid",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.storecode
                              : "Store Code"}
                          </span>
                        ),
                        accessor: "storeCode",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.storeaddress
                              : "Store Address"}
                          </span>
                        ),
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
                                Header: <span>{TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard.productname
                                  : "Product Name"}</span>,
                                accessor: "articleName",
                              },
                              {
                                Header: <span>{TranslationContext !== undefined
                                  ? TranslationContext.label.price
                                  : "Price"}</span>,
                                accessor: "itemPrice",
                              },
                              {
                                Header: <span>{TranslationContext !== undefined
                                  ? TranslationContext.span.pricepaid
                                  : "Price Paid"}</span>,
                                accessor: "pricePaid",
                              },
                              {
                                Header: <span>{ TranslationContext !== undefined
                                  ? TranslationContext.label.discount
                                  : "Discount"}</span>,
                                accessor: "discount",
                              },
                              {
                                Header: <span>MOP</span>,
                                accessor: "reqSiz",
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
                      {TranslationContext !== undefined
                        ? TranslationContext.button.addcomment
                        : "Add Comment"}
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
                              <span className="addTask-time-ago">
                                {item.datetime}
                              </span>
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
