import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadphoneImg from "./../assets/Images/headphone.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import BlackUserIcon from "./../assets/Images/avatar.png";
import Cancel from "./../assets/Images/CancelBlue.png";
import DownImg from "./../assets/Images/down.png";
import moment from "moment";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import LoadingImg from "./../assets/Images/loading.png";
import EyeImg from "./../assets/Images/eye.png";
import BillInvoiceImg from "./../assets/Images/bill-Invoice.png";
import commentImg from "./../assets/Images/page-icon.png";
import MsgImg from "./../assets/Images/msg.png";
import Down1Img from "./../assets/Images/down-1.png";
import PlusImg from "./../assets/Images/plus.png";
import MinusImg from "./../assets/Images/minus.png";
import RightImg from "./../assets/Images/right.png";
import TwitterImg from "./../assets/Images/twitter.png";
import Up1Img from "./../assets/Images/up-1.png";
import Loading1Img from "./../assets/Images/loading1.png";
import FacebookImg from "./../assets/Images/facebook.png";
import ClipImg from "./../assets/Images/clip.png";
import PencilImg from "./../assets/Images/pencil.png";
import CancelImg from "./../assets/Images/cancel.png";
import {
  UncontrolledCollapse,
  Collapse,
  CardBody,
  Card,
  Progress
} from "reactstrap";
import { Checkbox } from "antd";
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
import TicketStatus from "./MyTicketStatus";
// import Select from "react-select";
import TicketActionType from "./TicketActionType";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CircleCancel from "./../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";
import ThumbTick from "./../assets/Images/thumbticket.png"; // Don't comment this line
import PDF from "./../assets/Images/pdf.png"; // Don't comment this line
import CSVi from "./../assets/Images/csvicon.png"; // Don't comment this line
import Excel from "./../assets/Images/excel.png"; // Don't comment this line
import Word from "./../assets/Images/word.png"; // Don't comment this line
import TxtLogo from "./../assets/Images/TxtIcon.png"; // Don't comment this line
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
// import DatePicker from "react-date-picker";

class MyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      InformStore: false,
      ReplyInformStore: false,
      collapseUp: false,
      profilemodal: false,
      storemodal: false,
      storeproductsearch: false,
      OrderTable: false,
      labelModal: false,
      EmailCollapse: false,
      CommentsDrawer: false,
      BillInvoiceModal: false,
      HistOrderShow: true,
      ReAssignComment: false,
      FreeTextComment: false,
      CommentCollapse: false,
      CommentCollapse2: false,
      Comment1Collapse: false,
      KbLink: false,
      CheckBoxChecked: false,
      OrdItmBtnStatus: false,
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
      SearchAssignData: [],
      claimDetailsData: [],
      selectetedParameters: {},
      KbPopupData: [],
      orderDetails: [],
      selectedIssueTypeKB: 0,
      selectedCategoryKB: 0,
      selectedSubCategoryKB: 0,
      CkEditorTemplateData: [],
      ReplyCKEditoertemplat: [],
      CkEditorTemplateDetails: [],
      selectedStore: [],
      selectedProduct: [],
      tempName: "",
      selectTicketTemplateId: 0,
      mailBodyData: "",
      replymailBodyData: "",
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
      messageDetails: [],
      fileText: 0,
      ReplyfileText: 0,
      file: [],
      Rplyfile: [],
      fileDummy: [],
      userCcCount: 0,
      userBccCount: 0,
      mailFiled: {},
      orderNumber: "",
      orderDetailsData: [],
      validOrdernumber: "",
      StoreName: "",
      ProductName: "",
      agentId: 0,
      AttachementrData: [],
      ticketcommentMSG: "",
      addReassignCmmt: "",
      CustStoreStatusDrop: 1,
      OrderSubItem: [],
      FileData: [],
      ReplyFileData: [],
      expanded: {},
      mailId: 0,
      selectProductOrd: true,
      CheckBoxAllOrder: {},
      CheckBoxAllItem: {},
      SelectedAllOrder: [],
      SelectedAllItem: [],
      progressBarData: [],
      progressDataWithcColor: [],
      collapseId: "",
      tckcmtMSGCompulsory: "",
      hasAttachmentModal: false,
      hasAttachmentFile: [],
      FileAttachment: [],
      hasDataFile: [],
      ticketSourceId: 2,
      ReplySourceId: 2,
      FinalAttachmentData: [],
      skipComment: "",
      oldAgentId: 0,
      AssignCommentCompulsory: "",
      AssignToData: [],
      placeholderData: [],
      followUpIds: "",
      ticketFreeTextcomment: "",
      freetextCommentCompulsory: "",
      role_Name: ""
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
    this.handleUpdateTicketStatus = this.handleUpdateTicketStatus.bind(this);
    this.handleGetTicketDetails = this.handleGetTicketDetails.bind(this);
    this.handleGetCountOfTabs = this.handleGetCountOfTabs.bind(this);
    this.handleTicketAssignFollowUp = this.handleTicketAssignFollowUp.bind(
      this
    );
    this.handleAssignDataList = this.handleAssignDataList.bind(this);
    this.handleKbLinkPopupSearch = this.handleKbLinkPopupSearch.bind(this);
    this.handleGetOrderDetails = this.handleGetOrderDetails.bind(this);
    this.handleGetProductData = this.handleGetProductData.bind(this);
    this.handleGetMessageDetails = this.handleGetMessageDetails.bind(this);
    this.handleProgressBarDetails = this.handleProgressBarDetails.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handlePlaceholderList = this.handlePlaceholderList.bind(this);
    this.hanldeGetSelectedStoreData = this.hanldeGetSelectedStoreData.bind(
      this
    );
  }

  componentDidUpdate() {
    var ticketIds = this.props.location.ticketDetailID;
    if (ticketIds) {
      if (this.state.ticket_Id !== ticketIds) {
        this.componentDidMount();
      }
    }
  }

  componentDidMount() {
    ////debugger;
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
      this.handleProgressBarDetails(ticketId);
      this.handleGetAgentList();
      this.handlePlaceholderList();
    } else {
      this.props.history.push("myTicketlist");
    }
  }

  onAddCKEditorChange = evt => {
    ////debugger;
    var newContent = evt.editor.getData();
    this.setState({
      mailBodyData: newContent
    });
  };
  onreplyCKEditorChange = evt => {
    ////debugger;
    var newContent = evt.editor.getData();
    this.setState({
      replymailBodyData: newContent
    });
  };
  // handle Get Agent List for User dropdown
  handleGetAgentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data
          });
          // self.checkAllAgentStart();
        } else {
          self.setState({
            AssignToData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handlePlaceholderList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetMailParameter",
      headers: authHeader(),
      params: {
        AlertID: 8
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            placeholderData: data
          });
        } else {
          self.setState({
            placeholderData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleTicketAssignFollowUp() {
    debugger;
    let followUpIds = this.state.followUpIds.substring(
      0,
      this.state.followUpIds.length - 1
    );
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/ticketassigforfollowup",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id,
        FollowUPUserID: followUpIds
      }
    })
      .then(function(res) {
        ////debugger;
        // let status = res.data.message;
        // let data = res.data.responseData;
      })
      .catch(data => {
        console.log(data);
      });
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
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          var AgentId = data.assignedID;
          var customer_Id = data.customerID;
          var ticketStatus = data.status;
          var ticketPriority = data.priortyID;
          var ticketBrand = data.brandID;
          var ticketCagetory = data.categoryID;
          var ticketSubGategory = data.subCategoryID;
          var ticketChannelOfPurchaseID = data.channelOfPurchaseID;
          var ticketActionType = data.ticketActionTypeID;
          var ticketIssueTypeID = data.issueTypeID;
          var storeData = data.stores;
          var productData = data.products;
          var MailDetails = data.ticketingMailerQue;
          var attachementDetails = data.attachment;
          var rolename_ = data.roleName;
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

          var Storedetails = "";
          for (let i = 0; i < storeData.length; i++) {
            Storedetails += storeData[i].storename + ",";
          }
          Storedetails = Storedetails.substring(",", Storedetails.length - 1);
          var ProductDetails = "";
          for (let j = 0; j < productData.length; j++) {
            ProductDetails += productData[j].invoiceNumber + ",";
          }
          ProductDetails = ProductDetails.substring(
            ",",
            ProductDetails.length - 1
          );

          self.setState({
            ticketDetailsData: data,
            custID: customer_Id,
            selectetedParameters,
            StoreName: Storedetails,
            ProductName: ProductDetails,
            mailFiled: MailDetails,
            fileDummy: attachementDetails,
            oldAgentId: AgentId,
            role_Name: rolename_,
            loading: false
          });

          setTimeout(() => {
            self.handleGetCategoryList();
            self.handleGetSubCategoryList();
            self.handleGetIssueTypeList();
            self.handleOnLoadFiles();
          }, 100);
        } else {
          self.setState({
            ticketDetailsData: {},
            custID: 0
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleOnLoadFiles() {
    ////debugger;
    for (let i = 0; i < this.state.fileDummy.length; i++) {
      ////debugger;

      var objFile = new Object();
      var name = this.state.fileDummy[i].attachmentName;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;

      objFile.File = this.state.fileDummy[i];

      this.state.file.push(objFile);
    }
  }
  handleAssignDataList() {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getagentlist",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id
      }
    })
      .then(function(res) {
        ////debugger;
        let data = res.data.responseData;
        self.setState({
          SearchAssignData: data
        });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleUpdateTicketStatus(ticStaId) {
    ////debugger;
    // let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Updateticketstatus",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id,
        status: ticStaId
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.status;
        if (status === true) {
          if (ticStaId === 103) {
            NotificationManager.success(
              "The ticket has been resolved.",
              "",
              2000
            );
          } else if (ticStaId === 104) {
            NotificationManager.success(
              "The ticket has been closed.",
              "",
              2000
            );
          }
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  ////Handle Get all messages
  handleGetMessageDetails(ticketId) {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getticketmessage",
      headers: authHeader(),
      params: {
        ticketID: ticketId
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          let data = res.data.responseData;
          self.setState({
            messageDetails: data,
            hasAttachmentFile: data
          });
          setTimeout(() => {
            self.handleHasAttachmentFileData();
          }, 100);
        } else {
          self.setState({
            messageDetails: [],
            hasAttachmentFile: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleHasAttachmentFileData() {
    //debugger;
    for (let i = 0; i < this.state.hasAttachmentFile.length; i++) {
      var data = [];
      if (data !== null) {
        data = this.state.hasAttachmentFile[i].msgDetails;
        for (let j = 0; j < data.length; j++) {
          var details = [];
          details = data[j].latestMessageDetails;

          var Files = details.messageAttachments;

          if (Files.length > 0) {
            for (let k = 0; k < Files.length; k++) {
              var objFile = new Object();

              var name = Files[k].attachmentName;
              var FileId = Files[k].ticketMessageID;
              var type = name.substring(name.lastIndexOf(".") + 1, name.length);
              objFile.Type = type;
              objFile.name = name;
              objFile.id = FileId;

              objFile.File = Files[k];

              this.state.FileAttachment.push(objFile);
            }
          }
        }
      }
    }
  }

  handleGetOrderDetails() {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getorderdetailsbycustomerid",
      headers: authHeader(),
      params: {
        CustomerID: this.state.custID
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ orderDetails: data });
        } else {
          self.setState({ orderDetails: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  ////hanlde get order details
  handleGetProductData() {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getOrderDetailByTicketID",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id
      }
    })
      .then(function(res) {
        ////debugger;
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          const newSelected = Object.assign({}, self.state.CheckOrderID);
          ////debugger;

          var OrderSubItem = [];
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
            if (data[i].orderItems.length > 0) {
              for (let j = 0; j < data[i].orderItems.length; j++) {
                OrderSubItem.push(data[i].orderItems[j]);
              }
            }
          }
          self.setState({
            selectedDataRow: selectedRow,
            selectedProduct: data,
            OrderSubItem
          });
        } else {
          self.setState({
            selectedProduct: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  // onchange on User Drop down list
  setAssignedToValue(check, e) {
    debugger;
    if (check === "freeCmd") {
      let followUpIds = this.state.followUpIds;
      let assign = e.currentTarget.value;
      followUpIds += assign + ",";
      let text = this.state.ticketFreeTextcomment;
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      text += "@" + userName;
      this.setState({ ticketFreeTextcomment: text, followUpIds });
    } else if (check === "comment") {
      let followUpIds = this.state.followUpIds;
      let assign = e.currentTarget.value;
      followUpIds += assign + ",";
      let text = this.state.ticketcommentMSG;
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      text += "@" + userName;
      this.setState({ ticketcommentMSG: text, followUpIds });
    } else {
      let followUpIds = this.state.followUpIds;
      let assign = e.currentTarget.value;
      followUpIds += assign + ",";
      let ckData = this.state.mailBodyData;
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ mailBodyData: ckData, followUpIds });
    }
  }
  setPlaceholderValue(e) {
    debugger;
    let ckData = this.state.mailBodyData;
    let matchedArr = this.state.placeholderData.filter(
      x => x.mailParameterID == e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    ckData += placeholderName;
    this.setState({ mailBodyData: ckData });
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
    })
      .then(function(res) {
        ////debugger;
        let data = res.data.responseData;
        let Msg = res.data.message;
        if (Msg === "Success") {
          self.setState({ storeDetails: data });
        } else {
          self.setState({
            storeDetails: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetCountOfTabs(ID) {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetCountByticketID",
      headers: authHeader(),
      params: {
        ticketID: ID
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ tabCounts: data });
        } else {
          self.setState({ tabCounts: {} });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleUpdateTicketDetails() {
    ////debugger;
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
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Ticket updated successfully.", "", 2000);
          self.props.history.push("myticket");
        } else {
          NotificationManager.error("Ticket not update", "", 2000);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleRequireSize(e, rowData) {
    ////debugger;

    var id = rowData.original.orderItemID;
    var value = document.getElementById("requireSizeTxt" + id).value;
    var index = this.state.OrderSubItem.findIndex(
      x => x.orderItemID === rowData.original.orderItemID
    );

    var OrderSubItem = this.state.OrderSubItem;
    OrderSubItem[index].requireSize = value;

    this.setState({ OrderSubItem });
  }
  handleOrderSearchData() {
    ////debugger;
    let self = this;
    if (this.state.orderNumber.length > 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderListWithItemDetails",
        headers: authHeader(),
        params: {
          OrderNumber: this.state.orderNumber,
          CustomerID: this.state.custID
        }
      })
        .then(function(res) {
          ////debugger;
          let Msg = res.data.message;
          let mainData = res.data.responseData;

          var OrderSubItem = [];

          for (let i = 0; i < mainData.length; i++) {
            if (mainData[i].orderItems.length > 0) {
              for (let j = 0; j < mainData[i].orderItems.length; j++) {
                OrderSubItem.push(mainData[i].orderItems[j]);
              }
            }
          }
          self.setState({
            message: Msg,
            orderDetailsData: mainData,
            OrderSubItem
          });
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      self.setState({
        validOrdernumber: "Please Enter Order Number"
      });
    }
  }

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

  hanldeStatusChange(e) {
    ////debugger;
    var SelectValue = e.target.value;
    if (SelectValue === "1") {
      this.setState({
        CustStoreStatusDrop: 1
      });
    } else {
      this.setState({
        CustStoreStatusDrop: 2
      });
    }
  }
  handleDropDownChange = e => {
    ////debugger;
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
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ BrandData: data });
        } else {
          self.setState({ BrandData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetCategoryList() {
    ////debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: this.state.selectetedParameters.brandID
      }
    })
      .then(function(res) {
        ////debugger;
        // let status=
        let data = res.data;
        self.setState({ CategoryData: data });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetTicketPriorityList() {
    ////debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetSubCategoryList() {
    ////debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.selectetedParameters.categoryID
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ SubCategoryData: data });
        } else {
          self.setState({ SubCategoryData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetIssueTypeList() {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.selectetedParameters.subCategoryID
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ IssueTypeData: data });
        } else {
          self.setState({ IssueTypeData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader()
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ChannelOfPurchaseData: data });
        } else {
          self.setState({ ChannelOfPurchaseData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleAssignTickets() {
    ////debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/AssignTickets",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticket_Id,
        AgentID: this.state.agentId,
        Remark: ""
      }
    })
      .then(function(res) {
        ////debugger;
        let messageData = res.data.message;
        if (messageData === "Success") {
          NotificationManager.success(
            "Tickets assigned successfully.",
            "",
            1500
          );
          self.HandlelabelModalClose();
          // self.handleReAssignCommentOpen();
          setTimeout(function() {
            // self.componentDidMount();
            self.handleGetTicketDetails(self.state.ticket_Id);
          }, 1500);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  expand_row(row) {
    var expanded = { ...this.state.expanded };
    if (expanded[row.index]) {
      expanded[row.index] = !expanded[row.index];
    } else {
      expanded[row.index] = true;
    }

    this.setState({
      expanded: expanded
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
  handleUpOpen(id) {
    this.setState({ collapseUp: true, collapseId: id });
  }
  handleUpClose(id) {
    this.setState({ collapseUp: false, collapseId: id });
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
  handleReAssignCommentOpen() {
    this.setState({
      ReAssignComment: !this.state.ReAssignComment
    });
  }
  handleFreeTextCommentOpen(row) {
    debugger;
    if (row === "close") {
      this.setState({
        FreeTextComment: !this.state.FreeTextComment,
        ticketFreeTextcomment: ""
      });
    } else {
      this.setState({
        FreeTextComment: !this.state.FreeTextComment
      });
    }
  }
  handleCommentCollapseOpen(Mail_Id) {
    debugger;
    this.setState(state => ({
      CommentCollapse: !state.CommentCollapse,
      mailId: Mail_Id
    }));
  }
  handleCommentCollapseClose() {
    this.setState({ CommentCollapse: false, ticketcommentMSG: "" });
  }
  hanldeCommentOpen2(Mail_Id) {
    debugger;
    this.setState({ CommentCollapse2: true, mailId: Mail_Id });
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
  handleHasAttachmetModalOpen(msgID) {
    ////debugger;
    var filedata = this.state.FileAttachment.filter(x => x.id === msgID);
    // for (let i = 0; i < filedata.length; i++) {

    // }
    this.setState({ hasAttachmentModal: true, FinalAttachmentData: filedata });
  }
  handleHasAttachmetModalClose() {
    this.setState({ hasAttachmentModal: false });
  }
  handleSubmitForm(e) {
    e.preventDefault();
  }
  showInformStoreFuncation = () => {
    this.setState({
      InformStore: !this.state.InformStore
    });
  };
  showInformStoreReply = () => {
    this.setState({
      ReplyInformStore: !this.state.ReplyInformStore
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
    ////debugger;
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
      })
        .then(function(res) {
          ////debugger;
          let status = res.data.status;
          if (status === true) {
            var id = self.state.ticket_Id;
            self.handleGetNotesTabDetails(id);
            NotificationManager.success(
              "Comment added successfully.",
              "",
              2000
            );
            self.setState({
              NoteAddComment: "",
              notesCommentCompulsion: ""
            });
          } else {
            NotificationManager.error("Comment not added.", "", 2000);
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        notesCommentCompulsion: "The Notes field is compulsory."
      });
    }
  }
  handleGetHistoricalData() {
    ////debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/gettickethistory",
      headers: authHeader(),
      params: {
        TicketId: this.state.ticket_Id
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.status;
        let details = res.data.responseData;
        self.onOpenModal();
        if (status === true) {
          self.setState({ historicalDetails: details });
        }
      })
      .catch(data => {
        console.log(data);
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
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;

        if (status === "Success") {
          const newSelected = Object.assign({}, self.state.CheckStoreID);
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
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleAttachStoreData() {
    ////debugger;
    let self = this;
    var selectedStore = "";
    for (let j = 0; j < this.state.selectedStoreData.length; j++) {
      var PurposeID = this.state.selectedStoreData[j]["Purpose_Id"];

      if (PurposeID === "0") {
        // Send Id as 1 and 2 from API
        PurposeID = 1;
      } else {
        PurposeID = 2;
      }

      selectedStore +=
        this.state.selectedStoreData[j]["storeID"] +
        "|" +
        moment(this.state.selectedStoreData[j]["storeVisitDate"]).format(
          "YYYY-MM-DD"
        ) +
        "|" +
        PurposeID +
        ",";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Store/attachstore",
      headers: authHeader(),
      params: {
        TicketId: this.state.ticket_Id,
        StoreId: selectedStore.substring(",", selectedStore.length - 1)
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        // let details = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Store attached successfully.", "", 2000);
          self.HandleStoreModalClose();
          self.handleGetTicketDetails(self.state.ticket_Id);
        } else {
          NotificationManager.error("Store not attached", "", 2000);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleAttachProductData() {
    debugger;
    // let self = this;
    if (this.state.SelectedAllOrder.length > 0) {
      var selectedRow = "";

      if (this.state.SelectedAllOrder.length > 1) {
        if (this.state.SelectedAllItem.length === 0) {
          for (let j = 0; j < this.state.SelectedAllOrder.length; j++) {
            selectedRow +=
              this.state.SelectedAllOrder[j]["orderMasterID"] + "|0|1,";
          }
        } else {
          for (let i = 0; i < this.state.SelectedAllItem.length; i++) {
            selectedRow +=
              this.state.SelectedAllItem[i]["orderItemID"] +
              "|" +
              this.state.SelectedAllItem[i]["requireSize"] +
              "|0,";
          }
        }
      } else {
        if (this.state.SelectedAllItem.length === 0) {
          for (let j = 0; j < this.state.SelectedAllOrder.length; j++) {
            selectedRow +=
              this.state.SelectedAllOrder[j]["orderMasterID"] + "|0|1,";
          }
        } else {
          for (let i = 0; i < this.state.SelectedAllItem.length; i++) {
            selectedRow +=
              this.state.SelectedAllItem[i]["orderItemID"] +
              "|" +
              this.state.SelectedAllItem[i]["requireSize"] +
              "|0,";
          }
        }
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Order/attachorder",
        headers: authHeader(),
        params: {
          TicketId: this.state.ticket_Id,
          OrderID: selectedRow.substring(",", selectedRow.length - 1)
        }
      })
        .then(function(res) {
          ////debugger;
          let status = res.data.message;
          // let details = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success(
              "Product attached successfully.",
              "",
              2000
            );
          } else {
            NotificationManager.error("Product not attached", "", 2000);
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please select atleast one order.", "", 2000);
    }
  }
  handleGetNotesTabDetails(ticket_Id) {
    ////debugger;
    let self = this;
    // this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getNotesByTicketId",
      headers: authHeader(),
      params: {
        TicketId: ticket_Id
      }
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        let details = res.data.responseData;
        if (status === "Success") {
          self.setState({ Notesdetails: details });
        } else {
          self.setState({ Notesdetails: [] });
        }
      })
      .catch(data => {
        console.log(data);
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

  setTicketActionTypeValue = e => {
    this.setState({ selectedTicketActionType: e });
  };

  handleCheckStoreID(storeMasterID, rowData) {
    debugger;

    const newSelected = Object.assign({}, this.state.CheckStoreID);
    newSelected[storeMasterID] = !this.state.CheckStoreID[storeMasterID];
    this.setState({
      CheckStoreID: storeMasterID ? newSelected : false
    });
    var selectedRow = [];
    rowData["Purpose_Id"] = this.state.CustStoreStatusDrop;
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
  //KB Templete Pop up Search API
  handleKbLinkPopupSearch() {
    ////debugger;
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
    })
      .then(function(res) {
        ////debugger;
        let KbPopupData = res.data.responseData;
        if (KbPopupData.length === 0 || KbPopupData === null) {
          NotificationManager.error("No Record Found.", "", 2000);
        }
        self.setState({ KbPopupData: KbPopupData });
      })
      .catch(data => {
        console.log(data);
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
    ////debugger;
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
    })
      .then(function(res) {
        ////debugger;
        let data = res.data.responseData;
        self.setState({
          CkEditorTemplateData: data,
          ReplyCKEditoertemplat: data
        });
      })
      .catch(data => {
        console.log(data);
      });
  }

  //get Template data for select template funcation
  handleCkEditorTemplateData(tempId, tempName, row) {
    ////debugger;
    let self = this;
    if (row === 1) {
      axios({
        method: "post",
        url: config.apiUrl + "/Template/getTemplateContent",
        headers: authHeader(),
        params: {
          TemplateId: tempId
        }
      })
        .then(function(res) {
          ////debugger;
          let TemplateDetails = res.data.responseData;
          let bodyData = res.data.responseData.templateBody;
          self.setState({
            CkEditorTemplateDetails: TemplateDetails,
            tempName: tempName,
            selectTicketTemplateId: tempId,
            replymailBodyData: bodyData
          });
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      axios({
        method: "post",
        url: config.apiUrl + "/Template/getTemplateContent",
        headers: authHeader(),
        params: {
          TemplateId: tempId
        }
      })
        .then(function(res) {
          ////debugger;
          let TemplateDetails = res.data.responseData;
          let bodyData = res.data.responseData.templateBody;
          self.setState({
            CkEditorTemplateDetails: TemplateDetails,
            tempName: tempName,
            selectTicketTemplateId: tempId,
            mailBodyData: bodyData
          });
        })
        .catch(data => {
          console.log(data);
        });
    }
  }
  handleSendMailData(isSend) {
    debugger;
    let self = this;
    var str = this.state.mailBodyData;
    // var stringBody = str.replace(/<\/?p[^>]*>/g, "");
    // var finalText = stringBody.replace(/[&]nbsp[;]/g, " ");

    if (isSend === 1) {
      if (this.state.replymailBodyData.length > 0) {
        var str = this.state.replymailBodyData;
        // var stringBody = str.replace(/<\/?p[^>]*>/g, "");
        // var ReplyText = stringBody.replace(/[&]nbsp[;]/g, " ");

        if (this.state.InformStore === true) {
          var selectedStore = "";

          for (let i = 0; i < this.state.selectedStoreData.length; i++) {
            selectedStore += this.state.selectedStoreData[i]["storeID"] + ",";
          }
        } else {
          var selectedStore = "";
        }
        const formData = new FormData();
        var paramData = {
          TicketID: this.state.ticket_Id,
          ToEmail: this.state.ticketDetailsData.customerEmailId,
          UserCC: this.state.mailFiled.userCC,
          UserBCC: this.state.mailFiled.userBCC,
          TikcketMailSubject: this.state.ticketDetailsData.ticketTitle,
          TicketMailBody: this.state.replymailBodyData,
          IsInformToStore: this.state.InformStore,
          TicketSource: this.state.ReplySourceId, // Send ticket source id
          IsSent: 0,
          IsCustomerComment: 0,
          IsResponseToCustomer: 1,
          IsInternalComment: 0,
          MailID: this.state.mailId,
          StoreID: selectedStore.substring(",", selectedStore.length - 1)
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData));
        for (let j = 0; j < this.state.ReplyFileData.length; j++) {
          formData.append("Filedata", this.state.ReplyFileData[j]);
        }
        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////debugger;
            let status = res.data.message;
            if (status === "Success") {
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.hanldeCommentClose2();
              NotificationManager.success("Mail send successfully.", "", 1500);
              self.setState({
                mailFiled: {},
                ReplyFileData: [],
                ReplyfileText: 0,
                replymailBodyData: ""
              });
            } else {
              NotificationManager.error(status, "", 1500);
            }
          })
          .catch(data => {
            console.log(data);
          });
      } else {
        NotificationManager.error("Please Enter Body Section.", "", 2000);
      }
    } else if (isSend === 2) {
      // -------------Plush Icen Editor Call api--------------------
      if (
        this.state.mailBodyData.length > 0 &&
        this.state.mailBodyData.length <= 1999
      ) {
        if (this.state.mailBodyData.length > 0) {
          if (this.state.ReplyInformStore === true) {
            var store_Id = "";

            for (let i = 0; i < this.state.selectedStoreData.length; i++) {
              store_Id += this.state.selectedStoreData[i]["storeID"] + ",";
            }
          } else {
            var store_Id = "";
          }
          const formData = new FormData();
          var paramData = {
            TicketID: this.state.ticket_Id,
            ToEmail: this.state.ticketDetailsData.customerEmailId,
            UserCC: this.state.mailFiled.userCC,
            UserBCC: this.state.mailFiled.userBCC,
            TikcketMailSubject: this.state.ticketDetailsData.ticketTitle,
            TicketMailBody: this.state.mailBodyData,
            IsInformToStore: this.state.ReplyInformStore,
            TicketSource: this.state.ticketSourceId, // Send ticket source id
            IsSent: 0,
            IsCustomerComment: 1,
            IsResponseToCustomer: 1,
            MailID: 0,
            StoreID: store_Id.substring(",", store_Id.length - 1)
          };
          formData.append("ticketingMailerQue", JSON.stringify(paramData));
          for (let j = 0; j < this.state.FileData.length; j++) {
            formData.append("Filedata", this.state.FileData[j]);
          }

          axios({
            method: "post",
            url: config.apiUrl + "/Ticketing/MessageComment",
            headers: authHeader(),
            data: formData
          })
            .then(function(res) {
              ////debugger;
              let status = res.data.message;
              if (status === "Success") {
                self.handleGetMessageDetails(self.state.ticket_Id);
                self.handleGetCountOfTabs(self.state.ticket_Id);
                self.handleTicketAssignFollowUp();
                self.HandleEmailCollapseOpen();
                NotificationManager.success(
                  "Mail send successfully.",
                  "",
                  2000
                );
                self.setState({
                  mailFiled: {},
                  // mailSubject: "",
                  mailBodyData: ""
                });
              } else {
                NotificationManager.error(status, "", 2000);
              }
            })
            .catch(data => {
              console.log(data);
            });
        } else {
          NotificationManager.error("Please Enter Body Section.", "", 2000);
        }
      } else {
        NotificationManager.error(
          "Only 2000 Charater Allow In Body Section.",
          "",
          2000
        );
      }
    } else if (isSend === 3) {
      // ----------------IsCustomerCommet Comment modal Call api ------------------
      if (this.state.ticketcommentMSG.length > 0) {
        const formData = new FormData();
        var paramData = {
          TicketID: this.state.ticket_Id,
          TicketMailBody: this.state.ticketcommentMSG.trim(),
          IsSent: 1,
          IsCustomerComment: 0,
          IsInternalComment: 1,
          MailID: this.state.mailId
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData));

        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////debugger;
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success(
                "Comment Added successfully.",
                "",
                2000
              );
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.handleCommentCollapseOpen();
              self.setState({
                ticketcommentMSG: "",
                tckcmtMSGCompulsory: ""
              });
            } else {
              NotificationManager.error(status, "", 2000);
              self.setState({
                ticketcommentMSG: ""
              });
            }
          })
          .catch(data => {
            console.log(data);
          });
      } else {
        this.setState({
          tckcmtMSGCompulsory: "Comment field is compulsory."
        });
      }
    } else if (isSend === 4) {
      // ---------------API call for ReAssign To Ticket---------------------
      if (this.state.addReassignCmmt.length > 0) {
        const formData = new FormData();
        var paramData = {
          TicketID: this.state.ticket_Id,
          TicketMailBody: this.state.addReassignCmmt,
          IsSent: 1,
          IsCustomerComment: 0,
          IsInternalComment: 1,
          MailID: 0,
          OldAgentID: this.state.oldAgentId,
          NewAgentID: this.state.agentId
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData));

        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////debugger;
            let status = res.data.message;
            if (status === "Success") {
              // NotificationManager.success(
              //   "Comment Added successfully.",
              //   "",
              //   2000
              // );
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.handleReAssignCommentOpen();
              self.handleAssignTickets();
              self.setState({
                addReassignCmmt: "",
                AssignCommentCompulsory: ""
              });
            } else {
              NotificationManager.error(status, "", 2000);
              self.setState({
                addReassignCmmt: ""
              });
            }
          })
          .catch(data => {
            console.log(data);
          });
      } else {
        this.setState({
          AssignCommentCompulsory: "Comment field is compulsory."
        });
      }
    } else {
      if (this.state.ticketFreeTextcomment.length > 0) {
        const formData = new FormData();
        var paramData = {
          TicketID: this.state.ticket_Id,
          TicketMailBody: this.state.ticketFreeTextcomment.trim(),
          IsSent: 1,
          IsCustomerComment: 0,
          IsInternalComment: 1
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData));

        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////debugger;
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success(
                "Comment Added successfully.",
                "",
                2000
              );
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.handleFreeTextCommentOpen();
              self.setState({
                ticketFreeTextcomment: "",
                freetextCommentCompulsory: ""
              });
            } else {
              NotificationManager.error(status, "", 2000);
            }
          })
          .catch(data => {
            console.log(data);
          });
      } else {
        this.setState({
          freetextCommentCompulsory: "Comment field is compulsory."
        });
      }
    }
  }

  handleMailOnChange(filed, e) {
    ////debugger;
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
  handleProgressBarDetails(id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getprogressbardetail",
      headers: authHeader(),
      params: {
        TicketID: id
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          var progressColor = [];
          if (data) {
            var objColor = {};
            objColor.value = data.progressFirstPercentage;
            objColor.color = data.progressFirstColorCode;
            progressColor.push(objColor);
            var objColor1 = {};
            objColor1.value = data.progressSecondPercentage;
            objColor1.color = data.progressSecondColorCode;
            progressColor.push(objColor1);
          }
          self.setState({
            progressBarData: data,
            progressDataWithcColor: progressColor
          });
        } else {
          self.setState({ progressBarData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleReplyFileUpload(e) {
    ////debugger;
    var allFiles = [];
    var selectedFiles = e.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      allFiles.push(selectedFiles[i]);
    }
    // -------------------------Image View code start-----------------------
    // if (e.target.files && e.target.files[0]) {
    //   const filesAmount = e.target.files.length;
    //   for (let i = 0; i < filesAmount; i++) {
    //     const reader = new FileReader();
    //     reader.onload = file => {
    //       this.setState({
    //         imageView: file.target.result
    //       });
    //     };
    //     reader.readAsDataURL(e.target.files[i]);
    //   }
    // }
    for (let i = 0; i < e.target.files.length; i++) {
      ////debugger;

      var objFile = new Object();
      var name = e.target.files[i].name;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;

      objFile.File = e.target.files[i];
      const file = e.target.files[i];

      this.state.Rplyfile.push(objFile);
      this.state.ReplyFileData.push(file);
    }

    this.setState({
      ReplyfileText: this.state.Rplyfile.length,
      ReplyFileData: allFiles
    });
  }
  handleFileUpload(e) {
    ////debugger;
    var allFiles = [];
    var selectedFiles = e.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      allFiles.push(selectedFiles[i]);
    }
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
      ////debugger;

      var objFile = new Object();
      var name = e.target.files[i].name;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;

      objFile.File = e.target.files[i];
      const file = e.target.files[i];

      this.state.file.push(objFile);
      this.state.FileData.push(file);
    }

    // -------------------------Image View code end-----------------------
    this.setState({ fileText: this.state.file.length, FileData: allFiles });
  }

  handleByvisitDate(e, rowData) {
    debugger;
    var id = e.original.storeID;
    var index = this.state.selectedStoreData.findIndex(x => x.storeID === id);
    // this.state.selectedStoreData["VisitedDate"] = rowData;
    var selectedStoreData = this.state.selectedStoreData;
    selectedStoreData[index].storeVisitDate = rowData;

    this.setState({ selectedStoreData });
  }
  handleChangeOrderItem = e => {
    ////debugger;

    var values = e.target.checked;
    if (!this.state.selectProductOrd) {
      if (values) {
        var x = document.getElementById("ordertbls");
        var x1 = document.getElementById("orderitemtbl");

        x.style.display = "block";
        x1.style.display = "none";
      } else {
        var i = document.getElementById("ordertbls");
        var j = document.getElementById("orderitemtbl");
        i.style.display = "none";
        j.style.display = "block ";
      }
      this.setState({
        OrdItmBtnStatus: e.target.checked
      });
    } else {
      if (values) {
        var x = document.getElementById("ordertable");
        var x1 = document.getElementById("orderitemtable");

        x.style.display = "block";
        x1.style.display = "none";
      } else {
        var i = document.getElementById("ordertable");
        var j = document.getElementById("orderitemtable");
        i.style.display = "none";
        j.style.display = "block ";
      }
      this.setState({
        OrdItmBtnStatus: e.target.checked
      });
    }
  };

  handleRemoveImage(i) {
    ////debugger;
    let file = this.state.file;
    file.splice(i, 1);
    var fileText = file.length;
    setTimeout(() => {
      this.setState({ file, fileText });
    }, 50);
  }

  handleSetDataTab = () => {
    ////debugger;
    this.setState({
      selectProductOrd: !this.state.selectProductOrd
    });
  };

  // -------------------------------Check box selected all code start-------------------------------

  onCheckMasterAllChange(orderMasterID, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
    newSelected[orderMasterID] = !this.state.CheckBoxAllOrder[orderMasterID];
    this.setState({
      CheckBoxAllOrder: orderMasterID ? newSelected : false
    });
    var selectedRow = [];
    var CselectedRow = [];
    if (this.state.SelectedAllOrder.length === 0) {
      selectedRow.push(rowData);
      var Order_Master = this.state.OrderSubItem.filter(
        x => x.orderMasterID === orderMasterID
      );
      if (Order_Master.length > 0) {
        var objCheckBoxAllItem = new Object();
        for (let j = 0; j < Order_Master.length; j++) {
          objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

          CselectedRow.push(Order_Master[j]);
        }
        this.setState({
          CheckBoxAllItem: objCheckBoxAllItem
        });
      }
      this.setState({
        SelectedAllOrder: selectedRow,
        SelectedAllItem: CselectedRow
      });
    } else {
      if (newSelected[orderMasterID] === true) {
        for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
          if (this.state.SelectedAllOrder[i] === rowData) {
            selectedRow = this.state.SelectedAllOrder;
            selectedRow.push(rowData);
            var Order_Master = this.state.OrderSubItem.filter(
              x => x.orderMasterID === orderMasterID
            );
            if (Order_Master.length > 0) {
              var objCheckBoxAllItem = new Object();
              for (let j = 0; j < Order_Master.length; j++) {
                objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

                CselectedRow.push(Order_Master[j]);
              }
              this.setState({
                CheckBoxAllItem: objCheckBoxAllItem
              });
            }

            this.setState({
              SelectedAllOrder: selectedRow,
              SelectedAllItem: CselectedRow
            });

            break;
          }
        }
      } else {
        for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
          if (this.state.SelectedAllOrder[i] === rowData) {
            selectedRow = this.state.SelectedAllOrder;
            selectedRow.splice(i, 1);
            var Order_Master = this.state.OrderSubItem.filter(
              x => x.orderMasterID === orderMasterID
            );
            if (Order_Master.length > 0) {
              var objCheckBoxAllItem = new Object();
              for (let j = 0; j < Order_Master.length; j++) {
                objCheckBoxAllItem[Order_Master[j].orderItemID] = false;
              }
              this.setState({
                CheckBoxAllItem: objCheckBoxAllItem
              });
            }

            this.setState({
              SelectedAllOrder: selectedRow,
              SelectedAllItem: []
            });

            break;
          }
        }
      }
    }

    this.setState({
      SelectedAllOrder: selectedRow,
      SelectedAllItem: CselectedRow,
      selectedProduct: selectedRow
    });
  }

  checkIndividualItem(orderItemID, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[orderItemID] = !this.state.CheckBoxAllItem[orderItemID];
    this.setState({
      CheckBoxAllItem: orderItemID ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow
      });
    } else {
      if (newSelected[orderItemID] === true) {
        for (var i = 0; i < this.state.SelectedAllItem.length; i++) {
          selectedRow = this.state.SelectedAllItem;
          selectedRow.push(rowData);
          var Order_Master = this.state.OrderSubItem.filter(
            x => x.orderMasterID === this.state.SelectedAllItem[i].orderMasterID
          );
          if (Order_Master.length === selectedRow.length) {
            const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
            newSelected[Order_Master[0].orderMasterID] = !this.state
              .CheckBoxAllOrder[Order_Master[0].orderMasterID];
            this.setState({
              CheckBoxAllOrder: Order_Master[0].orderMasterID
                ? newSelected
                : false
            });
            var data_master = this.state.orderDetailsData.filter(
              y => y.orderMasterID === Order_Master[0].orderMasterID
            );
            if (data_master.length > 0) {
              var MastOrd = this.state.SelectedAllOrder;
              MastOrd.push(data_master[0]);
              this.setState({
                SelectedAllOrder: MastOrd
              });
            }
          }
          break;
        }
      } else {
        for (var j = 0; j < this.state.SelectedAllItem.length; j++) {
          if (this.state.SelectedAllItem[j] === rowData) {
            selectedRow = this.state.SelectedAllItem;
            selectedRow.splice(j, 1);

            var Order_Master = this.state.OrderSubItem.filter(
              x => x.orderMasterID === rowData.orderMasterID
            );

            if (Order_Master.length !== selectedRow.length) {
              const newSelected = Object.assign(
                {},
                this.state.CheckBoxAllOrder
              );
              newSelected[Order_Master[0].orderMasterID] = false;
              this.setState({
                CheckBoxAllOrder: Order_Master[0].orderMasterID
                  ? newSelected
                  : false
              });
              var data_master = this.state.orderDetailsData.filter(
                y => y.orderMasterID === Order_Master[0].orderMasterID
              );
              var GetIndex = this.state.orderDetailsData.findIndex(
                y => y.orderMasterID === Order_Master[0].orderMasterID
              );
              if (data_master.length > 0) {
                var MastOrd = this.state.SelectedAllOrder;
                MastOrd.splice(GetIndex, 1);
                this.setState({
                  SelectedAllOrder: MastOrd
                });
              }
            }

            break;
          }
        }
      }
    }
    this.setState({
      SelectedAllItem: selectedRow,
      selectedProduct: selectedRow
    });
  }
  // -------------------------------Check box selected all code end-------------------------------

  callbackToParent = () => {
    ////debugger;
    this.handleGetCountOfTabs(this.state.ticket_Id);
  };
  handleTicketSourceChange = e => {
    let value = e.target.value;
    this.setState({ ticketSourceId: value });
  };

  handleReplyTcktSourceChange = e => {
    let value = e.target.value;
    this.setState({ ReplySourceId: value });
  };
  handleSkipComment() {
    ////debugger;
    let self = this;
    const formData = new FormData();
    var paramData = {
      TicketID: this.state.ticket_Id,
      TicketMailBody: "Ticket has been reassigned by @User1 to @User2",
      IsSent: 1,
      IsCustomerComment: 0,
      IsInternalComment: 1,
      MailID: 0,
      OldAgentID: this.state.oldAgentId,
      NewAgentID: this.state.agentId
    };
    formData.append("ticketingMailerQue", JSON.stringify(paramData));

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/MessageComment",
      headers: authHeader(),
      data: formData
    })
      .then(function(res) {
        ////debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetMessageDetails(self.state.ticket_Id);
          self.handleGetCountOfTabs(self.state.ticket_Id);
          self.handleReAssignCommentOpen();
          self.handleAssignTickets();
          self.setState({
            addReassignCmmt: ""
          });
        } else {
          NotificationManager.error(status, "", 2000);
          self.setState({
            addReassignCmmt: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  render() {
    const {
      open,
      ticketDetailsData,
      historicalDetails,
      SearchAssignData,
      orderDetails,
      selectedProduct,
      storeDetails,
      selectedStore
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
                      classNames={{ modal: "historical-popup" }}
                    >
                      <label className="lblHistorical">Ticket Historical</label>
                      <img
                        src={CancelImg}
                        alt="cancelImg"
                        className="cancalImg"
                        onClick={this.onCloseModal.bind(this)}
                      />
                      {/* <HistoricalTable /> */}
                      <div className="tic-history tic-his varunoverflow">
                        <ReactTable
                          data={historicalDetails}
                          columns={[
                            {
                              Header: <span>Name</span>,
                              accessor: "name",
                              width: 150
                            },
                            {
                              Header: <span>Action</span>,
                              accessor: "action"
                            },
                            {
                              Header: <span>Time & Date</span>,
                              accessor: "dateandTime",
                              width: 200,
                              Cell: row => {
                                var date = row.original["dateandTime"];
                                return (
                                  <span>
                                    {moment(date).format("M/D/YYYY")} &nbsp;
                                    {moment(date).format("HH:mm")}
                                  </span>
                                );
                              }
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
                    <div
                      className="myTicket-table remov agentlist"
                      id="tic-det-assign"
                    >
                      <ReactTable
                        className="limit-react-table-body"
                        data={SearchAssignData}
                        columns={[
                          {
                            Header: <span>Emp Id</span>,
                            accessor: "user_ID",
                            width: 80
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
                        minRows={2}
                        // defaultPageSize={5}
                        showPagination={false}
                        resizable={false}
                        getTrProps={(rowInfo, column) => {
                          // ////debugger;
                          const index = column ? column.index : -1;
                          return {
                            onClick: e => {
                              ////debugger;
                              this.selectedRow = index;
                              var agentId = column.original["user_ID"];
                              this.setState({ agentId });
                            },
                            style: {
                              background:
                                this.selectedRow === index ? "#ECF2F4" : null
                            }
                          };
                        }}
                      />
                      <div className="button-margin">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={this.handleReAssignCommentOpen.bind(this)}
                        >
                          SELECT
                        </button>
                      </div>
                      <div
                        className="cancel-assign"
                        onClick={this.HandlelabelModalClose.bind(this)}
                      >
                        <img src={Cancel} alt="cancel" />
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
            <Modal
              open={this.state.ReAssignComment}
              onClose={this.handleReAssignCommentOpen.bind(this)}
              closeIconId="sdsg"
              modalId="Historical-popup"
              overlayId="logout-ovrly"
              classNames={{
                modal: "historical-popup"
              }}
            >
              <div className="commenttextborder">
                <div className="comment-disp">
                  <div className="Commentlabel">
                    <label className="Commentlabel1">Add Comment</label>
                  </div>
                  <div>
                    <img
                      src={CrossIcon}
                      alt="Minus"
                      className="pro-cross-icn m-0"
                      onClick={this.handleReAssignCommentOpen.bind(this)}
                    />
                  </div>
                </div>
                <div className="commenttextmessage">
                  <textarea
                    cols="31"
                    rows="3"
                    className="ticketMSGCmt-textarea"
                    name="addReassignCmmt"
                    maxLength={300}
                    value={this.state.addReassignCmmt}
                    onChange={this.handleNoteOnChange}
                  ></textarea>
                </div>
                {this.state.addReassignCmmt.length === 0 && (
                  <p style={{ color: "red", marginTop: "0px" }}>
                    {this.state.AssignCommentCompulsory}
                  </p>
                )}
                <div className="SendCommentBtn" style={{ float: "left" }}>
                  <button
                    className="SendCommentBtn1"
                    onClick={this.handleSkipComment.bind(this)}
                  >
                    SKIP
                  </button>
                </div>
                <div className="SendCommentBtn">
                  <button
                    className="SendCommentBtn1"
                    onClick={this.handleSendMailData.bind(this, 4)}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </Modal>
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
                                      columns={[
                                        {
                                          Header: (
                                            <span className="historyTable-header ">
                                              SKU
                                            </span>
                                          ),
                                          accessor: "sku"
                                        },
                                        {
                                          id: "createdBy",
                                          Header: (
                                            <span className="historyTable-header">
                                              Name
                                            </span>
                                          ),
                                          accessor: "Name"
                                        },
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              Price
                                            </span>
                                          ),
                                          accessor: "Price"
                                        },
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              Quantity
                                            </span>
                                          ),
                                          accessor: "Quantity"
                                        },
                                        {
                                          Header: (
                                            <span className="historyTable-header">
                                              MOP
                                            </span>
                                          ),
                                          accessor: "Mop"
                                        }
                                      ]}
                                      // resizable={false}
                                      defaultPageSize={5}
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
                          {ticketDetailsData.targetClosuredate}
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
                      {/* <progress
                        className="ticket-progress"
                        style={{ width: "100%" }}
                        value="50"
                        max="100"
                      ></progress> */}
                      <div className="tic-det-progress">
                        <Progress multi>
                          {this.state.progressDataWithcColor.map(function(
                            item
                          ) {
                            if (item.color === "No Color") {
                              return <Progress bar></Progress>;
                            }
                            if (item.color === "Orange") {
                              return (
                                <Progress
                                  bar
                                  color="warning"
                                  value={item.value}
                                ></Progress>
                              );
                            }

                            if (item.color === "Red") {
                              return (
                                <Progress
                                  bar
                                  color="danger"
                                  value={item.value}
                                ></Progress>
                              );
                            }

                            if (item.color === "Green") {
                              return (
                                <Progress
                                  bar
                                  color="success"
                                  value={item.value}
                                ></Progress>
                              );
                            }
                          })}
                        </Progress>
                      </div>
                      <p className="logout-label font-weight-bold prog-indi-1">
                        {ticketDetailsData.durationRemaining}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-md-6" > */}
                  <div
                    className={
                      this.state.role_Name === "Supervisor"
                        ? "col-md-6"
                        : "col-md-6 disabled-link" &&
                          this.state.role_Name === "Admin"
                        ? "col-md-6"
                        : "col-md-6 disabled-link"
                    }
                  >
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
                            {this.state.StoreName === "" ? (
                              <label className="label-4 storeSpacing">
                                No Store Attached
                              </label>
                            ) : (
                              this.state.StoreName
                            )}
                            &nbsp;
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
                                <select
                                  className="systemstoredropdown1"
                                  value={this.state.CustStoreStatusDrop}
                                  onChange={this.hanldeStatusChange.bind(this)}
                                >
                                  <option value="1">
                                    Customer Want to visit store
                                  </option>
                                  <option value="2">
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
                                  autoComplete="off"
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
                                    {this.state.selectedStoreData.length > 0 ||
                                    selectedStore.length > 0 ? (
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
                                    ) : null}
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
                                <div className="reactstoreselect custom-react-table datePickertable">
                                  <ReactTable
                                    data={storeDetails}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "purpose",
                                        Cell: row => {
                                          return (
                                            <div
                                              className="filter-checkbox"
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
                                              ></label>
                                            </div>
                                          );
                                        },
                                        width: 20
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
                                      }
                                    ]}
                                    // resizable={false}
                                    defaultPageSize={5}
                                    showPagination={false}
                                    minRows={2}
                                  />
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="selectedstore-tab"
                                role="tabpanel"
                                aria-labelledby="selectedstore-tab"
                              >
                                <div className="reactstoreselect custom-react-table datePickertable">
                                  {/* {this.state.loading === true ? (
                                    <div className="loader-icon"></div>
                                  ) : ( */}
                                  <ReactTable
                                    data={this.state.selectedStoreData}
                                    columns={[
                                      {
                                        Header: "",
                                        accessor: "storeID",
                                        width: 20,
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
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Purpose</span>,
                                        accessor: "invoiceNumber",
                                        Cell: row => (
                                          <div
                                            className="filter-checkbox"
                                            style={{ marginLeft: "15px" }}
                                          >
                                            <label
                                              htmlFor={
                                                "i" + row.original.storeID
                                              }
                                            >
                                              {row.original.Purpose_Id === 1
                                                ? "Customer Want to visit store"
                                                : "Customer Already visited store"}
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
                                        accessor: "storeVisitDate",
                                        Cell: row => {
                                          debugger;
                                          return (
                                            <div className="col-sm-12 p-0">
                                              <DatePicker
                                                selected={
                                                  new Date(
                                                    row.original.storeVisitDate
                                                  )
                                                }
                                                // placeholderText="MM/DD/YYYY"
                                                placeholderText={
                                                  row.original
                                                    .storeVisitDate === null
                                                    ? "MM/DD/YYYY"
                                                    : null
                                                }
                                                showMonthDropdown
                                                showYearDropdown
                                                dateFormat="MM/DD/YYYY"
                                                id={
                                                  "visitDate" +
                                                  row.original.storeID
                                                }
                                                value={moment(
                                                  row.original.storeVisitDate
                                                ).format("MM/DD/YYYY")}
                                                // name="visitDate"
                                                onChange={this.handleByvisitDate.bind(
                                                  this,
                                                  row
                                                )}
                                              />
                                            </div>
                                          );
                                        }
                                      }
                                    ]}
                                    // resizable={false}
                                    defaultPageSize={5}
                                    showPagination={false}
                                    minRows={2}
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
                            {this.state.ProductName === "" ? (
                              <label className="label-4">
                                No Product Attached
                              </label>
                            ) : (
                              this.state.ProductName
                            )}
                            &nbsp;
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
                                        checked={this.state.OrdItmBtnStatus}
                                        onChange={this.handleChangeOrderItem}
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
                                  name="orderNumber"
                                  value={this.state.orderNumber}
                                  onChange={this.handleNoteOnChange}
                                />
                                <img
                                  src={SearchBlackImg}
                                  alt="Search"
                                  className="searchtextimgpopup"
                                  onClick={this.handleOrderSearchData.bind(
                                    this
                                  )}
                                />
                                {this.state.orderNumber.length === 0 && (
                                  <p
                                    style={{
                                      color: "red",
                                      marginBottom: "0px"
                                    }}
                                  >
                                    {this.state.validOrdernumber}
                                  </p>
                                )}
                              </div>
                            </div>

                            <span className="linestore1"></span>
                            <div className="newtabstore">
                              <div className="tab-content tabcontentstore">
                                <div className="row align-items-center mr-0">
                                  <ul
                                    className="nav alert-nav-tabs3 store-nav-tabs col-md-6"
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
                                        onClick={this.handleSetDataTab}
                                      >
                                        Product Details
                                      </a>
                                    </li>
                                    {this.state.selectedProduct.length > 0 ? (
                                      <li className="nav-item fo">
                                        <a
                                          className="nav-link"
                                          data-toggle="tab"
                                          href="#selectedproduct-tab"
                                          role="tab"
                                          aria-controls="selectedproduct-tab"
                                          aria-selected="false"
                                          onClick={this.handleSetDataTab}
                                        >
                                          Selected Product
                                        </a>
                                      </li>
                                    ) : null}
                                  </ul>
                                  {/* {this.state.selectedProduct.length > 0 ? ( */}
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
                                  {/* ) : null} */}
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
                                <div
                                  className="reactstoreselect custom-react-table"
                                  id="orderitemtable"
                                  style={{ display: "block" }}
                                >
                                  <ReactTable
                                    data={this.state.orderDetailsData}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "orderMasterID",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                              style={{ display: "none" }}
                                              name="AllOrder"
                                              checked={
                                                this.state.CheckBoxAllOrder[
                                                  row.original.orderMasterID
                                                ] === true
                                              }
                                              onChange={this.onCheckMasterAllChange.bind(
                                                this,
                                                row.original.orderMasterID,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Invoice Number</span>,
                                        accessor: "invoiceNumber"
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
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={false}
                                  />
                                </div>
                                <div
                                  className="reactstoreselect custom-react-table"
                                  id="ordertable"
                                  style={{ display: "none" }}
                                >
                                  <ReactTable
                                    data={this.state.orderDetailsData}
                                    expanded={this.state.expanded}
                                    onExpandedChange={(
                                      newExpanded,
                                      index,
                                      event
                                    ) => {
                                      if (newExpanded[index[0]] === false) {
                                        newExpanded = {};
                                      } else {
                                        Object.keys(newExpanded).map(k => {
                                          newExpanded[k] =
                                            parseInt(k) === index[0]
                                              ? {}
                                              : false;
                                        });
                                      }
                                      this.setState({
                                        ...this.state,
                                        expanded: newExpanded
                                      });
                                    }}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "orderMasterID",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                              style={{ display: "none" }}
                                              name="AllOrder"
                                              checked={
                                                this.state.CheckBoxAllOrder[
                                                  row.original.orderMasterID
                                                ] === true
                                              }
                                              onChange={this.onCheckMasterAllChange.bind(
                                                this,
                                                row.original.orderMasterID,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Invoice Number</span>,
                                        accessor: "invoiceNumber"
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
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={false}
                                    SubComponent={row => {
                                      return (
                                        <div
                                          className="inner-custom-react-table"
                                          id="inner-custom-react-table"
                                        >
                                          <ReactTable
                                            // data={row.original.orderItems}
                                            data={this.state.OrderSubItem.filter(
                                              x =>
                                                x.orderMasterID ===
                                                row.original.orderMasterID
                                            )}
                                            columns={[
                                              {
                                                Header: <span> </span>,
                                                accessor: "invoiceNo",
                                                width: 20,
                                                Cell: row => {
                                                  // ////debugger
                                                  return (
                                                    <div className="filter-checkbox">
                                                      <input
                                                        type="checkbox"
                                                        id={
                                                          "item" +
                                                          row.original
                                                            .orderItemID
                                                        }
                                                        style={{
                                                          display: "none"
                                                        }}
                                                        name="AllItem"
                                                        checked={
                                                          this.state
                                                            .CheckBoxAllItem[
                                                            row.original
                                                              .orderItemID
                                                          ] === true
                                                        }
                                                        onChange={this.checkIndividualItem.bind(
                                                          this,
                                                          row.original
                                                            .orderItemID,
                                                          row.original
                                                        )}
                                                      />
                                                      <label
                                                        htmlFor={
                                                          "item" +
                                                          row.original
                                                            .orderItemID
                                                        }
                                                      ></label>
                                                    </div>
                                                  );
                                                }
                                              },
                                              {
                                                Header: (
                                                  <span>Article Number</span>
                                                ),
                                                accessor: "articleNumber"
                                              },
                                              {
                                                Header: (
                                                  <span>Article Name</span>
                                                ),
                                                accessor: "articleName"
                                              },
                                              {
                                                Header: (
                                                  <span>Article MRP</span>
                                                ),
                                                accessor: "itemPrice"
                                              },
                                              {
                                                Header: <span>Price Paid</span>,
                                                accessor: "pricePaid"
                                              },
                                              {
                                                Header: <span>Discount</span>,
                                                accessor: "discount"
                                              },
                                              {
                                                Header: (
                                                  <span>Required Size</span>
                                                ),
                                                accessor: "requireSize",
                                                Cell: row => {
                                                  return (
                                                    <div>
                                                      <input
                                                        type="text"
                                                        id={
                                                          "requireSizeTxt" +
                                                          row.original
                                                            .orderItemID
                                                        }
                                                        value={
                                                          row.original
                                                            .requireSize || ""
                                                        }
                                                        name="requiredSize"
                                                        className="order-input"
                                                        onChange={() => {
                                                          this.handleRequireSize(
                                                            this,
                                                            row
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                  );
                                                }
                                              }
                                            ]}
                                            defaultPageSize={5}
                                            minRows={2}
                                            showPagination={false}
                                          />
                                        </div>
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="selectedproduct-tab"
                                role="tabpanel"
                                aria-labelledby="selectedproduct-tab"
                              >
                                <div
                                  className="reactstoreselect custom-react-table"
                                  id="orderitemtbl"
                                  style={{ display: "block" }}
                                >
                                  <ReactTable
                                    data={selectedProduct}
                                    // data={this.state.selectedDataRow}
                                    expanded={this.state.expanded}
                                    onExpandedChange={(
                                      newExpanded,
                                      index,
                                      event
                                    ) => {
                                      if (newExpanded[index[0]] === false) {
                                        newExpanded = {};
                                      } else {
                                        Object.keys(newExpanded).map(k => {
                                          newExpanded[k] =
                                            parseInt(k) === index[0]
                                              ? {}
                                              : false;
                                        });
                                      }
                                      this.setState({
                                        ...this.state,
                                        expanded: newExpanded
                                      });
                                    }}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "orderMasterID",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                              style={{ display: "none" }}
                                              name="AllOrder"
                                              checked={
                                                this.state.CheckBoxAllOrder[
                                                  row.original.orderMasterID
                                                ] === true
                                              }
                                              onChange={this.onCheckMasterAllChange.bind(
                                                this,
                                                row.original.orderMasterID,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Invoice Number</span>,
                                        accessor: "invoiceNumber"
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
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={false}
                                  />
                                </div>
                                <div
                                  className="reactstoreselect custom-react-table"
                                  id="ordertbls"
                                  style={{ display: "none" }}
                                >
                                  <ReactTable
                                    data={selectedProduct}
                                    // data={this.state.selectedDataRow}
                                    expanded={this.state.expanded}
                                    onExpandedChange={(
                                      newExpanded,
                                      index,
                                      event
                                    ) => {
                                      if (newExpanded[index[0]] === false) {
                                        newExpanded = {};
                                      } else {
                                        Object.keys(newExpanded).map(k => {
                                          newExpanded[k] =
                                            parseInt(k) === index[0]
                                              ? {}
                                              : false;
                                        });
                                      }
                                      this.setState({
                                        ...this.state,
                                        expanded: newExpanded
                                      });
                                    }}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "orderMasterID",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                              style={{ display: "none" }}
                                              name="AllOrder"
                                              checked={
                                                this.state.CheckBoxAllOrder[
                                                  row.original.orderMasterID
                                                ] === true
                                              }
                                              onChange={this.onCheckMasterAllChange.bind(
                                                this,
                                                row.original.orderMasterID,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.orderMasterID
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>Invoice Number</span>,
                                        accessor: "invoiceNumber"
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
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={false}
                                    SubComponent={row => {
                                      return (
                                        <div
                                          className="inner-custom-react-table"
                                          id="inner-custom-react-table"
                                        >
                                          <ReactTable
                                            data={this.state.OrderSubItem.filter(
                                              x =>
                                                x.orderMasterID ===
                                                row.original.orderMasterID
                                            )}
                                            columns={[
                                              {
                                                Header: <span></span>,
                                                accessor: "size",
                                                width: 20,
                                                Cell: row => (
                                                  <div className="filter-checkbox">
                                                    <input
                                                      type="checkbox"
                                                      id={
                                                        "item" +
                                                        row.original.orderItemID
                                                      }
                                                      style={{
                                                        display: "none"
                                                      }}
                                                      name="AllItem"
                                                      checked={
                                                        this.state
                                                          .CheckBoxAllItem[
                                                          row.original
                                                            .orderItemID
                                                        ] === true
                                                      }
                                                      onChange={this.checkIndividualItem.bind(
                                                        this,
                                                        row.original
                                                          .orderItemID,
                                                        row.original
                                                      )}
                                                    />
                                                    <label
                                                      htmlFor={
                                                        "item" +
                                                        row.original.orderItemID
                                                      }
                                                    >
                                                      {row.original.orderItemID}
                                                    </label>
                                                  </div>
                                                )
                                              },
                                              {
                                                Header: (
                                                  <span>Article Number</span>
                                                ),
                                                accessor: "orderItemID"
                                              },
                                              {
                                                Header: (
                                                  <span>Article Size</span>
                                                ),
                                                accessor: "size"
                                              },
                                              {
                                                Header: (
                                                  <span>Article MRP</span>
                                                ),
                                                accessor: "itemPrice"
                                              },
                                              {
                                                Header: <span>Price Paid</span>,
                                                accessor: "pricePaid"
                                              },
                                              {
                                                Header: <span>Discount</span>,
                                                accessor: "discount",
                                                sortable: true
                                              },
                                              {
                                                Header: (
                                                  <span>Required Size</span>
                                                ),
                                                accessor: "requireSize",
                                                Cell: row => {
                                                  // ////debugger;
                                                  return (
                                                    <div>
                                                      <input
                                                        type="text"
                                                        id={
                                                          "requireSizeTxt" +
                                                          row.original
                                                            .orderItemID
                                                        }
                                                        className="order-input"
                                                        value={
                                                          row.original
                                                            .requireSize || ""
                                                        }
                                                        name="requiredSize"
                                                        onChange={() => {
                                                          this.handleRequireSize(
                                                            this,
                                                            row
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                  );
                                                }
                                              }
                                            ]}
                                            defaultPageSize={5}
                                            showPagination={false}
                                            minRows={2}
                                          />
                                        </div>
                                      );
                                    }}
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

                        <a href={item.name} download>
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
                        </a>
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
                      <div
                        className="dropdown"
                        style={{ display: "inherit" }}
                      ></div>

                      <div className="dropdown" style={{ display: "inherit" }}>
                        <select
                          className="my-tic-email"
                          value={this.state.ticketSourceId}
                          onChange={this.handleTicketSourceChange}
                        >
                          <option value={2}>Email</option>
                          <option value={3}>Facebook</option>
                          <option value={5}> SMS</option>
                          <option value={1}>Call</option>
                        </select>
                      </div>

                      {/* <div className="dropdown" style={{ display: "inherit" }}>
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
                      </div> */}

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
                                  item.templateName,
                                  2
                                )}
                              >
                                {item.templateName}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="tic-det-ck-user myticlist-expand-sect">
                      <select
                        className="add-select-category"
                        value="0"
                        onChange={this.setAssignedToValue.bind(this, "rplyCmd")}
                      >
                        <option value="0">Users</option>
                        {this.state.AssignToData !== null &&
                          this.state.AssignToData.map((item, i) => (
                            <option key={i} value={item.userID}>
                              {item.fullName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="tic-det-ck-user myticlist-expand-sect placeholder-dropdown">
                      <select
                        className="add-select-category"
                        value="0"
                        onChange={this.setPlaceholderValue.bind(this)}
                      >
                        <option value="0">Placeholders</option>
                        {this.state.placeholderData !== null &&
                          this.state.placeholderData.map((item, i) => (
                            <option key={i} value={item.mailParameterID}>
                              {item.description}
                            </option>
                          ))}
                      </select>
                    </div>
                    <Card>
                      <CardBody>
                        <div className="my-tic-ck-height">
                          <CKEditor
                            data={this.state.mailBodyData}
                            onChange={this.onAddCKEditorChange}
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
                          <ul className="ck-edit-mar">
                            <li>
                              <label>
                                To: &nbsp;{ticketDetailsData.customerEmailId}
                              </label>
                            </li>
                            <li>
                              <label className="">
                                <div className="input-group">
                                  <span className="input-group-addon inputcc">
                                    CC:
                                  </span>
                                  <input
                                    type="text"
                                    className="CCdi1"
                                    name="userCC"
                                    autoComplete="off"
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
                                >
                                  <span className="input-group-addon inputcc">
                                    BCC:
                                  </span>
                                  <input
                                    type="text"
                                    className="CCdi1"
                                    name="userBCC"
                                    autoComplete="off"
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
                                onClick={this.handleSendMailData.bind(this, 2)}
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

                <Modal
                  open={this.state.hasAttachmentModal}
                  onClose={this.handleHasAttachmetModalClose.bind(this)}
                  modalId="thumb-modal-popup"
                  overlayId="logout-ovrlykb"
                >
                  <div>
                    <div className="close">
                      <img
                        src={CrossIcon}
                        alt="cross-icon"
                        onClick={this.handleHasAttachmetModalClose.bind(this)}
                      />
                    </div>
                    <div className="row my-3 mx-1">
                      {this.state.FinalAttachmentData !== null &&
                        this.state.FinalAttachmentData.map((item, k) => {
                          // ////debugger
                          return (
                            <div style={{ position: "relative" }} key={k}>
                              <div>
                                <img
                                  src={CircleCancel}
                                  alt="thumb"
                                  className="circleCancle"
                                  onClick={() => {
                                    this.handleRemoveImage(k);
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
                          );
                        })}
                    </div>
                  </div>
                </Modal>
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
                            Message:{" "}
                            {this.state.tabCounts.messages < 9
                              ? "0" + this.state.tabCounts.messages
                              : this.state.tabCounts.messages}
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
                <div className="tab-content p-0">
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
                    <div className="col-12 col-xs-12 col-sm-2 col-md-12 mob-flex">
                      <div className="inlineGridTicket">
                        <label
                          className="comment-text"
                          onClick={this.handleFreeTextCommentOpen.bind(this)}
                        >
                          Comment
                        </label>
                      </div>
                    </div>
                    {this.state.messageDetails !== null &&
                      this.state.messageDetails.map((item, i) => {
                        return (
                          <div key={i}>
                            <div className="row top-margin">
                              <div className="col-md-5">
                                <div className="v3"></div>
                              </div>
                              <div className="col-md-2">
                                <label className="today-02">
                                  {item.dayOfCreation}
                                  &nbsp; (
                                  {item.messageCount < 9
                                    ? "0" + item.messageCount
                                    : item.messageCount}
                                  )
                                </label>
                              </div>
                              <div className="col-md-5">
                                <div className="v4"></div>
                              </div>
                            </div>
                            {item.msgDetails !== null &&
                              item.msgDetails.map((details, j) => {
                                // debugger;
                                return (
                                  <div key={j}>
                                    <div>
                                      <div className="row top-margin">
                                        <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                                          <div
                                            className="d-flex"
                                            style={{ marginTop: "0" }}
                                          >
                                            {details.latestMessageDetails
                                              .isSystemGenerated === true ? (
                                              <img
                                                src={BlackUserIcon}
                                                alt="Avatar"
                                                className="oval-7"
                                              />
                                            ) : null}
                                            {details.latestMessageDetails
                                              .isCustomerComment === 1 ? (
                                              <img
                                                src={BlackUserIcon}
                                                alt="Avatar"
                                                className="oval-6"
                                              />
                                            ) : (
                                              <img
                                                src={Headphone2Img}
                                                alt="headphone"
                                                className="oval-55"
                                              />
                                            )}
                                            <div>
                                              <label
                                                className="solved-by-naman-r mt-0"
                                                style={{ marginLeft: "7px" }}
                                              >
                                                {
                                                  details.latestMessageDetails
                                                    .commentBy
                                                }
                                              </label>
                                              {details.latestMessageDetails
                                                .isReAssign === true ? (
                                                <label
                                                  style={{
                                                    display: "block",
                                                    marginLeft: "7px"
                                                  }}
                                                >
                                                  Reassign to &nbsp;
                                                  <span className="solved-by-naman-r">
                                                    {
                                                      details
                                                        .latestMessageDetails
                                                        .newAgentName
                                                    }
                                                  </span>
                                                </label>
                                              ) : null}
                                            </div>
                                            {details.latestMessageDetails
                                              .isInternalComment ===
                                            true ? null : (
                                              <img
                                                src={
                                                  details.latestMessageDetails
                                                    .ticketSourceName ===
                                                  "Calls"
                                                    ? require("./../assets/Images/headphone3.png")
                                                    : details
                                                        .latestMessageDetails
                                                        .ticketSourceName ===
                                                      "Facebook"
                                                    ? require("./../assets/Images/facebook.png")
                                                    : details
                                                        .latestMessageDetails
                                                        .ticketSourceName ===
                                                      "Mails"
                                                    ? require("./../assets/Images/SecuredLetter2.png")
                                                    : details
                                                        .latestMessageDetails
                                                        .ticketSourceName ===
                                                      "Twitter"
                                                    ? require("./../assets/Images/twitter.png")
                                                    : require("./../assets/Images/twitter.png")
                                                }
                                                alt="sourceIMG"
                                                className="smg-Img1 headPhone3 black-twitter"
                                              />
                                            )}
                                          </div>
                                        </div>
                                        <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                                          {details.latestMessageDetails
                                            .isInternalComment === true ? (
                                            <img
                                              src={commentImg}
                                              alt="comment"
                                              className="commentImg"
                                              style={{
                                                display: "inline-block"
                                              }}
                                            />
                                          ) : null}
                                          {/* --------------Show Attchement Icone on condition--------------- */}
                                          {details.latestMessageDetails
                                            .hasAttachment === 1 ? (
                                            <img
                                              src={ClipImg}
                                              alt="attechment"
                                              className="fileAttchImg"
                                              onClick={this.handleHasAttachmetModalOpen.bind(
                                                this,
                                                details.latestMessageDetails
                                                  .mailID
                                              )}
                                            />
                                          ) : null}
                                          {/* ----------------------------- */}

                                          <p
                                            className="label-5"
                                            style={{ display: "inline-block" }}
                                          >
                                            {/* {details.latestMessageDetails.ticketMailBody
                                              .replace(/<[^>]+>/g, "")
                                              .replace(/&nbsp;/gi, " ")} */}
                                            {ReactHtmlParser(
                                              details.latestMessageDetails
                                                .ticketMailBody
                                            )}
                                          </p>
                                        </div>

                                        <div className="col-12 col-xs-12 col-sm-2 col-md-2 mob-flex">
                                          {details.trailMessageDetails
                                            .length === 0 ? null : (
                                            <div>
                                              {this.state.collapseUp &&
                                              "i" +
                                                details.latestMessageDetails
                                                  .mailID ===
                                                this.state.collapseId ? (
                                                <img
                                                  src={Up1Img}
                                                  alt="up"
                                                  className="up-1"
                                                  onClick={this.handleUpClose.bind(
                                                    this,
                                                    "i" +
                                                      details
                                                        .latestMessageDetails
                                                        .mailID
                                                  )}
                                                  id={
                                                    "i" +
                                                    details.latestMessageDetails
                                                      .mailID
                                                  }
                                                />
                                              ) : (
                                                <img
                                                  src={Down1Img}
                                                  alt="up"
                                                  className="up-1"
                                                  onClick={this.handleUpOpen.bind(
                                                    this,
                                                    "i" +
                                                      details
                                                        .latestMessageDetails
                                                        .mailID
                                                  )}
                                                  id={
                                                    "i" +
                                                    details.latestMessageDetails
                                                      .mailID
                                                  }
                                                />
                                              )}
                                            </div>
                                          )}

                                          <div className="inlineGridTicket">
                                            {details.latestMessageDetails
                                              .isCustomerComment === 1 ? (
                                              <label
                                                className="reply-comment"
                                                onClick={this.hanldeCommentOpen2.bind(
                                                  this,
                                                  details.latestMessageDetails
                                                    .mailID
                                                )}
                                              >
                                                Reply
                                              </label>
                                            ) : null}

                                            <label
                                              className="comment-text"
                                              onClick={this.handleCommentCollapseOpen.bind(
                                                this,
                                                details.latestMessageDetails
                                                  .mailID
                                              )}
                                            >
                                              Comment
                                            </label>
                                          </div>
                                          <div
                                            className="row"
                                            style={{ width: "100%" }}
                                          >
                                            <div className="col-12 col-xs-12 col-sm-4 col-md-3"></div>
                                            <div className="col-12 col-xs-12 col-sm-8 col-md-9">
                                              <div className="commentcollapseTicket"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {details.trailMessageDetails.length ===
                                      0 ? null : (
                                        <div className="row card-op-out">
                                          <div className="col-12 col-xs-12 col-sm-4 col-md-3"></div>
                                          <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                                            <UncontrolledCollapse
                                              toggler={
                                                "#i" +
                                                details.latestMessageDetails
                                                  .mailID
                                              }
                                              // isOpen={this.state.collapseUp}
                                            >
                                              <Card>
                                                <CardBody>
                                                  {details.trailMessageDetails !==
                                                    null &&
                                                    details.trailMessageDetails.map(
                                                      function(MsgData, s) {
                                                        return (
                                                          <div
                                                            className="card-details"
                                                            key={s}
                                                          >
                                                            <div className="card-details-1">
                                                              <label
                                                                className="label-5"
                                                                style={{
                                                                  display:
                                                                    "block"
                                                                }}
                                                              >
                                                                {ReactHtmlParser(
                                                                  MsgData.ticketMailBody
                                                                )}
                                                                {/* {MsgData.ticketMailBody
                                                                  .replace(
                                                                    /<[^>]+>/g,
                                                                    ""
                                                                  )
                                                                  .replace(
                                                                    /&nbsp;/gi,
                                                                    " "
                                                                  )} */}
                                                              </label>
                                                            </div>
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  {details.trailMessageDetails
                                                    .length === 0 && (
                                                    <div className="card-details">
                                                      <div className="card-details-1">
                                                        <label className="i-have-solved-this-i">
                                                          {
                                                            details
                                                              .trailMessageDetails
                                                              .ticketMailSubject
                                                          }
                                                        </label>
                                                        <label
                                                          className="label-5"
                                                          style={{
                                                            display: "block"
                                                          }}
                                                        >
                                                          {ReactHtmlParser(
                                                            details
                                                              .trailMessageDetails
                                                              .ticketMailBody
                                                          )}
                                                          {/* {details.trailMessageDetails.ticketMailBody
                                                            .replace(
                                                              /<[^>]+>/g,
                                                              ""
                                                            )
                                                            .replace(
                                                              /&nbsp;/gi,
                                                              " "
                                                            )} */}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  )}
                                                </CardBody>
                                              </Card>
                                            </UncontrolledCollapse>
                                          </div>
                                          <div className="col-12 col-xs-12 col-sm-2"></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    <Modal
                      open={this.state.CommentCollapse}
                      onClose={this.handleCommentCollapseOpen.bind(this)}
                      closeIconId="sdsg"
                      modalId="Historical-popup"
                      overlayId="logout-ovrly"
                      classNames={{
                        modal: "historical-popup"
                      }}
                    >
                      <div className="commenttextborder">
                        <div className="comment-disp">
                          <div className="Commentlabel">
                            <label className="Commentlabel1">Comment</label>
                          </div>
                          <div className="tic-det-ck-user tic-det-Freecmd myticlist-expand-sect">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setAssignedToValue.bind(
                                this,
                                "comment"
                              )}
                            >
                              <option value="0">Users</option>
                              {this.state.AssignToData !== null &&
                                this.state.AssignToData.map((item, i) => (
                                  <option key={i} value={item.userID}>
                                    {item.fullName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            <img
                              src={CrossIcon}
                              alt="Minus"
                              className="pro-cross-icn m-0"
                              onClick={this.handleCommentCollapseClose.bind(
                                this
                              )}
                            />
                          </div>
                        </div>
                        <div className="commenttextmessage">
                          <textarea
                            cols="31"
                            rows="3"
                            className="ticketMSGCmt-textarea"
                            name="ticketcommentMSG"
                            maxLength={300}
                            value={this.state.ticketcommentMSG}
                            onChange={this.handleNoteOnChange}
                          ></textarea>
                        </div>
                        {this.state.ticketcommentMSG.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.tckcmtMSGCompulsory}
                          </p>
                        )}
                        <div className="SendCommentBtn">
                          <button
                            className="SendCommentBtn1"
                            onClick={this.handleSendMailData.bind(this, 3)}
                          >
                            SEND
                          </button>
                        </div>
                      </div>
                    </Modal>
                    <Modal
                      open={this.state.CommentCollapse2}
                      onClose={this.hanldeCommentClose2.bind(this)}
                      closeIconId="sdsg"
                      modalId="Historical-popup"
                      overlayId="logout-ovrly"
                      classNames={{ modal: "historical-popup" }}
                    >
                      <div className="col-12" style={{ marginTop: "5px" }}>
                        <div className="mask1">
                          <div className="mail-mask">
                            <div
                              className="dropdown"
                              style={{ display: "inherit" }}
                            >
                              <select
                                className="my-tic-email"
                                value={this.state.ReplySourceId}
                                onChange={this.handleReplyTcktSourceChange}
                              >
                                <option value={2}>Email</option>
                                <option value={3}>Facebook</option>
                                <option value={5}> SMS</option>
                                <option value={1}>Call</option>
                              </select>
                            </div>
                            {/* <div
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
                            </div> */}
                            <div className="my-ticket-temp">
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
                                  onClick={this.handleTemplateBindByIssueType.bind(
                                    this,
                                    1
                                  )}
                                >
                                  <FontAwesomeIcon icon={faCalculator} />
                                  Template
                                </button>
                                <ul className="dropdown-menu">
                                  {this.state.ReplyCKEditoertemplat !== null &&
                                    this.state.ReplyCKEditoertemplat.map(
                                      (item, i) => (
                                        <li key={i} value={item.templateID}>
                                          <span
                                            onClick={this.handleCkEditorTemplateData.bind(
                                              this,
                                              item.templateID,
                                              item.templateName,
                                              1
                                            )}
                                          >
                                            {item.templateName}
                                          </span>
                                        </li>
                                      )
                                    )}
                                </ul>
                              </div>
                            </div>
                            <div className="mob-float my-tic-mob-float">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={this.hanldeCommentClose2.bind(this)}
                              >
                                <img
                                  src={CrossIcon}
                                  alt="Minus"
                                  className="pro-cross-img"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 my-tic-ckeditor">
                        <CKEditor
                          id="ckeditor1"
                          data={this.state.replymailBodyData}
                          onChange={this.onreplyCKEditorChange}
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
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="custRply"
                                    name="filter-type"
                                    style={{ display: "none" }}
                                    onChange={() => this.showInformStoreReply()}
                                  />
                                  <label
                                    htmlFor="custRply"
                                    style={{ paddingLeft: "25px" }}
                                  >
                                    <span>Inform Store</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <span>
                                  <input
                                    id="Rplyfile"
                                    className="file-upload1 d-none"
                                    type="file"
                                    name="Rplyfile"
                                    onChange={this.handleReplyFileUpload.bind(
                                      this
                                    )}
                                    multiple
                                  />
                                  <label
                                    htmlFor="Rplyfile"
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
                                  {this.state.ReplyfileText} files
                                </label>
                              </li>
                              <li className="w-100"></li>
                              <li>
                                <label className="">
                                  <div className="input-group">
                                    <span className="input-group-addon inputcc">
                                      CC:
                                    </span>
                                    <input
                                      type="text"
                                      className="CCdi1"
                                      name="userCC"
                                      autoComplete="off"
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
                                  <div className="input-group">
                                    <span className="input-group-addon inputcc">
                                      BCC:
                                    </span>
                                    <input
                                      type="text"
                                      className="CCdi"
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

                              {/* <li style={{ float: "right" }}>
                              <button
                                className="send"
                                type="button"
                                onClick={this.handleSendMailData.bind(this, 1)}
                              >
                                Send
                              </button>
                            </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <button
                        className="send my-tic-send"
                        type="button"
                        onClick={this.handleSendMailData.bind(this, 1)}
                      >
                        Send
                      </button>
                    </Modal>
                    <Modal
                      open={this.state.FreeTextComment}
                      onClose={this.handleFreeTextCommentOpen.bind(this)}
                      closeIconId="sdsg"
                      modalId="Historical-popup"
                      overlayId="logout-ovrly"
                      classNames={{
                        modal: "historical-popup"
                      }}
                    >
                      <div className="commenttextborder">
                        <div className="comment-disp">
                          <div className="Commentlabel">
                            <label className="Commentlabel1">Comment</label>
                          </div>
                          <div className="tic-det-ck-user tic-det-Freecmd myticlist-expand-sect">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setAssignedToValue.bind(
                                this,
                                "freeCmd"
                              )}
                            >
                              <option value="0">Users</option>
                              {this.state.AssignToData !== null &&
                                this.state.AssignToData.map((item, i) => (
                                  <option key={i} value={item.userID}>
                                    {item.fullName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            <img
                              src={CrossIcon}
                              alt="Minus"
                              className="pro-cross-icn m-0"
                              onClick={this.handleFreeTextCommentOpen.bind(
                                this,
                                "close"
                              )}
                            />
                          </div>
                        </div>
                        <div className="commenttextmessage">
                          <textarea
                            cols="31"
                            rows="3"
                            className="ticketMSGCmt-textarea"
                            name="ticketFreeTextcomment"
                            maxLength={300}
                            value={this.state.ticketFreeTextcomment}
                            onChange={this.handleNoteOnChange}
                          ></textarea>
                        </div>
                        {this.state.ticketFreeTextcomment.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.freetextCommentCompulsory}
                          </p>
                        )}
                        <div className="SendCommentBtn">
                          <button
                            className="SendCommentBtn1"
                            onClick={this.handleSendMailData.bind(this)}
                          >
                            SEND
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="Task-tab"
                    role="tabpanel"
                    aria-labelledby="Task-tab"
                  >
                    {this.state.ticket_Id > 0 ? (
                      <MyTicketTask
                        callbackToParent={this.callbackToParent}
                        taskData={{
                          TicketData: {
                            TicketId: this.state.ticket_Id,
                            // GridData: this.state.taskTableGrid,
                            TabActiveId: this.state.TaskTab
                          }
                        }}
                        // callBackTaskLenght={this.handleGetCountOfTabs(this.state.ticket_Id)}
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
                      <div className="col-12 col-xs-12 col-sm-4">
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

                      <div className="col-12 col-xs-12 col-sm-8 my-ticket-notes">
                        {this.state.Notesdetails !== null &&
                          this.state.Notesdetails.map((item, i) => (
                            <div className="row my-ticket-notes-row" key={i}>
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

            <div className="row d-none" style={{ margin: "0" }}>
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
export default withRouter(MyTicket);
