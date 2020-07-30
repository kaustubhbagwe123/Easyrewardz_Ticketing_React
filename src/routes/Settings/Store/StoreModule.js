import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Popover, Radio } from "antd";
import ReactTable from "react-table";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import CancelIcon from "./../../../assets/Images/cancel.png";
import FileUpload from "./../../../assets/Images/file.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Editpencil from "./../../../assets/Images/pencil.png";
import pinico from "./../../../assets/Images/clip.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import searchico from "./../../../assets/Images/serach-icon-left.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import Correct from "./../../../assets/Images/correct.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { CSVLink } from "react-csv";
import Dropzone from "react-dropzone";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import TimeSlotdropdown from "./TimeSlotDropdown";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { ProgressBar } from "react-bootstrap";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import "antd/dist/antd.css";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
import { Table, Select as Aselect } from "antd";
import Select from "react-select";
import "antd/dist/antd.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { element } from "prop-types";

const { Option } = Aselect;
var uid = 0;
class StoreModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      maxAttachSize: [],
      fileFormat: [],
      selectedMaxAttachSize: "0",
      selectedFileFormat: "0",
      maxAttachSizeCompulsion: "",
      fileFormatCompulsion: "",
      claimTabLoading: false,
      addCampaignLoading: false,
      campaignScriptData: [],
      campaignShow: false,
      campaignOvrlayShow: false,
      campaignName: [],
      indiCampaign: "",
      selTab: "Claim",
      scriptDetails: "",
      campaignCompulsion: "",
      scriptDetailsCompulsion: "",
      updateIndiCampaignId: "",
      updateScriptDetails: "",
      editModal: false,
      updateScriptDetailsCompulsion: "",
      updateCampaignId: 0,
      updateCampaignLoading: false,
      sortFiltercampaignName: [],
      sortFiltercreatedBy: [],
      sortFilteristatus: [],
      scampaignNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      sortcampaignName: [],
      sortcreatedBy: [],
      sortstatus: [],
      isortA: false,
      sortColumn: "",
      sortAllData: [],
      sortHeader: "",
      tempcampaignScriptData: [],
      StatusModel: false,
      filterTxtValue: "",
      fileSize: "",
      file: {},
      fileValidation: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
      isATOZ: true,
      itemData: [],
      editCampChannelModal: false,
      campaignChannelData: {},
      AppointConfigData: {},
      BroadCastConfigData: {},
      maxClickValidation: "",
      enabledAfterValidation: "",
      braodCastMaxClickValid: "",
      broadCastEnabledAfterValid: "",
      campProviderValidation: "",
      broadProviderValidation: "",
      TimeSlotData: TimeSlotdropdown(),
      // TimeSlotGridData: [],
      TimeSlotGridData: [
        {
          slotSettingID: 1,
          storeCode: "SMB0000",
          storeTimimg: "10 AM-7 PM",
          nonOperationalTimimg: "3",
          slotTemplate: "Alternate 1",
          totalSlot: "6",
          appointmentDays: "10",
          status: "Active",
        },
        {
          slotSettingID: 2,
          storeCode: "SMB0000",
          storeTimimg: "10 AM-7 PM",
          nonOperationalTimimg: "3",
          slotTemplate: "Alternate 1",
          totalSlot: "6",
          appointmentDays: "10",
          status: "Active",
        },
      ],
      storeCodeData: [],
      tempStoreCodeData: [],
      selectStore: 0,
      selectTimeSlot1: 0,
      selectTimeSlot2: 0,
      selectAmPm1: "AM",
      selectAmPm2: "AM",
      orderNumber: "",
      maxCapacity: "",
      storeCodeValidation: "",
      orderNovalidation: "",
      maxCapacityValidation: "",
      editSlotModal: false,
      timeSlotEdit: {},
      editSelectTimeSlot1: 0,
      editSelectTimeSlot2: 0,
      editSelectAmPm1: "",
      editSelectAmPm2: "",
      timeSlotId: 0,
      editStoreCodeValidation: "",
      editOrderNovalidation: "",
      editMaxCapacityValidation: "",
      languageData: [],
      selectLanguage: 0,
      languageValidation: "",
      languageGridData: [],
      translateLanguage: {},
      FilterSelectStore: 0,
      isSlotLoading: false,
      selectedStoreCode: [],
      slotDuration: "0.5",
      selectNOTimeSlot1: "1",
      selectNOTimeSlot2: "1",
      selectNOAmPm1: "AM",
      selectNOAmPm2: "AM",
      appointmentDays: "1",
      slotId: 0,
      editstoreCode: "",
      editmaxCapacity: "",
      editSelectTimeSlot1: "",
      editSelectTimeSlot2: "",
      editSelectAmPm1: "",
      editSelectAmPm2: "",
      editSelectNOTimeSlot1: "",
      editSelectNOTimeSlot2: "",
      editSelectNOAmPm1: "",
      editSelectNOAmPm2: "",
      editAppointmentDays: "",
      editSlotDuration: "",
      isNextClick: false,
      slotData: [
        {
          no: 1,
          startTime: "10:00 AM",
          endTime: "10:30 AM",
          occupancy: 3,
          slotstatus: true,
        },
      ],
      chooseStoreModal: false,
      createTampleteModal: false,
      selectedStoreModal: false,
      slotAutomaticRadio: 1,
      selectedStoreIds: "",
      selectedStoreValues: "",
      shoreSelectedCount: 0,
      operationalDaysData: [],
      slotStoreSearch: "",
      selectedStoreList: [],
      selectedStoreMdl: {},
      slotTemplateData: [],
      showApplyStoreData: false,
      autoTempName: "",
      autoStoreFrom: "",
      autoStoreTo: "",
      autoNonOptFrom: "",
      autoNonOptTo: "",
      AutoSlotDuration: 0,
      AutoSlotGap: 0,
      autoTempNameCompulsory: "",
      AutoSlotDurationCompulsory: "",
      AutoSlotGapCompulsory: "",
      autoStoreFromCompulsory: "",
      autoStoreToCompulsory: "",
      autoNonOptFromCompulsory: "",
      autoNonOptToCompulsory: "",
      automaticaSlotTblData: [],
      manualTempName: "",
      manualStoreFrom: "",
      manualStoreTo: "",
      ManualSlotDuration: 0,
      slotEndTime: "",
      slotStartTime: "",
      manualTempNameCompulsory: "",
      manualStoreFromCompulsory: "",
      manualStoreToCompulsory: "",
      ManualSlotDurationCompulsory: "",
      manualSlotStartCompulsory: "",
      manualSlotEndCompulsory: "",
      manualStoreTblData: [],
      manualStoreData: {},
      mimSlotStartTimeChck: "",
      finalSlotTemplateId: 0,
      selectedSlotTemplate: 0,
      SlotTemplateGridData: [],
      // slotDaysData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      // maxPeopleData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    };
    this.handleClaimTabData = this.handleClaimTabData.bind(this);
    this.handleCampaignNameList = this.handleCampaignNameList.bind(this);
    this.handleCampaignScriptGridData = this.handleCampaignScriptGridData.bind(
      this
    );
    this.handleCampaignButton = this.handleCampaignButton.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.handleGetTimeslotGridData = this.handleGetTimeslotGridData.bind(this);
    this.closeSlotEditModal = this.closeSlotEditModal.bind(this);
  }

  componentDidMount() {
    this.handleClaimTabData();
    this.handleCampaignNameList();
    this.handleCampaignScriptGridData();
    this.handleCampaignChannelGridData();
    this.handleGetAppointmentConfigData();
    this.handleGetBroadCastConfigData();
    // this.handleGetTimeslotGridData();
    this.handleGetstoreCodeData();
    this.handleGetLanguageDropdownlist();
    this.handleGetLanguageGridData();
    this.handleGetOperationalDays();
    this.handleGetSlotTemplate();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  fileUpload = (file) => {
    if (file) {
      var fileName = file[0].name;
      var fileSize = formatSizeUnits(file[0].size);
      this.setState({
        fileName,
        fileSize,
        file: file[0],
        fileValidation: "",
      });
    }
  };

  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }

  handleBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.fileName) {
      const formData = new FormData();
      formData.append("file", this.state.file);
      this.setState({ isShowProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/ModuleSetting/BulkUploadCampaign",
        headers: authHeader(),
        data: formData,
        onUploadProgress: (ev = ProgressEvent) => {
          const progress = (ev.loaded / ev.total) * 100;
          this.updateUploadProgress(Math.round(progress));
        },
      })
        .then((response) => {
          var status = response.data.message;
          var itemData = response.data.responseData;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.fileuploadedsuccessfully
                : "File uploaded successfully."
            );
            self.setState({ fileName: "", fileSize: "", fileN: [] });
            self.handleCampaignScriptGridData();
            self.setState({ isErrorBulkUpload: false, isShowProgress: false });
          } else {
            self.setState({ isErrorBulkUpload: true, isShowProgress: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.filenotuploaded
                : "File not uploaded."
            );
          }
        })
        .catch((response) => {
          self.setState({ isErrorBulkUpload: true });
          console.log(response);
        });
    } else {
      this.setState({ fileValidation: "Please Select File." });
    }
  }

  DeleteBulkUploadFile = () => {
    const TranslationContext = this.state.translateLanguage.default;
    this.setState({
      file: {},
      fileName: "",
      fileSize: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  handleEditModal() {
    this.setState({ editModal: false });
  }

  handleEditCampSettingModal() {
    this.setState({ editCampChannelModal: false });
  }

  handleCampaignButton() {
    let slaShowOriginal = this.state.campaignShow;
    let campaignShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignOvrlayShow;
    let campaignOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignShow,
      campaignOvrlayShow,
    });
  }

  deleteCampaign(deleteId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/DeleteCampaignScript",
      headers: authHeader(),
      params: {
        CampaignID: deleteId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.campaigndeletedsuccessfully
              : "Campaign deleted successfully."
          );
          self.handleCampaignScriptGridData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.campaignnotdeleted
              : "Campaign not deleted."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  selectIndividualCampaign = async (issueId, event) => {
    var indiCampaign = this.state.indiCampaign;
    var separator = ",";
    var values = indiCampaign.split(separator);
    if (event.target.checked) {
      // indiCampaign += issueId + ",";
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiCampaign = values.join(separator);
      }
      await this.setState({
        indiCampaign,
      });
      document.getElementById("campaignNameValue").textContent =
        this.state.indiCampaign.split(",").length - 1 + " selected";
    } else {
      // var indiCampaign = this.state.indiCampaign;
      // var separator = ",";
      // var values = indiCampaign.split(separator);
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiCampaign = values.join(separator);
        }
      }
      await this.setState({
        indiCampaign,
      });
      if (this.state.indiCampaign.split(",").length - 1 !== 0) {
        document.getElementById("campaignNameValue").textContent =
          this.state.indiCampaign.split(",").length - 1 + " selected";
      } else {
        document.getElementById("campaignNameValue").textContent = "Select";
      }
    }
  };

  selectAllCampaign = async (event) => {
    var indiCampaign = "";
    var checkboxes = document.getElementsByName("allCampaign");
    document.getElementById("campaignNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.campaignName !== null) {
      this.state.campaignName.forEach(allCampaignId);
      function allCampaignId(item) {
        indiCampaign += item.campaignNameID + ",";
      }
    }
    await this.setState({
      indiCampaign,
    });
  };

  selectNoCampaign = async (event) => {
    var checkboxes = document.getElementsByName("allCampaign");
    document.getElementById("campaignNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiCampaign: "",
    });
  };

  setClaimTabData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  setScriptDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleInputOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSlotInputOnchange = (e) => {
    debugger;

    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      if (Number(e.target.value) <= 30 && Number(e.target.value) >= 1) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        this.setState({ [e.target.name]: "" });
      }
    } else {
      this.setState({ [e.target.name]: "" });
    }
  };

  handleSlotEditInputOnchange = (e) => {
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      if (Number(e.target.value) <= 30 && Number(e.target.value) >= 1) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      } else {
        this.setState({
          [e.target.name]: "",
        });
      }
    } else {
      this.setState({
        [e.target.name]: "",
      });
    }
  };

  handleDrop_downOnchange = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    if (name === "selectStore") {
      this.setState({
        selectStore: value,
      });
    } else if (name === "selectTimeSlot1") {
      this.setState({
        selectTimeSlot1: value,
      });
    } else if (name === "selectTimeSlot2") {
      this.setState({
        selectTimeSlot2: value,
      });
    } else if (name === "selectAmPm1") {
      this.setState({
        selectAmPm1: value,
      });
    } else if (name === "selectAmPm2") {
      this.setState({
        selectAmPm2: value,
      });
    } else if (name === "selectLanguage") {
      this.setState({
        selectLanguage: value,
      });
    } else if (name === "slotDuration") {
      this.setState({
        slotDuration: value,
      });
    } else if (name === "selectNOAmPm1") {
      this.setState({
        selectNOAmPm1: value,
      });
    } else if (name === "selectNOAmPm2") {
      this.setState({
        selectNOAmPm2: value,
      });
    } else if (name === "selectNOTimeSlot2") {
      this.setState({
        selectNOTimeSlot2: value,
      });
    } else if (name === "selectNOTimeSlot1") {
      this.setState({
        selectNOTimeSlot1: value,
      });
    } else if (name === "appointmentDays") {
      this.setState({
        appointmentDays: value,
      });
    }
  };

  handleEditDrop_downOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    debugger;
    var timeSlotEdit = this.state.timeSlotEdit;
    if (name === "editSelectTimeSlot1") {
      this.setState({
        editSelectTimeSlot1: value,
      });
    } else if (name === "editSelectTimeSlot2") {
      this.setState({
        editSelectTimeSlot2: value,
      });
    } else if (name === "editSelectAmPm1") {
      this.setState({
        editSelectAmPm1: value,
      });
    } else if (name === "editSelectAmPm2") {
      this.setState({
        editSelectAmPm2: value,
      });
    } else if (name === "editstoreCode") {
      this.setState({
        editstoreCode: value,
      });
    } else if (name === "editSelectNOAmPm1") {
      this.setState({
        editSelectNOAmPm1: value,
      });
    } else if (name === "editSelectNOAmPm2") {
      this.setState({
        editSelectNOAmPm2: value,
      });
    } else if (name === "editSelectNOTimeSlot1") {
      this.setState({
        editSelectNOTimeSlot1: value,
      });
    } else if (name === "editSelectNOTimeSlot2") {
      this.setState({
        editSelectNOTimeSlot2: value,
      });
    } else if (name === "editSlotDuration") {
      this.setState({
        editSlotDuration: value,
      });
    } else if (name === "editAppointmentDays") {
      this.setState({
        editAppointmentDays: value,
      });
    }
  };

  handleClaimTabData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetStoreAttachmentSettings",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            maxAttachSize: data.arrachementSizeList,
            fileFormat: data.storeAttachmentFileFormatList,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  updateCampaign(individualData) {
    this.setState({
      editModal: true,
      updateIndiCampaignId: individualData.campaignNameID,
      updateScriptDetails: individualData.campaignScript,
      updateCampaignId: individualData.campaignID,
    });
  }

  EditCampaignChannel(individualData) {
    this.setState({
      editCampChannelModal: true,
      // updateIndiCampaignId: individualData.campaignNameID,
      // updateScriptDetails: individualData.campaignScript,
      // updateCampaignId: individualData.campaignID,
    });
  }

  handleCampaignNameList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetCampaignName",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            campaignName: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  //// handle Get Campaign channel data
  handleCampaignChannelGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignSettingList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            campaignChannelData: data.campaignSettingTimer,
          });
        } else {
          self.setState({
            campaignChannelData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////get Store Code for dropdown list
  handleGetstoreCodeData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/StoreList",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          data.forEach((element) => {
            element.isChecked = false;
          });
          self.setState({ storeCodeData: data, tempStoreCodeData: data });
        } else {
          self.setState({ storeCodeData: [], tempStoreCodeData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Language for dropdown list
  handleGetLanguageDropdownlist() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetLanguageDetails",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ languageData: data });
        } else {
          self.setState({ languageData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Language grid data
  handleGetLanguageGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetSelectedLanguageDetails",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ languageGridData: data });
        } else {
          self.setState({ languageGridData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //// handle table record deleted
  handleDeleteTimeSlot(slotId) {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/DeleteTimeSlotMaster",
      headers: authHeader(),
      params: {
        SlotID: slotId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recorddeletedsuccessfully
              : "Record Deleted Successfully."
          );
          self.handleGetTimeslotGridData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotdeleted
              : "Record Not Deleted."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Delete Language record
  handleDeleteLanguage = (row, type) => {
    const TranslationContext = this.state.translateLanguage.default;
    debugger;
    let languageGridData = [...this.state.languageGridData],
      isActive;

    for (let i = 0; i < languageGridData.length; i++) {
      if (languageGridData[i].languageID === row.languageID) {
        isActive = languageGridData[i].isActive;
        languageGridData[i].isActive = isActive === false ? true : false;
      }
    }

    this.setState({
      languageGridData,
    });

    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/DeleteSelectedLanguage",
      headers: authHeader(),
      params: {
        selectedLanguageID: row.id,
        isActive: row.isActive,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully."
          );
          self.handleGetLanguageGridData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotupdated
              : status
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  //// Handle get time slot grid data
  handleGetTimeslotGridData(slotID, storeId) {
    let self = this;
    this.setState({ isSlotLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetStoreSettingTimeSlot",
      headers: authHeader(),
      params: { SlotID: slotID ? slotID : 0, StoreID: storeId ? storeId : 0 },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            TimeSlotGridData: data,
            isSlotLoading: false,
          });
        } else {
          self.setState({
            TimeSlotGridData: [],
            isSlotLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //// handle Get Appointment configuration data
  handleGetAppointmentConfigData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetAppointmentConfiguration",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AppointConfigData: data,
          });
        } else {
          self.setState({
            AppointConfigData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  //// handle Get Broad cast configuration data
  handleGetBroadCastConfigData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetBroadcastConfiguration",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            BroadCastConfigData: data,
          });
        } else {
          self.setState({
            BroadCastConfigData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCampaignScriptGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetCampaignScript",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data) {
          self.setState({
            campaignScriptData: data,
          });

          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].campaignName]) {
              distinct.push(data[i].campaignName);
              unique[data[i].campaignName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              self.state.sortcampaignName.push({ campaignName: distinct[i] });
              self.state.sortFiltercampaignName.push({
                campaignName: distinct[i],
              });
            }
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
            if (distinct[i]) {
              self.state.sortcreatedBy.push({ createdBy: distinct[i] });
              self.state.sortFiltercreatedBy.push({ createdBy: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].statusName]) {
              distinct.push(data[i].statusName);
              unique[data[i].statusName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              self.state.sortstatus.push({ status: distinct[i] });
              self.state.sortFilteristatus.push({ status: distinct[i] });
            }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAttachmentSave() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      parseInt(this.state.selectedMaxAttachSize) != 0 &&
      parseInt(this.state.selectedFileFormat) != 0
    ) {
      let self = this;
      this.setState({
        claimTabLoading: true,
      });

      // save attachment settings
      axios({
        method: "post",
        url: config.apiUrl + "/ModuleSetting/ModifyStoreAttachmentSettings",
        headers: authHeader(),
        data: {
          AttachmentSize: this.state.selectedMaxAttachSize,
          FileFomatID: this.state.selectedFileFormat,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.attachmentsavesuccessfully
                : "Attachment saved successfully."
            );
            self.setState({
              selectedMaxAttachSize: "0",
              selectedFileFormat: "0",
              maxAttachSizeCompulsion: "",
              fileFormatCompulsion: "",
              claimTabLoading: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        maxAttachSizeCompulsion: "Please select max attachment size",
        fileFormatCompulsion: "Please select file format",
      });
    }
  }

  handleCreateCampaignScript() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.indiCampaign.length != 0 &&
      this.state.scriptDetails.length != 0
    ) {
      let self = this;
      this.setState({
        addCampaignLoading: true,
      });

      // add campaign script
      axios({
        method: "post",
        url: config.apiUrl + "/ModuleSetting/InsertCampaignScript",
        headers: authHeader(),
        data: {
          CampaignNameID: this.state.indiCampaign.substring(
            0,
            this.state.indiCampaign.length - 1
          ),
          CampaignScript: this.state.scriptDetails,
          Status: true,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleCampaignScriptGridData();
            self.selectNoCampaign();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.campaignsavedsuccessfully
                : "Campaign saved successfully."
            );
            document.getElementById("campaignNameValue").textContent = "Select";
            self.setState({
              indiCampaign: "",
              scriptDetails: "",
              campaignCompulsion: "",
              scriptDetailsCompulsion: "",
              addCampaignLoading: false,
            });
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.campaignnotsaved
                : "Campaign not saved."
            );
            self.setState({
              addCampaignLoading: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        campaignCompulsion: "Please select campaign name",
        scriptDetailsCompulsion: "Please enter script details",
      });
    }
  }

  handleUpdateCampaignScript() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.updateScriptDetails.length != 0) {
      let self = this;
      this.setState({
        updateCampaignLoading: true,
      });
      // update campaign script
      axios({
        method: "post",
        url: config.apiUrl + "/ModuleSetting/UpdateCampaignScript",
        headers: authHeader(),
        data: {
          CampaignID: this.state.updateCampaignId,
          CampaignNameID: this.state.updateIndiCampaignId,
          CampaignScript: this.state.updateScriptDetails,
          Status: true,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleCampaignScriptGridData();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.campaignupdatedsuccessfully
                : "Campaign updated successfully."
            );
            self.setState({
              // campaignCompulsion: "",
              updateScriptDetailsCompulsion: "",
              updateCampaignLoading: false,
              editModal: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        // campaignCompulsion: "Please select campaign name",
        updateScriptDetailsCompulsion: "Please enter script details",
      });
    }
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.campaignScriptData;

    if (this.state.sortColumn === "campaignName") {
      itemsArray.sort((a, b) => {
        if (a.campaignName < b.campaignName) return 1;
        if (a.campaignName > b.campaignName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return 1;
        if (a.createdBy > b.createdBy) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status < b.status) return 1;
        if (a.status > b.status) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: false,
      campaignScriptData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.campaignScriptData;

    if (this.state.sortColumn === "campaignName") {
      itemsArray.sort((a, b) => {
        if (a.campaignName < b.campaignName) return -1;
        if (a.campaignName > b.campaignName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return -1;
        if (a.createdBy > b.createdBy) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: true,
      campaignScriptData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });

    if (
      this.state.sortFiltercampaignName.length === 0 ||
      this.state.sortFiltercreatedBy.length === 0 ||
      this.state.sortFilteristatus.length === 0
    ) {
      return false;
    }
    this.setState({ isortA: false });
    if (data === "campaignName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.scampaignNameFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scampaignNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "status") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.scampaignNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scampaignNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    this.setState({
      sortFiltercampaignName: this.state.sortcampaignName,
      sortFiltercreatedBy: this.state.sortcreatedBy,
      sortFilteristatus: this.state.sortstatus,
    });
    if (this.state.tempcampaignScriptData.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        campaignScriptData: this.state.tempcampaignScriptData,
      });
      if (this.state.sortColumn === "campaignName") {
        if (this.state.scampaignNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            scampaignNameFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "status") {
        if (this.state.sstatusFilterCheckbox === "") {
        } else {
          this.setState({
            scampaignNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        sortHeader: this.state.isortA ? this.state.sortHeader : "",
        campaignScriptData: this.state.isortA
          ? this.state.campaignScriptData
          : this.state.sortAllData,
        sFilterCheckbox: "",
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var scampaignNameFilterCheckbox = this.state.scampaignNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sstatusFilterCheckbox = this.state.sstatusFilterCheckbox;

    var allData = this.state.sortAllData;

    if (column === "campaignName" || column === "all") {
      if (type === "value" && type !== "All") {
        scampaignNameFilterCheckbox = scampaignNameFilterCheckbox.replace(
          "all",
          ""
        );
        scampaignNameFilterCheckbox = scampaignNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scampaignNameFilterCheckbox.includes(e.currentTarget.value)) {
          scampaignNameFilterCheckbox = scampaignNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scampaignNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scampaignNameFilterCheckbox.includes("all")) {
          scampaignNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "campaignName") {
            for (let i = 0; i < this.state.sortcampaignName.length; i++) {
              scampaignNameFilterCheckbox +=
                this.state.sortcampaignName[i].campaignName + ",";
            }
            scampaignNameFilterCheckbox += "all";
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
            for (let i = 0; i < this.state.sortcreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortcreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "status" || column === "all") {
      if (type === "value" && type !== "All") {
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all", "");
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all,", "");
        if (sstatusFilterCheckbox.includes(e.currentTarget.value)) {
          sstatusFilterCheckbox = sstatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstatusFilterCheckbox.includes("all")) {
          sstatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "status") {
            for (let i = 0; i < this.state.sortstatus.length; i++) {
              sstatusFilterCheckbox += this.state.sortstatus[i].status + ",";
            }
            sstatusFilterCheckbox += "all";
          }
        }
      }
    }

    this.setState({
      scampaignNameFilterCheckbox,
      screatedByFilterCheckbox,
      sstatusFilterCheckbox,
      issueColor: "",
      createdColor: "",
      stattusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "campaignName") {
      var sItems = scampaignNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.campaignName === sItems[i]
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
        issueColor: "sort-column",
      });
    } else if (column === "createdBy") {
      var sItems1 = screatedByFilterCheckbox.split(",");
      if (sItems1.length > 0) {
        for (let i = 0; i < sItems1.length; i++) {
          if (sItems1[i] !== "") {
            var tempFilterData1 = allData.filter(
              (a) => a.createdBy === sItems1[i]
            );
            if (tempFilterData1.length > 0) {
              for (let j = 0; j < tempFilterData1.length; j++) {
                itemsArray.push(tempFilterData1[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column",
      });
    } else if (column === "status") {
      var sItems2 = sstatusFilterCheckbox.split(",");
      if (sItems2.length > 0) {
        for (let i = 0; i < sItems2.length; i++) {
          if (sItems2[i] !== "") {
            var tempFilterData2 = allData.filter(
              (a) => a.status === sItems2[i]
            );
            if (tempFilterData2.length > 0) {
              for (let j = 0; j < tempFilterData2.length; j++) {
                itemsArray.push(tempFilterData2[j]);
              }
            }
          }
        }
      }
      this.setState({
        stattusColor: "sort-column",
      });
    }

    this.setState({
      tempcampaignScriptData: itemsArray,
    });
  };

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "campaignName") {
      var sortFiltercampaignName = matchSorter(
        this.state.sortcampaignName,
        e.target.value,
        { keys: ["campaignName"] }
      );
      if (sortFiltercampaignName.length > 0) {
        this.setState({ sortFiltercampaignName });
      } else {
        this.setState({
          sortFiltercampaignName: this.state.sortcampaignName,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFiltercreatedBy = matchSorter(
        this.state.sortcreatedBy,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFiltercreatedBy.length > 0) {
        this.setState({ sortFiltercreatedBy });
      } else {
        this.setState({
          sortFiltercreatedBy: this.state.sortcreatedBy,
        });
      }
    }
    if (this.state.sortColumn === "status") {
      var sortFilteristatus = matchSorter(
        this.state.sortstatus,
        e.target.value,
        { keys: ["status"] }
      );
      if (sortFilteristatus.length > 0) {
        this.setState({ sortFilteristatus });
      } else {
        this.setState({
          sortFilteristatus: this.state.sortstatus,
        });
      }
    }
  }
  /// handle toggle change data
  CampChannelSmsFlageOnchange = (id) => {
    var CampId = id.target.id;
    if (CampId === "ckSmsCamp1") {
      this.state.campaignChannelData.smsFlag = !this.state.campaignChannelData
        .smsFlag;
    } else if (CampId === "ckWhatCamp2") {
      this.state.campaignChannelData.messengerFlag = !this.state
        .campaignChannelData.messengerFlag;
    } else if (CampId === "ckChatCamp3") {
      this.state.campaignChannelData.botFlag = !this.state.campaignChannelData
        .botFlag;
    } else if (CampId === "ckEmailCamp4") {
      this.state.campaignChannelData.emailFlag = !this.state.campaignChannelData
        .emailFlag;
    }

    this.setState({ campaignChannelData: this.state.campaignChannelData });
  };

  /// handle Appointment configuration toggle change
  AppoinmentConfigFlageChange = (id) => {
    var AppointConfig = id.target.id;
    if (AppointConfig === "ckAppconfigOTP") {
      this.state.AppointConfigData.generateOTP = !this.state.AppointConfigData
        .generateOTP;
    } else if (AppointConfig === "ckAppconfigCardQR") {
      this.state.AppointConfigData.cardQRcode = !this.state.AppointConfigData
        .cardQRcode;
    } else if (AppointConfig === "ckAppconfigCardBar") {
      this.state.AppointConfigData.cardBarcode = !this.state.AppointConfigData
        .cardBarcode;
    } else if (AppointConfig === "ckAppconfigCard") {
      this.state.AppointConfigData.onlyCard = !this.state.AppointConfigData
        .onlyCard;
    }

    this.setState({ AppointConfigData: this.state.AppointConfigData });
  };
  /// handle Broadcast configuration toggle change
  handleBroadCongiFlageOnchange = (id) => {
    var BroadConfig = id.target.id;
    if (BroadConfig === "ckbroadSMS") {
      this.state.BroadCastConfigData.smsFlag = !this.state.BroadCastConfigData
        .smsFlag;
    } else if (BroadConfig === "ckbroadwhatsapp") {
      this.state.BroadCastConfigData.whatsappFlag = !this.state
        .BroadCastConfigData.whatsappFlag;
    } else if (BroadConfig === "ckbroadEmail") {
      this.state.BroadCastConfigData.emailFlag = !this.state.BroadCastConfigData
        .emailFlag;
    }

    this.setState({ BroadCastConfigData: this.state.BroadCastConfigData });
  };

  /// update campaign change data
  CampCannelOnChange(e) {
    const { name, value } = e.target;
    var campaignChannelData = this.state.campaignChannelData;
    if (name === "enableClickAfterValue") {
      if (campaignChannelData["enableClickAfterDuration"] == "M") {
        if (parseInt(value) <= 60) {
          campaignChannelData[name] = value;
          this.setState({ campaignChannelData });
        } else {
          campaignChannelData[name] = "";
          this.setState({ campaignChannelData });
        }
      } else {
        if (parseInt(value) <= 99) {
          campaignChannelData[name] = value;
          this.setState({ campaignChannelData });
        } else {
          campaignChannelData[name] = "";
          this.setState({ campaignChannelData });
        }
      }
    } else {
      if (name === "enableClickAfterDuration") {
        if (value === "M") {
          if (campaignChannelData["enableClickAfterValue"] > 60)
            campaignChannelData["enableClickAfterValue"] = "";
        }

        if (value === "H") {
          if (campaignChannelData["enableClickAfterValue"] > 99)
            campaignChannelData["enableClickAfterValue"] = "";
        }
      }
      campaignChannelData[name] = value;
      this.setState({ campaignChannelData });
    }
  }
  /// Handle Braod cast onchange
  BroadCastOnChange(e) {
    const { name, value } = e.target;
    var BroadCastConfigData = this.state.BroadCastConfigData;
    if (name === "enableClickAfterValue") {
      if (BroadCastConfigData["enableClickAfterDuration"] == "M") {
        if (parseInt(value) <= 60) {
          BroadCastConfigData[name] = value;
          this.setState({ BroadCastConfigData });
        } else {
          BroadCastConfigData[name] = "";
          this.setState({ BroadCastConfigData });
        }
      } else {
        if (parseInt(value) <= 99) {
          BroadCastConfigData[name] = value;
          this.setState({ BroadCastConfigData });
        } else {
          BroadCastConfigData[name] = "";
          this.setState({ BroadCastConfigData });
        }
      }
    } else {
      if (name === "enableClickAfterDuration") {
        if (value === "M") {
          if (BroadCastConfigData["enableClickAfterValue"] > 60)
            BroadCastConfigData["enableClickAfterValue"] = "";
        }

        if (value === "H") {
          if (BroadCastConfigData["enableClickAfterValue"] > 99)
            BroadCastConfigData["enableClickAfterValue"] = "";
        }
      }
      BroadCastConfigData[name] = value;
      this.setState({ BroadCastConfigData });
    }
  }
  /// handle camapign validation
  handleCheckCampaignValidation() {
    if (this.state.campaignChannelData.smsFlag) {
      if (this.state.campaignChannelData.providerName !== "") {
        this.handleUpdateCampChannelData();
      } else {
        this.setState({
          campProviderValidation: "Required",
        });
      }
    } else {
      this.handleUpdateCampChannelData();
    }
  }
  /// handle Campaign Channerl update data
  handleUpdateCampChannelData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.campaignChannelData.maxClickAllowed !== "" &&
      this.state.campaignChannelData.enableClickAfterValue !== ""
    ) {
      axios({
        method: "post",
        url: config.apiUrl + "/StoreCampaign/UpdateCampaignMaxClickTimer",
        headers: authHeader(),
        data: {
          ID: this.state.campaignChannelData.id,
          MaxClickAllowed: this.state.campaignChannelData.maxClickAllowed,
          EnableClickAfterValue: this.state.campaignChannelData
            .enableClickAfterValue,
          EnableClickAfterDuration: this.state.campaignChannelData
            .enableClickAfterDuration,
          SmsFlag: this.state.campaignChannelData.smsFlag,
          EmailFlag: this.state.campaignChannelData.emailFlag,
          MessengerFlag: this.state.campaignChannelData.messengerFlag,
          BotFlag: this.state.campaignChannelData.botFlag,
          ProviderName:
            this.state.campaignChannelData.providerName !== ""
              ? this.state.campaignChannelData.providerName
              : "",
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.campaignupdatedsuccessfully
                : "Campaign Updated Successfully."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        maxClickValidation: "Required",
        enabledAfterValidation: "Required",
      });
    }
  }
  /// handle Appointment Configuration update data
  handleUpdateAppointmentConfigData() {
    const TranslationContext = this.state.translateLanguage.default;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/UpdateAppointmentConfiguration",
      headers: authHeader(),
      data: {
        ID: this.state.AppointConfigData.id,
        GenerateOTP: this.state.AppointConfigData.generateOTP,
        CardQRcode: this.state.AppointConfigData.cardQRcode,
        CardBarcode: this.state.AppointConfigData.cardBarcode,
        OnlyCard: this.state.AppointConfigData.onlyCard,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.appointmentupdatedsuccessfully
              : "Appointment Updated Successfully."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  CheckBroadCastValidation() {
    if (this.state.BroadCastConfigData.smsFlag) {
      if (this.state.BroadCastConfigData.providerName !== "") {
        this.handleUpdateBroadCastConfigData();
      } else {
        this.setState({
          broadProviderValidation: "Required",
        });
      }
    } else {
      this.handleUpdateBroadCastConfigData();
    }
  }
  /// handle Broad cast Configuration update data
  handleUpdateBroadCastConfigData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.BroadCastConfigData.maxClickAllowed !== "" &&
      this.state.BroadCastConfigData.enableClickAfterValue !== ""
    ) {
      axios({
        method: "post",
        url: config.apiUrl + "/StoreCampaign/UpdateBroadcastConfiguration",
        headers: authHeader(),
        data: {
          ID: this.state.BroadCastConfigData.id,
          MaxClickAllowed: this.state.BroadCastConfigData.maxClickAllowed,
          EnableClickAfterValue: this.state.BroadCastConfigData
            .enableClickAfterValue,
          EnableClickAfterDuration: this.state.BroadCastConfigData
            .enableClickAfterDuration,
          SmsFlag: this.state.BroadCastConfigData.smsFlag,
          EmailFlag: this.state.BroadCastConfigData.emailFlag,
          WhatsappFlag: this.state.BroadCastConfigData.whatsappFlag,
          ProviderName: this.state.BroadCastConfigData.providerName,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.broadcastupdatedsuccessfully
                : "Broadcast Updated Successfully."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        braodCastMaxClickValid: "Required",
        broadCastEnabledAfterValid: "Required",
      });
    }
  }

  /// handle insert and update slot setting
  handleInsertUpdateTimeSlotSetting(isInsert) {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;

    var inputParam = {};
    if (isInsert) {
      inputParam.SlotId = 0;
      inputParam.StoreIds = "";
      inputParam.StoreOpdays = "";
      inputParam.SlotTemplateID = "";
      inputParam.SlotMaxCapacity = "";
      inputParam.AppointmentDays = "";
      inputParam.ApplicableFromDate = "";
      inputParam.IsActive = true;
      inputParam.TemplateSlots = this.state.SlotTemplateGridData;
      inputParam.SlotDisplayCode = "";
      inputParam.AppointmentDays = Number(this.state.appointmentDays);
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/InsertUpdateTimeSlotSetting",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            selectedStoreCode: [],
            selectTimeSlot1: 1,
            selectTimeSlot2: 1,
            selectNOTimeSlot1: 1,
            selectNOTimeSlot2: 1,
            selectAmPm1: "AM",
            selectAmPm2: "AM",
            selectNOAmPm1: "AM",
            selectNOAmPm2: "AM",
            slotduration: "0.5",
            maxCapacity: "",
          });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.timeslotaddedsuccessfully
              : "Time Slot Added Successfully."
          );
          self.handleGetTimeslotGridData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.timeslotnotadded
              : "Time Slot Not Added."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  /// Handle Update TimeSlot data
  handleUpdateTimeSlotData() {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    if (this.state.editstoreCode !== "0" && this.state.editmaxCapacity !== "") {
      debugger;
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/InsertUpdateTimeSlotSetting",
        headers: authHeader(),
        data: {
          SlotId: this.state.slotId,
          StoreIds: this.state.editstoreCode,
          StoreOpenValue: Number(this.state.editSelectTimeSlot1),
          StoreOpenAt: this.state.editSelectAmPm1,
          StoreCloseValue: Number(this.state.editSelectTimeSlot2),
          StoreCloseAt: this.state.editSelectAmPm2,
          Slotduration: parseFloat(this.state.editSlotDuration),
          SlotMaxCapacity: Number(this.state.editmaxCapacity),
          StoreNonOpFromValue: Number(this.state.editSelectNOTimeSlot1),
          StoreNonOpFromAt: this.state.editSelectNOAmPm1,
          StoreNonOpToValue: Number(this.state.editSelectNOTimeSlot2),
          StoreNonOpToAt: this.state.editSelectNOAmPm2,
          AppointmentDays: Number(this.state.editAppointmentDays),
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.timeslotupdatesuccessfully
                : "Time Slot Updated Successfully."
            );
            self.handleGetTimeslotGridData();
            self.setState({
              editSlotModal: false,
              editselectTimeSlot1: 1,
              editselectTimeSlot2: 1,
              editselectNOTimeSlot1: 1,
              editselectNOTimeSlot2: 1,
              editselectAmPm1: "AM",
              editselectAmPm2: "AM",
              editselectNOAmPm1: "AM",
              editselectNOAmPm2: "AM",
              editSlotDuration: "0.5",
              editmaxCapacity: "",
              slotId: 0,
            });
          } else {
            debugger;
            if (
              status.trim().toLowerCase() ===
              "Record Already Exists".trim().toLowerCase()
            ) {
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage
                      .appointmentrecordalreadyexists
                  : "Appointment Record Already Exists"
              );
            } else {
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.timeslotnotupdated
                  : "Time Slot Not Updated."
              );
            }
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        editStoreCodeValidation: "Required",
        editOrderNovalidation: "Required",
        editMaxCapacityValidation: "Required",
      });
    }
  }

  handleSubmitLanguageDate() {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    if (parseInt(this.state.selectLanguage) !== 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/StoreCampaign/InsertLanguageDetails",
        headers: authHeader(),
        params: {
          languageID: parseInt(this.state.selectLanguage),
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.languageaddedsuccessfully
                : "Language Added Successfully."
            );
            self.handleGetLanguageGridData();
            self.setState({
              selectLanguage: 0,
            });
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.languagenotadded
                : status
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        languageValidation: "Please Select Language.",
      });
    }
  }

  closeSlotEditModal() {
    this.setState({
      editSlotModal: false,
    });
  }
  /// handle Edit Time slot
  openSlotEditModal(slotId, storeId) {
    var timeSlotEdit = {};
    let self = this;

    this.setState({ editSlotModal: true });
    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/Appointment/GetStoreSettingTimeSlot",
    //   headers: authHeader(),
    //   params: { SlotID: slotId ? slotId : 0, StoreID: storeId },
    // })
    //   .then(function(res) {
    //     debugger;
    //     var message = res.data.message;
    //     var data = res.data.responseData;
    //     if (message === "Success") {
    //       var slotId = data[0].slotSettingID;
    //       var editstoreCode = data[0].storeId;
    //       var editmaxCapacity = data[0].maxCapacity;
    //       var storeTimimg = data[0].storeTimimg.match(
    //         /[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g
    //       );
    //       var nonOperationalTimimg = data[0].nonOperationalTimimg.match(
    //         /[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g
    //       );
    //       var editSelectTimeSlot1 = storeTimimg[0];
    //       var editSelectTimeSlot2 = storeTimimg[2];
    //       var editSelectAmPm1 = storeTimimg[1];
    //       var editSelectAmPm2 = storeTimimg[3];
    //       var editSelectNOTimeSlot1 = nonOperationalTimimg[0];
    //       var editSelectNOTimeSlot2 = nonOperationalTimimg[2];
    //       var editSelectNOAmPm1 = nonOperationalTimimg[1];
    //       var editSelectNOAmPm2 = nonOperationalTimimg[3];
    //       var editAppointmentDays = data[0].appointmentDays;
    //       var editSlotDuration = data[0].storeSlotDuration.split(" ")[0];

    //       self.setState({
    //         editSlotModal: true,
    //         slotId,
    //         editstoreCode,
    //         editmaxCapacity,
    //         editSelectTimeSlot1,
    //         editSelectTimeSlot2,
    //         editSelectAmPm1,
    //         editSelectAmPm2,
    //         editSelectNOTimeSlot1,
    //         editSelectNOTimeSlot2,
    //         editSelectNOAmPm1,
    //         editSelectNOAmPm2,
    //         editAppointmentDays,
    //         editSlotDuration,
    //       });
    //     }
    //   })
    //   .catch((response) => {
    //     console.log(response);
    //   });
  }

  handleChangeStoreDropdown(e) {
    this.setState({ FilterSelectStore: e.target.value });
    this.handleGetTimeslotGridData(0, e.target.value);
  }
  handleStoreChangeChange = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    debugger;
    if (this.state.TimeSlotGridData.length > 0) {
      var isExits = this.state.TimeSlotGridData.filter(
        (x) => x.storeId === e[e.length - 1]
      );
      if (isExits.length > 0) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.slotalreadycreatedofthisstorecode
            : "Slot already created of this store code."
        );
      } else {
        if (e.length > 0) {
          this.setState({
            selectedStoreCode: e,
            storeCodeValidation: "",
          });
        } else {
          this.setState({
            storeCodeValidation: "Required",
            selectedStoreCode: e,
          });
        }
      }
    } else {
      if (e.length > 0) {
        this.setState({
          selectedStoreCode: e,
          storeCodeValidation: "",
        });
      } else {
        this.setState({
          storeCodeValidation: "Required",
          selectedStoreCode: e,
        });
      }
    }
  };
  /////handle next button press to show
  handleNextButtonOpen = () => {
    this.setState({ isNextClick: true });
    this.handleGetSlotsByTemplateID();
  };
  /////handle next button press to hide
  handleNextButtonClose = () => {
    this.setState({ isNextClick: false });
  };

  ////handle choose store modal open
  handleChooseStoreOpenModal = () => {
    this.setState({ chooseStoreModal: true });
  };
  ////handle choose store modal close
  handleChooseStoreCloseModal = () => {
    this.setState({ chooseStoreModal: false });
  };

  ////handle choose store modal open
  handleCreateTempletetOpenModal = () => {
    this.setState({ createTampleteModal: true });
  };
  ////handle choose store modal close
  handleCreateTempletetCloseModal = () => {
    this.setState({ createTampleteModal: false });
  };
  ////handle selected store modal open
  handleSelectedStoreOpenModal = () => {
    this.setState({ selectedStoreModal: true });
  };
  ////handle selected store modal clsoe
  handleSelectedStoreCloseModal = () => {
    this.setState({ selectedStoreModal: false });
  };
  /// handle Slot Radio change
  handleSlotRadioChange = (e) => {
    this.setState({
      slotAutomaticRadio: e.target.value,
    });
  };

  /// handle Select Store Individual
  handleSelectStoresIndividual = async (data, event) => {
    debugger;
    var storeCount = 0;
    var finalValue = "";
    var values = "";
    this.state.storeCodeData.filter(
      (x) => x.storeID === data.storeID
    )[0].isChecked = !this.state.storeCodeData.filter(
      (x) => x.storeID === data.storeID
    )[0].isChecked;

    this.state.storeCodeData.forEach((element) => {
      if (element.isChecked) {
        values += element.storeName + ",";
        storeCount += 1;
      }
    });

    finalValue = values.substring(",", values.length - 1);
    this.setState({
      storeCodeData: this.state.storeCodeData,
      shoreSelectedCount: storeCount,
      selectedStoreValues: finalValue,
    });
  };
  //// handle Select All store name
  handleSelectAllStore = async (isSelectAll) => {
    var storeCount = 0;
    var finalValue = "";
    var values = "";

    this.state.storeCodeData.forEach((element) => {
      element.isChecked = isSelectAll ? true : false;
      if (element.isChecked) {
        values += element.storeName + ",";
        storeCount += 1;
      }
    });

    finalValue = values.substring(",", values.length - 1);
    this.setState({
      storeCodeData: this.state.storeCodeData,
      shoreSelectedCount: storeCount,
      selectedStoreValues: finalValue,
    });
  };

  /// handle apply selected store data
  handleApplySelectedStore() {
    this.setState({
      chooseStoreModal: false,
      showApplyStoreData: true,
    });
  }
  /// handle filter store data
  handleStoreFilterData(filterData) {
    var tempstore = this.state.tempStoreCodeData;
    var finalStore = tempstore.filter((item) =>
      item.storeName.startsWith(filterData)
    );
    this.setState({
      storeCodeData: finalStore,
    });
  }
  /// handle slot store search
  handleSlotStoreSearchOnchange(e) {
    this.setState({ slotStoreSearch: e.target.value });
  }
  /// handle store search
  handleStoreSearch = (e) => {
    e.preventDefault();
    debugger;
    var tempstore = this.state.tempStoreCodeData;
    var Value = this.state.slotStoreSearch;

    var FinalstoreList = tempstore.filter((item) =>
      item.storeName.includes(Value)
    );

    if (FinalstoreList.length > 0) {
      this.setState({ storeCodeData: FinalstoreList });
    } else {
      this.setState({
        storeCodeData: [],
      });
    }
  };

  handleGetOperationalDays() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetStoreOperationalDays",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ operationalDaysData: data });
        } else {
          self.setState({ operationalDaysData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //// handle Remove store from selected store
  handleRemoveSelectedStore(store_id) {
    debugger;
    var storeCount = 0;
    var finalValue = "";
    var values = "";

    this.state.storeCodeData.filter(
      (x) => x.storeID === store_id
    )[0].isChecked = false;

    this.state.storeCodeData.forEach((element) => {
      if (element.isChecked) {
        storeCount += 1;
        values += element.storeName + ",";
      }
    });

    finalValue = values.substring(",", values.length - 1);

    this.setState({
      storeCodeData: this.state.storeCodeData,
      shoreSelectedCount: storeCount,
      selectedStoreValues: finalValue,
    });
  }
  handleGetSlotTemplate() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetSlotTemplates",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ slotTemplateData: data });
        } else {
          self.setState({ slotTemplateData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  /// handle Submit automatica data
  handleSubmitAutomaticData() {
    if (
      this.state.autoTempName !== "" &&
      this.state.AutoSlotDuration !== 0 &&
      this.state.AutoSlotGap !== 0 &&
      this.state.autoStoreFrom !== "" &&
      this.state.autoStoreTo !== "" &&
      this.state.autoNonOptFrom !== "" &&
      this.state.autoNonOptTo !== ""
    ) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/GetGeneratedSlots",
        headers: authHeader(),
        data: {
          SlotTemplateName: this.state.autoTempName.trim(),
          SlotTemplateType: this.state.slotAutomaticRadio === 1 ? "A" : "M",
          Slotduration: parseFloat(this.state.AutoSlotDuration),
          SlotGaps: parseFloat(this.state.AutoSlotGap),
          StoreOpenAt: moment(this.state.autoStoreFrom).format("HH:mm"),
          StoreCloseAt: moment(this.state.autoStoreTo).format("HH:mm"),
          StoreNonOpFromAt: moment(this.state.autoNonOptFrom).format("HH:mm"),
          StoreNonOpToAt: moment(this.state.autoNonOptTo).format("HH:mm"),
        },
      })
        .then((res) => {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            self.setState({
              autoTempNameCompulsory: "",
              AutoSlotDurationCompulsory: "",
              AutoSlotGapCompulsory: "",
              autoStoreFromCompulsory: "",
              autoStoreToCompulsory: "",
              autoNonOptFromCompulsory: "",
              autoNonOptToCompulsory: "",
              automaticaSlotTblData: data,
            });

            NotificationManager.success("Slot Generated.");
          } else {
            NotificationManager.error("Slot Generated failed.");
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        autoTempNameCompulsory: "Please Enter Template Name.",
        AutoSlotDurationCompulsory: "Please Select Slot Duration.",
        AutoSlotGapCompulsory: "Please Select Slot Gap.",
        autoStoreFromCompulsory: "Please Select From Time.",
        autoStoreToCompulsory: "Please Select To Time.",
        autoNonOptFromCompulsory: "Please Select From Time.",
        autoNonOptToCompulsory: "Please Select To Time.",
      });
    }
  }
  //// handle finale automatic save data
  handleFinalSaveTemplateData(check) {
    debugger;
    let self = this;
    var inputParam = {};
    var slot_Id = 0;
    if (check === "Automatic") {
      inputParam.SlotTemplateName = this.state.autoTempName.trim();
      inputParam.SlotTemplateType = "A";
      inputParam.Slotduration = parseFloat(this.state.AutoSlotDuration);
      inputParam.SlotGaps = parseFloat(this.state.AutoSlotGap);
      inputParam.StoreOpenAt = moment(this.state.autoStoreFrom).format("HH:mm");
      inputParam.StoreCloseAt = moment(this.state.autoStoreTo).format("HH:mm");
      inputParam.StoreNonOpFromAt = moment(this.state.autoNonOptFrom).format(
        "HH:mm"
      );
      inputParam.StoreNonOpToAt = moment(this.state.autoNonOptTo).format(
        "HH:mm"
      );
      inputParam.TemplateSlots = this.state.automaticaSlotTblData;
    } else {
      var manualSlotDuration = parseFloat(this.state.ManualSlotDuration);
      var slot_Duration =
        manualSlotDuration === 15
          ? 0.25
          : manualSlotDuration === 30
          ? 0.5
          : manualSlotDuration === 45
          ? 0.5
          : manualSlotDuration === 60
          ? 0.75
          : manualSlotDuration === 1
          ? 1
          : manualSlotDuration === 1.5
          ? 1.5
          : manualSlotDuration === 2
          ? 2
          : 0;

      inputParam.SlotTemplateName = this.state.manualTempName.trim();
      inputParam.SlotTemplateType = "M";
      inputParam.Slotduration = slot_Duration;
      inputParam.SlotGaps = 0;
      inputParam.StoreOpenAt = moment(this.state.manualStoreFrom).format(
        "HH:mm"
      );
      inputParam.StoreCloseAt = moment(this.state.manualStoreTo).format(
        "HH:mm"
      );
      inputParam.StoreNonOpFromAt = "";
      inputParam.StoreNonOpToAt = "";
      this.state.manualStoreTblData.forEach((element) => {
        slot_Id += 1;
        element.slotID = slot_Id;
        element.slotOccupancy = 0;
        element.slotTemplateID = 0;
      });
      inputParam.TemplateSlots = this.state.manualStoreTblData;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/CreateSlotTemplate",
      headers: authHeader(),
      data: inputParam,
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            autoTempName: "",
            AutoSlotDuration: 0,
            AutoSlotGap: 0,
            autoStoreFrom: "",
            autoStoreTo: "",
            autoNonOptFrom: "",
            autoNonOptTo: "",
            manualTempName: "",
            manualStoreFrom: "",
            manualStoreTo: "",
            ManualSlotDuration: 0,
            createTampleteModal: false,
            finalSlotTemplateId: data,
          });
          if (check === "Automatic") {
            NotificationManager.success("Automatic Template Created.");
          } else {
            NotificationManager.success("Manual Template Created.");
          }
          self.handleGetSlotTemplate();
        } else {
          if (check === "Automatic") {
            NotificationManager.error("Automatic Template Not Created..");
          } else {
            NotificationManager.error("Manual Template Not Created..");
          }
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  /// handle manual time onchange
  handleManualTimeOnchange = (time, check) => {
    debugger;
    var manualStoreData = this.state.manualStoreData;
    if (check === "slotStartTime") {
      manualStoreData["slotStartTime"] = time;
      manualStoreData["manualSlotStartTime"] = time;
      this.state.manualStoreData["slotEndTime"] = moment(
        manualStoreData["slotStartTime"]
      )
        .add(Number(this.state.ManualSlotDuration), "m")
        .toDate();
    } else if (check === "slotEndTime") {
      manualStoreData["slotEndTime"] = time;
      manualStoreData["manualSlotEndTime"] = time;
    }
    this.setState({
      manualStoreData,
    });
  };
  /// handle Manual selct duration
  handleManualSelectDuration = (e) => {
    let values = e.target.value;
    var manualStoreData = this.state.manualStoreData;
    manualStoreData[e.target.name] = e.target.selectedOptions[0].text;
    manualStoreData["Slotduration "] = values;
    this.setState({ ManualSlotDuration: values, manualStoreData });
  };
  /// handle Create Manualy create slot
  handleAddManualySlot() {
    debugger;
    if (
      this.state.manualTempName !== "" &&
      this.state.manualStoreFrom !== "" &&
      this.state.manualStoreTo !== "" &&
      this.state.ManualSlotDuration !== 0 &&
      this.state.manualStoreData.slotEndTime !== ""
      // && this.state.manualStoreData.slotStartTime !== ""
    ) {
      var manualStoreTblData = [];
      manualStoreTblData = this.state.manualStoreTblData;
      var start = this.state.manualStoreData["slotStartTime"];
      var end = this.state.manualStoreData["slotEndTime"];

      var ObjData = {};
      ObjData.slotStartTime = moment(start).format("LT");
      ObjData.slotEndTime = moment(end).format("LT");

      manualStoreTblData.push(ObjData);
      this.setState({
        manualStoreTblData,
        mimSlotStartTimeChck: this.state.manualStoreData.slotEndTime,
      });
      NotificationManager.success("Manual Slot Created.");
    } else {
      this.setState({
        manualTempNameCompulsory: "Please Enter Template Name.",
        manualStoreFromCompulsory: "Please Select From Time.",
        manualStoreToCompulsory: "Please Select To Time.",
        ManualSlotDurationCompulsory: "Please Select Slot Duration.",
        manualSlotStartCompulsory: "Please Select Start Time.",
        manualSlotEndCompulsory: "Please Select End Time.",
      });
    }
  }
  /// handle manual Delete slot
  handleManualDeleteSlot(id) {
    let manualStoreTblData = [...this.state.manualStoreTblData];
    manualStoreTblData.splice(id, 1);
    this.setState({ manualStoreTblData });
    NotificationManager.success("Slot Deleted.");
  }
  /// handle Get Slots By TemplateID
  handleGetSlotsByTemplateID() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetSlotsByTemplateID",
      headers: authHeader(),
      params: {
        SlotTemplateID: this.state.selectedSlotTemplate,
      },
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ SlotTemplateGridData: data });
        } else {
          self.setState({ SlotTemplateGridData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////handle slot occupancy change text in table
  handleslotOccupancyChange = (id, e) => {
    debugger;
    if (Number(e.target.value) <= 30) {
      this.state.SlotTemplateGridData.filter(
        (x) => x.slotID === id
      )[0].slotOccupancy = e.target.value || "";
    } else {
      this.state.SlotTemplateGridData.filter(
        (x) => x.slotID === id
      )[0].slotOccupancy = "";
    }
    this.setState({ SlotTemplateGridData: this.state.SlotTemplateGridData });
  };
  handleslotActiveInActive = (id) => {
    debugger;
    this.state.SlotTemplateGridData.filter(
      (x) => x.slotID === id
    )[0].isSlotEnabled = !this.state.SlotTemplateGridData.filter(
      (x) => x.slotID === id
    )[0].isSlotEnabled;
    this.setState({ SlotTemplateGridData: this.state.SlotTemplateGridData });
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.modules
              : "Modules"}
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
              <div className="sort-sctn">
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
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortatoz
                      : "SORT BY A TO Z"}
                  </p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortztoa
                      : "SORT BY Z TO A"}
                  </p>
                </div>
              </div>
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
                    : "FILTER BY TYPE"}
                </p>
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
                        this.state.scampaignNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sstatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "campaignName"
                    ? this.state.sortFiltercampaignName !== null &&
                      this.state.sortFiltercampaignName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.campaignName}
                            value={item.campaignName}
                            checked={this.state.scampaignNameFilterCheckbox.includes(
                              item.campaignName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "campaignName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.campaignName}>
                            <span className="table-btn table-blue-btn">
                              {item.campaignName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdBy"
                    ? this.state.sortFiltercreatedBy !== null &&
                      this.state.sortFiltercreatedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
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

                  {this.state.sortColumn === "status"
                    ? this.state.sortFilteristatus !== null &&
                      this.state.sortFilteristatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.status}
                            value={item.status}
                            checked={this.state.sstatusFilterCheckbox.includes(
                              item.status
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "status",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.status}>
                            <span className="table-btn table-blue-btn">
                              {item.status}
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
        <div className="Store-paddmodule storeModule">
          <div className="module-tabs">
            <section>
              <div>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#Module-Claim-Tab"
                      role="tab"
                      aria-controls="Module-Claim-Tab"
                      aria-selected="true"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.claim
                        : "Claim"}
                    </a>
                  </li>
                  <li
                    className={
                      config.isHomeShope ? "nav-item displayNn" : "nav-item"
                    }
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Module-CampaignScript-Tab"
                      role="tab"
                      aria-controls="Module-CampaignScript-Tab"
                      aria-selected="false"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.campaignscript
                        : "Campaign Script"}
                    </a>
                  </li>
                  <li
                    className={
                      config.isHomeShope ? "nav-item" : "nav-item displayNn"
                    }
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Module-CampaignChannel-Tab"
                      role="tab"
                      aria-controls="Module-CampaignChannel-Tab"
                      aria-selected="false"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.campaignchannel
                        : "Campaign Channel"}
                    </a>
                  </li>
                  <li
                    className={
                      config.isHomeShope ? "nav-item" : "nav-item displayNn"
                    }
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Module-AppointmentConfig-Tab"
                      role="tab"
                      aria-controls="Module-AppointmentConfig-Tab"
                      aria-selected="false"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.appointmentconfiguration
                        : "Appointment Configuration"}
                    </a>
                  </li>
                  <li
                    className={
                      config.isHomeShope ? "nav-item" : "nav-item displayNn"
                    }
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Module-BroadcastConfig-Tab"
                      role="tab"
                      aria-controls="Module-BroadcastConfig-Tab"
                      aria-selected="false"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.broadcastconfiguration
                        : "Broadcast Configuration"}
                    </a>
                  </li>
                  <li
                    className={
                      config.isHomeShope ? "nav-item" : "nav-item displayNn"
                    }
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Module-SlotSetting-Tab"
                      role="tab"
                      aria-controls="Module-SlotSetting-Tab"
                      aria-selected="false"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.slotsettings
                        : "Slot Settings"}
                    </a>
                  </li>
                  <li
                    className={
                      config.isHomeShope ? "nav-item" : "nav-item displayNn"
                    }
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Module-LanguageSetting-Tab"
                      role="tab"
                      aria-controls="Module-LanguageSetting-Tab"
                      aria-selected="false"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.languagesettings
                        : "Language Settings"}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content p-0">
                <div
                  className="tab-pane fade show active"
                  id="Module-Claim-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-Claim-Tab"
                >
                  <div style={{ height: "100vh" }} className="chatallowedStore">
                    <div className="row">
                      <div className="col-md-4 chatallowed">
                        <label className="claimtab-lbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.attachmentsettings
                            : "Attachment Settings"}
                        </label>
                        <label className="claimTab-DDl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.maximumattachmentsize
                            : "Maximum Attachment Size"}
                        </label>
                        <select
                          name="selectedMaxAttachSize"
                          value={this.state.selectedMaxAttachSize}
                          onChange={this.setClaimTabData}
                        >
                          <option value={0}>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.selectsize
                              : "Select Size"}
                          </option>
                          {this.state.maxAttachSize !== null &&
                            this.state.maxAttachSize.map((item, i) => (
                              <option key={i} value={item.numb}>
                                {item.numbMB}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectedMaxAttachSize) == 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.maxAttachSizeCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row claim-mgn">
                      <div className="col-md-3 chatallowed">
                        <label className="claimTab-DDl">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.fileformat
                            : "File Format"}
                        </label>
                        <select
                          name="selectedFileFormat"
                          value={this.state.selectedFileFormat}
                          onChange={this.setClaimTabData}
                        >
                          <option value={0}>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.selectfileformat
                              : "Select File Format"}
                          </option>
                          {this.state.fileFormat !== null &&
                            this.state.fileFormat.map((item, i) => (
                              <option key={i} value={item.formatID}>
                                {item.fileFormaName}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectedFileFormat) == 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.fileFormatCompulsion}
                          </p>
                        )}
                        <div className="btn-store mt-4">
                          <button
                            className="Schedulenext1"
                            onClick={this.handleAttachmentSave.bind(this)}
                            disabled={this.state.claimTabLoading}
                          >
                            {this.state.claimTabLoading ? (
                              <FontAwesomeIcon
                                className="circular-loader"
                                icon={faCircleNotch}
                                spin
                              />
                            ) : (
                              ""
                            )}
                            {TranslationContext !== undefined
                              ? TranslationContext.button.save
                              : "SAVE"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="Module-CampaignScript-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-CampaignScript-Tab"
                >
                  <div className="backNone">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="table-cntr table-height alertsTable align-table">
                          <ReactTable
                            data={this.state.campaignScriptData}
                            columns={[
                              {
                                Header: (
                                  <span
                                    className={
                                      this.state.sortHeader === "Campaign Name"
                                        ? "table-column sort-column"
                                        : "table-column"
                                    }
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "campaignName",
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.campaignname
                                        : "Campaign Name"
                                    )}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.span.campaignname
                                      : "Campaign Name"}

                                    <FontAwesomeIcon
                                      icon={
                                        this.state.isATOZ == false &&
                                        this.state.sortHeader ===
                                          "Campaign Name"
                                          ? faCaretUp
                                          : faCaretDown
                                      }
                                    />
                                  </span>
                                ),
                                sortable: false,
                                accessor: "campaignName",
                              },
                              {
                                Header: "Campaign Script",
                                accessor: "campaignScriptLess",
                                className: "communication-labelHeader",
                                sortable: false,
                                Cell: (row) => {
                                  var ids = row.original["id"];
                                  return (
                                    <div>
                                      <span className="d-flex align-items-end">
                                        <span className="campaign-script-less">
                                          {row.original.campaignScriptLess}
                                          {row.original.campaignScript}
                                        </span>
                                        <Popover
                                          content={
                                            <div className="store-popDiv">
                                              <label className="storePop-lbl">
                                                {row.original.campaignScript}
                                              </label>
                                            </div>
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
                              },
                              {
                                id: "createdBy",
                                sortable: false,
                                Header: (
                                  <span
                                    className={
                                      this.state.sortHeader === "Department"
                                        ? "table-column sort-column"
                                        : "table-column"
                                    }
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "createdBy",
                                      "Created by"
                                    )}
                                  >
                                    Created by
                                    <FontAwesomeIcon
                                      icon={
                                        this.state.isATOZ == false &&
                                        this.state.sortHeader === "Created by"
                                          ? faCaretUp
                                          : faCaretDown
                                      }
                                    />
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
                                                    Created By:
                                                    {row.original.createdBy}
                                                  </p>
                                                </b>
                                                <p className="sub-title">
                                                  Created Date:
                                                  {row.original.createdOn}
                                                </p>
                                              </div>
                                              <div>
                                                <b>
                                                  <p className="title">
                                                    Updated By:
                                                    {row.original.modifiedBy}
                                                  </p>
                                                </b>
                                                <p className="sub-title">
                                                  Updated Date:
                                                  {row.original.modifiedOn}
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
                                // accessor: "createdBy"
                              },
                              {
                                Header: (
                                  <span
                                    className={
                                      this.state.sortHeader === "Status"
                                        ? "table-column sort-column"
                                        : "table-column"
                                    }
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "status",
                                      "Status"
                                    )}
                                  >
                                    Status
                                    <FontAwesomeIcon
                                      icon={
                                        this.state.isATOZ == false &&
                                        this.state.sortHeader === "Status"
                                          ? faCaretUp
                                          : faCaretDown
                                      }
                                    />
                                  </span>
                                ),
                                sortable: false,
                                accessor: "status",
                                width: 110,
                                Cell: (row) => {
                                  return row.original.status
                                    ? "Active"
                                    : "Inactive";
                                },
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
                                                <img
                                                  src={DelBigIcon}
                                                  alt="del-icon"
                                                />
                                              </div>
                                              <div>
                                                <p className="font-weight-bold blak-clr">
                                                  Delete file?
                                                </p>
                                                <p className="mt-1 fs-12">
                                                  Are you sure you want to
                                                  delete this file?
                                                </p>
                                                <div className="del-can">
                                                  <a href={Demo.BLANK_LINK}>
                                                    CANCEL
                                                  </a>
                                                  <button
                                                    className="butn"
                                                    onClick={this.deleteCampaign.bind(
                                                      this,
                                                      row.original.campaignID
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
                                            src={DelBlack}
                                            alt="del-icon"
                                            className="del-btn"
                                            id={ids}
                                          />
                                        </Popover>
                                        <button
                                          className="react-tabel-button editre"
                                          id="p-edit-pop-2"
                                          onClick={this.updateCampaign.bind(
                                            this,
                                            row.original
                                          )}
                                        >
                                          EDIT
                                        </button>
                                      </span>
                                    </>
                                  );
                                },
                              },
                            ]}
                            resizable={false}
                            minRows={2}
                            defaultPageSize={5}
                            showPagination={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="right-sect-div">
                          <h3>Create CAMPAIGN SCRIPT</h3>
                          <div className="div-cntr issuetype-cusdrp">
                            <label>Campaign Name</label>
                            <div className="dropdown">
                              <button
                                className="btn issuesladrop"
                                type="button"
                                // data-toggle="dropdown"
                                id="campaignNameValue"
                                onClick={this.handleCampaignButton}
                              >
                                Select
                                <span className="caret"></span>
                              </button>
                              {this.state.indiCampaign === "" && (
                                <p
                                  style={{
                                    color: "red",
                                    marginBottom: "0px",
                                  }}
                                >
                                  {this.state.issueTypeCompulsion}
                                </p>
                              )}
                              <div
                                className={
                                  this.state.campaignShow
                                    ? "dropdown-menu dropdown-menu-sla show"
                                    : "dropdown-menu dropdown-menu-sla"
                                }
                              >
                                <div className="cat-mainbox">
                                  <div className="category-button">
                                    <ul>
                                      <li>
                                        <label
                                          onClick={this.selectAllCampaign.bind(
                                            this
                                          )}
                                        >
                                          Select All
                                        </label>
                                      </li>
                                      <li>
                                        <label
                                          onClick={this.selectNoCampaign.bind(
                                            this
                                          )}
                                        >
                                          Clear
                                        </label>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="category-box category-scroll">
                                    <ul>
                                      {this.state.campaignName !== null &&
                                        this.state.campaignName.map(
                                          (item, i) => (
                                            <li key={i}>
                                              <input
                                                type="checkbox"
                                                id={"i" + item.campaignNameID}
                                                name="allCampaign"
                                                onChange={this.selectIndividualCampaign.bind(
                                                  this,
                                                  item.campaignNameID
                                                )}
                                              />
                                              <label
                                                htmlFor={
                                                  "i" + item.campaignNameID
                                                }
                                              >
                                                {item.campaignName}
                                                <div>
                                                  <img
                                                    src={Correct}
                                                    alt="Checked"
                                                  />
                                                </div>
                                              </label>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </div>
                                </div>
                                <div className="category-buttonbtm">
                                  <ul>
                                    <li>
                                      <button
                                        className="cancel"
                                        onClick={this.handleCampaignButton}
                                      >
                                        Cancel
                                      </button>
                                    </li>
                                    <li
                                      style={{
                                        float: "right",
                                      }}
                                    >
                                      <button
                                        className="done"
                                        onClick={this.handleCampaignButton}
                                      >
                                        Done
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {this.state.indiCampaign.length == 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.campaignCompulsion}
                              </p>
                            )}
                          </div>

                          <div className="div-cntr">
                            <label>Script Details</label>
                            <textarea
                              className="stort-textArea"
                              rows="7"
                              name="scriptDetails"
                              value={this.state.scriptDetails}
                              onChange={this.setScriptDetails}
                            ></textarea>
                            {this.state.scriptDetails.length == 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.scriptDetailsCompulsion}
                              </p>
                            )}
                          </div>
                          <button
                            className="butn"
                            onClick={this.handleCreateCampaignScript.bind(this)}
                            disabled={this.state.addCampaignLoading}
                          >
                            {this.state.addCampaignLoading ? (
                              <FontAwesomeIcon
                                className="circular-loader"
                                icon={faCircleNotch}
                                spin
                              />
                            ) : (
                              ""
                            )}
                            ADD
                          </button>
                        </div>
                        <div className="right-sect-div">
                          <div className="d-flex justify-content-between align-items-center pb-2">
                            <h3 className="pb-0">Bulk Upload</h3>
                            <div className="down-excel">
                              <p>Template</p>
                              <CSVLink
                                filename={"Campaign.csv"}
                                data={config.campaignTemplate}
                              >
                                <img src={DownExcel} alt="download icon" />
                              </CSVLink>
                            </div>
                          </div>
                          <div className="mainfileUpload">
                            <Dropzone onDrop={this.fileUpload}>
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                  <input
                                    {...getInputProps()}
                                    className="file-upload d-none"
                                  />
                                  <div className="file-icon">
                                    <img src={FileUpload} alt="file-upload" />
                                  </div>
                                  <span className={"fileupload-span"}>
                                    Add File
                                  </span>
                                  or Drop File here
                                </div>
                              )}
                            </Dropzone>
                          </div>
                          {this.state.fileValidation ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fileValidation}
                            </p>
                          ) : null}
                          {this.state.fileName && (
                            <div className="file-info">
                              <div className="file-cntr">
                                <div className="file-dtls">
                                  <p className="file-name">
                                    {this.state.fileName}
                                  </p>
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
                                          Are you sure you want to delete this
                                          file?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                                          <button
                                            className="butn"
                                            onClick={this.DeleteBulkUploadFile}
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
                              {this.state.isErrorBulkUpload ? (
                                <div className="file-cntr">
                                  <div className="file-dtls">
                                    <p className="file-name">
                                      {this.state.fileName}
                                    </p>
                                    <span
                                      className="file-retry"
                                      onClick={this.handleBulkUpload.bind(this)}
                                    >
                                      Retry
                                    </span>
                                  </div>
                                  <div>
                                    <span className="file-failed">Failed</span>
                                  </div>
                                </div>
                              ) : null}
                              {this.state.isShowProgress ? (
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
                                        now={60}
                                      />
                                      <div className="cancel-upload">
                                        <img
                                          src={UploadCancel}
                                          alt="upload cancel"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )}
                          <button
                            className="butn"
                            onClick={this.handleBulkUpload.bind(this)}
                          >
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="overlaySla"
                    className={this.state.campaignOvrlayShow ? "show" : ""}
                    onClick={this.handleCampaignButton}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="Module-CampaignChannel-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-CampaignChannel-Tab"
                >
                  <div className="backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.campaignchannel
                                    : "CAMPAIGN CHANNEL"}
                                </h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.sms
                                          : "SMS"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckSmsCamp1"
                                        name="allModules"
                                        checked={
                                          this.state.campaignChannelData.smsFlag
                                        }
                                        onChange={this.CampChannelSmsFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckSmsCamp1"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  {this.state.campaignChannelData.smsFlag ? (
                                    <div className="cusinput">
                                      <input
                                        type="text"
                                        name="providerName"
                                        autoComplete="off"
                                        placeholder="Provider name"
                                        maxLength={15}
                                        value={
                                          this.state.campaignChannelData
                                            .providerName
                                        }
                                        onChange={this.CampCannelOnChange.bind(
                                          this
                                        )}
                                      />
                                      {this.state.campaignChannelData
                                        .providerName === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.campProviderValidation}
                                        </p>
                                      )}
                                    </div>
                                  ) : null}

                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.whatsapp
                                          : "Whatsapp"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckWhatCamp2"
                                        name="allModules"
                                        checked={
                                          this.state.campaignChannelData
                                            .messengerFlag
                                        }
                                        onChange={this.CampChannelSmsFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckWhatCamp2"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.chatbot
                                          : "Chatbot"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckChatCamp3"
                                        name="allModules"
                                        checked={
                                          this.state.campaignChannelData.botFlag
                                        }
                                        onChange={this.CampChannelSmsFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckChatCamp3"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.email
                                          : "Email"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckEmailCamp4"
                                        name="allModules"
                                        checked={
                                          this.state.campaignChannelData
                                            .emailFlag
                                        }
                                        onChange={this.CampChannelSmsFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckEmailCamp4"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                </div>
                                <table className="cmpaign-channel-table">
                                  <tr>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td
                                            .maxclickallowesonanychannelcta
                                        : "Max. click allowed on any channel CTA"}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="maxClickAllowed"
                                        value={
                                          this.state.campaignChannelData
                                            .maxClickAllowed
                                        }
                                        autoComplete="off"
                                        maxLength={3}
                                        onChange={this.CampCannelOnChange.bind(
                                          this
                                        )}
                                      />
                                      {this.state.campaignChannelData
                                        .maxClickAllowed === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.maxClickValidation}
                                        </p>
                                      )}
                                    </td>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td.clicktd
                                        : "Click"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td
                                            .clickwillbeenabledafter
                                        : "Click will be enabled after"}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="enableClickAfterValue"
                                        autoComplete="off"
                                        maxLength={2}
                                        value={
                                          this.state.campaignChannelData
                                            .enableClickAfterValue
                                        }
                                        onChange={this.CampCannelOnChange.bind(
                                          this
                                        )}
                                      />
                                      {this.state.campaignChannelData
                                        .enableClickAfterValue === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.enabledAfterValidation}
                                        </p>
                                      )}
                                    </td>
                                    <td>
                                      <select
                                        value={
                                          this.state.campaignChannelData
                                            .enableClickAfterDuration
                                        }
                                        name="enableClickAfterDuration"
                                        onChange={this.CampCannelOnChange.bind(
                                          this
                                        )}
                                      >
                                        <option value="M">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.min
                                            : "Min"}
                                        </option>
                                        <option value="H">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.hr
                                            : "Hr"}
                                        </option>
                                      </select>
                                    </td>
                                  </tr>
                                </table>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleCheckCampaignValidation.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="Module-AppointmentConfig-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-AppointmentConfig-Tab"
                >
                  <div className="backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3
                                        .appointmentconfiguration
                                    : "APPOINTMENT CONFIGURATION"}
                                </h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.generateotp
                                          : "Generate OTP"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckAppconfigOTP"
                                        name="allModules"
                                        checked={
                                          this.state.AppointConfigData
                                            .generateOTP
                                        }
                                        onChange={this.AppoinmentConfigFlageChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckAppconfigOTP"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.cardqrcode
                                          : "Card + QR Code"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckAppconfigCardQR"
                                        name="allModules"
                                        checked={
                                          this.state.AppointConfigData
                                            .cardQRcode
                                        }
                                        onChange={this.AppoinmentConfigFlageChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckAppconfigCardQR"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.cardbarcode
                                          : "Card + Barcode"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckAppconfigCardBar"
                                        name="allModules"
                                        checked={
                                          this.state.AppointConfigData
                                            .cardBarcode
                                        }
                                        onChange={this.AppoinmentConfigFlageChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckAppconfigCardBar"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>

                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.onlycard
                                          : "Only Card"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckAppconfigCard"
                                        name="allModules"
                                        checked={
                                          this.state.AppointConfigData.onlyCard
                                        }
                                        onChange={this.AppoinmentConfigFlageChange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckAppconfigCard"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                </div>
                                <table className="cmpaign-channel-table">
                                  <tr>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td
                                            .otptimeconfiguration
                                        : "OTP Time Configuration"}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        autoComplete="off"
                                        maxLength={2}
                                        // value={
                                        //   this.state.BroadCastConfigData
                                        //     .enableClickAfterValue
                                        // }
                                        // onChange={this.BroadCastOnChange.bind(
                                        //   this
                                        // )}
                                      />
                                    </td>
                                    <td>
                                      <select
                                      // value={
                                      //   this.state.BroadCastConfigData
                                      //     .enableClickAfterDuration
                                      // }
                                      // name="enableClickAfterDuration"
                                      // onChange={this.BroadCastOnChange.bind(
                                      //   this
                                      // )}
                                      >
                                        <option value="S">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.sec
                                            : "Sec"}
                                        </option>
                                        <option value="M">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.min
                                            : "Min"}
                                        </option>
                                        <option value="H">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.hr
                                            : "Hr"}
                                        </option>
                                      </select>
                                    </td>
                                  </tr>
                                </table>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleUpdateAppointmentConfigData.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="Module-BroadcastConfig-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-BroadcastConfig-Tab"
                >
                  <div className="backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-5 m-auto">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3
                                        .broadcastconfiguration
                                    : "BROADCAST CONFIGURATION"}
                                </h3>
                                <div className="module-switch-cntr">
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.sms
                                          : "SMS"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckbroadSMS"
                                        name="allModules"
                                        checked={
                                          this.state.BroadCastConfigData.smsFlag
                                        }
                                        onChange={this.handleBroadCongiFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckbroadSMS"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                    {this.state.BroadCastConfigData.smsFlag ? (
                                      <div className="cusinput">
                                        <input
                                          type="text"
                                          name="providerName"
                                          autoComplete="off"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                  .providername
                                              : "Provider name"
                                          }
                                          maxLength={15}
                                          value={
                                            this.state.BroadCastConfigData
                                              .providerName
                                          }
                                          onChange={this.BroadCastOnChange.bind(
                                            this
                                          )}
                                        />
                                        {this.state.BroadCastConfigData
                                          .providerName === "" && (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.broadProviderValidation}
                                          </p>
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.whatsapp
                                          : "Whatsapp"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckbroadwhatsapp"
                                        name="allModules"
                                        checked={
                                          this.state.BroadCastConfigData
                                            .whatsappFlag
                                        }
                                        onChange={this.handleBroadCongiFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckbroadwhatsapp"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="module-switch">
                                    <div className="switch switch-primary">
                                      <label className="storeRole-name-text m-0">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.email
                                          : "Email"}
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="ckbroadEmail"
                                        name="allModules"
                                        checked={
                                          this.state.BroadCastConfigData
                                            .emailFlag
                                        }
                                        onChange={this.handleBroadCongiFlageOnchange.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        htmlFor="ckbroadEmail"
                                        className="cr cr-float-auto"
                                      ></label>
                                    </div>
                                  </div>
                                </div>
                                <table className="cmpaign-channel-table">
                                  <tr>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td
                                            .maxclickallowesonanychannelcta
                                        : "Max. click allowed on any channel CTA"}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="maxClickAllowed"
                                        value={
                                          this.state.BroadCastConfigData
                                            .maxClickAllowed
                                        }
                                        autoComplete="off"
                                        maxLength={2}
                                        onChange={this.BroadCastOnChange.bind(
                                          this
                                        )}
                                      />
                                      {this.state.BroadCastConfigData
                                        .maxClickAllowed === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {this.state.braodCastMaxClickValid}
                                        </p>
                                      )}
                                    </td>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td.click
                                        : "Click"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.td
                                            .clickwillbeenabledafter
                                        : "Click will be enabled after"}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="enableClickAfterValue"
                                        autoComplete="off"
                                        maxLength={2}
                                        value={
                                          this.state.BroadCastConfigData
                                            .enableClickAfterValue
                                        }
                                        onChange={this.BroadCastOnChange.bind(
                                          this
                                        )}
                                      />
                                      {this.state.BroadCastConfigData
                                        .enableClickAfterValue === "" && (
                                        <p
                                          style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          {
                                            this.state
                                              .broadCastEnabledAfterValid
                                          }
                                        </p>
                                      )}
                                    </td>
                                    <td>
                                      <select
                                        value={
                                          this.state.BroadCastConfigData
                                            .enableClickAfterDuration
                                        }
                                        name="enableClickAfterDuration"
                                        onChange={this.BroadCastOnChange.bind(
                                          this
                                        )}
                                      >
                                        <option value="M">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.min
                                            : "Min"}
                                        </option>
                                        <option value="H">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option.hr
                                            : "Hr"}
                                        </option>
                                      </select>
                                    </td>
                                  </tr>
                                </table>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.CheckBroadCastValidation.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.update
                                    : "UPDATE"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="Module-SlotSetting-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-SlotSetting-Tab"
                >
                  <div className="backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-10 m-auto">
                              <div
                                className="right-sect-div slot-newd"
                                style={{ padding: "20px" }}
                              >
                                <Tabs>
                                  <Tab label="Manual">
                                    <div className="manualbox operational-select">
                                      <div className="">
                                        <ul>
                                          <li>
                                            <label>Choose Store</label>
                                            <div
                                              className="input-group"
                                              onClick={this.handleChooseStoreOpenModal.bind(
                                                this
                                              )}
                                            >
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                value={
                                                  this.state.showApplyStoreData
                                                    ? this.state
                                                        .selectedStoreValues
                                                    : ""
                                                }
                                              />
                                              <span className="input-group-append">
                                                <img
                                                  src={searchico}
                                                  alt="search-icon"
                                                  className="cr-pnt"
                                                />
                                              </span>
                                            </div>
                                            {this.state.showApplyStoreData && (
                                              <a
                                                style={{ float: "left" }}
                                                onClick={this.handleSelectedStoreOpenModal.bind(
                                                  this
                                                )}
                                              >
                                                {this.state.shoreSelectedCount}
                                                &nbsp; Store Selected {">"}
                                              </a>
                                            )}
                                          </li>
                                          <li>
                                            <label>Operational Days</label>
                                            {/* <select
                                              name=""
                                              className="form-control"
                                            >
                                              <option value={0}>Select</option>
                                              <option value={0}>1</option>
                                            </select> */}
                                            <Select
                                              className="select-oper"
                                              getOptionLabel={(option) =>
                                                option.dayName
                                              }
                                              getOptionValue={(option) =>
                                                option.dayID
                                              }
                                              options={
                                                this.state.operationalDaysData
                                              }
                                              placeholder="Please Select Operational Days"
                                              closeMenuOnSelect={false}
                                              isMulti
                                            />
                                          </li>
                                          <li>
                                            <label>Select Slot Template</label>
                                            <select
                                              className="form-control"
                                              name="selectedSlotTemplate"
                                              value={
                                                this.state.selectedSlotTemplate
                                              }
                                              onChange={(e) =>
                                                this.setState({
                                                  selectedSlotTemplate:
                                                    e.target.value,
                                                })
                                              }
                                            >
                                              <option value={0}>Select</option>
                                              {this.state.slotTemplateData !==
                                                null &&
                                                this.state.slotTemplateData.map(
                                                  (item, s) => (
                                                    <option
                                                      key={s}
                                                      value={
                                                        item.slotTemplateID
                                                      }
                                                    >
                                                      {item.slotTemplateName}
                                                    </option>
                                                  )
                                                )}
                                            </select>
                                            <a
                                              onClick={this.handleCreateTempletetOpenModal.bind(
                                                this
                                              )}
                                            >
                                              + Create New Template
                                            </a>
                                          </li>
                                          <li>
                                            {!this.state.isNextClick && (
                                              <button
                                                className="butn"
                                                onClick={this.handleNextButtonOpen.bind(
                                                  this
                                                )}
                                              >
                                                {"Next" + ">>"}
                                              </button>
                                            )}
                                          </li>
                                        </ul>
                                      </div>
                                      {this.state.isNextClick ? (
                                        <div className="nextbox">
                                          <div className="">
                                            <Table
                                              dataSource={
                                                this.state.SlotTemplateGridData
                                              }
                                              noDataContent="No Record Found"
                                              pagination={false}
                                              className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                              columns={[
                                                {
                                                  title: "S.No.",
                                                  dataIndex: "slotID",
                                                },
                                                {
                                                  title: "Slot Start Time",
                                                  dataIndex: "slotStartTime",
                                                },
                                                {
                                                  title: "Slot End Time",
                                                  dataIndex: "slotEndTime",
                                                },
                                                {
                                                  title: "Slot Occupancy",
                                                  dataIndex: "slotOccupancy",
                                                  render: (row, rowData) => {
                                                    debugger;
                                                    return (
                                                      <>
                                                        <input
                                                          type="text"
                                                          className="form-control value"
                                                          value={
                                                            rowData.slotOccupancy
                                                          }
                                                          onChange={this.handleslotOccupancyChange.bind(
                                                            this,
                                                            rowData.slotID
                                                          )}
                                                        />
                                                      </>
                                                    );
                                                  },
                                                },
                                                {
                                                  title:
                                                    "Slot Status(Unable/Disable)",
                                                  render: (row, rowData) => {
                                                    return (
                                                      <div className="chrdioclr switch switch-primary d-inline m-r-10 slotcheck">
                                                        <input
                                                          style={{
                                                            position: "fixed",
                                                          }}
                                                          type="checkbox"
                                                          id={
                                                            "slot" +
                                                            rowData.slotID
                                                          }
                                                          name="allModules"
                                                          checked={
                                                            rowData.isSlotEnabled
                                                          }
                                                          onChange={this.handleslotActiveInActive.bind(
                                                            this,
                                                            rowData.slotID
                                                          )}
                                                        />
                                                        <label
                                                          htmlFor={
                                                            "slot" + row.slotID
                                                          }
                                                          className="cr cr-float-auto"
                                                          style={{
                                                            float: "inherit",
                                                          }}
                                                        ></label>
                                                      </div>
                                                    );
                                                  },
                                                },
                                              ]}
                                            ></Table>
                                          </div>

                                          <ul>
                                            <li>
                                              <label>
                                                Slot days need to display
                                              </label>
                                              <select
                                                name=""
                                                className="form-control"
                                              >
                                                <option value={0}>
                                                  Select
                                                </option>
                                                {Array(31)
                                                  .fill(0)
                                                  .map((e, i) => {
                                                    return (
                                                      <option value={i + 1}>
                                                        {i + 1}
                                                      </option>
                                                    );
                                                  })}
                                              </select>
                                            </li>
                                            <li>
                                              <label>
                                                Applicable From (Date)
                                              </label>
                                              <div className="applicateDiv">
                                                <DatePicker
                                                  selected={
                                                    this.state.autoStoreFrom
                                                  }
                                                  placeholderText="Applicable From (Date)"
                                                  className="form-control"
                                                  onChange={(time) =>
                                                    this.setState({
                                                      autoStoreFrom: time,
                                                    })
                                                  }
                                                />
                                              </div>
                                            </li>
                                            <li>
                                              <label>
                                                Max People allowed in one
                                                Appointment
                                              </label>
                                              <select
                                                name=""
                                                className="form-control"
                                              >
                                                <option value={0}>
                                                  Select
                                                </option>
                                                {Array(50)
                                                  .fill(0)
                                                  .map((e, i) => {
                                                    return (
                                                      <option value={i + 1}>
                                                        {i + 1}
                                                      </option>
                                                    );
                                                  })}
                                              </select>
                                            </li>
                                          </ul>
                                          <div className="row">
                                            <div className="col-md-4">
                                              <div className="statuscheckbox">
                                                {/* <label
                                                  style={{
                                                    marginRight: "15px",
                                                  }}
                                                >
                                                  Status
                                                </label>
                                                <input
                                                  type="checkbox"
                                                  classNam="form-control"
                                                />
                                                <label>Active</label>
                                                <input
                                                  type="checkbox"
                                                  classNam="form-control"
                                                />
                                                <label>Inactive</label> */}
                                                <div className="statuscheckbox">
                                                  <Radio.Group
                                                    onChange={
                                                      this.handleSlotRadioChange
                                                    }
                                                    value={
                                                      this.state
                                                        .slotAutomaticRadio
                                                    }
                                                  >
                                                    <Radio value={1}>
                                                      Active
                                                    </Radio>
                                                    <Radio value={2}>
                                                      Inactive
                                                    </Radio>
                                                  </Radio.Group>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="del-can">
                                            <a href={Demo.BLANK_LINK}>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.a.cancel
                                                : "CANCEL"}
                                            </a>
                                            <button
                                              className="butn"
                                              onClick={this.handleNextButtonClose.bind(
                                                this
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button
                                                    .delete
                                                : "Save"}
                                            </button>
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </Tab>
                                  <Tab label="Bulk Upload">
                                    <div className="bulkuploadbox">
                                      <div className="addfilebox">
                                        <img src={pinico} alt="pin-icon" />
                                        <h3>
                                          <span>Add File</span> or Drag here
                                        </h3>
                                      </div>
                                    </div>
                                  </Tab>
                                </Tabs>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              {/* <Table
                                loading={this.state.loading}
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.slotno
                                        : "Slot Id",

                                    dataIndex: "slotSettingID",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.storecode
                                        : "Store Code",
                                    dataIndex: "storeCode",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.storetiming
                                        : "Store Timing",
                                    dataIndex: "storeTimimg",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header
                                            .nonoperationalhours
                                        : "Operational Days",
                                    dataIndex: "nonOperationalTimimg",
                                    render: (row, item) => {
                                      return (
                                        <Popover
                                          overlayClassName="antcustom operationalbox"
                                          content={
                                            <div>
                                              <img
                                                src={CancelIcon}
                                                alt="cancel-icone"
                                                className="cust-icon2"
                                              />
                                              <div className="operationaldays">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <h3>Operational Days</h3>
                                                    <ul>
                                                      <li>
                                                        <label>Monday</label>
                                                      </li>
                                                      <li>
                                                        <label>Tuesday</label>
                                                      </li>
                                                      <li>
                                                        <label>Wednesday</label>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          }
                                          placement="bottom"
                                          trigger="click"
                                        >
                                          <div className="broadcast-icon">
                                            {item.nonOperationalTimimg}
                                            <img
                                              className="info-icon-cp"
                                              src={BlackInfoIcon}
                                              alt="info-icon"
                                            />
                                          </div>
                                        </Popover>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.slotduration
                                        : "Slot Duration",
                                    dataIndex: "storeSlotDuration",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.maxcapacity
                                        : "Max Capacity",
                                    dataIndex: "maxCapacity",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.totalslot
                                        : "Total Slot",
                                    dataIndex: "totalSlot",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header
                                            .appointmentdays
                                        : "Appointment Days",
                                    dataIndex: "appointmentDays",
                                    render: (row, item) => {
                                      return (
                                        <Popover
                                          overlayClassName="antcustom appointmentdaysbox"
                                          content={
                                            <div>
                                              <img
                                                src={CancelIcon}
                                                alt="cancel-icone"
                                                className="cust-icon2"
                                              />
                                              <div className="appointmentdays">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <h3>Appointment Days</h3>
                                                    <div className="">
                                                      <Table
                                                        dataSource={
                                                          this.state.slotData
                                                        }
                                                        noDataContent="No Record Found"
                                                        pagination={false}
                                                        className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                                        columns={[
                                                          {
                                                            title: "S.No.",

                                                            dataIndex: "no",
                                                          },
                                                          {
                                                            title:
                                                              "Slot Start Time",
                                                            dataIndex:
                                                              "startTime",
                                                          },
                                                          {
                                                            title:
                                                              "Slot End Time",
                                                            dataIndex:
                                                              "endTime",
                                                          },
                                                          {
                                                            title:
                                                              "Slot Occupancy",
                                                            dataIndex:
                                                              "occupancy",
                                                            render: (
                                                              row,
                                                              rowData
                                                            ) => {
                                                              return (
                                                                <>
                                                                  <input
                                                                    type="text"
                                                                    className="form-control value"
                                                                    value="3"
                                                                  />
                                                                </>
                                                              );
                                                            },
                                                          },
                                                          {
                                                            title:
                                                              "Slot Status(Unable/Disable)",
                                                            render: (
                                                              row,
                                                              rowData
                                                            ) => {
                                                              return (
                                                                <>
                                                                  radio button
                                                                </>
                                                              );
                                                            },
                                                          },
                                                        ]}
                                                      ></Table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          }
                                          placement="bottom"
                                          trigger="click"
                                        >
                                          <div className="broadcast-icon">
                                            {item.appointmentDays}
                                            <img
                                              className="info-icon-cp"
                                              src={BlackInfoIcon}
                                              alt="info-icon"
                                            />
                                          </div>
                                        </Popover>
                                      );
                                    },
                                  },
                                  {
                                    title: "Status",
                                    render: (row, item) => {
                                      return <div>Active</div>;
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",

                                    render: (row, rowData) => {
                                      var ids = row;
                                      return (
                                        <>
                                          <span>
                                            <img
                                              src={Editpencil}
                                              alt="Edit"
                                              className="del-btn"
                                              // id={p-edit-pop-2}
                                              onClick={this.openSlotEditModal.bind(
                                                this,
                                                rowData.slotSettingID,
                                                rowData.storeId
                                              )}
                                            />
                                            <Popover
                                              content={
                                                <div className="d-flex general-popover popover-body">
                                                  <div className="del-big-icon">
                                                    <img
                                                      src={DelBigIcon}
                                                      alt="del-icon"
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="font-weight-bold blak-clr">
                                                      {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext.p
                                                            .deletefile
                                                        : "Delete file"}
                                                      ?
                                                    </p>
                                                    <p className="mt-1 fs-12">
                                                      {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext.p
                                                            .areyousureyouwanttodeletethisfile
                                                        : "Are you sure you want to delete this file"}
                                                      ?
                                                    </p>
                                                    <div className="del-can">
                                                      <a href={Demo.BLANK_LINK}>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.a
                                                              .cancel
                                                          : "CANCEL"}
                                                      </a>
                                                      <button
                                                        className="butn"
                                                        onClick={this.handleDeleteTimeSlot.bind(
                                                          this,
                                                          rowData.slotSettingID
                                                        )}
                                                      >
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext
                                                              .button.delete
                                                          : "Delete"}
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                              placement="bottom"
                                              trigger="click"
                                            >
                                              <img
                                                src={DelBlack}
                                                alt="del-icon"
                                                className="del-btn"
                                                id={ids}
                                              />
                                            </Popover>
                                          </span>
                                        </>
                                      );
                                    },
                                  },
                                ]}
                                rowKey={(record) => {
                                  if (record.slotSettingID) {
                                    uid = uid + 1;
                                    return record.slotSettingID + "i" + uid;
                                  } else {
                                    uid = uid + 1;
                                    return "i" + uid;
                                  }
                                }}
                                pagination={{ defaultPageSize: 10 }}
                                dataSource={this.state.TimeSlotGridData}
                              ></Table> */}
                              <Table
                                loading={this.state.loading}
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.storecode
                                        : "Store Code",
                                    dataIndex: "storeCode",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.storetiming
                                        : "Store Timing",
                                    dataIndex: "storeTimimg",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header
                                            .nonoperationalhours
                                        : "Operational Days",
                                    dataIndex: "nonOperationalTimimg",
                                    render: (row, item) => {
                                      return (
                                        <Popover
                                          overlayClassName="antcustom operationalbox"
                                          content={
                                            <div>
                                              <img
                                                src={CancelIcon}
                                                alt="cancel-icone"
                                                className="cust-icon2"
                                              />
                                              <div className="operationaldays">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <h3>Operational Days</h3>
                                                    <ul>
                                                      <li>
                                                        <label>Monday</label>
                                                      </li>
                                                      <li>
                                                        <label>Tuesday</label>
                                                      </li>
                                                      <li>
                                                        <label>Wednesday</label>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          }
                                          placement="bottom"
                                          trigger="click"
                                        >
                                          <div className="broadcast-icon">
                                            {item.nonOperationalTimimg}
                                            <img
                                              className="info-icon-cp"
                                              src={BlackInfoIcon}
                                              alt="info-icon"
                                            />
                                          </div>
                                        </Popover>
                                      );
                                    },
                                  },
                                  {
                                    title: "Slot Template",
                                    dataIndex: "storeSlotDuration",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.totalslot
                                        : "Total Slots",
                                    dataIndex: "totalSlot",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header
                                            .appointmentdays
                                        : "Appointment Days",
                                    dataIndex: "appointmentDays",
                                    render: (row, item) => {
                                      return (
                                        <Popover
                                          overlayClassName="antcustom appointmentdaysbox"
                                          content={
                                            <div>
                                              <img
                                                src={CancelIcon}
                                                alt="cancel-icone"
                                                className="cust-icon2"
                                              />
                                              <div className="appointmentdays">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <h3>Appointment Days</h3>
                                                    <div className="">
                                                      <Table
                                                        dataSource={
                                                          this.state.slotData
                                                        }
                                                        noDataContent="No Record Found"
                                                        pagination={false}
                                                        className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                                        columns={[
                                                          {
                                                            title: "S.No.",

                                                            dataIndex: "no",
                                                          },
                                                          {
                                                            title:
                                                              "Slot Start Time",
                                                            dataIndex:
                                                              "startTime",
                                                          },
                                                          {
                                                            title:
                                                              "Slot End Time",
                                                            dataIndex:
                                                              "endTime",
                                                          },
                                                          {
                                                            title:
                                                              "Slot Occupancy",
                                                            dataIndex:
                                                              "occupancy",
                                                          },
                                                          {
                                                            title:
                                                              "Slot Status(Unable/Disable)",
                                                            render: (
                                                              row,
                                                              rowData
                                                            ) => {
                                                              return (
                                                                <>Unable</>
                                                              );
                                                            },
                                                          },
                                                        ]}
                                                      ></Table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          }
                                          placement="bottom"
                                          trigger="click"
                                        >
                                          <div className="broadcast-icon">
                                            {item.appointmentDays}
                                            <img
                                              className="info-icon-cp"
                                              src={BlackInfoIcon}
                                              alt="info-icon"
                                            />
                                          </div>
                                        </Popover>
                                      );
                                    },
                                  },
                                  {
                                    title: "Status",
                                    render: (row, item) => {
                                      return (
                                        <div className="tabactive">Active</div>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",

                                    render: (row, rowData) => {
                                      var ids = row;
                                      return (
                                        <>
                                          <span>
                                            <img
                                              src={Editpencil}
                                              alt="Edit"
                                              className="del-btn"
                                              // id={p-edit-pop-2}
                                              onClick={this.openSlotEditModal.bind(
                                                this,
                                                rowData.slotSettingID,
                                                rowData.storeId
                                              )}
                                            />
                                            <Popover
                                              content={
                                                <div className="d-flex general-popover popover-body">
                                                  <div className="del-big-icon">
                                                    <img
                                                      src={DelBigIcon}
                                                      alt="del-icon"
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="font-weight-bold blak-clr">
                                                      {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext.p
                                                            .deletefile
                                                        : "Delete file"}
                                                      ?
                                                    </p>
                                                    <p className="mt-1 fs-12">
                                                      {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext.p
                                                            .areyousureyouwanttodeletethisfile
                                                        : "Are you sure you want to delete this file"}
                                                      ?
                                                    </p>
                                                    <div className="del-can">
                                                      <a href={Demo.BLANK_LINK}>
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext.a
                                                              .cancel
                                                          : "CANCEL"}
                                                      </a>
                                                      <button
                                                        className="butn"
                                                        onClick={this.handleDeleteTimeSlot.bind(
                                                          this,
                                                          rowData.slotSettingID
                                                        )}
                                                      >
                                                        {TranslationContext !==
                                                        undefined
                                                          ? TranslationContext
                                                              .button.delete
                                                          : "Delete"}
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                              placement="bottom"
                                              trigger="click"
                                            >
                                              <img
                                                src={DelBlack}
                                                alt="del-icon"
                                                className="del-btn"
                                                id={ids}
                                              />
                                            </Popover>
                                            {/* <button
                                              className="react-tabel-button editre"
                                              onClick={this.openSlotEditModal.bind(
                                                this,
                                                rowData.slotSettingID,
                                                rowData.storeId
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button.edit
                                                : "EDIT"}
                                            </button> */}
                                          </span>
                                        </>
                                      );
                                    },
                                  },
                                ]}
                                rowKey={(record) => {
                                  if (record.slotSettingID) {
                                    uid = uid + 1;
                                    return record.slotSettingID + "i" + uid;
                                  } else {
                                    uid = uid + 1;
                                    return "i" + uid;
                                  }
                                }}
                                pagination={{ defaultPageSize: 10 }}
                                dataSource={this.state.TimeSlotGridData}
                              ></Table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="Module-LanguageSetting-Tab"
                  role="tabpanel"
                  aria-labelledby="Module-LanguageSetting-Tab"
                >
                  <div className="backNone">
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ background: "white" }}>
                          <div className="row">
                            <div className="col-md-4 m-auto">
                              <div className="right-sect-div">
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.languagesettings
                                    : "LANGUAGE SETTINGS"}
                                </h3>
                                <div className="cmpaign-channel-table slot-setting-options">
                                  <div className="w-100">
                                    <select
                                      name="selectLanguage"
                                      value={this.state.selectLanguage}
                                      onChange={this.handleDrop_downOnchange}
                                    >
                                      <option value={0}>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.option
                                              .selectlanguage
                                          : "Select Language"}
                                      </option>
                                      {this.state.languageData !== null &&
                                        this.state.languageData.map(
                                          (item, s) => (
                                            <option
                                              key={s}
                                              value={item.id}
                                              className="select-category-placeholder"
                                            >
                                              {item.language}
                                            </option>
                                          )
                                        )}
                                    </select>
                                    {parseInt(this.state.selectLanguage) ===
                                      0 && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.languageValidation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <button
                                  className="Schedulenext1 w-100 mb-0 mt-4"
                                  type="button"
                                  onClick={this.handleSubmitLanguageDate.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.submit
                                    : "SUBMIT"}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <Table
                                loading={this.state.loading}
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table"
                                columns={[
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.languagename
                                        : "Language Name",
                                    dataIndex: "language",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.status
                                        : "Status",
                                    dataIndex: "isActive",
                                    render: (row) => {
                                      return (
                                        <>
                                          {row === true ? "Active" : "Inactive"}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",
                                    render: (row, rowData) => {
                                      var ids = rowData["slotId"];

                                      if (rowData.language) {
                                        var langage = rowData.language.split(
                                          " "
                                        )[0];
                                        if (
                                          langage.toLowerCase() ==
                                          "English".toLowerCase()
                                        ) {
                                          return <></>;
                                        } else {
                                          return (
                                            <div className="chrdioclr switch switch-primary d-inline m-r-10">
                                              <input
                                                type="checkbox"
                                                id={"lang" + rowData.id}
                                                name="allModules"
                                                checked={row.isActive}
                                                onClick={this.handleDeleteLanguage.bind(
                                                  this,
                                                  rowData
                                                )}
                                              />
                                              <label
                                                htmlFor={"lang" + row.id}
                                                className="cr cr-float-auto"
                                                style={{
                                                  float: "inherit",
                                                }}
                                              ></label>
                                            </div>
                                          );
                                        }
                                      } else {
                                        return <></>;
                                      }
                                    },
                                  },
                                ]}
                                rowKey={(record) => {
                                  if (record.id) {
                                    uid = uid + 1;
                                    return record.id + "l" + uid;
                                  } else {
                                    uid = uid + 1;
                                    return "l" + uid;
                                  }
                                }}
                                pagination={{ defaultPageSize: 10 }}
                                dataSource={this.state.languageGridData}
                              ></Table>
                              {/* <ReactTable
                                data={this.state.languageGridData}
                                columns={[
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.languagename
                                        : "Language Name",
                                    accessor: "language",
                                    sortable: false,
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.status
                                        : "Status",
                                    accessor: "isActive",
                                    sortable: false,
                                    Cell: (row) => {
                                      return (
                                        <div>
                                          <span>
                                            {row.original.isActive
                                              ? "Active"
                                              : "Inactive"}
                                          </span>
                                        </div>
                                      );
                                    },
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",
                                    sortable: false,
                                    Cell: (row) => {
                                      var ids = row.original["slotId"];

                                      if (row.original.language) {
                                        var langage = row.original.language.split(
                                          " "
                                        )[0];
                                        if (
                                          langage.toLowerCase() ==
                                          "English".toLowerCase()
                                        ) {
                                          return <></>;
                                        } else {
                                          return (
                                            <div className="switch switch-primary d-inline m-r-10">
                                              <input
                                                type="checkbox"
                                                id={"lang" + row.index}
                                                name="allModules"
                                                onClick={this.handleDeleteLanguage.bind(
                                                  this,
                                                  row.original
                                                )}
                                              />
                                              <label
                                                htmlFor={"lang" + row.index}
                                                className="cr cr-float-auto"
                                                style={{ float: "inherit" }}
                                              ></label>
                                            </div>
                                          );
                                        }
                                      } else {
                                        return <></>;
                                      }
                                    },
                                  },
                                ]}
                                
                                minRows={2}
                                defaultPageSize={10}
                                showPagination={true}
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* edit slot starts */}
            <Modal
              show={this.state.editSlotModal}
              onHide={this.closeSlotEditModal}
              dialogClassName="slotEditModal"
            >
              <img
                src={CancelIcon}
                alt="cancel-icone"
                className="cust-icon2"
                onClick={this.closeSlotEditModal.bind(this)}
              />
              <div className="edtpadding">
                <div className="">
                  <label className="popover-header-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.editslotsettings
                      : "Edit"}
                  </label>
                </div>
                <div className="pop-over-div edit-slot">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <ul>
                        <li>
                          <label>Store Code</label>
                          <span>SMB09786</span>
                        </li>
                        <li>
                          <label>Store Timing</label>
                          <span>11 AM - 8 PM</span>
                        </li>
                        <li>
                          <label>Store Operational Days</label>
                          <span>4</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <ul>
                        <li>
                          <label>Slot Template</label>
                          <span>Alternate 2</span>
                        </li>
                        <li>
                          <label>Total Slots</label>
                          <span>6</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="edittabs">
                        <Table
                          dataSource={this.state.slotData}
                          noDataContent="No Record Found"
                          pagination={false}
                          className="components-table-demo-nested antd-table-campaign custom-antd-table"
                          columns={[
                            {
                              title: "S.No.",

                              dataIndex: "no",
                            },
                            {
                              title: "Slot Start Time",
                              dataIndex: "startTime",
                            },
                            {
                              title: "Slot End Time",
                              dataIndex: "endTime",
                            },
                            {
                              title: "Slot Occupancy",
                              dataIndex: "occupancy",
                              render: (row, rowData) => {
                                return (
                                  <>
                                    <input
                                      type="text"
                                      className="form-control value"
                                      value="3"
                                    />
                                  </>
                                );
                              },
                            },
                            {
                              title: "Slot Status(Unable/Disble)",

                              render: (row, rowData, i) => {
                                return (
                                  <div className="switch switch-primary">
                                    <input
                                      type="checkbox"
                                      id={"ckStatus" + i}
                                      name="allModules"
                                      // checked={
                                      //   this.state.AppointConfigData
                                      //     .generateOTP
                                      // }
                                      // onChange={this.AppoinmentConfigFlageChange.bind(
                                      //   this
                                      // )}
                                    />
                                    <label
                                      htmlFor={"ckStatus" + i}
                                      className="cr cr-float-auto"
                                    ></label>
                                  </div>
                                );
                              },
                            },
                          ]}
                        ></Table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <label>Slot days need to display</label>
                      <select name="" className="form-control">
                        <option value={0}>Select</option>
                        <option value={0}>1</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Status</label>
                      <div className="statuscheckbox">
                        <Radio.Group
                          onChange={this.handleSlotRadioChange}
                          value={this.state.slotAutomaticRadio}
                        >
                          <Radio value={1}>Active</Radio>
                          <Radio value={2}>Inactive</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div style={{ float: "right" }}>
                  <a
                    className="pop-over-cancle"
                    onClick={this.closeSlotEditModal}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.cancel
                      : "CANCEL"}
                  </a>
                  <button
                    className="pop-over-button FlNone"
                    onClick={this.handleUpdateTimeSlotData.bind(this)}
                  >
                    <label className="pop-over-btnsave-text">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.save
                        : "SAVE"}
                    </label>
                  </button>
                </div>
              </div>
            </Modal>
            {/* edit slot ends */}

            <Modal
              className="EditModa"
              show={this.state.editModal}
              onHide={this.handleEditModal}
            >
              <div className="edtpadding">
                <div className="">
                  <label className="popover-header-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.editcampaignscript
                      : "EDIT CAMPAIGN SCRIPT"}
                  </label>
                </div>
                <div className=" pop-over-div">
                  <label className="pop-over-lbl-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.campaignname
                      : "Campaign Name"}
                  </label>
                  <select
                    className="pop-over-select w-100 disabled-input"
                    // name="selectedMaxAttachSize"
                    value={this.state.updateIndiCampaignId}
                    disabled
                    // onChange={this.setClaimTabData}
                  >
                    <option value={0}>Select</option>
                    {this.state.campaignName !== null &&
                      this.state.campaignName.map((item, i) => (
                        <option key={i} value={item.campaignNameID}>
                          {item.campaignName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="div-cntr">
                  <label className="pop-over-lbl-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.scriptdetails
                      : "Script Details"}
                  </label>
                  <textarea
                    className="stort-textArea"
                    rows="4"
                    value={this.state.updateScriptDetails}
                    name="updateScriptDetails"
                    onChange={this.handleInputOnchange}
                  ></textarea>
                  {this.state.updateScriptDetails.length == 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.updateScriptDetailsCompulsion}
                    </p>
                  )}
                </div>

                <br />
                <div className="text-center">
                  <span
                    className="pop-over-cancle"
                    onClick={this.handleEditModal}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.span.cancel
                      : "CANCEL"}
                  </span>
                  <button
                    className="pop-over-button FlNone"
                    onClick={this.handleUpdateCampaignScript.bind(this)}
                    disabled={this.state.updateCampaignLoading}
                  >
                    {this.state.updateCampaignLoading ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )}
                    {TranslationContext !== undefined
                      ? TranslationContext.button.save
                      : "SAVE"}
                  </button>
                </div>
              </div>
            </Modal>
            <Modal
              className="EditModa"
              show={this.state.editCampChannelModal}
              onHide={this.handleEditCampSettingModal.bind(this)}
            >
              <div className="edtpadding">
                <label className="popover-header-text">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.editcampaignsetting
                    : "EDIT CAMPAIGN SETTING"}
                </label>
                <div className="module-switch-cntr">
                  <div className="module-switch">
                    <div className="switch switch-primary">
                      <label className="storeRole-name-text m-0">SMS</label>
                      <input type="checkbox" id="new1" name="allModules" />
                      <label
                        htmlFor="new1"
                        className="cr cr-float-auto"
                      ></label>
                    </div>
                  </div>
                  <div className="module-switch">
                    <div className="switch switch-primary">
                      <label className="storeRole-name-text m-0">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.whatsapp
                          : "Whatsapp"}
                      </label>
                      <input type="checkbox" id="new2" name="allModules" />
                      <label
                        htmlFor="new2"
                        className="cr cr-float-auto"
                      ></label>
                    </div>
                  </div>
                  <div className="module-switch">
                    <div className="switch switch-primary">
                      <label className="storeRole-name-text m-0">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatbot
                          : "Chatbot"}
                      </label>
                      <input type="checkbox" id="new3" name="allModules" />
                      <label
                        htmlFor="new3"
                        className="cr cr-float-auto"
                      ></label>
                    </div>
                  </div>
                  <div className="module-switch">
                    <div className="switch switch-primary">
                      <label className="storeRole-name-text m-0">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.email
                          : "Email"}
                      </label>
                      <input type="checkbox" id="new4" name="allModules" />
                      <label
                        htmlFor="new4"
                        className="cr cr-float-auto"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            {/* Choose Store Modal */}
            <Modal
              show={this.state.chooseStoreModal}
              onHide={this.handleChooseStoreCloseModal.bind(this)}
              dialogClassName="choosestorebox"
            >
              <img
                src={CancelIcon}
                alt="cancel-icone"
                className="cust-icon2"
                onClick={this.handleChooseStoreCloseModal.bind(this)}
              />
              <div className="choosestore">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label>Choose Store</label>
                    <form name="form" onSubmit={this.handleStoreSearch}>
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          autoComplete="off"
                          value={this.state.slotStoreSearch}
                          onChange={this.handleSlotStoreSearchOnchange.bind(
                            this
                          )}
                        />
                        <span className="input-group-append">
                          <img
                            src={searchico}
                            alt="search-icon"
                            className="cr-pnt"
                            onClick={this.handleStoreSearch}
                          />
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-3">
                    <button
                      className="butn-selectall"
                      onClick={this.handleSelectAllStore.bind(this, true)}
                    >
                      Select All
                    </button>
                  </div>
                  <div className="col-12 col-md-9">
                    <ul className="atoz">
                      <li onClick={this.handleStoreFilterData.bind(this, "")}>
                        #
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "A")}>
                        A
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "B")}>
                        B
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "C")}>
                        C
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "D")}>
                        D
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "E")}>
                        E
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "F")}>
                        F
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "G")}>
                        G
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "H")}>
                        H
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "I")}>
                        I
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "J")}>
                        J
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "K")}>
                        K
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "L")}>
                        L
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "M")}>
                        M
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "N")}>
                        N
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "O")}>
                        O
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "P")}>
                        P
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "Q")}>
                        Q
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "R")}>
                        R
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "S")}>
                        S
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "T")}>
                        T
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "U")}>
                        U
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "V")}>
                        V
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "W")}>
                        W
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "Y")}>
                        Y
                      </li>
                      <li onClick={this.handleStoreFilterData.bind(this, "Z")}>
                        Z
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="storetabl">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        {this.state.storeCodeData !== null &&
                          this.state.storeCodeData.map((item, s) => (
                            <div
                              className="col-12 col-sm-4 col-md-3 col-lg-3"
                              key={s}
                            >
                              <div className="slotchckhceck">
                                <input
                                  type="checkbox"
                                  className="form-control"
                                  name="allStore"
                                  id={item.storeID + "_" + s}
                                  checked={item.isChecked}
                                  onChange={this.handleSelectStoresIndividual.bind(
                                    this,
                                    item
                                  )}
                                />
                                <label
                                  htmlFor={item.storeID + "_" + s}
                                  title={item.storeName}
                                >
                                  {item.storeName}
                                </label>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-12">
                    <div style={{ float: "right" }}>
                      <a
                        style={{ color: "#666", marginRight: "30px" }}
                        href={Demo.BLANK_LINK}
                        onClick={this.handleSelectAllStore.bind(this, false)}
                      >
                        Clear
                      </a>
                      <button
                        className="butn"
                        onClick={this.handleApplySelectedStore.bind(this)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            {/* Create tamplete Modal */}
            <Modal
              overlayId="chooseslot-main"
              show={this.state.createTampleteModal}
              onHide={this.handleCreateTempletetCloseModal.bind(this)}
              dialogClassName="chooseslot-main"
            >
              <img
                src={CancelIcon}
                alt="cancel-icone"
                className="cust-icon2"
                onClick={this.handleCreateTempletetCloseModal.bind(this)}
              />
              <div className="chooseslot-box">
                <div className="row">
                  <div className="col-12 col-md-10">
                    <h3>Choose Slot Type</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-10">
                    <div className="statuscheckbox">
                      <Radio.Group
                        onChange={this.handleSlotRadioChange}
                        value={this.state.slotAutomaticRadio}
                      >
                        <Radio value={1}>Automatic</Radio>
                        <Radio value={2}>Manual</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
                <div
                  classname="automaticbox"
                  style={{
                    display:
                      this.state.slotAutomaticRadio === 1 ? "block" : "none",
                  }}
                >
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <label>Template Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Template Name"
                        autoComplete="off"
                        maxLength={50}
                        name="autoTempName"
                        value={this.state.autoTempName}
                        onChange={this.handleInputOnchange}
                      />
                      {this.state.autoTempName === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.autoTempNameCompulsory}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-5">
                      <label>Slot Duration</label>
                      <select
                        name="AutoSlotDuration"
                        className="form-control"
                        value={this.state.AutoSlotDuration}
                        onChange={(e) =>
                          this.setState({
                            AutoSlotDuration: e.target.value,
                          })
                        }
                      >
                        <option value={0}>Select Timing</option>
                        <option value={0.25}>15 Minutes</option>
                        <option value={0.5}>30 Minutes</option>
                        <option value={0.75}>45 Minutes</option>
                        <option value={1}>1 Hours</option>
                        <option value={1.5}>1.5 Hour</option>
                        <option value={2}>2 Hour</option>
                      </select>
                      {this.state.AutoSlotDuration === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.AutoSlotDurationCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="col-12 col-md-5">
                      <label>Gap B/w Slots</label>
                      <select
                        name="AutoSlotGap"
                        className="form-control"
                        value={this.state.AutoSlotGap}
                        onChange={(e) =>
                          this.setState({
                            AutoSlotGap: e.target.value,
                          })
                        }
                      >
                        <option value={0}>Select Timing</option>
                        <option value={0.25}>15 Minutes</option>
                        <option value={0.5}>30 Minutes</option>
                        <option value={0.75}>45 Minutes</option>
                        <option value={1}>1 Hours</option>
                        <option value={1.5}>1.5 Hour</option>
                        <option value={2}>2 Hour</option>
                      </select>
                      {this.state.AutoSlotGap === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.AutoSlotGapCompulsory}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <h3>Store Timing</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-5 slotFrm">
                      <label>From</label>
                      <DatePicker
                        selected={this.state.autoStoreFrom}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm aa"
                        placeholderText="Select Timing"
                        className="form-control"
                        onChange={(time) =>
                          this.setState({
                            autoStoreFrom: time,
                          })
                        }
                      />
                      {this.state.autoStoreFrom === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.autoStoreFromCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="col-12 col-md-5 slotFrm">
                      <label>To</label>
                      <DatePicker
                        selected={this.state.autoStoreTo}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select Timing"
                        className="form-control"
                        onChange={(time) =>
                          this.setState({
                            autoStoreTo: time,
                          })
                        }
                      />
                      {this.state.autoStoreTo === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.autoStoreToCompulsory}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <h3>Non Operational Hour</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-5 slotFrm">
                      <label>From</label>
                      <DatePicker
                        selected={this.state.autoNonOptFrom}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select Timing"
                        className="form-control"
                        onChange={(time) =>
                          this.setState({
                            autoNonOptFrom: time,
                          })
                        }
                      />
                      {this.state.autoNonOptFrom === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.autoNonOptFromCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="col-12 col-md-5 slotFrm">
                      <label>To</label>
                      <DatePicker
                        selected={this.state.autoNonOptTo}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select Timing"
                        className="form-control"
                        onChange={(time) =>
                          this.setState({
                            autoNonOptTo: time,
                          })
                        }
                      />
                      {this.state.autoNonOptTo === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.autoNonOptToCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="col-12 col-md-2">
                      <button
                        className="tabbutn cr-pnt"
                        onClick={this.handleSubmitAutomaticData.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.delete
                          : "Generate Slot"}
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <div className="chooseslot-table">
                        <Table
                          dataSource={this.state.automaticaSlotTblData}
                          noDataContent="No Record Found"
                          pagination={false}
                          className="components-table-demo-nested antd-table-campaign custom-antd-table"
                          columns={[
                            {
                              title: "S.No.",
                              dataIndex: "slotID",
                            },
                            {
                              title: "Slot Start Time",
                              dataIndex: "slotStartTime",
                            },
                            {
                              title: "Slot End Time",
                              dataIndex: "slotEndTime",
                            },
                          ]}
                        ></Table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <div className="del-can">
                        <a href={Demo.BLANK_LINK}>
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="butn"
                          onClick={this.handleFinalSaveTemplateData.bind(
                            this,
                            "Automatic"
                          )}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  classname="manualbox"
                  style={{
                    display:
                      this.state.slotAutomaticRadio === 2 ? "block" : "none",
                  }}
                >
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <label>Template Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Template Name"
                        autoComplete="off"
                        maxLength={50}
                        name="manualTempName"
                        value={this.state.manualTempName}
                        onChange={this.handleInputOnchange}
                      />
                      {this.state.manualTempName === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.manualTempNameCompulsory}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <h3>Store Timing</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-5 slotFrm">
                      <label>From</label>
                      <DatePicker
                        selected={this.state.manualStoreFrom}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="hh:mm a"
                        placeholderText="Select Timing"
                        className="form-control"
                        onChange={(time) =>
                          this.setState({
                            manualStoreFrom: time,
                          })
                        }
                      />
                      {this.state.manualStoreFrom === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.manualStoreFromCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="col-12 col-md-5 slotFrm">
                      <label>To</label>
                      <DatePicker
                        selected={this.state.manualStoreTo}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="hh:mm a"
                        placeholderText="Select Timing"
                        className="form-control"
                        onChange={(time) =>
                          this.setState({
                            manualStoreTo: time,
                          })
                        }
                      />
                      {this.state.manualStoreTo === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.manualStoreToCompulsory}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <label>Slot Duration</label>
                      <select
                        name="ManualSlotDuration"
                        className="form-control"
                        value={this.state.ManualSlotDuration}
                        onChange={this.handleManualSelectDuration}
                      >
                        <option value={0}>Select Timing</option>
                        <option value={15}>15 Minutes</option>
                        <option value={30}>30 Minutes</option>
                        <option value={45}>45 Minutes</option>
                        <option value={60}>1 Hours</option>
                        <option value={90}>1.5 Hour</option>
                        <option value={120}>2 Hour</option>
                      </select>
                      {this.state.ManualSlotDuration === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ManualSlotDurationCompulsory}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-5 slotFrm">
                      <label>Slot Start Time</label>
                      <DatePicker
                        selected={this.state.manualStoreData.slotStartTime}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm a"
                        placeholderText="Select Timing"
                        className="form-control"
                        minTime={setHours(
                          setMinutes(new Date(), 0),
                          new Date(
                            this.state.mimSlotStartTimeChck
                              ? this.state.manualStoreData.slotEndTime
                              : this.state.manualStoreFrom
                          ).getHours()
                        )}
                        maxTime={setHours(
                          setMinutes(new Date(), 0),
                          new Date(this.state.manualStoreTo).getHours()
                        )}
                        onChange={(time) =>
                          this.handleManualTimeOnchange(time, "slotStartTime")
                        }
                      />
                      {this.state.manualStoreData.slotStartTime === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.manualSlotStartCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="col-12 col-md-5 slotFrm">
                      <label>Slot End Time</label>
                      <DatePicker
                        selected={this.state.manualStoreData.slotEndTime}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm a"
                        placeholderText="Select Timing"
                        className="form-control"
                        disabled
                        // minTime={setHours(setMinutes(new Date(), 0), 17)}
                        // maxTime={setHours(setMinutes(new Date(), 0), 21)}
                        onChange={(time) =>
                          this.handleManualTimeOnchange(time, "slotEndTime")
                        }
                      />
                      {/* {this.state.slotEndTime === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.manualSlotEndCompulsory}
                        </p>
                      )} */}
                    </div>
                    <div className="col-12 col-md-2">
                      <button
                        className="tabbutn cr-pnt"
                        onClick={this.handleAddManualySlot.bind(this)}
                      >
                        Add Slot
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <div className="chooseslot-table">
                        <Table
                          dataSource={this.state.manualStoreTblData}
                          noDataContent="No Record Found"
                          pagination={false}
                          className="components-table-demo-nested antd-table-campaign custom-antd-table"
                          columns={[
                            {
                              title: "S.No.",
                              dataIndex: "slotID",
                              render: (text, record, index) => index + 1,
                            },
                            {
                              title: "Slot Start Time",
                              dataIndex: "slotStartTime",
                            },
                            {
                              title: "Slot End Time",
                              dataIndex: "slotEndTime",
                            },
                            {
                              title: "Actions",
                              render: (text, record, index) => {
                                return (
                                  <>
                                    <img
                                      src={DelBlack}
                                      alt="del-icon"
                                      className="del-btn cr-pnt"
                                      onClick={this.handleManualDeleteSlot.bind(
                                        this,
                                        index
                                      )}
                                    />
                                  </>
                                );
                              },
                            },
                          ]}
                        ></Table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-10">
                      <div className="del-can">
                        <a href={Demo.BLANK_LINK}>
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="butn"
                          onClick={this.handleFinalSaveTemplateData.bind(
                            this,
                            "Manual"
                          )}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            {/* Selected Store Modal  */}
            <Modal
              show={this.state.selectedStoreModal}
              onHide={this.handleSelectedStoreCloseModal.bind(this)}
              dialogClassName="selectstores-main"
            >
              <img
                src={CancelIcon}
                alt="cancel-icone"
                className="cust-icon2"
                onClick={this.handleSelectedStoreCloseModal.bind(this)}
              />
              <div className="selectstores-box">
                <div className="row">
                  <div className="col-12">
                    <h3>Selected Stores</h3>
                    <ul>
                      {this.state.storeCodeData !== null &&
                        this.state.storeCodeData.map((item, s) => {
                          return (
                            <>
                              {item.isChecked && (
                                <li key={s}>
                                  <div className="input-group">
                                    <label>{item.storeName}</label>
                                    <span className="input-group-append">
                                      <img
                                        src={CancelIcon}
                                        alt="cancel-icone"
                                        className="cust-ic cr-pnt"
                                        onClick={this.handleRemoveSelectedStore.bind(
                                          this,
                                          item.storeID
                                        )}
                                      />
                                    </span>
                                  </div>
                                </li>
                              )}
                            </>
                          );
                        })}

                      {/* <li>
                        <div className="input-group">
                          <label>SMB0045</label>
                          <span className="input-group-append">
                            <img
                              src={CancelIcon}
                              alt="cancel-icone"
                              className="cust-ic"
                            />
                          </span>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreModule;
