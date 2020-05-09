import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "./../../../store/Hashtag.js";
import ReactTable from "react-table";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import Sorting from "./../../../assets/Images/sorting.png";
import { ProgressBar } from "react-bootstrap";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { Popover, Select as Aselect } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { NotificationManager } from "react-notifications";
import ActiveStatus from "../../activeStatus.js";
import Modal from "react-responsive-modal";
import matchSorter from "match-sorter";
import DownExcel from "./../../../assets/Images/csv.png";
import { CSVLink } from "react-csv";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";

const { Option } = Aselect;
const NEW_ITEM = "NEW_ITEM";

class DepartmentMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      activeData: ActiveStatus(),
      selectStatus: 0,
      brandData: [],
      StoreCode: [],
      selectedBrand: [],
      selectedStoreCode: [],
      list1Value: "",
      showList1: false,
      departmentData: [],
      departmentGrid: [],
      listFunction: "",
      ShowFunction: false,
      department_Id: 0,
      function_Id: 0,
      functionData: [],
      statusCompulsory: "",
      functionCompulsory: "",
      departmentCompulsory: "",
      storeCodeCompulsory: "",
      editDepartment: {},
      departmentMapId: 0,
      sortHeader: "",
      StatusModel: false,
      sbrandNameFilterCheckbox: "",
      sStoreCodeFilterCheckbox: "",
      sDepartNameFilterCheckbox: "",
      sFunctionFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      sortFilterBrandName: [],
      sortFilterStoreCode: [],
      sortFilterDepartName: [],
      sortFilterFunction: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      editBrandCompulsory: "Please Select Brand.",
      editStoreCompulsory: "Please Select Store.",
      editDepartmentCompulsory: "Please Select Department.",
      editFunctionCompulsory: "Please Select Function.",
      editSaveLoading: false,
      editmodel: false,
      tempDepartment: [],
      sortAllData: [],
      sortBrandName: [],
      sortStoreCode: [],
      sortDepartName: [],
      sortFunction: [],
      sortCreated: [],
      sortStatus: [],
      brandColor: "",
      storeCodeColor: "",
      DepartNameColor: "",
      FunctionColor: "",
      createdColor: "",
      statusColor: "",
      sortColumn: "",
      fileSize: "",
      file: {},
      fileValidation: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
      functionStatus: false,
      isATOZ: true,
    };
    this.handleGetDepartmentGridData = this.handleGetDepartmentGridData.bind(
      this
    );
    this.handleGetBrandData = this.handleGetBrandData.bind(this);
    this.handleGetStoreCodeData = this.handleGetStoreCodeData.bind(this);
    this.handleAddDepartment = this.handleAddDepartment.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleAddFunction = this.handleAddFunction.bind(this);
    this.handleGetFunction = this.handleGetFunction.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetBrandData();
    this.handleGetDepartmentList();
    this.handleGetDepartmentGridData();
  }

  ////handle Brand change
  handleBrandChange = (data, e) => {
    if (e === null) {
      e = [];
      this.setState({ selectedBrand: e, StoreCode: [] });
    } else {
      this.setState({ selectedBrand: e });
      setTimeout(() => {
        if (this.state.selectedBrand) {
          this.handleGetStoreCodeData(data);
        }
      }, 1);
    }
  };

  /// handle Store code change
  handleStoreCodeChange = (e) => {
    if (e === null) {
      e = [];
      this.setState({ selectedStoreCode: e });
    } else {
      this.setState({ selectedStoreCode: e });
    }
  };
  ////handle status change drop-down
  handleStatusChange = (e) => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };
  ////handle detapartment onchange
  handleDepartmentChange = (value) => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({
        list1Value: value,
        functionData: [],
      });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetFunction("Add");
        }
      }, 1);
    } else {
      this.setState({ showList1: true });
    }
  };
  ////handle function change name
  handleFunctionOnChange = (value) => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ listFunction: value });
    } else {
      this.setState({ ShowFunction: true });
    }
  };
  handletoggleFunctionChange() {
    this.setState({ ShowFunction: true });
  }
  toggleEditModal() {
    this.setState({ editmodel: false });
  }
  ///Get data for department update
  hanldeEditDepartment(rowData) {
    debugger;
    var editDepartment = {};

    editDepartment.brandID = rowData.brandID;
    editDepartment.brandName = rowData.brandName;
    this.handleGetStoreCodeData(rowData.brandID);

    editDepartment.storeID = rowData.storeID;
    editDepartment.storeCode = rowData.storeCode;

    editDepartment.departmentID = rowData.departmentID;
    editDepartment.departmentName = rowData.departmentName;
    this.handleGetFunction(rowData.departmentID);

    editDepartment.functionID = rowData.functionID;
    editDepartment.functionName = rowData.functionName;

    editDepartment.status = rowData.status;

    this.setState({
      editmodel: true,
      editDepartment,
      departmentMapId: rowData.departmentBrandMappingID,
    });
  }
  //// handle Edit change data
  handleModalEditData = (e) => {
    debugger;

    var name = e.target.name;
    var value = e.target.value;
    var editDepartment = this.state.editDepartment;
    editDepartment[name] = value;
    this.setState({ editDepartment });

    if (name === "brandID") {
      this.handleGetStoreCodeData(value);
    } else if (name === "departmentID") {
      this.handleGetFunction(value);
    }
  };
  /// status open modal
  StatusOpenModel(data, header) {
    debugger;
    if (
      this.state.sortFilterBrandName.length === 0 ||
      this.state.sortFilterStoreCode.length === 0 ||
      this.state.sortFilterDepartName.length === 0 ||
      this.state.sortFilterFunction.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "brandName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sStoreCodeFilterCheckbox !== "" ||
        this.state.sDepartNameFilterCheckbox !== "" ||
        this.state.sFunctionFilterCheckbox !== "" ||
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
          sStoreCodeFilterCheckbox: "",
          sDepartNameFilterCheckbox: "",
          sFunctionFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "storeCode") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sDepartNameFilterCheckbox !== "" ||
        this.state.sFunctionFilterCheckbox !== "" ||
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
          sbrandNameFilterCheckbox: "",
          sDepartNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          sFunctionFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "departmentName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sStoreCodeFilterCheckbox !== "" ||
        this.state.sFunctionFilterCheckbox !== "" ||
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
          sbrandNameFilterCheckbox: "",
          sStoreCodeFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          sFunctionFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "functionName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sStoreCodeFilterCheckbox !== "" ||
        this.state.sDepartNameFilterCheckbox !== "" ||
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
          sbrandNameFilterCheckbox: "",
          sStoreCodeFilterCheckbox: "",
          sDepartNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sStoreCodeFilterCheckbox !== "" ||
        this.state.sDepartNameFilterCheckbox !== "" ||
        this.state.sFunctionFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          sStoreCodeFilterCheckbox: "",
          sDepartNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          sFunctionFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "status") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sStoreCodeFilterCheckbox !== "" ||
        this.state.sDepartNameFilterCheckbox !== "" ||
        this.state.sFunctionFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          sStoreCodeFilterCheckbox: "",
          sDepartNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          sFunctionFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }

  /// status close modal
  StatusCloseModel = (e) => {
    if (this.state.tempDepartment.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        departmentGrid: this.state.tempDepartment,
      });
      if (this.state.sortColumn === "brandName") {
        if (this.state.sbrandNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sstatusFilterCheckbox: "",
            sStoreCodeFilterCheckbox: "",
            sFunctionFilterCheckbox: "",
            sDepartNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "storeCode") {
        if (this.state.sStoreCodeFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sstatusFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sFunctionFilterCheckbox: "",
            sDepartNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "departmentName") {
        if (this.state.sDepartNameFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            sStoreCodeFilterCheckbox: "",
            sstatusFilterCheckbox: "",
            sFunctionFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "functionName") {
        if (this.state.sFunctionFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            sStoreCodeFilterCheckbox: "",
            sDepartNameFilterCheckbox: "",
            sstatusFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            sstatusFilterCheckbox: "",
            sStoreCodeFilterCheckbox: "",
            sFunctionFilterCheckbox: "",
            sDepartNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "status") {
        if (this.state.sstatusFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            sStoreCodeFilterCheckbox: "",
            sFunctionFilterCheckbox: "",
            sDepartNameFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        departmentGrid: this.state.sortAllData,
      });
    }
  };

  /// set sorting status
  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sbrandNameFilterCheckbox = this.state.sbrandNameFilterCheckbox;
    var sStoreCodeFilterCheckbox = this.state.sStoreCodeFilterCheckbox;
    var sDepartNameFilterCheckbox = this.state.sDepartNameFilterCheckbox;
    var sFunctionFilterCheckbox = this.state.sFunctionFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sstatusFilterCheckbox = this.state.sstatusFilterCheckbox;

    if (column === "brandName" || column === "all") {
      if (type === "value" && type !== "All") {
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all", "");
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all,", "");
        if (sbrandNameFilterCheckbox.includes(e.currentTarget.value)) {
          sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sbrandNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sbrandNameFilterCheckbox.includes("all")) {
          sbrandNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "brandName") {
            for (let i = 0; i < this.state.sortBrandName.length; i++) {
              sbrandNameFilterCheckbox +=
                this.state.sortBrandName[i].brandName + ",";
            }
            sbrandNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "storeCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sStoreCodeFilterCheckbox = sStoreCodeFilterCheckbox.replace("all", "");
        sStoreCodeFilterCheckbox = sStoreCodeFilterCheckbox.replace("all,", "");
        if (sStoreCodeFilterCheckbox.includes(e.currentTarget.value)) {
          sStoreCodeFilterCheckbox = sStoreCodeFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sStoreCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sStoreCodeFilterCheckbox.includes("all")) {
          sStoreCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeCode") {
            for (let i = 0; i < this.state.sortStoreCode.length; i++) {
              sStoreCodeFilterCheckbox +=
                this.state.sortStoreCode[i].storeCode + ",";
            }
            sStoreCodeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "departmentName" || column === "all") {
      if (type === "value" && type !== "All") {
        sDepartNameFilterCheckbox = sDepartNameFilterCheckbox.replace(
          "all",
          ""
        );
        sDepartNameFilterCheckbox = sDepartNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sDepartNameFilterCheckbox.includes(e.currentTarget.value)) {
          sDepartNameFilterCheckbox = sDepartNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sDepartNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sDepartNameFilterCheckbox.includes("all")) {
          sDepartNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "departmentName") {
            for (let i = 0; i < this.state.sortDepartName.length; i++) {
              sDepartNameFilterCheckbox +=
                this.state.sortDepartName[i].departmentName + ",";
            }
            sDepartNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "functionName" || column === "all") {
      if (type === "value" && type !== "All") {
        sFunctionFilterCheckbox = sFunctionFilterCheckbox.replace("all", "");
        sFunctionFilterCheckbox = sFunctionFilterCheckbox.replace("all,", "");
        if (sFunctionFilterCheckbox.includes(e.currentTarget.value)) {
          sFunctionFilterCheckbox = sFunctionFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sFunctionFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sFunctionFilterCheckbox.includes("all")) {
          sFunctionFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "functionName") {
            for (let i = 0; i < this.state.sortFunction.length; i++) {
              sFunctionFilterCheckbox +=
                this.state.sortFunction[i].functionName + ",";
            }
            sFunctionFilterCheckbox += "all";
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
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
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
            for (let i = 0; i < this.state.sortCreated.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreated[i].createdBy + ",";
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
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
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
      sbrandNameFilterCheckbox,
      sStoreCodeFilterCheckbox,
      sDepartNameFilterCheckbox,
      sFunctionFilterCheckbox,
      sstatusFilterCheckbox,
      screatedByFilterCheckbox,
      brandColor: "",
      storeCodeColor: "",
      DepartNameColor: "",
      FunctionColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "brandName") {
      var sItems = sbrandNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.brandName === sItems[i]
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
        brandColor: "sort-column",
      });
    } else if (column === "storeCode") {
      var sCode = sStoreCodeFilterCheckbox.split(",");
      if (sCode.length > 0) {
        for (let i = 0; i < sCode.length; i++) {
          if (sCode[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeCode === sCode[i]
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
        storeCodeColor: "sort-column",
      });
    } else if (column === "departmentName") {
      var sDepat = sDepartNameFilterCheckbox.split(",");
      if (sDepat.length > 0) {
        for (let i = 0; i < sDepat.length; i++) {
          if (sDepat[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.departmentName === sDepat[i]
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
        DepartNameColor: "sort-column",
      });
    } else if (column === "functionName") {
      var sfunct = sFunctionFilterCheckbox.split(",");
      if (sfunct.length > 0) {
        for (let i = 0; i < sfunct.length; i++) {
          if (sfunct[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.functionName === sfunct[i]
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
        FunctionColor: "sort-column",
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
      tempDepartment: itemsArray,
    });
  };
  /// filter text change
  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "brandName") {
      var sortFilterBrandName = matchSorter(
        this.state.sortBrandName,
        e.target.value,
        { keys: ["brandName"] }
      );
      if (sortFilterBrandName.length > 0) {
        this.setState({ sortFilterBrandName });
      } else {
        this.setState({
          sortFilterBrandName: this.state.sortBrandName,
        });
      }
    }
    if (this.state.sortColumn === "storeCode") {
      var sortFilterStoreCode = matchSorter(
        this.state.sortStoreCode,
        e.target.value,
        { keys: ["storeCode"] }
      );
      if (sortFilterStoreCode.length > 0) {
        this.setState({ sortFilterStoreCode });
      } else {
        this.setState({
          sortFilterStoreCode: this.state.sortStoreCode,
        });
      }
    }
    if (this.state.sortColumn === "departmentName") {
      var sortFilterDepartName = matchSorter(
        this.state.sortDepartName,
        e.target.value,
        { keys: ["departmentName"] }
      );
      if (sortFilterDepartName.length > 0) {
        this.setState({ sortFilterDepartName });
      } else {
        this.setState({
          sortFilterDepartName: this.state.sortDepartName,
        });
      }
    }
    if (this.state.sortColumn === "functionName") {
      var sortFilterFunction = matchSorter(
        this.state.sortFunction,
        e.target.value,
        { keys: ["functionName"] }
      );
      if (sortFilterFunction.length > 0) {
        this.setState({ sortFilterFunction });
      } else {
        this.setState({
          sortFilterFunction: this.state.sortFunction,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreated,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: this.state.sortCreated,
        });
      }
    }
    if (this.state.sortColumn === "status") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["status"] }
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
  /// sort status by A to Z
  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.departmentGrid;

    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return -1;
        if (a.brandName > b.brandName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return -1;
        if (a.storeCode > b.storeCode) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return -1;
        if (a.departmentName > b.departmentName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "functionName") {
      itemsArray.sort((a, b) => {
        if (a.functionName < b.functionName) return -1;
        if (a.functionName > b.functionName) return 1;
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
      departmentGrid: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  /// sort status by Z to A
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.departmentGrid;

    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return 1;
        if (a.brandName > b.brandName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return 1;
        if (a.storeCode > b.storeCode) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return 1;
        if (a.departmentName > b.departmentName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "functionName") {
      itemsArray.sort((a, b) => {
        if (a.functionName < b.functionName) return 1;
        if (a.functionName > b.functionName) return -1;
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
      departmentGrid: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  // --------------------------API---------------------------------
  ////Get Detapartment grid data
  handleGetDepartmentGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/GetDeparmentBrandMappingList",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentGrid: data });
        } else {
          self.setState({ departmentGrid: [] });
        }
        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].brandName]) {
              distinct.push(data[i].brandName);
              unique[data[i].brandName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortBrandName.push({ brandName: distinct[i] });
            self.state.sortFilterBrandName.push({ brandName: distinct[i] });
          }

          var uniqueSC = [];
          var distinctSC = [];
          for (let i = 0; i < data.length; i++) {
            if (!uniqueSC[data[i].storeCode]) {
              distinctSC.push(data[i].storeCode);
              uniqueSC[data[i].storeCode] = 1;
            }
          }
          for (let i = 0; i < distinctSC.length; i++) {
            self.state.sortStoreCode.push({ storeCode: distinctSC[i] });
            self.state.sortFilterStoreCode.push({ storeCode: distinctSC[i] });
          }

          var uniqueDn = [];
          var distinctDn = [];
          for (let i = 0; i < data.length; i++) {
            if (!uniqueDn[data[i].departmentName]) {
              distinctDn.push(data[i].departmentName);
              uniqueDn[data[i].departmentName] = 1;
            }
          }
          for (let i = 0; i < distinctDn.length; i++) {
            self.state.sortDepartName.push({ departmentName: distinctDn[i] });
            self.state.sortFilterDepartName.push({
              departmentName: distinctDn[i],
            });
          }

          var uniqueFn = [];
          var distinctFn = [];
          for (let i = 0; i < data.length; i++) {
            if (!uniqueFn[data[i].functionName]) {
              distinctFn.push(data[i].functionName);
              uniqueFn[data[i].functionName] = 1;
            }
          }
          for (let i = 0; i < distinctFn.length; i++) {
            self.state.sortFunction.push({ functionName: distinctFn[i] });
            self.state.sortFilterFunction.push({
              functionName: distinctFn[i],
            });
          }

          var unique1 = [];
          var distinct1 = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique1[data[i].createdBy]) {
              distinct1.push(data[i].createdBy);
              unique1[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct1.length; i++) {
            self.state.sortCreated.push({ createdBy: distinct1[i] });
            self.state.sortFilterCreatedBy.push({ createdBy: distinct1[i] });
          }

          var unique2 = [];
          var distinct2 = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique2[data[i].status]) {
              distinct2.push(data[i].status);
              unique2[data[i].status] = 1;
            }
          }
          for (let i = 0; i < distinct2.length; i++) {
            self.state.sortStatus.push({ status: distinct2[i] });
            self.state.sortFilterStatus.push({ status: distinct2[i] });
          }
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  ////get Brand data for dropdown
  handleGetBrandData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Brand data for dropdown
  handleGetStoreCodeData(data) {
    debugger;
    let self = this;
    var finalBrandId = "";
    var brand_Ids = "";
    if (data === "add") {
      if (this.state.selectedBrand !== null) {
        for (let i = 0; i < this.state.selectedBrand.length; i++) {
          finalBrandId += this.state.selectedBrand[i].brandID + ",";
          var brand_Ids = finalBrandId.substring(",", finalBrandId.length - 1);
        }
      }
    } else {
      brand_Ids = data;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/GetStoreCodeByBrandID",
      headers: authHeader(),
      params: {
        BrandIDs: brand_Ids,
      },
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ StoreCode: data });
        } else {
          self.setState({ StoreCode: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Department data for dropdown
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then((res) => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentData: data });
        } else {
          self.setState({ departmentData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  ///hanlde Add new Department
  handleAddDepartment(value) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/AddStoreDepartment",
      headers: authHeader(),
      params: {
        DepartmentName: value,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Department added successfully.");
          self.setState({
            department_Id: data,
          });
          self.handleGetDepartmentList();
        } else {
          NotificationManager.error("Department not added.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////handle Get function by Department Id
  handleGetFunction(check) {
    debugger;
    let self = this;
    var finalDepartmentId = 0;
    if (check === "Add") {
      finalDepartmentId = this.state.list1Value;
    } else {
      finalDepartmentId = parseInt(check);
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: finalDepartmentId,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ functionData: data });
        } else {
          self.setState({ functionData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////handle add function base on Department Id
  handleAddFunction(value) {
    debugger;
    let self = this;
    var finalId = 0;
    if (this.state.department_Id === 0) {
      finalId = this.state.list1Value;
    } else {
      finalId = this.state.department_Id;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/AddStoreFunction",
      headers: authHeader(),
      params: {
        DepartmentID: finalId,
        FunctionName: value,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Function added successfully.");
          self.handleGetFunction("Add");
          self.setState({
            function_Id: data,
            functionStatus: false,
          });
        } else {
          NotificationManager.error("Function not added.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle create Department
  handleCreateDepartment() {
    debugger;
    let self = this;
    if (
      this.state.selectedBrand !== null &&
      this.state.selectedStoreCode !== null &&
      (this.state.list1Value > 0 || this.state.list1Value !== "") &&
      (this.state.listFunction > 0 || this.state.listFunction !== "") &&
      this.state.selectStatus.length > 0
    ) {
      var activeStatus = 0;
      var departmentData = 0;
      var functionData = 0;
      var brandIds = "";
      var storeIds = "";
      //// multi Brand Ids
      if (this.state.selectedBrand !== null) {
        for (let i = 0; i < this.state.selectedBrand.length; i++) {
          brandIds += this.state.selectedBrand[i].brandID + ",";
        }
      }
      /// multi Store Ids
      if (this.state.selectedStoreCode !== null) {
        for (let i = 0; i < this.state.selectedStoreCode.length; i++) {
          storeIds += this.state.selectedStoreCode[i].storeID + ",";
        }
      }
      if (isNaN(this.state.list1Value)) {
        departmentData = this.state.department_Id;
      } else {
        departmentData = this.state.list1Value;
      }

      // functionData = this.state.listFunction;
      functionData = this.state.functionData.filter(
        (x) => x.funcationName === this.state.listFunction
      )[0].functionID;

      if (this.state.selectStatus === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }

      axios({
        method: "post",
        url: config.apiUrl + "/StoreDepartment/CreateDepartment",
        headers: authHeader(),
        data: {
          BrandID: brandIds,
          StoreID: storeIds,
          DepartmentID: departmentData,
          FunctionID: functionData,
          Status: activeStatus,
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetDepartmentGridData();
            NotificationManager.success("Department added successfully.");
            self.setState({
              selectedBrand: [],
              selectedStoreCode: [],
              list1Value: "",
              listFunction: "",
              selectStatus: 0,
              brandCompulsory: "",
              storeCodeCompulsory: "",
              departmentCompulsory: "",
              functionCompulsory: "",
              statusCompulsory: "",
              functionStatus: false,
            });
          } else if (status === "Record Already Exists") {
            NotificationManager.error("Record Already Exists.");
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        brandCompulsory: "Please Select Brand",
        storeCodeCompulsory: "Please Select Store Code",
        departmentCompulsory: "Please Selet Department",
        functionCompulsory: "Please Select Function",
        statusCompulsory: "Please Select Status",
      });
    }
  }
  //// handle update department
  handleUpdateDepartment() {
    debugger;
    let self = this;
    var activeStatus = 0;
    if (this.state.editDepartment.status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    this.setState({ editSaveLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/UpdateBrandDepartmentMapping",
      headers: authHeader(),
      data: {
        DepartmentBrandID: this.state.departmentMapId,
        BrandID: this.state.editDepartment.brandID,
        StoreID: this.state.editDepartment.storeID,
        DepartmentID: parseInt(this.state.editDepartment.departmentID),
        FunctionID: parseInt(this.state.editDepartment.functionID),
        Status: activeStatus,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetDepartmentGridData();
          NotificationManager.success("Department updated successfully.");
          self.toggleEditModal();
          self.setState({
            editSaveLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  //// delete Department by DepartmentId
  handleDeleteDepartmentData(department_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/DeleteBrandDepartmentMapping",
      headers: authHeader(),
      params: {
        DepartmentBrandMappingID: department_Id,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetDepartmentGridData();
          NotificationManager.success("Department deleted successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSearchFunctionData(data) {
    debugger;
    if (this.state.department_Id > 0 || this.state.list1Value > 0) {
      let self = this;
      if (data.length > 2) {
        var departmentId = 0;

        if (isNaN(this.state.list1Value)) {
          departmentId = this.state.department_Id;
        } else {
          departmentId = this.state.list1Value;
        }

        axios({
          method: "post",
          url:
            config.apiUrl + "/StoreDepartment/searchFunctionNameByDepartmentId",
          headers: authHeader(),
          params: {
            DepartmentId: departmentId,
            SearchText: data,
          },
        })
          .then(function(res) {
            debugger;
            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
              self.setState({
                functionData: data,
              });
            } else {
              self.setState({
                functionData: [],
                functionStatus: true,
              });
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    } else {
      NotificationManager.error("Please Select Department.");
    }
  }
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
        url: config.apiUrl + "/StoreDepartment/BulkUploadDepartment",
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
            self.handleGetDepartmentGridData();
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

  render() {
    const departmentList = this.state.departmentData.map((item, i) => (
      <Option key={i} value={item.departmentID}>
        {item.departmentName}
      </Option>
    ));
    // const functionList = this.state.functionData.map((item, j) => (
    //   <Option key={j} value={item.functionID}>
    //     {item.funcationName}
    //   </Option>
    // ));

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
            Department Master
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
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
                          this.state.sbrandNameFilterCheckbox.includes("all") ||
                          this.state.sStoreCodeFilterCheckbox.includes("all") ||
                          this.state.sDepartNameFilterCheckbox.includes(
                            "all"
                          ) ||
                          this.state.sFunctionFilterCheckbox.includes("all") ||
                          this.state.screatedByFilterCheckbox.includes("all") ||
                          this.state.sstatusFilterCheckbox.includes("all")
                        }
                        onChange={this.setSortCheckStatus.bind(this, "all")}
                      />
                      <label htmlFor={"fil-open"}>
                        <span className="table-btn table-blue-btn">ALL</span>
                      </label>
                    </div>
                    {this.state.sortColumn === "brandName"
                      ? this.state.sortFilterBrandName !== null &&
                        this.state.sortFilterBrandName.map((item, i) => (
                          <div className="filter-checkbox" key={i}>
                            <input
                              type="checkbox"
                              name={item.brandName}
                              id={"fil-open" + item.brandName}
                              value={item.brandName}
                              checked={this.state.sbrandNameFilterCheckbox.includes(
                                item.brandName
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "brandName",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.brandName}>
                              <span className="table-btn table-blue-btn">
                                {item.brandName}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "storeCode"
                      ? this.state.sortFilterStoreCode !== null &&
                        this.state.sortFilterStoreCode.map((item, p) => (
                          <div className="filter-checkbox" key={p}>
                            <input
                              type="checkbox"
                              name={item.storeCode}
                              id={"fil-open" + item.storeCode}
                              value={item.storeCode}
                              checked={this.state.sStoreCodeFilterCheckbox.includes(
                                item.storeCode
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "storeCode",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.storeCode}>
                              <span className="table-btn table-blue-btn">
                                {item.storeCode}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "departmentName"
                      ? this.state.sortFilterDepartName !== null &&
                        this.state.sortFilterDepartName.map((item, d) => (
                          <div className="filter-checkbox" key={d}>
                            <input
                              type="checkbox"
                              name={item.departmentName}
                              id={"fil-open" + item.departmentName}
                              value={item.departmentName}
                              checked={this.state.sDepartNameFilterCheckbox.includes(
                                item.departmentName
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "departmentName",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.departmentName}>
                              <span className="table-btn table-blue-btn">
                                {item.departmentName}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "functionName"
                      ? this.state.sortFilterFunction !== null &&
                        this.state.sortFilterFunction.map((item, f) => (
                          <div className="filter-checkbox" key={f}>
                            <input
                              type="checkbox"
                              name={item.functionName}
                              id={"fil-open" + item.functionName}
                              value={item.functionName}
                              checked={this.state.sFunctionFilterCheckbox.includes(
                                item.functionName
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "functionName",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.functionName}>
                              <span className="table-btn table-blue-btn">
                                {item.functionName}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "createdBy"
                      ? this.state.sortFilterCreatedBy !== null &&
                        this.state.sortFilterCreatedBy.map((item, p) => (
                          <div className="filter-checkbox" key={p}>
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

                    {this.state.sortColumn === "status"
                      ? this.state.sortFilterStatus !== null &&
                        this.state.sortFilterStatus.map((item, j) => (
                          <div className="filter-checkbox" key={j}>
                            <input
                              type="checkbox"
                              name={item.status}
                              id={"fil-open" + item.status}
                              value={item.status}
                              checked={this.state.sstatusFilterCheckbox.includes(
                                item.status
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "status"
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
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height deptMaster setting-table-des">
                  <ReactTable
                    data={this.state.departmentGrid}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.brandColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "brandName",
                              "Brand Name"
                            )}
                          >
                            Brand Name{" "}
                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Brand Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable:false,
                        accessor: "brandName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.storeCodeColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "storeCode",
                              "Store Code"
                            )}
                          >
                            Store Code
                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Store Code"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable:false,
                        accessor: "storeCode",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.DepartNameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "departmentName",
                              "Department Name"
                            )}
                          >
                            Department Name
                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Department Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable:false,
                        accessor: "departmentName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.FunctionColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "functionName",
                              "Function"
                            )}
                          >
                            Function
                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Function"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable:false,
                        accessor: "functionName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdBy",
                              "Created By"
                            )}
                          >
                            Created By
                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Created By"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable:false,
                        accessor: "createdBy",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
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
                        sortable:false,
                        accessor: "status",
                      },
                      {
                        Header: <span>Actions</span>,
                        accessor: "actiondept",
                        sortable:false,
                        Cell: (row) => {
                          var ids = row.original["departmentBrandMappingID"];
                          return (
                            <div>
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
                                          onClick={this.DeleteBulkUploadFile}
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
                                  src={DeleteIcon}
                                  alt="del-icon"
                                  className="downloadaction"
                                  style={{ marginRight: "5px" }}
                                />
                              </Popover>
                              <button
                                className="react-tabel-button ReNewBtn"
                                type="button"
                                onClick={this.hanldeEditDepartment.bind(
                                  this,
                                  row.original
                                )}
                              >
                                EDIT
                              </button>
                            </div>
                          );
                        },
                      },
                    ]}
                    minRows={2}
                    defaultPageSize={10}
                    showPagination={true}
                  />
                  {/* <div className="position-relative">
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
                <div className="right-sect-div right-sect-collapse">
                  <h3>CREATE DEPARTMENT</h3>
                  <div className="div-cntr">
                    <label>Brand</label>
                    <Select
                      getOptionLabel={(option) => option.brandName}
                      getOptionValue={(option) => option.brandID}
                      options={this.state.brandData}
                      placeholder="Select"
                      // menuIsOpen={true}
                      closeMenuOnSelect={false}
                      name="selectedBrand"
                      onChange={this.handleBrandChange.bind(this, "add")}
                      value={this.state.selectedBrand}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.selectedBrand.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.brandCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="div-cntr">
                    <label>Store Code</label>
                    <Select
                      getOptionLabel={(option) => option.storeCode}
                      getOptionValue={(option) => option.storeID}
                      options={this.state.StoreCode}
                      placeholder="Select"
                      // menuIsOpen={true}
                      closeMenuOnSelect={false}
                      name="selectedStoreCode"
                      onChange={this.handleStoreCodeChange.bind(this)}
                      value={this.state.selectedStoreCode}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.selectedStoreCode.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.storeCodeCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="div-cntr">
                    <label>Department</label>
                    <Aselect
                      showSearch={true}
                      value={this.state.list1Value}
                      style={{ width: "100%" }}
                      onChange={this.handleDepartmentChange}
                    >
                      {departmentList}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Aselect>
                    {this.state.list1Value === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.departmentCompulsory}
                      </p>
                    )}

                    <SweetAlert
                      show={this.state.showList1}
                      style={{ width: "320px" }}
                      title="Add New Department"
                      text="Enter new Department"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Department Name"
                      animation="slide-from-top"
                      validationMsg="Please enter a department!"
                      onConfirm={(inputValue) => {
                        debugger;
                        inputValue = inputValue.trim();
                        if (inputValue.length >= 0 && inputValue.length <= 50) {
                          if (inputValue !== "") {
                            this.setState({
                              showList1: false,
                              list1Value: inputValue,
                            });
                            this.handleAddDepartment(inputValue);
                          } else {
                            this.setState({
                              showList1: false,
                              list1Value: inputValue,
                            });
                          }
                        }
                      }}
                      onCancel={() => {
                        this.setState({ showList1: false });
                      }}
                      onEscapeKey={() => this.setState({ showList1: false })}
                      onOutsideClick={() => this.setState({ showList1: false })}
                    />
                  </div>
                  <div className="div-cntr">
                    <label>Function</label>

                    <Aselect
                      showSearch={true}
                      value={this.state.listFunction}
                      style={{ width: "100%" }}
                      onChange={this.handleFunctionOnChange}
                      onSearch={this.handleSearchFunctionData.bind(this)}
                      notFoundContent="No Data Found"
                    >
                      {/* {functionList} */}
                      {this.state.functionData !== null &&
                        this.state.functionData.map((item, j) => (
                          <Option key={j} value={item.funcationName}>
                            {item.funcationName}
                          </Option>
                        ))}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Aselect>
                    {this.state.functionStatus === true ? (
                      <span
                        className="sweetAlert-inCategory"
                        style={{ marginTop: "-53px" }}
                        onClick={this.handletoggleFunctionChange.bind(this)}
                      >
                        + ADD NEW
                      </span>
                    ) : null}
                    {this.state.listFunction === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.functionCompulsory}
                      </p>
                    )}
                    <SweetAlert
                      show={this.state.ShowFunction}
                      style={{ width: "320px" }}
                      title="Add New Function"
                      text="Enter new Function"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Function"
                      animation="slide-from-top"
                      validationMsg="Please Enter Function!"
                      onConfirm={(inputValue) => {
                        inputValue = inputValue.trim();
                        if (inputValue !== "") {
                          this.setState({
                            ShowFunction: false,
                            listFunction: inputValue,
                          });
                          this.handleAddFunction(inputValue);
                        } else {
                          this.setState({
                            ShowFunction: false,
                            listFunction: inputValue,
                          });
                        }
                      }}
                      onCancel={() => {
                        this.setState({ ShowFunction: false });
                      }}
                      onEscapeKey={() => this.setState({ ShowFunction: false })}
                      onOutsideClick={() =>
                        this.setState({ ShowFunction: false })
                      }
                    />
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select
                      name="selectStatus"
                      value={this.state.selectStatus}
                      onChange={this.handleStatusChange}
                    >
                      <option>Select</option>
                      {this.state.activeData !== null &&
                        this.state.activeData.map((item, j) => (
                          <option key={j} value={item.ActiveID}>
                            {item.ActiveName}
                          </option>
                        ))}
                    </select>
                    {this.state.selectStatus === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.statusCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="btn-coll">
                    <button
                      className="butn"
                      onClick={this.handleCreateDepartment.bind(this)}
                    >
                      ADD
                    </button>
                  </div>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <CSVLink
                        filename={"Department.csv"}
                        data={config.departmentTemplate}
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
                          <span className={"fileupload-span"}>Add File</span> or
                          Drop File here
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
                                  <button className="butn">Delete</button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                        <div>
                          <span className="file-size">122.6kb</span>
                        </div>
                      </div>
                      {this.state.isErrorBulkUpload ? (
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
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
                              <ProgressBar className="file-progress" now={60} />
                              <div className="cancel-upload">
                                <img src={UploadCancel} alt="upload cancel" />
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
              <Modal
                open={this.state.editmodel}
                onClose={this.toggleEditModal}
                modalId="storeEditModal"
              >
                <div className="edtpadding">
                  <label className="popover-header-text">Edit Department</label>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Brand</label>
                    <select
                      className="store-create-select"
                      name="brandID"
                      value={this.state.editDepartment.brandID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.brandData !== null &&
                        this.state.brandData.map((item, i) => (
                          <option
                            key={i}
                            value={item.brandID}
                            className="select-category-placeholder"
                          >
                            {item.brandName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.brandID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editBrandCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Store Code</label>
                    <select
                      className="store-create-select"
                      name="storeID"
                      value={this.state.editDepartment.storeID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.StoreCode !== null &&
                        this.state.StoreCode.map((item, j) => (
                          <option
                            key={j}
                            value={item.storeID}
                            className="select-category-placeholder"
                          >
                            {item.storeName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.storeID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStoreCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Department</label>
                    <select
                      className="store-create-select"
                      name="departmentID"
                      value={this.state.editDepartment.departmentID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.departmentData !== null &&
                        this.state.departmentData.map((item, j) => (
                          <option
                            key={j}
                            value={item.departmentID}
                            className="select-category-placeholder"
                          >
                            {item.departmentName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.departmentID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editDepartmentCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Function</label>
                    <select
                      className="store-create-select"
                      name="functionID"
                      value={this.state.editDepartment.functionID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.functionData !== null &&
                        this.state.functionData.map((item, j) => (
                          <option
                            key={j}
                            value={item.functionID}
                            className="select-category-placeholder"
                          >
                            {item.funcationName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.functionID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editFunctionCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Status</label>
                    <select
                      className="store-create-select"
                      name="status"
                      value={
                        this.state.editDepartment.status === "Active"
                          ? "Active"
                          : "Inactive"
                      }
                      onChange={this.handleModalEditData}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">InActive</option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <a
                      className="pop-over-cancle"
                      onClick={this.toggleEditModal}
                    >
                      CANCEL
                    </a>
                    <button
                      className="pop-over-button"
                      type="button"
                      onClick={this.handleUpdateDepartment.bind(this)}
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
              </Modal>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DepartmentMaster;
