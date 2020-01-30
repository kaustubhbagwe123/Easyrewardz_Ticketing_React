import React, { Component } from "react";
import Demo from "./../../../store/Hashtag.js";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";

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
    const dataTickUser = [
      {
        id: "U1",
        UserName: <span>Ajay Hattar</span>
      },
      {
        id: "U2",
        UserName: <span>Taran Singh</span>
      },
      {
        id: "U3",
        UserName: <span>Sarthak Gupta</span>
      },
      {
        id: "U4",
        UserName: <span>Shubham Gulati</span>
      },
      {
        id: "U5",
        UserName: <span>Nidhi Jain</span>
      }
    ];

    const columnsTickUser = [
      {
        Header: (
          <span>
            User Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "UserName"
      },
      {
        Header: (
          <span>
            Mobile No.
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Number",
        Cell: row => <span>983848448</span>
      },
      {
        Header: (
          <span>
            Email ID
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "email",
        Cell: row => <span>something@email.com</span>
      },
      {
        Header: (
          <span>
            Designation
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Desig",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Manager
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
                  <button className="react-tabel-button editre" id="p-edit-pop-2">
                    EDIT
                    {/* <label className="Table-action-edit-button-text">
                      EDIT
                    </label> */}
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
      <div className="edtpadding EditButtonUSer">
        <div className="">
          <label className="popover-header-text">EDIT USER</label>
        </div>

        <div className="right-sect-div right-sect-collapse">
          <div className="collapse-cntr">
            <div className="pop-over-div">
              <a
                className="collapse-title mx-0"
                data-toggle="collapse"
                href="#personal-detailsNew"
                role="button"
                aria-expanded="true"
                aria-controls="personal-detailsNew"
              >
                Personal Details
              </a>
            </div>
            <div className="multi-collapse show" id="personal-detailsNew">
              <div className="pop-over-div">
                <label className="edit-label-1">User Name</label>
                <input type="text" className="txt-edit-popover" defaultValue="Ajay" maxLength={25} />
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Mobile Number</label>
                <input type="text" className="txt-edit-popover" defaultValue="9876543210" maxLength={10} />
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Email ID</label>
                <input type="text" className="txt-edit-popover" defaultValue="something@email.com" maxLength={100} />
              </div>
              <div className="pop-over-div">
                <button
                  data-target="#profile-detailsNEW1"
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
              className="collapse-title mx-0"
              data-toggle="collapse"
              href="#profile-detailsNEW1"
              role="button"
              aria-expanded="false"
              aria-controls="profile-detailsNEW1"
            >
              Profile Details
                    </a>
            <div
              className="collapse multi-collapse"
              id="profile-detailsNEW1"
            >
              <div className="pop-over-div">
                <label className="edit-label-1">User Designation</label>
                <select className="txt-edit-popover">
                  <option>Manager</option>
                  <option>Manager</option>
                  <option>Manager</option>
                </select>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Reportee Designation</label>
                <select className="txt-edit-popover">
                  <option>HOD</option>
                  <option>HOD</option>
                  <option>HOD</option>
                </select>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Report To</label>
                <select className="txt-edit-popover">
                  <option>HOD</option>
                  <option>HOD</option>
                  <option>HOD</option>
                </select>
              </div>
              <div className="pop-over-div">
                <button
                  data-target="#mapped-categoryNew"
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
              className="collapse-title mx-0"
              data-toggle="collapse"
              href="#mapped-categoryNew"
              role="button"
              aria-expanded="false"
              aria-controls="mapped-categoryNew"
            >
              Mapped Category
                    </a>
            <div
              className="collapse multi-collapse"
              id="mapped-categoryNew"
            >
              <div className="pop-over-div">
                <label className="edit-label-1">Brand</label>
                <select className="txt-edit-popover">
                  <option>Bata, PVR</option>
                  <option>Bata, PVR</option>
                  <option>Bata, PVR</option>
                </select>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Categories</label>
                <select className="txt-edit-popover">
                  <option>Compliant</option>
                  <option>Compliant</option>
                  <option>Compliant</option>
                </select>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Sub Categories</label>
                <select className="txt-edit-popover">
                  <option>Payments</option>
                  <option>Payments</option>
                  <option>Payments</option>
                </select>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Issue Type</label>
                <select className="txt-edit-popover">
                  <option>Not Processed</option>
                  <option>Not Processed</option>
                  <option>Not Processed</option>
                </select>
              </div>
              <div className="mapped-cate-extra">
                <div className="pop-over-div">
                  <label className="edit-label-1">CRM Role</label>
                  <select className="txt-edit-popover">
                    <option>Manager</option>
                    <option>Manager</option>
                    <option>Manager</option>
                  </select>
                </div>
                <div className="pop-over-div escalation-options">
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      id="copy-esc1"
                      name="esc-options"
                    />
                    <label htmlFor="copy-esc1">Copy Escalation</label>
                  </div>
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      id="assign-esc1"
                      name="esc-options"
                    />
                    <label htmlFor="assign-esc1">
                      Assign Escalation
                            </label>
                  </div>
                  <div className="sup-agent-cntr">
                    <div className="status-options">
                      <input
                        type="radio"
                        name="supervisor-agent"
                        id="supervisor1"
                      />
                      <label
                        htmlFor="supervisor1"
                        className="logout-label"
                      >
                        Supervisor
                              </label>
                    </div>
                    <div className="status-options">
                      <input
                        type="radio"
                        name="supervisor-agent"
                        id="agent1"
                      />
                      <label htmlFor="agent1" className="logout-label">
                        Agent
                              </label>
                    </div>
                  </div>
                </div>
                <div className="pop-over-div">
                  <label className="edit-label-1">Select Agent</label>
                  <select className="txt-edit-popover">
                    <option>Amit</option>
                    <option>Amit</option>
                    <option>Amit</option>
                  </select>
                </div>
                <div className="pop-over-div">
                  <label className="edit-label-1">Status</label>
                  <select className="txt-edit-popover">
                    <option>Inactive</option>
                    <option>Inactive</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="pop-over-div">
                <button className="butn">ADD</button>
              </div>
            </div>
          </div>
        </div>


        <br />
        <div>
          <a className="pop-over-cancle" href={Demo.BLANK_LINK}>CANCEL</a>
          {/* <label className="pop-over-cancle">CANCEL</label> */}
          <button className="pop-over-button">
            SAVE
          </button>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Users
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketUserReact">
                  <ReactTable
                    data={dataTickUser}
                    columns={columnsTickUser}
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
                        <input type="text" defaultValue="Ajay" maxLength={25} />
                      </div>
                      <div className="div-cntr">
                        <label>Mobile Number</label>
                        <input type="text" defaultValue="9876543210" maxLength={10} />
                      </div>
                      <div className="div-cntr">
                        <label>Email ID</label>
                        <input type="text" defaultValue="something@email.com" maxLength={100} />
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
