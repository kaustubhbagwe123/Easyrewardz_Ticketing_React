import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import { Popover } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
import matchSorter from "match-sorter";
import Sorting from "./../../../assets/Images/sorting.png";

class BlockEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddBlockEmailPopup: false,
      BlockEmailData: [],
      loading: false,
      BlockEmailID: 0,
      EmailIDs: "",
      Reason: "",
      errors: {},
      sortAllData: [],
      semailIDFilterCheckbox: "",
      sreasonFilterCheckbox: "",
      sblockedDateFilterCheckbox: "",
      sblockedByFilterCheckbox: "",
      sortemailID: [],
      sortreason: [],
      sortblockedDate: [],
      sortblockedBy: [],
      sortFilteremailID: [],
      sortFilterreason: [],
      sortFilterblockedDate: [],
      sortFilterblockedBy: [],
      StatusModel: false,
      filterTxtValue: "",
      tempdatablockemail: [],
      sortColumn: "",
      sortHeader: ""
    };
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
  }

  componentDidMount() {
    this.handleBlockEmailList();
  }

  AddNewEmailID = () => {
    debugger;
    this.setState({
      AddBlockEmailPopup: true,
      errors: {},
      BlockEmailID: 0,
      EmailIDs: "",
      Reason: ""
    });
  };

  handleAddEmailClose = () => {
    this.setState({ AddBlockEmailPopup: false });
  };

  handleValidation() {
    let errors = this.state.errors;
    let formIsValid = true;
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.EmailIDs) {
      formIsValid = false;
      errors["EmailIDs"] = "Please enter email id";
    } else {
      var emailIds = this.state.EmailIDs;
      var arr = emailIds.split(",");
      arr.forEach(element => {
        if (!re.test(element)) {
          formIsValid = false;
          errors["EmailIDs"] = "Invalid email id";
        }
      });
    }
    if (!this.state.Reason) {
      formIsValid = false;
      errors["Reason"] = "Please enter reason";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleBlockEmailList = () => {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "get",
      url: config.apiUrl + "/BlockEmail/ListEmailBlock",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            BlockEmailData: data
          });
        }
        if (data != null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].emailID]) {
              distinct.push(data[i].emailID);
              unique[data[i].emailID] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortemailID.push({ emailID: distinct[i] });
            self.state.sortFilteremailID.push({ emailID: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reason]) {
              distinct.push(data[i].reason);
              unique[data[i].reason] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortreason.push({ reason: distinct[i] });
            self.state.sortFilterreason.push({ reason: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].blockedDate]) {
              distinct.push(data[i].blockedDate);
              unique[data[i].blockedDate] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortblockedDate.push({ blockedDate: distinct[i] });
            self.state.sortFilterblockedDate.push({ blockedDate: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].blockedBy]) {
              distinct.push(data[i].blockedBy);
              unique[data[i].blockedBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortblockedBy.push({ blockedBy: distinct[i] });
            self.state.sortFilterblockedBy.push({ blockedBy: distinct[i] });
          }
        }
        self.setState({
          loading: false
        });
      })
      .catch(data => {
        console.log(data);
      });
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSaveBlockEmail = () => {
    if (this.handleValidation()) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/BlockEmail/AddEmailBlock",
        headers: authHeader(),
        data: {
          EmailID: this.state.EmailIDs,
          Reason: this.state.Reason
        }
      })
        .then(function(res) {
          if (res.data.message === "Success") {
            this.setState({ loading: true });
            NotificationManager.success("Record saved successfully");
            self.handleAddEmailClose();
            self.handleBlockEmailList();
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch(data => {
          console.log(data);
        });
    }
  };

  handleEditBlockEmail(row) {
    this.state.BlockEmailID = row["blockEmailID"];
    this.state.EmailIDs = row["emailID"];
    this.state.Reason = row["reason"];
    this.setState({ AddBlockEmailPopup: true, errors: {} });
  }

  handleUpdateBlockEmail = () => {
    if (this.handleValidation()) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/BlockEmail/UpdateEmailBlock",
        headers: authHeader(),
        data: {
          BlockEmailID: this.state.BlockEmailID,
          EmailID: this.state.EmailIDs,
          Reason: this.state.Reason
        }
      })
        .then(function(res) {
          if (res.data.message === "Success") {
            NotificationManager.success("Record updated successfully");
            self.handleAddEmailClose();
            self.handleBlockEmailList();
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch(data => {
          console.log(data);
        });
    }
  };

  handleDeleteBlockEmail(blockEmailID) {
    let self = this;
    axios({
      method: "post",
      url:
        config.apiUrl +
        "/BlockEmail/DeleteEmailBlock?blockEmailID=" +
        blockEmailID,
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        if (res.data.message === "Success") {
          NotificationManager.success("Record deleted successfully");
          self.handleBlockEmailList();
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.BlockEmailData;

    itemsArray.sort(function(a, b) {
      return a.blockedBy > b.blockedBy ? 1 : -1;
    });

    this.setState({
      BlockEmailData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.BlockEmailData;
    itemsArray.sort((a, b) => {
      return a.blockedBy < b.blockedBy;
    });
    this.setState({
      BlockEmailData: itemsArray
    });
    this.StatusCloseModel();
  }
  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var semailIDFilterCheckbox = this.state.semailIDFilterCheckbox;
    var sreasonFilterCheckbox = this.state.sreasonFilterCheckbox;
    var sblockedDateFilterCheckbox = this.state.sblockedDateFilterCheckbox;
    var sblockedByFilterCheckbox = this.state.sblockedByFilterCheckbox;
    if (column === "emailID" || column === "all") {
      if (type === "value" && type !== "All") {
        semailIDFilterCheckbox = semailIDFilterCheckbox.replace("all", "");
        semailIDFilterCheckbox = semailIDFilterCheckbox.replace("all,", "");
        if (semailIDFilterCheckbox.includes(e.currentTarget.value)) {
          semailIDFilterCheckbox = semailIDFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          semailIDFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (semailIDFilterCheckbox.includes("all")) {
          semailIDFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "emailID") {
            for (let i = 0; i < this.state.sortemailID.length; i++) {
              semailIDFilterCheckbox += this.state.sortemailID[i].emailID + ",";
            }
            semailIDFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reason" || column === "all") {
      if (type === "value" && type !== "All") {
        sreasonFilterCheckbox = sreasonFilterCheckbox.replace("all", "");
        sreasonFilterCheckbox = sreasonFilterCheckbox.replace("all,", "");
        if (sreasonFilterCheckbox.includes(e.currentTarget.value)) {
          sreasonFilterCheckbox = sreasonFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sreasonFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreasonFilterCheckbox.includes("all")) {
          sreasonFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reason") {
            for (let i = 0; i < this.state.sortreason.length; i++) {
              sreasonFilterCheckbox += this.state.sortreason[i].reason + ",";
            }
            sreasonFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "blockedDate" || column === "all") {
      if (type === "value" && type !== "All") {
        sblockedDateFilterCheckbox = sblockedDateFilterCheckbox.replace(
          "all",
          ""
        );
        sblockedDateFilterCheckbox = sblockedDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sblockedDateFilterCheckbox.includes(e.currentTarget.value)) {
          sblockedDateFilterCheckbox = sblockedDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sblockedDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sblockedDateFilterCheckbox.includes("all")) {
          sblockedDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "blockedDate") {
            for (let i = 0; i < this.state.sortblockedDate.length; i++) {
              sblockedDateFilterCheckbox +=
                this.state.sortblockedDate[i].blockedDate + ",";
            }
            sblockedDateFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "blockedBy" || column === "all") {
      if (type === "value" && type !== "All") {
        sblockedByFilterCheckbox = sblockedByFilterCheckbox.replace("all", "");
        sblockedByFilterCheckbox = sblockedByFilterCheckbox.replace("all,", "");
        if (sblockedByFilterCheckbox.includes(e.currentTarget.value)) {
          sblockedByFilterCheckbox = sblockedByFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sblockedByFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sblockedByFilterCheckbox.includes("all")) {
          sblockedByFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "blockedBy") {
            for (let i = 0; i < this.state.sortblockedBy.length; i++) {
              sblockedByFilterCheckbox +=
                this.state.sortblockedBy[i].blockedBy + ",";
            }
            sblockedByFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      semailIDFilterCheckbox,
      sreasonFilterCheckbox,
      sblockedDateFilterCheckbox,
      sblockedByFilterCheckbox,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: ""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "emailID") {
      var sItems = semailIDFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.emailID === sItems[i]);
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
    } else if (column === "reason") {
      var sItems = sreasonFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.reason === sItems[i]);
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
    } else if (column === "blockedDate") {
      var sItems = sblockedDateFilterCheckbox.split(",");
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
    } else if (column === "blockedBy") {
      var sItems = sblockedByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(a => a.blockedBy === sItems[i]);
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
      tempdatablockemail: itemsArray
    });
    // this.StatusCloseModel();
  };

  StatusCloseModel() {
    debugger;
    if (this.state.tempdatablockemail.length > 0) {
      this.setState({
        StatusModel: false,
        BlockEmailData: this.state.tempdatablockemail,
        sFilterCheckbox: "",
        filterTxtValue: ""
      });
      if (this.state.sortColumn === "emailID") {
        if (this.state.semailIDFilterCheckbox === "") {
        } else {
          this.setState({
            sreasonFilterCheckbox: "",
            sblockedDateFilterCheckbox: "",
            sblockedByFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "reason") {
        if (this.state.sreasonFilterCheckbox === "") {
        } else {
          this.setState({
            semailIDFilterCheckbox: "",
            sblockedDateFilterCheckbox: "",
            sblockedByFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "blockedDate") {
        if (this.state.sblockedDateFilterCheckbox === "") {
        } else {
          this.setState({
            semailIDFilterCheckbox: "",
            sreasonFilterCheckbox: "",
            sblockedByFilterCheckbox: ""
          });
        }
      }
      if (this.state.sortColumn === "blockedBy") {
        if (this.state.sblockedByFilterCheckbox === "") {
        } else {
          this.setState({
            semailIDFilterCheckbox: "",
            sreasonFilterCheckbox: "",
            sblockedDateFilterCheckbox: ""
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        BlockEmailData: this.state.sortAllData,
        sFilterCheckbox: "",
        filterTxtValue: ""
      });
    }
  }
  StatusOpenModel(data, header) {
    debugger;
    if (
      this.state.sortFilteremailID.length === 0 ||
      this.state.sortFilterreason.length === 0 ||
      this.state.sortFilterblockedDate.length === 0 ||
      this.state.sortFilterblockedBy.length === 0
    ) {
      return false;
    }

    if (data === "emailID") {
      if (
        this.state.sreasonFilterCheckbox !== "" ||
        this.state.sblockedDateFilterCheckbox !== "" ||
        this.state.sblockedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sreasonFilterCheckbox: "",
          sblockedDateFilterCheckbox: "",
          sblockedByFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "reason") {
      if (
        this.state.semailIDFilterCheckbox !== "" ||
        this.state.sblockedDateFilterCheckbox !== "" ||
        this.state.sblockedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          semailIDFilterCheckbox: "",
          sblockedDateFilterCheckbox: "",
          sblockedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "blockedDate") {
      if (
        this.state.semailIDFilterCheckbox !== "" ||
        this.state.sreasonFilterCheckbox !== "" ||
        this.state.sblockedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          semailIDFilterCheckbox: "",
          sreasonFilterCheckbox: "",
          sblockedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "blockedBy") {
      if (
        this.state.semailIDFilterCheckbox !== "" ||
        this.state.sreasonFilterCheckbox !== "" ||
        this.state.sblockedDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          semailIDFilterCheckbox: "",
          sreasonFilterCheckbox: "",
          sblockedDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
  }

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "emailID") {
      var sortFilteremailID = matchSorter(
        this.state.sortemailID,
        e.target.value,
        {
          keys: ["emailID"]
        }
      );
      if (sortFilteremailID.length > 0) {
        this.setState({ sortFilteremailID });
      } else {
        this.setState({
          sortFilteremailID: this.state.sortemailID
        });
      }
    }
    if (this.state.sortColumn === "reason") {
      var sortFilterreason = matchSorter(
        this.state.sortreason,
        e.target.value,
        {
          keys: ["reason"]
        }
      );
      if (sortFilterreason.length > 0) {
        this.setState({ sortFilterreason });
      } else {
        this.setState({
          sortFilterreason: this.state.sortreason
        });
      }
    }
    if (this.state.sortColumn === "blockedDate") {
      var sortFilterblockedDate = matchSorter(
        this.state.sortblockedDate,
        e.target.value,
        { keys: ["blockedDate"] }
      );
      if (sortFilterblockedDate.length > 0) {
        this.setState({ sortFilterblockedDate });
      } else {
        this.setState({
          sortFilterblockedDate: this.state.sortblockedDate
        });
      }
    }
    if (this.state.sortColumn === "blockedBy") {
      var sortFilterblockedBy = matchSorter(
        this.state.sortblockedBy,
        e.target.value,
        { keys: ["blockedBy"] }
      );
      if (sortFilterblockedBy.length > 0) {
        this.setState({ sortFilterblockedBy });
      } else {
        this.setState({
          sortFilterblockedBy: this.state.sortblockedBy
        });
      }
    }
  }

  render() {
    const datablockemail = this.state.BlockEmailData;

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <div className="position-relative d-inline-block">
            <Modal
              // show={this.state.StatusModel}
              // onHide={this.StatusCloseModel.bind(this)}
              modalId="Status-popup"
              overlayId="logout-ovrly"
              onClose={this.StatusCloseModel.bind(this)}
              open={this.state.StatusModel}
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
                          this.state.semailIDFilterCheckbox.includes("all") ||
                          this.state.sreasonFilterCheckbox.includes("all") ||
                          this.state.sblockedDateFilterCheckbox.includes(
                            "all"
                          ) ||
                          this.state.sblockedByFilterCheckbox.includes("all")
                        }
                        onChange={this.setSortCheckStatus.bind(this, "all")}
                      />
                      <label htmlFor={"fil-open"}>
                        <span className="table-btn table-blue-btn">ALL</span>
                      </label>
                    </div>
                    {this.state.sortColumn === "emailID"
                      ? this.state.sortFilteremailID !== null &&
                        this.state.sortFilteremailID.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name="filter-type"
                              id={"fil-open" + item.emailID}
                              value={item.emailID}
                              checked={this.state.semailIDFilterCheckbox.includes(
                                item.emailID
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "emailID",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.emailID}>
                              <span className="table-btn table-blue-btn">
                                {item.emailID}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "reason"
                      ? this.state.sortFilterreason !== null &&
                        this.state.sortFilterreason.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name="filter-type"
                              id={"fil-open" + item.reason}
                              value={item.reason}
                              checked={this.state.sreasonFilterCheckbox.includes(
                                item.reason
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "reason",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.reason}>
                              <span className="table-btn table-blue-btn">
                                {item.reason}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "blockedDate"
                      ? this.state.sortFilterblockedDate !== null &&
                        this.state.sortFilterblockedDate.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name="filter-type"
                              id={"fil-open" + item.blockedDate}
                              value={item.blockedDate}
                              checked={this.state.sblockedDateFilterCheckbox.includes(
                                item.blockedDate
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "blockedDate",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.blockedDate}>
                              <span className="table-btn table-blue-btn">
                                {item.blockedDate}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "blockedBy"
                      ? this.state.sortFilterblockedBy !== null &&
                        this.state.sortFilterblockedBy.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name="filter-type"
                              id={"fil-open" + item.blockedBy}
                              value={item.blockedBy}
                              checked={this.state.sblockedByFilterCheckbox.includes(
                                item.blockedBy
                              )}
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "blockedBy",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.blockedBy}>
                              <span className="table-btn table-blue-btn">
                                {item.blockedBy}
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
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Blocked Email ID
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtnReport"
                onClick={this.AddNewEmailID}
              >
                + Add New
              </button>
            </div>
          </div>
          <Modal
            onClose={this.handleAddEmailClose}
            open={this.state.AddBlockEmailPopup}
            modalId="BlockEmailModel"
            overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <label style={{ marginLeft: "194px", fontSize: "large" }}>
                Add New Email ID into Block List
              </label>
              <img
                src={CancelImg}
                alt="CancelImg"
                className="block-cancelImg"
                onClick={this.handleAddEmailClose}
              />
            </div>
            <div class="tab-content">
              <div className="pop-upAddSearchPD">
                <div className="row row-margin1">
                  <div className="col-md-12">
                    <textarea
                      className="txt-1"
                      placeholder="Enter Email ID"
                      name="EmailIDs"
                      value={this.state.EmailIDs}
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.errors["EmailIDs"]}
                    </p>
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-12">
                    <textarea
                      className="txt-1"
                      placeholder="Reason"
                      name="Reason"
                      value={this.state.Reason}
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.errors["Reason"]}
                    </p>
                  </div>
                </div>
                <div className="btn-block">
                  <button
                    type="button"
                    className="butn add-cust-butn"
                    onClick={
                      this.state.BlockEmailID === 0
                        ? this.handleSaveBlockEmail
                        : this.handleUpdateBlockEmail
                    }
                    disabled={this.state.loading}
                  >
                    SAVE
                    {/* {this.state.loading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                            ""
                          )}
                          {this.state.loading ? "Please Wait ..." : "SAVE"} */}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable reactreport">
            <div style={{ backgroundColor: "#fff" }}>
              {this.state.loading === true ? (
                <div className="loader-icon"></div>
              ) : (
                <ReactTable
                  data={datablockemail}
                  columns={[
                    {
                      Header: (
                        <span
                          onClick={this.StatusOpenModel.bind(
                            this,
                            "emailID",
                            "Email ID"
                          )}
                        >
                          Email Id
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "emailID"
                    },
                    {
                      Header: (
                        <span
                          onClick={this.StatusOpenModel.bind(
                            this,
                            "reason",
                            "Reason"
                          )}
                        >
                          Reason
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "reason"
                    },
                    {
                      Header: (
                        <span
                          onClick={this.StatusOpenModel.bind(
                            this,
                            "blockedDate",
                            "Blocked Date"
                          )}
                        >
                          Blocked Date
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "blockedDate"
                    },
                    {
                      Header: (
                        <span
                          onClick={this.StatusOpenModel.bind(
                            this,
                            "blockedBy",
                            "Blocked By"
                          )}
                        >
                          Blocked By
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "blockedBy",
                      Cell: row => {
                        var ids = row.original["Id"];
                        return (
                          <div>
                            <span>
                              Admin
                              <Popover
                                content={
                                  <>
                                    <div>
                                      <b>
                                        <p className="title">
                                          Updated By: {row.original.modifiedBy}
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
                      }
                    },
                    {
                      Header: <span>Actions</span>,
                      accessor: "actionReport",
                      Cell: row => (
                        <div className="report-action">
                          <div>
                            <Popover
                              content={
                                <div className="samdel d-flex general-popover popover-body">
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
                                      <a>CANCEL</a>
                                      <button
                                        className="butn"
                                        onClick={this.handleDeleteBlockEmail.bind(
                                          this,
                                          row.original.blockEmailID
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
                              />
                            </Popover>
                          </div>
                          <div>
                            <button
                              className="react-tabel-button editre"
                              id="p-edit-pop-2"
                              onClick={this.handleEditBlockEmail.bind(
                                this,
                                row.original
                              )}
                            >
                              EDIT
                            </button>
                          </div>
                        </div>
                      )
                    }
                  ]}
                  resizable={false}
                  defaultPageSize={10}
                  showPagination={true}
                  minRows={1}
                />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BlockEmail;
