import React, { Component } from "react";
import "./../../../node_modules/jquery/dist/jquery.js";
import "./../../../node_modules/popper.js/dist/popper.js";
import "./../../../node_modules/bootstrap/dist/js/bootstrap.js";
import Demo from "./../../store/Hashtag";
import SearchIcon from "./../../assets/Images/search-icon.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import TaskDepartment from "./Charts/TaskDepartment.js";
import TaskByPriority from "./Charts/TaskByPriority.js";
import ClaimVsInvoice from "./Charts/ClaimVsInvoice.js";
import Sorting from "./../../assets/Images/sorting.png";
import OpenClaim from "./Charts/OpenClaim.js";
import OpenCompaign from "./Charts/OpenCompaign.js";
import InvoiceAmountPie from "./Charts/InvoiceAmountPie.js";
import { Collapse, CardBody, Card } from "reactstrap";
import Modal from "react-responsive-modal";
import { Popover } from "antd";
import ReactTable from "react-table";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePickerComponenet from "./../Settings/Store/DatePickerComponenet";
import CreationOnDatePickerCompo from "./../Settings/Store/CreationDatePickerCompo";
import moment from "moment";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader.js";
import StoreStatus from "./StoreStatus.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import matchSorter from "match-sorter";

class StoreDashboard extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let end = moment(start).add(30, "days");
    // let creationStart = moment(
    //   new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    // ).subtract(30, "days");
    // let creationEnd = moment(creationStart).add(30, "days");
    this.state = {
      FilterCollapse: false,
      StatusModel: false,
      start: start,
      end: end,
      creationStart: "",
      creationEnd: "",
      dashboardGridData: [],
      storeStatus: StoreStatus(),
      BrandData: [],
      AgentData: [],
      AgentIds: "",
      BrandIds: "",
      CheckBoxAllAgent: true,
      CheckBoxAllBrand: true,
      departmentData: [],
      funcationData: [],
      assignToData: [],
      selectDepartment: 0,
      selectedFuncation: 0,
      selectedPriority: 0,
      selectAssignTo: 0,
      SelectedCreatedBy: 0,
      priorityData: [],
      graphCount: {},
      loadingAbove: true,
      task_Id: "",
      Task_Claim: "",
      Task_ClaimId: "",
      Task_Ticket: "",
      task_Title: "",
      selectedStatus: 0,
      claim_Id: "",
      Task_ticketId: "",
      taskCount: 0,
      DashboardOpenTaskDepartmentWise: [],
      DashboardTaskByPriority: [],
      DashboardOpenCampaignByType: [],
      DashboardClaimVsInvoiceArticle: [],
      DashboardOpenClaimStatus: [],
      DashboardClaimVsInvoiceAmount: [],
      FlagClaimVsInvoiceArticle: false,
      FlagOpenClaimStatus: false,
      FlagClaimVsInvoiceAmount: false,
      searchData: {},
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
      userData: [],
      activeTab: 1,
      createdUser: [],
      cliamCount: 0,
      cliamSearchData: [],
      isViewSerach: false,
      TaskID: 0,
      ClaimID: 0,
      scategoryNameFilterCheckbox: "",
      screatedByNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassignToFilterCheckbox: "",
      sclaimStatusFilterCheckbox: "",
      sortFiltercategoryName: [],
      sortFiltercreatedByName: [],
      sortFiltercreationOn: [],
      sortFilterassignTo: [],
      sortFilterclaimStatus: [],
      sortcategoryName: [],
      sortcreatedByName: [],
      sortcreationOn: [],
      sortassignTo: [],
      sortclaimStatus: [],
      sortColumn: "",
      sortHeader: "",
      filterTxtValue: "",
      isortA: false,
      tempitemData: [],
      sortAllData: [],
      isATOZ: true,
      itemData: [],
      sdepartmentFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      sassigntoIdFilterCheckbox: "",
      staskstatusFilterCheckbox: "",
      screatedOnFilterCheckbox: "",
      sortFilterdepartment: [],
      sortFilterstoreName: [],
      sortFilterassigntoId: [],
      sortFiltertaskstatus: [],
      sortFiltercreatedOn: [],
      sortdepartment: [],
      sortstoreName: [],
      sortassigntoId: [],
      sorttaskstatus: [],
      sortcreatedOn: [],
    };
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
    this.checkAllBrandStart = this.checkAllBrandStart.bind(this);
    this.checkAllAgentStart = this.checkAllAgentStart.bind(this);
    this.handleGetDepartmentDropdown = this.handleGetDepartmentDropdown.bind(
      this
    );
    this.handleGetAssignTobyFuncationId = this.handleGetAssignTobyFuncationId.bind(
      this
    );
  }

  componentDidMount() {
    this.handleGetBrandList();
    this.handleGetAgentList();
    this.handleViewSearchData("grid");
    // this.handleGetDashboardGraphCount();
    this.handleGetClaimCategory();
    this.handleGetStoreUser();
  }
  handleFilterCollapse() {
    this.setState((state) => ({ FilterCollapse: !state.FilterCollapse }));
    this.handleGetDepartmentDropdown();
    this.handleGetCreatedByUserDropdown();
    this.handleGetPriorityList();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];

    if (this.state.activeTab == 1) {
      itemsArray = this.state.dashboardGridData;
    } else {
      itemsArray = this.state.cliamSearchData;
    }

    if (this.state.sortColumn === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return 1;
        if (a.categoryName > b.categoryName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "claimStatus") {
      itemsArray.sort((a, b) => {
        if (a.claimStatus < b.claimStatus) return 1;
        if (a.claimStatus > b.claimStatus) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdByName") {
      itemsArray.sort((a, b) => {
        if (a.createdByName < b.createdByName) return 1;
        if (a.createdByName > b.createdByName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "creationOn") {
      itemsArray.sort((a, b) => {
        if (a.creationOn < b.creationOn) return 1;
        if (a.creationOn > b.creationOn) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "assignTo") {
      itemsArray.sort((a, b) => {
        if (a.assignTo < b.assignTo) return 1;
        if (a.assignTo > b.assignTo) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "department") {
      itemsArray.sort((a, b) => {
        if (a.department < b.department) return 1;
        if (a.department > b.department) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return 1;
        if (a.storeName > b.storeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "assigntoId") {
      itemsArray.sort((a, b) => {
        if (a.assigntoId < b.assigntoId) return 1;
        if (a.assigntoId > b.assigntoId) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "taskstatus") {
      itemsArray.sort((a, b) => {
        if (a.taskstatus < b.taskstatus) return 1;
        if (a.taskstatus > b.taskstatus) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdOn") {
      itemsArray.sort((a, b) => {
        if (a.createdOn < b.createdOn) return 1;
        if (a.createdOn > b.createdOn) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: false,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];

    if (this.state.activeTab == 1) {
      itemsArray = this.state.dashboardGridData;
    } else {
      itemsArray = this.state.cliamSearchData;
    }

    if (this.state.sortColumn === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return -1;
        if (a.categoryName > b.categoryName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "claimStatus") {
      itemsArray.sort((a, b) => {
        if (a.claimStatus < b.claimStatus) return -1;
        if (a.claimStatus > b.claimStatus) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdByName") {
      itemsArray.sort((a, b) => {
        if (a.createdByName < b.createdByName) return -1;
        if (a.createdByName > b.createdByName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "creationOn") {
      itemsArray.sort((a, b) => {
        if (a.creationOn < b.creationOn) return -1;
        if (a.creationOn > b.creationOn) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "assignTo") {
      itemsArray.sort((a, b) => {
        if (a.assignTo < b.assignTo) return -1;
        if (a.assignTo > b.assignTo) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "department") {
      itemsArray.sort((a, b) => {
        if (a.department < b.department) return -1;
        if (a.department > b.department) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return -1;
        if (a.storeName > b.storeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "assigntoId") {
      itemsArray.sort((a, b) => {
        if (a.assigntoId < b.assigntoId) return -1;
        if (a.assigntoId > b.assigntoId) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "taskstatus") {
      itemsArray.sort((a, b) => {
        if (a.taskstatus < b.taskstatus) return -1;
        if (a.taskstatus > b.taskstatus) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdOn") {
      itemsArray.sort((a, b) => {
        if (a.createdOn < b.createdOn) return -1;
        if (a.createdOn > b.createdOn) return 1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      isATOZ: true,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    debugger;
    this.setState({ isortA: false });
    if (data === "categoryName") {
      if (
        this.state.sclaimStatusFilterCheckbox !== "" ||
        this.state.screatedByNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassignToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sclaimStatusFilterCheckbox: "",
          screatedByNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassignToFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "claimStatus") {
      if (
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.screatedByNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassignToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryNameFilterCheckbox: "",
          screatedByNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassignToFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdByName") {
      if (
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.sclaimStatusFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassignToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryNameFilterCheckbox: "",
          sclaimStatusFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassignToFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "creationOn") {
      if (
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.sclaimStatusFilterCheckbox !== "" ||
        this.state.screatedByNameFilterCheckbox !== "" ||
        this.state.sassignToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryNameFilterCheckbox: "",
          sclaimStatusFilterCheckbox: "",
          screatedByNameFilterCheckbox: "",
          sassignToFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "assignTo") {
      if (
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.sclaimStatusFilterCheckbox !== "" ||
        this.state.screatedByNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryNameFilterCheckbox: "",
          sclaimStatusFilterCheckbox: "",
          screatedByNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }

    if (data === "department") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sassigntoIdFilterCheckbox !== "" ||
        this.state.staskstatusFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sassigntoIdFilterCheckbox: "",
          staskstatusFilterCheckbox: "",
          screatedOnFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }

    if (data === "storeName") {
      if (
        this.state.sdepartmentFilterCheckbox !== "" ||
        this.state.sassigntoIdFilterCheckbox !== "" ||
        this.state.staskstatusFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdepartmentFilterCheckbox: "",
          sassigntoIdFilterCheckbox: "",
          staskstatusFilterCheckbox: "",
          screatedOnFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "assigntoId") {
      if (
        this.state.sdepartmentFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.staskstatusFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdepartmentFilterCheckbox: "",
          sstoreNameFilterCheckbox: "",
          staskstatusFilterCheckbox: "",
          screatedOnFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "taskstatus") {
      if (
        this.state.sdepartmentFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sassigntoIdFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdepartmentFilterCheckbox: "",
          sstoreNameFilterCheckbox: "",
          sassigntoIdFilterCheckbox: "",
          screatedOnFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdOn") {
      if (
        this.state.sdepartmentFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sassigntoIdFilterCheckbox !== "" ||
        this.state.staskstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdepartmentFilterCheckbox: "",
          sstoreNameFilterCheckbox: "",
          sassigntoIdFilterCheckbox: "",
          staskstatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    debugger;
    this.setState({
      sortFilterclaimStatus: this.state.sortclaimStatus,
      sortFiltercategoryName: this.state.sortcategoryName,
      sortFiltercreatedByName: this.state.sortcreatedByName,
      sortFiltercreationOn: this.state.sortcreationOn,
      sortFilterassignTo: this.state.sortassignTo,
      sortFilterdepartment: this.state.sortdepartment,
      sortFilterstoreName: this.state.sortstoreName,
      sortFilterassigntoId: this.state.sortassigntoId,
      sortFiltertaskstatus: this.state.sorttaskstatus,
      sortFiltercreatedOn: this.state.sortcreatedOn,
    });
    if (this.state.tempitemData.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
      });
      if (this.state.activeTab === 1) {
        this.setState({ dashboardGridData: this.state.tempitemData });
      } else {
        this.setState({ cliamSearchData: this.state.tempitemData });
      }

      if (this.state.sortColumn === "categoryName") {
        if (this.state.scategoryNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByNameFilterCheckbox: "",
            sclaimStatusFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassignToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdByName") {
        if (this.state.screatedByNameFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
            sclaimStatusFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassignToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "claimStatus") {
        if (this.state.sclaimStatusFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
            screatedByNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassignToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "creationOn") {
        if (this.state.screationOnFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
            screatedByNameFilterCheckbox: "",
            sclaimStatusFilterCheckbox: "",
            sassignToFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "assignTo") {
        if (this.state.sassignToFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
            screatedByNameFilterCheckbox: "",
            sclaimStatusFilterCheckbox: "",
            screationOnFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "department") {
        if (this.state.sdepartmentFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sassigntoIdFilterCheckbox: "",
            staskstatusFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "storeName") {
        if (this.state.sstoreNameFilterCheckbox === "") {
        } else {
          this.setState({
            sdepartmentFilterCheckbox: "",
            sassigntoIdFilterCheckbox: "",
            staskstatusFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "assigntoId") {
        if (this.state.sassigntoIdFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentFilterCheckbox: "",

            staskstatusFilterCheckbox: "",
            screatedOnFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "taskstatus") {
        if (this.state.staskstatusFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentFilterCheckbox: "",
            sassigntoIdFilterCheckbox: "",

            screatedOnFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdOn") {
        if (this.state.screatedOnFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentFilterCheckbox: "",
            sassigntoIdFilterCheckbox: "",

            staskstatusFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        sortHeader: this.state.isortA ? this.state.sortHeader : "",
      });

      if (this.state.activeTab == 1) {
        this.setState({
          dashboardGridData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      } else {
        this.setState({
          cliamSearchData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
    }
  }
  hanldetoggleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
      DashboardOpenTaskDepartmentWise: [],
      DashboardTaskByPriority: [],
      DashboardOpenCampaignByType: [],
      DashboardClaimVsInvoiceArticle: [],
      DashboardOpenClaimStatus: [],
      DashboardClaimVsInvoiceAmount: [],
    });
    this.handleGetDashboardGraphCount();
    this.handleGetDashboardGraphData();
  };
  SearchCreationOn = async (startDate, endDate) => {
    debugger;
    var startArr = endDate[0].split("-");
    var dummyStart = startArr[0];
    startArr[0] = startArr[1];
    startArr[1] = dummyStart;
    var creationStart = startArr.join("-");
    var endArr = endDate[1].split("-");
    var dummyEnd = endArr[0];
    endArr[0] = endArr[1];
    endArr[1] = dummyEnd;
    var creationEnd = endArr.join("-");
    await this.setState({
      creationStart,
      creationEnd,
    });
  };
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
        DashboardOpenTaskDepartmentWise: [],
        DashboardTaskByPriority: [],
        DashboardOpenCampaignByType: [],
        DashboardClaimVsInvoiceArticle: [],
        DashboardOpenClaimStatus: [],
        DashboardClaimVsInvoiceAmount: [],
      },
      () => {
        this.handleGetDashboardGraphCount();
        this.handleGetDashboardGraphData();
        // this.ViewSearchData();
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
      document.getElementById("spnBrand").textContent = "ALL";
      this.setState({ CheckBoxAllBrand: true });
    } else {
      this.setState({ CheckBoxAllBrand: false });
    }

    this.setState(
      {
        BrandIds: strBrandIds,
        DashboardOpenTaskDepartmentWise: [],
        DashboardTaskByPriority: [],
        DashboardOpenCampaignByType: [],
        DashboardClaimVsInvoiceArticle: [],
        DashboardOpenClaimStatus: [],
        DashboardClaimVsInvoiceAmount: [],
      },
      () => {
        this.handleGetDashboardGraphCount();
        this.handleGetDashboardGraphData();
        // this.ViewSearchData();
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
    this.handleGetDashboardGraphCount();
    this.handleGetDashboardGraphData();
    // this.ViewSearchData();
  };
  checkAllAgentStart(event) {
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
      this.handleGetDashboardGraphCount();
      this.handleGetDashboardGraphData();
      // this.handleTicketsOnLoad();
    } else {
      this.setState({ loadingAbove: false });
    }
  }
  checkAllBrand = async (event) => {
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
    this.handleGetDashboardGraphCount();
    this.handleGetDashboardGraphData();
    // this.ViewSearchData();
  };
  checkAllBrandStart(event) {
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
      this.handleGetDashboardGraphCount();
      this.handleGetDashboardGraphData();
      // this.handleTicketsOnLoad();
    } else {
      this.setState({ loadingAbove: false });
    }
  }

  handleDropdownOnchange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "claimStatus") {
      this.setState({
        selectDepartment: value,
      });
      setTimeout(() => {
        this.handleGetFuncationByDepartmentId();
      }, 10);
    } else if (name === "selectedFuncation") {
      this.setState({
        selectedFuncation: value,
      });
      setTimeout(() => {
        this.handleGetAssignTobyFuncationId();
      }, 10);
    } else if (name === "selectAssignTo") {
      this.setState({
        selectAssignTo: value,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  ///// -----------API function--------------------------
  /// get count of all task and claim counts
  handleGetDashboardGraphCount() {
    debugger;
    let self = this;
    this.setState({ loadingAbove: true });
    var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
    var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");

    var finalData = {};
    finalData.UserIds = this.state.AgentIds;
    finalData.DateFrom = fromdate;
    finalData.DateEnd = todate;
    finalData.BrandIDs = this.state.BrandIds;
    axios({
      method: "post",
      url: config.apiUrl + "/Graph/GetGraphCountData",
      headers: authHeader(),
      data: finalData,
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ graphCount: data, loadingAbove: false });
        } else {
          self.setState({ graphCount: {}, loadingAbove: false });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// Get Dashboard graph data
  handleGetDashboardGraphData() {
    debugger;
    let self = this;
    this.setState({ loadingAbove: true });
    var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
    var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");

    var finalData = {};
    finalData.UserIds = this.state.AgentIds;
    finalData.DateFrom = fromdate;
    finalData.DateEnd = todate;
    finalData.BrandIDs = this.state.BrandIds;
    axios({
      method: "post",
      url: config.apiUrl + "/Graph/GetGraphData",
      headers: authHeader(),
      data: finalData,
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var DashboardOpenTaskDepartmentWise =
          res.data.responseData.openTaskDepartmentWise;
        var DashboardTaskByPriority = res.data.responseData.taskByPriority;
        var DashboardOpenCampaignByType =
          res.data.responseData.openCampaignByType;
        var DashboardClaimVsInvoiceArticle =
          res.data.responseData.claimVsInvoiceArticle;
        var DashboardOpenClaimStatus = res.data.responseData.openClaimStatus;
        var DashboardClaimVsInvoiceAmount =
          res.data.responseData.claimVsInvoiceAmount;

        if (DashboardOpenTaskDepartmentWise !== null) {
          self.setState({
            DashboardOpenTaskDepartmentWise,
          });
        }
        if (DashboardTaskByPriority !== null) {
          self.setState({
            DashboardTaskByPriority,
          });
        }
        if (DashboardOpenCampaignByType !== null) {
          self.setState({
            DashboardOpenCampaignByType,
          });
        }
        if (DashboardClaimVsInvoiceArticle !== null) {
          self.setState({
            DashboardClaimVsInvoiceArticle,
            FlagClaimVsInvoiceArticle: false,
          });
        } else {
          self.setState({
            FlagClaimVsInvoiceArticle: true,
          });
        }
        if (DashboardOpenClaimStatus !== null) {
          self.setState({
            DashboardOpenClaimStatus,
            FlagOpenClaimStatus: false,
          });
        } else {
          self.setState({
            FlagOpenClaimStatus: true,
          });
        }
        if (DashboardClaimVsInvoiceAmount !== null) {
          self.setState({
            DashboardClaimVsInvoiceAmount,
            FlagClaimVsInvoiceAmount: false,
          });
        } else {
          self.setState({
            FlagClaimVsInvoiceAmount: true,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// Get Brand name list for dropdown
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(res) {
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
      .catch((res) => {
        console.log(res);
      });
  }
  /// Get Agent list for dropdown
  handleGetAgentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Graph/GetUserList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AgentData: data,
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AgentData: [],
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  ///Get Department list for dropdown
  handleGetDepartmentDropdown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            departmentData: data,
          });
        } else {
          self.setState({
            departmentData: [],
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// Get Funcation list by Department Id for dropdown
  handleGetFuncationByDepartmentId() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: { DepartmentId: this.state.selectDepartment },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ funcationData: data });
        } else {
          self.setState({ funcationData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ///Get Created by user list for dropdown
  handleGetCreatedByUserDropdown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            createdUser: data,
          });
        } else {
          self.setState({
            createdUser: [],
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  //// Get Assign to list by funcation id
  handleGetAssignTobyFuncationId() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssignedTo",
      headers: authHeader(),
      params: {
        Function_ID: this.state.selectedFuncation,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ assignToData: data });
        } else {
          self.setState({ assignToData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  ///handle get priority list for dropdown
  handleGetPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ priorityData: data });
        } else {
          self.setState({ priorityData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //// handle Search data in toggle
  handleViewSearchData(check) {
    debugger;
    let self = this;
    var claimID = 0;
    var taskID = 0;
    var ticketID = 0;
    if (check === "grid") {
      var fromDate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
      var toDate = moment(new Date(this.state.end)).format("YYYY-MM-DD");
    } else {
      if (this.state.creationStart !== "" && this.state.creationEnd !== "") {
        var fromDate = moment(new Date(this.state.creationStart)).format(
          "YYYY-MM-DD"
        );
        var toDate = moment(new Date(this.state.creationEnd)).format(
          "YYYY-MM-DD"
        );
      } else {
        var fromDate = null;
        var toDate = null;
      }
    }
    if (this.state.Task_ClaimId !== "") {
      claimID = parseInt(this.state.Task_ClaimId);
    } else {
      claimID = 0;
    }
    if (this.state.Task_ticketId !== "") {
      ticketID = this.state.Task_ticketId;
    } else {
      ticketID = 0;
    }

    if (this.state.task_Id !== "") {
      taskID = parseInt(this.state.task_Id);
    } else {
      taskID = 0;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/getstoreDashboardList",
      headers: authHeader(),
      data: {
        taskid: taskID,
        Department: this.state.selectDepartment,
        tasktitle: this.state.task_Title,
        taskstatus: this.state.selectedStatus,
        ticketID: ticketID,
        functionID: this.state.selectedFuncation,
        CreatedOnFrom: fromDate,
        CreatedOnTo: toDate,
        AssigntoId: this.state.selectAssignTo,
        Priority: this.state.selectedPriority,
        taskwithTicket: this.state.Task_Ticket,
        taskwithClaim: this.state.Task_Claim,
        claimID: claimID,
        createdID: this.state.SelectedCreatedBy,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;

        if (message === "Success") {
          self.setState({
            dashboardGridData: data,
            taskCount: data.length,
            sortAllData: data,
          });
          var sortFilterdepartment = [];
          var sortFilterstoreName = [];
          var sortFilterassigntoId = [];
          var sortFiltertaskstatus = [];
          var sortFiltercreatedOn = [];
          var sortdepartment = [];
          var sortstoreName = [];
          var sortassigntoId = [];
          var sorttaskstatus = [];
          var sortcreatedOn = [];

          var unique = [];
          var distinct = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].department]) {
              distinct.push(data[i].department);
              unique[data[i].department] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortdepartment.push({ department: distinct[i] });
              sortFilterdepartment.push({
                department: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].storeName]) {
              distinct.push(data[i].storeName);
              unique[data[i].storeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortstoreName.push({ storeName: distinct[i] });
              sortFilterstoreName.push({
                storeName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].assigntoId]) {
              distinct.push(data[i].assigntoId);
              unique[data[i].assigntoId] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortassigntoId.push({ assigntoId: distinct[i] });
              sortFilterassigntoId.push({
                assigntoId: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].taskstatus]) {
              distinct.push(data[i].taskstatus);
              unique[data[i].taskstatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sorttaskstatus.push({ taskstatus: distinct[i] });
              sortFiltertaskstatus.push({
                taskstatus: distinct[i],
              });
            }
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
            if (distinct[i]) {
              sortcreatedOn.push({
                createdOn: distinct[i],
              });
              sortFiltercreatedOn.push({
                createdOn: distinct[i],
              });
            }
          }
          self.setState({
            sortFilterdepartment,
            sortFilterstoreName,
            sortFilterassigntoId,
            sortFiltertaskstatus,
            sortFiltercreatedOn,
            sortdepartment,
            sortstoreName,
            sortassigntoId,
            sorttaskstatus,
            sortcreatedOn,
            sortAllData: data,
          });
        } else {
          self.setState({ dashboardGridData: [], taskCount: 0 });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////handle get claim category
  handleGetClaimCategory() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimCategory",
      headers: authHeader(),
      params: { BrandIds: "" },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var categoryData = response.data.responseData;
        if (message == "Success" && categoryData) {
          self.setState({ categoryData });
        } else {
          self.setState({ categoryData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetClaimCategory");
      });
  }

  ////handle get claim sub cateogry by cateogry id
  handleGetClaimSubCategory() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimSubCategory",
      headers: authHeader(),
      params: { CategoryIDs: this.state.searchData["claimcat"] },
    })
      .then(function(response) {
        var message = response.data.message;
        var subCategoryData = response.data.responseData;
        if (message == "Success" && subCategoryData) {
          self.setState({ subCategoryData });
        } else {
          self.setState({ subCategoryData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetClaimSubCategory");
      });
  }

  ////handle get issue type by sub cateogry id
  handleGetIssueType() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimIssueType",
      headers: authHeader(),
      params: { subCategoryIDs: this.state.searchData["claimsubcat"] },
    })
      .then(function(response) {
        var message = response.data.message;
        var issueTypeData = response.data.responseData;
        if (message == "Success" && issueTypeData) {
          self.setState({ issueTypeData });
        } else {
          self.setState({ issueTypeData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetIssueType");
      });
  }
  //// handle get store user
  handleGetStoreUser() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var userData = response.data.responseData;
        if (message == "Success" && userData) {
          self.setState({ userData });
        } else {
          self.setState({ userData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreUser");
      });
  }
  ////handle cliam view search
  handleClaimViewSearch() {
    let self = this;
    var inputParam = {};
    inputParam.claimID = Number(this.state.searchData["claimID"]) || 0;
    inputParam.ticketID = Number(this.state.searchData["ticketID"]) || 0;
    inputParam.claimissueType =
      Number(this.state.searchData["claimissueType"]) || 0;
    inputParam.ticketMapped =
      Number(this.state.searchData["ticketMapped"]) || 0;
    inputParam.claimsubcat = Number(this.state.searchData["claimsubcat"]) || 0;
    inputParam.assignTo = Number(this.state.searchData["assignTo"]) || 0;
    inputParam.claimcat = Number(this.state.searchData["claimcat"]) || 0;
    if (this.state.searchData["claimraiseddate"]) {
      var rasiedDate = new Date(this.state.searchData["claimraiseddate"]);
      inputParam.claimraiseddate =
        moment(rasiedDate)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.claimraiseddate = "";
    }

    inputParam.taskID = Number(this.state.searchData["taskID"]) || 0;
    inputParam.claimstatus = Number(this.state.searchData["claimstatus"]) || 0;
    inputParam.taskmapped = Number(this.state.searchData["taskmapped"]) || 0;
    inputParam.BrandIDs = this.state.BrandIds || "";
    inputParam.AgentIds = this.state.AgentIds || "";
    var startData = new Date(this.state.start);
    var endDate = new Date(this.state.end);

    inputParam.FromDate =
      moment(startData)
        .format("YYYY-MM-DD")
        .toString() || null;
    inputParam.ToDate =
      moment(endDate)
        .format("YYYY-MM-DD")
        .toString() || null;

    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/GetstoreDashboardListClaim",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var cliamSearchData = response.data.responseData;
        if (message === "Success" && cliamSearchData) {
          var data = response.data.responseData;

          var sortcategoryName = [];
          var sortcreatedByName = [];
          var sortcreationOn = [];
          var sortassignTo = [];
          var sortclaimStatus = [];
          var sortFiltercategoryName = [];
          var sortFiltercreatedByName = [];
          var sortFiltercreationOn = [];
          var sortFilterassignTo = [];
          var sortFilterclaimStatus = [];

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].categoryName] && data[i].categoryName !== "") {
              distinct.push(data[i].categoryName);
              unique[data[i].categoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortcategoryName.push({
                categoryName: distinct[i],
              });
              sortFiltercategoryName.push({
                categoryName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].createdByName] &&
              data[i].createdByName !== ""
            ) {
              distinct.push(data[i].createdByName);
              unique[data[i].createdByName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortcreatedByName.push({
                createdByName: distinct[i],
              });
              sortFiltercreatedByName.push({
                createdByName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].creationOn] && data[i].creationOn !== "") {
              distinct.push(data[i].creationOn);
              unique[data[i].creationOn] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortcreationOn.push({
                creationOn: distinct[i],
              });
              sortFiltercreationOn.push({
                creationOn: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].assignTo] && data[i].assignTo !== "") {
              distinct.push(data[i].assignTo);
              unique[data[i].assignTo] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortassignTo.push({
                assignTo: distinct[i],
              });
              sortFilterassignTo.push({
                assignTo: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].claimStatus] && data[i].claimStatus !== "") {
              distinct.push(data[i].claimStatus);
              unique[data[i].claimStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortclaimStatus.push({
                claimStatus: distinct[i],
              });
              sortFilterclaimStatus.push({
                claimStatus: distinct[i],
              });
            }
          }
          self.setState({
            cliamSearchData,
            cliamCount: cliamSearchData.length,
            isViewSerach: false,
            sortFiltercategoryName,
            sortFiltercreatedByName,
            sortFiltercreationOn,
            sortFilterassignTo,
            sortFilterclaimStatus,
            sortcategoryName,
            sortcreatedByName,
            sortcreationOn,
            sortassignTo,
            sortclaimStatus,
            sortAllData: data,
          });
        } else {
          self.setState({
            cliamSearchData,
            cliamCount: cliamSearchData.length,
            isViewSerach: false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleClaimViewSearch");
      });
  }

  ////handle view search
  handleViewSerach() {
    if (this.state.activeTab == 1) {
      this.handleViewSearchData();
    } else {
      this.handleClaimViewSearch();
    }
  }
  ////handle tab change
  handleTabChange = (tab, e) => {
    this.setState({ activeTab: tab });
    if (tab == 2) {
      this.handleClaimViewSearch();
    }
  };
  ////handle on change in view search
  handleOnChange = (e) => {
    const { name, value } = e.target;
    debugger;
    var searchData = this.state.searchData;
    if (name == "claimID") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "ticketID") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "claimissueType") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "ticketMapped") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "claimsubcat") {
      searchData[name] = value;
      this.setState({ searchData });
      setTimeout(() => {
        this.handleGetIssueType();
      }, 100);
    }
    if (name == "assignTo") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "claimcat") {
      searchData[name] = value;
      this.setState({ searchData });
      setTimeout(() => {
        this.handleGetClaimSubCategory();
      }, 100);
    }
    if (name == "claimraiseddate") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "taskID") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "claimstatus") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "taskmapped") {
      searchData[name] = value;
      this.setState({ searchData });
    }
    if (name == "raisedby") {
      searchData[name] = value;
      this.setState({ searchData });
    }
  };
  handleCliamDateSearchChange = (e) => {
    this.state.searchData["claimraiseddate"] = e;
    this.setState({ searchData: this.state.searchData });
  };
  ////handle row click to redirect with respective page
  handleRowClickredirectPage = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var TaskID = column.original["taskid"];
        var ClaimID = column.original["claimID"];
        if (TaskID !== "") {
          this.handleTaskPageRedirect(TaskID);
        }
      },
    };
  };
  ////handle redirect task page
  handleTaskPageRedirect(ID) {
    this.props.history.push({
      pathname: "editStoreTask",
      state: { TaskID: ID },
    });
  }
  ////handle cliam table row click
  HandleRowClickPage = (rowInfo, column) => {
    debugger;
    return {
      onClick: (e) => {
        var claimID = column.original["claimID"];
        this.handleRedirectToViewStoreClaim(claimID);
      },
    };
  };
  ////hadle redirect to view claim page.
  handleRedirectToViewStoreClaim(claimID) {
    debugger;
    this.props.history.push({
      pathname: "claimApproveReject",
      state: { ClaimID: claimID },
    });
  }
  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var scategoryNameFilterCheckbox = this.state.scategoryNameFilterCheckbox;
    var sclaimStatusFilterCheckbox = this.state.sclaimStatusFilterCheckbox;
    var screationOnFilterCheckbox = this.state.screationOnFilterCheckbox;
    var sassignToFilterCheckbox = this.state.sassignToFilterCheckbox;
    var screatedByNameFilterCheckbox = this.state.screatedByNameFilterCheckbox;

    var sdepartmentFilterCheckbox = this.state.sdepartmentFilterCheckbox;
    var sstoreNameFilterCheckbox = this.state.sstoreNameFilterCheckbox;
    var sassigntoIdFilterCheckbox = this.state.sassigntoIdFilterCheckbox;
    var staskstatusFilterCheckbox = this.state.staskstatusFilterCheckbox;
    var screatedOnFilterCheckbox = this.state.screatedOnFilterCheckbox;

    if (column === "categoryName" || column === "all") {
      if (type === "value" && type !== "All") {
        scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
          "all",
          ""
        );
        scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          scategoryNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          scategoryNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryNameFilterCheckbox.includes("all")) {
          scategoryNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "categoryName") {
            for (let i = 0; i < this.state.sortcategoryName.length; i++) {
              scategoryNameFilterCheckbox +=
                this.state.sortcategoryName[i].categoryName + ",";
            }
            scategoryNameFilterCheckbox += "all";
          }
        }
      }
    }

    if (column === "claimStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sclaimStatusFilterCheckbox = sclaimStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sclaimStatusFilterCheckbox = sclaimStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sclaimStatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sclaimStatusFilterCheckbox = sclaimStatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sclaimStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sclaimStatusFilterCheckbox.includes("all")) {
          sclaimStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "claimStatus") {
            for (let i = 0; i < this.state.sortclaimStatus.length; i++) {
              sclaimStatusFilterCheckbox +=
                this.state.sortclaimStatus[i].claimStatus + ",";
            }
            sclaimStatusFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "creationOn" || column === "all") {
      if (type === "value" && type !== "All") {
        screationOnFilterCheckbox = screationOnFilterCheckbox.replace(
          "all",
          ""
        );
        screationOnFilterCheckbox = screationOnFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          screationOnFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screationOnFilterCheckbox = screationOnFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screationOnFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screationOnFilterCheckbox.includes("all")) {
          screationOnFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "creationOn") {
            for (let i = 0; i < this.state.sortcreationOn.length; i++) {
              screationOnFilterCheckbox +=
                this.state.sortcreationOn[i].creationOn + ",";
            }
            screationOnFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "assignTo" || column === "all") {
      if (type === "value" && type !== "All") {
        sassignToFilterCheckbox = sassignToFilterCheckbox.replace("all", "");
        sassignToFilterCheckbox = sassignToFilterCheckbox.replace("all,", "");
        if (
          sassignToFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sassignToFilterCheckbox = sassignToFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sassignToFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sassignToFilterCheckbox.includes("all")) {
          sassignToFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "assignTo") {
            for (let i = 0; i < this.state.sortassignTo.length; i++) {
              sassignToFilterCheckbox +=
                this.state.sortassignTo[i].assignTo + ",";
            }
            sassignToFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdByName" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByNameFilterCheckbox = screatedByNameFilterCheckbox.replace(
          "all",
          ""
        );
        screatedByNameFilterCheckbox = screatedByNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          screatedByNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedByNameFilterCheckbox = screatedByNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screatedByNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedByNameFilterCheckbox.includes("all")) {
          screatedByNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdByName") {
            for (let i = 0; i < this.state.sortcreatedBy.length; i++) {
              screatedByNameFilterCheckbox +=
                this.state.sortcreatedBy[i].createdByName + ",";
            }
            screatedByNameFilterCheckbox += "all";
          }
        }
      }
    }

    if (column === "department" || column === "all") {
      if (type === "value" && type !== "All") {
        sdepartmentFilterCheckbox = sdepartmentFilterCheckbox.replace(
          "all",
          ""
        );
        sdepartmentFilterCheckbox = sdepartmentFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sdepartmentFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sdepartmentFilterCheckbox = sdepartmentFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdepartmentFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdepartmentFilterCheckbox.includes("all")) {
          sdepartmentFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "department") {
            for (let i = 0; i < this.state.sortdepartment.length; i++) {
              sdepartmentFilterCheckbox +=
                this.state.sortdepartment[i].department + ",";
            }
            sdepartmentFilterCheckbox += "all";
          }
        }
      }
    }

    if (column === "storeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all", "");
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all,", "");
        if (
          sstoreNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sstoreNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstoreNameFilterCheckbox.includes("all")) {
          sstoreNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeName") {
            for (let i = 0; i < this.state.sortstoreName.length; i++) {
              sstoreNameFilterCheckbox +=
                this.state.sortstoreName[i].storeName + ",";
            }
            sstoreNameFilterCheckbox += "all";
          }
        }
      }
    }

    if (column === "assigntoId" || column === "all") {
      if (type === "value" && type !== "All") {
        sassigntoIdFilterCheckbox = sassigntoIdFilterCheckbox.replace(
          "all",
          ""
        );
        sassigntoIdFilterCheckbox = sassigntoIdFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sassigntoIdFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sassigntoIdFilterCheckbox = sassigntoIdFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sassigntoIdFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sassigntoIdFilterCheckbox.includes("all")) {
          sassigntoIdFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "assigntoId") {
            for (let i = 0; i < this.state.sortassigntoId.length; i++) {
              sassigntoIdFilterCheckbox +=
                this.state.sortassigntoId[i].assigntoId + ",";
            }
            sassigntoIdFilterCheckbox += "all";
          }
        }
      }
    }

    if (column === "taskstatus" || column === "all") {
      if (type === "value" && type !== "All") {
        staskstatusFilterCheckbox = staskstatusFilterCheckbox.replace(
          "all",
          ""
        );
        staskstatusFilterCheckbox = staskstatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          staskstatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          staskstatusFilterCheckbox = staskstatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          staskstatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (staskstatusFilterCheckbox.includes("all")) {
          staskstatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "taskstatus") {
            for (let i = 0; i < this.state.sorttaskstatus.length; i++) {
              staskstatusFilterCheckbox +=
                this.state.sorttaskstatus[i].taskstatus + ",";
            }
            staskstatusFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdOn" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace("all", "");
        screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace("all,", "");
        if (
          screatedOnFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screatedOnFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedOnFilterCheckbox.includes("all")) {
          screatedOnFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdOn") {
            for (let i = 0; i < this.state.sortcreatedOn.length; i++) {
              screatedOnFilterCheckbox +=
                this.state.sortcreatedOn[i].createdOn + ",";
            }
            screatedOnFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;
    debugger;
    this.setState({
      scategoryNameFilterCheckbox,
      sclaimStatusFilterCheckbox,
      screationOnFilterCheckbox,
      sassignToFilterCheckbox,
      screatedByNameFilterCheckbox,
      sdepartmentFilterCheckbox,
      sstoreNameFilterCheckbox,
      sassigntoIdFilterCheckbox,
      staskstatusFilterCheckbox,
      screatedOnFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "categoryName") {
      var sItems = scategoryNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.categoryName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "creationOn") {
      var sItems = screationOnFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.creationOn === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      // this.setState({
      //   statusColor: "sort-column",
      // });
    } else if (column === "assignTo") {
      var sItems = sassignToFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.assignTo === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "createdByName") {
      var sItems = screatedByNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdByName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "claimStatus") {
      var sItems = sclaimStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.claimStatus === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "department") {
      var sItems = sdepartmentFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.department === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "storeName") {
      var sItems = sstoreNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "assigntoId") {
      var sItems = sassigntoIdFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.assigntoId === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "taskstatus") {
      var sItems = staskstatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.taskstatus === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
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
    }

    this.setState({
      isATOZ: true,
      tempitemData: itemsArray,
    });
  };
  filteTextChange(e) {
    debugger;
    if (this.state.sortColumn === "categoryName") {
      var sortFiltercategoryName = matchSorter(
        this.state.sortcategoryName,
        e.target.value,
        { keys: ["categoryName"] }
      );
      if (sortFiltercategoryName.length > 0) {
        this.setState({ sortFiltercategoryName });
      } else {
        this.setState({
          sortFiltercategoryName: [],
        });
      }
    }
    if (this.state.sortColumn === "claimStatus") {
      var sortFilterclaimStatus = matchSorter(
        this.state.sortclaimStatus,
        e.target.value,
        { keys: ["claimStatus"] }
      );
      if (sortFilterclaimStatus.length > 0) {
        this.setState({ sortFilterclaimStatus });
      } else {
        this.setState({
          sortFilterclaimStatus: [],
        });
      }
    }
    if (this.state.sortColumn === "createdByName") {
      var sortFiltercreatedByName = matchSorter(
        this.state.sortcreatedByName,
        e.target.value,
        {
          keys: ["createdByName"],
        }
      );
      if (sortFiltercreatedByName.length > 0) {
        this.setState({ sortFiltercreatedByName });
      } else {
        this.setState({
          sortFiltercreatedByName: [],
        });
      }
    }
    if (this.state.sortColumn === "creationOn") {
      var sortFiltercreationOn = matchSorter(
        this.state.sortcreationOn,
        e.target.value,
        {
          keys: ["creationOn"],
        }
      );
      if (sortFiltercreationOn.length > 0) {
        this.setState({ sortFiltercreationOn });
      } else {
        this.setState({
          sortFiltercreationOn: [],
        });
      }
    }
    if (this.state.sortColumn === "assignTo") {
      var sortFilterassignTo = matchSorter(
        this.state.sortassignTo,
        e.target.value,
        {
          keys: ["assignTo"],
        }
      );
      if (sortFilterassignTo.length > 0) {
        this.setState({ sortFilterassignTo });
      } else {
        this.setState({
          sortFilterassignTo: [],
        });
      }
    }

    if (this.state.sortColumn === "department") {
      var sortFilterdepartment = matchSorter(
        this.state.sortdepartment,
        e.target.value,
        {
          keys: ["department"],
        }
      );
      if (sortFilterdepartment.length > 0) {
        this.setState({ sortFilterdepartment });
      } else {
        this.setState({
          sortFilterdepartment: [],
        });
      }
    }
    if (this.state.sortColumn === "storeName") {
      var sortFilterstoreName = matchSorter(
        this.state.sortstoreName,
        e.target.value,
        {
          keys: ["storeName"],
        }
      );
      if (sortFilterstoreName.length > 0) {
        this.setState({ sortFilterstoreName });
      } else {
        this.setState({
          sortFilterstoreName: [],
        });
      }
    }

    if (this.state.sortColumn === "assigntoId") {
      var sortFilterassigntoId = matchSorter(
        this.state.sortassigntoId,
        e.target.value,
        {
          keys: ["assigntoId"],
        }
      );
      if (sortFilterassigntoId.length > 0) {
        this.setState({ sortFilterassigntoId });
      } else {
        this.setState({
          sortFilterassigntoId: [],
        });
      }
    }
    if (this.state.sortColumn === "taskstatus") {
      var sortFiltertaskstatus = matchSorter(
        this.state.sorttaskstatus,
        e.target.value,
        {
          keys: ["taskstatus"],
        }
      );
      if (sortFiltertaskstatus.length > 0) {
        this.setState({ sortFiltertaskstatus });
      } else {
        this.setState({
          sortFiltertaskstatus: [],
        });
      }
    }
    if (this.state.sortColumn === "createdOn") {
      var sortFiltercreatedOn = matchSorter(
        this.state.sortcreatedOn,
        e.target.value,
        {
          keys: ["createdOn"],
        }
      );
      if (sortFiltercreatedOn.length > 0) {
        this.setState({ sortFiltercreatedOn });
      } else {
        this.setState({
          sortFiltercreatedOn: [],
        });
      }
    }
    this.setState({ filterTxtValue: e.target.value });
  }

  handleClearSearch() {
    this.setState({
      scategoryNameFilterCheckbox: "",
      screatedByNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassignToFilterCheckbox: "",
      sclaimStatusFilterCheckbox: "",
      sdepartmentFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      sassigntoIdFilterCheckbox: "",
      staskstatusFilterCheckbox: "",
      screatedOnFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      itemData: [],
    });
    if (this.state.activeTab === 1) {
      this.setState({
        dashboardGridData: this.state.sortAllData,
      });
    } else {
      this.setState({
        cliamSearchData: this.state.sortAllData,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid dash-dropdowns">
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
                    <div id="DateTimeRangeContainerNoMobileMode">
                      <DatePickerComponenet
                        applyCallback={this.applyCallback}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="dash-cntr">
          {this.state.loadingAbove === true ? (
            <div className="loader-icon-cntr loader-icon-cntr-above">
              <div className="loader-icon"></div>
            </div>
          ) : (
            <div className="container-fluid btm-mar store-dash-top storecards">
              <div className="row">
                <div className="col-12 col-xs-6 col-sm-4 col-md-2">
                  <div className="dash-top-cards">
                    <p className="card-head">Task</p>
                    <div className="aside-cont">
                      <div>
                        <span className="card-value">
                          {this.state.graphCount.taskOpen}
                        </span>
                        <small>Open</small>
                      </div>
                      <div>
                        <span className="card-value">
                          {this.state.graphCount.taskDueToday}
                        </span>
                        <small>Due Today</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xs-6 col-sm-4 col-md-2">
                  <div className="dash-top-cards">
                    <p className="card-head">Task</p>
                    <div className="aside-cont">
                      <div>
                        <span className="card-value red-clr">
                          {this.state.graphCount.taskOverDue}
                        </span>
                        <small>Over-due</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xs-6 col-sm-4 col-md-2">
                  <div className="dash-top-cards">
                    <p className="card-head">Claim</p>
                    <div className="aside-cont">
                      <div>
                        <span className="card-value">
                          {this.state.graphCount.claimOpen}
                        </span>
                        <small>Open</small>
                      </div>
                      <div>
                        <span className="card-value">
                          {this.state.graphCount.claimDueToday}
                        </span>
                        <small>Due Today</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xs-6 col-sm-4 col-md-2">
                  <div className="dash-top-cards">
                    <p className="card-head">Claim</p>
                    <span className="card-value red-clr">
                      {this.state.graphCount.claimOverDue}
                    </span>
                    <small>Over-due</small>
                  </div>
                </div>
                <div className="col-12 col-xs-6 col-sm-4 col-md-2">
                  <div className="dash-top-cards">
                    <p className="card-head">Campaign</p>
                    <div className="aside-cont">
                      <div>
                        <span className="card-value">
                          {this.state.graphCount.campaingnOpen}
                        </span>
                        <small>Open</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="container-fluid btm-mar">
            <div className="row">
              <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                <div className="dash-top-cards grapwid">
                  <p className="card-head">Open Task-Department Wise</p>
                  {this.state.DashboardOpenTaskDepartmentWise.length > 0 ? (
                    <TaskDepartment
                      data={this.state.DashboardOpenTaskDepartmentWise}
                    />
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                <div className="dash-top-cards grapwid">
                  <p className="card-head">Task by priority</p>
                  {this.state.DashboardTaskByPriority.length > 0 ? (
                    <TaskByPriority data={this.state.DashboardTaskByPriority} />
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Campaign by type</p>
                  {this.state.DashboardOpenCampaignByType.length > 0 ? (
                    <OpenCompaign
                      data={this.state.DashboardOpenCampaignByType}
                    />
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                <div className="dash-top-cards grapwid">
                  <p className="card-head">Claim Vs Invoice &amp; Article</p>
                  {this.state.DashboardClaimVsInvoiceArticle.length > 0 ? (
                    <ClaimVsInvoice
                      data={this.state.DashboardClaimVsInvoiceArticle}
                    />
                  ) : null}
                </div>
                {this.state.FlagClaimVsInvoiceArticle && (
                  <p>No Data Available</p>
                )}
              </div>
              <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Open Claim Stats</p>
                  {this.state.DashboardOpenClaimStatus.length > 0 ? (
                    <OpenClaim data={this.state.DashboardOpenClaimStatus} />
                  ) : null}
                </div>
                {this.state.FlagOpenClaimStatus && <p>No Data Available</p>}
              </div>
              <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                <div className="dash-top-cards">
                  <p className="card-head">Claim Vs Invoice Amount</p>
                  {this.state.DashboardClaimVsInvoiceAmount.length > 0 ? (
                    <InvoiceAmountPie
                      data={this.state.DashboardClaimVsInvoiceAmount}
                    />
                  ) : null}
                </div>
                {this.state.FlagClaimVsInvoiceAmount && (
                  <p>No Data Available</p>
                )}
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="table-cntr mt-3">
              <div className="store-table-cntr">
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#date-tab"
                              role="tab"
                              aria-controls="date-tab"
                              aria-selected="true"
                              onClick={this.handleTabChange.bind(this, 1)}
                            >
                              Task:{" "}
                              <span className="myTciket-tab-span">
                                {this.state.taskCount}
                              </span>
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
                              onClick={this.handleTabChange.bind(this, 2)}
                            >
                              Claim:
                              <span className="myTciket-tab-span">
                                {this.state.cliamCount < 9
                                  ? "0" + this.state.cliamCount
                                  : this.state.cliamCount}
                              </span>
                            </a>
                          </li>
                          <div className="save-view-search">
                            <button
                              className="btn-inv"
                              type="button"
                              onClick={this.handleViewSerach.bind(this)}
                            >
                              VIEW SEARCH
                            </button>
                          </div>
                        </ul>
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="date-tab"
                            role="tabpanel"
                            aria-labelledby="date-tab"
                          >
                            <div className="container-fluid">
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder="Task ID"
                                    name="task_Id"
                                    value={this.state.task_Id}
                                    onChange={this.hanldetoggleOnChange}
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="claimStatus"
                                    value={this.state.selectDepartment}
                                    onChange={this.handleDropdownOnchange}
                                  >
                                    <option>Department</option>
                                    {this.state.departmentData !== null &&
                                      this.state.departmentData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.departmentID}
                                            className="select-category-placeholder"
                                          >
                                            {item.departmentName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    value={this.state.selectedFuncation}
                                    name="selectedFuncation"
                                    onChange={this.handleDropdownOnchange}
                                  >
                                    <option>Funcation</option>
                                    {this.state.funcationData !== null &&
                                      this.state.funcationData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.functionID}
                                            className="select-category-placeholder"
                                          >
                                            {item.funcationName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    value={this.state.Task_Claim}
                                    name="Task_Claim"
                                    onChange={this.hanldetoggleOnChange}
                                  >
                                    <option value="">Task With Claim</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder="Task Title"
                                    name="task_Title"
                                    value={this.state.task_Title}
                                    onChange={this.hanldetoggleOnChange}
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="selectAssignTo"
                                    value={this.state.selectAssignTo}
                                    onChange={this.handleDropdownOnchange}
                                  >
                                    <option>Assign To</option>
                                    {this.state.assignToData !== null &&
                                      this.state.assignToData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    value={this.state.SelectedCreatedBy}
                                    name="SelectedCreatedBy"
                                    onChange={this.handleDropdownOnchange}
                                  >
                                    <option>Task Created By</option>
                                    {this.state.createdUser !== null &&
                                      this.state.createdUser.map((item, j) => (
                                        <option
                                          key={j}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                {this.state.Task_Claim === "true" ? (
                                  <div className="col-md-3">
                                    <input
                                      type="text"
                                      placeholder="Claim ID"
                                      name="Task_ClaimId"
                                      value={this.state.Task_ClaimId}
                                      onChange={this.hanldetoggleOnChange}
                                      autoComplete="off"
                                    />
                                  </div>
                                ) : null}

                                <div className="col-md-3">
                                  <select
                                    value={this.state.selectedStatus}
                                    name="selectedStatus"
                                    onChange={this.hanldetoggleOnChange}
                                  >
                                    <option value="0">Task Status</option>
                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                        >
                                          {item.storeStatusName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3 campaign-end-date creation-date-range">
                                  <CreationOnDatePickerCompo
                                    applyCallback={this.SearchCreationOn}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    value={this.state.Task_Ticket}
                                    name="Task_Ticket"
                                    onChange={this.hanldetoggleOnChange}
                                  >
                                    <option value="">Task With Ticket</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="selectedPriority"
                                    onChange={this.handleDropdownOnchange}
                                    value={this.state.selectedPriority}
                                  >
                                    <option>Task Priority</option>
                                    {this.state.priorityData !== null &&
                                      this.state.priorityData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.priorityID}
                                          className="select-category-placeholder"
                                        >
                                          {item.priortyName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                {this.state.Task_Ticket === "true" ? (
                                  <div className="col-md-3">
                                    <input
                                      className="no-bg"
                                      type="text"
                                      placeholder="Ticket ID"
                                      name="Task_ticketId"
                                      value={this.state.Task_ticketId}
                                      onChange={this.hanldetoggleOnChange}
                                      autoComplete="off"
                                    />
                                  </div>
                                ) : null}
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
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder="Claim ID"
                                    name="claimID"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["claimID"]}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="claimcat"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={
                                      this.state.searchData["claimcat"] || ""
                                    }
                                  >
                                    <option value={""} selected>
                                      Claim Category
                                    </option>
                                    {this.state.categoryData !== null &&
                                      this.state.categoryData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.categoryID}
                                          className="select-category-placeholder"
                                        >
                                          {item.categoryName}
                                        </option>
                                      ))}
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="claimsubcat"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["claimsubcat"]}
                                  >
                                    <option value={""} selected>
                                      Claim Sub Category
                                    </option>
                                    {this.state.subCategoryData !== null &&
                                      this.state.subCategoryData.map(
                                        (item, i) => {
                                          return (
                                            <option
                                              key={i}
                                              value={item.subCategoryID}
                                            >
                                              {item.subCategoryName}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="claimissueType"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={
                                      this.state.searchData["claimissueType"]
                                    }
                                  >
                                    <option value={""} selected>
                                      Claim Issue Type
                                    </option>
                                    {this.state.issueTypeData !== null &&
                                      this.state.issueTypeData.map(
                                        (item, i) => {
                                          return (
                                            <option value={item.issueTypeID}>
                                              {item.issueTypeName}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <DatePicker
                                    style={{ margin: "0" }}
                                    selected={
                                      this.state.searchData["claimraiseddate"]
                                    }
                                    onChange={this.handleCliamDateSearchChange.bind(
                                      this
                                    )}
                                    name="claimraiseddate"
                                    placeholderText="Claim Raised On"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    value={
                                      this.state.searchData["claimraiseddate"]
                                    }
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="assignTo"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["assignTo"]}
                                  >
                                    <option value={""} selected>
                                      Assign To
                                    </option>
                                    {this.state.userData !== null &&
                                      this.state.userData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    name="raisedby"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["raisedby"]}
                                  >
                                    <option value={""} disabled selected>
                                      Raised By
                                    </option>
                                    {this.state.userData !== null &&
                                      this.state.userData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    name="claimstatus"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["claimstatus"]}
                                  >
                                    <option value={""} selected>
                                      Claim Status
                                    </option>
                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => {
                                        return (
                                          <option
                                            key={i}
                                            value={item.storeStatusID}
                                          >
                                            {item.storeStatusName}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="taskmapped"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["taskmapped"]}
                                  >
                                    <option value={""} selected>
                                      Task Mapped
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    name="ticketMapped"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={
                                      this.state.searchData["ticketMapped"]
                                    }
                                  >
                                    <option value={""} selected>
                                      Ticket Mapped
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                  </select>
                                </div>

                                {this.state.searchData["taskmapped"] == 1 ? (
                                  <div className="col-md-3">
                                    <input
                                      type="text"
                                      placeholder="Task ID"
                                      name="taskID"
                                      value={this.state.searchData["taskID"]}
                                      onChange={this.handleOnChange.bind(this)}
                                      autoComplete="off"
                                    />
                                  </div>
                                ) : null}
                                {this.state.searchData["ticketMapped"] == 1 ? (
                                  <div className="col-md-3">
                                    <input
                                      type="text"
                                      placeholder="Ticket ID"
                                      name="ticketID"
                                      onChange={this.handleOnChange.bind(this)}
                                      value={this.state.searchData["ticketID"]}
                                      autoComplete="off"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div className="table-responsive tickhierpad">
                  {this.state.activeTab === 1 ? (
                    <ReactTable
                      data={this.state.dashboardGridData}
                      columns={[
                        {
                          Header: <span>ID</span>,
                          accessor: "taskid",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Status"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "taskstatus",
                                "Status"
                              )}
                            >
                              Status{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Status"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          accessor: "taskstatus",
                          sortable: false,
                          Cell: (row) => {
                            if (row.original.taskstatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskstatus}</label>
                                </span>
                              );
                            } else if (row.original.taskstatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskstatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskstatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: <span>Task Title</span>,
                          accessor: "tasktitle",
                          sortable: false,
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Department"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "department",
                                "Department"
                              )}
                            >
                              Department{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Department"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          accessor: "department",
                          sortable: false,
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Store Name"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                "Store Name"
                              )}
                            >
                              Store Name{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Store Name"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Creation On"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "createdOn",
                                "Creation On"
                              )}
                            >
                              Creation On{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Creation On"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "createdOn",
                          Cell: (row) => (
                            <span>
                              <label>{row.original.createdOn}</label>

                              <Popover
                                content={
                                  <div className="insertpop1">
                                    <ul className="dash-creation-popup">
                                      <li className="title">
                                        Creation details
                                      </li>
                                      <li>
                                        <p>Created by Naman</p>
                                        <p>2 Hrs ago</p>
                                      </li>
                                      <li>
                                        <p>Assigned to Vikas</p>
                                        <p>1.5 Hrs ago</p>
                                      </li>
                                      <li>
                                        <p>Updated by Vikas</p>
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
                          ),
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Assign to"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "assigntoId",
                                "Assign to"
                              )}
                            >
                              Assign to
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Assign to"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "assigntoId",
                        },
                      ]}
                      // resizable={false}
                      minRows={2}
                      defaultPageSize={10}
                      showPagination={true}
                      getTrProps={this.handleRowClickredirectPage}
                    />
                  ) : this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.cliamSearchData}
                      columns={[
                        {
                          Header: <span>ID</span>,
                          accessor: "claimID",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Status"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "claimStatus",
                                "Status"
                              )}
                            >
                              Status{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Status"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "claimStatus",
                          Cell: (row) => {
                            if (row.original.claimStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.claimStatus}</label>
                                </span>
                              );
                            } else if (row.original.claimStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.claimStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.claimStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: <span>Claim Issue Type</span>,
                          accessor: "issueTypeName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Category"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "categoryName",
                                "Category"
                              )}
                            >
                              Category{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Category"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          accessor: "categoryName",
                          sortable: false,
                          Cell: (row) => {
                            return (
                              <>
                                {row.original.categoryName}
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <div>
                                        <b>
                                          <p className="title">Category</p>
                                        </b>
                                        <p className="sub-title">
                                          {row.original.categoryName}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">Sub Category</p>
                                        </b>
                                        <p className="sub-title">
                                          {row.original.subCategoryName}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">Type</p>
                                        </b>
                                        <p className="sub-title">
                                          {row.original.issueTypeName}
                                        </p>
                                      </div>
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
                              </>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Created By"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "createdByName",
                                "Created By"
                              )}
                            >
                              Created By{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Created By"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "createdByName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Creation On"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                "Creation On"
                              )}
                            >
                              Creation On{" "}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Creation On"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          accessor: "creationOn",
                          sortable: false,
                          Cell: (row) => (
                            <span>
                              <label>{row.original.creationOn}</label>

                              <Popover
                                content={
                                  <div className="insertpop1">
                                    <ul className="dash-creation-popup">
                                      <li className="title">
                                        Creation details
                                      </li>
                                      <li>
                                        <p>
                                          {"Created by " +
                                            row.original.createdByName}
                                        </p>
                                        <p>2 Hrs ago</p>
                                      </li>
                                      <li>
                                        <p>
                                          Assigned to {row.original.assignTo}
                                        </p>
                                        <p>1.5 Hrs ago</p>
                                      </li>
                                      <li>
                                        <p>Updated by Vikas</p>
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
                          ),
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Assign to"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "assignTo",
                                "Assign to"
                              )}
                            >
                              Assign to
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Assign to"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "assignTo",
                        },
                      ]}
                      // resizable={false}
                      minRows={2}
                      defaultPageSize={10}
                      showPagination={true}
                      getTrProps={this.HandleRowClickPage}
                    />
                  )}

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
                      <a
                        style={{
                          margin: "0 25px",
                          textDecoration: "underline",
                          color: "#2561A8",
                          cursor: "pointer",
                        }}
                        onClick={this.handleClearSearch.bind(this)}
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
                                this.state.scategoryNameFilterCheckbox.includes(
                                  "all"
                                ) ||
                                this.state.sclaimStatusFilterCheckbox.includes(
                                  "all"
                                ) ||
                                this.state.screatedByNameFilterCheckbox.includes(
                                  "all"
                                ) ||
                                this.state.screationOnFilterCheckbox.includes(
                                  "all"
                                ) ||
                                this.state.sassignToFilterCheckbox.includes(
                                  "all"
                                )
                              }
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "all"
                              )}
                            />
                            <label htmlFor={"fil-open"}>
                              <span className="table-btn table-blue-btn">
                                ALL
                              </span>
                            </label>
                          </div>
                          {this.state.sortColumn === "categoryName"
                            ? this.state.sortFiltercategoryName !== null &&
                              this.state.sortFiltercategoryName.map(
                                (item, i) => (
                                  <div className="filter-checkbox">
                                    <input
                                      type="checkbox"
                                      name="filter-type"
                                      id={"fil-open" + item.categoryName}
                                      value={item.categoryName}
                                      checked={this.state.scategoryNameFilterCheckbox
                                        .split(",")
                                        .find(
                                          (word) => word === item.categoryName
                                        )}
                                      onChange={this.setSortCheckStatus.bind(
                                        this,
                                        "categoryName",
                                        "value"
                                      )}
                                    />
                                    <label
                                      htmlFor={"fil-open" + item.categoryName}
                                    >
                                      <span className="table-btn table-blue-btn">
                                        {item.categoryName}
                                      </span>
                                    </label>
                                  </div>
                                )
                              )
                            : null}

                          {this.state.sortColumn === "claimStatus"
                            ? this.state.sortFilterclaimStatus !== null &&
                              this.state.sortFilterclaimStatus.map(
                                (item, i) => (
                                  <div className="filter-checkbox">
                                    <input
                                      type="checkbox"
                                      name="filter-type"
                                      id={"fil-open" + item.claimStatus}
                                      value={item.claimStatus}
                                      checked={this.state.sclaimStatusFilterCheckbox
                                        .split(",")
                                        .find(
                                          (word) => word === item.claimStatus
                                        )}
                                      onChange={this.setSortCheckStatus.bind(
                                        this,
                                        "claimStatus",
                                        "value"
                                      )}
                                    />
                                    <label
                                      htmlFor={"fil-open" + item.claimStatus}
                                    >
                                      <span className="table-btn table-blue-btn">
                                        {item.claimStatus}
                                      </span>
                                    </label>
                                  </div>
                                )
                              )
                            : null}

                          {this.state.sortColumn === "createdByName"
                            ? this.state.sortFiltercreatedByName !== null &&
                              this.state.sortFiltercreatedByName.map(
                                (item, i) => (
                                  <div className="filter-checkbox">
                                    <input
                                      type="checkbox"
                                      name="filter-type"
                                      id={"fil-open" + item.createdByName}
                                      value={item.createdByName}
                                      checked={this.state.screatedByNameFilterCheckbox
                                        .split(",")
                                        .find(
                                          (word) => word === item.createdByName
                                        )}
                                      onChange={this.setSortCheckStatus.bind(
                                        this,
                                        "createdByName",
                                        "value"
                                      )}
                                    />
                                    <label
                                      htmlFor={"fil-open" + item.createdByName}
                                    >
                                      <span className="table-btn table-blue-btn">
                                        {item.createdByName}
                                      </span>
                                    </label>
                                  </div>
                                )
                              )
                            : null}

                          {this.state.sortColumn === "creationOn"
                            ? this.state.sortFiltercreationOn !== null &&
                              this.state.sortFiltercreationOn.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.creationOn}
                                    value={item.creationOn}
                                    checked={this.state.screationOnFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.creationOn)}
                                    onChange={this.setSortCheckStatus.bind(
                                      this,
                                      "creationOn",
                                      "value"
                                    )}
                                  />
                                  <label htmlFor={"fil-open" + item.creationOn}>
                                    <span className="table-btn table-blue-btn">
                                      {item.creationOn}
                                    </span>
                                  </label>
                                </div>
                              ))
                            : null}
                          {this.state.sortColumn === "assignTo"
                            ? this.state.sortFilterassignTo !== null &&
                              this.state.sortFilterassignTo.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.assignTo}
                                    value={item.assignTo}
                                    checked={this.state.sassignToFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.assignTo)}
                                    onChange={this.setSortCheckStatus.bind(
                                      this,
                                      "assignTo",
                                      "value"
                                    )}
                                  />
                                  <label htmlFor={"fil-open" + item.assignTo}>
                                    <span className="table-btn table-blue-btn">
                                      {item.assignTo}
                                    </span>
                                  </label>
                                </div>
                              ))
                            : null}

                          {this.state.sortColumn === "department"
                            ? this.state.sortFilterdepartment !== null &&
                              this.state.sortFilterdepartment.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.department}
                                    value={item.department}
                                    checked={this.state.sdepartmentFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.department)}
                                    onChange={this.setSortCheckStatus.bind(
                                      this,
                                      "department",
                                      "value"
                                    )}
                                  />
                                  <label htmlFor={"fil-open" + item.department}>
                                    <span className="table-btn table-blue-btn">
                                      {item.department}
                                    </span>
                                  </label>
                                </div>
                              ))
                            : null}
                          {this.state.sortColumn === "storeName"
                            ? this.state.sortFilterstoreName !== null &&
                              this.state.sortFilterstoreName.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.storeName}
                                    value={item.storeName}
                                    checked={this.state.sstoreNameFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.storeName)}
                                    onChange={this.setSortCheckStatus.bind(
                                      this,
                                      "storeName",
                                      "value"
                                    )}
                                  />
                                  <label htmlFor={"fil-open" + item.storeName}>
                                    <span className="table-btn table-blue-btn">
                                      {item.storeName}
                                    </span>
                                  </label>
                                </div>
                              ))
                            : null}
                          {this.state.sortColumn === "assigntoId"
                            ? this.state.sortFilterassigntoId !== null &&
                              this.state.sortFilterassigntoId.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.assigntoId}
                                    value={item.assigntoId}
                                    checked={this.state.sassigntoIdFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.assigntoId)}
                                    onChange={this.setSortCheckStatus.bind(
                                      this,
                                      "assigntoId",
                                      "value"
                                    )}
                                  />
                                  <label htmlFor={"fil-open" + item.assigntoId}>
                                    <span className="table-btn table-blue-btn">
                                      {item.assigntoId}
                                    </span>
                                  </label>
                                </div>
                              ))
                            : null}
                          {this.state.sortColumn === "taskstatus"
                            ? this.state.sortFiltertaskstatus !== null &&
                              this.state.sortFiltertaskstatus.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.taskstatus}
                                    value={item.taskstatus}
                                    checked={this.state.staskstatusFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.taskstatus)}
                                    onChange={this.setSortCheckStatus.bind(
                                      this,
                                      "taskstatus",
                                      "value"
                                    )}
                                  />
                                  <label htmlFor={"fil-open" + item.taskstatus}>
                                    <span className="table-btn table-blue-btn">
                                      {item.taskstatus}
                                    </span>
                                  </label>
                                </div>
                              ))
                            : null}
                          {this.state.sortColumn === "createdOn"
                            ? this.state.sortFiltercreatedOn !== null &&
                              this.state.sortFiltercreatedOn.map((item, i) => (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    name="filter-type"
                                    id={"fil-open" + item.createdOn}
                                    value={item.createdOn}
                                    checked={this.state.screatedOnFilterCheckbox
                                      .split(",")
                                      .find((word) => word === item.createdOn)}
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
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>

                <div
                  className="float-search"
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>Search</small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default StoreDashboard;
