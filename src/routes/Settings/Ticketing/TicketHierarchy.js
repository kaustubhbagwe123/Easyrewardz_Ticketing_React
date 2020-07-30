import React, { Component, useState } from "react";
import Demo from "../../../store/Hashtag";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import ReactTable from "react-table";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import FileUpload from "./../../../assets/Images/file.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover, Spin } from "antd";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import config from "../../../helpers/config";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import ActiveStatus from "../../activeStatus";
import { CSVLink } from "react-csv";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const MyButton = (props) => {
  const { children } = props;
  return (
    <div style={{ cursor: "pointer" }} {...props}>
      <button className="react-tabel-button" id="p-edit-pop-2">
        <label className="Table-action-edit-button-text">{children}</label>
      </button>
    </div>
  );
};

const Content = (props) => {
  const { rowData } = props;
  const [designationName, setDesignationvalue] = useState(
    rowData.designationName
  );
  const [reportTo, setreportToValue] = useState(rowData.reportToDesignation);
  const [status, setStatusValue] = useState(rowData.status);
  const [designationID] = useState(rowData.designationID);
  const TranslationContext = props.translateLanguage.default;
  props.callBackEdit(designationName, reportTo, status, designationID);
  return (
    <div className="edtpadding">
      <label className="popover-header-text">
        {TranslationContext !== undefined
          ? TranslationContext.label.edithierarchy
          : "EDIT HIERARCHY"}
      </label>
      <div className="pop-over-div">
        <label className="edit-label-1">
          {TranslationContext !== undefined
            ? TranslationContext.label.DesignationName
            : "Designation Name"}
        </label>
        <input
          type="text"
          className="txt-edit-popover"
          placeholder={
            TranslationContext !== undefined
              ? TranslationContext.placeholder.EnterDesignationName
              : "Enter Designation Name"
          }
          maxLength={25}
          name="designation_Name"
          value={designationName}
          onChange={(e) => setDesignationvalue(e.target.value)}
        />
        {designationName === "" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editdesignationNameCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">
          {TranslationContext !== undefined
            ? TranslationContext.label.ReportTo
            : "Report To"}
        </label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="report_To"
          value={reportTo}
          //onChange={this.handleOnChangeData}
          onChange={(e) => setreportToValue(e.target.value)}
        >
          <option>
            {TranslationContext !== undefined
              ? TranslationContext.option.select
              : "select"}
          </option>
          <option value={0}>
            {TranslationContext !== undefined
              ? TranslationContext.option.root
              : "Root"}
          </option>
          {props.reportToData !== null &&
            props.reportToData.map((item, i) => (
              <option key={i} value={item.designationID}>
                {item.designationName}
              </option>
            ))}
        </select>
        {reportTo === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editreportToCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">
          {TranslationContext !== undefined
            ? TranslationContext.label.status
            : "Status"}
        </label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="designation_status"
          value={status}
          onChange={(e) => setStatusValue(e.target.value)}
        >
          <option>
            {TranslationContext !== undefined
              ? TranslationContext.option.select
              : "select"}
          </option>
          {props.activeData !== null &&
            props.activeData.map((item, j) => (
              <option key={j} value={item.ActiveID}>
                {item.ActiveName}
              </option>
            ))}
        </select>
        {status === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editstatusCompulsion}
          </p>
        )}
      </div>
      <br />
      <div>
        <a className="pop-over-cancle canblue" href={Demo.BLANK_LINK}>
          {TranslationContext !== undefined
            ? TranslationContext.a.cancel
            : "CANCEL"}
        </a>
        <button
          className="pop-over-button"
          onClick={(e) => {
            props.handleUpdateHierarchyData(e, designationID);
          }}
          disabled={props.editSaveLoading}
        >
          <label className="pop-over-btnsave-text">
            {props.editSaveLoading ? (
              <FontAwesomeIcon
                className="circular-loader"
                icon={faCircleNotch}
                spin
              />
            ) : (
              ""
            )}
            {TranslationContext !== undefined
              ? TranslationContext.label.save
              : "SAVE"}
          </label>
        </button>
      </div>
    </div>
  );
};

class TicketHierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      StatusModel: false,
      designation_name: "",
      selectReportTo: 0,
      selectStatus: 0,
      hierarchyData: [],
      reportToData: [],
      activeData: ActiveStatus(),
      hierarchyEditData: {},
      designationNameCompulsion: "",
      reportToCompulsion: "",
      statusCompulsion: "",
      editdesignationNameCompulsion: "Designation Name field is compulsory.",
      editreportToCompulsion: "ReportTo field is compulsory.",
      editstatusCompulsion: "Status field is compulsory.",
      sortAllData: [],
      sortDesignation: [],
      sortReportTo: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortColumn: "",
      sortHeader: "",
      designationColor: "",
      reportToColor: "",
      createdColor: "",
      statusColor: "",
      updateDesignation: "",
      updateReprtTo: "",
      updateStatus: "",
      rowData: {},
      editSaveLoading: false,
      addSaveLoading: false,
      fileName: "",
      fileN: [],
      bulkuploadCompulsion: "",
      sortFilterDesignation: [],
      sortFilterReportTo: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      sFilterCheckbox: "",
      filterTxtValue: "",
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      sdesignationNameFilterCheckbox: "",
      sreportToFilterCheckbox: "",
      screatedbypersonFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      isortA: false,
      temphierarchyData: [],
      bulkuploadLoading: false,
      translateLanguage: {},
    };
    this.togglePopover = this.togglePopover.bind(this);
    this.handleGetHierarchyData = this.handleGetHierarchyData.bind(this);
    this.hanldeGetReportListDropDown = this.hanldeGetReportListDropDown.bind(
      this
    );
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    // this.hanldeAddBulkUpload = this.hanldeAddBulkUpload.bind(this);
  }
  callBackEdit = (designationName, reportTo, status, rowData) => {
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.updateDesignation = designationName;
    this.state.updateReprtTo = reportTo;
    this.state.updateStatus = status;
    this.state.rowData = rowData;
  };

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  hide(e, id) {
    // document.getElementById(id).style.display="none";
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }
  componentDidMount() {
    this.handleGetHierarchyData();
    this.hanldeGetReportListDropDown();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;
    var headerName = "";

    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName < b.designationName) return 1;
        if (a.designationName > b.designationName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reportTo") {
      itemsArray.sort((a, b) => {
        if (a.reportTo < b.reportTo) return 1;
        if (a.reportTo > b.reportTo) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdbyperson") {
      itemsArray.sort((a, b) => {
        if (a.createdbyperson < b.createdbyperson) return 1;
        if (a.createdbyperson > b.createdbyperson) return -1;
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
      hierarchyData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;
    var headerName = "";

    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName < b.designationName) return -1;
        if (a.designationName > b.designationName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reportTo") {
      itemsArray.sort((a, b) => {
        if (a.reportTo < b.reportTo) return -1;
        if (a.reportTo > b.reportTo) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdbyperson") {
      itemsArray.sort((a, b) => {
        if (a.createdbyperson < b.createdbyperson) return -1;
        if (a.createdbyperson > b.createdbyperson) return 1;
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
      hierarchyData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (
      this.state.sortFilterDesignation.length === 0 ||
      this.state.sortFilterReportTo.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (data === "designationName") {
      if (
        this.state.sreportToFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportToFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reportTo") {
      if (
        this.state.sstatusFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          // sdesignationFilterCheckbox: "",
          // smobileNumberFilterCheckbox: "",
          // semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdbyperson") {
      if (
        this.state.sstatusFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          // sdesignationFilterCheckbox: "",
          // suserNameFilterCheckbox: "",
          // semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "status") {
      if (
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreportToFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          sreportToFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.temphierarchyData.length > 0) {
      this.setState({
        StatusModel: false,
        hierarchyData: this.state.temphierarchyData,
        filterTxtValue: "",
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterDesignation: this.state.sortDesignation,
        sortFilterReportTo: this.state.sortReportTo,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "designationName") {
        if (this.state.sdesignationNameFilterCheckbox === "") {
        } else {
          this.setState({
            sreportToFilterCheckbox: "",
            screatedbypersonFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reportTo") {
        if (this.state.sreportToFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationNameFilterCheckbox: "",
            screatedbypersonFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdbyperson") {
        if (this.state.screatedbypersonFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationNameFilterCheckbox: "",
            sreportToFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "status") {
        if (this.state.sstatusFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationNameFilterCheckbox: "",
            sreportToFilterCheckbox: "",
            screatedbypersonFilterCheckbox: "",
          });
        }
      }
    } else {
      if (this.state.isortA) {
        this.setState({
          StatusModel: false,
          hierarchyData: this.state.hierarchyData,
          filterTxtValue: "",
          sortFilterCreatedBy: this.state.sortCreatedBy,
          sortFilterDesignation: this.state.sortDesignation,
          sortFilterReportTo: this.state.sortReportTo,
          sortFilterStatus: this.state.sortStatus,
        });
      } else {
        this.setState({
          StatusModel: false,
          hierarchyData: this.state.sortAllData,
          filterTxtValue: "",
          sortFilterCreatedBy: this.state.sortCreatedBy,
          sortFilterDesignation: this.state.sortDesignation,
          sortFilterReportTo: this.state.sortReportTo,
          sortFilterStatus: this.state.sortStatus,
        });
      }
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sdesignationNameFilterCheckbox = this.state
      .sdesignationNameFilterCheckbox;
    var sreportToFilterCheckbox = this.state.sreportToFilterCheckbox;
    var screatedbypersonFilterCheckbox = this.state
      .screatedbypersonFilterCheckbox;
    var sstatusFilterCheckbox = this.state.sstatusFilterCheckbox;

    if (column === "designationName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdesignationNameFilterCheckbox.includes(e.currentTarget.value)) {
          sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sdesignationNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdesignationNameFilterCheckbox.includes("all")) {
          sdesignationNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "designationName") {
            for (let i = 0; i < this.state.sortDesignation.length; i++) {
              sdesignationNameFilterCheckbox +=
                this.state.sortDesignation[i].designationName + ",";
            }
            sdesignationNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reportTo" || column === "all") {
      if (type === "value" && type !== "All") {
        sreportToFilterCheckbox = sreportToFilterCheckbox.replace("all", "");
        sreportToFilterCheckbox = sreportToFilterCheckbox.replace("all,", "");
        if (sreportToFilterCheckbox.includes(e.currentTarget.value)) {
          sreportToFilterCheckbox = sreportToFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sreportToFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreportToFilterCheckbox.includes("all")) {
          sreportToFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reportTo") {
            for (let i = 0; i < this.state.sortReportTo.length; i++) {
              sreportToFilterCheckbox +=
                this.state.sortReportTo[i].reportTo + ",";
            }
            sreportToFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdbyperson" || column === "all") {
      screatedbypersonFilterCheckbox = screatedbypersonFilterCheckbox.replace(
        "all",
        ""
      );
      screatedbypersonFilterCheckbox = screatedbypersonFilterCheckbox.replace(
        "all,",
        ""
      );
      if (type === "value" && type !== "All") {
        if (screatedbypersonFilterCheckbox.includes(e.currentTarget.value)) {
          screatedbypersonFilterCheckbox = screatedbypersonFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedbypersonFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedbypersonFilterCheckbox.includes("all")) {
          screatedbypersonFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdbyperson") {
            for (let i = 0; i < this.state.sortCreatedBy.length; i++) {
              screatedbypersonFilterCheckbox +=
                this.state.sortCreatedBy[i].createdbyperson + ",";
            }
            screatedbypersonFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "status" || column === "all") {
      sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all", "");
      sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all,", "");
      if (type === "value" && type !== "All") {
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
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sstatusFilterCheckbox += this.state.sortStatus[i].status + ",";
            }
            sstatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      designationColor: "",
      reportToColor: "",
      createdColor: "",
      statusColor: "",
      sdesignationNameFilterCheckbox,
      sreportToFilterCheckbox,
      screatedbypersonFilterCheckbox,
      sstatusFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "designationName") {
      var sItems = sdesignationNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.designationName === sItems[i]
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
        designationColor: "sort-column",
        [e.target.name]: true,
      });
    } else if (column === "reportTo") {
      var sItems = sreportToFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reportTo === sItems[i]
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
        reportToColor: "sort-column",
      });
    } else if (column === "createdbyperson") {
      var sItems = screatedbypersonFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdbyperson === sItems[i]
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
    } else if (column === "status") {
      var sItems = sstatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.status === sItems[i]);
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
      temphierarchyData: itemsArray,
    });
    // this.StatusCloseModel();
  };
  hanldeGetReportListDropDown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            reportToData: data,
          });
        } else {
          self.setState({
            reportToData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDeleteBulkupload = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    this.setState({
      fileN: [],
      fileName: "",
      isOpen: false,
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  hanldeAddBulkUpload() {
    debugger;
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      if (this.state.fileN[0].path.split(".")[1] === "csv") {
        let self = this;
        this.setState({
          bulkuploadLoading: true,
        });
        const formData = new FormData();

        formData.append("file", this.state.fileN[0]);

        // this.setState({ showProgress: true });
        axios({
          method: "post",
          url: config.apiUrl + "/Hierarchy/BulkUploadHierarchy",
          headers: authHeader(),
          data: formData,
          // cancelToken: source.token,
          // onUploadProgress: (ev = ProgressEvent) => {
          //   const progress = (ev.loaded / ev.total) * 100;
          //   this.updateUploadProgress(Math.round(progress));
          // }
        })
          .then(function(res) {
            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.fileuploadedsuccessfully
                  : "File uploaded successfully."
              );
              self.setState({
                fileName: "",
                fileSize: "",
                fileN: [],
                bulkuploadLoading: false,
              });
              self.handleGetHierarchyData();
            } else {
              self.setState({
                showProgress: false,
                bulkuploadLoading: false,
                // isFileUploadFail: true,
                // progressValue: 0
              });
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.filenotuploaded
                  : "File not uploaded."
              );
            }
          })
          .catch((data) => {
            if (data.message) {
              this.setState({
                showProgress: false,
                isFileUploadFail: true,
                bulkuploadLoading: false,
              });
            }
            console.log(data);
          });
      } else {
        NotificationManager.error("Only CSV files allowed.");
      }
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file.",
      });
    }
  }
  handleGetHierarchyData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/ListHierarchy",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].designationName]) {
              distinct.push(data[i].designationName);
              unique[data[i].designationName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortDesignation.push({ designationName: distinct[i] });
            self.state.sortFilterDesignation.push({
              designationName: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reportTo]) {
              distinct.push(data[i].reportTo);
              unique[data[i].reportTo] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortReportTo.push({ reportTo: distinct[i] });
            self.state.sortFilterReportTo.push({ reportTo: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdbyperson]) {
              distinct.push(data[i].createdbyperson);
              unique[data[i].createdbyperson] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedBy.push({ createdbyperson: distinct[i] });
            self.state.sortFilterCreatedBy.push({
              createdbyperson: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].status]) {
              distinct.push(data[i].status);
              unique[data[i].status] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ status: distinct[i] });
            self.state.sortFilterStatus.push({ status: distinct[i] });
          }
        }

        if (status === "Success") {
          self.setState({
            hierarchyData: data,
          });
        } else {
          self.setState({
            hierarchyData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSubmitData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.designation_name.length > 0 &&
      this.state.selectReportTo !== 0 &&
      this.state.selectStatus !== 0
    ) {
      let self = this;
      var activeStatus = 0;
      var status = this.state.selectStatus;
      if (status === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      var ReportId = this.state.selectReportTo;
      if (ReportId === "1") {
        ReportId = 0;
      }
      this.setState({ addSaveLoading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Hierarchy/CreateHierarchy",
        headers: authHeader(),
        data: {
          DesignationName: this.state.designation_name.trim(),
          ReportToDesignation: ReportId,
          IsActive: activeStatus,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetHierarchyData();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.hierarchyaddedsuccessfully
                : "Hierarchy added successfully."
            );
            self.hanldeGetReportListDropDown();
            self.setState({
              designation_name: "",
              selectReportTo: 0,
              selectStatus: 0,
              designationNameCompulsion: "",
              reportToCompulsion: "",
              statusCompulsion: "",
              addSaveLoading: false,
            });
          } else if (status === "Record Already Exists ") {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordalreadyexists
                : "Record Already Exists."
            );
            self.setState({ addSaveLoading: false });
          }
        })
        .catch((data) => {
          self.setState({ addSaveLoading: false });
          console.log(data);
        });
    } else {
      this.setState({
        designationNameCompulsion: "Designation Name field is compulsory.",
        reportToCompulsion: "ReportTo field is compulsory.",
        statusCompulsion: "Status field is compulsory.",
      });
    }
  }
  handleDeleteHierarchy(hierarchy_Id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID: hierarchy_Id,
        Deleteflag: 1,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetHierarchyData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.designationdeletedsuccessfully
              : "Designation deleted successfully."
          );
          self.hanldeGetReportListDropDown();
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleUpdateHierarchyData(e, designationID) {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.updateDesignation.length > 0 &&
      this.state.updateReprtTo !== "select" &&
      this.state.updateStatus !== "select"
    ) {
      let self = this;
      var activeStatus = 0;

      if (self.state.updateStatus === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      this.setState({ editSaveLoading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Hierarchy/CreateHierarchy",
        headers: authHeader(),
        data: {
          DesignationID: designationID,
          DesignationName: self.state.updateDesignation.trim(),
          ReportToDesignation: self.state.updateReprtTo,
          IsActive: activeStatus,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetHierarchyData();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.hierarchyupdatesuccessfully
                : "Hierarchy update successfully."
            );
            self.hanldeGetReportListDropDown();
            self.setState({ editSaveLoading: false });
          } else {
            self.setState({ editSaveLoading: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.hierarchynotupdate
                : "Hierarchy not update."
            );
          }
        })
        .catch((data) => {
          self.setState({ editSaveLoading: false });
          console.log(data);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.hierarchynotupdate
          : "Hierarchy not update."
      );
      this.setState({
        editdesignationNameCompulsion: "Designation Name field is compulsory.",
        editreportToCompulsion: "ReportTo field is compulsory.",
        editstatusCompulsion: "Status field is compulsory.",
      });
    }
  }
  handleGetEditData(data) {
    this.show();
    var hierarchyEditData = data;
    hierarchyEditData.designation_Name = hierarchyEditData.designationName;
    hierarchyEditData.report_To = hierarchyEditData.reportToDesignation;
    hierarchyEditData.designation_status = hierarchyEditData.status;

    this.setState({
      hierarchyEditData,
    });
  }
  handleOnReportToChange = (e) => {
    let value = e.target.value;
    this.setState({ selectReportTo: value });
  };
  handleStatusChange = (e) => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };
  handleOnChangeData = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.hierarchyEditData;
    data[name] = value;

    this.setState({
      EditTemp: data,
    });
  };
  fileUpload = (e) => {
    var allFiles = [];
    var selectedFiles = e;
    if (selectedFiles) {
      allFiles.push(selectedFiles[0]);

      var fileSize = formatSizeUnits(selectedFiles[0].size);
      this.setState({
        fileSize,
        fileN: allFiles,
        fileName: allFiles[0].name,
        bulkuploadCompulsion: "",
      });
    }
  };
  fileDrop = (e) => {
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      fileN: allFiles,
      fileName: allFiles[0].name,
    });
    e.preventDefault();
  };
  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };
  handleOnChangeHierarchyData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "designationName") {
      var sortFilterDesignation = matchSorter(
        this.state.sortDesignation,
        e.target.value,
        { keys: ["designationName"] }
      );
      if (sortFilterDesignation.length > 0) {
        this.setState({ sortFilterDesignation });
      } else {
        this.setState({
          sortFilterDesignation: this.state.sortDesignation,
        });
      }
    }
    if (this.state.sortColumn === "reportTo") {
      var sortFilterReportTo = matchSorter(
        this.state.sortReportTo,
        e.target.value,
        { keys: ["reportTo"] }
      );
      if (sortFilterReportTo.length > 0) {
        this.setState({ sortFilterReportTo });
      } else {
        this.setState({
          sortFilterReportTo: this.state.sortReportTo,
        });
      }
    }
    if (this.state.sortColumn === "createdbyperson") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        {
          keys: ["createdbyperson"],
        }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: this.state.sortCreatedBy,
        });
      }
    }
    if (this.state.sortColumn === "status") {
      var sortFilterStatus = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        {
          keys: ["status"],
        }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: this.state.sortCreatedBy,
        });
      }
    }
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { hierarchyData } = this.state;

    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
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
                  <p>
                    {" "}
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
                    {" "}
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
              <div className="filter-type ">
                <p>
                  {" "}
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
                        this.state.sdesignationNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sreportToFilterCheckbox.includes("all") ||
                        this.state.screatedbypersonFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sstatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">
                        {TranslationContext !== undefined
                          ? TranslationContext.span.all
                          : "ALL"}
                      </span>
                    </label>
                  </div>
                  {this.state.sortColumn === "designationName"
                    ? this.state.sortFilterDesignation !== null &&
                      this.state.sortFilterDesignation.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.designationName}
                            id={"fil-open" + item.designationName}
                            value={item.designationName}
                            checked={this.state.sdesignationNameFilterCheckbox.includes(
                              item.designationName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "designationName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.designationName}>
                            <span className="table-btn table-blue-btn">
                              {item.designationName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "reportTo"
                    ? this.state.sortFilterReportTo !== null &&
                      this.state.sortFilterReportTo.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.reportTo}
                            value={item.reportTo}
                            checked={this.state.sreportToFilterCheckbox.includes(
                              item.reportTo
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "reportTo",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.reportTo}>
                            <span className="table-btn table-blue-btn">
                              {item.reportTo}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdbyperson"
                    ? this.state.sortFilterCreatedBy !== null &&
                      this.state.sortFilterCreatedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdbyperson}
                            value={item.createdbyperson}
                            checked={this.state.screatedbypersonFilterCheckbox.includes(
                              item.createdbyperson
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdbyperson",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdbyperson}>
                            <span className="table-btn table-blue-btn">
                              {item.createdbyperson}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "status"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
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
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <a href="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.a.ticketing
              : "Ticketing"}
          </a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path active">
            {TranslationContext !== undefined
              ? TranslationContext.a.hierarchy
              : "Hierarchy"}
          </a>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr tickhierpad settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketHierarchyReact settings-align">
                  <ReactTable
                    data={hierarchyData}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.designationColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designationName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.designation
                                : "Designation"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.designation
                              : "Designation"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "designationName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.reportToColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reportTo",
                              TranslationContext !== undefined
                                ? TranslationContext.span.reportto
                                : "Report To"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.reportto
                              : "Report To"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "reportTo",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdbyperson",
                              TranslationContext !== undefined
                                ? TranslationContext.span.createdby
                                : "Created By"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.createdby
                              : "Created By"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdbyperson",
                        sortable: false,
                        Cell: (row) => {
                          // var ids = row.original["designationID"];
                          return (
                            <div>
                              <span className="one-liner">
                                {row.original.createdbyperson}
                                <Popover
                                  content={
                                    <div className="settings-created-by-popover">
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.createdby
                                              : "Created By"}
                                            :&nbsp;
                                            {row.original["createdbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.createddate
                                            : "Created Date"}
                                          :&nbsp;
                                          {row.original["createdateformat"]}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                            :&nbsp;
                                            {row.original["updatedbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}
                                          :&nbsp;
                                          {row.original["updateddateformat"]}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon-cp"
                                    src={BlackInfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "status",
                              TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.status
                              : "Status"}

                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "status",
                      },
                      {
                        Header: (
                          <span>
                            {" "}
                            {TranslationContext !== undefined
                              ? TranslationContext.span.actions
                              : "Actions"}
                          </span>
                        ),
                        accessor: "actiondept",
                        Cell: (row) => {
                          var ids = row.original["designationID"];
                          return (
                            <>
                              <span className="settings-align-actions">
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + ids}
                                    >
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.deletefile
                                            : "Delete file"}
                                          ?
                                        </p>
                                        <p className="mt-1 fs-12">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p
                                                .areyousureyouwanttodeletethisfile
                                            : "Are you sure you want to delete this file"}
                                          ?
                                        </p>
                                        <div className="del-can">
                                          <a
                                            className="canblue"
                                            onClick={() =>
                                              this.hide(this, "samdel" + ids)
                                            }
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.a.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            type="button"
                                            onClick={this.handleDeleteHierarchy.bind(
                                              this,
                                              ids
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.delete
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
                                    onClick={() =>
                                      this.show(this, "samdel" + ids)
                                    }
                                  />
                                </Popover>
                                <Popover
                                  content={
                                    <Content
                                      rowData={row.original}
                                      translateLanguage={
                                        this.state.translateLanguage
                                      }
                                      reportToData={this.state.reportToData}
                                      activeData={this.state.activeData}
                                      editdesignationNameCompulsion={
                                        this.state.editdesignationNameCompulsion
                                      }
                                      editSaveLoading={
                                        this.state.editSaveLoading
                                      }
                                      editreportToCompulsion={
                                        this.state.editreportToCompulsion
                                      }
                                      editstatusCompulsion={
                                        this.state.editstatusCompulsion
                                      }
                                      callBackEdit={this.callBackEdit}
                                      handleUpdateHierarchyData={this.handleUpdateHierarchyData.bind(
                                        this
                                      )}
                                    />
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  {/* <button
                                    className="react-tabel-button"
                                    type="button"
                                    // onClick={() => this.handleGetEditData.bind(
                                    //   this,
                                    //   row.original
                                    // )}
                                  >
                                    EDIT
                                  </button> */}
                                  <label className="Table-action-edit-button-text">
                                    <MyButton>
                                      {" "}
                                      {TranslationContext !== undefined
                                        ? TranslationContext.mybutton.edit
                                        : "EDIT"}
                                    </MyButton>
                                  </label>
                                </Popover>
                              </span>
                            </>
                          );
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

              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createhierarchy
                        : "CREATE HIERARCHY"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.designationname
                          : "Designation Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder
                                .enterdesignationname
                            : "Enter Designation Name"
                        }
                        maxLength={25}
                        name="designation_name"
                        value={this.state.designation_name}
                        onChange={this.handleOnChangeHierarchyData}
                      />
                      {this.state.designation_name.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.designationNameCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                          {" "}
                          {TranslationContext !== undefined
                            ? TranslationContext.label.reportto
                            : "Reports To"}
                        </label>
                        <select
                          className="form-control dropdown-setting"
                          value={this.state.selectReportTo}
                          onChange={this.handleOnReportToChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          <option value={1}>
                            {" "}
                            {TranslationContext !== undefined
                              ? TranslationContext.option.root
                              : "Root"}
                          </option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectReportTo === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                      >
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.handleSubmitData.bind(this)}
                        disabled={this.state.addSaveLoading}
                      >
                        <label className="pop-over-btnsave-text">
                          {this.state.addSaveLoading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                            ""
                          )}
                          {TranslationContext !== undefined
                            ? TranslationContext.label.add
                            : "ADD"}
                        </label>
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">
                      {TranslationContext !== undefined
                        ? TranslationContext.h3.bulkupload
                        : "Bulk Upload"}
                    </h3>
                    <div className="down-excel">
                      <p>
                        {" "}
                        {TranslationContext !== undefined
                          ? TranslationContext.p.template
                          : "Template"}
                      </p>
                      <CSVLink
                        filename={"Hierarchy.csv"}
                        data={config.hierarchyTemplate}
                      >
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
                    </div>
                  </div>
                  <Spin
                    tip={
                      TranslationContext !== undefined
                        ? TranslationContext.tip.pleasewait
                        : "Please wait..."
                    }
                    spinning={this.state.bulkuploadLoading}
                  >
                    <div className="mainfileUpload">
                      <Dropzone onDrop={this.fileUpload.bind(this)}>
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
                              {" "}
                              {TranslationContext !== undefined
                                ? TranslationContext.span.addfile
                                : "Add File"}
                            </span>{" "}
                            {TranslationContext !== undefined
                              ? TranslationContext.div.or
                              : "or"}
                            {TranslationContext !== undefined
                              ? TranslationContext.div.dropfilehere
                              : "Drop File here"}
                          </div>
                        )}
                      </Dropzone>
                    </div>
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
                              <img
                                src={DelBlack}
                                alt="delete-black"
                                onClick={this.togglePopover}
                              />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="auto"
                              target="del-file-1"
                              className="general-popover delete-popover"
                              isOpen={this.state.isOpen}
                              toggle={this.togglePopover}
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
                                </div>
                                <div>
                                  <p className="font-weight-bold blak-clr">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.deletefile
                                      : "Delete file"}
                                    ?
                                  </p>
                                  <p className="mt-1 fs-12">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p
                                          .areyousureyouwanttodeletethisfile
                                      : "Are you sure you want to delete this file"}
                                    ?
                                  </p>
                                  <div className="del-can">
                                    <a
                                      className="canblue"
                                      onClick={this.togglePopover}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.cancel
                                        : "CANCEL"}
                                    </a>
                                    <button
                                      className="butn"
                                      onClick={this.handleDeleteBulkupload}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.delete
                                        : "Delete"}
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
                                onClick={this.hanldeAddBulkUpload.bind(this)}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.retry
                                  : "Retry"}
                              </a>
                            </div>
                            <div>
                              <span className="file-failed">
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.failed
                                  : "Failed"}
                              </span>
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
                                {/* {this.state.progressValue !== 100 ? ( */}
                                <div className="cancel-upload">
                                  {/* <img src={UploadCancel} alt="upload cancel" onClick={source.cancel('Operation canceled by the user.')} /> */}
                                  <img src={UploadCancel} alt="upload cancel" />
                                </div>
                                {/* ) : null} */}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}

                    <button
                      className="butn"
                      onClick={this.hanldeAddBulkUpload.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.add
                        : "ADD"}
                    </button>
                  </Spin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TicketHierarchy;
