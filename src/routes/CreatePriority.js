import React, { Component, useState } from "react";
//import React, { Component, } from "react";
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
import Modal from "react-bootstrap/Modal";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "pointer" };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

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
      selectedActiveStatus: 0,
      loading: false,
      priorityNameCompulsion: "",
      statusCompulsion: "",
      editpriorityNameCompulsion: "Please enter priority name.",
      editstatusCompulsion: "Please select status.",
      updatedPriorityName: "",
      updatedStatus: "",
      rowData: {},
      editmodel: false,
      editSaveLoading: false
    };
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
  }
  components = {
    body: {
      row: DragableBodyRow
    }
  };
  componentDidMount() {
    this.handleGetPriorityList();
  }

  ////move row info
  moveRow = (dragIndex, hoverIndex) => {
    const { priorityData } = this.state;
    const dragRow = priorityData[dragIndex];

    var paramData = {};
    paramData.selectedPriorityID = dragRow.priorityID;
    paramData.currentPriorityID = this.state.priorityData[
      hoverIndex
    ].priorityID;
    this.setState(
      update(this.state, {
        priorityData: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow]
          ]
        }
      })
    );
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/UpdatePriorityOrder",
      headers: authHeader(),
      params: paramData
    })
      .then(function(res) {
        debugger;

        if (res.data.responseData) {
          self.handleGetPriorityList();
        } else {
          NotificationManager.error("Sorry we don't sort row of list");
        }
      })
      .catch(data => {
        console.log(data);
      });
  };
  handleGetPriorityList() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/PriorityList",
      headers: authHeader(),
      params: {
        PriorityFor: 1
      }
    })
      .then(function(res) {
        debugger;

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data !== undefined) {
          data.map(row => {
            row["isPopoverOpen"] = false;
          });
          self.setState({
            priorityData: data,
            loading: false
          });
        } else {
          self.setState({
            priorityData: [],
            loading: false
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleSubmitData() {
    if (
      this.state.priority_name.length > 0 &&
      this.state.selectedActiveStatus.length > 0
    ) {
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
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetPriorityList();
            NotificationManager.success(
              "Priority Added successfully.",
              "",
              2000
            );
            self.setState({
              priority_name: "",
              selectedActiveStatus: 0
            });
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        priorityNameCompulsion: "Please Enter Priority Name",
        statusCompulsion: "Please Select Status"
      });
    }
  }
  handleDeleteData(priority_ID) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/DeletePriority",
      headers: authHeader(),
      params: {
        PriorityID: priority_ID
      }
    })
      .then(function(res) {
        let status = res.data.statusCode;
        if (status === 1010) {
          self.handleGetPriorityList();
          NotificationManager.success(
            "Priority delete successfully.",
            "",
            2000
          );
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleUpdateData() {
    debugger;
    if (this.state.rowData.priortyName.length > 0) {
      let self = this;
      var activeStatus = 0;

      if (this.state.rowData.isActive === true) {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      this.setState({ editSaveLoading: true });

      axios({
        method: "post",
        url: config.apiUrl + "/Priority/UpdatePriority",
        headers: authHeader(),
        params: {
          PriorityID: this.state.rowData.priorityID,
          PriorityName: this.state.rowData.priortyName.trim(),
          status: activeStatus
        }
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({ editSaveLoading: false, editmodel: false });
            self.handleGetPriorityList();
            NotificationManager.success(
              "Priority updated successfully.",
              "",
              2000
            );
            self.setState({
              rowData: {},
              priority_name: "",
              selectedActiveStatus: 0
            });
          }
        })
        .catch(data => {
          self.setState({ editSaveLoading: false, editmodel: false });
          console.log(data);
        });
    } else {
      NotificationManager.error("Priority not updated.");
      this.setState({
        editpriorityNameCompulsion: "Please enter priority name",
        editstatusCompulsion: "Please select status"
      });
    }
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
    var finalData = e;
    finalData.name = finalData.priortyName;
    finalData.status = finalData.priortyStatus;

    this.setState({ finalData });
  }

  handleOpenEditModal(Data, e) {
    debugger;
    var rowData = {};
    rowData.priorityID = Data.priorityID;
    rowData.priortyName = Data.priortyName;
    rowData.isActive = Data.isActive;
    this.setState({ editmodel: true, rowData });
  }
  toggleEditModal() {
    this.setState({ editmodel: false });
  }

  handelEditChange(e) {
    debugger;
    const { name, value } = e.target;
    var rowData = this.state.rowData;
    rowData[name] = value;
    this.setState({ rowData });
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
          <Link to="settings" className="header-path">
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
                {/* {this.state.loading === true ? (
                  <div className="loader-icon"></div>
                ) : ( */}
                <div className="table-cntr table-height table-priority">
                  <DndProvider backend={HTML5Backend}>
                    <Table
                      className={
                        (this.state.dragIndex >= 0 && "dragging-container") ||
                        ""
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
                            //
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
                                {record.isPopoverOpen}
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

                                <button
                                  className="react-tabel-button editre"
                                  onClick={this.handleOpenEditModal.bind(
                                    this,
                                    record
                                  )}
                                >
                                  EDIT
                                </button>
                              </span>
                            );
                          }
                        }
                      ]}
                      loading={this.state.loading}
                      noDataContent="No Record Found"
                      pagination={true}
                      dataSource={this.state.priorityData}
                      components={this.components}
                      onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow
                      })}
                    />
                  </DndProvider>
                </div>
                {/* // )} */}
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
                      {this.state.priority_name.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.priorityNameCompulsion}
                        </p>
                      )}
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
                      {this.state.selectedActiveStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
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
        <Modal
          show={this.state.editmodel}
          onHide={this.toggleEditModal}
          Id="tampleteEditModal"
        >
          <div className="edtpadding">
            <label className="popover-header-text">EDIT PRORITY</label>
            <div className=" pop-over-div">
              <label className="pop-over-lbl-text">Priority Name</label>

              <input
                type="text"
                className="form-control dropdown-settings"
                placeholder="Enter Priority Name"
                maxLength={25}
                name="priortyName"
                value={this.state.rowData.priortyName}
                onChange={this.handelEditChange.bind(this)}
              />
              {this.state.rowData.priortyName === "" && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "0px"
                  }}
                >
                  {this.state.editpriorityNameCompulsion}
                </p>
              )}
            </div>
            <div className=" pop-over-div">
              <label className="pop-over-lbl-text">Status</label>
              <select
                className="form-control dropdown-setting"
                name="isActive"
                value={
                  this.state.rowData.isActive === true ? "Active" : "Inactive"
                }
                onChange={this.handelEditChange.bind(this)}
              >
                <option value="">select</option>
                {this.state.activeData !== null &&
                  this.state.activeData.map((item, j) => (
                    <option key={j} value={item.ActiveID}>
                      {item.ActiveName}
                    </option>
                  ))}
              </select>
              {this.state.rowData.isActive === "" && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "0px"
                  }}
                >
                  {this.state.editstatusCompulsion}
                </p>
              )}
            </div>
            <br />
            <div className="text-center">
              <a className="pop-over-cancle" onClick={this.toggleEditModal.bind(this)}>CANCEL</a>
              <button
                className="pop-over-button FlNone"
                disabled={this.state.editSaveLoading}
                onClick={this.handleUpdateData.bind(this)}
                type="submit"
              >
                {this.state.editSaveLoading ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : (
                  ""
                )}
                <label className="pop-over-btnsave-text">SAVE</label>
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreatePriority;
