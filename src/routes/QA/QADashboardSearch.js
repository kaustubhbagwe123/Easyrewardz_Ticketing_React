import React, { Component } from "react";
import PieChart from "./../QA/Charts/PieChart";
import BarQualityScore from "./Charts/BarQualityScore";
import BarTop3CSA from "./Charts/BarTop3CSA";
import Downloading from './../../assets/Images/downloading_updates.png'
import Demo from "../../store/Hashtag";

class QADashboardSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container-fluid dash-dropdowns">
          <div className="d-flex">
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
          <div className="container-fluid btm-mar store-dash-top">
            <div className="row">
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Total Tickets For QC</p>
                  <div className="aside-cont">
                    <div>
                      <span className="firstCard16">16</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">QC Done</p>
                  <div className="aside-cont">
                    <div>
                      <span className="firstCard16">06</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Pending for QC</p>
                  <div className="aside-cont">
                    <div>
                      <span className="firstCard16">11</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
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
            <div className="col-lg-4">
              <div className="dash-top-cards">
                <p className="card-head">Quality Score By KPI</p>
                <div className="prio-pie-chart">
                  <PieChart />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-top-cards">
                <p className="card-head">Quality Score By QA Lead</p>
                <BarQualityScore />
              </div>
            </div>
            <div className="col-lg-4">
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
            <div className="container-fluid">
              <div className="row rowMargin">
                <div className="col-md-3 dropDwonWidth">
                  <label className="label-6"> Select Agent/QA Lead</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                  >
                    <option>Agent</option>
                  </select>
                </div>
                <div className="col-md-3 dropDwonWidth">
                  <label className="label-6">Select Agent</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                  >
                    <option>Vikash</option>
                  </select>
                </div>
                <div className="col-md-3 dropDwonWidth">
                  <label className="label-6">QC from date</label>
                  <input
                    type="text"
                    placeholder="From Date"
                    className="form-control txtQA"
                  />
                </div>
                <div className="col-md-3 dropDwonWidth">
                  <label className="label-6">QC to date</label>
                  <input
                    type="text"
                    placeholder="To Date"
                    className="form-control txtQA"
                  />
                </div>
                <div className="col-md-2">
                  <button className="btnSearchQa" type="button">
                    <label className="labelSearch">Search</label>
                  </button>
                </div>
              </div>
            </div>

            <div className="table-cntr mt-3">
              <div className="store-table-cntr">
                <table>
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
              <div className="store-table-cntr">
                <table>
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
                      <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Operations</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                    </tr>
                    <tr>
                    <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Sales</td>
                      <td>Naman Rampal</td>
                      <td>25 March 2018</td>
                      <td>Naman Rampal</td>
                      <td>25 March 2018</td>
                    </tr>
                    <tr>
                    <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Support</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                      <td>Nidhi Jain</td>
                      <td>23 March 2018</td>
                    </tr>
                    <tr>
                    <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Operations</td>
                      <td>Themm</td>
                      <td>25 March 2018</td>
                      <td>Themm</td>
                      <td>25 March 2018</td>
                    </tr>
                    <tr>
                    <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Sales</td>
                      <td>Naman Rampal</td>
                      <td>23 March 2018</td>
                      <td>Naman Rampal</td>
                      <td>23 March 2018</td>
                    </tr>
                    <tr>
                    <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
                      </td>
                      <td>Need to change m..</td>
                      <td>Support</td>
                      <td>Nidhi Jain</td>
                      <td>25 March 2018</td>
                      <td>Nidhi Jain</td>
                      <td>25 March 2018</td>
                    </tr>
                    <tr>
                    <td>1123</td>
                      <td>
                        <span className="table-btn table-blue-btn">Pending</span>
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
          </div>
        </div>
      </div>
    );
  }
}

export default QADashboardSearch;
