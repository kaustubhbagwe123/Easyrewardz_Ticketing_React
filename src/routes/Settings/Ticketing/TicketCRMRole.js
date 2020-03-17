import React, { Component, useState } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import Sorting from "./../../../assets/Images/sorting.png";
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
import Modal from "react-responsive-modal";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class TicketCRMRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      RoleName: "",
      editRoleName: "",
      RoleisActive: "true",
      ModulesEnabled: "",
      ModulesDisabled: "",
      crmRoles: [],
      modulesList: [
        { moduleId: 1, moduleName: "Dashboard", isActive: true },
        { moduleId: 2, moduleName: "Tickets", isActive: false },
        { moduleId: 3, moduleName: "Knowledge Base", isActive: true },
        { moduleId: 4, moduleName: "Settings", isActive: true },
        { moduleId: 5, moduleName: "Chat", isActive: true },
        { moduleId: 6, moduleName: "Notification", isActive: false },
        { moduleId: 7, moduleName: "Reports", isActive: true }
      ],
      updateRoleName: "",
      updateRoleisActive: "",
      updateModulesEnabled: "",
      updateModulesDisabled: "",
      updateModulesList: [],
      crmrolesCompulsion: "",
      visible: false,
      activePopOver: 0,
      rowData: {},
      updateRoleNameCompulsion: "",
      modulesData: [],
      crmRoleID: 0,
      modulestatus: "",
      editSaveLoading: false,
      StatusModel:false,
      sortAllData:[],
      sortRoleName:[],
      sortCreated:[],
      sortStatus:[],
      sortColumn:"",
      roleColor:"",
      createdColor:"",
      statusColor:"",
      sortHeader:"",
      editRoleNameValidMsg: ""

       
     
     
    };

    this.handleRoleName = this.handleRoleName.bind(this);
    this.handleUpdateRoleName = this.handleUpdateRoleName.bind(this);
    this.handleModulesDefault = this.handleModulesDefault.bind(this);
    this.handleGetCRMRoles = this.handleGetCRMRoles.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);

    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.handleGetCRMRoles();
    this.handleModulesDefault();
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data,header) {
    debugger;

    this.setState({ StatusModel: true, sortColumn: data, sortHeader:header });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }

  setSortCheckStatus = (column, e) => {
    debugger;

    var itemsArray = [];
    var data = e.currentTarget.value;
    this.setState({
     roleColor:"",
     createdColor:"",
     statusColor:""
    
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
     
    } else if (column === "roleName") {
      this.state.crmRoles = this.state.sortAllData;
      itemsArray = this.state.crmRoles.filter(
        a => a.roleName === data
      );
      this.setState({
        roleColor:"sort-column"
       
      });
    } else if (column === "createdBy") {
      this.state.crmRoles = this.state.sortAllData;
      itemsArray = this.state.crmRoles.filter(a => a.createdBy === data);
      this.setState({
        createdColor:"sort-column"
        
      });
    }else if (column === "isRoleActive") {
      this.state.crmRoles = this.state.sortAllData;
      itemsArray = this.state.crmRoles.filter(a => a.isRoleActive === data);
      this.setState({
        statusColor:"sort-column"
       
      });
    }

    this.setState({
      crmRoles: itemsArray
    });
    this.StatusCloseModel();
  };

  handleGetCRMRoles() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoles",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        var data =res.data.responseData;
        let crmRoles = res.data.responseData;
        if (crmRoles !== null && crmRoles !== undefined) {
          self.setState({ crmRoles });
        }

        
        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].roleName]) {
              distinct.push(data[i].roleName);
              unique[data[i].roleName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortRoleName.push({ roleName: distinct[i] });
          }


          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy]) {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreated.push({ createdBy: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].isRoleActive]) {
              distinct.push(data[i].isRoleActive);
              unique[data[i].isRoleActive] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ isRoleActive: distinct[i] });
          }


        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleModulesDefault = async () => {
    debugger;
    let modulesList = [...this.state.modulesList],
      isActive,
      ModulesEnabled = "",
      ModulesDisabled = "";
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].isActive === true) {
        ModulesEnabled += modulesList[i].moduleId + ",";
      } else if (modulesList[i].isActive === false) {
        ModulesDisabled += modulesList[i].moduleId + ",";
      }
    }
    await this.setState({
      ModulesEnabled,
      ModulesDisabled
    });
  };
  checkModule = async moduleId => {
    debugger;
    let modulesList = [...this.state.modulesList],
      isActive,
      ModulesEnabled = "",
      ModulesDisabled = "";
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].moduleId === moduleId) {
        isActive = modulesList[i].isActive;
        modulesList[i].isActive = !isActive;
      }
    }
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].isActive === true) {
        ModulesEnabled += modulesList[i].moduleId + ",";
      } else if (modulesList[i].isActive === false) {
        ModulesDisabled += modulesList[i].moduleId + ",";
      }
    }
    await this.setState({
      modulesList,
      ModulesEnabled,
      ModulesDisabled
    });
  };
  updateCheckModule = async (e, moduleId) => {
    debugger;
    let updateModulesList = [...this.state.updateModulesList],
      isActive,
      updateModulesEnabled = "",
      updateModulesDisabled = "";
    for (let i = 0; i < updateModulesList.length; i++) {
      if (updateModulesList[i].moduleID === moduleId) {
        isActive = updateModulesList[i].modulestatus;
        updateModulesList[i].modulestatus = !isActive;
      }
    }
    for (let i = 0; i < updateModulesList.length; i++) {
      if (updateModulesList[i].modulestatus === true) {
        updateModulesEnabled += updateModulesList[i].moduleID + ",";
      } else if (updateModulesList[i].modulestatus === false) {
        updateModulesDisabled += updateModulesList[i].moduleID + ",";
      }
    }
    await this.setState({
      updateModulesList,
      updateModulesEnabled,
      updateModulesDisabled
    });
  };
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

  createUpdateCrmRole(e, addUpdate, crmRoleId) {
    debugger;
    let self = this;
    if (self.validator.allValid()) {
      let RoleisActive,
        CRMRoleID,
        RoleName,
        ModulesEnabled = "",
        ModulesDisabled = "";
      if (e === "add") {
        if (self.state.RoleisActive === "true") {
          RoleisActive = true;
        } else if (self.state.RoleisActive === "false") {
          RoleisActive = false;
        }
      } else if (e === "update") {
        if (this.state.modulestatus === "Active") {
          RoleisActive = true;
        } else if (this.state.modulestatus === "Inactive") {
          RoleisActive = false;
        }
      }
      if (e === "add") {
        CRMRoleID = 0;
        RoleName = self.state.RoleName;
        ModulesEnabled = self.state.ModulesEnabled;
        ModulesDisabled = self.state.ModulesDisabled;
      } else if (e === "update") {
        CRMRoleID = this.state.crmRoleID;
        RoleName = this.state.editRoleName;

        for (let j = 0; j < this.state.modulesData.length; j++) {
          if (this.state.modulesData[j].modulestatus) {
            ModulesEnabled += this.state.modulesData[j].moduleID + ",";
          } else {
            ModulesDisabled += this.state.modulesData[j].moduleID + ",";
          }
        }
        // ModulesEnabled = self.state.updateModulesEnabled.substring(
        //   0,
        //   self.state.updateModulesEnabled.length - 1
        // );
        // ModulesDisabled = self.state.updateModulesDisabled.substring(
        //   0,
        //   self.state.updateModulesDisabled.length - 1
        // );
      }
      this.setState({ editSaveLoading: true });
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
      })
        .then(res => {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            if (e === "add") {
              NotificationManager.success(
                "CRM Role added successfully.",
                "",
                1000
              );
              self.setState({
                RoleName: "",
                RoleisActive: "true",
                ModulesEnabled: "",
                ModulesDisabled: "",
                updateModulesEnabled: "",
                updateModulesDisabled: ""
              });
              self.handleGetCRMRoles();
            } else if (e === "update") {
              self.toggleEditModal();
              self.setState({
                editSaveLoading: false,
                editRoleNameValidMsg: ""
              });
              NotificationManager.success(
                "CRM Role updated successfully.",
                "",
                1000
              );
              self.handleGetCRMRoles();
            }
          } else if (status === "Record Already Exists ") {
            if (e === "add") {
              NotificationManager.error("Record Already Exists ");
            }
          } else {
            if (e === "add") {
              NotificationManager.error("CRM Role not added.", "", 1000);
            } else if (e === "update") {
              self.setState({ editSaveLoading: false });
              NotificationManager.error("CRM Role not updated.", "", 1000);
            }
          }
        })
        .catch(data => {
          self.setState({ editSaveLoading: false, editmodel: false });
          console.log(data);
        });
    } else {
      if (e === "update") {
        self.setState({
          editRoleNameValidMsg: "The role name field is required."
        });
      } else {
        this.validator.showMessages();
      }

      this.forceUpdate();
    }
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
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Record In use") {
          NotificationManager.error("Record in use.", "", 1000);
        } else if (status === "Record deleted Successfully") {
          NotificationManager.success("Record deleted Successfully.", "", 1000);
          self.handleGetCRMRoles();
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  updateCrmRole(individualData) {
    debugger;
    let updateRoleName = individualData.roleName,
      roleisActive = individualData.isRoleActive,
      updateRoleisActive,
      updateModulesList = individualData.modules;
    if (roleisActive === "Inactive") {
      updateRoleisActive = "false";
    } else {
      updateRoleisActive = "true";
    }
    this.setState({
      updateRoleName,
      updateRoleisActive,
      updateModulesList
    });
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  showPopOver = id => {
    debugger;
    this.setState({
      activePopOver: id,
      popOverVisible: true
    });
  };

  callBackEdit = (RoleName, modules, Status, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.RoleName = RoleName;
    this.state.updateModulesList = modules;
    this.state.updateRoleisActive = Status;
    this.state.rowData = rowData;
  };

  hanldeEditCRM = rowData => {
    debugger;
    this.setState({
      modulesData: rowData.modules,
      modulestatus: rowData.isRoleActive,
      editRoleName: rowData.roleName,
      crmRoleID: rowData.crmRoleID,
      editmodel: true
    });
  };

  handleModaleDataChange(e) {
    var Name = e.target.name;
    var value = e.target.value;

    if (Name === "status") {
      this.setState({ modulestatus: value });
    } else {
      if (value) {
        this.setState({ editRoleName: value, editRoleNameValidMsg: "" });
      } else {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "The role name field is required."
        });
      }
    }
  }

  handleModuleChange = id => {
    debugger;
    var index = this.state.modulesData.findIndex(x => x.moduleID === id);
    var modulesData = this.state.modulesData;
    modulesData[index].modulestatus = !modulesData[index].modulestatus;
    this.setState({ modulesData });
  };

  toggleEditModal() {
    this.setState({
      editmodel: false,
      editRoleNameValidMsg: ""
    });
  }
  render() {
    const columnsTickCrmRole = [
      {
        Header: (
          <span
          className={this.state.roleColor}
                           
          onClick={this.StatusOpenModel.bind(
            this,
            "roleName","Role Name"
          )}
          >
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
                <Popover
                  content={
                    <div>
                      {row.original.modules !== null &&
                        row.original.modules.map((item, i) => (
                          <div className="rvmmargin" key={i}>
                            <p className="rolle-name-text-popover">
                              {item.moduleName}
                            </p>
                            <label className="pop-over-lbl-text-pop">
                              {item.modulestatus === true
                                ? "Enabled"
                                : "Disabled"}
                            </label>
                          </div>
                        ))}
                    </div>
                  }
                  placement="bottom"
                >
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
          <span
          className={this.state.createdColor}
                           
          onClick={this.StatusOpenModel.bind(
            this,
            "createdBy","Created By"
          )}
          >
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
                <Popover
                  content={
                    <>
                      <div>
                        <b>
                          <p className="title">
                            Created By: {row.original.createdBy}
                          </p>
                        </b>
                        <p className="sub-title">
                          Created Date: {row.original.createdDate}
                        </p>
                      </div>
                      <div>
                        <b>
                          <p className="title">
                            Updated By: {row.original.modifiedBy}
                          </p>
                        </b>
                        <p className="sub-title">
                          Updated Date: {row.original.modifiedDate}
                        </p>
                      </div>
                    </>
                  }
                  placement="bottom"
                >
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
          <span
          className={this.state.statusColor}
                           
          onClick={this.StatusOpenModel.bind(
            this,
            "isRoleActive","Status"
          )}
          >
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
                        <p className="font-weight-bold blak-clr">
                          Delete file?
                        </p>
                        <p className="mt-1 fs-12">
                          Are you sure you want to delete this file?
                        </p>
                        <div className="del-can">
                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                          <button
                            className="butn"
                            onClick={this.deleteCrmRole.bind(
                              this,
                              row.original.crmRoleID
                            )}
                          >
                            Delete
                          </button>
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

                <button
                  className="react-tabel-button ReNewBtn"
                  type="button"
                  onClick={this.hanldeEditCRM.bind(this, row.original)}
                >
                  EDIT
                </button>
                {/* <Popover
                  content={
                    <Content
                      rowData={row.original}
                      callBackEdit={this.callBackEdit}
                      modulesList={this.state.modulesList}
                      updateCheckModule={this.updateCheckModule.bind(this)}
                      // updateModulesList={this.state.updateModulesList}
                      // updateModulesEnabled={this.state.updateModulesEnabled}
                      // updateModulesDisabled={this.state.updateModulesDisabled}
                      createUpdateCrmRole={this.createUpdateCrmRole.bind(this)}
                      checkModule={this.checkModule}
                    />
                  }
                  placement="bottom"
                  trigger="click"
                >
                  <label className="Table-action-edit-button-text">
                    <MyButton>EDIT</MyButton>
                  </label>
                </Popover> */}
              </span>
            </>
          );
        }
      }
    ];

    return (
      <React.Fragment>
         <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn text-center">
              <label style={{color:"#0066cc",fontWeight:"bold"}}>{this.state.sortHeader}</label>
                <div className="d-flex">
                 
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
              <a href=""
               style={{margin:"0 25px",textDecoration:"underline"}} 
                onClick={this.setSortCheckStatus.bind(this, "all")}
                >clear search</a>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="filter-type"
                    id={"fil-open"}
                    value="all"
                    onChange={this.setSortCheckStatus.bind(this, "all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                </div>
                {this.state.sortColumn === "roleName"
                  ? this.state.sortRoleName !== null &&
                    this.state.sortRoleName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.roleName}
                          id={"fil-open" + item.roleName}
                          value={item.roleName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "roleName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.roleName}>
                          <span className="table-btn table-blue-btn">
                            {item.roleName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

{this.state.sortColumn === "createdBy"
                  ? this.state.sortCreated !== null &&
                    this.state.sortCreated.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.createdBy}
                          id={"fil-open" + item.createdBy}
                          value={item.createdBy}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "createdBy"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.createdBy}>
                          <span className="table-btn table-blue-btn">
                            {item.createdBy}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

{this.state.sortColumn === "isRoleActive"
                  ? this.state.sortStatus !== null &&
                    this.state.sortStatus.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.isRoleActive}
                          id={"fil-open" + item.isRoleActive}
                          value={item.isRoleActive}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "isRoleActive"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.isRoleActive}>
                          <span className="table-btn table-blue-btn">
                            {item.isRoleActive}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            CRM Roles
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketCrmRoleReact">
                  <ReactTable
                    minRows={2}
                    data={this.state.crmRoles}
                    columns={columnsTickCrmRole}
                    resizable={false}
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
                        <div
                          className="module-switch crm-margin-div crm-padding-div"
                          key={i}
                        >
                          <div className="switch switch-primary d-inline m-r-10">
                            <label className="storeRole-name-text">
                              {item.moduleName}
                            </label>
                            <input
                              type="checkbox"
                              id={"i" + item.moduleId}
                              name="allModules"
                              attrIds={item.moduleId}
                              checked={item.isActive}
                              onChange={this.checkModule.bind(
                                this,
                                item.moduleId
                              )}
                            />
                            <label
                              htmlFor={"i" + item.moduleId}
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
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.createUpdateCrmRole.bind(this, "add")}
                      >
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
                    <CSVLink filename={"CRM.csv"} data={config.crmRoleTemplate}>
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
          <Modal
            open={this.state.editmodel}
            onClose={this.toggleEditModal}
            modalId="categoryEditModal"
          >
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
                  name="editRoleName"
                  value={this.state.editRoleName}
                  onChange={this.handleModaleDataChange.bind(this)}
                />
              </div>
              {this.state.editRoleNameValidMsg && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.editRoleNameValidMsg}
                </p>
              )}
              {this.state.modulesData !== null &&
                this.state.modulesData.map((item, i) => (
                  <div
                    className="module-switch crm-margin-div crm-padding-div"
                    key={i}
                  >
                    <div className="switch switch-primary d-inline m-r-10">
                      <label className="storeRole-name-text">
                        {item.moduleName}
                      </label>
                      <input
                        type="checkbox"
                        id={"k" + item.moduleID}
                        name="allModules"
                        attrIds={item.moduleID}
                        checked={item.modulestatus}
                        onChange={this.handleModuleChange.bind(
                          this,
                          item.moduleID
                        )}
                      />
                      <label
                        htmlFor={"k" + item.moduleID}
                        className="cr cr-float-auto"
                      ></label>
                    </div>
                  </div>
                ))}
              <div className="pop-over-div">
                <label className="edit-label-1">Status</label>
                <select
                  id="inputStatus"
                  className="edit-dropDwon dropdown-setting"
                  value={this.state.modulestatus}
                  name="status"
                  onChange={this.handleModaleDataChange.bind(this)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <br />
              <div className="text-center">
                <a className="pop-over-cancle" onClick={this.toggleEditModal}>
                  CANCEL
                </a>
                <button
                  className="pop-over-button FlNone"
                  onClick={this.createUpdateCrmRole.bind(
                    this,
                    "update",
                    this.state.crmRoleID
                  )}
                  disabled={this.state.editSaveLoading}
                >
                  <label className="pop-over-btnsave-text">
                    {this.state.editSaveLoading ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )}
                    SAVE
                  </label>
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default TicketCRMRole;
