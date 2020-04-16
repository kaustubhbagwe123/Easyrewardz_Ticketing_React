import React, { Component } from "react";
import Campaign from "./Campaign";
import InfoIcon from "../../assets/Images/info-icon.png";
import Demo from "../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";

class StoreTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raisedByMeData: [],
      assignToMeData: [],
      taskByTicketData: [],
      campaignData: [],
      isloading: false,
    };
    this.handleGetTaskData = this.handleGetTaskData.bind(this);
  }

  componentDidMount() {
    this.handleGetTaskData(1);
  }
  handleChangeStoreTask() {
    this.props.history.push("/store/editStoreTask");
  }
  handleChangeTaskByTicket() {
    this.props.history.push("/store/storeTaskByTicket");
  }
  handleChagneAddTask() {
    this.props.history.push("storeAddTask");
  }

  ////handle row click raised by me table
  handleRowClickRaisedTable = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var storeTaskID = column.original["storeTaskID"];
        this.handleRedirectToEditStoreTask(storeTaskID);
      },
    };
  };
  ////handle redirect to edit store task
  handleRedirectToEditStoreTask(storeTaskID) {
    debugger;
    this.props.history.push({
      pathname: "editStoreTask",
      state: { TaskID: storeTaskID },
    });
  }
  HandleRowTaskByClickPage = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var storeTaskID = column.original["storeTaskID"];
        var ticketid = column.original["ticketID"];
        this.handleRedirectToStoreTaskByTicket(storeTaskID,ticketid);
      },
    };
  };
   ////handle redirect to store Task By Ticket
   handleRedirectToStoreTaskByTicket(storeTaskID,ticketid) {
    debugger;
    this.props.history.push({
      pathname: "/store/storeTaskByTicket",
      state: { TaskID: storeTaskID, TicketID: ticketid },
    });
  }
  ////handle get task data by tab click
  handleGetTaskData(tabFor) {
    debugger;
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskList",
      headers: authHeader(),
      params: { tabFor: tabFor },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          if (tabFor === 1) {
            self.setState({ raisedByMeData: responseData, isloading: false });
          }
          if (tabFor === 2) {
            self.setState({ assignToMeData: responseData, isloading: false });
          }
        } else {
          if (tabFor === 1) {
            self.setState({ raisedByMeData: responseData, isloading: false });
          }
          if (tabFor === 2) {
            self.setState({ assignToMeData: responseData, isloading: false });
          }
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }

  handleGetTaskbyTicket() {
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskByTicket",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var taskByTicketData = response.data.responseData;
        if (message == "Success" && taskByTicketData.length > 0) {
          self.setState({ isloading: false, taskByTicketData });
        } else {
          self.setState({ isloading: false, taskByTicketData });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskbyTicket");
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="store-task-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#raised-by-me-tab"
                role="tab"
                aria-controls="raised-by-me-tab"
                aria-selected="true"
                onClick={this.handleGetTaskData.bind(this, 1)}
              >
                Raised by Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#assigned-to-me-tab"
                role="tab"
                aria-controls="assigned-to-me-tab"
                aria-selected="false"
                onClick={this.handleGetTaskData.bind(this, 2)}
              >
                Assigned To Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#task-by-tickets-tab"
                role="tab"
                aria-controls="task-by-tickets-tab"
                aria-selected="false"
                onClick={this.handleGetTaskbyTicket.bind(this)}
              >
                Task By Tickets
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#campaign-tab"
                role="tab"
                aria-controls="campaign-tab"
                aria-selected="false"
              >
                Campaign
              </a>
            </li>
          </ul>
          <button
            className="butn"
            onClick={this.handleChagneAddTask.bind(this)}
          >
            Add Task
          </button>
        </div>
        <div
          className="tab-content store-task-tab-cont"
          style={{ padding: "15px" }}
        >
          <div
            className="tab-pane fade show active"
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div className="table-cntr raisereactTable">
                <ReactTable
                  data={this.state.raisedByMeData}
                  columns={[
                    {
                      Header: <span>ID</span>,
                      accessor: "storeTaskID",
                    },
                    {
                      Header: <span>Status</span>,
                      accessor: "taskStatus",
                      Cell: (row) => {
                        return (
                          <span className="table-btn table-blue-btn">
                            <label>{row.original.taskStatus}</label>
                          </span>
                        );
                      },
                    },
                    {
                      Header: <span>Task Title</span>,
                      accessor: "taskTitle",
                    },
                    {
                      Header: (
                        <span>
                          Department <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "departmentName",
                      Cell: (row) => {
                        return (
                          <>
                            {row.original.departmentName}
                            <Popover
                              content={
                                <div className="dash-creation-popup-cntr">
                                  <ul className="dash-category-popup dashnewpopup">
                                    <li>
                                      <p>Function</p>
                                      <p>{row.original.functionName}</p>
                                    </li>
                                  </ul>
                                </div>
                              }
                              placement="bottom"
                            >
                              <img
                                className="info-icon"
                                src={InfoIcon}
                                alt="info-icon"
                              />
                            </Popover>
                          </>
                        );
                      },
                    },
                    {
                      Header: (
                        <span>
                          Store Name <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "storeName",
                    },
                    {
                      Header: (
                        <span>
                          Priority <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "priorityName	",
                      Cell: (row) => {
                        return <span>{row.original.priorityName}</span>;
                      },
                    },
                    {
                      Header: (
                        <span>
                          Creation On <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "creationOn",
                      Cell: (row) => (
                        <span>
                          <label>{row.original.creationOn}</label>

                          <Popover
                            content={
                              <div className="insertpop1">
                                <ul className="dash-creation-popup">
                                  <li className="title">Creation details</li>
                                  <li>
                                    <p>{row.original.createdBy + " Created"}</p>
                                    <p>{row.original.createdago}</p>
                                  </li>
                                  <li>
                                    <p>
                                      Assigned to {" " + row.original.assignto}
                                    </p>
                                    <p>{row.original.assignedago}</p>
                                  </li>
                                  <li>
                                    <p>
                                      {row.original.updatedBy + " "} updated
                                    </p>
                                    <p>{row.original.updatedago}</p>
                                  </li>
                                  <li>
                                    <p>Response time remaining by</p>
                                    <p>30 mins</p>
                                  </li>
                                  <li>
                                    <p>Response overdue by</p>
                                    <p>1 Hr</p>
                                  </li>
                                  <li>
                                    <p>Resolution overdue by</p>
                                    <p>2 Hrs</p>
                                  </li>
                                </ul>
                              </div>
                            }
                            placement="left"
                          >
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </Popover>
                        </span>
                      ),
                    },
                    {
                      Header: (
                        <span>
                          Assign to
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "assignto",
                      // Cell: (props) => (
                      //   <span>
                      //     <label>A, Bansal</label>
                      //   </span>
                      // ),
                    },
                  ]}
                  // resizable={false}
                  defaultPageSize={10}
                  minRows={2}
                  showPagination={true}
                  getTrProps={this.handleRowClickRaisedTable}
                />
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div>
                <div className="table-cntr">
                  <ReactTable
                    data={this.state.assignToMeData}
                    columns={[
                      {
                        Header: <span>ID</span>,
                        accessor: "storeTaskID",
                      },
                      {
                        Header: <span>Status</span>,
                        accessor: "taskStatus",
                        Cell: (row) => {
                          return (
                            <span className="table-btn table-blue-btn">
                              <label>{row.original.taskStatus}</label>
                            </span>
                          );
                        },
                      },
                      {
                        Header: <span>Task Title</span>,
                        accessor: "taskTitle",
                      },
                      {
                        Header: (
                          <span>
                            Department <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "departmentName",
                        Cell: (row) => {
                          return (
                            <span>
                              <label>{row.original.departmentName}</label>
                              <Popover
                                content={
                                  <div className="dash-creation-popup-cntr">
                                    <ul className="dash-category-popup dashnewpopup">
                                      <li>
                                        <p>Function</p>
                                        <p>{row.original.functionName}</p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          );
                        },
                      },
                      {
                        Header: (
                          <span>
                            Created by <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdBy",
                      },
                      {
                        Header: (
                          <span>
                            Priority <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "priorityName",
                      },
                      {
                        Header: (
                          <span>
                            Store Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeName",
                        Cell: (row) => {
                          return (
                            <span>
                              <label>{row.original.storeName}</label>
                              <Popover
                                content={
                                  <div className="dash-creation-popup-cntr">
                                    <ul className="dash-category-popup dashnewpopup">
                                      <li>
                                        <p>Store Name</p>
                                        <p>ABS</p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          );
                        },
                      },
                      {
                        Header: (
                          <span>
                            Creation On <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "creationOn",
                        Cell: (row) => {
                          return (
                            <span>
                              <label>{row.original.creationOn}</label>

                              <Popover
                                content={
                                  <div className="insertpop1">
                                    <ul className="dash-creation-popup">
                                      <li className="title">
                                        Creation details
                                      </li>
                                      <li>
                                        <p>
                                          {row.original.createdBy + " Created"}
                                        </p>
                                        <p>{row.original.createdago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          Assigned to{" "}
                                          {" " + row.original.assignto}
                                        </p>
                                        <p>{row.original.assignedago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          {row.original.updatedBy + " "} updated
                                        </p>
                                        <p>{row.original.updatedago}</p>
                                      </li>
                                      <li>
                                        <p>Response time remaining by</p>
                                        <p>30 mins</p>
                                      </li>
                                      <li>
                                        <p>Response overdue by</p>
                                        <p>1 Hr</p>
                                      </li>
                                      <li>
                                        <p>Resolution overdue by</p>
                                        <p>2 Hrs</p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="left"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          );
                        },
                      },
                    ]}
                    // resizable={false}
                    minRows={2}
                    defaultPageSize={10}
                    showPagination={true}
                    getTrProps={this.HandleRowClickPage}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="task-by-tickets-tab"
            role="tabpanel"
            aria-labelledby="task-by-tickets-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div>
                <div className="table-cntr taskByTable">
                  <ReactTable
                    data={this.state.taskByTicketData}
                    columns={[
                      {
                        Header: <span>Task ID</span>,
                        accessor: "storeTaskID",
                      },
                      {
                        Header: <span>Ticket ID</span>,
                        accessor: "ticketID",
                      },
                      {
                        Header: <span>Status</span>,
                        accessor: "taskStatus",
                        Cell: (row) => {
                          return (
                            <span className="table-btn table-blue-btn">
                              <label>{row.original.taskStatus}</label>
                            </span>
                          );
                        },
                      },
                      {
                        Header: <span>Task Title</span>,
                        accessor: "taskTitle",
                      },
                      {
                        Header: (
                          <span>
                            Department <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "departmentName",
                        Cell: (row) => {
                          return (
                            <>
                              {row.original.departmentName}
                              <Popover
                                content={
                                  <div className="dash-creation-popup-cntr">
                                    <ul className="dash-category-popup dashnewpopup">
                                      <li>
                                        <p>Function</p>
                                        <p>{row.original.functionName}</p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </>
                          );
                        },
                      },
                      {
                        Header: (
                          <span>
                            Created by <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdBy",
                      },
                      {
                        Header: (
                          <span>
                            Store Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeName",
                        Cell: (row) => {
                          return (
                            <span>
                              <label>{row.original.storeName}</label>
                              <Popover
                                content={
                                  <div className="dash-creation-popup-cntr">
                                    <ul className="dash-category-popup dashnewpopup">
                                      <li>
                                        <p>Store Address</p>
                                        <p>{row.original.storeAddress}</p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          );
                        },
                      },
                      {
                        Header: (
                          <span>
                            Creation On <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "creationOn",
                        Cell: (row) => (
                          <span>
                            <label>{row.original.creationOn}</label>

                            <Popover
                              content={
                                <div className="insertpop1">
                                  <ul className="dash-creation-popup">
                                    <li className="title">Creation details</li>
                                    <li>
                                      <p>
                                        {row.original.createdBy + " "} Created
                                      </p>
                                      <p>{row.original.createdago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        Assigned to{" "}
                                        {" " + row.original.assignto}
                                      </p>
                                      <p>{row.original.assignedago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {row.original.updatedBy + " "} updated
                                      </p>
                                      <p>{row.original.updatedago}</p>
                                    </li>
                                    <li>
                                      <p>Response time remaining by</p>
                                      <p>30 mins</p>
                                    </li>
                                    <li>
                                      <p>Response overdue by</p>
                                      <p>1 Hr</p>
                                    </li>
                                    <li>
                                      <p>Resolution overdue by</p>
                                      <p>2 Hrs</p>
                                    </li>
                                  </ul>
                                </div>
                              }
                              placement="left"
                            >
                              <img
                                className="info-icon"
                                src={InfoIcon}
                                alt="info-icon"
                              />
                            </Popover>
                          </span>
                        ),
                      },
                      {
                        Header: (
                          <span>
                            Assign to
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "assignto",
                      },
                    ]}
                    // resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                    minRows={2}
                    getTrProps={this.HandleRowTaskByClickPage}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="campaign-tab"
            role="tabpanel"
            aria-labelledby="campaign-tab"
          >
            <Campaign />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreTask;
