import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import DashboardLogo from "./../../assets/Images/dashboardBlack.png";
import DashboardLogoBlue from "./../../assets/Images/dashboardBlue.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import TicketLogoBlue from "./../../assets/Images/ticket-blue.png";
import NotificationLogo from "./../../assets/Images/Notification.png";
import SettingLogo from "./../../assets/Images/setting.png";
import SettingLogoBlue from "./../../assets/Images/setting-blue.png";
import UserLogo from "./../../assets/Images/user-img.jpg";
import StatusLogo from "./../../assets/Images/status.png";
import Hamb from "./../../assets/Images/hamb.png";


class TenantHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      LoginOpen: false,
      open: false,
      cont: [
        {
          data: "Dashboards",
          urls: "dashboard",
          logoBlack: DashboardLogo,
          logoBlue: DashboardLogoBlue,
          imgAlt: "dashboard icon",
          imgClass: "dashboardImg1",
          activeClass: "active single-menu"
        },
        {
          data: "All Accounts",
          urls: "allAcounts",
          logoBlack: TicketLogo,
          logoBlue: TicketLogoBlue,
          imgAlt: "ticket icon",
          imgClass: "myTicket",
          activeClass: "single-menu"
        }
      ]
    };
  }
  handleLoginModalOpen() {
    this.handleHeadPhoneModalClose();
    this.setState({ LoginOpen: true });
  }
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

  componentDidMount() {
    let pageName, lastOne, lastValue, arr;
    arr = [...this.state.cont];
    setTimeout(
      function() {
        pageName = window.location.pathname;
        lastOne = pageName.split("/");
        lastValue = lastOne[lastOne.length - 1];
        arr.forEach(i => {
          i.activeClass = "single-menu";
          if (i.urls === lastValue) i.activeClass = "active single-menu";
        });
        this.setState({ cont: arr });
      }.bind(this),
      1
    );
  }

  actives = e => {
    const contDummy = [...this.state.cont];
    contDummy.forEach(i => {
      i.activeClass = "single-menu";
      if (i.data === e.target.textContent) i.activeClass = "active single-menu";
    });
    this.setState({ cont: contDummy });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ background: "white" }}
        >
          <div className="d-flex">
            <div className="er">
              <label className="er-label">ER</label>
            </div>
            <div className="hamb-menu">
              <div className="dropdown">
                <img src={Hamb} alt="hamburger icon" data-toggle="dropdown" />
                <ul className="dropdown-menu">
                  <li>
                    <Link to="dashboard">Dashboards</Link>
                  </li>
                  <li>
                    <Link to="allAcounts">All Accounts</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="headers-menu">
              {this.state.cont.map(item => (
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
                  {item.data}
                </Link>
              ))}
            </div>
          </div>

          <div className="header-right-icons">
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
            <a href="settings">
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
              SM
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
                  <p style={{ marginTop: "15px", marginBottom: "0" }}>
                    Naman Rampal
                  </p>
                  <p className="mail-id">naman@fabindia.com</p>
                </div>
                <button style={{ cursor: "pointer" }}>LOGOUT</button>
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

export default TenantHeader;
