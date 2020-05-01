import React, { Component } from "react";
import DashboardLogo from "./../../assets/Images/store-black.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import ChatLogo from "./../../assets/Images/chat.png";
import NotificationLogo from "./../../assets/Images/Notification.png";
import SettingLogo from "./../../assets/Images/setting.png";
import Hamb from "./../../assets/Images/hamb.png";
import Assign from "./../../assets/Images/assign.png";
import ClaimLogo from "./../../assets/Images/icon9.svg";
import DashboardLogoBlue from "./../../assets/Images/storeBlue.png";
import CampaignLogo from "./../../assets/Images/campaign.svg";
import CampaignLogoBlue from "./../../assets/Images/campaign.svg";
import SettingLogoBlue from "./../../assets/Images/setting-blue.png";
import ClaimLogoBlue from "./../../assets/Images/claim-blue.png";
// import CalendarLogoBlue from "./../../assets/Images/calendar-blue.png";
import StatusLogo from "./../../assets/Images/status.png";
import TicketLogoBlue from "./../../assets/Images/ticket-blue.png";
import SendUp from "./../../assets/Images/send-up.png";
import DummyFace1 from "./../../assets/Images/dummy-face-1.png";
import DummyFace2 from "./../../assets/Images/dummy-face-2.png";
import ChatLogoBlue from "./../../assets/Images/chat-blue.png";
import BackArrow from "./../../assets/Images/blue-top-arrow-blue.png";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authHeader } from "../../helpers/authHeader";
import PencilImg from "./../../assets/Images/pencil.png";
import ProfileImg from "./../../assets/Images/UserIcon.png";
import config from "../../helpers/config";
import axios from "axios";
import { Popover } from "antd";
import { ProgressBar } from "react-bootstrap";
import { transferData } from "./../../helpers/transferData";
import "./../../assets/css/store-chat.css";
import CKEditor from "ckeditor4-react";
import SearchBlueImg from "./../../assets/Images/search-blue.png";
import Bata from "./../../assets/Images/Bata2.jpg";
import DownArrow from "./../../assets/Images/down.png";
import RightBlue from "./../../assets/Images/rightblue.png";
import CardTick from "./../../assets/Images/card-tick.png";
import UpBlue from "./../../assets/Images/new-Up.png";
import DownBlue from "./../../assets/Images/new-Down.png";
import CircleRight from "./../../assets/Images/circle-right.png";
import ReactHtmlParser from "react-html-parser";
import { Tooltip } from "antd";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      open: false,
      notificationModal: false,
      notificationCount: 0,
      notificationData: [],
      TaskID: 0,
      Email: "",
      UserName: "",
      LoginTime: "",
      LoggedInDuration: "",
      SLAScore: "",
      CSatScore: "",
      AvgResponse: "",
      LogoutTime: "",
      NameTag: "",
      userProfile: "",
      percentLog: 0,
      workTime: 0,
      workTimeHours: "0H 0M",
      selectedUserProfilePicture: "",
      cont: [],
      chatModal: false,
      ongoingChatsData: [],
      newChatsData: [],
      searchCardData: [
        {
          id: 1,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 2,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 3,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 4,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 5,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 6,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 7,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 8,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 9,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
        {
          id: 10,
          productName: "POWER Black Casual Shoes For Man",
          productCode: "F808600200",
          productPrize: "INR 3000/- INR 2799/- (-%30)",
          productUrl: "www.google.com/productid-F808600200",
          productImgURL: Bata,
          isSelect: false,
        },
      ],
      chatId: 0,
      isDownbtn: true,
      customerName: "",
      messageData: [],
      message: "",
      chatMessageCount: 0,
      activeTab: 1,
      cardModal: false,
    };
    this.handleNotificationModalClose = this.handleNotificationModalClose.bind(
      this
    );
    this.handleNotificationModalOpen = this.handleNotificationModalOpen.bind(
      this
    );
    this.handleLoggedInUserDetails = this.handleLoggedInUserDetails.bind(this);
    this.handleGetUserProfileData = this.handleGetUserProfileData.bind(this);
    this.handleCRMRole = this.handleCRMRole.bind(this);
    this.setAccessUser = this.setAccessUser.bind(this);
    this.handleChatModalClose = this.handleChatModalClose.bind(this);
    this.handleChatModalOpen = this.handleChatModalOpen.bind(this);
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
      this.handleGetNotigfication();
      this.handleGetChatNotificationCount();
    }
  }

  setAccessUser(data) {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var accessdata = [];
    var dashboard = {
      data: "Dashboards",
      urls: "storedashboard",
      logoBlack: DashboardLogo,
      logoBlue: DashboardLogoBlue,
      imgAlt: "dashboard icon",
      imgClass: "dashboardImg1",
      activeClass:
        page === "storedashboard" ? "active single-menu" : "single-menu",
    };
    var task = {
      data: "Task",
      urls: "StoreTask",
      logoBlack: TicketLogo,
      logoBlue: TicketLogoBlue,
      imgAlt: "ticket icon",
      imgClass: "myTicket",
      activeClass: page === "StoreTask" ? "active single-menu" : "single-menu",
    };
    var claim = {
      data: "Claim",
      urls: "claim",
      logoBlack: ClaimLogo,
      logoBlue: ClaimLogoBlue,
      imgAlt: "claim icon",
      imgClass: "claim-logo",
      activeClass: page === "claim" ? "active single-menu" : "single-menu",
    };
    var campaign = {
      data: "Campaign",
      urls: "campaign",
      logoBlack: CampaignLogo,
      logoBlue: CampaignLogoBlue,
      imgAlt: "campaign icon",
      imgClass: "campaign-icon",
      activeClass: page === "Campaign" ? "active single-menu" : "single-menu",
    };
    var appointment = {
      data: "Appointment",
      urls: "appointment",
      logoBlack: CampaignLogo,
      logoBlue: CampaignLogoBlue,
      imgAlt: "campaign icon",
      imgClass: "campaign-icon",
      activeClass:
        page === "Appointment" ? "active single-menu" : "single-menu",
    };
    if (data !== null) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].moduleName === "Dashboard" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(dashboard);
        } else if (
          data[i].moduleName === "Tasks" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(task);
        } else if (
          data[i].moduleName === "Claim" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(claim);
        } else if (
          data[i].moduleName === "Campaign" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(campaign);
        } else if (
          data[i].moduleName === "Appointment" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(appointment);
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
        }
      }
    }
    this.setState({
      cont: accessdata,
    });
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  handleCRMRole(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreRolesByUserID",
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

  handleGetUserProfileData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserProfileDetail",
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
  ////handle notification modal open
  handleNotificationModalOpen() {
    // if (this.state.notificationCount > 0) {
    this.setState({ notificationModal: true });
    // }
  }
  ////handle notification modal close
  handleNotificationModalClose(typeId, type) {
    this.setState({ notificationModal: false });
    this.handleGetReadStoreNotification(typeId, type);
  }

  handleLoggedInUserDetails = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/StoreLoggedInAccountDetails",
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

  ////handle logout method
  handleLogoutMethod() {
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreAccount/Logout",
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
  ////handle get notification
  handleGetNotigfication() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/StoreNotification/GetStoreNotifications",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        var Noticount = responseData.notiCount;
        if (message === "Success" && responseData) {
          self.setState({
            notificationData: responseData.storeNotificationModel,
            notificationCount: Noticount,
          });
        } else {
          self.setState({
            notificationData: responseData.storeNotificationModel,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetNotigfication");
      });
  }
  ////handle get read store notification
  handleGetReadStoreNotification = (typeId, type) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreNotification/ReadStoreNotification",
      headers: authHeader(),
      params: {
        NotificatonTypeID: typeId,
        NotificatonType: type,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.handleGetNotigfication();
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetNotigfication");
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

  ////handle chat modal close
  handleChatModalClose() {
    this.setState({ chatModal: false });
  }
  ////handle chat modal open
  handleChatModalOpen() {
    this.setState({ chatModal: true });
    this.handleGetOngoingChat();
    this.handleGetNewChat();
  }

  ////handleGet Ongoing Chat
  handleGetOngoingChat() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetOngoingChat",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var ongoingChatsData = response.data.responseData;
        if (message === "Success" && ongoingChatsData) {
          self.setState({ ongoingChatsData });
          // setInterval(() => {
          // if (self.state.chatModal) {
          //   self.handleGetOngoingChat();
          // }
          // }, 40000);
        } else {
          self.setState({ ongoingChatsData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetOngoingChat");
      });
  }

  ////handle Get New Chat
  handleGetNewChat() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetNewChat",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var newChatsData = response.data.responseData;
        if (message === "Success" && newChatsData) {
          self.setState({ newChatsData });
          // setInterval(() => {
          // if (self.state.chatModal) {
          //   self.handleGetNewChat();
          // }
          // }, 40000);
        } else {
          self.setState({ newChatsData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetOngoingChat");
      });
  }
  ////handle Make As Read On Going Chat
  handleMakeAsReadOnGoingChat(id, name) {
    let self = this;
    this.setState({ chatId: id });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/MarkAsReadOnGoingChat",
      headers: authHeader(),
      params: {
        chatID: id,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.handleGetOngoingChat();
          self.handleGetChatMessagesList(id);
          self.setState({ customerName: name });
        } else {
          self.setState({ customerName: name });
        }
      })
      .catch((response) => {
        console.log(response, "---handleMakeAsReadOnGoingChat");
      });
  }
  handleUpdateCustomerChatStatus(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateCustomerChatStatus",
      headers: authHeader(),
      params: {
        chatID: id,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.setState({ chatId: 0 });
          self.handleGetOngoingChat();
          self.handleGetNewChat();
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleUpdateCustomerChatStatus");
      });
  }
  ////handle get chat messgae by chat id
  handleGetChatMessagesList(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/getChatMessagesList",
      headers: authHeader(),
      params: {
        chatID: id,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var messageData = response.data.responseData;
        if (message === "Success" && messageData) {
          self.setState({
            messageData,
          });
          // setInterval(() => {
          // if (self.state.chatModal) {
          self.handleGetChatMessagesList(id);
          //   }
          // }, 20000);
        } else {
          self.setState({ messageData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatMessagesList");
      });
  }
  ////handle save chat messgae
  handleSaveChatMessages() {
    let self = this;
    var inputParam = {};
    inputParam.chatID = this.state.chatId;
    inputParam.message = this.state.message;
    inputParam.attachment = null;
    inputParam.byCustomer = false;
    inputParam.chatStatus = 0;
    inputParam.storeManagerId = 0;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/saveChatMessages",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.handleGetChatMessagesList(self.state.chatId);
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatMessagesList");
      });
  }
  ////handle get chat notification count
  handleGetChatNotificationCount() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetChatNotificationCount",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var chatMessageCount = response.data.responseData;
        self.setState({ chatMessageCount });
        // setInterval(() => {
        // self.handleGetChatNotificationCount();
        // }, 30000);
      })
      .catch((response) => {
        console.log(response, "---handleGetChatNotificationCount");
      });
  }

  ////handle get chat notification count
  handleSearchChatItemDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/searchChatItemDetails",
      headers: authHeader(),
      params: {
        SearchText: "",
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message == "Success" && responseData) {
        }
      })
      .catch((response) => {
        console.log(response, "---handleSearchChatItemDetails");
      });
  }
  ////handle get chat notification count
  handleGetTimeSlot() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetTimeSlot",
      headers: authHeader(),
      params: {
        storeID: 1,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var timeSlotData = response.data.responseData;

        if (message == "Success" && timeSlotData) {
          self.setState({ timeSlotData });
        } else {
          self.setState({ timeSlotData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetTimeSlot");
      });
  }

  ////handlecselect card in card tab
  handleSelectCard(id) {
    if (
      this.state.searchCardData.filter((x) => x.id === id)[0]["isSelect"] ==
      true
    ) {
      this.state.searchCardData.filter((x) => x.id === id)[0][
        "isSelect"
      ] = false;
    } else {
      this.state.searchCardData.filter((x) => x.id === id)[0][
        "isSelect"
      ] = true;
    }
    this.setState({
      searchCardData: this.state.searchCardData,
    });
  }
  ////handle button down click
  handleDownButtonClick() {
    this.setState({ isDownbtn: !this.state.isDownbtn });
  }
  ////handle on change ck editor
  handleOnChangeCKEditor = (evt) => {
    var message = evt.editor.getData();
    this.setState({
      message,
    });
  };
  ////handle on going chat click
  handleOngoingChatClick = (id, name, count) => {
    this.setState({ customerName: name });
    if (this.state.chatId === id) {
      this.handleGetChatMessagesList(id);
    } else {
      if (count === 0) {
        this.handleGetChatMessagesList(id);
      } else {
        this.handleMakeAsReadOnGoingChat(id, name);
      }
    }
  };

  onCloseCardModal = () => {
    this.setState({ cardModal: false });
  };
  onOpenCardModal = () => {
    this.setState({ cardModal: true });
  };

  render() {
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
              <img src={Hamb} alt="hamburger icon" />
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
              {/* <Link to="storedashboard" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={DashboardLogo}
                    alt="dashboard icon"
                    className="dashboardImg1"
                  />
                  <img
                    src={DashboardLogoBlue}
                    alt="dashboard icon"
                    className="dashboardImg1"
                    style={{ display: "none" }}
                  />
                </div>
                Dashboards
              </Link>
              <Link to="StoreTask" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={TicketLogo}
                    alt="ticket icon"
                    className="myTicket"
                  />
                  <img
                    src={TicketLogoBlue}
                    alt="ticket icon"
                    className="myTicket"
                    style={{ display: "none" }}
                  />
                </div>
                Task
              </Link>
              <Link to="claim" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={ClaimLogo}
                    alt="claim icon"
                    className="claim-logo"
                  />
                  <img
                    src={ClaimLogoBlue}
                    alt="claim icon"
                    className="claim-logo"
                    style={{ display: "none" }}
                  />
                </div>
                Claim
              </Link> */}
            </div>
          </div>

          <div className="header-right-icons">
            <a onClick={this.handleChatModalOpen.bind(this)}>
              <div className="position-relative">
                <img src={ChatLogo} alt="logo" className="chatImg" />
                <img
                  src={ChatLogoBlue}
                  alt="logo"
                  className="chatImg"
                  style={{ display: "none" }}
                />
                <span className="message-icon-cnt">
                  {this.state.chatMessageCount}
                </span>
              </div>
            </a>
            {/* --notification-- */}
            <a>
              <div
                className="position-relative"
                onClick={this.handleNotificationModalOpen.bind(this)}
              >
                <img src={NotificationLogo} alt="logo" className="notifi" />
                <span style={{ display: "none" }} className="icon-fullname">
                  Notifications
                </span>

                <span className="upper-noti-count">
                  {this.state.notificationCount}
                </span>

                <span style={{ display: "none" }} className="icon-fullname">
                  Notifications
                </span>
              </div>
            </a>
            <Link to="/store/settings">
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
              SM
            </a>
          </div>
        </div>
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
                  <p className="font-weight-bold" style={{ fontSize: "16px" }}>
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
        {/*----------------- notification modal-------------- */}
        <Modal
          onClose={this.handleNotificationModalClose.bind(this)}
          open={this.state.notificationModal}
          modalId="Notification-popup"
          overlayId="logout-ovrly"
        >
          <div className="notifi-container">
            {this.state.notificationCount === 0 ? (
              <span>No Notification Found</span>
            ) : (
              this.state.notificationData !== null &&
              this.state.notificationData.map((item, i) => {
                return (
                  <div className="row rowpadding" key={i}>
                    <div className="md-2 rectangle-2 lable05 noti-count">
                      <label className="labledata">
                        {item.notificationCount}
                      </label>
                    </div>
                    <div className="md-6 new-tickets-assigned tic-noti">
                      <label>
                        <span>{item.notificationName}</span>
                      </label>
                    </div>
                    <div className="viewticketspeadding">
                      <Popover
                        content={
                          <div className="notification-popover">
                            {item.customTaskNotificationModels.map(
                              (data, j) => {
                                //
                                return (
                                  <p key={j}>
                                    {data.notificatonType == 1 ? (
                                      <>
                                        {data.notificatonTypeName + " No:"}
                                        <Link
                                          to={{
                                            pathname: "/store/editStoreTask",
                                            state: {
                                              TaskID: data.notificatonTypeID,
                                            },
                                          }}
                                          style={{ color: "#2561A8" }}
                                          onClick={this.handleNotificationModalClose.bind(
                                            this,
                                            data.notificatonTypeID,
                                            data.notificatonType
                                          )}
                                        >
                                          {" " + data.notificatonTypeID}
                                        </Link>
                                      </>
                                    ) : (
                                      <>
                                        {data.notificatonTypeName + " No:"}
                                        <Link
                                          to={{
                                            pathname:
                                              "/store/claimApproveReject",
                                            state: {
                                              ClaimID: data.notificatonTypeID,
                                            },
                                          }}
                                          style={{ color: "#2561A8" }}
                                          onClick={this.handleNotificationModalClose.bind(
                                            this,
                                            data.notificatonTypeID,
                                            data.notificatonType
                                          )}
                                        >
                                          {" " + data.notificatonTypeID}
                                        </Link>
                                      </>
                                    )}
                                  </p>
                                );
                              }
                            )}
                          </div>
                        }
                        placement="bottom"
                        trigger="click"
                      >
                        <div
                          className={
                            item.alertID !== ""
                              ? "md-4 view-tickets"
                              : "text-disabled"
                          }
                        >
                          VIEW
                        </div>
                      </Popover>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Modal>

        {/*----------------- chat modal-------------- */}
        <Modal
          onClose={this.handleChatModalClose.bind(this)}
          open={this.state.chatModal}
          modalId="chat-popup"
          overlayId="chat-popup-overlay"
        >
          <div className="store-chat-header">
            <img
              src={BackArrow}
              className="mobile-arrow"
              alt="back arrow"
              onClick={this.handleChatModalClose}
            />
            <h3>Store chat window</h3>
            <span className="rounded-cross" onClick={this.handleChatModalClose}>
              &times;
            </span>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 p-0">
                <div className="chatbot-left">
                  <div className="chat-cntr">
                    <p className="chats-heading">
                      Ongoing Chats (
                      {this.state.ongoingChatsData.length < 9
                        ? "0" + this.state.ongoingChatsData.length
                        : this.state.ongoingChatsData.length}
                      )
                    </p>
                    <div className="chat-left-height">
                      {this.state.ongoingChatsData &&
                        this.state.ongoingChatsData.map((chat, i) => (
                          <div
                            key={i}
                            className={
                              this.state.chatId === chat.chatID
                                ? "chat-info active"
                                : "chat-info"
                            }
                            onClick={this.handleOngoingChatClick.bind(
                              this,
                              chat.chatID,
                              chat.cumtomerName,
                              chat.messageCount
                            )}
                          >
                            <div className="d-flex align-items-center overflow-hidden">
                              <span className="dark-blue-ini initial">
                                {chat.cumtomerName.charAt(0)}
                              </span>
                              <div className="name-num mx-2">
                                <p className="chat-name">{chat.cumtomerName}</p>
                                <p className="num">{chat.mobileNo}</p>
                              </div>
                            </div>
                            <div>
                              <div className="mess-time">
                                <p>
                                  {chat.messageCount === 0
                                    ? "No"
                                    : chat.messageCount}{" "}
                                  New Messages
                                </p>
                                <p>{chat.timeAgo}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="chat-cntr">
                    <p className="chats-heading">
                      New Chats (
                      {this.state.newChatsData.length < 9
                        ? "0" + this.state.newChatsData.length
                        : this.state.newChatsData.length}
                      )
                    </p>
                    <div className="chat-left-height">
                      {this.state.newChatsData &&
                        this.state.newChatsData.map((chat, i) => (
                          <div
                            key={i}
                            className={
                              this.state.chatId === chat.chatID
                                ? "chat-info active"
                                : "chat-info"
                            }
                            onClick={this.handleUpdateCustomerChatStatus.bind(
                              this,
                              chat.chatID
                            )}
                          >
                            <div className="d-flex align-items-center overflow-hidden">
                              <span className="dark-blue-ini initial">
                                {chat.cumtomerName.charAt(0)}
                              </span>
                              <div className="name-num mx-2">
                                <p className="chat-name">{chat.cumtomerName}</p>
                                <p className="num">{chat.mobileNo}</p>
                              </div>
                            </div>
                            <div>
                              <div className="mess-time">
                                <p>
                                  {chat.messageCount === 0
                                    ? "No"
                                    : chat.messageCount}{" "}
                                  New Messages
                                </p>
                                <p>{chat.timeAgo}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* <button className="butn-inv hist-btn" onClick={this.handlePageChange.bind(this)}>My historical chat</button> */}
              </div>
              <div className="mobile-chat-tabs">
                <div className="position-relative">
                  {/* <div className="mobile-search-cntr">
                    <div className="mobile-search-img">
                      <img src={SearchBlueImg} alt="SearchBlueImg" />
                    </div>
                    <div className="mobile-search-input w-100">
                      <input
                        type="text"
                        placeholder="Enter your Search terms here..."
                      />
                    </div>
                  </div> */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="ongoing-chat-tab"
                        data-toggle="tab"
                        href="#ongoing-chat"
                        role="tab"
                        aria-controls="ongoing-chat"
                        aria-selected="true"
                      >
                        Ongoing Chats
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="new-chat-tab"
                        data-toggle="tab"
                        href="#new-chat"
                        role="tab"
                        aria-controls="new-chat"
                        aria-selected="false"
                      >
                        New Chats
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="ongoing-chat"
                    role="tabpanel"
                    aria-labelledby="ongoing-chat-tab"
                  >
                    <div>
                      <p className="mobile-chat-header">Ongoing Chats</p>
                      <div className="chat-detail-outer-cntr">
                        {this.state.ongoingChatsData &&
                          this.state.ongoingChatsData.map((chat, i) => (
                            <div key={i} className="chat-detail-middle-cntr">
                              <div
                                className={
                                  this.state.chatId === chat.chatID
                                    ? "chat-detail-cntr active"
                                    : "chat-detail-cntr"
                                }
                                onClick={this.handleOngoingChatClick.bind(
                                  this,
                                  chat.chatID,
                                  chat.cumtomerName,
                                  chat.messageCount
                                )}
                              >
                                <div className="chat-face-cntr">
                                  <div className="chat-face-inner-cntr">
                                    <img
                                      src={DummyFace1}
                                      alt="face image"
                                      title={chat.cumtomerName}
                                    />
                                    <span className="online"></span>
                                  </div>
                                </div>
                                <span className="face-name">
                                  {chat.cumtomerName.split(" ")[0]}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="new-chat"
                    role="tabpanel"
                    aria-labelledby="new-chat-tab"
                  >
                    <div>
                      <p className="mobile-chat-header">New Chats</p>
                      <div className="chat-detail-outer-cntr">
                        {this.state.newChatsData &&
                          this.state.newChatsData.map((chat, i) => (
                            <div key={i} className="chat-detail-middle-cntr">
                              <div
                                className="chat-detail-cntr"
                                onClick={this.handleUpdateCustomerChatStatus.bind(
                                  this,
                                  chat.chatID
                                )}
                              >
                                <div
                                  className={
                                    this.state.chatId === chat.chatID
                                      ? "chat-face-cntr active"
                                      : "chat-face-cntr"
                                  }
                                >
                                  <div className="chat-face-inner-cntr">
                                    <img src={DummyFace1} alt="face image" />
                                    <span className="online"></span>
                                  </div>
                                </div>
                                <span className="face-name">
                                  {chat.cumtomerName.split(" ")[0]}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 p-0">
                <div className="chatbot-right">
                  <div className="row" style={{ margin: "0" }}>
                    <div className="chatdivtitle">
                      <label className="chattitlelbl">
                        {this.state.customerName}
                      </label>
                    </div>
                    {this.state.isDownbtn ? (
                      <div className="chatcontentRow">
                        <div className="chatcontentDiv">
                          {this.state.messageData !== null
                            ? this.state.messageData.map((item, i) => {
                                return (
                                  <div
                                    key={i}
                                    className={
                                      item.byCustomer
                                        ? "chat-trail-cntr"
                                        : "chat-trail-cntr chat-trail-cntr-right"
                                    }
                                  >
                                    <div className="chat-trail-img">
                                      <img
                                        src={DummyFace2}
                                        alt="face image"
                                        title={item.customerName}
                                      />
                                    </div>
                                    <div className="chat-trail-chat-cntr">
                                      <p className="chat-trail-chat">
                                        {ReactHtmlParser(item.message)}
                                      </p>
                                      <span className="chat-trail-time">
                                        {item.chatDate + " "}
                                        {item.chatTime}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                          {/* <div className="chat-trail-cntr">
                            <div className="chat-trail-img">
                              <img src={DummyFace1} alt="face image" />
                            </div>
                            <div className="chat-trail-chat-cntr">
                              <p className="chat-trail-chat">Shop</p>
                              <span className="chat-trail-time">56s</span>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    ) : null}
                    <div
                      className="chatcontentdivtab chat-tabs-desktop"
                      style={{ height: !this.state.isDownbtn ? "80%" : "" }}
                    >
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#message-tab"
                            role="tab"
                            aria-controls="message-tab"
                            aria-selected="true"
                          >
                            MESSAGE
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#card-tab"
                            role="tab"
                            aria-controls="card-tab"
                            aria-selected="false"
                          >
                            CARD
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#recommended-list-tab"
                            role="tab"
                            aria-controls="recommended-list-tab"
                            aria-selected="false"
                          >
                            RECOMMENDED LIST
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#schedule-visit-tab"
                            role="tab"
                            aria-controls="schedule-visit-tab"
                            aria-selected="false"
                            onClick={this.handleGetTimeSlot.bind(this)}
                          >
                            SCHEDULE VISIT
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#generate-payment-link-tab"
                            role="tab"
                            aria-controls="generate-payment-link-tab"
                            aria-selected="false"
                          >
                            GENERATE PAYMENT LINK
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        {/* --------Message Tab----- */}
                        <div
                          className="tab-pane fade show active"
                          id="message-tab"
                          role="tabpanel"
                          aria-labelledby="message-tab"
                        >
                          <div className="message-div">
                            <CKEditor
                              data={this.state.message}
                              onChange={this.handleOnChangeCKEditor}
                              config={{
                                toolbar: [
                                  {
                                    name: "basicstyles",
                                    items: ["Bold", "Italic", "Strike"],
                                  },

                                  {
                                    name: "paragraph",
                                    items: ["NumberedList", "BulletedList"],
                                  },
                                  {
                                    name: "links",
                                    items: ["Link", "Unlink"],
                                  },
                                  {
                                    name: "insert",
                                    items: ["Image", "Table"],
                                  },
                                  {
                                    name: "editing",
                                    items: ["Scayt"],
                                  },
                                ],
                              }}
                            />

                            <div
                              className="mobile-ck-send"
                              onClick={this.handleSaveChatMessages.bind(this)}
                            >
                              <img src={Assign} alt="send img" />
                            </div>
                          </div>
                        </div>
                        {/* --------Card Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="card-tab"
                          role="tabpanel"
                          aria-labelledby="card-tab"
                        >
                          <div>
                            <div
                              className="input-group searchtxt-new"
                              style={{ background: "none" }}
                            >
                              <input
                                type="text"
                                className="search-customerAddSrch searchtxt"
                                placeholder="Search ItemId/artcile/SKU ID"
                                name="Search"
                                maxLength="100"
                                autoComplete="off"
                              />
                              <span className="input-group-addon seacrh-img-addsearch searchtxt-span">
                                <img
                                  src={SearchBlueImg}
                                  alt="SearchBlueImg"
                                  className="srch-imge"
                                  // onClick={this.handleSearchCustomer}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="container">
                            <div
                              className="row product-card"
                              style={{
                                height: !this.state.isDownbtn ? "600px" : "",
                              }}
                            >
                              {this.state.searchCardData !== null &&
                                this.state.searchCardData.map((item, i) => {
                                  return (
                                    <div
                                      className="col-md-6"
                                      key={i}
                                      onClick={this.handleSelectCard.bind(
                                        this,
                                        item.id
                                      )}
                                    >
                                      <div className="card">
                                        <div className="card-body position-relative">
                                          {item.isSelect ? (
                                            <div className="selectdot">
                                              <img
                                                src={CardTick}
                                                alt={"select-card"}
                                              />
                                            </div>
                                          ) : null}
                                          {/* <div className="container"> */}
                                          <div
                                            className="row"
                                            style={{
                                              margin: "0",
                                              alignItems: "flex-end",
                                            }}
                                          >
                                            <div className="col-md-4">
                                              <img
                                                className="chat-product-img"
                                                src={item.productImgURL}
                                                alt="Product Image"
                                                title="POWER Black Casual Shoes For Man"
                                              />
                                            </div>
                                            <div className="col-md-8 bkcprdt">
                                              <div>
                                                <label className="chat-product-name">
                                                  {item.productName}
                                                </label>
                                              </div>
                                              <div>
                                                <label className="chat-product-code">
                                                  Product Code:
                                                  {item.productCode}
                                                </label>
                                              </div>
                                              <div>
                                                <label className="chat-product-prize">
                                                  {item.productPrize}
                                                </label>
                                              </div>
                                              <div>
                                                <label className="chat-product-url">
                                                  {item.productUrl}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="row">
                              <button
                                className="storeUpbtn"
                                onClick={this.handleDownButtonClick.bind(this)}
                              >
                                {this.state.isDownbtn ? (
                                  <img src={DownBlue} alt="down-arrow" />
                                ) : (
                                  <img src={UpBlue} alt="down-arrow" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* --------Recommended List Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="recommended-list-tab"
                          role="tabpanel"
                          aria-labelledby="recommended-list-tab"
                        ></div>
                        {/* --------Schedule Visit Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="schedule-visit-tab"
                          role="tabpanel"
                          aria-labelledby="schedule-visit-tab"
                        >
                          <div
                            className="row"
                            style={{ marginLeft: "5px", marginTop: "10px" }}
                          >
                            <div className="col-md-8">
                              <div>
                                <label className="s-lable">
                                  Today:11 May 2020
                                </label>
                                <div style={{ display: "inline-block" }}>
                                  <button className="s-red-btn">
                                    11AM-12PM
                                    <img
                                      className="s-img-select"
                                      src={CircleRight}
                                      alt="circle-right"
                                    />
                                  </button>
                                  <button className="s-green-btn">
                                    11AM-12PM
                                  </button>
                                  <button className="s-yellw-btn">
                                    11AM-12PM
                                  </button>
                                  <button className="s-green-btn ">
                                    11AM-12PM
                                  </button>
                                </div>
                                <div className="selectdot-blue"></div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div>
                                  <label>Select Slot</label>
                                  <button className="s-green-active">
                                    2PM-3PM
                                    <img
                                      className="s-img-select"
                                      src={CircleRight}
                                      alt="circle-right"
                                    />
                                  </button>
                                </div>
                                <div>
                                  <label>No of People</label>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* --------Generate Payment Link Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="generate-payment-link-tab"
                          role="tabpanel"
                          aria-labelledby="generate-payment-link-tab"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="chatcontentdivtab chat-tabs-mobile"
                      style={{ height: !this.state.isDownbtn ? "80%" : "" }}
                    >
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#message-tab"
                            role="tab"
                            aria-controls="message-tab"
                            aria-selected="true"
                          >
                            MESSAGE
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#card-tab"
                            role="tab"
                            aria-controls="card-tab"
                            aria-selected="false"
                            onClick={this.onOpenCardModal}
                          >
                            CARD
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#recommended-list-tab"
                            role="tab"
                            aria-controls="recommended-list-tab"
                            aria-selected="false"
                          >
                            RECOMMENDED LIST
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#schedule-visit-tab"
                            role="tab"
                            aria-controls="schedule-visit-tab"
                            aria-selected="false"
                          >
                            SCHEDULE VISIT
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#generate-payment-link-tab"
                            role="tab"
                            aria-controls="generate-payment-link-tab"
                            aria-selected="false"
                          >
                            GENERATE PAYMENT LINK
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        {/* --------Message Tab----- */}
                        <div
                          className="tab-pane fade show active"
                          id="message-tab"
                          role="tabpanel"
                          aria-labelledby="message-tab"
                        >
                          <div className="message-div">
                            <CKEditor
                              config={{
                                toolbar: [
                                  {
                                    name: "basicstyles",
                                    items: ["Bold", "Italic", "Strike"],
                                  },

                                  {
                                    name: "paragraph",
                                    items: ["NumberedList", "BulletedList"],
                                  },
                                  {
                                    name: "links",
                                    items: ["Link", "Unlink"],
                                  },
                                  {
                                    name: "insert",
                                    items: ["Image", "Table"],
                                  },
                                  {
                                    name: "editing",
                                    items: ["Scayt"],
                                  },
                                ],
                              }}
                            />
                            <div className="mobile-ck-send">
                              <img src={Assign} alt="send img" />
                            </div>
                          </div>
                        </div>
                        {/* -------- Card Modal ----- */}
                        <Modal
                          open={this.state.cardModal}
                          onClose={this.onCloseCardModal}
                          center
                          modalId="mobile-tabs-popup"
                          overlayId="mobile-tabs-overlay"
                        >
                          <div className="mobile-chat-popup">
                            <div
                              className="input-group searchtxt-new"
                              style={{ background: "none" }}
                            >
                              <input
                                type="text"
                                className="search-customerAddSrch searchtxt"
                                placeholder="Search ItemId/artcile/SKU ID"
                                name="Search"
                                maxLength="100"
                                autoComplete="off"
                              />
                              <span className="input-group-addon seacrh-img-addsearch searchtxt-span">
                                <img
                                  src={SearchBlueImg}
                                  alt="SearchBlueImg"
                                  className="srch-imge"
                                  // onClick={this.handleSearchCustomer}
                                />
                              </span>
                            </div>
                            <div className="product-card">
                              {this.state.searchCardData !== null &&
                                this.state.searchCardData.map((item, i) => {
                                  return (
                                    <div
                                      className="card"
                                      key={i}
                                      onClick={this.handleSelectCard.bind(
                                        this,
                                        item.id
                                      )}
                                    >
                                      <div className="card-body position-relative">
                                        {item.isSelect ? (
                                          <div className="selectdot">
                                            <img
                                              src={CardTick}
                                              alt={"select-card"}
                                            />
                                          </div>
                                        ) : null}
                                        <div className="mobile-card-cntr">
                                          <div className="mobile-card-img">
                                            <img
                                              className="chat-product-img"
                                              src={item.productImgURL}
                                              alt="Product Image"
                                              title="POWER Black Casual Shoes For Man"
                                            />
                                          </div>
                                          <div className="bkcprdt">
                                            {/* <div> */}
                                            <label className="chat-product-name">
                                              {item.productName}
                                            </label>
                                            {/* </div> */}
                                            {/* <div> */}
                                            <label className="chat-product-code">
                                              Product Code:
                                              {item.productCode}
                                            </label>
                                            {/* </div> */}
                                            {/* <div> */}
                                            <label className="chat-product-prize">
                                              {item.productPrize}
                                            </label>
                                            {/* </div> */}
                                            {/* <div> */}
                                            <label className="chat-product-url">
                                              {item.productUrl}
                                            </label>
                                            {/* </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="chat-btn-cntr">
                              <button
                                className="butn-inv"
                                onClick={this.onCloseCardModal}
                              >
                                Close
                              </button>
                              <button
                                className="butn"
                                onClick={this.onCloseCardModal}
                              >
                                Send
                                <img
                                  src={SendUp}
                                  alt="send"
                                  className="send-up"
                                />
                              </button>
                            </div>
                          </div>
                        </Modal>
                        {/* --------Recommended List Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="recommended-list-tab"
                          role="tabpanel"
                          aria-labelledby="recommended-list-tab"
                        ></div>
                        {/* --------Schedule Visit Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="schedule-visit-tab"
                          role="tabpanel"
                          aria-labelledby="schedule-visit-tab"
                        ></div>
                        {/* --------Generate Payment Link Tab----- */}
                        <div
                          className="tab-pane fade"
                          id="generate-payment-link-tab"
                          role="tabpanel"
                          aria-labelledby="generate-payment-link-tab"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
