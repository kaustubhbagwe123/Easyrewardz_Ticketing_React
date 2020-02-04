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
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ClaimStatus from "./../../ClaimStatus";
import TaskStatus from "./../../TaskStatus";
import TicketStatus from "./../../TicketStatus";


class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      ReportCreateDate: "",
      ReportLastDate: "",
      ChatDate: "",
      tabIndex:0,
      ReportData:[],
      brandData:[],
      CategoryData:[],
      SubCategoryData:[],
      IssueTypeData:[],
      TicketSourceData:[],
      TicketPriorityData:[],
      AssignToData:[],
      DepartmentData:[],
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      TicketStatusData: TicketStatus(),
      selectBrand:0,
      selectedCategory:0,
      selectedSubCategory:0,
      selectedIssueType:0,
      selectedClaimID:"",
      selectedWithClaim:"no",
      selectedClaimStatus: 0,
      selectedWithTaskAll:"",
      selectedTaskStatus:0,
      selectedClaimCategory:0,
      selectedClaimSubCategory:0,
      selectedClaimIssueType:0,
      selectedTicketSource:0,
      selectedInvoiceNo:"",
      selectedEmailID:"",
      selectedTicketID:"",
      selectedMobileNo:"",
      selectedItemID:"",
      selectedPriority:0,
      selectedTaskPriority:0,
      selectedVisitStore:"",
      selectedAssignedTo:0,
      selectedWantVisitStore:"",
      selectedTicketStatus:0,
      selectedVisitStoreAddress:"",
      selectedPurchaseStore:"",
      selectedDepartment:0
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
    this.handleReportList=this.handleReportList.bind(this);
    this.handleDeleteReport=this.handleDeleteReport.bind(this);
    this.handleGetBrandList=this.handleGetBrandList.bind(this);
    this.handleGetCategoryList=this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList=this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList=this.handleGetIssueTypeList.bind(this);
    this.handleGetTicketSourceList=this.handleGetTicketSourceList.bind(this);
    this.handleGetTicketPriorityList=this.handleGetTicketPriorityList.bind(this);
    this.handleAssignTo=this.handleAssignTo.bind(this);
    this.handleGetDepartmentList=this.handleGetDepartmentList.bind(this);
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
  handleAddReportOpen() {
    this.setState({ AddReportPopup: true ,tabIndex :0});
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
  handleReportCreateDate(date) {
    this.setState({ ReportCreateDate: date });
  }
  handleReportLastDate(date) {
    this.setState({ ReportLastDate: date });
  }
  handleChatDate(date) {
    this.setState({ ChatDate: date });
  }
  handleChangeTab(index){
    this.setState({
      tabIndex:index
    })
  }
  setOnChangeReportData = e => {
    debugger;


    this.setState({
      [e.target.name]: e.target.value,

    });
    setTimeout(() => {
      if (this.state.selectedCategory ) {
        this.handleGetSubCategoryList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedClaimCategory ) {
        this.handleGetSubCategoryList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList();
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
    }).then(function(res) {
      debugger;
      let DepartmentData = res.data.responseData;
      self.setState({ DepartmentData: DepartmentData });
    });
  }
  
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
  handleReportList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Report/GetReports",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      var reportdata = res.data.responseData;

      self.setState({
        ReportData: reportdata
      });
    });
  }
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
    }).then(function (res) {
      debugger;
      let Msg = res.data.message;
      if (Msg === "Success") {
        NotificationManager.success("Record Deleted successfully.");
        self.handleReportList();
      }

    });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    }).then(function(res) {
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
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let CategoryData = res.data;
      
      self.setState({
        CategoryData: CategoryData
        
      });
    });
  }

  handleGetSubCategoryList() {
    debugger;
    let self = this;
    
    let cateId =this.state.selectedCategory;
   
    if(this.state.selectedCategory!==0){
      cateId=this.state.selectedCategory;
    }else{
      cateId=this.state.selectedClaimCategory;
    }
      
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: cateId 
      }
    }).then(function(res) {
      debugger;
      var SubCategoryData = res.data.responseData;
      self.setState({
        SubCategoryData: SubCategoryData
      });
    });
  }
  handleGetIssueTypeList() {
    debugger;
    let self = this;
    let subCateId = this.state.selectedSubCategory;
    if(this.state.selectedSubCategory!==0){
      subCateId = this.state.selectedSubCategory;
    }
    else{
      subCateId = this.state.selectedClaimSubCategory;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: subCateId
      }
    }).then(function(res) {
      debugger;
      let IssueTypeData = res.data.responseData;
      self.setState({ IssueTypeData: IssueTypeData });
    });
  }

  render() {
    const datareport = this.state.ReportData;

    const columnsreport = [
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
                <Popover content={<>
        <div>
          <b>
            <p className="title">Created By: {row.original.createdBy}</p>
          </b>
          <p className="sub-title">Created Date: {row.original.createdDate}</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: {row.original.modifiedBy}</p>
          </b>
          <p className="sub-title">Updated Date: {row.original.modifiedDate}</p>
        </div>
      </>} placement="bottom">
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
          <span>
            <img
              src={DownExcel}
              alt="download icon"
              className="downloadaction"
            />
            <Popover content={<div className="d-flex general-popover popover-body">
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
            <button className="butn" onClick={this.handleDeleteReport.bind(this,row.original.reportID)}  >Delete</button>
          </div>
        </div>
      </div>} placement="bottom" trigger="click">
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    
                  />
                </Popover>
            
            <button className="react-tabel-button editre" id="p-edit-pop-2">
            EDIT
              {/* <label className="Table-action-edit-button-text">EDIT</label> */}
            </button>
          </span>
        )
      }
    ];
    
   
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
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
            modalId="addreport-popup"
            // overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex ===0 && 'active'} `}
                    data-toggle="tab"
                    href="#ticket-tab"
                    role="tab"
                    aria-controls="ticket-tab"
                    aria-selected="true"
                  >
                    Tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex ===1 && 'active'} `}
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
                className={`tab-pane fade ${this.state.tabIndex === 0 && 'show active'}`}
                id="ticket-tab"
                role="tabpanel"
                aria-labelledby="ticket-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Selected Brand</label>
                      <select
                                            className="store-create-select"
                                            value={this.state.selectBrand}
                                            onChange={this.setOnChangeReportData}
                                            name="selectBrand"
                                          >
                                            <option>Select</option>
                                            {this.state.brandData !== null &&
                                              this.state.brandData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.brandID}
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.brandName}
                                                  </option>
                                                )
                                              )}
                                          </select>
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
                    <div className="col-md-3 ticketreport">
                      <label>Invoice No/Sub Order No</label>
                      <input className="no-bg" type="text" maxLength={25} 
                      name="selectedInvoiceNo"
                      value={this.state.selectedInvoiceNo}
                      onChange={this.setOnChangeReportData}
                      />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Customer Email Id</label>
                      <input className="no-bg" type="text" maxLength={100} 
                      name="selectedEmailID"
                      value={this.state.selectedEmailID}
                      onChange={this.setOnChangeReportData}
                      />
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
                      </div>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Ticket Id/title</label>
                      <input className="no-bg" type="text" maxLength={11}
                      name="selectedTicketID"
                      value={this.state.selectedTicketID}
                      onChange={this.setOnChangeReportData}
                      />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Item Id</label>
                      <input className="no-bg" type="text" maxLength={11} 
                       name="selectedItemID"
                       value={this.state.selectedItemID}
                       onChange={this.setOnChangeReportData}
                      />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Customer Mobile No.</label>
                      <input className="no-bg" type="text" maxLength={10}
                       name="selectedMobileNo"
                       value={this.state.selectedMobileNo}
                       onChange={this.setOnChangeReportData}
                      />
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
                    <div className="col-md-3 ticketreport">
                      <label>Visited Store</label>
                      <select
                      name="selectedVisitStore"
                                    value={this.state.selectedVisitStore}
                                    onChange={this.setOnChangeReportData}
                                  >
                                    <option value="yes">
                                     Yes
                                    </option>
                                    <option value="no">
                                     No
                                    </option>
                                  </select>
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Category</label>
                      <select className="add-select-category"
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
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Status</label>
                      <select
                                    value={this.state.selectedTicketStatus}
                                    onChange={this.setOnChangeReportData}
                                  >
                                    <option> Status</option>
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
                    <div className="col-md-3 ticketreport">
                      <label>Want To Visit Store</label>
                      <select
                      name="selectedWantVisitStore"
                      value={this.state.selectedWantVisitStore}
                      onChange={this.setOnChangeReportData}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Sub Category</label>
                      <select className="add-select-category"
                      name="selectedSubCategory"
                  value={this.state.selectedSubCategory}
                  onChange={this.setOnChangeReportData}
                  >
                    <option>Select Subcategory</option>
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
                    <div className="col-md-3 ticketreport">
                      <label>SLA Status</label>
                      <select>
                        <option>2 Days</option>
                        <option>3 Days</option>
                      </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Want To Visit Store Code/Addres</label>
                      <input className="no-bg" type="text" 
                      name="selectedVisitStoreAddress"
                      value={this.state.selectedVisitStoreAddress}
                      onChange={this.setOnChangeReportData}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Issue Type</label>
                      <select className="add-select-category"
                      name="selectedIssueType"
                   value={this.state.selectedIssueType}
                   onChange={this.setOnChangeReportData}
                  >
                    <option>Select IssueType</option>
                    {this.state.IssueTypeData !== null &&
                            this.state.IssueTypeData.map((item, i) => (
                              <option
                                key={i}
                                value={item.issueTypeID}
                               
                              >
                                {item.issueTypeName}
                              </option>
                            ))}
                   
                  </select>
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Claim ID</label>
                      <input className="no-bg" type="text" maxLength={11}
                      name="selectedClaimID"
                      value={this.state.selectedClaimID}
                      onChange={this.setOnChangeReportData}
                      />
                    </div>
                    <div className="col-md-3 ticketreport">
                      <label>Purchase Store</label>
                      <input className="no-bg" type="text"
                       name="selectedPurchaseStore"
                       value={this.state.selectedPurchaseStore}
                       onChange={this.setOnChangeReportData}
                      />
                    </div>
                  </div>
                  <div className="row borderbottom">
                      <div className="col-md-12">

                      </div>
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
                                          <option value="no">
                                             No
                                          </option>
                                          <option value="yes">
                                            Yes
                                          </option>
                                        </select>
                    </div>
                  </div>

                  <div className="row">
                   
                      <div className="col-md-3 ticketreport">
                      <label>Claim Status</label>
                      <select
                      name="selectedClaimStatus"
                          value={this.state.selectedClaimStatus}
                           onChange={this.setOnChangeReportData}
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
                   
                    
                    <div className="col-md-3 ticketreport">
                      <label>Task Status</label>
                      <select
                      name="selectedTaskStatus"
                                              value={
                                                this.state.selectedTaskStatus
                                              }
                                              onChange={this.setOnChangeReportData}
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
                    </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Category</label>
                      <select
                      name="selectedClaimCategory"
                                              value={
                                                this.state.selectedClaimCategory
                                              }
                                              onChange={
                                                this.setOnChangeReportData
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
                    <div className="col-md-3 ticketreport">
                      <label>Task Priority</label>
                      <select
                      name="selectedTaskPriority"
                                    value={this.state.selectedTaskPriority}
                                    onChange={this.setOnChangeReportData}
                                  >
                                    <option>Task Priority</option>
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
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Sub Category</label>
                      <select
                      name="selectedClaimSubCategory"
                                              value={
                                                this.state
                                                  .selectedClaimSubCategory
                                              }
                                              onChange={
                                                this.setOnChangeReportData
                                              }
                                            >
                                              <option>
                                                Claim Sub Category
                                              </option>
                                              {this.state
                                                .SubCategoryData !==
                                                null &&
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
                    <div className="col-md-3 ticketreport">
                      <label>Task Department</label>
                      <select
                      name="selectedDepartment"
                                              value={
                                                this.state.selectedDepartment
                                              }
                                              onChange={this.setOnChangeReportData}
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
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      <label>Claim Issue Type</label>
                      <select
                      name="selectedClaimIssueType"
                                              value={
                                                this.state
                                                  .selectedClaimIssueType
                                              }
                                              onChange={
                                                this.setOnChangeReportData
                                              }
                                            >
                                              <option>Claim Issue Type</option>
                                              {this.state.IssueTypeData !==
                                                null &&
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
                    <div className="col-md-3 ticketreport">
                      <label>Task Function</label>
                      <select>
                        <option>Attandance</option>
                        <option>Attandance1</option>
                      </select>
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button className="nextbutton-text" type="submit" onClick={this.handleChangeTab.bind(this,1)}>
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 1 && 'show active'}`}
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
                    <button className="Schedulenext1">SAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {/* </div> */}
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr reactreport">
          <div style={{backgroundColor:"#fff"}}>
            <ReactTable
              data={datareport}
              columns={columnsreport}
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
        </div>
      </Fragment>
    );
  }
}

export default Reports;
