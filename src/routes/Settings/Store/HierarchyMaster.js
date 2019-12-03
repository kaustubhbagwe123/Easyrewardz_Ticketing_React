
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

class HierarchyMaster extends Component {
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
          <Link to="#!">Store</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
            Hierarchy Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr hiermas">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height">
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
                            id="created1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created1"
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
                        <td>Store Executive</td>
                        <td>Store Manager</td>
                        <td>
                          Admin
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="created2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="created2"
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
                        <td>Inactive</td>
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
                <div className="right-sect-div">
                  <h3>Create Hierarchy</h3>
                  <div className="div-cntr">
                    <label>Designation Name</label>
                    <input type="text" defaultValue="Store Manager" />
                  </div>
                  <div className="div-cntr">
                    <label>Report To</label>
                    <select>
                      <option>Select</option>
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
                  <button className="butn">ADD</button>
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

export default HierarchyMaster;
