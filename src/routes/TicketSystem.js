import React, { Component } from "react";
import ArrowLeftCircleBlue from "./../assets/Images/arrow-circle-left.png";
import RedHeadPhoneIcon from "./../assets/Images/headphone.png";
import CopyIcon from "./../assets/Images/past.png";
import CustomreIcon from "./../assets/Images/customer.png";
import AvatarBlackIcon from "./../assets/Images/avatar.png";
import OrderIcon from "./../assets/Images/order.png";
import StoreIcon from "./../assets/Images/store-tikcet-system.png";
import TaskIcon from "./../assets/Images/ticket.png";
import TicketLogoBlue from "./../assets/Images/ticket-blue.png";
import TicketSystemOrder from "./Tabs/TicketSystemOrder";
import TicketSystemTask from "./Tabs/TicketSystemTask";
import TicketSystemStore from "./Tabs/TicketSystemStore";
import Modal from "react-responsive-modal";
import CKEditor from "ckeditor4-react";
// import moment from "moment";
import FileUpload from "./../assets/Images/file.png";
import ThumbTick from "./../assets/Images/thumbticket.png";
import AutoSave from "./../assets/Images/AutoSave.png";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import CancelImg from "./../assets/Images/cancel.png";
import { Collapse, CardBody, Card } from "reactstrap";
import DownArrowIcon from "./../assets/Images/down-1.png";
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import Up1Img from "./../assets/Images/up-1.png";
import Down1Img from "./../assets/Images/down-1.png";
import config from "./../helpers/config";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
import Select from "react-select";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

class TicketSystem extends Component {
  constructor() {
    super();
    this.state = {
      showAddNote: false,
      SubmitBtnReopn: false,
      EditCustomer: false,

      TicketTitleData: [],
      CkEditorTemplateData: [],
      KbPopupData: [],
      BrandData: [],
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      TicketPriorityData: [],
      ChannelOfPurchaseData: [],
      KbLink: false,
      collapseUp: false,
      TabIconColor: "nav-link active",
      altEmailID: "",
      altNumber: "",
      customerEmailId: "",
      customerPhoneNumber: "",
      customerName: "",
      selectedBrand: 0,
      createdBy: 6,
      selectedCategory: 0,
      selectedCategoryKB: 0,
      selectedSubCategory: 0,
      selectedSubCategoryKB: 0,
      selectedIssueType: 0,
      selectedIssueTypeKB: 0,
      selectedTicketPriority: 0,
      selectedTicketActionType: "200",
      selectedChannelOfPurchase: 0,
      tenantID: 1,
      customerData: {},
      CustData: {},
      customerDetails: {},
      // custmrId: '',
      details: {},
      editDOB: "",
      copied: false,
      SpacialEqmt: [
        {
          department: 25
        },
        {
          department: 30
        },
        {
          department: 50
        },
        {
          department: 90
        }
      ]
    };
    this.showAddNoteFuncation = this.showAddNoteFuncation.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleGetTicketTitleList = this.handleGetTicketTitleList.bind(this);
    this.handleCkEditorTemplate = this.handleCkEditorTemplate.bind(this);
    this.handleKbLinkPopupSearch = this.handleKbLinkPopupSearch.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleEditCustomerOpen = this.handleEditCustomerOpen.bind(this);
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
  }
  handleUpOpen() {
    this.setState({ collapseUp: true });
  }
  handleUpClose() {
    this.setState({ collapseUp: false });
  }
  HandleKbLinkModalOpen() {
    this.setState({ KbLink: true });
  }
  HandleKbLinkModalClose() {
    this.setState({ KbLink: false });
  }
  handleEditCustomerOpen() {
    this.setState({ EditCustomer: true });
  }
  handleEditCustomerClose() {
    this.setState({ EditCustomer: false });
  }
  GenderonChange = e => {

    const value = e.target.value;

    let CustData = this.state.CustData;
    CustData.genderID = value;
    this.setState({ CustData });
  };
  handleChange = date => {
    debugger;
    // let CustData = this.state.CustData;
    // let editDOB = date;
    // CustData.dateOfBirth = date;

    // this.setState({
    //   CustData,
    //   editDOB
    // });
    this.setState({
      editDOB: date
    });
  };
  showAddNoteFuncation() {
    const { showAddNote } = this.state;
    this.setState({
      showAddNote: !showAddNote
    });
  }

  handleOnChangeData = e => {
    const { name, value } = e.target;
    // const value =e.target.value;

    let details = this.state.CustData;
    details[name] = value;
    this.setState({ details });
    // this.state.customerData[name] = value;
    // this.setState({
    //   customerData: this.state.customerData
    // });
  };
  handlechangebtntab(e) {
    var idIndex = e.target.className;
    this.setState({ TabIconColor: idIndex });
  }
  handleSubmitReopnModalOpen() {
    this.setState({ SubmitBtnReopn: true });
  }
  handleSubmitReopnModalClose() {
    this.setState({ SubmitBtnReopn: false });
  }
  handleUpdateCustomer() {
    debugger;
    let self = this;
    // var Dob= moment(this.state.CustData.editDOB).format("DD/MM/YYYY");
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Customer/updateCustomer",
      data: {
        CustomerID: this.state.CustData.customerID,
        TenantID: this.state.CustData.tenantID,
        CustomerName: this.state.CustData.customername,
        CustomerPhoneNumber: this.state.CustData.customerPhone,
        CustomerEmailId: this.state.CustData.custEmailId,
        GenderID: this.state.CustData.genderID,
        AltNumber: this.state.CustData.altNo,
        AltEmailID: this.state.CustData.altEmail,
        CreatedBy: this.state.createdBy,
        // DateOfBirth: moment(this.state.CustData.editDOB).format("DD/MM/YYYY"),
        // DateOfBirth: Dob,
        IsActive: 1
      }
    }).then(function(res) {
      // debugger;
      let Message = res.data.message;
      if (Message === "Success") {
        NotificationManager.success("Record updated Successfull.");

        self.componentDidMount();

        self.handleEditCustomerClose.bind(this);
      }
    });
  }
  handleGetTicketTitleList() {
    const requestOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      body: ""
    };
    let self = this;

    axios(config.apiUrl + "/Ticketing/gettitlesuggestions", requestOptions, {
      params: {
        TikcketTitle: ""
        // TenantID: this.state.tenantID
      }
    }).then(function(res) {
      // debugger;
      let TicketTitleData = res.data.responseData;
      self.setState({ TicketTitleData: TicketTitleData });
    });
  }
  handleCkEditorTemplate() {
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Template/getListOfTemplateForNote",
      params: {
        IssueTypeID: this.state.selectedIssueType,
        TenantID: this.state.tenantID
      }
    }).then(function(res) {
      debugger;
      let CkEditorTemplateData = res.data.responseData;
      self.setState({ CkEditorTemplateData: CkEditorTemplateData });
    });
  }
  handleKbLinkPopupSearch() {
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/KnowledgeBase/searchbycategory",
      params: {
        Type_ID: this.state.selectedIssueTypeKB,
        Category_ID: this.state.selectedCategoryKB,
        SubCategor_ID: this.state.selectedSubCategoryKB
      }
    }).then(function(res) {
      debugger;
      let KbPopupData = res.data.responseData;
      self.setState({ KbPopupData: KbPopupData });
    });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Brand/GetBrandList",
      params: {
        TenantID: this.state.tenantID
      }
    }).then(function(res) {
      // console.log(JSON.stringify(res.data.responseData));
      debugger;
      let BrandData = res.data.responseData;
      self.setState({ BrandData: BrandData });
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
      self.setState({ CategoryData: CategoryData });
    });
  }
  handleGetSubCategoryList() {
    debugger;

    let self = this;
    let cateId = this.state.KbLink
      ? this.state.selectedCategoryKB
      : this.state.selectedCategory;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      params: {
        CategoryID: cateId
        // CategoryID: this.state.selectedCategory
      }
    }).then(function(res) {
      debugger;
      let SubCategoryData = res.data.responseData;
      self.setState({ SubCategoryData: SubCategoryData });
    });
  }
  handleGetIssueTypeList() {
    debugger;
    let self = this;
    let subCateId = this.state.KbLink
      ? this.state.selectedSubCategoryKB
      : this.state.selectedSubCategory;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      params: {
        TenantID: this.state.tenantID,
        SubCategoryID: subCateId
        // SubCategoryID: this.state.selectedSubCategory
      }
    }).then(function(res) {
      debugger;
      let IssueTypeData = res.data.responseData;
      self.setState({ IssueTypeData: IssueTypeData });
    });
  }
  handleGetTicketPriorityList() {
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

  handleGetCustomerData(CustId, mode) {
    let self = this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
      },
      url: config.apiUrl + "/Customer/getcustomerdetailsbyid",
      params: {
        CustomerID: CustId
      }
    }).then(function(res) {
      debugger;
      var CustMsg = res.data.message;
      var customerData = res.data.responseData;
      var CustData = res.data.responseData;
      CustData.customerPhone = CustData.customerPhoneNumber;
      CustData.customername = CustData.customerName;
      CustData.custEmailId = CustData.customerEmailId;
      CustData.altNo = CustData.altNumber;
      CustData.altEmail = CustData.altEmailID;
      CustData.editDOB = CustData.dob;

      if (CustMsg === "Success") {
        self.setState({ customerData: customerData });
        self.handleEditCustomerClose();
      }
      if (mode === "Edit") {
        // var editDOB = moment(customerData.dateOfBirth).format("DD/MM/YYYY");
        self.handleEditCustomerOpen();
        self.setState({ customerData: customerData, CustData });
      }
    });
  }

  componentDidMount() {
    debugger;
    var customerDetails = this.props.location.state;
    // var custDetailsId=this.props.location.state;

    if (customerDetails) {
      var custId = customerDetails.customerId;
      this.setState({ customerDetails, custId });
      this.handleGetCustomerData(custId);
      this.handleGetTicketTitleList();
      this.handleGetBrandList();
      this.handleGetCategoryList();
      this.handleGetChannelOfPurchaseList();
      this.handleGetTicketPriorityList();
      this.handleCkEditorTemplate();
    } else {
      this.props.history.push("addSearchMyTicket");
    }
  }

  setBrandValue = e => {
    let brandValue = e.currentTarget.value;
    this.setState({ selectedBrand: brandValue });
  };
  setIssueTypeValue = e => {
    debugger;
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });
  };
  setIssueTypeValueKB = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeKB: issueTypeValue });
  };
  setTicketPriorityValue = e => {
    let ticketPriorityValue = e.currentTarget.id;
    this.setState({ selectedTicketPriority: ticketPriorityValue });
  };
  setTicketActionTypeValue = e => {
    // debugger;
    let ticketActionTypeValue = e.currentTarget.value;
    this.setState({ selectedTicketActionType: ticketActionTypeValue });
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
  setCategoryValueKB = e => {
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategoryKB: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategoryKB) {
        this.handleGetSubCategoryList();
      }
    }, 1);
  };
  setSubCategoryValue = e => {
    debugger;
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategory: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
  };
  setSubCategoryValueKB = e => {
    debugger;
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategoryKB: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryKB) {
        this.handleGetIssueTypeList();
      }
    }, 1);
  };
  setChannelOfPurchaseValue = e => {
    let channelOfPurchaseValue = e.currentTarget.value;
    this.setState({ selectedChannelOfPurchase: channelOfPurchaseValue });
  };
  setChannelOfPurchaseValue = e => {
    let channelOfPurchaseValue = e.currentTarget.value;
    this.setState({ selectedChannelOfPurchase: channelOfPurchaseValue });
  };

  render() {
    // var editDOBRender = this.state.editDOB;
    const HidecollapsUpKbLink = this.state.collapseUp ? (
      <img
        src={Up1Img}
        alt="up"
        className="down-icon-kb1"
        onClick={this.handleUpClose.bind(this)}
      />
    ) : (
      <img
        src={Down1Img}
        alt="up"
        className="down-icon-kb1"
        onClick={this.handleUpOpen.bind(this)}
      />
    );

    var CustomerId = this.state.customerDetails.customerId;
    // var DOB = moment(this.state.CustData.editDOB).format("DD/MM/YYYY");
    var CustNumber = this.state.customerData.customerPhoneNumber;
    return (
      <div style={{ backgroundColor: "#f5f8f9", paddingBottom: "2px" }}>
        <div className="rectanglesystem">
          <table className="table">
            <tbody>
              <tr>
                <td className="tdicon">
                  <img
                    src={ArrowLeftCircleBlue}
                    alt="arrow-circle-left"
                    className="bitmapback"
                  />
                  <label className="source">Source</label>
                  <img
                    src={RedHeadPhoneIcon}
                    alt="headphone"
                    className="bitmapheadpone"
                  />
                  <label className="a91-9873470074">{CustNumber}</label>
                  <img
                    src={CopyIcon}
                    alt="Copy-Icon"
                    className="bitmapheadpone"
                  />
                </td>

                <td className="tdtextnew" style={{ padding: "5px" }}>
                  <label className="save-as-a-draft">SAVE AS DRAFT</label>
                  <button
                    className="rectanglecreateticket"
                    onClick={this.handleSubmitReopnModalOpen.bind(this)}
                  >
                    <label className="create-ticket">CREACT TICKET</label>
                  </button>
                  <Modal
                    open={this.state.SubmitBtnReopn}
                    onClose={this.handleSubmitReopnModalClose.bind(this)}
                    closeIconId="close"
                    modalId="CreateTicket1-popup"
                    overlayId="logout-ovrly"
                  >
                    <div>
                      <label>
                        {this.state.selectedTicketActionType === "200"
                          ? "Submit As Solved"
                          : "Create Ticket"}
                      </label>
                    </div>
                  </Modal>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mask-ticket-system">
          <div className="row marginsystem">
            <div className="column marginsystem1">
              <div className="paddingsystem">
                <div className="row m-b-10">
                  <div className="col-md-12">
                    <label className="category">Ticket Title</label>

                    <div className="ticket-title-select">
                      <Select
                        // className="rate-dropdown"
                        getOptionLabel={option => option.ticket_title}
                        getOptionValue={option => option.ticket_title}
                        options={this.state.TicketTitleData}
                        placeholder="Suggestion"
                        // menuIsOpen={true}
                        // onChange={this.specEquipChange}
                        // value={thi.state.spEqtSelect}
                        // showNewOptionAtTop={false}
                      />
                    </div>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-12">
                    <label className="category">Ticket Details</label>
                    <textarea
                      className="ticket-details-textarea-system"
                      placeholder="Write your title here"
                    ></textarea>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Brand</label>
                    <select
                      className="category-select-system dropdown-label"
                      value={this.state.selectedBrand}
                      onChange={this.setBrandValue}
                    >
                      <option className="select-category-placeholder">
                        Select Brand
                      </option>
                      {this.state.BrandData !== null &&
                        this.state.BrandData.map((item, i) => (
                          <option
                            key={i}
                            value={item.brandID}
                            className="select-category-placeholder"
                          >
                            {item.brandName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Category</label>
                    <select
                      value={this.state.selectedCategory}
                      onChange={this.setCategoryValue}
                      className="category-select-system dropdown-label"
                    >
                      <option className="select-category-placeholder">
                        Select Category
                      </option>
                      {this.state.CategoryData !== null &&
                        this.state.CategoryData.map((item, i) => (
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
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Sub Category</label>
                    <select
                      value={this.state.selectedSubCategory}
                      onChange={this.setSubCategoryValue}
                      className="category-select-system dropdown-label"
                    >
                      <option className="select-category-placeholder">
                        Select Sub Category
                      </option>
                      {this.state.SubCategoryData !== null &&
                        this.state.SubCategoryData.map((item, i) => (
                          <option
                            key={i}
                            value={item.subCategoryID}
                            className="select-category-placeholder"
                          >
                            {item.subCategoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Issue Type</label>
                    <select
                      value={this.state.selectedIssueType}
                      onChange={this.setIssueTypeValue}
                      className="category-select-system dropdown-label"
                    >
                      <option className="select-sub-category-placeholder">
                        Select Issue Type
                      </option>
                      {this.state.IssueTypeData !== null &&
                        this.state.IssueTypeData.map((item, i) => (
                          <option
                            key={i}
                            value={item.issueTypeID}
                            className="select-category-placeholder"
                          >
                            {item.issueTypeName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Ticket Priority</label>
                    <div className="priority-butns-cntr">
                      {this.state.TicketPriorityData !== null &&
                        this.state.TicketPriorityData.map((item, i) => (
                          <div key={i} className="priority-butns">
                            <input
                              type="radio"
                              name="ticket-priority"
                              id={item.priortyName}
                              onChange={this.setTicketPriorityValue}
                            />
                            <label htmlFor={item.priortyName}>
                              {item.priortyName}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="sub-category">Ticket Action Type</label>
                    {/* <div className="row">
                      <div className="col-md-6 Qc">
                        <button className="low-button">
                          <label className="Qc-button-text">QC</label>
                        </button>
                      </div>
                      <div className="col-md-6 Etc">
                        <button className="">
                          <label className="Etb-button-text">ETB</label>
                        </button>
                      </div>
                    </div> */}
                    <div className="action-type-butns-cntr">
                      <div className="action-type-butns">
                        <input
                          type="radio"
                          name="ticket-action-type"
                          id="qc"
                          value="200"
                          onChange={this.setTicketActionTypeValue}
                          checked={
                            this.state.selectedTicketActionType === "200"
                          }
                        />
                        <label htmlFor="qc">QC</label>
                      </div>
                      <div className="action-type-butns">
                        <input
                          type="radio"
                          name="ticket-action-type"
                          id="etb"
                          value="201"
                          onChange={this.setTicketActionTypeValue}
                          checked={
                            this.state.selectedTicketActionType === "201"
                          }
                        />
                        <label htmlFor="etb">ETB</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-b-10">
                  <div className="col-md-6">
                    <label className="category">Channel Of Purchase</label>
                    <select
                      value={this.state.selectedChannelOfPurchase}
                      onChange={this.setChannelOfPurchaseValue}
                      className="category-select-system dropdown-label"
                    >
                      <option className="select-category-placeholder">
                        Select Channel Of Purchase
                      </option>
                      {this.state.ChannelOfPurchaseData !== null &&
                        this.state.ChannelOfPurchaseData.map((item, i) => (
                          <option
                            key={i}
                            value={item.channelOfPurchaseID}
                            className="select-category-placeholder"
                          >
                            {item.nameOfChannel}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="row my-3 mx-1">
                  <img src={ThumbTick} alt="thumb" className="thumbtick" />
                  <img src={ThumbTick} alt="thumb" className="thumbtick" />
                </div>
                <div className="row" style={{ position: "absolute" }}>
                  <div
                    className="dropdown collapbtn1"
                    style={{ display: "inherit" }}
                  >
                    <button
                      className="dropdown-toggle my-tic-email1"
                      type="button"
                      data-toggle="dropdown"
                    >
                      <FontAwesomeIcon icon={faCalculator} /> Template
                    </button>
                    <ul className="dropdown-menu">
                      {/* <li>
                        <a href="#!">Template 1</a>
                      </li>
                      <li>
                        <a href="#!">Template 2</a>
                      </li>
                      <li>
                        <a href="#!">Template 3</a>
                      </li>
                      <li>
                        <a href="#!">Template 4</a>
                      </li> */}

                      {this.state.CkEditorTemplateData !== null &&
                        this.state.CkEditorTemplateData.map((item, i) => (
                          <li key={i} value={item.templateID}>
                            <a href="#!">{item.templateName}</a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <a href="#!" className="kblink1">
                    {/* <FontAwesomeIcon icon={faBrain} /> Kb Link */}
                    <img
                      src={KnowledgeLogo}
                      alt="KnowledgeLogo"
                      className="knoim"
                      onClick={this.HandleKbLinkModalOpen.bind(this)}
                    />
                    <label onClick={this.HandleKbLinkModalOpen.bind(this)}>
                      Kb Link
                    </label>
                  </a>

                  <label className="kblink-auto2">
                    <img src={AutoSave} alt="Auto" className="autosavekb" />
                    Auto Save
                  </label>
                </div>
                <div className="row">
                  <div className="col-md-12">
<<<<<<< HEAD
                    {/* <CKEditor
                      style={{ height: "400px" }}
=======
                    <CKEditor
                      // style={{ height: "400px" }}
>>>>>>> 2214cfdbc6745e1b11a426c0e436d50199fa4abd
                      config={{
                        toolbar: [
                          {
                            name: "basicstyles",
                            items: ["Bold", "Italic", "Strike"]
                          },
                          {
                            name: "styles",
                            items: ["Styles", "Format"]
                          },
                          {
                            name: "paragraph",
                            items: ["NumberedList", "BulletedList"]
                          },
                          {
                            name: "links",
                            items: ["Link", "Unlink"]
                          },
                          {
                            name: "insert",
                            items: ["Image", "Table"]
                          },
                          {
                            name: "tools",
                            items: ["Maximize"]
                          },
                          {
                            name: "editing",
                            items: ["Scayt"]
                          }
                        ]
                      }}
                    /> */}
                    <div className="row colladrowa" style={{ bottom: "15px" }}>
                      <div className="col-md-12 colladrow">
                        <ul className="m-l-30">
                          <li className="diwamargin">
                            <label>To: diwarkar@gmail.com</label>
                          </li>
                          <li>
                            <div className="filter-checkbox">
                              <input
                                type="checkbox"
                                id="fil-open"
                                name="filter-type"
                                style={{ display: "none" }}
                              />
                              <label
                                htmlFor="fil-open"
                                style={{ paddingLeft: "25px" }}
                              >
                                <span>Inform Store Note</span>
                              </label>
                            </div>
                          </li>
                          <li>
                            <span>
                              <input
                                id="file-upload"
                                className="file-upload1 d-none"
                                type="file"
                                onChange={this.fileUpload}
                              />
                              <label
                                htmlFor="file-upload"
                                onDrop={this.fileDrop}
                                onDragOver={this.fileDragOver}
                                onDragEnter={this.fileDragEnter}
                              >
                                <img
                                  src={FileUpload}
                                  alt="file-upload"
                                  className="fileup"
                                />
                              </label>
                            </span>
                            <label style={{ color: "#2561a8" }}>3 files</label>
                          </li>
                          <li>
                            <label className="diwamargin">
                              <input
                                type="text"
                                className="CCdi1"
                                placeholder="CC: diwarkar@gmail.com"
                              />

                              <span className="one">+1</span>
                            </label>
                          </li>
                          <li>
                            <label className="diwamargin">
                              <input
                                type="text"
                                className="CCdi1"
                                placeholder="BCC: diwarkar@gmail.com"
                              />
                              <span className="one">+1</span>
                            </label>
                          </li>

                          <li style={{ float: "right", marginRight: "22px" }}>
                            <button className="sav1">Save As Draft</button>
                            <button className="send1">Send</button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-b-10 m-t-10">
                  <div className="col-md-4">
                    <div
                      className="filter-checkbox"
                      style={{ marginLeft: "15px" }}
                    >
                      <input
                        type="checkbox"
                        id="fil-add"
                        name="filter-type"
                        style={{ display: "none" }}
                        onChange={() => this.showAddNoteFuncation()}
                      />
                      <label htmlFor="fil-add" style={{ paddingLeft: "25px" }}>
                        <span className="add-note">Add Note</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div
                      className="filter-checkbox"
                      style={{ marginLeft: "15px" }}
                    >
                      <input
                        type="checkbox"
                        id="fil-add1"
                        name="filter-type"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="fil-add1" style={{ paddingLeft: "25px" }}>
                        <span className="add-note">
                          Instant Escalation to High level
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {this.state.showAddNote ? (
                  <div>
                    <div className="row m-b-10">
                      <div className="col-md-12">
                        <textarea
                          className="addNote-textarea-system-new"
                          placeholder="Write your note here"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="column">
              <div className="" style={{ height: "100%" }}>
                <div className="tab-content tabpaddingsystem">
                  <div
                    className="tab-pane fade show active"
                    id="customer-tab"
                    role="tabpanel"
                    aria-labelledby="customer-tab"
                    style={{ height: "100%" }}
                  >
                    <div className="ticketSycard">
                      <div className="ticketSycard1">
                        <div className="paddingsystem">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="category2">Customer Name</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">Phone Number</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">Email Id</label>
                            </div>
                          </div>

                          <div className="row" style={{ marginBottom: "20px" }}>
                            <div className="col-md-4">
                              <label className="category1">
                                {this.state.customerData.customerName}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                {this.state.customerData.customerPhoneNumber}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                {this.state.customerData.customerEmailId}
                              </label>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4">
                              <label className="category2">Gender</label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">
                                Alternate Number
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category2">
                                Alternate Email Id
                              </label>
                            </div>
                          </div>

                          <div className="row" style={{ marginBottom: "20px" }}>
                            <div className="col-md-4">
                              <label className="category1">
                                {this.state.customerData.genderID === 1
                                  ? "Male"
                                  : "Female"}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                {this.state.customerData.altNumber}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <label className="category1">
                                {this.state.customerData.altEmailID}
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <button
                              className="systemeditbutton systemeditbutton-text"
                              onClick={this.handleGetCustomerData.bind(
                                this,
                                CustomerId,
                                "Edit"
                              )}
                            >
                              EDIT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Modal
                    onClose={this.handleEditCustomerClose.bind(this)}
                    open={this.state.EditCustomer}
                    modalId="AddSearchModel"
                    overlayId="logout-ovrly"
                  >
                    <div className="pop-upAddSearchPD">
                      <label className="lbl-popup-title">Edit Customer</label>
                      <hr />
                      <div className="row row-margin1">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Full Name"
                            name="customername"
                            value={this.state.CustData.customername}
                            onChange={this.handleOnChangeData}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            maxLength={10}
                            placeholder="Mobile Number"
                            name="customerPhone"
                            value={this.state.CustData.customerPhone}
                            onChange={this.handleOnChangeData}
                          />
                        </div>
                      </div>
                      <div className="row row-margin1">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Email ID"
                            name="custEmailId"
                            value={this.state.CustData.custEmailId}
                            onChange={this.handleOnChangeData}
                          />
                        </div>
                        <div className="col-md-6 radio-btn-margin">
                          <Radio.Group
                            onChange={this.GenderonChange}
                            value={this.state.CustData.genderID}
                          >
                            <Radio value={1}>Male</Radio>
                            <Radio value={2}>Female</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="row row-margin1">
                        <div className="col-md-6 addcustdate">
                          <DatePicker
                            className="txt-1"
                            placeholderText="DOB"
                            name="editDOB"
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            selected={this.state.editDOB}
                            value={this.state.CustData.editDOB}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row row-margin1">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            maxLength={10}
                            placeholder="Alternate Number"
                            name="altNo"
                            value={this.state.CustData.altNo}
                            onChange={this.handleOnChangeData}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Alternate Email"
                            name="altEmail"
                            value={this.state.CustData.altEmail}
                            onChange={this.handleOnChangeData}
                          />
                        </div>
                      </div>
                      <div className="btn-float">
                        <button
                          className="cancel-btn-A"
                          onClick={this.handleEditCustomerClose.bind(this)}
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          className="butn"
                          onClick={this.handleUpdateCustomer.bind(this)}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </Modal>

                  <div
                    className="tab-pane fade"
                    id="order-tab"
                    role="tabpanel"
                    aria-labelledby="order-tab"
                    style={{ height: "100%" }}
                    // onChange={this.hanleRedirectpage.bind(this)}
                  >
                    {/* {this.state.isOrderClick === true ? ( */}
                    <TicketSystemOrder custDetails={CustomerId} />
                    {/* ) : null} */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="store-tab"
                    role="tabpanel"
                    aria-labelledby="store-tab"
                    style={{ height: "100%" }}
                  >
                    <TicketSystemStore />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="task-tab"
                    role="tabpanel"
                    aria-labelledby="task-tab"
                    style={{ height: "100%" }}
                  >
                    <TicketSystemTask />
                  </div>
                </div>
              </div>
            </div>
            <div className="column1">
              <div className="myticketlist-header-system">
                <div className="setting-tabs system">
                  <ul className="nav nav-tabs es" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#customer-tab"
                        role="tab"
                        aria-controls="customer-tab"
                        aria-selected="true"
                        onClick={this.handlechangebtntab.bind(this)}
                      >
                        {this.state.TabIconColor === "nav-link active" ? (
                          <img
                            src={CustomreIcon}
                            alt="customer-icon"
                            className="customer-icon"
                          />
                        ) : (
                          <img
                            src={AvatarBlackIcon}
                            alt="customer-icon"
                            className="customer-icon"
                          />
                        )}
                        {/* <img
                          src={AvatarBlackIcon}
                          alt="customer-icon"
                          className="customer-icon"
                        /> */}
                        {/* <img
                          src={CustomreIcon}
                          alt="customer-icon"
                          className="customer-icon"
                        /> */}
                        <span className="system-tab-span">CUSTOMER</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#order-tab"
                        role="tab"
                        aria-controls="order-tab"
                        aria-selected="false"
                      >
                        <img
                          src={OrderIcon}
                          alt="order-icon"
                          className="order-icon"
                        />
                        <span className="system-tab-span">ORDER</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#store-tab"
                        role="tab"
                        aria-controls="store-tab"
                        aria-selected="false"
                      >
                        <img
                          src={StoreIcon}
                          alt="store-icon"
                          className="store-icon"
                        />
                        <img
                          src={TicketLogoBlue}
                          alt="ticketlogoblue"
                          className="store-icon"
                          style={{ display: "none" }}
                        />
                        <span className="system-tab-span">STORE</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#task-tab"
                        role="tab"
                        aria-controls="task-tab"
                        aria-selected="false"
                      >
                        <img
                          src={TaskIcon}
                          alt="task-icon"
                          className="task-icon"
                        />
                        <span className="system-tab-span">TASK</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Modal
                open={this.state.KbLink}
                onClose={this.HandleKbLinkModalClose.bind(this)}
                modalId="KbLink-popup"
                overlayId="logout-ovrlykb"
              >
                <div className="row" style={{ margin: "0" }}>
                  <div className="col-md-7" style={{ padding: "0" }}>
                    <div className="knokb">
                      <h5>
                        <img
                          src={KnowledgeLogo}
                          alt="KnowledgeLogo"
                          className="knoim1"
                        />
                        KNOWLEGE BASE
                      </h5>
                      <p>Message</p>
                      {/* <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I purchase a domain through Google?
                        </p>
                        {HidecollapsUpKbLink}

                        <Collapse isOpen={this.state.collapseUp}>
                          <Card>
                            <CardBody>
                              <p>
                                Google can help you purchase a domain through
                                one of our domain host partners. During sign up,
                                just select the option to 'buy a new
                                domain.'We'll then guide you through the process
                                to help you set up G suite for your new domain.
                              </p>
                              <img
                                src={CopyBlue}
                                alt=""
                                className="copyblue-kb"
                              />
                              <a href="#!" className="copyblue-kbtext">
                                Copy
                              </a>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div> */}

                      {/* <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>

                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div> */}
                      {/* <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div> */}

                      {/* {this.state.CategoryData !== null &&
                        this.state.CategoryData.map((item, i) => (
                          <option key={i} value={item.categoryID}>
                            {item.categoryName}
                          </option>
                        ))} */}

                      <div id="kb-accordion">
                        {this.state.KbPopupData !== null &&
                          this.state.KbPopupData.map((item, i) => (
                            <div key={i} className="kb-acc-cntr">
                              <p
                                className="table-details-data-modal"
                                data-toggle="collapse"
                                data-target={"#collapse" + i}
                                aria-expanded={i === 0 ? "true" : "false"}
                                aria-controls={"collapse" + i}
                                onClick={() => this.setState({ copied: false })}
                              >
                                {item.subject}
                              </p>
                              <div
                                id={"collapse" + i}
                                className={
                                  i === 0 ? "collapse show" : "collapse"
                                }
                                data-parent="#kb-accordion"
                              >
                                <p className="mb-0">{item.description}</p>
                                <CopyToClipboard
                                  text={item.description}
                                  onCopy={() => this.setState({ copied: true })}
                                >
                                  <a href="#!" className="copyblue-kbtext">
                                    <img
                                      src={CopyBlue}
                                      alt=""
                                      className="copyblue-kb"
                                    />
                                    Copy
                                  </a>
                                </CopyToClipboard>
                                {this.state.copied ? (
                                  <span
                                    className="ml-2"
                                    style={{ color: "red" }}
                                  >
                                    Copied.
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        {/* <div className="kb-acc-cntr">
                          <p
                            className="table-details-data-modal"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Can I still use the previous version of Sites ?
                          </p>
                          <div
                            id="collapseTwo"
                            className="collapse"
                            data-parent="#kb-accordion"
                          >
                            <p>
                              Google can help you purchase a domain through one
                              of our domain host partners. During sign up, just
                              select the option to 'buy a new domain.'We'll then
                              guide you through the process to help you set up G
                              suite for your new domain.
                            </p>
                            <img
                              src={CopyBlue}
                              alt=""
                              className="copyblue-kb"
                            />
                            <a href="#!" className="copyblue-kbtext">
                              Copy
                            </a>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 kblinkright">
                    <div className="knokb-a">
                      <img
                        src={CancelImg}
                        alt="cancelImg"
                        className="cancalImg-kb"
                        onClick={this.HandleKbLinkModalClose.bind(this)}
                      />
                      <h5>KB TEMPLATE</h5>
                      <div className="form-group">
                        <select
                          value={this.state.selectedCategoryKB}
                          onChange={this.setCategoryValueKB}
                          className="kblinkrectangle-9 select-category-placeholderkblink"
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
                      <div className="form-group">
                        <select
                          value={this.state.selectedSubCategoryKB}
                          onChange={this.setSubCategoryValueKB}
                          className="kblinkrectangle-9 select-category-placeholderkblink"
                        >
                          <option>Sub-Category</option>
                          {this.state.SubCategoryData !== null &&
                            this.state.SubCategoryData.map((item, i) => (
                              <option key={i} value={item.subCategoryID}>
                                {item.subCategoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <select
                          value={this.state.selectedIssueTypeKB}
                          onChange={this.setIssueTypeValueKB}
                          className="kblinkrectangle-9 select-category-placeholderkblink"
                        >
                          <option>Type</option>
                          {this.state.IssueTypeData !== null &&
                            this.state.IssueTypeData.map((item, i) => (
                              <option key={i} value={item.issueTypeID}>
                                {item.issueTypeName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <button
                          onClick={this.handleKbLinkPopupSearch}
                          className="kblink-search"
                        >
                          SEARCH
                        </button>
                      </div>
                      <div style={{ marginTop: "275px" }}>
                        <a href="#!" className="copyblue-kbtext">
                          VIEW POLICY
                        </a>
                        <img
                          src={ViewBlue}
                          alt="viewpolicy"
                          className="viewpolicy-kb"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <NotificationContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketSystem;
