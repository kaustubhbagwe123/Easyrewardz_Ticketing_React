import React, { Component } from "react";
import ProfileImg from "./../assets/Images/UserIcon.png";
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
import DefaultUser from "./../assets/Images/defaultUser.png";
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
import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";
import axios from "axios";
import PencilImg from "./../assets/Images/pencil.png";
// import Demo from "../store/Hashtag";
// import {
//   NotificationContainer,
//   NotificationManager
// } from "react-notifications";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      Email: "",
      UserName: "",
      LoginTime: "",
      LoggedInDuration: "",
      SLAScore: "",
      CSatScore: "",
      AvgResponse: "",
      LogoutTime: "",
      NameTag: "",
      HeadPhoneOpen: false,
      LoginOpen: false,
      open: false,
      NextButton: false,
      ChatDetailModel: false,
      NextButtonModal: false,
      WaitingCall: false,
      userProfile: "",
      notifiCount1: 0,
      notifiCount2: 0,
      notifiCount3: 0,
      notifiMsg1: "",
      notifiMsg2: "",
      notifiMsg3: "",
      notifiTktIds1: "",
      notifiTktIds2: "",
      notifiTktIds3: "",
      percentLog: 0,
      workTime: 0,
      workTimeHours: '0H 0M',
      selectedUserProfilePicture:"",
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
    this.handleLoggedInUserDetails = this.handleLoggedInUserDetails.bind(this);
    this.handleGetNotificationList = this.handleGetNotificationList.bind(this);
    this.handleGetUserProfileData=this.handleGetUserProfileData.bind(this);
   
  }

  componentDidMount() {
    debugger;
    this.handleLoggedInUserDetails();
    this.handleGetUserProfileData();
    let pageName, lastOne, lastValue, arr;
    arr = [...this.state.cont];
    setTimeout(
      function () {
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
    this.handleGetNotificationList();
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
  
  onViewTicket = (notiIds) => {
    debugger;
    this.setState({ modalIsOpen: false });
    if (notiIds !== "") {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Notification/ReadNotification",
        headers: authHeader(),
        params: {
          TicketIDS: notiIds
        }
      }).then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetNotificationList();
        }
      });
    }
  };
 
  handleGetUserProfileData() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader()
     
    }).then(function (res) {
      debugger;
      var status = res.data.message;
      var userdata = res.data.responseData[0].profilePicture;
      if (status === "Success") {
        self.setState({
          selectedUserProfilePicture: userdata
        });
      
      } else {
        self.setState({
          selectedUserProfilePicture: ""
        });
      }

    });
  }
  
  handleLogoutMethod() {
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Account/Logout",
      headers: authHeader()
    }).then(function (res) {
      //debugger;
      var status = res.data.status;
      // var Msg=res.data.message
      if (status === true) {
        //NotificationManager.success(Msg);
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  handleLoggedInUserDetails = () => {
    //debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/LoggedInAccountDetails",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      var data = res.data.responseData;
      var status = res.data.message;
      if (status === "Success") {
        var strTag = data.agentName.split(" ");
        var nameTag = strTag[0].charAt(0).toUpperCase();
        if (strTag.length > 0) {
          nameTag += strTag[1].charAt(0).toUpperCase();
        }
        let nume =
          data.loggedInDurationInHours * 60 + data.loggedInDurationInMinutes;
        let deno = data.shiftDurationInHour * 60 + data.shiftDurationInMinutes;
        let percentLog = ((nume / deno) * 100).toFixed(2);
        var profile = data.profilePicture;
        var finalPath = profile.substring(
          profile.lastIndexOf("\\") + 1,
          profile.length
        );
        self.setState({
          Email: data.agentEmailId,
          UserName: data.agentName,
          LoginTime: data.loginTime,
          LoggedInDuration: data.loggedInDuration,
          SLAScore: data.slaScore,
          CSatScore: data.csatScore,
          AvgResponse: data.avgResponseTime,
          LogoutTime: data.logoutTime,
          NameTag: nameTag,
          userProfile: finalPath,
          percentLog,
          workTime: data.workTimeInPercentage,
          workTimeHours: data.totalWorkingTime
        });
      }
    });
  };

  actives = e => {
    const contDummy = [...this.state.cont];
    contDummy.forEach(i => {
      i.activeClass = "single-menu";
      if (i.data === e.target.textContent) i.activeClass = "active single-menu";
    });
    this.setState({ cont: contDummy });
  };

  handleGetNotificationList() {
    //debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Notification/GetNotifications",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        debugger;
        let Count1 = res.data.responseData.ticketNotification[0].ticketCount;
        let Count2 = res.data.responseData.ticketNotification[1].ticketCount;
        let Count3 = res.data.responseData.ticketNotification[2].ticketCount;
        let Msg1 = res.data.responseData.ticketNotification[0].notificationMessage;
        let Msg2 = res.data.responseData.ticketNotification[1].notificationMessage;
        let Msg3 = res.data.responseData.ticketNotification[2].notificationMessage;
        let TktIds1 = res.data.responseData.ticketNotification[0].ticketIDs;
        let TktIds2 = res.data.responseData.ticketNotification[1].ticketIDs;
        let TktIds3 = res.data.responseData.ticketNotification[2].ticketIDs;
        let notiCount = res.data.responseData.notiCount;

        self.setState({
          notifiCount1: Count1,
          notifiCount2: Count2,
          notifiCount3: Count3,
          notifiMsg1: Msg1,
          notifiMsg2: Msg2,
          notifiMsg3: Msg3,
          notifiTktIds1: TktIds1,
          notifiTktIds2: TktIds2,
          notifiTktIds3: TktIds3,
          notiCount
        });
      } else {
        debugger
        self.setState({
          notifiCount1: "",
          notifiCount2: "",
          notifiCount3: "",
          notifiMsg1: "",
          notifiMsg2: "",
          notifiMsg3: "",
          notifiTktIds1: "",
          notifiTktIds2: "",
          notifiTktIds3: ""
        });
      }
    });
  }

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
            <a href="#!" className="d-none">
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

            <a href="#!" className="d-none">
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
              <div className="position-relative" onClick={this.openModal}>
                <img
                  src={NotificationLogo}
                  alt="logo"
                  className="notifi"

                />
                {this.state.notiCount > 0 && <span className="upper-noti-count">{this.state.notiCount}</span>}
              </div>
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
              {this.state.NameTag}
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
            <div className="md-2 rectangle-2 lable05 noti-count">
              <label className="labledata">{this.state.notifiCount1}</label>
            </div>
            <div className="md-6 new-tickets-assigned tic-noti">
              <label>
                <span>
                  {this.state.notifiMsg1}
                </span>
              </label>
            </div>
            <div className="viewticketspeadding">
              <Link to={{
                pathname: 'myTicketlist',
                state: {
                  isType: 'New'
                }
              }} 
              onClick={() => this.onViewTicket(this.state.notifiTktIds1)}
              >
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </Link>
            </div>
          </div>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05 noti-count">
              <label className="labledata">{this.state.notifiCount2}</label>
            </div>
            <div className="md-6 new-tickets-assigned tic-noti">
              <label>
                <span>
                  {this.state.notifiMsg2}
                </span>
              </label>
            </div>
            <div className="viewticketspeadding">
              <Link to={{
                pathname: 'myTicketlist',
                state: {
                  isType: 'Open'
                }
              }} onClick={() => this.onViewTicket(this.state.notifiTktIds2)}>
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </Link>
            </div>
          </div>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05 noti-count">
              <label className="labledata">{this.state.notifiCount3}</label>
            </div>
            <div className="md-6 new-tickets-assigned tic-noti">
              <label>
                <span>
                  {this.state.notifiMsg3}
                </span>
              </label>
            </div>
            <div className="viewticketspeadding">
              <Link
              to={{
                pathname: 'myTicketlist',
                state: {
                  isType: 'Escalation'
                }
              }}
              onClick={() => this.onViewTicket(this.state.notifiTktIds3)}>
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </Link>
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
                <Link to="userprofile">
                  <img
                    src={this.state.selectedUserProfilePicture==="https://localhost:44357/Resources/Images/"&&"https://erbelltkt.dcdev.brainvire.net/Resources/Images/"?ProfileImg:this.state.selectedUserProfilePicture}
                      //this.state.userProfile === "user-img.jpg"
                       // ? require("./../assets/Images/user-img.jpg")
                       // : require("./../assets/Images/defaultUser.png")
                    //}
                    alt="User"
                    style={{ width: '90px' }}
                    title="Edit Profile"
                    onClick={this.onCloseModal.bind(this)}
                  />
                  </Link>
                </div>
                <div className="logout-flex">
                  <div>
                  
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>
                      {this.state.UserName}
                      &nbsp;
                      <Link to="userprofile">
                      <img
                              src={PencilImg}
                              alt="Pencile"
                              className="pencilImg"
                              title="Edit Profile"
                              onClick={this.onCloseModal.bind(this)}
                            />
                             </Link>
                    </p>
                   
                    
                  
                    <p className="mail-id">{this.state.Email}</p>
                  </div>
                  <button
                    type="button"
                    className="logout"
                    onClick={this.handleLogoutMethod.bind(this)}
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
              <div className="status-sctn alignradio d-none">
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
                      {/* 9:30 AM */}
                      {this.state.LoginTime}
                    </p>
                  </div>
                  <div>
                    <p className="logout-label">Logout Time</p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: "16px", float: "right" }}
                    >
                      {this.state.LogoutTime}
                    </p>
                  </div>
                </div>
                <ProgressBar
                  className="logout-progress"
                  // now={this.state.percentLog}
                  now={this.state.workTime}
                />
                <p
                  className="logout-label font-weight-bold prog-indi"
                  style={{ width: this.state.workTime + "%", textTransform: 'uppercase' }}
                >
                  {this.state.workTimeHours}
                </p>
              </div>
              <div>
                <div>
                  <p className="logout-label">SLA SCORE</p>
                  <p className="font-weight-bold">{this.state.SLAScore}</p>
                </div>
                {/* <div>
                  <p className="logout-label">CSAT SCORE</p>
                  <p className="font-weight-bold">{this.state.CSatScore}</p>
                </div> */}
                <div>
                  <p className="logout-label">Avg Response time</p>
                  <p className="font-weight-bold">{this.state.AvgResponse}</p>
                </div>
               
              </div>
            </div>
          </Modal>
          {/* <NotificationContainer /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
