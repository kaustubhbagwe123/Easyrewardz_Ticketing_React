import React, { Component } from "react";
import Demo from "./../../../store/Hashtag.js";
import TableArr from "./../../../assets/Images/table-arr.png";
import InfoIcon from "./../../../assets/Images/Info-black.png";
import DelIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import {Link} from 'react-router-dom'

class Users extends Component {
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
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK}>Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
            Users
          </Link>
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
                          User Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Mob. No. <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Email ID <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Designation <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ajay Hattar</td>
                        <td>983848448</td>
                        <td>something@email.com</td>
                        <td>
                          Manager
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="desig1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="desig1"
                            className="general-popover created-popover users-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">
                                  Reportee Designation
                                </p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">Issue Type</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Report To</p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">CRM Role</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Brand</p>
                                <p className="title">Bata</p>
                              </div>
                              <div>
                                <p className="sub-title">Copy Escalation</p>
                                <p className="title">Yes</p>
                              </div>
                              <div>
                                <p className="sub-title">Categories</p>
                                <p className="title">Compliant</p>
                              </div>
                              <div>
                                <p className="sub-title">Assign Escalation</p>
                                <p className="title">Agent</p>
                              </div>
                              <div>
                                <p className="sub-title">Sub Categories</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Agent Name</p>
                                <p className="title">Amit Singh</p>
                              </div>
                              <div>
                                <p className="sub-title">Created By</p>
                                <p className="title">Admin</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated By</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Created Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <div className="del-btn" id="del1">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del1"
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
                          <button className="butn">
                            <label id="editAction"> EDIT</label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="editAction"
                            className="general-popover edit-popover"
                          >
                            <PopoverBody>
                              <h4>Edit User</h4>
                              <div className="div-cntr">
                                <label>Designation Name</label>
                                <input type="text" defaultValue="HOD" />
                              </div>
                              <div className="div-cntr">
                                <label>Reports To</label>
                                <select>
                                  <option>Root</option>
                                  <option>Root</option>
                                  <option>Root</option>
                                </select>
                              </div>
                              <div className="div-cntr">
                                <label>Status</label>
                                <select>
                                  <option>Active</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                              <div className="del-can">
                                <a href={Demo.BLANK_LINK}>CANCEL</a>
                                <button className="butn">Save</button>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>Taran Singh</td>
                        <td>983848448</td>
                        <td>something@email.com</td>
                        <td>
                          Manager
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="desig2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="desig2"
                            className="general-popover created-popover users-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">
                                  Reportee Designation
                                </p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">Issue Type</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Report To</p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">CRM Role</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Brand</p>
                                <p className="title">Bata</p>
                              </div>
                              <div>
                                <p className="sub-title">Copy Escalation</p>
                                <p className="title">Yes</p>
                              </div>
                              <div>
                                <p className="sub-title">Categories</p>
                                <p className="title">Compliant</p>
                              </div>
                              <div>
                                <p className="sub-title">Assign Escalation</p>
                                <p className="title">Agent</p>
                              </div>
                              <div>
                                <p className="sub-title">Sub Categories</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Agent Name</p>
                                <p className="title">Amit Singh</p>
                              </div>
                              <div>
                                <p className="sub-title">Created By</p>
                                <p className="title">Admin</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated By</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Created Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <div className="del-btn" id="del2">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del2"
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
                                  <a className="fs-12" href={Demo.BLANK_LINK}>
                                    CANCEL
                                  </a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="butn" id="edit2">
                            EDIT
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="edit2"
                            className="general-popover edit-popover"
                          >
                            <PopoverBody>
                              <h4>Edit User</h4>
                              <div className="div-cntr">
                                <label>Designation Name</label>
                                <input type="text" defaultValue="HOD" />
                              </div>
                              <div className="div-cntr">
                                <label>Reports To</label>
                                <select>
                                  <option>Root</option>
                                  <option>Root</option>
                                  <option>Root</option>
                                </select>
                              </div>
                              <div className="div-cntr">
                                <label>Status</label>
                                <select>
                                  <option>Active</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                              <div className="del-can">
                                <a href={Demo.BLANK_LINK}>CANCEL</a>
                                <button className="butn">Save</button>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>Sarthak Gupta</td>
                        <td>983848448</td>
                        <td>something@email.com</td>
                        <td>
                          Manager
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="desig3"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="desig3"
                            className="general-popover created-popover users-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">
                                  Reportee Designation
                                </p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">Issue Type</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Report To</p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">CRM Role</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Brand</p>
                                <p className="title">Bata</p>
                              </div>
                              <div>
                                <p className="sub-title">Copy Escalation</p>
                                <p className="title">Yes</p>
                              </div>
                              <div>
                                <p className="sub-title">Categories</p>
                                <p className="title">Compliant</p>
                              </div>
                              <div>
                                <p className="sub-title">Assign Escalation</p>
                                <p className="title">Agent</p>
                              </div>
                              <div>
                                <p className="sub-title">Sub Categories</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Agent Name</p>
                                <p className="title">Amit Singh</p>
                              </div>
                              <div>
                                <p className="sub-title">Created By</p>
                                <p className="title">Admin</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated By</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Created Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <div className="del-btn" id="del3">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del3"
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
                                  <a className="fs-12" href={Demo.BLANK_LINK}>
                                    CANCEL
                                  </a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="butn" id="edit3">
                            EDIT
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="edit3"
                            className="general-popover edit-popover"
                          >
                            <PopoverBody>
                              <h4>Edit User</h4>
                              <div className="div-cntr">
                                <label>Designation Name</label>
                                <input type="text" defaultValue="HOD" />
                              </div>
                              <div className="div-cntr">
                                <label>Reports To</label>
                                <select>
                                  <option>Root</option>
                                  <option>Root</option>
                                  <option>Root</option>
                                </select>
                              </div>
                              <div className="div-cntr">
                                <label>Status</label>
                                <select>
                                  <option>Active</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                              <div className="del-can">
                                <a href={Demo.BLANK_LINK}>CANCEL</a>
                                <button className="butn">Save</button>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>Shubham Gulati</td>
                        <td>983848448</td>
                        <td>something@email.com</td>
                        <td>
                          Manager
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="desig4"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="desig4"
                            className="general-popover created-popover users-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">
                                  Reportee Designation
                                </p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">Issue Type</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Report To</p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">CRM Role</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Brand</p>
                                <p className="title">Bata</p>
                              </div>
                              <div>
                                <p className="sub-title">Copy Escalation</p>
                                <p className="title">Yes</p>
                              </div>
                              <div>
                                <p className="sub-title">Categories</p>
                                <p className="title">Compliant</p>
                              </div>
                              <div>
                                <p className="sub-title">Assign Escalation</p>
                                <p className="title">Agent</p>
                              </div>
                              <div>
                                <p className="sub-title">Sub Categories</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Agent Name</p>
                                <p className="title">Amit Singh</p>
                              </div>
                              <div>
                                <p className="sub-title">Created By</p>
                                <p className="title">Admin</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated By</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Created Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <div className="del-btn" id="del4">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del4"
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
                                  <a className="fs-12" href={Demo.BLANK_LINK}>
                                    CANCEL
                                  </a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="butn" id="edit4">
                            EDIT
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="edit4"
                            className="general-popover edit-popover"
                          >
                            <PopoverBody>
                              <h4>Edit User</h4>
                              <div className="div-cntr">
                                <label>Designation Name</label>
                                <input type="text" defaultValue="HOD" />
                              </div>
                              <div className="div-cntr">
                                <label>Reports To</label>
                                <select>
                                  <option>Root</option>
                                  <option>Root</option>
                                  <option>Root</option>
                                </select>
                              </div>
                              <div className="div-cntr">
                                <label>Status</label>
                                <select>
                                  <option>Active</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                              <div className="del-can">
                                <a href={Demo.BLANK_LINK}>CANCEL</a>
                                <button className="butn">Save</button>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                      </tr>
                      <tr>
                        <td>Nidhi Jain</td>
                        <td>983848448</td>
                        <td>something@email.com</td>
                        <td>
                          Manager
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="desig5"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="desig5"
                            className="general-popover created-popover users-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">
                                  Reportee Designation
                                </p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">Issue Type</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Report To</p>
                                <p className="title">HOD</p>
                              </div>
                              <div>
                                <p className="sub-title">CRM Role</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Brand</p>
                                <p className="title">Bata</p>
                              </div>
                              <div>
                                <p className="sub-title">Copy Escalation</p>
                                <p className="title">Yes</p>
                              </div>
                              <div>
                                <p className="sub-title">Categories</p>
                                <p className="title">Compliant</p>
                              </div>
                              <div>
                                <p className="sub-title">Assign Escalation</p>
                                <p className="title">Agent</p>
                              </div>
                              <div>
                                <p className="sub-title">Sub Categories</p>
                                <p className="title">Payments</p>
                              </div>
                              <div>
                                <p className="sub-title">Agent Name</p>
                                <p className="title">Amit Singh</p>
                              </div>
                              <div>
                                <p className="sub-title">Created By</p>
                                <p className="title">Admin</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated By</p>
                                <p className="title">Manager</p>
                              </div>
                              <div>
                                <p className="sub-title">Created Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                              <div>
                                <p className="sub-title">Updated Date</p>
                                <p className="title">06-03-2019</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </td>
                        <td>
                          <div className="del-btn" id="del5">
                            <img src={DelIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del5"
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
                                  <a className="fs-12" href={Demo.BLANK_LINK}>
                                    CANCEL
                                  </a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                          <button className="butn" id="edit5">
                            EDIT
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="edit5"
                            className="general-popover edit-popover"
                          >
                            <PopoverBody>
                              <h4>Edit User</h4>
                              <div className="div-cntr">
                                <label>Designation Name</label>
                                <input type="text" defaultValue="HOD" />
                              </div>
                              <div className="div-cntr">
                                <label>Reports To</label>
                                <select>
                                  <option>Root</option>
                                  <option>Root</option>
                                  <option>Root</option>
                                </select>
                              </div>
                              <div className="div-cntr">
                                <label>Status</label>
                                <select>
                                  <option>Active</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                              <div className="del-can">
                                <a href={Demo.BLANK_LINK}>CANCEL</a>
                                <button className="butn">Save</button>
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
                <div className="right-sect-div right-sect-collapse">
                  <h3>Create Users</h3>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="true"
                      aria-controls="personal-details"
                    >
                      Personal Details
                    </a>
                    <div className="multi-collapse show" id="personal-details">
                      <div className="div-cntr">
                        <label>User Name</label>
                        <input type="text" defaultValue="Ajay" />
                      </div>
                      <div className="div-cntr">
                        <label>Mobile Number</label>
                        <input type="text" defaultValue="9876543210" />
                      </div>
                      <div className="div-cntr">
                        <label>Email ID</label>
                        <input type="text" defaultValue="something@email.com" />
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target="#profile-details"
                          data-toggle="collapse"
                          className="butn"
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#profile-details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="profile-details"
                    >
                      Profile Details
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="profile-details"
                    >
                      <div className="div-cntr">
                        <label>User Designation</label>
                        <select>
                          <option>Manager</option>
                          <option>Manager</option>
                          <option>Manager</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Reportee Designation</label>
                        <select>
                          <option>HOD</option>
                          <option>HOD</option>
                          <option>HOD</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Report To</label>
                        <select>
                          <option>HOD</option>
                          <option>HOD</option>
                          <option>HOD</option>
                        </select>
                      </div>
                      <div className="btn-coll">
                        <button
                          data-target="#mapped-category"
                          data-toggle="collapse"
                          className="butn"
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#mapped-category"
                      role="button"
                      aria-expanded="false"
                      aria-controls="mapped-category"
                    >
                      Mapped Category
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="mapped-category"
                    >
                      <div className="div-cntr">
                        <label>Brand</label>
                        <select>
                          <option>Bata, PVR</option>
                          <option>Bata, PVR</option>
                          <option>Bata, PVR</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Categories</label>
                        <select>
                          <option>Compliant</option>
                          <option>Compliant</option>
                          <option>Compliant</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Sub Categories</label>
                        <select>
                          <option>Payments</option>
                          <option>Payments</option>
                          <option>Payments</option>
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Issue Type</label>
                        <select>
                          <option>Not Processed</option>
                          <option>Not Processed</option>
                          <option>Not Processed</option>
                        </select>
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>CRM Role</label>
                          <select>
                            <option>Manager</option>
                            <option>Manager</option>
                            <option>Manager</option>
                          </select>
                        </div>
                        <div className="div-cntr escalation-options">
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="copy-esc"
                              name="esc-options"
                            />
                            <label htmlFor="copy-esc">Copy Escalation</label>
                          </div>
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="assign-esc"
                              name="esc-options"
                            />
                            <label htmlFor="assign-esc">
                              Assign Escalation
                            </label>
                          </div>
                          <div className="sup-agent-cntr">
                            <div className="status-options">
                              <input
                                type="radio"
                                name="supervisor-agent"
                                id="supervisor"
                              />
                              <label
                                htmlFor="supervisor"
                                className="logout-label"
                              >
                                Supervisor
                              </label>
                            </div>
                            <div className="status-options">
                              <input
                                type="radio"
                                name="supervisor-agent"
                                id="agent"
                              />
                              <label htmlFor="agent" className="logout-label">
                                Agent
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="div-cntr">
                          <label>Select Agent</label>
                          <select>
                            <option>Amit</option>
                            <option>Amit</option>
                            <option>Amit</option>
                          </select>
                        </div>
                        <div className="div-cntr">
                          <label>Status</label>
                          <select>
                            <option>Inactive</option>
                            <option>Inactive</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button className="butn">ADD</button>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Users;
