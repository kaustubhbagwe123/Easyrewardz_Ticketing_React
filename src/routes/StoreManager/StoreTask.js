import React, { Component } from "react";
import Campaign from "./Campaign";
import InfoIcon from "../../assets/Images/info-icon.png";
import Demo from "../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import Modal from "react-responsive-modal";
import Sorting from "./../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { Collapse, CardBody, Card } from "reactstrap";
import SearchIcon from "../../assets/Images/search-icon.png";
import CreationOnDatePickerCompo from "./../Settings/Store/CreationDatePickerCompo";
import StoreStatus from "./StoreStatus.js";
import moment from "moment";
class StoreTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raisedByMeData: [],
      assignToMeData: [],
      taskByTicketData: [],
      campaignData: [],
      isloading: false,
      sortAllData: [],
      sdepartmentNameFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      spriorityNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassigntoFilterCheckbox: "",
      screatedByFilterCheckbox: "",

      sortFilterdepartmentName: [],
      sortFilterstoreName: [],
      sortFilterpriorityName: [],
      sortFiltercreationOn: [],
      sortFilterassignto: [],
      sortFiltercreatedBy: [],

      sortdepartmentName: [],
      sortstoreName: [],
      sortpriorityName: [],
      sortcreationOn: [],
      sortassignto: [],
      sortcreatedBy: [],

      sortColumn: "",
      sortHeader: "",
      filterTxtValue: "",
      isortA: false,
      tempitemData: [],
      tabIndex: 1,
      showAddTask: true,
      FilterCollapse: false,

      priorityData: [],
      assignToData: [],
      funcationData: [],
      departmentData: [],
      assignSearchData: {},
      raiseSearchData: {},
      ticketSearchData: {},
      storeStatus: StoreStatus(),
      userData: [],
      isViewSerach: false,
    };
    this.handleGetTaskData = this.handleGetTaskData.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }

  componentDidMount() {
    this.handleGetTaskData(1);
    this.handleGetDepartment();
    this.handleGetPriorityList();
    this.handleGetStoreUser();
  }
  handleChangeStoreTask() {
    this.props.history.push("/store/editStoreTask");
  }
  handleChangeTaskByTicket() {
    this.props.history.push("/store/storeTaskByTicket");
  }
  handleChagneAddTask() {
    this.props.history.push("storeAddTask");
  }

  ////handle row click raised by me table
  handleRowClickRaisedTable = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var storeTaskID = column.original["storeTaskID"];
        this.handleRedirectToEditStoreTask(storeTaskID);
      },
    };
  };
  ////handle redirect to edit store task
  handleRedirectToEditStoreTask(storeTaskID) {
    debugger;
    this.props.history.push({
      pathname: "editStoreTask",
      state: { TaskID: storeTaskID },
    });
  }
  HandleRowTaskByClickPage = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var storeTaskID = column.original["storeTaskID"];
        var ticketid = column.original["ticketID"];
        this.handleRedirectToStoreTaskByTicket(storeTaskID, ticketid);
      },
    };
  };
  ////handle redirect to store Task By Ticket
  handleRedirectToStoreTaskByTicket(storeTaskID, ticketid) {
    debugger;
    this.props.history.push({
      pathname: "/store/storeTaskByTicket",
      state: { TaskID: storeTaskID, TicketID: ticketid },
    });
  }
  ////handle get task data by tab click
  handleGetTaskData(tabFor) {
    debugger;
    if (tabFor === 4) {
      this.setState({
        showAddTask: false,
      });
    } else {
      this.setState({
        showAddTask: true,
      });
    }
    if (tabFor !== 4) {
      this.setState({
        FilterCollapse: false,
        isloading: true,
        raiseSearchData: {},
        assignSearchData: {},
        ticketSearchData: {},
        sdepartmentNameFilterCheckbox: "",
        sstoreNameFilterCheckbox: "",
        spriorityNameFilterCheckbox: "",
        screationOnFilterCheckbox: "",
        sassigntoFilterCheckbox: "",
        screatedByFilterCheckbox: "",

        sortFilterdepartmentName: [],
        sortFilterstoreName: [],
        sortFilterpriorityName: [],
        sortFiltercreationOn: [],
        sortFilterassignto: [],
        sortFiltercreatedBy: [],

        sortdepartmentName: [],
        sortstoreName: [],
        sortpriorityName: [],
        sortcreationOn: [],
        sortassignto: [],
        sortcreatedBy: [],
      });
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreTask/GetStoreTaskList",
        headers: authHeader(),
        params: { tabFor: tabFor },
      })
        .then(function(response) {
          debugger;
          var message = response.data.message;
          var data = response.data.responseData;
          if (message === "Success" && data.length > 0) {
            if (tabFor === 1) {
              self.setState({
                raisedByMeData: data,
                isloading: false,
                tabIndex: tabFor,
              });
              self.state.sortAllData = data;
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].departmentName] &&
                  data[i].departmentName !== ""
                ) {
                  distinct.push(data[i].departmentName);
                  unique[data[i].departmentName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortdepartmentName.push({
                  departmentName: distinct[i],
                });
                self.state.sortFilterdepartmentName.push({
                  departmentName: distinct[i],
                });
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].storeName] && data[i].storeName !== "") {
                  distinct.push(data[i].storeName);
                  unique[data[i].storeName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortstoreName.push({ storeName: distinct[i] });
                self.state.sortFilterstoreName.push({ storeName: distinct[i] });
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].priorityName] &&
                  data[i].priorityName !== ""
                ) {
                  distinct.push(data[i].priorityName);
                  unique[data[i].priorityName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortpriorityName.push({ priorityName: distinct[i] });
                self.state.sortFilterpriorityName.push({
                  priorityName: distinct[i],
                });
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
                self.state.sortcreationOn.push({
                  creationOn: distinct[i],
                });
                self.state.sortFiltercreationOn.push({
                  creationOn: distinct[i],
                });
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].assignto] && data[i].assignto !== "") {
                  distinct.push(data[i].assignto);
                  unique[data[i].assignto] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortassignto.push({ assignto: distinct[i] });
                self.state.sortFilterassignto.push({
                  assignto: distinct[i],
                });
              }
            }
            if (tabFor === 2) {
              self.setState({
                assignToMeData: data,
                isloading: false,
                tabIndex: tabFor,
              });
              self.state.sortAllData = data;
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].departmentName] &&
                  data[i].departmentName !== ""
                ) {
                  distinct.push(data[i].departmentName);
                  unique[data[i].departmentName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortdepartmentName.push({
                  departmentName: distinct[i],
                });
                self.state.sortFilterdepartmentName.push({
                  departmentName: distinct[i],
                });
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].storeName] && data[i].storeName !== "") {
                  distinct.push(data[i].storeName);
                  unique[data[i].storeName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortstoreName.push({ storeName: distinct[i] });
                self.state.sortFilterstoreName.push({ storeName: distinct[i] });
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].priorityName] &&
                  data[i].priorityName !== ""
                ) {
                  distinct.push(data[i].priorityName);
                  unique[data[i].priorityName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortpriorityName.push({ priorityName: distinct[i] });
                self.state.sortFilterpriorityName.push({
                  priorityName: distinct[i],
                });
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
                self.state.sortcreationOn.push({
                  creationOn: distinct[i],
                });
                self.state.sortFiltercreationOn.push({
                  creationOn: distinct[i],
                });
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].createdBy] && data[i].createdBy !== "") {
                  distinct.push(data[i].createdBy);
                  unique[data[i].createdBy] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortcreatedBy.push({ createdBy: distinct[i] });
                self.state.sortFiltercreatedBy.push({
                  createdBy: distinct[i],
                });
              }
            }
          } else {
            if (tabFor === 1) {
              self.setState({ raisedByMeData: data, isloading: false });
            }
            if (tabFor === 2) {
              self.setState({ assignToMeData: data, isloading: false });
            }
          }
        })
        .catch((response) => {
          self.setState({ isloading: false });
          console.log(response, "---handleGetTaskData");
        });
    }
  }

  handleGetTaskbyTicket() {
    this.setState({
      showAddTask: true,
      tabIndex: 3,
      isloading: true,
      FilterCollapse: false,
      raiseSearchData: {},
      assignSearchData: {},
      ticketSearchData: {},
      sdepartmentNameFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      spriorityNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassigntoFilterCheckbox: "",
      screatedByFilterCheckbox: "",

      sortFilterdepartmentName: [],
      sortFilterstoreName: [],
      sortFilterpriorityName: [],
      sortFiltercreationOn: [],
      sortFilterassignto: [],
      sortFiltercreatedBy: [],

      sortdepartmentName: [],
      sortstoreName: [],
      sortpriorityName: [],
      sortcreationOn: [],
      sortassignto: [],
      sortcreatedBy: [],
    });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskByTicket",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;
        if (message == "Success" && data.length > 0) {
          self.setState({
            isloading: false,
            taskByTicketData: data,
          });
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].departmentName] &&
              data[i].departmentName !== ""
            ) {
              distinct.push(data[i].departmentName);
              unique[data[i].departmentName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortdepartmentName.push({
              departmentName: distinct[i],
            });
            self.state.sortFilterdepartmentName.push({
              departmentName: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].storeName] && data[i].storeName !== "") {
              distinct.push(data[i].storeName);
              unique[data[i].storeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortstoreName.push({
              storeName: distinct[i],
            });
            self.state.sortFilterstoreName.push({
              storeName: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy] && data[i].createdBy !== "") {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortcreatedBy.push({
              createdBy: distinct[i],
            });
            self.state.sortFiltercreatedBy.push({
              createdBy: distinct[i],
            });
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
            self.state.sortcreationOn.push({
              creationOn: distinct[i],
            });
            self.state.sortFiltercreationOn.push({
              creationOn: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].assignto] && data[i].assignto !== "") {
              distinct.push(data[i].assignto);
              unique[data[i].assignto] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortassignto.push({
              assignto: distinct[i],
            });
            self.state.sortFilterassignto.push({
              assignto: distinct[i],
            });
          }
        } else {
          self.setState({ isloading: false, data });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskbyTicket");
      });
  }

  ///handle Get Department list
  handleGetDepartment() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(response) {
        debugger;
        let status = response.data.message;
        let data = response.data.responseData;
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
      .catch((response) => {
        console.log(response, "---handleGetDepartment");
      });
  }
  /// Get Funcation list by Department Id for dropdown
  handleGetFuncationByDepartmentId() {
    var departmentId = 0;
    if (this.state.tabIndex === 1) {
      departmentId = this.state.raiseSearchData["Department"];
    }
    if (this.state.tabIndex === 2) {
      departmentId = this.state.assignSearchData["Department"];
    }
    if (this.state.tabIndex === 3) {
      departmentId = this.state.ticketSearchData["Department"];
    }

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: { DepartmentId: departmentId },
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
        console.log(response, "---handleGetFuncationByDepartmentId");
      });
  }
  //// Get Assign to list by funcation id
  handleGetAssignTobyFuncationId() {
    var funcationID = 0;
    if (this.state.tabIndex === 1) {
      funcationID = this.state.raiseSearchData["functionID"];
    }
    if (this.state.tabIndex === 2) {
      funcationID = this.state.assignSearchData["functionID"];
    }
    if (this.state.tabIndex === 3) {
      funcationID = this.state.ticketSearchData["functionID"];
    }
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssignedTo",
      headers: authHeader(),
      params: {
        Function_ID: funcationID,
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
        console.log(response, "---handleGetAssignTobyFuncationId");
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
        console.log(response, "---handleGetPriorityList");
      });
  }
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
  ////handle get assign by me search filter
  handleGetAssigenBymefilterData() {
    debugger;
    let self = this;

    var inputParam = {};

    inputParam.taskid = this.state.assignSearchData["taskid"] || 0;
    inputParam.Department = this.state.assignSearchData["Department"] || 0;
    inputParam.tasktitle = this.state.assignSearchData["tasktitle"] || "";
    inputParam.taskstatus = this.state.assignSearchData["taskstatus"] || 0;
    inputParam.functionID = this.state.assignSearchData["functionID"] || 0;
    if (this.state.assignSearchData["CreatedOnFrom"]) {
      var start = new Date(this.state.assignSearchData["CreatedOnFrom"]);
      inputParam.CreatedOnFrom =
        moment(start)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnFrom = null;
    }
    if (this.state.assignSearchData["CreatedOnTo"]) {
      var end = new Date(this.state.assignSearchData["CreatedOnTo"]);
      inputParam.CreatedOnTo =
        moment(end)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnTo = null;
    }

    inputParam.AssigntoId = 0; //this.state.raiseSearchData["AssigntoId"] || 0;
    inputParam.createdID = this.state.assignSearchData["createdID"] || 0;
    inputParam.Priority = this.state.assignSearchData["Priority"] || 0;
    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssigenBymefilterData",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var assignToMeData = response.data.responseData;
        if (message === "Success" && assignToMeData) {
          self.setState({ assignToMeData, isViewSerach: false });
        } else {
          self.setState({ assignToMeData, isViewSerach: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAssigenBymefilterData");
      });
  }
  ////handle get raise by me search filter
  handleGetRaisedbymefilterData() {
    let self = this;
    debugger;
    var inputParam = {};

    inputParam.taskid = this.state.raiseSearchData["taskid"] || 0;
    inputParam.Department = this.state.raiseSearchData["Department"] || 0;
    inputParam.tasktitle = this.state.raiseSearchData["tasktitle"] || "";
    inputParam.taskstatus = this.state.raiseSearchData["taskstatus"] || 0;
    inputParam.functionID = this.state.raiseSearchData["functionID"] || 0;
    if (this.state.raiseSearchData["CreatedOnFrom"]) {
      var start = new Date(this.state.raiseSearchData["CreatedOnFrom"]);
      inputParam.CreatedOnFrom =
        moment(start)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnFrom = null;
    }
    if (this.state.raiseSearchData["CreatedOnTo"]) {
      var end = new Date(this.state.raiseSearchData["CreatedOnTo"]);
      inputParam.CreatedOnTo =
        moment(end)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnTo = null;
    }

    inputParam.AssigntoId = this.state.raiseSearchData["AssigntoId"] || 0;
    inputParam.createdID = 0; //this.state.raiseSearchData["createdID"] || 0;
    inputParam.Priority = this.state.raiseSearchData["Priority"] || 0;
    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetRaisedbymefilterData",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var raisedByMeData = response.data.responseData;
        if (message === "Success" && raisedByMeData) {
          self.setState({ raisedByMeData, isViewSerach: false });
        } else {
          self.setState({ raisedByMeData, isViewSerach: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetRaisedbymefilterData");
      });
  }
  handleGetTaskbyTicketData() {
    let self = this;
    debugger;
    var inputParam = {};

    inputParam.taskid = this.state.ticketSearchData["taskid"] || 0;
    inputParam.Department = this.state.ticketSearchData["Department"] || 0;
    inputParam.tasktitle = this.state.ticketSearchData["tasktitle"] || "";
    inputParam.taskstatus = this.state.ticketSearchData["taskstatus"] || 0;
    inputParam.functionID = this.state.ticketSearchData["functionID"] || 0;
    inputParam.AssigntoId = this.state.ticketSearchData["AssigntoId"] || 0;
    if (this.state.ticketSearchData["CreatedOnFrom"]) {
      var start = new Date(this.state.ticketSearchData["CreatedOnFrom"]);
      inputParam.CreatedOnFrom =
        moment(start)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnFrom = null;
    }
    if (this.state.ticketSearchData["CreatedOnTo"]) {
      var end = new Date(this.state.ticketSearchData["CreatedOnTo"]);
      inputParam.CreatedOnTo =
        moment(end)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnTo = null;
    }

    inputParam.Priority = this.state.ticketSearchData["Priority"] || 0;
    inputParam.createdID = 0;
    inputParam.claimID = this.state.ticketSearchData["claimID"] || 0;
    inputParam.ticketID = this.state.ticketSearchData["ticketID"] || 0;
    inputParam.taskwithClaim =
      this.state.ticketSearchData["taskwithClaim"] || "";
    inputParam.taskwithTicket =
      this.state.ticketSearchData["taskwithTicket"] || "";
    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetTaskbyTicketData",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var taskByTicketData = response.data.responseData;
        if (message === "Success" && taskByTicketData) {
          self.setState({ taskByTicketData, isViewSerach: false });
        } else {
          self.setState({ taskByTicketData, isViewSerach: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetTaskbyTicketData");
      });
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];

    if (this.state.tabIndex === 1) {
      itemsArray = this.state.raisedByMeData;
    }
    if (this.state.tabIndex === 2) {
      itemsArray = this.state.assignToMeData;
    }
    if (this.state.tabIndex === 3) {
      itemsArray = this.state.taskByTicketData;
    }
    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return 1;
        if (a.storeName > b.storeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return 1;
        if (a.departmentName > b.departmentName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "priorityName") {
      itemsArray.sort((a, b) => {
        if (a.priorityName < b.priorityName) return 1;
        if (a.priorityName > b.priorityName) return -1;
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
    if (this.state.sortColumn === "assignto") {
      itemsArray.sort((a, b) => {
        if (a.assignto < b.assignto) return 1;
        if (a.assignto > b.assignto) return -1;
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
    this.setState({
      isortA: true,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];

    if (this.state.tabIndex === 1) {
      itemsArray = this.state.raisedByMeData;
    }
    if (this.state.tabIndex === 2) {
      itemsArray = this.state.assignToMeData;
    }
    if (this.state.tabIndex === 3) {
      itemsArray = this.state.taskByTicketData;
    }

    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return -1;
        if (a.storeName > b.storeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return -1;
        if (a.departmentName > b.departmentName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "priorityName") {
      itemsArray.sort((a, b) => {
        if (a.priorityName < b.priorityName) return -1;
        if (a.priorityName > b.priorityName) return 1;
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
    if (this.state.sortColumn === "assignto") {
      itemsArray.sort((a, b) => {
        if (a.assignto < b.assignto) return -1;
        if (a.assignto > b.assignto) return 1;
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

    this.setState({
      isortA: true,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    debugger;

    if (
      this.state.sortFilterdepartmentName.length === 0 ||
      this.state.sortFilterstoreName.length === 0 ||
      this.state.sortFiltercreationOn.length === 0
    ) {
      return false;
    }

    if (data === "storeName") {
      if (
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "departmentName") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "priorityName") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "creationOn") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "assignto") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
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
      sortFilterdepartmentName: this.state.sortdepartmentName,
      sortFilterstoreName: this.state.sortstoreName,
      sortFilterpriorityName: this.state.sortpriorityName,
      sortFiltercreationOn: this.state.sortcreationOn,
      sortFilterassignto: this.state.sortassignto,
      sortFiltercreatedBy: this.state.sortcreatedBy,
    });
    if (this.state.tempitemData.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
      });
      if (this.state.tabIndex === 1) {
        this.setState({ raisedByMeData: this.state.tempitemData });
      }
      if (this.state.tabIndex === 2) {
        this.setState({ assignToMeData: this.state.tempitemData });
      }
      if (this.state.tabIndex === 3) {
        this.setState({ taskByTicketData: this.state.tempitemData });
      }

      if (this.state.sortColumn === "storeName") {
        if (this.state.sstoreNameFilterCheckbox === "") {
        } else {
          this.setState({
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "departmentName") {
        if (this.state.sdepartmentNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "priorityName") {
        if (this.state.spriorityNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "creationOn") {
        if (this.state.screationOnFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "assignto") {
        if (this.state.sassigntoFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
      });

      if (this.state.tabIndex === 1) {
        this.setState({
          raisedByMeData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
      if (this.state.tabIndex === 2) {
        this.setState({
          assignToMeData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
      if (this.state.tabIndex === 3) {
        this.setState({
          taskByTicketData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
    }
  }
  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sdepartmentNameFilterCheckbox = this.state
      .sdepartmentNameFilterCheckbox;
    var sstoreNameFilterCheckbox = this.state.sstoreNameFilterCheckbox;
    var spriorityNameFilterCheckbox = this.state.spriorityNameFilterCheckbox;
    var screationOnFilterCheckbox = this.state.screationOnFilterCheckbox;
    var sassigntoFilterCheckbox = this.state.sassigntoFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;

    if (column === "storeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all", "");
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all,", "");
        if (sstoreNameFilterCheckbox.includes(e.currentTarget.value)) {
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
    if (column === "departmentName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdepartmentNameFilterCheckbox.includes(e.currentTarget.value)) {
          sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdepartmentNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdepartmentNameFilterCheckbox.includes("all")) {
          sdepartmentNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "departmentName") {
            for (let i = 0; i < this.state.sortdepartmentName.length; i++) {
              sdepartmentNameFilterCheckbox +=
                this.state.sortdepartmentName[i].departmentName + ",";
            }
            sdepartmentNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "priorityName" || column === "all") {
      if (type === "value" && type !== "All") {
        spriorityNameFilterCheckbox = spriorityNameFilterCheckbox.replace(
          "all",
          ""
        );
        spriorityNameFilterCheckbox = spriorityNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (spriorityNameFilterCheckbox.includes(e.currentTarget.value)) {
          spriorityNameFilterCheckbox = spriorityNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          spriorityNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (spriorityNameFilterCheckbox.includes("all")) {
          spriorityNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "priorityName") {
            for (let i = 0; i < this.state.sortpriorityName.length; i++) {
              spriorityNameFilterCheckbox +=
                this.state.sortpriorityName[i].priorityName + ",";
            }
            spriorityNameFilterCheckbox += "all";
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
        if (screationOnFilterCheckbox.includes(e.currentTarget.value)) {
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
    if (column === "assignto" || column === "all") {
      if (type === "value" && type !== "All") {
        sassigntoFilterCheckbox = sassigntoFilterCheckbox.replace("all", "");
        sassigntoFilterCheckbox = sassigntoFilterCheckbox.replace("all,", "");
        if (sassigntoFilterCheckbox.includes(e.currentTarget.value)) {
          sassigntoFilterCheckbox = sassigntoFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sassigntoFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sassigntoFilterCheckbox.includes("all")) {
          sassigntoFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "assignto") {
            for (let i = 0; i < this.state.sortassignto.length; i++) {
              sassigntoFilterCheckbox +=
                this.state.sortassignto[i].assignto + ",";
            }
            sassigntoFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (screatedByFilterCheckbox.includes(e.currentTarget.value)) {
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
            for (let i = 0; i < this.state.sortcreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortcreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sdepartmentNameFilterCheckbox,
      sstoreNameFilterCheckbox,
      spriorityNameFilterCheckbox,
      screationOnFilterCheckbox,
      sassigntoFilterCheckbox,
      screatedByFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
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
      // this.setState({
      //   brandcodeColor: "sort-column",
      // });
    } else if (column === "departmentName") {
      var sItems = sdepartmentNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.departmentName === sItems[i]
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
      //   brandnameColor: "sort-column",
      // });
    } else if (column === "priorityName") {
      var sItems = spriorityNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.priorityName === sItems[i]
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
      //   addedColor: "sort-column",
      // });
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
    } else if (column === "assignto") {
      var sItems = sassigntoFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.assignto === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
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
    }

    this.setState({
      tempitemData: itemsArray,
    });
  };
  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "storeName") {
      var sortFilterstoreName = matchSorter(
        this.state.sortstoreName,
        e.target.value,
        { keys: ["storeName"] }
      );
      if (sortFilterstoreName.length > 0) {
        this.setState({ sortFilterstoreName });
      } else {
        this.setState({
          sortFilterstoreName: this.state.sortstoreName,
        });
      }
    }
    if (this.state.sortColumn === "departmentName") {
      var sortFilterdepartmentName = matchSorter(
        this.state.sortdepartmentName,
        e.target.value,
        { keys: ["departmentName"] }
      );
      if (sortFilterdepartmentName.length > 0) {
        this.setState({ sortFilterdepartmentName });
      } else {
        this.setState({
          sortFilterdepartmentName: this.state.sortdepartmentName,
        });
      }
    }
    if (this.state.sortColumn === "priorityName") {
      var sortFilterpriorityName = matchSorter(
        this.state.sortpriorityName,
        e.target.value,
        {
          keys: ["priorityName"],
        }
      );
      if (sortFilterpriorityName.length > 0) {
        this.setState({ sortFilterpriorityName });
      } else {
        this.setState({
          sortFilterpriorityName: this.state.sortpriorityName,
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
          sortFiltercreationOn: this.state.sortcreationOn,
        });
      }
    }
    if (this.state.sortColumn === "assignto") {
      var sortFilterassignto = matchSorter(
        this.state.sortassignto,
        e.target.value,
        {
          keys: ["assignto"],
        }
      );
      if (sortFilterassignto.length > 0) {
        this.setState({ sortFilterassignto });
      } else {
        this.setState({
          sortFilterassignto: this.state.sortassignto,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFiltercreatedBy = matchSorter(
        this.state.sortcreatedBy,
        e.target.value,
        {
          keys: ["createdBy"],
        }
      );
      if (sortFiltercreatedBy.length > 0) {
        this.setState({
          sortFiltercreatedBy,
        });
      } else {
        this.setState({
          sortFiltercreatedBy: this.state.sortcreatedBy,
        });
      }
    }
  }
  ////handle collapse search
  handleFilterCollapse() {
    this.setState((state) => ({ FilterCollapse: !state.FilterCollapse }));
  }
  handleOnChange(e) {
    debugger;
    const { name, value } = e.target;
    if (this.state.tabIndex == 1) {
      this.state.raiseSearchData[name] = value;
      this.setState({ raiseSearchData: this.state.raiseSearchData });
      if (name === "functionID") {
        this.state.raiseSearchData["AssigntoId"] = "";
        this.setState({
          raiseSearchData: this.state.raiseSearchData,
          assignToData: [],
        });
        this.handleGetAssignTobyFuncationId();
      }
      if (name === "Department") {
        this.state.raiseSearchData["functionID"] = "";
        this.state.raiseSearchData["AssigntoId"] = "";
        this.setState({
          raiseSearchData: this.state.raiseSearchData,
          funcationData: [],
          assignToData: [],
        });
        this.handleGetFuncationByDepartmentId();
      }
    }
    if (this.state.tabIndex == 2) {
      this.state.assignSearchData[name] = value;
      this.setState({ assignSearchData: this.state.assignSearchData });
      if (name === "Department") {
        this.handleGetFuncationByDepartmentId();
      }
    }
    if (this.state.tabIndex == 3) {
      this.state.ticketSearchData[name] = value;
      this.setState({ ticketSearchData: this.state.ticketSearchData });
      if (name === "functionID") {
        this.state.ticketSearchData["AssigntoId"] = "";
        this.setState({
          ticketSearchData: this.state.ticketSearchData,
          assignToData: [],
        });
        this.handleGetAssignTobyFuncationId();
      }
      if (name === "Department") {
        this.state.ticketSearchData["functionID"] = "";
        this.state.ticketSearchData["AssigntoId"] = "";
        this.setState({
          ticketSearchData: this.state.ticketSearchData,
          funcationData: [],
          assignToData: [],
        });
        this.handleGetFuncationByDepartmentId()
      }
    }
  }
  SearchCreationOn = async (startDate) => {
    debugger;
    if (this.state.tabIndex == 1) {
      this.state.raiseSearchData["CreatedOnFrom"] = startDate[0];
      this.state.raiseSearchData["CreatedOnTo"] = startDate[1];
      this.setState({ raiseSearchData: this.state.raiseSearchData });
    }
    if (this.state.tabIndex == 2) {
      this.state.assignSearchData["CreatedOnFrom"] = startDate[0];
      this.state.assignSearchData["CreatedOnTo"] = startDate[1];
      this.setState({ assignSearchData: this.state.assignSearchData });
    }
    if (this.state.tabIndex == 3) {
      this.state.ticketSearchData["CreatedOnFrom"] = startDate[0];
      this.state.ticketSearchData["CreatedOnTo"] = startDate[1];
      this.setState({ ticketSearchData: this.state.ticketSearchData });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="store-task-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#raised-by-me-tab"
                role="tab"
                aria-controls="raised-by-me-tab"
                aria-selected="true"
                onClick={this.handleGetTaskData.bind(this, 1)}
              >
                Raised by Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#assigned-to-me-tab"
                role="tab"
                aria-controls="assigned-to-me-tab"
                aria-selected="false"
                onClick={this.handleGetTaskData.bind(this, 2)}
              >
                Assigned To Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#task-by-tickets-tab"
                role="tab"
                aria-controls="task-by-tickets-tab"
                aria-selected="false"
                onClick={this.handleGetTaskbyTicket.bind(this)}
              >
                Task By Tickets
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#campaign-tab"
                role="tab"
                aria-controls="campaign-tab"
                aria-selected="false"
                onClick={this.handleGetTaskData.bind(this, 4)}
              >
                Campaign
              </a>
            </li>
          </ul>
          {this.state.showAddTask && (
            <button
              className="butn"
              onClick={this.handleChagneAddTask.bind(this)}
            >
              Add Task
            </button>
          )}
        </div>
        <div
          className="tab-content store-task-tab-cont"
          style={{ padding: "15px" }}
        >
          <div
            className="tab-pane fade show active"
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div>
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <div className="tasksearchdiv">
                            <button
                              className="btn-inv"
                              type="button"
                              style={{ margin: "10px", width: "180px" }}
                              onClick={this.handleGetRaisedbymefilterData.bind(
                                this
                              )}
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
                                    name="taskid"
                                    value={this.state.raiseSearchData["taskid"]}
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Department"
                                    value={
                                      this.state.raiseSearchData["Department"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Department
                                    </option>

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
                                    name="functionID"
                                    value={
                                      this.state.raiseSearchData["functionID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value={""} selected>
                                      Funcation
                                    </option>

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
                                    className="store-create-select"
                                    name="AssigntoId"
                                    value={
                                      this.state.raiseSearchData["AssigntoId"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Assign To
                                    </option>
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
                                  <input
                                    type="text"
                                    placeholder="Task Title"
                                    name="tasktitle"
                                    value={
                                      this.state.raiseSearchData["tasktitle"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="taskstatus"
                                    value={
                                      this.state.raiseSearchData["taskstatus"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value={0} selected>
                                      Task Status
                                    </option>
                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                          className="select-category-placeholder"
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
                                    className="store-create-select"
                                    name="Priority"
                                    value={
                                      this.state.raiseSearchData["Priority"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value={""} selected>
                                      Task Priority
                                    </option>
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
                                {/* <div className="col-md-3">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Ticket ID"
                                  />
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div
                  className="float-search"
                  style={{ top: "18%" }}
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>
                    {this.state.FilterCollapse ? "Search" : "Search"}
                  </small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
                <div className="table-cntr raisereactTable">
                  {this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.raisedByMeData}
                      columns={[
                        {
                          Header: <span>ID</span>,
                          accessor: "storeTaskID",
                        },
                        {
                          Header: <span>Status</span>,
                          accessor: "taskStatus",
                          Cell: (row) => {
                            if (row.original.taskStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else if (row.original.taskStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: <span>Task Title</span>,
                          accessor: "taskTitle",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "departmentName",
                                "Department"
                              )}
                            >
                              Department <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "departmentName",
                          Cell: (row) => {
                            return (
                              <>
                                {row.original.departmentName}
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Function</p>
                                          <p>{row.original.functionName}</p>
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
                              </>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                "Store Name"
                              )}
                            >
                              Store Name <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeName",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "priorityName",
                                "Priority"
                              )}
                            >
                              Priority <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "priorityName	",
                          Cell: (row) => {
                            return <span>{row.original.priorityName}</span>;
                          },
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                "Creation On"
                              )}
                            >
                              Creation On <FontAwesomeIcon icon={faCaretDown} />
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
                                          {row.original.createdBy + " Created"}
                                        </p>
                                        <p>{row.original.createdago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          Assigned to{" "}
                                          {" " + row.original.assignto}
                                        </p>
                                        <p>{row.original.assignedago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          {row.original.updatedBy + " "} updated
                                        </p>
                                        <p>{row.original.updatedago}</p>
                                      </li>
                                      <li>
                                        <p>Response time remaining by</p>
                                        <p>
                                          {row.original.resolutionTimeRemaining}
                                        </p>
                                      </li>
                                      <li>
                                        <p>Response overdue by</p>
                                        <p>1 Hr</p>
                                      </li>
                                      <li>
                                        <p>Resolution overdue by</p>
                                        <p>
                                          {row.original.resolutionOverdueBy}
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
                          ),
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "assignto",
                                "Assign to"
                              )}
                            >
                              Assign to
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "assignto",
                          // Cell: (props) => (
                          //   <span>
                          //     <label>A, Bansal</label>
                          //   </span>
                          // ),
                        },
                      ]}
                      // resizable={false}
                      defaultPageSize={10}
                      minRows={2}
                      showPagination={true}
                      getTrProps={this.handleRowClickRaisedTable}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div>
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <div className="tasksearchdiv">
                            <button
                              className="btn-inv"
                              type="button"
                              style={{ margin: "10px", width: "180px" }}
                              onClick={this.handleGetAssigenBymefilterData.bind(
                                this
                              )}
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
                                    name="taskid"
                                    value={
                                      this.state.assignSearchData["taskid"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Department"
                                    value={
                                      this.state.assignSearchData["Department"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
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
                                  <input
                                    type="text"
                                    placeholder="Task Title"
                                    name="tasktitle"
                                    value={
                                      this.state.assignSearchData["tasktitle"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="functionID"
                                    value={
                                      this.state.assignSearchData["functionID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
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
                                    name="createdID"
                                    value={
                                      this.state.assignSearchData["createdID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>Task Created By</option>
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
                                    className="store-create-select"
                                    name="taskstatus"
                                    value={
                                      this.state.assignSearchData["taskstatus"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>Task Status</option>

                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                          className="select-category-placeholder"
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
                                    className="store-create-select"
                                    name="Priority"
                                    value={
                                      this.state.assignSearchData["Priority"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div
                  className="float-search"
                  style={{ top: "18%" }}
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>
                    {this.state.FilterCollapse ? "Search" : "Search"}
                  </small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
                <div className="table-cntr">
                  {this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.assignToMeData}
                      columns={[
                        {
                          Header: <span>ID</span>,
                          accessor: "storeTaskID",
                        },
                        {
                          Header: <span>Status</span>,
                          accessor: "taskStatus",
                          Cell: (row) => {
                            if (row.original.taskStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else if (row.original.taskStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: <span>Task Title</span>,
                          accessor: "taskTitle",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "departmentName",
                                "Department"
                              )}
                            >
                              Department <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "departmentName",
                          Cell: (row) => {
                            return (
                              <span>
                                <label>{row.original.departmentName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Function</p>
                                          <p>{row.original.functionName}</p>
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
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "createdBy",
                                "Created by"
                              )}
                            >
                              Created by <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "createdBy",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "priorityName",
                                "Priority"
                              )}
                            >
                              Priority <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "priorityName",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                "Store Name"
                              )}
                            >
                              Store Name
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "storeName",
                          Cell: (row) => {
                            return (
                              <span>
                                <label>{row.original.storeName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Store Name</p>
                                          <p>ABS</p>
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
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                "Creation On"
                              )}
                            >
                              Creation On <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "creationOn",
                          Cell: (row) => {
                            return (
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
                                            {row.original.createdBy +
                                              " Created"}
                                          </p>
                                          <p>{row.original.createdago}</p>
                                        </li>
                                        <li>
                                          <p>
                                            Assigned to{" "}
                                            {" " + row.original.assignto}
                                          </p>
                                          <p>{row.original.assignedago}</p>
                                        </li>
                                        <li>
                                          <p>
                                            {row.original.updatedBy + " "}{" "}
                                            updated
                                          </p>
                                          <p>{row.original.updatedago}</p>
                                        </li>

                                        <li>
                                          <p>Response time remaining by</p>
                                          <p>
                                            {
                                              row.original
                                                .resolutionTimeRemaining
                                            }
                                          </p>
                                        </li>
                                        <li>
                                          <p>Response overdue by</p>
                                          <p>1 Hr</p>
                                        </li>
                                        <li>
                                          <p>Resolution overdue by</p>
                                          <p>
                                            {row.original.resolutionOverdueBy}
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
                            );
                          },
                        },
                      ]}
                      // resizable={false}
                      minRows={2}
                      defaultPageSize={10}
                      showPagination={true}
                      getTrProps={this.handleRowClickRaisedTable}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="task-by-tickets-tab"
            role="tabpanel"
            aria-labelledby="task-by-tickets-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div>
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <div className="tasksearchdiv">
                            <button
                              className="btn-inv"
                              type="button"
                              style={{ margin: "10px", width: "180px" }}
                              onClick={this.handleGetTaskbyTicketData.bind(
                                this
                              )}
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
                                    name="taskid"
                                    value={
                                      this.state.ticketSearchData["taskid"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Department"
                                    value={
                                      this.state.ticketSearchData["Department"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Department
                                    </option>
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
                                    name="functionID"
                                    value={
                                      this.state.ticketSearchData["functionID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Funcation
                                    </option>
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
                                    className="store-create-select"
                                    name="AssigntoId"
                                    value={
                                      this.state.ticketSearchData["AssigntoId"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Assign To
                                    </option>
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
                                  <input
                                    type="text"
                                    placeholder="Task Title"
                                    name="tasktitle"
                                    value={
                                      this.state.ticketSearchData["tasktitle"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Priority"
                                    value={
                                      this.state.ticketSearchData["Priority"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Task Priority
                                    </option>
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
                                <div className="col-md-3 campaign-end-date creation-date-range">
                                  <CreationOnDatePickerCompo
                                    applyCallback={this.SearchCreationOn}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskstatus"
                                    value={
                                      this.state.ticketSearchData["taskstatus"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      Task Status
                                    </option>
                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                          className="select-category-placeholder"
                                        >
                                          {item.storeStatusName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskwithClaim"
                                    value={
                                      this.state.ticketSearchData[
                                        "taskwithClaim"
                                      ]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="">Task With Claim</option>
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskwithTicket"
                                    value={
                                      this.state.ticketSearchData[
                                        "taskwithTicket"
                                      ]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="">Task With Ticket</option>
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                  </select>
                                </div>

                                {this.state.ticketSearchData["taskwithClaim"] ==
                                "Yes" ? (
                                  <div className="col-md-3">
                                    <input
                                      className="no-bg"
                                      type="text"
                                      placeholder="Claim ID"
                                      name="claimID"
                                      value={
                                        this.state.ticketSearchData["claimID"]
                                      }
                                      onChange={this.handleOnChange.bind(this)}
                                    />
                                  </div>
                                ) : null}
                                {this.state.ticketSearchData[
                                  "taskwithTicket"
                                ] == "Yes" ? (
                                  <div className="col-md-3">
                                    <input
                                      className="no-bg"
                                      type="text"
                                      placeholder="Ticket ID"
                                      name="ticketID"
                                      value={
                                        this.state.ticketSearchData["ticketID"]
                                      }
                                      onChange={this.handleOnChange.bind(this)}
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
                <div
                  className="float-search"
                  style={{ top: "18%" }}
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>
                    {this.state.FilterCollapse ? "Search" : "Search"}
                  </small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
                <div className="table-cntr taskByTable">
                  {this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.taskByTicketData}
                      columns={[
                        {
                          Header: <span>Task ID</span>,
                          accessor: "storeTaskID",
                        },
                        {
                          Header: <span>Ticket ID</span>,
                          accessor: "ticketID",
                        },
                        {
                          Header: <span>Status</span>,
                          accessor: "taskStatus",
                          Cell: (row) => {
                            if (row.original.taskStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else if (row.original.taskStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: <span>Task Title</span>,
                          accessor: "taskTitle",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "departmentName",
                                "Department"
                              )}
                            >
                              Department <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "departmentName",
                          Cell: (row) => {
                            return (
                              <>
                                {row.original.departmentName}
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Function</p>
                                          <p>{row.original.functionName}</p>
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
                              </>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "createdBy",
                                "Created by"
                              )}
                            >
                              Created by <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "createdBy",
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                "Store Name"
                              )}
                            >
                              Store Name
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeName",
                          Cell: (row) => {
                            return (
                              <span>
                                <label>{row.original.storeName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Store Address</p>
                                          <p>{row.original.storeAddress}</p>
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
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                "Creation On"
                              )}
                            >
                              Creation On <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "creationOn",
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
                                          {row.original.createdBy + " "} Created
                                        </p>
                                        <p>{row.original.createdago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          Assigned to{" "}
                                          {" " + row.original.assignto}
                                        </p>
                                        <p>{row.original.assignedago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          {row.original.updatedBy + " "} updated
                                        </p>
                                        <p>{row.original.updatedago}</p>
                                      </li>
                                      <li>
                                        <p>Resolution time remaining by</p>
                                        <p>
                                          {row.original.resolutionTimeRemaining}
                                        </p>
                                      </li>
                                      <li>
                                        <p>Response overdue by</p>
                                        <p>1 Hr</p>
                                      </li>
                                      <li>
                                        <p>Resolution overdue by</p>
                                        <p>
                                          {row.original.resolutionOverdueBy}
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
                          ),
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "assignto",
                                "Assign to"
                              )}
                            >
                              Assign to
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "assignto",
                        },
                      ]}
                      // resizable={false}
                      defaultPageSize={10}
                      showPagination={true}
                      minRows={2}
                      getTrProps={this.HandleRowTaskByClickPage}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="campaign-tab"
            role="tabpanel"
            aria-labelledby="campaign-tab"
          >
            <Campaign />
          </div>
        </div>
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
              href=""
              style={{ margin: "0 25px", textDecoration: "underline" }}
              onClick={this.setSortCheckStatus.bind(this, "all")}
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
                      this.state.sstoreNameFilterCheckbox.includes("all") ||
                      this.state.sdepartmentNameFilterCheckbox.includes(
                        "all"
                      ) ||
                      this.state.spriorityNameFilterCheckbox.includes("all") ||
                      this.state.screationOnFilterCheckbox.includes("all") ||
                      this.state.sassigntoFilterCheckbox.includes("all") ||
                      this.state.screatedByFilterCheckbox.includes("all")
                    }
                    onChange={this.setSortCheckStatus.bind(this, "all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                </div>
                {this.state.sortColumn === "storeName"
                  ? this.state.sortFilterstoreName !== null &&
                    this.state.sortFilterstoreName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.storeName}
                          value={item.storeName}
                          checked={this.state.sstoreNameFilterCheckbox.includes(
                            item.storeName
                          )}
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

                {this.state.sortColumn === "departmentName"
                  ? this.state.sortFilterdepartmentName !== null &&
                    this.state.sortFilterdepartmentName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.departmentName}
                          value={item.departmentName}
                          checked={this.state.sdepartmentNameFilterCheckbox.includes(
                            item.departmentName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "departmentName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.departmentName}>
                          <span className="table-btn table-blue-btn">
                            {item.departmentName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "priorityName"
                  ? this.state.sortFilterpriorityName !== null &&
                    this.state.sortFilterpriorityName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.priorityName}
                          value={item.priorityName}
                          checked={this.state.spriorityNameFilterCheckbox.includes(
                            item.priorityName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "priorityName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.priorityName}>
                          <span className="table-btn table-blue-btn">
                            {item.priorityName}
                          </span>
                        </label>
                      </div>
                    ))
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
                          checked={this.state.screationOnFilterCheckbox.includes(
                            item.creationOn
                          )}
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
                {this.state.sortColumn === "assignto"
                  ? this.state.sortFilterassignto !== null &&
                    this.state.sortFilterassignto.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.assignto}
                          value={item.assignto}
                          checked={this.state.sassigntoFilterCheckbox.includes(
                            item.assignto
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "assignto",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.assignto}>
                          <span className="table-btn table-blue-btn">
                            {item.assignto}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
                {this.state.sortColumn === "createdBy"
                  ? this.state.sortFiltercreatedBy !== null &&
                    this.state.sortFiltercreatedBy.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.createdBy}
                          value={item.createdBy}
                          checked={this.state.screatedByFilterCheckbox.includes(
                            item.createdBy
                          )}
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
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StoreTask;
