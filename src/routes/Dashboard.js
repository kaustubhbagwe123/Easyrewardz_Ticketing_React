import React, { Component, Fragment } from "react";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import SearchIcon from "./../assets/Images/search-icon.png";
import Dash from "./../assets/Images/dash.png";
import CollapseIcon from "./../assets/Images/collapse.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import Sorting from "./../assets/Images/sorting.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import CliamIconGray from "./../assets/Images/claim-icon-gray.png";
import Chat from "./../assets/Images/chat.png";
import Twitter from "./../assets/Images/twitter.png";
import csv from "./../assets/Images/csv.png";
import Schedule from "./../assets/Images/schedule.png";
import Assign from "./../assets/Images/assign.png";
import CancalImg from "./../assets/Images/cancal blue.png";
import DelSearch from "./../assets/Images/del-search.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import MailImg from "./../assets/Images/msg.png";
import FacebookImg from "./../assets/Images/facebook.png";
import { Collapse, CardBody, Card } from "reactstrap";
import MultiBarChart from "../Component/PieChart/MultiBarChart.js";
import TicketToBillBarGraph from "../Component/PieChart/TicketToBillBarGraph";
import TicketGenerationSourceBar from "../Component/PieChart/TicketGenerationSourceBar";
import TicketToClaimMultiBar from "../Component/PieChart/TicketToClaimMultiBar";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import DatePicker from "react-datepicker";
import OpenByPriorityPie from "../Component/PieChart/PieChart";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover } from "antd";
import { Checkbox } from "antd";
import moment from "moment";
import ScheduleDateDropDown from "./ScheduleDateDropDown";
import Select from "react-select";
import { authHeader } from "../helpers/authHeader";
import axios from "axios";
import config from "./../helpers/config";
import { NotificationManager } from "react-notifications";
import SlaDue from "./SlaDue";
import TicketStatus from "./TicketStatus";
import TicketActionType from "./TicketActionType";
import ClaimStatus from "./ClaimStatus";
import TaskStatus from "./TaskStatus";
import { CSVLink } from "react-csv";
import DatePickerComponenet from "./Settings/Ticketing/DatePickerComponent";
import matchSorter from "match-sorter";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let end = moment(start).add(30, "days");
    // .subtract(1, "seconds");
    this.state = {
      start: start,
      end: end,
      collapse: true,
      collapseSearch: false,
      modalIsOpen: false,
      open: false,
      StatusModel: false,
      Schedule: false,
      AssignModal: false,
      TicketTabIndex: "nav-link active",
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      ByAllCreateDate: "",
      ByAllLastDate: "",
      selectScheduleDate: 0,
      ScheduleOption: ScheduleDateDropDown(),
      TotalNoOfChatShow: true,
      date: [new Date(), new Date()],
      range: "",
      CSVDownload: [],
      SearchTicketData: [],
      SearchListData: [],
      SlaDueData: SlaDue(),
      TicketStatusData: TicketStatus(),
      TicketPriorityData: [],
      selectedChannelOfPurchase: [],
      selectedTicketActionType: [],
      CategoryData: [],
      // CategoryDataAll: [],
      SubCategoryData: [],
      ClaimSubCategoryData: [],
      IssueTypeData: [],
      ClaimIssueTypeData: [],
      TicketSourceData: [],
      SubCategoryAllData: [],
      IssueTypeAllData: [],
      SlaStatusData: [],
      selectedTeamMember: [],
      DesignationData: [],
      byDateFlag: 1,
      byCustomerTypeFlag: 0,
      byTicketTypeFlag: 0,
      byCategoryFlag: 0,
      allFlag: 0,
      TicketActionTypeData: TicketActionType(),
      selectedWithClaimAll: "no",
      selectedWithTaskAll: "no",
      selectedVisitStoreAll: "all",
      selectedWantToVisitStoreAll: "all",
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      DepartmentData: [],
      FunctionData: [],
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedAssignedTo: 0,
      AssignToData: [],
      TeamMemberData: [
        {
          department: "Team Member 1",
        },
        {
          department: "Team Member 2",
        },
        {
          department: "Team Member 3",
        },
        {
          department: "Team Member 4",
        },
      ],
      selectedTicketStatusAll: 0,
      selectedDesignation: 0,
      ChannelOfPurchaseData: [],
      selectedPriority: 0,
      selectedPriorityAll: 0,
      selectedTicketStatusByDate: 0,
      selectedNoOfDay: 0,
      selectedScheduleTime: "",
      selectedSlaDueByDate: 0,
      selectedClaimStatus: 0,
      selectedTaskStatus: 0,
      selectedTicketStatusByCustomer: 0,
      selectedTicketStatusByTicket: 0,
      selectedTicketStatusByCategory: 0,
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
      agentId: 0,
      agentRemark: "",
      ticketIds: "",
      selectedScheduleFor: "",
      dailyDay: 0,
      isByStatus: true,
      ticketStatusId: 100,
      advPageSize: 30,
      advPageNo: 1,
      CheckBoxChecked: false,
      BrandData: [],
      AgentData: [],
      CheckBoxAllAgent: true,
      CheckBoxAllBrand: true,
      DashboardNumberData: {},
      DashboardGraphData: {},
      DashboardBillGraphData: [],
      DashboardSourceGraphData: [],
      DashboardTaskGraphData: [],
      DashboardClaimGraphData: [],
      DashboardPriorityGraphData: [],
      AgentIds: "",
      BrandIds: "",
      ActiveTabId: 1,
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
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNameOfMonthForDailyYear: [],
      selectedNameOfDayForYear: [],
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
      resultCount: 0,
      loading: false,
      SearchNameCompulsory: "",
      loadingAbove: true,
      modulesItems: [],
      FinalSaveSearchData: "",
      CreateDateShowRecord: "",
      LastUpdatedDate: "",
      Category: "",
      SubCategory: "",
      IssueType: "",
      TicketSource: "",
      TicketIDTitle: "",
      TicketPriority: "",
      TicketStatus: "",
      SLAStatus: "",
      ClaimID: "",
      InvoiceNoSubOrderNo: "",
      ItemID: "",
      Didvisitstore: "",
      Wanttovisitstore: "",
      Email: "",
      MobileNo: "",
      AssignTo: "",
      PurchaseStoreCodeAddress: "",
      scheduleRequired: "",
      agentSelection: "",
      ShowGridCheckBox: false,
      sortColumnName: "",
      sortTicketData: [],
      sortCategoryData: [],
      sortPriorityData: [],
      sortcreatedOnData: [],
      sortAssigneeData: [],
      sortAllData: [],
      cSelectedRow: {},
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
      sortHeader: "",
      moduleID: 0,
      ticketGenerationSourceFlag: false,
      ticketToBillBarFlag: false,
      openByPriorityFlag: false,
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
      isYellow: false,
      sticketStatusFilterCheckbox: "",
      scategoryFilterCheckbox: "",
      spriorityFilterCheckbox: "",
      screatedOnFilterCheckbox: "",
      sassignedToFilterCheckbox: "",
    };
    this.applyCallback = this.applyCallback.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleSearchTicketEscalation = this.handleSearchTicketEscalation.bind(
      this
    );
    this.handleTicketsOnLoad = this.handleTicketsOnLoad.bind(this);
    this.handleTicketsOnLoadLoader = this.handleTicketsOnLoadLoader.bind(this);
    this.handleAdvSearchFlag = this.handleAdvSearchFlag.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleSchedulePopup = this.handleSchedulePopup.bind(this);
    this.handleSchedulePopupSuccess = this.handleSchedulePopupSuccess.bind(
      this
    );
    this.handleAssignTickets = this.handleAssignTickets.bind(this);
    this.handelOnchangeData = this.handelOnchangeData.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleGetSaveSearchList = this.handleGetSaveSearchList.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSlaStatusList = this.handleGetSlaStatusList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetClaimSubCategoryList = this.handleGetClaimSubCategoryList.bind(
      this
    );
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
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleAssignRemark = this.handleAssignRemark.bind(this);
    this.handleDailyDay = this.handleDailyDay.bind(this);
    this.handleScheduleTime = this.handleScheduleTime.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetDashboardNumberData = this.handleGetDashboardNumberData.bind(
      this
    );
    this.handleGetDashboardGraphData = this.handleGetDashboardGraphData.bind(
      this
    );
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.checkAllAgentStart = this.checkAllAgentStart.bind(this);
    this.checkAllBrandStart = this.checkAllBrandStart.bind(this);
    this.handleDaysForMonth = this.handleDaysForMonth.bind(this);
    this.handleMonthForMonth = this.handleMonthForMonth.bind(this);
    this.handleWeekForWeek = this.handleWeekForWeek.bind(this);
    this.handleWeekForYear = this.handleWeekForYear.bind(this);
    this.handleDayForYear = this.handleDayForYear.bind(this);
    this.handleMonthForWeek = this.handleMonthForWeek.bind(this);
    this.handleWeekly = this.handleWeekly.bind(this);
    this.handleWeeklyDays = this.handleWeeklyDays.bind(this);
    this.handleAdvanceSearchOption = this.handleAdvanceSearchOption.bind(this);
  }

  componentDidMount() {
    debugger;
    // this.handleSearchTicketEscalation();   // this is called for bydefault content
    // this.handleTicketsOnLoad();
    // this.ViewSearchData();
    this.handleTicketsOnLoadLoader();
    this.handleGetDepartmentList();
    this.handleGetTicketSourceList();
    this.handleGetCategoryList();
    this.handleGetSlaStatusList();
    this.handleGetDesignationList();
    this.handleGetTicketPriorityList();
    this.handleGetChannelOfPurchaseList();
    this.handleGetBrandList();
    // this.handleGetDashboardGraphData();
    this.handleGetAgentList();
    // this.handleGetSaveSearchList();

    // this.handleGetModulesNames();
  }

  handleTicketsOnLoadLoader() {
    this.setState({ loading: true });
  }

  handleTicketsOnLoad() {
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

      // --------------------Check null date----------------------------------
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
      // --------------------Check null date----------------------------------
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

    ShowDataparam.AssigntoId = this.state.AgentIds;
    ShowDataparam.BrandId = this.state.BrandIds;
    ShowDataparam.ActiveTabId = this.state.ActiveTabId;
    ShowDataparam.searchDataByDate = dateTab;
    ShowDataparam.searchDataByCustomerType = customerType;
    ShowDataparam.searchDataByTicketType = ticketType;
    ShowDataparam.searchDataByCategoryType = categoryType;
    ShowDataparam.searchDataByAll = allTab;

    var FinalSaveSearchData = JSON.stringify(ShowDataparam);
    this.setState({
      FinalSaveSearchData,
    });
    // ----------------------------------------------------------

    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardSearchTicket",
      headers: authHeader(),
      data: {
        AssigntoId: this.state.AgentIds,
        BrandId: this.state.BrandIds,
        ActiveTabId: this.state.ActiveTabId,
        searchDataByDate: dateTab,
        searchDataByCustomerType: customerType,
        searchDataByTicketType: ticketType,
        searchDataByCategoryType: categoryType,
        searchDataByAll: allTab,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        let CSVData = data;
        let count = 0;
        if (res.data.responseData != null) {
          count = res.data.responseData.length;
        }
        if (status === "Success") {
          self.setState({
            SearchTicketData: data,

            resultCount: count,
            loading: false,
            cSelectedRow: {},
          });
          for (let i = 0; i < CSVData.length; i++) {
            delete CSVData[i].totalpages;
            // delete CSVData[i].responseTimeRemainingBy;
            // delete CSVData[i].responseOverdueBy;
            // delete CSVData[i].resolutionOverdueBy;
            // delete CSVData[i].ticketCommentCount;
          }
          self.setState({ CSVDownload: CSVData });
        } else {
          self.setState({
            SearchTicketData: [],

            resultCount: 0,
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  clickCheckbox(evt) {
    evt.stopPropagation();
  }

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

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sticketStatusFilterCheckbox = this.state.sticketStatusFilterCheckbox;
    var scategoryFilterCheckbox = this.state.scategoryFilterCheckbox;
    var spriorityFilterCheckbox = this.state.spriorityFilterCheckbox;
    var screatedOnFilterCheckbox = this.state.screatedOnFilterCheckbox;
    var sassignedToFilterCheckbox = this.state.sassignedToFilterCheckbox;

    if (column === "status" || column === "all") {
      debugger;
      if (type === "value" && type !== "All") {
        sticketStatusFilterCheckbox = sticketStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sticketStatusFilterCheckbox = sticketStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sticketStatusFilterCheckbox.includes(e.currentTarget.value)) {
          sticketStatusFilterCheckbox = sticketStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sticketStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        debugger;
        if (sticketStatusFilterCheckbox.includes("all")) {
          sticketStatusFilterCheckbox = "";
        } else {
          debugger;
          if (this.state.sortColumnName === "status") {
            for (let i = 0; i < this.state.sortTicketData.length; i++) {
              sticketStatusFilterCheckbox +=
                this.state.sortTicketData[i].ticketStatus + ",";
            }
            sticketStatusFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "category" || column === "all") {
      if (type === "value" && type !== "All") {
        scategoryFilterCheckbox = scategoryFilterCheckbox.replace("all", "");
        scategoryFilterCheckbox = scategoryFilterCheckbox.replace("all,", "");
        if (scategoryFilterCheckbox.includes(e.currentTarget.value)) {
          scategoryFilterCheckbox = scategoryFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scategoryFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryFilterCheckbox.includes("all")) {
          scategoryFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "category") {
            for (let i = 0; i < this.state.sortCategoryData.length; i++) {
              scategoryFilterCheckbox +=
                this.state.sortCategoryData[i].category + ",";
            }
            scategoryFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "priority" || column === "all") {
      if (type === "value" && type !== "All") {
        spriorityFilterCheckbox = spriorityFilterCheckbox.replace("all", "");
        spriorityFilterCheckbox = spriorityFilterCheckbox.replace("all,", "");
        if (spriorityFilterCheckbox.includes(e.currentTarget.value)) {
          spriorityFilterCheckbox = spriorityFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          spriorityFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (spriorityFilterCheckbox.includes("all")) {
          spriorityFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "priority") {
            for (let i = 0; i < this.state.sortPriorityData.length; i++) {
              spriorityFilterCheckbox +=
                this.state.sortPriorityData[i].priority + ",";
            }
            spriorityFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdOn" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace("all", "");
        screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace("all,", "");
        if (screatedOnFilterCheckbox.includes(e.currentTarget.value)) {
          screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedOnFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedOnFilterCheckbox.includes("all")) {
          screatedOnFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "createdOn") {
            for (let i = 0; i < this.state.sortcreatedOnData.length; i++) {
              screatedOnFilterCheckbox +=
                this.state.sortcreatedOnData[i].createdOn + ",";
            }
            screatedOnFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "assignedTo" || column === "all") {
      if (type === "value" && type !== "All") {
        sassignedToFilterCheckbox = sassignedToFilterCheckbox.replace(
          "all",
          ""
        );
        sassignedToFilterCheckbox = sassignedToFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sassignedToFilterCheckbox.includes(e.currentTarget.value)) {
          sassignedToFilterCheckbox = sassignedToFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sassignedToFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sassignedToFilterCheckbox.includes("all")) {
          sassignedToFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "assignedTo") {
            for (let i = 0; i < this.state.sortAssigneeData.length; i++) {
              sassignedToFilterCheckbox +=
                this.state.sortAssigneeData[i].assignedTo + ",";
            }
            sassignedToFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    // var data = "";
    this.setState({
      sticketStatusFilterCheckbox,
      scategoryFilterCheckbox,
      spriorityFilterCheckbox,
      screatedOnFilterCheckbox,
      sassignedToFilterCheckbox,
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "status") {
      var sItems = sticketStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.ticketStatus === sItems[i]
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
    } else if (column === "category") {
      var sItems = scategoryFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.category === sItems[i]
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
        categoryColor: "",
      });
    } else if (column === "priority") {
      var sItems = spriorityFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.priority === sItems[i]
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
        priorityColor: "sort-column",
      });
    } else if (column === "assignedTo") {
      var sItems = sassignedToFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.assignedTo === sItems[i]
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
        assignColor: "sort-column",
      });
    } else if (column === "createdOn") {
      var sItems = screatedOnFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdOn === sItems[i]
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
        creationColor: "sort-column",
      });
    }

    debugger;

    this.setState({
      tempSearchTicketData: itemsArray,
    });
    // this.StatusCloseModel();
  };

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      SearchTicketData: itemsArray,
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      SearchTicketData: itemsArray,
    });
    this.StatusCloseModel();
  }
  handleGetModulesNames() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader(),
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (data) {
        let moduleID = data[0].moduleID;
        let selTab = data[0].moduleName;
        let moduleIDMyticket = data[1].moduleID;
        self.handleAdvanceSearchOption(moduleID);
      }
    });
  }
  handleAdvanceSearchOption(id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: id,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data1 = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItems: data1 });
          self.setAdvanceSearch(data1);
        } else {
          self.setState({ modulesItems: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setAdvanceSearch(data1) {
    debugger;
    var data = [];
    data = data1;
    if (data.length > 0) {
      if (data[0].moduleItemisActive !== undefined) {
        if (data[0].moduleItemisActive === true) {
          this.setState({ CreateDateShowRecord: "yes" });
        } else {
          this.setState({ CreateDateShowRecord: "none" });
        }
      }
      if (data[1].moduleItemisActive !== undefined) {
        if (data[1].moduleItemisActive === true) {
          this.setState({ LastUpdatedDate: "yes" });
        } else {
          this.setState({ LastUpdatedDate: "none" });
        }
      }
      if (data[2].moduleItemisActive !== undefined) {
        if (data[2].moduleItemisActive === true) {
          this.setState({ Category: "yes" });
        } else {
          this.setState({ Category: "none" });
        }
      }
      if (data[3].moduleItemisActive !== undefined) {
        if (data[3].moduleItemisActive === true) {
          this.setState({ SubCategory: "yes" });
        } else {
          this.setState({ SubCategory: "none" });
        }
      }
      if (data[4].moduleItemisActive !== undefined) {
        if (data[4].moduleItemisActive === true) {
          this.setState({ IssueType: "yes" });
        } else {
          this.setState({ IssueType: "none" });
        }
      }
      if (data[5].moduleItemisActive !== undefined) {
        if (data[5].moduleItemisActive === true) {
          this.setState({ TicketSource: "yes" });
        } else {
          this.setState({ TicketSource: "none" });
        }
      }
      if (data[6].moduleItemisActive !== undefined) {
        if (data[6].moduleItemisActive === true) {
          this.setState({ TicketIDTitle: "yes" });
        } else {
          this.setState({ TicketIDTitle: "none" });
        }
      }
      if (data[7].moduleItemisActive !== undefined) {
        if (data[7].moduleItemisActive === true) {
          this.setState({ TicketPriority: "yes" });
        } else {
          this.setState({ TicketPriority: "none" });
        }
      }
      if (data[8].moduleItemisActive !== undefined) {
        if (data[8].moduleItemisActive === true) {
          this.setState({ TicketStatus: "yes" });
        } else {
          this.setState({ TicketStatus: "none" });
        }
      }
      if (data[9].moduleItemisActive !== undefined) {
        if (data[9].moduleItemisActive === true) {
          this.setState({ SLAStatus: "yes" });
        } else {
          this.setState({ SLAStatus: "none" });
        }
      }
      if (data[10].moduleItemisActive !== undefined) {
        if (data[10].moduleItemisActive === true) {
          this.setState({ ClaimID: "yes" });
        } else {
          this.setState({ ClaimID: "none" });
        }
      }
      if (data[11].moduleItemisActive !== undefined) {
        if (data[11].moduleItemisActive === true) {
          this.setState({ InvoiceNoSubOrderNo: "yes" });
        } else {
          this.setState({ InvoiceNoSubOrderNo: "none" });
        }
      }
      if (data[12].moduleItemisActive !== undefined) {
        if (data[12].moduleItemisActive === true) {
          this.setState({ ItemID: "yes" });
        } else {
          this.setState({ ItemID: "none" });
        }
      }
      if (data[13].moduleItemisActive !== undefined) {
        if (data[13].moduleItemisActive === true) {
          this.setState({ Didvisitstore: "yes" });
        } else {
          this.setState({ Didvisitstore: "none" });
        }
      }
      if (data[14].moduleItemisActive !== undefined) {
        if (data[14].moduleItemisActive === true) {
          this.setState({ Wanttovisitstore: "yes" });
        } else {
          this.setState({ Wanttovisitstore: "none" });
        }
      }
      if (data[16].moduleItemisActive !== undefined) {
        if (data[16].moduleItemisActive === true) {
          this.setState({ Email: "yes" });
        } else {
          this.setState({ Email: "none" });
        }
      }
      if (data[17].moduleItemisActive !== undefined) {
        if (data[17].moduleItemisActive === true) {
          this.setState({ MobileNo: "yes" });
        } else {
          this.setState({ MobileNo: "none" });
        }
      }
      if (data[18].moduleItemisActive !== undefined) {
        if (data[18].moduleItemisActive === true) {
          this.setState({ AssignTo: "yes" });
        } else {
          this.setState({ AssignTo: "none" });
        }
      }
      if (data[19].moduleItemisActive !== undefined) {
        if (data[19].moduleItemisActive === true) {
          this.setState({ PurchaseStoreCodeAddress: "yes" });
        } else {
          this.setState({ PurchaseStoreCodeAddress: "none" });
        }
      }
    }
  }
  handleGetDashboardNumberData() {
    this.setState({ loadingAbove: true });
    debugger;
    let self = this;
    var fromdate = moment(this.state.start).format("YYYY-MM-DD");
    var todate = moment(this.state.end).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardCountData",
      headers: authHeader(),
      params: {
        UserIds: this.state.AgentIds,
        // UserIds: "6,7,8",
        // fromdate: moment(this.state.start._d).format("YYYY-MM-DD"),
        fromdate: fromdate,
        // fromdate: this.state.start._d,
        // fromdate: "2019-12-26",
        todate: todate,
        // todate: moment(this.state.end._d).format("YYYY-MM-DD"),
        // todate: this.state.end._d,
        // todate: "2020-01-15",
        BrandID: this.state.BrandIds,
        // BrandID: "26, 31"
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ DashboardNumberData: data });
          if (
            Object.keys(self.state.DashboardGraphData).length > 0 &&
            Object.keys(self.state.DashboardNumberData).length > 0
          ) {
            self.setState({ loadingAbove: false });
          }
        } else {
          self.setState({ DashboardNumberData: {} });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetDashboardGraphData() {
    this.setState({ loadingAbove: true });
    debugger;
    let self = this;
    var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
    var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardGraphData",
      headers: authHeader(),
      params: {
        // UserIds: "6,7,8",
        // fromdate: "2019-12-26",
        // todate: "2020-01-15",
        // BrandID: "26, 31"
        UserIds: this.state.AgentIds,
        // fromdate: this.state.start._d,
        // fromdate: moment(this.state.start._d).format("YYYY-MM-DD"),
        fromdate: fromdate,
        // todate: this.state.end._d,
        // todate: moment(this.state.end._d).format("YYYY-MM-DD"),
        todate: todate,
        BrandID: this.state.BrandIds,
      },
    })
      .then(function(res) {
        debugger;
        if (res.data.responseData !== null) {
          let DashboardGraphData = res.data.responseData;
          let DashboardBillGraphData = res.data.responseData.tickettoBillGraph;
          let DashboardSourceGraphData =
            res.data.responseData.ticketSourceGraph;
          let DashboardTaskGraphData = res.data.responseData.tickettoTaskGraph;
          let DashboardPriorityGraphData = res.data.responseData.priorityChart;
          let DashboardClaimGraphData =
            res.data.responseData.tickettoClaimGraph;
          if (DashboardTaskGraphData !== null) {
            self.setState({
              DashboardTaskGraphData,
            });
          }
          if (DashboardClaimGraphData !== null) {
            self.setState({
              DashboardClaimGraphData,
            });
          }
          if (DashboardBillGraphData !== null) {
            self.setState({
              DashboardBillGraphData,
              ticketToBillBarFlag: false,
            });
          } else {
            self.setState({
              ticketToBillBarFlag: true,
            });
          }
          if (DashboardSourceGraphData !== null) {
            self.setState({
              DashboardSourceGraphData,
              ticketGenerationSourceFlag: false,
            });
          } else {
            self.setState({
              ticketGenerationSourceFlag: true,
            });
          }
          if (DashboardPriorityGraphData !== null) {
            self.setState({
              DashboardPriorityGraphData,
              openByPriorityFlag: false,
            });
          } else {
            self.setState({
              openByPriorityFlag: true,
            });
          }
          self.setState({
            DashboardGraphData: DashboardGraphData,
          });
          if (
            Object.keys(self.state.DashboardGraphData).length > 0 &&
            Object.keys(self.state.DashboardNumberData).length > 0
          ) {
            self.setState({ loadingAbove: false });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  checkAllAgentStart(event) {
    debugger;
    var checkboxes = document.getElementsByName("allAgent");
    var strAgentIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        checkboxes[i].checked = true;
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strAgentIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      AgentIds: strAgentIds,
    });
    if (this.state.AgentIds !== "" && this.state.BrandIds !== "") {
      this.handleGetDashboardNumberData();
      this.handleGetDashboardGraphData();
      this.handleTicketsOnLoad();
    } else {
      this.setState({ loadingAbove: false });
    }
  }
  checkAllBrandStart(event) {
    debugger;
    var checkboxes = document.getElementsByName("allBrand");
    var strBrandIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        checkboxes[i].checked = true;
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strBrandIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      BrandIds: strBrandIds,
    });
    if (this.state.AgentIds !== "" && this.state.BrandIds !== "") {
      this.handleGetDashboardNumberData();
      this.handleGetDashboardGraphData();
      this.handleTicketsOnLoad();
    } else {
      this.setState({ loadingAbove: false });
    }
  }
  checkIndividualAgent = (event) => {
    debugger;
    var agentcount = 0;
    var checkboxes = document.getElementsByName("allAgent");
    var strAgentIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null) agentcount++;
          document.getElementById("spnAgent").textContent = agentcount;
          strAgentIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    if (agentcount === 0) {
      document.getElementById("spnAgent").textContent = "select";
    }
    if (checkboxes.length - 1 === agentcount) {
      document.getElementById("spnAgent").textContent = "ALL";
      this.setState({ CheckBoxAllAgent: true });
    } else {
      this.setState({ CheckBoxAllAgent: false });
    }

    this.setState(
      {
        AgentIds: strAgentIds,
        DashboardTaskGraphData: [],
        DashboardClaimGraphData: [],
        DashboardBillGraphData: [],
        DashboardSourceGraphData: [],
        DashboardPriorityGraphData: [],
      },
      () => {
        this.handleGetDashboardNumberData();
        this.handleGetDashboardGraphData();
        this.ViewSearchData();
      }
    );
  };
  checkIndividualBrand = (event) => {
    debugger;
    var brandcount = 0;
    var checkboxes = document.getElementsByName("allBrand");
    var strBrandIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null) brandcount++;
          document.getElementById("spnBrand").textContent = brandcount;
          strBrandIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    if (brandcount === 0) {
      document.getElementById("spnBrand").textContent = "select";
    }
    if (checkboxes.length - 1 === brandcount) {
      //document.getElementById("all-brand").checked = true;
      document.getElementById("spnBrand").textContent = "ALL";
      this.setState({ CheckBoxAllBrand: true });
    } else {
      // document.getElementById("all-brand").checked = false;
      this.setState({ CheckBoxAllBrand: false });
    }

    this.setState(
      {
        BrandIds: strBrandIds,
        DashboardTaskGraphData: [],
        DashboardClaimGraphData: [],
        DashboardBillGraphData: [],
        DashboardSourceGraphData: [],
        DashboardPriorityGraphData: [],
      },
      () => {
        this.handleGetDashboardNumberData();
        this.handleGetDashboardGraphData();
        this.ViewSearchData();
      }
    );
  };
  checkAllAgent = async (event) => {
    debugger;
    this.setState((state) => ({ CheckBoxAllAgent: !state.CheckBoxAllAgent }));
    var strAgentIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("allAgent");
    if (allCheckboxChecked) {
      document.getElementById("spnAgent").textContent = "ALL";
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strAgentIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    } else {
      document.getElementById("spnAgent").textContent = "select";
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strAgentIds = "";
    }
    await this.setState({
      AgentIds: strAgentIds,
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
    this.ViewSearchData();
  };
  checkAllBrand = async (event) => {
    debugger;

    this.setState((state) => ({ CheckBoxAllBrand: !state.CheckBoxAllBrand }));
    var strBrandIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("allBrand");
    if (allCheckboxChecked) {
      document.getElementById("spnBrand").textContent = "ALL";
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strBrandIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    } else {
      document.getElementById("spnBrand").textContent = "select";
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strBrandIds = "";
    }
    await this.setState({
      BrandIds: strBrandIds,
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
    this.ViewSearchData();
  };
  handleGetAgentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AgentData: data,
            AssignToData: data,
            TeamMemberData: data,
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AgentData: [],
            AssignToData: [],
            TeamMemberData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetBrandList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ BrandData: data });
          self.checkAllBrandStart();
        } else {
          self.setState({ BrandData: [] });
          self.checkAllBrandStart();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handelCheckBoxCheckedChange = async (ticketID) => {
    debugger;
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
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
      ticketIds: strIds,
    });
  };
  handleTicketDetails = (rowInfo, column) => {
    const index = column ? column.index : -1;
    return {
      onClick: (e) => {
        debugger;
        this.selectedRow = index;
        var agentId = column.original["user_ID"];
        this.setState({ agentId, agentSelection: "" });
      },
      style: {
        background: this.selectedRow === index ? "#ECF2F4" : null,
      },
    };
  };
  setAssignedToValue = (e) => {
    let assign = e.currentTarget.value;
    this.setState({ selectedAssignedTo: assign });
  };

  setScheduleFor = (e) => {
    let scheduleForValue = e.currentTarget.value;
    this.setState({ selectedScheduleFor: scheduleForValue });
  };
  setIssueTypeValue = (e) => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });
  };
  setSlaStatusValue = (e) => {
    let slaStatusValue = e.currentTarget.value;
    this.setState({ selectedSlaStatus: slaStatusValue });
  };
  handleVisitStoreCodeAddressAll = (e) => {
    let visitStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedVisitStoreCodeAddressAll: visitStoreCodeAddressAllValue,
    });
  };
  handleTicketStatusByCustomer = (e) => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByCustomer: ticketStatusValue });
  };
  handleTicketStatusByTicket = (e) => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByTicket: ticketStatusValue });
  };
  handleTicketStatusByCategory = (e) => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByCategory: ticketStatusValue });
  };
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
      start,
      end,
      DashboardTaskGraphData: [],
      DashboardClaimGraphData: [],
      DashboardBillGraphData: [],
      DashboardSourceGraphData: [],
      DashboardPriorityGraphData: [],
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
  };
  handleDateRange(date) {
    this.setState({ range: date });
  }
  handleByDateCreate(date) {
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
  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }
  toggleSearch() {
    this.handleGetSaveSearchList();
    this.setState((state) => ({
      collapseSearch: !state.collapseSearch,
      ShowGridCheckBox: false,
    }));
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  handleTicketStatusByDate = (e) => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByDate: ticketStatusValue });
  };
  handleWantToVisitStoreAll = (e) => {
    let wantToVisitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedWantToVisitStoreAll: wantToVisitStoreAllValue });
  };
  handleScheduleTime(e) {
    debugger;
    this.setState({
      selectedScheduleTime: e,
    });
  }
  handleAssignRemark(e) {
    debugger;
    this.setState({
      agentRemark: e.currentTarget.value,
    });
  }
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ChannelOfPurchaseData: data });
        } else {
          self.setState({ ChannelOfPurchaseData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handelOnchangeData(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
        DepartmentId: this.state.selectedDepartment,
      },
    })
      .then(function(res) {
        debugger;
        let FunctionData = res.data.responseData;
        self.setState({ FunctionData: FunctionData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetDepartmentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ DepartmentData: data });
        } else {
          self.setState({ DepartmentData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleWithTaskAll = (e) => {
    let withTaskAllValue = e.currentTarget.value;
    this.setState({ selectedWithTaskAll: withTaskAllValue });
  };
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
        ActiveTabId: 1,
      });
    } else if (currentActive === "By Customer Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 2,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 2,
      });
    } else if (currentActive === "By Ticket Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 3,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 3,
      });
    } else if (currentActive === "By Category") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 4,
        allFlag: 0,
        ActiveTabId: 4,
      });
    } else if (currentActive === "All") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 5,
        ActiveTabId: 5,
      });
    }
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
        DesignationID: this.state.selectedDesignation,
      },
    })
      .then(function(res) {
        debugger;
        let SearchAssignData = res.data.responseData;
        self.setState({
          SearchAssignData: SearchAssignData,
          assignFirstName: "",
          assignLastName: "",
          assignEmail: "",
          // selectedDesignation: 0
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleAssignClearData() {
    debugger;
    this.setState({
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedDesignation: 0,
    });
  }
  setFunctionValue = (e) => {
    let functionValue = e.currentTarget.value;
    this.setState({ selectedFunction: functionValue });
  };
  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleTicketStatusAll = (e) => {
    let ticketStatusAllValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusAll: ticketStatusAllValue });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };

  setDesignationValue = (e) => {
    let designationValue = e.currentTarget.value;
    this.setState({ selectedDesignation: designationValue });
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  StatusOpenModel(data, header) {
    debugger;

    this.setState({
      StatusModel: true,
      sortColumnName: data,
      sortHeader: header,
    });
  }
  StatusCloseModel() {
    debugger;
    this.setState({
      sortFilterTicketData: this.state.sortTicketData,
      sortFilterCategoryData: this.state.sortCategoryData,
      sortFilterPriorityData: this.state.sortPriorityData,
      sortFiltercreatedOnData: this.state.sortcreatedOnData,
      sortFilterAssigneeData: this.state.sortAssigneeData,
    });
    var tempFinalSearchTicketData = [];
    if (this.state.tempSearchTicketData.length > 0) {
      var tempSearchTicketData = this.state.tempSearchTicketData;
      var tempColor = [];
      if (this.state.isRed) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isEscalation === 1
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isWhite) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) =>
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
          (a) => a.isSLANearBreach === true
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isGreen) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isReassigned === true && a.isEscalation === 0
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
      if (this.state.sortColumnName === "status") {
        if (this.state.sticketStatusFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryFilterCheckbox: "",
            spriorityFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
            sassignedToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumnName === "category") {
        if (this.state.scategoryFilterCheckbox === "") {
        } else {
          this.setState({
            sticketStatusFilterCheckbox: "",
            spriorityFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
            sassignedToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumnName === "priority") {
        if (this.state.spriorityFilterCheckbox === "") {
        } else {
          this.setState({
            sticketStatusFilterCheckbox: "",
            scategoryFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
            sassignedToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumnName === "createdOn") {
        if (this.state.screatedOnFilterCheckbox === "") {
        } else {
          this.setState({
            sticketStatusFilterCheckbox: "",
            scategoryFilterCheckbox: "",
            spriorityFilterCheckbox: "",
            sassignedToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumnName === "assignedTo") {
        if (this.state.sassignedToFilterCheckbox === "") {
        } else {
          this.setState({
            sticketStatusFilterCheckbox: "",
            scategoryFilterCheckbox: "",
            spriorityFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
          });
        }
      }
    } else {
      var tempSearchTicketData = this.state.sortAllData;
      var tempColor = [];
      if (this.state.isRed) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isEscalation === 1
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isWhite) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) =>
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
          (a) => a.isSLANearBreach === true
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isGreen) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isReassigned === true && a.isEscalation === 0
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
        tempFinalSearchTicketData = [];
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
      SearchTicketData: tempFinalSearchTicketData,
    });
  }
  HandleChangeRedict() {
    this.props.history.push("/admin/chatdashboard");
  }
  handlechangebtntab(e) {
    var idIndex = e.target.className;
    this.setState({ TicketTabIndex: idIndex });
  }
  onChange = (date) => this.setState({ date });

  checkAllCheckbox = async (event) => {
    debugger;
    var obj = this.state.cSelectedRow;
    var strIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
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
      cSelectedRow: obj,
    });
    await this.setState({
      ticketIds: strIds,
    });
  };
  handleMouseHover() {
    this.setState({ TotalNoOfChatShow: !this.state.TotalNoOfChatShow });
  }
  handleScheduleDateChange = (e) => {
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
        selectedWeeklyDays: "",
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
        selectedNameOfDayForYearCommaSeperated: "",
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
        selectedWeeklyDays: "",
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
        selectedNameOfMonthForYearCommaSeperated: "",
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
        selectedNameOfDayForWeekCommaSeperated: "",
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
        selectedNameOfDayForWeekCommaSeperated: "",
      });
    }
    this.setState({
      selectScheduleDate: SelectData,
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
  handleDaysForMonth(e) {
    debugger;
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value,
    });
  }

  handleWeekly(e) {
    debugger;
    this.setState({
      selectedNoOfWeek: e.currentTarget.value,
    });
  }

  setPriorityValue = (e) => {
    let priorityValue = e.currentTarget.value;
    this.setState({ selectedPriority: priorityValue });
  };
  setPriorityAllValue = (e) => {
    let priorityAllValue = e.currentTarget.value;
    this.setState({ selectedPriorityAll: priorityAllValue });
  };
  handleDailyDay(e) {
    debugger;
    this.setState({
      selectedNoOfDay: e.currentTarget.value,
    });
  }
  setClaimCategoryValue = (e) => {
    let claimCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimCategory: claimCategoryValue });
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        // this.handleGetClaimSubCategoryList();
        this.handleGetSubCategoryList("allClaimTab");
      }
    }, 1);
  };
  setDepartmentValue = (e) => {
    let departmentValue = e.currentTarget.value;
    this.setState({ selectedDepartment: departmentValue });

    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setChannelOfPurchaseValue = (e) => {
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTicketActionTypeValue = (e) => {
    this.setState({ selectedTicketActionType: e });
  };
  setCategoryValue = (e) => {
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategory: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList("categoryTab");
      }
    }, 1);
  };
  setCategoryAllValue = (e) => {
    let categoryAllValue = e.currentTarget.value;
    this.setState({ selectedCategoryAll: categoryAllValue });
    setTimeout(() => {
      if (this.state.selectedCategoryAll) {
        this.handleGetSubCategoryList("allTab");
      }
    }, 1);
  };
  setSubCategoryValue = (e) => {
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategory: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList("categoryTab");
      }
    }, 1);
  };
  setSubCategoryAllValue = (e) => {
    let subCategoryAllValue = e.currentTarget.value;
    this.setState({ selectedSubCategoryAll: subCategoryAllValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryAll) {
        this.handleGetIssueTypeList("allTab");
      }
    }, 1);
  };
  setClaimSubCategoryValue = (e) => {
    let claimSubCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimSubCategory: claimSubCategoryValue });

    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList("allClaimTab");
        // this.handleGetClaimIssueTypeList();
      }
    }, 1);
  };
  setTicketSourceValue = (e) => {
    let ticketSourceValue = e.currentTarget.value;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };

  handleVisitStoreAll = (e) => {
    let visitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedVisitStoreAll: visitStoreAllValue });
  };
  handleGetDesignationList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ DesignationData: data });
        } else {
          self.setState({ DesignationData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
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
        scheduleRequired: "All fields are required",
      });
    } else if (this.state.selectScheduleDate === "230") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDay === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
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
          scheduleRequired: "All fields are required",
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
          scheduleRequired: "All fields are required",
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
          scheduleRequired: "All fields are required",
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
          scheduleRequired: "All fields are required",
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
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    }
  }
  handleSchedulePopupSuccess() {
    debugger;
    let self = this;

    var month, day, year, hours, minutes, seconds;
    var date = new Date(this.state.selectedScheduleTime),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    let selectedScheduleTime = [mySQLDate, mySQLTime].join(" ");

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Schedule",
      headers: authHeader(),
      data: {
        SearchInputParams: this.state.FinalSaveSearchData,
        ScheduleFor: this.state.selectedTeamMemberCommaSeperated,
        ScheduleType: this.state.selectScheduleDate,
        NoOfDay: this.state.selectedNoOfDay,
        ScheduleTime: selectedScheduleTime,
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
          .selectedNameOfMonthForDailyYearCommaSeperated,
      },
    })
      .then(function(res) {
        debugger;
        let messageData = res.data.message;
        if (messageData === "Success") {
          NotificationManager.success("Scheduled successfully.");
          self.ScheduleCloseModel();
          self.setState({
            scheduleRequired: "",
            selectedTeamMemberCommaSeperated: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleWeekForYear(e) {
    debugger;
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value,
    });
  }
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
  setTeamMember = (e) => {
    debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, (s) => s.userID)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };
  handleWeekForWeek(e) {
    debugger;
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value,
    });
  }
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
  handleMonthForWeek(e) {
    debugger;
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value,
    });
  }
  handleDayForYear(e) {
    debugger;
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value,
    });
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
          Remark: this.state.agentRemark,
        },
      })
        .then(function(res) {
          debugger;
          let messageData = res.data.message;
          if (messageData === "Success") {
            self.handleAssignModalClose();
            NotificationManager.success("Tickets assigned successfully.");
            // self.handleSearchTicketEscalation();
            self.ViewSearchData();
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        agentSelection: "Agent Selection is required",
      });
    }
  }
  handleGetSlaStatusList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLAStatusList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            SlaStatusData: data,
          });
        } else {
          self.setState({
            SlaStatusData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTicketSourceList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            TicketSourceData: data,
          });
        } else {
          self.setState({
            TicketSourceData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetClaimIssueTypeList() {
    let self = this;
    self.setState({
      ClaimIssueTypeData: [],
      selectedClaimIssueType: 0,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.selectedClaimSubCategory,
      },
    })
      .then(function(res) {
        debugger;
        let ClaimIssueTypeData = res.data.responseData;
        self.setState({ ClaimIssueTypeData: ClaimIssueTypeData });
      })
      .catch((data) => {
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
        selectedIssueType: 0,
      });
    } else if (param === "allTab") {
      self.setState({
        IssueTypeAllData: [],
        selectedIssueTypeAll: 0,
      });
    } else if (param === "allClaimTab") {
      self.setState({
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0,
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
        SubCategoryID: subCateId,
      },
    })
      .then(function(res) {
        debugger;
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
            IssueTypeData: IssueTypeData,
          });
        } else if (param === "allTab") {
          var IssueTypeAllData = res.data.responseData;
          self.setState({
            IssueTypeAllData: IssueTypeAllData,
          });
        } else if (param === "allClaimTab") {
          var ClaimIssueTypeData = res.data.responseData;
          self.setState({
            ClaimIssueTypeData: ClaimIssueTypeData,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetCategoryList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let data = res.data;
        let CategoryData = res.data;
        if (data.length > 0) {
          self.setState({
            CategoryData: CategoryData,
            // CategoryDataAll: CategoryDataAll
          });
        } else {
          self.setState({
            CategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetClaimSubCategoryList() {
    debugger;
    let self = this;
    self.setState({
      ClaimSubCategoryData: [],
      selectedClaimSubCategory: 0,
      ClaimIssueTypeData: [],
      selectedClaimIssueType: 0,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.selectedClaimCategory,
      },
    })
      .then(function(res) {
        debugger;
        let ClaimSubCategoryData = res.data.responseData;
        self.setState({
          ClaimSubCategoryData: ClaimSubCategoryData,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetSubCategoryList(param) {
    debugger;
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
    if (param == "categoryTab") {
      this.setState({
        SubCategoryData: [],
        IssueTypeData: [],
        selectedSubCategory: 0,
        selectedIssueType: 0,
      });
    } else if (param == "allTab") {
      this.setState({
        SubCategoryAllData: [],
        IssueTypeAllData: [],
        selectedSubCategoryAll: 0,
        selectedIssueTypeAll: 0,
      });
    } else if (param == "allClaimTab") {
      this.setState({
        ClaimSubCategoryData: [],
        selectedClaimSubCategory: 0,
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0,
      });
    }
    // let cateId =
    //   this.state.byCategoryFlag === 4
    //     ? this.state.selectedCategory
    //     : this.state.selectedCategoryAll;
    let cateId;
    if (param === "categoryTab") {
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
        CategoryID: cateId,
      },
    })
      .then(function(res) {
        debugger;
        // if (self.state.byCategoryFlag === 4) {
        //   var SubCategoryData = res.data.responseData;
        //   self.setState({
        //     SubCategoryData: SubCategoryData
        //   });
        // } else if (self.state.allFlag === 5) {
        //   var SubCategoryAllData = res.data.responseData;
        //   self.setState({
        //     SubCategoryAllData: SubCategoryAllData
        //   });
        // }
        if (param === "categoryTab") {
          var SubCategoryData = res.data.responseData;
          self.setState({
            SubCategoryData: SubCategoryData,
          });
        } else if (param === "allTab") {
          var SubCategoryAllData = res.data.responseData;
          self.setState({
            SubCategoryAllData: SubCategoryAllData,
          });
        } else if (param === "allClaimTab") {
          var ClaimSubCategoryData = res.data.responseData;
          self.setState({
            ClaimSubCategoryData: ClaimSubCategoryData,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
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
          resultCount: 0,
        },
        () => {
          // this.handleSearchTicketEscalation();
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
          resultCount: 0,
        },
        () => {
          // this.handleSearchTicketEscalation();
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
          resultCount: 0,
        },
        () => {
          // this.handleSearchTicketEscalation();
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
          IssueTypeData: [],
        },
        () => {
          // this.handleSearchTicketEscalation();
          this.ViewSearchData(1);
          // this.handleGetSubCategoryList();
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
          selectedFunction: 0,
          resultCount: 0,
          SubCategoryAllData: [],
          IssueTypeAllData: [],
          ClaimSubCategoryData: [],
          ClaimIssueTypeData: [],
        },
        () => {
          // this.handleSearchTicketEscalation();
          this.ViewSearchData(1);
          // this.handleGetSubCategoryList();
          // this.handleGetClaimSubCategoryList();
        }
      );
    }
  }

  ViewSearchData(Shwcheck) {
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

      // --------------------Check null date----------------------------------
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
      // --------------------Check null date----------------------------------
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

    ShowDataparam.AssigntoId = this.state.AgentIds;
    ShowDataparam.BrandId = this.state.BrandIds;
    ShowDataparam.ActiveTabId = this.state.ActiveTabId;
    ShowDataparam.searchDataByDate = dateTab;
    ShowDataparam.searchDataByCustomerType = customerType;
    ShowDataparam.searchDataByTicketType = ticketType;
    ShowDataparam.searchDataByCategoryType = categoryType;
    ShowDataparam.searchDataByAll = allTab;

    var FinalSaveSearchData = JSON.stringify(ShowDataparam);
    this.setState({
      FinalSaveSearchData,
    });
    // ----------------------------------------------------------
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardSearchTicket",
      headers: authHeader(),
      data: {
        AssigntoId: this.state.AgentIds,
        BrandId: this.state.BrandIds,
        ActiveTabId: this.state.ActiveTabId,
        searchDataByDate: dateTab,
        searchDataByCustomerType: customerType,
        searchDataByTicketType: ticketType,
        searchDataByCategoryType: categoryType,
        searchDataByAll: allTab,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;

        let CSVData = data;
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
                ticketStatus: distinct[i],
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
                createdOn: distinct[i],
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
                assignedTo: distinct[i],
              });
            }
          }
        }

        if (status === "Success") {
          if (Shwcheck === 1) {
            self.setState({
              ShowGridCheckBox: true,
            });
          }
          self.setState({
            SearchTicketData: data,
            resultCount: count,
            loading: false,
          });
          // else {
          //   self.setState({
          //     SearchTicketData: [],
          //     resultCount: 0,
          //     ShowGridCheckBox: false,
          //     loading: false
          //   });
          // }

          for (let i = 0; i < CSVData.length; i++) {
            delete CSVData[i].totalpages;
            // delete CSVData[i].responseTimeRemainingBy;
            // delete CSVData[i].responseOverdueBy;
            // delete CSVData[i].resolutionOverdueBy;
            // delete CSVData[i].ticketCommentCount;
          }
          self.setState({ CSVDownload: CSVData });
        } else {
          self.setState({
            SearchTicketData: [],

            resultCount: 0,
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  SaveSearchData() {
    debugger;
    let self = this;
    if (this.state.SearchName.length > 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/DashBoard/DashBoardSaveSearch",
        headers: authHeader(),
        params: {
          SearchSaveName: this.state.SearchName,
          parameter: this.state.FinalSaveSearchData,
        },
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success(
              "Your search has been saved successfully."
            );
            self.handleGetSaveSearchList();
            self.setState({
              SearchName: "",
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      self.setState({
        SearchNameCompulsory: "Please Enter Search Name.",
      });
    }
  }

  HandleRowClickPage = (rowInfo, column) => {
    if ((rowInfo, column)) {
      return {
        onClick: (e) => {
          debugger;
          let Id = column.original["ticketID"];
          let self = this;
          self.setState({
            ticketDetailID: Id,
          });
          setTimeout(function() {
            self.props.history.push({
              pathname: "myticket",
              ticketDetailID: Id,
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
              : "white",
        },
      };
    }
    return {};
  };

  handleGetSaveSearchList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/GetDashBoardSavedSearch",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ SearchListData: data });
        } else {
          self.setState({ SearchListData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSearchTicketEscalation() {
    debugger;
    this.setState({ loading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/SearchTicket",
      headers: authHeader(),
      data: {
        isByStatus: this.state.isByStatus,
        pageSize: this.state.advPageSize,
        pageNo: this.state.advPageNo,
        isEscalation: 1,
        // ticketStatus: ticketStatus
      },
    })
      .then(function(res) {
        debugger;
        let data = res.data.responseData;
        let Status = res.data.message;
        let CSVData = data;
        let count = 0;
        if (res.data.responseData != null) {
          count = res.data.responseData.length;
        }
        if (Status === "Record Not Found") {
          self.setState({
            SearchTicketData: [],
            loading: false,
            resultCount: 0,
          });
        } else if (data !== null) {
          self.setState({
            SearchTicketData: data,
            sortTicketData: data,
            loading: false,
            resultCount: count,
          });
          for (let i = 0; i < CSVData.length; i++) {
            delete CSVData[i].totalpages;
            delete CSVData[i].responseTimeRemainingBy;
            delete CSVData[i].responseOverdueBy;
            delete CSVData[i].resolutionOverdueBy;
            // delete CSVData[i].ticketCommentCount;
          }
          self.setState({ CSVDownload: CSVData });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handlePurchaseStoreCodeAddressAll = (e) => {
    let purchaseStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedPurchaseStoreCodeAddressAll: purchaseStoreCodeAddressAllValue,
    });
  };
  handleClaimStatus = (e) => {
    debugger;
    let claimStatusValue = e.currentTarget.value;
    this.setState({ selectedClaimStatus: claimStatusValue });
  };
  handleTaskStatus = (e) => {
    let taskStatusValue = e.currentTarget.value;
    this.setState({ selectedTaskStatus: taskStatusValue });
  };
  handleAssignedToAll = (e) => {
    let assignedToAllValue = e.currentTarget.value;
    this.setState({ selectedAssignedToAll: assignedToAllValue });
  };
  handleWithClaimAll = (e) => {
    let withClaimAllValue = e.currentTarget.value;
    this.setState({ selectedWithClaimAll: withClaimAllValue });
  };
  hadleSearchDeleteData(searchDeletId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DeleteDashBoardSavedSearch",
      headers: authHeader(),
      params: {
        SearchParamID: searchDeletId,
      },
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            "Saved search data deleted successfully."
          );
          self.handleGetSaveSearchList();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSlaDueByDate = (e) => {
    let slaDueValue = e.currentTarget.value;
    this.setState({ selectedSlaDueByDate: slaDueValue });
  };
  handleMonthForMonth(e) {
    debugger;
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value,
    });
  }
  setClaimIssueTypeValue = (e) => {
    let claimIssueTypeValue = e.currentTarget.value;
    this.setState({ selectedClaimIssueType: claimIssueTypeValue });
  };
  setIssueTypeAllValue = (e) => {
    let issueTypeAllValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeAll: issueTypeAllValue });
  };

  handleApplySearch(paramsID) {
    debugger;
    let self = this;
    this.setState({ loading: true });
    self.onCloseModal();
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/GetDashBoardTicketsOnSavedSearch",
      headers: authHeader(),
      params: {
        SearchParamID: paramsID,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData.dashboardTicketList;
        let count = 0;
        if (res.data.responseData.dashboardTicketList != null) {
          count = res.data.responseData.dashboardTicketList.length;
        }
        if (status === "Success") {
          let dataSearch = JSON.parse(res.data.responseData.dbsearchParams);
          self.setState({
            SearchTicketData: data,
            resultCount: count,
            loading: false,
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

          if (dataSearch.searchDataByDate === null) {
            self.setState({
              ByDateCreatDate: "",
              ByDateSelectDate: "",
              selectedSlaDueByDate: 0,
              selectedTicketStatusByDate: 0,
            });
          } else {
            debugger;
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
              allFlag: 0,
            });
          }

          if (dataSearch.searchDataByCustomerType === null) {
            self.setState({
              MobileNoByCustType: "",
              EmailIdByCustType: "",
              TicketIdByCustType: "",
              selectedTicketStatusByCustomer: 0,
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
              allFlag: 0,
            });
          }

          if (dataSearch.searchDataByTicketType === null) {
            self.setState({
              selectedPriority: 0,
              selectedTicketStatusByTicket: 0,
              selectedChannelOfPurchase: [],
              selectedTicketActionType: [],
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
                  element ===
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
              allFlag: 0,
            });
          }

          if (dataSearch.searchDataByCategoryType === null) {
            self.setState({
              selectedCategory: 0,
              selectedSubCategory: 0,
              selectedIssueType: 0,
              selectedTicketStatusByCategory: 0,
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
                  dataSearch.searchDataByCategoryType.TicketStatusID,
              },
              () => {
                self.handleGetSubCategoryList("categoryTab");
              }
            );
            self.setState(
              {
                selectedSubCategory:
                  dataSearch.searchDataByCategoryType.SubCategoryId,
              },
              () => {
                self.handleGetIssueTypeList("categoryTab");
              }
            );
            self.setState({
              selectedIssueType:
                dataSearch.searchDataByCategoryType.IssueTypeId,
            });
          }

          if (dataSearch.searchDataByAll === null) {
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
              selectedFunction: 0,
            });
          } else {
            if (dataSearch.searchDataByAll.CreatedDate !== "") {
              let createdDate = dataSearch.searchDataByAll.CreatedDate;
              let createdDateArray = createdDate.split("-");
              var createdDateFinal = new Date(
                createdDateArray[0],
                createdDateArray[1] - 1,
                createdDateArray[2]
              );
            }
            if (dataSearch.searchDataByAll.ModifiedDate !== "") {
              let modifiedDate = dataSearch.searchDataByAll.ModifiedDate;
              let modifiedDateArray = modifiedDate.split("-");
              var modifiedDateFinal = new Date(
                modifiedDateArray[0],
                modifiedDateArray[1] - 1,
                modifiedDateArray[2]
              );
            }
            self.setState({
              ByAllCreateDate: createdDateFinal,
              selectedTicketSource:
                dataSearch.searchDataByAll.TicketSourceTypeID,
              ClaimIdByAll: dataSearch.searchDataByAll.ClaimId,
              EmailByAll: dataSearch.searchDataByAll.CustomerEmailID,
              ByAllLastDate: modifiedDateFinal,
              TicketIdTitleByAll: dataSearch.searchDataByAll.TicketIdORTitle,
              InvoiceSubOrderByAll:
                dataSearch.searchDataByAll.InvoiceNumberORSubOrderNo,
              MobileByAll: dataSearch.searchDataByAll.CustomerMobileNo,
              // selectedCategoryAll: dataSearch.searchDataByAll.CategoryId,
              selectedPriorityAll: dataSearch.searchDataByAll.PriorityId,
              ItemIdByAll: dataSearch.searchDataByAll.OrderItemId,
              selectedAssignedTo: dataSearch.searchDataByAll.AssignTo,
              // selectedSubCategoryAll: dataSearch.searchDataByAll.SubCategoryId,
              selectedTicketStatusAll:
                dataSearch.searchDataByAll.TicketSatutsID,
              selectedVisitStoreAll: dataSearch.searchDataByAll.IsVisitStore,
              selectedPurchaseStoreCodeAddressAll:
                dataSearch.searchDataByAll.StoreCodeORAddress,
              // selectedIssueTypeAll: dataSearch.searchDataByAll.IssueTypeId,
              selectedSlaStatus: dataSearch.searchDataByAll.SLAStatus,
              selectedWantToVisitStoreAll:
                dataSearch.searchDataByAll.IsWantVistingStore,
              selectedVisitStoreCodeAddressAll:
                dataSearch.searchDataByAll.WantToStoreCodeORAddress,
              selectedWithClaimAll:
                dataSearch.searchDataByAll.HaveClaim === 0 ? "no" : "yes",
              selectedClaimStatus: dataSearch.searchDataByAll.ClaimStatusId,
              // selectedClaimCategory: dataSearch.searchDataByAll.ClaimCategoryId,
              // selectedClaimSubCategory:
              //   dataSearch.searchDataByAll.ClaimSubCategoryId,
              // selectedClaimIssueType: dataSearch.searchDataByAll.ClaimIssueTypeId,
              selectedWithTaskAll:
                dataSearch.searchDataByAll.HaveTask === 0 ? "no" : "yes",
              selectedTaskStatus: dataSearch.searchDataByAll.TaskStatusId,
              // selectedDepartment: dataSearch.searchDataByAll.TaskDepartment_Id,
              // selectedFunction: dataSearch.searchDataByAll.TaskFunction_Id
            });
            self.setState(
              {
                selectedCategoryAll: dataSearch.searchDataByAll.CategoryId,
                byCategoryFlag: 0,
                allFlag: 5,
              },
              () => {
                self.handleGetSubCategoryList("allTab");
              }
            );
            self.setState(
              {
                selectedSubCategoryAll:
                  dataSearch.searchDataByAll.SubCategoryId,
              },
              () => {
                self.handleGetIssueTypeList("allTab");
              }
            );
            self.setState({
              selectedIssueTypeAll: dataSearch.searchDataByAll.IssueTypeId,
            });
            self.setState(
              {
                selectedDepartment:
                  dataSearch.searchDataByAll.TaskDepartment_Id,
              },
              () => {
                self.handleGetFunctionList();
              }
            );
            self.setState({
              selectedFunction: dataSearch.searchDataByAll.TaskFunction_Id,
            });
            self.setState(
              {
                selectedClaimCategory:
                  dataSearch.searchDataByAll.ClaimCategoryId,
              },
              () => {
                // self.handleGetClaimSubCategoryList();
                self.handleGetSubCategoryList("allClaimTab");
              }
            );
            self.setState(
              {
                selectedClaimSubCategory:
                  dataSearch.searchDataByAll.ClaimSubCategoryId,
              },
              () => {
                // self.handleGetClaimIssueTypeList();
                self.handleGetIssueTypeList("allClaimTab");
              }
            );
            self.setState({
              selectedClaimIssueType:
                dataSearch.searchDataByAll.ClaimIssueTypeId,
            });
          }
        } else {
          self.setState({ SearchTicketData: [], loading: false });
        }
      })
      .catch((data) => {
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
          sortFilterCategoryData: this.state.sortCategoryData,
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
          sortFilterPriorityData: this.state.sortPriorityData,
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
          sortFiltercreatedOnData: this.state.sortcreatedOnData,
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
          sortFilterAssigneeData: this.state.sortAssigneeData,
        });
      }
    }
    // }
  }
  //// handle change filtre by check box
  setColorSortCheckStatus = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.checked });
  };
  render() {
    const { SearchAssignData, SearchTicketData } = this.state;
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    // let ranges = {
    //   "Today Only": [moment(start), moment(end)],
    //   "Yesterday Only": [
    //     moment(start).subtract(1, "days"),
    //     moment(end).subtract(1, "days")
    //   ],
    //   "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    // };
    // let local = {
    //   format: "DD-MM-YYYY",
    //   sundayFirst: false
    // };

    const TitleChange = this.state.collapseSearch
      ? "Close Search"
      : "Search Tickets";

    const ImgChange = this.state.collapseSearch ? (
      <img className="search-icon" src={CancalImg} alt="search-icon" />
    ) : (
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
    );

    // let value = `${this.state.start.format(
    //   "DD-MM-YYYY"
    // )} - ${this.state.end.format("DD-MM-YYYY")}`;
    // let disabled = false;
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
              <div className="filter-type ">
                <p>FILTER BY TYPE</p>

                <div className="FTypeScroll">
                  <input
                    type="text"
                    style={{ display: "block" }}
                    value={this.state.filterTxtValue}
                    onChange={this.filteTextChange.bind(this)}
                  />
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      name="filter-type"
                      id={"fil-open"}
                      value="all"
                      checked={
                        this.state.sticketStatusFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.scategoryFilterCheckbox.includes("all") ||
                        this.state.spriorityFilterCheckbox.includes("all") ||
                        this.state.screatedOnFilterCheckbox.includes("all") ||
                        this.state.sassignedToFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
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
                            checked={this.state.sticketStatusFilterCheckbox.includes(
                              item.ticketStatus
                            )}
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
                            checked={this.state.scategoryFilterCheckbox.includes(
                              item.category
                            )}
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
                            checked={this.state.spriorityFilterCheckbox.includes(
                              item.priority
                            )}
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
                            checked={this.state.screatedOnFilterCheckbox.includes(
                              item.createdOn
                            )}
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
                            checked={this.state.sassignedToFilterCheckbox.includes(
                              item.assignedTo
                            )}
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
                    name="filter-color"
                    value="isEscalation"
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
                    name="filter-color"
                    value="isSLANearBreach"
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
                    name="filter-color"
                    value="white"
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
                    name="filter-color"
                    value="isReassigned"
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
        <div
          className="container-fluid dash-dropdowns"
          style={{ marginTop: "-21px" }}
        >
          <div className="d-flex dashallbrand1">
            <div>
              <span>
                Brand :
                <div className="dropdown">
                  <button
                    style={{ width: "90px" }}
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span id="spnBrand" className="EMFCText">
                      All
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="all-brand">
                        <input
                          type="checkbox"
                          id="all-brand"
                          className="ch1"
                          onChange={this.checkAllBrand.bind(this)}
                          checked={this.state.CheckBoxAllBrand}
                          name="allBrand"
                        />
                        <span className="ch1-text">All</span>
                      </label>
                    </li>
                    {this.state.BrandData !== null &&
                      this.state.BrandData.map((item, i) => (
                        <li key={i}>
                          <label htmlFor={"i" + item.brandID}>
                            <input
                              type="checkbox"
                              id={"i" + item.brandID}
                              className="ch1"
                              name="allBrand"
                              attrIds={item.brandID}
                              onChange={this.checkIndividualBrand.bind(this)}
                            />
                            <span className="ch1-text">{item.brandName}</span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </span>
            </div>
            <div>
              <span>
                Agent :
                <div className="dropdown">
                  <button
                    style={{ width: "90px" }}
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span id="spnAgent" className="EMFCText">
                      All
                    </span>
                  </button>
                  <ul style={{ width: "180px" }} className="dropdown-menu">
                    <li>
                      <label htmlFor="all-agent">
                        <input
                          type="checkbox"
                          id="all-agent"
                          className="ch1"
                          onChange={this.checkAllAgent.bind(this)}
                          checked={this.state.CheckBoxAllAgent}
                          name="allAgent"
                        />
                        <span className="ch1-text">All</span>
                      </label>
                    </li>
                    {this.state.AgentData !== null &&
                      this.state.AgentData.map((item, i) => (
                        <li key={i}>
                          <label htmlFor={"i" + item.userID}>
                            <input
                              type="checkbox"
                              id={"i" + item.userID}
                              className="ch1"
                              name="allAgent"
                              attrIds={item.userID}
                              onChange={this.checkIndividualAgent.bind(this)}
                            />
                            <span className="ch1-text">{item.fullName}</span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </span>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-6 col-6">
                <span style={{ float: "right" }}>Date Range : </span>
              </div>
              <div className="col-md-6 col-6 p-0">
                <div className="DashTimeRange">
                  <div className="show-grid">
                    {/* <Col xs={3} /> */}
                    <div id="DateTimeRangeContainerNoMobileMode">
                      {/* <DateTimeRangeContainer
                      ranges={ranges}
                      start={this.state.start}
                      end={this.state.end}
                      local={local}
                      applyCallback={this.applyCallback}
                      smartMode
                      leftMode
                      // forceMobileMode
                      noMobileMode
                    >
                      <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        style={{ cursor: "pointer" }}
                        disabled={disabled}
                        value={value}
                      />
                    </DateTimeRangeContainer> */}
                      {/* <RangePicker
                      onChange={this.applyCallback}
                      bordered={false}
                      format="DD-MM-YYYY"
                      defaultValue={[
                        moment(this.state.start, "DD-MM-YYYY"),
                        moment(this.state.end, "DD-MM-YYYY")
                      ]}
                    /> */}
                      <DatePickerComponenet
                        applyCallback={this.applyCallback}
                      />
                    </div>
                    {/* <Col xs={3} md={4} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="dash-cntr">
          <a
            href="#!"
            className={
              this.state.collapse
                ? "dashboard-collapse-icon"
                : "dashboard-collapse-icon dashboard-collapse-icon-inv"
            }
            onClick={this.toggle}
          >
            {this.state.collapse ? (
              <img src={Dash} alt="dash-icon" />
            ) : (
              <img
                src={CollapseIcon}
                alt="dash-icon"
                className="collapse-icon"
              />
            )}
          </a>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                {this.state.loadingAbove === true ? (
                  <div className="loader-icon-cntr loader-icon-cntr-above">
                    <div className="loader-icon"></div>
                  </div>
                ) : (
                  <>
                    <div className="container-fluid dash-tp-card btm-mar">
                      <div className="row justify-content-center">
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">All</p>
                            <span className="card-value">
                              {this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.all !== null &&
                                  this.state.DashboardNumberData.all < 9
                                  ? "0" + this.state.DashboardNumberData.all
                                  : this.state.DashboardNumberData.all
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">Open</p>
                            <span className="card-value">
                              {this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.open !==
                                    null &&
                                  this.state.DashboardNumberData.open < 9
                                  ? "0" + this.state.DashboardNumberData.open
                                  : this.state.DashboardNumberData.open
                                : null}
                            </span>
                            <span
                              className={
                                this.state.TotalNoOfChatShow
                                  ? "dash-res"
                                  : "dash-res dash-res-opac"
                              }
                              style={{ marginTop: "-3px" }}
                            >
                              Resolution : &nbsp;
                              <span style={{ fontWeight: "700" }}>
                                {this.state.DashboardNumberData.resolutionRate}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">Due Today</p>
                            <span className="card-value">
                              {this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.dueToday !==
                                    null &&
                                  this.state.DashboardNumberData.dueToday < 9
                                  ? "0" +
                                    this.state.DashboardNumberData.dueToday
                                  : this.state.DashboardNumberData.dueToday
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">Over Due</p>
                            <span className="card-value red-clr">
                              {this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.overDue !==
                                    null &&
                                  this.state.DashboardNumberData.overDue < 9
                                  ? "0" + this.state.DashboardNumberData.overDue
                                  : this.state.DashboardNumberData.overDue
                                : null}
                            </span>
                          </div>
                        </div>
                        {this.state.TotalNoOfChatShow && (
                          <div
                            className="col-md col-sm-4 col-6 d-none"
                            onClick={this.HandleChangeRedict.bind(this)}
                          >
                            <div className="dash-top-cards">
                              <p className="card-head">Total no of chat</p>
                              <span className="card-value">102</span>
                              <small className="blue-clr">
                                View More Insights
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="container-fluid btm-mar">
                      <div className="row">
                        <div className="col-lg-3 col-md-4">
                          <div className="dash-top-cards prio-pie-cntr">
                            <p className="card-head mb-0">Open By Priority</p>
                            <div
                              className="prio-pie-chart"
                              style={{ position: "relative" }}
                            >
                              {this.state.DashboardPriorityGraphData.length >
                              0 ? (
                                <>
                                  <p className="pie-chart-count">
                                    <span>
                                      {
                                        this.state.DashboardGraphData
                                          .openPriorityTicketCount
                                      }
                                    </span>{" "}
                                    Tickets
                                  </p>
                                  <OpenByPriorityPie
                                    data={this.state.DashboardPriorityGraphData}
                                  />
                                </>
                              ) : null}
                            </div>
                            {this.state.openByPriorityFlag && (
                              <p>No Data Available</p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                          <div className="dash-top-cards p-0">
                            <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#bill-graph-tab"
                                  role="tab"
                                  aria-controls="bill-graph-tab"
                                  aria-selected="true"
                                  onClick={this.handlechangebtntab.bind(this)}
                                >
                                  Tickets To Bill Graph
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link tab2"
                                  data-toggle="tab"
                                  href="#source-tab"
                                  role="tab"
                                  aria-controls="source-tab"
                                  aria-selected="false"
                                  onClick={this.handlechangebtntab.bind(this)}
                                >
                                  Tickets Generation Source Tab
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content mt-3">
                              <div
                                className="tab-pane fade show active"
                                id="bill-graph-tab"
                                role="tabpanel"
                                aria-labelledby="bill-graph-tab"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <ul className="bill-graph-list">
                                      {this.state.DashboardBillGraphData !==
                                        null &&
                                        this.state.DashboardBillGraphData.map(
                                          (item, i) => (
                                            <li key={i}>
                                              {item.ticketSourceName} :{" "}
                                              <b>
                                                {item.ticketedBills}/
                                                {item.totalBills}
                                              </b>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </div>
                                  <div className="col-md-9 tic-bill-graph">
                                    {this.state.DashboardBillGraphData.length >
                                    0 ? (
                                      <TicketToBillBarGraph
                                        data={this.state.DashboardBillGraphData}
                                      />
                                    ) : null}
                                  </div>
                                </div>
                                {this.state.ticketToBillBarFlag && (
                                  <p>No Data Available</p>
                                )}
                              </div>
                              <div
                                className="tab-pane fade"
                                id="source-tab"
                                role="tabpanel"
                                aria-labelledby="source-tab"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <ul className="bill-graph-list">
                                      {this.state.DashboardSourceGraphData !==
                                        null &&
                                        this.state.DashboardSourceGraphData.map(
                                          (item, i) => (
                                            <li key={i}>
                                              {item.ticketSourceName} :{" "}
                                              <b>{item.ticketSourceCount}</b>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </div>
                                  <div className="col-md-9 ">
                                    {this.state.DashboardSourceGraphData
                                      .length > 0 ? (
                                      <TicketGenerationSourceBar
                                        data={
                                          this.state.DashboardSourceGraphData
                                        }
                                      />
                                    ) : null}
                                  </div>
                                </div>
                                {this.state.ticketGenerationSourceFlag && (
                                  <p>No Data Available</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div
                            className="dash-top-cards"
                            onMouseOver={this.handleMouseHover.bind(this)}
                            onMouseLeave={this.handleMouseHover.bind(this)}
                          >
                            <p className="card-head">SLA</p>
                            {this.state.DashboardNumberData !== null ? (
                              Object.keys(this.state.DashboardNumberData)
                                .length > 0 ? (
                                <div className="resp-success">
                                  <p className="card-head">
                                    Response{" "}
                                    {this.state.DashboardNumberData
                                      .isResponseSuccess === true
                                      ? "Success"
                                      : "Failure"}
                                  </p>
                                  <span className="card-value">
                                    <big>
                                      {
                                        this.state.DashboardNumberData
                                          .responseRate
                                      }
                                    </big>
                                    <span
                                      className={
                                        this.state.TotalNoOfChatShow
                                          ? "dash-res"
                                          : "dash-res dash-res-opac"
                                      }
                                      style={{ marginTop: "-5px" }}
                                    >
                                      Avg. Response TAT &nbsp;
                                      <span style={{ fontWeight: "700" }}>
                                        {
                                          this.state.DashboardNumberData
                                            .avgResponseTAT
                                        }
                                      </span>
                                    </span>
                                  </span>
                                  <p className="card-head mt-lg-4 mt-2">
                                    Resolution{" "}
                                    {this.state.DashboardNumberData
                                      .isResolutionSuccess === true
                                      ? "Success"
                                      : "Failure"}{" "}
                                    :
                                    <span className="font-weight-bold">
                                      {
                                        this.state.DashboardNumberData
                                          .resolutionRate
                                      }
                                    </span>
                                    <span
                                      className={
                                        this.state.TotalNoOfChatShow
                                          ? "dash-res"
                                          : "dash-res dash-res-opac"
                                      }
                                    >
                                      Avg. Resolution TAT &nbsp;
                                      <span style={{ fontWeight: "700" }}>
                                        {
                                          this.state.DashboardNumberData
                                            .avgResolutionTAT
                                        }
                                      </span>
                                    </span>
                                  </p>
                                </div>
                              ) : null
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 d-none">
                          <div className="dash-top-cards">
                            <p className="card-head">Task</p>
                            <div className="aside-cont">
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData.taskOpen <
                                      9
                                      ? "0" +
                                        this.state.DashboardNumberData.taskOpen
                                      : this.state.DashboardNumberData.taskOpen
                                    : null}
                                </span>
                                <small>Open</small>
                              </div>
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData.taskClose <
                                      9
                                      ? "0" +
                                        this.state.DashboardNumberData.taskClose
                                      : this.state.DashboardNumberData.taskClose
                                    : null}
                                </span>
                                <small>Closed</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 order-1 order-lg-0 d-none">
                          <div className="dash-top-cards p-0">
                            <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#task-tab"
                                  role="tab"
                                  aria-controls="task-tab"
                                  aria-selected="true"
                                >
                                  Ticket to Task
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#claim-tab"
                                  role="tab"
                                  aria-controls="claim-tab"
                                  aria-selected="false"
                                >
                                  Ticket to claim
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content task-claim-cont">
                              <div
                                className="tab-pane fade show active"
                                id="task-tab"
                                role="tabpanel"
                                aria-labelledby="task-tab"
                              >
                                {this.state.DashboardTaskGraphData.length >
                                0 ? (
                                  <MultiBarChart
                                    data={this.state.DashboardTaskGraphData}
                                  />
                                ) : null}
                                {Object.keys(this.state.DashboardGraphData)
                                  .length > 0 ? (
                                  <MultiBarChart
                                    data={this.state.DashboardTaskGraphData}
                                  />
                                ) : null}
                                <MultiBarChart
                                  data={
                                    this.state.DashboardGraphData
                                      .tickettoTaskGraph
                                  }
                                />
                              </div>
                              <div
                                className="tab-pane fade"
                                id="claim-tab"
                                role="tabpanel"
                                aria-labelledby="claim-tab"
                              >
                                {this.state.DashboardClaimGraphData.length >
                                0 ? (
                                  <TicketToClaimMultiBar
                                    data={this.state.DashboardClaimGraphData}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="col-lg-3 col-sm-6 d-none">
                          <div className="dash-top-cards">
                            <p className="card-head">Claim</p>
                            <div className="aside-cont">
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData.claimOpen <
                                      9
                                      ? "0" +
                                        this.state.DashboardNumberData.claimOpen
                                      : this.state.DashboardNumberData.claimOpen
                                    : null}
                                </span>
                                <small>Open</small>
                              </div>
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData
                                        .claimClose < 9
                                      ? "0" +
                                        this.state.DashboardNumberData
                                          .claimClose
                                      : this.state.DashboardNumberData
                                          .claimClose
                                    : null}
                                </span>
                                <small>Closed</small>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Collapse>
          <div className="container-fluid">
            <div
              className="table-cntr mt-3 mtictab table-responsive"
              style={{ overflow: "initial" }}
            >
              <a href="#!" className="float-search" onClick={this.toggleSearch}>
                <small>{TitleChange}</small>
                {ImgChange}
              </a>
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
                              onClick={this.ViewSearchData.bind(this, 1)}
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
                                  marginBottom: "0px",
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
                                this.state.SearchListData.map((item, i) => (
                                  <li key={i}>
                                    <label value={item.searchParamID}>
                                      {item.searchName}
                                    </label>
                                    <div>
                                      <a
                                        href="#!"
                                        className="applySearch"
                                        onClick={this.handleApplySearch.bind(
                                          this,
                                          item.searchParamID
                                        )}
                                      >
                                        APPLY
                                      </a>
                                      <a
                                        href="#!"
                                        onClick={this.hadleSearchDeleteData.bind(
                                          this,
                                          item.searchParamID
                                        )}
                                      >
                                        <img
                                          src={DelSearch}
                                          alt="del-search"
                                          className="cr-pnt"
                                          // onClick={this.hadleSearchDeleteData.bind(
                                          //   this,
                                          //   item.searchParamID
                                          // )}
                                        />
                                      </a>
                                    </div>
                                  </li>
                                ))}
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.CreateDateShowRecord,
                                  }}
                                >
                                  <DatePicker
                                    selected={this.state.ByDateCreatDate}
                                    onChange={this.handleByDateCreate.bind(
                                      this
                                    )}
                                    placeholderText="Creation Date"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    value={this.state.ByDateCreatDate}
                                    // className="form-control"
                                  />
                                </div>

                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.LastUpdatedDate,
                                  }}
                                >
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
                                    // className="form-control"
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <select
                                    value={this.state.selectedSlaDueByDate}
                                    onChange={this.handleSlaDueByDate}
                                  >
                                    <option value="0">SLA Due</option>
                                    {this.state.SlaDueData !== null &&
                                      this.state.SlaDueData.map((item, i) => (
                                        <option key={i} value={item.slaDueID}>
                                          {item.slaDueName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <select
                                    value={
                                      this.state.selectedTicketStatusByDate
                                    }
                                    onChange={this.handleTicketStatusByDate}
                                  >
                                    <option value="0">Ticket Status</option>
                                    {this.state.TicketStatusData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.MobileNo }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Customer Mobile No"
                                    name="MobileNoByCustType"
                                    value={this.state.MobileNoByCustType}
                                    onChange={this.handelOnchangeData}
                                    maxLength={10}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Email }}
                                >
                                  <input
                                    type="text"
                                    className="no-bg"
                                    placeholder="Customer Email ID"
                                    name="EmailIdByCustType"
                                    value={this.state.EmailIdByCustType}
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketIDTitle }}
                                >
                                  <input
                                    type="text"
                                    className="no-bg"
                                    placeholder="Ticket ID"
                                    name="TicketIdByCustType"
                                    maxLength={9}
                                    value={this.state.TicketIdByCustType}
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketStatus }}
                                >
                                  <select
                                    value={
                                      this.state.selectedTicketStatusByCustomer
                                    }
                                    onChange={this.handleTicketStatusByCustomer}
                                  >
                                    <option value="0">Ticket Status</option>
                                    {this.state.TicketStatusData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketPriority }}
                                >
                                  <select
                                    value={this.state.selectedPriority}
                                    onChange={this.setPriorityValue}
                                  >
                                    <option value="0">Priority</option>
                                    {this.state.TicketPriorityData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketSource }}
                                >
                                  <select
                                    value={
                                      this.state.selectedTicketStatusByTicket
                                    }
                                    onChange={this.handleTicketStatusByTicket}
                                  >
                                    <option value="0">Ticket Status</option>
                                    {this.state.TicketStatusData !== null &&
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
                                      getOptionLabel={(option) =>
                                        option.nameOfChannel
                                      }
                                      getOptionValue={(option) =>
                                        option.channelOfPurchaseID
                                      }
                                      options={this.state.ChannelOfPurchaseData}
                                      placeholder="Channel Of Purchase"
                                      // menuIsOpen={true}
                                      closeMenuOnSelect={false}
                                      onChange={this.setChannelOfPurchaseValue.bind(
                                        this
                                      )}
                                      value={
                                        this.state.selectedChannelOfPurchase
                                      }
                                      // showNewOptionAtTop={false}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.ticketActionTypeName
                                      }
                                      getOptionValue={(option) =>
                                        option.ticketActionTypeID
                                      }
                                      options={this.state.TicketActionTypeData}
                                      placeholder="Ticket Action Type"
                                      // menuIsOpen={true}
                                      closeMenuOnSelect={false}
                                      onChange={this.setTicketActionTypeValue.bind(
                                        this
                                      )}
                                      value={
                                        this.state.selectedTicketActionType
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Category }}
                                >
                                  <select
                                    value={this.state.selectedCategory}
                                    onChange={this.setCategoryValue}
                                  >
                                    <option value="0">Category</option>
                                    {this.state.CategoryData !== null &&
                                      this.state.CategoryData.map((item, i) => (
                                        <option key={i} value={item.categoryID}>
                                          {item.categoryName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.SubCategory }}
                                >
                                  <select
                                    value={this.state.selectedSubCategory}
                                    onChange={this.setSubCategoryValue}
                                  >
                                    <option value="0">Sub Category</option>
                                    {this.state.SubCategoryData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.IssueType }}
                                >
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketStatus }}
                                >
                                  <select
                                    value={
                                      this.state.selectedTicketStatusByCategory
                                    }
                                    onChange={this.handleTicketStatusByCategory}
                                  >
                                    <option value="0">Ticket Status</option>
                                    {this.state.TicketStatusData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{
                                    display: this.state.CreateDateShowRecord,
                                  }}
                                >
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketSource }}
                                >
                                  <select
                                    value={this.state.selectedTicketSource}
                                    onChange={this.setTicketSourceValue}
                                  >
                                    <option>Ticket Source</option>
                                    {this.state.TicketSourceData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.ClaimID }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Claim ID"
                                    value={this.state.ClaimIdByAll}
                                    name="ClaimIdByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Email }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Email"
                                    value={this.state.EmailByAll}
                                    name="EmailByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{
                                    display: this.state.LastUpdatedDate,
                                  }}
                                >
                                  <DatePicker
                                    selected={this.state.ByAllLastDate}
                                    onChange={this.handleAllLastDate.bind(this)}
                                    placeholderText="Last Updated Date"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    value={this.state.ByAllLastDate}
                                    // className="form-control"
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketIDTitle }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Ticket Id/Title"
                                    value={this.state.TicketIdTitleByAll}
                                    name="TicketIdTitleByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.InvoiceNoSubOrderNo,
                                  }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Invoice Number/Sub Order No"
                                    value={this.state.InvoiceSubOrderByAll}
                                    name="InvoiceSubOrderByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.MobileNo }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Mobile"
                                    maxLength={10}
                                    value={this.state.MobileByAll}
                                    name="MobileByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{ display: this.state.Category }}
                                >
                                  <select
                                    value={this.state.selectedCategoryAll}
                                    onChange={this.setCategoryAllValue}
                                  >
                                    <option value="0">Category</option>
                                    {this.state.CategoryData !== null &&
                                      this.state.CategoryData.map((item, i) => (
                                        <option key={i} value={item.categoryID}>
                                          {item.categoryName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketPriority }}
                                >
                                  <select
                                    value={this.state.selectedPriorityAll}
                                    onChange={this.setPriorityAllValue}
                                  >
                                    <option>Ticket Priority</option>
                                    {this.state.TicketPriorityData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.ItemID }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Item ID"
                                    value={this.state.ItemIdByAll}
                                    name="ItemIdByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.AssignTo }}
                                >
                                  <select
                                    className="add-select-category"
                                    value={this.state.selectedAssignedTo}
                                    onChange={this.setAssignedToValue}
                                  >
                                    <option>Select Assigned To</option>
                                    {this.state.AssignToData !== null &&
                                      this.state.AssignToData.map((item, i) => (
                                        <option key={i} value={item.userID}>
                                          {item.fullName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{ display: this.state.SubCategory }}
                                >
                                  {/* <select>
                                          <option>Sub Category</option>
                                        </select> */}
                                  <select
                                    value={this.state.selectedSubCategoryAll}
                                    onChange={this.setSubCategoryAllValue}
                                  >
                                    <option value="0">Sub Category</option>
                                    {this.state.SubCategoryAllData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketStatus }}
                                >
                                  <select
                                    value={this.state.selectedTicketStatusAll}
                                    onChange={this.handleTicketStatusAll}
                                  >
                                    <option>Ticket Status</option>
                                    {this.state.TicketStatusData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Didvisitstore }}
                                >
                                  <select
                                    value={this.state.selectedVisitStoreAll}
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state
                                      .PurchaseStoreCodeAddress,
                                  }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Purchase Store Code/Address"
                                    value={
                                      this.state
                                        .selectedPurchaseStoreCodeAddressAll
                                    }
                                    onChange={
                                      this.handlePurchaseStoreCodeAddressAll
                                    }
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{ display: this.state.IssueType }}
                                >
                                  {/* <select>
                                          <option>Issue Type</option>
                                        </select> */}
                                  <select
                                    value={this.state.selectedIssueTypeAll}
                                    onChange={this.setIssueTypeAllValue}
                                  >
                                    <option value="0">Issue Type</option>
                                    {this.state.IssueTypeAllData !== null &&
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.SLAStatus }}
                                >
                                  <select
                                    value={this.state.selectedSlaStatus}
                                    onChange={this.setSlaStatusValue}
                                  >
                                    <option value="0">SLA Due</option>
                                    {this.state.SlaDueData !== null &&
                                      this.state.SlaDueData.map((item, i) => (
                                        <option key={i} value={item.slaDueID}>
                                          {item.slaDueName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.Wanttovisitstore,
                                  }}
                                >
                                  <select
                                    value={
                                      this.state.selectedWantToVisitStoreAll
                                    }
                                    onChange={this.handleWantToVisitStoreAll}
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
                                            this.state.selectedWithClaimAll
                                          }
                                          onChange={this.handleWithClaimAll}
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
                                                this.state.selectedClaimStatus
                                              }
                                              onChange={this.handleClaimStatus}
                                            >
                                              <option>Claim Status</option>
                                              {this.state.ClaimStatusData !==
                                                null &&
                                                this.state.ClaimStatusData.map(
                                                  (item, i) => (
                                                    <option
                                                      key={i}
                                                      value={item.claimStatusID}
                                                    >
                                                      {item.claimStatusName}
                                                    </option>
                                                  )
                                                )}
                                            </select>
                                          </div>

                                          <div className="m-b-25">
                                            <select
                                              value={
                                                this.state.selectedClaimCategory
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
                                                      value={item.categoryID}
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
                                                this.setClaimSubCategoryValue
                                              }
                                            >
                                              <option value="0">
                                                Claim Sub Category
                                              </option>
                                              {this.state
                                                .ClaimSubCategoryData !==
                                                null &&
                                                this.state.ClaimSubCategoryData.map(
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

                                          <div className="">
                                            <select
                                              value={
                                                this.state
                                                  .selectedClaimIssueType
                                              }
                                              onChange={
                                                this.setClaimIssueTypeValue
                                              }
                                            >
                                              <option value="0">
                                                Claim Issue Type
                                              </option>
                                              {this.state.ClaimIssueTypeData !==
                                                null &&
                                                this.state.ClaimIssueTypeData.map(
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
                                        </React.Fragment>
                                      ) : null}
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="m-b-25">
                                        <select
                                          value={this.state.selectedWithTaskAll}
                                          onChange={this.handleWithTaskAll}
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
                                                this.state.selectedTaskStatus
                                              }
                                              onChange={this.handleTaskStatus}
                                            >
                                              <option>Task Status</option>
                                              {this.state.TaskStatusData !==
                                                null &&
                                                this.state.TaskStatusData.map(
                                                  (item, i) => (
                                                    <option
                                                      key={i}
                                                      value={item.taskStatusID}
                                                    >
                                                      {item.taskStatusName}
                                                    </option>
                                                  )
                                                )}
                                            </select>
                                          </div>

                                          <div className="m-b-25">
                                            <select
                                              value={
                                                this.state.selectedDepartment
                                              }
                                              onChange={this.setDepartmentValue}
                                            >
                                              <option>Task Department</option>
                                              {this.state.DepartmentData !==
                                                null &&
                                                this.state.DepartmentData.map(
                                                  (item, i) => (
                                                    <option
                                                      key={i}
                                                      value={item.departmentID}
                                                    >
                                                      {item.departmentName}
                                                    </option>
                                                  )
                                                )}
                                            </select>
                                          </div>

                                          <div className="">
                                            <select
                                              value={
                                                this.state.selectedFunction
                                              }
                                              onChange={this.setFunctionValue}
                                            >
                                              <option>Task Function</option>
                                              {this.state.FunctionData !==
                                                null &&
                                                this.state.FunctionData.map(
                                                  (item, i) => (
                                                    <option
                                                      key={i}
                                                      value={item.functionID}
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
                                  {this.state.resultCount < 9
                                    ? "0" + this.state.resultCount
                                    : this.state.resultCount}
                                </span>{" "}
                                Results
                              </p>
                              <a
                                href="#!"
                                className="blue-clr fs-14"
                                onClick={this.clearSearch}
                              >
                                CLEAR SEARCH
                              </a>
                              &nbsp; &nbsp; &nbsp;
                              <a
                                href="#!"
                                className="blue-clr fs-14"
                                onClick={this.setSortCheckStatus.bind(
                                  this,
                                  "all"
                                )}
                              >
                                CLEAR FILTER
                              </a>
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
                                className="schedule-width"
                                // className={{
                                //   modal: "schedule-width"
                                // }}
                                overlayId="logout-ovrly"
                              >
                                <div>
                                  <label>
                                    <b>Schedule date to</b>
                                  </label>
                                  <div>
                                    <div className="normal-dropdown dropdown-setting1 schedule-multi">
                                      <Select
                                        getOptionLabel={(option) =>
                                          option.fullName
                                        }
                                        getOptionValue={
                                          (option) => option.userID //id
                                        }
                                        options={this.state.TeamMemberData}
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
                                    {this.state.selectScheduleDate === "230" ? (
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
                                          <label className="every1">Day</label>
                                        </span>
                                      </div>
                                    ) : null}
                                    {this.state.selectScheduleDate === "231" ? (
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
                                            marginTop: "10px",
                                          }}
                                        >
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Mon"
                                          >
                                            Mon
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Tue"
                                          >
                                            Tue
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Wed"
                                          >
                                            Wed
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Thu"
                                          >
                                            Thu
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Fri"
                                          >
                                            Fri
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Sat"
                                          >
                                            Sat
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Sun"
                                          >
                                            Sun
                                          </Checkbox>
                                        </div>
                                      </div>
                                    ) : null}
                                    {this.state.selectScheduleDate === "232" ? (
                                      <div className="ScheduleDate-to">
                                        <span>
                                          <label className="every1">Day</label>
                                          <input
                                            type="text"
                                            className="Every"
                                            placeholder="9"
                                            onChange={this.handleDaysForMonth}
                                          />
                                          <label className="every1">
                                            of every
                                          </label>
                                          <input
                                            type="text"
                                            className="Every"
                                            placeholder="1"
                                            onChange={this.handleMonthForMonth}
                                          />
                                          <label className="every1">
                                            months
                                          </label>
                                        </span>
                                      </div>
                                    ) : null}
                                    {this.state.selectScheduleDate === "233" ? (
                                      <div className="ScheduleDate-to">
                                        <span>
                                          <label className="every1">
                                            Every
                                          </label>
                                          <input
                                            type="text"
                                            className="Every"
                                            placeholder="1"
                                            onChange={this.handleMonthForWeek}
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
                                              onChange={this.handleWeekForWeek}
                                              value={
                                                this.state
                                                  .selectedNoOfWeekForWeek
                                              }
                                            >
                                              <option value="0">Select</option>
                                              <option value="2">Second</option>
                                              <option value="4">Four</option>
                                            </select>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.days
                                                }
                                                getOptionValue={
                                                  (option) => option.days //id
                                                }
                                                options={
                                                  this.state.NameOfDayForWeek
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
                                    {this.state.selectScheduleDate === "234" ? (
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
                                                getOptionLabel={(option) =>
                                                  option.month
                                                }
                                                getOptionValue={
                                                  (option) => option.month //id
                                                }
                                                options={
                                                  this.state.NameOfMonthForYear
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
                                            onChange={this.handleDayForYear}
                                          />
                                        </div>
                                      </div>
                                    ) : null}
                                    {this.state.selectScheduleDate === "235" ? (
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
                                                <option value="4">Four</option>
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
                                                getOptionLabel={(option) =>
                                                  option.days
                                                }
                                                getOptionValue={
                                                  (option) => option.days //id
                                                }
                                                options={
                                                  this.state.NameOfDayForYear
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
                                              lineHeight: "40px",
                                            }}
                                          >
                                            to
                                          </label>
                                          <div className="col-md-6">
                                            <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.month
                                                }
                                                getOptionValue={
                                                  (option) => option.month //id
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

                                    {/* <input
                                      type="text"
                                      className="txt-1 txt1Place txt1Time"
                                      placeholder="11AM"
                                      onChange={this.handleScheduleTime}
                                    /> */}
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
                                        value={this.state.selectedScheduleTime}
                                      />
                                    </div>

                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0",
                                        textAlign: "center",
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
                                    <div onClick={this.ScheduleCloseModel}>
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
                                    ? this.handleAssignModalOpen.bind(this)
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
                                onClose={this.handleAssignModalClose.bind(this)}
                                open={this.state.AssignModal}
                                modalId="AssignPop-up"
                              >
                                <div className="assign-modal-headerDashboard">
                                  <a
                                    href="#!"
                                    onClick={this.handleAssignModalClose.bind(
                                      this
                                    )}
                                  >
                                    <img
                                      src={BlackLeftArrow}
                                      alt="black-left-arrow-icon"
                                      className="black-left-arrow"
                                      // onClick={this.handleAssignModalClose.bind(
                                      //   this
                                      // )}
                                    />
                                  </a>
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
                                      value={this.state.selectedDesignation}
                                      onChange={this.setDesignationValue}
                                    >
                                      {/* <option>Select</option> */}
                                      <option>Designation</option>
                                      {this.state.DesignationData !== null &&
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
                                <div className="assign-modal-body">
                                  <ReactTable
                                    data={SearchAssignData}
                                    columns={[
                                      {
                                        Header: <span>Agent</span>,
                                        accessor: "agent",
                                        Cell: (row) => {
                                          var ids = row.original["user_ID"];
                                          return (
                                            <div>
                                              <span>
                                                <img
                                                  src={Headphone2Img}
                                                  alt="headphone"
                                                  className="oval-55 assign-hdphone"
                                                  id={ids}
                                                />
                                                {row.original["agentName"]}
                                              </span>
                                            </div>
                                          );
                                        },
                                      },
                                      {
                                        Header: <span>Designation</span>,
                                        accessor: "designation",
                                      },
                                      {
                                        Header: <span>Email</span>,
                                        accessor: "email",
                                      },
                                    ]}
                                    // resizable={false}
                                    defaultPageSize={5}
                                    minRows={3}
                                    showPagination={true}
                                    getTrProps={this.handleTicketDetails}
                                    className="assign-ticket-table"
                                  />
                                  <p
                                    style={{
                                      marginTop:
                                        this.state.agentSelection === ""
                                          ? "0px"
                                          : "10px",
                                      color: "red",
                                      marginBottom: "0",
                                      textAlign: "center",
                                    }}
                                  >
                                    {this.state.agentSelection}
                                  </p>
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
                <div className="MyTicketListReact cus-head">
                  <ReactTable
                    data={SearchTicketData}
                    columns={[
                      {
                        Header: (
                          <span>
                            <div className="filter-type pink1 pinkmyticket">
                              <div className="filter-checkbox pink2 pinkmargin">
                                {this.state.ShowGridCheckBox === true ? (
                                  <input
                                    type="checkbox"
                                    id="fil-aball"
                                    name="MyTicketListcheckbox[]"
                                    // checked={this.state.CheckBoxChecked}
                                    onChange={this.checkAllCheckbox.bind(this)}
                                  />
                                ) : null}
                                <label htmlFor="fil-aball" className="ticketid">
                                  ID
                                </label>
                              </div>
                            </div>
                          </span>
                        ),
                        accessor: "ticketID",
                        Cell: (row) => {
                          return (
                            <span onClick={(e) => this.clickCheckbox(e)}>
                              <div className="filter-type pink1 pinkmyticket">
                                <div className="filter-checkbox pink2 pinkmargin">
                                  {this.state.ShowGridCheckBox === true ? (
                                    <input
                                      type="checkbox"
                                      id={"j" + row.original.ticketID}
                                      name="MyTicketListcheckbox[]"
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
                                  ) : null}

                                  <label htmlFor={"j" + row.original.ticketID}>
                                    {row.original.ticketSourceType ===
                                    "Calls" ? (
                                      <img
                                        src={HeadPhone3}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="Calls"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "Mails" ? (
                                      <img
                                        src={MailImg}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="Mails"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "Facebook" ? (
                                      <img
                                        src={FacebookImg}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="Facebook"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "ChatBot" ? (
                                      <img
                                        src={Chat}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="ChatBot"
                                      />
                                    ) : row.original.ticketSourceType ===
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
                        },
                      },
                      {
                        Header: (
                          <span
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "status",
                              "Status"
                            )}
                            className={this.state.statusColor}
                          >
                            Status <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "ticketStatus",
                        Cell: (row) => {
                          if (row.original.ticketStatus === "Open") {
                            return (
                              <span className="table-b table-blue-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else if (row.original.ticketStatus === "Resolved") {
                            return (
                              <span className="table-b table-green-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else if (row.original.ticketStatus === "New") {
                            return (
                              <span className="table-b table-yellow-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else if (row.original.ticketStatus === "Solved") {
                            return (
                              <span className="table-b table-green-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else {
                            return (
                              <span className="table-b table-green-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          }
                        },
                      },
                      {
                        Header: <span></span>,
                        accessor: "taskStatus",
                        width: 45,
                        Cell: (row) => {
                          if (row.original.claimStatus !== "0/0") {
                            return (
                              <div>
                                <Popover
                                  content={
                                    <div className="dash-task-popup-new">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <p className="m-b-0">
                                          CLAIM:{row.original.claimStatus}
                                        </p>
                                        <div className="d-flex align-items-center">
                                          2 NEW
                                          <div className="nw-chat">
                                            <img src={Chat} alt="chat" />
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
                        },
                      },
                      {
                        Header: <span></span>,
                        accessor: "taskStatus",
                        width: 45,
                        Cell: (row) => {
                          if (row.original.taskStatus !== "0/0") {
                            return (
                              <div>
                                <Popover
                                  content={
                                    <div className="dash-task-popup-new">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <p className="m-b-0">
                                          TASK:{row.original.taskStatus}
                                        </p>
                                        {row.original.ticketCommentCount > 0 ? (
                                          <div className="d-flex align-items-center">
                                            {row.original.ticketCommentCount}{" "}
                                            NEW
                                            <div className="nw-chat">
                                              <img src={Chat} alt="chat" />
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
                          } else {
                            return (
                              <div>
                                <img
                                  className="task-icon-1 marginimg"
                                  src={TaskIconGray}
                                  alt="task-icon-gray"
                                />
                              </div>
                            );
                          }
                        },
                      },
                      {
                        Header: (
                          <label className="ticketid">
                            <span>Subject/</span>
                            <span style={{ fontSize: "10px !important" }}>
                              Latest Message
                            </span>
                          </label>
                        ),
                        accessor: "message",
                        Cell: (row) => {
                          return (
                            <div>
                              {row.original.message.split("-")[0]}/
                              <span style={{ color: "#666" }}>
                                {row.original.message.split("-")[1]}
                              </span>
                            </div>
                          );
                        },
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
                            Category <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "category",
                        Cell: (row) => (
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
                        ),
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
                            Priority <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "priority",
                        minWidth: 50,
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
                            Assignee <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "assignee",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.creationColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdOn",
                              " Creation On"
                            )}
                          >
                            Creation On <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdOn",
                        Cell: (row) => (
                          <span className="one-line-outer">
                            <label className="one-line">
                              {row.original.createdOn}
                            </label>

                            <Popover
                              content={
                                <div className="insertpop1 new-insertpop1">
                                  <ul className="dash-creation-popup">
                                    <li className="title">Creation details</li>
                                    <li>
                                      <p> {row.original.createdBy} Created</p>
                                      <p>{row.original.createdago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        Assigned to {row.original.assignedTo}
                                      </p>
                                      <p>{row.original.assignedago}</p>
                                    </li>
                                    <li>
                                      <p>Updated by {row.original.updatedBy}</p>
                                      <p>{row.original.updatedago}</p>
                                    </li>
                                    <li>
                                      <p>Response time remaining by</p>
                                      <p>
                                        {row.original.responseTimeRemainingBy}
                                      </p>
                                    </li>
                                    <li>
                                      <p>Response overdue by</p>
                                      <p>{row.original.responseOverdueBy}</p>
                                    </li>
                                    <li>
                                      <p>Resolution overdue by</p>
                                      <p>{row.original.resolutionOverdueBy}</p>
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
                        ),
                      },
                    ]}
                    resizable={false}
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
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Dashboard;
