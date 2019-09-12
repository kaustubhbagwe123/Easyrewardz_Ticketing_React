import React,{Component} from 'react';
import Demo from '../store/Hashtag.js'
import SearchIcon from './../assets/Images/search-icon.png'
import TableArr from './../assets/Images/table-arr.png' 
import InfoIcon from './../assets/Images/info-icon.png';
import TaskIconBlue from './../assets/Images/task-icon-blue.png';
import TaskIconGray from './../assets/Images/task-icon-gray.png'; 
import CliamIconBlue from './../assets/Images/cliam-icon-blue.png';
 

 class MyTicketList extends Component
 {

    render(){

        return (
          <>
            <div className="myticketlist-header">
              
                <table className="table">
                  <tbody>
                    <tr>
                      <td style={{paddingLeft:"20px",paddingTop:"15px"}}>
                        <div className="Escalation04-box1">
                          Escalation:{" "}
                          <label className="oval04">
                            <label style={{ color: "white", padding: "5px" }}>
                              04
                            </label>
                          </label>
                        </div>
                      </td>

                      <td>New: 09 </td>
                      <td>Open: 10</td>
                      <td>Resolved: 15 </td>
                      <td>Reassigned by me: 03</td>
                      <td>Closed: 12</td>
                      <td>All: 56</td>
                      <td>Follow Up: 03</td>
                      <td>Draft: 05</td>
                      <td></td>
                      <td style={{ padding: "13px" }}>
                        <div>
                          <button className="Add-ticket-button">
                            <label className="add-tickets">Add Tickets</label>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
             
            <div className="container-fluid" style={{marginTop:"30px"}}>
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
                        Category{" "}
                        <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Priority{" "}
                        <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Assignee{" "}
                        <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Creation on{" "}
                        <img src={TableArr} alt="table-arr" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
                      <td>Naman</td>
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
                        {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                      </td>
                      <td>
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
                      <td>Rashmi</td>
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
                        <img
                          className="task-icon-1"
                          src={TaskIconBlue}
                          alt="task-icon-blue"
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
                      <td>Shalini</td>
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
                        <span className="table-btn table-blue-btn">Open</span>
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
                      <td>Vikash</td>
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
                        <span className="table-btn table-blue-btn">Open</span>
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
                      <td>Nidhi</td>
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
                        {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                      </td>
                      <td>
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
                      <td>Mansi</td>
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
                        {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
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
                      <td>Naman</td>
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
                      <td>Akriti</td>
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
                      <td>Juhi</td>
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
                        {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                      </td>
                      <td>
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
                      <td>Shalini</td>
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
          </>
        );
    }

 }

 export default MyTicketList;