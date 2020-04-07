import React, { Component } from "react";
import Demo from "./../../../store/Hashtag.js";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Modal from "react-responsive-modal";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import {
  // NotificationContainer,
  NotificationManager
} from "react-notifications";
import Select from "react-select";
import { CSVLink } from "react-csv";
// import { string } from "prop-types";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import matchSorter from "match-sorter";
import Sorting from "./../../../assets/Images/sorting.png";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      isOpen: false,
      getID: 0,
      userData: [],
      selectUserName: "",
      selectFirstName: "",
      selectLastName: "",
      selectMobile: "",
      selectEmail: "",
      brandData: [],
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      DesignationData: [],
      CRMRoleData: [],
      ReporteeDesignData: [],
      ReportToData: [],
      AgentData: [],
      selectedBrand: [],
      selectedCategory: [],
      selectedSubCategory: [],
      selectedIssueType: [],
      GetUserData: [],
      editBrand: [],
      editCategory: [],
      editSubCategory: [],
      editIssuetype: [],
      EditBrandData: [],
      selectedDesignation: 0,
      selectedCopyEscalation: false,
      selectedAssignEscalation: false,
      selectedSupervisorAgent: "",
      selectedCRMRoles: 0,
      selectedReporteeDesign: 0,
      selectedReportTO: 0,
      selectedAgent: 0,
      selectedStatus: "true",
      multibrandIDs: "",
      multicategoryIDs: "",
      multisubcategoryIDs: "",
      editreporteeDesign: 0,
      userEditData: {},
      editmodel: false,
      selectedAgentRadio: false,
      selectedSupervisorRadio: true,
      editAgentRadio: true,
      editSupervisorRadio: false,
      buttonToggle: false,
      buttonProfileToggle: false,
      forEditID: 0,
      test: "",
      usernameCompulsion: "",
      firstnameCompulsion: "",
      // lastnameCompulsion: "",
      mobilenumberCompulsion: "",
      emailCompulsion: "",
      userdesignCompulsion: "",
      reporteeDesignCompulsion: "",
      reportToCompulsion: "",
      brandCompulsion: "",
      categoryCompulsion: "",
      subcategoryCompulsion: "",
      isuuetypeCompulsion: "",
      crmroleCompulsion: "",
      copyescCompulsion: "",
      assignescCompulsion: "",
      RadioCompulsion: "",
      agentCompulsion: "",
      editusernameCompulsion: "",
      editfirstnameCompulsion: "",
      // editlastnameCompulsion: "",
      editmobilenumberCompulsion: "",
      editemailCompulsion: "",
      edituserdesignCompulsion: "",
      editreporteeDesignCompulsion: "",
      editreportToCompulsion: "",
      editbrandCompulsion: "",
      editcategoryCompulsion: "",
      editsubcategoryCompulsion: "",
      editisuuetypeCompulsion: "",
      editcrmroleCompulsion: "",
      editcopyescCompulsion: "",
      editassignescCompulsion: "",
      editRadioCompulsion: "",
      editagentCompulsion: "",
      emailValidation: "",
      mobileValidation: "",
      personalReadOnly: false,
      profileReadOnly: false,
      StatusModel: false,
      sortAllData: "",
      sortDesignation: [],
      sortUsername: [],
      sortEmail: [],
      sortMobile: [],
      selTab: "Personal Details",
      userColor: "",
      mobileColor: "",
      emailColor: "",
      designationColor: "",
      sortHeader: "",
      emailFlag: true,
      editEmailFlag: true,
      phoneFlag: true,
      EditPhoneFlag: true,
      sortFilterDesignation: [],
      sortFilterUsername: [],
      sortFilterMobile: [],
      sortFilterEmail: [],
      tempuserData: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      sdesignationFilterCheckbox: "",
      suserNameFilterCheckbox: "",
      smobileNumberFilterCheckbox: "",
      semailIDFilterCheckbox: "",
      isortA: false
    };
    this.handleGetUserList = this.handleGetUserList.bind(this);
    this.handleAddPersonalDetails = this.handleAddPersonalDetails.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleGetCRMRoleList = this.handleGetCRMRoleList.bind(this);
    this.handleGetReporteedesignationList = this.handleGetReporteedesignationList.bind(
      this
    );
    this.handleGetReportTOList = this.handleGetReportTOList.bind(this);
    this.handleAddProfileDetails = this.handleAddProfileDetails.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handleAddMapCategory = this.handleAddMapCategory.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleGetUserListByID = this.handleGetUserListByID.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleSendMail = this.handleSendMail.bind(this);
    this.handleValidationEmailIdMob = this.handleValidationEmailIdMob.bind(
      this
    );
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.hanldeAddBulkUpload = this.hanldeAddBulkUpload.bind(this);
  }
  componentDidMount() {
    debugger;
    this.handleGetUserList();
    this.handleGetBrandList();
    this.handleGetDesignationList();
    this.handleGetCRMRoleList();
    this.handleGetReporteedesignationList();
    this.handleGetReportTOList();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.userData;

    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return 1;
        if (a.userName > b.userName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "designation") {
      itemsArray.sort((a, b) => {
        if (a.designation < b.designation) return 1;
        if (a.designation > b.designation) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "mobileNumber") {
      itemsArray.sort((a, b) => {
        if (a.mobileNumber < b.mobileNumber) return 1;
        if (a.mobileNumber > b.mobileNumber) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "emailID") {
      itemsArray.sort((a, b) => {
        if (a.emailID < b.emailID) return 1;
        if (a.emailID > b.emailID) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      userData: itemsArray
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.userData;

    if (this.state.sortColumn === "designation") {
      itemsArray.sort((a, b) => {
        if (a.designation < b.designation) return -1;
        if (a.designation > b.designation) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return -1;
        if (a.userName > b.userName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "mobileNumber") {
      itemsArray.sort((a, b) => {
        if (a.mobileNumber < b.mobileNumber) return -1;
        if (a.mobileNumber > b.mobileNumber) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "emailID") {
      itemsArray.sort((a, b) => {
        if (a.emailID < b.emailID) return -1;
        if (a.emailID > b.emailID) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      userData: itemsArray
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    debugger;
    if (
      this.state.sortFilterDesignation.length === 0 ||
      this.state.sortFilterUsername.length === 0 ||
      this.state.sortFilterMobile.length === 0 ||
      this.state.sortFilterEmail.length === 0
    ) {
      return false;
    }
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (data === "designation") {
      if (
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.smobileNumberFilterCheckbox !== "" ||
        this.state.semailIDFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          suserNameFilterCheckbox: "",
          smobileNumberFilterCheckbox: "",
          semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "userName") {
      if (
        this.state.sdesignationFilterCheckbox !== "" ||
        this.state.smobileNumberFilterCheckbox !== "" ||
        this.state.semailIDFilterCheckbox !== ""
      ) {
        this.setState({
          // sdesignationFilterCheckbox: "",
          // smobileNumberFilterCheckbox: "",
          // semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sdesignationFilterCheckbox: "",
          smobileNumberFilterCheckbox: "",
          semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "mobileNumber") {
      if (
        this.state.sdesignationFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.semailIDFilterCheckbox !== ""
      ) {
        this.setState({
          // sdesignationFilterCheckbox: "",
          // suserNameFilterCheckbox: "",
          // semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sdesignationFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "emailID") {
      if (
        this.state.sdesignationFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.smobileNumberFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sdesignationFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          smobileNumberFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
  }
  StatusCloseModel() {
    debugger;

    if (this.state.tempuserData.length > 0) {
      this.setState({
        StatusModel: false,
        userData: this.state.tempuserData,
        filterTxtValue: ""
      });
      if (this.state.sortColumn === "designation") {
        if (this.state.sdesignationFilterCheckbox === "") {
        } else {
          this.setState({
            suserNameFilterCheckbox: "",
            smobileNumberFilterCheckbox: "",
            semailIDFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "userName") {
        if (this.state.suserNameFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationFilterCheckbox: "",
            smobileNumberFilterCheckbox: "",
            semailIDFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "mobileNumber") {
        if (this.state.smobileNumberFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            semailIDFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "emailID") {
        if (this.state.semailIDFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            smobileNumberFilterCheckbox: ""
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        userData: this.state.sortAllData,
        filterTxtValue: ""
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var suserNameFilterCheckbox = this.state.suserNameFilterCheckbox;
    var sdesignationFilterCheckbox = this.state.sdesignationFilterCheckbox;
    var smobileNumberFilterCheckbox = this.state.smobileNumberFilterCheckbox;
    var semailIDFilterCheckbox = this.state.semailIDFilterCheckbox;
    if (column === "userName" || column === "all") {
      if (type === "value" && type !== "All") {
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all", "");
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all,", "");
        if (suserNameFilterCheckbox.includes(e.currentTarget.value)) {
          suserNameFilterCheckbox = suserNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          suserNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (suserNameFilterCheckbox.includes("all")) {
          suserNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "userName") {
            for (let i = 0; i < this.state.sortUsername.length; i++) {
              suserNameFilterCheckbox +=
                this.state.sortUsername[i].userName + ",";
            }
            suserNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "designation" || column === "all") {
      if (type === "value" && type !== "All") {
        sdesignationFilterCheckbox = sdesignationFilterCheckbox.replace(
          "all",
          ""
        );
        sdesignationFilterCheckbox = sdesignationFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdesignationFilterCheckbox.includes(e.currentTarget.value)) {
          sdesignationFilterCheckbox = sdesignationFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sdesignationFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdesignationFilterCheckbox.includes("all")) {
          sdesignationFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "designation") {
            for (let i = 0; i < this.state.sortDesignation.length; i++) {
              sdesignationFilterCheckbox +=
                this.state.sortDesignation[i].designation + ",";
            }
            sdesignationFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "mobileNumber" || column === "all") {
      if (type === "value" && type !== "All") {
        smobileNumberFilterCheckbox = smobileNumberFilterCheckbox.replace(
          "all",
          ""
        );
        smobileNumberFilterCheckbox = smobileNumberFilterCheckbox.replace(
          "all,",
          ""
        );
        if (smobileNumberFilterCheckbox.includes(e.currentTarget.value)) {
          smobileNumberFilterCheckbox = smobileNumberFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          smobileNumberFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (smobileNumberFilterCheckbox.includes("all")) {
          smobileNumberFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "mobileNumber") {
            for (let i = 0; i < this.state.sortMobile.length; i++) {
              smobileNumberFilterCheckbox +=
                this.state.sortMobile[i].mobileNumber + ",";
            }
            smobileNumberFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "emailID" || column === "all") {
      if (type === "value" && type !== "All") {
        semailIDFilterCheckbox = semailIDFilterCheckbox.replace("all", "");
        semailIDFilterCheckbox = semailIDFilterCheckbox.replace("all,", "");
        if (semailIDFilterCheckbox.includes(e.currentTarget.value)) {
          semailIDFilterCheckbox = semailIDFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          semailIDFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (semailIDFilterCheckbox.includes("all")) {
          semailIDFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "emailID") {
            for (let i = 0; i < this.state.sortEmail.length; i++) {
              semailIDFilterCheckbox += this.state.sortEmail[i].emailID + ",";
            }
            semailIDFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sdesignationFilterCheckbox,
      suserNameFilterCheckbox,
      smobileNumberFilterCheckbox,
      semailIDFilterCheckbox,
      userColor: "",
      mobileColor: "",
      emailColor: "",
      designationColor: ""
      // sFilterCheckbox
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "designation") {
      var sItems = sdesignationFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.designation === sItems[i]
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
        designationColor: "sort-column"
      });
    } else if (column === "userName") {
      var sItems = suserNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.userName === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        userColor: "sort-column"
      });
    } else if (column === "mobileNumber") {
      var sItems = smobileNumberFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.mobileNumber === sItems[i]
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
        mobileColor: "sort-column"
      });
    } else if (column === "emailID") {
      var sItems = semailIDFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.emailID === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        emailColor: "sort-column"
      });
    }
    this.setState({
      tempuserData: itemsArray
    });
    // this.StatusCloseModel();
  };

  opneEditModal = () => {
    this.setState({ editmodel: true });
  };
  closeEditModal() {
    this.setState({ editmodel: false, selTab: "Personal Details" });
  }

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    debugger;
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }
  setUserEditData = e => {
    debugger;
    let self = this;
    var brand = [];
    var cat = [];
    var subcat = [];
    var issue = [];
    var userEditData = e;
    userEditData.user_Id = userEditData.userId;
    // userEditData.user_Name = userEditData.userName;
    userEditData.selectUserName = userEditData.userName;
    userEditData.first_Name = userEditData.firstName;
    userEditData.last_Name = userEditData.lastName;
    userEditData.mobile_Number = userEditData.mobileNumber;
    userEditData.email_ID = userEditData.emailID;
    userEditData.designation_ID = userEditData.designationID;
    userEditData.reportee_ID = userEditData.reporteeID;
    userEditData.brand_IDs = userEditData.brandIDs;
    userEditData.brand_Names = userEditData.brandNames;
    userEditData.category_IDs = userEditData.categoryIDs;
    userEditData.category_Names = userEditData.categoryNames;
    userEditData.subCategory_IDs = userEditData.subCategoryIDs;
    userEditData.subCategory_Names = userEditData.subCategoryNames;
    userEditData.issueType_IDs = userEditData.issueTypeIDs;
    userEditData.issueType_Names = userEditData.issueTypeNames;
    userEditData.is_Copy_Escalation = userEditData.is_CopyEscalation;
    userEditData.is_Assign_Escalation = userEditData.is_AssignEscalation;
    userEditData.role_ID = userEditData.roleID;
    userEditData.assign_ID = userEditData.assignID;
    userEditData.assign_Escalation = userEditData.assignEscalation;
    userEditData.assign_Name = userEditData.assignName;
    userEditData.reporteeDesignation_ID = userEditData.reporteeDesignationID;

    if (userEditData.isActive === true) {
      userEditData.is_Active = "true";
    } else {
      userEditData.is_Active = "false";
    }
    if (userEditData.assign_Escalation === "Agent") {
      var agent = true;
      var supervi = false;
    } else if (userEditData.assign_Escalation === "Supervisor") {
      var supervi = true;
      var agent = false;
    }
    var bname = userEditData.brand_Names.split(",");
    var bid = userEditData.brand_IDs.split(",").map(Number);

    var catname = userEditData.category_Names.split(",");
    var catid = userEditData.category_IDs.split(",").map(Number);

    var subcatname = userEditData.subCategory_Names.split(",");
    var subcatid = userEditData.subCategory_IDs.split(",").map(Number);

    var issuename = userEditData.issueType_Names.split(",");
    var issueid = userEditData.issueType_IDs.split(",").map(Number);
    if (userEditData.brand_IDs !== "") {
      for (let i = 0; i < bid.length; i++) {
        brand.push({ brandID: bid[i], brandName: bname[i] });
      }
    }

    if (userEditData.category_IDs !== "") {
      for (let i = 0; i < catid.length; i++) {
        cat.push({ categoryID: catid[i], categoryName: catname[i] });
      }
    }
    if (userEditData.subCategory_IDs !== "") {
      for (let i = 0; i < subcatid.length; i++) {
        subcat.push({
          subCategoryID: subcatid[i],
          subCategoryName: subcatname[i]
        });
      }
    }
    if (userEditData.issueType_IDs !== "") {
      for (let i = 0; i < issueid.length; i++) {
        issue.push({ issueTypeID: issueid[i], issueTypeName: issuename[i] });
      }
    }
    debugger;
    self.setState({
      userEditData,
      editBrand: brand,
      editCategory: cat,
      editSubCategory: subcat,
      editIssuetype: issue,
      editAgentRadio: agent,
      editSupervisorRadio: supervi
    });

    self.handleGetReporteedesignationList("edit");
    self.handleGetReportTOList("edit");
    self.handleGetCategoryList("edit");
    self.handleGetSubCategoryList("edit");
    self.handleGetIssueTypeList("edit");
    self.handleGetAgentList("edit");
    self.opneEditModal();
  };

  handleAgentValue = (datar, e) => {
    debugger;
    let subjectvalue = e.currentTarget.checked;
    this.setState({
      selectedSupervisorRadio: false,
      selectedAgentRadio: subjectvalue
    });
    setTimeout(() => {
      if (this.state.selectedAgentRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };

  handleSuperValue = (datar, e) => {
    debugger;
    let subjectvalue = e.currentTarget.checked;
    this.setState({
      selectedAgentRadio: false,
      selectedSupervisorRadio: subjectvalue
    });
    setTimeout(() => {
      if (this.state.selectedSupervisorRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };

  editAgentValue = (datar, e) => {
    debugger;
    let subjectvalue = e.currentTarget.checked;
    this.setState({ editSupervisorRadio: false, editAgentRadio: subjectvalue });
    setTimeout(() => {
      if (this.state.editAgentRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };

  editSuperValue = (datar, e) => {
    debugger;
    let subjectvalue = e.currentTarget.checked;
    this.setState({ editAgentRadio: false, editSupervisorRadio: subjectvalue });
    setTimeout(() => {
      if (this.state.editSupervisorRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };

  setEscn = e => {
    debugger;
    this.setState({ [e.target.name]: e.currentTarget.checked });
  };

  editsetEscn = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.checked;
    var data = e.currentTarget.checked;
    var data = this.state.userEditData;
    data[name] = value;
    this.setState({ EditTemp: data });
  };

  handleOnChangeEditData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    if (name === "email_ID") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          editEmailFlag: true
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          editEmailFlag: false
        });
      } else {
        this.setState({
          editEmailFlag: true
        });
      }
    }

    this.setState({
      EditTemp: data
    });
  };

  hanldeMobileNoChange = e => {
    debugger;
    var name = e.target.name;
    var reg = /^[0-9\b]+$/;
    if (name === "mobile_Number") {
      if (e.target.value === "" || reg.test(e.target.value)) {
        var value = e.target.value;

        var data = this.state.userEditData;
        data[name] = value;
        this.setState({ EditTemp: data });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          EditPhoneFlag: true
        });
      } else {
        this.setState({
          EditPhoneFlag: false
        });
      }
    } else {
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          phoneFlag: true
        });
      } else {
        this.setState({
          phoneFlag: false
        });
      }
    }
  };

  handleOnChangeUserData = e => {
    debugger;
    var name = e.target.name;
    this.setState({
      [e.target.name]: e.target.value
    });
    if (name === "selectEmail") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          emailFlag: true
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          emailFlag: false
        });
      } else {
        this.setState({
          emailFlag: true
        });
      }
    }
  };
  handleReporteeDesgnDropDown(data2, e) {
    debugger;

    this.setState({
      [e.target.name]: e.target.value
    });

    setTimeout(() => {
      if (this.state.selectedReporteeDesign) {
        this.handleGetReportTOList(data2);
      }
    }, 1);
  }
  handleEditReporteeDesgnDropDown(data2, e) {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    this.setState({
      EditTemp: data
    });

    setTimeout(() => {
      if (parseInt(this.state.userEditData.reporteeDesignation_ID)) {
        this.handleGetReportTOList(data2);
      } else {
        let userEditData = this.state.userEditData;
        userEditData.reportee_ID = 0;
        this.setState({
          ReportToData: [],
          userEditData
        });
      }
    }, 1);
  }
  handleDesination = (data1, e) => {
    debugger;

    this.setState({
      [e.target.name]: e.target.value
    });
    setTimeout(() => {
      if (this.state.selectedDesignation) {
        this.handleGetReporteedesignationList(data1);
      }
    }, 1);
  };
  handleEditDesination = (data1, e) => {
    debugger;
    e.preventDefault();
    e.stopPropagation();
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    this.setState({
      EditTemp: data
    });
    setTimeout(() => {
      if (parseInt(this.state.userEditData.designation_ID)) {
        this.handleGetReporteedesignationList(data1);
      } else {
        let userEditData = this.state.userEditData;
        userEditData.reporteeDesignation_ID = 0;
        userEditData.reportee_ID = 0;
        this.setState({
          ReporteeDesignData: [],
          ReportToData: [],
          userEditData
        });
      }
    }, 1);
  };

  handleBrandChange = (data, e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ selectedBrand: e, CategoryData: [] });
    } else {
      this.setState({ selectedBrand: e });
      setTimeout(() => {
        if (this.state.selectedBrand) {
          this.handleGetCategoryList(data);
        }
      }, 1);
    }
  };
  handleEditBrandChange = (data, e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ editBrand: e, CategoryData: [] });
    } else {
      if (e !== null) {
        this.setState({ editBrand: e });
      } else {
        this.setState({
          editBrand: [],
          editCategory: [],
          editSubCategory: [],
          editIssuetype: []
        });
      }

      setTimeout(() => {
        if (this.state.editBrand) {
          this.setState({ editCategory: [] });
          this.handleGetCategoryList(data);
        }
      }, 1);
    }
  };
  handleCategoryChange = (data, e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ selectedCategory: e, SubCategoryData: [] });
    } else {
      this.setState({ selectedCategory: e });
      setTimeout(() => {
        if (this.state.selectedCategory) {
          this.handleGetSubCategoryList(data);
        }
      }, 1);
    }
  };
  handleEditCategoryChange = (data, e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ editCategory: e, SubCategoryData: [] });
    } else {
      if (e !== null) {
        this.setState({ editCategory: e });
      } else {
        this.setState({
          editCategory: [],
          editSubCategory: [],
          editIssuetype: []
        });
      }

      setTimeout(() => {
        if (this.state.editCategory) {
          this.setState({ editSubCategory: [] });
          this.handleGetSubCategoryList(data);
        }
      }, 1);
    }
  };
  handleSubCategoryChange = (data, e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ selectedSubCategory: e, IssueTypeData: [] });
    } else {
      this.setState({ selectedSubCategory: e });
      setTimeout(() => {
        if (this.state.selectedSubCategory) {
          this.handleGetIssueTypeList(data);
        }
      }, 1);
    }
  };
  handleEditSubCategoryChange = (data, e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ editSubCategory: e, IssueTypeData: [] });
    } else {
      if (this.state.editCategory !== null) {
        if (e !== null) {
          this.setState({ editSubCategory: e });
        } else {
          this.setState({ editSubCategory: [], editIssuetype: [] });
        }

        setTimeout(() => {
          if (this.state.editSubCategory) {
            this.setState({ editIssuetype: [] });
            this.handleGetIssueTypeList(data);
          }
        }, 1);
      } else {
        this.setState({ editSubCategory: [] });
      }
    }
  };
  handleIssueTypeChange = e => {
    debugger;
    if (e === null) {
      e = [];
    }
    this.setState({ selectedIssueType: e });
  };
  handleEditIssueTypeChange = e => {
    debugger;
    if (e === null) {
      e = [];
    }
    if (e !== null) {
      this.setState({ editIssuetype: e });
    } else {
      this.setState({ editIssuetype: [] });
    }
  };
  handleGetCRMRoleList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoleDropdown",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let crmroledata = res.data.responseData;
        self.setState({
          CRMRoleData: crmroledata
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  editMethod() {
    debugger;
    this.setState({
      personalReadOnly: false,
      buttonToggle: true
    });
  }
  editProfileMethod() {
    debugger;
    this.setState({
      profileReadOnly: false,
      buttonProfileToggle: true
    });
  }
  handleGetDesignationList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let designationdata = res.data.responseData;

        self.setState({
          DesignationData: designationdata
        });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleGetReporteedesignationList(data1) {
    debugger;
    let self = this;
    let id;
    if (data1 === "add") {
      id = this.state.selectedDesignation;
    } else if (data1 === "edit") {
      id = this.state.userEditData.designation_ID;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetReporteeDesignation",
      headers: authHeader(),
      params: {
        DesignationID: id
      }
    })
      .then(function(res) {
        debugger;
        let data = res.data.responseData;

        self.setState({
          ReporteeDesignData: data
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetReportTOList(data2) {
    debugger;
    let self = this;
    let id;
    if (data2 === "add") {
      id = this.state.selectedReporteeDesign;
    } else if (data2 === "edit") {
      id = this.state.userEditData.reporteeDesignation_ID;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetReportTo",
      headers: authHeader(),
      params: {
        DesignationID: id
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ReportToData: data
          });
        } else {
          self.setState({
            ReportToData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetCategoryList(data) {
    debugger;
    let self = this;
    var finalBrandId = "";
    if (data === "add") {
      if (this.state.selectedBrand !== null) {
        for (let i = 0; i < this.state.selectedBrand.length; i++) {
          finalBrandId += this.state.selectedBrand[i].brandID + ",";
        }
      }
    } else if (data === "edit") {
      if (this.state.editBrand !== null) {
        for (let i = 0; i < this.state.editBrand.length; i++) {
          finalBrandId += this.state.editBrand[i].brandID + ",";
        }
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryListByMultiBrandID",
      headers: authHeader(),
      params: {
        BrandIDs: finalBrandId
      }
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            CategoryData: data,
            multibrandIDs: finalBrandId
          });
        } else {
          self.setState({
            CategoryData: [],
            multibrandIDs: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetSubCategoryList(data) {
    debugger;
    let self = this;
    var finalCategoryId = "";
    if (data === "add") {
      if (this.state.selectedCategory !== null) {
        for (let i = 0; i < this.state.selectedCategory.length; i++) {
          finalCategoryId += this.state.selectedCategory[i].categoryID + ",";
        }
      }
    } else if (data === "edit") {
      if (this.state.editCategory !== null) {
        for (let i = 0; i < this.state.editCategory.length; i++) {
          finalCategoryId += this.state.editCategory[i].categoryID + ",";
        }
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByMultiCategoryID",
      headers: authHeader(),
      params: {
        CategoryIDs: finalCategoryId
      }
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            SubCategoryData: data,
            multicategoryIDs: finalCategoryId
          });
        } else {
          self.setState({
            SubCategoryData: [],
            multicategoryIDs: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetIssueTypeList(data) {
    debugger;
    let self = this;
    var finalSubCategoryId = "";

    if (data === "add") {
      if (this.state.selectedSubCategory !== null) {
        for (let i = 0; i < this.state.selectedSubCategory.length; i++) {
          finalSubCategoryId +=
            this.state.selectedSubCategory[i].subCategoryID + ",";
        }
      }
    } else if (data === "edit") {
      if (this.state.editSubCategory !== null) {
        for (let i = 0; i < this.state.editSubCategory.length; i++) {
          finalSubCategoryId +=
            this.state.editSubCategory[i].subCategoryID + ",";
        }
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeListByMultiSubCategoryID",
      headers: authHeader(),
      params: {
        SubCategoryIDs: finalSubCategoryId
      }
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            IssueTypeData: data,
            multisubcategoryIDs: finalSubCategoryId
          });
        } else {
          self.setState({
            IssueTypeData: [],
            multisubcategoryIDs: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetAgentList(datar) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getagentlist",
      headers: authHeader(),
      params: {
        TicketID: 0 // Don't change this value (Set on API side)
      }
    })
      .then(function(res) {
        debugger;
        var array = [];
        var agentdata = res.data.responseData;
        var addvalue1 = self.state.selectedAgentRadio;
        var addvalue2 = self.state.selectedSupervisorRadio;
        var editvalue1 = self.state.editAgentRadio;
        var editvalue2 = self.state.editSupervisorRadio;
        if (datar === "add") {
          if (addvalue1 === true) {
            array = agentdata.filter(a => a.designation === "Agent");
          } else if (addvalue2 === true) {
            array = agentdata.filter(a => a.designation === "Supervisor");
          }
        } else if (datar === "edit") {
          if (editvalue1 === true) {
            array = agentdata.filter(a => a.designation === "Agent");
          } else if (editvalue2 === true) {
            array = agentdata.filter(a => a.designation === "Supervisor");
          }
        }

        self.setState({ AgentData: array });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetUserList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/User/GetUserListData",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        var userdata = res.data.responseData;
        var status = res.data.message;

        if (status === "Success") {
          self.setState({
            userData: userdata
          });
        } else {
          self.setState({
            userData: []
          });
        }

        if (userdata !== null) {
          self.state.sortAllData = userdata;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (
              !unique[userdata[i].designation] &&
              userdata[i].designation !== ""
            ) {
              distinct.push(userdata[i].designation);
              unique[userdata[i].designation] = 1;
            }
          }
          // self.state.sortDesignation.push({ designation: "all" });
          // self.state.sortFilterDesignation.push({ designation: "all" });

          for (let i = 0; i < distinct.length; i++) {
            self.state.sortDesignation.push({
              designation: distinct[i]
            });
            self.state.sortFilterDesignation.push({
              designation: distinct[i]
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (!unique[userdata[i].userName] && userdata[i].userName !== "") {
              distinct.push(userdata[i].userName);
              unique[userdata[i].userName] = 1;
            }
          }

          // self.state.sortUsername.push({ userName: "all" });
          // self.state.sortFilterUsername.push({ userName: "all" });
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortUsername.push({
              userName: distinct[i]
            });
            self.state.sortFilterUsername.push({
              userName: distinct[i]
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (
              !unique[userdata[i].mobileNumber] &&
              userdata[i].mobileNumber !== ""
            ) {
              distinct.push(userdata[i].mobileNumber);
              unique[userdata[i].mobileNumber] = 1;
            }
          }
          // self.state.sortMobile.push({ mobileNumber: "all" });
          //   self.state.sortFilterMobile.push({ mobileNumber: "all" });
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortMobile.push({
              mobileNumber: distinct[i]
            });
            self.state.sortFilterMobile.push({
              mobileNumber: distinct[i]
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (!unique[userdata[i].emailID] && userdata[i].emailID !== "") {
              distinct.push(userdata[i].emailID);
              unique[userdata[i].emailID] = 1;
            }
          }
          // self.state.sortEmail.push({ emailID: "all" });
          //   self.state.sortFilterEmail.push({ emailID: "all" });
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortEmail.push({
              emailID: distinct[i]
            });
            self.state.sortFilterEmail.push({
              emailID: distinct[i]
            });
          }
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleGetUserListByID(id) {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserDetailsById",
      headers: authHeader(),
      params: {
        UserID: id
      }
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var userdata = res.data.responseData;
        if (status === "Success") {
          self.setState({
            GetUserData: userdata
          });
          self.setUserEditData(userdata, id);
        } else {
          self.setState({
            GetUserData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleValidationEmailIdMob() {
    debugger;
    if (
      this.state.selectUserName.length > 0 &&
      this.state.selectFirstName.length > 0 &&
      // this.state.selectLastName.length > 0 &&
      this.state.selectMobile.length > 0 &&
      this.state.selectEmail.length > 0 &&
      this.state.emailFlag === true &&
      this.state.phoneFlag === true
    ) {
      this.state.emailValidation = "";
      this.state.mobileValidation = "";
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/User/validateUserExist",
        headers: authHeader(),
        params: {
          UserEmailID: this.state.selectEmail,
          UserMobile: this.state.selectMobile
        }
      })
        .then(function(res) {
          debugger;
          var status = res.data.message;
          var userdata = res.data.responseData;
          if (status === "Success") {
            if (userdata === "Email Id already exist!") {
              self.setState({
                emailValidation: "Email Id already exist!"
              });
            } else if (userdata === "Phone number already exist!") {
              self.setState({
                mobileValidation: "Phone number already exist!"
              });
            } else if (
              userdata === "Email Id and Phone number both are already exist!"
            ) {
              self.setState({
                emailValidation: "Email Id already exist!",
                mobileValidation: "Phone number already exist!"
              });
            } else if (userdata === "Not Exist") {
              self.handleAddPersonalDetails();
            }
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        usernameCompulsion: "Please enter user name.",
        firstnameCompulsion: "Please enter first name.",
        // lastnameCompulsion: "Please enter last name.",
        mobilenumberCompulsion: "Please enter mobile number.",
        emailCompulsion: "Please enter emailID."
      });
    }
  }

  handleAddPersonalDetails() {
    debugger;
    if (
      this.state.selectUserName.length > 0 &&
      this.state.selectFirstName.length > 0 &&
      // this.state.selectLastName.length > 0 &&
      this.state.selectMobile.length > 0 &&
      this.state.selectEmail.length > 0
    ) {
      let self = this;
      var json = {
        UserName: this.state.selectUserName.trim(),
        FirstName: this.state.selectFirstName.trim(),
        LastName: this.state.selectLastName.trim(),
        MobileNo: this.state.selectMobile.trim(),
        EmailID: this.state.selectEmail.trim()
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/AddUserPersonalDetail",
        headers: authHeader(),
        data: json
      })
        .then(function(res) {
          debugger;
          let id = res.data.responseData;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Record Save successfully.");
            self.setState({
              getID: id,
              personalReadOnly: true
            });
            self.handleGetUserList();
          } else {
            NotificationManager.error("Record Not Saved .");
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        usernameCompulsion: "Please enter user name.",
        firstnameCompulsion: "Please enter first name.",
        // lastnameCompulsion: "Please enter last name.",
        mobilenumberCompulsion: "Please enter mobile number.",
        emailCompulsion: "Please enter emailID."
      });
    }
  }

  handleEditPersonalDetails() {
    debugger;
    if (
      this.state.selectUserName.length > 0 &&
      this.state.selectFirstName.length > 0 &&
      // this.state.selectLastName.length > 0 &&
      this.state.selectMobile.length > 0 &&
      this.state.selectEmail.length > 0
    ) {
      let self = this;
      var id = this.state.getID;
      var json = {
        UserName: this.state.selectUserName,
        FirstName: this.state.selectFirstName,
        LastName: this.state.selectLastName,
        MobileNo: this.state.selectMobile,
        EmailID: this.state.selectEmail,
        UserID: id
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/EditUserPersonalDetail",
        headers: authHeader(),
        data: json
      })
        .then(function(res) {
          debugger;

          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Record Updated successfully.");
          } else {
            NotificationManager.error("Record Not Updated.");
          }
          self.setState({
            getID: id,
            personalReadOnly: true
          });
          self.handleGetUserList();
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        usernameCompulsion: "Please enter user name.",
        firstnameCompulsion: "Please enter first name.",
        // lastnameCompulsion: "Please enter last name.",
        mobilenumberCompulsion: "Please enter mobile number.",
        emailCompulsion: "Please enter emailID."
      });
    }
  }

  handleAddProfileDetails() {
    debugger;
    if (
      this.state.selectedDesignation > 0 &&
      this.state.selectedReporteeDesign > 0 &&
      this.state.selectedReportTO > 0
    ) {
      let self = this;
      let id = this.state.getID;
      axios({
        method: "post",
        url: config.apiUrl + "/User/AddUserProfileDetail",
        headers: authHeader(),
        params: {
          UserID: id,
          DesignationID: this.state.selectedDesignation,
          ReportTo: this.state.selectedReportTO
        }
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          if (self.state.buttonProfileToggle === true) {
            if (Msg === "Success") {
              NotificationManager.success("Record Updated successfully.");
            } else {
              NotificationManager.error("Please Add Personal Details.");
            }
          } else {
            if (Msg === "Success") {
              NotificationManager.success("Record Saved successfully.");
              self.setState({
                getID: id,
                profileReadOnly: true
              });
              self.handleGetUserList();
            } else {
              NotificationManager.error("Please Add Personal Details.");
            }
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        userdesignCompulsion: "Please select designation.",
        reporteeDesignCompulsion: "Please select reportee designation.",
        reportToCompulsion: "Please select reportee"
      });
    }
  }

  handleAddMapCategory() {
    debugger;
    var radiob = true;
    var agentb = true;
    if (this.state.selectedAssignEscalation === true) {
      if (
        this.state.selectedSupervisorRadio !== true &&
        this.state.selectedAgentRadio !== true
      ) {
        radiob = false;
      } else {
        radiob = true;
      }
    }
    if (this.state.selectedAgentRadio === true) {
      if (
        this.state.selectedAgent === 0 ||
        this.state.selectedAgent === "Select Agent"
      ) {
        agentb = false;
      } else {
        agentb = true;
      }
    }
    if (
      this.state.selectedBrand !== null &&
      this.state.selectedCategory !== null &&
      this.state.selectedSubCategory !== null &&
      this.state.selectedIssueType !== null &&
      this.state.selectedCRMRoles > 0 &&
      radiob === true &&
      agentb === true

      // this.state.selectedCopyEscalation === true &&
      // this.state.selectedAssignEscalation === true &&
      // this.state.selectedAgent > 0
    ) {
      let self = this;
      var finalIssueTypeId = "";

      if (this.state.selectedIssueType !== null) {
        for (let i = 0; i < this.state.selectedIssueType.length; i++) {
          finalIssueTypeId += this.state.selectedIssueType[i].issueTypeID + ",";
        }
      }
      var activeStatus = 0;
      var copyescn = 0;
      var assignescn = 0;
      var SuperAgent = 0;
      var superAgentValue = this.state.selectedAgentRadio;
      if (superAgentValue === true) {
        SuperAgent = 1;
      } else {
        SuperAgent = 0;
      }
      var CopyE = this.state.selectedCopyEscalation;
      var AssignE = this.state.selectedAssignEscalation;
      if (CopyE === true && AssignE === false) {
        copyescn = 1;
        assignescn = 0;
      } else if (CopyE === false && AssignE === true) {
        copyescn = 0;
        assignescn = 1;
      } else if (CopyE === true && AssignE === true) {
        copyescn = 1;
        assignescn = 1;
      } else if (CopyE === false && AssignE === false) {
        copyescn = 0;
        assignescn = 0;
      }

      var status = this.state.selectedStatus;
      if (status === "true") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      var brand = this.state.multibrandIDs.substring(
        0,
        this.state.multibrandIDs.length - 1
      );
      var category = this.state.multicategoryIDs.substring(
        0,
        this.state.multicategoryIDs.length - 1
      );
      var subcat = this.state.multisubcategoryIDs.substring(
        0,
        this.state.multisubcategoryIDs.length - 1
      );
      var issue = finalIssueTypeId.substring(0, finalIssueTypeId.length - 1);
      var json = {
        UserId: this.state.getID,
        BrandIds: brand,
        categoryIds: category,
        subCategoryIds: subcat,
        IssuetypeIds: issue,
        RoleID: this.state.selectedCRMRoles,
        IsCopyEscalation: copyescn,
        IsAssignEscalation: assignescn,
        IsAgent: SuperAgent,
        IsActive: activeStatus,
        EscalateAssignToId: this.state.selectedAgent
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/Mapcategory",
        headers: authHeader(),
        data: json
      })
        .then(function(res) {
          debugger;

          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("User Created successfully.");
            self.handleSendMail(self.state.getID);
          } else {
            NotificationManager.error("User Not Created .");
          }
          self.setState({
            selectUserName: "",
            selectFirstName: "",
            selectLastName: "",
            selectMobile: "",
            selectEmail: "",
            selectedDesignation: 0,
            selectedReporteeDesign: 0,
            selectedReportTO: 0,
            selectedBrand: [],
            selectedCategory: [],
            selectedSubCategory: [],
            selectedIssueType: [],
            selectedCRMRoles: 0,
            selectedCopyEscalation: false,
            selectedAssignEscalation: false,
            selectedSupervisorAgent: "",
            selectedAgent: 0,
            selectedStatus: "",
            buttonToggle: false,
            buttonProfileToggle: false,
            personalReadOnly: false,
            profileReadOnly: false,
            getID: 0,
            brandCompulsion: "",
            categoryCompulsion: "",
            subcategoryCompulsion: "",
            isuuetypeCompulsion: "",
            crmroleCompulsion: "",
            copyescCompulsion: "",
            assignescCompulsion: "",
            agentCompulsion: ""
          });
          self.handleGetUserList();
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        brandCompulsion: "Please select brands",
        categoryCompulsion: "Please select category",
        subcategoryCompulsion: "Please select subcategory",
        isuuetypeCompulsion: "Please select issuetype",
        crmroleCompulsion: "Please select  crm roles",
        // copyescCompulsion: "Please select copy escalation",
        // assignescCompulsion: "Please select assign escalation",
        RadioCompulsion: "Please select any option.",
        agentCompulsion: "Please select agent"
      });
    }
  }

  handleDeleteUser(id) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/User/DeleteUser",
      headers: authHeader(),
      params: {
        userID: id
      }
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        if (Msg === "Record In use") {
          NotificationManager.error("Record in use.");
        } else if (Msg === "Record deleted Successfully") {
          NotificationManager.success("Record deleted Successfully.");
          self.handleGetUserList();
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleSendMail(id) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/User/SendMailforchangepassword",
      headers: authHeader(),
      params: {
        userID: id
      }
    })
      .then(function(res) {
        debugger;
        let reportto = res.data.responseData;
        if (reportto === "Mail sent successfully") {
          NotificationManager.success("Please Check Email.");
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleUpdateUser() {
    debugger;

    var radiob = true;
    var agentb = true;
    if (this.state.userEditData.is_Assign_Escalation === true) {
      if (
        this.state.editSupervisorRadio !== true &&
        this.state.editAgentRadio !== true
      ) {
        radiob = false;
      } else {
        radiob = true;
      }
    }
    if (this.state.editAgentRadio === true) {
      if (
        this.state.userEditData.assign_ID === 0 ||
        this.state.userEditData.assign_ID === "Select Agent"
      ) {
        agentb = false;
      } else {
        agentb = true;
      }
    }

    if (
      this.state.userEditData.selectUserName.length > 0 &&
      this.state.userEditData.first_Name.length > 0 &&
      // this.state.userEditData.last_Name.length > 0 &&
      this.state.userEditData.mobile_Number.length > 0 &&
      this.state.userEditData.email_ID.length > 0 &&
      this.state.userEditData.designation_ID > 0 &&
      this.state.userEditData.reporteeDesignation_ID > 0 &&
      this.state.userEditData.reportee_ID > 0 &&
      this.state.editBrand !== null &&
      this.state.editBrand.length > 0 &&
      this.state.editCategory !== null &&
      this.state.editCategory.length > 0 &&
      this.state.editSubCategory !== null &&
      this.state.editSubCategory.length > 0 &&
      this.state.editIssuetype !== null &&
      this.state.editIssuetype.length > 0 &&
      this.state.userEditData.role_ID > 0 &&
      this.state.editEmailFlag === true &&
      this.state.EditPhoneFlag === true &&
      radiob === true &&
      agentb === true
      // this.state.userEditData.is_Copy_Escalation === true &&
      // this.state.userEditData.is_Assign_Escalation === true &&
      //this.state.userEditData.assign_ID > 0
    ) {
      this.handleGetUserListByID(this.state.userEditData.userId);
      let self = this;

      var finalIssueTypeId = "";
      var finalBrandId = "";
      var finalCategoryId = "";
      var finalSubCategoryId = "";
      var copyescn = 0;
      var assignescn = 0;
      var activeStatus = 0;

      if (this.state.editBrand !== null) {
        for (let i = 0; i < this.state.editBrand.length; i++) {
          finalBrandId += this.state.editBrand[i].brandID + ",";
        }
      }

      if (this.state.editCategory !== null) {
        for (let i = 0; i < this.state.editCategory.length; i++) {
          finalCategoryId += this.state.editCategory[i].categoryID + ",";
        }
      }

      if (this.state.editIssuetype !== null) {
        for (let i = 0; i < this.state.editIssuetype.length; i++) {
          finalIssueTypeId += this.state.editIssuetype[i].issueTypeID + ",";
        }
      }
      if (this.state.editSubCategory !== null) {
        for (let i = 0; i < this.state.editSubCategory.length; i++) {
          finalSubCategoryId +=
            this.state.editSubCategory[i].subCategoryID + ",";
        }
      }
      var CopyE = this.state.userEditData.is_Copy_Escalation;
      var AssignE = this.state.userEditData.is_Assign_Escalation;
      if (CopyE === true && AssignE === false) {
        copyescn = 1;
        assignescn = 0;
      } else if (CopyE === false && AssignE === true) {
        copyescn = 0;
        assignescn = 1;
      } else if (CopyE === true && AssignE === true) {
        copyescn = 1;
        assignescn = 1;
      } else if (CopyE === false && AssignE === false) {
        copyescn = 0;
        assignescn = 0;
      }
      var SuperAgent = 0;

      var superAgentValue = this.state.editAgentRadio;
      if (superAgentValue === true) {
        SuperAgent = 1;
      } else {
        SuperAgent = 0;
      }

      var status = this.state.userEditData.is_Active;
      if (status === "true") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }

      var brand = finalBrandId.substring(0, finalBrandId.length - 1);
      var category = finalCategoryId.substring(0, finalCategoryId.length - 1);
      var subcat = finalSubCategoryId.substring(
        0,
        finalSubCategoryId.length - 1
      );
      var issue = finalIssueTypeId.substring(0, finalIssueTypeId.length - 1);
      var json = {
        UserID: this.state.userEditData.userId,
        DesignationID: this.state.userEditData.designation_ID,
        ReporteeID: this.state.userEditData.reportee_ID,
        // UserName: this.state.userEditData.userName,
        UserName: this.state.userEditData.selectUserName,
        EmailID: this.state.userEditData.email_ID,
        MobileNo: this.state.userEditData.mobile_Number,
        FirstName: this.state.userEditData.first_Name,
        LastName: this.state.userEditData.last_Name,
        BrandIds: brand,
        categoryIds: category,
        subCategoryIds: subcat,
        IssuetypeIds: issue,
        RoleID: this.state.userEditData.role_ID,
        IsCopyEscalation: copyescn,
        IsAssignEscalation: assignescn,
        IsAgent: SuperAgent,
        EscalateAssignToId: this.state.userEditData.assign_ID,
        IsActive: activeStatus
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/EditUserDetails",
        headers: authHeader(),
        data: json
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Record Updated successfully.");
            if (self.state.GetUserData.isActive === false) {
              self.handleSendMail(self.state.userEditData.userId);
            }
            self.setState({
              multibrandIDs: finalBrandId,
              multicategoryIDs: finalCategoryId,
              multisubcategoryIDs: finalSubCategoryId
            });
          } else {
            NotificationManager.error("Record not Updated.");
          }
          self.closeEditModal();
          self.handleGetUserList();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        editusernameCompulsion: "Please enter user name.",
        editfirstnameCompulsion: "Please enter first name.",
        // editlastnameCompulsion: "Please enter last name.",
        editmobilenumberCompulsion: "Please enter mobile number.",
        editemailCompulsion: "Please enter emailID.",
        edituserdesignCompulsion: "Please select designation.",
        editreporteeDesignCompulsion: "Please select reportee designation.",
        editreportToCompulsion: "Please select reportee",
        editbrandCompulsion: "Please select brands",
        editcategoryCompulsion: "Please select category",
        editsubcategoryCompulsion: "Please select subcategory",
        editisuuetypeCompulsion: "Please select issuetype",
        editcrmroleCompulsion: "Please select  crm roles",
        editRadioCompulsion: "Please select any option.",
        // editcopyescCompulsion: "Please select copy escalation",
        // editassignescCompulsion: "Please select assign escalation",
        editagentCompulsion: "Please select agent"
      });
    }
  }
  // Onchange tab Profile to Personal tab
  handleChangePersonalTab = () => {
    if (
      this.state.userEditData.selectUserName.length > 0 &&
      this.state.userEditData.first_Name.length > 0 &&
      this.state.userEditData.mobile_Number.length > 0 &&
      this.state.userEditData.email_ID.length > 0
    ) {
      this.setState({
        selTab: "Profile Details"
      });
    } else {
      this.setState({
        editusernameCompulsion: "Please enter user name.",
        editfirstnameCompulsion: "Please enter first name.",
        editmobilenumberCompulsion: "Please enter mobile number.",
        editemailCompulsion: "Please enter emailID."
      });
    }
  };
  // Onchange tab Personal to Mapped tab
  handleChangeProfileTab = () => {
    debugger;
    if (
      this.state.userEditData.designation_ID > 0 &&
      this.state.userEditData.reporteeDesignation_ID > 0 &&
      this.state.userEditData.reportee_ID > 0
    ) {
      this.setState({
        selTab: "Mapped Category"
      });
    } else {
      this.setState({
        edituserdesignCompulsion: "Please select designation.",
        editreporteeDesignCompulsion: "Please select reportee designation.",
        editreportToCompulsion: "Please select reportee"
      });
    }
  };

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
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "designation") {
      var sortFilterDesignation = matchSorter(
        this.state.sortDesignation,
        e.target.value,
        { keys: ["designation"] }
      );
      if (sortFilterDesignation.length > 0) {
        this.setState({ sortFilterDesignation });
      } else {
        this.setState({ sortFilterDesignation: this.state.sortDesignation });
      }
    }
    if (this.state.sortColumn === "userName") {
      var sortFilterUsername = matchSorter(
        this.state.sortUsername,
        e.target.value,
        { keys: ["userName"] }
      );
      if (sortFilterUsername.length > 0) {
        this.setState({ sortFilterUsername });
      } else {
        this.setState({
          sortFilterUsername: this.state.sortUsername
        });
      }
    }
    if (this.state.sortColumn === "mobileNumber") {
      var sortFilterMobile = matchSorter(
        this.state.sortMobile,
        e.target.value,
        { keys: ["mobileNumber"] }
      );
      if (sortFilterMobile.length > 0) {
        this.setState({ sortFilterMobile });
      } else {
        this.setState({
          sortFilterMobile: this.state.sortMobile
        });
      }
    }
    if (this.state.sortColumn === "emailID") {
      var sortFilterEmail = matchSorter(this.state.sortEmail, e.target.value, {
        keys: ["emailID"]
      });
      if (sortFilterEmail.length > 0) {
        this.setState({ sortFilterEmail });
      } else {
        this.setState({
          sortFilterEmail: this.state.sortEmail
        });
      }
    }
  }

  handleDeleteBulkupload = e => {
    debugger;
    this.setState({
      fileN: [],
      fileName: ""
    });
    NotificationManager.success("File deleted successfully.");
  };
  hanldeAddBulkUpload() {
    debugger;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;

      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);
      this.setState({ showProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/User/BulkUploadUser",
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
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("File uploaded successfully.");
            self.setState({ fileName: "", fileSize: "", fileN: [] });
            self.handleGetUserList();
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
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  render() {
    const { userData } = this.state;

    return (
      <React.Fragment>
        {/* <NotificationContainer /> */}
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down" style={{ width: "280px" }}>
              <div className="sort-sctn">
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
                        this.state.sdesignationFilterCheckbox.includes("all") ||
                        this.state.suserNameFilterCheckbox.includes("all") ||
                        this.state.smobileNumberFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.semailIDFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "designation"
                    ? this.state.sortFilterDesignation !== null &&
                      this.state.sortFilterDesignation.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.designation}
                            value={item.designation}
                            checked={this.state.sdesignationFilterCheckbox.includes(
                              item.designation
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "designation",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.designation}>
                            <span className="table-btn table-blue-btn">
                              {item.designation}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "userName"
                    ? this.state.sortFilterUsername !== null &&
                      this.state.sortFilterUsername.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.userName}
                            value={item.userName}
                            checked={this.state.suserNameFilterCheckbox.includes(
                              item.userName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "userName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.userName}>
                            <span className="table-btn table-blue-btn">
                              {item.userName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "mobileNumber"
                    ? this.state.sortFilterMobile !== null &&
                      this.state.sortFilterMobile.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.mobileNumber}
                            value={item.mobileNumber}
                            checked={this.state.smobileNumberFilterCheckbox.includes(
                              item.mobileNumber
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "mobileNumber",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.mobileNumber}>
                            <span className="table-btn table-blue-btn">
                              {item.mobileNumber}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "emailID"
                    ? this.state.sortFilterEmail !== null &&
                      this.state.sortFilterEmail.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.emailID}
                            value={item.emailID}
                            checked={this.state.semailIDFilterCheckbox.includes(
                              item.emailID
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "emailID",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.emailID}>
                            <span className="table-btn table-blue-btn">
                              {item.emailID}
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
        {/* ----------------------------------edit Modal------------------------------------ */}
        <Modal
          open={this.state.editmodel}
          onClose={this.closeEditModal}
          modalId="UsEdit-popup"
        >
          <div>
            <Tabs
              onSelect={(index, label) => this.setState({ selTab: label })}
              selected={this.state.selTab}
            >
              <Tab label="Personal Details">
                <div>
                  <h4 style={{ textAlign: "center" }}>Personal Details</h4>
                  <div className="pop-over-div">
                    <label className="edit-label-1">User Name</label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="selectUserName"
                      value={this.state.userEditData.selectUserName}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                    {this.state.userEditData.selectUserName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editusernameCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">First Name</label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="first_Name"
                      value={this.state.userEditData.first_Name}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                    {this.state.userEditData.first_Name === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editfirstnameCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Last Name</label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="last_Name"
                      value={this.state.userEditData.last_Name}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                    {/* {this.state.userEditData.last_Name === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editlastnameCompulsion}
                      </p>
                    )} */}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Mobile Number</label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={10}
                      name="mobile_Number"
                      value={this.state.userEditData.mobile_Number}
                      autoComplete="off"
                      onChange={this.hanldeMobileNoChange}
                    />
                    {this.state.EditPhoneFlag === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        Please enter valid Mobile Number.
                      </p>
                    )}
                    {this.state.userEditData.mobile_Number === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editmobilenumberCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Email ID</label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={100}
                      name="email_ID"
                      value={this.state.userEditData.email_ID}
                      onChange={this.handleOnChangeEditData}
                      disabled
                    />
                    {this.state.editEmailFlag === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        Please enter valid Email Id.
                      </p>
                    )}
                    {this.state.userEditData.email_ID === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editemailCompulsion}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
                >
                  <a
                    className="pop-over-cancle canblue"
                    onClick={this.closeEditModal.bind(this)}
                    href="#!"
                  >
                    CANCEL
                  </a>
                  <button
                    className="Save-Use"
                    onClick={this.handleChangePersonalTab}
                    style={{ marginLeft: "30px" }}
                  >
                    NEXT
                  </button>
                </div>
              </Tab>
              <Tab label="Profile Details">
                <div>
                  <h4 style={{ textAlign: "center" }}>Profile Details</h4>
                  <div className="pop-over-div">
                    <label className="edit-label-1">User Designation</label>
                    <select
                      className="add-select-category"
                      name="designation_ID"
                      value={this.state.userEditData.designation_ID}
                      onChange={this.handleEditDesination.bind(this, "edit")}
                    >
                      <option value="0">Select Designation</option>
                      {this.state.DesignationData !== null &&
                        this.state.DesignationData.map((item, i) => (
                          <option key={i} value={item.designationID}>
                            {item.designationName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.designation_ID == 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.edituserdesignCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Reportee Designation</label>
                    <select
                      className="add-select-category"
                      name="reporteeDesignation_ID"
                      value={this.state.userEditData.reporteeDesignation_ID}
                      onChange={this.handleEditReporteeDesgnDropDown.bind(
                        this,
                        "edit"
                      )}
                    >
                      <option value="0">Select Reportee Designation</option>
                      {this.state.ReporteeDesignData !== null &&
                        this.state.ReporteeDesignData.map((item, i) => (
                          <option key={i} value={item.designationID}>
                            {item.designationName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.reporteeDesignation_ID == 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editreporteeDesignCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Report To</label>
                    <select
                      className="add-select-category"
                      name="reportee_ID"
                      value={this.state.userEditData.reportee_ID}
                      onChange={this.handleOnChangeEditData}
                    >
                      <option value="0">Select Report To</option>
                      {this.state.ReportToData !== null &&
                        this.state.ReportToData.map((item, i) => (
                          <option key={i} value={item.user_ID}>
                            {item.agentName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.reportee_ID == 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editreportToCompulsion}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
                >
                  <a
                    className="pop-over-cancle canblue"
                    onClick={this.closeEditModal.bind(this)}
                    href="#!"
                  >
                    CANCEL
                  </a>
                  <button
                    className="Save-Use"
                    // onClick={() => this.setState({ selTab: "Mapped Category" })}
                    onClick={this.handleChangeProfileTab}
                    style={{ marginLeft: "30px" }}
                  >
                    NEXT
                  </button>
                </div>
              </Tab>
              <Tab label="Mapped Category">
                <div>
                  <h4 style={{ textAlign: "center" }}>Mapped Category</h4>
                  <div className="pop-over-div">
                    <label>Brand</label>
                    {
                      <Select
                        getOptionLabel={option => option.brandName}
                        getOptionValue={option => option.brandID}
                        options={this.state.brandData}
                        placeholder="Select"
                        closeMenuOnSelect={false}
                        name="editBrand"
                        onChange={this.handleEditBrandChange.bind(this, "edit")}
                        value={this.state.editBrand}
                        isMulti
                      />
                    }
                    {this.state.editBrand.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editbrandCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label>Categories</label>

                    <Select
                      getOptionLabel={option => option.categoryName}
                      getOptionValue={option => option.categoryID}
                      options={this.state.CategoryData}
                      placeholder="Select"
                      // menuIsOpen={true}
                      name="editCategory"
                      closeMenuOnSelect={false}
                      onChange={this.handleEditCategoryChange.bind(
                        this,
                        "edit"
                      )}
                      value={this.state.editCategory}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.editCategory.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editcategoryCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label>Sub Categories</label>

                    <Select
                      getOptionLabel={option => option.subCategoryName}
                      getOptionValue={option => option.subCategoryID}
                      options={this.state.SubCategoryData}
                      placeholder="Select"
                      // menuIsOpen={true}
                      name="selectedSubCategory"
                      closeMenuOnSelect={false}
                      onChange={this.handleEditSubCategoryChange.bind(
                        this,
                        "edit"
                      )}
                      value={this.state.editSubCategory}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.editSubCategory.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editsubcategoryCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label>Issue Type</label>

                    <Select
                      getOptionLabel={option => option.issueTypeName}
                      getOptionValue={option => option.issueTypeID}
                      options={this.state.IssueTypeData}
                      placeholder="Select"
                      // menuIsOpen={true}
                      name="selectedIssueType"
                      closeMenuOnSelect={false}
                      onChange={this.handleEditIssueTypeChange.bind(this)}
                      value={this.state.editIssuetype}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.editIssuetype.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editisuuetypeCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="mapped-cate-extra">
                    <div className="pop-over-div">
                      <label>CRM Role</label>
                      <select
                        className="add-select-category"
                        name="role_ID"
                        value={this.state.userEditData.role_ID}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option>Select Designation</option>
                        {this.state.CRMRoleData !== null &&
                          this.state.CRMRoleData.map((item, i) => (
                            <option key={i} value={item.crmRoleID}>
                              {item.roleName}
                            </option>
                          ))}
                      </select>
                      {this.state.userEditData.role_ID === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.editcrmroleCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="pop-over-div escalation-options">
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          id="copy-esc1"
                          name="is_Copy_Escalation"
                          checked={this.state.userEditData.is_Copy_Escalation}
                          value={this.state.userEditData.is_Copy_Escalation}
                          onChange={this.editsetEscn}
                        />
                        <label htmlFor="copy-esc1">Copy Escalation</label>
                      </div>
                      {this.state.userEditData.is_Copy_Escalation === false && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.editcopyescCompulsion}
                        </p>
                      )}

                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          id="assign-esc1"
                          name="is_Assign_Escalation"
                          checked={this.state.userEditData.is_Assign_Escalation}
                          value={this.state.userEditData.is_Assign_Escalation}
                          onChange={this.editsetEscn}
                        />
                        <label htmlFor="assign-esc1">Assign Escalation</label>
                      </div>
                      {this.state.userEditData.is_Assign_Escalation ===
                        false && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.editassignescCompulsion}
                        </p>
                      )}
                      {this.state.userEditData.is_Assign_Escalation === true ? (
                        <div className="sup-agent-cntr">
                          <div className="status-options">
                            <input
                              type="radio"
                              name="selectedSupervisoragent"
                              id="supervisor1"
                              checked={this.state.editSupervisorRadio}
                              value={this.state.editSupervisorRadio}
                              onChange={this.editSuperValue.bind(this, "edit")}
                            />
                            <label
                              htmlFor="supervisor1"
                              className="logout-label"
                            >
                              Supervisor
                            </label>
                          </div>
                          <div className="status-options">
                            <input
                              type="radio"
                              name="selectedSupervisoragent"
                              id="agent1"
                              checked={this.state.editAgentRadio}
                              value={this.state.editAgentRadio}
                              onChange={this.editAgentValue.bind(this, "edit")}
                            />
                            <label htmlFor="agent1" className="logout-label">
                              Agent
                            </label>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {this.state.editAgentRadio === true &&
                    this.state.userEditData.is_Assign_Escalation === true ? (
                      <div className="pop-over-div">
                        <label>Select Agent</label>
                        <select
                          className="add-select-category"
                          name="assign_ID"
                          value={this.state.userEditData.assign_ID}
                          onChange={this.handleOnChangeEditData}
                        >
                          <option>Select Agent</option>
                          {this.state.AgentData !== null &&
                            this.state.AgentData.map((item, i) => (
                              <option key={i} value={item.user_ID}>
                                {item.agentName}
                              </option>
                            ))}
                        </select>
                        {this.state.userEditData.assign_ID === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.editagentCompulsion}
                          </p>
                        )}
                      </div>
                    ) : null}

                    <div className="pop-over-div">
                      <label>Status</label>
                      <select
                        className="txt-edit-popover"
                        name="is_Active"
                        value={this.state.userEditData.is_Active}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
                >
                  <a
                    className="pop-over-cancle canblue"
                    onClick={this.closeEditModal.bind(this)}
                    href="#!"
                  >
                    CANCEL
                  </a>
                  <button
                    className="Save-Use"
                    onClick={this.handleUpdateUser.bind(this)}
                    style={{ marginLeft: "30px" }}
                  >
                    SAVE
                  </button>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal>

        {/* ----------------------------------end------------------------------------ */}
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Users
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketUserReact">
                  <ReactTable
                    data={userData}
                    minRows={2}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.userColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "userName",
                              "User Name"
                            )}
                          >
                            User Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "userName",
                        Cell: row => <span>{row.original.userName}</span>
                      },
                      {
                        Header: (
                          <span
                            className={this.state.mobileColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "mobileNumber",
                              "Mobile Number"
                            )}
                          >
                            Mobile No.
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "mobileNumber",
                        Cell: row => <span>{row.original.mobileNumber}</span>
                      },
                      {
                        Header: (
                          <span
                            className={this.state.emailColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "emailID",
                              "EmailID"
                            )}
                          >
                            Email ID
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "email ID",
                        Cell: row => <span>{row.original.emailID}</span>
                      },
                      {
                        Header: (
                          <span
                            className={this.state.designationColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designation",
                              "Designation"
                            )}
                          >
                            Designation
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "designation",
                        Cell: row => {
                          var ids = row.original["userId"];
                          return (
                            <div>
                              <span>
                                {row.original.designation}
                                <Popover
                                  content={
                                    <>
                                      <div className=" row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Reportee Designation: <b>Admin</b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            Issue Type:{" "}
                                            <b>{row.original.issueTypeNames}</b>
                                          </p>
                                        </div>
                                      </div>

                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Report To:{" "}
                                            <b>{row.original.reportTo}</b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            CRM Role:{" "}
                                            <b>{row.original.crmRoleName}</b>
                                          </p>
                                        </div>
                                      </div>

                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Brand:{" "}
                                            <b>{row.original.brandNames}</b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          {row.original.isCopyEscalation ===
                                          "Yes" ? (
                                            <p className="sub-title mx-2">
                                              Copy Escalation: <b>Yes</b>
                                            </p>
                                          ) : (
                                            <p className="sub-title mx-2">
                                              Copy Escalation: <b>No</b>
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Category:{" "}
                                            <b>{row.original.categoryNames}</b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            Assign Escalation:{" "}
                                            <b>
                                              {row.original.assignEscalation}
                                            </b>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Sub Category:{" "}
                                            <b>
                                              {row.original.subCategoryNames}
                                            </b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            Agent Name:{" "}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Created By:{" "}
                                            <b>{row.original.createdBy}</b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            Updated By:{" "}
                                            <b>{row.original.updatedBy}</b>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            Created Date:{" "}
                                            <b>{row.original.createdDate}</b>
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            Updated Date:{" "}
                                            <b>{row.original.updatedDate}</b>
                                          </p>
                                        </div>
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
                        Header: <span>Actions</span>,
                        accessor: "userId",
                        sortable: false,
                        Cell: row => {
                          var ids = row.original["userId"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + ids}
                                    >
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
                                          <a
                                            className="canblue"
                                            onClick={() =>
                                              this.hide(this, "samdel" + ids)
                                            }
                                          >
                                            CANCEL
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteUser.bind(
                                              this,
                                              row.original.userId
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
                                    //onClick={() => this.show(this, "samdel" + ids)}
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  onClick={this.handleGetUserListByID.bind(
                                    this,
                                    row.original.userId
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
                    defaultPageSize={10}
                    showPagination={true}
                  />
                
                </div>
              </div>
              <div className="col-md-4 cus-drp">
                <div className="right-sect-div right-sect-collapse">
                  <h3>Create Users</h3>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="true"
                      aria-controls="personal-details"
                    >
                      Personal Details
                    </a>
                    <div className="multi-collapse show" id="personal-details">
                      <div className="div-cntr">
                        <label>User Name</label>
                        <input
                          type="text"
                          maxLength={25}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectUserName"
                          value={this.state.selectUserName}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.selectUserName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.usernameCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>First Name</label>
                        <input
                          type="text"
                          maxLength={25}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectFirstName"
                          value={this.state.selectFirstName}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.selectFirstName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.firstnameCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Last Name</label>
                        <input
                          type="text"
                          maxLength={25}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectLastName"
                          value={this.state.selectLastName}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {/* {this.state.selectLastName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.lastnameCompulsion}
                          </p>
                        )} */}
                      </div>
                      <div className="div-cntr">
                        <label>Mobile Number</label>
                        <input
                          type="text"
                          maxLength={10}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectMobile"
                          value={this.state.selectMobile}
                          autoComplete="off"
                          onChange={this.hanldeMobileNoChange}
                        />
                        {this.state.phoneFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            Please enter valid Mobile Number.
                          </p>
                        )}
                        {this.state.selectMobile.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mobilenumberCompulsion}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.mobileValidation}
                        </p>
                      </div>
                      <div className="div-cntr">
                        <label>Email ID</label>
                        <input
                          type="text"
                          maxLength={100}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectEmail"
                          value={this.state.selectEmail}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.emailFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            Please enter valid Email Id.
                          </p>
                        )}
                        {this.state.selectEmail.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.emailCompulsion}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.emailValidation}
                        </p>
                      </div>

                      {this.state.personalReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            //data-toggle="collapse"
                            //href="#personal-details"
                            //data-target="#profile-details"
                            //data-toggle="collapse"
                            className="butn"
                            onClick={this.editMethod.bind(this)}
                          >
                            Edit
                          </button>
                        </div>
                      ) : this.state.buttonToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-toggle="collapse"
                            href="#personal-details"
                            //data-target="#profile-details"
                            //data-toggle="collapse"
                            className="butn"
                            onClick={this.handleEditPersonalDetails.bind(this)}
                          >
                            Update &amp;Next
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            // data-toggle="collapse"
                            // href="#personal-details"
                            //data-target="#profile-details"
                            //data-toggle="collapse"
                            className="butn"
                            onClick={this.handleValidationEmailIdMob.bind(this)}
                          >
                            SAVE &amp; NEXT
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#profile-details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="profile-details"
                    >
                      Profile Details
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="profile-details"
                    >
                      <div className="div-cntr">
                        <label>User Designation</label>
                        <select
                          //className="add-select-category"
                          disabled={this.state.profileReadOnly}
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input add-select-category"
                              : "add-select-category"
                          }
                          name="selectedDesignation"
                          value={this.state.selectedDesignation}
                          onChange={this.handleDesination.bind(this, "add")}
                        >
                          <option>Select Designation</option>
                          {this.state.DesignationData !== null &&
                            this.state.DesignationData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedDesignation === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.userdesignCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Reportee Designation</label>
                        <select
                          //className="add-select-category"
                          disabled={this.state.profileReadOnly}
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input add-select-category"
                              : "add-select-category"
                          }
                          name="selectedReporteeDesign"
                          value={this.state.selectedReporteeDesign}
                          onChange={this.handleReporteeDesgnDropDown.bind(
                            this,
                            "add"
                          )}
                        >
                          <option>Select Reportee Designation</option>
                          {this.state.ReporteeDesignData !== null &&
                            this.state.ReporteeDesignData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedReporteeDesign === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reporteeDesignCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Report To</label>
                        <select
                          //className="add-select-category"
                          disabled={this.state.profileReadOnly}
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input add-select-category"
                              : "add-select-category"
                          }
                          name="selectedReportTO"
                          value={this.state.selectedReportTO}
                          onChange={this.handleOnChangeUserData}
                        >
                          <option>Select Report To</option>
                          {this.state.ReportToData !== null &&
                            this.state.ReportToData.map((item, i) => (
                              <option key={i} value={item.user_ID}>
                                {item.agentName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedReportTO === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsion}
                          </p>
                        )}
                      </div>
                      {this.state.profileReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            //data-toggle="collapse"
                            //href="#profile-details"
                            //data-target="#mapped-category"
                            //data-toggle="collapse"
                            className="butn"
                            onClick={this.editProfileMethod.bind(this)}
                          >
                            Edit
                          </button>
                        </div>
                      ) : this.state.buttonProfileToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-toggle="collapse"
                            href="#profile-details"
                            //data-target="#mapped-category"
                            //data-toggle="collapse"
                            className="butn"
                            onClick={this.handleAddProfileDetails.bind(this)}
                          >
                            Update &amp;Next
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            //data-target="#mapped-category"
                            // data-toggle="collapse"
                            //href="#profile-details"
                            className="butn"
                            onClick={this.handleAddProfileDetails.bind(this)}
                          >
                            SAVE &amp; NEXT
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#mapped-category"
                      role="button"
                      aria-expanded="false"
                      aria-controls="mapped-category"
                    >
                      Mapped Category
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="mapped-category"
                    >
                      <div className="div-cntr">
                        <label>Brand</label>
                        <Select
                          getOptionLabel={option => option.brandName}
                          getOptionValue={option => option.brandID}
                          options={this.state.brandData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          closeMenuOnSelect={false}
                          name="selectedBrand"
                          onChange={this.handleBrandChange.bind(this, "add")}
                          value={this.state.selectedBrand}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                        {this.state.selectedBrand.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Categories</label>

                        <Select
                          getOptionLabel={option => option.categoryName}
                          getOptionValue={option => option.categoryID}
                          options={this.state.CategoryData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          name="selectedCategory"
                          closeMenuOnSelect={false}
                          onChange={this.handleCategoryChange.bind(this, "add")}
                          value={this.state.selectedCategory}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                        {this.state.selectedCategory.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.categoryCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Sub Categories</label>

                        <Select
                          getOptionLabel={option => option.subCategoryName}
                          getOptionValue={option => option.subCategoryID}
                          options={this.state.SubCategoryData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          name="selectedSubCategory"
                          closeMenuOnSelect={false}
                          onChange={this.handleSubCategoryChange.bind(
                            this,
                            "add"
                          )}
                          value={this.state.selectedSubCategory}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                        {this.state.selectedSubCategory.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.subcategoryCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>Issue Type</label>

                        <Select
                          getOptionLabel={option => option.issueTypeName}
                          getOptionValue={option => option.issueTypeID}
                          options={this.state.IssueTypeData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          name="selectedIssueType"
                          closeMenuOnSelect={false}
                          onChange={this.handleIssueTypeChange}
                          value={this.state.selectedIssueType}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                        {this.state.selectedIssueType.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.isuuetypeCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>CRM Role</label>
                          <select
                            className="add-select-category"
                            name="selectedCRMRoles"
                            value={this.state.selectedCRMRoles}
                            onChange={this.handleOnChangeUserData}
                          >
                            <option>Select Designation</option>
                            {this.state.CRMRoleData !== null &&
                              this.state.CRMRoleData.map((item, i) => (
                                <option key={i} value={item.crmRoleID}>
                                  {item.roleName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedCRMRoles === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.crmroleCompulsion}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr escalation-options">
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="copy-esc"
                              name="selectedCopyEscalation"
                              value={this.state.selectedCopyEscalation}
                              onChange={this.setEscn}
                            />

                            <label htmlFor="copy-esc">Copy Escalation</label>
                          </div>
                          {this.state.selectedCopyEscalation === false && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.copyescCompulsion}
                            </p>
                          )}
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="assign-esc"
                              name="selectedAssignEscalation"
                              value={this.state.selectedAssignEscalation}
                              onChange={this.setEscn}
                            />

                            <label htmlFor="assign-esc">
                              Assign Escalation
                            </label>
                          </div>
                          {this.state.selectedAssignEscalation === false && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.assignescCompulsion}
                            </p>
                          )}
                          {this.state.selectedAssignEscalation === true ? (
                            <>
                              <div className="sup-agent-cntr">
                                <div className="status-options">
                                  <input
                                    type="radio"
                                    name="selectedSupervisorAgent"
                                    id="supervisor"
                                    value={this.state.selectedSupervisorRadio}
                                    defaultChecked={true}
                                    onChange={this.handleSuperValue.bind(
                                      this,
                                      "add"
                                    )}
                                  />

                                  <label
                                    htmlFor="supervisor"
                                    className="logout-label"
                                  >
                                    Supervisor
                                  </label>
                                </div>
                                <div className="status-options">
                                  <input
                                    type="radio"
                                    name="selectedSupervisorAgent"
                                    id="agent"
                                    value={this.state.selectedAgentRadio}
                                    onChange={this.handleAgentValue.bind(
                                      this,
                                      "add"
                                    )}
                                  />
                                  <label
                                    htmlFor="agent"
                                    className="logout-label"
                                  >
                                    Agent
                                  </label>
                                </div>
                              </div>

                              {/* {this.state.selectedSupervisorRadio===false && this.state.selectedAgentRadio ===false (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.RadioCompulsion}
                              </p>
                            )}
                             */}
                            </>
                          ) : null}
                        </div>

                        {this.state.selectedAgentRadio === true &&
                        this.state.selectedAssignEscalation === true ? (
                          <div className="div-cntr">
                            <label>Select Agent</label>

                            <select
                              className="add-select-category"
                              name="selectedAgent"
                              value={this.state.selectedAgent}
                              onChange={this.handleOnChangeUserData}
                            >
                              <option>Select Agent</option>
                              {this.state.AgentData !== null &&
                                this.state.AgentData.map((item, i) => (
                                  <option key={i} value={item.user_ID}>
                                    {item.agentName}
                                  </option>
                                ))}
                            </select>
                            {this.state.selectedAgent === 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.agentCompulsion}
                              </p>
                            )}
                          </div>
                        ) : null}

                        <div className="div-cntr">
                          <label>Status</label>
                          <select
                            name="selectedStatus"
                            value={this.state.selectedStatus}
                            onChange={this.handleOnChangeUserData}
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button
                          className="butn"
                          onClick={this.handleAddMapCategory.bind(this)}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <CSVLink filename={"User.csv"} data={config.userTemplate}>
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
                    </div>
                  </div>
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
                          <span className={"fileupload-span"}>Add File</span> or
                          Drop File here
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
                            <img
                              src={DelBlack}
                              alt="delete-black"
                              onClick={this.togglePopover}
                            />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del-file-1"
                            className="general-popover delete-popover"
                            isOpen={this.state.isOpen}
                            toggle={this.togglePopover}
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
                                  <a
                                    className="canblue"
                                    onClick={this.togglePopover}
                                  >
                                    CANCEL
                                  </a>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
