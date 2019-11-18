import React, { Component, Fragment } from "react";
// import UploadIcon from './../../assets/Images/clip.png';
// import CrossIcon from './../../assets/Images/cross-icon.png';
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from "./../../store/Hashtag.js";
import { Link } from "react-router-dom";
import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/Info-black.png";
import { Popover } from "antd";
import BlackDeleteIcon from "./../../assets/Images/del-big.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";

class QaCrmRoles extends Component {
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
    const dataQaCrmRole = [
      {
        id: "D1",

        staQa: "Active"
      },
      {
        id: "D2",
        rolName: (
          <span>
            <label>Quality Lead</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </span>
        ),
        staQa: "Inactive"
      }
    ];

    const columnsQaCrmRole = [
      {
        Header: (
          <span>
            Role Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "rolName",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                <label>Team Manager</label>
                <Popover content={QaCrmRolName} placement="bottom">
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover>
              </span>
            </div>
          );
        }
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creBy",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                <label>Admin</label>
                <Popover content={QaCrmAdmin} placement="bottom">
                  <img
                    className="info-icon"
                    src={InfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover>
              </span>
            </div>
          );
        }
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "staQa"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actiondept",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <Popover content={QaCrmDelete} placement="bottom">
                <img
                  src={DeleteIcon}
                  alt="del-icon"
                  id={ids}
                  className="downloadaction"
                />
              </Popover>
              <Popover content={QaCrmEdit} placement="bottom">
                <button className="react-tabel-button" id={ids}>
                  <label className="Table-action-edit-button-text">EDIT</label>
                </button>
              </Popover>
            </div>
          );
        }
      }
    ];

    const QaCrmRolName = (
      <div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Dashboard</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Tasks</p>
          <label className="pop-over-lbl-text-pop">Disable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Claim</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Notification</p>
          <label className="pop-over-lbl-text-pop">Disable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Settings</p>
          <label className="pop-over-lbl-text-pop">Disable</label>
        </div>

        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Reports</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
      </div>
    );

    const QaCrmDelete = (
      <div className="d-flex">
        <div className="del-big-icon">
          <img src={BlackDeleteIcon} alt="del-icon" />
        </div>
        <div>
          <p className="font-weight-bold blak-clr">Delete file?</p>
          <p className="mt-1 fs-12">
            Are you sure you want to delete this file?
          </p>
          <div className="del-can">
            <a href={Demo.BLANK_LINK}>CANCEL</a>
            <button className="butn">Delete</button>
          </div>
        </div>
      </div>
    );

    const QaCrmAdmin = (
      <div className="general-popover created-popover">
        <div>
          <p className="title">Created By: Admin</p>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <p className="title">Updated By: Manager</p>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </div>
    );

    const QaCrmEdit = (
      <div>
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
                <label
                  htmlFor="Dashboard-p-1"
                  className="cr cr-float-auto"
                ></label>
              </div>
            </div>
            <div className="crm-margin-div crm-padding-div">
              <div className="switch switch-primary d-inline m-r-10">
                <label className="storeRole-name-text">My Tickets</label>
                <input type="checkbox" id="Tasks-p-2" />
                <label htmlFor="Tasks-p-2" className="cr cr-float-auto"></label>
              </div>
            </div>
            <div className="crm-margin-div crm-padding-div">
              <div className="switch switch-primary d-inline m-r-10">
                <label className="storeRole-name-text">Ticket Audit Page</label>
                <input type="checkbox" id="Claim-p-3" />
                <label htmlFor="Claim-p-3" className="cr cr-float-auto"></label>
              </div>
            </div>
            <div className="crm-margin-div crm-padding-div">
              <div className="switch switch-primary d-inline m-r-10">
                <label className="storeRole-name-text">Notification</label>
                <input type="checkbox" id="Notification-p-5" />
                <label
                  htmlFor="Notification-p-5"
                  className="cr cr-float-auto"
                ></label>
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
                <label className="storeRole-name-text">Knowledge Base</label>
                <input type="checkbox" id="Reports-p-6" />
                <label
                  htmlFor="Reports-p-6"
                  className="cr cr-float-auto"
                ></label>
              </div>
            </div>
            <div className="dropDrownSpace">
              <label className="reports-to">Status</label>
              <select id="inputState" className="form-control dropdown-setting">
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
      </div>
    );
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            CRM Roles
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height qacrmroles">
                  <ReactTable
                    data={dataQaCrmRole}
                    columns={columnsQaCrmRole}
                    // resizable={false}
                    defaultPageSize={3}
                    showPagination={false}
                  />
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
                        <label
                          htmlFor="Dashboard-p-1"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">
                          My Tickets
                        </label>
                        <input type="checkbox" id="Tasks-p-2" />
                        <label
                          htmlFor="Tasks-p-2"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">
                          Ticket Audit Page
                        </label>
                        <input type="checkbox" id="Claim-p-3" />
                        <label
                          htmlFor="Claim-p-3"
                          className="cr cr-float-auto"
                        ></label>
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
                        <label className="storeRole-name-text">
                          Knowledge Base
                        </label>
                        <input type="checkbox" id="Reports-p-6" />
                        <label
                          htmlFor="Reports-p-6"
                          className="cr cr-float-auto"
                        ></label>
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
      </Fragment>
    );
  }
}

export default QaCrmRoles;
