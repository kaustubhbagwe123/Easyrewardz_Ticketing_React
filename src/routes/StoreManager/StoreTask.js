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
      isloading: false
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
      onClick: e => {
        var storeTaskID = column.original["storeTaskID"];
        this.handleRedirectToEditStoreTask(storeTaskID);
      }
    };
  };
  ////handle redirect to edit store task
  handleRedirectToEditStoreTask(storeTaskID) {
    debugger;
    this.props.history.push({
      pathname: "editStoreTask",
      state: { TaskID: storeTaskID }
    });
  }
  HandleRowTaskByClickPage = () => {
    return {
      onClick: e => {
        this.props.history.push("storeTaskByTicket");
      }
    };
  };
  ////handle get task data by tab click
  handleGetTaskData(tabFor) {
    debugger;
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskList",
      headers: authHeader(),
      params: { tabFor: tabFor }
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
      .catch(response => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }

  render() {
    const DefArti = (
      <div className="dash-creation-popup-cntr">
        <ul className="dash-category-popup dashnewpopup">
          <li>
            <p>Category</p>
            <p>Defective article</p>
          </li>
          <li>
            <p>Sub Category</p>
            <p>Customer wants refund</p>
          </li>
          <li>
            <p>Type</p>
            <p>Delivery</p>
          </li>
        </ul>
      </div>
    );
    const DefArti1 = (
      <div className="dash-creation-popup-cntr">
        <ul className="dash-category-popup dashnewpopup">
          <li>
            <p>Store Name</p>
            <p>ABS</p>
          </li>
        </ul>
      </div>
    );
    const dataRaise = [
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata1</label>
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata2</label>
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata3</label>
      },

      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata1</label>
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata2</label>
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata3</label>
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Hardwares</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata3</label>
      }
    ];

    const columnsRaise = [
      {
        Header: <span>ID</span>,
        accessor: "storeTaskID"
        // Cell: (props) => <label>ABCD123</label>,
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
            Department <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "departmentName"
      },
      {
        Header: (
          <span>
            Store Name <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "storeName"
      },
      {
        Header: (
          <span>
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "priorityName	"
        // Cell: (props) => <span>High</span>,
      },
      {
        Header: (
          <span>
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationOn",
        Cell: props => (
          <span>
            <label>12 March 2018</label>

            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        Header: (
          <span>
            Assign to
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assignto"
        // Cell: (props) => (
        //   <span>
        //     <label>A, Bansal</label>
        //   </span>
        // ),
      }
    ];

    const dataAssign = [
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>ABS</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>HHH</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>BATA</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },

      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>HNM</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>HHH</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>RRT</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Hardwares</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        CreatedBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>HGH</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      }
    ];

    const columnsAssign = [
      {
        Header: <span>ID</span>,
        accessor: "idClose",
        Cell: props => <label>ABCD1234</label>
      },
      {
        Header: <span>Status</span>,
        accessor: "statusNew"
      },
      {
        Header: <span>Task Title</span>,
        accessor: "TaskTitle"
      },
      {
        Header: (
          <span>
            Department <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "DeptName"
      },
      {
        Header: (
          <span>
            Created by <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "CreatedBy"
      },
      {
        Header: (
          <span>
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assigneeNew",
        Cell: props => <span>High</span>
      },
      {
        Header: (
          <span>
            Store Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "StoName"
      },
      {
        Header: (
          <span>
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew",
        Cell: props => (
          <span>
            <label>12 March 2018</label>

            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      }
    ];

    const dataTaskByTick = [
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>ABS</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>HHH</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>BATA</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },

      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>HNM</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>HHH</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>G. Bansal</label>,
        StoName: (
          <span>
            <label>RRT</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Hardwares</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        cretBy: <label>A. Bansal</label>,
        StoName: (
          <span>
            <label>HGH</label>
            <Popover content={DefArti1} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      }
    ];

    const columnsTaskByTick = [
      {
        Header: <span>Task ID</span>,
        accessor: "idClose",
        Cell: props => <label>ABCD1234</label>
      },
      {
        Header: <span>Ticket ID</span>,
        accessor: "idClose",
        Cell: props => <label>ABCD1234</label>
      },
      {
        Header: <span>Status</span>,
        accessor: "statusNew"
      },
      {
        Header: <span>Task Title</span>,
        accessor: "TaskTitle"
      },
      {
        Header: (
          <span>
            Department <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "DeptName"
      },
      {
        Header: (
          <span>
            Created by <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "cretBy"
      },
      {
        Header: (
          <span>
            Store Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "StoName"
      },
      {
        Header: (
          <span>
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew",
        Cell: props => (
          <span>
            <label>12 March 2018</label>

            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        Header: (
          <span>
            Assign to
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assignToNew",
        Cell: props => (
          <span>
            <label>A, Bansal</label>
          </span>
        )
      }
    ];
    const InsertPlaceholder = (
      <div className="insertpop1">
        <ul className="dash-creation-popup">
          <li className="title">Creation details</li>
          <li>
            <p>Naman Created</p>
            <p>2 Hrs ago</p>
          </li>
          <li>
            <p>Assigned to Vikas</p>
            <p>1.5 Hrs ago</p>
          </li>
          <li>
            <p>Vikas updated</p>
            <p>1 Hr ago</p>
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
    );
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
                      accessor: "storeTaskID"
                    },
                    {
                      Header: <span>Status</span>,
                      accessor: "taskStatus",
                      Cell: row => {
                        return (
                          <span className="table-btn table-blue-btn">
                            <label>{row.original.taskStatus}</label>
                          </span>
                        );
                      }
                    },
                    {
                      Header: <span>Task Title</span>,
                      accessor: "taskTitle"
                    },
                    {
                      Header: (
                        <span>
                          Department <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "departmentName",
                      Cell: row => {
                        return (
                          <>
                            {row.original.departmentName}
                            <Popover
                              content={
                                <div className="dash-creation-popup-cntr">
                                  <ul className="dash-category-popup dashnewpopup">
                                    <li>
                                      <p>Category</p>
                                      <p>Defective article</p>
                                    </li>
                                    <li>
                                      <p>Sub Category</p>
                                      <p>Customer wants refund</p>
                                    </li>
                                    <li>
                                      <p>Type</p>
                                      <p>Delivery</p>
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
                      }
                    },
                    {
                      Header: (
                        <span>
                          Store Name <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "storeName"
                    },
                    {
                      Header: (
                        <span>
                          Priority <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "priorityName	",
                      Cell: row => {
                        return <span>{row.original.priorityName}</span>;
                      }
                    },
                    {
                      Header: (
                        <span>
                          Creation On <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "creationOn",
                      Cell: row => (
                        <span>
                          <label>{row.original.creationOn}</label>

                          <Popover content={InsertPlaceholder} placement="left">
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </Popover>
                        </span>
                      )
                    },
                    {
                      Header: (
                        <span>
                          Assign to
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "assignto"
                      // Cell: (props) => (
                      //   <span>
                      //     <label>A, Bansal</label>
                      //   </span>
                      // ),
                    }
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
                        accessor: "storeTaskID"
                      },
                      {
                        Header: <span>Status</span>,
                        accessor: "taskStatus",
                        Cell: row => {
                          return (
                            <span className="table-btn table-blue-btn">
                              <label>{row.original.taskStatus}</label>
                            </span>
                          );
                        }
                      },
                      {
                        Header: <span>Task Title</span>,
                        accessor: "taskTitle"
                      },
                      {
                        Header: (
                          <span>
                            Department <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "departmentName",
                        Cell: row => {
                          return (
                            <span>
                              <label>{row.original.departmentName}</label>
                              <Popover
                                content={
                                  <div className="dash-creation-popup-cntr">
                                    <ul className="dash-category-popup dashnewpopup">
                                      <li>
                                        <p>Category</p>
                                        <p>Defective article</p>
                                      </li>
                                      <li>
                                        <p>Sub Category</p>
                                        <p>Customer wants refund</p>
                                      </li>
                                      <li>
                                        <p>Type</p>
                                        <p>Delivery</p>
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
                        }
                      },
                      {
                        Header: (
                          <span>
                            Created by <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdBy"
                      },
                      {
                        Header: (
                          <span>
                            Priority <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "priorityName"
                      },
                      {
                        Header: (
                          <span>
                            Store Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeName",
                        Cell: row => {
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
                        }
                      },
                      {
                        Header: (
                          <span>
                            Creation On <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "creationOn",
                        Cell: row => {
                          return (
                            <span>
                              <label>{row.original.creationOn}</label>

                              <Popover
                                content={InsertPlaceholder}
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
                        }
                      }
                    ]}
                    // resizable={false}
                    defaultPageSize={8}
                    showPagination={false}
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
            <div>
              <div className="table-cntr taskByTable">
                <ReactTable
                  data={dataTaskByTick}
                  columns={columnsTaskByTick}
                  // resizable={false}
                  defaultPageSize={8}
                  showPagination={false}
                  getTrProps={this.HandleRowTaskByClickPage}
                />
              </div>
            </div>
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
