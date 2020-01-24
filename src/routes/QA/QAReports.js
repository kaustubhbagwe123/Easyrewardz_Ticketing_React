import React, { Component, Fragment } from "react";
import Demo from "./../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DownExcel from "./../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";
import { Popover } from "antd";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../assets/Images/del-big.png";

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
        statusReport: "Active"
      },
      {
        nameReport: "QA Score - Agent",
        scheduleReport: "Weekly",
        statusReport: "Inactive"
      },
      {
        nameReport: "QA Done Tickets",
        scheduleReport: "Monthly",
        statusReport: "Active"
      },
      {
        nameReport: "Pending QA Tickets",
        scheduleReport: "Daily",
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
        accessor: "createdReport",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Admin
                <Popover content={popoverData} placement="bottom">
                  <img
                    className="info-icon-cp"
                    src={BlackInfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover>
              </span>
            </div>
          );
        }
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
           <Popover content={ActionDelete} placement="bottom" trigger="click">
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    
                  />
                </Popover>
            <button className="react-tabel-button editre" id="p-edit-pop-2">
              EDIT
            </button>
          </span>
        )
      }
    ];
    const popoverData = (
      <>
        <div>
          <b>
            <p className="title">Created By: Admin</p>
          </b>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: Manager</p>
          </b>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </>
    );
    const ActionDelete = (
      <div className="d-flex general-popover popover-body">
        <div className="del-big-icon">
          <img src={DelBigIcon} alt="del-icon" />
        </div>
        <div>
          <p className="font-weight-bold blak-clr">Delete file?</p>
          <p className="mt-1 fs-12">
            Are you sure you want to delete this file?
          </p>
          <div className="del-can">
            <a href={Demo.BLANK_LINK}>CANCEL</a>
            <button className="butn">Delete</button>
          </div>
        </div>
      </div>
    );
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
                className="addplusbtnReport"
                onClick={this.handleAddReportOpen}
              >
              + Add
                
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
          <div style={{backgroundColor:"#FFF"}}>
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
        </div>
      </Fragment>
    );
  }
}

export default QAReports;
