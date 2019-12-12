import React, { Component, Fragment } from "react";
import SearchIcon from "./../assets/Images/search-icon.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import Modal from "react-bootstrap/Modal";
import MyTicketNew from "./Tabs/MyTicketNew.js";
import MyTicketOpen from "./Tabs/MyTicketOpen.js";
import MyTicketResolved from "./Tabs/MyTicketResolved.js";
import MyTicketReassign from "./Tabs/MyTicketReassign.js";
import MyTicketClosed from "./Tabs/MyTicketClosed.js";
import MyTicketAll from "./Tabs/MyTicketAll.js";
import MyTicketFollowUp from "./Tabs/MyTicketFollowUp.js";
import MyTicketDraft from "./Tabs/MyTicketDraft.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";


class MyTicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AssignModal: false
    };
  }

  hanleChange = () => {
    this.props.history.push("/admin/addSearchMyTicket");
  };
  hanleChange_MyTicket = () => {
    this.props.history.push("/admin/myticket");
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  clickCheckbox(evt) {
    evt.stopPropagation();
  }
  checkAllCheckbox(event) {
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
    }
  }
  HandleRowClickPage = () => {
    return {
      onClick: e => { 
        this.props.history.push("myticket");
      }
    };
  };
  render() {

    // const DefArti = (
    //   <div className="dash-creation-popup-cntr">
    //     <ul className="dash-category-popup">
    //       <li>
    //         <p>Category</p>
    //         <p>Defective article</p>
    //       </li>
    //       <li>
    //         <p>Sub Category</p>
    //         <p>Customer wants refund</p>
    //       </li>
    //       <li>
    //         <p>Type</p>
    //         <p>Delivery</p>
    //       </li>
    //     </ul>
    //   </div>
    // );

    // const InsertPlaceholder = (
    //   <div className="insertpop1">
    //     <ul className="dash-creation-popup">
    //       <li className="title">Creation details</li>
    //       <li>
    //         <p>Naman Created</p>
    //         <p>2 Hrs ago</p>
    //       </li>
    //       <li>
    //         <p>Assigned to Vikas</p>
    //         <p>1.5 Hrs ago</p>
    //       </li>
    //       <li>
    //         <p>Vikas updated</p>
    //         <p>1 Hr ago</p>
    //       </li>
    //       <li>
    //         <p>Response time remaining by</p>
    //         <p>30 mins</p>
    //       </li>
    //       <li>
    //         <p>Response overdue by</p>
    //         <p>1 Hr</p>
    //       </li>
    //       <li>
    //         <p>Resolution overdue by</p>
    //         <p>2 Hrs</p>
    //       </li>
    //     </ul>
    //   </div>
    // );
    // const TaskBlue = (
    //   <div className="dash-task-popup-new">
    //     <div className="d-flex justify-content-between align-items-center">
    //       <p className="m-b-0">
    //         TASK: <span className="green-clr">02</span>/
    //         <span className="task-red-clr">04</span>
    //       </p>
    //       <div className="d-flex align-items-center">
    //         2 NEW
    //         <div className="nw-chat">
    //           <img src={Chat} alt="chat" />
    //         </div>
    //       </div>
    //     </div>
    //     <ProgressBar className="task-progress" now={70} />
    //   </div>
    // );
    // const ClaimBlue = (
    //   <div className="dash-task-popup-new">
    //     <div className="d-flex justify-content-between align-items-center">
    //       <p>
    //         CLAIM: <span className="green-clr">02</span>/
    //         <span className="task-red-clr">01</span>
    //       </p>
    //     </div>
    //     <ProgressBar className="task-progress" now={70} />
    //   </div>
    // );

    const dataDash = [
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab1"
                  name="MyTicketListcheckbox[]"
                  
                />
                <label htmlFor="fil-ab1">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Naman</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab2"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab2">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-yellow-btn">
            <label>New</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Rashmi</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
              
                <input
                  type="checkbox"
                  id="fil-ab3"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab3">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        ),
        subjectDash: (
          <div>
            <img
                className="task-icon-1 marginimg"
                src={TaskIconBlue}
                alt="task-icon-blue"
              />
            {/* <Popover content={TaskBlue} placement="bottom">
              <img
                className="task-icon-1 marginimg"
                src={TaskIconBlue}
                alt="task-icon-blue"
              />
            </Popover> */}
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Shalini</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">

                <input
                  type="checkbox"
                  id="fil-ab4"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab4">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            <img
              className="task-icon-1 marginimg"
              src={TaskIconGray}
              alt="task-icon-gray"
            />
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Vikas</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab5"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab5">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            <img
                className="claim-icon marginimg"
                src={CliamIconBlue}
                alt="cliam-icon-blue"
              />
            {/* <Popover content={ClaimBlue} placement="bottom">
              <img
                className="claim-icon marginimg"
                src={CliamIconBlue}
                alt="cliam-icon-blue"
              />
            </Popover> */}
            Need to change my shipping address <br></br>
            <span>
              <img
                className="task-icon-1 marginimg"
                src={TaskIconGray}
                alt="task-icon-gray"
              />
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Nidhi</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
              
                <input
                  type="checkbox"
                  id="fil-ab6"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab6">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-yellow-btn">
            <label>New</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Mansi</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
              
                <input
                  type="checkbox"
                  id="fil-ab7"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab7">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Naman</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
              
                <input
                  type="checkbox"
                  id="fil-ab8"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab8">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Akriti</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">

                <input
                  type="checkbox"
                  id="fil-ab9"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab9">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Juhi</span>
        ),
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
              
                <input
                  type="checkbox"
                  id="fil-ab10"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab10">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-yellow-btn">
            <label>New</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address <br></br>
            <span>Hope this help, Please rate us</span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        ),
        assigneeDash: (
          <span>Shalini</span>
        ),
      }
    ];

    const columnsDash = [
      {
        Header: (
          <span>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-aball"
                  name="MyTicketListcheckbox[]"
                  onChange={this.checkAllCheckbox.bind(this)}
                />
                <label htmlFor="fil-aball" className="ticketid">ID</label>
              </div>
            </div>
          </span>
        ),
        accessor: "idDash"
      },
      {
        Header: (
          <span onClick={this.StatusOpenModel}>
            Status <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "statusDash"
      },
      {
        Header: (
          <label className="ticketid">
            <span>
              Subject/
            </span>
            <span style={{ fontWeight: "bold", fontSize: "11px !important" }}>Lastest Message</span>
          </label>
        ),
        accessor: "subjectDash"
      },
      {
        Header: (
          <span className="ticketid">
            Category <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "categoryDash",
        Cell: props => (
          <span>
            <label>Defective article </label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        )
      },
      {
        Header: (
          <span className="ticketid">
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "priorityDash",
        Cell: props => <span>High</span>
      },
      {
        Header: (
          <span className="ticketid">
            Assignee <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assigneeDash"
      },
      {
        Header: (
          <span className="ticketid">
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew"
      }
    ];

    
    return (
      <Fragment>
        <div className="myticketlist-header">
          <div className="setting-tabs esc esc1">
            <ul className="nav nav-tabs es" role="tablist" style={{display: "inline"}}>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="true"
                >
                  Escalation: <span className="myTciket-tab-span">03</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#New-tab"
                  role="tab"
                  aria-controls="New-tab"
                  aria-selected="false"
                >
                  New: <span className="myTciket-tab-span">09</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Open-tab"
                  role="tab"
                  aria-controls="Open-tab"
                  aria-selected="false"
                >
                  Open: <span className="myTciket-tab-span">10</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Resolved-tab"
                  role="tab"
                  aria-controls="Resolved-tab"
                  aria-selected="false"
                >
                  Resolved: <span className="myTciket-tab-span">15</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Reassigned-tab"
                  role="tab"
                  aria-controls="Reassigned-tab"
                  aria-selected="false"
                >
                  Reassigned by me:{" "}
                  <span className="myTciket-tab-span">03</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Closed-tab"
                  role="tab"
                  aria-controls="Closed-tab"
                  aria-selected="false"
                >
                  Closed: <span className="myTciket-tab-span">12</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#All-tab"
                  role="tab"
                  aria-controls="All-tab"
                  aria-selected="false"
                >
                  All: <span className="myTciket-tab-span">56</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Follow-tab"
                  role="tab"
                  aria-controls="Follow-tab"
                  aria-selected="false"
                >
                  Follow Up: <span className="myTciket-tab-span">03</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Draft-tab"
                  role="tab"
                  aria-controls="Draft-tab"
                  aria-selected="false"
                >
                  Draft: <span className="myTciket-tab-span">05</span>
                </a>
              </li>
            </ul>

              <div className="mlistbtn">
                <button
                  className="myTicket-btn-A"
                  type="button"
                  onClick={this.handleAssignModalOpen.bind(this)}
                >
                  ASSIGN
                </button>
                <button
                  className="Add-ticket-button"
                  type="button"
                  onClick={this.hanleChange}
                >
                  <label className="add-tickets">ADD TICKETS</label>
                </button>
              </div>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="Escalation-tab"
                role="tabpanel"
                aria-labelledby="Escalation-tab"
              >
                <div className="container-fluid">
                  <div className="table-cntr mt-3 mtictab table-responsive" style={{overflow: "initial"}}>
                  <div className="MyTicketListReact">
                  <ReactTable
                    data={dataDash}
                    columns={columnsDash}
                    // resizable={false}
                    defaultPageSize={10}
                    showPagination={false}
                    getTrProps={this.HandleRowClickPage}
                  />
                </div>

                    {/* <table className="table-responsive" style={{display: "inline-table"}}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>
                            Status <img src={TableArr} alt="table-arr" />
                          </th>
                          <th className="table-img-cntr"></th>
                          <th>
                            Subject<span>/Lastest Message</span>
                          </th>
                          <th>
                            Category <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Priority <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Assignee <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Creation on <img src={TableArr} alt="table-arr" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-blue-btn">
                              Open
                            </span>
                          </td>
                          <td className="table-img-cntr"></td>
                          <td>
                            Need to change my shipping address{" "}
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Naman</td>
                          <td>
                            12 March 2018{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>
                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-yellow-btn">
                              New
                            </span>
                          </td>
                          <td className="table-img-cntr">
                            
                          </td>
                          <td>
                            Need to change my shipping address{" "}
                            <span>
                              Hope this help, Please rate us (1 new comment)
                            </span>
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Rashmi</td>
                          <td>
                            12 March 2018{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-green-btn">
                              Solved
                            </span>
                          </td>
                          <td className="table-img-cntr">
                            <img
                              className="task-icon-1"
                              src={TaskIconBlue}
                              alt="task-icon-blue"
                            />
                          </td>
                          <td>
                            Need to change my shipping address{" "}
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Shalini</td>
                          <td>
                            12 March 2018{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-blue-btn">
                              Open
                            </span>
                          </td>
                          <td className="table-img-cntr">
                            <img
                              className="task-icon-1"
                              src={TaskIconGray}
                              alt="task-icon-gray"
                            />
                          </td>
                          <td>
                            Need to change my shipping address{" "}
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Vikash</td>
                          <td>
                            12 March 2018{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-blue-btn">
                              Open
                            </span>
                          </td>
                          <td className="table-img-cntr">
                            <img
                              className="claim-icon"
                              src={CliamIconBlue}
                              alt="cliam-icon-blue"
                            />
                            <img
                              className="task-icon-1"
                              src={TaskIconGray}
                              alt="task-icon-gray"
                            />
                          </td>
                          <td>
                            Need to change my shipping address{" "}
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Nidhi</td>
                          <td>
                            12 March 2018{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-yellow-btn">
                              New
                            </span>
                          </td>
                          <td className="table-img-cntr"></td>
                          <td>
                            Need to change my shipping address{" "}
                            <span>
                              Hope this help, Please rate us (1 new comment)
                            </span>
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Mansi</td>
                          <td>
                            12 March 2018{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-green-btn">
                              Solved
                            </span>
                          </td>
                          <td className="table-img-cntr"></td>
                          <td>
                            Need to change my shipping address
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Naman</td>
                          <td>
                            12 March 2018
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>
                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-blue-btn">
                              Open
                            </span>
                          </td>
                          <td className="table-img-cntr"></td>
                          <td>
                            Need to change my shipping address
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Akriti</td>
                          <td>
                            12 March 2018
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>
                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-blue-btn">
                              Open
                            </span>
                          </td>
                          <td className="table-img-cntr"></td>
                          <td>
                            Need to change my shipping address
                            <span>Hope this help, Please rate us</span>
                          </td>
                          <td>
                            Defective article
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Juhi</td>
                          <td>
                            12 March 2018
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>
                            <img
                              src={HeadPhone3}
                              alt="HeadPhone"
                              className="headPhone3"
                            />
                            ABC1234
                          </td>
                          <td>
                            <span className="table-btn table-yellow-btn">
                              New
                            </span>
                          </td>
                          <td className="table-img-cntr">
                           
                          </td>
                          <td>
                            Need to change my shipping address
                            <span>
                              Hope this help, Please rate us (1 new comment)
                            </span>
                          </td>
                          <td>
                            Defective article
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>High</td>
                          <td>Shalini</td>
                          <td>
                            12 March 2018
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table> */}
                    {/* <div className="pagi">
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
                          <a href={Demo.BLANK_LINK}>7</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div> */}
                    <div className="float-search">
                      <small>Search Tickets</small>
                      <img
                        className="search-icon"
                        src={SearchIcon}
                        alt="search-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="New-tab"
                role="tabpanel"
                aria-labelledby="New-tab"
              >
                <MyTicketNew />
              </div>

              <div
                className="tab-pane fade"
                id="Open-tab"
                role="tabpanel"
                aria-labelledby="Open-tab"
              >
                <MyTicketOpen />
              </div>

              <div
                className="tab-pane fade"
                id="Resolved-tab"
                role="tabpanel"
                aria-labelledby="Resolved-tab"
              >
                <MyTicketResolved />
              </div>

              <div
                className="tab-pane fade"
                id="Reassigned-tab"
                role="tabpanel"
                aria-labelledby="Reassigned-tab"
              >
                <MyTicketReassign />
              </div>

              <div
                className="tab-pane fade"
                id="Closed-tab"
                role="tabpanel"
                aria-labelledby="Closed-tab"
              >
                <MyTicketClosed/>
              </div>

              <div
                className="tab-pane fade"
                id="All-tab"
                role="tabpanel"
                aria-labelledby="All-tab"
              >
              <MyTicketAll/>
              </div>

              <div
                className="tab-pane fade"
                id="Follow-tab"
                role="tabpanel"
                aria-labelledby="Follow-tab"
              >
                <MyTicketFollowUp/>
              </div>

              <div
                className="tab-pane fade"
                id="Draft-tab"
                role="tabpanel"
                aria-labelledby="Draft-tab"
              >
                <MyTicketDraft/>
                </div>
                {/* <div className="container-fluid">
                  <div className="table-cntr mt-3">
                    <table className="draft">
                      <thead>
                        <tr>
                          <th>Ticket Title</th>
                          <th>Ticket Detail</th>
                          <th>
                            Category <img src={TableArr} alt="table-arr" />
                          </th>
                          <th>
                            Draft Creation Date{" "}
                            <img src={TableArr} alt="table-arr" />
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping addres Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping address Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping addres Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping address Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping addres Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>
                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping address Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping addres Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>

                        <tr onClick={this.hanleChange_MyTicket}>
                          <td>Need to change my shipping addres</td>
                          <td>
                            Need to change my shipping address Need to change my
                            shipping addres
                          </td>
                          <td>
                            Defective article{" "}
                            <img
                              className="info-icon"
                              src={InfoIcon}
                              alt="info-icon"
                            />
                          </td>
                          <td>12 March 2018 </td>
                        </tr>
                      </tbody>
                    </table>
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
                          <a href={Demo.BLANK_LINK}>7</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              
            </div>
          </div>
         
        </div>
        <Modal
          size="lg"
          show={this.state.AssignModal}
          onHide={this.handleAssignModalClose.bind(this)}
          className="assign-modal-KBase"
        >
          <Modal.Header>
            <div className="assign-modal-header">
              <img
                src={BlackLeftArrow}
                alt="black-left-arrow-icon"
                className="black-left-arrow"
                onClick={this.handleAssignModalClose.bind(this)}
              />
              <label className="claim-details">Assign Tickets To</label>
              <img
                src={SearchBlackImg}
                alt="SearchBlack"
                className="black-left-arrow srch-mleft-spc"
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="assign-modal-div">
              <input
                type="text"
                className="txt-1 txt-btmSpace"
                placeholder="First Name"
              />
              <input
                type="text"
                className="txt-1 txt-btmSpace"
                placeholder="Last Name"
              />
              <input
                type="text"
                className="txt-1 txt-btmSpace"
                placeholder="Email"
              />
              <div className="txt-btmSpace">
                <select
                  id="inputState"
                  className="form-control dropdown-setting"
                >
                  <option>Select</option>
                  <option>Designation</option>
                </select>
              </div>
              <button className="butn assign-btn" type="button">
                SEARCH
              </button>
              <a href="#!" className="anchorTag-clear">
                CLEAR
              </a>
            </div>
            <div className="assign-modal-body">
              <table>
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Designation</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Naman.R
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Nidhi.J
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Rashmi.C
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Juhi.H
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                </tbody>
              </table>
              <textarea
                className="assign-modal-textArea"
                placeholder="Add Remarks"
              ></textarea>
              <button className="assign-butn btn-assign-tikcet" type="button">
                ASSIGN TICKETS
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

export default MyTicketList;
