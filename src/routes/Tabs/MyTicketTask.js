import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Drawer } from "antd";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import CancelImg from "./../../assets/Images/cancel.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import RightCirculImg from "./../../assets/Images/right.png";
import CalSmallImg from "./../../assets/Images/cal-small.png";
import StoreImg from "./../../assets/Images/store.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Popover } from "antd";
import ReactTable from "react-table";

class MyTicketTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AddTaskModal: false,
      TaskDetailDrawer: false
    };
  }
  handleAddTaskModalOpn() {
    this.setState({ AddTaskModal: true });
  }
  handleAddTaskModalCls() {
    this.setState({ AddTaskModal: false });
  }
  handleTaskDetailsDrawerOpn() {
    this.setState({ TaskDetailDrawer: true });
  }
  handleTaskDetailsDrawerCls() {
    this.setState({ TaskDetailDrawer: false });
  }
  HandleRowClickDraw = () => {
    return {
      onClick: e => {
        this.handleTaskDetailsDrawerOpn();
      }
    };
  };
  render() {
    // const popoverData1 = (
    //   <>
    //     <div>
    //       <b>
    //         <p className="title">Created By: Admin</p>
    //       </b>
    //       <p className="sub-title">Created Date: 12 March 2018</p>
    //     </div>
    //     <div>
    //       <b>
    //         <p className="title">Updated By: Manager</p>
    //       </b>
    //       <p className="sub-title">Updated Date: 12 March 2018</p>
    //     </div>
    //   </>
    // );

    const dataTicketTask = [
      {
        id: "Ta1",
        taskTitle: (
          <label>
            Wifi is not working from 5hrs
          </label>
        ),
        status: (
          <span className="table-btn table-blue-btn">Open</span>
        ),
        dept: (
          <div>
          <span>
            Internet
            <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
          </span>
        </div>
        ),
        creationOn: (
          <div>
          <span>
            2 Hour Ago
            <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
          </span>
        </div>
        ),
      
      },
      {
        id: "Ta2",
        taskTitle: (
          <label>
            Store door are not working
          </label>
        ),
        status: (
          <span className="table-btn table-blue-btn">Open</span>
        ),
        dept: (
          <div>
          <span>
            hardware
            <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
          </span>
        </div>
        ),
        creationOn: (
          <div>
          <span>
            12 March 2018
            <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
          </span>
        </div>
        ),
       
      },
      {
        id: "Ta3",
        taskTitle: (
          <label>
            Supplies are not coming on time
          </label>
        ),
        status: (
          <span className="table-btn table-green-btn">Solved</span>
        ),
        dept: (
          <div>
          <span>
            supply
            <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
          </span>
        </div>
        ),
        creationOn: (
          <div>
          <span>
            12 March 2018
            <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
          </span>
        </div>
        ),
      }
     
    ];

    const columnsTicketTask = [
      {
        Header: (
          <span>
            ID
            
          </span>
        ),
        accessor: "id",
        Cell: row => (
          <span>
            <img
                src={HeadPhone3}
                alt="HeadPhone"
                className="headPhone3"
            />
            ABC1234
          </span>
        ),
      },
      {
        Header: (
          <span>
            Status
          
          </span>
        ),
        accessor: "status",
        
      },
      {
        Header: (
          <span>
            Task Title
        
          </span>
        ),
        accessor: "taskTitle"
      },
      {
        Header: (
          <span>
            Department
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "dept"
      },
      {
        Header: (
          <span>
            Store Code
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "storeCode",
        Cell: row => (
          <label>2349</label>
        ),
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdBy",
        Cell: row => (
          <label>N Rampal</label>
        ),
      },
      {
        Header: (
          <span>
            Creation on
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationOn"
      },
      {
        Header: (
          <span>
            Assign to
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assignTo",
        Cell: row => (
          <label>A. Bansal</label>
        ),
      },
    
    ];
    
    return (
      <div>
        <div className="claim-addTask-btn">
          <button
            type="button"
            className="butn"
            onClick={this.handleAddTaskModalOpn.bind(this)}
          >
            ADD TASK
          </button>
        </div>
        <Modal
          open={this.state.AddTaskModal}
          onClose={this.handleAddTaskModalCls.bind(this)}
          closeIconId="sdsg"
          modalId="ClaimAdd-taskPopup"
          overlayId="logout-ovrly"
        >
          <div className="claim-AddTask-Mdl">
            <label className="claim-hdrMdl">Task</label>
            <img
              src={CancelImg}
              alt="cancelImg"
              className="cancalImg"
              onClick={this.handleAddTaskModalCls.bind(this)}
            />
          </div>
          <div style={{ padding: "20px 8px 0px 8px" }}>
            <input type="text" class="txt-1" placeholder="Task Title" />
            <textarea
              class="ClaimAddTadk-modal-textArea"
              placeholder="Task Description"
              rows="6"
            ></textarea>
            <div className="row">
              <div className="col-md-6">
                <select id="inputState" class="form-control dropdown-setting">
                  <option>Department</option>
                </select>
              </div>
              <div className="col-md-6">
                <select id="inputState" class="form-control dropdown-setting">
                  <option>Task Priority</option>
                </select>
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col-md-6">
                <select id="inputState" class="form-control dropdown-setting">
                  <option>Assign To</option>
                </select>
              </div>
              <div className="col-md-6">
                <select id="inputState" class="form-control dropdown-setting">
                  <option>Function</option>
                </select>
              </div>
            </div>
            <div className="row m-t-20" style={{ float: "right" }}>
              <div style={{ marginRight: "15px" }}>
                <a href="#!" style={{ marginRight: "15px" }}>
                  CANCEL
                </a>
                <button className="butn" type="button">
                  CREATE TASK
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <div className="table-cntr mt-3 MyTicketTaskReact">
                <ReactTable
                    data={dataTicketTask}
                    columns={columnsTicketTask}
                    // resizable={false}
                    defaultPageSize={3}
                    showPagination={true}
                    getTrProps={this.HandleRowClickDraw}
                />
          {/* <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th className="table-img-cntr"></th>
                <th>Task Title</th>
                <th>
                  Department
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Store Code
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Created By
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Creation on
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Assign to
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={this.handleTaskDetailsDrawerOpn.bind(this)}>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-blue-btn">Open</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>Wifi is not working form 5hrs</td>
                <td>
                  Internet
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>2349</td>
                <td>N Rampal</td>
                <td>
                  2 Hour Ago
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>A. Bansal</td>
              </tr>
              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-blue-btn">Open</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>Store door are not working</td>
                <td>
                  hardware
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>2349</td>
                <td>N Rampal</td>

                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>G. Bansal</td>
              </tr>
              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-green-btn">Solved</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>Supplies are not coming on time</td>
                <td>
                  supply
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>2349</td>
                <td>N Rampal</td>
                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>G. Bansal</td>
              </tr>
            </tbody>
          </table> */}
          <Drawer
            className="taskTab-drawerModal"
            placement={"right"}
            closable={false}
            // onClose={this.handleClaimDetailsModalClose}
            visible={this.state.TaskDetailDrawer}
          >
            <div style={{ marginLeft: "10px" }}>
              <img
                src={BlackLeftArrow}
                alt="black-left-arrow-icon"
                className="black-left-arrow"
                onClick={this.handleTaskDetailsDrawerCls.bind(this)}
              />
              <label className="task-details">Task Details</label>
            </div>
            <hr className="claimline" />
            <div className="">
              <label className="wifiLbl-drawer">
                WIFI is not working from 5hrs
              </label>
              <div className="row m-b-15">
                <div className="col-xs-3">
                  <img
                    src={Headphone2Img}
                    alt="headphone"
                    className="oval-56"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago m-r-25">
                    ASSIGNED TO
                    <span className="addTasklbl-name">Naman Rampal</span>
                  </label>
                </div>
                <div className="col-xs-3">
                  <img
                    src={RightCirculImg}
                    alt="headphone"
                    className="status-opn"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago m-r-25">
                    STATUS
                    <span className="addTasklbl-name">Open</span>
                  </label>
                </div>
                <div className="col-xs-3">
                  <img
                    src={CalSmallImg}
                    alt="headphone"
                    className="status-opn"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago">
                    DUE DATE
                    <span className="addTasklbl-name">Today</span>
                  </label>
                </div>
              </div>
              <p className="tasktasb-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Sed interdum cursus nulla, a sagittis arcu dapibus vel.
                <br />
                Phasellus ut justo mauris. Nullam sed efficitur tellus, eget
                sollicitudin tellus. Donec metus augue, auctor ac dignissim
                suscipit, blandit vel libero. Fusce accumsan finibus nisi sed
                sodales. Phasellus tincidunt nisl dictum ipsum pellentesque
                dapibus. Mauris mollis magna vel arcu pretium, et lobortis ipsum
                placerat. Maecenas mollis convallis felis vel posuere.
              </p>
              <hr className="claimline" />
              <textarea
                className="task-drawerv-textArea"
                placeholder="Add Comments"
              ></textarea>
              <button className="assign-butn btn-assign-tikcet" type="button">
                ADD COMMENT
              </button>
              <div className="row m-t-20">
                <div className="col-xs-6">
                <div className="storeImg-drawer">                  
                  <img
                    src={StoreImg}
                    alt="headphone"
                    className="storeImg"
                  />
                  </div>
                  <label className="varun-taskDrawer">Varun Nagpal</label>
                  <span className="addTask-time-ago">2hr ago</span>
                  <label className="task-drawer-lnl">
                    Hi Diwakar, I really appreciate you joining us at
                    Voucherify! My top priority
                  </label>
                </div>
              </div>
              <div className="row m-t-20">
                <div className="col-xs-6">
                  <div className="storeImg-drawer">                  
                  <img
                    src={StoreImg}
                    alt="headphone"
                    className="storeImg"
                  />
                  </div>
                  <label className="varun-taskDrawer">Varun Nagpal</label>
                  <span className="addTask-time-ago">2hr ago</span>
                  <label className="task-drawer-lnl">
                    Hi Diwakar, I really appreciate you joining us at
                    Voucherify! My top priority
                  </label>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default MyTicketTask;
