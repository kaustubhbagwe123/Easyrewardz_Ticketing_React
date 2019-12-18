import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DownExcel from "./../../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      ReportCreateDate: "",
      tabIndex:0
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
  }
  handleAddReportOpen() {
    this.setState({ AddReportPopup: true ,tabIndex :0});
  }
  handleAddReportClose() {
    this.setState({ AddReportPopup: false });
  }
  handleNextPopupOpen() {
    this.handleAddReportClose();
    this.setState({ NextPopup: true });
  }
  handleNextPopupClose() {
    this.setState({ NextPopup: false });
  }
  handleReportCreateDate(date) {
    this.setState({ ReportCreateDate: date });
  }
  handleChangeTab(index){
    this.setState({
      tabIndex:index
    })
  }
  render() {
    const datareport = [
      {
        nameReport: "Open Tickets",
        scheduleReport: "Daily",
        createdReport: (
          <span>
            <label>
              Admin
              <img src={InfoImg} className="info-icon" alt="Info" />
            </label>
          </span>
        ),
        statusReport: "Active"
      },
      {
        nameReport: "Escalated Tickets",
        scheduleReport: "Weekly",
        createdReport: (
          <span>
            <label>
              Admin
              <img src={InfoImg} className="info-icon" alt="Info" />
            </label>
          </span>
        ),
        statusReport: "Inactive"
      },
      {
        nameReport: "Resolved Tickets",
        scheduleReport: "Monthly",
        createdReport: (
          <span>
            <label>
              Admin
              <img src={InfoImg} className="info-icon" alt="Info" />
            </label>
          </span>
        ),
        statusReport: "Active"
      },
      {
        nameReport: "Tickets with task",
        scheduleReport: "Daily",
        createdReport: (
          <span>
            <label>
              Admin
              <img src={InfoImg} className="info-icon" alt="Info" />
            </label>
          </span>
        ),
        statusReport: "Inactive"
      },
      {
        nameReport: "Categorywise open tickets",
        scheduleReport: "Weekly",
        createdReport: (
          <span>
            <label>
              Admin
              <img src={InfoImg} className="info-icon" alt="Info" />
            </label>
          </span>
        ),
        statusReport: "Active"
      }
    ];

    const columnsreport = [
      {
        Header: (
          <span>
            Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "nameReport"
      },
      {
        Header: (
          <span>
            Schedule Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "scheduleReport"
      },
      {
        Header: (
          <span>
            Created by
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdReport"
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "statusReport"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actionReport",
        Cell: row => (
          <span>
            <img
              src={DownExcel}
              alt="download icon"
              className="downloadaction"
            />
            <img src={DeleteIcon} alt="del-icon" className="downloadaction" />
            <button className="react-tabel-button" id="p-edit-pop-2">
              <label className="Table-action-edit-button-text">EDIT</label>
            </button>
          </span>
        )
      }
    ];

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Reports
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtn"
                onClick={this.handleAddReportOpen}
              >
                <label className="addplusbtntext">+ Add</label>
              </button>
            </div>
          </div>
          <Modal
            open={this.state.AddReportPopup}
            onClose={this.handleAddReportClose}
            closeIconId="sdsg"
            modalId="addreport-popup"
            // overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex ===0 && 'active'} `}
                    data-toggle="tab"
                    href="#ticket-tab"
                    role="tab"
                    aria-controls="ticket-tab"
                    aria-selected="true"
                  >
                    Tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex ===1 && 'active'} `}
                    data-toggle="tab"
                    href="#chat-tab"
                    role="tab"
                    aria-controls="chat-tab"
                    aria-selected="false"
                  >
                    Chats
                  </a>
                </li>
              </ul>
              <img
                src={CancelImg}
                alt="CancelImg"
                className="cancelImg-alert"
                onClick={this.handleAddReportClose.bind(this)}
              />
            </div>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${this.state.tabIndex === 0 && 'show active'}`}
                id="ticket-tab"
                role="tabpanel"
                aria-labelledby="ticket-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Selected Brand</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Source</label>
                      <select>
                        <option>Open</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Invoice No/Sub Order No</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Customer Email Id</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Creation Date</label>
                      <DatePicker
                        selected={this.state.ReportCreateDate}
                        onChange={this.handleReportCreateDate.bind(this)}
                        placeholderText="Creation Date"
                        showMonthDropdown
                        showYearDropdown
                        // className="form-control"
                      />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Id/title</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Item Id</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Customer Mobile No.</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Last Updated Date</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Priority</label>
                      <select>
                        <option>High</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Visited Store</label>
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Assigned To</label>
                      <select>
                        <option>Naman</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Category</label>
                      <select>
                        <option>Complaint</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Status</label>
                      <select>
                        <option>Open</option>
                        <option>Close</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Want To Visit Store</label>
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Sub Category</label>
                      <select>
                        <option>Select</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>SLA Status</label>
                      <select>
                        <option>2 Days</option>
                        <option>3 Days</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Want To Visit Store Code/Addres</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Issue Type</label>
                      <select>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Claim ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Purchase Store</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>With Claim</label>
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>With Task</label>
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Status</label>
                      <select>
                        <option>Approve</option>
                        <option>Reject</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Task Status</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Category</label>
                      <select>
                        <option>Exchange</option>
                        <option>Change</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Task Priority</label>
                      <select>
                        <option>High</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Sub Category</label>
                      <select>
                        <option>Select</option>
                        <option>Select</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Task Department</label>
                      <select>
                        <option>Admin</option>
                        <option>Admin1</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Issue Type</label>
                      <select>
                        <option>Select</option>
                        <option>Select</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Task Function</label>
                      <select>
                        <option>Attandance</option>
                        <option>Attandance1</option>
                      </select>
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button className="nextbutton-text" type="submit" onClick={this.handleChangeTab.bind(this,1)}>
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 1 && 'show active'}`}
                id="chat-tab"
                role="tabpanel"
                aria-labelledby="chat-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>Chat Id</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Chat Status Remark</label>
                      <select>
                        <option>On Chat Resolution</option>
                        <option>Resolution</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Chat Ratings</label>
                      <select>
                        <option>Good</option>
                        <option>Bad</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>Chat Date</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Ticket ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Customer Email ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>Chat Status</label>
                      <select>
                        <option>Chat Start</option>
                        <option>Chat End</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Chat Assigned To</label>
                      <select>
                        <option>Naman</option>
                        <option>Naman R.</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Customer Mobile No.</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            open={this.state.NextPopup}
            onClose={this.handleNextPopupClose}
            closeIconId="sdsg"
            modalId="nextbuttonpopup"
            // overlayId="logout-ovrly"
          >
            <div className="container contpaddre">
              <div className="setting-tabs entercenter">
                <label className="reportdetail">Enter Report Details</label>
                <img
                  src={CancelImg}
                  alt="CancelImg"
                  className="cancelnextpopup"
                  onClick={this.handleNextPopupClose.bind(this)}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="totalresultcircle">
                    <label className="totalresult">Total Result</label>
                    <span className="totalresultnumber">1242</span>
                  </div>
                </div>
                <div className="col-md-6 rname">
                  <div className="ranmetext">
                    <label className="renametext">Report Name</label>
                    <input
                      className="no-bg"
                      type="text"
                      placeholder="Open Tickets"
                    />
                  </div>
                  <div className="buttonschdulesave">
                    <button className="Schedulenext">SCHEDULE</button>
                  </div>
                  <div className="buttonschdulesave1">
                    <button className="Schedulenext1">SAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {/* </div> */}
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr reactreport">
            <ReactTable
              data={datareport}
              columns={columnsreport}
              // resizable={false}
              defaultPageSize={5}
              showPagination={false}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Reports;