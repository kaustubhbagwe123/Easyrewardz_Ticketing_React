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
import PlusImg from "./../assets/Images/plus.png";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
// import moment from "moment";
import FileUpload from "./../assets/Images/file.png";
import ThumbTick from "./../assets/Images/thumbticket.png";
import PDF from "./../assets/Images/pdf.png";
import CSVi from "./../assets/Images/csvicon.png";
import Excel from "./../assets/Images/excel.png";
import Word from "./../assets/Images/word.png";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import CancelImg from "./../assets/Images/cancel.png";
// import { Collapse, CardBody, Card } from "reactstrap";
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import config from "./../helpers/config";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
// import Select from "react-select";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SimpleReactValidator from "simple-react-validator";
import { authHeader } from "../helpers/authHeader";

class TicketSystem extends Component {
  constructor() {
    super();
    this.state = {
      showAddNote: false,
      InformStore: false,
      EditCustomer: false,
      mailFiled: {},
      mailData: [],
      TicketTitleData: [],
      CkEditorTemplateData: [],
      CkEditorTemplateDetails: [],
      KbPopupData: [],
      BrandData: [],
      CategoryData: [],
      SubCategoryData: [],
      selectedDataIds: [],
      selectedStoreIDs: [],
      IssueTypeData: [],
      TicketPriorityData: [],
      ChannelOfPurchaseData: [],
      KbLink: false,
      Plus: false,
      TabIconColor: "nav-link active",
      fileText: 0,
      altEmailID: "",
      altNumber: "",
      customer_Id: 0,
      customerEmailId: "",
      customerPhoneNumber: "",
      customerName: "",
      ticketDetails: "",
      ticketSuggestion: {},
      ticketNote: "",
      selectedBrand: '',
      createdBy: 6,
      selectedCategory: '',
      selectedCategoryKB: 0,
      selectedSubCategory: '',
      selectedSubCategoryKB: 0,
      selectedIssueType: 0,
      selectedIssueTypeKB: 0,
      selectedTicketPriority: 0,
      customerAttachOrder: 0,
      customerStoreStatus: 0,
      selectTicketTemplateId: 0,
      selectedTicketActionType: "200",
      selectedChannelOfPurchase: 0,
      selectedTemplateID: 0,
      priorityId: 0,
      escalationLevel: 0,
      customerData: {},
      CustData: {},
      customerDetails: {},
      tempName: "",
      details: {},
      editDOB: "",
      userCC: "",
      userBCC: "",
      selectedFile: "",
      mailBodyData: "",
      saveAsDraft: "SaveAsDraft",
      copied: false,
      copiedNumber: false,
      custVisit: 0,
      AlreadycustVisit: 0,
      taskMaster: [],
      file: [],
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
      ],
      titleSuggValue: "",
      toggleTitle: false,
      loading: false,
      imageView: "",
      ticketTitleCompulsion: '',
      ticketDetailsCompulsion: '',
      ticketBrandCompulsion: '',
      ticketCategoryCompulsion: '',
      ticketSubCategoryCompulsion: '',
    };
    this.validator = new SimpleReactValidator();
    this.showAddNoteFuncation = this.showAddNoteFuncation.bind(this);
    this.handleGetTicketTitleList = this.handleGetTicketTitleList.bind(this);
    this.handleCkEditorTemplate = this.handleCkEditorTemplate.bind(this);
    this.handleTicketChange = this.handleTicketChange.bind(this);
    this.handleKbLinkPopupSearch = this.handleKbLinkPopupSearch.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleEditCustomerOpen = this.handleEditCustomerOpen.bind(this);
    this.handleCustomerStoreStatus = this.handleCustomerStoreStatus.bind(this);
    this.handleCustomerAttachamentStatus = this.handleCustomerAttachamentStatus.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCopyToaster = this.handleCopyToaster.bind(this);
  }

  handleCopyToaster() {
    debugger;
    setTimeout(() => {
      if (
        this.state.copiedNumber &&
        this.state.customerData.customerPhoneNumber
      ) {
        NotificationManager.success("Copied.");
      }
    }, 100);
  }

  toggleTitleSuggestion() {
    // this.setState({ toggleTitle: !this.state.toggleTitle });
    this.setState({ toggleTitle: true });
  }
  HandleKbLinkModalOpen() {
    this.setState({ KbLink: true });
  }
  HandleKbLinkModalClose() {
    this.setState({ KbLink: false });
  }
  handleThumbModalOpen() {
    this.setState({ Plus: true });
  }
  handleThumbModalClose() {
    this.setState({ Plus: false });
  }
  handleEditCustomerOpen() {
    this.setState({ EditCustomer: true });
  }
  handleTaskMasterChange = taskData => {
    this.setState({
      taskMaster: taskData
    });
  };
  handleCustomerAttachamentStatus(custAttachOrder) {
    this.setState({
      customerAttachOrder: custAttachOrder
    });
  }
  handleGetOrderId = selectedDataRow => {
    this.setState({
      selectedDataIds: selectedDataRow
    });
  };
  handleGetStoreId = selectedStoreData => {
    this.setState({
      selectedStoreIDs: selectedStoreData
    });
  };
  handleCustomerStoreStatus(WantVisit, AlreadyCustomerVisit) {
    debugger;
    this.setState({
      custVisit: WantVisit,
      AlreadycustVisit: AlreadyCustomerVisit
    });
  }
  handleEditCustomerClose() {
    this.setState({
      EditCustomer: false,
      customerName: "",
      customerPhoneNumber: "",
      customerEmailId: "",
      genderID: 1,
      dob: "",
      altNumber: "",
      altEmailID: ""
    });
    this.validator.hideMessages();
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
      showAddNote: !showAddNote,
      ticketNote: ""
    });
  }
  showInformStoreFuncation = () => {
    this.setState({
      InformStore: !this.state.InformStore
    });
  };
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
  handleEscalationChange() {
    this.setState({
      escalationLevel: 1
    });
  }
  handlechangebtntab(e) {
    var idIndex = e.target.className;
    this.setState({ TabIconColor: idIndex });
  }

  handleTicketChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  handleMailOnChange(filed, e) {
    debugger;
    var mailFiled = this.state.mailFiled;
    mailFiled[filed] = e.target.value;

    if (filed === "userCC") {
      this.setState({ mailFiled });
    } else {
      this.setState({ mailFiled });
    }
  }
  handleUpdateCustomer() {
    debugger;
    let self = this;
    // var Dob= moment(this.state.CustData.editDOB).format("DD/MM/YYYY");
    if (this.validator.allValid()) {
      axios({
        method: "post",
        url: config.apiUrl + "/Customer/updateCustomer",
        headers: authHeader(),
        data: {
          CustomerID: this.state.CustData.customerID,
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
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleGetTicketTitleList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/gettitlesuggestions",
      headers: authHeader(),
      params: {
        TikcketTitle: this.state.titleSuggValue
      }
    }).then(function(res) {
      debugger;
      let TicketTitleData = res.data.responseData;
      self.setState({ TicketTitleData: TicketTitleData });
    });
  }
  handleCkEditorTemplate() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/getListOfTemplateForNote",
      headers: authHeader(),
      params: {
        IssueTypeID: this.state.selectedIssueType
      }
    }).then(function(res) {
      debugger;
      let CkEditorTemplateData = res.data.responseData;
      self.setState({ CkEditorTemplateData: CkEditorTemplateData });
    });
  }
  handleCkEditorTemplateData(tempId, tempName) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/getTemplateContent",
      headers: authHeader(),
      params: {
        TemplateId: tempId
      }
    }).then(function(res) {
      debugger;
      let CkEditorTemplateDetails = res.data.responseData;
      let bodyData = res.data.responseData.templateBody;
      self.setState({
        CkEditorTemplateDetails: CkEditorTemplateDetails,
        tempName: tempName,
        selectTicketTemplateId: tempId,
        mailBodyData: bodyData
      });
    });
  }
  handleKbLinkPopupSearch() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/KnowledgeBase/searchbycategory",
      headers: authHeader(),
      params: {
        Type_ID: this.state.selectedIssueTypeKB,
        Category_ID: this.state.selectedCategoryKB,
        SubCategor_ID: this.state.selectedSubCategoryKB
      }
    }).then(function(res) {
      debugger;
      let KbPopupData = res.data.responseData;
      if (KbPopupData.length === 0 || KbPopupData === null) {
        NotificationManager.error("No Record Found.");
      }
      self.setState({ KbPopupData: KbPopupData });
    });
  }
  handleGetBrandList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let BrandData = res.data.responseData;
      self.setState({ BrandData: BrandData });
    });
  }
  handleGetCategoryList(brandId = 0) {
    debugger;
    let self = this;
    self.setState({
      CategoryData: [],
      selectedCategory: 0,
      SubCategoryData: [],
      selectedSubCategory: 0,
      IssueTypeData: [],
      selectedIssueType: 0
    });
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: brandId
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
    self.setState({
      SubCategoryData: [],
      selectedSubCategory: 0,
      IssueTypeData: [],
      selectedIssueType: 0
    });
    let cateId = this.state.KbLink
      ? this.state.selectedCategoryKB
      : this.state.selectedCategory;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
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
    self.setState({ IssueTypeData: [], selectedIssueType: 0 });
    let subCateId = this.state.KbLink
      ? this.state.selectedSubCategoryKB
      : this.state.selectedSubCategory;
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
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let ChannelOfPurchaseData = res.data.responseData;
      self.setState({ ChannelOfPurchaseData: ChannelOfPurchaseData });
    });
  }

  handleGetCustomerData(CustId, mode) {
    this.setState({ loading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Customer/getcustomerdetailsbyid",
      headers: authHeader(),
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
        self.setState({ customerData: customerData, loading: false });
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

    if (customerDetails) {
      var custId = customerDetails.customerId;
      this.setState({ customerDetails, customer_Id: custId });
      this.handleGetCustomerData(custId);
      // this.handleGetTicketTitleList();
      this.handleGetBrandList();
      // this.handleGetCategoryList();
      this.handleGetChannelOfPurchaseList();
      this.handleGetTicketPriorityList();
    } else {
      this.props.history.push("addSearchMyTicket");
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // this.setState({ toggleTitle: false });
      this.setState({ TicketTitleData: [] });
    }
  }
  handleTicketSuggestion = ticketSuggestion => {
    this.setState({ ticketSuggestion });
  };

  handleAppendTicketSuggestion = e => {
    debugger;
    this.setState({ toggleTitle: true });
    var startPoint = document.getElementById("titleSuggestion").selectionStart;
    var textLength = document.getElementById("titleSuggestion").value.length;
    var textBefore = document
      .getElementById("titleSuggestion")
      .value.substring(0, startPoint);
    var textAfter = document
      .getElementById("titleSuggestion")
      .value.substring(startPoint, textLength);
    // alert(textBefore + "....." + textAfter);
    let clickedInfo = e.currentTarget.innerText;
    let titleSuggValue = this.state.titleSuggValue;
    titleSuggValue = textBefore + " " + clickedInfo + " " + textAfter;
    this.setState({ titleSuggValue });
    this.searchInput.focus();
  };
  handleTicSugg = e => {
    debugger;
    let ticSugg = e.currentTarget.value;
    this.setState({ titleSuggValue: ticSugg });
    setTimeout(() => {
      if (this.state.titleSuggValue.length > 2) {
        this.handleGetTicketTitleList();
      } else {
        this.setState({
          TicketTitleData: []
        });
      }
    }, 1);
  };
  handleFileUpload(e) {
    debugger;
    // var file = [];
    // file = e.target.files;
    // for (let i = 0; i < file.length; i++) {
    //   // formData.append('file', fileData[i])
    //   this.state.file.push(file[i]);
    //   this.setState({
    //     file: file
    //   });
    // }
    // console.log(this.state.file, "fileUpload");

    // var file = [];
    // file = this.state.file;
    // this.setState({
    //   file
    // });
// -------------------------Image View code start-----------------------
    const img = e;
    if (e.target.files && e.target.files[0]) {
      const filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = file => {
          // console.log(file.target.result);
          this.setState({
            imageView: file.target.result
          });
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
    for (let i = 0; i < e.target.files.length; i++) {
      this.state.file.push(e.target.files[i]);
    }

  // -------------------------Image View code end-----------------------
    this.setState({ fileText: this.state.file.length });

    // this.setState({fileText:"files"});
  }

  handleCREATE_TICKET(StatusID) {
    debugger;
    // this.setState({ loading: true });
    // if (this.validator.allValid()) {
    if (this.state.titleSuggValue.length > 0 && this.state.ticketDetails.length > 0 && this.state.selectedBrand.length > 0 && this.state.selectedCategory.length > 0 && this.state.selectedSubCategory.length > 0) {
    this.setState({ loading: true });
    let self = this;
    // var OID = this.state.selectedTicketPriority;
    var selectedRow = "";
    for (var i = 0; i < this.state.selectedDataIds.length; i++) {
      selectedRow += this.state.selectedDataIds[i] + ",";
    }

    var selectedStore = "";
    for (let j = 0; j < this.state.selectedStoreIDs.length; j++) {
    selectedStore += this.state.selectedStoreIDs[j]["storeID"] + ",";
    }
    var actionStatusId = 0;
    if (StatusID === "200") {
      actionStatusId = 103;
    } else if (StatusID === "201") {
      actionStatusId = 101;
    } else {
      actionStatusId = 100;
    }
    var mailData = [];
    mailData = this.state.mailData;
    this.state.mailFiled["ToEmail"] = this.state.customerData.customerEmailId;
    this.state.mailFiled["TikcketMailSubject"] = "Demo Subject";
    this.state.mailFiled["TicketMailBody"] = this.state.tempName;
    this.state.mailFiled["PriorityID"] = this.state.selectedTicketPriority;
    this.state.mailFiled["IsInforToStore"] = this.state.InformStore;
    mailData.push(this.state.mailFiled);
    // var want = this.state.custVisit;
    // var Already = this.state.AlreadycustVisit;
    // var uploadFiles = [];
    // uploadFiles = this.state.file;
    var formData = new FormData();

    var paramData = {
      // TicketTitle: this.state.ticketSuggestion.ticketTitle,
      TicketTitle: this.state.titleSuggValue,
      Ticketdescription: this.state.ticketDetails,
      CustomerID: this.state.customer_Id,
      BrandID: this.state.selectedBrand,
      CategoryID: this.state.selectedCategory,
      SubCategoryID: this.state.selectedSubCategory,
      IssueTypeID: this.state.selectedIssueType,
      PriorityID: this.state.selectedTicketPriority,
      ChannelOfPurchaseID: this.state.selectedChannelOfPurchase,
      Ticketnotes: this.state.ticketNote,
      taskMasters: this.state.taskMaster,
      StatusID: actionStatusId,
      TicketActionID: this.state.selectedTicketActionType,
      IsInstantEscalateToHighLevel: this.state.escalationLevel,
      IsWantToAttachOrder: this.state.customerAttachOrder,
      TicketTemplateID: this.state.selectTicketTemplateId,
      IsWantToVisitedStore: this.state.custVisit,
      IsAlreadyVisitedStore: this.state.AlreadycustVisit,
      TicketSourceID: 1,
      OrderItemID: selectedRow.substring(",", selectedRow.length - 1),
      StoreID: selectedStore.substring(",", selectedStore.length - 1),
      ticketingMailerQues: mailData
    };
    formData.append("ticketingDetails", JSON.stringify(paramData));
    formData.append("Form", this.state.file[0]);
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/createTicket",
      headers: authHeader(),
      data: formData
    }).then(function(res) {
      debugger;
      let Msg = res.data.status;
      self.setState({ loading: false });
      if (Msg) {
        NotificationManager.success(res.data.message);
        setTimeout(function() {
          self.props.history.push("myTicketlist");
        }, 100);
      } else {
        NotificationManager.error(res.data.message);
      }
    });
  } else {
    this.setState({
      ticketTitleCompulsion: 'Ticket Title field is compulsory.',
      ticketDetailsCompulsion: 'Ticket Details field is compulsory.',
      ticketBrandCompulsion: 'Brand field is compulsory.',
      ticketCategoryCompulsion: 'Category field is compulsory.',
      ticketSubCategoryCompulsion: 'Sub Category field is compulsory.',
    })
  }
   
  // Don't remove this function
  }
  // handleSendMailData() {
  //   debugger;
  //   var subject = "Demo Mail";
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "/Ticketing/SendMail",
  //     headers: authHeader(),
  //     params: {
  //       EmailID: this.state.customerData.customerEmailId,
  //       Mailcc: this.state.mailFiled.userCC,
  //       Mailbcc: this.state.mailFiled.userBCC,
  //       Mailsubject: subject,
  //       MailBody: this.state.mailBodyData,
  //       informStore: this.state.InformStore,
  //       storeID: ""
  //     }
  //   }).then(function(res) {
  //     debugger;
  //     let status = res.data.status;
  //     if (status === true) {
  //       NotificationManager.success(res.data.responseData);
  //     } else {
  //       NotificationManager.error(res.data.responseData);
  //     }
  //   });
  // }

  handlebackprev() {
    this.props.history.push("myTicketList");
  }
  setBrandValue = e => {
    debugger;
    let brandValue = e.currentTarget.value;
    this.setState({ selectedBrand: brandValue });
    this.handleGetCategoryList(brandValue);
  };
  setIssueTypeValue = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });

    setTimeout(() => {
      if (this.state.selectedIssueType) {
        this.handleCkEditorTemplate();
      }
    }, 1);
  };
  setIssueTypeValueKB = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeKB: issueTypeValue });
  };
  setTicketPriorityValue = e => {
    let ticketPriorityValue = e.target.value;
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
    // debugger;
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
  renderIcon(name){
    debugger;
    let ext=name.split('.')[1].toLowerCase();
    if(ext==="xls"||ext==="xlsx")
    {
      return(     
        Excel
      )
    }
    else if(ext==="doc" ||ext==="docx" || ext==="txt")
    {
      return(     
        Word
      )
    }
    else if(ext==="csv")
    {
      return(     
        CSVi
      )
    }
    else if(ext==="pdf")
    {
      return(     
        PDF
      )
    }
    else{
      return(     
        ThumbTick
      )
    }
   
  }
  render() {  
    var CustomerId = this.state.customerDetails.customerId;
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
                    onClick={this.handlebackprev.bind(this)}
                  />
                  <label className="source">Source</label>
                  <img
                    src={RedHeadPhoneIcon}
                    alt="headphone"
                    className="bitmapheadpone"
                  />
                  <label className="a91-9873470074">{CustNumber}</label>
                  <CopyToClipboard
                    text={CustNumber}
                    onCopy={() => this.setState({ copiedNumber: true })}
                  >
                    <img
                      src={CopyIcon}
                      alt="Copy-Icon"
                      className="bitmapheadpone"
                      onClick={this.handleCopyToaster}
                    />
                  </CopyToClipboard>
                  {/* {this.state.copiedNumber ? (
                    <span
                      className="ml-2"
                      style={{ color: "red", display: "initial" }}
                    >
                      Copied.
                    </span>
                  ) : null} */}
                </td>

                <td className="tdtextnew" style={{ padding: "5px" }}>
                  <button
                    type="button"
                    className="save-as-a-draft"
                    onClick={this.handleCREATE_TICKET.bind(this, "100")}
                  >
                    SAVE AS DRAFT
                  </button>
                  <button
                    className="rectanglecreateticket create-ticket"
                    // onClick={this.handleSubmitReopnModalOpen.bind(this)}
                    onClick={this.handleCREATE_TICKET.bind(
                      this,
                      this.state.selectedTicketActionType
                    )}
                  >
                    {/* CREATE TICKET */}
                    {this.state.selectedTicketActionType === "200"
                      ? "SUBMIT AS SOLVED"
                      : "CREATE TICKET"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mask-ticket-system">
          {this.state.loading === true ? (
            <div className="loader-icon"></div>
          ) : (
            <div className="row marginsystem">
              <div className="column marginsystem1">
                <div className="paddingsystem">
                  <div className="row m-b-10">
                    <div className="col-md-12">
                      <label className="category">Ticket Title</label>
                      {/* <div className="ticket-title-select">
                      <Select
                        // className="rate-dropdown"
                        getOptionLabel={option => option.ticketTitle}
                        getOptionValue={option => option.ticketTitle}
                        options={this.state.TicketTitleData}
                        placeholder="Suggestion"
                        value={this.state.ticketSuggestion}
                        onChange={this.handleTicketSuggestion}
                        // menuIsOpen={true}
                        // name="ticketSuggestion"
                        // showNewOptionAtTop={false}
                      />
                    </div> */}
                      <div
                        className="custom-ticket-title"
                        onClick={() => this.toggleTitleSuggestion()}
                        ref={this.setWrapperRef}
                      >
                        <input
                          placeholder="Suggestions"
                          value={this.state.titleSuggValue}
                          type="text"
                          onChange={this.handleTicSugg}
                          ref={input => {
                            this.searchInput = input;
                          }}
                          id="titleSuggestion"
                          autoComplete="off"
                          style={{ 'marginBottom' : '5px' }}
                        />
                        {this.state.titleSuggValue.length === 0 && <p style={{ 'color' : 'red', 'marginBottom' : '0px' }}>{this.state.ticketTitleCompulsion}</p>}
                        {this.validator.message(
                          "TicketTitle",
                          this.state.titleSuggValue,
                          "required"
                        )}
                        {this.state.TicketTitleData !== null &&
                          this.state.TicketTitleData.length > 0 &&
                          this.state.titleSuggValue.length > 0 && (
                            <div className="custom-ticket-title-suggestions">
                              {this.state.TicketTitleData !== null &&
                                this.state.TicketTitleData.map((item, i) => (
                                  <span
                                    key={i}
                                    onClick={this.handleAppendTicketSuggestion}
                                  >
                                    {item.ticketTitle}
                                  </span>
                                ))}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="row m-b-10">
                    <div className="col-md-12">
                      <label className="category">Ticket Details</label>
                      <textarea
                        className="ticket-details-textarea-system"
                        placeholder="Write your title here"
                        name="ticketDetails"
                        value={this.state.ticketDetails}
                        onChange={this.handleTicketChange}
                        maxLength={250}
                      ></textarea>
                      {this.state.ticketDetails.length === 0 && <p style={{ 'color' : 'red', 'marginBottom' : '0px' }}>{this.state.ticketDetailsCompulsion}</p>}
                      {this.validator.message(
                        "ticketDetails",
                        this.state.ticketDetails,
                        "required"
                      )}
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
                        <option value='' className="select-category-placeholder">
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
                      {this.state.selectedBrand.length === 0 && <p style={{ 'color' : 'red', 'marginBottom' : '0px' }}>{this.state.ticketBrandCompulsion}</p>}
                    </div>
                    <div className="col-md-6">
                      <label className="sub-category">Category</label>
                      <select
                        value={this.state.selectedCategory}
                        onChange={this.setCategoryValue}
                        className="category-select-system dropdown-label"
                      >
                        <option value='' className="select-category-placeholder">
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
                      {this.state.selectedCategory.length === 0 && <p style={{ 'color' : 'red', 'marginBottom' : '0px' }}>{this.state.ticketCategoryCompulsion}</p>}
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
                        <option value='' className="select-category-placeholder">
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
                      {this.state.selectedSubCategory.length === 0 && <p style={{ 'color' : 'red', 'marginBottom' : '0px' }}>{this.state.ticketSubCategoryCompulsion}</p>}
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
                      {this.state.selectedSubCategory.length === 0 && <p style={{ 'color' : 'red', 'marginBottom' : '0px' }}>{this.state.ticketIssueTypeCompulsion}</p>}
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
                                value={item.priorityID}
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
                    {/* <img
                      src={this.state.imageView}
                      alt="thumb"
                      className="thumbtick"
                    /> */}
                    {this.state.file.map((item, i) =>
                      i < 5 ? (
                        <img
                           src={this.renderIcon(this.state.file[i].name)}
                           title={this.state.file[i].name}
                          href={item[i]}
                          alt="thumb"
                          className="thumbtick"
                        />
                      //   <img
                      //   src={this.state.imageView}
                      //   alt="thumb"
                      //   className="thumbtick"
                      // />
                      ) : (
                        ""
                      )
                    )}

                    {this.state.file.length > 4 ? (
                      <img
                        src={PlusImg}
                        alt="thumb"
                        className="thumbtick-plus"
                        onClick={this.handleThumbModalOpen.bind(this)}
                      />
                    ) : (
                      <img
                        style={{ display: "none" }}
                        src={PlusImg}
                        alt="thumb"
                        className="thumbtick-plus"
                        onClick={this.handleThumbModalOpen.bind(this)}
                      />
                    )}
                  </div>
                  <Modal
                    open={this.state.Plus}
                    onClose={this.handleThumbModalClose.bind(this)}
                    modalId="thumb-modal-popup"
                    overlayId="logout-ovrlykb"
                  >
                    <div>
                      <div className="close">
                        <img
                          src={CancelImg}
                          alt="cross-icon"
                          onClick={this.handleThumbModalClose.bind(this)}
                        />
                      </div>
                      <div className="row my-3 mx-1">
                        {this.state.file.map((item, i) => (
                          <img
                            src={this.renderIcon(this.state.file[i].name)}
                            title={this.state.file[i].name}
                            className="thumbtick"
                            style={{ marginBottom: "10px" }}
                          />
                        ))}
                      </div>
                    </div>
                  </Modal>
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
                        <FontAwesomeIcon icon={faCalculator} />
                        {this.state.tempName === ""
                          ? "Template"
                          : this.state.tempName}
                      </button>
                      <ul className="dropdown-menu">
                        {this.state.CkEditorTemplateData !== null &&
                          this.state.CkEditorTemplateData.map((item, i) => (
                            <li key={i} value={item.templateID}>
                              <a
                                onClick={this.handleCkEditorTemplateData.bind(
                                  this,
                                  item.templateID,
                                  item.templateName
                                )}
                                href="#!"
                              >
                                {item.templateName}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <a href="#!" className="kblink1">
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
                  </div>
                  <div className="row">
                    <div className="col-md-12 ck-det-cntr">
                      <CKEditor
                        data={this.state.CkEditorTemplateDetails.templateBody}
                        // style={{ height: "400px" }}
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
                              name: "editing",
                              items: ["Scayt"]
                            }
                            // {
                            //   name: "tools",
                            //   items: ["Maximize"]
                            // },
                          ]
                        }}
                      />
                      <div
                        className="row colladrowa"
                        style={{ bottom: "15px" }}
                      >
                        <div className="col-md-12 colladrow">
                          <ul className="ticsys">
                            <li className="diwamargin">
                              <label>
                                To: {this.state.customerData.customerEmailId}
                              </label>
                            </li>
                            <li>
                              <div className="filter-checkbox">
                                <input
                                  type="checkbox"
                                  id="fil-open"
                                  name="filter-type"
                                  style={{ display: "none" }}
                                  onChange={() =>
                                    this.showInformStoreFuncation()
                                  }
                                  
                                  disabled={this.state.selectedStoreIDs.length === 0}
                                />
                                <label
                                  htmlFor="fil-open"
                                  style={{ paddingLeft: "25px" }}
                                >
                                  <span>Inform Store</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <span>
                                <input
                                  id="file-upload"
                                  className="file-upload1 d-none"
                                  type="file"
                                  name="file"
                                  onChange={this.handleFileUpload.bind(this)}
                                  multiple
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
                              <label style={{ color: "#2561a8" }}>
                                {this.state.fileText} files
                              </label>
                            </li>
                            <li>
                              <label className="diwamargin">
                                <div
                                  className="input-group"
                                  // style={{ display: "block" }}
                                >
                                  <span className="input-group-addon inputcc">
                                    CC:
                                  </span>
                                  <input
                                    type="text"
                                    className="CCdi1"
                                    name="userCC"
                                    value={this.state.mailFiled.userCC}
                                    onChange={this.handleMailOnChange.bind(
                                      this,
                                      "userCC"
                                    )}
                                  />

                                  <span className="input-group-addon inputcc-one">
                                    +1
                                  </span>
                                </div>
                              </label>
                            </li>

                            <li>
                              <label className="diwamargin">
                                <div
                                  className="input-group"
                                  // style={{ display: "block" }}
                                >
                                  <span className="input-group-addon inputcc">
                                    BCC:
                                  </span>
                                  <input
                                    type="text"
                                    className="CCdi1"
                                    name="userBCC"
                                    value={this.state.mailFiled.userBCC}
                                    onChange={this.handleMailOnChange.bind(
                                      this,
                                      "userBCC"
                                    )}
                                  />
                                  <span className="input-group-addon inputcc-one">
                                    +1
                                  </span>
                                </div>
                              </label>
                            </li>
                            {/* <li>
                              <button
                                className="send1"
                                type="button"
                                onClick={this.handleSendMailData.bind(this)}
                              >
                                Send
                              </button>
                            </li> */}
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
                        <label
                          htmlFor="fil-add"
                          style={{ paddingLeft: "25px" }}
                        >
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
                          name="escalationLevel"
                          value={this.state.escalationLevel}
                          style={{ display: "none" }}
                          onChange={this.handleEscalationChange.bind(this)}
                        />
                        <label
                          htmlFor="fil-add1"
                          style={{ paddingLeft: "25px" }}
                        >
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
                            name="ticketNote"
                            value={this.state.ticketNote}
                            onChange={this.handleTicketChange}
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
                          <div
                            className="paddingsystem"
                            style={{ borderBottom: "1px solid #EDEDED" }}
                          >
                            <div className="row">
                              <div className="col-md-4">
                                <label className="category2">
                                  Customer Name
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category2">
                                  Phone Number
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category2">Email Id</label>
                              </div>
                            </div>

                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                            >
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

                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                            >
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
                            {this.validator.message(
                              "Full Name",
                              this.state.CustData.customername,
                              "required|alpha_space"
                            )}
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
                              disabled
                            />
                            {this.validator.message(
                              "Mobile Number",
                              this.state.CustData.customerPhone,
                              "required|integer|size:10"
                            )}
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
                              disabled
                            />
                            {this.validator.message(
                              "Email Id",
                              this.state.CustData.custEmailId,
                              "required|email"
                            )}
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
                            {this.validator.message(
                              "Date of Birth",
                              this.state.CustData.editDOB,
                              "required"
                            )}
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
                            {this.validator.message(
                              "Alternate Number",
                              this.state.CustData.altNo,
                              "integer|size:10"
                            )}
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
                            {this.validator.message(
                              "Alternate Email Id",
                              this.state.CustData.altEmail,
                              "email"
                            )}
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
                          {/* <button
                          type="button"
                          className="butn add-cust-butn"
                          onClick={this.handleUpdateCustomer.bind(this)}
                          disabled={this.state.loading}
                        >
                          {this.state.loading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                              ""
                            )}
                          {this.state.loading ? "Please Wait ..." : "SAVE"}
                        </button> */}
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
                      <TicketSystemOrder
                        custDetails={CustomerId}
                        AttachOrder={this.handleCustomerAttachamentStatus}
                        getOrderId={this.handleGetOrderId}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="store-tab"
                      role="tabpanel"
                      aria-labelledby="store-tab"
                      style={{ height: "100%" }}
                    >
                      <TicketSystemStore
                        CustStoreStatus={this.handleCustomerStoreStatus}
                        getStoreID={this.handleGetStoreId}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="task-tab"
                      role="tabpanel"
                      aria-labelledby="task-tab"
                      style={{ height: "100%" }}
                    >
                      <TicketSystemTask
                        taskMasterData={this.handleTaskMasterChange}
                      />
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
                                  onClick={() =>
                                    this.setState({ copied: false })
                                  }
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
                                    onCopy={() =>
                                      this.setState({ copied: true })
                                    }
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
          )}
        </div>
      </div>
    );
  }
}

export default TicketSystem;
