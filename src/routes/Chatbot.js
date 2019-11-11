import React, { Component } from "react";
import Demo from "../store/Hashtag";
import UserImg from "./../assets/Images/user-info.png";
import ReactTable from "react-table";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import ChatThumbImg from "./../assets/Images/chatthumb.png";
import { Drawer } from "antd";
import CancelImg from "./../assets/Images/cancel.png";
import Modal from "react-responsive-modal";

class Chatbot extends Component {
  state = {
    ReactChatModel: false,
    CrateTicketMdl: false,
    OpenTicketMdl: false
  };

  handleReactChatModelOpen() {
    this.setState({ ReactChatModel: true });
  }
  handleReactChatModelClose() {
    this.setState({ ReactChatModel: false });
  }
  handleCreateTicketModalOpn() {
    this.setState({ CrateTicketMdl: true });
  }
  handleCreateTicketModalCls() {
    this.setState({ CrateTicketMdl: false });
  }
  handleOpenTicketOpn() {
    this.setState({ OpenTicketMdl: true });
  }
  handleOpenTicketCls() {
    this.setState({ OpenTicketMdl: false });
  }

  render() {
    const datachat = [
      {
        Chatname: <label className="chatnamereact">Abhishek Verma</label>,
        chatsati: <label className="chatnamereact">-</label>,
        chattime: <label className="chatnamereact">3 hrs ago</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">
              <label>03</label>
            </span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Naman Rampal</label>,
        chatsati: (
          <label className="chatnamereact">
            <img
              src={ChatThumbImg}
              alt="ChatThumb icon"
              className="chatthumb"
            />
          </label>
        ),
        chattime: <label className="chatnamereact">12 hrs ago</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">
              <label>03</label>
            </span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Juhi Handa</label>,
        chatsati: <label className="chatnamereact">-</label>,
        chattime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">
              <label>03</label>
            </span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">akriti Tiwari</label>,
        chatsati: <label className="chatnamereact">-</label>,
        chattime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">
              <label>03</label>
            </span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Mansi Tiwari</label>,
        chatsati: <label className="chatnamereact">-</label>,
        chattime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">
              <label>03</label>
            </span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Nidhi Jain</label>,
        chatsati: (
          <label className="chatnamereact">
            <img
              src={ChatThumbImg}
              alt="ChatThumb icon"
              className="chatthumb"
            />
          </label>
        ),
        chattime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">
              <label>03</label>
            </span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      }
    ];

    const columnschat = [
      {
        Header: <span>Agent</span>,
        accessor: "Chatname"
      },
      {
        Header: <span>Satisfaction</span>,
        accessor: "chatsati"
      },
      {
        Header: <span>Time</span>,
        accessor: "chattime"
      },
      {
        Header: <span>Message</span>,
        accessor: "chatmsg"
        // Cell:props =>
        // <span>
        //     <span className="table-bchat">
        //     <label>03</label></span>
        //    <label>Lorem ipsum dolar sit amet,consecteture adipiscing elit</label>
        // </span>
      }
    ];

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 p-0">
            <div className="chatbot-left">
              <div className="chat-cntr">
                <p>Ongoing Chats (03)</p>
                <div className="chat-left-height">
                  <div className="chat-info">
                    <div className="d-flex align-items-center">
                      <span className="dark-blue-ini initial">V</span>
                      <div className="name-num ml-2">
                        <p>Varun Kumar</p>
                        <p className="num">+91-9873470074</p>
                      </div>
                    </div>
                    <div>
                      <div className="mess-time">
                        <p>2 New Messages</p>
                        <p>56s</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat-info active">
                    <div className="d-flex align-items-center">
                      <span className="light-blue-ini initial">M</span>
                      <div className="name-num ml-2">
                        <p>Mohit Verma</p>
                        <p className="num">Mohit90@gmail.com</p>
                      </div>
                    </div>
                    <div>
                      <div className="mess-time">
                        <p>1 New Messages</p>
                        <p>1m:36s</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat-info">
                    <div className="d-flex align-items-center">
                      <span className="yellow-ini initial">A</span>
                      <div className="name-num ml-2">
                        <p>Ankit Gupta</p>
                        <p className="num">+91-9382838834</p>
                      </div>
                    </div>
                    <div>
                      <div className="mess-time">
                        <p>No New Messages</p>
                        <p>1m:36s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-cntr">
                <p>New Chats (02)</p>
                <div className="chat-left-height">
                  <div className="chat-info">
                    <div className="d-flex align-items-center">
                      <span className="green-ini initial">V</span>
                      <div className="name-num ml-2">
                        <p>Vipin Kumar</p>
                        <p className="num">+91-9873470074</p>
                      </div>
                    </div>
                    <div>
                      <div className="mess-time">
                        <p>Waiting for reply</p>
                        <p>56s</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat-info">
                    <div className="d-flex align-items-center">
                      <span className="orange-ini initial">M</span>
                      <div className="name-num ml-2">
                        <p>Mohit Kumar</p>
                        <p className="num">Mohit90@gmail.com</p>
                      </div>
                    </div>
                    <div>
                      <div className="mess-time">
                        <p>Waiting for reply</p>
                        <p>1m:36s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="butn-inv hist-btn">My historical chat</button>
          </div>
          <div className="col-lg-9 p-0">
            <div className="chatbot-right">
              <div className="top-tab-act">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#current-chat-tab"
                      role="tab"
                      aria-controls="current-chat-tab"
                      aria-selected="true"
                    >
                      Current Chat
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#recent-chat-tab"
                      role="tab"
                      aria-controls="recent-chat-tab"
                      aria-selected="false"
                    >
                      Recent Chat (08)
                    </a>
                  </li>
                </ul>
                {/* <div className="action-part d-flex align-items-center">
                                    <select className="butn">
                                        <option value="">ACTION</option>
                                    </select>
                                    <button className="butn cross">&times;</button>
                                </div>  */}
              </div>
              <div className="tab-content p-0">
                <div
                  className="tab-pane fade show active"
                  id="current-chat-tab"
                  role="tabpanel"
                  aria-labelledby="current-chat-tab"
                >
                  <div className="action-part d-flex align-items-center actionleft">
                    <select className="butn">
                      <option value="">ACTION</option>
                    </select>
                    <button className="butn cross">&times;</button>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                      <div className="chat-user-det">
                        <div>
                          <div className="d-flex">
                            <p className="chat-user-name">Mohit Verma</p>
                            <a href={Demo.BLANK_LINK} className="ml-2">
                              <img src={UserImg} alt="user" />
                            </a>
                          </div>
                          <div className="chat-user-num">
                            <a href="tel:+91-9873470074">+91-9873470074</a>
                            <span>|</span>
                            <a href="mailto:mohit90@gmail.com">
                              mohit90@gmail.com
                            </a>
                          </div>
                        </div>
                        <div className="mess-time">
                          <p>Add visitor notes</p>
                          <textarea placeholder="Add Note"></textarea>
                        </div>
                        <div>
                          <div className="price-tic d-flex">
                            <div>
                              <label className="blue-clr font-weight-bold">
                                &#8377; 2000
                              </label>
                              <p>Last Purchase</p>
                            </div>
                            <div>
                              <label
                                className="blue-clr font-weight-bold"
                                onClick={this.handleOpenTicketOpn.bind(this)}
                              >
                                02
                              </label>
                              <p>Open Ticket</p>
                            </div>
                            <Modal
                              open={this.state.OpenTicketMdl}
                              onClose={this.handleOpenTicketCls.bind(this)}
                              closeIconId="close"
                              modalId="createTicketModal"
                              overlayId="logout-ovrly"
                            >
                              <div className="padding-div">
                                <label className="openTciketLbl">
                                  Open Ticket : 02
                                </label>
                                <img
                                  src={CancelImg}
                                  alt="CancelImg"
                                  className="curshar-pointer flot-calcel"
                                  onClick={this.handleOpenTicketCls.bind(this)}
                                />
                                <hr />
                                <div className="row">
                                  <div className="col-md-3">
                                    <label className="modal-lbl1">
                                      Ticket ID
                                    </label>
                                  </div>
                                  <div className="col-md-3">
                                    <label className="modal-lbl1">
                                      Ticket Title
                                    </label>
                                  </div>
                                </div>
                                <div className="row opn-ticketDiv">
                                  <div className="col-md-3">
                                    <label className="no-mdl">11234</label>
                                  </div>
                                  <div className="col-md-7">
                                    <label className="modal-lbl2">
                                      Need to change my shipping address
                                      <span className="span-lbl2">
                                        Hope this help, please rate us
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <hr />
                                <div className="row opn-ticketDiv">
                                  <div className="col-md-3">
                                    <label className="no-mdl">11234</label>
                                  </div>
                                  <div className="col-md-7">
                                    <label className="modal-lbl2">
                                      Need to change my shipping address
                                      <span className="span-lbl2">
                                        Hope this help, please rate us
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                          <button
                            className="butn mt-3 w-100"
                            onClick={this.handleCreateTicketModalOpn.bind(this)}
                          >
                            Create Ticket
                          </button>
                          <Modal
                            open={this.state.CrateTicketMdl}
                            onClose={this.handleCreateTicketModalCls.bind(this)}
                            closeIconId="close"
                            modalId="CreateCustomer-mdl"
                            overlayId="logout-ovrly"
                          >
                            <div className="mdlcancleImg">
                              <img
                                src={CancelImg}
                                alt="CancelImg"
                                className="curshar-pointer"
                                onClick={this.handleCreateTicketModalCls.bind(
                                  this
                                )}
                              />
                            </div>
                            <div className="mainDiv-crt">
                              <div className="lbl-mdlHeader">
                                <label className="lbl-customerMdl">
                                  Customer Details
                                </label>
                                <label className="lbl-sourceChat">
                                  Source :
                                  <span className="lbl-customerMdl"> Chat</span>
                                </label>
                              </div>
                              <div className="row chat-mdlMargin">
                                <div className="col-md-4">
                                  <label className="mdl-lbl">Name</label>
                                  <input
                                    type="text"
                                    className="chat-txt1 txt-border"
                                    placeholder="Enter Name"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="mdl-lbl">Mobile</label>
                                  <input
                                    type="text"
                                    className="chat-txt1 txt-border"
                                    placeholder="Enter Mobile No"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="mdl-lbl">Email</label>
                                  <input
                                    type="text"
                                    className="chat-txt1 txt-border"
                                    placeholder="Enter Email Id"
                                  />
                                </div>
                              </div>
                              <div className="row chat-mdlMargin">
                                <div className="col-md-4">
                                  <label className="mdl-lbl">
                                    Date of Birth
                                  </label>
                                  <input
                                    type="text"
                                    className="chat-txt1 txt-border"
                                    placeholder="Enter Date of Birth"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="mdl-lbl">Brand</label>
                                  <select
                                    id="inputStatus"
                                    className="drop-downlist-mdl dropdown-chat"
                                  >
                                    <option>Bata</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label className="mdl-lbl">Category</label>
                                  <select
                                    id="inputStatus"
                                    className="drop-downlist-mdl dropdown-chat"
                                  >
                                    <option>Return</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row chat-mdlMargin">
                                <div className="col-md-4">
                                  <label className="mdl-lbl">
                                    {" "}
                                    Sub Category
                                  </label>
                                  <select
                                    id="inputStatus"
                                    className="drop-downlist-mdl dropdown-chat"
                                  >
                                    <option>Return</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label className="mdl-lbl">Issue Type</label>
                                  <select
                                    id="inputStatus"
                                    className="drop-downlist-mdl dropdown-chat"
                                  >
                                    <option>Return</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label className="mdl-lbl">
                                    Ticket Title
                                  </label>
                                  <input
                                    type="text"
                                    className="chat-txt1 txt-border"
                                    placeholder="Enter Ticket Title"
                                  />
                                </div>
                              </div>
                              <div className="row chat-mdlMargin">
                                <div className="col-md-12">
                                  <label className="mdl-lbl">
                                    Ticket Details
                                  </label>
                                  <textarea
                                    rows="6"
                                    className="text-areaChatModel"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="row chat-mdlMargin chatbtnDiv">
                                <div className="col-md-12">
                                  <a href="#!" className="chatAnchor">
                                    CANCEL
                                  </a>
                                  <button type="button" className="chatbutn-2">
                                    CREATE TICKET
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Modal>
                          <div className="chat-extra-info">
                            <div>
                              <label className="black-clr">Location</label>
                              <p>
                                New Delhi, National Capital Territory of Delhi,
                                India
                              </p>
                            </div>
                            <div>
                              <label className="black-clr">Browser</label>
                              <p>Chrome 09</p>
                            </div>
                            <div>
                              <label className="black-clr">Platform</label>
                              <p>Window 10</p>
                            </div>
                            <div>
                              <label className="black-clr">Device</label>
                              <p>Laptop</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="recent-chat-tab"
                  role="tabpanel"
                  aria-labelledby="recent-chat-tab"
                >
                  <div className="action-part d-flex align-items-center actionright">
                    <input
                      type="text"
                      className="searchtextchat"
                      placeholder="SEARCH"
                    />
                    <img
                      src={SearchBlackImg}
                      alt="Search"
                      className="searchImg-raisechat"
                      onClick={this.handleReactChatModelOpen.bind(this)}
                    />
                    <button className="butn cross">&times;</button>
                  </div>
                  <div className="chatreact">
                    <ReactTable
                      data={datachat}
                      columns={columnschat}
                      // resizable={false}
                      defaultPageSize={6}
                      showPagination={false}
                    />
                  </div>
                  <Drawer
                    className="drawerchat"
                    placement={"bottom"}
                    closable={false}
                    // onClose={this.handleChatDetailModelClose.bind(this)}
                    visible={this.state.ReactChatModel}
                  >
                    <div className="row">
                      <div className="col-md-8">
                        <label className="chaton">
                          Chat on Tuesday,July 30,2019 1:01:32 PM
                        </label>
                        <div className="crossdrawer">
                          <label
                            onClick={this.handleReactChatModelClose.bind(this)}
                          >
                            &times;
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="name-num ml-2">
                          <label className="mohitdrawer">Mohit Verma</label>
                          <p className="num">
                            +91-9873470074 / mohit90@gmail.com
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-md-6 twotho">
                            <label className="twothous">2000</label>
                            <label className="twothoustext">
                              Last Purchase
                            </label>
                          </div>
                          <div className="col-md-6 twotho">
                            <label className="twothous">02</label>
                            <label className="twothoustext">Open Ticket</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatbot;
