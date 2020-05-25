import React, { Component } from "react";
import DashboardLogo from "./../../assets/Images/store-black.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import ChatLogo from "./../../assets/Images/chat.png";
import NotificationLogo from "./../../assets/Images/Notification.png";
import SettingLogo from "./../../assets/Images/setting.png";
import Hamb from "./../../assets/Images/hamb.png";
import SuggSearch from "./../../assets/Images/sugg-search.png";
import Assign from "./../../assets/Images/sent-icon.svg";
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
import BackArrow from "./../../assets/Images/mobile-back.svg";
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
import SchRight from "./../../assets/Images/sch-right.png";
import DownArrow from "./../../assets/Images/down.png";
import RightBlue from "./../../assets/Images/rightblue.png";
import CardTick from "./../../assets/Images/card-tick.png";
import UpBlue from "./../../assets/Images/new-Up.png";
import DownBlue from "./../../assets/Images/new-Down.png";
import AppointmentLogo from "./../../assets/Images/appointments.svg";
import ChatBubbleBlue from "./../../assets/Images/chat-bubble-blue.svg";
import ChatBubbleWhite from "./../../assets/Images/chat-bubble-white.svg";
import ChatCount from "./../../assets/Images/chat-count.svg";
import AppointmentLogoBlue from "./../../assets/Images/appointments.svg";
import BellIcon from "./../../assets/Images/bell-icon.svg";
import CircleRight from "./../../assets/Images/circle-right.png";
import ReactHtmlParser from "react-html-parser";
import { Tooltip } from "antd";
import { ItemMeta } from "semantic-ui-react";
import CancelBlueImg from "./../../assets/Images/CancelBlue.png";
import moment from "moment";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Table } from "antd";

// const socket = io.connect("http://localhost:4000");
// var isSocketReady=1;
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
      searchCardData: [],
      chatId: 0,
      isDownbtn: true,
      customerName: "",
      messageData: [],
      message: "",
      chatMessageCount: 0,
      activeTab: 1,
      cardModal: false,
      searchItem: "",
      timeSlotData: [],
      selectedSlot: {},
      noOfPeople: "",
      selectedDate: "",
      noOfPeopleMax: "",
      isSelectSlot: "",
      customerId: 0,
      mobileNo: "",
      messageSuggestionData: [],
      messageSuggestion: "",
      scheduleModal: false,
      recommendedModal: false,
      paymentModal: false,
      selectedCard: 0,
      chkSuggestion: [],
      programCode: "",
      oldCount: 0,
      toggle: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
      },
      storeID: "",
      notificationAccess: "none",
      settingAccess: "none",
      storeAgentDetail: [],
      AgentID: 0,
      searchChat: "",
      isSendRecomended: false,
      chatAccess: "none",
      noProductFound: "",
      remainingCount: "100 characters remaining...",
      noRecommendedFound: "",
      suggestionModal: false,
      suggestionText: "",
      suggestionModalMob: false,
      availableSlot: 0,
      isHistoricalChat: false,
      historicalChatData: [
        {
          chatID: 1,
          customerName: "Kaustubh",
          time: "12 Jan, 03:30 PM",
          message: "Lorem ipsum, or lipsum as it is sometimes.",
        },
        {
          chatID: 2,
          customerName: "Kaustubh",
          time: "12 Jan, 03:30 PM",
          message: "Lorem ipsum, or lipsum as it is sometimes.",
        },
        {
          chatID: 3,
          customerName: "Kaustubh",
          time: "12 Jan, 03:30 PM",
          message: "Lorem ipsum, or lipsum as it is sometimes.",
        },
        {
          chatID: 4,
          customerName: "Kaustubh",
          time: "12 Jan, 03:30 PM",
          message: "Lorem ipsum, or lipsum as it is sometimes.",
        },
        {
          chatID: 5,
          customerName: "Kaustubh",
          time: "12 Jan, 03:30 PM",
          message: "Lorem ipsum, or lipsum as it is sometimes.",
        },
        {
          chatID: 6,
          customerName: "Kaustubh",
          time: "12 Jan, 03:30 PM",
          message: "Lorem ipsum, or lipsum as it is sometimes.",
        },
      ],
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

      setInterval(() => {
        this.handleGetChatNotificationCount();
      }, 6000);

      this.handleGetOngoingChat("");
    }
  }

  handleScrollRight(num) {
    debugger;
    document.getElementById("schedule-btn-cntr" + num).scrollLeft += 20;
  }

  handleScrollLeft(num) {
    debugger;
    document.getElementById("schedule-btn-cntr" + num).scrollLeft -= 20;
  }

  toggleFilter(e) {
    this.setState({
      toggle: {
        [e.target.id]: !this.state.toggle[e.target.id],
      },
    });
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
      logoBlack: AppointmentLogo,
      logoBlue: AppointmentLogoBlue,
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
        } else if (
          data[i].moduleName === "Chat" &&
          data[i].modulestatus === true
        ) {
          this.setState({
            chatAccess: "block",
          });
        } else if (
          data[i].moduleName === "Reports" &&
          data[i].modulestatus === true
        ) {
          debugger;
          this.setState({
            reportAccess: "block",
          });
          setTimeout(() => {
            transferData.sendReport(this.state.reportAccess);
          }, 100);
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
  componentDidUpdate() {
    if (this.state.chatModal && this.state.isDownbtn) {
      this.scrollToBottom();
    }
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
            AgentID: data.agentId,
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

          // self.handleGetStoreAgentDetailsById(data.agentId);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetStoreAgentDetailsById(agentID) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSSetting/GetStoreAgentDetailsById",
      headers: authHeader(),
      params: {
        AgentID: agentID,
      },
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ storeAgentDetail: data });
        } else {
          self.setState({ storeAgentDetail: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

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
    this.setState({
      chatModal: true,
      noOfPeople: "",
      selectSlot: {},
      scheduleModal: false,
      selectedSlot: {},
      toggle: {
        one: true,
        two: false,
        three: false,
        four: false,
        five: false,
      },
      activeTab: 1,
    });

    this.handleGetNewChat();
    this.handleGetOngoingChat("isRead");
    this.handleGetStoreAgentDetailsById(this.state.AgentID);
  }

  ////handleGet Ongoing Chat
  async handleGetOngoingChat(value, event) {
    let self = this;
    var search = "";
    if (event !== undefined) {
      search = event.target.value;
      this.setState({ searchChat: event.target.value, noRecommendedFound: "" });
    } else {
      search = this.state.searchChat;
    }

    await axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetOngoingChat",
      headers: authHeader(),
      params: { Search: search },
    })
      .then(function(response) {
        var message = response.data.message;
        var ongoingChatsData = response.data.responseData;
        if (message === "Success" && ongoingChatsData) {
          // if (self.state.chatId > 0) {
          //   ongoingChatsData.filter(x=>x.chatID===self.state.chatId)[0].messageCount=0
          // }
          debugger;
          self.setState({
            ongoingChatsData,
          });

          if (value == "") {
            for (let i = 0; i < ongoingChatsData.length; i++) {
              const socket = io.connect(config.socketUrl, {
                transports: ["polling"],
              });

              socket.on("connect", () => {
                socket.send("hi");
                socket.on(
                  "91" +
                    ongoingChatsData[i].mobileNo +
                    ongoingChatsData[i].programCode.toLowerCase(),
                  function(data) {
                    console.log("Message Received");
                    if ("91" + self.state.mobileNo === data[3]) {
                      self.handleGetChatNotificationCount();
                      self.handleGetOngoingChat("isRead");
                      self.handleGetChatMessagesList(self.state.chatId);
                    } else {
                      self.handleGetChatNotificationCount();
                      self.handleGetOngoingChat("isRead");
                    }
                  }
                );
                window.onbeforeunload = function() {
                  console.log("unloading resources");
                  socket.disconnect();
                  socket.close();
                };
              });
            }
          }
        } else {
          self.setState({ ongoingChatsData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetOngoingChat");
      });
  }

  handleClearChatSearch = async () => {
    await this.setState({ searchChat: "" });
    this.handleGetOngoingChat("");
  };

  ////handle Get New Chat
  async handleGetNewChat() {
    let self = this;
    await axios({
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
        console.log(response, "---handleGetNewChat");
      });
  }
  ////handle Make As Read On Going Chat
  handleMakeAsReadOnGoingChat(id) {
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
          self.handleGetOngoingChat("isRead");
          self.handleGetChatMessagesList(id);
          self.handleGetChatNotificationCount();
        } else {
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
          self.handleGetOngoingChat("isRead");
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
            ...messageData,
            messageData,
          });
          // self.handleGetChatNotificationCount();
        } else {
          self.setState({ messageData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatMessagesList");
      });
  }
  ////handle save chat messgae
  handleSaveChatMessages(messageStringData, messagewhatsAppContent, imageURL) {
    let self = this;
    debugger;

    var messagecontent = "";
    if (messageStringData) {
      messagecontent = messageStringData;
    } else {
      messagecontent = this.state.message;
    }
    if (messagecontent !== "" && this.state.chatId > 0) {
      var inputParam = {};
      inputParam.chatID = this.state.chatId;
      inputParam.message = messagecontent;
      inputParam.attachment = null;
      inputParam.byCustomer = false;
      inputParam.chatStatus = 0;
      inputParam.storeManagerId = 0;

      this.setState({
        message: "",
      });
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
            self.setState({
              isSendRecomended: false,
              message: "",
              messageSuggestionData: [],
              cardModal: false,
              selectedCard: 0,
              remainingCount: "100 characters remaining...",
              suggestionModal: false,
              suggestionModalMob: false,
            });
            self.handleGetChatMessagesList(self.state.chatId);
            self.handleGetOngoingChat("isRead");
            self.handleSendMessageToCustomer(
              messagecontent,
              0,
              messagewhatsAppContent,
              imageURL
            );
          } else {
            self.setState({ isSendRecomended: false });
          }
        })
        .catch((response) => {
          console.log(response, "---saveChatMessages");
        });
    }
  }
  ////handle get chat notification count
  async handleGetChatNotificationCount() {
    let self = this;
    await axios({
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
        SearchText: this.state.searchItem,
        ProgramCode: this.state.programCode,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var searchCardData = response.data.responseData;

        if (message == "Success" && searchCardData) {
          searchCardData.forEach((element, i) => {
            element["itemID"] = i + 1;
          });
          self.setState({
            searchCardData,
            noProductFound: "",
          });
        } else {
          self.setState({
            searchCardData,
            noProductFound: "No Product Found",
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleSearchChatItemDetails");
      });
  }
  ////handle get time slot by store id
  handleGetTimeSlot() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetTimeSlot",
      headers: authHeader(),
      params: {
        storeID: 1,
        // storeID: this.state.storeID,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var timeSlotData = response.data.responseData;
        var availableSlot = 0;

        if (message == "Success" && timeSlotData) {
          for (var i = 0; i < timeSlotData.length; i++) {
            if (timeSlotData[i].alreadyScheduleDetails.length > 0) {
              availableSlot += 1;
            }
          }
          self.setState({ timeSlotData, isSendClick: false, availableSlot });
        } else {
          self.setState({ timeSlotData, isSendClick: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetTimeSlot");
      });
  }

  ////handle send schedual visit
  handleScheduleVisit() {
    let self = this;
    debugger;
    var inputParam = {};
    if (this.state.customerId == 0) {
    } else {
    }
    if (Object.keys(this.state.selectedSlot).length === 0) {
      this.setState({ isSelectSlot: "please select time slot" });
    } else {
      this.setState({ isSelectSlot: "" });
    }
    if (this.state.noOfPeople === "") {
      this.setState({ noOfPeopleMax: "Please enter the no of people" });
    } else {
      this.setState({ noOfPeopleMax: "" });
    }

    if (
      this.state.customerId > 0 &&
      this.state.noOfPeople !== "" &&
      Object.keys(this.state.selectedSlot).length !== 0
    ) {
      var date = new Date(this.state.selectedDate);

      inputParam.CustomerID = this.state.customerId;
      inputParam.AppointmentDate =
        moment(date)
          .format("YYYY-MM-DD")
          .toString() || "";
      inputParam.SlotID = this.state.selectedSlot.timeSlotId;
      inputParam.NOofPeople = Number(this.state.noOfPeople);
      inputParam.MobileNo = this.state.mobileNo;
      // inputParam.StoreID = this.state.storeID;
      inputParam.StoreID = 1;

      this.setState({ isSendClick: true, isSendRecomended: true });
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/ScheduleVisit",
        headers: authHeader(),
        data: inputParam,
      })
        .then(function(response) {
          var message = response.data.message;
          var timeSlotData = response.data.responseData;
          if (message == "Success" && timeSlotData) {
            var messagedata =
              "Your appointment is booked at " +
              self.state.selectedDate +
              " on " +
              self.state.selectedSlot.timeSlot +
              " \n \n Appointment ID : " +
              timeSlotData[0].appointmentID +
              " \n Customer : " +
              timeSlotData[0].customerName +
              ", " +
              timeSlotData[0].mobileNo +
              " \n Store Name : " +
              timeSlotData[0].storeName +
              " \n Address : " +
              timeSlotData[0].storeAddress +
              " \n Contact Number : " +
              (timeSlotData[0].mobileNo.length > 10
                ? "+" + timeSlotData[0].mobileNo
                : "+91" + timeSlotData[0].mobileNo) +
              " \n Number Of People : " +
              timeSlotData[0].noOfPeople;
            self.setState({
              noOfPeople: "",
              selectSlot: {},
              scheduleModal: false,
              selectedSlot: {},
              message: messagedata,
              isSendRecomended: false,
            });
            self.handleGetTimeSlot();
            debugger;
            self.handleSaveChatMessages("", "", "");
          } else {
            self.setState({ isSendRecomended: false });
          }
        })
        .catch((response) => {
          console.log(response, "---handleScheduleVisit");
        });
    }
  }

  handleSendMessageToCustomer(
    Message,
    index,
    messagewhatsAppContent,
    imageURL
  ) {
    let self = this;
    var inputParam = {};
    if (Message.trim() !== "") {
      if (index > 0) {
        if (this.state.chkSuggestion.length > 0) {
          if (this.state.chkSuggestion[index] === 1) {
            this.state.chkSuggestion[index] = 0;
          } else {
            this.state.chkSuggestion[index] = 1;
          }
        } else {
          this.state.chkSuggestion[index] = 1;
        }
        this.setState({
          chkSuggestion: this.state.chkSuggestion,
        });
      }
      inputParam.ChatID = this.state.chatId;
      inputParam.MobileNo =
        this.state.mobileNo.length > 10
          ? this.state.mobileNo
          : "91" + this.state.mobileNo;
      inputParam.ProgramCode = this.state.programCode;
      inputParam.Message = Message;
      inputParam.WhatsAppMessage = messagewhatsAppContent;
      inputParam.ImageURL = imageURL;
      inputParam.InsertChat = 1;
      if (this.state.chatId > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/CustomerChat/sendMessageToCustomer",
          headers: authHeader(),
          params: inputParam,
        })
          .then(function(response) {
            var message = response.data.message;
            if (message == "Success") {
              self.setState({
                chkSuggestion: [],
                message: "",
                messageSuggestionData: [],
              });
              self.handleGetChatMessagesList(self.state.chatId);
            }
          })
          .catch((response) => {
            console.log(response, "---handleSendMessageToCustomer");
          });
      }
    }
  }

  ////handlecselect card in card tab
  handleSelectCard(id) {
    this.setState({ selectedCard: id });
  }
  ////handle button down click
  handleDownButtonClick() {
    this.setState({ isDownbtn: !this.state.isDownbtn });
  }
  ////handle on change ck editor
  handleOnChangeCKEditor = (evt) => {
    debugger;
    var message = evt.target.value;
    // var message = evt.editor.getData();
    // var messageSuggestion = message.replace(/<\/?p[^>]*>/g, "");
    // messageSuggestion = messageSuggestion.replace("&nbsp;", "").trim();
    var remLength = 0;
    remLength = 100 - parseInt(message.length);
    if (remLength < 0) {
      message = message.substring(0, 100);
      return false;
    }

    this.setState({
      message,
      remainingCount: remLength + " characters remaining...",
      // messageSuggestion,
    });
  };

  handleMessageSuggestion = (evt) => {
    setTimeout(() => {
      if (this.state.message.length > 0) {
        this.handleGetMessageSuggestionList();
      } else {
        this.setState({
          messageSuggestionData: [],
          chkSuggestion: [],
        });
      }
    }, 1);
  };

  handleGetMessageSuggestionList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/getChatSuggestions",
      headers: authHeader(),
      params: {
        SearchText: this.state.message,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ messageSuggestionData: data, chkSuggestion: [] });
        } else {
          self.setState({ messageSuggestionData: [], chkSuggestion: [] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  handleAppendMessageSuggestion = (e) => {
    this.setState({ toggleTitle: true });
    var startPoint = this.state.message.length;
    var textLength = this.state.message.length;
    var textBefore = this.state.message.substring(0, startPoint);
    var textBeforeArr = textBefore.split(" ");
    textBeforeArr.pop();
    textBeforeArr.push(e.currentTarget.textContent);
    textBefore = textBeforeArr.join(" ");
    var textAfter = this.state.message.substring(startPoint, textLength);
    // alert(textBefore + "....." + textAfter);
    // let clickedInfo = e.currentTarget.innerText;
    let clickedInfo = e.currentTarget.textContent;
    let message = this.state.message;
    //titleSuggValue = textBefore + " " + clickedInfo + " " + textAfter;
    message = "<p>" + textBefore + " " + textAfter + "</p>";

    this.setState({ message });
    // this.searchInput.focus();
  };

  handleSetMessage = (messageData) => {
    this.setState({ messageData });
  };

  ////handle on going chat click
  handleOngoingChatClick = (
    id,
    name,
    count,
    mobileNo,
    customerId,
    ProgramCode,
    StoreID
  ) => {
    if (this.state.messageData.length == 0 || this.state.chatId != id) {
      if (this.state.chatId === id) {
        this.setState({
          storeID: StoreID,
          chatId: id,
          customerName: name,
          mobileNo: mobileNo,
          customerId: customerId,
          programCode: ProgramCode,
          mobileNo: mobileNo,
          message: "",
          messageSuggestionData: [],
          chkSuggestion: [],
          oldCount: count,
          toggle: {
            one: true,
            two: false,
            three: false,
            four: false,
            five: false,
          },
          noOfPeople: "",
          selectSlot: {},
          scheduleModal: false,
          selectedSlot: {},
          activeTab: 1,
          timeSlotData: [],
          searchItem: "",
          searchCardData: [],
          messageData: [],
          isSendClick: false,
          isHistoricalChat: false,
          isDownbtn: true,
        });
        this.handleGetChatMessagesList(id);
      } else {
        this.setState({
          storeID: StoreID,
          chatId: id,
          customerName: name,
          mobileNo: mobileNo,
          customerId: customerId,
          programCode: ProgramCode,
          mobileNo: mobileNo,
          message: "",
          messageSuggestionData: [],
          chkSuggestion: [],
          oldCount: count,
          toggle: {
            one: true,
            two: false,
            three: false,
            four: false,
            five: false,
          },
          noOfPeople: "",
          selectSlot: {},
          scheduleModal: false,
          selectedSlot: {},
          activeTab: 1,
          timeSlotData: [],
          searchItem: "",
          searchCardData: [],
          messageData: [],
          isSendClick: false,
          isHistoricalChat: false,
          isDownbtn: true,
        });
        if (count === 0) {
          this.handleGetChatMessagesList(id);
        } else {
          this.handleMakeAsReadOnGoingChat(id);
        }
      }
    }
  };

  onCloseCardModal = () => {
    this.setState({ cardModal: false, searchCardData: [], selectedCard: 0 });
  };
  onOpenCardModal = () => {
    this.setState({ cardModal: true });
  };
  ////handle search item text change
  handleSearchItemChange = (e) => {
    this.setState({ searchItem: e.target.value, noProductFound: "" });
  };
  ////handle got to message scroll down
  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  ////handle no of people text change
  handleNoOfPeopleChange = (e) => {
    if (Object.keys(this.state.selectedSlot).length !== 0) {
      if (Number(e.target.value) <= this.state.selectedSlot.remaining) {
        if (Number(e.target.value) === 0) {
          this.setState({
            noOfPeopleMax: "Please enter the no of people greater than 0",
          });
        } else {
          this.setState({ noOfPeople: e.target.value, noOfPeopleMax: "" });
        }
      } else {
        if (e.target.value !== "") {
          this.setState({
            noOfPeople: "",
            noOfPeopleMax:
              "Maximum capacity are " + this.state.selectedSlot.remaining,
          });
        } else {
          this.setState({
            noOfPeople: "",
            noOfPeopleMax: "",
          });
        }
      }
    } else {
      this.setState({ isSelectSlot: "Please select time slot" });
    }
  };
  ////handle select slot button
  handleSelectSlot = (data, selectedDate) => {
    this.setState({
      selectedSlot: data,
      selectedDate,
      isSelectSlot: "",
      noOfPeople: "",
      noOfPeopleMax: "",
    });
  };

  onCloseScheduleModal = () => {
    // this.handleScheduleVisit();
    this.setState({
      scheduleModal: false,
      selectedSlot: {},
      selectedDate: "",
      isSelectSlot: "",
      noOfPeople: "",
      noOfPeopleMax: "",
    });
  };
  onOpenScheduleModal = () => {
    this.setState({ scheduleModal: true });
    this.handleGetTimeSlot();
  };

  onCloseRecommendedModal = () => {
    this.setState({ recommendedModal: false });
  };
  onOpenRecommendedModal = () => {
    this.setState({ recommendedModal: true });
  };

  onClosePaymentModal = () => {
    this.setState({ paymentModal: false });
  };
  onOpenPaymentModal = () => {
    this.setState({ paymentModal: true });
  };
  ////handel enter pressed event in card
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.handleSearchChatItemDetails();
    }
  }
  ////handle card send button
  handleSendCard() {
    if (this.state.selectedCard > 0) {
      var messageStringData = document.getElementById(
        "card" + this.state.selectedCard
      ).innerHTML;

      var messagewhatsAppData = this.state.searchCardData.filter(
        (x) => x.itemID === this.state.selectedCard
      );

      var messagewhatsAppContent =
        messagewhatsAppData[0].productName +
        (messagewhatsAppData[0].brandName !== ""
          ? "\nBrand: " + messagewhatsAppData[0].brandName.trim()
          : "") +
        (messagewhatsAppData[0].categoryName !== ""
          ? ", Category: " + messagewhatsAppData[0].categoryName.trim()
          : "") +
        (messagewhatsAppData[0].subCategoryName !== ""
          ? ", Sub Category: " + messagewhatsAppData[0].subCategoryName.trim()
          : "") +
        (messagewhatsAppData[0].color !== ""
          ? ", Color: " + messagewhatsAppData[0].color.trim()
          : "") +
        (messagewhatsAppData[0].size !== ""
          ? ", Size: " + messagewhatsAppData[0].size.trim()
          : "") +
        (messagewhatsAppData[0].uniqueItemCode !== ""
          ? ", Item Code: " + messagewhatsAppData[0].uniqueItemCode.trim()
          : "") +
        (messagewhatsAppData[0].discount !== "" &&
        parseFloat(messagewhatsAppData[0].discount) !== 0
          ? ", Discount: " + messagewhatsAppData[0].discount.trim()
          : "") +
        (messagewhatsAppData[0].price !== "" &&
        parseFloat(messagewhatsAppData[0].price) !== 0
          ? ", Price: " + messagewhatsAppData[0].price.trim()
          : "") +
        "\n" +
        messagewhatsAppData[0].url;

      var imageURL = messagewhatsAppData[0].imageURL;
      // this.setState({ message: messageStringData });
      this.setState({ isSendRecomended: true });
      this.handleSaveChatMessages(
        messageStringData,
        messagewhatsAppContent,
        imageURL
      );
    }
  }

  handleTabClick = (tabIndex, e) => {
    if (tabIndex == 1) {
      this.setState({ isDownbtn: true, activeTab: 1 });
    }

    if (tabIndex == 2) {
      this.setState({ isDownbtn: true, activeTab: 2 });
    }
    if (tabIndex == 3) {
      this.setState({ isDownbtn: true, activeTab: 3 });
    }

    if (tabIndex == 4) {
      this.setState({ isDownbtn: true, activeTab: 4 });
      this.handleGetTimeSlot();
    }
    if (tabIndex == 5) {
      this.setState({ isDownbtn: true, activeTab: 5 });
    }

    this.setState({
      toggle: {
        [e.target.id]: !this.state.toggle[e.target.id],
      },
      noRecommendedFound: "",
      noOfPeopleMax: "",
      noProductFound: "",
      isSelectSlot: "",
    });
  };
  handleSendRecommendedList() {
    let self = this;
    this.setState({ isSendRecomended: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/sendRecommendationsToCustomer",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNumber: this.state.mobileNo,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // self.handleOngoingChatClick(
          //   self.state.chatId,
          //   self.state.customerName,
          //   0,
          //   self.state.mobileNo,
          //   self.state.customerId,
          //   self.state.programCode,
          //   self.state.storeID
          // );
          self.setState({ isSendRecomended: false, noRecommendedFound: "" });
          self.handleGetChatMessagesList(self.state.chatId);
          self.onCloseRecommendedModal();
        } else {
          self.setState({ isSendRecomended: false });
          self.setState({
            messageSuggestionData: [],
            chkSuggestion: [],
            noRecommendedFound: "No Record Found",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  onOpenSuggestionModal(suggestionText, index) {
    if (index > 0) {
      // if (this.state.chkSuggestion.length > 0) {
      // if (this.state.chkSuggestion[index] === 1) {
      //   this.state.chkSuggestion = [];
      //   this.state.chkSuggestion[index] = 0;
      // } else {
      this.state.chkSuggestion = [];
      this.state.chkSuggestion[index] = 1;
      this.setState({
        suggestionModal: true,
        chkSuggestion: this.state.chkSuggestion,
        suggestionText: suggestionText,
      });
      // }
      // } else {
      //   this.state.chkSuggestion[index] = 1;
      // }
      // this.setState({
      //   chkSuggestion: this.state.chkSuggestion,
      // });
    }
  }

  onOpenMobSuggestionModal(suggestionText, index) {
    if (index > 0) {
      // if (this.state.chkSuggestion.length > 0) {
      // if (this.state.chkSuggestion[index] === 1) {
      //   this.state.chkSuggestion = [];
      //   this.state.chkSuggestion[index] = 0;
      // } else {
      this.state.chkSuggestion = [];
      this.state.chkSuggestion[index] = 1;
      this.setState({
        suggestionModalMob: true,
        chkSuggestion: this.state.chkSuggestion,
        suggestionText: suggestionText,
      });
      // }
      // } else {
      //   this.state.chkSuggestion[index] = 1;
      // }
      // this.setState({
      //   chkSuggestion: this.state.chkSuggestion,
      // });
    }
  }

  onCloseSuggestionModal = () => {
    this.setState({ suggestionModal: false });
  };

  onCloseMobSuggestionModal = () => {
    this.setState({ suggestionModalMob: false });
  };

  handleHistTabClick = (e) => {
    this.setState({
      isHistoricalChat: true,
      isDownbtn: false,
    });
    
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ background: "white" }}
        >
          <div className="d-flex">
            <div className="er bell-icon">
              {/* <label className="er-label">ER</label> */}
              <img src={BellIcon} alt="bell icon" />
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
                  <label className="cusheade">{item.data}</label>
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
            <a
              onClick={this.handleChatModalOpen.bind(this)}
              style={{ display: this.state.chatAccess }}
            >
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
            <a href="#!" style={{ display: this.state.notificationAccess }}>
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
            <Link
              to="/store/settings"
              style={{ display: this.state.settingAccess }}
            >
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
            <input
              type="hidden"
              value={this.state.reportAccess}
              id="isReport"
            />
            <a href="#!" className="bitmap5" onClick={this.onOpenModal}>
              {this.state.UserName.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
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
              <div className="col-lg-4 p-0">
                <div className="chatbot-left">
                  <div class="chat-cntr">
                    <input
                      type="text"
                      className="search-customerChatSrch"
                      placeholder="Search"
                      name="Search"
                      maxLength="100"
                      autoComplete="off"
                      value={this.state.searchChat}
                      // onChange={this.handleSearchItemChange.bind(
                      //   this
                      // )}
                      // onKeyPress={this.enterPressed.bind(this)}
                      onChange={this.handleGetOngoingChat.bind(this, "")}
                    />
                    <span
                      // onClick={this.handleSearchChatItemDetails.bind(
                      //   this
                      // )}
                      className="input-group-addon seacrh-img-chatsearch chatsearchtxt-span"
                    >
                      {this.state.searchChat === "" ? (
                        <img
                          src={SearchBlueImg}
                          alt="SearchBlueImg"
                          className="srch-imge"
                          // onClick={this.handleSearchCustomer}
                        />
                      ) : (
                        <img
                          src={CancelBlueImg}
                          alt="SearchBlueImg"
                          className="srch-imge"
                          style={{ width: "35%" }}
                          onClick={this.handleClearChatSearch.bind(this)}
                        />
                      )}
                    </span>
                  </div>
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
                            id={chat.chatID}
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
                              chat.messageCount,
                              chat.mobileNo,
                              chat.customerID,
                              chat.programCode,
                              chat.storeID
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
                                <p
                                  className={"chat-storemng "}
                                  title="Store Manager"
                                >
                                  {chat.storeManagerName}
                                </p>
                                <p
                                  style={{
                                    fontWeight:
                                      chat.messageCount > 0 ? "bold" : "400",
                                  }}
                                >
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
                                <p
                                  style={{
                                    fontWeight:
                                      chat.messageCount > 0 ? "bold" : "400",
                                  }}
                                >
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
                  <div className="chat-hist">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#my-historical-chat"
                        role="tab"
                        aria-controls="my-historical-chat"
                        aria-selected="false"
                        onClick={this.handleHistTabClick.bind(this)}
                      >
                        MY HISTORICAL CHAT
                      </a>
                    </li>
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
                        <div className="chats-count">
                          <img
                            src={ChatBubbleBlue}
                            className="chat-bubble-blue"
                            alt="chat count"
                          />
                          <img
                            src={ChatBubbleWhite}
                            className="chat-bubble-white"
                            alt="chat count"
                          />
                          <span>{this.state.ongoingChatsData.length}</span>
                        </div>
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
                        <div className="chats-count">
                          <img
                            src={ChatBubbleBlue}
                            className="chat-bubble-blue"
                            alt="chat count"
                          />
                          <img
                            src={ChatBubbleWhite}
                            className="chat-bubble-white"
                            alt="chat count"
                          />
                          <span>{this.state.newChatsData.length}</span>
                        </div>
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
                                  chat.messageCount,
                                  chat.mobileNo,
                                  chat.customerID,
                                  chat.programCode,
                                  chat.storeID
                                )}
                              >
                                <div className="chat-face-cntr">
                                  <div className="chat-face-inner-cntr">
                                    <div className="chat-notification-cntr">
                                      {chat.messageCount > 0 ? (
                                        <>
                                          <img
                                            src={ChatCount}
                                            alt="notification image"
                                          />
                                          <span className="chat-notification-count">
                                            {chat.messageCount}
                                          </span>
                                        </>
                                      ) : null}
                                    </div>
                                    {/* <img
                                      src={DummyFace1}
                                      alt="face image"
                                      title={chat.cumtomerName}
                                    /> */}
                                    <span className="chat-initial">
                                      {chat.cumtomerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </span>

                                    {chat.messageCount > 0 ? (
                                      <span className="online"></span>
                                    ) : null}
                                  </div>
                                </div>
                                <span className="face-name">
                                  {chat.cumtomerName.split(" ")[0]}
                                </span>
                                <span className="face-name">
                                  {chat.mobileNo}
                                </span>
                              </div>
                            </div>
                          ))}
                        {this.state.ongoingChatsData.length === 0 && (
                          <p className="no-record">No Records Found !</p>
                        )}
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
                                    <div className="chat-notification-cntr">
                                      {chat.messageCount > 0 ? (
                                        <>
                                          <img
                                            src={ChatCount}
                                            alt="notification image"
                                          />

                                          <span className="chat-notification-count">
                                            {chat.messageCount}
                                          </span>
                                        </>
                                      ) : null}
                                    </div>
                                    {/* <img src={DummyFace1} alt="face image" /> */}
                                    <span className="chat-initial">
                                      {chat.cumtomerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </span>
                                    <span className="online"></span>
                                  </div>
                                </div>
                                <span className="face-name">
                                  {chat.cumtomerName.split(" ")[0]}
                                </span>
                                <span className="face-name">
                                  {chat.mobileNo}
                                </span>
                              </div>
                            </div>
                          ))}
                        {this.state.newChatsData.length === 0 && (
                          <p className="no-record">No Records Found !</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 p-0">
                <div className="chatbot-right">
                  {this.state.isHistoricalChat !== true ? (
                    <div className="row" style={{ margin: "0" }}>
                      <div className="chatdivtitle">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className={"nav-link active chattitletab"}
                              data-toggle="tab"
                              href="#current-chat"
                              role="tab"
                              aria-controls="current-chat"
                              aria-selected="true"
                            >
                              Current Chat
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link chattitletab"
                              data-toggle="tab"
                              href="#recent-chat"
                              role="tab"
                              aria-controls="recent-chat"
                              aria-selected="true"
                            >
                              Recent Chat
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content chattabtitle">
                        <div
                          className="tab-pane fade show active"
                          id="current-chat"
                          role="tabpanel"
                          aria-labelledby="current-chat"
                        >
                          {this.state.isDownbtn ? (
                            <div className="chatcontentRow">
                              <div
                                className="chatcontentDiv"
                                ref={(div) => {
                                  this.messageList = div;
                                }}
                              >
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
                                            <span
                                              className="chat-initial"
                                              alt="face image"
                                              title={
                                                item.byCustomer
                                                  ? item.customerName
                                                  : this.state.UserName
                                              }
                                            >
                                              {item.byCustomer
                                                ? item.customerName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()
                                                : this.state.UserName.split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </span>
                                            {/* <img
                                      src={DummyFace2}
                                      alt="face image"
                                      title={item.customerName}
                                    /> */}
                                          </div>
                                          <div className="chat-trail-chat-cntr">
                                            <p className="chat-trail-chat pd-0">
                                              {ReactHtmlParser(
                                                item.message
                                                  .replace(
                                                    "col-md-2",
                                                    "col-md-4"
                                                  )
                                                  .replace(
                                                    "col-md-10",
                                                    "col-md-8"
                                                  )
                                              )}
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
                            style={{
                              height: !this.state.isDownbtn ? "80%" : "",
                            }}
                          >
                            {this.state.customerName !== "" ? (
                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.toggle.one
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-toggle="tab"
                                    href="#message-tab"
                                    role="tab"
                                    aria-controls="message-tab"
                                    aria-selected="true"
                                    onClick={this.handleTabClick.bind(this, 1)}
                                    id="one"
                                  >
                                    MESSAGE
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.toggle.two
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-toggle="tab"
                                    href="#card-tab"
                                    role="tab"
                                    aria-controls="card-tab"
                                    aria-selected="false"
                                    onClick={this.handleTabClick.bind(this, 2)}
                                    id="two"
                                  >
                                    CARD
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.toggle.three
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-toggle="tab"
                                    href="#recommended-list-tab"
                                    role="tab"
                                    aria-controls="recommended-list-tab"
                                    aria-selected="false"
                                    onClick={this.handleTabClick.bind(this, 3)}
                                    id="three"
                                  >
                                    RECOMMENDED LIST
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.toggle.four
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-toggle="tab"
                                    href="#schedule-visit-tab"
                                    role="tab"
                                    aria-controls="schedule-visit-tab"
                                    aria-selected="false"
                                    // onClick={this.handleGetTimeSlot.bind(this)}
                                    onClick={this.handleTabClick.bind(this, 4)}
                                    id="four"
                                  >
                                    SCHEDULE VISIT
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.toggle.five
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    data-toggle="tab"
                                    href="#generate-payment-link-tab"
                                    role="tab"
                                    aria-controls="generate-payment-link-tab"
                                    aria-selected="false"
                                    onClick={this.handleTabClick.bind(this, 5)}
                                    id="five"
                                  >
                                    GENERATE PAYMENT LINK
                                  </a>
                                </li>
                              </ul>
                            ) : null}
                            <div className="tab-content">
                              {/* --------Message Tab----- */}
                              <div
                                className={
                                  this.state.customerName !== "" &&
                                  this.state.toggle.one
                                    ? "tab-pane fade active show"
                                    : "tab-pane fade"
                                }
                                id="message-tab"
                                role="tabpanel"
                                aria-labelledby="message-tab"
                              >
                                <div className="message-div">
                                  <span className="message-initial">
                                    {this.state.UserName.charAt(
                                      0
                                    ).toUpperCase()}
                                  </span>
                                  <textarea
                                    placeholder="Search to get suggestions..."
                                    value={this.state.message}
                                    onChange={this.handleOnChangeCKEditor.bind(
                                      this
                                    )}
                                  ></textarea>
                                  <p className="cls-charcount">
                                    {this.state.remainingCount}
                                  </p>
                                  {/* <CKEditor
                              onBeforeLoad={(CKEDITOR) =>
                                (CKEDITOR.disableAutoInline = true)
                              }
                              data={this.state.message}
                              onChange={this.handleOnChangeCKEditor.bind(this)}
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
                            /> */}
                                  {this.state.isMessage !== "" && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.isMessage}
                                    </p>
                                  )}
                                  {this.state.messageSuggestionData !== null &&
                                    this.state.messageSuggestionData.length >
                                      0 &&
                                    this.state.messageSuggestionData.length >
                                      0 && (
                                      <div className="suggestions-cntr">
                                        {this.state.messageSuggestionData !==
                                          null &&
                                          this.state.messageSuggestionData.map(
                                            (item, i) => (
                                              <div
                                                className={
                                                  this.state.chkSuggestion[
                                                    i + 1
                                                  ] === 1
                                                    ? "suggestions-tick"
                                                    : ""
                                                }
                                                key={i}
                                                // onClick={this.handleSaveChatMessages.bind(
                                                //   this,
                                                //   item.suggestionText,
                                                //   i + 1,
                                                //   "",
                                                //   ""
                                                // )}
                                                onClick={this.onOpenSuggestionModal.bind(
                                                  this,
                                                  item.suggestionText,
                                                  i + 1
                                                )}
                                                // onClick={this.handleSaveChatMessages.bind(
                                                //   this,
                                                //   item.suggestionText,
                                                //   i
                                                // )}
                                              >
                                                <Tooltip
                                                  placement="left"
                                                  title={item.suggestionText}
                                                >
                                                  <span>
                                                    {item.suggestionText}
                                                  </span>
                                                </Tooltip>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    )}
                                  {/* {this.state.messageSuggestionData !== null &&
                              this.state.messageSuggestionData.length > 0 &&
                              this.state.messageSuggestionData.length > 0 && (
                                <div className="custom-ticket-title-suggestions">
                                  {this.state.messageSuggestionData !== null &&
                                    this.state.messageSuggestionData.map(
                                      (item, i) => (
                                        <span
                                          key={i}
                                          onClick={
                                            this.handleAppendMessageSuggestion
                                          }
                                          title={item.ticketTitleToolTip}
                                        >
                                          {item.ticketTitle}
                                        </span>
                                      )
                                    )}
                                </div>
                              )} */}
                                  {this.state.storeAgentDetail.length !== 0 &&
                                  this.state.storeAgentDetail[0].suggestion ===
                                    1 ? (
                                    <div
                                      className="mobile-ck-send"
                                      onClick={this.handleMessageSuggestion.bind(
                                        this
                                      )}
                                      title={"Search"}
                                    >
                                      {/* <img src={Assign} alt="send img" /> */}
                                      <img src={SuggSearch} alt="send img" />
                                    </div>
                                  ) : null}
                                  {this.state.storeAgentDetail.length !== 0 &&
                                  this.state.storeAgentDetail[0].freeText ===
                                    1 ? (
                                    <div
                                      className="mobile-ck-send-btn"
                                      onClick={this.handleSaveChatMessages.bind(
                                        this,
                                        this.state.message,
                                        0,
                                        "",
                                        ""
                                      )}
                                      title={"Send"}
                                    >
                                      <img src={Assign} alt="send img" />
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              {/* --------Card Tab----- */}
                              <div
                                className={
                                  this.state.toggle.two
                                    ? "tab-pane fade active show"
                                    : "tab-pane fade"
                                }
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
                                      value={this.state.searchItem}
                                      onChange={this.handleSearchItemChange.bind(
                                        this
                                      )}
                                      onKeyPress={this.enterPressed.bind(this)}
                                    />
                                    <span
                                      onClick={this.handleSearchChatItemDetails.bind(
                                        this
                                      )}
                                      className="input-group-addon seacrh-img-addsearch searchtxt-span"
                                    >
                                      <img
                                        src={SearchBlueImg}
                                        alt="SearchBlueImg"
                                        className="srch-imge"
                                        // onClick={this.handleSearchCustomer}
                                      />
                                    </span>
                                    {this.state.searchCardData.length === 0 && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.noProductFound}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="container p-0">
                                  <div
                                    className="row product-card"
                                    style={{
                                      height: !this.state.isDownbtn
                                        ? "100%"
                                        : "",
                                      maxHeight: !this.state.isDownbtn
                                        ? "600px"
                                        : "",
                                    }}
                                  >
                                    {this.state.searchCardData !== null &&
                                      this.state.searchCardData.map(
                                        (item, i) => {
                                          return (
                                            <div
                                              className="col-md-6"
                                              key={i}
                                              onClick={this.handleSelectCard.bind(
                                                this,
                                                item.itemID
                                              )}
                                            >
                                              {item.itemID ===
                                              this.state.selectedCard ? (
                                                <div className="selectdot">
                                                  <img
                                                    src={CardTick}
                                                    alt={"select-card"}
                                                  />
                                                </div>
                                              ) : null}
                                              <div
                                                className="card"
                                                id={"card" + item.itemID}
                                              >
                                                <div className="card-body position-relative">
                                                  {/* <div className="container"> */}
                                                  <div
                                                    className="row"
                                                    style={{
                                                      margin: "0",
                                                    }}
                                                  >
                                                    <div
                                                      className="col-md-4 mb-md-0 mb-2"
                                                      style={{
                                                        alignSelf: "center",
                                                      }}
                                                    >
                                                      <img
                                                        className="chat-product-img"
                                                        src={item.imageURL}
                                                        alt="Product Image"
                                                        title={item.productName}
                                                      />
                                                    </div>
                                                    <div className="col-md-8 bkcprdt">
                                                      <div>
                                                        <label className="chat-product-name">
                                                          {item.productName}
                                                        </label>
                                                      </div>
                                                      <div>
                                                        {item.brandName !==
                                                        "" ? (
                                                          <label className="chat-product-code">
                                                            Brand :
                                                            {" " +
                                                              item.brandName}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.categoryName !==
                                                        "" ? (
                                                          <label className="chat-product-code">
                                                            Category :
                                                            {" " +
                                                              item.categoryName}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.subCategoryName !==
                                                        "" ? (
                                                          <label className="chat-product-code">
                                                            SubCategory :
                                                            {" " +
                                                              item.subCategoryName}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.color !== "" ? (
                                                          <label className="chat-product-code">
                                                            Color :
                                                            {" " + item.color}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.size !== "" ? (
                                                          <label className="chat-product-code">
                                                            Size :
                                                            {" " + item.size}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.uniqueItemCode !==
                                                        "" ? (
                                                          <label className="chat-product-code">
                                                            Item Code :
                                                            {" " +
                                                              item.uniqueItemCode}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.discount !== "" &&
                                                        parseFloat(
                                                          item.discount
                                                        ) !== 0 ? (
                                                          <label className="chat-product-code">
                                                            Discount :
                                                            {" " +
                                                              item.discount}
                                                            {/* {item.alternativeText} */}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        {item.price !== "" &&
                                                        parseFloat(
                                                          item.price
                                                        ) !== 0 ? (
                                                          <label className="chat-product-prize">
                                                            Price :
                                                            {" " + item.price}
                                                          </label>
                                                        ) : null}
                                                      </div>
                                                      <div>
                                                        <a
                                                          href={item.url}
                                                          target="_blank"
                                                          className="chat-product-url"
                                                        >
                                                          {item.url}
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>
                                  {this.state.searchCardData.length > 0 ? (
                                    <div className="row m-0">
                                      <button
                                        className="storeUpbtn"
                                        onClick={this.handleDownButtonClick.bind(
                                          this
                                        )}
                                      >
                                        {this.state.isDownbtn ? (
                                          <img
                                            src={DownBlue}
                                            alt="down-arrow"
                                          />
                                        ) : (
                                          <img src={UpBlue} alt="up-arrow" />
                                        )}
                                      </button>
                                      <button
                                        className="butn"
                                        onClick={this.handleSendCard.bind(this)}
                                      >
                                        Send
                                        <img
                                          src={SendUp}
                                          alt="send"
                                          className="send-up float-none"
                                        />
                                        {this.state.isSendRecomended ? (
                                          <FontAwesomeIcon
                                            icon={faCircleNotch}
                                            className="circular-loader ml-2"
                                            spin
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              {/* --------Recommended List Tab----- */}
                              <div
                                className={
                                  this.state.toggle.three
                                    ? "tab-pane fade active show"
                                    : "tab-pane fade"
                                }
                                id="recommended-list-tab"
                                role="tabpanel"
                                aria-labelledby="recommended-list-tab"
                              >
                                <div className="recommended-cntr">
                                  <button
                                    disabled={this.state.isSendRecomended}
                                    className="butn"
                                    onClick={this.handleSendRecommendedList.bind(
                                      this
                                    )}
                                  >
                                    Send Recommended List
                                    <img
                                      src={SendUp}
                                      alt="send"
                                      className="send-up float-none"
                                    />
                                    {this.state.isSendRecomended ? (
                                      <FontAwesomeIcon
                                        icon={faCircleNotch}
                                        className="circular-loader ml-2"
                                        spin
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </button>

                                  <p
                                    style={{
                                      color: "red",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {this.state.noRecommendedFound}
                                  </p>
                                </div>
                              </div>
                              {/* --------Schedule Visit Tab----- */}
                              <div
                                className={
                                  this.state.toggle.four
                                    ? "tab-pane fade active show"
                                    : "tab-pane fade"
                                }
                                id="schedule-visit-tab"
                                role="tabpanel"
                                aria-labelledby="schedule-visit-tab"
                              >
                                {this.state.availableSlot > 0 ? (
                                  <div className="row">
                                    <div className="col-md-7 schedule-left-cntr">
                                      {this.state.timeSlotData !== null
                                        ? this.state.timeSlotData.map(
                                            (item, i) => {
                                              return item.alreadyScheduleDetails
                                                .length > 0 ? (
                                                <div key={i}>
                                                  <label className="s-lable">
                                                    {item.day}:{item.dates}
                                                  </label>
                                                  <div className="schedule-btn-outer-cntr">
                                                    <div
                                                      className="selectdot-blue selectdot-blue-left"
                                                      onClick={this.handleScrollLeft.bind(
                                                        this,
                                                        i
                                                      )}
                                                    >
                                                      <img
                                                        src={SchRight}
                                                        alt="right arrow"
                                                      />
                                                    </div>
                                                    <div
                                                      className="schedule-btn-cntr"
                                                      id={
                                                        "schedule-btn-cntr" + i
                                                      }
                                                    >
                                                      {item
                                                        .alreadyScheduleDetails
                                                        .length > 0 &&
                                                        item.alreadyScheduleDetails.map(
                                                          (data, k) => {
                                                            var selectSlot = false;
                                                            if (
                                                              this.state
                                                                .timeSlotData[i]
                                                                .alreadyScheduleDetails[
                                                                k
                                                              ] ===
                                                              this.state
                                                                .selectedSlot
                                                            ) {
                                                              selectSlot = true;
                                                            }

                                                            if (
                                                              data.maxCapacity ==
                                                              data.visitedCount
                                                            ) {
                                                              return (
                                                                <Tooltip
                                                                  placement="left"
                                                                  title={
                                                                    data.remaining +
                                                                    " MORE PEOPLE LEFT"
                                                                  }
                                                                >
                                                                  <button
                                                                    key={k}
                                                                    className="s-red-active"
                                                                    style={{
                                                                      cursor:
                                                                        "no-drop",
                                                                    }}
                                                                  >
                                                                    {
                                                                      data.timeSlot
                                                                    }
                                                                  </button>
                                                                </Tooltip>
                                                              );
                                                            }
                                                            if (
                                                              // data.remaining <
                                                              // data.maxCapacity
                                                              data.visitedCount >=
                                                              (1 / 2) *
                                                                data.maxCapacity
                                                            ) {
                                                              return (
                                                                <Tooltip
                                                                  placement="left"
                                                                  title={
                                                                    data.remaining +
                                                                    " MORE PEOPLE LEFT"
                                                                  }
                                                                >
                                                                  <button
                                                                    key={k}
                                                                    className={
                                                                      selectSlot
                                                                        ? "s-yellow-active"
                                                                        : "s-yellow-btn"
                                                                    }
                                                                    onClick={this.handleSelectSlot.bind(
                                                                      this,
                                                                      data,
                                                                      item.dates
                                                                    )}
                                                                  >
                                                                    {
                                                                      data.timeSlot
                                                                    }
                                                                    {selectSlot ? (
                                                                      <img
                                                                        className="s-img-select"
                                                                        src={
                                                                          CircleRight
                                                                        }
                                                                        alt="circle-right"
                                                                      />
                                                                    ) : null}
                                                                  </button>
                                                                </Tooltip>
                                                              );
                                                            }
                                                            if (
                                                              // data.maxCapacity ===
                                                              // data.remaining
                                                              data.visitedCount <
                                                              (1 / 2) *
                                                                data.maxCapacity
                                                            ) {
                                                              return (
                                                                <Tooltip
                                                                  placement="left"
                                                                  title={
                                                                    data.remaining +
                                                                    " MORE PEOPLE LEFT"
                                                                  }
                                                                >
                                                                  <button
                                                                    key={k}
                                                                    className={
                                                                      selectSlot
                                                                        ? "s-green-active"
                                                                        : "s-green-btn"
                                                                    }
                                                                    onClick={this.handleSelectSlot.bind(
                                                                      this,
                                                                      data,
                                                                      item.dates
                                                                    )}
                                                                  >
                                                                    {
                                                                      data.timeSlot
                                                                    }
                                                                    {selectSlot ? (
                                                                      <img
                                                                        className="s-img-select"
                                                                        src={
                                                                          CircleRight
                                                                        }
                                                                        alt="circle-right"
                                                                      />
                                                                    ) : null}
                                                                  </button>
                                                                </Tooltip>
                                                              );
                                                            }
                                                          }
                                                        )}
                                                    </div>
                                                    <div
                                                      className="selectdot-blue"
                                                      onClick={this.handleScrollRight.bind(
                                                        this,
                                                        i
                                                      )}
                                                    >
                                                      <img
                                                        src={SchRight}
                                                        alt="right arrow"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null;
                                            }
                                          )
                                        : null}
                                    </div>
                                    <div className="col-md-5">
                                      <div className="schedule-right-outer-cntr">
                                        <div className="schedule-right-cntr">
                                          <div>
                                            <label className="s-lable">
                                              Selected Slot
                                            </label>
                                            {Object.keys(
                                              this.state.selectedSlot
                                            ).length !== 0 ? (
                                              <button
                                                className={
                                                  this.state.selectedSlot
                                                    .visitedCount <
                                                  (1 / 2) *
                                                    this.state.selectedSlot
                                                      .maxCapacity
                                                    ? // this.state.selectedSlot.maxCapacity ==
                                                      //   this.state.selectedSlot.remaining
                                                      "s-green-btn s-green-active select-slot-cntr mx-0"
                                                    : this.state.selectedSlot
                                                        .visitedCount <
                                                      this.state.selectedSlot
                                                        .maxCapacity
                                                    ? "s-yellow-btn s-yellow-active select-slot-cntr mx-0"
                                                    : "s-yellow-btn s-yellow-active select-slot-cntr mx-0"
                                                }
                                              >
                                                {
                                                  this.state.selectedSlot
                                                    .timeSlot
                                                }
                                                <img
                                                  className="s-img-select"
                                                  src={CircleRight}
                                                  alt="circle-right"
                                                />
                                              </button>
                                            ) : null}
                                            {this.state.isSelectSlot !== "" && (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                {this.state.isSelectSlot}
                                              </p>
                                            )}
                                          </div>
                                          <div>
                                            <label className="s-lable">
                                              No of People
                                            </label>
                                            <input
                                              type="text"
                                              value={this.state.noOfPeople}
                                              onChange={this.handleNoOfPeopleChange.bind(
                                                this
                                              )}
                                            />
                                            {this.state.noOfPeopleMax !==
                                              "" && (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                  width: "131px",
                                                }}
                                              >
                                                {this.state.noOfPeopleMax}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        <button
                                          className={
                                            this.state.isSendClick
                                              ? "butn ml-auto mt-4 isSendClick-dsle"
                                              : "butn ml-auto mt-4"
                                          }
                                          onClick={this.handleScheduleVisit.bind(
                                            this
                                          )}
                                        >
                                          Send
                                          <img
                                            src={SendUp}
                                            alt="send"
                                            className="send-up float-none"
                                          />
                                          {this.state.isSendRecomended ? (
                                            <FontAwesomeIcon
                                              icon={faCircleNotch}
                                              className="circular-loader ml-2"
                                              spin
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="slot-span">
                                      No slot added for this store
                                    </span>
                                  </div>
                                )}
                              </div>
                              {/* --------Generate Payment Link Tab----- */}
                              <div
                                className={
                                  this.state.toggle.five
                                    ? "tab-pane fade active show"
                                    : "tab-pane fade"
                                }
                                id="generate-payment-link-tab"
                                role="tabpanel"
                                aria-labelledby="generate-payment-link-tab"
                              >
                                <div
                                  className="input-group searchtxt-new"
                                  style={{ background: "none" }}
                                >
                                  <form
                                    style={{ width: "100%" }}
                                    // onSubmit={this.handleSearchChatItemDetails.bind(
                                    //   this
                                    // )}
                                  >
                                    <input
                                      type="text"
                                      className="search-customerAddSrch searchtxt"
                                      placeholder="Search Order Id"
                                      name="Search"
                                      maxLength="100"
                                      autoComplete="off"
                                      // value={this.state.searchItem}
                                      // onChange={this.handleSearchItemChange.bind(
                                      //   this
                                      // )}
                                    />
                                    <span
                                      // onClick={this.handleSearchChatItemDetails.bind(
                                      //   this
                                      // )}
                                      className="input-group-addon seacrh-img-addsearch searchtxt-span"
                                    >
                                      <img
                                        src={SearchBlueImg}
                                        alt="SearchBlueImg"
                                        className="srch-imge"
                                        // onClick={this.handleSearchCustomer}
                                      />
                                    </span>
                                  </form>
                                </div>
                                <div className="payment-details">
                                  <label>Amount</label>
                                  <span>INR 1299</span>
                                </div>
                                <div className="payment-link-butn">
                                  <button className="butn">
                                    Send Payment Link
                                    <img
                                      src={SendUp}
                                      alt="send"
                                      className="send-up"
                                    />
                                  </button>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="chatcontentdivtab chat-tabs-mobile"
                            style={{
                              height: !this.state.isDownbtn ? "80%" : "",
                            }}
                          >
                            <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.toggle.one
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                  data-toggle="tab"
                                  href="#message-tab"
                                  role="tab"
                                  aria-controls="message-tab"
                                  aria-selected="true"
                                  id="one"
                                >
                                  MESSAGE
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.toggle.two
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                  data-toggle="tab"
                                  href="#card-tab"
                                  role="tab"
                                  aria-controls="card-tab"
                                  aria-selected="false"
                                  onClick={this.onOpenCardModal}
                                  id="two"
                                >
                                  CARD
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.toggle.three
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                  data-toggle="tab"
                                  href="#recommended-list-tab"
                                  role="tab"
                                  aria-controls="recommended-list-tab"
                                  aria-selected="false"
                                  onClick={this.onOpenRecommendedModal}
                                  id="three"
                                >
                                  RECOMMENDED LIST
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.toggle.four
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                  data-toggle="tab"
                                  href="#schedule-visit-tab"
                                  role="tab"
                                  aria-controls="schedule-visit-tab"
                                  aria-selected="false"
                                  onClick={this.onOpenScheduleModal}
                                  id="four"
                                >
                                  SCHEDULE VISIT
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.toggle.five
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                  data-toggle="tab"
                                  href="#generate-payment-link-tab"
                                  role="tab"
                                  aria-controls="generate-payment-link-tab"
                                  aria-selected="false"
                                  onClick={this.onOpenPaymentModal}
                                  id="five"
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
                                  <span className="message-initial">
                                    {this.state.UserName.charAt(
                                      0
                                    ).toUpperCase()}
                                  </span>
                                  <textarea
                                    placeholder="Search to get suggestions..."
                                    value={this.state.message}
                                    onChange={this.handleOnChangeCKEditor.bind(
                                      this
                                    )}
                                  ></textarea>
                                  <p
                                    className="cls-charcount"
                                    style={{ fontSize: "x-small" }}
                                  >
                                    {this.state.remainingCount}
                                  </p>

                                  {this.state.messageSuggestionData !== null &&
                                    this.state.messageSuggestionData.length >
                                      0 &&
                                    this.state.messageSuggestionData.length >
                                      0 && (
                                      <div className="suggestions-cntr">
                                        {this.state.messageSuggestionData !==
                                          null &&
                                          this.state.messageSuggestionData.map(
                                            (item, i) => (
                                              <div
                                                className={
                                                  this.state.chkSuggestion[
                                                    i + 1
                                                  ] === 1
                                                    ? "suggestions-tick"
                                                    : ""
                                                }
                                                key={i}
                                                // onClick={this.handleSaveChatMessages.bind(
                                                //   this,
                                                //   item.suggestionText,
                                                //   i
                                                // )}
                                                // onClick={this.handleSaveChatMessages.bind(
                                                //   this,
                                                //   item.suggestionText,
                                                //   i + 1,
                                                //   "",
                                                //   ""
                                                // )}

                                                onClick={this.onOpenMobSuggestionModal.bind(
                                                  this,
                                                  item.suggestionText,
                                                  i + 1
                                                )}
                                              >
                                                <Tooltip
                                                  placement="left"
                                                  title={item.suggestionText}
                                                >
                                                  <span>
                                                    {item.suggestionText}
                                                  </span>
                                                </Tooltip>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    )}

                                  {this.state.storeAgentDetail.length !== 0 &&
                                  this.state.storeAgentDetail[0].suggestion ===
                                    1 ? (
                                    <div
                                      className="mobile-ck-send"
                                      onClick={this.handleMessageSuggestion.bind(
                                        this
                                      )}
                                      title={"Search"}
                                    >
                                      {/* <img src={Assign} alt="send img" /> */}
                                      <img src={SuggSearch} alt="send img" />
                                    </div>
                                  ) : null}
                                  {this.state.storeAgentDetail.length !== 0 &&
                                  this.state.storeAgentDetail[0].freeText ===
                                    1 ? (
                                    <div
                                      className="mobile-ck-send-btn"
                                      onClick={this.handleSaveChatMessages.bind(
                                        this,
                                        this.state.message,
                                        0,
                                        "",
                                        ""
                                      )}
                                      title={"Send"}
                                    >
                                      <img src={Assign} alt="send img" />
                                    </div>
                                  ) : null}
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
                                      onChange={this.handleSearchItemChange.bind(
                                        this
                                      )}
                                      onKeyPress={this.enterPressed.bind(this)}
                                    />
                                    <span
                                      onClick={this.handleSearchChatItemDetails.bind(
                                        this
                                      )}
                                      className="input-group-addon seacrh-img-addsearch searchtxt-span"
                                    >
                                      <img
                                        src={SearchBlueImg}
                                        alt="SearchBlueImg"
                                        className="srch-imge"
                                        // onClick={this.handleSearchCustomer}
                                      />
                                    </span>
                                    {this.state.searchCardData.length === 0 && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.noProductFound}
                                      </p>
                                    )}
                                  </div>
                                  <div className="product-card">
                                    {this.state.searchCardData !== null &&
                                      this.state.searchCardData.map(
                                        (item, i) => {
                                          return (
                                            <div
                                              className="card"
                                              key={i}
                                              onClick={this.handleSelectCard.bind(
                                                this,
                                                item.itemID
                                              )}
                                            >
                                              <div className="card-body position-relative">
                                                {item.itemID ===
                                                this.state.selectedCard ? (
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
                                                      src={item.imageURL}
                                                      alt="Product Image"
                                                      title={item.productName}
                                                    />
                                                  </div>
                                                  <div className="bkcprdt">
                                                    <label className="chat-product-name">
                                                      {item.productName}
                                                    </label>
                                                    {item.brandName !== "" ? (
                                                      <label className="chat-product-code">
                                                        Brand :
                                                        {" " + item.brandName}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.categoryName !==
                                                    "" ? (
                                                      <label className="chat-product-code">
                                                        Category :
                                                        {" " +
                                                          item.categoryName}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.subCategoryName !==
                                                    "" ? (
                                                      <label className="chat-product-code">
                                                        SubCategory :
                                                        {" " +
                                                          item.subCategoryName}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.color !== "" ? (
                                                      <label className="chat-product-code">
                                                        Color :
                                                        {" " + item.color}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.size !== "" ? (
                                                      <label className="chat-product-code">
                                                        Size :{" " + item.size}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.uniqueItemCode !==
                                                    "" ? (
                                                      <label className="chat-product-code">
                                                        Item Code :
                                                        {" " +
                                                          item.uniqueItemCode}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.discount !== "" ? (
                                                      <label className="chat-product-code">
                                                        Discount :
                                                        {" " + item.discount}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.categoryName !==
                                                    "" ? (
                                                      <label className="chat-product-code">
                                                        Category :
                                                        {" " +
                                                          item.categoryName}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.subCategoryName !==
                                                    "" ? (
                                                      <label className="chat-product-code">
                                                        SubCategory :
                                                        {" " +
                                                          item.subCategoryName}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.color !== "" ? (
                                                      <label className="chat-product-code">
                                                        Color :
                                                        {" " + item.color}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.size !== "" ? (
                                                      <label className="chat-product-code">
                                                        Size :{" " + item.size}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.uniqueItemCode !==
                                                    "" ? (
                                                      <label className="chat-product-code">
                                                        Item Code :
                                                        {" " +
                                                          item.uniqueItemCode}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.discount !== "" &&
                                                    parseFloat(
                                                      item.discount
                                                    ) !== 0 ? (
                                                      <label className="chat-product-code">
                                                        Discount :
                                                        {" " + item.discount}
                                                        {/* {item.alternativeText} */}
                                                      </label>
                                                    ) : null}

                                                    {item.price !== "" &&
                                                    parseFloat(item.price) !==
                                                      0 ? (
                                                      <label className="chat-product-prize">
                                                        Price :
                                                        {" " + item.price}
                                                      </label>
                                                    ) : null}

                                                    <label className="chat-product-url">
                                                      {item.url}
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
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
                                      onClick={this.handleSendCard.bind(this)}
                                    >
                                      Send
                                      <img
                                        src={SendUp}
                                        alt="send"
                                        className="send-up float-none"
                                      />
                                      {this.state.isSendRecomended ? (
                                        <FontAwesomeIcon
                                          icon={faCircleNotch}
                                          className="circular-loader ml-2"
                                          spin
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                              {/* --------Recommended List Modal----- */}
                              <Modal
                                open={this.state.recommendedModal}
                                onClose={this.onCloseRecommendedModal}
                                center
                                modalId="mobile-tabs-popup"
                                overlayId="mobile-tabs-overlay"
                                classNames={{
                                  modal: "recommended-list-popup",
                                }}
                              >
                                <div className="recommended-cntr m-0 h-100">
                                  <div className="chat-btn-cntr">
                                    <button
                                      className="butn"
                                      onClick={this.handleSendRecommendedList.bind(
                                        this
                                      )}
                                    >
                                      Send Recommended List
                                      <img
                                        src={SendUp}
                                        alt="send"
                                        className="send-up"
                                      />
                                      {this.state.isSendRecomended ? (
                                        <FontAwesomeIcon
                                          icon={faCircleNotch}
                                          className="circular-loader ml-2"
                                          spin
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </button>
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.noRecommendedFound}
                                    </p>
                                    <button
                                      className="butn-inv"
                                      onClick={this.onCloseRecommendedModal}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                              {/* -------- Schedule Visit Modal ----- */}
                              <Modal
                                open={this.state.scheduleModal}
                                onClose={this.onCloseScheduleModal}
                                center
                                modalId="mobile-tabs-popup"
                                overlayId="mobile-tabs-overlay"
                                classNames={{
                                  modal: "schedule-visit-popup",
                                }}
                              >
                                {this.state.availableSlot > 0 ? (
                                  <div className="schedule-mobile-cntr">
                                    <div>
                                      <div className="schedule-left-outer-cntr">
                                        <div className="schedule-left-cntr">
                                          {this.state.timeSlotData !== null
                                            ? this.state.timeSlotData.map(
                                                (item, i) => {
                                                  return item
                                                    .alreadyScheduleDetails
                                                    .length > 0 ? (
                                                    <div key={i}>
                                                      <label className="s-lable">
                                                        {item.day}:{item.dates}
                                                      </label>
                                                      <div className="schedule-btn-outer-cntr">
                                                        <div className="schedule-btn-cntr">
                                                          {item
                                                            .alreadyScheduleDetails
                                                            .length > 0 &&
                                                            item.alreadyScheduleDetails.map(
                                                              (data, k) => {
                                                                var selectSlot = false;
                                                                if (
                                                                  this.state
                                                                    .timeSlotData[
                                                                    i
                                                                  ]
                                                                    .alreadyScheduleDetails[
                                                                    k
                                                                  ] ===
                                                                  this.state
                                                                    .selectedSlot
                                                                ) {
                                                                  selectSlot = true;
                                                                }

                                                                if (
                                                                  data.maxCapacity ==
                                                                  data.visitedCount
                                                                ) {
                                                                  return (
                                                                    <Tooltip
                                                                      placement="left"
                                                                      title={
                                                                        data.remaining +
                                                                        " MORE PEOPLE LEFT"
                                                                      }
                                                                    >
                                                                      <button
                                                                        key={k}
                                                                        className="s-red-active"
                                                                        style={{
                                                                          cursor:
                                                                            "no-drop",
                                                                        }}
                                                                      >
                                                                        {
                                                                          data.timeSlot
                                                                        }
                                                                      </button>
                                                                    </Tooltip>
                                                                  );
                                                                }
                                                                if (
                                                                  data.visitedCount >=
                                                                  (1 / 2) *
                                                                    data.maxCapacity
                                                                ) {
                                                                  return (
                                                                    <Tooltip
                                                                      placement="left"
                                                                      title={
                                                                        data.remaining +
                                                                        " MORE PEOPLE LEFT"
                                                                      }
                                                                    >
                                                                      <button
                                                                        key={k}
                                                                        className={
                                                                          selectSlot
                                                                            ? "s-yellow-active"
                                                                            : "s-yellow-btn"
                                                                        }
                                                                        onClick={this.handleSelectSlot.bind(
                                                                          this,
                                                                          data,
                                                                          item.dates
                                                                        )}
                                                                      >
                                                                        {
                                                                          data.timeSlot
                                                                        }
                                                                        {selectSlot ? (
                                                                          <img
                                                                            className="s-img-select"
                                                                            src={
                                                                              CircleRight
                                                                            }
                                                                            alt="circle-right"
                                                                          />
                                                                        ) : null}
                                                                      </button>
                                                                    </Tooltip>
                                                                  );
                                                                }
                                                                if (
                                                                  data.visitedCount <
                                                                  (1 / 2) *
                                                                    data.maxCapacity
                                                                ) {
                                                                  return (
                                                                    <Tooltip
                                                                      placement="left"
                                                                      title={
                                                                        data.remaining +
                                                                        " MORE PEOPLE LEFT"
                                                                      }
                                                                    >
                                                                      <button
                                                                        key={k}
                                                                        className={
                                                                          selectSlot
                                                                            ? "s-green-active"
                                                                            : "s-green-btn"
                                                                        }
                                                                        onClick={this.handleSelectSlot.bind(
                                                                          this,
                                                                          data,
                                                                          item.dates
                                                                        )}
                                                                      >
                                                                        {
                                                                          data.timeSlot
                                                                        }
                                                                        {selectSlot ? (
                                                                          <img
                                                                            className="s-img-select"
                                                                            src={
                                                                              CircleRight
                                                                            }
                                                                            alt="circle-right"
                                                                          />
                                                                        ) : null}
                                                                      </button>
                                                                    </Tooltip>
                                                                  );
                                                                }
                                                              }
                                                            )}
                                                        </div>
                                                        <div className="selectdot-blue">
                                                          <img
                                                            src={SchRight}
                                                            alt="right arrow"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ) : null;
                                                }
                                              )
                                            : null}
                                        </div>
                                      </div>
                                      <div className="schedule-right-cntr">
                                        <div>
                                          <label className="s-lable">
                                            Selected Slot
                                          </label>
                                          {Object.keys(this.state.selectedSlot)
                                            .length !== 0 ? (
                                            <button
                                              className={
                                                this.state.selectedSlot
                                                  .visitedCount <
                                                (1 / 2) *
                                                  this.state.selectedSlot
                                                    .maxCapacity
                                                  ? // this.state.selectedSlot.maxCapacity ==
                                                    //   this.state.selectedSlot.remaining
                                                    "s-green-btn s-green-active select-slot-cntr mx-0"
                                                  : this.state.selectedSlot
                                                      .visitedCount <
                                                    this.state.selectedSlot
                                                      .maxCapacity
                                                  ? "s-yellow-btn s-yellow-active select-slot-cntr mx-0"
                                                  : "s-yellow-btn s-yellow-active select-slot-cntr mx-0"
                                              }
                                            >
                                              {this.state.selectedSlot.timeSlot}
                                              <img
                                                className="s-img-select"
                                                src={CircleRight}
                                                alt="circle-right"
                                              />
                                            </button>
                                          ) : null}
                                          {this.state.isSelectSlot !== "" && (
                                            <p
                                              style={{
                                                color: "red",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {this.state.isSelectSlot}
                                            </p>
                                          )}
                                        </div>
                                        <div>
                                          <label className="s-lable">
                                            No of People
                                          </label>
                                          <input
                                            type="text"
                                            value={this.state.noOfPeople}
                                            onChange={this.handleNoOfPeopleChange.bind(
                                              this
                                            )}
                                          />
                                          {this.state.noOfPeopleMax !== "" && (
                                            <p
                                              style={{
                                                color: "red",
                                                marginBottom: "0px",
                                                width: "131px",
                                              }}
                                            >
                                              {this.state.noOfPeopleMax}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="chat-btn-cntr">
                                      <button
                                        className="butn-inv"
                                        onClick={this.onCloseScheduleModal}
                                      >
                                        Close
                                      </button>
                                      <button
                                        className="butn"
                                        onClick={this.handleScheduleVisit.bind(
                                          this
                                        )}
                                      >
                                        Send
                                        <img
                                          src={SendUp}
                                          alt="send"
                                          className="send-up float-none"
                                        />
                                        {this.state.isSendRecomended ? (
                                          <FontAwesomeIcon
                                            icon={faCircleNotch}
                                            className="circular-loader ml-2"
                                            spin
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="slot-span">
                                      No slot added for this store
                                    </span>
                                  </div>
                                )}
                              </Modal>
                              {/* -------- Generate Payment Link Modal ----- */}
                              <Modal
                                open={this.state.paymentModal}
                                onClose={this.onClosePaymentModal}
                                center
                                modalId="mobile-tabs-popup"
                                overlayId="mobile-tabs-overlay"
                                classNames={{
                                  modal: "recommended-list-popup",
                                }}
                              >
                                <div className="schedule-mobile-cntr p-0">
                                  <div>
                                    <div className="mobile-chat-popup">
                                      <div
                                        className="input-group searchtxt-new pr-0"
                                        style={{ background: "none" }}
                                      >
                                        <input
                                          type="text"
                                          className="search-customerAddSrch searchtxt"
                                          placeholder="Search Order Id"
                                          name="Search"
                                          maxLength="100"
                                          autoComplete="off"
                                          // value={this.state.searchItem}
                                          // onChange={this.handleSearchItemChange.bind(
                                          //   this
                                          // )}
                                        />
                                        <span
                                          // onClick={this.handleSearchChatItemDetails.bind(
                                          //   this
                                          // )}
                                          className="input-group-addon seacrh-img-addsearch searchtxt-span"
                                        >
                                          <img
                                            src={SearchBlueImg}
                                            alt="SearchBlueImg"
                                            className="srch-imge"
                                            // onClick={this.handleSearchCustomer}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="payment-details">
                                      <label>Amount</label>
                                      <span>INR 1299</span>
                                    </div>
                                  </div>
                                  <div className="chat-btn-cntr">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onClosePaymentModal}
                                    >
                                      Close
                                    </button>
                                    <button
                                      className="butn"
                                      onClick={this.onClosePaymentModal}
                                    >
                                      Send
                                      <img
                                        src={SendUp}
                                        alt="send"
                                        className="send-up"
                                      />
                                      {this.state.isSendRecomended ? (
                                        <FontAwesomeIcon
                                          icon={faCircleNotch}
                                          className="circular-loader ml-2"
                                          spin
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                              {/*Message Suggestion Modal*/}
                              <Modal
                                open={this.state.suggestionModal}
                                onClose={this.onCloseSuggestionModal}
                                center
                                modalId="desktop-conf-popup"
                                overlayId="mobile-tabs-overlay"
                              >
                                <div className="">
                                  <div
                                    className="input-group"
                                    style={{ background: "none" }}
                                  >
                                    <p className="cls-p-conf">
                                      Are you sure & want to send?
                                    </p>
                                  </div>
                                  <hr
                                    style={{ borderTop: "1px solid #bbb" }}
                                  ></hr>
                                  <p className="cls-p-sugg">
                                    {this.state.suggestionText}
                                  </p>
                                  <div className="chat-btn-conf">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onCloseSuggestionModal}
                                    >
                                      No
                                    </button>
                                    <button
                                      className="butn"
                                      onClick={this.handleSaveChatMessages.bind(
                                        this,
                                        this.state.suggestionText,
                                        "",
                                        ""
                                      )}
                                    >
                                      Yes
                                      <img
                                        src={SendUp}
                                        alt="send"
                                        className="send-up float-none"
                                      />
                                      {this.state.isSendRecomended ? (
                                        <FontAwesomeIcon
                                          icon={faCircleNotch}
                                          className="circular-loader ml-2"
                                          spin
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                              {/* Mobile View Message Suggestion*/}
                              <Modal
                                open={this.state.suggestionModalMob}
                                onClose={this.onCloseMobSuggestionModal}
                                center
                                modalId="desktop-conf-mob-popup"
                                overlayId="mobile-tabs-overlay"
                              >
                                <div className="">
                                  <div
                                    className="input-group"
                                    style={{ background: "none" }}
                                  >
                                    <p className="cls-p-conf-mob">
                                      Are you sure & want to send?
                                    </p>
                                  </div>
                                  <hr
                                    style={{ borderTop: "1px solid #bbb" }}
                                  ></hr>
                                  <p className="cls-p-sugg">
                                    {this.state.suggestionText}
                                  </p>
                                  <div className="chat-btn-conf-mob">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onCloseMobSuggestionModal}
                                    >
                                      No
                                    </button>
                                    <button
                                      className="butn"
                                      onClick={this.handleSaveChatMessages.bind(
                                        this,
                                        this.state.suggestionText,
                                        "",
                                        ""
                                      )}
                                    >
                                      Yes
                                      <img
                                        src={SendUp}
                                        alt="send"
                                        className="send-up float-none"
                                      />
                                      {this.state.isSendRecomended ? (
                                        <FontAwesomeIcon
                                          icon={faCircleNotch}
                                          className="circular-loader ml-2"
                                          spin
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="recent-chat"
                          role="tabpanel"
                          aria-labelledby="recent-chat"
                        >
                          <div className="table-cntr store chat-history chatabcus">
                            <Table
                              className="components-table-demo-nested antd-table-campaign custom-antd-table"
                              columns={[
                                {
                                  title: "Agent",
                                  dataIndex: "customerName",
                                  width: "20%",
                                },
                                {
                                  title: "Satisfaction",
                                  dataIndex: "",
                                  width: "10%",

                                },
                                {
                                  title: "Time",
                                  dataIndex: "time",
                                  width: "20%",
                                },
                                {
                                  title: "Message",
                                  dataIndex: "message",
                                  width: "30%",
                                },
                              ]}
                              pagination={{ defaultPageSize: 5 }}
                              dataSource={this.state.historicalChatData}
                            ></Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row" style={{ margin: "0" }}>
                      <div className="chatdivtitle">
                        <label
                          className="chattitlelbl"
                          style={{ color: "Black" }}
                        >
                          My Historical Chat
                        </label>
                        <div className="table-cntr store chat-history">
                          <Table
                            className="components-table-demo-nested antd-table-campaign custom-antd-table"
                            columns={[
                              {
                                title: "Chat ID",
                                dataIndex: "chatID",
                                width: "10%",
                              },
                              {
                                title: "Customer Name",
                                dataIndex: "customerName",
                                width: "20%",
                              },
                              {
                                title: "Time",
                                dataIndex: "time",
                                width: "20%",
                              },
                              {
                                title: "Message",
                                dataIndex: "message",
                                width: "30%",
                              },
                            ]}
                            pagination={{ defaultPageSize: 5 }}
                            dataSource={this.state.historicalChatData}
                          ></Table>
                        </div>
                      </div>
                    </div>
                  )}
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
