import React, { Component } from "react";
import Demo from "../../../store/Hashtag";
import TableArr from "./../../../assets/Images/table-arr.png";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import FileUpload from "./../../../assets/Images/file.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import {Link} from 'react-router-dom'
class TicketHierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: ""
    };
  }
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };
  render() {
    const editbool = false;
    const tooltipDelay = { show: 50, hide: 100 };
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings">Settings</Link>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK}>Ticketing</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="active">
            Hierarchy
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr tickhierpad">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height">
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
                        <th style={{float:'left',marginLeft:'15px'}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>HOD</td>
                        <td>Root</td>
                        <td>
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
                        <td>Active</td>
                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del1">
                                <img src={DeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del1"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                            <div className="btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="edit-pop-1"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Designation Name
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-edit-popover"
                                        placeholder="Designation Name"
                                      />
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Reports To
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>select</option>
                                        <option>Root</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Status
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Save</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Manager</td>
                        <td>HOD</td>
                        <td>
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
                        <td>Inative</td>
                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del2">
                                <img src={DeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del2"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                            <div className="btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop2"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="edit-pop2"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Designation Name
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-edit-popover"
                                        placeholder="Designation Name"
                                      />
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Reports To
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>select</option>
                                        <option>Root</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Status
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Save</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Team Leader</td>
                        <td>Manager</td>
                        <td>
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
                        <td>Active</td>
                        <td>
                           <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del3">
                                <img src={DeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del3"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                            <div className="btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop3"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop3"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Designation Name
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-edit-popover"
                                        placeholder="Designation Name"
                                      />
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Reports To
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>select</option>
                                        <option>Root</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Status
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Save</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Supervisor</td>
                        <td>Team Leader</td>
                        <td>
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
                        <td>Inative</td>
                        <td>
                          <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del4">
                                <img src={DeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del4"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                            <div className="btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop4"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop4"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Designation Name
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-edit-popover"
                                        placeholder="Designation Name"
                                      />
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Reports To
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>select</option>
                                        <option>Root</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Status
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Save</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Executive</td>
                        <td>Supervisor</td>
                        <td>
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
                        <td>Active</td>
                        <td>
                        <div className="row">
                            <div className="deletepopover">
                              <div className="del-btn" id="del5">
                                <img src={DeleteIcon} alt="del-icon" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="del5"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
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
                            <div className="btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop5"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop5"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <label className="popover-header-text">
                                      EDIT USER
                                    </label>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Designation Name
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-edit-popover"
                                        placeholder="Designation Name"
                                      />
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Reports To
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>select</option>
                                        <option>Root</option>
                                      </select>
                                    </div>
                                    <div className="pop-over-div">
                                      <label className="edit-label-1">
                                        Status
                                      </label>
                                      <select className="edit-dropDwon dropdown-setting">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>CANCEL</a>
                                      <button className="butn">Save</button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="position-relative1">
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
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      CREATE HIERARCHY
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Designation Name
                      </label>
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
                      <button className="addBtn-ticket-hierarchy">
                        <label className="addLable">ADD</label>
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    className="file-upload d-none"
                    type="file"
                    onChange={this.fileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    onDrop={this.fileDrop}
                    onDragOver={this.fileDragOver}
                    onDragEnter={this.fileDragEnter}
                  >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TicketHierarchy;
