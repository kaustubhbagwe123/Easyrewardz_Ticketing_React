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
      tempfileUploadLog: []
    };

    this.handleGetFileUploadLog = this.handleGetFileUploadLog.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
  }

  componentDidMount() {
    this.handleGetFileUploadLog();
  }

  handleGetFileUploadLog() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/File/GetFileUploadLogs",
      headers: authHeader()
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
      .catch(data => {
        console.log(data);
      });
  }

  StatusOpenModel(data, header) {
    this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
  }
  StatusCloseModel() {
    debugger;
    if (this.state.tempfileUploadLog.length > 0) {
      this.setState({
        StatusModel: false,
        fileUploadLog: this.state.tempfileUploadLog,
        sFilterCheckbox: "",
        filterTxtValue: ""
      });
    } else {
      this.setState({
        StatusModel: false,
        fileUploadLog: this.state.sortAllData,
        sFilterCheckbox: "",
        filterTxtValue: ""
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
          keys: ["fileType"]
        }
      );
      if (sortFilterFileType.length > 0) {
        this.setState({ sortFilterFileType });
      } else {
        this.setState({
          sortFilterFileType: this.state.sortFileType
        });
      }
    }
    if (this.state.sortColumn === "fileName") {
      var sortFilterFileName = matchSorter(
        this.state.sortFileName,
        e.target.value,
        {
          keys: ["fileName"]
        }
      );
      if (sortFilterFileName.length > 0) {
        this.setState({ sortFilterFileName });
      } else {
        this.setState({
          sortFilterFileName: this.state.sortFileName
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
          sortFilterCreatedDate: this.state.sortCreatedDate
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
          sortFilterStatus: this.state.sortStatus
        });
      }
    }
  }
  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.fileUploadLog;

    itemsArray.sort(function(a, b) {
      return a.fileUploadStatus > b.fileUploadStatus ? 1 : -1;
    });

    this.setState({
      fileUploadLog: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.fileUploadLog;
    itemsArray.sort((a, b) => {
      return a.fileUploadStatus < b.fileUploadStatus;
    });
    this.setState({
      fileUploadLog: itemsArray
    });
    this.StatusCloseModel();
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];
    var sFilterCheckbox = this.state.sFilterCheckbox;

    var allData = this.state.sortAllData;
    if (type === "value" && type !== "All") {
      if (sFilterCheckbox.includes(e.currentTarget.value)) {
        sFilterCheckbox = sFilterCheckbox.replace(
          e.currentTarget.value + ",",
          ""
        );
      } else {
        sFilterCheckbox += e.currentTarget.value + ",";
      }
    }

    this.setState({
      sFilterCheckbox,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: ""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "fileType") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.fileType === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        issueColor: "sort-column"
      });
    } else if (column === "fileName") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.fileName === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        nameColor: "sort-column"
      });
    } else if (column === "createdDate") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.Date === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column"
      });
    } else if (column === "fileUploadStatus") {
      var sItems = sFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              a => a.fileUploadStatus === sItems[i]
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
        statusColor: "sort-column"
      });
    }

    this.setState({
      tempfileUploadLog: itemsArray
    });
    // this.StatusCloseModel();
  };

  render() {
    const columnsTickFileUpload = [
      {
        Header: (
          <span onClick={this.StatusOpenModel.bind(this, "fileType", "Type")}>
            Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "fileType"
      },
      {
        Header: (
          <span onClick={this.StatusOpenModel.bind(this, "fileName", "Name")}>
            File Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "fileName"
      },
      {
        Header: (
          <span
            onClick={this.StatusOpenModel.bind(this, "createdDate", "Date")}
          >
            Date
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "date",
        Cell: row => {
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
                            Created By: {row.original.createdBy}
                          </p>
                        </b>
                        <p className="sub-title">
                          Created Date: {row.original.createdDate}
                        </p>
                      </div>
                      <div>
                        <b>
                          <p className="title">
                            Updated By: {row.original.modifiedBy}
                          </p>
                        </b>
                        <p className="sub-title">
                          Updated Date: {row.original.modifiedDate}
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
        }
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
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "fileUploadStatus"
      },
      {
        Header: <span>Error File</span>,
        accessor: "Erroor",
        Cell: row => (
          <div>
            <button className="downloadBtn">
              DOWNLOAD
              {/* <label className="lblDownloadbtn">DOWNLOAD</label> */}
            </button>
          </div>
        )
      },
      {
        Header: <span>Success File</span>,
        accessor: "success",
        Cell: row => (
          <div>
            <button className="downloadBtn">
              DOWNLOAD
              {/* <label className="lblDownloadbtn">DOWNLOAD</label> */}
            </button>
          </div>
        )
      }
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
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            File Upload Logs
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

export default FileUploadLogs;
