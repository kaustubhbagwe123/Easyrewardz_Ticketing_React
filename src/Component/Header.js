import React, { Component } from 'react';
import Modal from 'react-modal';

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="card-Nav">
        <div className="card-header1">
          <div className="row card-row">
            <div className="col-md-8">
              <div className="er">
                <label className="er-label">ER</label>
              </div>
              <div className="col-md-2 nav-tab3">
                <img src="Images/dashboard.png" alt="logo" className="dashboardImg1" />
                {/* <label className="dashboards-label1">Dashboard</label> */}
                <a href="dashboard" className="dashboards-label1">Dashboard</a>
              </div>
              
              <div className="col-md-2 nav-tab1">
                <img src="Images/ticket.png" alt="logo" className="myTicket" />
                {/* <label>My Tickets</label> */}
                <a href="myTicket">My Tickets</a>
              </div>
              <div className="col-md-2 claim-space">
                {/* <label className="claim-label">Claim</label> */}
                <a href="claim" className="claim-label">Claim</a>
              </div>
              <div className="col-md-4 nav-tab2">
                <img src="Images/knowledge.png" alt="logo" className="knowledgeNav" />
                <label className="knowledge-label">Knowledge Base</label>
              </div>
            </div>
            <div className="main-nav">
              <div className="bitmap1">
                <img src="Images/calender.png" alt="logo" className="calImg" />
              </div>
              <div className="bitmap2">
                <img src="Images/chat.png" alt="logo" className="chatImg" />
              </div>
              <div className="bitmap3">
                <img src="Images/Notification.png" alt="logo" className="notifi" onClick={this.openModal} />
              </div>
              <div className="bitmap4">
                <img src="Images/setting.png" alt="logo" className="setting" />
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="Model"
          onRequestClose={this.closeModal}
          isOpen={this.state.modalIsOpen}>
          <div className="row rowpadding">
            <div className="md-2 rectangle-2 lable05">
              <label className="labledata">05</label>
            </div>
            <div className="md-6 new-tickets-assigned">
              <label>New Tickets assigned to you</label>
            </div>
            <div className="viewticketspeadding">
              <a href="{#}"> <label className="md-4 view-tickets">VIEW TICKETS</label></a>
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
              <a href="{#}"> <label className="md-4 view-tickets">VIEW TICKETS</label></a>
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
              <a href="{#}"> <label className="md-4 view-tickets">VIEW TICKETS</label></a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Header
