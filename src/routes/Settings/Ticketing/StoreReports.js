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
// import DatePicker from "react-datepicker";

class StoreReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      ReportCreateDate: "",
      tabIndex: 0
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
  }
  handleAddReportOpen() {
    this.setState({ AddReportPopup: true, tabIndex: 0 });
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
  handleChangeTab(index) {
    this.setState({
      tabIndex: index
    });
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
            Store
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
            modalId="addStorereport-modal"
            // overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 0 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#task-tab"
                    role="tab"
                    aria-controls="task-tab"
                    aria-selected="true"
                    style={{pointerEvents:'none'}}
                  >
                    Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 1 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#claim-tab"
                    role="tab"
                    aria-controls="claim-tab"
                    aria-selected="false"
                    style={{pointerEvents:'none'}}
                  >
                    Claim
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 2 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#campaign-tab"
                    role="tab"
                    aria-controls="campaign-tab"
                    aria-selected="false"
                    style={{pointerEvents:'none'}}
                  >
                    Campaign
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
                className={`tab-pane fade ${this.state.tabIndex === 0 &&
                  "show active"}`}
                id="task-tab"
                role="tabpanel"
                aria-labelledby="task-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task ID/ Title</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Task ID/ Title"
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Department</label>
                      <select>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Task Creation On</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Task Creation On"
                      />
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task Status</label>
                      <select>
                        <option>Opne</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Function</label>
                      <select>
                        <option>Attendence</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Created by</label>
                      <select>
                        <option>Naman</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Ticket ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Task ID/ Title"
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Priority</label>
                      <select>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Assigned To</label>
                      <select>
                        <option>Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task With Ticket</label>
                      <select>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Task With Claim</label>
                      <select>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleChangeTab.bind(this, 1)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 1 &&
                  "show active"}`}
                id="claim-tab"
                role="tabpanel"
                aria-labelledby="claim-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Category</label>
                      <select>
                        <option>Refund</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Creation On</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Status</label>
                      <select>
                        <option>Open</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Sub Category</label>
                      <select>
                        <option>Shoe Broken</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Created by</label>
                      <select>
                        <option>Naman</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Ticket ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Issue Type</label>
                      <select>
                        <option>Refund in 7 days</option>
                        <option>Refund in 9 days</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Assigned To</label>
                      <select>
                        <option>Naman</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim With Tickets</label>
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim With Task</label>
                      <select>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Task ID</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        // onClick={this.handleNextPopupOpen}
                        onClick={this.handleChangeTab.bind(this, 2)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 2 &&
                  "show active"}`}
                id="campaign-tab"
                role="tabpanel"
                aria-labelledby="campaign-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Name</label>
                      <input className="no-bg" type="text" />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Assigned To</label>
                      <select>
                        <option>Naman</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                    <label>Campaign End Date</label>
                      <input className="no-bg" type="text" />
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Status</label>
                      <select>
                        <option>Open</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen}
                        // onClick={this.handleChangeTab.bind(this,2)}
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
                  <div className="store-totalresultcircle">
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
                    <button className="Schedulenext1" onClick={this.handleNextPopupClose}>SAVE</button>
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

export default StoreReports;