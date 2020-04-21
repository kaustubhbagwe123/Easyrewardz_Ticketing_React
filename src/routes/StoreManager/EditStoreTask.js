import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import storeImg from "./../../assets/Images/store.png";
import DownWhiteImg from "./../../assets/Images/down-white.png";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // NotificationContainer,
  NotificationManager,
} from "react-notifications";
import LoadingImg from "./../../assets/Images/loading.png";
import CancelImg from "./../../assets/Images/cancel.png";
import ReactTable from "react-table";
import moment from "moment";
import DownImg from "./../../assets/Images/down.png";
import { Progress } from "antd";
import { withRouter } from "react-router-dom";

class EditStoreTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SubmitBtnReopn: false,
      taskId: 0,
      departmentData: [],
      funcationData: [],
      priorityData: [],
      assignToData: [],
      departmentID: 0,
      funcationID: 0,
      priorityID: 0,
      assignToID: 0,
      taskTitle: "",
      taskDetails: "",
      istaskTitle: "",
      istaskDetails: "",
      isassignto: "",
      ispriority: "",
      isfuncation: "",
      isdepartment: "",
      commentCount: 0,
      commentData: [],
      comment: "",
      iscomment: "",
      iscmtLoading: false,
      issueRaisedBy: "",
      storeName: "",
      storeAddress: "",
      historyData: [],
      historyModal: false,
      assignToName: "",
      userData: [],
      userModel: false,
      agentId: 0,
      progressData: {},
      canEdit: false,
      canSubmit: false,
      canAssignTo: false,
      taskStatusId: 0,
      taskStatusName: "",
    };
    this.handleUserModelOpen = this.handleUserModelOpen.bind(this);
    this.handleUserModelClose = this.handleUserModelClose.bind(this);
  }

  componentDidMount() {
    debugger;
    if (this.props.location.state) {
      var taskId = this.props.location.state.TaskID;
      this.setState({ taskId });
      this.handleGetDepartement();
      this.handleGetPriority();
      this.handleStoreTaskDetialsById(taskId);
      this.handleGetCommentOnTask(taskId);
      this.handleGetUserDropdown(taskId);
      this.handleGetStoreTaskProcressBar(taskId);
    } else {
      this.props.history.push("/store/StoreTask");
    }
  }

  componentDidUpdate() {
    debugger;
    if (this.props.location.state) {
      if (this.state.taskId !== this.props.location.state.TaskID) {
        var taskId = this.props.location.state.TaskID;
        this.setState({ taskId });
        this.handleGetDepartement();
        this.handleGetPriority();
        this.handleStoreTaskDetialsById(taskId);
        this.handleGetCommentOnTask(taskId);
        this.handleGetUserDropdown(taskId);
        this.handleGetStoreTaskProcressBar(taskId);
      }
    }
  }
  handleSubmitReopnModalOpen() {
    this.setState({ SubmitBtnReopn: true });
  }
  handleSubmitReopnModalClose() {
    this.setState({ SubmitBtnReopn: false });
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

  ////handle get store task details by id
  handleStoreTaskDetialsById(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskByID",
      headers: authHeader(),
      params: { TaskID: taskId },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;

        var departmentID = 0;
        var funcationID = 0;
        var priorityID = 0;
        var assignToID = 0;
        var taskTitle = "";
        var taskDetails = "";
        var issueRaisedBy = "";
        var storeName = "";
        var storeAddress = "";
        var assignToName = "";
        var canEdit = false;
        var canSubmit = false;
        var canAssignTo = false;
        var taskStatusName = "";
        var taskStatusId = 0;

        debugger;
        if (message == "Success" && data) {
          departmentID = data.departmentId;
          funcationID = data.functionID;
          priorityID = data.priorityID;
          assignToID = data.assignToID;
          taskTitle = data.taskTitle;
          taskDetails = data.taskDescription;
          issueRaisedBy = data.createdByName;
          storeName = data.storeName;
          storeAddress = data.address;
          assignToName = data.assignToName;
          canEdit = data.canEdit == 1 ? true : false;
          canSubmit = data.canSubmit == 1 ? true : false;
          canAssignTo = data.isAssignTo == 1 ? true : false;
          taskStatusId = data.taskStatusId;
          taskStatusName = data.taskStatusName;

          self.setState({
            canAssignTo,
            taskStatusId,
            taskStatusName,
            canEdit,
            canSubmit,
            departmentID,
            funcationID,
            priorityID,
            assignToID,
            taskTitle,
            taskDetails,
            issueRaisedBy,
            storeName,
            storeAddress,
            assignToName,
          });
          if (funcationID > 0) {
            setTimeout(() => {
              self.handleGetFuncationByDepartmentId();
            }, 10);
          }
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleStoreTaskDetialsById");
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

  ///handle get assign to
  handleGetAssignTo() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
    })
      .then(function(response) {})
      .catch((response) => {
        console.log(response, "---handleGetAssignTo");
      });
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

  ////handle get task history
  handleGetTaskHistory() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetTaskHistory",
      headers: authHeader(),
      params: {
        TaskID: this.state.taskId,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var historyData = response.data.responseData;
        if (message === "Success" && historyData.length > 0) {
          self.setState({ historyData, historyModal: true });
        } else {
          self.setState({ historyData, historyModal: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetTaskHistory");
      });
  }
  ////handle get user dropdown
  handleGetUserDropdown(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/UserDropdown",
      headers: authHeader(),
      params: {
        TaskID: taskId,
      },
    })
      .then(function(response) {
        var userData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && userData.length > 0) {
          self.setState({
            userData,
          });
        } else {
          self.setState({ userData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetUserDropdown");
      });
  }
  ////handle assign task
  handleAssignTask() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/AssignTask",
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

  ////handle Update Task
  handleUpdateTask(statusId) {
    let self = this;

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
          url: config.apiUrl + "/StoreTask/UpdateTaskStatus",
          headers: authHeader(),
          data: inputParam,
        })
          .then(function(response) {
            var message = response.data.message;
            if (message === "Success") {
              setTimeout(() => {
                NotificationManager.success("Task Submited Successfully.");
                self.props.history.push("/store/StoreTask");
              }, 2000);
            } else {
              NotificationManager.error("Task Submited Failed.");
            }
          })
          .catch((response) => {
            console.log(response, "---handleUpdateTask");
          });
      }
    }, 10);
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
        TaskBy: 1,
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
    if (name == "assignto") {
      if (value !== 0) {
        this.setState({
          assignToID: value,
          isassignto: "",
        });
      } else {
        this.setState({
          isassignto: "Please Select Assign To.",
          assignToID: value,
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
  ////handle on close history model
  onCloseModal = (e) => {
    this.setState({ historyModal: false });
  };
  ////handle user model open
  handleUserModelOpen() {
    this.setState({ userModel: true });
  }
  ////handle user model close
  handleUserModelClose() {
    this.setState({ userModel: false });
  }
  render() {
    return (
      <Fragment>
        <div className="edit-storeTask-header">
          <label className="store-header-lbl">
            Store ticket id : <span>{this.state.taskId}</span>
          </label>
          <a
            className="loading-rectangle-cntr"
            onClick={this.handleGetTaskHistory.bind(this)}
            style={{ top: "0" }}
          >
            <img
              src={LoadingImg}
              alt="Loading"
              className="loading-rectangle m-0"
              title="Store Task Historical"
            />
          </a>
          <div className="btnstore-last">
            <a
              className="d-inline-block"
              onClick={this.handleUserModelOpen.bind(this)}
            >
              <div className="oval-5-1-new-store">
                <img src={storeImg} alt="headphone" className="storeImg-11" />
              </div>
              <label className="naman-r">{this.state.assignToName}</label>
              <img src={DownImg} alt="down" className="down-header" />
            </a>

            {/* <button
              type="button"
              className={
                this.state.canSubmit
                  ? "submitAs-reopen"
                  : "submitAs-reopen disabled-link"
              }
              onClick={this.handleUpdateTask.bind(this)}
            >
              <label
                className="myticket-submit-solve-button-text"
                style={{ marginLeft: "0" }}
              >
                SUBMIT
              </label>
            </button> */}
            <button
              type="button"
              className={
                this.state.canSubmit
                  ? "btn-store-resolved"
                  : "btn-store-resolved disabled-link"
              }
              onClick={this.handleSubmitReopnModalOpen.bind(this)}
            >
              <label className="myticket-submit-solve-button-text">
                SUBMIT AS RESOLVED
              </label>
              <img src={DownWhiteImg} alt="headphone" className="down-white" />
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
                    onClick={this.handleUpdateTask.bind(this, 222)}
                  >
                    Submit as <span className="modal-lbl-1">ReOpen</span>
                  </label>
                </div>
              ) : (
                <div className="row">
                  <label
                    className="modal-lbl"
                    
                    onClick={this.handleUpdateTask.bind(this, 222)}
                  >
                    Submit as <span className="modal-lbl-1">Solved</span>
                  </label>
                </div>
              )}
              {this.state.taskStatusId !== 222 ? (
                <div className="row" style={{ marginTop: "8px" }}>
                  <label
                    className="modal-lbl"
                    onClick={this.handleUpdateTask.bind(this, 223)}
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
            <div className="card store-card-padding h-100">
              <label className="store-Edit-lbl"> Task Title</label>
              <input
                type="text"
                className={
                  this.state.canEdit
                    ? "store-edit-txt"
                    : "disabled-link store-edit-txt"
                }
                placeholder="Enter Task Title"
                value={this.state.taskTitle}
                name="tasktitle"
                onChange={this.handleOnchange}
              />
              {this.state.istaskTitle !== "" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.istaskTitle}
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
                        : "disabled-link form-control dropdown-label"
                    }
                    value={this.state.departmentID}
                    onChange={this.handleOnchange}
                    name="department"
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
                        : "disabled-link form-control dropdown-label"
                    }
                    value={this.state.funcationID}
                    name="funcation"
                    onChange={this.handleOnchange}
                  >
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
                        : "disabled-link textarea-store"
                    }
                    onChange={this.handleOnchange}
                    value={this.state.taskDetails}
                    name="taskdetails"
                  ></textarea>
                  {this.state.istaskDetails !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.istaskDetails}
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
                    onChange={this.handleOnchange}
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
                      <div id={i}>
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
                            <p className="store-cmt-comment">{item.comment}</p>
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
            <div className="card store-card-2 h-100">
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
                    {this.state.issueRaisedBy}
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
                  <label className="task-clouserDate">Task Closure Date</label>
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
        {/* --------------------------History Model -----------------*/}
        <div className="historical-model">
          <Modal
            open={this.state.historyModal}
            onClose={this.onCloseModal.bind(this)}
            closeIconId="sdsg"
            modalId="Historical-popup"
            overlayId="logout-ovrly"
            classNames={{ modal: "historical-popup" }}
          >
            <label className="lblHistorical">Ticket Historical</label>
            <img
              src={CancelImg}
              alt="cancelImg"
              className="cancalImg"
              onClick={this.onCloseModal.bind(this)}
            />
            {/* <HistoricalTable /> */}
            <div className="tic-history tic-his varunoverflow">
              <ReactTable
                data={this.state.historyData}
                columns={[
                  {
                    Header: <span>Name</span>,
                    accessor: "name",
                    width: 150,
                  },
                  {
                    Header: <span>Action</span>,
                    accessor: "action",
                  },
                  {
                    Header: <span>Time & Date</span>,
                    accessor: "dateandTime",
                    width: 200,
                    Cell: (row) => {
                      var date = row.original["dateandTime"];
                      return (
                        <span>
                          {moment(date).format("M/D/YYYY")} &nbsp;
                          {moment(date).format("HH:mm")}
                        </span>
                      );
                    },
                  },
                ]}
                resizable={false}
                defaultPageSize={5}
                showPagination={false}
              />
            </div>
          </Modal>
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
                onClick={this.handleAssignTask.bind(this)}
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

export default withRouter(EditStoreTask);
