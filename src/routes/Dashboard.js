import React, { Component } from "react";
import "../../node_modules/jquery/dist/jquery.js";
import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import PieChart from "../Component/PieChart/PieChart";
import SearchIcon from './../assets/Images/search-icon.png'
import TableArr from './../assets/Images/table-arr.png' 
import InfoIcon from './../assets/Images/info-icon.png';
import TaskIconBlue from './../assets/Images/task-icon-blue.png';
import TaskIconGray from './../assets/Images/task-icon-gray.png'; 
import CliamIconBlue from './../assets/Images/cliam-icon-blue.png';
import Demo from '../store/Hashtag.js'


import BarChart from "../Component/PieChart/BarChart.js";
import MultiBarChart from "../Component/PieChart/MultiBarChart.js";
class Dashboard extends Component {

  
  render() {
    return (
      <div>
        <section className="dash-cntr">
          <div className="container-fluid btm-mar">
            <div className="row">
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">All</p>
                  <span className="card-value">16</span>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Open</p>
                  <span className="card-value">06</span>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Due Today</p>
                  <span className="card-value">11</span>
                </div>
              </div>
              <div className="col">
                <div className="dash-top-cards">
                  <p className="card-head">Over Due</p>
                  <span className="card-value red-clr">07</span>
                </div>
              </div>
              <div className="col">
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
              <div className="col-lg-3">
                <div className="dash-top-cards">
                  <p className="card-head">Open By Priority</p>
                  <div className="pieChart-Margin">
                  <PieChart />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
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
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="bill-graph-tab"
                      role="tabpanel"
                      aria-labelledby="bill-graph-tab"
                    >
                       <BarChart/>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="source-tab"
                      role="tabpanel"
                      aria-labelledby="source-tab"
                    >
                       <BarChart/>
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
                    <p className="card-head mt-4">
                      Resolution Success :{" "}
                      <span className="font-weight-bold">57.23%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
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
              <div className="col-lg-6">
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
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="task-tab"
                      role="tabpanel"
                      aria-labelledby="task-tab"
                    >
                     <MultiBarChart/>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="claim-tab"
                      role="tabpanel"
                      aria-labelledby="claim-tab"
                    >
                       <BarChart/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
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
          <div className="container-fluid">
            <div className="table-cntr mt-3">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      Status <img src={TableArr} alt="table-arr" />
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
                      2 Hour Ago{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
                  <tr className="blue-bg">
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-yellow-btn">New</span>
                    </td>
                    <td className="table-img-cntr">
                      <img
                        className="task-icon-1"
                        src={TaskIconBlue}
                        alt="task-icon-blue"
                      />
                    </td>
                    <td className="black-clr">
                      Need to change my shipping address{" "}
                      <span>
                        Hope this help, Please rate us (1 new comment)
                      </span>
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
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td className="table-img-cntr">
                      <img
                        className="claim-icon"
                        src={CliamIconBlue}
                        alt="cliam-icon-blue"
                      />
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
                      <span className="table-btn table-green-btn">Solved</span>
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
                      <span className="table-btn table-green-btn">Solved</span>
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
              <div className="float-search">
                <small>Search Tickets</small>
                <img
                  className="search-icon"
                  src={SearchIcon}
                  alt="search-icon"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
