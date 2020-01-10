import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import config from "./../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../helpers/authHeader";

class TicketSystemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      taskDescription: "",
      taskId:0,
      taskfield: {},
      taskData: [],
      DepartmentData: [],
      FunctionData: [],
      AssignToData: [],
      TicketPriorityData: [],
      selectedDepartment: 0,
      selectedFunction: 0,
      selectedAssignTo: 0,
      selectedPriority: 0,
    };
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleGetAssignToList = this.handleGetAssignToList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.handleGetDepartmentList();
    this.handleGetTicketPriorityList();
  }

  checkTaskTitDesc(filed, e) {
    debugger;
    var taskfield = this.state.taskfield;
    taskfield[filed] = e.target.value;

    if (filed === "taskTitle") {
      this.setState({ taskfield });
    } else {
      this.setState({ taskfield });
    }
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
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment,
      }
    }).then(function(res) {
      debugger;
      let FunctionData = res.data.responseData;
      self.setState({ FunctionData: FunctionData });
    });
  }
  handleGetAssignToList() {
    debugger;

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
      let TicketPriorityData = res.data.responseData;
      self.setState({ TicketPriorityData: TicketPriorityData });
    });
  }

  setDepartmentValue = e => {
    let departmentValue = e.target.value;
    var taskfield = this.state.taskfield;
    taskfield[e.target.name] = e.target.selectedOptions[0].text;
    taskfield["DepartmentId"] = departmentValue;
    this.setState({ selectedDepartment: departmentValue, taskfield});

    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = e => {
    let functionValue = e.currentTarget.value;
    var taskfield = this.state.taskfield;
    taskfield[e.currentTarget.name] = e.target.selectedOptions[0].text;
    taskfield["FunctionID"] =functionValue;
    this.setState({ selectedFunction: functionValue, taskfield });

    setTimeout(() => {
      if (this.state.selectedFunction) {
        this.handleGetAssignToList();
      }
    }, 1);
  };
  setAssignToValue = e => {
    let assignToValue = e.currentTarget.value;
    var taskfield = this.state.taskfield;
    taskfield[e.currentTarget.name] = e.target.selectedOptions[0].text;
    taskfield["AssignToID"] = assignToValue;
    this.setState({ selectedAssignTo: assignToValue, taskfield });
  };
  setPriorityValue = e => {
    let priorityValue = e.currentTarget.value;
    var taskfield = this.state.taskfield;
    taskfield[e.currentTarget.name] = e.target.selectedOptions[0].text;
    taskfield["PriorityID"] = priorityValue;
    this.setState({ selectedPriority: priorityValue, taskfield });
  };
  
  handleCreateTask() {
    debugger;
   
    if (this.validator.allValid()) {
      if (this.state.taskfield) {
        var taskData = [];
        taskData = this.state.taskData;

      this.state.taskfield["ID"] = taskData.length + 1;
      //  var taskId= this.state.taskfield["ID"];
        taskData.push(this.state.taskfield);
        {this.props.taskMasterData(taskData)}
        this.setState({
          taskData,
        //  taskId : taskData.length + 1,
          taskfield: {
            ID:0,
            taskTitle: "",
            taskDescription: "",
            Department: "",
            Funcation: "",
            Priority: "",
            AssignTo: ""
          },
          selectedDepartment: 0,
          selectedFunction: 0,
          selectedAssignTo: 0,
          selectedPriority: 0
        });

        NotificationManager.success("Task created successfully.");
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleTaskDelete(i){
    debugger
    let taskData = [...this.state.taskData];
    taskData.splice((i-1),1);
     this.setState({ taskData });
  }
  render() {
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
                      Created Task
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
                          placeholder="Task Title"
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
                          placeholder="Task Description"
                          name="taskDescription"
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
                    <div className="row m-b-10">
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
                            Priority
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
                    <div className="row m-b-10">
                      <div className="col-md-6">
                        <button
                          type="button"
                          className="createtasksystem createtasksystem-text"
                          onClick={this.handleCreateTask.bind(this)}
                        >
                          CREATE TASK
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
                      {this.state.taskData.length} Task Created
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
                    <ReactTable
                      data={taskData}
                      columns={[
                        {
                          Header: <span>Task Title</span>,
                          accessor: "taskTitle"
                        },
                        {
                          Header: <span>Assign To</span>,
                          accessor: "AssignTo"
                        },
                        {
                          Header: <span>Actions</span>,
                          accessor: "actionReport",
                          Cell: row => (
                            <span>
                              <img
                                src={DeleteIcon}
                                alt="del-icon"
                                className="downloadaction"
                                onClick={this.handleTaskDelete(row.original.ID)}
                              />
                            </span>
                          )
                        }
                      ]}
                      // resizable={false}
                      defaultPageSize={5}
                      showPagination={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </Fragment>
    );
  }
}

export default TicketSystemTask;
