import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
// import TableDemo from "../TableDemo";
import ArrowImg from "./../../assets/Images/arrow.png";
import PlusImg from "./../../assets/Images/plus.png";
import DownImg from "./../../assets/Images/down.png";
import storeImg from "./../../assets/Images/store.png";
import ReactTable from "react-table";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import { Table } from "antd";
import { NotificationManager } from "react-notifications";
import CancelImg from "./../../assets/Images/cancel.png";
import Modal from "react-responsive-modal";

class ClaimApproveReject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      SearchDetails: true,
      claimID: 0,
      brandData: [],
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
      selectBrand: 0,
      list1Value: "",
      ListOfSubCate: "",
      ListOfIssue: "",
      claimPercentage: "",
      orderDetailsData: [],
      customerData: {},
      OrderSubItem: [],
      customerName: "",
      customerPhoneNumber: "",
      customerAlternateNumber: "",
      emailID: "",
      alternateEmailID: "",
      gender: "",
      commentData: [],
      finalClaimPercentage: "",
      errFinalClaimPercent: "",
      imageURL: "",
      ticketID: 0,
      ticketingTaskID: 0,
      assignToName: "",
      userModel: false,
      userData: [],
      assigneeID: 0,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleUserModelOpen = this.handleUserModelOpen.bind(this);
    this.handleUserModelClose = this.handleUserModelClose.bind(this);
  }

  componentDidMount() {
    debugger;

    if (this.props.location.state) {
      var claimId = this.props.location.state.ClaimID;
      this.handleGetClaimByID(claimId);
      this.setState({
        claimID: claimId,
      });
      this.handleGetStoreClaimComments(claimId);
      this.handleGetBrandList();
    }
  }

  ////handle get user dropdown
  handleGetUserDropdown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/ClaimAssignDropdown",
      headers: authHeader(),
      params: {
        assignID: this.state.assigneeID,
      },
    })
      .then(function(response) {
        var userData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && userData.length > 0) {
          self.setState({
            userModel: true,
            userData,
          });
        } else {
          self.setState({ userModel: true, userData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetUserDropdown");
      });
  }
  ////handle assign task
  handleAssignClaim() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/ClaimReAssign",
      headers: authHeader(),
      params: {
        claimID: this.state.claimID,
        assigneeID: this.state.agentId,
      },
    })
      .then(function(response) {
        debugger;
        var responseData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success") {
          self.setState({ userModel: false, assigneeID: this.state.agentId });
          NotificationManager.success("Task Assign Successfully.");
          self.componentDidMount();
        } else {
          NotificationManager.error("Task Assign Fail.");
          self.setState({ userModel: false, assigneeID: this.state.agentId });
        }
      })
      .catch((response) => {
        console.log(response, "---handleAssignTask");
      });
  }
  ////handle user model open
  handleUserModelOpen() {
    this.setState({ userModel: true });
  }
  ////handle user model close
  handleUserModelClose() {
    this.setState({ userModel: false });
  }
  handleToggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }
  handleShowSearchDetails() {
    this.setState({
      SearchDetails: !this.state.SearchDetails,
    });
  }
  ////handle get brand list
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///handle get claim by id
  handleGetClaimByID(claimId) {
    debugger;
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimByID",
      headers: authHeader(),
      params: { ClaimID: claimId },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message == "Success" && responseData) {
          var orderDetails = [];
          orderDetails.push(responseData.customOrderMaster);
          var imageURL = responseData.attachments[0].attachmentName;
          var ticketingTaskID = responseData.ticketingTaskID;
          var ticketID = responseData.ticketID;
          var assignToName = responseData.assignTo;
          var assigneeID = responseData.assigneeID;
          self.setState({
            assigneeID,
            assignToName,
            ticketingTaskID,
            ticketID,
            imageURL,
            selectBrand: responseData.brandID,
            list1Value: responseData.categoryName,
            ListOfSubCate: responseData.subCategoryName,
            ListOfIssue: responseData.issueTypeName,
            claimPercentage: responseData.claimAskFor,
            customerName: responseData.customerName,
            customerPhoneNumber: responseData.customerPhoneNumber,
            customerAlternateNumber: responseData.customerAlternateNumber,
            emailID: responseData.emailID,
            alternateEmailID: responseData.alternateEmailID,
            gender: responseData.gender,
            orderDetailsData: orderDetails,
            OrderSubItem: responseData.customOrderMaster.orderItems,
          });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }
  ////handle add comment on claim
  handleAddStoreClaimComments() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/AddStoreClaimComment",
      params: {
        ClaimID: this.state.claimID,
        Comment: this.state.claimComments,
      },
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Record saved successfully");
          self.handleGetStoreClaimComments(self.state.claimID);
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleOnChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  ////handle get store claim comment by id
  handleGetStoreClaimComments(claimId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimCommentByClaimID",
      headers: authHeader(),
      params: { ClaimID: claimId },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ commentData: data });
        } else {
          self.setState({ commentData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleApproveRejectClaim(IsApprove, e) {
    let self = this;
    if (this.state.finalClaimPercentage !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/StoreClaim/IsClaimApprove",
        headers: authHeader(),
        params: {
          claimID: this.state.claimID,
          finalClaimAsked: this.state.finalClaimPercentage,
          IsApprove: IsApprove,
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            if (IsApprove == true) {
              NotificationManager.success("Record approved successfully");
            } else {
              NotificationManager.success("Record rejected successfully");
            }
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        errFinalClaimPercent: "Please enter final claim percentage",
      });
    }
  }

  render() {
    const { orderDetailsData } = this.state;
    return (
      <Fragment>
        <div className="row claim-header-card width">
          <div className="col-md-7">
            <label className="claim-title1">Claim Ticket ID :</label>
            <label className="claim-A22345">{this.state.claimID}</label>
            {this.state.ticketingTaskID > 0 ? (
              <>
                <label className="claim-title1">Task ID :</label>
                <label className="claim-A22345">
                  {this.state.ticketingTaskID}
                </label>
              </>
            ) : (
              ""
            )}
            {this.state.ticketID > 0 ? (
              <>
                <label className="claim-title1">Ticket ID :</label>
                <label className="claim-A22345">{this.state.ticketID}</label>
              </>
            ) : null}
          </div>
          <div className="col-md-5">
            <a
              style={{ marginTop: "10px" }}
              className="d-inline-block"
              onClick={this.handleGetUserDropdown.bind(this)}
            >
              <div className="oval-5-1-new-store">
                <img src={storeImg} alt="headphone" className="storeImg-11" />
              </div>
              <label className="naman-r">{this.state.assignToName}</label>
              <img src={DownImg} alt="down" className="down-header" />
            </a>

            <div className="btn-approrej">
              <button
                type="button"
                className="btn-approrej1"
                onClick={this.handleApproveRejectClaim.bind(this, true)}
              >
                APPROVE CLAIM
              </button>
              <button
                type="button"
                className="btn-approrej1"
                onClick={this.handleApproveRejectClaim.bind(this, false)}
              >
                REJECT CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="back-color">
          <div className="row" style={{ margin: "0" }}>
            <div className="col-md-9" style={{ padding: "0" }}>
              <div className="card card-radius" style={{ margin: "0 0 20px" }}>
                <div
                  className="search-customer-padding"
                  style={{ padding: "30px 45px 30px" }}
                >
                  <div
                    className=""
                    style={{ border: "1px solid #EEE", borderRadius: "5px" }}
                  >
                    <div className="claim-status-card">
                      <label>
                        <b>Claim Status: Open</b>
                      </label>
                      <div className="claimplus">
                        <span className="plusline1new"></span>
                        <img
                          src={ArrowImg}
                          alt="Arrow"
                          className="arrow-img-1"
                        />
                        <span className="plusline2"></span>
                        <img
                          src={PlusImg}
                          alt="Plush"
                          className="plush-img-1"
                          onClick={this.handleToggle.bind(this)}
                        />
                      </div>
                    </div>

                    <Collapse
                      isOpen={this.state.collapse}
                      style={{ width: "100%" }}
                    >
                      <Card>
                        <CardBody style={{ padding: "15px 0 0 0" }}>
                          <div className="row mx-0">
                            <div className="col-md-6">
                              <label className="orderdetailtext">
                                Order details
                              </label>
                            </div>

                            <span className="Searchline"> </span>
                          </div>
                          {this.state.SearchDetails ? (
                            <div
                              style={{
                                borderTop: "1px solid #EEE",
                                marginTop: "12px",
                              }}
                            >
                              <div className="reacttableordermodal">
                                {orderDetailsData.length > 0 ? (
                                  <Table
                                    className="components-table-demo-nested custom-antd-table"
                                    dataSource={orderDetailsData}
                                    columns={[
                                      {
                                        title: "Invoice Number",
                                        dataIndex: "invoiceNumber",
                                      },
                                      {
                                        title: "Invoice Date",
                                        dataIndex: "dateFormat",
                                      },
                                      {
                                        title: "Item Count",
                                        dataIndex: "itemCount",
                                      },
                                      {
                                        title: "Item Price",
                                        dataIndex: "ordeItemPrice",
                                      },
                                      {
                                        title: "Price Paid",
                                        dataIndex: "orderPricePaid",
                                      },
                                      {
                                        title: "Store Code",
                                        dataIndex: "storeCode",
                                      },
                                      {
                                        title: "Store Address",
                                        dataIndex: "storeAddress",
                                      },
                                      {
                                        title: "Discount",
                                        dataIndex: "discount",
                                      },
                                    ]}
                                    expandedRowRender={(row) => {
                                      return (
                                        <Table
                                          // dataSource={this.state.OrderSubItem}
                                          dataSource={this.state.OrderSubItem.filter(
                                            (x) =>
                                              x.orderMasterID ===
                                              row.orderMasterID
                                          )}
                                          columns={[
                                            {
                                              title: "Article Number",
                                              dataIndex: "articleNumber",
                                            },
                                            {
                                              title: "Article Name",
                                              dataIndex: "articleName",
                                            },
                                            {
                                              title: "Article MRP",
                                              dataIndex: "itemPrice",
                                            },
                                            {
                                              title: "Price Paid",
                                              dataIndex: "pricePaid",
                                            },
                                            {
                                              title: "Discount",
                                              dataIndex: "discount",
                                            },
                                          ]}
                                          // rowSelection={rowSelection}
                                          pagination={false}
                                        />
                                      );
                                    }}
                                    pagination={false}
                                  />
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <div className="uploadsearch">
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <label className="uploadsearch-text">
                                    No order found with this number
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <button
                                    type="button"
                                    className="uploadsearchbtn"
                                  >
                                    <label
                                      for="file-upload"
                                      className="uploadsearchbtn-text"
                                    >
                                      UPLOAD FILE
                                    </label>
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <u>
                                    <a href="#!">DOWNLOAD SAMPLE FILE</a>
                                  </u>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6">Brand</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.selectBrand}
                        onChange={this.handleBrandChange}
                        disabled={true}
                      >
                        <option>select</option>
                        {this.state.brandData !== null &&
                          this.state.brandData.map((item, i) => (
                            <option
                              key={i}
                              value={item.brandID}
                              className="select-category-placeholder"
                            >
                              {item.brandName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Category</label>
                      <input
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.list1Value}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Sub Category</label>
                      <input
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.ListOfSubCate}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Type</label>
                      <input
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.ListOfIssue}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6"> Claim Asked for %</label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder="Claim Percentage"
                        name="claimPercentage"
                        disabled={true}
                        value={this.state.claimPercentage}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6">Attached Image</label>
                    </div>
                  </div>
                  {this.state.imageUR !== "" ? (
                    <img
                      src={this.state.imageURL}
                      alt="Bata"
                      className="claim-bataShoes"
                    />
                  ) : null}
                </div>
              </div>

              <div
                className="card card-radius"
                style={{ padding: "30px 45px 30px" }}
              >
                <div className="search-customer-padding">
                  <div className="row" style={{ margin: "0" }}>
                    <div
                      className="form-group col-md-4"
                      style={{ padding: "0" }}
                    >
                      <label className="label-6">Final Claim Asked for %</label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder="Claim Percentage"
                        name="finalClaimPercentage"
                        value={this.state.finalClaimPercentage}
                        onChange={this.handleOnChange}
                      />
                      {this.state.finalClaimPercentage === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.errFinalClaimPercent}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row" style={{ margin: "0" }}>
                    <div style={{ width: "100%" }}>
                      <label className="label-6">Comments By Approval</label>
                      <hr></hr>
                    </div>
                    <div className="" style={{ display: "contents" }}>
                      <textarea
                        className="ticket-comments-textarea"
                        placeholder="Add your Comment here"
                        name="claimComments"
                        value={this.state.claimComments}
                        onChange={this.handleOnChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="commentbt">
                    <button
                      type="button"
                      className="commentbtn"
                      onClick={this.handleAddStoreClaimComments.bind(this)}
                    >
                      <label className="txt">ADD COMMENT</label>
                    </button>
                  </div>
                  <div className="row" style={{ margin: "0" }}>
                    <div className="">
                      <label className="label-6">
                        Comments By Approval:{" "}
                        {this.state.commentData.length < 0
                          ? "0" + this.state.commentData.length
                          : this.state.commentData.length}
                      </label>
                    </div>
                  </div>
                  {this.state.commentData.map((value) => (
                    <div>
                      <div className="row" style={{ margin: "0" }}>
                        <div className="col-xs-3">
                          <img
                            src={storeImg}
                            alt="headphone"
                            className="oval-55 naman"
                          />
                        </div>
                        <div className="col-md-9">
                          <label className="naman-R">{value.name}</label>
                        </div>
                        <div className="col-md-2">
                          <label className="hr-ago">{value.datetime}</label>
                        </div>
                      </div>
                      <div className="row" style={{ margin: "0" }}>
                        <label className="label-6" style={{ paddingTop: "0" }}>
                          Comments:
                        </label>
                      </div>
                      <div className="row" style={{ margin: "0" }}>
                        <div style={{ width: "100%" }}>
                          <label className="claim-comment">
                            {value.comment}
                          </label>
                          <hr />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card card-radius2 cardbor">
                <div className="alankrit">
                  <label>
                    <b>CUSTOMER NAME</b>
                  </label>
                  <label>
                    {this.state.customerName ? (
                      <span className="a">
                        {this.state.customerName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      ""
                    )}
                    {this.state.customerName}
                  </label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>PHONE NUMBER</b>
                  </label>
                  <label>{this.state.customerPhoneNumber}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>ALTERNATE NUMBER</b>
                  </label>
                  <label>{this.state.customerAlternateNumber}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>EMAIL</b>
                  </label>
                  <label>{this.state.emailID}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>ALTERNATE EMAIL</b>
                  </label>
                  <label>{this.state.alternateEmailID}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>GENDER</b>
                  </label>
                  <label>{this.state.gender}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------User Modal--------------------  */}
        <Modal
          open={this.state.userModel}
          onClose={this.handleUserModelClose.bind(this)}
          closeIconId="close"
          modalId="labelmodel-popup"
          overlayId="logout-ovrly"
        >
          <div className="myTicket-table remov agentlist" id="tic-det-assign">
            <ReactTable
              className="limit-react-table-body"
              data={this.state.userData}
              columns={[
                {
                  Header: <span>Emp Id</span>,
                  accessor: "user_ID",
                  width: 80,
                },
                {
                  Header: <span>Name</span>,
                  accessor: "userName",
                },
                // {
                //   Header: <span>Designation</span>,
                //   accessor: "designation"
                // }
              ]}
              minRows={2}
              showPagination={false}
              resizable={false}
              getTrProps={(rowInfo, column) => {
                // ////
                const index = column ? column.index : -1;
                return {
                  onClick: (e) => {
                    ////
                    this.selectedRow = index;
                    var agentId = column.original["user_ID"];
                    this.setState({ agentId });
                  },
                  style: {
                    background: this.selectedRow === index ? "#ECF2F4" : null,
                  },
                };
              }}
            />
            <div className="button-margin">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleAssignClaim.bind(this)}
              >
                SELECT
              </button>
            </div>
            <div
              className="cancel-assign"
              onClick={this.handleUserModelClose.bind(this)}
            >
              <img src={CancelImg} alt="cancel" />
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default ClaimApproveReject;
