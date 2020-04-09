import React, { Component, Fragment } from "react";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";

class StoreAddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentData: [],
      funcationData: [],
    };
  }
  componentDidMount() {
    this.handleGetDepartement();
  }
  ////handle create task
  handleCreateTask() {
    let self = this;
    var inputParams = {};
    axios({
      method: "post",
      url: config.apiUrl + "StoreTask/CreateStoreTask",
      headers: authHeader(),
      data: inputParams,
    })
      .then(function(res) {})
      .catch((response) => {
        console.log(response, "---handleCreateTask");
      });
  }
  ////handle get department list
  handleGetDepartement() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(res) {
        console.log(JSON.stringify(res));
      })
      .catch((response) => {
        console.log(response, "---handleGetDepartement");
      });
  }
  ///handle get funcation by department id
  handleGetFuncationByDepartmentId() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: { DepartmentId: "" },
    })
      .then(function(res) {})
      .catch((response) => {
        console.log(response, "---handleGetFuncationByDepartmentId");
      });
  }

  ///handle get assign to
  handleGetAssignTo() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
    })
      .then(function(res) {})
      .catch((response) => {
        console.log(response, "---handleGetAssignTo");
      });
  }

  render() {
    return (
      <Fragment>
        <div className="row card1">
          <div className="col-md-8">
            <div className="card" style={{ padding: "35px 35px" }}>
              <label className="store-Edit-lblcre">Create Task</label>
              <label className="store-Edit-lbl1"> Task Title</label>
              <input
                type="text"
                className="store-edit-txt"
                placeholder="Wifi is not working from 5hrs"
              />

              <div className="row">
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">Department</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                  >
                    <option>Select</option>
                    <option>Internet</option>
                  </select>
                </div>
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">Function</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                  >
                    <option>Select</option>
                    <option>Wifi</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">Priority</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                  >
                    <option>Select</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">Assign to</label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                  >
                    <option>Select</option>
                    <option>Naman</option>
                    <option>Rachita</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 store-mrg">
                  <label className="store-Edit-lbl1">Task Details</label>
                  <textarea
                    rows="8"
                    className="textarea-store"
                    placeholder="Customer History/Security Check when.."
                  ></textarea>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 store-mrg">
                  <button className="butn-store">SUBMIT TASK</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card cardmargin"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreAddTask;
