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
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
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
  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
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
    if (name === "departmentName") {
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

    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/getstoreDashboardList",
      headers: authHeader(),
      data: {
        taskid: parseInt(this.state.task_Id),
        Department: this.state.selectDepartment,
        tasktitle: this.state.task_Title,
        taskstatus: this.state.selectedStatus,
        ticketID: this.state.Task_ticketId,
        functionID: this.state.selectedFuncation,
        CreatedOnFrom: fromDate,
        CreatedOnTo: toDate,
        AssigntoId: this.state.selectAssignTo,
        Priority: this.state.selectedPriority,
        taskwithTicket: this.state.Task_Ticket,
        taskwithClaim: this.state.Task_Claim,
        claimID: parseInt(this.state.Task_ClaimId),
        createdID: this.state.SelectedCreatedBy,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ dashboardGridData: data, taskCount: data.length });
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

    debugger;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/GetstoreDashboardListClaim",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        debugger;
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
    debugger;
    this.state.searchData["claimraiseddate"] = e;
    this.setState({ searchData: this.state.searchData });
  };

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
                              <span className="myTciket-tab-span">05</span>
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
                                    name="departmentName"
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
                                    name="ticketMapped"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={
                                      this.state.searchData["ticketMapped"]
                                    }
                                  >
                                    <option value={""} disabled selected>
                                      Ticket Mapped
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    name="claimcat"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={
                                      this.state.searchData["claimcat"] || ""
                                    }
                                  >
                                    <option value={""} disabled selected>
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
                                    name="claimstatus"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["claimstatus"]}
                                  >
                                    <option value={""} disabled selected>
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
                                {this.state.searchData["ticketMapped"] == 1 ? (
                                  <div className="col-md-3">
                                    <input
                                      type="text"
                                      placeholder="Ticket ID"
                                      name="ticketID"
                                      onChange={this.handleOnChange.bind(this)}
                                      value={this.state.searchData["ticketID"]}
                                    />
                                  </div>
                                ) : null}
                                <div className="col-md-3">
                                  <select
                                    name="claimsubcat"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["claimsubcat"]}
                                  >
                                    <option value={""} disabled selected>
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
                                    name="taskmapped"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["taskmapped"]}
                                  >
                                    <option value={""} disabled selected>
                                      Task Mapped
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
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
                                    <option value={""} disabled selected>
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
                                  <select
                                    name="assignTo"
                                    onChange={this.handleOnChange.bind(this)}
                                    value={this.state.searchData["assignTo"]}
                                  >
                                    <option value={""} disabled selected>
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
                                {this.state.searchData["taskmapped"] == 1 ? (
                                  <div className="col-md-3">
                                    <input
                                      type="text"
                                      placeholder="Task ID"
                                      name="taskID"
                                      value={this.state.searchData["taskID"]}
                                      onChange={this.handleOnChange.bind(this)}
                                    />
                                  </div>
                                ) : null}
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div className="table-responsive tickhierpad">
                  <ReactTable
                    data={this.state.dashboardGridData}
                    columns={[
                      {
                        Header: <span>ID</span>,
                        accessor: "taskid",
                      },
                      {
                        Header: (
                          <span onClick={this.StatusOpenModel}>
                            Status <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "taskstatus",
                        Cell: (row) => {
                          return (
                            <span className="table-btn table-blue-btn">
                              <label>{row.original.taskstatus}</label>
                            </span>
                          );
                        },
                      },
                      {
                        Header: <span>Task Title</span>,
                        accessor: "tasktitle",
                      },
                      {
                        Header: (
                          <span>
                            Department <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "department",
                      },
                      {
                        Header: (
                          <span>
                            Store Name <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeName",
                      },
                      {
                        Header: (
                          <span>
                            Creation On <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdOn",
                        Cell: (row) => (
                          <span>
                            <label>{row.original.createdOn}</label>

                            <Popover
                              content={
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
                          <span>
                            Assign to
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "assigntoId",
                      },
                    ]}
                    // resizable={false}
                    minRows={2}
                    defaultPageSize={10}
                    showPagination={true}
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
                          <input
                            type="checkbox"
                            id="fil-open"
                            name="filter-type"
                          />
                          <label htmlFor="fil-open">
                            <span className="table-btn table-blue-btn">
                              Open
                            </span>
                          </label>
                        </div>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-new"
                            name="filter-type"
                          />
                          <label htmlFor="fil-new">
                            <span className="table-btn table-yellow-btn">
                              New
                            </span>
                          </label>
                        </div>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-solved"
                            name="filter-type"
                          />
                          <label htmlFor="fil-solved">
                            <span className="table-btn table-green-btn">
                              Solved
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="filter-type filter-color">
                        <p>FILTER BY COLOR</p>
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="fil-red"
                            name="filter-color"
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
