import React, { Component } from "react";
// import TableArr from "./../assets/Images/table-arr.png";
import RedDeleteIcon from "./../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import Demo from "./../store/Hashtag";
import Braille from "./../assets/Images/braille.svg";
import { Table, Popover } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import config from "./../helpers/config";
import { Link } from "react-router-dom";
import { authHeader } from "../helpers/authHeader";
import activeStatus from "./activeStatus";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const closest = function(el, selector, rootNode) {
  rootNode = rootNode || document.body;
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    const flagRoot = el === rootNode;
    if (flagRoot || matchesSelector.call(el, selector)) {
      if (flagRoot) {
        el = null;
      }
      break;
    }
    el = el.parentElement;
  }
  el.setAttribute("style", "border: 50px solid red;");
  return el;
};

class CreatePriority extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleGetPriorityList = this.handleGetPriorityList.bind(this);
    this.state = {
      dragIndex: -1,
      draggedIndex: -1,
      activeData: activeStatus(),
      priorityData: [],
      updateDetails: {},
      finalData: {},
      priority_name: "",
      selectedActiveStatus: 0
    };
  }
  componentDidMount() {
    this.handleGetPriorityList();
  }
  handleGetPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          priorityData: data
        });
      } else {
        self.setState({
          priorityData: []
        });
      }
    });
  }
  handleSubmitData() {
    debugger;
    let self = this;
    var activeStatus = 0;
    var status = this.state.selectedActiveStatus;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/AddPriority",
      headers: authHeader(),
      params: {
        PriorityName: this.state.priority_name.trim(),
        status: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetPriorityList();
        NotificationManager.success("Priority Added successfully.");
        self.setState({
          priority_name: "",
          selectedActiveStatus: 0
        });
      }
    });
  }
  handleDeleteData(priority_ID) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/DeletePriority",
      headers: authHeader(),
      params: {
        PriorityID: priority_ID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetPriorityList();
        NotificationManager.success("Priority delete successfully.");
      }
    });
  }
  handleUpdateData(priority_ID) {
    debugger;
    let self = this;
    var activeStatus = 0;
    var status = this.state.finalData.status;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/UpdatePriority",
      headers: authHeader(),
      params: {
        PriorityID:priority_ID,
        PriorityName: this.state.finalData.name.trim(),
        status: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetPriorityList();
        NotificationManager.success("Priority updated successfully.");
        self.setState({
          priority_name: "",
          selectedActiveStatus: 0
        });
      }
    });
  }

  onMouseDown(e) {
    const target = this.getTrNode(e.target);
    if (target) {
      target.setAttribute("draggable", true);
      target.ondragstart = this.onDragStart;
      target.ondragend = this.onDragEnd;
    }
  }
  onDragStart(e) {
    const target = this.getTrNode(e.target);
    if (target) {
      e.dataTransfer.effectAllowed = "move";
      target.parentElement.ondragenter = this.onDragEnter;
      target.parentElement.ondragover = function(ev) {
        ev.preventDefault();
        return true;
      };
      const dragIndex = target.rowIndex - 1;
      this.setState({ dragIndex, draggedIndex: dragIndex });
    }
  }

  onDragEnter(e) {
    const target = this.getTrNode(e.target);
    this.setState({
      draggedIndex: target ? target.rowIndex - 1 : -1
    });
  }
  onDragEnd(e) {
    const target = this.getTrNode(e.target);
    if (target) {
      target.setAttribute("draggable", false);
      target.ondragstart = null;
      target.ondragend = null;
      target.parentElement.ondragenter = null;
      target.parentElement.ondragover = null;
      this.changeRowIndex();
    }
  }

  getTrNode(target) {
    return closest(target, "tr");
  }

  changeRowIndex() {
    const result = {};
    const currentState = this.state;
    result.dragIndex = result.draggedIndex = -1;
    if (
      currentState.dragIndex >= 0 &&
      currentState.dragIndex !== currentState.draggedIndex
    ) {
      const { dragIndex, draggedIndex, priorityData: oldData } = currentState;
      const data = [...oldData];
      const item = data.splice(dragIndex, 1)[0];
      data.splice(draggedIndex, 0, item);
      result.data = data;
      result.dragIndex = -1;
      result.draggedIndex = -1;
    }
    this.setState(result);
  }
  handleCreateOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnChangeData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.finalData;
    data[name] = value;

    this.setState({
      finalDatatemp: data
    });
  };
  handleActiveStatus = e => {
    let value = e.target.value;
    this.setState({ selectedActiveStatus: value });
  };
  handleroweditClick(e, data) {
    debugger;
    var finalData = e;
    finalData.name = finalData.priortyName;
    finalData.status = finalData.priortyStatus;

    this.setState({ finalData });
  }

  render() {
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Priority
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height table-priority">
                  <Table
                    className={
                      (this.state.dragIndex >= 0 && "dragging-container") || ""
                    }
                    // columns={this.state.columns}
                    columns={[
                      {
                        key: "data",
                        render: (text, record, index) => (
                          <span>
                            {(this.state.dragIndex >= 0 &&
                              this.state.dragIndex !==
                                this.state.draggedIndex &&
                              index === this.state.draggedIndex && (
                                <span
                                  className={`drag-target-line ${
                                    this.state.draggedIndex <
                                    this.state.dragIndex
                                      ? "drag-target-top"
                                      : ""
                                  }`}
                                />
                              )) ||
                              ""}
                            <a
                              className="drag-handle"
                              draggable="false"
                              onMouseDown={this.onMouseDown}
                              href="#!"
                            >
                              <img src={Braille} alt="braille-icon" />
                            </a>
                          </span>
                        )
                      },
                      {
                        title: "Priority Name",
                        dataIndex: "priortyName",
                        key: "priortyName",
                        filterMultiple: false,
                        onFilter: (value, record) =>
                          record.priortyName.indexOf(value) === 0,
                        sorter: (a, b) =>
                          a.priortyName.length - b.priortyName.length,
                        sortDirections: ["descend", "ascend"]
                      },
                      {
                        title: "Created By",
                        dataIndex: "createdByName",
                        key: "createdByName",
                        filterMultiple: false,
                        onFilter: (value, record) =>
                          record.createdByName.indexOf(value) === 0,
                        sorter: (a, b) =>
                          a.createdByName.length - b.createdByName.length,
                        sortDirections: ["descend", "ascend"],
                        render: (text, record) => {
                          debugger;
                          return (
                            <div>
                              <Popover
                                content={
                                  <div>
                                    <div>
                                      <b>
                                        <p className="title">
                                          Created By: {record.createdByName}
                                        </p>
                                      </b>
                                      <p className="sub-title">
                                        Created Date:{" "}
                                        {record.createdDateFormated}
                                      </p>
                                    </div>
                                    <div>
                                      <b>
                                        <p className="title">
                                          Updated By: {record.modifiedByName}
                                        </p>
                                      </b>
                                      <p className="sub-title">
                                        Updated Date:{" "}
                                        {record.modifiedDateFormated}
                                      </p>
                                    </div>
                                  </div>
                                }
                                placement="bottom"
                              >
                                {record.createdByName}
                                <img
                                  className="info-icon-cp"
                                  src={BlackInfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </div>
                          );
                        }
                      },
                      {
                        title: "Created Date",
                        dataIndex: "createdDateFormated",
                        key: "createdDateFormated",
                        onFilter: (value, record) =>
                          record.createdDateFormated.indexOf(value) === 0,
                        // defaultSortOrder: "descend",
                        filterMultiple: false,
                        sorter: (a, b) =>
                          a.createdDateFormated.length -
                          b.createdDateFormated.length,
                        sortDirections: ["descend", "ascend"]
                      },
                      {
                        title: "Status",
                        dataIndex: "priortyStatus",
                        key: "priortyStatus",
                        filterMultiple: false,
                        onFilter: (value, record) =>
                          record.priortyStatus.indexOf(value) === 0,
                        sorter: (a, b) =>
                          a.priortyStatus.length - b.priortyStatus.length,
                        sortDirections: ["descend", "ascend"]
                      },
                      {
                        title: "Action",
                        dataIndex: "priorityID",
                        key: "priorityID",
                        render: (text, record) => {
                          debugger;
                          return (
                            <span>
                              <Popover
                                content={
                                  <div>
                                    <div className="del-big-icon">
                                      <img
                                        src={BlackDeleteIcon}
                                        alt="del-icon"
                                      />
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
                                          onClick={this.handleDeleteData.bind(
                                            this,
                                            record.priorityID
                                          )}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                }
                                trigger="click"
                                placement="bottom"
                              >
                                <img
                                  src={RedDeleteIcon}
                                  alt="del-icon"
                                  className="del-btn"
                                />
                              </Popover>
                              <Popover
                                content={
                                  <div>
                                    <label className="popover-header-text">
                                      EDIT PRORITY
                                    </label>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Priority Name
                                      </label>
                                      <input
                                        type="text"
                                        className="pop-over-text"
                                        placeholder="Enter Priority Name"
                                        maxLength={25}
                                        name="name"
                                        value={this.state.finalData.name}
                                        onChange={this.handleOnChangeData}
                                      />
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select
                                        className="form-control dropdown-setting"
                                        name="status"
                                        value={this.state.finalData.status}
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
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button
                                        type="button"
                                        className="pop-over-button"
                                        onClick={this.handleUpdateData.bind(
                                          this,record.priorityID
                                        )}
                                      >
                                        SAVE
                                      </button>
                                    </div>
                                  </div>
                                }
                                trigger="click"
                                placement="bottom"
                              >
                                <button
                                  className="react-tabel-button"
                                  onClick={this.handleroweditClick.bind(
                                    this,
                                    record
                                  )}
                                >
                                  EDIT
                                </button>
                              </Popover>
                            </span>
                          );
                        }
                      }
                    ]}
                    pagination={true}
                    dataSource={this.state.priorityData}
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
                    <label className="create-department">CREATE PRORITY</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Priority Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Priority Name"
                        maxLength={25}
                        name="priority_name"
                        value={this.state.priority_name}
                        onChange={this.handleCreateOnChange}
                      />
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectedActiveStatus}
                        onChange={this.handleActiveStatus}
                      >
                        <option>select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, i) => (
                            <option key={i} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="CreateADDBtn addLable"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                        ADD
                      </button>
                    </div>
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

export default CreatePriority;
