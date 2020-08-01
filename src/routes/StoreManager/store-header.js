import React, { Component } from "react";
import DashboardLogo from "./../../assets/Images/store-black.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import ChatLogo from "./../../assets/Images/chat.png";
import ChatLogow from "./../../assets/Images/chatw.png";
import NotificationLogo from "./../../assets/Images/Notification.png";
import SettingLogo from "./../../assets/Images/setting.png";
import Hamb from "./../../assets/Images/hamb.png";
import Hambw from "./../../assets/Images/hambw.png";
import SuggSearch from "./../../assets/Images/sugg-search.png";
import addimg from "./../../assets/Images/addimg.png";
import CancelIconW from "./../../assets/Images/cancel-white.png";
import Dots from "./../../assets/Images/dotsw.png";
import Assign from "./../../assets/Images/sent-icon.svg";
import ClaimLogo from "./../../assets/Images/icon9.svg";
import DashboardLogoBlue from "./../../assets/Images/storeBlue.png";
import Arwdown from "./../../assets/Images/arwdwn.png";
import BackArw from "./../../assets/Images/left-white.png";
import Arwup from "./../../assets/Images/arwup.png";
import Pin from "./../../assets/Images/pin.png";
import Chatw from "./../../assets/Images/chatw.png";
import Pin2 from "./../../assets/Images/pin2.png";
import Ladyimg from "./../../assets/Images/ladyimg.png";
import Cancelico from "./../../assets/Images/cancel.png";
import CampaignLogo from "./../../assets/Images/campaign.svg";
import CampaignLogoBlue from "./../../assets/Images/campaign.svg";
import SettingLogoBlue from "./../../assets/Images/setting-blue.png";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import ClaimLogoBlue from "./../../assets/Images/claim-blue.png";
import OrderLogoBlue from "./../../assets/Images/order-icon-blue.png";
import OrderLogoBlack from "./../../assets/Images/order-icon-black.png";
import StatusLogo from "./../../assets/Images/status.png";
import TicketLogoBlue from "./../../assets/Images/ticket-blue.png";
import SendUp from "./../../assets/Images/send-up.png";
import DownWhiteImg from "./../../assets/Images/down-white.png";
import Logout from "./../../assets/Images/logout.png";
import ChatLogoBlue from "./../../assets/Images/chat-blue.png";
import BackArrow from "./../../assets/Images/mobile-back.svg";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authHeader } from "../../helpers/authHeader";
import PencilImg from "./../../assets/Images/pencil.png";
import ProfileImg from "./../../assets/Images/UserIcon.png";
import config from "../../helpers/config";
import axios from "axios";
import { Popover, Collapse, Checkbox, Empty, Popconfirm } from "antd";
import { Drawer } from "antd";
import { ProgressBar } from "react-bootstrap";
import { transferData } from "./../../helpers/transferData";
import "./../../assets/css/store-chat.css";
import SearchBlueImg from "./../../assets/Images/search-blue.png";
import SchRight from "./../../assets/Images/sch-right.png";
import CardTick from "./../../assets/Images/card-tick.png";
import UpBlue from "./../../assets/Images/new-Up.png";
import DownBlue from "./../../assets/Images/new-Down.png";
import DownArw from "./../../assets/Images/down.png";
import AppointmentLogo from "./../../assets/Images/appointments.svg";
import ChatBubbleBlue from "./../../assets/Images/chat-bubble-blue.svg";
import ChatBubbleWhite from "./../../assets/Images/chat-bubble-white.svg";
import AppointmentLogoBlue from "./../../assets/Images/appointments.svg";
import BellIcon from "./../../assets/Images/bell-icon.svg";
import CircleRight from "./../../assets/Images/circle-right.png";
import ReactHtmlParser from "react-html-parser";
import { Tooltip } from "antd";
import CancelBlueImg from "./../../assets/Images/CancelBlue.png";
import CancelBlack from "./../../assets/Images/cancel.png";
import moment from "moment";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Table, Select, notification, Menu, Dropdown } from "antd";
import "react-pagination-js/dist/styles.css";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import Dropzone from "react-dropzone";
import { NotificationManager } from "react-notifications";
import "antd/dist/antd.css";
import DatePicker from "react-datepicker";
const { Option } = Select;
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
var uid = 0;
var i = 0;
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
      chkSuggestion: 0,
      programCode: "",
      storeID: "",
      notificationAccess: "none",
      settingAccess: "none",
      storeAgentDetail: [],
      AgentID: 0,
      searchChat: "",
      isSendRecomended: false,
      chatAccess: "none",
      noProductFound: "",
      remainingCount: "",
      tempRemainingCount: "",
      noRecommendedFound: "",
      suggestionModal: false,
      suggestionText: "",
      suggestionModalMob: false,
      availableSlot: 0,
      isHistoricalChat: false,
      visible: false,
      historicalChatData: [],
      agentRecentChatData: [],
      agentData: [],
      sAgentId: 0,
      isScroll: false,
      selectedSugpage: 1,
      tempmessageSuggestionData: [],
      translateLanguage: {},
      storeCode: "",
      actionBtn: false,
      isCustEndChat: false,
      mainTabSelect: 1,
      isPastChatLoading: false,
      isHistoricalChatLoading: false,
      showHistoricalChat: false,
      chatTimeAgo: "",
      rowChatId: 0,
      storeManagerId: 0,
      tempCardSearch: "",
      reportAccess: "none",
      mobileHeading: "",
      messageHistoryChatData: [],
      isMainLoader: true,
      messageSuggestionTagsData: [],
      selectedTags: 0,
      newChatSoundVolume: 0,
      newMessageSoundVolume: 0,
      isNotiNewChat: false,
      isNotiNewMessage: false,
      newChatSoundFile: "",
      newMessageSoundFile: "",
      storePayURL: "",
      newTicketChatId: 0,
      onHoverName: false,
      isPinClick: false,
      customerTier: "",
      customerMobileNo: "",
      customerEmailID: "",
      totalPoints: 0,
      lifetimeValue: 0,
      visitCount: 0,
      billNumber: "",
      billAmount: 0,
      transactionDate: "",
      insights: [],
      orderDelivered: 0,
      orderShoppingBag: 0,
      orderReadyToShip: 0,
      orderReturns: 0,
      isMobileView: false,
      isShutterOpen: false,
      shoppingBagData: [],
      wishListData: [],
      recommendedData: [],
      ProfileProductTab: 0,
      activeCollpse: [1],
      productTypeTab: 0,
      selectedRecommended: [],
      selectedShoppingBag: [],
      selectedWishList: [],
      isButtonClick: false,
      buyNowClick: false,
      colorCode: [
        "#E8E8E8",
        "#FFE8A7",
        "#DAF3C0",
        "#DDF6FC",
        "#CDE4FF",
        "#FFDEE2",
      ],
      notificationTime: 0,
      shippingAddress: "",
      shippingLandmark: "",
      shippingPinCode: "",
      shippingCity: "",
      shippingState: "",
      shippingCountry: "",
      isMessageTabActive: false,
      isCardTabActive: false,
      isRecommendedTabActive: false,
      isSchedualTabActive: false,
      isGeneratePaymentTabActive: false,
      isCustomerProfile: false,
      isCustomerProduct: false,
      selectedColor: "",
      mainProductsData: [],
      storePinCode: "",
      isAddress: "",
      isPinCode: "",
      isCity: "",
      isState: "",
      isCountry: "",
      isPinCodeCheck: "",
      maxPeopleAllow: 0,
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
          this.setState({
            selectedUserProfilePicture: "",
          });
        } else if (pic.profilePic.length > 0) {
          this.setState({
            selectedUserProfilePicture: pic.profilePic,
          });
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
    }
    this.handleCheckView();

    this.handleGetNotigfication();
    this.handleGetChatNotificationCount();
    this.handleGetChatSession();
    this.handleGetChatSoundNotiSetting();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  ////handle scroll right
  handleScrollRight(num) {
    document.getElementById("schedule-btn-cntr" + num).scrollLeft += 20;
  }
  ////handle scroll left
  handleScrollLeft(num) {
    document.getElementById("schedule-btn-cntr" + num).scrollLeft -= 20;
  }
  ////handle show menu
  handleShowMenu() {
    this.setState({
      visible: true,
    });
  }
  ////handle close manu
  handleCloseManu() {
    this.setState({
      visible: false,
    });
  }

  ////handle set access user
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
        page.toLowerCase() === "storedashboard".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var task = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.task
          : "Task",
      urls: "StoreTask",
      logoBlack: TicketLogo,
      logoBlue: TicketLogoBlue,
      imgAlt: "ticket icon",
      imgClass: "myTicket",
      activeClass:
        page.toLowerCase() === "StoreTask".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var claim = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.claim
          : "Claim",
      urls: "claim",
      logoBlack: ClaimLogo,
      logoBlue: ClaimLogoBlue,
      imgAlt: "claim icon",
      imgClass: "claim-logo",
      activeClass:
        page.toLowerCase() === "claim".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var campaign = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.campaign
          : "Campaign",
      urls: "campaign",
      logoBlack: CampaignLogo,
      logoBlue: CampaignLogoBlue,
      imgAlt: "campaign icon",
      imgClass: "campaign-icon",
      activeClass:
        page.toLowerCase() === "Campaign".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var appointment = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.appointment
          : "Appointment",
      urls: "appointment",
      logoBlack: AppointmentLogo,
      logoBlue: AppointmentLogoBlue,
      imgAlt: "campaign icon",
      imgClass: "campaign-icon",
      activeClass:
        page.toLowerCase() === "Appointment".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var myTicket = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.myticket
          : "MyTicket",
      urls: "myTicketList",
      logoBlack: TicketLogo,
      logoBlue: TicketLogoBlue,
      imgAlt: "ticket icon",
      imgClass: "myTicket",
      activeClass:
        page.toLowerCase() === "MyTicket".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var orders = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.orders
          : "Orders",
      urls: "orders",
      logoBlack: OrderLogoBlack,
      logoBlue: OrderLogoBlue,
      imgAlt: "Order Icon",
      imgClass: "myTicket",
      activeClass:
        page.toLowerCase() === "Orders".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var storePay = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.storePay
          : "Store Pay",
      // urls: "orders",
      // logoBlack: OrderLogoBlack,
      // logoBlue: OrderLogoBlue,
      imgAlt: "store pay",
      imgClass: "myTicket",
      // activeClass:
      //   page.toLowerCase() === "".toLowerCase()
      //     ? "active single-menu"
      //     : "single-menu",
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
          data[i].moduleName === "MyTicket" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(myTicket);
        } else if (
          data[i].moduleName === "Orders" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(orders);
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
          this.setState({
            reportAccess: "block",
          });
        } else if (
          data[i].moduleName === "StorePay" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(storePay);
          // this.handleGenerateStorePayLink();
        }
      }
    }

    for (let i = 0; i < accessdata.length; i++) {
      if (accessdata[i].activeClass === "active single-menu") {
        this.setState({
          mobileHeading: accessdata[i].data,
        });
      }
    }
    this.setState({
      cont: accessdata,
    });
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }
  componentDidUpdate() {
    if (this.state.chatModal && this.state.isDownbtn && this.state.isScroll) {
      this.setState({ isScroll: false });
      this.scrollToBottom();
    }

    if (this.state.showHistoricalChat) {
      this.historyMessageScrollToBottom();
    }
  }
  ////handle crm role data
  handleCRMRole() {
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
  ////handle get user profile data
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
          self.handleCRMRole();
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
  ////handle opne modal
  onOpenModal = () => {
    this.setState({ open: true });
  };
  ////handle close modal
  onCloseModal = () => {
    this.setState({ open: false });
  };
  ////handle opne modal
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  ////handle close modal
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  ////handle notification modal open
  handleNotificationModalOpen() {
    this.setState({ notificationModal: true });
  }
  ////handle notification modal close
  handleNotificationModalClose(typeId, type) {
    this.setState({ notificationModal: false });
    this.handleGetReadStoreNotification(typeId, type);
  }
  ////handle logged in user deatils
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
            programCode: data.programCode ? data.programCode : "",
            storeCode: data.storeCode ? data.storeCode : "",
          });
          if (data.programCode !== "" && data.storeCode !== "") {
            self.handleCreateSocketConnection(data.programCode, data.storeCode);
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  ////handle get store agent details by agent id
  handleGetStoreAgentDetailsById(agentID) {
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
    axios({
      method: "post",
      url: config.apiUrl + "/StoreAccount/Logout",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.status;
        if (status === true) {
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
    this.setState({
      cont: contDummy,
      visible: false,
      mobileHeading: e.target.textContent,
    });
  };

  ////handle chat modal close
  handleChatModalClose() {
    this.setState({
      chatModal: false,
      searchCardData: [],
      searchItem: "",
      showHistoricalChat: false,
      isDownbtn: true,
      message: "",
      messageSuggestionData: [],
      messageSuggestionTagsData: [],
    });
  }
  ////handle chat modal open
  handleChatModalOpen() {
    var activeTab = 1;
    if (this.state.isMessageTabActive === false) {
      activeTab = 2;
    } else if (this.state.isCardTabActive === false) {
      activeTab = 3;
    } else if (this.state.isRecommendedTabActive === false) {
      activeTab = 4;
    } else if (this.state.isSchedualTabActive === false) {
      activeTab = 5;
    } else if (this.state.isGeneratePaymentTabActive === false) {
      activeTab = 1;
    } else {
      activeTab = 1;
    }

    this.setState({
      newTicketChatId:
        Number(document.getElementById("newTicketChatId").value) || 0,
      chatModal: true,
      noOfPeople: "",
      selectSlot: {},
      scheduleModal: false,
      selectedSlot: {},
      mainTabSelect: 1,
      activeTab,
      isScroll: true,
    });

    this.handleCheckView();
    this.handleGetNewChat();
    this.handleGetOngoingChat();
    this.handleGetStoreAgentDetailsById(this.state.AgentID);
    this.handleGetAgentList();
    this.handleGetChatNotificationCount();

    if (this.state.rowChatId > 0) {
      this.handleGetChatMessagesList(this.state.chatId);
    }
  }

  ////handleGet Ongoing Chat
  async handleGetOngoingChat(event) {
    let self = this;
    var search = "";
    if (event !== undefined) {
      search = event.target.value;
      this.setState({ searchChat: event.target.value, noRecommendedFound: "" });
    } else {
      search = this.state.searchChat;
    }
    this.setState({ isMainLoader: true });
    await axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetOngoingChat",
      headers: authHeader(),
      params: { Search: search, StoreManagerID: this.state.sAgentId },
    })
      .then(function(response) {
        var message = response.data.message;
        var ongoingChatsData = response.data.responseData;
        if (message === "Success") {
          if (ongoingChatsData) {
            var chatData = ongoingChatsData.filter(
              (x) => x.chatID === self.state.chatId
            );
            if (chatData.length == 0) {
              self.setState({
                customerName: "",
                messageData: [],
                isMainLoader: false,
                isPinClick: false,
                onHoverName: false,
              });
            }
            for (let i = 0; i < ongoingChatsData.length; i++) {
              ongoingChatsData[i].initialColor =
                self.state.colorCode[Math.floor(Math.random() * 6)];
            }

            if (self.state.newTicketChatId > 0) {
              var chatData = ongoingChatsData.filter(
                (x) => x.chatID === self.state.newTicketChatId
              );
              self.setState({
                ongoingChatsData,
                newTicketChatId: 0,
              });
              self.handleOngoingChatClick(
                chatData[0].chatID,
                chatData[0].cumtomerName,
                chatData[0].messageCount,
                chatData[0].mobileNo,
                chatData[0].customerID,
                chatData[0].programCode,
                chatData[0].storeID,
                chatData[0].isCustEndChat,
                chatData[0].storeManagerId,
                chatData[0].initialColor
              );
            } else {
              var selectedColor = "";
              if (self.state.chatId > 0) {
                var selectedColor = ongoingChatsData.filter(
                  (x) => x.chatID === self.state.chatId
                )[0].initialColor;
              }

              self.setState({
                selectedColor,
                ongoingChatsData,
              });
            }
          } else {
            self.setState({
              isPinClick: false,
              onHoverName: false,
              customerName: "",
              messageData: [],
              isMainLoader: false,
            });
            self.setState({
              ongoingChatsData: [],
            });
          }
        } else {
          self.setState({
            isPinClick: false,
            ongoingChatsData: [],
            customerName: "",
            messageData: [],
            onHoverName: false,
            isMainLoader: false,
          });
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false });
        console.log(response, "---handleGetOngoingChat");
      });
  }
  ////handle clear chat search
  handleClearChatSearch = async () => {
    await this.setState({ searchChat: "" });
    this.handleGetOngoingChat();
  };

  ////handle Get New Chat
  async handleGetNewChat(mobileNo, msgData) {
    this.setState({ isMainLoader: true });
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
          for (let i = 0; i < newChatsData.length; i++) {
            newChatsData[i].initialColor =
              self.state.colorCode[Math.floor(Math.random() * 6)];
          }
          self.setState({ newChatsData, isMainLoader: false });
          if (self.state.newTicketChatId > 0) {
            var chatData = newChatsData.filter(
              (x) => x.chatID === self.state.newTicketChatId
            );
            self.handleNewChatNotification(chatData);
          }
          if (self.state.isNotiNewChat && mobileNo && msgData) {
            const Sound1Play = new Audio(self.state.newChatSoundFile);
            Sound1Play.volume =
              Math.round(self.state.newChatSoundVolume / 10) / 10;
            Sound1Play.play();
            var chatData = newChatsData.filter((x) => x.mobileNo === mobileNo);
            if (chatData.length > 0) {
              notification.open({
                key: chatData[0].chatID,
                duration: self.state.notificationTime,
                placement: "bottomRight",
                // message: "Notification Title",
                className: "hide-message-title",
                description: (
                  <>
                    <div
                      className="row"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={self.handleNewChatNotification.bind(
                        this,
                        chatData,
                        chatData[0].chatID
                      )}
                    >
                      <div className="col-3">
                        <div class="chat-trail-img">
                          <span
                            class="chat-initial"
                            alt="face image"
                            title="Shalini Chandra "
                          >
                            {chatData[0].cumtomerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="col-9">
                        <h5 title="Customer Name">
                          {chatData[0].cumtomerName}
                        </h5>
                        <p
                          style={{
                            wordBreak: "break-word",
                          }}
                        >
                          {msgData}
                        </p>
                      </div>
                    </div>
                  </>
                ),
              });
            }
          }
        } else {
          self.setState({ newChatsData: [], isMainLoader: false });
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false });
        console.log(response, "---handleGetNewChat");
      });
  }
  ////handle Make As Read On Going Chat
  async handleMakeAsReadOnGoingChat(id) {
    let self = this;
    this.setState({ chatId: id });
    await axios({
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
          self.handleGetChatNotificationCount();
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleMakeAsReadOnGoingChat");
      });
  }
  ////handle update customer chat status
  handleUpdateCustomerChatStatus(
    id,
    storeManagerId,
    StoreID,
    name,
    mobileNo,
    customerId,
    ProgramCode
  ) {
    let self = this;

    this.setState({
      chatModal: true,
      isMainLoader: true,
      isCustEndChat: false,
      storeManagerId,
      rowChatId: 0,
      agentRecentChatData: [],
      showHistoricalChat: false,
      mainTabSelect: 1,
      storeID: StoreID,
      customerName: name,
      mobileNo: mobileNo,
      customerId: customerId,
      programCode: ProgramCode,
      message: "",
      messageSuggestionData: [],
      messageSuggestionTagsData: [],
      selectedTags: 0,
      chkSuggestion: 0,
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
          self.handleGetAgentRecentChat(customerId);
          self.handleMakeAsReadOnGoingChat(id);
          self.handleGetNewChat();
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false });
        console.log(response, "---handleUpdateCustomerChatStatus");
      });
  }
  ////handle get chat messgae by chat id
  handleGetChatMessagesList(id, RecentChat) {
    let self = this;
    var forRecentChat = 0;
    if (RecentChat) {
      forRecentChat = 1;
    }
    this.setState({ isMainLoader: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/getChatMessagesList",
      headers: authHeader(),
      params: {
        chatID: id,
        ForRecentChat: forRecentChat,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var messageData = response.data.responseData;
        if (message === "Success" && messageData) {
          if (self.state.showHistoricalChat) {
            self.setState({
              messageHistoryChatData: messageData,
              isMainLoader: false,
            });
          } else {
            self.setState({
              ...messageData,
              messageData,
              isScroll: true,
              isMainLoader: false,
            });
          }
        } else {
          self.setState({ messageData: [] });
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false });
        console.log(response, "---handleGetChatMessagesList");
      });
  }
  ////handle save chat messgae
  handleSaveChatMessages(
    messageStringData,
    messagewhatsAppContent,
    imageURL,
    isCard
  ) {
    let self = this;

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
      inputParam.storeManagerId = this.state.storeManagerId;

      this.setState({
        message: "",
        isMainLoader: true,
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
              messageSuggestionTagsData: [],
              selectedTags: 0,
              cardModal: false,
              remainingCount: self.state.tempRemainingCount,
              suggestionModal: false,
              suggestionModalMob: false,
              isMainLoader: false,
            });
            self.handleGetChatMessagesList(self.state.chatId);
            self.handleGetOngoingChat();
            if (isCard) {
              self.handleSendProductsOnChat(true);
            } else {
              self.handleSendMessageToCustomer(
                messagecontent,
                0,
                messagewhatsAppContent,
                imageURL
              );
            }
          } else {
            self.setState({ isSendRecomended: false, isMainLoader: false });
          }
        })
        .catch((response) => {
          self.setState({ isMainLoader: false });
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
        var chatMessageCount = response.data.responseData;
        if (chatMessageCount) {
          self.setState({ chatMessageCount });
        } else {
          self.setState({ chatMessageCount: chatMessageCount || 0 });
        }
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
            tempCardSearch: self.state.searchItem,
          });
        } else {
          self.setState({
            searchCardData: [],
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
    })
      .then(function(response) {
        var message = response.data.message;
        var timeSlotData = response.data.responseData;
        var availableSlot = 0;

        if (message == "Success" && timeSlotData) {
          for (var i = 0; i < timeSlotData.length; i++) {
            if (timeSlotData[i].alreadyScheduleDetails.length > 0) {
              availableSlot += 1;
            }
          }
          var maxPeopleAllow = timeSlotData[0].maxPeopleAllowed;
          self.setState({
            timeSlotData,
            isSendClick: false,
            availableSlot,
            maxPeopleAllow,
          });
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
              timeSlotData[0].customerMobileNo +
              " \n Store Name : " +
              timeSlotData[0].storeName +
              " \n Address : " +
              timeSlotData[0].storeAddress +
              " \n Contact Number : " +
              (timeSlotData[0].storeManagerMobile.length > 10
                ? "+" + timeSlotData[0].storeManagerMobile
                : "+91" + timeSlotData[0].storeManagerMobile) +
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
  ////handle send message to customer
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
        this.setState({
          chkSuggestion: 0,
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
                messageSuggestionTagsData: [],
                selectedTags: 0,
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
  handleSelectCard(id, imageUrl) {
    if (imageUrl) {
      this.setState({ selectedCard: id });
    } else {
      NotificationManager.error(
        "Image is not available so,not select the card"
      );
    }
  }
  ////handle button down click
  handleDownButtonClick() {
    this.setState({ isDownbtn: !this.state.isDownbtn });
  }
  ////handle on change ck editor
  handleOnChangeCKEditor = (evt) => {
    var message = evt.target.value;
    var remLength = 0;
    remLength = this.state.tempRemainingCount - parseInt(message.length);
    if (remLength < 0) {
      message = message.substring(0, this.state.tempRemainingCount);
      return false;
    }

    this.setState({
      message,
      remainingCount: remLength,
    });
  };
  ////handle message suggestion
  handleMessageSuggestion = () => {
    setTimeout(() => {
      if (this.state.message.length > 0) {
        this.handleGetMessageSuggestionList();
      } else {
        this.setState({
          messageSuggestionData: [],
          messageSuggestionTagsData: [],
          selectedTags: 0,
          chkSuggestion: [],
        });
      }
    }, 1);
  };
  ////handle get message suggestion list
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
        let responseData = res.data.responseData;
        if (status === "Success") {
          self.setState({
            messageSuggestionTagsData: responseData[0],
            selectedTags:
              responseData[0].length > 0 ? responseData[0][0].tagID : 0,
            messageSuggestionData: responseData[1],
            chkSuggestion: [],
          });
        } else {
          self.setState({
            messageSuggestionData: [],
            chkSuggestion: [],
            messageSuggestionTagsData: [],
            selectedTags: 0,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  ////handle appand message suggestion
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
    let message = this.state.message;
    message = "<p>" + textBefore + " " + textAfter + "</p>";

    this.setState({ message });
  };
  ////handle on change message text
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
    StoreID,
    isCustEndChat,
    storeManagerId,
    selectedColor
  ) => {
    var activeTab = 1;
    if (this.state.isMessageTabActive === false) {
      activeTab = 2;
    } else if (this.state.isCardTabActive === false) {
      activeTab = 3;
    } else if (this.state.isRecommendedTabActive === false) {
      activeTab = 4;
    } else if (this.state.isSchedualTabActive === false) {
      activeTab = 5;
    } else if (this.state.isGeneratePaymentTabActive === false) {
      activeTab = 1;
    } else {
      activeTab = 1;
    }

    if (this.state.messageData.length == 0 || this.state.chatId != id) {
      if (this.state.chatId === id) {
        this.setState({
          messageSuggestionTagsData: [],
          activeTab,
          selectedColor,
          chatModal: true,
          productTypeTab: 0,
          selectedWishList: [],
          selectedShoppingBag: [],
          selectedRecommended: [],
          shoppingBagData: [],
          wishListData: [],
          recommendedData: [],
          storeManagerId,
          showHistoricalChat: false,
          rowChatId: 0,
          agentRecentChatData: [],
          mainTabSelect: 1,
          isCustEndChat,
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
          noOfPeople: "",
          selectSlot: {},
          scheduleModal: false,
          selectedSlot: {},
          timeSlotData: [],
          searchItem: "",
          searchCardData: [],
          messageData: [],
          isSendClick: false,
          isHistoricalChat: false,
          isDownbtn: true,
        });
        this.handleGetChatMessagesList(id);
        this.handleGetAgentRecentChat(customerId);
        this.handleGetChatCustomerProfile(customerId);
      } else {
        this.setState({
          messageSuggestionTagsData: [],
          activeTab,
          selectedColor,
          chatModal: true,
          productTypeTab: 0,
          selectedWishList: [],
          selectedShoppingBag: [],
          selectedRecommended: [],
          shoppingBagData: [],
          wishListData: [],
          recommendedData: [],
          storeManagerId,
          rowChatId: 0,
          agentRecentChatData: [],
          showHistoricalChat: false,
          mainTabSelect: 1,
          isCustEndChat,
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
          noOfPeople: "",
          selectSlot: {},
          scheduleModal: false,
          selectedSlot: {},
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
          this.handleGetAgentRecentChat(customerId);
        } else {
          this.handleMakeAsReadOnGoingChat(id);
          this.handleGetAgentRecentChat(customerId);
        }
      }
    } else {
      this.setState({
        messageSuggestionTagsData: [],
        activeTab,
        selectedColor,
        chatModal: true,
        productTypeTab: 0,
        selectedWishList: [],
        selectedShoppingBag: [],
        selectedRecommended: [],
        shoppingBagData: [],
        wishListData: [],
        recommendedData: [],
        storeManagerId,
        rowChatId: 0,
        agentRecentChatData: [],
        showHistoricalChat: false,
        mainTabSelect: 1,
        isCustEndChat,
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
      this.handleGetAgentRecentChat(customerId);
    }
    this.setState({ isHistoricalChat: false, isDownbtn: true });
    if (this.state.isCustomerProfile) {
      this.setState({ ProfileProductTab: 0 });
      this.handleGetChatCustomerProfile(customerId);
    } else {
      if(this.state.isCustomerProduct)
      {
        this.setState({ ProfileProductTab: 1 });
        this.handleGetChatCustomerProducts();
      }
    }
  };
  ////handle close card modal
  onCloseCardModal = () => {
    this.setState({ cardModal: false, searchCardData: [], selectedCard: 0 });
  };
  ////handle opne card modal
  onOpenCardModal = () => {
    this.setState({ cardModal: true });
  };
  ////handle search item text change
  handleSearchItemChange = (e) => {
    this.setState({ searchItem: e.target.value, noProductFound: "" });
  };
  ////handle got to message scroll down
  scrollToBottom() {
    if (this.messageList) {
      const scrollHeight = this.messageList.scrollHeight;
      const height = this.messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }
  ////handle no of people text change
  handleNoOfPeopleChange = (e) => {
    if (Object.keys(this.state.selectedSlot).length !== 0) {
      if (Number(e.target.value) <= this.state.selectedSlot.remaining) {
        if (Number(e.target.value) <= this.state.maxPeopleAllow) {
          this.setState({
            noOfPeople: e.target.value,
            noOfPeopleMax: "",
          });
        } else {
          this.setState({
            noOfPeople: "",
            noOfPeopleMax: "Maximum capacity are " + this.state.maxPeopleAllow,
          });
        }
      } else {
        this.setState({
          noOfPeople: "",
          noOfPeopleMax:
            "Remaining capacity are " + this.state.selectedSlot.remaining,
        });
      }
    } else {
      this.setState({
        isSelectSlot: "Please select time slot",
      });
    }
  };
  ////handle select slot button
  handleSelectSlot = (data, selectedDate, isDisabled) => {
    if (isDisabled) {
    } else {
      this.setState({
        selectedSlot: data,
        selectedDate,
        isSelectSlot: "",
        noOfPeople: "",
        noOfPeopleMax: "",
      });
    }
  };
  ////handle close schedule modal
  onCloseScheduleModal = () => {
    this.setState({
      scheduleModal: false,
      selectedSlot: {},
      selectedDate: "",
      isSelectSlot: "",
      noOfPeople: "",
      noOfPeopleMax: "",
    });
  };
  ////handle open chedule modal
  onOpenScheduleModal = () => {
    this.setState({ scheduleModal: true });
    this.handleGetTimeSlot();
  };
  ////handle close recommended list modal
  onCloseRecommendedModal = () => {
    this.setState({ recommendedModal: false });
  };
  ////handle open recommended list modal
  onOpenRecommendedModal = () => {
    this.setState({ recommendedModal: true });
  };
  ////handle close payment modal
  onClosePaymentModal = () => {
    this.setState({ paymentModal: false });
  };
  ////handle open payment modal
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
        (messagewhatsAppData[0].brandName !== "" &&
        messagewhatsAppData[0].brandName !== null
          ? "\nBrand: " + messagewhatsAppData[0].brandName.trim()
          : "") +
        (messagewhatsAppData[0].categoryName !== "" &&
        messagewhatsAppData[0].categoryName !== null
          ? ", Category: " + messagewhatsAppData[0].categoryName.trim()
          : "") +
        (messagewhatsAppData[0].subCategoryName !== "" &&
        messagewhatsAppData[0].subCategoryName !== null
          ? ", Sub Category: " + messagewhatsAppData[0].subCategoryName.trim()
          : "") +
        (messagewhatsAppData[0].color !== "" &&
        messagewhatsAppData[0].color !== null
          ? ", Color: " + messagewhatsAppData[0].color.trim()
          : "") +
        (messagewhatsAppData[0].size !== "" &&
        messagewhatsAppData[0].size !== null
          ? ", Size: " + messagewhatsAppData[0].size.trim()
          : "") +
        (messagewhatsAppData[0].uniqueItemCode !== "" &&
        messagewhatsAppData[0].uniqueItemCode !== null
          ? ", Item Code: " + messagewhatsAppData[0].uniqueItemCode.trim()
          : "") +
        (messagewhatsAppData[0].discount !== "" &&
        parseFloat(messagewhatsAppData[0].discount) !== 0 &&
        messagewhatsAppData[0].discount !== null
          ? ", Discount: " + messagewhatsAppData[0].discount.trim()
          : "") +
        (messagewhatsAppData[0].price !== "" &&
        parseFloat(messagewhatsAppData[0].price) !== 0 &&
        messagewhatsAppData[0].price !== null
          ? ", Price: " + messagewhatsAppData[0].price.trim()
          : "") +
        "\n" +
        (messagewhatsAppData[0].url !== null ? messagewhatsAppData[0].url : "");

      var imageURL = messagewhatsAppData[0].imageURL;
      this.setState({ isSendRecomended: true });
      this.handleSaveChatMessages(
        messageStringData,
        messagewhatsAppContent,
        imageURL,
        true
      );
    }
  }
  ////handle tabl click
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
      noRecommendedFound: "",
      noOfPeopleMax: "",
      noProductFound: "",
      isSelectSlot: "",
    });
  };
  ////handle send recommended list
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
        if (status === "Success") {
          self.setState({ isSendRecomended: false, noRecommendedFound: "" });
          self.handleGetChatMessagesList(self.state.chatId);
          self.onCloseRecommendedModal();
        } else {
          self.setState({ isSendRecomended: false });
          self.setState({
            messageSuggestionData: [],
            messageSuggestionTagsData: [],
            selectedTags: 0,
            chkSuggestion: [],
            noRecommendedFound: "No Record Found",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  ////handle open suggestion list modal
  onOpenSuggestionModal(suggestionText, index) {
    if (index > 0) {
      this.state.chkSuggestion = [];
      this.state.chkSuggestion[index] = 1;
      this.setState({
        suggestionModal: true,
        chkSuggestion: this.state.chkSuggestion,
        suggestionText: suggestionText,
      });
    }
  }
  ////handle opne mobile suggestion list modal
  onOpenMobSuggestionModal(suggestionText, index) {
    if (index > 0) {
      this.setState({
        suggestionModalMob: true,
        chkSuggestion: index,
        suggestionText: suggestionText,
      });
    }
  }
  ////handle close suggestion list modal
  onCloseSuggestionModal = () => {
    this.setState({ suggestionModal: false });
  };
  ////handle close mobile suggestion list modal
  onCloseMobSuggestionModal = () => {
    this.setState({ suggestionModalMob: false });
  };
  ////handle change tab click
  handleHistTabClick = () => {
    this.setState({
      isHistoricalChat: true,
      isDownbtn: false,
      messageData: [],
      rowChatId: 0,
      // customerName: "",
      showHistoricalChat: false,
      mainTabSelect: 2,
    });
    this.handleGetAgentChatHistory();
  };
  ////handle get agent recent chat data
  handleGetAgentRecentChat(customerId) {
    let self = this;
    this.setState({ isPastChatLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetAgentRecentChat",
      headers: authHeader(),
      params: { CustomerID: customerId },
    })
      .then(function(response) {
        var message = response.data.message;
        var agentRecentChatData = response.data.responseData;

        if (message === "Success" && agentRecentChatData) {
          self.setState({ agentRecentChatData });
          self.setState({ isPastChatLoading: false });
        } else {
          self.setState({ agentRecentChatData });
          self.setState({ isPastChatLoading: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAgentRecentChat");
      });
  }
  ////handle get agent list
  handleGetAgentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetAgentList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var agentData = response.data.responseData;
        if (message === "Success" && agentData) {
          self.setState({ agentData });
        } else {
          self.setState({ agentData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAgentList");
      });
  }
  ////handle change main tabs
  handleMainTabChange(e) {
    this.setState({ mainTabSelect: e });
    if (e === 2) {
      this.setState({
        messageData: [],
        showHistoricalChat: false,
        rowChatId: 0,
      });
    } else {
      this.setState({
        messageData: [],
        showHistoricalChat: false,
        rowChatId: 0,
      });
      this.handleGetChatMessagesList(this.state.chatId);
    }
  }
  ////handle change agent dropdown
  handleChangeAgentDropdown(e) {
    this.setState({ sAgentId: e });
    setTimeout(() => {
      this.handleGetOngoingChat();
    }, 10);
  }
  ////handle get agent chat history
  handleGetAgentChatHistory() {
    let self = this;
    this.setState({ isHistoricalChatLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetAgentChatHistory",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var historicalChatData = response.data.responseData;
        if (message === "Success" && historicalChatData) {
          self.setState({ historicalChatData, isHistoricalChatLoading: false });
        } else {
          self.setState({
            historicalChatData: [],
            isHistoricalChatLoading: false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAgentChatHistory");
      });
  }

  ////handle create socket connection
  handleCreateSocketConnection(programCode, storeCode) {
    let self = this;
    var socket = io.connect(config.socketUrl, {
      transports: ["polling"],
      upgrade: false,
    });

    socket.on("connect", () => {
      socket.send("hi");
      if (programCode !== "" && programCode !== "") {
        socket.on(storeCode.toLowerCase() + programCode.toLowerCase(), function(
          data
        ) {
          if (self.state.storeCode !== "" && data[5] !== "") {
            if (self.state.storeCode.toLowerCase() === data[5].toLowerCase()) {
              var isMobileNoExist = self.state.ongoingChatsData.filter(
                (x) =>
                  x.mobileNo === data[3].substring(2) &&
                  x.isCustEndChat === false
              );

              if (isMobileNoExist.length > 0) {
                if ("91" + self.state.mobileNo === data[3]) {
                  ////for current chat message
                  var chatId = 0;
                  const Sound1Play = new Audio(self.state.newMessageSoundFile);
                  Sound1Play.volume =
                    Math.round(self.state.newMessageSoundVolume / 10) / 10;
                  Sound1Play.play();
                  // self.setState({
                  //   isCustEndChat: data[6],
                  // });
                  var chatData = self.state.ongoingChatsData.filter(
                    (x) => x.mobileNo === data[3].substr(2)
                  );
                  if (!self.state.chatModal) {
                    notification.open({
                      key: chatData[0].chatID,
                      duration: self.state.notificationTime,
                      placement: "bottomRight",
                      // message: "Notification Title",
                      className: "hide-message-title",
                      description: (
                        <>
                          <div
                            className="row"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={self.handleNotificationClick.bind(
                              this,
                              chatData,
                              chatData[0].chatID
                            )}
                          >
                            <div className="col-3">
                              <div className="chat-trail-img">
                                <span
                                  class="chat-initial"
                                  alt="face image"
                                  title="Shalini Chandra "
                                >
                                  {chatData[0].cumtomerName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="col-9">
                              <h5 title="Customer Name">
                                {chatData[0].cumtomerName}
                              </h5>
                              <p
                                style={{
                                  wordBreak: "break-word",
                                }}
                              >
                                {data[0]}
                              </p>
                            </div>
                          </div>
                        </>
                      ),
                    });
                  }
                  if (self.state.ongoingChatsData.length > 0) {
                    chatId = self.state.ongoingChatsData.filter(
                      (x) => x.mobileNo === self.state.mobileNo
                    )[0].chatID;
                  }
                  if (data[6]) {
                    self.handleEndCustomerChat(chatId, data[0]);
                  } else {
                    self.handleGetOngoingChat();
                    self.handleGetNewChat();
                  }

                  self.handleGetChatMessagesList(chatId);
                } else {
                  /////for new ongoing message

                  const Sound1Play = new Audio(self.state.newMessageSoundFile);
                  Sound1Play.volume =
                    Math.round(self.state.newMessageSoundVolume / 10) / 10;
                  Sound1Play.play();

                  if (self.state.isNotiNewMessage) {
                    var chatData = self.state.ongoingChatsData.filter(
                      (x) => x.mobileNo === data[3].substr(2)
                    );

                    notification.open({
                      key: chatData[0].chatID,
                      duration: self.state.notificationTime,
                      placement: "bottomRight",
                      // message: "Notification Title",
                      className: "hide-message-title",
                      description: (
                        <>
                          <div
                            className="row"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={self.handleNotificationClick.bind(
                              this,
                              chatData,
                              chatData[0].chatID
                            )}
                          >
                            <div className="col-3">
                              <div className="chat-trail-img">
                                <span
                                  class="chat-initial"
                                  alt="face image"
                                  title="Shalini Chandra "
                                >
                                  {chatData[0].cumtomerName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="col-9">
                              <h5 title="Customer Name">
                                {chatData[0].cumtomerName}
                              </h5>
                              <p
                                style={{
                                  wordBreak: "break-word",
                                }}
                              >
                                {data[0]}
                              </p>
                            </div>
                          </div>
                        </>
                      ),
                    });
                  }

                  self.handleGetOngoingChat();
                  self.handleGetNewChat();
                  self.handleGetChatNotificationCount();
                }
              } else {
                ////new chat message

                setTimeout(() => {
                  self.handleGetChatNotificationCount();
                  self.handleGetNewChat(data[3].substr(2), data[0]);
                }, 5000);

                // self.handleGetNewChat();
              }
            }
          }
        });
      }
    });
  }
  ////handle insert card image upload
  handleInsertCardImageUpload(itemcode, e) {
    if (!e[0].name.match(/\.(jpg|jpeg|png)$/)) {
      NotificationManager.error("Please select valid image file JPG,JPEG,PNG,");
      return false;
    }
    if (e[0].size > 5242880) {
      NotificationManager.error("Please select image file under 5MB");
      return false;
    }
    var formData = new FormData();
    formData.append("files", e[0]);
    formData.append("ItemID", itemcode);
    formData.append("SearchText", this.state.tempCardSearch);
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/InsertCardImageUpload",
      headers: authHeader(),
      data: formData,
    })
      .then(function(response) {
        var messgae = response.data.message;
        if (messgae === "Success") {
          NotificationManager.success("Add image successfully.");
        } else {
          NotificationManager.error("Not add image successfully.");
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }
  ////handle open action modal pop up
  handleActionOpen = () => {
    this.setState({ actionBtn: true });
    // this.setState({ actionBtn: !this.state.actionBtn });
  };
  ////handle close action modal pop up
  handleActionClose = () => {
    this.setState({ actionBtn: false });
  };
  ////handle update store manage chat status
  handleUpdateStoreManagerChatStatus(id) {
    if (this.state.isCustEndChat) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/UpdateStoreManagerChatStatus",
        headers: authHeader(),
        params: { ChatID: this.state.chatId, ChatStatusID: id },
      })
        .then((response) => {
          var message = response.data.message;
          var responseData = response.data.responseData;
          if (message === "Success" && responseData) {
            self.setState({
              customerName: "",
              messageData: [],
              isCustEndChat: false,
            });
            self.handleGetOngoingChat();
            self.handleActionClose();
          }
        })
        .catch((response) => {
          console.log(response, "---handleUpdateStoreManagerChatStatus");
        });
    }
  }
  ////handle historical table row click
  handleHistoricalTableRow = (e) => {
    this.setState({
      rowChatId: e.chatID,
      showHistoricalChat: true,
      chatTimeAgo: e.timeAgo,
    });
    this.handleGetChatMessagesList(e.chatID, 1);
  };
  ///handle set row class
  setRowClassName = (record) => {
    return record.chatID === this.state.rowChatId ? "clickRowStyl" : "";
  };
  ////handle history messge scrool to bottom
  historyMessageScrollToBottom() {
    if (this.historyMessageList) {
      const scrollHeight = this.historyMessageList.scrollHeight;
      const height = this.historyMessageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.historyMessageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }
  ////handle history chat close
  handleHistoryChatClose() {
    this.setState({
      rowChatId: 0,
      showHistoricalChat: false,
      chatTimeAgo: "",
    });
  }

  ////handle get chat session
  handleGetChatSession() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetChatSession",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;

        if (message === "Success" && data) {
          self.setState({
            tempRemainingCount: data.chatCharLimit,
            remainingCount: data.chatCharLimit,
            isMessageTabActive: data.message,
            isCardTabActive: data.card,
            isRecommendedTabActive: data.recommendedList,
            isSchedualTabActive: data.scheduleVisit,
            isGeneratePaymentTabActive: data.paymentLink,
            isCustomerProfile: data.customerProfile,
            isCustomerProduct: data.customerProduct,
          });
          if (data.message === false) {
            self.setState({
              activeTab: 2,
            });
          } else if (data.card === false) {
            self.setState({
              activeTab: 3,
            });
          } else if (data.recommendedList === false) {
            self.setState({
              activeTab: 4,
            });
          } else if (data.scheduleVisit === false) {
            self.setState({
              activeTab: 5,
            });
          } else if (data.paymentLink === false) {
            self.setState({
              activeTab: 1,
            });
          } else {
            self.setState({
              activeTab: 1,
            });
          }

          if (data.customerProfile) {
            self.setState({ ProfileProductTab: 0 });
          } else {
            self.setState({ ProfileProductTab: 1 });
          }
        } else {
          self.setState({
            tempRemainingCount: "",
            remainingCount: "",
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSession");
      });
  }
  ////handle end customer chat
  handleEndCustomerChat(chatId, message) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/EndCustomerChat",
      headers: authHeader(),
      params: { ChatID: chatId, EndChatMessage: message || "" },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success" && data) {
          self.setState({
            isCustEndChat: true,
          });
          self.handleGetOngoingChat();
          self.handleGetNewChat();
        } else {
          self.setState({
            isCustEndChat: false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleEndCustomerChat");
      });
  }
  ////handle tag button click
  handleTagsButtonClick = (tagsId) => {
    this.setState({ selectedTags: tagsId });
  };
  ////handle get chat sound notification setting
  handleGetChatSoundNotiSetting = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetChatSoundNotiSetting",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          var index = responseData.newMessageSoundFile.lastIndexOf("/") + 1;
          var index1 = responseData.newChatSoundFile.lastIndexOf("/") + 1;
          self.setState({
            // newChatSoundFile: responseData.newChatSoundFile || "",
            newChatSoundFile:
              config.soundURL + responseData.newChatSoundFile.substr(index1) ||
              "",
            // newMessageSoundFile: responseData.newMessageSoundFile || "",
            newMessageSoundFile:
              config.soundURL +
                responseData.newMessageSoundFile.substr(index) || "",
            newChatSoundVolume: responseData.newChatSoundVolume || 0,
            newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
            isNotiNewChat: responseData.isNotiNewChat || false,
            isNotiNewMessage: responseData.isNotiNewMessage || false,
            notificationTime: responseData.notificationTime,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSoundNotiSetting");
      });
  };

  ////handle get chat customer profile details
  handleGetChatCustomerProfile = (customerId) => {
    let self = this;
    if (customerId > 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/GetChatCustomerProfile",
        headers: authHeader(),
        params: { CustomerID: customerId },
      })
        .then((response) => {
          var messgae = response.data.message;
          var responseData = response.data.responseData;

          if (messgae === "Success" && responseData) {
            self.setState({
              customerName: responseData.customerName,
              customerTier: responseData.customerTier,
              customerMobileNo: responseData.customerMobileNo,
              customerEmailID: responseData.customerEmailID,
              totalPoints: responseData.totalPoints,
              lifetimeValue: responseData.lifetimeValue,
              visitCount: responseData.visitCount,
              billNumber: responseData.billNumber || "",
              billAmount: responseData.billAmount,
              transactionDate: responseData.transactionDate,
              insights: responseData.insights || [],
              orderDelivered: responseData.orderDelivered,
              orderShoppingBag: responseData.orderShoppingBag,
              orderReadyToShip: responseData.orderReadyToShip,
              orderReturns: responseData.orderReturns,
            });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  ////handle genrate store pay link
  handleGenerateStorePayLink = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StorePay/GenerateStorePayLink",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var storePayURL = response.data.responseData;
        if (message === "Success" && storePayURL) {
          self.setState({ storePayURL });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGenerateStorePayLink");
      });
  };

  ////handle name mouse enter
  handleNameHover = () => {
    if (!this.state.onHoverName) {
      this.setState({
        onHoverName: !this.state.onHoverName,
      });
    }
  };
  ////handle name hover leave
  handleNameHoverLeave = () => {
    if (this.state.onHoverName && !this.state.isPinClick) {
      this.setState({
        onHoverName: false,
      });
      if (this.state.isCustomerProfile) {
        this.setState({ ProfileProductTab: 0 });
      } else {
        this.setState({ ProfileProductTab: 1 });
      }
    }
  };
  ////handle pin click
  handlePinClick = () => {
    this.setState({
      isPinClick: !this.state.isPinClick,
    });
  };
  ////handle change shutter windows in mobile view
  handleChangeShutterWindow = (isOpne) => {
    this.setState({
      isShutterOpen: isOpne,
    });
    if (this.state.isCustomerProfile) {
      this.setState({ ProfileProductTab: 0 });
    } else {
      this.setState({ ProfileProductTab: 1 });
    }
  };
  ////handle profile product tab change
  handleProfileProductTabChange = (index) => {
    this.setState({ ProfileProductTab: index });
    if (index === 1) {
      this.handleGetChatCustomerProducts();
    }
  };
  ////handle collpse change
  handleCollpseChange = (e) => {
    this.state.activeCollpse = e[e.length - 1];
    this.setState({ activeCollpse: this.state.activeCollpse });
  };
  ////handle get chat customer products
  handleGetChatCustomerProducts = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetChatCustomerProducts",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNo: this.state.mobileNo,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        var shoppingBagData = [];
        var wishListData = [];
        var recommendedData = [];
        if (message === "Success" && responseData) {
          for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].isShoppingBag) {
              responseData[i].isCheck = false;
              shoppingBagData.push(responseData[i]);
            }
            if (responseData[i].isWishList) {
              responseData[i].isCheck = false;
              wishListData.push(responseData[i]);
            }
            if (responseData[i].isRecommended) {
              responseData[i].isCheck = false;
              recommendedData.push(responseData[i]);
            }
          }

          self.setState({
            shoppingBagData,
            wishListData,
            recommendedData,
            mainProductsData: responseData,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatCustomerProducts");
      });
  };

  ////handle shopping bag ,wishlist & recommended product select
  handleProductTabsChange = (tabIndex, itemIndex) => {
    ////for Shopping Bag list
    if (tabIndex === 1) {
      this.state.shoppingBagData[itemIndex].isCheck = !this.state
        .shoppingBagData[itemIndex].isCheck;
      var selectedShoppingBag = [];
      for (let k = 0; k < this.state.shoppingBagData.length; k++) {
        if (this.state.shoppingBagData[k].isCheck) {
          selectedShoppingBag.push(this.state.shoppingBagData[k]);
        }
      }
      this.setState({
        shoppingBagData: this.state.shoppingBagData,
        selectedShoppingBag,
      });
    }
    //// for Wish List
    if (tabIndex === 2) {
      this.state.wishListData[itemIndex].isCheck = !this.state.wishListData[
        itemIndex
      ].isCheck;
      var selectedWishList = [];
      for (let k = 0; k < this.state.wishListData.length; k++) {
        if (this.state.wishListData[k].isCheck) {
          selectedWishList.push(this.state.wishListData[k]);
        }
      }
      this.setState({
        wishListData: this.state.wishListData,
        selectedWishList,
      });
    }
    ////for Recommended list
    if (tabIndex === 3) {
      this.state.recommendedData[itemIndex].isCheck = !this.state
        .recommendedData[itemIndex].isCheck;
      var selectedRecommended = [];
      for (let k = 0; k < this.state.recommendedData.length; k++) {
        if (this.state.recommendedData[k].isCheck) {
          selectedRecommended.push(this.state.recommendedData[k]);
        }
      }
      this.setState({
        recommendedData: this.state.recommendedData,
        selectedRecommended,
      });
    }
  };
  ////handle product type tab change
  handleProductTypeTabChange = (index) => {
    this.state.shoppingBagData.forEach((element) => {
      element.isCheck = false;
    });
    this.state.wishListData.forEach((element) => {
      element.isCheck = false;
    });
    this.state.recommendedData.forEach((element) => {
      element.isCheck = false;
    });
    this.setState({
      shoppingBagData: this.state.shoppingBagData,
      recommendedData: this.state.recommendedData,
      wishListData: this.state.wishListData,
      productTypeTab: index,
      selectedShoppingBag: [],
      selectedWishList: [],
      selectedRecommended: [],
    });
  };

  ///handle select all product base on tab index
  handleSelectAllProduct = (tabIndex) => {
    ////for shopping bag list tab select all
    if (tabIndex === 1) {
      for (let i = 0; i < this.state.shoppingBagData.length; i++) {
        this.state.shoppingBagData[i].isCheck = true;
      }
      var selectedShoppingBag = [];
      for (let k = 0; k < this.state.shoppingBagData.length; k++) {
        if (this.state.shoppingBagData[k].isCheck) {
          selectedShoppingBag.push(this.state.shoppingBagData[k]);
        }
      }
      this.setState({
        shoppingBagData: this.state.shoppingBagData,
        selectedShoppingBag,
      });
    }
    ////for wish list tab select all
    if (tabIndex === 2) {
      for (let i = 0; i < this.state.wishListData.length; i++) {
        this.state.wishListData[i].isCheck = true;
      }
      var selectedWishList = [];
      for (let k = 0; k < this.state.wishListData.length; k++) {
        if (this.state.wishListData[k].isCheck) {
          selectedWishList.push(this.state.wishListData[k]);
        }
      }
      this.setState({
        wishListData: this.state.wishListData,
        selectedWishList,
      });
    }
    ////for recommended tab select all
    if (tabIndex === 3) {
      for (let i = 0; i < this.state.recommendedData.length; i++) {
        this.state.recommendedData[i].isCheck = true;
      }
      var selectedRecommended = [];
      for (let k = 0; k < this.state.recommendedData.length; k++) {
        if (this.state.recommendedData[k].isCheck) {
          selectedRecommended.push(this.state.recommendedData[k]);
        }
      }
      this.setState({
        recommendedData: this.state.recommendedData,
        selectedRecommended,
      });
    }
  };
  ////handle remove product
  handleRemoveProduct = (itemCode, fromType) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/RemoveProduct",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNo: this.state.mobileNo,
        ItemCode: itemCode,
        RemoveFrom: fromType,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.handleGetChatCustomerProducts();
        }
      })
      .catch((response) => {
        console.log(response, "---handleRemoveProduct");
      });
  };
  ////handle add products to shopping bag
  handleAddProductsToShoppingBag = () => {
    let self = this;
    var itemCode = "";
    if (this.state.selectedWishList.length > 0) {
      for (let i = 0; i < this.state.selectedWishList.length; i++) {
        if (this.state.selectedWishList[i].isCheck) {
          itemCode += this.state.selectedWishList[i].uniqueItemCode + ",";
        }
      }
    }
    this.setState({ isButtonClick: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/AddProductsToShoppingBag",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNo: this.state.mobileNo,
        ItemCodes: itemCode,
        IsFromRecommendation: false,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          self.setState({ selectedWishList: [], isButtonClick: false });
          self.handleGetChatCustomerProducts();
        } else {
          self.setState({ isButtonClick: false });
        }
      })
      .catch((response) => {
        console.log(response, "---AddProductsToShoppingBag");
      });
  };
  ////handle add products to wish list
  handleAddProductsToWishlist = (formType) => {
    let self = this;
    var itemCode = "";
    if (this.state.selectedRecommended.length > 0 && formType) {
      for (let i = 0; i < this.state.selectedRecommended.length; i++) {
        if (this.state.selectedRecommended[i].isCheck) {
          itemCode += this.state.selectedRecommended[i].uniqueItemCode + ",";
        }
      }
    }
    if (this.state.selectedShoppingBag.length > 0 && !formType) {
      for (let i = 0; i < this.state.selectedShoppingBag.length; i++) {
        if (this.state.selectedShoppingBag[i].isCheck) {
          itemCode += this.state.selectedShoppingBag[i].uniqueItemCode + ",";
        }
      }
    }

    this.setState({ isButtonClick: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/AddProductsToWishlist",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNo: this.state.mobileNo,
        ItemCodes: itemCode,
        IsFromRecommendation: formType || false,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          if (formType) {
            self.setState({ selectedRecommended: [], isButtonClick: false });
          } else {
            self.setState({ selectedShoppingBag: [], isButtonClick: false });
          }
          self.handleGetChatCustomerProducts();
        } else {
          self.setState({ isButtonClick: false });
        }
      })
      .catch((response) => {
        console.log(response, "---AddProductsToShoppingBag");
      });
  };
  ////handle mobile view back button
  handleBackButton = () => {
    this.setState({ customerName: "", isHistoricalChat: false });
  };
  ////handle notification click
  handleNotificationClick = (chatData, notificationKey) => {
    notification.close(notificationKey);
    this.handleOngoingChatClick(
      chatData[0].chatID,
      chatData[0].cumtomerName,
      chatData[0].messageCount,
      chatData[0].mobileNo,
      chatData[0].customerID,
      chatData[0].programCode,
      chatData[0].storeID,
      chatData[0].isCustEndChat,
      chatData[0].storeManagerId,
      chatData[0].initialColor
    );
  };
  ////handle check is mobile view active or not
  handleCheckView() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.setState({ isMobileView: true });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  ////handle new chat notification click
  handleNewChatNotification = (chatData, notificationKey) => {
    if (notificationKey) {
      notification.close(notificationKey);
    }
    this.setState({ newTicketChatId: 0 });
    this.handleUpdateCustomerChatStatus(
      chatData[0].chatID,
      chatData[0].storeManagerId,
      chatData[0].storeID,
      chatData[0].cumtomerName,
      chatData[0].mobileNo,
      chatData[0].customerID,
      chatData[0].programCode
    );
  };
  ////handle buy now button
  handleBuyNowButtonClick = () => {
    this.setState({ buyNowClick: !this.state.buyNowClick });
  };
  ////handle address modal close
  handleAddressModalClose = () => {
    this.setState({
      addressModal: false,
      isPinCodeCheck: "",
      isAddress: "",
      isPinCode: "",
      isCity: "",
      isState: "",
      isCountry: "",
      shippingAddress: "",
      shippingCity: "",
      shippingLandmark: "",
      shippingPinCode: "",
      shippingState: "",
      shippingCountry: "",
    });
  };
  ////handle address modal open
  handleAddressModalOpen = () => {
    this.setState({ addressModal: true });
    this.handleGetCheckServiceData();
  };
  ////handle modal text on change
  handleTextOnchage = (e) => {
    const { name, value } = e.target;

    if (name === "shippingAddress") {
      if (value) {
        this.setState({ [name]: value, isAddress: "" });
      } else {
        this.setState({ [name]: value, isAddress: "Please Enter Address." });
      }
    }
    if (name === "shippingPinCode") {
      if (value) {
        this.setState({ [name]: value, isPinCode: "" });
      } else {
        this.setState({ [name]: value, isPinCode: "Please Enter Pincode." });
      }
    }

    if (name === "shippingCity") {
      if (value) {
        this.setState({ [name]: value, isCity: "" });
      } else {
        this.setState({ [name]: value, isCity: "Please Enter City." });
      }
    }

    if (name === "shippingState") {
      if (value) {
        this.setState({ [name]: value, isState: "" });
      } else {
        this.setState({ [name]: value, isState: "Please Enter State." });
      }
    }
    if (name === "shippingCountry") {
      if (value) {
        this.setState({ [name]: value, isCountry: "" });
      } else {
        this.setState({ [name]: value, isCountry: "Please Enter Country." });
      }
    }
    if (name === "shippingLandmark") {
      this.setState({ [name]: value });
    }
  };
  ////handle buy products on chat
  handleBuyProductsOnChat = (isFromRecommendation, isDirectBuy) => {
    let self = this;

    if (!this.state.shippingAddress) {
      this.setState({ isAddress: "Please Enter Address." });
    } else {
      this.setState({ isAddress: "" });
    }
    if (!this.state.shippingPinCode) {
      this.setState({ isPinCode: "Please Enter Pincode." });
    } else {
      this.setState({ isPinCode: "" });
    }
    if (!this.state.shippingCity) {
      this.setState({ isCity: "Please Enter City." });
    } else {
      this.setState({ isCity: "" });
    }
    if (!this.state.shippingState) {
      this.setState({ isState: "Please Enter State." });
    } else {
      this.setState({ isState: "" });
    }
    if (!this.state.shippingCountry) {
      this.setState({ isCountry: "Please Enter Country." });
    } else {
      this.setState({ isCountry: "" });
    }
    if (
      this.state.isAddress === "" &&
      this.state.isPinCode === "" &&
      this.state.isCity === "" &&
      this.state.isState === "" &&
      this.state.isCountry === "" &&
      this.state.isPinCodeCheck === ""
    ) {
      var addressDetails = {};
      addressDetails.address = this.state.shippingAddress || "";
      addressDetails.landmark = this.state.shippingLandmark || "";
      addressDetails.pinCode = this.state.shippingPinCode;
      addressDetails.city = this.state.shippingCity || "";
      addressDetails.state = this.state.shippingState || "";
      addressDetails.country = this.state.shippingCountry || "";
      var itemCodes = "";
      /////for recommendation
      if (isFromRecommendation) {
        for (let i = 0; i < this.state.selectedRecommended.length; i++) {
          itemCodes += this.state.selectedRecommended[i].uniqueItemCode + ",";
        }
      }
      /////for wish list
      if (this.state.productTypeTab == 1 && isFromRecommendation === false) {
        for (let i = 0; i < this.state.selectedWishList.length; i++) {
          itemCodes += this.state.selectedWishList[i].uniqueItemCode + ",";
        }
      }
      /////for shopping bag list
      if (this.state.productTypeTab == 0 && isFromRecommendation === false) {
        for (let i = 0; i < this.state.selectedShoppingBag.length; i++) {
          itemCodes += this.state.selectedShoppingBag[i].uniqueItemCode + ",";
        }
      }
      var inputParam = {};
      inputParam.CustomerID = this.state.customerId;
      inputParam.CustomerMobile = this.state.mobileNo;
      inputParam.IsFromRecommendation = isFromRecommendation;
      inputParam.IsDirectBuy = isDirectBuy;
      inputParam.ItemCodes = itemCodes;
      if (isDirectBuy === false) {
        inputParam.CustomerAddress = addressDetails;
      }

      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/BuyProductsOnChat",
        headers: authHeader(),
        data: inputParam,
      })
        .then((response) => {
          var message = response.data.response;
          var responseData = response.data.responseData;

          if (message === "Success" && responseData) {
            self.setState({
              selectedRecommended: [],
              selectedShoppingBag: [],
              selectedWishList: [],
              addressModal: false,
              shippingAddress: "",
              shippingCity: "",
              shippingCountry: "",
              shippingPinCode: "",
              shippingState: "",
              shippingLandmark: "",
            });
            NotificationManager.success("Products Buy Successfully.");
            self.handleGetChatCustomerProducts();
          }
        })
        .catch((response) => {
          console.log(response, "---handleBuyProductsOnChat");
        });
    }
  };

  handleSendProductsOnChat = (isCard) => {
    var selectedProduct = [];
    if (isCard) {
      selectedProduct = this.state.searchCardData.filter(
        (x) => x.itemID === this.state.selectedCard
      );
      selectedProduct.forEach((element) => {
        element.IsCard = true;
      });
    } else {
      if (this.state.productTypeTab == 0) {
        this.state.selectedShoppingBag.forEach((element) => {
          var finleData = this.state.mainProductsData.filter(
            (x) => x.uniqueItemCode === element.uniqueItemCode
          )[0];
          selectedProduct.push(finleData);
        });
      }

      if (this.state.productTypeTab == 1) {
        this.state.selectedWishList.forEach((element) => {
          var finleData = this.state.mainProductsData.filter(
            (x) => x.uniqueItemCode === element.uniqueItemCode
          )[0];
          selectedProduct.push(finleData);
        });
      }
      if (this.state.productTypeTab == 2) {
        this.state.selectedRecommended.forEach((element) => {
          var finleData = this.state.mainProductsData.filter(
            (x) => x.uniqueItemCode === element.uniqueItemCode
          )[0];
          selectedProduct.push(finleData);
        });
      }
    }

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/SendProductsOnChat",
      headers: authHeader(),
      data: {
        ChatID: this.state.chatId,
        Products: selectedProduct,
        CustomerMobile: this.state.customerMobileNo,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          if (!isCard) {
            self.setState({ selectedCard: 0 });
            self.handleGetChatMessagesList(self.state.chatId);
          }
        }
      })
      .catch((response) => {
        console.log(response, "----handleSendProductsOnChat");
      });
  };
  ////handle mobile action menu click
  handleMobileActionMenuClick = (e) => {
    if (e.key == 1) {
      this.handleUpdateStoreManagerChatStatus(3);
    }
  };
  /// handle Pin code change
  handlePinCodeCheck(e) {
    var reg = /^[0-9\b]+$/;

    if (!isNaN(e.target.value)) {
      this.setState({
        shippingPinCode: e.target.value,
        isPinCode: "",
        isPinCodeCheck: "",
      });
      if (e.target.value.length === 6) {
        this.handleCheckCourierAvailibilty(e.target.value);
      }
    } else {
      this.setState({ shippingPinCode: "", isPinCode: "", isPinCodeCheck: "" });
    }
  }
  ////handle get check server data
  handleGetCheckServiceData() {
    let self = this;
    if (!this.state.storePinCode) {
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/GetStorePinCodeByUserID",
        headers: authHeader(),
      })
        .then(function(response) {
          let status = response.data.message;
          let data = response.data.responseData;
          if (status === "Success") {
            self.setState({
              storePinCode: data,
            });
          } else {
            self.setState({
              storePinCode: "",
            });
          }
        })
        .catch((response) => {
          console.log(response, "---handleGetCheckServiceData");
        });
    }
  }
  ///handle check couier availibilty
  handleCheckCourierAvailibilty = (shippingPinCode) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/CheckCourierAvailibilty",
      headers: authHeader(),
      data: {
        Pickup_postcode: parseInt(this.state.storePinCode),
        Delivery_postcode: parseInt(shippingPinCode),
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          var available = responseData.available;
          var statusCode = responseData.statusCode;
          var state = responseData.state;
          if (available === "true" && statusCode === "200") {
            self.setState({ shippingState: state, isPinCodeCheck: "" });
          } else {
            self.setState({
              isPinCodeCheck: "Not Courier Availible",
            });
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleCheckCourierAvailibilty");
      });
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <React.Fragment>
        <div
          className="d-flex align-items-center justify-content-between d-nonemob"
          style={{ background: "white" }}
        >
          <div className="d-flex">
            <div className="er bell-icon">
              <img src={BellIcon} alt="bell icon" />
            </div>
            <div className="hamb-menu">
              <img
                src={Hamb}
                onClick={this.handleShowMenu.bind(this)}
                alt="hamburger icon"
              />
            </div>
            <div className="headers-menu">
              {this.state.cont.map((item) => {
                if (item.data === "Store Pay" || item.data === "स्टोर पे") {
                  return (
                    <a key={item.data} className="storepay-a single-menu">
                      {item.logoBlack ? (
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
                      ) : null}
                      <label
                        onClick={this.handleGenerateStorePayLink.bind(this)}
                      >
                        {item.data}
                      </label>
                    </a>
                  );
                } else {
                  return (
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
                  );
                }
              })}
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
                  {this.state.chatMessageCount || 0}
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
            <input
              type="hidden"
              value={this.state.newTicketChatId}
              id="newTicketChatId"
            />
            <a href="#!" className="bitmap5" onClick={this.onOpenModal}>
              {this.state.UserName.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </a>
          </div>
        </div>
        <div className="mob-header">
          <div className="hamb-menu">
            <img
              src={Hambw}
              onClick={this.handleShowMenu.bind(this)}
              alt="hamburger icon"
            />
          </div>
          <label className="cusheadermob">
            {this.state.mobileHeading === "Task"
              ? "Campaign"
              : this.state.mobileHeading}
          </label>
          <div className="header-right-icons">
            <a
              id="chatwindow"
              onClick={this.handleChatModalOpen.bind(this)}
              style={{ display: this.state.chatAccess }}
            >
              <div className="position-relative">
                <img src={ChatLogow} alt="logo" className="chatImg" />
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
            <a className="verticaldots">
              <img src={Dots} alt="Dots" className="" />
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
                  {TranslationContext !== undefined
                    ? TranslationContext.button.logout
                    : "LOGOUT"}
                </button>
              </div>
            </div>
            <div className="status-sctn alignradio d-none">
              <div className="d-flex align-items-center">
                <div className="logout-status" style={{ marginTop: "10px" }}>
                  <img src={StatusLogo} alt="status" />
                </div>
                <p className="logout-label chat-status">
                  {TranslationContext !== undefined
                    ? TranslationContext.p.chatstatus
                    : "CHAT STATUS"}{" "}
                  :
                </p>
              </div>
              <div className="status-options">
                <input type="radio" name="logout-status" id="online" />
                <label htmlFor="online" className="logout-label">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.online
                    : "Online"}
                </label>
              </div>
              <div className="status-options">
                <input type="radio" name="logout-status" id="away" />
                <label htmlFor="away" className="logout-label">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.away
                    : "Away"}
                </label>
              </div>
              <div className="status-options">
                <input type="radio" name="logout-status" id="offline" />
                <label htmlFor="offline" className="logout-label">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.offline
                    : "Offline"}
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
                  <p className="font-weight-bold" style={{ fontSize: "16px" }}>
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
                          {TranslationContext !== undefined
                            ? TranslationContext.div.view
                            : "VIEW"}
                        </div>
                      </Popover>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Modal>
        <Drawer
          placement="left"
          closable={false}
          onClose={this.handleCloseManu.bind(this)}
          visible={this.state.visible}
          overlayClassName="cussidebar"
        >
          <img
            src={CancelIconW}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleCloseManu.bind(this)}
          />
          <div className="mobsidebar">
            <div className="uppersec">
              <ul>
                <li>
                  <img src={BellIcon} alt="Icon" />
                </li>
                <li>
                  <h3>{this.state.UserName}</h3>
                  <p>{this.state.storeCode}</p>
                </li>
              </ul>
            </div>
            <div className="lowersec">
              <ul>
                {this.state.cont.map((item) => {
                  if (item.data === "Store Pay" || item.data === "स्टोर पे") {
                    return (
                      <>
                        <li key={item.data}>
                          <a className="storepay-a single-menu">
                            {item.logoBlack ? (
                              <span className="header-icons-cntr mr-0">
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
                              </span>
                            ) : null}

                            <label
                              onClick={this.handleGenerateStorePayLink.bind(
                                this
                              )}
                            >
                              {item.data}
                            </label>
                          </a>
                        </li>
                      </>
                    );
                  } else {
                    return (
                      <li key={item.data}>
                        <Link
                          onClick={this.actives}
                          to={item.urls}
                          className={item.activeClass}
                        >
                          <span className="header-icons-cntr mr-0">
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
                          </span>
                          {item.data === "Task" ? "Campaign" : item.data}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="logoutbox">
              <ul>
                <li>
                  <img src={Logout} alt="Logout" />
                  {TranslationContext !== undefined
                    ? TranslationContext.span.logout
                    : "Logout"}
                </li>
              </ul>
            </div>
          </div>
        </Drawer>
        {/*----------------- chat modal-------------- */}
        <Modal
          onClose={this.handleChatModalClose.bind(this)}
          open={this.state.chatModal}
          modalId="chat-popup"
          overlayId="chat-popup-overlay"
        >
          <div className="store-chat-header">
            {this.state.isMainLoader && this.state.isMobileView ? (
              <div className="loader"></div>
            ) : null}
            <img src={Chatw} className="Chatw" alt="Chatw" />
            <h3
              style={{
                marginRight: this.state.isMainLoader
                  ? "15px"
                  : this.state.isMobileView
                  ? "54%"
                  : "88%",
              }}
            >
              {TranslationContext !== undefined
                ? TranslationContext.h3.storechatwindow
                : "Store chat"}
            </h3>
            {this.state.isMainLoader && !this.state.isMobileView ? (
              <div className="loader"></div>
            ) : null}
            <span className="rounded-cross" onClick={this.handleChatModalClose}>
              &times;
            </span>
            {this.state.isMobileView ? (
              <img
                src={CancelIconW}
                className="Cancelicow"
                alt="Cancelicow"
                onClick={this.handleChatModalClose}
              />
            ) : null}
            {(this.state.isMobileView && this.state.customerName) ||
            this.state.isHistoricalChat ? (
              <img
                src={BackArw}
                className="BackArw"
                alt="BackArw"
                onClick={this.handleBackButton.bind(this)}
              />
            ) : null}
          </div>
          <div className="container-fluid">
            <div className="row">
              <div
                className={
                  this.state.isMobileView &&
                  !this.state.customerName &&
                  !this.state.isHistoricalChat
                    ? "firstbox firstbox-show"
                    : this.state.isMobileView && this.state.isHistoricalChat
                    ? "firstbox firstbox-hide"
                    : this.state.onHoverName
                    ? "firstbox firstbox-hide"
                    : "firstbox firstbox-hide firstbox-full"
                }
              >
                <div
                  className="chatbot-left"
                  style={{ backgroundColor: "#ECF2F4" }}
                >
                  <div
                    className="chat-cntr"
                    style={{
                      padding: "0px",
                      backgroundColor: "#FFFEF7",
                    }}
                  >
                    <span className="input-group-addon seacrh-img-chatsearch chatsearchtxt-span">
                      {this.state.searchChat === "" ? (
                        <img
                          src={SearchBlueImg}
                          alt="SearchBlueImg"
                          className="srch-imge"
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
                    <input
                      type="text"
                      style={{ padding: "0px" }}
                      className="search-customerChatSrch"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.search
                          : "Search Chat by Customer Name"
                      }
                      name="Search"
                      maxLength="100"
                      autoComplete="off"
                      value={this.state.searchChat}
                      onChange={this.handleGetOngoingChat.bind(this)}
                    />
                  </div>
                  <div
                    className="chat-cntr"
                    style={{ backgroundColor: "#FFFEF7" }}
                  >
                    <p className="chats-heading d-flex justify-content-between align-items-center">
                      {TranslationContext !== undefined
                        ? TranslationContext.p.newchats
                        : "New Chats"}{" "}
                      (
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
                              chat.chatID,
                              chat.storeManagerId,
                              chat.storeID,
                              chat.cumtomerName,
                              chat.mobileNo,
                              chat.customerID,
                              chat.programCode
                            )}
                          >
                            <div className="d-flex align-items-center overflow-hidden">
                              <span
                                className="initial"
                                style={{
                                  backgroundColor: chat.initialColor,
                                }}
                              >
                                {chat.cumtomerName.charAt(0)}
                              </span>
                              <div className="name-num mx-2">
                                <p className="chat-name">{chat.cumtomerName}</p>
                                <p className="num">{chat.mobileNo}</p>
                              </div>
                            </div>
                            <div>
                              <div className="mess-time">
                                {!this.state.onHoverName ? (
                                  <p
                                    style={{
                                      fontWeight:
                                        chat.messageCount > 0 ? "bold" : "400",
                                    }}
                                  >
                                    {chat.messageCount === 0 ? (
                                      "No"
                                    ) : (
                                      <span className="messagecount">
                                        {chat.messageCount}
                                      </span>
                                    )}{" "}
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.newmessages
                                      : "New Messages"}
                                  </p>
                                ) : null}
                                <p>{chat.timeAgo}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    className="chat-cntr oc-bg"
                    style={{ backgroundColor: "#ECF2F4" }}
                  >
                    <div className="chats-heading d-flex justify-content-between align-items-center">
                      {TranslationContext !== undefined
                        ? TranslationContext.p.ongoingchats
                        : "Ongoing Chats"}
                      (
                      {this.state.ongoingChatsData.length < 9
                        ? "0" + this.state.ongoingChatsData.length
                        : this.state.ongoingChatsData.length}
                      )
                      {!this.state.onHoverName ? (
                        <Select
                          className="agentchatdrop-down"
                          showArrow={true}
                          value={this.state.sAgentId}
                          onChange={this.handleChangeAgentDropdown.bind(this)}
                        >
                          <Option value={0}>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.allstoremember
                              : "Agent ALL"}
                          </Option>
                          {this.state.agentData !== null &&
                            this.state.agentData.map((item, i) => {
                              return (
                                <Option
                                  key={i}
                                  value={Number(item.storeManagerID)}
                                >
                                  {item.agentName}
                                </Option>
                              );
                            })}
                        </Select>
                      ) : null}
                    </div>
                    <div className="chat-left-height">
                      {this.state.ongoingChatsData
                        ? this.state.ongoingChatsData.map((chat, i) => (
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
                                chat.storeID,
                                chat.isCustEndChat,
                                chat.storeManagerId,
                                chat.initialColor
                              )}
                            >
                              <div className="d-flex align-items-center overflow-hidden">
                                <div className="chat-initial-brd">
                                  <span
                                    className="initial"
                                    style={{
                                      backgroundColor: chat.initialColor,
                                    }}
                                  >
                                    {chat.cumtomerName.charAt(0)}
                                  </span>
                                </div>
                                <div className="name-num mx-2">
                                  <p className="chat-name">
                                    {chat.cumtomerName}
                                  </p>
                                  <p className="num">{chat.mobileNo}</p>
                                </div>
                              </div>
                              <div>
                                <div className="mess-time">
                                  <p>{chat.timeAgo}</p>
                                  {!this.state.onHoverName ? (
                                    <p
                                      className={"chat-storemng "}
                                      title="Store Manager"
                                    >
                                      {chat.storeManagerName}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>

                  <div
                    className="chat-hist"
                    style={{ backgroundColor: "#ECF2F4" }}
                  >
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
                        {TranslationContext !== undefined
                          ? TranslationContext.a.myhistoricalchat
                          : "MY HISTORICAL CHAT"}
                      </a>
                    </li>
                  </div>
                </div>
              </div>

              <div
                className={
                  this.state.onHoverName
                    ? "secondbox"
                    : this.state.customerName &&
                      (this.state.isCustomerProduct ||
                        this.state.isCustomerProfile)
                    ? "secondbox secondbox-open"
                    : (this.state.isMobileView && this.state.customerName) ||
                      (this.state.isMobileView && this.state.isHistoricalChat)
                    ? "secondbox secondbox-open-new-show"
                    : "secondbox-open-new secondbox-open-new-hide"
                }
              >
                <div className="chatbot-right">
                  {this.state.isHistoricalChat !== true ? (
                    <div className="row" style={{ margin: "0" }}>
                      <div
                        className="chatdivtitle"
                        style={{ padding: "5px", height: "" }}
                      >
                        <ul
                          className="nav nav-tabs"
                          role="tablist"
                          style={{
                            width: "50%",
                            display: "inline-block",
                            border: "none",
                          }}
                        >
                          {this.state.customerName ? (
                            <>
                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.mainTabSelect === 1
                                      ? "nav-link active chatupperbtn"
                                      : "nav-link chatupperbtn"
                                  }
                                  data-toggle="tab"
                                  href="#current-chat"
                                  role="tab"
                                  aria-controls="current-chat"
                                  aria-selected="true"
                                  onClick={this.handleMainTabChange.bind(
                                    this,
                                    1
                                  )}
                                >
                                  {/* Current Chat */}
                                  {this.state.customerName}
                                </a>
                              </li>

                              <li className="nav-item">
                                <a
                                  className={
                                    this.state.mainTabSelect === 2
                                      ? "nav-link active chatupperbtn"
                                      : "nav-link chatupperbtn"
                                  }
                                  data-toggle="tab"
                                  href="#recent-chat"
                                  role="tab"
                                  aria-controls="recent-chat"
                                  aria-selected="true"
                                  onClick={this.handleMainTabChange.bind(
                                    this,
                                    2
                                  )}
                                >
                                  {this.state.agentRecentChatData.length < 9
                                    ? TranslationContext !== undefined
                                      ? TranslationContext.label.pastchat0 +
                                        this.state.agentRecentChatData.length +
                                        ")"
                                      : "Past Chat(0" +
                                        this.state.agentRecentChatData.length +
                                        ")"
                                    : TranslationContext !== undefined
                                    ? TranslationContext.label.pastchat +
                                      this.state.agentRecentChatData.length +
                                      ")"
                                    : "Past Chat(" +
                                      this.state.agentRecentChatData.length +
                                      ")"}
                                </a>
                              </li>
                            </>
                          ) : null}
                        </ul>
                        {this.state.customerName !== "" ? (
                          <button
                            type="button"
                            className="chatactionbtn"
                            onClick={this.handleActionOpen.bind(this)}
                          >
                            <label className="myticket-submit-solve-button-text">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.action
                                : "Action"}
                            </label>
                            <img
                              src={DownArw}
                              alt="down-icon"
                              className="down-white"
                            />
                          </button>
                        ) : null}
                      </div>
                      <div
                        className="tab-content chattabtitle"
                        style={{
                          backgroundColor: "#f5f5f5",
                          marginTop:
                            this.state.isCustomerProduct === false &&
                            this.state.isCustomerProfile === false
                              ? "0"
                              : "",
                        }}
                      >
                        <div
                          className={
                            this.state.mainTabSelect === 1
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="current-chat"
                          role="tabpanel"
                          aria-labelledby="current-chat"
                        >
                          {this.state.isDownbtn ? (
                            <div
                              className="chatcontentRow"
                              style={{
                                height:
                                  !this.state.isMessageTabActive &&
                                  !this.state.isCardTabActive &&
                                  !this.state.isRecommendedTabActive &&
                                  !this.state.isSchedualTabActive &&
                                  !this.state.isGeneratePaymentTabActive
                                    ? "80%"
                                    : "",
                              }}
                            >
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
                                            item.byCustomer === true &&
                                            item.isBotReply !== true
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
                                          </div>
                                          <div className="chat-trail-chat-cntr">
                                            {item.isBotReply && (
                                              <p className="bot-mark">
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.p.bot
                                                  : "BOT"}
                                              </p>
                                            )}
                                            <div className="chat-trail-chat pd-0">
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
                                            </div>
                                            <span className="chat-trail-time">
                                              {item.chatDate + " "}
                                              {item.chatTime}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })
                                  : null}
                              </div>
                              {this.state.isCustEndChat &&
                              this.state.customerName !== "" ? (
                                <label className="endchatlbl">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label
                                        .customerhasendchat
                                    : "Customer has ended the conversation"}
                                </label>
                              ) : null}
                            </div>
                          ) : null}
                          {this.state.isMessageTabActive ||
                          this.state.isCardTabActive ||
                          this.state.isRecommendedTabActive ||
                          this.state.isSchedualTabActive ||
                          this.state.isGeneratePaymentTabActive ? (
                            <div
                              className="chatcontentdivtab chat-tabs-desktop"
                              style={{
                                maxHeight: !this.state.isDownbtn ? "531px" : "",
                                pointerEvents:
                                  this.state.isCustEndChat === true
                                    ? "none"
                                    : "all",
                              }}
                            >
                              {this.state.customerName !== "" ? (
                                <ul className="nav nav-tabs" role="tablist">
                                  {this.state.isMessageTabActive ? (
                                    <li className="nav-item">
                                      <a
                                        className={
                                          this.state.activeTab === 1 &&
                                          this.state.isMessageTabActive
                                            ? "nav-link active"
                                            : "nav-link"
                                        }
                                        data-toggle="tab"
                                        href="#message-tab"
                                        role="tab"
                                        aria-controls="message-tab"
                                        aria-selected="true"
                                        onClick={this.handleTabClick.bind(
                                          this,
                                          1
                                        )}
                                        id="one"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.message
                                          : "MESSAGE"}
                                      </a>
                                    </li>
                                  ) : null}
                                  {this.state.isCardTabActive ? (
                                    <li className="nav-item">
                                      <a
                                        className={
                                          this.state.activeTab === 2
                                            ? "nav-link active"
                                            : "nav-link"
                                        }
                                        data-toggle="tab"
                                        href="#card-tab"
                                        role="tab"
                                        aria-controls="card-tab"
                                        aria-selected="false"
                                        onClick={this.handleTabClick.bind(
                                          this,
                                          2
                                        )}
                                        id="two"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.card
                                          : "CARD"}
                                      </a>
                                    </li>
                                  ) : null}
                                  {this.state.isRecommendedTabActive ? (
                                    <li className="nav-item">
                                      <a
                                        className={
                                          this.state.activeTab === 3
                                            ? "nav-link active"
                                            : "nav-link"
                                        }
                                        data-toggle="tab"
                                        href="#recommended-list-tab"
                                        role="tab"
                                        aria-controls="recommended-list-tab"
                                        aria-selected="false"
                                        onClick={this.handleTabClick.bind(
                                          this,
                                          3
                                        )}
                                        id="three"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.recommendedlist
                                          : "RECOMMENDED LIST"}
                                      </a>
                                    </li>
                                  ) : null}
                                  {this.state.isSchedualTabActive ? (
                                    <li className="nav-item">
                                      <a
                                        className={
                                          this.state.activeTab === 5
                                            ? "nav-link active"
                                            : "nav-link"
                                        }
                                        data-toggle="tab"
                                        href="#schedule-visit-tab"
                                        role="tab"
                                        aria-controls="schedule-visit-tab"
                                        aria-selected="false"
                                        onClick={this.handleTabClick.bind(
                                          this,
                                          4
                                        )}
                                        id="four"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.schedulevisit
                                          : "SCHEDULE VISIT"}
                                      </a>
                                    </li>
                                  ) : null}
                                  {this.state.isGeneratePaymentTabActive ? (
                                    <li className="nav-item">
                                      <a
                                        className={
                                          this.state.activeTab === 5
                                            ? "nav-link active"
                                            : "nav-link"
                                        }
                                        data-toggle="tab"
                                        href="#generate-payment-link-tab"
                                        role="tab"
                                        aria-controls="generate-payment-link-tab"
                                        aria-selected="false"
                                        onClick={this.handleTabClick.bind(
                                          this,
                                          5
                                        )}
                                        id="five"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.schedulevisit
                                          : "GENERATE PAYMENT LINK"}
                                      </a>
                                    </li>
                                  ) : null}
                                </ul>
                              ) : null}
                              <div className="tab-content">
                                {/* --------Message Tab----- */}
                                {this.state.isMessageTabActive &&
                                this.state.customerName ? (
                                  <div
                                    className={
                                      this.state.customerName !== "" &&
                                      this.state.activeTab === 1
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
                                        {this.state.remainingCount + ""}
                                        {/* {TranslationContext !== undefined
                                          ? TranslationContext.p
                                              .charactersremaining
                                          :  
                                          
                                           }*/}
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .charactersremaining
                                          : " characters remaining..."}
                                      </p>
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
                                      {this.state.messageSuggestionTagsData !==
                                      null
                                        ? this.state.messageSuggestionTagsData.map(
                                            (item, i) => {
                                              return (
                                                <button
                                                  onClick={this.handleTagsButtonClick.bind(
                                                    this,
                                                    item.tagID
                                                  )}
                                                  className={
                                                    this.state.selectedTags ===
                                                    item.tagID
                                                      ? "tagsbtn-active"
                                                      : "tagsbtn"
                                                  }
                                                  id={item.tagID}
                                                >
                                                  {item.tagName}
                                                </button>
                                              );
                                            }
                                          )
                                        : null}
                                      {this.state.messageSuggestionData !==
                                        null &&
                                        this.state.messageSuggestionData
                                          .length > 0 &&
                                        this.state.messageSuggestionData
                                          .length > 0 && (
                                          <div
                                            className="suggestions-cntr setpagination"
                                            style={{ width: "100%" }}
                                          >
                                            <Table
                                              noDataContent="No Record Found"
                                              style={{ width: "100%" }}
                                              className="components-table-demo-nested antd-table-campaign custom-antd-table rm-header"
                                              columns={[
                                                {
                                                  dataIndex: "suggestionText",
                                                  render: (row, rowData) => {
                                                    i = i + 1;
                                                    return (
                                                      <div
                                                        className={
                                                          this.state
                                                            .chkSuggestion ===
                                                          rowData.suggestionID
                                                            ? "suggestions-tick"
                                                            : ""
                                                        }
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        id={i}
                                                        onClick={this.onOpenMobSuggestionModal.bind(
                                                          this,
                                                          rowData.suggestionText,
                                                          rowData.suggestionID
                                                        )}
                                                      >
                                                        <Tooltip
                                                          placement="left"
                                                          title={
                                                            rowData.suggestionText
                                                          }
                                                        >
                                                          <span>
                                                            {
                                                              rowData.suggestionText
                                                            }
                                                          </span>
                                                        </Tooltip>
                                                      </div>
                                                    );
                                                  },
                                                },
                                              ]}
                                              dataSource={this.state.messageSuggestionData.filter(
                                                (x) =>
                                                  x.tagID ==
                                                  this.state.selectedTags
                                              )}
                                              pagination={{
                                                pageSize: 10,
                                                defaultPageSize: 10,
                                              }}
                                            ></Table>
                                          </div>
                                        )}

                                      {this.state.storeAgentDetail.length !==
                                        0 &&
                                      this.state.storeAgentDetail[0]
                                        .suggestion === 1 ? (
                                        <div
                                          className="mobile-ck-send"
                                          onClick={this.handleMessageSuggestion.bind(
                                            this
                                          )}
                                          title={"Search"}
                                        >
                                          <img
                                            src={SuggSearch}
                                            alt="send img"
                                          />
                                        </div>
                                      ) : null}
                                      {this.state.storeAgentDetail.length !==
                                        0 &&
                                      this.state.storeAgentDetail[0]
                                        .freeText === 1 ? (
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
                                ) : null}
                                {/* --------Card Tab----- */}
                                {this.state.isCardTabActive &&
                                this.state.customerName ? (
                                  <div
                                    className={
                                      this.state.activeTab === 2
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
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                  .searchitemidarticleskuid
                                              : "Search ItemId/artcile/SKU ID"
                                          }
                                          name="Search"
                                          maxLength="100"
                                          autoComplete="off"
                                          value={this.state.searchItem}
                                          onChange={this.handleSearchItemChange.bind(
                                            this
                                          )}
                                          onKeyPress={this.enterPressed.bind(
                                            this
                                          )}
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
                                          />
                                        </span>
                                        {this.state.searchCardData.length ===
                                          0 && (
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
                                        {this.state.searchCardData !== null
                                          ? this.state.searchCardData.map(
                                              (item, i) => {
                                                return (
                                                  <div
                                                    className="col-md-6"
                                                    key={i}
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
                                                        <div
                                                          className="row"
                                                          style={{
                                                            margin: "0",
                                                          }}
                                                        >
                                                          <div
                                                            className="col-md-4 mb-md-0 mb-2"
                                                            style={{
                                                              alignSelf:
                                                                "center",
                                                            }}
                                                          >
                                                            {item.imageURL !==
                                                            "" ? (
                                                              <img
                                                                className="chat-product-img"
                                                                src={
                                                                  item.imageURL
                                                                }
                                                                alt="Product Image"
                                                                title={
                                                                  item.productName
                                                                }
                                                              />
                                                            ) : (
                                                              <Dropzone
                                                                maxSize={
                                                                  5242880
                                                                }
                                                                accept="image/jpeg, image/png,image/jpg"
                                                                onDrop={this.handleInsertCardImageUpload.bind(
                                                                  this,
                                                                  item.uniqueItemCode
                                                                )}
                                                              >
                                                                {({
                                                                  getRootProps,
                                                                  getInputProps,
                                                                }) => (
                                                                  <div
                                                                    {...getRootProps()}
                                                                  >
                                                                    <input
                                                                      {...getInputProps()}
                                                                      className="file-upload d-none"
                                                                    />
                                                                    <span className="addimg">
                                                                      <input
                                                                        type="image"
                                                                        alt="Add Image"
                                                                        src={
                                                                          addimg
                                                                        }
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                )}
                                                              </Dropzone>
                                                            )}
                                                          </div>
                                                          <div
                                                            className="col-md-8 bkcprdt"
                                                            onClick={this.handleSelectCard.bind(
                                                              this,
                                                              item.itemID,
                                                              item.imageURL
                                                            )}
                                                          >
                                                            {item.productName ? (
                                                              <div>
                                                                <label className="chat-product-name">
                                                                  {
                                                                    item.productName
                                                                  }
                                                                </label>
                                                              </div>
                                                            ) : null}
                                                            <div>
                                                              {item.brandName !==
                                                                "" &&
                                                              item.brandName !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .brand
                                                                    : "Brand"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.brandName}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.categoryName !==
                                                                "" &&
                                                              item.categoryName !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .category
                                                                    : "Category"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.categoryName}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.subCategoryName !==
                                                                "" &&
                                                              item.subCategoryName !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .subcategory
                                                                    : "SubCategory"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.subCategoryName}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.color !==
                                                                "" &&
                                                              item.color !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .color
                                                                    : "Color"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.color}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.size !==
                                                                "" &&
                                                              item.size !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .color
                                                                    : "Size"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.size}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.uniqueItemCode !==
                                                                "" &&
                                                              item.uniqueItemCode !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .itemcode
                                                                    : "Item Code"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.uniqueItemCode}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.discount !==
                                                                "" &&
                                                              parseFloat(
                                                                item.discount
                                                              ) !== 0 &&
                                                              item.discount !==
                                                                null ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .discount
                                                                    : "Discount"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.discount}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              {item.price !==
                                                                "" &&
                                                              parseFloat(
                                                                item.price
                                                              ) !== 0 &&
                                                              item.price !==
                                                                null ? (
                                                                <label className="chat-product-prize">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .price
                                                                    : "Price"}{" "}
                                                                  :
                                                                  {" " +
                                                                    item.price}
                                                                </label>
                                                              ) : null}
                                                            </div>
                                                            {item.url !==
                                                              null &&
                                                            item.url !== "" ? (
                                                              <div>
                                                                <a
                                                                  href={
                                                                    item.url
                                                                  }
                                                                  target="_blank"
                                                                  className="chat-product-url"
                                                                >
                                                                  {item.url}
                                                                </a>
                                                              </div>
                                                            ) : (
                                                              ""
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )
                                          : null}
                                      </div>
                                      {this.state.searchCardData.length > 0 ? (
                                        <div className="row m-0">
                                          <button
                                            style={{ cursor: "pointer" }}
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
                                              <img
                                                src={UpBlue}
                                                alt="up-arrow"
                                              />
                                            )}
                                          </button>
                                          <button
                                            className="butn"
                                            onClick={this.handleSendCard.bind(
                                              this
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.send
                                              : "Send"}
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
                                ) : null}
                                {/* --------Recommended List Tab----- */}
                                {this.state.isRecommendedTabActive &&
                                this.state.customerName ? (
                                  <div
                                    className={
                                      this.state.activeTab === 3
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button
                                              .sendrecommendedlist
                                          : "Send Recommended List"}

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
                                ) : null}
                                {/* --------Schedule Visit Tab----- */}
                                {this.state.isSchedualTabActive &&
                                this.state.customerName ? (
                                  <div
                                    className={
                                      this.state.activeTab === 4
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
                                                  return item
                                                    .alreadyScheduleDetails
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
                                                            "schedule-btn-cntr" +
                                                            i
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
                                                                        disabled={
                                                                          data.isDisabled
                                                                        }
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
                                                                        style={{
                                                                          cursor: data.isDisabled
                                                                            ? "no-drop"
                                                                            : "pointer",
                                                                        }}
                                                                        className={
                                                                          data.isDisabled
                                                                            ? "s-red-active"
                                                                            : selectSlot
                                                                            ? "s-yellow-active"
                                                                            : "s-yellow-btn"
                                                                        }
                                                                        onClick={this.handleSelectSlot.bind(
                                                                          this,
                                                                          data,
                                                                          item.dates,
                                                                          data.isDisabled
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
                                                                        style={{
                                                                          cursor: data.isDisabled
                                                                            ? "no-drop"
                                                                            : "pointer",
                                                                        }}
                                                                        className={
                                                                          data.isDisabled
                                                                            ? "s-red-active"
                                                                            : selectSlot
                                                                            ? "s-green-active"
                                                                            : "s-green-btn"
                                                                        }
                                                                        onClick={this.handleSelectSlot.bind(
                                                                          this,
                                                                          data,
                                                                          item.dates,
                                                                          data.isDisabled
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
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.label
                                                        .selectedslot
                                                    : "Selected Slot"}
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
                                                        ? "s-green-btn s-green-active select-slot-cntr mx-0"
                                                        : this.state
                                                            .selectedSlot
                                                            .visitedCount <
                                                          this.state
                                                            .selectedSlot
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
                                                {this.state.isSelectSlot !==
                                                  "" && (
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.span
                                                .noslotaddedforthisstore
                                            : "No slot added for this store"}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ) : null}

                                {/* --------Generate Payment Link Tab----- */}
                                {this.state.isGeneratePaymentTabActive &&
                                this.state.customerName ? (
                                  <div
                                    className={
                                      this.state.activeTab === 5
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
                                      <form style={{ width: "100%" }}>
                                        <input
                                          type="text"
                                          className="search-customerAddSrch searchtxt"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                  .searchorderid
                                              : "Search Order Id"
                                          }
                                          name="Search"
                                          maxLength="100"
                                          autoComplete="off"
                                        />
                                        <span className="input-group-addon seacrh-img-addsearch searchtxt-span">
                                          <img
                                            src={SearchBlueImg}
                                            alt="SearchBlueImg"
                                            className="srch-imge"
                                          />
                                        </span>
                                      </form>
                                    </div>
                                    <div className="payment-details">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.amount
                                          : "Amount"}
                                      </label>
                                      <span>INR 1299</span>
                                    </div>
                                    <div className="payment-link-butn">
                                      <button className="butn">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button
                                              .sendpaymentlink
                                          : "Send Payment Link"}
                                        <img
                                          src={SendUp}
                                          alt="send"
                                          className="send-up"
                                        />
                                      </button>
                                    </div>
                                    <div className="clearfix"></div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : null}
                          <div
                            className="chatcontentdivtab chat-tabs-mobile"
                            style={{
                              height: !this.state.isDownbtn ? "80%" : "",
                              pointerEvents:
                                this.state.isCustEndChat === true
                                  ? "none"
                                  : "all",
                            }}
                          >
                            <ul className="nav nav-tabs" role="tablist">
                              {this.state.isMessageTabActive ? (
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.activeTab === 1
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.message
                                      : "MESSAGE"}
                                  </a>
                                </li>
                              ) : null}
                              {this.state.isCardTabActive ? (
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.activeTab === 2
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.card
                                      : "CARD"}
                                  </a>
                                </li>
                              ) : null}
                              {this.state.isRecommendedTabActive ? (
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.activeTab === 3
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.recommendedlist
                                      : "RECOMMENDED LIST"}
                                  </a>
                                </li>
                              ) : null}
                              {this.state.isSchedualTabActive ? (
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.activeTab === 4
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.schedulevisit
                                      : "SCHEDULE VISIT"}
                                  </a>
                                </li>
                              ) : null}
                              {this.state.isGeneratePaymentTabActive ? (
                                <li className="nav-item">
                                  <a
                                    className={
                                      this.state.activeTab === 5
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.generatepaymentlink
                                      : "GENERATE PAYMENT LINK"}
                                  </a>
                                </li>
                              ) : null}
                            </ul>
                            <div className="tab-content">
                              {/* --------Message Tab----- */}
                              {this.state.isMessageTabActive ? (
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
                                      {this.state.remainingCount +
                                        //   TranslationContext !==
                                        // undefined
                                        //   ? TranslationContext.p
                                        //       .charactersremaining
                                        //   :
                                        ""}
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label
                                            .charactersremaining
                                        : " characters remaining..."}
                                      {/* // } */}
                                    </p>
                                    {this.state.messageSuggestionTagsData !==
                                    null
                                      ? this.state.messageSuggestionTagsData.map(
                                          (item, i) => {
                                            return (
                                              <button
                                                onClick={this.handleTagsButtonClick.bind(
                                                  this,
                                                  item.tagID
                                                )}
                                                className={
                                                  this.state.selectedTags ===
                                                  item.tagID
                                                    ? "tagsbtn-active"
                                                    : "tagsbtn"
                                                }
                                                id={item.tagID}
                                              >
                                                {item.tagName}
                                              </button>
                                            );
                                          }
                                        )
                                      : null}
                                    {this.state.messageSuggestionData !==
                                      null &&
                                    this.state.messageSuggestionData.length >
                                      0 &&
                                    this.state.messageSuggestionData.length >
                                      0 ? (
                                      <div className="suggestions-cntr">
                                        <Table
                                          noDataContent="No Record Found"
                                          className="components-table-demo-nested antd-table-campaign custom-antd-table rm-header"
                                          columns={[
                                            {
                                              dataIndex: "suggestionText",
                                              className: "textnowrap-table",
                                              render: (row, rowData) => {
                                                i = i + 1;
                                                return (
                                                  <div
                                                    className={
                                                      this.state.chkSuggestion[
                                                        i
                                                      ] === i
                                                        ? "suggestions-tick"
                                                        : ""
                                                    }
                                                    id={i}
                                                    onClick={this.onOpenMobSuggestionModal.bind(
                                                      this,
                                                      rowData.suggestionText,
                                                      i
                                                    )}
                                                  >
                                                    <Tooltip
                                                      placement="left"
                                                      title={
                                                        rowData.suggestionText
                                                      }
                                                    >
                                                      <span>
                                                        {rowData.suggestionText}
                                                      </span>
                                                    </Tooltip>
                                                  </div>
                                                );
                                              },
                                            },
                                          ]}
                                          dataSource={this.state.messageSuggestionData.filter(
                                            (x) =>
                                              x.tagID ===
                                              this.state.selectedTags
                                          )}
                                          pagination={{
                                            pageSize: 10,
                                            defaultPageSize: 10,
                                          }}
                                        ></Table>
                                      </div>
                                    ) : null}

                                    {this.state.storeAgentDetail.length !== 0 &&
                                    this.state.storeAgentDetail[0]
                                      .suggestion === 1 ? (
                                      <div
                                        className="mobile-ck-send"
                                        onClick={this.handleMessageSuggestion.bind(
                                          this
                                        )}
                                        title={"Search"}
                                      >
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
                              ) : null}
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
                                    {this.state.searchCardData !== null
                                      ? this.state.searchCardData.map(
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
                                                      {item.imageURL ? (
                                                        <img
                                                          className="chat-product-img"
                                                          src={item.imageURL}
                                                          alt="Product Image"
                                                          title={
                                                            item.productName
                                                          }
                                                        />
                                                      ) : (
                                                        <Dropzone
                                                          onDrop={this.handleInsertCardImageUpload.bind(
                                                            this,
                                                            item.uniqueItemCode
                                                          )}
                                                        >
                                                          {({
                                                            getRootProps,
                                                            getInputProps,
                                                          }) => (
                                                            <div
                                                              {...getRootProps()}
                                                            >
                                                              <input
                                                                {...getInputProps()}
                                                                className="file-upload d-none"
                                                              />
                                                              <span className="addimg">
                                                                <input
                                                                  type="image"
                                                                  alt="Add Image"
                                                                  src={addimg}
                                                                />
                                                              </span>
                                                            </div>
                                                          )}
                                                        </Dropzone>
                                                      )}
                                                    </div>
                                                    <div className="bkcprdt">
                                                      {item.productName ? (
                                                        <label className="chat-product-name">
                                                          {item.productName}
                                                        </label>
                                                      ) : null}
                                                      {item.brandName !== "" &&
                                                      item.brandName !==
                                                        null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.brand
                                                            : "Brand"}{" "}
                                                          :
                                                          {" " + item.brandName}
                                                        </label>
                                                      ) : null}

                                                      {item.categoryName !==
                                                        "" &&
                                                      item.categoryName !==
                                                        null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.category
                                                            : "Category"}{" "}
                                                          :
                                                          {" " +
                                                            item.categoryName}
                                                        </label>
                                                      ) : null}

                                                      {item.subCategoryName !==
                                                        "" &&
                                                      item.subCategoryName !==
                                                        null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label
                                                                .subcategory
                                                            : "SubCategory"}{" "}
                                                          :
                                                          {" " +
                                                            item.subCategoryName}
                                                        </label>
                                                      ) : null}

                                                      {item.color !== "" &&
                                                      item.color !== null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.color
                                                            : "Color"}{" "}
                                                          :{" " + item.color}
                                                        </label>
                                                      ) : null}

                                                      {item.size !== "" &&
                                                      item.size !== null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.color
                                                            : "Size"}{" "}
                                                          :{" " + item.size}
                                                        </label>
                                                      ) : null}

                                                      {item.uniqueItemCode !==
                                                        "" &&
                                                      item.uniqueItemCode !==
                                                        null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.itemcode
                                                            : "Item Code"}{" "}
                                                          :
                                                          {" " +
                                                            item.uniqueItemCode}
                                                        </label>
                                                      ) : null}

                                                      {item.discount !== "" &&
                                                      parseFloat(
                                                        item.discount
                                                      ) !== 0 &&
                                                      item.discount !== null ? (
                                                        <label className="chat-product-code">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.discount
                                                            : "Discount"}{" "}
                                                          :{" " + item.discount}
                                                        </label>
                                                      ) : null}

                                                      {item.price !== "" &&
                                                      parseFloat(item.price) !==
                                                        0 &&
                                                      item.price !== null ? (
                                                        <label className="chat-product-prize">
                                                          {TranslationContext !==
                                                          undefined
                                                            ? TranslationContext
                                                                .label.price
                                                            : "Price"}{" "}
                                                          :{" " + item.price}
                                                        </label>
                                                      ) : null}
                                                      {item.url !== null &&
                                                      item.url !== "" ? (
                                                        <label className="chat-product-url">
                                                          {item.url !== null
                                                            ? item.url
                                                            : ""}
                                                        </label>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      : null}
                                  </div>
                                  <div className="chat-btn-cntr">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onCloseCardModal}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.close
                                        : "Close"}
                                    </button>
                                    <button
                                      className="butn"
                                      onClick={this.handleSendCard.bind(this)}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.send
                                        : "Send"}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button
                                            .sendrecommendedlist
                                        : "Send Recommended List"}

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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.close
                                        : "Close"}
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
                                                                        disabled={
                                                                          data.isDisabled
                                                                        }
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
                                                                        style={{
                                                                          cursor: data.isDisabled
                                                                            ? "no-drop"
                                                                            : "pointer",
                                                                        }}
                                                                        className={
                                                                          data.isDisabled
                                                                            ? "s-red-active"
                                                                            : selectSlot
                                                                            ? "s-yellow-active"
                                                                            : "s-yellow-btn"
                                                                        }
                                                                        onClick={this.handleSelectSlot.bind(
                                                                          this,
                                                                          data,
                                                                          item.dates,
                                                                          data.isDisabled
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
                                                                        style={{
                                                                          cursor: data.isDisabled
                                                                            ? "no-drop"
                                                                            : "pointer",
                                                                        }}
                                                                        className={
                                                                          data.isDisabled
                                                                            ? "s-red-active"
                                                                            : selectSlot
                                                                            ? "s-green-active"
                                                                            : "s-green-btn"
                                                                        }
                                                                        onClick={this.handleSelectSlot.bind(
                                                                          this,
                                                                          data,
                                                                          item.dates,
                                                                          data.isDisabled
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
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .selectedslot
                                              : "Selected Slot"}
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
                                                  ? "s-green-btn s-green-active select-slot-cntr mx-0"
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
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .noofpeople
                                              : "No of People"}
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button.close
                                          : "Close"}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.span
                                            .noslotaddedforthisstore
                                        : "No slot added for this store"}
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
                                        />
                                        <span className="input-group-addon seacrh-img-addsearch searchtxt-span">
                                          <img
                                            src={SearchBlueImg}
                                            alt="SearchBlueImg"
                                            className="srch-imge"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="payment-details">
                                      <label>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.amount
                                          : "Amount"}
                                      </label>
                                      <span>INR 1299</span>
                                    </div>
                                  </div>
                                  <div className="chat-btn-cntr">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onClosePaymentModal}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.close
                                        : "Close"}
                                    </button>
                                    <button
                                      className="butn"
                                      onClick={this.onClosePaymentModal}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.send
                                        : "Send"}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p
                                            .areyousureandwanttosend
                                        : "Are you sure & want to send"}
                                      ?
                                    </p>
                                  </div>
                                  <hr
                                    style={{
                                      borderTop: "1px solid #bbb",
                                    }}
                                  ></hr>
                                  <p className="cls-p-sugg">
                                    {this.state.suggestionText}
                                  </p>
                                  <div className="chat-btn-conf">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onCloseSuggestionModal}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.no
                                        : "No"}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.yes
                                        : "Yes"}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p
                                            .areyousureandwanttosend
                                        : "Are you sure & want to send"}
                                      ?
                                    </p>
                                  </div>
                                  <hr
                                    style={{
                                      borderTop: "1px solid #bbb",
                                    }}
                                  ></hr>
                                  <p className="cls-p-sugg">
                                    {this.state.suggestionText}
                                  </p>
                                  <div className="chat-btn-conf-mob">
                                    <button
                                      className="butn-inv"
                                      onClick={this.onCloseMobSuggestionModal}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.no
                                        : "No"}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.yes
                                        : "Yes"}
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
                          className={
                            this.state.mainTabSelect === 2
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="recent-chat"
                          role="tabpanel"
                          aria-labelledby="recent-chat"
                        >
                          <div className="chathistory-tbl histochat">
                            <div
                              className="table-cntr store chat-history chatabcus mg-rm now-rap-tbl-txt"
                              style={{ margin: "10px" }}
                            >
                              <Table
                                loading={this.state.isPastChatLoading}
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.chatid
                                        : "Chat ID",
                                    dataIndex: "chatID",
                                    width: "10%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <>
                                          {rowData.chatID ? rowData.chatID : ""}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.agent
                                        : "Agent",
                                    dataIndex: "agentName",
                                    width: "20%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <p>
                                          {rowData.agentName
                                            ? rowData.agentName
                                            : ""}
                                        </p>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.mobilenumber
                                        : "Mobile No",
                                    dataIndex: "customerMobile",
                                    width: "20%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <p
                                          title={
                                            rowData.customerMobile
                                              ? rowData.customerMobile.substring(
                                                  2
                                                )
                                              : ""
                                          }
                                        >
                                          {rowData.customerMobile
                                            ? rowData.customerMobile.substring(
                                                2
                                              )
                                            : ""}
                                        </p>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.time
                                        : "Time",
                                    dataIndex: "timeAgo",
                                    width: "20%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <>
                                          {rowData.timeAgo
                                            ? rowData.timeAgo
                                            : ""}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.status
                                        : "Status",
                                    dataIndex: "chatStatus",
                                    width: "20%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <>
                                          {rowData.chatStatus
                                            ? rowData.chatStatus
                                            : ""}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.message
                                        : "Message",
                                    dataIndex: "message",
                                    width: "30%",
                                    className: "textnowrap-table",
                                    render: (row, rowdata) => {
                                      return (
                                        <div className="d-flex">
                                          <p className="storeaget-chat-ctn">
                                            {rowdata.chatCount
                                              ? rowdata.chatCount
                                              : ""}
                                          </p>
                                          <p
                                            className="msg-text-overlap"
                                            title={row ? row : ""}
                                          >
                                            {row ? row : ""}
                                          </p>
                                        </div>
                                      );
                                    },
                                  },
                                ]}
                                dataSource={this.state.agentRecentChatData}
                                onRow={(record, index) => ({
                                  onClick: (event) => {
                                    this.handleHistoricalTableRow(
                                      record,
                                      index,
                                      event
                                    );
                                  },
                                })}
                                rowKey={(record) => {
                                  if (record.chatID) {
                                    uid = uid + 1;
                                    return record.chatID + "p" + uid;
                                  } else {
                                    uid = uid + 1;
                                    return "p" + uid;
                                  }
                                }}
                                pagination={{
                                  pageSize: 5,
                                  defaultPageSize: 5,
                                }}
                                rowClassName={this.setRowClassName}
                              ></Table>
                            </div>
                          </div>

                          <div className="chathistory-tbl">
                            {this.state.showHistoricalChat ? (
                              <div className="historychatcontnet">
                                <div className="chathistory-div add-bord">
                                  <label className="chat-on-tuesday-jul">
                                    {" "}
                                    Chat On {this.state.chatTimeAgo}
                                  </label>
                                  <img
                                    onClick={this.handleHistoryChatClose.bind(
                                      this
                                    )}
                                    src={CancelBlack}
                                    alt="close-icon"
                                    style={{
                                      float: "right",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                                <div
                                  className="chatcontentDiv"
                                  ref={(div) => {
                                    this.historyMessageList = div;
                                  }}
                                >
                                  {this.state.messageHistoryChatData !== null &&
                                  this.state.messageHistoryChatData.length >
                                    0 ? (
                                    this.state.messageHistoryChatData.map(
                                      (item, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className={
                                              item.byCustomer === true &&
                                              item.isBotReply !== true
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
                                                  : this.state.UserName.split(
                                                      " "
                                                    )
                                                      .map((n) => n[0])
                                                      .join("")
                                                      .toUpperCase()}
                                              </span>
                                            </div>
                                            <div className="chat-trail-chat-cntr">
                                              {item.isBotReply && (
                                                <p className="bot-mark">
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.p.bot
                                                    : "BOT"}
                                                </p>
                                              )}
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
                                      }
                                    )
                                  ) : (
                                    <p style={{ margin: "10" }}>
                                      No record found
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : null}
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
                          {TranslationContext !== undefined
                            ? TranslationContext.label.myhistoricalchat
                            : "My Historical Chat"}
                        </label>
                      </div>
                      <div className="chathistory-tbl histochat">
                        <div
                          className="table-cntr store chat-history mg-rm now-rap-tbl-txt chatabcus"
                          style={{ margin: "10px" }}
                        >
                          <Table
                            loading={this.state.isHistoricalChatLoading}
                            noDataContent="No Record Found"
                            className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                            columns={[
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.chatid
                                    : "Chat ID",
                                dataIndex: "chatID",
                                width: "10%",
                                className: "textnowrap-table",
                                render: (row, rowData) => {
                                  return (
                                    <>{rowData.chatID ? rowData.chatID : ""}</>
                                  );
                                },
                              },
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.customername
                                    : "Customer Name",
                                dataIndex: "customerName",
                                width: "20%",
                                className: "textnowrap-table",
                                render: (row, rowData) => {
                                  return (
                                    <>
                                      {rowData.customerName
                                        ? rowData.customerName
                                        : ""}
                                    </>
                                  );
                                },
                              },
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.mobilenumber
                                    : "Mobile No",
                                dataIndex: "customerMobile",
                                width: "20%",
                                className: "textnowrap-table",
                                render: (row, rowData) => {
                                  return (
                                    <>
                                      {rowData.customerMobile
                                        ? rowData.customerMobile.substring(2)
                                        : ""}
                                    </>
                                  );
                                },
                              },
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.time
                                    : "Time",
                                dataIndex: "timeAgo",
                                width: "20%",
                                className: "textnowrap-table",
                                render: (row, rowData) => {
                                  return (
                                    <>
                                      {rowData.timeAgo ? rowData.timeAgo : ""}
                                    </>
                                  );
                                },
                              },
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.status
                                    : "Status",
                                dataIndex: "chatStatus",
                                width: "20%",
                                className: "textnowrap-table",
                                render: (row, rowData) => {
                                  return (
                                    <>
                                      {rowData.chatStatus
                                        ? rowData.chatStatus
                                        : ""}
                                    </>
                                  );
                                },
                              },
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.message
                                    : "Message",
                                dataIndex: "message",
                                width: "30%",
                                className: "textnowrap-table",
                                render: (row) => {
                                  return (
                                    <>
                                      <p
                                        className="msg-text-overlap"
                                        title={row ? row : ""}
                                      >
                                        {row ? row : ""}
                                      </p>
                                    </>
                                  );
                                },
                              },
                            ]}
                            dataSource={this.state.historicalChatData}
                            onRow={(record, index) => ({
                              onClick: (event) => {
                                this.handleHistoricalTableRow(
                                  record,
                                  index,
                                  event
                                );
                              },
                            })}
                            pagination={{
                              pageSize: 5,
                              defaultPageSize: 5,
                            }}
                            rowKey={(record) => {
                              if (record.chatID) {
                                uid = uid + 1;
                                return record.chatID + "g" + uid;
                              } else {
                                uid = uid + 1;
                                return "h" + uid;
                              }
                            }}
                            rowClassName={this.setRowClassName}
                          ></Table>
                        </div>
                      </div>
                      <div className="chathistory-tbl">
                        {this.state.showHistoricalChat ? (
                          <div className="historychatcontnet">
                            <div className="chathistory-div add-bord">
                              <label className="chat-on-tuesday-jul">
                                {" "}
                                Chat On {this.state.chatTimeAgo}
                              </label>
                              <img
                                onClick={this.handleHistoryChatClose.bind(this)}
                                src={CancelBlack}
                                alt="close-icon"
                                style={{
                                  float: "right",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                            <div
                              className="chatcontentDiv"
                              ref={(div) => {
                                this.historyMessageList = div;
                              }}
                            >
                              {this.state.messageHistoryChatData !== null &&
                              this.state.messageHistoryChatData.length > 0 ? (
                                this.state.messageHistoryChatData.map(
                                  (item, i) => {
                                    return (
                                      <div
                                        key={i}
                                        className={
                                          item.byCustomer === true &&
                                          item.isBotReply !== true
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
                                        </div>
                                        <div className="chat-trail-chat-cntr">
                                          {item.isBotReply && (
                                            <p className="bot-mark">
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.bot
                                                : "BOT"}
                                            </p>
                                          )}
                                          <p className="chat-trail-chat pd-0">
                                            {ReactHtmlParser(
                                              item.message
                                                .replace("col-md-2", "col-md-4")
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
                                  }
                                )
                              ) : (
                                <p style={{ margin: "10px" }}>
                                  No record found
                                </p>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {this.state.isCustomerProduct || this.state.isCustomerProfile ? (
                this.state.customerName ? (
                  <div
                    onMouseLeave={this.handleNameHoverLeave.bind()}
                    className={
                      this.state.onHoverName
                        ? "thirdbox"
                        : this.state.isShutterOpen
                        ? "thirdbox thirdbox-shutter"
                        : this.state.isMobileView
                        ? "thirdbox"
                        : "thirdbox thirdbox-close"
                    }
                  >
                    <div className="uptabs">
                      {!this.state.isShutterOpen ? (
                        <img
                          src={Arwdown}
                          className="Arwico"
                          alt="Arwico"
                          onClick={this.handleChangeShutterWindow.bind(
                            this,
                            true
                          )}
                        />
                      ) : (
                        <img
                          src={Arwup}
                          className="Arwico"
                          alt="Arwico"
                          onClick={this.handleChangeShutterWindow.bind(
                            this,
                            false
                          )}
                        />
                      )}
                      {this.state.isPinClick ? (
                        <img
                          src={Pin}
                          className="pin"
                          alt="Pin"
                          onClick={this.handlePinClick.bind(this)}
                        />
                      ) : (
                        <img
                          src={Pin2}
                          className="pin"
                          alt="Pin"
                          onClick={this.handlePinClick.bind(this)}
                        />
                      )}
                      <div></div>
                      <ul className="nav nav-tabs" role="tablist">
                        {this.state.isCustomerProfile ? (
                          <li
                            className="nav-item"
                            style={{
                              padding: this.state.isCustomerProduct
                                ? ""
                                : "2px",
                            }}
                          >
                            <a
                              className={
                                this.state.ProfileProductTab === 0
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-toggle="tab"
                              href="#customer-profile"
                              role="tab"
                              aria-controls="customer-profile"
                              aria-selected="true"
                              onClick={this.handleProfileProductTabChange.bind(
                                this,
                                0
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.a.profile
                                : "Profile"}
                            </a>
                          </li>
                        ) : null}
                        {this.state.isCustomerProduct ? (
                          <li
                            className="nav-item"
                            style={{
                              padding: this.state.isCustomerProfile
                                ? ""
                                : "2px",
                            }}
                          >
                            <a
                              className={
                                this.state.ProfileProductTab === 1
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-toggle="tab"
                              href="#customer-product"
                              role="tab"
                              aria-controls="customer-product"
                              aria-selected="true"
                              onClick={this.handleProfileProductTabChange.bind(
                                this,
                                1
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.a.product
                                : "Product"}
                            </a>
                          </li>
                        ) : null}
                      </ul>

                      <div className="tab-content">
                        {this.state.isCustomerProfile ? (
                          <div
                            className={
                              this.state.ProfileProductTab === 0
                                ? "tab-pane fade active show"
                                : "tab-pane fade"
                            }
                            id="customer-profile"
                            role="tabpanel"
                            aria-labelledby="customer-profile"
                          >
                            <div className="profilebox">
                              <div>
                                <ul className="nameplate">
                                  <li>
                                    <label
                                      onClick={
                                        this.state.isMobileView
                                          ? this.handleMainTabChange.bind(
                                              this,
                                              1
                                            )
                                          : null
                                      }
                                      onMouseEnter={this.handleNameHover.bind(
                                        this
                                      )}
                                      className="namelabel"
                                      style={{
                                        backgroundColor: this.state
                                          .selectedColor,
                                      }}
                                    >
                                      {this.state.customerName.charAt(0)}
                                    </label>
                                  </li>
                                  <li
                                    onClick={
                                      this.state.isMobileView
                                        ? this.handleMainTabChange.bind(this, 1)
                                        : null
                                    }
                                  >
                                    <h3>{this.state.customerName}</h3>
                                    <span>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.span.tier
                                        : "Tier"}
                                      : <b>{this.state.customerTier}</b>
                                    </span>
                                  </li>
                                  <li className="contactbox">
                                    <div>
                                      <ul>
                                        {this.state.customerEmailID ? (
                                          <li>
                                            {/* <label>Email ID</label> */}
                                            <p>{this.state.customerEmailID}</p>
                                          </li>
                                        ) : null}
                                        <li>
                                          {/* <label>Mobile No</label> */}
                                          <p>{this.state.customerMobileNo}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="pointstable">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .totalpoints
                                            : "Total Points"}
                                        </label>
                                        <span>
                                          {this.state.totalPoints.toLocaleString(
                                            "en-IN"
                                          )}
                                        </span>
                                      </td>
                                      <td>
                                        <label>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .lifetimevalue
                                            : "Lifetime Value"}
                                        </label>
                                        <span>
                                          {this.state.lifetimeValue.toLocaleString(
                                            "en-IN"
                                          )}
                                        </span>
                                      </td>
                                      <td>
                                        <label>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .visitcount
                                            : "Visit Count"}
                                        </label>
                                        <span>
                                          {this.state.visitCount.toLocaleString(
                                            "en-IN"
                                          )}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="prodtabl1">
                                <Collapse
                                  activeKey={this.state.activeCollpse}
                                  onChange={this.handleCollpseChange.bind(this)}
                                >
                                  <Panel
                                    header={
                                      TranslationContext !== undefined
                                        ? TranslationContext.panel.insights
                                        : "Insights"
                                    }
                                    key="1"
                                  >
                                    <div className="insightsbox">
                                      {this.state.insights
                                        ? this.state.insights.map(
                                            (item, key) => {
                                              return item.insightMessage ? (
                                                <p>
                                                  {key + 1}.
                                                  {" " + item.insightMessage}
                                                </p>
                                              ) : null;
                                            }
                                          )
                                        : null}
                                      {this.state.insights.length === 0 ? (
                                        <Empty
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      ) : null}
                                    </div>
                                  </Panel>
                                  <Panel
                                    header={
                                      TranslationContext !== undefined
                                        ? TranslationContext.panel.orders
                                        : "Orders"
                                    }
                                    key="2"
                                  >
                                    <div className="ordersbox">
                                      <ul>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .delivered
                                              : "Delivered"}
                                          </label>
                                          <span>
                                            {this.state.orderDelivered}
                                          </span>
                                        </li>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .shoppingbag
                                              : "Shopping Bag"}
                                          </label>
                                          <span>
                                            {this.state.orderShoppingBag}
                                          </span>
                                        </li>
                                      </ul>
                                      <ul>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .readytoship
                                              : "Ready to Ship"}
                                          </label>
                                          <span>
                                            {this.state.orderReadyToShip}
                                          </span>
                                        </li>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.returns
                                              : "Returns"}
                                          </label>
                                          <span>{this.state.orderReturns}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </Panel>
                                  <Panel
                                    header={
                                      TranslationContext !== undefined
                                        ? TranslationContext.panel
                                            .lasttransaction
                                        : "Last Transaction"
                                    }
                                    key="3"
                                  >
                                    <div className="lasttransaction">
                                      <ul>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.billno
                                              : "Bill No"}
                                          </label>
                                          <span>{this.state.billNumber}</span>
                                        </li>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.Amount
                                              : "Amount"}
                                          </label>
                                          <span>
                                            {this.state.billAmount.toLocaleString(
                                              "en-IN"
                                            )}
                                          </span>
                                        </li>
                                      </ul>
                                      <ul>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.store
                                              : "Store"}
                                          </label>
                                          <span>{this.state.storeDetails}</span>
                                        </li>
                                        <li>
                                          <label>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.date
                                              : "Date"}
                                          </label>
                                          <span>
                                            {this.state.transactionDate}
                                          </span>
                                        </li>
                                      </ul>
                                      <div className="itemtable">
                                        <table>
                                          <thead>
                                            <tr>
                                              <th>
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.th.Items
                                                  : "Items"}
                                              </th>
                                              <th>
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.th.qty
                                                  : "Qty"}
                                              </th>
                                              <th>
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.th.Amount
                                                  : "Amount"}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <label>
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.label
                                                        .productname
                                                    : "Product Name"}{" "}
                                                  1
                                                </label>
                                                <label>
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.label
                                                        .productname
                                                    : "Product Name"}{" "}
                                                  2
                                                </label>
                                                <label>
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.label
                                                        .productname
                                                    : "Product Name"}{" "}
                                                  3
                                                </label>
                                              </td>
                                              <td>
                                                <label>02</label>
                                                <label>03</label>
                                                <label>01</label>
                                              </td>
                                              <td>
                                                <label>₹999</label>
                                                <label>₹1299</label>
                                                <label>₹12999</label>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </Panel>
                                </Collapse>
                              </div>
                              <button
                                type="button"
                                className="updateprofilelinkbtn pastchatmobbtn"
                                onClick={this.handleMainTabChange.bind(this, 2)}
                              >
                                {this.state.agentRecentChatData.length < 9
                                  ? this.state.agentRecentChatData.length +
                                    "0 Past Chat"
                                  : this.state.agentRecentChatData.length +
                                    " Past Chat"}
                              </button>
                              <Dropdown
                                overlay={
                                  <Menu
                                    onClick={this.handleMobileActionMenuClick.bind(
                                      this
                                    )}
                                  >
                                    <Menu.Item key="1">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.dropdown.closechat
                                        : "Close Chat"}
                                    </Menu.Item>
                                  </Menu>
                                }
                              >
                                <button
                                  style={{ float: "right" }}
                                  type="button"
                                  className="updateprofilelinkbtn pastchatmobbtn"
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.action
                                    : "Action"}
                                </button>
                              </Dropdown>
                            </div>
                          </div>
                        ) : null}
                        {this.state.isCustomerProduct ? (
                          <div
                            className={
                              this.state.ProfileProductTab === 1
                                ? "tab-pane fade active show"
                                : "tab-pane fade"
                            }
                            id="customer-product"
                            role="tabpanel"
                            aria-labelledby="customer-product"
                          >
                            <div className="productsbox">
                              {this.state.isCustomerProfile === false ? (
                                <div>
                                  <ul className="nameplate">
                                    <li>
                                      <label
                                        onClick={
                                          this.state.isMobileView
                                            ? this.handleMainTabChange.bind(
                                                this,
                                                1
                                              )
                                            : null
                                        }
                                        onMouseEnter={this.handleNameHover.bind(
                                          this
                                        )}
                                        className="namelabel"
                                        style={{
                                          backgroundColor: this.state
                                            .selectedColor,
                                        }}
                                      >
                                        {this.state.customerName.charAt(0)}
                                      </label>
                                    </li>
                                    <li
                                      onClick={
                                        this.state.isMobileView
                                          ? this.handleMainTabChange.bind(
                                              this,
                                              1
                                            )
                                          : null
                                      }
                                    >
                                      <h3>{this.state.customerName}</h3>
                                    </li>
                                    <li className="contactbox">
                                      <div>
                                        <ul>
                                          <li>
                                            <p title="Mobile No">
                                              {this.state.mobileNo}
                                            </p>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              ) : null}
                              <Tabs
                                onSelect={(index, label) => {
                                  this.handleProductTypeTabChange(index);
                                }}
                                selected={this.state.productTypeTab}
                              >
                                <Tab
                                  label={
                                    TranslationContext !== undefined
                                      ? TranslationContext.label.shoppingbag
                                      : "Shopping Bag"
                                  }
                                >
                                  <div className="shoppingbag">
                                    {this.state.shoppingBagData.length > 0 ? (
                                      <label
                                        className="selectalllabel"
                                        onClick={this.handleSelectAllProduct.bind(
                                          this,
                                          1
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.selectall
                                          : "Select All"}
                                      </label>
                                    ) : null}
                                    <div className="prodtabl">
                                      {this.state.shoppingBagData
                                        ? this.state.shoppingBagData.map(
                                            (item, i) => {
                                              return (
                                                <div
                                                  className="prodboxx"
                                                  key={i}
                                                >
                                                  <Checkbox
                                                    checked={
                                                      this.state
                                                        .shoppingBagData[i]
                                                        .isCheck
                                                    }
                                                    onChange={this.handleProductTabsChange.bind(
                                                      this,
                                                      1,
                                                      i
                                                    )}
                                                  >
                                                    <Popover
                                                      overlayClassName="antcustom ant-prodesc"
                                                      content={
                                                        <div className="productdesc">
                                                          <h4>
                                                            {item.productName}
                                                          </h4>
                                                          <p>
                                                            {TranslationContext !==
                                                            undefined
                                                              ? TranslationContext
                                                                  .p
                                                                  .lasttransaction
                                                              : "Last Transaction"}
                                                            -
                                                            {
                                                              item.uniqueItemCode
                                                            }
                                                          </p>
                                                          <table>
                                                            <tbody>
                                                              {item.color !==
                                                              "" ? (
                                                                <>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        width:
                                                                          "50px",
                                                                      }}
                                                                    >
                                                                      <label>
                                                                        {TranslationContext !==
                                                                        undefined
                                                                          ? TranslationContext
                                                                              .label
                                                                              .colors
                                                                          : "Colors"}
                                                                        :
                                                                      </label>
                                                                    </td>
                                                                    <td>
                                                                      <ul>
                                                                        {item.color ===
                                                                        "Blue" ? (
                                                                          <li>
                                                                            <a className="colorblue">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Black" ? (
                                                                          <li>
                                                                            <a className="colorblack">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Grey" ? (
                                                                          <li>
                                                                            <a className="colorgrey">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Red" ? (
                                                                          <li>
                                                                            <a className="colorRed">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                        {item.color ===
                                                                        "Yellow" ? (
                                                                          <li>
                                                                            <a className="colorYellow">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                        {item.color ===
                                                                        "Green" ? (
                                                                          <li>
                                                                            <a className="colorGreen">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                      </ul>
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              ) : null}

                                                              {item.size !==
                                                              "" ? (
                                                                <>
                                                                  <tr>
                                                                    <td>
                                                                      <label>
                                                                        {TranslationContext !==
                                                                        undefined
                                                                          ? TranslationContext
                                                                              .label
                                                                              .sizes
                                                                          : "Sizes"}
                                                                        :
                                                                      </label>
                                                                    </td>
                                                                    <td>
                                                                      {isNaN(
                                                                        parseInt(
                                                                          item.size
                                                                        )
                                                                      ) ===
                                                                      false ? (
                                                                        <ul className="sizes">
                                                                          <li>
                                                                            <a>
                                                                              {
                                                                                item.size
                                                                              }
                                                                            </a>
                                                                          </li>
                                                                        </ul>
                                                                      ) : (
                                                                        <ul>
                                                                          <li>
                                                                            <a>
                                                                              {
                                                                                item.size
                                                                              }
                                                                            </a>
                                                                          </li>
                                                                        </ul>
                                                                      )}
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              ) : null}
                                                            </tbody>
                                                          </table>
                                                          <h3>
                                                            {TranslationContext !==
                                                            undefined
                                                              ? TranslationContext
                                                                  .h3.inr
                                                              : "INR "}
                                                            {item.price}
                                                            /-
                                                          </h3>
                                                        </div>
                                                      }
                                                      placement="left"
                                                    >
                                                      <img
                                                        src={item.imageURL}
                                                        // src={Ladyimg}
                                                        className="ladyimg"
                                                        alt="Lady Img"
                                                      />
                                                    </Popover>
                                                  </Checkbox>
                                                  {item.brandName ? (
                                                    <h3>{item.brandName}</h3>
                                                  ) : null}
                                                  {item.productName ? (
                                                    <h4>{item.productName}</h4>
                                                  ) : null}
                                                  {item.price ? (
                                                    <span>
                                                      {item.price.toLocaleString(
                                                        "en-IN",
                                                        {
                                                          style: "currency",
                                                          currency: "INR",
                                                          minimumFractionDigits: 0,
                                                        }
                                                      )}
                                                    </span>
                                                  ) : null}
                                                  <img
                                                    src={Cancelico}
                                                    className="cancelico"
                                                    alt="Cancel Ico"
                                                    disabled={
                                                      this.state.isButtonClick
                                                    }
                                                    onClick={this.handleRemoveProduct.bind(
                                                      this,
                                                      item.uniqueItemCode,
                                                      "S"
                                                    )}
                                                  />
                                                </div>
                                              );
                                            }
                                          )
                                        : null}
                                      {this.state.shoppingBagData.length ===
                                      0 ? (
                                        <Empty
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      ) : null}
                                    </div>
                                    {this.state.selectedShoppingBag.length >
                                    0 ? (
                                      <div className="tabsbotbtn-box">
                                        <button
                                          type="button"
                                          className="tabsbotbtn"
                                          onClick={this.handleSendProductsOnChat.bind(
                                            this,
                                            false
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.send
                                            : "SEND"}
                                        </button>
                                        <button
                                          disabled={
                                            this.state.isButtonClick
                                              ? true
                                              : false
                                          }
                                          type="button"
                                          className="tabsbotbtn"
                                          onClick={this.handleAddProductsToWishlist.bind(
                                            this,
                                            false
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .addtowishlist
                                            : "ADD To WISHLIST"}
                                        </button>
                                        <Popover
                                          overlayClassName="antcustom ant-prodesc"
                                          placement="topRight"
                                          content={
                                            <div
                                              // className="productdesc"
                                              className=""
                                              style={{
                                                display: "inline-flex",
                                              }}
                                            >
                                              <button
                                                type="button"
                                                className="tabsbotbtn"
                                                onClick={this.handleBuyProductsOnChat.bind(
                                                  this,
                                                  false,
                                                  true
                                                )}
                                              >
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.button
                                                      .directbuy
                                                  : "Direct Buy"}
                                              </button>
                                              <button
                                                type="button"
                                                className="tabsbotbtn"
                                                onClick={this.handleAddressModalOpen.bind(
                                                  this
                                                )}
                                              >
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.button
                                                      .addtoshoppingbag
                                                  : "Add to Shopping Bag"}
                                              </button>
                                            </div>
                                          }
                                        >
                                          <button
                                            type="button"
                                            className="tabsbotbtn"
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.buynow
                                              : "BUY NOW"}
                                          </button>
                                        </Popover>
                                      </div>
                                    ) : null}
                                  </div>
                                </Tab>
                                <Tab
                                  label={
                                    TranslationContext !== undefined
                                      ? TranslationContext.a.wishlist
                                      : "Wishlist"
                                  }
                                >
                                  <div className="shoppingbag">
                                    {this.state.wishListData.length > 0 ? (
                                      <label
                                        className="selectalllabel"
                                        onClick={this.handleSelectAllProduct.bind(
                                          this,
                                          2
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.selectall
                                          : "Select All"}
                                      </label>
                                    ) : null}
                                    <div className="prodtabl">
                                      {this.state.wishListData
                                        ? this.state.wishListData.map(
                                            (item, i) => {
                                              return (
                                                <div
                                                  className="prodboxx"
                                                  key={i}
                                                >
                                                  <Checkbox
                                                    checked={
                                                      this.state.wishListData[i]
                                                        .isCheck
                                                    }
                                                    onChange={this.handleProductTabsChange.bind(
                                                      this,
                                                      2,
                                                      i
                                                    )}
                                                  >
                                                    <Popover
                                                      overlayClassName="antcustom ant-prodesc"
                                                      content={
                                                        <div className="productdesc">
                                                          <h4>
                                                            {item.productName}
                                                          </h4>
                                                          <p>
                                                            {TranslationContext !==
                                                            undefined
                                                              ? TranslationContext
                                                                  .p
                                                                  .lasttransaction
                                                              : "Last Transaction"}
                                                            -
                                                            {
                                                              item.uniqueItemCode
                                                            }
                                                          </p>
                                                          <table>
                                                            <tbody>
                                                              {item.color !==
                                                              "" ? (
                                                                <>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        width:
                                                                          "50px",
                                                                      }}
                                                                    >
                                                                      <label>
                                                                        {TranslationContext !==
                                                                        undefined
                                                                          ? TranslationContext
                                                                              .label
                                                                              .colors
                                                                          : "Colors"}
                                                                        :
                                                                      </label>
                                                                    </td>
                                                                    <td>
                                                                      <ul>
                                                                        {item.color ===
                                                                        "Blue" ? (
                                                                          <li>
                                                                            <a className="colorblue">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Black" ? (
                                                                          <li>
                                                                            <a className="colorblack">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Grey" ? (
                                                                          <li>
                                                                            <a className="colorgrey">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Red" ? (
                                                                          <li>
                                                                            <a className="colorRed">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                        {item.color ===
                                                                        "Yellow" ? (
                                                                          <li>
                                                                            <a className="colorYellow">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                        {item.color ===
                                                                        "Green" ? (
                                                                          <li>
                                                                            <a className="colorGreen">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                      </ul>
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              ) : null}

                                                              {item.size !==
                                                              "" ? (
                                                                <>
                                                                  <tr>
                                                                    <td>
                                                                      <label>
                                                                        {TranslationContext !==
                                                                        undefined
                                                                          ? TranslationContext
                                                                              .label
                                                                              .sizes
                                                                          : "Sizes"}
                                                                        :
                                                                      </label>
                                                                    </td>
                                                                    <td>
                                                                      {isNaN(
                                                                        parseInt(
                                                                          item.size
                                                                        )
                                                                      ) ===
                                                                      false ? (
                                                                        <ul className="sizes">
                                                                          <li>
                                                                            <a>
                                                                              {
                                                                                item.size
                                                                              }
                                                                            </a>
                                                                          </li>
                                                                        </ul>
                                                                      ) : (
                                                                        <ul>
                                                                          <li>
                                                                            <a>
                                                                              {
                                                                                item.size
                                                                              }
                                                                            </a>
                                                                          </li>
                                                                        </ul>
                                                                      )}
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              ) : null}
                                                            </tbody>
                                                          </table>
                                                          <h3>
                                                            {TranslationContext !==
                                                            undefined
                                                              ? TranslationContext
                                                                  .h3.inr
                                                              : "INR "}
                                                            {item.price}
                                                            /-
                                                          </h3>
                                                        </div>
                                                      }
                                                      placement="left"
                                                    >
                                                      <img
                                                        src={item.imageURL}
                                                        className="ladyimg"
                                                        alt="Lady Img"
                                                      />
                                                    </Popover>
                                                  </Checkbox>
                                                  {item.brandName ? (
                                                    <h3>{item.brandName}</h3>
                                                  ) : null}
                                                  {item.productName ? (
                                                    <h4>{item.productName}</h4>
                                                  ) : null}
                                                  {item.price ? (
                                                    <span>
                                                      {item.price.toLocaleString(
                                                        "en-IN",
                                                        {
                                                          style: "currency",
                                                          currency: "INR",
                                                          minimumFractionDigits: 0,
                                                        }
                                                      )}
                                                    </span>
                                                  ) : null}
                                                  <img
                                                    disabled={
                                                      this.state.isButtonClick
                                                    }
                                                    onClick={this.handleRemoveProduct.bind(
                                                      this,
                                                      item.uniqueItemCode,
                                                      "W"
                                                    )}
                                                    src={Cancelico}
                                                    className="cancelico"
                                                    alt="Cancel Ico"
                                                  />
                                                </div>
                                              );
                                            }
                                          )
                                        : null}
                                      {this.state.wishListData.length === 0 ? (
                                        <Empty
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      ) : null}
                                    </div>
                                    {this.state.selectedWishList.length > 0 ? (
                                      <div className="tabsbotbtn-box">
                                        <button
                                          type="button"
                                          className="tabsbotbtn"
                                          onClick={this.handleSendProductsOnChat.bind(
                                            this,
                                            false
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.send
                                            : "SEND"}
                                        </button>
                                        <button
                                          type="button"
                                          className="tabsbotbtn"
                                          disabled={
                                            this.state.isButtonClick
                                              ? true
                                              : false
                                          }
                                          onClick={this.handleAddProductsToShoppingBag.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.addtobag
                                            : "ADD To BAG"}
                                        </button>
                                        <Popover
                                          overlayClassName="antcustom ant-prodesc"
                                          placement="topRight"
                                          content={
                                            <div
                                              // className="productdesc"
                                              className=""
                                              style={{
                                                display: "inline-flex",
                                              }}
                                            >
                                              <button
                                                type="button"
                                                className="tabsbotbtn"
                                                onClick={this.handleBuyProductsOnChat.bind(
                                                  this,
                                                  false,
                                                  true
                                                )}
                                              >
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.button
                                                      .directbuy
                                                  : "Direct Buy"}
                                              </button>
                                              <button
                                                type="button"
                                                className="tabsbotbtn"
                                                onClick={this.handleAddressModalOpen.bind(
                                                  this
                                                )}
                                              >
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.button
                                                      .addtoshoppingbag
                                                  : "Add to Shopping Bag"}
                                              </button>
                                            </div>
                                          }
                                        >
                                          <button
                                            onClick={this.handleBuyNowButtonClick.bind(
                                              this
                                            )}
                                            type="button"
                                            className="tabsbotbtn"
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.buynow
                                              : "BUY NOW"}
                                          </button>
                                        </Popover>
                                      </div>
                                    ) : null}
                                  </div>
                                </Tab>
                                <Tab
                                  label="Recommended"
                                  label={
                                    TranslationContext !== undefined
                                      ? TranslationContext.a.recommended
                                      : "Recommended"
                                  }
                                >
                                  <div className="shoppingbag">
                                    {this.state.recommendedData.length > 0 ? (
                                      <label
                                        className="selectalllabel"
                                        onClick={this.handleSelectAllProduct.bind(
                                          this,
                                          3
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.selectall
                                          : "Select All"}
                                      </label>
                                    ) : null}
                                    <div className="prodtabl">
                                      {this.state.recommendedData
                                        ? this.state.recommendedData.map(
                                            (item, i) => {
                                              return (
                                                <div
                                                  className="prodboxx"
                                                  key={i}
                                                >
                                                  <Checkbox
                                                    checked={
                                                      this.state
                                                        .recommendedData[i]
                                                        .isCheck
                                                    }
                                                    onChange={this.handleProductTabsChange.bind(
                                                      this,
                                                      3,
                                                      i
                                                    )}
                                                  >
                                                    <Popover
                                                      overlayClassName="antcustom ant-prodesc"
                                                      content={
                                                        <div className="productdesc">
                                                          <h4>
                                                            {item.productName}
                                                          </h4>
                                                          <p>
                                                            {TranslationContext !==
                                                            undefined
                                                              ? TranslationContext
                                                                  .p
                                                                  .lasttransaction
                                                              : "Last Transaction"}
                                                            -
                                                            {
                                                              item.uniqueItemCode
                                                            }
                                                          </p>
                                                          <table>
                                                            <tbody>
                                                              {item.color !==
                                                              "" ? (
                                                                <>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        width:
                                                                          "50px",
                                                                      }}
                                                                    >
                                                                      <label>
                                                                        {TranslationContext !==
                                                                        undefined
                                                                          ? TranslationContext
                                                                              .label
                                                                              .colors
                                                                          : "Colors"}
                                                                        :
                                                                      </label>
                                                                    </td>
                                                                    <td>
                                                                      <ul>
                                                                        {item.color ===
                                                                        "Blue" ? (
                                                                          <li>
                                                                            <a className="colorblue">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Black" ? (
                                                                          <li>
                                                                            <a className="colorblack">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Grey" ? (
                                                                          <li>
                                                                            <a className="colorgrey">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}

                                                                        {item.color ===
                                                                        "Red" ? (
                                                                          <li>
                                                                            <a className="colorRed">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                        {item.color ===
                                                                        "Yellow" ? (
                                                                          <li>
                                                                            <a className="colorYellow">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                        {item.color ===
                                                                        "Green" ? (
                                                                          <li>
                                                                            <a className="colorGreen">
                                                                              <span>
                                                                                1
                                                                              </span>
                                                                            </a>
                                                                          </li>
                                                                        ) : null}
                                                                      </ul>
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              ) : null}

                                                              {item.size !==
                                                              "" ? (
                                                                <>
                                                                  <tr>
                                                                    <td>
                                                                      <label>
                                                                        {TranslationContext !==
                                                                        undefined
                                                                          ? TranslationContext
                                                                              .label
                                                                              .sizes
                                                                          : "Sizes"}
                                                                        :
                                                                      </label>
                                                                    </td>
                                                                    <td>
                                                                      {isNaN(
                                                                        parseInt(
                                                                          item.size
                                                                        )
                                                                      ) ===
                                                                      false ? (
                                                                        <ul className="sizes">
                                                                          <li>
                                                                            <a>
                                                                              {
                                                                                item.size
                                                                              }
                                                                            </a>
                                                                          </li>
                                                                        </ul>
                                                                      ) : (
                                                                        <ul>
                                                                          <li>
                                                                            <a>
                                                                              {
                                                                                item.size
                                                                              }
                                                                            </a>
                                                                          </li>
                                                                        </ul>
                                                                      )}
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              ) : null}
                                                            </tbody>
                                                          </table>
                                                          <h3>
                                                            {TranslationContext !==
                                                            undefined
                                                              ? TranslationContext
                                                                  .h3.inr
                                                              : "INR "}
                                                            {item.price}
                                                            /-
                                                          </h3>
                                                        </div>
                                                      }
                                                      placement="left"
                                                    >
                                                      <img
                                                        src={item.imageURL}
                                                        // src={Ladyimg}
                                                        className="ladyimg"
                                                        alt="Lady Img"
                                                      />
                                                    </Popover>
                                                  </Checkbox>
                                                  {item.brandName ? (
                                                    <h3>{item.brandName}</h3>
                                                  ) : null}
                                                  {item.productName ? (
                                                    <h4>{item.productName}</h4>
                                                  ) : null}
                                                  {item.price ? (
                                                    <span>
                                                      {item.price.toLocaleString(
                                                        "en-IN",
                                                        {
                                                          style: "currency",
                                                          currency: "INR",
                                                          minimumFractionDigits: 0,
                                                        }
                                                      )}
                                                    </span>
                                                  ) : null}
                                                  <img
                                                    disabled={
                                                      this.state.isButtonClick
                                                    }
                                                    onClick={this.handleRemoveProduct.bind(
                                                      this,
                                                      item.uniqueItemCode,
                                                      "R"
                                                    )}
                                                    src={Cancelico}
                                                    className="cancelico"
                                                    alt="Cancel Ico"
                                                  />
                                                </div>
                                              );
                                            }
                                          )
                                        : null}
                                      {this.state.recommendedData.length ===
                                      0 ? (
                                        <Empty
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      ) : null}
                                    </div>
                                    {this.state.selectedRecommended.length >
                                    0 ? (
                                      <div className="tabsbotbtn-box">
                                        <button
                                          type="button"
                                          className="tabsbotbtn"
                                          onClick={this.handleSendProductsOnChat.bind(
                                            this,
                                            false
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.send
                                            : "SEND"}
                                        </button>
                                        <button
                                          type="button"
                                          className="tabsbotbtn"
                                          disabled={
                                            this.state.isButtonClick
                                              ? true
                                              : false
                                          }
                                          onClick={this.handleAddProductsToWishlist.bind(
                                            this,
                                            true
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .addtowishlist
                                            : "ADD To WISHLIST"}
                                        </button>
                                        <Popover
                                          overlayClassName="antcustom ant-prodesc"
                                          placement="topRight"
                                          content={
                                            <div
                                              // className="productdesc"
                                              className=""
                                              style={{
                                                display: "inline-flex",
                                              }}
                                            >
                                              <button
                                                type="button"
                                                className="tabsbotbtn"
                                                onClick={this.handleBuyProductsOnChat.bind(
                                                  this,
                                                  true,
                                                  true
                                                )}
                                              >
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.button
                                                      .directbuy
                                                  : "Direct Buy"}
                                              </button>
                                              <button
                                                type="button"
                                                className="tabsbotbtn"
                                                onClick={this.handleAddressModalOpen.bind(
                                                  this
                                                )}
                                              >
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.button
                                                      .addtoshoppingbag
                                                  : "Add to Shopping Bag"}
                                              </button>
                                            </div>
                                          }
                                        >
                                          <button
                                            onClick={this.handleBuyNowButtonClick.bind(
                                              this
                                            )}
                                            type="button"
                                            className="tabsbotbtn"
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.buynow
                                              : "BUY NOW"}
                                          </button>
                                        </Popover>
                                      </div>
                                    ) : null}
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
          </div>
        </Modal>
        {/* -----------------------Action Modal----------------- */}
        <Modal
          open={this.state.actionBtn}
          onClose={this.handleActionClose.bind(this)}
          closeIconId="close"
          modalId="actionmodalId"
          overlayId="logout-ovrly"
          classNames={{
            modal: this.state.onHoverName
              ? "actionmodalId-mr-add"
              : "actionmodalId-mr-remove",
          }}
        >
          <div className="store-hdrtMdal">
            <div className="row">
              <label
                className={"actionmodallbl"}
                style={{
                  cursor:
                    this.state.isCustEndChat === false ? "no-drop" : "Pointer",
                  pointerEvents:
                    this.state.isCustEndChat === false ? "none" : "all",
                }}
                disabled={this.state.isCustEndChat === false ? true : false}
                onClick={this.handleUpdateStoreManagerChatStatus.bind(this, 3)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.label.closechat
                  : "Close Chat"}
              </label>
            </div>
          </div>
        </Modal>
        {/* Address modal popup */}
        <Modal
          open={this.state.addressModal}
          onClose={this.handleAddressModalClose.bind(this)}
          center
          modalId="categoryEditModal"
          classNames={{
            modal:
              "order-popover order-popover-butns order-popover-address customaddpop",
          }}
        >
          <div style={{ padding: "15px" }}>
            <div className="popover-input-cntr">
              <div>
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.address
                    : "Address"}
                </p>
                <textarea
                  placeholder="Enter Address"
                  name="shippingAddress"
                  autoComplete="off"
                  value={this.state.shippingAddress}
                  onChange={this.handleTextOnchage}
                ></textarea>
                {this.state.isAddress ? (
                  <p
                    className="non-deliverable"
                    style={{ marginTop: "0", textAlign: "left" }}
                  >
                    {this.state.isAddress}
                  </p>
                ) : null}
              </div>
              <div>
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.landmark
                    : "Landmark"}
                </p>
                <input
                  type="text"
                  placeholder={
                    TranslationContext !== undefined
                      ? TranslationContext.placeholder.enterlandmark
                      : "Enter Landmark"
                  }
                  autoComplete="off"
                  name="shippingLandmark"
                  value={this.state.shippingLandmark}
                  onChange={this.handleTextOnchage}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.landmark
                      : "Pin Code"}
                  </p>
                  <input
                    type="text"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.placeholder.enterpincode
                        : "Enter Pin Code"
                    }
                    name="shippingPinCode"
                    autoComplete="off"
                    maxLength={6}
                    value={this.state.shippingPinCode}
                    // onChange={this.handleTextOnchage}
                    onChange={this.handlePinCodeCheck.bind(this)}
                  />
                  {this.state.isPinCode ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isPinCode}
                    </p>
                  ) : null}
                  {this.state.isPinCodeCheck ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isPinCodeCheck}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6">
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.city
                      : "City"}
                  </p>
                  <input
                    type="text"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.placeholder.entercity
                        : "Enter City"
                    }
                    autoComplete="off"
                    name="shippingCity"
                    value={this.state.shippingCity}
                    onChange={this.handleTextOnchage}
                  />
                  {this.state.isCity ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isCity}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.state
                      : "State"}
                  </p>
                  <input
                    type="text"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.placeholder.enterstate
                        : "Enter State"
                    }
                    name="shippingState"
                    autoComplete="off"
                    value={this.state.shippingState}
                    onChange={this.handleTextOnchage}
                  />
                  {this.state.isState ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isState}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6">
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.country
                      : "Country"}
                  </p>
                  <input
                    type="text"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.placeholder.entercountry
                        : "Enter Country"
                    }
                    name="shippingCountry"
                    autoComplete="off"
                    value={this.state.shippingCountry}
                    onChange={this.handleTextOnchage}
                  />
                  {this.state.isCountry ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isState}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row">
              <div class="ant-popover-buttons" style={{ marginLeft: "80px" }}>
                <button
                  type="button"
                  class="ant-btn ant-btn-sm"
                  onClick={this.handleAddressModalClose.bind(this)}
                >
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.cancel
                      : "Cancel"}
                  </span>
                </button>
                <button
                  type="button"
                  class="ant-btn ant-btn-primary ant-btn-sm"
                  onClick={this.handleBuyProductsOnChat.bind(
                    this,
                    this.state.productTypeTab === 1
                      ? false
                      : this.state.productTypeTab === 0
                      ? false
                      : true,
                    false
                  )}
                >
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.proceed
                      : "Proceed"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
