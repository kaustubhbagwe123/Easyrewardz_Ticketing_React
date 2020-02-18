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
// import CallImg from "./../assets/Images/call.png";
import MailImg from "./../assets/Images/msg.png";
import FacebookImg from "./../assets/Images/facebook.png";
// import Demo from "../store/Hashtag.js";
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
import Schedule from "./../assets/Images/schedule.png";
import Assign from "./../assets/Images/assign.png";
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
      // CategoryDataAll: [],
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
      resultCount: 0,
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
      agentSelection: ""
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
  }

  componentDidMount() {
    debugger;
    this.handleSearchTicketAllTabCount();
    this.handleSearchTicket();
    this.handleGetDesignationList();
    this.handleGetTicketPriorityList();
    this.handleGetChannelOfPurchaseList();
    this.handleGetTicketSourceList();
    this.handleGetCategoryList();
    this.handleGetSlaStatusList();
    this.handleGetAssignTo();
    this.handleGetDraftDetails();
    this.handleGetDepartmentList();
    this.handleMyTicketsearchOption();
  }

  handleMyTicketsearchOption() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: 9
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data1 = res.data.responseData;
      if (status === "Success") {
        self.setState({ modulesItemsMyticket: data1 });
        self.setMyTicketSearch(data1);
      } else {
        self.setState({ modulesItemsMyticket: [] });
      }
    });
  }

  setMyTicketSearch(data1) {
    debugger;
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

  handleSearchTicketAllTabCount() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/TicketStatusCount",
      headers: authHeader()
    }).then(function(res) {
      debugger;
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
    });
  }

  handleSearchTicket(TabId) {
    debugger;
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
    // var data = ticketStatus;
    this.setState({ loading: true });
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnPageLoad",
      headers: authHeader(),
      params: {
        HeaderStatusID: ticketStatus
      }
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      let CSVData = data;
      let Status = res.data.message;
      if (Status === "Success") {
        self.setState({ SearchTicketData: data, loading: false });
        for (let i = 0; i < CSVData.length; i++) {
          delete CSVData[i].totalpages;
          delete CSVData[i].responseTimeRemainingBy;
          delete CSVData[i].responseOverdueBy;
          delete CSVData[i].resolutionOverdueBy;
          delete CSVData[i].ticketCommentCount;
        }
        self.setState({ CSVDownload: CSVData });
      } else {
        self.setState({ SearchTicketData: [], loading: false });
      }
    });
  }

  handleSchedulePopup() {
    debugger;
    // if (this.state.selectedTeamMember.length > 0 && ) {

    // }
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

  handleSchedulePopupSuccess() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Schedule",
      headers: authHeader(),
      data: {
        SearchInputParams:this.state.FinalSaveSearchData,
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
    }).then(function(res) {
      debugger;
      let messageData = res.data.message;
      if (messageData === "Success") {
        self.ScheduleCloseModel();
        NotificationManager.success("Scheduled successfully.");
        self.setState({
          scheduleRequired: ""
        });
      }
    });
  }

  handleAssignRemark(e) {
    debugger;
    this.setState({
      agentRemark: e.currentTarget.value
    });
  }
  handleDailyDay(e) {
    debugger;
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
    debugger;
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
    debugger;
    this.setState({
      selectedScheduleTime: e
    });
  }
  handleAssignTickets() {
    debugger;
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
      }).then(function(res) {
        debugger;
        let messageData = res.data.message;
        if (messageData === "Success") {
          self.handleAssignModalClose();
          NotificationManager.success("Tickets assigned successfully.");
          self.handleSearchTicket();
        }
      });
    } else {
      this.setState({
        agentSelection: "Agent Selection is required"
      });
    }
  }

  clearSearch() {
    debugger;
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
          resultCount: 0
        },
        () => {
          this.ViewSearchData(1);
          this.handleGetSubCategoryList();
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
          resultCount: 0
        },
        () => {
          this.ViewSearchData(1);
          this.handleGetSubCategoryList();
          this.handleGetClaimSubCategoryList();
        }
      );
    }
  }

  handleAdvSearchFlag(e) {
    debugger;
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
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetDraftDetails",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let details = res.data.responseData;
      let status = res.data.message;
      if (status === "Success") {
        self.setState({ DraftDetails: details });
      } else {
        self.setState({ DraftDetails: [] });
      }
    });
  }
  handleGetDepartmentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      let status = res.data.message;
      if (status === "Success") {
        self.setState({ DepartmentData: data });
      } else {
        self.setState({ DepartmentData: [] });
      }
    });
  }
  handleGetFunctionList() {
    debugger;

    let self = this;
    self.setState({ FunctionData: [], selectedFunction: 0 });

    axios({
      method: "post",
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment
      }
    }).then(function(res) {
      debugger;
      let FunctionData = res.data.responseData;
      self.setState({ FunctionData: FunctionData });
    });
  }

  setScheduleFor = e => {
    let scheduleForValue = e.currentTarget.value;
    this.setState({ selectedScheduleFor: scheduleForValue });
  };

  handleGetDesignationList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      let status = res.data.message;
      if (status === "Success") {
        self.setState({ DesignationData: data });
      } else {
        self.setState({ DesignationData: [] });
      }
    });
  }
  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      let stastus = res.data.message;
      if (stastus === "Success") {
        self.setState({ TicketPriorityData: data });
      } else {
        self.setState({ TicketPriorityData: [] });
      }
    });
  }
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let ChannelOfPurchaseData = res.data.responseData;
      self.setState({ ChannelOfPurchaseData: ChannelOfPurchaseData });
    });
  }
  handleGetTicketSourceList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader()
    }).then(function(res) {
      debugger;
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
    });
  }
  handleGetSlaStatusList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLAStatusList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      self.setState({
        SlaStatusData: data
      });
    });
  }
  handleGetCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data;

      if (data !== null) {
        self.setState({
          CategoryData: data
        });
      }
    });
  }
  handleGetClaimSubCategoryList() {
    debugger;
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
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      self.setState({
        ClaimSubCategoryData: data
      });
    });
  }
  handleGetSubCategoryList() {
    debugger;
    let self = this;
    self.setState({
      SubCategoryData: [],
      SubCategoryAllData: [],
      selectedSubCategory: 0,
      selectedSubCategoryAll: 0,
      IssueTypeData: [],
      IssueTypeAllData: [],
      selectedIssueType: 0,
      selectedIssueTypeAll: 0
    });
    let cateId =
      this.state.byCategoryFlag === 4
        ? this.state.selectedCategory
        : this.state.selectedCategoryAll;

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: cateId
      }
    }).then(function(res) {
      debugger;
      var data = res.data.responseData;
      if (self.state.byCategoryFlag === 4) {
        self.setState({
          SubCategoryData: data
        });
      } else if (self.state.allFlag === 5) {
        self.setState({
          SubCategoryAllData: data
        });
      }
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
    }).then(function(res) {
      debugger;
      let ClaimIssueTypeData = res.data.responseData;
      self.setState({ ClaimIssueTypeData: ClaimIssueTypeData });
    });
  }
  handleGetIssueTypeList() {
    let self = this;
    self.setState({
      IssueTypeData: [],
      IssueTypeAllData: [],
      selectedIssueType: 0,
      selectedIssueTypeAll: 0
    });
    let subCateId =
      this.state.byCategoryFlag === 4
        ? this.state.selectedSubCategory
        : this.state.selectedSubCategoryAll;

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: subCateId
      }
    }).then(function(res) {
      debugger;
      // let IssueTypeData = res.data.responseData;
      // self.setState({ IssueTypeData: IssueTypeData });
      if (self.state.byCategoryFlag === 4) {
        var IssueTypeData = res.data.responseData;
        self.setState({
          IssueTypeData: IssueTypeData
        });
      } else if (self.state.allFlag === 5) {
        var IssueTypeAllData = res.data.responseData;
        self.setState({
          IssueTypeAllData: IssueTypeAllData
        });
      }
    });
  }
  handleAssignSearchData() {
    debugger;
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
    }).then(function(res) {
      debugger;
      let SearchAssignData = res.data.responseData;
      self.setState({
        SearchAssignData: SearchAssignData,
        assignFirstName: "",
        assignLastName: "",
        assignEmail: "",
        // selectedDesignation: 0
      });
    });
  }
  handleAssignClearData() {
    debugger;
    this.setState({
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedDesignation: 0
    });
  }

  SaveSearchData() {
    debugger;
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
      }).then(function(res) {
        debugger;
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Save Search parameter successfully.");
          self.handleGetSaveSearchList();
          self.setState({
            SearchName: ""
          });
        }
      });
    } else {
      self.setState({
        SearchNameCompulsory: "Please Enter Search Name."
      });
    }
  }
  handleGetSaveSearchList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/listSavedSearch",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      self.setState({ SearchListData: data });
    });
  }
  hadleSearchDeleteData(searchDeletId) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/deletesavedsearch",
      headers: authHeader(),
      params: {
        SearchParamID: searchDeletId
      }
    }).then(function(res) {
      debugger;
      let Msg = res.data.message;
      if (Msg === "Success") {
        NotificationManager.success("Saved search data deleted successfully.");
        self.handleGetSaveSearchList();
      }
    });
  }
  ViewSearchData(clrSrch) {
    debugger;
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
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      let CSVData = data;
      let count = 0;
      if (res.data.responseData != null) {
        count = res.data.responseData.length;
      }

      if (status === "Success") {
        if (data !== null) {
          for (let i = 0; i < CSVData.length; i++) {
            delete CSVData[i].totalpages;
            delete CSVData[i].responseTimeRemainingBy;
            delete CSVData[i].responseOverdueBy;
            delete CSVData[i].resolutionOverdueBy;
            delete CSVData[i].ticketCommentCount;
          }
          self.setState({ CSVDownload: CSVData });
          self.setState({
            SearchTicketData: data
          });
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
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTeamMember = e => {
    debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, s => s.fullName)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };
  setNameOfDayForWeek = e => {
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
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
    debugger;
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategory: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
  };
  setClaimCategoryValue = e => {
    let claimCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimCategory: claimCategoryValue });
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        this.handleGetClaimSubCategoryList();
      }
    }, 1);
  };
  setCategoryAllValue = e => {
    let categoryAllValue = e.currentTarget.value;
    this.setState({ selectedCategoryAll: categoryAllValue });
    setTimeout(() => {
      if (this.state.selectedCategoryAll) {
        this.handleGetSubCategoryList();
      }
    }, 1);
  };
  setSubCategoryValue = e => {
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategory: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
  };
  setClaimSubCategoryValue = e => {
    let claimSubCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimSubCategory: claimSubCategoryValue });

    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetClaimIssueTypeList();
      }
    }, 1);
  };
  setSubCategoryAllValue = e => {
    let subCategoryAllValue = e.currentTarget.value;
    this.setState({ selectedSubCategoryAll: subCategoryAllValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryAll) {
        this.handleGetIssueTypeList();
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

  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }
  toggleSearch() {
    debugger
    this.handleGetSaveSearchList()
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
  }
  handleByDateCreate(date) {
    debugger;
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
  hanleChange_MyTicket = () => {
    this.props.history.push("/admin/myticket");
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  clickCheckbox(evt) {
    evt.stopPropagation();
  }

  setSortCheckStatus = e => {
    debugger;

    var itemsArray = [];
    var data = e.currentTarget.value;
    if (data === "open") {
      itemsArray = this.state.SearchTicketData.filter(
        a => a.ticketStatus === "Open"
      );
    } else if (data === "resolved") {
      itemsArray = this.state.SearchTicketData.filter(
        a => a.ticketStatus === "Resolved"
      );
    } else if (data === "solved") {
      itemsArray = this.state.SearchTicketData.filter(
        a => a.ticketStatus === "Solved"
      );
    } else if (data === "new") {
      itemsArray = this.state.SearchTicketData.filter(
        a => a.ticketStatus === "New"
      );
    }

    this.setState({
      SearchTicketData: itemsArray
    });
    this.StatusCloseModel();
  };

  sortStatusAtoZ() {
    debugger;
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
    debugger;
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
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
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
    });
  }

  handelCheckBoxCheckedChange = async () => {
    debugger;
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
    await this.setState({
      ticketIds: strIds
    });
  };

  checkAllCheckbox = async event => {
    debugger;
    var strIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("ListCheckbox");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strIds = "";
    }
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
    return {
      onClick: e => {
        debugger;
        let Id = column.original["ticketID"];
        // this.props.history.push("myticket");
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
      }
    };
  };
  handleScheduleDateChange = e => {
    debugger;
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
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnSavedSearch",
      headers: authHeader(),
      params: {
        SearchParamID: paramsID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      let count = 0;
      if (res.data.responseData != null) {
        count = res.data.responseData.length;
      }
      if (status === "Success") {
        self.setState({ SearchTicketData: data, resultCount: count });
        self.onCloseModal();
      } else {
        self.setState({ SearchTicketData: [] });
      }
    });
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
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-open"
                    name="filter-type"
                    value="open"
                    onChange={this.setSortCheckStatus}
                  />
                  <label htmlFor="fil-open">
                    <span className="table-btn table-blue-btn">Open</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-new"
                    name="filter-type"
                    value="new"
                    onChange={this.setSortCheckStatus}
                  />
                  <label htmlFor="fil-new">
                    <span className="table-btn table-yellow-btn">New</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-solved"
                    name="filter-type"
                    value="solved"
                    onChange={this.setSortCheckStatus}
                  />
                  <label htmlFor="fil-solved">
                    <span className="table-btn table-green-btn">Solved</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-solved"
                    name="filter-type"
                    value="resolved"
                    onChange={this.setSortCheckStatus}
                  />
                  <label htmlFor="fil-solved">
                    <span className="table-btn table-green-btn">Resolved</span>
                  </label>
                </div>
              </div>
              <div className="filter-type filter-color">
                <p>FILTER BY COLOR</p>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-red" name="filter-color" />
                  <label htmlFor="fil-red">
                    <span className="fil-color-red fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-orange" name="filter-color" />
                  <label htmlFor="fil-orange">
                    <span className="fil-color-orange fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-white" name="filter-color" />
                  <label htmlFor="fil-white">
                    <span className="fil-color-white fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-green" name="filter-color" />
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
              className="nav nav-tabs es"
              role="tablist"
              style={{ display: "inline" }}
            >
              <li className="nav-item" style={{ display: this.state.Escalation }}>
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
                  Follow Up:{" "}
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
                                <ul className="nav nav-tabs" role="tablist">
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
                              <div className="tab-content p-0">
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
                                          <option>
                                            SLA Status : Response / Resolution
                                          </option>
                                          {this.state.SlaStatusData !== null &&
                                            this.state.SlaStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.SLAId}
                                                >
                                                  {item.slaRequestResponse}
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
                                    <button
                                      type="button"
                                      onClick={this.ScheduleOpenModel}
                                    >
                                      <img
                                        className="sch-icon"
                                        src={Schedule}
                                        alt="schedule-icon"
                                      />
                                      Schedule
                                    </button>
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
                                    <button
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
                                    </button>
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
                                                debugger;
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
                      <div className="loader-icon"></div>
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
                                            // checked={row.original.ticketID}
                                            attrIds={row.original.ticketID}
                                            onChange={
                                              this.handelCheckBoxCheckedChange
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
                                  <span onClick={this.StatusOpenModel}>
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
                                                    }{" "}
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
                                  return <div>{row.original.message.split('-')[0]}/<span style={{color: '#666'}}>{row.original.message.split('-')[1]}</span></div>;
                                }
                              },
                              {
                                Header: (
                                  <span className="ticketid">
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
                                  <span className="ticketid">
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
                                  <span className="ticketid">
                                    Assignee{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "assignee"
                              },
                              {
                                Header: (
                                  <span className="ticketid">
                                    Creation On{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "createdOn",
                                Cell: row => (
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
                                                {row.original.createdBy} Created
                                              </p>
                                              <p>{row.original.createdago}</p>
                                            </li>
                                            <li>
                                              <p>
                                                Assigned to{" "}
                                                {row.original.assignedTo}
                                              </p>
                                              <p>{row.original.assignedago}</p>
                                            </li>
                                            <li>
                                              <p>
                                                {row.original.updatedBy} updated
                                              </p>
                                              <p>{row.original.updatedago}</p>
                                            </li>
                                            <li>
                                              <p>Response time remaining by</p>
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
                                                {row.original.responseOverdueBy}
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
                                )
                              }
                            ]}
                            // resizable={false}
                            defaultPageSize={10}
                            showPagination={true}
                            getTrProps={this.HandleRowClickPage}
                            minRows={1}
                            defaultSorted={[
                              {
                                id: "ticketID",
                                desc: true
                              }
                            ]}
                          />
                          {/* <div className="position-relative">
                                    <Popover
                                      content={
                                        <div className="insertpop1">
                                          <ul className="dash-creation-popup">
                                            <li className="title">
                                              Creation details
                                            </li>
                                            <li>
                                              <p>
                                                {row.original.createdBy} Created
                                              </p>
                                              <p>{row.original.createdago}</p>
                                            </li>
                                            <li>
                                              <p>
                                                Assigned to{" "}
                                                {row.original.assignedTo}
                                              </p>
                                              <p>{row.original.assignedago}</p>
                                            </li>
                                            <li>
                                              <p>
                                                {row.original.updatedBy} updated
                                              </p>
                                              <p>{row.original.updatedago}</p>
                                            </li>
                                            <li>
                                              <p>Response time remaining by</p>
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
                                                {row.original.responseOverdueBy}
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
                                        className="info-icon"
                                        src={InfoIcon}
                                        alt="info-icon"
                                      />
                                    </Popover>
                                  </span>
                                )
                              }
                            ]}
                            // resizable={false}
                            defaultPageSize={10}
                            showPagination={true}
                            getTrProps={this.HandleRowClickPage}
                            minRows={2}
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
        <NotificationContainer />
      </Fragment>
    );
  }
}

export default MyTicketList;
