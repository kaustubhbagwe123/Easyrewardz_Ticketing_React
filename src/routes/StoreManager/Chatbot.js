import React, { Component, PureComponent } from "react";
import { authHeader } from "../../helpers/authHeader";
import {
  Popover,
  Collapse,
  Checkbox,
  Empty,
  Spin,
  Table,
  Select,
  notification,
  Menu,
  Dropdown,
  Tooltip,
} from "antd";
import config from "../../helpers/config";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import axios from "axios";
import "react-pagination-js/dist/styles.css";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import Dropzone from "react-dropzone";
import { NotificationManager } from "react-notifications";
import "antd/dist/antd.css";
import "./../../assets/css/store-chat.css";
import moment from "moment";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faDemocrat } from "@fortawesome/free-solid-svg-icons";
import NoImage from "./../../assets/Images/No-Image.png";
import RightShape from "./../../assets/Images/RightShape.png";
import RightBlue from "./../../assets/Images/blueRight.svg";
import Shoppingbag from "./../../assets/Images/Shoppingbag.png";
import Blueplus from "./../../assets/Images/blueplus.png";
import AttachmentIcon from "./../../assets/Images/attachmentIcon.png";
import EditIcon from "./../../assets/Images/edit.png";
import CancelBlueImg from "./../../assets/Images/CancelBlue.png";
import CancelBlack from "./../../assets/Images/cancel.png";
import CircleRight from "./../../assets/Images/circle-right.png";
import SearchBlueImg from "./../../assets/Images/search-blue.png";
import SchRight from "./../../assets/Images/sch-right.png";
import CardTick from "./../../assets/Images/card-tick.png";
import UpBlue from "./../../assets/Images/new-Up.png";
import DownBlue from "./../../assets/Images/new-Down.png";
import DownArw from "./../../assets/Images/down.png";
import SendUp from "./../../assets/Images/send-up.png";
import Cancelico from "./../../assets/Images/cancel.png";
import Arwup from "./../../assets/Images/arwup.png";
import Pin from "./../../assets/Images/pin.png";
import Chatw from "./../../assets/Images/chatw.png";
import Pin2 from "./../../assets/Images/pin2.png";
import AddWh from "./../../assets/Images/AddWh.svg";
import Arwdown from "./../../assets/Images/arwdwn.png";
import SmartMessageWeb from "./../../assets/Images/Smart-Message-Web.svg";
import DownArrowChat from "./../../assets/Images/down-arrow-chat.svg";
import ReactHtmlParser from "react-html-parser";
import SuggSearch from "./../../assets/Images/sugg-search.png";
import Assign from "./../../assets/Images/sent-icon.svg";
import addimg from "./../../assets/Images/addimg.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../assets/Images/cancel.png";
import Blub from "./../../assets/Images/bulb.svg";
import Triangle from "./../../assets/Images/triangle.png";
const { Option } = Select;
const { Panel } = Collapse;
const socket = io.connect(config.socketUrl, {
  transports: ["websocket"],
  upgrade: true,
});
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
          <div className="chat-trail-img">
            <span
              className="chat-initial"
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

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      UserName: "",
      chatTypeCollpase: [2],
      // Profane_Words: [],
      // Suggested_Words: {},
      // selectedSuggested_Words: {},
      // isgrammarlyCheck: false,
      // grammarlyModal: false,
      replaceMessageVal: "",
    };
  }

  componentDidMount() {
    socket.connect();
    if (this.props.location.state) {
      if (window.localStorage.getItem("newTicketChatId")) {
        this.setState({
          newTicketChatId:
            Number(window.localStorage.getItem("newTicketChatId")) || 0,
        });
        window.localStorage.removeItem("newTicketChatId");
      }

      if (
        this.props.location.state.chatId &&
        !this.props.location.state.isNewChat
      ) {
        this.setState({
          programCode: this.props.location.state.programCode || "",
          storeCode: this.props.location.state.storeCode || "",
          tenantID: this.props.location.state.tenantID || 0,
          AgentID: this.props.location.state.agentId || 0,
          UserName: this.props.location.state.UserName || "",
          chatId: this.props.location.state.chatId || 0,
        });
        this.props.location.state.chatId = 0;
      } else if (
        this.props.location.state.chatId &&
        this.props.location.state.isNewChat
      ) {
        this.setState({
          programCode: this.props.location.state.programCode,
          storeCode: this.props.location.state.storeCode,
          tenantID: this.props.location.state.tenantID,
          AgentID: this.props.location.state.agentId,
          UserName: this.props.location.state.UserName,
          chatId: this.props.location.state.chatId,
        });
        this.props.location.state.chatId = 0;
        this.props.location.state.isNewChat = false;
      } else {
        this.setState({
          programCode: this.props.location.state.programCode,
          storeCode: this.props.location.state.storeCode,
          tenantID: this.props.location.state.tenantID,
          AgentID: this.props.location.state.agentId,
          UserName: this.props.location.state.UserName,
        });
      }

      this.handleCreateSocketConnection(
        this.props.location.state.programCode,
        this.props.location.state.storeCode
      );
      this.handleGetStoreAgentDetailsById(this.props.location.state.agentId);
    }
    window.addEventListener("resize", this.handleCheckView.bind(this));
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    this.handleCheckView();
    setTimeout(() => {
      this.handleGetNewChat();
      this.handleGetOngoingChat();
      this.handleGetChatNotificationCount();
    }, 900);
    this.handleGetAgentList();
    var checkChatSession = window.localStorage.getItem("ChatSession") || "";
    var checkChatSoundNotiSetting =
      window.localStorage.getItem("ChatSoundNotiSetting") || "";

    if (
      checkChatSoundNotiSetting === "" ||
      checkChatSoundNotiSetting === null
    ) {
      this.handleGetChatSoundNotiSetting();
    } else {
      var responseData = JSON.parse(
        window.localStorage.getItem("ChatSoundNotiSetting")
      );
      this.setState({
        newChatSoundVolume: responseData.newChatSoundVolume || 0,
        newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
        isNotiNewChat: responseData.isNotiNewChat || false,
        isNotiNewMessage: responseData.isNotiNewMessage || false,
        notificationTime: responseData.notificationTime,
        tenantID: responseData.tenantID,
      });
    }

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
        cardSearchStoreCode: data.cardSearchStoreCode,
        // isgrammarlyCheck: data.grammarlyCheck,
      });
      if (data.customerProfile) {
        this.setState({ ProfileProductTab: 0 });
      } else {
        this.setState({ ProfileProductTab: 1 });
      }
    }
    var cardConfigData = window.localStorage.getItem("cardConfigData") || "";

    if (cardConfigData !== "" || cardConfigData !== null) {
      this.handleGetCardConfiguration();
    } else {
      this.setState({ cardConfigData });
    }
    setTimeout(() => {
      if (this.state.isMobileView) {
        this.handleChatNotificationDetails();
      }
    }, 1000);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleCheckView.bind(this));

    // socket.disconnect();
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
  //handleGet Ongoing Chat
  async handleGetOngoingChat(event) {
    let self = this;

    // socket.send("hi");
    var search = "";
    if (event !== undefined) {
      search = event.target.value;
      this.setState({
        searchChat: event.target.value,
        noRecommendedFound: "",
      });
    } else {
      search = this.state.searchChat;
    }
    var objOngoing = {
      userMaster_ID: this.state.AgentID,
      tenant_ID: this.state.tenantID,
      search: search || "",
      StoreMgr_ID: this.state.sAgentId,
      ProgramCode: this.state.programCode,
      StoreCode: this.state.storeCode,
      ChatId: this.state.chatId,
    };

    socket.emit("CallOngoingSP", objOngoing);

    // socket.on("connect", () => {
    socket.once(
      "CallOngoingSP" +
        this.state.storeCode.toLowerCase() +
        this.state.programCode.toLowerCase(),
      function(data) {
        var ongoingChatsData = [];
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            var objData = {};
            objData.chatID = data[i].CurrentChatID;
            objData.storeID = data[i].StoreID;
            objData.programCode = data[i].ProgramCode;
            objData.customerID = data[i].CustomerID;
            objData.customerName = data[i].CustomerName;
            objData.mobileNo = data[i].CustomerNumber;
            objData.messageCount = data[i].NewMessageCount;
            objData.timeAgo = data[i].TimeAgo;
            objData.createdDate = data[i].CreatedDate;
            objData.storeManagerId = data[i].StoreManagerId;
            objData.storeManagerName = data[i].StoreManagerName;
            if (data[i].IsCustEndChat === 0) {
              objData.isCustEndChat = false;
            } else {
              objData.isCustEndChat = true;
            }
            if (data[i].IsCustTimeout === 0) {
              objData.isCustTimeout = false;
            } else {
              objData.isCustTimeout = true;
            }
            objData.sourceName = data[i].SourceName;
            objData.chatSourceID = data[i].SourceID;
            objData.sourceAbbr = data[i].SourceAbbr;
            objData.sourceIconUrl = data[i].SourceIconUrl;
            ongoingChatsData.push(objData);
          }
        }

        if (ongoingChatsData.length > 0) {
          //         //for getting new ongoing data

          var chatData = ongoingChatsData.filter(
            (x) => x.chatID === self.state.chatId
          );
          var ustEndChat = ongoingChatsData.filter(
            (x) => x.chatID === self.state.chatId
          );

          var isCustTimeout = false;
          if (ustEndChat.length > 0) {
            isCustTimeout = ustEndChat[0].isCustTimeout;
          }

          if (chatData.length == 0) {
            self.setState({
              customerName: "",
              messageData: [],
              isMainLoader: false,
              isPinClick: false,
              onHoverName: false,
              chatId: 0,
              isCheckSuggetion: false,
            });
          } else {
            self.handleOngoingChatClick(
              chatData[0].chatID,
              chatData[0].customerName,
              chatData[0].messageCount,
              chatData[0].mobileNo,
              chatData[0].customerID,
              chatData[0].programCode,
              chatData[0].storeID,
              chatData[0].isCustEndChat,
              chatData[0].storeManagerId,
              chatData[0].initialColor,
              chatData[0].isCustTimeout,
              chatData[0].sourceAbbr
            );
          }
          self.setState({
            isCustTimeout,
            ongoingChatsData,
            isEmptyArray: false,
            // tmpOngoingChatsData: ongoingChatsData,
          });

          for (let i = 0; i < ongoingChatsData.length; i++) {
            ongoingChatsData[i].initialColor =
              self.state.colorCode[Math.floor(Math.random() * 6)];
          }
          //for reiniate
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
              chatData[0].customerName,
              chatData[0].messageCount,
              chatData[0].mobileNo,
              chatData[0].customerID,
              chatData[0].programCode,
              chatData[0].storeID,
              chatData[0].isCustEndChat,
              chatData[0].storeManagerId,
              chatData[0].initialColor,
              chatData[0].isCustTimeout,
              chatData[0].sourceAbbr
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
            tmpOngoingChatsData: [],
          });
        }
      }
    );
  }
  //handle clear chat search
  handleClearChatSearch = async () => {
    await this.setState({ searchChat: "", showSearch: false });
    this.handleGetOngoingChat();
  };
  //handle Get New Chat
  async handleGetNewChat(mobileNo, msgData) {
    this.setState({
      isMainLoader: true,
    });
    socket.send("hi");
    let self = this;
    var objNewChat = {
      userMaster_ID: this.state.AgentID,
      tenant_ID: this.state.tenantID,
      ProgramCode: this.state.programCode,
      StoreCode: this.state.storeCode,
    };
    socket.emit("CallNewChatSP", objNewChat);
    // socket.on("connect", () => {
    socket.once(
      "CallNewChatSP" +
        this.state.storeCode.toLowerCase() +
        this.state.programCode.toLowerCase(),
      function(data) {
        var newChatsData = [];
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            var objData = {};
            objData.chatID = data[i].CurrentChatID;
            objData.storeID = data[i].StoreID;
            objData.programCode = data[i].ProgramCode;
            objData.customerID = data[i].CustomerID;
            objData.customerName = data[i].CustomerName;
            objData.mobileNo = data[i].CustomerNumber;
            objData.messageCount = data[i].NewMessageCount;
            objData.timeAgo = data[i].TimeAgo;
            objData.createdDate = data[i].CreatedDate;
            objData.storeManagerId = data[i].StoreManagerId;
            objData.storeManagerName = data[i].StoreManagerName;
            if (data[i].IsCustEndChat === 0) {
              objData.isCustEndChat = false;
            } else {
              objData.isCustEndChat = true;
            }
            if (data[i].IsCustTimeout === 0) {
              objData.isCustTimeout = false;
            } else {
              objData.isCustTimeout = true;
            }
            objData.sourceName = data[i].SourceName;
            objData.chatSourceID = data[i].SourceID;
            objData.sourceAbbr = data[i].SourceAbbr;
            objData.sourceIconUrl = data[i].SourceIconUrl;
            newChatsData.push(objData);
          }
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
            const Sound1Play = new Audio();
            Sound1Play.src = JSON.parse(
              localStorage.getItem("newChatSoundFile")
            );
            Sound1Play.volume =
              Math.round(self.state.newChatSoundVolume / 10) / 10;
            Sound1Play.play();
            var chatData = newChatsData.filter((x) => x.mobileNo === mobileNo);
            if (chatData.length > 0) {
              notification.open({
                key: chatData[0].chatID,
                duration: self.state.notificationTime,
                placement: "bottomRight",
                className: "hide-message-title",
                description: (
                  <ChatNotificationComponent
                    msgData={msgData}
                    chatData={chatData}
                    handleChatNotificationClick={(e) =>
                      self.handleNewChatNotification(e)
                    }
                    notitficationType={"NewChat"}
                  />
                ),
              });
            }
          }
        } else {
          self.setState({ newChatsData: [], isMainLoader: false });
        }
      }
    );
  }
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
  //handle update customer chat status
  handleUpdateCustomerChatStatus(
    id,
    storeManagerId,
    StoreID,
    name,
    mobileNo,
    customerId,
    ProgramCode,
    sourceType
  ) {
    let self = this;
    if (this.state.isMobileView) {
      document.getElementById("store-footre-main").style.display = "none";
      document.getElementById("mobileHederIcon").style.display = "none";
      document.getElementById("chatBackIcon").style.display = "inline-block";
    }
    this.setState({
      chatTypeCollpase: [2],
      pageNumberCurrentChat: 1,
      sourceType,
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
          self.setState({ chatId: id });
          self.handleGetNewChat();
          self.handleGetOngoingChat();
          self.handleGetChatMessagesList(id);
          self.handleGetChatNotificationCount();
          var objNewChat = {
            userMaster_ID: self.state.AgentID,
            tenant_ID: self.state.tenantID,
            ProgramCode: self.state.programCode,
            ChatId: id,
          };
          socket.emit("CallSetCurrentChatSP", objNewChat);
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false });
        console.log(response, "---handleUpdateCustomerChatStatus");
      });
  }
  //handle get chat messgae by chat id
  handleGetChatMessagesList(id, RecentChat, isScrollTop) {
    let self = this;
    var forRecentChat = 0;
    var urlType = "";
    var objParam = {};

    this.setState({ isCallChatMessgaeApi: true });
    if (RecentChat) {
      forRecentChat = 1;
      var urlType = config.apiUrl + "/CustomerChat/getChatMessagesList";
      objParam.chatID = id;
      objParam.ForRecentChat = forRecentChat;
    } else {
      objParam.chatID = id;
      objParam.ForRecentChat = forRecentChat;
      objParam.PageNo = isScrollTop ? this.state.pageNumberCurrentChat : 1;
      urlType = config.apiUrl + "/CustomerChat/getChatMessagesListNew";
    }

    this.setState({ isMainLoader: true });

    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/getChatMessagesList",
      url: urlType,
      headers: authHeader(),
      params: objParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var messageData = RecentChat
          ? response.data.responseData
          : response.data.responseData.chatMessages;
        var recentChatCount = 0;

        if (RecentChat) {
          recentChatCount = self.state.pastChatCount;
        } else {
          recentChatCount = response.data.responseData.recentChatCount;
        }
        self.setState({
          isMainLoader: false,
          isCallChatMessgaeApi: false,
          pastChatCount: recentChatCount || 0,
        });
        if (message === "Success" && messageData) {
          if (self.state.showHistoricalChat) {
            self.setState({
              messageHistoryChatData: messageData,
              isMainLoader: false,
            });
          } else {
            var newMessageData = [];
            if (messageData.length > 0) {
              for (let i = messageData.length - 1; i >= 0; i--) {
                newMessageData.push(messageData[i]);
              }
            }

            if (self.state.messageData.length > 0 && isScrollTop) {
              for (let i = 0; i < self.state.messageData.length; i++) {
                newMessageData.push(self.state.messageData[i]);
              }
            }

            self.setState({
              isScrollMessage: true,
              // ...messageData,
              messageData: newMessageData,
              isScroll: isScrollTop === true ? false : true,
              isMainLoader: false,
              pastChatCount: recentChatCount,
              pageNumberCurrentChat: self.state.pageNumberCurrentChat + 1,
              AttachementFiles: [],
              message: "",
            });
          }
        } else {
          self.setState({
            isScrollMessage: false,
            messageData:
              self.state.messageData.length > 0 ? self.state.messageData : [],
            isMainLoader: false,
          });
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false, isCallChatMessgaeApi: false });
        console.log(response, "---handleGetChatMessagesList");
      });
  }
  //handle get chat notification count
  async handleGetChatNotificationCount() {
    let self = this;
    var objNotiCount = {
      userMaster_ID: this.state.AgentID,
      tenant_ID: this.state.tenantID,
      ProgramCode: this.state.programCode,
      StoreCode: this.state.storeCode,
    };

    socket.emit("CallChatNotificationCount", objNotiCount);

    socket.once(
      "CallChatNotificationCount" +
        this.state.storeCode.toLowerCase() +
        this.state.programCode.toLowerCase(),
      function(data) {
        // console.log(data, "---CallChatNotificationCount");
        if (data) {
          self.setState({
            chatMessageCount: data[0].TotalUnreadChatCount,
          });
          if (document.getElementById("chatMessageCount")) {
            document.getElementById("chatMessageCount").innerText =
              data[0].TotalUnreadChatCount;
          }
          if (document.getElementById("chatMessageCountMobile")) {
            document.getElementById("chatMessageCountMobile").innerText =
              data[0].TotalUnreadChatCount;
          }
        } else {
          self.setState({
            chatMessageCount: data[0].TotalUnreadChatCount,
          });
          if (document.getElementById("chatMessageCount")) {
            document.getElementById("chatMessageCount").innerText =
              data[0].TotalUnreadChatCount;
          }
          if (document.getElementById("chatMessageCountMobile")) {
            document.getElementById("chatMessageCountMobile").innerText =
              data[0].TotalUnreadChatCount;
          }
        }
      }
    );
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
    this.setState({
      isCardSearch: true,
      isCardSend: false,
      isSelectedCard: false,
      selectedCard: 0,
    });

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
          if (self.state.isMobileView) {
            self.setState({ cardModal: true });
          }
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
  //handle send message to customer
  handleSendMessageToCustomer(
    Message,
    messagewhatsAppContent,
    imageURL,
    appointmentSendWB
  ) {
    let self = this;
    if (this.state.AttachementFiles.length === 0) {
      if (Message === "" || Message == null) {
        return false;
      }
    }

    var dataObj = {};

    if (this.state.sourceType === "cb") {
      if (this.state.AttachementFiles.length === 0) {
        dataObj = {
          TenantID: this.state.tenantID,
          chatId: this.state.chatId,
          StoreMgr_ID: this.state.storeManagerId,
          userMaster_ID: this.state.AgentID,
          ProgramCode: this.state.programCode,
          StoreCode: this.state.storeCode,
          Source: this.state.sourceType,
          MobileNo: this.state.mobileNo,
          MessageData: Message,
          WhatsAppMessage: messagewhatsAppContent || "",
          ImageURL: imageURL || "",
          HeaderToken: authHeader()["X-Authorized-Token"],
          isAttachment: false,
          attachmentData: null,
        };

        socket.emit("SendBellReplyV2", dataObj);
      } else {
        if (this.state.AttachementFiles.length > 0) {
          this.handleSendAttachmentFileOnChatAPI();
        }
      }
    } else {
      if (this.state.AttachementFiles.length === 0) {
        dataObj = {
          isFromAgent: true,
          chatId: this.state.chatId,
          StoreMgr_ID: this.state.sAgentId,
          userMaster_ID: this.state.AgentID,
          ProgramCode: this.state.programCode,
          StoreCode: this.state.storeCode,
          Source: this.state.sourceType,
          MobileNo: this.state.mobileNo,
          MessageData: Message,
          WhatsAppMessage: messagewhatsAppContent || "",
          ImageURL: imageURL || "",
          isCard: false,
          cardItem: null,
          isAppointment: this.state.activeTab === 4 ? true : false,
          appointmentData: appointmentSendWB,
          isAttachment: false,
          attachmentData: null,
          sentAt:
            new Date().getMonth() +
            1 +
            "/" +
            new Date().getDate() +
            "/" +
            new Date().getFullYear() +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds(),
          HeaderToken: authHeader()["X-Authorized-Token"],
          isSuccess: true,
          message: "OK",
          appVersion: "2.0",
        };
        socket.emit("SendBellReplyV2", dataObj); ///web bot

        socket.once("SendToWebbotReplyV2Call", function(data) {
          if (data === true) {
            setTimeout(() => {
              self.handleGetChatMessagesList(self.state.chatId);
            }, 1000);
            self.setState({
              isSendRecomended: false,
              message: "",
              // messageSuggestionData: [],
              // messageSuggestionTagsData: [],
              // selectedTags: 0,
              cardModal: false,
              remainingCount: self.state.tempRemainingCount,
              suggestionModal: false,
              suggestionModalMob: false,
              suggestionTagModal: false,
              isMainLoader: false,
            });
          }
        });
      } else {
        this.handleSendAttachmentFileOnChatAPI();
      }
    }

    if (this.state.sourceType === "cb" || this.state.sourceType === "wb") {
      if (this.state.AttachementFiles.length === 0) {
        var messageData = self.state.messageData;
        var objMessgage = {};
        objMessgage.isBotReply = false;
        objMessgage.chatDate = "Today";
        objMessgage.chatTime = new Date().toLocaleTimeString();
        objMessgage.byCustomer = false;
        objMessgage.message = Message;
        messageData.push(objMessgage);
        self.setState({
          isScroll: true,
          messageData,
          isSendRecomended: false,
          message: "",
          // messageSuggestionData: [],
          // messageSuggestionTagsData: [],
          // selectedTags: 0,
          chkSuggestion: 0,
          cardModal: false,
          remainingCount: self.state.tempRemainingCount,
          suggestionModal: false,
          suggestionModalMob: false,
          suggestionTagModal: false,
          isMainLoader: false,
        });
      }
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
  //handle on going chat click
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
    selectedColor,
    isCustTimeout,
    sourceType
  ) => {
    if (this.state.isMobileView) {
      document.getElementById("store-footre-main").style.display = "none";
      document.getElementById("mobileHederIcon").style.display = "none";
      document.getElementById("chatBackIcon").style.display = "inline-block";
    }
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
    if (this.state.customerMobileNo !== mobileNo) {
      window.localStorage.setItem("LastTransaction", "");
      window.localStorage.setItem("IsLastTransaction", "");
      window.localStorage.setItem("CustomerInsights", "");
      window.localStorage.setItem("IsCustomerInsights", "");
      window.localStorage.setItem("CustomerProfile", "");
      window.localStorage.setItem("IsCustomerProfile", "");
      window.localStorage.setItem("OrderDetails", "");
      window.localStorage.setItem("IsOrderDetails", "");
    }

    if (count > 0) {
      this.setState({ chatMessageCount: this.state.chatMessageCount - 1 });
    }

    if (this.state.chatId !== id) {
      var objNewChat = {
        userMaster_ID: this.state.AgentID,
        tenant_ID: this.state.tenantID,
        ProgramCode: this.state.programCode,
        ChatId: id,
      };
      socket.emit("CallSetCurrentChatSP", objNewChat);
    }
    if (this.state.messageData.length == 0 || this.state.chatId != id) {
      if (this.state.chatId === id) {
        this.setState({
          // Suggested_Words: {},
          // selectedSuggested_Words: {},
          // // Profane_Words: [],
          // replaceMessageVal: "",
          // grammarlyModal: false,
          isScroll: true,
          attachmentSendCount: 0,
          customerMobileNo: "",
          customerNameProfile: "",
          isShutterOpen: false,
          isCheckSuggetion: false,
          isSelectedCard: false,
          isCardSend: false,
          AttachementFiles: [],
          activeCollpse: "",
          isScrollMessage: false,
          sourceType,
          isCustTimeout,
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
          chkSuggestion: 0,
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
          pageNumberCurrentChat: 1,
        });
        setTimeout(() => {
          this.handleGetChatMessagesList(id);
        }, 10);
        // this.handleGetAgentRecentChat(customerId);

        //this.handleGetChatCustomerProfile(customerId);
      } else {
        this.setState({
          // Suggested_Words: {},
          // selectedSuggested_Words: {},
          // Profane_Words: [],
          replaceMessageVal: "",
          // grammarlyModal: false,
          isScroll: true,
          attachmentSendCount: 0,
          customerMobileNo: "",
          customerNameProfile: "",
          isShutterOpen: false,
          isCheckSuggetion: false,
          isSelectedCard: false,
          isCardSend: false,
          AttachementFiles: [],
          activeCollpse: "",
          isScrollMessage: false,
          sourceType,
          isCustTimeout,
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
          chkSuggestion: 0,
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
          pageNumberCurrentChat: 1,
        });
        if (count === 0) {
          setTimeout(() => {
            this.handleGetChatMessagesList(id);
          }, 10);
        } else {
          this.handleMakeAsReadOnGoingChat(id);
        }
        if (this.state.isMobileView) {
          this.handleGetChatCustomerProfile(mobileNo);
        }
      }
    } else {
      this.setState({
        // Suggested_Words: {},
        // selectedSuggested_Words: {},
        // Profane_Words: [],
        replaceMessageVal: "",
        // grammarlyModal: false,
        isScroll: true,
        attachmentSendCount: 0,
        // customerMobileNo:"",
        // customerNameProfile:"",
        isShutterOpen: false,
        isCheckSuggetion: false,
        isSelectedCard: false,
        isCardSend: false,
        AttachementFiles: [],
        activeCollpse: "",
        isScrollMessage: false,
        isCustTimeout,
        sourceType,
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
        chkSuggestion: 0,
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
        pageNumberCurrentChat: 1,
      });
      setTimeout(() => {
        this.handleGetChatMessagesList(id);
      }, 10);
    }

    this.setState({ isHistoricalChat: false, isDownbtn: true });
    if (this.state.isPinClick) {
      this.handleGetChatCustomerProfile(mobileNo);
    }
  };
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
      // Suggested_Words: {},
      // selectedSuggested_Words: {},
      // Profane_Words: [],
      replaceMessageVal: "",
      // grammarlyModal: false,
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
    if (window.localStorage.getItem("AgentList")) {
      var agentData = JSON.parse(window.localStorage.getItem("AgentList"));
      this.setState({ agentData });
    } else {
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/GetAgentList",
        headers: authHeader(),
      })
        .then(function(response) {
          var message = response.data.message;
          var agentData = response.data.responseData;
          if (message === "Success" && agentData) {
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
  }
  //handle change main tabs

  handleMainTabChange(e) {
    this.setState({ mainTabSelect: e });
    if (e === 2) {
      if (this.state.isMobileView) {
        this.setState({
          showHistoricalChat: false,
          rowChatId: 0,
        });
      } else {
        this.setState({
          messageData: [],
          showHistoricalChat: false,
          rowChatId: 0,
        });
      }
    } else {
      if (this.state.isMobileView) {
        this.setState({
          showHistoricalChat: false,
          rowChatId: 0,
        });
      } else {
        this.setState({
          messageData: [],
          showHistoricalChat: false,
          rowChatId: 0,
        });
      }

      if (!this.state.isMobileView) {
        this.handleGetChatMessagesList(this.state.chatId);
      }
    }
    this.handleGetAgentRecentChat(this.state.customerId);
  }
  //handle change agent dropdown
  handleChangeAgentDropdown(e) {
    this.setState({ sAgentId: e });
    setTimeout(() => {
      this.handleGetOngoingChat();
    }, 10);
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
  ///handle create socket connection
  handleCreateSocketConnection(programCode, storeCode) {
    let self = this;

    // socket.on("connect", () => {
    socket.send("hi");
    if (programCode !== "" && programCode !== "") {
      socket.on(storeCode.toLowerCase() + programCode.toLowerCase(), function(
        data
      ) {
        if (self.state.storeCode !== "" && data[5] !== "" && data[5]) {
          if (self.state.storeCode.toLowerCase() === data[5].toLowerCase()) {
            var isMobileNoExist = self.state.ongoingChatsData.filter(
              (x) => x.mobileNo === data[3] && x.isCustEndChat === false
            );

            if (isMobileNoExist.length > 0) {
              if (self.state.mobileNo === data[3]) {
                //for current chat message
                self.setState({ sourceType: data[7] });
                var chatId = 0;
                const Sound1Play = new Audio();
                Sound1Play.src = JSON.parse(
                  localStorage.getItem("newMessageSoundFile")
                );
                Sound1Play.volume =
                  Math.round(self.state.newMessageSoundVolume / 10) / 10;
                Sound1Play.play();
                var chatData = self.state.ongoingChatsData.filter(
                  (x) => x.mobileNo === data[3]
                );
                // if (!self.state.chatModal) {

                var messageData = self.state.messageData;
                var objMessgage = {};
                objMessgage.isBotReply = false;
                objMessgage.chatDate = "Today";
                objMessgage.chatTime = new Date().toLocaleTimeString();
                objMessgage.byCustomer = true;
                objMessgage.message = data[0].toString();
                objMessgage.customerName = chatData[0].customerName;
                messageData.push(objMessgage);
                self.setState({
                  messageData,
                  isScroll: true,
                });
                notification.open({
                  key: chatData[0].chatID,
                  duration: self.state.notificationTime,
                  placement: "bottomRight",
                  // message: "Notification Title",
                  className: "hide-message-title",
                  description: (
                    <ChatNotificationComponent
                      msgData={data[0]}
                      chatData={chatData}
                      handleChatNotificationClick={(e) =>
                        self.handleNotificationClick(e, true)
                      }
                      notitficationType={""}
                    />
                  ),
                });
                // }
                // setTimeout(() => {
                //   self.handleGetChatMessagesList(self.state.chatId);
                // }, 3500);

                if (self.state.ongoingChatsData.length > 0) {
                  chatId = self.state.ongoingChatsData.filter(
                    (x) => x.mobileNo === self.state.mobileNo
                  )[0].chatID;
                }
                if (data[6]) {
                  self.handleEndCustomerChat(chatId, data[0]);
                } else {
                  setTimeout(() => {
                    self.handleGetOngoingChat();
                    // self.handleGetNewChat();
                  }, 4500);
                }
              } else {
                const Sound1Play = new Audio();
                Sound1Play.src = JSON.parse(
                  localStorage.getItem("newMessageSoundFile")
                );
                Sound1Play.volume =
                  Math.round(self.state.newMessageSoundVolume / 10) / 10;
                Sound1Play.play();

                if (self.state.isNotiNewMessage) {
                  var chatData = self.state.ongoingChatsData.filter(
                    (x) => x.mobileNo === data[3]
                  );
                  notification.open({
                    key: chatData[0].chatID,
                    duration: self.state.notificationTime,
                    placement: "bottomRight",
                    // message: "Notification Title",
                    className: "hide-message-title",
                    description: (
                      <ChatNotificationComponent
                        msgData={data[0]}
                        chatData={chatData}
                        handleChatNotificationClick={(e) =>
                          self.handleNotificationClick(e)
                        }
                        notitficationType={""}
                      />
                    ),
                  });
                }

                setTimeout(() => {
                  self.handleGetOngoingChat();
                  self.handleGetChatNotificationCount();
                }, 3000);
              }
            } else {
              //new chat message
              setTimeout(() => {
                self.handleGetChatNotificationCount();
                self.handleGetNewChat(data[3], data[0]);
              }, 5000);
            }
          }
        }
      });
    }
    // });
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
            self.handleGetChatNotificationCount();
            self.handleGetOngoingChat();
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
            cardSearchStoreCode: data.cardSearchStoreCode,
            // isgrammarlyCheck: data.grammarlyCheck,
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
      if (window.location.pathname !== "/store/Chatbot") {
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
      }
      this.handleOngoingChatClick(
        chatData[0].chatID,
        chatData[0].customerName,
        chatData[0].messageCount,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].storeID,
        chatData[0].isCustEndChat,
        chatData[0].storeManagerId,
        chatData[0].initialColor,
        chatData[0].isCustTimeout,
        chatData[0].sourceAbbr
      );
    } else if (window.location.pathname !== "/store/Chatbot") {
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

    if (window.location.pathname !== "/store/Chatbot") {
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
      this.handleUpdateCustomerChatStatus(
        chatData[0].chatID,
        chatData[0].storeManagerId,
        chatData[0].storeID,
        chatData[0].customerName,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].sourceAbbr
      );
    } else {
      this.handleUpdateCustomerChatStatus(
        chatData[0].chatID,
        chatData[0].storeManagerId,
        chatData[0].storeID,
        chatData[0].customerName,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].sourceAbbr
      );
    }
    this.setState({
      newTicketChatId: 0,
    });
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

  handleSendProductsOnChat = (
    isCard,
    messagecontent,
    WhatsAppMessage,
    imageURL
  ) => {
    var selectedProduct = [];
    if (isCard) {
      selectedProduct = this.state.searchCardData.filter(
        (x) => x.itemID === this.state.selectedCard
      );
      selectedProduct.forEach((element) => {
        element.IsCard = true;
        element.CardHtmlContent = messagecontent;
      });
      var messageData = this.state.messageData;
      var objMessgage = {};
      objMessgage.isBotReply = false;
      objMessgage.chatDate = "Today";
      objMessgage.chatTime = new Date().toLocaleTimeString();
      objMessgage.byCustomer = false;
      objMessgage.message = messagecontent;
      messageData.push(objMessgage);
      if (!this.state.isMobileView) {
        this.setState({ cardModal: false });
      }
      this.setState({
        isScroll: true,
        messageData,
        isSendRecomended: false,
        message: "",
        messageSuggestionData: [],
        messageSuggestionTagsData: [],
        selectedTags: 0,

        remainingCount: this.state.tempRemainingCount,
        suggestionModal: false,
        suggestionModalMob: false,
        isMainLoader: false,
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
    this.setState({ selectedCard: 0 });
    let self = this;

    if (this.state.sourceType === "wb" && isCard) {
      socket.emit("SendBellReplyV2", {
        isFromAgent: true,
        ChatID: this.state.chatId,
        ProgramCode: this.state.programCode,
        StoreCode: this.state.storeCode,
        Source: this.state.sourceType,
        MobileNo: this.state.mobileNo,
        MessageData: "",
        ImageURL: "",
        isCard: true,
        cardItem: selectedProduct,
        sentAt:
          new Date().getMonth() +
          1 +
          "/" +
          new Date().getDate() +
          "/" +
          new Date().getFullYear() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds(),
        HeaderToken: authHeader()["X-Authorized-Token"],
        isSuccess: true,
        message: "OK",
        appVersion: "2.0",
      });
    }

    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/SendProductsOnChat",
      url: config.apiUrl + "/CustomerChat/SendProductsOnChatNew",
      headers: authHeader(),
      data: {
        ChatID: this.state.chatId,
        Products: selectedProduct,
        CustomerID: this.state.customerId,
        CustomerMobile: this.state.mobileNo,
        Source: this.state.sourceType,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          if (!isCard) {
            self.setState({
              selectedCard: 0,
              mobileWishProcessMdl: false,
              mobileShopBagProcessMdl: false,
            });
            self.handleGetChatMessagesList(self.state.chatId);
          } else {
            self.setState({
              isCardSend: true,
              isMainLoader: false,
              mobileWishProcessMdl: false,
              mobileShopBagProcessMdl: false,
            });
          }
        } else {
          if (isCard) {
            self.setState({
              isCardSend: true,
              isMainLoader: false,
              mobileWishProcessMdl: false,
              mobileShopBagProcessMdl: false,
            });
            NotificationManager.error("Message Not Send Successfully.");
          }
        }
      })
      .catch((response) => {
        self.setState({ isMainLoader: false });
        console.log(response, "----handleSendProductsOnChat");
      });
    // }
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
    this.setState({
      isCardSearch: true,
      isCardSend: false,
      isSelectedCard: false,
      selectedCard: 0,
    });

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
          if (self.state.isMobileView) {
            self.setState({ cardModal: true });
          }
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

  handleShowSearch = () => {
    if (this.state.showSearch) {
      this.setState({ showSearch: false, searchChat: "" });
      setTimeout(() => {
        this.handleGetOngoingChat();
      }, 200);
    } else {
      this.setState({ showSearch: true });
    }
  };
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
  handleSendAttachmentFileOnChatAPI = () => {
    var self = this;
    if (this.state.isAttachmentMainLoader) {
      return false;
    }
    for (let i = 0; i < this.state.AttachementFiles.length; i++) {
      this.setState({ isAttachmentMainLoader: true });
      var attachmentMessage = "";
      if (this.state.message) {
        attachmentMessage = this.state.message;
      } else {
        attachmentMessage = this.state.suggestionText;
      }
      var formData = new FormData();
      formData.append("Attachment", this.state.AttachementFiles[i]);
      formData.append("AttachmentMessage", attachmentMessage);
      formData.append("ChatSource", this.state.sourceType);
      formData.append("ChatID", this.state.chatId);
      formData.append("CustomerMobileNo", this.state.mobileNo);
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/SendAttachmentOnChat",
        headers: authHeader(),
        data: formData,
      })
        .then(function(response) {
          var msg = response.data.message;

          if (msg === "Success" && response.data.responseData) {
            var attachmentSendCount = self.state.attachmentSendCount + 1;
            var messageData = self.state.messageData;
            var objMessgage = {};
            objMessgage.isBotReply = false;
            objMessgage.chatDate = "Today";
            objMessgage.chatTime = new Date().toLocaleTimeString();
            objMessgage.byCustomer = false;
            objMessgage.message = attachmentMessage;
            objMessgage.isAttachment = true;
            objMessgage.attachment = response.data.responseData;
            messageData.push(objMessgage);
            self.setState({
              attachmentSendCount,
              messageData,
              isScroll: true,
            });

            if (self.state.sourceType === "wb") {
              var ObjDoc = {};
              var dataObj = {};
              ObjDoc.attachmentUrl = response.data.responseData;
              ObjDoc.attachmentType = self.state.AttachementFiles[i].name.match(
                /(\.pdf|\.doc|\.docx)$/
              )
                ? "Document"
                : "Image";
              ObjDoc.Text = attachmentMessage;
              dataObj = {
                isFromAgent: true,
                chatId: self.state.chatId,
                StoreMgr_ID: self.state.sAgentId,
                userMaster_ID: self.state.AgentID,
                ProgramCode: self.state.programCode,
                StoreCode: self.state.storeCode,
                Source: self.state.sourceType,
                MobileNo: self.state.mobileNo,
                MessageData: attachmentMessage,
                isCard: false,
                cardItem: null,
                isAppointment: false,
                appointmentData: null,
                isAttachment:
                  self.state.AttachementFiles.length > 0 ? true : false,
                attachmentData: ObjDoc,
                sentAt:
                  new Date().getMonth() +
                  1 +
                  "/" +
                  new Date().getDate() +
                  "/" +
                  new Date().getFullYear() +
                  " " +
                  new Date().getHours() +
                  ":" +
                  new Date().getMinutes() +
                  ":" +
                  new Date().getSeconds(),
                HeaderToken: authHeader()["X-Authorized-Token"],
                isSuccess: true,
                message: "OK",
                appVersion: "2.0",
              };
              socket.emit("SendBellReplyV2", dataObj); ///web bot
            }
            if (attachmentSendCount === self.state.AttachementFiles.length) {
              self.setState({
                isAttachmentMainLoader: false,
                AttachementFiles: [],
                message: "",
                suggestionText: "",
                attachmentSendCount: 0,
              });
            } else {
              self.setState({
                isAttachmentMainLoader: true,
              });
            }
          } else {
            var attachmentSendCount = self.state.attachmentSendCount + 1;
            self.setState({
              isAttachmentMainLoader: false,
              attachmentSendCount,
            });
            NotificationManager.error("Attachment sending failed.");
          }
        })
        .catch((response) => {
          self.setState({ isAttachmentMainLoader: false });
          console.log(response);
        });
    }
  };

  handleHideSuggetionWeb = () => {
    this.setState({
      isCheckSuggetion: false,
      messageSuggestionData: [],
      messageSuggestionTagsData: [],
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
  //handle button down click
  handleDownButtonClick() {
    this.setState({ isDownbtn: !this.state.isDownbtn });
  }
  //handle scroll right
  handleScrollRight(num) {
    document.getElementById("schedule-btn-cntr" + num).scrollLeft += 20;
  }
  //handle scroll left
  handleScrollLeft(num) {
    document.getElementById("schedule-btn-cntr" + num).scrollLeft -= 20;
  }
  handleCardModalClose = () => {
    this.setState({ cardModal: false });
  };
  handleBackClickMobile = () => {
    this.setState({ customerName: "", chatId: 0 });
  };
  handleChatNotificationDetails() {
    let self = this;
    var objNotificationData = {
      userMaster_ID: this.state.AgentID,
      tenant_ID: this.state.tenantID,
      ProgramCode: this.state.programCode,
      PageNo: this.state.NotificationPage,
      StoreCode: this.state.storeCode,
    };

    socket.emit("CallChatNotificationDetialsSP", objNotificationData);
    socket.once(
      "CallChatNotificationDetialsSP" +
        this.state.storeCode.toLowerCase() +
        this.state.programCode.toLowerCase(),
      function(data) {
        if (data[0].length > 0) {
          document.getElementById("chatNotificationMomCount").innerText =
            data[1][0].UnReadNotiCount;
        } else {
          document.getElementById("chatNotificationMomCount").innerText = 0;
        }
      }
    );
  }
  handleChatCollapsePanelChange = (e) => {
    if (e.length > 0) {
      var chatTypeCollpase = e[e.length - 1];
      if (chatTypeCollpase == 1) {
        if (this.state.newChatsData.length > 0) {
          this.state.chatTypeCollpase[0] = chatTypeCollpase;
          this.setState({
            chatTypeCollpase: this.state.chatTypeCollpase,
          });
        }
      } else {
        this.state.chatTypeCollpase[0] = chatTypeCollpase;
        this.setState({
          chatTypeCollpase: this.state.chatTypeCollpase,
        });
      }
    } else {
      this.state.chatTypeCollpase[0] = 2;
      this.setState({
        chatTypeCollpase: this.state.chatTypeCollpase,
      });
    }
  };
  handleBackToCurrentChat = () => {
    this.setState({
      mainTabSelect: 1,
      showHistoricalChat: false,
      rowChatId: 0,
    });
  };

  handleAutoCorrection = () => {
    if (
      // this.state.isgrammarlyCheck &&
      this.state.storeAgentDetail.length > 0 
      // this.state.storeAgentDetail[0].grammarlyCheck === 1
    ) {
      if (this.state.message.length > 0) {
        var inputParam = {};
        inputParam.programCode = this.state.programCode;
        inputParam.text = this.state.message;
        inputParam.storeCode = this.state.storeCode;
        socket.emit("CallAutoCorrectionWrapper", inputParam);

        // this.setState({ selectedSuggested_Words: {} });
        let self = this;
        socket.once(
          "CallAutoCorrectionWrapper" +
            this.state.storeCode.toLowerCase() +
            this.state.programCode.toLowerCase(),
          function(data) {
            if (data) {
              // self.setState({ Profane_Words: data.Profane_Words });
              // self.setState({ Suggested_Words: data.Suggested_Words });
              if (
                data.Profane_Words &&
                Object.keys(data.Suggested_Words).length == 0
              ) {
                self.handleSendMessageToCustomer(
                  self.state.message,
                  "",
                  "",
                  null
                );
              }
            }
          }
        );
      } else {
        this.handleSendMessageToCustomer(this.state.message, "", "", null);
      }
    } else {
      this.handleSendMessageToCustomer(this.state.message, "", "", null);
    }
  };

  // handleSuggetionWordClick = (key, value) => {
  //   var selectedSuggested_Words = this.state.selectedSuggested_Words;
  //   selectedSuggested_Words[key] = value;
  //   var replaceMessageVal = "";
  //   var wordKey = Object.keys(selectedSuggested_Words);
  //   var finalReplaceMessageVal = "";
  //   if (this.state.replaceMessageVal) {
  //     replaceMessageVal = this.state.replaceMessageVal;
  //   } else {
  //     replaceMessageVal = this.state.message;
  //   }
  //   for (let i = 0; i < wordKey.length; i++) {
  //     var key = wordKey[i];
  //     var value = selectedSuggested_Words[wordKey[i]];

  //     if (value) {
  //       finalReplaceMessageVal = replaceAll(replaceMessageVal, key, value);
  //     }
  //   }
  //   this.setState({
  //     replaceMessageVal: finalReplaceMessageVal,
  //     selectedSuggested_Words,
  //   });
  // };
  // handleGrammarlyModalClose = () => {
  //   this.setState({
  //     grammarlyModal: false,
  //   });
  // };

  // handleGrammarlyModalOpen = () => {
  //   this.setState({
  //     grammarlyModal: true,
  //   });
  // };
  // handleGrammarlyApply = async () => {
  //   if (this.state.replaceMessageVal && this.state.Profane_Words.length === 0) {
  //     await this.setState({ message: this.state.replaceMessageVal });
  //     this.handleSendMessageToCustomer(
  //       this.state.replaceMessageVal,
  //       "",
  //       "",
  //       null
  //     );
  //     this.setState({
  //       Suggested_Words: {},
  //       selectedSuggested_Words: {},
  //       Profane_Words: [],
  //       replaceMessageVal: "",
  //       grammarlyModal: false,
  //     });
  //   }
  // };
  // handleGrammarlyIgnore = () => {
  //   if (this.state.Profane_Words.length === 0) {
  //     this.handleSendMessageToCustomer(this.state.message, "", "", false);
  //     this.setState({
  //       Suggested_Words: {},
  //       selectedSuggested_Words: {},
  //       Profane_Words: [],
  //       replaceMessageVal: "",
  //       grammarlyModal: false,
  //     });
  //   }
  // };
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
        <input
          type="hidden"
          id="backButtonClick"
          onClick={this.handleBackClickMobile.bind(this)}
        />
        {!this.state.isMobileView ? (
          <div className="store-chat-header">
            <img src={Chatw} className="Chatw" alt="Chatw" />

            <h3
              style={{
                marginRight:
                  this.state.isMainLoader || this.state.isAttachmentMainLoader
                    ? "15px"
                    : this.state.isMobileView
                    ? "54%"
                    : "92%",
              }}
            >
              {this.state.isMobileView && this.state.customerName
                ? this.state.customerName
                : TranslationContext !== undefined
                ? TranslationContext.h3.storechatwindow
                : "Store chat"}
            </h3>

            {(this.state.isMainLoader || this.state.isAttachmentMainLoader) &&
            !this.state.isMobileView ? (
              <div className="loader"></div>
            ) : null}
          </div>
        ) : null}
        <div className="container-fluid">
          <div className="row">
            <div
              style={{
                borderRight: !this.state.isMobileView
                  ? "1px solid #e8e8e8"
                  : "",
              }}
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
                style={{
                  backgroundColor: this.state.isMobileView
                    ? "ecf2f4"
                    : "#ECF2F4",
                }}
              >
                {this.state.isMobileView && this.state.showSearch ? (
                  <div
                    className="chat-cntr"
                    style={{
                      padding: "0px",
                      backgroundColor: "#FFF2E9",
                    }}
                  >
                    <span
                      style={{ textAlign: "center" }}
                      className="input-group-addon seacrh-img-chatsearch chatsearchtxt-span"
                    >
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
                ) : null}
                {!this.state.isMobileView && !this.state.showSearch ? (
                  <div
                    className="chat-cntr"
                    style={{
                      padding: "0px",
                      backgroundColor: "#FFF2E9",
                    }}
                  >
                    <span
                      style={{ textAlign: "center" }}
                      className="input-group-addon seacrh-img-chatsearch chatsearchtxt-span"
                    >
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
                ) : null}
                <div className="mobile-ongoing-circ-outer">
                  <div className="mobile-ongoing-circ">
                    <div className="mobile-ongoing-circ-inner">
                      <div className="indi-circ indi-circ-all">
                        <div className="chat-initial-brd position-relative">
                          <span className="initial">ALL</span>
                        </div>
                        <div className="name-num">
                          <p className="chat-name">
                            {this.state.ongoingChatsData.length}
                          </p>
                        </div>
                      </div>
                      {this.state.ongoingChatsData
                        ? this.state.ongoingChatsData.map((chat, i) => (
                            <div
                              id={chat.chatID}
                              key={i}
                              className="indi-circ"
                              onClick={this.handleOngoingChatClick.bind(
                                this,
                                chat.chatID,
                                chat.customerName,
                                chat.messageCount,
                                chat.mobileNo,
                                chat.customerID,
                                chat.programCode,
                                chat.storeID,
                                chat.isCustEndChat,
                                chat.storeManagerId,
                                chat.initialColor,
                                chat.isCustTimeout,
                                chat.sourceAbbr
                              )}
                            >
                              {/* <div className="d-flex align-items-center overflow-hidden"> */}
                              <div className="chat-initial-brd position-relative">
                                <span
                                  className="initial"
                                  style={{
                                    backgroundColor: chat.initialColor,
                                  }}
                                >
                                  {chat.customerName.charAt(0)}
                                </span>
                                {chat.chatID !== this.state.chatId &&
                                chat.messageCount > 0 ? (
                                  <span className="ongoing-message-icon-cnt">
                                    {chat.messageCount}
                                  </span>
                                ) : null}
                              </div>
                              <div className="name-num">
                                <p className="chat-name">{chat.customerName}</p>
                              </div>
                              {/* </div> */}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
                <div className="chatbot-left-new">
                  <Collapse
                    activeKey={this.state.chatTypeCollpase}
                    onChange={this.handleChatCollapsePanelChange.bind(this)}
                    bordered={false}
                  >
                    <Panel
                      className="newchatPanel"
                      showArrow={true}
                      header={
                        <div className="chats-heading d-flex justify-content-between align-items-center">
                          <label
                            className={
                              this.state.newChatsData.length > 0
                                ? "newchatLbl"
                                : ""
                            }
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.p.newchats
                              : "New Chats"}
                            (
                            {this.state.newChatsData.length < 9
                              ? "0" + this.state.newChatsData.length
                              : this.state.newChatsData.length}
                            )
                          </label>
                          {this.state.isMobileView ? (
                            <img
                              src={SearchBlueImg}
                              alt="SearchBlueImg"
                              className="srch-imge newchatSearchnone"
                              onClick={this.handleShowSearch.bind(this)}
                            />
                          ) : null}
                        </div>
                      }
                      key="1"
                    >
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
                                chat.customerName,
                                chat.mobileNo,
                                chat.customerID,
                                chat.programCode,
                                chat.sourceAbbr
                              )}
                            >
                              <div className="d-flex align-items-center overflow-hidden">
                                <span
                                  className="initial"
                                  style={{
                                    backgroundColor: chat.initialColor,
                                  }}
                                >
                                  {chat.customerName.charAt(0)}
                                </span>
                                <div className="name-num mx-2">
                                  <p className="chat-name">
                                    {chat.customerName}
                                    {chat.sourceIconUrl ? (
                                      <img
                                        src={chat.sourceIconUrl}
                                        alt="sourcetype"
                                        title={chat.sourceName}
                                        style={{ marginLeft: "5px" }}
                                      />
                                    ) : null}
                                  </p>
                                  <p className="num">{chat.mobileNo}</p>
                                </div>
                              </div>
                              <div>
                                <div className="mess-time">
                                  {!this.state.onHoverName ? (
                                    <p
                                      style={{
                                        fontWeight:
                                          chat.messageCount > 0
                                            ? "bold"
                                            : "400",
                                      }}
                                    >
                                      {chat.messageCount === 0 ? (
                                        "No"
                                      ) : (
                                        <span className="messagecount">
                                          {chat.messageCount}
                                        </span>
                                      )}
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
                        {this.state.newChatsData.length == 0 ? (
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : null}
                      </div>
                    </Panel>
                    <Panel
                      className="ongoingPanel"
                      showArrow={true}
                      key="2"
                      header={
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
                            <div onClick={(e) => e.stopPropagation()}>
                              <Select
                                className="agentchatdrop-down"
                                showArrow={true}
                                value={this.state.sAgentId}
                                onChange={this.handleChangeAgentDropdown.bind(
                                  this
                                )}
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
                            </div>
                          ) : null}
                        </div>
                      }
                    >
                      <div
                        className={
                          this.state.isMobileView
                            ? this.state.newChatsData.length > 0
                              ? "chat-left-height"
                              : ""
                            : this.state.newChatsData.length > 0
                            ? "chat-left-height"
                            : ""
                        }
                      >
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
                                  chat.customerName,
                                  chat.messageCount,
                                  chat.mobileNo,
                                  chat.customerID,
                                  chat.programCode,
                                  chat.storeID,
                                  chat.isCustEndChat,
                                  chat.storeManagerId,
                                  chat.initialColor,
                                  chat.isCustTimeout,
                                  chat.sourceAbbr
                                )}
                              >
                                <div className="d-flex align-items-center overflow-hidden">
                                  <div className="chat-initial-brd position-relative">
                                    <span
                                      className="initial"
                                      style={{
                                        backgroundColor: chat.initialColor,
                                      }}
                                    >
                                      {chat.customerName.charAt(0)}
                                    </span>
                                    {chat.chatID !== this.state.chatId &&
                                    chat.messageCount > 0 ? (
                                      <span className="ongoing-message-icon-cnt">
                                        {chat.messageCount}
                                      </span>
                                    ) : null}
                                  </div>
                                  <div className="name-num mx-2">
                                    <p className="chat-name">
                                      {chat.customerName}
                                      {chat.sourceIconUrl ? (
                                        <img
                                          src={chat.sourceIconUrl}
                                          alt="sourcetype"
                                          title={chat.sourceName}
                                          style={{ marginLeft: "5px" }}
                                        />
                                      ) : null}
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
                        {this.state.ongoingChatsData.length == 0 ? (
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : null}
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                {!this.state.isMobileView ? (
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
                ) : null}
              </div>

              {/* {!this.state.isMobileView ? (
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
              ) : null} */}
            </div>

            <div
              className={
                this.state.isCheckSuggetion
                  ? "secondbox suggetion-open"
                  : this.state.onHoverName
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
              {/* <div className={this.state.activeTab===2 || this.state.activeTab===4?"chatbot-right schdulead":"chatbot-right"}> */}
              <div
                className={
                  // (this.state.isCardMobileUp === true &&
                  //   this.state.searchCardData.length > 0) ||
                  this.state.activeTab === 4
                    ? "chatbot-right schdulead"
                    : "chatbot-right"
                }
              >
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
                                onClick={this.handleMainTabChange.bind(this, 1)}
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
                                onClick={this.handleMainTabChange.bind(this, 2)}
                              >
                                {this.state.pastChatCount < 9
                                  ? TranslationContext !== undefined
                                    ? TranslationContext.label.pastchat0 +
                                      this.state.pastChatCount +
                                      ")"
                                    : "Past Chat(0" +
                                      this.state.pastChatCount +
                                      ")"
                                  : TranslationContext !== undefined
                                  ? TranslationContext.label.pastchat +
                                    this.state.pastChatCount +
                                    ")"
                                  : "Past Chat(" +
                                    this.state.pastChatCount +
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
                          <label
                            className="myticket-submit-solve-button-text"
                            style={{ display: "inline" }}
                          >
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
                            <Spin
                              spinning={this.state.isAttachmentMainLoader}
                              tip={"Sending..."}
                            >
                              <div
                                style={{
                                  height:
                                    this.state.isMobileView &&
                                    !this.state.isCustomerProfile &&
                                    !this.state.isCustomerProduct
                                      ? "calc(100vh - 218px)"
                                      : "",
                                }}
                                className="chatcontentDiv"
                                ref={(div) => {
                                  this.messageList = div;
                                }}
                                onScroll={this.handleMessageDivScroll}
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
                                            <div>
                                              {item.attachment &&
                                              item.attachment.match(
                                                /(\.pdf|\.doc|\.docx)$/
                                              ) ? (
                                                <div className="card docCardAtt">
                                                  <div className="docFileAttach">
                                                    <a
                                                      // onClick={this.handleAttachmentDownload.bind(
                                                      //   this,
                                                      //   item.attachment,
                                                      //   item.attachment
                                                      //     .split("/")
                                                      //     .pop()
                                                      // )}
                                                      href={item.attachment}
                                                      target={"_blank"}
                                                      download={true}
                                                    >
                                                      {item.attachment.length >
                                                      100
                                                        ? item.attachment
                                                            .substr(0, 100)
                                                            .concat("...")
                                                            .split("/")
                                                            .pop()
                                                        : item.attachment
                                                            .split("/")
                                                            .pop()}
                                                    </a>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="card">
                                                  {item.isAttachment && (
                                                    <div
                                                      style={{
                                                        alignSelf: "center",
                                                      }}
                                                    >
                                                      <a
                                                        href={item.attachment}
                                                        target={"_blank"}
                                                      >
                                                        <img
                                                          src={item.attachment}
                                                          alt="down-icon"
                                                          className="chat-product-img-attachment"
                                                        />
                                                      </a>
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            <div
                                              className={
                                                item.isAttachmentDoc
                                                  ? "chat-trail-chatDoc pd-0"
                                                  : "chat-trail-chat pd-0"
                                              }
                                              style={
                                                item.isAttachment
                                                  ? { width: "301px" }
                                                  : null
                                              }
                                            >
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

                                {this.state.customerName &&
                                this.state.messageData.length === 0 ? (
                                  <Empty
                                    style={{ marginTop: "110px" }}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                  />
                                ) : null}
                                {this.state.isCustEndChat &&
                                this.state.isCustTimeout === false &&
                                this.state.customerName !== "" ? (
                                  <label className="endchatlbl">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label
                                          .customerhasendchat
                                      : "Customer has ended the conversation"}
                                  </label>
                                ) : null}
                                {this.state.isCustTimeout &&
                                this.state.isCustEndChat === false &&
                                this.state.customerName !== "" ? (
                                  <label className="endchatlbl">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label
                                          .customerhasendchattimeout
                                      : "Chat has been timed-out from customer end"}
                                  </label>
                                ) : null}
                              </div>
                            </Spin>
                          </div>
                        ) : null}
                        {this.state.isMobileView &&
                        this.state.AttachementFiles.length > 0 ? (
                          <div className="fileSelectDivMob">
                            <div className="fileSelectMob">
                              <label className="fileuploadlbl">
                                {this.state.AttachementFiles.length +
                                  " File Selected"}
                              </label>
                              <img
                                src={EditIcon}
                                onClick={this.handleOpenFileShow.bind(this)}
                                style={{ width: "18px" }}
                              />
                            </div>
                          </div>
                        ) : null}
                        {this.state.isMessageTabActive ||
                        this.state.isCardTabActive ||
                        this.state.isRecommendedTabActive ||
                        this.state.isSchedualTabActive ||
                        this.state.isGeneratePaymentTabActive ? (
                          <div
                            className="chatcontentdivtab chat-tabs-desktop mobilechat"
                            style={{
                              // maxHeight: !this.state.isDownbtn ? "531px" : "",
                              maxHeight: !this.state.isDownbtn ? "initial" : "",
                              pointerEvents:
                                this.state.isCustEndChat === true ||
                                this.state.isCustTimeout
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
                                        this.state.activeTab === 4
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
                                {this.state.AttachementFiles.length > 0 ? (
                                  <div className="fileImgupl">
                                    <button
                                      className="filebtn order-grid-butn fileclr"
                                      type="button"
                                      onClick={this.handleOpenFileShow.bind(
                                        this
                                      )}
                                    >
                                      {this.state.AttachementFiles.length}
                                      &nbsp; file selected.
                                    </button>
                                  </div>
                                ) : null}
                              </ul>
                            ) : null}

                            <div className="Mobaddcart">
                              <img
                                src={AddWh}
                                alt="Add"
                                className="AddWh AddWh-alone"
                                style={{ transform: "rotate(45deg)" }}
                                onClick={this.AddWhiteIconOpen.bind(this)}
                              />
                              {this.state.AddWhite && (
                                <div className="card">
                                  <img
                                    src={AddWh}
                                    alt="Add"
                                    className="AddWh"
                                    onClick={this.AddWhiteIconClose.bind(this)}
                                  />
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
                                            ? TranslationContext.a
                                                .recommendedlist
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
                                </div>
                              )}
                            </div>
                            <div className="tab-content">
                              {/* <div className="tab-content" style={{overflow:this.state.activeTab===1?"auto":"hidden"}}> */}
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
                                  style={{
                                    overflow: "auto",
                                    // maxHeight: "calc(100vh - 520px)",
                                  }}
                                  id="message-tab"
                                  role="tabpanel"
                                  aria-labelledby="message-tab"
                                >
                                  {/* <div className="Mobaddcart">
                                      <img
                                        src={AddWh}
                                        alt="Add"
                                        className="AddWh"
                                        style={{ transform: "rotate(45deg)" }}
                                        onClick={this.AddWhiteIconOpen.bind(
                                          this
                                        )}
                                      />
                                      {this.state.AddWhite && (
                                        <div className="card">
                                          <img
                                            src={AddWh}
                                            alt="Add"
                                            className="AddWh"
                                            onClick={this.AddWhiteIconClose.bind(
                                              this
                                            )}
                                          />
                                          <ul
                                            className="nav nav-tabs"
                                            role="tablist"
                                          >
                                            {this.state.isMessageTabActive ? (
                                              <li className="nav-item">
                                                <a
                                                  className={
                                                    this.state.activeTab ===
                                                      1 &&
                                                    this.state
                                                      .isMessageTabActive
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
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.a
                                                        .message
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
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.a.card
                                                    : "CARD"}
                                                </a>
                                              </li>
                                            ) : null}
                                            {this.state
                                              .isRecommendedTabActive ? (
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
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.a
                                                        .recommendedlist
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
                                                  onClick={this.handleTabClick.bind(
                                                    this,
                                                    4
                                                  )}
                                                  id="four"
                                                >
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.a
                                                        .schedulevisit
                                                    : "SCHEDULE VISIT"}
                                                </a>
                                              </li>
                                            ) : null}
                                            {this.state
                                              .isGeneratePaymentTabActive ? (
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
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.a
                                                        .schedulevisit
                                                    : "GENERATE PAYMENT LINK"}
                                                </a>
                                              </li>
                                            ) : null}
                                          </ul>
                                        </div>
                                      )}
                                    </div> */}
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

                                    {/* {this.state.isgrammarlyCheck ? (
                                      (this.state.storeAgentDetail.length > 0 &&
                                        this.state.storeAgentDetail[0]
                                          .grammarlyCheck === 1 &&
                                        Object.keys(this.state.Suggested_Words)
                                          .length > 0) ||
                                      this.state.Profane_Words.length > 0 ? (
                                        <div
                                          className="mobile-ck-error"
                                          style={{
                                            right:
                                              this.state.storeAgentDetail[0]
                                                .suggestion === 0 &&
                                              this.state.storeAgentDetail[0]
                                                .attachment === 0
                                                ? "65px"
                                                : this.state.storeAgentDetail[0]
                                                    .attachment === 0
                                                ? "110px"
                                                : this.state.storeAgentDetail[0]
                                                    .suggestion === 0
                                                ? "65px"
                                                : "",
                                          }}
                                        >
                                          {!this.state.isMobileView ? (
                                            <Popover
                                              trigger="click"
                                              overlayClassName="textcorretant"
                                              content={
                                                <div>
                                                  <div className="textcorret">
                                                    {Object.keys(
                                                      this.state.Suggested_Words
                                                    ).length > 0
                                                      ? Object.keys(
                                                          this.state
                                                            .Suggested_Words
                                                        ).map((item, i) => {
                                                          return (
                                                            <div className="row">
                                                              <div className="col-md">
                                                                <span className="oval"></span>
                                                                <label className="textcorret-lab1">
                                                                  {item}
                                                                </label>
                                                              </div>

                                                              <div className="col-md">
                                                                {this.state
                                                                  .Suggested_Words[
                                                                  item
                                                                ].length > 0
                                                                  ? this.state.Suggested_Words[
                                                                      item
                                                                    ].map(
                                                                      (
                                                                        key,
                                                                        j
                                                                      ) => {
                                                                        return (
                                                                          <label
                                                                            className={
                                                                              this
                                                                                .state
                                                                                .selectedSuggested_Words[
                                                                                item
                                                                              ] ===
                                                                              key
                                                                                ? "textcorret-lab2-active"
                                                                                : "textcorret-lab2"
                                                                            }
                                                                            key={
                                                                              j
                                                                            }
                                                                            onClick={this.handleSuggetionWordClick.bind(
                                                                              this,
                                                                              item,
                                                                              key
                                                                            )}
                                                                          >
                                                                            {
                                                                              key
                                                                            }
                                                                          </label>
                                                                        );
                                                                      }
                                                                    )
                                                                  : null}
                                                              </div>
                                                            </div>
                                                          );
                                                        })
                                                      : null}
                                                    {this.state.Profane_Words
                                                      .length > 0 ? (
                                                      <div className="row">
                                                        <div className="col-md">
                                                          <span className="oval"></span>
                                                          <label className="textcorret-lab1">
                                                            Profanity
                                                          </label>
                                                        </div>

                                                        <div className="col-md">
                                                          {this.state.Profane_Words.map(
                                                            (item, i) => {
                                                              return (
                                                                <label
                                                                  className="textcorret-lab2"
                                                                  key={i}
                                                                >
                                                                  {item}
                                                                </label>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      </div>
                                                    ) : null}
                                                  </div>

                                                  <div className="row">
                                                    <div className="col-md">
                                                      <button
                                                        className="textcorret-btnignore"
                                                        onClick={this.handleGrammarlyIgnore.bind(
                                                          this
                                                        )}
                                                      >
                                                        Ignore
                                                      </button>

                                                      <button
                                                        className="textcorret-btnapply"
                                                        onClick={this.handleGrammarlyApply.bind(
                                                          this
                                                        )}
                                                      >
                                                        Apply
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                            >
                                              <img
                                                src={Triangle}
                                                alt="send img"
                                              />
                                              <label>
                                                {Object.keys(
                                                  this.state.Suggested_Words
                                                ).length +
                                                  (this.state.Profane_Words
                                                    .length > 0
                                                    ? 1
                                                    : 0)}{" "}
                                                Errors
                                              </label>
                                            </Popover>
                                          ) : (
                                            <div
                                              onClick={this.handleGrammarlyModalOpen.bind(
                                                this
                                              )}
                                            >
                                              <img
                                                src={Triangle}
                                                alt="send img"
                                              />
                                              <label>
                                                {Object.keys(
                                                  this.state.Suggested_Words
                                                ).length +
                                                  (this.state.Profane_Words
                                                    .length > 0
                                                    ? 1
                                                    : 0)}{" "}
                                                Errors
                                              </label>
                                            </div>
                                          )}
                                        </div>
                                      ) : null
                                    ) : null} */}

                                    {this.state.storeAgentDetail.length !== 0 &&
                                    this.state.storeAgentDetail[0]
                                      .attachment === 1 ? (
                                      <div
                                        className="mobile-ck-attachment"
                                        title={"Attachment"}
                                        style={{
                                          right:
                                            this.state.storeAgentDetail[0]
                                              .suggestion === 0
                                              ? "60px"
                                              : this.state.storeAgentDetail[0]
                                                  .freeText === 0
                                              ? "60px"
                                              : "",
                                        }}
                                      >
                                        {this.state.isMobileView ? (
                                          <Popover
                                            content={
                                              <div className="fileMobAttch">
                                                <input
                                                  id="docImagesUpload"
                                                  className="d-none file-uploadprofile"
                                                  type="file"
                                                  onChange={this.handleFileUploadingMobile.bind(
                                                    this
                                                  )}
                                                  multiple
                                                  accept=".jpg, .jpeg, .png, .webp, .pdf, .doc, .docx"
                                                />
                                                <input
                                                  id="CameraImgUpload"
                                                  className="d-none file-uploadprofile"
                                                  type="file"
                                                  onChange={this.handleFileUploadingMobile.bind(
                                                    this
                                                  )}
                                                  accept="image/*"
                                                  capture
                                                  multiple
                                                />
                                                <input
                                                  id="GalleryImgUpload"
                                                  className="d-none file-uploadprofile"
                                                  type="file"
                                                  onChange={this.handleFileUploadingMobile.bind(
                                                    this
                                                  )}
                                                  accept="image/*"
                                                  multiple
                                                />
                                                <input
                                                  id="DocumentImgUpload"
                                                  className="d-none file-uploadprofile"
                                                  type="file"
                                                  onChange={this.handleFileUploadingMobile.bind(
                                                    this
                                                  )}
                                                  accept=".pdf,.doc,.docx"
                                                  multiple
                                                />
                                                <ul>
                                                  <li>
                                                    <div className="imgCircleAtt yellowImg">
                                                      <label htmlFor="DocumentImgUpload">
                                                        <img
                                                          src={AttachmentIcon}
                                                          alt="send img"
                                                        />
                                                      </label>
                                                    </div>

                                                    <label>Document</label>
                                                  </li>
                                                  <li>
                                                    <div className="imgCircleAtt blueImg">
                                                      <label htmlFor="CameraImgUpload">
                                                        <img
                                                          src={AttachmentIcon}
                                                          alt="send img"
                                                        />
                                                      </label>
                                                    </div>
                                                    <label>Camera</label>
                                                  </li>
                                                  <li>
                                                    <div className="imgCircleAtt skyBlue">
                                                      <label htmlFor="GalleryImgUpload">
                                                        <img
                                                          src={AttachmentIcon}
                                                          alt="send img"
                                                        />
                                                      </label>
                                                    </div>
                                                    <label>Gallery</label>
                                                  </li>
                                                </ul>
                                              </div>
                                            }
                                            trigger="click"
                                            placement="top"
                                            overlayClassName="order-popover-table order-popover shopping-bag-popover-item"
                                            onVisibleChange={(visible) =>
                                              this.setState({
                                                mobileFileupload: visible,
                                              })
                                            }
                                            visible={
                                              this.state.mobileFileupload
                                            }
                                          >
                                            <img
                                              src={AttachmentIcon}
                                              alt="send img"
                                            />
                                          </Popover>
                                        ) : (
                                          <label htmlFor="docImagesUpload">
                                            <Dropzone
                                              onDrop={this.handleFileUploading.bind(
                                                this
                                              )}
                                              multiple={true}
                                              accept=".jpg, .jpeg, .png, .webp, .pdf, .doc, .docx"
                                            >
                                              {({
                                                getRootProps,
                                                getInputProps,
                                              }) => (
                                                <div {...getRootProps()}>
                                                  <input
                                                    {...getInputProps()}
                                                    className="file-upload d-none"
                                                  />
                                                  <img
                                                    src={AttachmentIcon}
                                                    alt="send img"
                                                  />
                                                </div>
                                              )}
                                            </Dropzone>
                                          </label>
                                        )}
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
                                        style={{
                                          right:
                                            this.state.storeAgentDetail[0]
                                              .freeText === 0
                                              ? "15px"
                                              : "",
                                        }}
                                      >
                                        <img src={SuggSearch} alt="send img" />
                                      </div>
                                    ) : null}
                                    {this.state.storeAgentDetail.length !== 0 &&
                                    this.state.storeAgentDetail[0].freeText ===
                                      1 ? (
                                      <div
                                        className="mobile-ck-send-btn"
                                        onClick={this.handleSendMessageToCustomer.bind(this,this.state.message, "", "", null)}
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
                                    <Spin
                                      spinning={
                                        this.state.isMobileView
                                          ? this.state.isCardSearch
                                          : false
                                      }
                                    >
                                      <div
                                        className="input-group searchtxt-new"
                                        style={{ background: "none" }}
                                      >
                                        <label className="Cardname">Card</label>
                                        {this.state.isMobileView &&
                                          this.state.searchCardData.length ===
                                            0 && (
                                            <p
                                              style={{
                                                color: "red",
                                                marginTop: "5px",
                                              }}
                                            >
                                              {this.state.noProductFound}
                                            </p>
                                          )}
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
                                          onClick={this.handleSearchChatItemDetailsButton.bind(
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
                                        {!this.state.isMobileView &&
                                          this.state.searchCardData.length ===
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
                                    </Spin>
                                  </div>
                                  {!this.state.isMobileView ? (
                                    <Spin
                                      spinning={
                                        this.state.isMobileView
                                          ? false
                                          : this.state.isCardSearch
                                      }
                                    >
                                      <div className="container p-0">
                                        <div
                                          className="row product-card"
                                          style={{
                                            height: !this.state.isDownbtn
                                              ? "100%"
                                              : "",
                                            maxHeight: !this.state.isDownbtn
                                              ? "calc(100vh - 335px)"
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
                                                      this.state
                                                        .selectedCard ? (
                                                        <div className="selectdot">
                                                          <img
                                                            src={CardTick}
                                                            alt={"select-card"}
                                                          />
                                                        </div>
                                                      ) : null}
                                                      <div
                                                        className="card"
                                                        id={
                                                          "card" + item.itemID
                                                        }
                                                      >
                                                        <div className="card-body position-relative">
                                                          <div
                                                            className="row"
                                                            style={{
                                                              margin: "0",
                                                            }}
                                                          >
                                                            <div
                                                              className="col-4 col-md-4 mb-md-0 mb-2"
                                                              style={{
                                                                alignSelf:
                                                                  "center",
                                                              }}
                                                            >
                                                              {(item.imageURL !==
                                                                "" ||
                                                                item.imageUrl) &&
                                                              this.state
                                                                .cardConfigData
                                                                .ImageURL ? (
                                                                <img
                                                                  className="chat-product-img"
                                                                  src={
                                                                    item.imageURL ||
                                                                    item.imageUrl
                                                                  }
                                                                  alt="Product Image"
                                                                  title={
                                                                    item.productName ||
                                                                    item.name
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
                                                                    item.uniqueItemCode ||
                                                                      item.itemCode
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
                                                              className="col-8 col-md-8 bkcprdt"
                                                              onClick={this.handleSelectCard.bind(
                                                                this,
                                                                item.itemID,
                                                                item.imageURL ||
                                                                  item.imageUrl
                                                              )}
                                                            >
                                                              {(item.productName ||
                                                                item.name) &&
                                                              this.state
                                                                .cardConfigData
                                                                .ItemName ? (
                                                                <div>
                                                                  <label className="chat-product-name">
                                                                    {item.productName ||
                                                                      item.name}
                                                                  </label>
                                                                </div>
                                                              ) : null}
                                                              <div>
                                                                {item.brandName &&
                                                                this.state
                                                                  .cardConfigData
                                                                  .Brand ? (
                                                                  <label className="chat-product-code">
                                                                    {TranslationContext !==
                                                                    undefined
                                                                      ? TranslationContext
                                                                          .label
                                                                          .brand
                                                                      : "Brand"}
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
                                                                  null &&
                                                                this.state
                                                                  .cardConfigData
                                                                  .Category ? (
                                                                  <label className="chat-product-code">
                                                                    {TranslationContext !==
                                                                    undefined
                                                                      ? TranslationContext
                                                                          .label
                                                                          .category
                                                                      : "Category"}
                                                                    :
                                                                    {" " +
                                                                      item.categoryName}
                                                                  </label>
                                                                ) : null}
                                                              </div>
                                                              <div>
                                                                {item.subCategoryName &&
                                                                this.state
                                                                  .cardConfigData
                                                                  .SubCategory ? (
                                                                  <label className="chat-product-code">
                                                                    {TranslationContext !==
                                                                    undefined
                                                                      ? TranslationContext
                                                                          .label
                                                                          .subcategory
                                                                      : "SubCategory"}
                                                                    :
                                                                    {" " +
                                                                      item.subCategoryName}
                                                                  </label>
                                                                ) : null}
                                                              </div>
                                                              {this.state
                                                                .sourceType ===
                                                              "cb" ? (
                                                                <div>
                                                                  {item.color &&
                                                                  this.state
                                                                    .cardConfigData
                                                                    .Color ? (
                                                                    <label className="chat-product-code">
                                                                      {TranslationContext !==
                                                                      undefined
                                                                        ? TranslationContext
                                                                            .label
                                                                            .color
                                                                        : "Color"}
                                                                      :
                                                                      {" " +
                                                                        item.color}
                                                                    </label>
                                                                  ) : null}
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  {item.availableColor &&
                                                                  this.state
                                                                    .cardConfigData
                                                                    .Color ? (
                                                                    <label className="chat-product-code">
                                                                      {TranslationContext !==
                                                                      undefined
                                                                        ? TranslationContext
                                                                            .label
                                                                            .color
                                                                        : "Color"}
                                                                      :
                                                                      {item.availableColor.join()}
                                                                    </label>
                                                                  ) : null}
                                                                </div>
                                                              )}
                                                              {this.state
                                                                .sourceType ===
                                                              "cb" ? (
                                                                <div>
                                                                  {item.size &&
                                                                  this.state
                                                                    .cardConfigData
                                                                    .Size ? (
                                                                    <label className="chat-product-code">
                                                                      {TranslationContext !==
                                                                      undefined
                                                                        ? TranslationContext
                                                                            .label
                                                                            .color
                                                                        : "Size"}
                                                                      :
                                                                      {" " +
                                                                        item.size}
                                                                    </label>
                                                                  ) : null}
                                                                </div>
                                                              ) : item.availableSize &&
                                                                this.state
                                                                  .cardConfigData
                                                                  .Size ? (
                                                                <label className="chat-product-code">
                                                                  {TranslationContext !==
                                                                  undefined
                                                                    ? TranslationContext
                                                                        .label
                                                                        .color
                                                                    : "Size"}
                                                                  :
                                                                  {" " +
                                                                    item.availableSize.join()}
                                                                </label>
                                                              ) : null}
                                                              {this.state
                                                                .sourceType ===
                                                              "cb" ? (
                                                                <div>
                                                                  {item.uniqueItemCode &&
                                                                  this.state
                                                                    .cardConfigData
                                                                    .ItemCode ? (
                                                                    <label className="chat-product-code">
                                                                      {TranslationContext !==
                                                                      undefined
                                                                        ? TranslationContext
                                                                            .label
                                                                            .itemcode
                                                                        : "Item Code"}
                                                                      :
                                                                      {" " +
                                                                        item.uniqueItemCode}
                                                                    </label>
                                                                  ) : null}
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  {item.itemCode &&
                                                                  this.state
                                                                    .cardConfigData
                                                                    .ItemCode ? (
                                                                    <label className="chat-product-code">
                                                                      {TranslationContext !==
                                                                      undefined
                                                                        ? TranslationContext
                                                                            .label
                                                                            .itemcode
                                                                        : "Item Code"}
                                                                      :
                                                                      {" " +
                                                                        item.itemCode}
                                                                    </label>
                                                                  ) : null}
                                                                </div>
                                                              )}
                                                              <div>
                                                                {item.discount !==
                                                                  "" &&
                                                                parseFloat(
                                                                  item.discount
                                                                ) !== 0 &&
                                                                item.discount !==
                                                                  null &&
                                                                this.state
                                                                  .cardConfigData
                                                                  .discount ? (
                                                                  <label className="chat-product-code">
                                                                    {TranslationContext !==
                                                                    undefined
                                                                      ? TranslationContext
                                                                          .label
                                                                          .discount
                                                                      : "Discount"}
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
                                                                  null &&
                                                                this.state
                                                                  .cardConfigData
                                                                  .Price ? (
                                                                  <label className="chat-product-prize">
                                                                    {TranslationContext !==
                                                                    undefined
                                                                      ? TranslationContext
                                                                          .label
                                                                          .price
                                                                      : "Price"}
                                                                    :
                                                                    {" " +
                                                                      item.price}
                                                                  </label>
                                                                ) : null}
                                                              </div>
                                                              {item.url &&
                                                              this.state
                                                                .cardConfigData
                                                                .Url ? (
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
                                        {this.state.searchCardData.length > 0 &&
                                        this.state.isMobileView === false ? (
                                          <div className="row m-0">
                                            <button
                                              style={{
                                                cursor: "pointer",
                                              }}
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
                                            {this.state.isCardSend ? (
                                              <lable className="cardsucclbl">
                                                Card Send Successfully.
                                              </lable>
                                            ) : null}
                                            {this.state.isSelectedCard ? (
                                              <lable className="cardsucclblNot">
                                                Please Select Card.
                                              </lable>
                                            ) : null}
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
                                    </Spin>
                                  ) : null}
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
                                    <label className="mob-app-chat-head">
                                      Recommended List
                                    </label>
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.noRecommendedFound}
                                    </p>
                                    <button
                                      disabled={this.state.isSendRecomended}
                                      className="butn mobi-butn"
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
                                      {this.state.isMobileView ? (
                                        <label
                                          className="s-lable schedule-left-cntr"
                                          style={{
                                            paddingBottom: "5px",
                                            paddingTop: "10px",
                                            width: "100%",
                                          }}
                                        >
                                          Schedule Visit
                                        </label>
                                      ) : null}
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
                                                    marginBottom: "11px",
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
                                                ? "butn ml-auto isSendClick-dsle"
                                                : "butn ml-auto"
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
                        {this.state.isMobileView ? (
                          <div>
                            <a
                              className="aprightbck apr"
                              onClick={this.handleBackToCurrentChat.bind(this)}
                            >
                              Back to Current Chat
                            </a>
                          </div>
                        ) : null}
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
                                            ? rowData.customerMobile
                                            : ""
                                        }
                                      >
                                        {rowData.customerMobile
                                          ? rowData.customerMobile
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
                                total: this.state.pastChatCount,
                                onChange: this.handlePastChatPageChange.bind(
                                  this
                                ),
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
                                className="chatcontentDiv pastcht"
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
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.p.bot
                                                  : "BOT"}
                                              </p>
                                            )}
                                            <div>
                                              {item.attachment &&
                                              item.attachment.match(
                                                /(\.pdf|\.doc|\.docx)$/
                                              ) ? (
                                                <div className="card docCardAtt">
                                                  <div className="docFileAttach">
                                                    <a
                                                      // onClick={this.handleAttachmentDownload.bind(
                                                      //   this,
                                                      //   item.attachment,
                                                      //   item.attachment
                                                      //     .split("/")
                                                      //     .pop()
                                                      // )}
                                                      href={item.attachment}
                                                      target={"_blank"}
                                                      download={true}
                                                    >
                                                      {item.attachment.length >
                                                      100
                                                        ? item.attachment
                                                            .substr(0, 100)
                                                            .concat("...")
                                                            .split("/")
                                                            .pop()
                                                        : item.attachment
                                                            .split("/")
                                                            .pop()}
                                                    </a>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="card attachment-imgdiv">
                                                  {item.isAttachment && (
                                                    <div
                                                      style={{
                                                        alignSelf: "center",
                                                      }}
                                                    >
                                                      <a
                                                        href={item.attachment}
                                                        target={"_blank"}
                                                      >
                                                        <img
                                                          src={item.attachment}
                                                          alt="down-icon"
                                                          className="chat-product-img-attachment"
                                                        />
                                                      </a>
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </div>
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
                                  <>
                                    {rowData.chatID ? rowData.chatID : ""}
                                    {rowData.sourceIconUrl ? (
                                      <img
                                        src={rowData.sourceIconUrl}
                                        alt="sourcetype"
                                        title={rowData.sourceName}
                                        style={{ marginLeft: "5px" }}
                                      />
                                    ) : null}
                                  </>
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
                                      ? rowData.customerMobile
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
                                  <>{rowData.timeAgo ? rowData.timeAgo : ""}</>
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
                            className="chatcontentDiv pastcht historicalChatDiv"
                            ref={(div) => {
                              this.historyMessageList = div;
                            }}
                            id="historicalChatDiv"
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
                                        <div>
                                          {item.attachment &&
                                          item.attachment.match(
                                            /(\.pdf|\.doc|\.docx)$/
                                          ) ? (
                                            <div className="card docCardAtt">
                                              <div className="docFileAttach">
                                                <a
                                                  // onClick={this.handleAttachmentDownload.bind(
                                                  //   this,
                                                  //   item.attachment,
                                                  //   item.attachment
                                                  //     .split("/")
                                                  //     .pop()
                                                  // )}
                                                  href={item.attachment}
                                                  target="_blank"
                                                  download={true}
                                                >
                                                  {item.attachment.length > 100
                                                    ? item.attachment
                                                        .substr(0, 100)
                                                        .concat("...")
                                                        .split("/")
                                                        .pop()
                                                    : item.attachment
                                                        .split("/")
                                                        .pop()}
                                                </a>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="card">
                                              {item.isAttachment && (
                                                <div
                                                  style={{
                                                    alignSelf: "center",
                                                  }}
                                                >
                                                  <a
                                                    href="item.attachment"
                                                    target="_blank"
                                                  >
                                                    <img
                                                      src={item.attachment}
                                                      alt="down-icon"
                                                      className="chat-product-img-attachment"
                                                    />
                                                  </a>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        <p className="chat-trail-chat pd-0">
                                          {ReactHtmlParser(
                                            item.message
                                              .replace("col-md-2", "col-md-4")
                                              .replace("col-md-10", "col-md-8")
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
                              <p style={{ margin: "10px" }}>No record found</p>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {this.state.isCheckSuggetion ? (
              <div className="suggetion-div">
                <div className="d-flex align-items-center web-suggetion-hedaer">
                  <img
                    src={SmartMessageWeb}
                    className="bulb-img"
                    alt="icon missing"
                  />
                  <p className="smart-para">SMART MESSAGING</p>
                  <img
                    src={DownArrowChat}
                    className="bulb-img web-suggetion-arbtn"
                    alt="icon missing"
                    onClick={this.handleHideSuggetionWeb.bind(this)}
                  />
                </div>
                <hr style={{ marginBottom: "0" }} />
                <Spin spinning={this.state.isSuggestionLoad}>
                  <div>
                    <div className="tags-cntr-web" style={{ margin: "5px" }}>
                      <label className="tag-label">Tags</label>
                      {this.state.messageSuggestionTagsData !== null
                        ? this.state.messageSuggestionTagsData.map(
                            (item, i) => {
                              return (
                                <button
                                  onClick={this.handleTagsButtonClick.bind(
                                    this,
                                    item.tagID
                                  )}
                                  className={
                                    this.state.selectedTags === item.tagID
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
                    </div>
                    <hr style={{ marginBottom: "0px" }} />
                    <label className="tag-label" style={{ margin: "10px" }}>
                      Top Messages
                    </label>
                    {this.state.messageSuggestionData !== null &&
                      this.state.messageSuggestionData.length > 0 &&
                      this.state.messageSuggestionData.length > 0 && (
                        <div className="suggestions-cntr setpagination web-suggetiondiv">
                          <Table
                            noDataContent="No Record Found"
                            style={{ width: "100%", margin: "5px" }}
                            className="components-table-demo-nested antd-table-campaign custom-antd-table rm-header rm-border"
                            columns={[
                              {
                                dataIndex: "suggestionText",
                                render: (row, rowData) => {
                                  i = i + 1;

                                  return (
                                    <div
                                      className={
                                        this.state.chkSuggestion ===
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
                                        title={rowData.suggestionText}
                                      >
                                        <span>{rowData.suggestionText}</span>
                                      </Tooltip>
                                    </div>
                                  );
                                },
                              },
                            ]}
                            dataSource={this.state.messageSuggestionData.filter(
                              (x) => x.tagID == this.state.selectedTags
                            )}
                            pagination={{
                              pageSize: 10,
                              defaultPageSize: 10,
                            }}
                          ></Table>
                        </div>
                      )}

                    {this.state.messageSuggestionData.length === 0 ? (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    ) : null}
                  </div>
                </Spin>
              </div>
            ) : null}
            {this.state.isCustomerProduct || this.state.isCustomerProfile ? (
              this.state.customerName ? (
                <div
                  onMouseLeave={this.handleNameHoverLeave.bind()}
                  style={{
                    position: this.state.isMobileView ? "" : "relative",
                  }}
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
                        style={{
                          bottom: this.state.isShutterOpen ? "3px" : "-10px",
                        }}
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
                        style={{
                          bottom: this.state.isShutterOpen ? "3px" : "-10px",
                        }}
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
                    <ul className="nav nav-tabs mob-prod-mar" role="tablist">
                      {this.state.isCustomerProfile ? (
                        <li
                          className="nav-item"
                          style={{
                            padding: this.state.isCustomerProduct ? "" : "2px",
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
                            padding: this.state.isCustomerProfile ? "" : "2px",
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
                            {/* {this.state.onHoverName &&
                              this.state.isProfileLoading ? (
                                <Spin className="spinner-right" />
                              ) : null} */}
                            <div>
                              <ul className="nameplate">
                                <li>
                                  <label
                                    onClick={
                                      this.state.isMobileView
                                        ? this.handleMainTabChange.bind(this, 1)
                                        : null
                                    }
                                    onMouseEnter={this.handleNameHover.bind(
                                      this
                                    )}
                                    className="namelabel"
                                    style={{
                                      backgroundColor: this.state.selectedColor,
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
                                  <h3>
                                    {this.state.customerNameProfile
                                      ? this.state.customerNameProfile
                                      : this.state.customerName}
                                  </h3>
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
                                      <li>
                                        <p>{this.state.customerEmailID}</p>
                                      </li>

                                      <li>
                                        <p>
                                          {this.state.customerMobileNo
                                            ? this.state.customerMobileNo
                                            : this.state.mobileNo}
                                        </p>
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
                                          ? TranslationContext.label.totalpoints
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
                                          ? TranslationContext.label.visitcount
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
                              {this.state.onHoverName &&
                              this.state.isProfileLoading ? (
                                // <Spin className="spinner-right" />
                                <Spin className="spinnerprofile" />
                              ) : null}
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
                                  <Spin spinning={this.state.insightsLoader}>
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
                                  </Spin>
                                </Panel>
                                <Panel
                                  header={
                                    TranslationContext !== undefined
                                      ? TranslationContext.panel.orders
                                      : "Orders"
                                  }
                                  key="2"
                                >
                                  <Spin
                                    spinning={this.state.orderDetailsLoader}
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
                                  </Spin>
                                </Panel>
                                <Panel
                                  header={
                                    TranslationContext !== undefined
                                      ? TranslationContext.panel.lasttransaction
                                      : "Last Transaction"
                                  }
                                  key="3"
                                >
                                  <Spin
                                    spinning={this.state.lasttransactionLoader}
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
                                            {this.state.itemDetails
                                              ? this.state.itemDetails.map(
                                                  (item, i) => {
                                                    return (
                                                      <tr key={i}>
                                                        <td>
                                                          <label>
                                                            {item.article}
                                                          </label>
                                                        </td>
                                                        <td>
                                                          <label>
                                                            {item.quantity}
                                                          </label>
                                                        </td>
                                                        <td>
                                                          <label>
                                                            {item.amount}
                                                          </label>
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </tbody>
                                        </table>
                                        {this.state.itemDetails.length === 0 ? (
                                          <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  </Spin>
                                </Panel>
                              </Collapse>
                            </div>
                            <button
                              type="button"
                              className="updateprofilelinkbtn pastchatmobbtn"
                              onClick={this.handleMainTabChange.bind(this, 2)}
                            >
                              {this.state.pastChatCount < 9
                                ? this.state.pastChatCount + "0 Past Chat"
                                : this.state.pastChatCount + " Past Chat"}
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
                      {this.state.isCustomerProduct === true ? (
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
                          <div className="productsbox tabsnme">
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
                                        ? this.handleMainTabChange.bind(this, 1)
                                        : null
                                    }
                                  >
                                    <h3>
                                      {this.state.customerNameProfile
                                        ? this.state.customerNameProfile
                                        : this.state.customerName}
                                    </h3>
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
                                              <div className="prodboxx" key={i}>
                                                <Checkbox
                                                  checked={
                                                    this.state.shoppingBagData[
                                                      i
                                                    ].isCheck
                                                  }
                                                  onChange={this.handleProductTabsChange.bind(
                                                    this,
                                                    1,
                                                    i,
                                                    0
                                                  )}
                                                >
                                                  <Popover
                                                    overlayClassName="antcustom ant-prodesc"
                                                    content={
                                                      <ProductHoverItem
                                                        cardConfigData={
                                                          this.state
                                                            .cardConfigData
                                                        }
                                                        item={item}
                                                        TranslationContext={
                                                          this.state
                                                            .translateLanguage
                                                            .default
                                                        }
                                                      />
                                                    }
                                                    placement="left"
                                                  >
                                                    <img
                                                      src={encodeURI(
                                                        item.imageURL
                                                      )}
                                                      // src={Ladyimg}
                                                      className="ladyimg"
                                                      alt="product-image"
                                                      onError={this.handleProductNoImage.bind(
                                                        this
                                                      )}
                                                    />
                                                  </Popover>
                                                </Checkbox>
                                                <div
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  {item.brandName &&
                                                  this.state.cardConfigData
                                                    .Brand ? (
                                                    <h3 title={item.brandName}>
                                                      {item.brandName}
                                                    </h3>
                                                  ) : null}
                                                  {item.productName &&
                                                  this.state.cardConfigData
                                                    .ItemName ? (
                                                    <h4
                                                      title={item.productName}
                                                    >
                                                      {item.productName}
                                                    </h4>
                                                  ) : null}
                                                  {item.price &&
                                                  this.state.cardConfigData
                                                    .Price ? (
                                                    <span>
                                                      {Number(
                                                        item.price
                                                      ).toLocaleString(
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
                                              </div>
                                            );
                                          }
                                        )
                                      : null}
                                    {this.state.shoppingBagData.length === 0 &&
                                    this.state.isProductLoading === false ? (
                                      <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      />
                                    ) : null}
                                    {this.state.isProductLoading ? (
                                      <Spin
                                        style={{
                                          margin: "20px",
                                          display: "block",
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                  {this.state.selectedShoppingBag.length > 0 ? (
                                    <div className="tabsbotbtn-box">
                                      <button
                                        type="button"
                                        className="tabsbotbtn"
                                        onClick={this.handleSendProductsOnChat.bind(
                                          this,
                                          false,
                                          "",
                                          "",
                                          ""
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
                                        onClick={this.handleAddProductsToBagOrWishlist.bind(
                                          this,
                                          "shoppingbag"
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
                                              onClick={this.handleAddressModalOpen.bind(
                                                this
                                              )}
                                            >
                                              {TranslationContext !== undefined
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
                                              <div className="prodboxx" key={i}>
                                                <Checkbox
                                                  checked={
                                                    this.state.wishListData[i]
                                                      .isCheck
                                                  }
                                                  onChange={this.handleProductTabsChange.bind(
                                                    this,
                                                    2,
                                                    i,
                                                    0
                                                  )}
                                                >
                                                  <Popover
                                                    overlayClassName="antcustom ant-prodesc"
                                                    content={
                                                      <ProductHoverItem
                                                        cardConfigData={
                                                          this.state
                                                            .cardConfigData
                                                        }
                                                        item={item}
                                                        TranslationContext={
                                                          this.state
                                                            .translateLanguage
                                                            .default
                                                        }
                                                      />
                                                    }
                                                    placement="left"
                                                  >
                                                    <img
                                                      src={encodeURI(
                                                        item.imageURL
                                                      )}
                                                      className="ladyimg"
                                                      alt="Lady Img"
                                                      onError={this.handleProductNoImage.bind(
                                                        this
                                                      )}
                                                    />
                                                  </Popover>
                                                </Checkbox>
                                                <div
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  {item.brandName &&
                                                  this.state.cardConfigData
                                                    .Brand ? (
                                                    <h3 title={item.brandName}>
                                                      {item.brandName}
                                                    </h3>
                                                  ) : null}
                                                  {item.productName &&
                                                  this.state.cardConfigData
                                                    .ItemName ? (
                                                    <h4
                                                      title={item.productName}
                                                    >
                                                      {item.productName}
                                                    </h4>
                                                  ) : null}
                                                  {item.price &&
                                                  this.state.cardConfigData
                                                    .Price ? (
                                                    <span>
                                                      {Number(
                                                        item.price
                                                      ).toLocaleString(
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
                                              </div>
                                            );
                                          }
                                        )
                                      : null}

                                    {this.state.wishListData.length === 0 &&
                                    this.state.isProductLoading === false ? (
                                      <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      />
                                    ) : null}
                                    {this.state.isProductLoading ? (
                                      <Spin
                                        style={{
                                          margin: "20px",
                                          display: "block",
                                        }}
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
                                          false,
                                          "",
                                          "",
                                          ""
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
                                        onClick={this.handleAddProductsToBagOrWishlist.bind(
                                          this,
                                          "wishlist"
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
                                              onClick={this.handleAddressModalOpen.bind(
                                                this
                                              )}
                                            >
                                              {TranslationContext !== undefined
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
                                              <div className="prodboxx" key={i}>
                                                <Checkbox
                                                  checked={
                                                    this.state.recommendedData[
                                                      i
                                                    ].isCheck
                                                  }
                                                  onChange={this.handleProductTabsChange.bind(
                                                    this,
                                                    3,
                                                    i,
                                                    0
                                                  )}
                                                >
                                                  <Popover
                                                    overlayClassName="antcustom ant-prodesc"
                                                    content={
                                                      <ProductHoverItem
                                                        cardConfigData={
                                                          this.state
                                                            .cardConfigData
                                                        }
                                                        item={item}
                                                        TranslationContext={
                                                          this.state
                                                            .translateLanguage
                                                            .default
                                                        }
                                                      />
                                                    }
                                                    placement="left"
                                                  >
                                                    <img
                                                      src={encodeURI(
                                                        item.imageURL
                                                      )}
                                                      className="ladyimg"
                                                      alt="Product-image"
                                                      onError={this.handleProductNoImage.bind(
                                                        this
                                                      )}
                                                    />
                                                  </Popover>
                                                </Checkbox>
                                                <div
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  {item.brandName &&
                                                  this.state.cardConfigData
                                                    .Brand ? (
                                                    <h3 title={item.brandName}>
                                                      {item.brandName}
                                                    </h3>
                                                  ) : null}
                                                  {item.productName &&
                                                  this.state.cardConfigData
                                                    .ItemName ? (
                                                    <h4
                                                      title={item.productName}
                                                    >
                                                      {item.productName}
                                                    </h4>
                                                  ) : null}
                                                  {item.price &&
                                                  this.state.cardConfigData
                                                    .Price ? (
                                                    <span>
                                                      {Number(
                                                        item.price
                                                      ).toLocaleString(
                                                        "en-IN",
                                                        {
                                                          style: "currency",
                                                          currency: "INR",
                                                          minimumFractionDigits: 0,
                                                        }
                                                      )}
                                                    </span>
                                                  ) : null}
                                                  {/* <img
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
                                                    /> */}
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      : null}

                                    {this.state.recommendedData.length === 0 &&
                                    this.state.isProductLoading === false ? (
                                      <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      />
                                    ) : null}
                                    {this.state.isProductLoading ? (
                                      <Spin
                                        style={{
                                          margin: "20px",
                                          display: "block",
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                  {this.state.selectedRecommended.length > 0 ? (
                                    <div className="tabsbotbtn-box">
                                      <button
                                        type="button"
                                        className="tabsbotbtn"
                                        onClick={this.handleSendProductsOnChat.bind(
                                          this,
                                          false,
                                          "",
                                          "",
                                          ""
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
                                        onClick={this.handleAddRecommendationToWishlist.bind(
                                          this
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
                                              onClick={this.handleAddressModalOpen.bind(
                                                this
                                              )}
                                            >
                                              {TranslationContext !== undefined
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
                          <div className="productmobile">
                            <div className="profi">
                              <ul className="nameplate">
                                <li>
                                  <label
                                    onClick={
                                      this.state.isMobileView
                                        ? this.handleMainTabChange.bind(this, 1)
                                        : null
                                    }
                                    onMouseEnter={this.handleNameHover.bind(
                                      this
                                    )}
                                    className="namelabel"
                                    style={{
                                      backgroundColor: this.state.selectedColor,
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
                                  <h3>
                                    {this.state.customerNameProfile
                                      ? this.state.customerNameProfile
                                      : this.state.customerName}
                                  </h3>
                                  <span>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.span.tier
                                      : "Tier"}
                                    : <b>{this.state.customerTier}</b>
                                  </span>
                                </li>
                                {this.state.ProfileProductTab === 2 ? (
                                  <li className="contactbox">
                                    <div>
                                      <ul>
                                        {this.state.customerEmailID ? (
                                          <li>
                                            <p>{this.state.customerEmailID}</p>
                                          </li>
                                        ) : null}
                                        <li>
                                          <p>{this.state.customerMobileNo}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                ) : null}
                              </ul>
                            </div>
                            <div>
                              <Collapse
                                accordion
                                activeKey={this.state.mobileCollpseActive}
                                onChange={this.handleMobileCollpseChange.bind(
                                  this
                                )}
                              >
                                <Panel
                                  header={
                                    <div>
                                      <label>Shopping Bag</label>
                                      <div style={{ float: "right" }}>
                                        <label className="plushMobile">
                                          ₹{this.state.totalShoppingBag}
                                        </label>
                                        <img
                                          src={Blueplus}
                                          alt="Product"
                                          width="20"
                                          height="20"
                                          onClick={this.handleOpenProcessModal.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    </div>
                                  }
                                  key="1"
                                >
                                  <Spin spinning={this.state.insightsLoader}>
                                    <div className="insightsbox">
                                      {this.state.shoppingBagData > 0 ? (
                                        <div style={{ float: "right" }}>
                                          <label className="plushMobile">
                                            ₹{this.state.totalShoppingBag}
                                          </label>
                                          <img
                                            src={Blueplus}
                                            alt="Product"
                                            width="25"
                                            height="25"
                                            onClick={this.handleOpenProcessModal.bind(
                                              this
                                            )}
                                          />
                                        </div>
                                      ) : null}
                                      <ul className="datawish">
                                        {this.state.shoppingBagData
                                          ? this.state.shoppingBagData.map(
                                              (data, s) => {
                                                return (
                                                  <li className="" key={s}>
                                                    <div className="left d-flex">
                                                      <img
                                                        src={encodeURI(
                                                          data.imageURL
                                                        )}
                                                        alt="Product"
                                                        width="25"
                                                        height="25"
                                                        onError={this.handleMobileProductNoImage.bind(
                                                          this
                                                        )}
                                                      />
                                                      <div className="text1">
                                                        <span>
                                                          {data.categoryName}
                                                        </span>
                                                        <span>
                                                          <b>
                                                            {data.productName
                                                              .length > 27
                                                              ? data.productName
                                                                  .substr(0, 27)
                                                                  .concat("...")
                                                              : data.productName}
                                                          </b>
                                                        </span>
                                                        {data.uniqueItemCode ? (
                                                          <span>
                                                            {
                                                              data.uniqueItemCode
                                                            }
                                                          </span>
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                    <div className="right text2">
                                                      <div
                                                        style={{
                                                          float: "left",
                                                        }}
                                                      >
                                                        <span
                                                          className={
                                                            data.isCheck
                                                              ? "blueClr"
                                                              : ""
                                                          }
                                                        >
                                                          &#8377;
                                                          <b>{data.price}</b>
                                                        </span>
                                                        <b>
                                                          <span
                                                            className={
                                                              data.isCheck
                                                                ? "blueClr"
                                                                : ""
                                                            }
                                                          >
                                                            Q 1
                                                          </span>
                                                        </b>
                                                      </div>
                                                      {data.isCheck ? (
                                                        <img
                                                          src={RightBlue}
                                                          alt="Product"
                                                          width="15"
                                                          height="15"
                                                          className="mobileShapeR"
                                                          onClick={this.handleProductTabsChange.bind(
                                                            this,
                                                            1,
                                                            s,
                                                            data.uniqueItemCode
                                                          )}
                                                        />
                                                      ) : (
                                                        <img
                                                          src={RightShape}
                                                          alt="Product"
                                                          width="15"
                                                          height="15"
                                                          className="mobileShapeR"
                                                          onClick={this.handleProductTabsChange.bind(
                                                            this,
                                                            1,
                                                            s,
                                                            data.uniqueItemCode
                                                          )}
                                                        />
                                                      )}
                                                    </div>
                                                  </li>
                                                );
                                              }
                                            )
                                          : null}
                                        {this.state.shoppingBagData.length ===
                                          0 &&
                                        this.state.isProductLoading ===
                                          false ? (
                                          <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                          />
                                        ) : null}
                                      </ul>
                                    </div>
                                  </Spin>
                                </Panel>
                                <div className="tabline"></div>
                                <Panel
                                  header={
                                    <div>
                                      <label>Wish list</label>
                                      <div style={{ float: "right" }}>
                                        <label className="plushMobile">
                                          ₹{this.state.totalWishList}
                                        </label>
                                        <img
                                          src={Blueplus}
                                          alt="Product"
                                          width="20"
                                          height="20"
                                          onClick={this.handleOpenWishListModal.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    </div>
                                  }
                                  key="2"
                                >
                                  <Spin
                                    spinning={this.state.orderDetailsLoader}
                                  >
                                    <div className="ordersbox">
                                      <ul className="datawish">
                                        {this.state.wishListData
                                          ? this.state.wishListData.map(
                                              (data, w) => {
                                                return (
                                                  <li className="" key={w}>
                                                    <div className="left d-flex">
                                                      <img
                                                        src={encodeURI(
                                                          data.imageURL
                                                        )}
                                                        alt="Product"
                                                        width="25"
                                                        height="25"
                                                        onError={this.handleMobileProductNoImage.bind(
                                                          this
                                                        )}
                                                      />
                                                      <div className="text1">
                                                        <span>
                                                          {data.categoryName}
                                                        </span>
                                                        <span>
                                                          <b>
                                                            {data.productName}
                                                          </b>
                                                        </span>
                                                        {data.uniqueItemCode ? (
                                                          <span>
                                                            {
                                                              data.uniqueItemCode
                                                            }
                                                          </span>
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                    <div className="right text2">
                                                      <div
                                                        style={{
                                                          float: "left",
                                                        }}
                                                      >
                                                        <span
                                                          className={
                                                            data.isCheck
                                                              ? "blueClr"
                                                              : ""
                                                          }
                                                        >
                                                          &#8377;
                                                          <b>{data.price}</b>
                                                        </span>
                                                        <b>
                                                          <span
                                                            className={
                                                              data.isCheck
                                                                ? "blueClr"
                                                                : ""
                                                            }
                                                          >
                                                            Q 1
                                                          </span>
                                                        </b>
                                                      </div>

                                                      {data.isCheck ? (
                                                        <img
                                                          src={RightBlue}
                                                          alt="Product"
                                                          width="15"
                                                          height="15"
                                                          className="mobileShapeR"
                                                          onClick={this.handleProductTabsChange.bind(
                                                            this,
                                                            2,
                                                            w,
                                                            data.uniqueItemCode
                                                          )}
                                                        />
                                                      ) : (
                                                        <img
                                                          src={RightShape}
                                                          alt="Product"
                                                          width="15"
                                                          height="15"
                                                          className="mobileShapeR"
                                                          onClick={this.handleProductTabsChange.bind(
                                                            this,
                                                            2,
                                                            w,
                                                            data.uniqueItemCode
                                                          )}
                                                        />
                                                      )}
                                                    </div>
                                                  </li>
                                                );
                                              }
                                            )
                                          : null}
                                        {this.state.wishListData.length === 0 &&
                                        this.state.isProductLoading ===
                                          false ? (
                                          <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                          />
                                        ) : null}
                                      </ul>
                                    </div>
                                  </Spin>
                                </Panel>

                                <Panel
                                  header={
                                    <div>
                                      <label>Recommended</label>
                                      <div style={{ float: "right" }}>
                                        <label className="plushMobile">
                                          ₹{this.state.totalRecommend}
                                        </label>
                                        <img
                                          src={Blueplus}
                                          alt="Product"
                                          width="20"
                                          height="20"
                                          onClick={this.handleOpenRecommendedListModal.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                    </div>
                                  }
                                  key="3"
                                >
                                  <Spin
                                    spinning={this.state.orderDetailsLoader}
                                  >
                                    <div className="ordersbox">
                                      <ul className="datawish">
                                        {this.state.recommendedData
                                          ? this.state.recommendedData.map(
                                              (data, r) => {
                                                return (
                                                  <li className="" key={r}>
                                                    <div className="left d-flex">
                                                      <img
                                                        src={encodeURI(
                                                          data.imageURL
                                                        )}
                                                        alt="Product"
                                                        width="25"
                                                        height="25"
                                                        onError={this.handleMobileProductNoImage.bind(
                                                          this
                                                        )}
                                                      />
                                                      <div className="text1">
                                                        <span>
                                                          {data.categoryName}
                                                        </span>
                                                        <span>
                                                          <b>
                                                            {data.productName}
                                                          </b>
                                                        </span>
                                                        {data.uniqueItemCode ? (
                                                          <span>
                                                            {
                                                              data.uniqueItemCode
                                                            }
                                                          </span>
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                    <div className="right text2">
                                                      <div
                                                        style={{
                                                          float: "left",
                                                        }}
                                                      >
                                                        <span
                                                          className={
                                                            data.isCheck
                                                              ? "blueClr"
                                                              : ""
                                                          }
                                                        >
                                                          &#8377;
                                                          <b>{data.price}</b>
                                                        </span>
                                                        <b>
                                                          <span
                                                            className={
                                                              data.isCheck
                                                                ? "blueClr"
                                                                : ""
                                                            }
                                                          >
                                                            Q 1
                                                          </span>
                                                        </b>
                                                      </div>

                                                      {data.isCheck ? (
                                                        <img
                                                          src={RightBlue}
                                                          alt="Product"
                                                          width="15"
                                                          height="15"
                                                          className="mobileShapeR"
                                                          onClick={this.handleProductTabsChange.bind(
                                                            this,
                                                            3,
                                                            r,
                                                            data.uniqueItemCode
                                                          )}
                                                        />
                                                      ) : (
                                                        <img
                                                          src={RightShape}
                                                          alt="Product"
                                                          width="15"
                                                          height="15"
                                                          className="mobileShapeR"
                                                          onClick={this.handleProductTabsChange.bind(
                                                            this,
                                                            3,
                                                            r,
                                                            data.uniqueItemCode
                                                          )}
                                                        />
                                                      )}
                                                    </div>
                                                  </li>
                                                );
                                              }
                                            )
                                          : null}
                                        {this.state.recommendedData.length ===
                                          0 &&
                                        this.state.isProductLoading ===
                                          false ? (
                                          <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                          />
                                        ) : null}
                                      </ul>
                                    </div>
                                  </Spin>
                                </Panel>
                              </Collapse>
                            </div>
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
        {/* Mobile View Message Suggestion*/}
        <Modal
          open={this.state.suggestionModalMob}
          onClose={this.onCloseMobSuggestionModal}
          center
          modalId={
            this.state.isMobileView
              ? "sharecamp-popup"
              : "desktop-conf-mob-popup"
          }
          overlayId={
            this.state.isMobileView ? "logout-ovrly" : "mobile-tabs-overlay"
          }
          classNames={{
            modal: this.state.isMobileView ? "nexticon-popupbottom" : "",
          }}
        >
          <div className="">
            <div className="input-group" style={{ background: "none" }}>
              <p className="cls-p-conf-mob">
                {TranslationContext !== undefined
                  ? TranslationContext.p.areyousureandwanttosend
                  : "Are you sure & want to send"}
                ?
              </p>
            </div>
            <hr
              style={{
                borderTop: "1px solid #bbb",
              }}
            ></hr>
            <p className="cls-p-sugg">{this.state.suggestionText}</p>
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
                onClick={this.handleSendMessageToCustomer.bind(
                  this,
                  this.state.suggestionText,
                  "",
                  "",
                  null
                )}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.button.yes
                  : "Yes"}
                <img src={SendUp} alt="send" className="send-up float-none" />
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
              <div
                className="ant-popover-buttons"
                style={{ marginLeft: "80px" }}
              >
                <button
                  type="button"
                  className="ant-btn ant-btn-sm"
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
                  className="ant-btn ant-btn-primary ant-btn-sm"
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
          open={this.state.mobileShopBagProcessMdl}
          onClose={this.handleCloseProcessModal.bind(this)}
          center
          modalId="mobileShopBagProcessMdl"
          overlayId="logout-ovrly"
        >
          <div className="divShopBagmdl">
            <span
              className={this.state.mobileChatActive === 1 ? "active" : ""}
              onClick={this.handleSendProductsOnChat.bind(
                this,
                false,
                "",
                "",
                ""
              )}
            >
              SEND TO CUSTOMER
            </span>
            <span
              className={this.state.mobileChatActive === 2 ? "active" : ""}
              onClick={this.handleRemoveProduct.bind(
                this,
                Number(this.state.uniqueItemID),
                "S"
              )}
            >
              REMOVE ITEMS
            </span>
            <span
              className={this.state.mobileChatActive === 3 ? "active" : ""}
              onClick={this.handleAddProductsToBagOrWishlist.bind(
                this,
                "shoppingbag"
              )}
            >
              ADD TO WISHLIST
            </span>
            <Popover
              // overlayClassName="antcustom ant-prodesc"
              // placement="topRight"
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
                    onClick={this.handleAddressModalOpen.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.addtoshoppingbag
                      : "Add to Shopping Bag"}
                  </button>
                </div>
              }
            >
              <button className="butn order-grid-butn">PROCESS TO ORDER</button>
            </Popover>
          </div>
        </Modal>

        <Modal
          open={this.state.mobileWishProcessMdl}
          onClose={this.handleCloseWishListModal.bind(this)}
          center
          modalId="mobileShopBagProcessMdl"
          overlayId="logout-ovrly"
        >
          <div className="divShopBagmdl">
            <span
              className={this.state.mobileChatActive === 1 ? "active" : ""}
              onClick={this.handleSendProductsOnChat.bind(
                this,
                false,
                "",
                "",
                ""
              )}
            >
              SEND TO CUSTOMER
            </span>
            <span
              className={this.state.mobileChatActive === 2 ? "active" : ""}
              onClick={this.handleRemoveProduct.bind(
                this,
                Number(this.state.uniqueItemID),
                "W"
              )}
            >
              REMOVE ITEMS
            </span>
            <span
              className={this.state.mobileChatActive === 3 ? "active" : ""}
              onClick={this.handleAddProductsToBagOrWishlist.bind(
                this,
                "wishlist"
              )}
            >
              ADD TO BAG
            </span>

            <Popover
              // overlayClassName="antcustom ant-prodesc"
              // placement="topRight"
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
                    onClick={this.handleAddressModalOpen.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.addtoshoppingbag
                      : "Add to Shopping Bag"}
                  </button>
                </div>
              }
            >
              <button className="butn order-grid-butn">PROCESS TO ORDER</button>
            </Popover>
          </div>
        </Modal>

        <Modal
          open={this.state.mobileRecommendProcessMdl}
          onClose={this.handleCloseRecommendedListModal.bind(this)}
          center
          modalId="mobileShopBagProcessMdl"
          overlayId="logout-ovrly"
        >
          <div className="divShopBagmdl">
            <span
              className={this.state.mobileChatActive === 1 ? "active" : ""}
              onClick={this.handleSendProductsOnChat.bind(
                this,
                false,
                "",
                "",
                ""
              )}
            >
              SEND TO CUSTOMER
            </span>
            <span
              className={this.state.mobileChatActive === 2 ? "active" : ""}
              onClick={this.handleAddProductsToBagOrWishlist.bind(
                this,
                "wishlist"
              )}
            >
              ADD TO WISHLIST
            </span>
            <span
              className={this.state.mobileChatActive === 3 ? "active" : ""}
              onClick={this.handleAddProductsToBagOrWishlist.bind(
                this,
                "shoppingbag"
              )}
            >
              ADD TO BAG
            </span>

            <Popover
              // overlayClassName="antcustom ant-prodesc"
              // placement="topRight"
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
                    onClick={this.handleAddressModalOpen.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.addtoshoppingbag
                      : "Add to Shopping Bag"}
                  </button>
                </div>
              }
            >
              <button className="butn order-grid-butn">PROCESS TO ORDER</button>
            </Popover>
          </div>
        </Modal>
        {/* mobile suggetion modal */}
        <Modal
          open={this.state.suggestionTagModal}
          onClose={this.handleSuggestionTagModalClose.bind(this)}
          center
          modalId="suggetionModalMobile-popup"
          overlayId="logout-ovrly"
          classNames={{ modal: "customername-popupbottom" }}
        >
          <div style={{ padding: "20px", paddingTop: 0, paddingBottom: 0 }}>
            <div
              className="closemob"
              onClick={this.handleSuggestionTagModalClose.bind(this)}
            ></div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <img src={Blub} className="bulb-img" alt="icon missing" />
                <p className="smart-para">SMART MESSAGING</p>
              </div>
              <img
                src={DownArrowChat}
                alt="icon missing"
                onClick={this.handleSuggestionTagModalClose.bind(this)}
              />
            </div>
            <Spin spinning={this.state.isSuggestionLoad}>
              <div>
                <label className="tag-label">Tags</label>
                <div className="tags-cntr-mob">
                  {this.state.messageSuggestionTagsData !== null
                    ? this.state.messageSuggestionTagsData.map((item, i) => {
                        return (
                          <button
                            onClick={this.handleTagsButtonClick.bind(
                              this,
                              item.tagID
                            )}
                            className={
                              this.state.selectedTags === item.tagID
                                ? "tagsbtn-active"
                                : "tagsbtn"
                            }
                            id={item.tagID}
                          >
                            {item.tagName}
                          </button>
                        );
                      })
                    : null}
                </div>
                <label className="tag-label">Top Messages</label>
                {this.state.messageSuggestionData !== null &&
                  this.state.messageSuggestionData.length > 0 &&
                  this.state.messageSuggestionData.length > 0 && (
                    <div
                      className="suggestions-cntr setpagination sugg-mob-height"
                      style={{ width: "100%" }}
                    >
                      <Table
                        noDataContent="No Record Found"
                        style={{ width: "100%" }}
                        className="components-table-demo-nested antd-table-campaign custom-antd-table rm-header hidepagebtn"
                        columns={[
                          {
                            dataIndex: "suggestionText",
                            render: (row, rowData) => {
                              i = i + 1;
                              return (
                                <div
                                  className={
                                    this.state.chkSuggestion ===
                                    rowData.suggestionID
                                      ? "suggestions-tick"
                                      : ""
                                  }
                                  style={{
                                    width: "100%",
                                  }}
                                  id={i}
                                  onClick={this.onOpenMobSuggestionModalNew.bind(
                                    this,
                                    rowData.suggestionText,
                                    rowData.suggestionID
                                  )}
                                >
                                  <Tooltip
                                    placement="left"
                                    title={rowData.suggestionText}
                                  >
                                    <span>{rowData.suggestionText}</span>
                                  </Tooltip>
                                </div>
                              );
                            },
                          },
                        ]}
                        dataSource={this.state.messageSuggestionData.filter(
                          (x) => x.tagID == this.state.selectedTags
                        )}
                        pagination={{
                          itemRender: PaginationButton,
                          pageSize: 10,
                          defaultPageSize: 10,
                        }}
                      ></Table>
                    </div>
                  )}
                {this.state.messageSuggestionData.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : null}
              </div>
            </Spin>

            <div>
              <button
                className="suggestionsml-btn-send"
                onClick={this.handlesuggestionConfModalOpen.bind(this)}
              >
                Send
              </button>
            </div>
          </div>
        </Modal>

        {/* mobile card modal */}
        <Modal
          open={this.state.cardModal}
          onClose={this.handleCardModalClose.bind(this)}
          center
          modalId="cardModalMobile-popup"
          overlayId="logout-ovrly"
          classNames={{ modal: "customername-popupbottom" }}
        >
          <div style={{ padding: "20px", paddingTop: 0, paddingBottom: 0 }}>
            <div
              className="closemob"
              onClick={this.handleCardModalClose.bind(this)}
            ></div>
            <Spin spinning={this.state.isCardSearch}>
              <div className="row product-card">
                {this.state.searchCardData !== null
                  ? this.state.searchCardData.map((item, i) => {
                      return (
                        <div className="col-md-6" key={i}>
                          {item.itemID === this.state.selectedCard ? (
                            <div className="selectdot">
                              <img src={CardTick} alt={"select-card"} />
                            </div>
                          ) : null}
                          <div className="card" id={"card" + item.itemID}>
                            <div className="card-body position-relative">
                              <div
                                className="row"
                                style={{
                                  margin: "0",
                                }}
                              >
                                <div
                                  className="col-4 col-md-4 mb-md-0 mb-2"
                                  style={{
                                    alignSelf: "center",
                                  }}
                                >
                                  {(item.imageURL !== "" || item.imageUrl) &&
                                  this.state.cardConfigData.ImageURL ? (
                                    <img
                                      className="chat-product-img"
                                      src={item.imageURL || item.imageUrl}
                                      alt="Product Image"
                                      title={item.productName || item.name}
                                    />
                                  ) : (
                                    <Dropzone
                                      maxSize={5242880}
                                      accept="image/jpeg, image/png,image/jpg"
                                      onDrop={this.handleInsertCardImageUpload.bind(
                                        this,
                                        item.uniqueItemCode || item.itemCode
                                      )}
                                    >
                                      {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
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
                                <div
                                  className="col-8 col-md-8 bkcprdt"
                                  onClick={this.handleSelectCard.bind(
                                    this,
                                    item.itemID,
                                    item.imageURL || item.imageUrl
                                  )}
                                >
                                  {(item.productName || item.name) &&
                                  this.state.cardConfigData.ItemName ? (
                                    <div>
                                      <label className="chat-product-name">
                                        {item.productName || item.name}
                                      </label>
                                    </div>
                                  ) : null}
                                  <div>
                                    {item.brandName &&
                                    this.state.cardConfigData.Brand ? (
                                      <label className="chat-product-code">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.brand
                                          : "Brand"}
                                        :{" " + item.brandName}
                                      </label>
                                    ) : null}
                                  </div>
                                  <div>
                                    {item.categoryName !== "" &&
                                    item.categoryName !== null &&
                                    this.state.cardConfigData.Category ? (
                                      <label className="chat-product-code">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.category
                                          : "Category"}
                                        :{" " + item.categoryName}
                                      </label>
                                    ) : null}
                                  </div>
                                  <div>
                                    {item.subCategoryName &&
                                    this.state.cardConfigData.SubCategory ? (
                                      <label className="chat-product-code">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.subcategory
                                          : "SubCategory"}
                                        :{" " + item.subCategoryName}
                                      </label>
                                    ) : null}
                                  </div>
                                  {this.state.sourceType === "cb" ? (
                                    <div>
                                      {item.color &&
                                      this.state.cardConfigData.Color ? (
                                        <label className="chat-product-code">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.color
                                            : "Color"}
                                          :{" " + item.color}
                                        </label>
                                      ) : null}
                                    </div>
                                  ) : (
                                    <div>
                                      {item.availableColor &&
                                      this.state.cardConfigData.Color ? (
                                        <label className="chat-product-code">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.color
                                            : "Color"}
                                          :{item.availableColor.join()}
                                        </label>
                                      ) : null}
                                    </div>
                                  )}
                                  {this.state.sourceType === "cb" ? (
                                    <div>
                                      {item.size &&
                                      this.state.cardConfigData.Size ? (
                                        <label className="chat-product-code">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.color
                                            : "Size"}
                                          :{" " + item.size}
                                        </label>
                                      ) : null}
                                    </div>
                                  ) : item.availableSize &&
                                    this.state.cardConfigData.Size ? (
                                    <label className="chat-product-code">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.color
                                        : "Size"}
                                      :{" " + item.availableSize.join()}
                                    </label>
                                  ) : null}
                                  {this.state.sourceType === "cb" ? (
                                    <div>
                                      {item.uniqueItemCode &&
                                      this.state.cardConfigData.ItemCode ? (
                                        <label className="chat-product-code">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.itemcode
                                            : "Item Code"}
                                          :{" " + item.uniqueItemCode}
                                        </label>
                                      ) : null}
                                    </div>
                                  ) : (
                                    <div>
                                      {item.itemCode &&
                                      this.state.cardConfigData.ItemCode ? (
                                        <label className="chat-product-code">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.itemcode
                                            : "Item Code"}
                                          :{" " + item.itemCode}
                                        </label>
                                      ) : null}
                                    </div>
                                  )}
                                  <div>
                                    {item.discount !== "" &&
                                    parseFloat(item.discount) !== 0 &&
                                    item.discount !== null &&
                                    this.state.cardConfigData.discount ? (
                                      <label className="chat-product-code">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.discount
                                          : "Discount"}
                                        :{" " + item.discount}
                                      </label>
                                    ) : null}
                                  </div>
                                  <div>
                                    {item.price !== "" &&
                                    parseFloat(item.price) !== 0 &&
                                    item.price !== null &&
                                    this.state.cardConfigData.Price ? (
                                      <label className="chat-product-prize">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.price
                                          : "Price"}
                                        :{" " + item.price}
                                      </label>
                                    ) : null}
                                  </div>
                                  {item.url && this.state.cardConfigData.Url ? (
                                    <div>
                                      <a
                                        href={item.url}
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
                    })
                  : null}
              </div>
              {this.state.searchCardData.length === 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : null}
            </Spin>
            {this.state.isCardSend ? (
              <lable className="cardsucclbl">Card Send Successfully.</lable>
            ) : null}
            {this.state.isSelectedCard ? (
              <lable className="cardsucclblNot">Please Select Card.</lable>
            ) : null}
            <div>
              <button
                onClick={this.handleSendCard.bind(this)}
                className="suggestionsml-btn-send"
                style={{ marginBottom: "10px", outline: "none" }}
              >
                Send
              </button>
            </div>
          </div>
        </Modal>
        {/* Mobile Grammarly Check Modal  */}
        {/* <Modal
          open={this.state.grammarlyModal}
          onClose={this.handleGrammarlyModalClose.bind(this)}
          center
          modalId="grammarlyModalMobile-popup"
          overlayId="logout-ovrly"
          classNames={{ modal: "customername-popupbottom" }}
        >
          <div style={{ padding: "20px", paddingTop: 0, paddingBottom: 0 }}>
            <div
              className="closemob"
              onClick={this.handleGrammarlyModalClose.bind(this)}
            ></div>
            <div>
              <div className="textcorret">
                {Object.keys(this.state.Suggested_Words).length > 0
                  ? Object.keys(this.state.Suggested_Words).map((item, i) => {
                      return (
                        <div className="row">
                          <div className="col-md">
                            <span className="oval"></span>
                            <label className="textcorret-lab1">{item}</label>
                          </div>

                          <div className="col-md">
                            {this.state.Suggested_Words[item].length > 0
                              ? this.state.Suggested_Words[item].map(
                                  (key, j) => {
                                    return (
                                      <label
                                        className={
                                          this.state.selectedSuggested_Words[
                                            item
                                          ] === key
                                            ? "textcorret-lab2-active"
                                            : "textcorret-lab2"
                                        }
                                        key={j}
                                        onClick={this.handleSuggetionWordClick.bind(
                                          this,
                                          item,
                                          key
                                        )}
                                      >
                                        {key}
                                      </label>
                                    );
                                  }
                                )
                              : null}
                          </div>
                        </div>
                      );
                    })
                  : null}
                {this.state.Profane_Words.length > 0 ? (
                  <div className="row">
                    <div className="col-md">
                      <span className="oval"></span>
                      <label className="textcorret-lab1">Profanity</label>
                    </div>

                    <div className="col-md">
                      {this.state.Profane_Words.map((item, i) => {
                        return (
                          <label className="textcorret-lab2" key={i}>
                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="row">
                <div className="col-md">
                  <button
                    className="textcorret-btnignore"
                    onClick={this.handleGrammarlyIgnore.bind(this)}
                  >
                    Ignore
                  </button>
                  <button
                    className="textcorret-btnapply"
                    onClick={this.handleGrammarlyApply.bind(this)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

          
          </div>
        </Modal> */}
      </React.Fragment>
    );
  }
}

export default Chatbot;

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}
