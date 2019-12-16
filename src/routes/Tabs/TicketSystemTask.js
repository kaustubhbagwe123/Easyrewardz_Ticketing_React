import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import DeleteIcon from "./../../assets/Images/red-delete-icon.png";

class TicketSystemTask extends Component {
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
                    <select className="category-select-system">
                      <option className="select-category-placeholder">
                        Department
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row m-b-10">
                  <div className="col-md-12">
                    <textarea
                      className="addNote-textarea-system"
                      placeholder="Task Description"
                    ></textarea>
                  </div>
                </div>
                <div className="row m-b-10">
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-category-placeholder dropdown-label">
                        Department
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="category-select-system dropdown-label">
                      <option className="select-sub-category-placeholder">
                        Function
                      </option>
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
                    <button type="button" className="createtasksystem">
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
