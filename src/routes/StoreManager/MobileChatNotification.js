import React, { Component } from "react";
import io from "socket.io-client";
import { Card, Empty, Pagination, Spin } from "antd";
import config from "../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
class MobileChatNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatNotificationData: [],
      NotificationPage: 1,
      programCode: "",
      storeCode: "",
      tenant_ID: 0,
      userMaster_ID: 0,
      chatNotificationMomTotalCount: 0,
      chatNotificationMomCount: 0,
      chatModal: false,
      chatNotificationLoader: false,
    };
    this.handleMobChatNotificationClick = this.handleMobChatNotificationClick.bind(
      this
    );
  }
  componentDidMount() {
    this.handleChatNotificationDetails();
  }

  handleChatNotificationDetails() {
    let self = this;
    this.setState({ chatNotificationLoader: true });
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetMobileNotificationsDetails",
      headers: authHeader(),
      params: { Pageno: this.state.NotificationPage },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        self.setState({
          chatNotificationLoader: false,
        });
        if (message === "Success" && responseData) {
          self.setState({
            chatNotificationData: responseData.chatNotification,
            chatNotificationMomTotalCount: responseData.totalNotiCount,
            chatNotificationMomCount: responseData.unReadNotiCount,
          });

          document.getElementById("chatNotificationMomCount").innerText =
            responseData.unReadNotiCount;
        } else {
          self.setState({
            chatNotificationData: [],
            chatNotificationMomTotalCount: 0,
            chatNotificationMomCount: 0,
          });
          document.getElementById("chatNotificationMomCount").innerText = 0;
        }

        self.forceUpdate();
      })

      .catch((response) => {
        self.setState({ chatNotificationLoader: false });
        console.log(response);
      });
  }

  handleMobChatNotificationClick(Items, isClear) {
    let self = this;

    var userInfo = window.localStorage.getItem("UserProfile");
    var ChatSoundNotiSetting = window.localStorage.getItem(
      "ChatSoundNotiSetting"
    );
    if (Items !== "") {
      if (Items.notificationFor.toLowerCase() === "chat") {
        if (userInfo) {
          var objuserInfo = JSON.parse(userInfo);
          var objChatSoundNotiSetting = JSON.parse(ChatSoundNotiSetting);
          this.props.history.push({
            pathname: "Chatbot",
            state: {
              programCode: objuserInfo.programCode,
              storeCode: objuserInfo.storeCode,
              tenantID: objChatSoundNotiSetting.tenantID,
              agentId: objuserInfo.agentId,
              UserName: objuserInfo.agentName,
            },
          });
        }
      } else if (Items.notificationFor.toLowerCase() === "appointment") {
        this.props.history.push({
          pathname: "appointment",
        });
      } else if (Items.notificationFor.toLowerCase() === "order") {
        this.props.history.push({
          pathname: "orders",
        });
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateMobileNotification",
      headers: authHeader(),
      params: { IndexID: isClear ? "all" : Items.indexID },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.handleChatNotificationDetails();
        }
      })
      .catch((response) => {
        console.log(response, "---GetChatNotificationsDetails");
      });
    if (isClear) {
    } else {
      document.getElementById("mobileChatbotWindows").click();
    }
  }
  handleNotificationMobPAgeChaneg(e) {
    this.setState({ NotificationPage: e });

    this.handleChatNotificationDetails();
  }
  handleClearAllNotification = () => {
    var indexIds = "";

    this.handleMobChatNotificationClick(indexIds, true);
  };
  render() {
    const PaginationButton = (current, type, originalElement) => {
      if (type === "prev") {
        return <button className="butn">Previous</button>;
      }
      if (type === "next") {
        return <button className="butn">Next</button>;
      }
      return originalElement;
    };
    return (
      <div>
        {this.state.chatNotificationData.length > 0 ? (
          <label
            className="clralllbl"
            onClick={this.handleClearAllNotification.bind(this)}
          >
            Clear All
          </label>
        ) : null}
        <Spin spinning={this.state.chatNotificationLoader}>
          <div className="notifi-container">
            <div className="chatnotifcard">
              {this.state.chatNotificationData.length > 0
                ? this.state.chatNotificationData.map((item, i) => {
                    return (
                      <div
                        key={i}
                        onClick={
                          item.isRead === false
                            ? this.handleMobChatNotificationClick.bind(
                                this,
                                item,
                                false
                              )
                            : null
                        }
                      >
                        <Card
                          className={
                            item.isRead === true ? "notif-cntr-disabled" : ""
                          }
                        >
                          <span
                            class="chat-initial"
                            alt="face image"
                            title={""}
                          >
                            {item.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                          <div className="notif-cntr">
                            <div className="d-flex align-items-center justify-content-between">
                              <label className="notif-name">
                                {item.customerName}
                              </label>

                              <label className="notif-time">
                                {item.createdDate}
                              </label>
                            </div>
                            <p className="notif-num">
                              {item.customerMobileNumber}
                            </p>

                            <p className="notif-dtl">{item.message}</p>
                          </div>
                        </Card>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </Spin>
        {this.state.chatNotificationData.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : null}
        {this.state.chatNotificationData.length > 0 ? (
          <Pagination
            className="hidepagebtn"
            hideOnSinglePage={true}
            itemRender={PaginationButton}
            style={{ margin: "20px", textAlign: "center" }}
            onChange={this.handleNotificationMobPAgeChaneg.bind(this)}
            total={this.state.chatNotificationMomTotalCount}
          />
        ) : null}
      </div>
    );
  }
}

export default MobileChatNotification;
