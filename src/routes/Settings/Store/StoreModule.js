import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
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
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { ProgressBar } from "react-bootstrap";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";

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
  }
  // fileUpload = (e) => {
  //   this.setState({ fileName: e.target.files[0].name });
  // };
  // fileDrop = (e) => {
  //   this.setState({ fileName: e.dataTransfer.files[0].name });
  //   e.preventDefault();
  // };
  // fileDragOver = (e) => {
  //   e.preventDefault();
  // };
  // fileDragEnter = (e) => {
  //   e.preventDefault();
  // };

  fileUpload = (file) => {
    debugger;
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
    debugger;
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
    debugger;
    this.setState({ editModal: false });
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
    debugger;
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
        debugger;
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

  // handleSearchSla = async (e) => {
  //   debugger;
  //   if (e.target.value.length > 3) {
  //     await this.setState({
  //       SearchText: e.target.value,
  //     });
  //     this.handleGetSLAIssueType();
  //   } else {
  //     await this.setState({
  //       SearchText: "",
  //     });
  //     this.handleGetSLAIssueType();
  //   }
  // };

  selectIndividualCampaign = async (issueId, event) => {
    debugger;
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
    debugger;
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
    debugger;
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

  componentDidMount() {
    this.handleClaimTabData();
    this.handleCampaignNameList();
    this.handleCampaignScriptGridData();
  }

  setClaimTabData = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  setScriptDetails = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  setUpdateCampaign = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClaimTabData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetStoreAttachmentSettings",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
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
    debugger;
    this.setState({
      editModal: true,
      updateIndiCampaignId: individualData.campaignNameID,
      updateScriptDetails: individualData.campaignScript,
      updateCampaignId: individualData.campaignID,
    });
  }

  handleCampaignNameList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetCampaignName",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
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

  handleCampaignScriptGridData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/ModuleSetting/GetCampaignScript",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
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
    debugger;
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
          debugger;
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
    debugger;
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
          debugger;
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
    debugger;
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
          debugger;
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
    debugger;
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
    debugger;
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
    debugger;

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
    debugger;
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
    debugger;

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
    debugger;
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

  render() {
    return (
      <Fragment>
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
            Modules
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
              <Tabs
                onSelect={(index, label) =>
                  this.setState({ selTab: label, indiCampaign: "" })
                }
                selected={this.state.selTab}
              >
                <Tab label="Claim">
                  <div style={{ height: "100vh" }} className="chatallowedStore">
                    <div className="row">
                      <div className="col-md-4 chatallowed">
                        <label className="claimtab-lbl">
                          Attachment Settings
                        </label>
                        <label className="claimTab-DDl">
                          Maximum Attachment Size
                        </label>
                        <select
                          name="selectedMaxAttachSize"
                          value={this.state.selectedMaxAttachSize}
                          onChange={this.setClaimTabData}
                        >
                          <option value={0}>Select Size</option>
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
                        <label className="claimTab-DDl">File Format</label>
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
                            SAVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab label="Campaign Script">
                  {/* <div className="container-fluid"> */}
                  <div className="store-mdl backNone">
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
                                          {/* {row.original.campaignScriptLess} */}
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
                                        {/* <Popover
                                          content={
                                            <div className="edtpadding">
                                              <div className="">
                                                <label className="popover-header-text">
                                                  EDIT CAMPAIGN SCRIPT
                                                </label>
                                              </div>
                                              <div className=" pop-over-div">
                                                <label className="pop-over-lbl-text">
                                                  {" "}
                                                  Campaign Name
                                                </label>
                                                <select className="pop-over-select">
                                                  <option>Birthday</option>
                                                  <option>Anniversary</option>
                                                </select>
                                              </div>
                                              <div className="div-cntr">
                                                <label className="pop-over-lbl-text">
                                                  Script Details
                                                </label>
                                                <textarea
                                                  className="stort-textArea"
                                                  rows="4"
                                                ></textarea>
                                              </div>

                                              <br />
                                              <div>
                                                <a
                                                  className="pop-over-cancle"
                                                  href={Demo.BLANK_LINK}
                                                >
                                                  CANCEL
                                                </a>
                                                <button className="pop-over-button">
                                                  SAVE
                                                </button>
                                              </div>
                                            </div>
                                          }
                                          placement="bottom"
                                          trigger="click"
                                        > */}
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
                                        {/* </Popover> */}
                                      </span>
                                    </>
                                  );
                                },
                              },
                            ]}
                            // resizable={false}
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
                                  {/* <div className="campaignScriptData-cancel-search">
                                                        <input
                                                          type="text"
                                                          className="searchf"
                                                          placeholder="Search"
                                                          maxLength={25}
                                                          name="store_code"
                                                          onChange={
                                                            this.handleSearchSla
                                                          }
                                                          id="SlaInput"
                                                        />

                                                        <img
                                                          src={Cancel}
                                                          alt="cancelimg"
                                                          onClick={
                                                            this
                                                              .handleClearSearchSla
                                                          }
                                                        />
                                                      </div> */}

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
                  {/* </div> */}
                </Tab>
              </Tabs>
            </section>
            <Modal
              className="EditModa"
              show={this.state.editModal}
              onHide={this.handleEditModal}
            >
              <div className="edtpadding">
                <div className="">
                  <label className="popover-header-text">
                    EDIT CAMPAIGN SCRIPT
                  </label>
                </div>
                <div className=" pop-over-div">
                  <label className="pop-over-lbl-text"> Campaign Name</label>
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
                  <label className="pop-over-lbl-text">Script Details</label>
                  <textarea
                    className="stort-textArea"
                    rows="4"
                    value={this.state.updateScriptDetails}
                    name="updateScriptDetails"
                    onChange={this.setUpdateCampaign}
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
                    CANCEL
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
                    SAVE
                  </button>
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
