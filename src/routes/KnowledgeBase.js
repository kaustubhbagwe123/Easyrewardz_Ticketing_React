import React, { Component, Fragment } from "react";
import Demo from "../store/Hashtag.js";
import SerachIcon from "./../assets/Images/serach-icon-left.png";
import DownArrowIcon from "./../assets/Images/down-1.png";
import Modal from "react-responsive-modal";
import LeftBackIcon from "./../assets/Images/black-left-arrow.png";
import CancelIcon from "./../assets/Images/cancel.png";
import { CardBody, UncontrolledCollapse } from "reactstrap";
import { Card } from "react-bootstrap";
import CKEditor from "ckeditor4-react";
import Sorting from "./../assets/Images/sorting.png";
import { authHeader } from "../helpers/authHeader";
import axios from "axios";
import config from "./../helpers/config";
import { NotificationManager } from "react-notifications";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import matchSorter from "match-sorter";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

class KnowledgeBase extends Component {
  constructor(props) {
    super(props);
    var row;
    this.state = {
      headerfirst: "block",
      headersecound: "none",
      searchmodal: false,
      addnewkbmodal: false,
      editapprove: false,
      editapprove1: false,
      detailscollapse: false,
      tabcolor: "#2561A8",
      tabcolor1: "#4A4A4A",
      selectedCategory: "",
      CategoryData: [],
      byCategoryFlag: 0,
      allFlag: 0,
      selectedSubCategory: "",
      SubCategoryData: [],
      selectedSubject: "",
      selectedDescription: [],
      KBListData: [],
      KBListnotApproveData: [],
      KBid: 0,
      IssueTypeData: [],
      selectedIssueType: "",
      updateKBID: 0,
      updateCategoryValue: 0,
      updateCategoryName: "",
      updateSubCategoryValue: 0,
      updateSubCategoryName: "",
      updateIssurTypeValue: 0,
      updateIssueTypeName: "",
      updateSubject: "",
      updateDescription: "",
      approveID: 0,
      approvebit: 0,
      approveKBID: 0,
      approveCategoryValue: "",
      approveCategoryName: "",
      approveSubCategoryValue: "",
      approveSubCategoryName: "",
      approveIssurTypeValue: "",
      approveIssueTypeName: "",
      approveSubject: "",
      approveDescription: "",
      ckeditorAdd: "",
      ckeditorUpdate: [],
      ckeditorApprove: [],
      countApprove: 0,
      countNotApprove: 0,
      categoryCompulsion: "",
      subCategoryCompulsion: "",
      issueTypeCompulsion: "",
      subjectCompulsion: "",
      approveCategoryCompulsion: "",
      approveSubCategoryCompulsion: "",
      approveIssueTypeCompulsion: "",
      approveSubjectCompulsion: "",
      updateCategoryCompulsion: "",
      updateSubCategoryCompulsion: "",
      updateIssueTypeCompulsion: "",
      updateSubjectCompulsion: "",
      kbClearNew: false,
      kbClearList: false,
      tabCount: 1,
      StatusModel: false,
      sortColumnName: "",
      sortAllData: [],
      sortIssueType: [],
      sortCategory: [],
      sortSubCategory: [],
      sortAllDataApprove: [],
      sortIssueTypeApprove: [],
      sortCategoryApprove: [],
      sortSubCategoryApprove: [],
      columnTitle: "",
      sortTable: "",
      issueColor: "",
      sortHeader: "",
      categoryColor: "",
      subCategoryColor: "",
      searchCategoryCompulsion: "",
      searchSubCategoryCompulsion: "",
      searchIssueCompulsion: "",
      collapseUp: false,
      collapseId: "",
      sFilterCheckbox: "",
      tempKBListData: [],
      tempKBListnotApproveData: [],
      sortFilterIssueType: [],
      sortFilterCategory: [],
      sortFilterSubCategory: [],
      sortFilterSubCategoryNot: [],
      sortFilterCategoryNot: [],
      sortFilterIssueTypeNot: [],
      filterTxtValue: "",
      scategoryNameFilterCheckboxN: "",
      ssubCategoryNameFilterCheckboxN: "",
      sissueTypeNameFilterCheckboxN: "",
      scategoryNameFilterCheckbox: "",
      ssubCategoryNameFilterCheckbox: "",
      sissueTypeNameFilterCheckbox: "",
      NisortA: false,
      AisortA: false,
      similarTickets: [],
    };
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.HandelFirstTabClick = this.HandelFirstTabClick.bind(this);
    this.HandelSecoundTabClick = this.HandelSecoundTabClick.bind(this);
    this.opneSearchModal = this.opneSearchModal.bind(this);
    this.closeSearchModal = this.closeSearchModal.bind(this);
    // this.HandelOnenCloseDetailsCollapse = this.HandelOnenCloseDetailsCollapse.bind(
    //   this
    // );
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleAddKB = this.handleAddKB.bind(this);
    this.handleKBList = this.handleKBList.bind(this);
    this.handleDeleteKB = this.handleDeleteKB.bind(this);
    this.handleUpdateKB = this.handleUpdateKB.bind(this);
    this.handleRejectKB = this.handleRejectKB.bind(this);
    this.handleSeaechKB = this.handleSeaechKB.bind(this);
  }
  StatusOpenModel(data, table, header) {
    debugger;

    if (table == "approve") {
      if (data === "categoryName") {
        if (
          this.state.ssubCategoryNameFilterCheckbox !== "" ||
          this.state.sissueTypeNameFilterCheckbox !== ""
        ) {
          this.setState({
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        } else {
          this.setState({
            ssubCategoryNameFilterCheckbox: "",
            sissueTypeNameFilterCheckbox: "",
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        }
      }
      if (data === "subCategoryName") {
        if (
          this.state.scategoryNameFilterCheckbox !== "" ||
          this.state.sissueTypeNameFilterCheckbox !== ""
        ) {
          this.setState({
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        } else {
          this.setState({
            scategoryNameFilterCheckbox: "",
            sissueTypeNameFilterCheckbox: "",
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        }
      }
      if (data === "issueTypeName") {
        if (
          this.state.scategoryNameFilterCheckbox !== "" ||
          this.state.ssubCategoryNameFilterCheckbox !== ""
        ) {
          this.setState({
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        } else {
          this.setState({
            ssubCategoryNameFilterCheckbox: "",
            scategoryNameFilterCheckbox: "",
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        }
      }
    } else {
      if (data === "categoryName") {
        if (
          this.state.ssubCategoryNameFilterCheckboxN !== "" ||
          this.state.sissueTypeNameFilterCheckboxN !== ""
        ) {
          this.setState({
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        } else {
          this.setState({
            ssubCategoryNameFilterCheckboxN: "",
            sissueTypeNameFilterCheckboxN: "",
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        }
      }
      if (data === "subCategoryName") {
        if (
          this.state.scategoryNameFilterCheckboxN !== "" ||
          this.state.sissueTypeNameFilterCheckboxN !== ""
        ) {
          this.setState({
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        } else {
          this.setState({
            scategoryNameFilterCheckboxN: "",
            sissueTypeNameFilterCheckboxN: "",
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        }
      }
      if (data === "issueTypeName") {
        if (
          this.state.scategoryNameFilterCheckboxN !== "" ||
          this.state.ssubCategoryNameFilterCheckboxN !== ""
        ) {
          this.setState({
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        } else {
          this.setState({
            scategoryNameFilterCheckboxN: "",
            ssubCategoryNameFilterCheckboxN: "",
            StatusModel: true,
            sortColumnName: data,
            sortTable: table,
            sortHeader: header,
          });
        }
      }
    }
  }
  StatusCloseModel() {
    debugger;
    if (this.state.sortTable === "approve") {
      if (this.state.tempKBListData.length > 0) {
        this.setState({
          StatusModel: false,
          KBListData: this.state.tempKBListData,
          sortFilterCategory: this.state.sortCategory,
          sortFilterSubCategory: this.state.sortSubCategory,
          sortFilterIssueType: this.state.sortIssueType,
        });
        if (this.state.sortColumnName === "subCategoryName") {
          if (this.state.ssubCategoryNameFilterCheckbox === "") {
          } else {
            this.setState({
              scategoryNameFilterCheckbox: "",
              sissueTypeNameFilterCheckbox: "",
            });
          }
        }
        if (this.state.sortColumnName === "categoryName") {
          if (this.state.scategoryNameFilterCheckbox === "") {
          } else {
            this.setState({
              ssubCategoryNameFilterCheckbox: "",
              sissueTypeNameFilterCheckbox: "",
            });
          }
        }
        if (this.state.sortColumnName === "issueTypeName") {
          if (this.state.sissueTypeNameFilterCheckbox === "") {
          } else {
            this.setState({
              ssubCategoryNameFilterCheckbox: "",
              scategoryNameFilterCheckbox: "",
            });
          }
        }
      } else {
        this.setState({
          StatusModel: false,
          KBListData: this.state.AisortA
            ? this.state.KBListData
            : this.state.sortAllDataApprove,
          sortFilterCategory: this.state.sortCategory,
          sortFilterSubCategory: this.state.sortSubCategory,
          sortFilterIssueType: this.state.sortIssueType,
        });
      }
    } else {
      if (this.state.tempKBListnotApproveData.length > 0) {
        this.setState({
          StatusModel: false,
          KBListnotApproveData: this.state.tempKBListnotApproveData,
          sortFilterCategoryNot: this.state.sortCategory,
          sortFilterSubCategoryNot: this.state.sortSubCategory,
          sortFilterIssueTypeNot: this.state.sortIssueType,
        });

        if (this.state.sortColumnName === "categoryName") {
          if (this.state.scategoryNameFilterCheckboxN === "") {
          } else {
            this.setState({
              ssubCategoryNameFilterCheckboxN: "",
              sissueTypeNameFilterCheckboxN: "",
            });
          }
        }
        if (this.state.sortColumnName === "subCategoryName") {
          if (this.state.ssubCategoryNameFilterCheckboxN === "") {
          } else {
            this.setState({
              scategoryNameFilterCheckboxN: "",
              sissueTypeNameFilterCheckboxN: "",
            });
          }
        }
        if (this.state.sortColumnName === "issueTypeName") {
          if (this.state.sissueTypeNameFilterCheckboxN === "") {
          } else {
            this.setState({
              scategoryNameFilterCheckboxN: "",
              ssubCategoryNameFilterCheckboxN: "",
            });
          }
        }
      } else {
        this.setState({
          StatusModel: false,
          KBListnotApproveData: this.state.NisortA
            ? this.state.KBListnotApproveData
            : this.state.sortAllData,
          sortFilterCategoryNot: this.state.sortCategory,
          sortFilterSubCategoryNot: this.state.sortSubCategory,
          sortFilterIssueTypeNot: this.state.sortIssueType,
        });
      }
    }
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;
    var itemsArray = [];
    var itemsArrayApprove = [];

    var scategoryNameFilterCheckboxN = this.state.scategoryNameFilterCheckboxN;
    var ssubCategoryNameFilterCheckboxN = this.state
      .ssubCategoryNameFilterCheckboxN;
    var sissueTypeNameFilterCheckboxN = this.state
      .sissueTypeNameFilterCheckboxN;
    var scategoryNameFilterCheckbox = this.state.scategoryNameFilterCheckbox;
    var ssubCategoryNameFilterCheckbox = this.state
      .ssubCategoryNameFilterCheckbox;
    var sissueTypeNameFilterCheckbox = this.state.sissueTypeNameFilterCheckbox;

    if (column === "categoryName" || column === "all") {
      if (type === "value" && type !== "All") {
        scategoryNameFilterCheckboxN = scategoryNameFilterCheckboxN.replace(
          "all",
          ""
        );
        scategoryNameFilterCheckboxN = scategoryNameFilterCheckboxN.replace(
          "all,",
          ""
        );
        if (scategoryNameFilterCheckboxN.includes(e.currentTarget.value)) {
          scategoryNameFilterCheckboxN = scategoryNameFilterCheckboxN.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scategoryNameFilterCheckboxN += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryNameFilterCheckboxN.includes("all")) {
          scategoryNameFilterCheckboxN = "";
        } else {
          if (this.state.sortColumnName === "categoryName") {
            for (let i = 0; i < this.state.sortFilterCategoryNot.length; i++) {
              scategoryNameFilterCheckboxN +=
                this.state.sortFilterCategoryNot[i].categoryName + ",";
            }
            scategoryNameFilterCheckboxN += "all";
          }
        }
      }
    }
    if (column === "subCategoryName" || column === "all") {
      if (type === "value" && type !== "All") {
        ssubCategoryNameFilterCheckboxN = ssubCategoryNameFilterCheckboxN.replace(
          "all",
          ""
        );
        ssubCategoryNameFilterCheckboxN = ssubCategoryNameFilterCheckboxN.replace(
          "all,",
          ""
        );
        if (ssubCategoryNameFilterCheckboxN.includes(e.currentTarget.value)) {
          ssubCategoryNameFilterCheckboxN = ssubCategoryNameFilterCheckboxN.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          ssubCategoryNameFilterCheckboxN += e.currentTarget.value + ",";
        }
      } else {
        if (ssubCategoryNameFilterCheckboxN.includes("all")) {
          ssubCategoryNameFilterCheckboxN = "";
        } else {
          if (this.state.sortColumnName === "subCategoryName") {
            for (
              let i = 0;
              i < this.state.sortFilterSubCategoryNot.length;
              i++
            ) {
              ssubCategoryNameFilterCheckboxN +=
                this.state.sortFilterSubCategoryNot[i].subCategoryName + ",";
            }
            ssubCategoryNameFilterCheckboxN += "all";
          }
        }
      }
    }
    if (column === "issueTypeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sissueTypeNameFilterCheckboxN = sissueTypeNameFilterCheckboxN.replace(
          "all",
          ""
        );
        sissueTypeNameFilterCheckboxN = sissueTypeNameFilterCheckboxN.replace(
          "all,",
          ""
        );
        if (sissueTypeNameFilterCheckboxN.includes(e.currentTarget.value)) {
          sissueTypeNameFilterCheckboxN = sissueTypeNameFilterCheckboxN.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sissueTypeNameFilterCheckboxN += e.currentTarget.value + ",";
        }
      } else {
        if (sissueTypeNameFilterCheckboxN.includes("all")) {
          sissueTypeNameFilterCheckboxN = "";
        } else {
          if (this.state.sortColumnName === "issueTypeName") {
            for (let i = 0; i < this.state.sortFilterIssueTypeNot.length; i++) {
              sissueTypeNameFilterCheckboxN +=
                this.state.sortFilterIssueTypeNot[i].issueTypeName + ",";
            }
            sissueTypeNameFilterCheckboxN += "all";
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
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scategoryNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryNameFilterCheckbox.includes("all")) {
          scategoryNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "categoryName") {
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
            e.currentTarget.value + ",",
            ""
          );
        } else {
          ssubCategoryNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (ssubCategoryNameFilterCheckbox.includes("all")) {
          ssubCategoryNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "subCategoryName") {
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
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sissueTypeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sissueTypeNameFilterCheckbox.includes("all")) {
          sissueTypeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "issueTypeName") {
            for (let i = 0; i < this.state.sortIssueType.length; i++) {
              sissueTypeNameFilterCheckbox +=
                this.state.sortIssueType[i].issueTypeName + ",";
            }
            sissueTypeNameFilterCheckbox += "all";
          }
        }
      }
    }

    this.setState({
      scategoryNameFilterCheckboxN,
      ssubCategoryNameFilterCheckboxN,
      sissueTypeNameFilterCheckboxN,
      scategoryNameFilterCheckbox,
      ssubCategoryNameFilterCheckbox,
      sissueTypeNameFilterCheckbox,
    });
    var AllDataApprove = this.state.sortAllDataApprove;
    var sortAllData = this.state.sortAllData;

    if (this.state.sortTable === "notapprove") {
      if (column === "all") {
        itemsArray = this.state.sortAllData;
        this.setState({
          issueColor: "",
          categoryColor: "",
          subCategoryColor: "",
        });
      } else if (column === "issueTypeName") {
        var sItems = sissueTypeNameFilterCheckboxN.split(",");
        if (sItems.length > 0) {
          for (let i = 0; i < sItems.length; i++) {
            if (sItems[i] !== "") {
              var tempFilterData = sortAllData.filter(
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
          categoryColor: "",
          subCategoryColor: "",
        });
      } else if (column === "categoryName") {
        var sItems = scategoryNameFilterCheckboxN.split(",");
        if (sItems.length > 0) {
          for (let i = 0; i < sItems.length; i++) {
            if (sItems[i] !== "") {
              var tempFilterData = sortAllData.filter(
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
          issueColor: "",
          categoryColor: "sort-column",
          subCategoryColor: "",
        });
      } else if (column === "subCategoryName") {
        var sItems = ssubCategoryNameFilterCheckboxN.split(",");
        if (sItems.length > 0) {
          for (let i = 0; i < sItems.length; i++) {
            if (sItems[i] !== "") {
              var tempFilterData = sortAllData.filter(
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
          issueColor: "",
          categoryColor: "",
          subCategoryColor: "sort-column",
        });
      }
      this.setState({ tempKBListnotApproveData: itemsArray });
    } else if (this.state.sortTable === "approve") {
      debugger;
      if (column === "all") {
        itemsArray = this.state.sortAllDataApprove;
        this.setState({
          issueColor: "",
          categoryColor: "",
          subCategoryColor: "",
        });
      } else if (column === "issueTypeName") {
        var sItems = sissueTypeNameFilterCheckbox.split(",");
        if (sItems.length > 0) {
          for (let i = 0; i < sItems.length; i++) {
            if (sItems[i] !== "") {
              var tempFilterData = AllDataApprove.filter(
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
          categoryColor: "",
          subCategoryColor: "",
        });
      } else if (column === "categoryName") {
        var sItems = scategoryNameFilterCheckbox.split(",");
        if (sItems.length > 0) {
          for (let i = 0; i < sItems.length; i++) {
            if (sItems[i] !== "") {
              var tempFilterData = AllDataApprove.filter(
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
          issueColor: "",
          categoryColor: "sort-column",
          subCategoryColor: "",
        });
      } else if (column === "subCategoryName") {
        var sItems = ssubCategoryNameFilterCheckbox.split(",");
        if (sItems.length > 0) {
          for (let i = 0; i < sItems.length; i++) {
            if (sItems[i] !== "") {
              var tempFilterData = AllDataApprove.filter(
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
          issueColor: "",
          categoryColor: "",
          subCategoryColor: "sort-column",
        });
      }
      this.setState({
        tempKBListData: itemsArray,
      });
    }

    // this.StatusCloseModel();
  };

  opneSearchModal() {
    this.setState({
      searchmodal: true,
      selectedCategory: "",
      selectedSubCategory: "",
      selectedIssueType: "",
    });
  }
  closeSearchModal() {
    this.setState({ searchmodal: false });
  }

  openEditAproveBModal(rowdata) {
    this.setState({
      editapprove: true,
      selectedCategory: this.state.updateCategoryValue,
    });

    this.setUpdateData(rowdata);
  }
  closeEditAproveModal() {
    this.setState({ editapprove: false });
  }

  openEditAproveBModal1(approvedata, bit) {
    this.setState({ editapprove1: true });
    this.state.approveID = approvedata.kbid;
    this.state.approvebit = bit;
    this.setApproveData(approvedata);
  }
  closeEditAproveModal1() {
    this.setState({ editapprove1: false });
  }

  openAddNewKBModal() {
    this.setState({
      addnewkbmodal: true,
      categoryCompulsion: "",
      subCategoryCompulsion: "",
      issueTypeCompulsion: "",
      subjectCompulsion: "",
      selectedCategory: "",
      selectedSubCategory: "",
      selectedIssueType: "",
    });
  }
  closeAddNewKBModal() {
    this.setState({ addnewkbmodal: false });
  }
  componentDidMount() {
    debugger;

    this.handleGetCategoryList();
    this.handleKBList();
  }

  HandelFirstTabClick() {
    this.setState({
      headerfirst: "block",
      headersecound: "none",
      detailscollapse: false,
      tabcolor: "#2561A8",
      tabcolor1: "#4A4A4A",
      tabCount: 1,
      issueColor: "",
      categoryColor: "",
      subCategoryColor: "",
    });
  }
  setUpdateData(individualData) {
    debugger;

    let updateKBID = individualData.kbid,
      updateCategoryValue = individualData.categoryID,
      updateCategoryName = individualData.categoryName,
      updateSubCategoryValue = individualData.subCategoryID,
      updateSubCategoryName = individualData.subCategoryName,
      updateIssurTypeValue = individualData.issueTypeID,
      updateIssueTypeName = individualData.issueTypeName,
      updateSubject = individualData.subject,
      updateDescription = individualData.description,
      ckeditorUpdate = updateDescription,
      selectedCategory = updateCategoryValue,
      selectedSubCategory = updateSubCategoryValue,
      selectedIssueType = updateIssurTypeValue;

    this.setState({
      updateKBID,
      updateCategoryValue,
      updateCategoryName,
      updateSubCategoryValue,
      updateSubCategoryName,
      updateIssurTypeValue,
      updateIssueTypeName,
      updateSubject,
      updateDescription,
      ckeditorUpdate,
      selectedCategory,
      selectedSubCategory,
      selectedIssueType,
    });
  }
  setApproveData(individualData) {
    debugger;

    let approveKBID = individualData.kbid,
      approveCategoryValue = individualData.categoryID,
      approveCategoryName = individualData.categoryName,
      approveSubCategoryValue = individualData.subCategoryID,
      approveSubCategoryName = individualData.subCategoryName,
      approveIssurTypeValue = individualData.issueTypeID,
      approveIssueTypeName = individualData.issueTypeName,
      approveSubject = individualData.subject,
      approveDescription = individualData.description,
      ckeditorApprove = approveDescription,
      selectedCategory = approveCategoryValue,
      selectedSubCategory = approveSubCategoryValue,
      selectedIssueType = approveIssurTypeValue;

    this.setState({
      approveKBID,
      approveCategoryValue,
      approveCategoryName,
      approveSubCategoryValue,
      approveSubCategoryName,
      approveIssurTypeValue,
      approveIssueTypeName,
      approveSubject,
      approveDescription,
      ckeditorApprove,
      selectedCategory,
      selectedSubCategory,
      selectedIssueType,
    });
  }

  onAddCKEditorChange = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      ckeditorAdd: newContent,
    });
  };

  onUpdateCKEditorChange = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      ckeditorUpdate: newContent,
    });
  };
  onApproveCKEditorChange = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      ckeditorApprove: newContent,
    });
  };

  HandelSecoundTabClick() {
    this.setState({
      headerfirst: "none",
      headersecound: "block",
      detailscollapse: false,
      tabcolor: "#4A4A4A",
      tabcolor1: "#2561A8",
      tabCount: 2,
      issueColor: "",
      categoryColor: "",
      subCategoryColor: "",
      collapseId: "",
      collapseUp: false,
      similarTickets: [],
    });
  }

  setCategoryValue = (e) => {
    let categoryValue = e.currentTarget.value;
    this.setState({ selectedCategory: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        // this.setState({
        // selectedSubCategory:0
        // });

        this.handleGetSubCategoryList();
      }
    }, 1);
  };

  setSubCategoryValue = (e) => {
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategory: subCategoryValue });
    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
  };

  setIssueType = (e) => {
    let issuetype = e.currentTarget.value;
    this.setState({ selectedIssueType: issuetype });
  };

  setSubjectValue = (e) => {
    let subjectvalue = e.currentTarget.value;
    this.setState({ selectedSubject: subjectvalue });
  };

  setUpdateSubjectValue = (e) => {
    let subjectvalue = e.currentTarget.value;
    this.setState({ updateSubject: subjectvalue });
  };

  setApproveSubjectValue = (e) => {
    let subjectvalue = e.currentTarget.value;
    this.setState({ approveSubject: subjectvalue });
  };

  setDescriptionValue = (e) => {
    let descriptionvalue = e.currentTarget.value;
    this.setState({ selectedDescription: descriptionvalue });
  };
  handleGetCategoryList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let data = res.data;
        let CategoryData = res.data;
        if(data.length > 0){
          self.setState({
            CategoryData: CategoryData,
            // CategoryDataAll: CategoryDataAll
          });
        }else{
          self.setState({
            CategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetSubCategoryList() {
    debugger;
    let self = this;

    let cateId = this.state.selectedCategory;

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: cateId,
      },
    })
      .then(function(res) {
        debugger;
        var SubCategoryData = res.data.responseData;
        self.setState({
          SubCategoryData: SubCategoryData,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetIssueTypeList() {
    debugger;
    let self = this;
    let subCateId = this.state.selectedSubCategory;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: subCateId,
      },
    })
      .then(function(res) {
        debugger;
        let IssueTypeData = res.data.responseData;
        self.setState({ IssueTypeData: IssueTypeData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleDeleteKB(id) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/KnowledgeBase/DeleteKB",
      headers: authHeader(),
      params: {
        KBID: id,
      },
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        if (Msg === "Record In use") {
          NotificationManager.error("Record in use.");
        } else if (Msg === "Record deleted Successfully") {
          NotificationManager.success("Record deleted Successfully.");
          self.handleKBList();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleRejectKB(id, bit) {
    debugger;
    let self = this;

    if (bit === 0) {
      var json = {
        KBID: id,
        CategoryID: 0,
        SubCategoryID: 0,
        IssueTypeID: 0,
        IsApproved: bit,
        Subject: "",
        Description: "",
      };
      axios({
        method: "post",
        url: config.apiUrl + "/KnowledgeBase/RejectApproveKB",
        headers: authHeader(),
        data: json,
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;

          if (Msg === "Success") {
            NotificationManager.success("Record Rejected successfully.");
          }

          self.handleKBList();
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      // }

      if (
        this.state.approveCategoryValue > 0 &&
        this.state.approveSubCategoryValue > 0 &&
        this.state.approveIssurTypeValue > 0 &&
        this.state.approveSubject.length > 0
      ) {
        var ck = this.state.ckeditorApprove.replace(/<[^>]+>/g, "");
        var ckeditor = ck.replace(/&nbsp;/gi, " ");
        var jsonData = {
          KBID: id,

          CategoryID: this.state.selectedCategory,
          SubCategoryID: this.state.selectedSubCategory,
          IssueTypeID: this.state.selectedIssueType,
          IsApproved: bit,
          Subject: this.state.approveSubject,
          Description: ckeditor,
        };
        axios({
          method: "post",
          url: config.apiUrl + "/KnowledgeBase/RejectApproveKB",
          headers: authHeader(),
          data: jsonData,
        })
          .then(function(res) {
            debugger;
            let Msg = res.data.message;

            if (Msg === "Success") {
              NotificationManager.success("Record Approved successfully.");
            }
            self.closeEditAproveModal1();
            self.handleKBList();
          })
          .catch((data) => {
            console.log(data);
          });
      } else {
        this.setState({
          approveCategoryCompulsion: "Category field is compulsory.",
          approveSubCategoryCompulsion: "Sub Category field is compulsory.",
          approveIssueTypeCompulsion: "Issue Type field is compulsory.",
          approveSubjectCompulsion: "Subject field is compulsory.",
        });
      }
    }
  }

  handleKBList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/KnowledgeBase/KBList",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        var approve = res.data.responseData.approved;
        var notapprove = res.data.responseData.notApproved;
        var approveconut = res.data.responseData.approved.length;
        var notapproveconut = res.data.responseData.notApproved.length;

        self.setState({
          KBListData: approve,
          KBListnotApproveData: notapprove,
          countApprove: approveconut,
          countNotApprove: notapproveconut,
        });

        if (notapprove !== null) {
          self.state.sortAllData = notapprove;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < notapprove.length; i++) {
            if (!unique[notapprove[i].issueTypeName]) {
              distinct.push(notapprove[i].issueTypeName);
              unique[notapprove[i].issueTypeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortIssueType.push({ issueTypeName: distinct[i] });
            self.state.sortFilterIssueTypeNot.push({
              issueTypeName: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < notapprove.length; i++) {
            if (!unique[notapprove[i].categoryName]) {
              distinct.push(notapprove[i].categoryName);
              unique[notapprove[i].categoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCategory.push({ categoryName: distinct[i] });
            self.state.sortFilterCategoryNot.push({
              categoryName: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < notapprove.length; i++) {
            if (!unique[notapprove[i].subCategoryName]) {
              distinct.push(notapprove[i].subCategoryName);
              unique[notapprove[i].subCategoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortSubCategory.push({ subCategoryName: distinct[i] });
            self.state.sortFilterSubCategoryNot.push({
              subCategoryName: distinct[i],
            });
          }
        }

        if (approve !== null) {
          self.state.sortAllDataApprove = approve;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < approve.length; i++) {
            if (!unique[approve[i].issueTypeName]) {
              distinct.push(approve[i].issueTypeName);
              unique[approve[i].issueTypeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortIssueTypeApprove.push({
              issueTypeName: distinct[i],
            });
            self.state.sortFilterIssueType.push({
              issueTypeName: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < approve.length; i++) {
            if (!unique[approve[i].categoryName]) {
              distinct.push(approve[i].categoryName);
              unique[approve[i].categoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCategoryApprove.push({ categoryName: distinct[i] });
            self.state.sortFilterCategory.push({ categoryName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < approve.length; i++) {
            if (!unique[approve[i].subCategoryName]) {
              distinct.push(approve[i].subCategoryName);
              unique[approve[i].subCategoryName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortSubCategoryApprove.push({
              subCategoryName: distinct[i],
            });
            self.state.sortFilterSubCategory.push({
              subCategoryName: distinct[i],
            });
          }
        }

        if (self.state.tabCount === 1) {
          self.setState({
            kbClearNew: false,
          });
        } else {
          self.setState({
            kbClearList: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSeaechKB() {
    debugger;
    if (
      this.state.selectedCategory > 0 &&
      this.state.selectedSubCategory > 0 &&
      this.state.selectedIssueType > 0
    ) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/KnowledgeBase/SearchKB",
        headers: authHeader(),
        params: {
          Category_ID: this.state.selectedCategory,
          SubCategory_ID: this.state.selectedSubCategory,
          type_ID: this.state.selectedIssueType,
        },
      })
        .then(function(res) {
          debugger;
          var approve = res.data.responseData.approved;
          var notapprove = res.data.responseData.notApproved;
          var approveconut = res.data.responseData.approved.length;
          var notapproveconut = res.data.responseData.notApproved.length;
          var similarTickets = res.data.responseData.similarTickets;

          self.setState({
            similarTickets,
            // KBListData: approve,
            // KBListnotApproveData: notapprove,
            // countApprove: approveconut,
            // countNotApprove: notapproveconut,
            SubCategoryData: [],
            IssueTypeData: [],
            selectedCategory: "",
            selectedSubCategory: "",
            selectedIssueType: "",
            searchCategoryCompulsion: "",
            searchSubCategoryCompulsion: "",
            searchIssueCompulsion: "",
          });
          if (self.state.tabCount === 1) {
            self.setState({
              kbClearNew: true,
              KBListnotApproveData: notapprove,
              countNotApprove: notapproveconut,
            });
          } else {
            self.setState({
              kbClearList: true,
              KBListData: approve,
              countApprove: approveconut,
            });
          }
          self.closeSearchModal();
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        searchCategoryCompulsion: "Please select category.",
        searchSubCategoryCompulsion: "Please select subcategory.",
        searchIssueCompulsion: "Please select issuetype.",
      });
    }
  }

  handleUpdateKB(kbid) {
    debugger;
    if (
      this.state.updateCategoryValue > 0 &&
      this.state.updateSubCategoryValue > 0 &&
      this.state.updateIssurTypeValue > 0 &&
      this.state.updateSubject.length > 0
    ) {
      let self = this;
      var ck = this.state.ckeditorUpdate.replace(/<[^>]+>/g, "");
      var ckeditor = ck.replace(/&nbsp;/gi, " ");
      var json = {
        KBID: kbid,
        KBCODE: "",
        CategoryID: this.state.selectedCategory,
        SubCategoryID: this.state.selectedSubCategory,

        Subject: this.state.updateSubject,
        Description: ckeditor,

        IssueTypeID: this.state.selectedIssueType,
      };
      axios({
        method: "post",
        url: config.apiUrl + "/KnowledgeBase/UpdateKB",
        headers: authHeader(),
        data: json,
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Record Updated successfully.");
          } else {
            NotificationManager.error("Record Not Updated.");
          }
          self.closeEditAproveModal();
          self.handleKBList();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        updateCategoryCompulsion: "Category field is compulsory.",
        updateSubCategoryCompulsion: "Sub Category field is compulsory.",
        updateIssueTypeCompulsion: "Issue Type field is compulsory.",
        updateSubjectCompulsion: "Subject field is compulsory.",
      });
    }
  }

  handleAddKB() {
    debugger;
    if (
      this.state.selectedCategory.length > 0 &&
      this.state.selectedSubCategory.length > 0 &&
      this.state.selectedIssueType.length > 0 &&
      this.state.selectedSubject.length > 0
    ) {
      let self = this;
      //var ck=this.state.ckeditorAdd.replace("<p>","");
      //var ckeditor=ck.replace("</p>","");
      var ck = this.state.ckeditorAdd.replace(/<[^>]+>/g, "");
      var ckeditor = ck.replace(/&nbsp;/gi, " ");

      var json = {
        KBCODE: "",
        CategoryID: this.state.selectedCategory,
        SubCategoryID: this.state.selectedSubCategory,

        Subject: this.state.selectedSubject,
        Description: ckeditor,
        IsActive: 1,
        IssueTypeID: this.state.selectedIssueType,
      };
      axios({
        method: "post",
        url: config.apiUrl + "/KnowledgeBase/AddKB",
        headers: authHeader(),
        data: json,
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Record Saved successfully.");
          }
          self.setState({
            selectedCategory: "",
            selectedSubCategory: "",
            selectedIssueType: "",
            selectedSubject: "",
            ckeditorAdd: "",
          });
          self.closeAddNewKBModal();
          self.handleKBList();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        categoryCompulsion: "Category field is compulsory.",
        subCategoryCompulsion: "Sub Category field is compulsory.",
        issueTypeCompulsion: "Issue Type field is compulsory.",
        subjectCompulsion: "Subject field is compulsory.",
      });
    }
  }

  HandelOnenCloseDetailsCollapse() {
    debugger;
    this.setState({ detailscollapse: !this.state.detailscollapse });
  }

  handleUpOpen(id) {
    debugger;

    this.setState({ collapseUp: true, collapseId: id });
  }
  handleUpClose(id) {
    debugger;

    this.setState({ collapseUp: false, collapseId: id });
  }

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });
    // if (e.target.value !== "") {
    if (this.state.sortHeader === "IssueType") {
      var sortFilterIssueType = matchSorter(
        this.state.sortIssueTypeApprove,
        e.target.value,
        { keys: ["issueTypeName"] }
      );
      if (sortFilterIssueType.length > 0) {
        this.setState({ sortFilterIssueType });
      } else {
        this.setState({
          sortFilterIssueType: this.state.sortIssueTypeApprove,
        });
      }
    }
    if (this.state.sortHeader === "Category") {
      var sortFilterCategory = matchSorter(
        this.state.sortCategoryApprove,
        e.target.value,
        { keys: ["category"] }
      );
      if (sortFilterCategory.length > 0) {
        this.setState({ sortFilterCategory });
      } else {
        this.setState({
          sortFilterCategory: this.state.sortCategoryApprove,
        });
      }
    }
    if (this.state.sortHeader === "SubCategory") {
      var sortFilterSubCategory = matchSorter(
        this.state.sortSubCategoryApprove,
        e.target.value,
        { keys: ["priority"] }
      );
      if (sortFilterSubCategory.length > 0) {
        this.setState({ sortFilterSubCategory });
      } else {
        this.setState({
          sortFilterSubCategory: this.state.sortSubCategoryApprove,
        });
      }
    }
  }

  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    if (this.state.sortTable == "approve") {
      itemsArray = this.state.KBListData;
    } else {
      itemsArray = this.state.KBListnotApproveData;
    }

    if (this.state.sortColumnName === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return 1;
        if (a.categoryName > b.categoryName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "subCategoryName") {
      itemsArray.sort((a, b) => {
        if (a.subCategoryName < b.subCategoryName) return 1;
        if (a.subCategoryName > b.subCategoryName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "issueTypeName") {
      itemsArray.sort((a, b) => {
        if (a.issueTypeName < b.issueTypeName) return 1;
        if (a.issueTypeName > b.issueTypeName) return -1;
        return 0;
      });
    }

    if (this.state.sortTable == "approve") {
      this.setState({
        AisortA: true,
        KBListData: itemsArray,
      });
    } else {
      this.setState({
        NisortA: true,
        KBListnotApproveData: itemsArray,
      });
    }
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;

    var itemsArray = [];
    if (this.state.sortTable == "approve") {
      itemsArray = this.state.KBListData;
    } else {
      itemsArray = this.state.KBListnotApproveData;
    }

    if (this.state.sortColumnName === "categoryName") {
      itemsArray.sort((a, b) => {
        if (a.categoryName < b.categoryName) return -1;
        if (a.categoryName > b.categoryName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "subCategoryName") {
      itemsArray.sort((a, b) => {
        if (a.subCategoryName < b.subCategoryName) return -1;
        if (a.subCategoryName > b.subCategoryName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "issueTypeName") {
      itemsArray.sort((a, b) => {
        if (a.issueTypeName < b.issueTypeName) return -1;
        if (a.issueTypeName > b.issueTypeName) return 1;
        return 0;
      });
    }

    if (this.state.sortTable == "approve") {
      this.setState({
        AisortA: true,
        KBListData: itemsArray,
      });
    } else {
      this.setState({
        NisortA: true,
        KBListnotApproveData: itemsArray,
      });
    }

    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  render() {
    return (
      <Fragment>
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
                  <a href="#!" className="sorting-icon">
                    <img
                      src={Sorting}
                      alt="sorting-icon"
                      onClick={this.sortStatusAtoZ.bind(this)}
                    />
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
              {/* <a
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                clear search
              </a> */}
              <div className="filter-type FTypeScroll">
                <p>FILTER BY TYPE</p>
                <input
                  type="text"
                  style={{ display: "block" }}
                  value={this.state.filterTxtValue}
                  onChange={this.filteTextChange.bind(this)}
                />

                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="filter-type"
                    id={"fil-open"}
                    value="all"
                    checked={
                      this.state.sortTable !== "approve"
                        ? this.state.scategoryNameFilterCheckboxN.includes(
                            "all"
                          ) ||
                          this.state.ssubCategoryNameFilterCheckboxN.includes(
                            "all"
                          ) ||
                          this.state.sissueTypeNameFilterCheckboxN.includes(
                            "all"
                          )
                        : this.state.scategoryNameFilterCheckbox.includes(
                            "all"
                          ) ||
                          this.state.ssubCategoryNameFilterCheckbox.includes(
                            "all"
                          ) ||
                          this.state.sissueTypeNameFilterCheckbox.includes(
                            "all"
                          )
                    }
                    onChange={this.setSortCheckStatus.bind(this, "all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                </div>

                {this.state.sortColumnName === "issueTypeName" &&
                this.state.sortTable === "notapprove"
                  ? this.state.sortFilterIssueTypeNot !== null &&
                    this.state.sortFilterIssueTypeNot.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.issueTypeName}
                          value={item.issueTypeName}
                          checked={this.state.sissueTypeNameFilterCheckboxN.includes(
                            item.issueTypeName
                          )}
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

                {this.state.sortColumnName === "categoryName" &&
                this.state.sortTable === "notapprove"
                  ? this.state.sortFilterCategoryNot !== null &&
                    this.state.sortFilterCategoryNot.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.categoryName}
                          value={item.categoryName}
                          checked={this.state.scategoryNameFilterCheckboxN.includes(
                            item.categoryName
                          )}
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

                {this.state.sortColumnName === "subCategoryName" &&
                this.state.sortTable === "notapprove"
                  ? this.state.sortFilterSubCategoryNot !== null &&
                    this.state.sortFilterSubCategoryNot.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.subCategoryName}
                          value={item.subCategoryName}
                          checked={this.state.ssubCategoryNameFilterCheckboxN.includes(
                            item.subCategoryName
                          )}
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

                {this.state.sortColumnName === "issueTypeName" &&
                this.state.sortTable === "approve"
                  ? this.state.sortFilterIssueType !== null &&
                    this.state.sortFilterIssueType.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.issueTypeName}
                          value={item.issueTypeName}
                          checked={this.state.sissueTypeNameFilterCheckbox.includes(
                            item.issueTypeName
                          )}
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

                {this.state.sortColumnName === "categoryName" &&
                this.state.sortTable === "approve"
                  ? this.state.sortFilterCategory !== null &&
                    this.state.sortFilterCategory.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.categoryName}
                          value={item.categoryName}
                          checked={this.state.scategoryNameFilterCheckbox.includes(
                            item.categoryName
                          )}
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

                {this.state.sortColumnName === "subCategoryName" &&
                this.state.sortTable === "approve"
                  ? this.state.sortFilterSubCategory !== null &&
                    this.state.sortFilterSubCategory.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.subCategoryName}
                          value={item.subCategoryName}
                          checked={this.state.ssubCategoryNameFilterCheckbox.includes(
                            item.subCategoryName
                          )}
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
              </div>
            </div>
          </Modal>
        </div>
        <div className="kb-header">
          <span>
            <a href={Demo.BLANK_LINK} onClick={this.HandelFirstTabClick}>
              <label
                className="header-new-submissions"
                style={{ color: this.state.tabcolor }}
              >
                New Submissions
              </label>
            </a>
          </span>
          <span>
            <a href={Demo.BLANK_LINK} onClick={this.HandelSecoundTabClick}>
              <label
                className="header-new-submissions-1"
                style={{ color: this.state.tabcolor1 }}
              >
                Knowledge Base List
              </label>
            </a>
          </span>

          <button
            className="kb-Header-button"
            onClick={this.openAddNewKBModal.bind(this)}
          >
            Add New KB
          </button>
        </div>
        <div
          className="main-content-kb"
          style={{ display: this.state.headerfirst }}
        >
          <div className="main-content-margin">
            <div className="row" style={{ padding: "35px 35px 10px 35px" }}>
              <div className="col-md-6">
                <label className="main-conenet-point">
                  {this.state.countNotApprove} ITEMS
                </label>
                {this.state.kbClearNew && (
                  <small
                    className="clear-search"
                    onClick={this.handleKBList.bind(this)}
                  >
                    Clear Search
                  </small>
                )}
              </div>
              <div className="col-md-6" style={{ textAlign: "end" }}>
                <div className="kb-search-cntr" onClick={this.opneSearchModal}>
                  <label className="search-KB">SEARCH</label>
                  <img
                    src={SerachIcon}
                    alt="serach-icon"
                    className="searchicon"
                  />
                </div>
              </div>
            </div>
            <div className="kb-table" style={{ padding: "0px 30px 30px 20px" }}>
              <ReactTable
                data={this.state.KBListnotApproveData}
                columns={[
                  {
                    Header: (
                      <span>
                        <div>
                          <label>ID</label>
                        </div>
                      </span>
                    ),
                    accessor: "kbid",
                    width: 100,
                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label>{row.original.kbid}</label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <label>
                          Subject <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "subject",
                    minWidth: 175,
                    Cell: (row) => {
                      return (
                        <span className="table-details-data">
                          <label className="table-details-data">
                            {row.original.subject}
                          </label>

                          <img
                            src={DownArrowIcon}
                            alt="down-arrow-icon"
                            className="down-icon-kb"
                            onClick={() => this.HandelOnenCloseDetailsCollapse}
                            id={"i" + row.original.kbid}
                          />

                          <UncontrolledCollapse
                            toggler={"#i" + row.original.kbid}
                          >
                            <Card>
                              <CardBody>
                                <span className="table-details-data-1">
                                  {ReactHtmlParser(row.original.description)}
                                </span>
                              </CardBody>
                            </Card>
                          </UncontrolledCollapse>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "issueTypeName",
                          "notapprove",
                          "IssueType"
                        )}
                      >
                        <label className={this.state.issueColor}>
                          Type <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "issueTypeName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-type-return">
                              {row.original.issueTypeName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },

                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "categoryName",
                          "notapprove",
                          "Category"
                        )}
                      >
                        <label className={this.state.categoryColor}>
                          Category <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "categoryName",
                    Cell: (row) => {
                      return (
                        <span>
                          <label className="table-category">
                            {row.original.categoryName}
                          </label>{" "}
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "subCategoryName",
                          "notapprove",
                          "SubCategory"
                        )}
                      >
                        <label className={this.state.subCategoryColor}>
                          Sub catogory <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "subCategoryName",
                    Cell: (row) => {
                      return (
                        <span>
                          <label className="table-subcategory">
                            {row.original.subCategoryName}{" "}
                          </label>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <label className="pad">Action</label>
                      </span>
                    ),
                    accessor: "kbid",
                    width: 200,
                    Cell: (row) => {
                      return (
                        <span>
                          <button
                            className="reject-button"
                            value={row.original.kbid}
                            onClick={this.handleRejectKB.bind(
                              this,
                              row.original.kbid,
                              0
                            )}
                          >
                            <label className="reject-button-text">reject</label>
                          </button>
                          <button
                            className="aprove-button"
                            value={row.original.kbid}
                            onClick={this.openEditAproveBModal1.bind(
                              this,
                              row.original,
                              1
                            )}
                          >
                            <label className="approve-button-text">
                              APPROVE
                            </label>
                          </button>
                        </span>
                      );
                    },
                  },
                ]}
                // resizable={false}
                defaultPageSize={10}
                minRows={2}
                showPagination={true}
                getTrProps={this.HandleRowClickPage}
              />
            </div>

            <div className="kb-table" style={{ padding: "0px 30px 30px 20px" }}>
              <label className="main-conenet-point text-uppercase mb-2">
                Similar Type of Tickets
              </label>
              <ReactTable
                data={this.state.similarTickets}
                columns={[
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Ticket ID</label>
                        </div>
                      </span>
                    ),
                    accessor: "ticketID",
                    width: 100,
                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label
                              title={"Ticket ID"}
                              className="table-category knowticketID"
                            >
                              <Link
                                to={{
                                  pathname: "myticket",
                                  ticketDetailID: row.original.ticketID,
                                  isKB: true,
                                }}
                              >
                                {row.original.ticketID}
                              </Link>
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Ticket Tital</label>
                        </div>
                      </span>
                    ),
                    accessor: "subject",
                    width: 175,
                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.subject}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Type</label>
                        </div>
                      </span>
                    ),
                    accessor: "issueTypeName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.issueTypeName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Category</label>
                        </div>
                      </span>
                    ),
                    accessor: "categoryName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.categoryName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Sub Category</label>
                        </div>
                      </span>
                    ),
                    accessor: "subCategoryName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.subCategoryName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                ]}
                minRows={2}
                showPagination={true}
                defaultPageSize={5}
              />
            </div>
          </div>
        </div>

        <div
          className="main-content-kb"
          style={{ display: this.state.headersecound }}
        >
          <div className="main-content-margin">
            <div className="row" style={{ padding: "35px 35px 10px 35px" }}>
              <div className="col-md-6">
                <label className="main-conenet-point">
                  {this.state.countApprove} ITEMS
                </label>
                {this.state.kbClearList && (
                  <small
                    className="clear-search"
                    onClick={this.handleKBList.bind(this)}
                  >
                    Clear Search
                  </small>
                )}
              </div>
              <div className="col-md-6" style={{ textAlign: "end" }}>
                <div className="kb-search-cntr" onClick={this.opneSearchModal}>
                  <label className="search-KB">SEARCH</label>
                  <img
                    src={SerachIcon}
                    alt="serach-icon"
                    className="searchicon"
                  />
                </div>
              </div>
            </div>

            <div className="kb-table" style={{ padding: "0px 30px 30px 20px" }}>
              <ReactTable
                data={this.state.KBListData}
                columns={[
                  {
                    Header: (
                      <span>
                        <div>
                          <label>ID</label>
                        </div>
                      </span>
                    ),
                    accessor: "kbid",
                    width: 100,
                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label>{row.original.kbid}</label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <label>
                          Subject <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "subject",
                    minWidth: 175,
                    Cell: (row) => {
                      return (
                        <span className="table-details-data">
                          <label className="table-details-data">
                            {row.original.subject}
                          </label>
                          <img
                            src={DownArrowIcon}
                            alt="down-arrow-icon"
                            className="down-icon-kb"
                            onClick={() => this.HandelOnenCloseDetailsCollapse}
                            id={"i" + row.original.kbid}
                          />
                          <UncontrolledCollapse
                            toggler={"#i" + row.original.kbid}
                          >
                            <Card>
                              <CardBody>
                                <span className="table-details-data-1">
                                  {ReactHtmlParser(row.original.description)}
                                </span>
                              </CardBody>
                            </Card>
                          </UncontrolledCollapse>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "issueTypeName",
                          "approve",
                          "IssueType"
                        )}
                      >
                        <label className={this.state.issueColor}>
                          Type <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "issueTypeName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-type-return">
                              {row.original.issueTypeName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },

                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "categoryName",
                          "approve",
                          "Category"
                        )}
                      >
                        <label className={this.state.categoryColor}>
                          Category <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "categoryName",
                    Cell: (row) => {
                      return (
                        <span>
                          <label className="table-category">
                            {row.original.categoryName}
                          </label>{" "}
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span
                        onClick={this.StatusOpenModel.bind(
                          this,
                          "subCategoryName",
                          "approve",
                          "SubCategory"
                        )}
                      >
                        <label className={this.state.subCategoryColor}>
                          Sub catogory <FontAwesomeIcon icon={faCaretDown} />
                        </label>
                      </span>
                    ),
                    accessor: "subCategoryName",
                    Cell: (row) => {
                      return (
                        <span>
                          <label className="table-subcategory">
                            {row.original.subCategoryName}{" "}
                          </label>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <label className="pad">Action</label>
                      </span>
                    ),
                    accessor: "kbid",
                    width: 200,
                    Cell: (row) => {
                      return (
                        <>
                          <span>
                            <button
                              className="reject-button"
                              value={row.original.kbid}
                              onClick={this.handleDeleteKB.bind(
                                this,
                                row.original.kbid
                              )}
                            >
                              <label className="reject-button-text">
                                DELETE
                              </label>
                            </button>
                            <button
                              className="aprove-button"
                              value={row.original.kbid}
                              onClick={this.openEditAproveBModal.bind(
                                this,
                                row.original
                              )}
                            >
                              <label className="approve-button-text">
                                EDIT
                              </label>
                            </button>
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
                getTrProps={this.HandleRowClickPage}
              />
            </div>
            <div className="kb-table" style={{ padding: "0px 30px 30px 20px" }}>
              <label className="main-conenet-point text-uppercase mb-2">
                Similar Type of Tickets
              </label>
              <ReactTable
                data={this.state.similarTickets}
                columns={[
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Ticket ID</label>
                        </div>
                      </span>
                    ),
                    accessor: "ticketID",
                    width: 100,
                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label
                              title={"Ticket ID"}
                              className="table-category knowticketID"
                            >
                              <Link
                                to={{
                                  pathname: "myticket",
                                  ticketDetailID: row.original.ticketID,
                                  isKB: true,
                                }}
                              >
                                {row.original.ticketID}
                              </Link>
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Ticket Tital</label>
                        </div>
                      </span>
                    ),
                    accessor: "subject",
                    width: 175,
                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.subject}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Type</label>
                        </div>
                      </span>
                    ),
                    accessor: "issueTypeName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.issueTypeName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Category</label>
                        </div>
                      </span>
                    ),
                    accessor: "categoryName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.categoryName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                  {
                    Header: (
                      <span>
                        <div>
                          <label>Sub Category</label>
                        </div>
                      </span>
                    ),
                    accessor: "subCategoryName",

                    Cell: (row) => {
                      return (
                        <span>
                          <div>
                            <label className="table-category">
                              {row.original.subCategoryName}
                            </label>
                          </div>
                        </span>
                      );
                    },
                  },
                ]}
                minRows={2}
                showPagination={true}
                defaultPageSize={5}
              />
            </div>
          </div>
          {/* <div className="pagi">
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
                <a href={Demo.BLANK_LINK}>7</a>
              </li>
              <li>
                <a href={Demo.BLANK_LINK}>&gt;</a>
              </li>
            </ul>
          </div> */}
        </div>
        {/* ----------------------------------Search Modal------------------------------------ */}
        <Modal
          onClose={this.closeSearchModal}
          open={this.state.searchmodal}
          modalId="kb-search-popup"
          overlayId="kb-search-ovrly"
        >
          <div className="kb-Model-mp">
            <div className="">
              <img
                src={LeftBackIcon}
                alt="back-icon"
                className="back-button-left"
                onClick={this.closeSearchModal}
              />
              <label className="search-modal-text">SEARCH</label>
              <button
                className="search-button-modal"
                onClick={this.handleSeaechKB.bind(this)}
              >
                <label className="search-button-modal-text">APPLY</label>
              </button>
            </div>
            <br />
            <br />

            <div className="row">
              <select
                className="add-select-category"
                value={this.state.selectedCategory}
                onChange={this.setCategoryValue}
              >
                <option>Select Category</option>
                {this.state.CategoryData !== null &&
                  this.state.CategoryData.map((item, i) => (
                    <option key={i} value={item.categoryID}>
                      {item.categoryName}
                    </option>
                  ))}
              </select>
              {this.state.selectedCategory.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.searchCategoryCompulsion}
                </p>
              )}
            </div>
            <br />
            <div className="row">
              <select
                className="add-select-category"
                value={this.state.selectedSubCategory}
                onChange={this.setSubCategoryValue}
              >
                <option>Select Subcategory</option>
                {this.state.SubCategoryData !== null &&
                  this.state.SubCategoryData.map((item, i) => (
                    <option key={i} value={item.subCategoryID}>
                      {item.subCategoryName}
                    </option>
                  ))}
              </select>
              {this.state.selectedSubCategory.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.searchSubCategoryCompulsion}
                </p>
              )}
            </div>
            <br />
            <div className="row">
              <select
                className="add-select-category"
                value={this.state.selectedIssueType}
                onChange={this.setIssueType}
              >
                <option>Select IssueType</option>
                {this.state.IssueTypeData !== null &&
                  this.state.IssueTypeData.map((item, i) => (
                    <option key={i} value={item.issueTypeID}>
                      {item.issueTypeName}
                    </option>
                  ))}
              </select>
              {this.state.selectedIssueType.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.searchIssueCompulsion}
                </p>
              )}
            </div>
            <br />
          </div>
        </Modal>

        {/* -----------------------------------------------END---------------------------------------- */}
        {/* ---------------------------------------ADD NEW KB MODAL----------------------------------- */}

        <Modal
          onClose={this.closeAddNewKBModal.bind(this)}
          open={this.state.addnewkbmodal}
          modalId="addkb-modal-popup"
          overlayId="addkb-modal-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cancel-button-modal-icon"
            onClick={this.closeAddNewKBModal.bind(this)}
          />
          <div>
            <div className="kb-Model-mp">
              <div className="">
                <label className="search-modal-text">ADD</label>
              </div>
              <br />

              <div className="row">
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedCategory}
                    onChange={this.setCategoryValue}
                  >
                    <option value="">Select Category</option>
                    {this.state.CategoryData !== null &&
                      this.state.CategoryData.map((item, i) => (
                        <option key={i} value={item.categoryID}>
                          {item.categoryName}
                        </option>
                      ))}
                  </select>
                  {this.state.selectedCategory.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.categoryCompulsion}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedSubCategory}
                    onChange={this.setSubCategoryValue}
                  >
                    <option value="">Select Subcategory</option>
                    {this.state.SubCategoryData !== null &&
                      this.state.SubCategoryData.map((item, i) => (
                        <option key={i} value={item.subCategoryID}>
                          {item.subCategoryName}
                        </option>
                      ))}
                  </select>
                  {this.state.selectedSubCategory.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.subCategoryCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedIssueType}
                    onChange={this.setIssueType}
                  >
                    <option value="">Select IssueType</option>
                    {this.state.IssueTypeData !== null &&
                      this.state.IssueTypeData.map((item, i) => (
                        <option key={i} value={item.issueTypeID}>
                          {item.issueTypeName}
                        </option>
                      ))}
                  </select>
                  {this.state.selectedIssueType.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.issueTypeCompulsion}
                    </p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="addkb-subject"
                    placeholder=" Write subject here"
                    value={this.state.selectedSubject}
                    onChange={this.setSubjectValue}
                  />
                  {this.state.selectedSubject.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.subjectCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12 KBas">
                  <CKEditor
                    data={this.state.ckeditorAdd}
                    onChange={this.onAddCKEditorChange}
                    config={{
                      toolbar: [
                        {
                          name: "basicstyles",
                          items: ["Bold", "Italic", "Strike"],
                        },
                        {
                          name: "styles",
                          items: ["Styles", "Format"],
                        },
                        {
                          name: "paragraph",
                          items: ["NumberedList", "BulletedList"],
                        },
                        {
                          name: "links",
                          items: ["Link", "Unlink"],
                        },
                        {
                          name: "insert",
                          items: ["Image", "Table"],
                        },
                        {
                          name: "tools",
                          items: ["Maximize"],
                        },
                        {
                          name: "editing",
                          items: ["Scayt"],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row" style={{ float: "right" }}>
                <button
                  type="button"
                  className="cancel-button-modalk"
                  onClick={this.closeAddNewKBModal.bind(this)}
                >
                  CANCEL
                </button>
                <button
                  className="add-kb-button-modal"
                  onClick={this.handleAddKB.bind(this)}
                >
                  <label className="add-kb-button-text-modal">SAVE</label>
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* -----------------------------------------------END---------------------------------------- */}
        {/* ---------------------------------------update MODAL----------------------------------- */}

        <Modal
          onClose={this.closeEditAproveModal.bind(this)}
          open={this.state.editapprove}
          modalId="addkb-modal-popup"
          overlayId="addkb-modal-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cancel-button-modal-icon"
            onClick={this.closeEditAproveModal.bind(this)}
          />
          <div>
            <div className="kb-Model-mp">
              <div className="">
                <label className="search-modal-text">CONFIRM</label>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedCategory}
                    onChange={this.setCategoryValue}
                  >
                    <option value={this.state.updateCategoryValue} selected>
                      {this.state.updateCategoryName}
                    </option>
                    {this.state.CategoryData !== null &&
                      this.state.CategoryData.map((item, i) => (
                        <option key={i} value={item.categoryID}>
                          {item.categoryName}
                        </option>
                      ))}
                    {this.state.updateCategoryValue.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.updateCategoryCompulsion}
                      </p>
                    )}
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedSubCategory}
                    onChange={this.setSubCategoryValue}
                    onClick={this.handleGetSubCategoryList.bind(this)}
                  >
                    <option value={this.state.updateSubCategoryValue} selected>
                      {this.state.updateSubCategoryName}{" "}
                    </option>
                    {this.state.SubCategoryData !== null &&
                      this.state.SubCategoryData.map((item, i) => (
                        <option key={i} value={item.subCategoryID}>
                          {item.subCategoryName}
                        </option>
                      ))}
                  </select>
                  {this.state.updateSubCategoryValue.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.updateSubCategoryCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedIssueType}
                    onChange={this.setIssueType}
                    onClick={this.handleGetIssueTypeList.bind(this)}
                  >
                    <option value={this.state.updateIssurTypeValue} selected>
                      {this.state.updateIssueTypeName}
                    </option>
                    {this.state.IssueTypeData !== null &&
                      this.state.IssueTypeData.map((item, i) => (
                        <option key={i} value={item.issueTypeID}>
                          {item.issueTypeName}
                        </option>
                      ))}
                  </select>
                  {this.state.updateIssurTypeValue.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.updateIssueTypeCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="addkb-subject"
                    placeholder="Can I purchase a domain through Google?"
                    value={this.state.updateSubject}
                    onChange={this.setUpdateSubjectValue}
                  />
                  {this.state.updateSubject.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.updateSubjectCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <br />
              <div className="row KBase">
                <div className="col-md-12">
                  <CKEditor
                    data={this.state.updateDescription}
                    onChange={this.onUpdateCKEditorChange}
                    config={{
                      toolbar: [
                        {
                          name: "basicstyles",
                          items: ["Bold", "Italic", "Strike"],
                        },
                        {
                          name: "styles",
                          items: ["Styles", "Format"],
                        },
                        {
                          name: "paragraph",
                          items: ["NumberedList", "BulletedList"],
                        },
                        {
                          name: "links",
                          items: ["Link", "Unlink"],
                        },
                        {
                          name: "insert",
                          items: ["Image", "Table"],
                        },
                        {
                          name: "tools",
                          items: ["Maximize"],
                        },
                        {
                          name: "editing",
                          items: ["Scayt"],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row" style={{ float: "right" }}>
                <div className="col-md-12">
                  <button
                    type="button"
                    className="cancel-button-modalk"
                    onClick={this.closeEditAproveModal.bind(this)}
                  >
                    CANCEL
                  </button>
                  <button
                    className="add-kb-button-modal"
                    onClick={this.handleUpdateKB.bind(
                      this,
                      this.state.updateKBID
                    )}
                  >
                    <label className="add-kb-button-text-modal">EDIT</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* -----------------------------------------------END---------------------------------------- */}
        {/* ---------------------------------------Approve MODAL----------------------------------- */}

        <Modal
          onClose={this.closeEditAproveModal1.bind(this)}
          open={this.state.editapprove1}
          modalId="addkb-modal-popup"
          overlayId="addkb-modal-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cancel-button-modal-icon"
            onClick={this.closeEditAproveModal1.bind(this)}
          />
          <div>
            <div className="kb-Model-mp">
              <div className="">
                <label className="search-modal-text">CONFIRM</label>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedCategory}
                    onChange={this.setCategoryValue}
                  >
                    <option value={this.state.approveCategoryValue}>
                      {this.state.approveCategoryName}
                    </option>
                    {this.state.CategoryData !== null &&
                      this.state.CategoryData.map((item, i) => (
                        <option key={i} value={item.categoryID}>
                          {item.categoryName}
                        </option>
                      ))}
                    {this.state.approveCategoryValue.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.approveCategoryCompulsion}
                      </p>
                    )}
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedSubCategory}
                    onChange={this.setSubCategoryValue}
                    onClick={this.handleGetSubCategoryList.bind(this)}
                  >
                    <option value={this.state.approveSubCategoryValue}>
                      {this.state.approveSubCategoryName}{" "}
                    </option>
                    {this.state.SubCategoryData !== null &&
                      this.state.SubCategoryData.map((item, i) => (
                        <option key={i} value={item.subCategoryID}>
                          {item.subCategoryName}
                        </option>
                      ))}
                  </select>
                  {this.state.approveSubCategoryValue.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.approveSubCategoryCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <select
                    className="add-select-category"
                    value={this.state.selectedIssueType}
                    onChange={this.setIssueType}
                    onClick={this.handleGetIssueTypeList.bind(this)}
                  >
                    <option value={this.state.approveIssurTypeValue}>
                      {this.state.approveIssueTypeName}
                    </option>
                    {this.state.IssueTypeData !== null &&
                      this.state.IssueTypeData.map((item, i) => (
                        <option key={i} value={item.issueTypeID}>
                          {item.issueTypeName}
                        </option>
                      ))}
                  </select>
                  {this.state.approveIssurTypeValue.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.approveIssueTypeCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="addkb-subject"
                    placeholder="Can I purchase a domain through Google?"
                    value={this.state.approveSubject}
                    onChange={this.setApproveSubjectValue}
                  />
                  {this.state.approveSubject.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.approveSubjectCompulsion}
                    </p>
                  )}
                </div>
              </div>
              <br />
              <div className="row KBase">
                <div className="col-md-12">
                  <CKEditor
                    data={this.state.approveDescription}
                    onChange={this.onApproveCKEditorChange}
                    config={{
                      toolbar: [
                        {
                          name: "basicstyles",
                          items: ["Bold", "Italic", "Strike"],
                        },
                        {
                          name: "styles",
                          items: ["Styles", "Format"],
                        },
                        {
                          name: "paragraph",
                          items: ["NumberedList", "BulletedList"],
                        },
                        {
                          name: "links",
                          items: ["Link", "Unlink"],
                        },
                        {
                          name: "insert",
                          items: ["Image", "Table"],
                        },
                        {
                          name: "tools",
                          items: ["Maximize"],
                        },
                        {
                          name: "editing",
                          items: ["Scayt"],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row" style={{ float: "right" }}>
                <div className="col-md-12">
                  <button
                    type="button"
                    className="cancel-button-modalk"
                    onClick={this.closeEditAproveModal1.bind(this)}
                  >
                    CANCEL
                  </button>
                  <button
                    className="add-kb-button-modal"
                    onClick={this.handleRejectKB.bind(
                      this,
                      this.state.approveID,
                      this.state.approvebit
                    )}
                  >
                    <label className="add-kb-button-text-modal">APPROVE</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* -----------------------------------------------END---------------------------------------- */}
      </Fragment>
    );
  }
}

export default KnowledgeBase;
