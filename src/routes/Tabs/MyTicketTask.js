import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Drawer } from "antd";
// import InfoIcon from "./../../assets/Images/info-icon.png";
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
      taskDetailsData: {},
      taskTableGrid:[],
      Taskdetails: [],
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
    this.handleGetTaskTabDetails = this.handleGetTaskTabDetails.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(this);
    this.handleGetTaskTableGrid = this.handleGetTaskTableGrid.bind(this);
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
  handleGetTaskTableGrid(){
    let self=this;
    axios({
      method:"post",
      url: config.apiUrl + "/Task/gettasklist",
      headers: authHeader(),
      params: {
        TicketId: 127
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      let data = res.data.responseData;
      if (status === true) {
        self.setState({ taskTableGrid: data });
      }
    });
  }
  handleGetTaskTabDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/gettaskdetailsbyid",
      headers: authHeader(),
      params: {
        taskId: 3
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      let details = res.data.responseData.comments;
      let data = res.data.responseData;
      if (status === true) {
        self.setState({ Taskdetails: details, taskDetailsData: data });
      }
    });
  }
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
    debugger;
    var TaskData = this.props.taskData;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/AddComment",
      headers: authHeader(),
      params: {
        CommentForId: TaskData.TaskTab,
        Comment: this.state.taskAddComment.trim(),
        Id: 127
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      if (status === true) {
        NotificationManager.success("Comment added successfully.");
        self.handleGetTaskTabDetails();
      } else {
        NotificationManager.error("Comment not added.");
      }
    });
  }

  componentDidMount() {
    this.handleGetTaskTableGrid()
    this.handleGetDepartmentList();
    this.handleGetTicketPriorityList();
    this.handleGetTaskTabDetails();
  }
  render() {
    const {taskTableGrid}=this.state;
   
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
              maxLength="100"
            />
            <textarea
              className="ClaimAddTadk-modal-textArea"
              placeholder="Task Description"
              rows="6"
              name="taskDescription"
              value={this.state.taskDescription}
              onChange={this.handleTaskOnchangeData}
              maxLength="250"
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
                <button
                  className="cancel"
                  type="button"
                  onClick={this.handleAddTaskModalCls.bind(this)}
                >
                  CANCEL
                </button>
                <button className="butn" type="button">
                  CREATE TASK
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <div className="table-cntr mt-3 MyTicketTaskReact">
          <ReactTable
            data={taskTableGrid}
            columns={[
              {
                Header: <span>ID</span>,
                accessor: "ticketingTaskID",
                Cell: row => (
                  <span>
                    <img src={HeadPhone3} alt="HeadPhone" className="headPhone3" />
                    {row.original.ticketingTaskID}
                  </span>
                )
              },
              {
                Header: <span>Status</span>,
                accessor: "taskStatus"
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
                accessor: "departmentName"
              },
              {
                Header: (
                  <span>
                    Store Code
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "storeCode",
              },
              {
                Header: (
                  <span>
                    Created By
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "createdBy",
              },
              {
                Header: (
                  <span>
                    Creation on
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "dateFormat"
              },
              {
                Header: (
                  <span>
                    Assign to
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "assignName",
              }
            ]}
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
                {this.state.taskDetailsData.taskTitle}
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
                    <span className="addTasklbl-name">
                      {this.state.taskDetailsData.assignName}
                    </span>
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
                    <span className="addTasklbl-name">
                      {this.state.taskDetailsData.taskStatus}
                    </span>
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
                    <span className="addTasklbl-name">
                      {this.state.taskDetailsData.dateFormat}
                    </span>
                  </label>
                </div>
              </div>
              <p className="tasktasb-para">
               {this.state.taskDetailsData.taskDescription}
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
              <div className="varunoverflow">
                {this.state.Taskdetails !== null &&
                  this.state.Taskdetails.map((item, i) => (
                    <div className="row m-t-20 mx-0" key={i}>
                      <div className="col-xs-6" style={{ display: "contents" }}>
                        <div className="storeImg-drawer">
                          <img
                            src={StoreImg}
                            alt="headphone"
                            className="storeImg"
                          />
                        </div>
                        <label className="varun-taskDrawer">
                          {item.name}
                          <span className="addTask-time-ago">
                            {item.datetime}
                          </span>
                        </label>

                        <label className="task-drawer-lnl">
                          {item.comment}
                        </label>
                      </div>
                    </div>
                  ))}
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
