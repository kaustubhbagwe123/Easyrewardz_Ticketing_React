import React, { Component } from "react";
import DashboardLogo from "./../../assets/Images/storeBlue.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import ChatLogo from "./../../assets/Images/chat.png";
import NotificationLogo from "./../../assets/Images/Notification.png";
import SettingLogo from "./../../assets/Images/setting.png";
import Hamb from "./../../assets/Images/hamb.png";
import ClaimLogo from "./../../assets/Images/icon9.svg";
import DashboardLogoBlue from "./../../assets/Images/dashboardBlue.png";
// import KnowledgeLogoBlue from "./../../assets/Images/knowledge-blue.png";
import SettingLogoBlue from "./../../assets/Images/setting-blue.png";
import ClaimLogoBlue from "./../../assets/Images/claim-blue.png";
// import CalendarLogoBlue from "./../../assets/Images/calendar-blue.png";
import StatusLogo from "./../../assets/Images/status.png";
import TicketLogoBlue from "./../../assets/Images/ticket-blue.png";
import ChatLogoBlue from "./../../assets/Images/chat-blue.png";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authHeader } from "../../helpers/authHeader";
import config from "../../helpers/config";
import axios from "axios";

class Header extends Component {
  state = {
    modalIsOpen: false,
    open: false,
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

  handleLogoutMethod() {
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreAccount/Logout",
      headers: authHeader(),
    })
      .then(function (res) {
        //
        var status = res.data.status;
        // var Msg=res.data.message
        if (status === true) {
          //NotificationManager.success(Msg);
          localStorage.clear();
          window.location.href = "/storeProgramCode";
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

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
              <img src={Hamb} alt="hamburger icon" />
            </div>
            <div className="headers-menu">
              <Link to="storedashboard" className="single-menu">
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
              </Link>

              <Link to="StoreTask" className="single-menu">
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
                Task
              </Link>

              <Link to="claim" className="single-menu">
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
              </Link>
            </div>
          </div>

          <div className="header-right-icons">
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
              <img src={NotificationLogo} alt="logo" className="notifi" />
              <span style={{ display: "none" }} className="icon-fullname">
                Notifications
              </span>
            </a>
            <Link to="/admin/settings">
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
            </Link>
            <a href="#!" className="bitmap5" onClick={this.onOpenModal}>
              SM
            </a>
          </div>
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
              {/* <div className="user-img">
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
              </div> */}
              <div className="logout-flex">
                {/* <div>
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    {this.state.UserName}
                    &nbsp;
                    <Link to="userprofile">
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
                </div> */}
                <button
                  type="button"
                  className="logout"
                  onClick={this.handleLogoutMethod.bind(this)}
                >
                  LOGOUT
                </button>
              </div>
            </div>
            <div className="status-sctn alignradio d-none">
              <div className="d-flex align-items-center">
                <div className="logout-status" style={{ marginTop: "10px" }}>
                  <img src={StatusLogo} alt="status" />
                </div>
                <p className="logout-label chat-status">CHAT STATUS :</p>
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
            {/* <div className="d-block">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="logout-label">Login Time</p>
                  <p className="font-weight-bold" style={{ fontSize: "16px" }}>
                    {this.state.LoginTime}
                  </p>
                </div>
                <div>
                  <p className="logout-label">Logout Time</p>
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
            </div> */}
            {/* <div>
              <div>
                <p className="logout-label">SLA SCORE</p>
                <p className="font-weight-bold">{this.state.SLAScore}</p>
              </div>
              // <div>
                  // <p className="logout-label">CSAT SCORE</p>
                  // <p className="font-weight-bold">{this.state.CSatScore}</p>
                // </div>
              <div>
                <p className="logout-label">Avg Response time</p>
                <p className="font-weight-bold">{this.state.AvgResponse}</p>
              </div>
            </div> */}
          </div>
        </Modal>
        <div></div>
      </React.Fragment>
    );
  }
}

export default Header;
