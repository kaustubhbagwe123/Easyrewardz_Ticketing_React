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
import Down1Img from "./../assets/Images/down-1.png";
import PlusImg from "./../assets/Images/plus.png";
import MinusImg from "./../assets/Images/minus.png";
import Up1Img from "./../assets/Images/up-1.png";
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
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import Ticket from "./../assets/Images/TicketGrey.png";
import MoreUp from "./../assets/Images/table-arr-up.png";
import CancelImgGrey from "./../assets/Images/CancelGrey.png";
import Order from "./../assets/Images/order.png";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import config from "./../helpers/config";
import { NotificationManager } from "react-notifications";
import TicketStatus from "./MyTicketStatus";
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
import { withRouter } from "react-router";
import ReactHtmlParser from "react-html-parser";
import Demo from "../store/Hashtag";
import { MyContext } from '../context'

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
      // selectedProduct: [],
      tempName: "",
      selectTicketTemplateId: 0,
      mailBodyData: "",
      replymailBodyData: "",
      SearchStore: "",
      custID: 0,
      loading: false,
      Plus: false,
      selectedStoreData: [],
      // selectedDataRow: [],
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
      role_Name: "",
      logInEmail: "",
      userEmailID: "",
      statusValidate: false,
      KnowledgeBaseModal: false,
      isaddKnowledge: false,
      ckCusrsorPosition: 0,
      ckCusrsorData: "",
      ckCusrsorPositionReply: 0,
      ckCusrsorDataReply: "",
      notiCountCmnt: 0,
      notiCurPosiCmnt: 0,
      notiCountFreeCmnt: 0,
      notiCurPosiFreeCmnt: 0,
      isKB: false,
      selectedInvoiceNo: "",
      isSystemGenerated: false
    };
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
    this.setWrapperRef = this.setWrapperRef.bind(this);
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
    this.handleGetEmailAdd = this.handleGetEmailAdd.bind(this);
    this.handleAddKnwoldgeBase = this.handleAddKnwoldgeBase.bind(this);
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
    ////
    debugger;
    if (this.props.location.ticketDetailID) {
      var ticketId = this.props.location.ticketDetailID;
      var isKB = false;
      if (this.props.location.isKB) {
        isKB = true;
      }

      this.setState({ HistOrderShow: true, ticket_Id: ticketId, isKB });
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
      this.handleGetEmailAdd();
    } else {
      this.props.history.push("myTicketlist");
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  onAddCKEditorChange = evt => {
    var newContent = evt.editor.getData();
    this.setState({
      mailBodyData: newContent
    });
  };
  onCkBlur = evt => {
    debugger;
    var ckCusrsorPosition = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorData = evt.editor.getSelection().getRanges()[0].endContainer.$
      .wholeText;
    if (!ckCusrsorData) {
      ckCusrsorData = "";
    }
    this.setState({
      ckCusrsorPosition: ckCusrsorPosition.startOffset,
      ckCusrsorData
    });
  };
  onCkBlurReply = evt => {
    debugger;
    var ckCusrsorPositionReply = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataReply = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataReply) {
      ckCusrsorDataReply = "";
    }
    this.setState({
      ckCusrsorPositionReply: ckCusrsorPositionReply.startOffset,
      ckCusrsorDataReply
    });
  };
  onreplyCKEditorChange = evt => {
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
        debugger;
        let status = res.data.status;
        if (status) {
          self.setState({
            followUpIds: ""
          });
        }
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
          // var rolename_ = data.roleName;
          var userEmailID = data.userEmailID;
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
            userEmailID,
            ticketDetailsData: data,
            custID: customer_Id,
            selectetedParameters,
            StoreName: Storedetails,
            ProductName: ProductDetails,
            mailFiled: MailDetails,
            fileDummy: attachementDetails,
            oldAgentId: AgentId,
            // role_Name: rolename_,
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
    ////
    for (let i = 0; i < this.state.fileDummy.length; i++) {
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
    ////
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
        let data = res.data.responseData;
        self.setState({
          SearchAssignData: data
        });
      })
      .catch(data => {
        console.log(data);
      });
  }

  setNotiCurPosiCmnt = e => {
    debugger;
    this.setState({
      notiCurPosiCmnt: e.target.selectionStart
    });
  };
  setNotiCurPosiFreeCmnt = e => {
    debugger;
    this.setState({
      notiCurPosiFreeCmnt: e.target.selectionStart
    });
  };

  handleUpdateTicketStatus(ticStaId) {
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
        ////
        let status = res.data.status;
        if (status === true) {
          if (ticStaId === 103) {
            NotificationManager.success("The ticket has been resolved.");
          } else if (ticStaId === 104) {
            NotificationManager.success("The ticket has been closed.");
          }
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  ////Handle Get all messages
  handleGetMessageDetails(ticketId) {
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

          var isSystemGenerated =
            data[0].msgDetails[0].latestMessageDetails.isSystemGenerated;
          self.setState({
            isSystemGenerated,
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
    //
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
    ////
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
        debugger;
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
        debugger;
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          const newSelected = Object.assign({}, self.state.CheckOrderID);

          var OrderSubItem = [];
          var selectedRow = [];

          var CselectedRow = [];
          for (let i = 0; i < data.length; i++) {
            var selectedInvoiceNo = data[i].invoiceNumber;
            if (data[i].invoiceNumber) {
              newSelected[data[i].invoiceNumber] = !self.state.CheckOrderID[
                data[i].invoiceNumber
              ];
              selectedRow.push(data[i]);
              self.setState({
                CheckOrderID: data[i].invoiceNumber ? newSelected : false
              });
            }
            if (data[i].orderItems.length > 0) {
              var OrderSubItem = data[i].orderItems;
              self.setState({
                OrderSubItem
              });
              var Order_Master = self.state.OrderSubItem.filter(
                x => x.invoiceNumber === data[i].invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].articleNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem
                });
              }
            }
          }

          self.setState({
            SelectedAllOrder: data,
            OrderSubItem,
            selectedInvoiceNo
          });
        } else {
          self.setState({
            SelectedAllOrder: []
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
      let textBefore = this.state.ticketFreeTextcomment.substring(
        0,
        this.state.notiCurPosiFreeCmnt
      );
      let textAfter = this.state.ticketFreeTextcomment.substring(
        this.state.notiCurPosiFreeCmnt,
        this.state.notiCountFreeCmnt
      );
      // let text = this.state.ticketFreeTextcomment;
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID === e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      // text += "@" + userName;
      let text = textBefore + " @" + userName + textAfter;
      let notiCurPosiFreeCmnt = textBefore.length + userName.length + 2;
      let notiCountFreeCmnt =
        textBefore.length + userName.length + 2 + textAfter.length;
      this.setState({
        ticketFreeTextcomment: text,
        followUpIds,
        notiCurPosiFreeCmnt,
        notiCountFreeCmnt
      });
    } else if (check === "comment") {
      let followUpIds = this.state.followUpIds;
      let assign = e.currentTarget.value;
      followUpIds += assign + ",";
      let textBefore = this.state.ticketcommentMSG.substring(
        0,
        this.state.notiCurPosiCmnt
      );
      let textAfter = this.state.ticketcommentMSG.substring(
        this.state.notiCurPosiCmnt,
        this.state.notiCountCmnt
      );
      // let text = this.state.ticketcommentMSG;
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID === e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      // text += "@" + userName;
      let text = textBefore + " @" + userName + textAfter;
      let notiCurPosiCmnt = textBefore.length + userName.length + 2;
      let notiCountCmnt =
        textBefore.length + userName.length + 2 + textAfter.length;
      this.setState({
        ticketcommentMSG: text,
        followUpIds,
        notiCurPosiCmnt,
        notiCountCmnt
      });
    } else if (check === "rply") {
      let followUpIds = this.state.followUpIds;
      let assign = e.currentTarget.value;
      followUpIds += assign + ",";
      let text = this.state.replymailBodyData;
      let ckDataArr = text.split("\n\n");
      let ckDataArrNew = [];
      for (let i = 0; i < ckDataArr.length; i++) {
        const element1 = ckDataArr[i].replace(/<[^>]+>/g, "");
        const element2 = element1.replace(/&nbsp;/g, " ");
        const element = element2.replace(/\n/g, " ");
        ckDataArrNew.push(element);
      }
      let selectedVal = "",
        loopFlag = true,
        ckTags,
        selectedArr;
      for (let i = 0; i < ckDataArrNew.length; i++) {
        if (loopFlag) {
          if (this.state.ckCusrsorDataReply.trim() === ckDataArrNew[i].trim()) {
            selectedVal = ckDataArrNew[i];
            selectedArr = i;
            ckTags = ckDataArr[i].match(/<[^>]+>/g);
            loopFlag = false;
          }
        }
      }
      let ckDataArrLast = selectedVal;
      let textBefore = ckDataArrLast.substring(
        0,
        this.state.ckCusrsorPositionReply
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionReply,
        ckDataArrLast.length
      );
      // let ckDataArrLast = ckDataArr.pop();
      // let ckTags = ckDataArrLast.match(/<[^>]+>/g);
      // let ck = ckDataArrLast.replace(/<[^>]+>/g, "");
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID === e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      // ck += "@" + userName;
      ckDataArrLast = textBefore + " @" + userName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionReply + userName.length + 2;
      this.setState({
        ckCusrsorPositionReply: newCkCusrsorPosition,
        ckCusrsorDataReply: ckDataArrLast
      });
      if (ckTags) {
        // let ckFinal = ckTags[0] + ck + ckTags[1];
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        // ckDataArr.push(ckFinal);
        ckDataArr.splice(selectedArr, 1, ckFinal);
        text = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ replymailBodyData: text, followUpIds });
      } else {
        this.setState({ replymailBodyData: ckDataArrLast, followUpIds });
      }
    } else {
      let followUpIds = this.state.followUpIds;
      let assign = e.currentTarget.value;
      followUpIds += assign + ",";
      let ckData = this.state.mailBodyData;
      let ckDataArr = ckData.split("\n\n");
      let ckDataArrNew = [];
      for (let i = 0; i < ckDataArr.length; i++) {
        const element1 = ckDataArr[i].replace(/<[^>]+>/g, "");
        const element2 = element1.replace(/&nbsp;/g, " ");
        const element = element2.replace(/\n/g, " ");
        ckDataArrNew.push(element);
      }
      let selectedVal = "",
        loopFlag = true,
        ckTags,
        selectedArr;
      for (let i = 0; i < ckDataArrNew.length; i++) {
        if (loopFlag) {
          if (this.state.ckCusrsorData.trim() === ckDataArrNew[i].trim()) {
            selectedVal = ckDataArrNew[i];
            selectedArr = i;
            ckTags = ckDataArr[i].match(/<[^>]+>/g);
            loopFlag = false;
          }
        }
      }
      let ckDataArrLast = selectedVal;
      let textBefore = ckDataArrLast.substring(0, this.state.ckCusrsorPosition);
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPosition,
        ckDataArrLast.length
      );
      // let ckDataArrLast = ckDataArr.pop();
      // let ckTags = ckDataArrLast.match(/<[^>]+>/g);
      // let ck = ckDataArrLast.replace(/<[^>]+>/g, "");
      let matchedArr = this.state.AssignToData.filter(
        x => x.userID === e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      // ck += "@" + userName;
      ckDataArrLast = textBefore + " @" + userName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPosition + userName.length + 2;
      this.setState({
        ckCusrsorPosition: newCkCusrsorPosition,
        ckCusrsorData: ckDataArrLast
      });
      if (ckTags) {
        // let ckFinal = ckTags[0] + ck + ckTags[1];
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        // ckDataArr.push(ckFinal);
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ mailBodyData: ckData, followUpIds });
      } else {
        this.setState({ mailBodyData: ckDataArrLast, followUpIds });
      }
    }
  }
  setPlaceholderValue(e) {
    let ckData = this.state.mailBodyData;
    let ckDataArr = ckData.split("\n\n");
    let ckDataArrNew = [];
    for (let i = 0; i < ckDataArr.length; i++) {
      const element1 = ckDataArr[i].replace(/<[^>]+>/g, "");
      const element2 = element1.replace(/&nbsp;/g, " ");
      const element = element2.replace(/\n/g, " ");
      ckDataArrNew.push(element);
    }
    let selectedVal = "",
      loopFlag = true,
      ckTags,
      selectedArr;
    for (let i = 0; i < ckDataArrNew.length; i++) {
      if (loopFlag) {
        if (this.state.ckCusrsorData.trim() === ckDataArrNew[i].trim()) {
          selectedVal = ckDataArrNew[i];
          selectedArr = i;
          ckTags = ckDataArr[i].match(/<[^>]+>/g);
          loopFlag = false;
        }
      }
    }
    let ckDataArrLast = selectedVal;
    let textBefore = ckDataArrLast.substring(0, this.state.ckCusrsorPosition);
    let textAfter = ckDataArrLast.substring(
      this.state.ckCusrsorPosition,
      ckDataArrLast.length
    );
    // let ckDataArrLast = ckDataArr.pop();
    // let ckTags = ckDataArrLast.match(/<[^>]+>/g);
    // let ck = ckDataArrLast.replace(/<[^>]+>/g, "");
    let matchedArr = this.state.placeholderData.filter(
      x => x.mailParameterID === e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    // ck += placeholderName;
    ckDataArrLast = textBefore + " " + placeholderName + textAfter;
    let newCkCusrsorPosition =
      this.state.ckCusrsorPosition + placeholderName.length + 1;
    this.setState({
      ckCusrsorPosition: newCkCusrsorPosition,
      ckCusrsorData: ckDataArrLast
    });
    if (ckTags) {
      // let ckFinal = ckTags[0] + ck + ckTags[1];
      let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
      // ckDataArr.push(ckFinal);
      ckDataArr.splice(selectedArr, 1, ckFinal);
      ckData = ckDataArr.join(" ");
    }
    if (ckTags) {
      this.setState({ mailBodyData: ckData });
    } else {
      this.setState({ mailBodyData: ckDataArrLast });
    }
  }
  handleGetStoreDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/SearchStoreDetail",
      headers: authHeader(),
      params: {
        SearchText: this.state.SearchStore
      }
    })
      .then(function(res) {
        debugger;
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
    ////
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
    debugger;
    if (this.state.statusValidate) {
      let self = this;
      this.setState({ KnowledgeBaseModal: false });
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
          let status = res.data.message;
          if (status === "Success") {
            if (self.state.isaddKnowledge) {
              self.handleAddKnwoldgeBase();
            } else {
              NotificationManager.success("Ticket updated successfully.");
              self.props.history.push("myTicketlist");
            }
          } else {
            NotificationManager.error("Ticket not update");
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Unauthorized Access!");
    }
  }
  handleRequireSize(e, rowData) {
    debugger;
    var id = rowData.original.articleNumber;
    var value = document.getElementById("requireSizeTxt" + id).value;
    var reg = /^[0-9\b]+$/;

    if (value === "" || reg.test(value)) {
      var index = this.state.OrderSubItem.findIndex(
        x => x.articleNumber === rowData.original.articleNumber
      );

      var OrderSubItem = this.state.OrderSubItem;
      OrderSubItem[index].requireSize = value;

      this.setState({ OrderSubItem });
      this.searchInput.focus();
    } else {
      NotificationManager.error("Only numeric value allow.");
    }

    // var index = this.state.OrderSubItem.findIndex(
    //   x => x.articleNumber === rowData.original.articleNumber
    // );

    // var OrderSubItem = this.state.OrderSubItem;
    // OrderSubItem[index].requireSize = value;

    // this.setState({ OrderSubItem });
  }
  handleOrderSearchData() {
    debugger;
    let self = this;
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
        debugger;
        let Msg = res.data.message;
        let mainData = res.data.responseData;

        var OrderSubItem = [];

        for (let i = 0; i < mainData.length; i++) {
          if (mainData[i].invoiceNumber.length > 0) {
            for (let j = 0; j < mainData[i].invoiceNumber.length; j++) {
              OrderSubItem.push(mainData[i].invoiceNumber[j]);
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
  }

  handleNoteOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name === "ticketcommentMSG") {
      this.setState({
        notiCountCmnt: e.target.value.length,
        notiCurPosiCmnt: e.target.value.length
      });
    }
    if (e.target.name === "ticketFreeTextcomment") {
      this.setState({
        notiCountFreeCmnt: e.target.value.length,
        notiCurPosiFreeCmnt: e.target.value.length
      });
    }
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
    ////
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
    ////
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(res) {
        ////
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
        ////
        // let status=
        let data = res.data;
        self.setState({ CategoryData: data });
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetTicketPriorityList() {
    ////
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    })
      .then(function(res) {
        ////
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
        ////
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
        ////
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
        ////
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
        ////
        let messageData = res.data.message;
        if (messageData === "Success") {
          NotificationManager.success("Tickets assigned successfully.");
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
    this.setState({
      OrderTable: false,
      SearchStore: "",
      OrdItmBtnStatus: false
    });
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
    this.setState(state => ({
      CommentCollapse: !state.CommentCollapse,
      mailId: Mail_Id
    }));
  }
  handleCommentCollapseClose() {
    this.setState({ CommentCollapse: false, ticketcommentMSG: "" });
  }
  hanldeCommentOpen2(Mail_Id) {
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
    debugger;
    this.setState({ BillInvoiceModal: !this.state.BillInvoiceModal });
  }
  handleThumbModalOpen() {
    this.setState({ Plus: true });
  }
  handleThumbModalClose() {
    this.setState({ Plus: false });
  }
  handleHasAttachmetModalOpen(msgID) {
    ////
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
    ////
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
          ////
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
    ////
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
        ////
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
    debugger;
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
      var visitDate = "";
      if (
        this.state.selectedStoreData[j]["storeVisitDate"] === null ||
        this.state.selectedStoreData[j]["storeVisitDate"] === undefined ||
        this.state.selectedStoreData[j]["storeVisitDate"] === ""
      ) {
        visitDate = "";
      } else {
        visitDate = moment(
          this.state.selectedStoreData[j]["storeVisitDate"]
        ).format("YYYY-MM-DD");
      }

      selectedStore +=
        this.state.selectedStoreData[j]["storeID"] +
        "|" +
        visitDate +
        "|" +
        PurposeID +
        ",";
    }

    const formData = new FormData();

    //// -------------------Store attachment Code start---------------
    var store_Details = [];
    for (let k = 0; k < this.state.selectedStoreData.length; k++) {
      var storeData = {};

      ///check purpose id
      var PurposeID = this.state.selectedStoreData[k]["Purpose_Id"];

      if (PurposeID === "0") {
        // Send Purpose Id as 1 and 2 from API
        PurposeID = 1;
      } else {
        PurposeID = 2;
      }

      var visitDate = "";
      if (
        this.state.selectedStoreData[k]["storeVisitDate"] === null ||
        this.state.selectedStoreData[k]["storeVisitDate"] === undefined ||
        this.state.selectedStoreData[k]["storeVisitDate"] === ""
      ) {
        visitDate = "";
      } else {
        visitDate = moment(
          this.state.selectedStoreData[k]["storeVisitDate"]
        ).format("YYYY-MM-DD");
      }

      storeData["StoreID"] = this.state.selectedStoreData[k]["storeID"];
      storeData["BrandID"] = this.state.selectedStoreData[k]["brandID"];
      storeData["CityID"] = this.state.selectedStoreData[k]["cityID"];
      storeData["StateID"] = this.state.selectedStoreData[k]["stateID"];
      storeData["PincodeID"] = this.state.selectedStoreData[k]["pincodeID"];
      storeData["StoreName"] = this.state.selectedStoreData[k]["storeName"];
      storeData["Address"] = this.state.selectedStoreData[k]["address"];
      storeData["StoreCode"] = this.state.selectedStoreData[k]["storeCode"];
      storeData["RegionID"] = this.state.selectedStoreData[k]["regionID"];
      storeData["ZoneID"] = this.state.selectedStoreData[k]["zoneID"];
      storeData["StoreTypeID"] = this.state.selectedStoreData[k]["storeTypeID"];
      storeData["StoreEmailID"] = this.state.selectedStoreData[k][
        "storeEmailID"
      ];
      storeData["StorePhoneNo"] = this.state.selectedStoreData[k][
        "storePhoneNo"
      ];
      storeData["StoreVisitDate"] = visitDate;
      storeData["Purpose"] = PurposeID;
      storeData["Pincode"] = this.state.selectedStoreData[k]["pincode"];
      storeData["BrandIDs"] = this.state.selectetedParameters.brandID;

      store_Details.push(storeData);
    }
    //// -------------------Store attachment Code end-----------------
    formData.append("storeDetails", JSON.stringify(store_Details));
    formData.append(
      "StoreId",
      selectedStore.substring(",", selectedStore.length - 1)
    );
    formData.append("TicketId", this.state.ticket_Id);

    axios({
      method: "post",
      url: config.apiUrl + "/Store/attachstore",
      headers: authHeader(),
      data: formData
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Store attached successfully.");
          self.HandleStoreModalClose();
          self.handleGetTicketDetails(self.state.ticket_Id);
          self.setState({
            storeDetails:[]
          })
        } else {
          NotificationManager.error("Store not attached");
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleAttachProductData() {
    debugger;
    let self = this;
    if (this.state.SelectedAllOrder.length > 0) {
      for (let k = 0; k < this.state.SelectedAllOrder.length; k++) {
        if (this.state.SelectedAllOrder[k].orderItems) {
          for (
            let i = 0;
            i < this.state.SelectedAllOrder[k].orderItems.length;
            i++
          ) {
            if (
              this.state.SelectedAllOrder[k].orderItems[i].orderItemID !== 0
            ) {
              var selectedRow = "";
              for (
                let i = 0;
                i < this.state.SelectedAllOrder[k].orderItems.length;
                i++
              ) {
                selectedRow +=
                  this.state.SelectedAllOrder[k].orderItems[i]["orderItemID"] +
                  "|" +
                  this.state.SelectedAllOrder[k].orderItems[i]["requireSize"] +
                  "|0,";
              }
            }
          }
        } else {
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
        }
      }
      //
      const formData = new FormData();

      /// For Attached order
      if (this.state.SelectedAllOrder.length > 0) {
        var order_data = this.state.SelectedAllOrder[0];
        var OrderData = {
          OrderMasterID: order_data.orderMasterID,
          OrderNumber: order_data.invoiceNumber,
          InvoiceDate: order_data.invoiceDate,
          OrderPrice: order_data.ordeItemPrice,
          PricePaid: order_data.orderPricePaid,
          CustomerID: this.state.custID,
          Discount: order_data.discount,
          StoreCode: order_data.storeCode,
          TransactionDate: order_data.invoiceDate,
          ModeOfPaymentID: 1,
          TicketSourceID: this.state.selectetedParameters.channelOfPurchaseID
        };
      } else {
        var OrderData = null;
      }

      /// For Attached OrderItem data
      var order_itemData = [];
      for (let i = 0; i < this.state.SelectedAllItem.length; i++) {
        var item_data = {};
        item_data["OrderItemID"] = this.state.SelectedAllItem[i]["orderItemID"];
        item_data["OrderMasterID"] = this.state.SelectedAllItem[i][
          "orderMasterID"
        ];
        item_data["ItemName"] = this.state.SelectedAllItem[i]["itemName"];
        item_data["InvoiceNumber"] = this.state.SelectedAllItem[i][
          "invoiceNumber"
        ];
        item_data["InvoiceDate"] = this.state.SelectedAllItem[i]["invoiceDate"];
        item_data["ItemCount"] = this.state.SelectedAllItem[i]["itemCount"];
        item_data["ItemPrice"] = this.state.SelectedAllItem[i]["itemPrice"];
        item_data["PricePaid"] = this.state.SelectedAllItem[i]["pricePaid"];
        item_data["Size"] = this.state.SelectedAllItem[i]["size"];
        item_data["RequireSize"] = this.state.SelectedAllItem[i]["requireSize"];
        item_data["Discount"] = this.state.SelectedAllItem[i]["discount"];
        item_data["ArticleNumber"] = this.state.SelectedAllItem[i][
          "articleNumber"
        ];
        item_data["ArticleName"] = this.state.SelectedAllItem[i]["itemName"];

        order_itemData.push(item_data);
      }

      formData.append("orderDetails", JSON.stringify(OrderData));
      formData.append("orderItemDetails", JSON.stringify(order_itemData));
      formData.append(
        "OrderID",
        selectedRow.substring(",", selectedRow.length - 1)
      );
      formData.append("TicketId", this.state.ticket_Id);
      axios({
        method: "post",
        url: config.apiUrl + "/Order/attachorder",
        headers: authHeader(),
        data: formData
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          // let details = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("Product attached successfully.");
            self.handleOrderTableClose();
            self.handleGetTicketDetails(self.state.ticket_Id);
            self.setState({
              SelectedAllOrder: [],
              orderDetailsData: []
            });
          } else {
            NotificationManager.error("Product not attached");
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Please select atleast one order.");
    }
  }
  handleGetNotesTabDetails(ticket_Id) {
    ////
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
        ////
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
    ////
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
        ////
        let KbPopupData = res.data.responseData;
        if (KbPopupData.length === 0 || KbPopupData === null) {
          NotificationManager.error("No Record Found.");
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
    ////
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
        ////
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
    ////
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
          ////
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
          ////
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
    let self = this;
    // var str = this.state.mailBodyData;
    // var stringBody = str.replace(/<\/?p[^>]*>/g, "");
    // var finalText = stringBody.replace(/[&]nbsp[;]/g, " ");

    if (isSend === 1) {
      if (this.state.replymailBodyData.length > 0) {
        // var str = this.state.replymailBodyData;
        // var stringBody = str.replace(/<\/?p[^>]*>/g, "");
        // var ReplyText = stringBody.replace(/[&]nbsp[;]/g, " ");

        if (this.state.InformStore === true) {
          var selectedStore = "";

          for (let i = 0; i < this.state.selectedStoreData.length; i++) {
            selectedStore += this.state.selectedStoreData[i]["storeID"] + ",";
          }
        } else {
          selectedStore = "";
        }
        const formData = new FormData();
        var paramMessageData = {
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
        formData.append("ticketingMailerQue", JSON.stringify(paramMessageData));
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
            ////
            let status = res.data.message;
            if (status === "Success") {
              self.handleTicketAssignFollowUp();
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.hanldeCommentClose2();
              NotificationManager.success("Mail send successfully.");
              self.setState({
                mailFiled: {},
                ReplyFileData: [],
                ReplyfileText: 0,
                replymailBodyData: ""
              });
            } else {
              NotificationManager.error(status);
            }
          })
          .catch(data => {
            console.log(data);
          });
      } else {
        NotificationManager.error("Please Enter Body Section.");
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
            store_Id = "";
          }
          const formData = new FormData();
          var paramData2 = {
            TicketID: this.state.ticket_Id,
            ToEmail: this.state.ticketDetailsData.customerEmailId,
            UserCC: this.state.mailFiled.userCC,
            UserBCC: this.state.mailFiled.userBCC,
            TikcketMailSubject: this.state.ticketDetailsData.ticketTitle,
            TicketMailBody: this.state.mailBodyData,
            IsInformToStore: this.state.ReplyInformStore,
            TicketSource: this.state.ticketSourceId, // Send ticket source id
            IsSent: 0,
            IsCustomerComment: 0,
            // IsCustomerComment: 1,
            IsResponseToCustomer: 1,
            MailID: 0,
            StoreID: store_Id.substring(",", store_Id.length - 1)
          };
          formData.append("ticketingMailerQue", JSON.stringify(paramData2));
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
              ////
              let status = res.data.message;
              if (status === "Success") {
                self.handleGetMessageDetails(self.state.ticket_Id);
                self.handleGetCountOfTabs(self.state.ticket_Id);
                self.handleGetTicketDetails(self.state.ticket_Id);
                self.handleProgressBarDetails(self.state.ticket_Id);
                self.handleTicketAssignFollowUp();
                self.HandleEmailCollapseOpen();
                NotificationManager.success("Mail send successfully.");
                self.setState({
                  mailFiled: {},
                  // mailSubject: "",
                  mailBodyData: ""
                });
              } else {
                NotificationManager.error(status);
              }
            })
            .catch(data => {
              console.log(data);
            });
        } else {
          NotificationManager.error("Please Enter Body Section.");
        }
      } else {
        NotificationManager.error("Only 2000 Charater Allow In Body Section.");
      }
    } else if (isSend === 3) {
      // ----------------IsCustomerCommet Comment modal Call api ------------------
      if (this.state.ticketcommentMSG.length > 0) {
        const formData = new FormData();
        var paramData3 = {
          TicketID: this.state.ticket_Id,
          TicketMailBody: this.state.ticketcommentMSG.trim(),
          IsSent: 1,
          IsCustomerComment: 0,
          IsInternalComment: 1,
          MailID: this.state.mailId
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData3));

        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success("Comment Added successfully.");
              self.handleTicketAssignFollowUp();
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.handleCommentCollapseOpen();
              self.setState({
                ticketcommentMSG: "",
                tckcmtMSGCompulsory: ""
              });
            } else {
              NotificationManager.error(status);
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
        var paramData4 = {
          TicketID: this.state.ticket_Id,
          TicketMailBody: this.state.addReassignCmmt,
          IsSent: 1,
          IsCustomerComment: 0,
          IsInternalComment: 1,
          MailID: 0,
          OldAgentID: this.state.oldAgentId,
          NewAgentID: this.state.agentId
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData4));

        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////
            let status = res.data.message;
            if (status === "Success") {
              // NotificationManager.success(
              //   "Comment Added successfully."
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
              NotificationManager.error(status);
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
        var paramData5 = {
          TicketID: this.state.ticket_Id,
          TicketMailBody: this.state.ticketFreeTextcomment.trim(),
          IsSent: 1,
          IsCustomerComment: 0,
          IsInternalComment: 1
        };
        formData.append("ticketingMailerQue", JSON.stringify(paramData5));

        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/MessageComment",
          headers: authHeader(),
          data: formData
        })
          .then(function(res) {
            ////
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success("Comment Added successfully.");
              self.handleTicketAssignFollowUp();
              self.handleGetMessageDetails(self.state.ticket_Id);
              self.handleGetCountOfTabs(self.state.ticket_Id);
              self.handleFreeTextCommentOpen();
              self.setState({
                ticketFreeTextcomment: "",
                freetextCommentCompulsory: ""
              });
            } else {
              NotificationManager.error(status);
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
    ////
    var mailFiled = this.state.mailFiled;
    mailFiled[filed] = e.target.value;

    if (filed === "userCC") {
      var CcCount = mailFiled.userCC;
      var finalCount = CcCount.split(",");
      this.setState({ mailFiled, userCcCount: finalCount.length });
    } else {
      var BCcCount = mailFiled.userBCC;
      var finalBccCount = BCcCount.split(",");
      this.setState({ mailFiled, userBccCount: finalBccCount.length });
    }
  }
  handleProgressBarDetails(id) {
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
    ////
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
      ////

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
    ////
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
      ////

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
    // var id = e.original.lpassStoreID;
    // var index = this.state.selectedStoreData.findIndex(
    //   x => x.lpassStoreID === id
    // );
    if(e.original.lpassStoreID > 0){
      var id = e.original.lpassStoreID;
    }else{
      var id = e.original.storeID;
    }

    if(e.original.lpassStoreID > 0){
      var id = e.original.lpassStoreID;
      var index = this.state.selectedStoreData.findIndex(
        x => x.lpassStoreID === id
      );
    }else{
      var id = e.original.storeID;
      var index = this.state.selectedStoreData.findIndex(
        x => x.storeID === id
      );
    }
    // this.state.selectedStoreData["VisitedDate"] = rowData;
    var selectedStoreData = this.state.selectedStoreData;
    selectedStoreData[index].storeVisitDate = rowData;

    this.setState({ selectedStoreData });
  }
  handleChangeOrderItem = e => {
    debugger;
    var values = e.target.checked;
    if (!this.state.selectProductOrd) {
      if (values) {
        var x = document.getElementById("ordertbls1");
        var x1 = document.getElementById("orderitemtbl1");

        var i = document.getElementById("ordertbls");
        var j = document.getElementById("orderitemtbl");

        x.style.display = "none";
        x1.style.display = "block";

        i.style.display = "none";
        j.style.display = "block";
      } else {
        var i = document.getElementById("ordertbls");
        var j = document.getElementById("orderitemtbl");

        var x = document.getElementById("ordertbls1");
        var x1 = document.getElementById("orderitemtbl1");

        x.style.display = "block";
        x1.style.display = "none";

        i.style.display = "block";
        j.style.display = "none ";
      }
      this.setState({
        OrdItmBtnStatus: e.target.checked
      });
    } else {
      if (values) {
        var ot = document.getElementById("ordertbls");
        var oi = document.getElementById("orderitemtbl");

        var ot1 = document.getElementById("ordertbls1");
        var oi2 = document.getElementById("orderitemtbl1");

        ot.style.display = "none";
        oi.style.display = "block";

        ot1.style.display = "none";
        oi2.style.display = "block";
      } else {
        var ot1 = document.getElementById("ordertbls1");
        var oi2 = document.getElementById("orderitemtbl1");

        var ot = document.getElementById("ordertbls");
        var oi = document.getElementById("orderitemtbl");

        ot.style.display = "block";
        oi.style.display = "none";

        ot1.style.display = "block";
        oi2.style.display = "none";
      }
      this.setState({
        OrdItmBtnStatus: e.target.checked
      });
    }
  };

  handleRemoveImage(i) {
    let file = this.state.file;
    file.splice(i, 1);
    var fileText = file.length;
    setTimeout(() => {
      this.setState({ file, fileText });
    }, 50);
  }

  handleSetDataTab = () => {
    debugger;
    if (this.state.OrdItmBtnStatus) {
      var x = document.getElementById("ordertbls1");
      var x1 = document.getElementById("orderitemtbl1");

      var y = document.getElementById("ordertbls");
      var y1 = document.getElementById("orderitemtbl");

      x.style.display = "none";
      x1.style.display = "block";

      y.style.display = "none";
      y1.style.display = "block";
    } else {
      var x = document.getElementById("ordertbls");
      var x1 = document.getElementById("orderitemtbl");

      var y = document.getElementById("ordertbls1");
      var y1 = document.getElementById("orderitemtbl1");

      x.style.display = "block";
      x1.style.display = "none";

      y.style.display = "block";
      y1.style.display = "none";
    }
    this.setState({
      selectProductOrd: !this.state.selectProductOrd
    });
  };
  /// Handle get Order Item data
  handleGetOderItemData(invoiceNumber, rowData, e) {
    debugger;
    if (e.target.checked) {
      var selectproduct = [];
      this.setState({
        SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo: ""
      });
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderItemDetailsList",
        headers: authHeader(),
        data: {
          OrderMasterID: rowData.orderMasterID,
          OrderNumber: rowData.invoiceNumber,
          CustomerID: this.state.custID,
          StoreCode: rowData.storeCode,
          InvoiceDate: rowData.invoiceDate
        }
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          let data = res.data.responseData;
          if (Msg === "Success") {
            self.setState({
              OrderSubItem: data
            });
            var selectedInvoiceNo = invoiceNumber;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              var Order_Master = self.state.OrderSubItem.filter(
                x => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].articleNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem
                });
              }
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow
              });
            } else {
              if (newSelected[invoiceNumber] === true) {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.push(rowData);
                    var Order_Master = self.state.OrderSubItem.filter(
                      x => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].articleNumber
                        ] = true;

                        CselectedRow.push(Order_Master[j]);
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: CselectedRow
                    });

                    break;
                  }
                }
              } else {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.splice(i, 1);
                    var Order_Master = self.state.OrderSubItem.filter(
                      x => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].articleNumber
                        ] = false;
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: []
                    });

                    break;
                  }
                }
              }
            }

            self.setState({
              SelectedAllOrder: selectedRow,
              SelectedAllItem: CselectedRow
            });
          } else {
            var selectedInvoiceNo = invoiceNumber;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              var Order_Master = self.state.OrderSubItem.filter(
                x => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].articleNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem
                });
              }
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow
              });
            } else {
              if (newSelected[invoiceNumber] === true) {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.push(rowData);
                    var Order_Master = self.state.OrderSubItem.filter(
                      x => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].articleNumber
                        ] = true;

                        CselectedRow.push(Order_Master[j]);
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: CselectedRow
                    });

                    break;
                  }
                }
              } else {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.splice(i, 1);
                    var Order_Master = self.state.OrderSubItem.filter(
                      x => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].articleNumber
                        ] = false;
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: []
                    });

                    break;
                  }
                }
              }
            }

            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo,
              OrderSubItem: []
            });
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo: ""
      });
    }
  }
  // // -------------------------------Check box selected all code start-------------------------------
  // onCheckMasterAllChange(invoiceNumber, rowData) {
  //   const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
  //   newSelected[invoiceNumber] = !this.state.CheckBoxAllOrder[invoiceNumber];
  //   this.setState({
  //     CheckBoxAllOrder: invoiceNumber ? newSelected : false
  //   });
  //   var selectedRow = [];
  //   var CselectedRow = [];
  //   if (this.state.SelectedAllOrder.length === 0) {
  //     selectedRow.push(rowData);
  //     var Order_Master = this.state.OrderSubItem.filter(
  //       x => x.invoiceNumber === invoiceNumber
  //     );
  //     if (Order_Master.length > 0) {
  //       var objCheckBoxAllItem = new Object();
  //       for (let j = 0; j < Order_Master.length; j++) {
  //         objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

  //         CselectedRow.push(Order_Master[j]);
  //       }
  //       this.setState({
  //         CheckBoxAllItem: objCheckBoxAllItem
  //       });
  //     }
  //     this.setState({
  //       SelectedAllOrder: selectedRow,
  //       SelectedAllItem: CselectedRow
  //     });
  //   } else {
  //     if (newSelected[invoiceNumber] === true) {
  //       for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
  //         if (this.state.SelectedAllOrder[i] === rowData) {
  //           selectedRow = this.state.SelectedAllOrder;
  //           selectedRow.push(rowData);
  //           var Order_Master = this.state.OrderSubItem.filter(
  //             x => x.invoiceNumber === invoiceNumber
  //           );
  //           if (Order_Master.length > 0) {
  //             var objCheckBoxAllItem = new Object();
  //             for (let j = 0; j < Order_Master.length; j++) {
  //               objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

  //               CselectedRow.push(Order_Master[j]);
  //             }
  //             this.setState({
  //               CheckBoxAllItem: objCheckBoxAllItem
  //             });
  //           }

  //           this.setState({
  //             SelectedAllOrder: selectedRow,
  //             SelectedAllItem: CselectedRow
  //           });

  //           break;
  //         }
  //       }
  //     } else {
  //       for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
  //         if (this.state.SelectedAllOrder[i] === rowData) {
  //           selectedRow = this.state.SelectedAllOrder;
  //           selectedRow.splice(i, 1);
  //           var Order_Master = this.state.OrderSubItem.filter(
  //             x => x.invoiceNumber === invoiceNumber
  //           );
  //           if (Order_Master.length > 0) {
  //             var objCheckBoxAllItem = new Object();
  //             for (let j = 0; j < Order_Master.length; j++) {
  //               objCheckBoxAllItem[Order_Master[j].orderItemID] = false;
  //             }
  //             this.setState({
  //               CheckBoxAllItem: objCheckBoxAllItem
  //             });
  //           }

  //           this.setState({
  //             SelectedAllOrder: selectedRow,
  //             SelectedAllItem: []
  //           });

  //           break;
  //         }
  //       }
  //     }
  //   }

  //   this.setState({
  //     SelectedAllOrder: selectedRow,
  //     SelectedAllItem: CselectedRow,
  //     selectedProduct: selectedRow
  //   });
  // }

  checkIndividualItem(articleNumber, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[articleNumber] = !this.state.CheckBoxAllItem[articleNumber];
    this.setState({
      CheckBoxAllItem: articleNumber ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow
      });
    } else {
      if (newSelected[articleNumber] === true) {
        for (var i = 0; i < this.state.SelectedAllItem.length; i++) {
          selectedRow = this.state.SelectedAllItem;
          selectedRow.push(rowData);
          var Order_Master = this.state.OrderSubItem.filter(
            x => x.articleNumber === this.state.SelectedAllItem[i].articleNumber
          );
          if (Order_Master.length === selectedRow.length) {
            const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
            newSelected[Order_Master[0].articleNumber] = !this.state
              .CheckBoxAllOrder[Order_Master[0].articleNumber];
            this.setState({
              CheckBoxAllOrder: Order_Master[0].articleNumber
                ? newSelected
                : false
            });
            var data_master = this.state.orderDetailsData.filter(
              y => y.articleNumber === Order_Master[0].articleNumber
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
              x => x.articleNumber === rowData.articleNumber
            );

            if (Order_Master.length !== selectedRow.length) {
              const newSelected = Object.assign(
                {},
                this.state.CheckBoxAllOrder
              );
              newSelected[Order_Master[0].articleNumber] = false;
              this.setState({
                CheckBoxAllOrder: Order_Master[0].articleNumber
                  ? newSelected
                  : false
              });
              var data_master = this.state.orderDetailsData.filter(
                y => y.articleNumber === Order_Master[0].articleNumber
              );
              var GetIndex = this.state.orderDetailsData.findIndex(
                y => y.articleNumber === Order_Master[0].articleNumber
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
      SelectedAllOrder: selectedRow
    });
  }
  // -------------------------------Check box selected all code end-------------------------------

  callbackToParent = () => {
    ////
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
    ////
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
        ////
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
          NotificationManager.error(status);
          self.setState({
            addReassignCmmt: ""
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleGetEmailAdd() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetLogedInEmail",
      headers: authHeader()
    })
      .then(function(res) {
        var status = res.data.status;

        var data = res.data.responseData;
        if (status) {
          self.setState({ logInEmail: data.emailID, role_Name: data.roleName });
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  hadnleOpenKnowledage() {
    this.setState({ KnowledgeBaseModal: true });
  }

  hadnleCloseKnowledage() {
    this.setState({ KnowledgeBaseModal: true });
  }

  handleSubmitTicket() {
    debugger;
    if (this.state.selectetedParameters.ticketStatusID === "103") {
      this.hadnleOpenKnowledage();
    } else {
      this.handleUpdateTicketDetails();
    }
  }
  handleYesNoClick(ischeck) {
    debugger;
    if (ischeck === true) {
      this.setState({ isaddKnowledge: true });

      setTimeout(() => {
        this.handleUpdateTicketDetails();
      }, 10);
    } else {
      this.setState({ isaddKnowledge: false });
      setTimeout(() => {
        this.handleUpdateTicketDetails();
      }, 10);
    }
  }

  handleAddKnwoldgeBase() {
    debugger;
    let self = this;
    var tempDescription = "";
    var Description = "";
    debugger;
    if (this.state.messageDetails.length > 0) {
      tempDescription = this.state.messageDetails[0][
        "msgDetails"
      ][0].latestMessageDetails.ticketMailBody.replace(/<[^>]+>/g, "");
      Description = tempDescription.replace(/&nbsp;/gi, " ");
    }

    var inputParam = {
      KBCODE: "",
      CategoryID: this.state.selectetedParameters.categoryID,
      SubCategoryID: this.state.selectetedParameters.subCategoryID,
      Subject: this.state.ticketDetailsData.ticketTitle,
      Description: Description || "",
      IsActive: 1,
      IssueTypeID: this.state.selectetedParameters.issueTypeID,
      TicketID: this.state.ticket_Id,
      IsFromTicket: 1
    };
    axios({
      method: "post",
      url: config.apiUrl + "/KnowledgeBase/AddKB",
      headers: authHeader(),
      data: inputParam
    })
      .then(function(res) {
        debugger;
        var status = res.data.status;
        if (status) {
          NotificationManager.success("Ticket updated successfully.");
          NotificationManager.success("Ticket Added in knowledgebase.");
          self.props.history.push("myTicketlist");
        } else {
          NotificationManager.success("Ticket Added in knowledgebase.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
     const TranslationContext = this.context.state.translateLanguage.default
    const {
      open,
      ticketDetailsData,
      historicalDetails,
      SearchAssignData,
      orderDetails,
      selectedStore
    } = this.state;

    var statusValidate = false;
    if (
      this.state.role_Name === "Supervisor" ||
      this.state.role_Name === "Admin" ||
      this.state.role_Name === "Agent"
    ) {
      statusValidate = true;
      this.state.statusValidate = true;
    } else {
      if (this.state.logInEmail === this.state.userEmailID) {
        statusValidate = true;
        this.state.statusValidate = true;
      } else {
        statusValidate = false;
        this.state.statusValidate = false;
      }
    }

    const EmailCollapseUpDown = this.state.EmailCollapse ? (
      <a
        href="#!"
        style={{ height: "30px", cursor: "pointer" }}
        onClick={this.HandleEmailCollapseOpen.bind(this)}
      >
        <img src={MinusImg} alt="Minus" className="minus-img" />
      </a>
    ) : (
      <a
        href="#!"
        style={{ height: "30px", cursor: "pointer" }}
        onClick={this.HandleEmailCollapseOpen.bind(this)}
      >
        <img src={PlusImg} alt="Plush" className="plush-img" />
      </a>
    );

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
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.id
                      }
                    else{
                      return "ID"
                    }
                    })()
                  } - {ticketDetailsData.ticketID}
                      <span className="updated-2-d-ago">
                        {ticketDetailsData.updateDate}
                      </span>
                    </label>
                    <a
                      href="#!"
                      className="loading-rectangle-cntr"
                      onClick={this.handleGetHistoricalData.bind(this)}
                    >
                      <img
                        src={LoadingImg}
                        alt="Loading"
                        className="loading-rectangle m-0"
                        title="Ticket Historical"
                        // onClick={this.handleGetHistoricalData.bind(this)}
                      />
                    </a>
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
                      <label className="lblHistorical">
                      
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.tickethistorical
                      }
                    else{
                      return "Ticket Historical"
                    }
                    })()
                  } 
                      </label>
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
                              Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.name
                      }
                    else{
                      return "Name"
                    }
                    })()
                  } </span>,
                              accessor: "name",
                              width: 150
                            },
                            {
                              Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.action
                      }
                    else{
                      return "Action"
                    }
                    })()
                  } </span>,
                              accessor: "action",
                            },
                            {
                              Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.time
                      }
                    else{
                      return "Time"
                    }
                    })()
                  }  & {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.date
                      }
                    else{
                      return "Date"
                    }
                    })()
                  }</span>,
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

                  <div
                    className={
                      this.state.isKB
                        ? "col-12 col-xs-8 col-sm-8 col-md-9 iskbticket"
                        : "col-12 col-xs-8 col-sm-8 col-md-9"
                    }
                  >
                    <div
                      style={{ float: "right", marginTop: "0px" }}
                      className={this.state.isKB ? "iskbticket" : ""}
                    >
                      <a
                        href="#!"
                        className="d-inline-block"
                        onClick={this.HandlelabelModalOpen.bind(this)}
                      >
                        <img
                          src={Headphone2Img}
                          alt="headphone"
                          className="oval-55"
                          title="Agent List"
                        />
                        <label
                          className="naman-r"
                          // onClick={this.HandlelabelModalOpen.bind(this)}
                        >
                          {ticketDetailsData.username}
                        </label>
                        <img src={DownImg} alt="down" className="down-header" />
                      </a>
                      <button
                        type="button"
                        className={
                          this.state.isKB
                            ? "myticket-submit-solve-button iskbticket"
                            : "myticket-submit-solve-button"
                        }
                        onClick={this.handleSubmitTicket.bind(this)}
                      >
                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.submit
                      }
                    else{
                      return "SUBMIT"
                    }
                    })()
                  }
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
                      className={
                        this.state.isKB
                          ? "myTicket-table remov agentlist iskbticket"
                          : "myTicket-table remov agentlist"
                      }
                      id="tic-det-assign"
                    >
                      <ReactTable
                        className="limit-react-table-body"
                        data={SearchAssignData}
                        columns={[
                          {
                            Header: <span>
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.empid
                      }
                    else{
                      return "Emp Id"
                    }
                    })()
                  }
                            </span>,
                            accessor: "user_ID",
                            width: 80
                          },
                          {
                            Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.name
                      }
                    else{
                      return "name"
                    }
                    })()
                  }</span>,
                            accessor: "agentName",
                          },
                          {
                            Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.designation
                      }
                    else{
                      return "Designation"
                    }
                    })()
                  }</span>,
                            accessor: "designation",
                          },
                        ]}
                        minRows={2}
                        // defaultPageSize={5}
                        showPagination={false}
                        resizable={false}
                        getTrProps={(rowInfo, column) => {
                          const index = column ? column.index : -1;
                          return {
                            onClick: e => {
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.select
                      }
                    else{
                      return "SELECT"
                    }
                    })()
                  }
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
                    <label className="Commentlabel1">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.addcomment
                      }
                    else{
                      return "Add Comment"
                    }
                    })()
                  }</label>
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
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.skip
                      }
                    else{
                      return "SKIP"
                    }
                    })()
                  }
                  </button>
                </div>
                <div className="SendCommentBtn">
                  <button
                    className="SendCommentBtn1"
                    onClick={this.handleSendMailData.bind(this, 4)}
                  >
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.add
                      }
                    else{
                      return "Add"
                    }
                    })()
                  }
                  </button>
                </div>
              </div>
            </Modal>
            <div className="card-rectangle">
              <div className="rectangle-box">
                <div className="row">
                  <div className="col-md-3">
                    <div style={{ padding: "15px" }}>
                      <label className="mobile-number">
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.mobilenumber
                      }
                    else{
                      return "Mobile Number"
                    }
                    })()
                  }
                      </label>
                      <br />
                      <label className="mobile-no">
                        {ticketDetailsData.customerPhoneNumber}
                      </label>
                      <a
                        href="#!"
                        onClick={this.HandleProfileModalOpen.bind(this)}
                      >
                        <img
                          src={EyeImg}
                          alt="eye"
                          className="eyeImg1"
                          title="Customer Profile"
                          // onClick={this.HandleProfileModalOpen.bind(this)}
                        />
                      </a>
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
                              <label className="profilemodal-text">
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.name
                      }
                    else{
                      return "Name"
                    }
                    })()
                  }
                              </label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.customerName}
                              </label>
                            </div>
                            <div className="col-md-6">
                              <label className="profilemodal-text">
                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.mobile
                      }
                    else{
                      return "Mobile"
                    }
                    })()
                  }
                              </label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.customerPhoneNumber}
                              </label>
                            </div>
                          </div>
                          <div className="row profilemodalrow-1">
                            <div className="col-md-6">
                              <label className="profilemodal-text"> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.email
                      }
                    else{
                      return "Email"
                    }
                    })()
                  }</label>
                              <label className="profilemodal-textval">
                                {ticketDetailsData.customerEmailId}
                              </label>
                            </div>

                            <div className="col-md-6">
                              <label className="profilemodal-text">
                                
                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.alternatenumber
                      }
                    else{
                      return "Alternate Number"
                    }
                    })()
                  }
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
                                  

                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.openticket
                      }
                    else{
                      return "Open Tickets"
                    }
                    })()
                  }
                                </small>
                              </label>
                            </div>
                            <div className="openticketbox-2 profilemodalrow-1">
                              <label className="open-tickets-box-text">
                                {ticketDetailsData.totalticket}
                                <small className="open-tickets-box-textval">
                                  
                                   {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.totalticket
                      }
                    else{
                      return "Total Tickets"
                    }
                    })()
                  }
                                </small>
                              </label>
                            </div>
                          </div>
                          <div className="row profilemodal-row-3">
                            <img src={CustomerIcon} alt="customer-icon" />
                            <label className="full-profile-view-text">
                              
                               {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.fullprofileview
                      }
                    else{
                      return "FULL PROFILE VIEW"
                    }
                    })()
                  }
                            </label>
                          </div>
                        </div>
                      </Modal>
                      <a
                        href={Demo.BLANK_LINK}
                        onClick={this.handleBillImgModalOpen.bind(this)}
                        className=""
                        style={{
                          display: "inline",
                          marginLeft: "5px"
                        }}
                      >
                        <img
                          src={BillInvoiceImg}
                          alt="eye"
                          className="billImg"
                          title="Historical Order"
                          // onClick={this.handleBillImgModalOpen.bind(this)}
                        />
                        </a>
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
                                  
                                   {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.customer
                      }
                    else{
                      return "CUSTOMER"
                    }
                    })()
                  }
                                </label>
                              </div>
                              <div className="row">
                                <div className="col-md-6 namepad">
                                  <label className="fullna">
                                   {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.fullname
                      }
                    else{
                      return "Full Name"
                    }
                    })()
                  }
                                  </label>
                                  <label className="namedi">
                                    {ticketDetailsData.customerName}
                                  </label>
                                </div>
                                <div className="col-md-6 namepad">
                                  <label className="fullna">
                                    
                                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.mobilenumber
                      }
                    else{
                      return "Mobile Number"
                    }
                    })()
                  }
                                  </label>
                                  <label className="namedi">
                                    {ticketDetailsData.customerPhoneNumber}
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 namepad">
                                  <label className="fullna">
                                   {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.emailid
                      }
                    else{
                      return "Email ID"
                    }
                    })()
                  }
                                  </label>
                                  <label className="namedi">
                                    {ticketDetailsData.customerEmailId}
                                  </label>
                                </div>
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
                              <div>
                                <div className="histo">
                                  <img
                                    src={Order}
                                    alt="customer-icon"
                                    style={{ marginTop: "-10px" }}
                                  />
                                  <label className="customer-text">
                                    
                                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.historicalorder
                      }
                    else{
                      return "HISTORICAL ORDER"
                    }
                    })()
                  }
                                  </label>
                                </div>

                                <div className="tablehistrical">
                                  <ReactTable
                                    data={orderDetails}
                                    columns={[
                                      {
                                        Header: (
                                          <span className="historyTable-header">
                                            
                                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.ordernumber
                      }
                    else{
                      return "Order Number"
                    }
                    })()
                  }
                                          </span>
                                        ),
                                        accessor: "orderNumber",
                                      },
                                      {
                                        Header: (
                                          <span className="historyTable-header">
                                            
                                             
                                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.mobilenumber
                      }
                    else{
                      return "Mobile Number"
                    }
                    })()
                  }
                                          </span>
                                        ),
                                        accessor: "mobileNumber",
                                      },
                                      {
                                        Header: (
                                          <span className="historyTable-header">
                                            
                                             {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.amount
                      }
                    else{
                      return "Amount"
                    }
                    })()
                  }
                                          </span>
                                        ),
                                        // accessor: "itemPrice",
                                        accessor: "ordeItemPrice",
                                      },
                                      {
                                        Header: (
                                          <span className="historyTable-header">
                                            
                                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.purchasedate
                      }
                    else{
                      return "Purchase Date"
                    }
                    })()
                  }
                                          </span>
                                        ),
                                        accessor: "dateFormat",
                                      },
                                    ]}
                                    defaultPageSize={5}
                                    showPagination={false}
                                    // minRows={2}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>

                      <div className="card-space-1">
                        <label className="target-closure-date">
                          
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.targetcloserdate
                      }
                    else{
                      return "Target Closure Date"
                    }
                    })()
                  }
                           &nbsp;
                        </label>
                        <label className="Date-target">
                          {ticketDetailsData.targetClosuredate}
                        </label>
                      </div>
                      <div className="mobilenumber-resp">
                        <span className="line-respo"></span>
                        <label className="respo">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.response
                      }
                    else{
                      return "Response"
                    }
                    })()
                  }</label>
                        <label className="resol">
                          <span className="line-resol"></span>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.resolution
                      }
                    else{
                      return "Resolution"
                    }
                    })()
                  }
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
                  <div className="col-md-6">
                    {/* <div
                    className={
                      this.state.role_Name === "Supervisor"
                        ? "col-md-6"
                        : "col-md-6 disabled-link" &&
                          this.state.role_Name === "Admin"
                        ? "col-md-6"
                        : "col-md-6 disabled-link"
                    }
                  > */}
                    <div className="mid-sec mid-secnew">
                      <div className="row mob-pad">
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                          <div
                            className={
                              statusValidate
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.status
                      }
                    else{
                      return "Status"
                    }
                    })()
                  }
                            </label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
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
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.priority
                      }
                    else{
                      return "Priority"
                    }
                    })()
                  }</label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
                              value={this.state.selectetedParameters.priorityID}
                              onChange={this.handleDropDownChange}
                              name="priorityID"
                            >
                              <option>Priority</option>
                              {this.state.TicketPriorityData !== null &&
                                this.state.TicketPriorityData.map((item, i) => {
                                  if (
                                    this.state.isSystemGenerated == false &&
                                    item.priortyName === "Auto"
                                  ) {
                                    return null;
                                  } else if (
                                    this.state.isSystemGenerated == true &&
                                    item.priortyName === "Auto"
                                  ) {
                                    return (
                                      <option key={i} value={item.priorityID}>
                                        {item.priortyName}
                                      </option>
                                    );
                                  } else {
                                    return (
                                      <option key={i} value={item.priorityID}>
                                        {item.priortyName}
                                      </option>
                                    );
                                  }
                                })}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.brand
                      }
                    else{
                      return "Brand"
                    }
                    })()
                  }</label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
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
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.category
                      }
                    else{
                      return "Category"
                    }
                    })()
                  }</label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
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
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.subcategory
                      }
                    else{
                      return "Sub Category"
                    }
                    })()
                  }
                            </label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
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
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">
                             {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.issuetype
                      }
                    else{
                      return "Issue Type"
                    }
                    })()
                  }
                            </label>

                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
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
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">
                              
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.channelofpurchase
                      }
                    else{
                      return "Channel Of Purchase"
                    }
                    })()
                  }
                            </label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
                              value={
                                this.state.selectetedParameters
                                  .channelOfPurchaseID
                              }
                              onChange={this.handleDropDownChange}
                              name="channelOfPurchaseID"
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
                          {/* <div className="form-group"> */}
                          <div
                            className={
                              this.state.role_Name === "Supervisor"
                                ? "form-group"
                                : "form-group disabled-link" &&
                                  this.state.role_Name === "Admin"
                                ? "form-group"
                                : "form-group disabled-link"
                            }
                          >
                            <label className="label-4">
                              
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.ticketactiontype
                      }
                    else{
                      return "Ticket Action Type"
                    }
                    })()
                  }
                            </label>
                            <select
                              className={
                                this.state.isKB
                                  ? "rectangle-9 select-category-placeholder iskbticket"
                                  : "rectangle-9 select-category-placeholder"
                              }
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
                          <label className="label-4 storeSpacing">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.store
                      }
                    else{
                      return "Store"
                    }
                    })()
                  }</label>
                          <a
                            href="#!"
                            className="bata-rajouri-garden d-inline-block"
                            onClick={this.HandleStoreModalOpen.bind(this)}
                          >
                            {this.state.StoreName === "" ? (
                              <label className="label-4 storeSpacing">
                                
                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.nostoreattached
                      }
                    else{
                      return "No Store Attached"
                    }
                    })()
                  }
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
                          </a>
                          <Modal
                            open={this.state.storemodal}
                            onClose={this.HandleStoreModalClose.bind(this)}
                            modalId="addStoreTableModal"
                            overlayId="logout-ovrly"
                          >
                            <div className="row storemainrow">
                              <div className={"col-md-12"}>
                                <select
                                  className={
                                    this.state.isKB
                                      ? "systemstoredropdown1 iskbticket"
                                      : "systemstoredropdown1"
                                  }
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
                                     {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.yes
                      }
                    else{
                      return "Yes"
                    }
                    })()
                  }
                                  </label>
                                  <div
                                    className={
                                      this.state.isKB
                                        ? "switchmargin iskbticket"
                                        : "switchmargin"
                                    }
                                  >
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
                                  <label className="orderdetailpopup"> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.no
                      }
                    else{
                      return "No"
                    }
                    })()
                  }</label>
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
                                className={
                                  this.state.isKB
                                    ? "col-md-6 m-b-10 m-t-10 iskbticket"
                                    : "col-md-6 m-b-10 m-t-10"
                                }
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
                                  className={
                                    this.state.isKB
                                      ? "myticket-submit-solve-button m-0 iskbticket"
                                      : "myticket-submit-solve-button m-0"
                                  }
                                  onClick={this.handleAttachStoreData.bind(
                                    this
                                  )}
                                >
                                  
                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.attachstore
                      }
                    else{
                      return "Attach Store"
                    }
                    })()
                  }
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
                                        
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.storedetail
                      }
                    else{
                      return "Store Details"
                    }
                    })()
                  }
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
                                          
                                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.selectedstore
                      }
                    else{
                      return "Selected Store"
                    }
                    })()
                  }
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
                                    data={this.state.storeDetails}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "purpose",
                                        Cell: row => {
                                          debugger;
                                          var storeId = 0;
                                          if (row.original.lpassStoreID > 0) {
                                            storeId = row.original.lpassStoreID;
                                          } else {
                                            storeId = row.original.storeID;
                                          }
                                          return (
                                            <div className="filter-checkbox">
                                              <input
                                                type="checkbox"
                                                id={"i" + storeId}
                                                style={{
                                                  display: "none"
                                                }}
                                                name="ticket-store"
                                                checked={
                                                  this.state.CheckStoreID[
                                                    storeId
                                                  ] === true
                                                }
                                                onChange={this.handleCheckStoreID.bind(
                                                  this,
                                                  storeId,
                                                  row.original
                                                )}
                                                defaultChecked={true}
                                              />
                                              <label
                                                htmlFor={"i" + storeId}
                                              ></label>
                                            </div>
                                          );
                                        },
                                        width: 20
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storecode
                      }
                    else{
                      return "Store Code"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storename
                      }
                    else{
                      return "Store Name"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeName",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storepincode
                      }
                    else{
                      return "Store Pin Code"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeemailid
                      }
                    else{
                      return "Store Email Id"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeEmailID",
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeaddress
                      }
                    else{
                      return "Store Address"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "address",
                                      },
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
                                <div className="reactstoreselect custom-react-table datePickertable storeTdetail">
                                 
                                  <ReactTable
                                    data={this.state.selectedStoreData}
                                    columns={[
                                      {
                                        Header: "",
                                        accessor: "storeID",
                                        width: 20,
                                        Cell: row => {
                                          var storeId = 0;
                                          if (row.original.lpassStoreID > 0) {
                                            storeId = row.original.lpassStoreID;
                                          } else {
                                            storeId = row.original.storeID;
                                          }
                                          return (
                                            <div
                                              className="filter-checkbox"
                                              style={{
                                                marginLeft: "15px"
                                              }}
                                            >
                                              <input
                                                type="checkbox"
                                                id={"i" + storeId}
                                                style={{
                                                  display: "none"
                                                }}
                                                name="ticket-store"
                                                checked={
                                                  this.state.CheckStoreID[
                                                    storeId
                                                  ] === true
                                                }
                                                onChange={this.handleCheckStoreID.bind(
                                                  this,
                                                  storeId,
                                                  row.original
                                                )}
                                                defaultChecked={true}
                                              />
                                              <label
                                                htmlFor={"i" + storeId}
                                              ></label>
                                            </div>
                                          );
                                        }
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.purpose
                      }
                    else{
                      return "Purpose"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "invoiceNumber",
                                        minWidth: 160,
                                        Cell: row => (
                                          <div
                                            className="filter-checkbox"
                                            style={{
                                              marginLeft: "15px"
                                            }}
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
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storecode
                      }
                    else{
                      return "Store Code"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storename
                      }
                    else{
                      return "Store Name"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeName",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storepincode
                      }
                    else{
                      return "Store Pin Code"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "pincode",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeemailid
                      }
                    else{
                      return "Store Email Id"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeEmailID",
                                        minWidth: 190
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeaddress
                      }
                    else{
                      return "Store Address"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "address",
                                        minWidth: 140
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.visitdate
                      }
                    else{
                      return "Visit Date"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeVisitDate",
                                        minWidth: 150,
                                        Cell: row => {
                                          var storeId = 0;
                                          if (row.original.lpassStoreID > 0) {
                                            storeId = row.original.lpassStoreID;
                                          } else {
                                            storeId = row.original.storeID;
                                          }
                                          return (
                                            <div className="col-sm-12 p-0">
                                              <DatePicker
                                                selected={
                                                  row.original
                                                    .storeVisitDate !== null
                                                    ? new Date(
                                                        row.original.storeVisitDate
                                                      )
                                                    : new Date()
                                                }
                                                placeholderText="MM/DD/YYYY"
                                                showMonthDropdown
                                                showYearDropdown
                                                dateFormat="MM/DD/YYYY"
                                                id={
                                                  "visitDate" +
                                                  storeId
                                                }
                                                value={
                                                  row.original
                                                    .storeVisitDate !== null
                                                    ? moment(
                                                        row.original
                                                          .storeVisitDate
                                                      ).format("MM/DD/YYYY")
                                                    : ""
                                                }
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
                                    resizable={false}
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
                          <label className="label-4">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.product
                      }
                    else{
                      return "Product"
                    }
                    })()
                  }</label>
                          <a
                            href="#!"
                            className="bata-rajouri-garden d-inline-block"
                            onClick={this.handleOrderTableOpen.bind(this)}
                          >
                            {this.state.ProductName === "" ? (
                              <label className="label-4">
                                
                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.noproductattached
                      }
                    else{
                      return "No Product Attached"
                    }
                    })()
                  }
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
                          </a>
                          <Modal
                            onClose={this.handleOrderTableClose.bind(this)}
                            open={this.state.OrderTable}
                            modalId="addOrderTableModal"
                            overlayId="logout-ovrly"
                          >
                            <div
                              className="row"
                              style={{
                                marginLeft: "0px",
                                marginRight: "0px"
                              }}
                            >
                              <div
                                className="col-md-12 claim-status-card"
                                style={{ height: "54px" }}
                              >
                                <label style={{ marginTop: "7px" }}>
                                  <b>
                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.customerattachorder
                      }
                    else{
                      return "Customer Want to attach order"
                    }
                    })()
                  }
                                  </b>
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
                              style={{
                                marginLeft: "0",
                                marginRight: "0"
                              }}
                            >
                              <div className="col-md-6">
                                <label className="orderdetailpopup">
                                 
                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.orderdetails
                      }
                    else{
                      return "Order Details"
                    }
                    })()
                  }
                                </label>
                              </div>
                              <div className="col-md-3">
                                <div
                                  style={{
                                    float: "right",
                                    display: "flex"
                                  }}
                                >
                                  <label className="orderdetailpopup">
                                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.order
                      }
                    else{
                      return "Order"
                    }
                    })()
                  }
                                  </label>
                                  <div
                                    className={
                                      this.state.isKB
                                        ? "orderswitch orderswitchitem iskbticket"
                                        : "orderswitch orderswitchitem"
                                    }
                                  >
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
                                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.item
                      }
                    else{
                      return "Item"
                    }
                    })()
                  }
                                  </label>
                                </div>
                              </div>
                              <div
                                className={
                                  this.state.isKB
                                    ? "col-md-3 iskbticket"
                                    : "col-md-3"
                                }
                              >
                                <input
                                  type="text"
                                  className="searchtextpopup"
                                  placeholder="Search Order"
                                  name="orderNumber"
                                  value={this.state.orderNumber}
                                  onChange={this.handleNoteOnChange}
                                  autoComplete="off"
                                />
                                <img
                                  src={SearchBlackImg}
                                  alt="Search"
                                  className="searchtextimgpopup"
                                  onClick={this.handleOrderSearchData.bind(
                                    this
                                  )}
                                />
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
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.productdetails
                      }
                    else{
                      return "Product Details"
                    }
                    })()
                  }
                                        
                                      </a>
                                    </li>
                                    {this.state.SelectedAllOrder.length > 0 ? (
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
                                          
                                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.selectedproduct
                      }
                    else{
                      return "Selected Product"
                    }
                    })()
                  }
                                        </a>
                                      </li>
                                    ) : null}
                                  </ul>
                                  {/* {this.state.SelectedAllOrder.length > 0 ? ( */}
                                  <div className="col-md-6 m-b-10 m-t-10 text-right">
                                    <button
                                      type="button"
                                      className={
                                        this.state.isKB
                                          ? "myticket-submit-solve-button m-0 iskbticket"
                                          : "myticket-submit-solve-button m-0"
                                      }
                                      onClick={this.handleAttachProductData.bind(
                                        this
                                      )}
                                    >
                                      
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.attachproduct
                      }
                    else{
                      return "Attach Product"
                    }
                    })()
                  }
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
                                  id="ordertbls"
                                  style={{ display: "block" }}
                                >
                                  <ReactTable
                                    data={this.state.orderDetailsData}
                                    columns={[
                                      {
                                        Header: <span></span>,
                                        accessor: "invoiceNumber",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                              style={{
                                                display: "none"
                                              }}
                                              name="AllOrder"
                                              checked={this.state.selectedInvoiceNo.includes(
                                                row.original.invoiceNumber
                                              )}
                                              onChange={this.handleGetOderItemData.bind(
                                                this,
                                                row.original.invoiceNumber,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicenumber
                      }
                    else{
                      return "Inovice Number"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "invoiceNumber",
                                        minWidth: 150
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicedate
                      }
                    else{
                      return "Inovice Date"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "dateFormat",
                                        minWidth: 120
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemcount
                      }
                    else{
                      return "Item Count"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "itemCount",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemprice
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "ordeItemPrice",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.pricepaid
                      }
                    else{
                      return "Price paid"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "orderPricePaid",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storecode
                      }
                    else{
                      return "Store Code"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeaddress
                      }
                    else{
                      return "Store Address"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeAddress",
                                      },
                                      {
                                        Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.discount
                      }
                    else{
                      return "Discount"
                    }
                    })()
                  }</span>,
                                        accessor: "discount",
                                      },
                                    ]}
                                    resizable={false}
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={true}
                                  />
                                </div>
                                <div
                                  className="reactstoreselect custom-react-table"
                                  id="orderitemtbl"
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
                                        accessor: "invoiceNumber",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                              style={{
                                                display: "none"
                                              }}
                                              name="AllOrder"
                                              checked={this.state.selectedInvoiceNo.includes(
                                                row.original.invoiceNumber
                                              )}
                                              onChange={this.handleGetOderItemData.bind(
                                                this,
                                                row.original.invoiceNumber,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicenumber
                      }
                    else{
                      return "Invoice Number"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "invoiceNumber",
                                        minWidth: 150
                                      },
                                      {
                                        Header: <span>
                                        
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicedate
                      }
                    else{
                      return "Invoice Date"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "dateFormat",
                                        minWidth: 120
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemcount
                      }
                    else{
                      return "Item Count"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "itemCount",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemprice
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "ordeItemPrice",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.pricepaid
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "orderPricePaid",
                                      },
                                      {
                                        Header: <span>
                                      
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storecode
                      }
                    else{
                      return "Store Code"
                    }
                    })()
                  }
                                      </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeaddress
                      }
                    else{
                      return "Store Address"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeAddress",
                                      },
                                      {
                                        Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.discount
                      }
                    else{
                      return "Discount"
                    }
                    })()
                  }</span>,
                                        accessor: "discount",
                                      },
                                    ]}
                                    resizable={false}
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={true}
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
                                                x.invoiceNumber ===
                                                row.original.invoiceNumber
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
                                                            .invoiceNumber
                                                        }
                                                        style={{
                                                          display: "none"
                                                        }}
                                                        name="AllItem"
                                                        checked={
                                                          this.state
                                                            .CheckBoxAllItem[
                                                            row.original
                                                              .articleNumber
                                                          ] === true
                                                        }
                                                        onChange={this.checkIndividualItem.bind(
                                                          this,
                                                          row.original
                                                            .articleNumber,
                                                          row.original
                                                        )}
                                                      />
                                                      <label
                                                        htmlFor={
                                                          "item" +
                                                          row.original
                                                            .invoiceNumber
                                                        }
                                                      ></label>
                                                    </div>
                                                  );
                                                }
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.articlenumber
                      }
                    else{
                      return "Article Number"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "articleNumber",
                                                minWidth: 140
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.articlename
                      }
                    else{
                      return "Article Name"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "articleName"
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.articlemrp
                      }
                    else{
                      return "Article MRP"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "itemPrice"
                                              },
                                              {
                                                Header: <span>
                                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.pricepaid
                      }
                    else{
                      return "Price Paid"
                    }
                    })()
                  }
                                                </span>,
                                                accessor: "pricePaid",
                                              },
                                              {
                                                Header: <span> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.discount
                      }
                    else{
                      return "Discount"
                    }
                    })()
                  }</span>,
                                                accessor: "discount",
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.reqiuredsize
                      }
                    else{
                      return "Required Size"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "requireSize",
                                                Cell: row => {
                                                  return (
                                                    <div ref={this.setWrapperRef}>
                                                      <input
                                                        type="text"
                                                        id={
                                                          "requireSizeTxt" +
                                                          row.original
                                                            .articleNumber
                                                        }
                                                        value={
                                                          row.original
                                                            .requireSize || ""
                                                        }
                                                        name="requiredSize"
                                                        className="order-input"
                                                        autoComplete="off"
                                                        ref={input => {
                                                          this.searchInput = input;
                                                        }}
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
                                            resizable={false}
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
                                  id="ordertbls1"
                                  style={{ display: "block" }}
                                >
                                  <ReactTable
                                    data={this.state.SelectedAllOrder}
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
                                        accessor: "invoiceNumber",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                              style={{
                                                display: "none"
                                              }}
                                              name="AllOrder"
                                              checked={this.state.selectedInvoiceNo.includes(
                                                row.original.invoiceNumber
                                              )}
                                              onChange={this.handleGetOderItemData.bind(
                                                this,
                                                row.original.invoiceNumber,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                     {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicenumber
                      }
                    else{
                      return "Invoice Number"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "invoiceNumber",
                                        minWidth: 150
                                      },
                                      {
                                        Header: <span>
                                        
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicedate
                      }
                    else{
                      return "Invoice Date"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "dateFormat",
                                        minWidth: 120
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemcount
                      }
                    else{
                      return "Item Count"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "itemCount",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemprice
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "ordeItemPrice",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.pricepaid
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "orderPricePaid",
                                      },
                                      {
                                        Header: <span>
                                      
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storecode
                      }
                    else{
                      return "Store Code"
                    }
                    })()
                  }
                                      </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeaddress
                      }
                    else{
                      return "Store Address"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeAddress",
                                      },
                                      {
                                        Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.discount
                      }
                    else{
                      return "Discount"
                    }
                    })()
                  }</span>,
                                        accessor: "discount",
                                      },
                                    ]}
                                    resizable={false}
                                    minRows={2}
                                    defaultPageSize={5}
                                    showPagination={false}
                                  />
                                </div>
                                <div
                                  className="reactstoreselect custom-react-table"
                                  id="orderitemtbl1"
                                  style={{ display: "none" }}
                                >
                                  <ReactTable
                                    data={this.state.SelectedAllOrder}
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
                                        accessor: "invoiceNumber",
                                        width: 20,
                                        Cell: row => (
                                          <div className="filter-checkbox">
                                            <input
                                              type="checkbox"
                                              id={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                              style={{
                                                display: "none"
                                              }}
                                              name="AllOrder"
                                              checked={this.state.selectedInvoiceNo.includes(
                                                row.original.invoiceNumber
                                              )}
                                              onChange={this.handleGetOderItemData.bind(
                                                this,
                                                row.original.invoiceNumber,
                                                row.original
                                              )}
                                            />
                                            <label
                                              htmlFor={
                                                "all" +
                                                row.original.invoiceNumber
                                              }
                                            ></label>
                                          </div>
                                        )
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicenumber
                      }
                    else{
                      return "Invoice Number"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "invoiceNumber",
                                      },
                                      {
                                        Header: <span>
                                        
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.invoicedate
                      }
                    else{
                      return "Invoice Date"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "dateFormat",
                                      },
                                      {
                                        Header: <span>
                                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemcount
                      }
                    else{
                      return "Item Count"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "itemCount",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.itemprice
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "ordeItemPrice",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.pricepiad
                      }
                    else{
                      return "Item Price"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "orderPricePaid",
                                      },
                                      {
                                        Header: <span>
                                      
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storecode
                      }
                    else{
                      return "Store Code"
                    }
                    })()
                  }
                                      </span>,
                                        accessor: "storeCode",
                                      },
                                      {
                                        Header: <span>
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.storeaddress
                      }
                    else{
                      return "Store Address"
                    }
                    })()
                  }
                                        </span>,
                                        accessor: "storeAddress",
                                      },
                                      {
                                        Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.discount
                      }
                    else{
                      return "Discount"
                    }
                    })()
                  }</span>,
                                        accessor: "discount",
                                      },
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
                                                x.invoiceNumber ===
                                                row.original.invoiceNumber
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
                                                        row.original
                                                          .articleNumber
                                                      }
                                                      style={{
                                                        display: "none"
                                                      }}
                                                      name="AllItem"
                                                      checked={
                                                        this.state
                                                          .CheckBoxAllItem[
                                                          row.original
                                                            .articleNumber
                                                        ] === true
                                                      }
                                                      onChange={this.checkIndividualItem.bind(
                                                        this,
                                                        row.original
                                                          .articleNumber,
                                                        row.original
                                                      )}
                                                    />
                                                    <label
                                                      htmlFor={
                                                        "item" +
                                                        row.original
                                                          .articleNumber
                                                      }
                                                    ></label>
                                                  </div>
                                                )
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.articlenumber
                      }
                    else{
                      return "Article Number"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "articleNumber"
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.articlesize
                      }
                    else{
                      return "Article Size"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "articleName"
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.articlemrp
                      }
                    else{
                      return "Article MRP"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "itemPrice"
                                              },
                                              {
                                                Header: <span>
                                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.pricepaid
                      }
                    else{
                      return "Price Paid"
                    }
                    })()
                  }
                                                </span>,
                                                accessor: "pricePaid",
                                              },
                                              {
                                                Header: <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.discount
                      }
                    else{
                      return "Discount"
                    }
                    })()
                  }</span>,
                                                accessor: "discount",
                                                sortable: true
                                              },
                                              {
                                                Header: (
                                                  <span>
                                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.requiredsize
                      }
                    else{
                      return "Required Size"
                    }
                    })()
                  }
                                                  </span>
                                                ),
                                                accessor: "requireSize",
                                                Cell: row => {
                                                  return (
                                                    <div ref={this.setWrapperRef}>
                                                      <input
                                                        type="text"
                                                        id={
                                                          "requireSizeTxt" +
                                                          row.original
                                                            .articleNumber
                                                        }
                                                        className="order-input"
                                                        value={
                                                          row.original
                                                            .requireSize || ""
                                                        }
                                                        name="requiredSize"
                                                        autoComplete="off"
                                                        ref={input => {
                                                          this.searchInput = input;
                                                        }}
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
                    

                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.tickettitle
                      }
                    else{
                      return "Ticket Title:"
                    }
                    })()
                  }
                  </label>
                </div>
                <div className="row" style={{ marginTop: "0" }}>
                  <label className="label-2 mb-0">
                    {ticketDetailsData.ticketTitle}
                  </label>
                </div>
                <div className="row mt-3">
                  <label className="ticket-title-where mb-0">
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.ticketdetails
                      }
                    else{
                      return "Ticket Details:"
                    }
                    })()
                  }
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

                      <div
                        className={
                          this.state.isKB ? "dropdown iskbticket" : "dropdown"
                        }
                        style={{ display: "inherit" }}
                      >
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
                        className={
                          this.state.isKB ? "mob-float iskbticket" : "mob-float"
                        }
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
                      KB
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
                        <FontAwesomeIcon icon={faCalculator} /> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.template
                      }
                    else{
                      return "Template"
                    }
                    })()
                  }
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
                            onBlur={this.onCkBlur}
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
                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.to
                      }
                    else{
                      return "To"
                    }
                    })()
                  }: &nbsp;
                                {ticketDetailsData.customerEmailId}
                              </label>
                            </li>
                            <li>
                              <label className="">
                                <div className="input-group">
                                  <span className="input-group-addon inputcc">
                                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.cc
                      }
                    else{
                      return "CC"
                    }
                    })()
                  }:
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
                                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.bcc
                      }
                    else{
                      return "BCC"
                    }
                    })()
                  }:
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
                                  <span> {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.informstore
                      }
                    else{
                      return "Inform Store"
                    }
                    })()
                  }</span>
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
                                {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.send
                      }
                    else{
                      return "Send"
                    }
                    })()
                  }
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
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.h5.knowledgebase
                      }
                    else{
                      return "KNOWLEDGE BASE"
                    }
                    })()
                  }
                          </h5>
                          <p>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.message
                      }
                    else{
                      return "Message"
                    }
                    })()
                  }</p>

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
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.copy
                      }
                    else{
                      return "Copy"
                    }
                    })()
                  }
                                      </a>
                                    </CopyToClipboard>
                                    {this.state.copied ? (
                                      <span
                                        className="ml-2"
                                        style={{ color: "red" }}
                                      >
                                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.copied
                      }
                    else{
                      return "Copied"
                    }
                    })()
                  }.
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
                          <h5>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.h5.KBtemplate
                      }
                    else{
                      return "KB Template"
                    }
                    })()
                  }</h5>
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
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.searchpolicy
                      }
                    else{
                      return "Search Policy"
                    }
                    })()
                  }
                            </button>
                          </div>
                          <div style={{ marginTop: "275px" }}>
                            <a
                              href="#!"
                              className="copyblue-kbtext d-inline-block"
                            >
                              {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.viewpolicy
                      }
                    else{
                      return "VIEW POLICY"
                    }
                    })()
                  }
                              <img
                                src={ViewBlue}
                                alt="viewpolicy"
                                className="viewpolicy-kb"
                              />
                            </a>
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
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.message
                      }
                    else{
                      return "Message"
                    }
                    })()
                  }:{" "}
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
                             {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.notes
                      }
                    else{
                      return "Notes"
                    }
                    })()
                  }:{" "}
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
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.task
                      }
                    else{
                      return "Task"
                    }
                    })()
                  }:{" "}
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
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.claim
                      }
                    else{
                      return "Claim"
                    }
                    })()
                  }:{" "}
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
                    style={{ margin: "10px 0 30px" }}
                  >
                    <div className="row message-header">
                      <div className="col-12 col-xs-12 col-sm-3">
                        <label className="user-label">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.user
                      }
                    else{
                      return "User"
                    }
                    })()
                  }</label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-7">
                        <label className="message-label">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.message
                      }
                    else{
                      return "Message"
                    }
                    })()
                  }</label>
                      </div>
                      <div className="col-12 col-xs-12 col-sm-2">
                        <label className="action-label">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.action
                      }
                    else{
                      return "Action"
                    }
                    })()
                  }</label>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-2 col-md-12 mob-flex">
                      <div
                        className={
                          this.state.isKB
                            ? "inlineGridTicket iskbticket"
                            : "inlineGridTicket"
                        }
                      >
                        <a
                          href="#!"
                          className="comment-text"
                          onClick={this.handleFreeTextCommentOpen.bind(this)}
                        >
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.comment
                      }
                    else{
                      return "Comment"
                    }
                    })()
                  }
                        </a>
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
                                //
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
                                            ) : (
                                              <>
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
                                              </>
                                            )}

                                            <div>
                                              <label
                                                className="solved-by-naman-r mt-0"
                                                style={{
                                                  marginLeft: "7px"
                                                }}
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
                                                  
                                                   {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.reassignto
                      }
                    else{
                      return "Reassign to"
                    }
                    })()
                  }
                                                   &nbsp;
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
                                            .isSystemGenerated ===
                                          true ? null : (
                                            <>
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
                                            </>
                                          )}

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
                                            style={{
                                              display: "inline-block"
                                            }}
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

                                          <div
                                            className={
                                              this.state.isKB
                                                ? "inlineGridTicket iskbticket"
                                                : "inlineGridTicket"
                                            }
                                          >
                                            {details.latestMessageDetails
                                              .isCustomerComment === 1 ? (
                                              <a
                                                href="#!"
                                                className="reply-comment"
                                                onClick={this.hanldeCommentOpen2.bind(
                                                  this,
                                                  details.latestMessageDetails
                                                    .mailID
                                                )}
                                              >
                                                 {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.reply
                      }
                    else{
                      return "Reply"
                    }
                    })()
                  }
                                              </a>
                                            ) : null}

                                            <a
                                              href="#!"
                                              className="comment-text"
                                              onClick={this.handleCommentCollapseOpen.bind(
                                                this,
                                                details.latestMessageDetails
                                                  .mailID
                                              )}
                                            >
                                               {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.comment
                      }
                    else{
                      return "Comment"
                    }
                    })()
                  }
                                            </a>
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
                            <label className="Commentlabel1">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.comment
                      }
                    else{
                      return "Comment"
                    }
                    })()
                  }</label>
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
                            onClick={this.setNotiCurPosiCmnt}
                          ></textarea>
                        </div>
                        {this.state.ticketcommentMSG.length === 0 && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px"
                            }}
                          >
                            {this.state.tckcmtMSGCompulsory}
                          </p>
                        )}
                        <div className="SendCommentBtn">
                          <button
                            className="SendCommentBtn1"
                            onClick={this.handleSendMailData.bind(this, 3)}
                          >
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.send
                      }
                    else{
                      return "SEND"
                    }
                    })()
                  }
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
                            <div className="tic-det-ck-user tic-det-ck-user-rply myticlist-expand-sect">
                              <select
                                className="add-select-category"
                                value="0"
                                onChange={this.setAssignedToValue.bind(
                                  this,
                                  "rply"
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
                                KB
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
                                   {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.templates
                      }
                    else{
                      return "Template"
                    }
                    })()
                  }
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
                          onBlur={this.onCkBlurReply}
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
                                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.to
                      }
                    else{
                      return "To"
                    }
                    })()
                  }: &nbsp;
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
                                    <span>{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.informstore
                      }
                    else{
                      return "Inform Store"
                    }
                    })()
                  }</span>
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
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.cc
                      }
                    else{
                      return "CC"
                    }
                    })()
                  }:
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
                                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.span.bcc
                      }
                    else{
                      return "BCC"
                    }
                    })()
                  }:
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
                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.send
                      }
                    else{
                      return "Send"
                    }
                    })()
                  }
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
                            <label className="Commentlabel1">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.comment
                      }
                    else{
                      return "Comment"
                    }
                    })()
                  }</label>
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
                            onClick={this.setNotiCurPosiFreeCmnt}
                          ></textarea>
                        </div>
                        {this.state.ticketFreeTextcomment.length === 0 && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px"
                            }}
                          >
                            {this.state.freetextCommentCompulsory}
                          </p>
                        )}
                        <div className="SendCommentBtn">
                          <button
                            className="SendCommentBtn1"
                            onClick={this.handleSendMailData.bind(this)}
                          >
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.send
                      }
                    else{
                      return "SEND"
                    }
                    })()
                  }
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
                      <div className={this.props.isKB ? "iskbticket" : ""}>
                        <MyTicketTask
                          callbackToParent={this.callbackToParent}
                          isKB={this.state.isKB}
                          taskData={{
                            TicketData: {
                              TicketId: this.state.ticket_Id,
                              // GridData: this.state.taskTableGrid,
                              TabActiveId: this.state.TaskTab
                            }
                          }}
                          // callBackTaskLenght={this.handleGetCountOfTabs(this.state.ticket_Id)}
                        />
                      </div>
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
                      <div
                        className={
                          this.props.isKB
                            ? "col-12 col-xs-12 col-sm-4 iskbticket"
                            : "col-12 col-xs-12 col-sm-4"
                        }
                      >
                        <textarea
                          className={
                            this.state.isKB
                              ? "Add-Notes-textarea iskbticket"
                              : "Add-Notes-textarea"
                          }
                          placeholder="Add Notes"
                          name="NoteAddComment"
                          value={this.state.NoteAddComment}
                          onChange={this.handleNoteOnChange}
                        ></textarea>
                        {this.state.NoteAddComment.length === 0 && (
                          <p
                            style={{
                              color: "red",
                              marginBottom: "0px"
                            }}
                          >
                            {this.state.notesCommentCompulsion}
                          </p>
                        )}
                        <button
                          type="button"
                          className={
                            this.state.isKB
                              ? "notesbtn notesbtn-text iskbticket"
                              : "notesbtn notesbtn-text"
                          }
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
                    <label className="profilemodal-text">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.name
                      }
                    else{
                      return "Name"
                    }
                    })()
                  }</label>
                    <label className="profilemodal-textval">
                      {ticketDetailsData.customerName}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <label className="profilemodal-text">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.mobile
                      }
                    else{
                      return "Mobile"
                    }
                    })()
                  }</label>
                    <label className="profilemodal-textval">
                      {ticketDetailsData.customerPhoneNumber}
                    </label>
                  </div>
                </div>
                <div className="row profilemodalrow-1">
                  <div className="col-md-6">
                    <label className="profilemodal-text">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.email
                      }
                    else{
                      return "Email"
                    }
                    })()
                  }</label>
                    <label className="profilemodal-textval">
                      {ticketDetailsData.customerEmailId}
                    </label>
                  </div>

                  <div className="col-md-6">
                    <label className="profilemodal-text">
                      
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.alternatenumber
                      }
                    else{
                      return "Alternate Number"
                    }
                    })()
                  }
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
                        
                         {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.openticket
                      }
                    else{
                      return "Open Tickets"
                    }
                    })()
                  }
                      </small>
                    </label>
                  </div>
                  <div className="openticketbox-2 profilemodalrow-1">
                    <label className="open-tickets-box-text">
                      {ticketDetailsData.totalticket}
                      <small className="open-tickets-box-textval">
                        
                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.totalticket
                      }
                    else{
                      return "Total Tickets"
                    }
                    })()
                  }
                      </small>
                    </label>
                  </div>
                </div>
                <div className="row profilemodal-row-3">
                  <img src={CustomerIcon} alt="customer-icon" />
                  <label className="full-profile-view-text">
                    
                    
                        {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.fullprofileview
                      }
                    else{
                      return "FULL PROFILE VIEW"
                    }
                    })()
                  }
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
                      
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.subjectneedtochange
                      }
                    else{
                      return "Subject: Need to change m..."
                    }
                    })()
                  }
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
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.subjectneedtochange
                      }
                    else{
                      return "Subject: Need to change m..."
                    }
                    })()
                  }
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
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.subjectneedtochange
                      }
                    else{
                      return "Subject: Need to change m..."
                    }
                    })()
                  }
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
                      {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.subjectneedtochange
                      }
                    else{
                      return "Subject: Need to change m..."
                    }
                    })()
                  }
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
                    <label className="More">{
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.label.more
                      }
                    else{
                      return "More"
                    }
                    })()
                  }</label>
                    <span>
                      <img src={MoreUp} alt="Cancel" className="MoreUp" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* -------------------Start knowledge base modal pop up----------------------- */}
            <Modal
              open={this.state.KnowledgeBaseModal}
              onClose={this.hadnleCloseKnowledage.bind(this)}
              closeIconId="sdsg"
              modalId="Historical-popup"
              overlayId="logout-ovrly"
              classNames={{
                modal: "myticket-knowpopup"
              }}
            >
              <div className="commenttextborder">
                <div className="comment-disp">
                  <div></div>
                </div>
                <div className="Commentlabel">
                  <p className="Commentlabel1 mb-4 text-center">
                    
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.addthisticket
                      }
                    else{
                      return "Add this ticket in Knowledge Base?"
                    }
                    })()
                  }
                  </p>
                </div>
                <div className="SendCommentBtn mb-0" style={{ float: "left" }}>
                  <button
                    className="SendCommentBtn1"
                    onClick={this.handleYesNoClick.bind(this, false)}
                  >
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.no
                      }
                    else{
                      return "No"
                    }
                    })()
                  }
                  </button>
                </div>
                <div className="SendCommentBtn mb-0">
                  <button
                    className="SendCommentBtn1"
                    onClick={this.handleYesNoClick.bind(this, true)}
                  >
                    {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.button.yes
                      }
                    else{
                      return "Yes"
                    }
                    })()
                  }
                  </button>
                </div>
              </div>
            </Modal>
            {/* -------------------End knowledge base modal pop up----------------------- */}
          </div>
        )}
      </Fragment>
    );
  }
}
MyTicket.contextType = MyContext;
export default withRouter(MyTicket);
