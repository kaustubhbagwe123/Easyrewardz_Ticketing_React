import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import DashboardLogo from "./../assets/Images/dashboard.png";
import TicketLogo from "./../assets/Images/ticket.png";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import CalenderLogo from "./../assets/Images/calender.png";
import ChatLogo from "./../assets/Images/chat.png";
import NotificationLogo from "./../assets/Images/Notification.png";
import SettingLogo from "./../assets/Images/setting.png";
import UserLogo from "./../assets/Images/user-img.jpg";
import StatusLogo from "./../assets/Images/status.png";

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
      <div className="card-Nav">
        <div className="card-header1">
          <div className="container-fluid">
            <div className="row card-row">
              <div className="col-md-8 p-0">
                <div className="er">
                  <label className="er-label">ER</label>
                </div>
                <div className="col-md-2 nav-tab3">
                  <img
                    src={DashboardLogo}
                    alt="logo"
                    className="dashboardImg1"
                  />
                  {/* <label className="dashboards-label1">Dashboard</label> */}
                  <a href="/admin/dashboard">
                    <label className="dashboards-label1">Dashboard</label>
                  </a>
                </div>

                <div className="col-md-2 nav-tab1">
                  <img src={TicketLogo} alt="logo" className="myTicket" />
                  {/* <label>My Tickets</label> */}
                  <a href="myTicketlist">
                    <label>My Tickets</label>
                  </a>
                </div>
                <div className="col-md-2 claim-space">
                  {/* <label className="claim-label">Claim</label> */}
                  <a href="claim">
                    <label>Claim</label>
                  </a>
                </div>
                <div className="col-md-4 nav-tab2">
                  <img
                    src={KnowledgeLogo}
                    alt="logo"
                    className="knowledgeNav"
                  />
                  <label className="knowledge-label">Knowledge Base</label>
                </div>
              </div>
              <div className="main-nav">
                <div className="bitmap1">
                  <img src={CalenderLogo} alt="logo" className="calImg" />
                </div>
                <div className="bitmap2">
                  <img src={ChatLogo} alt="logo" className="chatImg" />
                </div>
                <div className="bitmap3">
                  <img
                    src={NotificationLogo}
                    alt="logo"
                    className="notifi"
                    onClick={this.openModal}
                  />
                </div>
                <div className="bitmap4">
                  <img src={SettingLogo} alt="logo" className="setting" />
                </div>
                <div className="bitmap5">
                  <label onClick={this.onOpenModal}>NR</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal onClose={this.closeModal} open={this.state.modalIsOpen} 
         modalId="notification-popup"
            overlayId="logout-ovrly">

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
                <label className="md-4 view-tickets" >VIEW TICKETS</label>
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
      </div>
    );
  }
}

export default Header;
