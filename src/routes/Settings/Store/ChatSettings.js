import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Select, Popover, Checkbox } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/free-solid-svg-icons";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
const { Option } = Select;

class ChatSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agentChatSessionDuration: "M",
      agentChatSessionValue: "",
      chatDisplayValue: "",
      chatDisplayDurationHour: "D",
      isAgentChatSessionValue: "",
      isCustomerChatSessionValue: "",
      isChatDisplayValue: "",
      programCode: "",
      translateLanguage: {},
      cardConfigData: [],
      cardItemEnable: "",
      cardItemDisable: "",
      selectedTab: "chat",
      cardConfigName: "",
      cardConfigStatus: "",
      isLoadingAdd: false,
      isLoadingUpdate: false,
      isManual: false,
      isAutoMatic: false,
      approvalTypeData: [],
      limitText: "",
      chatSoundData: [],
      newChatSoundVolume: 0,
      newMessageSoundVolume: 0,
      isNotiNewChat: false,
      isNotiNewMessage: false,
      newChatSoundID: 0,
      newMessageSoundID: 0,
      buttonClickCSS: 0,
      nsId: 0,
      isLoading: false,
      isProfileAndProduct: false,
      endChatMessage: "",
      notificationTime: 0,
      isMessageTabActive: false,
      isCardTabActive: false,
      isRecommendedListTabActive: false,
      isScheduleVisitTabActive: false,
      isPaymentLinkTabActive: false,
      isCustomerProfile: false,
      isCustomerProduct: false,
      customerChatSessionValue: "",
      customerChatSessionDuration: "M",
      cardSearchStoreCode: false,
      // isgrammarlyCheck:false
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem("module")) {
      var moduleData = JSON.parse(window.localStorage.getItem("module"));
      if (moduleData) {
        var campModule = moduleData.filter(
          (x) => x.moduleName === "Settings" && x.modulestatus === true
        );
        if (campModule.length === 0) {
          this.props.history.push("/store/404notfound");
        }
      }
    }
    this.handleGetChatSession();
    this.handleGetCardConfiguration();
    this.handleGetCardImageApproval();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
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
            agentChatSessionDuration: data.agentChatSessionDuration,
            agentChatSessionValue: data.agentChatSessionValue,
            chatDisplayValue: data.chatDisplayValue,
            chatDisplayDurationHour: data.chatDisplayDuration,
            programCode: data.programCode,
            limitText: data.chatCharLimit,
            isMessageTabActive: data.message,
            isCardTabActive: data.card,
            isRecommendedListTabActive: data.recommendedList,
            isScheduleVisitTabActive: data.scheduleVisit,
            isPaymentLinkTabActive: data.paymentLink,
            isCustomerProfile: data.customerProfile,
            isCustomerProduct: data.customerProduct,
            customerChatSessionDuration: data.customerChatSessionDuration,
            customerChatSessionValue: data.customerChatSessionValue,
            cardSearchStoreCode: data.cardSearchStoreCode,
            // isgrammarlyCheck: data.grammarlyCheck,
          });
        } else {
          self.setState({
            agentChatSessionDuration: "",
            agentChatSessionValue: "",
            customerChatSessionValue: "",
            customerChatSessionDuration: "",
            chatDisplayValue: "",
            chatDisplayDurationHour: "",
            limitText: "",
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSession");
      });
  }

  //handle update chate session
  handleUpdateChatSession() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (
      this.state.isChatDisplayValue === "" &&
      this.state.isAgentChatSessionValue === "" &&
      this.state.isCustomerChatSessionValue === ""
    ) {
      axios({
        method: "post",
        // url: config.apiUrl + "/CustomerChat/UpdateChatSession",
        url: config.apiUrl + "/CustomerChat/UpdateChatSessionNew",
        headers: authHeader(),
        data: {
          CustomerChatSessionValue: Number(this.state.customerChatSessionValue),
          CustomerChatSessionDuration: this.state.customerChatSessionDuration,
          ChatDisplayValue: Number(this.state.chatDisplayValue),
          ChatDisplayDuration: this.state.chatDisplayDurationHour,
          ChatCharLimit: Number(this.state.limitText),
          Message: this.state.isMessageTabActive,
          Card: this.state.isCardTabActive,
          RecommendedList: this.state.isRecommendedListTabActive,
          ScheduleVisit: this.state.isScheduleVisitTabActive,
          PaymentLink: this.state.isPaymentLinkTabActive,
          CustomerProfile: this.state.isCustomerProfile,
          CustomerProduct: this.state.isCustomerProduct,
          AgentChatSessionValue: Number(this.state.agentChatSessionValue),
          AgentChatSessionDuration: this.state.agentChatSessionDuration,
          CardSearchStoreCode: this.state.cardSearchStoreCode,
          // GrammarlyCheck: this.state.isgrammarlyCheck,
        },
      })
        .then((response) => {
          var message = response.data.message;
          if (message === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record Updated Successfully"
            );
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            NotificationManager.console.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotupdated
                : "Record Not Updated"
            );
          }
        })
        .catch((response) => {
          console.log(response, "---handleUpdateChatSession");
        });
    }
  }
  //handle submit button
  handleSubmit() {
    if (this.state.agentChatSessionValue === "") {
      this.setState({
        isAgentChatSessionValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isAgentChatSessionValue: "",
      });
    }
    if (this.state.customerChatSessionValue === "") {
      this.setState({
        isCustomerChatSessionValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isCustomerChatSessionValue: "",
      });
    }
    if (this.state.chatDisplayValue === "") {
      this.setState({
        isChatDisplayValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isChatDisplayValue: "",
      });
    }

    setTimeout(() => {
      this.handleUpdateChatSession();
    }, 10);
  }

  //handle change textbox
  handleOnChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: "",
      });
    }
  }
  //handle on change drop-dow
  handleAgentSessionDuration(e) {
    this.setState({ agentChatSessionDuration: e });
  }
  // handle customer session duration change
  handleCustomerSessionDuration(e) {
    this.setState({ customerChatSessionDuration: e });
  }
  //handle chat display duration hour
  handleChatDisplayDurationHour(e) {
    this.setState({ chatDisplayDurationHour: e });
  }
  ///handle chack radio button
  checkModule = (id) => {
    for (let i = 0; i < this.state.cardConfigData.length; i++) {
      if (this.state.cardConfigData[i].cardItemID === id) {
        var isEnabled = this.state.cardConfigData[i].isEnabled;
        this.state.cardConfigData[i].isEnabled = !isEnabled;
      }
    }
    this.setState({
      cardConfigData: this.state.cardConfigData,
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
          self.setState({ cardConfigData: responseData });
        } else {
          self.setState({ cardConfigData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardConfiguration");
      });
  }
  //handle update card item configuration
  handleUpdateCardItemConfiguration() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var enabledCardItems = "";
    var disabledCardItems = "";
    for (let i = 0; i < this.state.cardConfigData.length; i++) {
      if (this.state.cardConfigData[i].isEnabled) {
        enabledCardItems += this.state.cardConfigData[i].cardItemID + ",";
      } else {
        disabledCardItems += this.state.cardConfigData[i].cardItemID + ",";
      }
    }
    this.setState({ isLoadingUpdate: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateCardItemConfiguration",
      headers: authHeader(),
      params: {
        EnabledCardItems: enabledCardItems,
        DisabledCardItems: disabledCardItems,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully"
          );
          self.setState({ isLoadingUpdate: false });
          self.handleGetCardConfiguration();
          debugger
          window.location.reload();
        } else {
          self.setState({ isLoadingUpdate: false });
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotupdated
              : "Record Not Updated"
          );
        }
      })
      .catch((response) => {
        console.log(response, "---handleUpdateCardItemConfiguration");
      });
  }

  //handle card item insert configuration
  handleInsertCardItemConfiguration() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var cardItem = this.state.cardConfigName;
    var isEnabled = this.state.cardConfigStatus;
    if (cardItem !== "" && isEnabled !== "") {
      this.setState({ isLoadingAdd: true });
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/InsertCardItemConfiguration",
        headers: authHeader(),
        params: {
          CardItem: cardItem,
          IsEnabled: isEnabled,
        },
      })
        .then(function(response) {
          var message = response.data.message;
          var responseData = response.data.responseData;
          if (message === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage
                    .carditemconfigurationaddsuccessfully
                : "Card item configuration add successfully!"
            );
            self.setState({ isLoadingAdd: false });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            self.handleGetCardConfiguration();
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.carditemconfigurationnotadded
                : "Card item configuration not add"
            );
            self.setState({ isLoadingAdd: false });
          }
        })
        .catch((response) => {
          console.log(response, "---handleUpdateCardItemConfiguration");
        });
    }
  }
  //handle on change of input fild
  handleOnChangeCardItem = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  //handle change type
  handleTypeChange = (e) => {
    var id = e.target.id;

    if (id === "Automatic") {
      if (this.state.approvalTypeData[1].isEnabled) {
        this.state.approvalTypeData[1].isEnabled = false;
        this.state.approvalTypeData[0].isEnabled = true;
      } else {
        this.state.approvalTypeData[0].isEnabled = true;
      }
    } else {
      if (this.state.approvalTypeData[0].isEnabled) {
        this.state.approvalTypeData[0].isEnabled = false;
        this.state.approvalTypeData[1].isEnabled = true;
      } else {
        this.state.approvalTypeData[1].isEnabled = true;
      }
    }
    this.setState({ approvalTypeData: this.state.approvalTypeData });
  };

  //handle get card =image approval
  handleGetCardImageApproval() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetCardImageApproval",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          self.setState({ approvalTypeData: responseData });
        } else {
          self.setState({ approvalTypeData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageApproval");
      });
  }

  //handle update card image approval
  handleUpdateCardImageApproval() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var id = this.state.approvalTypeData.filter((x) => x.isEnabled === true)[0]
      .id;

    this.setState({ isLoadingAdd: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateCardImageApproval",
      headers: authHeader(),
      params: { ID: id },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success") {
          self.setState({ isLoadingAdd: false });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully"
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          self.handleGetCardImageApproval();
        } else {
          self.setState({ isLoadingAdd: false });
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotupdated
              : "Record Not Updated"
          );
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardImageApproval");
      });
  }
  //handle tab change
  handleTabChange = (lable) => {
    this.setState({
      selectedTab: lable,
    });
    if (lable === "Notifications & Sounds") {
      this.handleGetChatSoundList();
      this.handleGetChatSoundNotiSetting();
    }
  };

  //handle get chat sound list data
  handleGetChatSoundList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetChatSoundList",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var chatSoundData = response.data.responseData;
        if (message === "Success" && chatSoundData) {
          self.setState({ chatSoundData });
        } else {
          self.setState({ chatSoundData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSoundList");
      });
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
            newChatSoundID: responseData.newChatSoundID || 0,
            newMessageSoundID: responseData.newMessageSoundID || 0,
            newChatSoundVolume: responseData.newChatSoundVolume || 0,
            newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
            isNotiNewChat: responseData.isNotiNewChat || false,
            isNotiNewMessage: responseData.isNotiNewMessage || false,
            notificationTime: responseData.notificationTime || 0,
            nsId: responseData.id || false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSoundNotiSetting");
      });
  };
  //handle update chat notification settings
  handleUpdateChatSoundNotiSetting = (isDefualt) => {
    let self = this;
    this.setState({ isloading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateChatSoundNotiSetting",
      headers: authHeader(),
      data: {
        NewChatSoundID: this.state.newChatSoundID,
        NewChatSoundVolume: this.state.newChatSoundVolume,
        NewMessageSoundID: this.state.newMessageSoundID,
        NewMessageSoundVolume: this.state.newMessageSoundVolume,
        IsNotiNewChat: this.state.isNotiNewChat,
        IsNotiNewMessage: this.state.isNotiNewMessage,
        NotificationTime: this.state.notificationTime,
        ID: this.state.nsId,
        IsDefault: isDefualt || false,
      },
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;

        if (message === "Success" && responseData) {
          NotificationManager.success("Record Updated Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          self.handleGetChatSoundNotiSetting();
          self.setState({ isloading: false });
        } else {
          NotificationManager.error("Record Not Updated");
          self.setState({ isloading: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleUpdateChatSoundNotiSetting");
        self.setState({ isloading: false });
      });
  };
  //handle chat assinged volumn change
  handleChatAssingedVolumnChange = (e) => {
    this.setState({
      newChatSoundVolume: e,
    });
    if (Number(this.state.newChatSoundID)) {
      var soundName = this.state.chatSoundData.filter(
        (x) => x.soundID === Number(this.state.newChatSoundID)
      )[0].soundFileName;

      const Sound1Play = new Audio(config.soundURL + soundName);
      Sound1Play.volume = Math.round(e / 10) / 10;
      Sound1Play.play();
    }
  };
  //handle new message volumn change
  handleNewMessageVolumnChange = (e) => {
    this.setState({ newMessageSoundVolume: e });
    if (Number(this.state.newMessageSoundID)) {
      var soundName = this.state.chatSoundData.filter(
        (x) => x.soundID === Number(this.state.newMessageSoundID)
      )[0].soundFileName;
      const Sound1Play = new Audio(config.soundURL + soundName);
      Sound1Play.volume = Math.round(e / 10) / 10;
      Sound1Play.play();
    }
  };
  //handle button click to set css
  handleButtonClick = (no) => {
    this.setState({ buttonClickCSS: no });
    if (no === 3) {
      this.handleUpdateChatSoundNotiSetting();
    }
    if (no === 2) {
      this.handleRestDefualtButtonClick();
    }
    if (no === 1) {
      this.props.history.push("/store/settings");
    }
  };
  //handle sound dropdown change
  handleSoundDropdownChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    if (name === "newChatSoundID") {
      this.setState({ newChatSoundID: value });
    } else {
      this.setState({ newMessageSoundID: value });
    }
  };

  //handle notification checkbox change
  handleNotificationCheckboxChange = (e) => {
    var name = e.target.name;
    if (name === "isNotiNewChat") {
      this.setState({ isNotiNewChat: e.target.checked });
    } else {
      this.setState({ isNotiNewMessage: e.target.checked });
    }
  };

  //handle reset defualt click
  handleRestDefualtButtonClick = () => {
    var newChatSoundID = 0;
    var newMessageSoundID = 0;
    if (this.state.chatSoundData.length > 0) {
      newChatSoundID = this.state.chatSoundData[0].soundID;
      newMessageSoundID = this.state.chatSoundData[0].soundID;
    }
    this.setState({
      newChatSoundID,
      newMessageSoundID,
      newChatSoundVolume: 50,
      newMessageSoundVolume: 50,
    });
    setTimeout(() => {
      this.handleUpdateChatSoundNotiSetting(true);
    }, 10);
  };
  //handle chat tab radio button change
  handleRadioButtonChange = (e) => {
    var name = e.target.name;

    if (name === "isMessageTabActive") {
      this.setState({ isMessageTabActive: e.target.checked });
    }
    if (name === "isCardTabActive") {
      this.setState({ isCardTabActive: e.target.checked });
    }
    if (name === "isRecommendedListTabActive") {
      this.setState({ isRecommendedListTabActive: e.target.checked });
    }
    if (name === "isScheduleVisitTabActive") {
      this.setState({ isScheduleVisitTabActive: e.target.checked });
    }
    if (name === "isPaymentLinkTabActive") {
      this.setState({ isPaymentLinkTabActive: e.target.checked });
    }
    if (name === "isCustomerProfile") {
      this.setState({ isCustomerProfile: e.target.checked });
    }
    if (name === "isCustomerProduct") {
      this.setState({ isCustomerProduct: e.target.checked });
    }
    if (name === "cardSearchStoreCode") {
      this.setState({ cardSearchStoreCode: e.target.checked });
    }
    // if (name === "isgrammarlyCheck") {
    //   this.setState({ isgrammarlyCheck: e.target.checked });
    // }
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.chatsetting
              : "Chat Settings"}
          </Link>
        </div>
        <div className="Store-paddmodule storeModule">
          <div className="module-tabs chat-tabslst">
            <section>
              <Tabs
                onSelect={(index, label) => {
                  this.handleTabChange(label);
                }}
                selected={this.state.selectedTab}
              >
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.chat
                      : "Chat"
                  }
                >
                  <div className="row chattab-card">
                    <div className="col-md-12">
                      <div
                        className="card"
                        style={{ padding: "35px", height: "auto" }}
                      >
                        <div className="chat-drop-down">
                          <div
                            className="row"
                            style={{ width: "100%", margin: "0" }}
                          >
                            <div className="col-md-3">
                              {TranslationContext !== undefined
                                ? TranslationContext.div.programcode
                                : "Program Code"}
                            </div>
                            <div className="col-md-3">
                              <Select
                                showArrow={true}
                                style={{ width: "100%", marginBottom: "10px" }}
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .selectprogramcode
                                    : "Select program code"
                                }
                                value={this.state.programCode}
                                disabled={true}
                              >
                                <Option value={this.state.programCode}>
                                  {this.state.programCode}
                                </Option>
                              </Select>
                            </div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                          </div>
                        </div>

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            {TranslationContext !== undefined
                              ? TranslationContext.div.agentchatsessiontimeout
                              : "Agent Chat Session Time Out"}
                          </div>
                          <div className="col-md-3">
                            <div className="chattxtdivcus">
                              <input
                                type="text"
                                className="chatsetngtxt"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder.entervalue
                                    : "Enter value"
                                }
                                name="agentChatSessionValue"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.agentChatSessionValue}
                                maxLength={2}
                              />
                              <Select
                                showArrow={true}
                                defaultValue="M"
                                style={{ marginLeft: "10px" }}
                                name="agentChatSessionDuration"
                                onChange={this.handleAgentSessionDuration.bind(
                                  this
                                )}
                                value={this.state.agentChatSessionDuration}
                              >
                                <Option value="M">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.m
                                    : "M"}
                                </Option>
                                <Option value="H">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.h
                                    : "H"}
                                </Option>
                                <Option value="D">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.d
                                    : "D"}
                                </Option>
                              </Select>
                              <Popover content={<></>} placement="bottom">
                                <img
                                  className="info-icon-cp"
                                  style={{ visibility: "hidden" }}
                                  src={BlackInfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>
                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            {TranslationContext !== undefined
                              ? TranslationContext.div
                                  .customerchatsessiontimeout
                              : "Customer Chat Session Time Out"}
                          </div>
                          <div className="col-md-3">
                            <div className="chattxtdivcus">
                              <input
                                type="text"
                                className="chatsetngtxt"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder.entervalue
                                    : "Enter value"
                                }
                                name="customerChatSessionValue"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.customerChatSessionValue}
                                maxLength={2}
                              />
                              <Select
                                showArrow={true}
                                defaultValue="M"
                                style={{ marginLeft: "10px" }}
                                name="customerChatSessionDuration"
                                onChange={this.handleCustomerSessionDuration.bind(
                                  this
                                )}
                                value={this.state.customerChatSessionDuration}
                              >
                                <Option value="M">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.m
                                    : "M"}
                                </Option>
                                <Option value="H">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.h
                                    : "H"}
                                </Option>
                                <Option value="D">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.d
                                    : "D"}
                                </Option>
                              </Select>
                              <Popover
                                content={
                                  <>
                                    {" "}
                                    {TranslationContext !== undefined
                                      ? TranslationContext.content
                                          .howmanydaystoshowchathistory
                                      : "How many days to show chat history."}
                                  </>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon-cp"
                                  style={{ visibility: "hidden" }}
                                  src={BlackInfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            {TranslationContext !== undefined
                              ? TranslationContext.div.historicalchattime
                              : "Historical Chat Time"}
                          </div>
                          <div className="col-md-3">
                            <div className="chattxtdivcus">
                              <input
                                type="text"
                                className="chatsetngtxt"
                                placeholder={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder.entervalue
                                    : "Enter value"
                                }
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.chatDisplayValue}
                                maxLength={2}
                                name="chatDisplayValue"
                              />
                              <Select
                                showArrow={true}
                                defaultValue="D"
                                style={{ marginLeft: "10px" }}
                                onChange={this.handleChatDisplayDurationHour.bind(
                                  this
                                )}
                                value={this.state.chatDisplayDurationHour}
                              >
                                <Option value="M">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.m
                                    : "M"}
                                </Option>
                                <Option value="H">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.h
                                    : "H"}
                                </Option>
                                <Option value="D">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.option.d
                                    : "D"}
                                </Option>
                              </Select>
                              <Popover
                                content={
                                  <>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.content
                                          .howmanydaystoshowchathistory
                                      : "How many days to show chat history."}
                                  </>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon-cp"
                                  src={BlackInfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            {TranslationContext !== undefined
                              ? TranslationContext.div
                                  .setlimittypeboxofchatwindow
                              : "Set Limit Type box of Chat Window"}
                          </div>
                          <div className="col-md-3">
                            <input
                              type="text"
                              className="chatsetngtxt"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.placeholder.entervalue
                                  : "Enter value"
                              }
                              name="limitText"
                              onChange={this.handleOnChange.bind(this)}
                              value={this.state.limitText}
                              // maxLength={3}
                            />
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Customer Profile in Chat Window
                          </div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isCustomerProfile"
                                  name="isCustomerProfile"
                                  checked={this.state.isCustomerProfile}
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                />
                                <label
                                  htmlFor="isCustomerProfile"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Customer Product Tab in Chat Window
                          </div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isCustomerProduct"
                                  name="isCustomerProduct"
                                  checked={this.state.isCustomerProduct}
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                />
                                <label
                                  htmlFor="isCustomerProduct"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Message Tab in Chat Window
                          </div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isMessageTabActive"
                                  name="isMessageTabActive"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={this.state.isMessageTabActive}
                                />
                                <label
                                  htmlFor="isMessageTabActive"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>
                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Card Tab in Chat Window
                          </div>
                          <div className="col-md-1">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isCardTabActive"
                                  name="isCardTabActive"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={this.state.isCardTabActive}
                                />
                                <label
                                  htmlFor="isCardTabActive"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            Card Search With Store Code
                          </div>
                          <div className="col-md-5">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="cardSearchStoreCode"
                                  name="cardSearchStoreCode"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={this.state.cardSearchStoreCode}
                                />
                                <label
                                  htmlFor="cardSearchStoreCode"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Reccomended List Tab in Chat Window
                          </div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isRecommendedListTabActive"
                                  name="isRecommendedListTabActive"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={
                                    this.state.isRecommendedListTabActive
                                  }
                                />
                                <label
                                  htmlFor="isRecommendedListTabActive"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>
                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Schedual Visit Tab in Chat Window
                          </div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isScheduleVisitTabActive"
                                  name="isScheduleVisitTabActive"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={this.state.isScheduleVisitTabActive}
                                />
                                <label
                                  htmlFor="isScheduleVisitTabActive"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>
                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">
                            Generate Payment Link Tab in Chat Window
                          </div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isPaymentLinkTabActive"
                                  name="isPaymentLinkTabActive"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={this.state.isPaymentLinkTabActive}
                                />
                                <label
                                  htmlFor="isPaymentLinkTabActive"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>
                        {/* <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3">Grammarly Check</div>
                          <div className="col-md-3">
                            <div className="module-switch crm-margin-div crm-padding-div">
                              <div className="switch switch-primary d-inline m-r-10">
                                <input
                                  type="checkbox"
                                  id="isgrammarlyCheck"
                                  name="isgrammarlyCheck"
                                  onChange={this.handleRadioButtonChange.bind(
                                    this
                                  )}
                                  checked={this.state.isgrammarlyCheck}
                                />
                                <label
                                  htmlFor="isgrammarlyCheck"
                                  className="cr cr-float-right"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div> */}

                        <div
                          className="row"
                          style={{ width: "100%", margin: "0" }}
                        >
                          <div className="col-md-3"></div>
                          <div className="col-md-3">
                            <div>
                              <button
                                className="butn"
                                type="button"
                                onClick={this.handleSubmit.bind(this)}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.submit
                                  : "SUBMIT"}
                              </button>
                            </div>
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.charditemconfiguration
                      : "Card Item Configuration"
                  }
                >
                  <div
                    className="row chattab-card"
                    style={{ marginBottom: "15px" }}
                  >
                    <div className="col-md-12">
                      <div className="card" style={{ height: "auto" }}>
                        <div className="row">
                          <div className="col-md-5 m-auto">
                            <div className="right-sect-div">
                              <h3>
                                {TranslationContext !== undefined
                                  ? TranslationContext.h3.charditemconfiguration
                                  : "CARD ITEM CONFIGURATION"}
                              </h3>

                              {this.state.cardConfigData !== null &&
                                this.state.cardConfigData.map((item, i) => (
                                  <div
                                    className="module-switch crm-margin-div crm-padding-div"
                                    key={i}
                                  >
                                    <div className="switch switch-primary d-inline m-r-10">
                                      <label
                                        className="storeRole-name-text"
                                        style={{ marginLeft: "70px" }}
                                      >
                                        {item.cardItem}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id={"i" + item.cardItemID}
                                        name="allModules"
                                        attrIds={item.cardItemID}
                                        checked={item.isEnabled}
                                        onChange={this.checkModule.bind(
                                          this,
                                          item.cardItemID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.cardItemID}
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                ))}
                              <button
                                class="Schedulenext1 w-100 mb-0 mt-4"
                                type="button"
                                disabled={this.state.isLoadingUpdate}
                                onClick={this.handleUpdateCardItemConfiguration.bind(
                                  this
                                )}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.update
                                  : "UPDATE"}
                                {this.state.isLoadingUpdate ? (
                                  <FontAwesomeIcon
                                    className="circular-loader chatsettingload"
                                    icon={faCircleNotch}
                                    spin
                                  />
                                ) : (
                                  ""
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.cardassestsconfiguration
                      : "Card Assets Configuration"
                  }
                >
                  <div className="row chattab-card">
                    <div className="col-md-12">
                      <div className="card" style={{ height: "auto" }}>
                        <div className="row">
                          <div className="col-md-5 m-auto">
                            <div className="right-sect-div">
                              <h3>
                                {TranslationContext !== undefined
                                  ? TranslationContext.h3
                                      .cardassestsconfiguration
                                  : "CARD ASSETS CONFIGURATION"}
                              </h3>
                              <div className="module-switch crm-margin-div crm-padding-div">
                                <div className="switch switch-primary d-inline m-r-10">
                                  {this.state.approvalTypeData != null
                                    ? this.state.approvalTypeData.map(
                                        (item, i) => {
                                          return (
                                            <div key={i}>
                                              <label
                                                className="storeRole-name-text"
                                                style={{ width: "70%" }}
                                              >
                                                {item.approvalType}
                                              </label>
                                              <input
                                                type="checkbox"
                                                id={item.approvalType}
                                                name="allModules"
                                                checked={item.isEnabled}
                                                onChange={this.handleTypeChange.bind(
                                                  this
                                                )}
                                              />
                                              <label
                                                htmlFor={item.approvalType}
                                                className="cr cr-float-auto"
                                              ></label>
                                            </div>
                                          );
                                        }
                                      )
                                    : null}
                                </div>
                              </div>
                              <button
                                class="Schedulenext1 w-100 mb-0 mt-4"
                                type="button"
                                disabled={this.state.isLoadingAdd}
                                onClick={this.handleUpdateCardImageApproval.bind(
                                  this
                                )}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.submit
                                  : "SUBMIT"}

                                {this.state.isLoadingAdd ? (
                                  <FontAwesomeIcon
                                    className="circular-loader chatsettingload"
                                    icon={faCircleNotch}
                                    spin
                                  />
                                ) : (
                                  ""
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.tab.notificationsandsounds
                      : "Notifications & Sounds"
                  }
                >
                  <div
                    className="row chattab-card"
                    style={{ marginBottom: "15px" }}
                  >
                    <div className="col-md-12">
                      <div
                        className="card sncheck"
                        style={{ padding: "35px", height: "auto" }}
                      >
                        <label className="snlbl-nlbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.notification
                            : "Notification"}
                        </label>
                        <hr className="sn-hr" />

                        <label className="sns-lbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.newchatassigned
                            : "New Chat Assigned"}
                        </label>
                        <Checkbox
                          name="isNotiNewChat"
                          checked={this.state.isNotiNewChat}
                          onChange={this.handleNotificationCheckboxChange.bind(
                            this
                          )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.checkbox
                                .shownotificationsfornewchatassigned
                            : "Show notifications for new chat assigned"}
                        </Checkbox>
                        <label className="sns-lbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.newmessages
                            : "New Messages"}
                        </label>
                        <Checkbox
                          name="isNotiNewMessage"
                          checked={this.state.isNotiNewMessage}
                          onChange={this.handleNotificationCheckboxChange.bind(
                            this
                          )}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.checkbox
                                .shownotificationfornewmessageinongoing
                            : "Show notification for new message in ongoing"}
                        </Checkbox>
                        <div style={{ display: "inherit" }}>
                          <label className="sns-lbl" style={{ width: "150px" }}>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.notificationtime
                              : "Notification Time"}
                          </label>
                          <input
                            type="text"
                            name="notificationTime"
                            value={this.state.notificationTime}
                            onChange={this.handleOnChange.bind(this)}
                            className="chatsetngtxt"
                            style={{ width: "120px" }}
                          />
                          <span
                            style={{ marginLeft: "5px", marginTop: "10px" }}
                          >
                            {" "}
                            /{" "}
                            {TranslationContext !== undefined
                              ? TranslationContext.small.sec
                              : "Sec"}
                          </span>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{
                          padding: "35px",
                          paddingTop: "0",
                          height: "auto",
                        }}
                      >
                        <label className="snlbl-nlbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.sounds
                            : "Sounds"}
                        </label>
                        <hr className="sn-hr" />
                        <div className="row">
                          <div className="col-md-3">
                            <label className="sns-lbl">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.newchatassigned
                                : "New Chat Assigned"}
                            </label>
                            <select
                              className="form-control dropdown-setting"
                              style={{ marginBottom: "10px" }}
                              value={this.state.newChatSoundID}
                              name="newChatSoundID"
                              onChange={this.handleSoundDropdownChange.bind(
                                this
                              )}
                            >
                              <option>Select</option>
                              {this.state.chatSoundData
                                ? this.state.chatSoundData.map((item, i) => {
                                    return (
                                      <option key={i} value={item.soundID}>
                                        {item.soundFileName}
                                      </option>
                                    );
                                  })
                                : null}
                            </select>
                          </div>
                          <div className="col-md-4 vlm-ctrl">
                            <label style={{ paddingLeft: "" }}>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.soundcontroller
                                : "Sound Controller"}
                            </label>
                            <div className="row">
                              <div
                                className="col-md-2"
                                style={{
                                  paddingLeft: "32px",
                                  paddingTop: "23px",
                                }}
                              >
                                <FontAwesomeIcon icon={faVolumeDown} />
                              </div>
                              <div
                                className="col-md-8"
                                style={{ paddingTop: "12px" }}
                              >
                                <div className="slider orientation-reversed">
                                  <div className="slider-group">
                                    <div className="slider-horizontal">
                                      <Slider
                                        min={0}
                                        max={100}
                                        value={this.state.newChatSoundVolume}
                                        onChange={
                                          this.handleChatAssingedVolumnChange
                                        }
                                        orientation="horizontal"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="col-md-2"
                                style={{ paddingTop: "23px" }}
                              >
                                <FontAwesomeIcon icon={faVolumeUp} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <label className="sns-lbl">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.newmessage
                                : "New Message"}
                            </label>
                            <select
                              className="form-control dropdown-setting"
                              style={{ marginBottom: "10px" }}
                              value={this.state.newMessageSoundID}
                              name="newMessageSoundID"
                              onChange={this.handleSoundDropdownChange.bind(
                                this
                              )}
                            >
                              <option>Select</option>
                              {this.state.chatSoundData
                                ? this.state.chatSoundData.map((item, i) => {
                                    return (
                                      <option key={i} value={item.soundID}>
                                        {item.soundFileName}
                                      </option>
                                    );
                                  })
                                : null}
                            </select>
                          </div>
                          <div className="col-md-4 vlm-ctrl">
                            <label style={{ paddingLeft: "" }}>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.soundcontroller
                                : "Sound Controller"}
                            </label>
                            <div className="row">
                              <div
                                className="col-md-2"
                                style={{
                                  paddingLeft: "32px",
                                  paddingTop: "23px",
                                }}
                              >
                                <FontAwesomeIcon icon={faVolumeDown} />
                              </div>
                              <div
                                className="col-md-8"
                                style={{ paddingTop: "12px" }}
                              >
                                <div className="slider orientation-reversed">
                                  <div className="slider-group">
                                    <div className="slider-horizontal">
                                      <Slider
                                        min={0}
                                        max={100}
                                        value={this.state.newMessageSoundVolume}
                                        onChange={
                                          this.handleNewMessageVolumnChange
                                        }
                                        orientation="horizontal"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="col-md-2"
                                style={{ paddingTop: "23px" }}
                              >
                                <FontAwesomeIcon icon={faVolumeUp} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{
                          padding: "35px",
                          paddingTop: "0",
                          height: "auto",
                        }}
                      >
                        <div className="">
                          <button
                            onClick={this.handleButtonClick.bind(this, 1)}
                            className={
                              this.state.buttonClickCSS == 1
                                ? "butn sn-btn-mr"
                                : "butn sn-btn-inactive"
                            }
                            type="button"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "CANCEL"}
                          </button>
                          <button
                            onClick={this.handleButtonClick.bind(this, 2)}
                            className={
                              this.state.buttonClickCSS == 2
                                ? "butn sn-btn-mr"
                                : "butn sn-btn-inactive"
                            }
                            type="button"
                            disabled={this.state.isloading}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.resetdefault
                              : "RESET DEFAULT"}
                          </button>
                          <button
                            onClick={this.handleButtonClick.bind(this, 3)}
                            className={
                              this.state.buttonClickCSS == 3
                                ? "butn sn-btn-mr"
                                : "butn sn-btn-inactive"
                            }
                            type="button"
                            disabled={this.state.isloading}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.savechanges
                              : "SAVE CHANGES"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatSettings;
