import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Spin } from "antd";
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
  // NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DownExcel from "../../../assets/Images/csv.png";
import SimpleReactValidator from "simple-react-validator";
import { CSVLink } from "react-csv";
import Modal from "react-responsive-modal";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

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
        { moduleId: 7, moduleName: "Reports", isActive: true },
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
      StatusModel: false,
      sortAllData: [],
      sortRoleName: [],
      sortCreated: [],
      sortStatus: [],
      sortColumn: "",
      roleColor: "",
      createdColor: "",
      statusColor: "",
      sortHeader: "",
      editRoleNameValidMsg: "",
      editCheckRoleName: "",
      checkRoleName: "",
      tempcrmRoles: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFilterRoleName: [],
      sortFilterCreated: [],
      sortFilterStatus: [],
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      sroleNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisRoleActiveFilterCheckbox: "",
      isortA: false,
      bulkuploadLoading: false,
      translateLanguage: {}
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

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.crmRoles;

    if (this.state.sortColumn === "roleName") {
      itemsArray.sort((a, b) => {
        if (a.roleName < b.roleName) return 1;
        if (a.roleName > b.roleName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return 1;
        if (a.createdBy > b.createdBy) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "isRoleActive") {
      itemsArray.sort((a, b) => {
        if (a.isRoleActive < b.isRoleActive) return 1;
        if (a.isRoleActive > b.isRoleActive) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      crmRoles: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.crmRoles;

    if (this.state.sortColumn === "roleName") {
      itemsArray.sort((a, b) => {
        if (a.roleName < b.roleName) return -1;
        if (a.roleName > b.roleName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return -1;
        if (a.createdBy > b.createdBy) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "isRoleActive") {
      itemsArray.sort((a, b) => {
        if (a.isRoleActive < b.isRoleActive) return -1;
        if (a.isRoleActive > b.isRoleActive) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      crmRoles: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    debugger;
    if (
      this.state.sortFilterRoleName.length === 0 ||
      this.state.sortFilterCreated.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "roleName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sisRoleActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sisRoleActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sroleNameFilterCheckbox !== "" ||
        this.state.sisRoleActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sroleNameFilterCheckbox: "",
          sisRoleActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "isRoleActive") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sroleNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sroleNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel = (e) => {
    if (this.state.tempcrmRoles.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        crmRoles: this.state.tempcrmRoles,
        sortFilterRoleName: this.state.sortRoleName,
        sortFilterCreated: this.state.sortCreated,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "roleName") {
        if (this.state.sroleNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sisRoleActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sroleNameFilterCheckbox: "",
            sisRoleActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "isRoleActive") {
        if (this.state.sisRoleActiveFilterCheckbox === "") {
        } else {
          this.setState({
            sroleNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        sortFilterRoleName: this.state.sortRoleName,
        sortFilterCreated: this.state.sortCreated,
        sortFilterStatus: this.state.sortStatus,
        crmRoles: this.state.isortA
          ? this.state.crmRoles
          : this.state.sortAllData,
      });
    }
  };

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sroleNameFilterCheckbox = this.state.sroleNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sisRoleActiveFilterCheckbox = this.state.sisRoleActiveFilterCheckbox;

    if (column === "roleName" || column === "all") {
      if (type === "value" && type !== "All") {
        sroleNameFilterCheckbox = sroleNameFilterCheckbox.replace("all", "");
        sroleNameFilterCheckbox = sroleNameFilterCheckbox.replace("all,", "");
        if (sroleNameFilterCheckbox.includes(e.currentTarget.value)) {
          sroleNameFilterCheckbox = sroleNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sroleNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sroleNameFilterCheckbox.includes("all")) {
          sroleNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "roleName") {
            for (let i = 0; i < this.state.sortRoleName.length; i++) {
              sroleNameFilterCheckbox +=
                this.state.sortRoleName[i].roleName + ",";
            }
            sroleNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (screatedByFilterCheckbox.includes(e.currentTarget.value)) {
          screatedByFilterCheckbox = screatedByFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedByFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedByFilterCheckbox.includes("all")) {
          screatedByFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdBy") {
            for (let i = 0; i < this.state.sortCreated.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreated[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "isRoleActive" || column === "all") {
      if (type === "value" && type !== "All") {
        sisRoleActiveFilterCheckbox = sisRoleActiveFilterCheckbox.replace(
          "all",
          ""
        );
        sisRoleActiveFilterCheckbox = sisRoleActiveFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sisRoleActiveFilterCheckbox.includes(e.currentTarget.value)) {
          sisRoleActiveFilterCheckbox = sisRoleActiveFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sisRoleActiveFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sisRoleActiveFilterCheckbox.includes("all")) {
          sisRoleActiveFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "isRoleActive") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sisRoleActiveFilterCheckbox +=
                this.state.sortStatus[i].isRoleActive + ",";
            }
            sisRoleActiveFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sroleNameFilterCheckbox,
      screatedByFilterCheckbox,
      sisRoleActiveFilterCheckbox,
      roleColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "roleName") {
      var sItems = sroleNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.roleName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        roleColor: "sort-column",
      });
    } else if (column === "createdBy") {
      var sItems = screatedByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdBy === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column",
      });
    } else if (column === "isRoleActive") {
      var sItems = sisRoleActiveFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.isRoleActive === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        statusColor: "sort-column",
      });
    }

    this.setState({
      tempcrmRoles: itemsArray,
    });
    // this.StatusCloseModel();
  };

  handleGetCRMRoles() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoles",
      headers: authHeader(),
    })
      .then(function (res) {
        debugger;
        var data = res.data.responseData;
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
            self.state.sortFilterRoleName.push({ roleName: distinct[i] });
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
            self.state.sortFilterCreated.push({ createdBy: distinct[i] });
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
            self.state.sortFilterStatus.push({ isRoleActive: distinct[i] });
          }
        }
      })
      .catch((data) => {
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
      ModulesDisabled,
    });
  };
  checkModule = async (moduleId) => {
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
      ModulesDisabled,
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
      updateModulesDisabled,
    });
  };
  handleRoleName(e) {
    debugger;
    this.setState({
      RoleName: e.target.value,
    });
  }
  handleUpdateRoleName(e) {
    debugger;
    this.setState({
      updateRoleName: e.target.value,
    });
  }
  handleRoleisActive = (e) => {
    debugger;
    let RoleisActive = e.currentTarget.value;
    this.setState({ RoleisActive });
  };
  handleUpdateRoleisActive = (e) => {
    debugger;
    let updateRoleisActive = e.currentTarget.value;
    this.setState({ updateRoleisActive });
  };

  createUpdateCrmRole(e, addUpdate, crmRoleId) {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    // if (self.validator.allValid()) {
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
      if (self.state.RoleName === "") {
        this.setState({
          checkRoleName: TranslationContext !== undefined
            ? TranslationContext.validation.required
            : "Required"
        });
        return false;
      }
      CRMRoleID = 0;
      RoleName = self.state.RoleName;
      ModulesEnabled = self.state.ModulesEnabled;
      ModulesDisabled = self.state.ModulesDisabled;
    } else if (e === "update") {
      if (this.state.editRoleName == "") {
        this.setState({
          editCheckRoleName: TranslationContext !== undefined
            ? TranslationContext.validation.required
            : "Required"
        });
        return false;
      }

      CRMRoleID = this.state.crmRoleID;
      RoleName = this.state.editRoleName;

      for (let j = 0; j < this.state.modulesData.length; j++) {
        if (this.state.modulesData[j].modulestatus) {
          ModulesEnabled += this.state.modulesData[j].moduleID + ",";
        } else {
          ModulesDisabled += this.state.modulesData[j].moduleID + ",";
        }
      }
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
        ModulesDisabled: ModulesDisabled,
      },
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          if (e === "add") {
            NotificationManager.success(TranslationContext !== undefined
              ? TranslationContext.alertmessage.crmroleaddedsuccessfully
              : "CRM Role added successfully.");
            self.setState({
              RoleName: "",
              RoleisActive: "true",
              ModulesEnabled: "",
              ModulesDisabled: "",
              updateModulesEnabled: "",
              updateModulesDisabled: "",
            });
            self.handleGetCRMRoles();
          } else if (e === "update") {
            self.toggleEditModal();
            self.setState({
              editSaveLoading: false,
              editRoleNameValidMsg: "",
            });
            NotificationManager.success(TranslationContext !== undefined
              ? TranslationContext.alertmessage.crmroleupdatedsuccessfully
              : "CRM Role updated successfully.");
            self.handleGetCRMRoles();
          }
        } else if (status === "Record Already Exists ") {
          if (e === "add") {
            NotificationManager.error(TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordalreadyexists
              : "Record Already Exists ");
          }
        } else {
          if (e === "add") {
            NotificationManager.error(TranslationContext !== undefined
              ? TranslationContext.alertmessage.crmrolenotadded
              : "CRM Role not added.");
          } else if (e === "update") {
            self.setState({ editSaveLoading: false });
            NotificationManager.error(TranslationContext !== undefined
              ? TranslationContext.alertmessage.crmrolenotupdated
              : "CRM Role not updated.");
          }
        }
      })
      .catch((data) => {
        self.setState({ editSaveLoading: false, editmodel: false });
        console.log(data);
      });

    this.forceUpdate();
    // }
  }

  deleteCrmRole(deleteId) {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/DeleteCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: deleteId,
      },
    })
      .then(function (res) {
        debugger;
        let status = res.data.message;
        if (status === "Record In use") {
          NotificationManager.error(TranslationContext !== undefined
            ? TranslationContext.alertmessage.recordinuse
            : "Record in use.");
        } else if (status === "Record deleted Successfully") {
          NotificationManager.success(TranslationContext !== undefined
            ? TranslationContext.alertmessage.recorddeletedsuccessfully
            : "Record deleted Successfully.");
          self.handleGetCRMRoles();
        }
      })
      .catch((data) => {
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
      updateModulesList,
    });
  }

  fileUpload = (e) => {
    debugger;
    var allFiles = [];
    var selectedFiles = e;
    if (selectedFiles) {
      allFiles.push(selectedFiles[0]);

      var fileSize = formatSizeUnits(selectedFiles[0].size);
      this.setState({
        fileSize,
        fileN: allFiles,
        fileName: allFiles[0].name,
        bulkuploadCompulsion: "",
      });
    }
  };
  showPopOver = (id) => {
    debugger;
    this.setState({
      activePopOver: id,
      popOverVisible: true,
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

  hanldeEditCRM = (rowData) => {
    debugger;
    this.setState({
      modulesData: rowData.modules,
      modulestatus: rowData.isRoleActive,
      editRoleName: rowData.roleName,
      crmRoleID: rowData.crmRoleID,
      editmodel: true,
    });
  };

  handleModaleDataChange(e) {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    var Name = e.target.name;
    var value = e.target.value;

    if (Name === "status") {
      this.setState({ modulestatus: value });
    } else {
      if (value !== "") {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "",
          editCheckRoleName: "",
        });
      } else {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "The role name field is required.",
          editCheckRoleName: TranslationContext !== undefined
            ? TranslationContext.validation.required
            : "Required",
        });
      }
    }
  }

  handleModuleChange = (id) => {
    debugger;
    var index = this.state.modulesData.findIndex((x) => x.moduleID === id);
    var modulesData = this.state.modulesData;
    modulesData[index].modulestatus = !modulesData[index].modulestatus;
    this.setState({ modulesData });
  };

  toggleEditModal() {
    this.setState({
      editmodel: false,
      editRoleNameValidMsg: "",
      editCheckRoleName: "",
    });
  }
  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "roleName") {
      var sortFilterRoleName = matchSorter(
        this.state.sortRoleName,
        e.target.value,
        { keys: ["roleName"] }
      );
      if (sortFilterRoleName.length > 0) {
        this.setState({ sortFilterRoleName });
      } else {
        this.setState({
          sortFilterRoleName: this.state.sortRoleName,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreated = matchSorter(
        this.state.sortCreated,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreated.length > 0) {
        this.setState({ sortFilterCreated });
      } else {
        this.setState({
          sortFilterCreated: this.state.sortCreated,
        });
      }
    }
    if (this.state.sortColumn === "isRoleActive") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["isRoleActive"] }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: this.state.sortStatus,
        });
      }
    }
  }
  hanldeAddBulkUpload() {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;
      this.setState({
        bulkuploadLoading: true,
      });
      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);
      // this.setState({ showProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/CRMRole/BulkUploadCRMRole",
        headers: authHeader(),
        data: formData,
        onUploadProgress: (ev = ProgressEvent) => {
          const progress = (ev.loaded / ev.total) * 100;
          this.updateUploadProgress(Math.round(progress));
        },
      })
        .then(function (res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success(TranslationContext !== undefined
              ? TranslationContext.alertmessage.fileuploadedsuccessfully
              : "File uploaded successfully.");
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              bulkuploadLoading: false,
            });
            self.handleGetCRMRoles();
          } else {
            self.setState({
              showProgress: false,
              bulkuploadLoading: false,
              // isFileUploadFail: true,
              progressValue: 0,
            });
            NotificationManager.error(TranslationContext !== undefined
              ? TranslationContext.alertmessage.filenotuploaded
              : "File not uploaded.");
          }
        })
        .catch((data) => {
          debugger;
          if (data.message) {
            this.setState({
              showProgress: false,
              isFileUploadFail: true,
              bulkuploadLoading: false,
            });
          }
          console.log(data);
        });
    } else {
      this.setState({
        bulkuploadCompulsion: TranslationContext !== undefined
        ? TranslationContext.validation.pleaseselectfile
        : "Please select file.",
      });
    }
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  handleDeleteBulkupload = (e) => {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    this.setState({
      fileN: [],
      fileName: "",
    });
    NotificationManager.success(TranslationContext !== undefined
      ? TranslationContext.alertmessage.filedeletedsuccessfully
      : "File deleted successfully.");
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;

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
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>{TranslationContext !== undefined
                    ? TranslationContext.p.sortatoz
                    : "SORT BY A TO Z"}</p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>{TranslationContext !== undefined
                    ? TranslationContext.p.sortztoa
                    : "SORT BY Z TO A"}</p>
                </div>
              </div>
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>{TranslationContext !== undefined
                  ? TranslationContext.p.filterbytype
                  : "FILTER BY TYPE"}</p>
                <input
                  type="text"
                  style={{ display: "block" }}
                  value={this.state.filterTxtValue}
                  onChange={this.filteTextChange.bind(this)}
                />

                <div className="FTypeScroll">
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      name="filter-type"
                      id={"fil-open"}
                      value="all"
                      checked={
                        this.state.sroleNameFilterCheckbox.includes("all") ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sisRoleActiveFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">
                        {TranslationContext !== undefined
                          ? TranslationContext.span.all
                          : "ALL"}
                      </span>
                    </label>
                  </div>
                  {this.state.sortColumn === "roleName"
                    ? this.state.sortFilterRoleName !== null &&
                    this.state.sortFilterRoleName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.roleName}
                          id={"fil-open" + item.roleName}
                          value={item.roleName}
                          checked={this.state.sroleNameFilterCheckbox.includes(
                            item.roleName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "roleName",
                            "value"
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
                    ? this.state.sortFilterCreated !== null &&
                    this.state.sortFilterCreated.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.createdBy}
                          id={"fil-open" + item.createdBy}
                          value={item.createdBy}
                          checked={this.state.screatedByFilterCheckbox.includes(
                            item.createdBy
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "createdBy",
                            "value"
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
                    ? this.state.sortFilterStatus !== null &&
                    this.state.sortFilterStatus.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.isRoleActive}
                          id={"fil-open" + item.isRoleActive}
                          value={item.isRoleActive}
                          checked={this.state.sisRoleActiveFilterCheckbox.includes(
                            item.isRoleActive
                          )}
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
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.crmroles
              : "CRM Roles"}
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
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.roleColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "roleName",
                              TranslationContext !== undefined
                                ? TranslationContext.label.rolename
                                : "Role Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.rolename
                              : "Role Name"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "roleName",
                        Cell: (row) => {
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
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdBy",
                              TranslationContext !== undefined
                                ? TranslationContext.span.createdby
                                : "Created By"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.createdby
                              : "Created By"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdBy",
                        Cell: (row) => {
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
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.createdby
                                              : "Created By"}: {row.original.createdBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.createddate
                                            : "Created Date"}:{" "}
                                          {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}:{" "}
                                            {row.original.modifiedBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}:{" "}
                                          {row.original.modifiedDate}
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
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "isRoleActive",
                              TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.status
                              : "Status"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "isRoleActive",
                      },
                      {
                        Header: <span>{TranslationContext !== undefined
                          ? TranslationContext.span.action
                          : "Actions"}</span>,
                        accessor: "actiondept",
                        Cell: (row) => {
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.deletefile
                                            : "Delete file?"}
                                        </p>
                                        <p className="mt-1 fs-12">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.areyousuredeletefile
                                            : "Are you sure you want to delete this file?"}
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>{TranslationContext !== undefined
                                            ? TranslationContext.a.cancel
                                            : "CANCEL"}</a>
                                          <button
                                            className="butn"
                                            onClick={this.deleteCrmRole.bind(
                                              this,
                                              row.original.crmRoleID
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.delete
                                              : "Delete"}
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
                                  onClick={this.hanldeEditCRM.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.edit
                                    : "EDIT"}
                                </button>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
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
                    <label className="create-department">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createcrmrole
                        : "CREATE CRM ROLE"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.rolename
                          : "Role Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterrolename
                          : "Enter Role Name"}
                        maxLength={25}
                        onChange={this.handleRoleName}
                      />
                      {this.state.checkRoleName != "" && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "0px",
                          }}
                        >
                          {this.state.checkRoleName}
                        </p>
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
                          </div>
                        </div>
                      ))}

                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        value={this.state.RoleisActive}
                        onChange={this.handleRoleisActive}
                        id="inputState"
                        className="form-control dropdown-setting"
                      >
                        <option value="true">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.active
                            : "Active"}
                        </option>
                        <option value="false">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.inactive
                            : "Inactive"}
                        </option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.createUpdateCrmRole.bind(this, "add")}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.addrole
                          : "ADD ROLE"}
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <h3 className="pb-0">
                        {TranslationContext !== undefined
                          ? TranslationContext.h3.bulkupload
                          : "Bulk Upload"}
                      </h3>
                      <div className="down-excel">
                        <p>
                          {TranslationContext !== undefined
                            ? TranslationContext.p.template
                            : "Template"}
                        </p>
                        <CSVLink
                          filename={"CRM.csv"}
                          data={config.crmRoleTemplate}
                        >
                          <img src={DownExcel} alt="download icon" />
                        </CSVLink>
                      </div>
                    </div>
                    <Spin
                      tip="Please wait..."
                      spinning={this.state.bulkuploadLoading}
                    >
                      <div className="mainfileUpload">
                        <Dropzone onDrop={this.fileUpload.bind(this)}>
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input
                                {...getInputProps()}
                                className="file-upload d-none"
                              />
                              <div className="file-icon">
                                <img src={FileUpload} alt="file-upload" />
                              </div>
                              <span className={"fileupload-span"}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.addfile
                                  : "Add File"}
                              </span>{" "}
                              {TranslationContext !== undefined
                                ? TranslationContext.div.ordropfilehere
                                : "or Drop File here"}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      {this.state.fileN.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.bulkuploadCompulsion}
                        </p>
                      )}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.deletefile
                                        : "Delete file?"}
                                    </p>
                                    <p className="mt-1 fs-12">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.areyousuredeletefile
                                        : "Are you sure you want to delete this file?"}
                                    </p>
                                    <div className="del-can">
                                      <a href={Demo.BLANK_LINK}>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.cancel
                                          : "CANCEL"}
                                      </a>
                                      <button
                                        className="butn"
                                        onClick={this.handleDeleteBulkupload}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button.delete
                                          : "Delete"}
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div>
                              <span className="file-size">
                                {this.state.fileSize}
                              </span>
                            </div>
                          </div>
                          {this.state.fileN.length > 0 &&
                            this.state.isFileUploadFail ? (
                              <div className="file-cntr">
                                <div className="file-dtls">
                                  <p className="file-name">
                                    {this.state.fileName}
                                  </p>
                                  <a
                                    className="file-retry"
                                    onClick={this.hanldeAddBulkUpload.bind(this)}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.retry
                                      : "Retry"}
                                  </a>
                                </div>
                                <div>
                                  <span className="file-failed">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.span.failed
                                      : "Failed"}
                                  </span>
                                </div>
                              </div>
                            ) : null}
                          {this.state.showProgress ? (
                            <div className="file-cntr">
                              <div className="file-dtls">
                                <p className="file-name pr-0">
                                  {this.state.fileName}
                                </p>
                              </div>
                              <div>
                                <div className="d-flex align-items-center mt-2">
                                  <ProgressBar
                                    className="file-progress"
                                    now={this.state.progressValue}
                                  />
                                  <div className="cancel-upload">
                                    <img
                                      src={UploadCancel}
                                      alt="upload cancel"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                      <button
                        className="butn"
                        onClick={this.hanldeAddBulkUpload.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.add
                          : "ADD"}
                      </button>
                    </Spin>
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
                <label className="popover-header-text">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.editcrmrole
                    : "EDIT CRM ROLE"}
                </label>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.rolename
                    : "Role Name"}
                </label>
                <input
                  type="text"
                  className="txt-edit-popover"
                  placeholder={TranslationContext !== undefined
                    ? TranslationContext.placeholder.enterrolename
                    : "Enter Role Name"}
                  maxLength={25}
                  name="editRoleName"
                  value={this.state.editRoleName}
                  onChange={this.handleModaleDataChange.bind(this)}
                />
              </div>
              {this.state.editCheckRoleName != "" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.editCheckRoleName}
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
                <label className="edit-label-1">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.status
                    : "Status"}
                </label>
                <select
                  id="inputStatus"
                  className="edit-dropDwon dropdown-setting"
                  value={this.state.modulestatus}
                  name="status"
                  onChange={this.handleModaleDataChange.bind(this)}
                >
                  <option value="Active">
                    {TranslationContext !== undefined
                      ? TranslationContext.option.active
                      : "Active"}
                  </option>
                  <option value="Inactive">
                    {TranslationContext !== undefined
                      ? TranslationContext.option.inactive
                      : "Inactive"}
                  </option>
                </select>
              </div>
              <br />
              <div className="text-center">
                <a className="pop-over-cancle" onClick={this.toggleEditModal}>
                  {TranslationContext !== undefined
                    ? TranslationContext.a.cancel
                    : "CANCEL"}
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
                    {TranslationContext !== undefined
                      ? TranslationContext.label.save
                      : "SAVE"}
                  </label>
                </button>
              </div>
            </div>
          </Modal>
        </div>
        {/* <NotificationContainer /> */}
      </React.Fragment>
    );
  }
}

export default TicketCRMRole;
