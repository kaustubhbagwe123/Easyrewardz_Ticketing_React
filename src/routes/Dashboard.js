import React, { Component, Fragment } from "react";
// import "../../node_modules/jquery/dist/jquery.js";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import SearchIcon from "./../assets/Images/search-icon.png";
import Dash from "./../assets/Images/dash.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import Sorting from "./../assets/Images/sorting.png";
// import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import Chat from "./../assets/Images/chat.png";
import csv from "./../assets/Images/csv.png";
import Schedule from "./../assets/Images/schedule.png";
import Assign from "./../assets/Images/assign.png";
import CancalImg from "./../assets/Images/cancal blue.png";
import DelSearch from "./../assets/Images/del-search.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import { Collapse, CardBody, Card } from "reactstrap";
import Demo from "../store/Hashtag.js";
// import { UncontrolledPopover, PopoverBody } from "reactstrap";
import MultiBarChart from "../Component/PieChart/MultiBarChart.js";
import TicketToBillBarGraph from "../Component/PieChart/TicketToBillBarGraph";
import TicketGenerationSourceBar from "../Component/PieChart/TicketGenerationSourceBar";
import TicketToClaimMultiBar from "../Component/PieChart/TicketToClaimMultiBar";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import OpenByPriorityPie from "../Component/PieChart/PieChart";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover } from "antd";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import { Checkbox } from "antd";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import ScheduleDateDropDown from "./ScheduleDateDropDown";
import Select from "react-select";
import { authHeader } from "../helpers/authHeader";
import axios from "axios";
import config from "./../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import SlaDue from "./SlaDue";
import TicketStatus from "./TicketStatus";
import TicketActionType from "./TicketActionType";
import ClaimStatus from "./ClaimStatus";
import TaskStatus from "./TaskStatus";
import { CSVLink } from "react-csv";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
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
      selectedVisitStoreAll: "yes",
      selectedWantToVisitStoreAll: "yes",
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
          department: "Team Member 1"
        },
        {
          department: "Team Member 2"
        },
        {
          department: "Team Member 3"
        },
        {
          department: "Team Member 4"
        }
      ],
      selectedTicketStatusAll: 0,
      selectedDesignation: 0,
      ChannelOfPurchaseData: [],
      selectedPriority: 0,
      selectedPriorityAll: 0,
      selectedTicketStatusByDate: 0,
      selectedNoOfDay: "",
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
      NameOfDayForWeek: [
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
      NameOfDayForYear: [
        {
          days: "Sunday"
        },
        {
          days: "Monday"
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
      resultCount: 0,
      loading: false,
      SearchNameCompulsory: "",
      loadingAbove: true
    };
    this.handleAssignTo = this.handleAssignTo.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
    // this.handleApply = this.handleApply.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleSearchTicketEscalation = this.handleSearchTicketEscalation.bind(
      this
    );
    this.handleAdvSearchFlag = this.handleAdvSearchFlag.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleSchedulePopup = this.handleSchedulePopup.bind(this);
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
    // this.toggleHoverState = this.toggleHoverState.bind(this);
  }
  // handleApply(event, picker) {
  //   this.setState({
  //     startDate: picker.startDate,
  //     endDate: picker.endDate,
  //   });
  // }

  componentDidMount() {
    debugger;
    this.handleSearchTicketEscalation();
    this.handleGetDepartmentList();
    this.handleGetTicketSourceList();
    this.handleGetCategoryList();
    this.handleGetSlaStatusList();
    this.handleGetDesignationList();
    this.handleGetTicketPriorityList();
    this.handleGetChannelOfPurchaseList();
    this.handleGetBrandList();
    // this.handleGetDashboardNumberData();
    // this.handleGetDashboardGraphData();
    this.handleGetAgentList();
    this.handleGetSaveSearchList();
  }

  clickCheckbox(evt) {
    evt.stopPropagation();
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

  handleGetDashboardNumberData() {
    this.setState({ loadingAbove: true });
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardCountData",
      headers: authHeader(),
      params: {
        UserIds: this.state.AgentIds,
        // UserIds: "6,7,8",
        fromdate: moment(this.state.start._d).format("YYYY-MM-DD"),
        // fromdate: this.state.start._d,
        // fromdate: "2019-12-26",
        todate: moment(this.state.end._d).format("YYYY-MM-DD"),
        // todate: this.state.end._d,
        // todate: "2020-01-15",
        BrandID: this.state.BrandIds
        // BrandID: "26, 31"
      }
    }).then(function(res) {
      debugger;
      let DashboardNumberData = res.data.responseData;
      self.setState({ DashboardNumberData: DashboardNumberData });
      if (
        Object.keys(self.state.DashboardGraphData).length > 0 &&
        Object.keys(self.state.DashboardNumberData).length > 0
      ) {
        self.setState({ loadingAbove: false });
      }
    });
  }
  handleGetDashboardGraphData() {
    this.setState({ loadingAbove: true });
    debugger;
    let self = this;
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
        fromdate: moment(this.state.start._d).format("YYYY-MM-DD"),
        // todate: this.state.end._d,
        todate: moment(this.state.end._d).format("YYYY-MM-DD"),
        BrandID: this.state.BrandIds
      }
    }).then(function(res) {
      debugger;
      if (res.data.responseData !== null) {
        let DashboardGraphData = res.data.responseData;
        let DashboardBillGraphData = res.data.responseData.tickettoBillGraph;
        let DashboardSourceGraphData = res.data.responseData.ticketSourceGraph;
        let DashboardTaskGraphData = res.data.responseData.tickettoTaskGraph;
        let DashboardPriorityGraphData = res.data.responseData.priorityChart;
        let DashboardClaimGraphData = res.data.responseData.tickettoClaimGraph;
        if (DashboardTaskGraphData !== null) {
          self.setState({
            DashboardTaskGraphData
          });
        }
        if (DashboardClaimGraphData !== null) {
          self.setState({
            DashboardClaimGraphData
          });
        }
        if (DashboardBillGraphData !== null) {
          self.setState({
            DashboardBillGraphData
          });
        }
        if (DashboardSourceGraphData !== null) {
          self.setState({
            DashboardSourceGraphData
          });
        }
        if (DashboardPriorityGraphData !== null) {
          self.setState({
            DashboardPriorityGraphData
          });
        }
        self.setState({
          DashboardGraphData: DashboardGraphData
        });
        if (
          Object.keys(self.state.DashboardGraphData).length > 0 &&
          Object.keys(self.state.DashboardNumberData).length > 0
        ) {
          self.setState({ loadingAbove: false });
        }
      }
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
      AgentIds: strAgentIds
    });
    if (this.state.AgentIds !== "" && this.state.BrandIds !== "") {
      this.handleGetDashboardNumberData();
      this.handleGetDashboardGraphData();
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
      BrandIds: strBrandIds
    });
    if (this.state.AgentIds !== "" && this.state.BrandIds !== "") {
      this.handleGetDashboardNumberData();
      this.handleGetDashboardGraphData();
    }
  }
  checkIndividualAgent = event => {
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
        DashboardPriorityGraphData: []
      },
      () => {
        this.handleGetDashboardNumberData();
        this.handleGetDashboardGraphData();
      }
    );
  };
  checkIndividualBrand = event => {
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
        DashboardPriorityGraphData: []
      },
      () => {
        this.handleGetDashboardNumberData();
        this.handleGetDashboardGraphData();
      }
    );
  };
  checkAllAgent = async event => {
    debugger;
    this.setState(state => ({ CheckBoxAllAgent: !state.CheckBoxAllAgent }));
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
      AgentIds: strAgentIds
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
  };
  checkAllBrand = async event => {
    debugger;

    this.setState(state => ({ CheckBoxAllBrand: !state.CheckBoxAllBrand }));
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
      BrandIds: strBrandIds
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
  };
  handleGetAgentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let AgentData = res.data.responseData;
      self.setState({ AgentData: AgentData });
      self.checkAllAgentStart();
    });
  }
  handleGetBrandList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let BrandData = res.data.responseData;
      self.setState({ BrandData: BrandData });
      self.checkAllBrandStart();
    });
  }
  handelCheckBoxCheckedChange = async () => {
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
    await this.setState({
      ticketIds: strIds
    });
  };
  handleTicketDetails = (rowInfo, column) => {
    const index = column ? column.index : -1;
    return {
      onClick: e => {
        debugger;
        this.selectedRow = index;
        var agentId = column.original["user_ID"];
        this.setState({ agentId });
      },
      style: {
        background: this.selectedRow === index ? "#ECF2F4" : null
      }
    };
  };
  setAssignedToValue = e => {
    let assign = e.currentTarget.value;
    this.setState({ selectedAssignedTo: assign });
  };

  handleAssignTo() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let AssignData = res.data.responseData;

      self.setState({
        AssignToData: AssignData
      });
    });
  }

  setScheduleFor = e => {
    let scheduleForValue = e.currentTarget.value;
    this.setState({ selectedScheduleFor: scheduleForValue });
  };
  setIssueTypeValue = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });
  };
  setSlaStatusValue = e => {
    let slaStatusValue = e.currentTarget.value;
    this.setState({ selectedSlaStatus: slaStatusValue });
  };
  handleVisitStoreCodeAddressAll = e => {
    let visitStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedVisitStoreCodeAddressAll: visitStoreCodeAddressAllValue
    });
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
  applyCallback = async (startDate, endDate) => {
    debugger;
    await this.setState({
      start: startDate,
      end: endDate,
      DashboardTaskGraphData: [],
      DashboardClaimGraphData: [],
      DashboardBillGraphData: [],
      DashboardSourceGraphData: [],
      DashboardPriorityGraphData: []
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
    this.setState(state => ({ collapse: !state.collapse }));
  }
  toggleSearch() {
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  handleTicketStatusByDate = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByDate: ticketStatusValue });
  };
  handleWantToVisitStoreAll = e => {
    let wantToVisitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedWantToVisitStoreAll: wantToVisitStoreAllValue });
  };
  handleScheduleTime(e) {
    debugger;
    this.setState({
      selectedScheduleTime: e
    });
  }
  handleAssignRemark(e) {
    debugger;
    this.setState({
      agentRemark: e.currentTarget.value
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
  handelOnchangeData(e) {
    this.setState({
      [e.target.name]: e.target.value
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
  handleGetDepartmentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let DepartmentData = res.data.responseData;
      self.setState({ DepartmentData: DepartmentData });
    });
  }
  handleWithTaskAll = e => {
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
        selectedDesignation: 0
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
  setFunctionValue = e => {
    let functionValue = e.currentTarget.value;
    this.setState({ selectedFunction: functionValue });
  };
  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let TicketPriorityData = res.data.responseData;
      self.setState({ TicketPriorityData: TicketPriorityData });
    });
  }
  handleTicketStatusAll = e => {
    let ticketStatusAllValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusAll: ticketStatusAllValue });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };

  setDesignationValue = e => {
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
  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }
  HandleChangeRedict() {
    this.props.history.push("/admin/chatdashboard");
  }
  handlechangebtntab(e) {
    var idIndex = e.target.className;
    this.setState({ TicketTabIndex: idIndex });
  }
  onChange = date => this.setState({ date });

  checkAllCheckbox = async event => {
    debugger;
    var strIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
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
  handleMouseHover() {
    this.setState({ TotalNoOfChatShow: !this.state.TotalNoOfChatShow });
  }
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
  handleDaysForMonth(e) {
    debugger;
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value
    });
  }

  handleWeekly(e) {
    debugger;
    this.setState({
      selectedNoOfWeek: e.currentTarget.value
    });
  }

  setPriorityValue = e => {
    let priorityValue = e.currentTarget.value;
    this.setState({ selectedPriority: priorityValue });
  };
  setPriorityAllValue = e => {
    let priorityAllValue = e.currentTarget.value;
    this.setState({ selectedPriorityAll: priorityAllValue });
  };
  handleDailyDay(e) {
    debugger;
    this.setState({
      selectedNoOfDay: e.currentTarget.value
    });
  }
  setClaimCategoryValue = e => {
    let claimCategoryValue = e.currentTarget.value;
    this.setState({ selectedClaimCategory: claimCategoryValue });
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        this.handleGetClaimSubCategoryList();
      }
    }, 1);
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
  setChannelOfPurchaseValue = e => {
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTicketActionTypeValue = e => {
    this.setState({ selectedTicketActionType: e });
  };
  setCategoryValue = e => {
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategory: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
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
  setSubCategoryAllValue = e => {
    let subCategoryAllValue = e.currentTarget.value;
    this.setState({ selectedSubCategoryAll: subCategoryAllValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryAll) {
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
  setTicketSourceValue = e => {
    let ticketSourceValue = e.currentTarget.value;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };

  handleVisitStoreAll = e => {
    let visitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedVisitStoreAll: visitStoreAllValue });
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
      let DesignationData = res.data.responseData;
      self.setState({ DesignationData: DesignationData });
    });
  }
  handleSchedulePopup() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Schedule",
      headers: authHeader(),
      data: {
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
      }
    });
  }
  handleWeekForYear(e) {
    debugger;
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value
    });
  }
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
  setTeamMember = e => {
    debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, s => s.department)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };
  handleWeekForWeek(e) {
    debugger;
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value
    });
  }
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
  handleMonthForWeek(e) {
    debugger;
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value
    });
  }
  handleDayForYear(e) {
    debugger;
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value
    });
  }
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
  handleAssignTickets() {
    debugger;

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
        self.handleSearchTicketEscalation();
      }
      // self.setState({
      //   SlaStatusData: SlaStatusData
      // });
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
      let SlaStatusData = res.data.responseData;
      self.setState({
        SlaStatusData: SlaStatusData
      });
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
      let TicketSourceData = res.data.responseData;
      self.setState({
        TicketSourceData: TicketSourceData
      });
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
  handleGetCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let CategoryData = res.data;
      // let CategoryDataAll = res.data;
      self.setState({
        CategoryData: CategoryData
        // CategoryDataAll: CategoryDataAll
      });
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
      let ClaimSubCategoryData = res.data.responseData;
      self.setState({
        ClaimSubCategoryData: ClaimSubCategoryData
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
      if (self.state.byCategoryFlag === 4) {
        var SubCategoryData = res.data.responseData;
        self.setState({
          SubCategoryData: SubCategoryData
        });
      } else if (self.state.allFlag === 5) {
        var SubCategoryAllData = res.data.responseData;
        self.setState({
          SubCategoryAllData: SubCategoryAllData
        });
      }
    });
  }
  clearSearch() {
    debugger;
    if (this.state.byDateFlag === 1) {
      this.setState({
        ByDateCreatDate: "",
        ByDateSelectDate: "",
        selectedSlaDueByDate: 0,
        selectedTicketStatusByDate: 0,
        resultCount: 0
      });
      this.handleSearchTicketEscalation();
    } else if (this.state.byCustomerTypeFlag === 2) {
      this.setState({
        MobileNoByCustType: "",
        EmailIdByCustType: "",
        TicketIdByCustType: "",
        selectedTicketStatusByCustomer: 0,
        resultCount: 0
      });
      this.handleSearchTicketEscalation();
    } else if (this.state.byTicketTypeFlag === 3) {
      this.setState({
        selectedPriority: 0,
        selectedTicketStatusByTicket: 0,
        selectedChannelOfPurchase: [],
        selectedTicketActionType: [],
        resultCount: 0
      });
      this.handleSearchTicketEscalation();
    } else if (this.state.byCategoryFlag === 4) {
      this.setState({
        selectedCategory: 0,
        selectedSubCategory: 0,
        selectedIssueType: 0,
        selectedTicketStatusByCategory: 0,
        resultCount: 0
      });
      this.handleSearchTicketEscalation();
    } else if (this.state.allFlag === 5) {
      this.setState({
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
        selectedVisitStoreAll: "yes",
        selectedPurchaseStoreCodeAddressAll: "",
        selectedIssueTypeAll: 0,
        selectedSlaStatus: 0,
        selectedWantToVisitStoreAll: "yes",
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
      });
      this.handleSearchTicketEscalation();
    }
  }
  ViewSearchData() {
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
      customerType["CustomerMobileNo"] = this.state.MobileNoByCustType;
      customerType["CustomerEmailID"] = this.state.EmailIdByCustType;
      customerType["TicketID"] = this.state.TicketIdByCustType;
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
      allTab["TicketIdORTitle"] = this.state.TicketIdTitleByAll;
      allTab["PriorityId"] = this.state.selectedPriorityAll;
      allTab["TicketSatutsID"] = this.state.selectedTicketStatusAll;
      allTab["SLAStatus"] = this.state.selectedSlaStatus;
      allTab["ClaimId"] = this.state.selectedClaimStatus;
      allTab["InvoiceNumberORSubOrderNo"] = this.state.InvoiceSubOrderByAll;
      allTab["OrderItemId"] = this.state.ItemIdByAll;
      allTab["IsVisitStore"] = this.state.selectedVisitStoreAll;
      allTab["IsWantVistingStore"] = this.state.selectedWantToVisitStoreAll;
      allTab["CustomerEmailID"] = this.state.EmailByAll;
      allTab["CustomerMobileNo"] = this.state.MobileByAll;
      allTab["AssignTo"] = this.state.selectedAssignedTo;
      allTab[
        "StoreCodeORAddress"
      ] = this.state.selectedPurchaseStoreCodeAddressAll;
      allTab[
        "WantToStoreCodeORAddress"
      ] = this.state.selectedVisitStoreCodeAddressAll;
      allTab["HaveClaim"] = withClaim;
      allTab["ClaimStatusId"] = this.state.selectedClaimStatus;
      allTab["ClaimCategoryId"] = this.state.selectedClaimCategory;
      allTab["ClaimSubCategoryId"] = this.state.selectedClaimSubCategory;
      allTab["ClaimIssueTypeId"] = this.state.selectedClaimIssueType;
      allTab["HaveTask"] = withTask;
      allTab["TaskStatusId"] = this.state.selectedTaskStatus;
      allTab["TaskDepartment_Id"] = this.state.selectedDepartment;
      allTab["TaskFunction_Id"] = this.state.selectedFunction;
    }

    //----------------------------------------------------------

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
        searchDataByAll: allTab
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
        self.setState({
          SearchTicketData: data,
          resultCount: count,
          loading: false
        });
        for (let i = 0; i < CSVData.length; i++) {
          delete CSVData[i].totalpages;
          delete CSVData[i].responseTimeRemainingBy;
          delete CSVData[i].responseOverdueBy;
          delete CSVData[i].resolutionOverdueBy;
          delete CSVData[i].ticketCommentCount;
        }
        self.setState({ CSVDownload: CSVData });
      } else {
        self.setState({
          SearchTicketData: [],
          resultCount: 0,
          loading: false
        });
      }
    });
  }
  SaveSearchData() {
    debugger;
    let self = this;
    if (this.state.SearchName.length > 0) {
      var paramData = {
        ByDate: this.state.byDateFlag,
        creationDate: this.state.ByDateCreatDate,
        lastUpdatedDate: this.state.ByDateSelectDate,
        SLADue: this.state.selectedSlaDueByDate,
        ticketStatus: this.state.selectedTicketStatusByDate,
        ByCustomerType: this.state.byCustomerTypeFlag,
        customerMob: this.state.MobileNoByCustType,
        customerEmail: this.state.EmailIdByCustType,
        TicketID: this.state.TicketIdByCustType,
        ticketStatus: this.state.selectedTicketStatusByCustomer,
        ByTicketType: this.state.byTicketTypeFlag,
        Priority: this.state.selectedPriority,
        ticketStatus: this.state.selectedTicketStatusByTicket,
        chanelOfPurchase: this.state.selectedChannelOfPurchase,
        ticketActionType: this.state.selectedTicketActionType,
        ByCategory: this.state.byCategoryFlag,
        Category: this.state.selectedCategory,
        subCategory: this.state.selectedSubCategory,
        issueType: this.state.selectedIssueType,
        ticketStatus: this.state.selectedTicketStatusByCategory,
        byAll: this.state.allFlag
      };
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/savesearch",
        headers: authHeader(),
        params: {
          SearchSaveName: this.state.SearchName,
          parameter: JSON.stringify(paramData)
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
      let SearchListData = res.data.responseData;
      self.setState({ SearchListData: SearchListData });
    });
  }
  handleSearchTicketEscalation() {
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
        isEscalation: 1
        // ticketStatus: ticketStatus
      }
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      let Status = res.data.message;
      let CSVData = data;
      if (Status === "Record Not Found") {
        self.setState({ SearchTicketData: [], loading: false });
      } else if (data !== null) {
        self.setState({ SearchTicketData: data, loading: false });
        for (let i = 0; i < CSVData.length; i++) {
          delete CSVData[i].totalpages;
          delete CSVData[i].responseTimeRemainingBy;
          delete CSVData[i].responseOverdueBy;
          delete CSVData[i].resolutionOverdueBy;
          delete CSVData[i].ticketCommentCount;
        }
        self.setState({ CSVDownload: CSVData });
      }
    });
  }
  handlePurchaseStoreCodeAddressAll = e => {
    let purchaseStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedPurchaseStoreCodeAddressAll: purchaseStoreCodeAddressAllValue
    });
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
  handleAssignedToAll = e => {
    let assignedToAllValue = e.currentTarget.value;
    this.setState({ selectedAssignedToAll: assignedToAllValue });
  };
  handleWithClaimAll = e => {
    let withClaimAllValue = e.currentTarget.value;
    this.setState({ selectedWithClaimAll: withClaimAllValue });
  };
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
  handleSlaDueByDate = e => {
    let slaDueValue = e.currentTarget.value;
    this.setState({ selectedSlaDueByDate: slaDueValue });
  };
  handleMonthForMonth(e) {
    debugger;
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value
    });
  }
  setClaimIssueTypeValue = e => {
    let claimIssueTypeValue = e.currentTarget.value;
    this.setState({ selectedClaimIssueType: claimIssueTypeValue });
  };
  setIssueTypeAllValue = e => {
    let issueTypeAllValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeAll: issueTypeAllValue });
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
      let data = res.data.responseData;
      self.setState({ ClaimIssueTypeData: data });
    });
  }

  render() {
    const { SearchAssignData, SearchTicketData } = this.state;
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    let ranges = {
      "Today Only": [moment(start), moment(end)],
      "Yesterday Only": [
        moment(start).subtract(1, "days"),
        moment(end).subtract(1, "days")
      ],
      "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    };
    let local = {
      format: "DD-MM-YYYY",
      sundayFirst: false
    };

    const TitleChange = this.state.collapseSearch
      ? "Close Search"
      : "Search Tickets";

    const ImgChange = this.state.collapseSearch ? (
      <img className="search-icon" src={CancalImg} alt="search-icon" />
    ) : (
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
    );

    let value = `${this.state.start.format(
      "DD-MM-YYYY"
    )} - ${this.state.end.format("DD-MM-YYYY")}`;
    let disabled = false;
    return (
      <Fragment>
        <NotificationContainer />
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
                  <a href={Demo.BLANK_LINK} className="sorting-icon">
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a href={Demo.BLANK_LINK} className="sorting-icon">
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-open" name="filter-type" />
                  <label htmlFor="fil-open">
                    <span className="table-btn table-blue-btn">Open</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-new" name="filter-type" />
                  <label htmlFor="fil-new">
                    <span className="table-btn table-yellow-btn">New</span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input type="checkbox" id="fil-solved" name="filter-type" />
                  <label htmlFor="fil-solved">
                    <span className="table-btn table-green-btn">Solved</span>
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
            <div className="d-flex">
              <span>Date Range : </span>
              <div className="DashTimeRange">
                <Row className="show-grid" style={{ textAlign: "center" }}>
                  {/* <Col xs={3} /> */}
                  <Col xs={6} md={12} id="DateTimeRangeContainerNoMobileMode">
                    <DateTimeRangeContainer
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
                    </DateTimeRangeContainer>
                  </Col>
                  {/* <Col xs={3} md={4} /> */}
                </Row>
              </div>
            </div>
          </div>
        </div>
        <section className="dash-cntr">
          <div className="dashboard-collapse-icon" onClick={this.toggle}>
            <img src={Dash} alt="dash-icon" />
          </div>
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
                            className="col-md col-sm-4 col-6"
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
                            <div className="prio-pie-chart">
                              {this.state.DashboardPriorityGraphData.length >
                              0 ? (
                                <OpenByPriorityPie
                                  data={this.state.DashboardPriorityGraphData}
                                />
                              ) : null}
                            </div>
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
                                  Tickets to bill graph
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
                                  Tickets generation source tab
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
                                  </p>
                                </div>
                              ) : null
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
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
                        <div className="col-lg-6 order-1 order-lg-0">
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
                                {/* {Object.keys(this.state.DashboardGraphData).length > 0 ? <MultiBarChart data={this.state.DashboardTaskGraphData} /> : null} */}
                                {/* <MultiBarChart data={this.state.DashboardGraphData.tickettoTaskGraph} /> */}
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
                        </div>
                        <div className="col-lg-3 col-sm-6">
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
                        </div>
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
                              onClick={this.ViewSearchData.bind(this)}
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
                                this.state.SearchListData.map((item, i) => (
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
                                ))}

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
                              {/* <div className="row justify-content-between">
                                      <div className="col-auto d-flex align-items-center">
                                        <p className="font-weight-bold mr-3">
                                          <span className="blue-clr">04</span>{" "}
                                          Results
                                        </p>
                                        <p className="blue-clr fs-14">
                                          CLEAR SEARCH
                                        </p>
                                      </div>
                                      <div className="col-auto mob-mar-btm">
                                        <button>
                                          <img
                                            className="position-relative csv-icon"
                                            src={csv}
                                            alt="csv-icon"
                                          />
                                          CSV
                                        </button>
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
                                          overlayId="logout-ovrly"
                                        >
                                          <div>
                                            <label>
                                              <b>Schedule date to</b>
                                            </label>
                                            <div>
                                              <select
                                                id="inputState"
                                                className="form-control dropdown-setting1 ScheduleDate-to"
                                              >
                                                <option>Team Member</option>
                                                <option>Team Member 1</option>
                                              </select>
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
                                              "111" ? (
                                                <div className="ScheduleDate-to">
                                                  <span>
                                                    <label className="every1">
                                                      Every
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="Every"
                                                      placeholder="1"
                                                    />
                                                    <label className="every1">
                                                      Day
                                                    </label>
                                                  </span>
                                                </div>
                                              ) : null}
                                              {this.state.selectScheduleDate ===
                                              "222" ? (
                                                <div className="ScheduleDate-to">
                                                  <span>
                                                    <label className="every1">
                                                      Every
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="Every"
                                                      placeholder="1"
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
                                                    <Checkbox>Mon</Checkbox>
                                                    <Checkbox>Tue</Checkbox>
                                                    <Checkbox>Wed</Checkbox>
                                                    <Checkbox>Thu</Checkbox>
                                                    <Checkbox>Fri</Checkbox>
                                                    <Checkbox>Sat</Checkbox>
                                                    <Checkbox>Sun</Checkbox>
                                                  </div>
                                                </div>
                                              ) : null}
                                              {this.state.selectScheduleDate ===
                                              "333" ? (
                                                <div className="ScheduleDate-to">
                                                  <span>
                                                    <label className="every1">
                                                      Day
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="Every"
                                                      placeholder="9"
                                                    />
                                                    <label className="every1">
                                                      of every
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="Every"
                                                      placeholder="1"
                                                    />
                                                    <label className="every1">
                                                      months
                                                    </label>
                                                  </span>
                                                </div>
                                              ) : null}
                                              {this.state.selectScheduleDate ===
                                              "444" ? (
                                                <div className="ScheduleDate-to">
                                                  <span>
                                                    <label className="every1">
                                                      Every
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="Every"
                                                      placeholder="1"
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
                                                      >
                                                        <option>Second</option>
                                                        <option>Four</option>
                                                      </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <select
                                                        id="inputState"
                                                        className="form-control dropdown-setting1"
                                                      >
                                                        <option>Sunday</option>
                                                        <option>Monday</option>
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null}
                                              {this.state.selectScheduleDate ===
                                              "555" ? (
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
                                                      <select
                                                        id="inputState"
                                                        className="form-control dropdown-setting1"
                                                      >
                                                        <option>
                                                          Septmber
                                                        </option>
                                                        <option>
                                                          Octomber
                                                        </option>
                                                      </select>
                                                    </div>
                                                    <input
                                                      type="text"
                                                      className="Every"
                                                      placeholder="1"
                                                    />
                                                  </div>
                                                </div>
                                              ) : null}
                                              {this.state.selectScheduleDate ===
                                              "666" ? (
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
                                                        >
                                                          <option>
                                                            Second
                                                          </option>
                                                          <option>Four</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </span>
                                                  <div className="row mt-3">
                                                    <div className="col-md-5">
                                                      <select
                                                        id="inputState"
                                                        className="form-control dropdown-setting1"
                                                        style={{
                                                          width: "100px"
                                                        }}
                                                      >
                                                        <option>Sunday</option>
                                                        <option>Monday</option>
                                                      </select>
                                                    </div>
                                                    <label
                                                      className="every1"
                                                      style={{
                                                        lineHeight: "40px",
                                                        marginLeft: "14px"
                                                      }}
                                                    >
                                                      to
                                                    </label>
                                                    <div className="col-md-5">
                                                      <select
                                                        id="inputState"
                                                        className="form-control dropdown-setting1"
                                                        style={{
                                                          width: "100px"
                                                        }}
                                                      >
                                                        <option>
                                                          Septmber
                                                        </option>
                                                        <option>
                                                          Octomber
                                                        </option>
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : null}
                                              <input
                                                type="text"
                                                className="txt-1 txt1Place txt1Time"
                                                placeholder="11AM"
                                              />
                                              <div>
                                                <button className="scheduleBtn">
                                                  <label className="addLable">
                                                    SCHEDULE
                                                  </label>
                                                </button>
                                              </div>
                                              <div>
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
                                            this.state.CheckBoxChecked
                                              ? "btn-inv"
                                              : "dis-btn"
                                          }
                                          onClick={
                                            this.state.CheckBoxChecked
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
                                                onChange={
                                                  this.setDesignationValue
                                                }
                                              >
                                                
                                                <option>Designation</option>
                                                {this.state.DesignationData !==
                                                  null &&
                                                  this.state.DesignationData.map(
                                                    (item, i) => (
                                                      <option
                                                        key={i}
                                                        value={
                                                          item.designationID
                                                        }
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
                                                  Header: (
                                                    <span>Designation</span>
                                                  ),
                                                  accessor: "designation"
                                                },
                                                {
                                                  Header: <span>Email</span>,
                                                  accessor: "email"
                                                }
                                              ]}
                                              
                                              defaultPageSize={5}
                                              showPagination={false}
                                            />
                                            <textarea
                                              className="assign-modal-textArea"
                                              placeholder="Add Remarks"
                                            ></textarea>
                                            <button
                                              className="assign-butn btn-assign-tikcet"
                                              type="button"
                                            >
                                              ASSIGN TICKETS
                                            </button>
                                          </div>
                                        </Modal>
                                      </div>
                                    </div>
                                   */}
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
                                    maxLength={10}
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <input
                                    type="text"
                                    className="no-bg"
                                    placeholder="Customer Email ID"
                                    name="EmailIdByCustType"
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
                                    value={this.state.TicketIdByCustType}
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6">
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
                                <div className="col-md-3 col-sm-6">
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
                                <div className="col-md-3 col-sm-6">
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
                                      getOptionLabel={option =>
                                        option.nameOfChannel
                                      }
                                      getOptionValue={option =>
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
                                      getOptionLabel={option =>
                                        option.ticketActionTypeName
                                      }
                                      getOptionValue={option =>
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
                                <div className="col-md-3 col-sm-6">
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
                                <div className="col-md-3 col-sm-6">
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
                                <div className="col-md-3 col-sm-6">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Claim ID"
                                    value={this.state.ClaimIdByAll}
                                    name="ClaimIdByAll"
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
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6 allspc">
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
                                <div className="col-md-3 col-sm-6">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Ticket Id/Title"
                                    value={this.state.TicketIdTitleByAll}
                                    name="TicketIdTitleByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Invoice Number/Sub Order No"
                                    value={this.state.InvoiceSubOrderByAll}
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
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6 allspc">
                                  <select
                                    value={this.state.selectedCategoryAll}
                                    onChange={this.setCategoryAllValue}
                                  >
                                    <option>Category</option>
                                    {this.state.CategoryData !== null &&
                                      this.state.CategoryData.map((item, i) => (
                                        <option key={i} value={item.categoryID}>
                                          {item.categoryName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3 col-sm-6">
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
                                <div className="col-md-3 col-sm-6">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Item ID"
                                    value={this.state.ItemIdByAll}
                                    name="ItemIdByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <select
                                    className="add-select-category"
                                    value={this.state.selectedAssignedTo}
                                    onChange={this.setAssignedToValue}
                                    onClick={this.handleAssignTo.bind(this)}
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
                                <div className="col-md-3 col-sm-6 allspc">
                                  {/* <select>
                                          <option>Sub Category</option>
                                        </select> */}
                                  <select
                                    value={this.state.selectedSubCategoryAll}
                                    onChange={this.setSubCategoryAllValue}
                                  >
                                    <option>Sub Category</option>
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
                                <div className="col-md-3 col-sm-6">
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
                                <div className="col-md-3 col-sm-6">
                                  <select
                                    value={this.state.selectedVisitStoreAll}
                                    onChange={this.handleVisitStoreAll}
                                  >
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
                                      this.handlePurchaseStoreCodeAddressAll
                                    }
                                  />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  {/* <select>
                                          <option>Issue Type</option>
                                        </select> */}
                                  <select
                                    value={this.state.selectedIssueTypeAll}
                                    onChange={this.setIssueTypeAllValue}
                                  >
                                    <option>Issue Type</option>
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
                                          <option key={i} value={item.SLAId}>
                                            {item.SLAResponseTime} /
                                            {item.SLARequestTime}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                  <select
                                    value={
                                      this.state.selectedWantToVisitStoreAll
                                    }
                                    onChange={this.handleWantToVisitStoreAll}
                                  >
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
                                              <option>Claim Category</option>
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
                                              <option>
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
                                              <option>Claim Issue Type</option>
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
                              <p
                                className="blue-clr fs-14"
                                onClick={this.clearSearch}
                              >
                                CLEAR SEARCH
                              </p>
                            </div>
                            <div className="col-auto mob-mar-btm">
                              <CSVLink
                                className="csv-button"
                                data={this.state.CSVDownload}
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
                                          option.department
                                        }
                                        getOptionValue={
                                          option => option.department //id
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
                                            marginTop: "10px"
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
                                                getOptionLabel={option =>
                                                  option.days
                                                }
                                                getOptionValue={
                                                  option => option.days //id
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
                                                <option value="4">Four</option>
                                              </select>
                                            </div>
                                          </div>
                                        </span>
                                        <div className="row mt-3">
                                          <div className="col-md-5">
                                            <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                              <Select
                                                getOptionLabel={option =>
                                                  option.days
                                                }
                                                getOptionValue={
                                                  option => option.days //id
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
                                            className="every1"
                                            style={{
                                              lineHeight: "40px",
                                              marginLeft: "14px"
                                            }}
                                          >
                                            to
                                          </label>
                                          <div className="col-md-5">
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
                                        Cell: row => {
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
                                        }
                                      },
                                      {
                                        Header: <span>Designation</span>,
                                        accessor: "designation"
                                      },
                                      {
                                        Header: <span>Email</span>,
                                        accessor: "email"
                                      }
                                    ]}
                                    // resizable={false}
                                    defaultPageSize={5}
                                    minRows={3}
                                    showPagination={true}
                                    getTrProps={this.handleTicketDetails}
                                    className="assign-ticket-table"
                                  />

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
                <div className="MyTicketListReact">
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
                                  name="MyTicketListcheckbox[]"
                                  // checked={this.state.CheckBoxChecked}
                                  onChange={this.checkAllCheckbox.bind(this)}
                                />
                                <label htmlFor="fil-aball" className="ticketid">
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
                                    id={"j" + row.original.ticketID}
                                    name="MyTicketListcheckbox[]"
                                    // checked={this.state.CheckBoxChecked}
                                    attrIds={row.original.ticketID}
                                    onChange={this.handelCheckBoxCheckedChange}
                                  />
                                  <label htmlFor={"j" + row.original.ticketID}>
                                    <img
                                      src={HeadPhone3}
                                      alt="HeadPhone"
                                      className="headPhone3"
                                    />
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
                            Status <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "ticketStatus",
                        Cell: row => {
                          return (
                            <span className="table-b table-blue-btn">
                              <label>{row.original.ticketStatus}</label>
                            </span>
                          );
                        }
                      },
                      {
                        Header: <span></span>,
                        accessor: "taskStatus",
                        width: 45,
                        Cell: row => {
                          if (
                            row.original.taskStatus === "0/0" &&
                            row.original.taskStatus === null
                          ) {
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
                              Lastest Message
                            </span>
                          </label>
                        ),
                        accessor: "message",
                        Cell: row => {
                          return <div>{row.original.message}</div>;
                        }
                      },
                      {
                        Header: (
                          <span className="ticketid">
                            Category <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "category",
                        Cell: row => (
                          <span>
                            <label>{row.original.category} </label>

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
                            Priority <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "priority"
                      },
                      {
                        Header: (
                          <span className="ticketid">
                            Assignee <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "assignee"
                      },
                      {
                        Header: (
                          <span className="ticketid">
                            Creation On <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdOn",
                        Cell: row => (
                          <span>
                            <label>{row.original.createdOn}</label>

                            <Popover
                              content={
                                <div className="insertpop1">
                                  <ul className="dash-creation-popup">
                                    <li className="title">Creation details</li>
                                    <li>
                                      <p>{row.original.createdBy} Created</p>
                                      <p>{row.original.createdago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        Assigned to {row.original.assignedTo}
                                      </p>
                                      <p>{row.original.assignedago}</p>
                                    </li>
                                    <li>
                                      <p>{row.original.updatedBy} updated</p>
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
              )}
              <div className="float-search" onClick={this.toggleSearch}>
                <small>{TitleChange}</small>
                {ImgChange}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Dashboard;
