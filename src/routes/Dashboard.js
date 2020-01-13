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
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
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
      selectedScheduleTime: 0,
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
      ticketIds: "1,3",
      selectedScheduleFor: "",
      dailyDay: 0,
      isByStatus: true,
      ticketStatusId: 100,
      advPageSize: 30,
      advPageNo: 1,
      CheckBoxChecked: false
    };
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
  }

  handelCheckBoxCheckedChange = () => {
    this.setState({
      CheckBoxChecked: !this.state.CheckBoxChecked
    });
  };
  handleTicketDetails = (rowInfo, column) => {
    return {
      onClick: e => {
        debugger;
        var agentId = column.original["user_ID"];
        this.setState({ agentId });
      }
    };
  };
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
  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate
    });
  }
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
      selectedScheduleTime: e.currentTarget.value
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
        allFlag: 0
      });
    } else if (currentActive === "By Customer Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 1,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 0
      });
    } else if (currentActive === "By Ticket Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 1,
        byCategoryFlag: 0,
        allFlag: 0
      });
    } else if (currentActive === "By Category") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 1,
        allFlag: 0
      });
    } else if (currentActive === "All") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 1
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
  setFunctionValue = e => {
    let functionValue = e.currentTarget.value;
    this.setState({ selectedFunction: functionValue });
  };
  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "post",
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

  checkAllCheckbox(event) {
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("dashboardcheckbox[]");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
    }
  }
  handleMouseHover() {
    this.setState({ TotalNoOfChatShow: !this.state.TotalNoOfChatShow });
  }
  handleScheduleDateChange = e => {
    let SelectData = e.currentTarget.value;
    this.setState({
      selectScheduleDate: SelectData
    });
  };

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
  setTeamMember = e => {
    this.setState({ selectedTeamMember: e });
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
        ScheduleFor: this.state.selectedTeamMember,
        ScheduleType: this.state.selectScheduleDate,
        NoOfDay: this.state.selectedNoOfDay,
        ScheduleTime: this.state.selectedScheduleTime,
        IsDaily: 1
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
  handleAssignTickets() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/AssignTickets",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticketIds,
        AgentID: this.state.agentId,
        Remark: this.state.agentRemark
      }
    }).then(function(res) {
      debugger;
      let messageData = res.data.message;
      if (messageData === "Success") {
        self.handleAssignModalClose();
        NotificationManager.success("Tickets assigned successfully.");
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
      this.state.byCategoryFlag === 1
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
      if (self.state.byCategoryFlag === 1) {
        var IssueTypeData = res.data.responseData;
        self.setState({
          IssueTypeData: IssueTypeData
        });
      } else if (self.state.allFlag === 1) {
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
      this.state.byCategoryFlag === 1
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
      if (self.state.byCategoryFlag === 1) {
        var SubCategoryData = res.data.responseData;
        self.setState({
          SubCategoryData: SubCategoryData
        });
      } else if (self.state.allFlag === 1) {
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
        selectedTicketStatusByDate: 0
      });
    } else if (this.state.byCustomerTypeFlag === 1) {
      this.setState({
        MobileNoByCustType: "",
        EmailIdByCustType: "",
        TicketIdByCustType: "",
        selectedTicketStatusByCustomer: 0
      });
    } else if (this.state.byTicketTypeFlag === 1) {
      this.setState({
        selectedPriority: 0,
        selectedTicketStatusByTicket: 0,
        selectedChannelOfPurchase: [],
        selectedTicketActionType: []
      });
    } else if (this.state.byCategoryFlag === 1) {
      this.setState({
        selectedCategory: 0,
        selectedSubCategory: 0,
        selectedIssueType: 0,
        selectedTicketStatusByCategory: 0
      });
    } else if (this.state.allFlag === 1) {
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
        selectedFunction: 0
      });
    }
  }
  ViewSearchData() {
    debugger;
    // let self = this;
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
      ticketStatus: this.state.selectedTicketStatusByCategory
      // byAll:this.state.allFlag,
    };
    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketSearchResult",
      headers: authHeader(),
      data: {
        searchparams: paramData
      }
    }).then(function(res) {
      debugger;
      // let Msg = res.data.message;
    });
  }
  SaveSearchData() {
    debugger;
    let self = this;
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
      }
    });
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
      if (Status === "Record Not Found") {
        self.setState({ SearchTicketData: [] });
      } else if (data !== null) {
        self.setState({ SearchTicketData: data });
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
  setClaimIssueTypeValue = e => {
    let claimIssueTypeValue = e.currentTarget.value;
    this.setState({ selectedClaimIssueType: claimIssueTypeValue });
  };
  setIssueTypeAllValue = e => {
    let issueTypeAllValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeAll: issueTypeAllValue });
  };

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

    const DefArti = (
      <div className="dash-creation-popup-cntr">
        <ul className="dash-category-popup dashnewpopup">
          <li>
            <p>Category</p>
            <p>Defective article</p>
          </li>
          <li>
            <p>Sub Category</p>
            <p>Customer wants refund</p>
          </li>
          <li>
            <p>Type</p>
            <p>Delivery</p>
          </li>
        </ul>
      </div>
    );

    const InsertPlaceholder = (
      <div className="insertpop1">
        <ul className="dash-creation-popup">
          <li className="title">Creation details</li>
          <li>
            <p>Naman Created</p>
            <p>2 Hrs ago</p>
          </li>
          <li>
            <p>Assigned to Vikas</p>
            <p>1.5 Hrs ago</p>
          </li>
          <li>
            <p>Vikas updated</p>
            <p>1 Hr ago</p>
          </li>
          <li>
            <p>Response time remaining by</p>
            <p>30 mins</p>
          </li>
          <li>
            <p>Response overdue by</p>
            <p>1 Hr</p>
          </li>
          <li>
            <p>Resolution overdue by</p>
            <p>2 Hrs</p>
          </li>
        </ul>
      </div>
    );
    const TaskBlue = (
      <div className="dash-task-popup-new">
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-b-0">
            TASK: <span className="green-clr">02</span>/
            <span className="task-red-clr">04</span>
          </p>
          <div className="d-flex align-items-center">
            2 NEW
            <div className="nw-chat">
              <img src={Chat} alt="chat" />
            </div>
          </div>
        </div>
        <ProgressBar className="task-progress" now={70} />
      </div>
    );
    const ClaimBlue = (
      <div className="dash-task-popup-new">
        <div className="d-flex justify-content-between align-items-center">
          <p>
            CLAIM: <span className="green-clr">02</span>/
            <span className="task-red-clr">01</span>
          </p>
        </div>
        <ProgressBar className="task-progress" now={70} />
      </div>
    );
    const TitleChange = this.state.collapseSearch
      ? "Close Search"
      : "Search Tickets";

    const ImgChange = this.state.collapseSearch ? (
      <img className="search-icon" src={CancalImg} alt="search-icon" />
    ) : (
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
    );

    const dataDash = [
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab7"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab7">
                  <img
                    src={HeadPhone3}  
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>2 Hour Ago</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab6"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab6">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab5"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab5">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-yellow-btn">
            <label>New</label>
          </span>
        ),
        Img: (
          <div>
            <Popover content={TaskBlue} placement="bottom">
              <img
                className="task-icon-1"
                src={TaskIconBlue}
                alt="task-icon-blue"
              />
            </Popover>
          </div>
        ),
        subjectDash: (
          <div>
            {/* <Popover content={TaskBlue} placement="bottom">
              <img
                className="task-icon-1 marginimg"
                src={TaskIconBlue}
                alt="task-icon-blue"
              />
            </Popover> */}
            {/* <img
              className="task-icon-1 marginimg"
              src={TaskIconBlue}
              alt="task-icon-blue"
            /> */}
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab4"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab4">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-yellow-btn">
            <label>New</label>
          </span>
        ),
        Img: (
          <img
            className="task-icon-1"
            src={TaskIconGray}
            alt="task-icon-gray"
          />
        ),
        subjectDash: (
          <div>
            {/* <img
              className="task-icon-1 marginimg"
              src={TaskIconGray}
              alt="task-icon-gray"
            /> */}
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab3"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab3">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        ),
        Img: (
          <div>
            <Popover content={ClaimBlue} placement="bottom">
              <img
                className="claim-icon marginimg"
                src={CliamIconBlue}
                alt="cliam-icon-blue"
              />
            </Popover>
            <span style={{ marginLeft: "20px" }}>
              <img
                className="task-icon-1 marginimg"
                src={TaskIconGray}
                alt="task-icon-gray"
              />
            </span>
          </div>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab2"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab2">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        idDash: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab1"
                  name="dashboardcheckbox[]"
                />
                <label htmlFor="fil-ab1">
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </label>
              </div>
            </div>
          </span>
        ),
        statusDash: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        ),
        subjectDash: (
          <div>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </div>
        ),
        creationNew: (
          <span>
            <label>12 March 2018</label>
            <Popover content={InsertPlaceholder} placement="left">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      }
    ];

    const columnsDash = [
      {
        Header: (
          <span>
            <div className="filter-type pink1">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab1"
                  name="dashboardcheckbox[]"
                  onChange={this.checkAllCheckbox.bind(this)}
                />
                <label htmlFor="fil-ab1">ID</label>
              </div>
            </div>
          </span>
        ),
        accessor: "idDash"
      },
      {
        Header: (
          <span onClick={this.StatusOpenModel}>
            Status <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "statusDash"
      },
      {
        Header: <span></span>,
        accessor: "Img",
        width: 45
      },
      {
        Header: (
          <label>
            <span style={{ fontWeight: "bold", fontSize: "13px !important" }}>
              Subject/
            </span>
            <span>Lastest Message</span>
          </label>
        ),
        accessor: "subjectDash"
      },
      {
        Header: (
          <span>
            Category <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "categoryDash",
        Cell: props => (
          <span>
            <label>Defective article </label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        )
      },
      {
        Header: (
          <span>
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "priorityDash",
        Cell: props => <span>High</span>
      },
      {
        Header: (
          <span>
            Assigne <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assigneeDash",
        Cell: props => <span>N Rampal</span>
      },
      {
        Header: (
          <span>
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew"
      }
    ];

    let value = `${this.state.start.format(
      "DD-MM-YYYY HH:mm"
    )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;
    let disabled = false;
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
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="EMFCText">All</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="one">
                        <input type="checkbox" id="one" className="ch1" />
                        <span className="ch1-text">Bata 1</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="two">
                        <input type="checkbox" id="two" className="ch1" />
                        <span className="ch1-text">Bata 2</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="three">
                        <input type="checkbox" id="three" className="ch1" />
                        <span className="ch1-text">Bata 3</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="four">
                        <input type="checkbox" id="four" className="ch1" />
                        <span className="ch1-text">Bata 4</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
            <div>
              <span>
                Agent :
                <div className="dropdown">
                  <button
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="EMFCText">All</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="one">
                        <input type="checkbox" id="one" className="ch1" />
                        <span className="ch1-text">Bata 1</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="two">
                        <input type="checkbox" id="two" className="ch1" />
                        <span className="ch1-text">Bata 2</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="three">
                        <input type="checkbox" id="three" className="ch1" />
                        <span className="ch1-text">Bata 3</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="four">
                        <input type="checkbox" id="four" className="ch1" />
                        <span className="ch1-text">Bata 4</span>
                      </label>
                    </li>
                  </ul>
                </div>
                {/* <div className="dropdown">
                  <button
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="EMFCText">All</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="filter-type pink1">
                        <div className="filter-checkbox pink2 pinkmargin">
                          <input type="checkbox" id="fil-ch4" />
                          <label htmlFor="fil-ch4"></label>
                          <span>abc</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="filter-type pink1">
                        <div className="filter-checkbox pink2 pinkmargin">
                          <input type="checkbox" id="fil-ch5" />
                          <label htmlFor="fil-ch5"></label>
                          <span>abc</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="filter-type pink1">
                        <div className="filter-checkbox pink2 pinkmargin">
                          <input type="checkbox" id="fil-ch6" />
                          <label htmlFor="fil-ch6"></label>
                          <span>abc</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div> */}
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
                <div className="container-fluid dash-tp-card btm-mar">
                  <div className="row justify-content-center">
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">All</p>
                        <span className="card-value">16</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Open</p>
                        <span className="card-value">06</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Due Today</p>
                        <span className="card-value">11</span>
                      </div>
                    </div>
                    <div className="col-md col-sm-4 col-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Over Due</p>
                        <span className="card-value red-clr">07</span>
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
                          <small className="blue-clr">View More Insights</small>
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
                          <OpenByPriorityPie />
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
                                  <li>
                                    Offline : <b>20/100</b>
                                  </li>
                                  <li>
                                    Web : <b>10/80</b>
                                  </li>
                                  <li>
                                    Mobile : <b>5/100</b>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-9 tic-bill-graph">
                                <TicketToBillBarGraph />
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
                                  <li>
                                    Offline : <b>20/100</b>
                                  </li>
                                  <li>
                                    Web : <b>10/80</b>
                                  </li>
                                  <li>
                                    Mobile : <b>5/100</b>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-9 ">
                                <TicketGenerationSourceBar />
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
                        <div className="resp-success">
                          <p className="card-head">Response Success</p>
                          <span className="card-value">
                            <big>60%</big>
                          </span>
                          <p className="card-head mt-lg-4 mt-2">
                            Resolution Success :
                            <span className="font-weight-bold">57.23%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Task</p>
                        <div className="aside-cont">
                          <div>
                            <span className="card-value">16</span>
                            <small>Open</small>
                          </div>
                          <div>
                            <span className="card-value">06</span>
                            <small>Pending</small>
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
                            <MultiBarChart />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="claim-tab"
                            role="tabpanel"
                            aria-labelledby="claim-tab"
                          >
                            <TicketToClaimMultiBar />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="dash-top-cards">
                        <p className="card-head">Claim</p>
                        <div className="aside-cont">
                          <div>
                            <span className="card-value">16</span>
                            <small>Open</small>
                          </div>
                          <div>
                            <span className="card-value">06</span>
                            <small>Pending</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                                  <li>
                                    <label key={i} value={item.searchParamID}>
                                      {item.searchName}
                                    </label>
                                    <div>
                                      <a href={Demo.BLANK_LINK}>APPLY</a>
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
                                    <option>SLA Due</option>
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
                                        <button>
                                          <img
                                            className="sch-icon"
                                            src={Schedule}
                                            alt="schedule-icon"
                                          />
                                          Schedule
                                        </button>
                                        <button className="btn-inv btn-dis">
                                          <img
                                            src={Assign}
                                            className="assign-icon"
                                            alt="assign-icon"
                                          />
                                          Assign
                                        </button>
                                      </div>
                                    </div>
                                   */}
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
                                    <option>Priority</option>
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
                                  {/* <select
                                          value={
                                            this.state.selectedChannelOfPurchase
                                          }
                                          onChange={
                                            this.setChannelOfPurchaseValue
                                          }
                                        >
                                          <option>Channel Of Purchase</option>
                                          {this.state.ChannelOfPurchaseData !==
                                            null &&
                                            this.state.ChannelOfPurchaseData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={
                                                    item.channelOfPurchaseID
                                                  }
                                                >
                                                  {item.nameOfChannel}
                                                </option>
                                              )
                                            )}
                                        </select> */}
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
                                        <button>
                                          <img
                                            className="sch-icon"
                                            src={Schedule}
                                            alt="schedule-icon"
                                          />
                                          Schedule
                                        </button>
                                        <button className="btn-inv btn-dis">
                                          <img
                                            src={Assign}
                                            className="assign-icon"
                                            alt="assign-icon"
                                          />
                                          Assign
                                        </button>
                                      </div>
                                    </div>
                                   */}
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
                                    value={this.state.selectedSubCategory}
                                    onChange={this.setSubCategoryValue}
                                  >
                                    <option>Sub Category</option>
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
                                    <option>Issue Type</option>
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
                                        <button>
                                          <img
                                            className="sch-icon"
                                            src={Schedule}
                                            alt="schedule-icon"
                                          />
                                          Schedule
                                        </button>
                                        <button className="btn-inv btn-dis">
                                          <img
                                            src={Assign}
                                            className="assign-icon"
                                            alt="assign-icon"
                                          />
                                          Assign
                                        </button>
                                      </div>
                                    </div>
                                   */}
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
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Assigned To"
                                    value={this.state.selectedAssignedToAll}
                                    onChange={this.handleAssignedToAll}
                                  />
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

                                    {/* {this.state.selectedWithClaimAll ===
                                          "yes" ? (
                                            <React.Fragment> */}
                                    {/* <div className="col-sm-6 m-b-25">
                                                <select
                                                  value={
                                                    this.state
                                                      .selectedClaimStatus
                                                  }
                                                  onChange={
                                                    this.handleClaimStatus
                                                  }
                                                >
                                                  <option>Claim Status</option>
                                                  {this.state
                                                    .ClaimStatusData !== null &&
                                                    this.state.ClaimStatusData.map(
                                                      (item, i) => (
                                                        <option
                                                          key={i}
                                                          value={
                                                            item.claimStatusID
                                                          }
                                                        >
                                                          {item.claimStatusName}
                                                        </option>
                                                      )
                                                    )}
                                                </select>
                                              </div> */}
                                    {/* <div className="col-sm-6">
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
                                                  {this.state.TaskStatusData !==
                                                    null &&
                                                    this.state.TaskStatusData.map(
                                                      (item, i) => (
                                                        <option
                                                          key={i}
                                                          value={
                                                            item.taskStatusID
                                                          }
                                                        >
                                                          {item.taskStatusName}
                                                        </option>
                                                      )
                                                    )}
                                                </select>
                                              </div> */}
                                    {/* <div className="col-sm-6 m-b-25">
                                                <select
                                                  value={
                                                    this.state
                                                      .selectedClaimCategory
                                                  }
                                                  onChange={
                                                    this.setClaimCategoryValue
                                                  }
                                                >
                                                  <option>
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
                                              </div> */}
                                    {/* <div className="col-sm-6">
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
                                                  {this.state.DepartmentData !==
                                                    null &&
                                                    this.state.DepartmentData.map(
                                                      (item, i) => (
                                                        <option
                                                          key={i}
                                                          value={
                                                            item.departmentID
                                                          }
                                                        >
                                                          {item.departmentName}
                                                        </option>
                                                      )
                                                    )}
                                                </select>
                                              </div> */}
                                    {/* <div className="col-sm-6 m-b-25">
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
                                                          value={
                                                            item.subCategoryID
                                                          }
                                                        >
                                                          {item.subCategoryName}
                                                        </option>
                                                      )
                                                    )}
                                                </select>
                                              </div> */}
                                    {/* <div className="col-sm-6">
                                                <select
                                                  value={
                                                    this.state.selectedFunction
                                                  }
                                                  onChange={
                                                    this.setFunctionValue
                                                  }
                                                >
                                                  <option>Task Function</option>
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
                                              </div> */}
                                    {/* <div className="col-sm-6">
                                                <select
                                                  value={
                                                    this.state
                                                      .selectedClaimIssueType
                                                  }
                                                  onChange={
                                                    this.setClaimIssueTypeValue
                                                  }
                                                >
                                                  <option>
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
                                              </div> */}
                                    {/* </React.Fragment>
                                          ) : null} */}
                                  </div>
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
                                        <button>
                                          <img
                                            className="sch-icon"
                                            src={Schedule}
                                            alt="schedule-icon"
                                          />
                                          Schedule
                                        </button>
                                        <button className="btn-inv btn-dis">
                                          <img
                                            src={Assign}
                                            className="assign-icon"
                                            alt="assign-icon"
                                          />
                                          Assign
                                        </button>
                                      </div>
                                    </div>
                                   */}
                            </div>
                          </div>
                        </div>
                        <div className="container-fluid myticlist-expand-sect">
                          <div className="row common-adv-padd justify-content-between">
                            <div className="col-auto d-flex align-items-center">
                              <p className="font-weight-bold mr-3">
                                <span className="blue-clr">04</span> Results
                              </p>
                              <p
                                className="blue-clr fs-14"
                                onClick={this.clearSearch}
                              >
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
                                    {/* <select
                                            id="inputState"
                                            className="form-control dropdown-setting1 ScheduleDate-to"
                                            value={
                                              this.state.selectedScheduleFor
                                            }
                                            onChange={this.setScheduleFor}
                                          >
                                            <option value="team-member">
                                              Team Member
                                            </option>
                                            <option value="team-member-1">
                                              Team Member 1
                                            </option>
                                          </select> */}
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
                                    {this.state.selectScheduleDate === "232" ? (
                                      <div className="ScheduleDate-to">
                                        <span>
                                          <label className="every1">Day</label>
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
                                            <select
                                              id="inputState"
                                              className="form-control dropdown-setting1"
                                            >
                                              <option>Septmber</option>
                                              <option>Octomber</option>
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
                                              >
                                                <option>Second</option>
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
                                              <option>Septmber</option>
                                              <option>Octomber</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}

                                    <input
                                      type="text"
                                      className="txt-1 txt1Place txt1Time"
                                      placeholder="11AM"
                                      onChange={this.handleScheduleTime}
                                    />
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
                                  <a href="#!" className="anchorTag-clear">
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
                                    showPagination={true}
                                    getTrProps={this.handleTicketDetails}
                                  />

                                  <textarea
                                    className="assign-modal-textArea"
                                    placeholder="Add Remarks"
                                    onChange={this.handleAssignRemark}
                                  ></textarea>
                                  <button
                                    className="assign-butn btn-assign-tikcet"
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
                                  id={row.original.ticketID}
                                  name="MyTicketListcheckbox[]"
                                  checked={this.state.CheckBoxChecked}
                                  onChange={this.handelCheckBoxCheckedChange}
                                />
                                <label htmlFor={row.original.ticketID}>
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
                      // Cell: props => <span>High</span>
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
                                    <p>Assigned to {row.original.assignedTo}</p>
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
              <div className="float-search" onClick={this.toggleSearch}>
                <small>{TitleChange}</small>
                {ImgChange}
              </div>
            </div>
          </div>
        </section>
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
            <input type="search" placeholder="Give name to your search" />
            <button className="butn">Save</button>
          </div>
          <div className="search-names">
            <div className="names-title">
              <p>Search Name</p>
              <p className="mar-comp">Action</p>
            </div>
            <ul>
              <li>
                <p>Open tickets with high priority</p>
                <div>
                  <a href={Demo.BLANK_LINK}>APPLY</a>
                  <a href={Demo.BLANK_LINK} className="m-0">
                    <img src={DelSearch} alt="del-search" />
                  </a>
                </div>
              </li>
              <li>
                <p>Open tickets with high priority</p>
                <div>
                  <a href={Demo.BLANK_LINK}>APPLY</a>
                  <a href={Demo.BLANK_LINK} className="m-0">
                    <img src={DelSearch} alt="del-search" />
                  </a>
                </div>
              </li>
              <li>
                <p>Open tickets with high priority</p>
                <div>
                  <a href={Demo.BLANK_LINK}>APPLY</a>
                  <a href={Demo.BLANK_LINK} className="m-0">
                    <img src={DelSearch} alt="del-search" />
                  </a>
                </div>
              </li>
              <li>
                <p>Open tickets with high priority</p>
                <div>
                  <a href={Demo.BLANK_LINK}>APPLY</a>
                  <a href={Demo.BLANK_LINK} className="m-0">
                    <img src={DelSearch} alt="del-search" />
                  </a>
                </div>
              </li>
              <li>
                <p>Open tickets with high priority</p>
                <div>
                  <a href={Demo.BLANK_LINK}>APPLY</a>
                  <a href={Demo.BLANK_LINK} className="m-0">
                    <img src={DelSearch} alt="del-search" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default Dashboard;
