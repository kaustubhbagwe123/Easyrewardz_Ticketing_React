import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
// import ReactTable from "react-table";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import MinusCircle from "./../../../assets/Images/minuscircle.png";
// import PlusCircle from "./../../../assets/Images/pluscircle.png";
// import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
// import { Popover } from "antd";
// import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
// import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class Module extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 10,
      modulesNames: [],
      modulesItems: [],
      moduleID: 0,
      activeID:[],
      inactiveID:[],
      moduleIDMyticket:0,
      modulesItemsMyticket: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetModulesNames = this.handleGetModulesNames.bind(this);
    this.handleGetModulesItems = this.handleGetModulesItems.bind(this);
    this.handleGetModulesItemsMyTicket=this.handleGetModulesItemsMyTicket.bind(this);
    this.handleUpdatedModule=this.handleUpdatedModule.bind(this);
  }
  //   handleChangeStart = () => {
  //     console.log('Change event started')
  //   };

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  componentDidMount() {
    this.handleGetModulesNames();
    // this.handleGetModulesItems();
  }

  checkModule = async (moduleItemID,moduleID) => {
    debugger;
    var activeIds=[];
    var inactiveIds=[];
    let modulesItems = [... this.state.modulesItems], isActive;
    for (let i = 0; i < modulesItems.length; i++) {
      if (modulesItems[i].moduleItemID === moduleItemID) {
        isActive = modulesItems[i].moduleItemisActive;
        modulesItems[i].moduleItemisActive = !isActive;
      }
    }
    for (let i = 0; i < modulesItems.length; i++){
      if( modulesItems[i].moduleItemisActive===true){
         var ids =modulesItems[i].moduleItemID;
         activeIds.push(ids);
      }
      else{
        var ids =modulesItems[i].moduleItemID;
        inactiveIds.push(ids);
      }
    }
    await this.setState({
      modulesItems,
      activeID:activeIds,
      inactiveID:inactiveIds,
      
    });
    this.handleUpdatedModule(moduleID);
    
  }

  checkModuleMyTicket = async (moduleItemID,moduleID) => {
    debugger;
    var activeIds=[];
    var inactiveIds=[];
    let modulesItemsMyticket = [... this.state.modulesItemsMyticket], isActive;
    for (let i = 0; i < modulesItemsMyticket.length; i++) {
      if (modulesItemsMyticket[i].moduleItemID === moduleItemID) {
        isActive = modulesItemsMyticket[i].moduleItemisActive;
        modulesItemsMyticket[i].moduleItemisActive = !isActive;
      }
    }
    for (let i = 0; i < modulesItemsMyticket.length; i++){
      if( modulesItemsMyticket[i].moduleItemisActive===true){
         var ids =modulesItemsMyticket[i].moduleItemID;
         activeIds.push(ids);
      }
      else{
        var ids =modulesItemsMyticket[i].moduleItemID;
        inactiveIds.push(ids);
      }
    }
    await this.setState({
      activeID:activeIds,
      inactiveID:inactiveIds,
      
    });
    this.handleUpdatedModule(moduleID);
    
    
  }

  
  changeModuleTab = async (moduleID) => {
    debugger;
    await this.setState({
      moduleID
    });
    this.handleGetModulesItems();
  }

  
  handleUpdatedModule(id) {
    debugger;
    let self = this;
    var activeitem="";
    var inactiveitem="";

    if (this.state.activeID !== null) {
      for (let i = 0; i < this.state.activeID.length; i++) {
        activeitem += this.state.activeID[i] + ",";
      }
    }
   
    if (this.state.inactiveID !== null) {
      for (let i = 0; i < this.state.inactiveID.length; i++) {
        inactiveitem += this.state.inactiveID[i] + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Module/ModifyModuleItems",
      headers: authHeader(),
      params:{
        ModuleID:id,
        ModulesActive:activeitem,
        ModuleInactive:inactiveitem
      }
      
    }).then(function (res) {
      debugger;
     
      let Msg = res.data.message;
      if (Msg === "Success") {

        NotificationManager.success("Record Updated successfully.");

      }
      else{
        NotificationManager.error("Record Not Updated");

      }
      self.setState({
        activeID:[],
        inactiveID:[]
      });
     
    });
  }

  handleGetModulesNames() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      let moduleID = data[0].moduleID;
      let moduleIDMyticket = data[1].moduleID;
     
      if (status === "Success") {
        self.setState({ modulesNames: data,moduleID,moduleIDMyticket
           });
          
      } else {
        self.setState({ modulesNames: [] });
      }
      self.handleGetModulesItems();
      self.handleGetModulesItemsMyTicket();
    });
  }
  handleGetModulesItems() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: this.state.moduleID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
     
      if (status === "Success") {
        self.setState({ modulesItems: data
           });
          
      } else {
        self.setState({ modulesItems: [] });
      }
    });
  }
  handleGetModulesItemsMyTicket() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: this.state.moduleIDMyticket
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      
      if (status === "Success") {
        self.setState({ modulesItemsMyticket: data
           });
          
      } else {
        self.setState({ modulesItemsMyticket: [] });
      }
    });
  }


  render() {
 
    return (
      <Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Modules
          </Link>
        </div>

        <div className="paddmodule">
          <div className="module-tabs">
            <section>
                {this.state.modulesNames.length > 0 && <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                  {this.state.modulesNames !== null && 
                  this.state.modulesNames.map((name, i) => (
                    
                    <Tab label={name.moduleName} key={i}>
                    
                      <div className="switch switch-primary">
                        <label className="moduleswitchtext-main">Field Name</label>
                        <label className="moduleswitchtext-main1">Show/Hide</label>
                      </div>
                  
                      {this.state.modulesItems !== null &&  name.moduleID===8 &&
                      this.state.modulesItems.map((item, i) => (
                        <div className="module-switch" key={i}>
                          <div className="switch switch-primary">
                            <label className="moduleswitchtext">{item.moduleItemName}</label>
                            <input name="moduleItems" checked={item.moduleItemisActive} type="checkbox" id={'i' + item.moduleItemID} onChange={this.checkModule.bind(this, item.moduleItemID,name.moduleID)} />
                            <label htmlFor={'i' + item.moduleItemID} className="cr"></label>
                          </div>
                        </div>
                      ))} 

                       {this.state.modulesItemsMyticket !== null &&  name.moduleID===9 &&
                      this.state.modulesItemsMyticket.map((item, i) => (
                        <div className="module-switch" key={i}>
                          <div className="switch switch-primary">
                            <label className="moduleswitchtext">{item.moduleItemName}</label>
                            <input name="moduleItems" checked={item.moduleItemisActive} type="checkbox" id={'i' + item.moduleItemID} onChange={this.checkModuleMyTicket.bind(this, item.moduleItemID,name.moduleID)}  />
                            <label htmlFor={'i' + item.moduleItemID} className="cr"></label>
                          </div>
                        </div>
                      ))} 


                    </Tab>

                    


                  ))}
                </Tabs>}
              {/* <Tabs>
                <Tab label="Advance Search">
                  <div className="switch switch-primary">
                    <label className="moduleswitchtext-main">Field Name</label>
                    <label className="moduleswitchtext-main1">Show/Hide</label>
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
                                defaultPageSize={5}
                                showPagination={false}
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
                                  <textarea className="shortcutarea" 
                                            placeholder="Active"
                                            maxLength={250}>
                                  </textarea>
                                  
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
              </Tabs> */}
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Module;
