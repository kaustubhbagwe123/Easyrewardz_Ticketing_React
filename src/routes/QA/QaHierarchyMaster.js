import React, { Component, Fragment } from 'react';
import Demo from "../../store/Hashtag";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../assets/Images/del-big.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import DelBlack from "./../../assets/Images/del-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import FileUpload from "./../../assets/Images/file.png";
import DownExcel from "./../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/Info-black.png";
import { Popover } from "antd";
import BlackDeleteIcon from "./../../assets/Images/del-big.png";
import { CSVLink, CSVDownload } from "react-csv";
import config from "../../helpers/config";

class QaHierarchyMaster extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             fileName : "",
             Template:[]
        }
    }
    
    hide = () => {
      debugger;
      this.setState({
        visible: false,
      });
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
     const templateData = [
        ["Designation", "ReportTo","Status"],
        ["HOD", "Root","Active"],
        ["Manager", "HOD","Active"]           
      ];
        const dataQaHierarMas = [
            {
              id: "D1",
              desName: "Quality Manager",
              reportTo: "Root",
              staQa:"Active"
            },
            {
              id: "D2",
              desName: "Quality Lead",
              reportTo: "Store Manager",
              staQa:"Inactive"
            }
          ];
      
          const columnsQaHierarMas = [
            {
              Header: (
                <span>
                  Designation<FontAwesomeIcon icon={faCaretDown} />
                </span>
              ),
              accessor: "desName"
            },
            {
              Header: (
                <span>
                  Report To
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
              ),
              accessor: "reportTo"
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
                      <Popover content={QaHmAdmin} placement="bottom">
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
                    <Popover content={QaHmDelete} placement="bottom" trigger="click">
                      <img
                        src={DeleteIcon}
                        alt="del-icon"
                        id={ids}
                        className="downloadaction"
                      />
                    </Popover>
                    <Popover content={QaHmEdit} placement="bottom" trigger="click">
                      <button className="react-tabel-button editre" id={ids}>
                        EDIT
                      </button>
                    </Popover>
                  </div>
                );
              }
            }
          ];
      
          const QaHmDelete = (
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
       
          const QaHmAdmin = (
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

          const QaHmEdit = (
            <div className="edtpadding">
              <div className="d-flex">
                <div>
                  <div className="">
                    <label className="popover-header-text">EDIT USER</label>
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Designation Name</label>
                      <input
                        type="text"
                        className="txt-edit-popover"
                        placeholder="Enter Designation Name"
                        maxLength={25}
                      />
                  </div>

                  <div className="pop-over-div">
                    <label className="pop-over-lbl-text">Report To</label>
                    <select className="pop-over-select">
                      <option>HOD</option>
                      <option></option>
                    </select>
                  </div>

                  <div className="pop-over-div">
                    <label className="pop-over-lbl-text">Status</label>
                    <select className="pop-over-select">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <br />
                  <div>
                  <a className="pop-over-cancle" onClick={this.hide}>CANCEL11</a>
                    <button className="pop-over-button">
                        SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        return (
           <Fragment>
               
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path">QA</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path active">
            Hierarchy Master
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height QahierarReact">

                <ReactTable
                    data={dataQaHierarMas}
                    columns={columnsQaHierarMas}
                    // resizable={false}
                    defaultPageSize={3}
                    showPagination={false}
                  />
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
                        maxLength={25}
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
                        ADD
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
                        {/* <CSVLink
                                className=""
                                data={templateData}
                              >
                        <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
                     </CSVLink> */}
                     <CSVLink data={config.hierarchyTemplate}>
                       <img src={DownExcel} alt="download icon" />
                    </CSVLink>
                    
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
           </Fragment>
        )
    }
}

export default QaHierarchyMaster
