import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sorting from "./../../../assets/Images/sorting.png";
import { Popover } from "antd";
// import Modal from "react-responsive-modal";
import ReactTable from "react-table";
// import "react-table/react-table.css";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import Demo from "./../../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import LetterBox from "./../../../assets/Images/SecuredLetter2.png";
import SmsImg from "./../../../assets/Images/Sms.png";
import NotificationImg from "./../../../assets/Images/Notification.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import { Checkbox } from "antd";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import CKEditor from "ckeditor4-react";
import Modal from "react-bootstrap/Modal";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      AddAlertTabsPopup: false,
      content: "",
      tabIndex: 0,
      innerTabIndex: 0,
      innerTabIndexNoti: 0,
      alert: [],
      updateAlertTypeName: "",
      updateAlertisActive: "",
      emailCust: false,
      emailInt: false,
      emailTicketing: false,
      notiTicketing: false,
      smsCust: false,
      notiInt: false,
      selectedAlertType: 0,
      selectedAlertTypeName: 0,
      selectedEmailCustomer: false,
      selectedEmailInternal: false,
      selectedEmailStore: false,
      selectedSMSCustomer: false,
      selectedNotifInternal: false,
      selectedNotifTicketing: false,
      selectedStatus: "true",
      selectedToCustomer: "",
      selectedCCCustomer: "",
      selectedBCCCustomer: "",
      selectedSubjectCustomer: "",
      selectedCKCustomer: "",
      selectedToInternal: "",
      selectedCCInternal: "",
      selectedBCCInternal: "",
      selectedSubjectInternal: "",
      selectedCKInternal: "",
      selectedToStore: "",
      selectedCCStore: "",
      selectedBCCStore: "",
      selectedSubjectStore: "",
      selectedCKStore: "",
      selectedSMSContent: "",
      selectedNotifContent: "",
      selectedNotifTicketingContent: "",
      alertTypeCompulsion: "",
      statusCompulsion: "",
      communicationModeCompulsion: "",
      toCustomerCompulsion: "",
      subjectCustomerCompulsion: "",
      ckCustomerCompulsion: "",
      toInternalCompulsion: "",
      subjectInternalCompulsion: "",
      ckInternalCompulsion: "",
      toStoreCompulsion: "",
      subjectStoreCompulsion: "",
      ckStoreCompulsion: "",
      SMSContentCompulsion: "",
      NotifContentCompulsion: "",
      NotifTicketingContentCompulsion: "",
      alertData: [],
      rowData: {},
      editAlertNameCopulsion: "Please enter alerttype name.",
      editModal: false,
      alertEdit: {},
      isEdit: false,
      editSaveLoading: false,
      editalertTypeCompulsion: "Please Enter Alert Type",
      sortAllData: [],
      sortAlertType: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortHeader: "",
      alertColor: "",
      createdColor: "",
      statusColor: "",
      sortColumn: "",
      StatusModel: false,
      editcommunicationModeCompulsion: "",
      AssignToData: [],
      isExitsType: "",
      placeholderData: [],
      cAlertTypeId: 0,
      sAlertTypeId: 0,
      iAlertTypeId: 0,
      nAlertTypeId: 0,
      ntAlertTypeId: 0,
      placeholderShown: false,
      tempalert: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFilterAlertType: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      salertTypeNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisAlertActiveFilterCheckbox: "",
      ckCusrsorPositionCustomer: 0,
      ckCusrsorDataCustomer: "",
      ckCusrsorPositionInternal: 0,
      ckCusrsorDataInternal: "",
      ckCusrsorPositionStore: 0,
      ckCusrsorDataStore: "",
      notiCount: 0,
      notiCurPosi: 0,
      viewEmailCustomer: false,
      viewEmailInternal: false,
      viewEmailStore: false,
      viewSMSCustomer: false,
      viewNotifInternal: false,
      viewNotifTicketing: false,
    };
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddAlertTabsOpen = this.handleAddAlertTabsOpen.bind(this);
    this.handleAddAlertTabsClose = this.handleAddAlertTabsClose.bind(this);
    this.handleGetAlert = this.handleGetAlert.bind(this);
    this.handleUpdateAlertTypeName = this.handleUpdateAlertTypeName.bind(this);
    this.handleInsertAlert = this.handleInsertAlert.bind(this);
    this.handleAlertData = this.handleAlertData.bind(this);
    this.handleUpdateAlert = this.handleUpdateAlert.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    // this.handleAlertTabs = this.handleAlertTabs.bind(this);
    this.handlePlaceholderList = this.handlePlaceholderList.bind(this);
  }

  componentDidMount() {
    this.handleGetAlert();
    this.handleAlertData();
    this.handleGetAgentList();
  }

  handlePlaceholderList(alertId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetMailParameter",
      headers: authHeader(),
      params: {
        AlertID: alertId,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            placeholderData: data,
            placeholderShown: true,
          });
        } else {
          self.setState({
            placeholderData: [],
            placeholderShown: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setPlaceholderValue(type, e) {
    debugger;
    let matchedArr = this.state.placeholderData.filter(
      (x) => x.mailParameterID == e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    if (type == "Customer") {
      let ckData = this.state.selectedCKCustomer;
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
          if (
            this.state.ckCusrsorDataCustomer.trim() == ckDataArrNew[i].trim()
          ) {
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
        this.state.ckCusrsorPositionCustomer
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionCustomer,
        ckDataArrLast.length
      );
      // let ckDataArrLast = ckDataArr.pop();
      // let ckTags = ckDataArrLast.match(/<[^>]+>/g);
      // let ck = ckDataArrLast.replace(/<[^>]+>/g, "");
      // ck += placeholderName;
      ckDataArrLast = textBefore + " " + placeholderName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionCustomer + placeholderName.length + 1;
      this.setState({
        ckCusrsorPositionCustomer: newCkCusrsorPosition,
        ckCusrsorDataCustomer: ckDataArrLast,
      });
      if (ckTags) {
        // let ckFinal = ckTags[0] + ck + ckTags[1];
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        // ckDataArr.push(ckFinal);
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ selectedCKCustomer: ckData });
      } else {
        this.setState({ selectedCKCustomer: ckDataArrLast });
      }
    } else if (type == "Internal") {
      let ckData = this.state.selectedCKInternal;
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
          if (
            this.state.ckCusrsorDataInternal.trim() == ckDataArrNew[i].trim()
          ) {
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
        this.state.ckCusrsorPositionInternal
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionInternal,
        ckDataArrLast.length
      );
      // let ckDataArrLast = ckDataArr.pop();
      // let ckTags = ckDataArrLast.match(/<[^>]+>/g);
      // let ck = ckDataArrLast.replace(/<[^>]+>/g, "");
      // ck += placeholderName;
      ckDataArrLast = textBefore + " " + placeholderName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionInternal + placeholderName.length + 1;
      this.setState({
        ckCusrsorPositionInternal: newCkCusrsorPosition,
        ckCusrsorDataInternal: ckDataArrLast,
      });
      if (ckTags) {
        // let ckFinal = ckTags[0] + ck + ckTags[1];
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        // ckDataArr.push(ckFinal);
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ selectedCKInternal: ckData });
      } else {
        this.setState({ selectedCKInternal: ckDataArrLast });
      }
    } else if (type == "Ticketing") {
      let ckData = this.state.selectedCKStore;
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
          if (this.state.ckCusrsorDataStore.trim() == ckDataArrNew[i].trim()) {
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
        this.state.ckCusrsorPositionStore
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionStore,
        ckDataArrLast.length
      );
      // let ckDataArrLast = ckDataArr.pop();
      // let ckTags = ckDataArrLast.match(/<[^>]+>/g);
      // let ck = ckDataArrLast.replace(/<[^>]+>/g, "");
      // ck += placeholderName;
      ckDataArrLast = textBefore + " " + placeholderName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionStore + placeholderName.length + 1;
      this.setState({
        ckCusrsorPositionStore: newCkCusrsorPosition,
        ckCusrsorDataStore: ckDataArrLast,
      });
      if (ckTags) {
        // let ckFinal = ckTags[0] + ck + ckTags[1];
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        // ckDataArr.push(ckFinal);
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ selectedCKStore: ckData });
      } else {
        this.setState({ selectedCKStore: ckDataArrLast });
      }
    } else if (type == "Notification") {
      // let startPoint = document.getElementById("notifiPlaceholder").selectionStart;
      // let textLength = document.getElementById("notifiPlaceholder").value.length;
      let textBefore = this.state.selectedNotifContent.substring(
        0,
        this.state.notiCurPosi
      );
      let textAfter = this.state.selectedNotifContent.substring(
        this.state.notiCurPosi,
        this.state.notiCount
      );
      // let ckData = this.state.selectedNotifContent;
      // ckData += placeholderName;
      let ckData = textBefore + " " + placeholderName + textAfter;
      let notiCurPosi = textBefore.length + placeholderName.length + 1;
      let notiCount =
        textBefore.length + placeholderName.length + 1 + textAfter.length;
      // document.getElementById("notifiPlaceholder").setSelectionRange(abc,abc);
      this.setState({ selectedNotifContent: ckData, notiCurPosi, notiCount });
    }
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      hierarchyData: itemsArray,
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      hierarchyData: itemsArray,
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data, header) {
    debugger;

    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (
      this.state.sortFilterAlertType.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "alertTypeName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sisAlertActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sisAlertActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.salertTypeNameFilterCheckbox !== "" ||
        this.state.sisAlertActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          salertTypeNameFilterCheckbox: "",
          sisAlertActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "isAlertActive") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.salertTypeNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          salertTypeNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  onCkBlurCustomer = (evt) => {
    debugger;
    var ckCusrsorPositionCustomer = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataCustomer = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataCustomer) {
      ckCusrsorDataCustomer = "";
    }
    this.setState({
      ckCusrsorPositionCustomer: ckCusrsorPositionCustomer.startOffset,
      ckCusrsorDataCustomer,
    });
  };
  onCkBlurInternal = (evt) => {
    debugger;
    var ckCusrsorPositionInternal = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataInternal = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataInternal) {
      ckCusrsorDataInternal = "";
    }
    this.setState({
      ckCusrsorPositionInternal: ckCusrsorPositionInternal.startOffset,
      ckCusrsorDataInternal,
    });
  };
  onCkBlurStore = (evt) => {
    debugger;
    var ckCusrsorPositionStore = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataStore = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataStore) {
      ckCusrsorDataStore = "";
    }
    this.setState({
      ckCusrsorPositionStore: ckCusrsorPositionStore.startOffset,
      ckCusrsorDataStore,
    });
  };
  StatusCloseModel = (e) => {
    if (this.state.tempalert.length > 0) {
      this.setState({
        StatusModel: false,
        alert: this.state.tempalert,

        filterTxtValue: "",
      });
      if (this.state.sortColumn === "alertTypeName") {
        if (this.state.salertTypeNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sisAlertActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            salertTypeNameFilterCheckbox: "",
            sisAlertActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "isAlertActive") {
        if (this.state.sisAlertActiveFilterCheckbox === "") {
        } else {
          this.setState({
            salertTypeNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        alert: this.state.sortAllData,

        filterTxtValue: "",
      });
    }
  };

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var salertTypeNameFilterCheckbox = this.state.salertTypeNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sisAlertActiveFilterCheckbox = this.state.sisAlertActiveFilterCheckbox;

    if (column === "alertTypeName" || column === "all") {
      if (type === "value" && type !== "All") {
        salertTypeNameFilterCheckbox = salertTypeNameFilterCheckbox.replace(
          "all",
          ""
        );
        salertTypeNameFilterCheckbox = salertTypeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (salertTypeNameFilterCheckbox.includes(e.currentTarget.value)) {
          salertTypeNameFilterCheckbox = salertTypeNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          salertTypeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (salertTypeNameFilterCheckbox.includes("all")) {
          salertTypeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "alertTypeName") {
            for (let i = 0; i < this.state.sortAlertType.length; i++) {
              salertTypeNameFilterCheckbox +=
                this.state.sortAlertType[i].alertTypeName + ",";
            }
            salertTypeNameFilterCheckbox += "all";
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
            e.currentTarget.value + ",",
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
            for (let i = 0; i < this.state.sortCreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "isAlertActive" || column === "all") {
      if (type === "value" && type !== "All") {
        sisAlertActiveFilterCheckbox = sisAlertActiveFilterCheckbox.replace(
          "all",
          ""
        );
        sisAlertActiveFilterCheckbox = sisAlertActiveFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sisAlertActiveFilterCheckbox.includes(e.currentTarget.value)) {
          sisAlertActiveFilterCheckbox = sisAlertActiveFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sisAlertActiveFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sisAlertActiveFilterCheckbox.includes("all")) {
          sisAlertActiveFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "isAlertActive") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sisAlertActiveFilterCheckbox +=
                this.state.sortStatus[i].isAlertActive + ",";
            }
            sisAlertActiveFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      salertTypeNameFilterCheckbox,
      screatedByFilterCheckbox,
      sisAlertActiveFilterCheckbox,
      alertColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "alertTypeName") {
      var sItems = salertTypeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.alertTypeName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        alertColor: "sort-column",
      });
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
      this.setState({
        createdColor: "sort-column",
      });
    } else if (column === "isAlertActive") {
      var sItems = sisAlertActiveFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.isAlertActive === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        statusColor: "sort-column",
      });
    }

    this.setState({
      tempalert: itemsArray,
    });
    // this.StatusCloseModel();
  };

  callBackEdit = (alertTypeName, isAlertActive, rowData) => {
    debugger;

    this.state.updateAlertTypeName = alertTypeName;
    this.state.updateAlertisActive = isAlertActive;
    this.state.rowData = rowData;
  };
  setNotiCurPosi = (e) => {
    debugger;
    this.setState({
      notiCurPosi: e.target.selectionStart,
    });
  };
  setDataOnChangeAlert = (e) => {
    debugger;
    if (e.target.name == "selectedAlertType") {
      if (e.target.value !== "0") {
        this.setState({
          [e.target.name]: e.target.value,
          selectedAlertTypeName: e.target.selectedOptions[0].innerText,
        });
        this.handlePlaceholderList(e.target.value);
        let self = this;

        // validate whether alert exists or not
        axios({
          method: "post",
          url: config.apiUrl + "/Alert/ValidateStoreAlertNameExist",
          params: { alertTypeId: e.target.value },
          headers: authHeader(),
        })
          .then(function(res) {
            var data = res.data.responseData;
            var msg = res.data.message;
            var status = res.data.status;
            if (msg === "Success" && status == true) {
              if (data !== "Not Exist") {
                self.setState({ isExitsType: data });
              } else {
                self.setState({ isExitsType: "" });
              }
            } else {
              self.setState({ isExitsType: "" });
            }
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        this.setState({
          isExitsType: "",
          [e.target.name]: e.target.value,
          alertTypeCompulsion: "Please Enter Alert Type",
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name == "selectedNotifContent") {
      this.setState({
        notiCount: e.target.value.length,
        notiCurPosi: e.target.value.length,
      });
    }
  };

  setCKEditorCustomer = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKCustomer: newContent,
    });
  };
  setCKEditorInternal = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKInternal: newContent,
    });
  };
  setCKEditorStore = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKStore: newContent,
    });
  };

  // alert type dropdown list
  handleAlertData() {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Alert/BindStoreAlerts",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        var data = res.data.responseData;
        var msg = res.data.message;
        if (msg === "Success") {
          self.setState({
            alertData: data,
          });
        } else {
          self.setState({
            alertData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAlertTabs(createVal, e) {
    debugger;
    let check = e.target.checked;
    let val = e.target.value;
    if (check === true) {
      this.setState({
        [val]: true,
      });
    } else {
      this.setState({
        [val]: false,
      });
    }
    setTimeout(() => {
      if (
        this.state.emailCust ||
        this.state.emailInt ||
        this.state.emailTicketing
      ) {
        this.setState({
          tabIndex: 0,
        });
      } else if (this.state.smsCust) {
        this.setState({
          tabIndex: 1,
        });
      } else if (this.state.notiInt || this.state.notiTicketing) {
        this.setState({
          tabIndex: 2,
        });
      }
      if (this.state.emailCust) {
        this.setState({
          innerTabIndex: 0,
        });
      } else if (this.state.emailInt) {
        this.setState({
          innerTabIndex: 1,
        });
      } else if (this.state.emailTicketing) {
        this.setState({
          innerTabIndex: 2,
        });
      }
      if (this.state.notiInt) {
        this.setState({
          innerTabIndexNoti: 0,
        });
      } else if (this.state.notiTicketing) {
        this.setState({
          innerTabIndexNoti: 1,
        });
      }
    }, 100);
    if (val === "emailCust" && check === true) {
      this.state.selectedEmailCustomer = true;
      if (createVal && createVal == "1") {
        this.state.viewEmailCustomer = true;
      }
    } else if (val === "emailCust" && check === false) {
      this.state.selectedEmailCustomer = false;
      if (createVal && createVal == "1") {
        this.state.viewEmailCustomer = false;
      }
    }
    if (val === "emailInt" && check === true) {
      this.state.selectedEmailInternal = true;
      if (createVal && createVal == "1") {
        this.state.viewEmailInternal = true;
      }
    } else if (val === "emailInt" && check === false) {
      this.state.selectedEmailInternal = false;
      if (createVal && createVal == "1") {
        this.state.viewEmailInternal = false;
      }
    }
    if (val === "emailTicketing" && check === true) {
      this.state.selectedEmailStore = true;
      if (createVal && createVal == "1") {
        this.state.viewEmailStore = true;
      }
    } else if (val === "emailTicketing" && check === false) {
      this.state.selectedEmailStore = false;
      if (createVal && createVal == "1") {
        this.state.viewEmailStore = false;
      }
    }
    if (val === "smsCust" && check === true) {
      this.state.selectedSMSCustomer = true;
      if (createVal && createVal == "1") {
        this.state.viewSMSCustomer = true;
      }
    } else if (val === "smsCust" && check === false) {
      this.state.selectedSMSCustomer = false;
      if (createVal && createVal == "1") {
        this.state.viewSMSCustomer = false;
      }
    }
    if (val === "notiInt" && check === true) {
      this.state.selectedNotifInternal = true;
      if (createVal && createVal == "1") {
        this.state.viewNotifInternal = true;
      }
    } else if (val === "notiInt" && check === false) {
      this.state.selectedNotifInternal = false;
      if (createVal && createVal == "1") {
        this.state.viewNotifInternal = false;
      }
    }
    if (val === "notiTicketing" && check === true) {
      this.state.selectedNotifTicketing = true;
      if (createVal && createVal == "1") {
        this.state.viewNotifTicketing = true;
      }
    } else if (val === "notiTicketing" && check === false) {
      this.state.selectedNotifTicketing = false;
      if (createVal && createVal == "1") {
        this.state.viewNotifTicketing = false;
      }
    }
  }

  handleGetAlert(id) {
    debugger;
    var alertId = 0;
    if (id) {
      alertId = id;
    } else {
      alertId = 0;
    }
    this.handlePlaceholderList(alertId);
    debugger;
    let self = this;

    // alert grid data
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/GetStoreAlertList",
      headers: authHeader(),
      params: { alertId: alertId },
    })
      .then(function(res) {
        debugger;
        let alert = res.data.responseData;
        var data = res.data.responseData;
        if (id) {
          var data = alert[0].alertContent;
          var selectedSubjectCustomer = "";
          var selectedCKCustomer = "";
          var selectedSubjectInternal = "";
          var selectedCKInternal = "";
          var selectedSubjectStore = "";
          var selectedCKStore = "";
          var selectedSMSContent = "";
          var selectedNotifContent = "";
          var selectedNotifTicketingContent = "";
          var emailCust = false;
          var emailInt = false;
          var emailTicketing = false;
          var notiTicketing = false;
          var smsCust = false;
          var notiInt = false;
          var alertEdit = {};
          var cAlertTypeId = 0;
          var sAlertTypeId = 0;
          var iAlertTypeId = 0;
          var smAlertTypeId = 0;
          var nAlertTypeId = 0;
          var ntAlertTypeId = 0;
          alertEdit.alertIsActive = res.data.responseData[0].isAlertActive;
          alertEdit.selectedAlertType = res.data.responseData[0].alertID;
          alertEdit.AlertTypeName = res.data.responseData[0].alertTypeName;

          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].isEmailCustomer) {
                emailCust = data[i].isEmailCustomer;
                selectedSubjectCustomer = data[i].subject;
                selectedCKCustomer = data[i].mailContent;
                cAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isEmailInternal) {
                emailInt = data[i].isEmailInternal;
                selectedSubjectInternal = data[i].subject;
                selectedCKInternal = data[i].mailContent;
                iAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isEmailTicketing) {
                emailTicketing = data[i].isEmailTicketing;
                selectedSubjectStore = data[i].subject;
                selectedCKStore = data[i].mailContent;
                sAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isSMSCustomer) {
                smsCust = data[i].isSMSCustomer;
                selectedSMSContent = data[i].smsContent;
                smAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isNotificationInternal) {
                notiInt = data[i].isNotificationInternal;
                selectedNotifContent = data[i].notificationContent;
                nAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isNotificationTicketing) {
                notiTicketing = data[i].isNotificationTicketing;
                selectedNotifTicketingContent = data[i].notificationContent;
                ntAlertTypeId = data[i].alertTypeID;
              }
            }
          }

          self.setState({
            cAlertTypeId,
            sAlertTypeId,
            iAlertTypeId,
            smAlertTypeId,
            nAlertTypeId,
            ntAlertTypeId,
            selectedSubjectCustomer,
            selectedCKCustomer,
            selectedSubjectInternal,
            selectedCKInternal,
            selectedSubjectStore,
            selectedCKStore,
            selectedSMSContent,
            selectedNotifContent,
            selectedNotifTicketingContent,
            emailCust,
            emailInt,
            emailTicketing,
            notiTicketing,
            smsCust,
            notiInt,
            alertEdit,
            editModal: true,
            isEdit: true,
          });
        } else {
          if (alert !== null && alert !== undefined) {
            self.setState({ alert });
          }
        }

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].alertTypeName]) {
              distinct.push(data[i].alertTypeName);
              unique[data[i].alertTypeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortAlertType.push({ alertTypeName: distinct[i] });
            self.state.sortFilterAlertType.push({ alertTypeName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy]) {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedBy.push({ createdBy: distinct[i] });
            self.state.sortFilterCreatedBy.push({ createdBy: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].isAlertActive]) {
              distinct.push(data[i].isAlertActive);
              unique[data[i].isAlertActive] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ isAlertActive: distinct[i] });
            self.state.sortFilterStatus.push({ isAlertActive: distinct[i] });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  // delete alert
  deleteAlert(deleteId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/DeleteStoreAlert",
      headers: authHeader(),
      params: {
        AlertID: deleteId,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Alert deleted successfully.");
          self.handleGetAlert();
        } else {
          NotificationManager.error("Alert not deleted.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleUpdateAlert() {
    debugger;
    if (this.state.alertEdit.selectedAlertType) {
      let AlertisActive;
      if (this.state.alertEdit.alertIsActive === "Active") {
        AlertisActive = true;
      } else if (this.state.alertEdit.alertIsActive === "InActive") {
        AlertisActive = false;
      }

      if (this.state.notiInt == true) {
        if (this.state.selectedNotifContent == "") {
          this.setState({
            NotifContentCompulsion: "Please Enter Notification.",
          });
        } else {
          this.setState({
            NotifContentCompulsion: "",
          });
        }
      }
      if (this.state.notiTicketing == true) {
        if (this.state.selectedNotifTicketingContent == "") {
          this.setState({
            NotifTicketingContentCompulsion: "Please Enter Notification.",
          });
        } else {
          this.setState({
            NotifTicketingContentCompulsion: "",
          });
        }
      }
      if (this.state.smsCust == true) {
        if (this.state.selectedSMSContent == "") {
          this.setState({ SMSContentCompulsion: "Please Enter Message." });
        } else {
          this.setState({ SMSContentCompulsion: "" });
        }
      }

      if (this.state.emailCust == true) {
        if (this.state.selectedCKCustomer === "") {
          this.setState({ ckCustomerCompulsion: "Please Enter Description." });
          // return false;
        } else {
          this.setState({ ckCustomerCompulsion: "" });
        }
        if (this.state.selectedSubjectCustomer === "") {
          this.setState({ subjectCustomerCompulsion: "Please Enter Subject." });
          // return false;
        } else {
          this.setState({ subjectCustomerCompulsion: "" });
        }
      }

      if (this.state.emailInt == true) {
        if (this.state.selectedCKInternal === "") {
          this.setState({ ckInternalCompulsion: "Please Enter Subject." });
          // return false;
        } else {
          this.setState({ ckInternalCompulsion: "" });
        }
        if (this.state.selectedSubjectInternal === "") {
          this.setState({
            subjectInternalCompulsion: "Please Enter Description.",
          });
          // return false;
        } else {
          this.setState({ subjectInternalCompulsion: "" });
        }
      }

      if (this.state.emailTicketing == true) {
        if (this.state.selectedCKStore === "") {
          this.setState({ ckStoreCompulsion: "Please Enter Subject." });

          // return false;
        } else {
          this.setState({ ckStoreCompulsion: "" });
        }
        if (this.state.selectedSubjectStore === "") {
          this.setState({
            subjectStoreCompulsion: "Please Enter Description.",
          });

          // return false;
        } else {
          this.setState({ subjectStoreCompulsion: "" });
        }
      }
      var CommunicationModeDetails = [];

      var emailCustomer = {
        Communication_Mode: 240,
        CommunicationFor: 250,
        AlertTypeID: this.state.cAlertTypeId,
        Content: this.state.selectedCKCustomer,
        Subject: this.state.selectedSubjectCustomer,
      };
      var emailInternal = {
        Communication_Mode: 240,
        CommunicationFor: 251,
        AlertTypeID: this.state.iAlertTypeId,
        Content: this.state.selectedCKInternal,
        Subject: this.state.selectedSubjectInternal,
      };
      var emailTicketing = {
        Communication_Mode: 240,
        CommunicationFor: 253,
        AlertTypeID: this.state.sAlertTypeId,
        Content: this.state.selectedCKStore,
        Subject: this.state.selectedSubjectStore,
      };
      var sms = {
        Communication_Mode: 241,
        CommunicationFor: 250,
        AlertTypeID: this.state.sAlertTypeId,
        Content: this.state.selectedSMSContent,
      };
      var notification = {
        Communication_Mode: 242,
        CommunicationFor: 251,
        AlertTypeID: this.state.nAlertTypeId,
        Content: this.state.selectedNotifContent,
      };
      var notificationTicketing = {
        Communication_Mode: 242,
        CommunicationFor: 253,
        AlertTypeID: this.state.ntAlertTypeId,
        Content: this.state.selectedNotifTicketingContent,
      };
      if (this.state.emailCust) {
        CommunicationModeDetails.push(emailCustomer); //// for Email For Customer
      } else {
        // return false;
      }
      if (this.state.emailInt) {
        CommunicationModeDetails.push(emailInternal); //// for Email for Internal
      } else {
        // return false;
      }
      if (this.state.emailTicketing) {
        CommunicationModeDetails.push(emailTicketing); //// for Email for Ticketing
      } else {
        // return false;
      }
      if (this.state.smsCust) {
        CommunicationModeDetails.push(sms); /// for SMS
      } else {
        // return false;
      }
      if (this.state.notiInt) {
        CommunicationModeDetails.push(notification); ////for Notification
      } else {
        // return false;
      }
      if (this.state.notiTicketing) {
        CommunicationModeDetails.push(notificationTicketing); ////for Notification for Ticketing
      } else {
        // return false;
      }
      // this.setState({
      //   editSaveLoading: true,
      // });

      let self = this;

      // update alert
      setTimeout(() => {
        if (
          this.state.subjectCustomerCompulsion === "" &&
          this.state.ckCustomerCompulsion === "" &&
          this.state.subjectInternalCompulsion === "" &&
          this.state.ckInternalCompulsion === "" &&
          this.state.subjectStoreCompulsion === "" &&
          this.state.ckStoreCompulsion === "" &&
          this.state.SMSContentCompulsion === "" &&
          this.state.NotifContentCompulsion === "" &&
          this.state.NotifTicketingContentCompulsion === ""
        ) {
          this.setState({
            editSaveLoading: true,
          });

          axios({
            method: "post",
            url: config.apiUrl + "/Alert/ModifyStoreAlert",
            headers: authHeader(),
            data: {
              AlertID: this.state.alertEdit.selectedAlertType,
              AlertTypeName: this.state.alertEdit.AlertTypeName,
              isAlertActive: AlertisActive,
              CommunicationModeDetails: CommunicationModeDetails,
            },
          })
            .then((res) => {
              debugger;
              let status = res.data.message;
              if (status === "Success") {
                NotificationManager.success("Alert updated successfully.");
                self.handleGetAlert();
                self.setState({
                  AddAlertTabsPopup: false,
                  editSaveLoading: false,
                });
              } else {
                self.setState({
                  editSaveLoading: false,
                  AddAlertTabsPopup: false,
                });
                NotificationManager.error("Alert not updated.");
              }
            })
            .catch((data) => {
              self.setState({
                editSaveLoading: false,
                AddAlertTabsPopup: false,
              });
              console.log(data);
            });
        }
      }, 10);
    } else {
      NotificationManager.error("Alert not updated.");
      this.setState({
        editAlertNameCopulsion: "Please enter alerttype name.",
      });
    }
  }

  updateAlert(individualData) {
    debugger;
    this.handleGetAlert(individualData.alertID || 0);
  }

  handleUpdateAlertTypeName(e) {
    debugger;
    this.setState({
      updateAlertTypeName: e.target.value,
    });
  }
  handleUpdateAlertisActive = (e) => {
    let updateAlertisActive = e.currentTarget.value;
    this.setState({ updateAlertisActive });
  };
  fileUpload = (e) => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = (e) => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };
  handleAddAlertTabsOpen() {
    debugger;
    if (
      (this.state.selectedAlertType > 0 &&
        this.state.selectedStatus !== "" &&
        this.state.selectedEmailCustomer === true) ||
      this.state.selectedEmailInternal === true ||
      this.state.selectedEmailStore === true ||
      this.state.selectedSMSCustomer === true ||
      this.state.selectedNotifInternal === true ||
      this.state.selectedNotifTicketing === true
    ) {
      this.setState({ AddAlertTabsPopup: true });
      // this.setState({ AddAlertTabsPopup: true, tabIndex: 0 });
    } else {
      this.setState({
        alertTypeCompulsion: "Please Enter Alert Type",
        statusCompulsion: "Please Select Status",
        communicationModeCompulsion: "Please Select Any Communication Mode",
      });
    }
  }
  handleAddAlertTabsClose() {
    debugger;
    this.setState({
      AddAlertTabsPopup: false,
      subjectCustomerCompulsion: "",
      ckCustomerCompulsion: "",
      subjectInternalCompulsion: "",
      ckInternalCompulsion: "",
      subjectStoreCompulsion: "",
      ckStoreCompulsion: "",
      SMSContentCompulsion: "",
      selectedSubjectCustomer: "",
      selectedCKCustomer: "",
      selectedSubjectInternal: "",
      selectedCKInternal: "",
      selectedSubjectStore: "",
      selectedCKStore: "",

      selectedSMSContent: "",
      selectedNotifContent: "",
      selectedNotifTicketingContent: "",
      NotifContentCompulsion: "",
      NotifTicketingContentCompulsion: "",

      // emailCust: false,
      // emailInt: false,
      // emailTicketing: false,
      // notiTicketing: false,
      // smsCust: false,
      // notiInt: false,
      // viewEmailCustomer: false,
      // viewEmailInternal: false,
      // viewEmailStore: false,
      // viewSMSCustomer: false,
      // viewNotifInternal: false,
      // viewNotifTicketing: false,
      // isEdit: false
    });
  }
  updateContent(newContent) {
    this.setState({
      content: newContent,
    });
  }
  onChange(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent,
    });
  }
  handleTabChange(index) {
    debugger;
    this.setState({
      tabIndex: index,
    });
  }
  validationInsertAlert() {
    debugger;
    var checkboxvalue = [];
    var validation = [];
    if (this.state.selectedEmailCustomer === true) {
      checkboxvalue.push("1");
      if (
        this.state.selectedSubjectCustomer.length > 0 &&
        this.state.selectedCKCustomer.length > 0
      ) {
        validation.push("1");
      }
    }

    if (this.state.selectedEmailInternal === true) {
      checkboxvalue.push("1");
      if (
        this.state.selectedSubjectInternal.length > 0 &&
        this.state.selectedCKInternal.length > 0
      ) {
        validation.push("1");
      }
    }

    if (this.state.selectedEmailStore === true) {
      checkboxvalue.push("1");
      if (
        this.state.selectedSubjectStore.length > 0 &&
        this.state.selectedCKStore.length > 0
      ) {
        validation.push("1");
      }
    }

    if (this.state.selectedSMSCustomer === true) {
      checkboxvalue.push("1");
      if (this.state.selectedSMSContent.length > 0) {
        validation.push("1");
      }
    }

    if (this.state.selectedNotifInternal === true) {
      checkboxvalue.push("1");
      if (this.state.selectedNotifContent.length > 0) {
        validation.push("1");
      }
    }
    if (this.state.selectedNotifTicketing === true) {
      checkboxvalue.push("1");
      if (this.state.selectedNotifTicketingContent.length > 0) {
        validation.push("1");
      }
    }

    if (checkboxvalue.length === validation.length) {
      this.handleInsertAlert();
    } else {
      this.setState({
        toCustomerCompulsion: "Please Enter EmailID.",
        subjectCustomerCompulsion: "Please Enter Subject.",
        ckCustomerCompulsion: "Please Enter Description.",
        toInternalCompulsion: "Please Enter EmailID.",
        subjectInternalCompulsion: "Please Enter Subject.",
        ckInternalCompulsion: "Please Enter Description.",
        toStoreCompulsion: "Please Enter EmailID.",
        subjectStoreCompulsion: "Please Enter Subject.",
        ckStoreCompulsion: "Please Enter Description.",
        SMSContentCompulsion: "Please Enter Message.",
        NotifContentCompulsion: "Please Enter Notification",
        NotifTicketingContentCompulsion: "Please Enter Notification",
      });
    }
  }
  handleInsertAlert() {
    debugger;

    let self = this;
    var setstatus = false;
    var status = this.state.selectedStatus;
    if (status === "true") {
      setstatus = true;
    } else {
      setstatus = false;
    }

    var cust, inter, store, sms, notn, notnTicketing;
    var jsondata = [];

    cust = {
      Communication_Mode: 240,
      CommunicationFor: 250,
      Content: this.state.selectedCKCustomer,
      ToEmailID: this.state.selectedToCustomer,
      CCEmailID: this.state.selectedCCCustomer,
      BCCEmailID: this.state.selectedBCCCustomer,
      Subject: this.state.selectedSubjectCustomer,
    };
    inter = {
      Communication_Mode: 240,
      CommunicationFor: 251,
      Content: this.state.selectedCKInternal,
      ToEmailID: this.state.selectedToInternal,
      CCEmailID: this.state.selectedCCInternal,
      BCCEmailID: this.state.selectedBCCInternal,
      Subject: this.state.selectedSubjectInternal,
    };
    store = {
      Communication_Mode: 240,
      CommunicationFor: 253,
      Content: this.state.selectedCKStore,
      ToEmailID: this.state.selectedToStore,
      CCEmailID: this.state.selectedCCStore,
      BCCEmailID: this.state.selectedBCCStore,
      Subject: this.state.selectedSubjectStore,
    };
    sms = {
      Communication_Mode: 241,
      CommunicationFor: 250,
      Content: this.state.selectedSMSContent,
    };
    notn = {
      Communication_Mode: 242,
      CommunicationFor: 251,
      Content: this.state.selectedNotifContent,
    };
    notnTicketing = {
      Communication_Mode: 242,
      CommunicationFor: 253,
      Content: this.state.selectedNotifTicketingContent,
    };

    if (this.state.selectedEmailCustomer === true) {
      jsondata.push(cust);
    }
    if (this.state.selectedEmailInternal === true) {
      jsondata.push(inter);
    }
    if (this.state.selectedEmailStore === true) {
      jsondata.push(store);
    }
    if (this.state.selectedSMSCustomer === true) {
      jsondata.push(sms);
    }
    if (this.state.selectedNotifInternal === true) {
      jsondata.push(notn);
    }
    if (this.state.selectedNotifTicketing === true) {
      jsondata.push(notnTicketing);
    }
    var json = {
      AlertID: this.state.selectedAlertType,
      AlertTypeName: this.state.selectedAlertTypeName,
      isAlertActive: setstatus,
      CommunicationModeDetails: jsondata,
    };

    // create alert
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/CreateStoreAlert",
      headers: authHeader(),
      data: json,
    })
      .then(function(res) {
        debugger;
        let id = res.data.responseData;
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Record Saved successfully.");
          self.handleGetAlert();
          self.setState({
            selectedAlertTypeName: 0,
            selectedAlertType: 0,
            selectedStatus: true,
            emailCust: false,
            emailInt: false,
            emailTicketing: false,
            notiTicketing: false,
            smsCust: false,
            notiInt: false,
            selectedEmailCustomer: false,
            selectedEmailInternal: false,
            selectedEmailStore: false,
            selectedSMSCustomer: false,
            selectedNotifTicketing: false,
            selectedNotifInternal: false,
            subjectCustomerCompulsion: "",
            ckCustomerCompulsion: "",
            subjectInternalCompulsion: "",
            ckInternalCompulsion: "",
            subjectStoreCompulsion: "",
            ckStoreCompulsion: "",
            SMSContentCompulsion: "",
            NotifContentCompulsion: "",
            NotifTicketingContentCompulsion: "",
            viewEmailCustomer: false,
            viewEmailInternal: false,
            viewEmailStore: false,
            viewSMSCustomer: false,
            viewNotifInternal: false,
            viewNotifTicketing: false,
          });
        } else if (status === "Record Already Exists ") {
          NotificationManager.error("Record Already Exists.");
        }
        self.handleAddAlertTabsClose();
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleEditModal() {
    debugger;
    this.setState({ editModal: false, isEdit: false });
  }

  editAlertModalData(e) {
    debugger;
    const { name, value } = e.target;

    var data = this.state.alertEdit;
    if (name === "selectedAlertType") {
      if (value == "Select Alert") {
        var alertName = e.target.selectedOptions[0].innerText;
        data[name] = value;
        data["AlertTypeName"] = alertName;
        this.setState({ editalertTypeCompulsion: "Please Enter Alert Type" });
        this.setState({ alertEdit: data });
      } else {
        var alertName = e.target.selectedOptions[0].innerText;
        data[name] = value;
        this.handlePlaceholderList(value);
        data["AlertTypeName"] = alertName;
        this.setState({ editalertTypeCompulsion: "" });
        this.setState({ alertEdit: data });
      }
    } else {
      data[name] = value;
      this.setState({ alertEdit: data });
    }
  }
  handleOpenAdd() {
    debugger;
    if (this.state.alertEdit.AlertTypeName == "Select Alert") {
      this.setState({ editalertTypeCompulsion: "Please Enter Alert Type" });
    } else if (
      this.state.emailCust === false &&
      this.state.emailInt === false &&
      this.state.emailTicketing === false &&
      this.state.notiTicketing === false &&
      this.state.smsCust === false &&
      this.state.notiInt === false
    ) {
      this.setState({
        editcommunicationModeCompulsion: "Please Select Any Communication Mode",
      });
    } else {
      var innerTabIndex = 0,
        innerTabIndexNoti = 0;
      if (this.state.emailCust === true) {
        innerTabIndex = 0;
      } else if (this.state.emailInt === true) {
        innerTabIndex = 1;
      } else {
        innerTabIndex = 2;
      }
      if (this.state.notiInt === true) {
        innerTabIndexNoti = 0;
      } else if (this.state.notiTicketing === true) {
        innerTabIndexNoti = 1;
      }
      if (
        this.state.emailCust === true ||
        this.state.emailInt === true ||
        this.state.emailTicketing === true
      ) {
        this.setState({
          tabIndex: 0,
        });
      } else if (this.state.smsCust === true) {
        this.setState({
          tabIndex: 1,
        });
      } else {
        this.setState({
          tabIndex: 2,
        });
      }

      this.setState({
        AddAlertTabsPopup: true,
        editModal: false,
        innerTabIndex,
        innerTabIndexNoti,
      });
    }
  }

  ///handle get agent list
  handleGetAgentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data,
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AssignToData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ///handle on change
  setAssignedToValue(type, e) {
    debugger;
    if (type === "Customer") {
      let ckData = this.state.selectedCKCustomer;
      let matchedArr = this.state.AssignToData.filter(
        (x) => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ selectedCKCustomer: ckData });
    }
    if (type == "Internal") {
      let ckData = this.state.selectedCKInternal;
      let matchedArr = this.state.AssignToData.filter(
        (x) => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ selectedCKInternal: ckData });
    }
    if (type == "Ticketing") {
      let ckData = this.state.selectedCKStore;
      let matchedArr = this.state.AssignToData.filter(
        (x) => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ selectedCKStore: ckData });
    }
  }
  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "alertTypeName") {
      var sortFilterAlertType = matchSorter(
        this.state.sortAlertType,
        e.target.value,
        { keys: ["alertTypeName"] }
      );
      if (sortFilterAlertType.length > 0) {
        this.setState({ sortFilterAlertType });
      } else {
        this.setState({
          sortFilterAlertType: this.state.sortAlertType,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: this.state.sortCreatedBy,
        });
      }
    }
    if (this.state.sortColumn === "isAlertActive") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["isAlertActive"] }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: this.state.sortStatus,
        });
      }
    }
  }
  hanldeAddBulkUpload() {
    debugger;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;

      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);
      this.setState({ showProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Alert/BulkUploadUser",
        headers: authHeader(),
        data: formData,
        onUploadProgress: (ev = ProgressEvent) => {
          const progress = (ev.loaded / ev.total) * 100;
          this.updateUploadProgress(Math.round(progress));
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("File uploaded successfully.");
            self.setState({ fileName: "", fileSize: "", fileN: [] });
            self.handleAlertData();
          } else {
            self.setState({
              showProgress: false,
              isFileUploadFail: true,
              progressValue: 0,
            });
            NotificationManager.error("File not uploaded.");
          }
        })
        .catch((data) => {
          debugger;
          if (data.message) {
            this.setState({ showProgress: false, isFileUploadFail: true });
          }
          console.log(data);
        });
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file.",
      });
    }
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  handleDeleteBulkupload = (e) => {
    debugger;
    this.setState({
      fileN: [],
      fileName: "",
    });
    NotificationManager.success("File deleted successfully.");
  };
  render() {
    return (
      <React.Fragment>
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
            Alerts
          </Link>
        </div>
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn text-center">
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
                        this.state.salertTypeNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sisAlertActiveFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "alertTypeName"
                    ? this.state.sortFilterAlertType !== null &&
                      this.state.sortFilterAlertType.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.alertTypeName}
                            id={"fil-open" + item.alertTypeName}
                            value={item.alertTypeName}
                            checked={this.state.salertTypeNameFilterCheckbox.includes(
                              item.alertTypeName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "alertTypeName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.alertTypeName}>
                            <span className="table-btn table-blue-btn">
                              {item.alertTypeName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdBy"
                    ? this.state.sortFilterCreatedBy !== null &&
                      this.state.sortFilterCreatedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.createdBy}
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

                  {this.state.sortColumn === "isAlertActive"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.isAlertActive}
                            id={"fil-open" + item.isAlertActive}
                            value={item.isAlertActive}
                            checked={this.state.sisAlertActiveFilterCheckbox.includes(
                              item.isAlertActive
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "isAlertActive",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.isAlertActive}>
                            <span className="table-btn table-blue-btn">
                              {item.isAlertActive}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid">
          <div className="settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height alertsTable setting-table-des">
                  <ReactTable
                    data={this.state.alert}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.alertColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "alertTypeName",
                              "AlertType"
                            )}
                          >
                            Alert Type
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "alertTypeName",
                      },
                      {
                        Header: "Communication Mode",
                        accessor: "modeOfCommunication",
                        className: "communication-labelHeader",
                        sortable: false,
                        Cell: (row) => {
                          return (
                            <div>
                              {row.original.isByEmail === true && (
                                <img
                                  src={LetterBox}
                                  alt="Letter"
                                  className="alert-tableImge"
                                />
                              )}
                              {row.original.isBySMS === true && (
                                <img
                                  src={SmsImg}
                                  alt="Sms"
                                  className="alert-tableImge"
                                />
                              )}
                              {row.original.isByNotification === true && (
                                <img
                                  src={NotificationImg}
                                  alt="Notification"
                                  className="alert-tableImge"
                                />
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        id: "createdBy",
                        Header: (
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdBy",
                              "Created By"
                            )}
                          >
                            Created by
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <div>
                              <span>
                                {row.original.createdBy}
                                <Popover
                                  content={
                                    <>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By: {row.original.createdBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date:{" "}
                                          {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:{" "}
                                            {row.original.modifiedBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:{" "}
                                          {row.original.modifiedDate}
                                        </p>
                                      </div>
                                    </>
                                  }
                                  placement="bottom"
                                >
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
                        accessor: "createdBy",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "isAlertActive",
                              "Status"
                            )}
                          >
                            Status
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "isAlertActive",
                      },
                      {
                        Header: "Actions",
                        // accessor: "action",
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div className="d-flex general-popover popover-body">
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          Delete file?
                                        </p>
                                        <p className="mt-1 fs-12">
                                          Are you sure you want to delete this
                                          file?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                                          <button
                                            className="butn"
                                            onClick={this.deleteAlert.bind(
                                              this,
                                              row.original.alertID
                                            )}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
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

                                <button
                                  className="react-tabel-button"
                                  id="p-edit-pop-2"
                                >
                                  <label
                                    className="Table-action-edit-button-text"
                                    onClick={this.updateAlert.bind(
                                      this,
                                      row.original
                                    )}
                                  >
                                    EDIT
                                  </label>
                                </button>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                    minRows={1}
                  />
                  {/* 
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
                  </div> */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="right-sect-div">
                  <h3>Create ALERTS</h3>
                  <div className="div-cntr">
                    <label>Alert Type</label>

                    <select
                      className="add-select-category"
                      name="selectedAlertType"
                      value={this.state.selectedAlertType}
                      onChange={this.setDataOnChangeAlert}
                    >
                      <option value={0}>Select Alert</option>
                      {this.state.alertData !== null &&
                        this.state.alertData.map((item, i) => (
                          <option key={i} value={item.alertID}>
                            {item.alertTypeName}
                          </option>
                        ))}
                    </select>
                    {parseInt(this.state.selectedAlertType) === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.alertTypeCompulsion}
                      </p>
                    )}
                    {this.state.isExitsType !== "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.isExitsType}
                      </p>
                    )}
                  </div>
                  <h4>Communication Mode</h4>
                  {this.state.selectedEmailCustomer === false &&
                    this.state.selectedEmailInternal === false &&
                    this.state.selectedEmailStore === false &&
                    this.state.selectedSMSCustomer === false &&
                    this.state.selectedNotifTicketing === false &&
                    this.state.selectedNotifInternal === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.communicationModeCompulsion}
                      </p>
                    )}
                  <div className="div-cntr">
                    <label>Email</label>
                    <br />
                    <Checkbox
                      className="cre-str-alrt"
                      onChange={this.handleAlertTabs.bind(this, "1")}
                      value="emailCust"
                      checked={this.state.viewEmailCustomer}
                    >
                      Customer
                    </Checkbox>
                    <Checkbox
                      className="cre-str-alrt"
                      onChange={this.handleAlertTabs.bind(this, "1")}
                      value="emailInt"
                      checked={this.state.viewEmailInternal}
                    >
                      Internal
                    </Checkbox>
                    <Checkbox
                      className="cre-str-alrt"
                      onChange={this.handleAlertTabs.bind(this, "1")}
                      value="emailTicketing"
                      checked={this.state.viewEmailStore}
                    >
                      Ticketing
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>SMS</label>
                    <br />
                    <Checkbox
                      className="cre-str-alrt"
                      onChange={this.handleAlertTabs.bind(this, "1")}
                      value="smsCust"
                      checked={this.state.viewSMSCustomer}
                    >
                      Customer
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Notification</label>
                    <br />
                    <Checkbox
                      className="cre-str-alrt"
                      onChange={this.handleAlertTabs.bind(this, "1")}
                      value="notiInt"
                      checked={this.state.viewNotifInternal}
                    >
                      Internal
                    </Checkbox>
                    <Checkbox
                      className="cre-str-alrt"
                      onChange={this.handleAlertTabs.bind(this, "1")}
                      value="notiTicketing"
                      checked={this.state.viewNotifTicketing}
                    >
                      Ticketing
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select
                      name="selectedStatus"
                      value={this.state.selectedStatus}
                      onChange={this.setDataOnChangeAlert}
                    >
                      {/* <option value="">Select</option> */}
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                    {this.state.selectedStatus === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.statusCompulsion}
                      </p>
                    )}
                  </div>
                  <button
                    className="butn"
                    onClick={this.handleAddAlertTabsOpen}
                  >
                    Next
                  </button>
                  <Modal
                    size="lg"
                    className="big-modal-placeholder"
                    show={this.state.AddAlertTabsPopup}
                    onHide={this.handleAddAlertTabsClose}
                  >
                    <Modal.Header>
                      <div className="setting-tabs alert-tabs">
                        <ul
                          className="nav nav-tabs margin-Alerttab"
                          role="tablist"
                        >
                          {(this.state.emailCust ||
                            this.state.emailInt ||
                            this.state.emailTicketing) && (
                            <li className="nav-item">
                              <a
                                onClick={this.handleTabChange.bind(this, 0)}
                                className={`nav-link ${this.state.tabIndex ===
                                  0 && "active"}`}
                                data-toggle="tab"
                                href="#email-tab"
                                role="tab"
                                aria-controls="email-tab"
                                aria-selected="true"
                              >
                                Email
                              </a>
                            </li>
                          )}
                          {this.state.smsCust && (
                            <li className="nav-item">
                              <a
                                onClick={this.handleTabChange.bind(this, 1)}
                                className={`nav-link ${this.state.tabIndex ===
                                  1 && "active"}`}
                                data-toggle="tab"
                                href="#sms-tab"
                                role="tab"
                                aria-controls="sms-tab"
                                aria-selected="false"
                              >
                                SMS
                              </a>
                            </li>
                          )}
                          {(this.state.notiInt || this.state.notiTicketing) && (
                            <li className="nav-item">
                              <a
                                onClick={this.handleTabChange.bind(this, 2)}
                                className={`nav-link ${this.state.tabIndex ===
                                  2 && "active"}`}
                                data-toggle="tab"
                                href="#notification-tab"
                                role="tab"
                                aria-controls="notification-tab"
                                aria-selected="false"
                              >
                                Notification
                              </a>
                            </li>
                          )}
                        </ul>
                        <img
                          src={CancelImg}
                          alt="CancelImg"
                          className="cancelImg-alert"
                          onClick={this.handleAddAlertTabsClose.bind(this)}
                        />
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="tab-content">
                        {(this.state.emailCust ||
                          this.state.emailInt ||
                          this.state.emailTicketing) && (
                          <div
                            className={`tab-pane fade ${this.state.tabIndex ===
                              0 && "show active"}`}
                            id="email-tab"
                            role="tabpanel"
                            aria-labelledby="email-tab"
                          >
                            <div className="position-relative-alert">
                              <ul
                                className="nav alert-nav-tabs3"
                                role="tablist"
                              >
                                {this.state.emailCust && (
                                  <li className="nav-item">
                                    <a
                                      className={`nav-link ${this.state
                                        .innerTabIndex === 0 && "active"}`}
                                      data-toggle="tab"
                                      href="#customer-tab"
                                      role="tab"
                                      aria-controls="customer-tab"
                                      aria-selected="true"
                                    >
                                      Customer
                                    </a>
                                  </li>
                                )}
                                {this.state.emailInt && (
                                  <li className="nav-item">
                                    <a
                                      className={`nav-link ${this.state
                                        .innerTabIndex === 1 && "active"}`}
                                      data-toggle="tab"
                                      href="#Internal-tab"
                                      role="tab"
                                      aria-controls="Internal-tab"
                                      aria-selected="false"
                                    >
                                      Internal
                                    </a>
                                  </li>
                                )}
                                {this.state.emailTicketing && (
                                  <li className="nav-item">
                                    <a
                                      className={`nav-link ${this.state
                                        .innerTabIndex === 2 && "active"}`}
                                      data-toggle="tab"
                                      href="#ticket-tab"
                                      role="tab"
                                      aria-controls="ticket-tab"
                                      aria-selected="false"
                                    >
                                      Ticketing
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="tab-content p-0 alert-p1">
                              <div
                                className={`tab-pane fade ${this.state
                                  .innerTabIndex === 0 && "show active"}`}
                                id="customer-tab"
                                role="tabpanel"
                                aria-labelledby="customer-tab"
                              >
                                <label className="alert-main-popuplbl">
                                  Compose your Email
                                </label>
                                <div
                                  style={{ display: "none" }}
                                  className="div-padding-alert"
                                >
                                  <div className="form-group row">
                                    <label className="label-color-alert col-sm-auto">
                                      Subject
                                    </label>
                                    <div className="col-sm">
                                      <input
                                        type="text"
                                        className="textbox-email-editor text-box4 w-100 ml-0"
                                        name="selectedSubjectCustomer"
                                        value={
                                          this.state.selectedSubjectCustomer
                                        }
                                        onChange={this.setDataOnChangeAlert}
                                      />
                                      {this.state.selectedSubjectCustomer
                                        .length === 0 && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.subjectCustomerCompulsion}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser">
                                  <select
                                    className="add-select-category"
                                    value="0"
                                    onChange={this.setAssignedToValue.bind(
                                      this,
                                      "Customer"
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
                                </div> */}
                                {/* {this.state.placeholderShown && (
                                  <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser placeholder-alert">
                                    <select
                                      className="add-select-category"
                                      value="0"
                                      onChange={this.setPlaceholderValue.bind(
                                        this,
                                        "Customer"
                                      )}
                                    >
                                      <option value="0">Placeholders</option>
                                      {this.state.placeholderData !== null &&
                                        this.state.placeholderData.map(
                                          (item, i) => (
                                            <option
                                              key={i}
                                              value={item.mailParameterID}
                                            >
                                              {item.description}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                )} */}
                                <CKEditor
                                  content={this.state.content}
                                  name="selectedCKCustomer"
                                  data={this.state.selectedCKCustomer}
                                  onChange={this.setCKEditorCustomer}
                                  onBlur={this.onCkBlurCustomer}
                                  events={{
                                    items: this.fileUpload,
                                  }}
                                />
                                {this.state.selectedCKCustomer.length === 0 && (
                                  <p
                                    style={{
                                      color: "red",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {this.state.ckCustomerCompulsion}
                                  </p>
                                )}
                              </div>
                              <div
                                className={`tab-pane fade ${this.state
                                  .innerTabIndex === 1 && "show active"}`}
                                id="Internal-tab"
                                role="tabpanel"
                                aria-labelledby="Internal-tab"
                              >
                                <label className="alert-main-popuplbl">
                                  Compose your Email
                                </label>
                                <div
                                  style={{ display: "none" }}
                                  className="div-padding-alert"
                                >
                                  <div className="form-group row">
                                    <label className="label-color-alert col-sm-auto">
                                      Subject
                                    </label>
                                    <div className="col-sm">
                                      <input
                                        type="text"
                                        className="textbox-email-editor text-box4 w-100 ml-0"
                                        name="selectedSubjectInternal"
                                        value={
                                          this.state.selectedSubjectInternal
                                        }
                                        onChange={this.setDataOnChangeAlert}
                                      />
                                      {this.state.selectedSubjectInternal
                                        .length === 0 && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.subjectInternalCompulsion}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuserinter">
                                  <select
                                    className="add-select-category"
                                    value="0"
                                    onChange={this.setAssignedToValue.bind(
                                      this,
                                      "Internal"
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
                                </div> */}
                                {/* {this.state.placeholderShown && (
                                  <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser placeholder-alert placeholder-alert-2">
                                    <select
                                      className="add-select-category"
                                      value="0"
                                      onChange={this.setPlaceholderValue.bind(
                                        this,
                                        "Internal"
                                      )}
                                    >
                                      <option value="0">Placeholders</option>
                                      {this.state.placeholderData !== null &&
                                        this.state.placeholderData.map(
                                          (item, i) => (
                                            <option
                                              key={i}
                                              value={item.mailParameterID}
                                            >
                                              {item.description}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                )} */}

                                <CKEditor
                                  content={this.state.content}
                                  events={{
                                    items: this.fileUpload,
                                  }}
                                  name="selectedCKInternal"
                                  data={this.state.selectedCKInternal}
                                  onChange={this.setCKEditorInternal}
                                  onBlur={this.onCkBlurInternal}
                                />
                                {this.state.selectedCKInternal.length === 0 && (
                                  <p
                                    style={{
                                      color: "red",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {this.state.ckInternalCompulsion}
                                  </p>
                                )}
                              </div>
                              <div
                                className={`tab-pane fade ${this.state
                                  .innerTabIndex === 2 && "show active"}`}
                                id="ticket-tab"
                                role="tabpanel"
                                aria-labelledby="ticket-tab"
                              >
                                <label className="alert-main-popuplbl">
                                  Compose your Email
                                </label>
                                <div className="div-padding-alert">
                                  <div
                                    style={{ display: "none" }}
                                    className="form-group row"
                                  >
                                    <label className="label-color-alert col-sm-auto">
                                      Subject
                                    </label>
                                    <div className="col-sm">
                                      <input
                                        type="text"
                                        className="textbox-email-editor text-box4 w-100 ml-0"
                                        name="selectedSubjectStore"
                                        value={this.state.selectedSubjectStore}
                                        onChange={this.setDataOnChangeAlert}
                                      />
                                      {this.state.selectedSubjectStore
                                        .length === 0 && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.subjectStoreCompulsion}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuserinter">
                                  <select
                                    className="add-select-category"
                                    value="0"
                                    onChange={this.setAssignedToValue.bind(
                                      this,
                                      "Ticketing"
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
                                </div> */}
                                {/* {this.state.placeholderShown && (
                                  <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser placeholder-alert placeholder-alert-2">
                                    <select
                                      className="add-select-category"
                                      value="0"
                                      onChange={this.setPlaceholderValue.bind(
                                        this,
                                        "Ticketing"
                                      )}
                                    >
                                      <option value="0">Placeholders</option>
                                      {this.state.placeholderData !== null &&
                                        this.state.placeholderData.map(
                                          (item, i) => (
                                            <option
                                              key={i}
                                              value={item.mailParameterID}
                                            >
                                              {item.description}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                )} */}

                                <CKEditor
                                  content={this.state.content}
                                  events={{
                                    change: this.onChange,
                                    items: this.fileUpload,
                                  }}
                                  name="selectedCKStore"
                                  data={this.state.selectedCKStore}
                                  onChange={this.setCKEditorStore}
                                  onBlur={this.onCkBlurStore}
                                />
                                {this.state.selectedCKStore.length === 0 && (
                                  <p
                                    style={{
                                      color: "red",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {this.state.ckStoreCompulsion}
                                  </p>
                                )}
                                {/*<div className="div-button1">
                                <button
                                  className="butn-2"
                                  type="submit"
                                  id="sms-tab"
                                  onClick={this.handleTabChange.bind(this,1)}
                                  
                                >
                                  SAVE & NEXT
                                </button>
                              </div>*/}
                              </div>
                            </div>
                          </div>
                        )}
                        <div
                          id="sms-tab"
                          className={`tab-pane fade ${this.state.tabIndex ===
                            1 && "show active"}`}
                        >
                          <div className="sms-mainLabel alert-p1">
                            <label className="alert-main-popuplbl">
                              Compose your SMS
                            </label>
                            <textarea
                              rows="10"
                              className="text-areaModel"
                              name="selectedSMSContent"
                              value={this.state.selectedSMSContent}
                              onChange={this.setDataOnChangeAlert}
                            ></textarea>
                            {this.state.selectedSMSContent.length === 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.SMSContentCompulsion}
                              </p>
                            )}
                            {/*<div className="div-button1">
                              <button className="butn-2" type="submit" 
                              onClick={this.handleTabChange.bind(this,2)}
                              
                              >
                                SAVE & NEXT
                              </button>
                            </div>*/}
                          </div>
                        </div>
                        {(this.state.notiInt || this.state.notiTicketing) && (
                          <div
                            id="notification-tab"
                            className={`tab-pane fade ${this.state.tabIndex ===
                              2 && "show active"}`}
                          >
                            <div className="position-relative-alert">
                              <ul
                                className="nav alert-nav-tabs3"
                                role="tablist"
                              >
                                {this.state.notiInt && (
                                  <li className="nav-item">
                                    <a
                                      className={`nav-link ${this.state
                                        .innerTabIndexNoti === 0 && "active"}`}
                                      data-toggle="tab"
                                      href="#Internal-noti-tab"
                                      role="tab"
                                      aria-controls="Internal-noti-tab"
                                      aria-selected="false"
                                    >
                                      Internal
                                    </a>
                                  </li>
                                )}
                                {this.state.notiTicketing && (
                                  <li className="nav-item">
                                    <a
                                      className={`nav-link ${this.state
                                        .innerTabIndexNoti === 1 && "active"}`}
                                      data-toggle="tab"
                                      href="#ticket-noti-tab"
                                      role="tab"
                                      aria-controls="ticket-noti-tab"
                                      aria-selected="false"
                                    >
                                      Ticketing
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="tab-content p-0 alert-p1">
                              <div
                                className={`tab-pane fade ${this.state
                                  .innerTabIndexNoti === 0 && "show active"}`}
                                id="Internal-noti-tab"
                                role="tabpanel"
                                aria-labelledby="Internal-noti-tab"
                              >
                                <div className="sms-mainLabel alert-p1">
                                  <div className="noti-plchldr-cntr">
                                    <label className="alert-main-popuplbl">
                                      Compose your Notification
                                    </label>
                                    {/* <div className="tic-det-ck-user myticlist-expand-sect notification-placeholder">
                                    <select
                                      className="add-select-category"
                                      value="0"
                                      onChange={this.setPlaceholderValue.bind(
                                        this,
                                        "Notification"
                                      )}
                                    >
                                      <option value="0">Placeholders</option>
                                      {this.state.placeholderData !== null &&
                                        this.state.placeholderData.map(
                                          (item, i) => (
                                            <option
                                              key={i}
                                              value={item.mailParameterID}
                                            >
                                              {item.description}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div> */}
                                  </div>
                                  <textarea
                                    rows="10"
                                    className="text-areaModel"
                                    name="selectedNotifContent"
                                    value={this.state.selectedNotifContent}
                                    onChange={this.setDataOnChangeAlert}
                                    onClick={this.setNotiCurPosi}
                                    id="notifiPlaceholder"
                                  ></textarea>
                                  {this.state.selectedNotifContent.length ===
                                    0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.NotifContentCompulsion}
                                    </p>
                                  )}
                                  {/* <div className="div-button1">
                                <button className="butn-2" type="submit"
                              
                                >
                                  SAVE & NEXT
                                </button>
                                </div>*/}
                                </div>
                              </div>
                              <div
                                className={`tab-pane fade ${this.state
                                  .innerTabIndexNoti === 1 && "show active"}`}
                                id="ticket-noti-tab"
                                role="tabpanel"
                                aria-labelledby="ticket-noti-tab"
                              >
                                <div className="sms-mainLabel alert-p1">
                                  <div className="noti-plchldr-cntr">
                                    <label className="alert-main-popuplbl">
                                      Compose your Notification
                                    </label>
                                    {/* <div className="tic-det-ck-user myticlist-expand-sect notification-placeholder">
                                    <select
                                      className="add-select-category"
                                      value="0"
                                      onChange={this.setPlaceholderValue.bind(
                                        this,
                                        "Notification"
                                      )}
                                    >
                                      <option value="0">Placeholders</option>
                                      {this.state.placeholderData !== null &&
                                        this.state.placeholderData.map(
                                          (item, i) => (
                                            <option
                                              key={i}
                                              value={item.mailParameterID}
                                            >
                                              {item.description}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div> */}
                                  </div>
                                  <textarea
                                    rows="10"
                                    className="text-areaModel"
                                    name="selectedNotifTicketingContent"
                                    value={
                                      this.state.selectedNotifTicketingContent
                                    }
                                    onChange={this.setDataOnChangeAlert}
                                    onClick={this.setNotiCurPosi}
                                    id="notifiPlaceholder"
                                  ></textarea>
                                  {this.state.selectedNotifTicketingContent
                                    .length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {
                                        this.state
                                          .NotifTicketingContentCompulsion
                                      }
                                    </p>
                                  )}
                                  {/* <div className="div-button1">
                                <button className="butn-2" type="submit"
                              
                                >
                                  SAVE & NEXT
                                </button>
                                </div>*/}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="div-button1 alert-proper">
                          <button
                            className="butn-2"
                            type="submit"
                            disabled={this.state.editSaveLoading}
                            onClick={
                              this.state.isEdit
                                ? this.handleUpdateAlert.bind(this)
                                : this.validationInsertAlert.bind(this)
                            }
                          >
                            {this.state.editSaveLoading ? (
                              <FontAwesomeIcon
                                className="circular-loader"
                                icon={faCircleNotch}
                                spin
                              />
                            ) : (
                              ""
                            )}
                            SAVE
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                <div style={{ display: "none" }} className="right-sect-div">
                  <div
                    style={{ display: "none" }}
                    className="d-flex justify-content-between align-items-center pb-2"
                  >
                    <h3 className="pb-0">Bulk Upload1</h3>
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
                    // onChange={this.fileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    // onDrop={this.fileDrop}
                    // onDragOver={this.fileDragOver}
                    // onDragEnter={this.fileDragEnter}
                  >
                    <div className="file-icon">
                      <img src={FileUpload} alt="file-upload" />
                    </div>
                    <span>Add File</span> or Drop File here
                  </label>
                  {this.state.fileN.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.bulkuploadCompulsion}
                    </p>
                  )}
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
                                  <button
                                    className="butn"
                                    onClick={this.handleDeleteBulkupload}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                        <div>
                          <span className="file-size">
                            {this.state.fileSize}
                          </span>
                        </div>
                      </div>
                      {this.state.fileN.length > 0 &&
                      this.state.isFileUploadFail ? (
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <a
                              className="file-retry"
                              // onClick={this.hanldeAddBulkUpload.bind(this)}
                            >
                              Retry
                            </a>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
                          </div>
                        </div>
                      ) : null}
                      {this.state.showProgress ? (
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name pr-0">
                              {this.state.fileName}
                            </p>
                          </div>
                          <div>
                            <div className="d-flex align-items-center mt-2">
                              <ProgressBar
                                className="file-progress"
                                now={this.state.progressValue}
                              />
                              <div className="cancel-upload">
                                <img src={UploadCancel} alt="upload cancel" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                  {/* <button
                    className="butn"
                    onClick={this.hanldeAddBulkUpload.bind(this)}
                  >
                    ADD
                  </button> */}
                  <button className="butn">ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="EditModa"
          show={this.state.editModal}
          onHide={this.handleEditModal}
        >
          <div className="edtpadding right-sect-div">
            <div className="">
              <label className="popover-header-text">EDIT ALERTS</label>
            </div>

            <div className="div-cntr">
              <label>Alert Type</label>

              <select
                className="add-select-category disabled-input"
                name="selectedAlertType"
                value={this.state.alertEdit.selectedAlertType}
                onChange={this.editAlertModalData.bind(this)}
                disabled
              >
                <option>Select Alert</option>
                {this.state.alertData !== null &&
                  this.state.alertData.map((item, i) => (
                    <option key={i} value={item.alertID}>
                      {item.alertTypeName}
                    </option>
                  ))}
              </select>
              {this.state.alertEdit.AlertTypeName === "Select Alert" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.editalertTypeCompulsion}
                </p>
              )}
            </div>
            <h4>Communication Mode</h4>
            {this.state.emailCust === false &&
              this.state.emailTicketing === false &&
              this.state.notiTicketing === false &&
              this.state.emailInt === false &&
              this.state.smsCust === false &&
              this.state.notiInt === false && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.editcommunicationModeCompulsion}
                </p>
              )}
            <div className="div-cntr">
              <label>Email</label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs.bind(this, "")}
                checked={this.state.emailCust}
                value="emailCust"
              >
                Customer
              </Checkbox>
              <Checkbox
                onChange={this.handleAlertTabs.bind(this, "")}
                checked={this.state.emailInt}
                value="emailInt"
              >
                Internal
              </Checkbox>
              <Checkbox
                onChange={this.handleAlertTabs.bind(this, "")}
                checked={this.state.emailTicketing}
                value="emailTicketing"
              >
                Ticketing
              </Checkbox>
            </div>
            <div className="div-cntr">
              <label>SMS</label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs.bind(this, "")}
                checked={this.state.smsCust}
                value="smsCust"
              >
                Customer
              </Checkbox>
            </div>
            <div className="div-cntr">
              <label>Notification</label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs.bind(this, "")}
                checked={this.state.notiInt}
                value="notiInt"
              >
                Internal
              </Checkbox>
              <Checkbox
                onChange={this.handleAlertTabs.bind(this, "")}
                checked={this.state.notiTicketing}
                value="notiTicketing"
              >
                Ticketing
              </Checkbox>
            </div>

            <div className="div-cntr">
              <label>Status</label>
              <select
                name="alertIsActive"
                value={this.state.alertEdit.alertIsActive}
                onChange={this.editAlertModalData.bind(this)}
              >
                {/* <option value="">Select</option> */}
                <option value={"Active"}>Active</option>
                <option value={"InActive"}>Inactive</option>
              </select>
              {this.state.selectedStatus === "" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.statusCompulsion}
                </p>
              )}
            </div>

            <br />
            <div className="text-center">
              <span className="pop-over-cancle" onClick={this.handleEditModal}>
                CANCEL
              </span>
              <button
                className="pop-over-button FlNone"
                onClick={this.handleOpenAdd.bind(this)}
              >
                SAVE
              </button>
            </div>
          </div>
        </Modal>
        {/* <NotificationContainer /> */}
      </React.Fragment>
    );
  }
}

export default Alerts;
