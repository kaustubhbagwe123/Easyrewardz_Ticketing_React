import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
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
// import DatePickerComponenet from "./../Ticketing/DatePickerComponent";
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
import matchSorter from "match-sorter";
import Sorting from "./../../../assets/Images/sorting.png";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
import { DatePicker as DatePicker1 } from "antd";
import { async } from "rxjs/internal/scheduler/async";
const { RangePicker } = DatePicker1;

function disabledDate(current) {
  // Can not select days after today and today
  return current && current >= moment().startOf("day");
}

class StoreReports extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let end = moment(start).add(30, "days");
    let loginstart = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30+1, "days");
    let loginend = moment(start).add(30-1, "days");
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      taskCreateDate: "",
      claimCreateDate: "",
      tabIndex: 3,
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
        { campaignNameID: 221, campaignName: "Closed" },
        { campaignNameID: 223, campaignName: "Open" },
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
      selectedReportNameHolder: "",
      ReportParams: {},
      Schedule_ID: 0,
      selectedNoOfDay: 0,
      selectedNameOfDayForYear: [],
      selectedScheduleTime: "",
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
      reportIDHolder: 0,
      selectedTaskStatus: "",
      edit: false,
      sortAllData: [],
      sortName: [],
      sortSchedule: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortColumn: "",
      sortHeader: "",
      StatusModel: false,
      tempReportData: [],
      sortFilterName: [],
      sortFilterSchedule: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      sreportNameFilterCheckbox: "",
      sscheduleStatusFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sreportStatusFilterCheckbox: "",
      isortA: false,
      translateLanguage: {},
      regionZoneData: [],
      campaignRegion: "0",
      campaignZone: "0",
      CampaignUserData: [],
      start: start,
      end: end,
      loginDateFrom: "",
      loginDateTo: "",
      loginUsers: "0",
      loginStart: loginstart,
      loginEnd: loginend

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
    this.handleClearTabData = this.handleClearTabData.bind(this);
    this.handleClearScheduleData = this.handleClearScheduleData.bind(this);
  }

  componentDidMount() {
    this.handleGetDepartment();
    this.handleGetPriority();
    this.handleGetClaimCategory();
    this.handleGetStoreReports();
    this.handleGetUser();
    this.handleGetCampaignName();
    this.handleGetRegion();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
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
      loginDateFrom: start,
      loginDateTo: end,
      start: endDate[0],
      end: endDate[1],
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

  handleClearTabData() {
    debugger;
    setTimeout(() => {
      this.selectNoDepartment();
      this.selectNoFunction();
      this.selectNoPriority();
      this.selectNoClaimStatus();
      this.selectNoClaimCategory();
      this.selectNoClaimSubCategory();
      this.selectNoClaimIssueType();
      this.selectNoCampaignName();
      this.selectNoCampaignStatus();
    }, 1);

    this.setState({
      tabIndex: 3,
      taskIdTitle: "",
      taskStatus: [],
      taskLinkedTicketId: "",
      taskWithTickets: "no",
      taskWithClaim: "no",
      taskCreateDate: "",
      taskCreatedBy: "0",
      taskAssignedTo: "0",
      taskClaimId: "",
      claimClaimId: "",
      claimLinkedTicketId: "",
      claimWithTickets: "no",
      claimWithTask: "no",
      claimCreateDate: "",
      claimCreatedBy: "0",
      claimAssignedTo: "0",
      linkedTaskId: "",
      campaignAssignedTo: "0",
      campaignEndDateFrom: "",
      campaignEndDateTo: "",
      loginUsers: "0",
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
      selectedReportNameHolder: "",
      ReportParams: {},
      Schedule_ID: 0,
      selectedNoOfDay: 0,
      selectedNameOfDayForYear: [],
      selectedScheduleTime: "",
      reportID: 0,
    });
  }

  handleClearScheduleData() {
    debugger;
    this.setState({
      selectedTeamMember: [],
      selectScheduleDate: "",
      selectedNoOfDay: 0,
      selectedNoOfWeek: 0,
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
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNoOfDayForDailyYear: 0,
      selectedNoOfWeekForYear: 0,
      selectedNameOfMonthForDailyYear: "",
      selectedNameOfDayForYear: [],
      selectedScheduleTime: "",
      selectedTeamMemberCommaSeperated: "",
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
    this.handleClearTabData();
    this.handleClearScheduleData();
  }
  handleAddReportClose() {
    this.setState({ AddReportPopup: false, edit: false });
    // this.handleClearTabData();
  }
  handleNextPopupOpen(activeTabId) {
    debugger;
    //this.handleAddReportClose();
    this.handleGetStoreReportSearch(activeTabId);
    this.setState({ NextPopup: true });
    if (this.state.edit) {
      let selectedReportName = this.state.selectedReportNameHolder;
      let reportID = this.state.reportIDHolder;
      this.setState({
        selectedReportName,
        reportID,
      });
    }
  }
  handleNextPopupClose() {
    this.setState({ NextPopup: false, selectedReportName: "" });
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

  handleGetCampaignUser(RegionID, ZoneID) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreReportUser",
      params: {
        RegionID: RegionID,
        ZoneID: ZoneID,
      },
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({ CampaignUserData: responseData });
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
    this.setState({ selectedTaskStatus: "" });
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
        IsClaimWithTicket: this.state.claimWithTickets === "no" ? false : true,
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
            ? moment(this.state.start).format("YYYY-MM-DD")
            : moment(this.state.campaignEndDateFrom).format("YYYY-MM-DD"),
        CampaignEndDate:
          this.state.campaignEndDateTo === ""
            ? moment(this.state.end).format("YYYY-MM-DD")
            : moment(this.state.campaignEndDateTo).format("YYYY-MM-DD"),
        CampaignStatusids: this.state.indiCampaignStatus,
        CampaignRegion: this.state.campaignRegion,
        CampaignZone: this.state.campaignZone,
      };
    }
    if (activeTabId === 4) {
      paramData = {
        ActiveTabId: activeTabId,
        UserIDs: this.state.loginUsers,
        Startdate:
          this.state.loginDateFrom === ""
            ? moment(this.state.loginStart).format("YYYY-MM-DD")
            : moment(this.state.loginDateFrom).format("YYYY-MM-DD"),
        Enddate:
          this.state.loginDateTo === ""
            ? moment(this.state.loginEnd).format("YYYY-MM-DD")
            : moment(this.state.loginDateTo).format("YYYY-MM-DD")
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
        if (message === "Success" || message === "Record Not Found") {
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
        var data = response.data.responseData;
        if (message === "Success" && data.length > 0) {
          self.setState({ storeReportData: data });
          if (data !== null) {
            var unique = [];
            var distinct = [];
            var sortName = [];
            var sortFilterName = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].reportName]) {
                distinct.push(data[i].reportName);
                unique[data[i].reportName] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                sortName.push({ reportName: distinct[i] });
                sortFilterName.push({
                  reportName: distinct[i],
                });
              }
            }

            var unique = [];
            var distinct = [];
            var sortSchedule = [];
            var sortFilterSchedule = [];

            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].scheduleStatus]) {
                distinct.push(data[i].scheduleStatus);
                unique[data[i].scheduleStatus] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                sortSchedule.push({ scheduleStatus: distinct[i] });
                sortFilterSchedule.push({
                  scheduleStatus: distinct[i],
                });
              }
            }

            var unique = [];
            var distinct = [];
            var sortCreatedBy = [];
            var sortFilterCreatedBy = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].createdBy]) {
                distinct.push(data[i].createdBy);
                unique[data[i].createdBy] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                sortCreatedBy.push({ createdBy: distinct[i] });
                sortFilterCreatedBy.push({ createdBy: distinct[i] });
              }
            }

            var unique = [];
            var distinct = [];
            var sortStatus = [];
            var sortFilterStatus = [];

            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].reportStatus]) {
                distinct.push(data[i].reportStatus);
                unique[data[i].reportStatus] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                sortStatus.push({ reportStatus: distinct[i] });
                sortFilterStatus.push({ reportStatus: distinct[i] });
              }
            }
            self.setState({
              sortAllData: data,
              sortFilterName,
              sortFilterCreatedBy,
              sortFilterSchedule,
              sortFilterStatus,
              sortName,
              sortCreatedBy,
              sortSchedule,
              sortStatus,
            });
          }
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
          ScheuleID: 0,
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
    if (!this.state.edit) {
      this.handleClearScheduleData();
    }
  };

  handleScheduleDateChange(e) {
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
    // this.setState({
    this.state.selectScheduleDate = SelectData;
    // });
  }

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

    SearchParams = JSON.stringify(this.state.ReportParams);
    debugger;
    if (
      SearchParams != "" &&
      this.state.selectedReportName !== "" &&
      this.state.selectScheduleDate !== "" &&
      this.state.selectedScheduleTime !== ""
    ) {
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
      if (this.state.selectedReportName == "") {
        NotificationManager.error("Please add report name.");
        return false;
      }
      if (
        this.state.selectedTeamMemberCommaSeperated == undefined &&
        this.state.selectedTeamMemberCommaSeperated != ""
      ) {
        NotificationManager.error("Please add team name for schedule.");
      }
      if (this.state.selectScheduleDate == "") {
        NotificationManager.error("Please select schedule type.");
      }
      if (this.state.selectedScheduleTime == "") {
        NotificationManager.error("Please select schedule time.");
      }
      if (SearchParams === "") {
        NotificationManager.error("Please add report for create scheduler.");
      }
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
        ScheuleID: this.state.Schedule_ID,
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

  handleEditReport = async (rowData) => {
    debugger;
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let end = moment(start).add(30, "days");
    this.setState({ edit: true });
    this.handleAddReportOpen();
    debugger;
    await setTimeout(async () => {
      let allTab = JSON.parse(rowData.reportSearchParams);
      this.setState({ Schedule_ID: rowData.scheduleID });
      this.setState({
        tabIndex: allTab["ActiveTabId"],
        taskIdTitle: allTab["TaskTitle"],
        taskLinkedTicketId: allTab["TaskTicketID"],
        taskAssignedTo: allTab["TaskAssignedId"],
        taskCreatedBy: allTab["TaskCreatedBy"],
        taskCreateDate: allTab["TaskCreatedDate"]
          ? new Date(allTab["TaskCreatedDate"])
          : "",
        taskWithTickets: allTab["IsTaskWithTicket"] === true ? "yes" : "no",
        taskWithClaim: allTab["IsTaskWithClaim"] === true ? "yes" : "no",
        taskClaimId: allTab["TaskClaimID"],
        indiDepartment: allTab["DepartmentIds"],
        indiFunction: allTab["FunctionIds"],
        indiPriority: allTab["PriorityIds"],
        claimClaimId: allTab["ClaimID"],
        linkedTaskId: allTab["ClaimTaskID"],
        claimLinkedTicketId: allTab["ClaimTicketID"],
        claimCreateDate: allTab["ClaimCreatedDate"]
          ? new Date(allTab["ClaimCreatedDate"])
          : "",
        claimAssignedTo: allTab["ClaimAssignedId"],
        claimCreatedBy: allTab["ClaimCreatedBy"],
        claimWithTickets: allTab["IsClaimWithTicket"] === true ? "yes" : "no",
        claimWithTask: allTab["IsClaimWithTask"] === true ? "yes" : "no",
        indiClaimCategory: allTab["ClaimCategoryIds"],
        indiClaimSubCategory: allTab["ClaimSubCategoryIds"],
        indiClaimIssueType: allTab["ClaimIssuetypeIds"],
        indiClaimStatus: allTab["ClaimStatus"],
        indiCampaignName: allTab["CampaignName"],
        indiCampaignStatus: allTab["CampaignStatusids"],
        campaignAssignedTo: allTab["CampaignAssignedIds"],
        campaignEndDateFrom: allTab["CampaignStartDate"]
          ? new Date(allTab["CampaignStartDate"])
          : "",
        campaignEndDateTo: allTab["CampaignEndDate"]
          ? new Date(allTab["CampaignEndDate"])
          : "",
        loginUsers: allTab["UserIDs"],
        loginDateFrom: allTab["Startdate"] ? new Date(allTab["Startdate"]) : "",
        loginDateTo: allTab["Enddate"] ? new Date(allTab["Enddate"]) : "",
        start:
          allTab["CampaignStartDate"] !== null &&
          allTab["CampaignStartDate"] !== undefined
            ? moment(allTab["CampaignStartDate"]).format("DD-MM-YYYY")
            : start,
        end:
          allTab["CampaignEndDate"] !== null &&
          allTab["CampaignEndDate"] !== undefined
            ? moment(allTab["CampaignEndDate"]).format("DD-MM-YYYY")
            : end,
        loginStart:
          allTab["Startdate"] !== null && allTab["Startdate"] !== undefined
            ? moment(allTab["Startdate"]).format("DD-MM-YYYY")
            : start,
        loginEnd:
          allTab["Enddate"] !== null && allTab["Enddate"] !== undefined
            ? moment(allTab["Enddate"]).format("DD-MM-YYYY")
            : end,
      });
      // this.state.Schedule_ID = rowData.scheduleID;
      // this.state.tabIndex = allTab["ActiveTabId"];
      // this.state.taskIdTitle = allTab["TaskTitle"];
      // this.state.taskLinkedTicketId = allTab["TaskTicketID"];
      // this.state.taskAssignedTo = allTab["TaskAssignedId"];
      // this.state.taskCreatedBy = allTab["TaskCreatedBy"];
      // this.state.taskWithTickets =
      //   allTab["IsTaskWithTicket"] === true ? "yes" : "no";
      // this.state.taskWithClaim =
      //   allTab["IsTaskWithClaim"] === true ? "yes" : "no";
      // this.state.taskClaimId = allTab["TaskClaimID"];
      // this.state.indiDepartment = allTab["DepartmentIds"];
      // this.state.indiFunction = allTab["FunctionIds"];
      // this.state.indiPriority = allTab["PriorityIds"];
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

      // this.state.claimClaimId = allTab["ClaimID"];
      // this.state.linkedTaskId = allTab["ClaimTaskID"];
      // this.state.claimLinkedTicketId = allTab["ClaimTicketID"];
      // this.state.claimAssignedTo = allTab["ClaimAssignedId"];
      // this.state.claimCreatedBy = allTab["ClaimCreatedBy"];
      // this.state.claimWithTickets =
      //   allTab["IsClaimWithTicket"] === true ? "yes" : "no";
      // this.state.claimWithTask =
      //   allTab["IsClaimWithTask"] === true ? "yes" : "no";
      // this.state.indiClaimCategory = allTab["ClaimCategoryIds"];
      // this.state.indiClaimSubCategory = allTab["ClaimSubCategoryIds"];
      // this.state.indiClaimIssueType = allTab["ClaimIssuetypeIds"];
      // this.state.indiClaimStatus = allTab["ClaimStatus"];
      // this.setState({ claimCreateDate: allTab["ClaimCreatedDate"] });

      // this.state.indiCampaignName = allTab["CampaignName"];
      // this.state.indiCampaignStatus = allTab["CampaignStatusids"];
      // this.state.campaignAssignedTo = allTab["CampaignAssignedIds"];
      // this.state.campaignEndDateFrom = allTab["CampaignStartDate"];
      // this.state.campaignEndDateTo = allTab["CampaignEndDate"];

      this.setState({
        selectedReportNameHolder: rowData.reportName,
        reportIDHolder: rowData.reportID,
      });

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
      // this.handleAddReportOpen();
      if (this.state.tabIndex === 1) {
        // setTimeout(() => {
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
        // }, 100);
      } else if (this.state.tabIndex === 2) {
        // setTimeout(() => {
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
        // }, 100);
      } else if (this.state.tabIndex === 3) {
        if (this.state.indiCampaignName.split(",").length - 1 !== 0) {
          document.getElementById("campaignNameValue").textContent =
            this.state.indiCampaignName.split(",").length - 1 + " selected";
        } else {
          document.getElementById("campaignNameValue").textContent = "Select";
        }
        if (this.state.indiCampaignStatus.split(",").length - 1 !== 0) {
          document.getElementById("campaignStatusNameValue").textContent =
            this.state.indiCampaignStatus.split(",").length - 1 + " selected";
        } else {
          document.getElementById("campaignStatusNameValue").textContent =
            "Select";
        }
      }
    }, 1);
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
        ReportID: id,
        RegionID: this.state.campaignRegion,
        ZoneID: this.state.campaignZone,
      },
    })
      .then(function(res) {
        debugger;
        if (res.data.responseData === "") {
          NotificationManager.error("No data in report");
        } else {
          window.open(res.data.responseData);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.storeReportData;

    if (this.state.sortColumn === "reportName") {
      itemsArray.sort((a, b) => {
        if (a.reportName < b.reportName) return 1;
        if (a.reportName > b.reportName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "scheduleStatus") {
      itemsArray.sort((a, b) => {
        if (a.scheduleStatus < b.scheduleStatus) return 1;
        if (a.scheduleStatus > b.scheduleStatus) return -1;
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
    if (this.state.sortColumn === "reportStatus") {
      itemsArray.sort((a, b) => {
        if (a.reportStatus < b.reportStatus) return 1;
        if (a.reportStatus > b.reportStatus) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      ReportData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;

    var itemsArray = [];
    itemsArray = this.state.storeReportData;

    if (this.state.sortColumn === "reportName") {
      itemsArray.sort((a, b) => {
        if (a.reportName < b.reportName) return -1;
        if (a.reportName > b.reportName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "scheduleStatus") {
      itemsArray.sort((a, b) => {
        if (a.scheduleStatus < b.scheduleStatus) return -1;
        if (a.scheduleStatus > b.scheduleStatus) return 1;
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
    if (this.state.sortColumn === "reportStatus") {
      itemsArray.sort((a, b) => {
        if (a.reportStatus < b.reportStatus) return -1;
        if (a.reportStatus > b.reportStatus) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      ReportData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    debugger;

    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (
      this.state.sortFilterName.length === 0 ||
      this.state.sortFilterSchedule.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (data === "reportName") {
      if (
        this.state.sscheduleStatusFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sreportStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sscheduleStatusFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          sreportStatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "scheduleStatus") {
      if (
        this.state.sreportNameFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sreportStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          sreportStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sreportNameFilterCheckbox !== "" ||
        this.state.sscheduleStatusFilterCheckbox !== "" ||
        this.state.sreportStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportNameFilterCheckbox: "",
          sscheduleStatusFilterCheckbox: "",
          sreportStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reportStatus") {
      if (
        this.state.sreportNameFilterCheckbox !== "" ||
        this.state.sscheduleStatusFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportNameFilterCheckbox: "",
          sscheduleStatusFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel = (e) => {
    if (this.state.tempReportData.length > 0) {
      this.setState({
        StatusModel: false,
        storeReportData: this.state.tempReportData,
        filterTxtValue: "",
        sortFilterName: this.state.sortFilterName,
        sortFilterSchedule: this.state.sortSchedule,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "reportName") {
        if (this.state.sreportNameFilterCheckbox === "") {
        } else {
          this.setState({
            sscheduleStatusFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            sreportStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "scheduleStatus") {
        if (this.state.sscheduleStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sreportNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            sreportStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sreportNameFilterCheckbox: "",
            sscheduleStatusFilterCheckbox: "",
            sreportStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reportStatus") {
        if (this.state.sreportStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sreportNameFilterCheckbox: "",
            sscheduleStatusFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        storeReportData: this.state.isortA
          ? this.state.storeReportData
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterName: this.state.sortFilterName,
        sortFilterSchedule: this.state.sortSchedule,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  };
  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sreportNameFilterCheckbox = this.state.sreportNameFilterCheckbox;
    var sscheduleStatusFilterCheckbox = this.state
      .sscheduleStatusFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sreportStatusFilterCheckbox = this.state.sreportStatusFilterCheckbox;

    if (column === "reportName" || column === "all") {
      if (type === "value" && type !== "All") {
        sreportNameFilterCheckbox = sreportNameFilterCheckbox.replace(
          "all",
          ""
        );
        sreportNameFilterCheckbox = sreportNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sreportNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sreportNameFilterCheckbox = sreportNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sreportNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreportNameFilterCheckbox.includes("all")) {
          sreportNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reportName") {
            for (let i = 0; i < this.state.sortName.length; i++) {
              sreportNameFilterCheckbox +=
                this.state.sortName[i].reportName + ",";
            }
            sreportNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "scheduleStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sscheduleStatusFilterCheckbox = sscheduleStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sscheduleStatusFilterCheckbox = sscheduleStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sscheduleStatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sscheduleStatusFilterCheckbox = sscheduleStatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sscheduleStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sscheduleStatusFilterCheckbox.includes("all")) {
          sscheduleStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "scheduleStatus") {
            for (let i = 0; i < this.state.sortSchedule.length; i++) {
              sscheduleStatusFilterCheckbox +=
                this.state.sortSchedule[i].scheduleStatus + ",";
            }
            sscheduleStatusFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (
          screatedByFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedByFilterCheckbox = screatedByFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
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
            for (let i = 0; i < this.state.sortCreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reportStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sreportStatusFilterCheckbox = sreportStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sreportStatusFilterCheckbox = sreportStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sreportStatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sreportStatusFilterCheckbox = sreportStatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sreportStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreportStatusFilterCheckbox.includes("all")) {
          sreportStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reportStatus") {
            for (let i = 0; i < this.state.sortState.length; i++) {
              sreportStatusFilterCheckbox +=
                this.state.sortState[i].reportStatus + ",";
            }
            sreportStatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sreportNameFilterCheckbox,
      sscheduleStatusFilterCheckbox,
      screatedByFilterCheckbox,
      sreportStatusFilterCheckbox,
      nameColor: "",
      scheduleColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "reportName") {
      var sItems = sreportNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reportName === sItems[i]
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
        nameColor: "sort-column",
      });
    } else if (column === "scheduleStatus") {
      var sItems = sscheduleStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.scheduleStatus === sItems[i]
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
        scheduleColor: "sort-column",
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
    } else if (column === "reportStatus") {
      var sItems = sreportStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reportStatus === sItems[i]
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
      tempReportData: itemsArray,
    });
    // this.StatusCloseModel();
  };

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "reportName") {
      var sortFilterName = matchSorter(this.state.sortName, e.target.value, {
        keys: ["reportName"],
      });
      if (sortFilterName.length > 0) {
        this.setState({ sortFilterName });
      } else {
        this.setState({
          sortFilterName: [],
        });
      }
    }
    if (this.state.sortColumn === "scheduleStatus") {
      var sortFilterSchedule = matchSorter(
        this.state.sortSchedule,
        e.target.value,
        { keys: ["scheduleStatus"] }
      );
      if (sortFilterSchedule.length > 0) {
        this.setState({ sortFilterSchedule });
      } else {
        this.setState({
          sortFilterSchedule: [],
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: [],
        });
      }
    }
    if (this.state.sortColumn === "reportStatus") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["reportStatus"] }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: [],
        });
      }
    }
  }
  handleClearSearch() {
    this.setState({
      screatedByFilterCheckbox: "",
      sreportNameFilterCheckbox: "",
      sscheduleStatusFilterCheckbox: "",
      sreportStatusFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      storeReportData: this.state.sortAllData,
      tempReportData: [],
    });
  }

  handleGetRegion() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getRegionZoneList",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({
            regionZoneData: responseData,
            campaignRegion: responseData[0].regionID,
            campaignZone: responseData[0].zoneID,
          });
          self.handleGetCampaignUser(
            responseData[0].regionID,
            responseData[0].zoneID
          );
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
      url: config.apiUrl + "/StoreUser/GetStoreReportUsersList",
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

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const datareport = this.state.storeReportData;

    const columnsreport = [
      {
        Header: (
          <span
            className={this.state.sortHeader === "Name" ? "sort-column" : ""}
            onClick={this.StatusOpenModel.bind(
              this,
              "reportName",
              TranslationContext !== undefined
                ? TranslationContext.span.name
                : "Name"
            )}
          >
            {TranslationContext !== undefined
              ? TranslationContext.span.name
              : "Name"}

            <FontAwesomeIcon
              icon={
                this.state.isATOZ == false && this.state.sortHeader === "Name"
                  ? faCaretUp
                  : faCaretDown
              }
            />
          </span>
        ),
        sortable: false,
        accessor: "reportName",
      },
      {
        Header: (
          <span
            className={
              this.state.sortHeader === "Schedule Status" ? "sort-column" : ""
            }
            onClick={this.StatusOpenModel.bind(
              this,
              "scheduleStatus",
              TranslationContext !== undefined
                ? TranslationContext.span.schedulestatus
                : "Schedule Status"
            )}
          >
            {TranslationContext !== undefined
              ? TranslationContext.span.schedulestatus
              : "Schedule Status"}

            <FontAwesomeIcon
              icon={
                this.state.isATOZ == false &&
                this.state.sortHeader === "Schedule Status"
                  ? faCaretUp
                  : faCaretDown
              }
            />
          </span>
        ),
        sortable: false,
        accessor: "scheduleStatus",
      },
      {
        Header: (
          <span
            className={
              this.state.sortHeader === "Created by" ? "sort-column" : ""
            }
            onClick={this.StatusOpenModel.bind(
              this,
              "createdBy",
              TranslationContext !== undefined
                ? TranslationContext.span.createdby
                : "Created by"
            )}
          >
            {TranslationContext !== undefined
              ? TranslationContext.span.createdby
              : "Created by"}

            <FontAwesomeIcon
              icon={
                this.state.isATOZ == false &&
                this.state.sortHeader === "Created by"
                  ? faCaretUp
                  : faCaretDown
              }
            />
          </span>
        ),
        sortable: false,
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
                            {TranslationContext !== undefined
                              ? TranslationContext.p.createdby
                              : "Created By"}
                            : {row.original["createdBy"]}
                          </p>
                        </b>
                        <p className="sub-title">
                          {TranslationContext !== undefined
                            ? TranslationContext.p.createddate
                            : "Created Date"}
                          : {row.original["createdDate"]}
                        </p>
                      </div>
                      <div>
                        <b>
                          <p className="title">
                            {TranslationContext !== undefined
                              ? TranslationContext.p.updatedby
                              : "Updated By"}
                            : {row.original["modifiedBy"]}
                          </p>
                        </b>
                        <p className="sub-title">
                          {TranslationContext !== undefined
                            ? TranslationContext.p.updateddate
                            : "Updated Date"}
                          : {row.original["modifiedDate"]}
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
            className={this.state.sortHeader === "Status" ? "sort-column" : ""}
            onClick={this.StatusOpenModel.bind(
              this,
              "reportStatus",
              TranslationContext !== undefined
                ? TranslationContext.span.status
                : "Status"
            )}
          >
            {TranslationContext !== undefined
              ? TranslationContext.span.status
              : "Status"}

            <FontAwesomeIcon
              icon={
                this.state.isATOZ == false && this.state.sortHeader === "Status"
                  ? faCaretUp
                  : faCaretDown
              }
            />
          </span>
        ),
        sortable: false,
        accessor: "reportStatus",
      },
      {
        Header: (
          <span>
            {TranslationContext !== undefined
              ? TranslationContext.span.actions
              : "Actions"}
          </span>
        ),
        sortable: false,
        accessor: "actionReport",
        Cell: (row) => (
          <div className="report-action">
            <div>
              {row.original.isDownloaded === 1 && (
                <img
                  src={DownExcel}
                  alt="download icon"
                  className="downloadaction"
                  onClick={this.handleDownload.bind(
                    this,
                    row.original.reportID
                  )}
                />
              )}
            </div>
            <div>
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
                          : "Delete file"}
                        ?
                      </p>
                      <p className="mt-1 fs-12">
                        {TranslationContext !== undefined
                          ? TranslationContext.p
                              .areyousureyouwanttodeletethisfile
                          : "Are you sure you want to delete this file"}
                        ?
                      </p>
                      <div className="del-can">
                        <a href={Demo.BLANK_LINK}>
                          {" "}
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="butn"
                          onClick={this.handleDeleteStoreReports.bind(
                            this,
                            row.original["reportID"]
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
                <img src={RedDeleteIcon} alt="del-icon" className="del-btn" />
              </Popover>
            </div>
            <div>
              <button
                className="react-tabel-button editre"
                id="p-edit-pop-2"
                onClick={this.handleEditReport.bind(this, row.original)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.button.edit
                  : "EDIT"}
              </button>
            </div>
          </div>
        ),
      },
    ];
    const ActionDelete = (
      <div className="d-flex general-popover popover-body">
        <div className="del-big-icon">
          <img src={DelBigIcon} alt="del-icon" />
        </div>
        <div>
          <p className="font-weight-bold blak-clr">
            {TranslationContext !== undefined
              ? TranslationContext.p.deletefile
              : "Delete file"}
            ?
          </p>
          <p className="mt-1 fs-12">
            {TranslationContext !== undefined
              ? TranslationContext.p.areyousureyouwanttodeletethisfile
              : "Are you sure you want to delete this file"}
            ?
          </p>
          <div className="del-can">
            <a href={Demo.BLANK_LINK}>
              {" "}
              {TranslationContext !== undefined
                ? TranslationContext.a.cancel
                : "CANCEL"}
            </a>
            <button
              className="butn"
              onClick={this.handleDeleteStoreReports.bind(this)}
            >
              {TranslationContext !== undefined
                ? TranslationContext.button.delete
                : "Delete"}
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
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortatoz
                      : "SORT BY A TO Z"}
                  </p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortztoa
                      : "SORT BY Z TO A"}
                  </p>
                </div>
              </div>
              <a
                style={{
                  margin: "0 25px",
                  textDecoration: "underline",
                  color: "#2561A8",
                  cursor: "pointer",
                }}
                onClick={this.handleClearSearch.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
                    : "FILTER BY TYPE"}
                </p>
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
                        this.state.sreportNameFilterCheckbox.includes("all") ||
                        this.state.sscheduleStatusFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sreportStatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "reportName"
                    ? this.state.sortFilterName !== null &&
                      this.state.sortFilterName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.reportName}
                            id={"fil-open" + item.reportName}
                            value={item.reportName}
                            checked={
                              this.state.sreportNameFilterCheckbox.includes(
                                item.reportName
                              ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "reportName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.reportName}>
                            <span className="table-btn table-blue-btn">
                              {item.reportName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "scheduleStatus"
                    ? this.state.sortFilterSchedule !== null &&
                      this.state.sortFilterSchedule.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.scheduleStatus}
                            id={"fil-open" + item.scheduleStatus}
                            value={item.scheduleStatus}
                            checked={
                              this.state.sscheduleStatusFilterCheckbox.includes(
                                item.scheduleStatus
                              ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "scheduleStatus",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.scheduleStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.scheduleStatus}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdBy"
                    ? this.state.sortFilterCreatedBy !== null &&
                      this.state.sortFilterCreatedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.createdBy}
                            id={"fil-open" + item.createdBy}
                            value={item.createdBy}
                            checked={
                              this.state.screatedByFilterCheckbox.includes(
                                item.createdBy
                              ) || false
                            }
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

                  {this.state.sortColumn === "reportStatus"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.reportStatus}
                            id={"fil-open" + item.reportStatus}
                            value={item.reportStatus}
                            checked={
                              this.state.sreportStatusFilterCheckbox.includes(
                                item.reportStatus
                              ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "reportStatus",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.reportStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.reportStatus}
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
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.reports
              : "Reports"}
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtnReport"
                onClick={this.handleAddReportOpen}
              >
                +{" "}
                {TranslationContext !== undefined
                  ? TranslationContext.button.add
                  : "Add"}
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
                  onClick={this.handleChangeTab.bind(this, 3)}
                  style={{ display: "none" }}
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
                    {TranslationContext !== undefined
                      ? TranslationContext.a.task
                      : "Task"}
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={this.handleChangeTab.bind(this, 2)}
                  style={{ display: "none" }}
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
                    {TranslationContext !== undefined
                      ? TranslationContext.a.claim
                      : "Claim"}
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
                    {TranslationContext !== undefined
                      ? TranslationContext.a.campaign
                      : "Campaign"}
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={this.handleChangeTab.bind(this, 4)}
                >
                  <a
                    className={`nav-link ${this.state.tabIndex === 4 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#LoginDetails-tab"
                    role="tab"
                    aria-controls="LoginDetails-tab"
                    aria-selected="false"
                    style={{ pointerEvents: "none" }}
                  >
                    Login Details
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.taskidslashtitle
                          : "Task ID/ Title"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder
                                .entertaskidslashtitle
                            : "Enter Task ID/ Title"
                        }
                        maxLength={11}
                        name="taskIdTitle"
                        value={this.state.taskIdTitle}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.department
                          : "Department"}
                      </label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="departmentNameValue"
                          onClick={this.handleDepartmentButton}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}

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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.selectall
                                      : "Select All"}
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoDepartment.bind(this)}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.clear
                                      : "Clear"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.taskcreationon
                          : "Task Creation On"}
                      </label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.taskCreateDate}
                          value={this.state.taskCreateDate}
                          onChange={this.handleReportCreateDate.bind(
                            this,
                            "taskCreateDate"
                          )}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.creationdate
                              : "Creation Date"
                          }
                          showMonthDropdown
                          showYearDropdown
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.taskstatus
                          : "Task Status"}
                      </label>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.function
                          : "Function"}
                      </label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="functionNameValue"
                          onClick={this.handleFunctionButton}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}

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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.selectall
                                      : "Select All"}
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoFunction.bind(this)}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.clear
                                      : "Clear"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.createdby
                          : "Created by"}
                      </label>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.linkedticketid
                          : "Linked Ticket ID"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterlinkedticketid
                            : "Enter Linked Ticket ID"
                        }
                        maxLength={11}
                        name="taskLinkedTicketId"
                        value={this.state.taskLinkedTicketId}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.priority
                          : "Priority"}
                      </label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="priorityNameValue"
                          onClick={this.handlePriorityButton}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}

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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.selectall
                                      : "Select All"}
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoPriority.bind(this)}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.clear
                                      : "Clear"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.assignedto
                          : "Assigned To"}
                      </label>
                      <select
                        name="taskAssignedTo"
                        value={this.state.taskAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.userData.length > 0 && (
                          <option value="0">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.all
                              : "All"}
                          </option>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.taskwithtickets
                          : "Task With Tickets"}
                      </label>
                      <select
                        name="taskWithTickets"
                        value={this.state.taskWithTickets}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.taskwithclaim
                          : "Task With Claim"}
                      </label>
                      <select
                        name="taskWithClaim"
                        value={this.state.taskWithClaim}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimid
                          : "Claim ID"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="taskClaimId"
                        value={this.state.taskClaimId}
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterclaimid
                            : "Enter Claim ID"
                        }
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
                        {TranslationContext !== undefined
                          ? TranslationContext.button.next
                          : "NEXT"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimid
                          : "Claim ID"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="claimClaimId"
                        value={this.state.claimClaimId}
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterclaimid
                            : "Enter Claim ID"
                        }
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimcategory
                          : "Claim Category"}
                      </label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimCategoryNameValue"
                          onClick={this.handleClaimCategoryButton}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}

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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.selectall
                                      : "Select All"}
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimCategory.bind(
                                      this
                                    )}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.clear
                                      : "Clear"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimcreationon
                          : "Claim Creation On"}
                      </label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.claimCreateDate}
                          value={this.state.claimCreateDate}
                          onChange={this.handleReportCreateDate.bind(
                            this,
                            "claimCreateDate"
                          )}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.creationdate
                              : "Creation Date"
                          }
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.placeholder.selectall
                                      : "Select All"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimsubcategory
                          : "Claim Sub Category"}
                      </label>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.createdby
                          : "Created by"}
                      </label>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.linkedticketid
                          : "Linked Ticket ID"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterlinkedticketid
                            : "Enter Linked Ticket ID"
                        }
                        maxLength={11}
                        name="claimLinkedTicketId"
                        value={this.state.claimLinkedTicketId}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimissuetype
                          : "Claim Issue Type"}
                      </label>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.assignedto
                          : "Assigned To"}
                      </label>
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimwithtickets
                          : "Claim With Tickets"}
                      </label>
                      <select
                        name="claimWithTickets"
                        value={this.state.claimWithTickets}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimwithtask
                          : "Claim With Task"}
                      </label>
                      <select
                        name="claimWithTask"
                        value={this.state.claimWithTask}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.linkedtaskid
                          : "Linked Task ID"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="linkedTaskId"
                        value={this.state.linkedTaskId}
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.enterlinkedtaskid
                            : "Enter Linked Task ID"
                        }
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
                        {TranslationContext !== undefined
                          ? TranslationContext.button.next
                          : " NEXT"}
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
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.campaignname
                          : "Campaign Name"}
                      </label>
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
                      <label>Region</label>
                      <select
                        name="campaignRegion"
                        value={this.state.campaignRegion}
                        onChange={this.handleOnChangeData}
                        disabled={true}
                      >
                        <option value="0">Select</option>
                        {this.state.regionZoneData !== null &&
                          this.state.regionZoneData.map((item, i) => (
                            <option value={item.regionID}>
                              {item.regionName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Zone</label>
                      <select
                        name="campaignZone"
                        value={this.state.campaignZone}
                        onChange={this.handleOnChangeData}
                        disabled={true}
                      >
                        <option value="0">Select</option>
                        {this.state.regionZoneData !== null &&
                          this.state.regionZoneData.map((item, i) => (
                            <option value={item.zoneID}>{item.zoneName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.campaignassignedto
                          : "Campaign Assigned To"}
                      </label>
                      <select
                        name="campaignAssignedTo"
                        value={this.state.campaignAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        {this.state.CampaignUserData.length > 0 && (
                          <option value="0">All</option>
                        )}
                        {this.state.CampaignUserData !== null &&
                          this.state.CampaignUserData.map((item, i) => (
                            <option value={item.userID}>{item.userName}</option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className=" ticketstrReport">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.campaignenddate
                            : "Campaign End Date"}
                        </label>
                      </div>
                      <div className="ticketreportdat campaign-end-date">
                        {/* <DatePickerComponenet
                          applyCallback={this.applyCallback}

                        /> */}
                        <RangePicker
                          onChange={this.applyCallback}
                          bordered={false}
                          format="DD-MM-YYYY"
                          defaultValue={[
                            moment(this.state.start, "DD-MM-YYYY"),
                            moment(this.state.end, "DD-MM-YYYY"),
                          ]}
                        />
                      </div>
                      {/* <input className="no-bg" type="text" /> */}
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.campaignstatus
                          : "Campaign Status"}
                      </label>
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
                        {TranslationContext !== undefined
                          ? TranslationContext.button.next
                          : "NEXT"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 4 &&
                  "show active"}`}
                id="LoginDetails-tab"
                role="tabpanel"
                aria-labelledby="LoginDetails-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Login Users</label>
                      <select
                        name="loginUsers"
                        value={this.state.loginUsers}
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
                        <label>Date</label>
                      </div>
                      <div className="ticketreportdat campaign-end-date">
                        {/* <DatePickerComponenet
                          applyCallback={this.applyCallback}
                        /> */}
                        <RangePicker
                          onChange={this.applyCallback}
                          bordered={false}
                          format="DD-MM-YYYY"
                          defaultValue={[
                            moment(this.state.loginStart, "DD-MM-YYYY"),
                            moment(this.state.loginEnd, "DD-MM-YYYY"),
                          ]}
                          disabledDate={disabledDate}
                        />
                      </div>
                      {/* <input className="no-bg" type="text" /> */}
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen.bind(this, 4)}
                        // onClick={this.handleChangeTab.bind(this,2)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.next
                          : "NEXT"}
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
                <label className="reportdetail">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.enterreportdetails
                    : "Enter Report Details"}
                </label>
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
                    <label className="totalresult">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.totalresult
                        : "Total Result"}
                    </label>
                    <span className="totalresultnumber">
                      {this.state.totalResult}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 rname">
                  <div className="ranmetext">
                    <label className="renametext">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.reportname
                        : "Report Name"}
                    </label>
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
                      {TranslationContext !== undefined
                        ? TranslationContext.button.schedule
                        : "SCHEDULE"}
                    </button>
                  </div>
                  <div className="buttonschdulesave1">
                    <button className="Schedulenext1" onClick={this.handleSave}>
                      {TranslationContext !== undefined
                        ? TranslationContext.button.save
                        : "SAVE"}
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
                <b>
                  {TranslationContext !== undefined
                    ? TranslationContext.b.scheduledateto
                    : "Schedule date to"}
                </b>
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
                  onChange={this.handleScheduleDateChange.bind(this)}
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
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.every
                          : "Every"}
                      </label>
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
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.every
                          : "Every"}
                      </label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        value={this.state.selectedNoOfWeek}
                        onChange={this.handleWeekly}
                      />
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.every
                          : "Week on"}
                      </label>
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
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.mon
                          : "Mon"}
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Tue"
                        id="Tue"
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.tue
                          : "Tue"}
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Wed"
                        id="Wed"
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.wed
                          : "Wed"}
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Thu"
                        id="Thu"
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.thu
                          : "Thu"}
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Fri"
                        id="Fri"
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.fri
                          : "Fri"}
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Sat"
                        id="Sat"
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.sat
                          : "Sat"}
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleWeeklyDays}
                        value="Sun"
                        id="Sun"
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.checkbox.sun
                          : "Sun"}
                      </Checkbox>
                    </div>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "232" ||
                this.state.selectScheduleDate === 232 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.day
                          : "Day"}
                      </label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="9"
                        value={this.state.selectedNoOfDaysForMonth}
                        onChange={this.handleDaysForMonth}
                      />
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.ofevery
                          : "of every"}
                      </label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        value={this.state.selectedNoOfMonthForMonth}
                        onChange={this.handleMonthForMonth}
                      />
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.months
                          : "months"}
                      </label>
                    </span>
                  </div>
                ) : null}
                {this.state.selectScheduleDate === "233" ||
                this.state.selectScheduleDate === 233 ? (
                  <div className="ScheduleDate-to">
                    <span>
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.every
                          : "Every"}
                      </label>
                      <input
                        type="text"
                        className="Every"
                        placeholder="1"
                        onChange={this.handleMonthForWeek}
                        value={this.state.selectedNoOfMonthForWeek}
                      />
                      <label className="every1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.monthonthe
                          : "month on the"}
                      </label>
                    </span>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <select
                          id="inputState"
                          className="form-control dropdown-setting1"
                          onChange={this.handleWeekForWeek}
                          value={this.state.selectedNoOfWeekForWeek}
                        >
                          <option value="0">
                            Select
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          <option value="2">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.second
                              : "Second"}
                          </option>
                          <option value="4">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.four
                              : "Four"}
                          </option>
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
                        {TranslationContext !== undefined
                          ? TranslationContext.label.on
                          : "on"}
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
                          {TranslationContext !== undefined
                            ? TranslationContext.label.onthe
                            : "on the"}
                        </label>
                        <div className="col-md-7">
                          <select
                            id="inputState"
                            className="form-control dropdown-setting1"
                            onChange={this.handleWeekForYear}
                            value={this.state.selectedNoOfWeekForYear}
                          >
                            <option value="0">
                              Select
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            <option value="2">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.second
                                : "Second"}
                            </option>
                            <option value="4">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.four
                                : "Four"}
                            </option>
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
                    <label className="addLable">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.schedule
                        : "SCHEDULE"}
                    </label>
                  </button>
                </div>
                <div onClick={this.ScheduleCloseModel}>
                  <button type="button" className="scheduleBtncancel">
                    {TranslationContext !== undefined
                      ? TranslationContext.button.cancel
                      : "CANCEL"}
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
