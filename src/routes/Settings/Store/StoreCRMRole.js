import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import ReactTable from "react-table";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Demo from "../../../store/Hashtag.js";
import { Link } from "react-router-dom";
import Sorting from "./../../../assets/Images/sorting.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import DownExcel from "./../../../assets/Images/csv.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import matchSorter from "match-sorter";
import config from "./../../../helpers/config";
import { CSVLink } from "react-csv";
import axios from "axios";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import { authHeader } from "../../../helpers/authHeader";

class StoreCRMRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      crmRoles: [],
      ModulesEnabled: "",
      ModulesDisabled: "",
      modulesList: [
        { moduleId: 1, moduleName: "Dashboard", isActive: true },
        { moduleId: 2, moduleName: "Tasks", isActive: false },
        { moduleId: 3, moduleName: "Claim", isActive: true },
        { moduleId: 4, moduleName: "Notification", isActive: true },
        { moduleId: 5, moduleName: "Settings", isActive: true },
        { moduleId: 6, moduleName: "Reports", isActive: false }
      ],
      RoleName: "",
      checkRoleName: "",
      RoleisActive: "true",
      editSaveLoading: false,
      editRoleNameValidMsg: "",
      editCheckRoleName: "",
      modulesData: [],
      modulestatus: "",
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFilterRoleName: [],
      sortFilterCreated: [],
      sortFilterStatus: [],
      tempcrmRoles: [],
      StatusModel: false,
      updateRoleName: "",
      updateModulesEnabled: "",
      updateModulesDisabled: "",
      sroleNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisRoleActiveFilterCheckbox: "",
      sortColumn: "",
      roleColor: "",
      createdColor: "",
      statusColor: "",
      sortHeader: "",
      sortAllData: [],
      sortRoleName: [],
      sortCreated: [],
      sortStatus: [],
      fileN: [],
      bulkuploadCompulsion: "",
      progressValue: 0,
    };
    this.handleGetCRMGridData = this.handleGetCRMGridData.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetCRMGridData();
  }
  handleTabChange(index) {
    this.setState({
      tabIndex: index
    });
  }

  ////hanlde file uploading
  fileUpload = e => {
    debugger;
    var allFiles = [];
    var selectedFiles = e.target.files;
    if (selectedFiles) {
      allFiles.push(selectedFiles[0]);

      var fileSize = formatSizeUnits(selectedFiles[0].size);
      this.setState({
        fileSize,
        fileN: allFiles,
        fileName: allFiles[0].name,
        bulkuploadCompulsion: ""
      });
    }
  };

  /// Role name onchange
  handleRoleName(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //// Status on change
  handleRoleisActive = e => {
    debugger;
    let RoleisActive = e.currentTarget.value;
    this.setState({ RoleisActive });
  };
  ///handle change Module
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

  ////Get CRM grid data
  handleGetCRMGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoles",
      headers: authHeader()
    }).then(res => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ crmRoles: data });
        } else {
          self.setState({ crmRoles: [] });
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
      .catch(res => {
        console.log(res);
      });
  }

  /// hanlde module default
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
  //// delete CRM role
  handleDeleteCrmRole(Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/DeleteCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: Id
      }
    }).then(res => {
        debugger;
        let status = res.data.message;
        if (status === "Record In use") {
          NotificationManager.error("Record in use.");
        } else if (status === "Record deleted Successfully") {
          NotificationManager.success("Record deleted Successfully.");
          self.handleGetCRMGridData();
        }
      })
      .catch(res => {
        console.log(res);
      });
  }

  //// hanlde Create and Update function
  hanldeCreateUpdateCrmRole(e, addUpdate, crmRoleId) {
    debugger;
    let self = this;
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
        this.setState({ checkRoleName: "Required" });
        return false;
      }
      CRMRoleID = 0;
      RoleName = self.state.RoleName;
      ModulesEnabled = self.state.ModulesEnabled;
      ModulesDisabled = self.state.ModulesDisabled;
    } else if (e === "update") {
      if (this.state.editRoleName == "") {
        this.setState({ editCheckRoleName: "Required" });
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
    }).then(res => {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          if (e === "add") {
            NotificationManager.success("CRM Role added successfully.");
            self.setState({
              RoleName: "",
              RoleisActive: "true",
              ModulesEnabled: "",
              ModulesDisabled: "",
              updateModulesEnabled: "",
              updateModulesDisabled: ""
            });
            self.handleGetCRMGridData();
          } else if (e === "update") {
            self.toggleEditModal();
            self.setState({
              editSaveLoading: false,
              editRoleNameValidMsg: ""
            });
            NotificationManager.success("CRM Role updated successfully.");
            self.handleGetCRMGridData();
          }
        } else if (status === "Record Already Exists ") {
          if (e === "add") {
            NotificationManager.error("Record Already Exists ");
          }
        } else {
          if (e === "add") {
            NotificationManager.error("CRM Role not added.");
          } else if (e === "update") {
            self.setState({ editSaveLoading: false });
            NotificationManager.error("CRM Role not updated.");
          }
        }
      })
      .catch(res => {
        console.log(res);
      });
  }
//// CRM Bulk uploading 
  hanldeAddBulkUpload() {
    debugger;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;

      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);
      this.setState({ showProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/CRMRole/BulkUploadCRMRole",
        headers: authHeader(),
        data: formData,
        onUploadProgress: (ev = ProgressEvent) => {
          const progress = (ev.loaded / ev.total) * 100;
          this.updateUploadProgress(Math.round(progress));
        }
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          // let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("File uploaded successfully.");
            self.setState({ fileName: "", fileSize: "", fileN: [] });
            self.handleGetCRMGridData();
          } else {
            self.setState({
              showProgress: false,
              isFileUploadFail: true,
              progressValue: 0
            });
            NotificationManager.error("File not uploaded.");
          }
        })
        .catch(data => {
          debugger;
          if (data.message) {
            this.setState({ showProgress: false, isFileUploadFail: true });
          }
          console.log(data);
        });
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file."
      });
    }
  }
  //// Store CRM data for edit
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


/// set sorting status
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
      statusColor: ""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "roleName") {
      var sItems = sroleNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.roleName === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        roleColor: "sort-column"
      });
    } else if (column === "createdBy") {
      var sItems = screatedByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.createdBy === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column"
      });
    } else if (column === "isRoleActive") {
      var sItems = sisRoleActiveFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.isRoleActive === sItems[i]
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
        statusColor: "sort-column"
      });
    }

    this.setState({
      tempcrmRoles: itemsArray
    });
    // this.StatusCloseModel();
  };

  ///toggle change
  toggleEditModal() {
    this.setState({
      editmodel: false,
      editRoleNameValidMsg: "",
      editCheckRoleName: ""
    });
  }
  //// Modal data change
  handleModaleDataChange(e) {
    debugger;
    var Name = e.target.name;
    var value = e.target.value;

    if (Name === "status") {
      this.setState({ modulestatus: value });
    } else {
      if (value !== "") {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "",
          editCheckRoleName: ""
        });
      } else {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "The role name field is required.",
          editCheckRoleName: "Required"
        });
      }
    }
  }
//// status open modal
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
          sortHeader: header
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sisRoleActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
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
          sortHeader: header
        });
      } else {
        this.setState({
          sroleNameFilterCheckbox: "",
          sisRoleActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
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
          sortHeader: header
        });
      } else {
        this.setState({
          sroleNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
  }

  /// status close modal
  StatusCloseModel = e => {
    if (this.state.tempcrmRoles.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        crmRoles: this.state.tempcrmRoles
      });
      if (this.state.sortColumn === "roleName") {
        if (this.state.sroleNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sisRoleActiveFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sroleNameFilterCheckbox: "",
            sisRoleActiveFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "isRoleActive") {
        if (this.state.sisRoleActiveFilterCheckbox === "") {
        } else {
          this.setState({
            sroleNameFilterCheckbox: "",
            screatedByFilterCheckbox: ""
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        crmRoles: this.state.sortAllData
      });
    }
  };

  /// filter text change
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
          sortFilterRoleName: this.state.sortRoleName
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
          sortFilterCreated: this.state.sortCreated
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
          sortFilterStatus: this.state.sortStatus
        });
      }
    }
  }
  /// sort status A to Z
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
  /// sort status Z to A
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
  /// Edit Module change
  handleModuleChange = id => {
    debugger;
    var index = this.state.modulesData.findIndex(x => x.moduleID === id);
    var modulesData = this.state.modulesData;
    modulesData[index].modulestatus = !modulesData[index].modulestatus;
    this.setState({ modulesData });
  };
/// get file progress value 
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  /// Delete file on bulk uploading
  handleDeleteBulkupload = e => {
    debugger;
    this.setState({
      fileN: [],
      fileName: ""
    });
    NotificationManager.success("File deleted successfully.");
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/admin/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/admin/settings",
              tabName: "store-tab"
            }}
            className="header-path"
          >
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            CRM Roles
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
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
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                clear search
              </a>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
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
                      <span className="table-btn table-blue-btn">ALL</span>
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
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StorCrmRoleReact">
                  <ReactTable
                    data={this.state.crmRoles}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.roleColor}
                            onClick={this.StatusOpenModel.bind(this, "roleName", "Role Name")}
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
                            onClick={this.StatusOpenModel.bind(this, "createdBy", "Created By")}
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
                                          Created Date:{" "}
                                          {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:{" "}
                                            {row.original.modifiedBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:{" "}
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
                        }
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(this, "isRoleActive", "Status")}
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
                                          Are you sure you want to delete this
                                          file?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteCrmRole.bind(
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
                                  onClick={this.hanldeEditCRM.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  EDIT
                                </button>
                              </span>
                            </>
                          );
                        }
                      }
                    ]}
                    resizable={false}
                    minRows={2}
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
                        name="RoleName"
                        value={this.state.RoleName}
                        autoComplete="off"
                        onChange={this.handleRoleName.bind(this)}
                      />
                      {this.state.checkRoleName != "" && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "0px"
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
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.RoleisActive}
                        onChange={this.handleRoleisActive}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.hanldeCreateUpdateCrmRole.bind(
                          this,
                          "add"
                        )}
                      >
                        ADD ROLE
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
                                    Delete file?
                                  </p>
                                  <p className="mt-1 fs-12">
                                    Are you sure you want to delete this file?
                                  </p>
                                  <div className="del-can">
                                    <a href={Demo.BLANK_LINK}>CANCEL</a>
                                    <button
                                      className="butn"
                                      onClick={this.handleDeleteBulkupload}
                                    >
                                      Delete
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
                              <p className="file-name">{this.state.fileName}</p>
                              <a
                                className="file-retry"
                                onClick={this.hanldeAddBulkUpload.bind(this)}
                              >
                                Retry
                              </a>
                            </div>
                            <div>
                              <span className="file-failed">Failed</span>
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
                                  <img src={UploadCancel} alt="upload cancel" />
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
                      ADD
                    </button>
                    <br />
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
                    <a
                      className="pop-over-cancle"
                      onClick={this.toggleEditModal}
                    >
                      CANCEL
                    </a>
                    <button
                      className="pop-over-button FlNone"
                      onClick={this.hanldeCreateUpdateCrmRole.bind(
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreCRMRole;
