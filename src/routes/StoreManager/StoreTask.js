import React, { Component } from "react";
import Campaign from "./Campaign";
import InfoIcon from "../../assets/Images/info-icon.png";
import Demo from "../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";

class StoreTask extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChangeStoreTask() {
    this.props.history.push("/store/editStoreTask");
  }
  handleChangeTaskByTicket() {
    this.props.history.push("/store/storeTaskByTicket");
  }
  handleChagneAddTask(){
    this.props.history.push("storeAddTask");
  }
  HandleRowClickPage = () => {
    return {
      onClick: e => {
        this.props.history.push("editStoreTask");
      }
    };
  };
  HandleRowTaskByClickPage = () => {
    return {
      onClick: e => {
        this.props.history.push("storeTaskByTicket");
      }
    };
  };
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
        TaskTitle: (
          <label>Wifi is not working from 5 Hrs</label>
        ),
        DeptName:(
          <span>
          <label>Internet</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata1</label>
        ),
      },
      {  
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Hardware</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata2</label>
        ),
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: (
          <label>Supplies are not coming on time</label>
        ),
        DeptName:(
          <span>
          <label>Supply</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata3</label>
        ),
      },

     
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Wifi is not working from 5 Hrs</label>
        ),
        DeptName:(
          <span>
          <label>Internet</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata1</label>
        ),
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Hardware</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata2</label>
        ),
      },
      { 
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Supply</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata3</label>
        ),
      },
      { 
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: (
          <label>Supplies are not coming on time</label>
        ),
        DeptName:(
          <span>
          <label>Hardwares</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        StName: (
          <label>Bata3</label>
        ),
      }
    ];

    const columnsRaise = [
      {
        Header: (
          <span>
           ID
          </span>
        ),
        accessor: "idClose",
        Cell: props => ( 
          <label>
            ABCD123
          </label>
        ),
      },
      {
        Header: (
          <span>
            Status
          </span>
        ),
        accessor: "statusNew"
      },
      {
        Header: (
          <span>
           Task Title
          </span>
        ),
        accessor: "TaskTitle",
      },
      {
        Header: (
          <span>
            Department <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "DeptName",
      },
      {
        Header: (
          <span>
            Store Name <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "StName",
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
            Assign to<FontAwesomeIcon icon={faCaretDown} />
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

    const dataAssign = [
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Wifi is not working from 5 Hrs</label>
        ),
        DeptName:(
          <span>
          <label>Internet</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
          <span>
          <label>ABS</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },
      {  
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Hardware</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
          <span>
          <label>HHH</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: (
          <label>Supplies are not coming on time</label>
        ),
        DeptName:(
          <span>
          <label>Supply</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
          <span>
          <label>BATA</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },

     
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Wifi is not working from 5 Hrs</label>
        ),
        DeptName:(
          <span>
          <label>Internet</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
          <span>
          <label>HNM</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Hardware</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
          <span>
          <label>HHH</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },
      { 
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Supply</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
          <span>
          <label>RRT</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },
      { 
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: (
          <label>Supplies are not coming on time</label>
        ),
        DeptName:(
          <span>
          <label>Hardwares</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        CreatedBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
          <span>
          <label>HGH</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      }
    ];

    const columnsAssign = [
      {
        Header: (
          <span>
           ID
          </span>
        ),
        accessor: "idClose",
        Cell: props => ( 
          <label>
            ABCD1234
          </label>
        ),
      },
      {
        Header: (
          <span>
            Status
          </span>
        ),
        accessor: "statusNew"
      },
      {
        Header: (
          <span>
           Task Title
          </span>
        ),
        accessor: "TaskTitle",
      },
      {
        Header: (
          <span>
            Department <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "DeptName",
      },
      {
        Header: (
          <span>
            Created by <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "CreatedBy",
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
            Store Name<FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "StoName",
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
        TaskTitle: (
          <label>Wifi is not working from 5 Hrs</label>
        ),
        DeptName:(
          <span>
          <label>Internet</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
          <span>
          <label>ABS</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
      },
      {  
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Hardware</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
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
        TaskTitle: (
          <label>Supplies are not coming on time</label>
        ),
        DeptName:(
          <span>
          <label>Supply</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
          <span>
          <label>BATA</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),

      },

     
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Wifi is not working from 5 Hrs</label>
        ),
        DeptName:(
          <span>
          <label>Internet</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
          <span>
          <label>HNM</label>
          <Popover content={DefArti1} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Hardware</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
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
        TaskTitle: (
          <label>Store door are not working</label>
        ),
        DeptName:(
          <span>
          <label>Supply</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>G. Bansal</label>
        ),
        StoName:(
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
        TaskTitle: (
          <label>Supplies are not coming on time</label>
        ),
        DeptName:(
          <span>
          <label>Hardwares</label>
          <Popover content={DefArti} placement="bottom">
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
          </Popover>
        </span>
        ),
        cretBy: (
          <label>A. Bansal</label>
        ),
        StoName:(
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
        Header: (
          <span>
           Task ID
          </span>
        ),
        accessor: "idClose",
        Cell: props => ( 
          <label>
            ABCD1234
          </label>
        ),
      },
      {
        Header: (
          <span>
           Ticket ID
          </span>
        ),
        accessor: "idClose",
        Cell: props => ( 
          <label>
            ABCD1234
          </label>
        ),
      },
      {
        Header: (
          <span>
            Status
          </span>
        ),
        accessor: "statusNew"
      },
      {
        Header: (
          <span>
           Task Title
          </span>
        ),
        accessor: "TaskTitle",
      },
      {
        Header: (
          <span>
            Department <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "DeptName",
      },
      {
        Header: (
          <span>
            Created by <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "cretBy",
      },
      {
        Header: (
          <span>
            Store Name<FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "StoName",
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
            Assign to<FontAwesomeIcon icon={faCaretDown} />
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
          <button className="butn" onClick={this.handleChagneAddTask.bind(this)}>Add Task</button>
        </div>
        <div className="tab-content store-task-tab-cont" style={{padding:"15px"}}>
          <div
            className="tab-pane fade show active"
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            <div className="table-cntr raisereactTable">
              <ReactTable
                data={dataRaise}
                columns={columnsRaise}
                // resizable={false}
                defaultPageSize={8}
                showPagination={false}
                getTrProps={this.HandleRowClickPage}
              />
              {/* <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Task Title</th>
                    <th>
                      Department <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Store Name <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Priority <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Creation on <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Assign to <img src={TableArr} alt="table-arr" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={this.handleChangeStoreTask.bind(this)}>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-blue-btn">Open</span>
                    </td>
                    <td>Wif is not working form 5hrs</td>
                    <td>
                      Internet
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="Internet1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="Internet1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA1</td>
                    <td>High</td>
                    <td>
                      2 Hour Ago
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </td>
                    <td>A. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-blue-btn">Open</span>
                    </td>
                    <td>Store door are not working</td>
                    <td>
                      Hardware
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="hardware1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="hardware1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA2</td>
                    <td>High</td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td>Supplies are not coming on time</td>
                    <td>
                      Supply
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="supply1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="supply1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Category</p>
                              <p className="title">Defective article</p>
                            </div>
                            <div>
                              <p className="sub-title">Sub Category</p>
                              <p className="title">Customer wants refund</p>
                            </div>
                            <div>
                              <p className="sub-title">Type</p>
                              <p className="title">Delivery</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </div>
                    </td>
                    <td>BATA3</td>
                    <td>High</td>
                    <td>
                      12 March 2018
                      <div className="dash-creation-popup-cntr">
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                        />
                        <ul className="dash-creation-popup dash-popup">
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
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-blue-btn">Open</span>
                    </td>
                    <td>Wif is not working form 5hrs</td>
                    <td>
                      Internet
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="internet2"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="internet2"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Category</p>
                            <p className="title">Defective article</p>
                          </div>
                          <div>
                            <p className="sub-title">Sub Category</p>
                            <p className="title">Customer wants refund</p>
                          </div>
                          <div>
                            <p className="sub-title">Type</p>
                            <p className="title">Delivery</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA1</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>A. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-blue-btn">Open</span>
                    </td>
                    <td>Store door are not working</td>
                    <td>
                      Hardware
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="hardware5"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="hardware5"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Category</p>
                            <p className="title">Defective article</p>
                          </div>
                          <div>
                            <p className="sub-title">Sub Category</p>
                            <p className="title">Customer wants refund</p>
                          </div>
                          <div>
                            <p className="sub-title">Type</p>
                            <p className="title">Delivery</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA2</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td>Store door are not working</td>
                    <td>
                      Supply
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="supply2"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="supply2"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Category</p>
                            <p className="title">Defective article</p>
                          </div>
                          <div>
                            <p className="sub-title">Sub Category</p>
                            <p className="title">Customer wants refund</p>
                          </div>
                          <div>
                            <p className="sub-title">Type</p>
                            <p className="title">Delivery</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA3</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                  <tr>
                    <td>ABC1234</td>
                    <td>
                      <span className="table-btn table-green-btn">Solved</span>
                    </td>
                    <td>Supplies are not coming on time</td>
                    <td>
                      Hardware
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                        id="hardware3"
                      />
                      <UncontrolledPopover
                        trigger="hover"
                        placement="bottom"
                        target="hardware3"
                        className="general-popover created-popover"
                      >
                        <PopoverBody>
                          <div>
                            <p className="sub-title">Category</p>
                            <p className="title">Defective article</p>
                          </div>
                          <div>
                            <p className="sub-title">Sub Category</p>
                            <p className="title">Customer wants refund</p>
                          </div>
                          <div>
                            <p className="sub-title">Type</p>
                            <p className="title">Delivery</p>
                          </div>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                    <td>BATA3</td>
                    <td>High</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                </tbody>
              </table> */}
               <div className="position-relative">
                        <div className="pagi">
                          <ul>
                            <li>
                              <a href={Demo.BLANK_LINK}>&lt;</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>1</a>
                            </li>
                            <li className="active">
                              <a href={Demo.BLANK_LINK}>2</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>3</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>4</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>5</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>6</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>&gt;</a>
                            </li>
                          </ul>
                        </div>
                        <div className="item-selection">
                          <select>
                            <option>30</option>
                            <option>50</option>
                            <option>100</option>
                          </select>
                          <p>Items per page</p>
                        </div>
                      </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            <div>
              <div className="table-cntr">
              <ReactTable
                data={dataAssign}
                columns={columnsAssign}
                // resizable={false}
                defaultPageSize={8}
                showPagination={false}
                getTrProps={this.HandleRowClickPage}
              />
               <div className="position-relative">
                        <div className="pagi">
                          <ul>
                            <li>
                              <a href={Demo.BLANK_LINK}>&lt;</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>1</a>
                            </li>
                            <li className="active">
                              <a href={Demo.BLANK_LINK}>2</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>3</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>4</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>5</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>6</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>&gt;</a>
                            </li>
                          </ul>
                        </div>
                        <div className="item-selection">
                          <select>
                            <option>30</option>
                            <option>50</option>
                            <option>100</option>
                          </select>
                          <p>Items per page</p>
                        </div>
                      </div>
                {/* <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Task Title</th>
                      <th>
                        Department <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Created By <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Store Name <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Creation on <img src={TableArr} alt="table-arr" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr onClick={this.handleChangeStoreTask.bind(this)}>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="AbcInterner"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="AbcInterner"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Department</p>
                                <p className="title">Internet</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>BATA1</td>
                      <td>
                        ABS
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="ABSStore"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="ABSStore"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">ABS</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        2 Hour Ago
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="hrago2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="hrago2"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="HhhHardware"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="HhhHardware"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Department</p>
                                <p className="title">Hardware</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>BATA2</td>
                      <td>
                        HHH
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="HHH2Store"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="HHH2Store"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">HHH</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="marchHhr"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="marchHhr"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Supply
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="BataSupply"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="BataSupply"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Department</p>
                                <p className="title">Supply</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>BATA3</td>
                      <td>
                        BATA
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="BATA1Store"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="BATA1Store"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">BATA</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="marchBata"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="marchBata"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HnmInternet"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HnmInternet"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Internet</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>BATA1</td>
                      <td>
                        HNM
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="HNMStore"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="HNMStore"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">HNM</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        12 March 2018{" "}
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HnmMarch"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="HnmMarch"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
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
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HhhHardware1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HhhHardware1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>BATA2</td>
                      <td>
                        HHH
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="HHH1Store"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="HHH1Store"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">HHH</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="Hhh1march"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="Hhh1march"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
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
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Supply
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="RRtSupply"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="RRtSupply"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Supply</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>BATA3</td>
                      <td>
                        RRT
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="RRTStore"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="RRTStore"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">RRT</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="Rrt3march"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="Rrt3march"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
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
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HghHardware"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="HghHardware"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>BATA3</td>
                      <td>
                        HGH
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="HGHStore"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="HGHStore"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Store Name</p>
                                <p className="title">HGH</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>
                        12 March 2018
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="HGHMarch"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="auto"
                          target="HGHMarch"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
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
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                    </tr>
                  </tbody>
                </table> */}
               
              </div>
            </div>
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
               <div className="position-relative">
                        <div className="pagi">
                          <ul>
                            <li>
                              <a href={Demo.BLANK_LINK}>&lt;</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>1</a>
                            </li>
                            <li className="active">
                              <a href={Demo.BLANK_LINK}>2</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>3</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>4</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>5</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>6</a>
                            </li>
                            <li>
                              <a href={Demo.BLANK_LINK}>&gt;</a>
                            </li>
                          </ul>
                        </div>
                        <div className="item-selection">
                          <select>
                            <option>30</option>
                            <option>50</option>
                            <option>100</option>
                          </select>
                          <p>Items per page</p>
                        </div>
                      </div>
                {/* <table>
                  <thead>
                    <tr>
                      <th>Task ID</th>
                      <th>Ticket ID</th>
                      <th>Status</th>
                      <th>Task Title</th>
                      <th>
                        Department <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Created By <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Store Name <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Creation on <img src={TableArr} alt="table-arr" />
                      </th>
                      <th>
                        Assign to <img src={TableArr} alt="table-arr" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr onClick={this.handleChangeTaskByTicket.bind(this)}>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskInternet1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="TaskInternet1"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Department</p>
                                <p className="title">Internet</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>A. Bansal</td>
                      <td>
                        ABS
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskABS"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskABS"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">ABS</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>
                        2 Hour Ago
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="Taskhrago2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="Taskhrago2"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskHardware1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="TaskHardware1"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Department</p>
                                <p className="title">Hardware</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                      <td>
                        HHH
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskHHH1"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHHH1"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">HHH</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskMarch1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="TaskMarch1"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Supply
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskSupply1"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="bottom"
                            target="TaskSupply1"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
                              <div>
                                <p className="sub-title">Department</p>
                                <p className="title">Supply</p>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                      <td>
                        BATA
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="Taskbata11"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="Taskbata11"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">BATA</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskMarch2"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="TaskMarch2"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Wif is not working form 5hrs</td>
                      <td>
                        Internet
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskInternet2"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskInternet2"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Internet</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>A. Bansal</td>
                      <td>
                        HNM
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskHardware3"
                        />
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskMarch3"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="TaskMarch3"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>A. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-blue-btn">Open</span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskHardware2"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHardware2"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>G. Bansal</td>
                      <td>
                        HHH
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskHHH3"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHHH3"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">HHH</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskMarch4"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="TaskMarch4"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Store door are not working</td>
                      <td>
                        Supply
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskSupply2"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskSupply2"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Supply</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>G. Bansal</td>
                      <td>
                        RRT
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskRRT3"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskRRT3"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">RRT</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskMarch5"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="TaskMarch5"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                    <tr>
                      <td>ABC1234</td>
                      <td>ABC1234</td>
                      <td>
                        <span className="table-btn table-green-btn">
                          Solved
                        </span>
                      </td>
                      <td>Supplies are not coming on time</td>
                      <td>
                        Hardware
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskHardware3"
                        />
                        <UncontrolledPopover
                          trigger="hover"
                          placement="bottom"
                          target="TaskHardware3"
                          className="general-popover created-popover"
                        >
                          <PopoverBody>
                            <div>
                              <p className="sub-title">Department</p>
                              <p className="title">Hardware</p>
                            </div>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      <td>BATA3</td>
                      <td>
                        HGH
                        <img
                          className="info-icon"
                          src={InfoIcon}
                          alt="info-icon"
                          id="TaskHardware3"
                        />
                      </td>
                      <td>
                        12 March 2018
                        <div className="dash-creation-popup-cntr">
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id="TaskMarch6"
                          />
                          <UncontrolledPopover
                            trigger="hover"
                            placement="auto"
                            target="TaskMarch6"
                            className="general-popover created-popover"
                          >
                            <PopoverBody>
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
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </td>
                      <td>G. Bansal</td>
                    </tr>
                  </tbody>
                </table> */}
               
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
