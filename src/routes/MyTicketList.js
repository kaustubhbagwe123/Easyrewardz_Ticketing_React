import React, { Component, Fragment } from "react";
import SearchIcon from "./../assets/Images/search-icon.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import CliamIconGray from "./../assets/Images/claim-icon-gray.png";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Twitter from "./../assets/Images/twitter.png";
import Headphone2Img from "./../assets/Images/headphone2.png";

import MailImg from "./../assets/Images/msg.png";
import FacebookImg from "./../assets/Images/facebook.png";

import Sorting from "./../assets/Images/sorting.png";
import DelSearch from "./../assets/Images/del-search.png";
import moment from "moment";
import Modal from "react-responsive-modal";
import MyTicketDraft from "./Tabs/MyTicketDraft.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover } from "antd";
import { ProgressBar } from "react-bootstrap";
import { Collapse, CardBody, Card } from "reactstrap";
import CancalImg from "./../assets/Images/cancal blue.png";
import Chat from "./../assets/Images/chat.png";
import csv from "./../assets/Images/csv.png";

import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../helpers/config";
import TicketStatus from "./TicketStatus";
import { Checkbox } from "antd";
import SlaDue from "./SlaDue";
import TicketActionType from "./TicketActionType";
import ClaimStatus from "./ClaimStatus";
import TaskStatus from "./TaskStatus";
import Select from "react-select";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ScheduleDateDropDown from "./ScheduleDateDropDown";
import { authHeader } from "../helpers/authHeader";
import { CSVLink } from "react-csv";
import { withRouter } from "react-router";
import matchSorter from "match-sorter";

class MyTicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AssignModal: false,
      collapseSearch: false,
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      ByAllCreateDate: "",
      ByAllLastDate: "",
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      CSVDownload: [],
      selectedDesignation: 0,
      DesignationData: [],
      TicketPriorityData: [],
      ChannelOfPurchaseData: [],
      SlaStatusData: [],
      CategoryData: [],

      SubCategoryData: [],
      ClaimSubCategoryData: [],
      SubCategoryAllData: [],
      IssueTypeData: [],
      ClaimIssueTypeData: [],
      IssueTypeAllData: [],
      TicketStatusData: TicketStatus(),
      ScheduleOption: ScheduleDateDropDown(),
      SlaDueData: SlaDue(),
      TicketSourceData: [],
      DepartmentData: [],
      FunctionData: [],
      TicketActionTypeData: TicketActionType(),
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      open: false,
      Schedule: false,
      StatusModel: false,
      CheckBoxChecked: false,
      selectedPriority: 0,
      selectedPriorityAll: 0,
      selectedChannelOfPurchase: [],
      selectedTeamMember: [],
      selectedTicketActionType: [],
      selectedTicketStatusByDate: 0,
      selectScheduleDate: 0,
      selectedNoOfDay: 0,
      selectedScheduleTime: "",
      selectedSlaDueByDate: 0,
      selectedClaimStatus: 0,
      selectedTaskStatus: 0,
      selectedTicketStatusByCustomer: 0,
      selectedTicketStatusByTicket: 0,
      selectedTicketStatusByCategory: 0,
      selectedTicketStatusAll: 0,
      selectedWithClaimAll: "no",
      selectedWithTaskAll: "no",
      selectedVisitStoreAll: "all",
      selectedWantToVisitStoreAll: "all",
      selectedTicketSource: 0,
      selectedPurchaseStoreCodeAddressAll: "",
      selectedVisitStoreCodeAddressAll: "",
      selectedSlaStatus: 0,
      selectedCategory: 0,
      selectedClaimCategory: 0,
      selectedCategoryAll: 0,
      selectedSubCategory: 0,
      selectedClaimSubCategory: 0,
      selectedSubCategoryAll: 0,
      selectedIssueType: 0,
      selectedClaimIssueType: 0,
      selectedIssueTypeAll: 0,
      selectedDepartment: 0,
      selectedFunction: 0,
      selectSearchData: 0,
      MobileNoByCustType: "",
      EmailIdByCustType: "",
      ClaimIdByAll: "",
      EmailByAll: "",
      TicketIdTitleByAll: "",
      InvoiceSubOrderByAll: "",
      MobileByAll: "",
      ItemIdByAll: "",
      selectedAssignedToAll: "",
      TicketIdByCustType: "",
      SearchName: "",
      userID: 6,
      DraftDetails: [],
      SearchListData: [],
      byEscalationCount: 0,
      byNewCount: 0,
      byOpenCount: 0,
      byResolvedCount: 0,
      byReassignedCount: 0,
      byClosedCount: 0,
      byReOpenCount: 0,
      byAllCount: 0,
      byFollowUpCount: 0,
      draftCountStatus: 0,
      byDateFlag: 1,
      ActiveTabId: 1,
      headerActiveId: 1001,
      byCustomerTypeFlag: 0,
      byTicketTypeFlag: 0,
      byCategoryFlag: 0,
      allFlag: 0,
      resultCount: 0,
      selectedAssignedTo: 0,
      AssignToData: [],
      TeamMemberData: [],
      NameOfDayForWeek: [
        {
          days: "Sunday"
        },
        {
          days: "Monday"
        }
      ],
      NameOfDayForYear: [
        {
          days: "Sunday"
        },
        {
          days: "Monday"
        }
      ],
      NameOfMonthForYear: [
        {
          month: "September"
        },
        {
          month: "October"
        }
      ],
      NameOfMonthForDailyYear: [
        {
          month: "September"
        },
        {
          month: "October"
        }
      ],
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNameOfMonthForDailyYear: [],
      selectedNameOfDayForYear: [],
      agentId: 0,
      agentRemark: "",
      ticketIds: "",
      selectedScheduleFor: "",
      dailyDay: 0,
      isByStatus: true,
      ticketStatusId: 100,
      advPageSize: 30,
      advPageNo: 1,
      SearchTicketData: [],
      fieldByDate: {},
      fieldByCustomerType: {},
      fieldByTicketType: {},
      fieldByCategory: {},
      selectedTeamMemberCommaSeperated: "",
      selectedNameOfDayForWeekCommaSeperated: "",
      selectedNameOfMonthForYearCommaSeperated: "",
      selectedNameOfMonthForDailyYearCommaSeperated: "",
      selectedNameOfDayForYearCommaSeperated: "",
      ticketDetailID: 0,
      IsDaily: 0,
      IsWeekly: 0,
      IsDailyForMonth: 0,
      IsDailyForYear: 0,
      IsWeeklyForMonth: 0,
      IsWeeklyForYear: 0,
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
      loading: false,
      SearchNameCompulsory: "",
      FinalSaveSearchData: "",
      modulesItemsMyticket: [],
      Escalation: "",
      New: "",
      Open: "",
      Resolved: "",
      ReassignedByMe: "",
      Closed: "",
      All: "",
      FollowUp: "",
      Draft: "",
      scheduleRequired: "",
      agentSelection: "",
      sortColumnName: "",
      sortTicketData: [],
      sortCategoryData: [],
      sortPriorityData: [],
      sortcreatedOnData: [],
      sortAssigneeData: [],
      sortAllData: [],
      cSelectedRow: {},
      notiType: "",
      moduleIDMyticket: 0,
      ClearfollowUp: "",
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
      sortHeader: "",
      filterTxtValue: "",
      sortFilterTicketData: [],
      sortFilterCategoryData: [],
      sortFilterPriorityData: [],
      sortFiltercreatedOnData: [],
      sortFilterAssigneeData: [],
      sFilterCheckbox: "",
      tempSearchTicketData: [],
      sColorFilterCheckbox: "",
      isRed: false,
      isWhite: false,
      isGreen: false,
      isYellow: false
    };
    this.handleGetAssignTo = this.handleGetAssignTo.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleAdvSearchFlag = this.handleAdvSearchFlag.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleGetSaveSearchList = this.handleGetSaveSearchList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSlaStatusList = this.handleGetSlaStatusList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetClaimSubCategoryList = this.handleGetClaimSubCategoryList.bind(
      this
    );
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetClaimIssueTypeList = this.handleGetClaimIssueTypeList.bind(
      this
    );
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetDraftDetails = this.handleGetDraftDetails.bind(this);
    this.handleSchedulePopupSuccess = this.handleSchedulePopupSuccess.bind(
      this
    );
    this.handelOnchangeData = this.handelOnchangeData.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleAssignRemark = this.handleAssignRemark.bind(this);
    this.handleDailyDay = this.handleDailyDay.bind(this);
    this.handleDaysForMonth = this.handleDaysForMonth.bind(this);
    this.handleMonthForMonth = this.handleMonthForMonth.bind(this);
    this.handleWeekForWeek = this.handleWeekForWeek.bind(this);
    this.handleWeekForYear = this.handleWeekForYear.bind(this);
    this.handleDayForYear = this.handleDayForYear.bind(this);
    this.handleMonthForWeek = this.handleMonthForWeek.bind(this);
    this.handleWeekly = this.handleWeekly.bind(this);
    this.handleWeeklyDays = this.handleWeeklyDays.bind(this);
    this.handleScheduleTime = this.handleScheduleTime.bind(this);
    this.handleAssignTickets = this.handleAssignTickets.bind(this);
    this.handleSchedulePopup = this.handleSchedulePopup.bind(this);
    this.handleSearchTicket = this.handleSearchTicket.bind(this);
    this.handleSearchTicketAllTabCount = this.handleSearchTicketAllTabCount.bind(
      this
    );
    this.handleMyTicketsearchOption = this.handleMyTicketsearchOption.bind(
      this
    );
    this.handleClearFollowUpData = this.handleClearFollowUpData.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.isType) {
      this.newNotifications(this.props.location.state.isType);
      this.setState({
        notiType: this.props.location.state.isType
      });
    }

    this.handleSearchTicketAllTabCount();
    if (!this.props.location.state) {
      this.handleSearchTicket();
    }
    this.handleGetDesignationList();
    this.handleGetTicketPriorityList();
    this.handleGetChannelOfPurchaseList();
    this.handleGetTicketSourceList();
    this.handleGetCategoryList();
    this.handleGetSlaStatusList();
    this.handleGetAssignTo();
    this.handleGetDraftDetails();
    this.handleGetDepartmentList();
    this.handleGetModulesNames();
  }

  componentDidUpdate() {
    if (this.props.location.state) {
      if (this.state.notiType !== this.props.location.state.isType) {
        this.newNotifications(this.props.location.state.isType);
      }
    }
  }

  newNotifications(type) {
    let upperTabs = document.querySelectorAll(".upper-tabs .nav-link");
    for (let i = 0; i < upperTabs.length; i++) {
      upperTabs[i].classList.remove("active");
    }
    document.getElementsByName(type)[0].classList.add("active");
    this.setState({ notiType: type });
    setTimeout(() => {
      this.handleSearchTicket(type);
    }, 100);
  }
  ////handle get module name
  handleGetModulesNames() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        if (data) {
          let moduleIDMyticket = data[1].moduleID;
          self.handleMyTicketsearchOption(moduleIDMyticket);
        }
      })
      .catch(response => {
        console.log(response);
      });
  }
  /////handle get module item by id
  handleMyTicketsearchOption(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: id
      }
    })
      .then(function(res) {
        let status = res.data.message;
        let data1 = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItemsMyticket: data1 });
          self.setMyTicketSearch(data1);
        } else {
          self.setState({ modulesItemsMyticket: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  setMyTicketSearch(data1) {
    var data = [];
    data = data1;
    if (data.length > 0) {
      if (data[0].moduleItemisActive !== undefined) {
        if (data[0].moduleItemisActive === true) {
          this.setState({ Escalation: "yes" });
        } else {
          this.setState({ Escalation: "none" });
        }
      }

      if (data[1].moduleItemisActive !== undefined) {
        if (data[1].moduleItemisActive === true) {
          this.setState({ New: "yes" });
        } else {
          this.setState({ New: "none" });
        }
      }
      if (data[2].moduleItemisActive !== undefined) {
        if (data[2].moduleItemisActive === true) {
          this.setState({ Open: "yes" });
        } else {
          this.setState({ Open: "none" });
        }
      }
      if (data[3].moduleItemisActive !== undefined) {
        if (data[3].moduleItemisActive === true) {
          this.setState({ Resolved: "yes" });
        } else {
          this.setState({ Resolved: "none" });
        }
      }
      if (data[4].moduleItemisActive !== undefined) {
        if (data[4].moduleItemisActive === true) {
          this.setState({ ReassignedByMe: "yes" });
        } else {
          this.setState({ ReassignedByMe: "none" });
        }
      }
      if (data[5].moduleItemisActive !== undefined) {
        if (data[5].moduleItemisActive === true) {
          this.setState({ Closed: "yes" });
        } else {
          this.setState({ Closed: "none" });
        }
      }
      if (data[6].moduleItemisActive !== undefined) {
        if (data[6].moduleItemisActive === true) {
          this.setState({ All: "yes" });
        } else {
          this.setState({ All: "none" });
        }
      }
      if (data[7].moduleItemisActive !== undefined) {
        if (data[7].moduleItemisActive === true) {
          this.setState({ FollowUp: "yes" });
        } else {
          this.setState({ FollowUp: "none" });
        }
      }
      if (data[8].moduleItemisActive !== undefined) {
        if (data[8].moduleItemisActive === true) {
          this.setState({ Draft: "yes" });
        } else {
          this.setState({ Draft: "none" });
        }
      }
    }
  }
  ////handle get ticket status count
  handleSearchTicketAllTabCount() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/TicketStatusCount",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        let Status = res.data.message;
        if (Status === "Success") {
          var EscalationCount = data[0].ticketCount;
          var NewCount = data[1].ticketCount;
          var OpenCount = data[2].ticketCount;
          var ResolvedCount = data[3].ticketCount;
          var ReassignedCount = data[4].ticketCount;
          var ClosedCount = data[5].ticketCount;
          var AllCount = data[6].ticketCount;
          var FollowUpCount = data[7].ticketCount;
          var draftCountStatus = data[8].ticketCount;
          var byReOpenCount = data[9].ticketCount;

          self.setState({
            byEscalationCount: EscalationCount,
            byNewCount: NewCount,
            byOpenCount: OpenCount,
            byResolvedCount: ResolvedCount,
            byReassignedCount: ReassignedCount,
            byClosedCount: ClosedCount,
            byAllCount: AllCount,
            byFollowUpCount: FollowUpCount,
            draftCountStatus: draftCountStatus,
            byReOpenCount
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleSearchTicket(TabId) {
    this.state.sortTicketData = [];
    this.state.sortCategoryData = [];
    this.state.sortPriorityData = [];
    this.state.sortcreatedOnData = [];
    this.state.sortAssigneeData = [];
    this.state.sortFilterTicketData = [];
    this.state.sortFilterCategoryData = [];
    this.state.sortFilterPriorityData = [];
    this.state.sortFiltercreatedOnData = [];
    this.state.sortFilterAssigneeData = [];
    this.state.sortAllData = [];
    var ticketStatus = 0;

    if (TabId === "Escalation" || TabId === undefined) {
      ticketStatus = 1001;
      this.setState({
        headerActiveId: 1001
      });
    } else if (TabId === "New") {
      ticketStatus = 101;
      this.setState({
        headerActiveId: 101
      });
    } else if (TabId === "Open") {
      ticketStatus = 102;
      this.setState({
        headerActiveId: 102
      });
    } else if (TabId === "Resolved") {
      ticketStatus = 103;
      this.setState({
        headerActiveId: 103
      });
    } else if (TabId === "Closed") {
      ticketStatus = 104;
      this.setState({
        headerActiveId: 104
      });
    } else if (TabId === "ReOpen") {
      ticketStatus = 105;
      this.setState({
        headerActiveId: 105
      });
    } else if (TabId === "Reassigned") {
      ticketStatus = 1004;
      this.setState({
        headerActiveId: 1004
      });
    } else if (TabId === "All") {
      ticketStatus = 1002;
      this.setState({
        headerActiveId: 1002
      });
    } else if (TabId === "FollowUp") {
      ticketStatus = 1003;
      this.setState({
        headerActiveId: 1003
      });
    }

    this.setState({
      loading: true,
      resultCount: 0,
      collapseSearch: false,
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      selectedSlaDueByDate: 0,
      selectedTicketStatusByDate: 0,
      MobileNoByCustType: "",
      EmailIdByCustType: "",
      TicketIdByCustType: "",
      selectedTicketStatusByCustomer: 0,
      selectedPriority: 0,
      selectedTicketStatusByTicket: 0,
      selectedChannelOfPurchase: [],
      selectedTicketActionType: [],
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedTicketStatusByCategory: 0,
      ByAllCreateDate: "",
      selectedTicketSource: 0,
      ClaimIdByAll: "",
      EmailByAll: "",
      ByAllLastDate: "",
      TicketIdTitleByAll: "",
      InvoiceSubOrderByAll: "",
      MobileByAll: "",
      selectedCategoryAll: 0,
      selectedPriorityAll: 0,
      ItemIdByAll: "",
      selectedAssignedToAll: "",
      selectedSubCategoryAll: 0,
      selectedTicketStatusAll: 0,
      selectedAssignedTo: 0,
      selectedVisitStoreAll: "all",
      selectedPurchaseStoreCodeAddressAll: "",
      selectedIssueTypeAll: 0,
      selectedSlaStatus: 0,
      selectedWantToVisitStoreAll: "all",
      selectedVisitStoreCodeAddressAll: "",
      selectedWithClaimAll: "no",
      selectedClaimStatus: 0,
      selectedClaimCategory: 0,
      selectedClaimSubCategory: 0,
      selectedClaimIssueType: 0,
      selectedWithTaskAll: "no",
      selectedTaskStatus: 0,
      selectedDepartment: 0,
      selectedFunction: 0
    });

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnPageLoad",
      headers: authHeader(),
      params: {
        HeaderStatusID: ticketStatus
      }
    })
      .then(function(res) {
        let data = res.data.responseData;
        let CVData = res.data.responseData;
        let Status = res.data.message;

        if (data !== null) {
          if (self.state.headerActiveId === 1003) {
            self.handleClearFollowUpData();
          }
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].ticketStatus]) {
              distinct.push(data[i].ticketStatus);
              unique[data[i].ticketStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortTicketData.push({ ticketStatus: distinct[i] });
            self.state.sortFilterTicketData.push({ ticketStatus: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].category]) {
              distinct.push(data[i].category);
              unique[data[i].category] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCategoryData.push({ category: distinct[i] });
            self.state.sortFilterCategoryData.push({ category: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].priority]) {
              distinct.push(data[i].priority);
              unique[data[i].priority] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortPriorityData.push({ priority: distinct[i] });
            self.state.sortFilterPriorityData.push({ priority: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdOn]) {
              distinct.push(data[i].createdOn);
              unique[data[i].createdOn] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortcreatedOnData.push({ createdOn: distinct[i] });
            self.state.sortFiltercreatedOnData.push({ createdOn: distinct[i] });
          }

          var Assignunique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!Assignunique[data[i].assignedTo]) {
              distinct.push(data[i].assignedTo);
              Assignunique[data[i].assignedTo] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortAssigneeData.push({ assignedTo: distinct[i] });
            self.state.sortFilterAssigneeData.push({ assignedTo: distinct[i] });
          }
        }

        if (Status === "Success") {
          self.setState({
            SearchTicketData: data,
            loading: false,
            cSelectedRow: {}
          });
          for (let i = 0; i < CVData.length; i++) {
            delete CVData[i].totalpages;
          }
          self.setState({ CSVDownload: CVData });
        } else {
          self.setState({ SearchTicketData: [], loading: false });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  ////handle clear follow up data
  handleClearFollowUpData() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Ticketing/getticketsforfollowup",
      headers: authHeader()
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ClearfollowUp: data
          });
        } else {
          self.setState({
            ClearfollowUp: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  ////handle search clear follow up data
  handleSearchClearFollowUp() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/ticketunassigfromfollowup",
      headers: authHeader(),
      params: {
        TicketIDs: this.state.ClearfollowUp
      }
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success(
            "Clear Follow up notification successfully."
          );
          self.handleSearchTicketAllTabCount();
          self.handleSearchTicket(1003);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleSchedulePopup() {
    if (
      this.state.selectScheduleDate === 0 ||
      this.state.selectScheduleDate === "100"
    ) {
      this.setState({
        scheduleRequired: "All fields are required"
      });
    } else if (this.state.selectScheduleDate === "230") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDay === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required"
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "231") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfWeek === 0 ||
        this.state.selectedWeeklyDays === ""
      ) {
        this.setState({
          scheduleRequired: "All fields are required"
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "232") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDaysForMonth === 0 ||
        this.state.selectedNoOfMonthForMonth === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required"
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "233") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfMonthForWeek === 0 ||
        this.state.selectedNoOfWeekForWeek === 0 ||
        this.state.selectedNameOfDayForWeek.length === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required"
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "234") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDayForDailyYear === 0 ||
        this.state.selectedNameOfMonthForYear.length === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required"
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "235") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfWeekForYear === 0 ||
        this.state.selectedNameOfDayForYear.length === 0 ||
        this.state.selectedNameOfMonthForDailyYear.length === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required"
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    }
  }
  ////handle Schedule Popup Success
  handleSchedulePopupSuccess() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Schedule",
      headers: authHeader(),
      data: {
        SearchInputParams: this.state.FinalSaveSearchData,
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
        NameOfDayForWeek: this.state.selectedNameOfDayForWeekCommaSeperated,
        IsDailyForYear: this.state.IsDailyForYear,
        NoOfDayForDailyYear: this.state.selectedNoOfDayForDailyYear,
        NameOfMonthForDailyYear: this.state
          .selectedNameOfMonthForYearCommaSeperated,
        IsWeeklyForYear: this.state.IsWeeklyForYear,
        NoOfWeekForYear: this.state.selectedNoOfWeekForYear,
        NameOfDayForYear: this.state.selectedNameOfDayForYearCommaSeperated,
        NameOfMonthForYear: this.state
          .selectedNameOfMonthForDailyYearCommaSeperated
      }
    })
      .then(function(res) {
        let messageData = res.data.message;
        if (messageData === "Success") {
          self.ScheduleCloseModel();
          NotificationManager.success("Scheduled successfully.");
          self.setState({
            scheduleRequired: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleAssignRemark(e) {
    this.setState({
      agentRemark: e.currentTarget.value
    });
  }
  handleDailyDay(e) {
    this.setState({
      selectedNoOfDay: e.currentTarget.value
    });
  }
  handleWeekly(e) {
    this.setState({
      selectedNoOfWeek: e.currentTarget.value
    });
  }
  handleDaysForMonth(e) {
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value
    });
  }
  handleMonthForMonth(e) {
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value
    });
  }
  handleWeekForWeek(e) {
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value
    });
  }
  handleWeekForYear(e) {
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value
    });
  }
  handleDayForYear(e) {
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value
    });
  }
  handleMonthForWeek(e) {
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value
    });
  }
  handleWeeklyDays = async e => {
    let check = e.target.checked;
    let val = e.target.value;
    let finalWeekList = "";
    if (val === "Mon") {
      if (check === true) {
        await this.setState({
          Mon: val
        });
      } else {
        await this.setState({
          Mon: ""
        });
      }
    } else if (val === "Tue") {
      if (check === true) {
        await this.setState({
          Tue: val
        });
      } else {
        await this.setState({
          Tue: ""
        });
      }
    } else if (val === "Wed") {
      if (check === true) {
        await this.setState({
          Wed: val
        });
      } else {
        await this.setState({
          Wed: ""
        });
      }
    } else if (val === "Thu") {
      if (check === true) {
        await this.setState({
          Thu: val
        });
      } else {
        await this.setState({
          Thu: ""
        });
      }
    } else if (val === "Fri") {
      if (check === true) {
        await this.setState({
          Fri: val
        });
      } else {
        await this.setState({
          Fri: ""
        });
      }
    } else if (val === "Sat") {
      if (check === true) {
        await this.setState({
          Sat: val
        });
      } else {
        await this.setState({
          Sat: ""
        });
      }
    } else if (val === "Sun") {
      if (check === true) {
        await this.setState({
          Sun: val
        });
      } else {
        await this.setState({
          Sun: ""
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
      selectedWeeklyDays: finalWeekList
    });
  };
  handleScheduleTime(e) {
    this.setState({
      selectedScheduleTime: e
    });
  }
  handleAssignTickets() {
    if (this.state.agentId !== 0) {
      let self = this;
      var ticketIdsComma = this.state.ticketIds;
      var ticketIds = ticketIdsComma.substring(0, ticketIdsComma.length - 1);

      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/AssignTickets",
        headers: authHeader(),
        params: {
          TicketID: ticketIds,
          AgentID: this.state.agentId,
          Remark: this.state.agentRemark
        }
      })
        .then(function(res) {
          //debugger;
          let messageData = res.data.message;
          if (messageData === "Success") {
            self.handleAssignModalClose();
            NotificationManager.success("Tickets assigned successfully.");
            self.handleSearchTicket();
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        agentSelection: "Agent Selection is required"
      });
    }
  }

  clearSearch() {
    if (this.state.byDateFlag === 1) {
      this.setState(
        {
          ByDateCreatDate: "",
          ByDateSelectDate: "",
          selectedSlaDueByDate: 0,
          selectedTicketStatusByDate: 0,
          resultCount: 0
        },
        () => {
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.byCustomerTypeFlag === 2) {
      this.setState(
        {
          MobileNoByCustType: "",
          EmailIdByCustType: "",
          TicketIdByCustType: "",
          selectedTicketStatusByCustomer: 0,
          resultCount: 0
        },
        () => {
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.byTicketTypeFlag === 3) {
      this.setState(
        {
          selectedPriority: 0,
          selectedTicketStatusByTicket: 0,
          selectedChannelOfPurchase: [],
          selectedTicketActionType: [],
          resultCount: 0
        },
        () => {
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.byCategoryFlag === 4) {
      this.setState(
        {
          selectedCategory: 0,
          selectedSubCategory: 0,
          selectedIssueType: 0,
          selectedTicketStatusByCategory: 0,
          resultCount: 0,
          SubCategoryData: [],
          IssueTypeData: []
        },
        () => {
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.allFlag === 5) {
      this.setState(
        {
          ByAllCreateDate: "",
          selectedTicketSource: 0,
          ClaimIdByAll: "",
          EmailByAll: "",
          ByAllLastDate: "",
          TicketIdTitleByAll: "",
          InvoiceSubOrderByAll: "",
          MobileByAll: "",
          selectedCategoryAll: 0,
          selectedPriorityAll: 0,
          ItemIdByAll: "",
          selectedAssignedToAll: "",
          selectedSubCategoryAll: 0,
          selectedTicketStatusAll: 0,
          selectedAssignedTo: 0,
          selectedVisitStoreAll: "all",
          selectedPurchaseStoreCodeAddressAll: "",
          selectedIssueTypeAll: 0,
          selectedSlaStatus: 0,
          selectedWantToVisitStoreAll: "all",
          selectedVisitStoreCodeAddressAll: "",
          selectedWithClaimAll: "no",
          selectedClaimStatus: 0,
          selectedClaimCategory: 0,
          selectedClaimSubCategory: 0,
          selectedClaimIssueType: 0,
          selectedWithTaskAll: "no",
          selectedTaskStatus: 0,
          selectedDepartment: 0,
          selectedFunction: 0,
          resultCount: 0,
          SubCategoryAllData: [],
          IssueTypeAllData: [],
          ClaimSubCategoryData: [],
          ClaimIssueTypeData: []
        },
        () => {
          this.ViewSearchData(1);
        }
      );
    }
  }

  handleAdvSearchFlag(e) {
    let currentActive = e.currentTarget.innerText;
    if (currentActive === "By Date") {
      this.setState({
        byDateFlag: 1,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 1
      });
    } else if (currentActive === "By Customer Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 2,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 2
      });
    } else if (currentActive === "By Ticket Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 3,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 3
      });
    } else if (currentActive === "By Category") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 4,
        allFlag: 0,
        ActiveTabId: 4
      });
    } else if (currentActive === "All") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 5,
        ActiveTabId: 5
      });
    }
  }
  handleGetDraftDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetDraftDetails",
      headers: authHeader()
    })
      .then(function(res) {
        let details = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({ DraftDetails: details });
        } else {
          self.setState({ DraftDetails: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({ DepartmentData: data });
        } else {
          self.setState({ DepartmentData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetFunctionList() {
    let self = this;
    self.setState({ FunctionData: [], selectedFunction: 0 });

    axios({
      method: "post",
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment
      }
    })
      .then(function(res) {
        let FunctionData = res.data.responseData;
        self.setState({ FunctionData: FunctionData });
      })
      .catch(data => {
        console.log(data);
      });
  }

  setScheduleFor = e => {
    let scheduleForValue = e.currentTarget.value;
    this.setState({ selectedScheduleFor: scheduleForValue });
  };

  handleGetDesignationList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({ DesignationData: data });
        } else {
          self.setState({ DesignationData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetTicketPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        let stastus = res.data.message;
        if (stastus === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader()
    })
      .then(function(res) {
        let ChannelOfPurchaseData = res.data.responseData;
        self.setState({ ChannelOfPurchaseData: ChannelOfPurchaseData });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetTicketSourceList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            TicketSourceData: data
          });
        } else {
          self.setState({
            TicketSourceData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetSlaStatusList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLAStatusList",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data.responseData;
        self.setState({
          SlaStatusData: data
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader()
    })
      .then(function(res) {
        let data = res.data;

        if (data !== null) {
          self.setState({
            CategoryData: data
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetClaimSubCategoryList() {
    let self = this;
    self.setState({
      ClaimSubCategoryData: [],
      selectedClaimSubCategory: 0,
      ClaimIssueTypeData: [],
      selectedClaimIssueType: 0
    });

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.selectedClaimCategory
      }
    })
      .then(function(res) {
        //debugger;
        let data = res.data.responseData;
        self.setState({
          ClaimSubCategoryData: data
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetSubCategoryList(param) {
    //debugger;
    let self = this;
    // self.setState({
    //   SubCategoryData: [],
    //   SubCategoryAllData: [],
    //   selectedSubCategory: 0,
    //   selectedSubCategoryAll: 0,
    //   IssueTypeData: [],
    //   IssueTypeAllData: [],
    //   selectedIssueType: 0,
    //   selectedIssueTypeAll: 0
    // });
    if (param === "categoryTab") {
      this.setState({
        SubCategoryData: [],
        IssueTypeData: [],
        selectedSubCategory: 0,
        selectedIssueType: 0
      });
    } else if (param === "allTab") {
      this.setState({
        SubCategoryAllData: [],
        IssueTypeAllData: [],
        selectedSubCategoryAll: 0,
        selectedIssueTypeAll: 0
      });
    } else if (param === "allClaimTab") {
      this.setState({
        ClaimSubCategoryData: [],
        selectedClaimSubCategory: 0,
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0
      });
    }
    // let cateId =
    //   this.state.byCategoryFlag === 4
    //     ? this.state.selectedCategory
    //     : this.state.selectedCategoryAll;
    let cateId;
    if (param == "categoryTab") {
      cateId = this.state.selectedCategory;
    } else if (param === "allTab") {
      cateId = this.state.selectedCategoryAll;
    } else if (param === "allClaimTab") {
      cateId = this.state.selectedClaimCategory;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: cateId
      }
    })
      .then(function(res) {
        //debugger;
        var data = res.data.responseData;
        // if (self.state.byCategoryFlag === 4) {
        //   self.setState({
        //     SubCategoryData: data
        //   });
        // } else if (self.state.allFlag === 5) {
        //   self.setState({
        //     SubCategoryAllData: data
        //   });
        // }
        if (param === "categoryTab") {
          self.setState({
            SubCategoryData: data
          });
        } else if (param === "allTab") {
          self.setState({
            SubCategoryAllData: data
          });
        } else if (param === "allClaimTab") {
          self.setState({
            ClaimSubCategoryData: data
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetClaimIssueTypeList() {
    let self = this;
    self.setState({
      ClaimIssueTypeData: [],
      selectedClaimIssueType: 0
    });

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.selectedClaimSubCategory
      }
    })
      .then(function(res) {
        //debugger;
        let ClaimIssueTypeData = res.data.responseData;
        self.setState({ ClaimIssueTypeData: ClaimIssueTypeData });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetIssueTypeList(param) {
    let self = this;
    // self.setState({
    //   IssueTypeData: [],
    //   IssueTypeAllData: [],
    //   selectedIssueType: 0,
    //   selectedIssueTypeAll: 0
    // });
    if (param === "categoryTab") {
      self.setState({
        IssueTypeData: [],
        selectedIssueType: 0
      });
    } else if (param === "allTab") {
      self.setState({
        IssueTypeAllData: [],
        selectedIssueTypeAll: 0
      });
    } else if (param === "allClaimTab") {
      self.setState({
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0
      });
    }
    // let subCateId =
    //   this.state.byCategoryFlag === 4
    //     ? this.state.selectedSubCategory
    //     : this.state.selectedSubCategoryAll;
    let subCateId;
    if (param === "categoryTab") {
      subCateId = this.state.selectedSubCategory;
    } else if (param === "allTab") {
      subCateId = this.state.selectedSubCategoryAll;
    } else if (param === "allClaimTab") {
      subCateId = this.state.selectedClaimSubCategory;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: subCateId
      }
    })
      .then(function(res) {
        //debugger;
        // if (self.state.byCategoryFlag === 4) {
        //   var IssueTypeData = res.data.responseData;
        //   self.setState({
        //     IssueTypeData: IssueTypeData
        //   });
        // } else if (self.state.allFlag === 5) {
        //   var IssueTypeAllData = res.data.responseData;
        //   self.setState({
        //     IssueTypeAllData: IssueTypeAllData
        //   });
        // }
        if (param === "categoryTab") {
          var IssueTypeData = res.data.responseData;
          self.setState({
            IssueTypeData: IssueTypeData
          });
        } else if (param === "allTab") {
          var IssueTypeAllData = res.data.responseData;
          self.setState({
            IssueTypeAllData: IssueTypeAllData
          });
        } else if (param === "allClaimTab") {
          var ClaimIssueTypeData = res.data.responseData;
          self.setState({
            ClaimIssueTypeData: ClaimIssueTypeData
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleAssignSearchData() {
    //debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/searchAgent",
      headers: authHeader(),
      params: {
        FirstName: this.state.assignFirstName.trim(),
        LastName: this.state.assignLastName.trim(),
        Email: this.state.assignEmail.trim(),
        DesignationID: this.state.selectedDesignation
      }
    })
      .then(function(res) {
        //debugger;
        let SearchAssignData = res.data.responseData;
        self.setState({
          SearchAssignData: SearchAssignData,
          assignFirstName: "",
          assignLastName: "",
          assignEmail: ""
          // selectedDesignation: 0
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleAssignClearData() {
    //debugger;
    this.setState({
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedDesignation: 0
    });
  }

  SaveSearchData() {
    //debugger;
    let self = this;
    if (this.state.SearchName.length > 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/savesearch",
        headers: authHeader(),
        params: {
          SearchSaveName: this.state.SearchName,
          parameter: this.state.FinalSaveSearchData
        }
      })
        .then(function(res) {
          //debugger;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Save Search parameter successfully.");
            self.handleGetSaveSearchList();
            self.setState({
              SearchName: ""
            });
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      self.setState({
        SearchNameCompulsory: "Please Enter Search Name."
      });
    }
  }
  handleGetSaveSearchList() {
    //debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/listSavedSearch",
      headers: authHeader()
    })
      .then(function(res) {
        //debugger;
        let data = res.data.responseData;
        self.setState({ SearchListData: data });
      })
      .catch(data => {
        console.log(data);
      });
  }
  hadleSearchDeleteData(searchDeletId) {
    //debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/deletesavedsearch",
      headers: authHeader(),
      params: {
        SearchParamID: searchDeletId
      }
    })
      .then(function(res) {
        //debugger;
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            "Saved search data deleted successfully."
          );
          self.handleGetSaveSearchList();
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  ViewSearchData(clrSrch) {
    //debugger;
    this.state.sortTicketData = [];
    this.state.sortCategoryData = [];
    this.state.sortPriorityData = [];
    this.state.sortcreatedOnData = [];
    this.state.sortAssigneeData = [];
    this.state.sortAllData = [];
    let self = this;
    this.setState({ loading: true });

    // ---------------By Date tab---------------------
    var dateTab = {};
    if (this.state.ActiveTabId === 1) {
      if (
        this.state.ByDateCreatDate === null ||
        this.state.ByDateCreatDate === undefined ||
        this.state.ByDateCreatDate === ""
      ) {
        dateTab["Ticket_CreatedOn"] = "";
      } else {
        dateTab["Ticket_CreatedOn"] = moment(this.state.ByDateCreatDate).format(
          "YYYY-MM-DD"
        );
      }
      if (
        this.state.ByDateSelectDate === null ||
        this.state.ByDateSelectDate === undefined ||
        this.state.ByDateSelectDate === ""
      ) {
        dateTab["Ticket_ModifiedOn"] = "";
      } else {
        dateTab["Ticket_ModifiedOn"] = moment(
          this.state.ByDateSelectDate
        ).format("YYYY-MM-DD");
      }
      dateTab["SLA_DueON"] = this.state.selectedSlaDueByDate;
      dateTab["Ticket_StatusID"] = this.state.selectedTicketStatusByDate;
    } else {
      dateTab = null;
    }

    // --------------------By Customer Type Tab---------------
    var customerType = {};
    if (this.state.ActiveTabId === 2) {
      customerType["CustomerMobileNo"] = this.state.MobileNoByCustType.trim();
      customerType["CustomerEmailID"] = this.state.EmailIdByCustType.trim();
      customerType["TicketID"] = this.state.TicketIdByCustType.trim();
      customerType[
        "TicketStatusID"
      ] = this.state.selectedTicketStatusByCustomer;
    } else {
      customerType = null;
    }

    // --------------------By Ticket Type Tab-----------------
    var ticketType = {};
    if (this.state.ActiveTabId === 3) {
      let purchaseIds = "";
      let actionTypeIds = "";
      if (this.state.selectedChannelOfPurchase != null) {
        for (let i = 0; i < this.state.selectedChannelOfPurchase.length; i++) {
          purchaseIds +=
            this.state.selectedChannelOfPurchase[i].channelOfPurchaseID + ",";
        }
      }
      if (this.state.selectedTicketActionType != null) {
        for (let i = 0; i < this.state.selectedTicketActionType.length; i++) {
          actionTypeIds +=
            this.state.selectedTicketActionType[i].ticketActionTypeID + ",";
        }
      }
      ticketType["TicketPriorityID"] = this.state.selectedPriority;
      ticketType["TicketStatusID"] = this.state.selectedTicketStatusByTicket;
      ticketType["ChannelOfPurchaseIds"] = purchaseIds;
      ticketType["ActionTypes"] = actionTypeIds;
    } else {
      ticketType = null;
    }
    // --------------------By Category Tab-------------------
    var categoryType = {};
    if (this.state.ActiveTabId === 4) {
      categoryType["CategoryId"] = this.state.selectedCategory;
      categoryType["SubCategoryId"] = this.state.selectedSubCategory;
      categoryType["IssueTypeId"] = this.state.selectedIssueType;
      categoryType[
        "TicketStatusID"
      ] = this.state.selectedTicketStatusByCategory;
    } else {
      categoryType = null;
    }
    //---------------------By Ticket All Tab---------------------
    var allTab = {};

    if (this.state.ActiveTabId === 5) {
      let withClaim = 0;
      let withTask = 0;
      if (this.state.selectedWithClaimAll === "yes") {
        withClaim = 1;
      }
      if (this.state.selectedWithTaskAll === "yes") {
        withTask = 1;
      }

      if (
        this.state.ByAllCreateDate === null ||
        this.state.ByAllCreateDate === undefined ||
        this.state.ByAllCreateDate === ""
      ) {
        allTab["CreatedDate"] = "";
      } else {
        allTab["CreatedDate"] = moment(this.state.ByAllCreateDate).format(
          "YYYY-MM-DD"
        );
      }

      if (
        this.state.ByAllLastDate === null ||
        this.state.ByAllLastDate === undefined ||
        this.state.ByAllLastDate === ""
      ) {
        allTab["ModifiedDate"] = "";
      } else {
        allTab["ModifiedDate"] = moment(this.state.ByAllLastDate).format(
          "YYYY-MM-DD"
        );
      }
      // allTab["CreatedDate"] = moment(this.state.ByAllCreateDate).format("YYYY-MM-DD");
      // allTab["ModifiedDate"] = moment(this.state.ByAllLastDate).format("YYYY-MM-DD");
      allTab["CategoryId"] = this.state.selectedCategoryAll;
      allTab["SubCategoryId"] = this.state.selectedSubCategoryAll;
      allTab["IssueTypeId"] = this.state.selectedIssueTypeAll;
      allTab["TicketSourceTypeID"] = this.state.selectedTicketSource;
      allTab["TicketIdORTitle"] = this.state.TicketIdTitleByAll.trim();
      allTab["PriorityId"] = this.state.selectedPriorityAll;
      allTab["TicketSatutsID"] = this.state.selectedTicketStatusAll;
      allTab["SLAStatus"] = this.state.selectedSlaStatus;
      allTab["ClaimId"] = this.state.selectedClaimStatus;
      allTab[
        "InvoiceNumberORSubOrderNo"
      ] = this.state.InvoiceSubOrderByAll.trim();
      allTab["OrderItemId"] = this.state.ItemIdByAll.trim();
      allTab["IsVisitStore"] = this.state.selectedVisitStoreAll;
      allTab["IsWantVistingStore"] = this.state.selectedWantToVisitStoreAll;
      allTab["CustomerEmailID"] = this.state.EmailByAll.trim();
      allTab["CustomerMobileNo"] = this.state.MobileByAll.trim();
      allTab["AssignTo"] = this.state.selectedAssignedTo;
      allTab[
        "StoreCodeORAddress"
      ] = this.state.selectedPurchaseStoreCodeAddressAll.trim();
      allTab[
        "WantToStoreCodeORAddress"
      ] = this.state.selectedVisitStoreCodeAddressAll.trim();
      allTab["HaveClaim"] = withClaim;
      allTab["ClaimStatusId"] = this.state.selectedClaimStatus;
      allTab["ClaimCategoryId"] = this.state.selectedClaimCategory;
      allTab["ClaimSubCategoryId"] = this.state.selectedClaimSubCategory;
      allTab["ClaimIssueTypeId"] = this.state.selectedClaimIssueType;
      allTab["HaveTask"] = withTask;
      allTab["TaskStatusId"] = this.state.selectedTaskStatus;
      allTab["TaskDepartment_Id"] = this.state.selectedDepartment;
      allTab["TaskFunction_Id"] = this.state.selectedFunction;
    } else {
      allTab = null;
    }

    // ----------------------SetState variable in Json Format for Apply Search------------------------------------
    var ShowDataparam = {};

    ShowDataparam.HeaderStatusId = this.state.headerActiveId;
    ShowDataparam.ActiveTabId = this.state.ActiveTabId;
    ShowDataparam.searchDataByDate = dateTab;
    ShowDataparam.searchDataByCustomerType = customerType;
    ShowDataparam.searchDataByTicketType = ticketType;
    ShowDataparam.searchDataByCategoryType = categoryType;
    ShowDataparam.SearchDataByAll = allTab;

    var FinalSaveSearchData = JSON.stringify(ShowDataparam);
    this.setState({
      FinalSaveSearchData
    });
    //----------------------------------------------------------
    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnSearch",
      headers: authHeader(),
      data: {
        HeaderStatusId: this.state.headerActiveId,
        ActiveTabId: this.state.ActiveTabId,
        searchDataByDate: dateTab,
        searchDataByCustomerType: customerType,
        searchDataByTicketType: ticketType,
        searchDataByCategoryType: categoryType,
        SearchDataByAll: allTab
      }
    })
      .then(function(res) {
        //debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        let CVData = res.data.responseData;

        let count = 0;
        if (data !== null) {
          if (res.data.responseData != null) {
            count = res.data.responseData.length;
          }

          if (data !== null) {
            self.state.sortAllData = data;
            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].ticketStatus]) {
                distinct.push(data[i].ticketStatus);
                unique[data[i].ticketStatus] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              self.state.sortTicketData.push({ ticketStatus: distinct[i] });
              self.state.sortFilterTicketData.push({
                ticketStatus: distinct[i]
              });
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].category]) {
                distinct.push(data[i].category);
                unique[data[i].category] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              self.state.sortCategoryData.push({ category: distinct[i] });
              self.state.sortFilterCategoryData.push({ category: distinct[i] });
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].priority]) {
                distinct.push(data[i].priority);
                unique[data[i].priority] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              self.state.sortPriorityData.push({ priority: distinct[i] });
              self.state.sortFilterPriorityData.push({ priority: distinct[i] });
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].createdOn]) {
                distinct.push(data[i].createdOn);
                unique[data[i].createdOn] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              self.state.sortcreatedOnData.push({ createdOn: distinct[i] });
              self.state.sortFiltercreatedOnData.push({
                createdOn: distinct[i]
              });
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].assignedTo]) {
                distinct.push(data[i].assignedTo);
                unique[data[i].assignedTo] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              self.state.sortAssigneeData.push({ assignedTo: distinct[i] });
              self.state.sortFilterAssigneeData.push({
                assignedTo: distinct[i]
              });
            }
          }
        }

        if (status === "Success") {
          self.setState({
            SearchTicketData: data
          });

          if (data !== null) {
            for (let i = 0; i < CVData.length; i++) {
              delete CVData[i].totalpages;
              delete CVData[i].responseTimeRemainingBy;
              delete CVData[i].responseOverdueBy;
              delete CVData[i].resolutionOverdueBy;
              // delete CSVData[i].ticketCommentCount;
            }
            self.setState({ CSVDownload: CVData });
          }
          if (clrSrch === 1) {
            self.setState({
              resultCount: count,
              loading: false
            });
          } else {
            self.setState({
              resultCount: count,
              loading: false
            });
          }
        } else {
          self.setState({
            SearchTicketData: [],
            resultCount: 0,
            loading: false
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  setAssignedToValue = e => {
    let assign = e.currentTarget.value;
    this.setState({ selectedAssignedTo: assign });
  };

  setDepartmentValue = e => {
    let departmentValue = e.currentTarget.value;
    this.setState({ selectedDepartment: departmentValue });

    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = e => {
    let functionValue = e.currentTarget.value;
    this.setState({ selectedFunction: functionValue });
  };
  setDesignationValue = e => {
    let designationValue = e.currentTarget.value;
    this.setState({ selectedDesignation: designationValue });
  };
  setPriorityValue = e => {
    let priorityValue = e.currentTarget.value;
    this.setState({ selectedPriority: priorityValue });
  };
  setPriorityAllValue = e => {
    let priorityAllValue = e.currentTarget.value;
    this.setState({ selectedPriorityAll: priorityAllValue });
  };

  handleAssignedToAll = e => {
    let assignedToAllValue = e.currentTarget.value;
    this.setState({ selectedAssignedToAll: assignedToAllValue });
  };

  setChannelOfPurchaseValue = e => {
    //debugger;
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTeamMember = e => {
    //debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, s => s.fullName)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };
  setNameOfDayForWeek = e => {
    //debugger;
    if (e !== null) {
      var selectedNameOfDayForWeekCommaSeperated = Array.prototype.map
        .call(e, s => s.days)
        .toString();
    }
    this.setState({
      selectedNameOfDayForWeek: e,
      selectedNameOfDayForWeekCommaSeperated
    });
  };
  setNameOfMonthForYear = e => {
    //debugger;
    if (e !== null) {
      var selectedNameOfMonthForYearCommaSeperated = Array.prototype.map
        .call(e, s => s.month)
        .toString();
    }
    this.setState({
      selectedNameOfMonthForYear: e,
      selectedNameOfMonthForYearCommaSeperated
    });
  };
  setNameOfMonthForDailyYear = e => {
    //debugger;
    if (e !== null) {
      var selectedNameOfMonthForDailyYearCommaSeperated = Array.prototype.map
        .call(e, s => s.month)
        .toString();
    }
    this.setState({
      selectedNameOfMonthForDailyYear: e,
      selectedNameOfMonthForDailyYearCommaSeperated
    });
  };
  setNameOfDayForYear = e => {
    //debugger;
    if (e !== null) {
      var selectedNameOfDayForYearCommaSeperated = Array.prototype.map
        .call(e, s => s.days)
        .toString();
    }
    this.setState({
      selectedNameOfDayForYear: e,
      selectedNameOfDayForYearCommaSeperated
    });
  };
  setTicketActionTypeValue = e => {
    this.setState({ selectedTicketActionType: e });
  };
  handleTicketStatusByDate = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByDate: ticketStatusValue });
  };
  handleSlaDueByDate = e => {
    let slaDueValue = e.currentTarget.value;
    this.setState({ selectedSlaDueByDate: slaDueValue });
  };
  handleClaimStatus = e => {
    //debugger;
    let claimStatusValue = e.currentTarget.value;
    this.setState({ selectedClaimStatus: claimStatusValue });
  };
  handleTaskStatus = e => {
    let taskStatusValue = e.currentTarget.value;
    this.setState({ selectedTaskStatus: taskStatusValue });
  };
  handleTicketStatusByCustomer = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByCustomer: ticketStatusValue });
  };
  handleTicketStatusByTicket = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByTicket: ticketStatusValue });
  };
  handleTicketStatusByCategory = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByCategory: ticketStatusValue });
  };
  handleTicketStatusAll = e => {
    let ticketStatusAllValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusAll: ticketStatusAllValue });
  };
  handleVisitStoreAll = e => {
    let visitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedVisitStoreAll: visitStoreAllValue });
  };
  handleWithClaimAll = e => {
    let withClaimAllValue = e.currentTarget.value;
    this.setState({ selectedWithClaimAll: withClaimAllValue });
  };
  handleWithTaskAll = e => {
    let withTaskAllValue = e.currentTarget.value;
    this.setState({ selectedWithTaskAll: withTaskAllValue });
  };
  handleWantToVisitStoreAll = e => {
    let wantToVisitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedWantToVisitStoreAll: wantToVisitStoreAllValue });
  };
  handlePurchaseStoreCodeAddressAll = e => {
    let purchaseStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedPurchaseStoreCodeAddressAll: purchaseStoreCodeAddressAllValue
    });
  };
  handleVisitStoreCodeAddressAll = e => {
    let visitStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedVisitStoreCodeAddressAll: visitStoreCodeAddressAllValue
    });
  };
  setTicketSourceValue = e => {
    let ticketSourceValue = e.currentTarget.value;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };
  setSlaStatusValue = e => {
    let slaStatusValue = e.currentTarget.value;
    this.setState({ selectedSlaStatus: slaStatusValue });
  };
  setCategoryValue = e => {
    //debugger;
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategory: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList("categoryTab");
      }
    }, 1);
  };
  setClaimCategoryValue = e => {
    let claimCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimCategory: claimCategoryValue });
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        this.handleGetSubCategoryList("allClaimTab");
      }
    }, 1);
  };
  setCategoryAllValue = e => {
    let categoryAllValue = e.currentTarget.value;
    this.setState({ selectedCategoryAll: categoryAllValue });
    setTimeout(() => {
      if (this.state.selectedCategoryAll) {
        this.handleGetSubCategoryList("allTab");
      }
    }, 1);
  };
  setSubCategoryValue = e => {
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategory: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList("categoryTab");
      }
    }, 1);
  };
  setClaimSubCategoryValue = e => {
    let claimSubCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimSubCategory: claimSubCategoryValue });

    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList("allClaimTab");
      }
    }, 1);
  };
  setSubCategoryAllValue = e => {
    let subCategoryAllValue = e.currentTarget.value;
    this.setState({ selectedSubCategoryAll: subCategoryAllValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryAll) {
        this.handleGetIssueTypeList("allTab");
      }
    }, 1);
  };
  setIssueTypeValue = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });
  };
  setClaimIssueTypeValue = e => {
    let claimIssueTypeValue = e.currentTarget.value;
    this.setState({ selectedClaimIssueType: claimIssueTypeValue });
  };
  setIssueTypeAllValue = e => {
    let issueTypeAllValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeAll: issueTypeAllValue });
  };

  StatusOpenModel(data, header) {
    this.setState({
      StatusModel: true,
      sortColumnName: data,
      sortHeader: header
    });
  }
  StatusCloseModel() {
    debugger;
    var tempFinalSearchTicketData = [];
    if (this.state.tempSearchTicketData.length > 0) {
      var tempSearchTicketData = this.state.tempSearchTicketData;
      var tempColor = [];
      if (this.state.isRed) {
        var tempFilterData = tempSearchTicketData.filter(
          a => a.isEscalation === 1
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isWhite) {
        var tempFilterData = tempSearchTicketData.filter(
          a =>
            a.isEscalation === 0 &&
            a.isSLANearBreach === false &&
            a.isReassigned === false
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isYellow) {
        var tempFilterData = tempSearchTicketData.filter(
          a => a.isSLANearBreach === true
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isGreen) {
        var tempFilterData = tempSearchTicketData.filter(
          a => a.isReassigned === true && a.isEscalation === 0
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (tempColor.length > 0) {
        tempFinalSearchTicketData = tempColor;
      } else {
        tempFinalSearchTicketData = this.state.tempSearchTicketData;
      }
    } else {
      var tempSearchTicketData = this.state.sortAllData;
      var tempColor = [];
      if (this.state.isRed) {
        var tempFilterData = tempSearchTicketData.filter(
          a => a.isEscalation === 1
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isWhite) {
        var tempFilterData = tempSearchTicketData.filter(
          a =>
            a.isEscalation === 0 &&
            a.isSLANearBreach === false &&
            a.isReassigned === false
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isYellow) {
        var tempFilterData = tempSearchTicketData.filter(
          a => a.isSLANearBreach === true
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isGreen) {
        var tempFilterData = tempSearchTicketData.filter(
          a => a.isReassigned === true && a.isEscalation === 0
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (tempColor.length > 0) {
        tempFinalSearchTicketData = tempColor;
      } else {
        tempFinalSearchTicketData = this.state.sortAllData;
      }
    }
    this.setState({
      StatusModel: false,
      filterTxtValue: "",
      sFilterCheckbox: "",
      isRed: false,
      isWhite: false,
      isYellow: false,
      isGreen: false,
      SearchTicketData: tempFinalSearchTicketData
    });
  }
  toggleSearch() {
    debugger;
    this.handleGetSaveSearchList();
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
    if (this.state.collapseSearch) {
      var paramdata = "";
      if (this.state.headerActiveId === 1001) {
        paramdata = "Escalation";
      } else if (this.state.headerActiveId === 101) {
        paramdata = "New";
      } else if (this.state.headerActiveId === 102) {
        paramdata = "Open";
      } else if (this.state.headerActiveId === 103) {
        paramdata = "Resolved";
      } else if (this.state.headerActiveId === 104) {
        paramdata = "Closed";
      } else if (this.state.headerActiveId === 105) {
        paramdata = "ReOpen";
      } else if (this.state.headerActiveId === 1004) {
        paramdata = "Reassigned";
      } else if (this.state.headerActiveId === 1002) {
        paramdata = "All";
      } else if (this.state.headerActiveId === 1003) {
        paramdata = "FollowUp";
      }
      this.handleSearchTicket(paramdata);
    }
  }
  handleByDateCreate(date) {
    //debugger;
    this.setState({ ByDateCreatDate: date });
  }
  handleChangeSelectDate(date) {
    this.setState({ ByDateSelectDate: date });
  }
  handleAllCreateDate(date) {
    this.setState({ ByAllCreateDate: date });
  }
  handleAllLastDate(date) {
    this.setState({ ByAllLastDate: date });
  }
  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  hanleChange = () => {
    this.props.history.push("/admin/addSearchMyTicket");
  };
  // hanleChange_MyTicket = () => {
  //   this.props.history.push("/admin/myticket");
  // };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  clickCheckbox(evt) {
    evt.stopPropagation();
  }

  setSortCheckStatus = (column, isColor, e) => {
    debugger;

    var itemsArray = [];

    var sFilterCheckbox = this.state.sFilterCheckbox;

    var allData = this.state.sortAllData;
    if (isColor === "value" && isColor !== "All") {
      if (sFilterCheckbox.includes(e.currentTarget.value)) {
        sFilterCheckbox = sFilterCheckbox.replace(
          e.currentTarget.value + ",",
          ""
        );
      } else {
        sFilterCheckbox += e.currentTarget.value + ",";
      }
    }

    var data = "";
    this.setState({
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
      sFilterCheckbox
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "status") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.ticketStatus === sItems[i]
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
    } else if (column === "category") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.category === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        categoryColor: ""
      });
    } else if (column === "priority") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.priority === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        priorityColor: "sort-column"
      });
    } else if (column === "assignedTo") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.assignedTo === sItems[i]
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
        assignColor: "sort-column"
      });
    } else if (column === "createdOn") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.createdOn === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        creationColor: "sort-column"
      });
    }

    debugger;

    this.setState({
      tempSearchTicketData: itemsArray
    });
  };
  //// handle change filtre by check box
  setColorSortCheckStatus = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.checked });
  };
  sortStatusAtoZ() {
    //debugger;
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;

    itemsArray.sort((a, b) => {
      return a.name > b.name;
    });
    this.setState({
      SearchTicketData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    //debugger;
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;
    itemsArray.sort((a, b) => {
      return a.name < b.name;
    });
    this.setState({
      SearchTicketData: itemsArray
    });
    this.StatusCloseModel();
  }

  handleGetAssignTo() {
    //debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    })
      .then(function(res) {
        //debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data,
            TeamMemberData: data
          });
        } else {
          self.setState({
            AssignToData: [],
            TeamMemberData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handelCheckBoxCheckedChange = async ticketID => {
    //debugger;
    var checkboxes = document.getElementsByName("ListCheckbox");
    var strIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    // await this.setState({
    //   ticketIds: strIds
    // });
    const newSelected = Object.assign({}, this.state.cSelectedRow);
    newSelected[ticketID] = !this.state.cSelectedRow[ticketID];

    await this.setState({
      cSelectedRow: ticketID ? newSelected : false,
      ticketIds: strIds
    });
  };

  checkAllCheckbox = async event => {
    //debugger;
    var obj = this.state.cSelectedRow;
    var strIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("ListCheckbox");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strIds += checkboxes[i].getAttribute("attrIds") + ",";
          for (let i = 0; i < this.state.SearchTicketData.length; i++) {
            obj[this.state.SearchTicketData[i].ticketID] = true;
          }
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
          for (let i = 0; i < this.state.SearchTicketData.length; i++) {
            obj[this.state.SearchTicketData[i].ticketID] = false;
          }
        }
      }
      strIds = "";
    }
    this.setState({
      cSelectedRow: obj
    });
    await this.setState({
      ticketIds: strIds
    });
  };
  handelOnchangeData(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  HandleRowClickPage = (rowInfo, column) => {
    if ((rowInfo, column)) {
      return {
        onClick: e => {
          //debugger;
          let Id = column.original["ticketID"];
          let self = this;
          self.setState({
            ticketDetailID: Id
          });
          setTimeout(function() {
            self.props.history.push({
              pathname: "myticket",
              ticketDetailID: Id
            });
          }, 100);
        },
        style: {
          background:
            column.original["isEscalation"] === 1
              ? "#FFDFDF"
              : column.original["isSLANearBreach"] === true
              ? "#FFF3DF"
              : column.original["isReassigned"] === true
              ? "#DEF3FF"
              : "white"
        }
      };
    }
    return {};
  };
  handleScheduleDateChange = e => {
    //debugger;
    let SelectData = e.currentTarget.value;
    if (SelectData === "230") {
      this.setState({
        IsDaily: 1,
        IsWeekly: 0,
        IsDailyForMonth: 0,
        IsDailyForYear: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
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
        selectedWeeklyDays: ""
      });
    } else if (SelectData === "231") {
      this.setState({
        IsWeekly: 1,
        IsDaily: 0,
        selectedNoOfDay: 0,
        IsDailyForMonth: 0,
        IsDailyForYear: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: ""
      });
    } else if (SelectData === "232") {
      this.setState({
        IsDailyForMonth: 1,
        IsDaily: 0,
        IsDailyForYear: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: ""
      });
    } else if (SelectData === "233") {
      this.setState({
        IsWeeklyForMonth: 1,
        IsDaily: 0,
        IsDailyForMonth: 0,
        IsWeeklyForYear: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        IsDailyForYear: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: ""
      });
    } else if (SelectData === "234") {
      this.setState({
        IsDailyForYear: 1,
        IsDaily: 0,
        IsDailyForMonth: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNameOfDayForWeekCommaSeperated: ""
      });
    } else if (SelectData === "235") {
      this.setState({
        IsWeeklyForYear: 1,
        IsDaily: 0,
        IsDailyForMonth: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        IsWeeklyForMonth: 0,
        IsDailyForYear: 0,
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNameOfDayForWeekCommaSeperated: ""
      });
    }
    this.setState({
      selectScheduleDate: SelectData
    });
  };

  handleApplySearch(paramsID) {
    //debugger;
    let self = this;
    this.setState({ loading: true });
    self.onCloseModal();

    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnSavedSearch",
      headers: authHeader(),
      params: {
        SearchParamID: paramsID
      }
    })
      .then(function(res) {
        //debugger;
        let status = res.data.message;
        let data = res.data.responseData.ticketList;
        let count = 0;
        if (res.data.responseData.ticketList != null) {
          count = res.data.responseData.ticketList.length;
        }
        if (status === "Success") {
          let dataSearch = JSON.parse(res.data.responseData.searchParams);
          self.setState({
            SearchTicketData: data,
            resultCount: count,
            loading: false
          });
          // self.onCloseModal();

          let lowerTabs = document.querySelectorAll(".lower-tabs .nav-link");
          let activeTabId = dataSearch.ActiveTabId;
          for (let i = 0; i < lowerTabs.length; i++) {
            lowerTabs[i].classList.remove("active");
            if (activeTabId - 1 === i) {
              lowerTabs[i].classList.add("active");
            }
          }

          let lowerTabsPane = document.querySelectorAll(
            ".lower-tabs-pane .tab-pane"
          );
          for (let i = 0; i < lowerTabsPane.length; i++) {
            lowerTabsPane[i].classList.remove("active");
            lowerTabsPane[i].classList.remove("show");
            if (activeTabId - 1 === i) {
              lowerTabsPane[i].classList.add("active");
              lowerTabsPane[i].classList.add("show");
            }
          }

          let upperTabs = document.querySelectorAll(".upper-tabs .nav-link");
          let headerStatusId = dataSearch.HeaderStatusId;
          for (let i = 0; i < upperTabs.length; i++) {
            upperTabs[i].classList.remove("active");
          }
          if (headerStatusId === 1001) {
            document.getElementsByName("Escalation")[0].classList.add("active");
          } else if (headerStatusId === 101) {
            document.getElementsByName("New")[0].classList.add("active");
          } else if (headerStatusId === 102) {
            document.getElementsByName("Open")[0].classList.add("active");
          } else if (headerStatusId === 103) {
            document.getElementsByName("Resolved")[0].classList.add("active");
          } else if (headerStatusId === 104) {
            document.getElementsByName("Closed")[0].classList.add("active");
          } else if (headerStatusId === 105) {
            document.getElementsByName("ReOpen")[0].classList.add("active");
          } else if (headerStatusId === 1004) {
            document.getElementsByName("Reassigned")[0].classList.add("active");
          } else if (headerStatusId === 1002) {
            document.getElementsByName("All")[0].classList.add("active");
          } else if (headerStatusId === 1003) {
            document.getElementsByName("FollowUp")[0].classList.add("active");
          }

          if (dataSearch.searchDataByDate === null) {
            self.setState({
              ByDateCreatDate: "",
              ByDateSelectDate: "",
              selectedSlaDueByDate: 0,
              selectedTicketStatusByDate: 0
            });
          } else {
            //debugger;
            if (dataSearch.searchDataByDate.Ticket_CreatedOn !== "") {
              let createdDate = dataSearch.searchDataByDate.Ticket_CreatedOn;
              let createdDateArray = createdDate.split("-");
              var createdDateFinal = new Date(
                createdDateArray[0],
                createdDateArray[1] - 1,
                createdDateArray[2]
              );
            }
            if (dataSearch.searchDataByDate.Ticket_ModifiedOn !== "") {
              let modifiedDate = dataSearch.searchDataByDate.Ticket_ModifiedOn;
              let modifiedDateArray = modifiedDate.split("-");
              var modifiedDateFinal = new Date(
                modifiedDateArray[0],
                modifiedDateArray[1] - 1,
                modifiedDateArray[2]
              );
            }
            self.setState({
              ByDateCreatDate: createdDateFinal,
              ByDateSelectDate: modifiedDateFinal,
              selectedSlaDueByDate: dataSearch.searchDataByDate.SLA_DueON,
              selectedTicketStatusByDate:
                dataSearch.searchDataByDate.Ticket_StatusID,
              byCategoryFlag: 0,
              allFlag: 0
            });
          }

          if (dataSearch.searchDataByCustomerType === null) {
            self.setState({
              MobileNoByCustType: "",
              EmailIdByCustType: "",
              TicketIdByCustType: "",
              selectedTicketStatusByCustomer: 0
            });
          } else {
            self.setState({
              MobileNoByCustType:
                dataSearch.searchDataByCustomerType.CustomerMobileNo,
              EmailIdByCustType:
                dataSearch.searchDataByCustomerType.CustomerEmailID,
              TicketIdByCustType: dataSearch.searchDataByCustomerType.TicketID,
              selectedTicketStatusByCustomer:
                dataSearch.searchDataByCustomerType.TicketStatusID,
              byCategoryFlag: 0,
              allFlag: 0
            });
          }

          if (dataSearch.searchDataByTicketType === null) {
            self.setState({
              selectedPriority: 0,
              selectedTicketStatusByTicket: 0,
              selectedChannelOfPurchase: [],
              selectedTicketActionType: []
            });
          } else {
            let purchaseArr = [];
            let purchaseId = dataSearch.searchDataByTicketType.ChannelOfPurchaseIds.split(
              ","
            );
            for (let i = 0; i < purchaseId.length - 1; i++) {
              const element = purchaseId[i];
              for (
                let j = 0;
                j < self.state.ChannelOfPurchaseData.length;
                j++
              ) {
                if (
                  element ==
                  self.state.ChannelOfPurchaseData[j].channelOfPurchaseID
                ) {
                  purchaseArr.push(self.state.ChannelOfPurchaseData[j]);
                }
              }
            }

            let actionArr = [];
            let actionId = dataSearch.searchDataByTicketType.ActionTypes.split(
              ","
            );
            for (let i = 0; i < actionId.length - 1; i++) {
              const element = actionId[i];
              for (let j = 0; j < self.state.TicketActionTypeData.length; j++) {
                if (
                  element ===
                  self.state.TicketActionTypeData[j].ticketActionTypeID
                ) {
                  actionArr.push(self.state.TicketActionTypeData[j]);
                }
              }
            }

            self.setState({
              selectedPriority:
                dataSearch.searchDataByTicketType.TicketPriorityID,
              selectedTicketStatusByTicket:
                dataSearch.searchDataByTicketType.TicketStatusID,
              selectedChannelOfPurchase: purchaseArr,
              selectedTicketActionType: actionArr,
              byCategoryFlag: 0,
              allFlag: 0
            });
          }

          if (dataSearch.searchDataByCategoryType === null) {
            self.setState({
              selectedCategory: 0,
              selectedSubCategory: 0,
              selectedIssueType: 0,
              selectedTicketStatusByCategory: 0
            });
          } else {
            // self.setState({
            //   selectedCategory: dataSearch.searchDataByCategoryType.CategoryId,
            //   selectedSubCategory: dataSearch.searchDataByCategoryType.SubCategoryId,
            //   selectedIssueType: dataSearch.searchDataByCategoryType.IssueTypeId,
            //   selectedTicketStatusByCategory: dataSearch.searchDataByCategoryType.TicketStatusID
            // });
            self.setState(
              {
                selectedCategory:
                  dataSearch.searchDataByCategoryType.CategoryId,
                byCategoryFlag: 4,
                allFlag: 0,
                selectedTicketStatusByCategory:
                  dataSearch.searchDataByCategoryType.TicketStatusID
              },
              () => {
                self.handleGetSubCategoryList("categoryTab");
              }
            );
            self.setState(
              {
                selectedSubCategory:
                  dataSearch.searchDataByCategoryType.SubCategoryId
              },
              () => {
                self.handleGetIssueTypeList("categoryTab");
              }
            );
            self.setState({
              selectedIssueType: dataSearch.searchDataByCategoryType.IssueTypeId
            });
          }

          if (dataSearch.SearchDataByAll === null) {
            self.setState({
              ByAllCreateDate: "",
              selectedTicketSource: 0,
              ClaimIdByAll: "",
              EmailByAll: "",
              ByAllLastDate: "",
              TicketIdTitleByAll: "",
              InvoiceSubOrderByAll: "",
              MobileByAll: "",
              selectedCategoryAll: 0,
              selectedPriorityAll: 0,
              ItemIdByAll: "",
              selectedAssignedTo: 0,
              selectedAssignedToAll: "",
              selectedSubCategoryAll: 0,
              selectedTicketStatusAll: 0,
              selectedVisitStoreAll: "all",
              selectedPurchaseStoreCodeAddressAll: "",
              selectedIssueTypeAll: 0,
              selectedSlaStatus: 0,
              selectedWantToVisitStoreAll: "all",
              selectedVisitStoreCodeAddressAll: "",
              selectedWithClaimAll: "no",
              selectedClaimStatus: 0,
              selectedClaimCategory: 0,
              selectedClaimSubCategory: 0,
              selectedClaimIssueType: 0,
              selectedWithTaskAll: "no",
              selectedTaskStatus: 0,
              selectedDepartment: 0,
              selectedFunction: 0
            });
          } else {
            if (dataSearch.SearchDataByAll.CreatedDate !== "") {
              let createdDate = dataSearch.SearchDataByAll.CreatedDate;
              let createdDateArray = createdDate.split("-");
              let createdDateFinal = new Date(
                createdDateArray[0],
                createdDateArray[1] - 1,
                createdDateArray[2]
              );
            }
            if (dataSearch.SearchDataByAll.ModifiedDate !== "") {
              let modifiedDate = dataSearch.SearchDataByAll.ModifiedDate;
              let modifiedDateArray = modifiedDate.split("-");
              let modifiedDateFinal = new Date(
                modifiedDateArray[0],
                modifiedDateArray[1] - 1,
                modifiedDateArray[2]
              );
            }
            self.setState({
              ByAllCreateDate: createdDateFinal,
              selectedTicketSource:
                dataSearch.SearchDataByAll.TicketSourceTypeID,
              ClaimIdByAll: dataSearch.SearchDataByAll.ClaimId,
              EmailByAll: dataSearch.SearchDataByAll.CustomerEmailID,
              ByAllLastDate: modifiedDateFinal,
              TicketIdTitleByAll: dataSearch.SearchDataByAll.TicketIdORTitle,
              InvoiceSubOrderByAll:
                dataSearch.SearchDataByAll.InvoiceNumberORSubOrderNo,
              MobileByAll: dataSearch.SearchDataByAll.CustomerMobileNo,
              // selectedCategoryAll: dataSearch.SearchDataByAll.CategoryId,
              selectedPriorityAll: dataSearch.SearchDataByAll.PriorityId,
              ItemIdByAll: dataSearch.SearchDataByAll.OrderItemId,
              selectedAssignedTo: dataSearch.SearchDataByAll.AssignTo,
              // selectedSubCategoryAll: dataSearch.SearchDataByAll.SubCategoryId,
              selectedTicketStatusAll:
                dataSearch.SearchDataByAll.TicketSatutsID,
              selectedVisitStoreAll: dataSearch.SearchDataByAll.IsVisitStore,
              selectedPurchaseStoreCodeAddressAll:
                dataSearch.SearchDataByAll.StoreCodeORAddress,
              // selectedIssueTypeAll: dataSearch.SearchDataByAll.IssueTypeId,
              selectedSlaStatus: dataSearch.SearchDataByAll.SLAStatus,
              selectedWantToVisitStoreAll:
                dataSearch.SearchDataByAll.IsWantVistingStore,
              selectedVisitStoreCodeAddressAll:
                dataSearch.SearchDataByAll.WantToStoreCodeORAddress,
              selectedWithClaimAll:
                dataSearch.SearchDataByAll.HaveClaim === 0 ? "no" : "yes",
              selectedClaimStatus: dataSearch.SearchDataByAll.ClaimStatusId,
              // selectedClaimCategory: dataSearch.SearchDataByAll.ClaimCategoryId,
              // selectedClaimSubCategory:
              //   dataSearch.SearchDataByAll.ClaimSubCategoryId,
              // selectedClaimIssueType: dataSearch.SearchDataByAll.ClaimIssueTypeId,
              selectedWithTaskAll:
                dataSearch.SearchDataByAll.HaveTask === 0 ? "no" : "yes",
              selectedTaskStatus: dataSearch.SearchDataByAll.TaskStatusId
              // selectedDepartment: dataSearch.SearchDataByAll.TaskDepartment_Id,
              // selectedFunction: dataSearch.SearchDataByAll.TaskFunction_Id
            });
            self.setState(
              {
                selectedCategoryAll: dataSearch.SearchDataByAll.CategoryId,
                byCategoryFlag: 0,
                allFlag: 5
              },
              () => {
                self.handleGetSubCategoryList("allTab");
              }
            );
            self.setState(
              {
                selectedSubCategoryAll: dataSearch.SearchDataByAll.SubCategoryId
              },
              () => {
                self.handleGetIssueTypeList("allTab");
              }
            );
            self.setState({
              selectedIssueTypeAll: dataSearch.SearchDataByAll.IssueTypeId
            });
            self.setState(
              {
                selectedDepartment: dataSearch.SearchDataByAll.TaskDepartment_Id
              },
              () => {
                self.handleGetFunctionList();
              }
            );
            self.setState({
              selectedFunction: dataSearch.SearchDataByAll.TaskFunction_Id
            });
            self.setState(
              {
                selectedClaimCategory:
                  dataSearch.SearchDataByAll.ClaimCategoryId
              },
              () => {
                self.handleGetClaimSubCategoryList();
              }
            );
            self.setState(
              {
                selectedClaimSubCategory:
                  dataSearch.SearchDataByAll.ClaimSubCategoryId
              },
              () => {
                self.handleGetClaimIssueTypeList();
              }
            );
            self.setState({
              selectedClaimIssueType:
                dataSearch.SearchDataByAll.ClaimIssueTypeId
            });
          }
        } else {
          self.setState({ SearchTicketData: [], loading: false });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });
    // if (e.target.value !== "") {
    if (this.state.sortColumnName === "status") {
      var sortFilterTicketData = matchSorter(
        this.state.sortTicketData,
        e.target.value,
        { keys: ["ticketStatus"] }
      );
      if (sortFilterTicketData.length > 0) {
        this.setState({ sortFilterTicketData });
      } else {
        this.setState({ sortFilterTicketData: this.state.sortTicketData });
      }
    }
    if (this.state.sortColumnName === "category") {
      var sortFilterCategoryData = matchSorter(
        this.state.sortCategoryData,
        e.target.value,
        { keys: ["category"] }
      );
      if (sortFilterCategoryData.length > 0) {
        this.setState({ sortFilterCategoryData });
      } else {
        this.setState({
          sortFilterCategoryData: this.state.sortCategoryData
        });
      }
    }
    if (this.state.sortColumnName === "priority") {
      var sortFilterPriorityData = matchSorter(
        this.state.sortPriorityData,
        e.target.value,
        { keys: ["priority"] }
      );
      if (sortFilterPriorityData.length > 0) {
        this.setState({ sortFilterPriorityData });
      } else {
        this.setState({
          sortFilterPriorityData: this.state.sortPriorityData
        });
      }
    }

    if (this.state.sortColumnName === "createdOn") {
      var sortFiltercreatedOnData = matchSorter(
        this.state.sortcreatedOnData,
        e.target.value,
        { keys: ["createdOn"] }
      );
      if (sortFiltercreatedOnData.length > 0) {
        this.setState({ sortFiltercreatedOnData });
      } else {
        this.setState({
          sortFiltercreatedOnData: this.state.sortcreatedOnData
        });
      }
    }
    if (this.state.sortColumnName === "assignedTo") {
      var sortFilterAssigneeData = matchSorter(
        this.state.sortAssigneeData,
        e.target.value,
        { keys: ["assignedTo"] }
      );
      if (sortFilterAssigneeData.length > 0) {
        this.setState({ sortFilterAssigneeData });
      } else {
        this.setState({
          sortFilterAssigneeData: this.state.sortAssigneeData
        });
      }
    }
    // }
  }
  render() {
    const { DraftDetails, SearchAssignData, SearchTicketData } = this.state;

    const TitleChange = this.state.collapseSearch
      ? "Close Search"
      : "Search Tickets";

    const ImgChange = this.state.collapseSearch ? (
      <img className="search-icon" src={CancalImg} alt="search-icon" />
    ) : (
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
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
              <div className="sort-sctn">
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
                <div className="d-flex">
                  <a
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
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
                      onChange={this.setSortCheckStatus.bind(
                        this,
                        "all",
                        "value"
                      )}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumnName === "status"
                    ? this.state.sortFilterTicketData !== null &&
                      this.state.sortFilterTicketData.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.ticketStatus}
                            value={item.ticketStatus}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "status",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.ticketStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.ticketStatus}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumnName === "category"
                    ? this.state.sortFilterCategoryData !== null &&
                      this.state.sortFilterCategoryData.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.category}
                            value={item.category}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "category",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.category}>
                            <span className="table-btn table-blue-btn">
                              {item.category}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumnName === "priority"
                    ? this.state.sortFilterPriorityData !== null &&
                      this.state.sortFilterPriorityData.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.priority}
                            value={item.priority}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "priority",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.priority}>
                            <span className="table-btn table-blue-btn">
                              {item.priority}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumnName === "createdOn"
                    ? this.state.sortFiltercreatedOnData !== null &&
                      this.state.sortFiltercreatedOnData.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdOn}
                            value={item.createdOn}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdOn",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdOn}>
                            <span className="table-btn table-blue-btn">
                              {item.createdOn}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumnName === "assignedTo"
                    ? this.state.sortFilterAssigneeData !== null &&
                      this.state.sortFilterAssigneeData.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.assignedTo}
                            value={item.assignedTo}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "assignedTo",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.assignedTo}>
                            <span className="table-btn table-blue-btn">
                              {item.assignedTo}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className="filter-type filter-color">
                <p>FILTER BY COLOR</p>

                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-red"
                    name="isRed"
                    // value="isEscalation"
                    value={this.state.isRed}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-red">
                    <span className="fil-color-red fil-color-bg"></span>
                  </label>
                </div>

                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-orange"
                    name="isYellow"
                    // value="isSLANearBreach"
                    value={this.state.isYellow}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-orange">
                    <span className="fil-color-orange fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-white"
                    name="isWhite"
                    // value="white"
                    value={this.state.isWhite}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-white">
                    <span className="fil-color-white fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-green"
                    name="isGreen"
                    value={this.state.isGreen}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-green">
                    <span className="fil-color-green fil-color-bg"></span>
                  </label>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="myticketlist-header" style={{ marginTop: "-21px" }}>
          <div className="setting-tabs esc esc1">
            <ul
              className="nav nav-tabs upper-tabs es"
              role="tablist"
              style={{ display: "inline" }}
            >
              <li
                className="nav-item"
                style={{ display: this.state.Escalation }}
              >
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="true"
                  name="Escalation"
                  onClick={() => {
                    this.handleSearchTicket("Escalation");
                  }}
                >
                  Escalation:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byEscalationCount < 9
                      ? "0" + this.state.byEscalationCount
                      : this.state.byEscalationCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.New }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="New"
                  onClick={() => {
                    this.handleSearchTicket("New");
                  }}
                >
                  New:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byNewCount < 9
                      ? "0" + this.state.byNewCount
                      : this.state.byNewCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Open }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Open"
                  onClick={() => {
                    this.handleSearchTicket("Open");
                  }}
                >
                  Open:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byOpenCount < 9
                      ? "0" + this.state.byOpenCount
                      : this.state.byOpenCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Resolved }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Resolved"
                  onClick={() => {
                    this.handleSearchTicket("Resolved");
                  }}
                >
                  Resolved:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byResolvedCount < 9
                      ? "0" + this.state.byResolvedCount
                      : this.state.byResolvedCount}
                  </span>
                </a>
              </li>

              <li className="nav-item" style={{ display: this.state.Closed }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Closed"
                  onClick={() => {
                    this.handleSearchTicket("Closed");
                  }}
                >
                  Closed:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byClosedCount < 9
                      ? "0" + this.state.byClosedCount
                      : this.state.byClosedCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.ReOpen }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="ReOpen"
                  onClick={() => {
                    this.handleSearchTicket("ReOpen");
                  }}
                >
                  Reopen:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byReOpenCount < 9
                      ? "0" + this.state.byReOpenCount
                      : this.state.byReOpenCount}
                  </span>
                </a>
              </li>
              <li
                className="nav-item"
                style={{ display: this.state.ReassignedByMe }}
              >
                <a
                  // style={{ display: this.state.ReassignedByMe }}
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Reassigned"
                  onClick={() => {
                    this.handleSearchTicket("Reassigned");
                  }}
                >
                  Reassigned by me:
                  <span className="myTciket-tab-span">
                    {this.state.byReassignedCount < 9
                      ? "0" + this.state.byReassignedCount
                      : this.state.byReassignedCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.All }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="All"
                  onClick={() => {
                    this.handleSearchTicket("All");
                  }}
                >
                  All:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byAllCount < 9
                      ? "0" + this.state.byAllCount
                      : this.state.byAllCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.FollowUp }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="FollowUp"
                  onClick={() => {
                    this.handleSearchTicket("FollowUp");
                  }}
                >
                  Follow Up:
                  <span className="myTciket-tab-span">
                    {this.state.byFollowUpCount < 9
                      ? "0" + this.state.byFollowUpCount
                      : this.state.byFollowUpCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Draft }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Draft-tab"
                  role="tab"
                  aria-controls="Draft-tab"
                  aria-selected="false"
                  onClick={this.handleGetDraftDetails}
                >
                  Draft:
                  <span className="myTciket-tab-span">
                    {this.state.draftCountStatus < 9
                      ? "0" + this.state.draftCountStatus
                      : this.state.draftCountStatus}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mlistbtn">
              {/* <button
                className="myTicket-btn-A"
                type="button"
                onClick={this.handleAssignModalOpen.bind(this)}
              >
                ASSIGN
              </button> */}
              {this.state.SearchTicketData.length > 0 ? (
                <div>
                  {this.state.headerActiveId === 1003 ? (
                    <label
                      className="clrFlwUp"
                      onClick={this.handleSearchClearFollowUp.bind(this)}
                    >
                      Clear FollowUp
                    </label>
                  ) : null}
                </div>
              ) : null}

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
                  <div
                    className="table-cntr mt-3 mtictab table-responsive"
                    style={{ overflow: "initial" }}
                  >
                    <div>
                      <Collapse isOpen={this.state.collapseSearch}>
                        <Card>
                          <CardBody>
                            <div className="myticlist-expand-sect">
                              <div className="position-relative">
                                <ul
                                  className="nav nav-tabs lower-tabs"
                                  role="tablist"
                                >
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-toggle="tab"
                                      href="#date-tab"
                                      role="tab"
                                      aria-controls="date-tab"
                                      aria-selected="true"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      By Date
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#customer-tab"
                                      role="tab"
                                      aria-controls="customer-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      By Customer Type
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#ticket-tab"
                                      role="tab"
                                      aria-controls="ticket-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      By Ticket Type
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#category-tab"
                                      role="tab"
                                      aria-controls="category-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      By Category
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#all-tab"
                                      role="tab"
                                      aria-controls="all-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      All
                                    </a>
                                  </li>
                                </ul>
                                <div className="save-view-search">
                                  <button onClick={this.onOpenModal}>
                                    Save Search
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-inv"
                                    onClick={this.ViewSearchData.bind(this, 0)}
                                  >
                                    View Search
                                  </button>
                                </div>
                              </div>
                              <Modal
                                open={this.state.open}
                                onClose={this.onCloseModal}
                                center
                                modalId="save-search-popup"
                                overlayId="save-search-ovrly"
                              >
                                <div className="save-search">
                                  <p>SAVE SEARCH</p>
                                </div>
                                <div className="search-name">
                                  <input
                                    type="search"
                                    placeholder="Give name to your search"
                                    name="SearchName"
                                    value={this.state.SearchName}
                                    onChange={this.handelOnchangeData}
                                  />
                                  {this.state.SearchName.length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px"
                                      }}
                                    >
                                      {this.state.SearchNameCompulsory}
                                    </p>
                                  )}
                                  <button
                                    className="butn"
                                    type="button"
                                    onClick={this.SaveSearchData.bind(this)}
                                  >
                                    Save
                                  </button>
                                </div>
                                <div className="search-names">
                                  <div className="names-title">
                                    <p>Search Name</p>
                                    <p className="mar-comp">Action</p>
                                  </div>
                                  <ul>
                                    {/* <li> */}
                                    {this.state.SearchListData !== null &&
                                      this.state.SearchListData.map(
                                        (item, i) => (
                                          <li key={i}>
                                            <label value={item.searchParamID}>
                                              {item.searchName}
                                            </label>
                                            <div>
                                              <a
                                                className="applySearch"
                                                onClick={this.handleApplySearch.bind(
                                                  this,
                                                  item.searchParamID
                                                )}
                                              >
                                                APPLY
                                              </a>
                                              <img
                                                src={DelSearch}
                                                alt="del-search"
                                                className="cr-pnt"
                                                onClick={this.hadleSearchDeleteData.bind(
                                                  this,
                                                  item.searchParamID
                                                )}
                                              />
                                            </div>
                                          </li>
                                        )
                                      )}

                                    {/* </li> */}
                                  </ul>
                                </div>
                              </Modal>
                              <div className="tab-content lower-tabs-pane p-0">
                                <div
                                  className="tab-pane fade show active"
                                  id="date-tab"
                                  role="tabpanel"
                                  aria-labelledby="date-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6">
                                        <DatePicker
                                          selected={this.state.ByDateCreatDate}
                                          onChange={this.handleByDateCreate.bind(
                                            this
                                          )}
                                          placeholderText="Creation Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          autoComplete="off"
                                          value={this.state.ByDateCreatDate}
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <DatePicker
                                          selected={this.state.ByDateSelectDate}
                                          onChange={this.handleChangeSelectDate.bind(
                                            this
                                          )}
                                          placeholderText="Last Updated Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          value={this.state.ByDateSelectDate}
                                          name="ByDateSelectDate"
                                          autoComplete="off"
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state.selectedSlaDueByDate
                                          }
                                          onChange={this.handleSlaDueByDate}
                                        >
                                          <option value="0">SLA Due</option>
                                          {this.state.SlaDueData !== null &&
                                            this.state.SlaDueData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.slaDueID}
                                                >
                                                  {item.slaDueName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedTicketStatusByDate
                                          }
                                          onChange={
                                            this.handleTicketStatusByDate
                                          }
                                        >
                                          <option value="0">
                                            Ticket Status
                                          </option>
                                          {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketStatusID}
                                                >
                                                  {item.ticketStatusName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="customer-tab"
                                  role="tabpanel"
                                  aria-labelledby="customer-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Customer Mobile No"
                                          name="MobileNoByCustType"
                                          value={this.state.MobileNoByCustType}
                                          onChange={this.handelOnchangeData}
                                          autoComplete="off"
                                          maxLength={10}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          type="text"
                                          className="no-bg"
                                          placeholder="Customer Email ID"
                                          name="EmailIdByCustType"
                                          autoComplete="off"
                                          value={this.state.EmailIdByCustType}
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          type="text"
                                          className="no-bg"
                                          placeholder="Ticket ID"
                                          name="TicketIdByCustType"
                                          maxLength={9}
                                          autoComplete="off"
                                          value={this.state.TicketIdByCustType}
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedTicketStatusByCustomer
                                          }
                                          onChange={
                                            this.handleTicketStatusByCustomer
                                          }
                                        >
                                          <option value="0">
                                            Ticket Status
                                          </option>
                                          {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketStatusID}
                                                >
                                                  {item.ticketStatusName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="ticket-tab"
                                  role="tabpanel"
                                  aria-labelledby="ticket-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedPriority}
                                          onChange={this.setPriorityValue}
                                        >
                                          <option value="0">Priority</option>
                                          {this.state.TicketPriorityData !==
                                            null &&
                                            this.state.TicketPriorityData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.priorityID}
                                                >
                                                  {item.priortyName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedTicketStatusByTicket
                                          }
                                          onChange={
                                            this.handleTicketStatusByTicket
                                          }
                                        >
                                          <option value="0">
                                            Ticket Status
                                          </option>
                                          {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketStatusID}
                                                >
                                                  {item.ticketStatusName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={option =>
                                              option.nameOfChannel
                                            }
                                            getOptionValue={option =>
                                              option.channelOfPurchaseID
                                            }
                                            options={
                                              this.state.ChannelOfPurchaseData
                                            }
                                            placeholder="Channel Of Purchase"
                                            // menuIsOpen={true}
                                            closeMenuOnSelect={false}
                                            onChange={this.setChannelOfPurchaseValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedChannelOfPurchase
                                            }
                                            // showNewOptionAtTop={false}
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={option =>
                                              option.ticketActionTypeName
                                            }
                                            getOptionValue={option =>
                                              option.ticketActionTypeID
                                            }
                                            options={
                                              this.state.TicketActionTypeData
                                            }
                                            placeholder="Ticket Action Type"
                                            // menuIsOpen={true}
                                            closeMenuOnSelect={false}
                                            onChange={this.setTicketActionTypeValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketActionType
                                            }
                                            // showNewOptionAtTop={false}
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="category-tab"
                                  role="tabpanel"
                                  aria-labelledby="category-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedCategory}
                                          onChange={this.setCategoryValue}
                                        >
                                          <option value={0}>Category</option>
                                          {this.state.CategoryData !== null &&
                                            this.state.CategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.categoryID}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedSubCategory}
                                          onChange={this.setSubCategoryValue}
                                        >
                                          <option value={0}>
                                            Sub Category
                                          </option>
                                          {this.state.SubCategoryData !==
                                            null &&
                                            this.state.SubCategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.subCategoryID}
                                                >
                                                  {item.subCategoryName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedIssueType}
                                          onChange={this.setIssueTypeValue}
                                        >
                                          <option value="0">Issue Type</option>
                                          {this.state.IssueTypeData !== null &&
                                            this.state.IssueTypeData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.issueTypeID}
                                                >
                                                  {item.issueTypeName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedTicketStatusByCategory
                                          }
                                          onChange={
                                            this.handleTicketStatusByCategory
                                          }
                                        >
                                          <option value="0">
                                            Ticket Status
                                          </option>
                                          {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketStatusID}
                                                >
                                                  {item.ticketStatusName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="all-tab"
                                  role="tabpanel"
                                  aria-labelledby="all-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6 allspc">
                                        <DatePicker
                                          selected={this.state.ByAllCreateDate}
                                          placeholderText="Creation Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          value={this.state.ByAllCreateDate}
                                          onChange={this.handleAllCreateDate.bind(
                                            this
                                          )}
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state.selectedTicketSource
                                          }
                                          onChange={this.setTicketSourceValue}
                                        >
                                          <option>Ticket Source</option>
                                          {this.state.TicketSourceData !==
                                            null &&
                                            this.state.TicketSourceData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketSourceId}
                                                >
                                                  {item.ticketSourceName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Claim ID"
                                          value={this.state.ClaimIdByAll}
                                          name="ClaimIdByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Email"
                                          value={this.state.EmailByAll}
                                          name="EmailByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6 allspc">
                                        <DatePicker
                                          selected={this.state.ByAllLastDate}
                                          onChange={this.handleAllLastDate.bind(
                                            this
                                          )}
                                          placeholderText="Last Updated Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          value={this.state.ByAllLastDate}
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Ticket Id/Title"
                                          value={this.state.TicketIdTitleByAll}
                                          name="TicketIdTitleByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Invoice Number/Sub Order No"
                                          autoComplete="off"
                                          value={
                                            this.state.InvoiceSubOrderByAll
                                          }
                                          name="InvoiceSubOrderByAll"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Mobile"
                                          value={this.state.MobileByAll}
                                          name="MobileByAll"
                                          autoComplete="off"
                                          maxLength={10}
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6 allspc">
                                        <select
                                          value={this.state.selectedCategoryAll}
                                          onChange={this.setCategoryAllValue}
                                        >
                                          <option value="0">Category</option>
                                          {this.state.CategoryData !== null &&
                                            this.state.CategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.categoryID}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedPriorityAll}
                                          onChange={this.setPriorityAllValue}
                                        >
                                          <option>Ticket Priority</option>
                                          {this.state.TicketPriorityData !==
                                            null &&
                                            this.state.TicketPriorityData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.priorityID}
                                                >
                                                  {item.priortyName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Item ID"
                                          value={this.state.ItemIdByAll}
                                          name="ItemIdByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          className="add-select-category"
                                          value={this.state.selectedAssignedTo}
                                          onChange={this.setAssignedToValue}
                                        >
                                          <option value={0}>
                                            Select Assigned To
                                          </option>
                                          {this.state.AssignToData !== null &&
                                            this.state.AssignToData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.userID}
                                                >
                                                  {item.fullName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6 allspc">
                                        <select
                                          value={
                                            this.state.selectedSubCategoryAll
                                          }
                                          onChange={this.setSubCategoryAllValue}
                                        >
                                          <option value="0">
                                            Sub Category
                                          </option>
                                          {this.state.SubCategoryAllData !==
                                            null &&
                                            this.state.SubCategoryAllData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.subCategoryID}
                                                >
                                                  {item.subCategoryName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state.selectedTicketStatusAll
                                          }
                                          onChange={this.handleTicketStatusAll}
                                        >
                                          <option>Ticket Status</option>
                                          {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketStatusID}
                                                >
                                                  {item.ticketStatusName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state.selectedVisitStoreAll
                                          }
                                          onChange={this.handleVisitStoreAll}
                                        >
                                          <option value="all">
                                            Did Visit Store : All
                                          </option>
                                          <option value="yes">
                                            Did Visit Store : Yes
                                          </option>
                                          <option value="no">
                                            Did Visit Store : No
                                          </option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Purchase Store Code/Address"
                                          value={
                                            this.state
                                              .selectedPurchaseStoreCodeAddressAll
                                          }
                                          onChange={
                                            this
                                              .handlePurchaseStoreCodeAddressAll
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state.selectedIssueTypeAll
                                          }
                                          onChange={this.setIssueTypeAllValue}
                                        >
                                          <option value="0">Issue Type</option>
                                          {this.state.IssueTypeAllData !==
                                            null &&
                                            this.state.IssueTypeAllData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.issueTypeID}
                                                >
                                                  {item.issueTypeName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedSlaStatus}
                                          onChange={this.setSlaStatusValue}
                                        >
                                          <option value="0">SLA Due</option>
                                          {this.state.SlaDueData !== null &&
                                            this.state.SlaDueData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.slaDueID}
                                                >
                                                  {item.slaDueName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedWantToVisitStoreAll
                                          }
                                          onChange={
                                            this.handleWantToVisitStoreAll
                                          }
                                        >
                                          <option value="all">
                                            Want to Visit Store : All
                                          </option>
                                          <option value="yes">
                                            Want to Visit Store : Yes
                                          </option>
                                          <option value="no">
                                            Want to Visit Store : No
                                          </option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Want to visit Store Code/Address"
                                          value={
                                            this.state
                                              .selectedVisitStoreCodeAddressAll
                                          }
                                          onChange={
                                            this.handleVisitStoreCodeAddressAll
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="row p-0">
                                      <div className="col-md-6">
                                        <div className="row allspc">
                                          <div className="col-sm-6">
                                            <div className="m-b-25">
                                              <select
                                                value={
                                                  this.state
                                                    .selectedWithClaimAll
                                                }
                                                onChange={
                                                  this.handleWithClaimAll
                                                }
                                              >
                                                <option value="no">
                                                  With Claim : No
                                                </option>
                                                <option value="yes">
                                                  With Claim : Yes
                                                </option>
                                              </select>
                                            </div>
                                            {this.state.selectedWithClaimAll ===
                                            "yes" ? (
                                              <React.Fragment>
                                                <div className="m-b-25">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedClaimStatus
                                                    }
                                                    onChange={
                                                      this.handleClaimStatus
                                                    }
                                                  >
                                                    <option>
                                                      Claim Status
                                                    </option>
                                                    {this.state
                                                      .ClaimStatusData !==
                                                      null &&
                                                      this.state.ClaimStatusData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.claimStatusID
                                                            }
                                                          >
                                                            {
                                                              item.claimStatusName
                                                            }
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>

                                                <div className="m-b-25">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedClaimCategory
                                                    }
                                                    onChange={
                                                      this.setClaimCategoryValue
                                                    }
                                                  >
                                                    <option value="0">
                                                      Claim Category
                                                    </option>
                                                    {this.state.CategoryData !==
                                                      null &&
                                                      this.state.CategoryData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.categoryID
                                                            }
                                                          >
                                                            {item.categoryName}
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>

                                                <div className="m-b-25">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedClaimSubCategory
                                                    }
                                                    onChange={
                                                      this
                                                        .setClaimSubCategoryValue
                                                    }
                                                  >
                                                    <option value={0}>
                                                      Claim Sub Category
                                                    </option>
                                                    {this.state
                                                      .ClaimSubCategoryData !==
                                                      null &&
                                                      this.state.ClaimSubCategoryData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.subCategoryID
                                                            }
                                                          >
                                                            {
                                                              item.subCategoryName
                                                            }
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>

                                                <div className="">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedClaimIssueType
                                                    }
                                                    onChange={
                                                      this
                                                        .setClaimIssueTypeValue
                                                    }
                                                  >
                                                    <option value="0">
                                                      Claim Issue Type
                                                    </option>
                                                    {this.state
                                                      .ClaimIssueTypeData !==
                                                      null &&
                                                      this.state.ClaimIssueTypeData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.issueTypeID
                                                            }
                                                          >
                                                            {item.issueTypeName}
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>
                                              </React.Fragment>
                                            ) : null}
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="m-b-25">
                                              <select
                                                value={
                                                  this.state.selectedWithTaskAll
                                                }
                                                onChange={
                                                  this.handleWithTaskAll
                                                }
                                              >
                                                <option value="no">
                                                  With Task : No
                                                </option>
                                                <option value="yes">
                                                  With Task : Yes
                                                </option>
                                              </select>
                                            </div>

                                            {this.state.selectedWithTaskAll ===
                                            "yes" ? (
                                              <React.Fragment>
                                                <div className="m-b-25">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedTaskStatus
                                                    }
                                                    onChange={
                                                      this.handleTaskStatus
                                                    }
                                                  >
                                                    <option>Task Status</option>
                                                    {this.state
                                                      .TaskStatusData !==
                                                      null &&
                                                      this.state.TaskStatusData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.taskStatusID
                                                            }
                                                          >
                                                            {
                                                              item.taskStatusName
                                                            }
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>

                                                <div className="m-b-25">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedDepartment
                                                    }
                                                    onChange={
                                                      this.setDepartmentValue
                                                    }
                                                  >
                                                    <option>
                                                      Task Department
                                                    </option>
                                                    {this.state
                                                      .DepartmentData !==
                                                      null &&
                                                      this.state.DepartmentData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.departmentID
                                                            }
                                                          >
                                                            {
                                                              item.departmentName
                                                            }
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>

                                                <div className="">
                                                  <select
                                                    value={
                                                      this.state
                                                        .selectedFunction
                                                    }
                                                    onChange={
                                                      this.setFunctionValue
                                                    }
                                                  >
                                                    <option>
                                                      Task Function
                                                    </option>
                                                    {this.state.FunctionData !==
                                                      null &&
                                                      this.state.FunctionData.map(
                                                        (item, i) => (
                                                          <option
                                                            key={i}
                                                            value={
                                                              item.functionID
                                                            }
                                                          >
                                                            {item.funcationName}
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>
                                              </React.Fragment>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container-fluid myticlist-expand-sect">
                                <div className="row common-adv-padd justify-content-between">
                                  <div className="col-auto d-flex align-items-center">
                                    <p className="font-weight-bold mr-3">
                                      <span className="blue-clr">
                                        {this.state.resultCount < 10
                                          ? "0" + this.state.resultCount
                                          : this.state.resultCount}
                                        &nbsp;
                                      </span>
                                      Results
                                    </p>
                                    <p
                                      className="blue-clr fs-14"
                                      onClick={this.clearSearch}
                                    >
                                      CLEAR SEARCH
                                    </p>
                                    &nbsp; &nbsp; &nbsp;
                                    <p
                                      className="blue-clr fs-14"
                                      onClick={this.setSortCheckStatus.bind(
                                        this,
                                        "all"
                                      )}
                                    >
                                      CLEAR FILTER
                                    </p>
                                  </div>
                                  <div className="col-auto mob-mar-btm">
                                    <CSVLink
                                      // className="csv-button"
                                      className={
                                        this.state.SearchTicketData.length > 0
                                          ? "csv-button"
                                          : "csv-button csv-dis-btn"
                                      }
                                      data={this.state.CSVDownload}
                                      filename="Tickets_Data.csv"
                                    >
                                      <img
                                        className="position-relative csv-icon"
                                        src={csv}
                                        alt="csv-icon"
                                      />
                                      CSV
                                    </CSVLink>
                                    {/* <button
                                      type="button"
                                      onClick={this.ScheduleOpenModel}
                                    >
                                      <img
                                        className="sch-icon"
                                        src={Schedule}
                                        alt="schedule-icon"
                                      />
                                      Schedule
                                    </button> */}
                                    <Modal
                                      onClose={this.ScheduleCloseModel}
                                      open={this.state.Schedule}
                                      modalId="ScheduleModel"
                                      classNames={{
                                        modal: "schedule-width"
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
                                              getOptionLabel={option =>
                                                option.fullName
                                              }
                                              getOptionValue={
                                                option => option.userID //id
                                              }
                                              options={
                                                this.state.TeamMemberData
                                              }
                                              placeholder="Team Member"
                                              // menuIsOpen={true}
                                              closeMenuOnSelect={false}
                                              onChange={this.setTeamMember.bind(
                                                this
                                              )}
                                              value={
                                                this.state.selectedTeamMember
                                              }
                                              // showNewOptionAtTop={false}
                                              isMulti
                                            />
                                          </div>
                                          <select
                                            id="inputState"
                                            className="form-control dropdown-setting1 ScheduleDate-to"
                                            value={
                                              this.state.selectScheduleDate
                                            }
                                            onChange={
                                              this.handleScheduleDateChange
                                            }
                                          >
                                            {this.state.ScheduleOption !==
                                              null &&
                                              this.state.ScheduleOption.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.scheduleID}
                                                  >
                                                    {item.scheduleName}
                                                  </option>
                                                )
                                              )}
                                          </select>
                                          {this.state.selectScheduleDate ===
                                          "230" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  Every
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={this.handleDailyDay}
                                                />
                                                <label className="every1">
                                                  Day
                                                </label>
                                              </span>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                          "231" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  Every
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={this.handleWeekly}
                                                />
                                                <label className="every1">
                                                  Week on
                                                </label>
                                              </span>
                                              <div
                                                style={{
                                                  marginTop: "10px"
                                                }}
                                              >
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Mon"
                                                >
                                                  Mon
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Tue"
                                                >
                                                  Tue
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Wed"
                                                >
                                                  Wed
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Thu"
                                                >
                                                  Thu
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Fri"
                                                >
                                                  Fri
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Sat"
                                                >
                                                  Sat
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Sun"
                                                >
                                                  Sun
                                                </Checkbox>
                                              </div>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                          "232" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  Day
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="9"
                                                  onChange={
                                                    this.handleDaysForMonth
                                                  }
                                                />
                                                <label className="every1">
                                                  of every
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={
                                                    this.handleMonthForMonth
                                                  }
                                                />
                                                <label className="every1">
                                                  months
                                                </label>
                                              </span>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                          "233" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  Every
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={
                                                    this.handleMonthForWeek
                                                  }
                                                />
                                                <label className="every1">
                                                  month on the
                                                </label>
                                              </span>
                                              <div className="row mt-3">
                                                <div className="col-md-6">
                                                  <select
                                                    id="inputState"
                                                    className="form-control dropdown-setting1"
                                                    onChange={
                                                      this.handleWeekForWeek
                                                    }
                                                    value={
                                                      this.state
                                                        .selectedNoOfWeekForWeek
                                                    }
                                                  >
                                                    <option value="0">
                                                      Select
                                                    </option>
                                                    <option value="2">
                                                      Second
                                                    </option>
                                                    <option value="4">
                                                      Four
                                                    </option>
                                                  </select>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={option =>
                                                        option.days
                                                      }
                                                      getOptionValue={
                                                        option => option.days //id
                                                      }
                                                      options={
                                                        this.state
                                                          .NameOfDayForWeek
                                                      }
                                                      placeholder="Select"
                                                      // menuIsOpen={true}
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfDayForWeek.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfDayForWeek
                                                      }
                                                      // showNewOptionAtTop={false}
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                          "234" ? (
                                            <div className="ScheduleDate-to">
                                              <div className="row m-0">
                                                <label
                                                  className="every1"
                                                  style={{
                                                    lineHeight: "40px"
                                                  }}
                                                >
                                                  on
                                                </label>
                                                <div className="col-md-7">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={option =>
                                                        option.month
                                                      }
                                                      getOptionValue={
                                                        option => option.month //id
                                                      }
                                                      options={
                                                        this.state
                                                          .NameOfMonthForYear
                                                      }
                                                      placeholder="Select"
                                                      // menuIsOpen={true}
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfMonthForYear.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfMonthForYear
                                                      }
                                                      // showNewOptionAtTop={false}
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={
                                                    this.handleDayForYear
                                                  }
                                                />
                                              </div>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                          "235" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <div className="row m-0">
                                                  <label
                                                    className="every1"
                                                    style={{
                                                      lineHeight: "40px"
                                                    }}
                                                  >
                                                    on the
                                                  </label>
                                                  <div className="col-md-7">
                                                    <select
                                                      id="inputState"
                                                      className="form-control dropdown-setting1"
                                                      onChange={
                                                        this.handleWeekForYear
                                                      }
                                                      value={
                                                        this.state
                                                          .selectedNoOfWeekForYear
                                                      }
                                                    >
                                                      <option value="0">
                                                        Select
                                                      </option>
                                                      <option value="2">
                                                        Second
                                                      </option>
                                                      <option value="4">
                                                        Four
                                                      </option>
                                                    </select>
                                                  </div>
                                                </div>
                                              </span>
                                              <div
                                                className="row mt-3"
                                                style={{ position: "relative" }}
                                              >
                                                <div className="col-md-6">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={option =>
                                                        option.days
                                                      }
                                                      getOptionValue={
                                                        option => option.days //id
                                                      }
                                                      options={
                                                        this.state
                                                          .NameOfDayForYear
                                                      }
                                                      placeholder="Select"
                                                      // menuIsOpen={true}
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfDayForYear.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfDayForYear
                                                      }
                                                      // showNewOptionAtTop={false}
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                                <label
                                                  className="every1 last-to"
                                                  style={{
                                                    lineHeight: "40px"
                                                  }}
                                                >
                                                  to
                                                </label>
                                                <div className="col-md-6">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={option =>
                                                        option.month
                                                      }
                                                      getOptionValue={
                                                        option => option.month //id
                                                      }
                                                      options={
                                                        this.state
                                                          .NameOfMonthForDailyYear
                                                      }
                                                      placeholder="Select"
                                                      // menuIsOpen={true}
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfMonthForDailyYear.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfMonthForDailyYear
                                                      }
                                                      // showNewOptionAtTop={false}
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ) : null}

                                          <div className="dash-timepicker">
                                            <DatePicker
                                              selected={
                                                this.state.selectedScheduleTime
                                              }
                                              onChange={this.handleScheduleTime.bind(
                                                this
                                              )}
                                              placeholderText="11 AM"
                                              showTimeSelect
                                              showTimeSelectOnly
                                              timeIntervals={60}
                                              timeCaption="Select Time"
                                              dateFormat="h:mm aa"
                                              className="txt-1 txt1Place txt1Time"
                                              value={
                                                this.state.selectedScheduleTime
                                              }
                                            />
                                          </div>
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0",
                                              textAlign: "center"
                                            }}
                                          >
                                            {this.state.scheduleRequired}
                                          </p>
                                          <div>
                                            <button
                                              className="scheduleBtn"
                                              onClick={this.handleSchedulePopup}
                                            >
                                              <label className="addLable">
                                                SCHEDULE
                                              </label>
                                            </button>
                                          </div>
                                          <div
                                            onClick={this.ScheduleCloseModel}
                                          >
                                            <button
                                              type="button"
                                              className="scheduleBtncancel"
                                            >
                                              CANCEL
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </Modal>
                                    {/* <button
                                      className={
                                        this.state.ticketIds.length > 0
                                          ? "btn-inv"
                                          : "dis-btn"
                                      }
                                      onClick={
                                        this.state.ticketIds.length > 0
                                          ? this.handleAssignModalOpen.bind(
                                            this
                                          )
                                          : null
                                      }
                                    >
                                      <img
                                        src={Assign}
                                        className="assign-icon"
                                        alt="assign-icon"
                                      />
                                      Assign
                                    </button> */}
                                    <Modal
                                      onClose={this.handleAssignModalClose.bind(
                                        this
                                      )}
                                      open={this.state.AssignModal}
                                      modalId="AssignPop-up"
                                    >
                                      <div className="assign-modal-headerDashboard">
                                        <img
                                          src={BlackLeftArrow}
                                          alt="black-left-arrow-icon"
                                          className="black-left-arrow"
                                          onClick={this.handleAssignModalClose.bind(
                                            this
                                          )}
                                        />
                                        <label className="claim-details">
                                          Assign Tickets To
                                        </label>
                                        <img
                                          src={SearchBlackImg}
                                          alt="SearchBlack"
                                          className="black-left-arrow srch-mleft-spc"
                                        />
                                      </div>
                                      <div className="assign-modal-div">
                                        <input
                                          type="text"
                                          className="txt-1 txt-btmSpace"
                                          placeholder="First Name"
                                          name="assignFirstName"
                                          value={this.state.assignFirstName}
                                          onChange={this.handelOnchangeData}
                                        />
                                        <input
                                          type="text"
                                          className="txt-1 txt-btmSpace"
                                          placeholder="Last Name"
                                          name="assignLastName"
                                          value={this.state.assignLastName}
                                          onChange={this.handelOnchangeData}
                                        />
                                        <input
                                          type="text"
                                          className="txt-1 txt-btmSpace"
                                          placeholder="Email"
                                          name="assignEmail"
                                          value={this.state.assignEmail}
                                          onChange={this.handelOnchangeData}
                                        />
                                        <div className="txt-btmSpace">
                                          <select
                                            id="inputState"
                                            className="form-control dropdown-setting"
                                            value={
                                              this.state.selectedDesignation
                                            }
                                            onChange={this.setDesignationValue}
                                          >
                                            {/* <option>Select</option> */}
                                            <option>Designation</option>
                                            {this.state.DesignationData !==
                                              null &&
                                              this.state.DesignationData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.designationID}
                                                  >
                                                    {item.designationName}
                                                  </option>
                                                )
                                              )}
                                          </select>
                                        </div>
                                        <button
                                          className="butn assign-btn"
                                          type="button"
                                          onClick={this.handleAssignSearchData.bind(
                                            this
                                          )}
                                        >
                                          SEARCH
                                        </button>
                                        <a
                                          href="#!"
                                          className="anchorTag-clear"
                                          onClick={this.handleAssignClearData.bind(
                                            this
                                          )}
                                        >
                                          CLEAR
                                        </a>
                                      </div>
                                      <div className="assign-modal-body assign-modal-body-mytick">
                                        <ReactTable
                                          data={SearchAssignData}
                                          columns={[
                                            {
                                              Header: <span>Agent</span>,
                                              accessor: "agent",
                                              minWidth: 190,
                                              Cell: row => {
                                                var ids =
                                                  row.original["user_ID"];
                                                return (
                                                  <div>
                                                    <span>
                                                      <img
                                                        src={Headphone2Img}
                                                        alt="headphone"
                                                        className="oval-55 assign-hdphone"
                                                        id={ids}
                                                      />
                                                      {
                                                        row.original[
                                                          "agentName"
                                                        ]
                                                      }
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            },
                                            {
                                              Header: <span>Designation</span>,
                                              accessor: "designation"
                                              // width: 130,
                                            },
                                            {
                                              Header: <span>Email</span>,
                                              accessor: "email",
                                              minWidth: 250,
                                              maxWidth: "auto"
                                            }
                                          ]}
                                          // resizable={false}
                                          className="assign-ticket-table"
                                          defaultPageSize={5}
                                          minRows={3}
                                          // showPagination={false}
                                          getTrProps={(rowInfo, column) => {
                                            const index = column
                                              ? column.index
                                              : -1;
                                            return {
                                              onClick: e => {
                                                //debugger;
                                                this.selectedRow = index;
                                                var agentId =
                                                  column.original["user_ID"];
                                                this.setState({
                                                  agentId,
                                                  agentSelection: ""
                                                });
                                              },
                                              style: {
                                                background:
                                                  this.selectedRow === index
                                                    ? "#ECF2F4"
                                                    : null
                                              }
                                            };
                                          }}
                                        />
                                        <p
                                          style={{
                                            marginTop:
                                              this.state.agentSelection === ""
                                                ? "0px"
                                                : "10px",
                                            color: "red",
                                            marginBottom: "0",
                                            textAlign: "center"
                                          }}
                                        >
                                          {this.state.agentSelection}
                                        </p>
                                        {/* <div className="position-relative">
                                            <div className="pagi">
                                              <ul>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    &lt;
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    1
                                                  </a>
                                                </li>
                                                <li className="active">
                                                  <a href={Demo.BLANK_LINK}>
                                                    2
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    3
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    4
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    5
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    6
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href={Demo.BLANK_LINK}>
                                                    &gt;
                                                  </a>
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
                                        <textarea
                                          className="assign-modal-textArea"
                                          placeholder="Add Remarks"
                                          onChange={this.handleAssignRemark}
                                        ></textarea>
                                        <button
                                          className="assign-butn btn-assign-tikcet w-100"
                                          type="button"
                                          onClick={this.handleAssignTickets}
                                        >
                                          ASSIGN TICKETS
                                        </button>
                                      </div>
                                    </Modal>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                    {this.state.loading === true ? (
                      <div className="loader-icon-cntr">
                        <div className="loader-icon"></div>
                      </div>
                    ) : (
                      <div>
                        <div className="MyTicketListReact cus-head">
                          <ReactTable
                            data={SearchTicketData}
                            columns={[
                              {
                                Header: (
                                  <span>
                                    <div className="filter-type pink1 pinkmyticket">
                                      <div className="filter-checkbox pink2 pinkmargin">
                                        <input
                                          type="checkbox"
                                          id="fil-aball"
                                          name="ListCheckbox"
                                          // checked={this.state.CheckBoxChecked}
                                          onChange={this.checkAllCheckbox.bind(
                                            this
                                          )}
                                        />
                                        <label
                                          htmlFor="fil-aball"
                                          className="ticketid"
                                        >
                                          ID
                                        </label>
                                      </div>
                                    </div>
                                  </span>
                                ),
                                accessor: "ticketID",
                                Cell: row => {
                                  return (
                                    <span onClick={e => this.clickCheckbox(e)}>
                                      <div className="filter-type pink1 pinkmyticket">
                                        <div className="filter-checkbox pink2 pinkmargin">
                                          <input
                                            type="checkbox"
                                            id={"i" + row.original.ticketID}
                                            name="ListCheckbox"
                                            checked={
                                              this.state.cSelectedRow[
                                                row.original.ticketID
                                              ]
                                            }
                                            attrIds={row.original.ticketID}
                                            onChange={() =>
                                              this.handelCheckBoxCheckedChange(
                                                row.original.ticketID
                                              )
                                            }
                                          />
                                          <label
                                            htmlFor={
                                              "i" + row.original.ticketID
                                            }
                                          >
                                            {row.original.ticketSourceType ===
                                            "Calls" ? (
                                              <img
                                                src={HeadPhone3}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="Calls"
                                              />
                                            ) : row.original
                                                .ticketSourceType ===
                                              "Mails" ? (
                                              <img
                                                src={MailImg}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="Mails"
                                              />
                                            ) : row.original
                                                .ticketSourceType ===
                                              "Facebook" ? (
                                              <img
                                                src={FacebookImg}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="Facebook"
                                              />
                                            ) : row.original
                                                .ticketSourceType ===
                                              "ChatBot" ? (
                                              <img
                                                src={Chat}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="ChatBot"
                                              />
                                            ) : row.original
                                                .ticketSourceType ===
                                              "Twitter" ? (
                                              <img
                                                src={Twitter}
                                                alt="HeadPhone"
                                                className="headPhone3 black-twitter"
                                                title="Twitter"
                                              />
                                            ) : null}

                                            {row.original.ticketID}
                                          </label>
                                        </div>
                                      </div>
                                    </span>
                                  );
                                }
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.statusColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "status",
                                      "Status"
                                    )}
                                  >
                                    Status{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "ticketStatus",
                                Cell: row => {
                                  if (row.original.ticketStatus === "Open") {
                                    return (
                                      <span className="table-b table-blue-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "Resolved"
                                  ) {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "New"
                                  ) {
                                    return (
                                      <span className="table-b table-yellow-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "Solved"
                                  ) {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  }
                                }
                              },
                              {
                                Header: <span></span>,
                                accessor: "taskStatus",
                                width: 45,
                                Cell: row => {
                                  if (row.original.claimStatus !== "0/0") {
                                    return (
                                      <div>
                                        <Popover
                                          content={
                                            <div className="dash-task-popup-new">
                                              <div className="d-flex justify-content-between align-items-center">
                                                <p className="m-b-0">
                                                  CLAIM:
                                                  {row.original.claimStatus}
                                                </p>
                                                <div className="d-flex align-items-center">
                                                  2 NEW
                                                  <div className="nw-chat">
                                                    <img
                                                      src={Chat}
                                                      alt="chat"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <ProgressBar
                                                className="task-progress"
                                                now={70}
                                              />
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="task-icon-1 marginimg claim-icon-1"
                                            src={CliamIconBlue}
                                            alt="task-icon-blue"
                                          />
                                        </Popover>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div>
                                        <img
                                          className="task-icon-1 marginimg claim-icon-1"
                                          src={CliamIconGray}
                                          alt="task-icon-gray"
                                        />
                                      </div>
                                    );
                                  }
                                }
                              },
                              {
                                Header: <span></span>,
                                accessor: "taskStatus",
                                width: 45,
                                Cell: row => {
                                  if (row.original.taskStatus === "0/0") {
                                    return (
                                      <div>
                                        <img
                                          className="task-icon-1 marginimg"
                                          src={TaskIconGray}
                                          alt="task-icon-gray"
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div>
                                        <Popover
                                          content={
                                            <div className="dash-task-popup-new">
                                              <div className="d-flex justify-content-between align-items-center">
                                                <p className="m-b-0">
                                                  TASK:{row.original.taskStatus}
                                                </p>
                                                {row.original
                                                  .ticketCommentCount > 0 ? (
                                                  <div className="d-flex align-items-center">
                                                    {
                                                      row.original
                                                        .ticketCommentCount
                                                    }
                                                    NEW
                                                    <div className="nw-chat">
                                                      <img
                                                        src={Chat}
                                                        alt="chat"
                                                      />
                                                    </div>
                                                  </div>
                                                ) : null}
                                              </div>
                                              <ProgressBar
                                                className="task-progress"
                                                now={70}
                                              />
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="task-icon-1 marginimg"
                                            src={TaskIconBlue}
                                            alt="task-icon-blue"
                                          />
                                        </Popover>
                                      </div>
                                    );
                                  }
                                }
                              },
                              {
                                Header: (
                                  <label className="ticketid">
                                    <span>Subject/</span>
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "11px !important"
                                      }}
                                    >
                                      Latest Message
                                    </span>
                                  </label>
                                ),
                                accessor: "message",
                                Cell: row => {
                                  return (
                                    <div>
                                      {row.original.message.split("-")[0]}
                                      /&nbsp;
                                      <span style={{ color: "#666" }}>
                                        {row.original.message.split("-")[1]}
                                      </span>
                                    </div>
                                  );
                                }
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.categoryColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "category",
                                      "Category"
                                    )}
                                  >
                                    Category{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "category",
                                Cell: row => (
                                  <span className="one-line-outer">
                                    <label className="one-line">
                                      {row.original.category}{" "}
                                    </label>

                                    <Popover
                                      content={
                                        <div className="dash-creation-popup-cntr">
                                          <ul className="dash-category-popup dashnewpopup">
                                            <li>
                                              <p>Category</p>
                                              <p>{row.original.category}</p>
                                            </li>
                                            <li>
                                              <p>Sub Category</p>
                                              <p>{row.original.subCategory}</p>
                                            </li>
                                            <li>
                                              <p>Type</p>
                                              <p>{row.original.issueType}</p>
                                            </li>
                                          </ul>
                                        </div>
                                      }
                                      placement="bottom"
                                    >
                                      <img
                                        className="info-icon"
                                        src={InfoIcon}
                                        alt="info-icon"
                                      />
                                    </Popover>
                                  </span>
                                )
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.priorityColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "priority",
                                      "Priority"
                                    )}
                                  >
                                    Priority{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "priority",
                                minWidth: 50
                                // Cell: props => <span>High</span>
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.assignColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "assignedTo",
                                      "Assign To"
                                    )}
                                  >
                                    Assignee{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "assignee"
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.creationColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "createdOn",
                                      "Creation On"
                                    )}
                                  >
                                    Creation On{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "createdOn",
                                Cell: row => {
                                  return (
                                    <span className="one-line-outer">
                                      <label className="one-line">
                                        {row.original.createdOn}
                                      </label>
                                      <Popover
                                        content={
                                          <div className="insertpop1">
                                            <ul className="dash-creation-popup">
                                              <li className="title">
                                                Creation details
                                              </li>
                                              <li>
                                                <p>
                                                  {row.original.createdBy}{" "}
                                                  Created
                                                </p>
                                                <p>{row.original.createdago}</p>
                                              </li>
                                              <li>
                                                <p>
                                                  Assigned to{" "}
                                                  {row.original.assignedTo}
                                                </p>
                                                <p>
                                                  {row.original.assignedago}
                                                </p>
                                              </li>
                                              <li>
                                                <p>
                                                  {row.original.updatedBy}
                                                  updated
                                                </p>
                                                <p>{row.original.updatedago}</p>
                                              </li>
                                              <li>
                                                <p>
                                                  Response time remaining by
                                                </p>
                                                <p>
                                                  {
                                                    row.original
                                                      .responseTimeRemainingBy
                                                  }
                                                </p>
                                              </li>

                                              <li>
                                                <p>Response overdue by</p>
                                                <p>
                                                  {
                                                    row.original
                                                      .responseOverdueBy
                                                  }
                                                </p>
                                              </li>
                                              <li>
                                                <p>Resolution overdue by</p>
                                                <p>
                                                  {
                                                    row.original
                                                      .resolutionOverdueBy
                                                  }
                                                </p>
                                              </li>
                                            </ul>
                                          </div>
                                        }
                                        placement="left"
                                      >
                                        <img
                                          className="info-icon info-iconcus"
                                          src={InfoIcon}
                                          alt="info-icon"
                                        />
                                      </Popover>
                                    </span>
                                  );
                                }
                              }
                            ]}
                            resizable={false}
                            defaultPageSize={10}
                            showPagination={true}
                            getTrProps={this.HandleRowClickPage}
                            minRows={2}
                            defaultSorted={[
                              {
                                id: "ticketID",
                                desc: true
                              }
                            ]}
                          />
                        </div>
                        <div
                          className="float-search"
                          onClick={this.toggleSearch}
                        >
                          <small>{TitleChange}</small>
                          {ImgChange}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="Draft-tab"
                role="tabpanel"
                aria-labelledby="Draft-tab"
              >
                <MyTicketDraft draftData={DraftDetails} />
              </div>
            </div>
          </div>
        </div>
        {/* <NotificationContainer /> */}
      </Fragment>
    );
  }
}

export default withRouter(MyTicketList);
