import React, { Component } from "react";
import Demo from "../../../store/Hashtag";
import ReactTable from "react-table";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import FileUpload from "./../../../assets/Images/file.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover } from "antd";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";

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
    const dataTickHier = [
      {
        id: "H1",
        Desig: <span>HOD</span>,
        Report: <span>Root</span>,
        status: <span>Active</span>
      },
      {
        id: "H2",
        Desig: <span>Manager</span>,
        Report: <span>HOD</span>,
        status: <span>Inactive</span>
      },
      {
        id: "H3",
        Desig: <span>Team Leader</span>,
        Report: <span>Manager</span>,
        status: <span>Active</span>
      },
      {
        id: "H4",
        Desig: <span>Supervisor</span>,
        Report: <span>Team Leader</span>,
        status: <span>Inactive</span>
      },
      {
        id: "H5",
        Desig: <span>Executive</span>,
        Report: <span>Supervisor</span>,
        status: <span>Active</span>
      }
    ];

    const columnsTickHier = [
      {
        Header: (
          <span>
            Designation
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Desig"
      },
      {
        Header: (
          <span>
            Report To
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Report"
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creat",
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
          <label className="popover-header-text">CREATE HIERARCHY</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Designation Name</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Designation Name"
          />
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Report To</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
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
                <div className="table-cntr table-height TicketHierarchyReact">
                  <ReactTable
                    data={dataTickHier}
                    columns={columnsTickHier}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                  />
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
