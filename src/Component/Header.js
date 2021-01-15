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
import StatusLogo from "./../assets/Images/status.png";
import Hamb from "./../assets/Images/hamb.png";
import HeadPhoneBlue from "./../assets/Images/headphone2.png";
import { Popover } from "antd";
import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";
import axios from "axios";
import PencilImg from "./../assets/Images/pencil.png";
import { transferData } from "./../helpers/transferData";
import * as translationHI from "../translations/hindi";
import * as translationMA from "../translations/marathi";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      ViewTicketModal: false,
      Email: "",
      UserName: "",
      LoginTime: "",
      LoggedInDuration: "",
      SLAScore: "",
      CSatScore: "",
      AvgResponse: "",
      LogoutTime: "",
      NameTag: "",
      open: false,
      NextButton: false,
      WaitingCall: false,
      userProfile: "",
      notifiMessages: [],
      NotifiTicketIds: [],
      percentLog: 0,
      workTime: 0,
      ticketDetailID: 0,
      workTimeHours: "0H 0M",
      selectedUserProfilePicture: "",
      notificationAccess: "none",
      settingAccess: "none",
      cont: [],
      reportAccess: "none",
      translateLanguage: {},
    };
    this.handleLoggedInUserDetails = this.handleLoggedInUserDetails.bind(this);
    this.handleGetNotificationList = this.handleGetNotificationList.bind(this);
    this.handleGetUserProfileData = this.handleGetUserProfileData.bind(this);
    this.handleCRMRole = this.handleCRMRole.bind(this);
    this.setAccessUser = this.setAccessUser.bind(this);
  }

  componentDidMount() {
    this.subscription = transferData.getProfilePic().subscribe((pic) => {
      if (pic.profilePic) {
        if (pic.profilePic === "") {
          this.setState({ selectedUserProfilePicture: "" });
        } else if (pic.profilePic.length > 0) {
          this.setState({ selectedUserProfilePicture: pic.profilePic });
        }
      } else if (pic.profilePic === "") {
        this.setState({ selectedUserProfilePicture: "" });
      }
    });
    var _token = window.localStorage.getItem("token");
    if (_token === null) {
      window.location.href = "/";
    } else {
      this.handleGetUserProfileData();
      this.handleLoggedInUserDetails();

      let pageName, lastOne, lastValue, arr;
      arr = [...this.state.cont];
      setTimeout(
        function() {
          pageName = window.location.pathname;
          lastOne = pageName.split("/");
          lastValue = lastOne[lastOne.length - 1];
          arr.forEach((i) => {
            i.activeClass = "single-menu";
            if (i.urls === lastValue) i.activeClass = "active single-menu";
          });
          this.setState({ cont: arr });
        }.bind(this),
        1
      );
      this.handleGetNotificationList();
    }

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  handleNextButtonShow() {
    this.setState({ NextButton: !this.state.NextButton });
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
  handleViewTicketModalOpen(data) {
    var Ticket_Ids = data.ticketIDs;
    var Ids = Ticket_Ids.split(",");

    this.setState({
      // ViewTicketModal: true,
      NotifiTicketIds: Ids,
    });
  }
  handleViewTicketModalClose = () => {
    this.setState({
      ViewTicketModal: false,
    });
  };

  onViewTicket = (notiIds, isFollowUp) => {
    this.setState({ modalIsOpen: false });
    if (notiIds !== "") {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Notification/ReadNotification",
        headers: authHeader(),
        params: {
          TicketID: notiIds,
          IsFollowUp: isFollowUp,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetNotificationList();
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };

  handleGetUserProfileData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.message;
        if (status === "Success") {
          var id = res.data.responseData[0].userId;
          var userdata = res.data.responseData[0].profilePicture;
          var image = userdata.split("/");
          if (image[image.length - 1] == "") {
            self.setState({
              selectedUserProfilePicture: "",
            });
          } else {
            self.setState({
              selectedUserProfilePicture: userdata,
            });
          }
          self.handleCRMRole(id);
        } else {
          self.setState({
            selectedUserProfilePicture: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCRMRole(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetRolesByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let msg = res.data.message;
        let data = res.data.responseData.modules;
        if (msg === "Success") {
          self.setAccessUser(data);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setAccessUser(data) {
    const TranslationContext = this.state.translateLanguage.default;
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var accessdata = [];
    var dashboard = {
      data:
        TranslationContext !== undefined
          ? TranslationContext.nav.dashboard
          : "Dashboards",
      urls: "dashboard",
      logoBlack: DashboardLogo,
      logoBlue: DashboardLogoBlue,
      imgAlt: "dashboard icon",
      imgClass: "dashboardImg1",
      activeClass: page === "dashboard" ? "active single-menu" : "single-menu",
    };
    var myticket = {
      data:
        TranslationContext !== undefined
          ? TranslationContext.nav.myticket
          : "My Tickets",
      urls: "myTicketlist",
      logoBlack: TicketLogo,
      logoBlue: TicketLogoBlue,
      imgAlt: "ticket icon",
      imgClass: "myTicket",
      activeClass:
        page === "myTicketlist" ? "active single-menu" : "single-menu",
    };
    var knowledgebase = {
      data:
        TranslationContext !== undefined
          ? TranslationContext.nav.knowledge
          : "Knowledge Base",
      urls: "knowledgebase",
      logoBlack: KnowledgeLogo,
      logoBlue: KnowledgeLogoBlue,
      imgAlt: "knowledge icon",
      imgClass: "knowledgeNav",
      activeClass:
        page === "knowledgebase" ? "active single-menu" : "single-menu",
    };
    if (data !== null) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].moduleName === "Dashboard" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(dashboard);
        } else if (
          data[i].moduleName === "Tickets" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(myticket);
        } else if (
          data[i].moduleName === "Knowledge Base" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(knowledgebase);
        } else if (
          data[i].moduleName === "Settings" &&
          data[i].modulestatus === true
        ) {
          this.setState({
            settingAccess: "block",
          });
        } else if (
          data[i].moduleName === "Notification" &&
          data[i].modulestatus === true
        ) {
          this.setState({
            notificationAccess: "block",
          });
        } else if (
          data[i].moduleName === "Reports" &&
          data[i].modulestatus === true
        ) {
          this.setState({
            reportAccess: "block",
          });
        }
      }
    }
    this.setState({
      cont: accessdata,
    });
  }

  handleLogoutMethod() {
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Account/Logout",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.status;
        // var Msg=res.data.message
        if (status === true) {
          //NotificationManager.success(Msg);
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleLoggedInUserDetails = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/LoggedInAccountDetails",
      headers: authHeader(),
    })
      .then(function(res) {
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
          let deno =
            data.shiftDurationInHour * 60 + data.shiftDurationInMinutes;
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
            workTimeHours: data.totalWorkingTime,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  actives = (e) => {
    const contDummy = [...this.state.cont];
    contDummy.forEach((i) => {
      i.activeClass = "single-menu";
      if (i.data === e.target.textContent) i.activeClass = "active single-menu";
    });
    this.setState({ cont: contDummy });
  };

  handleGetNotificationList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Notification/GetNotifications",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;

        if (status === "Success") {
          let data = res.data.responseData.ticketNotification;
          let count = res.data.responseData.notiCount;

          self.setState({
            notifiMessages: data,
            notiCount: count,
          });
        } else {
          self.setState({
            notifiMessages: [],
            notiCount: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleShowTicket(Ids, isFollowUp) {
    this.closeModal();
    this.onViewTicket(Ids, isFollowUp);
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <React.Fragment>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ background: "white" }}
        >
          <input type="hidden" value={this.state.reportAccess} id="isReport" />
          <div className="d-flex">
            <div className="er">
              <label className="er-label">
                {TranslationContext !== undefined
                  ? TranslationContext.label.er
                  : "ER"}
              </label>
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
              {this.state.cont.map((item) => (
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
                // onClick={this.handleHeadPhoneModalOpen.bind(this)}
              />
            </a>

            <a href="#!" className="d-none">
              <img
                src={ChatLogo}
                alt="logo"
                className="chatImg"
                // onClick={this.handleChatDetailModelOpen.bind(this)}
              />
              <img
                src={ChatLogoBlue}
                alt="logo"
                className="chatImg"
                style={{ display: "none" }}
              />
            </a>
            <a href="#!" style={{ display: this.state.notificationAccess }}>
              <div className="position-relative" onClick={this.openModal}>
                <img src={NotificationLogo} alt="logo" className="notifi" />
                {this.state.notiCount > 0 && (
                  <span className="upper-noti-count">
                    {this.state.notiCount}
                  </span>
                )}
              </div>
              <span style={{ display: "none" }} className="icon-fullname">
                Notifications
              </span>
            </a>
            <Link to="settings" style={{ display: this.state.settingAccess }}>
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
          <div className="notifi-container">
            {this.state.notiCount === 0 && (
              <p className="m-0 p-2">
                {TranslationContext !== undefined
                  ? TranslationContext.ticketingDashboard
                      .therearenonotifications
                  : "There are no notifications."}
              </p>
            )}
            {this.state.notifiMessages.map((item, i) => {
              return (
                <div className="row rowpadding" key={i}>
                  <div className="md-2 rectangle-2 lable05 noti-count">
                    <label className="labledata">{item.ticketCount}</label>
                  </div>
                  <div className="md-6 new-tickets-assigned tic-noti">
                    <label>
                      <span>{item.notificationMessage}</span>
                    </label>
                  </div>
                  <div className="viewticketspeadding">
                    <Popover
                      content={
                        <div className="notification-popover">
                          {this.state.NotifiTicketIds.map((data, j) => {
                            return (
                              <p key={j}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                      .ticketno
                                  : "Ticket No."}
                                :
                                <Link
                                  to={{
                                    pathname: "myticket",
                                    ticketDetailID: data,
                                  }}
                                  onClick={this.handleShowTicket.bind(
                                    this,
                                    data,
                                    item.isFollowUp
                                  )}
                                >
                                  {data}
                                </Link>
                              </p>
                            );
                          })}
                        </div>
                      }
                      placement="bottom"
                      trigger="click"
                    >
                      <div
                        className={
                          item.ticketIDs !== ""
                            ? "md-4 view-tickets"
                            : "text-disabled"
                        }
                        onClick={this.handleViewTicketModalOpen.bind(
                          this,
                          item
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.div.viewtickets
                          : "VIEW TICKETS"}
                      </div>
                    </Popover>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
        <Modal
          onClose={this.handleViewTicketModalClose}
          open={this.state.ViewTicketModal}
          modalId="Notification-popup"
          overlayId="logout-ovrly"
        >
          {this.state.NotifiTicketIds.map((data, j) => {
            return (
              <a
                href="#!"
                style={{ wordWrap: "break-word" }}
                key={j}
                onClick={this.handleShowTicket.bind(this)}
              >
                {data + ", "}
              </a>
            );
          })}
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
                      src={
                        this.state.selectedUserProfilePicture.length > 0
                          ? this.state.selectedUserProfilePicture
                          : ProfileImg
                      }
                      //this.state.userProfile === "user-img.jpg"
                      // ? require("./../assets/Images/user-img.jpg")
                      // : require("./../assets/Images/defaultUser.png")
                      //}
                      alt="User"
                      style={{ width: "90px" }}
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
                    {TranslationContext !== undefined
                      ? TranslationContext.span.logout
                      : "LOGOUT"}
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
                    <p className="logout-label">
                      {TranslationContext !== undefined
                        ? TranslationContext.p.logintime
                        : "Login Time"}
                    </p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: "16px" }}
                    >
                      {/* 9:30 AM */}
                      {this.state.LoginTime}
                    </p>
                  </div>
                  <div>
                    <p className="logout-label">
                      {TranslationContext !== undefined
                        ? TranslationContext.p.logouttime
                        : "Logout Time"}
                    </p>
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
                  style={{
                    width: this.state.workTime + "%",
                    textTransform: "uppercase",
                  }}
                >
                  {this.state.workTimeHours}
                </p>
              </div>
              <div>
                <div>
                  <p className="logout-label">
                    {TranslationContext !== undefined
                      ? TranslationContext.p.slascore
                      : "SLA SCORE"}
                  </p>
                  <p className="font-weight-bold">{this.state.SLAScore}</p>
                </div>
                {/* <div>
                  <p className="logout-label">CSAT SCORE</p>
                  <p className="font-weight-bold">{this.state.CSatScore}</p>
                </div> */}
                <div>
                  <p className="logout-label">
                    {TranslationContext !== undefined
                      ? TranslationContext.p.avgresponsetime
                      : "Avg Response time"}
                  </p>
                  <p className="font-weight-bold">{this.state.AvgResponse}</p>
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
