import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import '../../node_modules/jquery/dist/jquery.js';
import '../../node_modules/popper.js/dist/popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import PieChart from '../Component/PieChart/PieChart';
import Demo from '../store/Hashtag.js';

class Dashboard extends Component {
    render() {
        return (
            <div>
                    <div className="logout-block">
                    <div>
                    <div className="user-img">
                        <img src="Images/user-img.jpg" alt="missing"/>
                    </div>
                    <div>
                        <p>Naman Rampal</p>
                        <p className="mail-id">naman@fabindia.com</p>
                    </div>
                    <button>LOGout</button>
                    </div>
                    <div className="status-sctn">
                    <div className="d-flex align-items-center">
                        <div className="logout-status">
                        <img src="Images/status.png" alt="icon missing"/>
                        </div>
                        <p className="logout-label chat-status">Chat Status :</p>
                    </div>
                    <div className="status-options">
                        <input type="radio" name="logout-status" id="online" />
                        <label htmlFor="online" className="logout-label">Online</label>
                    </div>
                    <div className="status-options">
                        <input type="radio" name="logout-status" id="away" />
                        <label htmlFor="away" className="logout-label">Away</label>
                    </div>
                    <div className="status-options">
                        <input type="radio" name="logout-status" id="offline" />
                        <label htmlFor="offline" className="logout-label">Offline</label>
                    </div>
                    </div>
                    <div className="d-block">
                    <div className="d-flex justify-content-between">
                        <div>
                        <p className="logout-label">Login Time</p>
                        <p className="font-weight-bold">9:30 AM</p>
                        </div>
                        <div>
                        <p className="logout-label">Logout Time</p>
                        <p className="font-weight-bold">6:30 PM</p>
                        </div>
                    </div>
                    <ProgressBar className="logout-progress" now={60} />
                    <p className="logout-label font-weight-bold prog-indi">5H 23M</p>
                    </div>
                    <div>
                    <div>
                        <p className="logout-label">SLA SCORE</p>
                        <p className="font-weight-bold">60%</p>
                    </div>
                    <div>
                        <p className="logout-label">Avg Response time</p>
                        <p className="font-weight-bold">1 Hr</p>
                    </div>
                    <div>
                        <p className="logout-label">CSAT SCORE</p>
                        <p className="font-weight-bold">90%</p>
                    </div>
                    </div>
                </div>
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
                            <PieChart />
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="dash-top-cards p-0">
                            <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#bill-graph-tab" role="tab" aria-controls="bill-graph-tab" aria-selected="true">Tickets to bill graph</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#source-tab" role="tab" aria-controls="source-tab" aria-selected="false">Tickets generation source tab</a>
                            </li>
                            </ul>
                            <div className="tab-content">
                            <div className="tab-pane fade show active" id="bill-graph-tab" role="tabpanel" aria-labelledby="bill-graph-tab">1</div>
                            <div className="tab-pane fade" id="source-tab" role="tabpanel" aria-labelledby="source-tab">2</div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3">
                        <div className="dash-top-cards">
                            <p className="card-head">SLA</p>
                            <div className="resp-success">
                            <p className="card-head">Response Success</p>
                            <span className="card-value"><big>60%</big></span>
                            <p className="card-head mt-4">Resolution Success : <span className="font-weight-bold">57.23%</span></p>
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
                                <a className="nav-link active" data-toggle="tab" href="#task-tab" role="tab" aria-controls="task-tab" aria-selected="true">Ticket to Task</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#claim-tab" role="tab" aria-controls="claim-tab" aria-selected="false">Ticket to claim</a>
                            </li>
                            </ul>
                            <div className="tab-content">
                            <div className="tab-pane fade show active" id="task-tab" role="tabpanel" aria-labelledby="task-tab">1</div>
                            <div className="tab-pane fade" id="claim-tab" role="tabpanel" aria-labelledby="claim-tab">2</div>
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
                            <th>Status <img src="Images/table-arr.png" alt="missing" /></th>
                            <th className="table-img-cntr"></th>
                            <th>Subject<span>/Lastest Message</span></th>
                            <th>Category <img src="Images/table-arr.png" alt="missing" /></th>
                            <th>Priority <img src="Images/table-arr.png" alt="missing" /></th>
                            <th>Assignee <img src="Images/table-arr.png" alt="missing" /></th>
                            <th>Creation on <img src="Images/table-arr.png" alt="missing" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="pink-bg">
                            <td>ABC1234</td>
                            <td><span className="table-btn table-blue-btn">Open</span></td>
                            <td className="table-img-cntr"></td>
                            <td>Need to change my shipping address <span>Hope this help, Please rate us</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt="issing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>2 Hour Ago <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                            <tr className="orange-bg">
                            <td>ABC1234</td>
                            <td><span className="table-btn table-blue-btn">Open</span></td>
                            <td className="table-img-cntr"></td>
                            <td className="black-clr">Need to change my shipping address <span>Hope this help, Please rate us</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>12 March 2018 <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                            <tr className="blue-bg">
                            <td>ABC1234</td>
                            <td><span className="table-btn table-yellow-btn">New</span></td>
                            <td className="table-img-cntr"><img className="task-icon-1" src="Images/task-icon-blue.png" alt="missing" /></td>
                            <td className="black-clr">Need to change my shipping address <span>Hope this help, Please rate us (1 new comment)</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt="imissing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>12 March 2018 <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                            <tr>
                            <td>ABC1234</td>
                            <td><span className="table-btn table-yellow-btn">New</span></td>
                            <td className="table-img-cntr"><img className="task-icon-1" src="Images/task-icon-gray.png" alt="missing" /></td>
                            <td>Need to change my shipping address <span>Hope this help, Please rate us</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt=" missing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>12 March 2018 <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                            <tr>
                            <td>ABC1234</td>
                            <td><span className="table-btn table-green-btn">Solved</span></td>
                            <td className="table-img-cntr"><img className="claim-icon" src="Images/cliam-icon-blue.png" alt="missing" /><img className="task-icon-1" src="Images/task-icon-gray.png" alt="missing" /></td>
                            <td>Need to change my shipping address <span>Hope this help, Please rate us</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>12 March 2018 <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                            <tr>
                            <td>ABC1234</td>
                            <td><span className="table-btn table-green-btn">Solved</span></td>
                            <td className="table-img-cntr"></td>
                            <td>Need to change my shipping address <span>Hope this help, Please rate us</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>12 March 2018 <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                            <tr>
                            <td>ABC1234</td>
                            <td><span className="table-btn table-green-btn">Solved</span></td>
                            <td className="table-img-cntr"></td>
                            <td>Need to change my shipping address <span>Hope this help, Please rate us</span></td>
                            <td>Defective article <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            <td>High</td>
                            <td>N Rampal</td>
                            <td>12 March 2018 <img className="info-icon" src="Images/info-icon.png" alt="missing" /></td>
                            </tr>
                        </tbody>
                        </table>
                        <div className="pagi">
                        <ul>
                            <li><a href={Demo.BLANK_LINK}>&lt;</a></li>
                            <li><a href={Demo.BLANK_LINK}>1</a></li>
                            <li className="active"><a href={Demo.BLANK_LINK}>2</a></li>
                            <li><a href={Demo.BLANK_LINK}>3</a></li>
                            <li><a href={Demo.BLANK_LINK}>4</a></li>
                            <li><a href={Demo.BLANK_LINK}>5</a></li>
                            <li><a href={Demo.BLANK_LINK}>6</a></li>
                            <li><a href={Demo.BLANK_LINK}>7</a></li>
                            <li><a href={Demo.BLANK_LINK}>&gt;</a></li>
                        </ul>
                        </div>
                        <div className="float-search">
                        <small>Search Tickets</small>
                        <img className="search-icon" src="Images/search-icon.png" alt="icon missing"/>
                        </div>
                    </div>
                    </div>
                </section>
    
            </div>
        )
    }
}

export default Dashboard
