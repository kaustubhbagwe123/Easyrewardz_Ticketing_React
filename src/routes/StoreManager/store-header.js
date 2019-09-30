import React, { Component } from "react";
import DashboardLogo from "./../../assets/Images/storeBlue.png";
import TicketLogo from "./../../assets/Images/ticket.png";
import ChatLogo from "./../../assets/Images/chat.png";
import NotificationLogo from "./../../assets/Images/Notification.png";
import SettingLogo from "./../../assets/Images/setting.png";
import Hamb from "./../../assets/Images/hamb.png";
import ClaimLogo from "./../../assets/Images/icon9.svg";
import DashboardLogoBlue from "./../../assets/Images/dashboardBlue.png";
import KnowledgeLogoBlue from "./../../assets/Images/knowledge-blue.png";
import SettingLogoBlue from "./../../assets/Images/setting-blue.png";
import ClaimLogoBlue from "./../../assets/Images/claim-blue.png";
import CalendarLogoBlue from "./../../assets/Images/calendar-blue.png";
import Demo from "./../../store/Hashtag";
import TicketLogoBlue from "./../../assets/Images/ticket-blue.png";
import KnowledgeLogo from "./../../assets/Images/knowledge.png";
import ChatLogoBlue from "./../../assets/Images/chat-blue.png";

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
      // <div className="card-Nav">
      //   <div className="card-header1">
      //     <div className="container-fluid">
      //       <div className="row card-row">
      //         <div className="col-md-8 p-0">
      //           <div className="er">
      //             <label className="er-label">ER</label>
      //           </div>
      //           <div className="hamb-menu">
      //             <img src={Hamb} alt="hamburger icon" />
      //           </div>
      //           <div className="col-md-2 store-nav-tab3">
      //             <img
      //               src={DashboardLogo}
      //               alt="logo"
      //               className="store-dashboardImg1"
      //             />
      //             <a href="/store/storedashboard">
      //               <label className="dashboards-label1">Dashboard</label>
      //             </a>
      //           </div>

      //           <div className="col-md-2 store-nav-tab1">
      //             <img src={TicketLogo} alt="logo" className="store-myTicket" />
      //             <a href="StoreTask">
      //               <label className="myTiket-label">Task</label>
      //             </a>
      //           </div>
      //           <div className="col-md-2 store-claim-space">
      //             <img src={ClaimLogo} alt="logo" className="store-claim-logo" />
      //             <a href="claim">
      //               <label>Claim</label>
      //             </a>
      //           </div>
                
      //         </div>
      //         <div className="store-main-nav">
      //           <div className="storeHeader1">
      //             <img src={ChatLogo} alt="logo" className="store-chatImg" />
      //           </div>
      //           <div className="bitmap3">
      //             <img
      //               src={NotificationLogo}
      //               alt="logo"
      //               className="store-notifi"
      //             />
      //           </div>
      //           <div className="bitmap4">
      //             <img src={SettingLogo} alt="logo" className="store-setting" />
      //           </div>
      //           <div className="store-bitmap5">
      //             <label>NR</label>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>

      //   {/* <Modal
      //     onClose={this.closeModal}
      //     open={this.state.modalIsOpen}
      //     modalId="Notification-popup"
      //     overlayId="logout-ovrly"
      //   >
      //     <div className="row rowpadding">
      //       <div className="md-2 rectangle-2 lable05">
      //         <label className="labledata">05</label>
      //       </div>
      //       <div className="md-6 new-tickets-assigned">
      //         <label>New Tickets assigned to you</label>
      //       </div>
      //       <div className="viewticketspeadding">
      //         <a href="{#}">
      //           {" "}
      //           <label className="md-4 view-tickets">VIEW TICKETS</label>
      //         </a>
      //       </div>
      //     </div>
      //     <div className="row rowpadding">
      //       <div className="md-2 rectangle-2 lable05">
      //         <label className="labledata">05</label>
      //       </div>
      //       <div className="md-6 new-tickets-assigned">
      //         <label>Update happened to your tickets</label>
      //       </div>
      //       <div className="viewticketspeadding">
      //         <a href="{#}">
      //           {" "}
      //           <label className="md-4 view-tickets">VIEW TICKETS</label>
      //         </a>
      //       </div>
      //     </div>
      //     <div className="row rowpadding">
      //       <div className="md-2 rectangle-2 lable05">
      //         <label className="labledata">05</label>
      //       </div>
      //       <div className="md-6 new-tickets-assigned">
      //         <label>Escalation in your ticket</label>
      //       </div>
      //       <div className="viewticketspeadding">
      //         <a href="{#}">
      //           {" "}
      //           <label className="md-4 view-tickets">VIEW TICKETS</label>
      //         </a>
      //       </div>
      //     </div>
      //   </Modal> */}
      //   <div>
      //     {/* <Modal
      //       open={this.state.open}
      //       onClose={this.onCloseModal}
      //       center
      //       modalId="logout-popup"
      //       overlayId="logout-ovrly"
      //     >
      //       <div className="logout-block">
      //         <div>
      //           <div className="user-img">
      //             <img src={UserLogo} alt="User" />
      //           </div>
      //           <div>
      //             <p>Naman Rampal</p>
      //             <p className="mail-id">naman@fabindia.com</p>
      //           </div>
      //           <button>LOGout</button>
      //         </div>
      //         <div className="status-sctn">
      //           <div className="d-flex align-items-center">
      //             <div className="logout-status">
      //               <img src={StatusLogo} alt="status" />
      //             </div>
      //             <p className="logout-label chat-status">Chat Status :</p>
      //           </div>
      //           <div className="status-options">
      //             <input type="radio" name="logout-status" id="online" />
      //             <label htmlFor="online" className="logout-label">
      //               Online
      //             </label>
      //           </div>
      //           <div className="status-options">
      //             <input type="radio" name="logout-status" id="away" />
      //             <label htmlFor="away" className="logout-label">
      //               Away
      //             </label>
      //           </div>
      //           <div className="status-options">
      //             <input type="radio" name="logout-status" id="offline" />
      //             <label htmlFor="offline" className="logout-label">
      //               Offline
      //             </label>
      //           </div>
      //         </div>
      //         <div className="d-block">
      //           <div className="d-flex justify-content-between">
      //             <div>
      //               <p className="logout-label">Login Time</p>
      //               <p className="font-weight-bold">9:30 AM</p>
      //             </div>
      //             <div>
      //               <p className="logout-label">Logout Time</p>
      //               <p className="font-weight-bold">6:30 PM</p>
      //             </div>
      //           </div>
      //           <ProgressBar className="logout-progress" now={60} />
      //           <p className="logout-label font-weight-bold prog-indi">
      //             5H 23M
      //           </p>
      //         </div>
      //         <div>
      //           <div>
      //             <p className="logout-label">SLA SCORE</p>
      //             <p className="font-weight-bold">60%</p>
      //           </div>
      //           <div>
      //             <p className="logout-label">Avg Response time</p>
      //             <p className="font-weight-bold">1 Hr</p>
      //           </div>
      //           <div>
      //             <p className="logout-label">CSAT SCORE</p>
      //             <p className="font-weight-bold">90%</p>
      //           </div>
      //         </div>
      //       </div>
      //     </Modal> */}
      //   </div>
      // </div>
      <React.Fragment>
      <div className="d-flex align-items-center justify-content-between" style={{background:'white'}}>
        <div className="d-flex">
          <div className="er">
            <label className="er-label">ER</label>
          </div>
          <div className="hamb-menu">
            <img src={Hamb} alt="hamburger icon" />
          </div>
          <div className="headers-menu">
            <a href="/store/storedashboard" className="single-menu">
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
            {/* <a href={Demo.BLANK_LINK} className="single-menu">
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
            </a> */}
            <a href="StoreTask" className="single-menu">
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
            </a>
            {/* <a href={Demo.BLANK_LINK} className="single-menu">
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
            </a> */}
            {/* <a href="/admin/dashboard" className="single-menu">
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
            </a> */}
            {/* <a href={Demo.BLANK_LINK} className="single-menu">
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
            </a> */}
            <a href={Demo.BLANK_LINK} className="single-menu">
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
            {/* <a href={Demo.BLANK_LINK} className="single-menu">
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
            </a> */}
          </div>
        </div>

        <div className="header-right-icons">
          {/* <a href="#!">
            <img src={CalenderLogo} alt="logo" className="calImg" />
          </a> */}
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
          <a href="#!" className="bitmap5">
            SM
          </a>
        </div>
      </div>
      <div>
      </div>
    </React.Fragment>
    );
  }
}

export default Header;
