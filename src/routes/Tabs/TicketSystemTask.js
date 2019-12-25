import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import config from "./../../helpers/config";

class TicketSystemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      taskDesc: "",
      DepartmentData: [],
      FunctionData: [],
      selectedDepartment: 0,
      selectedFunction: 0,
      tenantID: 1
    };
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.validator = new SimpleReactValidator();
  }

  checkTaskTitDesc = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  componentDidMount() {
    this.handleGetDepartmentList();
  }

  handleGetDepartmentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Master/getDepartmentList",
      params: {
        TenantID: this.state.tenantID
      }
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      params: {
        DepartmentId: 1,
        TenantID: this.state.tenantID
        // DepartmentId: this.state.selectedDepartment
      }
    }).then(function(res) {
      debugger;
      let FunctionData = res.data.responseData;
      self.setState({ FunctionData: FunctionData });
    });
  }

  setDepartmentValue = e => {
    debugger;
    let departmentValue = e.currentTarget.value;
    this.setState({ selectedDepartment: departmentValue });

    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = e => {
    let functionValue = e.currentTarget.value;
    this.setState({ selectedFunction: functionValue });
  };

  handleCreateTask() {
    debugger;

    if (this.validator.allValid()) {
      // axios({
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Methods": "*"
      //   },
      //   url: config.apiUrl + "/Customer/createCustomer",
      //   data: {
      //     TenantID: this.state.tenantID,
      //     CustomerName: this.state.fullName,
      //     CustomerPhoneNumber: this.state.mobileNumber,
      //     CustomerEmailId: this.state.emailId,
      //     GenderID: this.state.genderId,
      //     AltNumber: this.state.alternateNumber,
      //     AltEmailID: this.state.alternateEmailId,
      //     DateOfBirth: moment(this.state.dob).format("L"),
      //     IsActive: 1,
      //     CreatedBy: 1,
      //     ModifyBy: 1,
      //     ModifiedDate: "2019-12-17"
      //   }
      // }).then(function(res) {
      //   debugger;
      //   console.log(JSON.stringify(res.data.responseData));
      // });
      alert("Success");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }

    // axios.post(config.apiUrl + "/Customer/createCustomer", requestOptions)
  }

  render() {
    const datatask = [
      {
        taskTitle: "Store door are not working",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      }
    ];

    const columnstask = [
      {
        Header: <span>Task Title</span>,
        accessor: "taskTitle"
      },
      {
        Header: <span>Assign To</span>,
        accessor: "assignTo"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actionReport",
        Cell: row => (
          <span>
            <img src={DeleteIcon} alt="del-icon" className="downloadaction" />
          </span>
        )
      }
    ];
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
                        {/* <select className="category-select-system">
                      <option className="select-category-placeholder">
                        Department
                      </option>
                    </select> */}
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Task Title"
                          name="taskTitle"
                          onChange={this.checkTaskTitDesc}
                        />
                        {this.validator.message(
                          "Task Title",
                          this.state.taskTitle,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-12">
                        <textarea
                          className="addNote-textarea-system"
                          placeholder="Task Description"
                          name="taskDesc"
                          onChange={this.checkTaskTitDesc}
                        ></textarea>
                        {this.validator.message(
                          "Task Description",
                          this.state.taskDesc,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-6">
                        <select
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
                        <select className="category-select-system dropdown-label">
                          <option className="select-category-placeholder dropdown-label">
                            Assign To
                          </option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <select className="category-select-system dropdown-label">
                          <option className="select-sub-category-placeholder">
                            Priority
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="row m-b-10">
                      <div className="col-md-6">
                        <button
                          type="button"
                          className="createtasksystem"
                          onClick={this.handleCreateTask}
                        >
                          <label className="createtasksystem-text">
                            CREATE TASK
                          </label>
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
                      05 Task Created
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
                      data={datatask}
                      columns={columnstask}
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
      </Fragment>
    );
  }
}

export default TicketSystemTask;
