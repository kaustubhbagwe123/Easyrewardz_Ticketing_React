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
import CKEditor from 'ckeditor4-react';

class TicketSystem extends Component {
  constructor() {
    super();
    this.state = {
      showAddNote: false,
      SubmitBtnReopn: false,
      TabIconColor: "nav-link active"
    };
    this.showAddNoteFuncation = this.showAddNoteFuncation.bind(this);
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
    return (
      <div>
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
                  <button className="rectanglecreateticket"
                  onClick={this.handleSubmitReopnModalOpen.bind(this)}>
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
            <div className="column">
              <div className="paddingsystem">
                <div className="row m-b-10">
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
                </div>
                <div className="row m-b-10">
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
                </div>
                <div className="row m-b-10">
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
                        Select Category
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
                </div>

                <div className="row m-b-10">
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
                </div>

                <div className="row m-b-10">
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
                </div>
                <div className="row m-b-10">
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
                </div>
                <div>
                  <CKEditor
                  config={{
                    toolbar: [
                    {
                      name: 'basicstyles',
                      items: ['Bold', 'Italic','Strike']
                    },
                    {
                      name: 'styles',
                      items: ['Styles', 'Format']
                    },
                    {
                      name: 'paragraph',
                      items: ['NumberedList', 'BulletedList']
                    },
                    {
                      name: 'links',
                      items: ['Link', 'Unlink']
                    },
                    {
                      name: 'insert',
                      items: ['Image', 'Table']
                    },
                    {
                      name: 'tools',
                      items: ['Maximize']
                    },
                    {
                      name: 'editing',
                      items: ['Scayt']
                    }
                  ],
                  }}
                />
                    </div>

                <div className="row m-b-10 m-t-10">
                  <div
                    className="filter-checkbox"
                    style={{ marginLeft: "15px" }}
                  >
                    <input
                      type="checkbox"
                      id="fil-open"
                      name="filter-type"
                      style={{ display: "none" }}
                      onChange={() => this.showAddNoteFuncation()}
                    />
                    <label htmlFor="fil-open" style={{ paddingLeft: "25px" }}>
                      <span className="add-note">Add Note</span>
                    </label>
                  </div>
                </div>
                {this.state.showAddNote ? (
                  <div>
                  <div className="row m-b-10">
                    <div className="col-md-12">
                      <textarea
                        className="addNote-textarea-system"
                        placeholder="Write your note here"
                      ></textarea>
                    </div>
                  </div>
                  
                  </div>
                ) : null}
              </div>
            </div>
            <div className="column ticketSycard">
              <div className="tab-content tabpaddingsystem">
                <div
                  className="tab-pane fade show active"
                  id="customer-tab"
                  role="tabpanel"
                  aria-labelledby="customer-tab"
                >
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
                        <label className="category1">Alankrit Kumar</label>
                      </div>
                      <div className="col-md-4">
                        <label className="category1">+91-9873470074</label>
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
                        <label className="category2">Alternate Number</label>
                      </div>
                      <div className="col-md-4">
                        <label className="category2">Alternate Email Id</label>
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
                      <button className="systemeditbutton">
                        <label className="systemeditbutton-text">EDIT</label>
                      </button>
                    </div>
                  </div>
                </div>

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
          </div>
        </div>
      </div>
    );
  }
}

export default TicketSystem;
