import React, { Component } from "react";
import "jquery";
import "popper.js/dist/popper";
import Demo from "../../store/Hashtag.js";
import "bootstrap";
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIconGray from "./../../assets/Images/info-icon-gray.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import TaskIconBlue from "./../../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../../assets/Images/cliam-icon-blue.png";

class PrioritySettings extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href={Demo.BLANK_LINK} className="header-path">
            Settings
          </a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path active">
            Priority
          </a>
        </div>
        <div className="container-fluid">
          <div className="setting-tabs">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    Priority Name <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Created By <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Created Date <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Status <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="pink-bg">
                  <td></td>
                  <td>High</td>
                  <td>
                    Admin
                    <img
                      className="info-icon"
                      src={InfoIconGray}
                      alt="info-icon-gray"
                    />
                  </td>
                  <td>23-May-19</td>
                  <td>Active</td>
                  <td>High</td>
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
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>N Rampal</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                    <span>Hope this help, Please rate us (1 new comment)</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>N Rampal</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>N Rampal</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>N Rampal</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>N Rampal</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>N Rampal</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrioritySettings;
