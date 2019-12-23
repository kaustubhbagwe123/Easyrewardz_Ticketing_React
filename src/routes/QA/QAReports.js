import React, { Component, Fragment } from "react";
import Demo from "./../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import InfoImg from "./../../assets/Images/icons8-info.svg";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";
import DownExcel from "./../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";

class QAReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      QAFromDate: "",
      QAToDate: "",
      AssignedDate: "",
      TicketResolutionDate: "",
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
  handleQAFromDate(date) {
    this.setState({ QAFromDate: date });
  }
  handleQAToDate(date) {
    this.setState({ QAToDate: date });
  }
  handleAssignedDate(date) {
    this.setState({ AssignedDate: date });
  }
  handleTicketResolutionDate(date) {
    this.setState({
      TicketResolutionDate: date
    });
  }
  handleChangeTab(index) {
    this.setState({
      tabIndex: index
    });
  }
  render() {
    const datareport = [
      {
        nameReport: "QA Score - QA Lead",
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
        nameReport: "QA Score - Agent",
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
        nameReport: "QA Done Tickets",
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
        nameReport: "Pending QA Tickets",
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
            QA
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
                    className={`nav-link ${this.state.tabIndex === 0 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#qualityScoreAgent"
                    role="tab"
                    aria-controls="qualityScoreAgent"
                    aria-selected="true"
                  >
                    Quality Score by Agent/ QL
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 1 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#ticketAuditDone-Pending"
                    role="tab"
                    aria-controls="ticketAuditDone-Pending"
                    aria-selected="false"
                  >
                    Ticket Audit Done/ Pending
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
                id="qualityScoreAgent"
                role="tabpanel"
                aria-labelledby="qualityScoreAgent"
              >
                <div className="container reportpad QaModal">
                  <div className="row">
                    <div className="col-md-4 qAReport">
                      <label>Select Agent/ QA Lead</label>
                      <select>
                        <option>Naman</option>
                        <option>Vikas</option>
                      </select>
                    </div>
                    <div className="col-md-4 qAReport">
                      <label>QA From Date</label>
                      <DatePicker
                        selected={this.state.QAFromDate}
                        onChange={this.handleQAFromDate.bind(this)}
                        placeholderText="QA From Date"
                        showMonthDropdown
                        showYearDropdown
                        // className="form-control"
                      />
                    </div>
                    <div className="col-md-4 qAReport">
                      <label>QA To Date</label>
                      <DatePicker
                        selected={this.state.QAToDate}
                        onChange={this.handleQAToDate.bind(this)}
                        placeholderText="QA To Date"
                        showMonthDropdown
                        showYearDropdown
                        // className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text m-t-20"
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
                id="ticketAuditDone-Pending"
                role="tabpanel"
                aria-labelledby="ticketAuditDone-Pending"
              >
                <div className="container reportpad QaModal">
                  <div className="row m-b-10">
                    <div className="col-md-4 qAReport">
                      <label>Audit Status</label>
                      <select>
                        <option>Pending</option>
                        <option>Done</option>
                      </select>
                    </div>
                    <div className="col-md-4 qAReport">
                      <label>Assigned To</label>
                      <select>
                        <option>Naman</option>
                        <option>Vikas</option>
                      </select>
                    </div>
                    <div className="col-md-4 qAReport Qadate">
                      <label>Assigned Date</label>
                      <DatePicker
                        selected={this.state.AssignedDate}
                        onChange={this.handleAssignedDate.bind(this)}
                        placeholderText="Assigned Date"
                        showMonthDropdown
                        showYearDropdown
                        // className="form-control"
                      />
                      
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 qAReport">
                      <label>Ticket Source</label>
                      <select>
                        <option>Email</option>
                        <option>SMS</option>
                      </select>
                    </div>
                    <div className="col-md-4 qAReport">
                      <label>Ticket Category</label>
                      <select>
                        <option>Compalaint</option>
                      </select>
                    </div>
                    <div className="col-md-4 qAReport">
                      <label>Ticket Resolution Date</label>
                      <DatePicker
                        selected={this.state.TicketResolutionDate}
                        onChange={this.handleTicketResolutionDate.bind(this)}
                        placeholderText="Ticket Resolution Date"
                        showMonthDropdown
                        showYearDropdown
                        // className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text  m-t-15"
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
          <div className="store-settings-cntr QAreports">
            <ReactTable
              data={datareport}
              columns={columnsreport}
              // resizable={false}
              defaultPageSize={5}
              showPagination={false}
            />
            <div className="position-relative1">
                    <div className="pagi">
                      <ul>
                        <li>
                          <a href={Demo.BLANK_LINK}>&lt;</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>1</a>
                        </li>
                        <li className="active">
                          <a href={Demo.BLANK_LINK}>2</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>3</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>4</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>5</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>6</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                    <div className="item-selection">
                      <select>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                      <p>Items per page</p>
                    </div>
                  </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QAReports;
