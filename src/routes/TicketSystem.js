import React, { Component } from "react";
import ArrowLeftCircleBlue from "./../assets/Images/arrow-circle-left.png";
import RedHeadPhoneIcon from "./../assets/Images/headphone.png";
import CopyIcon from "./../assets/Images/past.png";
import CustomreIcon from "./../assets/Images/customer.png";
import AvatarBlackIcon from "./../assets/Images/avatar.png";
import OrderIcon from "./../assets/Images/order.png";
import StoreIcon from "./../assets/Images/store-tikcet-system.png";
import TaskIcon from "./../assets/Images/ticket.png";
import TicketLogoBlue from "./../assets/Images/ticket-blue.png";
import TicketSystemOrder from "./Tabs/TicketSystemOrder";
import TicketSystemTask from "./Tabs/TicketSystemTask";
import TicketSystemStore from "./Tabs/TicketSystemStore";
import Modal from "react-responsive-modal";
import CKEditor from "ckeditor4-react";
import FileUpload from "./../assets/Images/file.png";
import ThumbTick from "./../assets/Images/thumbticket.png";
import AutoSave from "./../assets/Images/AutoSave.png";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import CancelImg from "./../assets/Images/cancel.png";
import { Collapse, CardBody, Card } from "reactstrap";
import DownArrowIcon from "./../assets/Images/down-1.png";
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import Up1Img from "./../assets/Images/up-1.png";
import Down1Img from "./../assets/Images/down-1.png";
import axios from "axios";

import { Radio } from "antd";
import DatePicker from "react-datepicker";

class TicketSystem extends Component {
  constructor() {
    super();
    this.state = {
      showAddNote: false,
      SubmitBtnReopn: false,
      EditCustomer: false,
      startDate: "",
      KbLink: false,
      collapseUp: false,
      TabIconColor: "nav-link active"
    };
    this.showAddNoteFuncation = this.showAddNoteFuncation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleUpOpen() {
    this.setState({ collapseUp: true });
  }
  handleUpClose() {
    this.setState({ collapseUp: false });
  }
  HandleKbLinkModalOpen() {
    this.setState({ KbLink: true });
  }
  HandleKbLinkModalClose() {
    this.setState({ KbLink: false });
  }
  handleEditCustomerOpen() {
    this.setState({ EditCustomer: true });
  }
  handleEditCustomerClose() {
    this.setState({ EditCustomer: false });
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  showAddNoteFuncation() {
    const { showAddNote } = this.state;
    this.setState({
      showAddNote: !showAddNote
    });
  }
  handlechangebtntab(e) {
    var idIndex = e.target.className;
    this.setState({ TabIconColor: idIndex });
  }
  handleSubmitReopnModalOpen() {
    this.setState({ SubmitBtnReopn: true });
  }
  handleSubmitReopnModalClose() {
    this.setState({ SubmitBtnReopn: false });
  }
  render() {
    const HidecollapsUpKbLink = this.state.collapseUp ? (
      <img
        src={Up1Img}
        alt="up"
        className="down-icon-kb1"
        onClick={this.handleUpClose.bind(this)}
      />
    ) : (
      <img
        src={Down1Img}
        alt="up"
        className="down-icon-kb1"
        onClick={this.handleUpOpen.bind(this)}
      />
    );
    return (
      <div style={{ backgroundColor: "#f5f8f9", paddingBottom: "2px" }}>
        <div className="rectanglesystem">
          <table className="table">
            <tbody>
              <tr>
                <td className="tdicon">
                  <img
                    src={ArrowLeftCircleBlue}
                    alt="arrow-circle-left"
                    className="bitmapback"
                  />
                  <label className="source">Source</label>
                  <img
                    src={RedHeadPhoneIcon}
                    alt="headphone"
                    className="bitmapheadpone"
                  />
                  <label className="a91-9873470074">+91-9873470074</label>
                  <img
                    src={CopyIcon}
                    alt="Copy-Icon"
                    className="bitmapheadpone"
                  />
                </td>

                <td className="tdtextnew" style={{ padding: "5px" }}>
                  <label className="save-as-a-draft">SAVE AS DRAFT</label>
                  <button
                    className="rectanglecreateticket"
                    onClick={this.handleSubmitReopnModalOpen.bind(this)}
                  >
                    <label className="create-ticket">CREACT TICKET</label>
                  </button>
                  <Modal
                    open={this.state.SubmitBtnReopn}
                    onClose={this.handleSubmitReopnModalClose.bind(this)}
                    closeIconId="close"
                    modalId="CreateTicket1-popup"
                    overlayId="logout-ovrly"
                  >
                    <div>
                      <label>Submit As Solved</label>
                    </div>
                  </Modal>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mask-ticket-system">
          <div className="row marginsystem">
            <div className="column marginsystem1">
              <div className="paddingsystem">
                <div className="row m-b-10">
                  <div className="col-md-12">
                    <label className="category">Ticket Title</label>
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Suggestion
                      </option>
                    </select>
                  </div>
                </div>
                {/* <div className="row m-b-10">
                  <div className="col-md-12">
                    <label className="category">Ticket Title</label>
                  </div>
                </div>
                <div className="row m-b-10">
                  <div className="col-md-12">
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Suggestion
                      </option>
                    </select>
                  </div>
                </div> */}
                {/* <div className="row m-b-10">
                  <div className="col-md-12">
                    <label className="category">Ticket Details</label>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-12">
                    <textarea
                      className="ticket-details-textarea-system"
                      placeholder="Write your title here"
                    ></textarea>
                  </div>
                </div> */}
                <div className="row m-b-10">
                  <div className="col-md-12">
                    <label className="category">Ticket Details</label>
                    <textarea
                      className="ticket-details-textarea-system"
                      placeholder="Write your title here"
                    ></textarea>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Brand</label>
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Brand
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Category</label>
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Brand
                      </option>
                    </select>
                  </div>
                </div>
                {/* <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Brand</label>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Category</label>
                  </div>
                </div>
                <div className="row m-b-10">
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Brand
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-sub-category-placeholder">
                        Select Sub Category
                      </option>
                    </select>
                  </div>
                </div> */}
                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Sub Category</label>
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Sub Category
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Issue Type</label>
                    <select className="category-select-system dropdown-label">
                      <option className="select-sub-category-placeholder">
                        Select Type
                      </option>
                    </select>
                  </div>
                </div>
                {/* <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Sub Category</label>

                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Issue Type</label>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Sub Category
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-sub-category-placeholder">
                        Select Type
                      </option>
                    </select>
                  </div>
                </div> */}

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Ticket Priority</label>
                    <div className="row">
                      <div className="col-md-4 High">
                        <button className="">
                          <label className="high-button-text">High</label>
                        </button>
                      </div>
                      <div className="col-md-4 Medium">
                        <button className="">
                          <label className="medium-button-text">Medium</label>
                        </button>
                      </div>
                      <div className="col-md-4 Low">
                        <button className="low-button">
                          <label className="low-button-text">Low</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Ticket Action Type</label>
                    <div className="row">
                      <div className="col-md-6 Qc">
                        <button className="low-button">
                          <label className="Qc-button-text">QC</label>
                        </button>
                      </div>
                      <div className="col-md-6 Etc">
                        <button className="">
                          <label className="Etb-button-text">ETB</label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Ticket Priority</label>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Ticket Action Type</label>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4 High">
                        <button className="">
                          <label className="high-button-text">High</label>
                        </button>
                      </div>
                      <div className="col-md-4 Medium">
                        <button className="">
                          <label className="medium-button-text">Medium</label>
                        </button>
                      </div>
                      <div className="col-md-4 Low">
                        <button className="low-button">
                          <label className="low-button-text">Low</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6 Qc">
                        <button className="low-button">
                          <label className="Qc-button-text">QC</label>
                        </button>
                      </div>
                      <div className="col-md-6 Etc">
                        <button className="">
                          <label className="Etb-button-text">ETB</label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Channel Of Purchase</label>
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Type
                      </option>
                    </select>
                  </div>
                </div>
                {/* <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Channel Of Purchase</label>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Select Type
                      </option>
                    </select>
                  </div>
                </div> */}
                <div className="row my-3 mx-1">
                  <img src={ThumbTick} alt="thumb" className="thumbtick" />
                  <img src={ThumbTick} alt="thumb" className="thumbtick" />
                </div>
                <div className="row" style={{ position: "absolute" }}>
                  <div
                    className="dropdown collapbtn1"
                    style={{ display: "inherit" }}
                  >
                    <button
                      className="dropdown-toggle my-tic-email"
                      type="button"
                      data-toggle="dropdown"
                    >
                      <FontAwesomeIcon icon={faCalculator} /> Template
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#!">Template 1</a>
                      </li>
                      <li>
                        <a href="#!">Template 2</a>
                      </li>
                      <li>
                        <a href="#!">Template 3</a>
                      </li>
                      <li>
                        <a href="#!">Template 4</a>
                      </li>
                    </ul>
                  </div>

                  <a href="#!" className="kblink1">
                    {/* <FontAwesomeIcon icon={faBrain} /> Kb Link */}
                    <img
                      src={KnowledgeLogo}
                      alt="KnowledgeLogo"
                      className="knoim"
                      onClick={this.HandleKbLinkModalOpen.bind(this)}
                    />
                    <label onClick={this.HandleKbLinkModalOpen.bind(this)}>
                      Kb Link
                    </label>
                  </a>

                  <label className="kblink-auto2">
                    <img src={AutoSave} alt="Auto" className="autosavekb" />
                    Auto Save
                  </label>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CKEditor
                      style={{ height: "400px" }}
                      config={{
                        toolbar: [
                          {
                            name: "basicstyles",
                            items: ["Bold", "Italic", "Strike"]
                          },
                          {
                            name: "styles",
                            items: ["Styles", "Format"]
                          },
                          {
                            name: "paragraph",
                            items: ["NumberedList", "BulletedList"]
                          },
                          {
                            name: "links",
                            items: ["Link", "Unlink"]
                          },
                          {
                            name: "insert",
                            items: ["Image", "Table"]
                          },
                          {
                            name: "tools",
                            items: ["Maximize"]
                          },
                          {
                            name: "editing",
                            items: ["Scayt"]
                          }
                        ]
                      }}
                    />
                    <div className="row colladrowa" style={{ bottom: "15px" }}>
                      <div className="col-md-12 colladrow">
                        <ul className="m-l-30">
                          <li className="diwamargin">
                            <label>To: diwarkar@gmail.com</label>
                          </li>
                          <li>
                            <div className="filter-checkbox">
                              <input
                                type="checkbox"
                                id="fil-open"
                                name="filter-type"
                                style={{ display: "none" }}
                              />
                              <label
                                htmlFor="fil-open"
                                style={{ paddingLeft: "25px" }}
                              >
                                <span>Inform Store Note</span>
                              </label>
                            </div>
                          </li>
                          <li>
                            <span>
                              <input
                                id="file-upload"
                                className="file-upload1 d-none"
                                type="file"
                                onChange={this.fileUpload}
                              />
                              <label
                                htmlFor="file-upload"
                                onDrop={this.fileDrop}
                                onDragOver={this.fileDragOver}
                                onDragEnter={this.fileDragEnter}
                              >
                                <img
                                  src={FileUpload}
                                  alt="file-upload"
                                  className="fileup"
                                />
                              </label>
                            </span>
                            <label style={{ color: "#2561a8" }}>3 files</label>
                          </li>
                          <li>
                            <label className="diwamargin">
                              <input
                                type="text"
                                className="CCdi1"
                                placeholder="CC: diwarkar@gmail.com"
                              />

                              <span className="one">+1</span>
                            </label>
                          </li>
                          <li>
                            <label className="diwamargin">
                              <input
                                type="text"
                                className="CCdi1"
                                placeholder="BCC: diwarkar@gmail.com"
                              />
                              <span className="one">+1</span>
                            </label>
                          </li>

                          <li style={{ float: "right", marginRight: "22px" }}>
                            <button className="sav1">Save As Draft</button>
                            <button className="send1">Send</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-b-10 m-t-10">
                  <div className="col-md-4">
                    <div
                      className="filter-checkbox"
                      style={{ marginLeft: "15px" }}
                    >
                      <input
                        type="checkbox"
                        id="fil-add"
                        name="filter-type"
                        style={{ display: "none" }}
                        onChange={() => this.showAddNoteFuncation()}
                      />
                      <label htmlFor="fil-add" style={{ paddingLeft: "25px" }}>
                        <span className="add-note">Add Note</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div
                      className="filter-checkbox"
                      style={{ marginLeft: "15px" }}
                    >
                      <input
                        type="checkbox"
                        id="fil-add1"
                        name="filter-type"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="fil-add1" style={{ paddingLeft: "25px" }}>
                        <span className="add-note">
                          Instant Escalation to High level
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {this.state.showAddNote ? (
                  <div>
                    <div className="row m-b-10">
                      <div className="col-md-12">
                        <textarea
                          className="addNote-textarea-system-new"
                          placeholder="Write your note here"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="column">
              <div className="">
                <div className="tab-content tabpaddingsystem">
                  <div
                    className="tab-pane fade show active"
                    id="customer-tab"
                    role="tabpanel"
                    aria-labelledby="customer-tab"
                  >
                    <div className="ticketSycard">
                      <div className="ticketSycard1">
                        <div className="paddingsystem">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="category2">Customer Name</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">Phone Number</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">Email Id</label>
                            </div>
                          </div>

                          <div className="row" style={{ marginBottom: "20px" }}>
                            <div className="col-md-4">
                              <label className="category1">
                                Alankrit Kumar
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                +91-9873470074
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                alankrit@easyrewardz.com
                              </label>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4">
                              <label className="category2">Gender</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">
                                Alternate Number
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">
                                Alternate Email Id
                              </label>
                            </div>
                          </div>

                          <div className="row" style={{ marginBottom: "20px" }}>
                            <div className="col-md-4">
                              <label className="category1">Male</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">-NA-</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                alankrit@easyrewardz.com
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <button
                              className="systemeditbutton"
                              onClick={this.handleEditCustomerOpen.bind(this)}
                            >
                              <label className="systemeditbutton-text">
                                EDIT
                              </label>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Modal
                    onClose={this.handleEditCustomerClose.bind(this)}
                    open={this.state.EditCustomer}
                    modalId="AddSearchModel"
                    overlayId="logout-ovrly"
                  >
                    <div className="pop-upAddSearchPD">
                      <label className="lbl-popup-title">Edit Customer</label>
                      <hr />
                      <div className="row row-margin1">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="row row-margin1">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Email ID"
                          />
                        </div>
                        <div className="col-md-6 radio-btn-margin">
                          <Radio.Group
                            onChange={this.onChange}
                            value={this.state.value}
                          >
                            <Radio value={1}>Male</Radio>
                            <Radio value={2}>Female</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="row row-margin1">
                        <div className="col-md-6 addcustdate">
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={date => this.handleChange(date)}
                            placeholderText="DOB"
                            showMonthDropdown
                            showYearDropdown
                            className="txt-1"
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row row-margin1">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Alternate Number"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Alternate Email"
                          />
                        </div>
                      </div>
                      <div className="btn-float">
                        <button
                          className="cancel-btn-A"
                          onClick={this.handleEditCustomerClose.bind(this)}
                        >
                          CANCEL
                        </button>
                        <a href="#!">
                          <button className="butn">SAVE</button>
                        </a>
                      </div>
                      {/* <div className="btn-float">
                      <a
                        href="#!"
                        className="cancel-btn-A"
                        onClick={this.handleAddCustomerClose}
                      >
                        CANCEL
                      </a>
                      <a href="ticketsystem">
                        <button className="butn">SAVE</button>
                      </a>
                    </div> */}
                    </div>
                  </Modal>

                  <div
                    className="tab-pane fade"
                    id="order-tab"
                    role="tabpanel"
                    aria-labelledby="order-tab"
                  >
                    <TicketSystemOrder />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="store-tab"
                    role="tabpanel"
                    aria-labelledby="store-tab"
                  >
                    <TicketSystemStore />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="task-tab"
                    role="tabpanel"
                    aria-labelledby="task-tab"
                  >
                    <TicketSystemTask />
                  </div>
                </div>
              </div>
            </div>
            <div className="column1">
              <div className="myticketlist-header-system">
                <div className="setting-tabs system">
                  <ul className="nav nav-tabs es" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#customer-tab"
                        role="tab"
                        aria-controls="customer-tab"
                        aria-selected="true"
                        onClick={this.handlechangebtntab.bind(this)}
                      >
                        {this.state.TabIconColor === "nav-link active" ? (
                          <img
                            src={CustomreIcon}
                            alt="customer-icon"
                            className="customer-icon"
                          />
                        ) : (
                          <img
                            src={AvatarBlackIcon}
                            alt="customer-icon"
                            className="customer-icon"
                          />
                        )}
                        {/* <img
                          src={AvatarBlackIcon}
                          alt="customer-icon"
                          className="customer-icon"
                        /> */}
                        {/* <img
                          src={CustomreIcon}
                          alt="customer-icon"
                          className="customer-icon"
                        /> */}
                        <span className="system-tab-span">CUSTOMER</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#order-tab"
                        role="tab"
                        aria-controls="order-tab"
                        aria-selected="false"
                      >
                        <img
                          src={OrderIcon}
                          alt="order-icon"
                          className="order-icon"
                        />
                        <span className="system-tab-span">ORDER</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#store-tab"
                        role="tab"
                        aria-controls="store-tab"
                        aria-selected="false"
                      >
                        <img
                          src={StoreIcon}
                          alt="store-icon"
                          className="store-icon"
                        />
                        <img
                          src={TicketLogoBlue}
                          alt="ticketlogoblue"
                          className="store-icon"
                          style={{ display: "none" }}
                        />
                        <span className="system-tab-span">STORE</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#task-tab"
                        role="tab"
                        aria-controls="task-tab"
                        aria-selected="false"
                      >
                        <img
                          src={TaskIcon}
                          alt="task-icon"
                          className="task-icon"
                        />
                        <span className="system-tab-span">TASK</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Modal
                open={this.state.KbLink}
                onClose={this.HandleKbLinkModalClose.bind(this)}
                modalId="KbLink-popup"
                overlayId="logout-ovrlykb"
              >
                <div className="row" style={{ margin: "0" }}>
                  <div className="col-md-7" style={{ padding: "0" }}>
                    <div className="knokb">
                      <h5>
                        <img
                          src={KnowledgeLogo}
                          alt="KnowledgeLogo"
                          className="knoim1"
                        />
                        KNOWLEGE BASE
                      </h5>
                      <p>Message</p>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I purchase a domain through Google?
                        </p>
                        {HidecollapsUpKbLink}

                        <Collapse isOpen={this.state.collapseUp}>
                          <Card>
                            <CardBody>
                              <p>
                                Google can help you purchase a domain through
                                one of our domain host partners. During sign up,
                                just select the option to 'buy a new
                                domain.'We'll then guide you through the process
                                to help you set up G suite for your new domain.
                              </p>
                              <img
                                src={CopyBlue}
                                alt=""
                                className="copyblue-kb"
                              />
                              <a href="#!" className="copyblue-kbtext">
                                Copy
                              </a>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>

                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>

                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 kblinkright">
                    <div className="knokb-a">
                      <img
                        src={CancelImg}
                        alt="cancelImg"
                        className="cancalImg-kb"
                        onClick={this.HandleKbLinkModalClose.bind(this)}
                      />
                      <h5>KB TEMPLATE</h5>
                      <div className="form-group">
                        <select className="kblinkrectangle-9 select-category-placeholderkblink">
                          <option>Type</option>
                          <option>Type-a</option>
                          <option>Type-b</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <select className="kblinkrectangle-9 select-category-placeholderkblink">
                          <option>Category</option>
                          <option>Category-a</option>
                          <option>Category-b</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select className="kblinkrectangle-9 select-category-placeholderkblink">
                          <option>Sub-Category</option>
                          <option>Category-a</option>
                          <option>Category-b</option>
                        </select>
                      </div>
                      <div>
                        <button className="kblink-search">SEARCH</button>
                      </div>
                      <div style={{ marginTop: "275px" }}>
                        <a href="#!" className="copyblue-kbtext">
                          VIEW POLICY
                        </a>
                        <img
                          src={ViewBlue}
                          alt="viewpolicy"
                          className="viewpolicy-kb"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketSystem;
