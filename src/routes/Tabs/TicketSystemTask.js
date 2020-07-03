import React, { Component, Fragment } from "react";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../assets/Images/del-big.png";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { Popover, Table } from "antd";
import config from "../../helpers/config";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../../helpers/authHeader";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";

class TicketSystemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      taskDescription: "",
      taskId: 0,
      taskfield: {},
      taskData: [],
      DepartmentData: [],
      FunctionData: [],
      AssignToData: [],
      TicketPriorityData: [],
      selectedDepartment: "",
      selectedFunction: "",
      selectedAssignTo: "",
      selectedPriority: "",
      translateLanguage: {},
    };
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    // this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleGetAssignToList = this.handleGetAssignToList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.validator = new SimpleReactValidator();
    this.handleGetTaskGridData = this.handleGetTaskGridData.bind(this);
  }

  componentDidMount() {
    this.handleGetDepartmentList();
    this.handleGetTicketPriorityList();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  componentDidUpdate() {
    if (this.props.checkTask === true) {
      if (this.props.ticket_IDS) {
        this.handleGetTaskGridData(this.props.ticket_IDS);
      }
    }
  }

  ////handle Get Task Grid Data
  handleGetTaskGridData(Id) {
    this.props.parentCallBackFuncation("task");
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/gettasklist",
      headers: authHeader(),
      params: {
        TicketId: Id,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;

        if (status === "Success") {
          self.setState({ taskData: data });
        } else {
          self.setState({ taskData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  checkTaskTitDesc(filed, e) {
    var taskfield = this.state.taskfield;
    taskfield[filed] = e.target.value;

    if (filed === "taskTitle") {
      this.setState({ taskfield });
    } else {
      this.setState({ taskfield });
    }
  }

  ////handle get department list
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ DepartmentData: data });
        } else {
          self.setState({ DepartmentData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetFunctionList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment,
      },
    })
      .then(function(res) {
        let FunctionData = res.data.responseData;
        self.setState({ FunctionData: FunctionData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetAssignToList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssignedTo",
      headers: authHeader(),
      params: {
        Function_ID: this.state.selectedFunction,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ AssignToData: data });
        } else {
          self.setState({ AssignToData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTicketPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setDepartmentValue = (e) => {
    let departmentValue = e.target.value;
    var taskfield = this.state.taskfield;
    taskfield[e.target.name] = e.target.selectedOptions[0].text;
    taskfield["DepartmentId"] = departmentValue;
    this.setState({ selectedDepartment: departmentValue, taskfield });

    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = (e) => {
    let functionValue = e.currentTarget.value;
    var taskfield = this.state.taskfield;
    taskfield[e.currentTarget.name] = e.target.selectedOptions[0].text;
    taskfield["FunctionID"] = functionValue;
    this.setState({ selectedFunction: functionValue, taskfield });

    setTimeout(() => {
      if (this.state.selectedFunction) {
        this.handleGetAssignToList();
      }
    }, 1);
  };
  setAssignToValue = (e) => {
    debugger;
    let assignToValue = e.currentTarget.value;

    var taskfield = this.state.taskfield;
    taskfield[e.currentTarget.name] = e.target.selectedOptions[0].text;
    taskfield["AssignToID"] = assignToValue;
    if (assignToValue !== null) {
      var assignname = this.state.AssignToData.filter(
        (x) => x.userID === Number(assignToValue)
      )[0].userName;
      taskfield["assignName"] = assignname;
    }
    this.setState({ selectedAssignTo: assignToValue, taskfield });
  };
  setPriorityValue = (e) => {
    let priorityValue = e.currentTarget.value;
    var taskfield = this.state.taskfield;
    taskfield[e.currentTarget.name] = e.target.selectedOptions[0].text;
    taskfield["PriorityID"] = priorityValue;
    this.setState({ selectedPriority: priorityValue, taskfield });
  };

  handleCreateTask() {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    if (this.validator.allValid()) {
      if (this.state.taskfield) {
        var taskData = [];
        taskData = this.state.taskData;

        this.state.taskfield["ID"] = taskData.length + 1;
        this.state.taskfield["ticketingTaskID"] = 0;
        //  var taskId= this.state.taskfield["ID"];
        taskData.push(this.state.taskfield);
        {
          this.props.taskMasterData(taskData);
        }
        this.setState({
          taskData,
          //  taskId : taskData.length + 1,
          taskfield: {
            ticketingTaskID: 0,
            ID: 0,
            taskTitle: "",
            taskDescription: "",
            Department: "",
            Funcation: "",
            Priority: "",
            AssignTo: "",
          },
          selectedDepartment: "",
          selectedFunction: "",
          selectedAssignTo: "",
          selectedPriority: "",
        });
        NotificationManager.success(
          TranslationContext !== undefined
            ? TranslationContext.span.taskcreatedsuccfully
            : "Task created successfully."
        );
        this.validator.hideMessages();
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleTaskDelete = (i) => {
    let taskData = [...this.state.taskData];
    taskData.splice(i - 1, 1);
    this.setState({ taskData });
  };
  hide(e, id) {
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { taskData } = this.state;
    return (
      <Fragment>
        <div className="ticketSycard">
          <div className="ticketSycard1">
            <div id="accordion">
              <div className="">
                <div className="card-header collapsetask" id="headingOne">
                  <h5 className="mb-8 drop">
                    <label
                      className="btn btn-link drop1"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createdtask
                        : "Created Task"}
                    </label>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <div className="row m-b-10">
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="txt-1"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.tasktitle
                              : "Task Title"
                          }
                          name="taskTitle"
                          value={this.state.taskfield.taskTitle}
                          onChange={this.checkTaskTitDesc.bind(
                            this,
                            "taskTitle"
                          )}
                        />
                        {this.validator.message(
                          "Task Title",
                          this.state.taskfield.taskTitle,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-12">
                        <textarea
                          className="addNote-textarea-system"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.taskdescription
                              : "Task Description"
                          }
                          name="taskDescription"
                          maxLength={250}
                          value={this.state.taskfield.taskDescription}
                          onChange={this.checkTaskTitDesc.bind(
                            this,
                            "taskDescription"
                          )}
                        ></textarea>
                        {this.validator.message(
                          "Task Description",
                          this.state.taskfield.taskDescription,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-6">
                        <select
                          name="Department"
                          className="category-select-system dropdown-label"
                          value={this.state.selectedDepartment}
                          onChange={this.setDepartmentValue}
                        >
                          <option
                            value=""
                            className="select-category-placeholder"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.department
                              : "Department"}
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
                        {this.validator.message(
                          "Department",
                          this.state.selectedDepartment,
                          "required"
                        )}
                      </div>
                      <div className="col-md-6">
                        <select
                          name="Function"
                          className="category-select-system dropdown-label"
                          value={this.state.selectedFunction}
                          onChange={this.setFunctionValue}
                        >
                          <option
                            value=""
                            className="select-sub-category-placeholder"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.function
                              : "Function"}
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
                        {this.validator.message(
                          "Function",
                          this.state.selectedFunction,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-6">
                        <select
                          name="AssignTo"
                          value={this.state.selectedAssignTo}
                          onChange={this.setAssignToValue}
                          className="category-select-system dropdown-label"
                        >
                          <option
                            value=""
                            className="select-category-placeholder"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.assignto
                              : "Assign To"}
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
                        {this.validator.message(
                          "Assign To",
                          this.state.selectedAssignTo,
                          "required"
                        )}
                      </div>
                      <div className="col-md-6">
                        <select
                          name="Priority"
                          value={this.state.selectedPriority}
                          onChange={this.setPriorityValue}
                          className="category-select-system dropdown-label"
                        >
                          <option
                            value=""
                            className="select-sub-category-placeholder"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.priority
                              : "Priority"}
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
                        {this.validator.message(
                          "Priority",
                          this.state.selectedPriority,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-6">
                        <button
                          type="button"
                          className="createtasksystem createtasksystem-text"
                          onClick={this.handleCreateTask.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.label.createtask
                            : "CREATE TASK"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="card-header collapsetask" id="headingTwo">
                  <h5 className="mb-0 drop">
                    <label
                      className="btn btn-link collapsed drop1"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {this.state.taskData.length}{" "}
                      {TranslationContext !== undefined
                        ? TranslationContext.label.taskcreated
                        : "Task Created"}
                    </label>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body systemtaskreact">
                    <Table
                      columns={[
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.id
                              : "ID",
                          dataIndex: "ID",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.tasktitle
                              : "Task Title",
                          dataIndex: "taskTitle",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Assign To",
                          dataIndex: "assignName",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.actions
                              : "Actions",
                          dataIndex: "",
                          render: (row, data) => {
                            var ids = row.ID;
                            return (
                              <>
                                <Popover
                                  content={
                                    <div className="d-flex general-popover popover-body">
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.deletefile
                                            : "Delete file ?"}
                                          
                                        </p>
                                        <p className="mt-1 fs-12">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p
                                                .areyousureyouwanttodeletethisfile
                                            : "Are you sure you want to delete this file"}
                                          ?
                                        </p>
                                        <div className="del-can">
                                          <a href="#!">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.a.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            type="button"
                                            onClick={this.handleTaskDelete.bind(
                                              this,
                                              ids
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.delete
                                              : "Delete"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <img
                                    src={DeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                  />
                                </Popover>
                              </>
                            );
                          },
                        },
                      ]}
                      dataSource={taskData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <NotificationContainer /> */}
      </Fragment>
    );
  }
}

export default TicketSystemTask;
