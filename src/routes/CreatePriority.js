import React, { Component } from "react";
// import TableArr from "./../assets/Images/table-arr.png";
import RedDeleteIcon from "./../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import Demo from "./../store/Hashtag";
import Braille from "./../assets/Images/braille.svg";
import { Table } from "antd";
import "antd/dist/antd.css";
import {Link} from 'react-router-dom';

const closest = function(el, selector, rootNode) {
  rootNode = rootNode || document.body;
  // console.log('rootNode:', rootNode);
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
    this.state = {
      data: [
        {
          priorityName: "High",
          content: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created1"
              />
            </span>
          ),
          key: "1",
          createdDate: "23-May-19",
          status: "Active",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="del1"
              />
              <button className="react-tabel-button" id="peditpop1">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          priorityName: "Medium",
          content: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created2"
              />
            </span>
          ),
          key: "2",
          createdDate: "23-May-19",
          status: "Inactive",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="del2"
              />
              <button className="react-tabel-button" id="p-edit-pop-2">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          priorityName: "Low",
          content: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created-3"
              />
            </span>
          ),
          key: "3",
          createdDate: "23-May-19",
          status: "Active",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="del3"
              />
              <button className="react-tabel-button" id="p-edit-pop-3">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          priorityName: "6",
          content: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created-4"
              />
            </span>
          ),
          key: "4",
          createdDate: "23-May-19",
          status: "Inactive",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="del4"
              />
              <button className="react-tabel-button" id="p-edit-pop-4">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        },
        {
          priorityName: "8",
          content: (
            <span>
              Admin
              <img
                className="info-icon-cp"
                src={BlackInfoIcon}
                alt="info-icon"
                id="created5"
              />
            </span>
          ),
          key: "5",
          createdDate: "23-May-19",
          status: "Active",
          action: (
            <span>
              <img
                src={RedDeleteIcon}
                alt="del-icon"
                className="del-btn"
                id="del5"
              />
              <button className="react-tabel-button" id="p-edit-pop-5">
                <label className="Table-action-edit-button-text">EDIT</label>
              </button>
            </span>
          )
        }
      ],
      dragIndex: -1,
      draggedIndex: -1
    };
    this.columns = [
      {
        // title: 'Created Date',
        key: "operate",
        render: (text, record, index) => (
          <span>
            {(this.state.dragIndex >= 0 &&
              this.state.dragIndex !== this.state.draggedIndex &&
              index === this.state.draggedIndex && (
                <span
                  className={`drag-target-line ${
                    this.state.draggedIndex < this.state.dragIndex
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
        dataIndex: "priorityName",
        key: "priorityName",
        filterMultiple: false,
        onFilter: (value, record) => record.priorityName.indexOf(value) === 0,
        sorter: (a, b) => a.priorityName.length - b.priorityName.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Created By",
        dataIndex: "content",
        key: "content",
        filterMultiple: false,
        onFilter: (value, record) => record.content.indexOf(value) === 0,
        sorter: (a, b) => a.content.length - b.content.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        key: "createdDate",
        sortDirections: ["descend", "ascend"],
        onFilter: (value, record) => record.createdDate.indexOf(value) === 0,
        // defaultSortOrder: "descend",
        sorter: (a, b) => a.createdDate.length - b.createdDate.length
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filterMultiple: false,
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      }
    ];
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
      const { dragIndex, draggedIndex, data: oldData } = currentState;
      const data = [...oldData];
      const item = data.splice(dragIndex, 1)[0];
      data.splice(draggedIndex, 0, item);
      result.data = data;
      result.dragIndex = -1;
      result.draggedIndex = -1;
    }
    this.setState(result);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK}>Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
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
                    columns={this.columns}
                    pagination={false}
                    dataSource={this.state.data}
                  />
                   
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="created1"
                    className="general-popover created-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="created2"
                    className="general-popover created-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="created-3"
                    className="general-popover created-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="created-4"
                    className="general-popover created-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="hover"
                    placement="bottom"
                    target="created5"
                    className="general-popover created-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody>
                      <div>
                        <p className="title">Created By: Admin</p>
                        <p className="sub-title">Created Date: 12 March 2018</p>
                      </div>
                      <div>
                        <p className="title">Updated By: Manager</p>
                        <p className="sub-title">Updated Date: 12 March 2018</p>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="auto"
                    target="peditpop1"
                    className="general-popover delete-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody className="d-flex">
                      <div>
                        <div className="">
                          <label className="popover-header-text">
                            EDIT PRORITY
                          </label>
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">
                            Priority Name
                          </label>
                          <input
                            type="text"
                            className="pop-over-text"
                            placeholder="High"
                          />
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">Status</label>
                          <select className="pop-over-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                        <br />
                        <div>
                          <label className="pop-over-cancle">CANCEL</label>
                          <button className="pop-over-button">
                            <label className="pop-over-btnsave-text">
                              SAVE
                            </label>
                          </button>
                        </div>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="auto"
                    target="p-edit-pop-2"
                    className="general-popover delete-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody className="d-flex">
                      <div>
                        <div className="">
                          <label className="popover-header-text">
                            EDIT PRORITY
                          </label>
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">
                            Priority Name
                          </label>
                          <input
                            type="text"
                            className="pop-over-text"
                            placeholder="High"
                          />
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">Status</label>
                          <select className="pop-over-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                        <br />
                        <div>
                          <label className="pop-over-cancle">CANCEL</label>
                          <button className="pop-over-button">
                            <label className="pop-over-btnsave-text">
                              SAVE
                            </label>
                          </button>
                        </div>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="auto"
                    target="p-edit-pop-3"
                    className="general-popover delete-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody className="d-flex">
                      <div>
                        <div className="">
                          <label className="popover-header-text">
                            EDIT PRORITY
                          </label>
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">
                            Priority Name
                          </label>
                          <input
                            type="text"
                            className="pop-over-text"
                            placeholder="High"
                          />
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">Status</label>
                          <select className="pop-over-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                        <br />
                        <div>
                          <label className="pop-over-cancle">CANCEL</label>
                          <button className="pop-over-button">
                            <label className="pop-over-btnsave-text">
                              SAVE
                            </label>
                          </button>
                        </div>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="auto"
                    target="p-edit-pop-4"
                    className="general-popover delete-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody className="d-flex">
                      <div>
                        <div className="">
                          <label className="popover-header-text">
                            EDIT PRORITY
                          </label>
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">
                            Priority Name
                          </label>
                          <input
                            type="text"
                            className="pop-over-text"
                            placeholder="High"
                          />
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">Status</label>
                          <select className="pop-over-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                        <br />
                        <div>
                          <label className="pop-over-cancle">CANCEL</label>
                          <button className="pop-over-button">
                            <label className="pop-over-btnsave-text">
                              SAVE
                            </label>
                          </button>
                        </div>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="auto"
                    target="p-edit-pop-5"
                    className="general-popover delete-popover"
                    // delay={tooltipDelay}
                  >
                    <PopoverBody className="d-flex">
                      <div>
                        <div className="">
                          <label className="popover-header-text">
                            EDIT PRORITY
                          </label>
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">
                            Priority Name
                          </label>
                          <input
                            type="text"
                            className="pop-over-text"
                            placeholder="High"
                          />
                        </div>
                        <div className=" pop-over-div">
                          <label className="pop-over-lbl-text">Status</label>
                          <select className="pop-over-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                        <br />
                        <div>
                          <label className="pop-over-cancle">CANCEL</label>
                          <button className="pop-over-button">
                            <label className="pop-over-btnsave-text">
                              SAVE
                            </label>
                          </button>
                        </div>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="del1"
                    className="general-popover delete-popover"
                  >
                    <PopoverBody className="d-flex">
                      <div className="del-big-icon">
                        <img src={BlackDeleteIcon} alt="del-icon" />
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
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="del2"
                    className="general-popover delete-popover"
                  >
                    <PopoverBody className="d-flex">
                      <div className="del-big-icon">
                        <img src={BlackDeleteIcon} alt="del-icon" />
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
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="del3"
                    className="general-popover delete-popover"
                  >
                    <PopoverBody className="d-flex">
                      <div className="del-big-icon">
                        <img src={BlackDeleteIcon} alt="del-icon" />
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
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="del4"
                    className="general-popover delete-popover"
                  >
                    <PopoverBody className="d-flex">
                      <div className="del-big-icon">
                        <img src={BlackDeleteIcon} alt="del-icon" />
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
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="del5"
                    className="general-popover delete-popover"
                  >
                    <PopoverBody className="d-flex">
                      <div className="del-big-icon">
                        <img src={BlackDeleteIcon} alt="del-icon" />
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
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">CREATE PRORITY</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Priority Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Priority Name"
                      />
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
                      <button className="CreateADDBtn">
                        <label className="addLable">ADD</label>
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
