import React, { Component } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag.js";
import { Select, Popover } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { NotificationManager } from "react-notifications";
import { MyContext } from "./../../context";

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
      programCode:"",
    };
  }

  componentDidMount() {
    this.handleGetChatSession();
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
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;

        if (message === "Success" && data) {
          self.setState({
            chatSessionValue: data.chatSessionValue,
            chatSessionDuration: data.chatSessionDuration,
            chatDisplayValue: data.chatDisplayValue,
            chatDisplayDurationHour: data.chatDisplayDuration,
            programCode:data.programCode
          });
        } else {
          self.setState({
            chatSessionValue: "",
            chatSessionDuration: "",
            chatDisplayValue: "",
            chatDisplayDurationHour: "",
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSession");
      });
  }

  ////handle update chate session
  handleUpdateChatSession() {
    debugger;
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
        },
      })
        .then((response) => {
          debugger;

          var message = response.data.message;
          if (message === "Success") {
            NotificationManager.success("Recode Update Successfully!");
          } else {
            NotificationManager.console.error("Recode Not Update!");
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
    debugger;
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
  handleChatDisplayDurationHour(e) {
    this.setState({ chatDisplayDurationHour: e });
  }
  render() {
    const TranslationContext = this.context.state.translateLanguage.default
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.link.store
                                      }
                                      else {
                                        return "Store"
                                      }
                                    })()
                                  }
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.link.chatsetting
                                      }
                                      else {
                                        return "Chat Settings"
                                      }
                                    })()
                                  }
          </Link>
        </div>
        <div className="row card1">
          <div className="col-md-12">
            <div className="card" style={{ padding: "35px", height: "auto" }}>
              <div className="chat-drop-down">
                <div className="row" style={{ width: "100%", margin: "0" }}>
                  <div className="col-md-3">
                    <Select
                      showArrow={true}
                      style={{ width: "100%" }}
                      placeholder="Select program code"
                      value={this.state.programCode}
                      disabled={true}
                    >
                      <Option value={this.state.programCode}>
                        {this.state.programCode}
                      </Option>
                    </Select>
                  </div>
                  <div className="col-md-3">
                    <div className="chattxtdiv">
                      <div className="chattxtdivcus">
                        <input
                          type="text"
                          className="chatsetngtxt"
                          placeholder="Enter value"
                          name="chatSessionValue"
                          onChange={this.handleOnChange.bind(this)}
                          value={this.state.chatSessionValue}
                          maxLength={2}
                        />
                        <Select
                          showArrow={true}
                          defaultValue="M"
                          style={{marginLeft: "10px"}}
                          name="chatSessionDuration"
                          onChange={this.handleSessionDuration.bind(this)}
                          value={this.state.chatSessionDuration}
                        >
                          <Option value="M">M</Option>
                          <Option value="H">H</Option>
                          <Option value="D">D</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="chattxtdivcus">
                      <input
                        type="text"
                        className="chatsetngtxt"
                        placeholder="Enter value"
                        onChange={this.handleOnChange.bind(this)}
                        value={this.state.chatDisplayValue}
                        maxLength={2}
                        name="chatDisplayValue"
                      />
                      <Select
                        showArrow={true}
                        defaultValue="D"
                          style={{marginLeft: "10px"}}
                        onChange={this.handleChatDisplayDurationHour.bind(this)}
                        value={this.state.chatDisplayDurationHour}
                      >
                        <Option value="M">
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.Option.m
                                      }
                                      else {
                                        return "M"
                                      }
                                    })()
                                  }
                        </Option>
                        <Option value="H">
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.Option.h
                                      }
                                      else {
                                        return "H"
                                      }
                                    })()
                                  }
                        </Option>
                        <Option value="D">
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.Option.d
                                      }
                                      else {
                                        return "D"
                                      }
                                    })()
                                  }
                        </Option>
                      </Select>
                      <Popover
                        content={<> How many days to show chat history.</>}
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
                  <div className="col-md-3">
                    <div>
                      <button
                        className="butn"
                        type="button"
                        onClick={this.handleSubmit.bind(this)}
                      >
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.button.submit
                                      }
                                      else {
                                        return "SUBMIT"
                                      }
                                    })()
                                  }
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ChatSettings.contextType = MyContext;
export default ChatSettings;
