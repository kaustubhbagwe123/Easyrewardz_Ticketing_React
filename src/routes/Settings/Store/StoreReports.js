import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DownExcel from "./../../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import { Popover } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import Correct from "./../../../assets/Images/correct.png";
import Select from "react-select";
import TicketActionType from "./../../TicketActionType";
import DatePickerComponenet from "./../Ticketing/DatePickerComponent";
import DatePicker from "react-datepicker";

class StoreReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      taskCreateDate: "",
      claimCreateDate: "",
      tabIndex: 0,
      taskStatusList: TicketActionType(),
      taskStatus: [],
      taskIdTitle: "",
      taskLinkedTicketId: "",
      claimLinkedTicketId: "",
      taskClaimId: "",
      linkedTaskId: "",
      claimClaimId: "",
      taskWithTickets: "no",
      claimWithTickets: "no",
      taskWithClaim: "no",
      claimWithTask: "no",
      taskCreatedBy: "1",
      campaignAssignedTo: "1",
      claimCreatedBy: "1",
      taskAssignedTo: "1",
      claimAssignedTo: "1",
      departmentShow: false,
      functionShow: false,
      priorityShow: false,
      claimStatusShow: false,
      claimCategoryShow: false,
      claimSubCategoryShow: false,
      claimIssueTypeShow: false,
      campaignNameShow: false,
      campaignStatusShow: false,
      departmentName: [
        { campaignNameID: 1, campaignName: "Department 1" },
        { campaignNameID: 2, campaignName: "Department 2" },
      ],
      functionName: [
        { campaignNameID: 3, campaignName: "Function 1" },
        { campaignNameID: 4, campaignName: "Function 2" },
      ],
      priorityName: [
        { campaignNameID: 5, campaignName: "Priority 1" },
        { campaignNameID: 6, campaignName: "Priority 2" },
      ],
      claimStatusName: [
        { campaignNameID: 7, campaignName: "Claim Status 1" },
        { campaignNameID: 8, campaignName: "Claim Status 2" },
      ],
      claimCategoryName: [
        { campaignNameID: 9, campaignName: "Claim Category 1" },
        { campaignNameID: 10, campaignName: "Claim Category 2" },
      ],
      claimSubCategoryName: [
        { campaignNameID: 11, campaignName: "Claim Sub Category 1" },
        { campaignNameID: 12, campaignName: "Claim Sub Category 2" },
      ],
      claimIssueTypeName: [
        { campaignNameID: 13, campaignName: "Claim Issue Type 1" },
        { campaignNameID: 14, campaignName: "Claim Issue Type 2" },
      ],
      campaignName: [
        { campaignNameID: 15, campaignName: "Campaign Name 1" },
        { campaignNameID: 16, campaignName: "Campaign Name 2" },
      ],
      campaignStatusName: [
        { campaignNameID: 17, campaignName: "Campaign Status 1" },
        { campaignNameID: 18, campaignName: "Campaign Status 2" },
      ],
      departmentOvrlayShow: false,
      functionOvrlayShow: false,
      priorityOvrlayShow: false,
      claimStatusOvrlayShow: false,
      claimCategoryOvrlayShow: false,
      claimSubCategoryOvrlayShow: false,
      claimIssueTypeOvrlayShow: false,
      campaignNameOvrlayShow: false,
      campaignStatusOvrlayShow: false,
      indiDepartment: "",
      indiFunction: "",
      indiPriority: "",
      indiClaimStatus: "",
      indiClaimCategory: "",
      indiClaimSubCategory: "",
      indiClaimIssueType: "",
      indiCampaignName: "",
      indiCampaignStatus: "",
      campaignEndDateFrom: "",
      campaignEndDateTo: "",
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
    this.handleOnChangeData = this.handleOnChangeData.bind(this);
    this.handleDepartmentButton = this.handleDepartmentButton.bind(this);
    this.handleFunctionButton = this.handleFunctionButton.bind(this);
    this.handlePriorityButton = this.handlePriorityButton.bind(this);
    this.handleClaimStatusButton = this.handleClaimStatusButton.bind(this);
    this.handleClaimCategoryButton = this.handleClaimCategoryButton.bind(this);
    this.handleClaimSubCategoryButton = this.handleClaimSubCategoryButton.bind(
      this
    );
    this.handleClaimIssueTypeButton = this.handleClaimIssueTypeButton.bind(
      this
    );
    this.handleCampaignNameButton = this.handleCampaignNameButton.bind(this);
    this.handleCampaignStatusButton = this.handleCampaignStatusButton.bind(
      this
    );
  }

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
      campaignEndDateFrom: start,
      campaignEndDateTo: end,
    });
  };

  setMultiSelectDropdown = (e, action) => {
    debugger;
    this.setState({ [action.name]: e });
  };

  handleOnChangeData(e) {
    debugger;
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDepartmentButton() {
    debugger;
    let slaShowOriginal = this.state.departmentShow;
    let departmentShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.departmentOvrlayShow;
    let departmentOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      departmentShow,
      departmentOvrlayShow,
    });
  }
  selectAllDepartment = async (event) => {
    debugger;
    var indiDepartment = "";
    var checkboxes = document.getElementsByName("allDepartment");
    document.getElementById("departmentNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.departmentName !== null) {
      this.state.departmentName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiDepartment += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiDepartment,
    });
  };
  selectNoDepartment = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allDepartment");
    document.getElementById("departmentNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiDepartment: "",
    });
  };
  selectIndividualDepartment = async (issueId, event) => {
    debugger;
    var indiDepartment = this.state.indiDepartment;
    var separator = ",";
    var values = indiDepartment.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiDepartment = values.join(separator);
      }
      await this.setState({
        indiDepartment,
      });
      document.getElementById("departmentNameValue").textContent =
        this.state.indiDepartment.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiDepartment = values.join(separator);
        }
      }
      await this.setState({
        indiDepartment,
      });
      if (this.state.indiDepartment.split(",").length - 1 !== 0) {
        document.getElementById("departmentNameValue").textContent =
          this.state.indiDepartment.split(",").length - 1 + " selected";
      } else {
        document.getElementById("departmentNameValue").textContent = "Select";
      }
    }
  };

  handleClaimIssueTypeButton() {
    debugger;
    let slaShowOriginal = this.state.claimIssueTypeShow;
    let claimIssueTypeShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimIssueTypeOvrlayShow;
    let claimIssueTypeOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimIssueTypeShow,
      claimIssueTypeOvrlayShow,
    });
  }
  selectAllClaimIssueType = async (event) => {
    debugger;
    var indiClaimIssueType = "";
    var checkboxes = document.getElementsByName("allClaimIssueType");
    document.getElementById("claimIssueTypeNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimIssueTypeName !== null) {
      this.state.claimIssueTypeName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimIssueType += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiClaimIssueType,
    });
  };
  selectNoClaimIssueType = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimIssueType");
    document.getElementById("claimIssueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimIssueType: "",
    });
  };
  selectIndividualClaimIssueType = async (issueId, event) => {
    debugger;
    var indiClaimIssueType = this.state.indiClaimIssueType;
    var separator = ",";
    var values = indiClaimIssueType.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimIssueType = values.join(separator);
      }
      await this.setState({
        indiClaimIssueType,
      });
      document.getElementById("claimIssueTypeNameValue").textContent =
        this.state.indiClaimIssueType.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimIssueType = values.join(separator);
        }
      }
      await this.setState({
        indiClaimIssueType,
      });
      if (this.state.indiClaimIssueType.split(",").length - 1 !== 0) {
        document.getElementById("claimIssueTypeNameValue").textContent =
          this.state.indiClaimIssueType.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimIssueTypeNameValue").textContent =
          "Select";
      }
    }
  };

  handleClaimSubCategoryButton() {
    debugger;
    let slaShowOriginal = this.state.claimSubCategoryShow;
    let claimSubCategoryShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimSubCategoryOvrlayShow;
    let claimSubCategoryOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimSubCategoryShow,
      claimSubCategoryOvrlayShow,
    });
  }
  selectAllClaimSubCategory = async (event) => {
    debugger;
    var indiClaimSubCategory = "";
    var checkboxes = document.getElementsByName("allClaimSubCategory");
    document.getElementById("claimSubCategoryNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimSubCategoryName !== null) {
      this.state.claimSubCategoryName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimSubCategory += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiClaimSubCategory,
    });
  };
  selectNoClaimSubCategory = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimSubCategory");
    document.getElementById("claimSubCategoryNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimSubCategory: "",
    });
  };
  selectIndividualClaimSubCategory = async (issueId, event) => {
    debugger;
    var indiClaimSubCategory = this.state.indiClaimSubCategory;
    var separator = ",";
    var values = indiClaimSubCategory.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimSubCategory = values.join(separator);
      }
      await this.setState({
        indiClaimSubCategory,
      });
      document.getElementById("claimSubCategoryNameValue").textContent =
        this.state.indiClaimSubCategory.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimSubCategory = values.join(separator);
        }
      }
      await this.setState({
        indiClaimSubCategory,
      });
      if (this.state.indiClaimSubCategory.split(",").length - 1 !== 0) {
        document.getElementById("claimSubCategoryNameValue").textContent =
          this.state.indiClaimSubCategory.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimSubCategoryNameValue").textContent =
          "Select";
      }
    }
  };

  handleClaimCategoryButton() {
    debugger;
    let slaShowOriginal = this.state.claimCategoryShow;
    let claimCategoryShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimCategoryOvrlayShow;
    let claimCategoryOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimCategoryShow,
      claimCategoryOvrlayShow,
    });
  }
  selectAllClaimCategory = async (event) => {
    debugger;
    var indiClaimCategory = "";
    var checkboxes = document.getElementsByName("allClaimCategory");
    document.getElementById("claimCategoryNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimCategoryName !== null) {
      this.state.claimCategoryName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimCategory += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiClaimCategory,
    });
  };
  selectNoClaimCategory = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimCategory");
    document.getElementById("claimCategoryNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimCategory: "",
    });
  };
  selectIndividualClaimCategory = async (issueId, event) => {
    debugger;
    var indiClaimCategory = this.state.indiClaimCategory;
    var separator = ",";
    var values = indiClaimCategory.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimCategory = values.join(separator);
      }
      await this.setState({
        indiClaimCategory,
      });
      document.getElementById("claimCategoryNameValue").textContent =
        this.state.indiClaimCategory.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimCategory = values.join(separator);
        }
      }
      await this.setState({
        indiClaimCategory,
      });
      if (this.state.indiClaimCategory.split(",").length - 1 !== 0) {
        document.getElementById("claimCategoryNameValue").textContent =
          this.state.indiClaimCategory.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimCategoryNameValue").textContent =
          "Select";
      }
    }
  };

  handleClaimStatusButton() {
    debugger;
    let slaShowOriginal = this.state.claimStatusShow;
    let claimStatusShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.claimStatusOvrlayShow;
    let claimStatusOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      claimStatusShow,
      claimStatusOvrlayShow,
    });
  }
  selectAllClaimStatus = async (event) => {
    debugger;
    var indiClaimStatus = "";
    var checkboxes = document.getElementsByName("allClaimStatus");
    document.getElementById("claimStatusNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.claimStatusName !== null) {
      this.state.claimStatusName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiClaimStatus += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiClaimStatus,
    });
  };
  selectNoClaimStatus = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allClaimStatus");
    document.getElementById("claimStatusNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiClaimStatus: "",
    });
  };
  selectIndividualClaimStatus = async (issueId, event) => {
    debugger;
    var indiClaimStatus = this.state.indiClaimStatus;
    var separator = ",";
    var values = indiClaimStatus.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiClaimStatus = values.join(separator);
      }
      await this.setState({
        indiClaimStatus,
      });
      document.getElementById("claimStatusNameValue").textContent =
        this.state.indiClaimStatus.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiClaimStatus = values.join(separator);
        }
      }
      await this.setState({
        indiClaimStatus,
      });
      if (this.state.indiClaimStatus.split(",").length - 1 !== 0) {
        document.getElementById("claimStatusNameValue").textContent =
          this.state.indiClaimStatus.split(",").length - 1 + " selected";
      } else {
        document.getElementById("claimStatusNameValue").textContent = "Select";
      }
    }
  };

  handlePriorityButton() {
    debugger;
    let slaShowOriginal = this.state.priorityShow;
    let priorityShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.priorityOvrlayShow;
    let priorityOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      priorityShow,
      priorityOvrlayShow,
    });
  }
  selectAllPriority = async (event) => {
    debugger;
    var indiPriority = "";
    var checkboxes = document.getElementsByName("allPriority");
    document.getElementById("priorityNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.priorityName !== null) {
      this.state.priorityName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiPriority += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiPriority,
    });
  };
  selectNoPriority = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allPriority");
    document.getElementById("priorityNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiPriority: "",
    });
  };
  selectIndividualPriority = async (issueId, event) => {
    debugger;
    var indiPriority = this.state.indiPriority;
    var separator = ",";
    var values = indiPriority.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiPriority = values.join(separator);
      }
      await this.setState({
        indiPriority,
      });
      document.getElementById("priorityNameValue").textContent =
        this.state.indiPriority.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiPriority = values.join(separator);
        }
      }
      await this.setState({
        indiPriority,
      });
      if (this.state.indiPriority.split(",").length - 1 !== 0) {
        document.getElementById("priorityNameValue").textContent =
          this.state.indiPriority.split(",").length - 1 + " selected";
      } else {
        document.getElementById("priorityNameValue").textContent = "Select";
      }
    }
  };

  handleCampaignNameButton() {
    debugger;
    let slaShowOriginal = this.state.campaignNameShow;
    let campaignNameShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignNameOvrlayShow;
    let campaignNameOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignNameShow,
      campaignNameOvrlayShow,
    });
  }
  selectAllCampaignName = async (event) => {
    debugger;
    var indiCampaignName = "";
    var checkboxes = document.getElementsByName("allCampaignName");
    document.getElementById("campaignNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.campaignName !== null) {
      this.state.campaignName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiCampaignName += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiCampaignName,
    });
  };
  selectNoCampaignName = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allCampaignName");
    document.getElementById("campaignNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiCampaignName: "",
    });
  };
  selectIndividualCampaignName = async (issueId, event) => {
    debugger;
    var indiCampaignName = this.state.indiCampaignName;
    var separator = ",";
    var values = indiCampaignName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiCampaignName = values.join(separator);
      }
      await this.setState({
        indiCampaignName,
      });
      document.getElementById("campaignNameValue").textContent =
        this.state.indiCampaignName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiCampaignName = values.join(separator);
        }
      }
      await this.setState({
        indiCampaignName,
      });
      if (this.state.indiCampaignName.split(",").length - 1 !== 0) {
        document.getElementById("campaignNameValue").textContent =
          this.state.indiCampaignName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("campaignNameValue").textContent = "Select";
      }
    }
  };

  handleFunctionButton() {
    debugger;
    let slaShowOriginal = this.state.functionShow;
    let functionShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.functionOvrlayShow;
    let functionOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      functionShow,
      functionOvrlayShow,
    });
  }
  selectAllFunction = async (event) => {
    debugger;
    var indiFunction = "";
    var checkboxes = document.getElementsByName("allFunction");
    document.getElementById("functionNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.functionName !== null) {
      this.state.functionName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiFunction += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiFunction,
    });
  };
  selectNoFunction = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allFunction");
    document.getElementById("functionNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiFunction: "",
    });
  };
  selectIndividualFunction = async (issueId, event) => {
    debugger;
    var indiFunction = this.state.indiFunction;
    var separator = ",";
    var values = indiFunction.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiFunction = values.join(separator);
      }
      await this.setState({
        indiFunction,
      });
      document.getElementById("functionNameValue").textContent =
        this.state.indiFunction.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiFunction = values.join(separator);
        }
      }
      await this.setState({
        indiFunction,
      });
      if (this.state.indiFunction.split(",").length - 1 !== 0) {
        document.getElementById("functionNameValue").textContent =
          this.state.indiFunction.split(",").length - 1 + " selected";
      } else {
        document.getElementById("functionNameValue").textContent = "Select";
      }
    }
  };

  handleCampaignStatusButton() {
    debugger;
    let slaShowOriginal = this.state.campaignStatusShow;
    let campaignStatusShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignStatusOvrlayShow;
    let campaignStatusOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignStatusShow,
      campaignStatusOvrlayShow,
    });
  }
  selectAllCampaignStatus = async (event) => {
    debugger;
    var indiCampaignStatus = "";
    var checkboxes = document.getElementsByName("allCampaignStatus");
    document.getElementById("campaignStatusNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.campaignStatusName !== null) {
      this.state.campaignStatusName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiCampaignStatus += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiCampaignStatus,
    });
  };
  selectNoCampaignStatus = async (event) => {
    debugger;
    var checkboxes = document.getElementsByName("allCampaignStatus");
    document.getElementById("campaignStatusNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiCampaignStatus: "",
    });
  };
  selectIndividualCampaignStatus = async (issueId, event) => {
    debugger;
    var indiCampaignStatus = this.state.indiCampaignStatus;
    var separator = ",";
    var values = indiCampaignStatus.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiCampaignStatus = values.join(separator);
      }
      await this.setState({
        indiCampaignStatus,
      });
      document.getElementById("campaignStatusNameValue").textContent =
        this.state.indiCampaignStatus.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiCampaignStatus = values.join(separator);
        }
      }
      await this.setState({
        indiCampaignStatus,
      });
      if (this.state.indiCampaignStatus.split(",").length - 1 !== 0) {
        document.getElementById("campaignStatusNameValue").textContent =
          this.state.indiCampaignStatus.split(",").length - 1 + " selected";
      } else {
        document.getElementById("campaignStatusNameValue").textContent =
          "Select";
      }
    }
  };

  handleAddReportOpen() {
    this.setState({ AddReportPopup: true, tabIndex: 0 });
  }
  handleAddReportClose() {
    this.setState({ AddReportPopup: false });
  }
  handleNextPopupOpen() {
    this.handleAddReportClose();
    this.setState({ NextPopup: true });
  }
  handleNextPopupClose() {
    this.setState({ NextPopup: false });
  }
  handleReportCreateDate(name, date) {
    debugger;
    this.setState({ [name]: date });
  }
  handleChangeTab(index) {
    this.setState({
      tabIndex: index,
    });
  }
  render() {
    const datareport = [
      {
        nameReport: "Open Tickets",
        scheduleReport: "Daily",
        statusReport: "Active",
      },
      {
        nameReport: "Escalated Tickets",
        scheduleReport: "Weekly",
        statusReport: "Inactive",
      },
      {
        nameReport: "Resolved Tickets",
        scheduleReport: "Monthly",
        statusReport: "Active",
      },
      {
        nameReport: "Tickets with task",
        scheduleReport: "Daily",
        statusReport: "Inactive",
      },
      {
        nameReport: "Categorywise open tickets",
        scheduleReport: "Weekly",
        statusReport: "Active",
      },
    ];

    const columnsreport = [
      {
        Header: (
          <span>
            Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "nameReport",
      },
      {
        Header: (
          <span>
            Schedule Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "scheduleReport",
      },
      {
        Header: (
          <span>
            Created by
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "createdReport",
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Admin
                <Popover content={popoverData} placement="bottom">
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
        },
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "statusReport",
      },
      {
        Header: <span>Actions</span>,
        accessor: "actionReport",
        Cell: (row) => (
          <span>
            <img
              src={DownExcel}
              alt="download icon"
              className="downloadaction"
            />
            <Popover content={ActionDelete} placement="bottom" trigger="click">
              <img src={RedDeleteIcon} alt="del-icon" className="del-btn" />
            </Popover>
            <button className="react-tabel-button editre" id="p-edit-pop-2">
              EDIT
            </button>
          </span>
        ),
      },
    ];
    const ActionDelete = (
      <div className="d-flex general-popover popover-body">
        <div className="del-big-icon">
          <img src={DelBigIcon} alt="del-icon" />
        </div>
        <div>
          <p className="font-weight-bold blak-clr">Delete file?</p>
          <p className="mt-1 fs-12">
            Are you sure you want to delete this file?
          </p>
          <div className="del-can">
            <a href={Demo.BLANK_LINK}>CANCEL</a>
            <button className="butn">Delete</button>
          </div>
        </div>
      </div>
    );
    const popoverData = (
      <>
        <div>
          <b>
            <p className="title">Created By: Admin</p>
          </b>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: Manager</p>
          </b>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </>
    );

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            Store
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
                onClick={this.handleAddReportOpen}
              >
                + Add
              </button>
            </div>
          </div>
          <Modal
            open={this.state.AddReportPopup}
            onClose={this.handleAddReportClose}
            closeIconId="sdsg"
            modalId="addStorereport-modal"
            // overlayId="logout-ovrly"
          >
            <div
              id="overlayDepartment"
              className={this.state.departmentOvrlayShow ? "show" : ""}
              onClick={this.handleDepartmentButton}
            />
            <div
              id="overlayFunction"
              className={this.state.functionOvrlayShow ? "show" : ""}
              onClick={this.handleFunctionButton}
            />
            <div
              id="overlayPriority"
              className={this.state.priorityOvrlayShow ? "show" : ""}
              onClick={this.handlePriorityButton}
            />
            <div
              id="overlayClaimStatus"
              className={this.state.claimStatusOvrlayShow ? "show" : ""}
              onClick={this.handleClaimStatusButton}
            />
            <div
              id="overlayClaimCategory"
              className={this.state.claimCategoryOvrlayShow ? "show" : ""}
              onClick={this.handleClaimCategoryButton}
            />
            <div
              id="overlayClaimSubCategory"
              className={this.state.claimSubCategoryOvrlayShow ? "show" : ""}
              onClick={this.handleClaimSubCategoryButton}
            />
            <div
              id="overlayClaimIssueType"
              className={this.state.claimIssueTypeOvrlayShow ? "show" : ""}
              onClick={this.handleClaimIssueTypeButton}
            />
            <div
              id="overlayCampaignName"
              className={this.state.campaignNameOvrlayShow ? "show" : ""}
              onClick={this.handleCampaignNameButton}
            />
            <div
              id="overlayCampaignStatus"
              className={this.state.campaignStatusOvrlayShow ? "show" : ""}
              onClick={this.handleCampaignStatusButton}
            />
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 0 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#task-tab"
                    role="tab"
                    aria-controls="task-tab"
                    aria-selected="true"
                    style={{ pointerEvents: "none" }}
                  >
                    Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 1 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#claim-tab"
                    role="tab"
                    aria-controls="claim-tab"
                    aria-selected="false"
                    style={{ pointerEvents: "none" }}
                  >
                    Claim
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 2 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#campaign-tab"
                    role="tab"
                    aria-controls="campaign-tab"
                    aria-selected="false"
                    style={{ pointerEvents: "none" }}
                  >
                    Campaign
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
            <div className="tab-content store-report-add">
              <div
                className={`tab-pane fade ${this.state.tabIndex === 0 &&
                  "show active"}`}
                id="task-tab"
                role="tabpanel"
                aria-labelledby="task-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task ID/ Title</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Task ID/ Title"
                        maxLength={11}
                        name="taskIdTitle"
                        value={this.state.taskIdTitle}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Department</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="departmentNameValue"
                          onClick={this.handleDepartmentButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.departmentShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllDepartment.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoDepartment.bind(this)}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.departmentName !== null &&
                                  this.state.departmentName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"i" + item.campaignNameID}
                                        name="allDepartment"
                                        onChange={this.selectIndividualDepartment.bind(
                                          this,
                                          item.campaignNameID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.campaignNameID}
                                      >
                                        {item.campaignName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Task Creation On</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.taskCreateDate}
                          value={this.state.taskCreateDate}
                          onChange={this.handleReportCreateDate.bind(
                            this,
                            "taskCreateDate"
                          )}
                          placeholderText="Creation Date"
                          showMonthDropdown
                          showYearDropdown
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task Status</label>
                      <div className="normal-dropdown">
                        <Select
                          getOptionLabel={(option) =>
                            option.ticketActionTypeName
                          }
                          getOptionValue={(option) => option.ticketActionTypeID}
                          options={this.state.taskStatusList}
                          closeMenuOnSelect={false}
                          onChange={this.setMultiSelectDropdown.bind(this)}
                          value={this.state.taskStatus}
                          name="taskStatus"
                          placeholder="Select"
                          isMulti
                        />
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Function</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="functionNameValue"
                          onClick={this.handleFunctionButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.functionShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllFunction.bind(this)}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoFunction.bind(this)}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.functionName !== null &&
                                  this.state.functionName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"i" + item.campaignNameID}
                                        name="allFunction"
                                        onChange={this.selectIndividualFunction.bind(
                                          this,
                                          item.campaignNameID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.campaignNameID}
                                      >
                                        {item.campaignName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Created by</label>
                      <select
                        name="taskCreatedBy"
                        value={this.state.taskCreatedBy}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="1">Aman</option>
                        <option value="2">Arjun</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Ticket ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Linked Ticket ID"
                        maxLength={11}
                        name="taskLinkedTicketId"
                        value={this.state.taskLinkedTicketId}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Priority</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="priorityNameValue"
                          onClick={this.handlePriorityButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.priorityShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllPriority.bind(this)}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoPriority.bind(this)}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.priorityName !== null &&
                                  this.state.priorityName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"i" + item.campaignNameID}
                                        name="allPriority"
                                        onChange={this.selectIndividualPriority.bind(
                                          this,
                                          item.campaignNameID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.campaignNameID}
                                      >
                                        {item.campaignName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Assigned To</label>
                      <select
                        name="taskAssignedTo"
                        value={this.state.taskAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="1">Aman</option>
                        <option value="2">Arjun</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Task With Tickets</label>
                      <select
                        name="taskWithTickets"
                        value={this.state.taskWithTickets}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Task With Claim</label>
                      <select
                        name="taskWithClaim"
                        value={this.state.taskWithClaim}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="taskClaimId"
                        value={this.state.taskClaimId}
                        placeholder="Enter Claim ID"
                        onChange={this.handleOnChangeData}
                      />
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
                id="claim-tab"
                role="tabpanel"
                aria-labelledby="claim-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="claimClaimId"
                        value={this.state.claimClaimId}
                        placeholder="Enter Claim ID"
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Category</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimCategoryNameValue"
                          onClick={this.handleClaimCategoryButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimCategoryShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimCategory.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimCategory.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimCategoryName !== null &&
                                  this.state.claimCategoryName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"i" + item.campaignNameID}
                                          name="allClaimCategory"
                                          onChange={this.selectIndividualClaimCategory.bind(
                                            this,
                                            item.campaignNameID
                                          )}
                                        />
                                        <label
                                          htmlFor={"i" + item.campaignNameID}
                                        >
                                          {item.campaignName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Creation On</label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.claimCreateDate}
                          value={this.state.claimCreateDate}
                          onChange={this.handleReportCreateDate.bind(
                            this,
                            "claimCreateDate"
                          )}
                          placeholderText="Creation Date"
                          showMonthDropdown
                          showYearDropdown
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Status</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimStatusNameValue"
                          onClick={this.handleClaimStatusButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimStatusShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimStatus.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimStatus.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimStatusName !== null &&
                                  this.state.claimStatusName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"i" + item.campaignNameID}
                                        name="allClaimStatus"
                                        onChange={this.selectIndividualClaimStatus.bind(
                                          this,
                                          item.campaignNameID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.campaignNameID}
                                      >
                                        {item.campaignName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Sub Category</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimSubCategoryNameValue"
                          onClick={this.handleClaimSubCategoryButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimSubCategoryShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimSubCategory.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimSubCategory.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimSubCategoryName !== null &&
                                  this.state.claimSubCategoryName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"i" + item.campaignNameID}
                                          name="allClaimSubCategory"
                                          onChange={this.selectIndividualClaimSubCategory.bind(
                                            this,
                                            item.campaignNameID
                                          )}
                                        />
                                        <label
                                          htmlFor={"i" + item.campaignNameID}
                                        >
                                          {item.campaignName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Created by</label>
                      <select
                        name="claimCreatedBy"
                        value={this.state.claimCreatedBy}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="1">Aman</option>
                        <option value="2">Arjun</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Ticket ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        placeholder="Enter Linked Ticket ID"
                        maxLength={11}
                        name="claimLinkedTicketId"
                        value={this.state.claimLinkedTicketId}
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim Issue Type</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="claimIssueTypeNameValue"
                          onClick={this.handleClaimIssueTypeButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.claimIssueTypeShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllClaimIssueType.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoClaimIssueType.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.claimIssueTypeName !== null &&
                                  this.state.claimIssueTypeName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"i" + item.campaignNameID}
                                          name="allClaimIssueType"
                                          onChange={this.selectIndividualClaimIssueType.bind(
                                            this,
                                            item.campaignNameID
                                          )}
                                        />
                                        <label
                                          htmlFor={"i" + item.campaignNameID}
                                        >
                                          {item.campaignName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Assigned To</label>
                      <select
                        name="claimAssignedTo"
                        value={this.state.claimAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="1">Aman</option>
                        <option value="2">Arjun</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim With Tickets</label>
                      <select
                        name="claimWithTickets"
                        value={this.state.claimWithTickets}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Claim With Task</label>
                      <select
                        name="claimWithTask"
                        value={this.state.claimWithTask}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Linked Task ID</label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="linkedTaskId"
                        value={this.state.linkedTaskId}
                        placeholder="Enter Linked Task ID"
                        onChange={this.handleOnChangeData}
                      />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        // onClick={this.handleNextPopupOpen}
                        onClick={this.handleChangeTab.bind(this, 2)}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 2 &&
                  "show active"}`}
                id="campaign-tab"
                role="tabpanel"
                aria-labelledby="campaign-tab"
              >
                <div className="container reportpad">
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Name</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="campaignNameValue"
                          onClick={this.handleCampaignNameButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.campaignNameShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllCampaignName.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoCampaignName.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.campaignName !== null &&
                                  this.state.campaignName.map((item, i) => (
                                    <li key={i}>
                                      <input
                                        type="checkbox"
                                        id={"i" + item.campaignNameID}
                                        name="allCampaignName"
                                        onChange={this.selectIndividualCampaignName.bind(
                                          this,
                                          item.campaignNameID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.campaignNameID}
                                      >
                                        {item.campaignName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Assigned To</label>
                      <select
                        name="campaignAssignedTo"
                        value={this.state.campaignAssignedTo}
                        onChange={this.handleOnChangeData}
                      >
                        <option value="1">Aman</option>
                        <option value="2">Arjun</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className=" ticketstrReport">
                        <label>Campaign End Date</label>
                      </div>
                      <div className="ticketreportdat campaign-end-date">
                        <DatePickerComponenet
                          applyCallback={this.applyCallback}
                        />
                      </div>
                      {/* <input className="no-bg" type="text" /> */}
                    </div>
                  </div>
                  <div className="row mdl-row">
                    <div className="col-md-4 ticketstrReport">
                      <label>Campaign Status</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button
                          className="btn issuesladrop mb-0"
                          type="button"
                          id="campaignStatusNameValue"
                          onClick={this.handleCampaignStatusButton}
                        >
                          Select
                          <span className="caret"></span>
                        </button>
                        {/* {this.state.indiDepartment === "" && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px",
                            }}
                          >
                            {this.state.issueTypeCompulsion}
                          </p>
                        )} */}
                        <div
                          className={
                            this.state.campaignStatusShow
                              ? "dropdown-menu dropdown-menu-sla show"
                              : "dropdown-menu dropdown-menu-sla"
                          }
                        >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label
                                    onClick={this.selectAllCampaignStatus.bind(
                                      this
                                    )}
                                  >
                                    Select All
                                  </label>
                                </li>
                                <li>
                                  <label
                                    onClick={this.selectNoCampaignStatus.bind(
                                      this
                                    )}
                                  >
                                    Clear
                                  </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {this.state.campaignStatusName !== null &&
                                  this.state.campaignStatusName.map(
                                    (item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"i" + item.campaignNameID}
                                          name="allCampaignStatus"
                                          onChange={this.selectIndividualCampaignStatus.bind(
                                            this,
                                            item.campaignNameID
                                          )}
                                        />
                                        <label
                                          htmlFor={"i" + item.campaignNameID}
                                        >
                                          {item.campaignName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen}
                        // onClick={this.handleChangeTab.bind(this,2)}
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
                  <div className="store-totalresultcircle">
                    <label className="totalresult">Total Result</label>
                    <span className="totalresultnumber">1242</span>
                  </div>
                </div>
                <div className="col-md-6 rname">
                  <div className="ranmetext">
                    <label className="renametext">Report Name</label>
                    <input
                      className="no-bg"
                      type="text"
                      placeholder="Open Tickets"
                      maxLength={25}
                    />
                  </div>
                  <div className="buttonschdulesave">
                    <button className="Schedulenext">SCHEDULE</button>
                  </div>
                  <div className="buttonschdulesave1">
                    <button
                      className="Schedulenext1"
                      onClick={this.handleNextPopupClose}
                    >
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
          <div className="store-settings-cntr reactreport">
            <div style={{ backgroundColor: "#fff" }}>
              <ReactTable
                data={datareport}
                columns={columnsreport}
                // resizable={false}
                defaultPageSize={5}
                showPagination={false}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreReports;
