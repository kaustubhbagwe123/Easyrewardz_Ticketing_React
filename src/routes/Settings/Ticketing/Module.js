import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import MinusCircle from "./../../../assets/Images/minuscircle.png";
import PlusCircle from "./../../../assets/Images/pluscircle.png";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Popover } from "antd";

class Module extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 10
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //   handleChangeStart = () => {
  //     console.log('Change event started')
  //   };

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  //   handleChangeComplete = () => {
  //     console.log('Change event completed')
  //   };
  render() {
    const InsertPlaceholder =(
      <div className="insertpop1">
        <div className="insertpop">
          <label className="">
            Customer Name
          </label>
          <label className="">
            Customer Name
          </label>
        </div>
        <div className="insertpop">
          <label className="">
            Customer Email
          </label>
          <label className="">
            Customer Email
          </label>
        </div>
        <div className="insertpop">
          <label className="">
            Customer City
          </label>
          <label className="">
            Customer City
          </label>
        </div>
      </div>
  )
    const { value } = this.state;
    const dataModule = [
      {
        bannedReason: <label>Spam</label>
      },
      {
        bannedReason: <label>Abusive</label>
      },
      {
        bannedReason: <label>Spam</label>
      },
      {
        bannedReason: <label>Abusive</label>
      },
      {
        bannedReason: <label>Spam</label>
      }
    ];

    const columnsModule = [
      {
        Header: (
          <span>
            Customer Name <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "custoName",
        Cell: props => <span>Naman</span>
      },
      {
        Header: (
          <span>
            Visitor IP <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "visiIp",
        Cell: props => <span>1.2.2.223.32</span>
      },
      {
        Header: (
          <span>
            Chat ID <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "chatId",
        Cell: props => <span>1234</span>
      },
      {
        Header: (
          <span>
            Chat date & Time <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "chatdate",
        Cell: props => <span>18-08-2019 12:23:11 PM</span>
      },
      {
        Header: (
          <span>
            Banned Reason <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "bannedReason"
      },
      {
        Header: (
          <span>
            Banned Till Date <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "bannedTill",
        Cell: props => <span>18-08-2019 12:23:11 PM</span>
      },
      {
        Header: (
          <span>
            Action
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "action",
        Cell: props => (
          <span>
            <button className="modulereactbtn" id="p-edit-pop-2">
              <label className="Table-action-edit-button-text">
                REMOVE BAN
              </label>
            </button>
          </span>
        )
      }
    ];

    const dataShortcut = [
      {
        shortcutname: "Goodbye",
        tagshortcut: "GoodBye_Survey",
        messageshortcut: (
          <span>
            <label>
              Thanks for chatting with us.Have We resolved yore Question(s)?
            </label>
            <div className="shortcut-option">
              <input type="radio" name="logout-status" id="yes" />
              <label htmlFor="yes" className="logout-label1">
                Yes
              </label>
              <input type="radio" name="logout-status" id="no" />
              <label htmlFor="no" className="logout-label1">
                No
              </label>
            </div>
          </span>
        )
      },
      {
        shortcutname: "Help",
        tagshortcut: "Help_Survey",
        messageshortcut: (
          <span>
            <label>Do you need any help?</label>
            <div className="shortcut-option">
              <input type="radio" name="logout-status" id="yes1" />
              <label htmlFor="yes1" className="logout-label1">
                Yes
              </label>
              <input type="radio" name="logout-status" id="no1" />
              <label htmlFor="no1" className="logout-label1">
                No
              </label>
            </div>
          </span>
        )
      },
      {
        shortcutname: "Hii",
        tagshortcut: " ",
        messageshortcut: (
          <span>
            <label>Hi,how can we help you today?</label>
          </span>
        )
      },
      {
        shortcutname: "Returning",
        tagshortcut: "Returning",
        messageshortcut: (
          <span>
            <label>Welcome back,how can we help you today?</label>
          </span>
        )
      },
      {
        shortcutname: "Other Help",
        tagshortcut: " ",
        messageshortcut: (
          <span>
            <label>Do you need any other help?</label>
            <div className="shortcut-option">
              <input type="radio" name="logout-status" id="yes2" />
              <label htmlFor="yes2" className="logout-label1">
                Yes
              </label>
              <input type="radio" name="logout-status" id="no2" />
              <label htmlFor="no2" className="logout-label1">
                No
              </label>
            </div>
          </span>
        )
      }
    ];

    const columnsShortcut = [
      {
        Header: (
          <span>
            Shortcut <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "shortcutname"
      },
      {
        Header: (
          <span>
            Message
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "messageshortcut"
      },
      {
        Header: (
          <span>
            Available For
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "availabeshortcut",
        Cell: props => <label>All Agents</label>
      },
      {
        Header: (
          <span>
            Tags
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "tagshortcut"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actionshortcut",
        Cell: props => (
          <span>
            <img src={DeleteIcon} alt="del-icon" className="downloadaction" />
            <button className="react-tabel-button" id="p-edit-pop-2">
              <label className="Table-action-edit-button-text">EDIT</label>
            </button>
          </span>
        )
      }
    ];

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to={Demo.BLANK_LINK}>Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK}>Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
            Modules
          </Link>
        </div>

        <div className="paddmodule">
          <div className="module-tabs">
            <section>
              <Tabs>
                <Tab label="Advance Search">
                  <div className="switch switch-primary">
                    <label className="moduleswitchtext-main">Field Name</label>
                    <label className="moduleswitchtext-main1">Show/Hide</label>
                    {/* <input type="checkbox" id="editDashboard-p-1"/>
                                    <label htmlFor="editDashboard-p-1" className="cr"></label> */}
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Creation Date</label>
                    <input type="checkbox" id="module-s-1" />
                    <label htmlFor="module-s-1" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">
                      Last Updated Date
                    </label>
                    <input type="checkbox" id="module-s-2" />
                    <label htmlFor="module-s-2" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Cetegory</label>
                    <input type="checkbox" id="module-s-3" />
                    <label htmlFor="module-s-3" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Sub Cetegory</label>
                    <input type="checkbox" id="module-s-4" />
                    <label htmlFor="module-s-4" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Issue Type</label>
                    <input type="checkbox" id="module-s-5" />
                    <label htmlFor="module-s-5" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Ticket Source</label>
                    <input type="checkbox" id="module-s-6" />
                    <label htmlFor="module-s-6" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Ticket ID/Title</label>
                    <input type="checkbox" id="module-s-7" />
                    <label htmlFor="module-s-7" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Ticket Priority</label>
                    <input type="checkbox" id="module-s-8" />
                    <label htmlFor="module-s-8" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Ticket Status</label>
                    <input type="checkbox" id="module-s-9" />
                    <label htmlFor="module-s-9" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">SLA Status</label>
                    <input type="checkbox" id="module-s-10" />
                    <label htmlFor="module-s-10" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Claim ID</label>
                    <input type="checkbox" id="module-s-11" />
                    <label htmlFor="module-s-11" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">
                      Invoice No/Sub Order No
                    </label>
                    <input type="checkbox" id="module-s-12" />
                    <label htmlFor="module-s-12" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Item ID</label>
                    <input type="checkbox" id="module-s-13" />
                    <label htmlFor="module-s-13" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Did visit store</label>
                    <input type="checkbox" id="module-s-14" />
                    <label htmlFor="module-s-14" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">
                      Want to visit store
                    </label>
                    <input type="checkbox" id="module-s-15" />
                    <label htmlFor="module-s-15" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Email</label>
                    <input type="checkbox" id="module-s-16" />
                    <label htmlFor="module-s-16" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Email</label>
                    <input type="checkbox" id="module-s-17" />
                    <label htmlFor="module-s-17" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Mobile No</label>
                    <input type="checkbox" id="module-s-18" />
                    <label htmlFor="module-s-18" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">Assign To</label>
                    <input type="checkbox" id="module-s-19" />
                    <label htmlFor="module-s-19" className="cr"></label>
                  </div>

                  <div className="switch switch-primary ">
                    <label className="moduleswitchtext">
                      Purchase Store Code/Addres
                    </label>
                    <input type="checkbox" id="module-s-20" />
                    <label htmlFor="module-s-20" className="cr"></label>
                  </div>
                </Tab>
                <Tab label="My Ticket">
                  <div className="switch switch-primary">
                    <label className="moduleswitchtext-main">Field Name</label>
                    <label className="moduleswitchtext-main1">Show/Hide</label>
                    {/* <input type="checkbox" id="editDashboard-p-1"/>
                                    <label htmlFor="editDashboard-p-1" className="cr"></label> */}
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Escalation</label>
                    <input type="checkbox" id="module-s-21" />
                    <label htmlFor="module-s-21" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">New</label>
                    <input type="checkbox" id="module-s-22" />
                    <label htmlFor="module-s-22" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Open</label>
                    <input type="checkbox" id="module-s-23" />
                    <label htmlFor="module-s-23" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Resolved</label>
                    <input type="checkbox" id="module-s-24" />
                    <label htmlFor="module-s-24" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Reassigned By Me</label>
                    <input type="checkbox" id="module-s-25" />
                    <label htmlFor="module-s-25" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Closed</label>
                    <input type="checkbox" id="module-s-26" />
                    <label htmlFor="module-s-26" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">All</label>
                    <input type="checkbox" id="module-s-27" />
                    <label htmlFor="module-s-27" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Follow Up</label>
                    <input type="checkbox" id="module-s-28" />
                    <label htmlFor="module-s-28" className="cr"></label>
                  </div>

                  <div className="switch switch-primary">
                    <label className="moduleswitchtext">Draft</label>
                    <input type="checkbox" id="module-s-29" />
                    <label htmlFor="module-s-29" className="cr"></label>
                  </div>
                </Tab>
                <Tab label="Chat">
                  <div className="chatparent-tabs">
                    <Tabs>
                      <Tab label="Banned Visitors">
                        <div className="modulereact">
                          <ReactTable
                            data={dataModule}
                            columns={columnsModule}
                            // resizable={false}
                            defaultPageSize={10}
                            showPagination={false}
                          />
                        </div>
                      </Tab>
                      <Tab label="Chat Allowed">
                        <div className="row">
                          <div className="col-md-4 chatallowed">
                            <label className="chatagent">
                              Chat Allowed Per Agent
                            </label>
                            <select>
                              <option>5</option>
                              <option>5</option>
                            </select>
                            <button className="Schedulenext1">
                              <label>SAVE</label>
                            </button>
                          </div>
                        </div>
                      </Tab>
                      <Tab label="Shortcuts">
                        <div className="backnonemodule">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="table-cntr table-height modulereactShortcut">
                              <ReactTable
                                data={dataShortcut}
                                columns={columnsShortcut}
                                // resizable={false}
                                defaultPageSize={10}
                                showPagination={false}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="createHierarchyMask" style={{marginTop:"-60px"}}>
                              <div className="createSpace">
                                <label className="create-department">
                                  CREATE SHORTCUT
                                </label>
                                <div className="div-padding-1">
                                  <label className="designation-name">
                                    Shortcut
                                  </label>
                                  <input type="text" className="txt-1" placeholder=" " />
                                </div>
                                <div className="divSpace">
                                  <div className="dropDrownSpace">
                                    <label className="reports-to">
                                      Available for
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-control dropdown-setting"
                                    >
                                      <option>select</option>
                                      <option>Root</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="dropDrownSpace">
                                  <label className="reports-to">Message</label>
                                  <textarea className="shortcutarea" placeholder="Active"></textarea>
                                  
                                </div>
                                
                                <div className="insertshortcut1">
                                <Popover content={InsertPlaceholder} placement="bottom">
                                  <label className="insertshortcut">Insert Placeholder</label>
                                  </Popover>  
                                </div>
                                
                                <div className="divSpace">
                                  <div className="dropDrownSpace1">
                                    <label className="reports-to">
                                      Options
                                    </label>
                                    <input type="text" className="txt-12" placeholder="Yes" />
                                    <img src={MinusCircle} className="minuscircleoption" alt="Info" />
                                    <input type="text" className="txt-1" placeholder="No" />
                                    <img src={MinusCircle} className="minuscircleoption" alt="Info" />
                                    <img src={PlusCircle} className="pluscircleoption" alt="Info" />
                                  </div>
                                </div>

                                <div className="divSpace">
                                  <div className="dropDrownSpace">
                                    <label className="reports-to">
                                      Tags
                                    </label>
                                    <input type="text" className="txt-1" placeholder=" " />
                                  </div>
                                </div>
                                
                                <div className="btnSpace">
                                  <button className="addBtn-ticket-hierarchy">
                                    <label className="addLable">SAVE</label>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </Tab>
                      <Tab label="Sounds & Notifications">
                        <div className="row notificationmodule">
                          <div className="col-md-9">
                            <label className="noti">Notification</label>
                          </div>
                        </div>
                        <div className="row notificationmodule">
                          <div className="col-md-9">
                            <label className="noti-text">
                              Set your notification preferences for when you are
                              in or away from the system. You will need to
                              configure your browser settings to allow
                              notifications
                            </label>
                          </div>
                        </div>
                        <div className="row notificationmodule">
                          <div className="col-md-9">
                            <label className="noti-text1">Chat Assigned</label>
                          </div>
                        </div>
                        <div className="row notificationmodule">
                          <div className="col-md-9">
                            <div className="filter-type pink1">
                              <div className="filter-checkbox pink2 mess1">
                                <input
                                  type="checkbox"
                                  id="chat"
                                  name="filter-type"
                                />
                                <label className="noti-text2" htmlFor="chat">
                                  Show notification for new chat assigned
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row notificationmodule">
                          <div className="col-md-9">
                            <label className="noti-text1">New Messages</label>
                          </div>
                        </div>
                        <div className="row notificationmodule">
                          <div className="col-md-9">
                            <div className="filter-type pink1">
                              <div className="filter-checkbox pink2 mess1">
                                <input
                                  type="checkbox"
                                  id="message"
                                  name="filter-type"
                                />
                                <label className="noti-text2" htmlFor="message">
                                  Show notification for new mesages in ongoing
                                  chats
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row notificationmodule"
                          style={{ marginTop: "60px", marginBottom: "20px" }}
                        >
                          <div className="col-md-9">
                            <label className="noti">Sounds</label>
                          </div>
                        </div>
                        <div className="row chatallowed">
                          <div className="col-md-3 ">
                            <label className="chatagent">Chat Assigned</label>
                            <select>
                              <option>select</option>
                              <option>5</option>
                            </select>
                          </div>
                          <div className="col-md-3">
                            <div className="slider" style={{marginTop:"45px"}}>
                              <Slider
                                min={0}
                                max={100}
                                value={value}
                                // onChangeStart={this.handleChangeStart}
                                onChange={this.handleChange}
                                // onChangeComplete={this.handleChangeComplete}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row chatallowed">
                          <div className="col-md-3">
                            <label className="chatagent">New Message</label>
                            <select>
                              <option>select</option>
                              <option>5</option>
                            </select>
                          </div>
                          <div className="col-md-3">
                            <div className="slider" style={{marginTop:"45px"}}>
                              <Slider
                                min={0}
                                max={100}
                                value={value}
                                // onChangeStart={this.handleChangeStart}
                                onChange={this.handleChange}
                                // onChangeComplete={this.handleChangeComplete}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row chatallowed">
                          <div className="col-md-10" style={{marginBottom:"40px"}}>
                            <button className="noti-button1">
                              <label className="noti-button-text1">
                                CANCEL
                              </label>
                            </button>
                            <button className="noti-button2">
                              <label className="noti-button-text2">
                                RESET TO DEFAULT
                              </label>
                            </button>
                            <button className="noti-button3">
                              <label className="noti-button-text3">
                                SAVE CHANGES
                              </label>
                            </button>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </Tab>
              </Tabs>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Module;
