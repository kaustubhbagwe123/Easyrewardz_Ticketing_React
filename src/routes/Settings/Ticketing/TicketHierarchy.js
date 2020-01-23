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
import config from "../../../helpers/config";
import axios from "axios";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import ActiveStatus from "../../activeStatus";

class TicketHierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      designation_name: "",
      selectReportTo: 0,
      selectStatus: 0,
      hierarchyData: [],
      reportToData: [],
      activeData: ActiveStatus(),
      hierarchyEditData: {}
    };
    this.handleGetHierarchyData = this.handleGetHierarchyData.bind(this);
    this.hanldeGetReportListDropDown = this.hanldeGetReportListDropDown.bind(
      this
    );
  }
  componentDidMount() {
    this.handleGetHierarchyData();
    this.hanldeGetReportListDropDown();
  }
  hanldeGetReportListDropDown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          reportToData: data
        });
      } else {
        self.setState({
          reportToData: []
        });
      }
    });
  }
  handleGetHierarchyData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/ListHierarchy",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          hierarchyData: data
        });
      } else {
        self.setState({
          hierarchyData: []
        });
      }
    });
  }
  handleSubmitData() {
    debugger;
    let self = this;
    var activeStatus = 0;
    var status = this.state.selectStatus;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationName: this.state.designation_name.trim(),
        ReportToDesignation: this.state.selectReportTo,
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetHierarchyData();
        NotificationManager.success("Hierarchy added successfully.");
        self.setState({
          designation_name: "",
          selectReportTo: 0,
          selectedStatus: 1
        });
      }
    });
  }
  handleDeleteHierarchy(hierarchy_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID: hierarchy_Id,
        Deleteflag: 1
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetHierarchyData();
        NotificationManager.success("Designation delete successfully.");
      }
    });
  }
  handleUpdateHierarchyData(hierarchy_Id){
    debugger
    let self = this;
    var activeStatus = 0;
    var status = this.state.hierarchyEditData.designation_status;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID:hierarchy_Id,
        DesignationName: this.state.hierarchyEditData.designation_Name.trim(),
        ReportToDesignation: this.state.hierarchyEditData.report_To,
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetHierarchyData();
        NotificationManager.success("Hierarchy update successfully.");
        self.setState({
          designation_Name: "",
          report_To: 0,
          designation_status: 1
        });
      }
    });
  }
  handleGetEditData(data) {
    debugger;
    var hierarchyEditData = data;
    hierarchyEditData.designation_Name = hierarchyEditData.designationName;
    hierarchyEditData.report_To = hierarchyEditData.reportToDesignation;
    hierarchyEditData.designation_status = hierarchyEditData.status;

    this.setState({
      hierarchyEditData
    });
  }
  handleOnReportToChange = e => {
    let value = e.target.value;
    this.setState({ selectReportTo: value });
  };
  handleStatusChange = e => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };
  handleOnChangeData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.hierarchyEditData;
    data[name] = value;

    this.setState({
      EditTemp: data
    });
  };
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
  handleOnChangeHierarchyData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { hierarchyData } = this.state;

    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path active">
            Hierarchy
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr tickhierpad">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketHierarchyReact">
                  <ReactTable
                    data={hierarchyData}
                    columns={[
                      {
                        Header: (
                          <span>
                            Designation
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "designationName"
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
                        accessor: "createdbyperson",
                        Cell: row => {
                          var ids = row.original["designationID"];
                          return (
                            <div>
                              <span>
                                Admin
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By:&nbsp;
                                            {row.original["createdbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date:&nbsp;
                                          {row.original["createdateformat"]}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:&nbsp;
                                            {row.original["updatedbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:&nbsp;
                                          {row.original["updateddateformat"]}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon-cp"
                                    src={BlackInfoIcon}
                                    alt="info-icon"
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
                          var ids = row.original["designationID"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div className="d-flex general-popover popover-body">
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          Delete file?
                                        </p>
                                        <p className="mt-1 fs-12">
                                          Are you sure you want to delete this
                                          file?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                                          <button
                                            className="butn"
                                            type="button"
                                            onClick={this.handleDeleteHierarchy.bind(
                                              this,
                                              ids
                                            )}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <img
                                    src={RedDeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                  />
                                </Popover>
                                <Popover
                                  content={
                                    <div className="edtpadding">
                                      <label className="popover-header-text">
                                        EDIT HIERARCHY
                                      </label>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Designation Name
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Designation Name"
                                          maxLength={25}
                                          name="designation_Name"
                                          value={
                                            this.state.hierarchyEditData
                                              .designation_Name
                                          }
                                          onChange={this.handleOnChangeData}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Report To
                                        </label>
                                        <select
                                          className="edit-dropDwon dropdown-setting"
                                          name="report_To"
                                          value={
                                            this.state.hierarchyEditData
                                              .report_To
                                          }
                                          onChange={this.handleOnChangeData}
                                        >
                                          <option>select</option>
                                          <option value={0}>Root</option>
                                          {this.state.reportToData !== null &&
                                            this.state.reportToData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.designationID}
                                                >
                                                  {item.designationName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Status
                                        </label>
                                        <select
                                          className="edit-dropDwon dropdown-setting"
                                          name="designation_status"
                                          value={
                                            this.state.hierarchyEditData
                                              .designation_status
                                          }
                                          onChange={this.handleOnChangeData}
                                        >
                                          <option>select</option>
                                          {this.state.activeData !== null &&
                                            this.state.activeData.map(
                                              (item, j) => (
                                                <option
                                                  key={j}
                                                  value={item.ActiveID}
                                                >
                                                  {item.ActiveName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <br />
                                      <div>
                                        <a
                                          className="pop-over-cancle"
                                          href={Demo.BLANK_LINK}
                                        >
                                          CANCEL
                                        </a>
                                        <button
                                          className="pop-over-button"
                                          type="button"
                                          onClick={this.handleUpdateHierarchyData.bind(
                                            this,
                                            ids
                                          )}
                                        >
                                          SAVE
                                        </button>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <button
                                    className="react-tabel-button"
                                    type="button"
                                    onClick={this.handleGetEditData.bind(
                                      this,
                                      row.original
                                    )}
                                  >
                                    EDIT
                                  </button>
                                </Popover>
                              </span>
                            </>
                          );
                        }
                      }
                    ]}
                    // resizable={false}
                    minRows={1}
                    defaultPageSize={10}
                    showPagination={true}
                  />
                  {/* <div className="position-relative">
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
                  </div> */}
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
                        name="designation_name"
                        value={this.state.designation_name}
                        onChange={this.handleOnChangeHierarchyData}
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Reports To</label>
                        <select
                          className="form-control dropdown-setting"
                          value={this.state.selectReportTo}
                          onChange={this.handleOnReportToChange}
                        >
                          <option>select</option>
                          <option value={0}>Root</option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                      >
                        <option>select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
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
