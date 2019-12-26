import React, { Component } from "react";
import PieChart from "./Charts/PieChart";
import BarQualityScore from "./Charts/BarQualityScore";
import BarTop3CSA from "./Charts/BarTop3CSA";
import Downloading from "./../../assets/Images/downloading_updates.png";
import Demo from "../../store/Hashtag";
import CancalImg from "./../../assets/Images/cancal blue.png";
import SearchIcon from "./../../assets/Images/search-icon.png";
import { Collapse, CardBody, Card } from "reactstrap";
import csv from "./../../assets/Images/csv.png";
import Assign from "./../../assets/Images/Assign1.png";
import DatePicker from "react-datepicker";

class QADashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      QASearch: false,
      FromDateCreatDate: "",
      ToDateCreatDate: ""
    };
    this.handleToggleSearch = this.handleToggleSearch.bind(this);
  }
  handleFromDateCreate(date) {
    this.setState({ FromDateCreatDate: date });
  }
  handleToDateCreate(date) {
    this.setState({ ToDateCreatDate: date });
  }
  handleToggleSearch() {
    this.setState(state => ({ QASearch: !state.QASearch }));
  }
  render() {
    const TitleChange=this.state.QASearch
    ? 'Close Search' : 'Search Tickets';

    const ImgChange=this.state.QASearch 
    ? <img
    className="search-icon"
    src={CancalImg}
    alt="search-icon"
  /> :  <img
    className="search-icon"
    src={SearchIcon}
    alt="search-icon"
  />
    return (
      <div>
        <div className="container-fluid dash-dropdowns">
          <div className="d-flex dashallbrand1">
          <div>
              <span>
                Brand :
                <div className="dropdown">
                  <button
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="EMFCText">All</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="one">
                        <input type="checkbox" id="one" className="ch1" />
                        <span className="ch1-text">Bata 1</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="two">
                        <input type="checkbox" id="two" className="ch1" />
                        <span className="ch1-text">Bata 2</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="three">
                        <input type="checkbox" id="three" className="ch1" />
                        <span className="ch1-text">Bata 3</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="four">
                        <input type="checkbox" id="four" className="ch1" />
                        <span className="ch1-text">Bata 4</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
            {/* <div>
              <span>Agent : </span>
              <select>
                <option>All</option>
              </select>
            </div> */}
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
          <div className="container-fluid btm-mar store-dash-top">
            <div className="row">
              <div className="col-12 col-xs-6 col-md-3">
                <div className="dash-top-cards">
                  <p className="card-head">Total Tickets For QC</p>
                  <div className="aside-cont">
                    <div>
                      <span className="firstCard16">16</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xs-6 col-sm-3">
                <div className="dash-top-cards">
                  <p className="card-head">QC Done</p>
                  <div className="aside-cont">
                    <div>
                      <span className="firstCard16">06</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xs-6 col-sm-3">
                <div className="dash-top-cards">
                  <p className="card-head">Pending for QC</p>
                  <div className="aside-cont">
                    <div>
                      <span className="firstCard16">11</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xs-6 col-sm-3">
                <div className="dash-top-cards">
                  <p className="card-head">Quality Score</p>
                  <div className="aside-cont">
                    <div>
                      <span className="LastCard86">86%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container-fluid btm-mar">
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div className="dash-top-cards">
                <p className="card-head">Quality Score By KPI</p>
                <div className="prio-pie-chart">
                  <PieChart />
                </div>
              </div>
            </div>
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div className="dash-top-cards">
                <p className="card-head">Quality Score By QA Lead</p>
                <BarQualityScore />
              </div>
            </div>
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div className="dash-top-cards">
                <p className="card-head">Top 3 CSA Quality Score</p>
                <BarTop3CSA />
              </div>
            </div>
          </div>
        </div>
        <div className="maincardQA">
          <div className="container-fluid">
            <div className="row cardTextSpace">
              <span className="quality-score-by-age">
                Quality Score by Agent/TL
              </span>
            </div>
            <div className="">
              <div className="row rowMargin">
                <div className="col-12 col-md-12">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg dropDwonWidth">
                      <label className="label-6"> Select Agent/QA Lead</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>Agent</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg dropDwonWidth">
                      <label className="label-6">Select Agent</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>Vikash</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg dropDwonWidth">
                      <label className="label-6">QC from date</label>
                      <DatePicker
                         selected={this.state.FromDateCreatDate}
                         onChange={this.handleFromDateCreate.bind(this)}
                         placeholderText="From Date"
                         showMonthDropdown
                         showYearDropdown
                                  // className="form-control"
                       />
                      {/* <input
                        type="text"
                        placeholder="From Date"
                        className="form-control txtQA"
                      /> */}
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg dropDwonWidth">
                      <label className="label-6">QC to date</label>
                      <DatePicker
                         selected={this.state.ToDateCreatDate}
                         onChange={this.handleToDateCreate.bind(this)}
                         placeholderText="To Date"
                         showMonthDropdown
                         showYearDropdown
                                  // className="form-control"
                       />
                      {/* <input
                        type="text"
                        placeholder="To Date"
                        className="form-control txtQA"
                      /> */}
                    </div>
                    <div className="col-12 col-xs-2 col-lg">
                    <button className="btnSearchQa" type="button">
                      <label className="labelSearch">Search</label>
                    </button>
                  </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-12 col-xs-2">
                    <button className="btnSearchQa" type="button">
                      <label className="labelSearch">Search</label>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="table-cntr mt-3">
              <div className="store-table-cntr table-responsive">
                <table className="table-responsive stinlitab">
                  <thead>
                    <tr>
                      <th>Agent Name</th>
                      <th>Agent Tennure</th>
                      <th>TL Name</th>
                      <th>Total Resolved Ticket</th>
                      <th>Total Audited Ticket</th>
                      <th>Quality Score</th>
                      <th>
                        <button type="button" className="btnDownloadQuality">
                          <img
                            src={Downloading}
                            alt="downloading_updates"
                            className="downloadQualityCss"
                          />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Naman Rampal</td>
                      <td>24 months</td>
                      <td>Nidhi Jain</td>
                      <td>20</td>
                      <td>11</td>
                      <td>58%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Nidhi Jain</td>
                      <td>24 months</td>
                      <td>Naman Rampal</td>
                      <td>54</td>
                      <td>25</td>
                      <td>57%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Themm</td>
                      <td>24 months</td>
                      <td>Nidhi Jain</td>
                      <td>33</td>
                      <td>23</td>
                      <td>58%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Naman Rampal</td>
                      <td>24 months</td>
                      <td>Themm</td>
                      <td>102</td>
                      <td>78</td>
                      <td>57%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Nidhi Jain</td>
                      <td>24 months</td>
                      <td>Naman Rampal</td>
                      <td>99</td>
                      <td>67</td>
                      <td>58%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Themm</td>
                      <td>24 months</td>
                      <td>Nidhi Jain</td>
                      <td>33</td>
                      <td>23</td>
                      <td>57%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Naman</td>
                      <td>24 months</td>
                      <td>Themm</td>
                      <td>102</td>
                      <td>58</td>
                      <td>58%</td>
                      <td></td>
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
              </div>
            </div>
            {/* --------------2nd table start---------------------- */}
            <div className="table-cntr mt-3">
              <div className="store-table-cntr QAtable">
                <Collapse isOpen={this.state.QASearch}>
                  <Card>
                    <CardBody style={{ padding: "0px" }}>
                      <div className="table-expandable-sctn2">
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="date-tab"
                            role="tabpanel"
                            aria-labelledby="date-tab"
                          >
                            <div className="container-fluid">
                              <div className="row rowSearch">
                                <div className="col-md-9">
                                  <label className="searchlabel1">SEARCH</label>
                                </div>
                                <div className="col-md-3">
                                  <button
                                    className="viewSearch-btn"
                                    type="button"
                                    style={{ marginRight: "10px" }}
                                  >
                                    <label className="view-searchLabl">
                                      {" "}
                                      VIEW SEARCH
                                    </label>
                                  </button>
                                </div>
                              </div>
                              <div
                                className="row all-row"
                                style={{ border: "none" }}
                              >
                                <div className="col-md-3">
                                  <select>
                                    <option>Pending</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Assigen To</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Category</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Ticket Resolved By</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    className="txtQASearch"
                                    placeholder="Ticket Resolution Date"
                                    style={{display:'block'}}
                                  />
                                </div>
                              </div>
                              <div className="row all-row">
                                <div className="col-md-6 d-flex align-items-center">
                                  <p className="font-weight-bold mr-3">
                                    <span className="blue-clr">04</span> Results
                                  </p>
                                  <p className="blue-clr fs-14">CLEAR SEARCH</p>
                                </div>
                                <div className="col-md-6 text-right">
                                  <button className="cSvBtn">
                                    <img
                                      className="position-relative"
                                      src={csv}
                                      alt="csv-icon"
                                    />
                                    CSV
                                  </button>

                                  <button className="btn-assignQa">
                                    <img
                                      src={Assign}
                                      alt="assign-icon"
                                      className="assignbtnImg"
                                    />
                                    <label className="assign-lbl">
                                      {" "}
                                      Assign{" "}
                                    </label>
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
                <div className="table-responsive">
                  <table className="table-responsive stinlitab">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Audit Status</th>
                      <th>Ticket title</th>
                      <th>Category</th>
                      <th>Resolved by</th>
                      <th>Resolution date</th>
                      <th>Assign To</th>
                      <th>Assign Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc1"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc1">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Operations</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc2"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc2">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Sales</td>
                      <td>Naman Rampal</td>
                      <td>25 March 2018</td>
                      <td>Naman Rampal</td>
                      <td>25 March 2018</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc3"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc3">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Support</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc4"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc4">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Operations</td>
                      <td>Themm</td>
                      <td>25 March 2018</td>
                      <td>Themm</td>
                      <td>25 March 2018</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc5"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc5">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Sales</td>
                      <td>Naman Rampal</td>
                      <td>23 March 2018</td>
                      <td>Naman Rampal</td>
                      <td>23 March 2018</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc6"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc6">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Support</td>
                      <td>Nidhi Jain</td>
                      <td>25 March 2018</td>
                      <td>Nidhi Jain</td>
                      <td>25 March 2018</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-abc7"
                            name="filter-type"
                          />
                          <label htmlFor="fil-abc7">1123</label>
                        </div>
                      </td>
                      <td>
                        <span className="table-btn table-blue-btn">
                          Pending
                        </span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Operations</td>
                      <td>Themm</td>
                      <td>25 March 2018</td>
                      <td>Themm</td>
                      <td>25 March 2018</td>
                    </tr>
                  </tbody>
                </table>
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
                      <a href={Demo.BLANK_LINK}>7</a>
                    </li>
                    <li>
                      <a href={Demo.BLANK_LINK}>&gt;</a>
                    </li>
                  </ul>
                </div>
                <div className="float-search" onClick={this.handleToggleSearch}>
                  <small>{TitleChange}</small>
                  {ImgChange}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QADashboard;
