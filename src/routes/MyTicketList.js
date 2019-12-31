import React, { Component, Fragment } from "react";
import SearchIcon from "./../assets/Images/search-icon.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import Demo from "../store/Hashtag.js";
import Sorting from "./../assets/Images/sorting.png";
import DelSearch from "./../assets/Images/del-search.png";
// import Modal from "react-bootstrap/Modal";
import Modal from "react-responsive-modal";
import MyTicketNew from "./Tabs/MyTicketNew.js";
import MyTicketOpen from "./Tabs/MyTicketOpen.js";
import MyTicketResolved from "./Tabs/MyTicketResolved.js";
import MyTicketReassign from "./Tabs/MyTicketReassign.js";
import MyTicketClosed from "./Tabs/MyTicketClosed.js";
import MyTicketAll from "./Tabs/MyTicketAll.js";
import MyTicketFollowUp from "./Tabs/MyTicketFollowUp.js";
import MyTicketDraft from "./Tabs/MyTicketDraft.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover } from "antd";
import { ProgressBar } from "react-bootstrap";
import { Collapse, CardBody, Card } from "reactstrap";
import CancalImg from "./../assets/Images/cancal blue.png";
import Chat from "./../assets/Images/chat.png";
import csv from "./../assets/Images/csv.png";
import Schedule from "./../assets/Images/schedule.png";
import Assign from "./../assets/Images/assign.png";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../helpers/config";
import TicketStatus from "./TicketStatus";
import SlaDue from "./SlaDue";
import TicketActionType from "./TicketActionType";
import moment from "moment";
import Select from "react-select";

class MyTicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AssignModal: false,
      collapseSearch: false,
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      ByAllCreateDate: "",
      ByAllLastDate: "",
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedDesignation: 0,
      DesignationData: [],
      TicketPriorityData: [],
      ChannelOfPurchaseData: [],
      CategoryData: [],
      // CategoryDataAll: [],
      SubCategoryData: [],
      SubCategoryAllData: [],
      IssueTypeData: [],
      TicketStatusData: TicketStatus(),
      SlaDueData: SlaDue(),
      TicketActionTypeData: TicketActionType(),
      tenantID: 1,
      open: false,
      Schedule: false,
      StatusModel: false,
      CheckBoxChecked: false,
      selectedPriority: 0,
      selectedChannelOfPurchase: [],
      selectedTicketActionType: [],
      selectedTicketStatusByDate: 0,
      selectedSlaDueByDate: 0,
      selectedTicketStatusByCustomer: 0,
      selectedTicketStatusByTicket: 0,
      selectedTicketStatusByCategory: 0,
      selectedTicketStatusAll: 0,
      selectedCategory: 0,
      selectedCategoryAll: 0,
      selectedSubCategory: 0,
      selectedSubCategoryAll: 0,
      selectedIssueType: 0,
      selectedMobileNoByCustType: "",
      selectedEmailIdByCustType: "",
      selectedClaimIdAll: "",
      selectedEmailAll: "",
      selectedTicketIdTitleAll: "",
      selectedInvoiceSubOrderAll: "",
      selectedMobileAll: "",
      selectedTicketIdByCustType: "",
      userID: 6,
      DraftDetails: [],
      draftCountStatus: 0,
      byDateFlag: 1,
      byCustomerTypeFlag: 0,
      byTicketTypeFlag: 0,
      byCategoryFlag: 0,
      allFlag: 0,
      SpacialEqmt: [
        {
          department: 25000
        },
        {
          department: 304545
        },
        {
          department: 508499
        },
        {
          department: "nub bus ushdus uhsfu"
        }
      ]
    };
    this.handleAdvSearchFlag = this.handleAdvSearchFlag.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetDraftDetails = this.handleGetDraftDetails.bind(this);
    this.handelAssignOnchange = this.handelAssignOnchange.bind(this);
  }

  componentDidMount() {
    debugger;
    this.handleGetDesignationList();
    this.handleGetTicketPriorityList();
    this.handleGetChannelOfPurchaseList();
    this.handleGetCategoryList();
    this.handleGetDraftDetails();
  }

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
  handleGetDraftDetails() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Ticketing/GetDraftDetails",
      params: {
        UserID: this.state.userID
      }
    }).then(function(res) {
      debugger;
      let DraftDetails = res.data.responseData;
      let draftCountStatus = DraftDetails.length;
      self.setState({ DraftDetails: DraftDetails, draftCountStatus });
    });
  }

  handleGetDesignationList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Designation/GetDesignationList",
      params: {
        TenantID: this.state.tenantID
      }
    }).then(function(res) {
      debugger;
      let DesignationData = res.data.responseData;
      self.setState({ DesignationData: DesignationData });
    });
  }
  handleGetTicketPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Priority/GetPriorityList",
      params: {
        TenantID: this.state.tenantID
      }
    }).then(function(res) {
      debugger;
      let TicketPriorityData = res.data.responseData;
      self.setState({ TicketPriorityData: TicketPriorityData });
    });
  }
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      params: {
        TenantID: this.state.tenantID
      }
    }).then(function(res) {
      debugger;
      let ChannelOfPurchaseData = res.data.responseData;
      self.setState({ ChannelOfPurchaseData: ChannelOfPurchaseData });
    });
  }
  handleGetCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Category/GetCategoryList",
      params: {
        TenantID: this.state.tenantID
      }
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
  handleGetSubCategoryList() {
    debugger;
    let self = this;
    let cateId =
      this.state.byCategoryFlag === 1
        ? this.state.selectedCategory
        : this.state.selectedCategoryAll;

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
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
  handleGetIssueTypeList() {
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      params: {
        TenantID: this.state.tenantID,
        SubCategoryID: this.state.selectedSubCategory
      }
    }).then(function(res) {
      debugger;
      let IssueTypeData = res.data.responseData;
      self.setState({ IssueTypeData: IssueTypeData });
    });
  }
  handleAssignSearchData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Ticketing/searchAgent",
      params: {
        FirstName: this.state.assignFirstName.trim(),
        LastName: this.state.assignLastName.trim(),
        Email: this.state.assignEmail.trim(),
        DesignationID: this.state.selectedDesignation
      }
    }).then(function(res) {
      debugger;
      let SearchAssignData = res.data.responseData;
      self.setState({ SearchAssignData: SearchAssignData ,
        assignFirstName:'',
        assignLastName:'',
        assignEmail:'',
        selectedDesignation:0});
    });
  }

  setDesignationValue = e => {
    let designationValue = e.currentTarget.value;
    this.setState({ selectedDesignation: designationValue });
  };
  setPriorityValue = e => {
    let priorityValue = e.currentTarget.value;
    this.setState({ selectedPriority: priorityValue });
  };
  handleMobileNoByCustType = e => {
    debugger;
    let mobileNoByCustTypeValue = e.currentTarget.value;
    this.setState({ selectedMobileNoByCustType: mobileNoByCustTypeValue });
  };
  handleEmailIdByCustType = e => {
    debugger;
    let emailIdByCustTypeValue = e.currentTarget.value;
    this.setState({ selectedEmailIdByCustType: emailIdByCustTypeValue });
  };
  handleClaimIdAll = e => {
    debugger;
    let claimIdAllValue = e.currentTarget.value;
    this.setState({ selectedClaimIdAll: claimIdAllValue });
  };
  handleEmailAll = e => {
    debugger;
    let emailAllValue = e.currentTarget.value;
    this.setState({ selectedEmailAll: emailAllValue });
  };
  handleTicketIdTitleAll = e => {
    debugger;
    let ticketIdTitleAllValue = e.currentTarget.value;
    this.setState({ selectedTicketIdTitleAll: ticketIdTitleAllValue });
  };
  handleInvoiceSubOrderAll = e => {
    debugger;
    let invoiceSubOrderAllValue = e.currentTarget.value;
    this.setState({ selectedInvoiceSubOrderAll: invoiceSubOrderAllValue });
  };
  handleMobileAll = e => {
    debugger;
    let mobileAllValue = e.currentTarget.value;
    this.setState({ selectedMobileAll: mobileAllValue });
  };
  handleTicketIdByCustType = e => {
    debugger;
    let ticketIdByCustTypeValue = e.currentTarget.value;
    this.setState({ selectedTicketIdByCustType: ticketIdByCustTypeValue });
  };
  setChannelOfPurchaseValue = e => {
    debugger;
    // let channelOfPurchaseValue = e.channelOfPurchaseID;
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTicketActionTypeValue = e => {
    debugger;
    // let channelOfPurchaseValue = e.channelOfPurchaseID;
    this.setState({ selectedTicketActionType: e });
  };
  handleTicketStatusByDate = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusByDate: ticketStatusValue });
  };
  handleSlaDueByDate = e => {
    debugger;
    let slaDueValue = e.currentTarget.value;
    this.setState({ selectedSlaDueByDate: slaDueValue });
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
  handleTicketStatusAll = e => {
    let ticketStatusValue = e.currentTarget.value;
    this.setState({ selectedTicketStatusAll: ticketStatusValue });
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

    // setTimeout(() => {
    //   if (this.state.selectedSubCategory) {
    //     this.handleGetIssueTypeList();
    //   }
    // }, 1);
  };
  setIssueTypeValue = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });
  };

  StatusOpenModel() {
    this.setState({ StatusModel: true });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }
  toggleSearch() {
    this.setState(state => ({ collapseSearch: !state.collapseSearch }));
  }
  handleByDateCreate(date) {
    debugger;
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
  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  hanleChange = () => {
    this.props.history.push("/admin/addSearchMyTicket");
  };
  hanleChange_MyTicket = () => {
    this.props.history.push("/admin/myticket");
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  clickCheckbox(evt) {
    evt.stopPropagation();
  }
  handelCheckBoxCheckedChange = () => {
    this.setState({
      CheckBoxChecked: !this.state.CheckBoxChecked
    });
  };

  checkAllCheckbox(event) {
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
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
  handelAssignOnchange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  HandleRowClickPage = () => {
    return {
      onClick: e => {
        this.props.history.push("myticket");
      }
    };
  };
  render() {
    const { DraftDetails,SearchAssignData } = this.state;
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
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab1"
                  name="MyTicketListcheckbox[]"
                  checked={this.state.CheckBoxChecked}
                  onChange={this.handelCheckBoxCheckedChange}
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Naman</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab2"
                  name="MyTicketListcheckbox[]"
                  checked={this.state.CheckBoxChecked}
                  onChange={this.handelCheckBoxCheckedChange}
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
          <span className="table-b table-yellow-btn">
            <label>New</label>
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
        ),
        assigneeDash: <span>Rashmi</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab3"
                  name="MyTicketListcheckbox[]"
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
          <Popover content={TaskBlue} placement="bottom">
            <img
              className="task-icon-1 marginimg"
              src={TaskIconBlue}
              alt="task-icon-blue"
            />
          </Popover>
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Shalini</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab4"
                  name="MyTicketListcheckbox[]"
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
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        ),
        Img: (
          <img
            className="task-icon-1 marginimg"
            src={TaskIconGray}
            alt="task-icon-gray"
          />
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Vikas</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab5"
                  name="MyTicketListcheckbox[]"
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
          <span className="table-b table-blue-btn">
            <label>Open</label>
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Nidhi</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab6"
                  name="MyTicketListcheckbox[]"
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
          <span className="table-b table-yellow-btn">
            <label>New</label>
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Mansi</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab7"
                  name="MyTicketListcheckbox[]"
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Naman</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab8"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab8">
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Akriti</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab9"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab9">
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Juhi</span>
      },
      {
        idDash: (
          <span onClick={e => this.clickCheckbox(e)}>
            <div className="filter-type pink1 pinkmyticket">
              <div className="filter-checkbox pink2 pinkmargin">
                <input
                  type="checkbox"
                  id="fil-ab10"
                  name="MyTicketListcheckbox[]"
                />
                <label htmlFor="fil-ab10">
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

            <Popover content={InsertPlaceholder} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover>
          </span>
        ),
        assigneeDash: <span>Shalini</span>
      }
    ];

    const columnsDash = [
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
          <label className="ticketid">
            <span>Subject/</span>
            <span style={{ fontWeight: "bold", fontSize: "11px !important" }}>
              Lastest Message
            </span>
          </label>
        ),
        accessor: "subjectDash"
      },
      {
        Header: (
          <span className="ticketid">
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
          <span className="ticketid">
            Priority <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "priorityDash",
        Cell: props => <span>High</span>
      },
      {
        Header: (
          <span className="ticketid">
            Assignee <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assigneeDash"
      },
      {
        Header: (
          <span className="ticketid">
            Creation On <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creationNew"
      }
    ];

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
        <div className="myticketlist-header" style={{ marginTop: "-21px" }}>
          <div className="setting-tabs esc esc1">
            <ul
              className="nav nav-tabs es"
              role="tablist"
              style={{ display: "inline" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="true"
                >
                  Escalation: <span className="myTciket-tab-span">03</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#New-tab"
                  role="tab"
                  aria-controls="New-tab"
                  aria-selected="false"
                >
                  New: <span className="myTciket-tab-span">09</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Open-tab"
                  role="tab"
                  aria-controls="Open-tab"
                  aria-selected="false"
                >
                  Open: <span className="myTciket-tab-span">10</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Resolved-tab"
                  role="tab"
                  aria-controls="Resolved-tab"
                  aria-selected="false"
                >
                  Resolved: <span className="myTciket-tab-span">15</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Reassigned-tab"
                  role="tab"
                  aria-controls="Reassigned-tab"
                  aria-selected="false"
                >
                  Reassigned by me:{" "}
                  <span className="myTciket-tab-span">03</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Closed-tab"
                  role="tab"
                  aria-controls="Closed-tab"
                  aria-selected="false"
                >
                  Closed: <span className="myTciket-tab-span">12</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#All-tab"
                  role="tab"
                  aria-controls="All-tab"
                  aria-selected="false"
                >
                  All: <span className="myTciket-tab-span">56</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Follow-tab"
                  role="tab"
                  aria-controls="Follow-tab"
                  aria-selected="false"
                >
                  Follow Up: <span className="myTciket-tab-span">03</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Draft-tab"
                  role="tab"
                  aria-controls="Draft-tab"
                  aria-selected="false"
                  onClick={this.handleGetDraftDetails}
                >
                  Draft:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.draftCountStatus < 9
                      ? "0" + this.state.draftCountStatus
                      : this.state.draftCountStatus}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mlistbtn">
              {/* <button
                className="myTicket-btn-A"
                type="button"
                onClick={this.handleAssignModalOpen.bind(this)}
              >
                ASSIGN
              </button> */}
              <button
                className="Add-ticket-button"
                type="button"
                onClick={this.hanleChange}
              >
                <label className="add-tickets">ADD TICKETS</label>
              </button>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="Escalation-tab"
                role="tabpanel"
                aria-labelledby="Escalation-tab"
              >
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
                                    >
                                      All
                                    </a>
                                  </li>
                                </ul>
                                <div className="save-view-search">
                                  <button onClick={this.onOpenModal}>
                                    Save Search
                                  </button>
                                  <button className="btn-inv">
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
                                  />
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
                                        <a
                                          href={Demo.BLANK_LINK}
                                          className="m-0"
                                        >
                                          <img
                                            src={DelSearch}
                                            alt="del-search"
                                          />
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <p>Open tickets with high priority</p>
                                      <div>
                                        <a href={Demo.BLANK_LINK}>APPLY</a>
                                        <a
                                          href={Demo.BLANK_LINK}
                                          className="m-0"
                                        >
                                          <img
                                            src={DelSearch}
                                            alt="del-search"
                                          />
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <p>Open tickets with high priority</p>
                                      <div>
                                        <a href={Demo.BLANK_LINK}>APPLY</a>
                                        <a
                                          href={Demo.BLANK_LINK}
                                          className="m-0"
                                        >
                                          <img
                                            src={DelSearch}
                                            alt="del-search"
                                          />
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <p>Open tickets with high priority</p>
                                      <div>
                                        <a href={Demo.BLANK_LINK}>APPLY</a>
                                        <a
                                          href={Demo.BLANK_LINK}
                                          className="m-0"
                                        >
                                          <img
                                            src={DelSearch}
                                            alt="del-search"
                                          />
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <p>Open tickets with high priority</p>
                                      <div>
                                        <a href={Demo.BLANK_LINK}>APPLY</a>
                                        <a
                                          href={Demo.BLANK_LINK}
                                          className="m-0"
                                        >
                                          <img
                                            src={DelSearch}
                                            alt="del-search"
                                          />
                                        </a>
                                      </div>
                                    </li>
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
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state.selectedSlaDueByDate
                                          }
                                          onChange={this.handleSlaDueByDate}
                                        >
                                          <option>SLA Due</option>
                                          {this.state.SlaDueData !== null &&
                                            this.state.SlaDueData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.slaDueID}
                                                >
                                                  {item.slaDueName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedTicketStatusByDate
                                          }
                                          onChange={
                                            this.handleTicketStatusByDate
                                          }
                                        >
                                          <option>Ticket Status</option>
                                          {this.state.TicketStatusData !==
                                            null &&
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
                                    <div className="row justify-content-between">
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
                                                className="form-control dropdown-setting ScheduleDate-to"
                                              >
                                                <option>Team Member</option>
                                              </select>
                                              <select
                                                id="inputState"
                                                className="form-control dropdown-setting ScheduleDate-to"
                                              >
                                                <option>Monthly</option>
                                              </select>
                                              <select
                                                id="inputState"
                                                className="form-control dropdown-setting ScheduleDate-to"
                                              >
                                                <option>First day</option>
                                                <option>Last day</option>
                                              </select>
                                              <input
                                                type="text"
                                                className="txt-1 txt1Place"
                                                placeholder="Time"
                                              />
                                              <div>
                                                <button className="scheduleBtn">
                                                  <label className="addLable">
                                                    SCHEDULE
                                                  </label>
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
                                              onChange={
                                                this.handelAssignOnchange
                                              }
                                            />
                                            <input
                                              type="text"
                                              className="txt-1 txt-btmSpace"
                                              placeholder="Last Name"
                                              name="assignLastName"
                                              value={this.state.assignLastName}
                                              onChange={
                                                this.handelAssignOnchange
                                              }
                                            />
                                            <input
                                              type="text"
                                              className="txt-1 txt-btmSpace"
                                              placeholder="Email"
                                              name="assignEmail"
                                              value={this.state.assignEmail}
                                              onChange={
                                                this.handelAssignOnchange
                                              }
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
                                                {/* <option>Select</option> */}
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
                                              // resizable={false}
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
                                          value={
                                            this.state
                                              .selectedMobileNoByCustType
                                          }
                                          onChange={
                                            this.handleMobileNoByCustType
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          type="text"
                                          className="no-bg"
                                          placeholder="Customer Email ID"
                                          value={
                                            this.state.selectedEmailIdByCustType
                                          }
                                          onChange={
                                            this.handleEmailIdByCustType
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          type="text"
                                          className="no-bg"
                                          placeholder="Ticket ID"
                                          value={
                                            this.state
                                              .selectedTicketIdByCustType
                                          }
                                          onChange={
                                            this.handleTicketIdByCustType
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={
                                            this.state
                                              .selectedTicketStatusByCustomer
                                          }
                                          onChange={
                                            this.handleTicketStatusByCustomer
                                          }
                                        >
                                          <option>Ticket Status</option>
                                          {this.state.TicketStatusData !==
                                            null &&
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
                                    <div className="row justify-content-between">
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
                                          {this.state.TicketPriorityData !==
                                            null &&
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
                                            this.state
                                              .selectedTicketStatusByTicket
                                          }
                                          onChange={
                                            this.handleTicketStatusByTicket
                                          }
                                        >
                                          <option>Ticket Status</option>
                                          {this.state.TicketStatusData !==
                                            null &&
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
                                            options={
                                              this.state.ChannelOfPurchaseData
                                            }
                                            placeholder="Channel Of Purchase"
                                            // menuIsOpen={true}
                                            closeMenuOnSelect={false}
                                            onChange={this.setChannelOfPurchaseValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedChannelOfPurchase
                                            }
                                            // showNewOptionAtTop={false}
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        {/* <select>
                                          <option>Ticket action Type</option>
                                        </select> */}
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={option =>
                                              option.ticketActionTypeName
                                            }
                                            getOptionValue={option =>
                                              option.ticketActionTypeID
                                            }
                                            options={
                                              this.state.TicketActionTypeData
                                            }
                                            placeholder="Ticket Action Type"
                                            // menuIsOpen={true}
                                            closeMenuOnSelect={false}
                                            onChange={this.setTicketActionTypeValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketActionType
                                            }
                                            // showNewOptionAtTop={false}
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row justify-content-between">
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
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                          value={this.state.selectedSubCategory}
                                          onChange={this.setSubCategoryValue}
                                        >
                                          <option>Sub Category</option>
                                          {this.state.SubCategoryData !==
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
                                            this.state
                                              .selectedTicketStatusByCategory
                                          }
                                          onChange={
                                            this.handleTicketStatusByCategory
                                          }
                                        >
                                          <option>Ticket Status</option>
                                          {this.state.TicketStatusData !==
                                            null &&
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
                                    <div className="row justify-content-between">
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
                                          onChange={this.handleAllCreateDate.bind(
                                            this
                                          )}
                                          placeholderText="Creation Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select>
                                          <option>Ticket Source</option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Claim ID"
                                          value={this.state.selectedClaimIdAll}
                                          onChange={this.handleClaimIdAll}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Email"
                                          value={this.state.selectedEmailAll}
                                          onChange={this.handleEmailAll}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6 allspc">
                                        <DatePicker
                                          selected={this.state.ByAllLastDate}
                                          onChange={this.handleAllLastDate.bind(
                                            this
                                          )}
                                          placeholderText="Last Updated Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          // className="form-control"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        {/* <select>
                                          <option>Ticket Id/Title</option>
                                        </select> */}
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Ticket Id/Title"
                                          value={
                                            this.state.selectedTicketIdTitleAll
                                          }
                                          onChange={this.handleTicketIdTitleAll}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Invoice Number/Sub Order No"
                                          value={
                                            this.state
                                              .selectedInvoiceSubOrderAll
                                          }
                                          onChange={
                                            this.handleInvoiceSubOrderAll
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Mobile"
                                          value={this.state.selectedMobileAll}
                                          onChange={this.handleMobileAll}
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6 allspc">
                                        <select
                                          value={this.state.selectedCategoryAll}
                                          onChange={this.setCategoryAllValue}
                                        >
                                          <option>Category</option>
                                          {this.state.CategoryData !== null &&
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
                                      <div className="col-md-3 col-sm-6">
                                        <select>
                                          <option>Ticket Priority</option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Item ID"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select>
                                          <option>Assigned To</option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6 allspc">
                                        {/* <select>
                                          <option>Sub Category</option>
                                        </select> */}
                                        <select
                                          value={
                                            this.state.selectedSubCategoryAll
                                          }
                                          onChange={this.setSubCategoryAllValue}
                                        >
                                          <option>Sub Category</option>
                                          {this.state.SubCategoryAllData !==
                                            null &&
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
                                          value={
                                            this.state.selectedTicketStatusAll
                                          }
                                          onChange={this.handleTicketStatusAll}
                                        >
                                          <option>Ticket Status</option>
                                          {this.state.TicketStatusData !==
                                            null &&
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
                                        <select>
                                          <option>Did Visit Store : Yes</option>
                                          <option>Did Visit Store : No</option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Purchase Store Code/Address"
                                        />
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        {/* <select>
                                          <option>Issue Type</option>
                                        </select> */}
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
                                        <select>
                                          <option>SLA Status</option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select>
                                          <option>
                                            Want to Visit Store : Yes
                                          </option>
                                          <option>
                                            Want to Visit Store : No
                                          </option>
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder="Want to visit Store Code/Address"
                                        />
                                      </div>
                                    </div>
                                    <div className="row p-0">
                                      <div className="col-md-6">
                                        <div className="row allspc">
                                          <div className="col-sm-6 m-b-25">
                                            <select>
                                              <option>With Claim</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6">
                                            <select>
                                              <option>With Task</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6 m-b-25">
                                            <select>
                                              <option>Claim Status</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6">
                                            <select>
                                              <option>Task Status</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6 m-b-25">
                                            <select>
                                              <option>Claim Category</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6">
                                            <select>
                                              <option>Task Department</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6 m-b-25">
                                            <select>
                                              <option>
                                                Claim Sub Category
                                              </option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6">
                                            <select>
                                              <option>Task Function</option>
                                            </select>
                                          </div>
                                          <div className="col-sm-6">
                                            <select>
                                              <option>Claim Issue Type</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row justify-content-between">
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
                        data={dataDash}
                        columns={columnsDash}
                        // resizable={false}
                        defaultPageSize={10}
                        showPagination={false}
                        getTrProps={this.HandleRowClickPage}
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
                    <div className="float-search" onClick={this.toggleSearch}>
                      <small>{TitleChange}</small>
                      {ImgChange}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="New-tab"
                role="tabpanel"
                aria-labelledby="New-tab"
              >
                <MyTicketNew />
              </div>

              <div
                className="tab-pane fade"
                id="Open-tab"
                role="tabpanel"
                aria-labelledby="Open-tab"
              >
                <MyTicketOpen />
              </div>

              <div
                className="tab-pane fade"
                id="Resolved-tab"
                role="tabpanel"
                aria-labelledby="Resolved-tab"
              >
                <MyTicketResolved />
              </div>

              <div
                className="tab-pane fade"
                id="Reassigned-tab"
                role="tabpanel"
                aria-labelledby="Reassigned-tab"
              >
                <MyTicketReassign />
              </div>

              <div
                className="tab-pane fade"
                id="Closed-tab"
                role="tabpanel"
                aria-labelledby="Closed-tab"
              >
                <MyTicketClosed />
              </div>

              <div
                className="tab-pane fade"
                id="All-tab"
                role="tabpanel"
                aria-labelledby="All-tab"
              >
                <MyTicketAll />
              </div>

              <div
                className="tab-pane fade"
                id="Follow-tab"
                role="tabpanel"
                aria-labelledby="Follow-tab"
              >
                <MyTicketFollowUp />
              </div>

              <div
                className="tab-pane fade"
                id="Draft-tab"
                role="tabpanel"
                aria-labelledby="Draft-tab"
              >
                <MyTicketDraft draftData={DraftDetails} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketList;
