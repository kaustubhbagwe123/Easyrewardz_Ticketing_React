import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import CampignAc from "./../../assets/Images/campaign.svg";
import AppoinAc from "./../../assets/Images/Blcalendar.svg";
import Appoin from "./../../assets/Images/Ticket1.png";
import AppoinWh from "./../../assets/Images/AppoinWh.svg";
import OrderWh from "./../../assets/Images/OrderWh.svg";
import TicketWh from "./../../assets/Images/TicketWh.svg";
import CampWh from "./../../assets/Images/CampWh.svg";
import ChatLogo from "./../../assets/Images/chat.png";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import Chatw from "./../../assets/Images/chatw.png";

class StoreFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cont: [],
      translateLanguage: {},
      ShowChat: false,
      ShowOrder: false,
      ShowCampaign: false,
      ShowTicket: false,
      ShowAppointment: false,
      isActivetab1: false,
      isActivetab2: false,
      isActivetab3: false,
      isActivetab4: false,
      isActivetab5: false,
      programCode: "",
      storeCode: "",
      tenantID: 0,
      AgentID: 0,
      UserName: "",
    };
  }
  componentDidMount() {
    this.handleCRMRole();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
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
          self.setState({
            programCode: res.data.responseData.programCode,
            storeCode: res.data.responseData.storeCode,
            tenantID: res.data.responseData.tenantID,
            AgentID: res.data.responseData.userID,
            UserName: res.data.responseData.agentName,
          });
          self.setAccessUser(data);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setAccessUser(data) {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var accessdata = [];

    var campaign = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.campaign
          : "Campaign",
      urls: "campaign",
      logoBlack: CampWh,
      logoBlue: CampignAc,
      imgAlt: "campaign icon",
      //   imgClass: "campaign-icon",
      activeClass:
        page.toLowerCase() === "Campaign".toLowerCase()
          ? "active background"
          : "background",
    };
    var appointment = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.appointment
          : "Appointment",
      urls: "appointment",
      logoBlack: AppoinWh,
      logoBlue: AppoinAc,
      imgAlt: "campaign icon",
      imgClass: "campaign-icon",
      activeClass:
        page.toLowerCase() === "Appointment".toLowerCase()
          ? "active background"
          : "background",
    };
    var chat = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.link.chat
          : "Chat",
      urls: "Chatbot",
      logoBlack: Chatw,
      logoBlue: ChatLogo,
      imgAlt: "Chat icon",
      imgClass: "chatbt-icon",
      activeClass:
        page.toLowerCase() === "Chat".toLowerCase()
          ? "active background"
          : "background",
    };
    var myTicket = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.myticket
          : "Ticket",
      urls: "myTicketList",
      logoBlack: TicketWh,
      logoBlue: CampignAc,
      imgAlt: "ticket icon",
      imgClass: "myTicket",
      activeClass:
        page.toLowerCase() === "MyTicket".toLowerCase()
          ? "active background"
          : "background",
    };
    var orders = {
      data:
        this.state.translateLanguage.default !== undefined
          ? this.state.translateLanguage.default.nav.orders
          : "Orders",
      urls: "orders",
      logoBlack: OrderWh,
      logoBlue: CampignAc,
      imgAlt: "Order Icon",
      imgClass: "myTicket",
      activeClass:
        page.toLowerCase() === "Orders".toLowerCase()
          ? "active background"
          : "background",
    };
    if (data !== null) {
      var MobilenavBar = data.filter((x) => x.modulestatus == true)[0];

      for (var i = 0; i < data.length; i++) {
        if (
          data[i].moduleName === "Campaign" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(campaign);
          if (MobilenavBar.moduleName === "Campaign") {
            this.setState({
              isActivetab1: true,
            });
          }
          this.setState({
            ShowCampaign: true,
          });
        } else if (
          data[i].moduleName === "Appointment" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(appointment);
          if (MobilenavBar.moduleName === "Appointment") {
            this.setState({
              isActivetab2: true,
            });
          }
          this.setState({
            ShowAppointment: true,
          });
        } else if (
          data[i].moduleName === "Chat" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(chat);
          if (MobilenavBar.moduleName === "Chat") {
            this.setState({
              isActivetab3: true,
            });
          }
          this.setState({
            ShowChat: true,
          });
        } else if (
          data[i].moduleName === "MyTicket" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(myTicket);
          if (MobilenavBar.moduleName === "MyTicket") {
            this.setState({
              isActivetab4: true,
            });
          }
          this.setState({
            ShowTicket: true,
          });
        } else if (
          data[i].moduleName === "Orders" &&
          data[i].modulestatus === true
        ) {
          accessdata.push(orders);
          if (MobilenavBar.moduleName === "Orders") {
            this.setState({
              isActivetab5: true,
            });
          }
          this.setState({
            ShowOrder: true,
          });
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
  actives = (item, e) => {
    const contDummy = [...this.state.cont];
    contDummy.forEach((i) => {
      i.activeClass = "background";
      if (i.data === item) i.activeClass = "background active";
    });

    this.setState({
      cont: contDummy,
    });
  };

  handleActiveTab(tabId) {
    if (tabId === 1) {
      this.setState({
        isActivetab1: true,
        isActivetab2: false,
        isActivetab3: false,
        isActivetab4: false,
        isActivetab5: false,
      });
    } else if (tabId === 2) {
      this.setState({
        isActivetab1: false,
        isActivetab2: true,
        isActivetab3: false,
        isActivetab4: false,
        isActivetab5: false,
      });
    } else if (tabId === 3) {
      this.setState({
        isActivetab1: false,
        isActivetab2: false,
        isActivetab3: true,
        isActivetab4: false,
        isActivetab5: false,
      });
    } else if (tabId === 4) {
      this.setState({
        isActivetab1: false,
        isActivetab2: false,
        isActivetab3: false,
        isActivetab4: true,
        isActivetab5: false,
      });
    } else if (tabId === 5) {
      this.setState({
        isActivetab1: false,
        isActivetab2: false,
        isActivetab3: false,
        isActivetab4: false,
        isActivetab5: true,
      });
    }
  }
  render() {
    return (
      <div>
        <div className="mobbottom">
          <div id="store-footre-main">
            <div className="main">
              {/* {this.state.cont.map((item, i) => {
              return (
                <Link
                  onClick={this.actives.bind(this, item.data)}
                  key={item.data}
                  to={item.urls}
                >
                  <div className="item1" id={"Mob" + item.data}>
                    <div className={item.activeClass}>
                      {item.activeClass === "background" ? (
                        <img src={item.logoBlack} />
                      ) : (
                        <img src={item.logoBlue} />
                      )}
                    </div>
                    <label>{item.data}</label>
                  </div>
                </Link>
              );
            })} */}
              {this.state.ShowCampaign ? (
                <Link
                  onClick={this.handleActiveTab.bind(this, 1)}
                  to="/store/campaign"
                >
                  <div className="item1">
                    <div
                      className={
                        window.location.pathname === "/store/campaign"
                          ? "background active"
                          : "background"
                      }
                    >
                      {window.location.pathname === "/store/campaign" ? (
                        <img src={CampignAc} className="campaign-icon" />
                      ) : (
                        <img src={CampWh} className="campaign-icon" />
                      )}
                    </div>
                    <label>
                      {this.state.translateLanguage.default !== undefined
                        ? this.state.translateLanguage.default.nav.campaign
                        : "Campaign"}
                    </label>
                  </div>
                </Link>
              ) : null}
              {this.state.ShowAppointment ? (
                <Link
                  onClick={this.handleActiveTab.bind(this, 2)}
                  to="/store/appointment"
                >
                  <div className="item1">
                    <div
                      className={
                        window.location.pathname === "/store/appointment"
                          ? "background active"
                          : "background"
                      }
                    >
                      {window.location.pathname === "/store/appointment" ? (
                        <img src={AppoinAc} className="campaign-icon" />
                      ) : (
                        <img src={AppoinWh} className="campaign-icon" />
                      )}
                    </div>
                    <label>
                      {this.state.translateLanguage.default !== undefined
                        ? this.state.translateLanguage.default.nav.appointment
                        : "Appointment"}
                    </label>
                  </div>
                </Link>
              ) : null}
              {this.state.ShowChat ? (
                <Link
                  onClick={this.handleActiveTab.bind(this, 3)}
                  to={{
                    pathname: "/store/Chatbot",
                    state: {
                      programCode: this.state.programCode,
                      storeCode: this.state.storeCode,
                      tenantID: this.state.tenantID,
                      agentId: this.state.AgentID,
                      UserName: this.state.UserName,
                    },
                  }}
                  id={"MobChat"}
                >
                  <div className="item1">
                    <div
                      className={
                        window.location.pathname === "/store/Chatbot"
                          ? "background active"
                          : "background"
                      }
                    >
                      {window.location.pathname === "/store/Chatbot" ? (
                        <img src={ChatLogo} className="campaign-icon" />
                      ) : (
                        <img src={Chatw} className="campaign-icon" />
                      )}
                    </div>
                    <label>
                      {this.state.translateLanguage.default !== undefined
                        ? this.state.translateLanguage.default.link.chat
                        : "Chat"}
                    </label>
                  </div>
                </Link>
              ) : null}
              {this.state.ShowTicket ? (
                <Link
                  onClick={this.handleActiveTab.bind(this, 4)}
                  to="/store/myTicketList"
                  id={"MobTicket"}
                >
                  <div className="item1">
                    <div
                      className={
                        window.location.pathname === "/store/myTicketList"
                          ? "background active"
                          : "background"
                      }
                    >
                      {window.location.pathname === "/store/myTicketList" ? (
                        <img src={CampignAc} className="campaign-icon" />
                      ) : (
                        <img src={TicketWh} className="campaign-icon" />
                      )}
                    </div>
                    <label>
                      {this.state.translateLanguage.default !== undefined
                        ? this.state.translateLanguage.default.nav.myticket
                        : "Ticket"}
                    </label>
                  </div>
                </Link>
              ) : null}
              {this.state.ShowOrder ? (
                <Link
                  onClick={this.handleActiveTab.bind(this, 5)}
                  to="/store/orders"
                >
                  <div className="item1">
                    <div
                      className={
                        window.location.pathname === "/store/orders"
                          ? "background active"
                          : "background"
                      }
                    >
                      {window.location.pathname === "/store/orders" ? (
                        <img src={CampignAc} className="campaign-icon" />
                      ) : (
                        <img src={OrderWh} className="campaign-icon" />
                      )}
                    </div>
                    <label>
                      {this.state.translateLanguage.default !== undefined
                        ? this.state.translateLanguage.default.nav.orders
                        : "Orders"}
                    </label>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreFooter;
