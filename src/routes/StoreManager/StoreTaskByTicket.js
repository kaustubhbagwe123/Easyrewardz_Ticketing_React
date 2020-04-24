import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import storeImg from "./../../assets/Images/store.png";
import DownWhiteImg from "./../../assets/Images/down-white.png";
import DownBlueImg from "./../../assets/Images/down.png";
import CancelImg from "./../../assets/Images/cancel.png";
import ReactTable from "react-table";
import NoEditImg from "./../../assets/Images/NoEdit.png";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import DownImg from "./../../assets/Images/down.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Progress } from "antd";
class StoreTaskByTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SubmitBtnReopn: false,
      taskId: 0,
      ticketId: 0,
      ticketDetails: {},
      departmentData: [],
      funcationData: [],
      priorityData: [],
      departmentID: 0,
      funcationID: 0,
      taskTitle: "",
      taskDetails: "",
      istaskTitle: "",
      istaskDetails: "",
      isfuncation: "",
      isdepartment: "",
      commentCount: 0,
      commentData: [],
      comment: "",
      iscomment: "",
      iscmtLoading: false,
      isueRaisedBy: "",
      storeName: "",
      storeAddress: "",
      assignToName: "",
      userData: [],
      userModel: false,
      progressData: {},
      canEdit: false,
      canSubmit: false,
      isAssignTo: false,
      taskStatusId: 0,
      taskStatusName: "",
    };
    this.handleUserModelOpen = this.handleUserModelOpen.bind(this);
    this.handleUserModelClose = this.handleUserModelClose.bind(this);
  }
  handleSubmitReopnModalOpen() {
    this.setState({ SubmitBtnReopn: true });
  }
  handleSubmitReopnModalClose() {
    this.setState({ SubmitBtnReopn: false });
  }
  componentDidMount() {
    if (this.props.location.state) {
      var taskId = this.props.location.state.TaskID;
      var ticketId = this.props.location.state.TicketID;
      this.setState({ taskId, ticketId });
      this.handleGetStoreTicketingTaskByTaskID(taskId);
      this.handleGetCommentOnTask(taskId);
      this.handleGetStoreTaskProcressBar(taskId);
      this.handleGetPriority();
      this.handleGetDepartement();
    } else {
      this.props.history.push("/store/StoreTask");
    }
  }

  ///handle get priority
  handleGetPriority() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var priorityData = response.data.responseData;
        if (message === "Success") {
          self.setState({ priorityData });
        } else {
          self.setState({ priorityData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetPriority");
      });
  }

  ///handle get user dropdown
  handleGetUserDropdown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/UserDropdown",
      headers: authHeader(),
      params: {
        TaskID: this.state.taskId,
        TaskFor: 2,
      },
    })
      .then(function(response) {
        var userData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && userData.length > 0) {
          self.setState({
            userData,
            userModel: true,
          });
        } else {
          self.setState({ userData, userModel: true });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetUserDropdown");
      });
  }
  ////handle get store ticket task by task id
  handleGetStoreTicketingTaskByTaskID(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTicketingTaskByTaskID",
      headers: authHeader(),
      params: { TaskID: taskId },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        var departmentID = 0;
        var taskTitle = "";
        var taskDetails = "";
        var funcationID = 0;
        var priorityID = 0;
        var isueRaisedBy = "";
        var storeAddress = "";
        var storeName = "";
        var assignToName = "";
        var canEdit = false;
        var canSubmit = false;
        var isAssignTo = false;
        var taskStatusId = 0;
        var taskStatusName = "";

        if (message === "Success" && responseData) {
          debugger;
          var taskDetailsData = responseData.storeTaskMasterDetails;
          var ticketDetails = responseData.taskTicketDetails;
          departmentID = taskDetailsData.departmentId;
          funcationID = taskDetailsData.functionID;
          taskTitle = taskDetailsData.taskTitle;
          taskDetails = taskDetailsData.taskDescription;
          isueRaisedBy = taskDetailsData.createdByName;
          storeName = taskDetailsData.storeName;
          storeAddress = taskDetailsData.address;
          assignToName = taskDetailsData.assignToName;
          canEdit = taskDetailsData.canEdit === 1 ? true : false;
          canSubmit = taskDetailsData.canSubmit === 1 ? true : false;
          isAssignTo = taskDetailsData.isAssignTo === 1 ? true : false;
          taskStatusId = taskDetailsData.taskStatusId;
          taskStatusName = taskDetailsData.taskStatusName;
          priorityID = taskDetailsData.priorityID;
          debugger;
          self.setState({
            priorityID,
            canEdit,
            isAssignTo,
            canSubmit,
            taskStatusId,
            taskStatusName,
            assignToName,
            isueRaisedBy,
            storeAddress,
            storeName,
            ticketDetails,
            departmentID,
            funcationID,
            taskTitle,
            taskDetails,
          });
          if (departmentID > 0) {
            setTimeout(() => {
              self.handleGetFuncationByDepartmentId();
            }, 10);
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreTicketingTaskByTaskID");
      });
  }
  ////handle get department list
  handleGetDepartement() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var departmentData = response.data.responseData;
        if (message === "Success") {
          self.setState({ departmentData });
        } else {
          self.setState({ departmentData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetDepartement");
      });
  }
  ///handle get funcation by department id
  handleGetFuncationByDepartmentId() {
    let self = this;
    var DepartmentId = this.state.departmentID;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: { DepartmentId: DepartmentId },
    })
      .then(function(response) {
        var message = response.data.message;
        var funcationData = response.data.responseData;
        if (message === "Success") {
          self.setState({ funcationData });
        } else {
          self.setState({ funcationData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetFuncationByDepartmentId");
      });
  }
  ////handle get comment on task
  handleGetCommentOnTask(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetCommentOnTask",
      headers: authHeader(),
      params: { TaskID: taskId },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var commentData = response.data.responseData;
        var commentCount = commentData.length;

        if (message === "Success" && commentData.length > 0) {
          self.setState({ commentCount, commentData });
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCommentOnTask");
      });
  }
  ////handle add comment by task id
  handleAddCommentByTaskId() {
    debugger;
    let self = this;
    if (this.state.comment == "") {
      this.setState({ iscomment: "Please Enter Comment." });
    } else {
      this.setState({ iscomment: "" });
    }

    if (this.state.comment !== "") {
      this.setState({ iscmtLoading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/StoreTask/AddStoreTaskComment",
        headers: authHeader(),
        data: {
          TaskID: this.state.taskId,
          Comment: this.state.comment,
        },
      })
        .then(function(response) {
          var message = response.data.message;
          var responseData = response.data.responseData;
          if (message == "Success" && responseData > 0) {
            NotificationManager.success("Comment Added successfully.");
            self.setState({ iscmtLoading: false });
            self.handleGetCommentOnTask(self.state.taskId);
          } else {
            NotificationManager.error("Comment Not Added successfully.");
            self.setState({ iscmtLoading: false });
          }
        })
        .catch((response) => {
          self.setState({ iscmtLoading: false });
          console.log(response, "---handleAddCommentByTaskId");
        });
    }
  }
  ////handle assign task by ticket using agent id
  handleAssignTaskByTicket() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/AssignTaskByTicket",
      headers: authHeader(),
      params: {
        TaskID: this.state.taskId,
        AgentID: this.state.agentId,
      },
    })
      .then(function(response) {
        debugger;
        var responseData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && responseData) {
          self.setState({ userModel: false });
          NotificationManager.success("Task Assign Successfully.");
          self.componentDidMount();
        } else {
          NotificationManager.error("Task Assign Fail.");
          self.setState({ userModel: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleAssignTask");
      });
  }
  ////handle get store task progress bar data
  handleGetStoreTaskProcressBar(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskProcressBar",
      headers: authHeader(),
      params: {
        TaskID: taskId,
        TaskBy: 2,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var progressData = response.data.responseData[0];
        if (message == "Success") {
          self.setState({ progressData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreTaskProcressBar");
      });
  }

  handleSubmitTaks(statusId) {
    let self = this;
    debugger;
    if (this.state.departmentID == 0) {
      this.setState({ isdepartment: "Please Select Department." });
    } else {
      this.setState({ isdepartment: "" });
    }

    if (this.state.funcationID == 0) {
      this.setState({ isfuncation: "Please Select Function." });
    } else {
      this.setState({ isfuncation: "" });
    }
    if (this.state.priorityID == 0) {
      this.setState({ ispriority: "Please Select Priority." });
    } else {
      this.setState({ ispriority: "" });
    }

    setTimeout(() => {
      if (
        this.state.isfuncation == "" &&
        this.state.isdepartment == "" &&
        this.state.ispriority == ""
      ) {
        var inputParam = {};

        inputParam.DepartmentId = this.state.departmentID;
        inputParam.FunctionID = this.state.funcationID;
        inputParam.PriorityID = this.state.priorityID;
        inputParam.TaskID = this.state.taskId;
        inputParam.TaskStatusId = statusId;

        axios({
          method: "post",
          url: config.apiUrl + "/StoreTask/SubmitTaskByTicket",
          headers: authHeader(),
          data: inputParam,
        })
          .then(function(response) {
            var message = response.data.message;
            var responseData = response.data.responseData;
            if (message == "Success") {
              self.props.history.push("/store/StoreTask");
            }
          })
          .catch((response) => {
            console.log(response, "---handleSubmitTaks");
          });
      }
    });
  }

  ////handle input filed change
  handleOnchange = (e) => {
    debugger;
    const { name, value } = e.target;
    if (name == "tasktitle") {
      if (value !== "") {
        this.setState({ taskTitle: value, istaskTitle: "" });
      } else {
        this.setState({
          taskTitle: value,
          istaskTitle: "Please Enter Task Title",
        });
      }
    }
    if (name == "department") {
      if (value !== 0) {
        this.setState({
          departmentID: value,
          funcationData: [],
          funcationID: 0,
          isdepartment: "",
        });
        setTimeout(() => {
          this.handleGetFuncationByDepartmentId();
        }, 10);
      } else {
        this.setState({
          isdepartment: "Please Select Department.",
          departmentID: value,
        });
      }
    }
    if (name == "funcation") {
      if (value !== 0) {
        this.setState({
          funcationID: value,
          isfuncation: "",
        });
      } else {
        this.setState({
          isfuncation: "Please Select Funcation.",
          funcationID: value,
        });
      }
    }
    if (name == "priority") {
      if (value !== 0) {
        this.setState({
          priorityID: value,
          ispriority: "",
        });
      } else {
        this.setState({
          ispriority: "Please Select Priority.",
          priorityID: value,
        });
      }
    }
    if (name == "taskdetails") {
      if (value !== "") {
        this.setState({
          taskDetails: value,
          istaskDetails: "",
        });
      } else {
        this.setState({
          istaskDetails: "Please Enter Task Details.",
          taskDetails: value,
        });
      }
    }
    if (name == "comment") {
      if (value !== "") {
        this.setState({
          comment: value,
          iscomment: "",
        });
      } else {
        this.setState({
          iscomment: "Please Enter Comment.",
          comment: value,
        });
      }
    }
  };
  ////handle user model open
  handleUserModelOpen() {
    // this.setState({ userModel: true });
    this.handleGetUserDropdown();
  }
  ////handle user model close
  handleUserModelClose() {
    this.setState({ userModel: false });
  }
  //// handle redirect to create claim page
  handleRedirectToCreateClaim() {
    debugger;
    this.props.history.push({
      pathname: "/store/raiseClaim",
      state: {
        taskId: this.state.taskId,
        ticketId: this.state.ticketId,
      },
    });
  }
  render() {
    return (
      <Fragment>
        <div className="edit-storeTask-header">
          <div className="tab-content">
            <div className="store-header-task">
              <ul className="nav alert-nav-tabs3" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Task-tab"
                    role="tab"
                    aria-controls="Task-tab"
                    aria-selected="true"
                  >
                    Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Ticket-tab"
                    role="tab"
                    aria-controls="Ticket-tab"
                    aria-selected="false"
                  >
                    Ticket
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content p-0">
          <div
            className="tab-pane fade show active"
            id="Task-tab"
            role="tabpanel"
            aria-labelledby="Task-tab"
          >
            <div className="headerBtn-store">
              <div className="btnstore-last">
                <a
                  className="d-inline-block"
                  onClick={this.handleUserModelOpen.bind(this)}
                >
                  <div className="oval-5-1-new-store">
                    <img
                      src={storeImg}
                      alt="headphone"
                      className="storeImg-11"
                    />
                  </div>
                  <label className="naman-r">{this.state.assignToName}</label>
                </a>

                <img
                  src={DownBlueImg}
                  alt="headphone"
                  className="ImgBlue-lbl"
                />
                <button type="button" className="raisedClaim-storeBtn">
                  <label
                    className="raisedClaim-lbl"
                    onClick={this.handleRedirectToCreateClaim.bind(this)}
                  >
                    RAISE CLAIM
                  </label>
                </button>
                <button
                  type="button"
                  className={this.state.canSubmit?"btn-store-resolved":"btn-store-resolved disabled-link"}
                  onClick={this.handleSubmitReopnModalOpen.bind(this)}
                >
                  <label className="myticket-submit-solve-button-text">
                    SUBMIT AS RESOLVED
                  </label>
                  <img
                    src={DownWhiteImg}
                    alt="headphone"
                    className="down-white"
                  />
                </button>
              </div>
              <Modal
                open={this.state.SubmitBtnReopn}
                onClose={this.handleSubmitReopnModalClose.bind(this)}
                closeIconId="close"
                modalId="SubmitReopn-popup"
                overlayId="logout-ovrly"
              >
                <div className="store-hdrtMdal">
                  {this.state.taskStatusId === 222 ? (
                    <div className="row">
                      <label
                        className="modal-lbl"
                        onClick={this.handleSubmitTaks.bind(this, 224)}
                      >
                        Submit as <span className="modal-lbl-1">ReOpen</span>
                      </label>
                    </div>
                  ) : (
                    <div className="row">
                      <label
                        className="modal-lbl"
                        onClick={this.handleSubmitTaks.bind(this, 222)}
                      >
                        Submit as <span className="modal-lbl-1">Solved</span>
                      </label>
                    </div>
                  )}
                  {this.state.taskStatusId !== 222 ? (
                    <div className="row" style={{ marginTop: "8px" }}>
                      <label
                        className="modal-lbl"
                        onClick={this.handleSubmitTaks.bind(this, 223)}
                      >
                        Submit as <span className="modal-lbl-2">Closed</span>
                      </label>
                    </div>
                  ) : null}
                </div>
              </Modal>
            </div>
            <div className="row width">
              <div className="col-md-7">
                <div className="card store-card-padding">
                  <label className="store-Edit-lbl"> Task Title</label>
                  <input
                    type="text"
                    className={
                      this.state.canEdit
                        ? "store-edit-txt"
                        : "store-edit-txt disabled-link"
                    }
                    placeholder="Enter Task Title"
                    value={this.state.taskTitle}
                    name="tasktitle"
                    onChange={this.handleOnchange.bind(this)}
                  />
                  {this.state.istaskTitle !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.iscomment}
                    </p>
                  )}
                  <div className="row">
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Department</label>
                      <select
                        id="inputState"
                        className={
                          this.state.canEdit
                            ? "form-control dropdown-label"
                            : "form-control dropdown-label disabled-link"
                        }
                        value={this.state.departmentID}
                        name="department"
                        onChange={this.handleOnchange.bind(this)}
                      >
                        <option value={0}>Select</option>
                        {this.state.departmentData !== null &&
                          this.state.departmentData.map((item, i) => (
                            <option
                              key={i}
                              value={item.departmentID}
                              className="select-category-placeholder"
                            >
                              {item.departmentName}
                            </option>
                          ))}
                      </select>
                      {this.state.isdepartment !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isdepartment}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Function</label>
                      <select
                        id="inputState"
                        className={
                          this.state.canEdit
                            ? "form-control dropdown-label"
                            : "form-control dropdown-label disabled-link"
                        }
                        value={this.state.funcationID}
                        name="funcation"
                        onChange={this.handleOnchange.bind(this)}
                      >
                        {" "}
                        <option value={0}>Select</option>
                        {this.state.funcationData !== null &&
                          this.state.funcationData.map((item, i) => (
                            <option
                              key={i}
                              value={item.functionID}
                              className="select-category-placeholder"
                            >
                              {item.funcationName}
                            </option>
                          ))}
                      </select>
                      {this.state.isfuncation !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isfuncation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Priority</label>
                      <select
                        id="inputState"
                        className={
                          this.state.canEdit
                            ? "form-control dropdown-label"
                            : "disabled-link form-control dropdown-label"
                        }
                        value={this.state.priorityID}
                        name="priority"
                        onChange={this.handleOnchange}
                      >
                        <option value={0}>Select</option>
                        {this.state.priorityData !== null &&
                          this.state.priorityData.map((item, i) => (
                            <option
                              key={i}
                              value={item.priorityID}
                              className="select-category-placeholder"
                            >
                              {item.priortyName}
                            </option>
                          ))}
                      </select>
                      {this.state.ispriority !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ispriority}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Task Details</label>
                      <textarea
                        rows="8"
                        className={
                          this.state.canEdit
                            ? "textarea-store"
                            : "textarea-store disabled-link"
                        }
                        value={this.state.taskTitle}
                        name="taskdetails"
                        onChange={this.handleOnchange.bind(this)}
                      ></textarea>
                      {this.state.istaskDetails !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.iscomment}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Comments</label>
                      <textarea
                        rows="8"
                        className="textarea-store-comments"
                        placeholder="Add your comment here"
                        value={this.state.comment}
                        name="comment"
                        onChange={this.handleOnchange.bind(this)}
                      ></textarea>
                      {this.state.iscomment !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.iscomment}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">
                        Comments:{" "}
                        {this.state.commentCount < 9
                          ? "0" + this.state.commentCount
                          : this.state.commentCount}
                      </label>
                      <button
                        disabled={this.iscmtLoading}
                        className="butn-store"
                        onClick={this.handleAddCommentByTaskId.bind(this)}
                      >
                        {this.state.iscmtLoading ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : (
                          ""
                        )}
                        Add Comment
                      </button>
                    </div>
                  </div>
                  {this.state.commentData !== null
                    ? this.state.commentData.map((item, i) => {
                        return (
                          <div key={i}>
                            <div className="row">
                              <div className="col-md-12 store-mrg-1">
                                <div className="oval-5-1-new-store">
                                  <img
                                    src={storeImg}
                                    alt="headphone"
                                    className="storeImg-11"
                                  />
                                </div>
                                <label className="naman-r-store">
                                  {item.commentByName}
                                </label>
                                <label className="store-hrLbl">
                                  {item.commentedDiff}
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-md-12"
                                style={{ marginTop: "3px" }}
                              >
                                <span className="store-comment">Comment :</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <p className="store-cmt-comment">
                                  {item.comment}
                                </p>
                                <hr />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="col-md-5" style={{ padding: "0" }}>
                <div className="card store-card-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Issue Raised By:</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Store Name:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="oval-5-1-new-store">
                        <img
                          src={storeImg}
                          alt="headphone"
                          className="storeImg-11"
                        />
                      </div>
                      <label className="store-edit-data-1">
                        {this.state.isueRaisedBy}{" "}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.storeName}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Store Address:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="store-edit-data">
                        {this.state.storeAddress}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="task-clouserDate">
                        Task Closure Date
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 progress-sect">
                      <div className="col-md-3" style={{ padding: 0 }}>
                        <label className="store-date">
                          {this.state.progressData.closureTaskDate}{" "}
                        </label>
                      </div>
                      <div className="col-md-9" style={{ padding: 0 }}>
                        <Progress
                          showInfo={false}
                          // strokeColor={this.state.progressData.colorCode}
                          strokeColor={{
                            "0%": this.state.progressData.colorCode
                              ? this.state.progressData.colorCode.split(",")[0]
                              : "",
                            "100%": this.state.progressData.colorCode
                              ? this.state.progressData.colorCode.split(",")[1]
                              : "",
                          }}
                          percent={Number(this.state.progressData.progress)}
                        />
                        <p
                          className="progressbar-lbl"
                          style={{
                            marginLeft:
                              this.state.progressData.progress +
                              this.state.progressData.progressIn,
                          }}
                        >
                          {this.state.progressData.remainingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="Ticket-tab"
            role="tabpanel"
            aria-labelledby="Ticket-tab"
          >
            <div className="row width">
              <div className="col-md-8">
                <div className="card store-card-padding-ticket">
                  <label className="store-Edit-lbl"> Ticket Title</label>
                  <input
                    type="text"
                    className="store-edit-txt"
                    placeholder="Enter Ticket Title"
                    disabled={true}
                    value={this.state.ticketDetails.ticketTitle}
                  />
                  <img src={NoEditImg} alt="NoEditImg" className="noEditImg" />
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl"> Ticket Details</label>
                      <textarea
                        disabled={true}
                        rows="8"
                        className="textarea-store-comments"
                        placeholder="Add your Ticket Details here"
                        value={this.state.ticketDetails.ticketdescription}
                      ></textarea>
                      <img
                        src={NoEditImg}
                        alt="NoEditImg"
                        className="noEditImg-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card store-card-2">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Customer Name:</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Gender:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data-1">
                        {this.state.ticketDetails.customerName}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.gender}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Mobile Number:</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Email ID:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.customerPhoneNumber}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.customerEmailId}
                      </label>
                    </div>
                  </div>
                  <div className="hrMargin">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Status</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Priority</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data-1">
                        {this.state.ticketDetails.status}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.priortyName}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Category</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Sub Category</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.categoryName}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.subCategoryName}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Type</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.issueTypeName}
                      </label>
                    </div>
                  </div>
                  <div className="hrMargin">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Store</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.storeNames}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Product</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.productNames}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------User Modal--------------------  */}
        <Modal
          open={this.state.userModel}
          onClose={this.handleUserModelClose.bind(this)}
          closeIconId="close"
          modalId="labelmodel-popup"
          overlayId="logout-ovrly"
        >
          <div className="myTicket-table remov agentlist" id="tic-det-assign">
            <ReactTable
              className="limit-react-table-body"
              data={this.state.userData}
              columns={[
                {
                  Header: <span>Emp Id</span>,
                  accessor: "user_ID",
                  width: 80,
                },
                {
                  Header: <span>Name</span>,
                  accessor: "userName",
                },
                // {
                //   Header: <span>Designation</span>,
                //   accessor: "designation"
                // }
              ]}
              minRows={2}
              showPagination={false}
              resizable={false}
              getTrProps={(rowInfo, column) => {
                // ////
                const index = column ? column.index : -1;
                return {
                  onClick: (e) => {
                    ////
                    this.selectedRow = index;
                    var agentId = column.original["user_ID"];
                    this.setState({ agentId });
                  },
                  style: {
                    background: this.selectedRow === index ? "#ECF2F4" : null,
                  },
                };
              }}
            />
            <div className="button-margin">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleAssignTaskByTicket.bind(this)}
              >
                SELECT
              </button>
            </div>
            <div
              className="cancel-assign"
              onClick={this.handleUserModelClose.bind(this)}
            >
              <img src={CancelImg} alt="cancel" />
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default StoreTaskByTicket;
