import React, { Component } from "react";
// import "../../node_modules/jquery/dist/jquery.js";
import { ProgressBar } from "react-bootstrap";
// import "../../node_modules/popper.js/dist/popper.js";
// import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import Modal from "react-responsive-modal";
import PieChart from "../Component/PieChart/PieChart";
import SearchIcon from "./../assets/Images/search-icon.png";
import TableArr from "./../assets/Images/table-arr.png";
import Dash from "./../assets/Images/dash.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import Sorting from "./../assets/Images/sorting.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import Chat from "./../assets/Images/chat.png";
import csv from "./../assets/Images/csv.png";
import Schedule from "./../assets/Images/schedule.png";
import Assign from "./../assets/Images/assign.png";
import CancalImg from "./../assets/Images/cancal blue.png";
import DelSearch from "./../assets/Images/del-search.png";
import { Collapse, CardBody, Card } from "reactstrap";
import Demo from "../store/Hashtag.js";
import ModernDatepicker from "react-modern-datepicker";

import BarChart from "../Component/PieChart/BarChart.js";
import MultiBarChart from "../Component/PieChart/MultiBarChart.js";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      collapseSearch: false,
      modalIsOpen: false,
      open: false,
      StatusModel: false,
      Schedule: false,
      startDate: new Date()
    };
    this.toggle = this.toggle.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  toggleSearch() {
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };

  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
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
    return (
      <div>
        <div className="container-fluid dash-dropdowns">
          <div className="d-flex">
            <div>
              <span>Brand : </span>
              <select>
                <option>All</option>
              </select>
            </div>
            <div>
              <span>Agent : </span>
              <select>
                <option>All</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <span>Date Range : </span>
              <select>
                <option>Last 7 days</option>
              </select>
            </div>
          </div>
        </div>
        <section className="dash-cntr">
          <div className="dashboard-collapse-icon" onClick={this.toggle}>
            <img src={Dash} alt="dash-icon" />
          </div>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <div className="container-fluid dash-tp-card btm-mar">
                  <div className="row justify-content-center">
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">All</p>
                        <span className="card-value">16</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Open</p>
                        <span className="card-value">06</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Due Today</p>
                        <span className="card-value">11</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Over Due</p>
                        <span className="card-value red-clr">07</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Total no of chat</p>
                        <span className="card-value">102</span>
                        <small className="blue-clr">View More Insights</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid btm-mar">
                  <div className="row">
                    <div className="col-lg-3 col-md-4">
                      <div className="dash-top-cards prio-pie-cntr">
                        <p className="card-head mb-0">Open By Priority</p>
                        <div className="prio-pie-chart">
                          <PieChart />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-8">
                      <div className="dash-top-cards p-0">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#bill-graph-tab"
                              role="tab"
                              aria-controls="bill-graph-tab"
                              aria-selected="true"
                            >
                              Tickets to bill graph
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#source-tab"
                              role="tab"
                              aria-controls="source-tab"
                              aria-selected="false"
                            >
                              Tickets generation source tab
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content mt-3">
                          <div
                            className="tab-pane fade show active"
                            id="bill-graph-tab"
                            role="tabpanel"
                            aria-labelledby="bill-graph-tab"
                          >
                            <div className="row">
                              <div className="col-md-3">
                                <ul className="bill-graph-list">
                                  <li>
                                    Offline : <b>20/100</b>
                                  </li>
                                  <li>
                                    Web : <b>10/80</b>
                                  </li>
                                  <li>
                                    Mobile : <b>5/100</b>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-9 tic-bill-graph">
                                <BarChart />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="source-tab"
                            role="tabpanel"
                            aria-labelledby="source-tab"
                          >
                            <BarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="dash-top-cards">
                        <p className="card-head">SLA</p>
                        <div className="resp-success">
                          <p className="card-head">Response Success</p>
                          <span className="card-value">
                            <big>60%</big>
                          </span>
                          <p className="card-head mt-lg-4 mt-2">
                            Resolution Success :{" "}
                            <span className="font-weight-bold">57.23%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Task</p>
                        <div className="aside-cont">
                          <div>
                            <span className="card-value">16</span>
                            <small>Open</small>
                          </div>
                          <div>
                            <span className="card-value">06</span>
                            <small>Pending</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-0">
                      <div className="dash-top-cards p-0">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#task-tab"
                              role="tab"
                              aria-controls="task-tab"
                              aria-selected="true"
                            >
                              Ticket to Task
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#claim-tab"
                              role="tab"
                              aria-controls="claim-tab"
                              aria-selected="false"
                            >
                              Ticket to claim
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content task-claim-cont">
                          <div
                            className="tab-pane fade show active"
                            id="task-tab"
                            role="tabpanel"
                            aria-labelledby="task-tab"
                          >
                            <MultiBarChart />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="claim-tab"
                            role="tabpanel"
                            aria-labelledby="claim-tab"
                          >
                            <BarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Claim</p>
                        <div className="aside-cont">
                          <div>
                            <span className="card-value">16</span>
                            <small>Open</small>
                          </div>
                          <div>
                            <span className="card-value">06</span>
                            <small>Pending</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Collapse>
          <div className="container-fluid">
            <div className="table-cntr mt-3">
              <Collapse isOpen={this.state.collapseSearch}>
                <Card>
                  <CardBody>
                    <div className="table-expandable-sctn">
                      <div className="position-relative">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#date-tab"
                              role="tab"
                              aria-controls="date-tab"
                              aria-selected="true"
                            >
                              By Date
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#customer-tab"
                              role="tab"
                              aria-controls="customer-tab"
                              aria-selected="false"
                            >
                              By Customer Type
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#ticket-tab"
                              role="tab"
                              aria-controls="ticket-tab"
                              aria-selected="false"
                            >
                              By Ticket Type
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#category-tab"
                              role="tab"
                              aria-controls="category-tab"
                              aria-selected="false"
                            >
                              By Category
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#all-tab"
                              role="tab"
                              aria-controls="all-tab"
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
                      <div className="tab-content p-0">
                        <div
                          className="tab-pane fade show active"
                          id="date-tab"
                          role="tabpanel"
                          aria-labelledby="date-tab"
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 col-sm-6">
                                <input
                                  type="text"
                                  placeholder="Creation Date"
                                />
                              </div>
                              <div className="col-md-3 col-sm-6">
                                {/* <input
                                  type="text"
                                  placeholder="Last Updated Date"
                                /> */}
                                <ModernDatepicker
                                  date={this.state.startDate}
                                  format={"DD-MM-YYYY"}
                                  className="cXcRo"
                                  showBorder
                                  onChange={date => this.handleChange(date)}
                                  placeholder={"Select a date"}
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
                          id="customer-tab"
                          role="tabpanel"
                          aria-labelledby="customer-tab"
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
                          id="ticket-tab"
                          role="tabpanel"
                          aria-labelledby="ticket-tab"
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
                          id="category-tab"
                          role="tabpanel"
                          aria-labelledby="category-tab"
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
                          id="all-tab"
                          role="tabpanel"
                          aria-labelledby="all-tab"
                        >
                          <div className="container-fluid">
                            <div className="row all-row">
                              <div className="col-md-3 col-sm-6">
                                <input
                                  type="text"
                                  placeholder="Creation Date"
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
                              <div className="col-md-3 col-sm-6">
                                <input
                                  type="text"
                                  placeholder="Last Updated Date"
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
                              <div className="col-md-3 col-sm-6">
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
                              <div className="col-md-3 col-sm-6">
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
                                <div className="row all-row">
                                  <div className="col-sm-6">
                                    <select>
                                      <option>With Claim</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>WIth Task</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Claim Status</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Task Status</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Claim Category</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
                                    <select>
                                      <option>Task Department</option>
                                    </select>
                                  </div>
                                  <div className="col-sm-6">
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
              <div className="scroll-table rem-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>
                        Status
                        <div className="position-relative d-inline-block">
                          <img
                            src={TableArr}
                            alt="table-arr"
                            onClick={this.StatusOpenModel}
                          />
                          <Modal
                            onClose={this.StatusCloseModel}
                            open={this.state.StatusModel}
                            modalId="Status-popup"
                            overlayId="logout-ovrly"
                          >
                            <div className="status-drop-down">
                              <div className="sort-sctn">
                                <div className="d-flex">
                                  <a
                                    href={Demo.BLANK_LINK}
                                    className="sorting-icon"
                                  >
                                    <img src={Sorting} alt="sorting-icon" />
                                  </a>
                                  <p>SORT BY A TO Z</p>
                                </div>
                                <div className="d-flex">
                                  <a
                                    href={Demo.BLANK_LINK}
                                    className="sorting-icon"
                                  >
                                    <img src={Sorting} alt="sorting-icon" />
                                  </a>
                                  <p>SORT BY Z TO A</p>
                                </div>
                              </div>
                              <div className="filter-type">
                                <p>FILTER BY TYPE</p>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-open"
                                    name="filter-type"
                                  />
                                  <label htmlFor="fil-open">
                                    <span className="table-btn table-blue-btn">
                                      Open
                                    </span>
                                  </label>
                                </div>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-new"
                                    name="filter-type"
                                  />
                                  <label htmlFor="fil-new">
                                    <span className="table-btn table-yellow-btn">
                                      New
                                    </span>
                                  </label>
                                </div>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-solved"
                                    name="filter-type"
                                  />
                                  <label htmlFor="fil-solved">
                                    <span className="table-btn table-green-btn">
                                      Solved
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="filter-type filter-color">
                                <p>FILTER BY COLOR</p>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-red"
                                    name="filter-color"
                                  />
                                  <label htmlFor="fil-red">
                                    <span className="fil-color-red fil-color-bg"></span>
                                  </label>
                                </div>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-orange"
                                    name="filter-color"
                                  />
                                  <label htmlFor="fil-orange">
                                    <span className="fil-color-orange fil-color-bg"></span>
                                  </label>
                                </div>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-white"
                                    name="filter-color"
                                  />
                                  <label htmlFor="fil-white">
                                    <span className="fil-color-white fil-color-bg"></span>
                                  </label>
                                </div>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-green"
                                    name="filter-color"
                                  />
                                  <label htmlFor="fil-green">
                                    <span className="fil-color-green fil-color-bg"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </th>
                      <th className="table-img-cntr"></th>
                      <th>
                        Subject<span>/Lastest Message</span>
                      </th>
                      <th>
                        Category <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Priority <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Assignee <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Creation on <img src={TableArr} alt="table-arr" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="pink-bg">
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td className="table-img-cntr"></td>
                      <td>
                        Need to change my shipping address{" "}
                        <span>Hope this help, Please rate us</span>
                      </td>
                      <td>
                        Defective article
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                          <ul className="dash-category-popup dash-popup">
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
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        2 Hour Ago
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                          <ul className="dash-creation-popup dash-popup">
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
                      </td>
                    </tr>
                    <tr className="orange-bg">
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td className="table-img-cntr"></td>
                      <td className="black-clr">
                        Need to change my shipping address{" "}
                        <span>Hope this help, Please rate us</span>
                      </td>
                      <td>
                        Defective article
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                          <ul className="dash-category-popup dash-popup">
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
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                          <ul className="dash-creation-popup dash-popup">
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
                      </td>
                    </tr>
                    <tr className="blue-bg">
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-yellow-btn">New</span>
                      </td>
                      <td className="table-img-cntr">
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="task-icon-1"
                            src={TaskIconBlue}
                            alt="task-icon-blue"
                          />
                          <div className="dash-task-popup dash-popup">
                            <div className="d-flex justify-content-between align-items-center">
                              <p>
                                TASK: <span className="green-clr">02</span>/
                                <span className="task-red-clr">04</span>
                              </p>
                              <div className="d-flex align-items-center">
                                2 NEW
                                <div className="nw-chat">
                                  <img src={Chat} alt="chat" />
                                </div>
                              </div>
                            </div>
                            <ProgressBar className="task-progress" now={70} />
                          </div>
                        </div>
                      </td>
                      <td className="black-clr">
                        Need to change my shipping address{" "}
                        <span>
                          Hope this help, Please rate us (1 new comment)
                        </span>
                      </td>
                      <td>
                        Defective article{" "}
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                          <ul className="dash-category-popup dash-popup">
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
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                          <ul className="dash-creation-popup dash-popup">
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
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-yellow-btn">New</span>
                      </td>
                      <td className="table-img-cntr">
                        <img
                          className="task-icon-1"
                          src={TaskIconGray}
                          alt="task-icon-gray"
                        />
                      </td>
                      <td>
                        Need to change my shipping address{" "}
                        <span>Hope this help, Please rate us</span>
                      </td>
                      <td>
                        Defective article{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td className="table-img-cntr">
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="claim-icon"
                            src={CliamIconBlue}
                            alt="cliam-icon-blue"
                          />
                          <div className="dash-task-popup dash-popup">
                            <div className="d-flex justify-content-between align-items-center">
                              <p>
                                CLAIM: <span className="green-clr">02</span>/
                                <span className="task-red-clr">01</span>
                              </p>
                            </div>
                            <ProgressBar className="task-progress" now={70} />
                          </div>
                        </div>
                        <img
                          className="task-icon-1"
                          src={TaskIconGray}
                          alt="task-icon-gray"
                        />
                      </td>
                      <td>
                        Need to change my shipping address{" "}
                        <span>Hope this help, Please rate us</span>
                      </td>
                      <td>
                        Defective article{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td className="table-img-cntr"></td>
                      <td>
                        Need to change my shipping address{" "}
                        <span>Hope this help, Please rate us</span>
                      </td>
                      <td>
                        Defective article{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td className="table-img-cntr"></td>
                      <td>
                        Need to change my shipping address{" "}
                        <span>Hope this help, Please rate us</span>
                      </td>
                      <td>
                        Defective article
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>High</td>
                      <td>N Rampal</td>
                      <td>
                        12 March 2018{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mobile-table">
                <div className="table-row pink-bg">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-blue-btn">Open</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div>
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us
                      </span>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      2 Hour Ago
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
                <div className="table-row orange-bg">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-blue-btn">Open</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div className="black-clr">
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us
                      </span>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
                <div className="table-row blue-bg">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-yellow-btn">New</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div className="black-clr">
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us (1 new comment)
                      </span>
                      <div className="dash-creation-popup-cntr mt-1">
                        <img
                          className="task-icon-1"
                          src={TaskIconBlue}
                          alt="task-icon-blue"
                        />
                        <div className="dash-task-popup dash-popup">
                          <div className="d-flex justify-content-between align-items-center">
                            <p>
                              TASK: <span className="green-clr">02</span>/
                              <span className="task-red-clr">04</span>
                            </p>
                            <div className="d-flex align-items-center">
                              2 NEW
                              <div className="nw-chat">
                                <img src={Chat} alt="chat" />
                              </div>
                            </div>
                          </div>
                          <ProgressBar className="task-progress" now={70} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-yellow-btn">New</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div>
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us
                      </span>
                      <div className="mt-1">
                        <img
                          className="task-icon-1"
                          src={TaskIconGray}
                          alt="task-icon-gray"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-green-btn">Solved</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div>
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us
                      </span>
                      <div className="mt-1">
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="claim-icon"
                            src={CliamIconBlue}
                            alt="cliam-icon-blue"
                          />
                          <div className="dash-task-popup dash-popup">
                            <div className="d-flex justify-content-between align-items-center">
                              <p>
                                CLAIM: <span className="green-clr">02</span>/
                                <span className="task-red-clr">01</span>
                              </p>
                            </div>
                            <ProgressBar className="task-progress" now={70} />
                          </div>
                        </div>
                        <img
                          className="task-icon-1"
                          src={TaskIconGray}
                          alt="task-icon-gray"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-green-btn">Solved</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div>
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us
                      </span>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cont">
                    <p>ID :</p>
                    <p>ABC1234</p>
                  </div>
                  <div className="table-cont align-items-center">
                    <p>Status :</p>
                    <span className="table-btn table-green-btn">Solved</span>
                  </div>
                  <div className="table-cont">
                    <p>
                      Subject :
                      <span className="tab-subhead">(Lastest Message)</span>
                    </p>
                    <div>
                      Need to change my shipping address
                      <span className="tab-subhead">
                        Hope this help, Please rate us
                      </span>
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Category :</p>
                    <div>
                      Defective article
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
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
                    </div>
                  </div>
                  <div className="table-cont">
                    <p>Priority :</p>
                    <p>High</p>
                  </div>
                  <div className="table-cont">
                    <p>Assignee :</p>
                    <p>N Rampal</p>
                  </div>
                  <div className="table-cont">
                    <p>Creation on :</p>
                    <div>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </div>
                  </div>
                </div>
              </div>
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

              <div className="float-search" onClick={this.toggleSearch}>
                <small>{TitleChange}</small>
                {ImgChange}
              </div>
            </div>
          </div>
        </section>
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
            <input type="search" placeholder="Give name to your search" />
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
      </div>
    );
  }
}

export default Dashboard;
