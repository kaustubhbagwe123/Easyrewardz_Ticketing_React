import React, { Component } from "react";
import Demo from "./../../store/Hashtag.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import Modal from "react-bootstrap/Modal";
import matchSorter from "match-sorter";
import Sorting from "./../../assets/Images/sorting.png";
import { MyContext } from './../../context'

class FileUploadLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploadLog: [],
      sortAllData: [],
      sortFileType: [],
      sortFileName: [],
      sortCreatedDate: [],
      sortStatus: [],
      sortFilterFileType: [],
      sortFilterFileName: [],
      sortFilterCreatedDate: [],
      sortFilterStatus: [],
      sortColumn: "",
      StatusModel: false,
      sortHeader: "",
      sFilterCheckbox: "",
      filterTxtValue: "",
      tempfileUploadLog: [],
      sfileTypeFilterCheckbox: "",
      sfileNameFilterCheckbox: "",
      screatedDateFilterCheckbox: "",
      sfileUploadStatusFilterCheckbox: "",
      isortA: false,
    };

    this.handleGetFileUploadLog = this.handleGetFileUploadLog.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
  }

  componentDidMount() {
    this.handleGetFileUploadLog();
  }

  downloadDefaultReport = (csvFile) => {
    debugger;
    // window.open(
    //   "https://ertktapi.dcdev.brainvire.net/ReportDownload/DefaultReport_202004061846089363.csv"
    // );
    window.open(csvFile);
  };

  handleGetFileUploadLog() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/File/GetFileUploadLogs",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let fileUploadLog = res.data.responseData;
        if (fileUploadLog !== null) {
          self.state.sortAllData = fileUploadLog;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].fileType]) {
              distinct.push(fileUploadLog[i].fileType);
              unique[fileUploadLog[i].fileType] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortFileType.push({ fileType: distinct[i] });
            self.state.sortFilterFileType.push({ fileType: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].fileName]) {
              distinct.push(fileUploadLog[i].fileName);
              unique[fileUploadLog[i].fileName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortFileName.push({ fileName: distinct[i] });
            self.state.sortFilterFileName.push({ fileName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].date]) {
              distinct.push(fileUploadLog[i].date);
              unique[fileUploadLog[i].date] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedDate.push({ createdDate: distinct[i] });
            self.state.sortFilterCreatedDate.push({ createdDate: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].fileUploadStatus]) {
              distinct.push(fileUploadLog[i].fileUploadStatus);
              unique[fileUploadLog[i].fileUploadStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ fileUploadStatus: distinct[i] });
            self.state.sortFilterStatus.push({ fileUploadStatus: distinct[i] });
          }
        }
        if (fileUploadLog !== null && fileUploadLog !== undefined) {
          self.setState({ fileUploadLog });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterFileType.length === 0 ||
      this.state.sortFilterFileName.length === 0 ||
      this.state.sortFilterCreatedDate.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }

    if (data === "fileType") {
      if (
        this.state.sfileNameFilterCheckbox !== "" ||
        this.state.screatedDateFilterCheckbox !== "" ||
        this.state.sfileUploadStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileNameFilterCheckbox: "",
          screatedDateFilterCheckbox: "",
          sfileUploadStatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "fileName") {
      if (
        this.state.sfileTypeFilterCheckbox !== "" ||
        this.state.screatedDateFilterCheckbox !== "" ||
        this.state.sfileUploadStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileTypeFilterCheckbox: "",
          screatedDateFilterCheckbox: "",
          sfileUploadStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdDate") {
      if (
        this.state.sfileTypeFilterCheckbox !== "" ||
        this.state.sfileNameFilterCheckbox !== "" ||
        this.state.sfileUploadStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileTypeFilterCheckbox: "",
          sfileNameFilterCheckbox: "",
          sfileUploadStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "fileUploadStatus") {
      if (
        this.state.sfileTypeFilterCheckbox !== "" ||
        this.state.sfileNameFilterCheckbox !== "" ||
        this.state.screatedDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileTypeFilterCheckbox: "",
          sfileNameFilterCheckbox: "",
          screatedDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    debugger;
    if (this.state.tempfileUploadLog.length > 0) {
      this.setState({
        StatusModel: false,
        fileUploadLog: this.state.tempfileUploadLog,
        filterTxtValue: "",
        sortFilterFileType: this.state.sortFileType,
        sortFilterFileName: this.state.sortFileName,
        sortFilterCreatedDate: this.state.sortCreatedDate,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "fileType") {
        if (this.state.sfileTypeFilterCheckbox === "") {
        } else {
          this.setState({
            sfileNameFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
            sfileUploadStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "fileName") {
        if (this.state.sfileNameFilterCheckbox === "") {
        } else {
          this.setState({
            sfileTypeFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
            sfileUploadStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdDate") {
        if (this.state.screatedDateFilterCheckbox === "") {
        } else {
          this.setState({
            sfileTypeFilterCheckbox: "",
            sfileNameFilterCheckbox: "",
            sfileUploadStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "fileUploadStatus") {
        if (this.state.sfileUploadStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sfileTypeFilterCheckbox: "",
            sfileNameFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        fileUploadLog: this.state.isortA
          ? this.state.fileUploadLog
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterFileType: this.state.sortFileType,
        sortFilterFileName: this.state.sortFileName,
        sortFilterCreatedDate: this.state.sortCreatedDate,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  }

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "fileType") {
      var sortFilterFileType = matchSorter(
        this.state.sortFileType,
        e.target.value,
        {
          keys: ["fileType"],
        }
      );
      if (sortFilterFileType.length > 0) {
        this.setState({ sortFilterFileType });
      } else {
        this.setState({
          sortFilterFileType: this.state.sortFileType,
        });
      }
    }
    if (this.state.sortColumn === "fileName") {
      var sortFilterFileName = matchSorter(
        this.state.sortFileName,
        e.target.value,
        {
          keys: ["fileName"],
        }
      );
      if (sortFilterFileName.length > 0) {
        this.setState({ sortFilterFileName });
      } else {
        this.setState({
          sortFilterFileName: this.state.sortFileName,
        });
      }
    }
    if (this.state.sortColumn === "createdDate") {
      var sortFilterCreatedDate = matchSorter(
        this.state.sortCreatedDate,
        e.target.value,
        { keys: ["createdDate"] }
      );
      if (sortFilterCreatedDate.length > 0) {
        this.setState({ sortFilterCreatedDate });
      } else {
        this.setState({
          sortFilterCreatedDate: this.state.sortCreatedDate,
        });
      }
    }
    if (this.state.sortColumn === "fileUploadStatus") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["fileUploadStatus"] }
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
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.fileUploadLog;

    if (this.state.sortColumn === "fileType") {
      itemsArray.sort((a, b) => {
        if (a.fileType < b.fileType) return 1;
        if (a.fileType > b.fileType) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "fileName") {
      itemsArray.sort((a, b) => {
        if (a.fileName < b.fileName) return 1;
        if (a.fileName > b.fileName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort((a, b) => {
        if (a.createdDate < b.createdDate) return 1;
        if (a.createdDate > b.createdDate) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "fileUploadStatus") {
      itemsArray.sort((a, b) => {
        if (a.fileUploadStatus < b.fileUploadStatus) return 1;
        if (a.fileUploadStatus > b.fileUploadStatus) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      fileUploadLog: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;

    var itemsArray = [];
    itemsArray = this.state.fileUploadLog;

    if (this.state.sortColumn === "fileType") {
      itemsArray.sort((a, b) => {
        if (a.fileType < b.fileType) return -1;
        if (a.fileType > b.fileType) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "fileName") {
      itemsArray.sort((a, b) => {
        if (a.fileName < b.fileName) return -1;
        if (a.fileName > b.fileName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort((a, b) => {
        if (a.createdDate < b.createdDate) return -1;
        if (a.createdDate > b.createdDate) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "fileUploadStatus") {
      itemsArray.sort((a, b) => {
        if (a.fileUploadStatus < b.fileUploadStatus) return -1;
        if (a.fileUploadStatus > b.fileUploadStatus) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      fileUploadLog: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sfileTypeFilterCheckbox = this.state.sfileTypeFilterCheckbox;
    var sfileNameFilterCheckbox = this.state.sfileNameFilterCheckbox;
    var screatedDateFilterCheckbox = this.state.screatedDateFilterCheckbox;
    var sfileUploadStatusFilterCheckbox = this.state
      .sfileUploadStatusFilterCheckbox;
    if (column === "fileType" || column === "all") {
      if (type === "value" && type !== "All") {
        sfileTypeFilterCheckbox = sfileTypeFilterCheckbox.replace("all", "");
        sfileTypeFilterCheckbox = sfileTypeFilterCheckbox.replace("all,", "");
        if (sfileTypeFilterCheckbox.includes(e.currentTarget.value)) {
          sfileTypeFilterCheckbox = sfileTypeFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sfileTypeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sfileTypeFilterCheckbox.includes("all")) {
          sfileTypeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "fileType") {
            for (let i = 0; i < this.state.sortFileType.length; i++) {
              sfileTypeFilterCheckbox +=
                this.state.sortFileType[i].fileType + ",";
            }
            sfileTypeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "fileName" || column === "all") {
      if (type === "value" && type !== "All") {
        sfileNameFilterCheckbox = sfileNameFilterCheckbox.replace("all", "");
        sfileNameFilterCheckbox = sfileNameFilterCheckbox.replace("all,", "");
        if (sfileNameFilterCheckbox.includes(e.currentTarget.value)) {
          sfileNameFilterCheckbox = sfileNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sfileNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sfileNameFilterCheckbox.includes("all")) {
          sfileNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "fileName") {
            for (let i = 0; i < this.state.sortFileName.length; i++) {
              sfileNameFilterCheckbox +=
                this.state.sortFileName[i].fileName + ",";
            }
            sfileNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdDate" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all",
          ""
        );
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (screatedDateFilterCheckbox.includes(e.currentTarget.value)) {
          screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedDateFilterCheckbox.includes("all")) {
          screatedDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdDate") {
            for (let i = 0; i < this.state.sortCreatedDate.length; i++) {
              screatedDateFilterCheckbox +=
                this.state.sortCreatedDate[i].createdDate + ",";
            }
            screatedDateFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "fileUploadStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sfileUploadStatusFilterCheckbox = sfileUploadStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sfileUploadStatusFilterCheckbox = sfileUploadStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sfileUploadStatusFilterCheckbox.includes(e.currentTarget.value)) {
          sfileUploadStatusFilterCheckbox = sfileUploadStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sfileUploadStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sfileUploadStatusFilterCheckbox.includes("all")) {
          sfileUploadStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "fileUploadStatus") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sfileUploadStatusFilterCheckbox +=
                this.state.sortStatus[i].fileUploadStatus + ",";
            }
            sfileUploadStatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sfileTypeFilterCheckbox,
      sfileNameFilterCheckbox,
      screatedDateFilterCheckbox,
      sfileUploadStatusFilterCheckbox,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "fileType") {
      var sItems = sfileTypeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.fileType === sItems[i]
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
    } else if (column === "fileName") {
      var sItems = sfileNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.fileName === sItems[i]
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
        nameColor: "sort-column",
      });
    } else if (column === "createdDate") {
      var sItems = screatedDateFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.Date === sItems[i]);
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
    } else if (column === "fileUploadStatus") {
      var sItems = sfileUploadStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.fileUploadStatus === sItems[i]
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
      tempfileUploadLog: itemsArray,
    });
    // this.StatusCloseModel();
  };

  render() {
    const TranslationContext = this.context.state.translateLanguage.default
    const columnsTickFileUpload = [
      {
        Header: (
          <span onClick={this.StatusOpenModel.bind(this, "fileType", "Type")}>
            
            {
              (() => {
                if (TranslationContext!==undefined) {
                  return TranslationContext.span.type
                  }
                  else{
                    return "Type"
                  }
                })()
            }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        sortable: false,
        accessor: "fileType",
      },
      {
        Header: (
          <span onClick={this.StatusOpenModel.bind(this, "fileName", "Name")}>

            {
              (() => {
                if (TranslationContext!==undefined) {
                  return TranslationContext.span.filename
                  }
                  else{
                    return "File Name"
                  }
                })()
            }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        sortable: false,
        accessor: "fileName",
      },
      {
        Header: (
          <span onClick={this.StatusOpenModel.bind(this, "createdDate", "Date")}
          >
            {
              (() => {
                if (TranslationContext!==undefined) {
                  return TranslationContext.span.date
                  }
                  else{
                    return "Date"
                  }
                })()
            }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        sortable: false,
        accessor: "date",
        Cell: (row) => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                {row.original.date}
                <Popover
                  content={
                    <>
                      <div>
                        <b>
                          <p className="title">
                            
                            {
                              (() => {
                                if (TranslationContext !== undefined) {
                                  return TranslationContext.p.createdby
                                }
                                else {
                                  return "Created By:"
                                }
                              })()
                            }
                             {row.original.createdDate}
                          </p>
                        </b>
                        <p className="sub-title">
                          {
                              (() => {
                                if (TranslationContext !== undefined) {
                                  return TranslationContext.p.createddate
                                }
                                else {
                                  return "Created Date:"
                                }
                              })()
                            } {row.original.createdDate}
                        </p>
                      </div>
                      <div>
                        <b>
                          <p className="title"> 
                            {
                              (() => {
                                if (TranslationContext !== undefined) {
                                  return TranslationContext.p.updatedby
                                }
                                else {
                                  return "Updated By:"
                                }
                              })()
                            }
                            {row.original.modifiedBy}
                          </p>
                        </b>
                        <p className="sub-title">
                          {
                              (() => {
                                if (TranslationContext !== undefined) {
                                  return TranslationContext.p.updateddate
                                }
                                else {
                                  return "Updated Date:"
                                }
                              })()
                            }
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
      },
      {
        Header: (
          <span
            onClick={this.StatusOpenModel.bind(
              this,
              "fileUploadStatus",
              "Status"
            )}
          >
            {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.span.status
                }
                else {
                  return "Status"
                }
              })()
            }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        sortable: false,
        accessor: "fileUploadStatus",
      },
      {
        Header: <span>
          {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.span.errorfile
                }
                else {
                  return "Error File"
                }
              })()
            }
        </span>,
        accessor: "Erroor",
        sortable: false,
        Cell: (row) =>
          row.original.fileUploadStatus === "Completed" &&
          row.original.errorFilePath && (
            <div>
              <button
                className="downloadBtn"
                onClick={this.downloadDefaultReport.bind(
                  this,
                  row.original.errorFilePath
                )}
              >
                {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.button.download
                }
                else {
                  return "DOWNLOAD"
                }
              })()
            }
              </button>
            </div>
          ),
      },
      {
        Header: <span>
          {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.span.successfile
                }
                else {
                  return "Success File"
                }
              })()
            }
        </span>,
        accessor: "success",
        Cell: (row) =>
          row.original.fileUploadStatus === "Completed" &&
          row.original.successFilePath && (
            <div>
              <button
                className="downloadBtn"
                onClick={this.downloadDefaultReport.bind(
                  this,
                  row.original.successFilePath
                )}
              >
                {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.button.download
                }
                else {
                  return "DOWNLOAD"
                }
              })()
            }
              </button>
            </div>
          ),
      },
    ];

    return (
      <div className="mainDivPadding">
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel.bind(this)}
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
                  {
                      (() => {
                        if (TranslationContext !== undefined) {
                          return TranslationContext.p.sortatoz
                        }
                        else {
                          return "SORT BY A TO Z"
                        }
                      })()
                    }
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
                  {
                      (() => {
                        if (TranslationContext !== undefined) {
                          return TranslationContext.p.sortztoa
                        }
                        else {
                          return "SORT BY Z TO A"
                        }
                      })()
                    }
                  </p>
                </div>
              </div>
              <a
                href="#!"
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {
                  (() => {
                    if (TranslationContext !== undefined) {
                      return TranslationContext.a.clearsearch
                    }
                    else {
                      return "clear search"
                    }
                  })()
                }
              </a>
              <div className="filter-type">
                <p>
                {
                    (() => {
                      if (TranslationContext !== undefined) {
                        return TranslationContext.p.filterbytype
                      }
                      else {
                        return "FILTER BY TYPE"
                      }
                    })()
                  }
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
                        this.state.sfileTypeFilterCheckbox.includes("all") ||
                        this.state.sfileNameFilterCheckbox.includes("all") ||
                        this.state.screatedDateFilterCheckbox.includes("all") ||
                        this.state.sfileUploadStatusFilterCheckbox.includes(
                          "all"
                        )
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "fileType"
                    ? this.state.sortFilterFileType !== null &&
                      this.state.sortFilterFileType.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.fileType}
                            value={item.fileType}
                            checked={this.state.sfileTypeFilterCheckbox.includes(
                              item.fileType
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "fileType",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.fileType}>
                            <span className="table-btn table-blue-btn">
                              {item.fileType}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "fileName"
                    ? this.state.sortFilterFileName !== null &&
                      this.state.sortFilterFileName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.fileName}
                            value={item.fileName}
                            checked={this.state.sfileNameFilterCheckbox.includes(
                              item.fileName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "fileName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.fileName}>
                            <span className="table-btn table-blue-btn">
                              {item.fileName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdDate"
                    ? this.state.sortFilterCreatedDate !== null &&
                      this.state.sortFilterCreatedDate.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdDate}
                            value={item.createdDate}
                            checked={this.state.screatedDateFilterCheckbox.includes(
                              item.createdDate
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdDate",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdDate}>
                            <span className="table-btn table-blue-btn">
                              {item.createdDate}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "fileUploadStatus"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.fileUploadStatus}
                            value={item.fileUploadStatus}
                            checked={this.state.sfileUploadStatusFilterCheckbox.includes(
                              item.fileUploadStatus
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "fileUploadStatus",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.fileUploadStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.fileUploadStatus}
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
            {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.link.setting
                }
                else {
                  return "Settings"
                }
              })()
            }
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.link.ticketing
                }
                else {
                  return "Ticketing"
                }
              })()
            }
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.link.fileupload
                }
                else {
                  return "File Upload Logs"
                }
              })()
            }
          </Link>
        </div>
        <br />
        <div className="fileUploadTable TicketFileUploadReact settingtable">
          <ReactTable
            minRows={2}
            data={this.state.fileUploadLog}
            columns={columnsTickFileUpload}
            resizable={false}
            defaultPageSize={5}
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
    );
  }
}

FileUploadLogs.contextType = MyContext;
export default FileUploadLogs;
