import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DownExcel from "./../../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import { Popover } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import Correct from "./../../../assets/Images/correct.png";
import Select from "react-select";
import StoreTaskStatus from "./../../StoreTaskStatus";
import DatePickerComponenet from "./../Ticketing/DatePickerComponent";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import ScheduleDateDropDown from "./../../ScheduleDateDropDown";
import { Checkbox } from "antd";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import moment from "moment";
import ClaimStatus from "../../../routes/ClaimStatus";

class StoreReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      taskCreateDate: "",
      claimCreateDate: "",
      tabIndex: 1,
      taskStatusList: StoreTaskStatus(),
      taskStatus: [],
      taskIdTitle: "",
      taskLinkedTicketId: "",
      claimLinkedTicketId: "",
      taskClaimId: "",
      linkedTaskId: "",
      claimClaimId: "",
      taskWithTickets: "no",
      claimWithTickets: "no",
      taskWithClaim: "no",
      claimWithTask: "no",
      taskCreatedBy: "0",
      campaignAssignedTo: "0",
      claimCreatedBy: "0",
      taskAssignedTo: "0",
      claimAssignedTo: "0",
      departmentShow: false,
      functionShow: false,
      priorityShow: false,
      claimStatusShow: false,
      claimCategoryShow: false,
      claimSubCategoryShow: false,
      claimIssueTypeShow: false,
      campaignNameShow: false,
      campaignStatusShow: false,
      departmentName: [],
      functionName: [],
      priorityName: [],
      claimStatusName: ClaimStatus(),
      // [
      //   { campaignNameID: 7, campaignName: "Claim Status 1" },
      //   { campaignNameID: 8, campaignName: "Claim Status 2" },
      // ],
      claimCategoryName: [],
      claimSubCategoryName: [],
      claimIssueTypeName: [],
      campaignName: [],
      campaignStatusName: [
        { campaignNameID: 17, campaignName: "Campaign Status 1" },
        { campaignNameID: 18, campaignName: "Campaign Status 2" },
      ],
      userData: [],
      selectedTeamMember: [],
      departmentOvrlayShow: false,
      functionOvrlayShow: false,
      priorityOvrlayShow: false,
      claimStatusOvrlayShow: false,
      claimCategoryOvrlayShow: false,
      claimSubCategoryOvrlayShow: false,
      claimIssueTypeOvrlayShow: false,
      campaignNameOvrlayShow: false,
      campaignStatusOvrlayShow: false,
      indiDepartment: "",
      indiFunction: "",
      indiPriority: "",
      indiClaimStatus: "",
      indiClaimCategory: "",
      indiClaimSubCategory: "",
      indiClaimIssueType: "",
      indiCampaignName: "",
      indiCampaignStatus: "",
      campaignEndDateFrom: "",
      campaignEndDateTo: "",
      totalResult: 0,
      storeReportData: [],
      ScheduleOption: ScheduleDateDropDown(),
      IsDaily: false,
      IsWeekly: false,
      IsDailyForMonth: false,
      IsDailyForYear: false,
      IsWeeklyForMonth: false,
      IsWeeklyForYear: false,
      selectedNoOfWeek: 0,
      selectedWeeklyDays: "",
      Mon: "",
      Tue: "",
      Wed: "",
      Thu: "",
      Fri: "",
      Sat: "",
      Sun: "",
      selectedNoOfDaysForMonth: 0,
      selectedNoOfMonthForMonth: 0,
      selectedNoOfMonthForWeek: 0,
      selectedNoOfWeekForWeek: 0,
      selectedNoOfDayForDailyYear: 0,
      selectedNoOfWeekForYear: 0,
      selectedNameOfMonthForDailyYear: "",
      selectScheduleDate: "",
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNameOfMonthForDailyYear: [],
      selectedReportName: "",
      ReportParams: {},
      Schedule_ID: 0,
      selectedNoOfDay: 0,
      NameOfDayForWeek: [
        {
          days: "Sunday",
        },
        {
          days: "Monday",
        },
      ],
      NameOfMonthForYear: [
        {
          month: "September",
        },
        {
          month: "October",
        },
      ],
      NameOfDayForYear: [
        {
          days: "Sunday",
        },
        {
          days: "Monday",
        },
      ],
      NameOfMonthForDailyYear: [
        {
          month: "September",
        },
        {
          month: "October",
        },
      ],
      reportID: 0,
      selectedTaskStatus: "",
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    // this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
    this.handleOnChangeData = this.handleOnChangeData.bind(this);
    this.handleDepartmentButton = this.handleDepartmentButton.bind(this);
    this.handleFunctionButton = this.handleFunctionButton.bind(this);
    this.handlePriorityButton = this.handlePriorityButton.bind(this);
    this.handleClaimStatusButton = this.handleClaimStatusButton.bind(this);
    this.handleClaimCategoryButton = this.handleClaimCategoryButton.bind(this);
    this.handleClaimSubCategoryButton = this.handleClaimSubCategoryButton.bind(
      this
    );
    this.handleClaimIssueTypeButton = this.handleClaimIssueTypeButton.bind(
      this
    );
    this.handleCampaignNameButton = this.handleCampaignNameButton.bind(this);
    this.handleCampaignStatusButton = this.handleCampaignStatusButton.bind(
      this
    );
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.handleGetDepartment();
    this.handleGetPriority();
    this.handleGetClaimCategory();
    this.handleGetStoreReports();
    this.handleGetUser();
    this.handleGetCampaignName();
  }

  applyCallback = async (startDate, endDate) => {
    debugger;
    var startArr = endDate[0].split("-");
    var dummyStart = startArr[0];
    startArr[0] = startArr[1];
    startArr[1] = dummyStart;
    var start = startArr.join("-");
    var endArr = endDate[1].split("-");
    var dummyEnd = endArr[0];
    endArr[0] = endArr[1];
    endArr[1] = dummyEnd;
    var end = endArr.join("-");
    await this.setState({
      campaignEndDateFrom: start,
      campaignEndDateTo: end,
    });
  };

  setMultiSelectDropdown = (e, action) => {
    debugger;
    this.setState({ [action.name]: e });
  };

  handleOnChangeData(e) {
    debugger;
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDepartmentButton() {
    debugger;
    let slaShowOriginal = this.state.departmentShow;
    let departmentShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.departmentOvrlayShow;
    let departmentOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      departmentShow,
      departmentOvrlayShow,
    });
  }
  selectAllDepartment = async (event) => {
    debugger;
    var indiDepartment = "";
    var checkboxes = document.getElementsByName("allDepartment");
    document.getElementById("departmentNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.departmentName !== null) {
      this.state.departmentName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiDepartment += item.departmentID + ",";
      }
    }
    await this.setState({
      indiDepartment,
    });
    this.handleGetFunction();
  };
  selectNoDepartment = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allDepartment");
    document.getElementById("departmentNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiDepartment: "",
    });
  };
  selectIndividualDepartment = async (issueId, event) => {
    debugger;
    var indiDepartment = this.state.indiDepartment;
    var separator = ",";
    var values = indiDepartment.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiDepartment = values.join(separator);
      }
      await this.setState({
        indiDepartment,
      });
      document.getElementById("departmentNameValue").textContent =
        this.state.indiDepartment.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiDepartment = values.join(separator);
        }
      }
      await this.setState({
        indiDepartment,
      });
      if (this.state.indiDepartment.split(",").length - 1 !== 0) {
        document.getElementById("departmentNameValue").textContent =
          this.state.indiDepartment.split(",").length - 1 + " selected";
      } else {
        document.getElementById("departmentNameValue").textContent = "Select";
      }
    }
    this.handleGetFunction();
  };

  handleClaimIssueTypeButton() {
    debugger;
    let slaShowOriginal = this.state.claimIssueTypeShow;
    let claimIssueTypeShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimIssueTypeOvrlayShow;
    let claimIssueTypeOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimIssueTypeShow,
      claimIssueTypeOvrlayShow,
    });
  }
  selectAllClaimIssueType = async (event) => {
    debugger;
    var indiClaimIssueType = "";
    var checkboxes = document.getElementsByName("allClaimIssueType");
    document.getElementById("claimIssueTypeNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimIssueTypeName !== null) {
      this.state.claimIssueTypeName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimIssueType += item.issueTypeID + ",";
      }
    }
    await this.setState({
      indiClaimIssueType,
    });
  };
  selectNoClaimIssueType = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimIssueType");
    document.getElementById("claimIssueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimIssueType: "",
    });
  };
  selectIndividualClaimIssueType = async (issueId, event) => {
    debugger;
    var indiClaimIssueType = this.state.indiClaimIssueType;
    var separator = ",";
    var values = indiClaimIssueType.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimIssueType = values.join(separator);
      }
      await this.setState({
        indiClaimIssueType,
      });
      document.getElementById("claimIssueTypeNameValue").textContent =
        this.state.indiClaimIssueType.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimIssueType = values.join(separator);
        }
      }
      await this.setState({
        indiClaimIssueType,
      });
      if (this.state.indiClaimIssueType.split(",").length - 1 !== 0) {
        document.getElementById("claimIssueTypeNameValue").textContent =
          this.state.indiClaimIssueType.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimIssueTypeNameValue").textContent =
          "Select";
      }
    }
  };

  handleClaimSubCategoryButton() {
    debugger;
    let slaShowOriginal = this.state.claimSubCategoryShow;
    let claimSubCategoryShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimSubCategoryOvrlayShow;
    let claimSubCategoryOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimSubCategoryShow,
      claimSubCategoryOvrlayShow,
    });
  }
  selectAllClaimSubCategory = async (event) => {
    debugger;
    var indiClaimSubCategory = "";
    var checkboxes = document.getElementsByName("allClaimSubCategory");
    document.getElementById("claimSubCategoryNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimSubCategoryName !== null) {
      this.state.claimSubCategoryName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimSubCategory += item.subCategoryID + ",";
      }
    }
    await this.setState({
      indiClaimSubCategory,
    });

    this.handleGetClaimIssueType();
  };
  selectNoClaimSubCategory = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimSubCategory");
    document.getElementById("claimSubCategoryNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimSubCategory: "",
    });
  };
  selectIndividualClaimSubCategory = async (issueId, event) => {
    debugger;
    var indiClaimSubCategory = this.state.indiClaimSubCategory;
    var separator = ",";
    var values = indiClaimSubCategory.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimSubCategory = values.join(separator);
      }
      await this.setState({
        indiClaimSubCategory,
      });
      document.getElementById("claimSubCategoryNameValue").textContent =
        this.state.indiClaimSubCategory.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimSubCategory = values.join(separator);
        }
      }
      await this.setState({
        indiClaimSubCategory,
      });
      if (this.state.indiClaimSubCategory.split(",").length - 1 !== 0) {
        document.getElementById("claimSubCategoryNameValue").textContent =
          this.state.indiClaimSubCategory.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimSubCategoryNameValue").textContent =
          "Select";
      }
    }

    this.handleGetClaimIssueType();
  };

  handleClaimCategoryButton() {
    debugger;
    let slaShowOriginal = this.state.claimCategoryShow;
    let claimCategoryShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimCategoryOvrlayShow;
    let claimCategoryOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimCategoryShow,
      claimCategoryOvrlayShow,
    });
  }
  selectAllClaimCategory = async (event) => {
    debugger;
    var indiClaimCategory = "";
    var checkboxes = document.getElementsByName("allClaimCategory");
    document.getElementById("claimCategoryNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimCategoryName !== null) {
      this.state.claimCategoryName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimCategory += item.categoryID + ",";
      }
    }
    await this.setState({
      indiClaimCategory,
    });
  };
  selectNoClaimCategory = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimCategory");
    document.getElementById("claimCategoryNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimCategory: "",
    });
  };
  selectIndividualClaimCategory = async (issueId, event) => {
    debugger;
    var indiClaimCategory = this.state.indiClaimCategory;
    var separator = ",";
    var values = indiClaimCategory.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimCategory = values.join(separator);
      }
      await this.setState({
        indiClaimCategory,
      });
      document.getElementById("claimCategoryNameValue").textContent =
        this.state.indiClaimCategory.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimCategory = values.join(separator);
        }
      }
      await this.setState({
        indiClaimCategory,
      });
      if (this.state.indiClaimCategory.split(",").length - 1 !== 0) {
        document.getElementById("claimCategoryNameValue").textContent =
          this.state.indiClaimCategory.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimCategoryNameValue").textContent =
          "Select";
      }
    }
    this.handleGetClaimSubCategory();
  };

  handleClaimStatusButton() {
    debugger;
    let slaShowOriginal = this.state.claimStatusShow;
    let claimStatusShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimStatusOvrlayShow;
    let claimStatusOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimStatusShow,
      claimStatusOvrlayShow,
    });
  }
  selectAllClaimStatus = async (event) => {
    debugger;
    var indiClaimStatus = "";
    var checkboxes = document.getElementsByName("allClaimStatus");
    document.getElementById("claimStatusNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimStatusName !== null) {
      this.state.claimStatusName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimStatus += item.claimStatusID + ",";
      }
    }
    await this.setState({
      indiClaimStatus,
    });
  };
  selectNoClaimStatus = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimStatus");
    document.getElementById("claimStatusNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimStatus: "",
    });
  };
  selectIndividualClaimStatus = async (issueId, event) => {
    debugger;
    var indiClaimStatus = this.state.indiClaimStatus;
    var separator = ",";
    var values = indiClaimStatus.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimStatus = values.join(separator);
      }
      await this.setState({
        indiClaimStatus,
      });
      document.getElementById("claimStatusNameValue").textContent =
        this.state.indiClaimStatus.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimStatus = values.join(separator);
        }
      }
      await this.setState({
        indiClaimStatus,
      });
      if (this.state.indiClaimStatus.split(",").length - 1 !== 0) {
        document.getElementById("claimStatusNameValue").textContent =
          this.state.indiClaimStatus.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimStatusNameValue").textContent = "Select";
      }
    }
  };

  handlePriorityButton() {
    debugger;
    let slaShowOriginal = this.state.priorityShow;
    let priorityShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.priorityOvrlayShow;
    let priorityOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      priorityShow,
      priorityOvrlayShow,
    });
  }
  selectAllPriority = async (event) => {
    debugger;
    var indiPriority = "";
    var checkboxes = document.getElementsByName("allPriority");
    document.getElementById("priorityNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.priorityName !== null) {
      this.state.priorityName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiPriority += item.priorityID + ",";
      }
    }
    await this.setState({
      indiPriority,
    });
  };
  selectNoPriority = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allPriority");
    document.getElementById("priorityNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiPriority: "",
    });
  };
  selectIndividualPriority = async (issueId, event) => {
    debugger;
    var indiPriority = this.state.indiPriority;
    var separator = ",";
    var values = indiPriority.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiPriority = values.join(separator);
      }
      await this.setState({
        indiPriority,
      });
      document.getElementById("priorityNameValue").textContent =
        this.state.indiPriority.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiPriority = values.join(separator);
        }
      }
      await this.setState({
        indiPriority,
      });
      if (this.state.indiPriority.split(",").length - 1 !== 0) {
        document.getElementById("priorityNameValue").textContent =
          this.state.indiPriority.split(",").length - 1 + " selected";
      } else {
        document.getElementById("priorityNameValue").textContent = "Select";
      }
    }
  };

  handleCampaignNameButton() {
    debugger;
    let slaShowOriginal = this.state.campaignNameShow;
    let campaignNameShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignNameOvrlayShow;
    let campaignNameOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignNameShow,
      campaignNameOvrlayShow,
    });
  }
  selectAllCampaignName = async (event) => {
    debugger;
    var indiCampaignName = "";
    var checkboxes = document.getElementsByName("allCampaignName");
    document.getElementById("campaignNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.campaignName !== null) {
      this.state.campaignName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiCampaignName += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiCampaignName,
    });
  };
  selectNoCampaignName = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allCampaignName");
    document.getElementById("campaignNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiCampaignName: "",
    });
  };
  selectIndividualCampaignName = async (issueId, event) => {
    debugger;
    var indiCampaignName = this.state.indiCampaignName;
    var separator = ",";
    var values = indiCampaignName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiCampaignName = values.join(separator);
      }
      await this.setState({
        indiCampaignName,
      });
      document.getElementById("campaignNameValue").textContent =
        this.state.indiCampaignName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiCampaignName = values.join(separator);
        }
      }
      await this.setState({
        indiCampaignName,
      });
      if (this.state.indiCampaignName.split(",").length - 1 !== 0) {
        document.getElementById("campaignNameValue").textContent =
          this.state.indiCampaignName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("campaignNameValue").textContent = "Select";
      }
    }
  };

  handleFunctionButton() {
    debugger;
    let slaShowOriginal = this.state.functionShow;
    let functionShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.functionOvrlayShow;
    let functionOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      functionShow,
      functionOvrlayShow,
    });
  }
  selectAllFunction = async (event) => {
    debugger;
    var indiFunction = "";
    var checkboxes = document.getElementsByName("allFunction");
    document.getElementById("functionNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.functionName !== null) {
      this.state.functionName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiFunction += item.functionID + ",";
      }
    }
    await this.setState({
      indiFunction,
    });
  };
  selectNoFunction = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allFunction");
    document.getElementById("functionNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiFunction: "",
    });
  };
  selectIndividualFunction = async (issueId, event) => {
    debugger;
    var indiFunction = this.state.indiFunction;
    var separator = ",";
    var values = indiFunction.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiFunction = values.join(separator);
      }
      await this.setState({
        indiFunction,
      });
      document.getElementById("functionNameValue").textContent =
        this.state.indiFunction.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiFunction = values.join(separator);
        }
      }
      await this.setState({
        indiFunction,
      });
      if (this.state.indiFunction.split(",").length - 1 !== 0) {
        document.getElementById("functionNameValue").textContent =
          this.state.indiFunction.split(",").length - 1 + " selected";
      } else {
        document.getElementById("functionNameValue").textContent = "Select";
      }
    }
  };

  handleCampaignStatusButton() {
    debugger;
    let slaShowOriginal = this.state.campaignStatusShow;
    let campaignStatusShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignStatusOvrlayShow;
    let campaignStatusOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignStatusShow,
      campaignStatusOvrlayShow,
    });
  }
  selectAllCampaignStatus = async (event) => {
    debugger;
    var indiCampaignStatus = "";
    var checkboxes = document.getElementsByName("allCampaignStatus");
    document.getElementById("campaignStatusNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.campaignStatusName !== null) {
      this.state.campaignStatusName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiCampaignStatus += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiCampaignStatus,
    });
  };
  selectNoCampaignStatus = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allCampaignStatus");
    document.getElementById("campaignStatusNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiCampaignStatus: "",
    });
  };
  selectIndividualCampaignStatus = async (issueId, event) => {
    debugger;
    var indiCampaignStatus = this.state.indiCampaignStatus;
    var separator = ",";
    var values = indiCampaignStatus.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiCampaignStatus = values.join(separator);
      }
      await this.setState({
        indiCampaignStatus,
      });
      document.getElementById("campaignStatusNameValue").textContent =
        this.state.indiCampaignStatus.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiCampaignStatus = values.join(separator);
        }
      }
      await this.setState({
        indiCampaignStatus,
      });
      if (this.state.indiCampaignStatus.split(",").length - 1 !== 0) {
        document.getElementById("campaignStatusNameValue").textContent =
          this.state.indiCampaignStatus.split(",").length - 1 + " selected";
      } else {
        document.getElementById("campaignStatusNameValue").textContent =
          "Select";
      }
    }
  };

  handleAddReportOpen() {
    this.setState({ AddReportPopup: true });
  }
  handleAddReportClose() {
    this.setState({ AddReportPopup: false });
  }
  handleNextPopupOpen(activeTabId) {
    //this.handleAddReportClose();
    this.handleGetStoreReportSearch(activeTabId);
    this.setState({ NextPopup: true });
  }
  handleNextPopupClose() {
    this.setState({ NextPopup: false });
    this.handleGetStoreReports();
  }
  handleReportCreateDate(name, date) {
    debugger;
    this.setState({ [name]: date });
  }
  handleChangeTab(index) {
    this.setState({
      tabIndex: index,
    });
  }

  handleGetDepartment() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ departmentName: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetFunction() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url:
        config.apiUrl +
        "/StoreDepartment/getFunctionNameByMultipleDepartmentIds",
      params: { DepartmentIds: this.state.indiDepartment },
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ functionName: responseData });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }

  handleGetPriority() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ priorityName: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetClaimCategory() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimCategory",
      params: { BrandIds: "" },
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ claimCategoryName: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetClaimSubCategory() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimSubCategory",
      params: { CategoryIDs: this.state.indiClaimCategory },
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ claimSubCategoryName: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetClaimIssueType() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimIssueType",
      params: { subCategoryIDs: this.state.indiClaimSubCategory },
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ claimIssueTypeName: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetUser() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ userData: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetStoreReportSearch(activeTabId) {
    debugger;
    let self = this;
    var taskStatus = "";
    var paramData = {};
    for (var a = 0; a < this.state.taskStatus.length; a++) {
      this.state.selectedTaskStatus +=
        this.state.taskStatus[a].taskStatusID + ",";
    }
    if (activeTabId === 1) {
      paramData = {
        ActiveTabId: activeTabId,
        TaskTitle: this.state.taskIdTitle,
        TaskStatus: this.state.selectedTaskStatus,
        IsTaskWithTicket: this.state.taskWithTickets === "no" ? false : true,
        TaskTicketID: this.state.taskLinkedTicketId,
        DepartmentIds: this.state.indiDepartment,
        FunctionIds: this.state.indiFunction,
        PriorityIds: this.state.indiPriority,
        IsTaskWithClaim: this.state.taskWithClaim === "no" ? false : true,
        TaskClaimID: this.state.taskClaimId,
        TaskCreatedDate:
          this.state.taskCreateDate === ""
            ? null
            : moment(this.state.taskCreateDate).format("YYYY-MM-DD"),
        TaskCreatedBy: this.state.taskCreatedBy,
        TaskAssignedId: this.state.taskAssignedTo,
      };
    }
    if (activeTabId === 2) {
      paramData = {
        ActiveTabId: activeTabId,
        ClaimID:
          this.state.claimClaimId === ""
            ? 0
            : parseInt(this.state.claimClaimId),
        ClaimStatus: this.state.indiClaimStatus,
        IsClaimWithTicket: false,
        ClaimTicketID:
          this.state.claimLinkedTicketId === ""
            ? 0
            : parseInt(this.state.claimLinkedTicketId),
        ClaimCategoryIds: this.state.indiClaimCategory,
        ClaimSubCategoryIds: this.state.indiClaimSubCategory,
        ClaimIssuetypeIds: this.state.indiClaimIssueType,
        IsClaimWithTask: this.state.claimWithTask === "no" ? false : true,
        ClaimTaskID:
          this.state.linkedTaskId === ""
            ? 0
            : parseInt(this.state.linkedTaskId),
        ClaimCreatedDate:
          this.state.claimCreateDate === ""
            ? null
            : moment(this.state.claimCreateDate).format("YYYY-MM-DD"),
        ClaimCreatedBy: this.state.claimCreatedBy,
        ClaimAssignedId: this.state.claimAssignedTo,
      };
    }
    if (activeTabId === 3) {
      paramData = {
        ActiveTabId: activeTabId,
        CampaignName: this.state.indiCampaignName,
        CampaignAssignedIds: this.state.campaignAssignedTo,
        CampaignStartDate:
          this.state.campaignEndDateFrom === ""
            ? null
            : moment(this.state.campaignEndDateFrom).format("YYYY-MM-DD"),
        CampaignEndDate:
          this.state.campaignEndDateTo === ""
            ? null
            : moment(this.state.campaignEndDateTo).format("YYYY-MM-DD"),
        CampaignStatusids: this.state.indiCampaignStatus,
      };
    }
    this.setState({ ReportParams: paramData });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreReport/StoreReportSearch",
      data: paramData,
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        if (message === "Success") {
          self.setState({ totalResult: response.data.responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetStoreReports() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreReport/GetStoreReports",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ storeReportData: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  ScheduleOpenModel = () => {
    debugger;
    if (this.state.selectedReportName == "") {
      NotificationManager.error("Please enter report name");
    } else {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreReport/CheckIfReportNameExists",
        headers: authHeader(),
        params: {
          ReportID: this.state.reportID,
          ReportName: self.state.selectedReportName,
        },
      }).then(function(res) {
        debugger;
        if (res.data.message === "Record Already Exists ") {
          NotificationManager.error("Report name aleady exists.");
          return;
        }
        if (self.state.selectedTeamMemberCommaSeperated) {
          var tData = self.state.selectedTeamMemberCommaSeperated.split(",");
          var selectedTeamMember = self.state.selectedTeamMember;
          for (let j = 0; j < tData.length; j++) {
            var data = self.state.userData.filter((x) => x.userID == tData[j]);
            selectedTeamMember.push(data[0]);
          }
          self.setState({ Schedule: true, selectedTeamMember });
          setTimeout(() => {
            for (let j = 0; j < self.state.dayIdsArray.length - 1; j++) {
              document.getElementById(self.state.dayIdsArray[j]).click();
            }
          }, 100);
        } else {
          self.setState({ Schedule: true, selectedTeamMember: [] });
        }
      });
    }
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false, selectedTeamMember: [] });
  };

  handleScheduleDateChange = (e) => {
    debugger;
    let SelectData = e.currentTarget.value;
    if (SelectData === "230") {
      this.setState({
        IsDaily: true,
        IsWeekly: false,
        IsDailyForMonth: false,
        IsDailyForYear: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfWeek: 0,
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
      });
    } else if (SelectData === "231") {
      this.setState({
        IsWeekly: true,
        IsDaily: false,
        selectedNoOfDay: 0,
        IsDailyForMonth: false,
        IsDailyForYear: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
      });
    } else if (SelectData === "232") {
      this.setState({
        IsDailyForMonth: true,
        IsDaily: false,
        IsDailyForYear: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
      });
    } else if (SelectData === "233") {
      this.setState({
        IsWeeklyForMonth: true,
        IsDaily: false,
        IsDailyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        IsDailyForYear: false,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: "",
      });
    } else if (SelectData === "234") {
      this.setState({
        IsDailyForYear: true,
        IsDaily: false,
        IsDailyForMonth: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
      });
    } else if (SelectData === "235") {
      this.setState({
        IsWeeklyForYear: true,
        IsDaily: false,
        IsDailyForMonth: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        IsWeeklyForMonth: false,
        IsDailyForYear: false,
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
      });
    }
    this.setState({
      selectScheduleDate: SelectData,
    });
  };

  handleWeekly = (e) => {
    debugger;
    this.setState({
      selectedNoOfWeek: e.target.value,
    });
    // this.setState({
    //   selectedNoOfWeek: e.currentTarget.value
    // });
  };

  handleWeeklyDays = async (e) => {
    debugger;
    let check = e.target.checked;
    let val = e.target.value;
    let finalWeekList = "";
    if (val === "Mon") {
      if (check === true) {
        await this.setState({
          Mon: val,
        });
      } else {
        await this.setState({
          Mon: "",
        });
      }
    } else if (val === "Tue") {
      if (check === true) {
        await this.setState({
          Tue: val,
        });
      } else {
        await this.setState({
          Tue: "",
        });
      }
    } else if (val === "Wed") {
      if (check === true) {
        await this.setState({
          Wed: val,
        });
      } else {
        await this.setState({
          Wed: "",
        });
      }
    } else if (val === "Thu") {
      if (check === true) {
        await this.setState({
          Thu: val,
        });
      } else {
        await this.setState({
          Thu: "",
        });
      }
    } else if (val === "Fri") {
      if (check === true) {
        await this.setState({
          Fri: val,
        });
      } else {
        await this.setState({
          Fri: "",
        });
      }
    } else if (val === "Sat") {
      if (check === true) {
        await this.setState({
          Sat: val,
        });
      } else {
        await this.setState({
          Sat: "",
        });
      }
    } else if (val === "Sun") {
      if (check === true) {
        await this.setState({
          Sun: val,
        });
      } else {
        await this.setState({
          Sun: "",
        });
      }
    }
    if (!(this.state.Mon === "")) {
      finalWeekList += this.state.Mon + ",";
    }
    if (!(this.state.Tue === "")) {
      finalWeekList += this.state.Tue + ",";
    }
    if (!(this.state.Wed === "")) {
      finalWeekList += this.state.Wed + ",";
    }
    if (!(this.state.Thu === "")) {
      finalWeekList += this.state.Thu + ",";
    }
    if (!(this.state.Fri === "")) {
      finalWeekList += this.state.Fri + ",";
    }
    if (!(this.state.Sat === "")) {
      finalWeekList += this.state.Sat + ",";
    }
    if (!(this.state.Sun === "")) {
      finalWeekList += this.state.Sun + ",";
    }
    this.setState({
      selectedWeeklyDays: finalWeekList,
    });
  };

  handleDaysForMonth = (e) => {
    debugger;
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value,
    });
  };

  handleMonthForMonth = (e) => {
    debugger;
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value,
    });
  };

  handleMonthForWeek = (e) => {
    debugger;
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value,
    });
  };

  handleDayForYear = (e) => {
    debugger;
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value,
    });
  };

  handleWeekForWeek = (e) => {
    debugger;
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value,
    });
  };

  handleWeekForYear = (e) => {
    debugger;
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value,
    });
  };

  setTeamMember = (e) => {
    debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, (s) => s.userID)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };

  handleScheduleTime = (e) => {
    debugger;
    this.setState({
      selectedScheduleTime: e,
    });
  };

  setNameOfDayForWeek = (e) => {
    debugger;
    if (e !== null) {
      var selectedNameOfDayForWeekCommaSeperated = Array.prototype.map
        .call(e, (s) => s.days)
        .toString();
    }
    this.setState({
      selectedNameOfDayForWeek: e,
      selectedNameOfDayForWeekCommaSeperated,
    });
  };

  setNameOfDayForYear = (e) => {
    debugger;
    if (e !== null) {
      var selectedNameOfDayForYearCommaSeperated = Array.prototype.map
        .call(e, (s) => s.days)
        .toString();
    }
    this.setState({
      selectedNameOfDayForYear: e,
      selectedNameOfDayForYearCommaSeperated,
    });
  };

  setNameOfMonthForDailyYear = (e) => {
    debugger;
    if (e !== null) {
      var selectedNameOfMonthForDailyYearCommaSeperated = Array.prototype.map
        .call(e, (s) => s.month)
        .toString();
    }
    this.setState({
      selectedNameOfMonthForDailyYear: e,
      selectedNameOfMonthForDailyYearCommaSeperated,
    });
  };

  handleInsertReport() {
    let self = this;
    var SearchParams = {};

    var month, day, year, hours, minutes, seconds;
    var date = new Date(this.state.selectedScheduleTime),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    this.state.selectedScheduleTime = [mySQLDate, mySQLTime].join(" ");

    SearchParams = JSON.stringify(this.state.ReportParams);
    if (this.state.selectedReportName == "") {
      NotificationManager.error("Please add report name.");
      return;
    }
    debugger;
    if (this.state.selectedTeamMemberCommaSeperated == undefined) {
      NotificationManager.error("Please add team name for schedule.");
      return;
    }
    if (this.state.selectScheduleDate == "") {
      NotificationManager.error("Please select schedule type.");
      return;
    }
    if (this.state.selectedScheduleTime == "") {
      NotificationManager.error("Please select schedule time.");
      return;
    }
    if (SearchParams != "") {
      debugger;
      self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreReport/ScheduleStoreReport",
        headers: authHeader(),
        data: {
          PrimaryScheduleID: this.state.Schedule_ID,
          ReportName: this.state.selectedReportName,
          SearchInputParams: SearchParams,
          ScheduleFor: this.state.selectedTeamMemberCommaSeperated,
          ScheduleType: this.state.selectScheduleDate,
          NoOfDay: this.state.selectedNoOfDay,
          ScheduleTime: this.state.selectedScheduleTime,
          IsDaily: this.state.IsDaily,
          IsWeekly: this.state.IsWeekly,
          NoOfWeek: this.state.selectedNoOfWeek,
          DayIds: this.state.selectedWeeklyDays,
          IsDailyForMonth: this.state.IsDailyForMonth,
          NoOfDaysForMonth: this.state.selectedNoOfDaysForMonth,
          NoOfMonthForMonth: this.state.selectedNoOfMonthForMonth,
          IsWeeklyForMonth: this.state.IsWeeklyForMonth,
          NoOfMonthForWeek: this.state.selectedNoOfMonthForWeek,
          NoOfWeekForWeek: this.state.selectedNoOfWeekForWeek,
          ScheduleFrom: 3,
          NameOfDayForWeek: this.state.selectedNameOfDayForWeekCommaSeperated,
          IsDailyForYear: this.state.IsDailyForYear,
          NoOfDayForDailyYear: this.state.selectedNoOfDayForDailyYear,
          NameOfMonthForDailyYear: this.state
            .selectedNameOfMonthForYearCommaSeperated,
          IsWeeklyForYear: this.state.IsWeeklyForYear,
          NoOfWeekForYear: this.state.selectedNoOfWeekForYear,
          NameOfDayForYear: this.state.selectedNameOfDayForYearCommaSeperated,
          NameOfMonthForYear: this.state
            .selectedNameOfMonthForDailyYearCommaSeperated,
        },
      })
        .then(function(res) {
          debugger;

          let status = res.data.message;
          let scheduleId = res.data.responseData;
          if (status === "Success") {
            self.state.selectedTeamMember = "";
            self.state.selectedTeamMemberCommaSeperated = undefined;
            self.state.selectScheduleDate = "";
            self.state.selectedScheduleTime = "";

            self.ScheduleCloseModel();
            // this.handleReportList();
            self.setState({ Schedule_ID: scheduleId });
            self.setState({ AddReportPopup: false });
            NotificationManager.success("Scheduler created successfully.");
            self.setState({
              selectedScheduleTime: "",
              // selectedTeamMemberCommaSeperated="",
              // selectScheduleDate="",
              // selectedScheduleTime="",
              IsDaily: false,
              IsDailyForMonth: false,
              IsWeekly: false,
              IsWeeklyForMonth: false,
              IsDailyForYear: false,
              IsWeeklyForYear: false,
            });
          } else if (status == "duplicate") {
            self.setState({ Schedule_ID: 0 });
            NotificationManager.error("Report name already exist.");
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please add report for create scheduler.");
    }
  }

  setNameOfMonthForYear = (e) => {
    debugger;
    if (e !== null) {
      var selectedNameOfMonthForYearCommaSeperated = Array.prototype.map
        .call(e, (s) => s.month)
        .toString();
    }
    this.setState({
      selectedNameOfMonthForYear: e,
      selectedNameOfMonthForYearCommaSeperated,
    });
  };

  handleSave() {
    debugger;
    let self = this;
    var SearchParams = {};

    SearchParams = JSON.stringify(this.state.ReportParams);
    if (self.state.selectedReportName == "") {
      NotificationManager.error("Please enter report name");
      return;
    }
    self = this;
    if (this.state.selectScheduleDate == "") {
      self.setState({ selectScheduleDate: 0 });
    }

    axios({
      method: "post",
      url: config.apiUrl + "/StoreReport/CheckIfReportNameExists",
      headers: authHeader(),
      params: {
        ReportID: this.state.reportID,
        ReportName: self.state.selectedReportName,
      },
    })
      .then(function(res) {
        debugger;
        if (res.data.message === "Record Already Exists ") {
          NotificationManager.error("Report name aleady exists.");
          return;
        }
        setTimeout(() => {
          debugger;
          // if (this.state.Schedule_ID > 0) {
          debugger;
          axios({
            method: "post",
            url: config.apiUrl + "/StoreReport/SaveStoreReport",
            headers: authHeader(),
            data: {
              ReportID: self.state.reportID,
              ReportName: self.state.selectedReportName,
              ScheduleID: self.state.Schedule_ID,
              StoreReportSearchParams: SearchParams,
            },
          })
            .then(function(res) {
              debugger;
              // this.handleReportList();
              if (res.data.message === "Success") {
                self.setState({ AddReportPopup: false });
                self.setState({ Schedule_ID: 0 });
                // self.handleGetStoreReports();
                self.handleNextPopupClose();
                NotificationManager.success(
                  "Report saved successfully for download."
                );
              } else {
                NotificationManager.error("Report not saved.");
              }
            })
            .catch((data) => {
              console.log(data);
            });
          // } else {
          //   axios({
          //     method: "post",
          //     url: config.apiUrl + "/StoreReport/ScheduleStoreReport",
          //     headers: authHeader(),
          //     data: {
          //       PrimaryScheduleID: this.state.Schedule_ID,
          //       ReportName: this.state.selectedReportName,
          //       SearchInputParams: SearchParams,
          //       ScheduleFor: this.state.selectedTeamMemberCommaSeperated,
          //       ScheduleType: this.state.selectScheduleDate,
          //       NoOfDay: this.state.selectedNoOfDay,
          //       ScheduleTime: this.state.selectedScheduleTime,
          //       IsDaily: this.state.IsDaily,
          //       IsWeekly: this.state.IsWeekly,
          //       NoOfWeek: this.state.selectedNoOfWeek,
          //       DayIds: this.state.selectedWeeklyDays,
          //       IsDailyForMonth: this.state.IsDailyForMonth,
          //       NoOfDaysForMonth: this.state.selectedNoOfDaysForMonth,
          //       NoOfMonthForMonth: this.state.selectedNoOfMonthForMonth,
          //       IsWeeklyForMonth: this.state.IsWeeklyForMonth,
          //       NoOfMonthForWeek: this.state.selectedNoOfMonthForWeek,
          //       NoOfWeekForWeek: this.state.selectedNoOfWeekForWeek,
          //       ScheduleFrom: 4,
          //       NameOfDayForWeek: this.state.selectedNameOfDayForWeekCommaSeperated,
          //       IsDailyForYear: this.state.IsDailyForYear,
          //       NoOfDayForDailyYear: this.state.selectedNoOfDayForDailyYear,
          //       NameOfMonthForDailyYear: this.state
          //         .selectedNameOfMonthForYearCommaSeperated,
          //       IsWeeklyForYear: this.state.IsWeeklyForYear,
          //       NoOfWeekForYear: this.state.selectedNoOfWeekForYear,
          //       NameOfDayForYear: this.state.selectedNameOfDayForYearCommaSeperated,
          //       NameOfMonthForYear: this.state
          //         .selectedNameOfMonthForDailyYearCommaSeperated,
          //     },
          //   })
          //     .then(function(res) {
          //       debugger;

          //       let status = res.data.message;
          //       let scheduleId = res.data.responseData;
          //       if (status === "Success") {
          //         self.state.selectedTeamMember = "";
          //         self.state.selectedTeamMemberCommaSeperated = undefined;
          //         self.state.selectScheduleDate = "";
          //         self.state.selectedScheduleTime = "";

          //         self.ScheduleCloseModel();
          //         // this.handleReportList();
          //         self.handleGetStoreReports();
          //         self.setState({ Schedule_ID: scheduleId });
          //         self.setState({ AddReportPopup: false });
          //         NotificationManager.success("Report saved successfully.");
          //         self.setState({
          //           ReportParams: {},
          //           selectedScheduleTime: "",
          //           // selectedTeamMemberCommaSeperated="",
          //           // selectScheduleDate="",
          //           // selectedScheduleTime="",
          //           IsDaily: false,
          //           IsDailyForMonth: false,
          //           IsWeekly: false,
          //           IsWeeklyForMonth: false,
          //           IsDailyForYear: false,
          //           IsWeeklyForYear: false,
          //           NextPopup: false,
          //         });
          //       } else if (status == "duplicate") {
          //         self.setState({ Schedule_ID: 0 });
          //         NotificationManager.error("Report name already exist.");
          //       }
          //     })
          //     .catch((data) => {
          //       console.log(data);
          //     });
          // }
        }, 10);
      })
      .catch((data) => {
        console.log(data);
      });

    // else{
    //   NotificationManager.error("Please create scheduler");
    // }
  }

  handleEditReport = (rowData) => {
    debugger;
    let allTab = JSON.parse(rowData.reportSearchParams);
    this.setState({ Schedule_ID: rowData.scheduleID });
    let withClaim = 0;
    let withTask = 0;
    // allTab=objEdit;
    this.state.Schedule_ID = rowData.scheduleID;
    this.state.tabIndex = allTab["ActiveTabId"];
    this.state.taskIdTitle = allTab["TaskTitle"];
    this.state.taskLinkedTicketId = allTab["TaskTicketID"];
    this.state.taskAssignedTo = allTab["TaskAssignedId"];
    this.state.taskCreatedBy = allTab["TaskCreatedBy"];
    this.state.taskWithTickets =
      allTab["IsTaskWithTicket"] === true ? "yes" : "no";
    this.state.taskWithClaim =
      allTab["IsTaskWithClaim"] === true ? "yes" : "no";
    this.state.taskClaimId = allTab["TaskClaimID"];
    this.state.indiDepartment = allTab["DepartmentIds"];
    this.state.indiFunction = allTab["FunctionIds"];
    this.state.indiPriority = allTab["PriorityIds"];
    if (allTab["TaskStatus"]) {
      var tData = allTab["TaskStatus"].split(",");
      var taskStatusCommaSeperated = [];
      for (let j = 0; j < tData.length - 1; j++) {
        var data = this.state.taskStatusList.filter(
          (x) => x.taskStatusID == tData[j]
        );
        taskStatusCommaSeperated.push(data[0]);
      }
      this.setState({ taskStatus: taskStatusCommaSeperated });
    }

    this.state.claimClaimId = allTab["ClaimID"];
    this.state.linkedTaskId = allTab["ClaimTaskID"];
    this.state.claimLinkedTicketId = allTab["ClaimTicketID"];
    this.state.claimAssignedTo = allTab["ClaimAssignedId"];
    this.state.claimCreatedBy = allTab["ClaimCreatedBy"];
    this.state.claimWithTickets =
      allTab["IsClaimWithTicket"] === true ? "yes" : "no";
    this.state.claimWithTask =
      allTab["IsClaimWithTask"] === true ? "yes" : "no";
    this.state.indiClaimCategory = allTab["ClaimCategoryIds"];
    this.state.indiClaimSubCategory = allTab["ClaimSubCategoryIds"];
    this.state.indiClaimIssueType = allTab["ClaimIssuetypeIds"];
    this.state.indiClaimStatus = allTab["ClaimStatus"];
    // this.setState({ claimCreateDate: allTab["ClaimCreatedDate"] });

    this.state.indiCampaignName = allTab["CampaignName"];
    this.state.indiCampaignStatus = allTab["CampaignStatusids"];
    this.state.campaignAssignedTo = allTab["CampaignAssignedIds"];
    this.state.campaignEndDateFrom = allTab["CampaignStartDate"];
    this.state.campaignEndDateTo = allTab["CampaignEndDate"];

    this.state.selectedReportName = rowData.reportName;
    this.state.reportID = rowData.reportID;

    // //////////////////Scheduler/////////////////////////
    this.state.IsDaily = rowData.isDaily;
    this.state.IsWeekly = rowData.isWeekly;
    this.state.IsDailyForMonth = rowData.isDailyForMonth;
    this.state.IsWeeklyForMonth = rowData.isWeeklyForMonth;
    this.state.IsDailyForYear = rowData.isDailyForYear;
    this.state.IsWeeklyForYear = rowData.isWeeklyForYear;
    this.state.selectScheduleDate = rowData.scheduleType;
    this.state.selectedTeamMemberCommaSeperated = rowData.scheduleFor;
    this.state.selectedNoOfDay = rowData.noOfDay;
    var responseTime = rowData.scheduleTime;
    var splittedResponseTime = responseTime.split("T");
    var date = splittedResponseTime[0];
    var splittedDate = date.split("-");
    var time = splittedResponseTime[1];
    var splittedTime = time.split(":");
    var finalTime = new Date(
      splittedDate[0],
      splittedDate[1] - 1,
      splittedDate[2],
      splittedTime[0],
      splittedTime[1],
      splittedTime[2]
    );

    this.state.selectedScheduleTime = finalTime;
    // this.state.selectedScheduleTime=rowData.scheduleTime;
    this.state.selectedNoOfWeek = rowData.noOfWeek;
    this.state.selectedWeeklyDays = rowData.selectedWeeklyDays;
    var dayIds = rowData.dayIds;
    var splittedDayIds = dayIds.split(",");
    this.setState({
      dayIdsArray: splittedDayIds,
    });
    for (let i = 0; i < splittedDayIds.length; i++) {
      var ele = splittedDayIds[i];
      if (ele === "Mon") {
        this.setState({
          Mon: ele,
        });
      } else if (ele === "Tue") {
        this.setState({
          Tue: ele,
        });
      } else if (ele === "Wed") {
        this.setState({
          Wed: ele,
        });
      } else if (ele === "Thu") {
        this.setState({
          Thu: ele,
        });
      } else if (ele === "Fri") {
        this.setState({
          Fri: ele,
        });
      } else if (ele === "Sat") {
        this.setState({
          Sat: ele,
        });
      } else if (ele === "Sun") {
        this.setState({
          Sun: ele,
        });
      }
    }
    this.setState({
      selectedNoOfDaysForMonth: rowData.noOfDaysForMonth,
      selectedNoOfMonthForMonth: rowData.noOfMonthForMonth,
      selectedNoOfMonthForWeek: rowData.noOfMonthForWeek,
      selectedNoOfWeekForWeek: rowData.noOfWeekForWeek,
    });
    var dayForWeek = rowData.nameOfDayForWeek.split(",");
    var selectedNameOfDayForWeek = [];
    for (let j = 0; j < dayForWeek.length; j++) {
      var data = this.state.NameOfDayForWeek.filter(
        (x) => x.days == dayForWeek[j]
      );
      selectedNameOfDayForWeek.push(data[0]);
    }
    this.setState({
      selectedNameOfDayForWeek: selectedNameOfDayForWeek,
    });
    var dayForYear = rowData.nameOfMonthForDailyYear.split(",");
    var selectedNameOfMonthForYear = [];
    for (let j = 0; j < dayForYear.length; j++) {
      var data = this.state.NameOfMonthForYear.filter(
        (x) => x.month == dayForYear[j]
      );
      selectedNameOfMonthForYear.push(data[0]);
    }
    this.setState({
      selectedNameOfMonthForYear: selectedNameOfMonthForYear,
      selectedNoOfDayForDailyYear: rowData.noOfDayForDailyYear,
    });
    var dayForYear = rowData.nameOfDayForYear.split(",");
    var selectedNameOfDayForYear = [];
    for (let j = 0; j < dayForYear.length; j++) {
      var data = this.state.NameOfDayForYear.filter(
        (x) => x.days == dayForYear[j]
      );
      selectedNameOfDayForYear.push(data[0]);
    }
    var monthForDailyYear = rowData.nameOfMonthForYear.split(",");
    var selectedNameOfMonthForDailyYear = [];
    for (let j = 0; j < monthForDailyYear.length; j++) {
      var data = this.state.NameOfMonthForDailyYear.filter(
        (x) => x.month == monthForDailyYear[j]
      );
      selectedNameOfMonthForDailyYear.push(data[0]);
    }
    this.setState({
      selectedNameOfDayForYear: selectedNameOfDayForYear,
      selectedNameOfMonthForDailyYear: selectedNameOfMonthForDailyYear,
      selectedNoOfWeekForYear: rowData.noOfWeekForYear,
    });

    ///////////////////////////////////////////////////
    this.handleGetFunction();
    this.handleGetClaimSubCategory();
    this.handleGetClaimIssueType();
    this.handleAddReportOpen();
    if (this.state.tabIndex === 1) {
      setTimeout(() => {
        if (this.state.indiDepartment.split(",").length - 1 !== 0) {
          document.getElementById("departmentNameValue").textContent =
            this.state.indiDepartment.split(",").length - 1 + " selected";
        } else {
          document.getElementById("departmentNameValue").textContent = "Select";
        }
        if (this.state.indiFunction.split(",").length - 1 !== 0) {
          document.getElementById("functionNameValue").textContent =
            this.state.indiFunction.split(",").length - 1 + " selected";
        } else {
          document.getElementById("functionNameValue").textContent = "Select";
        }
        if (this.state.indiPriority.split(",").length - 1 !== 0) {
          document.getElementById("priorityNameValue").textContent =
            this.state.indiPriority.split(",").length - 1 + " selected";
        } else {
          document.getElementById("priorityNameValue").textContent = "Select";
        }
      }, 100);
    } else if (this.state.tabIndex === 2) {
      setTimeout(() => {
        if (this.state.indiClaimCategory.split(",").length - 1 !== 0) {
          document.getElementById("claimCategoryNameValue").textContent =
            this.state.indiClaimCategory.split(",").length - 1 + " selected";
        } else {
          document.getElementById("claimCategoryNameValue").textContent =
            "Select";
        }
        if (this.state.indiClaimSubCategory.split(",").length - 1 !== 0) {
          document.getElementById("claimSubCategoryNameValue").textContent =
            this.state.indiClaimSubCategory.split(",").length - 1 + " selected";
        } else {
          document.getElementById("claimSubCategoryNameValue").textContent =
            "Select";
        }
        if (this.state.indiClaimIssueType.split(",").length - 1 !== 0) {
          document.getElementById("claimIssueTypeNameValue").textContent =
            this.state.indiClaimIssueType.split(",").length - 1 + " selected";
        } else {
          document.getElementById("claimIssueTypeNameValue").textContent =
            "Select";
        }
        if (this.state.indiClaimStatus.split(",").length - 1 !== 0) {
          document.getElementById("claimStatusNameValue").textContent =
            this.state.indiClaimStatus.split(",").length - 1 + " selected";
        } else {
          document.getElementById("claimStatusNameValue").textContent =
            "Select";
        }
      }, 100);
    }
  };

  handleDeleteStoreReports(reportID) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreReport/DeleteStoreReport",
      params: { ReportID: reportID },
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData > 0) {
          self.handleGetStoreReports();
          NotificationManager.success("Report deleted successfully.");
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleGetCampaignName() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreReport/GetCampaignNames",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ campaignName: responseData });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleDownload = (id) => {
    debugger;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreReport/DownloadStoreReport",
      headers: authHeader(),
      params: {
        SchedulerID: id,
      },
    })
      .then(function(res) {
        debugger;
        window.open(res.data.responseData);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  render() {
    const datareport = this.state.storeReportData;

    const columnsreport = [
      {
        Header: (
          <span>
            Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "reportName",
      },
      {
        Header: (
          <span>
            Schedule Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "scheduleStatus",
      },
      {
        Header: (
          <span>
            Created by
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdBy",
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                {row.original["createdBy"]}
                <Popover
                  content={
                    <>
                      <div>
                        <b>
                          <p className="title">
                            Created By: {row.original["createdBy"]}
                          </p>
                        </b>
                        <p className="sub-title">
                          Created Date: {row.original["createdDate"]}
                        </p>
                      </div>
                      <div>
                        <b>
                          <p className="title">
                            Updated By: {row.original["modifiedBy"]}
                          </p>
                        </b>
                        <p className="sub-title">
                          Updated Date: {row.original["modifiedDate"]}
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
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "reportStatus",
      },
      {
        Header: <span>Actions</span>,
        accessor: "actionReport",
        Cell: (row) => (
          <span>
            <img
              src={DownExcel}
              alt="download icon"
              className="downloadaction"
              onClick={this.handleDownload.bind(this, row.original.scheduleID)}
            />
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
                      <button
                        className="butn"
                        onClick={this.handleDeleteStoreReports.bind(
                          this,
                          row.original["reportID"]
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
              <img src={RedDeleteIcon} alt="del-icon" className="del-btn" />
            </Popover>
            <button
              className="react-tabel-button editre"
              id="p-edit-pop-2"
              onClick={this.handleEditReport.bind(this, row.original)}
            >
              EDIT
            </button>
          </span>
        ),
      },
    ];
    const ActionDelete = (
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
            <button
              className="butn"
              onClick={this.handleDeleteStoreReports.bind(this)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
    const popoverData = (
      <>
        <div>
          <b>
            <p className="title">Created By: Admin</p>
          </b>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: Manager</p>
          </b>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </>
    );

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Reports
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtnReport"
                onClick={this.handleAddReportOpen}
              >
                + Add
              </button>
            </div>
          </div>
          <Modal
            open={this.state.AddReportPopup}
            onClose={this.handleAddReportClose}
            closeIconId="sdsg"
            modalId="addStorereport-modal"
            // overlayId="logout-ovrly"
          >
            <div
              id="overlayDepartment"
              className={this.state.departmentOvrlayShow ? "show" : ""}
              onClick={this.handleDepartmentButton}
            />
            <div
              id="overlayFunction"
              className={this.state.functionOvrlayShow ? "show" : ""}
              onClick={this.handleFunctionButton}
            />
            <div
              id="overlayPriority"
              className={this.state.priorityOvrlayShow ? "show" : ""}
              onClick={this.handlePriorityButton}
            />
            <div
              id="overlayClaimStatus"
              className={this.state.claimStatusOvrlayShow ? "show" : ""}
              onClick={this.handleClaimStatusButton}
            />
            <div
              id="overlayClaimCategory"
              className={this.state.claimCategoryOvrlayShow ? "show" : ""}
              onClick={this.handleClaimCategoryButton}
            />
            <div
              id="overlayClaimSubCategory"
              className={this.state.claimSubCategoryOvrlayShow ? "show" : ""}
              onClick={this.handleClaimSubCategoryButton}
            />
            <div
              id="overlayClaimIssueType"
              className={this.state.claimIssueTypeOvrlayShow ? "show" : ""}
              onClick={this.handleClaimIssueTypeButton}
            />
            <div
              id="overlayCampaignName"
              className={this.state.campaignNameOvrlayShow ? "show" : ""}
              onClick={this.handleCampaignNameButton}
            />
            <div
              id="overlayCampaignStatus"
              className={this.state.campaignStatusOvrlayShow ? "show" : ""}
              onClick={this.handleCampaignStatusButton}
            />
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li
                  className="nav-item"
                  onClick={this.handleChangeTab.bind(this, 1)}
                >
                  <a
                    className={`nav-link ${this.state.tabIndex === 1 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#task-tab"
                    role="tab"
                    aria-controls="task-tab"
                    aria-selected="false"
                    style={{ pointerEvents: "none" }}
                  >
                    Task
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={this.handleChangeTab.bind(this, 2)}
                >
                  <a
                    className={`nav-link ${this.state.tabIndex === 2 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#claim-tab"
                    role="tab"
                    aria-controls="claim-tab"
                    aria-selected="false"
                    style={{ pointerEvents: "none" }}
                  >
                    Claim
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={this.handleChangeTab.bind(this, 3)}
                >
                  <a
                    className={`nav-link ${this.state.tabIndex === 3 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#campaign-tab"
                    role="tab"
                    aria-controls="campaign-tab"
                    aria-selected="false"
                    style={{ pointerEvents: "none" }}
                  >
                    Campaign
                  </a>
                </li>
              </ul>
              <img
                src={CancelImg}
                alt="CancelImg"
                className="cancelImg-alert"
                onClick={this.handleAddReportClose.bind(this)}
              />
            </div>
            <div className="tab-content store-report-add">
              <div
                className={`tab-pane fade ${this.state.tabIndex === 1 &&
                  "show active"}`}
                id="task-tab"
                role="tabpanel"
                aria-labelledby="task-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task ID/ Title</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Task ID/ Title"
                        maxLength={11}
                        name="taskIdTitle"
                        value={this.state.taskIdTitle}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Department</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="departmentNameValue"
                          onClick={this.handleDepartmentButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.departmentShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllDepartment.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoDepartment.bind(this)}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.departmentName !== null &&
                                  this.state.departmentName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"d" + item.departmentID}
                                        name="allDepartment"
                                        onChange={this.selectIndividualDepartment.bind(
                                          this,
                                          item.departmentID
                                        )}
                                        // checked={
                                        //   this.state.indiDepartment !==
                                        //   undefined
                                        //     ? this.state.indiDepartment.includes(
                                        //         item.departmentID
                                        //       )
                                        //     : false
                                        // }
                                        checked={
                                          this.state.indiDepartment !==
                                          undefined
                                            ? this.state.indiDepartment
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.departmentID.toString()
                                                )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"d" + item.departmentID}>
                                        {item.departmentName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Task Creation On</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.taskCreateDate}
                          value={this.state.taskCreateDate}
                          onChange={this.handleReportCreateDate.bind(
                            this,
                            "taskCreateDate"
                          )}
                          placeholderText="Creation Date"
                          showMonthDropdown
                          showYearDropdown
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task Status</label>
                      <div className="normal-dropdown">
                        <Select
                          getOptionLabel={(option) => option.taskStatusName}
                          getOptionValue={(option) => option.taskStatusID}
                          options={this.state.taskStatusList}
                          closeMenuOnSelect={false}
                          onChange={this.setMultiSelectDropdown.bind(this)}
                          value={this.state.taskStatus}
                          name="taskStatus"
                          placeholder="Select"
                          isMulti
                        />
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Function</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="functionNameValue"
                          onClick={this.handleFunctionButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.functionShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllFunction.bind(this)}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoFunction.bind(this)}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.functionName !== null &&
                                  this.state.functionName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"f" + item.functionID}
                                        name="allFunction"
                                        onChange={this.selectIndividualFunction.bind(
                                          this,
                                          item.functionID
                                        )}
                                        // checked={
                                        //   this.state.indiFunction !== undefined
                                        //     ? this.state.indiFunction.includes(
                                        //         item.functionID
                                        //       )
                                        //     : false
                                        // }
                                        checked={
                                          this.state.indiFunction !== undefined
                                            ? this.state.indiFunction
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.functionID.toString()
                                                )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"f" + item.functionID}>
                                        {item.funcationName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Created by</label>
                      <select
                        name="taskCreatedBy"
                        value={this.state.taskCreatedBy}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.userData.length > 0 && (
                          <option value="0">All</option>
                        )}
                        {this.state.userData !== null &&
                          this.state.userData.map((item, i) => (
                            <option value={item.userID}>{item.userName}</option>
                          ))}
                        {/* <option value="1">Aman</option>
                        <option value="2">Arjun</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Ticket ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Linked Ticket ID"
                        maxLength={11}
                        name="taskLinkedTicketId"
                        value={this.state.taskLinkedTicketId}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Priority</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="priorityNameValue"
                          onClick={this.handlePriorityButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.priorityShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllPriority.bind(this)}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoPriority.bind(this)}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.priorityName !== null &&
                                  this.state.priorityName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"p" + item.priorityID}
                                        name="allPriority"
                                        onChange={this.selectIndividualPriority.bind(
                                          this,
                                          item.priorityID
                                        )}
                                        // checked={
                                        //   this.state.indiPriority !== undefined
                                        //     ? this.state.indiPriority.includes(
                                        //         item.priorityID
                                        //       )
                                        //     : false
                                        // }
                                        checked={
                                          this.state.indiPriority !== undefined
                                            ? this.state.indiPriority
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.priorityID.toString()
                                                )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"p" + item.priorityID}>
                                        {item.priortyName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Assigned To</label>
                      <select
                        name="taskAssignedTo"
                        value={this.state.taskAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.userData.length > 0 && (
                          <option value="0">All</option>
                        )}
                        {this.state.userData !== null &&
                          this.state.userData.map((item, i) => (
                            <option value={item.userID}>{item.userName}</option>
                          ))}
                        {/* <option value="1">Aman</option>
                        <option value="2">Arjun</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task With Tickets</label>
                      <select
                        name="taskWithTickets"
                        value={this.state.taskWithTickets}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Task With Claim</label>
                      <select
                        name="taskWithClaim"
                        value={this.state.taskWithClaim}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="taskClaimId"
                        value={this.state.taskClaimId}
                        placeholder="Enter Claim ID"
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen.bind(this, 1)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 2 &&
                  "show active"}`}
                id="claim-tab"
                role="tabpanel"
                aria-labelledby="claim-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="claimClaimId"
                        value={this.state.claimClaimId}
                        placeholder="Enter Claim ID"
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Category</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimCategoryNameValue"
                          onClick={this.handleClaimCategoryButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimCategoryShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimCategory.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimCategory.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimCategoryName !== null &&
                                  this.state.claimCategoryName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"cc" + item.categoryID}
                                          name="allClaimCategory"
                                          onChange={this.selectIndividualClaimCategory.bind(
                                            this,
                                            item.categoryID
                                          )}
                                          // checked={
                                          //   this.state.indiClaimCategory !==
                                          //   undefined
                                          //     ? this.state.indiClaimCategory.includes(
                                          //         item.categoryID
                                          //       )
                                          //     : false
                                          // }
                                          checked={
                                            this.state.indiClaimCategory !==
                                            undefined
                                              ? this.state.indiClaimCategory
                                                  .split(",")
                                                  .find(
                                                    (num) =>
                                                      num ==
                                                      item.categoryID.toString()
                                                  )
                                              : false
                                          }
                                        />
                                        <label htmlFor={"cc" + item.categoryID}>
                                          {item.categoryName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Creation On</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.claimCreateDate}
                          value={this.state.claimCreateDate}
                          onChange={this.handleReportCreateDate.bind(
                            this,
                            "claimCreateDate"
                          )}
                          placeholderText="Creation Date"
                          showMonthDropdown
                          showYearDropdown
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Status</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimStatusNameValue"
                          onClick={this.handleClaimStatusButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimStatusShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimStatus.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimStatus.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimStatusName !== null &&
                                  this.state.claimStatusName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"cs" + item.claimStatusID}
                                        name="allClaimStatus"
                                        onChange={this.selectIndividualClaimStatus.bind(
                                          this,
                                          item.claimStatusID
                                        )}
                                        // checked={
                                        //   this.state.indiClaimStatus !==
                                        //   undefined
                                        //     ? this.state.indiClaimStatus.includes(
                                        //         item.claimStatusID
                                        //       )
                                        //     : false
                                        // }
                                        checked={
                                          this.state.indiClaimStatus !==
                                          undefined
                                            ? this.state.indiClaimStatus
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.claimStatusID.toString()
                                                )
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor={"cs" + item.claimStatusID}
                                      >
                                        {item.claimStatusName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Sub Category</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimSubCategoryNameValue"
                          onClick={this.handleClaimSubCategoryButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimSubCategoryShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimSubCategory.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimSubCategory.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimSubCategoryName !== null &&
                                  this.state.claimSubCategoryName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"csc" + item.subCategoryID}
                                          name="allClaimSubCategory"
                                          onChange={this.selectIndividualClaimSubCategory.bind(
                                            this,
                                            item.subCategoryID
                                          )}
                                          // checked={
                                          //   this.state.indiClaimSubCategory !==
                                          //   undefined
                                          //     ? this.state.indiClaimSubCategory.includes(
                                          //         item.subCategoryID
                                          //       )
                                          //     : false
                                          // }
                                          checked={
                                            this.state.indiClaimSubCategory !==
                                            undefined
                                              ? this.state.indiClaimSubCategory
                                                  .split(",")
                                                  .find(
                                                    (num) =>
                                                      num ==
                                                      item.subCategoryID.toString()
                                                  )
                                              : false
                                          }
                                        />
                                        <label
                                          htmlFor={"csc" + item.subCategoryID}
                                        >
                                          {item.subCategoryName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Created by</label>
                      <select
                        name="claimCreatedBy"
                        value={this.state.claimCreatedBy}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.userData.length > 0 && (
                          <option value="0">All</option>
                        )}
                        {this.state.userData !== null &&
                          this.state.userData.map((item, i) => (
                            <option value={item.userID}>{item.userName}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Ticket ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Linked Ticket ID"
                        maxLength={11}
                        name="claimLinkedTicketId"
                        value={this.state.claimLinkedTicketId}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Issue Type</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimIssueTypeNameValue"
                          onClick={this.handleClaimIssueTypeButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimIssueTypeShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimIssueType.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimIssueType.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimIssueTypeName !== null &&
                                  this.state.claimIssueTypeName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"cit" + item.issueTypeID}
                                          name="allClaimIssueType"
                                          onChange={this.selectIndividualClaimIssueType.bind(
                                            this,
                                            item.issueTypeID
                                          )}
                                          // checked={
                                          //   this.state.indiClaimIssueType !==
                                          //   undefined
                                          //     ? this.state.indiClaimIssueType.includes(
                                          //         item.issueTypeID
                                          //       )
                                          //     : false
                                          // }
                                          checked={
                                            this.state.indiClaimIssueType !==
                                            undefined
                                              ? this.state.indiClaimIssueType
                                                  .split(",")
                                                  .find(
                                                    (num) =>
                                                      num ==
                                                      item.issueTypeID.toString()
                                                  )
                                              : false
                                          }
                                        />
                                        <label
                                          htmlFor={"cit" + item.issueTypeID}
                                        >
                                          {item.issueTypeName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Assigned To</label>
                      <select
                        name="claimAssignedTo"
                        value={this.state.claimAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.userData.length > 0 && (
                          <option value="0">All</option>
                        )}
                        {this.state.userData !== null &&
                          this.state.userData.map((item, i) => (
                            <option value={item.userID}>{item.userName}</option>
                          ))}
                        {/* <option value="1">Aman</option>
                        <option value="2">Arjun</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim With Tickets</label>
                      <select
                        name="claimWithTickets"
                        value={this.state.claimWithTickets}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim With Task</label>
                      <select
                        name="claimWithTask"
                        value={this.state.claimWithTask}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Task ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="linkedTaskId"
                        value={this.state.linkedTaskId}
                        placeholder="Enter Linked Task ID"
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        // onClick={this.handleNextPopupOpen}
                        onClick={this.handleNextPopupOpen.bind(this, 2)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 3 &&
                  "show active"}`}
                id="campaign-tab"
                role="tabpanel"
                aria-labelledby="campaign-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Name</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="campaignNameValue"
                          onClick={this.handleCampaignNameButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.campaignNameShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllCampaignName.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoCampaignName.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.campaignName !== null &&
                                  this.state.campaignName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"camp" + item.campaignNameID}
                                        name="allCampaignName"
                                        onChange={this.selectIndividualCampaignName.bind(
                                          this,
                                          item.campaignNameID
                                        )}
                                        // checked={
                                        //   this.state.indiCampaignName !==
                                        //   undefined
                                        //     ? this.state.indiCampaignName.includes(
                                        //         item.campaignNameID
                                        //       )
                                        //     : false
                                        // }
                                        checked={
                                          this.state.indiCampaignName !==
                                          undefined
                                            ? this.state.indiCampaignName
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.campaignNameID.toString()
                                                )
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor={"camp" + item.campaignNameID}
                                      >
                                        {item.campaignName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Assigned To</label>
                      <select
                        name="campaignAssignedTo"
                        value={this.state.campaignAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.userData.length > 0 && (
                          <option value="0">All</option>
                        )}
                        {this.state.userData !== null &&
                          this.state.userData.map((item, i) => (
                            <option value={item.userID}>{item.userName}</option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className=" ticketstrReport">
                        <label>Campaign End Date</label>
                      </div>
                      <div className="ticketreportdat campaign-end-date">
                        <DatePickerComponenet
                          applyCallback={this.applyCallback}
                        />
                      </div>
                      {/* <input className="no-bg" type="text" /> */}
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Status</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="campaignStatusNameValue"
                          onClick={this.handleCampaignStatusButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.campaignStatusShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllCampaignStatus.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoCampaignStatus.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.campaignStatusName !== null &&
                                  this.state.campaignStatusName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"cmpsta" + item.campaignNameID}
                                          name="allCampaignStatus"
                                          onChange={this.selectIndividualCampaignStatus.bind(
                                            this,
                                            item.campaignNameID
                                          )}
                                          // checked={
                                          //   this.state.indiCampaignStatus !==
                                          //   undefined
                                          //     ? this.state.indiCampaignStatus.includes(
                                          //         item.campaignNameID
                                          //       )
                                          //     : false
                                          // }
                                          checked={
                                            this.state.indiCampaignStatus !==
                                            undefined
                                              ? this.state.indiCampaignStatus
                                                  .split(",")
                                                  .find(
                                                    (num) =>
                                                      num ==
                                                      item.campaignNameID.toString()
                                                  )
                                              : false
                                          }
                                        />
                                        <label
                                          htmlFor={
                                            "cmpsta" + item.campaignNameID
                                          }
                                        >
                                          {item.campaignName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen.bind(this, 3)}
                        // onClick={this.handleChangeTab.bind(this,2)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            open={this.state.NextPopup}
            onClose={this.handleNextPopupClose}
            closeIconId="sdsg"
            modalId="nextbuttonpopup"
            // overlayId="logout-ovrly"
          >
            <div className="container contpaddre">
              <div className="setting-tabs entercenter">
                <label className="reportdetail">Enter Report Details</label>
                <img
                  src={CancelImg}
                  alt="CancelImg"
                  className="cancelnextpopup"
                  onClick={this.handleNextPopupClose.bind(this)}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="store-totalresultcircle">
                    <label className="totalresult">Total Result</label>
                    <span className="totalresultnumber">
                      {this.state.totalResult}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 rname">
                  <div className="ranmetext">
                    <label className="renametext">Report Name</label>
                    <input
                      className="no-bg"
                      type="text"
                      placeholder="Report Name"
                      maxLength={25}
                      name="selectedReportName"
                      value={this.state.selectedReportName}
                      onChange={this.handleOnChangeData}
                    />
                  </div>
                  <div className="buttonschdulesave">
                    <button
                      className="Schedulenext"
                      onClick={this.ScheduleOpenModel}
                    >
                      SCHEDULE
                    </button>
                  </div>
                  <div className="buttonschdulesave1">
                    <button className="Schedulenext1" onClick={this.handleSave}>
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            onClose={this.ScheduleCloseModel}
            open={this.state.Schedule}
            modalId="ScheduleModel"
            classNames={{
              modal: "schedule-width",
            }}
            overlayId="logout-ovrly"
          >
            <div>
              <label>
                <b>Schedule date to</b>
              </label>
              <div>
                <div className="normal-dropdown dropdown-setting1 schedule-multi">
                  <Select
                    getOptionLabel={(option) => option.userName}
                    getOptionValue={
                      (option) => option.userID //id
                    }
                    options={this.state.userData}
                    placeholder="Team Member"
                    // menuIsOpen={true}
                    closeMenuOnSelect={false}
                    onChange={this.setTeamMember.bind(this)}
                    value={this.state.selectedTeamMember}
                    // showNewOptionAtTop={false}
                    isMulti
                  />
                </div>
                <select
                  id="inputState"
                  className="form-control dropdown-setting1 ScheduleDate-to"
                  value={this.state.selectScheduleDate}
                  onChange={this.handleScheduleDateChange}
                >
                  {this.state.ScheduleOption !== null &&
                    this.state.ScheduleOption.map((item, i) => (
                      <option key={i} value={item.scheduleID}>
                        {item.scheduleName}
                      </option>
                    ))}
                </select>
                {this.state.selectScheduleDate === "230" ||
                this.state.selectScheduleDate === 230 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <label className="every1">Every</label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        name="selectedNoOfDay"
                        value={this.state.selectedNoOfDay}
                        onChange={this.handleOnChangeData}
                      />
                      <label className="every1">Day</label>
                    </span>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "231" ||
                this.state.selectScheduleDate === 231 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <label className="every1">Every</label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        value={this.state.selectedNoOfWeek}
                        onChange={this.handleWeekly}
                      />
                      <label className="every1">Week on</label>
                    </span>
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Mon"
                        id="Mon"
                      >
                        Mon
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Tue"
                        id="Tue"
                      >
                        Tue
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Wed"
                        id="Wed"
                      >
                        Wed
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Thu"
                        id="Thu"
                      >
                        Thu
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Fri"
                        id="Fri"
                      >
                        Fri
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Sat"
                        id="Sat"
                      >
                        Sat
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Sun"
                        id="Sun"
                      >
                        Sun
                      </Checkbox>
                    </div>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "232" ||
                this.state.selectScheduleDate === 232 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <label className="every1">Day</label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="9"
                        value={this.state.selectedNoOfDaysForMonth}
                        onChange={this.handleDaysForMonth}
                      />
                      <label className="every1">of every</label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        value={this.state.selectedNoOfMonthForMonth}
                        onChange={this.handleMonthForMonth}
                      />
                      <label className="every1">months</label>
                    </span>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "233" ||
                this.state.selectScheduleDate === 233 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <label className="every1">Every</label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        onChange={this.handleMonthForWeek}
                        value={this.state.selectedNoOfMonthForWeek}
                      />
                      <label className="every1">month on the</label>
                    </span>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <select
                          id="inputState"
                          className="form-control dropdown-setting1"
                          onChange={this.handleWeekForWeek}
                          value={this.state.selectedNoOfWeekForWeek}
                        >
                          <option value="0">Select</option>
                          <option value="2">Second</option>
                          <option value="4">Four</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                          <Select
                            getOptionLabel={(option) => option.days}
                            getOptionValue={
                              (option) => option.days //id
                            }
                            options={this.state.NameOfDayForWeek}
                            placeholder="Select"
                            // menuIsOpen={true}
                            closeMenuOnSelect={false}
                            onChange={this.setNameOfDayForWeek.bind(this)}
                            value={this.state.selectedNameOfDayForWeek}
                            // showNewOptionAtTop={false}
                            isMulti
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "234" ||
                this.state.selectScheduleDate === 234 ? (
                  <div className="ScheduleDate-to">
                    <div className="row m-0">
                      <label
                        className="every1"
                        style={{
                          lineHeight: "40px",
                        }}
                      >
                        on
                      </label>
                      <div className="col-md-7">
                        <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                          <Select
                            getOptionLabel={(option) => option.month}
                            getOptionValue={
                              (option) => option.month //id
                            }
                            options={this.state.NameOfMonthForYear}
                            placeholder="Select"
                            // menuIsOpen={true}
                            closeMenuOnSelect={false}
                            onChange={this.setNameOfMonthForYear.bind(this)}
                            value={this.state.selectedNameOfMonthForYear}
                            // showNewOptionAtTop={false}
                            isMulti
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        value={this.state.selectedNoOfDayForDailyYear}
                        onChange={this.handleDayForYear}
                      />
                    </div>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "235" ||
                this.state.selectScheduleDate === 235 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <div className="row m-0">
                        <label
                          className="every1"
                          style={{
                            lineHeight: "40px",
                          }}
                        >
                          on the
                        </label>
                        <div className="col-md-7">
                          <select
                            id="inputState"
                            className="form-control dropdown-setting1"
                            onChange={this.handleWeekForYear}
                            value={this.state.selectedNoOfWeekForYear}
                          >
                            <option value="0">Select</option>
                            <option value="2">Second</option>
                            <option value="4">Four</option>
                          </select>
                        </div>
                      </div>
                    </span>
                    <div className="row mt-3">
                      <div className="col-md-5">
                        <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                          <Select
                            getOptionLabel={(option) => option.days}
                            getOptionValue={
                              (option) => option.days //id
                            }
                            options={this.state.NameOfDayForYear}
                            placeholder="Select"
                            // menuIsOpen={true}
                            closeMenuOnSelect={false}
                            onChange={this.setNameOfDayForYear.bind(this)}
                            value={this.state.selectedNameOfDayForYear}
                            // showNewOptionAtTop={false}
                            isMulti
                          />
                        </div>
                      </div>
                      <label
                        className="every1"
                        style={{
                          lineHeight: "40px",
                          marginLeft: "14px",
                        }}
                      >
                        to
                      </label>
                      <div className="col-md-5">
                        <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                          <Select
                            getOptionLabel={(option) => option.month}
                            getOptionValue={
                              (option) => option.month //id
                            }
                            options={this.state.NameOfMonthForDailyYear}
                            placeholder="Select"
                            // menuIsOpen={true}
                            closeMenuOnSelect={false}
                            onChange={this.setNameOfMonthForDailyYear.bind(
                              this
                            )}
                            value={this.state.selectedNameOfMonthForDailyYear}
                            // showNewOptionAtTop={false}
                            isMulti
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* <input
                                      type="text"
                                      className="txt-1 txt1Place txt1Time"
                                      placeholder="11AM"
                                      onChange={this.handleScheduleTime}
                                    /> */}
                <div className="dash-timepicker">
                  <DatePicker
                    selected={this.state.selectedScheduleTime}
                    onChange={this.handleScheduleTime.bind(this)}
                    placeholderText="11 AM"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Select Time"
                    dateFormat="h:mm aa"
                    className="txt-1 txt1Place txt1Time"
                    value={this.state.selectedScheduleTime}
                  />
                </div>

                <div>
                  <button
                    className="scheduleBtn"
                    onClick={this.handleInsertReport.bind(this)}
                  >
                    <label className="addLable">SCHEDULE</label>
                  </button>
                </div>
                <div onClick={this.ScheduleCloseModel}>
                  <button type="button" className="scheduleBtncancel">
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          {/* </div> */}
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr reactreport setting-table-des">
            <div style={{ backgroundColor: "#fff" }}>
              <ReactTable
                data={datareport}
                columns={columnsreport}
                // resizable={false}
                minRows={1}
                defaultPageSize={5}
                showPagination={true}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreReports;
