import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import DashboardLogo from "./../assets/Images/dashboardBlack.png";
import DashboardLogoBlue from "./../assets/Images/dashboardBlue.png";
import storeBlack from "./../assets/Images/store-black.png";
import storeBlue from "./../assets/Images/storeBlue.png";
import TicketLogo from "./../assets/Images/ticket.png";
import TicketLogoBlue from "./../assets/Images/ticket-blue.png";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import KnowledgeLogoBlue from "./../assets/Images/knowledge-blue.png";
import CalendarLogo from "./../assets/Images/calendar-black.png";
import CalendarLogoBlue from "./../assets/Images/calendar-blue.png";
import CalenderLogo from "./../assets/Images/calender.png";
import ChatLogo from "./../assets/Images/chat.png";
import ChatLogoBlue from "./../assets/Images/chat-blue.png";
import NotificationLogo from "./../assets/Images/Notification.png";
import SettingLogo from "./../assets/Images/setting.png";
import SettingLogoBlue from "./../assets/Images/setting-blue.png";
import UserLogo from "./../assets/Images/user-img.jpg";
import StatusLogo from "./../assets/Images/status.png";
import Hamb from "./../assets/Images/hamb.png";
import ClaimLogo from "./../assets/Images/icon9.svg";
import ClaimLogoBlue from "./../assets/Images/claim-blue.png";

class Header extends Component {
  state = {
    modalIsOpen: false,
    open: false
  };

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

  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <div className="er">
              <label className="er-label">ER</label>
            </div>
            <div className="hamb-menu">
              <img src={Hamb} alt="hamburger icon" />
            </div>
            <div className="headers-menu">
              <a href="/admin/dashboard" className="single-menu active">
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
              </a>
              <a href="/admin/dashboard" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={storeBlack}
                    alt="store icon"
                    className="stores-icon"
                  />
                  <img
                    src={storeBlue}
                    alt="store icon"
                    className="stores-icon"
                    style={{ display: "none" }}
                  />
                </div>
                Store Issues
              </a>
              <a href="myTicketlist" className="single-menu">
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
                My Tickets
              </a>
              <a href="myTicketlist" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={KnowledgeLogo}
                    alt="knowledge icon"
                    className="knowledgeNav"
                  />
                  <img
                    src={KnowledgeLogoBlue}
                    alt="knowledge icon"
                    className="knowledgeNav"
                    style={{ display: "none" }}
                  />
                </div>
                Knowledge Base
              </a>
              <a href="/admin/dashboard" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={storeBlack}
                    alt="dashboard icon"
                    className="stores-icon"
                  />
                  <img
                    src={storeBlue}
                    alt="dashboard icon"
                    className="stores-icon"
                    style={{ display: "none" }}
                  />
                </div>
                Dashboard
              </a>
              <a href="myTicketlist" className="single-menu">
                <div className="header-icons-cntr">
                  <img src={TicketLogo} alt="task icon" className="myTicket" />
                  <img
                    src={TicketLogoBlue}
                    alt="task icon"
                    className="myTicket"
                    style={{ display: "none" }}
                  />
                </div>
                Task
              </a>
              <a href="myTicketlist" className="single-menu">
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
              </a>
              <a href="myTicketlist" className="single-menu">
                <div className="header-icons-cntr">
                  <img
                    src={CalendarLogo}
                    alt="campaign icon"
                    className="campaign-logo"
                  />
                  <img
                    src={CalendarLogoBlue}
                    alt="campaign icon"
                    className="campaign-logo"
                    style={{ display: "none" }}
                  />
                </div>
                Campaign
              </a>
            </div>
          </div>

          <div className="header-right-icons">
            <a href="#!">
              <img src={CalenderLogo} alt="logo" className="calImg" />
            </a>
            <a href="#!">
              <img src={ChatLogo} alt="logo" className="chatImg" />
              <img
                src={ChatLogoBlue}
                alt="logo"
                className="chatImg"
                style={{ display: "none" }}
              />
            </a>
            <a href="#!">
              <img
                src={NotificationLogo}
                alt="logo"
                className="notifi"
                onClick={this.openModal}
              />
              <span style={{ display: "none" }} className="icon-fullname">
                Notifications
              </span>
            </a>
            <a href="#!">
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
            </a>
            <a href="#!" className="bitmap5" onClick={this.onOpenModal}>
              NR
            </a>
          </div>
        </div>

        <Modal
          onClose={this.closeModal}
          open={this.state.modalIsOpen}
          modalId="Notification-popup"
          overlayId="logout-ovrly"
        >
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>New Tickets assigned to you</label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}">
                {" "}
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </a>
            </div>
          </div>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>Update happened to your tickets</label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}">
                {" "}
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </a>
            </div>
          </div>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>Escalation in your ticket</label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}">
                {" "}
                <label className="md-4 view-tickets">VIEW TICKETS</label>
              </a>
            </div>
          </div>
        </Modal>
        <div>
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
                  <img src={UserLogo} alt="User" />
                </div>
                <div>
                  <p>Naman Rampal</p>
                  <p className="mail-id">naman@fabindia.com</p>
                </div>
                <button>LOGout</button>
              </div>
              <div className="status-sctn">
                <div className="d-flex align-items-center">
                  <div className="logout-status">
                    <img src={StatusLogo} alt="status" />
                  </div>
                  <p className="logout-label chat-status">Chat Status :</p>
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
                    <p className="font-weight-bold">9:30 AM</p>
                  </div>
                  <div>
                    <p className="logout-label">Logout Time</p>
                    <p className="font-weight-bold">6:30 PM</p>
                  </div>
                </div>
                <ProgressBar className="logout-progress" now={60} />
                <p className="logout-label font-weight-bold prog-indi">
                  5H 23M
                </p>
              </div>
              <div>
                <div>
                  <p className="logout-label">SLA SCORE</p>
                  <p className="font-weight-bold">60%</p>
                </div>
                <div>
                  <p className="logout-label">Avg Response time</p>
                  <p className="font-weight-bold">1 Hr</p>
                </div>
                <div>
                  <p className="logout-label">CSAT SCORE</p>
                  <p className="font-weight-bold">90%</p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
