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
import moment from "moment";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader.js";

class StoreDashboard extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let end = moment(start).add(30, "days");
    let creationStart = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(30, "days");
    let creationEnd = moment(creationStart).add(30, "days");
    this.state = {
      FilterCollapse: false,
      StatusModel: false,
      start: start,
      end: end,
      creationStart: creationStart,
      creationEnd: creationEnd,
      dashboardGridData: [],
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
      priorityData: [],
      graphCount: {},
      loadingAbove: true,
      task_Id: "",
      Task_Claim: "",
      Task_ClaimId: "",
      Task_Ticket: "",
      task_Title: "",
      task_status: "",
      claim_Id: "",
      DashboardOpenTaskDepartmentWise: [],
      DashboardTaskByPriority: [],
      DashboardOpenCampaignByType: [],
      DashboardClaimVsInvoiceArticle: [],
      DashboardOpenClaimStatus: [],
      DashboardClaimVsInvoiceAmount: [],
      FlagClaimVsInvoiceArticle: false,
      FlagOpenClaimStatus: false,
      FlagClaimVsInvoiceAmount: false,
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
    // this.handleGetDashboardGraphCount();
  }
  handleFilterCollapse() {
    this.setState((state) => ({ FilterCollapse: !state.FilterCollapse }));
    this.handleGetDepartmentDropdown();
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
  handleViewSearchData() {
    debugger;
    let self = this;
    var taskId = "";
    if (this.state.task_Id !== "") {
      taskId = this.state.task_Id;
    } else {
      taskId = "0";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/getstoreDashboardList",
      headers: authHeader(),
      data: {
        taskid: parseInt(taskId),
        Department: this.state.selectDepartment,
        tasktitle: this.state.task_Title,
        taskstatus: this.state.task_status,
        ticketID: 0,
        functionID: this.state.selectedFuncation,
        AssigntoId: 0,
        taskwithTicket: this.state.Task_Ticket,
        taskwithClaim: this.state.Task_Claim,
        claimID: this.state.Task_ClaimId,
        Priority: 0,
      },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ dashboardGridData: data });
        } else {
          self.setState({ dashboardGridData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  render() {
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

    const dataStDash = [
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata1</label>,
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata2</label>,
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata3</label>,
      },

      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Wifi is not working from 5 Hrs</label>,
        DeptName: (
          <span>
            <label>Internet</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata1</label>,
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>Open</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Hardware</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata2</label>,
      },
      {
        statusNew: (
          <span className="table-btn table-green-btn">
            <label>Solved</label>
          </span>
        ),
        TaskTitle: <label>Store door are not working</label>,
        DeptName: (
          <span>
            <label>Supply</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata3</label>,
      },
      {
        statusNew: (
          <span className="table-btn table-blue-btn">
            <label>open</label>
          </span>
        ),
        TaskTitle: <label>Supplies are not coming on time</label>,
        DeptName: (
          <span>
            <label>Hardwares</label>
            <Popover content={DefArti} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        StName: <label>Bata3</label>,
      },
    ];

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
                            >
                              Task:{" "}
                              <span className="myTciket-tab-span">06</span>
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
                            >
                              Claim:
                              <span className="myTciket-tab-span">05</span>
                            </a>
                          </li>
                          <div className="save-view-search">
                            <button
                              className="btn-inv"
                              type="button"
                              onClick={this.handleViewSearchData.bind(this)}
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
                                  <select>
                                    <option>Task Created By</option>
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
                                  {/* <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Task Status"
                                    name="task_status"
                                    value={this.state.task_status}
                                    onChange={this.hanldetoggleOnChange}
                                    autoComplete="off"
                                  /> */}
                                  <select>
                                    <option>Task Status</option>
                                  </select>
                                </div>
                                <div className="col-md-3 campaign-end-date creation-date-range">
                                  <DatePickerComponenet
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
                                    name="claim_Id"
                                    value={this.state.claim_Id}
                                    onChange={this.hanldetoggleOnChange}
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    value={this.state.claimTicket_mapped}
                                    name="claimTicket_mapped"
                                    onChange={this.hanldetoggleOnChange}
                                  >
                                    <option value="">Ticket Mapped</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Category</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Status</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" placeholder="Title ID" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Sub Category</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Raised On</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Task Mapped(Yes-No)</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Claim Issue Type</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Assign To</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" placeholder="Task ID" />
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Raised By</option>
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
