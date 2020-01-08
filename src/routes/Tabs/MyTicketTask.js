import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Drawer } from "antd";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import CancelImg from "./../../assets/Images/cancel.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import RightCirculImg from "./../../assets/Images/right.png";
import CalSmallImg from "./../../assets/Images/cal-small.png";
import StoreImg from "./../../assets/Images/store.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "./../../helpers/config";
import ReactTable from "react-table";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../helpers/authHeader";

class MyTicketTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AddTaskModal: false,
      TaskDetailDrawer: false,
      taskTitle: "",
      taskDescription: "",
      taskAddComment: "",
      DepartmentData: [],
      FunctionData: [],
      AssignToData: [],
      TicketPriorityData: [],
      selectedDepartment: 0,
      selectedFunction: 0,
      selectedAssignTo: 0,
      selectedPriority: 0
    };
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleGetAssignToList = this.handleGetAssignToList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
  }
  handleAddTaskModalOpn() {
    this.setState({ AddTaskModal: true });
  }
  handleAddTaskModalCls() {
    this.setState({ AddTaskModal: false });
  }
  handleTaskDetailsDrawerOpn() {
    this.setState({ TaskDetailDrawer: true });
  }
  handleTaskDetailsDrawerCls() {
    this.setState({ TaskDetailDrawer: false });
  }
  HandleRowClickDraw = () => {
    return {
      onClick: e => {
        this.handleTaskDetailsDrawerOpn();
      }
    };
  };
  handleTaskOnchangeData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleGetDepartmentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let DepartmentData = res.data.responseData;
      self.setState({ DepartmentData: DepartmentData });
    });
  }
  handleGetFunctionList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment
      }
    }).then(function(res) {
      debugger;
      let FunctionData = res.data.responseData;
      self.setState({ FunctionData: FunctionData });
    });
  }
  handleGetAssignToList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/getassignedto",
      headers: authHeader(),
      params: {
        Function_ID: this.state.selectedFunction
      }
    }).then(function(res) {
      debugger;
      let AssignToData = res.data.responseData;
      self.setState({ AssignToData: AssignToData });
    });
  }
  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let PriorityData = res.data.responseData;
      self.setState({ TicketPriorityData: PriorityData });
    });
  }
  setDepartmentValue = e => {
    let DepartmentValue = e.target.value;
    this.setState({ selectedDepartment: DepartmentValue });
    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = e => {
    let FunctionValue = e.target.value;
    this.setState({ selectedFunction: FunctionValue });
    setTimeout(() => {
      if (this.state.selectedFunction) {
        this.handleGetAssignToList();
      }
    }, 1);
  };
  setAssignToValue = e => {
    let AssignValue = e.target.value;
    this.setState({ selectedAssignTo: AssignValue });
  };
  setPriorityValue = e => {
    let PriorityValue = e.target.value;
    this.setState({ selectedPriority: PriorityValue });
  };
  handleAddTaskTitle() {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Task/createTask",
      headers: authHeader(),
      data: {
        TaskTitle: this.state.taskTitle.trim(),
        TaskDescription: this.state.taskDescription.trim(),
        DepartmentId: this.state.selectedDepartment,
        FunctionID: this.state.selectedFunction,
        AssignToID: this.state.selectedAssignTo,
        PriorityID: this.state.selectedPriority,
        TicketID: 127
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      if (status === true) {
        NotificationManager.success("Task created successfully.");
        self.handleAddTaskModalCls();
      } else {
        NotificationManager.error("Task not created.");
      }
    });
  }
  handleTaskAddComments() {
    debugger
    // var TaskData = this.props.location.state;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/AddComment",
      headers: authHeader(),
      params: {
        // CommentForId: TaskData.TaskTab,
        Comment: this.state.taskAddComment,
        Id: 127
      }
    }).then(function(res) {
      debugger;
      let Data = res.data.responseData;
      // self.setState({ KbPopupData: Data });
    });
  }

  componentDidMount() {
    debugger
    // var TaskData = this.props.location.state;
    this.handleGetDepartmentList();
    this.handleGetTicketPriorityList();
  }
  render() {
    const dataTicketTask = [
      {
        id: "Ta1",
        taskTitle: <label>Wifi is not working from 5hrs</label>,
        status: <span className="table-btn table-blue-btn">Open</span>,
        dept: (
          <div>
            <span>
              Internet
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
              {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
            </span>
          </div>
        ),
        creationOn: (
          <div>
            <span>
              2 Hour Ago
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </span>
          </div>
        )
      },
      {
        id: "Ta2",
        taskTitle: <label>Store door are not working</label>,
        status: <span className="table-btn table-blue-btn">Open</span>,
        dept: (
          <div>
            <span>
              hardware
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </span>
          </div>
        ),
        creationOn: (
          <div>
            <span>
              12 March 2018
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </span>
          </div>
        )
      },
      {
        id: "Ta3",
        taskTitle: <label>Supplies are not coming on time</label>,
        status: <span className="table-btn table-green-btn">Solved</span>,
        dept: (
          <div>
            <span>
              supply
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </span>
          </div>
        ),
        creationOn: (
          <div>
            <span>
              12 March 2018
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </span>
          </div>
        )
      }
    ];

    const columnsTicketTask = [
      {
        Header: <span>ID</span>,
        accessor: "id",
        Cell: row => (
          <span>
            <img src={HeadPhone3} alt="HeadPhone" className="headPhone3" />
            ABC1234
          </span>
        )
      },
      {
        Header: <span>Status</span>,
        accessor: "status"
      },
      {
        Header: <span>Task Title</span>,
        accessor: "taskTitle"
      },
      {
        Header: (
          <span>
            Department
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "dept"
      },
      {
        Header: (
          <span>
            Store Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "storeCode",
        Cell: row => <label>2349</label>
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdBy",
        Cell: row => <label>N Rampal</label>
      },
      {
        Header: (
          <span>
            Creation on
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationOn"
      },
      {
        Header: (
          <span>
            Assign to
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assignTo",
        Cell: row => <label>A. Bansal</label>
      }
    ];

    return (
      <div>
        <div className="claim-addTask-btn">
          <button
            type="button"
            className="butn"
            onClick={this.handleAddTaskModalOpn.bind(this)}
          >
            ADD TASK
          </button>
        </div>
        <Modal
          open={this.state.AddTaskModal}
          onClose={this.handleAddTaskModalCls.bind(this)}
          closeIconId="sdsg"
          modalId="ClaimAdd-taskPopup"
          overlayId="logout-ovrly"
        >
          <div className="claim-AddTask-Mdl">
            <label className="claim-hdrMdl">Task</label>
            <img
              src={CancelImg}
              alt="cancelImg"
              className="cancalImg"
              onClick={this.handleAddTaskModalCls.bind(this)}
            />
          </div>
          <div style={{ padding: "20px 8px 0px 8px" }}>
            <input
              type="text"
              class="txt-1"
              placeholder="Task Title"
              name="taskTitle"
              value={this.state.taskTitle}
              onChange={this.handleTaskOnchangeData}
            />
            <textarea
              className="ClaimAddTadk-modal-textArea"
              placeholder="Task Description"
              rows="6"
              name="taskDescription"
              value={this.state.taskDescription}
              onChange={this.handleTaskOnchangeData}
            ></textarea>
            <div className="row">
              <div className="col-md-6">
                <select
                  name="Department"
                  className="category-select-system dropdown-label"
                  value={this.state.selectedDepartment}
                  onChange={this.setDepartmentValue}
                >
                  <option className="select-category-placeholder">
                    Department
                  </option>
                  {this.state.DepartmentData !== null &&
                    this.state.DepartmentData.map((item, i) => (
                      <option
                        key={i}
                        value={item.departmentID}
                        className="select-category-placeholder"
                      >
                        {item.departmentName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6">
                <select
                  name="Function"
                  className="category-select-system dropdown-label"
                  value={this.state.selectedFunction}
                  onChange={this.setFunctionValue}
                >
                  <option className="select-sub-category-placeholder">
                    Function
                  </option>
                  {this.state.FunctionData !== null &&
                    this.state.FunctionData.map((item, i) => (
                      <option
                        key={i}
                        value={item.functionID}
                        className="select-category-placeholder"
                      >
                        {item.funcationName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col-md-6">
                <select
                  name="AssignTo"
                  value={this.state.selectedAssignTo}
                  onChange={this.setAssignToValue}
                  className="category-select-system dropdown-label"
                >
                  <option className="select-category-placeholder">
                    Assign To
                  </option>
                  {this.state.AssignToData !== null &&
                    this.state.AssignToData.map((item, i) => (
                      <option
                        key={i}
                        value={item.userID}
                        className="select-category-placeholder"
                      >
                        {item.userName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6">
                <select
                  name="Priority"
                  value={this.state.selectedPriority}
                  onChange={this.setPriorityValue}
                  className="category-select-system dropdown-label"
                >
                  <option className="select-sub-category-placeholder">
                    Task Priority
                  </option>
                  {this.state.TicketPriorityData !== null &&
                    this.state.TicketPriorityData.map((item, i) => (
                      <option
                        key={i}
                        value={item.priorityID}
                        className="select-sub-category-placeholder"
                      >
                        {item.priortyName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row m-t-20" style={{ float: "right" }}>
              <div style={{ marginRight: "15px" }}>
                <a href="#!" style={{ marginRight: "15px" }}>
                  CANCEL
                </a>
                <button
                  className="butn"
                  type="button"
                  onClick={this.handleAddTaskTitle.bind(this)}
                >
                  CREATE TASK
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <div className="table-cntr mt-3 MyTicketTaskReact">
          <ReactTable
            data={dataTicketTask}
            columns={columnsTicketTask}
            // resizable={false}
            defaultPageSize={3}
            showPagination={false}
            getTrProps={this.HandleRowClickDraw}
          />

          <Drawer
            className="taskTab-drawerModal"
            placement={"right"}
            closable={false}
            // onClose={this.handleClaimDetailsModalClose}
            visible={this.state.TaskDetailDrawer}
          >
            <div style={{ marginLeft: "10px" }}>
              <img
                src={BlackLeftArrow}
                alt="black-left-arrow-icon"
                className="black-left-arrow"
                onClick={this.handleTaskDetailsDrawerCls.bind(this)}
              />
              <label className="task-details">Task Details</label>
            </div>
            <hr className="claimline" />
            <div className="">
              <label className="wifiLbl-drawer">
                WIFI is not working from 5hrs
              </label>
              <div className="row m-b-15">
                <div className="col-xs-3">
                  <img
                    src={Headphone2Img}
                    alt="headphone"
                    className="oval-56"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago m-r-25">
                    ASSIGNED TO
                    <span className="addTasklbl-name">Naman Rampal</span>
                  </label>
                </div>
                <div className="col-xs-3">
                  <img
                    src={RightCirculImg}
                    alt="headphone"
                    className="status-opn"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago m-r-25">
                    STATUS
                    <span className="addTasklbl-name">Open</span>
                  </label>
                </div>
                <div className="col-xs-3">
                  <img
                    src={CalSmallImg}
                    alt="headphone"
                    className="status-opn"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago">
                    DUE DATE
                    <span className="addTasklbl-name">Today</span>
                  </label>
                </div>
              </div>
              <p className="tasktasb-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Sed interdum cursus nulla, a sagittis arcu dapibus vel.
                <br />
                Phasellus ut justo mauris. Nullam sed efficitur tellus, eget
                sollicitudin tellus. Donec metus augue, auctor ac dignissim
                suscipit, blandit vel libero. Fusce accumsan finibus nisi sed
                sodales. Phasellus tincidunt nisl dictum ipsum pellentesque
                dapibus. Mauris mollis magna vel arcu pretium, et lobortis ipsum
                placerat. Maecenas mollis convallis felis vel posuere.
              </p>
              <hr className="claimline" />
              <textarea
                className="task-drawerv-textArea"
                placeholder="Add Comments"
                name="taskAddComment"
                value={this.state.taskAddComment}
                onChange={this.handleTaskOnchangeData}
              ></textarea>
              <button
                className="assign-butn btn-assign-tikcet"
                type="button"
                onClick={this.handleTaskAddComments.bind(this)}
              >
                ADD COMMENT
              </button>
              <div className="row m-t-20">
                <div className="col-xs-6">
                  <div className="storeImg-drawer">
                    <img src={StoreImg} alt="headphone" className="storeImg" />
                  </div>
                  <label className="varun-taskDrawer">Varun Nagpal</label>
                  <span className="addTask-time-ago">2hr ago</span>
                  <label className="task-drawer-lnl">
                    Hi Diwakar, I really appreciate you joining us at
                    Voucherify! My top priority
                  </label>
                </div>
              </div>
              <div className="row m-t-20">
                <div className="col-xs-6">
                  <div className="storeImg-drawer">
                    <img src={StoreImg} alt="headphone" className="storeImg" />
                  </div>
                  <label className="varun-taskDrawer">Varun Nagpal</label>
                  <span className="addTask-time-ago">2hr ago</span>
                  <label className="task-drawer-lnl">
                    Hi Diwakar, I really appreciate you joining us at
                    Voucherify! My top priority
                  </label>
                </div>
              </div>
            </div>
          </Drawer>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default MyTicketTask;
