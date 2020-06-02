import React, { Component } from "react";
import HeadphoneImg from "./../../assets/Images/headphone.png";
import LoadingImg from "./../../assets/Images/loading.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import DownImg from "./../../assets/Images/down.png";
import EyeImg from "./../../assets/Images/eye.png";
import BillInvoiceImg from "./../../assets/Images/bill-Invoice.png";
import StoreIcon from "./../../assets/Images/store.png";

class storeMyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="head-header">
          <div className="head-header-1">
            <div className="row">
              <div className="col-12 col-xs-4 col-sm-4 col-md-3">
                <img src={HeadphoneImg} alt="headphone" className="headphone" />
                <label className="id-abc-1234">
                  ID - 1<span className="updated-2-d-ago">1 Day ago</span>
                </label>
                <a
                  href="#!"
                  className="loading-rectangle-cntr"
                  //   onClick={this.handleGetHistoricalData.bind(this)}
                >
                  <img
                    src={LoadingImg}
                    alt="Loading"
                    className="loading-rectangle m-0"
                    title="Ticket Historical"
                    // onClick={this.handleGetHistoricalData.bind(this)}
                  />
                </a>
              </div>

              <div
                className="col-12 col-xs-8 col-sm-8 col-md-9"
                // className={
                //   this.state.isKB
                //     ? "col-12 col-xs-8 col-sm-8 col-md-9 iskbticket"
                //     : "col-12 col-xs-8 col-sm-8 col-md-9"
                // }
              >
                <div
                  style={{ float: "right", marginTop: "0px" }}
                  //   className={this.state.isKB ? "iskbticket" : ""}
                >
                  <a
                    href="#!"
                    className="d-inline-block"
                    // onClick={this.HandlelabelModalOpen.bind(this)}
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
                      {/* {ticketDetailsData.username} */}SMB159
                    </label>
                    <img src={DownImg} alt="down" className="down-header" />
                  </a>
                  <button
                    type="button"
                    className="myticket-submit-solve-button"
                    // className={
                    //   this.state.isKB
                    //     ? "myticket-submit-solve-button iskbticket"
                    //     : "myticket-submit-solve-button"
                    // }
                    // onClick={this.handleSubmitTicket.bind(this)}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-rectangle">
          <div className="rectangle-box">
            <div className="row">
              <div className="col-md-3">
                <div style={{ padding: "15px" }}>
                  <label className="mobile-number">Mobile Number</label>
                  <br />
                  <label className="mobile-no">
                    {/* {ticketDetailsData.customerPhoneNumber} */} 7400022455
                  </label>

                  <img
                    src={EyeImg}
                    alt="eye"
                    className="eyeImg1"
                    title="Customer Profile"
                    // onClick={this.HandleProfileModalOpen.bind(this)}
                  />

                  <img
                    src={BillInvoiceImg}
                    alt="eye"
                    className="billImg"
                    title="Historical Order"
                    // onClick={this.handleBillImgModalOpen.bind(this)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mid-sec mid-secnew">
                  <div className="row mob-pad">
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                      <div
                        className="form-group"
                        //    className={
                        //       statusValidate
                        //         ? "form-group"
                        //         : "form-group disabled-link"
                        //     }
                      >
                        <label className="label-4">Status</label>
                        <select
                          className="rectangle-9 select-category-placeholder"
                          //   className={
                          //     this.state.isKB
                          //       ? "rectangle-9 select-category-placeholder iskbticket"
                          //       : "rectangle-9 select-category-placeholder"
                          //   }
                          //   value={this.state.selectetedParameters.ticketStatusID}
                          //   onChange={this.handleDropDownChange}
                          name="ticketStatusID"
                        >
                          <option>Ticket Status</option>
                          {/* {this.state.TicketStatusData !== null &&
                            this.state.TicketStatusData.map((item, i) => (
                              <option key={i} value={item.ticketStatusID}>
                                {item.ticketStatusName}
                              </option>
                            ))} */}
                        </select>
                      </div>
                    </div>

                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      {/* <div className="form-group"> */}
                      <div
                        className="form-group"
                        // className={
                        //   this.state.role_Name === "Supervisor"
                        //     ? "form-group"
                        //     : "form-group disabled-link" &&
                        //       this.state.role_Name === "Admin"
                        //     ? "form-group"
                        //     : "form-group disabled-link"
                        // }
                      >
                        <label className="label-4">Priority</label>
                        <select
                          className="rectangle-9 select-category-placeholder"
                          //   className={
                          //     this.state.isKB
                          //       ? "rectangle-9 select-category-placeholder iskbticket"
                          //       : "rectangle-9 select-category-placeholder"
                          //   }
                          //   value={this.state.selectetedParameters.priorityID}
                          //   onChange={this.handleDropDownChange}
                          name="priorityID"
                        >
                          <option>Priority</option>
                          {/* {this.state.TicketPriorityData !== null &&
                            this.state.TicketPriorityData.map((item, i) => {
                              if (
                                this.state.isSystemGenerated == false &&
                                item.priortyName === "Auto"
                              ) {
                                return null;
                              } else if (
                                this.state.isSystemGenerated == true &&
                                item.priortyName === "Auto"
                              ) {
                                return (
                                  <option key={i} value={item.priorityID}>
                                    {item.priortyName}
                                  </option>
                                );
                              } else {
                                return (
                                  <option key={i} value={item.priorityID}>
                                    {item.priortyName}
                                  </option>
                                );
                              }
                            })} */}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      {/* <div className="form-group"> */}
                      <div
                        className="form-group"
                        // className={
                        //   this.state.role_Name === "Supervisor"
                        //     ? "form-group"
                        //     : "form-group disabled-link" &&
                        //       this.state.role_Name === "Admin"
                        //     ? "form-group"
                        //     : "form-group disabled-link"
                        // }
                      >
                        <label className="label-4">Brand</label>
                        <select
                          className="rectangle-9 select-category-placeholder"
                          //   className={
                          //     this.state.isKB
                          //       ? "rectangle-9 select-category-placeholder iskbticket"
                          //       : "rectangle-9 select-category-placeholder"
                          //   }
                          //   value={this.state.selectetedParameters.brandID}
                          //   onChange={this.handleDropDownChange}
                          name="brandID"
                        >
                          <option className="select-category-placeholder">
                            Select Brand
                          </option>
                          {/* {this.state.BrandData !== null &&
                            this.state.BrandData.map((item, i) => (
                              <option
                                key={i}
                                value={item.brandID}
                                className="select-category-placeholder"
                              >
                                {item.brandName}
                              </option>
                            ))} */}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                      {/* <div className="form-group"> */}
                      <div
                        className="form-group"
                        // className={
                        //   this.state.role_Name === "Supervisor"
                        //     ? "form-group"
                        //     : "form-group disabled-link" &&
                        //       this.state.role_Name === "Admin"
                        //     ? "form-group"
                        //     : "form-group disabled-link"
                        // }
                      >
                        <label className="label-4">Category</label>
                        <select
                          className="rectangle-9 select-category-placeholder"
                          //   className={
                          //     this.state.isKB
                          //       ? "rectangle-9 select-category-placeholder iskbticket"
                          //       : "rectangle-9 select-category-placeholder"
                          //   }
                          //   value={this.state.selectetedParameters.categoryID}
                          //   onChange={this.handleDropDownChange}
                          name="categoryID"
                        >
                          <option className="select-category-placeholder">
                            Select Category
                          </option>
                          {/* {this.state.CategoryData !== null &&
                            this.state.CategoryData.map((item, i) => (
                              <option
                                key={i}
                                value={item.categoryID}
                                className="select-category-placeholder"
                              >
                                {item.categoryName}
                              </option>
                            ))} */}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      {/* <div className="form-group"> */}
                      <div
                        className="form-group"
                        // className={
                        //   this.state.role_Name === "Supervisor"
                        //     ? "form-group"
                        //     : "form-group disabled-link" &&
                        //       this.state.role_Name === "Admin"
                        //     ? "form-group"
                        //     : "form-group disabled-link"
                        // }
                      >
                        <label className="label-4">Sub Category</label>
                        <select
                          className="rectangle-9 select-category-placeholder"
                          //   className={
                          //     this.state.isKB
                          //       ? "rectangle-9 select-category-placeholder iskbticket"
                          //       : "rectangle-9 select-category-placeholder"
                          //   }
                          //   value={this.state.selectetedParameters.subCategoryID}
                          //   onChange={this.handleDropDownChange}
                          name="subCategoryID"
                        >
                          <option className="select-category-placeholder">
                            Select Sub Category
                          </option>
                          {/* {this.state.SubCategoryData !== null &&
                            this.state.SubCategoryData.map((item, i) => (
                              <option
                                key={i}
                                value={item.subCategoryID}
                                className="select-category-placeholder"
                              >
                                {item.subCategoryName}
                              </option>
                            ))} */}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      {/* <div className="form-group"> */}
                      <div
                        className="form-group"
                        // className={
                        //   this.state.role_Name === "Supervisor"
                        //     ? "form-group"
                        //     : "form-group disabled-link" &&
                        //       this.state.role_Name === "Admin"
                        //     ? "form-group"
                        //     : "form-group disabled-link"
                        // }
                      >
                        <label className="label-4">Issue Type</label>

                        <select
                          className="rectangle-9 select-category-placeholder"
                          //   className={
                          //     this.state.isKB
                          //       ? "rectangle-9 select-category-placeholder iskbticket"
                          //       : "rectangle-9 select-category-placeholder"
                          //   }
                          //   value={this.state.selectetedParameters.issueTypeID}
                          //   onChange={this.handleDropDownChange}
                          name="issueTypeID"
                        >
                          <option className="select-sub-category-placeholder">
                            Select Issue Type
                          </option>
                          {/* {this.state.IssueTypeData !== null &&
                            this.state.IssueTypeData.map((item, i) => (
                              <option
                                key={i}
                                value={item.issueTypeID}
                                className="select-category-placeholder"
                              >
                                {item.issueTypeName}
                              </option>
                            ))} */}
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
              <label className="ticket-title-where mb-0">Ticket Title:</label>
            </div>
            <div className="row" style={{ marginTop: "0" }}>
              <label className="storelabel-3 mb-0">
                {/* {ticketDetailsData.ticketTitle} */}
                Customer Ticket Title
              </label>
            </div>
            <div className="row mt-3">
              <label className="ticket-title-where mb-0">Ticket Details:</label>
            </div>
            <div className="row" style={{ marginTop: "0" }}>
              <label className="label-3 pb-0">
                {/* {ticketDetailsData.ticketdescription} */}Customer Ticket
                Details
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" style={{ top: "20px" }}>
              <label className="storeTickeTtl mb-0">Notes: 01</label>
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div
              className="col-12 col-xs-12 col-sm-4"
              style={{ marginTop: "20px" }}
            >
              <textarea
                className="Add-Notes-textarea"
                //   className={
                //     this.state.isKB
                //       ? "Add-Notes-textarea iskbticket"
                //       : "Add-Notes-textarea"
                //   }
                placeholder="Add Notes"
                name="NoteAddComment"
                //   value={this.state.NoteAddComment}
                //   onChange={this.handleNoteOnChange}
              ></textarea>
              {/* {this.state.NoteAddComment.length === 0 && (
                  <p
                    style={{
                      color: "red",
                      marginBottom: "0px",
                    }}
                  >
                    {this.state.notesCommentCompulsion}
                  </p>
                )} */}
              <button
                type="button"
                className="notesbtn notesbtn-text"
                //   className={
                //     this.state.isKB
                //       ? "notesbtn notesbtn-text iskbticket"
                //       : "notesbtn notesbtn-text"
                //   }
                //   onClick={this.handleNoteAddComments.bind(this)}
                style={{ marginTop: "5px" }}
              >
                ADD COMMENT
              </button>
            </div>

            <div className="col-12 col-xs-12 col-sm-8 my-ticket-notes" style={{top:"18px"}}>
              {/* {this.state.Notesdetails !== null &&
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
                            {item.createdByName}
                          </label>
                        </div>
                        <div className="row my-ticket-notes-created">
                          <label className="hi-diwakar-i-really tab">
                            {item.note}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))} */}
              <div className="row my-ticket-notes-row">
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
                      {/* {item.createdByName} */} Admin Admin
                    </label>
                  </div>
                  <div className="row my-ticket-notes-created">
                    <label className="hi-diwakar-i-really tab">
                      {/* {item.note} */} Test Notes
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default storeMyTicket;
