import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from "./../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Select as Aselect } from "antd";
import Select from "react-select";
import SweetAlert from "react-bootstrap-sweetalert";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import DownExcel from "./../../../assets/Images/csv.png";
import ReactTable from "react-table";
import {
  // NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import axios from "axios";
import ActiveStatus from "../../activeStatus";
import { CSVLink } from "react-csv";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import * as translationHI from './../../../translations/hindi';
import * as translationMA from './../../../translations/marathi';
import Dropzone from "react-dropzone";
const { Option } = Aselect;
const NEW_ITEM = "NEW_ITEM";


class ClaimCategoryMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      catmulti: false,
      activeData: ActiveStatus(),
      list1Value: "",
      inputValue: "",
      showList1: false,
      editshowList1: false,
      ListOfSubCate: "",
      ListOfIssue: "",
      ShowSubCate: false,
      editShowSubCate: false,
      ShowIssuetype: false,
      editShowIssuetype: false,
      loading: false,
      categoryGridData: [],
      brandData: [],
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
      selectStatus: 0,
      category_Id: 0,
      subCategory_Id: 0,
      issueType_Id: 0,
      selectetedParameters: {},
      brandCompulsion: "",
      categoryCompulsion: "",
      subcategoryCompulsion: "",
      issueCompulsion: "",
      statusCompulsion: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortBrandName: [],
      sortCategory: [],
      sortSubCategory: [],
      sortIssueType: [],
      sortStatus: [],
      editmodel: false,
      editCategory: {},
      brandColor: "",
      categoryColor: "",
      subCategoryColor: "",
      issueColor: "",
      statusColor: "",
      sortHeader: "",
      brandCatmapId: 0,
      editBrandCompulsory: "",
      editCategoryCompulsory: "",
      editSubCatCompulsory: "",
      editIssueCompulsory: "",
      editStatusCompulsory: "",
      tempcategoryGridData: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFilterBrandName: [],
      sortFilterCategory: [],
      sortFilterSubCategory: [],
      sortFilterIssueType: [],
      sortFilterStatus: [],
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      sbrandNameFilterCheckbox: "",
      scategoryNameFilterCheckbox: "",
      ssubCategoryNameFilterCheckbox: "",
      sissueTypeNameFilterCheckbox: "",
      sstatusNameFilterCheckbox: "",
      isATOZ: true,
      selectBrandMulti: [],
      showAddCategory: false,
      showAddSubCategory: false,
      showAddIssueType: false,
      showEditAddCategory: false,
      showEditAddSubCategory: false,
      showEditAddIssue: false,
      translateLanguage: {}
    };
    this.handleGetCategoryGridData = this.handleGetCategoryGridData.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddSubCategory = this.handleAddSubCategory.bind(this);
    this.handleAddIssueType = this.handleAddIssueType.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetCategoryGridData();
    this.handleGetBrandList();
    if(window.localStorage.getItem("translateLanguage") === "hindi"){
      this.state.translateLanguage = translationHI
     }
     else if(window.localStorage.getItem("translateLanguage") === 'marathi'){
       this.state.translateLanguage = translationMA
     }
     else{
       this.state.translateLanguage = {}
     }

  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.categoryGridData;
    var headerName = "";

    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return 1;
        if (a.brandName > b.brandName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return 1;
        if (a.categoryName > b.categoryName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "subCategoryName") {
      itemsArray.sort((a, b) => {
        if (a.subCategoryName < b.subCategoryName) return 1;
        if (a.subCategoryName > b.subCategoryName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "issueTypeName") {
      itemsArray.sort((a, b) => {
        if (a.issueTypeName < b.issueTypeName) return 1;
        if (a.issueTypeName > b.issueTypeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "statusName") {
      itemsArray.sort((a, b) => {
        if (a.statusName < b.statusName) return 1;
        if (a.statusName > b.statusName) return -1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      isATOZ: false,
      categoryGridData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.categoryGridData;

    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return -1;
        if (a.brandName > b.brandName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return -1;
        if (a.categoryName > b.categoryName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "subCategoryName") {
      itemsArray.sort((a, b) => {
        if (a.subCategoryName < b.subCategoryName) return -1;
        if (a.subCategoryName > b.subCategoryName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "issueTypeName") {
      itemsArray.sort((a, b) => {
        if (a.issueTypeName < b.issueTypeName) return -1;
        if (a.issueTypeName > b.issueTypeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "statusName") {
      itemsArray.sort((a, b) => {
        if (a.statusName < b.statusName) return -1;
        if (a.statusName > b.statusName) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: true,
      categoryGridData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterBrandName.length === 0 ||
      this.state.sortFilterCategory.length === 0 ||
      this.state.sortFilterSubCategory.length === 0 ||
      this.state.sortFilterIssueType.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "brandName") {
      if (
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.ssubCategoryNameFilterCheckbox !== "" ||
        this.state.sissueTypeNameFilterCheckbox !== "" ||
        this.state.sstatusNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryNameFilterCheckbox: "",
          ssubCategoryNameFilterCheckbox: "",
          sissueTypeNameFilterCheckbox: "",
          sstatusNameFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "categoryName") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.ssubCategoryNameFilterCheckbox !== "" ||
        this.state.sissueTypeNameFilterCheckbox !== "" ||
        this.state.sstatusNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          ssubCategoryNameFilterCheckbox: "",
          sissueTypeNameFilterCheckbox: "",
          sstatusNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "subCategoryName") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.sissueTypeNameFilterCheckbox !== "" ||
        this.state.sstatusNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          scategoryNameFilterCheckbox: "",
          sissueTypeNameFilterCheckbox: "",
          sstatusNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "issueTypeName") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.ssubCategoryNameFilterCheckbox !== "" ||
        this.state.scategoryNameFilterCheckbox !== "" ||
        this.state.sstatusNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstatusNameFilterCheckbox: "",
          scategoryNameFilterCheckbox: "",
          ssubCategoryNameFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "statusName") {
      if (
        this.state.sissueTypeNameFilterCheckbox !== "" ||
        this.state.ssubCategoryNameFilterCheckbox !== "" ||
        this.state.scategoryNameFilterCheckbox !== "" ||
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
          scategoryNameFilterCheckbox: "",
          ssubCategoryNameFilterCheckbox: "",
          sissueTypeNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    this.setState({
      sortFilterBrandName: this.state.sortBrandName,
      sortFilterCategory: this.state.sortCategory,
      sortFilterSubCategory: this.state.sortSubCategory,
      sortFilterIssueType: this.state.sortIssueType,
      sortFilterStatus: this.state.sortStatus,
    });
    if (this.state.tempcategoryGridData.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        categoryGridData: this.state.tempcategoryGridData,
        sFilterCheckbox: "",
      });
      if (this.state.sortColumn === "brandName") {
        if (this.state.sbrandNameFilterCheckbox === "") {
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
            ssubCategoryNameFilterCheckbox: "",
            sissueTypeNameFilterCheckbox: "",
            sstatusNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "categoryName") {
        if (this.state.scategoryNameFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            ssubCategoryNameFilterCheckbox: "",
            sissueTypeNameFilterCheckbox: "",
            sstatusNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "subCategoryName") {
        if (this.state.ssubCategoryNameFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            scategoryNameFilterCheckbox: "",
            sissueTypeNameFilterCheckbox: "",
            sstatusNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "issueTypeName") {
        if (this.state.sissueTypeNameFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            scategoryNameFilterCheckbox: "",
            ssubCategoryNameFilterCheckbox: "",
            sstatusNameFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "statusName") {
        if (this.state.sstatusNameFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            scategoryNameFilterCheckbox: "",
            ssubCategoryNameFilterCheckbox: "",
            sissueTypeNameFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        categoryGridData: this.state.sortAllData,
        sFilterCheckbox: "",
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sbrandNameFilterCheckbox = this.state.sbrandNameFilterCheckbox;
    var scategoryNameFilterCheckbox = this.state.scategoryNameFilterCheckbox;
    var ssubCategoryNameFilterCheckbox = this.state
      .ssubCategoryNameFilterCheckbox;
    var sissueTypeNameFilterCheckbox = this.state.sissueTypeNameFilterCheckbox;
    var sstatusNameFilterCheckbox = this.state.sstatusNameFilterCheckbox;

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
    if (column === "categoryName" || column === "all") {
      if (type === "value" && type !== "All") {
        scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
          "all",
          ""
        );
        scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scategoryNameFilterCheckbox.includes(e.currentTarget.value)) {
          scategoryNameFilterCheckbox = scategoryNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          scategoryNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryNameFilterCheckbox.includes("all")) {
          scategoryNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "categoryName") {
            for (let i = 0; i < this.state.sortCategory.length; i++) {
              scategoryNameFilterCheckbox +=
                this.state.sortCategory[i].categoryName + ",";
            }
            scategoryNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "subCategoryName" || column === "all") {
      if (type === "value" && type !== "All") {
        ssubCategoryNameFilterCheckbox = ssubCategoryNameFilterCheckbox.replace(
          "all",
          ""
        );
        ssubCategoryNameFilterCheckbox = ssubCategoryNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (ssubCategoryNameFilterCheckbox.includes(e.currentTarget.value)) {
          ssubCategoryNameFilterCheckbox = ssubCategoryNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          ssubCategoryNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (ssubCategoryNameFilterCheckbox.includes("all")) {
          ssubCategoryNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "subCategoryName") {
            for (let i = 0; i < this.state.sortSubCategory.length; i++) {
              ssubCategoryNameFilterCheckbox +=
                this.state.sortSubCategory[i].subCategoryName + ",";
            }
            ssubCategoryNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "issueTypeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sissueTypeNameFilterCheckbox = sissueTypeNameFilterCheckbox.replace(
          "all",
          ""
        );
        sissueTypeNameFilterCheckbox = sissueTypeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sissueTypeNameFilterCheckbox.includes(e.currentTarget.value)) {
          sissueTypeNameFilterCheckbox = sissueTypeNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sissueTypeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sissueTypeNameFilterCheckbox.includes("all")) {
          sissueTypeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "issueTypeName") {
            for (let i = 0; i < this.state.sortIssueType.length; i++) {
              sissueTypeNameFilterCheckbox +=
                this.state.sortIssueType[i].issueTypeName + ",";
            }
            sissueTypeNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "statusName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstatusNameFilterCheckbox = sstatusNameFilterCheckbox.replace(
          "all",
          ""
        );
        sstatusNameFilterCheckbox = sstatusNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sstatusNameFilterCheckbox.includes(e.currentTarget.value)) {
          sstatusNameFilterCheckbox = sstatusNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sstatusNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstatusNameFilterCheckbox.includes("all")) {
          sstatusNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "statusName") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sstatusNameFilterCheckbox +=
                this.state.sortStatus[i].statusName + ",";
            }
            sstatusNameFilterCheckbox += "all";
          }
        }
      }
    }
    var allData = this.state.sortAllData;
    this.setState({
      brandColor: "",
      categoryColor: "",
      subCategoryColor: "",
      issueColor: "",
      statusColor: "",
      sbrandNameFilterCheckbox,
      scategoryNameFilterCheckbox,
      ssubCategoryNameFilterCheckbox,
      sissueTypeNameFilterCheckbox,
      sstatusNameFilterCheckbox,
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
    } else if (column === "categoryName") {
      var sItems = scategoryNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.categoryName === sItems[i]
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
        categoryColor: "sort-column",
      });
    } else if (column === "subCategoryName") {
      var sItems = ssubCategoryNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.subCategoryName === sItems[i]
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
        subCategoryColor: "sort-column",
      });
    } else if (column === "issueTypeName") {
      var sItems = sissueTypeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.issueTypeName === sItems[i]
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
    } else if (column === "statusName") {
      var sItems = sstatusNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.statusName === sItems[i]
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
      tempcategoryGridData: itemsArray,
    });
    // this.StatusCloseModel();
  };
  handleGetCategoryGridData() {
    debugger;
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;

        var data = res.data;

        if (data !== null) {
          var unique = [];
          var distinct = [];
          var sortBrandName = [];
          var sortFilterBrandName = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].brandName]) {
              distinct.push(data[i].brandName);
              unique[data[i].brandName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortBrandName.push({ brandName: distinct[i] });
              sortFilterBrandName.push({ brandName: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          var sortCategory = [];
          var sortFilterCategory = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].categoryName]) {
              distinct.push(data[i].categoryName);
              unique[data[i].categoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortCategory.push({ categoryName: distinct[i] });
              sortFilterCategory.push({ categoryName: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          var sortSubCategory = [];
          var sortFilterSubCategory = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].subCategoryName]) {
              distinct.push(data[i].subCategoryName);
              unique[data[i].subCategoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortSubCategory.push({ subCategoryName: distinct[i] });
              sortFilterSubCategory.push({
                subCategoryName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortIssueType = [];
          var sortFilterIssueType = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].issueTypeName]) {
              distinct.push(data[i].issueTypeName);
              unique[data[i].issueTypeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortIssueType.push({ issueTypeName: distinct[i] });
              sortFilterIssueType.push({
                issueTypeName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortStatus = [];
          var sortFilterStatus = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].statusName]) {
              distinct.push(data[i].statusName);
              unique[data[i].statusName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortFilterStatus.push({ statusName: distinct[i] });
              sortStatus.push({ statusName: distinct[i] });
            }
          }
          self.setState({
            sortFilterCategory,
            sortFilterSubCategory,
            sortFilterIssueType,
            sortFilterStatus,
            sortFilterBrandName,
            sortBrandName,
            sortSubCategory,
            sortIssueType,
            sortStatus,
            sortCategory,
            sortAllData: data,
          });
        }

        if (data.length > 0) {
          self.setState({
            categoryGridData: data,
            loading: false,
          });
        } else {
          self.setState({
            categoryGridData: [],
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetCategoryList(data, check) {
    debugger;
    if (data.length > 2) {
      let self = this;
      var categoryText = "";
      if (check === "edit") {
        categoryText = data;
      } else {
        categoryText = data;
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Category/GetClaimCategoryBySearch",
        headers: authHeader(),
        params: {
          CategoryName: categoryText,
        },
      })
        .then(function(res) {
          debugger;
          let msg = res.data.message;
          let data = res.data.responseData;
          if (msg === "Success") {
            self.setState({ categoryDropData: data });
          } else {
            if (check === "edit") {
              self.setState({
                categoryDropData: [],
                showEditAddCategory: true,
              });
            } else {
              self.setState({ categoryDropData: [], showAddCategory: true });
            }
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({ categoryDropData: [] });
    }
  }

  handleSearchSubCategoryList(data, check) {
    debugger;
    if (this.state.categoryDropData.length > 0) {
      if (data.length > 2) {
        let self = this;
        var categoryId = 0;
        if (check === "edit") {
          categoryId = this.state.categoryDropData.filter(
            (x) => x.categoryName === this.state.editCategory.categoryName
          )[0].categoryID;
        } else {
          categoryId = this.state.categoryDropData.filter(
            (x) => x.categoryName === this.state.list1Value
          )[0].categoryID;
        }

        axios({
          method: "post",
          url:
            config.apiUrl + "/Category/GetClaimSubCategoryByCategoryOnSearch",
          headers: authHeader(),
          params: {
            CategoryID: categoryId,
            searchText: data,
          },
        })
          .then(function(res) {
            debugger;
            let msg = res.data.message;
            let data = res.data.responseData;
            if (msg === "Success") {
              self.setState({ SubCategoryDropData: data });
            } else {
              if (check === "edit") {
                self.setState({
                  SubCategoryDropData: [],
                  showEditAddSubCategory: true,
                });
              } else {
                self.setState({
                  SubCategoryDropData: [],
                  showAddSubCategory: true,
                });
              }
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    } else {
      NotificationManager.error("Please Select Claim Category.");
    }
  }

  handleSearchIssueTypeList(data, check) {
    debugger;
    if (this.state.SubCategoryDropData.length > 0) {
      if (data.length > 2) {
        let self = this;
        var SubCategoryId = 0;
        if (check === "edit") {
          SubCategoryId = this.state.SubCategoryDropData.filter(
            (x) => x.subCategoryName === this.state.editCategory.subCategoryName
          )[0].subCategoryID;
        } else {
          SubCategoryId = this.state.SubCategoryDropData.filter(
            (x) => x.subCategoryName === this.state.ListOfSubCate
          )[0].subCategoryID;
        }

        axios({
          method: "post",
          url: config.apiUrl + "/Category/GetClaimIssueTypeOnSearch",
          headers: authHeader(),
          params: {
            SubCategoryID: SubCategoryId,
            searchText: data,
          },
        })
          .then(function(res) {
            debugger;
            let msg = res.data.message;
            let data = res.data.responseData;
            if (msg === "Success") {
              self.setState({ ListOfIssueData: data });
            } else {
              if (check === "edit") {
                self.setState({
                  showEditAddIssue: true,
                });
              } else {
                self.setState({
                  showAddIssueType: true,
                });
              }
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    } else {
      NotificationManager.error("Please Select Claim Sub Category.");
    }
  }

  handleGetSubCategoryList = async (id) => {
    debugger;
    let self = this;
    var Category_Id = "";
    if (id === "edit") {
      if (this.state.categoryDropData.length > 0) {
        Category_Id = this.state.categoryDropData.filter(
          (x) => x.categoryName === this.state.editCategory.categoryName
        )[0].categoryID;
      } else {
        Category_Id = this.state.editCategory.categoryID;
      }
    } else {
      Category_Id = this.state.categoryDropData.filter(
        (x) => x.categoryName === this.state.list1Value
      )[0].categoryID;
    }
    await axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: Category_Id,
      },
    })
      .then(function(res) {
        debugger;
        let data = res.data.responseData;
        self.setState({ SubCategoryDropData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetIssueTypeList(id) {
    debugger;
    let self = this;
    var SubCat_Id = 0;
    if (id === "edit") {
      if (this.state.SubCategoryDropData.length > 0) {
        SubCat_Id = this.state.SubCategoryDropData.filter(
          (x) => x.subCategoryName === this.state.editCategory.subCategoryName
        )[0].subCategoryID;
      } else {
        SubCat_Id = this.state.editCategory.subCategoryID;
      }
    } else {
      SubCat_Id = this.state.SubCategoryDropData.filter(
        (x) => x.subCategoryName === this.state.ListOfSubCate
      )[0].subCategoryID;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: SubCat_Id,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ListOfIssueData: data });
        } else {
          self.setState({ ListOfIssueData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDeleteCategoryData(category_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/DeleteClaimCategory",
      headers: authHeader(),
      params: {
        CategoryID: category_Id,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetCategoryGridData();
          NotificationManager.success("Category deleted successfully.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAddCategory(value, check) {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/AddClaimCategory",
      headers: authHeader(),
      params: {
        CategoryName: value,
        BrandID: 0,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Category added successfully.");
          if (check == "edit") {
            var editCategory = self.state.editCategory;
            editCategory["categoryID"] = data;
            editCategory["categoryName"] = value;
            editCategory["subCategoryID"] = "";
            editCategory["subCategoryName"] = "";
            editCategory["issueTypeID"] = "";
            editCategory["issueTypeName"] = "";
            self.setState({
              editCategory,
              ListOfIssueData: [],
              SubCategoryDropData: [],
              editCategoryCompulsory: "",
              showEditAddCategory: false,
            });
            self.handleGetCategoryList(value, "edit");
          } else {
            self.setState({
              category_Id: data,
              showAddCategory: false,
              ListOfSubCate: "",
              SubCategoryDropData: [],
              ListOfIssue: "",
              ListOfIssueData: [],
            });
            self.handleGetCategoryList(value);
          }
        } else {
          NotificationManager.error("Category not added.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleAddSubCategory(value, check) {
    debugger;
    let self = this;
    var finalId = 0;
    if (check === "edit") {
      finalId = this.state.categoryDropData.filter(
        (x) => x.categoryName === this.state.editCategory.categoryName
      )[0].categoryID;
    } else {
      finalId = this.state.categoryDropData.filter(
        (x) => x.categoryName === this.state.list1Value
      )[0].categoryID;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Category/AddClaimSubCategory",
      headers: authHeader(),
      params: {
        CategoryID: finalId,
        SubcategoryName: value,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (check === "edit") {
            var editCategory = self.state.editCategory;
            editCategory["subCategoryID"] = data;
            editCategory["subCategoryName"] = value;
            editCategory["issueTypeID"] = "";
            editCategory["issueTypeName"] = "";

            self.setState({
              ListOfIssueData: [],
              editCategory,
              editSubCatCompulsory: "",
              showEditAddSubCategory: false,
            });

            self.handleGetSubCategoryList("edit");
          } else {
            self.setState({
              subCategory_Id: data,
              showAddSubCategory: false,
              ListOfIssue: "",
              ListOfIssueData: [],
            });
            self.handleGetSubCategoryList();
          }
          NotificationManager.success("SubCategory added successfully.");
        } else {
          NotificationManager.error("SubCategory not added.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAddIssueType(value, type) {
    debugger;
    let self = this;
    var finalId = 0;

    if (type === "edit") {
      if (this.state.SubCategoryDropData.length > 0) {
        finalId = this.state.SubCategoryDropData.filter(
          (x) => x.subCategoryName === this.state.editCategory.subCategoryName
        )[0].subCategoryID;
      } else {
        finalId = this.state.editCategory.subCategoryID;
      }
    } else {
      finalId = this.state.SubCategoryDropData.filter(
        (x) => x.subCategoryName === this.state.ListOfSubCate
      )[0].subCategoryID;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Category/AddClaimIssueType",
      headers: authHeader(),
      params: {
        SubcategoryID: finalId,
        IssuetypeName: value,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Issue Type added successfully.");
          if (type == "edit") {
            var editCategory = self.state.editCategory;
            editCategory["issueTypeID"] = data;
            self.setState({
              editCategory,
              editIssueCompulsory: "",
              showEditAddIssue: false,
            });
            self.handleGetIssueTypeList("edit");
          } else {
            self.setState({
              issueType_Id: data,
              showAddIssueType: false,
            });
            self.handleGetIssueTypeList();
          }
        } else {
          NotificationManager.error("Issue Type not added.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSubmitData() {
    debugger;
    if (
      this.state.selectBrandMulti.length > 0 &&
      (this.state.list1Value > 0 || this.state.list1Value !== "") &&
      (this.state.ListOfSubCate > 0 || this.state.ListOfSubCate !== "") &&
      (this.state.ListOfIssue > 0 || this.state.ListOfIssue !== "") &&
      (this.state.selectStatus !== "0" && this.state.selectStatus !== 0)
    ) {
      debugger;
      let self = this;
      var activeStatus = 0;
      var categorydata = 0;
      var subCategoryData = 0;
      var IssueData = 0;
      var brandIds = "";
      var status = this.state.selectStatus;
      if (status === "Active") {
        activeStatus = true;
      } else {
        activeStatus = false;
      }

      if (this.state.selectBrandMulti !== null) {
        for (let i = 0; i < this.state.selectBrandMulti.length; i++) {
          brandIds += this.state.selectBrandMulti[i].brandID + ",";
        }
      }

      categorydata = this.state.categoryDropData.filter(
        (x) => x.categoryName === this.state.list1Value
      )[0].categoryID;

      subCategoryData = this.state.SubCategoryDropData.filter(
        (x) => x.subCategoryName === this.state.ListOfSubCate
      )[0].subCategoryID;

      IssueData = this.state.ListOfIssueData.filter(
        (x) => x.issueTypeName === this.state.ListOfIssue
      )[0].issueTypeID;

      axios({
        method: "post",
        url: config.apiUrl + "/Category/CreateClaimCategorybrandmapping",
        headers: authHeader(),
        data: {
          BraindID: brandIds.substring(",", brandIds.length - 1),
          CategoryID: categorydata,
          SubCategoryID: subCategoryData,
          IssueTypeID: IssueData,
          Status: activeStatus,
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetCategoryGridData();
            NotificationManager.success("Category added successfully.");
            self.setState({
              selectBrandMulti: [],
              categoryDropData: [],
              SubCategoryDropData: [],
              ListOfIssueData: [],
              list1Value: "",
              ListOfSubCate: "",
              ListOfIssue: "",
              selectStatus: 0,
              brandCompulsion: "",
              categoryCompulsion: "",
              subcategoryCompulsion: "",
              issueCompulsion: "",
              statusCompulsion: "",
              showAddCategory: false,
              showAddIssueType: false,
              showAddSubCategory: false,
            });
          } else if (status === "Record Already Exists ") {
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
        brandCompulsion: "Please Select Brand",
        categoryCompulsion: "Please Select category",
        subcategoryCompulsion: "Please Select SubCategory",
        issueCompulsion: "Please Select IssueType",
        statusCompulsion: "Please Select Status",
      });
    }
  }

  // Update category
  handleUpdateCategory() {
    debugger;
    let self = this;
    if (
      this.state.editCategory.brandID !== "0" &&
      (this.state.editCategory.categoryID.length > 0 ||
        this.state.editCategory.categoryID !== "") &&
      (this.state.editCategory.subCategoryID.length > 0 ||
        this.state.editCategory.subCategoryID !== "") &&
      (this.state.editCategory.issueTypeID.length > 0 ||
        this.state.editCategory.issueTypeID !== "")
    ) {
      var activeStatus = 0;
      var categorydata = 0;
      var subCategoryData = 0;
      var IssueData = 0;

      if (this.state.editCategory.statusName === "Active") {
        activeStatus = true;
      } else {
        activeStatus = false;
      }

      if (this.state.categoryDropData.length > 0) {
        if (isNaN(this.state.editCategory.categoryName)) {
          categorydata = this.state.categoryDropData.filter(
            (x) => x.categoryName === this.state.editCategory.categoryName
          )[0].categoryID;
        } else {
          categorydata = this.state.editCategory.categoryID;
        }
      } else {
        categorydata = this.state.editCategory.categoryID;
      }

      if (this.state.SubCategoryDropData.length > 0) {
        if (isNaN(this.state.editCategory.subCategoryName)) {
          subCategoryData = this.state.SubCategoryDropData.filter(
            (x) => x.subCategoryName === this.state.editCategory.subCategoryName
          )[0].subCategoryID;
        } else {
          subCategoryData = this.state.editCategory.subCategoryID;
        }
      } else {
        subCategoryData = this.state.editCategory.subCategoryID;
      }

      if (this.state.ListOfIssueData.length > 0) {
        if (isNaN(this.state.editCategory.issueTypeName)) {
          IssueData = this.state.ListOfIssueData.filter(
            (x) => x.issueTypeName === this.state.editCategory.issueTypeName
          )[0].issueTypeID;
        } else {
          IssueData = this.state.editCategory.issueTypeID;
        }
      } else {
        IssueData = this.state.editCategory.issueTypeID;
      }

      this.setState({ editSaveLoading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Category/CreateClaimCategorybrandmapping",
        headers: authHeader(),
        data: {
          BrandCategoryMappingID: this.state.editCategory
            .brandCategoryMappingID,
          BraindID: this.state.editCategory.brandID,
          CategoryID: categorydata,
          SubCategoryID: subCategoryData,
          IssueTypeID: IssueData,
          Status: activeStatus,
          Deleteflag: 0,
        },
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetCategoryGridData();
            NotificationManager.success("Category updated successfully.");
            self.setState({
              list1Value: "",
              ListOfSubCate: "",
              ListOfIssue: "",
              selectStatus: 0,
              categoryDropData: [],
              SubCategoryDropData: [],
              ListOfIssueData: [],
              editBrandCompulsory: "",
              editCategoryCompulsory: "",
              editSubCatCompulsory: "",
              editIssueCompulsory: "",
              editStatusCompulsory: "",
              editmodel: false,
              editSaveLoading: false,
            });
          } else if (status === "Record Already Exists ") {
            self.setState({ editmodel: false, editSaveLoading: false });
            NotificationManager.error("Record Already Exists.");
          } else {
            NotificationManager.error(status);
            self.setState({ editmodel: false, editSaveLoading: false });
          }
        })
        .catch((data) => {
          self.setState({ editmodel: false, editSaveLoading: false });
          console.log(data);
        });
    } else {
      if (
        this.state.editCategory.brandID === null ||
        this.state.editCategory.brandID === "0"
      ) {
        self.setState({
          editBrandCompulsory: "Please Select Brand.",
        });
      }

      if (
        this.state.editCategory.categoryID === "" ||
        this.state.editCategory.categoryID === undefined
      ) {
        self.setState({
          editCategoryCompulsory: "Please Select Category.",
        });
      }

      if (
        this.state.editCategory.subCategoryID === "" ||
        this.state.editCategory.subCategoryID === undefined
      ) {
        self.setState({
          editSubCatCompulsory: "Please Select SubCategory.",
        });
      }

      if (
        this.state.editCategory.issueTypeID === "" ||
        this.state.editCategory.issueTypeID === undefined
      ) {
        self.setState({
          editIssueCompulsory: "Please Select Issue type.",
        });
      }
    }
  }

  HandleMultiSelect() {
    this.setState({ catmulti: true });
  }
  fileUpload = (e) => {
    debugger;
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
  handleCategoryChange = (value) => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({
        list1Value: value,
        SubCategoryDropData: [],
        ListOfSubCate: "",
        ListOfIssue: "",
        ListOfIssueData: [],
      });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetSubCategoryList(value);
        }
      }, 10);
    } else {
      this.setState({ showList1: true });
    }
  };

  handleSubCatOnChange = (value) => {
    debugger;
    if (this.state.list1Value > 0 || this.state.list1Value !== "") {
      if (value !== NEW_ITEM) {
        this.setState({
          ListOfSubCate: value,
          ListOfIssueData: [],
          ListOfIssue: "",
        });
        setTimeout(() => {
          if (this.state.ListOfSubCate) {
            this.handleGetIssueTypeList();
          }
        }, 1);
      } else {
        this.setState({ ShowSubCate: true });
      }
    } else {
      this.setState({
        categoryCompulsion: "Please Select category",
      });
    }
  };

  handleIssueOnChange = (value) => {
    debugger;
    if (
      (this.state.list1Value > 0 || this.state.list1Value !== "") &&
      (this.state.ListOfSubCate > 0 || this.state.ListOfSubCate !== "")
    ) {
      if (value !== NEW_ITEM) {
        this.setState({ ListOfIssue: value });
      } else {
        this.setState({ ShowIssuetype: true });
      }
    } else {
      this.setState({
        categoryCompulsion: "Please Select category",
        subcategoryCompulsion: "Please Select SubCategory",
      });
    }
  };
  handleBrandChange = (e) => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ selectBrandMulti: e });
    } else {
      this.setState({ selectBrandMulti: e });
    }
  };
  handleEditDropDownChange = (e) => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ name: value });
  };
  ////handle status change drop-down
  handleStatusChange = (e) => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };

  ////handle table row edit button click to set value in modal
  hanldeEditCategory(rowData) {
    debugger;
    var editCategory = {};
    editCategory.brandCategoryMappingID = rowData.brandCategoryMappingID;
    editCategory.brandID = rowData.braindID;
    editCategory.brandName = rowData.brandName;

    editCategory.categoryID = rowData.categoryID;
    editCategory.categoryName = rowData.categoryName;

    setTimeout(() => {
      this.handleModalCategoryChange(rowData.categoryID, rowData.categoryName);
    }, 10);
    editCategory.subCategoryID = rowData.subCategoryID;
    editCategory.subCategoryName = rowData.subCategoryName;
    setTimeout(() => {
      this.handleModalSubCatOnChange(
        rowData.subCategoryID,
        rowData.subCategoryName
      );
    }, 10);

    editCategory.issueTypeID = rowData.issueTypeID;
    editCategory.issueTypeName = rowData.issueTypeName;
    setTimeout(() => {
      this.handleModalIssueOnChange(rowData.issueTypeID, rowData.issueTypeName);
    }, 10);

    editCategory.statusName = rowData.statusName;
    var Id = rowData.brandCategoryMappingID;

    setTimeout(() => {
      this.setState({
        editmodel: true,
        editCategory,
        brandCatmapId: Id,
        editBrandCompulsory: "",
      });
    }, 10);
  }
  ////handle toggle edit modal pop
  toggleEditModal() {
    this.setState({
      editmodel: false,
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
    });
  }
  ////handle modal pop brand change
  handleModalBrandChange = (e) => {
    debugger;
    let value = e.target.value;
    var editCategory = this.state.editCategory;
    if (value === "0") {
      editCategory[e.target.name] = value;
      this.setState({
        editBrandCompulsory: "Please Select Brand.",
        editCategory,
      });
    } else {
      editCategory[e.target.name] = value;
      this.setState({
        editCategory,
        editBrandCompulsory: "",
      });
    }
  };
  ////handle edit modal pop category change
  handleModalCategoryChange = (value, categoryName) => {
    debugger;
    if (value !== NEW_ITEM) {
      var editCategory = this.state.editCategory;
      if (this.state.categoryDropData.length > 0) {
        categoryName = this.state.categoryDropData.filter(
          (x) => x.categoryName === value
        )[0].categoryName;
      }
      editCategory["categoryID"] = value;
      editCategory["categoryName"] = categoryName;
      editCategory["subCategoryID"] = "";
      editCategory["subCategoryName"] = "";
      editCategory["issueTypeID"] = "";
      editCategory["issueTypeName"] = "";

      this.setState({
        editCategory,
        editCategoryCompulsory: "",
        SubCategoryDropData: [],
        ListOfIssueData: [],
      });
      setTimeout(() => {
        if (value) {
          this.handleGetSubCategoryList("edit");
          this.handleGetCategoryList(categoryName, "edit");
        }
      }, 100);
    } else {
      this.setState({ editshowList1: true });
    }
  };
  ////handle edit modal pop sub category change
  handleModalSubCatOnChange = async (value, subCatName) => {
    debugger;
    if (value !== NEW_ITEM) {
      var editCategory = this.state.editCategory;
      if (this.state.SubCategoryDropData.length > 0) {
        subCatName = this.state.SubCategoryDropData.filter(
          (x) => x.subCategoryName === value
        )[0].subCategoryName;
      }

      editCategory["subCategoryID"] = value;
      editCategory["subCategoryName"] = subCatName;

      editCategory["issueTypeID"] = "";
      editCategory["issueTypeName"] = "";
      this.setState({
        editCategory,
        ListOfIssueData: [],
        editSubCatCompulsory: "",
      });

      setTimeout(() => {
        if (value) {
          this.handleGetIssueTypeList("edit");
        }
      }, 100);
    } else {
      this.setState({ editShowSubCate: true });
    }
  };
  ////handle modal issue type change
  handleModalIssueOnChange = (value, issueTypeName) => {
    debugger;
    if (value !== NEW_ITEM) {
      var editCategory = this.state.editCategory;
      if (this.state.ListOfIssueData.length > 0) {
        issueTypeName = this.state.ListOfIssueData.filter(
          (x) => x.issueTypeName === value
        )[0].issueTypeName;
      }
      editCategory["issueTypeID"] = value;
      editCategory["issueTypeName"] = issueTypeName;
      this.setState({ editCategory, editIssueCompulsory: "" });
    } else {
      this.setState({ editShowIssuetype: true });
    }
  };
  ////handle model status change
  handleModalStatusChange = (e) => {
    debugger;
    const { name, value } = e.target;
    var editCategory = this.state.editCategory;
    editCategory[name] = value;
    this.setState({ editCategory });
  };

  ////handle filter modal pop in filter text box change value
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
          sortFilterBrandName: [],
        });
      }
    }
    if (this.state.sortColumn === "categoryName") {
      var sortFilterCategory = matchSorter(
        this.state.sortCategory,
        e.target.value,
        { keys: ["categoryName"] }
      );
      if (sortFilterCategory.length > 0) {
        this.setState({ sortFilterCategory });
      } else {
        this.setState({
          sortFilterCategory: [],
        });
      }
    }
    if (this.state.sortColumn === "subCategoryName") {
      var sortFilterSubCategory = matchSorter(
        this.state.sortSubCategory,
        e.target.value,
        { keys: ["subCategoryName"] }
      );
      if (sortFilterSubCategory.length > 0) {
        this.setState({ sortFilterSubCategory });
      } else {
        this.setState({
          sortFilterSubCategory: [],
        });
      }
    }
    if (this.state.sortColumn === "issueTypeName") {
      var sortFilterIssueType = matchSorter(
        this.state.sortIssueType,
        e.target.value,
        {
          keys: ["issueTypeName"],
        }
      );
      if (sortFilterIssueType.length > 0) {
        this.setState({ sortFilterIssueType });
      } else {
        this.setState({
          sortFilterIssueType: [],
        });
      }
    }
    if (this.state.sortColumn === "statusName") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        {
          keys: ["statusName"],
        }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: [],
        });
      }
    }
  }

  ////handle delete selected file of bulk upload
  handleDeleteBulkupload = (e) => {
    debugger;
    this.setState({
      fileN: [],
      fileName: "",
      fileSize: "",
      showProgress: false,
      isFileUploadFail: false,
    });
    NotificationManager.success("File deleted successfully.");
  };

  ////handle bulk upload
  hanldeAddBulkUpload() {
    debugger;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;

      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);
      // this.setState({ showProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Category/BulkUploadClaimCategory",
        headers: authHeader(),
        data: formData,
        // onUploadProgress: (ev = ProgressEvent) => {
        //   const progress = (ev.loaded / ev.total) * 100;
        //   this.updateUploadProgress(Math.round(progress));
        // }
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("File uploaded successfully.");
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              showProgress: false,
              isFileUploadFail: false,
            });
            self.handleGetCategoryGridData();
          } else {
            self.setState({
              showProgress: false,
              // isFileUploadFail: true,
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

  ////set progress value of file upload
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }

  handleClearSearch() {
    this.setState({
      sbrandNameFilterCheckbox: "",
      scategoryNameFilterCheckbox: "",
      ssubCategoryNameFilterCheckbox: "",
      sissueTypeNameFilterCheckbox: "",
      sstatusNameFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      categoryGridData: this.state.sortAllData,
      tempcategoryGridData: [],
    });
  }
  handleToggleCategoryAdd() {
    this.setState({ showList1: true });
  }
  handleToggleEditCategoryAdd() {
    this.setState({ editshowList1: true });
  }
  handleToggleEditSubCategoryAdd() {
    this.setState({ editShowSubCate: true });
  }
  handleToggleEditIssueAdd() {
    this.setState({ editShowIssuetype: true });
  }
  handleToggleSubCategoryAdd() {
    this.setState({ ShowSubCate: true });
  }
  handleToggleIssueTypeAdd() {
    this.setState({ ShowIssuetype: true });
  }
  handleGetEditCategoryList(data) {
    this.handleGetCategoryList(data, "edit");
  }
  handleSearchEditSubCategory(data) {
    this.handleSearchSubCategoryList(data, "edit");
  }
  handleSearchEditissueType(data) {
    this.handleSearchIssueTypeList(data, "edit");
  }
  render() {
    const { categoryGridData } = this.state;
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            
            {TranslationContext!==undefined?TranslationContext.link.setting:"Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            
            {TranslationContext!==undefined?TranslationContext.link.store:"Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            
            {TranslationContext!==undefined?TranslationContext.link.claimcategorymaster:"Claim Category Master"}

          </Link>
        </div>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
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

                  {TranslationContext!==undefined?TranslationContext.p.sortatoz:"SORT BY A TO Z"}
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

                  {TranslationContext!==undefined?TranslationContext.p.sortztoa:"SORT BY Z TO A"}
                  </p>
                </div>
              </div>
              <a
                style={{
                  margin: "0 25px",
                  textDecoration: "underline",
                  color: "#2561A8",
                  cursor: "pointer",
                }}
                onClick={this.handleClearSearch.bind(this)}
              >
                {TranslationContext!==undefined?TranslationContext.a.clearsearch:"clear search"}
                
              </a>
              <div className="filter-type">
                <p>

                {TranslationContext!==undefined?TranslationContext.p.filterbytype:"FILTER BY TYPE"}
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
                        this.state.sbrandNameFilterCheckbox.includes("all") ||
                        this.state.scategoryNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.ssubCategoryNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sissueTypeNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sstatusNameFilterCheckbox.includes("all")
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
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.brandName}
                            value={item.brandName}
                            checked={this.state.sbrandNameFilterCheckbox
                              .split(",")
                              .find((word) => word === item.brandName)||false}
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

                  {this.state.sortColumn === "categoryName"
                    ? this.state.sortFilterCategory !== null &&
                      this.state.sortFilterCategory.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.categoryName}
                            value={item.categoryName}
                            checked={this.state.scategoryNameFilterCheckbox
                              .split(",")
                              .find((word) => word === item.categoryName)||false}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "categoryName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.categoryName}>
                            <span className="table-btn table-blue-btn">
                              {item.categoryName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "subCategoryName"
                    ? this.state.sortFilterSubCategory !== null &&
                      this.state.sortFilterSubCategory.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.subCategoryName}
                            value={item.subCategoryName}
                            checked={this.state.ssubCategoryNameFilterCheckbox
                              .split(",")
                              .find((word) => word === item.subCategoryName)||false}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "subCategoryName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.subCategoryName}>
                            <span className="table-btn table-blue-btn">
                              {item.subCategoryName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "issueTypeName"
                    ? this.state.sortFilterIssueType !== null &&
                      this.state.sortFilterIssueType.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.issueTypeName}
                            value={item.issueTypeName}
                            checked={this.state.sissueTypeNameFilterCheckbox
                              .split(",")
                              .find((word) => word === item.issueTypeName)||false}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "issueTypeName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.issueTypeName}>
                            <span className="table-btn table-blue-btn">
                              {item.issueTypeName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "statusName"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.statusName}
                            value={item.statusName}
                            checked={this.state.sstatusNameFilterCheckbox
                              .split(",")
                              .find((word) => word === item.statusName)||false}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "statusName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.statusName}>
                            <span className="table-btn table-blue-btn">
                              {item.statusName}
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
                {this.state.loading === true ? (
                  <div className="loader-icon"></div>
                ) : (
                  <div className="table-cntr table-height TicketCategoyMasReact setting-table-des">
                    <ReactTable
                      data={categoryGridData}
                      columns={[
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Brand"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "brandName",
                                TranslationContext!==undefined?TranslationContext.span.brandname:"Brand Name"
                              )}
                            >
                            {TranslationContext!==undefined?TranslationContext.span.brandname:"Brand Name"}
                              
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Brand"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "brandName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Category"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "categoryName",
                                "Category"
                              )}
                            >
                              {TranslationContext!==undefined?TranslationContext.span.claimcategory:"Claim Category"}
                              
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "Category"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "categoryName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "SubCategory"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "subCategoryName",
                                TranslationContext!==undefined?TranslationContext.span.subcategory:"SubCategory"
                              )}
                            >
                              {TranslationContext!==undefined?TranslationContext.span.subcategory:"SubCategory"}
                              
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "SubCategory"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "subCategoryName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "IssueType"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "issueTypeName",
                                TranslationContext!==undefined?TranslationContext.span.claimissuetype:"Claim Issue Type"
                              )}
                            >
                              {TranslationContext!==undefined?TranslationContext.span.claimissuetype:"Claim Issue Type"}
                              
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ == false &&
                                  this.state.sortHeader === "IssueType"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "issueTypeName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Status"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "statusName",
                                TranslationContext!==undefined?TranslationContext.span.status:"Status"
                              )}
                            >
                              {TranslationContext!==undefined?TranslationContext.span.status:"Status"}
                              
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
                          accessor: "statusName",
                        },
                        {
                          Header: <span>
                            {TranslationContext!==undefined?TranslationContext.span.actions:"Actions"}
                          </span>,
                          accessor: "actiondept",
                          sortable: false,
                          Cell: (row) => {
                            var ids = row.original["brandCategoryMappingID"];
                            return (
                              <>
                                <span className="d-flex align-items-center">
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
                                          {TranslationContext!==undefined?TranslationContext.p.deletefile:"Delete file"}?
                                          </p>
                                          <p className="mt-1 fs-12">
                                          {TranslationContext!==undefined?TranslationContext.p.areyousureyouwanttodeletethisfile:"Are you sure you want to delete this file"}?
                                          
                                          </p>
                                          <div className="del-can">
                                            <a href={Demo.BLANK_LINK}>
                                            {TranslationContext!==undefined?TranslationContext.a.cancel:"CANCEL"}
                                          
                                            </a>
                                            <button
                                              className="butn"
                                              type="button"
                                              onClick={this.handleDeleteCategoryData.bind(
                                                this,
                                                ids
                                              )}
                                            >
                                               {TranslationContext!==undefined?TranslationContext.button.delete:"Delete"}
                                              
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
                                    />
                                  </Popover>

                                  <button
                                    className="react-tabel-button ReNewBtn"
                                    type="button"
                                    onClick={this.hanldeEditCategory.bind(
                                      this,
                                      row.original
                                    )}
                                  >
                                     {TranslationContext!==undefined?TranslationContext.button.edit:"EDIT"}
                                              
                                    
                                  </button>
                                </span>
                              </>
                            );
                          },
                        },
                      ]}
                      minRows={1}
                      resizable={false}
                      defaultPageSize={10}
                      showPagination={true}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace cus-cs">
                    <label className="Create-store-text">
                      
                      {TranslationContext!==undefined?TranslationContext.label.createclaimcategory:"CREATE CLAIM CATEGORY"}
                    </label>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                        {TranslationContext!==undefined?TranslationContext.label.brandname:"Brand Name"}
                        </label>
                        <Select
                          getOptionLabel={(option) => option.brandName}
                          getOptionValue={(option) => option.brandID}
                          options={this.state.brandData}
                          placeholder="Please Select Brand"
                          closeMenuOnSelect={false}
                          name="selectBrandMulti"
                          onChange={this.handleBrandChange.bind(this)}
                          value={this.state.selectBrandMulti}
                          isMulti
                        />

                        {this.state.selectBrandMulti.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="divSpace ClaimPlaceHolder">
                      <div className="dropDrownSpace">
                        <label className="reports-to reports-dis">
                          
                          {TranslationContext!==undefined?TranslationContext.label.claimcategory:"Claim Category"}
                        </label>
                        <Aselect
                          className="store-create-select showborder-select"
                          showSearch={true}
                          value={this.state.list1Value}
                          onChange={this.handleCategoryChange}
                          placeholder="Please select claim cateogry"
                          onSearch={this.handleGetCategoryList.bind(this)}
                          notFoundContent="No Data Found"
                        >
                          {this.state.categoryDropData !== null &&
                            this.state.categoryDropData.map((item, i) => (
                              <Option key={i} value={item.categoryName}>
                                {item.categoryName}
                              </Option>
                            ))}
                        </Aselect>
                        {this.state.showAddCategory ? (
                          <span
                            className="sweetAlert-inCategory"
                            style={{ marginTop: "-68px" }}
                            onClick={this.handleToggleCategoryAdd.bind(this)}
                          >
                            +{TranslationContext!==undefined?TranslationContext.span.addnew:"ADD NEW"} 
                          </span>
                        ) : null}
                        {this.state.list1Value === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.categoryCompulsion}
                          </p>
                        )}

                        <SweetAlert
                          show={this.state.showList1}
                          style={{ width: "320px" }}
                          title="Add New Category"
                          text="Enter new Category"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Category Name"
                          animation="slide-from-top"
                          validationMsg="Please enter a category!"
                          onConfirm={(inputValue) => {
                            debugger;
                            inputValue = inputValue.trim();
                            if (
                              inputValue.length >= 0 &&
                              inputValue.length <= 50
                            ) {
                              if (inputValue !== "") {
                                this.setState({
                                  showList1: false,
                                  list1Value: inputValue,
                                });
                                this.handleAddCategory(inputValue);
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
                          onEscapeKey={() =>
                            this.setState({ showList1: false })
                          }
                          onOutsideClick={() =>
                            this.setState({ showList1: false })
                          }
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to reports-dis">
                          
                          {TranslationContext!==undefined?TranslationContext.label.claimsubcategory:"Claim Sub Category"} 

                        </label>
                        <Aselect
                          showSearch={true}
                          value={this.state.ListOfSubCate}
                          style={{ width: "100%" }}
                          onChange={this.handleSubCatOnChange}
                          placeholder="Select Claim Sub Category"
                          onSearch={this.handleSearchSubCategoryList.bind(this)}
                          notFoundContent="No Data Found"
                        >
                          {this.state.SubCategoryDropData !== null &&
                            this.state.SubCategoryDropData.map((item, o) => (
                              <Option key={o} value={item.subCategoryName}>
                                {item.subCategoryName}
                              </Option>
                            ))}
                        </Aselect>
                        {this.state.showAddSubCategory ? (
                          <span
                            className="sweetAlert-inCategory"
                            style={{ marginTop: "-68px" }}
                            onClick={this.handleToggleSubCategoryAdd.bind(this)}
                          >
                            +{TranslationContext!==undefined?TranslationContext.span.addnew:"ADD NEW"}
                          </span>
                        ) : null}
                        {this.state.ListOfSubCate === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.subcategoryCompulsion}
                          </p>
                        )}

                        <SweetAlert
                          show={this.state.ShowSubCate}
                          style={{ width: "320px" }}
                          title="Add New Sub Category"
                          text="Enter new Category"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Category Name"
                          animation="slide-from-top"
                          validationMsg="Please enter a category!"
                          onConfirm={(inputValue) => {
                            debugger;
                            inputValue = inputValue.trim();
                            if (inputValue !== "") {
                              this.setState({
                                ShowSubCate: false,
                                ListOfSubCate: inputValue,
                              });
                              this.handleAddSubCategory(inputValue);
                            } else {
                              this.setState({
                                ShowSubCate: false,
                                ListOfSubCate: inputValue,
                              });
                            }
                          }}
                          onCancel={() => {
                            this.setState({ ShowSubCate: false });
                          }}
                          onEscapeKey={() =>
                            this.setState({ ShowSubCate: false })
                          }
                          onOutsideClick={() =>
                            this.setState({ ShowSubCate: false })
                          }
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                        {TranslationContext!==undefined?TranslationContext.label.claimissuetype:"Claim Issue Type"}
                        </label>
                        <Aselect
                          showSearch={true}
                          value={this.state.ListOfIssue}
                          style={{ width: "100%" }}
                          onChange={this.handleIssueOnChange}
                          placeholder="Select Claim Issue Type"
                          onSearch={this.handleSearchIssueTypeList.bind(this)}
                          notFoundContent="No Data Found"
                        >
                          {this.state.ListOfIssueData !== null &&
                            this.state.ListOfIssueData.map((item, i) => (
                              <Option key={i} value={item.issueTypeName}>
                                {item.issueTypeName}
                              </Option>
                            ))}
                        </Aselect>
                        {this.state.showAddIssueType ? (
                          <span
                            className="sweetAlert-inCategory"
                            style={{ marginTop: "-68px" }}
                            onClick={this.handleToggleIssueTypeAdd.bind(this)}
                          >
                            + {TranslationContext!==undefined?TranslationContext.span.addnew:"ADD NEW"}
                          </span>
                        ) : null}
                        {this.state.ListOfIssue === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.issueCompulsion}
                          </p>
                        )}
                        <SweetAlert
                          show={this.state.ShowIssuetype}
                          style={{ width: "320px" }}
                          title="Add New Issue type"
                          text="Enter new Issue Type"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Issue Type"
                          animation="slide-from-top"
                          validationMsg="Please Enter Issue Type!"
                          onConfirm={(inputValue) => {
                            inputValue = inputValue.trim();
                            if (inputValue !== "") {
                              this.setState({
                                ShowIssuetype: false,
                                ListOfIssue: inputValue,
                              });
                              this.handleAddIssueType(inputValue);
                            } else {
                              this.setState({
                                ShowIssuetype: false,
                                ListOfIssue: inputValue,
                              });
                            }
                          }}
                          onCancel={() => {
                            this.setState({ ShowIssuetype: false });
                          }}
                          onEscapeKey={() =>
                            this.setState({ ShowIssuetype: false })
                          }
                          onOutsideClick={() =>
                            this.setState({ ShowIssuetype: false })
                          }
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                        {TranslationContext!==undefined?TranslationContext.label.status:"Status"}
                        </label>
                        <select
                          className="form-control dropdown-setting"
                          value={this.state.selectStatus}
                          onChange={this.handleStatusChange}
                        >
                          <option value={0}>Select</option>
                          {this.state.activeData !== null &&
                            this.state.activeData.map((item, j) => (
                              <option key={j} value={item.ActiveID}>
                                {item.ActiveName}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectStatus) === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.statusCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                         {TranslationContext!==undefined?TranslationContext.button.add:"ADD"}
                        
                      </button>
                    </div>
                    <br />
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <h3 className="pb-0">
                      {TranslationContext!==undefined?TranslationContext.h3.bulkupload:"Bulk Upload"}
                      </h3>
                      <div className="down-excel">
                        <p>

                        {TranslationContext!==undefined?TranslationContext.p.template:"Template"}
                        </p>
                        <CSVLink
                          filename={"ClaimCategory.csv"}
                          data={config.claimCategoryTemplate}
                        >
                          <img src={DownExcel} alt="download icon" />
                        </CSVLink>
                      </div>
                    </div>
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
                            {TranslationContext!==undefined?TranslationContext.span.addfile:"Add File"}
                            </span>{" "}
                            {TranslationContext!==undefined?TranslationContext.div.or:"or"}   
                            {TranslationContext!==undefined?TranslationContext.div.dropfilehere:"Drop File here"}
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
                                  {TranslationContext!==undefined?TranslationContext.p.deletefile:"Delete file"}?
                                  </p>
                                  <p className="mt-1 fs-12">
                                  {TranslationContext!==undefined?TranslationContext.p.areyousureyouwanttodeletethisfile:"Are you sure you want to delete this file"}?
                                  
                                  </p>
                                  <div className="del-can">
                                    <a href={Demo.BLANK_LINK}>
                                    {TranslationContext!==undefined?TranslationContext.a.cancel:"CANCEL"}
                                    </a>
                                    <button
                                      className="butn"
                                      onClick={this.handleDeleteBulkupload}
                                    >
                                       {TranslationContext!==undefined?TranslationContext.button.delete:"Delete"}
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
                    <button
                      className="butn"
                      onClick={this.hanldeAddBulkUpload.bind(this)}
                    >
                       {TranslationContext!==undefined?TranslationContext.button.add:"ADD"}
                      
                    </button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            open={this.state.editmodel}
            onClose={this.toggleEditModal}
            modalId="categoryEditModal"
          >
            <div className="edtpadding cus-cs">
              <label className="popover-header-text">
              {TranslationContext!==undefined?TranslationContext.label.editclaimcategory:"EDIT CLAIM CATEGORY"}
              </label>
              <div className="pop-over-div">
                <label className="edit-label-1">
                {TranslationContext!==undefined?TranslationContext.label.brandname:"Brand Name"}
                </label>
                <select
                  className="store-create-select"
                  value={this.state.editCategory.brandID}
                  onChange={this.handleModalBrandChange}
                  name="brandID"
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
                {parseInt(this.state.editCategory.brandID) === 0 && (
                  <p style={{ color: "red", marginBottom: "21px" }}>
                    {this.state.editBrandCompulsory}
                  </p>
                )}
              </div>

              <div className="pop-over-div">
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="edit-label-1">
                    {TranslationContext!==undefined?TranslationContext.label.claimcategory:"Claim Category"}
                    </label>
                    <Aselect
                      showSearch={true}
                      value={this.state.editCategory.categoryName}
                      style={{ width: "100%" }}
                      onChange={this.handleModalCategoryChange}
                      onSearch={this.handleGetEditCategoryList.bind(this)}
                      notFoundContent="No Data Found"
                    >
                      {this.state.categoryDropData !== null &&
                        this.state.categoryDropData.map((item, o) => (
                          <Option key={o} value={item.categoryName}>
                            {item.categoryName}
                          </Option>
                        ))}
                    </Aselect>
                    {this.state.showEditAddCategory ? (
                      <span
                        className="sweetAlert-inCategory"
                        style={{ marginTop: "-68px" }}
                        onClick={this.handleToggleEditCategoryAdd.bind(this)}
                      >
                        + {TranslationContext!==undefined?TranslationContext.span.addnew:"ADD NEW"}
                      </span>
                    ) : null}
                    {this.state.editCategory.categoryName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editCategoryCompulsory}
                      </p>
                    )}

                    <SweetAlert
                      show={this.state.editshowList1}
                      style={{ width: "320px" }}
                      title="Add New Category"
                      text="Enter new Category"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Category Name"
                      animation="slide-from-top"
                      validationMsg="Please enter a category!"
                      onConfirm={(inputValue) => {
                        debugger;
                        inputValue = inputValue.trim();
                        if (inputValue !== "") {
                          this.state.editCategory["categoryName"] = inputValue;
                          this.setState({
                            editshowList1: false,
                            editCategory: this.state.editCategory,
                          });
                          this.handleAddCategory(inputValue, "edit");
                        } else {
                          this.setState({
                            editshowList1: false,
                            list1Value: inputValue,
                          });
                        }
                      }}
                      onCancel={() => {
                        this.setState({ editshowList1: false });
                      }}
                      onEscapeKey={() =>
                        this.setState({ editshowList1: false })
                      }
                      onOutsideClick={() =>
                        this.setState({ editshowList1: false })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="pop-over-div">
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="edit-label-1">
                    {TranslationContext!==undefined?TranslationContext.label.claimsubcategory:"Claim Sub Category"}
                    </label>
                    <Aselect
                      showSearch={true}
                      value={this.state.editCategory.subCategoryName}
                      style={{ width: "100%" }}
                      onChange={this.handleModalSubCatOnChange}
                      onSearch={this.handleSearchEditSubCategory.bind(this)}
                      notFoundContent="No Data Found"
                    >
                      {this.state.SubCategoryDropData !== null &&
                        this.state.SubCategoryDropData.map((item, o) => (
                          <Option key={o} value={item.subCategoryName}>
                            {item.subCategoryName}
                          </Option>
                        ))}
                    </Aselect>
                    {this.state.showEditAddSubCategory ? (
                      <span
                        className="sweetAlert-inCategory"
                        style={{ marginTop: "-68px" }}
                        onClick={this.handleToggleEditSubCategoryAdd.bind(this)}
                      >
                        + {TranslationContext!==undefined?TranslationContext.span.addnew:"ADD NEW"}
                      </span>
                    ) : null}
                    {this.state.editCategory.subCategoryName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editSubCatCompulsory}
                      </p>
                    )}

                    <SweetAlert
                      show={this.state.editShowSubCate}
                      style={{ width: "320px" }}
                      title="Add New Sub Category"
                      text="Enter new Category"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Category Name"
                      animation="slide-from-top"
                      validationMsg="Please enter a category!"
                      onConfirm={(inputValue) => {
                        debugger;
                        inputValue = inputValue.trim();
                        if (inputValue !== "") {
                          this.state.editCategory[
                            "subCategoryName"
                          ] = inputValue;
                          this.setState({
                            editShowSubCate: false,
                            editCategory: this.state.editCategory,
                          });
                          this.handleAddSubCategory(inputValue, "edit");
                        } else {
                          this.state.editCategory[
                            "subCategoryName"
                          ] = inputValue;
                          this.setState({
                            editShowSubCate: false,
                            editCategory: this.state.editCategory,
                            ListOfSubCate: inputValue,
                          });
                        }
                      }}
                      onCancel={() => {
                        this.setState({ editShowSubCate: false });
                      }}
                      onEscapeKey={() =>
                        this.setState({ editShowSubCate: false })
                      }
                      onOutsideClick={() =>
                        this.setState({ editShowSubCate: false })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="pop-over-div">
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="edit-label-1">Claim Issue Type</label>
                    <Aselect
                      showSearch={true}
                      value={this.state.editCategory.issueTypeName}
                      style={{ width: "100%" }}
                      onChange={this.handleModalIssueOnChange}
                      onSearch={this.handleSearchEditissueType.bind(this)}
                      notFoundContent="No Data Found"
                    >
                      {this.state.ListOfIssueData !== null &&
                        this.state.ListOfIssueData.map((item, i) => (
                          <Option key={i} value={item.issueTypeName}>
                            {item.issueTypeName}
                          </Option>
                        ))}
                    </Aselect>
                    {this.state.showEditAddIssue ? (
                      <span
                        className="sweetAlert-inCategory"
                        style={{ marginTop: "-68px" }}
                        onClick={this.handleToggleEditIssueAdd.bind(this)}
                      >
                        + {TranslationContext!==undefined?TranslationContext.span.addnew:"ADD NEW"}
                      </span>
                    ) : null}
                    {this.state.editCategory.issueTypeName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editIssueCompulsory}
                      </p>
                    )}
                    <SweetAlert
                      show={this.state.editShowIssuetype}
                      style={{ width: "320px" }}
                      title="Add New Issue type"
                      text="Enter new Issue Type"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Issue Type"
                      animation="slide-from-top"
                      validationMsg="Please Enter Issue Type!"
                      onConfirm={(inputValue) => {
                        inputValue = inputValue.trim();
                        if (inputValue !== "") {
                          this.state.editCategory["issueTypeName"] = inputValue;
                          this.setState({
                            editShowIssuetype: false,
                            editCategory: this.state.editCategory,
                          });
                          this.handleAddIssueType(inputValue, "edit");
                        } else {
                          this.state.editCategory["issueTypeName"] = inputValue;
                          this.setState({
                            editShowIssuetype: false,
                            editCategory: this.state.editCategory,
                          });
                        }
                      }}
                      onCancel={() => {
                        this.setState({ editShowIssuetype: false });
                      }}
                      onEscapeKey={() =>
                        this.setState({ editShowIssuetype: false })
                      }
                      onOutsideClick={() =>
                        this.setState({ editShowIssuetype: false })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Status</label>
                <select
                  id="inputStatus"
                  className="edit-dropDwon dropdown-setting"
                  value={this.state.editCategory.statusName}
                  name="statusName"
                  onChange={this.handleModalStatusChange.bind(this)}
                >
                  <option value="Active">
                  {TranslationContext!==undefined?TranslationContext.option.active:"Active"}
                  </option>
                  <option value="Inactive">
                  {TranslationContext!==undefined?TranslationContext.option.inactive:"Inactive"}
                  </option>
                </select>
              </div>
              <br />
              <div className="text-center">
                <a className="pop-over-cancle" onClick={this.toggleEditModal}>
                {TranslationContext!==undefined?TranslationContext.a.cancel:"CANCEL"}
                  
                </a>

                <button
                  className="pop-over-button FlNone pop-over-btnsave-text"
                  onClick={this.handleUpdateCategory.bind(this)}
                  disabled={this.state.editSaveLoading}
                >
                  <label className="pop-over-btnsave-text">
                    {this.state.editSaveLoading ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )}
                    
                    {TranslationContext!==undefined?TranslationContext.label.save:"SAVE"}
                  </label>
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default ClaimCategoryMaster;
