import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Select, Popover } from "antd";
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

const { Option } = Select;

class ChatSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatSessionValue: "",
      chatSessionDuration: "M",
      chatDisplayValue: "",
      chatDisplayDurationHour: "D",
      isChatSessionValue: "",
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
    };
  }

  componentDidMount() {
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
            chatSessionValue: data.chatSessionValue,
            chatSessionDuration: data.chatSessionDuration,
            chatDisplayValue: data.chatDisplayValue,
            chatDisplayDurationHour: data.chatDisplayDuration,
            programCode: data.programCode,
            limitText: data.chatCharLimit,
          });
        } else {
          self.setState({
            chatSessionValue: "",
            chatSessionDuration: "",
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

  ////handle update chate session
  handleUpdateChatSession() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (
      this.state.isChatDisplayValue === "" &&
      this.state.isChatSessionValue === ""
    ) {
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/UpdateChatSession",
        headers: authHeader(),
        params: {
          ChatSessionValue: Number(this.state.chatSessionValue),
          ChatSessionDuration: this.state.chatSessionDuration,
          ChatDisplayValue: Number(this.state.chatDisplayValue),
          ChatDisplayDuration: this.state.chatDisplayDurationHour,
          ChatCharLimit: Number(this.state.limitText),
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
  ////handle submit button
  handleSubmit() {
    if (this.state.chatSessionValue === "") {
      this.setState({
        isChatSessionValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isChatSessionValue: "",
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

  ////handle change textbox
  handleOnChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      this.setState({
        [name]: value,
      });
    }
  }
  ////handle on change drop-dow
  handleSessionDuration(e) {
    this.setState({ chatSessionDuration: e });
  }
  ///handle chat display duration hour
  handleChatDisplayDurationHour(e) {
    this.setState({ chatDisplayDurationHour: e });
  }
  /////handle chack radio button
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
  ////handle get card configuration
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
          self.setState({ cardConfigData: responseData });
        } else {
          self.setState({ cardConfigData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCardConfiguration");
      });
  }
  ////handle update card item configuration
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

  ////handle card item insert configuration
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
  ////handle on change of input fild
  handleOnChangeCardItem = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  ////handle change type
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

  ////handle get card =image approval
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

  ////handle update card image approval
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
                onSelect={(index, label) =>
                  this.setState({ selectedTab: label })
                }
                selected={this.state.selectedTab}
              >
                <Tab
                  label={
                    TranslationContext !== undefined
                      ? TranslationContext.label.chat
                      : "CHAT"
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
                              ? TranslationContext.div.chatsessiontimeout
                              : "Chat Session Time Out"}
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
                                name="chatSessionValue"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.chatSessionValue}
                                maxLength={2}
                              />
                              <Select
                                showArrow={true}
                                defaultValue="M"
                                style={{ marginLeft: "10px" }}
                                name="chatSessionDuration"
                                onChange={this.handleSessionDuration.bind(this)}
                                value={this.state.chatSessionDuration}
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
                      : "CARD ITEM CONFIGURATION"
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
                                  ? TranslationContext.h3.charditemconfiguration
                                  : "CARD ITEM CONFIGURATION"}
                              </h3>
                              {/* <div className="cmpaign-channel-table slot-setting-options">
                                <div className="w-100">
                                  <input
                                    type="text"
                                    placeholder="Enter the name"
                                    style={{ width: "100%" }}
                                    name="cardConfigName"
                                    onChange={this.handleOnChangeCardItem.bind(
                                      this
                                    )}
                                    value={this.state.cardConfigName}
                                  />
                                </div>
                                <div className="w-100">
                                  <select
                                    name="selectLanguage"
                                    name="cardConfigStatus"
                                    onChange={this.handleOnChangeCardItem.bind(
                                      this
                                    )}
                                    value={this.state.cardConfigStatus}
                                  >
                                    <option
                                      value={""}
                                      className="select-category-placeholder"
                                    >
                                      select
                                    </option>
                                    <option
                                      value={true}
                                      className="select-category-placeholder"
                                    >
                                      Active
                                    </option>
                                    <option
                                      value={false}
                                      className="select-category-placeholder"
                                    >
                                      Inactive
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <button
                                className="Schedulenext1 w-100 mt-4"
                                type="button"
                                style={{
                                  marginBottom: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={this.handleInsertCardItemConfiguration.bind(
                                  this
                                )}
                                disabled={this.state.isLoadingAdd}
                              >
                                ADD
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
                              */}
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
                      : "CARD ASSETS CONFIGURATION"
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
                <Tab label={"SOUND & NOTIFICATIONS"}>
                  <div className="row chattab-card">
                    <div className="col-md-12">
                      <div
                        className="card"
                        style={{ padding: "35px", height: "auto" }}
                      >
                        <label className="snlbl-nlbl">Notification</label>
                        <hr className="sn-hr" />
                        <p>
                            Set your notification preference for when you are in
                            or away from the system.You will need to configure
                            your browser setting to allow notification
                          </p>
                        
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
