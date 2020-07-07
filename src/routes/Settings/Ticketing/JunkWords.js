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
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class JunkWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddJunkWordsPopup: false,
      JunkWordsData: [],
      loading: false,
      JunkKeywordID: 0,
      JunkWords: "",
      Reason: "",
      errors: {},
      sortAllData: [],
      sjunkKeywordFilterCheckbox: "",
      sreasonFilterCheckbox: "",
      senteredDateFilterCheckbox: "",
      senteredByFilterCheckbox: "",
      sortjunkKeyword: [],
      sortreason: [],
      sortenteredDate: [],
      sortenteredBy: [],
      sortFilterjunkKeyword: [],
      sortFilterreason: [],
      sortFilterenteredDate: [],
      sortFilterenteredBy: [],
      StatusModel: false,
      filterTxtValue: "",
      tempJunkWordsData: [],
      sortColumn: "",
      sortHeader: "",
      translateLanguage: {},
    };
  }

  componentDidMount() {
    this.handleJunkWordsList();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  AddNewJunkWords = () => {
    this.setState({
      AddJunkWordsPopup: true,
      errors: {},
      JunkKeywordID: 0,
      JunkWords: "",
      Reason: "",
    });
  };

  handleAddJunkClose = () => {
    this.setState({ AddJunkWordsPopup: false });
  };

  handleValidation() {
    const TranslationContext = this.state.translateLanguage.default;
    let errors = this.state.errors;
    let formIsValid = true;
    if (!this.state.JunkWords) {
      formIsValid = false;
      errors["JunkWords"] =
        TranslationContext !== undefined
          ? TranslationContext.label.pleaseenterjunkwords
          : "Please enter junk words";
    }
    if (!this.state.Reason) {
      formIsValid = false;
      errors["Reason"] =
        TranslationContext !== undefined
          ? TranslationContext.label.pleaseenterreason
          : "Please enter reason";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleJunkWordsList = () => {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "get",
      url: config.apiUrl + "/JunkWords/ListJunkWords",
      headers: authHeader(),
    })
      .then(function (res) {
        debugger;
        var status = res.data.message;
        var data = res.data.responseData;

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].junkKeyword]) {
              distinct.push(data[i].junkKeyword);
              unique[data[i].junkKeyword] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortjunkKeyword.push({ junkKeyword: distinct[i] });
            self.state.sortFilterjunkKeyword.push({
              junkKeyword: distinct[i],
            });
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
            if (!unique[data[i].enteredDate]) {
              distinct.push(data[i].enteredDate);
              unique[data[i].enteredDate] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortenteredDate.push({ enteredDate: distinct[i] });
            self.state.sortFilterenteredDate.push({ enteredDate: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].enteredBy]) {
              distinct.push(data[i].enteredBy);
              unique[data[i].enteredBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortenteredBy.push({ enteredBy: distinct[i] });
            self.state.sortFilterenteredBy.push({ enteredBy: distinct[i] });
          }
        }
        if (status === "Success") {
          self.setState({
            JunkWordsData: data,
          });
        }
        self.setState({
          loading: false,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSaveJunkWords = () => {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.handleValidation()) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/JunkWords/AddJunkWords",
        headers: authHeader(),
        data: {
          JunkKeyword: this.state.JunkWords,
          Reason: this.state.Reason,
        },
      })
        .then(function (res) {
          if (res.data.message === "Success") {
            self.setState({ loading: true });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordsavedsuccessfully
                : "Record saved successfully"
            );
            self.handleJunkWordsList();
            self.handleAddJunkClose();
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };

  handleEditJunkWords(row) {
    this.state.JunkKeywordID = row["junkKeywordID"];
    this.state.JunkWords = row["junkKeyword"];
    this.state.Reason = row["reason"];
    this.setState({ AddJunkWordsPopup: true, errors: {} });
  }

  handleUpdateJunkWords = () => {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.handleValidation()) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/JunkWords/UpdateJunkWords",
        headers: authHeader(),
        data: {
          JunkKeywordID: this.state.JunkKeywordID,
          JunkKeyword: this.state.JunkWords,
          Reason: this.state.Reason,
        },
      })
        .then(function (res) {
          if (res.data.message === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record updated successfully"
            );
            self.handleAddJunkClose();
            self.handleJunkWordsList();
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };

  handleDeleteJunkWords(junkKeywordID) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url:
        config.apiUrl +
        "/JunkWords/DeleteJunkWords?junkKeywordID=" +
        junkKeywordID,
      headers: authHeader(),
    })
      .then(function (res) {
        if (res.data.message === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recorddeletedsuccessfully
              : "Record deleted successfully"
          );
          self.handleJunkWordsList();
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.JunkWordsData;

    if (this.state.sortColumn === "junkKeyword") {
      itemsArray.sort((a, b) => {
        if (a.junkKeyword < b.junkKeyword) return 1;
        if (a.junkKeyword > b.junkKeyword) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reason") {
      itemsArray.sort((a, b) => {
        if (a.reason < b.reason) return 1;
        if (a.reason > b.reason) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "enteredDate") {
      itemsArray.sort((a, b) => {
        if (a.enteredDate < b.enteredDate) return 1;
        if (a.enteredDate > b.enteredDate) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "enteredBy") {
      itemsArray.sort((a, b) => {
        if (a.enteredBy < b.enteredBy) return 1;
        if (a.enteredBy > b.enteredBy) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      JunkWordsData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;

    var itemsArray = [];

    itemsArray = this.state.JunkWordsData;

    if (this.state.sortColumn === "junkKeyword") {
      itemsArray.sort((a, b) => {
        if (a.junkKeyword < b.junkKeyword) return -1;
        if (a.junkKeyword > b.junkKeyword) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reason") {
      itemsArray.sort((a, b) => {
        if (a.reason < b.reason) return -1;
        if (a.reason > b.reason) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "enteredDate") {
      itemsArray.sort((a, b) => {
        if (a.enteredDate < b.enteredDate) return -1;
        if (a.enteredDate > b.enteredDate) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "enteredBy") {
      itemsArray.sort((a, b) => {
        if (a.enteredBy < b.enteredBy) return -1;
        if (a.enteredBy > b.enteredBy) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      JunkWordsData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sjunkKeywordFilterCheckbox = this.state.sjunkKeywordFilterCheckbox;
    var sreasonFilterCheckbox = this.state.sreasonFilterCheckbox;
    var senteredDateFilterCheckbox = this.state.senteredDateFilterCheckbox;
    var senteredByFilterCheckbox = this.state.senteredByFilterCheckbox;
    if (column === "junkKeyword" || column === "all") {
      if (type === "value" && type !== "All") {
        sjunkKeywordFilterCheckbox = sjunkKeywordFilterCheckbox.replace(
          "all",
          ""
        );
        sjunkKeywordFilterCheckbox = sjunkKeywordFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sjunkKeywordFilterCheckbox.includes(e.currentTarget.value)) {
          sjunkKeywordFilterCheckbox = sjunkKeywordFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sjunkKeywordFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sjunkKeywordFilterCheckbox.includes("all")) {
          sjunkKeywordFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "junkKeyword") {
            for (let i = 0; i < this.state.sortjunkKeyword.length; i++) {
              sjunkKeywordFilterCheckbox +=
                this.state.sortjunkKeyword[i].junkKeyword + ",";
            }
            sjunkKeywordFilterCheckbox += "all";
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
    if (column === "enteredDate" || column === "all") {
      if (type === "value" && type !== "All") {
        senteredDateFilterCheckbox = senteredDateFilterCheckbox.replace(
          "all",
          ""
        );
        senteredDateFilterCheckbox = senteredDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (senteredDateFilterCheckbox.includes(e.currentTarget.value)) {
          senteredDateFilterCheckbox = senteredDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          senteredDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (senteredDateFilterCheckbox.includes("all")) {
          senteredDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "enteredDate") {
            for (let i = 0; i < this.state.sortenteredDate.length; i++) {
              senteredDateFilterCheckbox +=
                this.state.sortenteredDate[i].enteredDate + ",";
            }
            senteredDateFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "enteredBy" || column === "all") {
      if (type === "value" && type !== "All") {
        senteredByFilterCheckbox = senteredByFilterCheckbox.replace("all", "");
        senteredByFilterCheckbox = senteredByFilterCheckbox.replace("all,", "");
        if (senteredByFilterCheckbox.includes(e.currentTarget.value)) {
          senteredByFilterCheckbox = senteredByFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          senteredByFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (senteredByFilterCheckbox.includes("all")) {
          senteredByFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "enteredBy") {
            for (let i = 0; i < this.state.sortenteredBy.length; i++) {
              senteredByFilterCheckbox +=
                this.state.sortenteredBy[i].enteredBy + ",";
            }
            senteredByFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sjunkKeywordFilterCheckbox,
      sreasonFilterCheckbox,
      senteredDateFilterCheckbox,
      senteredByFilterCheckbox,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "junkKeyword") {
      var sItems = sjunkKeywordFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.junkKeyword === sItems[i]
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
    } else if (column === "reason") {
      var sItems = sreasonFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.reason === sItems[i]);
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
    } else if (column === "enteredDate") {
      var sItems = senteredDateFilterCheckbox.split(",");
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
    } else if (column === "enteredBy") {
      var sItems = senteredByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.enteredBy === sItems[i]
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
      tempJunkWordsData: itemsArray,
    });
    // this.StatusCloseModel();
  };

  StatusCloseModel() {
    debugger;
    if (this.state.tempJunkWordsData.length > 0) {
      this.setState({
        StatusModel: false,
        JunkWordsData: this.state.tempJunkWordsData,
        filterTxtValue: "",
        sortFilterjunkKeyword: this.state.sortjunkKeyword,
        sortFilterreason: this.state.sortreason,
        sortFilterenteredDate: this.state.sortenteredBy,
        sortFilterenteredBy: this.state.sortenteredBy,
      });
      if (this.state.sortColumn === "junkKeyword") {
        if (this.state.sjunkKeywordFilterCheckbox === "") {
        } else {
          this.setState({
            sreasonFilterCheckbox: "",
            senteredDateFilterCheckbox: "",
            senteredByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reason") {
        if (this.state.sreasonFilterCheckbox === "") {
        } else {
          this.setState({
            sjunkKeywordFilterCheckbox: "",
            senteredDateFilterCheckbox: "",
            senteredByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "enteredDate") {
        if (this.state.senteredDateFilterCheckbox === "") {
        } else {
          this.setState({
            sjunkKeywordFilterCheckbox: "",
            sreasonFilterCheckbox: "",
            senteredByFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "enteredBy") {
        if (this.state.senteredByFilterCheckbox === "") {
        } else {
          this.setState({
            sjunkKeywordFilterCheckbox: "",
            sreasonFilterCheckbox: "",
            senteredDateFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        JunkWordsData: this.state.isortA
          ? this.state.JunkWordsData
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterjunkKeyword: this.state.sortjunkKeyword,
        sortFilterreason: this.state.sortreason,
        sortFilterenteredDate: this.state.sortenteredBy,
        sortFilterenteredBy: this.state.sortenteredBy,
      });
    }
  }
  StatusOpenModel(data, header) {
    debugger;
    if (
      this.state.sortFilterjunkKeyword.length === 0 ||
      this.state.sortFilterreason.length === 0 ||
      this.state.sortFilterenteredDate.length === 0 ||
      this.state.sortFilterenteredBy.length === 0
    ) {
      return false;
    }

    if (data === "junkKeyword") {
      if (
        this.state.sreasonFilterCheckbox !== "" ||
        this.state.senteredDateFilterCheckbox !== "" ||
        this.state.senteredByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreasonFilterCheckbox: "",
          senteredDateFilterCheckbox: "",
          senteredByFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reason") {
      if (
        this.state.sjunkKeywordFilterCheckbox !== "" ||
        this.state.senteredDateFilterCheckbox !== "" ||
        this.state.senteredByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sjunkKeywordFilterCheckbox: "",
          senteredDateFilterCheckbox: "",
          senteredByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "enteredDate") {
      if (
        this.state.sjunkKeywordFilterCheckbox !== "" ||
        this.state.sreasonFilterCheckbox !== "" ||
        this.state.senteredByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sjunkKeywordFilterCheckbox: "",
          sreasonFilterCheckbox: "",
          senteredByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "enteredBy") {
      if (
        this.state.sjunkKeywordFilterCheckbox !== "" ||
        this.state.sreasonFilterCheckbox !== "" ||
        this.state.senteredDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sjunkKeywordFilterCheckbox: "",
          sreasonFilterCheckbox: "",
          senteredDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }

  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "junkKeyword") {
      var sortFilterjunkKeyword = matchSorter(
        this.state.sortjunkKeyword,
        e.target.value,
        {
          keys: ["junkKeyword"],
        }
      );
      if (sortFilterjunkKeyword.length > 0) {
        this.setState({ sortFilterjunkKeyword });
      } else {
        this.setState({
          sortFilterjunkKeyword: this.state.sortjunkKeyword,
        });
      }
    }
    if (this.state.sortColumn === "reason") {
      var sortFilterreason = matchSorter(
        this.state.sortreason,
        e.target.value,
        {
          keys: ["reason"],
        }
      );
      if (sortFilterreason.length > 0) {
        this.setState({ sortFilterreason });
      } else {
        this.setState({
          sortFilterreason: this.state.sortreason,
        });
      }
    }
    if (this.state.sortColumn === "enteredDate") {
      var sortFilterenteredDate = matchSorter(
        this.state.sortenteredDate,
        e.target.value,
        { keys: ["enteredDate"] }
      );
      if (sortFilterenteredDate.length > 0) {
        this.setState({ sortFilterenteredDate });
      } else {
        this.setState({
          sortFilterenteredDate: this.state.sortenteredDate,
        });
      }
    }
    if (this.state.sortColumn === "enteredBy") {
      var sortFilterenteredBy = matchSorter(
        this.state.sortenteredBy,
        e.target.value,
        { keys: ["enteredBy"] }
      );
      if (sortFilterenteredBy.length > 0) {
        this.setState({ sortFilterenteredBy });
      } else {
        this.setState({
          sortFilterenteredBy: this.state.sortenteredBy,
        });
      }
    }
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const datajunkwords = this.state.JunkWordsData;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <div className="position-relative d-inline-block">
            <Modal
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
                          this.state.sjunkKeywordFilterCheckbox.includes(
                            "all"
                          ) ||
                          this.state.sreasonFilterCheckbox.includes("all") ||
                          this.state.senteredDateFilterCheckbox.includes(
                            "all"
                          ) ||
                          this.state.senteredByFilterCheckbox.includes("all")
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
                    {this.state.sortColumn === "junkKeyword"
                      ? this.state.sortFilterjunkKeyword !== null &&
                      this.state.sortFilterjunkKeyword.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.junkKeyword}
                            value={item.junkKeyword}
                            checked={this.state.sjunkKeywordFilterCheckbox.includes(
                              item.junkKeyword
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "junkKeyword",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.junkKeyword}>
                            <span className="table-btn table-blue-btn">
                              {item.junkKeyword}
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

                    {this.state.sortColumn === "enteredDate"
                      ? this.state.sortFilterenteredDate !== null &&
                      this.state.sortFilterenteredDate.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.enteredDate}
                            value={item.enteredDate}
                            checked={this.state.senteredDateFilterCheckbox.includes(
                              item.enteredDate
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "enteredDate",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.enteredDate}>
                            <span className="table-btn table-blue-btn">
                              {item.enteredDate}
                            </span>
                          </label>
                        </div>
                      ))
                      : null}

                    {this.state.sortColumn === "enteredBy"
                      ? this.state.sortFilterenteredBy !== null &&
                      this.state.sortFilterenteredBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.enteredBy}
                            value={item.enteredBy}
                            checked={this.state.senteredByFilterCheckbox.includes(
                              item.enteredBy
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "enteredBy",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.enteredBy}>
                            <span className="table-btn table-blue-btn">
                              {item.enteredBy}
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
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.a.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.strong.junkwords
              : "Junk Words"}
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtnReport"
                onClick={this.AddNewJunkWords}
              >
                +&nbsp;
                {TranslationContext !== undefined
                  ? TranslationContext.button.addnew
                  : "Add New"}
              </button>
            </div>
          </div>
          <Modal
            onClose={this.handleAddJunkClose}
            open={this.state.AddJunkWordsPopup}
            modalId="BlockEmailModel"
            overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <label style={{ marginLeft: "227px", fontSize: "large" }}>
                {TranslationContext !== undefined
                  ? TranslationContext.label.addnewjunkwords
                  : "Add New Junk Words"}
              </label>
              <img
                src={CancelImg}
                alt="CancelImg"
                className="block-cancelImg"
                onClick={this.handleAddJunkClose}
              />
            </div>
            <div class="tab-content">
              <div className="pop-upAddSearchPD">
                <div className="row row-margin1">
                  <div className="col-md-12">
                    <textarea
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.strong.junkwords
                          : "Junk Words"
                      }
                      name="JunkWords"
                      value={this.state.JunkWords}
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.errors["JunkWords"]}
                    </p>
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-12">
                    <textarea
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.span.reason
                          : "Reason"
                      }
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
                  {/* <Link onClick={this.handleAddCustomerSave}> */}
                  <button
                    type="button"
                    className="butn add-cust-butn"
                    onClick={
                      this.state.JunkKeywordID === 0
                        ? this.handleSaveJunkWords
                        : this.handleUpdateJunkWords
                    }
                    disabled={this.state.loading}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.label.save
                      : "SAVE"}
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
          <div className="store-settings-cntr settingtable    report">
            <div style={{ backgroundColor: "#fff" }}>
              {this.state.loading === true ? (
                <div className="loader-icon"></div>
              ) : (
                  <ReactTable
                    data={datajunkwords}
                    columns={[
                      {
                        Header: (
                          <span
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "junkKeyword",
                              TranslationContext !== undefined
                                ? TranslationContext.strong.junkwords
                                : "Junk Words"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.junkwords
                              : "Junk Words"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "junkKeyword",
                      },
                      {
                        Header: (
                          <span
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reason",
                              TranslationContext !== undefined
                                ? TranslationContext.span.reason
                                : "Reason"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.reason
                              : "Reason"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "reason",
                      },
                      {
                        Header: (
                          <span
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "enteredDate",
                              TranslationContext !== undefined
                                ? TranslationContext.span.entereddate
                                : "Entered Date"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.entereddate
                              : "Entered Date"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "enteredDate",
                      },
                      {
                        Header: (
                          <span
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "enteredBy",
                              TranslationContext !== undefined
                                ? TranslationContext.span.enteredby
                                : "Entered By"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.enteredby
                              : "Entered By"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "enteredBy",
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["Id"];
                          return (
                            <div>
                              <span>
                                {row.original.enteredBy}
                                <Popover
                                  content={
                                    <>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                          : {row.original.modifyBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}
                                        : {row.original.modifyDate}
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
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.actions
                              : "Actions"}
                          </span>
                        ),
                        sortable: false,
                        accessor: "actionReport",
                        Cell: (row) => (
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p.deleterecord
                                          : "Delete record"}
                                      ?
                                    </p>
                                      <p className="mt-1 fs-12">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p
                                            .areyousurewanttodeletethisrecord
                                          : "Are you sure you want to delete this record?"}
                                      </p>
                                      <div className="del-can">
                                        <a>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.cancel
                                            : "CANCEL"}
                                        </a>
                                        <button
                                          className="butn"
                                          onClick={this.handleDeleteJunkWords.bind(
                                            this,
                                            row.original.junkKeywordID
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.delete
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
                                />
                              </Popover>
                            </div>
                            <div>
                              <button
                                className="react-tabel-button editre"
                                id="p-edit-pop-2"
                                onClick={this.handleEditJunkWords.bind(
                                  this,
                                  row.original
                                )}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.edit
                                  : "EDIT"}
                              </button>
                            </div>
                          </div>
                        ),
                      },
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

export default JunkWords;
