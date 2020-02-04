import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadphoneImg from "./../assets/Images/headphone.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import BlackUserIcon from "./../assets/Images/avatar.png";
import DownImg from "./../assets/Images/down.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import LoadingImg from "./../assets/Images/loading.png";
import EyeImg from "./../assets/Images/eye.png";
import BillInvoiceImg from "./../assets/Images/bill-Invoice.png";
import MsgImg from "./../assets/Images/msg.png";
import Down1Img from "./../assets/Images/down-1.png";
import PlusImg from "./../assets/Images/plus.png";
import MinusImg from "./../assets/Images/minus.png";
import RightImg from "./../assets/Images/right.png";
import DeleteImg from "./../assets/Images/del-black.png";
import Up1Img from "./../assets/Images/up-1.png";
import Loading1Img from "./../assets/Images/loading1.png";
import FacebookImg from "./../assets/Images/facebook.png";
import ClipImg from "./../assets/Images/clip.png";
import PencilImg from "./../assets/Images/pencil.png";
import CancelImg from "./../assets/Images/cancel.png";
import { Collapse, CardBody, Card } from "reactstrap";
import { Drawer } from "antd";
import CustomerIcon from "./../assets/Images/customer-icon.png";
import UserIcon from "./../assets/Images/UserIcon.png";
import CrossIcon from "./../assets/Images/cancel.png";
import StoreIcon from "./../assets/Images/store.png";
import MyTicketTask from "./Tabs/MyTicketTask";
import MyTicketClaim from "./Tabs/MyTicketClaim";
import FileUpload from "./../assets/Images/file.png";
import CKEditor from "ckeditor4-react";
import ReactTable from "react-table";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
// import DownArrowIcon from "./../assets/Images/down-1.png";
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import Email1 from "./../assets/Images/SecuredLetter2.png";
import Sms1 from "./../assets/Images/Sms.png";
import Facebook1 from "./../assets/Images/facebook.png";
import Call1 from "./../assets/Images/call.png";
import Ticket from "./../assets/Images/TicketGrey.png";
import MoreUp from "./../assets/Images/table-arr-up.png";
import CancelImgGrey from "./../assets/Images/CancelGrey.png";
import Order from "./../assets/Images/order.png";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import config from "./../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import TicketStatus from "./TicketStatus";
// import Select from "react-select";
import TicketActionType from "./TicketActionType";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CircleCancel from "./../assets/Images/Circle-cancel.png";
import ThumbTick from "./../assets/Images/thumbticket.png"; // Don't comment this line
import PDF from "./../assets/Images/pdf.png"; // Don't comment this line
import CSVi from "./../assets/Images/csvicon.png"; // Don't comment this line
import Excel from "./../assets/Images/excel.png"; // Don't comment this line
import Word from "./../assets/Images/word.png"; // Don't comment this line
import TxtLogo from "./../assets/Images/TxtIcon.png"; // Don't comment this line

class MyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      InformStore: false,
      collapseUp: true,
      profilemodal: false,
      storemodal: false,
      storeproductsearch: false,
      OrderTable: false,
      labelModal: false,
      EmailCollapse: false,
      CommentsDrawer: false,
      BillInvoiceModal: false,
      HistOrderShow: true,
      CommentCollapse: false,
      CommentCollapse2: false,
      Comment1Collapse: false,
      KbLink: false,
      CheckBoxChecked: false,
      ticket_Id: 0,
      NotesTab: 0,
      TaskTab: 0,
      ClaimTab: 0,
      Notesdetails: [],
      TicketPriorityData: [],
      BrandData: [],
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      ChannelOfPurchaseData: [],
      historicalDetails: [],
      storeDetails: [],
      ticketDetailsData: {},
      tabCounts: {},
      fileName: "",
      NoteAddComment: "",
      values: [
        {
          taskTitle: "",
          taskDescription: "",
          department: "",
          type: "",
          assign: ""
        }
      ],
      TicketStatusData: TicketStatus(),
      selectedTicketActionType: [],
      TicketActionTypeData: TicketActionType(),
      // taskTableGrid: [],
      SearchAssignData: [],
      // selectetedParameters: {},
      claimDetailsData: [],
      selectetedParameters: {},
      KbPopupData: [],
      orderDetails: [],
      selectedIssueTypeKB: 0,
      selectedCategoryKB: 0,
      selectedSubCategoryKB: 0,
      CkEditorTemplateData: [],
      CkEditorTemplateDetails: [],
      selectedStore: [],
      selectedProduct: [],
      tempName: "",
      selectTicketTemplateId: 0,
      mailBodyData: "",
      SearchStore: "",
      custID: 0,
      loading: false,
      Plus: false,
      selectedStoreData: [],
      selectedDataRow: [],
      CheckStoreID: {},
      CheckOrderID: {},
      notesCommentCompulsion: "",
      userCC: "",
      userBCC: "",
      messageDetails: {},
      fileText: 0,
      file: [],
      userCcCount: 0,
      userBccCount: 0,
      mailFiled: {}
    };
    this.toggleView = this.toggleView.bind(this);
    this.handleGetTabsName = this.handleGetTabsName.bind(this);
    this.handleGetNotesTabDetails = this.handleGetNotesTabDetails.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    // this.handleGetTaskTableCount = this.handleGetTaskTableCount.bind(this);
    this.handleUpdateTicketStatus = this.handleUpdateTicketStatus.bind(this);
    this.handleGetTicketDetails = this.handleGetTicketDetails.bind(this);
    this.handleGetCountOfTabs = this.handleGetCountOfTabs.bind(this);
    this.handleAssignDataList = this.handleAssignDataList.bind(this);
    this.handleKbLinkPopupSearch = this.handleKbLinkPopupSearch.bind(this);
    this.handleGetOrderDetails = this.handleGetOrderDetails.bind(this);
    this.handleGetProductData = this.handleGetProductData.bind(this);
    this.handleGetMessageDetails = this.handleGetMessageDetails.bind(this);
    this.hanldeGetSelectedStoreData = this.hanldeGetSelectedStoreData.bind(
      this
    );
  }

  componentDidMount() {
    debugger;
    if (this.props.location.ticketDetailID) {
      var ticketId = this.props.location.ticketDetailID;
      this.setState({ HistOrderShow: true, ticket_Id: ticketId });
      this.handleGetTicketPriorityList();
      this.handleGetBrandList();
      this.handleGetChannelOfPurchaseList();
      this.handleGetNotesTabDetails(ticketId);
      this.handleGetTicketDetails(ticketId);
      // this.handleGetTaskTableCount(ticketId);
      this.handleGetCountOfTabs(ticketId);
      this.handleGetMessageDetails(ticketId);
    } else {
      this.props.history.push("myTicketlist");
    }
  }

  handleGetTicketDetails(ID) {
    debugger;
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getTicketDetailsByTicketId",
      headers: authHeader(),
      params: {
        ticketID: ID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        var customer_Id = data.customerID;
        var ticketStatus = data.status;
        var ticketPriority = data.priortyID;
        var ticketBrand = data.brandID;
        var ticketCagetory = data.categoryID;
        var ticketSubGategory = data.subCategoryID;
        var ticketChannelOfPurchaseID = data.channelOfPurchaseID;
        var ticketActionType = data.ticketActionTypeID;
        var ticketIssueTypeID = data.issueTypeID;
        var selectetedParameters = {
          ticketStatusID: ticketStatus,
          priorityID: ticketPriority,
          brandID: ticketBrand,
          categoryID: ticketCagetory,
          subCategoryID: ticketSubGategory,
          channelOfPurchaseID: ticketChannelOfPurchaseID,
          ticketActionTypeID: ticketActionType,
          issueTypeID: ticketIssueTypeID
        };
        self.setState({
          ticketDetailsData: data,
          custID: customer_Id,
          selectetedParameters,
          loading: false
        });

        setTimeout(() => {
          self.handleGetCategoryList();
          self.handleGetSubCategoryList();
          self.handleGetIssueTypeList();
        }, 100);
      } else {
        self.setState({
          ticketDetailsData: {},
          custID: 0
        });
      }
    });
  }
  handleAssignDataList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getagentlist",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      self.setState({
        SearchAssignData: data
      });
    });
  }

  handleUpdateTicketStatus(ticStaId) {
    debugger;
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Updateticketstatus",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id,
        status: ticStaId
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      if (status === true) {
        if (ticStaId === 103) {
          NotificationManager.success("The ticket has been resolved.");
        } else if (ticStaId === 104) {
          NotificationManager.success("The ticket has been closed.");
        }
      }
    });
  }
  handleGetMessageDetails(ticketId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getticketmessage",
      headers: authHeader(),
      params: {
        ticketID: ticketId
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        let data = res.data.responseData[0];
        console.log(data,'data');
        
        self.setState({
          messageDetails: data
        });
      } else {
        self.setState({
          messageDetails: []
        });
      }
      // let status=res.data.status;
    });
  }
  handleGetOrderDetails() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getorderdetailsbycustomerid",
      headers: authHeader(),
      params: {
        CustomerID: this.state.custID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ orderDetails: data });
      } else {
        self.setState({ orderDetails: [] });
      }
    });
  }
  handleGetProductData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getOrderDetailByTicketID",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id
      }
    }).then(function(res) {
      debugger;
      let Msg = res.data.message;
      let data = res.data.responseData;
      if (Msg === "Success") {
        const newSelected = Object.assign({}, self.state.CheckOrderID);
        debugger;
        var selectedRow = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].orderMasterID) {
            newSelected[data[i].orderMasterID] = !self.state.CheckOrderID[
              data[i].orderMasterID
            ];
            selectedRow.push(data[i]);
            self.setState({
              CheckOrderID: data[i].orderMasterID ? newSelected : false
            });
          }
        }
        self.setState({
          selectedDataRow: selectedRow,
          selectedProduct: data
        });
        self.setState({
          selectedProduct: data
        });
      } else {
        self.setState({
          selectedProduct: []
        });
      }
    });
  }
  handleGetStoreDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/searchStoreDetail",
      headers: authHeader(),
      params: {
        SearchText: this.state.SearchStore
      }
    }).then(function(res) {
      let data = res.data.responseData;
      let Msg = res.data.message;
      if (Msg === "Success") {
        self.setState({ storeDetails: data });
      } else {
        self.setState({
          storeDetails: []
        });
      }
    });
  }
  handleGetCountOfTabs(ID) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetCountByticketID",
      headers: authHeader(),
      params: {
        ticketID: ID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ tabCounts: data });
      } else {
        self.setState({ tabCounts: {} });
      }
    });
  }
  handleUpdateTicketDetails() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Updateticketstatus",
      headers: authHeader(),
      data: {
        TicketID: this.state.ticket_Id,
        StatusID: this.state.selectetedParameters.ticketStatusID,
        BrandID: this.state.selectetedParameters.brandID,
        CategoryID: this.state.selectetedParameters.categoryID,
        SubCategoryID: this.state.selectetedParameters.subCategoryID,
        IssueTypeID: this.state.selectetedParameters.issueTypeID,
        PriortyID: this.state.selectetedParameters.priorityID,
        ChannelOfPurchaseID: this.state.selectetedParameters
          .channelOfPurchaseID,
        TicketActionID: this.state.selectetedParameters.ticketActionTypeID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("Ticket updated successfully.");
        self.props.history.push("myticket");
      } else {
        NotificationManager.error("Ticket not update");
      }
    });
  }

  // handleGetTaskTableCount(ID) {
  //   debugger;
  //   let self = this;
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "/Task/gettasklist",
  //     headers: authHeader(),
  //     params: {
  //       TicketId: ID
  //     }
  //   }).then(function(res) {
  //     debugger;
  //     let status = res.data.message;
  //     let data = res.data.responseData;
  //     if (status === "Success") {
  //       self.setState({ taskTableGrid: data });
  //     } else {
  //       self.setState({ taskTableGrid: [] });
  //     }
  //   });
  // }

  handleNoteOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
  handleDropDownChange = e => {
    debugger;
    let name = e.target.name;
    let Value = e.target.value;
    var data = this.state.selectetedParameters;
    if (name === "priorityID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data
      });
    } else if (name === "ticketStatusID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data
      });
    } else if (name === "brandID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data,
        CategoryData: [],
        SubCategoryData: [],
        IssueTypeData: []
      });
      setTimeout(() => {
        if (this.state.selectetedParameters.brandID) {
          this.handleGetCategoryList();
        }
      }, 1);
    } else if (name === "categoryID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data,
        SubCategoryData: [],
        IssueTypeData: []
      });
      setTimeout(() => {
        if (this.state.selectetedParameters.categoryID) {
          this.handleGetSubCategoryList();
        }
      }, 1);
    } else if (name === "subCategoryID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data,
        IssueTypeData: []
      });

      setTimeout(() => {
        if (this.state.selectetedParameters.subCategoryID) {
          this.handleGetIssueTypeList();
        }
      }, 1);
    } else if (name === "channelOfPurchaseID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data
      });
    } else if (name === "issueTypeID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data
      });
    } else if (name === "ticketActionTypeID") {
      data[name] = Value;
      this.setState({
        selectetedParameters: data
      });
    }
  };

  handleGetBrandList() {
    debugger;
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
        self.setState({ BrandData: data });
      } else {
        self.setState({ BrandData: [] });
      }
    });
  }
  handleGetCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: this.state.selectetedParameters.brandID
      }
    }).then(function(res) {
      debugger;
      // let status=
      let data = res.data;
      self.setState({ CategoryData: data });
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
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ TicketPriorityData: data });
      } else {
        self.setState({ TicketPriorityData: [] });
      }
    });
  }
  handleGetSubCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.selectetedParameters.categoryID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ SubCategoryData: data });
      } else {
        self.setState({ SubCategoryData: [] });
      }
    });
  }
  handleGetIssueTypeList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.selectetedParameters.subCategoryID
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ IssueTypeData: data });
      } else {
        self.setState({ IssueTypeData: [] });
      }
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
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ ChannelOfPurchaseData: data });
      } else {
        self.setState({ ChannelOfPurchaseData: [] });
      }
    });
  }

  fileDragEnter = e => {
    e.preventDefault();
  };
  toggleView() {
    this.setState({
      HistOrderShow: !this.state.HistOrderShow
    });
  }
  HandleKbLinkModalOpen() {
    this.setState({ KbLink: true });
  }

  HandleClaimPageView() {
    this.props.history.push("claimTabTicketView");
  }
  HandleStoreProductSearchModalOpen() {
    this.setState({ storeproductsearch: true });
  }
  HandleStoreProductSearchModalClose() {
    this.setState({ storeproductsearch: false });
  }
  handleOrderTableOpen() {
    this.handleGetProductData();
    this.setState({ OrderTable: true });
  }
  handleOrderTableClose() {
    this.setState({ OrderTable: false, SearchStore: "" });
  }

  HandleStoreModalOpen() {
    this.hanldeGetSelectedStoreData();
    this.setState({ storemodal: true });
  }
  HandleStoreModalClose() {
    this.setState({ storemodal: false, SearchStore: "" });
  }
  handleUpOpen() {
    this.setState({ collapseUp: true });
  }
  handleUpClose() {
    this.setState({ collapseUp: false });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal() {
    this.setState({ open: false });
  }
  HandleProfileModalOpen() {
    this.setState({ profilemodal: true });
  }
  HandleProfileModalClose() {
    this.setState({ profilemodal: false });
  }
  HandlelabelModalOpen() {
    this.handleAssignDataList();
    this.setState({ labelModal: true });
  }
  HandlelabelModalClose() {
    this.setState({ labelModal: false });
  }
  HandleEmailCollapseOpen() {
    this.setState(state => ({ EmailCollapse: !state.EmailCollapse }));
  }
  handleCommentCollapseOpen() {
    this.setState(state => ({ CommentCollapse: !state.CommentCollapse }));
  }
  handleCommentCollapseClose() {
    this.setState(state => ({ CommentCollapse: false }));
  }
  hanldeCommentOpen2() {
    this.setState({ CommentCollapse2: true });
  }
  hanldeCommentClose2() {
    this.setState({ CommentCollapse2: false });
  }
  handleCommentCollapseOpen2() {
    this.setState(state => ({ CommentCollapse2: !state.CommentCollapse2 }));
    this.handleCommentCollapseClose();
  }
  HandleComment1CollapseOpen() {
    this.setState(state => ({ Comment1Collapse: !state.Comment1Collapse }));
  }
  handleCommentsDrawerOpen() {
    this.setState({ CommentsDrawer: true });
  }
  handleCommentsDrawerClose() {
    this.setState({ CommentsDrawer: false });
  }
  handleBillImgModalOpen() {
    this.handleGetOrderDetails();
    this.setState({ BillInvoiceModal: true });
  }
  handleBillImgModalClose() {
    this.setState({ BillInvoiceModal: false });
  }
  handleThumbModalOpen() {
    this.setState({ Plus: true });
  }
  handleThumbModalClose() {
    this.setState({ Plus: false });
  }
  handleSubmitForm(e) {
    e.preventDefault();
  }
  showInformStoreFuncation = () => {
    this.setState({
      InformStore: !this.state.InformStore
    });
  };
  handleGetTabsName(e) {
    let self = this;
    let CurrentActive = e.target.name;
    if (CurrentActive === "Task") {
      this.setState({
        TaskTab: 1,
        NotesTab: 0,
        ClaimTab: 0
      });
    } else if (CurrentActive === "Notes") {
      this.setState({
        TaskTab: 0,
        NotesTab: 3,
        ClaimTab: 0
      });
    } else if (CurrentActive === "Claim") {
      this.setState({
        TaskTab: 0,
        NotesTab: 0,
        ClaimTab: 2
      });
    }
    setTimeout(function() {
      self.props.history.push({
        state: self.state
      });
    }, 100);
  }
  handleNoteAddComments() {
    debugger;
    if (this.state.NoteAddComment.length > 0) {
      let self = this;

      axios({
        method: "post",
        url: config.apiUrl + "/Task/AddComment",
        headers: authHeader(),
        params: {
          CommentForId: this.state.NotesTab,
          Comment: this.state.NoteAddComment.trim(),
          Id: this.state.ticket_Id
        }
      }).then(function(res) {
        debugger;
        let status = res.data.status;
        if (status === true) {
          var id = self.state.ticket_Id;
          self.handleGetNotesTabDetails(id);
          NotificationManager.success("Comment added successfully.");
          self.setState({
            NoteAddComment: "",
            notesCommentCompulsion: ""
          });
        } else {
          NotificationManager.error("Comment not added.");
        }
      });
    } else {
      this.setState({
        notesCommentCompulsion: "The Notes field is compulsary."
      });
    }
  }
  handleGetHistoricalData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/gettickethistory",
      headers: authHeader(),
      params: {
        TicketId: this.state.ticket_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      let details = res.data.responseData;
      self.onOpenModal();
      if (status === true) {
        self.setState({ historicalDetails: details });
      }
    });
  }

  hanldeGetSelectedStoreData() {
    debugger;
    let self = this;
    // this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Store/getSelectedStores",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;

      if (status === "Success") {
        const newSelected = Object.assign({}, self.state.CheckStoreID);
        debugger;
        var selectedRow = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].storeID) {
            newSelected[data[i].storeID] = !self.state.CheckStoreID[
              data[i].storeID
            ];
            selectedRow.push(data[i]);
            self.setState({
              CheckStoreID: data[i].storeID ? newSelected : false
            });
          }
        }
        self.setState({
          selectedStoreData: selectedRow,
          selectedStore: data
          // loading: false
        });
      } else {
        self.setState({
          selectedStore: []
        });
      }
    });
  }

  handleAttachStoreData() {
    debugger;
    // let self = this;
    var selectedStore = "";
    for (let j = 0; j < this.state.selectedStoreData.length; j++) {
      selectedStore += this.state.selectedStoreData[j]["storeID"] + ",";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Store/attachstore",
      headers: authHeader(),
      params: {
        TicketId: this.state.ticket_Id,
        StoreId: selectedStore.substring(",", selectedStore.length - 1)
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      // let details = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("Store attached successfully.");
      } else {
        NotificationManager.error("Store not attached");
      }
    });
  }

  handleAttachProductData() {
    debugger;
    // let self = this;
    var selectedProduct = "";
    for (let j = 0; j < this.state.selectedDataRow.length; j++) {
      selectedProduct += this.state.selectedDataRow[j]["orderMasterID"] + ",";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Order/attachorder",
      headers: authHeader(),
      params: {
        TicketId: this.state.ticket_Id,
        OrderID: selectedProduct.substring(",", selectedProduct.length - 1)
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      // let details = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("Product attached successfully.");
      } else {
        NotificationManager.error("Product not attached");
      }
    });
  }
  handleGetNotesTabDetails(ticket_Id) {
    debugger;
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getNotesByTicketId",
      headers: authHeader(),
      params: {
        TicketId: ticket_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let details = res.data.responseData;
      if (status === "Success") {
        self.setState({ Notesdetails: details, loading: false });
      } else {
        self.setState({ Notesdetails: [], loading: false });
      }
    });
  }
  handleAddNewForm() {
    this.setState(prevState => ({
      values: [
        ...prevState.values,
        {
          taskTitle: "",
          taskDescription: "",
          department: "",
          type: "",
          assign: ""
        }
      ]
    }));
  }

  handleRemoveForm(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }
  CreateUIForm() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <div className="comment-padding">
          <label className="cmt-lbl" value={el || ""}>
            Task {i + 1}
          </label>
          <img
            src={DeleteImg}
            alt="DeleteImg"
            className="deleteImg"
            onClick={this.handleRemoveForm.bind(this, i)}
          />
          <div className="frm-margin">
            <input
              type="text"
              name="taskTitle"
              className="cmdtxt-2"
              placeholder="Task Title"
              value={el.taskTitle || ""}
              onChange={this.handleChange.bind(this, i)}
            />
          </div>
          <div className="frm-margin1">
            <textarea
              rows="6"
              className="cmt-textarea"
              placeholder="Task Description"
              value={el.taskDescription || ""}
              name="taskDescription"
              onChange={this.handleChange.bind(this, i)}
            ></textarea>
          </div>
          <div className="row frm-margin1">
            <div className="col-md-6">
              <select
                className="cmt-regtangleDDL select-CmtDDl"
                name="department"
                // value={el.department || ""}
                defaultValue={el.department || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>Select</option>
                <option>Department</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="cmt-regtangleDDL select-CmtDDl"
                name="type"
                defaultValue={el.type || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>Select</option>
                <option>Type</option>
              </select>
            </div>
          </div>
          <div className="row frm-margin1">
            <div className="col-md-6">
              <select
                className="cmt-regtangleDDL select-CmtDDl"
                name="assign"
                defaultValue={el.assign || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>Select</option>
                <option>Assign to</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
      </div>
    ));
  }
  handleChange(i, e) {
    const { name, value } = e.target;
    let values = [...this.state.values];
    values[i] = { ...values[i], [name]: value };
    this.setState({ values });
  }

  setTicketActionTypeValue = e => {
    this.setState({ selectedTicketActionType: e });
  };
  handleCheckOrderID(orderMasterID, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckOrderID);
    newSelected[orderMasterID] = !this.state.CheckOrderID[orderMasterID];
    this.setState({
      CheckOrderID: orderMasterID ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.selectedDataRow.length === 0) {
      selectedRow.push(rowData.orderMasterID);
      this.setState({
        selectedDataRow: selectedRow
      });
    } else {
      if (newSelected[orderMasterID] === true) {
        for (var i = 0; i < this.state.selectedDataRow.length; i++) {
          if (this.state.selectedDataRow[i] === rowData.orderMasterID) {
            selectedRow.splice(i, 1);

            break;
          } else {
            selectedRow = this.state.selectedDataRow;
            selectedRow.push(rowData.orderMasterID);
            break;
          }
        }
      } else {
        for (var j = 0; j < this.state.selectedDataRow.length; j++) {
          if (this.state.selectedDataRow[j] === rowData.orderMasterID) {
            selectedRow = this.state.selectedDataRow;
            selectedRow.splice(j, 1);
            break;
          }
        }
      }
    }

    this.setState({
      selectedDataRow: selectedRow
    });
  }
  //KB Templete Pop up Search API
  handleKbLinkPopupSearch() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/KnowledgeBase/searchbycategory",
      headers: authHeader(),
      params: {
        Type_ID: self.state.selectedIssueTypeKB,
        Category_ID: self.state.selectedCategoryKB,
        SubCategor_ID: self.state.selectedSubCategoryKB
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

  //Close funcation for KB Templete Search Modal
  HandleKbLinkModalClose() {
    this.setState({
      KbLink: false,
      selectedIssueTypeKB: 0,
      selectedCategoryKB: 0,
      selectedSubCategoryKB: 0,
      KbPopupData: []
    });
  }
  //Category change funcation in KB Templete Modal
  setCategoryValueKB = e => {
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategoryKB: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategoryKB) {
        this.handleGetSubCategoryList();
      }
    }, 1);
  };

  //Sub-Category change funcation in KB Templete Modal
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

  //Issue-Type change funcation in KB Templete Modal
  setIssueTypeValueKB = e => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeKB: issueTypeValue });
  };

  //Template Bind By IssueType funcation
  handleTemplateBindByIssueType() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/getListOfTemplateForNote",
      headers: authHeader(),
      params: {
        IssueTypeID: this.state.selectetedParameters.issueTypeID
      }
    }).then(function(res) {
      debugger;
      let CkEditorTemplateData = res.data.responseData;
      self.setState({ CkEditorTemplateData: CkEditorTemplateData });
    });
  }

  //get Template data for select template funcation
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
      let TemplateDetails = res.data.responseData;
      let bodyData = res.data.responseData.templateBody;
      self.setState({
        CkEditorTemplateDetails: TemplateDetails,
        tempName: tempName,
        selectTicketTemplateId: tempId,
        mailBodyData: bodyData
      });
    });
  }
  handleSendMailData() {
    debugger;
    var subject = "Demo Mail";
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/SendMail",
      headers: authHeader(),
      params: {
        EmailID: this.state.ticketDetailsData.customerEmailId,
        Mailcc: this.state.mailFiled.userCC,
        Mailbcc: this.state.mailFiled.userBCC,
        Mailsubject: subject,
        MailBody: this.state.CkEditorTemplateDetails.templateBody,
        informStore: this.state.InformStore,
        storeID: ""
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      if (status === true) {
        NotificationManager.success(res.data.responseData);
      } else {
        NotificationManager.error(res.data.responseData);
      }
    });
  }

  handleCheckStoreID(storeMasterID, rowData) {
    debugger;

    const newSelected = Object.assign({}, this.state.CheckStoreID);
    newSelected[storeMasterID] = !this.state.CheckStoreID[storeMasterID];
    this.setState({
      CheckStoreID: storeMasterID ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.selectedStoreData.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        selectedStoreData: rowData
      });
    } else {
      if (newSelected[storeMasterID] === true) {
        for (var i = 0; i < this.state.selectedStoreData.length; i++) {
          if (this.state.selectedStoreData[i] === rowData) {
            selectedRow.splice(i, 1);

            break;
          } else {
            selectedRow = this.state.selectedStoreData;
            selectedRow.push(rowData);
            break;
          }
        }
      } else {
        for (var j = 0; j < this.state.selectedStoreData.length; j++) {
          if (this.state.selectedStoreData[j] === rowData) {
            selectedRow = this.state.selectedStoreData;
            selectedRow.splice(j, 1);
            break;
          }
        }
      }
    }

    this.setState({
      selectedStoreData: selectedRow
    });
  }

  handleMailOnChange(filed, e) {
    debugger;
    var mailFiled = this.state.mailFiled;
    mailFiled[filed] = e.target.value;

    if (filed === "userCC") {
      var CcCount = mailFiled.userCC;
      var finalCount = CcCount.split(",");
      this.setState({ mailFiled, userCcCount: finalCount.length });
    } else {
      var BCcCount = mailFiled.userBCC;
      var finalCount = BCcCount.split(",");
      this.setState({ mailFiled, userBccCount: finalCount.length });
    }
  }

  handleFileUpload(e) {
    debugger;
    // -------------------------Image View code start-----------------------
    if (e.target.files && e.target.files[0]) {
      const filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = file => {
          this.setState({
            imageView: file.target.result
          });
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
    for (let i = 0; i < e.target.files.length; i++) {
      debugger;

      var objFile = new Object();
      var name = e.target.files[i].name;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;

      objFile.File = e.target.files[i];

      this.state.file.push(objFile);
    }

    // -------------------------Image View code end-----------------------
    this.setState({ fileText: this.state.file.length });
  }

  handleRemoveImage(i) {
    debugger;
    let file = this.state.file;
    file.splice(i, 1);
    var fileText=file.length;
    setTimeout(() => {
      this.setState({file,fileText});
    }, 50);
  }

  render() {
    console.log(this.state.messageDetails,'Demo');
    
    const {
      open,
      ticketDetailsData,
      historicalDetails,
      SearchAssignData,
      orderDetails,
      selectedProduct,
      storeDetails,
      selectedStore,
      messageDetails
    } = this.state;
    const HidecollapsUp = this.state.collapseUp ? (
      <img
        src={Up1Img}
        alt="up"
        className="up-1"
        onClick={this.handleUpClose.bind(this)}
      />
    ) : (
      <img
        src={Down1Img}
        alt="up"
        className="up-1"
        onClick={this.handleUpOpen.bind(this)}
      />
    );

    const EmailCollapseUpDown = this.state.EmailCollapse ? (
      <div
        style={{ height: "30px", cursor: "pointer" }}
        onClick={this.HandleEmailCollapseOpen.bind(this)}
      >
        <img src={MinusImg} alt="Minus" className="minus-img" />
      </div>
    ) : (
      <div
        style={{ height: "30px", cursor: "pointer" }}
        onClick={this.HandleEmailCollapseOpen.bind(this)}
      >
        <img src={PlusImg} alt="Plush" className="plush-img" />
      </div>
    );

    const data1 = [
      {
        sku: (
          <span>
            <div className="filter-type order1checkbox">
              <div className="filter-checkbox order2checkbox">
                <input type="checkbox" id="fil-id" name="filter-type" />
                <label htmlFor="fil-id">BB221345</label>
              </div>
            </div>
          </span>
        ),

        Name: (
          <span>
            <label>
              HUSH PUPPIES{" "}
              <span style={{ display: "block" }}>
                Blue Casual Shoes For Men
              </span>
            </label>
          </span>
        ),
        Price: "4500",
        Quantity: (
          <span>
            <label>01</label>
          </span>
        ),
        Mop: <label>Cash</label>
      },
      {
        sku: (
          <span>
            <div className="filter-type order1checkbox">
              <div className="filter-checkbox order2checkbox">
                <input type="checkbox" id="fil-id1" name="filter-type" />
                <label htmlFor="fil-id1">BB221345</label>
              </div>
            </div>
          </span>
        ),
        Name: (
          <span>
            <label>
              HUSH PUPPIES
              <span style={{ display: "block" }}>
                Blue Casual Shoes For Men
              </span>
            </label>
          </span>
        ),
        Price: "4500",
        Quantity: (
          <span>
            <label>01</label>
          </span>
        ),
        Mop: <label>Cash</label>
      }
    ];

    const columns1 = [
      {
        Header: <span className="historyTable-header ">SKU</span>,
        accessor: "sku"
      },
      {
        id: "createdBy",
        Header: <span className="historyTable-header">Name</span>,
        accessor: "Name"
      },
      {
        Header: <span className="historyTable-header">Price</span>,
        accessor: "Price"
      },
      {
        Header: <span className="historyTable-header">Quantity</span>,
        accessor: "Quantity"
      },
      {
        Header: <span className="historyTable-header">MOP</span>,
        accessor: "Mop"
      }
    ];
    return (
      <Fragment>
        {this.state.loading === true ? (
          <div className="loader-icon"></div>
        ) : (
          <div>
            <div className="head-header">
              <div className="head-header-1">
                <div className="row">
                  <div className="col-12 col-xs-4 col-sm-4 col-md-3">
                    <img
                      src={HeadphoneImg}
                      alt="headphone"
                      className="headphone"
                    />
                    <label className="id-abc-1234">
                      ID - {ticketDetailsData.ticketID}
                      <span className="updated-2-d-ago">
                        {ticketDetailsData.updateDate}
                      </span>
                    </label>
                    <img
                      src={LoadingImg}
                      alt="Loading"
                      className="loading-rectangle"
                      title="Ticket Historical"
                      onClick={this.handleGetHistoricalData.bind(this)}
                    />
                  </div>

                  <div className="historical-model">
                    <Modal
                      open={open}
                      onClose={this.onCloseModal.bind(this)}
                      closeIconId="sdsg"
                      modalId="Historical-popup"
                      overlayId="logout-ovrly"
                    >
                      <label className="lblHistorical">Ticket Historical</label>
                      <img
                        src={CancelImg}
                        alt="cancelImg"
                        className="cancalImg"
                        onClick={this.onCloseModal.bind(this)}
                      />
                      {/* <HistoricalTable /> */}
                      <div className="tic-history">
                        <ReactTable
                          data={historicalDetails}
                          columns={[
                            {
                              Header: <span>Name</span>,
                              accessor: "name"
                            },
                            {
                              Header: <span>Action</span>,
                              accessor: "action"
                            },
                            {
                              Header: <span>Time & Date</span>,
                              accessor: "dateandTime"
                            }
                          ]}
                          resizable={false}
                          defaultPageSize={5}
                          showPagination={false}
                        />
                      </div>
                    </Modal>
                  </div>

                  <div className="col-12 col-xs-8 col-sm-8 col-md-9">
                    <div style={{ float: "right", marginTop: "0px" }}>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55"
                        title="Agent List"
                      />
                      <label
                        className="naman-r"
                        onClick={this.HandlelabelModalOpen.bind(this)}
                      >
                        {ticketDetailsData.username}
                      </label>
                      <img src={DownImg} alt="down" className="down-header" />
                      <button
                        type="button"
                        className="myticket-submit-solve-button"
                        onClick={this.handleUpdateTicketDetails.bind(this)}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                  <Modal
                    open={this.state.labelModal}
                    onClose={this.HandlelabelModalClose.bind(this)}
                    closeIconId="close"
                    modalId="labelmodel-popup"
                    overlayId="logout-ovrly"
                  >
                    <div className="myTicket-table remov varunoverflow cus-scroll agentlist">
                      <ReactTable
                        data={SearchAssignData}
                        columns={[
                          {
                            Header: <span>Emp Id</span>,
                            accessor: "user_ID"
                          },
                          {
                            Header: <span>Name</span>,
                            accessor: "agentName"
                          },
                          {
                            Header: <span>Designation</span>,
                            accessor: "designation"
                          }
                        ]}
                        // resizable={false}
                        minRows={1}
                        // defaultPageSize={5}
                        showPagination={false}
                      />
                      <div className="button-margin">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                        >
                          SELECT
                        </button>
                      </div>
                    </div>
                  </Modal>
                  {/* <Modal
                open={this.state.headPhoneTable}
                onClose={this.HandleHeadePhoneModalClose.bind(this)}
                closeIconId="close"
                modalId="HeadePhone-popup"
                overlayId="logout-ovrly"
              >
                <div className="store-hdrtMdal">
                  <div className="row">
                    <label
                      className="modal-lbl"
                      onClick={() => this.handleUpdateTicketStatus(103)}
                    >
                      Submit as <span className="modal-lbl-1">Solved</span>
                    </label>
                  </div>
                  <div className="row" style={{ marginTop: "8px" }}>
                    <label
                      className="modal-lbl"
                      onClick={() => this.handleUpdateTicketStatus(104)}
                    >
                      Submit as <span className="modal-lbl-2">Closed</span>
                    </label>
                  </div>
                </div>
              </Modal> */}
                </div>
              </div>
            </div>
            <div className="card-rectangle">
              <div className="rectangle-box">
                <div className="row">
                  <div className="col-md-3">
                    <div style={{ padding: "15px" }}>
                      <label className="mobile-number">Mobile Number</label>
                      <br />
                      <label className="mobile-no">
                        {ticketDetailsData.customerPhoneNumber}
                      </label>
                      <img
                        src={EyeImg}
                        alt="eye"
                        className="eyeImg1"
                        title="Customer Profile"
                        onClick={this.HandleProfileModalOpen.bind(this)}
                      />
                      <Modal
                        open={this.state.profilemodal}
                        onClose={this.HandleProfileModalClose.bind(this)}
                        modalId="profile-popup"
                        overlayId="logout-ovrly"
                      >
                        <div className="profilemodalmaindiv">
                          <div style={{ float: "right" }}>
                            <img
                              src={CrossIcon}
                              alt="cross-icon"
                              className="pro-cross-icn"
                              onClick={this.HandleProfileModalClose.bind(this)}
                            />
                          </div>
                          <div className="row profilemodalrow">
                            <div className="col-md-6">
                              <label className="profilemodal-text">Name</label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.customerName}
                              </label>
                            </div>
                            <div className="col-md-6">
                              <label className="profilemodal-text">
                                Mobile
                              </label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.customerPhoneNumber}
                              </label>
                            </div>
                          </div>
                          <div className="row profilemodalrow-1">
                            <div className="col-md-6">
                              <label className="profilemodal-text">Email</label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.customerEmailId}
                              </label>
                            </div>

                            <div className="col-md-6">
                              <label className="profilemodal-text">
                                Alternate Number
                              </label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.altNumber}
                              </label>
                            </div>
                          </div>
                          <div className="row" style={{ marginLeft: "15px" }}>
                            <div className="openticketbox profilemodalrow-1">
                              <label className="open-tickets-box-text">
                                {ticketDetailsData.openTicket}
                                <small className="open-tickets-box-textval">
                                  Open Tickets
                                </small>
                              </label>
                            </div>
                            <div className="openticketbox-2 profilemodalrow-1">
                              <label className="open-tickets-box-text">
                                {ticketDetailsData.totalticket}
                                <small className="open-tickets-box-textval">
                                  Total Tickets
                                </small>
                              </label>
                            </div>
                          </div>
                          <div className="row profilemodal-row-3">
                            <img src={CustomerIcon} alt="customer-icon" />
                            <label className="full-profile-view-text">
                              FULL PROFILE VIEW
                            </label>
                          </div>
                        </div>
                      </Modal>
                      <div
                        className=""
                        style={{ display: "inline", marginLeft: "5px" }}
                      >
                        <img
                          src={BillInvoiceImg}
                          alt="eye"
                          className="billImg"
                          title="Historical Order"
                          onClick={this.handleBillImgModalOpen.bind(this)}
                        />
                        <Modal
                          open={this.state.BillInvoiceModal}
                          onClose={this.handleBillImgModalClose.bind(this)}
                          modalId="BillInvoice-popup"
                          overlayId="logout-ovrly"
                        >
                          <div className="row">
                            <div className="col-md-5">
                              <div className="customerBill">
                                <img
                                  src={UserIcon}
                                  alt="customer-icon"
                                  className="usericon"
                                />
                                <label className="customer-text">
                                  CUSTOMER
                                </label>
                              </div>
                              <div className="row">
                                <div className="col-md-6 namepad">
                                  <label className="fullna">Full Name</label>
                                  <label className="namedi">
                                    {ticketDetailsData.customerName}
                                  </label>
                                </div>
                                <div className="col-md-6 namepad">
                                  <label className="fullna">
                                    Mobile Number
                                  </label>
                                  <label className="namedi">
                                    {ticketDetailsData.customerPhoneNumber}
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6 namepad">
                                  <label className="fullna">Email ID</label>
                                  <label className="namedi">
                                    {ticketDetailsData.customerEmailId}
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-7 xyz">
                              <img
                                src={CrossIcon}
                                alt="cross-icon"
                                className="cross"
                                onClick={this.handleBillImgModalClose.bind(
                                  this
                                )}
                              />
                              {this.state.HistOrderShow ? (
                                <div>
                                  <div className="histo">
                                    <img
                                      src={Order}
                                      alt="customer-icon"
                                      style={{ marginTop: "-10px" }}
                                    />
                                    <label className="customer-text">
                                      HISTORICAL ORDER
                                    </label>
                                  </div>

                                  <div className="tablehistrical">
                                    <ReactTable
                                      data={orderDetails}
                                      columns={[
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              Order Number
                                            </span>
                                          ),
                                          accessor: "orderNumber"
                                        },
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              Mobile Number
                                            </span>
                                          ),
                                          accessor: "mobileNumber"
                                        },
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              Amount
                                            </span>
                                          ),
                                          accessor: "itemPrice"
                                        },
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              Purchase Date
                                            </span>
                                          ),
                                          accessor: "dateFormat"
                                        }
                                      ]}
                                      // resizable={false}
                                      defaultPageSize={5}
                                      showPagination={false}
                                    />
                                  </div>

                                  {/* <div className="row skipmar">
                                <div className="col-md-5">
                                  <label className="skiptext">
                                    SKIP ATTATCHING ORDER
                                  </label>
                                </div>
                                <div className="col-md-7">
                                  <div className="calnex">
                                    <button type="button" className="calnexbtn">
                                      <label className="calnexbtn-text">
                                        Cancel
                                      </label>
                                    </button>
                                    <button
                                      type="button"
                                      className="calnexbtn1"
                                      onClick={this.toggleView}
                                    >
                                      <label className="calnexbtn1-text">
                                        Next
                                      </label>
                                    </button>
                                  </div>
                                </div>
                              </div> */}
                                </div>
                              ) : (
                                <div>
                                  <div className="row histo">
                                    <div className="col-md-7">
                                      <img
                                        src={UserIcon}
                                        alt="customer-icon"
                                        className="usericon"
                                      />
                                      <img
                                        src={Up1Img}
                                        alt="down"
                                        className="down-header"
                                      />
                                      <label className="customer-text">
                                        ORDER - BB2213451123
                                      </label>
                                    </div>
                                    <div className="col-md-5">
                                      <label className="customerOrder-text">
                                        ORDER
                                      </label>
                                      <label className="customerItem-text">
                                        ITEM
                                      </label>
                                      <div className="orderswitch">
                                        <div className="switch switch-primary d-inline">
                                          <input
                                            type="checkbox"
                                            id="editTasks-p-2"
                                          />
                                          <label
                                            htmlFor="editTasks-p-2"
                                            className="cr ord"
                                          ></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="tablehistrical tablehistricaldetail">
                                    <ReactTable
                                      data={data1}
                                      columns={columns1}
                                      // resizable={false}
                                      defaultPageSize={2}
                                      showPagination={false}
                                    />
                                  </div>
                                  <div className="row skipmar done">
                                    <div className="col-md-12">
                                      <div className="calnex">
                                        <button
                                          type="button"
                                          className="calnexbtn"
                                        >
                                          <label className="calnexbtn-text">
                                            Cancel
                                          </label>
                                        </button>
                                        <button
                                          type="button"
                                          className="calnexbtn1"
                                          onClick={this.handleBillImgModalClose.bind(
                                            this
                                          )}
                                        >
                                          <label className="calnexbtn1-text">
                                            DONE
                                          </label>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Modal>
                      </div>
                      <div className="card-space-1">
                        <label className="target-closure-date">
                          Target Closure Date &nbsp;
                        </label>
                        <label className="Date-target">
                          {ticketDetailsData.targetClouredate}
                        </label>
                      </div>
                      <div className="mobilenumber-resp">
                        <span className="line-respo"></span>
                        <label className="respo">Response</label>
                        <label className="resol">
                          <span className="line-resol"></span>
                          Resolution
                        </label>
                      </div>
                      <progress
                        className="ticket-progress"
                        style={{ width: "100%" }}
                        value="50"
                        max="100"
                      ></progress>
                      <p className="logout-label font-weight-bold prog-indi-1">
                        2 day
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mid-sec mid-secnew">
                      <div className="row mob-pad">
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                          <div className="form-group">
                            <label className="label-4">Status</label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={
                                this.state.selectetedParameters.ticketStatusID
                              }
                              onChange={this.handleDropDownChange}
                              name="ticketStatusID"
                            >
                              <option>Ticket Status</option>
                              {this.state.TicketStatusData !== null &&
                                this.state.TicketStatusData.map((item, i) => (
                                  <option key={i} value={item.ticketStatusID}>
                                    {item.ticketStatusName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group">
                            <label className="label-4">Priority</label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.selectetedParameters.priorityID}
                              onChange={this.handleDropDownChange}
                              name="priorityID"
                            >
                              <option>Priority</option>
                              {this.state.TicketPriorityData !== null &&
                                this.state.TicketPriorityData.map((item, i) => (
                                  <option key={i} value={item.priorityID}>
                                    {item.priortyName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group">
                            <label className="label-4">Brand</label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.selectetedParameters.brandID}
                              onChange={this.handleDropDownChange}
                              name="brandID"
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
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                          <div className="form-group">
                            <label className="label-4">Category</label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={this.state.selectetedParameters.categoryID}
                              onChange={this.handleDropDownChange}
                              name="categoryID"
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
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group">
                            <label className="label-4">Sub Category</label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={
                                this.state.selectetedParameters.subCategoryID
                              }
                              onChange={this.handleDropDownChange}
                              name="subCategoryID"
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
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group">
                            <label className="label-4">Issue Type</label>

                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={
                                this.state.selectetedParameters.issueTypeID
                              }
                              onChange={this.handleDropDownChange}
                              name="issueTypeID"
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
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group">
                            <label className="label-4">
                              Channel Of Purchase
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={
                                this.state.selectetedParameters
                                  .channelOfPurchaseID
                              }
                              onChange={this.handleDropDownChange}
                              name="channelOfPurchaseID"
                              // value={this.state.selectedChannelOfPurchase}
                              // onChange={this.setChannelOfPurchaseValue}
                            >
                              <option className="select-category-placeholder">
                                Select Channel Of Purchase
                              </option>
                              {this.state.ChannelOfPurchaseData !== null &&
                                this.state.ChannelOfPurchaseData.map(
                                  (item, i) => (
                                    <option
                                      key={i}
                                      value={item.channelOfPurchaseID}
                                      className="select-category-placeholder"
                                    >
                                      {item.nameOfChannel}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          <div className="form-group">
                            <label className="label-4">
                              Ticket Action Type
                            </label>
                            <select
                              className="rectangle-9 select-category-placeholder"
                              value={
                                this.state.selectetedParameters
                                  .ticketActionTypeID
                              }
                              onChange={this.handleDropDownChange}
                              name="ticketActionTypeID"
                            >
                              <option className="select-category-placeholder">
                                Select Ticket Action Type
                              </option>
                              {this.state.TicketActionTypeData !== null &&
                                this.state.TicketActionTypeData.map(
                                  (item, i) => (
                                    <option
                                      key={i}
                                      value={item.ticketActionTypeID}
                                      className="select-category-placeholder"
                                    >
                                      {item.ticketActionTypeName}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{ padding: "15px 0" }}>
                      <div className="storebox">
                        <div className="form-group">
                          <label className="label-4 storeSpacing">Store</label>
                          <label
                            className="bata-rajouri-garden"
                            onClick={this.HandleStoreModalOpen.bind(this)}
                          >
                            Bata Rajouri Garden &nbsp;
                            <img
                              src={PencilImg}
                              alt="Pencile"
                              className="pencilImg"
                              title="Attach Store"
                            />
                          </label>
                          <Modal
                            open={this.state.storemodal}
                            onClose={this.HandleStoreModalClose.bind(this)}
                            modalId="addStoreTableModal"
                            overlayId="logout-ovrly"
                          >
                            <div className="row storemainrow">
                              <div className="col-md-12">
                                <select className="systemstoredropdown1">
                                  <option>Customer Want to visit store</option>
                                  <option>
                                    Customer Already visited store
                                  </option>
                                </select>
                                <div
                                  style={{
                                    display: "flex",
                                    marginTop: "7px",
                                    float: "right"
                                  }}
                                >
                                  <label className="orderdetailpopup">
                                    Yes
                                  </label>
                                  <div className="switchmargin">
                                    <div className="switch switch-primary d-inline m-r-10">
                                      <input
                                        type="checkbox"
                                        id="editDashboard-p-12"
                                      />
                                      <label
                                        htmlFor="editDashboard-p-12"
                                        className="cr"
                                      ></label>
                                    </div>
                                  </div>
                                  <label className="orderdetailpopup">No</label>
                                  <div
                                    className="storeplusline13"
                                    onClick={this.HandleStoreModalClose.bind(
                                      this
                                    )}
                                  >
                                    <span
                                      className="plusline13"
                                      style={{ marginLeft: "10px" }}
                                    ></span>
                                    <img
                                      src={MinusImg}
                                      alt="Minus"
                                      className="minus-imgorder"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row m-0">
                              <div
                                className="col-md-6 m-b-10 m-t-10"
                                // style={{ marginLeft: "25px" }}
                              >
                                <input
                                  type="text"
                                  className="systemordersearch"
                                  placeholder="Search By Store Name, Pin Code, Store Code"
                                  value={this.state.SearchStore}
                                  name="SearchStore"
                                  onChange={this.handleNoteOnChange}
                                />
                                <img
                                  src={SearchBlackImg}
                                  alt="Search"
                                  className="systemorder-imgsearch"
                                  onClick={this.handleGetStoreDetails.bind(
                                    this
                                  )}
                                />
                              </div>
                              <div className="col-md-6 m-b-10 m-t-10 text-right">
                                <button
                                  type="button"
                                  className="myticket-submit-solve-button m-0"
                                  onClick={this.handleAttachStoreData.bind(
                                    this
                                  )}
                                >
                                  Attach Store
                                </button>
                              </div>
                            </div>
                            <span className="linestore1"></span>
                            <div className="newtabstore">
                              <div className="tab-content tabcontentstore">
                                <div className="">
                                  <ul
                                    className="nav alert-nav-tabs3 store-nav-tabs"
                                    role="tablist"
                                  >
                                    <li className="nav-item fo">
                                      <a
                                        className="nav-link active"
                                        data-toggle="tab"
                                        href="#storedetail-tab"
                                        role="tab"
                                        aria-controls="storedetail-tab"
                                        aria-selected="true"
                                      >
                                        Store Details
                                      </a>
                                    </li>
                                    <li className="nav-item fo">
                                      <a
                                        className="nav-link"
                                        data-toggle="tab"
                                        href="#selectedstore-tab"
                                        role="tab"
                                        aria-controls="selectedstore-tab"
                                        aria-selected="false"
                                      >
                                        Selected Store
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <span className="linestore2"></span>
                            <div className="tab-content p-0">
                              <div
                                className="tab-pane fade show active"
                                id="storedetail-tab"
                                role="tabpanel"
                                aria-labelledby="storedetail-tab"
                              >
                                <div className="reactstoreselect">
                                  <ReactTable
                                    data={storeDetails}
                                    columns={[
                                      {
                                        Header: <span>Purpose</span>,
                                        accessor: "invoiceNumber",
                                        Cell: row => (
                                          <div
                                            className="filter-checkbox"
                                            style={{ marginLeft: "15px" }}
                                          >
                                            <input
                                              type="checkbox"
                                              id={"i" + row.original.storeID}
                                              style={{ display: "none" }}
                                              name="ticket-store"
                                              checked={
                                                this.state.CheckStoreID[
                                                  row.original.storeID
                                                ] === true
                                              }
                                              onChange={this.handleCheckStoreID.bind(
                                                this,
                                                row.original.storeID,
                                                row.original
                                              )}
                                              defaultChecked={true}
                                            />
                                            <label
                                              htmlFor={
                                                "i" + row.original.storeID
                                              }
                                            >
                                              {row.original.storeID}
                                            </label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Store Code</span>,
                                        accessor: "storeCode"
                                      },
                                      {
                                        Header: <span>Store Name</span>,
                                        accessor: "storeName"
                                      },
                                      {
                                        Header: <span>Store Pin Code</span>,
                                        accessor: "storeCode"
                                      },
                                      {
                                        Header: <span>Store Email ID</span>,
                                        accessor: "storeEmailID"
                                      },
                                      {
                                        Header: <span>Store Addres</span>,
                                        accessor: "address"
                                      },
                                      {
                                        Header: <span>Visit Date</span>,
                                        accessor: "visitDate",
                                        Cell: row => <label>23,Aug 2019</label>
                                      }
                                    ]}
                                    // resizable={false}
                                    defaultPageSize={5}
                                    showPagination={false}
                                  />
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="selectedstore-tab"
                                role="tabpanel"
                                aria-labelledby="selectedstore-tab"
                              >
                                <div className="reactstoreselect">
                                  {/* {this.state.loading === true ? (
                                    <div className="loader-icon"></div>
                                  ) : ( */}
                                  <ReactTable
                                    data={selectedStore}
                                    columns={[
                                      {
                                        Header: <span>Purpose</span>,
                                        accessor: "invoiceNumber",
                                        Cell: row => (
                                          <div
                                            className="filter-checkbox"
                                            style={{ marginLeft: "15px" }}
                                          >
                                            <input
                                              type="checkbox"
                                              id={"i" + row.original.storeID}
                                              style={{ display: "none" }}
                                              name="ticket-store"
                                              checked={
                                                this.state.CheckStoreID[
                                                  row.original.storeID
                                                ] === true
                                              }
                                              onChange={this.handleCheckStoreID.bind(
                                                this,
                                                row.original.storeID,
                                                row.original
                                              )}
                                              defaultChecked={true}
                                            />
                                            <label
                                              htmlFor={
                                                "i" + row.original.storeID
                                              }
                                            >
                                              {row.original.storeID}
                                            </label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Store Code</span>,
                                        accessor: "storeCode"
                                      },
                                      {
                                        Header: <span>Store Name</span>,
                                        accessor: "storeName"
                                      },
                                      {
                                        Header: <span>Store Pin Code</span>,
                                        accessor: "pincode"
                                      },
                                      {
                                        Header: <span>Store Email ID</span>,
                                        accessor: "storeEmailID"
                                      },
                                      {
                                        Header: <span>Store Addres</span>,
                                        accessor: "address"
                                      },
                                      {
                                        Header: <span>Visit Date</span>,
                                        accessor: "visitDate",
                                        Cell: row => <label>23,Aug 2019</label>
                                      }
                                    ]}
                                    // resizable={false}
                                    defaultPageSize={5}
                                    showPagination={false}
                                  />
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </div>
                        <div className="">
                          <label className="label-4">Product</label>
                          <label
                            className="bata-rajouri-garden"
                            onClick={this.handleOrderTableOpen.bind(this)}
                          >
                            Red Tennis Coca Cola White Monogr...&nbsp;
                            <img
                              src={PencilImg}
                              alt="Pencile"
                              className="pencilImg"
                              title="Attach Product"
                            />
                          </label>
                          <Modal
                            onClose={this.handleOrderTableClose.bind(this)}
                            open={this.state.OrderTable}
                            modalId="addOrderTableModal"
                            overlayId="logout-ovrly"
                          >
                            <div
                              className="row"
                              style={{ marginLeft: "0px", marginRight: "0px" }}
                            >
                              <div
                                className="col-md-12 claim-status-card"
                                style={{ height: "54px" }}
                              >
                                <label style={{ marginTop: "7px" }}>
                                  <b>Customer Want to attach order</b>
                                </label>
                                <div
                                  className="claimplus"
                                  onClick={this.handleOrderTableClose.bind(
                                    this
                                  )}
                                >
                                  <span className="plusline12"></span>
                                  <span>
                                    <img
                                      src={MinusImg}
                                      alt="Minus"
                                      className="minus-imgorder"
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="row m-t-10 m-b-10"
                              style={{ marginLeft: "0", marginRight: "0" }}
                            >
                              <div className="col-md-6">
                                <label className="orderdetailpopup">
                                  Order Details
                                </label>
                              </div>
                              <div className="col-md-3">
                                <div
                                  style={{ float: "right", display: "flex" }}
                                >
                                  <label className="orderdetailpopup">
                                    Order
                                  </label>
                                  <div className="orderswitch orderswitchitem">
                                    <div className="switch switch-primary d-inline">
                                      <input
                                        type="checkbox"
                                        id="editTasks-p-2"
                                      />
                                      <label
                                        htmlFor="editTasks-p-2"
                                        className="cr ord"
                                      ></label>
                                    </div>
                                  </div>
                                  <label className="orderdetailpopup">
                                    Item
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <input
                                  type="text"
                                  className="searchtextpopup"
                                  placeholder="Search Order"
                                />
                                <img
                                  src={SearchBlackImg}
                                  alt="Search"
                                  className="searchtextimgpopup"
                                />
                              </div>
                            </div>

                            <span className="linestore1"></span>
                            <div className="newtabstore">
                              <div className="tab-content tabcontentstore">
                                <div className="">
                                  <ul
                                    className="nav alert-nav-tabs3 store-nav-tabs"
                                    role="tablist"
                                  >
                                    <li className="nav-item fo">
                                      <a
                                        className="nav-link active"
                                        data-toggle="tab"
                                        href="#productdetail-tab"
                                        role="tab"
                                        aria-controls="productdetail-tab"
                                        aria-selected="true"
                                      >
                                        Product Details
                                      </a>
                                    </li>
                                    <li className="nav-item fo">
                                      <a
                                        className="nav-link"
                                        data-toggle="tab"
                                        href="#selectedproduct-tab"
                                        role="tab"
                                        aria-controls="selectedproduct-tab"
                                        aria-selected="false"
                                      >
                                        Selected Product
                                      </a>
                                    </li>
                                    <div className="col-md-6 m-b-10 m-t-10 text-right">
                                      <button
                                        type="button"
                                        className="myticket-submit-solve-button m-0"
                                        onClick={this.handleAttachProductData.bind(
                                          this
                                        )}
                                      >
                                        Attach Product
                                      </button>
                                    </div>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <span className="linestore2"></span>
                            <div className="tab-content p-0">
                              <div
                                className="tab-pane fade show active"
                                id="productdetail-tab"
                                role="tabpanel"
                                aria-labelledby="productdetail-tab"
                              >
                                <div className="reactstoreselect">
                                  <ReactTable
                                    data={selectedProduct}
                                    columns={[
                                      {
                                        Header: <span>Invoice Number</span>,
                                        accessor: "invoiceNumber",
                                        Cell: row => (
                                          <div
                                            className="filter-checkbox"
                                            style={{ marginLeft: "15px" }}
                                          >
                                            <input
                                              type="checkbox"
                                              id={
                                                "i" + row.original.orderMasterID
                                              }
                                              style={{ display: "none" }}
                                              name="ticket-order"
                                              checked={
                                                this.state.CheckOrderID[
                                                  row.original.orderMasterID
                                                ] === true
                                              }
                                              onChange={this.handleCheckOrderID.bind(
                                                this,
                                                row.original.orderMasterID,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "i" + row.original.orderMasterID
                                              }
                                            >
                                              {row.original.invoiceNumber}
                                            </label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Invoice Date</span>,
                                        accessor: "dateFormat"
                                      },
                                      {
                                        Header: <span>Item Count</span>,
                                        accessor: "itemCount"
                                      },
                                      {
                                        Header: <span>Item Price</span>,
                                        accessor: "ordeItemPrice"
                                      },
                                      {
                                        Header: <span>Price Paid</span>,
                                        accessor: "orderPricePaid"
                                      },
                                      {
                                        Header: <span>Store Code</span>,
                                        accessor: "storeCode"
                                      },
                                      {
                                        Header: <span>Store Addres</span>,
                                        accessor: "storeAddress"
                                      },
                                      {
                                        Header: <span>Discount</span>,
                                        accessor: "discount"
                                      }
                                    ]}
                                    //resizable={false}
                                    minRows={1}
                                    defaultPageSize={5}
                                    showPagination={false}
                                    // SubComponent={row => {
                                    //   return (
                                    //     <div style={{ padding: "20px" }}>
                                    //       <ReactTable
                                    //         data={row.original.orderItems}
                                    //         columns={[
                                    //           {
                                    //             Header: <span>Article Number</span>,
                                    //             accessor: "invoiceNo",
                                    //             Cell: row => {
                                    //               return (
                                    //                 <div
                                    //                   className="filter-checkbox"
                                    //                   style={{ marginLeft: "15px" }}
                                    //                 >
                                    //                   <input
                                    //                     type="checkbox"
                                    //                     style={{ display: "none" }}
                                    //                     id={
                                    //                       row.original.orderItemID
                                    //                     }
                                    //                     // name="dashboardcheckbox[]"
                                    //                   />
                                    //                   <label
                                    //                     htmlFor={
                                    //                       row.original.orderItemID
                                    //                     }
                                    //                   >
                                    //                     {row.original.invoiceNo}
                                    //                   </label>
                                    //                 </div>
                                    //               );
                                    //             }
                                    //           },
                                    //           {
                                    //             Header: <span>Article Size</span>,
                                    //             accessor: "size"
                                    //           },
                                    //           {
                                    //             Header: <span>Article MRP</span>,
                                    //             accessor: "itemPrice"
                                    //           },
                                    //           {
                                    //             Header: <span>Price Paid</span>,
                                    //             accessor: "pricePaid"
                                    //           },
                                    //           {
                                    //             Header: <span>Discount</span>,
                                    //             accessor: "discount"
                                    //           },
                                    //           {
                                    //             Header: <span>Required Size</span>,
                                    //             accessor: "requireSize"
                                    //           }
                                    //         ]}
                                    //         defaultPageSize={2}
                                    //         minRows={1}
                                    //         showPagination={false}
                                    //       />
                                    //     </div>
                                    //   );
                                    // }}
                                  />
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="selectedproduct-tab"
                                role="tabpanel"
                                aria-labelledby="selectedproduct-tab"
                              >
                                <div className="reactstoreselect">
                                  <ReactTable
                                    data={selectedProduct}
                                    columns={[
                                      {
                                        Header: <span>Invoice Number</span>,
                                        accessor: "invoiceNumber",
                                        Cell: row => (
                                          <div
                                            className="filter-checkbox"
                                            style={{ marginLeft: "15px" }}
                                          >
                                            <input
                                              type="checkbox"
                                              id={
                                                "i" + row.original.orderMasterID
                                              }
                                              style={{ display: "none" }}
                                              name="ticket-order"
                                              checked={
                                                this.state.CheckOrderID[
                                                  row.original.orderMasterID
                                                ] === true
                                              }
                                              onChange={this.handleCheckOrderID.bind(
                                                this,
                                                row.original.orderMasterID,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "i" + row.original.orderMasterID
                                              }
                                            >
                                              {row.original.invoiceNumber}
                                            </label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Invoice Date</span>,
                                        accessor: "dateFormat"
                                      },
                                      {
                                        Header: <span>Item Count</span>,
                                        accessor: "itemCount"
                                      },
                                      {
                                        Header: <span>Item Price</span>,
                                        accessor: "ordeItemPrice"
                                      },
                                      {
                                        Header: <span>Price Paid</span>,
                                        accessor: "orderPricePaid"
                                      },
                                      {
                                        Header: <span>Store Code</span>,
                                        accessor: "storeCode"
                                      },
                                      {
                                        Header: <span>Store Addres</span>,
                                        accessor: "storeAddress"
                                      },
                                      {
                                        Header: <span>Discount</span>,
                                        accessor: "discount"
                                      }
                                    ]}
                                    //resizable={false}
                                    minRows={1}
                                    defaultPageSize={5}
                                    showPagination={false}
                                  />
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "15px", background: "#fff" }}>
              <div className="rectangle-3 text-editor">
                <div className="row mt-2">
                  <label className="ticket-title-where mb-0">
                    Ticket Title:
                  </label>
                </div>
                <div className="row" style={{ marginTop: "0" }}>
                  <label className="label-2 mb-0">
                    {ticketDetailsData.ticketTitle}
                  </label>
                </div>
                <div className="row mt-3">
                  <label className="ticket-title-where mb-0">
                    Ticket Details:
                  </label>
                </div>
                <div className="row" style={{ marginTop: "0" }}>
                  <label className="label-3 pb-0">
                    {ticketDetailsData.ticketdescription}
                  </label>
                </div>
                <div className="row my-2 mx-1">
                  {this.state.file.map((item, i) =>
                    i < 5 ? (
                      <div style={{ position: "relative" }} key={i}>
                        <div>
                          <img
                            src={CircleCancel}
                            alt="thumb"
                            className="circleCancle"
                            onClick={() => {
                              this.handleRemoveImage(i);
                            }}
                          />
                        </div>

                        <div>
                          <img
                            src={
                              item.Type === "docx"
                                ? require("./../assets/Images/word.png")
                                : item.Type === "xlsx"
                                ? require("./../assets/Images/excel.png")
                                : item.Type === "pdf"
                                ? require("./../assets/Images/pdf.png")
                                : item.Type === "txt"
                                ? require("./../assets/Images/TxtIcon.png")
                                : require("./../assets/Images/thumbticket.png")
                            }
                            title={item.name}
                            alt="thumb"
                            className="thumbtick"
                          />
                        </div>
                      </div>
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
                        src={CrossIcon}
                        alt="cross-icon"
                        onClick={this.handleThumbModalClose.bind(this)}
                      />
                    </div>
                    <div className="row my-3 mx-1">
                      {this.state.file.map((item, i) => (
                        <div style={{ position: "relative" }} key={i}>
                          <div>
                            <img
                              src={CircleCancel}
                              alt="thumb"
                              className="circleCancle"
                              onClick={() => {
                                this.handleRemoveImage(i);
                              }}
                            />
                          </div>

                          <div>
                            <img
                              src={
                                item.Type === "docx"
                                  ? require("./../assets/Images/word.png")
                                  : item.Type === "xlsx"
                                  ? require("./../assets/Images/excel.png")
                                  : item.Type === "pdf"
                                  ? require("./../assets/Images/pdf.png")
                                  : item.Type === "txt"
                                  ? require("./../assets/Images/TxtIcon.png")
                                  : require("./../assets/Images/thumbticket.png")
                              }
                              title={item.name}
                              alt="thumb"
                              className="thumbtick"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Modal>
                <div className="row">
                  <div className="mask1">
                    <div className="mail-mask">
                      <div className="dropdown" style={{ display: "inherit" }}>
                        <button
                          className="dropdown-toggle my-tic-email"
                          type="button"
                          data-toggle="dropdown"
                        >
                          <img src={Email1} alt="email" className="EMFCImg" />
                          <span className="EMFCText">Email</span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a href="#!">
                              <img
                                src={Email1}
                                alt="email"
                                className="EMFCImg"
                              />
                              <span className="EMFCText">Email</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <img src={Sms1} alt="sma" className="EMFCImg" />
                              <span className="EMFCText">SMS</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <img
                                src={Facebook1}
                                alt="facebook"
                                className="EMFCImg"
                              />
                              <span className="EMFCText">Facebook</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <img src={Call1} alt="call" className="EMFCImg" />
                              <span className="EMFCText">Call</span>
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div
                        className="mob-float"
                        style={{ display: "flex", float: "right" }}
                      >
                        <div className="line-1"></div>
                        {EmailCollapseUpDown}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="myTicketEmail">
                  <Collapse isOpen={this.state.EmailCollapse}>
                    <a
                      href="#!"
                      className="kblink"
                      style={{ top: "5px" }}
                      onClick={this.HandleKbLinkModalOpen.bind(this)}
                    >
                      <img
                        src={KnowledgeLogo}
                        alt="KnowledgeLogo"
                        className="knoim"
                      />
                      Kb Link
                    </a>
                    <div
                      className="dropdown collapbtn"
                      style={{ display: "inherit", top: "5px" }}
                    >
                      <button
                        className="dropdown-toggle my-tic-email"
                        type="button"
                        data-toggle="dropdown"
                        onClick={this.handleTemplateBindByIssueType.bind(this)}
                      >
                        <FontAwesomeIcon icon={faCalculator} /> Template
                      </button>
                      <ul className="dropdown-menu">
                        {this.state.CkEditorTemplateData !== null &&
                          this.state.CkEditorTemplateData.map((item, i) => (
                            <li key={i} value={item.templateID}>
                              <span
                                onClick={this.handleCkEditorTemplateData.bind(
                                  this,
                                  item.templateID,
                                  item.templateName
                                )}
                              >
                                {item.templateName}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <Card>
                      <CardBody>
                        <div className="">
                          <CKEditor
                            data={
                              this.state.CkEditorTemplateDetails.templateBody
                            }
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
                          />
                        </div>
                      </CardBody>
                      <div className="row colladrowa">
                        <div className="col-md-12 colladrow">
                          <ul>
                            <li>
                              <label>
                                To: &nbsp;{ticketDetailsData.customerEmailId}
                              </label>
                            </li>
                            <li>
                              <label className="">
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
                                    {this.state.userCcCount < 1
                                      ? "+" + this.state.userCcCount
                                      : "+" + this.state.userCcCount}
                                  </span>
                                </div>
                              </label>
                            </li>
                            <li>
                              <label className="">
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
                                    {this.state.userBccCount < 1
                                      ? "+" + this.state.userBccCount
                                      : "+" + this.state.userBccCount}
                                  </span>
                                </div>
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

                                  // disabled={this.state.selectedStoreIDs.length === 0}
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
                            <li style={{ float: "right" }}>
                              <button
                                className="send1"
                                type="button"
                                onClick={this.handleSendMailData.bind(this)}
                              >
                                Send
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </Collapse>
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
                </div>
                <div className="edit-storeTask-header newtab">
                  <div className="tab-content">
                    <div className="store-header-task">
                      <ul className="nav alert-nav-tabs3" role="tablist">
                        <li className="nav-item fo">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#Message-tab"
                            role="tab"
                            aria-controls="Message-tab"
                            aria-selected="true"
                          >
                            Message: 04
                          </a>
                        </li>
                        <li className="nav-item fo">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#Notes-tab"
                            role="tab"
                            aria-controls="Notes-tab"
                            aria-selected="false"
                            name="Notes"
                            onClick={this.handleGetTabsName}
                          >
                            Notes:{" "}
                            {this.state.Notesdetails.length < 9
                              ? "0" + this.state.Notesdetails.length
                              : this.state.Notesdetails.length}
                          </a>
                        </li>
                        <li className="nav-item fo">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#Task-tab"
                            role="tab"
                            aria-controls="Task-tab"
                            aria-selected="false"
                            name="Task"
                            onClick={this.handleGetTabsName}
                          >
                            Task:{" "}
                            {this.state.tabCounts.task < 9
                              ? "0" + this.state.tabCounts.task
                              : this.state.tabCounts.task}
                          </a>
                        </li>
                        <li className="nav-item fo" style={{ display: "none" }}>
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#Claim-tab"
                            role="tab"
                            aria-controls="Claim-tab"
                            aria-selected="false"
                            name="Claim"
                            onClick={this.handleGetTabsName}
                          >
                            Claim:{" "}
                            {this.state.tabCounts.claim < 9
                              ? "0" + this.state.tabCounts.claim
                              : this.state.tabCounts.claim}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-content p-0 tabpadtick">
                  <div
                    className="tab-pane fade"
                    id="Claim-tab"
                    role="tabpanel"
                    aria-labelledby="Claim-tab"
                  >
                    {this.state.ticket_Id > 0 ? (
                      <MyTicketClaim
                        claimData={{
                          claimDeatils: {
                            ticketId: this.state.ticket_Id,
                            claimTabId: this.state.ClaimTab
                          }
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="tab-pane fade show active"
                    id="Message-tab"
                    role="tabpanel"
                    aria-labelledby="Message-tab"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="row message-header">
                      <div className="col-12 col-xs-12 col-sm-3">
                        <label className="user-label">User</label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-7">
                        <label className="message-label">Message</label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2">
                        <label className="action-label">Action</label>
                      </div>
                    </div>
                    <div className="row top-margin">
                      <div className="col-md-5">
                        <div className="v3"></div>
                      </div>
                      <div className="col-md-2">
                        <label className="today-02">TODAY 02</label>
                      </div>
                      <div className="col-md-5">
                        <div className="v4"></div>
                      </div>
                    </div>
                    <div className="row top-margin">
                      <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                        <div className="row" style={{ marginTop: "0" }}>
                          <div className="oval-5-1">
                            <img
                              src={RightImg}
                              alt="right"
                              className="right-icon"
                            />
                          </div>
                          <label
                            className="solved-by-naman-r"
                            style={{ marginLeft: "7px" }}
                          >
                            Solved by NamanR
                          </label>
                          <img src={MsgImg} alt="right" className="smg-Img1" />
                        </div>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                        <label className="i-have-solved-this-i">
                          I Have solved this issue
                        </label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2 col-md-2 mob-flex">
                        {HidecollapsUp}
                        <label
                          className="comment"
                          onClick={this.handleCommentsDrawerOpen.bind(this)}
                        >
                          Comment
                        </label>
                      </div>
                      <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.handleCommentsDrawerClose.bind(this)}
                        visible={this.state.CommentsDrawer}
                        className="commentsDwarer"
                      >
                        <div className="drawer-header-1">
                          <label className="lblHeader-drawer">Task</label>
                          <button
                            type="button"
                            className="btn-addMoreTask"
                            onClick={this.handleAddNewForm.bind(this)}
                          >
                            ADD MORE TASK
                          </button>
                        </div>
                        <form onSubmit={this.handleSubmitForm.bind(this)}>
                          {this.CreateUIForm()}
                        </form>
                      </Drawer>
                    </div>
                    <div className="row card-op-out">
                      <div className="col-12 col-xs-12 col-sm-4 col-md-3"></div>
                      <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                        <Collapse isOpen={this.state.collapseUp}>
                          <Card>
                            <CardBody>
                              <div className="card-details">
                                <div className="card-details-1">
                                  <label className="label-5">
                                    Dear Matthew,
                                  </label>
                                  <label className="label-5">
                                    We're always working to make Shopify exactly
                                    what you need for your retails business.
                                    Your feedback helps us decide which features
                                    to build, and what improvements should be
                                    made to our platform.
                                    <br />
                                    <br />
                                    To help us make Shopify the best it can be,
                                    we want your feedback today, take a few
                                    minutes to fill out survays before
                                    Tuesday,July 7th.
                                  </label>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2"></div>
                    </div>

                    <div className="row">
                      <div className="col-md-5">
                        <div className="v3"></div>
                      </div>
                      <div className="col-md-2">
                        <label className="yesterday-02">YESTERDAY 02</label>
                      </div>
                      <div className="col-md-5">
                        <div className="v6"></div>
                      </div>
                    </div>

                    <div className="row new-top-bottom-margin">
                      <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                        <img
                          src={Loading1Img}
                          alt="right"
                          className="oval-loading"
                        />
                        <label className="rashmi-c">
                          Rashmi.C
                          <span>
                            <label className="updated-2-d-ago">
                              Reassign to
                              <label className="lable-name">Naman.R</label>
                            </label>
                          </span>
                        </label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                        <label className="hi-naman-please-hel">
                          Hi @Naman Please help customer with voucher Issue
                        </label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2 mob-flex">
                        <label
                          className="comment-text"
                          onClick={this.handleCommentCollapseOpen.bind(this)}
                        >
                          Comment
                        </label>
                      </div>
                      <div className="row" style={{ width: "100%" }}>
                        <div className="col-12 col-xs-12 col-sm-4 col-md-3"></div>
                        <div className="col-12 col-xs-12 col-sm-8 col-md-9">
                          <div className="commentcollapseTicket">
                            <Collapse isOpen={this.state.CommentCollapse}>
                              <Card>
                                <CardBody>
                                  <div className="commenttextborder">
                                    <div className="Commentlabel">
                                      <label className="Commentlabel1">
                                        Comment
                                      </label>
                                    </div>
                                    <div>
                                      <span className="comment-line"></span>
                                      <div
                                        style={{
                                          float: "right",
                                          cursor: "pointer",
                                          height: "30px",
                                          marginTop: "-33px"
                                        }}
                                      >
                                        <img
                                          src={MinusImg}
                                          alt="Minus"
                                          className="CommentMinus-img"
                                        />
                                      </div>
                                    </div>
                                    <div className="commenttextmessage">
                                      <label style={{ marginBottom: "10px" }}>
                                        Hello,
                                      </label>
                                      <label>
                                        I saw a vintage table lamp on your site
                                        last month and I'd bookmarked it to buy
                                        it later for a friend. I can't seem to
                                        find it anymore through.
                                        <br></br>Is it out of stock or do you
                                        not sell those anymore ?
                                      </label>
                                      <label
                                        style={{
                                          marginTop: "10px",
                                          display: "block"
                                        }}
                                      >
                                        Thanks
                                      </label>
                                      <label>Naman Rampal.</label>
                                    </div>
                                    <div className="SendCommentBtn">
                                      <button
                                        className="SendCommentBtn1"
                                        onClick={this.handleCommentCollapseOpen2.bind(
                                          this
                                        )}
                                      >
                                        SEND
                                      </button>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="myTicketCommentCollapse myTicketEmail">
                      <Collapse isOpen={this.state.CommentCollapse2}>
                        <div className="col-12" style={{ marginTop: "5px" }}>
                          <div className="mask1">
                            <div className="mail-mask">
                              <div
                                className="dropdown"
                                style={{ display: "inherit" }}
                              >
                                <button
                                  className="dropdown-toggle my-tic-email"
                                  type="button"
                                  data-toggle="dropdown"
                                >
                                  <img
                                    src={Email1}
                                    alt="email"
                                    className="EMFCImg"
                                  />
                                  <span className="EMFCText">Email</span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a href="#!">
                                      <img
                                        src={Email1}
                                        alt="email"
                                        className="EMFCImg"
                                      />
                                      <span className="EMFCText">Email</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#!">
                                      <img
                                        src={Sms1}
                                        alt="sms"
                                        className="EMFCImg"
                                      />
                                      <span className="EMFCText">SMS</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#!">
                                      <img
                                        src={Facebook1}
                                        alt="facebook"
                                        className="EMFCImg"
                                      />
                                      <span className="EMFCText">Facebook</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#!">
                                      <img
                                        src={Call1}
                                        alt="call"
                                        className="EMFCImg"
                                      />
                                      <span className="EMFCText">Call</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>

                              <a
                                href="#!"
                                className="kblink"
                                onClick={this.HandleKbLinkModalOpen.bind(this)}
                              >
                                <img
                                  src={KnowledgeLogo}
                                  alt="KnowledgeLogo"
                                  className="knoim"
                                />
                                Kb Link
                              </a>

                              <div
                                className="dropdown collapbtn"
                                style={{ display: "inherit" }}
                              >
                                <button
                                  className="dropdown-toggle my-tic-email"
                                  type="button"
                                  data-toggle="dropdown"
                                >
                                  <FontAwesomeIcon icon={faCalculator} />{" "}
                                  Template
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
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
                                  </li>
                                </ul>
                              </div>

                              <h3 className="textbhead">
                                Subject: &nbsp;
                                <span>
                                  {/* {messageDetails.length > 0 ? (
                                    <>{messageDetails[0].ticketMailSubject}</>
                                  ) : null} */}
                                  {this.state.messageDetails.ticketMailSubject}
                                </span>
                              </h3>
                              <div
                                className="mob-float"
                                style={{ display: "flex", float: "right" }}
                              >
                                <div className="line-1"></div>
                                <div
                                  style={{ height: "31", cursor: "pointer" }}
                                  onClick={this.hanldeCommentClose2.bind(this)}
                                >
                                  <img
                                    src={MinusImg}
                                    alt="Minus"
                                    className="minus-img"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Card>
                          <CardBody>
                            <div className="col-md-12">
                              <CKEditor
                                data={this.state.messageDetails.ticketMailBody}
                                // data={
                                //   this.state.messageDetails.length > 0 ? (
                                //     <div>
                                //                                             
                                //       {
                                //         this.state.messageDetails[0]
                                //           .ticketMailBody
                                //       }
                                //                                           
                                //     </div>
                                //   ) : null
                                // }
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
                              />
                            </div>
                          </CardBody>
                          <div className="row colladrowa">
                            <div className="col-md-12 colladrow">
                              <ul style={{ padding: "0 15px" }}>
                                <li>
                                  <label>
                                    To: &nbsp;
                                    {ticketDetailsData.customerEmailId}
                                  </label>
                                </li>
                                <li>
                                  <label className="">
                                    <div className="input-group">
                                      <span className="input-group-addon inputcc">
                                        CC:
                                      </span>
                                      <input type="text" className="CCdi" />
                                      <span className="input-group-addon inputcc-one">
                                        +1
                                      </span>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <label className="">
                                    <div
                                      className="input-group"
                                      // style={{ display: "block" }}
                                    >
                                      <span className="input-group-addon inputcc">
                                        BCC:
                                      </span>
                                      <input type="text" className="CCdi" />
                                      <span className="input-group-addon inputcc-one">
                                        +1
                                      </span>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <div className="filter-checkbox">
                                    <input
                                      type="checkbox"
                                      id="fil-open1"
                                      name="filter-type"
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor="fil-open1"
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
                                  <label style={{ color: "#2561a8" }}>
                                    3 files
                                  </label>
                                </li>
                                <li style={{ float: "right" }}>
                                  <button className="send">Send</button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </Collapse>
                    </div>
                    <div className="row row-spacing new-top-bottom-margin">
                      <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                        <img
                          src={Headphone2Img}
                          alt="headphone"
                          className="oval-56"
                        />
                        <label className="rashmi-c">Rashmi.C</label>
                        <img
                          src={FacebookImg}
                          alt="facebook"
                          className="facebook"
                        />
                      </div>
                      <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                        <img src={ClipImg} alt="clip" className="clip" />
                        <label className="hi-diwakar-i-really2">
                          &nbsp; Hi Diwakar, I really appreciate you joining us
                          at Voucherify! My top priority is that you have a
                          great experience.
                        </label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2">
                        <label
                          className="comment-text1"
                          onClick={this.hanldeCommentOpen2.bind(this)}
                        >
                          Comment
                        </label>
                      </div>
                    </div>
                    <div className="row row-spacing new-top-bottom-margin">
                      <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                        <img
                          src={BlackUserIcon}
                          alt="Avatar"
                          className="oval-6"
                        />
                        <label className="rashmi-c">
                          {this.state.messageDetails.commentBy}
                          {/* {this.state.messageDetails.length > 0 ? (
                            <>
                                                                    
                              {this.state.messageDetails[0].commentBy}
                                                                  
                            </>
                          ) : null} */}
                        </label>
                        <img
                          src={Headphone2Img}
                          alt="headphone"
                          className="headphone1"
                        />
                      </div>
                      <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                        <label className="need-to-change-my-sh">
                          Need to change my shipping address
                        </label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2">
                        {/* {this.state.messageDetails.length > 0 ? (
                          <>
                                                                  
                            {this.state.messageDetails.isCustomerComment ===
                            1 ? (
                              <label
                                className="reply-comment"
                                onClick={this.hanldeCommentOpen2.bind(this)}
                              >
                                Reply
                              </label>
                            ) : null}
                                                                
                          </>
                        ) : null} */}
                        {this.state.messageDetails.isCustomerComment === 1 ? (
                          <label
                            className="reply-comment"
                            onClick={this.hanldeCommentOpen2.bind(this)}
                          >
                            Reply
                          </label>
                        ) : null}

                        <br />
                        <label className="reply-comment">Comment</label>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="Task-tab"
                    role="tabpanel"
                    aria-labelledby="Task-tab"
                  >
                    {this.state.ticket_Id > 0 ? (
                      <MyTicketTask
                        taskData={{
                          TicketData: {
                            TicketId: this.state.ticket_Id,
                            // GridData: this.state.taskTableGrid,
                            TabActiveId: this.state.TaskTab
                          }
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Notes-tab"
                    role="tabpanel"
                    aria-labelledby="Notes-tab"
                  >
                    <div
                      className="row removemarg"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="col-12 col-xs-12 col-sm-5">
                        <textarea
                          className="Add-Notes-textarea"
                          placeholder="Add Notes"
                          name="NoteAddComment"
                          value={this.state.NoteAddComment}
                          onChange={this.handleNoteOnChange}
                        ></textarea>
                        {this.state.NoteAddComment.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.notesCommentCompulsion}
                          </p>
                        )}
                        <button
                          type="button"
                          className="notesbtn notesbtn-text"
                          onClick={this.handleNoteAddComments.bind(this)}
                          style={{ marginTop: "5px" }}
                        >
                          ADD COMMENT
                        </button>
                      </div>

                      <div className="col-12 col-xs-12 col-sm-7 my-ticket-notes">
                        {this.state.loading === true ? (
                          <div className="loader-icon"></div>
                        ) : (
                          <>
                            {this.state.Notesdetails !== null &&
                              this.state.Notesdetails.map((item, i) => (
                                <div
                                  className="row my-ticket-notes-row"
                                  key={i}
                                >
                                  <div className="col-md-1">
                                    <div className="oval-5-1-new">
                                      <img
                                        src={StoreIcon}
                                        style={{ padding: "5px" }}
                                        alt="store-icon"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-11">
                                    <div className="row my-ticket-notes-created">
                                      <label className="varun-nagpal">
                                        {item.createdByName}
                                      </label>
                                    </div>
                                    <div className="row my-ticket-notes-created">
                                      <label className="hi-diwakar-i-really tab">
                                        {item.note}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              open={this.state.profilemodal}
              onClose={this.HandleProfileModalClose.bind(this)}
              modalId="profile-popup"
              overlayId="logout-ovrly"
            >
              <div className="profilemodalmaindiv">
                <div style={{ float: "right" }}>
                  <img
                    src={CrossIcon}
                    alt="cross-icon"
                    className="pro-cross-icn"
                    onClick={this.HandleProfileModalClose.bind(this)}
                  />
                </div>
                <div className="row profilemodalrow">
                  <div className="col-md-6">
                    <label className="profilemodal-text">Name</label>
                    <label className="profilemodal-textval">
                      {ticketDetailsData.customerName}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <label className="profilemodal-text">Mobile</label>
                    <label className="profilemodal-textval">
                      {" "}
                      {ticketDetailsData.customerPhoneNumber}
                    </label>
                  </div>
                </div>
                <div className="row profilemodalrow-1">
                  <div className="col-md-6">
                    <label className="profilemodal-text">Email</label>
                    <label className="profilemodal-textval">
                      {ticketDetailsData.customerEmailId}
                    </label>
                  </div>

                  <div className="col-md-6">
                    <label className="profilemodal-text">
                      Alternate Number
                    </label>
                    <label className="profilemodal-textval">
                      {ticketDetailsData.altNumber}
                    </label>
                  </div>
                </div>
                <div className="row" style={{ marginLeft: "15px" }}>
                  <div className="openticketbox profilemodalrow-1">
                    <label className="open-tickets-box-text">
                      {ticketDetailsData.openTicket}
                      <small className="open-tickets-box-textval">
                        Open Tickets
                      </small>
                    </label>
                  </div>
                  <div className="openticketbox-2 profilemodalrow-1">
                    <label className="open-tickets-box-text">
                      {ticketDetailsData.totalticket}
                      <small className="open-tickets-box-textval">
                        Total Tickets
                      </small>
                    </label>
                  </div>
                </div>
                <div className="row profilemodal-row-3">
                  <img src={CustomerIcon} alt="customer-icon" />
                  <label className="full-profile-view-text">
                    FULL PROFILE VIEW
                  </label>
                </div>
              </div>
            </Modal>

            <div className="row" style={{ margin: "0" }}>
              <div className="TicketTabs">
                <ul className="mb-0">
                  <li className="SubR">
                    <img src={PlusImg} alt="Plus" className="Ticket" />
                  </li>
                  <li className="Sub">
                    <span>
                      <img src={Ticket} alt="Ticket" className="Ticket" />
                    </span>
                    <label className="Subject">
                      Subject: Need to change m...
                    </label>
                    <span>
                      <img
                        src={CancelImgGrey}
                        alt="Cancel"
                        className="cancel"
                      />
                    </span>
                  </li>
                  <li className="Sub active">
                    <span>
                      <img src={Ticket} alt="Ticket" className="Ticket" />
                    </span>
                    <label className="Subject">
                      Subject: Need to change m...
                    </label>
                    <span>
                      <img
                        src={CancelImgGrey}
                        alt="Cancel"
                        className="cancel"
                      />
                    </span>
                  </li>
                  <li className="Sub">
                    <span>
                      <img src={Ticket} alt="Ticket" className="Ticket" />
                    </span>
                    <label className="Subject">
                      Subject: Need to change m...
                    </label>
                    <span>
                      <img
                        src={CancelImgGrey}
                        alt="Cancel"
                        className="cancel"
                      />
                    </span>
                  </li>
                  <li className="Sub">
                    <span>
                      <img src={Ticket} alt="Ticket" className="Ticket" />
                    </span>
                    <label className="Subject">
                      Subject: Need to change m...
                    </label>
                    <span>
                      <img
                        src={CancelImgGrey}
                        alt="Cancel"
                        className="cancel"
                      />
                    </span>
                  </li>
                  <li className="SubL">
                    <label className="More">More</label>
                    <span>
                      <img src={MoreUp} alt="Cancel" className="MoreUp" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <NotificationContainer />
          </div>
        )}
      </Fragment>
    );
  }
}
export default MyTicket;
