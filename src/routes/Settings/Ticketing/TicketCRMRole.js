import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Demo from "./../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import DownExcel from "../../../assets/Images/csv.png";
import SimpleReactValidator from "simple-react-validator";
import { CSVLink } from "react-csv";

class TicketCRMRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      RoleName: '',
      RoleisActive: 'true',
      ModulesEnabled: '',
      ModulesDisabled: '',
      crmRoles: [],
      modulesList: [
        {moduleId: 1, moduleName: 'Dashboard', isActive: true},
        {moduleId: 2, moduleName: 'Tickets', isActive: false},
        {moduleId: 3, moduleName: 'Knowledge Base', isActive: true},
        {moduleId: 4, moduleName: 'Settings', isActive: true},
        {moduleId: 5, moduleName: 'Chat', isActive: true},
        {moduleId: 6, moduleName: 'Notification', isActive: false},
        {moduleId: 7, moduleName: 'Reports', isActive: true}
      ],
      updateRoleName: '',
      updateRoleisActive: '',
      updateModulesEnabled: '',
      updateModulesDisabled: '',
      updateModulesList: [],
      
    };

    this.handleRoleName = this.handleRoleName.bind(this);
    this.handleUpdateRoleName = this.handleUpdateRoleName.bind(this);
    this.handleModulesDefault = this.handleModulesDefault.bind(this);
    this.handleGetCRMRoles = this.handleGetCRMRoles.bind(this);
    
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.handleModulesDefault();
    this.handleGetCRMRoles();
    
  }

  handleGetCRMRoles() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoles",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let crmRoles = res.data.responseData;
      if (crmRoles !== null && crmRoles !== undefined) {
        self.setState({ crmRoles });
      }
    });
  }
  
  handleModulesDefault = async () => {
    debugger;
    let modulesList = [... this.state.modulesList], isActive, ModulesEnabled = '', ModulesDisabled = '';
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].isActive === true) {
        ModulesEnabled += modulesList[i].moduleId + ',';
      } else if (modulesList[i].isActive === false) {
        ModulesDisabled += modulesList[i].moduleId + ',';
      }
    }
    await this.setState({
      ModulesEnabled, ModulesDisabled
    });
  }
  checkModule = async (moduleId) => {
    debugger;
    let modulesList = [... this.state.modulesList], isActive, ModulesEnabled = '', ModulesDisabled = '';
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].moduleId === moduleId) {
        isActive = modulesList[i].isActive;
        modulesList[i].isActive = !isActive;
      }
    }
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].isActive === true) {
        ModulesEnabled += modulesList[i].moduleId + ',';
      } else if (modulesList[i].isActive === false) {
        ModulesDisabled += modulesList[i].moduleId + ',';
      }
    }
    await this.setState({
      modulesList, ModulesEnabled, ModulesDisabled
    });
  }
  updateCheckModule = async (moduleId) => {
    debugger;
    let updateModulesList = [... this.state.updateModulesList], isActive, updateModulesEnabled = '', updateModulesDisabled = '';
    for (let i = 0; i < updateModulesList.length; i++) {
      if (updateModulesList[i].moduleID === moduleId) {
        isActive = updateModulesList[i].modulestatus;
        updateModulesList[i].modulestatus = !isActive;
      }
    }
    for (let i = 0; i < updateModulesList.length; i++) {
      if (updateModulesList[i].modulestatus === true) {
        updateModulesEnabled += updateModulesList[i].moduleID + ',';
      } else if (updateModulesList[i].modulestatus === false) {
        updateModulesDisabled += updateModulesList[i].moduleID + ',';
      }
    }
    await this.setState({
      updateModulesList, updateModulesEnabled, updateModulesDisabled
    });
  }
  handleRoleName(e) {
    debugger;
    this.setState({
      RoleName: e.target.value
    });
  }
  handleUpdateRoleName(e) {
    debugger;
    this.setState({
      updateRoleName: e.target.value
    });
  }
  handleRoleisActive = e => {
    debugger;
    let RoleisActive = e.currentTarget.value;
    this.setState({ RoleisActive });
  };
  handleUpdateRoleisActive = e => {
    debugger;
    let updateRoleisActive = e.currentTarget.value;
    this.setState({ updateRoleisActive });
  };

  createUpdateCrmRole(addUpdate, crmRoleId) {
    debugger;
    // if (this.validator.allValid()) {
      let self=this;
      let RoleisActive, CRMRoleID, RoleName, ModulesEnabled, ModulesDisabled;
      if (addUpdate === 'add') {
        if (this.state.RoleisActive === 'true') {
          RoleisActive = true
        } else if (this.state.RoleisActive === 'false') {
          RoleisActive = false
        }
      } else if (addUpdate === 'update') {
        if (this.state.updateRoleisActive === 'true') {
          RoleisActive = true
        } else if (this.state.updateRoleisActive === 'false') {
          RoleisActive = false
        }
      }
      if (addUpdate === 'add') {
        CRMRoleID = 0
        RoleName = this.state.RoleName
        ModulesEnabled = this.state.ModulesEnabled
        ModulesDisabled = this.state.ModulesDisabled
      } else if (addUpdate === 'update') {
        CRMRoleID = crmRoleId
        RoleName = this.state.updateRoleName
        ModulesEnabled = this.state.updateModulesEnabled
        ModulesDisabled = this.state.updateModulesDisabled
      }
      axios({
        method: "post",
        url: config.apiUrl + "/CRMRole/CreateUpdateCRMRole",
        headers: authHeader(),
        params: {
          CRMRoleID: CRMRoleID,
          RoleName: RoleName,
          RoleisActive: RoleisActive,
          ModulesEnabled: ModulesEnabled,
          ModulesDisabled: ModulesDisabled
        }
      }).then((res) => {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          if (addUpdate === 'add') {
            NotificationManager.success("CRM Role added successfully.");
            self.setState({
              RoleName:'',
              RoleisActive:'true',
              ModulesEnabled:'',
              updateModulesEnabled:'',
              updateModulesDisabled:''
            })
            self.handleGetCRMRoles();
          } else if (addUpdate === 'update') {
            NotificationManager.success("CRM Role updated successfully.");
          }
        } else {
          if (addUpdate === 'add') {
            NotificationManager.error("CRM Role not added.");
          } else if (addUpdate === 'update') {
            NotificationManager.error("CRM Role not updated.");
          }
        }
      });
    // } else {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }
  }

  deleteCrmRole(deleteId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/DeleteCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: deleteId
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("CRM Role deleted successfully.");
        self.handleGetCRMRoles();
      } else {
        NotificationManager.error("CRM Role not deleted.");
      }
    });
  }
  
  updateCrmRole(individualData) {
    debugger;
    let updateRoleName = individualData.roleName, roleisActive =  individualData.isRoleActive, updateRoleisActive, updateModulesList = individualData.modules;
    if (roleisActive === 'Inactive') {
      updateRoleisActive = 'false'
    } else {
      updateRoleisActive = 'true'
    }
    this.setState({
      updateRoleName, updateRoleisActive, updateModulesList
    })
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };

  render() {
   
    const columnsTickCrmRole = [
      {
        Header: (
          <span>
            Role Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "roleName",
        Cell: row => {
          // var ids = row.original["id"];
          return (
            <div>
            <span>
            {row.original.roleName}
              <Popover content={
                      <div>
                        {row.original.modules !== null &&
                        row.original.modules.map((item, i) => (
                          <div className="rvmmargin" key={i}>
                            <p className="rolle-name-text-popover">{item.moduleName}</p>
                            <label className="pop-over-lbl-text-pop">{item.modulestatus === true ? 'Enabled' : 'Disabled'}</label>
                          </div>
                        ))}
                    </div>
              } placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                />
              </Popover>
            </span>
          </div>
          );
        }
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdBy",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                {row.original.createdBy}
                <Popover content={
                  <>
                  <div>
                    <b>
                <p className="title">Created By: {row.original.createdBy}</p>
                    </b>
                <p className="sub-title">Created Date: {row.original.createdDate}</p>
                  </div>
                  <div>
                    <b>
                      <p className="title">Updated By: {row.original.modifiedBy}</p>
                    </b>
                    <p className="sub-title">Updated Date: {row.original.modifiedDate}</p>
                  </div>
                </>
                } placement="bottom">
                  <img
                    className="info-icon-cp"
                    src={BlackInfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover>
              </span>
            </div>
          );
        }
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "isRoleActive"
      },
      {
        Header: <span>Actions</span>,
        accessor: "actiondept",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                <Popover
                  content={
                    <div className="d-flex general-popover popover-body">
                      <div className="del-big-icon">
                        <img src={DelBigIcon} alt="del-icon" />
                      </div>
                      <div>
                        <p className="font-weight-bold blak-clr">Delete file?</p>
                        <p className="mt-1 fs-12">
                          Are you sure you want to delete this file?
                        </p>
                        <div className="del-can">
                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                          <button className="butn" onClick={this.deleteCrmRole.bind(this, row.original.crmRoleID)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover
                  content={
                    <div className="edtpadding">
                      <div className="">
                        <label className="popover-header-text">EDIT CRM ROLE</label>
                      </div>
                      <div className="pop-over-div">
                        <label className="edit-label-1">Role Name</label>
                        <input
                          type="text"
                          className="txt-edit-popover"
                          placeholder="Enter Role Name"
                          maxLength={25}
                          value={this.state.updateRoleName}
                          onChange={this.handleUpdateRoleName}
                        />
                      </div>

                      {this.state.updateModulesList !== null &&
                      this.state.updateModulesList.map((item, i) => (
                        <div className="module-switch crm-margin-div" key={i}>
                          <div className="switch switch-primary d-inline m-r-10">
                            <label className="storeRole-name-text">{item.moduleName}</label>
                            <input type="checkbox" id={'ii' + item.moduleID}
                              name="updateAllModules"
                              attrIds={item.moduleID}
                              checked={item.modulestatus}
                              onChange={this.updateCheckModule.bind(this, item.moduleID)}
                            />
                            <label
                              htmlFor={'ii' + item.moduleID}
                              className="cr cr-float-auto"
                            ></label>
                          </div>
                        </div>
                      ))}

                      {/* <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Dashboard</label>
                          <input type="checkbox" id="Dashboard-po-1" />
                          <label
                            htmlFor="Dashboard-po-1"
                            className="cr cr-float-auto"
                          ></label>
                        </div>
                      </div>
                      <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Tickets</label>
                          <input type="checkbox" id="Tickets-po-2" />
                          <label htmlFor="Tickets-po-2" className="cr cr-float-auto"></label>
                        </div>
                      </div>
                      <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Knowledge Base</label>
                          <input type="checkbox" id="Knowledge-po-3" />
                          <label
                            htmlFor="Knowledge-po-3"
                            className="cr cr-float-auto"
                          ></label>
                        </div>
                      </div>
                      <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Settings</label>
                          <input type="checkbox" id="Claim-po-3" />
                          <label htmlFor="Claim-po-3" className="cr cr-float-auto"></label>
                        </div>
                      </div>
                      <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Chat</label>
                          <input type="checkbox" id="Chat-po-5" />
                          <label htmlFor="Chat-po-5" className="cr cr-float-auto"></label>
                        </div>
                      </div>
                      <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Notification</label>
                          <input type="checkbox" id="Notification-po-4" />
                          <label
                            htmlFor="Notification-po-4"
                            className="cr cr-float-auto"
                          ></label>
                        </div>
                      </div>

                      <div className="crm-margin-div">
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">Reports</label>
                          <input type="checkbox" id="Reports-po-6" />
                          <label htmlFor="Reports-po-6" className="cr cr-float-auto"></label>
                        </div>
                      </div> */}

                      <div className="pop-over-div">
                        <label className="edit-label-1">Status</label>
                        <select id="inputStatus" className="edit-dropDwon dropdown-setting"
                        value={this.state.updateRoleisActive}
                        onChange={this.handleUpdateRoleisActive}
                        >
                          <option value="true">Active</option>
                          <option value="false">Deactive</option>
                        </select>
                      </div>
                      <br />
                      <div>
                      <a className="pop-over-cancle" href={Demo.BLANK_LINK}>CANCEL</a>
                        <button className="pop-over-button">
                          <label className="pop-over-btnsave-text" onClick={this.createUpdateCrmRole.bind(this, 'update', row.original.crmRoleID)}>SAVE</label>
                        </button>
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <button className="react-tabel-button" id="p-edit-pop-2" onClick={this.updateCrmRole.bind(this, row.original)}>
                    <label className="Table-action-edit-button-text">
                      EDIT
                    </label>
                  </button>
                </Popover>
              </span>
            </>
          );
        }
      }
    ];

    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            CRM Roles
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketCrmRoleReact">
                  <ReactTable
                    data={this.state.crmRoles}
                    columns={columnsTickCrmRole}
                    // resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                  />
                   {/* <div className="position-relative">
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
                  </div> */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="create-department">CREATE CRM ROLE</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Role Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Role Name"
                        maxLength={25}
                        onChange={this.handleRoleName}
                      />
                      {this.validator.message(
                        "Role Name",
                        this.state.RoleName,
                        "required"
                      )}
                    </div>
                    {this.state.modulesList !== null &&
                      this.state.modulesList.map((item, i) => (
                        <div className="module-switch crm-margin-div crm-padding-div" key={i}>
                          <div className="switch switch-primary d-inline m-r-10">
                            <label className="storeRole-name-text">{item.moduleName}</label>
                            <input type="checkbox" id={'i' + item.moduleId}
                              name="allModules"
                              attrIds={item.moduleId}
                              checked={item.isActive}
                              onChange={this.checkModule.bind(this, item.moduleId)}
                            />
                            <label
                              htmlFor={'i' + item.moduleId}
                              className="cr cr-float-auto"
                            ></label>
                            {/* <label htmlFor={"i" + item.brandID}>
                              <input
                                type="checkbox"
                                id={"i" + item.brandID}
                                className="ch1"
                                name="allBrand"
                                attrIds={item.brandID}
                                onChange={this.checkIndividualBrand.bind(this)}
                              />
                              <span className="ch1-text">{item.brandName}</span>
                            </label> */}
                          </div>
                        </div>
                      ))}
                    {/* <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Dashboard</label>
                        <input type="checkbox" id="Dashboard-p-1" />
                        <label
                          htmlFor="Dashboard-p-1"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Tickets</label>
                        <input type="checkbox" id="Tasks-p-2" />
                        <label
                          htmlFor="Tasks-p-2"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">
                          Knowledge Base
                        </label>
                        <input type="checkbox" id="Claim-p-3" />
                        <label
                          htmlFor="Claim-p-3"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Settings</label>
                        <input type="checkbox" id="Notification-p-4" />
                        <label
                          htmlFor="Notification-p-4"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Chat</label>
                        <input type="checkbox" id="Settings-p-5" />
                        <label
                          htmlFor="Settings-p-5"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">
                          Notification
                        </label>
                        <input type="checkbox" id="Notification-p-5" />
                        <label
                          htmlFor="Notification-p-5"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div>
                    <div className="crm-margin-div crm-padding-div">
                      <div className="switch switch-primary d-inline m-r-10">
                        <label className="storeRole-name-text">Reports</label>
                        <input type="checkbox" id="Reports-p-6" />
                        <label
                          htmlFor="Reports-p-6"
                          className="cr cr-float-auto"
                        ></label>
                      </div>
                    </div> */}
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        value={this.state.RoleisActive}
                        onChange={this.handleRoleisActive}
                        id="inputState"
                        className="form-control dropdown-setting"
                      >
                        <option value="true">Active</option>
                        <option value="false">Deactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button className="addBtn-ticket-hierarchy" onClick={this.createUpdateCrmRole.bind(this, 'add')}>
                       ADD
                        </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <h3>Bulk Upload</h3>
                    Template
                    <CSVLink filename={"CRM.csv"}  data={config.crmRoleTemplate}>
                       <img src={DownExcel} alt="download icon" />
                    </CSVLink>
                    <input
                      id="file-upload"
                      className="file-upload d-none"
                      type="file"
                      onChange={this.fileUpload.bind(this)}
                    />
                    <label htmlFor="file-upload">
                      <div className="file-icon">
                        <img src={FileUpload} alt="file-upload" />
                      </div>
                      <span>Add File</span> or Drop File here
                    </label>
                    {this.state.fileName && (
                      <div className="file-info">
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <div className="del-file" id="del-file-1">
                              <img src={DelBlack} alt="delete-black" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="auto"
                              target="del-file-1"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
                                </div>
                                <div>
                                  <p className="font-weight-bold blak-clr">
                                    Delete file?
                                  </p>
                                  <p className="mt-1 fs-12">
                                    Are you sure you want to delete this file?
                                  </p>
                                  <div className="del-can">
                                    <a href={Demo.BLANK_LINK}>CANCEL</a>
                                    <button className="butn">Delete</button>
                                  </div>
                                </div>
                              </PopoverBody>
                            </UncontrolledPopover>
                          </div>
                          <div>
                            <span className="file-size">122.6kb</span>
                          </div>
                        </div>
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <a className="file-retry" href={Demo.BLANK_LINK}>
                              Retry
                            </a>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
                          </div>
                        </div>
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name pr-0">
                              {this.state.fileName}
                            </p>
                          </div>
                          <div>
                            <div className="d-flex align-items-center mt-2">
                              <ProgressBar className="file-progress" now={60} />
                              <div className="cancel-upload">
                                <img src={UploadCancel} alt="upload cancel" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="butn">ADD</button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default TicketCRMRole;
