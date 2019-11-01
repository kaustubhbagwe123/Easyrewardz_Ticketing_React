import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../../assets/Images/delete.svg";
// import UploadIcon from './../../assets/Images/clip.png';
// import CrossIcon from './../../assets/Images/cross-icon.png';
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import Demo from "../../store/Hashtag.js";

import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
class CreateCRMRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: ""
    };
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href={Demo.BLANK_LINK}>Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Ticketing</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            CRM Roles
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Role Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Created By <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Status <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label className="table-data-text">HOD</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-1"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-1"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-1"
                            className="general-popover created-popover"
                            flip={true}
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
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>
                        <td>
                          <div className="del-btn" id="crm-del1">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-del1"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={BlackDeleteIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="store-crmrole-Btn" id="crm-edit-pop-1">
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-edit-pop-1"
                            className="general-popover delete-popover"
                          >
                            <PopoverBody className="d-flex">
                              <div>
                                <div className="">
                                  <label className="popover-header-text">
                                    EDIT ROLE
                                  </label>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Role Name
                                  </label>
                                  <input
                                    type="text"
                                    className="pop-over-text-crm"
                                    placeholder="6"
                                  />
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Dashboard
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editDashboard-p-1"
                                    />
                                    <label
                                      htmlFor="editDashboard-p-1"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Tickets
                                    </label>
                                    <input type="checkbox" id="editTasks-p-2" />
                                    <label
                                      htmlFor="editTasks-p-2"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Knowledge Base
                                    </label>
                                    <input type="checkbox" id="editClaim-p-3" />
                                    <label
                                      htmlFor="editClaim-p-3"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Settings
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-4"
                                    />
                                    <label
                                      htmlFor="editNotification-p-4"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Chat
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editSettings-p-5"
                                    />
                                    <label
                                      htmlFor="editSettings-p-5"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Notification
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-5"
                                    />
                                    <label
                                      htmlFor="editNotification-p-5"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Reports
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editReports-p-6"
                                    />
                                    <label
                                      htmlFor="editReports-p-6"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Status
                                  </label>
                                  <select className="pop-over-select-crm">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                  </select>
                                </div>

                                <br />
                                <div>
                                  <label className="pop-over-cancle">
                                    CANCEL
                                  </label>
                                  <button className="pop-over-button">
                                    <label className="pop-over-btnsave-text">
                                      SAVE
                                    </label>
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Manager</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-2"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-2"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-2"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-2"
                            className="general-popover created-popover"
                            flip={true}
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
                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>
                        <td>
                          <div className="del-btn" id="crm-del2">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-del2"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={BlackDeleteIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="store-crmrole-Btn" id="crm-edit-pop-2">
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-edit-pop-2"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div>
                                <div className="">
                                  <label className="popover-header-text">
                                    EDIT ROLE
                                  </label>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Role Name
                                  </label>
                                  <input
                                    type="text"
                                    className="pop-over-text-crm"
                                    placeholder="6"
                                  />
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Dashboard
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editDashboard-p-22"
                                    />
                                    <label
                                      htmlFor="editDashboard-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Tickets
                                    </label>
                                    <input type="checkbox" id="editTasks-p-22" />
                                    <label
                                      htmlFor="editTasks-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Knowledge Base
                                    </label>
                                    <input type="checkbox" id="editClaim-p-22" />
                                    <label
                                      htmlFor="editClaim-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Settings
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-22"
                                    />
                                    <label
                                      htmlFor="editNotification-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Chat
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editSettings-p-22"
                                    />
                                    <label
                                      htmlFor="editSettings-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Notification
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-22"
                                    />
                                    <label
                                      htmlFor="editNotification-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Reports
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editReports-p-22"
                                    />
                                    <label
                                      htmlFor="editReports-p-22"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Status
                                  </label>
                                  <select className="pop-over-select-crm">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                  </select>
                                </div>
                                <br />
                                <div>
                                  <label className="pop-over-cancle">
                                    CANCEL
                                  </label>
                                  <button className="pop-over-button">
                                    <label className="pop-over-btnsave-text">
                                      SAVE
                                    </label>
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Team Leader</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-3"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-3"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-3"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-3"
                            className="general-popover created-popover"
                            flip={true}
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
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>
                        <td>
                          <div className="del-btn" id="crm-del3">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-del3"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={BlackDeleteIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="store-crmrole-Btn" id="crm-edit-pop-3">
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-edit-pop-3"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div>
                                <div className="">
                                  <label className="popover-header-text">
                                    EDIT ROLE
                                  </label>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Role Name
                                  </label>
                                  <input
                                    type="text"
                                    className="pop-over-text-crm"
                                    placeholder="6"
                                  />
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Dashboard
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editDashboard-p-33"
                                    />
                                    <label
                                      htmlFor="editDashboard-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Tickets
                                    </label>
                                    <input type="checkbox" id="editTasks-p-33" />
                                    <label
                                      htmlFor="editTasks-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Knowledge Base
                                    </label>
                                    <input type="checkbox" id="editClaim-p-33" />
                                    <label
                                      htmlFor="editClaim-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Settings
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-33"
                                    />
                                    <label
                                      htmlFor="editNotification-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Chat
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editSettings-p-33"
                                    />
                                    <label
                                      htmlFor="editSettings-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Notification
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-33"
                                    />
                                    <label
                                      htmlFor="editNotification-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Reports
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editReports-p-33"
                                    />
                                    <label
                                      htmlFor="editReports-p-33"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Status
                                  </label>
                                  <select className="pop-over-select-crm">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                  </select>
                                </div>
                                <br />
                                <div>
                                  <label className="pop-over-cancle">
                                    CANCEL
                                  </label>
                                  <button className="pop-over-button">
                                    <label className="pop-over-btnsave-text">
                                      SAVE
                                    </label>
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Supervisor</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-4"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-4"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-4"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-4"
                            className="general-popover created-popover"
                            flip={true}
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
                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>
                        <td>
                          <div className="del-btn" id="crm-del4">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-del4"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={BlackDeleteIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="store-crmrole-Btn" id="crm-edit-pop-4">
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-edit-pop-4"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div>
                                <div className="">
                                  <label className="popover-header-text">
                                    EDIT ROLE
                                  </label>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Role Name
                                  </label>
                                  <input
                                    type="text"
                                    className="pop-over-text-crm"
                                    placeholder="6"
                                  />
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Dashboard
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editDashboard-p-44"
                                    />
                                    <label
                                      htmlFor="editDashboard-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Tickets
                                    </label>
                                    <input type="checkbox" id="editTasks-p-44" />
                                    <label
                                      htmlFor="editTasks-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Knowledge Base
                                    </label>
                                    <input type="checkbox" id="editClaim-p-44" />
                                    <label
                                      htmlFor="editClaim-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Settings
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-44"
                                    />
                                    <label
                                      htmlFor="editNotification-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Chat
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editSettings-p-44"
                                    />
                                    <label
                                      htmlFor="editSettings-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Notification
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-44"
                                    />
                                    <label
                                      htmlFor="editNotification-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Reports
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editReports-p-44"
                                    />
                                    <label
                                      htmlFor="editReports-p-44"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Status
                                  </label>
                                  <select className="pop-over-select-crm">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                  </select>
                                </div>
                                <br />
                                <div>
                                  <label className="pop-over-cancle">
                                    CANCEL
                                  </label>
                                  <button className="pop-over-button">
                                    <label className="pop-over-btnsave-text">
                                      SAVE
                                    </label>
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Executive</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="role-5"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="role-5"
                            className="general-popover created-popover role-info"
                          >
                            <PopoverBody>
                              <div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Dashboard
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Tickets
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    knowledge Base
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Settings
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Chat
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Notification
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Disable
                                  </label>
                                </div>
                                <div className="rvmmargin">
                                  <p className="rolle-name-text-popover">
                                    Reports
                                  </p>
                                  <label className="pop-over-lbl-text-pop">
                                    Enable
                                  </label>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <label className="table-data-text">Admin</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                            id="created-5"
                          />

                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created-5"
                            className="general-popover created-popover"
                            flip={true}
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
                        <td>
                          <label className="table-data-text">Active</label>
                        </td>
                        <td>
                          <div className="del-btn" id="crm-del5">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-del5"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={BlackDeleteIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="store-crmrole-Btn" id="crm-edit-pop-5">
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="crm-edit-pop-5"
                            className="general-popover delete-popover"
                            flip={true}
                          >
                            <PopoverBody className="d-flex">
                              <div>
                                <div className="">
                                  <label className="popover-header-text">
                                    EDIT ROLE
                                  </label>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Role Name
                                  </label>
                                  <input
                                    type="text"
                                    className="pop-over-text-crm"
                                    placeholder="6"
                                  />
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Dashboard
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editDashboard-p-55"
                                    />
                                    <label
                                      htmlFor="editDashboard-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Tickets
                                    </label>
                                    <input type="checkbox" id="editTasks-p-55" />
                                    <label
                                      htmlFor="editTasks-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Knowledge Base
                                    </label>
                                    <input type="checkbox" id="editClaim-p-55" />
                                    <label
                                      htmlFor="editClaim-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Settings
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-55"
                                    />
                                    <label
                                      htmlFor="editNotification-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Chat
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editSettings-p-55"
                                    />
                                    <label
                                      htmlFor="editSettings-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Notification
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editNotification-p-55"
                                    />
                                    <label
                                      htmlFor="editNotification-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className="crm-margin-div">
                                  <div className="switch switch-primary d-inline m-r-10">
                                    <label className="storeRole-name-text">
                                      Reports
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="editReports-p-55"
                                    />
                                    <label
                                      htmlFor="editReports-p-55"
                                      className="cr"
                                    ></label>
                                  </div>
                                </div>
                                <div className=" pop-over-div">
                                  <label className="pop-over-lbl-text">
                                    Status
                                  </label>
                                  <select className="pop-over-select-crm">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                  </select>
                                </div>
                                <br />
                                <div>
                                  <label className="pop-over-cancle">
                                    CANCEL
                                  </label>
                                  <button className="pop-over-button">
                                    <label className="pop-over-btnsave-text">
                                      SAVE
                                    </label>
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
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
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="create-department">CREATE CRM ROLE</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Role Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Role Name"
                      />
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Dashboard</label>
                        <input type="checkbox" id="Dashboard-p-1" />
                        <label htmlFor="Dashboard-p-1" className="cr cr-float-auto"></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Tickets</label>
                        <input type="checkbox" id="Tasks-p-2" />
                        <label htmlFor="Tasks-p-2" className="cr cr-float-auto"></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">
                          Knowledge Base
                        </label>
                        <input type="checkbox" id="Claim-p-3" />
                        <label htmlFor="Claim-p-3" className="cr cr-float-auto"></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Settings</label>
                        <input type="checkbox" id="Notification-p-4" />
                        <label
                          htmlFor="Notification-p-4"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Chat</label>
                        <input type="checkbox" id="Settings-p-5" />
                        <label htmlFor="Settings-p-5" className="cr cr-float-auto"></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">
                          Notification
                        </label>
                        <input type="checkbox" id="Notification-p-5" />
                        <label
                          htmlFor="Notification-p-5"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Reports</label>
                        <input type="checkbox" id="Reports-p-6" />
                        <label htmlFor="Reports-p-6" className="cr cr-float-auto"></label>
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
                      <button className="addBtn-ticket-hierarchy">
                        <label className="addLable">ADD</label>
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <h3>Bulk Upload</h3>
                    <input
                      id="file-upload"
                      className="file-upload d-none"
                      type="file"
                      onChange={this.fileUpload.bind(this)}
                    />
                    <label htmlFor="file-upload">
                      <div className="file-icon">
                        <img src={FileUpload} alt="file-upload" />
                      </div>
                      <span>Add File</span> or Drop File here
                    </label>
                    {this.state.fileName && (
                      <div className="file-info">
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <div className="del-file" id="del-file-1">
                              <img src={DelBlack} alt="delete-black" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="auto"
                              target="del-file-1"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
                                </div>
                                <div>
                                  <p className="font-weight-bold blak-clr">
                                    Delete file?
                                  </p>
                                  <p className="mt-1 fs-12">
                                    Are you sure you want to delete this file?
                                  </p>
                                  <div className="del-can">
                                    <a href={Demo.BLANK_LINK}>CANCEL</a>
                                    <button className="butn">Delete</button>
                                  </div>
                                </div>
                              </PopoverBody>
                            </UncontrolledPopover>
                          </div>
                          <div>
                            <span className="file-size">122.6kb</span>
                          </div>
                        </div>
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <a className="file-retry" href={Demo.BLANK_LINK}>
                              Retry
                            </a>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
                          </div>
                        </div>
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name pr-0">
                              {this.state.fileName}
                            </p>
                          </div>
                          <div>
                            <div className="d-flex align-items-center mt-2">
                              <ProgressBar className="file-progress" now={60} />
                              <div className="cancel-upload">
                                <img src={UploadCancel} alt="upload cancel" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="butn">ADD</button>
                    <br />
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

export default CreateCRMRoles;
