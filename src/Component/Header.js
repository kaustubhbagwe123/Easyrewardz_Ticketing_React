import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import DashboardLogo from "./../assets/Images/dashboardBlack.png";
import DashboardLogoBlue from "./../assets/Images/dashboardBlue.png";
import TicketLogo from "./../assets/Images/ticket.png";
import TicketLogoBlue from "./../assets/Images/ticket-blue.png";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import KnowledgeLogoBlue from "./../assets/Images/knowledge-blue.png";
import ChatLogo from "./../assets/Images/chat.png";
import ChatLogoBlue from "./../assets/Images/chat-blue.png";
import NotificationLogo from "./../assets/Images/Notification.png";
import SettingLogo from "./../assets/Images/setting.png";
import SettingLogoBlue from "./../assets/Images/setting-blue.png";
import UserLogo from "./../assets/Images/user-img.jpg";
import StatusLogo from "./../assets/Images/status.png";
import Hamb from "./../assets/Images/hamb.png";
import CancelIcon from "./../assets/Images/cancel.png";
import { Drawer } from "antd";
import HeadPhoneBlue from "./../assets/Images/headphone2.png";
import EasyRewardLogo from "./../assets/Images/logo.jpg";
import AmitSinghLogo from "./../assets/Images/amitsingh.png";
import LogoutImg from "./../assets/Images/logout.png";
import TakeBreak from "./../assets/Images/takebreak.png";
import { Popover } from "antd";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      HeadPhoneOpen: false,
      LoginOpen: false,
      open: false,
      NextButton: false,
      ChatDetailModel: false,
      NextButtonModal: false,
      WaitingCall: false,
      cont: [
        {
          data: "Dashboards",
          urls: "dashboard",
          logoBlack: DashboardLogo,
          logoBlue: DashboardLogoBlue,
          imgAlt: "dashboard icon",
          imgClass: "dashboardImg1",
          activeClass: "active single-menu"
        },
        {
          data: "My Tickets",
          urls: "myTicketlist",
          logoBlack: TicketLogo,
          logoBlue: TicketLogoBlue,
          imgAlt: "ticket icon",
          imgClass: "myTicket",
          activeClass: "single-menu"
        },
        {
          data: "Knowledge Base",
          urls: "knowledgebase",
          logoBlack: KnowledgeLogo,
          logoBlue: KnowledgeLogoBlue,
          imgAlt: "knowledge icon",
          imgClass: "knowledgeNav",
          activeClass: "single-menu"
        }
      ]
    };
  }
  handleNextButtonShow() {
    this.setState({ NextButton: !this.state.NextButton });
  }
  handleWaitingShow() {
    this.setState({ WaitingCall: !this.setState.WaitingCall });
  }
  handleHeadPhoneModalOpen() {
    this.setState({ HeadPhoneOpen: true });
  }
  handleHeadPhoneModalClose() {
    this.setState({ HeadPhoneOpen: false });
  }
  handleLoginModalOpen() {
    this.handleHeadPhoneModalClose();
    this.setState({ LoginOpen: true });
  }
  handleLoginModalClose() {
    this.setState({ LoginOpen: false });
  }
  handleNextBtnModalOpen() {
    this.handleLoginModalClose();
    this.setState({ NextButtonModal: true });
  }
  handleNextBtnModalClose() {
    this.setState({ NextButtonModal: false });
  }
  handleChatDetailModelOpen() {
    this.setState({ ChatDetailModel: true });
  }
  handleChatDetailModelClose() {
    this.setState({ ChatDetailModel: false });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
 
  componentDidMount() {
    let pageName, lastOne, lastValue, arr;
    arr = [...this.state.cont];
    setTimeout(
      function() {
        pageName = window.location.pathname;
        lastOne = pageName.split("/");
        lastValue = lastOne[lastOne.length - 1];
        arr.forEach(i => {
          i.activeClass = "single-menu";
          if (i.urls === lastValue) i.activeClass = "active single-menu";
        });
        this.setState({ cont: arr });
      }.bind(this),
      1
    );
  }

  actives = e => {
    const contDummy = [...this.state.cont];
    contDummy.forEach(i => {
      i.activeClass = "single-menu";
      if (i.data === e.target.textContent) i.activeClass = "active single-menu";
    });
    this.setState({ cont: contDummy });
  };

  render() {
    const TransferCall = (
      <>
        <div>
          <div className="row tooltiptransfercallrow">
            <div className="col-md-8">
              <label className="agentidtext-tooltip">Enter Agent ID</label>
            </div>
          </div>
          <div className="row agenttextrow">
            <div className="col-md-12">
              <input
                type="text"
                className="agenttext-tooltip"
                placeholder="9876543210"
              />
            </div>
          </div>
          <div className="row agenttextrow">
            <div className="col-md-12">
              <button className="loginbtnagent">Connenting</button>
            </div>
          </div>
        </div>
      </>
    );
    return (
      <React.Fragment>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ background: "white" }}
        >
          <div className="d-flex">
            <div className="er">
              <label className="er-label">ER</label>
            </div>
            <div className="hamb-menu">
              <div className="dropdown">
                <img src={Hamb} alt="hamburger icon" data-toggle="dropdown" />
                <ul className="dropdown-menu">
                  <li>
                    <Link to="dashboard">Dashboards</Link>
                  </li>
                  <li>
                    <Link to="myTicketlist">My Tickets</Link>
                  </li>
                  <li>
                    <Link to="knowledgebase">Knowledge Base</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="headers-menu">
              {this.state.cont.map(item => (
                <Link
                  onClick={this.actives}
                  key={item.data}
                  to={item.urls}
                  className={item.activeClass}
                >
                  <div className="header-icons-cntr">
                    <img
                      src={item.logoBlack}
                      alt={item.imgAlt}
                      className={item.imgClass}
                    />
                    <img
                      src={item.logoBlue}
                      alt={item.imgAlt}
                      className={item.imgClass}
                    />
                  </div>
                  {item.data}
                </Link>
              ))}
            </div>
          </div>

          <div className="header-right-icons">
            <a href="#!">
              <img
                src={HeadPhoneBlue}
                alt="logo"
                className="headphoneheader"
                onClick={this.handleHeadPhoneModalOpen.bind(this)}
              />
            </a>
            <Modal
              open={this.state.HeadPhoneOpen}
              onClose={this.handleHeadPhoneModalClose.bind(this)}
              closeIconId="close"
              modalId="HeadPhoneHeader-popup"
              overlayId="logout-ovrly"
            >
              <div className="HeaderheadphoneModal">
                <div className="row logincenter">
                  <div className="col-md-12">
                    <label className="logintoivr">Login to IVR</label>
                  </div>
                </div>
                <div className="row agenttextrow1">
                  <div className="col-md-5">
                    <label className="agentidtext">Agent ID</label>
                  </div>
                </div>
                <div className="row agenttextrow">
                  <div className="col-md-12">
                    <input type="text" className="agenttext" />
                  </div>
                </div>
                <div className="row agenttextrow">
                  <div className="col-md-12">
                    <button
                      className="loginbtnagent"
                      onClick={this.handleLoginModalOpen.bind(this)}
                    >
                      Login
                    </button>
                  </div>
                </div>

                <div className="row logincenterimg">
                  <div className="col-md-12">
                    <span className="poweredby">Powered by</span>
                    <img
                      src={EasyRewardLogo}
                      alt="logo"
                      className="easyrewardlogo"
                    />
                  </div>
                </div>
              </div>
            </Modal>
            <Modal
              open={this.state.LoginOpen}
              onClose={this.handleLoginModalClose.bind(this)}
              closeIconId="close"
              modalId="Login-popup"
              overlayId="logout-ovrly"
            >
              <div className="row logincenterimg">
                <div className="col-md-12">
                  <img
                    src={AmitSinghLogo}
                    alt="logo"
                    className="amitsinghlogo"
                  />
                </div>
              </div>
              <div className="row amitsinghcenter">
                <div className="col-md-12">
                  <label className="amitsinghtext">Amit Singh</label>
                </div>
              </div>
              {/* <div className="row amitsinghcenter">
                <div className="col-md-12">
                <div className="status1">
                  <input type="radio" name="logout-status" id="online" />
                  <label htmlFor="online" className="logout-label" style={{marginRight:"25px"}}>
                    Online
                  </label>
                
                
                  <input type="radio" name="logout-status" id="away" />
                  <label htmlFor="away" className="logout-label">
                    Offline
                  </label>
                </div>
                                
                </div>
              </div>
              <div className="row amitnextrow">
                <div className="col-md-12">
                  <button className="loginbtnagent"
                  onClick={this.handleNextButtonShow.bind(this)}
                  >Next</button>
                </div>
              </div>
              <div className="row amitnextrow">
                  <div className="col-md-12">
                  <img src={LogoutImg} alt="logo" className="logoutImg"/>
                    <span className="logouttamitsingh">Logout</span> 
                  </div>
                </div> */}
              {this.state.NextButton === true ? (
                <div>
                  <div className="row amitsinghcenter1">
                    <div className="col-md-7">
                      <label className="amitsinghtext">Choose Mode:</label>
                    </div>
                  </div>
                  <div className="row amitsinghcenter2">
                    <div className="col-md-12">
                      <div className="status1">
                        <input type="radio" name="logout-status" id="online" />
                        <label
                          htmlFor="online"
                          className="logout-label1"
                          style={{ marginRight: "25px" }}
                        >
                          Preview
                        </label>

                        <input type="radio" name="logout-status" id="away" />
                        <label htmlFor="away" className="logout-label1">
                          progressive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row amitnextrow">
                    <div className="col-md-12">
                      <button
                        className="loginbtnagent"
                        onClick={this.handleNextBtnModalOpen.bind(this)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="row amitnextrow">
                    <div className="col-md-12">
                      <img src={LogoutImg} alt="logo" className="logoutImg" />
                      <span className="logouttamitsingh">Logout</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row amitsinghcenter">
                    <div className="col-md-12">
                      <div className="status1">
                        <input type="radio" name="logout-status" id="online" />
                        <label
                          htmlFor="online"
                          className="logout-label1"
                          style={{ marginRight: "25px" }}
                        >
                          Online
                        </label>

                        <input type="radio" name="logout-status" id="away" />
                        <label htmlFor="away" className="logout-label1">
                          Offline
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row amitnextrow">
                    <div className="col-md-12">
                      <button
                        className="loginbtnagent"
                        onClick={this.handleNextButtonShow.bind(this)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="row amitnextrow">
                    <div className="col-md-12">
                      <img src={LogoutImg} alt="logo" className="logoutImg" />
                      <span className="logouttamitsingh">Logout</span>
                    </div>
                  </div>
                </div>
              )}
            </Modal>

            <Modal
              open={this.state.NextButtonModal}
              onClose={this.handleNextBtnModalClose.bind(this)}
              closeIconId="close"
              modalId="NextButton-popup"
              overlayId="logout-ovrly"
            >
              <div className="row logincenterimg">
                <div className="col-md-12">
                  <img
                    src={AmitSinghLogo}
                    alt="logo"
                    className="amitsinghlogo"
                  />
                </div>
              </div>
              <div className="row amitsinghcenter">
                <div className="col-md-12">
                  <label className="amitsinghtext">Amit Singh</label>
                </div>
              </div>

              {this.state.WaitingCall === true ? (
                <div>
                  <div className="row amitsinghcallrow">
                    <div className="row incomingcallrow">
                      <div className="col-md-12">
                        <label className="incomingcalltext">
                          Incoming Call:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="amitsinghwaiting"
                        placeholder="9876543210"
                        onClick={this.handleWaitingShow.bind(this)}
                      />
                    </div>
                  </div>

                  <div className="row amitnextbuttonrow">
                    <div className="col-md-12">
                      <button className="holdbtn">Hold</button>
                    </div>
                  </div>
                  <div className="row amitnextbuttonrow3">
                    <div className="col-md-12">
                      <Popover
                        content={TransferCall}
                        placement="bottom"
                        trigger="click"
                      >
                        <button className="tranferbtn">Transfer Call</button>
                      </Popover>
                      {/* <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="transfercallto"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <div className="row tooltiptransfercallrow">
                              <div className="col-md-8">
                                <label className="agentidtext">
                                  Enter Agent ID
                                </label>
                              </div>
                            </div>
                            <div className="row agenttextrow">
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  className="agenttext"
                                  placeholder="9876543210"
                                />
                              </div>
                            </div>
                            <div className="row agenttextrow">
                              <div className="col-md-12">
                                <button className="loginbtnagent">
                                  Connenting
                                </button>
                              </div>
                            </div>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover> */}
                    </div>
                  </div>

                  <div className="row amitnextbuttonrow3">
                    <div className="col-md-12">
                      <button className="CallwrapBtnwaiting">Call Wrap</button>
                    </div>
                  </div>
                  <div className="row amitnextbuttonrow1">
                    <div className="col-md-12">
                      <button className="CallwrapBtnwaiting">
                        Switch to progressive
                      </button>
                    </div>
                  </div>
                  <div className="row amitnextrow">
                    <div className="col-md-12">
                      <div className="takeabreak">
                        <img src={TakeBreak} alt="logo" className="logoutImg" />
                        <span className="takebreaktext">Take a Breake</span>
                      </div>
                    </div>
                  </div>

                  <div className="row backtohomelogoutrow">
                    <div className="col-md-12">
                      <img src={LogoutImg} alt="logo" className="logoutImg" />
                      <span className="logoutbacktohome">Logout</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row amitsinghcallrow">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="amitsinghwaiting"
                        placeholder="Waiting for incoming call"
                        onClick={this.handleWaitingShow.bind(this)}
                      />
                      <div className="row">
                        <div className="col-md-8">
                          <label className="idletimeamit">
                            Idle Time: 02:24
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row amitnextbuttonrow">
                    <div className="col-md-12">
                      <button className="CallwrapBtn">Call Wrap</button>
                    </div>
                  </div>
                  <div className="row amitnextbuttonrow1">
                    <div className="col-md-12">
                      <button className="SwitchToProgBtn">
                        Switch to progressive
                      </button>
                    </div>
                  </div>
                  <div className="row amitnextrow">
                    <div className="col-md-12">
                      <div className="takeabreak">
                        <img src={TakeBreak} alt="logo" className="logoutImg" />
                        <span className="takebreaktext">Take a Breake</span>
                      </div>
                    </div>
                  </div>

                  <div className="row backtohomelogoutrow">
                    <div className="col-md-12">
                      <img src={LogoutImg} alt="logo" className="logoutImg" />
                      <span className="logoutbacktohome">Logout</span>
                    </div>
                  </div>

                  <div className="row backtohomerow">
                    <div className="col-md-12">
                      <a href="#!" className="backtohometext">
                        >>Back to Home
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Modal>

            <a href="#!">
              <img
                src={ChatLogo}
                alt="logo"
                className="chatImg"
                onClick={this.handleChatDetailModelOpen.bind(this)}
              />
              <img
                src={ChatLogoBlue}
                alt="logo"
                className="chatImg"
                style={{ display: "none" }}
              />
            </a>
            <div className="chatdrawermodel">
              <Drawer
                className="claimTab-drawerModal chatdrawer"
                placement={"left"}
                closable={false}
                onClose={this.handleChatDetailModelClose.bind(this)}
                visible={this.state.ChatDetailModel}
              >
                <div className="row">
                  <div className="col-lg-12 p-0">
                    <div className="chatbot-left">
                      <div className="chatpadding">
                        <label className="ongoing">Ongoing Chats (03)</label>
                        <img
                          src={CancelIcon}
                          alt="cancel-icone"
                          className="cancelbtn-chat"
                          onClick={this.handleChatDetailModelClose.bind(this)}
                        />
                        <div className="chatleftdrawer">
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
                          <Link to="/admin/chatbot">
                            <div className="chat-info active">
                              <div className="d-flex align-items-center">
                                <span className="light-blue-ini initial">
                                  M
                                </span>
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
                          </Link>
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
                      <div className="chatpadding">
                        <label
                          className="ongoing"
                          style={{ marginTop: "20px" }}
                        >
                          New Chats (02)
                        </label>
                        <div className="chatleftdrawer">
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
                    <button className="butn-inv hist-btn">
                      My historical chat
                    </button>
                  </div>
                </div>
              </Drawer>
            </div>

            <a href="#!">
              <img
                src={NotificationLogo}
                alt="logo"
                className="notifi"
                onClick={this.openModal}
              />
              <span style={{ display: "none" }} className="icon-fullname">
                Notifications
              </span>
            </a>
            <Link to="settings">
              <img src={SettingLogo} alt="logo" className="setting" />
              <img
                src={SettingLogoBlue}
                alt="logo"
                className="setting"
                style={{ display: "none" }}
              />
              <span style={{ display: "none" }} className="icon-fullname">
                Settings
              </span>
            </Link>
            <a href="#!" className="bitmap5" onClick={this.onOpenModal}>
              NR
            </a>
          </div>
        </div>

        <Modal
          onClose={this.closeModal}
          open={this.state.modalIsOpen}
          modalId="Notification-popup"
          overlayId="logout-ovrly"
        >
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>
                <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                  New Tickets
                </span>{" "}
                assigned to you
              </label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}">
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </a>
            </div>
          </div>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>
                <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                  Update
                </span>{" "}
                happened to your tickets
              </label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}">
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </a>
            </div>
          </div>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>
                <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                  Escalation
                </span>{" "}
                in your ticket
              </label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}">
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </a>
            </div>
          </div>
        </Modal>
        <div>
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            center
            modalId="logout-popup"
            overlayId="logout-ovrly"
          >
            <div className="logout-block">
              <div>
                <div className="user-img">
                  <img src={UserLogo} alt="User" />
                </div>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    Naman Rampal
                  </p>
                  <p className="mail-id">naman@fabindia.com</p>
                </div>
                <Link to="/">
                  <button className="logout">LOGOUT</button>
                </Link>
              </div>
              <div className="status-sctn alignradio">
                <div className="d-flex align-items-center">
                  <div className="logout-status" style={{ marginTop: "10px" }}>
                    <img src={StatusLogo} alt="status" />
                  </div>
                  <p className="logout-label chat-status">CHAT STATUS :</p>
                </div>
                <div className="status-options">
                  <input type="radio" name="logout-status" id="online" />
                  <label htmlFor="online" className="logout-label">
                    Online
                  </label>
                </div>
                <div className="status-options">
                  <input type="radio" name="logout-status" id="away" />
                  <label htmlFor="away" className="logout-label">
                    Away
                  </label>
                </div>
                <div className="status-options">
                  <input type="radio" name="logout-status" id="offline" />
                  <label htmlFor="offline" className="logout-label">
                    Offline
                  </label>
                </div>
              </div>
              <div className="d-block">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="logout-label">Login Time</p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: "16px" }}
                    >
                      9:30 AM
                    </p>
                  </div>
                  <div>
                    <p className="logout-label">Logout Time</p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: "16px", float: "right" }}
                    >
                      6:30 PM
                    </p>
                  </div>
                </div>
                <ProgressBar className="logout-progress" now={60} />
                <p className="logout-label font-weight-bold prog-indi">
                  5H 23M
                </p>
              </div>
              <div>
                <div>
                  <p className="logout-label">SLA SCORE</p>
                  <p className="font-weight-bold">60%</p>
                </div>
                <div>
                  <p className="logout-label">Avg Response time</p>
                  <p className="font-weight-bold">1 Hr</p>
                </div>
                <div>
                  <p className="logout-label">CSAT SCORE</p>
                  <p className="font-weight-bold">90%</p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
