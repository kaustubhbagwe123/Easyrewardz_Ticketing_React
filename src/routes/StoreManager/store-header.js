import React, { Component, PureComponent } from "react";
import DashboardLogo from "./../../assets/Images/store-black.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import CancelIcon from "./../../assets/Images/cancel.png";
import ChatLogo from "./../../assets/Images/chat.png";
import ChatLogoBlue from "./../../assets/Images/chat-blue.png";
import MobileChatIcon from "./../../assets/Images/MobileChatIcon.svg";
import ChatLogow from "./../../assets/Images/chatw.png";
import Blub from "./../../assets/Images/bulb.svg";
import DownArrowChat from "./../../assets/Images/down-arrow-chat.svg";
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
import AddWh from "./../../assets/Images/AddWh.svg";
import Arwdown from "./../../assets/Images/arwdwn.png";
import BackArw from "./../../assets/Images/left-white.png";
import Arwup from "./../../assets/Images/arwup.png";
import Pin from "./../../assets/Images/pin.png";
import Chatw from "./../../assets/Images/chatw.png";
import Pin2 from "./../../assets/Images/pin2.png";
import CancelImg from "./../../assets/Images/cancel.png";
import BackIcon from "./../../assets/Images/black-left-arrow.png";
import WhiteIcon from "./../../assets/Images/white-left-arrow.png";
import Cancelico from "./../../assets/Images/cancel.png";
import CampaignLogo from "./../../assets/Images/campaign.svg";
import CampaignLogoBlue from "./../../assets/Images/campaign.svg";
import SettingLogoBlue from "./../../assets/Images/setting-blue.png";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import ClaimLogoBlue from "./../../assets/Images/claim-blue.png";
import OrderLogoBlue from "./../../assets/Images/order-icon-blue.png";
import OrderLogoBlack from "./../../assets/Images/order.png";
import StatusLogo from "./../../assets/Images/status.png";
import TicketLogoBlue from "./../../assets/Images/ticket-blue.png";
import SendUp from "./../../assets/Images/send-up.png";
import DownWhiteImg from "./../../assets/Images/down-white.png";
import Logout from "./../../assets/Images/logout.png";
import BackArrow from "./../../assets/Images/mobile-back.svg";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authHeader } from "../../helpers/authHeader";
import PencilImg from "./../../assets/Images/pencil.png";
import ProfileImg from "./../../assets/Images/UserLogin.png";
import SmartMessageWeb from "./../../assets/Images/Smart-Message-Web.svg";
import config from "../../helpers/config";
import axios from "axios";
import {
  Popover,
  Collapse,
  Checkbox,
  Empty,
  Spin,
  Card,
  Pagination,
} from "antd";
import { Drawer } from "antd";
import { ProgressBar } from "react-bootstrap";
import { transferData } from "./../../helpers/transferData";
// import "./../../assets/css/store-chat.css";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faDemocrat } from "@fortawesome/free-solid-svg-icons";
import { Table, Select, notification, Menu, Dropdown } from "antd";
import "react-pagination-js/dist/styles.css";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import Dropzone from "react-dropzone";
import { NotificationManager } from "react-notifications";
import "antd/dist/antd.css";
import "./../../assets/css/store-chat.css";
import DatePicker from "react-datepicker";
import NoImage from "./../../assets/Images/No-Image.png";
import RightShape from "./../../assets/Images/RightShape.png";
import RightBlue from "./../../assets/Images/blueRight.svg";
import Shoppingbag from "./../../assets/Images/Shoppingbag.png";
import Blueplus from "./../../assets/Images/blueplus.png";
import SearchWh from "./../../assets/Images/search.svg";
import WebBotLink from "./../../assets/Images/WebBotLink.png";
import AttachmentIcon from "./../../assets/Images/attachmentIcon.png";
import EditIcon from "./../../assets/Images/edit.png";

const { Option } = Select;
const { Panel } = Collapse;

var uid = 0;
var i = 0;

class ChatNotificationComponent extends PureComponent {
  handleChatNotificationClick = () => {
    if (this.props.notitficationType === "NewChat") {
      this.props.handleChatNotificationClick(this.props.chatData);
    } else {
      this.props.handleChatNotificationClick(this.props.chatData);
    }
  };
  render() {
    return (
      <div
        className="row"
        style={{
          cursor: "pointer",
        }}
        onClick={this.handleChatNotificationClick}
      >
        <div className="col-3">
          <div class="chat-trail-img">
            <span
              class="chat-initial"
              alt="face image"
              title={this.props.chatData[0].customerName}
            >
              {this.props.chatData[0].customerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        </div>
        <div className="col-9">
          <h5 title="Customer Name">{this.props.chatData[0].customerName}</h5>
          <p
            style={{
              wordBreak: "break-word",
            }}
          >
            {this.props.msgData}
          </p>
        </div>
      </div>
    );
  }
}
const ProductHoverItem = (props) => {
  const TranslationContext = props.TranslationContext;
  const item = props.item;
  const cardConfigData = props.cardConfigData;
  return (
    <div className="productdesc">
      {cardConfigData.ItemName ? <h4>{item.productName}</h4> : null}
      {cardConfigData.ItemCode ? (
        <p>
          {TranslationContext !== undefined
            ? TranslationContext.p.lasttransaction
            : "Item Code "}
          - {item.uniqueItemCode}
        </p>
      ) : null}
      <table>
        <tbody>
          {item.color !== "" && cardConfigData.Color ? (
            <>
              <tr>
                <td
                  style={{
                    width: "50px",
                  }}
                >
                  <label>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.colors
                      : "Colors"}
                    :
                  </label>
                </td>
                <td>
                  <ul>
                    {item.color === "Blue" ? (
                      <li>
                        <a className="colorblue">
                          <span>1</span>
                        </a>
                      </li>
                    ) : null}

                    {item.color === "Black" ? (
                      <li>
                        <a className="colorblack">
                          <span>1</span>
                        </a>
                      </li>
                    ) : null}

                    {item.color === "Grey" ? (
                      <li>
                        <a className="colorgrey">
                          <span>1</span>
                        </a>
                      </li>
                    ) : null}

                    {item.color === "Red" ? (
                      <li>
                        <a className="colorRed">
                          <span>1</span>
                        </a>
                      </li>
                    ) : null}
                    {item.color === "Yellow" ? (
                      <li>
                        <a className="colorYellow">
                          <span>1</span>
                        </a>
                      </li>
                    ) : null}
                    {item.color === "Green" ? (
                      <li>
                        <a className="colorGreen">
                          <span>1</span>
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </td>
              </tr>
            </>
          ) : null}

          {item.size !== "" && cardConfigData.Size ? (
            <>
              <tr>
                <td>
                  <label>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.sizes
                      : "Sizes"}
                    :
                  </label>
                </td>
                <td>
                  {isNaN(parseInt(item.size)) === false ? (
                    <ul className="sizes">
                      <li>
                        <a>{item.size}</a>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <a>{item.size}</a>
                      </li>
                    </ul>
                  )}
                </td>
              </tr>
            </>
          ) : null}
        </tbody>
      </table>
      {cardConfigData.Price ? (
        <h3>
          {TranslationContext !== undefined
            ? TranslationContext.h3.inr
            : "INR "}
          {item.price}
          /-
        </h3>
      ) : null}
    </div>
  );
};

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
      activeCollpse: [0],
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
      itemDetails: [],
      isCustTimeout: false,
      customerChatSessionValue: "",
      customerChatSessionDuration: "",
      agentChatSessionValue: "",
      agentChatSessionDuration: "",
      isEmptyArray: false,
      tmpOngoingChatsData: [],
      sourceType: "",
      pastChatCount: 0,
      pageNumberCurrentChat: 1,
      pastChatPageNo: 1,
      historyPage: 1,
      isProductLoading: false,
      isScrollMessage: false,
      isCallChatMessgaeApi: false,
      tenantID: 0,
      isProfileLoading: false,
      cardSearchStoreCode: false,
      isAddressName: "",
      isAddressMobileNo: "",
      addressMobileNo: "",
      addressName: "",
      oldScrollHeight: 0,
      alertMessageModal: false,
      alertMessageContent: "",
      storeDetails: "",
      insightsLoader: false,
      lasttransactionLoader: false,
      cardConfigData: {},
      isCardSearch: false,
      orderDetailsLoader: false,
      suggestionTagModal: false,
      ticketIds: false,
      ticketNo: "",
      AddWhite: false,
      isCardMobileUp: false,
      totalShoppingBag: 0,
      totalWishList: 0,
      totalRecommend: 0,
      mobileCollpseActive: [1],
      mobileShopBagProcessMdl: false,
      mobileWishProcessMdl: false,
      mobileRecommendProcessMdl: false,
      mobileChatActive: 0,
      uniqueItemID: 0,
      mobileprofilePic: "",
      NotificationPage: 1,
      chatNotificationModal: false,
      chatNotificationData: [],
      showSearch: false,
      chatNotificationMomCount: 0,
      userLoginMobileNo: "",
      isHSMShow: false,
      AttachementFiles: [],
      fileShowMdl: false,
      fileAttachDocWeb: "",
      isAttachmentMainLoader: false,
      isCheckSuggetion: false,
      isSelectedCard: false,
      mobileFileupload: false,
      customerNameProfile: "",
      attachmentSendCount: 0,
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
      this.props.history.push("/");
    } else {
      this.handleLoggedInUserDetails();
      this.handleGetUserProfileData();

      var userProfile = JSON.parse(window.localStorage.getItem("UserProfile"));
      if (userProfile !== null && userProfile.agentName) {
        var strTag = userProfile.agentName.split(" ");
        var nameTag = strTag[0].charAt(0).toUpperCase();
        if (strTag.length > 0) {
          nameTag += strTag[1].charAt(0).toUpperCase();
        }
        let nume =
          userProfile.loggedInDurationInHours * 60 +
          userProfile.loggedInDurationInMinutes;
        let deno =
          userProfile.shiftDurationInHour * 60 +
          userProfile.shiftDurationInMinutes;
        let percentLog = ((nume / deno) * 100).toFixed(2);
        var profile = userProfile.profilePicture;
        var finalPath = profile.substring(
          profile.lastIndexOf("\\") + 1,
          profile.length
        );

        this.setState({
          AgentID: userProfile.agentId,
          Email: userProfile.agentEmailId,
          UserName: userProfile.agentName,
          LoginTime: userProfile.loginTime,
          LoggedInDuration: userProfile.loggedInDuration,
          SLAScore: userProfile.slaScore,
          CSatScore: userProfile.csatScore,
          AvgResponse: userProfile.avgResponseTime,
          LogoutTime: userProfile.logoutTime,
          NameTag: nameTag,
          userProfile: finalPath,
          percentLog,
          workTime: userProfile.workTimeInPercentage,
          workTimeHours: userProfile.totalWorkingTime,
          programCode: userProfile.programCode ? userProfile.programCode : "",
          storeCode: userProfile.storeCode ? userProfile.storeCode : "",
        });
      }

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
    window.addEventListener("resize", this.handleCheckView.bind(this));

    this.handleCheckView();

    // this.handleGetNotigfication();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }

    if (document.getElementById("chatMessageCount")) {
      document.getElementById("chatMessageCount").innerText = 0;
    }
    if (document.getElementById("chatMessageCountMobile")) {
      document.getElementById("chatMessageCountMobile").innerText = 0;
    }
    if (document.getElementById("chatNotificationMomCount")) {
      document.getElementById("chatNotificationMomCount").innerText = 0;
    }
  }

  //handle scroll right
  handleScrollRight(num) {
    document.getElementById("schedule-btn-cntr" + num).scrollLeft += 20;
  }
  //handle scroll left
  handleScrollLeft(num) {
    document.getElementById("schedule-btn-cntr" + num).scrollLeft -= 20;
  }
  //handle show menu
  handleShowMenu() {
    this.setState({
      visible: true,
    });
  }
  //handle close manu
  handleCloseManu() {
    this.setState({
      visible: false,
    });
  }

  //handle set access user
  setAccessUser(data) {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var accessdata = [];
    var chatBot = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.label.chat
          : "Chat",
      urls: "Chatbot",
      logoBlack: ChatLogo,
      logoBlue: ChatLogoBlue,
      imgAlt: "Chatbot icon",
      imgClass: "storeChatbt",
      activeClass:
        page.toLowerCase() === "Chatbot".toLowerCase()
          ? "active single-menu"
          : "single-menu",
    };
    var dashboard = {
      data: "Dashboard",
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
        if (data[i].moduleName === "Chat" && data[i].modulestatus === true) {
          this.setState({
            chatAccess: "block",
          });
          accessdata.push(chatBot);
        } else if (
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
        } else if (
          data[i].moduleName === "HSM" &&
          data[i].modulestatus === true
        ) {
          this.setState({ isHSMShow: true });
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
    window.removeEventListener("resize", this.handleCheckView.bind(this));
  }
  componentDidUpdate() {
    if (this.state.chatModal && this.state.isDownbtn && this.state.isScroll) {
      this.setState({ isScroll: false });
      this.scrollToBottom();
    }

    if (this.state.showHistoricalChat) {
      this.historyMessageScrollToBottom();
    }
    var mobileHeading = window.location.pathname.split("/")[2];
    var ticketNo = "";
    var ticketIds = false;
    if (mobileHeading === "campaign") {
      mobileHeading = "Campaign";
      localStorage.removeItem("ticketNo");
    }
    if (mobileHeading === "appointment") {
      mobileHeading = "Appointment";
      localStorage.removeItem("ticketNo");
    }
    if (mobileHeading === "myTicketList") {
      mobileHeading = "Ticket";
      localStorage.removeItem("ticketNo");
    }
    if (mobileHeading === "notification") {
      mobileHeading = "Notification";
      localStorage.removeItem("ticketNo");
    }
    if (mobileHeading === "myTicket") {
      mobileHeading = "ID:";
      ticketIds = true;
      ticketNo = localStorage.getItem("ticketNo");
    }
    if (mobileHeading === "orders") {
      mobileHeading = "Orders";
      localStorage.removeItem("ticketNo");
    }
    if (this.state.isMobileView && this.state.mobileHeading !== mobileHeading) {
      this.setState({ mobileHeading, ticketIds, ticketNo });
    }
  }
  //handle crm role data
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
  //handle get user profile data
  handleGetUserProfileData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserProfileDetail",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.message;
        var data = res.data.responseData[0];
        if (status === "Success") {
          window.localStorage.setItem("UserData", JSON.stringify(data));
          // window.localStorage.setItem(
          //   "UserData",
          //   encryption(JSON.stringify(data)),"enc");

          var userdata = res.data.responseData[0].profilePicture;
          var mobileprofilePic = res.data.responseData[0].profilePicture;
          var userLoginMobileNo = res.data.responseData[0].mobileNo;
          self.setState({ mobileprofilePic, userLoginMobileNo });
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
  //handle opne modal
  onOpenModal = () => {
    this.setState({ open: true });
  };
  //handle close modal
  onCloseModal = () => {
    this.setState({ open: false });
  };
  //handle opne modal
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  //handle close modal
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  //handle notification modal open
  handleNotificationModalOpen() {
    this.setState({ notificationModal: true });
  }
  //handle notification modal close
  handleNotificationModalClose(typeId, type) {
    this.setState({ notificationModal: false });
    this.handleGetReadStoreNotification(typeId, type);
  }
  //handle logged in user deatils
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
          window.localStorage.setItem("UserProfile", JSON.stringify(data));

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
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  //handle get store agent details by agent id
  handleGetStoreAgentDetailsById(agentID) {
    let self = this;
    var checkStoreAgentData =
      window.localStorage.getItem("StoreAgentDetails") || "";
    if (checkStoreAgentData === "" || checkStoreAgentData === null) {
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
            window.localStorage.setItem(
              "StoreAgentDetails",
              JSON.stringify(data)
            );
            self.setState({ storeAgentDetail: data });
          } else {
            self.setState({ storeAgentDetail: [] });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      var checkStoreAgentData =
        window.localStorage.getItem("StoreAgentDetails") || "";
      self.setState({ storeAgentDetail: JSON.parse(checkStoreAgentData) });
    }
  }

  //handle logout method
  handleLogoutMethod() {
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreAccount/Logout",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.status;
        if (status === true) {
          if (self.state.isMobileView) {
            window.location.href = "/logout";
            // self.props.history.push("/logout");
          } else {
            localStorage.clear();
            window.location.href = "/";
            // self.props.history.push("");
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //handle get notification
  handleGetNotigfication() {
    let self = this;

    axios({
      method: "post",
      // url: config.apiUrl + "/StoreNotification/GetStoreNotifications",
      url: config.apiUrl + "/StoreNotification/GetStoreNotificationsNew",
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
            notificationData: [],
            notificationCount: 0,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetNotigfication");
      });
  }
  //handle get read store notification
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
    var pageName = "";
    const contDummy = [...this.state.cont];
    contDummy.forEach((i) => {
      i.activeClass = "single-menu";
      if (i.data === e.target.textContent) {
        i.activeClass = "active single-menu";
        pageName = i.urls;
      }
    });

    if (this.state.chatModal && !this.state.isMobileView) {
      this.setState({ chatModal: false });
    }
    this.setState({
      cont: contDummy,
      visible: false,
      mobileHeading: e.target.textContent,
    });

    if (pageName === "Chatbot") {
      this.props.history.push({
        pathname: "Chatbot",
        state: {
          programCode: this.state.programCode,
          storeCode: this.state.storeCode,
          agentId: this.state.AgentID,
          tenantID: this.state.tenantID,
          UserName: this.state.UserName,
        },
      });
    }
  };

  //handle chat modal close
  handleChatModalClose() {
    setTimeout(() => {
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
    }, 50);
  }
  //handle chat modal open
  handleChatModalOpen() {
    var activeTab = 1;
    if (this.state.isMessageTabActive === true) {
      activeTab = 1;
    } else if (this.state.isCardTabActive === true) {
      activeTab = 2;
    } else if (this.state.isRecommendedTabActive === true) {
      activeTab = 3;
    } else if (this.state.isSchedualTabActive === true) {
      activeTab = 4;
    } else if (this.state.isGeneratePaymentTabActive === true) {
      activeTab = 1;
    } else {
      activeTab = 1;
    }
    this.handleCheckView();
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
      showSearch: false,
    });
    var cardConfigData = window.localStorage.getItem("cardConfigData") || "";
    if (cardConfigData !== "" || cardConfigData !== null) {
      this.handleGetCardConfiguration();
    } else {
      this.setState({ cardConfigData });
    }

    var OrderShipmentData = "";
    if (
      window.localStorage.getItem("AgentList") === "" ||
      window.localStorage.getItem("AgentList") === null
    ) {
      OrderShipmentData = JSON.parse(window.localStorage.getItem("AgentList"));
    } else {
      OrderShipmentData = JSON.parse(window.localStorage.getItem("AgentList"));
    }
    var checkChatSession = window.localStorage.getItem("ChatSession") || "";

    if (checkChatSession === "" || checkChatSession === null) {
      this.handleGetChatSession();
    } else {
      var data = JSON.parse(window.localStorage.getItem("ChatSession"));
      this.setState({
        tempRemainingCount: data.chatCharLimit,
        remainingCount: data.chatCharLimit,
        isMessageTabActive: data.message,
        isCardTabActive: data.card,
        isRecommendedTabActive: data.recommendedList,
        isSchedualTabActive: data.scheduleVisit,
        isGeneratePaymentTabActive: data.paymentLink,
        isCustomerProfile: data.customerProfile,
        isCustomerProduct: data.customerProduct,
        agentChatSessionValue: data.agentChatSessionValue,
        agentChatSessionDuration: data.agentChatSessionDuration,
        customerChatSessionValue: data.customerChatSessionValue,
        customerChatSessionDuration: data.customerChatSessionDuration,
        cardSearchStoreCode: data.cardSearchStoreCode,
      });
      if (data.customerProfile) {
        this.setState({ ProfileProductTab: 0 });
      } else {
        this.setState({ ProfileProductTab: 1 });
      }
    }

    this.handleCheckView();

    // this.handleGetStoreAgentDetailsById(this.state.AgentID);
    this.handleGetAgentList();

    if (this.state.rowChatId > 0) {
      this.handleGetChatMessagesList(this.state.chatId);
    }
    // if (OrderShipmentData === null) {
    //   this.handleGetAgentList();
    // } else {
    //   this.setState({ agentData: OrderShipmentData });
    // }
  }

  //handle clear chat search
  handleClearChatSearch = async () => {
    await this.setState({ searchChat: "", showSearch: false });
  };

  //handle Make As Read On Going Chat
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
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleMakeAsReadOnGoingChat");
      });
  }

  //handle get chat notification count
  handleSearchChatItemDetails() {
    let self = this;
    var inputParam = {};
    if (this.state.cardSearchStoreCode) {
      inputParam.SearchText = this.state.searchItem;
      inputParam.ProgramCode = this.state.programCode;
      inputParam.StoreCode = this.state.storeCode;
    } else {
      inputParam.SearchText = this.state.searchItem;
      inputParam.ProgramCode = this.state.programCode;
    }
    this.setState({ isCardSearch: true });
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/searchChatItemDetails",
      url: config.apiUrl + "/CustomerChat/searchChatItemDetailsNew",
      headers: authHeader(),
      params: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var searchCardData = response.data.responseData;
        self.setState({ isCardSearch: false });
        if (message == "Success" && searchCardData) {
          searchCardData.forEach((element, i) => {
            element["itemID"] = i + 1;

            if (!self.state.cardConfigData.Brand) {
              element.brandName = "";
            }
            if (!self.state.cardConfigData.Category) {
              element.categoryName = "";
            }
            if (!self.state.cardConfigData.Color) {
              element.color = "";
            }
            if (!self.state.cardConfigData.ColorCode) {
              element.colorCode = "";
            }
            if (!self.state.cardConfigData.ImageURL) {
              element.imageURL = "";
            }
            if (!self.state.cardConfigData.ItemCode) {
              element.uniqueItemCode = "";
            }
            if (!self.state.cardConfigData.ItemName) {
              element.productName = "";
            }
            if (!self.state.cardConfigData.Price) {
              element.price = "";
            }
            if (!self.state.cardConfigData.Size) {
              element.size = "";
            }
            if (!self.state.cardConfigData.SubCategory) {
              element.subCategoryName = "";
            }
            if (!self.state.cardConfigData.Url) {
              element.url = "";
            }
            if (!self.state.cardConfigData.discount) {
              element.discount = "";
            }
          });
          self.setState({
            isCardMobileUp: self.state.isMobileView ? true : false,
            searchCardData,
            noProductFound: "",
            tempCardSearch: self.state.searchItem,
            isDownbtn: self.state.isMobileView === false ? false : true,
          });
        } else {
          self.setState({
            searchCardData: [],
            noProductFound: "No Product Found",
          });
        }
      })
      .catch((response) => {
        self.setState({ isCardSearch: false });
        console.log(response, "---handleSearchChatItemDetails");
      });
  }
  //handle get time slot by store id
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

  //handle send schedual visit
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
            var appointmentSendWB = {};
            appointmentSendWB.Date = self.state.selectedDate;
            appointmentSendWB.Slot = self.state.selectedSlot.timeSlot;
            appointmentSendWB.AppointmentID = timeSlotData[0].appointmentID;
            appointmentSendWB.CustomerName = timeSlotData[0].customerName;
            appointmentSendWB.CustomerMobileNo = self.state.selectedDate;
            appointmentSendWB.StoreName = timeSlotData[0].storeName;
            appointmentSendWB.StoreAddress = timeSlotData[0].storeAddress;
            appointmentSendWB.StoreMobileNo =
              timeSlotData[0].storeManagerMobile;
            appointmentSendWB.NoOfPeople = timeSlotData[0].noOfPeople;

            self.setState({
              noOfPeople: "",
              selectSlot: {},
              scheduleModal: false,
              selectedSlot: {},
              message: messagedata,
              isSendRecomended: false,
            });

            self.handleGetTimeSlot();
            self.handleSendMessageToCustomer(
              messagedata,
              "",
              "",
              appointmentSendWB
            );
          } else {
            self.setState({ isSendRecomended: false });
          }
        })
        .catch((response) => {
          console.log(response, "---handleScheduleVisit");
        });
    }
  }

  //handlecselect card in card tab
  handleSelectCard(id, imageUrl) {
    if (imageUrl) {
      this.setState({
        selectedCard: id,
        isSelectedCard: false,
        isCardSend: false,
      });
    } else {
      NotificationManager.error(
        "Image is not available so,not select the card"
      );
    }
  }
  //handle button down click
  handleDownButtonClick() {
    this.setState({ isDownbtn: !this.state.isDownbtn });
  }
  //handle on change ck editor
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
  //handle message suggestion
  handleMessageSuggestion = () => {
    // setTimeout(() => {
    if (this.state.message.length > 0) {
      if (this.state.isMobileView) {
        this.setState({ suggestionTagModal: true });
      } else {
        this.setState({ isCheckSuggetion: true });
      }

      this.setState({
        onHoverName: false,
        isPinClick: false,
      });
      this.handleGetMessageSuggestionList();
    } else {
      this.setState({
        messageSuggestionData: [],
        messageSuggestionTagsData: [],
        selectedTags: 0,
        chkSuggestion: 0,
      });
    }
    // }, 1);
  };
  //handle get message suggestion list
  handleGetMessageSuggestionList() {
    let self = this;
    // if (this.state.isMobileView) {
    this.setState({ isSuggestionLoad: true });
    // }
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
        self.setState({ isSuggestionLoad: false });
        if (status === "Success") {
          self.setState({
            messageSuggestionTagsData: responseData[0],
            selectedTags:
              responseData[0].length > 0 ? responseData[0][0].tagID : 0,
            messageSuggestionData: responseData[1],
            chkSuggestion: 0,
          });
        } else {
          self.setState({
            messageSuggestionData: [],
            chkSuggestion: 0,
            messageSuggestionTagsData: [],
            selectedTags: 0,
          });
        }
      })
      .catch((res) => {
        self.setState({ isSuggestionLoad: false });
        console.log(res);
      });
  }

  //handle search item text change
  handleSearchItemChange = (e) => {
    this.setState({ searchItem: e.target.value, noProductFound: "" });
  };
  //handle got to message scroll down
  scrollToBottom() {
    if (this.messageList) {
      const scrollHeight = this.messageList.scrollHeight;
      const height = this.messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }
  //handle no of people text change
  handleNoOfPeopleChange = (e) => {
    if (Object.keys(this.state.selectedSlot).length !== 0) {
      if (Number(e.target.value) > 0) {
        if (Number(e.target.value) <= this.state.selectedSlot.remaining) {
          if (Number(e.target.value) <= this.state.maxPeopleAllow) {
            this.setState({
              noOfPeople: e.target.value,
              noOfPeopleMax: "",
            });
          } else {
            this.setState({
              noOfPeople: "",
              noOfPeopleMax:
                "Maximum capacity are " + this.state.maxPeopleAllow,
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
          noOfPeople: "",
          noOfPeopleMax: "No. of people should be greater than 0",
        });
      }
    } else {
      this.setState({
        isSelectSlot: "Please select time slot",
      });
    }
  };
  //handle select slot button
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
  //handel enter pressed event in card
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      if (this.state.sourceType === "cb") {
        this.handleSearchChatItemDetails();
      } else {
        // this.handleSearchChatItemDetails();

        this.handleSearchChatItemDetailsWB();
      }
    }
  }
  //handle card send button
  handleSendCard() {
    if (this.state.selectedCard > 0) {
      var messageStringData = document.getElementById(
        "card" + this.state.selectedCard
      ).innerHTML;
      this.setState({ isSelectedCard: false });
      var messagewhatsAppData = this.state.searchCardData.filter(
        (x) => x.itemID === this.state.selectedCard
      );

      if (this.state.sourceType === "cb") {
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
          (messagewhatsAppData[0].url !== null
            ? messagewhatsAppData[0].url
            : "");

        var imageURL = messagewhatsAppData[0].imageURL;
      }
      this.setState({ isSendRecomended: true });

      this.handleSendProductsOnChat(
        true,
        messageStringData,
        messagewhatsAppContent,
        imageURL
      );
    } else {
      this.setState({ isSelectedCard: true, isCardSend: false });
    }
  }
  //handle tabl click
  handleTabClick = (tabIndex, e) => {
    if (tabIndex == 1) {
      this.setState({ isDownbtn: true, activeTab: 1, isScroll: true });
    }

    if (tabIndex == 2) {
      this.setState({ isDownbtn: true, activeTab: 2, isScroll: true });
    }
    if (tabIndex == 3) {
      this.setState({ isDownbtn: true, activeTab: 3, isScroll: true });
    }

    if (tabIndex == 4) {
      this.setState({ isDownbtn: true, activeTab: 4, isScroll: true });
      this.handleGetTimeSlot();
    }
    if (tabIndex == 5) {
      this.setState({ isDownbtn: true, activeTab: 5, isScroll: true });
    }
    this.AddWhiteIconClose();

    this.setState({
      isCardSend: false,
      isSelectedCard: false,
      selectedCard: 0,
      message: "",
      AttachementFiles: [],
      isCardMobileUp: false,
      isCardSearch: false,
      searchCardData: [],
      searchItem: "",
      noRecommendedFound: "",
      noOfPeopleMax: "",
      noProductFound: "",
      isSelectSlot: "",
    });
  };
  //handle send recommended list
  handleSendRecommendedList() {
    let self = this;
    this.setState({ isSendRecomended: true });
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/sendRecommendationsToCustomer",
      url: config.apiUrl + "/CustomerChat/sendRecommendationsToCustomerNew",
      headers: authHeader(),
      // params: {
      //   CustomerID: this.state.customerId,
      //   MobileNumber: this.state.mobileNo,
      //   ChatID: this.state.chatId
      // },
      params: {
        CustomerID: this.state.customerId,
        MobileNumber: this.state.mobileNo,
        ChatID: this.state.chatId,
        Source: this.state.sourceType,
        // Source: this.state.sourceType || "WT",
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.setState({ isSendRecomended: false, noRecommendedFound: "" });
          self.handleGetChatMessagesList(self.state.chatId);
        } else {
          self.setState({ isSendRecomended: false });
          self.setState({
            messageSuggestionData: [],
            messageSuggestionTagsData: [],
            selectedTags: 0,
            chkSuggestion: 0,
            noRecommendedFound: "No Record Found",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  //handle opne mobile suggestion list modal
  onOpenMobSuggestionModal(suggestionText, index) {
    if (index > 0) {
      this.setState({
        suggestionModalMob: true,
        chkSuggestion: index,
        suggestionText: suggestionText,
      });
    }
  }
  onOpenMobSuggestionModalNew(suggestionText, index) {
    if (index > 0) {
      this.setState({
        chkSuggestion: index,
        suggestionText: suggestionText,
      });
    }
  }

  //handle close mobile suggestion list modal
  onCloseMobSuggestionModal = () => {
    this.setState({ suggestionModalMob: false });
  };
  //handle change tab click
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
  //handle get agent recent chat data
  handleGetAgentRecentChat(customerId) {
    let self = this;
    this.setState({ isPastChatLoading: true });
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/GetAgentRecentChat",
      url: config.apiUrl + "/CustomerChat/GetAgentRecentChatNew",
      headers: authHeader(),
      params: { CustomerID: customerId, PageNo: this.state.pastChatPageNo },
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
  //handle get agent list
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
          // window.localStorage.setItem(
          //   "AgentList",
          //   encryption(JSON.stringify(agentData)),
          //   "enc"
          // );
          window.localStorage.setItem("AgentList", JSON.stringify(agentData));
          self.setState({ agentData });
        } else {
          self.setState({ agentData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAgentList");
      });
  }
  //handle change main tabs

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
    this.handleGetAgentRecentChat(this.state.customerId);
  }
  //handle change agent dropdown
  handleChangeAgentDropdown(e) {
    this.setState({ sAgentId: e });
    setTimeout(() => {}, 10);
  }
  //handle get agent chat history
  handleGetAgentChatHistory() {
    let self = this;
    this.setState({ isHistoricalChatLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetAgentChatHistory",
      // url: config.apiUrl + "/CustomerChat/GetAgentChatHistoryNew",
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

  //handle insert card image upload
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
          NotificationManager.success("Image Upload Successfully.");
        } else {
          NotificationManager.error("Image Not Uploaded.");
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageUploadlog");
      });
  }
  //handle open action modal pop up
  handleActionOpen = () => {
    this.setState({ actionBtn: true });
    // this.setState({ actionBtn: !this.state.actionBtn });
  };
  //handle close action modal pop up
  handleActionClose = () => {
    this.setState({ actionBtn: false });
  };
  //handle update store manage chat status
  handleUpdateStoreManagerChatStatus(id) {
    if (this.state.isCustEndChat || this.state.isCustTimeout) {
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
              isCustTimeout: false,
            });
            self.handleActionClose();
          }
        })
        .catch((response) => {
          console.log(response, "---handleUpdateStoreManagerChatStatus");
        });
    }
  }
  //handle historical table row click
  handleHistoricalTableRow = (e) => {
    this.setState({
      rowChatId: e.chatID,
      showHistoricalChat: true,
      chatTimeAgo: e.timeAgo,
      historyPage: 1,
    });
    this.handleGetChatMessagesList(e.chatID, 1);
  };
  ///handle set row class
  setRowClassName = (record) => {
    return record.chatID === this.state.rowChatId ? "clickRowStyl" : "";
  };
  //handle history messge scrool to bottom
  historyMessageScrollToBottom() {
    if (this.historyMessageList) {
      const scrollHeight = this.historyMessageList.scrollHeight;
      const height = this.historyMessageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.historyMessageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }
  //handle history chat close
  handleHistoryChatClose() {
    this.setState({
      rowChatId: 0,
      showHistoricalChat: false,
      chatTimeAgo: "",
    });
  }

  //handle get chat session
  handleGetChatSession() {
    let self = this;
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/GetChatSession",
      url: config.apiUrl + "/CustomerChat/GetChatSessionNew",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;

        if (message === "Success" && data) {
          window.localStorage.setItem("ChatSession", JSON.stringify(data));
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
            agentChatSessionValue: data.agentChatSessionValue,
            agentChatSessionDuration: data.agentChatSessionDuration,
            customerChatSessionValue: data.customerChatSessionValue,
            customerChatSessionDuration: data.customerChatSessionDuration,
            cardSearchStoreCode: data.cardSearchStoreCode,
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
  //handle end customer chat
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
  //handle tag button click
  handleTagsButtonClick = (tagsId) => {
    this.setState({ selectedTags: tagsId });
  };
  //handle get chat sound notification setting
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
          var reader = new FileReader();
          var reader1 = new FileReader();

          fetch(responseData.newMessageSoundFile).then(function(res) {
            res.blob().then(function(blob) {
              reader.addEventListener("loadend", function() {
                var base64FileData = reader.result.toString();
                localStorage.setItem(
                  "newMessageSoundFile",
                  JSON.stringify(base64FileData)
                );
              });
              reader.readAsDataURL(blob);
            });
          });

          fetch(responseData.newChatSoundFile).then(function(res) {
            res.blob().then(function(blob) {
              reader1.addEventListener("loadend", function() {
                var base64FileData = reader1.result.toString();
                localStorage.setItem(
                  "newChatSoundFile",
                  JSON.stringify(base64FileData)
                );
              });
              reader1.readAsDataURL(blob);
            });
          });
          window.localStorage.setItem(
            "ChatSoundNotiSetting",
            JSON.stringify(responseData)
          );
          self.setState({
            newChatSoundVolume: responseData.newChatSoundVolume || 0,
            newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
            isNotiNewChat: responseData.isNotiNewChat || false,
            isNotiNewMessage: responseData.isNotiNewMessage || false,
            notificationTime: responseData.notificationTime,
            tenantID: responseData.tenantID,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSoundNotiSetting");
      });
  };

  //handle get chat customer profile details
  handleGetChatCustomerProfile = (mobileNo) => {
    let self = this;

    if (mobileNo) {
      this.setState({ isProfileLoading: true });
      axios({
        method: "post",
        // url: config.apiUrl + "/CustomerChat/ChatProfileATVDetails",
        url: config.apiUrl + "/CustomerChat/GetChatCustomerProfile",
        headers: authHeader(),
        params: { MobileNo: mobileNo },
        timeout: 1000 * 20,
      })
        .then((response) => {
          var message = response.data.message;
          var responseData = response.data.responseData;
          self.setState({ isProfileLoading: false });
          if (message === "Success" && responseData) {
            window.localStorage.setItem(
              "CustomerProfile",
              JSON.stringify(responseData)
            );
            window.localStorage.setItem("IsCustomerProfile", false);
            var customerNameProfile = "";
            var customerMobileNo = "";
            if (responseData.mobileNumber) {
              customerMobileNo = responseData.mobileNumber;
            } else {
              customerMobileNo = self.state.mobileNo;
            }
            if (responseData.name) {
              customerNameProfile = responseData.name;
            } else {
              customerNameProfile = self.state.customerName;
            }

            self.setState({
              customerNameProfile,
              customerTier: responseData.tiername || "",
              customerMobileNo: customerMobileNo,
              customerEmailID: responseData.email || "",
              totalPoints: responseData.availablePoints || 0,
              lifetimeValue: responseData.lifeTimeValue || 0,
              visitCount: responseData.visitCount || 0,
            });
          } else {
            window.localStorage.setItem("CustomerProfile", {});
            window.localStorage.setItem("IsCustomerProfile", true);
          }
        })
        .catch((response) => {
          self.setState({ isProfileLoading: false });
          console.log(response);
        });
    }
  };
  /// handle get customer profile order details
  handleChatCustomerProfileOrderDetails = () => {
    let self = this;
    this.setState({ orderDetailsLoader: true });
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/GetChatCustomerProfile",
      url: config.apiUrl + "/CustomerChat/ChatCustomerProfileOrderDetails",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        self.setState({ orderDetailsLoader: false });
        if (message === "Success" && responseData) {
          window.localStorage.setItem("OrderDetails", responseData);
          window.localStorage.setItem("IsOrderDetails", false);
          self.setState({
            orderDelivered: responseData.orderDelivered,
            orderShoppingBag: responseData.orderShoppingBag,
            orderReadyToShip: responseData.orderReadyToShip,
            orderReturns: responseData.orderReturns,
          });
        } else {
          window.localStorage.setItem("OrderDetails", {});
          window.localStorage.setItem("IsOrderDetails", true);
        }
      })
      .catch((response) => {
        self.setState({ orderDetailsLoader: false });
        console.log(response);
      });
  };
  /// handle get profile last transcation data
  handleChatProfileLastTransactionData = (mobileNo) => {
    let self = this;
    this.setState({ lasttransactionLoader: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/ChatProfileLastTransactionDetails",
      headers: authHeader(),
      timeout: 1000 * 20,
      params: {
        MobileNo: mobileNo,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        self.setState({ lasttransactionLoader: false });
        if (message === "Success" && responseData) {
          window.localStorage.setItem(
            "LastTransaction",
            JSON.stringify(responseData)
          );
          window.localStorage.setItem("IsLastTransaction", false);
          self.setState({
            billNumber: responseData.billNumber || "",
            billAmount: responseData.billAmount,
            transactionDate: responseData.transactionDate,
            itemDetails: responseData.itemDetails || [],
            storeDetails: responseData.storeDetails,
          });
        } else {
          window.localStorage.setItem("LastTransaction", []);
          window.localStorage.setItem("IsLastTransaction", true);
        }
      })
      .catch((response) => {
        self.setState({ lasttransactionLoader: false });
        console.log(response);
      });
  };
  /// handle get profile customer insight
  handleChatProfileCustomerInsightData = (mobileNo) => {
    let self = this;
    this.setState({ insightsLoader: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/ChatProfileCustomerInsights",
      headers: authHeader(),
      params: {
        MobileNo: mobileNo,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        self.setState({ insightsLoader: false });
        if (message === "Success" && responseData) {
          window.localStorage.setItem(
            "CustomerInsights",
            JSON.stringify(responseData)
          );
          window.localStorage.setItem("IsCustomerInsights", false);

          self.setState({
            insights: responseData || [],
          });
        } else {
          window.localStorage.setItem("CustomerInsights", responseData);
          window.localStorage.setItem("IsCustomerInsights", true);
        }
      })
      .catch((response) => {
        self.setState({ insightsLoader: false });
        console.log(response);
      });
  };
  //handle genrate store pay link
  handleGenerateStorePayLink = () => {
    let self = this;
    if (this.state.chatModal && !this.state.isMobileView) {
      this.setState({ chatModal: false });
    }

    axios({
      method: "post",
      url: config.apiUrl + "/StorePay/GenerateStorePayLink",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var storePayURL = response.data.responseData;
        if (message === "Success" && storePayURL) {
          self.setState({
            storePayURL,
          });
          window.open(storePayURL, "blank");
        }
      })
      .catch((response) => {
        console.log(response, "---handleGenerateStorePayLink");
      });
  };

  //handle name mouse enter
  handleNameHover = () => {
    if (!this.state.onHoverName) {
      this.setState({
        onHoverName: !this.state.onHoverName,
      });
    }
    this.setState({ isCheckSuggetion: false });

    if (this.state.isCustomerProfile) {
      this.setState({ ProfileProductTab: 0 });
      if (!this.state.onHoverName) {
        if (this.state.customerMobileNo !== this.state.mobileNo) {
          this.handleGetChatCustomerProfile(this.state.mobileNo);
        } else {
          var responseData = JSON.parse(
            window.localStorage.getItem("CustomerProfile")
          );
          var IsCustomerProfile = window.localStorage.getItem(
            "IsCustomerProfile"
          );
          if (IsCustomerProfile === "true") {
            this.setState({
              customerTier: "",
              customerEmailID: "",
              totalPoints: 0,
              lifetimeValue: 0,
              visitCount: 0,
            });
          } else {
            if (IsCustomerProfile === "false") {
              this.setState({
                customerTier: responseData.customerTier || "",
                customerEmailID: responseData.email || "",
                totalPoints: responseData.availablePoints || 0,
                lifetimeValue: responseData.lifeTimeValue || 0,
                visitCount: responseData.visitCount || 0,
              });
            } else {
              this.handleGetChatCustomerProfile(this.state.mobileNo);
            }
          }
        }
      }
    } else {
      if (this.state.isCustomerProduct) {
        this.setState({ ProfileProductTab: 1 });
        if (!this.state.onHoverName) {
          this.handleGetChatCustomerProducts();
        }
      }
    }
  };
  //handle name hover leave
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
  //handle pin click
  handlePinClick = () => {
    this.setState({
      isPinClick: !this.state.isPinClick,
    });
  };
  //handle change shutter windows in mobile view
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
  //handle profile product tab change
  handleProfileProductTabChange = (index) => {
    this.setState({
      ProfileProductTab: index,
      totalShoppingBag: 0,
      totalWishList: 0,
      totalRecommend: 0,
    });
    if (index === 1) {
      this.handleGetChatCustomerProducts();
    }
  };
  //handle collpse change
  handleCollpseChange = (e) => {
    this.state.activeCollpse = e[e.length - 1];
    this.setState({
      activeCollpse: this.state.activeCollpse,
    });

    if (Number(this.state.activeCollpse) === 1) {
      var InsightData = window.localStorage.getItem("CustomerInsights");

      if (InsightData) {
        this.setState({
          // insights:JSON.parse(InsightData.insights),
          insights: JSON.parse(InsightData),
        });
      } else {
        this.handleChatProfileCustomerInsightData(this.state.mobileNo);
      }
    }

    if (Number(this.state.activeCollpse) === 2) {
      var responseData = {};
      if (window.localStorage.getItem("OrderDetails")) {
        var responseData = JSON.parse(
          window.localStorage.getItem("OrderDetails")
        );
      }

      var IsOrderDetails = window.localStorage.getItem("IsOrderDetails");
      if (
        IsOrderDetails === "true" ||
        (IsOrderDetails !== null && IsOrderDetails !== "")
      ) {
        this.setState({
          orderDelivered: "",
          orderShoppingBag: "",
          orderReadyToShip: "",
          orderReturns: "",
        });
      } else {
        if (IsOrderDetails === "false") {
          this.setState({
            orderDelivered: responseData.orderDelivered,
            orderShoppingBag: responseData.orderShoppingBag,
            orderReadyToShip: responseData.orderReadyToShip,
            orderReturns: responseData.orderReturns,
          });
        } else {
          this.handleChatCustomerProfileOrderDetails();
        }
      }
    }

    if (Number(this.state.activeCollpse) === 3) {
      var responseDatavar = null;
      if (window.localStorage.getItem("LastTransaction")) {
        responseDatavar = window.localStorage.getItem("LastTransaction");
      }

      if (responseDatavar) {
        var responseData = JSON.parse(responseDatavar);
        this.setState({
          billNumber: responseData.billNumber || "",
          billAmount: responseData.billAmount,
          transactionDate: responseData.transactionDate,
          itemDetails: responseData.itemDetails || [],
          storeDetails: responseData.storeDetails,
        });
      } else {
        this.handleChatProfileLastTransactionData(this.state.mobileNo);
      }
    }
  };

  //handle get chat customer products
  handleGetChatCustomerProducts = () => {
    let self = this;
    this.setState({ isProductLoading: true });
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
        var totalShoppingBag = 0;
        var totalWishList = 0;
        var totalRecommend = 0;
        self.setState({ isProductLoading: false });
        if (message === "Success" && responseData) {
          responseData.forEach((element) => {
            if (!self.state.cardConfigData.Brand) {
              element.brandName = "";
            }
            if (!self.state.cardConfigData.Category) {
              element.categoryName = "";
            }
            if (!self.state.cardConfigData.Color) {
              element.color = "";
            }
            if (!self.state.cardConfigData.ColorCode) {
              element.colorCode = "";
            }
            if (!self.state.cardConfigData.ImageURL) {
              element.imageURL = "";
            }
            if (!self.state.cardConfigData.ItemCode) {
              element.uniqueItemCode = "";
            }
            if (!self.state.cardConfigData.ItemName) {
              element.productName = "";
            }
            if (!self.state.cardConfigData.Price) {
              element.price = "";
            }
            if (!self.state.cardConfigData.Size) {
              element.size = "";
            }
            if (!self.state.cardConfigData.SubCategory) {
              element.subCategoryName = "";
            }
            if (!self.state.cardConfigData.Url) {
              element.url = "";
            }
            if (!self.state.cardConfigData.discount) {
              element.discount = "";
            }
          });
          for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].isShoppingBag) {
              responseData[i].isCheck = false;
              shoppingBagData.push(responseData[i]);
              totalShoppingBag += Number(responseData[i].price);
            }
            if (responseData[i].isWishList) {
              responseData[i].isCheck = false;
              wishListData.push(responseData[i]);
              totalWishList += Number(responseData[i].price);
            }
            if (responseData[i].isRecommended) {
              responseData[i].isCheck = false;
              totalRecommend += Number(responseData[i].price);
              recommendedData.push(responseData[i]);
            }
          }

          self.setState({
            shoppingBagData,
            totalShoppingBag,
            totalWishList,
            wishListData,
            recommendedData,
            totalRecommend,
            mainProductsData: responseData,
          });
        }
      })
      .catch((response) => {
        self.setState({ isProductLoading: false });
        console.log(response, "---handleGetChatCustomerProducts");
      });
  };

  //handle shopping bag ,wishlist & recommended product select
  handleProductTabsChange = (tabIndex, itemIndex, uniqueItemID) => {
    if (this.state.isCustTimeout || this.state.isCustEndChat) {
      return false;
    }

    //for Shopping Bag list
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
        uniqueItemID,
      });
    }
    // for Wish List
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
        uniqueItemID,
      });
    }
    //for Recommended list
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
        uniqueItemID,
      });
    }
  };
  //handle product type tab change
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
    if (this.state.isCustEndChat || this.state.isCustTimeout) {
      return false;
    }
    //for shopping bag list tab select all
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
    //for wish list tab select all
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
    //for recommended tab select all
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
  //handle remove product
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
          self.setState({
            mobileWishProcessMdl: false,
            mobileRecommendProcessMdl: false,
            mobileShopBagProcessMdl: false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleRemoveProduct");
      });
  };
  //handle add products to shopping bag

  handleAddProductsToBagOrWishlist = (type) => {
    let self = this;
    var itemCode = "";

    if (type === "shoppingbag") {
      if (this.state.selectedShoppingBag.length > 0) {
        for (let i = 0; i < this.state.selectedShoppingBag.length; i++) {
          if (this.state.selectedShoppingBag[i].isCheck) {
            itemCode += this.state.selectedShoppingBag[i].uniqueItemCode + ",";
          }
        }
      }
    } else if (type === "wishlist") {
      if (this.state.selectedWishList.length > 0) {
        for (let i = 0; i < this.state.selectedWishList.length; i++) {
          if (this.state.selectedWishList[i].isCheck) {
            itemCode += this.state.selectedWishList[i].uniqueItemCode + ",";
          }
        }
      }
    } else if (type === "recommended") {
      if (this.state.selectedRecommended.length > 0) {
        for (let i = 0; i < this.state.selectedRecommended.length; i++) {
          if (this.state.selectedRecommended[i].isCheck) {
            itemCode += this.state.selectedRecommended[i].uniqueItemCode + ",";
          }
        }
      }
    }
    this.setState({ isButtonClick: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/AddProductsToBagOrWishlist",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNo: this.state.mobileNo,
        ItemCodes: itemCode,
        Action: type,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          if (type === "wishlist") {
            self.setState({
              selectedWishList: [],
              isButtonClick: false,
              mobileWishProcessMdl: false,
              mobileShopBagProcessMdl: false,
              mobileRecommendProcessMdl: false,
            });
          } else if (type === "shoppingbag") {
            self.setState({
              selectedShoppingBag: [],
              isButtonClick: false,
              mobileWishProcessMdl: false,
              mobileShopBagProcessMdl: false,
              mobileRecommendProcessMdl: false,
            });
          } else {
            self.setState({
              selectedRecommended: [],
              isButtonClick: false,
              mobileRecommendProcessMdl: false,
              mobileWishProcessMdl: false,
              mobileShopBagProcessMdl: false,
            });
          }
          self.handleGetChatCustomerProducts();
        } else {
          self.setState({
            isButtonClick: false,
            mobileWishProcessMdl: false,
            mobileShopBagProcessMdl: false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---AddProductsToShoppingBag");
      });
  };
  //handle add products to wish list
  handleAddRecommendationToWishlist = () => {
    let self = this;
    var itemCode = "";
    if (this.state.selectedRecommended.length > 0) {
      for (let i = 0; i < this.state.selectedRecommended.length; i++) {
        if (this.state.selectedRecommended[i].isCheck) {
          itemCode += this.state.selectedRecommended[i].uniqueItemCode + ",";
        }
      }
    }
    // if (this.state.selectedShoppingBag.length > 0 && !formType) {
    //   for (let i = 0; i < this.state.selectedShoppingBag.length; i++) {
    //     if (this.state.selectedShoppingBag[i].isCheck) {
    //       itemCode += this.state.selectedShoppingBag[i].uniqueItemCode + ",";
    //     }
    //   }
    // }

    this.setState({ isButtonClick: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/AddRecommendationToWishlist",
      headers: authHeader(),
      params: {
        CustomerID: this.state.customerId,
        MobileNo: this.state.mobileNo,
        ItemCodes: itemCode,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          self.setState({ selectedRecommended: [], isButtonClick: false });
          self.handleGetChatCustomerProducts();
        } else {
          self.setState({ isButtonClick: false });
        }
      })
      .catch((response) => {
        console.log(response, "---AddProductsToShoppingBag");
      });
  };
  //handle mobile view back button
  handleBackButton = () => {
    this.setState({ customerName: "", isHistoricalChat: false });
  };
  //handle notification click
  handleNotificationClick = (chatData, isCurrenctChat) => {
    notification.close(chatData[0].chatID);
    if (!isCurrenctChat) {
      this.props.history.push({
        pathname: "chatbot",
        state: {
          programCode: this.state.programCode,
          storeCode: this.state.storeCode,
          tenantID: this.state.tenantID,
          agentId: this.state.AgentID,
          UserName: this.state.UserName,
          chatId: chatData[0].chatID,
        },
      });
      // this.handleOngoingChatClick(
      //   chatData[0].chatID,
      //   chatData[0].customerName,
      //   chatData[0].messageCount,
      //   chatData[0].mobileNo,
      //   chatData[0].customerID,
      //   chatData[0].programCode,
      //   chatData[0].storeID,
      //   chatData[0].isCustEndChat,
      //   chatData[0].storeManagerId,
      //   chatData[0].initialColor,
      //   chatData[0].isCustTimeout,
      //   chatData[0].sourceAbbr
      // );
    }
  };
  //handle check is mobile view active or not
  handleCheckView() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.setState({ isMobileView: true });
    } else {
      this.setState({ isMobileView: false, suggestionTagModal: false });
    }
  }
  //handle new chat notification click
  handleNewChatNotification = (chatData) => {
    notification.close(chatData[0].chatID);

    this.setState({
      newTicketChatId: 0,
    });
    if (
      window.location.pathname.toLowerCase() !== "/store/Chatbot".toLowerCase()
    ) {
      this.props.history.push({
        pathname: "chatbot",
        state: {
          programCode: this.state.programCode,
          storeCode: this.state.storeCode,
          tenantID: this.state.tenantID,
          agentId: this.state.AgentID,
          UserName: this.state.UserName,
          chatId: chatData[0].chatID,
          isNewChat: true,
        },
      });
    }

    // this.handleUpdateCustomerChatStatus(
    //   chatData[0].chatID,
    //   chatData[0].storeManagerId,
    //   chatData[0].storeID,
    //   chatData[0].customerName,
    //   chatData[0].mobileNo,
    //   chatData[0].customerID,
    //   chatData[0].programCode,
    //   chatData[0].sourceAbbr
    // );
  };
  //handle buy now button
  handleBuyNowButtonClick = () => {
    this.setState({ buyNowClick: !this.state.buyNowClick });
  };
  //handle address modal close
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
  //handle address modal open
  handleAddressModalOpen = () => {
    this.setState({
      addressModal: true,
      addressMobileNo: this.state.mobileNo,
      addressName: this.state.customerName,
    });
    this.handleGetCheckServiceData();
  };
  //handle modal text on change
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
    if (name === "addressName") {
      if (value) {
        this.setState({ [name]: value, isName: "" });
      } else {
        this.setState({ [name]: value, isName: "Please Enter Name." });
      }
    }
    if (name === "addressMobileNo") {
      if (value) {
        if (value.length <= 10) {
          this.setState({
            [name]: value,
            isAddressMobileNo: "",
            isAddressMobileNoValid: "",
          });
        } else {
          this.setState({
            [name]: "",
            isAddressMobileNoValid: "Please Enter Valid Mobile No.",
          });
        }
      } else {
        this.setState({
          [name]: value,
          isAddressMobileNo: "Please Enter Mobile No.",
        });
      }
    }
    if (name === "shippingLandmark") {
      this.setState({ [name]: value });
    }
  };
  //handle buy products on chat
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
    if (!this.state.addressName) {
      this.setState({ isAddressName: "Please Enter Name." });
    } else {
      this.setState({ isAddressName: "" });
    }
    if (!this.state.addressMobileNo) {
      this.setState({ isAddressMobileNo: "Please Enter Mobile No." });
    } else {
      this.setState({ isAddressMobileNo: "" });
    }
    if (
      this.state.isAddress === "" &&
      this.state.isPinCode === "" &&
      this.state.isCity === "" &&
      this.state.isState === "" &&
      this.state.isCountry === "" &&
      // this.state.isPinCodeCheck === "" &&
      this.state.isAddressMobileNo === "" &&
      this.state.isAddressName === ""
    ) {
      var addressDetails = {};
      addressDetails.address = this.state.shippingAddress || "";
      addressDetails.landmark = this.state.shippingLandmark || "";
      addressDetails.pinCode = this.state.shippingPinCode;
      addressDetails.city = this.state.shippingCity || "";
      addressDetails.state = this.state.shippingState || "";
      addressDetails.country = this.state.shippingCountry || "";
      var itemCodes = "";
      ///for recommendation
      if (isFromRecommendation) {
        for (let i = 0; i < this.state.selectedRecommended.length; i++) {
          itemCodes += this.state.selectedRecommended[i].uniqueItemCode + ",";
        }
      }
      ///for wish list
      if (this.state.productTypeTab == 1 && isFromRecommendation === false) {
        for (let i = 0; i < this.state.selectedWishList.length; i++) {
          itemCodes += this.state.selectedWishList[i].uniqueItemCode + ",";
        }
      }
      ///for shopping bag list
      if (this.state.productTypeTab == 0 && isFromRecommendation === false) {
        for (let i = 0; i < this.state.selectedShoppingBag.length; i++) {
          itemCodes += this.state.selectedShoppingBag[i].uniqueItemCode + ",";
        }
      }
      var inputParam = {};
      inputParam.CustomerID = this.state.customerId;
      inputParam.CustomerMobile = this.state.addressMobileNo;
      inputParam.IsFromRecommendation = isFromRecommendation;
      inputParam.IsDirectBuy = isDirectBuy;
      inputParam.ItemCodes = itemCodes;
      inputParam.CustomerName = this.state.addressName;

      if (isDirectBuy === false) {
        inputParam.CustomerAddress = addressDetails;
      }
      axios({
        method: "post",
        // url: config.apiUrl + "/CustomerChat/BuyProductsOnChat",
        url: config.apiUrl + "/CustomerChat/BuyProductsOnChatNew",
        headers: authHeader(),
        data: inputParam,
      })
        .then((response) => {
          var message = response.data.message;
          var responseData = response.data.responseData;
          var statusCode = response.data.statusCode;

          if (statusCode === 200) {
            NotificationManager.success("Products Buy Successfully.");
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
              addressModal: false,
              addressMobileNo: "",
              addressName: "",
              mobileWishProcessMdl: false,
              mobileRecommendProcessMdl: false,
              mobileShopBagProcessMdl: false,
            });

            self.handleGetChatCustomerProducts();
          } else {
            NotificationManager.error("Products Not Bought Successfully.");
          }
        })
        .catch((response) => {
          console.log(response, "---handleBuyProductsOnChat");
        });
    }
  };

  //handle mobile action menu click
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
  //handle get check server data
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
  //handle chat modal close on header mane click
  handleChatModalCloseManuClick = () => {
    if (this.state.chatModal) {
      this.setState({ chatModal: false });
    }
  };
  //handle product no image
  handleProductNoImage = (e) => {
    return (e.target.src = NoImage);
  };
  handlePastChatPageChange = (e) => {
    this.setState({ pastChatPageNo: e });
    setTimeout(() => {
      this.handleGetAgentRecentChat(this.state.customerId);
    }, 10);
  };
  handleMessageDivScroll = (element) => {
    let topOff = document.getElementsByClassName("chatcontentDiv")[0].scrollTop;
    let heightOffvar = document.getElementsByClassName("chatcontentDiv")[0]
      .scrollHeight;
    let heightPrent = (topOff / heightOffvar) * 100;

    if (topOff === 0) {
      if (this.state.isScrollMessage === true) {
        if (this.state.isCallChatMessgaeApi === false) {
          this.setState({
            isCallChatMessgaeApi: true,
            oldScrollHeight: heightOffvar,
          });

          this.handleGetChatMessagesList(this.state.chatId, 0, true);
          if (document.getElementsByClassName("chatcontentDiv")) {
            document.getElementsByClassName(
              "chatcontentDiv"
            )[0].scrollTop += 3500;
          }
        }
      }
    }
  };

  handlealertMessageModalOpen = (followUpID) => {
    // this.setState({
    //   alertMessageModal: true,
    // });
    this.handleGetCampaignFollowupNotifications(followUpID);
    this.handleGetNotigfication();
  };
  handlealertMessageModalClose = () => {
    this.setState({
      alertMessageModal: false,
    });
  };
  handleGetCampaignFollowupNotifications = (followUpID) => {
    let self = this;
    axios({
      method: "post",
      url:
        config.apiUrl + "/StoreNotification/GetCampaignFollowupNotifications",
      headers: authHeader(),
      params: { FollowUpID: followUpID },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.setState({
            alertMessageModal: true,
            notificationModal: false,
            alertMessageContent: responseData[0].notificationContent,
          });
        }
      })
      .catch((response) => {
        console.log(response, "----handleGetCampaignFollowupNotifications");
      });
  };
  //handle get card configuration
  handleGetCardConfiguration() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetCardConfiguration",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          var cardConfigData = {};

          responseData.forEach((element) => {
            cardConfigData[element.cardItem] = element.isEnabled;
          });

          window.localStorage.setItem(
            "cardConfigData",
            JSON.stringify(cardConfigData)
          );
          self.setState({ cardConfigData });
        } else {
          self.setState({ cardConfigData: {} });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardConfiguration");
      });
  }
  handleSearchChatItemDetailsWB = () => {
    let self = this;
    var inputParam = {};
    if (this.state.cardSearchStoreCode) {
      inputParam.SearchText = this.state.searchItem;
      inputParam.ProgramCode = this.state.programCode;
      inputParam.StoreCode = this.state.storeCode;
    } else {
      inputParam.SearchText = this.state.searchItem;
      inputParam.ProgramCode = this.state.programCode;
    }
    this.setState({ isCardSearch: true });
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/searchChatItemDetails",
      url: config.apiUrl + "/CustomerChat/searchChatItemDetailsWB",
      headers: authHeader(),
      params: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var searchCardData = response.data.responseData.items;
        self.setState({ isCardSearch: false });
        if (message == "Success" && searchCardData) {
          searchCardData.forEach((element, i) => {
            element["itemID"] = i + 1;

            // if (!self.state.cardConfigData.Brand) {
            //   element.brandName = "";
            // }
            // if (!self.state.cardConfigData.Color) {
            //   element.availableColor = [];
            // }
            // if (!self.state.cardConfigData.Category) {
            //   element.categoryName = "";
            // }

            // if (!self.state.cardConfigData.ImageURL) {
            //   element.imageUrl = "";
            // }
            // if (!self.state.cardConfigData.ItemCode) {
            //   element.itemCode = "";
            // }
            // if (!self.state.cardConfigData.ItemName) {
            //   element.name = "";
            // }
            // if (!self.state.cardConfigData.Price) {
            //   element.price = "";
            // }
            // if (!self.state.cardConfigData.Size) {
            //   element.sizeAvailability = [];
            // }
            // if (!self.state.cardConfigData.discount) {
            //   element.discount = "";
            // }
          });
          self.setState({
            isCardMobileUp: self.state.isMobileView ? true : false,
            searchCardData,
            noProductFound: "",
            tempCardSearch: self.state.searchItem,
            isDownbtn: self.state.isMobileView === false ? false : true,
          });
        } else {
          self.setState({
            searchCardData: [],
            noProductFound: "No Product Found",
          });
        }
      })
      .catch((response) => {
        self.setState({ isCardSearch: false });
        console.log(response, "---handleSearchChatItemDetails");
      });
  };
  handleSearchChatItemDetailsButton = () => {
    if (this.state.sourceType === "cb") {
      this.handleSearchChatItemDetails();
    } else {
      // this.handleSearchChatItemDetails();

      this.handleSearchChatItemDetailsWB();
    }
  };
  handleSuggestionTagModalClose = () => {
    this.setState({ suggestionTagModal: false });
  };
  handleRedireactToTicket = () => {
    document.getElementById("MobTicket").click();
  };
  AddWhiteIconOpen = () => {
    this.setState({ AddWhite: true });
  };
  AddWhiteIconClose = () => {
    this.setState({ AddWhite: false });
  };
  handlesuggestionConfModalOpen = () => {
    this.setState({ suggestionModalMob: true });
  };
  handleCloseProcessModal() {
    this.setState({
      mobileShopBagProcessMdl: false,
    });
  }
  handleOpenProcessModal(e) {
    e.stopPropagation();
    if (this.state.selectedShoppingBag.length > 0) {
      this.setState({
        mobileShopBagProcessMdl: true,
      });
    } else {
      return false;
    }
  }
  handleCloseWishListModal() {
    this.setState({
      mobileWishProcessMdl: false,
    });
  }
  handleOpenWishListModal(e) {
    e.stopPropagation();
    if (this.state.selectedWishList.length > 0) {
      this.setState({
        mobileWishProcessMdl: true,
      });
    } else {
      return false;
    }
  }
  handleCloseRecommendedListModal() {
    this.setState({
      mobileRecommendProcessMdl: false,
      mobileChatActive: 0,
    });
  }
  handleOpenRecommendedListModal(e) {
    e.stopPropagation();
    if (this.state.selectedRecommended.length > 0) {
      this.setState({
        mobileRecommendProcessMdl: true,
      });
    } else {
      return false;
    }
  }
  //handle product type tab change for mobile
  handleMobileCollpseChange(key) {
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
      selectedShoppingBag: [],
      selectedWishList: [],
      selectedRecommended: [],
      mobileCollpseActive: [key],
    });
    if (key) {
      if (Number(key) === 1) {
        this.setState({ productTypeTab: 0 });
      }
      if (Number(key) === 2) {
        this.setState({ productTypeTab: 1 });
      }
      if (Number(key) === 3) {
        this.setState({ productTypeTab: 2 });
      }
    } else {
      this.setState({ productTypeTab: 0 });
    }
  }
  /// handle product no image
  handleMobileProductNoImage = (e) => {
    return (e.target.src = Shoppingbag);
  };
  /// handle check tab for mobile
  handleCheckTabMobile(tab) {
    this.setState({
      mobileChatActive: tab,
    });
  }
  /// handle FinalProcess submit data
  handleFinalProcessToOrder(tab) {
    if (tab === "shoppingbag") {
      if (this.state.mobileChatActive === 1) {
        this.handleSendProductsOnChat(false, "", "", "");
      } else if (this.state.mobileChatActive === 2) {
        this.handleRemoveProduct(Number(this.state.uniqueItemID), "S");
      } else if (this.state.mobileChatActive === 3) {
        this.handleAddProductsToBagOrWishlist("shoppingbag");
      }
    } else if (tab === "wishlist") {
      if (this.state.mobileChatActive === 1) {
        this.handleSendProductsOnChat(false, "", "", "");
      } else if (this.state.mobileChatActive === 2) {
        this.handleRemoveProduct(Number(this.state.uniqueItemID), "W");
      } else if (this.state.mobileChatActive === 3) {
        this.handleAddProductsToBagOrWishlist("wishlist");
      }
    } else {
      if (this.state.mobileChatActive === 1) {
        this.handleSendProductsOnChat(false, "", "", "");
      } else if (this.state.mobileChatActive === 2) {
        // this.handleRemoveProduct(Number(this.state.uniqueItemID), "R");
      } else if (this.state.mobileChatActive === 3) {
        this.handleAddProductsToBagOrWishlist("recommended");
      }
    }
  }

  handleShowSearch = () => {
    this.setState({ showSearch: true });
  };
  handleChatMobileWindows() {
    this.setState({
      chatModal: true,
    });
  }
  handleGetChatCountForMobile() {
    // this.handleChatNotificationDetails();
    if (document.getElementById("chatBackIcon")) {
      document.getElementById("chatBackIcon").style.display = "none";
    }
    if (document.getElementById("store-footre-main")) {
      document.getElementById("store-footre-main").style.display = "block";
    }
  }
  handleUpdateChatMessageCount(count) {
    this.setState({
      chatNotificationMomCount: count || 0,
    });
  }
  handleFileUploading(e) {
    var fileArray = this.state.AttachementFiles;
    var selectedFiles = e;
    var fileSize = e;
    if (e.length === 0) {
      NotificationManager.error(
        "Only JPG, JPEG, PNG, PDF & DOC files are allowed."
      );
    }
    for (let i = 0; i < selectedFiles.length; i++) {
      if (
        !selectedFiles[i].name.match(
          /(\.jpg|\.jpeg|\.png|\.webp|\.pdf|\.doc|\.docx|\.JPG)$/
        )
      ) {
        NotificationManager.error(
          "Only jpeg, jpg, png, webp,pdf, doc,docx is allowed."
        );
      } else {
        var Maxsize = 1024 * 5;
        if (Maxsize * 1000 < fileSize[i].size) {
          NotificationManager.error(
            "File too Big, please select a file less than 5MB."
          );
        } else {
          fileArray.push(selectedFiles[i]);
          this.setState({
            AttachementFiles: fileArray,
          });
        }
      }
    }
  }
  handleFileUploadingMobile(e) {
    var fileArray = this.state.AttachementFiles;
    var selectedFiles = e.target.files;
    var fileSize = e.target.files;
    this.setState({ mobileFileupload: false });
    for (let i = 0; i < selectedFiles.length; i++) {
      if (
        !selectedFiles[i].name.match(
          /(\.jpg|\.jpeg|\.png|\.webp|\.pdf|\.doc|\.docx|\.JPG)$/
        )
      ) {
        NotificationManager.error(
          "Only jpeg, jpg, png, webp,pdf, doc,docx is allowed."
        );
      } else {
        var Maxsize = 1024 * 5;
        if (Maxsize * 1000 < fileSize[i].size) {
          NotificationManager.error(
            "File too Big, please select a file less than 5MB."
          );
        } else {
          fileArray.push(selectedFiles[i]);
          this.setState({
            AttachementFiles: fileArray,
          });
        }
      }
    }
    e.target.value = "";
  }

  handleOpenFileShow() {
    this.setState({
      fileShowMdl: true,
    });
  }

  handleFileClose() {
    this.setState({
      fileShowMdl: false,
    });
  }
  handleCancelFile(i) {
    if (this.state.AttachementFiles.length > 1) {
      let AttachementFiles = [...this.state.AttachementFiles];
      AttachementFiles.splice(i, 1);
      this.setState({ AttachementFiles });
    } else {
      this.setState({
        fileShowMdl: false,
        AttachementFiles: [],
      });
    }
  }

  handleHideSuggetionWeb = () => {
    this.setState({
      isCheckSuggetion: false,
      messageSuggestionData: [],
      messageSuggestionTagsData: [],
    });
  };
  handleOpenChatbotPage = (isBack) => {
    if (isBack) {
      document.getElementById("chatBackIcon").style.display = "none";
      document.getElementById("store-footre-main").style.display = "block";
      document.getElementById("backButtonClick").click();
    }
    this.props.history.push({
      pathname: "Chatbot",
      state: {
        programCode: this.state.programCode,
        storeCode: this.state.storeCode,
        agentId: this.state.AgentID,
        tenantID: this.state.tenantID,
        UserName: this.state.UserName,
      },
    });
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const PaginationButton = (current, type, originalElement) => {
      if (type === "prev") {
        return (
          <a>
            <button className="butn">Previous</button>
          </a>
        );
      }
      if (type === "next") {
        return (
          <a>
            <button className="butn">Next</button>
          </a>
        );
      }
      return originalElement;
    };
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
            <div className="headers-menu">
              {this.state.cont.map((item) => {
                if (item.data === "Store Pay" || item.data === "स्टोर पे") {
                  return (
                    <a
                      key={item.data}
                      className="storepay-a single-menu"
                      onClick={this.handleGenerateStorePayLink.bind(this)}
                    >
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
                      <label>{item.data}</label>
                    </a>
                  );
                } else if (item.data === "Chat") {
                  return (
                    <a
                      onClick={this.actives}
                      key={item.data}
                      className={
                        window.location.pathname
                          .split("/")
                          .pop()
                          .toLowerCase() === item.urls.toLowerCase()
                          ? "active single-menu"
                          : "single-menu"
                      }
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
                    </a>
                  );
                } else {
                  return (
                    <Link
                      onClick={this.actives}
                      key={item.data}
                      to={{
                        pathname: item.urls,
                        state: {
                          userMaster_ID: this.state.userMaster_ID,
                          tenant_ID: this.state.tenant_ID,
                          ProgramCode: this.state.ProgramCode,
                          StoreCode: this.state.StoreCode,
                        },
                      }}
                      // className={item.activeClass}
                      className={
                        window.location.pathname
                          .split("/")
                          .pop()
                          .toLowerCase() === item.urls.toLowerCase()
                          ? "active single-menu"
                          : "single-menu"
                      }
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

          <div className="header-right-icons" id="mobileHederIcon">
            {this.state.isHSMShow ? (
              <Link
                to="/store/WebBotLink"
                onClick={this.handleChatModalCloseManuClick.bind(this)}
              >
                <img
                  src={WebBotLink}
                  alt="WebBotLink"
                  className="setting"
                  style={{ width: "28px" }}
                />
              </Link>
            ) : null}
            <a
              // onClick={this.handleChatModalOpen.bind(this)}
              onClick={this.handleOpenChatbotPage.bind(this, false)}
              style={{ display: this.state.chatAccess }}
            >
              <div className="position-relative">
                {this.state.isMobileView ? (
                  <img src={MobileChatIcon} alt="logo" className="chatImg" />
                ) : (
                  <img src={ChatLogo} alt="logo" className="chatImg" />
                )}
                <img
                  src={ChatLogoBlue}
                  alt="logo"
                  className="chatImg"
                  style={{ display: "none" }}
                />
                <span id="chatMessageCount" className="message-icon-cnt">
                  {/* {this.state.chatMessageCount || 0} */}
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
              <img
                src={SettingLogo}
                alt="logo"
                className="setting"
                onClick={this.handleChatModalCloseManuClick.bind(this)}
              />
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
            <a href="#!" className="bitmap5 useric" onClick={this.onOpenModal}>
              {this.state.UserName.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </a>
          </div>
        </div>
        <div className="mob-header">
          <label className="cusheadermob">
            <img
              id="chatBackIcon"
              src={WhiteIcon}
              alt="back"
              style={{
                display: "none",
                width: "26px",
                marginRight: "10px",
                marginBottom: "5px",
              }}
              onClick={this.handleOpenChatbotPage.bind(this, true)}
            />
            {this.state.ticketIds ? (
              <img
                src={BackIcon}
                alt="back"
                style={{ width: "15px", marginRight: "10px" }}
                onClick={this.handleRedireactToTicket.bind(this)}
              />
            ) : null}
            {this.state.ticketIds
              ? "ID :" + this.state.ticketNo
              : this.state.mobileHeading}
          </label>
          {/* {!this.state.ticketNo ? ( */}
          <div
            className="header-right-icons"
            style={{
              display:
                this.state.isMobileView && this.state.ticketNo ? "none" : "",
            }}
          >
            {this.state.isHSMShow ? (
              <Link
                to="/store/WebBotLink"
                onClick={this.handleGetChatCountForMobile.bind(this)}
              >
                <div className="position-relative backnotifi">
                  <img
                    src={WebBotLink}
                    alt="WebBotLink"
                    className="webbotImg"
                  />
                </div>
              </Link>
            ) : null}

            <a
              href="#!"
              style={{
                display: this.state.notificationAccess,
              }}
            >
              <div
                className="position-relative backnotifi"
                onClick={this.handleNotificationModalOpen.bind(this)}
              >
                <img
                  src={NotificationLogo}
                  alt="logo"
                  className="notifi"
                  style={{ width: "15px" }}
                />
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
            {/* -------------------------Mobile chat notification ---------------*/}
            {this.state.isMobileView ? (
              <Link
                to={{
                  pathname: "notification",
                  state: {
                    programCode: this.state.programCode,
                    storeCode: this.state.storeCode,
                    tenantID: this.state.tenantID,
                    AgentID: this.state.AgentID,
                    UserName: this.state.UserName,
                  },
                  handleUpdateChatMessageNotificationCount: this.handleUpdateChatMessageCount.bind(
                    this
                  ),
                }}
              >
                <div
                  className="position-relative backnotifi"
                  id="MobileChatNotifiCount"
                  onClick={this.handleGetChatCountForMobile.bind(this)}
                >
                  <img
                    src={NotificationLogo}
                    alt="logoMobile"
                    className="notifi"
                    style={{ width: "15px" }}
                  />
                  <span style={{ display: "none" }} className="icon-fullname">
                    Notifications
                  </span>

                  <span
                    className="upper-noti-count"
                    id="chatNotificationMomCount"
                  >
                    {/* {this.state.chatNotificationMomCount} */}0
                  </span>

                  <span style={{ display: "none" }} className="icon-fullname">
                    Notifications
                  </span>
                </div>
              </Link>
            ) : null}
            <a
              id="chatwindow"
              onClick={this.handleOpenChatbotPage.bind(this, false)}
              style={{ display: this.state.chatAccess }}
            >
              <div className="position-relative backnotifi">
                {this.state.isMobileView ? (
                  <img
                    src={MobileChatIcon}
                    alt="logo"
                    className="chatImg mobic"
                  />
                ) : (
                  <img src={ChatLogow} alt="logo" className="chatImg" />
                )}
                <img
                  src={ChatLogoBlue}
                  alt="logo"
                  className="chatImg"
                  style={{ display: "none" }}
                />
                <span id="chatMessageCountMobile" className="message-icon-cnt">
                  {/* {this.state.chatMessageCount} */}
                </span>
              </div>
            </a>
            <a>
              <img src={SearchWh} alt="logo" className="searchIcon" />
            </a>
            {!this.state.isMobileView ? (
              <a
                href="#!"
                className="bitmap5 useric"
                onClick={this.onOpenModal}
              >
                {this.state.UserName.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </a>
            ) : (
              <img
                className="bitmap5 useric"
                src={this.state.mobileprofilePic}
                onClick={this.onOpenModal}
                alt={this.state.UserName.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              />
            )}
            <a className="verticaldots">
              <img src={Dots} alt="Dots" className="" />
            </a>
          </div>
          {/* ) : null} */}
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
                    <Link
                      to="userprofile"
                      onClick={this.handleGetChatCountForMobile.bind(this)}
                    >
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
                  className="logout logi"
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
                    : "CHAT STATUS"}
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

            <div className="butnlog">
              <button
                type="button"
                className="logout logi1"
                onClick={this.handleLogoutMethod.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.button.logout
                  : "LOGOUT"}
              </button>
            </div>

            {/* <div className="logi">
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
            </div> */}
          </div>
        </Modal>
        {/*----------------- notification modal-------------- */}
        <Modal
          onClose={this.handleNotificationModalClose.bind(this)}
          open={this.state.notificationModal}
          modalId="Notification-popup"
          classNames={{ modal: "notifimobilemodal" }}
          overlayId="logout-ovrly"
        >
          <div className="notifi-container">
            <div className="mobnotiheader">
              <label>Notification</label>
              <img
                src={CancelIcon}
                alt="cancel-icone"
                className="cust-icon"
                onClick={this.handleNotificationModalClose.bind(this)}
                style={{ marginTop: "10px" }}
              />
            </div>
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
                    <div className="col-10 md-6 new-tickets-assigned tic-noti">
                      <label>
                        <span style={{ whiteSpace: "nowrap" }}>
                          {item.notificationName}
                        </span>
                      </label>
                    </div>
                    <div className="col-12 viewticketspeadding">
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
                                    ) : data.notificatonTypeName ===
                                      "Campaign" ? (
                                      <>
                                        {data.notificatonTypeName + " No:"}
                                        <Link
                                          style={{ color: "#2561A8" }}
                                          onClick={this.handlealertMessageModalOpen.bind(
                                            this,
                                            data.notificatonTypeID
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
                              ? "col-12 md-4 view-tickets"
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
                          to={{
                            pathname: item.urls,
                          }}
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
                <li onClick={this.handleLogoutMethod.bind(this)}>
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
        <a
          id="mobileChatbotWindows"
          onClick={this.handleChatMobileWindows.bind(this)}
        ></a>
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
          <div style={{ padding: "0px 15px 0px 10px" }}>
            <div className="row">
              <label
                className={"actionmodallbl"}
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
              <div className="row">
                <div className="col-md-6">
                  <p>Name</p>
                  <input
                    type="text"
                    placeholder={"Enter Name"}
                    name="addressName"
                    autoComplete="off"
                    value={this.state.addressName}
                    onChange={this.handleTextOnchage}
                    // disabled={true}
                  />

                  {this.state.isName ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isName}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6">
                  <p>Mobile No</p>
                  <input
                    type="text"
                    placeholder={"Enter Mobile No"}
                    autoComplete="off"
                    name="addressMobileNo"
                    value={this.state.addressMobileNo}
                    onChange={this.handleTextOnchage}
                    disabled={true}
                  />
                  {this.state.isAddressMobileNo ? (
                    <p
                      className="non-deliverable"
                      style={{ marginTop: "0", textAlign: "left" }}
                    >
                      {this.state.isAddressMobileNo}
                    </p>
                  ) : null}
                </div>
              </div>

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
        <Modal
          open={this.state.fileShowMdl}
          onClose={this.handleFileClose.bind(this)}
          center
          modalId="fileImagesShow"
          overlayId="logout-ovrly"
        >
          <div style={{ marginTop: "10px" }}>
            <label className="fileAttch">
              {this.state.AttachementFiles.length}&nbsp;Attachment
            </label>
            <img
              src={CancelImg}
              alt="Cancel"
              className="cancelFileimg"
              onClick={this.handleFileClose.bind(this)}
            />
          </div>
          <div
            className="fileAttchment"
            style={{ margin: "0px 20px 20px 20px" }}
          >
            {this.state.AttachementFiles.length > 0
              ? this.state.AttachementFiles.map((item, i) => {
                  return (
                    <div className="fileBrdpdg" key={i}>
                      <label className="lblFonr" title={item.name}>
                        {item.name}
                      </label>
                      <img
                        src={CancelImg}
                        alt="Cancel"
                        className="fileDocCancel"
                        onClick={this.handleCancelFile.bind(this, i)}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </Modal>
        <Modal
          open={this.state.alertMessageModal}
          onClose={this.handlealertMessageModalClose.bind(this)}
          center
          modalId="alertMessageModal"
          classNames={{
            modal:
              "order-popover order-popover-butns order-popover-address customaddpop",
          }}
        >
          <div className="popover-input-cntr">
            <div className="comment-disp" style={{ float: "right" }}>
              <div>
                <img
                  src={CancelImg}
                  alt="Minus"
                  className="pro-cross-icn m-0"
                  onClick={this.handlealertMessageModalClose.bind(this)}
                />
              </div>
            </div>
            <div style={{ padding: "15px" }}>
              <div className="Commentlabel">
                <label className="Commentlabel1">Messgae Content</label>
              </div>
              <textarea
                style={{ height: "200px", fontSize: "14px" }}
                value={this.state.alertMessageContent}
              ></textarea>
              <div className="row">
                <div class="ant-popover-buttons" style={{ marginLeft: "80px" }}>
                  <button
                    type="button"
                    class="ant-btn ant-btn-primary ant-btn-sm"
                    onClick={this.handlealertMessageModalClose.bind(this)}
                    style={{ color: "#fff", marginLeft: "280px" }}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.span.close
                      : "Close"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
