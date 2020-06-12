import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Popover } from "antd";
import ReactTable from "react-table";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import FileUpload from "./../../../assets/Images/file.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
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

import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
// import { UncontrolledPopover, PopoverBody } from "reactstrap";
// import { ProgressBar } from "react-bootstrap";
// import UploadCancel from "./../../../assets/Images/upload-cancel.png";

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
      TimeSlotGridData: [],
      storeCodeData: [],
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
    this.handleGetstoreCodeData = this.handleGetstoreCodeData.bind(this);
    this.closeSlotEditModal = this.closeSlotEditModal.bind(this);
  }

  componentDidMount() {
    this.handleClaimTabData();
    this.handleCampaignNameList();
    this.handleCampaignScriptGridData();
    this.handleCampaignChannelGridData();
    this.handleGetAppointmentConfigData();
    this.handleGetBroadCastConfigData();
    this.handleGetTimeslotGridData();
    this.handleGetstoreCodeData();
    this.handleGetLanguageDropdownlist();
    this.handleGetLanguageGridData();

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
            NotificationManager.success("File uploaded successfully.");
            self.setState({ fileName: "", fileSize: "", fileN: [] });
            self.handleCampaignScriptGridData();
            self.setState({ isErrorBulkUpload: false, isShowProgress: false });
          } else {
            self.setState({ isErrorBulkUpload: true, isShowProgress: false });
            NotificationManager.error("File not uploaded.");
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
    this.setState({
      file: {},
      fileName: "",
      fileSize: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
    });
    NotificationManager.success("File deleted successfully.");
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
          NotificationManager.success("Campaign deleted successfully.");
          self.handleCampaignScriptGridData();
        } else {
          NotificationManager.error("Campaign not deleted.");
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
    var name = e.target.name;
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
  };

  handleSlotEditInputOnchange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    var timeSlotEdit = this.state.timeSlotEdit;
    var reg = /^[0-9\b]+$/;
    if (value === "" || reg.test(value)) {
      timeSlotEdit[name] = value;
      this.setState({
        timeSlotEdit,
      });
    } else {
      value = "";
    }
  };

  handleDrop_downOnchange = (e) => {
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
    }
  };

  handleEditDrop_downOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
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
    } else if (name === "storeId") {
      timeSlotEdit[name] = value;
      this.setState({
        timeSlotEdit,
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
          self.setState({ storeCodeData: data });
        } else {
          self.setState({ storeCodeData: [] });
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
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignSettingList",
      headers: authHeader(),
      params: {
        SlotID: slotId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Record Deleted Successfully.");
          self.handleGetTimeslotGridData();
        } else {
          NotificationManager.error("Record Not Deleted.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Delete Language record
  handleDeleteLanguage = (row, type) => {
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
          NotificationManager.success("Record Updated Successfully.");
          self.handleGetLanguageGridData();
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  //// Handle get time slot grid data
  handleGetTimeslotGridData(storeID) {
    let self = this;
    this.setState({ isSlotLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Appointment/GetStoreTimeSlotMasterList",
      headers: authHeader(),
      params: { StoreID: storeID ? storeID : 0 },
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
            NotificationManager.success("Attachment saved successfully.");
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
            NotificationManager.success("Campaign saved successfully.");
            document.getElementById("campaignNameValue").textContent = "Select";
            self.setState({
              indiCampaign: "",
              scriptDetails: "",
              campaignCompulsion: "",
              scriptDetailsCompulsion: "",
              addCampaignLoading: false,
            });
          } else {
            NotificationManager.error("Campaign not saved.");
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
            NotificationManager.success("Campaign updated successfully.");
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
            NotificationManager.success("Campaign Updated Successfully.");
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
          NotificationManager.success("Appointment Updated Successfully.");
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
            NotificationManager.success("Broadcast Updated Successfully.");
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

  /// handle Timeslot add data
  handleSubmitTimeSlotDate() {
    var self = this;
    if (
      this.state.selectStore !== 0 &&
      this.state.orderNumber !== "" &&
      this.state.maxCapacity !== ""
    ) {
      var slot1 = this.state.selectTimeSlot1 + this.state.selectAmPm1;
      var slot2 = this.state.selectTimeSlot2 + this.state.selectAmPm2;
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/InsertUpdateTimeSlotMaster",
        headers: authHeader(),
        data: {
          StoreId: this.state.selectStore,
          TimeSlot: slot1 + "-" + slot2,
          OrderNumber: parseInt(this.state.orderNumber),
          MaxCapacity: parseInt(this.state.maxCapacity),
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              selectStore: 0,
              selectTimeSlot1: 1,
              selectTimeSlot2: 1,
              selectAmPm1: "AM",
              selectAmPm2: "AM",
              orderNumber: "",
              maxCapacity: "",
            });
            NotificationManager.success("Time Slot Added Successfully.");
            self.handleGetTimeslotGridData();
          } else {
            NotificationManager.error("Time Slot Not Added.");
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        storeCodeValidation: "Required",
        orderNovalidation: "Required",
        maxCapacityValidation: "Required",
      });
    }
  }

  /// Handle Update TimeSlot data
  handleUpdateTimeSlotData() {
    var self = this;
    if (
      this.state.timeSlotEdit.storeId !== "0" &&
      this.state.timeSlotEdit.orderNumber !== "" &&
      this.state.timeSlotEdit.maxCapacity !== ""
    ) {
      var slot1 = this.state.editSelectTimeSlot1 + this.state.editSelectAmPm1;
      var slot2 = this.state.editSelectTimeSlot2 + this.state.editSelectAmPm2;
      axios({
        method: "post",
        url: config.apiUrl + "/Appointment/InsertUpdateTimeSlotMaster",
        headers: authHeader(),
        data: {
          SlotId: this.state.timeSlotId,
          StoreId: this.state.timeSlotEdit.storeId,
          TimeSlot: slot1 + "-" + slot2,
          OrderNumber: parseInt(this.state.timeSlotEdit.orderNumber),
          MaxCapacity: parseInt(this.state.timeSlotEdit.maxCapacity),
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success("Time Slot Updated Successfully.");
            self.handleGetTimeslotGridData();
            self.setState({
              editSlotModal: false,
            });
          } else {
            NotificationManager.error("Time Slot Not Updated.");
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
            NotificationManager.success("Language Added Successfully.");
            self.handleGetLanguageGridData();
            self.setState({
              selectLanguage: 0,
            });
          } else {
            NotificationManager.error(status);
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
  openSlotEditModal(EditData) {
    var timeSlotEdit = {};

    timeSlotEdit.storeId = EditData.storeId;
    timeSlotEdit.storeCode = EditData.storeCode;
    timeSlotEdit.orderNumber = EditData.orderNumber;
    timeSlotEdit.maxCapacity = EditData.maxCapacity;
    timeSlotEdit.timeSlot = EditData.timeSlot;

    var slot = timeSlotEdit.timeSlot.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);

    this.setState({
      editSlotModal: true,
      timeSlotEdit,
      timeSlotId: EditData.slotId,
      editSelectTimeSlot1: slot[0],
      editSelectTimeSlot2: slot[2],
      editSelectAmPm1: slot[1],
      editSelectAmPm2: slot[3],
    });
  }

  handleChangeStoreDropdown(e) {
    this.setState({ FilterSelectStore: e.target.value });
    this.handleGetTimeslotGridData(e.target.value);
  }

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
                          <option value={0}>Select File Format</option>
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
                                      "Campaign Name"
                                    )}
                                  >
                                    Campaign Name
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
                                                    Created By:{" "}
                                                    {row.original.createdBy}
                                                  </p>
                                                </b>
                                                <p className="sub-title">
                                                  Created Date:{" "}
                                                  {row.original.createdOn}
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
                                            src={RedDeleteIcon}
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
                                  </span>{" "}
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
                                        maxLength={2}
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
                                    <td>Click</td>
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
                                      {" "}
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
                            <div className="col-md-8 m-auto">
                              <div
                                className="right-sect-div"
                                style={{ padding: "20px" }}
                              >
                                <h3>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.h3.slotsettings
                                    : "SLOT SETTINGS"}
                                </h3>
                                <div
                                  className="row cmpaign-channel-table lbl-fnt-w-400"
                                  style={{ margin: "0px", marginLeft: "30px" }}
                                >
                                  <div className="strdrp-dwn">
                                    <label></label>
                                    <select
                                      name="selectStore"
                                      value={this.state.selectStore}
                                      onChange={this.handleDrop_downOnchange}
                                    >
                                      <option value={0}>Store code</option>
                                      {this.state.storeCodeData !== null &&
                                        this.state.storeCodeData.map(
                                          (item, s) => (
                                            <option
                                              key={s}
                                              value={item.storeID}
                                              className="select-category-placeholder"
                                            >
                                              {item.storeCode}
                                            </option>
                                          )
                                        )}
                                    </select>
                                    {this.state.selectStore === 0 && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.storeCodeValidation}
                                      </p>
                                    )}
                                  </div>
                                  <div className="pd-10">
                                    <label className="mr-10">
                                      Store Open Time
                                    </label>
                                    <label>Store Close Time</label>
                                    <div className="slot-timings">
                                      <div className="d-flex">
                                        <select
                                          className="slot-hour"
                                          name="selectTimeSlot1"
                                          value={this.state.selectTimeSlot1}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          {this.state.TimeSlotData !== null &&
                                            this.state.TimeSlotData.map(
                                              (item, j) => (
                                                <option
                                                  value={item.TimeSlotId}
                                                  key={j}
                                                >
                                                  {item.TimeSlot}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <select
                                          className="slot-shift"
                                          name="selectAmPm1"
                                          value={this.state.selectAmPm1}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          <option value="AM">AM</option>
                                          <option value="PM">PM</option>
                                        </select>
                                      </div>
                                      <span className="slot-to">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.span.to
                                          : "TO"}
                                      </span>
                                      <div className="d-flex">
                                        <select
                                          className="slot-hour"
                                          name="selectTimeSlot2"
                                          value={this.state.selectTimeSlot2}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          {this.state.TimeSlotData !== null &&
                                            this.state.TimeSlotData.map(
                                              (item, j) => (
                                                <option
                                                  value={item.TimeSlotId}
                                                  key={j}
                                                >
                                                  {item.TimeSlot}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <select
                                          className="slot-shift"
                                          name="selectAmPm2"
                                          value={this.state.selectAmPm2}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          <option value="AM">AM</option>
                                          <option value="PM">PM</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pd-10">
                                    <label className="slt-time-lbl">
                                      Slot Duration
                                    </label>
                                    <div className="slot-timings mr-0">
                                      <div className="d-flex">
                                        <select
                                          className="slot-hour"
                                          name="selectTimeSlot1"
                                          style={{width:"50px"}}
                                        >
                                          <option value="1/2">1/2</option>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                        </select>
                                        <select
                                          className="ap-select"
                                          name="selectAmPm1"
                                          style={{width:"30px !important"}}
                                          disabled={true}
                                        >
                                          <option value="H">Hr</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mx-slt-div">
                                    <label>Max Cpty Per Slot</label>
                                    <input
                                      className="mx-slt-txt"
                                      type="text"
                                      placeholder="Max Cpty"
                                      name="maxCapacity"
                                      autoComplete="off"
                                      maxLength={2}
                                      value={this.state.maxCapacity}
                                      onChange={this.handleSlotInputOnchange}
                                    />
                                    {this.state.maxCapacity === "" && (
                                      <p
                                        style={{
                                          color: "red",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {this.state.maxCapacityValidation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <label className="slt-non-op-hr-lbl">Store Oprational Hour</label>

                                <div
                                  className="row cmpaign-channel-table lbl-fnt-w-400"
                                  style={{ margin: "0px", marginLeft: "30px" }}
                                >
                                  <div>
                                    <label className="mr-10" style={{marginLeft:"40px"}}>From</label>
                                    <label style={{marginLeft:"80px"}}>To</label>
                                    <div className="slot-timings">
                                      <div className="d-flex">
                                        <select
                                          className="slot-hour"
                                          name="selectTimeSlot1"
                                          value={this.state.selectTimeSlot1}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          {this.state.TimeSlotData !== null &&
                                            this.state.TimeSlotData.map(
                                              (item, j) => (
                                                <option
                                                  value={item.TimeSlotId}
                                                  key={j}
                                                >
                                                  {item.TimeSlot}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <select
                                          className="slot-shift"
                                          name="selectAmPm1"
                                          value={this.state.selectAmPm1}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          <option value="AM">AM</option>
                                          <option value="PM">PM</option>
                                        </select>
                                      </div>
                                      <span className="slot-to">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.span.to
                                          : "TO"}
                                      </span>
                                      <div className="d-flex">
                                        <select
                                          className="slot-hour"
                                          name="selectTimeSlot2"
                                          value={this.state.selectTimeSlot2}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          {this.state.TimeSlotData !== null &&
                                            this.state.TimeSlotData.map(
                                              (item, j) => (
                                                <option
                                                  value={item.TimeSlotId}
                                                  key={j}
                                                >
                                                  {item.TimeSlot}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <select
                                          className="slot-shift"
                                          name="selectAmPm2"
                                          value={this.state.selectAmPm2}
                                          onChange={
                                            this.handleDrop_downOnchange
                                          }
                                        >
                                          <option value="AM">AM</option>
                                          <option value="PM">PM</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{marginLeft:"35px"}}>
                                    <label className="mr-10">Appointment Days</label>
                                    <div className="slot-timings" style={{margin:"0px",marginLeft:"10px"}}>
                                      <div className="d-flex">
                                        <select
                                          className="slot-hour"
                                          name="selectTimeSlot1"
                                        >
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                        </select>
                                        <select
                                          className="ap-select"
                                          name="selectAmPm1"
                                          disabled={true}
                                          style={{width:"50px"}}
                                        >
                                          <option value="D">Days</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row cmpaign-channel-table"></div>
                                {/* <div className="cmpaign-channel-table slot-setting-options">
                                  <div></div>

                                  <div></div>
                                </div> */}
                                <button
                                  className="Schedulenext1 w-100 mb-0"
                                  type="button"
                                  onClick={this.handleSubmitTimeSlotDate.bind(
                                    this
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.submit
                                    : "SUBMIT"}
                                </button>
                                <div
                                  className="cmpaign-channel-table slot-setting-options"
                                  style={{ marginTop: "30px" }}
                                >
                                  <label className="slotstorelbl">
                                    {" "}
                                    Select Store Code
                                  </label>
                                  <select
                                    style={{ width: "30%" }}
                                    name="selectStore"
                                    value={this.state.FilterSelectStore}
                                    onChange={this.handleChangeStoreDropdown.bind(
                                      this
                                    )}
                                  >
                                    <option value={0}>All</option>
                                    {this.state.storeCodeData !== null &&
                                      this.state.storeCodeData.map(
                                        (item, s) => (
                                          <option
                                            key={s}
                                            value={item.storeID}
                                            className="select-category-placeholder"
                                          >
                                            {item.storeCode}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <ReactTable
                                data={this.state.TimeSlotGridData}
                                columns={[
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.slotno
                                        : "Slot No",
                                    sortable: false,
                                    accessor: "slotId",
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.storecode
                                        : "Store Code",
                                    accessor: "storeCode",
                                    sortable: false,
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.timeslot
                                        : "Time Slot",
                                    accessor: "timeSlot",
                                    sortable: false,
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.order
                                        : "Order",
                                    accessor: "orderNumber",
                                    sortable: false,
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.createdname
                                        : "Created Name",
                                    accessor: "createdByName",
                                    sortable: false,
                                  },
                                  {
                                    Header:
                                      TranslationContext !== undefined
                                        ? TranslationContext.header.actions
                                        : "Actions",
                                    sortable: false,
                                    Cell: (row) => {
                                      var ids = row.original["slotId"];
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
                                                          row.original.slotId
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
                                                src={RedDeleteIcon}
                                                alt="del-icon"
                                                className="del-btn"
                                                id={ids}
                                              />
                                            </Popover>

                                            <button
                                              className="react-tabel-button editre"
                                              onClick={this.openSlotEditModal.bind(
                                                this,
                                                row.original
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button.edit
                                                : "EDIT"}
                                            </button>
                                          </span>
                                        </>
                                      );
                                    },
                                  },
                                ]}
                                // resizable={false}
                                minRows={2}
                                noDataContent="No Record Found"
                                loading={this.state.isSlotLoading}
                                defaultPageSize={10}
                                showPagination={true}
                              />
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
                              <ReactTable
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
                                      // return (
                                      //   <>
                                      //     <span>
                                      //       <Popover
                                      //         content={
                                      //           <div className="d-flex general-popover popover-body">
                                      //             <div className="del-big-icon">
                                      //               <img
                                      //                 src={DelBigIcon}
                                      //                 alt="del-icon"
                                      //               />
                                      //             </div>
                                      //             <div>
                                      //               <p className="font-weight-bold blak-clr">
                                      //                 Delete file?
                                      //               </p>
                                      //               <p className="mt-1 fs-12">
                                      //                 Are you sure you want to
                                      //                 delete this file?
                                      //               </p>
                                      //               <div className="del-can">
                                      //                 <a href={Demo.BLANK_LINK}>
                                      //                   CANCEL
                                      //                 </a>
                                      //                 <button
                                      //                   className="butn"
                                      //                   onClick={this.handleDeleteLanguage.bind(
                                      //                     this,
                                      //                     row.original.id
                                      //                   )}
                                      //                 >
                                      //                   Delete
                                      //                 </button>
                                      //               </div>
                                      //             </div>
                                      //           </div>
                                      //         }
                                      //         placement="bottom"
                                      //         trigger="click"
                                      //       >
                                      //         <img
                                      //           src={RedDeleteIcon}
                                      //           alt="del-icon"
                                      //           className="del-btn"
                                      //           id={ids}
                                      //         />
                                      //       </Popover>
                                      //     </span>
                                      //   </>
                                      // );
                                      // debugger;
                                      // var isDisable = false;
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
                                                //attrIds={item.moduleId}
                                                // checked={
                                                //   row.original.isActive ===
                                                //   false
                                                //     ? true
                                                //     : false
                                                // }
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
                                // resizable={false}
                                minRows={2}
                                defaultPageSize={10}
                                showPagination={true}
                              />
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
              <div className="edtpadding">
                <div className="">
                  <label className="popover-header-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.editslotsettings
                      : "EDIT SLOT SETTINGS"}
                  </label>
                </div>
                <div className="pop-over-div edit-slot">
                  <div className="cmpaign-channel-table slot-setting-options right-sect-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.storecode
                        : "Store Code"}
                    </label>
                    <div>
                      <select
                        name="storeId"
                        value={this.state.timeSlotEdit.storeId}
                        onChange={this.handleEditDrop_downOnchange}
                      >
                        <option value={0}>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.storecode
                            : "Store code"}
                        </option>
                        {this.state.storeCodeData !== null &&
                          this.state.storeCodeData.map((item, s) => (
                            <option
                              key={s}
                              value={item.storeID}
                              className="select-category-placeholder"
                            >
                              {item.storeCode}
                            </option>
                          ))}
                      </select>
                      {this.state.timeSlotEdit.storeId === "0" && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "0px",
                          }}
                        >
                          {this.state.editStoreCodeValidation}
                        </p>
                      )}
                    </div>
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.option.storetimings
                        : "Store Timings"}
                    </label>
                    <div className="slot-timings">
                      <div className="d-flex">
                        <select
                          className="slot-hour"
                          name="editSelectTimeSlot1"
                          value={this.state.editSelectTimeSlot1}
                          onChange={this.handleEditDrop_downOnchange}
                        >
                          {this.state.TimeSlotData !== null &&
                            this.state.TimeSlotData.map((item, j) => (
                              <option value={item.TimeSlotId} key={j}>
                                {item.TimeSlot}
                              </option>
                            ))}
                        </select>
                        <select
                          className="slot-shift"
                          name="editSelectAmPm1"
                          value={this.state.editSelectAmPm1}
                          onChange={this.handleEditDrop_downOnchange}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                      <span className="slot-to">TO</span>
                      <div className="d-flex">
                        <select
                          className="slot-hour"
                          name="editSelectTimeSlot2"
                          value={this.state.editSelectTimeSlot2}
                          onChange={this.handleEditDrop_downOnchange}
                        >
                          {this.state.TimeSlotData !== null &&
                            this.state.TimeSlotData.map((item, j) => (
                              <option value={item.TimeSlotId} key={j}>
                                {item.TimeSlot}
                              </option>
                            ))}
                        </select>
                        <select
                          className="slot-shift"
                          name="editSelectAmPm2"
                          value={this.state.editSelectAmPm2}
                          onChange={this.handleEditDrop_downOnchange}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                    <label className="edit-label-1">Order Number</label>
                    <input
                      type="text"
                      placeholder="Order no."
                      name="orderNumber"
                      value={this.state.timeSlotEdit.orderNumber}
                      autoComplete="off"
                      maxLength={3}
                      onChange={this.handleSlotEditInputOnchange}
                    />
                    {this.state.timeSlotEdit.orderNumber === "" && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        {this.state.editOrderNovalidation}
                      </p>
                    )}
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.maximumcapacity
                        : "Maximum Capacity"}
                    </label>
                    <input
                      type="text"
                      placeholder="Max Cpty"
                      name="maxCapacity"
                      autoComplete="off"
                      maxLength={2}
                      value={this.state.timeSlotEdit.maxCapacity}
                      onChange={this.handleSlotEditInputOnchange}
                    />
                    {this.state.timeSlotEdit.maxCapacity === "" && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        {this.state.editMaxCapacityValidation}
                      </p>
                    )}
                  </div>
                </div>
                <br />
                <div className="text-center">
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
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreModule;
