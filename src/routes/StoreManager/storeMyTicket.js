import React, { Component, Fragment } from "react";
import HeadphoneImg from "./../../assets/Images/headphone.png";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import config from "./../../helpers/config";
import LoadingImg from "./../../assets/Images/loading.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import DownImg from "./../../assets/Images/down.png";
import EyeImg from "./../../assets/Images/eye.png";
import BillInvoiceImg from "./../../assets/Images/bill-Invoice.png";
import WhatsappActive from "./../../assets/Images/whatsapp-active.png";
import WhatsappDeactive from "./../../assets/Images/whatsapp-deactive.png";
import CancelImg from "./../../assets/Images/cancel.png";
import StoreIcon from "./../../assets/Images/store.png";
import { NotificationManager } from "react-notifications";
import StoreMyTicketStatus from "./StoreMyTicketStatus";
import moment from "moment";
import Modal from "react-responsive-modal";
import ReactTable from "react-table";
import * as translationHI from "./../../translations/hindi";
import * as translationMA from "./../../translations/marathi";

class storeMyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Notesdetails: [],
      NoteAddComment: "",
      AddNoteValidation: "",
      ticket_Id: 0,
      NotesCount: 0,
      ticketDetailsData: {},
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      TicketStatusData: StoreMyTicketStatus(),
      historicalTicket: false,
      historicalDetails: [],
      loading: false,
      translateLanguage: {},
      customerID: 0,
      chatID: 0,
      storeID: "",
      customerName: "",
      customerMobileNumber: "",
      isIconDisplay: false,
      isChatAllreadyActive: false,
      chatEndDateTime: "",
      isWhatsAppIconClick: false,
      reInitiateChatDateTime: "",
    };
  }
  componentDidMount() {
    if (this.props.location.ticketDetailID) {
      var ticketId = this.props.location.ticketDetailID;
      this.setState({ ticket_Id: ticketId });
      this.handleGetNoteCommentData(ticketId);
      this.handleGetTicketDetails(ticketId);
      this.handleGetCategoryList();
    } else {
      this.props.history.push("myTicketList");
    }

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  /// ---------------------API call start---------------------------------
  /// handle Get Category Data for drop-down
  handleGetCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatCategory",
      headers: authHeader(),
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            CategoryData: data,
          });
        } else {
          self.setState({
            CategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Sub Category Data for drop-down
  handleGetSubCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        categoryID: this.state.ticketDetailsData.categoryID,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            SubCategoryData: data,
          });
        } else {
          self.setState({
            SubCategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Issue Type list for drop-down
  handleGetIssueTypeList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatIssueTypeBySubcategory",
      headers: authHeader(),
      params: {
        subCategoryID: this.state.ticketDetailsData.subCategoryID,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            IssueTypeData: data,
          });
        } else {
          self.setState({
            IssueTypeData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///handle Get ticket details data
  handleGetTicketDetails(TID) {
    var self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTicketsByID",
      headers: authHeader(),
      params: {
        ticketID: TID,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          debugger;
          self.setState({
            ticketDetailsData: data,
            loading: false,
            isIconDisplay: data.isIconDisplay,
            isChatAllreadyActive: data.isChatAllreadyActive,
            chatEndDateTime: data.chatEndDateTime,
            chatID: data.chatID,
            customerMobileNumber: data.customerMobileNumber,
            storeID: data.assignTo,
            customerID: data.customerID,
            reInitiateChatDateTime: data.reInitiateChatDateTime,
          });

          setTimeout(() => {
            self.handleGetCategoryList();
            self.handleGetSubCategoryList();
            self.handleGetIssueTypeList();
          }, 100);
        } else {
          self.setState({
            ticketDetailsData: {},
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// Handle Add Note comment
  handleNoteAddComments() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.NoteAddComment.length > 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/HSChatTicketing/AddChatTicketNotes",
        headers: authHeader(),
        params: {
          ticketID: this.state.ticket_Id,
          comment: this.state.NoteAddComment,
        },
      })
        .then(function(res) {
          let Msg = res.data.message;
          if (Msg === "Success") {
            var TID = self.state.ticket_Id;
            self.handleGetNoteCommentData(TID);
            self.setState({
              NoteAddComment: "",
              AddNoteValidation: "",
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.commentaddedsuccessfully
                : "Comment added successfully."
            );
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
    } else {
      this.setState({
        AddNoteValidation: "Please Enter Comment.",
      });
    }
  }
  /// handle Get Note comment data
  handleGetNoteCommentData(TID) {
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTicketNotes",
      headers: authHeader(),
      params: {
        ticketID: TID,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            Notesdetails: data,
            NotesCount: data.length,
          });
        } else {
          self.setState({
            Notesdetails: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Update ticket function
  handleUpdateTicketDetails() {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/UpdateChatTicketStatus",
      headers: authHeader(),
      params: {
        ticketID: this.state.ticketDetailsData.ticketID,
        statusID: this.state.ticketDetailsData.ticketStatus,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ticketupdatedsuccessfully
              : "Ticket Updated successfully."
          );
          self.handleGetTicketDetails(self.state.ticketDetailsData.ticketID);
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ticketnotupdated
              : "Ticket Not Updated."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get Ticket Historical function
  handleGetHistoricalData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTicketHistory",
      headers: authHeader(),
      params: {
        ticketID: this.state.ticketDetailsData.ticketID,
      },
    })
      .then(function(res) {
        let status = res.data.status;
        let data = res.data.responseData;
        if (status === true) {
          self.setState({ historicalDetails: data, historicalTicket: true });
        } else {
          self.setState({ historicalDetails: [], historicalTicket: true });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// ---------------------API call End-----------------------------------
  handleNoteOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  HistoricalModalClose() {
    this.setState({
      historicalTicket: false,
    });
  }

  /// drop-down value change
  handleDropDownChange = (e) => {
    let name = e.target.name;
    let Value = e.target.value;
    var data = this.state.ticketDetailsData;
    if (name === "ticketStatus") {
      data[name] = Value;
      this.setState({
        ticketDetailsData: data,
      });
    } else if (name === "categoryID") {
      data[name] = Value;
      this.setState({
        ticketDetailsData: data,
        SubCategoryData: [],
        IssueTypeData: [],
      });
      setTimeout(() => {
        this.handleGetSubCategoryList();
      }, 100);
    } else if (name === "subCategoryID") {
      data[name] = Value;
      this.setState({
        ticketDetailsData: data,
        IssueTypeData: [],
      });
      setTimeout(() => {
        this.handleGetIssueTypeList();
      }, 100);
    } else if (name === "issueTypeID") {
      data[name] = Value;
      this.setState({
        ticketDetailsData: data,
      });
    }
  };
  ////handle whats app icon click
  handleWhatsAppIconClick = () => {
    let self = this;
    if (this.state.isWhatsAppIconClick === false) {
      this.setState({ isWhatsAppIconClick: true });
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/saveReInitiateChat",
        headers: authHeader(),
        data: {
          StoreID: this.state.storeID,
          CustomerID: this.state.customerID,
          FirstName: this.state.ticketDetailsData.customerName,
          LastName: "",
          MobileNo: this.state.customerMobileNumber,
        },
      })
        .then(function(response) {
          var message = response.data.message;
          var responseData = response.data.responseData;
          if (message === "Success" && responseData) {
            self.setState({
              isChatAllreadyActive: true,
              isWhatsAppIconClick: false,
            });
            if (document.getElementById("chatwindow")) {
              document.getElementById("newTicketChatId").value = responseData;
              document.getElementById("chatwindow").click();
            }
            self.handleGetTicketDetails(self.state.ticket_Id);
          } else {
            self.setState({ isWhatsAppIconClick: false });
          }
        })
        .catch((response) => {
          self.setState({ isWhatsAppIconClick: false });
          console.log(response, "----handleWhatsAppIconClick");
        });
    } else {
      return false;
    }
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        {this.state.loading === true ? (
          <div className="loader-icon"></div>
        ) : (
          <div>
            <div className="head-header">
              <div className="head-header-1">
                <div className="row">
                  <div className="col-12 col-xs-4 col-sm-4 col-md-3">
                    <img
                      src={HeadphoneImg}
                      alt="headphone"
                      className="headphone"
                    />
                    <label className="id-abc-1234">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.id
                        : "ID"}{" "}
                      - {this.state.ticketDetailsData.ticketID}
                      <span className="updated-2-d-ago">
                        {this.state.ticketDetailsData.createdDate}
                      </span>
                    </label>
                    <div
                      className="loading-rectangle-cntr"
                      onClick={this.handleGetHistoricalData.bind(this)}
                    >
                      <img
                        src={LoadingImg}
                        alt="Loading"
                        className="loading-rectangle m-0"
                        title="Ticket Historical"
                      />
                    </div>
                  </div>
                  <div className="historical-model">
                    <Modal
                      open={this.state.historicalTicket}
                      onClose={this.HistoricalModalClose.bind(this)}
                      closeIconId="sdsg"
                      modalId="Historical-popup"
                      overlayId="logout-ovrly"
                      classNames={{ modal: "historical-popup" }}
                    >
                      <label className="lblHistorical">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.tickethistorical
                          : "Ticket Historical"}
                      </label>
                      <img
                        src={CancelImg}
                        alt="cancelImg"
                        className="cancalImg"
                        onClick={this.HistoricalModalClose.bind(this)}
                      />
                      <div className="tic-history tic-his varunoverflow">
                        <ReactTable
                          data={this.state.historicalDetails}
                          columns={[
                            {
                              Header: (
                                <span>
                                  {" "}
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.name
                                    : "Name"}
                                </span>
                              ),
                              accessor: "name",
                              width: 150,
                            },
                            {
                              Header: (
                                <span>
                                  {" "}
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.actions
                                    : "Action"}
                                </span>
                              ),
                              accessor: "action",
                            },
                            {
                              Header: (
                                <span>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.timeanddate
                                    : "Time & Date"}
                                </span>
                              ),
                              accessor: "dateandTime",
                              width: 200,
                              Cell: (row) => {
                                var date = row.original["dateandTime"];
                                return (
                                  <span>
                                    {moment(date).format("M/D/YYYY")} &nbsp;
                                    {moment(date).format("HH:mm A")}
                                  </span>
                                );
                              },
                            },
                          ]}
                          resizable={false}
                          defaultPageSize={10}
                          showPagination={false}
                          minRows={2}
                        />
                      </div>
                    </Modal>
                  </div>
                  <div className="col-12 col-xs-8 col-sm-8 col-md-9">
                    <div
                      style={{ float: "right", marginTop: "0px" }}
                      //   className={this.state.isKB ? "iskbticket" : ""}
                    >
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55"
                        title="Agent List"
                      />
                      <label
                        className="naman-r"
                        // onClick={this.HandlelabelModalOpen.bind(this)}
                      >
                        {this.state.ticketDetailsData.assignTo}
                      </label>
                      <img
                        src={DownImg}
                        alt="down"
                        className="down-header"
                        style={{ display: "none" }}
                      />

                      <button
                        type="button"
                        className="myticket-submit-solve-button"
                        onClick={this.handleUpdateTicketDetails.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.submit
                          : "SUBMIT"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-rectangle">
              <div className="rectangle-box">
                <div className="row">
                  <div className="col-md-4" style={{ padding: "0" }}>
                    <div style={{ padding: "15px 0px 15px 30px" }}>
                      <div className="row">
                        <div className="col-md-5">
                          <label className="mobile-number">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.customername
                              : "Customer Name"}
                          </label>

                          <br />
                          <label className="mobile-no">
                            {this.state.ticketDetailsData.customerName}
                          </label>
                        </div>
                        <div className="col-md-7">
                          <div className="row">
                            <div
                              className="col-md-3"
                              style={{ paddingRight: 0 }}
                            >
                              <label className="mobile-number">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.customername
                                  : "Chat ID"}
                              </label>

                              <br />
                              <label className="mobile-no">
                                {this.state.chatID}
                              </label>
                            </div>
                            <div className="col-md-9" style={{ padding: 0 }}>
                              {this.state.isIconDisplay &&
                              !this.state.isChatAllreadyActive ? (
                                <img
                                  style={{
                                    width: "24px",
                                    cursor: "pointer",
                                  }}
                                  title="Re-Initiate Chat"
                                  src={WhatsappActive}
                                  alt="WhatsappActive"
                                  onClick={this.handleWhatsAppIconClick.bind(
                                    this
                                  )}
                                />
                              ) : this.state.isIconDisplay === true &&
                                this.state.isChatAllreadyActive ? (
                                <img
                                  style={{
                                    width: "20px",
                                    cursor: "pointer",
                                  }}
                                  title={
                                    "Re-initiate chat on " +
                                    this.state.reInitiateChatDateTime
                                  }
                                  src={WhatsappDeactive}
                                  alt="WhatsappDeactive"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="m-t-15">
                            <label className="mobile-number">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.mobilenumber
                                : "Mobile Number"}
                            </label>
                            <br />
                            <label className="mobile-no">
                              {
                                this.state.ticketDetailsData
                                  .customerMobileNumber
                              }
                            </label>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="m-t-15">
                            <label className="mobile-number">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.mobilenumber
                                : "Customer Last Message Date & Time"}
                            </label>
                            <br />
                            <label className="mobile-no">
                              {this.state.chatEndDateTime}
                            </label>
                          </div>
                        </div>
                      </div>
                      <img
                        src={EyeImg}
                        alt="eye"
                        className="eyeImg1"
                        title="Customer Profile"
                        style={{ display: "none" }}
                        // onClick={this.HandleProfileModalOpen.bind(this)}
                      />

                      <img
                        src={BillInvoiceImg}
                        alt="eye"
                        className="billImg"
                        title="Historical Order"
                        style={{ display: "none" }}
                        // onClick={this.handleBillImgModalOpen.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="mid-sec mid-secnew">
                      <div className="row mob-pad">
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                          <div className="form-group">
                            <label className="label-4">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.status
                                : "Status"}
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.ticketDetailsData.ticketStatus}
                              onChange={this.handleDropDownChange}
                              name="ticketStatus"
                            >
                              <option>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.ticketstatus
                                  : "Ticket Status"}
                              </option>
                              {this.state.TicketStatusData !== null &&
                                this.state.TicketStatusData.map((item, s) => (
                                  <option key={s} value={item.statusID}>
                                    {item.statusName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group disabled-link">
                            <label className="label-4">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.priority
                                : "Priority"}
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.ticketDetailsData.priority}
                              // onChange={this.handleDropDownChange}
                              // name="priority"
                            >
                              <option
                                className="select-category-placeholder"
                                value={this.state.ticketDetailsData.priority}
                              >
                                {this.state.ticketDetailsData.priority}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group disabled-link">
                            <label className="label-4">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.brand
                                : "Brand"}
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.ticketDetailsData.brand}
                              // onChange={this.handleDropDownChange}
                              // name="brand"
                            >
                              <option
                                className="select-category-placeholder"
                                value={this.state.ticketDetailsData.brand}
                              >
                                {this.state.ticketDetailsData.brand}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                          <div className="form-group disabled-link">
                            <label className="label-4">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.category
                                : "Category"}
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.ticketDetailsData.categoryID}
                              name="categoryID"
                              onChange={this.handleDropDownChange}
                            >
                              <option className="select-category-placeholder">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.selectcategory
                                  : "Select Category"}
                              </option>
                              {this.state.CategoryData !== null &&
                                this.state.CategoryData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.categoryID}
                                    className="select-category-placeholder"
                                  >
                                    {item.categoryName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group disabled-link">
                            <label className="label-4">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.subcategory
                                : "Sub Category"}
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.ticketDetailsData.subCategoryID}
                              onChange={this.handleDropDownChange}
                              name="subCategoryID"
                            >
                              <option className="select-category-placeholder">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.selectsubcategory
                                  : "Select Sub Category"}
                              </option>
                              {this.state.SubCategoryData !== null &&
                                this.state.SubCategoryData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.subCategoryID}
                                    className="select-category-placeholder"
                                  >
                                    {item.subCategoryName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group disabled-link">
                            <label className="label-4">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.issuetype
                                : "Issue Type"}
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.ticketDetailsData.issueTypeID}
                              onChange={this.handleDropDownChange}
                              name="issueTypeID"
                            >
                              <option className="select-sub-category-placeholder">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.selectissuetype
                                  : "Select Issue Type"}
                              </option>
                              {this.state.IssueTypeData !== null &&
                                this.state.IssueTypeData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.issueTypeID}
                                    className="select-category-placeholder"
                                  >
                                    {item.issueTypeName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "15px", background: "#fff" }}>
              <div className="rectangle-3 text-editor">
                <div className="row mt-2">
                  <label className="ticket-title-where mb-0">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.tickettitle
                      : "Ticket Title"}
                    :
                  </label>
                </div>
                <div className="row" style={{ marginTop: "0" }}>
                  <label className="storelabel-3 mb-0">
                    {this.state.ticketDetailsData.ticketTitle}
                  </label>
                </div>
                <div className="row mt-3">
                  <label className="ticket-title-where mb-0">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.ticketdetails
                      : "Ticket Details"}
                    :
                  </label>
                </div>
                <div className="" style={{ marginTop: "5px" }}>
                  {this.state.ticketDetailsData.ticketDescription
                    ? this.state.ticketDetailsData.ticketDescription
                        .split(",")
                        .map((item) => {
                          return (
                            <>
                              <p
                                className="label-3 pb-0"
                                style={{ marginBottom: "5px" }}
                              >
                                {item}
                              </p>
                            </>
                          );
                        })
                    : null}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4" style={{ top: "20px" }}>
                  <label className="storeTickeTtl mb-0">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.notes
                      : "Notes"}
                    :
                    {this.state.NotesCount < 9
                      ? "0" + this.state.NotesCount
                      : this.state.NotesCount}
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div
                  className="col-12 col-xs-12 col-sm-4"
                  style={{ marginTop: "20px" }}
                >
                  <textarea
                    className="Add-Notes-textarea"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.placeholder.addnotes
                        : "Add Notes"
                    }
                    name="NoteAddComment"
                    value={this.state.NoteAddComment}
                    onChange={this.handleNoteOnChange}
                  ></textarea>
                  {this.state.NoteAddComment.length === 0 && (
                    <p
                      style={{
                        color: "red",
                        marginBottom: "0px",
                      }}
                    >
                      {this.state.AddNoteValidation}
                    </p>
                  )}
                  <button
                    type="button"
                    className="notesbtn notesbtn-text"
                    onClick={this.handleNoteAddComments.bind(this)}
                    style={{ marginTop: "5px" }}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.addcomment
                      : "ADD COMMENT"}
                  </button>
                </div>

                <div
                  className="col-12 col-xs-12 col-sm-8 my-ticket-notes"
                  style={{ top: "18px" }}
                >
                  {this.state.Notesdetails !== null &&
                    this.state.Notesdetails.map((item, i) => (
                      <div className="row my-ticket-notes-row" key={i}>
                        <div className="col-md-1">
                          <div className="oval-5-1-new">
                            <img
                              src={StoreIcon}
                              style={{ padding: "5px" }}
                              alt="store-icon"
                            />
                          </div>
                        </div>
                        <div className="col-md-11">
                          <div className="row my-ticket-notes-created">
                            <label className="varun-nagpal">
                              {item.name}{" "}
                              <span class="addTask-time-ago">
                                {item.commentDate}
                              </span>
                            </label>
                          </div>
                          <div className="row my-ticket-notes-created">
                            <label className="hi-diwakar-i-really tab">
                              {item.comment}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default storeMyTicket;
