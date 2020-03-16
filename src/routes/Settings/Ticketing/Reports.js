import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DownExcel from "./../../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";
import { Popover } from "antd";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import SlaDue from "./../../SlaDue";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ClaimStatus from "./../../ClaimStatus";
import TaskStatus from "./../../TaskStatus";
import TicketStatus from "./../../TicketStatus";
import moment from "moment";
import Select from "react-select";
import { Checkbox } from "antd";
import ScheduleDateDropDown from "./../../ScheduleDateDropDown";
import SimpleReactValidator from "simple-react-validator";

// const clshide= {
//  display:"hide"
// };

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      ChatDate: "",
      DefaultPopupName: "",
      tabIndex: 0,
      ReportData: [],
      ReportParams: "",
      brandData: [],
      Schedule_ID: 0,
      TicketCreatedFromDate: "",
      SelectedTicketMultiStatus: "",
      TicketClosedFrom: "",
      TicketClosedTo: "",
      DefaultEmailID:"",
      TicketCreatedEndDate: "",
      TicketCreatedSource: "",
      SelectedSourceIds: "",
      SelectedDefaultTeamMember: "",
      OpenDefaultModal: false,
      OpenDefaultMailModal: false,
      FileURL:"",
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      TicketSourceData: [],
      TicketPriorityData: [],
      AssignToData: [],
      DepartmentData: [],
      totalResultCount: 0,
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      TicketStatusData: TicketStatus(),
      ReportCreateDate: "",
      ReportLastDate: "",
      selectBrand: 0,
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedClaimID: "0",
      selectedTicketSource: 0,
      SlaDueData: SlaDue(),
      selectedInvoiceNo: "",
      selectedEmailID: "",
      selectedTicketID: "",
      selectedMobileNo: "",
      selectedItemID: "",
      selectedPriority: 0,
      selectedVisitStore: "all",
      selectedAssignedTo: 0,
      selectedWantVisitStore: "all",
      selectedDefaultTicketStatus: 0,
      selectedTicketStatus: 0,
      selectedVisitStoreAddress: "",
      selectedPurchaseStore: "",
      selectedTeamMember: [],
      selectedReportName: "",
      selectedSLAStatus: "0",
      selectedWithClaim: "no",
      selectedWithTaskAll: "no",
      selectedClaimStatus: 0,
      selectedClaimCategory: 0,
      selectedClaimSubCategory: 0,
      selectedClaimIssueType: 0,
      selectedTaskStatus: 0,
      selectedTaskPriority: 0,
      selectedDepartment: 0,
      selectedFunction: 0,
      dayIdsArray: [],
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
      selectedNameOfDayForWeekCommaSeperated: "",
      selectedNameOfMonthForYearCommaSeperated: "",
      selectedNameOfMonthForDailyYearCommaSeperated: "",
      selectedNameOfDayForYearCommaSeperated: "",
      ticketDetailID: 0,
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
      selectedNoOfDay: 0,
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
      ScheduleOption: ScheduleDateDropDown(),
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
      loadingAbove: true,
      CreateDateCompulsion: "",
      LastDateCompulsion: "",
      BrandCompulsion: "",
      CategoryCompulsion: "",
      SubCategoryCompulsion: "",
      IssueTypeCompulsion: "",
      ClaimIDCompulsion: "",
      TicketSourceCompulsion: "",
      InvoiceNoCompulsion: "",
      EmailIDCompulsion: "",
      TicketIDCompulsion: "",
      MobileNoCompulsion: "",
      ItemIDCompulsion: "",
      PriorityCompulsion: "",
      VisitStoreCompulsion: "",
      AssignedToCompulsion: "",
      WantVisitStoreCompulsion: "",
      TicketStatusCompulsion: "",
      VisitStoreAddressCompulsion: "",
      PurchaseStoreCompulsion: "",
      ClaimStatusCompulsion: "",
      ClaimCategoryCompulsion: "",
      ClaimSubCategoryCompulsion: "",
      ClaimIssueTypeCompulsion: "",
      TaskStatusCompulsion: "",
      TaskPriorityCompulsion: "",
      DepartmentCompulsion: "",
      FunctionCompulsion: "",
      FunctionData: [],
      loadingDownload: false
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
    this.handleReportList = this.handleReportList.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );

    this.handleAssignTo = this.handleAssignTo.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleInsertReport = this.handleInsertReport.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    debugger;
    this.handleReportList();
    this.handleGetBrandList();
    this.handleGetCategoryList();
    this.handleGetTicketSourceList();
    this.handleGetTicketPriorityList();
    this.handleAssignTo();
    this.handleGetDepartmentList();
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
  ScheduleOpenModel = () => {
    debugger;
    if (this.state.selectedReportName == "") {
      NotificationManager.error("Please enter report name", '', 1000);
    } else {
      if (this.state.selectedTeamMemberCommaSeperated) {
        var tData = this.state.selectedTeamMemberCommaSeperated.split(",");
        var selectedTeamMember = this.state.selectedTeamMember;
        for (let j = 0; j < tData.length; j++) {
          var data = this.state.AssignToData.filter(x => x.userID == tData[j]);
          selectedTeamMember.push(data[0]);
        }
        this.setState({ Schedule: true, selectedTeamMember });
        setTimeout(() => {
          for (let j = 0; j < this.state.dayIdsArray.length - 1; j++) {
            document.getElementById(this.state.dayIdsArray[j]).click();
          }
        }, 100);
      } else {
        this.setState({ Schedule: true, selectedTeamMember: [] });
      }
    }
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false, selectedTeamMember: [] });
  };

  handleAddReportOpen() {
    this.setState({ AddReportPopup: true, tabIndex: 0 });
  }
  AddScheduler = () => {
    debugger;
    this.ClearParams();
    this.setState({ AddReportPopup: true, tabIndex: 0 });
  };
  handleEditReport = rowData => {
    debugger;
    let allTab = JSON.parse(rowData.reportSearchParams);
    this.setState({ Schedule_ID: rowData.scheduleID });
    let withClaim = 0;
    let withTask = 0;
    // allTab=objEdit;
    withClaim = allTab["HaveClaim"];
    withTask = allTab["HaveTask"];
    this.state.selectBrand = allTab["BrandID"];
    this.state.selectedIssueType = allTab["IssueType"];
    this.state.selectedTaskPriority = allTab["TaskPriority"];
    this.state.selectedWithClaim = allTab["HaveClaim"] === 0 ? "no" : "yes";
    this.state.selectedWithTaskAll = allTab["HaveTask"] === 0 ? "no" : "yes";
    if (this.state.selectedWithClaim === "yes") {
      withClaim = 1;
    }
    if (this.state.selectedWithTaskAll === "yes") {
      withTask = 1;
    }
    // this.state.ReportCreateDate="04/02/2020";
    //this.state.ReportCreateDate=moment(allTab["CreatedDate"]).format("DD/MM/YYYY");

    // this.state.ReportLastDate=allTab["ModifiedDate"];
    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportCreateDate === null ||
    //   this.state.ReportCreateDate === undefined ||
    //   this.state.ReportCreateDate === ""
    // ) {
    //   allTab["CreatedDate"] = "";
    // } else {
    //   allTab["CreatedDate"] = moment(this.state.ReportCreateDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportLastDate === null ||
    //   this.state.ReportLastDate === undefined ||
    //   this.state.ReportLastDate === ""
    // ) {
    //   allTab["ModifiedDate"] = "";
    // } else {
    //   allTab["ModifiedDate"] = moment(this.state.ReportLastDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
    this.state.selectedReportName = rowData.reportName;
    var scheduledIds = rowData.scheduleFor;
    var scheduledIdsArray = scheduledIds.split(",");
    // this.state.AssignToData.filter(x => x.userID == )

    // this.state.selectedTeamMemberCommaSeperated=rowData.scheduleFor;
    this.state.selectBrand = allTab["BrandID"];
    this.state.selectedIssueType = allTab["IssueType"];
    this.state.selectedTaskPriority = allTab["TaskPriority"];
    // this.state.selectedCategory=allTab["CategoryId"];
    this.setState(
      {
        selectedCategory: allTab["CategoryId"]
      },
      () => {
        this.handleGetSubCategoryList();
      }
    );
    //this.handleGetSubCategoryList();
    // this.state.selectedSubCategory=allTab["SubCategoryId"];
    this.setState(
      {
        selectedSubCategory: allTab["SubCategoryId"]
      },
      () => {
        this.handleGetIssueTypeList();
      }
    );
    this.state.selectedIssueType = allTab["IssueTypeId"];
    this.state.selectedTicketSource = allTab["TicketSourceTypeID"];
    this.state.selectedTicketID = allTab["TicketIdORTitle"];
    this.state.selectedPriority = allTab["PriorityId"];
    this.state.selectedTicketStatus = allTab["TicketSatutsID"];
    this.state.selectedSLAStatus = allTab["SLAStatus"];
    this.state.selectedClaimID = allTab["ClaimId"];
    this.state.selectedInvoiceNo = allTab["InvoiceNumberORSubOrderNo"];
    this.state.selectedItemID = allTab["OrderItemId"];
    this.state.selectedVisitStore = allTab["IsVisitStore"];
    this.state.selectedWantVisitStore = allTab["IsWantVistingStore"];
    this.state.selectedEmailID = allTab["CustomerEmailID"];
    this.state.selectedMobileNo = allTab["CustomerMobileNo"];
    this.state.selectedAssignedTo = allTab["AssignTo"];
    this.state.selectedWantVisitStore = allTab["StoreCodeORAddress"];
    this.state.selectedVisitStoreAddress = allTab["WantToStoreCodeORAddress"];

    this.state.selectedClaimStatus = allTab["ClaimStatusId"];
    // this.state.selectedClaimCategory=allTab["ClaimCategoryId"];
    this.setState(
      {
        selectedClaimCategory: allTab["ClaimCategoryId"]
      },
      () => {
        this.handleGetSubCategoryList();
      }
    );
    // this.state.selectedClaimSubCategory=allTab["ClaimSubCategoryId"];
    this.setState(
      {
        selectedClaimSubCategory: allTab["ClaimSubCategoryId"]
      },
      () => {
        this.handleGetIssueTypeList();
      }
    );
    this.state.selectedClaimIssueType = allTab["ClaimIssueTypeId"];

    this.state.selectedTaskStatus = allTab["TaskStatusId"];
    // this.state.selectedDepartment=allTab["TaskDepartment_Id"];
    this.setState(
      {
        selectedDepartment: allTab["TaskDepartment_Id"]
      },
      () => {
        this.handleGetFunctionList();
      }
    );
    this.state.selectedFunction = allTab["TaskFunction_Id"];

    //////////////////Scheduler/////////////////////////
    this.state.IsDaily = rowData.isDaily;
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
      dayIdsArray: splittedDayIds
    });
    for (let i = 0; i < splittedDayIds.length; i++) {
      var ele = splittedDayIds[i];
      if (ele === "Mon") {
        this.setState({
          Mon: ele
        });
      } else if (ele === "Tue") {
        this.setState({
          Tue: ele
        });
      } else if (ele === "Wed") {
        this.setState({
          Wed: ele
        });
      } else if (ele === "Thu") {
        this.setState({
          Thu: ele
        });
      } else if (ele === "Fri") {
        this.setState({
          Fri: ele
        });
      } else if (ele === "Sat") {
        this.setState({
          Sat: ele
        });
      } else if (ele === "Sun") {
        this.setState({
          Sun: ele
        });
      }
    }
    this.setState({
      selectedNoOfDaysForMonth: rowData.noOfDaysForMonth,
      selectedNoOfMonthForMonth: rowData.noOfMonthForMonth,
      selectedNoOfMonthForWeek: rowData.noOfMonthForWeek,
      selectedNoOfWeekForWeek: rowData.noOfWeekForWeek
    });
    var dayForWeek = rowData.nameOfDayForWeek.split(",");
    var selectedNameOfDayForWeek = [];
    for (let j = 0; j < dayForWeek.length; j++) {
      var data = this.state.NameOfDayForWeek.filter(
        x => x.days == dayForWeek[j]
      );
      selectedNameOfDayForWeek.push(data[0]);
    }
    this.setState({
      selectedNameOfDayForWeek: selectedNameOfDayForWeek
    });
    var dayForYear = rowData.nameOfMonthForDailyYear.split(",");
    var selectedNameOfMonthForYear = [];
    for (let j = 0; j < dayForYear.length; j++) {
      var data = this.state.NameOfMonthForYear.filter(
        x => x.month == dayForYear[j]
      );
      selectedNameOfMonthForYear.push(data[0]);
    }
    this.setState({
      selectedNameOfMonthForYear: selectedNameOfMonthForYear,
      selectedNoOfDayForDailyYear: rowData.noOfDayForDailyYear
    });
    var dayForYear = rowData.nameOfDayForYear.split(",");
    var selectedNameOfDayForYear = [];
    for (let j = 0; j < dayForYear.length; j++) {
      var data = this.state.NameOfDayForYear.filter(
        x => x.days == dayForYear[j]
      );
      selectedNameOfDayForYear.push(data[0]);
    }
    var monthForDailyYear = rowData.nameOfMonthForYear.split(",");
    var selectedNameOfMonthForDailyYear = [];
    for (let j = 0; j < monthForDailyYear.length; j++) {
      var data = this.state.NameOfMonthForDailyYear.filter(
        x => x.month == monthForDailyYear[j]
      );
      selectedNameOfMonthForDailyYear.push(data[0]);
    }
    this.setState({
      selectedNameOfDayForYear: selectedNameOfDayForYear,
      selectedNameOfMonthForDailyYear: selectedNameOfMonthForDailyYear,
      selectedNoOfWeekForYear: rowData.noOfWeekForYear
    });

    ///////////////////////////////////////////////////
    this.handleAddReportOpen();
  };
  handleAddReportClose() {
    this.setState({ AddReportPopup: false });
  }

  ClearParams() {
    this.state.selectedReportName = "";
    this.state.Schedule_ID = 0;
    this.state.selectBrand = 0;
    this.state.selectedIssueType = 0;
    this.state.selectedTaskPriority = 0;
    this.state.selectedCategory = 0;
    this.state.selectedSubCategory = 0;
    this.state.selectedIssueType = 0;
    this.state.selectedTicketSource = 0;
    this.state.selectedTicketID = "";
    this.state.selectedPriority = 0;
    this.state.selectedTicketStatus = 0;
    this.state.selectedSLAStatus = 0;
    this.state.selectedClaimID = "";
    this.state.selectedInvoiceNo = "";
    this.state.selectedItemID = "";
    this.state.selectedVisitStore = "";
    this.state.selectedWantVisitStore = 0;
    this.state.selectedEmailID = "";
    this.state.selectedMobileNo = "";
    this.state.selectedAssignedTo = 0;
    this.state.selectedWantVisitStore = "";
    this.state.selectedVisitStoreAddress = "";

    this.state.selectedClaimStatus = 0;
    this.state.selectedClaimCategory = 0;
    this.state.selectedClaimSubCategory = 0;
    this.state.selectedClaimIssueType = 0;

    this.state.selectedTaskStatus = 0;
    this.state.selectedDepartment = 0;
    this.state.selectedFunction = 0;
    this.setState({
      ReportCreateDate: "",
      ReportLastDate: "",
      selectedPurchaseStore: "",
      selectedWithClaim: "no",
      selectedWithTaskAll: "no",
      SubCategoryData: [],
      IssueTypeData: [],
      FunctionData: []
    });
  }
  handleGetFunctionList() {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment
      }
    })
      .then(function(res) {
        debugger;
        let FunctionData = res.data.responseData;
        self.setState({ FunctionData: FunctionData });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleNextPopupOpen() {
    this.handleAddReportClose();
    this.setState({ NextPopup: true });
  }
  handleNextPopupClose() {
    this.setState({ NextPopup: false });
    this.handleReportList();
  }
  handleDefaultPopupClose = () => {
    this.setState({
      OpenDefaultModal: false,
      TicketCreatedFromDate: "",
      TicketCreatedEndDate: "",
      SelectedSourceIds: "",
      selectedDefaultTicketStatus: 0,
      TicketClosedFrom: "",
      TicketClosedTo: "",
      SelectedDefaultTeamMember: "",
      SelectedTicketMultiStatus: ""
    });
  };
  handleDefaultMailPopupClose = () => {
    this.setState({
      OpenDefaultMailModal: false,
      TicketCreatedFromDate: "",
      TicketCreatedEndDate: "",
      SelectedSourceIds: "",
      selectedDefaultTicketStatus: 0,
      TicketClosedFrom: "",
      TicketClosedTo: "",
      SelectedDefaultTeamMember: "",
      SelectedTicketMultiStatus: ""
    });
  };
  handleReportCreateDate(date) {
    this.setState({ ReportCreateDate: date });
  }
  handleTicketCreateDate(date) {
    debugger;
    this.setState({ TicketCreatedFromDate: date });
  }
  handleTicketClosedFrom(date) {
    debugger;
    this.setState({ TicketClosedFrom: date });
  }
  handleTicketClosedTo(date) {
    debugger;
    this.setState({ TicketClosedTo: date });
  }
  handleTicketCreateToDate(date) {
    debugger;
    this.setState({ TicketCreatedEndDate: date });
  }
  handleReportLastDate(date) {
    this.setState({ ReportLastDate: date });
  }
  handleChatDate(date) {
    this.setState({ ChatDate: date });
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
  handleWeekForYear = e => {
    debugger;
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value
    });
  };
  handleDayForYear = e => {
    debugger;
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value
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
  handleWeekForWeek = e => {
    debugger;
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value
    });
  };
  handleMonthForWeek = e => {
    debugger;
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value
    });
  };
  handleMonthForMonth = e => {
    debugger;
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value
    });
  };
  handleDaysForMonth = e => {
    debugger;
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value
    });
  };
  handleWeekly = e => {
    debugger;
    this.setState({
      selectedNoOfWeek: e.target.value
    });
    // this.setState({
    //   selectedNoOfWeek: e.currentTarget.value
    // });
  };
  handleDailyDay = e => {
    debugger;
    this.setState({
      selectedNoOfDay: e.currentTarget.value
    });
  };
  handleScheduleTime = e => {
    debugger;
    this.setState({
      selectedScheduleTime: e
    });
  };
  handleChangeTab(index) {
    debugger;
    // this.setState({ NextPopup: true });
    //   this.setState({
    //     tabIndex: index
    //   });

    var allTab = {};
    allTab = this.SetSearchParametr();
    this.setState({ ReportParams: allTab });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Report/ReportSearch",
      headers: authHeader(),
      data: {
        AssigntoId: this.state.AgentIds,
        BrandId: this.state.BrandIds,
        reportSearch: allTab
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        self.setState({ totalResultCount: data });
        self.handleNextPopupOpen();
        //self.handleAddReportClose();
      })
      .catch(data => {
        console.log(data);
      });
  }
  EditSearchParameter(objEdit) {
    var allTab = {};
    let withClaim = 0;
    let withTask = 0;
    allTab = objEdit;
    this.state.selectBrand = allTab["BrandID"];
    this.state.selectedIssueType = allTab["IssueType"];
    this.state.selectedTaskPriority = allTab["TaskPriority"];
    // if (this.state.selectedWithClaim === "yes") {
    //   withClaim = 1;
    // }
    // if (this.state.selectedWithTaskAll === "yes") {
    //   withTask = 1;
    // }

    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportCreateDate === null ||
    //   this.state.ReportCreateDate === undefined ||
    //   this.state.ReportCreateDate === ""
    // ) {
    //   allTab["CreatedDate"] = "";
    // } else {
    //   allTab["CreatedDate"] = moment(this.state.ReportCreateDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportLastDate === null ||
    //   this.state.ReportLastDate === undefined ||
    //   this.state.ReportLastDate === ""
    // ) {
    //   allTab["ModifiedDate"] = "";
    // } else {
    //   allTab["ModifiedDate"] = moment(this.state.ReportLastDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }

    allTab["BrandID"] = this.state.selectBrand;
    allTab["IssueType"] = this.state.selectedIssueType;
    allTab["TaskPriority"] = this.state.selectedTaskPriority;
    allTab["CategoryId"] = this.state.selectedCategory;
    allTab["SubCategoryId"] = this.state.selectedSubCategory;
    allTab["IssueTypeId"] = this.state.selectedIssueType;
    allTab["TicketSourceTypeID"] = this.state.selectedTicketSource;
    allTab["TicketIdORTitle"] = this.state.selectedTicketID.trim();
    allTab["PriorityId"] = this.state.selectedPriority;
    allTab["TicketSatutsID"] = this.state.selectedTicketStatus;
    allTab["SLAStatus"] = this.state.selectedSLAStatus;
    allTab["ClaimId"] = this.state.selectedClaimID;
    allTab["InvoiceNumberORSubOrderNo"] = this.state.selectedInvoiceNo.trim();
    allTab["OrderItemId"] = this.state.selectedItemID.trim();
    allTab["IsVisitStore"] = this.state.selectedVisitStore;
    allTab["IsWantVistingStore"] = this.state.selectedWantVisitStore;
    allTab["CustomerEmailID"] = this.state.selectedEmailID.trim();
    allTab["CustomerMobileNo"] = this.state.selectedMobileNo.trim();
    allTab["AssignTo"] = this.state.selectedAssignedTo;
    allTab["StoreCodeORAddress"] = this.state.selectedWantVisitStore.trim();
    allTab[
      "WantToStoreCodeORAddress"
    ] = this.state.selectedVisitStoreAddress.trim();
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
  SetSearchParametr() {
    var allTab = {};
    let withClaim = 0;
    let withTask = 0;
    if (this.state.selectedWithClaim === "yes") {
      withClaim = 1;
    }
    if (this.state.selectedWithTaskAll === "yes") {
      withTask = 1;
    }

    // --------------------Check null date----------------------------------
    if (
      this.state.ReportCreateDate === null ||
      this.state.ReportCreateDate === undefined ||
      this.state.ReportCreateDate === ""
    ) {
      allTab["CreatedDate"] = "";
    } else {
      allTab["CreatedDate"] = moment(this.state.ReportCreateDate).format(
        "YYYY-MM-DD"
      );
    }
    // --------------------Check null date----------------------------------
    if (
      this.state.ReportLastDate === null ||
      this.state.ReportLastDate === undefined ||
      this.state.ReportLastDate === ""
    ) {
      allTab["ModifiedDate"] = "";
    } else {
      allTab["ModifiedDate"] = moment(this.state.ReportLastDate).format(
        "YYYY-MM-DD"
      );
    }

    allTab["BrandID"] = this.state.selectBrand;
    allTab["IssueType"] = this.state.selectedIssueType;
    allTab["TaskPriority"] = this.state.selectedTaskPriority;
    allTab["CategoryId"] = this.state.selectedCategory;
    allTab["SubCategoryId"] = this.state.selectedSubCategory;
    allTab["IssueTypeId"] = this.state.selectedIssueType;
    allTab["TicketSourceTypeID"] = this.state.selectedTicketSource;
    allTab["TicketIdORTitle"] = this.state.selectedTicketID.trim();
    allTab["PriorityId"] = this.state.selectedPriority;
    allTab["TicketSatutsID"] = this.state.selectedTicketStatus;
    allTab["SLAStatus"] = this.state.selectedSLAStatus;
    allTab["ClaimId"] = this.state.selectedClaimID;
    allTab["InvoiceNumberORSubOrderNo"] = this.state.selectedInvoiceNo.trim();
    allTab["OrderItemId"] = this.state.selectedItemID.trim();
    allTab["IsVisitStore"] = this.state.selectedVisitStore;
    allTab["IsWantVistingStore"] = this.state.selectedWantVisitStore;
    allTab["CustomerEmailID"] = this.state.selectedEmailID.trim();
    allTab["CustomerMobileNo"] = this.state.selectedMobileNo.trim();
    allTab["AssignTo"] = this.state.selectedAssignedTo;
    allTab["StoreCodeORAddress"] = this.state.selectedWantVisitStore.trim();
    allTab[
      "WantToStoreCodeORAddress"
    ] = this.state.selectedVisitStoreAddress.trim();
    allTab["HaveClaim"] = withClaim;
    allTab["ClaimStatusId"] = this.state.selectedClaimStatus;
    allTab["ClaimCategoryId"] = this.state.selectedClaimCategory;
    allTab["ClaimSubCategoryId"] = this.state.selectedClaimSubCategory;
    allTab["ClaimIssueTypeId"] = this.state.selectedClaimIssueType;
    allTab["HaveTask"] = withTask;
    allTab["TaskStatusId"] = this.state.selectedTaskStatus;
    allTab["TaskDepartment_Id"] = this.state.selectedDepartment;
    allTab["TaskFunction_Id"] = this.state.selectedFunction;

    return allTab;
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
  handleScheduleDateChange = e => {
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
        selectedWeeklyDays: ""
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
        selectedNameOfDayForYearCommaSeperated: ""
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
        selectedWeeklyDays: ""
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
        selectedNameOfMonthForYearCommaSeperated: ""
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
        selectedNameOfDayForWeekCommaSeperated: ""
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
        selectedNameOfDayForWeekCommaSeperated: ""
      });
    }
    this.setState({
      selectScheduleDate: SelectData
    });
  };
  setTeamMember = e => {
    debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, s => s.userID)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };

  setDefaultTeamMember = e => {
    debugger;
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, s => s.userID)
        .toString();
    }
    this.setState({
      SelectedDefaultTeamMember: e,
      selectedTeamMemberCommaSeperated
    });
  };

  setDefaultMutiStatus = e => {
    debugger;
    if (e !== null) {
      var selectedStatus = Array.prototype.map
        .call(e, s => s.ticketStatusID)
        .toString();
    }
    this.setState({ SelectedTicketMultiStatus: e, selectedStatus });
  };

  setCreatedTicketSource = e => {
    debugger;
    if (e !== null) {
      var selectedCreatedTicketSource = Array.prototype.map
        .call(e, s => s.ticketSourceId)
        .toString();
    }
    this.setState({ SelectedSourceIds: e, selectedCreatedTicketSource });
  };

  setDefaultTicketStatus = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  setOnChangeReportData = e => {
    debugger;

    this.setState({
      [e.target.name]: e.target.value
    });

    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  handleGetDepartmentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let DepartmentData = res.data.responseData;
        self.setState({ DepartmentData: DepartmentData });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleAssignTo() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let AssignData = res.data.responseData;

        self.setState({
          AssignToData: AssignData
        });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let TicketPriorityData = res.data.responseData;
        self.setState({ TicketPriorityData: TicketPriorityData });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetTicketSourceList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let TicketSourceData = res.data.responseData;
        self.setState({
          TicketSourceData: TicketSourceData
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleReportList() {
    debugger;
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Report/GetReports",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var data = res.data.responseData;

        if (status === "Success") {
          self.setState({
            ReportData: data,
            loading: false
          });
        } else {
          self.setState({
            ReportData: [],
            loading: false
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleDownload = (id, name) => {
    debugger;
    this.setState({
      loadingDownload: false
    });
    let self = this;
    if (id == 0) {
      self.setState({ DefaultPopupName: name });
      self.setState({ OpenDefaultModal: true });
      setTimeout(function() {
        if (name == "Total Ticket Created") {
          document.getElementById("FromDate").style.display = "block";
        } else if (name == "Total Open Ticket") {
          document.getElementById("FromDate").style.display = "block";
          self.setState({ selectedDefaultTicketStatus: 102 });
          document.getElementById("drpDefaultStatus").disabled = true;
          document.getElementById("TicketStatus").style.display = "block";
        } else if (name == "Total Closed Ticket") {
          document.getElementById("TicketClosedTo").style.display = "block";
          document.getElementById("TicketClosedFrom").style.display = "block";
          document.getElementById("FromDate").style.display = "block";
        } else if (name == "Ticket Count By Associates") {
          document.getElementById("FromDate").style.display = "block";
          // document.getElementById("TicketStatus").style.display="block";
          document.getElementById("dvAssignedTo").style.display = "block";
          document.getElementById("dvMultiStatus").style.display = "block";
        } else if (name == "Escalated Tickets") {
          document.getElementById("FromDate").style.display = "block";
          self.setState({ selectedDefaultTicketStatus: 1001 });
          document.getElementById("drpDefaultStatus").disabled = true;
          document.getElementById("TicketStatus").style.display = "block";
        } else if (name == "Re-Assigned Tickets") {
          document.getElementById("FromDate").style.display = "block";
          document.getElementById("drpDefaultStatus").disabled = false;
          self.setState({ selectedDefaultTicketStatus: 1004 });
          //document.getElementById("drpDefaultStatus").disabled=true;
          document.getElementById("TicketStatus").style.display = "block";
        } else if (name == "Re-Opened Tickets") {
          document.getElementById("FromDate").style.display = "block";
          self.setState({ selectedDefaultTicketStatus: 105 });
          document.getElementById("drpDefaultStatus").disabled = true;
          document.getElementById("TicketStatus").style.display = "block";
        }
      }, 100);
    } else {
      this.setState({
        loading: true
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadReportSearch",
        headers: authHeader(),
        params: {
          SchedulerID: id
        }
      })
        .then(function(res) {
          debugger;
          window.open(res.data.responseData);
          // self.downloadURI(res.data.responseData,name+".csv");
          self.setState({
            loading: false
          });
        })
        .catch(data => {
          console.log(data);
        });
    }
  };
  sentMail = () => {
    debugger;
    let self=this;
    if (this.validator.allValid()) {
    axios({
      method: "post",
      url: config.apiUrl + "/Report/SendReportMail",
      headers: authHeader(),
      data: {
        EmailID:this.state.DefaultEmailID,
        FilePath:this.state.FileURL
      }
    })
      .then(function(res) {
        debugger;
        NotificationManager.success("Email has been sent", '', 1000);
        self.setState({
          loadingDownload: false
        });
      })
      .catch(data => {
        self.setState({
          loadingDownload: false
        });
        console.log(data);
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  downloadDefaultReport = () => {
    debugger;
    let self = this;
    let sourceIds = "";
    let assignedIds = "";
    let multiStatusIds = "";
    var elts = document.getElementsByClassName("cls-spnerror");
    for (var i = 0; i < elts.length; ++i) {
      elts[i].textContent = "";
    }
    if (this.state.DefaultPopupName == "Total Ticket Created") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds = this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "1"
        }
      })
        .then(function(res) {
          debugger;
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
          
        })
        .catch(data => {
          self.setState({
            loadingDownload: false
          });
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Total Open Ticket") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds = this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "2",
          Ticket_StatusID: this.state.selectedDefaultTicketStatus
        }
      })
        .then(function(res) {
          debugger;
         // window.open(res.data.responseData);
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Total Closed Ticket") {
      debugger;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds = this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      var totalError = 0;
      if (this.state.TicketClosedFrom == "") {
        totalError += 1;
        document.getElementById("spnTicketClosedFrom").textContent =
          "Please enter from ticket close date";
      }
      if (this.state.TicketClosedTo == "") {
        totalError += 1;
        document.getElementById("spnTicketClosedTo").textContent =
          "Please enter from ticket close date";
      }
      if (totalError > 0) {
        return false;
      } else {
        this.setState({
          loadingDownload: true
        });
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CloseFrom: moment(this.state.TicketClosedFrom).format(
            "YYYY-MM-DD"
          ),
          Ticket_CloseTo: moment(this.state.TicketClosedTo).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "3"
        }
      })
        .then(function(res) {
          debugger;
          //window.open(res.data.responseData);
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Ticket Count By Associates") {
      debugger;
      var totalError = 0;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      for (var i = 0; i < this.state.SelectedTicketMultiStatus.length; ++i) {
        multiStatusIds +=
          this.state.SelectedTicketMultiStatus[i].ticketStatusID + ",";
      }
      if (this.state.SelectedDefaultTeamMember == "") {
        totalError += 1;
        document.getElementById("spnAssignedTo").textContent =
          "Please select assigned to";
      }
      if (this.state.SelectedTicketMultiStatus == "") {
        totalError += 1;
        document.getElementById("spnTicketStatus").textContent =
          "Please select ticket status";
      }
      if (totalError > 0) {
        return;
      } else {
        this.setState({
          loadingDownload: true
        });
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_StatusIDs: multiStatusIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "4"
        }
      })
        .then(function(res) {
          debugger;
         // window.open(res.data.responseData);
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Escalated Tickets") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds = this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "5",
          Ticket_StatusID: this.state.selectedDefaultTicketStatus
        }
      })
        .then(function(res) {
          debugger;
        //  window.open(res.data.responseData);
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Re-Assigned Tickets") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds = this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "6",
          Ticket_StatusID: this.state.selectedDefaultTicketStatus
        }
      })
        .then(function(res) {
          debugger;
        //  window.open(res.data.responseData);
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Re-Opened Tickets") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds = this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "7",
          Ticket_StatusID: this.state.selectedDefaultTicketStatus
        }
      })
        .then(function(res) {
          debugger;
         // window.open(res.data.responseData);
          self.setState({
            loadingDownload: false
          });
          var resultArr=res.data.responseData.split('@');
          if(resultArr.length>1)
          { 
             self.setState({FileURL:resultArr[0]});           
             self.setState({OpenDefaultMailModal:true});
             self.setState({OpenDefaultModal:false});
          }
          else
          {
            window.open(resultArr[0]);         
          }
        })
        .catch(data => {
          console.log(data);
        });
    }
  };

  downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //delete link;
  };

  setDefaultEmail =e=> {
   this.setState({DefaultEmailID:e.target.value});
    //delete link;
  };
  handleDeleteReport(id) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Report/DeleteReport",
      headers: authHeader(),
      params: {
        ReportID: id
      }
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Record Deleted successfully.", '', 1000);
          self.handleReportList();
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetBrandList() {
    debugger;
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
  handleGetCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let CategoryData = res.data;

        self.setState({
          CategoryData: CategoryData
        });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleGetSubCategoryList() {
    debugger;
    let self = this;

    let cateId = this.state.selectedCategory;

    if (this.state.selectedCategory !== 0) {
      cateId = this.state.selectedCategory;
    } else {
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
        debugger;
        var SubCategoryData = res.data.responseData;
        self.setState({
          SubCategoryData: SubCategoryData
        });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetIssueTypeList() {
    debugger;
    let self = this;
    let subCateId = this.state.selectedSubCategory;
    if (this.state.selectedSubCategory !== 0) {
      subCateId = this.state.selectedSubCategory;
    } else {
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
        debugger;
        let IssueTypeData = res.data.responseData;
        self.setState({ IssueTypeData: IssueTypeData });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleSave() {
    debugger;
    let self = this;
    var SearchParams = {};

    SearchParams = JSON.stringify(this.state.ReportParams);
    if (self.state.selectedReportName == "") {
      NotificationManager.error("Please enter report name", '', 1000);
      return;
    }
    self = this;
    if (this.state.selectScheduleDate == "") {
      self.setState({ selectScheduleDate: 0 });
    }
    if (this.state.Schedule_ID > 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/Report/SaveReportForDownload",
        headers: authHeader(),
        params: {
          ScheduleID: this.state.Schedule_ID
        }
      })
        .then(function(res) {
          // this.handleReportList();
          self.handleReportList();
          self.handleNextPopupClose();
          NotificationManager.success(
            "Report saved successfully for download.", '', 1000
          );
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/Schedule",
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
          ScheduleFrom: 4,
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
            NotificationManager.success("Report saved successfully.", '', 1000);
            self.setState({
              ReportParams: {},
              selectedScheduleTime: "",
              // selectedTeamMemberCommaSeperated="",
              // selectScheduleDate="",
              // selectedScheduleTime="",
              IsDaily: false,
              IsDailyForMonth: false,
              IsWeekly: false,
              IsWeeklyForMonth: false,
              IsDailyForYear: false,
              IsWeeklyForYear: false
            });
          } else if (status == "duplicate") {
            self.setState({ Schedule_ID: 0 });
            NotificationManager.error("Report name already exist.", '', 1000);
          }
        })
        .catch(data => {
          console.log(data);
        });
    }

    // else{
    //   NotificationManager.error("Please create scheduler");
    // }
  }

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
      NotificationManager.error("Please add report name.", '', 1000);
      return;
    }
    debugger;
    if (this.state.selectedTeamMemberCommaSeperated == undefined) {
      NotificationManager.error("Please add team name for schedule.", '', 1000);
      return;
    }
    if (this.state.selectScheduleDate == "") {
      NotificationManager.error("Please select schedule type.", '', 1000);
      return;
    }
    if (this.state.selectedScheduleTime == "") {
      NotificationManager.error("Please select schedule time.", '', 1000);
      return;
    }
    if (SearchParams != "") {
      debugger;
      self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/Schedule",
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
            .selectedNameOfMonthForDailyYearCommaSeperated
        }
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
            NotificationManager.success("Scheduler created successfully.", '', 1000);
            self.setState({
              ReportParams: {},
              selectedScheduleTime: "",
              // selectedTeamMemberCommaSeperated="",
              // selectScheduleDate="",
              // selectedScheduleTime="",
              IsDaily: false,
              IsDailyForMonth: false,
              IsWeekly: false,
              IsWeeklyForMonth: false,
              IsDailyForYear: false,
              IsWeeklyForYear: false
            });
          } else if (status == "duplicate") {
            self.setState({ Schedule_ID: 0 });
            NotificationManager.error("Report name already exist.", '', 1000);
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please add report for create scheduler.", '', 1000);
    }
  }

  render() {
    const datareport = this.state.ReportData;
    return (
      <Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
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
                onClick={this.AddScheduler}
              >
                + Add
              </button>
            </div>
          </div>

          <Modal
            open={this.state.AddReportPopup}
            onClose={this.handleAddReportClose}
            closeIconId="sdsg"
            modalId="addreport-popup"
            // overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 0 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#ticket-tab"
                    role="tab"
                    aria-controls="ticket-tab"
                    aria-selected="true"
                  >
                    Tickets
                  </a>
                </li>
                <li className="nav-item cls-hide">
                  <a
                    className={`nav-link ${this.state.tabIndex === 1 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#chat-tab"
                    role="tab"
                    aria-controls="chat-tab"
                    aria-selected="false"
                  >
                    Chats
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
            <div className="tab-content">
              <div
                className={`tab-pane fade ${this.state.tabIndex === 0 &&
                  "show active"}`}
                id="ticket-tab"
                role="tabpanel"
                aria-labelledby="ticket-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Selected Brand</label>
                      <select
                        className="store-create-select mt-0"
                        value={this.state.selectBrand}
                        onChange={this.setOnChangeReportData}
                        name="selectBrand"
                      >
                        <option>Select</option>
                        {this.state.brandData !== null &&
                          this.state.brandData.map((item, i) => (
                            <option
                              key={i}
                              value={item.brandID}
                              className="select-category-placeholder"
                            >
                              {item.brandName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectBrand === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.BrandCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Source</label>
                      <select
                        name="selectedTicketSource"
                        value={this.state.selectedTicketSource}
                        onChange={this.setOnChangeReportData}
                      >
                        <option>Ticket Source</option>
                        {this.state.TicketSourceData !== null &&
                          this.state.TicketSourceData.map((item, i) => (
                            <option key={i} value={item.ticketSourceId}>
                              {item.ticketSourceName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedTicketSource === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.TicketSourceCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Invoice No/Sub Order No</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={25}
                        name="selectedInvoiceNo"
                        value={this.state.selectedInvoiceNo}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedInvoiceNo.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.InvoiceNoCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Customer Email Id</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={100}
                        name="selectedEmailID"
                        value={this.state.selectedEmailID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedEmailID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.EmailIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Creation Date</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.ReportCreateDate}
                          onChange={this.handleReportCreateDate.bind(this)}
                          placeholderText="Creation Date"
                          showMonthDropdown
                          showYearDropdown
                          dateFormat="dd/MM/yyyy"
                          value={this.state.ReportCreateDate}

                          // className="form-control"
                        />
                        {this.state.ReportCreateDate.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.CreateDateCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Id/title</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="selectedTicketID"
                        value={this.state.selectedTicketID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedTicketID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.TicketIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Item Id</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="selectedItemID"
                        value={this.state.selectedItemID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedItemID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ItemIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Customer Mobile No.</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={10}
                        name="selectedMobileNo"
                        value={this.state.selectedMobileNo}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedMobileNo.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.MobileNoCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Last Updated Date</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.ReportLastDate}
                          onChange={this.handleReportLastDate.bind(this)}
                          placeholderText="Last Updated Date"
                          showMonthDropdown
                          showYearDropdown
                          dateFormat="dd/MM/yyyy"
                          value={this.state.ReportLastDate}
                          // className="form-control"
                        />
                        {this.state.ReportLastDate.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.LastDateCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Priority</label>
                      <select
                        name="selectedPriority"
                        value={this.state.selectedPriority}
                        onChange={this.setOnChangeReportData}
                      >
                        <option> Priority</option>
                        {this.state.TicketPriorityData !== null &&
                          this.state.TicketPriorityData.map((item, i) => (
                            <option key={i} value={item.priorityID}>
                              {item.priortyName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedPriority === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.PriorityCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Visited Store</label>
                      <select
                        name="selectedVisitStore"
                        value={this.state.selectedVisitStore}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="all">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {this.state.selectedVisitStore === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.VisitStoreCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Assigned To</label>
                      <select
                        name="selectedAssignedTo"
                        value={this.state.selectedAssignedTo}
                        onChange={this.setOnChangeReportData}
                      >
                        <option>Select Assigned To</option>
                        {this.state.AssignToData !== null &&
                          this.state.AssignToData.map((item, i) => (
                            <option key={i} value={item.userID}>
                              {item.fullName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedAssignedTo === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.AssignedToCompulsion}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Category</label>
                      <select
                        className="add-select-category"
                        name="selectedCategory"
                        value={this.state.selectedCategory}
                        onChange={this.setOnChangeReportData}
                      >
                        <option>Select Category</option>
                        {this.state.CategoryData !== null &&
                          this.state.CategoryData.map((item, i) => (
                            <option key={i} value={item.categoryID}>
                              {item.categoryName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedCategory === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.CategoryCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Status</label>
                      <select
                        name="selectedTicketStatus"
                        value={this.state.selectedTicketStatus}
                        onChange={this.setOnChangeReportData}
                      >
                        <option> Status</option>
                        {this.state.TicketStatusData !== null &&
                          this.state.TicketStatusData.map((item, i) => (
                            <option key={i} value={item.ticketStatusID}>
                              {item.ticketStatusName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedTicketStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.TicketStatusCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Want To Visit Store</label>
                      <select
                        name="selectedWantVisitStore"
                        value={this.state.selectedWantVisitStore}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="all">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {this.state.selectedWantVisitStore === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.WantVisitStoreCompulsion}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Sub Category</label>
                      <select
                        className="add-select-category"
                        name="selectedSubCategory"
                        value={this.state.selectedSubCategory}
                        onChange={this.setOnChangeReportData}
                      >
                        <option>Select Subcategory</option>
                        {this.state.SubCategoryData !== null &&
                          this.state.SubCategoryData.map((item, i) => (
                            <option key={i} value={item.subCategoryID}>
                              {item.subCategoryName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedSubCategory === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.SubCategoryCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>SLA Status</label>
                      <select
                        name="selectedSLAStatus"
                        value={this.state.selectedSLAStatus}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="0">SLA Status</option>
                        {this.state.SlaDueData !== null &&
                          this.state.SlaDueData.map((item, i) => (
                            <option key={i} value={item.slaDueID}>
                              {item.slaDueName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Want To Visit Store Code/Addres</label>
                      <input
                        className="no-bg"
                        type="text"
                        name="selectedVisitStoreAddress"
                        value={this.state.selectedVisitStoreAddress}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedVisitStoreAddress.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.VisitStoreAddressCompulsion}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Issue Type</label>
                      <select
                        className="add-select-category"
                        name="selectedIssueType"
                        value={this.state.selectedIssueType}
                        onChange={this.setOnChangeReportData}
                      >
                        <option>Select IssueType</option>
                        {this.state.IssueTypeData !== null &&
                          this.state.IssueTypeData.map((item, i) => (
                            <option key={i} value={item.issueTypeID}>
                              {item.issueTypeName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedIssueType === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.IssueTypeCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Claim ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="selectedClaimID"
                        value={this.state.selectedClaimID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedClaimID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ClaimIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Purchase Store</label>
                      <input
                        className="no-bg"
                        type="text"
                        name="selectedPurchaseStore"
                        value={this.state.selectedPurchaseStore}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedPurchaseStore.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.PurchaseStoreCompulsion}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row borderbottom">
                    <div className="col-md-12"></div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>With Claim</label>
                      <select
                        name="selectedWithClaim"
                        value={this.state.selectedWithClaim}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>With Task</label>
                      <select
                        name="selectedWithTaskAll"
                        value={this.state.selectedWithTaskAll}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>Claim Status</label>
                          <select
                            name="selectedClaimStatus"
                            value={this.state.selectedClaimStatus}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Claim Status</option>
                            {this.state.ClaimStatusData !== null &&
                              this.state.ClaimStatusData.map((item, i) => (
                                <option key={i} value={item.claimStatusID}>
                                  {item.claimStatusName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedClaimStatus === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimStatusCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>

                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>Task Status</label>
                          <select
                            name="selectedTaskStatus"
                            value={this.state.selectedTaskStatus}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Task Status</option>
                            {this.state.TaskStatusData !== null &&
                              this.state.TaskStatusData.map((item, i) => (
                                <option key={i} value={item.taskStatusID}>
                                  {item.taskStatusName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedTaskStatus === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.TaskStatusCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>Claim Category</label>
                          <select
                            name="selectedClaimCategory"
                            value={this.state.selectedClaimCategory}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Claim Category</option>
                            {this.state.CategoryData !== null &&
                              this.state.CategoryData.map((item, i) => (
                                <option key={i} value={item.categoryID}>
                                  {item.categoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedClaimCategory === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimCategoryCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>Task Priority</label>
                          <select
                            name="selectedTaskPriority"
                            value={this.state.selectedTaskPriority}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Task Priority</option>
                            {this.state.TicketPriorityData !== null &&
                              this.state.TicketPriorityData.map((item, i) => (
                                <option key={i} value={item.priorityID}>
                                  {item.priortyName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedTaskPriority === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.TaskPriorityCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>Claim Sub Category</label>
                          <select
                            name="selectedClaimSubCategory"
                            value={this.state.selectedClaimSubCategory}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Claim Sub Category</option>
                            {this.state.SubCategoryData !== null &&
                              this.state.SubCategoryData.map((item, i) => (
                                <option key={i} value={item.subCategoryID}>
                                  {item.subCategoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedClaimSubCategory === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimSubCategoryCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>Task Department</label>
                          <select
                            name="selectedDepartment"
                            value={this.state.selectedDepartment}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Task Department</option>
                            {this.state.DepartmentData !== null &&
                              this.state.DepartmentData.map((item, i) => (
                                <option key={i} value={item.departmentID}>
                                  {item.departmentName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedDepartment === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.DepartmentCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>Claim Issue Type</label>
                          <select
                            name="selectedClaimIssueType"
                            value={this.state.selectedClaimIssueType}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Claim Issue Type</option>
                            {this.state.IssueTypeData !== null &&
                              this.state.IssueTypeData.map((item, i) => (
                                <option key={i} value={item.issueTypeID}>
                                  {item.issueTypeName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedClaimIssueType === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimIssueTypeCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>Task Function</label>
                          <select
                            name="selectedFunction"
                            value={this.state.selectedFunction}
                            onChange={this.setOnChangeReportData}
                          >
                            <option>Task Function</option>
                            {this.state.FunctionData !== null &&
                              this.state.FunctionData.map((item, i) => (
                                <option key={i} value={item.functionID}>
                                  {item.funcationName}
                                </option>
                              ))}
                          </select>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleChangeTab.bind(this, 1)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 1 &&
                  "show active"}`}
                id="chat-tab"
                role="tabpanel"
                aria-labelledby="chat-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>Chat Id</label>
                      <input className="no-bg" type="text" maxLength={11} />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Chat Status Remark</label>
                      <select>
                        <option>On Chat Resolution</option>
                        <option>Resolution</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Chat Ratings</label>
                      <select>
                        <option>Good</option>
                        <option>Bad</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>Chat Date</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.ChatDate}
                          onChange={this.handleChatDate.bind(this)}
                          placeholderText="Chat Date"
                          showMonthDropdown
                          showYearDropdown
                          // className="form-control"
                        />
                        {/* <input className="no-bg" type="text" /> */}
                      </div>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Ticket ID</label>
                      <input className="no-bg" type="text" maxLength={11} />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Customer Email ID</label>
                      <input className="no-bg" type="text" maxLength={100} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>Chat Status</label>
                      <select>
                        <option>Chat Start</option>
                        <option>Chat End</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Chat Assigned To</label>
                      <select>
                        <option>Naman</option>
                        <option>Naman R.</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Customer Mobile No.</label>
                      <input className="no-bg" type="text" maxLength={10} />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen}
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
            open={this.state.OpenDefaultMailModal}
            onClose={this.handleDefaultMailPopupClose}
            closeIconId="sdsg"
            modalId="nextdefaultpopup"
            classNames={{
              modal: "schedule-width"
            }}
            overlayId="logout-ovrly"
            // overlayId="logout-ovrly"
          >
            <div className="" id="EmailID">
              <div className="total-tic-title">
                <label>
                  <b>Mail</b>
                </label>
              </div>
              <div>
                <div id="dvAssignedTo" className="ticketreport">
                  Email ID
                  <div className="normal-dropdown dropdown-setting1 schedule-multi mt-2">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Enter email id"
                      name="email_"
                      maxLength={100}
                      value={this.state.DefaultEmailID}
                     onChange={this.setDefaultEmail.bind(this)}
                    />
                  </div>
                    {this.validator.message(
                    "Email Id",
                    this.state.DefaultEmailID,
                    "required|email"
                  )}
                  <span
                    id="spnMailError"
                    className="cls-spnerror"
                    style={{ color: "red" }}
                  ></span>
                </div>
              </div>
            </div>
            <div>
              <button
                className="scheduleBtn"
                onClick={this.sentMail.bind(this)}
                disabled={this.state.loadingDownload}
              >
                {this.state.loadingDownload ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : (
                  ""
                )}
                <label className="addLable">
                  {this.state.loadingDownload ? "Please Wait ..." : "Send"}
                </label>
              </button>
            </div>
            <div onClick={this.handleDefaultMailPopupClose}>
              <button type="button" className="scheduleBtncancel mt-3 w-100">
                CANCEL
              </button>
            </div>
          </Modal>

          <Modal
            open={this.state.OpenDefaultModal}
            onClose={this.handleDefaultPopupClose}
            closeIconId="sdsg"
            modalId="nextdefaultpopup"
            classNames={{
              modal: "schedule-width"
            }}
            overlayId="logout-ovrly"
            // overlayId="logout-ovrly"
          >
            <div className="" id="TotalTicketCreated">
              <div className="total-tic-title">
                <label>
                  <b>{this.state.DefaultPopupName}</b>
                </label>
              </div>
              <div>
                <div id="dvAssignedTo" className="cls-hide ticketreport">
                  Assigned To
                  <div className="normal-dropdown dropdown-setting1 schedule-multi mt-2">
                    <Select
                      getOptionLabel={option => option.fullName}
                      getOptionValue={
                        option => option.userID //id
                      }
                      options={this.state.AssignToData}
                      placeholder="Team Member"
                      // menuIsOpen={true}
                      closeMenuOnSelect={false}
                      onChange={this.setDefaultTeamMember.bind(this)}
                      value={this.state.SelectedDefaultTeamMember}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                  </div>
                  <span
                    id="spnAssignedTo"
                    className="cls-spnerror"
                    style={{ color: "red" }}
                  ></span>
                </div>
                <div id="dvMultiStatus" className="cls-hide ticketreport">
                  Ticket Status
                  <div className="normal-dropdown dropdown-setting1 schedule-multi mt-2">
                    <Select
                      getOptionLabel={option => option.ticketStatusName}
                      getOptionValue={
                        option => option.ticketStatusID //id
                      }
                      options={this.state.TicketStatusData}
                      placeholder="Ticket Status"
                      // menuIsOpen={true}
                      closeMenuOnSelect={false}
                      onChange={this.setDefaultMutiStatus.bind(this)}
                      value={this.state.SelectedTicketMultiStatus}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                  </div>
                  <span
                    id="spnTicketStatus"
                    className="cls-spnerror"
                    style={{ color: "red" }}
                  ></span>
                </div>
              </div>
              <div
                id="TicketClosedFrom"
                className="cls-hide ticketreport down-tic-rep"
              >
                Ticket Closed From
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketClosedFrom}
                    onChange={this.handleTicketClosedFrom.bind(this)}
                    placeholderText="Ticket Closed From"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketClosedFrom}
                  />
                </div>
                <span
                  id="spnTicketClosedFrom"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div
                id="TicketClosedTo"
                className="cls-hide ticketreport down-tic-rep"
              >
                Ticket Closed To
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketClosedTo}
                    onChange={this.handleTicketClosedTo.bind(this)}
                    placeholderText="Ticket Closed To"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketClosedTo}
                  />
                </div>
                <span
                  id="spnTicketClosedTo"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div id="FromDate" className="cls-hide ticketreport down-tic-rep">
                Ticket From Date
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketCreatedFromDate}
                    onChange={this.handleTicketCreateDate.bind(this)}
                    placeholderText="Creation Date"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketCreatedFromDate}
                  />
                </div>
                <span
                  id="spnTicketFromDate"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div className="ticketreport down-tic-rep">
                Ticket To Date
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketCreatedEndDate}
                    onChange={this.handleTicketCreateToDate.bind(this)}
                    placeholderText="To Date"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketCreatedEndDate}

                    // className="form-control"
                  />
                </div>
                <span
                  id="spnTicketToDate"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div className="ticketreport">
                Ticket Source
                <div className="mt-2 normal-dropdown dropdown-setting1 schedule-multi">
                  <Select
                    getOptionLabel={option => option.ticketSourceName}
                    getOptionValue={
                      option => option.ticketSourceId //id
                    }
                    options={this.state.TicketSourceData}
                    placeholder="Ticket Source"
                    // menuIsOpen={true}
                    closeMenuOnSelect={false}
                    onChange={this.setCreatedTicketSource.bind(this)}
                    value={this.state.SelectedSourceIds}
                    // showNewOptionAtTop={false}
                    isMulti
                  />
                </div>
                <span
                  id="spnTicketSource"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div id="TicketStatus" className="ticketreport cls-hide">
                Status
                <div className="mt-2">
                  <select
                    id="drpDefaultStatus"
                    className="w-100 normal-dropdown dropdown-setting1"
                    name="selectedDefaultTicketStatus"
                    value={this.state.selectedDefaultTicketStatus}
                    onChange={this.setDefaultTicketStatus}
                  >
                    <option> Status</option>
                    {this.state.TicketStatusData !== null &&
                      this.state.TicketStatusData.map((item, i) => (
                        <option key={i} value={item.ticketStatusID}>
                          {item.ticketStatusName}
                        </option>
                      ))}
                  </select>
                  {this.state.selectedDefaultTicketStatus === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.TicketStatusCompulsion}
                    </p>
                  )}
                </div>
                <span
                  id="spnStatus"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
            </div>
            <div>
              <button
                className="scheduleBtn"
                onClick={this.downloadDefaultReport.bind(this)}
                disabled={this.state.loadingDownload}
              >
                {this.state.loadingDownload ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : (
                  ""
                )}
                <label className="addLable">
                  {this.state.loadingDownload ? "Please Wait ..." : "Download"}
                </label>
              </button>
            </div>
            <div onClick={this.handleDefaultPopupClose}>
              <button type="button" className="scheduleBtncancel mt-3 w-100">
                CANCEL
              </button>
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
                  <div className="totalresultcircle">
                    <label className="totalresult">Total Result</label>
                    <span className="totalresultnumber">
                      {this.state.totalResultCount}
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
                      onChange={this.setOnChangeReportData}
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
                            getOptionLabel={option => option.fullName}
                            getOptionValue={
                              option => option.userID //id
                            }
                            options={this.state.AssignToData}
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
                                onChange={this.setOnChangeReportData}
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
                                marginTop: "10px"
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
                                    getOptionLabel={option => option.days}
                                    getOptionValue={
                                      option => option.days //id
                                    }
                                    options={this.state.NameOfDayForWeek}
                                    placeholder="Select"
                                    // menuIsOpen={true}
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfDayForWeek.bind(
                                      this
                                    )}
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
                                  lineHeight: "40px"
                                }}
                              >
                                on
                              </label>
                              <div className="col-md-7">
                                <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                  <Select
                                    getOptionLabel={option => option.month}
                                    getOptionValue={
                                      option => option.month //id
                                    }
                                    options={this.state.NameOfMonthForYear}
                                    placeholder="Select"
                                    // menuIsOpen={true}
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfMonthForYear.bind(
                                      this
                                    )}
                                    value={
                                      this.state.selectedNameOfMonthForYear
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
                                    lineHeight: "40px"
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
                                    getOptionLabel={option => option.days}
                                    getOptionValue={
                                      option => option.days //id
                                    }
                                    options={this.state.NameOfDayForYear}
                                    placeholder="Select"
                                    // menuIsOpen={true}
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfDayForYear.bind(
                                      this
                                    )}
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
                                  marginLeft: "14px"
                                }}
                              >
                                to
                              </label>
                              <div className="col-md-5">
                                <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                  <Select
                                    getOptionLabel={option => option.month}
                                    getOptionValue={
                                      option => option.month //id
                                    }
                                    options={this.state.NameOfMonthForDailyYear}
                                    placeholder="Select"
                                    // menuIsOpen={true}
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfMonthForDailyYear.bind(
                                      this
                                    )}
                                    value={
                                      this.state.selectedNameOfMonthForDailyYear
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
                  <div className="buttonschdulesave1">
                    <button onClick={this.handleSave} className="Schedulenext1">
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {/* </div> */}
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable reactreport">
            <div style={{ backgroundColor: "#fff" }}>
              {this.state.loading === true ? (
                <div className="loader-icon"></div>
              ) : (
                <ReactTable
                  data={datareport}
                  columns={[
                    {
                      Header: (
                        <span>
                          Name
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "reportName"
                    },
                    {
                      Header: (
                        <span>
                          Schedule Status
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "scheduleStatus"
                    },
                    {
                      Header: (
                        <span>
                          Created by
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "createdBy",
                      Cell: row => {
                        var ids = row.original["reportID"];
                        return (
                          <div>
                            <span>
                              Admin
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
                                        Created Date: {row.original.createdDate}
                                      </p>
                                    </div>
                                    <div>
                                      <b>
                                        <p className="title">
                                          Updated By: {row.original.modifiedBy}
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
                        <span>
                          Status
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "reportStatus"
                    },
                    {
                      Header: <span>Actions</span>,
                      accessor: "actionReport",
                      Cell: row => (
                        <div className="report-action">
                          <div>
                            {row.original.isDownloaded == 1 && (
                              <img
                                src={DownExcel}
                                alt="download icon"
                                className="downloadaction"
                                onClick={this.handleDownload.bind(
                                  this,
                                  row.original.scheduleID,
                                  row.original.reportName
                                )}
                              />
                            )}
                          </div>
                          <div>
                            {row.original.scheduleID == 0 ? (
                              ""
                            ) : (
                              <Popover
                                content={
                                  <div className="samdel d-flex general-popover popover-body">
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
                                        <a>CANCEL</a>
                                        <button
                                          className="butn"
                                          onClick={this.handleDeleteReport.bind(
                                            this,
                                            row.original.reportID
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
                                  // onClick={() => this.show(this, "samdel" + ids)}
                                />
                              </Popover>
                            )}
                          </div>
                          <div>
                            {row.original.scheduleID == 0 ? (
                              ""
                            ) : (
                              <button
                                className="react-tabel-button editre"
                                id="p-edit-pop-2"
                                onClick={this.handleEditReport.bind(
                                  this,
                                  row.original
                                )}
                              >
                                EDIT
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    }
                  ]}
                  resizable={false}
                  defaultPageSize={10}
                  showPagination={true}
                  minRows={1}
                />
              )}
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
        </div>
      </Fragment>
    );
  }
}

export default Reports;
