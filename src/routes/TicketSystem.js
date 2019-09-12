import React, { Component } from 'react';
import ArrowLeftCircleBlue from './../assets/Images/arrow-circle-left.png'
import RedHeadPhoneIcon from './../assets/Images/headphone.png';
import CopyIcon from './../assets/Images/copy.png';
import CustomreIcon from './../assets/Images/customer.png'
import OrderIcon from './../assets/Images/order.png';
import StoreIcon from './../assets/Images/store.png';
import TaskIcon from './../assets/Images/ticket.png'; 
class TicketSystem extends Component {

    constructor() {
        super();
        this.state = {
            showAddNote: false
        };
        this.showAddNoteFuncation = this.showAddNoteFuncation.bind(this);
    }

    showAddNoteFuncation() {
        const { showAddNote } = this.state;
        this.setState({
            showAddNote: !showAddNote
        });
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
                      <button className="rectanglecreateticket">
                        <label className="create-ticket">CREACT TICKET</label>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mask">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={{ width: "45%" }}>
                      <div className="row rowmargin">
                        <label className="ticket-tittle">Ticket Tittle</label>
                      </div>
                      <div className="row rowmargin">
                        <div className="col-md-6">
                          <input
                            type="text"
                            name="title"
                            className="ticket-tittle-textbox"
                            placeholder="suggestion"
                          />
                        </div>
                      </div>

                      <div className="row rowmargin">
                        <label className="ticket-details">Ticket Details</label>
                      </div>
                      <div className="row rowmargin">
                        <div className="col-md-6">
                          <textarea
                            className="ticket-details-textarea"
                            placeholder="Write your title here"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row rowmargin">
                        <div className="col-md-5">
                          <label className="category">Category</label>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ marginLeft: "10px" }}
                        >
                          <label className="sub-category">Sub Category</label>
                        </div>
                      </div>
                      <div className="row rowmargin">
                        <div className="col-md-5">
                          <select className="category-select">
                            <option
                              className="select-category-placeholder"
                              selected
                            >
                              Select Category
                            </option>
                          </select>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ marginLeft: "30px" }}
                        >
                          <select className="sub-category-select">
                            <option className="select-sub-category-placeholder">
                              Select Sub Category
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="row rowmargin">
                        <div className="col-md-5">
                          <label className="category">Issue Type</label>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ marginLeft: "10px" }}
                        >
                          <label className="sub-category">
                            Ticket Priority
                          </label>
                        </div>
                      </div>

                      <div className="row rowmargin">
                        <div className="col-md-5">
                          <select className="category-select">
                            <option className="select-category-placeholder">
                              Select Type
                            </option>
                          </select>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ marginLeft: "10px" }}
                        >
                          <div className="row" style={{ marginLeft: "5px" }}>
                            <div className="col-md-3 High">
                              <button className="">
                                <label className="high-button-text">High</label>
                              </button>
                            </div>
                            <div className="col-md-4 Medium" style={{marginLeft:"10px"}}>
                              <button className="">
                                <label className="medium-button-text">
                                  Medium
                                </label>
                              </button>
                            </div>
                            <div className="col-md-4 Low" style={{marginLeft:"10px"}}>
                              <button className="low-button">
                                <label className="low-button-text">Low</label>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="row rowmargin"
                        style={{ marginLeft: "26px", marginTop: "14px" }}
                      >
                        <input
                          type="checkbox"
                          className="screen-shot-2018-04-17-at-4-39-16-pm"
                          onChange={() => this.showAddNoteFuncation()}
                        />
                        <label className="add-note">Add Note</label>
                      </div>
                      {this.state.showAddNote ? (
                        <div
                          className="row rowmargin"
                          style={{ marginLeft: "26px", marginTop: "14px" }}
                        >
                          <textarea
                            className="addNote-textarea"
                            placeholder="Write your note here"
                          ></textarea>
                        </div>
                      ) : null}
                    </td>
                    <td className="rectangletd" style={{ width: "45%" }}>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="customer-name">Customer Name</label>
                        </div>
                        <div className="col-md-4">
                          <label className="phone-number">Phone Number</label>
                        </div>
                        <div className="col-md-4">
                          <label className="email-id">Email ID</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="alankrit-kumar">
                            Alankrit Kumar
                          </label>
                        </div>
                        <div className="col-md-4">
                          <label className="b91-9873470074">
                            +91-9873470074
                          </label>
                        </div>
                        <div className="col-md-4">
                          <label className="alankrit-easyrewardz">
                            alankrit@easyrewardz.com
                          </label>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-4">
                          <label className="customer-name">Gender</label>
                        </div>
                        <div className="col-md-4">
                          <label className="phone-number">
                            Alternate Number
                          </label>
                        </div>
                        <div className="col-md-4">
                          <label className="email-id">Alternate Email ID</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="alankrit-kumar">Male</label>
                        </div>
                        <div className="col-md-4">
                          <label className="a91-9873470074">-NA-</label>
                        </div>
                        <div className="col-md-4">
                          <label className="alankrit-easyrewardz">
                            alankrit@easyrewardz.com
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <button className="edit-button">
                          <label className="edit-button-text">EDIT</label>
                        </button>
                      </div>
                    </td>
                    <td className="right-rectangle" style={{ width: "5%" }}>
                      <div></div>
                      <div className="btn-group-vertical">
                        <div>
                          <img
                            src={CustomreIcon}
                            alt="customer-icon"
                            className="customer-icon"
                          />
                        </div>
                        <span className="customer-text">CUSTOMER</span>
                        <br />
                        <div>
                          <img
                            src={OrderIcon}
                            alt="order-icon"
                            className="order-icon"
                          />
                        </div>
                        <span className="order-text">ORDER</span>
                        <br />
                        <div>
                          <img
                            src={StoreIcon}
                            alt="store-icon"
                            className="store-icon"
                          />
                        </div>
                        <span className="store-text">STORE</span>
                        <br />
                        <div>
                          <img
                            src={TaskIcon}
                            alt="task-icon"
                            className="task-icon"
                          />
                        </div>
                        <span className="task-text">TAKS</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}

export default TicketSystem;