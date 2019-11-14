import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "./../../../store/Hashtag.js";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import InfoIcon from "./../../../assets/Images/Info-black.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { ProgressBar } from "react-bootstrap";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { Popover } from "antd";

class DepartmentMaster extends Component {
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
    const dataDeptMaster = [
      {
        id: "D1",
        brandName: "Bata",
        storeCode: "12345",
        deptName: "Admin",
        function: "Attendace",
        creatBy: (
          <span>
            <label>Admin</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </span>
        ),
        status: "Active"
      },
      {
        id: "D2",
        brandName: "Bata",
        storeCode: "12345",
        deptName: "HR",
        function: "Salary",
        creatBy: (
          <span>
            <label>Admin</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </span>
        ),
        status: "Inactive"
      }
    ];

    const columnsDeptMaster = [
      {
        Header: (
          <span>
            Brand Name <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "brandName"
      },
      {
        Header: (
          <span>
            Store Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "storeCode"
      },
      {
        Header: (
          <span>
            Department Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "deptName"
      },
      {
        Header: (
          <span>
            Function
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "function"
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creatBy"
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
            <div>
              <img src={DeleteIcon} alt="del-icon" className="downloadaction" />
              <Popover content={DepartEdit} placement="bottom">
                <button className="react-tabel-button" id={ids}>
                  <label className="Table-action-edit-button-text">EDIT</label>
                </button>
              </Popover>
            </div>
          );
        }
        //   Cell: props => (
        //     <span>
        //       <img src={DeleteIcon} alt="del-icon" className="downloadaction" />
        //       <button className="react-tabel-button" id="p-edit-pop-2">
        //         <label className="Table-action-edit-button-text">EDIT</label>
        //       </button>
        //     </span>
        //   )
      }
    ];
    const DepartEdit = (
      <div>
        <div className="right-sect-div right-sect-collapse editdeptpopover">
          <label className="popover-header-text">Edit Department</label>
          <div className="div-cntrdept">
            <label>Brand</label>
            <select>
              <option>Bata</option>
            </select>
          </div>
          <div className="div-cntrdept">
            <label>Store Code</label>
            <select>
              <option>Select</option>
            </select>
          </div>
          <div className="div-cntrdept">
            <label>Department</label>
            <select>
              <option>Admin</option>
            </select>
          </div>
          <div className="div-cntrdept">
            <label>Function</label>
            <input type="text" placeholder="Attendance" />
          </div>
          <div className="div-cntrdept">
            <label>Status</label>
            <select>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="delcan-btn">
          <a href={Demo.BLANK_LINK}>CANCEL</a>
          <button className="butn">Save</button>
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
            Department Master
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height deptMaster">
                  <ReactTable
                    data={dataDeptMaster}
                    columns={columnsDeptMaster}
                    // resizable={false}
                    defaultPageSize={2}
                    showPagination={false}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="right-sect-div right-sect-collapse">
                  <h3>CREATE DEPARTMENT</h3>
                  <div className="div-cntr">
                    <label>Brand</label>
                    <select>
                      <option>Bata</option>
                    </select>
                  </div>
                  <div className="div-cntr">
                    <label>Store Code</label>
                    <select>
                      <option>Select</option>
                    </select>
                  </div>
                  <div className="div-cntr">
                    <label>Department</label>
                    <select>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div className="div-cntr">
                    <label>Function</label>
                    <input type="text" placeholder="Attendance" />
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="btn-coll">
                    <button className="butn">ADD</button>
                  </div>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
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
      </Fragment>
    );
  }
}

export default DepartmentMaster;
