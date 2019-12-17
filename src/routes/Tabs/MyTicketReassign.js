import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import CancalImg from "./../../assets/Images/cancal blue.png";
import { Collapse, CardBody, Card } from "reactstrap";
import csv from "./../../assets/Images/csv.png";
import Schedule from "./../../assets/Images/schedule.png";
import Assign from "./../../assets/Images/assign.png";
import DatePicker from "react-datepicker";
import Demo from "./../../store/Hashtag.js";
import DelSearch from "./../../assets/Images/del-search.png";
import Modal from "react-responsive-modal";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import SearchIcon from "./../../assets/Images/search-icon.png";
import Sorting from "./../../assets/Images/sorting.png";

class MyTicketReassign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AssignModal: false,
      collapseSearch: false,
      BysDateCreatDate: "",
      ByDateSelectDate: "",
      ByAllCreateDate: "",
      ByAllLastDate: "",
      open: false,
      Schedule: false,
      StatusModel: false
    };
    this.toggleSearch = this.toggleSearch.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }
  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }
  toggleSearch() {
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
  }
  handleByDateCreate(date) {
    this.setState({ ByDateCreatDate: date });
  }
  handleChangeSelectDate(date) {
    this.setState({ ByDateSelectDate: date });
  }
  handleAllCreateDate(date) {
    this.setState({ ByAllCreateDate: date });
  }
  handleAllLastDate(date) {
    this.setState({ ByAllLastDate: date });
  }
  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  checkAllCheckbox(event) {
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName(
      "MyTicketListReassigncheckbox[]"
    );
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
    }
  }
  render() {
    const TitleChange = this.state.collapseSearch
      ? "Close Search"
      : "Search Tickets";

    const ImgChange = this.state.collapseSearch ? (
      <img className="search-icon" src={CancalImg} alt="search-icon" />
    ) : (
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
    );
    const dataReassign = [
      {
        idRe: (
          <span>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-reass1"
                  name="MyTicketListReassigncheckbox[]"
                />
                <label htmlFor="fil-reass1">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusNew: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        )
      },
      {
        idRe: (
          <span>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-reass2"
                  name="MyTicketListReassigncheckbox[]"
                />
                <label htmlFor="fil-reass2">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusNew: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        )
      },
      {
        idRe: (
          <span>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-reass3"
                  name="MyTicketListReassigncheckbox[]"
                />
                <label htmlFor="fil-reass3">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusNew: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        )
      }
    ];

    const columnsReassign = [
      {
        Header: (
          <span>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-reassall"
                  name="MyTicketListReassigncheckbox[]"
                  onChange={this.checkAllCheckbox.bind(this)}
                />
                <label htmlFor="fil-reassall" className="ticketid">
                  ID
                </label>
              </div>
            </div>
          </span>
        ),
        accessor: "idRe"
      },
      {
        Header: (
          <span onClick={this.StatusOpenModel}>
            Status <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "statusNew"
      },
      {
        Header: (
          <span>
            Subject
            <span style={{ fontWeight: "bold", fontSize: "13px !important" }}>
              /Lastest Message
            </span>
          </span>
        ),
        accessor: "subjectNew",
        Cell: props => (
          <label>
            Need to change my shipping address{" "}
            <span style={{ display: "block" }}>
              Hope this help, Please rate us
            </span>
          </label>
        )
      },
      {
        Header: (
          <span>
            Category <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "categoryNew",
        Cell: props => (
          <span>
            <label>Defective article </label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        Header: (
          <span>
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "priorityNew",
        Cell: props => <span>High</span>
      },
      {
        Header: (
          <span>
            Assigne <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assigneeNew",
        Cell: props => <span>Naman</span>
      },
      {
        Header: (
          <span>
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew",
        Cell: props => (
          <span>
            <label>13 May 2019</label>

            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      }
    ];
    const DefArti = (
      <div className="dash-creation-popup-cntr">
        <ul className="dash-category-popup dashnewpopup">
          <li>
            <p>Category</p>
            <p>Defective article</p>
          </li>
          <li>
            <p>Sub Category</p>
            <p>Customer wants refund</p>
          </li>
          <li>
            <p>Type</p>
            <p>Delivery</p>
          </li>
        </ul>
      </div>
    );
    const InsertPlaceholder = (
      <div className="insertpop1">
        <ul className="dash-creation-popup">
          <li className="title">Creation details</li>
          <li>
            <p>Naman Created</p>
            <p>2 Hrs ago</p>
          </li>
          <li>
            <p>Assigned to Vikas</p>
            <p>1.5 Hrs ago</p>
          </li>
          <li>
            <p>Vikas updated</p>
            <p>1 Hr ago</p>
          </li>
          <li>
            <p>Response time remaining by</p>
            <p>30 mins</p>
          </li>
          <li>
            <p>Response overdue by</p>
            <p>1 Hr</p>
          </li>
          <li>
            <p>Resolution overdue by</p>
            <p>2 Hrs</p>
          </li>
        </ul>
      </div>
    );
    return (
      <Fragment>
        <div className="container-fluid">
          <div
            className="table-cntr mt-3 mtictab table-responsive"
            style={{ overflow: "initial" }}
          >
            <div>
              <Collapse isOpen={this.state.collapseSearch}>
                <Card>
                  <CardBody>
                    <div className="myticlist-expand-sect">
                      <div className="position-relative">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#date-tabRea"
                              role="tab"
                              aria-controls="date-tabRea"
                              aria-selected="true"
                            >
                              By Date
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#customer-tabRea"
                              role="tab"
                              aria-controls="customer-tabRea"
                              aria-selected="false"
                            >
                              By Customer Type
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#ticket-tabRea"
                              role="tab"
                              aria-controls="ticket-tabRea"
                              aria-selected="false"
                            >
                              By Ticket Type
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#category-tabRea"
                              role="tab"
                              aria-controls="category-tabRea"
                              aria-selected="false"
                            >
                              By Category
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#all-tabRea"
                              role="tab"
                              aria-controls="all-tabRea"
                              aria-selected="false"
                            >
                              All
                            </a>
                          </li>
                        </ul>
                        <div className="save-view-search">
                          <button onClick={this.onOpenModal}>
                            Save Search
                          </button>
                          <button className="btn-inv">View Search</button>
                        </div>
                      </div>
                      <Modal
                        open={this.state.open}
                        onClose={this.onCloseModal}
                        center
                        modalId="save-search-popup"
                        overlayId="save-search-ovrly"
                      >
                        <div className="save-search">
                          <p>SAVE SEARCH</p>
                        </div>
                        <div className="search-name">
                          <input
                            type="search"
                            placeholder="Give name to your search"
                          />
                          <button className="butn">Save</button>
                        </div>
                        <div className="search-names">
                          <div className="names-title">
                            <p>Search Name</p>
                            <p className="mar-comp">Action</p>
                          </div>
                          <ul>
                            <li>
                              <p>Open tickets with high priority</p>
                              <div>
                                <a href={Demo.BLANK_LINK}>APPLY</a>
                                <a href={Demo.BLANK_LINK} className="m-0">
                                  <img src={DelSearch} alt="del-search" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <p>Open tickets with high priority</p>
                              <div>
                                <a href={Demo.BLANK_LINK}>APPLY</a>
                                <a href={Demo.BLANK_LINK} className="m-0">
                                  <img src={DelSearch} alt="del-search" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <p>Open tickets with high priority</p>
                              <div>
                                <a href={Demo.BLANK_LINK}>APPLY</a>
                                <a href={Demo.BLANK_LINK} className="m-0">
                                  <img src={DelSearch} alt="del-search" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <p>Open tickets with high priority</p>
                              <div>
                                <a href={Demo.BLANK_LINK}>APPLY</a>
                                <a href={Demo.BLANK_LINK} className="m-0">
                                  <img src={DelSearch} alt="del-search" />
                                </a>
                              </div>
                            </li>
                            <li>
                              <p>Open tickets with high priority</p>
                              <div>
                                <a href={Demo.BLANK_LINK}>APPLY</a>
                                <a href={Demo.BLANK_LINK} className="m-0">
                                  <img src={DelSearch} alt="del-search" />
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </Modal>
                      <div className="tab-content p-0">
                        <div
                          className="tab-pane fade show active"
                          id="date-tabRea"
                          role="tabpanel"
                          aria-labelledby="date-tabRea"
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 col-sm-6">
                                <DatePicker
                                  selected={this.state.ByDateCreatDate}
                                  onChange={this.handleByDateCreate.bind(this)}
                                  placeholderText="Creation Date"
                                  showMonthDropdown
                                  showYearDropdown
                                  // className="form-control"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <DatePicker
                                  selected={this.state.ByDateSelectDate}
                                  onChange={this.handleChangeSelectDate.bind(
                                    this
                                  )}
                                  placeholderText="Last Updated Date"
                                  showMonthDropdown
                                  showYearDropdown
                                  // className="form-control"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>SLA Due</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Status</option>
                                </select>
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto d-flex align-items-center">
                                <p className="font-weight-bold mr-3">
                                  <span className="blue-clr">04</span> Results
                                </p>
                                <p className="blue-clr fs-14">CLEAR SEARCH</p>
                              </div>
                              <div className="col-auto mob-mar-btm">
                                <button>
                                  <img
                                    className="position-relative csv-icon"
                                    src={csv}
                                    alt="csv-icon"
                                  />
                                  CSV
                                </button>
                                <button
                                  type="button"
                                  onClick={this.ScheduleOpenModel}
                                >
                                  <img
                                    className="sch-icon"
                                    src={Schedule}
                                    alt="schedule-icon"
                                  />
                                  Schedule
                                </button>
                                <Modal
                                  onClose={this.ScheduleCloseModel}
                                  open={this.state.Schedule}
                                  modalId="ScheduleModel"
                                  overlayId="logout-ovrly"
                                >
                                  <div>
                                    <label>
                                      <b>Schedule date to</b>
                                    </label>
                                    <div>
                                      <select
                                        id="inputState"
                                        className="form-control dropdown-setting ScheduleDate-to"
                                      >
                                        <option>Team Member</option>
                                      </select>
                                      <select
                                        id="inputState"
                                        className="form-control dropdown-setting ScheduleDate-to"
                                      >
                                        <option>Monthly</option>
                                      </select>
                                      <select
                                        id="inputState"
                                        className="form-control dropdown-setting ScheduleDate-to"
                                      >
                                        <option>First day</option>
                                        <option>Last day</option>
                                      </select>
                                      <input
                                        type="text"
                                        className="txt-1 txt1Place"
                                        placeholder="Time"
                                      />
                                      <div>
                                        <button className="scheduleBtn">
                                          <label className="addLable">
                                            SCHEDULE
                                          </label>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </Modal>
                                <button
                                  className={
                                    this.state.TicketTabIndex ===
                                    "nav-link active"
                                      ? "btn-inv btn-dis"
                                      : "btn-inv"
                                  }
                                  onClick={
                                    this.state.TicketTabIndex !==
                                    "nav-link active"
                                      ? this.handleAssignModalOpen.bind(this)
                                      : null
                                  }
                                >
                                  <img
                                    src={Assign}
                                    className="assign-icon"
                                    alt="assign-icon"
                                  />
                                  Assign
                                </button>
                                <Modal
                                  onClose={this.handleAssignModalClose.bind(
                                    this
                                  )}
                                  open={this.state.AssignModal}
                                  modalId="AssignPop-up"
                                >
                                  <div className="assign-modal-headerDashboard">
                                    <img
                                      src={BlackLeftArrow}
                                      alt="black-left-arrow-icon"
                                      className="black-left-arrow"
                                      onClick={this.handleAssignModalClose.bind(
                                        this
                                      )}
                                    />
                                    <label className="claim-details">
                                      Assign Tickets To
                                    </label>
                                    <img
                                      src={SearchBlackImg}
                                      alt="SearchBlack"
                                      className="black-left-arrow srch-mleft-spc"
                                    />
                                  </div>
                                  <div className="assign-modal-div">
                                    <input
                                      type="text"
                                      className="txt-1 txt-btmSpace"
                                      placeholder="First Name"
                                    />
                                    <input
                                      type="text"
                                      className="txt-1 txt-btmSpace"
                                      placeholder="Last Name"
                                    />
                                    <input
                                      type="text"
                                      className="txt-1 txt-btmSpace"
                                      placeholder="Email"
                                    />
                                    <div className="txt-btmSpace">
                                      <select
                                        id="inputState"
                                        className="form-control dropdown-setting"
                                      >
                                        <option>Select</option>
                                        <option>Designation</option>
                                      </select>
                                    </div>
                                    <button
                                      className="butn assign-btn"
                                      type="button"
                                    >
                                      SEARCH
                                    </button>
                                    <a href="#!" className="anchorTag-clear">
                                      CLEAR
                                    </a>
                                  </div>
                                  <div className="assign-modal-body">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Agent</th>
                                          <th>Designation</th>
                                          <th>Email</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <img
                                              src={Headphone2Img}
                                              alt="headphone"
                                              className="oval-55 assign-hdphone"
                                            />
                                            Naman.R
                                          </td>
                                          <td>Supply</td>
                                          <td>naman@flipkart.com</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <img
                                              src={Headphone2Img}
                                              alt="headphone"
                                              className="oval-55 assign-hdphone"
                                            />
                                            Nidhi.J
                                          </td>
                                          <td>Supply</td>
                                          <td>naman@flipkart.com</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <img
                                              src={Headphone2Img}
                                              alt="headphone"
                                              className="oval-55 assign-hdphone"
                                            />
                                            Rashmi.C
                                          </td>
                                          <td>Supply</td>
                                          <td>naman@flipkart.com</td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <img
                                              src={Headphone2Img}
                                              alt="headphone"
                                              className="oval-55 assign-hdphone"
                                            />
                                            Juhi.H
                                          </td>
                                          <td>Supply</td>
                                          <td>naman@flipkart.com</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <textarea
                                      className="assign-modal-textArea"
                                      placeholder="Add Remarks"
                                    ></textarea>
                                    <button
                                      className="assign-butn btn-assign-tikcet"
                                      type="button"
                                    >
                                      ASSIGN TICKETS
                                    </button>
                                  </div>
                                </Modal>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="customer-tabRea"
                          role="tabpanel"
                          aria-labelledby="customer-tabRea"
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Customer Mobile No"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  type="text"
                                  className="no-bg"
                                  placeholder="Customer Email ID"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  type="text"
                                  className="no-bg"
                                  placeholder="Ticket ID"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Status</option>
                                </select>
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto d-flex align-items-center">
                                <p className="font-weight-bold mr-3">
                                  <span className="blue-clr">04</span> Results
                                </p>
                                <p className="blue-clr fs-14">CLEAR SEARCH</p>
                              </div>
                              <div className="col-auto mob-mar-btm">
                                <button>
                                  <img
                                    className="position-relative csv-icon"
                                    src={csv}
                                    alt="csv-icon"
                                  />
                                  CSV
                                </button>
                                <button>
                                  <img
                                    className="sch-icon"
                                    src={Schedule}
                                    alt="schedule-icon"
                                  />
                                  Schedule
                                </button>
                                <button className="btn-inv btn-dis">
                                  <img
                                    src={Assign}
                                    className="assign-icon"
                                    alt="assign-icon"
                                  />
                                  Assign
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="ticket-tabRea"
                          role="tabpanel"
                          aria-labelledby="ticket-tabRea"
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Priority</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Status</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Channel Of Purchase</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket action Type</option>
                                </select>
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto d-flex align-items-center">
                                <p className="font-weight-bold mr-3">
                                  <span className="blue-clr">04</span> Results
                                </p>
                                <p className="blue-clr fs-14">CLEAR SEARCH</p>
                              </div>
                              <div className="col-auto mob-mar-btm">
                                <button>
                                  <img
                                    className="position-relative csv-icon"
                                    src={csv}
                                    alt="csv-icon"
                                  />
                                  CSV
                                </button>
                                <button>
                                  <img
                                    className="sch-icon"
                                    src={Schedule}
                                    alt="schedule-icon"
                                  />
                                  Schedule
                                </button>
                                <button className="btn-inv btn-dis">
                                  <img
                                    src={Assign}
                                    className="assign-icon"
                                    alt="assign-icon"
                                  />
                                  Assign
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="category-tabRea"
                          role="tabpanel"
                          aria-labelledby="category-tabRea"
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Category</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Sub Category</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Issue Type</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Status</option>
                                </select>
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto d-flex align-items-center">
                                <p className="font-weight-bold mr-3">
                                  <span className="blue-clr">04</span> Results
                                </p>
                                <p className="blue-clr fs-14">CLEAR SEARCH</p>
                              </div>
                              <div className="col-auto mob-mar-btm">
                                <button>
                                  <img
                                    className="position-relative csv-icon"
                                    src={csv}
                                    alt="csv-icon"
                                  />
                                  CSV
                                </button>
                                <button>
                                  <img
                                    className="sch-icon"
                                    src={Schedule}
                                    alt="schedule-icon"
                                  />
                                  Schedule
                                </button>
                                <button className="btn-inv btn-dis">
                                  <img
                                    src={Assign}
                                    className="assign-icon"
                                    alt="assign-icon"
                                  />
                                  Assign
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="all-tabRea"
                          role="tabpanel"
                          aria-labelledby="all-tabRea"
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 col-sm-6 allspc">
                                <DatePicker
                                  selected={this.state.ByAllCreateDate}
                                  onChange={this.handleAllCreateDate.bind(this)}
                                  placeholderText="Creation Date"
                                  showMonthDropdown
                                  showYearDropdown
                                  // className="form-control"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Source</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Claim ID"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Email"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6 allspc">
                                <DatePicker
                                  selected={this.state.ByAllLastDate}
                                  onChange={this.handleAllLastDate.bind(this)}
                                  placeholderText="Last Updated Date"
                                  showMonthDropdown
                                  showYearDropdown
                                  // className="form-control"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Id/Title</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Invoice Number/Sub Order No"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Mobile"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6 allspc">
                                <select>
                                  <option>Category</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Priority</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Item ID"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Assigned To</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6 allspc">
                                <select>
                                  <option>Sub Category</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Ticket Status</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Did Visit Store : Yes</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Purchase Store Code/Address"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Issue Type</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>SLA Status</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <select>
                                  <option>Want to Visit Store : Yes</option>
                                </select>
                              </div>
                              <div className="col-md-3 col-sm-6">
                                <input
                                  className="no-bg"
                                  type="text"
                                  placeholder="Want to visit Store Code/Address"
                                />
                              </div>
                            </div>
                            <div className="row p-0">
                              <div className="col-md-6">
                                <div className="row allspc">
                                  <div className="col-sm-6 m-b-25">
                                    <select>
                                      <option>With Claim</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>With Task</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6 m-b-25">
                                    <select>
                                      <option>Claim Status</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Task Status</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6 m-b-25">
                                    <select>
                                      <option>Claim Category</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Task Department</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6 m-b-25">
                                    <select>
                                      <option>Claim Sub Category</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Task Function</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Claim Issue Type</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto d-flex align-items-center">
                                <p className="font-weight-bold mr-3">
                                  <span className="blue-clr">04</span> Results
                                </p>
                                <p className="blue-clr fs-14">CLEAR SEARCH</p>
                              </div>
                              <div className="col-auto mob-mar-btm">
                                <button>
                                  <img
                                    className="position-relative csv-icon"
                                    src={csv}
                                    alt="csv-icon"
                                  />
                                  CSV
                                </button>
                                <button>
                                  <img
                                    className="sch-icon"
                                    src={Schedule}
                                    alt="schedule-icon"
                                  />
                                  Schedule
                                </button>
                                <button className="btn-inv btn-dis">
                                  <img
                                    src={Assign}
                                    className="assign-icon"
                                    alt="assign-icon"
                                  />
                                  Assign
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
            <div className="newReact">
              <ReactTable
                data={dataReassign}
                columns={columnsReassign}
                // resizable={false}
                defaultPageSize={5}
                showPagination={true}
              />
            </div>
            <div className="float-search" onClick={this.toggleSearch}>
              <small>{TitleChange}</small>
              {ImgChange}
            </div>
          </div>
        </div>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <div className="d-flex">
                  <a href={Demo.BLANK_LINK} className="sorting-icon">
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a href={Demo.BLANK_LINK} className="sorting-icon">
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-open" name="filter-type" />
                  <label htmlFor="fil-open">
                    <span className="table-btn table-blue-btn">Open</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-new" name="filter-type" />
                  <label htmlFor="fil-new">
                    <span className="table-btn table-yellow-btn">New</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-solved" name="filter-type" />
                  <label htmlFor="fil-solved">
                    <span className="table-btn table-green-btn">Solved</span>
                  </label>
                </div>
              </div>
              <div className="filter-type filter-color">
                <p>FILTER BY COLOR</p>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-red" name="filter-color" />
                  <label htmlFor="fil-red">
                    <span className="fil-color-red fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-orange" name="filter-color" />
                  <label htmlFor="fil-orange">
                    <span className="fil-color-orange fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-white" name="filter-color" />
                  <label htmlFor="fil-white">
                    <span className="fil-color-white fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-green" name="filter-color" />
                  <label htmlFor="fil-green">
                    <span className="fil-color-green fil-color-bg"></span>
                  </label>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketReassign;
