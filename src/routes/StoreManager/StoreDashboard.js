import React, { Component } from "react";
import "./../../../node_modules/jquery/dist/jquery.js";
import "./../../../node_modules/popper.js/dist/popper.js";
import "./../../../node_modules/bootstrap/dist/js/bootstrap.js"
import Demo from './../../store/Hashtag'
import SearchIcon from './../../assets/Images/search-icon.png'
import InfoIcon from './../../assets/Images/info-icon.png';
import TableArr from './../../assets/Images/table-arr.png'
import TaskDepartment from "./Charts/TaskDepartment.js";
import TaskByPriority from "./Charts/TaskByPriority.js";
import ClaimVsInvoice from "./Charts/ClaimVsInvoice.js";
import Sorting from './../../assets/Images/sorting.png';
import OpenClaim from "./Charts/OpenClaim.js";
import OpenCompaign from "./Charts/OpenCompaign.js";
import InvoiceAmountPie from "./Charts/InvoiceAmountPie.js";
import { Collapse, CardBody, Card } from "reactstrap";
import Modal from "react-responsive-modal";

class StoreDashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      FilterCollapse:false,
      StatusModel:false
    }
    this.handleFilterCollapse=this.handleFilterCollapse.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }
  handleFilterCollapse(){
    this.setState(state=>({FilterCollapse:!state.FilterCollapse}));
  }
  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }
  render() {
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
                <option>Today</option>
                <option>Yesterday</option>
              </select>
            </div>
          </div>
        </div>
        <section className="dash-cntr">
          <div className="container-fluid btm-mar store-dash-top">
            <div className="row">
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Task</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value">10</span>
                      <small>Open</small>
                    </div>
                    <div>
                      <span className="card-value">45</span>
                      <small>Due Today</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Task</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value red-clr">40</span>
                      <small>Over-due</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Claim</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value">10</span>
                      <small>Open</small>
                    </div>
                    <div>
                      <span className="card-value">45</span>
                      <small>Due Today</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Claim</p>
                  <span className="card-value red-clr">40</span>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Campaign</p>
                  <div className="aside-cont">
                    <div>
                      <span className="card-value">60</span>
                      <small>Open</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid btm-mar">
            <div className="row">
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Task-Department Wise</p>
                  <TaskDepartment />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Task by priority</p>
                  <TaskByPriority />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Campaign by type</p>
                  <OpenCompaign />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Claim Vs Invoice &amp; Article</p>
                  <ClaimVsInvoice />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Claim Stats</p>
                  <OpenClaim />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Claim Vs Invoice Amount</p>
                  <InvoiceAmountPie />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="table-cntr mt-3">
              {/* <ul className="store-dash-tabs">
                <li>
                  <a href={Demo.BLANK_LINK} className="active">
                    Task: <span>06</span>
                  </a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>
                    Claim: <span>05</span>
                  </a>
                </li>
              </ul> */}

              <div className="store-table-cntr">
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
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
                              Task: <span className="task06">06</span>
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
                              Claim: <span>05</span>
                            </a>
                          </li>
                          <div className="save-view-search">
                            <button className="btn-inv">View Search</button>
                          </div>
                        </ul>
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="date-tab"
                            role="tabpanel"
                            aria-labelledby="date-tab"
                          >
                            <div className="container-fluid">
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input type="text" placeholder="Task ID" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Department</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Assign To</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Task With Claim (Yes-No)</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" placeholder="Task Title" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Function</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Task Created By</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim ID</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Task Status"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Creation On</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Task With Ticket (Yes-No)</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Task Priority</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Ticket ID"
                                  />
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
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input type="text" placeholder="Claim ID" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Ticket Mapped(Yes-No)</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Category</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Status</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" placeholder="Title ID" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Sub Category</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Raised On</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Task Mapped(Yes-No)</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Issue Type</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Assign To</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" placeholder="Task ID" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Raised By</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
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
                      <th>Task Title</th>
                      <th>
                        Department
                        <img src={TableArr} alt="table-arr-icon" />
                      </th>
                      <th>
                        Store Name
                        <img src={TableArr} alt="table-arr-icon" />
                      </th>
                      <th>
                        Creation on
                        <img src={TableArr} alt="table-arr-icon" />
                      </th>
                      <th>
                        Assign to
                        <img src={TableArr} alt="table-arr-icon" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
                          <li>
                            <p>Category</p>
                            <p>Internet</p>
                          </li>
                          <li>
                            <p>Sub Category</p>
                            <p>Hardware</p>
                          </li>
                          <li>
                            <p>Type</p>
                            <p>Supply</p>
                          </li>
                        </ul>
                      </div>
                      </td>
                      <td>BATA1</td>
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
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
                          <li>
                            <p>Category</p>
                            <p>Internet</p>
                          </li>
                          <li>
                            <p>Sub Category</p>
                            <p>Hardware</p>
                          </li>
                          <li>
                            <p>Type</p>
                            <p>Supply</p>
                          </li>
                        </ul>
                      </div>
                      </td>
                      <td>BATA2</td>
                      <td>
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
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Supply
                        <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-category-popup dash-popup">
                          <li>
                            <p>Category</p>
                            <p>Internet</p>
                          </li>
                          <li>
                            <p>Sub Category</p>
                            <p>Hardware</p>
                          </li>
                          <li>
                            <p>Type</p>
                            <p>Supply</p>
                          </li>
                        </ul>
                      </div>
                      </td>
                      <td>BATA3</td>
                      <td>
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
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA1</td>
                      <td>
                        2 Hour Ago
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA2</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Supply
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA3</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>BATA2</td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                  </tbody>
                </table>
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
                      <a href={Demo.BLANK_LINK}>7</a>
                    </li>
                    <li>
                      <a href={Demo.BLANK_LINK}>&gt;</a>
                    </li>
                  </ul>
                </div>
                <div
                  className="float-search"
                  onClick={this.handleFilterCollapse}
                >
                  <small>Search</small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default StoreDashboard;
