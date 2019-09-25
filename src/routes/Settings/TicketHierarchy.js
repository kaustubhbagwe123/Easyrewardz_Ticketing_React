import React, { Component } from "react";
import Demo from "../../store/Hashtag";
import TableArr from "./../../assets/Images/table-arr.png";
import InfoImg from './../../assets/Images/icons8-info.svg';
import DeleteIcon from './../../assets/Images/red-delete-icon.png';
import ClipIcon from './../../assets/Images/clip.png';
import CancelIcon from './../../assets/Images/cancel.png';
import { UncontrolledPopover, PopoverBody } from "reactstrap";

class TicketHierarchy extends Component {
  render() {
    return (
      <div className="mainDivPadding">
        <div className="breadcrumbs-row">
          <div className="breadcrumbs-row-padding">
            <label className="settings-ticketing">Settings > Ticketing ></label>
            <label className="lblHierarchy"> &nbsp;Hierarchy</label>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="maskTableHierarchy">
            <table>
              <thead>
                <tr>
                  <th>
                    Designation
                    <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Reports To <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Created By
                    <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Status <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HOD</td>
                  <td className="root-hod-manager-tea">Root</td>
                  <td className="admin-admin-admin-ad">
                    Admin
                    <img
                      src={InfoImg}
                      className="info-icon"
                      alt="Info"
                      id="Hod"
                    />
                    <UncontrolledPopover
                      trigger="hover"
                      placement="bottom"
                      target="Hod"
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
                  <td className="enabled-enabled-enab">Active</td>
                  <td>
                    <img src={DeleteIcon} alt="Delete" className="deleteImg" />
                    <button className="btnEditAction">
                      <label className="edit" id="Edit">
                        EDIT
                      </label>
                    </button>
                    <UncontrolledPopover
                      trigger="legacy"
                      placement="bottom"
                      target="Edit"
                      className="general-popover created-popover"
                    >
                      <PopoverBody>
                        <div>
                          <p className="edit-user-action">Edit User</p>
                          <label className="edit-label-1">
                            Designation Name
                          </label>
                          <input
                            type="text"
                            className="txt-edit-popover"
                            placeholder="Designation Name"
                          />
                          <label className="edit-label-1">Reports To</label>
                          <select
                            id="inputState"
                            class="form-control dropdown-setting"
                          >
                            <option>select</option>
                            <option>Root</option>
                          </select>
                          <label className="edit-label-1">Status</label>
                          <select
                            id="inputState"
                            class="form-control dropdown-setting"
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                          
                        </div>
                        <div>
                         <a className="cancle-action" href={Demo.BLANK_LINK}>Cancle</a>
                        </div>
                      </PopoverBody>
                    </UncontrolledPopover>
                  </td>
                </tr>
                <tr>
                  <td className="hod-manager-team-lea">Manager</td>
                  <td className="root-hod-manager-tea">HOD</td>
                  <td className="admin-admin-admin-ad">
                    Admin
                    <img
                      src={InfoImg}
                      className="info-icon"
                      alt="Info"
                      id="Manager"
                    />
                    <UncontrolledPopover
                      trigger="hover"
                      placement="bottom"
                      target="Manager"
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
                  <td className="enabled-enabled-enab">Inative</td>
                  <td>
                    <img src={DeleteIcon} alt="Delete" className="deleteImg" />
                    <button className="btnEditAction">
                      <label className="edit">EDIT</label>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="hod-manager-team-lea">Team Leader</td>
                  <td className="root-hod-manager-tea">Manager</td>
                  <td className="admin-admin-admin-ad">
                    Admin
                    <img
                      src={InfoImg}
                      className="info-icon"
                      alt="Info"
                      id="TeamLeader"
                    />
                    <UncontrolledPopover
                      trigger="hover"
                      placement="bottom"
                      target="TeamLeader"
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
                  <td className="enabled-enabled-enab">Active</td>
                  <td>
                    <img src={DeleteIcon} alt="Delete" className="deleteImg" />
                    <button className="btnEditAction">
                      <label className="edit">EDIT</label>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="hod-manager-team-lea">Supervisor</td>
                  <td className="root-hod-manager-tea">Team Leader</td>
                  <td className="admin-admin-admin-ad">
                    Admin
                    <img
                      src={InfoImg}
                      className="info-icon"
                      alt="Info"
                      id="Supervisor"
                    />
                    <UncontrolledPopover
                      trigger="hover"
                      placement="bottom"
                      target="Supervisor"
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
                  <td className="enabled-enabled-enab">Inative</td>
                  <td>
                    <img src={DeleteIcon} alt="Delete" className="deleteImg" />
                    <button className="btnEditAction">
                      <label className="edit">EDIT</label>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="hod-manager-team-lea">Executive</td>
                  <td className="root-hod-manager-tea">Supervisor</td>
                  <td className="admin-admin-admin-ad">
                    Admin
                    <img
                      src={InfoImg}
                      className="info-icon"
                      alt="Info"
                      id="Executive"
                    />
                    <UncontrolledPopover
                      trigger="hover"
                      placement="bottom"
                      target="Executive"
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
                  <td className="enabled-enabled-enab">Active</td>
                  <td>
                    <img src={DeleteIcon} alt="Delete" className="deleteImg" />
                    <button className="btnEditAction">
                      <label className="edit">EDIT</label>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pagination">
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
          <div>
            <div className="createHierarchyMask">
              <div className="createSpace">
                <label className="create-department">CREATE HIERARCHY</label>
                <div className="divSpace">
                  <label className="designation-name">Designation Name</label>
                  <input
                    type="text"
                    className="txt-1"
                    placeholder="Enter Designation Name"
                  />
                </div>
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="reports-to">Reports To</label>
                    <select
                      id="inputState"
                      className="form-control dropdown-setting"
                    >
                      <option>select</option>
                      <option>Root</option>
                    </select>
                  </div>
                </div>
                <div className="dropDrownSpace">
                  <label className="reports-to">Status</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-setting"
                  >
                    <option>select</option>
                    <option>Active</option>
                    <option>Deactive</option>
                  </select>
                </div>
                <div className="btnSpace">
                  <button className="CreateADDBtn">
                    <label className="addLable">ADD</label>
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="rectangle-copy-3">
              <div className="createSpace">
                <label className="bulk-upload">BULK UPLOAD</label>
                <div className="rectangleBox-1">
                  {/* <input type="file" className="" /> */}
                  <img src={ClipIcon} alt="Clip" className="clipImgMargin" />
                  <label className="add-file-or-drop-fil">
                    Add File
                    <span className="span-DropFile"> or Drop File here</span>
                  </label>
                </div>
                <div className="row">
                  <div className="blackDot"></div>
                  <label className="chat-agent-user-type">
                    Chat agent user type file.CSV
                  </label>
                  <img
                    src={DeleteIcon}
                    alt="Delete"
                    className="icons-8-delete"
                  />
                </div>
                <div className="">
                  <label className="lbl122-6-kb">122.6kb</label>
                </div>
                <div className="row">
                  <div className="blackDot"></div>
                  <label className="chat-agent-user-type">
                    Supervisor type file.CSV
                  </label>
                  <label className="retry">Retry</label>
                </div>
                <div className="">
                  <label className="failed">Failed</label>
                </div>
                <div className="row">
                  <div className="blackDot"></div>
                  <label className="chat-agent-user-type">
                    Chat agent 25 Oct type file.CSV
                  </label>
                </div>
                <div>
                  <div className="mainProgress">
                    <div className="ProgressBar"></div>
                  </div>
                  <img src={CancelIcon} alt="Cancel" className="cancelIcon" />
                </div>
                <div className="btnSpace">
                  <button className="CreateADDBtn">
                    <label className="addLable">ADD</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketHierarchy;
