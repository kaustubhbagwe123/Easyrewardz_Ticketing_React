import React, { Component } from "react";
import Demo from "./../../../store/Hashtag.js";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Select from "react-select";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      getID: 0,
      userData: [],
      selectUserName: "",
      selectFirstName: "",
      selectLastName: "",
      selectMobile: "",
      selectEmail: "",
      brandData: [],
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      DesignationData: [],
      CRMRoleData: [],
      ReporteeDesignData: [],
      ReportToData: [],
      AgentData: [],
      selectedBrand: [],
      selectedCategory: [],
      selectedSubCategory: [],
      selectedIssueType: [],
      GetUserData:[],
      editBrand: [],
      EditBrandData: [],
      selectedDesignation: 0,
      selectedCopyEscalation: false,
      selectedAssignEscalation: false,
      selectedSupervisorAgent: "",
      selectedCRMRoles: 0,
      selectedReporteeDesign: 0,
      selectedReportTO: 0,
      selectedAgent: 0,
      selectedStatus: false,
      multibrandIDs: "",
      multicategoryIDs: "",
      multisubcategoryIDs: "",
      editreporteeDesign: 0,

      userEditData: {}


    };
    this.handleUserList = this.handleUserList.bind(this);
    this.handleOnChangeUserData = this.handleOnChangeUserData.bind(this);
    this.handleAddPersonalDetails = this.handleAddPersonalDetails.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleGetCRMRoleList = this.handleGetCRMRoleList.bind(this);
    this.handleGetReporteedesignationList = this.handleGetReporteedesignationList.bind(this);
    this.handleGetReportTOList = this.handleGetReportTOList.bind(this);
    this.handleAddProfileDetails = this.handleAddProfileDetails.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handleAddMapCategory = this.handleAddMapCategory.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleGetUserListByID=this.handleGetUserListByID.bind(this);
  }
  componentDidMount() {
    debugger;
    this.handleUserList();
    this.handleGetBrandList();

    this.handleGetDesignationList();
    this.handleGetCRMRoleList();
   
  }

  setUserEditData(editdata) {
   
    debugger;
    var userEditData = editdata;
    userEditData.user_Id = editdata.userId;
    userEditData.user_Name = editdata.userName;
    userEditData.first_Name = editdata.firstName;
    userEditData.last_Name = editdata.lastName;
    userEditData.mobile_Number = editdata.mobileNumber;
    userEditData.email_ID = editdata.emailID;
    userEditData.designation_ID = editdata.designationID;
    userEditData.reportee_ID = editdata.reporteeID;
    userEditData.brand_IDs = editdata.brandIDs;
    userEditData.category_IDs = editdata.categoryIDs;
    userEditData.subCategory_IDs = editdata.subCategoryIDs;
    userEditData.issueType_IDs = editdata.issueTypeIDs;
    userEditData.is_Copy_Escalation = editdata.is_CopyEscalation;
    userEditData.is_Assign_Escalation = editdata.is_AssignEscalation;
    userEditData.role_ID = editdata.roleID;
    userEditData.assign_ID = editdata.assignID;
    userEditData.is_Active = editdata.isActive;


    this.setState({
      userEditData
    })

  }

  handleSuperAgentValue = e => {
    debugger;
    let subjectvalue = e.currentTarget.value;
    this.setState({ selectedSupervisorAgent: subjectvalue });
    setTimeout(() => {
      if (this.state.selectedSupervisorAgent === "agent") {
        this.handleGetAgentList();
      }
    }, 1);
  };
  setEscn = e => {
    debugger;

    this.setState({ [e.target.name]: e.currentTarget.checked });

  };



  handleOnChangeEditData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    this.setState({
      EditTemp: data
    });
    setTimeout(() => {
      if (this.state.userEditData.designation_ID) {
        this.state.editreporteeDesign=this.state.userEditData.designation_ID;
        this.handleGetReporteedesignationList();

      }
    }, 1);
    setTimeout(() => {
      if (this.state.editreporteeDesign) {
        this.handleGetReportTOList();
      }
    }, 1);
  };

  handleOnChangeUserData = e => {
    debugger;


    this.setState({
      [e.target.name]: e.target.value,

    });
    setTimeout(() => {
      if (this.state.selectedDesignation) {
        this.handleGetReporteedesignationList();

      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedReporteeDesign) {
        this.handleGetReportTOList();
      }
    }, 1);
  };
  handleBrandChange = e => {
    debugger;

    this.setState({ selectedBrand: e });
    setTimeout(() => {
      if (this.state.selectedBrand) {
        this.handleGetCategoryList();
      }
    }, 1);
  };
  handleEditBrandChange (e) {
    debugger
   
    this.setState({ selectedBrand: e });
    // setTimeout(() => {
    //   if (this.state.editBrand) {
    //     this.handleGetCategoryList();
    //   }
    // }, 1);

  };
  handleCategoryChange = e => {
    debugger;

    this.setState({ selectedCategory: e });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
  };
  handleSubCategoryChange = e => {
    debugger;

    this.setState({ selectedSubCategory: e });
    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
  };
  handleIssueTypeChange = e => {
    debugger;

    this.setState({ selectedIssueType: e });
  };
  handleGetCRMRoleList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoleDropdown",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let crmroledata = res.data.responseData;

      self.setState({
        CRMRoleData: crmroledata

      });
    });
  }
  handleGetDesignationList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let designationdata = res.data.responseData;

      self.setState({
        DesignationData: designationdata

      });
    });
  }
  handleGetReporteedesignationList() {
    debugger;

    let self = this;

    let id = this.state.selectedDesignation;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetReporteeDesignation",
      headers: authHeader(),
      params: {
        DesignationID: id
      }
    }).then(function (res) {
      debugger;
      let reportdesign = res.data.responseData;

      self.setState({
        ReporteeDesignData: reportdesign

      });
    });
  }
  handleGetReportTOList() {
    debugger;
    let id = this.state.selectedReporteeDesign;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetReportTo",
      headers: authHeader(),
      params: {
        DesignationID: id
      }
    }).then(function (res) {
      debugger;
      let reportto = res.data.responseData;

      self.setState({
        ReportToData: reportto

      });
    });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ brandData: data });
      } else {
        self.setState({ brandData: [] });
      }
    });
  }
  handleGetCategoryList() {
    debugger;

    let self = this;
    var finalBrandId = "";

    if (this.state.selectedBrand !== null) {
      for (let i = 0; i < this.state.selectedBrand.length; i++) {
        finalBrandId += this.state.selectedBrand[i].brandID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryListByMultiBrandID",
      headers: authHeader(),
      params: {
        BrandIDs: finalBrandId
      }
    }).then(function (res) {
      debugger;
      let CategoryData = res.data.responseData;

      self.setState({
        CategoryData: CategoryData,
        multibrandIDs: finalBrandId
      });
    });
  }
  handleGetSubCategoryList() {
    debugger;
    let self = this;
    var finalCategoryId = "";

    if (this.state.selectedCategory !== null) {
      for (let i = 0; i < this.state.selectedCategory.length; i++) {
        finalCategoryId += this.state.selectedCategory[i].categoryID + ",";
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByMultiCategoryID",
      headers: authHeader(),
      params: {
        CategoryIDs: finalCategoryId
      }
    }).then(function (res) {
      debugger;
      var SubCategoryData = res.data.responseData;
      self.setState({
        SubCategoryData: SubCategoryData,
        multicategoryIDs: finalCategoryId
      });
    });
  }
  handleGetIssueTypeList() {
    debugger;
    let self = this;
    var finalSubCategoryId = "";

    if (this.state.selectedSubCategory !== null) {
      for (let i = 0; i < this.state.selectedSubCategory.length; i++) {
        finalSubCategoryId += this.state.selectedSubCategory[i].subCategoryID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeListByMultiSubCategoryID",
      headers: authHeader(),
      params: {
        SubCategoryIDs: finalSubCategoryId
      }
    }).then(function (res) {
      debugger;
      let IssueTypeData = res.data.responseData;
      self.setState({
        IssueTypeData: IssueTypeData,
        multisubcategoryIDs: finalSubCategoryId
      });
    });
  }
  handleGetAgentList() {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getagentlist",
      headers: authHeader(),

    }).then(function (res) {
      debugger;
      let agentdata = res.data.responseData;
      self.setState({ AgentData: agentdata });
    });
  }
  handleUserList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/User/GetUserListData",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      var userdata = res.data.responseData;

      self.setState({
        userData: userdata
      });
    });
  }

  handleGetUserListByID(id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserDetailsById",
      headers: authHeader(),
      params:{
        UserID:id
      }
    }).then(function (res) {
      debugger;
      var userdata = res.data.responseData;

      self.setState({
        GetUserData: userdata
      });
      self.setUserEditData(userdata);
    });
  }

  handleAddPersonalDetails() {
    debugger;
    let self = this;
    var json = {
      UserName: this.state.selectUserName,
      FirstName: this.state.selectFirstName,
      LastName: this.state.selectLastName,
      MobileNo: this.state.selectMobile,
      EmailID: this.state.selectEmail

    };
    axios({
      method: "post",
      url: config.apiUrl + "/User/AddUserPersonalDetail",
      headers: authHeader(),
      data: json
    }).then(function (res) {
      debugger;
      let id = res.data.responseData;
      let Msg = res.data.message;
      if (Msg === "Success") {

        NotificationManager.success("Record Saved successfully.");

      }
      self.setState({
        selectUserName: "",
        selectFirstName: "",
        selectLastName: "",
        selectMobile: "",
        selectEmail: "",
        getID: id
      });
      self.handleUserList();
    });
  }

  handleAddProfileDetails() {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/User/AddUserProfileDetail",
      headers: authHeader(),
      params: {
        UserID: this.state.getID,
        DesignationID: this.state.selectedDesignation,
        ReportTo: this.state.selectedReportTO
      }
    }).then(function (res) {
      debugger;

      let Msg = res.data.message;
      if (Msg === "Success") {

        NotificationManager.success("Record Saved successfully.");

      }
      else {
        NotificationManager.error("Please Add Personal Details.");
      }
      self.setState({
        selectedDesignation: 0,
        selectedReportTO: 0
      });
      self.handleUserList();
    });
  }

  handleAddMapCategory() {
    debugger;
    let self = this;
    var finalIssueTypeId = "";
   


    if (this.state.selectedIssueType !== null) {
      for (let i = 0; i < this.state.selectedIssueType.length; i++) {
        finalIssueTypeId += this.state.selectedIssueType[i].issueTypeID + ",";
      }
    }
    var activeStatus = 0;
    var copyescn = 0;
    var assignescn = 0;
    var SuperAgent = 0;
    var superAgentValue = this.state.selectedSupervisorAgent;
    if (superAgentValue === "agent") {
      SuperAgent = 1;
    }
    else {
      SuperAgent = 0;
    }
    var CopyE = this.state.selectedCopyEscalation;
    var AssignE = this.state.selectedAssignEscalation;
    if (CopyE === true && AssignE === false) {
      copyescn = 1;
      assignescn = 0;
    }
    else if (CopyE === false && AssignE === true) {
      copyescn = 0;
      assignescn = 1;
    }
    else if (CopyE === true && AssignE === true) {
      copyescn = 1;
      assignescn = 1;
    }
    else if (CopyE === false && AssignE === false) {
      copyescn = 0;
      assignescn = 0;
    }

    var status = this.state.selectedStatus;
    if (status === "true") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }

    var json = {
      UserId: this.state.getID,
      BrandIds: this.state.multibrandIDs,
      categoryIds: this.state.multicategoryIDs,
      subCategoryIds: this.state.multisubcategoryIDs,
      IssuetypeIds: finalIssueTypeId,
      RoleID: this.state.selectedCRMRoles,
      IsCopyEscalation: copyescn,
      IsAssignEscalation: assignescn,
      IsAgent: SuperAgent,
      IsActive: activeStatus,
      EscalateAssignToId: this.state.selectedAgent

    }
    axios({
      method: "post",
      url: config.apiUrl + "/User/Mapcategory",
      headers: authHeader(),
      data: json
    }).then(function (res) {
      debugger;

      let Msg = res.data.message;
      if (Msg === "Success") {

        NotificationManager.success("Record Saved successfully.");

      }
      self.setState({
        selectUserName: "",
        selectFirstName: "",
        selectLastName: "",
        selectMobile: "",
        selectEmail: "",
        getID: 0
      });
      self.handleUserList();
    });
  }
  handleDeleteUser(id) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/User/DeleteUser",
      headers: authHeader(),
      params: {
        userID: id
      }
    }).then(function (res) {
      debugger;
      let Msg = res.data.message;
      if (Msg === "Success") {
        NotificationManager.success("Record Deleted successfully.");
        self.handleUserList();
      }

    });
  }

  handleUpdateUser(id) {

    debugger;
    let self = this;
    var json = {
      UserID: id,
      DesignationID: this.state.userEditData.designation_ID,
      ReporteeID: this.state.userEditData.reportee_ID,
      UserName: this.state.userEditData.userName,
      EmailID: this.state.userEditData.email_ID,
      MobileNo: this.state.userEditData.mobile_Number,
      FirstName: this.state.userEditData.first_Name,
      LastName: this.state.userEditData.last_Name,
      BrandIds: "",
      categoryIds: "",
      subCategoryIds: "",
      IssuetypeIds: "",
      RoleID: "",
      IsCopyEscalation: this.state.userEditData.email_ID,
      IsAssignEscalation: this.state.userEditData.email_ID,
      IsAgent: this.state.userEditData.email_ID,
      EscalateAssignToId: this.state.userEditData.assign_ID,
      IsActive: this.state.userEditData.is_Active,

    };
    axios({
      method: "post",
      url: config.apiUrl + "/User/EditUserDetails",
      headers: authHeader(),
      data: null
    }).then(function (res) {
      debugger;
      let Msg = res.data.message;
      if (Msg === "Success") {
        NotificationManager.success("Record Updated successfully.");

      }
      else {
        NotificationManager.error("Record not Selected OR Sequence is Wrong")
      }

      self.handleUserList();

    }).catch(error => {
      console.log(error)
    });
  }


  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };

  render() {

    const dataTickUser = this.state.userData

    const columnsTickUser = [
      {
        Header: (
          <span>
            User Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "userName",
        Cell: row => <span>{row.original.userName}</span>
      },
      {
        Header: (
          <span>
            Mobile No.
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "mobileNumber",
        Cell: row => <span>{row.original.mobileNumber}</span>
      },
      {
        Header: (
          <span>
            Email ID
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "emailID",
        Cell: row => <span>{row.original.emailID}</span>
      },
      {
        Header: (
          <span>
            Designation
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "designation",
        Cell: row => {
          var ids = row.original["userId"];
          return (
            <div>
              <span>
                {row.original.designation}
                <Popover content={<>
                  <div className=" row d-flex">
                    <div className="col-md-6">

                      <p className="title">Reportee Designation: <b>Admin</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">Issue Type: <b>{row.original.issueTypeNames}</b></p>
                    </div>
                  </div>

                  <div className="row d-flex">
                    <div className="col-md-6">

                      <p className="title">Report To: <b>{row.original.reportTo}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">CRM Role: <b>{row.original.crmRoleName}</b></p>
                    </div>

                  </div>

                  <div className="row d-flex">
                    <div className="col-md-6">

                      <p className="title">Brand: <b>{row.original.brandNames}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">Copy Escalation: <b>{row.original.is_CopyEscalation}</b></p>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-md-6">

                      <p className="title">Category: <b>{row.original.categoryNames}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">Assign Escalation: <b>{row.original.assignEscalation}</b></p>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-md-6">

                      <p className="title">Sub Category: <b>{row.original.subCategoryNames}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">Agent Name: 12 March 2018</p>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-md-6">

                      <p className="title">Created By: <b>{row.original.createdBy}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">Updated By: <b>{row.original.updatedBy}</b></p>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-md-6">

                      <p className="title">Created Date: <b>{row.original.createdDate}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p className="sub-title mx-2">Updated Date: <b>{row.original.updatedDate}</b></p>
                    </div>
                  </div>
                </>} placement="bottom" >
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
        Header: <span>Actions</span>,
        accessor: "userId",
        Cell: row => {
          var ids = row.original["userId"];
          return (

            <>
              <span>

                <Popover
                  content={<div className="d-flex general-popover popover-body">
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
                        <button className="butn" onClick={this.handleDeleteUser.bind(this, row.original.userId)}>Delete</button>
                      </div>
                    </div>
                  </div>}
                  placement="bottom"
                  trigger="click"
                >
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}

                  />
                </Popover>
                <Popover
                  content={
                    <div className="edtpadding EditButtonUSer">
                                        <div className="">
                                          <label className="popover-header-text">EDIT USER</label>
                                        </div>
                    
                                        <div className="right-sect-div right-sect-collapse">
                                          <div className="collapse-cntr">
                                            <div className="pop-over-div">
                                              <a
                                                className="collapse-title mx-0"
                                                data-toggle="collapse"
                                                href="#personal-detailsNew"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="personal-detailsNew"
                                              >
                                                Personal Details
                                            </a>
                                            </div>
                                            <div className="multi-collapse show" id="personal-detailsNew">
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">User Name</label>
                                                <input type="text" className="txt-edit-popover" maxLength={25}
                                                  name="user_Name"
                                                  value={this.state.userEditData.user_Name}
                                                  onChange={this.handleOnChangeEditData}
                                                />
                                              </div>
                                              <div className="pop-over-div">
                                                <label>First Name</label>
                                                <input type="text" maxLength={25}
                                                  name="first_Name"
                                                  value={this.state.userEditData.first_Name}
                                                  onChange={this.handleOnChangeEditData}
                                                />
                                              </div>
                                              <div className="pop-over-div">
                                                <label>Last Name</label>
                                                <input type="text" maxLength={25}
                                                  name="last_Name"
                                                  value={this.state.userEditData.last_Name}
                                                  onChange={this.handleOnChangeEditData}
                                                />
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Mobile Number</label>
                                                <input type="text" className="txt-edit-popover" maxLength={10}
                                                  name="mobile_Number"
                                                  value={this.state.userEditData.mobile_Number}
                                                  onChange={this.handleOnChangeEditData}
                                                />
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Email ID</label>
                                                <input type="text" className="txt-edit-popover" maxLength={100}
                                                  name="email_ID"
                                                  value={this.state.userEditData.email_ID}
                                                  onChange={this.handleOnChangeEditData}
                                                />
                                              </div>
                                              <div className="pop-over-div">
                                                <button
                                                  data-target="#profile-detailsNEW1"
                                                  data-toggle="collapse"
                                                  className="butn"
                                                >
                                                  SAVE &amp; NEXT
                                                      </button>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="collapse-cntr">
                                            <a
                                              className="collapse-title mx-0"
                                              data-toggle="collapse"
                                              href="#profile-detailsNEW1"
                                              role="button"
                                              aria-expanded="false"
                                              aria-controls="profile-detailsNEW1"
                                            >
                                              Profile Details
                                                  </a>
                                            <div
                                              className="collapse multi-collapse"
                                              id="profile-detailsNEW1"
                                            >
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">User Designation</label>
                                                <select className="add-select-category"
                                                  name="designation_ID"
                                                  value={this.state.userEditData.designation_ID}
                                                  onChange={this.handleOnChangeEditData}
                                                >
                                                  <option>Select Designation</option>
                                                  {this.state.DesignationData !== null &&
                                                    this.state.DesignationData.map((item, i) => (
                                                      <option key={i} value={item.designationID}>
                                                        {item.designationName}
                                                      </option>
                                                    ))}
                                                </select>
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Reportee Designation</label>
                                                <select className="add-select-category"
                                                  name="editreporteeDesign"
                                                  value={this.state.editreporteeDesign}
                                                  onChange={this.handleOnChangeEditData}
                                                >
                                                  <option>Select Reportee Designation</option>
                                                  {this.state.ReporteeDesignData !== null &&
                                                    this.state.ReporteeDesignData.map((item, i) => (
                                                      <option key={i} value={item.designationID}>
                                                        {item.designationName}
                                                      </option>
                                                    ))}
                                                </select>
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Report To</label>
                                                <select className="add-select-category"
                                                  name="reportee_ID"
                                                  value={this.state.userEditData.reportee_ID}
                                                  onChange={this.handleOnChangeEditData}
                                                >
                                                  <option>Select Report To</option>
                                                  {this.state.ReportToData !== null &&
                                                    this.state.ReportToData.map((item, i) => (
                                                      <option key={i} value={item.user_ID}>
                                                        {item.agentName}
                                                      </option>
                                                    ))}
                                                </select>
                                              </div>
                                              <div className="pop-over-div">
                                                <button
                                                  data-target="#mapped-categoryNew"
                                                  data-toggle="collapse"
                                                  className="butn"
                                                >
                                                  SAVE &amp; NEXT
                                                      </button>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="collapse-cntr">
                                            <a
                                              className="collapse-title mx-0"
                                              data-toggle="collapse"
                                              href="#mapped-categoryNew"
                                              role="button"
                                              aria-expanded="false"
                                              aria-controls="mapped-categoryNew"
                                            >
                                              Mapped Category
                                                  </a>
                                            <div
                                              className="collapse multi-collapse"
                                              id="mapped-categoryNew"
                                            >
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Brand</label>
                                                { <Select
                                                  getOptionLabel={option => option.brandName}
                                                  getOptionValue={option => option.brandID}
                                                  options={this.state.brandData}
                                                  placeholder="Select"
                                                  // menuIsOpen={true}
                                                  closeMenuOnSelect={false}
                                                  name="editBrand"
                                                  onChange={this.handleEditBrandChange}
                                                  value={this.state.editBrand}
                                                  // showNewOptionAtTop={false}
                                                  isMulti
                                                /> }
                                                {/*<Select
                                                  getOptionLabel={option => option.brandName}
                                                  getOptionValue={option => option.brandID}
                                                  options={this.state.brandData}
                                                  placeholder="Select"
                                                  // menuIsOpen={true}
                                                  closeMenuOnSelect={false}
                                                  name="selectedBrand"
                                                  onChange={this.handleEditBrandChange.bind(this)}
                                                  value={this.state.selectedBrand}
                                                  // showNewOptionAtTop={false}
                                                  isMulti
                                                />*/}
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Categories</label>
                                                <select className="txt-edit-popover">
                                                  <option>Compliant</option>
                                                  <option>Compliant</option>
                                                  <option>Compliant</option>
                                                </select>
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Sub Categories</label>
                                                <select className="txt-edit-popover">
                                                  <option>Payments</option>
                                                  <option>Payments</option>
                                                  <option>Payments</option>
                                                </select>
                                              </div>
                                              <div className="pop-over-div">
                                                <label className="edit-label-1">Issue Type</label>
                                                <select className="txt-edit-popover">
                                                  <option>Not Processed</option>
                                                  <option>Not Processed</option>
                                                  <option>Not Processed</option>
                                                </select>
                                              </div>
                                              <div className="mapped-cate-extra">
                                                <div className="pop-over-div">
                                                  <label className="edit-label-1">CRM Role</label>
                                                  <select className="add-select-category"
                                                    name="role_ID"
                                                    value={this.state.userEditData.role_ID}
                                                    onChange={this.handleOnChangeEditData}
                                                  >
                                                    <option>Select Designation</option>
                                                    {this.state.CRMRoleData !== null &&
                                                      this.state.CRMRoleData.map((item, i) => (
                                                        <option key={i} value={item.crmRoleID}>
                                                          {item.roleName}
                                                        </option>
                                                      ))}
                                                  </select>
                                                </div>
                                                <div className="pop-over-div escalation-options">
                                                  <div className="filter-checkbox">
                                                    <input
                                                      type="checkbox"
                                                      id="copy-esc1"
                                                      name="is_Copy_Escalation"
                                                      value={this.state.userEditData.is_Copy_Escalation}
                                                      onChange={this.setEscn}
                                                    />
                                                    <label htmlFor="copy-esc1">Copy Escalation</label>
                                                  </div>
                                                  <div className="filter-checkbox">
                                                    <input
                                                      type="checkbox"
                                                      id="assign-esc1"
                                                      name="is_Assign_Escalation"
                                                      value={this.state.userEditData.is_Assign_Escalation}
                                                      onChange={this.setEscn}
                                                    />
                                                    <label htmlFor="assign-esc1">
                                                      Assign Escalation
                                                          </label>
                                                  </div>
                                                  <div className="sup-agent-cntr">
                                                    <div className="status-options">
                                                      <input
                                                        type="radio"
                                                        name="supervisor-agent"
                                                        id="supervisor1"
                                                        value="supervisor"
                                                        onChange={this.handleSuperAgentValue}
                                                      />
                                                      <label
                                                        htmlFor="supervisor1"
                                                        className="logout-label"
                                                      >
                                                        Supervisor
                                                            </label>
                                                    </div>
                                                    <div className="status-options">
                                                      <input
                                                        type="radio"
                                                        name="supervisor-agent"
                                                        id="agent1"
                                                        value="agent"
                                                        onChange={this.handleSuperAgentValue}
                                                      />
                                                      <label htmlFor="agent1" className="logout-label">
                                                        Agent
                                                            </label>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="pop-over-div">
                                                  <label className="edit-label-1">Select Agent</label>
                                                  <select className="add-select-category"
                                                    name="assign_ID"
                                                    value={this.state.userEditData.assign_ID}
                                                    onChange={this.handleOnChangeEditData}
                    
                                                  >
                                                    <option>Select Agent</option>
                                                    {this.state.AgentData !== null &&
                                                      this.state.AgentData.map((item, i) => (
                                                        <option key={i} value={item.user_ID}>
                                                          {item.agentName}
                                                        </option>
                                                      ))}
                                                  </select>
                                                </div>
                                                <div className="pop-over-div">
                                                  <label className="edit-label-1">Status</label>
                                                  <select className="txt-edit-popover"
                                                    name="is_Active"
                                                    value={this.state.userEditData.is_Active}
                                                    onChange={this.handleOnChangeEditData}
                                                  >
                    
                                                    <option value="true">Active</option>
                                                    <option value="false">Inactive</option>
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="pop-over-div">
                                                <button className="butn">ADD</button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                    
                    
                                        <br />
                                        <div>
                                          <a className="pop-over-cancle" href={Demo.BLANK_LINK}>CANCEL</a>
                                          {/* <label className="pop-over-cancle">CANCEL</label> */}
                                          <button className="pop-over-button" onClick={this.handleUpdateUser.bind(this, row.original.userId)}>
                                            SAVE
                                        </button>
                                        </div>
                                      </div> }
                  
               
                  placement="bottom"
                  trigger="click"
                >
                  <button className="react-tabel-button editre" id="p-edit-pop-2"
                    onClick={this.handleGetUserListByID.bind(this, row.original.userId)}
                  >
                    EDIT
                    {/* <label className="Table-action-edit-button-text">
                      EDIT
                    </label> */}
                  </button>
                </Popover>
              </span>
            </>
          );
        }
      }
    ];








    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Users
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketUserReact">
                  <ReactTable
                    data={dataTickUser}
                    columns={columnsTickUser}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={false}
                  />



                  <div className="position-relative">
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
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="right-sect-div right-sect-collapse">
                  <h3>Create Users</h3>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="true"
                      aria-controls="personal-details"
                    >
                      Personal Details
                    </a>
                    <div className="multi-collapse show" id="personal-details">
                      <div className="div-cntr">
                        <label>User Name</label>
                        <input type="text" maxLength={25}
                          name="selectUserName"
                          value={this.state.selectUserName}
                          onChange={this.handleOnChangeUserData}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>First Name</label>
                        <input type="text" maxLength={25}
                          name="selectFirstName"
                          value={this.state.selectFirstName}
                          onChange={this.handleOnChangeUserData}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Last Name</label>
                        <input type="text" maxLength={25}
                          name="selectLastName"
                          value={this.state.selectLastName}
                          onChange={this.handleOnChangeUserData}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Mobile Number</label>
                        <input type="text" maxLength={10}
                          name="selectMobile"
                          value={this.state.selectMobile}
                          onChange={this.handleOnChangeUserData}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Email ID</label>
                        <input type="text" maxLength={100}
                          name="selectEmail"
                          value={this.state.selectEmail}
                          onChange={this.handleOnChangeUserData}
                        />
                      </div>
                      <div className="btn-coll">
                        <button
                          //data-target="#profile-details"
                          //data-toggle="collapse"
                          className="butn"
                          onClick={this.handleAddPersonalDetails.bind(this)}
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#profile-details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="profile-details"
                    >
                      Profile Details
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="profile-details"
                    >
                      <div className="div-cntr">
                        <label>User Designation</label>
                        <select className="add-select-category"
                          name="selectedDesignation"
                          value={this.state.selectedDesignation}
                          onChange={this.handleOnChangeUserData}
                        >
                          <option>Select Designation</option>
                          {this.state.DesignationData !== null &&
                            this.state.DesignationData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Reportee Designation</label>
                        <select className="add-select-category"
                          name="selectedReporteeDesign"
                          value={this.state.selectedReporteeDesign}
                          onChange={this.handleOnChangeUserData}
                        >
                          <option>Select Reportee Designation</option>
                          {this.state.ReporteeDesignData !== null &&
                            this.state.ReporteeDesignData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="div-cntr">
                        <label>Report To</label>
                        <select className="add-select-category"
                          name="selectedReportTO"
                          value={this.state.selectedReportTO}
                          onChange={this.handleOnChangeUserData}
                        >
                          <option>Select Report To</option>
                          {this.state.ReportToData !== null &&
                            this.state.ReportToData.map((item, i) => (
                              <option key={i} value={item.user_ID}>
                                {item.agentName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="btn-coll">
                        <button
                          //data-target="#mapped-category"
                          //data-toggle="collapse"
                          className="butn"
                          onClick={this.handleAddProfileDetails.bind(this)}
                        >
                          SAVE &amp; NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#mapped-category"
                      role="button"
                      aria-expanded="false"
                      aria-controls="mapped-category"
                    >
                      Mapped Category
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="mapped-category"
                    >
                      <div className="div-cntr">
                        <label>Brand</label>
                        <Select
                          getOptionLabel={option => option.brandName}
                          getOptionValue={option => option.brandID}
                          options={this.state.brandData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          closeMenuOnSelect={false}
                          name="selectedBrand"
                          onChange={this.handleBrandChange}
                          value={this.state.selectedBrand}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Categories</label>

                        <Select
                          getOptionLabel={option => option.categoryName}
                          getOptionValue={option => option.categoryID}
                          options={this.state.CategoryData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          name="selectedCategory"
                          closeMenuOnSelect={false}
                          onChange={this.handleCategoryChange}
                          value={this.state.selectedCategory}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Sub Categories</label>

                        <Select
                          getOptionLabel={option => option.subCategoryName}
                          getOptionValue={option => option.subCategoryID}
                          options={this.state.SubCategoryData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          name="selectedSubCategory"
                          closeMenuOnSelect={false}
                          onChange={this.handleSubCategoryChange}
                          value={this.state.selectedSubCategory}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                      </div>
                      <div className="div-cntr">
                        <label>Issue Type</label>

                        <Select
                          getOptionLabel={option => option.issueTypeName}
                          getOptionValue={option => option.issueTypeID}
                          options={this.state.IssueTypeData}
                          placeholder="Select"
                          // menuIsOpen={true}
                          name="selectedIssueType"
                          closeMenuOnSelect={false}
                          onChange={this.handleIssueTypeChange}
                          value={this.state.selectedIssueType}
                          // showNewOptionAtTop={false}
                          isMulti
                        />
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>CRM Role</label>
                          <select className="add-select-category"
                            name="selectedCRMRoles"
                            value={this.state.selectedCRMRoles}
                            onChange={this.handleOnChangeUserData}
                          >
                            <option>Select Designation</option>
                            {this.state.CRMRoleData !== null &&
                              this.state.CRMRoleData.map((item, i) => (
                                <option key={i} value={item.crmRoleID}>
                                  {item.roleName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="div-cntr escalation-options">
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="copy-esc"
                              name="selectedCopyEscalation"
                              value={this.state.selectedCopyEscalation}
                              onChange={this.setEscn}

                            />
                            <label htmlFor="copy-esc">Copy Escalation</label>
                          </div>
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="assign-esc"
                              name="selectedAssignEscalation"
                              value={this.state.selectedAssignEscalation}
                              onChange={this.setEscn}

                            />
                            <label htmlFor="assign-esc">
                              Assign Escalation
                            </label>
                          </div>
                          <div className="sup-agent-cntr">
                            <div className="status-options">
                              <input
                                type="radio"
                                name="selectedSupervisorAgent"
                                id="supervisor"
                                value="supervisor"
                                onChange={this.handleSuperAgentValue}
                              />
                              <label
                                htmlFor="supervisor"
                                className="logout-label"
                              >
                                Supervisor
                              </label>
                            </div>
                            <div className="status-options">
                              <input
                                type="radio"
                                name="selectedSupervisorAgent"
                                id="agent"
                                value="agent"
                                onChange={this.handleSuperAgentValue}
                              />
                              <label htmlFor="agent" className="logout-label">
                                Agent
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="div-cntr">
                          <label>Select Agent</label>
                          <select className="add-select-category"
                            name="selectedAgent"
                            value={this.state.selectedAgent}
                            onChange={this.handleOnChangeUserData}

                          >
                            <option>Select Agent</option>
                            {this.state.AgentData !== null &&
                              this.state.AgentData.map((item, i) => (
                                <option key={i} value={item.user_ID}>
                                  {item.agentName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="div-cntr">
                          <label>Status</label>
                          <select
                            name="selectedStatus"
                            value={this.state.selectedStatus}
                            onChange={this.handleOnChangeUserData}
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>

                          </select>
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button className="butn"
                          onClick={this.handleAddMapCategory.bind(this)}
                        >ADD</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    className="file-upload d-none"
                    type="file"
                    onChange={this.fileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    onDrop={this.fileDrop}
                    onDragOver={this.fileDragOver}
                    onDragEnter={this.fileDragEnter}
                  >
                    <div className="file-icon">
                      <img src={FileUpload} alt="file-upload" />
                    </div>
                    <span>Add File</span> or Drop File here
                  </label>
                  {this.state.fileName && (
                    <div className="file-info">
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <div className="del-file" id="del-file-1">
                            <img src={DelBlack} alt="delete-black" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del-file-1"
                            className="general-popover delete-popover"
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={DelBigIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                        <div>
                          <span className="file-size">122.6kb</span>
                        </div>
                      </div>
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <a className="file-retry" href={Demo.BLANK_LINK}>
                            Retry
                          </a>
                        </div>
                        <div>
                          <span className="file-failed">Failed</span>
                        </div>
                      </div>
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name pr-0">
                            {this.state.fileName}
                          </p>
                        </div>
                        <div>
                          <div className="d-flex align-items-center mt-2">
                            <ProgressBar className="file-progress" now={60} />
                            <div className="cancel-upload">
                              <img src={UploadCancel} alt="upload cancel" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="butn">ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
