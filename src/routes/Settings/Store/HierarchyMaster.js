import Demo from "./../../../store/Hashtag.js";
import TableArr from "./../../../assets/Images/table-arr.png";
import React, { Component } from "react";
import InfoIcon from "./../../../assets/Images/Info-black.png";
import DelIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

class HierarchyMaster extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href={Demo.BLANK_LINK}>Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Store</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            Hierarchy Master
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Designation <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Reports To <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Created By <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Status <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Store Manager</td>
                        <td>Root</td>
                        <td>
                          Admin
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="PopoverLegacy"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="PopoverLegacy"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="title">Created By: Admin</p>
                                <p className="sub-title">
                                  Created Date: 12 March 2018
                                </p>
                              </div>
                              <div>
                                <p className="title">Updated By: Manager</p>
                                <p className="sub-title">
                                  Updated Date: 12 March 2018
                                </p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>Active</td>
                        <td>
                          <div className="del-btn">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <button className="butn">EDIT</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Store Executive</td>
                        <td>Store Manager</td>
                        <td>
                          Admin
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                          />
                        </td>
                        <td>Inactive</td>
                        <td>
                          <div className="del-btn">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <button className="butn">EDIT</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="position-relative">
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HierarchyMaster;
