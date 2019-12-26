import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Demo from "./../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";

class TicketCRMRole extends Component {
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
    const popoverRoleName = (
      <div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Dashboard</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Tickets</p>
          <label className="pop-over-lbl-text-pop">Disable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">knowledge Base</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Settings</p>
          <label className="pop-over-lbl-text-pop">Disable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Chat</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Notification</p>
          <label className="pop-over-lbl-text-pop">Disable</label>
        </div>
        <div className="rvmmargin">
          <p className="rolle-name-text-popover">Reports</p>
          <label className="pop-over-lbl-text-pop">Enable</label>
        </div>
      </div>
    );

    const dataTickCrmRole = [
      {
        id: "Cr1",
        roleName: (
          <div>
            <span>
              HOD
              <Popover content={popoverRoleName} placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                />
              </Popover>
            </span>
          </div>
        ),
        status: <span>Active</span>
      },
      {
        id: "Cr2",
        roleName: (
          <div>
            <span>
              Manager
              <Popover content={popoverRoleName} placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                />
              </Popover>
            </span>
          </div>
        ),
        status: <span>Inactive</span>
      },
      {
        id: "Cr3",
        roleName: (
          <div>
            <span>
              Team Leader
              <Popover content={popoverRoleName} placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                />
              </Popover>
            </span>
          </div>
        ),
        status: <span>Active</span>
      },
      {
        id: "Cr4",
        roleName: (
          <div>
            <span>
              Supervisor
              <Popover content={popoverRoleName} placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                />
              </Popover>
            </span>
          </div>
        ),
        status: <span>Inactive</span>
      },
      {
        id: "Cr5",
        roleName: (
          <div>
            <span>
              Executive
              <Popover content={popoverRoleName} placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                />
              </Popover>
            </span>
          </div>
        ),
        status: <span>Active</span>
      }
    ];

    const columnsTickCrmRole = [
      {
        Header: (
          <span>
            Role Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "roleName"
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "CretedBy",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Admin
                <Popover content={popoverData} placement="bottom">
                  <img
                    className="info-icon-cp"
                    src={BlackInfoIcon}
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
        accessor: "status"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actiondept",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                <Popover
                  content={ActionDelete}
                  placement="bottom"
                  trigger="click"
                >
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover
                  content={ActionEditBtn}
                  placement="bottom"
                  trigger="click"
                >
                  <button className="react-tabel-button" id="p-edit-pop-2">
                    <label className="Table-action-edit-button-text">
                      EDIT
                    </label>
                  </button>
                </Popover>
              </span>
            </>
          );
        }
      }
    ];

    const popoverData = (
      <>
        <div>
          <b>
            <p className="title">Created By: Admin</p>
          </b>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: Manager</p>
          </b>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </>
    );
    const ActionDelete = (
      <div className="d-flex general-popover popover-body">
        <div className="del-big-icon">
          <img src={DelBigIcon} alt="del-icon" />
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
    const ActionEditBtn = (
      <div className="edtpadding">
        <div className="">
          <label className="popover-header-text">EDIT CRM ROLE</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Role Name</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Role Name"
          />
        </div>

        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Dashboard</label>
            <input type="checkbox" id="Dashboard-po-1" />
            <label
              htmlFor="Dashboard-po-1"
              className="cr cr-float-auto"
            ></label>
          </div>
        </div>
        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Tickets</label>
            <input type="checkbox" id="Tickets-po-2" />
            <label htmlFor="Tickets-po-2" className="cr cr-float-auto"></label>
          </div>
        </div>
        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Knowledge Base</label>
            <input type="checkbox" id="Knowledge-po-3" />
            <label
              htmlFor="Knowledge-po-3"
              className="cr cr-float-auto"
            ></label>
          </div>
        </div>
        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Settings</label>
            <input type="checkbox" id="Claim-po-3" />
            <label htmlFor="Claim-po-3" className="cr cr-float-auto"></label>
          </div>
        </div>
        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Chat</label>
            <input type="checkbox" id="Chat-po-5" />
            <label htmlFor="Chat-po-5" className="cr cr-float-auto"></label>
          </div>
        </div>
        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Notification</label>
            <input type="checkbox" id="Notification-po-4" />
            <label
              htmlFor="Notification-po-4"
              className="cr cr-float-auto"
            ></label>
          </div>
        </div>

        <div className="crm-margin-div">
          <div className="switch switch-primary d-inline m-r-10">
            <label className="storeRole-name-text">Reports</label>
            <input type="checkbox" id="Reports-po-6" />
            <label htmlFor="Reports-po-6" className="cr cr-float-auto"></label>
          </div>
        </div>

        <div className="pop-over-div">
          <label className="edit-label-1">Status</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Status</option>
            <option>Inactive</option>
          </select>
        </div>
        <br />
        <div>
          <label className="pop-over-cancle">CANCEL</label>
          <button className="pop-over-button">
            <label className="pop-over-btnsave-text">SAVE</label>
          </button>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
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
                <div className="table-cntr table-height TicketCrmRoleReact">
                  <ReactTable
                    data={dataTickCrmRole}
                    columns={columnsTickCrmRole}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={false}
                  />
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
                        <label
                          htmlFor="Dashboard-p-1"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Tickets</label>
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
                          Knowledge Base
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
                        <label
                          htmlFor="Settings-p-5"
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
                        <label className="storeRole-name-text">Reports</label>
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
      </React.Fragment>
    );
  }
}

export default TicketCRMRole;
